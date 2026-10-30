// Тижневий турнір: 5 задач на тиждень (однакові для всіх), очки за розв’язки, таблиця й трофеї для топ-10.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;
  const T = (uk, ru, en) => tr({ uk, ru, en });
  const RIVALS = ['Олена', 'Max', 'Дмитро', 'Sofia', 'Андрій', 'Liam', 'Ірина', 'Noah', 'Тарас', 'Emma', 'Кирило', 'Mia', 'Богдан', 'Ava', 'Марта', 'Zoe', 'Назар', 'Leo', 'Соломія', 'Jack'];

  const hash = (s) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = (seed) => () => { seed = (Math.imul(seed, 1103515245) + 12345) >>> 0; return seed / 4294967296; };
  const pool = () => (window.CODRY_TOURNEY || []).concat(window.CODRY_DAILY || []);
  // Задачі тижня: детерміноване перемішування за ключем тижня — у всіх однакові.
  const weekProblems = (wk) => {
    const r = rng(hash('t' + wk));
    const idx = pool().map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx.slice(0, 5);
  };
  const st = () => {
    const wk = C.weekKey();
    S.tourney = S.tourney || { week: wk, solved: {}, tries: {} };
    if (S.tourney.week !== wk) closeWeek(wk);
    return S.tourney;
  };
  const scoreOf = (tt) => Object.values(tt.solved || {}).reduce((a, x) => a + x.pts, 0);
  // Суперники-боти для локального режиму (однакові протягом тижня, ростуть з часом).
  const demoBoard = (wk) => {
    const r = rng(hash('board' + wk));
    const dayOfWeek = ((new Date().getDay() + 6) % 7) + 1;
    return RIVALS.slice(0, 15).map((name) => {
      const skill = r(), solved = Math.min(5, Math.floor(skill * 6 * Math.min(1, dayOfWeek / 5 + 0.2)));
      let score = 0;
      for (let i = 0; i < solved; i++) score += 100 - Math.floor(r() * 4) * 10;
      return { name, score, solved };
    });
  };
  const board = (wk, mine) => demoBoard(wk).concat([{ name: S.profile.name || t('you'), score: scoreOf(mine), solved: Object.keys(mine.solved || {}).length, me: true }])
    .sort((a, b) => b.score - a.score || (a.me ? -1 : b.me ? 1 : 0));
  // Підсумок минулого тижня: місце в топ-10 → трофей.
  function closeWeek(wk) {
    const old = S.tourney;
    if (old && old.week && Object.keys(old.solved || {}).length) {
      const place = board(old.week, old).findIndex((x) => x.me) + 1;
      if (place && place <= 10 && !(S.trophies || []).some((x) => x.week === old.week)) {
        S.trophies = S.trophies || [];
        S.trophies.push({ week: old.week, place, score: scoreOf(old) });
        G.addGems(place === 1 ? 100 : place <= 3 ? 60 : 30);
        setTimeout(() => fx.toast(T(`Турнір завершено: ${place}-те місце! Новий трофей`, `Турнир завершён: ${place}-е место! Новый трофей`, `Tournament over: place ${place}! New trophy`), 'ok', 'trophy'), 900);
      }
    }
    S.tourney = { week: wk, solved: {}, tries: {} };
    C.save();
  }
  const trophyArt = (place, size) => {
    const c = place === 1 ? ['#fde047', '#ca8a04'] : place === 2 ? ['#e2e8f0', '#64748b'] : place === 3 ? ['#fdba74', '#c2410c'] : ['#93c5fd', '#1d4ed8'];
    return C.badge('trophy', c[0], c[1], size);
  };
  const endsIn = () => {
    const d = new Date(C.weekKey() + 'T00:00:00'); d.setDate(d.getDate() + 7);
    const ms = d - Date.now(), days = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5);
    return T(`${days} дн. ${h} год.`, `${days} дн. ${h} ч.`, `${days}d ${h}h`);
  };

  C.pages.tournament = async (n) => {
    const tt = st();
    const wk = C.weekKey();
    const ids = weekProblems(wk);
    const k = n ? Math.max(0, Math.min(4, +n - 1)) : -1;
    if (k >= 0) return solvePage(ids, k);
    let rows = board(wk, tt);
    const shared = C.cloud.tourneyShared && C.cloud.tourneyShared();
    if (shared) { try { rows = await C.cloud.tourneyBoard(wk); } catch (e) { /* лишаємо локальну таблицю */ } }
    const myScore = scoreOf(tt);
    C.app.innerHTML = `<div class="page">
      <div class="tc-hero" data-reveal><div>${C.mascot({ size: 110, mood: 'proud', anim: 'float' })}</div>
        <div><h1 class="page-title">${C.icon('trophy', 30)} ${T('Турнір тижня', 'Турнир недели', 'Weekly tournament')}</h1>
        <p class="section-sub left">${T('П’ять задач — однакові для всіх. 100 очок за кожну, мінус 10 за помилкову спробу. Топ-10 отримують трофей і кристали.', 'Пять задач — одинаковые для всех. 100 очков за каждую, минус 10 за ошибочную попытку. Топ-10 получают трофей и кристаллы.', 'Five tasks, the same for everyone. 100 points each, minus 10 per wrong attempt. The top 10 win a trophy and gems.')}</p>
        <div class="battle-stats"><span>⭐ <b>${myScore}</b>/500</span><span>⏳ ${T('до кінця', 'до конца', 'ends in')} <b>${endsIn()}</b></span></div></div></div>
      <div class="split">
        <div class="card" data-reveal><div class="card-label">${C.icon('puzzle', 16)} ${T('Задачі', 'Задачи', 'Tasks')}</div>
          ${ids.map((pi, i) => { const p = pool()[pi], s = tt.solved[i], tries = tt.tries[i] || 0;
            return `<a class="tour-task ${s ? 'done' : ''}" href="#/tournament/${i + 1}"><span class="tt-num">${s ? C.icon('check', 16) : i + 1}</span><span class="tt-title">${esc(tr(p.title))}</span><span class="tt-pts">${s ? `+${s.pts}` : tries ? `−${Math.min(50, tries * 10)}` : '100'}</span></a>`; }).join('')}
        </div>
        <div class="card" data-reveal><div class="card-label">${C.icon('users', 16)} ${T('Таблиця', 'Таблица', 'Leaderboard')}${shared ? '' : ` <small class="muted">· ${T('демо-суперники', 'демо-соперники', 'demo rivals')}</small>`}</div>
          <ol class="board tour-board">${rows.slice(0, 20).map((r, i) => `<li class="${r.me ? 'me' : ''} ${i < 10 ? 'top' : ''}"><span class="rank">${i + 1}</span><span class="name">${esc(r.name)}</span><span class="muted">${r.solved}/5</span><b>${r.score}</b></li>`).join('')}</ol>
          ${!rows.slice(0, 20).some((r) => r.me) ? `<p class="muted small">${T('Розв’яжи задачу, щоб потрапити в таблицю.', 'Реши задачу, чтобы попасть в таблицу.', 'Solve a task to join the table.')}</p>` : ''}
        </div>
      </div>
      <div class="card" data-reveal><div class="card-label">${C.icon('medal', 16)} ${T('Мої трофеї', 'Мои трофеи', 'My trophies')}</div>
        ${(S.trophies || []).length ? `<div class="trophy-row">${S.trophies.slice().reverse().map((x) => `<div class="trophy-item">${trophyArt(x.place, 64)}<b>#${x.place}</b><small class="muted">${x.week}</small></div>`).join('')}</div>`
          : `<p class="muted">${T('Потрап у топ-10 тижня — і тут з’явиться твій перший трофей.', 'Попади в топ-10 недели — и здесь появится твой первый трофей.', 'Reach the weekly top 10 and your first trophy appears here.')}</p>`}</div>
    </div>${C.footer()}`;
    fx.reveal(C.app);
  };

  function solvePage(ids, k) {
    const tt = st();
    const prob = pool()[ids[k]];
    let lang = C.LS.get('dailyLang', 'python');
    const key = () => 'tour:' + C.weekKey() + ':' + k + ':' + lang;
    const solved = tt.solved[k];
    C.app.innerHTML = `<div class="page">
      <a class="back" href="#/tournament">← ${T('Турнір', 'Турнир', 'Tournament')}</a>
      <div class="level-nav">${ids.map((_, i) => `<a class="lv ${i === k ? 'cur' : ''} ${tt.solved[i] ? 'done' : ''}" href="#/tournament/${i + 1}"><b>${i + 1}</b><small>${tt.solved[i] ? '+' + tt.solved[i].pts : '100'}</small></a>`).join('')}</div>
      <div class="card problem" data-reveal>
        <div class="card-head"><div class="card-label">${C.icon('trophy', 16)} ${T('Задача', 'Задача', 'Task')} ${k + 1}/5 · ${solved ? `${C.icon('check', 14)} +${solved.pts}` : `${100 - Math.min(50, (tt.tries[k] || 0) * 10)} ${T('очок', 'очков', 'pts')}`}</div>
          <div class="seg small" id="tlang">${['python', 'javascript'].map((l) => `<button data-l="${l}" class="${l === lang ? 'active' : ''}">${l === 'python' ? 'Python' : 'JavaScript'}</button>`).join('')}</div></div>
        <h2>${esc(tr(prob.title))}</h2><div class="task-text">${tr(prob.text)}</div>
        <div class="problem-ws">
          <div class="workspace solo"><div class="ws-bar"><span class="file-tab" id="tfile">${lang === 'python' ? 'main.py' : 'script.js'}</span>
            <div class="ws-actions"><button class="btn ghost sm" id="tRun">${C.icon('play', 15)} ${t('run')}</button><button class="btn primary sm" id="tCheck">${C.icon('check', 15)} ${t('check')}</button></div></div>
            <div class="editor-wrap"><textarea id="tEditor"></textarea></div></div>
          <div class="out solo"><div class="out-tabs"><button class="active">${t('output')}</button></div>
            <div class="out-pane active console" id="tConsole"><div class="line muted">${t('output_empty')}</div></div>
            <div class="exp-box"><small>${t('expected')}</small><pre>${esc(prob.expected)}</pre></div></div>
        </div>
      </div>
    </div>`;
    fx.reveal(C.app);
    const ed = C.editor(document.getElementById('tEditor'), lang, () => run(), () => check());
    const load = () => { ed.setOption('mode', C.CM_MODE[lang]); ed.setValue(C.LS.get(key(), prob[lang].starter)); document.getElementById('tfile').textContent = lang === 'python' ? 'main.py' : 'script.js'; };
    load();
    ed.on('change', C.debounce(() => C.LS.set(key(), ed.getValue()), 300));
    document.querySelectorAll('#tlang button').forEach((b) => b.onclick = () => {
      lang = b.dataset.l; C.LS.set('dailyLang', lang);
      document.querySelectorAll('#tlang button').forEach((x) => x.classList.toggle('active', x === b));
      load();
    });
    let busy = false;
    async function run() { if (busy) return; busy = true; await C.run(lang, ed.getValue(), document.getElementById('tConsole')); busy = false; }
    async function check() {
      if (busy) return;
      busy = true;
      const r = await C.run(lang, ed.getValue(), document.getElementById('tConsole'));
      busy = false;
      if (C.normOut(C.outputText(r.lines)) === C.normOut(prob.expected)) {
        if (tt.solved[k]) { fx.toast(t('check_ok'), 'ok', 'check'); return; }
        const pts = 100 - Math.min(50, (tt.tries[k] || 0) * 10);
        tt.solved[k] = { pts, at: Date.now() };
        G.addXP(20);
        C.save();
        fx.sound('level'); fx.confetti(100);
        fx.toast(T(`+${pts} очок у турнірі!`, `+${pts} очков в турнире!`, `+${pts} tournament points!`), 'ok', 'trophy');
        if (C.cloud.tourneyShared && C.cloud.tourneyShared()) { try { await C.cloud.saveTourney(C.weekKey(), { score: scoreOf(tt), solved: Object.keys(tt.solved).length }); } catch (e) { /* */ } }
        const next = [0, 1, 2, 3, 4].find((i) => !tt.solved[i]);
        setTimeout(() => { location.hash = next == null ? '#/tournament' : '#/tournament/' + (next + 1); }, 1400);
      } else {
        if (!tt.solved[k]) { tt.tries[k] = (tt.tries[k] || 0) + 1; C.save(); }
        fx.sound('fail');
        fx.toast(T('Не те. −10 очок за цю задачу', 'Не то. −10 очков за эту задачу', 'Not quite. −10 points for this task'), 'bad', 'bug');
      }
    }
    document.getElementById('tRun').onclick = run;
    document.getElementById('tCheck').onclick = check;
  }
})();
