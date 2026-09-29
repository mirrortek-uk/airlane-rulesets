---
title: "AirLane-Apple 服务 规则集下载 — Apple规则集 / 苹果服务分流 / App Store 规则"
description: "Apple 服务规则集（含中国区 CDN 单独收录），覆盖 App Store、iCloud、Apple Music 等。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-Apple 服务

Apple 服务规则集（含中国区 CDN 单独收录），覆盖 App Store、iCloud、Apple Music 等。

- **适用场景**：苹果服务分流、App Store 下载加速
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-apple.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-apple.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-apple.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-apple.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.list) |
| .json | sing-box source | [`airlane-apple.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-apple",
  "format": "binary",
  "path": "rulesets/airlane-apple.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-apple:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-apple:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-apple.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
