// Ігрова логіка: XP і рівні, кристали, серії та заморозки, щоденні квести, досягнення, магазин, ліги.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, L = C.L;
  S.settings = Object.assign({ sound: true, motion: false, voiceRate: 1 }, S.settings || {});

  const G = C.game = {};
  const REWARD = { task: 20, project: 100, quiz: 5, daily: 30, taskGems: 5, projectGems: 40, quizGems: 2, dailyGems: 25, courseGems: 100 };
  G.REWARD = REWARD;

  // ---------- Рівні ----------
  G.levelFromXP = (xp) => { let l = 1; while (50 * (l + 1) * l <= xp) l++; return l; };
  G.levelBounds = (l) => [50 * l * (l - 1), 50 * (l + 1) * l];

  // ---------- Сьогоднішні лічильники ----------
  function ensureToday() {
    const d = C.today();
    if (!S.today || S.today.date !== d) S.today = { date: d, steps: 0, xp: 0, quiz: 0, runs: 0, perfect: 0, examples: 0, daily: 0 };
    return S.today;
  }
  G.ensureToday = ensureToday;

  G.addXP = (n) => {
    if (!n) return;
    const before = G.levelFromXP(S.xp);
    S.xp += n;
    const d = C.today();
    S.xpLog[d] = (S.xpLog[d] || 0) + n;
    ensureToday().xp += n;
    touchDay();
    const after = G.levelFromXP(S.xp);
    S.level = after;
    C.emit('xp', n);
    if (after > before) C.emit('levelup', after);
    afterChange();
  };
  G.addGems = (n) => { S.gems = Math.max(0, S.gems + n); C.emit('gems', n); C.save(); };

  // ---------- Серія ----------
  function touchDay() {
    const d = C.today();
    if (!S.days.includes(d)) { S.days.push(d); C.emit('streak'); }
  }
  G.touchDay = touchDay;
  const activeSet = () => new Set([...S.days, ...S.frozen]);
  G.streak = () => {
    const set = activeSet();
    const d = new Date();
    if (!set.has(C.dateKey(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    while (set.has(C.dateKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  };
  G.bestStreak = () => {
    const sorted = [...activeSet()].sort();
    let best = 0, cur = 0, prev = null;
    for (const k of sorted) {
      const d = new Date(k + 'T12:00:00');
      cur = prev && Math.round((d - prev) / 864e5) === 1 ? cur + 1 : 1;
      best = Math.max(best, cur);
      prev = d;
    }
    return best;
  };
  // Викликається при завантаженні: якщо пропущено дні — витрачаємо заморозки.
  G.processStreak = () => {
    const t = C.today();
    if (S.lastSeen === t) return null;
    S.lastSeen = t;
    const all = [...activeSet()].sort();
    if (!all.length) { C.save(); return null; }
    const last = new Date(all[all.length - 1] + 'T12:00:00');
    const y = new Date(); y.setHours(12, 0, 0, 0); y.setDate(y.getDate() - 1);
    const missed = [];
    const d = new Date(last); d.setDate(d.getDate() + 1);
    while (d <= y) { missed.push(C.dateKey(d)); d.setDate(d.getDate() + 1); }
    if (!missed.length) { C.save(); return null; }
    if (missed.length <= S.freezes) {
      S.freezes -= missed.length;
      S.frozen.push(...missed);
      S.stats.freezesUsed += missed.length;
      C.save();
      return 'frozen';
    }
    C.save();
    return 'lost';
  };

  // ---------- Події та статистика ----------
  G.track = (ev, n) => {
    n = n || 1;
    const td = ensureToday();
    const map = { step: 'steps', quiz: 'quiz', run: 'runs', perfect: 'perfect', example: 'examples', daily: 'daily' };
    if (map[ev]) td[map[ev]] += n;
    if (ev === 'quiz') S.stats.quizRight += n;
    if (ev === 'run') S.stats.runs += n;
    if (ev === 'perfect') S.stats.firstTry += n;
    if (ev === 'example') S.stats.examples += n;
    if (ev === 'pgrun') S.stats.pgRuns += n;
    if (ev === 'hint') S.stats.hints += n;
    if (ev === 'post') S.stats.posts += n;
    afterChange();
  };

  let questState = {};
  function afterChange() {
    // Сповіщення про щойно виконані квести
    const qs = G.quests();
    for (const q of qs) {
      const done = q.progress >= q.target;
      if (done && !questState[q.id]) C.emit('questdone', q);
      questState[q.id] = done;
    }
    G.checkAchievements();
    C.save();
  }

  // ---------- Прогрес кроків ----------
  G.stepState = (cid, sid) => (S.progress[cid] && S.progress[cid][sid]) || {};
  G.isDone = (cid, sid) => !!G.stepState(cid, sid).task;
  G.doneCount = (c) => c.steps.filter((s) => G.isDone(c.id, s.id)).length;
  G.coursePct = (c) => (c.steps.length ? Math.round((G.doneCount(c) / c.steps.length) * 100) : 0);
  G.isUnlocked = (c, idx) => idx === 0 || G.isDone(c.id, c.steps[idx - 1].id) || G.isDone(c.id, c.steps[idx].id);
  G.firstOpenIndex = (c) => { const i = c.steps.findIndex((s) => !G.isDone(c.id, s.id)); return i === -1 ? c.steps.length - 1 : i; };
  // Позначити: field = 'task' | 'quiz'. Повертає true, якщо вперше.
  G.mark = (cid, sid, field, extra) => {
    S.progress[cid] = S.progress[cid] || {};
    const st = S.progress[cid][sid] = S.progress[cid][sid] || {};
    if (st[field]) return false;
    st[field] = C.today();
    if (extra) Object.assign(st, extra);
    touchDay();
    C.save();
    return true;
  };
  G.totalSteps = () => C.courses.reduce((a, c) => a + G.doneCount(c), 0);

  // ---------- Щоденні квести ----------
  const QUEST_TYPES = [
    { id: 'steps', key: 'q_steps', field: 'steps', t: [2, 3, 5], icon: 'book' },
    { id: 'xp', key: 'q_xp', field: 'xp', t: [40, 80, 120], icon: 'bolt' },
    { id: 'quiz', key: 'q_quiz', field: 'quiz', t: [2, 3, 5], icon: 'target' },
    { id: 'runs', key: 'q_runs', field: 'runs', t: [5, 10, 15], icon: 'play' },
    { id: 'perfect', key: 'q_perfect', field: 'perfect', t: [1, 2, 3], icon: 'star' },
    { id: 'examples', key: 'q_examples', field: 'examples', t: [3, 5, 8], icon: 'eye' },
    { id: 'daily', key: 'q_daily', field: 'daily', t: [1, 1, 1], icon: 'puzzle' }
  ];
  G.quests = (date) => {
    date = date || C.today();
    const rnd = C.seeded('quests:' + date);
    const pool = QUEST_TYPES.slice();
    const out = [];
    for (let i = 0; i < 3; i++) {
      const q = pool.splice(Math.floor(rnd() * pool.length), 1)[0];
      const diff = i; // 0 легкий, 1 середній, 2 складний
      const td = ensureToday();
      out.push({ id: q.id, icon: q.icon, key: q.key, target: q.t[diff], reward: [10, 15, 25][diff], progress: date === td.date ? td[q.field] : 0 });
    }
    return out;
  };
  const qd = () => (S.quests[C.today()] = S.quests[C.today()] || { claimed: [], chest: false });
  G.questClaimed = (id) => qd().claimed.includes(id);
  G.claimQuest = (id) => {
    const q = G.quests().find((x) => x.id === id);
    if (!q || q.progress < q.target || G.questClaimed(id)) return 0;
    qd().claimed.push(id);
    G.addGems(q.reward);
    return q.reward;
  };
  G.chestReady = () => qd().claimed.length >= 3 && !qd().chest;
  G.chestOpened = () => qd().chest;
  G.openChest = () => {
    if (!G.chestReady()) return null;
    qd().chest = true;
    const gems = 20 + Math.floor(Math.random() * 41);
    const freeze = Math.random() < 0.15 && S.freezes < 3;
    G.addGems(gems);
    if (freeze) S.freezes++;
    C.save();
    return { gems, freeze };
  };

  // ---------- Задача дня ----------
  G.dailyProblem = () => {
    const pool = window.CODRY_DAILY || [];
    if (!pool.length) return null;
    const day = Math.floor(new Date(C.today() + 'T12:00:00').getTime() / 864e5);
    return pool[day % pool.length];
  };
  G.dailySolvedToday = () => S.dailySolved.includes(C.today());
  G.solveDaily = () => {
    if (G.dailySolvedToday()) return false;
    S.dailySolved.push(C.today());
    G.track('daily');
    G.addXP(REWARD.daily);
    G.addGems(REWARD.dailyGems);
    return true;
  };

  // ---------- Досягнення ----------
  const ctx = () => {
    const done = C.courses.filter((c) => c.steps.length && G.coursePct(c) === 100).map((c) => c.id);
    const touched = C.courses.filter((c) => G.doneCount(c) > 0).length;
    return { steps: G.totalSteps(), done, touched, streak: G.streak(), best: G.bestStreak(), xp: S.xp, level: G.levelFromXP(S.xp), st: S.stats, daily: S.dailySolved.length, hour: new Date().getHours(), owned: S.owned.length };
  };
  const A = (id, icon, c1, c2, gems, title, desc, test) => ({ id, icon, c1, c2, gems, title, desc, test });
  G.ACHIEVEMENTS = [
    A('first_step', 'flag', '#60a5fa', '#2563eb', 10, L('Перший крок', 'Первый шаг', 'First step'), L('Виконай перше завдання', 'Выполни первое задание', 'Complete your first task'), (x) => x.steps >= 1),
    A('steps10', 'book', '#34d399', '#059669', 20, L('Учень', 'Ученик', 'Learner'), L('Пройди 10 кроків', 'Пройди 10 шагов', 'Complete 10 steps'), (x) => x.steps >= 10),
    A('steps50', 'book', '#a78bfa', '#6d28d9', 50, L('Книжковий черв’як', 'Книжный червь', 'Bookworm'), L('Пройди 50 кроків', 'Пройди 50 шагов', 'Complete 50 steps'), (x) => x.steps >= 50),
    A('steps100', 'rocket', '#f472b6', '#be185d', 100, L('Ракета', 'Ракета', 'Rocket'), L('Пройди 100 кроків', 'Пройди 100 шагов', 'Complete 100 steps'), (x) => x.steps >= 100),
    A('steps200', 'crown', '#fde047', '#ca8a04', 200, L('Майстер коду', 'Мастер кода', 'Code master'), L('Пройди 200 кроків', 'Пройди 200 шагов', 'Complete 200 steps'), (x) => x.steps >= 200),
    A('course1', 'trophy', '#fbbf24', '#d97706', 50, L('Випускник', 'Выпускник', 'Graduate'), L('Заверши перший курс', 'Заверши первый курс', 'Finish your first course'), (x) => x.done.length >= 1),
    A('course3', 'medal', '#f97316', '#c2410c', 100, L('Колекціонер', 'Коллекционер', 'Collector'), L('Заверши 3 курси', 'Заверши 3 курса', 'Finish 3 courses'), (x) => x.done.length >= 3),
    A('fullstack', 'code', '#22d3ee', '#0e7490', 150, L('Веб-майстер', 'Веб-мастер', 'Web master'), L('Заверши HTML, CSS і JavaScript', 'Заверши HTML, CSS и JavaScript', 'Finish HTML, CSS and JavaScript'), (x) => ['html', 'css', 'javascript'].every((i) => x.done.includes(i))),
    A('roblox', 'cube', '#f87171', '#b91c1c', 100, L('Творець Roblox', 'Создатель Roblox', 'Roblox creator'), L('Заверши курс Roblox (Luau)', 'Заверши курс Roblox (Luau)', 'Finish the Roblox (Luau) course'), (x) => x.done.includes('luau')),
    A('poly3', 'globe', '#5eead4', '#0f766e', 30, L('Поліглот', 'Полиглот', 'Polyglot'), L('Виконай кроки в 3 різних мовах', 'Выполни шаги в 3 разных языках', 'Complete steps in 3 languages'), (x) => x.touched >= 3),
    A('poly6', 'globe', '#c4b5fd', '#5b21b6', 80, L('Гіперполіглот', 'Гиперполиглот', 'Hyperpolyglot'), L('Виконай кроки в 6 мовах', 'Выполни шаги в 6 языках', 'Complete steps in 6 languages'), (x) => x.touched >= 6),
    A('streak3', 'flame', '#fb923c', '#ea580c', 15, L('Розігрів', 'Разогрев', 'Warming up'), L('Серія 3 дні', 'Серия 3 дня', '3-day streak'), (x) => x.best >= 3),
    A('streak7', 'flame', '#f97316', '#dc2626', 40, L('Тиждень вогню', 'Неделя огня', 'Week on fire'), L('Серія 7 днів', 'Серия 7 дней', '7-day streak'), (x) => x.best >= 7),
    A('streak30', 'flame', '#f43f5e', '#9f1239', 150, L('Місяць коду', 'Месяц кода', 'Month of code'), L('Серія 30 днів', 'Серия 30 дней', '30-day streak'), (x) => x.best >= 30),
    A('streak100', 'sun', '#fde047', '#f97316', 500, L('Невгасимий', 'Неугасимый', 'Unstoppable'), L('Серія 100 днів', 'Серия 100 дней', '100-day streak'), (x) => x.best >= 100),
    A('xp500', 'bolt', '#fde047', '#eab308', 25, L('Заряджений', 'Заряженный', 'Charged'), L('Заробі 500 XP', 'Заработай 500 XP', 'Earn 500 XP'), (x) => x.xp >= 500),
    A('xp2000', 'bolt', '#facc15', '#a16207', 75, L('Блискавка', 'Молния', 'Lightning'), L('Заробі 2000 XP', 'Заработай 2000 XP', 'Earn 2000 XP'), (x) => x.xp >= 2000),
    A('xp5000', 'sparkle', '#e879f9', '#a21caf', 200, L('Енергостанція', 'Электростанция', 'Power plant'), L('Заробі 5000 XP', 'Заработай 5000 XP', 'Earn 5000 XP'), (x) => x.xp >= 5000),
    A('level5', 'star', '#93c5fd', '#1d4ed8', 30, L('Рівень 5', 'Уровень 5', 'Level 5'), L('Досягни 5 рівня', 'Достигни 5 уровня', 'Reach level 5'), (x) => x.level >= 5),
    A('level10', 'star', '#fcd34d', '#b45309', 100, L('Рівень 10', 'Уровень 10', 'Level 10'), L('Досягни 10 рівня', 'Достигни 10 уровня', 'Reach level 10'), (x) => x.level >= 10),
    A('quiz10', 'target', '#86efac', '#15803d', 20, L('Знавець', 'Знаток', 'Know-it-all'), L('10 правильних відповідей у тестах', '10 правильных ответов в тестах', '10 correct quiz answers'), (x) => x.st.quizRight >= 10),
    A('quiz50', 'target', '#4ade80', '#166534', 60, L('Ерудит', 'Эрудит', 'Scholar'), L('50 правильних відповідей', '50 правильных ответов', '50 correct answers'), (x) => x.st.quizRight >= 50),
    A('perfect10', 'shield', '#7dd3fc', '#0369a1', 40, L('Снайпер', 'Снайпер', 'Sharpshooter'), L('10 завдань з першої спроби', '10 заданий с первой попытки', '10 tasks on the first try'), (x) => x.st.firstTry >= 10),
    A('daily1', 'puzzle', '#fda4af', '#e11d48', 15, L('Головоломка', 'Головоломка', 'Puzzler'), L('Розв’яжи задачу дня', 'Реши задачу дня', 'Solve a daily challenge'), (x) => x.daily >= 1),
    A('daily7', 'cal', '#f9a8d4', '#be185d', 60, L('Щоденник', 'Ежедневник', 'Daily devotee'), L('Розв’яжи 7 задач дня', 'Реши 7 задач дня', 'Solve 7 daily challenges'), (x) => x.daily >= 7),
    A('daily30', 'cal', '#d8b4fe', '#7e22ce', 200, L('Місяць головоломок', 'Месяц головоломок', 'Puzzle month'), L('Розв’яжи 30 задач дня', 'Реши 30 задач дня', 'Solve 30 daily challenges'), (x) => x.daily >= 30),
    A('night', 'moon', '#818cf8', '#312e81', 20, L('Нічна сова', 'Ночная сова', 'Night owl'), L('Займайся після 23:00', 'Занимайся после 23:00', 'Study after 11 PM'), (x) => x.hour >= 23 || x.hour < 4),
    A('early', 'sun', '#fdba74', '#f59e0b', 20, L('Рання пташка', 'Ранняя пташка', 'Early bird'), L('Займайся до 7:00', 'Занимайся до 7:00', 'Study before 7 AM'), (x) => x.hour >= 4 && x.hour < 7),
    A('runs100', 'keyboard', '#a5b4fc', '#4338ca', 30, L('Клавіатурний ніндзя', 'Клавиатурный ниндзя', 'Keyboard ninja'), L('Запусти код 100 разів', 'Запусти код 100 раз', 'Run code 100 times'), (x) => x.st.runs >= 100),
    A('sandbox', 'cube', '#67e8f9', '#0891b2', 15, L('Експериментатор', 'Экспериментатор', 'Experimenter'), L('10 запусків у пісочниці', '10 запусков в песочнице', '10 runs in the playground'), (x) => x.st.pgRuns >= 10),
    A('freeze', 'snow', '#bae6fd', '#0284c7', 10, L('Холодна голова', 'Холодная голова', 'Cool head'), L('Заморозка врятувала серію', 'Заморозка спасла серию', 'A freeze saved your streak'), (x) => x.st.freezesUsed >= 1),
    A('shopper', 'shop', '#fcd34d', '#d97706', 10, L('Модник', 'Модник', 'Fashionista'), L('Купи щось у магазині', 'Купи что-нибудь в магазине', 'Buy something in the shop'), (x) => x.st.bought >= 1),
    A('forum', 'chat', '#6ee7b7', '#047857', 10, L('Співрозмовник', 'Собеседник', 'Talker'), L('Напиши на форумі', 'Напиши на форуме', 'Post on the forum'), (x) => x.st.posts >= 1),
    A('examples50', 'eye', '#fca5a5', '#dc2626', 20, L('Допитливий', 'Любознательный', 'Curious'), L('Переглянь 50 прикладів', 'Просмотри 50 примеров', 'View 50 examples'), (x) => x.st.examples >= 50)
  ];
  G.checkAchievements = () => {
    const x = ctx();
    for (const a of G.ACHIEVEMENTS) {
      if (S.achievements[a.id]) continue;
      let ok = false;
      try { ok = a.test(x); } catch (e) { ok = false; }
      if (ok) {
        S.achievements[a.id] = C.today();
        S.gems += a.gems;
        C.emit('achievement', a);
      }
    }
  };

  // ---------- Магазин ----------
  G.SHOP = [
    { id: 'freeze', type: 'freeze', price: 60, icon: 'snow' },
    ...[['cap', 80], ['bow', 80], ['glasses', 100], ['beanie', 100], ['headphones', 150], ['flower', 120], ['party', 120], ['pirate', 180], ['grad', 200], ['wizard', 250], ['halo', 300], ['crown', 500]]
      .map(([k, p]) => ({ id: 'acc:' + k, type: 'acc', key: k, price: p })),
    ...[['green', 100], ['pink', 100], ['purple', 120], ['orange', 120], ['mint', 150], ['red', 150], ['gold', 400], ['night', 300]]
      .map(([k, p]) => ({ id: 'color:' + k, type: 'color', key: k, price: p })),
    ...[['dracula', 150], ['ocean', 150], ['forest', 150], ['sunset', 200], ['mono', 120]]
      .map(([k, p]) => ({ id: 'theme:' + k, type: 'theme', key: k, price: p }))
  ];
  G.ACC_NAMES = { none: L('Без аксесуара', 'Без аксессуара', 'No accessory'), cap: L('Кепка', 'Кепка', 'Cap'), bow: L('Бантик', 'Бантик', 'Bow'), glasses: L('Окуляри', 'Очки', 'Glasses'), beanie: L('Шапка', 'Шапка', 'Beanie'), headphones: L('Навушники', 'Наушники', 'Headphones'), flower: L('Квітка', 'Цветок', 'Flower'), party: L('Святковий ковпак', 'Праздничный колпак', 'Party hat'), pirate: L('Піратський капелюх', 'Пиратская шляпа', 'Pirate hat'), grad: L('Випускна шапка', 'Выпускная шапка', 'Graduation cap'), wizard: L('Капелюх чарівника', 'Шляпа волшебника', 'Wizard hat'), halo: L('Німб', 'Нимб', 'Halo'), crown: L('Корона', 'Корона', 'Crown') };
  G.COLOR_NAMES = { blue: L('Синій', 'Синий', 'Blue'), green: L('Зелений', 'Зелёный', 'Green'), pink: L('Рожевий', 'Розовый', 'Pink'), purple: L('Фіолетовий', 'Фиолетовый', 'Purple'), orange: L('Помаранчевий', 'Оранжевый', 'Orange'), mint: L('М’ятний', 'Мятный', 'Mint'), red: L('Червоний', 'Красный', 'Red'), gold: L('Золотий', 'Золотой', 'Gold'), night: L('Нічний', 'Ночной', 'Night') };
  G.THEME_NAMES = { codry: 'Codry', dracula: 'Dracula', ocean: 'Ocean', forest: 'Forest', sunset: 'Sunset', mono: 'Mono' };
  G.buy = (id) => {
    const it = G.SHOP.find((x) => x.id === id);
    if (!it) return 'err';
    if (it.type === 'freeze' && S.freezes >= 3) return 'max';
    if (it.type !== 'freeze' && S.owned.includes(id)) return 'owned';
    if (S.gems < it.price) return 'poor';
    S.gems -= it.price;
    if (it.type === 'freeze') S.freezes++;
    else { S.owned.push(id); S.equip[it.type] = it.key; }
    S.stats.bought++;
    afterChange();
    C.emit('gems', -it.price);
    return 'ok';
  };
  G.equip = (type, key) => { S.equip[type] = key; C.save(); C.emit('equip'); };

  // ---------- Ліга ----------
  const NAMES = ['Олена', 'Max', 'Дмитро', 'Sofia', 'Андрій', 'Liam', 'Ірина', 'Аня', 'Noah', 'Тарас', 'Emma', 'Кирило', 'Mia', 'Богдан', 'Лука', 'Ava', 'Марта', 'Олег', 'Zoe', 'Віка', 'Ethan', 'Назар', 'Ліза', 'Leo', 'Настя', 'Ярослав', 'Chloe', 'Остап', 'Даша', 'Ivan', 'Соломія', 'Jack', 'Маргарита', 'Артем', 'Nina', 'Мирон'];
  G.weekXP = (wk) => {
    wk = wk || C.weekKey();
    let sum = 0;
    const start = new Date(wk + 'T12:00:00');
    for (let i = 0; i < 7; i++) { const d = new Date(start); d.setDate(start.getDate() + i); sum += S.xpLog[C.dateKey(d)] || 0; }
    return sum;
  };
  function weekProgress(wk) {
    const start = new Date(wk + 'T00:00:00').getTime();
    return Math.min(1, Math.max(0, (Date.now() - start) / (7 * 864e5)));
  }
  // Демо-суперники: детерміновані для тижня та ліги, XP росте протягом тижня.
  G.demoBoard = (wk, tier, frac) => {
    wk = wk || C.weekKey();
    const rnd = C.seeded('league:' + wk + ':' + tier);
    const p = frac == null ? weekProgress(wk) : frac;
    const people = [];
    const names = NAMES.slice();
    for (let i = 0; i < 29; i++) {
      const name = names.splice(Math.floor(rnd() * names.length), 1)[0];
      const target = Math.round((40 + rnd() * 600) * (1 + tier * 0.25) * (rnd() < 0.2 ? 0.2 : 1));
      const curve = Math.pow(p, 0.6 + rnd() * 0.9);
      people.push({ name, xp: Math.round(target * curve), demo: true, color: C.mascotColorKeys[i % C.mascotColorKeys.length], acc: C.mascotAcc[i % C.mascotAcc.length] });
    }
    return people;
  };
  G.board = () => {
    const me = { name: S.profile.name || C.t('you'), xp: G.weekXP(), me: true, color: S.equip.color, acc: S.equip.acc };
    const list = (C.cloud && C.cloud.board) ? C.cloud.board.slice() : G.demoBoard(C.weekKey(), S.league.tier);
    if (!list.some((x) => x.me)) list.push(me);
    return list.sort((a, b) => b.xp - a.xp);
  };
  // На початку нового тижня — підсумок минулого.
  G.processLeague = () => {
    const wk = C.weekKey();
    if (!S.league.week) { S.league.week = wk; C.save(); return null; }
    if (S.league.week === wk) return null;
    const prev = S.league.week;
    const mine = G.weekXP(prev);
    const others = G.demoBoard(prev, S.league.tier, 1);
    const rank = others.filter((o) => o.xp > mine).length + 1;
    const oldTier = S.league.tier;
    if (mine > 0 && rank <= 7) S.league.tier = Math.min(9, S.league.tier + 1);
    else if (rank > 25) S.league.tier = Math.max(0, S.league.tier - 1);
    S.league.week = wk;
    S.league.lastResult = { week: prev, rank, xp: mine, from: oldTier, to: S.league.tier };
    C.save();
    return S.league.tier !== oldTier ? S.league.lastResult : null;
  };

  C.mascotColorKeys = Object.keys(C.mascotColors || { blue: 1 });
})();
