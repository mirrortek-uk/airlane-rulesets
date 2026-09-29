# airlane-rulesets — 最全的多平台分流规则集 | Clash / Mihomo / sing-box 规则集

> **最全的多平台机场分流规则集，由 AirLane 聚合精选而成，拥有强大的广告过滤和国内外流量识别能力。**

**airlane-rulesets** 把社区最可靠的公开规则源（SagerNet GeoSite、Loyalsoldier GeoIP、GFWList、AWAvenue 广告规则、Shadowrocket-ADBlock、OverseasAI）按业务分类合并去重，一次产出 **五种格式**，覆盖几乎所有主流代理客户端：

| 格式 | 客户端 | 说明 |
|---|---|---|
| `.srs` | sing-box / AirLane | 二进制规则集，加载最快 |
| `.mrs` | Mihomo / Clash Meta | domain 行为二进制（含 IP 的集另有 `-ipcidr.mrs`） |
| `.yaml` | Clash / Clash Meta | classical rule-provider |
| `.list` | Surge / Shadowrocket / Quantumult | 纯文本规则行 |
| `.json` | sing-box source | 可读源格式 |

- 📦 **下载/订阅**：[Releases](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest)（资产 URL 固定，可当 `rule-providers` 订阅源在线更新）
- 📄 **条目与校验**：每个 release 附 `manifest.json`（各集条目数 + SHA256）
- 🔄 **更新频率**：每日自动构建（北京时间 9:00，上游日更完成后）
- 🌐 **文档站**：<https://mirrortek-uk.github.io/airlane-rulesets/>

---

**English**: The most comprehensive multi-platform proxy rule sets curated by AirLane —
merged weekly/daily from public geosite/geoip sources into category-based rule sets
for sing-box (.srs), Mihomo/Clash Meta (.mrs), Clash (.yaml), and Surge/Shadowrocket (.list).

## 规则集目录

| Tag | 分类 | 规模 | 上游 |
|---|---|---|---|
| `airlane-cn` | 国内直连规则 | ~19k | geosite-cn + geoip-cn |
| `airlane-gfw` | 被墙名单/国外代理 | ~28k | GFWList + cn-blocked-domain |
| `airlane-ads` | 广告拦截规则 | ~55k | category-ads-all + AWAvenue + SR-ADBlock |
| `airlane-google` | Google 服务 | ~940 | geosite-google |
| `airlane-microsoft` | 微软服务 | ~700 | geosite-microsoft |
| `airlane-apple` | Apple 服务 | ~2k | geosite-apple + apple@cn |
| `airlane-ai` | AI 工具分流 | ~590 | OverseasAI (ChatGPT/Claude/Gemini/Poe) |
| `airlane-streaming` | 流媒体 | ~450 | netflix + disney + spotify + youtube |
| `airlane-gaming` | 游戏平台 | ~80 | steam + steam@cn |
| `airlane-social` | 社交媒体 | ~120 | telegram + twitter + discord + reddit + tiktok |
| `airlane-dev` | 开发者工具 | ~95 | github + docker + jetbrains + npmjs |
| `airlane-private` | 局域网 | ~130 | geosite-private |

## 快速接入

### sing-box / AirLane

```jsonc
{
  "route": {
    "rules": [
      { "rule_set": ["airlane-ads"], "action": "reject" },
      { "rule_set": ["airlane-gfw"], "outbound": "proxy" },
      { "rule_set": ["airlane-cn"], "outbound": "direct" }
    ],
    "rule_set": [{
      "type": "local", "tag": "airlane-cn",
      "format": "binary", "path": "rulesets/airlane-cn.srs"
    }]
  }
}
```

### Mihomo / Clash Meta（订阅在线更新）

```yaml
rule-providers:
  airlane-cn:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.mrs"
    interval: 86400
rules:
  - RULE-SET,airlane-cn,DIRECT
```

### Clash / Shadowrocket / Surge

用 `.yaml`（classical provider）或 `.list`（纯文本）格式，URL 同上换后缀即可。

## 怎么选？（分流方案速查）

| 需求 | 规则集组合 |
|---|---|
| 国内外分流 | `airlane-gfw`→代理 + `airlane-cn`/`airlane-private`→直连，兜底代理 |
| 直连去广告 | 上表 + `airlane-ads`→拦截 |
| 流媒体/AI 独立出口 | `airlane-streaming`/`airlane-ai`→对应节点组 |
| 回国加速 | `airlane-cn`→国内节点 |

## 本地构建

```bash
node scripts/merge.mjs --singbox /path/to/sing-box --mihomo /path/to/mihomo --out dist
node scripts/merge.mjs --only airlane-ai   # 只构建单个分类（--mihomo 可省略跳过 mrs）
```

## 纠错与贡献

发现某个域名分错流？上游错了我们没法改源头，但可以走**人工修正清单**：
往 `manual/{分类id}.add.txt` / `{分类id}.remove.txt` 提 PR（格式 `DOMAIN-SUFFIX,example.com`
每行一条），下次构建自动并入/剔除。也欢迎直接改 `manifest.json` 增加上游源。

Fork 本仓 → 开启 Actions → 你就拥有自己的每日构建规则集。

## 相关项目

- [AirLane](https://www.airlane.cloud) — 多平台规则代理工具，内置本规则集一键启用
- [PoolVIP](https://poolvip.airlane.cloud) — VPS 与住宅 IP 团购

上游归属见 [NOTICE.md](NOTICE.md)，许可 [MIT](LICENSE)。
