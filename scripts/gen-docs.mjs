#!/usr/bin/env node
/**
 * 由 manifest.json 生成 SEO 内容:
 *   - docs/rulesets/<id>.md       分类着陆页
 *   - README.md / docs/index.md   中 <!-- AUTO:CATALOG --> / <!-- AUTO:CLIENTS --> 标记块注入
 * 用法: node scripts/gen-docs.mjs
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const manifest = JSON.parse(readFileSync(join(ROOT, 'manifest.json'), 'utf8'));
const PAGES = join(ROOT, 'docs', 'rulesets');
mkdirSync(PAGES, { recursive: true });

const REPO = 'https://github.com/mirrortek-uk/airlane-rulesets';
const REL = `${REPO}/releases/latest/download`;
const QR = (url, size = 96) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;

/** 每类的 SEO 关键词与简介（同时用作目录"备注"列） */
const META = {
  'airlane-cn': {
    label: '国内直连',
    keywords: '国内直连规则, 国内网站规则集, 中国域名规则, GeoSite-CN, GeoIP-CN, 国内外分流规则',
    desc: '中国大陆域名与 IP 直连规则集，聚合 GeoSite-CN 与 GeoIP-CN，国内外分流必备。',
    scene: '国内网站直连、国内 IP 直连、国内外分流',
  },
  'airlane-gfw': {
    label: '被墙名单',
    keywords: '被墙网站名单, GFWList 规则集, 翻墙规则, 国外代理规则',
    desc: '被墙网站黑名单规则集，聚合 GFWList 与被墙域名检测数据，命中即走代理。',
    scene: '被墙网站走代理、GFWList 分流',
  },
  'airlane-ads': {
    label: '广告拦截',
    keywords: '广告拦截规则, Clash广告规则, 去广告规则集, 广告域名屏蔽',
    desc: '广告拦截规则集，聚合 GeoSite-Ads、AWAvenue 秋风广告与 Shadowrocket 广告规则，五万条级覆盖。',
    scene: '网页广告拦截、App 广告过滤、跟踪域名屏蔽',
  },
  'airlane-google': {
    label: 'Google 服务',
    keywords: 'Google规则集, YouTube规则集, 谷歌分流规则, Gmail 规则',
    desc: 'Google 全家桶规则集，覆盖 Google 搜索、YouTube、Gmail、Google Drive 等。',
    scene: '谷歌服务走代理、YouTube 分流',
  },
  'airlane-microsoft': {
    label: '微软服务',
    keywords: '微软规则集, Microsoft规则集, Office365分流, Azure 规则',
    desc: '微软服务规则集，覆盖 Office 365、Azure、OneDrive、Xbox、Copilot。',
    scene: '微软服务分流、Teams/Outlook 直连或代理',
  },
  'airlane-apple': {
    label: 'Apple 服务',
    keywords: 'Apple规则集, 苹果服务分流, App Store 规则, iCloud 规则集',
    desc: 'Apple 服务规则集（含中国区 CDN 单独收录），覆盖 App Store、iCloud、Apple Music 等。',
    scene: '苹果服务分流、App Store 下载加速',
  },
  'airlane-ai': {
    label: 'AI 工具',
    keywords: 'AI工具分流规则, ChatGPT规则集, OpenAI规则集, Claude规则集, Gemini规则集',
    desc: 'AI 服务规则集，覆盖 OpenAI/ChatGPT、Claude、Gemini、Perplexity、Poe、Character.AI。',
    scene: 'ChatGPT/Claude 等 AI 工具走代理',
  },
  'airlane-streaming': {
    label: '流媒体',
    keywords: '流媒体分流规则, Netflix规则集, Disney+规则集, Spotify规则集, YouTube规则集',
    desc: '流媒体规则集，聚合 Netflix、Disney+、Spotify、YouTube 官方域名/IP 规则。',
    scene: 'Netflix/Disney+ 解锁分流、流媒体独立出口',
  },
  'airlane-gaming': {
    label: '游戏平台',
    keywords: '游戏规则集, 游戏加速规则, Steam规则集',
    desc: '游戏平台规则集，覆盖 Steam 全球服与中国区（steam@cn）。',
    scene: 'Steam 分流、游戏平台加速',
  },
  'airlane-social': {
    label: '社交媒体',
    keywords: '社交媒体规则集, Telegram规则集, TikTok规则集, Twitter规则集, Discord规则集, Reddit规则集',
    desc: '社交媒体规则集，聚合 Telegram、X(Twitter)、Discord、Reddit、TikTok。',
    scene: 'TG/TikTok/X 走代理、社媒独立出口',
  },
  'airlane-dev': {
    label: '开发者工具',
    keywords: '开发者工具规则集, GitHub规则集, Docker规则集, npm规则集, JetBrains规则集',
    desc: '开发者工具规则集，聚合 GitHub、Docker、JetBrains、npm 官方源规则。',
    scene: 'GitHub/Docker/npm 拉取加速',
  },
  'airlane-private': {
    label: '局域网',
    keywords: '局域网规则集, 私有网络规则集, 内网直连规则',
    desc: '局域网/私有地址规则集，内网域名与保留地址强制直连。',
    scene: '内网域名直连、私有地址不代理',
  },
};

