// Ядро Codry: спільний простір імен, стан, збереження, утиліти, реєстр курсів.
(function () {
  'use strict';

  const LS = {
    get(k, d) { try { const v = localStorage.getItem('codry:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('codry:' + k, JSON.stringify(v)); } catch (e) { /* приватний режим */ } },
    del(k) { try { localStorage.removeItem('codry:' + k); } catch (e) { /* */ } },
    keys() { try { return Object.keys(localStorage).filter((k) => k.startsWith('codry:')); } catch (e) { return []; } }
  };

  function detectLang() {
    const n = (navigator.language || 'uk').toLowerCase();
    if (n.startsWith('ru')) return 'ru';
    if (n.startsWith('uk')) return 'uk';
    return n.startsWith('en') ? 'en' : 'uk';
  }

  const dateKey = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const today = () => dateKey(new Date());
  // Номер тижня (понеділок — початок) для ліг.
  function weekKey(d) {
    d = new Date(d || Date.now());
    const day = (d.getDay() + 6) % 7;
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - day);
    return dateKey(d);
  }

  function defaultState() {
    return {
      v: 2,
      lang: detectLang(),
      theme: 'dark',
      progress: {},          // { courseId: { stepId: { task, quiz, first } } }
      days: [],              // дні з активністю
      frozen: [],            // дні, врятовані заморозкою
      freezes: 1,            // заморозки серії в запасі
      xp: 0,
      xpLog: {},             // { '2026-10-17': 45 }
      gems: 50,
      today: null,           // лічильники для щоденних завдань
      quests: {},            // { date: { claimed: [ids], chest: bool } }
      dailySolved: [],       // дати розв’язаних «Задач дня»
      achievements: {},      // { id: date }
      owned: ['acc:none', 'color:blue', 'theme:codry'],
      equip: { acc: 'none', color: 'blue', theme: 'codry' },
      profile: { name: '', age: '' },
      league: { week: '', tier: 0, lastResult: null },
      stats: { runs: 0, pgRuns: 0, quizRight: 0, firstTry: 0, hints: 0, posts: 0, examples: 0, freezesUsed: 0, bought: 0 },
      level: 1,
      lastSeen: ''
    };
  }

  function loadState() {
    const s = LS.get('state', null);
    const st = Object.assign(defaultState(), s || {});
    // Міграція з першої версії сайту
    if (!s) {
      const oldP = LS.get('progress', null);
      if (oldP) {
        st.progress = oldP;
        st.days = LS.get('days', []);
        st.profile.name = LS.get('name', '');
        st.lang = LS.get('lang', st.lang);
        st.theme = LS.get('theme', st.theme);
        let xp = 0;
        for (const c in oldP) for (const k in oldP[c]) { if (oldP[c][k].task) xp += 20; if (oldP[c][k].quiz) xp += 5; }
        st.xp = xp;
      }
    }
    for (const k of ['stats', 'equip', 'profile', 'league']) st[k] = Object.assign(defaultState()[k], st[k] || {});
    return st;
  }

  const state = loadState();
  const listeners = {};

  const Codry = window.Codry = {
    LS, state, today, dateKey, weekKey,
    courses: [],
    pages: {},
    on(ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); },
    emit(ev, data) { (listeners[ev] || []).forEach((fn) => { try { fn(data); } catch (e) { console.error(e); } }); },
    save: null,
    resetState() { const fresh = defaultState(); fresh.lang = state.lang; fresh.theme = state.theme; Object.keys(state).forEach((k) => delete state[k]); Object.assign(state, fresh); Codry.saveNow(); }
  };

  let saveTimer = null;
  Codry.saveNow = () => { clearTimeout(saveTimer); LS.set('state', state); Codry.emit('saved'); };
  Codry.save = () => { clearTimeout(saveTimer); saveTimer = setTimeout(Codry.saveNow, 250); };
  window.addEventListener('beforeunload', () => LS.set('state', state));

  // ---------- Текст ----------
  Codry.L = (uk, ru, en) => ({ uk, ru, en });
  Codry.tr = (v) => {
    if (v == null) return '';
    if (typeof v !== 'object') return v;
    return v[state.lang] ?? v.uk ?? v.en ?? Object.values(v)[0];
  };
  Codry.t = (key, vars) => {
    const S = window.CODRY_STRINGS;
    let s = (S[state.lang] && S[state.lang][key]) ?? S.uk[key] ?? key;
    if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  };
  // Множина: plural(5, ['крок','кроки','кроків'])
  Codry.plural = (n, forms) => {
    if (state.lang === 'en') return n === 1 ? forms[0] : forms[1];
    const a = Math.abs(n) % 100, b = a % 10;
    if (a > 10 && a < 20) return forms[2];
    if (b > 1 && b < 5) return forms[1];
    if (b === 1) return forms[0];
    return forms[2];
  };

  // ---------- DOM ----------
  Codry.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  Codry.el = (html) => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; };
  Codry.debounce = (fn, ms) => { let tm; return (...a) => { clearTimeout(tm); tm = setTimeout(() => fn(...a), ms); }; };
  Codry.sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  // Детермінований генератор випадкових чисел (для щоденних завдань, демо-ліги)
  Codry.seeded = (seedStr) => {
    let h = 2166136261;
    for (let i = 0; i < seedStr.length; i++) { h ^= seedStr.charCodeAt(i); h = Math.imul(h, 16777619); }
    return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  };

  // ---------- Реєстр курсів ----------
  // Codry.course({...}) — оголосити курс; Codry.steps(id, [...]) — додати кроки (можна з кількох файлів).
  Codry.course = (c) => {
    const ex = Codry.courses.find((x) => x.id === c.id);
    if (ex) Object.assign(ex, c);
    else Codry.courses.push(Object.assign({ steps: [] }, c));
  };
  Codry.steps = (id, steps) => {
    let c = Codry.courses.find((x) => x.id === id);
    if (!c) { c = { id, steps: [] }; Codry.courses.push(c); }
    c.steps.push(...steps);
  };
  Codry.courseById = (id) => Codry.courses.find((c) => c.id === id);
})();
