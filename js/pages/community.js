// Сторінки: Форум, Профіль і налаштування, Вхід, Про нас.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;

  const ago = (ts) => {
    const s = Math.round((Date.now() - ts) / 1000);
    const f = { uk: ['щойно', 'хв', 'год', 'дн'], ru: ['только что', 'мин', 'ч', 'дн'], en: ['just now', 'min', 'h', 'd'] }[S.lang];
    if (s < 60) return f[0];
    if (s < 3600) return Math.round(s / 60) + ' ' + f[1];
    if (s < 86400) return Math.round(s / 3600) + ' ' + f[2];
    return Math.round(s / 86400) + ' ' + f[3];
  };
  // Текст поста: екранування + блоки коду ```…```
  const fmtPost = (txt) => esc(txt).split('```').map((part, i) => (i % 2 ? `<pre class="code cm-s-codry">${part.replace(/^\w*\n/, '')}</pre>` : part.replace(/\n/g, '<br>'))).join('');

  // ================= Форум =================
  C.pages.forum = async (a) => {
    if (a === 'new') return newTopic();
    if (a && a.startsWith('t')) return topicPage(a);
    if (a && a !== 'all') return topicPage(a);
    const cat = C.LS.get('forumCat', 'all');
    const cats = [['all', t('cat_all')], ['general', t('forum_general')], ...C.courses.map((c) => [c.id, c.name])];
    C.app.innerHTML = `<div class="page">
      <div class="forum-head" data-reveal><div><h1 class="page-title">${C.icon('chat', 30)} ${t('forum_title')}</h1><p class="section-sub left">${t('forum_sub')}</p></div>
        <a class="btn primary" href="#/forum/new">${C.icon('pencil', 16)} ${t('forum_new')}</a></div>
      ${C.cloud.forumShared() ? '' : `<div class="notice" data-reveal>${C.icon('info', 18)} ${t('forum_local')}</div>`}
      <div class="chips" id="fcats">${cats.map(([k, l]) => `<button data-c="${k}" class="${k === cat ? 'active' : ''}">${esc(l)}</button>`).join('')}</div>
      <div id="topics" class="topics"><div class="skeleton"></div><div class="skeleton"></div></div>
    </div>${C.footer()}`;
    C.app.querySelectorAll('#fcats button').forEach((b) => b.onclick = () => { C.LS.set('forumCat', b.dataset.c); C.pages.forum(); });
    let list = [];
    try { list = await C.cloud.listTopics(cat); } catch (e) { list = []; }
    const box = document.getElementById('topics');
    if (!box) return;
    box.innerHTML = list.length ? list.map((tp, i) => `<a class="topic" href="#/forum/${tp.id}" data-reveal="${i * 40}">
        <span class="ava">${C.mascot({ size: 44, mood: 'idle', color: tp.author && tp.author.color, acc: tp.author && tp.author.acc })}</span>
        <span class="tp-main"><b>${esc(tp.title)}</b><small>${esc((tp.author && tp.author.name) || '?')} · ${ago(tp.at)} · <span class="tp-cat">${esc(catName(tp.cat))}</span></small></span>
        <span class="tp-stats"><span>${C.icon('chat', 15)} ${tp.replyCount || 0}</span><span>${C.icon('heart', 15)} ${tp.likes || 0}</span></span>
      </a>`).join('') : `<div class="empty">${C.mascot({ size: 110, mood: 'sleepy' })}<p>${t('forum_empty')}</p></div>`;
    fx.reveal(box);
  };
  const catName = (k) => (k === 'general' ? t('forum_general') : (C.courseById(k) || { name: k }).name);

  function newTopic() {
    if (!S.profile.name) { fx.toast(t('forum_need_name'), 'bad', 'user'); location.hash = '#/profile'; return; }
    C.app.innerHTML = `<div class="page narrow">
      <a class="crumb" href="#/forum">← ${t('forum_back')}</a>
      <h1 class="page-title">${t('forum_new')}</h1>
      <label class="field">${t('forum_category')}<select id="ncat"><option value="general">${t('forum_general')}</option>${C.courses.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}</select></label>
      <label class="field"><input id="ntitle" maxlength="120" placeholder="${t('forum_title_ph')}"></label>
      <label class="field"><textarea id="nbody" rows="9" maxlength="5000" placeholder="${t('forum_body_ph')}"></textarea></label>
      <button class="btn primary" id="npub">${C.icon('rocket', 16)} ${t('forum_publish')}</button>
    </div>`;
    document.getElementById('npub').onclick = async () => {
      const title = document.getElementById('ntitle').value.trim(), body = document.getElementById('nbody').value.trim();
      if (title.length < 3 || body.length < 3) { fx.toast('✍️', 'bad'); return; }
      const id = await C.cloud.createTopic(document.getElementById('ncat').value, title, body);
      G.track('post');
      location.hash = '#/forum/' + id;
    };
  }

  async function topicPage(id) {
    C.app.innerHTML = `<div class="page narrow"><div class="skeleton tall"></div></div>`;
    let tp = null;
    try { tp = await C.cloud.getTopic(id); } catch (e) { tp = null; }
    if (!tp) return C.notFound();
    C.app.innerHTML = `<div class="page narrow">
      <a class="crumb" href="#/forum">← ${t('forum_back')}</a>
      <article class="post main-post" data-reveal>
        <div class="post-head"><span class="ava">${C.mascot({ size: 48, mood: 'happy', color: tp.author.color, acc: tp.author.acc })}</span><div><b>${esc(tp.author.name)}</b><small>${ago(tp.at)} · ${esc(catName(tp.cat))}</small></div></div>
        <h1>${esc(tp.title)}</h1>
        <div class="post-body">${fmtPost(tp.body)}</div>
        <button class="btn ghost sm like" id="likeBtn">${C.icon('heart', 16)} <span>${tp.likes || 0}</span></button>
      </article>
      <h3>${(tp.replies || []).length} ${t('forum_replies')}</h3>
      <div class="replies">${(tp.replies || []).map((r, i) => `<div class="post" data-reveal="${i * 40}"><div class="post-head"><span class="ava">${C.mascot({ size: 38, mood: 'idle', color: r.author.color, acc: r.author.acc })}</span><div><b>${esc(r.author.name)}</b><small>${ago(r.at)}</small></div></div><div class="post-body">${fmtPost(r.body)}</div></div>`).join('')}</div>
      <div class="reply-box"><textarea id="rbody" rows="4" maxlength="3000" placeholder="${t('forum_reply_ph')}"></textarea><button class="btn primary" id="rbtn">${t('forum_reply')}</button></div>
    </div>`;
    document.getElementById('likeBtn').onclick = async (e) => {
      if (await C.cloud.like(id)) { const s = e.currentTarget.querySelector('span'); s.textContent = +s.textContent + 1; e.currentTarget.classList.add('liked'); fx.sound('pop'); }
    };
    document.getElementById('rbtn').onclick = async () => {
      if (!S.profile.name) { fx.toast(t('forum_need_name'), 'bad', 'user'); return; }
      const body = document.getElementById('rbody').value.trim();
      if (body.length < 2) return;
      await C.cloud.reply(id, body);
      G.track('post');
      topicPage(id);
    };
    fx.reveal(C.app);
  }

  // ================= Профіль =================
  C.pages.profile = () => {
    const stepsDone = G.totalSteps();
    const coursesDone = C.courses.filter((c) => c.steps.length && G.coursePct(c) === 100).length;
    const lvl = G.levelFromXP(S.xp), [a, b] = G.levelBounds(lvl);
    const u = C.cloud.user;
    const recent = G.ACHIEVEMENTS.filter((x) => S.achievements[x.id]).slice(-6);
    C.app.innerHTML = `<div class="page">
      <div class="profile-card" data-reveal>
        <div class="pc-mascot">${C.mascot({ size: 130, mood: 'happy', anim: 'float' })}<a class="btn ghost sm" href="#/shop">${C.icon('shop', 14)} ${t('nav_shop')}</a></div>
        <div class="pc-main">
          <h1>${esc(S.profile.name || t('you'))}</h1>
          <p class="muted">${u ? `${C.icon('user', 14)} ${esc(u.email || u.displayName || '')}` : `<a href="#/login">${C.icon('key', 14)} ${t('nav_login')}</a>`}</p>
          <div class="lvl-line"><span class="lvl-pill">${t('level')} ${lvl}</span><div class="bar"><i style="width:${Math.round(((S.xp - a) / (b - a)) * 100)}%"></i></div><small>${S.xp} / ${b} XP</small></div>
        </div>
      </div>
      <div class="kpis">
        ${[['bolt', S.xp, 'total_xp'], ['flame', G.streak(), 'streak_days'], ['trophy', G.bestStreak(), 'best_streak'], ['check', stepsDone, 'steps_done'], ['medal', coursesDone, 'courses_done'], ['gem', S.gems, 'gems']].map(([i, v, k], n) => `<div class="kpi" data-reveal="${n * 50}">${C.icon(i, 26)}<b data-count="${v}">0</b><small>${t(k)}</small></div>`).join('')}
      </div>
      <div class="split">
        <div class="card" data-reveal><div class="card-label">${C.icon('flame', 16)} ${t('streak_title')}</div>${C.calendarHTML()}</div>
        <div class="card" data-reveal><div class="card-label">${C.icon('book', 16)} ${t('nav_courses')}</div>
          ${C.courses.map((c) => `<div class="prog-row">${C.courseBadge(c, 32)}<div class="prog-main"><div class="prog-top"><a href="#/course/${c.id}">${c.name}</a><span>${G.doneCount(c)}/${c.steps.length}</span></div><div class="bar"><i style="width:${G.coursePct(c)}%;--c1:${c.color};--c2:${c.color2}"></i></div></div>
            <button class="btn ghost sm icon" data-cert="${c.id}" ${G.coursePct(c) === 100 ? '' : 'disabled'} title="${t('get_cert')}">${C.icon('medal', 16)}</button></div>`).join('')}
        </div>
      </div>
      ${recent.length ? `<div class="card" data-reveal><div class="card-label">${C.icon('medal', 16)} <a href="#/achievements">${t('nav_achievements')} →</a></div><div class="recent-ach">${recent.map((x) => `<div title="${esc(tr(x.title))}">${C.badge(x.icon, x.c1, x.c2, 64)}</div>`).join('')}</div></div>` : ''}
      <div class="card settings" data-reveal id="settings">
        <div class="card-label">${C.icon('user', 16)} ${t('nav_settings')}</div>
        <label class="field">${t('settings_name')}<input id="sName" maxlength="30" value="${esc(S.profile.name)}"></label>
        <label class="field">${t('settings_age')}<select id="sAge"><option value="">—</option>${['kid', 'teen', 'adult'].map((k) => `<option value="${k}" ${S.profile.age === k ? 'selected' : ''}>${t('age_' + k)}</option>`).join('')}</select></label>
        <label class="switch"><input type="checkbox" id="sSound" ${S.settings.sound ? 'checked' : ''}><span></span>${t('settings_sound')}</label>
        <label class="switch"><input type="checkbox" id="sMotion" ${S.settings.motion ? 'checked' : ''}><span></span>${t('settings_motion')}</label>
        <label class="field">${t('settings_voice_rate')}<input type="range" id="sRate" min="0.6" max="1.6" step="0.1" value="${S.settings.voiceRate}"><output id="sRateOut">${S.settings.voiceRate}×</output></label>
      </div>
      <button class="btn danger" id="resetAll">${t('reset_progress')}</button>
    </div>${C.footer()}`;
    C.app.querySelectorAll('[data-cert]').forEach((x) => x.onclick = () => C.showCertificate(C.courseById(x.dataset.cert)));
    const nm = document.getElementById('sName');
    nm.oninput = C.debounce(() => { S.profile.name = nm.value.trim(); C.save(); C.app.querySelector('.pc-main h1').textContent = S.profile.name || t('you'); }, 300);
    document.getElementById('sAge').onchange = (e) => { S.profile.age = e.target.value; C.save(); };
    document.getElementById('sSound').onchange = (e) => { S.settings.sound = e.target.checked; C.save(); fx.sound('pop'); };
    document.getElementById('sMotion').onchange = (e) => { S.settings.motion = e.target.checked; C.save(); document.documentElement.classList.toggle('reduce-motion', e.target.checked); };
    const rate = document.getElementById('sRate');
    rate.oninput = () => { S.settings.voiceRate = +rate.value; document.getElementById('sRateOut').textContent = rate.value + '×'; C.save(); };
    document.getElementById('resetAll').onclick = async () => {
      if (!(await fx.confirm(t('reset_progress_confirm')))) return;
      C.LS.keys().filter((k) => k !== 'codry:state').forEach((k) => { try { localStorage.removeItem(k); } catch (e) { /* */ } });
      C.resetState();
      C.route();
    };
  };

  // ================= Вхід =================
  // Вхід і реєстрація — у js/pages/account.js

  // ================= Про нас =================
  C.pages.about = () => {
    C.app.innerHTML = `<div class="page narrow">
      <div class="about-hero" data-reveal>${C.mascot({ size: 140, mood: 'love', anim: 'float' })}<h1 class="page-title">${t('about_title')}</h1></div>
      <div class="card" data-reveal><p>${t('about_text')}</p></div>
      <div class="about-grid">${['happy', 'think', 'excited'].map((m, i) => `<div class="card center" data-reveal="${i * 80}">${C.mascot({ size: 80, mood: m })}<b>${[t('how1_t'), t('how3_t'), t('how4_t')][i]}</b><p class="muted">${[t('how1_d'), t('how3_d'), t('how4_d')][i]}</p></div>`).join('')}</div>
    </div>${C.footer()}`;
  };
})();
