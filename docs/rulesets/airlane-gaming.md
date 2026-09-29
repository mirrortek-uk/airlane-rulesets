---
title: "AirLane-游戏平台 规则集下载 — 游戏规则集 / 游戏加速规则 / Steam规则集"
description: "游戏平台规则集，覆盖 Steam 全球服与中国区（steam@cn）。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-游戏平台

游戏平台规则集，覆盖 Steam 全球服与中国区（steam@cn）。

- **适用场景**：Steam 分流、游戏平台加速
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-gaming.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-gaming.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-gaming.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-gaming.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.list) |
| .json | sing-box source | [`airlane-gaming.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-gaming",
  "format": "binary",
  "path": "rulesets/airlane-gaming.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-gaming:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-gaming:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-gaming.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
