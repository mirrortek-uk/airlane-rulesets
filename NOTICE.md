# 上游数据来源与许可

本仓库的产物由下列公开规则源聚合生成，版权归原项目所有：

| 上游 | 用于 |
|---|---|
| SagerNet/sing-geosite（MIT，数据源自 v2ray domain-list-community） | airlane-cn, airlane-ads, airlane-google, airlane-microsoft, airlane-apple, airlane-streaming, airlane-gaming, airlane-social, airlane-dev, airlane-private |
| Loyalsoldier/geoip（MaxMind GeoLite2 等） | airlane-cn |
| Loyalsoldier/cn-blocked-domain | airlane-gfw |
| gfwlist/gfwlist（LGPL） | airlane-gfw |
| TG-Twilight/AWAvenue-Ads-Rule | airlane-ads |
| johnshall/Shadowrocket-ADBlock-Rules-Forever | airlane-ads |
| viewer12/OverseasAI.list | airlane-ai |

聚合产物仅做格式转换、合并与精确去重，不对规则内容做语义修改
（`manual/` 下的人工修正清单除外，该部分为本仓库自有内容）。
各上游项目保留其原始许可条款；使用时请同时遵循上游许可。
