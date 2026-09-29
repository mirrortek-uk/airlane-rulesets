#!/usr/bin/env node
/**
 * AirLane 规则集合并管线。
 *
 * 用法:
 *   node scripts/merge.mjs [--singbox <path>] [--mihomo <path>] [--out <dir>] [--only <setId>]
 *
 * 每个 manifest.json 里的分类:
 *   1. 下载上游源并归一化为 sing-box source JSON
 *      （.srs → decompile; Clash yaml/list、Shadowrocket conf、gfwlist → 解析;
 *        manual/{id}.add.txt / {id}.remove.txt → 人工补丁）;
 *   2. sing-box rule-set merge 合并 → 精确去重;
 *   3. 产出四格式: .json(source) .srs(sing-box) .yaml/.list(Clash/SR 文本) .mrs(mihomo，可选);
 *   4. 汇总 dist/manifest.json（条目数 + 各文件 sha256 + 生成时间）。
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
const MIHOMO = argValue('--mihomo', null); // 缺省跳过 .mrs 产出
const OUT_DIR = resolve(ROOT, argValue('--out', 'dist'));
const TMP_DIR = resolve(ROOT, argValue('--tmp', 'tmp'));
const MANUAL_DIR = resolve(ROOT, argValue('--manual', 'manual'));
const ONLY = argValue('--only', null);

const manifest = JSON.parse(readFileSync(join(ROOT, 'manifest.json'), 'utf8'));

mkdirSync(OUT_DIR, { recursive: true });
rmSync(TMP_DIR, { recursive: true, force: true });
mkdirSync(TMP_DIR, { recursive: true });

const RULE_KEYS = [
  'domain',
  'domain_suffix',
  'domain_keyword',
  'domain_regex',
  'ip_cidr',
];

function singbox(cmdArgs) {
  return execFileSync(SINGBOX, cmdArgs, { stdio: ['ignore', 'pipe', 'inherit'] });
}
function mihomo(cmdArgs) {
  return execFileSync(MIHOMO, cmdArgs, { stdio: ['ignore', 'pipe', 'inherit'] });
}

async function fetchBytes(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'airlane-rulesets/1.0' },
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function emptyRule() {
  return {
    domain: [],
    domain_suffix: [],
    domain_keyword: [],
    domain_regex: [],
    ip_cidr: [],
  };
}

/** Clash yaml/list 行 → 写入 rule 数组。返回是否被识别。 */
function parseRuleLine(line, rule) {
  const put = (key, value) => {
    value = String(value).trim().replace(/^['"]|['"]$/g, '');
    if (value) rule[key].push(value);
  };
  line = line.replace(/^['"]|['"]$/g, ''); // yaml 引号先剥掉（'+.x.com' / "*.x.com"）
  if (line.includes(',')) {
    const [type, value] = line.split(',').map((s) => s.trim());
    switch (type.toUpperCase()) {
      case 'DOMAIN': put('domain', value); return true;
      case 'DOMAIN-SUFFIX': put('domain_suffix', value); return true;
      case 'DOMAIN-KEYWORD': put('domain_keyword', value); return true;
      case 'DOMAIN-REGEX': put('domain_regex', value); return true;
      case 'IP-CIDR':
      case 'IP-CIDR6': put('ip_cidr', value); return true;
      default: return true; // GEOIP/IP-ASN/PROCESS-NAME/FINAL 等吞掉
    }
  }
  if (line.startsWith('+.') || line.startsWith('*.')) {
    put('domain_suffix', line.slice(2));
    return true;
  }
  if (/^[a-z0-9.-]+$/i.test(line) && line.includes('.')) {
    put('domain_suffix', line); // 纯域名按后缀处理，兼容子域名
    return true;
  }
  if (/^[\d:./]+$/.test(line)) {
    put('ip_cidr', line);
    return true;
  }
  return false;
}

/** Clash yaml/list / Shadowrocket conf / manual 文件 → rule。 */
function parseClashText(text) {
  const rule = emptyRule();
  let inRuleSection = true; // conf 有 [Section] 结构时只取 [Rule]；纯 list 全文都是规则
  for (const raw of text.split(/\r?\n/)) {
    let line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;
    const sec = line.match(/^\[(.+)\]$/);
    if (sec) {
      inRuleSection = sec[1].toUpperCase() === 'RULE';
      continue;
    }
    if (!inRuleSection || line === 'payload:') continue;
    line = line.replace(/^-\s*/, '').trim().replace(/,$/, '');
    if (!line || line.startsWith('#')) continue;
    parseRuleLine(line, rule);
  }
  return rule;
}

/** gfwlist 文本（base64 源已解码）→ {rule, exceptions:Set}。 */
function parseGfwlist(text) {
  const rule = emptyRule();
  const exceptions = new Set();
  for (const raw of text.split(/\r?\n/)) {
    let line = raw.trim();
    if (!line || line.startsWith('!') || line.startsWith('[') || line.startsWith('AutoProxy')) continue;
    let exclude = false;
    if (line.startsWith('@@')) {
      exclude = true;
      line = line.slice(2);
    }
    if (line.startsWith('||')) {
      const d = line.slice(2).split('/')[0];
      if (exclude) exceptions.add(d); else rule.domain_suffix.push(d);
      continue;
    }
    if (line.startsWith('|')) {
      // |http://x.com/ → 提取 hostname 为精确域名
      try {
        const host = new URL(line.slice(1)).hostname;
        if (exclude) exceptions.add(host); else rule.domain.push(host);
      } catch { /* 非 URL 形态跳过 */ }
      continue;
    }
    if (line.startsWith('/') || line.includes('.*') || line.includes('%')) continue; // 正则/转义规则跳过
    line = line.replace(/^\*\./, '').replace(/^\./, '');
    if (/^[a-z0-9.-]+$/i.test(line) && line.includes('.')) {
      if (exclude) exceptions.add(line); else rule.domain_suffix.push(line);
    }
  }
  return { rule, exceptions };
}

/** 单个 source → source JSON 文件路径。 */
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
  if (src.type === 'clash-yaml' || src.type === 'clash-list' || src.type === 'shadowrocket-conf') {
    const text = (await fetchBytes(src.url)).toString('utf8');
    const rule = parseClashText(text);
    writeFileSync(`${tmpFile}.json`, JSON.stringify({ version: 3, rules: [rule] }));
    return `${tmpFile}.json`;
  }
  if (src.type === 'gfwlist') {
    const raw = (await fetchBytes(src.url)).toString('utf8');
    const text = Buffer.from(raw.replace(/\s+/g, ''), 'base64').toString('utf8');
    const { rule, exceptions } = parseGfwlist(text);
    // gfwlist @@例外：从本集的 domain/domain_suffix 中剔除
    rule.domain = rule.domain.filter((d) => !exceptions.has(d));
    rule.domain_suffix = rule.domain_suffix.filter((d) => !exceptions.has(d));
    writeFileSync(`${tmpFile}.json`, JSON.stringify({ version: 3, rules: [rule] }));
    return `${tmpFile}.json`;
  }
  throw new Error(`unknown source type: ${src.type}`);
}

/** manual/{id}.add.txt / {id}.remove.txt → rule 或 null。 */
function loadManualRule(setId, kind) {
  const path = join(MANUAL_DIR, `${setId}.${kind}.txt`);
  if (!existsSync(path)) return null;
  const rule = parseClashText(readFileSync(path, 'utf8'));
  return RULE_KEYS.some((k) => rule[k].length) ? rule : null;
}

/** 对 merged source JSON 应用人工补丁 + 精确去重。 */
function finalizeSource(path, setId) {
  const json = JSON.parse(readFileSync(path, 'utf8'));
  json.rules ??= [];

  // add 补丁：追加为独立 logical rule
  const add = loadManualRule(setId, 'add');
  if (add) {
    json.rules.push(add);
    console.log(`  manual add: ${RULE_KEYS.reduce((n, k) => n + add[k].length, 0)} rules`);
  }

  // remove 补丁：逐字段集合差集
  const remove = loadManualRule(setId, 'remove');
  if (remove) {
    let removed = 0;
    for (const rule of json.rules) {
      for (const k of RULE_KEYS) {
        if (!Array.isArray(rule[k]) || !remove[k]?.length) continue;
        const del = new Set(remove[k]);
        const before = rule[k].length;
        rule[k] = rule[k].filter((v) => !del.has(v));
        removed += before - rule[k].length;
      }
    }
    console.log(`  manual remove: ${removed} rules`);
  }

  // 精确去重 + 剔除空条件规则（全空数组的 rule 会让 sing-box FATAL）
  for (const rule of json.rules) {
    for (const k of Object.keys(rule)) {
      if (Array.isArray(rule[k])) rule[k] = [...new Set(rule[k])];
    }
  }
  const before = json.rules.length;
  json.rules = json.rules.filter((r) =>
    Object.values(r).some((v) => Array.isArray(v) && v.length > 0)
  );
  if (json.rules.length < before) {
    console.log(`  dropped ${before - json.rules.length} empty rule(s)`);
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

const CLASH_TYPE = {
  domain: 'DOMAIN',
  domain_suffix: 'DOMAIN-SUFFIX',
  domain_keyword: 'DOMAIN-KEYWORD',
  domain_regex: 'DOMAIN-REGEX',
  ip_cidr: 'IP-CIDR',
};

/** merged source JSON → Clash classical 行（有损：AND 规则拆成 OR 行，返回丢弃字段数）。 */
function toClashLines(json) {
  const lines = [];
  let dropped = 0;
  for (const rule of json.rules ?? []) {
    for (const [key, type] of Object.entries(CLASH_TYPE)) {
      for (const v of rule[key] ?? []) lines.push(`${type},${v}`);
    }
    for (const k of Object.keys(rule)) {
      if (!(k in CLASH_TYPE)) dropped += Array.isArray(rule[k]) ? rule[k].length : 1;
    }
  }
  return { lines, dropped };
}

function sha256File(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

const sets = ONLY ? manifest.sets.filter((s) => s.id === ONLY) : manifest.sets;
if (sets.length === 0) {
  console.error(`no matching set for --only ${ONLY}`);
  process.exit(1);
}

const outManifest = {
  version: manifest.version,
  generatedAt: new Date().toISOString(),
  formats: ['srs', 'mrs', 'yaml', 'list', 'json'],
  sets: [],
};
let failures = 0;

for (const set of sets) {
  try {
    const inputs = [];
    for (const [i, src] of set.sources.entries()) {
      inputs.push(await materializeSource(set.id, i, src));
    }
    const mergedJson = join(OUT_DIR, `${set.id}.json`);
    singbox(['rule-set', 'merge', mergedJson, ...inputs.flatMap((f) => ['-c', f])]);
    const merged = finalizeSource(mergedJson, set.id);

    // .srs
    const srsOut = join(OUT_DIR, `${set.id}.srs`);
    singbox(['rule-set', 'compile', mergedJson, '-o', srsOut]);

    // .list + .yaml（Clash classical）
    const { lines, dropped } = toClashLines(merged);
    writeFileSync(join(OUT_DIR, `${set.id}.list`), lines.join('\n') + '\n');
    writeFileSync(
      join(OUT_DIR, `${set.id}.yaml`),
      'payload:\n' + lines.map((l) => `  - ${l}`).join('\n') + '\n'
    );
    if (dropped) console.log(`  clash export: dropped ${dropped} non-domain/ip entries`);

    // .mrs：mihomo 的 convert-ruleset 只认 domain/ipcidr 行为（classical 会 panic），
    // 拆两个文件：{id}.mrs=domain 行为，{id}-ipcidr.mrs=ipcidr 行为（无对应条目则不产出）。
    const files = {
      srs: { sha256: sha256File(srsOut) },
      yaml: { sha256: sha256File(join(OUT_DIR, `${set.id}.yaml`)) },
      list: { sha256: sha256File(join(OUT_DIR, `${set.id}.list`)) },
      json: { sha256: sha256File(mergedJson) },
    };
    if (MIHOMO) {
      const domains = [];
      const cidrs = [];
      let keywordDropped = 0;
      for (const rule of merged.rules ?? []) {
        for (const d of rule.domain ?? []) domains.push(d);
        for (const d of rule.domain_suffix ?? []) domains.push(`+.${d}`);
        for (const c of rule.ip_cidr ?? []) cidrs.push(c);
        keywordDropped += (rule.domain_keyword ?? []).length + (rule.domain_regex ?? []).length;
      }
      const mkMrs = (behavior, entries, outName) => {
        if (!entries.length) return null;
        const srcYaml = join(TMP_DIR, `${set.id}-${behavior}.yaml`);
        writeFileSync(srcYaml, 'payload:\n' + entries.map((e) => `  - '${e}'`).join('\n') + '\n');
        const out = join(OUT_DIR, outName);
        mihomo(['convert-ruleset', behavior, 'yaml', srcYaml, out]);
        return out;
      };
      const domMrs = mkMrs('domain', domains, `${set.id}.mrs`);
      const ipMrs = mkMrs('ipcidr', cidrs, `${set.id}-ipcidr.mrs`);
      if (domMrs) files.mrs = { sha256: sha256File(domMrs) };
      if (ipMrs) files['mrs-ipcidr'] = { sha256: sha256File(ipMrs) };
      if (keywordDropped) console.log(`  mrs: ${keywordDropped} keyword/regex entries not representable in domain behavior`);
    }

    outManifest.sets.push({
      id: set.id,
      displayName: set.displayName,
      entries: countRules(merged),
      sources: set.sources.length,
      files,
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
