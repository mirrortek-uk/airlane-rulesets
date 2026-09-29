---
title: "AirLane-社交媒体 规则集下载 — 社交媒体规则集 / Telegram规则集 / TikTok规则集"
description: "社交媒体规则集，聚合 Telegram、X(Twitter)、Discord、Reddit、TikTok。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-社交媒体

社交媒体规则集，聚合 Telegram、X(Twitter)、Discord、Reddit、TikTok。

- **适用场景**：TG/TikTok/X 走代理、社媒独立出口
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-social.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-social.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-social.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-social.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.list) |
| .json | sing-box source | [`airlane-social.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-social",
  "format": "binary",
  "path": "rulesets/airlane-social.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-social:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-social:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-social.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
