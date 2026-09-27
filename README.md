# airlane-rulesets

AirLane 自有规则集：聚合多个公开上游规则源，按业务分类合并为 sing-box `.srs` 规则集，通过 GitHub Releases 分发。

## 分类

| ID | 显示名 | 上游 |
|---|---|---|
| airlane-cn | AirLane-中国大陆 | geosite-cn + geoip-cn |
| airlane-ads | AirLane-广告拦截 | category-ads-all + AWAvenue |
| airlane-google | AirLane-Google 服务 | geosite-google |
| airlane-microsoft | AirLane-微软服务 | geosite-microsoft |
| airlane-apple | AirLane-Apple 服务 | geosite-apple + apple-cn |
| airlane-ai | AirLane-AI 服务 | OverseasAI |
| airlane-streaming | AirLane-流媒体 | netflix + disney + spotify + youtube |
| airlane-gaming | AirLane-游戏平台 | steam + steam@cn |
| airlane-social | AirLane-社交媒体 | telegram + twitter + discord + reddit + tiktok |
| airlane-dev | AirLane-开发者工具 | github + docker + jetbrains + npmjs |
| airlane-private | AirLane-局域网 | geosite-private |

## 本地构建

```bash
# 需要 sing-box 二进制（版本见 SING_BOX_VERSION，跟随客户端捆绑版本）
node scripts/merge.mjs --singbox /path/to/sing-box --out dist

# 只构建单个分类
node scripts/merge.mjs --singbox /path/to/sing-box --only airlane-ai
```

产物：`dist/airlane-*.srs` + `dist/airlane-*.json`（source）+ `dist/manifest.json`（条目数/sha256/时间戳）。

## 维护

- 加/改分类：只改 `manifest.json`（`sources[].type` 支持 `srs` / `source-json` / `clash-yaml` / `clash-list`）。
- 升级内核版本：改 `SING_BOX_VERSION`，CI 自动跟随。
- 发布：GitHub Actions 每周一自动跑，产物发到 Releases（tag = 日期）。
