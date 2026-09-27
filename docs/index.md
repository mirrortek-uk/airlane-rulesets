---
title: airlane-rulesets — merged sing-box rule sets (.srs)
description: Weekly-merged sing-box rule sets aggregated from SagerNet geosite, Loyalsoldier geoip, AWAvenue Ads and OverseasAI. AirLane 分流规则集：按业务分类聚合的 sing-box srs 规则集。
---

# airlane-rulesets

Merged **sing-box rule sets** (`.srs` binary + source JSON), aggregated weekly from public
geosite/geoip upstreams and organized by business category:
China mainland (中国直连), ads blocking (广告拦截), Google, Microsoft, Apple, AI services
(OpenAI/Claude/Gemini), streaming (Netflix/Disney+/Spotify/YouTube), gaming (Steam),
social media (Telegram/X/Discord/Reddit/TikTok), developer tools (GitHub/Docker/JetBrains/npm),
and LAN/private addresses.

## Download / 下载

All `.srs` binaries are published on GitHub Releases:

- Latest release: <https://github.com/mirrortek-uk/airlane-rulesets/releases/latest>
- Manifest (entry counts + SHA256): `manifest.json` asset in every release
- Repository & source: <https://github.com/mirrortek-uk/airlane-rulesets>

## Quick start / 快速接入

```jsonc
{
  "type": "local",
  "tag": "airlane-cn",
  "format": "binary",
  "path": "rulesets/airlane-cn.srs"
}
```

## Rule set catalog / 规则集目录

| Tag | Category | Entries approx. |
|---|---|---|
| `airlane-cn` | 中国大陆 domains + IPs | ~19k |
| `airlane-apple` | Apple 服务 | ~2k |
| `airlane-google` | Google 服务 | ~900 |
| `airlane-ads` | 广告拦截 | ~900 |
| `airlane-microsoft` | 微软服务 | ~700 |
| `airlane-ai` | AI 服务 | ~600 |
| `airlane-streaming` | 流媒体 | ~450 |
| `airlane-private` | 局域网 | ~130 |
| `airlane-social` | 社交媒体 | ~120 |
| `airlane-dev` | 开发者工具 | ~95 |
| `airlane-gaming` | 游戏平台 | ~80 |

Built by GitHub Actions every Monday with the sing-box version pinned in
[`SING_BOX_VERSION`](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/SING_BOX_VERSION).
