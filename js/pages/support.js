// Сторінки «Підтримати» (донати) і «Про нас». Дані — у js/site-config.js.
(function () {
  'use strict';
  const C = window.Codry, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;
  const T = (uk, ru, en) => tr({ uk, ru, en });
  const txt = (v) => (v && typeof v === 'object' ? tr(v) : v || '');

  let qrLib = null;
  const loadQR = () => qrLib || (qrLib = new Promise((ok) => {
    if (window.QRCode) return ok(true);
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    s.onload = () => ok(true);
    s.onerror = () => { qrLib = null; ok(false); };
    document.head.appendChild(s);
  }));

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); fx.toast(T('Адресу скопійовано', 'Адрес скопирован', 'Address copied'), 'ok', 'copy'); }
    catch (e) { fx.toast(T('Виділи адресу й скопіюй вручну', 'Выдели адрес и скопируй вручную', 'Select the address and copy it manually'), 'bad', 'info'); }
  }

  // ================= Підтримати =================
  C.pages.donate = () => {
    const D = window.CODRY_DONATE || { links: [], crypto: [] };
    const links = (D.links || []).filter((l) => l && l.url);
    const crypto = (D.crypto || []).filter((c) => c && c.address);
    const empty = !links.length && !crypto.length;
    C.app.innerHTML = `<div class="page narrow">
      <div class="about-hero" data-reveal>${C.mascot({ size: 140, mood: 'love', anim: 'float' })}
        <h1 class="page-title">${T('Підтримати Codry', 'Поддержать Codry', 'Support Codry')}</h1>
        <p class="section-sub">${T('Codry безкоштовний для всіх і без реклами. Якщо сайт тобі допомагає, ти можеш підтримати його розвиток: нові курси, задачі та функції.', 'Codry бесплатный для всех и без рекламы. Если сайт тебе помогает, ты можешь поддержать его развитие: новые курсы, задачи и функции.', 'Codry is free for everyone, with no ads. If it helps you, you can support new courses, problems and features.')}</p></div>
      <div class="notice" data-reveal>${C.icon('info', 18)} ${T('Донати — повністю добровільні. Усі курси, задачі й нагороди залишаються безкоштовними. Якщо тобі менше 18 — спершу запитай дозволу в батьків.', 'Донаты — полностью добровольные. Все курсы, задачи и награды остаются бесплатными. Если тебе меньше 18 — сначала спроси разрешения у родителей.', 'Donations are entirely optional. Every course, problem and reward stays free. If you’re under 18, ask a parent first.')}</div>
      ${empty ? `<div class="card center" data-reveal>${C.mascot({ size: 90, mood: 'think' })}<p>${T('Способи підтримки з’являться тут найближчим часом.', 'Способы поддержки появятся здесь в ближайшее время.', 'Ways to support will appear here soon.')}</p></div>` : ''}
      ${links.length ? `<div class="donate-links" data-reveal>${links.map((l) => `<a class="card donate-link" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${C.icon(l.icon || 'heart', 26)}<b>${esc(txt(l.name))}</b><span>→</span></a>`).join('')}</div>` : ''}
      ${crypto.length ? `<h2 class="section-title left" data-reveal>${T('Криптовалюта', 'Криптовалюта', 'Crypto')}</h2>
        <div class="crypto-grid">${crypto.map((c, i) => `<div class="card crypto" data-reveal="${i * 60}">
          <div class="crypto-head"><b>${esc(c.coin)}</b><span class="tag">${esc(c.network || '')}</span></div>
          <div class="qr" id="qr${i}"></div>
          <code class="crypto-addr">${esc(c.address)}</code>
          <button class="btn ghost sm" data-copy="${i}">${C.icon('copy', 15)} ${T('Копіювати адресу', 'Копировать адрес', 'Copy address')}</button>
          <p class="muted small">${T('Надсилай лише', 'Отправляй только', 'Send only')} ${esc(c.coin)} ${T('у мережі', 'в сети', 'on the')} ${esc(c.network || '')} — ${T('інакше кошти загубляться.', 'иначе средства потеряются.', 'network, otherwise funds are lost.')}</p>
        </div>`).join('')}</div>` : ''}
    </div>${C.footer()}`;
    document.querySelectorAll('[data-copy]').forEach((b) => b.onclick = () => copy(crypto[+b.dataset.copy].address));
    if (crypto.length) loadQR().then((ok) => {
      if (!ok || !window.QRCode) return;
      crypto.forEach((c, i) => {
        const el = document.getElementById('qr' + i);
        if (el) new window.QRCode(el, { text: c.address, width: 148, height: 148, colorDark: '#0b1020', colorLight: '#ffffff' });
      });
    });
  };

  // ================= Про нас (з даними з site-config.js) =================
  const baseAbout = C.pages.about;
  C.pages.about = () => {
    const A = window.CODRY_ABOUT || {};
    const team = (A.team || []).filter((m) => m && m.name);
    const contacts = (A.contacts || []).filter((c) => c && c.value);
    const mission = txt(A.mission);
    if (!mission && !team.length && !contacts.length) return baseAbout();
    C.app.innerHTML = `<div class="page narrow">
      <div class="about-hero" data-reveal>${C.mascot({ size: 140, mood: 'love', anim: 'float' })}<h1 class="page-title">${t('about_title')}</h1></div>
      <div class="card" data-reveal><p>${esc(mission || t('about_text')).replace(/\n/g, '<br>')}</p></div>
      ${team.length ? `<h2 class="section-title left" data-reveal>${T('Команда', 'Команда', 'Team')}</h2>
        <div class="about-grid">${team.map((m, i) => `<div class="card center" data-reveal="${i * 80}">${C.mascot({ size: 80, mood: m.mood || ['happy', 'wink', 'excited'][i % 3] })}<b>${esc(txt(m.name))}</b><p class="muted">${esc(txt(m.role))}</p></div>`).join('')}</div>` : ''}
      ${contacts.length ? `<h2 class="section-title left" data-reveal>${T('Контакти', 'Контакты', 'Contacts')}</h2>
        <div class="card" data-reveal>${contacts.map((c) => `<p><b>${esc(txt(c.label))}:</b> ${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(c.value)}</a>` : esc(c.value)}</p>`).join('')}</div>` : ''}
      <a class="btn ghost" href="#/donate">${C.icon('heart', 16)} ${T('Підтримати проєкт', 'Поддержать проект', 'Support the project')}</a>
    </div>${C.footer()}`;
  };
})();
