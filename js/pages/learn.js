// Сторінка кроку уроку.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  C.pages.learn = (id, n) => {
    const c = C.courseById(id);
    if (!c || !c.steps.length) return C.notFound();
    const idx = Math.min(Math.max((parseInt(n, 10) || 1) - 1, 0), c.steps.length - 1);
    if (!G.isUnlocked(c, idx)) return lockedScreen(c, idx);
    const step = c.steps[idx];
    C.LS.set('last:' + c.id, idx);
    const runner = C.runnerOf(c.lang), isWeb = runner === 'web', isSql = runner === 'sql';
    const codeKey = 'code:' + c.id + ':' + step.id;
    const starter = tr(step.task.starter) || '';
    const saved = C.LS.get(codeKey, null);
    const pct = G.coursePct(c);
    const done = G.isDone(c.id, step.id);
    const session = { attempts: 0, hint: false, solution: false };
    const nextUnlocked = () => G.isDone(c.id, step.id);

    // ---------- Бічна панель ----------
    let lastCh = null;
    const side = c.steps.map((s, i) => {
      let head = '';
      if (s.chapter && tr(s.chapter) !== lastCh) { lastCh = tr(s.chapter); head = `<li class="side-ch">${esc(lastCh)}</li>`; }
      const un = G.isUnlocked(c, i), dn = G.isDone(c.id, s.id);
      return head + `<li><a ${un ? `href="#/learn/${c.id}/${i + 1}"` : ''} class="${i === idx ? 'active' : ''} ${dn ? 'done' : ''} ${un ? '' : 'locked'} ${s.project ? 'proj' : ''}">
        <span class="dot">${dn ? C.icon('check', 14) : un ? i + 1 : C.icon('lock', 12)}</span><span>${esc(tr(s.title))}</span></a></li>`;
    }).join('');

    const howList = step.task.how ? `<ol class="how-list">${(Array.isArray(step.task.how) ? step.task.how : [step.task.how]).map((h) => `<li>${tr(h)}</li>`).join('')}</ol>` : '';
    const dbCard = isSql && ((step.db != null ? step.db : c.db)) ? `<details class="base-html"><summary>${C.icon('db', 16)} ${S.lang === 'en' ? 'Database tables' : S.lang === 'ru' ? 'Таблицы базы' : 'Таблиці бази'}</summary><div id="dbSchema"></div></details>` : '';

    C.app.innerHTML = `<div class="learn" style="--c1:${c.color};--c2:${c.color2}">
      <aside class="side" id="side">
        <div class="side-head">
          <a href="#/course/${c.id}" class="side-course">${C.courseBadge(c, 38)}<div><b>${c.name}</b><small id="sideMeta">${G.doneCount(c)}/${c.steps.length} · ${pct}%</small></div></a>
          <div class="bar"><i id="sideBar" style="width:${pct}%"></i></div>
        </div>
        <ol class="side-steps">${side}</ol>
      </aside>

      <section class="lesson" id="lesson">
        <div class="lesson-top">
          <button class="btn ghost sm side-toggle" id="sideToggle">${C.icon('map', 16)} ${t('all_steps')}</button>
          <span class="step-count">${step.chapter ? `<em>${esc(tr(step.chapter))}</em> · ` : ''}${t('step_of', { n: idx + 1, total: c.steps.length })}</span>
          <div class="mini-progress"><i style="width:${((idx + 1) / c.steps.length) * 100}%"></i></div>
        </div>
        <h1 class="lesson-title">${done ? `<span class="done-badge">${C.icon('check', 18)}</span>` : ''}${step.project ? `<span class="proj-chip">${C.icon('rocket', 16)} ${t('project')}</span>` : ''}${esc(tr(step.title))}</h1>

        <div class="card theory" data-reveal>
          <div class="card-head"><div class="card-label">${C.icon('book', 16)} ${t('theory')}</div>
            <button class="btn ghost sm" id="listenBtn">${C.icon('volume', 16)} <span>${t('listen')}</span></button></div>
          <div class="theory-body">${tr(step.theory)}</div>
          ${c.lang === 'css' && step.html ? `<details class="base-html"><summary>${t('course_html_base')}</summary><div id="baseHtml"></div></details>` : ''}
          ${dbCard}
        </div>

        ${step.why ? `<div class="card why" data-reveal><div class="card-label">${C.icon('bulb', 16)} ${t('why')}</div>${tr(step.why)}</div>` : ''}

        <div class="card examples" data-reveal>
          <div class="ex-head">
            <div class="card-label">${C.icon('eye', 16)} ${t('examples')}</div>
            <div class="ex-tabs" id="exTabs">${step.examples.map((e, i) => `<button data-i="${i}" class="${i === 0 ? 'active' : ''}"><b>${i + 1}</b> ${esc(tr(e.title))}</button>`).join('')}</div>
          </div>
          <div id="exBody" class="ex-body"></div>
        </div>

        ${step.mistakes ? `<div class="card mistakes" data-reveal><div class="card-label">${C.icon('bug', 16)} ${t('mistakes')}</div>${tr(step.mistakes)}</div>` : ''}

        <div class="card task ${step.project ? 'is-project' : ''}" data-reveal>
          <div class="card-label">${C.icon('target', 16)} ${step.project ? t('project') : t('task')} <span class="reward-chip">+${step.project ? G.REWARD.project : G.REWARD.task} XP · +${step.project ? G.REWARD.projectGems : G.REWARD.taskGems} 💎</span></div>
          <div class="task-text">${tr(step.task.text)}</div>
          ${howList ? `<div class="task-how"><b>${t('task_how')}:</b>${howList}</div>` : ''}
          <div class="task-actions">
            <button class="btn ghost sm" id="hintBtn">${C.icon('bulb', 16)} ${t('show_hint')}</button>
            <button class="btn ghost sm" id="solBtn">${C.icon('key', 16)} ${t('show_solution')}</button>
            <button class="btn primary sm mobile-only" id="goEditor">${C.icon('code', 16)} ${S.lang === 'en' ? 'Write code' : S.lang === 'ru' ? 'Писать код' : 'Писати код'} ↓</button>
          </div>
          <div class="hint" id="hintBox" hidden>${tr(step.task.hint)}</div>
          <div id="solBox" hidden></div>
        </div>

        ${step.quiz ? `<div class="card quiz" id="quiz" data-reveal>
          <div class="card-label">${C.icon('puzzle', 16)} ${t('quiz')} ${G.stepState(c.id, step.id).quiz ? `<span class="ok-chip">${C.icon('check', 12)}</span>` : `<span class="reward-chip">+${G.REWARD.quiz} XP</span>`}</div>
          <div class="quiz-q">${tr(step.quiz.q)}</div>
          <div class="quiz-opts">${step.quiz.options.map((o, i) => `<button data-i="${i}"><span class="qo-letter">${'ABCD'[i]}</span><span>${esc(tr(o))}</span></button>`).join('')}</div>
          <div class="quiz-explain" hidden></div>
        </div>` : ''}

        <div class="buddy" id="buddy"><div class="buddy-m" id="buddyM">${C.mascot({ size: 76, mood: done ? 'happy' : 'idle' })}</div><div class="buddy-say" id="buddySay">${done ? pick(t('m_ok')) : t('m_start')}</div></div>

        <div class="step-nav">
          ${idx > 0 ? `<a class="btn ghost" href="#/learn/${c.id}/${idx}">← ${t('prev_step')}</a>` : '<span></span>'}
          ${idx < c.steps.length - 1
            ? `<a class="btn primary ${nextUnlocked() ? '' : 'disabled'}" id="nextBtn" ${nextUnlocked() ? `href="#/learn/${c.id}/${idx + 2}"` : ''} title="${t('locked_next')}">${nextUnlocked() ? '' : C.icon('lock', 16)} ${t('next_step')} →</a>`
            : `<button class="btn primary" id="finishBtn">${C.icon('flag', 16)} ${t('finish_course')}</button>`}
        </div>
        <p class="lock-note" id="lockNote" ${nextUnlocked() ? 'hidden' : ''}>${C.icon('lock', 14)} ${t('locked_next')}</p>
        <p class="keys-hint">${t('keys_hint')}</p>
      </section>

      <section class="workspace" id="workspace">
        <div class="ws-bar">
          <span class="file-tab">${C.courseBadge(c, 18)} ${c.file}</span>
          <div class="ws-actions">
            <button class="btn ghost sm icon" id="fullBtn" title="${t('fullscreen')}">${C.icon('expand', 17)}</button>
            <button class="btn ghost sm" id="resetBtn" title="${t('reset')}">${C.icon('reset', 16)}<span>${t('reset')}</span></button>
            ${isWeb ? '' : `<button class="btn ghost sm" id="runBtn">${C.icon('play', 15)}<span>${t('run')}</span></button>`}
            <button class="btn primary sm" id="checkBtn">${C.icon('check', 16)} ${t('check')}</button>
          </div>
        </div>
        <div class="editor-wrap"><textarea id="editor"></textarea></div>
        <div class="out">
          <div class="out-tabs">
            ${isWeb ? `<button class="active" data-tab="preview">${C.icon('eye', 15)} ${t('preview')}</button>` : `<button class="active" data-tab="console">${t('output')}</button>${isSql ? '' : `<button data-tab="tests">${t('tests')}</button>`}`}
            <span class="saved" id="savedMark">${C.icon('check', 13)} ${t('saved')}</span>
          </div>
          ${isWeb
            ? '<div class="out-pane active" data-pane="preview"><iframe id="preview" sandbox="allow-scripts allow-popups allow-modals allow-forms" title="preview"></iframe></div>'
            : `<div class="out-pane active console" data-pane="console" id="console"><div class="line muted">${t('output_empty')}</div></div>
               <div class="out-pane tests" data-pane="tests" id="tests">${testsHTML(step, null)}</div>`}
        </div>
      </section>
    </div>`;

    if (c.lang === 'css' && step.html) document.getElementById('baseHtml').appendChild(C.highlight(step.html, 'html'));
    if (dbCard) document.getElementById('dbSchema').appendChild(C.highlight(((step.db != null ? step.db : c.db)).replace(/INSERT INTO[\s\S]*?;\s*/g, '').trim(), 'sql'));

    // ---------- Маскот-помічник ----------
    const buddy = (mood, text, anim) => {
      document.getElementById('buddyM').innerHTML = C.mascot({ size: 76, mood, anim });
      const say = document.getElementById('buddySay');
      say.textContent = text;
      say.classList.remove('pop'); void say.offsetWidth; say.classList.add('pop');
    };

    // ---------- Редактор ----------
    const editor = C.editor(document.getElementById('editor'), c.lang, () => doRun(), () => doCheck());
    editor.setValue(saved != null ? saved : starter);
    editor.setCursor(editor.lineCount(), 0);
    const savedMark = document.getElementById('savedMark');
    const save = C.debounce(() => { C.LS.set(codeKey, editor.getValue()); savedMark.classList.remove('flash'); void savedMark.offsetWidth; savedMark.classList.add('flash'); }, 400);
    const livePreview = C.debounce(() => updatePreview(), 350);
    editor.on('change', () => { save(); if (isWeb) livePreview(); });
    function updatePreview() { const f = document.getElementById('preview'); if (f) f.srcdoc = C.buildDoc(c.lang, editor.getValue(), step.html); }
    if (isWeb) updatePreview();
    setTimeout(() => editor.refresh(), 50);

    function switchTab(name) {
      C.app.querySelectorAll('.out-tabs button').forEach((x) => x.classList.toggle('active', x.dataset.tab === name));
      C.app.querySelectorAll('.out-pane').forEach((x) => x.classList.toggle('active', x.dataset.pane === name));
    }
    C.app.querySelectorAll('.out-tabs button').forEach((b) => b.onclick = () => switchTab(b.dataset.tab));

    let busy = false;
    const setBusy = (v) => { busy = v; ['runBtn', 'checkBtn'].forEach((i) => { const b = document.getElementById(i); if (b) b.disabled = v; }); };
    async function doRun() {
      if (isWeb) { updatePreview(); G.track('run'); return; }
      if (busy) return;
      setBusy(true); switchTab('console');
      await C.run(c.lang, editor.getValue(), document.getElementById('console'), { setup: (step.db != null ? step.db : c.db), stdin: step.task.stdin });
      setBusy(false);
    }
    async function doCheck() {
      if (busy) return;
      setBusy(true);
      session.attempts++;
      if (!isWeb) switchTab('console'); else updatePreview();
      buddy('think', '…');
      const res = await C.checkTask(c, step, editor.getValue(), document.getElementById('console'));
      setBusy(false);
      if (!isWeb && !isSql) {
        document.getElementById('tests').innerHTML = testsHTML(step, res);
        if (!res.ok) switchTab('tests');
      }
      if (res.ok) success();
      else {
        fx.sound('fail');
        document.getElementById('checkBtn').classList.add('shake');
        setTimeout(() => document.getElementById('checkBtn').classList.remove('shake'), 500);
        buddy(session.attempts >= 3 ? 'think' : pick(['sad', 'oops', 'confused']), session.attempts >= 3 ? t('m_think') : pick(t('m_fail')));
        fx.toast(t('check_fail'), 'bad', 'bug');
      }
    }
    function success() {
      const first = G.mark(c.id, step.id, 'task', { sol: session.solution || undefined });
      fx.sound('ok');
      buddy(pick(['celebrate', 'excited', 'happy', 'proud', 'love']), pick(t('m_ok')), 'jump');
      if (first) {
        const xp = step.project ? G.REWARD.project : G.REWARD.task;
        const gems = session.solution ? 0 : (step.project ? G.REWARD.projectGems : G.REWARD.taskGems);
        G.track('step');
        if (session.attempts === 1 && !session.hint && !session.solution) G.track('perfect');
        G.addXP(xp);
        if (gems) G.addGems(gems);
        const btn = document.getElementById('checkBtn');
        fx.fly(btn, 'xp', xp);
        if (gems) setTimeout(() => fx.fly(btn, 'gem', gems), 250);
        fx.floatText(btn, `+${xp} XP${gems ? ` · +${gems} 💎` : ''}`);
        fx.confetti(step.project ? 160 : 70);
        fx.toast(`${t('check_ok')} · ${t('xp_gain', { n: xp })}`, 'ok', 'check');
        unlockNext();
        if (G.coursePct(c) === 100) setTimeout(() => courseDone(c), 1300);
      } else fx.toast(t('check_ok'), 'ok', 'check');
    }
    function unlockNext() {
      const links = C.app.querySelectorAll('.side-steps a');
      const i = c.steps.indexOf(step);
      links[i].classList.add('done'); links[i].querySelector('.dot').innerHTML = C.icon('check', 14);
      if (links[i + 1]) { links[i + 1].classList.remove('locked'); links[i + 1].href = `#/learn/${c.id}/${i + 2}`; links[i + 1].querySelector('.dot').textContent = i + 2; links[i + 1].classList.add('unlock-anim'); }
      const title = C.app.querySelector('.lesson-title');
      if (!title.querySelector('.done-badge')) title.insertAdjacentHTML('afterbegin', `<span class="done-badge pop-in">${C.icon('check', 18)}</span>`);
      const p = G.coursePct(c);
      document.getElementById('sideMeta').textContent = `${G.doneCount(c)}/${c.steps.length} · ${p}%`;
      document.getElementById('sideBar').style.width = p + '%';
      const nb = document.getElementById('nextBtn');
      if (nb) { nb.classList.remove('disabled'); nb.href = `#/learn/${c.id}/${idx + 2}`; nb.innerHTML = `${t('next_step')} →`; nb.classList.add('glow'); }
      document.getElementById('lockNote').hidden = true;
    }

    const runBtn = document.getElementById('runBtn');
    if (runBtn) runBtn.onclick = doRun;
    document.getElementById('checkBtn').onclick = doCheck;
    document.getElementById('resetBtn').onclick = async () => { if (await fx.confirm(t('reset_confirm'))) editor.setValue(starter); };
    const fullBtn = document.getElementById('fullBtn');
    fullBtn.onclick = () => {
      const on = document.body.classList.toggle('ws-full');
      fullBtn.innerHTML = C.icon(on ? 'shrink' : 'expand', 17);
      fullBtn.title = t(on ? 'exit_fullscreen' : 'fullscreen');
      setTimeout(() => editor.refresh(), 60);
    };

    // ---------- Приклади ----------
    let exI = 0;
    const seenEx = new Set();
    function renderExample(dir) {
      const ex = step.examples[exI];
      const body = document.getElementById('exBody');
      const code = tr(ex.code);
      if (!seenEx.has(exI)) { seenEx.add(exI); G.track('example'); }
      body.classList.remove('slide-l', 'slide-r'); void body.offsetWidth; body.classList.add(dir < 0 ? 'slide-r' : 'slide-l');
      body.innerHTML = `<div class="ex-code"></div>
        ${ex.note ? `<p class="ex-note">${C.icon('bulb', 16)} <span>${tr(ex.note)}</span></p>` : ''}
        <div class="ex-actions">
          <button class="btn ghost sm" id="exRun">${C.icon('play', 14)} ${t('run_example')}</button>
          <button class="btn ghost sm" id="exEdit">${C.icon('pencil', 14)} ${t('open_in_editor')}</button>
          ${step.examples.length > 1 ? `<span class="ex-arrows"><button class="btn ghost sm icon" id="exPrev" aria-label="prev">‹</button><span>${exI + 1}/${step.examples.length}</span><button class="btn ghost sm icon" id="exNext" aria-label="next">›</button></span>` : ''}
        </div>
        <div class="ex-out" id="exOut" hidden></div>`;
      body.querySelector('.ex-code').appendChild(C.highlight(code, c.lang));
      document.getElementById('exTabs').querySelectorAll('button').forEach((b) => b.classList.toggle('active', +b.dataset.i === exI));
      document.getElementById('exRun').onclick = async (e) => {
        const out = document.getElementById('exOut');
        out.hidden = false;
        if (isWeb) {
          out.className = 'ex-out web';
          out.innerHTML = '<iframe sandbox="allow-scripts allow-popups allow-modals allow-forms" title="example"></iframe>';
          out.firstChild.srcdoc = C.buildDoc(c.lang, code, ex.html || step.html);
        } else {
          out.className = 'ex-out console';
          e.currentTarget.disabled = true;
          await C.run(c.lang, code, out, { setup: (step.db != null ? step.db : c.db) });
          const b = document.getElementById('exRun'); if (b) b.disabled = false;
        }
      };
      document.getElementById('exEdit').onclick = () => {
        editor.setValue(code);
        editor.focus();
        if (window.innerWidth < 1100) document.getElementById('workspace').scrollIntoView({ behavior: 'smooth' });
      };
      const prev = document.getElementById('exPrev'), next = document.getElementById('exNext');
      if (prev) prev.onclick = () => { exI = (exI - 1 + step.examples.length) % step.examples.length; renderExample(-1); };
      if (next) next.onclick = () => { exI = (exI + 1) % step.examples.length; renderExample(1); };
    }
    document.getElementById('exTabs').querySelectorAll('button').forEach((b) => b.onclick = () => { const d = +b.dataset.i - exI; exI = +b.dataset.i; renderExample(d); });
    renderExample(1);

    // ---------- Підказка та розв’язок ----------
    document.getElementById('hintBtn').onclick = () => {
      const h = document.getElementById('hintBox');
      if (h.hidden) { h.hidden = false; session.hint = true; G.track('hint'); buddy('wink', t('hint') + ' 👇'); }
      else h.hidden = true;
    };
    document.getElementById('solBtn').onclick = async () => {
      if (!(await fx.confirm(t('confirm_solution')))) return;
      session.solution = true;
      const box = document.getElementById('solBox');
      box.hidden = false;
      box.innerHTML = `<div class="sol"><div class="card-label">${C.icon('key', 16)} ${t('solution')}</div></div>`;
      box.firstChild.appendChild(C.highlight(step.task.solution, c.lang));
      const b = C.el(`<button class="btn ghost sm">${C.icon('pencil', 14)} ${t('open_in_editor')}</button>`);
      b.onclick = () => editor.setValue(step.task.solution);
      box.firstChild.appendChild(b);
    };
    document.getElementById('goEditor').onclick = () => document.getElementById('workspace').scrollIntoView({ behavior: 'smooth' });

    // ---------- Міні-тест ----------
    const quiz = document.getElementById('quiz');
    if (quiz) {
      let wrong = 0;
      quiz.querySelectorAll('.quiz-opts button').forEach((b) => b.onclick = () => {
        const i = +b.dataset.i;
        const exp = quiz.querySelector('.quiz-explain');
        exp.hidden = false;
        if (i === step.quiz.answer) {
          quiz.querySelectorAll('.quiz-opts button').forEach((x) => { x.disabled = true; });
          b.classList.add('right');
          exp.innerHTML = `<b>${C.icon('check', 15)} ${t('quiz_ok')}</b> ${tr(step.quiz.explain)}`;
          fx.sound('ok');
          buddy('love', t('m_quiz_ok'));
          if (G.mark(c.id, step.id, 'quiz')) {
            G.track('quiz');
            G.addXP(G.REWARD.quiz);
            if (!wrong) G.addGems(G.REWARD.quizGems);
            fx.fly(b, 'xp', G.REWARD.quiz);
            fx.floatText(b, `+${G.REWARD.quiz} XP`);
          }
        } else {
          wrong++;
          b.classList.add('wrong'); b.disabled = true;
          exp.innerHTML = `<b>✗ ${t('quiz_fail')}</b>`;
          fx.sound('fail');
          buddy('oops', t('m_quiz_fail'));
        }
      });
    }

    // ---------- Озвучка ----------
    const lb = document.getElementById('listenBtn');
    lb.onclick = () => {
      if (fx.speaking) { fx.stopSpeak(); lb.innerHTML = `${C.icon('volume', 16)} <span>${t('listen')}</span>`; lb.classList.remove('speaking'); return; }
      const tmp = document.createElement('div');
      tmp.innerHTML = tr(step.title) + '. ' + tr(step.theory) + (step.why ? ' ' + t('why') + ' ' + tr(step.why) : '');
      tmp.querySelectorAll('pre').forEach((p) => p.remove());
      const ok = fx.speak(tmp.textContent, () => { lb.innerHTML = `${C.icon('volume', 16)} <span>${t('listen')}</span>`; lb.classList.remove('speaking'); });
      if (ok) { lb.innerHTML = `${C.icon('stop', 16)} <span>${t('stop')}</span>`; lb.classList.add('speaking'); }
    };

    document.getElementById('sideToggle').onclick = () => document.getElementById('side').classList.toggle('open');
    const fin = document.getElementById('finishBtn');
    if (fin) fin.onclick = () => { if (G.coursePct(c) === 100) courseDone(c); else location.hash = '#/course/' + c.id; };

    const activeLink = C.app.querySelector('.side-steps a.active');
    if (activeLink) activeLink.scrollIntoView({ block: 'center' });
    window.scrollTo(0, 0);
    document.getElementById('lesson').scrollTop = 0;
    C.setCleanup(() => document.body.classList.remove('ws-full'));
  };

  function lockedScreen(c, idx) {
    const need = G.firstOpenIndex(c);
    C.app.innerHTML = `<div class="page center locked-screen">
      ${C.mascot({ size: 150, mood: 'think' })}
      <div class="lock-big">${C.icon('lock', 40)}</div>
      <h1>${t('locked_title')}</h1>
      <p>${t('locked_d', { n: need + 1, title: esc(tr(c.steps[need].title)) })}</p>
      <a class="btn primary big" href="#/learn/${c.id}/${need + 1}">${t('go_to_step', { n: need + 1 })} →</a>
    </div>`;
  }

  function testsHTML(step, res) {
    if (step.task.expected == null) return `<div class="line muted">—</div>`;
    return `<div class="test ${res ? (res.ok ? 'pass' : 'fail') : ''}">
      <div class="test-head">${res ? (res.ok ? '✅' : '❌') : '⏳'} ${t('tests')} #1</div>
      <div class="test-cols">
        <div><small>${t('expected')}</small><pre>${esc(step.task.expected)}</pre></div>
        <div><small>${t('your_output')}</small><pre>${res ? esc(res.out || '∅') : '…'}</pre></div>
      </div></div>`;
  }

  function courseDone(c) {
    S.coursesRewarded = S.coursesRewarded || {};
    if (!S.coursesRewarded[c.id]) { S.coursesRewarded[c.id] = C.today(); G.addGems(G.REWARD.courseGems); C.save(); }
    fx.confetti(200);
    fx.sound('level');
    fx.modal(`<div class="celebrate">
      ${C.mascot({ size: 140, mood: 'celebrate', acc: 'grad', anim: 'jump' })}
      <h2>${t('done_course_title')}</h2>
      <p>${t('done_course_d', { course: c.name })}</p>
      <div class="row-center"><a class="btn ghost" href="#/courses" data-close>${t('back_to_courses')}</a><button class="btn primary" id="toCert">${C.icon('medal', 16)} ${t('get_cert')}</button></div>
    </div>`, (m) => { m.querySelector('#toCert').onclick = () => C.showCertificate(c); }, 'small');
  }
})();
