---
title: "AirLane-局域网 规则集下载 — 局域网规则集 / 私有网络规则集 / 内网直连规则"
description: "局域网/私有地址规则集，内网域名与保留地址强制直连。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-局域网

局域网/私有地址规则集，内网域名与保留地址强制直连。

- **适用场景**：内网域名直连、私有地址不代理
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-private.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-private.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-private.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-private.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.list) |
| .json | sing-box source | [`airlane-private.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-private",
  "format": "binary",
  "path": "rulesets/airlane-private.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-private:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-private:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-private.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
