// Карта світу курсу (стежка з кроками, острови-глави, замки-проєкти) і бої з босами наприкінці глав.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;
  const T = (uk, ru, en) => tr({ uk, ru, en });

  // ---------- Глави курсу ----------
  C.chapters = (c) => {
    const out = [];
    c.steps.forEach((s, i) => {
      const name = s.chapter ? tr(s.chapter) : '';
      const last = out[out.length - 1];
      if (last && last.name === name) last.to = i;
      else out.push({ name, from: i, to: i });
    });
    return out;
  };
  const chapterDone = (c, ch) => c.steps.slice(ch.from, ch.to + 1).every((s) => G.isDone(c.id, s.id));
  const bossKey = (cid, n) => cid + ':' + n;
  const bossWon = (cid, n) => !!(S.bosses || {})[bossKey(cid, n)];

  const BOSSES = [
    { name: ['Баг-Жук', 'Баг-Жук', 'Bug Beetle'], c1: '#22c55e', c2: '#15803d', horns: 1 },
    { name: ['Цикл-Змій', 'Цикл-Змей', 'Loop Serpent'], c1: '#06b6d4', c2: '#0e7490', horns: 0 },
    { name: ['Синтакс-Троль', 'Синтакс-Тролль', 'Syntax Troll'], c1: '#a78bfa', c2: '#6d28d9', horns: 2 },
    { name: ['Нуль-Привид', 'Нуль-Призрак', 'Null Ghost'], c1: '#cbd5e1', c2: '#64748b', horns: 0, ghost: 1 },
    { name: ['Рекурсо-Дракон', 'Рекурсо-Дракон', 'Recursion Dragon'], c1: '#f97316', c2: '#b91c1c', horns: 2 },
    { name: ['Король Багів', 'Король Багов', 'Bug King'], c1: '#facc15', c2: '#a16207', horns: 1, crown: 1 }
  ];
  const bossOf = (n) => BOSSES[n % BOSSES.length];
  const bossName = (b) => tr({ uk: b.name[0], ru: b.name[1], en: b.name[2] });

  // Мальований бос: тіло-крапля, очі, роги, зуби. state: idle | hit | win | lost
  C.bossSVG = (n, size) => {
    const b = bossOf(n), id = 'bg' + n + Math.random().toString(36).slice(2, 6);
    const horns = b.horns === 2 ? `<path d="M30 30 18 6 42 24M90 30l12-24-24 18" fill="${b.c2}" stroke="#0b1020" stroke-width="4" stroke-linejoin="round"/>`
      : b.horns === 1 ? `<path d="M48 22 60 2l12 20" fill="${b.c2}" stroke="#0b1020" stroke-width="4" stroke-linejoin="round"/>` : '';
    const crown = b.crown ? `<path d="M38 20 44 2l10 12 6-14 6 14 10-12 6 18z" fill="#fde047" stroke="#0b1020" stroke-width="4" stroke-linejoin="round"/>` : '';
    const body = b.ghost
      ? `<path d="M20 110V60a40 40 0 0 1 80 0v50l-10-8-10 8-10-8-10 8-10-8-10 8-10-8z" fill="url(#${id})" stroke="#0b1020" stroke-width="5" stroke-linejoin="round"/>`
      : `<path d="M60 22c30 0 46 22 46 50s-18 44-46 44S14 100 14 72s16-50 46-50z" fill="url(#${id})" stroke="#0b1020" stroke-width="5"/>
         <path d="M22 96 8 108M98 96l14 12" stroke="#0b1020" stroke-width="6" stroke-linecap="round"/>`;
    return `<svg class="boss-svg" viewBox="0 0 120 124" width="${size}" height="${size}" aria-hidden="true">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b.c1}"/><stop offset="1" stop-color="${b.c2}"/></linearGradient></defs>
      ${horns}${body}${crown}
      <g class="boss-eyes"><ellipse cx="45" cy="62" rx="11" ry="12" fill="#fff" stroke="#0b1020" stroke-width="4"/><ellipse cx="75" cy="62" rx="11" ry="12" fill="#fff" stroke="#0b1020" stroke-width="4"/>
      <circle cx="48" cy="64" r="5" fill="#0b1020"/><circle cx="72" cy="64" r="5" fill="#0b1020"/>
      <path d="M33 47l20 8M87 47l-20 8" stroke="#0b1020" stroke-width="5" stroke-linecap="round"/></g>
      <path class="boss-mouth" d="M42 88q18 12 36 0" fill="#7f1d1d" stroke="#0b1020" stroke-width="4" stroke-linecap="round"/>
      <path d="M48 89l4 7 4-6 4 6 4-6 4 6 4-7" fill="#fff" stroke="#0b1020" stroke-width="2" stroke-linejoin="round"/>
    </svg>`;
  };

  // ---------- Карта ----------
  // Вузли: кроки + бос після кожної глави. Координати: зигзаг по колонках.
  C.courseMap = (c) => {
    const chs = C.chapters(c);
    const open = G.firstOpenIndex(c);
    const nodes = [];
    chs.forEach((ch, ci) => {
      for (let i = ch.from; i <= ch.to; i++) nodes.push({ kind: 'step', i, ci });
      if (chs.length > 1 && !c.steps[ch.to].project) nodes.push({ kind: 'boss', ci, ch });
    });
    const X = [50, 74, 84, 66, 40, 18, 26, 50];   // зигзаг у відсотках ширини
    const STEP = 96, TOP = 70;
    nodes.forEach((n, k) => { n.x = X[k % X.length]; n.y = TOP + k * STEP; });
    const H = TOP + nodes.length * STEP + 30;
    const pts = nodes.map((n) => [n.x * 10, n.y]);     // viewBox шириною 1000
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let k = 1; k < pts.length; k++) {
      const [x0, y0] = pts[k - 1], [x1, y1] = pts[k];
      d += ` C${x0} ${y0 + STEP / 2} ${x1} ${y1 - STEP / 2} ${x1} ${y1}`;
    }
    // Острови глав — кольорові плями під своїми вузлами
    const islands = chs.map((ch, ci) => {
      const own = nodes.filter((n) => n.ci === ci);
      const y0 = own[0].y - 46, y1 = own[own.length - 1].y + 46;
      return `<div class="isle isle-${ci % 5}" style="top:${y0}px;height:${y1 - y0}px"><span>${esc(ch.name)}</span></div>`;
    }).join('');
    const doneLen = (() => {
      let k = 0;
      while (k < nodes.length && (nodes[k].kind === 'step' ? G.isDone(c.id, c.steps[nodes[k].i].id) : bossWon(c.id, nodes[k].ci))) k++;
      return k;
    })();
    const html = nodes.map((n, k) => {
      if (n.kind === 'boss') {
        const unlocked = chapterDone(c, n.ch), won = bossWon(c.id, n.ci);
        return `<a class="mnode boss ${won ? 'won' : ''} ${unlocked ? '' : 'locked'}" style="left:${n.x}%;top:${n.y}px" href="${unlocked ? `#/boss/${c.id}/${n.ci + 1}` : 'javascript:void 0'}" title="${esc(bossName(bossOf(n.ci)))}">
          <span class="mboss">${C.bossSVG(n.ci, 58)}</span>${won ? `<span class="mflag">${C.icon('flag', 16)}</span>` : unlocked ? '' : `<span class="mlock">${C.icon('lock', 14)}</span>`}
          <span class="mlabel">${won ? T('Переможений', 'Побеждён', 'Defeated') : esc(bossName(bossOf(n.ci)))}</span></a>`;
      }
      const s = c.steps[n.i], done = G.isDone(c.id, s.id), unlocked = G.isUnlocked(c, n.i), cur = n.i === open && !done;
      return `<a class="mnode ${done ? 'done' : ''} ${cur ? 'cur' : ''} ${unlocked ? '' : 'locked'} ${s.project ? 'castle' : ''}" style="left:${n.x}%;top:${n.y}px;--c1:${c.color};--c2:${c.color2}" href="${unlocked ? `#/learn/${c.id}/${n.i + 1}` : 'javascript:void 0'}">
        <span class="mdot">${s.project ? C.icon('crown', 22) : done ? C.icon('check', 20) : unlocked ? n.i + 1 : C.icon('lock', 15)}</span>
        <span class="mlabel">${esc(tr(s.title))}</span>
        ${cur ? `<span class="mhero">${C.mascot({ size: 56, mood: 'excited', anim: 'jump' })}</span>` : ''}</a>`;
    }).join('');
    const totalLen = nodes.length > 1 ? (doneLen - 0.5) / (nodes.length - 1) : 0;
    return `<div class="world" style="height:${H}px">
      ${islands}
      <svg class="world-path" viewBox="0 0 1000 ${H}" preserveAspectRatio="none" aria-hidden="true">
        <path d="${d}" class="wp-base" vector-effect="non-scaling-stroke"/>
        <path d="${d}" class="wp-done" pathLength="1" style="stroke-dasharray:${Math.max(0, totalLen)} 1" vector-effect="non-scaling-stroke"/>
      </svg>
      ${html}
    </div>`;
  };

  // ================= Бій з босом =================
  C.pages.boss = (cid, nStr) => {
    const c = C.courseById(cid);
    const n = (+nStr || 1) - 1;
    const chs = c ? C.chapters(c) : [];
    const ch = chs[n];
    if (!c || !ch) return C.notFound();
    if (!chapterDone(c, ch)) {
      C.app.innerHTML = `<div class="page center">${C.bossSVG(n, 140)}<h1>${T('Бос ще спить', 'Босс ещё спит', 'The boss is asleep')}</h1><p>${T('Пройди всі кроки глави', 'Пройди все шаги главы', 'Finish every step of the chapter')} «${esc(ch.name)}», ${T('щоб розбудити його.', 'чтобы разбудить его.', 'to wake it up.')}</p><a class="btn primary" href="#/course/${c.id}">← ${c.name}</a></div>`;
      return;
    }
    // Питання: тести глави, за потреби доповнені попередніми главами.
    const quizOf = (from, to) => c.steps.slice(from, to + 1).filter((s) => s.quiz).map((s) => s.quiz);
    let qs = quizOf(ch.from, ch.to);
    if (qs.length < 5) qs = qs.concat(quizOf(0, ch.from - 1).slice(-(5 - qs.length)));
    qs = qs.map((q) => ({ q, r: Math.random() })).sort((a, b) => a.r - b.r).map((x) => x.q).slice(0, 8);
    const boss = bossOf(n), bName = bossName(boss);
    const maxHp = qs.length, TIME = 20;
    let hp = maxHp, hearts = 3, idx = 0, timer = null, left = TIME, locked = false;

    C.app.innerHTML = `<div class="page boss-page">
      <a class="back" href="#/course/${c.id}">← ${c.name}</a>
      <div class="arena" data-reveal>
        <div class="fighter me"><div id="meArt">${C.mascot({ size: 120, mood: 'cool', anim: 'float' })}</div>
          <div class="hearts" id="hearts"></div><b>${esc(S.profile.name || t('you'))}</b></div>
        <div class="vs">VS</div>
        <div class="fighter foe"><div id="foeArt" class="foe-art">${C.bossSVG(n, 140)}</div>
          <div class="hpbar"><i id="hpFill" style="width:100%"></i><span id="hpText">${hp}/${maxHp}</span></div><b>${esc(bName)}</b></div>
      </div>
      <div class="card boss-q" id="bossQ" data-reveal></div>
    </div>`;
    fx.reveal(C.app);
    const drawHearts = () => { document.getElementById('hearts').innerHTML = [0, 1, 2].map((i) => `<span class="${i < hearts ? 'on' : ''}">${C.icon('heart', 22)}</span>`).join(''); };
    drawHearts();
    const stop = () => { clearInterval(timer); timer = null; };
    C.setCleanup(stop);

    const finish = (won) => {
      stop();
      const box = document.getElementById('bossQ');
      if (won) {
        const first = !bossWon(c.id, n);
        S.bosses = S.bosses || {};
        S.bosses[bossKey(c.id, n)] = C.today();
        C.save();
        if (first) { G.addXP(50); G.addGems(30); }
        document.getElementById('foeArt').classList.add('defeated');
        document.getElementById('meArt').innerHTML = C.mascot({ size: 120, mood: 'celebrate', anim: 'jump' });
        fx.sound('level');
        fx.confetti(160);
        box.innerHTML = `<div class="center-col"><h2>${T('Перемога!', 'Победа!', 'Victory!')}</h2><p>${esc(bName)} ${T('переможений.', 'побеждён.', 'is defeated.')} ${first ? '+50 XP · +30 💎' : T('(нагороду вже отримано раніше)', '(награда уже получена раньше)', '(reward already claimed)')}</p>
          <div class="row-center"><a class="btn primary" href="#/course/${c.id}">${T('До карти', 'К карте', 'Back to map')} →</a></div></div>`;
        if (first) G.checkAchievements && G.checkAchievements();
      } else {
        document.getElementById('meArt').innerHTML = C.mascot({ size: 120, mood: 'sad' });
        fx.sound('fail');
        box.innerHTML = `<div class="center-col"><h2>${T('Цього разу бос сильніший', 'В этот раз босс сильнее', 'The boss wins this time')}</h2><p class="muted">${T('Повтори теорію глави й спробуй знову — питання щоразу перемішуються.', 'Повтори теорию главы и попробуй снова — вопросы каждый раз перемешиваются.', 'Review the chapter and try again — questions are shuffled each time.')}</p>
          <div class="row-center"><button class="btn primary" id="again">${T('Ще раз', 'Ещё раз', 'Try again')}</button><a class="btn ghost" href="#/learn/${c.id}/${ch.from + 1}">${T('Повторити главу', 'Повторить главу', 'Review chapter')}</a></div></div>`;
        document.getElementById('again').onclick = () => C.pages.boss(cid, nStr);
      }
    };
    const answer = (k) => {
      if (locked) return;
      locked = true;
      stop();
      const q = qs[idx];
      const btns = document.querySelectorAll('#bossQ .quiz-opts button');
      const right = k === q.answer;
      btns.forEach((b, i) => { if (i === q.answer) b.classList.add('right'); else if (i === k) b.classList.add('wrong'); b.disabled = true; });
      const foe = document.getElementById('foeArt'), me = document.getElementById('meArt');
      if (right) {
        hp--;
        foe.classList.remove('hit'); void foe.offsetWidth; foe.classList.add('hit');
        fx.sound('ok');
        fx.floatText(foe, '-1');
      } else {
        hearts--;
        me.classList.remove('hurt'); void me.offsetWidth; me.classList.add('hurt');
        drawHearts();
        fx.sound('fail');
      }
      document.getElementById('hpFill').style.width = (hp / maxHp) * 100 + '%';
      document.getElementById('hpText').textContent = `${hp}/${maxHp}`;
      setTimeout(() => {
        if (hp <= 0) return finish(true);
        if (hearts <= 0) return finish(false);
        idx++;
        if (idx >= qs.length) return finish(hp <= 0);
        ask();
      }, right ? 900 : 1700);
    };
    const ask = () => {
      locked = false;
      left = TIME;
      const q = qs[idx];
      document.getElementById('bossQ').innerHTML = `<div class="card-head"><div class="card-label">${C.icon('target', 16)} ${T('Удар', 'Удар', 'Strike')} ${idx + 1}/${qs.length}</div><div class="btimer"><i id="tFill"></i><span id="tLeft">${left}</span></div></div>
        <p class="boss-question">${tr(q.q)}</p>
        <div class="quiz-opts">${q.options.map((o, i) => `<button data-k="${i}"><span class="qo-letter">${'ABCD'[i]}</span><span>${tr(o)}</span></button>`).join('')}</div>`;
      document.querySelectorAll('#bossQ [data-k]').forEach((b) => b.onclick = () => answer(+b.dataset.k));
      const tick = () => {
        const f = document.getElementById('tFill');
        if (!f) return stop();
        f.style.width = (left / TIME) * 100 + '%';
        document.getElementById('tLeft').textContent = left;
        if (left <= 0) answer(-1);
        left--;
      };
      tick();
      timer = setInterval(tick, 1000);
    };
    ask();
  };
})();
