---
title: "AirLane-微软服务 规则集下载 — 微软规则集 / Microsoft规则集 / Office365分流"
description: "微软服务规则集，覆盖 Office 365、Azure、OneDrive、Xbox、Copilot。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-微软服务

微软服务规则集，覆盖 Office 365、Azure、OneDrive、Xbox、Copilot。

- **适用场景**：微软服务分流、Teams/Outlook 直连或代理
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-microsoft.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-microsoft.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-microsoft.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-microsoft.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.list) |
| .json | sing-box source | [`airlane-microsoft.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-microsoft",
  "format": "binary",
  "path": "rulesets/airlane-microsoft.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-microsoft:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-microsoft:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-microsoft.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
