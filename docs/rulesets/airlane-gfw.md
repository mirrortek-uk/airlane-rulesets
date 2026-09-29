---
title: "AirLane-被墙名单 规则集下载 — 被墙网站名单 / GFWList 规则集 / 翻墙规则"
description: "被墙网站黑名单规则集，聚合 GFWList 与被墙域名检测数据，命中即走代理。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-被墙名单

被墙网站黑名单规则集，聚合 GFWList 与被墙域名检测数据，命中即走代理。

- **适用场景**：被墙网站走代理、GFWList 分流
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-gfw.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-gfw.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-gfw.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-gfw.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.list) |
| .json | sing-box source | [`airlane-gfw.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-gfw",
  "format": "binary",
  "path": "rulesets/airlane-gfw.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-gfw:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-gfw:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gfw.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
