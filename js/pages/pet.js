// Улюбленець Кодрик: росте від XP, має ситість і настрій, які залежать від того, чи ти вчишся щодня.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;
  const T = (uk, ru, en) => tr({ uk, ru, en });

  const STAGES = [
    { xp: 0, name: ['Яйце', 'Яйцо', 'Egg'], size: 0 },
    { xp: 60, name: ['Малюк', 'Малыш', 'Baby'], size: 90 },
    { xp: 400, name: ['Школяр', 'Школьник', 'Kid'], size: 120 },
    { xp: 1500, name: ['Підліток', 'Подросток', 'Teen'], size: 150 },
    { xp: 4000, name: ['Майстер коду', 'Мастер кода', 'Code master'], size: 175 }
  ];
  const FOOD = [
    { id: 'cookie', emoji: '🍪', price: 5, food: 25, happy: 3, name: ['Печиво', 'Печенье', 'Cookie'] },
    { id: 'pizza', emoji: '🍕', price: 12, food: 60, happy: 6, name: ['Піца', 'Пицца', 'Pizza'] },
    { id: 'cake', emoji: '🎂', price: 25, food: 100, happy: 20, name: ['Торт', 'Торт', 'Cake'] }
  ];
  const nm = (a) => tr({ uk: a[0], ru: a[1], en: a[2] });
  const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
  const clamp = (v) => Math.max(0, Math.min(100, Math.round(v)));

  // Перерахунок стану за дні, що минули: голод росте, настрій падає без занять і росте з ними.
  C.petStatus = () => {
    const p = S.pet = Object.assign({ fed: '', food: 70, happy: 70, name: '', calc: '', pets: {} }, S.pet || {});
    const today = C.today();
    if (!p.calc) p.calc = today;
    const gap = daysBetween(p.calc, today);
    if (gap > 0) {
      const active = new Set([...(S.days || []), ...(S.frozen || [])]);
      for (let i = 1; i <= gap; i++) {
        const d = new Date(p.calc + 'T12:00:00'); d.setDate(d.getDate() + i);
        const key = C.dateKey(d);
        p.food = clamp(p.food - 25);
        p.happy = clamp(p.happy + (active.has(key) ? 12 : -18) - (p.food < 20 ? 8 : 0));
      }
      p.calc = today;
      C.save();
    }
    const stage = STAGES.reduce((acc, s, i) => (S.xp >= s.xp ? i : acc), 0);
    const next = STAGES[stage + 1];
    const score = (p.food + p.happy) / 2;
    const mood = p.food < 15 ? 'sad' : score >= 80 ? 'excited' : score >= 60 ? 'happy' : score >= 40 ? 'idle' : score >= 25 ? 'sleepy' : 'sad';
    return { p, stage, next, mood, score };
  };
  // Заняття сьогодні підбадьорюють улюбленця (раз на день).
  C.on && C.on('xp', () => {
    const st = C.petStatus();
    if (st.p.cheer !== C.today()) { st.p.cheer = C.today(); st.p.happy = clamp(st.p.happy + 10); C.save(); }
  });

  const say = (st) => {
    const { p, mood } = st;
    if (p.food < 15) return T('Я дуже голодний… нагодуй мене, будь ласка!', 'Я очень голодный… покорми меня, пожалуйста!', 'I’m so hungry… please feed me!');
    if (mood === 'excited') return T('Я найщасливіший робот у світі! Ходімо кодити!', 'Я самый счастливый робот в мире! Пойдём кодить!', 'I’m the happiest robot ever! Let’s code!');
    if (mood === 'happy') return T('Мені добре! Пройдемо ще один крок?', 'Мне хорошо! Пройдём ещё один шаг?', 'I feel good! One more step?');
    if (mood === 'idle') return T('Трохи скучно… давай щось вивчимо.', 'Немного скучно… давай что-нибудь выучим.', 'A bit bored… let’s learn something.');
    if (mood === 'sleepy') return T('Я сумую без тебе. Повертайся до уроків!', 'Я скучаю без тебя. Возвращайся к урокам!', 'I miss you. Come back to your lessons!');
    return T('Мені сумно… Один урок — і мені стане краще.', 'Мне грустно… Один урок — и мне станет лучше.', 'I’m sad… One lesson would cheer me up.');
  };
  const eggSVG = (size, cracks) => `<svg viewBox="0 0 100 120" width="${size}" height="${size * 1.2}" class="pet-egg" aria-hidden="true">
    <ellipse cx="50" cy="66" rx="40" ry="50" fill="#e0f2fe" stroke="#0b1020" stroke-width="5"/>
    <path d="M22 60q8-6 14 0t14 0 14 0 14 0" fill="none" stroke="#60a5fa" stroke-width="6" stroke-linecap="round"/>
    <circle cx="36" cy="88" r="6" fill="#93c5fd"/><circle cx="64" cy="40" r="5" fill="#93c5fd"/>
    ${cracks ? '<path d="M46 18l6 10-6 8 7 9" fill="none" stroke="#0b1020" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' : ''}</svg>`;
  const art = (st, size) => (st.stage === 0
    ? eggSVG(size * 0.75, S.xp > STAGES[1].xp * 0.5)
    : C.mascot({ size: Math.round(size * STAGES[st.stage].size / 175), mood: st.mood, anim: st.mood === 'excited' ? 'jump' : 'float', acc: st.stage >= 4 ? 'grad' : undefined }));

  // Віджет для головної сторінки
  C.petWidget = () => {
    const st = C.petStatus();
    return `<a class="card pet-widget" href="#/pet" data-reveal>
      <div class="pw-art">${art(st, 90)}</div>
      <div class="pw-main"><b>${esc(st.p.name || T('Кодрик', 'Кодрик', 'Codrik'))}</b> <span class="tag">${nm(STAGES[st.stage].name)}</span>
        <p class="muted">${say(st)}</p>
        <div class="pw-bars"><span>🍗</span><div class="bar"><i style="width:${st.p.food}%;--c1:#f97316;--c2:#facc15"></i></div><span>💖</span><div class="bar"><i style="width:${st.p.happy}%;--c1:#ec4899;--c2:#f472b6"></i></div></div></div>
      <span class="tc-arrow">→</span></a>`;
  };

  // ================= Сторінка улюбленця =================
  C.pages.pet = () => {
    const st = C.petStatus();
    const { p, stage, next } = st;
    const prog = next ? Math.round(((S.xp - STAGES[stage].xp) / (next.xp - STAGES[stage].xp)) * 100) : 100;
    const petsToday = (p.pets || {})[C.today()] || 0;
    C.app.innerHTML = `<div class="page narrow">
      <div class="pet-stage" data-reveal>
        <div class="pet-room"><div class="pet-art" id="petArt">${art(st, 175)}</div><div class="pet-bubble">${say(st)}</div></div>
        <h1 class="page-title pet-name"><span id="petName">${esc(p.name || T('Кодрик', 'Кодрик', 'Codrik'))}</span> <button class="icon-btn" id="rename" title="${T('Перейменувати', 'Переименовать', 'Rename')}">${C.icon('pencil', 16)}</button></h1>
        <div class="pet-stagebar"><span class="tag">${nm(STAGES[stage].name)}</span>
          ${next ? `<div class="bar"><i style="width:${prog}%"></i></div><small class="muted">${T('до стадії', 'до стадии', 'to')} «${nm(next.name)}»: ${S.xp}/${next.xp} XP</small>` : `<small class="muted">${T('Максимальна стадія!', 'Максимальная стадия!', 'Final stage!')}</small>`}</div>
      </div>
      <div class="split">
        <div class="card" data-reveal><div class="card-label">🍗 ${T('Ситість', 'Сытость', 'Food')}</div><div class="bar big"><i style="width:${p.food}%;--c1:#f97316;--c2:#facc15"></i></div><small class="muted">${p.food}%. ${T('Щодня зменшується на 25.', 'Каждый день уменьшается на 25.', 'Drops by 25 every day.')}</small></div>
        <div class="card" data-reveal><div class="card-label">💖 ${T('Настрій', 'Настроение', 'Mood')}</div><div class="bar big"><i style="width:${p.happy}%;--c1:#ec4899;--c2:#f472b6"></i></div><small class="muted">${p.happy}%. ${T('Росте від уроків, падає в дні без занять.', 'Растёт от уроков, падает в дни без занятий.', 'Rises with lessons, falls on days without them.')}</small></div>
      </div>
      <div class="card" data-reveal><div class="card-label">${C.icon('gift', 16)} ${T('Нагодувати', 'Покормить', 'Feed')} · ${T('у тебе', 'у тебя', 'you have')} ${S.gems} 💎</div>
        <div class="food-row">${FOOD.map((f) => `<button class="food-btn" data-food="${f.id}" ${S.gems < f.price || p.food >= 100 ? 'disabled' : ''}><span class="food-emoji">${f.emoji}</span><b>${nm(f.name)}</b><small>+${f.food} 🍗 · ${f.price} 💎</small></button>`).join('')}</div></div>
      <div class="row-center" data-reveal><button class="btn primary" id="petBtn" ${petsToday >= 3 ? 'disabled' : ''}>${C.icon('heart', 16)} ${T('Погладити', 'Погладить', 'Pet')} (${3 - petsToday})</button><a class="btn ghost" href="#/courses">${C.icon('book', 16)} ${T('До уроків', 'К урокам', 'To lessons')}</a></div>
      <div class="card pet-stages" data-reveal><div class="card-label">${C.icon('star', 16)} ${T('Стадії росту', 'Стадии роста', 'Growth stages')}</div>
        <div class="stage-row">${STAGES.map((s, i) => `<div class="stage-item ${i <= stage ? 'on' : ''}"><div>${i === 0 ? eggSVG(46) : C.mascot({ size: 30 + i * 10, mood: i <= stage ? 'happy' : 'sleepy', acc: i >= 4 ? 'grad' : undefined })}</div><b>${nm(s.name)}</b><small>${s.xp} XP</small></div>`).join('')}</div></div>
    </div>${C.footer()}`;
    fx.reveal(C.app);
    document.querySelectorAll('[data-food]').forEach((b) => b.onclick = () => {
      const f = FOOD.find((x) => x.id === b.dataset.food);
      if (S.gems < f.price) return;
      G.addGems(-f.price);
      p.food = clamp(p.food + f.food); p.happy = clamp(p.happy + f.happy); p.fed = C.today();
      C.save();
      fx.sound('coin');
      fx.floatText(document.getElementById('petArt'), f.emoji + ' +' + f.food);
      setTimeout(() => C.pages.pet(), 650);
    });
    document.getElementById('petBtn').onclick = () => {
      p.pets = p.pets || {};
      const k = C.today();
      if ((p.pets[k] || 0) >= 3) return;
      p.pets = { [k]: (p.pets[k] || 0) + 1 };
      p.happy = clamp(p.happy + 4);
      C.save();
      fx.sound('pop');
      fx.floatText(document.getElementById('petArt'), '💖');
      setTimeout(() => C.pages.pet(), 600);
    };
    document.getElementById('rename').onclick = () => {
      const n = (prompt(T('Як назвеш свого робота?', 'Как назовёшь своего робота?', 'Name your robot:'), p.name || '') || '').trim().slice(0, 20);
      if (n) { p.name = n; C.save(); document.getElementById('petName').textContent = n; }
    };
  };
})();
