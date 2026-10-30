// Вхід, реєстрація з підтвердженням адміністратором, сторінка стану заявки та адмін-панель.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;
  const T = (uk, ru, en) => tr({ uk, ru, en });

  const ERRORS = {
    'auth/email-already-in-use': ['Ця пошта вже зареєстрована — спробуй увійти.', 'Эта почта уже зарегистрирована — попробуй войти.', 'This email is already registered — try signing in.'],
    'auth/invalid-email': ['Перевір адресу пошти.', 'Проверь адрес почты.', 'Check the email address.'],
    'auth/weak-password': ['Пароль має бути не коротшим за 6 символів.', 'Пароль должен быть не короче 6 символов.', 'The password needs at least 6 characters.'],
    'auth/wrong-password': ['Неправильний пароль.', 'Неверный пароль.', 'Wrong password.'],
    'auth/invalid-credential': ['Неправильна пошта або пароль.', 'Неверная почта или пароль.', 'Wrong email or password.'],
    'auth/user-not-found': ['Такого акаунта немає — зареєструйся.', 'Такого аккаунта нет — зарегистрируйся.', 'No such account — register first.'],
    'auth/too-many-requests': ['Забагато спроб. Спробуй трохи пізніше.', 'Слишком много попыток. Попробуй чуть позже.', 'Too many attempts. Try again later.'],
    'auth/popup-closed-by-user': ['Вікно входу закрито.', 'Окно входа закрыто.', 'The sign-in window was closed.']
  };
  const errText = (e) => { const m = ERRORS[e && e.code]; return m ? tr({ uk: m[0], ru: m[1], en: m[2] }) : esc((e && e.message) || e); };
  const fail = (e) => fx.toast(errText(e), 'bad', 'info');

  // ================= Вхід / Реєстрація =================
  C.pages.login = (tab) => {
    const on = C.cloud.enabled;
    if (on && C.cloud.user) { location.replace('#/account'); return; }
    tab = tab === 'register' ? 'register' : 'login';
    C.app.innerHTML = `<div class="page narrow center-col">
      <div class="login-card" data-reveal>
        ${C.mascot({ size: 110, mood: tab === 'register' ? 'excited' : 'wink', anim: 'float' })}
        <h1>${tab === 'register' ? T('Реєстрація', 'Регистрация', 'Sign up') : t('login_title')}</h1>
        ${on ? `
          <div class="seg auth-seg"><a href="#/login" class="${tab === 'login' ? 'active' : ''}">${T('Вхід', 'Вход', 'Sign in')}</a><a href="#/login/register" class="${tab === 'register' ? 'active' : ''}">${T('Реєстрація', 'Регистрация', 'Sign up')}</a></div>
          ${tab === 'register' ? `<div class="notice">${C.icon('info', 18)} ${T('Зараз кількість місць обмежена: після реєстрації заявку перевіряє адміністратор. Поки чекаєш — усі уроки доступні, прогрес зберігається.', 'Сейчас количество мест ограничено: после регистрации заявку проверяет администратор. Пока ждёшь — все уроки доступны, прогресс сохраняется.', 'Spots are limited for now: an admin reviews every sign-up. While you wait, all lessons work and your progress is saved.')}</div>
            <label class="field"><span>${T('Як тебе звати', 'Как тебя зовут', 'Your name')}</span><input id="rName" maxlength="30" autocomplete="nickname" value="${esc(S.profile.name || '')}"></label>` : `<p class="muted">${t('login_sub')}</p>`}
          <button class="btn google big block" id="gBtn">${C.icon('google', 20)} ${tab === 'register' ? T('Зареєструватися через Google', 'Зарегистрироваться через Google', 'Sign up with Google') : t('login_google')}</button>
          <div class="or"><span>${t('login_or')}</span></div>
          <label class="field"><input id="lEmail" type="email" autocomplete="email" placeholder="${t('login_email')}"></label>
          <label class="field"><input id="lPass" type="password" autocomplete="${tab === 'register' ? 'new-password' : 'current-password'}" placeholder="${t('login_password')}" minlength="6"></label>
          ${tab === 'register' ? `<label class="check"><input type="checkbox" id="rAgree"> <span>${T('Мені є 13 років, або батьки дозволили мені зареєструватися.', 'Мне есть 13 лет, или родители разрешили мне зарегистрироваться.', 'I am 13 or older, or my parents allowed me to sign up.')}</span></label>
            <button class="btn primary big block" id="rBtn">${T('Надіслати заявку', 'Отправить заявку', 'Send request')}</button>`
            : `<button class="btn primary big block" id="lIn">${t('login_btn')}</button>`}
        ` : `<div class="notice">${C.icon('info', 18)} ${t('login_off')}</div>`}
        <a class="btn ghost block" href="#/courses">${t('login_local')}</a>
      </div>
    </div>`;
    fx.reveal(C.app);
    if (!on) return;
    const go = () => { location.hash = '#/account'; };
    const ep = () => [document.getElementById('lEmail').value.trim(), document.getElementById('lPass').value];
    const agreed = () => {
      if (tab !== 'register') return true;
      const name = document.getElementById('rName').value.trim();
      if (!name) { fx.toast(T('Вкажи ім’я', 'Укажи имя', 'Enter your name'), 'bad', 'info'); document.getElementById('rName').focus(); return false; }
      if (!document.getElementById('rAgree').checked) { fx.toast(T('Постав позначку про вік або дозвіл батьків', 'Поставь отметку о возрасте или разрешении родителей', 'Tick the age / parental permission box'), 'bad', 'info'); return false; }
      S.profile.name = name; C.save();
      return true;
    };
    document.getElementById('gBtn').onclick = () => { if (agreed()) C.cloud.signInGoogle().then(go, fail); };
    const lIn = document.getElementById('lIn');
    if (lIn) lIn.onclick = () => C.cloud.signInEmail(...ep()).then(go, fail);
    const rBtn = document.getElementById('rBtn');
    if (rBtn) rBtn.onclick = () => { if (agreed()) C.cloud.register(...ep()).then(go, fail); };
  };

  // ================= Стан акаунта / заявки =================
  C.pages.account = () => {
    const cl = C.cloud;
    if (!cl.enabled) { location.replace('#/login'); return; }
    // Одразу після входу Firebase ще кілька мить готує користувача — чекаємо, а не викидаємо на вхід.
    if (!cl.user) setTimeout(() => { if (!C.cloud.user && (location.hash || '').startsWith('#/account')) location.replace('#/login'); }, 4000);
    const st = cl.user ? cl.status : null;
    if (st === 'approved') { location.replace('#/profile'); return; }
    const uid = cl.user ? cl.user.uid : '';
    const view = {
      pending: ['think', T('Заявку надіслано!', 'Заявка отправлена!', 'Request sent!'), T('Адміністратор перевірить її найближчим часом. Щойно заявку підтвердять, рейтинг, форум, галерея й синхронізація ввімкнуться самі — сторінку оновлювати не треба. А поки вчись: увесь прогрес збережеться.', 'Администратор проверит её в ближайшее время. Как только заявку подтвердят, рейтинг, форум, галерея и синхронизация включатся сами — страницу обновлять не нужно. А пока учись: весь прогресс сохранится.', 'An admin will review it soon. Once approved, the leaderboard, forum, gallery and sync switch on by themselves — no reload needed. Keep learning meanwhile: all progress is saved.')],
      rejected: ['sad', T('Заявку не підтверджено', 'Заявка не подтверждена', 'Request not approved'), T('Зараз ми не можемо прийняти нових учасників. Уроки, ігри й задачі все одно доступні без акаунта.', 'Сейчас мы не можем принять новых участников. Уроки, игры и задачи всё равно доступны без аккаунта.', 'We can’t accept new members right now. Lessons, games and problems still work without an account.')],
      closed: ['sleepy', T('Реєстрацію тимчасово закрито', 'Регистрация временно закрыта', 'Sign-ups are paused'), T('Набір нових учасників зараз на паузі. Спробуй пізніше — а поки все навчання працює без акаунта.', 'Набор новых участников сейчас на паузе. Попробуй позже — а пока всё обучение работает без аккаунта.', 'New sign-ups are paused. Try again later — all learning works without an account meanwhile.')],
      error: ['oops', T('Не вдалося перевірити акаунт', 'Не удалось проверить аккаунт', 'Couldn’t check your account'), T('Перевір інтернет і спробуй ще раз.', 'Проверь интернет и попробуй ещё раз.', 'Check your connection and try again.')]
    }[st] || ['think', T('Перевіряємо акаунт…', 'Проверяем аккаунт…', 'Checking your account…'), ''];
    C.app.innerHTML = `<div class="page narrow center-col">
      <div class="login-card pending-card" data-reveal>
        <div class="${st === 'pending' ? 'wait-anim' : ''}">${C.mascot({ size: 130, mood: view[0], anim: 'float' })}</div>
        <h1>${view[1]}</h1>
        <p>${view[2]}</p>
        ${st === 'pending' ? `<div class="pending-dots"><i></i><i></i><i></i></div>` : ''}
        <div class="row-center"><a class="btn primary" href="#/courses">${C.icon('book', 16)} ${T('До уроків', 'К урокам', 'To lessons')}</a>
          ${st === 'closed' || st === 'error' ? `<button class="btn ghost" id="retry">${C.icon('reset', 16)} ${T('Спробувати знову', 'Попробовать снова', 'Try again')}</button>` : ''}
          <button class="btn ghost" id="out">${C.icon('logout', 16)} ${t('nav_logout')}</button></div>
        ${uid ? `<details class="uid-box"><summary>${T('Я власник сайту', 'Я владелец сайта', 'I own this site')}</summary>
          <p class="muted small">${T('Щоб стати адміністратором, впиши цей UID у <code>js/firebase-config.js</code> (CODRY_ADMINS) і в правила Firestore.', 'Чтобы стать администратором, впиши этот UID в <code>js/firebase-config.js</code> (CODRY_ADMINS) и в правила Firestore.', 'To become an admin, add this UID to <code>js/firebase-config.js</code> (CODRY_ADMINS) and to the Firestore rules.')}</p>
          <div class="tc-link"><input readonly value="${esc(uid)}" id="uidIn"><button class="btn ghost sm" id="uidCp">${C.icon('copy', 15)}</button></div></details>` : ''}
      </div>
    </div>`;
    fx.reveal(C.app);
    document.getElementById('out').onclick = () => cl.signOut().then(() => { location.hash = '#/'; });
    const rt = document.getElementById('retry');
    if (rt) rt.onclick = () => cl.retryAccount().then(() => C.pages.account(), fail);
    const cp = document.getElementById('uidCp');
    if (cp) cp.onclick = async () => { try { await navigator.clipboard.writeText(uid); fx.toast(T('UID скопійовано', 'UID скопирован', 'UID copied'), 'ok', 'copy'); } catch (e) { document.getElementById('uidIn').select(); } };
  };
  // Поки відкрита сторінка стану — оновлюємо її, коли заявку розглянуть.
  C.on('auth', () => { if ((location.hash || '').startsWith('#/account')) C.pages.account(); });
  C.on('approved', () => {
    fx.sound('level');
    fx.confetti(160);
    fx.toast(T('Заявку підтверджено! Ласкаво просимо до Codry 🎉', 'Заявка подтверждена! Добро пожаловать в Codry 🎉', 'You’re approved! Welcome to Codry 🎉'), 'ok', 'check');
    if ((location.hash || '').startsWith('#/account')) location.hash = '#/profile';
  });

  // ================= Адмін-панель =================
  C.pages.admin = async (filter) => {
    const cl = C.cloud;
    if (!cl.enabled) { C.app.innerHTML = `<div class="page center"><h1>${T('Хмару не підключено', 'Облако не подключено', 'Cloud not connected')}</h1><p class="muted">${T('Спершу підключи Firebase (див. README).', 'Сначала подключи Firebase (см. README).', 'Connect Firebase first (see README).')}</p></div>`; return; }
    if (!cl.isAdmin()) { C.app.innerHTML = `<div class="page center">${C.mascot({ size: 120, mood: 'confused' })}<h1>${T('Лише для адміністратора', 'Только для администратора', 'Admins only')}</h1><a class="btn primary" href="#/">← Codry</a></div>`; return; }
    filter = filter || 'pending';
    C.app.innerHTML = `<div class="page"><div class="tc-hero" data-reveal><div>${C.mascot({ size: 100, mood: 'cool' })}</div>
      <div><h1 class="page-title">${C.icon('shield', 30)} ${T('Адмін: заявки', 'Админ: заявки', 'Admin: sign-ups')}</h1><div class="row-gap" id="regToggle"></div></div></div>
      <div class="chips" id="adFilters"></div>
      <div id="adList"><div class="empty">${T('Завантаження…', 'Загрузка…', 'Loading…')}</div></div></div>`;
    fx.reveal(C.app);
    let list = [], conf = { registrationOpen: true };
    try { [list, conf] = await Promise.all([cl.listAccounts(), cl.getSiteConfig()]); }
    catch (e) { document.getElementById('adList').innerHTML = `<div class="empty">${esc(e.message || e)}</div>`; return; }
    const count = (s) => list.filter((a) => a.status === s).length;
    document.getElementById('regToggle').innerHTML = `<span class="pill">${conf.registrationOpen !== false ? T('Реєстрація відкрита', 'Регистрация открыта', 'Sign-ups open') : T('Реєстрацію закрито', 'Регистрация закрыта', 'Sign-ups closed')}</span>
      <button class="btn ghost sm" id="togReg">${conf.registrationOpen !== false ? T('Закрити реєстрацію', 'Закрыть регистрацию', 'Close sign-ups') : T('Відкрити реєстрацію', 'Открыть регистрацию', 'Open sign-ups')}</button>
      <span class="muted">${T('Підтверджено', 'Подтверждено', 'Approved')}: <b>${count('approved')}</b></span>`;
    document.getElementById('togReg').onclick = async () => { await cl.setRegistrationOpen(conf.registrationOpen === false); C.pages.admin(filter); };
    document.getElementById('adFilters').innerHTML = [['pending', T('Очікують', 'Ожидают', 'Pending')], ['approved', T('Підтверджені', 'Подтверждённые', 'Approved')], ['rejected', T('Відхилені', 'Отклонённые', 'Rejected')]]
      .map(([k, n]) => `<a href="#/admin/${k}" class="${k === filter ? 'active' : ''}">${n} (${count(k)})</a>`).join('');
    const rows = list.filter((a) => a.status === filter);
    const box = document.getElementById('adList');
    box.innerHTML = rows.length ? `<div class="card"><div class="tc-table-wrap"><table class="tc-table admin-table"><thead><tr><th>${T('Ім’я', 'Имя', 'Name')}</th><th>Email</th><th>${T('Коли', 'Когда', 'When')}</th><th></th></tr></thead><tbody>
      ${rows.map((a) => `<tr><td><b>${esc(a.name || '—')}</b></td><td class="muted">${esc(a.email || '—')}</td><td class="muted">${new Date(a.at).toLocaleString()}</td>
        <td class="ad-actions">${a.status !== 'approved' ? `<button class="btn primary sm" data-ok="${a.uid}">${C.icon('check', 14)} ${T('Підтвердити', 'Подтвердить', 'Approve')}</button>` : ''}${a.status !== 'rejected' && !(window.CODRY_ADMINS || []).includes(a.uid) ? `<button class="btn ghost sm" data-no="${a.uid}">✕ ${T('Відхилити', 'Отклонить', 'Reject')}</button>` : ''}</td></tr>`).join('')}
      </tbody></table></div></div>` : `<div class="empty">${C.mascot({ size: 80, mood: 'happy' })}<p>${filter === 'pending' ? T('Нових заявок немає.', 'Новых заявок нет.', 'No new requests.') : T('Порожньо.', 'Пусто.', 'Empty.')}</p></div>`;
    box.querySelectorAll('[data-ok]').forEach((b) => b.onclick = async () => { b.disabled = true; try { await cl.setAccountStatus(b.dataset.ok, 'approved'); fx.sound('ok'); C.pages.admin(filter); } catch (e) { fail(e); b.disabled = false; } });
    box.querySelectorAll('[data-no]').forEach((b) => b.onclick = async () => { b.disabled = true; try { await cl.setAccountStatus(b.dataset.no, 'rejected'); C.pages.admin(filter); } catch (e) { fail(e); b.disabled = false; } });
  };
})();
