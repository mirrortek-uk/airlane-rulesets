---
title: "AirLane-开发者工具 规则集下载 — 开发者工具规则集 / GitHub规则集 / Docker规则集"
description: "开发者工具规则集，聚合 GitHub、Docker、JetBrains、npm 官方源规则。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-开发者工具

开发者工具规则集，聚合 GitHub、Docker、JetBrains、npm 官方源规则。

- **适用场景**：GitHub/Docker/npm 拉取加速
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-dev.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-dev.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-dev.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-dev.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.list) |
| .json | sing-box source | [`airlane-dev.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-dev",
  "format": "binary",
  "path": "rulesets/airlane-dev.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-dev:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-dev:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-dev.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
