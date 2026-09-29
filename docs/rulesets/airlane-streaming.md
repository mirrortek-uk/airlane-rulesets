---
title: "AirLane-流媒体 规则集下载 — 流媒体分流规则 / Netflix规则集 / Disney+规则集"
description: "流媒体规则集，聚合 Netflix、Disney+、Spotify、YouTube 官方域名/IP 规则。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-流媒体

流媒体规则集，聚合 Netflix、Disney+、Spotify、YouTube 官方域名/IP 规则。

- **适用场景**：Netflix/Disney+ 解锁分流、流媒体独立出口
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-streaming.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-streaming.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-streaming.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-streaming.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.list) |
| .json | sing-box source | [`airlane-streaming.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-streaming",
  "format": "binary",
  "path": "rulesets/airlane-streaming.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-streaming:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-streaming:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-streaming.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
