---
title: 规则集选择向导 — AirLane 分流规则集
description: 回答两个问题，为你推荐最合适的分流规则集组合与订阅链接。
---

# 规则集选择向导

回答下面几个问题，自动生成适合你的规则集组合与订阅链接。

<div id="quiz" style="max-width:640px">
  <p><b>1. 你用的客户端是？</b></p>
  <label><input type="radio" name="client" value="srs" checked> AirLane / sing-box</label><br>
  <label><input type="radio" name="client" value="mrs"> Mihomo / Clash Meta（Clash Verge、ClashX Meta 等）</label><br>
  <label><input type="radio" name="client" value="yaml"> Clash（原版 / Premium）</label><br>
  <label><input type="radio" name="client" value="list-sr"> Shadowrocket 小火箭</label><br>
  <label><input type="radio" name="client" value="list-surge"> Surge / Quantumult / Loon</label><br>

  <p><b>2. 你的主要用法？</b></p>
  <label><input type="radio" name="mode" value="split" checked> 国内外分流（国内直连、国外代理）</label><br>
  <label><input type="radio" name="mode" value="gfw"> 只代理被墙网站（其他全直连）</label><br>
  <label><input type="radio" name="mode" value="ads"> 只想去广告</label><br>
  <label><input type="radio" name="mode" value="backcn"> 回国加速（在国外访问国内服务）</label><br>

  <p><b>3. 需要广告拦截吗？</b>
  <label><input type="checkbox" name="ads"> 需要（推荐）</label></p>

  <p><b>4. 有独立出口需求的场景？</b>（可多选）</p>
  <label><input type="checkbox" name="extra" value="airlane-streaming"> 流媒体（Netflix/Disney+/YouTube）</label><br>
  <label><input type="checkbox" name="extra" value="airlane-ai"> AI 工具（ChatGPT/Claude/Gemini）</label><br>
  <label><input type="checkbox" name="extra" value="airlane-social"> 社交媒体（TG/X/Discord/TikTok）</label><br>
  <label><input type="checkbox" name="extra" value="airlane-gaming"> 游戏平台（Steam）</label><br>
  <label><input type="checkbox" name="extra" value="airlane-google"> Google 服务</label><br>
  <label><input type="checkbox" name="extra" value="airlane-microsoft"> 微软服务</label><br>
  <label><input type="checkbox" name="extra" value="airlane-apple"> Apple 服务</label><br>
  <label><input type="checkbox" name="extra" value="airlane-dev"> 开发者工具（GitHub/Docker/npm）</label><br>

  <p><button onclick="recommend();return false" style="padding:8px 20px;font-size:15px">生成推荐 →</button></p>
  <div id="out"></div>
</div>

<script>
const REL = 'https://github.com/mirrortek-uk/airlane-rulesets/releases/latest/download';
const NAMES = {
  'airlane-cn': '中国大陆（直连）', 'airlane-gfw': '被墙名单（代理）',
  'airlane-ads': '广告拦截', 'airlane-private': '局域网（直连）',
  'airlane-streaming': '流媒体', 'airlane-ai': 'AI 服务',
  'airlane-social': '社交媒体', 'airlane-gaming': '游戏平台',
  'airlane-google': 'Google 服务', 'airlane-microsoft': '微软服务',
  'airlane-apple': 'Apple 服务', 'airlane-dev': '开发者工具',
};
const FMT = { srs: 'srs', mrs: 'mrs', yaml: 'yaml', 'list-sr': 'list', 'list-surge': 'list' };
const QR = (u) => 'https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=' + encodeURIComponent(u);

function recommend() {
  const client = document.querySelector('input[name=client]:checked').value;
  const mode = document.querySelector('input[name=mode]:checked').value;
  const ads = document.querySelector('input[name=ads]').checked;
  const sets = [];
  const add = (id, action) => sets.push({ id, action });

  if (mode === 'split') {
    add('airlane-gfw', '走代理');
    add('airlane-cn', '直连');
    add('airlane-private', '直连');
  } else if (mode === 'gfw') {
    add('airlane-gfw', '走代理');
    add('airlane-private', '直连');
  } else if (mode === 'ads') {
    add('airlane-ads', '拦截');
  } else if (mode === 'backcn') {
    add('airlane-cn', '走国内节点');
    add('airlane-private', '直连');
  }
  if (ads && mode !== 'ads') add('airlane-ads', '拦截');
  for (const cb of document.querySelectorAll('input[name=extra]:checked')) {
    add(cb.value, '独立出口');
  }

  const fmt = FMT[client];
  let rows = sets.map(s => {
    const url = `${REL}/${s.id}.${fmt}`;
    return `<tr><td>${NAMES[s.id]}</td><td>${s.action}</td>` +
      `<td><a href="${url}">${s.id}.${fmt}</a></td>` +
      `<td><img src="${QR(url)}" width="72"></td></tr>`;
  }).join('');
  const extra = (fmt === 'mrs' && sets.some(s => ['airlane-cn','airlane-ads','airlane-gfw','airlane-ai'].includes(s.id)))
    ? '<p><i>注意：含 IP 规则的集还需订阅同名 <code>-ipcidr.mrs</code> 文件。</i></p>' : '';
  document.getElementById('out').innerHTML =
    '<h3>推荐组合</h3><table><tr><th>规则集</th><th>动作</th><th>订阅链接</th><th>扫码</th></tr>' +
    rows + '</table>' + extra +
    '<p>把上面的订阅链接填进客户端的规则订阅 / rule-providers 即可，客户端会按 interval 自动在线更新。</p>';
}
</script>

---

[← 返回规则集目录](./) · [AirLane](https://www.airlane.cloud) · [PoolVIP](https://poolvip.airlane.cloud)
