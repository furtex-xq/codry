// Режим учителя: класи, завдання, прогрес учнів. Сторінка учня «Мій клас».
// З Firebase — учні приєднуються за кодом, прогрес видно автоматично.
// Без Firebase — запрошення посиланням, учні надсилають код-звіт, учитель вставляє його в таблицю.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, tr = C.tr, esc = C.esc;
  const T = (uk, ru, en) => tr({ uk, ru, en });

  // ---------- Утиліти ----------
  const b64e = (obj) => btoa(unescape(encodeURIComponent(JSON.stringify(obj)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const b64d = (s) => {
    s = String(s).trim().replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return JSON.parse(decodeURIComponent(escape(atob(s))));
  };
  const genCode = () => Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');
  const REPORT_PREFIX = 'CODRY-';
  const cloudOn = () => C.cloud.classesShared && C.cloud.classesShared();

  // Номери пройдених кроків курсу (з будь-якого об’єкта progress — свого чи учня з хмари).
  function doneIdx(progress, cid) {
    const c = C.courseById(cid);
    const p = (progress || {})[cid] || {};
    return c ? c.steps.map((s, i) => (p[s.id] && p[s.id].task ? i : -1)).filter((i) => i >= 0) : [];
  }
  function assignStats(a, done) {
    const set = new Set(done || []);
    let n = 0;
    for (let i = a.from - 1; i <= a.to - 1; i++) if (set.has(i)) n++;
    return { done: n, total: a.to - a.from + 1 };
  }
  function streakOf(days, frozen) {
    const set = new Set([...(days || []), ...(frozen || [])]);
    const d = new Date();
    if (!set.has(C.dateKey(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    while (set.has(C.dateKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  const courseName = (cid) => { const c = C.courseById(cid); return c ? c.name : cid; };
  const fmtDate = (d) => (d ? new Date(d + 'T12:00:00').toLocaleDateString(S.lang === 'en' ? 'en-GB' : S.lang, { day: 'numeric', month: 'short' }) : '');
  const daysLeft = (d) => (d ? Math.round((new Date(d + 'T23:59:59') - Date.now()) / 864e5) : null);
  const pctColor = (p) => (p >= 100 ? 'ok' : p >= 50 ? 'mid' : p > 0 ? 'low' : 'zero');
  const assignTitle = (a) => `${esc(courseName(a.course))} · ${T('кроки', 'шаги', 'steps')} ${a.from}–${a.to}`;

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); fx.toast(T('Скопійовано', 'Скопировано', 'Copied'), 'ok', 'copy'); }
    catch (e) { fx.toast(T('Не вдалося скопіювати — виділи текст вручну', 'Не удалось скопировать — выдели текст вручную', 'Copy failed — select the text manually'), 'bad', 'info'); }
  }
  function download(name, text) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' }));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  const askName = () => {
    if (S.profile.name) return S.profile.name;
    const n = (prompt(T('Як тебе звати? Учитель побачить це ім’я.', 'Как тебя зовут? Учитель увидит это имя.', 'What’s your name? Your teacher will see it.')) || '').trim().slice(0, 30);
    if (n) { S.profile.name = n; C.save(); }
    return n;
  };

  // ================= Кабінет учителя =================
  C.pages.teacher = (id) => {
    const cls = id && S.teacher.classes.find((x) => x.id === id);
    if (id && !cls) { location.hash = '#/teacher'; return; }
    if (cls) return classPage(cls);
    const list = S.teacher.classes;
    C.app.innerHTML = `<div class="page">
      <div class="tc-hero" data-reveal>
        <div>${C.mascot({ size: 110, mood: 'think', anim: 'float' })}</div>
        <div><h1 class="page-title">${C.icon('school', 30)} ${T('Кабінет учителя', 'Кабинет учителя', 'Teacher dashboard')}</h1>
        <p class="section-sub left">${T('Створи клас, дай учням завдання з будь-якого курсу та стеж за їхнім прогресом.', 'Создай класс, дай ученикам задания из любого курса и следи за их прогрессом.', 'Create a class, assign steps from any course and follow your students’ progress.')}</p>
        <span class="pill">${cloudOn() ? `${C.icon('globe', 15)} ${T('Хмарний режим: прогрес оновлюється сам', 'Облачный режим: прогресс обновляется сам', 'Cloud mode: progress updates automatically')}`
          : `${C.icon('key', 15)} ${T('Локальний режим: учні надсилають коди-звіти', 'Локальный режим: ученики присылают коды-отчёты', 'Local mode: students send report codes')}`}</span></div>
      </div>
      ${!cloudOn() && C.cloud.enabled ? `<div class="notice" data-reveal>${C.icon('info', 18)} ${T('Увійди в акаунт, щоб учні приєднувалися за кодом і прогрес оновлювався автоматично.', 'Войди в аккаунт, чтобы ученики присоединялись по коду и прогресс обновлялся автоматически.', 'Sign in so students can join by code and progress updates automatically.')} <a href="#/login">${T('Увійти', 'Войти', 'Sign in')}</a></div>` : ''}
      <div class="card" data-reveal>
        <div class="card-label">${C.icon('plus', 16)} ${T('Новий клас', 'Новый класс', 'New class')}</div>
        <div class="tc-new"><label class="field"><input id="clsName" maxlength="40" placeholder="${T('Наприклад: 7-Б, гурток Python', 'Например: 7-Б, кружок Python', 'e.g. Grade 7B, Python club')}"></label>
        <button class="btn primary" id="clsAdd">${C.icon('plus', 16)} ${T('Створити', 'Создать', 'Create')}</button></div>
      </div>
      <div class="tc-grid">${list.length ? list.map((c, i) => {
        const n = Object.keys(c.students || {}).length;
        return `<a class="card tc-class" href="#/teacher/${c.id}" data-reveal="${i * 60}">
          <div class="tc-class-ic">${C.icon('users', 26)}</div>
          <div><b>${esc(c.name)}</b><small>${T('Код', 'Код', 'Code')}: <code>${c.code}</code> · ${c.assignments.length} ${T('завдань', 'заданий', 'assignments')}${c.cloud ? '' : ` · ${n} ${T('учнів', 'учеников', 'students')}`}</small></div>
          <span class="tc-arrow">→</span></a>`;
      }).join('') : `<div class="empty" data-reveal>${C.mascot({ size: 90, mood: 'happy' })}<p>${T('Класів поки немає — створи перший.', 'Классов пока нет — создай первый.', 'No classes yet — create your first one.')}</p></div>`}</div>
    </div>${C.footer()}`;
    fx.reveal(C.app);
    document.getElementById('clsAdd').onclick = async () => {
      const name = document.getElementById('clsName').value.trim();
      if (!name) { document.getElementById('clsName').focus(); return; }
      const cls = { id: 'c' + Date.now().toString(36), code: genCode(), name, created: Date.now(), assignments: [], students: {}, cloud: cloudOn() };
      try { if (cls.cloud) await C.cloud.saveClass(cls); } catch (e) { fx.toast(esc(e.message || e), 'bad', 'info'); return; }
      S.teacher.classes.push(cls);
      C.save();
      fx.sound('ok');
      location.hash = '#/teacher/' + cls.id;
    };
    document.getElementById('clsName').onkeydown = (e) => { if (e.key === 'Enter') document.getElementById('clsAdd').click(); };
  };

  async function classPage(cls) {
    const inviteLink = location.origin + location.pathname + '#/join/' + b64e({ c: cls.code, n: cls.name, tn: S.profile.name || '', a: cls.assignments });
    C.app.innerHTML = `<div class="page">
      <a class="back" href="#/teacher">← ${T('Усі класи', 'Все классы', 'All classes')}</a>
      <div class="tc-head" data-reveal><h1 class="page-title">${esc(cls.name)}</h1>
        <div class="tc-code"><small>${T('Код класу', 'Код класса', 'Class code')}</small><b>${cls.code}</b></div></div>
      <div class="card" data-reveal>
        <div class="card-label">${C.icon('users', 16)} ${T('Запросити учнів', 'Пригласить учеников', 'Invite students')}</div>
        ${cls.cloud ? `<p>${T('Учні відкривають <b>Ще → Мій клас</b>, входять в акаунт і вводять код', 'Ученики открывают <b>Ещё → Мой класс</b>, входят в аккаунт и вводят код', 'Students open <b>More → My class</b>, sign in and enter the code')} <code class="big-code">${cls.code}</code></p>
          <button class="btn ghost sm" id="cpCode">${C.icon('copy', 15)} ${T('Копіювати код', 'Копировать код', 'Copy code')}</button>`
        : `<p>${T('Надішли учням це посилання. Після кожного уроку вони копіюють код-звіт на сторінці «Мій клас» і надсилають тобі.', 'Отправь ученикам эту ссылку. После уроков они копируют код-отчёт на странице «Мой класс» и присылают тебе.', 'Send this link to students. After studying they copy a report code from “My class” and send it to you.')}</p>
          <div class="tc-link"><input readonly value="${esc(inviteLink)}" id="invLink"><button class="btn primary sm" id="cpLink">${C.icon('copy', 15)} ${T('Копіювати', 'Копировать', 'Copy')}</button></div>
          <p class="muted small">${T('Додав нові завдання — надішли посилання ще раз, щоб учні їх побачили.', 'Добавил новые задания — отправь ссылку ещё раз, чтобы ученики их увидели.', 'Added assignments? Resend the link so students see them.')}</p>`}
      </div>
      <div class="card" data-reveal>
        <div class="card-label">${C.icon('target', 16)} ${T('Завдання', 'Задания', 'Assignments')}</div>
        <div id="asgList">${cls.assignments.length ? cls.assignments.map((a) => `<div class="asg-row"><div><b>${assignTitle(a)}</b>${a.due ? `<small>${T('до', 'до', 'due')} ${fmtDate(a.due)}</small>` : ''}</div><button class="icon-btn" data-del="${a.id}" title="${T('Видалити', 'Удалить', 'Delete')}">${C.icon('trash', 17)}</button></div>`).join('')
          : `<p class="muted">${T('Ще немає завдань. Додай перше нижче.', 'Ещё нет заданий. Добавь первое ниже.', 'No assignments yet. Add one below.')}</p>`}</div>
        <div class="asg-form">
          <label class="field"><span>${T('Курс', 'Курс', 'Course')}</span><select id="aCourse">${C.courses.filter((c) => c.steps.length).map((c) => `<option value="${c.id}">${esc(c.name)} (${c.steps.length})</option>`).join('')}</select></label>
          <label class="field"><span>${T('З кроку', 'С шага', 'From step')}</span><input id="aFrom" type="number" min="1" value="1"></label>
          <label class="field"><span>${T('По крок', 'По шаг', 'To step')}</span><input id="aTo" type="number" min="1" value="5"></label>
          <label class="field"><span>${T('Термін', 'Срок', 'Due')}</span><input id="aDue" type="date"></label>
          <button class="btn primary" id="aAdd">${C.icon('plus', 16)} ${T('Додати', 'Добавить', 'Add')}</button>
        </div>
      </div>
      <div class="card" data-reveal>
        <div class="card-head"><div class="card-label">${C.icon('trophy', 16)} ${T('Прогрес учнів', 'Прогресс учеников', 'Student progress')}</div>
          <div class="row-gap"><button class="btn ghost sm" id="csvBtn">${C.icon('download', 15)} CSV</button>${cls.cloud ? `<button class="btn ghost sm" id="refBtn">${C.icon('reset', 15)} ${T('Оновити', 'Обновить', 'Refresh')}</button>` : ''}</div></div>
        <div id="board"><div class="empty">${T('Завантаження…', 'Загрузка…', 'Loading…')}</div></div>
        ${cls.cloud ? '' : `<div class="tc-import"><label class="field"><span>${T('Встав коди-звіти учнів (можна кілька одразу)', 'Вставь коды-отчёты учеников (можно несколько сразу)', 'Paste students’ report codes (several at once is fine)')}</span><textarea id="repIn" rows="3" placeholder="CODRY-…"></textarea></label>
          <button class="btn primary" id="repAdd">${C.icon('check', 16)} ${T('Додати звіти', 'Добавить отчёты', 'Add reports')}</button></div>`}
      </div>
      <button class="btn danger ghost" id="clsDel">${C.icon('trash', 16)} ${T('Видалити клас', 'Удалить класс', 'Delete class')}</button>
    </div>${C.footer()}`;
    fx.reveal(C.app);

    const saveCls = async () => { C.save(); if (cls.cloud && cloudOn()) { try { await C.cloud.saveClass(cls); } catch (e) { fx.toast(esc(e.message || e), 'bad', 'info'); } } };
    const aCourse = document.getElementById('aCourse'), aFrom = document.getElementById('aFrom'), aTo = document.getElementById('aTo');
    const syncMax = () => { const n = C.courseById(aCourse.value).steps.length; aFrom.max = aTo.max = n; if (+aTo.value > n) aTo.value = n; };
    aCourse.onchange = syncMax;
    syncMax();
    document.getElementById('aAdd').onclick = async () => {
      const n = C.courseById(aCourse.value).steps.length;
      const from = Math.max(1, Math.min(n, +aFrom.value || 1)), to = Math.max(from, Math.min(n, +aTo.value || from));
      cls.assignments.push({ id: 'a' + Date.now().toString(36), course: aCourse.value, from, to, due: document.getElementById('aDue').value || '' });
      await saveCls();
      fx.sound('ok');
      classPage(cls);
    };
    document.querySelectorAll('[data-del]').forEach((b) => b.onclick = async () => {
      cls.assignments = cls.assignments.filter((a) => a.id !== b.dataset.del);
      await saveCls();
      classPage(cls);
    });
    const cpLink = document.getElementById('cpLink');
    if (cpLink) cpLink.onclick = () => copy(inviteLink);
    const cpCode = document.getElementById('cpCode');
    if (cpCode) cpCode.onclick = () => copy(cls.code);
    document.getElementById('clsDel').onclick = async () => {
      if (!confirm(T('Видалити клас «', 'Удалить класс «', 'Delete class “') + cls.name + T('»? Це не можна скасувати.', '»? Это нельзя отменить.', '”? This can’t be undone.'))) return;
      if (cls.cloud && cloudOn()) { try { await C.cloud.deleteClass(cls.code); } catch (e) { /* локально все одно видаляємо */ } }
      S.teacher.classes = S.teacher.classes.filter((x) => x !== cls);
      C.save();
      location.hash = '#/teacher';
    };
    const repAdd = document.getElementById('repAdd');
    if (repAdd) repAdd.onclick = () => {
      const codes = document.getElementById('repIn').value.split(/\s+/).filter((x) => x.startsWith(REPORT_PREFIX));
      let ok = 0, wrong = 0;
      cls.students = cls.students || {};
      for (const code of codes) {
        try {
          const r = b64d(code.slice(REPORT_PREFIX.length));
          if (r.k !== cls.code) { wrong++; continue; }
          const key = String(r.n || '?').toLowerCase();
          if (!cls.students[key] || cls.students[key].t <= r.t) cls.students[key] = r;
          ok++;
        } catch (e) { wrong++; }
      }
      C.save();
      fx.toast(T(`Додано звітів: ${ok}`, `Добавлено отчётов: ${ok}`, `Reports added: ${ok}`) + (wrong ? T(` · не підійшли: ${wrong}`, ` · не подошли: ${wrong}`, ` · rejected: ${wrong}`) : ''), ok ? 'ok' : 'bad', 'check');
      if (ok) classPage(cls);
    };

    // Рядки таблиці: однаковий формат для хмари й кодів-звітів.
    let rows = [];
    const loadRows = async () => {
      if (cls.cloud) {
        if (!cloudOn()) { rows = null; return; }
        const members = await C.cloud.classMembers(cls.code);
        rows = members.map((m) => {
          const p = {};
          cls.assignments.forEach((a) => { p[a.course] = p[a.course] || doneIdx(m.progress, a.course); });
          return { name: m.name, xp: m.xp, streak: streakOf(m.days, m.frozen), p, when: m.days.slice().sort().pop() || '' };
        });
      } else {
        rows = Object.values(cls.students || {}).map((r) => ({ name: r.n, xp: r.xp || 0, streak: r.s || 0, p: r.p || {}, when: r.t ? C.dateKey(new Date(r.t)) : '' }));
      }
      rows.sort((a, b) => a.name.localeCompare(b.name));
    };
    const renderBoard = () => {
      const box = document.getElementById('board');
      if (!box) return;
      if (rows === null) { box.innerHTML = `<div class="empty">${T('Увійди в акаунт, щоб побачити учнів цього класу.', 'Войди в аккаунт, чтобы увидеть учеников этого класса.', 'Sign in to see this class’s students.')}</div>`; return; }
      if (!rows.length) { box.innerHTML = `<div class="empty">${C.mascot({ size: 80, mood: 'think' })}<p>${cls.cloud ? T('Ще ніхто не приєднався. Поділися кодом класу.', 'Ещё никто не присоединился. Поделись кодом класса.', 'Nobody has joined yet. Share the class code.') : T('Ще немає звітів. Учні копіюють їх на сторінці «Мій клас».', 'Ещё нет отчётов. Ученики копируют их на странице «Мой класс».', 'No reports yet. Students copy them from “My class”.')}</p></div>`; return; }
      const head = cls.assignments.map((a, i) => `<th title="${assignTitle(a)}">${i + 1}. ${esc(courseName(a.course))}<small>${a.from}–${a.to}${a.due ? ' · ' + fmtDate(a.due) : ''}</small></th>`).join('');
      box.innerHTML = `<div class="tc-table-wrap"><table class="tc-table"><thead><tr><th>${T('Учень', 'Ученик', 'Student')}</th>${head}<th>XP</th><th>🔥</th><th>${T('Активність', 'Активность', 'Last active')}</th></tr></thead><tbody>
        ${rows.map((r) => `<tr><td><b>${esc(r.name)}</b></td>${cls.assignments.map((a) => {
          const st = assignStats(a, r.p[a.course]);
          const pct = Math.round((st.done / st.total) * 100);
          const late = a.due && daysLeft(a.due) < 0 && pct < 100;
          return `<td><span class="tc-cell ${pctColor(pct)} ${late ? 'late' : ''}">${st.done}/${st.total}</span></td>`;
        }).join('')}<td>${r.xp}</td><td>${r.streak}</td><td class="muted">${r.when ? fmtDate(r.when) : '—'}</td></tr>`).join('')}
      </tbody></table></div>
      <p class="muted small">${T('Червоне — термін минув, а завдання не виконано.', 'Красное — срок прошёл, а задание не выполнено.', 'Red — past due and not finished.')}</p>`;
    };
    const refresh = async () => {
      try { await loadRows(); } catch (e) { rows = []; fx.toast(esc(e.message || e), 'bad', 'info'); }
      renderBoard();
    };
    const ref = document.getElementById('refBtn');
    if (ref) ref.onclick = refresh;
    document.getElementById('csvBtn').onclick = () => {
      const q = (s) => '"' + String(s).replace(/"/g, '""') + '"';
      const head = [T('Учень', 'Ученик', 'Student'), ...cls.assignments.map((a, i) => `${i + 1}. ${courseName(a.course)} ${a.from}-${a.to}`), 'XP', T('Серія', 'Серия', 'Streak')];
      const lines = [head.map(q).join(',')].concat((rows || []).map((r) => [r.name, ...cls.assignments.map((a) => { const st = assignStats(a, r.p[a.course]); return `${st.done}/${st.total}`; }), r.xp, r.streak].map(q).join(',')));
      download(`codry-${cls.name.replace(/[^\wЀ-ӿ-]+/g, '_')}.csv`, lines.join('\r\n'));
    };
    await refresh();
  }

  // ================= Мій клас (учень) =================
  C.pages.class = async () => {
    const mine = S.myClasses;
    if (cloudOn()) {
      // Підтягуємо свіжі завдання від учителя.
      await Promise.all(mine.filter((m) => m.cloud).map(async (m) => {
        try { const c = await C.cloud.getClass(m.code); if (c) { m.name = c.name; m.teacherName = c.teacherName; m.assignments = c.assignments || []; } } catch (e) { /* офлайн */ }
      }));
      C.save();
    }
    C.app.innerHTML = `<div class="page">
      <div class="tc-hero" data-reveal>
        <div>${C.mascot({ size: 110, mood: 'happy', anim: 'float' })}</div>
        <div><h1 class="page-title">${C.icon('users', 30)} ${T('Мій клас', 'Мой класс', 'My class')}</h1>
        <p class="section-sub left">${T('Тут завдання від твого вчителя та твій прогрес у них.', 'Здесь задания от твоего учителя и твой прогресс в них.', 'Your teacher’s assignments and your progress on them.')}</p></div>
      </div>
      <div class="card" data-reveal>
        <div class="card-label">${C.icon('key', 16)} ${T('Приєднатися до класу', 'Присоединиться к классу', 'Join a class')}</div>
        ${C.cloud.enabled ? (cloudOn() ? `<div class="tc-new"><label class="field"><input id="joinCode" maxlength="6" placeholder="${T('Код класу, напр. K7QX2M', 'Код класса, напр. K7QX2M', 'Class code, e.g. K7QX2M')}" style="text-transform:uppercase"></label><button class="btn primary" id="joinBtn">${T('Приєднатися', 'Присоединиться', 'Join')}</button></div>`
          : `<p>${T('Щоб приєднатися за кодом, спершу', 'Чтобы присоединиться по коду, сначала', 'To join with a code, first')} <a href="#/login">${T('увійди в акаунт', 'войди в аккаунт', 'sign in')}</a>.</p>`)
          : `<p>${T('Відкрий посилання-запрошення, яке надіслав учитель, — клас з’явиться тут автоматично.', 'Открой ссылку-приглашение, которую прислал учитель, — класс появится здесь автоматически.', 'Open the invite link from your teacher — the class will appear here automatically.')}</p>`}
      </div>
      ${mine.length ? mine.map((m, mi) => `<div class="card" data-reveal="${mi * 60}">
        <div class="card-head"><div><h2 class="tc-cname">${esc(m.name)}</h2>${m.teacherName ? `<small class="muted">${T('Учитель', 'Учитель', 'Teacher')}: ${esc(m.teacherName)}</small>` : ''}</div>
          <div class="row-gap">${m.cloud ? '' : `<button class="btn primary sm" data-report="${mi}">${C.icon('copy', 15)} ${T('Звіт для вчителя', 'Отчёт для учителя', 'Report for teacher')}</button>`}<button class="icon-btn" data-leave="${mi}" title="${T('Вийти з класу', 'Выйти из класса', 'Leave class')}">${C.icon('logout', 17)}</button></div></div>
        ${(m.assignments || []).length ? m.assignments.map((a) => {
          const c = C.courseById(a.course);
          if (!c) return '';
          const st = assignStats(a, doneIdx(S.progress, a.course));
          const pct = Math.round((st.done / st.total) * 100);
          const left = daysLeft(a.due);
          let next = a.from - 1;
          while (next < a.to - 1 && G.isDone(c.id, c.steps[next].id)) next++;
          const target = G.isUnlocked(c, next) ? next : G.firstOpenIndex(c);
          const status = pct >= 100 ? `<span class="tag ok">✓ ${T('Виконано', 'Выполнено', 'Done')}</span>`
            : left == null ? '' : left < 0 ? `<span class="tag late">${T('Термін минув', 'Срок прошёл', 'Overdue')}</span>`
            : `<span class="tag">${left === 0 ? T('Сьогодні', 'Сегодня', 'Today') : T(`Ще ${left} дн.`, `Ещё ${left} дн.`, `${left} days left`)}</span>`;
          return `<div class="asg-student"><div class="asg-top"><b>${assignTitle(a)}</b>${status}</div>
            <div class="asg-bar"><div class="bar"><i style="width:${pct}%;--c1:${c.color};--c2:${c.color2}"></i></div><small>${st.done}/${st.total}</small>
            ${pct < 100 ? `<a class="btn ghost sm" href="#/learn/${c.id}/${target + 1}">${C.icon('play', 14)} ${T('Продовжити', 'Продолжить', 'Continue')}</a>` : ''}</div></div>`;
        }).join('') : `<p class="muted">${T('Учитель ще не додав завдань.', 'Учитель ещё не добавил заданий.', 'No assignments yet.')}</p>`}
      </div>`).join('') : ''}
    </div>${C.footer()}`;
    fx.reveal(C.app);

    const jb = document.getElementById('joinBtn');
    if (jb) jb.onclick = async () => {
      const code = document.getElementById('joinCode').value.trim().toUpperCase();
      if (!/^[A-Z0-9]{6}$/.test(code)) { fx.toast(T('Код має 6 символів', 'Код состоит из 6 символов', 'The code has 6 characters'), 'bad', 'info'); return; }
      if (S.myClasses.some((m) => m.code === code)) { fx.toast(T('Ти вже в цьому класі', 'Ты уже в этом классе', 'You’re already in this class'), 'ok', 'users'); return; }
      try {
        const c = await C.cloud.getClass(code);
        if (!c) { fx.toast(T('Клас не знайдено', 'Класс не найден', 'Class not found'), 'bad', 'info'); return; }
        const name = askName();
        if (!name) return;
        await C.cloud.joinClass(code, name);
        S.myClasses.push({ code, name: c.name, teacherName: c.teacherName || '', assignments: c.assignments || [], cloud: true });
        C.save();
        fx.sound('ok');
        fx.confetti(60);
        C.pages.class();
      } catch (e) { fx.toast(esc(e.message || e), 'bad', 'info'); }
    };
    document.querySelectorAll('[data-leave]').forEach((b) => b.onclick = async () => {
      const m = S.myClasses[+b.dataset.leave];
      if (!confirm(T('Вийти з класу «', 'Выйти из класса «', 'Leave “') + m.name + '»?')) return;
      if (m.cloud && cloudOn()) { try { await C.cloud.leaveClass(m.code); } catch (e) { /* */ } }
      S.myClasses.splice(+b.dataset.leave, 1);
      C.save();
      C.pages.class();
    });
    document.querySelectorAll('[data-report]').forEach((b) => b.onclick = () => {
      const m = S.myClasses[+b.dataset.report];
      const name = askName();
      if (!name) return;
      const p = {};
      (m.assignments || []).forEach((a) => { p[a.course] = doneIdx(S.progress, a.course); });
      const code = REPORT_PREFIX + b64e({ v: 1, k: m.code, n: name, t: Date.now(), xp: S.xp, s: G.streak(), p });
      fx.modal(`<div class="center-col"><h2>${T('Код-звіт для вчителя', 'Код-отчёт для учителя', 'Report code for your teacher')}</h2>
        <p class="muted">${T('Скопіюй і надішли вчителю (у месенджер чи пошту). Він вставить код у свою таблицю.', 'Скопируй и отправь учителю (в мессенджер или почту). Он вставит код в свою таблицу.', 'Copy it and send it to your teacher (chat or email). They’ll paste it into their table.')}</p>
        <textarea class="report-code" readonly rows="4">${code}</textarea>
        <button class="btn primary" id="cpRep">${C.icon('copy', 16)} ${T('Копіювати', 'Копировать', 'Copy')}</button></div>`, (mm) => {
        const ta = mm.querySelector('textarea');
        ta.onfocus = () => ta.select();
        mm.querySelector('#cpRep').onclick = () => copy(code);
      }, 'small');
    });
  };

  // ================= Запрошення посиланням (локальний режим) =================
  C.pages.join = (payload) => {
    let inv;
    try { inv = b64d(payload); } catch (e) { inv = null; }
    if (!inv || !/^[A-Z0-9]{6}$/.test(inv.c || '')) {
      C.app.innerHTML = `<div class="page center">${C.mascot({ size: 120, mood: 'confused' })}<h1>${T('Посилання пошкоджене', 'Ссылка повреждена', 'Broken link')}</h1><p>${T('Попроси вчителя надіслати його ще раз.', 'Попроси учителя прислать её ещё раз.', 'Ask your teacher to send it again.')}</p><a class="btn primary" href="#/">← Codry</a></div>`;
      return;
    }
    const assignments = (inv.a || []).filter((a) => C.courseById(a.course)).map((a) => ({ id: a.id, course: a.course, from: +a.from, to: +a.to, due: a.due || '' }));
    const ex = S.myClasses.find((m) => m.code === inv.c);
    if (ex) { ex.name = inv.n || ex.name; ex.teacherName = inv.tn || ex.teacherName; ex.assignments = assignments; }
    else S.myClasses.push({ code: inv.c, name: String(inv.n || 'Class').slice(0, 40), teacherName: String(inv.tn || '').slice(0, 40), assignments, cloud: false });
    C.save();
    fx.toast(ex ? T('Завдання класу оновлено', 'Задания класса обновлены', 'Class assignments updated') : T('Ти приєднався до класу!', 'Ты присоединился к классу!', 'You joined the class!'), 'ok', 'users');
    if (!ex) fx.confetti(60);
    location.replace('#/class');
  };
})();
