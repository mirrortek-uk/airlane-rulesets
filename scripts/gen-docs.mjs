#!/usr/bin/env node
/**
 * 由 manifest.json 生成 docs/rulesets/<id>.md 分类页（SEO/GEO 着陆页）。
 * 用法: node scripts/gen-docs.mjs
 */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const manifest = JSON.parse(readFileSync(join(ROOT, 'manifest.json'), 'utf8'));
const PAGES = join(ROOT, 'docs', 'rulesets');
mkdirSync(PAGES, { recursive: true });

const REL = 'https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download';

/** 每类的 SEO 关键词与简介 */
const META = {
  'airlane-cn': {
    keywords: '国内直连规则, 国内网站规则集, 中国域名规则, GeoSite-CN, GeoIP-CN, 国内外分流规则',
    desc: '中国大陆域名与 IP 直连规则集，聚合 GeoSite-CN 与 GeoIP-CN，国内外分流必备。',
    scene: '国内网站直连、国内 IP 直连、国内外分流',
  },
  'airlane-gfw': {
    keywords: '被墙网站名单, GFWList 规则集, 翻墙规则, 国外代理规则',
    desc: '被墙网站黑名单规则集，聚合 GFWList 与被墙域名检测数据，命中即走代理。',
    scene: '被墙网站走代理、GFWList 分流',
  },
  'airlane-ads': {
    keywords: '广告拦截规则, Clash广告规则, 去广告规则集, 广告域名屏蔽',
    desc: '广告拦截规则集，聚合 GeoSite-Ads、AWAvenue 秋风广告规则与 Shadowrocket 广告规则，五万条级覆盖。',
    scene: '网页广告拦截、App 广告过滤、跟踪域名屏蔽',
  },
  'airlane-google': {
    keywords: 'Google规则集, YouTube规则集, 谷歌分流规则, Gmail 规则',
    desc: 'Google 全家桶规则集，覆盖 Google 搜索、YouTube、Gmail、Google Drive 等。',
    scene: '谷歌服务走代理、YouTube 分流',
  },
  'airlane-microsoft': {
    keywords: '微软规则集, Microsoft规则集, Office365分流, Azure 规则',
    desc: '微软服务规则集，覆盖 Office 365、Azure、OneDrive、Xbox、Copilot。',
    scene: '微软服务分流、Teams/Outlook 直连或代理',
  },
  'airlane-apple': {
    keywords: 'Apple规则集, 苹果服务分流, App Store 规则, iCloud 规则集',
    desc: 'Apple 服务规则集（含中国区 CDN 单独收录），覆盖 App Store、iCloud、Apple Music 等。',
    scene: '苹果服务分流、App Store 下载加速',
  },
  'airlane-ai': {
    keywords: 'AI工具分流规则, ChatGPT规则集, OpenAI规则集, Claude规则集, Gemini规则集',
    desc: 'AI 服务规则集，覆盖 OpenAI/ChatGPT、Claude、Gemini、Perplexity、Poe、Character.AI。',
    scene: 'ChatGPT/Claude 等 AI 工具走代理',
  },
  'airlane-streaming': {
    keywords: '流媒体分流规则, Netflix规则集, Disney+规则集, Spotify规则集, YouTube规则集',
    desc: '流媒体规则集，聚合 Netflix、Disney+、Spotify、YouTube 官方域名/IP 规则。',
    scene: 'Netflix/Disney+ 解锁分流、流媒体独立出口',
  },
  'airlane-gaming': {
    keywords: '游戏规则集, 游戏加速规则, Steam规则集',
    desc: '游戏平台规则集，覆盖 Steam 全球服与中国区（steam@cn）。',
    scene: 'Steam 分流、游戏平台加速',
  },
  'airlane-social': {
    keywords: '社交媒体规则集, Telegram规则集, TikTok规则集, Twitter规则集, Discord规则集, Reddit规则集',
    desc: '社交媒体规则集，聚合 Telegram、X(Twitter)、Discord、Reddit、TikTok。',
    scene: 'TG/TikTok/X 走代理、社媒独立出口',
  },
  'airlane-dev': {
    keywords: '开发者工具规则集, GitHub规则集, Docker规则集, npm规则集, JetBrains规则集',
    desc: '开发者工具规则集，聚合 GitHub、Docker、JetBrains、npm 官方源规则。',
    scene: 'GitHub/Docker/npm 拉取加速',
  },
  'airlane-private': {
    keywords: '局域网规则集, 私有网络规则集, 内网直连规则',
    desc: '局域网/私有地址规则集，内网域名与保留地址强制直连。',
    scene: '内网域名直连、私有地址不代理',
  },
};

for (const set of manifest.sets) {
  const meta = META[set.id];
  if (!meta) continue;
  const kws = meta.keywords.split(', ');
  const md = `---
title: "${set.displayName} 规则集下载 — ${kws.slice(0, 3).join(' / ')}"
description: "${meta.desc} 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# ${set.displayName}

${meta.desc}

- **适用场景**：${meta.scene}
- **格式**：\`.srs\`（sing-box）· \`.mrs\`（Mihomo/Clash Meta）· \`.yaml\` \`.list\`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [\`airlane-${set.id.slice(8)}.srs\`](${REL}/${set.id}.srs) |
| .mrs | Mihomo / Clash Meta | [\`airlane-${set.id.slice(8)}.mrs\`](${REL}/${set.id}.mrs) |
| .yaml | Clash 系 rule-provider | [\`airlane-${set.id.slice(8)}.yaml\`](${REL}/${set.id}.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [\`airlane-${set.id.slice(8)}.list\`](${REL}/${set.id}.list) |
| .json | sing-box source | [\`airlane-${set.id.slice(8)}.json\`](${REL}/${set.id}.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

\`\`\`jsonc
{
  "type": "local",
  "tag": "${set.id}",
  "format": "binary",
  "path": "rulesets/${set.id}.srs"
}
\`\`\`

### Mihomo / Clash Meta（rule-provider）

\`\`\`yaml
rule-providers:
  ${set.id}:
    type: http
    behavior: domain
    format: mrs
    url: "${REL}/${set.id}.mrs"
    interval: 86400
\`\`\`

### Clash / Surge / Shadowrocket（classical 文本）

\`\`\`yaml
rule-providers:
  ${set.id}:
    type: http
    behavior: classical
    url: "${REL}/${set.id}.yaml"
    interval: 86400
\`\`\`

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
`;

  writeFileSync(join(PAGES, `${set.id}.md`), md);
}
console.log(`generated ${manifest.sets.length} category pages -> docs/rulesets/`);
