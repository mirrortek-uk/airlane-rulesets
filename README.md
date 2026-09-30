# airlane-rulesets — 最全的多平台分流规则集，一个站覆盖所有平台的规则 | Clash / Mihomo / sing-box 规则集

> **最全的多平台机场分流规则集，由 [AirLane](https://www.airlane.cloud) 聚合精选而成，拥有强大的广告过滤和国内外流量识别能力。**

把社区最可靠的公开规则源（GeoSite、GeoIP、GFWList、AWAvenue、Shadowrocket-ADBlock、OverseasAI）按业务分类合并去重，一次产出 **五种格式**，覆盖几乎所有主流代理客户端：`.srs`（sing-box）、`.mrs`（Mihomo/Clash Meta）、`.yaml`（Clash）、`.list`（Surge/Shadowrocket）、`.json`（source）。

- 📦 **下载/订阅**：[Releases](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest)（资产 URL 固定，可当订阅源在线更新）
- 📄 **条目与校验**：每个 release 附 `manifest.json`（各集条目数 + SHA256）
- 🔄 **更新频率**：每日自动构建
- 🌐 **文档站**：<https://mirrortek-uk.github.io/airlane-rulesets/>

## 规则集目录

<!-- AUTO:CATALOG:BEGIN -->
| 规则集 | 分类 | 备注 |
|---|---|---|
| `airlane-cn` | 国内直连 | 中国大陆域名与 IP 直连规则集，聚合 GeoSite-CN 与 GeoIP-CN，国内外分流必备。 |
| `airlane-ads` | 广告拦截 | 广告拦截规则集，聚合 GeoSite-Ads、AWAvenue 秋风广告与 Shadowrocket 广告规则，五万条级覆盖。 |
| `airlane-gfw` | 被墙名单 | 被墙网站黑名单规则集，聚合 GFWList 与被墙域名检测数据，命中即走代理。 |
| `airlane-google` | Google 服务 | Google 全家桶规则集，覆盖 Google 搜索、YouTube、Gmail、Google Drive 等。 |
| `airlane-microsoft` | 微软服务 | 微软服务规则集，覆盖 Office 365、Azure、OneDrive、Xbox、Copilot。 |
| `airlane-apple` | Apple 服务 | Apple 服务规则集（含中国区 CDN 单独收录），覆盖 App Store、iCloud、Apple Music 等。 |
| `airlane-ai` | AI 工具 | AI 服务规则集，覆盖 OpenAI/ChatGPT、Claude、Gemini、Perplexity、Poe、Character.AI。 |
| `airlane-streaming` | 流媒体 | 流媒体规则集，聚合 Netflix、Disney+、Spotify、YouTube 官方域名/IP 规则。 |
| `airlane-gaming` | 游戏平台 | 游戏平台规则集，覆盖 Steam 全球服与中国区（steam@cn）。 |
| `airlane-social` | 社交媒体 | 社交媒体规则集，聚合 Telegram、X(Twitter)、Discord、Reddit、TikTok。 |
| `airlane-dev` | 开发者工具 | 开发者工具规则集，聚合 GitHub、Docker、JetBrains、npm 官方源规则。 |
| `airlane-private` | 局域网 | 局域网/私有地址规则集，内网域名与保留地址强制直连。 |
<!-- AUTO:CATALOG:END -->

## 按客户端订阅

每个分类都有固定订阅链接，客户端里填 URL 即可（支持自动在线更新）。手机端可扫右侧二维码快速复制链接。

<!-- AUTO:CLIENTS:BEGIN -->
### AirLane / sing-box（.srs）

sing-box 二进制规则集，AirLane 客户端可直接订阅引用。

| 分类 | 订阅链接 | 扫码 |
|---|---|---|
| 国内直连 | [airlane-cn.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-cn.srs" width="72" alt="QR"> |
| 广告拦截 | [airlane-ads.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ads.srs" width="72" alt="QR"> |
| 被墙名单 | [airlane-gfw.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gfw.srs" width="72" alt="QR"> |
| Google 服务 | [airlane-google.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-google.srs" width="72" alt="QR"> |
| 微软服务 | [airlane-microsoft.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-microsoft.srs" width="72" alt="QR"> |
| Apple 服务 | [airlane-apple.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-apple.srs" width="72" alt="QR"> |
| AI 工具 | [airlane-ai.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ai.srs" width="72" alt="QR"> |
| 流媒体 | [airlane-streaming.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-streaming.srs" width="72" alt="QR"> |
| 游戏平台 | [airlane-gaming.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gaming.srs" width="72" alt="QR"> |
| 社交媒体 | [airlane-social.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-social.srs" width="72" alt="QR"> |
| 开发者工具 | [airlane-dev.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-dev.srs" width="72" alt="QR"> |
| 局域网 | [airlane-private.srs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.srs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-private.srs" width="72" alt="QR"> |

### Mihomo / Clash Meta（.mrs）

domain 行为规则集；含 IP 规则的分类另有 {id}-ipcidr.mrs，两个一起订阅。

| 分类 | 订阅链接 | 扫码 |
|---|---|---|
| 国内直连 | [airlane-cn.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.mrs)<br>[+ ipcidr](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn-ipcidr.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-cn.mrs" width="72" alt="QR"> |
| 广告拦截 | [airlane-ads.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.mrs)<br>[+ ipcidr](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads-ipcidr.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ads.mrs" width="72" alt="QR"> |
| 被墙名单 | [airlane-gfw.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.mrs)<br>[+ ipcidr](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw-ipcidr.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gfw.mrs" width="72" alt="QR"> |
| Google 服务 | [airlane-google.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-google.mrs" width="72" alt="QR"> |
| 微软服务 | [airlane-microsoft.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-microsoft.mrs" width="72" alt="QR"> |
| Apple 服务 | [airlane-apple.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-apple.mrs" width="72" alt="QR"> |
| AI 工具 | [airlane-ai.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.mrs)<br>[+ ipcidr](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai-ipcidr.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ai.mrs" width="72" alt="QR"> |
| 流媒体 | [airlane-streaming.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-streaming.mrs" width="72" alt="QR"> |
| 游戏平台 | [airlane-gaming.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gaming.mrs" width="72" alt="QR"> |
| 社交媒体 | [airlane-social.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-social.mrs" width="72" alt="QR"> |
| 开发者工具 | [airlane-dev.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-dev.mrs" width="72" alt="QR"> |
| 局域网 | [airlane-private.mrs](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.mrs) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-private.mrs" width="72" alt="QR"> |

### Clash（.yaml）

classical rule-provider 格式，通用 Clash 系。

| 分类 | 订阅链接 | 扫码 |
|---|---|---|
| 国内直连 | [airlane-cn.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-cn.yaml" width="72" alt="QR"> |
| 广告拦截 | [airlane-ads.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ads.yaml" width="72" alt="QR"> |
| 被墙名单 | [airlane-gfw.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gfw.yaml" width="72" alt="QR"> |
| Google 服务 | [airlane-google.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-google.yaml" width="72" alt="QR"> |
| 微软服务 | [airlane-microsoft.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-microsoft.yaml" width="72" alt="QR"> |
| Apple 服务 | [airlane-apple.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-apple.yaml" width="72" alt="QR"> |
| AI 工具 | [airlane-ai.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ai.yaml" width="72" alt="QR"> |
| 流媒体 | [airlane-streaming.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-streaming.yaml" width="72" alt="QR"> |
| 游戏平台 | [airlane-gaming.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gaming.yaml" width="72" alt="QR"> |
| 社交媒体 | [airlane-social.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-social.yaml" width="72" alt="QR"> |
| 开发者工具 | [airlane-dev.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-dev.yaml" width="72" alt="QR"> |
| 局域网 | [airlane-private.yaml](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.yaml) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-private.yaml" width="72" alt="QR"> |

### Shadowrocket 小火箭（.list）

纯文本规则行，可直接作为小火箭规则订阅。

| 分类 | 订阅链接 | 扫码 |
|---|---|---|
| 国内直连 | [airlane-cn.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-cn.list" width="72" alt="QR"> |
| 广告拦截 | [airlane-ads.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ads.list" width="72" alt="QR"> |
| 被墙名单 | [airlane-gfw.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gfw.list" width="72" alt="QR"> |
| Google 服务 | [airlane-google.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-google.list" width="72" alt="QR"> |
| 微软服务 | [airlane-microsoft.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-microsoft.list" width="72" alt="QR"> |
| Apple 服务 | [airlane-apple.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-apple.list" width="72" alt="QR"> |
| AI 工具 | [airlane-ai.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ai.list" width="72" alt="QR"> |
| 流媒体 | [airlane-streaming.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-streaming.list" width="72" alt="QR"> |
| 游戏平台 | [airlane-gaming.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gaming.list" width="72" alt="QR"> |
| 社交媒体 | [airlane-social.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-social.list" width="72" alt="QR"> |
| 开发者工具 | [airlane-dev.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-dev.list" width="72" alt="QR"> |
| 局域网 | [airlane-private.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-private.list" width="72" alt="QR"> |

### Surge / Quantumult（.list）

同一 .list 文本格式，Surge rule-set / Quantumult 规则引用通用。

| 分类 | 订阅链接 | 扫码 |
|---|---|---|
| 国内直连 | [airlane-cn.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-cn.list" width="72" alt="QR"> |
| 广告拦截 | [airlane-ads.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ads.list" width="72" alt="QR"> |
| 被墙名单 | [airlane-gfw.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gfw.list" width="72" alt="QR"> |
| Google 服务 | [airlane-google.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-google.list" width="72" alt="QR"> |
| 微软服务 | [airlane-microsoft.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-microsoft.list" width="72" alt="QR"> |
| Apple 服务 | [airlane-apple.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-apple.list" width="72" alt="QR"> |
| AI 工具 | [airlane-ai.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-ai.list" width="72" alt="QR"> |
| 流媒体 | [airlane-streaming.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-streaming.list" width="72" alt="QR"> |
| 游戏平台 | [airlane-gaming.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-gaming.list" width="72" alt="QR"> |
| 社交媒体 | [airlane-social.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-social.list" width="72" alt="QR"> |
| 开发者工具 | [airlane-dev.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-dev.list" width="72" alt="QR"> |
| 局域网 | [airlane-private.list](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.list) | <img src="https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=https%3A%2F%2Fgithub.com%2Fmirrortek-uk%2Fairlane-rulesets%2Freleases%2Flatest%2Fdownload%2Fairlane-private.list" width="72" alt="QR"> |
<!-- AUTO:CLIENTS:END -->

## 怎么选？（分流方案速查）

**如果你不想研究规则**——直接下载使用 [AirLane](https://www.airlane.cloud)，它已经内置了最常用规则集并默认生效，开箱即用无需配置。

想用问卷帮你选？去文档站的 **[规则集选择向导](https://mirrortek-uk.github.io/airlane-rulesets/quiz.html)**，回答两个问题就能得到推荐组合。

| 需求 | 规则集组合 |
|---|---|
| 国内外分流 | `airlane-gfw`→代理 + `airlane-cn`/`airlane-private`→直连，兜底代理 |
| 直连去广告 | 上表 + `airlane-ads`→拦截 |
| 流媒体/AI 独立出口 | `airlane-streaming`/`airlane-ai`→对应节点组 |
| 回国加速 | `airlane-cn`→国内节点 |

## 纠错与贡献

发现某个域名分错流？往 `manual/{分类id}.add.txt` / `{分类id}.remove.txt` 提 PR（格式 `DOMAIN-SUFFIX,example.com` 每行一条），下次构建自动并入/剔除。也欢迎直接改 `manifest.json` 增加上游源。

Fork 本仓 → 开启 Actions → 你就拥有自己的每日构建规则集。

## 相关项目

- [AirLane](https://www.airlane.cloud) — 多平台规则代理工具，内置本规则集一键启用
- [PoolVIP](https://poolvip.airlane.cloud) — VPS 与住宅 IP 团购

上游归属见 [NOTICE.md](NOTICE.md)，许可 [MIT](LICENSE)。
