---
title: AirLane 规则集 — 最全的多平台分流规则集 | Clash/Mihomo/sing-box 规则下载
description: AirLane 分流规则集大全：聚合 GeoSite、GeoIP、GFWList、广告拦截等公开规则源，按业务分类合并为 Clash 分流规则、Mihomo 规则集、sing-box 规则集（srs/mrs/yaml/list 四格式），每日自动更新免费下载。
---

# AirLane 分流规则集 · 多平台代理规则大全

**AirLane 规则集**是一套每日自动构建的**多平台分流规则集**：聚合 SagerNet GeoSite、Loyalsoldier GeoIP、GFWList、AWAvenue、Shadowrocket-ADBlock、OverseasAI 等公开规则源，按业务分类合并去重，同时提供 **sing-box 规则集（.srs）**、**Mihomo/Clash Meta 规则集（.mrs）**、**Clash 分流规则（.yaml）** 与**通用文本规则（.list）** 四种格式，免费下载、支持在线订阅更新。

无论你是找 **Clash 规则下载**、**Mihomo 分流规则**、**sing-box 规则集**，还是 **国内直连规则 / 国外代理规则 / 广告拦截规则**，这里都有现成的分类集合。

## 格式与客户端对照

| 格式 | 适用客户端 | 说明 |
|---|---|---|
| `.srs` | sing-box、AirLane | 二进制规则集，加载最快 |
| `.mrs` | Mihomo、Clash Meta | domain/ipcidr 行为二进制 |
| `.yaml` | Clash、Clash Meta | classical rule-provider |
| `.list` | Surge、Shadowrocket、Quantumult | 纯文本规则行 |
| `.json` | sing-box source | 可读源格式，便于审计 |

## 规则集目录（点击进分类页查看用法）

| 规则集 | 分类 | 说明 |
|---|---|---|
| [airlane-cn](rulesets/airlane-cn.html) | 国内直连 | 中国大陆域名 + IP（GeoSite-CN + GeoIP-CN），国内外分流核心 |
| [airlane-gfw](rulesets/airlane-gfw.html) | 国外代理 | GFWList 被墙名单 + 被墙域名检测，命中即代理 |
| [airlane-ads](rulesets/airlane-ads.html) | 广告拦截 | 5.4 万条广告/跟踪域名，覆盖网页与 App 广告 |
| [airlane-google](rulesets/airlane-google.html) | Google 服务 | Google 搜索、YouTube、Gmail |
| [airlane-microsoft](rulesets/airlane-microsoft.html) | 微软服务 | Office 365、Azure、OneDrive、Xbox、Copilot |
| [airlane-apple](rulesets/airlane-apple.html) | Apple 服务 | App Store、iCloud（含中国区 CDN 分册） |
| [airlane-ai](rulesets/airlane-ai.html) | AI 工具 | ChatGPT/OpenAI、Claude、Gemini、Perplexity、Poe |
| [airlane-streaming](rulesets/airlane-streaming.html) | 流媒体 | Netflix、Disney+、Spotify、YouTube |
| [airlane-gaming](rulesets/airlane-gaming.html) | 游戏平台 | Steam 全球 + 中国区，游戏加速分流 |
| [airlane-social](rulesets/airlane-social.html) | 社交媒体 | Telegram、X/Twitter、Discord、Reddit、TikTok |
| [airlane-dev](rulesets/airlane-dev.html) | 开发者工具 | GitHub、Docker、JetBrains、npm |
| [airlane-private](rulesets/airlane-private.html) | 局域网 | 私有地址、内网域名强制直连 |

## 下载与订阅

- **最新版下载**：[GitHub Releases](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest)（每个资产 URL 固定，可作为 Clash/Mihomo `rule-providers` 订阅源，客户端自动在线更新）
- **条目数与校验**：每个 release 内附 `manifest.json`，含各集条目数与 SHA256
- **国内镜像**：GitHub 直连不稳时可用 jsDelivr/gh-proxy 镜像或 AirLane 客户端内置反代
- **仓库与源码**：[mirrortek-uk/airlane-rulesets](https://github.com/mirrortek-uk/airlane-rulesets)

## 推荐组合

| 需求 | 推荐规则集 |
|---|---|
| 日常翻墙分流 | `airlane-gfw` → 代理，`airlane-cn` + `airlane-private` → 直连 |
| 去广告 | `airlane-ads` → 拦截 |
| 流媒体解锁 | `airlane-streaming` → 流媒体专用节点 |
| AI 工具 | `airlane-ai` → 稳定的欧美节点 |
| 回国加速 | `airlane-cn` → 国内节点（反向使用） |

## 相关项目

- [AirLane](https://www.airlane.cloud) — 多平台规则代理工具，内置以上规则集一键启用
- [PoolVIP](https://poolvip.airlane.cloud) — VPS 与住宅 IP 团购

---

*关键词：分流规则、代理规则、Clash 分流规则、Clash 规则下载、Mihomo 规则集、sing-box 规则集、sing-box 分流规则、GeoSite 规则集、GeoIP 规则集、域名规则集、IP 规则集、国内直连规则、国外代理规则、国内外分流规则、广告拦截规则、流媒体分流规则、Netflix 规则集、YouTube 规则集、TikTok 规则集、Telegram 规则集、游戏规则集、AI 工具分流规则、免费规则集、规则集订阅、规则集大全、Clash 规则大全*