/** 按客户端分的 5 个订阅章节 */
const CLIENTS = [
  { key: 'airlane', title: 'AirLane / sing-box（.srs）', fmt: 'srs',
    note: 'sing-box 二进制规则集，AirLane 客户端可直接订阅引用。' },
  { key: 'mihomo', title: 'Mihomo / Clash Meta（.mrs）', fmt: 'mrs',
    note: 'domain 行为规则集；含 IP 规则的分类另有 {id}-ipcidr.mrs，两个一起订阅。' },
  { key: 'clash', title: 'Clash（.yaml）', fmt: 'yaml',
    note: 'classical rule-provider 格式，通用 Clash 系。' },
  { key: 'shadowrocket', title: 'Shadowrocket 小火箭（.list）', fmt: 'list',
    note: '纯文本规则行，可直接作为小火箭规则订阅。' },
  { key: 'surge', title: 'Surge / Quantumult（.list）', fmt: 'list',
    note: '同一 .list 文本格式，Surge rule-set / Quantumult 规则引用通用。' },
];

const IPCIDR_MRS = new Set(['airlane-cn', 'airlane-ads', 'airlane-gfw', 'airlane-ai']); // 含 ipcidr 的集

function catalogTable({ linkPrefix = null } = {}) {
  const rows = manifest.sets.map((s) => {
    const meta = META[s.id] ?? {};
    const label = meta.label ?? s.displayName;
    const cell = linkPrefix ? `[${label}](${linkPrefix}/${s.id}.html)` : label;
    return `| \`${s.id}\` | ${cell} | ${meta.desc ?? ''} |`;
  });
  return ['| 规则集 | 分类 | 备注 |', '|---|---|---|', ...rows].join('\n');
}

function clientSections({ linkPrefix = REL, qr = true, heading = '###' } = {}) {
  const parts = [];
  for (const c of CLIENTS) {
    const rows = manifest.sets.map((s) => {
      const url = `${linkPrefix}/${s.id}.${c.fmt}`;
      const extra = c.fmt === 'mrs' && IPCIDR_MRS.has(s.id)
        ? `<br>[+ ipcidr](${linkPrefix}/${s.id}-ipcidr.mrs)`
        : '';
      const qrCell = qr ? `<a href="${QR(url, 400)}" target="_blank"><img src="${QR(url)}" width="72" alt="QR"></a>` : '`' + url + '`';
      return `| ${META[s.id]?.label ?? s.id} | [${s.id}.${c.fmt}](${url})${extra} | ${qrCell} |`;
    });
    parts.push(`${heading} ${c.title}\n\n${c.note}\n\n| 分类 | 订阅链接 | 扫码 |\n|---|---|---|\n${rows.join('\n')}`);
  }
  return parts.join('\n\n');
}

function inject(file, marker, content) {
  const begin = `<!-- AUTO:${marker}:BEGIN -->`;
  const end = `<!-- AUTO:${marker}:END -->`;
  const text = readFileSync(file, 'utf8');
  const re = new RegExp(`${begin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
  if (!re.test(text)) throw new Error(`marker ${marker} not found in ${file}`);
  writeFileSync(file, text.replace(re, `${begin}\n${content}\n${end}`));
}

// ── 分类着陆页 ──
for (const set of manifest.sets) {
  const meta = META[set.id];
  if (!meta) continue;
  const kws = meta.keywords.split(', ');
  const md = `---
title: "${set.displayName} 规则集下载 — ${kws.slice(0, 3).join(' / ')}"
description: "${meta.desc} 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 格式，每日自动更新。"
---

# ${set.displayName}

${meta.desc}

- **适用场景**：${meta.scene}
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 订阅链接

| 格式 | 客户端 | 链接 | 扫码 |
|---|---|---|---|
| .srs | sing-box / AirLane | [${set.id}.srs](${REL}/${set.id}.srs) | <a href="${QR(`${REL}/${set.id}.srs`, 400)}" target="_blank"><img src="${QR(`${REL}/${set.id}.srs`)}" width="72"></a> |
| .mrs | Mihomo / Clash Meta | [${set.id}.mrs](${REL}/${set.id}.mrs) | <a href="${QR(`${REL}/${set.id}.mrs`, 400)}" target="_blank"><img src="${QR(`${REL}/${set.id}.mrs`)}" width="72"></a> |
| .yaml | Clash 系 rule-provider | [${set.id}.yaml](${REL}/${set.id}.yaml) | <a href="${QR(`${REL}/${set.id}.yaml`, 400)}" target="_blank"><img src="${QR(`${REL}/${set.id}.yaml`)}" width="72"></a> |
| .list | Shadowrocket / Surge / 通用 | [${set.id}.list](${REL}/${set.id}.list) | <a href="${QR(`${REL}/${set.id}.list`, 400)}" target="_blank"><img src="${QR(`${REL}/${set.id}.list`)}" width="72"></a> |

> 中国大陆可用 jsDelivr/gh-proxy 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 不知道选哪个？

试试 [规则集选择向导](../quiz.html)（问卷式推荐），或直接使用 [AirLane](https://www.airlane.cloud) —— 已内置最常用规则集并默认生效。

[查看全部规则集](../) · 上游归属见 [NOTICE](${REPO}/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具 · [PoolVIP](https://poolvip.airlane.cloud) — VPS 与住宅 IP 团购
`;

  writeFileSync(join(PAGES, `${set.id}.md`), md);
}
console.log(`generated ${manifest.sets.length} category pages`);

// ── README.md / docs/index.md 标记块注入 ──
inject(join(ROOT, 'README.md'), 'CATALOG', catalogTable());
inject(join(ROOT, 'README.md'), 'CLIENTS', clientSections());
console.log('injected markers -> README.md');

// docs/index.md：目录表带分类页链接
inject(join(ROOT, 'docs', 'index.md'), 'CATALOG', catalogTable({ linkPrefix: 'rulesets' }));
inject(join(ROOT, 'docs', 'index.md'), 'CLIENTS', clientSections());
console.log('injected markers -> docs/index.md');
