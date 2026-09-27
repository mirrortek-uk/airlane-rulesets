# airlane-rulesets — AirLane merged sing-box rule sets (.srs)

**airlane-rulesets** is a collection of ready-to-use **sing-box rule sets** in binary `.srs` format,
aggregated and merged weekly from the most trusted public rule sources
(SagerNet sing-geosite, Loyalsoldier geoip, AWAvenue Ads, OverseasAI).
Each rule set targets one business category — China mainland, ads blocking, Google, Apple,
Microsoft, AI services, streaming, gaming, social media, developer tools, LAN/private —
so proxy clients can pick a single `rule_set` per category instead of managing dozens of upstream lists.

**AirLane 规则集**是一套开箱即用的 **sing-box 分流规则集**（`.srs` 二进制 + source JSON），
把 SagerNet geosite、Loyalsoldier geoip、AWAvenue 广告规则、OverseasAI 等多个社区上游
按业务分类合并去重，每周由 GitHub Actions 自动重建并发布到 Releases。
客户端只需按类别引用一个 `rule_set`，即可获得"中国大陆域名/IP、广告拦截、流媒体、AI 服务"
等完整分流能力。

- 📦 Latest release / 最新发布: [Releases](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest)
- 📄 Per-set entry counts & SHA256 / 各集条目数与校验值: `manifest.json` in each release
- 🔄 Update cadence / 更新频率: weekly（每周一自动构建）
- 🧩 Compatible with / 兼容: sing-box ≥ 1.14（`rule_set` type local binary `format: "binary"`）

## Rule sets / 规则集清单

| ID | 显示名 | Category | Upstream sources |
|---|---|---|---|
| `airlane-cn` | AirLane-中国大陆 | China mainland domains + IPs | geosite-cn + geoip-cn |
| `airlane-ads` | AirLane-广告拦截 | Ads blocking | category-ads-all + AWAvenue-Ads |
| `airlane-google` | AirLane-Google 服务 | Google / YouTube / Gmail | geosite-google |
| `airlane-microsoft` | AirLane-微软服务 | Office 365 / Azure / Xbox / Copilot | geosite-microsoft |
| `airlane-apple` | AirLane-Apple 服务 | Apple global + China CDN | geosite-apple + apple@cn |
| `airlane-ai` | AirLane-AI 服务 | OpenAI / Claude / Gemini / Poe … | OverseasAI |
| `airlane-streaming` | AirLane-流媒体 | Netflix / Disney+ / Spotify / YouTube | geosite-netflix + disney + spotify + youtube |
| `airlane-gaming` | AirLane-游戏平台 | Steam global + China | geosite-steam + steam@cn |
| `airlane-social` | AirLane-社交媒体 | Telegram / X / Discord / Reddit / TikTok | geosite-telegram + twitter + discord + reddit + tiktok |
| `airlane-dev` | AirLane-开发者工具 | GitHub / Docker / JetBrains / npm | geosite-github + docker + jetbrains + npmjs |
| `airlane-private` | AirLane-局域网 | LAN / private addresses | geosite-private |

## Usage / 使用方法

Download `.srs` files from the latest release and reference them as local binary rule sets:

```jsonc
{
  "route": {
    "rules": [
      { "rule_set": ["airlane-ads"], "action": "reject" },
      { "rule_set": ["airlane-cn"], "outbound": "direct" },
      { "rule_set": ["airlane-google"], "outbound": "proxy" }
    ],
    "rule_set": [
      {
        "type": "local",
        "tag": "airlane-cn",
        "format": "binary",
        "path": "rulesets/airlane-cn.srs"
      }
    ]
  }
}
```

Or use them as remote rule sets with `download_detour` — every release asset has a stable URL:

```text
https://github.com/mirrortek-uk/airlane-rulesets/releases/download/<TAG>/airlane-cn.srs
```

中国大陆用户可将下载域名替换为 jsDelivr 镜像或自建反代；`manifest.json` 提供每个文件的
SHA256 用于完整性校验。

## Build & maintenance / 构建与维护

```bash
node scripts/merge.mjs --singbox /path/to/sing-box --out dist   # build all
node scripts/merge.mjs --singbox /path/to/sing-box --only airlane-ai  # single set
```

- `manifest.json`（仓库根目录）是唯一手工维护文件：分类 ID → 上游源列表
  （`type` 支持 `srs` / `source-json` / `clash-yaml` / `clash-list`）。
- `SING_BOX_VERSION` 固定 decompile/compile 用的 sing-box 版本，与 AirLane 客户端捆绑内核保持一致。
- CI 每周一构建并把 `dist/` 发到 GitHub Releases（tag 为日期，如 `v20260927`）。

Upstream attributions / 上游许可见 [NOTICE.md](NOTICE.md)。

## FAQ

**What is airlane-rulesets?** A set of merged sing-box `.srs` rule sets for domain/IP-based
traffic routing, built weekly from public geosite/geoip sources and organized by business category.

**airlane-rulesets 是什么？** 面向 sing-box 的按业务分类聚合规则集（域名/IP 分流），
每周自动从公开 geosite/geoip 上游合并构建。

**How often is it updated?** Weekly, via GitHub Actions; each release ships `.srs` binaries,
human-readable source `.json`, and a `manifest.json` with entry counts and SHA256 checksums.
