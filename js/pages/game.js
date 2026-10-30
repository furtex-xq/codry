// Сторінки: Щодня (квести, скриня, задача дня, серія), Ліга, Магазин, Досягнення.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;

  // Мальована скриня
  const chestSVG = (open) => `<svg class="chest-svg ${open ? 'open' : ''}" viewBox="0 0 120 110" width="120" height="110" aria-hidden="true">
    <ellipse cx="60" cy="104" rx="44" ry="5" fill="#000" opacity=".25"/>
    <g class="chest-glow"><circle cx="60" cy="50" r="40" fill="#fde047" opacity=".35"/></g>
    <rect x="14" y="50" width="92" height="50" rx="8" fill="#b45309" stroke="#0b1020" stroke-width="3"/>
    <rect x="14" y="62" width="92" height="8" fill="#92400e"/>
    <rect x="22" y="50" width="10" height="50" fill="#facc15" stroke="#0b1020" stroke-width="2"/>
    <rect x="88" y="50" width="10" height="50" fill="#facc15" stroke="#0b1020" stroke-width="2"/>
    <g class="chest-gems"><path d="M48 52l6-8h12l6 8-12 12z" fill="#38bdf8" stroke="#0b1020" stroke-width="2"/><path d="M34 54l4-6h8l4 6-8 8z" fill="#a78bfa" stroke="#0b1020" stroke-width="2"/><path d="M72 54l4-6h8l4 6-8 8z" fill="#34d399" stroke="#0b1020" stroke-width="2"/></g>
    <g class="chest-lid"><path d="M14 52V40a46 22 0 0 1 92 0v12z" fill="#d97706" stroke="#0b1020" stroke-width="3"/><path d="M22 52V36M98 52V36" stroke="#facc15" stroke-width="10"/><path d="M22 52V36M98 52V36" stroke="#0b1020" stroke-width="2" stroke-dasharray="0"/></g>
    <rect x="52" y="56" width="16" height="16" rx="3" fill="#fde047" stroke="#0b1020" stroke-width="2.5"/><circle cx="60" cy="63" r="2.5" fill="#0b1020"/>
  </svg>`;

  function calendar() {
    const days = new Set(S.days), frozen = new Set(S.frozen);
    const d = new Date();
    const dow = (d.getDay() + 6) % 7;
    const start = new Date(d); start.setDate(d.getDate() - dow - 28);
    let cells = '';
    for (let i = 0; i < 35; i++) {
      const x = new Date(start); x.setDate(start.getDate() + i);
      const k = C.dateKey(x);
      const cls = (days.has(k) ? 'on ' : frozen.has(k) ? 'frz ' : '') + (k === C.today() ? 'today ' : '') + (x > d ? 'future' : '');
      cells += `<i class="${cls}" title="${k}">${frozen.has(k) ? C.icon('snow', 14) : x.getDate()}</i>`;
    }
    return `<div class="cal"><div class="cal-head">${t('days').map((x) => `<span>${x}</span>`).join('')}</div><div class="cal-grid">${cells}</div></div>`;
  }
  C.calendarHTML = calendar;

  // ================= Щодня =================
  C.pages.daily = () => {
    const st = G.streak();
    const qs = G.quests();
    const prob = G.dailyProblem();
    const solved = G.dailySolvedToday();
    const plang = C.LS.get('dailyLang', 'python');
    C.app.innerHTML = `<div class="page">
      <div class="daily-head" data-reveal>
        <div class="streak-big ${st ? 'lit' : ''}">
          <div class="flame-big">${flameSVG()}</div>
          <div><b data-count="${st}">0</b><span>${t('streak_days')}</span></div>
        </div>
        <div><h1 class="page-title">${t('daily_title')}</h1><p class="section-sub left">${t('daily_sub')}</p></div>
      </div>
      <div class="daily-grid">
        <div class="card quests-card" data-reveal>
          <div class="card-label">${C.icon('target', 16)} ${t('quests')}</div>
          <div id="questList">${qs.map(questHTML).join('')}</div>
          <div class="chest-box ${G.chestReady() ? 'ready' : ''} ${G.chestOpened() ? 'opened' : ''}" id="chestBox">
            <div id="chestArt">${chestSVG(G.chestOpened())}</div>
            <div><b>${t('chest')}</b><p class="muted">${G.chestOpened() ? t('chest_opened') : G.chestReady() ? '' : t('chest_locked')}</p>
            ${G.chestReady() ? `<button class="btn primary" id="openChest">${C.icon('gift', 16)} ${t('chest_open')}</button>` : ''}</div>
          </div>
        </div>
        <div class="card" data-reveal>
          <div class="card-label">${C.icon('flame', 16)} ${t('streak_title')}</div>
          ${calendar()}
          <div class="freeze-box">
            <div class="freeze-ic">${C.icon('snow', 30)}</div>
            <div><b>${t('freeze_title')}</b><p class="muted">${t('freeze_d')}</p><p>${t('freezes_have', { n: `<b>${S.freezes}</b>/3` })}</p></div>
            <a class="btn ghost sm" href="#/shop">${C.icon('shop', 15)} ${t('nav_shop')}</a>
          </div>
        </div>
      </div>
      ${prob ? `<div class="card problem" data-reveal>
        <div class="card-head"><div class="card-label">${C.icon('puzzle', 16)} ${t('problem_title')} · ${C.today()}</div>
          <div class="seg small" id="plang">${['python', 'javascript'].map((l) => `<button data-l="${l}" class="${l === plang ? 'active' : ''}">${l === 'python' ? 'Python' : 'JavaScript'}</button>`).join('')}</div></div>
        <h2>${esc(tr(prob.title))}</h2>
        <div class="task-text">${tr(prob.text)}</div>
        <p class="muted">${solved ? `${C.icon('check', 15)} ${t('problem_solved')}` : t('problem_reward')}</p>
        <div class="problem-ws">
          <div class="workspace solo"><div class="ws-bar"><span class="file-tab" id="pfile">${plang === 'python' ? 'main.py' : 'script.js'}</span>
            <div class="ws-actions"><button class="btn ghost sm" id="pRun">${C.icon('play', 15)} ${t('run')}</button><button class="btn primary sm" id="pCheck">${C.icon('check', 15)} ${t('check')}</button></div></div>
            <div class="editor-wrap"><textarea id="pEditor"></textarea></div></div>
          <div class="out solo"><div class="out-tabs"><button class="active">${t('output')}</button></div>
            <div class="out-pane active console" id="pConsole"><div class="line muted">${t('output_empty')}</div></div>
            <div class="exp-box"><small>${t('expected')}</small><pre>${esc(prob.expected)}</pre></div></div>
        </div>
      </div>` : ''}
    </div>${C.footer()}`;

    bindQuests();
    const oc = document.getElementById('openChest');
    if (oc) oc.onclick = () => {
      const r = G.openChest();
      if (!r) return;
      document.getElementById('chestArt').innerHTML = chestSVG(true);
      document.getElementById('chestBox').classList.add('opened', 'burst');
      fx.sound('chest');
      fx.confetti(100);
      fx.fly(document.getElementById('chestArt'), 'gem', r.gems);
      setTimeout(() => fx.modal(`<div class="celebrate">${C.mascot({ size: 120, mood: 'excited', anim: 'jump' })}<div class="big-num">+${r.gems} 💎</div><p>${t('chest_reward', { n: r.gems })}</p>${r.freeze ? `<p>${C.icon('snow', 18)} +1 ${t('freeze_title')}</p>` : ''}<button class="btn primary big" data-close>${t('ok')}</button></div>`, null, 'small'), 700);
      oc.remove();
    };

    if (!prob) return;
    let lang = plang;
    const key = () => 'daily:' + C.today() + ':' + lang;
    const ed = C.editor(document.getElementById('pEditor'), lang, () => run(), () => check());
    const load = () => { ed.setOption('mode', C.CM_MODE[lang]); ed.setValue(C.LS.get(key(), prob[lang].starter)); document.getElementById('pfile').textContent = lang === 'python' ? 'main.py' : 'script.js'; };
    load();
    ed.on('change', C.debounce(() => C.LS.set(key(), ed.getValue()), 300));
    document.querySelectorAll('#plang button').forEach((b) => b.onclick = () => {
      lang = b.dataset.l; C.LS.set('dailyLang', lang);
      document.querySelectorAll('#plang button').forEach((x) => x.classList.toggle('active', x === b));
      load();
    });
    let busy = false;
    async function run() { if (busy) return; busy = true; await C.run(lang, ed.getValue(), document.getElementById('pConsole')); busy = false; }
    async function check() {
      if (busy) return;
      busy = true;
      const r = await C.run(lang, ed.getValue(), document.getElementById('pConsole'));
      busy = false;
      if (C.normOut(C.outputText(r.lines)) === C.normOut(prob.expected)) {
        fx.sound('ok');
        if (G.solveDaily()) {
          fx.confetti(120);
          fx.fly(document.getElementById('pCheck'), 'xp', 30);
          setTimeout(() => fx.fly(document.getElementById('pCheck'), 'gem', 25), 200);
          fx.toast(t('problem_solved'), 'ok', 'puzzle');
          document.getElementById('questList').innerHTML = G.quests().map(questHTML).join('');
          bindQuests();
        } else fx.toast(t('check_ok'), 'ok', 'check');
      } else { fx.sound('fail'); fx.toast(t('check_fail'), 'bad', 'bug'); }
    }
    document.getElementById('pRun').onclick = run;
    document.getElementById('pCheck').onclick = check;
  };

  function questHTML(q) {
    const done = q.progress >= q.target, claimed = G.questClaimed(q.id);
    const p = Math.min(100, Math.round((q.progress / q.target) * 100));
    return `<div class="quest ${done ? 'done' : ''} ${claimed ? 'claimed' : ''}">
      <div class="quest-ic">${C.icon(q.icon, 22)}</div>
      <div class="quest-main"><b>${t(q.key, { n: q.target })}</b>
        <div class="bar"><i style="width:${p}%"></i></div><small>${Math.min(q.progress, q.target)} / ${q.target}</small></div>
      ${claimed ? `<span class="quest-claimed">${C.icon('check', 16)} ${t('quest_done')}</span>`
        : `<button class="btn ${done ? 'primary' : 'ghost'} sm" data-q="${q.id}" ${done ? '' : 'disabled'}>${C.icon('gem', 15)} ${q.reward}</button>`}
    </div>`;
  }
  function bindQuests() {
    document.querySelectorAll('[data-q]').forEach((b) => b.onclick = () => {
      const n = G.claimQuest(b.dataset.q);
      if (!n) return;
      fx.fly(b, 'gem', n);
      fx.floatText(b, `+${n} 💎`);
      C.pages.daily();
    });
  }

  function flameSVG() {
    return `<svg viewBox="0 0 64 80" width="64" height="80" aria-hidden="true"><defs><linearGradient id="fl1" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f43f5e"/><stop offset=".6" stop-color="#f97316"/><stop offset="1" stop-color="#facc15"/></linearGradient></defs>
      <path class="fl-outer" d="M32 78c16 0 28-11 28-26 0-13-8-21-14-29-2 7-6 11-11 13 2-14-4-27-16-34 1 13-6 20-12 28C3 36 4 44 4 52c0 15 12 26 28 26z" fill="url(#fl1)" stroke="#0b1020" stroke-width="3"/>
      <path class="fl-inner" d="M32 78c-7 0-12-5-12-12 0-6 5-10 8-14 1 4 4 6 7 7 1-4 3-6 6-8 2 4 3 8 3 11 0 9-5 16-12 16z" fill="#fde68a"/></svg>`;
  }

  // ================= Ліга =================
  C.pages.league = () => {
    const tier = S.league.tier;
    const names = t('leagues');
    const board = G.board();
    const myIdx = board.findIndex((x) => x.me);
    const now = new Date();
    const end = new Date(C.weekKey() + 'T00:00:00'); end.setDate(end.getDate() + 7);
    const left = end - now, d = Math.floor(left / 864e5), h = Math.floor((left % 864e5) / 36e5);
    const colors = ['#cd7f32', '#c0c0c0', '#facc15', '#3b82f6', '#e11d48', '#10b981', '#a855f7', '#f5f5f4', '#334155', '#67e8f9'];
    C.app.innerHTML = `<div class="page">
      <div class="league-head" data-reveal>
        <div class="league-tiers">${names.map((n, i) => `<div class="tier ${i === tier ? 'cur' : ''} ${i < tier ? 'past' : ''}" title="${n}" style="--tc:${colors[i]}">${C.badge(i < 3 ? 'shield' : i < 6 ? 'gem' : i < 9 ? 'crown' : 'sparkle', colors[i], shade(colors[i]), i === tier ? 74 : 46, i > tier)}</div>`).join('')}</div>
        <h1 class="page-title">${names[tier]} ${t('league_title').toLowerCase()}</h1>
        <p class="section-sub left">${t('league_sub')}</p>
        <p class="league-timer">${C.icon('clock', 16)} ${t('league_ends', { d, h })}</p>
      </div>
      ${C.cloud.board ? '' : `<div class="notice" data-reveal>${C.icon('info', 18)} ${t('league_demo')}</div>`}
      <ol class="board">${board.map((p, i) => `
        ${i === 7 ? `<li class="zone"><span>${C.icon('flag', 14)} ${t('league_promo')} ↑</span></li>` : ''}
        <li class="${p.me ? 'me' : ''} ${i < 3 ? 'top' + (i + 1) : ''}" data-reveal="${Math.min(i, 12) * 30}">
          <span class="rank">${i < 3 ? C.icon('trophy', 18) : i + 1}</span>
          <span class="ava">${C.mascot({ size: 40, mood: p.me ? 'happy' : 'idle', color: p.color, acc: p.acc })}</span>
          <span class="who">${esc(p.name)}${p.me ? ` <em>(${t('league_you')})</em>` : p.demo ? ` <small class="demo-tag">${t('demo')}</small>` : ''}</span>
          <span class="pts">${p.xp} XP</span>
        </li>`).join('')}</ol>
      ${S.league.lastResult ? `<p class="muted center">${S.lang === 'en' ? 'Last week' : S.lang === 'ru' ? 'Прошлая неделя' : 'Минулий тиждень'}: #${S.league.lastResult.rank} · ${S.league.lastResult.xp} XP</p>` : ''}
    </div>${C.footer()}`;
    if (myIdx > 4) setTimeout(() => { const me = C.app.querySelector('.board .me'); if (me) me.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 400);
    if (C.cloud.user) C.cloud.refreshBoard().then(() => { if (location.hash.startsWith('#/league')) {/* оновиться при наступному відкритті */} });
  };
  function shade(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, (n >> 16) - 70), g = Math.max(0, ((n >> 8) & 255) - 70), b = Math.max(0, (n & 255) - 70);
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
  }

  // ================= Магазин =================
  C.pages.shop = () => {
    const sec = (title, items) => `<h2 class="shop-h" data-reveal>${title}</h2><div class="shop-grid">${items}</div>`;
    const card = (it, art, name, i) => {
      const owned = it.type === 'freeze' ? false : S.owned.includes(it.id) || (it.type === 'acc' && it.key === 'none');
      const eq = it.type !== 'freeze' && S.equip[it.type] === it.key;
      return `<div class="shop-item tilt ${eq ? 'eq' : ''}" data-reveal="${(i % 6) * 50}">
        <div class="shop-art">${art}</div><b>${esc(name)}</b>
        ${it.type === 'freeze' ? `<small>${t('freezes_have', { n: S.freezes + '/3' })}</small>` : ''}
        ${eq ? `<span class="btn ghost sm" aria-disabled="true">${C.icon('check', 14)} ${t('equipped')}</span>`
          : owned ? `<button class="btn ghost sm" data-eq="${it.type}:${it.key}">${t('equip')}</button>`
          : `<button class="btn primary sm" data-buy="${it.id}">${C.icon('gem', 14)} ${it.price}</button>`}
      </div>`;
    };
    const freeze = G.SHOP.filter((x) => x.type === 'freeze');
    const accs = [{ id: 'acc:none', type: 'acc', key: 'none', price: 0 }, ...G.SHOP.filter((x) => x.type === 'acc')];
    const cols = [{ id: 'color:blue', type: 'color', key: 'blue', price: 0 }, ...G.SHOP.filter((x) => x.type === 'color')];
    const themes = [{ id: 'theme:codry', type: 'theme', key: 'codry', price: 0 }, ...G.SHOP.filter((x) => x.type === 'theme')];
    C.app.innerHTML = `<div class="page">
      <div class="shop-head" data-reveal>${C.mascot({ size: 110, mood: 'love', anim: 'float' })}<div><h1 class="page-title">${t('shop_title')}</h1><p class="section-sub left">${t('shop_sub')}</p>
        <div class="gem-balance">${C.icon('gem', 26)} <b data-count="${S.gems}">0</b></div></div></div>
      ${sec(t('shop_freeze'), freeze.map((it, i) => card(it, `<div class="freeze-art">${C.icon('snow', 54)}</div>`, t('freeze_title'), i)).join(''))}
      ${sec(t('shop_hats'), accs.map((it, i) => card(it, C.mascot({ size: 90, mood: 'happy', acc: it.key }), tr(G.ACC_NAMES[it.key]), i)).join(''))}
      ${sec(t('shop_colors'), cols.map((it, i) => card(it, C.mascot({ size: 90, mood: 'wink', color: it.key }), tr(G.COLOR_NAMES[it.key]), i)).join(''))}
      ${sec(t('shop_themes'), themes.map((it, i) => card(it, `<pre class="code mini-code cm-s-codry theme-${it.key}"><span class="cm-keyword">def</span> <span class="cm-def">hi</span>():\n  <span class="cm-builtin">print</span>(<span class="cm-string">"Codry"</span>) <span class="cm-comment"># ✨</span>\n  <span class="cm-keyword">return</span> <span class="cm-number">42</span></pre>`, G.THEME_NAMES[it.key], i)).join(''))}
    </div>${C.footer()}`;
    C.app.querySelectorAll('[data-buy]').forEach((b) => b.onclick = () => {
      const r = G.buy(b.dataset.buy);
      if (r === 'ok') { fx.toast(t('bought'), 'ok', 'shop'); fx.confetti(50); C.pages.shop(); fx.reveal(C.app); C.renderStats(); }
      else if (r === 'poor') { fx.toast(t('not_enough'), 'bad', 'gem'); b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 500); fx.sound('fail'); }
      else if (r === 'max') fx.toast(t('max_freezes'), 'bad', 'snow');
    });
    C.app.querySelectorAll('[data-eq]').forEach((b) => b.onclick = () => {
      const [type, key] = b.dataset.eq.split(':');
      G.equip(type, key);
      fx.sound('pop');
      C.pages.shop(); fx.reveal(C.app);
    });
  };

  // ================= Досягнення =================
  C.pages.achievements = () => {
    const all = G.ACHIEVEMENTS;
    const got = all.filter((a) => S.achievements[a.id]).length;
    C.app.innerHTML = `<div class="page">
      <div class="shop-head" data-reveal>${C.mascot({ size: 110, mood: 'proud', anim: 'float' })}<div><h1 class="page-title">${t('ach_title')}</h1><p class="section-sub left">${t('ach_sub', { n: got, total: all.length })}</p>
        <div class="bar big"><i style="width:${Math.round((got / all.length) * 100)}%"></i></div></div></div>
      <div class="ach-grid">${all.map((a, i) => {
        const on = !!S.achievements[a.id];
        return `<div class="ach ${on ? 'on' : 'off'}" data-reveal="${(i % 8) * 40}">
          <div class="ach-art">${C.badge(a.icon, a.c1, a.c2, 84, !on)}</div>
          <b>${esc(tr(a.title))}</b><small>${esc(tr(a.desc))}</small>
          <span class="ach-reward">${on ? `${C.icon('check', 13)} ${S.achievements[a.id]}` : `${C.icon('gem', 13)} ${a.gems}`}</span>
        </div>`;
      }).join('')}</div>
    </div>${C.footer()}`;
  };
})();
