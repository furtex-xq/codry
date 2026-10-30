// Оболонка застосунку: шапка, маршрутизація, глобальні сповіщення, спільні функції запуску коду.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;
  const app = document.getElementById('app');
  C.app = app;

  // ---------- Мови програмування ----------
  C.CM_MODE = {
    python: 'python', javascript: 'javascript', html: 'htmlmixed', css: 'css', sql: 'text/x-sqlite',
    java: 'text/x-java', cpp: 'text/x-c++src', c: 'text/x-csrc', csharp: 'text/x-csharp', go: 'go', lua: 'lua', luau: 'lua'
  };
  C.runnerOf = (lang) => ({ python: 'py', javascript: 'js', html: 'web', css: 'web', sql: 'sql' }[lang] || 'remote');

  C.courseBadge = (c, size) => `<span class="cbadge" style="--c1:${c.color};--c2:${c.color2};width:${size}px;height:${size}px;font-size:${Math.round(size / (c.short.length > 3 ? 3.8 : c.short.length > 2 ? 3.2 : 2.5))}px">${c.short}</span>`;

  // ---------- Документ для HTML/CSS ----------
  const BASE_STYLE = '<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:16px;color:#0f172a;background:#fff;line-height:1.5}img{max-width:100%}</style>';
  C.buildDoc = (lang, code, baseHtml) => {
    if (lang === 'css') return `<!doctype html><html><head><meta charset="utf-8">${BASE_STYLE}<style>${code}</style></head><body>${baseHtml || ''}</body></html>`;
    if (/<!doctype/i.test(code)) return code;
    return `<!doctype html><html><head><meta charset="utf-8">${BASE_STYLE}</head><body>${code}</body></html>`;
  };

  // ---------- SQL: таблиця результатів ----------
  function sqlTable(r) {
    const head = r.columns.map((c) => `<th>${esc(c)}</th>`).join('');
    const body = r.values.slice(0, 200).map((row) => `<tr>${row.map((v) => `<td>${v === null ? '<i>NULL</i>' : esc(v)}</td>`).join('')}</tr>`).join('');
    return `<div class="sql-wrap"><table class="sql-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table><div class="sql-meta">${r.values.length} ${t('rows')}</div></div>`;
  }
  C.sqlTable = sqlTable;

  // ---------- Запуск коду у консоль ----------
  // Повертає { lines, sql } — lines: [{level, text}], sql: результат runSQL
  C.run = async (lang, code, consoleEl, opts) => {
    opts = opts || {};
    consoleEl.innerHTML = '';
    const lines = [];
    const add = (level, text) => {
      lines.push({ level, text });
      const row = document.createElement('div');
      row.className = 'line ' + level;
      row.textContent = text;
      consoleEl.appendChild(row);
      consoleEl.scrollTop = consoleEl.scrollHeight;
    };
    const runner = C.runnerOf(lang);
    const status = C.el(`<div class="line muted running-line"><span class="spinner"></span> ${runner === 'remote' ? t('compiling') : t('running')}</div>`);
    consoleEl.appendChild(status);
    const done = () => { status.remove(); if (!consoleEl.children.length) consoleEl.innerHTML = '<div class="line muted">∅</div>'; return { lines }; };
    G.track('run');
    if (runner === 'js') { await window.CodryRun.runJS(code, add, { timeoutText: t('timeout') }); return done(); }
    if (runner === 'py') {
      await window.CodryRun.runPython(code, add, { stdin: opts.stdin, failText: t('python_failed'), onLoading: (on) => { status.lastChild.textContent = ' ' + (on ? t('loading_python') : t('running')); } });
      return done();
    }
    if (runner === 'sql') {
      status.lastChild.textContent = ' ' + t('loading_sql');
      let res;
      try { res = await window.CodryRun.runSQL(opts.setup || '', code); }
      catch (e) { status.remove(); add('error', t('net_failed')); return { lines, sql: { results: [], error: 'load' } }; }
      status.remove();
      if (res.error) add('error', res.error);
      else if (!res.results.length) consoleEl.insertAdjacentHTML('beforeend', `<div class="line muted">${res.changes ? t('rows_changed', { n: res.changes }) : t('no_rows')}</div>`);
      else res.results.forEach((r) => consoleEl.insertAdjacentHTML('beforeend', sqlTable(r)));
      return { lines, sql: res };
    }
    await window.CodryRun.runRemote(lang, code, add, { stdin: opts.stdin, netText: t('net_failed'), busyText: t('busy') });
    return done();
  };
  C.outputText = (lines) => lines.filter((l) => l.level === 'log').map((l) => l.text).join('\n');
  const norm = (s) => String(s).replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').trim();
  C.normOut = norm;

  // Перевірка завдання. Повертає { ok, out, expected }
  C.checkTask = async (course, step, code, consoleEl) => {
    const lang = course.lang, task = step.task, runner = C.runnerOf(lang);
    if (runner === 'web') {
      const ok = await window.CodryRun.runWebCheck(C.buildDoc(lang, code, step.html), task.check);
      return { ok };
    }
    if (runner === 'sql') {
      const setup = (step.db != null ? step.db : course.db) || '';
      const mine = await C.run(lang, code, consoleEl, { setup });
      if (!mine.sql || mine.sql.error) return { ok: false };
      if (task.check) return { ok: !!task.check(mine.sql, code) };
      const ref = await window.CodryRun.runSQL(setup, task.solution);
      return { ok: sqlEqual(mine.sql, ref, /order\s+by/i.test(task.solution)) && (!task.must || task.must.test(code)) };
    }
    const r = await C.run(lang, code, consoleEl, { stdin: task.stdin });
    const out = C.outputText(r.lines);
    const ok = task.check ? !!task.check(out, code) : (norm(out) === norm(task.expected) && (!task.must || task.must.test(code)));
    return { ok, out, expected: task.expected };
  };
  function sqlEqual(a, b, ordered) {
    const la = a.results[a.results.length - 1], lb = b.results[b.results.length - 1];
    if (!la || !lb) return !la && !lb && a.changes === b.changes;
    if (la.columns.length !== lb.columns.length || la.values.length !== lb.values.length) return false;
    const rows = (r) => r.values.map((v) => JSON.stringify(v.map((x) => (typeof x === 'number' ? Math.round(x * 1000) / 1000 : x))));
    const ra = rows(la), rb = rows(lb);
    if (!ordered) { ra.sort(); rb.sort(); }
    return ra.every((x, i) => x === rb[i]);
  }

  // ---------- Підсвітка коду ----------
  C.highlight = (code, lang) => {
    const pre = document.createElement('pre');
    pre.className = 'code cm-s-codry theme-' + (S.equip.theme || 'codry');
    if (window.CodeMirror && CodeMirror.runMode) CodeMirror.runMode(code, C.CM_MODE[lang] || lang, pre);
    else pre.textContent = code;
    return pre;
  };

  // ---------- Редактор ----------
  C.editor = (textarea, lang, onRun, onCheck) => {
    const cm = makeEditor(textarea, lang, onRun, onCheck);
    cm.getWrapperElement().classList.add('theme-' + (S.equip.theme || 'codry'));
    return cm;
  };
  const makeEditor = (textarea, lang, onRun, onCheck) => CodeMirror.fromTextArea(textarea, {
    mode: C.CM_MODE[lang], theme: 'codry', lineNumbers: true,
    indentUnit: ['python', 'go'].includes(lang) ? 4 : (['java', 'csharp', 'cpp', 'c'].includes(lang) ? 4 : 2),
    tabSize: 4, autoCloseBrackets: true, matchBrackets: true, autoCloseTags: lang === 'html', lineWrapping: true, styleActiveLine: true,
    extraKeys: {
      'Ctrl-Enter': () => onRun && onRun(), 'Cmd-Enter': () => onRun && onRun(),
      'Shift-Ctrl-Enter': () => onCheck && onCheck(), 'Shift-Cmd-Enter': () => onCheck && onCheck(),
      F11: () => document.body.classList.toggle('ws-full'),
      Esc: () => document.body.classList.remove('ws-full'),
      Tab: (cm) => (cm.somethingSelected() ? cm.indentSelection('add') : cm.replaceSelection(' '.repeat(cm.getOption('indentUnit')), 'end')),
      'Ctrl-/': 'toggleComment'
    }
  });

  // ---------- Шапка ----------
  function navItems() {
    return [['courses', 'nav_courses', 'book'], ['arcade', 'nav_arcade', 'puzzle'], ['daily', 'nav_daily', 'cal'], ['league', 'nav_league', 'trophy'], ['forum', 'nav_forum', 'chat'], ['playground', 'nav_playground', 'code']];
  }
  function renderHeader() {
    document.documentElement.lang = S.lang;
    document.documentElement.dataset.theme = S.theme;
    document.documentElement.classList.toggle('reduce-motion', !!S.settings.motion);
    const route = (location.hash || '#/').split('/')[1] || '';
    const cur = { course: 'courses', learn: 'courses' }[route] || route;
    const more = [['tournament', 'nav_tournament', 'trophy'], ['gallery', 'nav_gallery', 'sparkle'], ['pet', 'nav_pet', 'heart'], ['battle', 'nav_battle', 'bolt'], ['class', 'nav_class', 'users'], ['teacher', 'nav_teacher', 'school'], ['reference', 'nav_reference', 'book'], ['shop', 'nav_shop', 'shop'], ['achievements', 'nav_achievements', 'medal'], ['donate', 'nav_donate', 'heart'], ['about', 'nav_about', 'info']];
    document.getElementById('nav').innerHTML = navItems().map(([r, k, i]) => `<a href="#/${r}" class="${cur === r ? 'active' : ''}">${C.icon(i, 18)}<span>${t(k)}</span></a>`).join('') +
      `<div class="dropdown"><button class="nav-more ${more.some((m) => m[0] === cur) ? 'active' : ''}">${t('nav_more')} ▾</button><div class="dd-menu">${more.map(([r, k, i]) => `<a href="#/${r}">${C.icon(i, 18)} ${t(k)}</a>`).join('')}</div></div>`;
    document.getElementById('langSelect').innerHTML = window.CODRY_LANGS.map((l) => `<option value="${l.code}" ${l.code === S.lang ? 'selected' : ''}>${l.short}</option>`).join('');
    const tb = document.getElementById('themeBtn');
    tb.innerHTML = C.icon(S.theme === 'dark' ? 'sun' : 'moon', 19);
    tb.title = t('theme_label');
    renderStats();
    renderAvatar();
  }
  function renderStats() {
    const st = G.streak(), lvl = G.levelFromXP(S.xp), [a, b] = G.levelBounds(lvl);
    const pct = Math.round(((S.xp - a) / (b - a)) * 100);
    document.getElementById('streakStat').innerHTML = `<span class="flame ${st ? 'lit' : ''}">${C.icon('flame', 20)}</span><b>${st}</b>`;
    document.getElementById('streakStat').title = `${st} ${t('streak_days')}`;
    document.getElementById('gemStat').innerHTML = `<span class="gem-ic">${C.icon('gem', 19)}</span><b>${S.gems}</b>`;
    document.getElementById('gemStat').title = t('gems');
    document.getElementById('xpStat').innerHTML = `<span class="lvl-ring" style="--p:${pct}"><b>${lvl}</b></span><b>${S.xp}</b>`;
    document.getElementById('xpStat').title = `${t('level')} ${lvl} · ${S.xp}/${b} XP`;
  }
  C.renderStats = renderStats;
  function renderAvatar() {
    const u = C.cloud && C.cloud.user;
    const btn = document.getElementById('avatarBtn');
    btn.innerHTML = C.mascot({ size: 34, mood: 'happy' });
    const menu = document.getElementById('avatarMenu');
    menu.innerHTML = `<div class="am-head">${C.mascot({ size: 54, mood: 'wink' })}<div><b>${esc(S.profile.name || t('you'))}</b><small>${t('level')} ${G.levelFromXP(S.xp)} · ${S.xp} XP</small></div></div>
      <a href="#/profile">${C.icon('user', 18)} ${t('nav_profile')}</a>
      <a href="#/pet">${C.icon('heart', 18)} ${t('nav_pet')}</a>
      <a href="#/achievements">${C.icon('medal', 18)} ${t('nav_achievements')}</a>
      <a href="#/shop">${C.icon('shop', 18)} ${t('nav_shop')}</a>
      ${u && C.cloud.isAdmin && C.cloud.isAdmin() ? `<a href="#/admin">${C.icon('shield', 18)} ${tr({ uk: 'Адмін: заявки', ru: 'Админ: заявки', en: 'Admin: sign-ups' })}</a>` : ''}
      ${u && C.cloud.status && C.cloud.status !== 'approved' ? `<a href="#/account" class="am-pending">${C.icon('clock', 18)} ${tr({ uk: 'Заявка на перевірці', ru: 'Заявка на проверке', en: 'Request pending' })}</a>` : ''}
      ${u ? `<button id="logoutBtn">${C.icon('logout', 18)} ${t('nav_logout')}</button>` : `<a href="#/login">${C.icon('key', 18)} ${t('nav_login')}</a><a href="#/login/register">${C.icon('user', 18)} ${tr({ uk: 'Реєстрація', ru: 'Регистрация', en: 'Sign up' })}</a>`}`;
    const lo = document.getElementById('logoutBtn');
    if (lo) lo.onclick = () => C.cloud.signOut();
  }

  document.getElementById('langSelect').addEventListener('change', (e) => { S.lang = e.target.value; C.save(); fx.stopSpeak(); route(); });
  document.getElementById('themeBtn').addEventListener('click', () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; C.save(); renderHeader(); });
  document.getElementById('burgerBtn').addEventListener('click', () => document.body.classList.toggle('nav-open'));
  document.getElementById('avatarBtn').addEventListener('click', (e) => { e.stopPropagation(); document.getElementById('avatarMenu').classList.toggle('open'); });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#avatarMenu')) document.getElementById('avatarMenu').classList.remove('open');
    const more = e.target.closest('.nav-more');
    document.querySelectorAll('.dropdown').forEach((d) => { if (!more || !d.contains(more)) d.classList.remove('open'); });
    if (more) more.parentElement.classList.toggle('open');
  });

  // ---------- Глобальні ігрові події ----------
  C.on('xp', () => renderStats());
  C.on('gems', (n) => { renderStats(); if (n > 0) fx.sound('coin'); });
  C.on('streak', () => renderStats());
  C.on('equip', () => renderAvatar());
  C.on('auth', (u) => { renderHeader(); if (u) fx.toast(t('login_ok', { name: esc(u.displayName || u.email || '') }), 'ok', 'user'); });
  C.on('levelup', (lvl) => {
    setTimeout(() => {
      fx.sound('level');
      fx.confetti(120);
      fx.modal(`<div class="celebrate">${C.mascot({ size: 130, mood: 'excited', anim: 'jump' })}<div class="big-num">${lvl}</div><h2>${t('level_up')}</h2><p>${t('level_up_d', { n: lvl })}</p><button class="btn primary big" data-close>${t('ok')}</button></div>`, null, 'small');
    }, 1200);
  });
  const achQueue = [];
  let achShowing = false;
  function showNextAch() {
    if (achShowing || !achQueue.length) return;
    achShowing = true;
    const a = achQueue.shift();
    fx.sound('chest');
    const n = C.el(`<div class="ach-pop"><div class="ach-badge">${C.badge(a.icon, a.c1, a.c2, 70)}</div><div><small>${t('ach_unlocked')}</small><b>${esc(tr(a.title))}</b><span>${esc(tr(a.desc))} · +${a.gems} 💎</span></div></div>`);
    document.body.appendChild(n);
    setTimeout(() => { n.classList.add('out'); setTimeout(() => { n.remove(); achShowing = false; showNextAch(); }, 400); }, 3800);
    renderStats();
  }
  C.on('achievement', (a) => { achQueue.push(a); setTimeout(showNextAch, 600); });
  C.on('questdone', (q) => fx.toast(`${t('quests')}: ${t(q.key, { n: q.target })} ✓`, 'ok', q.icon));

  // ---------- Маршрутизація ----------
  let cleanup = null;
  C.setCleanup = (fn) => { cleanup = fn; };
  function route() {
    if (cleanup) { try { cleanup(); } catch (e) { /* */ } cleanup = null; }
    fx.closeModal();
    fx.stopSpeak();
    document.body.classList.remove('nav-open', 'ws-full');
    const [page, a, b] = (location.hash || '#/').replace(/^#\/?/, '').split('/');
    document.body.dataset.page = page || 'home';
    renderHeader();
    const P = C.pages;
    const map = { '': P.home, dev: P.dev, courses: P.courses, course: P.course, learn: P.learn, daily: P.daily, league: P.league, forum: P.forum, playground: P.playground, reference: P.reference, profile: P.profile, achievements: P.achievements, shop: P.shop, about: P.about, login: P.login, class: P.class, teacher: P.teacher, join: P.join, donate: P.donate, boss: P.boss, arcade: P.arcade, battle: P.battle, pet: P.pet, gallery: P.gallery, tournament: P.tournament, account: P.account, admin: P.admin };
    const fn = map[page || ''];
    app.classList.remove('page-in'); void app.offsetWidth; app.classList.add('page-in');
    if (fn) fn(a, b); else C.notFound();
    if (page !== 'learn') window.scrollTo(0, 0);
    fx.reveal(app);
  }
  C.route = route;
  window.addEventListener('hashchange', route);

  C.notFound = () => { app.innerHTML = `<div class="page center">${C.mascot({ size: 140, mood: 'confused' })}<h1>404</h1><p>${t('not_found')}</p><a class="btn primary" href="#/">← Codry</a></div>`; };
  C.footer = () => `<footer class="footer"><div class="logo small"><span class="logo-mark">{ }</span><span class="logo-text">Codry</span></div><p>${t('footer')}</p><nav><a href="#/about">${t('nav_about')}</a><a href="#/forum">${t('nav_forum')}</a><a href="#/reference">${t('nav_reference')}</a></nav></footer>`;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { fx.closeModal(); document.body.classList.remove('ws-full'); }
    if (!e.altKey || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    const m = location.hash.match(/^#\/learn\/([^/]+)\/(\d+)/);
    if (!m) return;
    const c = C.courseById(m[1]);
    const n = +m[2] + (e.key === 'ArrowRight' ? 1 : -1);
    if (c && n >= 1 && n <= c.steps.length && G.isUnlocked(c, n - 1)) { e.preventDefault(); location.hash = `#/learn/${c.id}/${n}`; }
  });

  // ---------- Старт ----------
  C.boot = () => {
    G.ensureToday();
    const streakRes = G.processStreak();
    const leagueRes = G.processLeague();
    route();
    if (streakRes === 'frozen') setTimeout(() => fx.toast(t('freeze_used'), 'ok', 'snow'), 800);
    if (leagueRes) setTimeout(() => {
      const name = t('leagues')[leagueRes.to];
      fx.modal(`<div class="celebrate">${C.mascot({ size: 120, mood: leagueRes.to > leagueRes.from ? 'celebrate' : 'sad' })}<h2>${t(leagueRes.to > leagueRes.from ? 'league_promoted' : 'league_demoted', { l: name })}</h2><button class="btn primary" data-close>${t('ok')}</button></div>`, null, 'small');
    }, 1000);
    C.cloud.init();
    G.checkAchievements();
  };
})();
