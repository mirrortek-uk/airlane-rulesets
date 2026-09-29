---
title: "AirLane-Google 服务 规则集下载 — Google规则集 / YouTube规则集 / 谷歌分流规则"
description: "Google 全家桶规则集，覆盖 Google 搜索、YouTube、Gmail、Google Drive 等。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-Google 服务

Google 全家桶规则集，覆盖 Google 搜索、YouTube、Gmail、Google Drive 等。

- **适用场景**：谷歌服务走代理、YouTube 分流
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-google.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-google.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-google.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-google.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.list) |
| .json | sing-box source | [`airlane-google.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-google",
  "format": "binary",
  "path": "rulesets/airlane-google.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-google:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-google:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-google.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
