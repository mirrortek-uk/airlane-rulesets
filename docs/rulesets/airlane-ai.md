---
title: "AirLane-AI 服务 规则集下载 — AI工具分流规则 / ChatGPT规则集 / OpenAI规则集"
description: "AI 服务规则集，覆盖 OpenAI/ChatGPT、Claude、Gemini、Perplexity、Poe、Character.AI。 支持 sing-box / Clash / Mihomo / Shadowrocket / Surge，提供 .srs .mrs .yaml .list 四种格式，每日自动更新。"
---

# AirLane-AI 服务

AI 服务规则集，覆盖 OpenAI/ChatGPT、Claude、Gemini、Perplexity、Poe、Character.AI。

- **适用场景**：ChatGPT/Claude 等 AI 工具走代理
- **格式**：`.srs`（sing-box）· `.mrs`（Mihomo/Clash Meta）· `.yaml` `.list`（Clash / Shadowrocket / Surge 等）
- **更新**：每日自动构建，条目数与 SHA256 见 release 内 manifest.json

## 下载地址

| 格式 | 客户端 | 链接 |
|---|---|---|
| .srs | sing-box / AirLane | [`airlane-ai.srs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.srs) |
| .mrs | Mihomo / Clash Meta | [`airlane-ai.mrs`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.mrs) |
| .yaml | Clash 系 rule-provider | [`airlane-ai.yaml`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.yaml) |
| .list | Surge / Shadowrocket / 通用文本 | [`airlane-ai.list`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.list) |
| .json | sing-box source | [`airlane-ai.json`](https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.json) |

> 中国大陆可用 jsDelivr 镜像或 [AirLane](https://www.airlane.cloud) 内置反代下载。

## 配置示例

### sing-box（AirLane）

```jsonc
{
  "type": "local",
  "tag": "airlane-ai",
  "format": "binary",
  "path": "rulesets/airlane-ai.srs"
}
```

### Mihomo / Clash Meta（rule-provider）

```yaml
rule-providers:
  airlane-ai:
    type: http
    behavior: domain
    format: mrs
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.mrs"
    interval: 86400
```

### Clash / Surge / Shadowrocket（classical 文本）

```yaml
rule-providers:
  airlane-ai:
    type: http
    behavior: classical
    url: "https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download/airlane-ai.yaml"
    interval: 86400
```

## 相关规则集

[查看全部规则集](../) | 上游归属见 [NOTICE](https://github.com/mirrortek-uk/airlane-rulesets/blob/main/NOTICE.md)

---

Powered by [AirLane](https://www.airlane.cloud) — 多平台规则代理工具。
