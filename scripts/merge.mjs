#!/usr/bin/env node
/**
 * AirLane 规则集合并管线。
 *
 * 用法:
 *   node scripts/merge.mjs [--singbox <path>] [--out <dir>] [--only <setId>]
 *
 * 流程（每个 manifest.json 里的分类）:
 *   1. 下载上游源（.srs 二进制 → sing-box rule-set decompile;
 *      Clash yaml/list → 解析 payload 转 source JSON）;
 *   2. sing-box rule-set merge 合并为 source JSON;
 *   3. 精确去重各匹配数组;
 *   4. sing-box rule-set compile 产出 .srs;
 *   5. 汇总 dist/manifest.json（条目数 + sha256 + 生成时间）。
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  rmSync,
} from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));

const args = process.argv.slice(2);
function argValue(flag, fallback) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : fallback;
}
const SINGBOX = argValue('--singbox', 'sing-box');
const OUT_DIR = resolve(ROOT, argValue('--out', 'dist'));
const TMP_DIR = resolve(ROOT, argValue('--tmp', 'tmp'));
const ONLY = argValue('--only', null);

const manifest = JSON.parse(readFileSync(join(ROOT, 'manifest.json'), 'utf8'));

mkdirSync(OUT_DIR, { recursive: true });
rmSync(TMP_DIR, { recursive: true, force: true });
mkdirSync(TMP_DIR, { recursive: true });

function singbox(cmdArgs) {
  return execFileSync(SINGBOX, cmdArgs, { stdio: ['ignore', 'pipe', 'inherit'] });
}

async function fetchBytes(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'airlane-rulesets/1.0' },
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Clash yaml/list → sing-box source JSON rules（单个 logical rule）。 */
function parseClashText(text) {
  const rule = {
    domain: [],
    domain_suffix: [],
    domain_keyword: [],
    domain_regex: [],
    ip_cidr: [],
  };
  const put = (key, value) => {
    value = value.trim().replace(/^['"]|['"]$/g, '');
    if (value) rule[key].push(value);
  };
  for (const raw of text.split(/\r?\n/)) {
    let line = raw.trim();
    if (!line || line === 'payload:' || line.startsWith('#') || line.startsWith('//')) continue;
    line = line.replace(/^-\s*/, '').trim().replace(/,$/, '');
    if (!line || line.startsWith('#')) continue;
    // TYPE,value[,extra] 形式
    if (line.includes(',')) {
      const [type, value] = line.split(',').map((s) => s.trim());
      switch (type.toUpperCase()) {
        case 'DOMAIN': put('domain', value); break;
        case 'DOMAIN-SUFFIX': put('domain_suffix', value); break;
        case 'DOMAIN-KEYWORD': put('domain_keyword', value); break;
        case 'DOMAIN-REGEX': put('domain_regex', value); break;
        case 'IP-CIDR':
        case 'IP-CIDR6': put('ip_cidr', value); break;
        default: break; // GEOIP/IP-ASN/PROCESS-NAME 等不支持的类型跳过
      }
      continue;
    }
    // 裸域名 / 通配符（+.domain、*.domain、纯 domain）
    if (line.startsWith('+.') || line.startsWith('*.')) {
      put('domain_suffix', line.slice(2));
    } else if (/^[a-z0-9.-]+$/i.test(line) && line.includes('.')) {
      put('domain_suffix', line); // 纯域名按后缀处理，兼容子域名
    } else if (/^[\d:./]+$/.test(line)) {
      put('ip_cidr', line);
    }
  }
  return rule;
}

/** 单个 source → source JSON 文件路径。返回 null 表示该源被跳过。 */
async function materializeSource(setId, idx, src) {
  const tmpFile = join(TMP_DIR, `${setId}-${idx}`);
  if (src.type === 'srs') {
    const srsPath = `${tmpFile}.srs`;
    writeFileSync(srsPath, await fetchBytes(src.url));
    singbox(['rule-set', 'decompile', srsPath, '-o', `${tmpFile}.json`]);
    return `${tmpFile}.json`;
  }
  if (src.type === 'source-json') {
    writeFileSync(`${tmpFile}.json`, await fetchBytes(src.url));
    return `${tmpFile}.json`;
  }
  if (src.type === 'clash-yaml' || src.type === 'clash-list') {
    const text = (await fetchBytes(src.url)).toString('utf8');
    const rule = parseClashText(text);
    const json = { version: 3, rules: [rule] };
    writeFileSync(`${tmpFile}.json`, JSON.stringify(json));
    return `${tmpFile}.json`;
  }
  throw new Error(`unknown source type: ${src.type}`);
}

/** 去重 merged source JSON 中各规则的匹配数组。 */
function dedupeSource(path) {
  const json = JSON.parse(readFileSync(path, 'utf8'));
  const KEYS = ['domain', 'domain_suffix', 'domain_keyword', 'domain_regex', 'ip_cidr', 'ip_is_private'];
  for (const rule of json.rules ?? []) {
    for (const k of KEYS) {
      if (Array.isArray(rule[k])) rule[k] = [...new Set(rule[k])];
    }
  }
  writeFileSync(path, JSON.stringify(json));
  return json;
}

function countRules(json) {
  let n = 0;
  for (const rule of json.rules ?? []) {
    for (const v of Object.values(rule)) {
      if (Array.isArray(v)) n += v.length;
    }
  }
  return n;
}

const sets = ONLY ? manifest.sets.filter((s) => s.id === ONLY) : manifest.sets;
if (sets.length === 0) {
  console.error(`no matching set for --only ${ONLY}`);
  process.exit(1);
}

const outManifest = { version: manifest.version, generatedAt: new Date().toISOString(), sets: [] };
let failures = 0;

for (const set of sets) {
  try {
    const inputs = [];
    for (const [i, src] of set.sources.entries()) {
      inputs.push(await materializeSource(set.id, i, src));
    }
    const mergedJson = join(OUT_DIR, `${set.id}.json`);
    singbox(['rule-set', 'merge', mergedJson, ...inputs.flatMap((f) => ['-c', f])]);
    const merged = dedupeSource(mergedJson);
    const srsOut = join(OUT_DIR, `${set.id}.srs`);
    singbox(['rule-set', 'compile', mergedJson, '-o', srsOut]);

    const sha256 = createHash('sha256').update(readFileSync(srsOut)).digest('hex');
    outManifest.sets.push({
      id: set.id,
      displayName: set.displayName,
      file: `${set.id}.srs`,
      entries: countRules(merged),
      sha256,
      sources: set.sources.length,
    });
    console.log(`[ok] ${set.id}: ${outManifest.sets.at(-1).entries} rules, ${set.sources.length} sources`);
  } catch (err) {
    failures++;
    console.error(`[fail] ${set.id}: ${err.message}`);
  }
}

writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(outManifest, null, 2));
rmSync(TMP_DIR, { recursive: true, force: true });

if (failures > 0) {
  console.error(`${failures} set(s) failed`);
  process.exit(2);
}
console.log(`done: ${outManifest.sets.length} rule sets -> ${OUT_DIR}`);
