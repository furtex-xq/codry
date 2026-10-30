// Код-батли: дуель із ботом на швидкість і виклик друга посиланням (без сервера).
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;
  const T = (uk, ru, en) => tr({ uk, ru, en });

  const BOTS = [
    { id: 'rookie', time: 240, gems: 10, name: ['Бот-Новачок', 'Бот-Новичок', 'Rookie Bot'], mood: 'happy', color: '#22c55e' },
    { id: 'coder', time: 150, gems: 20, name: ['Бот-Кодер', 'Бот-Кодер', 'Coder Bot'], mood: 'cool', color: '#3b82f6' },
    { id: 'hacker', time: 75, gems: 35, name: ['Бот-Хакер', 'Бот-Хакер', 'Hacker Bot'], mood: 'excited', color: '#ef4444' }
  ];
  const botName = (b) => tr({ uk: b.name[0], ru: b.name[1], en: b.name[2] });
  const BOT_LINES = [
    ['читає умову…', 'читает условие…', 'reading the task…'], ['пише змінні…', 'пишет переменные…', 'writing variables…'],
    ['думає над циклом…', 'думает над циклом…', 'thinking about a loop…'], ['запускає код…', 'запускает код…', 'running the code…'],
    ['виправляє помилку…', 'исправляет ошибку…', 'fixing a bug…'], ['перевіряє відповідь…', 'проверяет ответ…', 'checking the answer…']
  ];
  const b64e = (o) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const b64d = (s) => { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return JSON.parse(decodeURIComponent(escape(atob(s)))); };
  const stats = () => { S.battles = S.battles || { wins: 0, losses: 0, streak: 0, best: 0 }; return S.battles; };
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const pool = () => window.CODRY_DAILY || [];

  // ================= Лобі =================
  C.pages.battle = (payload) => {
    if (payload) return duel(null, payload);
    const st = stats();
    C.app.innerHTML = `<div class="page">
      <div class="tc-hero" data-reveal><div>${C.mascot({ size: 110, mood: 'cool', anim: 'float' })}</div>
        <div><h1 class="page-title">${C.icon('bolt', 30)} ${T('Код-батли', 'Код-баттлы', 'Code battles')}</h1>
        <p class="section-sub left">${T('Розв’яжи задачу швидше за суперника. Перемога — кристали й XP, а потім кинь виклик другові!', 'Реши задачу быстрее соперника. Победа — кристаллы и XP, а потом брось вызов другу!', 'Solve the task faster than your rival. Win gems and XP — then challenge a friend!')}</p>
        <div class="battle-stats"><span>🏆 <b>${st.wins}</b> ${T('перемог', 'побед', 'wins')}</span><span>🔥 <b>${st.best}</b> ${T('найкраща серія', 'лучшая серия', 'best streak')}</span></div></div></div>
      <h2 class="section-title left" data-reveal>${T('Обери суперника', 'Выбери соперника', 'Pick a rival')}</h2>
      <div class="bot-grid">${BOTS.map((b, i) => `<button class="card bot-card" data-bot="${i}" data-reveal="${i * 80}" style="--bc:${b.color}">
        <div class="bot-ava">${C.mascot({ size: 86, mood: b.mood, color: i === 0 ? 'green' : i === 1 ? 'blue' : 'red' })}</div>
        <b>${botName(b)}</b><span class="muted">${T('розв’язує за', 'решает за', 'solves in')} ~${fmt(b.time)}</span><span class="bot-prize">+${b.gems} 💎</span></button>`).join('')}</div>
      <div class="card" data-reveal><div class="card-label">${C.icon('users', 16)} ${T('Батл із другом', 'Баттл с другом', 'Battle a friend')}</div>
        <p>${T('Переможи бота — і отримаєш посилання-виклик із твоїм часом. Друг розв’язує ту саму задачу й намагається побити рекорд.', 'Победи бота — и получишь ссылку-вызов со своим временем. Друг решает ту же задачу и пытается побить рекорд.', 'Beat a bot and you’ll get a challenge link with your time. Your friend solves the same task and tries to beat it.')}</p>
        <p class="muted small">${T('Живі батли в реальному часі з’являться після підключення хмари (Firebase).', 'Живые баттлы в реальном времени появятся после подключения облака (Firebase).', 'Live real-time battles arrive once the cloud (Firebase) is connected.')}</p></div>
    </div>${C.footer()}`;
    fx.reveal(C.app);
    document.querySelectorAll('[data-bot]').forEach((b) => b.onclick = () => duel(+b.dataset.bot, null));
  };

  // ================= Дуель =================
  function duel(botIdx, payload) {
    let ch = null;
    if (payload) {
      try { ch = b64d(payload); } catch (e) { ch = null; }
      if (!ch || !pool()[ch.p]) { C.app.innerHTML = `<div class="page center">${C.mascot({ size: 120, mood: 'confused' })}<h1>${T('Виклик пошкоджено', 'Вызов повреждён', 'Broken challenge')}</h1><a class="btn primary" href="#/battle">${T('До батлів', 'К баттлам', 'To battles')}</a></div>`; return; }
    }
    const bot = ch ? null : BOTS[botIdx];
    const pIdx = ch ? ch.p : (() => { let k; do { k = Math.floor(Math.random() * pool().length); } while (pool().length > 1 && pool()[k] === G.dailyProblem()); return k; })();
    const prob = pool()[pIdx];
    let lang = ch ? ch.l || 'python' : C.LS.get('dailyLang', 'python');
    const limit = ch ? Math.max(30, Math.round(ch.t * 1.5) + 30) : bot.time;   // для виклику — щедрий запас
    const rival = ch ? esc(String(ch.n || '?').slice(0, 30)) : botName(bot);
    let start = 0, timer = null, over = false, busy = false;
    const stop = () => { clearInterval(timer); timer = null; };
    C.setCleanup(stop);

    C.app.innerHTML = `<div class="page battle-page">
      <a class="back" href="#/battle">← ${T('Батли', 'Баттлы', 'Battles')}</a>
      <div class="battle-bar" data-reveal>
        <div class="bb-side me">${C.mascot({ size: 54, mood: 'cool' })}<div><b>${esc(S.profile.name || t('you'))}</b><div class="bar"><i id="meFill" style="width:0%"></i></div></div></div>
        <div class="bb-clock" id="clock">0:00</div>
        <div class="bb-side foe"><div><b>${rival}</b><div class="bar"><i id="foeFill" style="width:0%;--c1:#ef4444;--c2:#f97316"></i></div><small id="foeSay">${ch ? T('час для перемоги', 'время для победы', 'time to beat') + ': ' + fmt(ch.t) : ''}</small></div>${ch ? C.mascot({ size: 54, mood: 'wink' }) : C.mascot({ size: 54, mood: bot.mood })}</div>
      </div>
      <div class="card problem" data-reveal>
        <div class="card-head"><div class="card-label">${C.icon('puzzle', 16)} ${T('Задача', 'Задача', 'Task')}</div>
          <div class="seg small" id="blang">${['python', 'javascript'].map((l) => `<button data-l="${l}" class="${l === lang ? 'active' : ''}">${l === 'python' ? 'Python' : 'JavaScript'}</button>`).join('')}</div></div>
        <h2>${esc(tr(prob.title))}</h2><div class="task-text">${tr(prob.text)}</div>
        <div class="problem-ws">
          <div class="workspace solo"><div class="ws-bar"><span class="file-tab" id="bfile">${lang === 'python' ? 'main.py' : 'script.js'}</span>
            <div class="ws-actions"><button class="btn ghost sm" id="bRun">${C.icon('play', 15)} ${t('run')}</button><button class="btn primary sm" id="bCheck">${C.icon('check', 15)} ${t('check')}</button></div></div>
            <div class="editor-wrap"><textarea id="bEditor"></textarea></div></div>
          <div class="out solo"><div class="out-tabs"><button class="active">${t('output')}</button></div>
            <div class="out-pane active console" id="bConsole"><div class="line muted">${t('output_empty')}</div></div>
            <div class="exp-box"><small>${t('expected')}</small><pre>${esc(prob.expected)}</pre></div></div>
        </div>
      </div>
    </div>`;
    fx.reveal(C.app);
    const ed = C.editor(document.getElementById('bEditor'), lang, () => run(), () => check());
    ed.setValue(prob[lang].starter);
    document.querySelectorAll('#blang button').forEach((b) => b.onclick = () => {
      if (b.dataset.l === lang) return;
      lang = b.dataset.l;
      document.querySelectorAll('#blang button').forEach((x) => x.classList.toggle('active', x === b));
      ed.setOption('mode', C.CM_MODE[lang]);
      ed.setValue(prob[lang].starter);
      document.getElementById('bfile').textContent = lang === 'python' ? 'main.py' : 'script.js';
    });

    // Відлік 3-2-1
    const cd = C.el(`<div class="countdown"><b>3</b></div>`);
    document.body.appendChild(cd);
    let n = 3;
    fx.sound('pop');
    const cdt = setInterval(() => {
      n--;
      if (n > 0) { cd.innerHTML = `<b>${n}</b>`; fx.sound('pop'); return; }
      clearInterval(cdt);
      cd.innerHTML = `<b>GO!</b>`; fx.sound('ok');
      setTimeout(() => cd.remove(), 600);
      start = Date.now();
      timer = setInterval(tick, 250);
      ed.focus();
    }, 800);
    C.setCleanup(() => { stop(); clearInterval(cdt); cd.remove(); });

    let sayIdx = -1;
    function tick() {
      const el = (Date.now() - start) / 1000;
      const clock = document.getElementById('clock');
      if (!clock) return stop();
      clock.textContent = fmt(el);
      const p = Math.min(100, (el / limit) * 100);
      document.getElementById('foeFill').style.width = p + '%';
      if (!ch) {
        const k = Math.min(BOT_LINES.length - 1, Math.floor(p / (100 / BOT_LINES.length)));
        if (k !== sayIdx) { sayIdx = k; document.getElementById('foeSay').textContent = tr({ uk: BOT_LINES[k][0], ru: BOT_LINES[k][1], en: BOT_LINES[k][2] }); }
      }
      clock.classList.toggle('hot', p > 75);
      if (el >= limit) end(false, el);
    }
    async function run() { if (busy) return; busy = true; await C.run(lang, ed.getValue(), document.getElementById('bConsole')); busy = false; }
    async function check() {
      if (busy || over || !start) return;
      busy = true;
      const r = await C.run(lang, ed.getValue(), document.getElementById('bConsole'));
      busy = false;
      if (over) return;
      if (C.normOut(C.outputText(r.lines)) === C.normOut(prob.expected)) {
        document.getElementById('meFill').style.width = '100%';
        const el = (Date.now() - start) / 1000;
        end(ch ? el < ch.t : true, el);
      } else { fx.sound('fail'); fx.toast(t('check_fail'), 'bad', 'bug'); }
    }
    document.getElementById('bRun').onclick = run;
    document.getElementById('bCheck').onclick = check;

    function end(won, el) {
      if (over) return;
      over = true;
      stop();
      const st = stats();
      const solved = document.getElementById('meFill').style.width === '100%';
      let reward = '';
      if (won) {
        st.wins++; st.streak++; st.best = Math.max(st.best, st.streak);
        const gems = bot ? bot.gems : 15;
        G.addGems(gems); G.addXP(25);
        reward = `+25 XP · +${gems} 💎`;
        fx.sound('level'); fx.confetti(140);
      } else { st.losses++; st.streak = 0; fx.sound('fail'); }
      C.save();
      const link = solved ? location.origin + location.pathname + '#/battle/' + b64e({ p: pIdx, t: Math.round(el), n: S.profile.name || t('you'), l: lang }) : '';
      fx.modal(`<div class="celebrate">${C.mascot({ size: 120, mood: won ? 'celebrate' : 'sad', anim: won ? 'jump' : '' })}
        <h2>${won ? T('Перемога!', 'Победа!', 'Victory!') : solved ? T('Майже!', 'Почти!', 'So close!') : T('Час вийшов', 'Время вышло', 'Time’s up')}</h2>
        <p>${solved ? `${T('Твій час', 'Твоё время', 'Your time')}: <b>${fmt(el)}</b>` : ''}${ch && solved ? ` · ${rival}: <b>${fmt(ch.t)}</b>` : ''}</p>
        ${reward ? `<p class="big-num small-num">${reward}</p>` : ''}
        ${link ? `<p class="muted">${T('Надішли другові виклик — нехай спробує побити твій час:', 'Отправь другу вызов — пусть попробует побить твоё время:', 'Send a friend this challenge — can they beat your time?')}</p>
          <div class="tc-link"><input readonly value="${esc(link)}" id="chLink"><button class="btn primary sm" id="chCopy">${C.icon('copy', 15)}</button></div>` : ''}
        <div class="row-center"><a class="btn ghost" href="#/battle" data-close>${T('До батлів', 'К баттлам', 'To battles')}</a>${bot ? `<button class="btn primary" id="again">${T('Ще раз', 'Ещё раз', 'Again')}</button>` : ''}</div></div>`, (m) => {
        const cc = m.querySelector('#chCopy');
        if (cc) cc.onclick = async () => { try { await navigator.clipboard.writeText(link); fx.toast(T('Посилання скопійовано', 'Ссылка скопирована', 'Link copied'), 'ok', 'copy'); } catch (e) { m.querySelector('#chLink').select(); } };
        const ag = m.querySelector('#again');
        if (ag) ag.onclick = () => { fx.closeModal(); duel(botIdx, null); };
      }, 'small');
    }
  }
})();
