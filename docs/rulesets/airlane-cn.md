---
title: "AirLane-中国大陆 规则集下载 — 国内直连规则 / 国内网站规则集 / 中国域名规则"
description: "中国大陆域名与 IP 直连规则集，聚合 GeoSite-CN 与 GeoIP-CN，国内外分流必备。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-中国大陆

中国大陆域名与 IP 直连规则集，聚合 GeoSite-CN 与 GeoIP-CN，国内外分流必备。

- **适用场景**：国内网站直连、国内 IP 直连、国内外分流
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-cn.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-cn.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-cn.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-cn.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.list) |
| .json | sing-box source | [`airlane-cn.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-cn",
  "format": "binary",
  "path": "rulesets/airlane-cn.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-cn:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-cn:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-cn.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
