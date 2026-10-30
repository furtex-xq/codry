// Головна, каталог курсів, сторінка курсу, шляхи навчання.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;

  function stats() {
    const steps = C.courses.reduce((a, c) => a + c.steps.length, 0);
    const ex = C.courses.reduce((a, c) => a + c.steps.reduce((b, s) => b + (s.examples || []).length, 0), 0);
    return { courses: C.courses.length, steps, ex };
  }

  C.courseCard = (c, i) => {
    const pct = G.coursePct(c);
    const btn = pct === 100 ? t('repeat') : pct > 0 ? t('continue') : t('start');
    return `<a class="course-card tilt" href="#/course/${c.id}" style="--c1:${c.color};--c2:${c.color2}" data-reveal="${(i % 4) * 70}">
      <div class="cc-glow"></div>
      <div class="cc-top">${C.courseBadge(c, 58)}<span class="tag">${c.tag ? tr(c.tag) : t('level_beginner')}</span></div>
      <h3>${c.name}</h3>
      <p>${tr(c.desc)}</p>
      <div class="cc-meta"><span>${C.icon('book', 15)} ${c.steps.length} ${C.plural(c.steps.length, t('steps_forms'))}</span><span>${pct}%</span></div>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <span class="btn primary block">${btn}</span>
    </a>`;
  };

  function coursesGrid(filter) {
    const cats = [['all', 'cat_all'], ['web', 'cat_web'], ['lang', 'cat_lang'], ['games', 'cat_games'], ['data', 'cat_data']];
    const list = C.courses.filter((c) => filter === 'all' || c.cat === filter);
    return `<div class="chips" id="catChips">${cats.map(([k, l]) => `<button data-cat="${k}" class="${k === filter ? 'active' : ''}">${t(l)}</button>`).join('')}</div>
      <div class="course-grid">${list.map(C.courseCard).join('')}</div>`;
  }
  function bindChips(root) {
    root.querySelectorAll('#catChips button').forEach((b) => b.onclick = () => {
      C.LS.set('cat', b.dataset.cat);
      const wrap = root.querySelector('#gridWrap');
      wrap.innerHTML = coursesGrid(b.dataset.cat);
      bindChips(root);
      fx.reveal(wrap);
    });
  }

  function roadmaps() {
    const maps = [
      { k: 'road_first', ico: 'flag', c: ['#34d399', '#059669'], list: ['python'] },
      { k: 'road_front', ico: 'code', c: ['#f97316', '#db2777'], list: ['html', 'css', 'javascript'] },
      { k: 'road_games', ico: 'cube', c: ['#f87171', '#7c3aed'], list: ['lua', 'luau'] },
      { k: 'road_python', ico: 'db', c: ['#60a5fa', '#0891b2'], list: ['python', 'sql'] },
      { k: 'road_backend', ico: 'rocket', c: ['#a78bfa', '#4338ca'], list: ['go', 'java', 'csharp', 'cpp'] }
    ];
    return `<div class="roadmaps">${maps.map((m, i) => `<div class="road" data-reveal="${i * 80}" style="--c1:${m.c[0]};--c2:${m.c[1]}">
        <div class="road-ico">${C.icon(m.ico, 26)}</div>
        <h3>${t(m.k)}</h3><p>${t(m.k + '_d')}</p>
        <ol class="road-steps">${m.list.map((id) => { const c = C.courseById(id); return c ? `<li><a href="#/course/${id}">${C.courseBadge(c, 26)} ${c.name}<span class="road-pct">${G.coursePct(c)}%</span></a></li>` : ''; }).join('')}</ol>
      </div>`).join('')}</div>`;
  }

  // ================= Головна =================
  C.pages.home = () => {
    const s = stats();
    const st = G.streak();
    const feats = [['cal', 'feat_daily', '#f97316', '#e11d48'], ['trophy', 'feat_league', '#facc15', '#d97706'], ['medal', 'feat_badges', '#a78bfa', '#6d28d9'], ['shop', 'feat_shop', '#34d399', '#047857'], ['volume', 'feat_voice', '#60a5fa', '#1d4ed8'], ['chat', 'feat_forum', '#f472b6', '#be185d']];
    C.app.innerHTML = `
      <section class="hero">
        <canvas class="code-rain" id="rain"></canvas>
        <div class="hero-text">
          <span class="pill">${C.icon('sparkle', 16)} ${t('hero_badge')}</span>
          <h1>${t('hero_title')}</h1>
          <p class="lead">${t('hero_sub')}</p>
          <div class="hero-cta">
            <a class="btn primary big" href="#/courses">${t('hero_cta')} →</a>
            <a class="btn ghost big" href="#/daily">${C.icon('puzzle', 18)} ${t('hero_cta2')}</a>
          </div>
          <div class="hero-stats">
            <div><b data-count="${s.courses}">0</b><span>${t('hero_stat1')}</span></div>
            <div><b data-count="${s.steps}">0</b><span>${t('hero_stat2')}</span></div>
            <div><b data-count="${s.ex}">0</b><span>${t('hero_stat3')}</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="mascot-wrap" id="heroMascot">${C.mascot({ size: 130, mood: 'wink', anim: 'float' })}<div class="bubble">${t('mascot_hi')}</div></div>
          <div class="window">
            <div class="window-bar"><i></i><i></i><i></i><span id="typingFile">main.py</span></div>
            <pre class="code cm-s-codry typing" id="typing"></pre>
            <div class="window-out"><span class="muted">&gt;</span> <span id="typingOut"></span></div>
          </div>
          <div class="float-chip c1">${C.icon('flame', 18)} ${st} ${t('streak_days')}</div>
          <div class="float-chip c2">${C.icon('gem', 18)} +25</div>
          <div class="float-chip c3">${C.icon('bolt', 18)} +20 XP</div>
        </div>
      </section>
      ${C.petWidget ? `<section class="section pet-sec">${C.petWidget()}</section>` : ""}
      <div class="marquee"><div class="marquee-track">${[...C.courses, ...C.courses, ...C.courses].map((c) => `<a href="#/course/${c.id}">${C.courseBadge(c, 30)} ${c.name}</a>`).join('')}</div></div>
      <section class="section" id="courses">
        <h2 class="section-title" data-reveal>${t('courses_title')}</h2>
        <p class="section-sub" data-reveal>${t('courses_sub')}</p>
        <div id="gridWrap">${coursesGrid(C.LS.get('cat', 'all'))}</div>
      </section>
      <section class="section">
        <h2 class="section-title" data-reveal>${t('how_title')}</h2>
        <div class="how">${[['book', 'how1'], ['eye', 'how2'], ['keyboard', 'how3'], ['gift', 'how4']].map(([i, k], n) => `
          <div class="how-card" data-reveal="${n * 90}"><div class="how-num">${n + 1}</div><div class="how-ico">${C.icon(i, 30)}</div><h3>${t(k + '_t')}</h3><p>${t(k + '_d')}</p></div>`).join('')}</div>
      </section>
      <section class="section">
        <h2 class="section-title" data-reveal>${t('feat_title')}</h2>
        <div class="feats">${feats.map(([i, k, c1, c2], n) => `<div class="feat tilt" data-reveal="${n * 70}" style="--c1:${c1};--c2:${c2}"><div class="feat-ico">${C.icon(i, 28)}</div><h3>${t(k + '_t')}</h3><p>${t(k + '_d')}</p></div>`).join('')}</div>
      </section>
      <section class="section mood-strip" data-reveal>
        ${['happy', 'think', 'surprised', 'love', 'cool', 'excited', 'sleepy', 'proud'].map((m, i) => `<div class="mood-item" style="animation-delay:${i * 0.15}s">${C.mascot({ size: 86, mood: m, color: C.mascotColorKeys[i % C.mascotColorKeys.length], acc: ['none', 'cap', 'glasses', 'bow', 'headphones', 'crown', 'beanie', 'grad'][i] })}</div>`).join('')}
      </section>
      <section class="section">
        <h2 class="section-title" data-reveal>${t('roadmaps_title')}</h2>
        <p class="section-sub" data-reveal>${t('roadmaps_sub')}</p>
        ${roadmaps()}
      </section>
      ${C.footer()}`;
    bindChips(C.app);
    const stopRain = fx.codeRain(document.getElementById('rain'));
    const stopTyping = startTyping();
    C.setCleanup(() => { stopRain(); stopTyping(); });
    const hm = document.getElementById('heroMascot');
    hm.onclick = () => {
      const moods = ['happy', 'love', 'surprised', 'cool', 'excited', 'wink', 'proud', 'celebrate'];
      hm.querySelector('svg').outerHTML = C.mascot({ size: 130, mood: moods[Math.floor(Math.random() * moods.length)], anim: 'jump' });
      fx.sound('pop');
    };
  };

  function startTyping() {
    const pre = document.getElementById('typing'), out = document.getElementById('typingOut'), file = document.getElementById('typingFile');
    const snippets = [
      { f: 'main.py', m: 'python', code: 'name = "Codry"\nfor i in range(3):\n    print(f"Hi, {name}! #{i + 1}")', out: 'Hi, Codry! #1 …' },
      { f: 'script.js', m: 'javascript', code: 'const nums = [3, 1, 2];\nconst sorted = nums.sort();\nconsole.log(sorted);', out: '[ 1, 2, 3 ]' },
      { f: 'Coin.lua', m: 'lua', code: 'local coin = Instance.new("Part")\ncoin.Touched:Connect(function()\n  coins += 1\nend)', out: 'Coins: 1' },
      { f: 'query.sql', m: 'text/x-sqlite', code: 'SELECT name, score\nFROM players\nORDER BY score DESC\nLIMIT 3;', out: 'Alex | 980' }
    ];
    let si = 0, ci = 0, timer = null, alive = true;
    function tick() {
      if (!alive || !document.body.contains(pre)) return;
      const s = snippets[si];
      ci++;
      file.textContent = s.f;
      pre.innerHTML = '';
      CodeMirror.runMode(s.code.slice(0, ci), s.m, pre);
      pre.insertAdjacentHTML('beforeend', '<span class="caret"></span>');
      if (ci < s.code.length) { out.textContent = ''; timer = setTimeout(tick, 30 + Math.random() * 45); }
      else { out.textContent = s.out; timer = setTimeout(() => { si = (si + 1) % snippets.length; ci = 0; tick(); }, 2400); }
    }
    tick();
    return () => { alive = false; clearTimeout(timer); };
  }

  // ================= Каталог =================
  C.pages.courses = () => {
    C.app.innerHTML = `<div class="page">
      <h1 class="page-title" data-reveal>${C.icon('book', 30)} ${t('courses_title')}</h1>
      <p class="section-sub left" data-reveal>${t('courses_sub')}</p>
      <div id="gridWrap">${coursesGrid(C.LS.get('cat', 'all'))}</div>
      <h2 class="section-title mt" data-reveal>${t('roadmaps_title')}</h2>
      <p class="section-sub" data-reveal>${t('roadmaps_sub')}</p>
      ${roadmaps()}
    </div>${C.footer()}`;
    bindChips(C.app);
  };

  // ================= Сторінка курсу =================
  C.pages.course = (id) => {
    const c = C.courseById(id);
    if (!c) return C.notFound();
    const pct = G.coursePct(c);
    const open = G.firstOpenIndex(c);
    const view = C.LS.get('courseView', 'map');
    let lastCh = null;
    const items = c.steps.map((s, i) => {
      const done = G.isDone(c.id, s.id), unlocked = G.isUnlocked(c, i);
      let head = '';
      if (s.chapter && tr(s.chapter) !== lastCh) { lastCh = tr(s.chapter); head = `<li class="chapter-head" data-reveal><span>${C.icon('map', 16)} ${esc(lastCh)}</span></li>`; }
      return head + `<li class="${done ? 'done' : ''} ${i === open && !done ? 'current' : ''} ${unlocked ? '' : 'locked'} ${s.project ? 'project' : ''}" data-reveal="${(i % 8) * 40}">
        <a href="${unlocked ? `#/learn/${c.id}/${i + 1}` : 'javascript:void 0'}" ${unlocked ? '' : 'aria-disabled="true"'}>
          <span class="sl-num">${done ? C.icon('check', 18) : unlocked ? i + 1 : C.icon('lock', 16)}</span>
          <span class="sl-title">${s.project ? `<em class="proj-tag">${C.icon('rocket', 14)} ${t('project')}</em>` : ''}${esc(tr(s.title))}</span>
          <span class="sl-meta">${(s.examples || []).length} ${t('examples').toLowerCase()}${s.quiz ? ' · ' + t('quiz').toLowerCase() : ''}</span>
        </a></li>`;
    }).join('');
    C.app.innerHTML = `<div class="page">
      <section class="course-hero" style="--c1:${c.color};--c2:${c.color2}" data-reveal>
        <div class="ch-badge">${C.courseBadge(c, 96)}</div>
        <div class="ch-text">
          <a class="crumb" href="#/courses">← ${t('nav_courses')}</a>
          <h1>${c.name}</h1>
          <p>${tr(c.desc)}</p>
          <div class="ch-meta"><span>${C.icon('book', 16)} ${c.steps.length} ${C.plural(c.steps.length, t('steps_forms'))}</span><span>${C.icon('bolt', 16)} ${c.steps.reduce((a, s) => a + (s.project ? G.REWARD.project : G.REWARD.task) + (s.quiz ? G.REWARD.quiz : 0), 0)} XP</span><span>${C.icon('check', 16)} ${G.doneCount(c)}/${c.steps.length}</span></div>
          <div class="bar big"><i style="width:${pct}%"></i></div>
          <div class="hero-cta">
            <a class="btn primary big" href="#/learn/${c.id}/${open + 1}">${pct === 0 ? t('start') : pct === 100 ? t('repeat') : t('continue')} →</a>
            <button class="btn ghost big" id="certBtn">${C.icon('medal', 18)} ${t('get_cert')}</button>
          </div>
        </div>
        <div class="ch-mascot">${C.mascot({ size: 120, mood: pct === 100 ? 'proud' : pct > 0 ? 'happy' : 'wink', anim: 'float' })}</div>
      </section>
      <div class="view-switch" data-reveal><div class="seg" id="viewSeg">
        <button data-v="map" class="${view === 'map' ? 'active' : ''}">${C.icon('map', 16)} ${tr({ uk: 'Карта', ru: 'Карта', en: 'Map' })}</button>
        <button data-v="list" class="${view === 'list' ? 'active' : ''}">${C.icon('book', 16)} ${tr({ uk: 'Список', ru: 'Список', en: 'List' })}</button></div></div>
      <div id="courseView">${view === 'map' ? C.courseMap(c) : `<ol class="step-list">${items}</ol>`}</div>
    </div>${C.footer()}`;
    document.getElementById('certBtn').onclick = () => C.showCertificate(c);
    document.querySelectorAll('#viewSeg button').forEach((b) => b.onclick = () => { C.LS.set('courseView', b.dataset.v); C.pages.course(id); fx.reveal(C.app); });
    const cur = document.querySelector('.mnode.cur');
    if (view === 'map' && cur && G.doneCount(c) > 0) setTimeout(() => cur.scrollIntoView({ block: 'center', behavior: 'smooth' }), 500);
  };

  // ================= Сертифікат =================
  C.showCertificate = (c) => {
    if (G.coursePct(c) < 100) {
      fx.modal(`<div class="confirm">${C.mascot({ size: 100, mood: 'think' })}<p>${t('cert_locked')}</p><p class="muted">${G.doneCount(c)} / ${c.steps.length}</p><div class="row-center"><button class="btn primary" data-close>${t('ok')}</button></div></div>`, null, 'small');
      return;
    }
    const locale = { uk: 'uk-UA', ru: 'ru-RU', en: 'en-GB' }[S.lang];
    const date = new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    fx.modal(`<div class="cert-wrap">
      <label class="field">${t('cert_name_prompt')}<input id="certName" value="${esc(S.profile.name)}" maxlength="40"></label>
      <div class="cert" id="cert" style="--c1:${c.color};--c2:${c.color2}">
        <div class="cert-inner">
          <div class="cert-mascot">${C.mascot({ size: 70, mood: 'proud', acc: 'grad' })}</div>
          <div class="logo"><span class="logo-mark">{ }</span><span class="logo-text">Codry</span></div>
          <small class="cert-h">${t('cert_header')}</small>
          <p>${t('cert_confirms')}</p>
          <h2 id="certNameOut">${esc(S.profile.name || '—')}</h2>
          <p>${t('cert_completed')}</p>
          <h3>${C.courseBadge(c, 34)} ${c.name}</h3>
          <div class="cert-foot"><div><small>${t('cert_date')}</small><b>${date}</b></div><div><small>${t('steps')}</small><b>${c.steps.length}</b></div><div class="seal">${C.icon('star', 30)}</div></div>
        </div>
      </div>
      <div class="row-end"><button class="btn ghost" data-close>${t('close')}</button><button class="btn primary" id="printCert">${t('cert_print')}</button></div>
    </div>`, (m) => {
      const inp = m.querySelector('#certName');
      inp.oninput = () => { S.profile.name = inp.value; C.save(); m.querySelector('#certNameOut').textContent = inp.value || '—'; };
      m.querySelector('#printCert').onclick = () => window.print();
    });
  };
})();
