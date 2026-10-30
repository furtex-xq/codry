// Галерея робіт: вибране від Codry, роботи спільноти (з Firebase) і мої роботи.
// Типи робіт: 'turtle' (малюнок черепашки — зберігається код) і 'html' (сторінка у пісочниці).
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;
  const T = (uk, ru, en) => tr({ uk, ru, en });

  const FEATURED = [
    { id: 'f1', type: 'turtle', title: L('Веселкова спіраль', 'Радужная спираль', 'Rainbow spiral'),
      code: "const colors = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7'];\nwidth(3);\nfor (let i = 0; i < 120; i++) {\n  color(colors[i % 6]);\n  forward(i * 1.4);\n  right(59);\n}" },
    { id: 'f2', type: 'turtle', title: L('Квітка з квадратів', 'Цветок из квадратов', 'Square flower'),
      code: "width(2);\nfor (let k = 0; k < 24; k++) {\n  color(k % 2 ? '#f472b6' : '#60a5fa');\n  for (let i = 0; i < 4; i++) {\n    forward(90);\n    right(90);\n  }\n  right(15);\n}" },
    { id: 'f3', type: 'turtle', title: L('Зоряний вибух', 'Звёздный взрыв', 'Star burst'),
      code: "width(2);\nfor (let i = 0; i < 36; i++) {\n  color(i % 3 === 0 ? '#facc15' : '#fde68a');\n  forward(170);\n  right(170);\n}" },
    { id: 'f4', type: 'html', title: L('Стрибучий м’ячик', 'Прыгающий мячик', 'Bouncing ball'),
      code: '<canvas id="c" width="300" height="200"></canvas>\n<style>body{margin:0;display:grid;place-items:center;height:100vh;background:#0b1226;overflow:hidden}canvas{width:100%;max-width:300px}</style>\n<script>\nconst c = document.getElementById("c"), g = c.getContext("2d");\nlet x = 40, y = 40, vx = 3, vy = 2;\nfunction loop() {\n  g.fillStyle = "rgba(11,18,38,.3)"; g.fillRect(0, 0, 300, 200);\n  x += vx; y += vy;\n  if (x < 15 || x > 285) vx = -vx;\n  if (y < 15 || y > 185) vy = -vy;\n  g.fillStyle = "hsl(" + (x + y) + ",90%,60%)";\n  g.beginPath(); g.arc(x, y, 15, 0, 7); g.fill();\n  requestAnimationFrame(loop);\n}\nloop();\n<\/script>' },
    { id: 'f5', type: 'html', title: L('Клікер-печиво', 'Кликер-печенье', 'Cookie clicker'),
      code: '<style>body{margin:0;height:100vh;display:grid;place-items:center;background:#1e1b4b;color:#fff;font-family:sans-serif;text-align:center}button{font-size:64px;background:none;border:0;cursor:pointer;transition:transform .1s}button:active{transform:scale(.85)}</style>\n<div><h2 id="n">0 🍪</h2><button id="b">🍪</button><p>Click!</p></div>\n<script>\nlet n = 0;\nb.onclick = () => { n++; document.getElementById("n").textContent = n + " 🍪"; };\n<\/script>' },
    { id: 'f6', type: 'html', title: L('Градієнтне небо', 'Градиентное небо', 'Gradient sky'),
      code: '<style>\nbody { margin: 0; height: 100vh; background: linear-gradient(#0f172a, #7c3aed 60%, #f97316); overflow: hidden; }\n.star { position: absolute; width: 3px; height: 3px; background: #fff; border-radius: 50%; animation: tw 2s infinite alternate; }\n@keyframes tw { to { opacity: .2; } }\n.moon { position: absolute; top: 30px; right: 40px; width: 60px; height: 60px; border-radius: 50%; box-shadow: -12px 8px 0 #fde68a; }\n</style>\n<div class="moon"></div>\n<script>\nfor (let i = 0; i < 60; i++) {\n  const s = document.createElement("div");\n  s.className = "star";\n  s.style.left = Math.random() * 100 + "%";\n  s.style.top = Math.random() * 60 + "%";\n  s.style.animationDelay = Math.random() * 2 + "s";\n  document.body.appendChild(s);\n}\n<\/script>' }
  ];
  function L(uk, ru, en) { return { uk, ru, en }; }
  const titleOf = (w) => (typeof w.title === 'object' ? tr(w.title) : w.title || '');

  // Мініатюра: малюнок черепашки на canvas або сторінка в ізольованому iframe.
  async function renderThumb(el, w) {
    if (w.type === 'turtle') {
      const r = await window.CodryArcade.play('turtle', w.code, {}, 3000);
      const cv = document.createElement('canvas');
      cv.width = 400; cv.height = 400;
      const g = cv.getContext('2d');
      g.fillStyle = '#0b1226'; g.fillRect(0, 0, 400, 400);
      g.lineCap = 'round';
      (r.segs || []).forEach(([x1, y1, x2, y2, col, wd]) => { g.strokeStyle = col; g.lineWidth = wd; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
      el.appendChild(cv);
    } else {
      const f = document.createElement('iframe');
      f.setAttribute('sandbox', 'allow-scripts');
      f.setAttribute('loading', 'lazy');
      f.title = titleOf(w);
      f.srcdoc = w.code;
      el.appendChild(f);
    }
  }

  // Публікація (виклик з пісочниці та з вільного малювання черепашкою)
  C.publishToGallery = (item) => {
    fx.modal(`<div class="center-col"><h2>${T('Опублікувати роботу', 'Опубликовать работу', 'Publish your work')}</h2>
      <label class="field"><span>${T('Назва', 'Название', 'Title')}</span><input id="gTitle" maxlength="40" placeholder="${T('Моя крута робота', 'Моя крутая работа', 'My cool project')}"></label>
      <p class="muted small">${C.cloud.galleryShared() ? T('Роботу побачать усі учні Codry. Не пиши в коді особисту інформацію.', 'Работу увидят все ученики Codry. Не пиши в коде личную информацию.', 'Every Codry student will see it. Don’t put personal info in the code.') : T('Збережеться в «Моїх роботах». Спільна галерея запрацює після підключення хмари.', 'Сохранится в «Моих работах». Общая галерея заработает после подключения облака.', 'Saved to “My works”. The shared gallery turns on once the cloud is connected.')}</p>
      <button class="btn primary" id="gPub">${C.icon('sparkle', 16)} ${T('Опублікувати', 'Опубликовать', 'Publish')}</button></div>`, (m) => {
      const inp = m.querySelector('#gTitle');
      inp.focus();
      m.querySelector('#gPub').onclick = async () => {
        const title = inp.value.trim() || T('Без назви', 'Без названия', 'Untitled');
        const w = { id: 'm' + Date.now().toString(36), type: item.type, code: String(item.code).slice(0, 20000), title, at: Date.now() };
        S.gallery = S.gallery || [];
        S.gallery.unshift(w);
        C.save();
        if (C.cloud.galleryShared()) { try { await C.cloud.addGallery({ type: w.type, code: w.code, title }); } catch (e) { fx.toast(esc(e.message || e), 'bad', 'info'); } }
        fx.closeModal();
        fx.sound('chest');
        fx.confetti(80);
        fx.toast(T('Опубліковано!', 'Опубликовано!', 'Published!'), 'ok', 'sparkle');
      };
    }, 'small');
  };

  // ================= Сторінка галереї =================
  C.pages.gallery = async (tab) => {
    tab = tab || C.LS.get('galTab', 'featured');
    C.LS.set('galTab', tab);
    const shared = C.cloud.galleryShared();
    C.app.innerHTML = `<div class="page">
      <div class="tc-hero" data-reveal><div>${C.mascot({ size: 110, mood: 'love', anim: 'float' })}</div>
        <div><h1 class="page-title">${C.icon('sparkle', 30)} ${T('Галерея', 'Галерея', 'Gallery')}</h1>
        <p class="section-sub left">${T('Малюнки й міні-проєкти учнів. Створи свій у Пісочниці (HTML) або в Іграх → Черепашка → вільне малювання.', 'Рисунки и мини-проекты учеников. Создай свой в Песочнице (HTML) или в Играх → Черепашка → свободное рисование.', 'Student drawings and mini projects. Make yours in the Playground (HTML) or Games → Turtle → free drawing.')}</p>
        <div class="row-gap"><a class="btn primary sm" href="#/playground/html">${C.icon('code', 15)} ${T('Пісочниця', 'Песочница', 'Playground')}</a><a class="btn ghost sm" href="#/arcade/turtle/0">✏️ ${T('Черепашка', 'Черепашка', 'Turtle')}</a></div></div></div>
      <div class="chips" data-reveal>${[['featured', T('Вибране', 'Избранное', 'Featured')], ['community', T('Спільнота', 'Сообщество', 'Community')], ['mine', T('Мої роботи', 'Мои работы', 'My works')]].map(([k, n]) => `<a href="#/gallery/${k}" class="${k === tab ? 'active' : ''}">${n}</a>`).join('')}</div>
      <div class="gal-grid" id="galGrid"><div class="empty">${T('Завантаження…', 'Загрузка…', 'Loading…')}</div></div>
    </div>${C.footer()}`;
    fx.reveal(C.app);
    let items = [];
    if (tab === 'featured') items = FEATURED.map((w) => Object.assign({ author: { name: 'Codry' } }, w));
    else if (tab === 'mine') items = (S.gallery || []).map((w) => Object.assign({ author: { name: S.profile.name || t('you') }, mine: true }, w));
    else if (shared) { try { items = await C.cloud.listGallery(); } catch (e) { items = []; fx.toast(esc(e.message || e), 'bad', 'info'); } }
    const grid = document.getElementById('galGrid');
    if (!grid) return;
    if (!items.length) {
      grid.innerHTML = `<div class="empty">${C.mascot({ size: 90, mood: 'think' })}<p>${tab === 'community' && !shared ? T('Спільна галерея з’явиться після підключення хмари (Firebase) і входу в акаунт.', 'Общая галерея появится после подключения облака (Firebase) и входа в аккаунт.', 'The shared gallery appears once the cloud (Firebase) is connected and you sign in.') : T('Тут поки порожньо — опублікуй першу роботу!', 'Здесь пока пусто — опубликуй первую работу!', 'Nothing here yet — publish the first one!')}</p></div>`;
      return;
    }
    const liked = C.LS.get('galLiked', []);
    grid.innerHTML = items.map((w, i) => `<div class="card gal-item" data-reveal="${(i % 6) * 60}">
      <div class="gal-thumb" data-i="${i}"></div>
      <div class="gal-meta"><div><b>${esc(titleOf(w))}</b><small class="muted">${esc((w.author && w.author.name) || '?')} · ${w.type === 'turtle' ? '🐢' : '🌐'}</small></div>
        <div class="row-gap">${tab === 'community' ? `<button class="like ${liked.includes(w.id) ? 'liked' : ''}" data-like="${w.id}">${C.icon('heart', 15)} <span>${w.likes || 0}</span></button>` : ''}
        <button class="icon-btn" data-open="${i}" title="${T('Відкрити код', 'Открыть код', 'Open code')}">${C.icon('code', 16)}</button>
        ${w.mine ? `<button class="icon-btn" data-del="${w.id}" title="${T('Видалити', 'Удалить', 'Delete')}">${C.icon('trash', 16)}</button>` : ''}</div></div></div>`).join('');
    fx.reveal(grid);
    grid.querySelectorAll('.gal-thumb').forEach((el) => renderThumb(el, items[+el.dataset.i]));
    grid.querySelectorAll('[data-open]').forEach((b) => b.onclick = () => {
      const w = items[+b.dataset.open];
      if (w.type === 'html') { C.LS.set('pg:html', w.code); location.hash = '#/playground/html'; }
      else { C.LS.set('arc:turtle:0', w.code); location.hash = '#/arcade/turtle/0'; }
    });
    grid.querySelectorAll('[data-del]').forEach((b) => b.onclick = async () => {
      if (!(await fx.confirm(T('Видалити цю роботу?', 'Удалить эту работу?', 'Delete this work?')))) return;
      S.gallery = S.gallery.filter((w) => w.id !== b.dataset.del);
      C.save();
      C.pages.gallery('mine');
    });
    grid.querySelectorAll('[data-like]').forEach((b) => b.onclick = async () => {
      const id = b.dataset.like, l = C.LS.get('galLiked', []);
      if (l.includes(id)) return;
      l.push(id); C.LS.set('galLiked', l);
      b.classList.add('liked');
      const sp = b.querySelector('span'); sp.textContent = +sp.textContent + 1;
      fx.sound('pop');
      try { await C.cloud.likeGallery(id); } catch (e) { /* */ }
    });
  };
})();
