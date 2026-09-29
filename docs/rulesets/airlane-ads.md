---
title: "AirLane-广告拦截 规则集下载 — 广告拦截规则 / Clash广告规则 / 去广告规则集"
description: "广告拦截规则集，聚合 GeoSite-Ads、AWAvenue 秋风广告规则与 Shadowrocket 广告规则，五万条级覆盖。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-广告拦截

广告拦截规则集，聚合 GeoSite-Ads、AWAvenue 秋风广告规则与 Shadowrocket 广告规则，五万条级覆盖。

- **适用场景**：网页广告拦截、App 广告过滤、跟踪域名屏蔽
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-ads.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-ads.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-ads.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-ads.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.list) |
| .json | sing-box source | [`airlane-ads.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-ads",
  "format": "binary",
  "path": "rulesets/airlane-ads.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-ads:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-ads:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ads.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
