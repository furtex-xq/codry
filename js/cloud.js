// Хмара: вхід (Google / email), синхронізація прогресу, спільний рейтинг і форум через Firebase.
// Без конфігурації працює локальний режим з тим самим API.
(function () {
  'use strict';
  const C = window.Codry, S = C.state;
  const cfg = window.CODRY_FIREBASE;
  const FB = 'https://www.gstatic.com/firebasejs/10.12.2/';

  const cloud = C.cloud = { enabled: !!cfg, ready: false, user: null, board: null };

  // ---------- Об’єднання стану з хмари та локального ----------
  function merge(remote) {
    if (!remote) return;
    for (const cid in remote.progress || {}) {
      S.progress[cid] = S.progress[cid] || {};
      for (const sid in remote.progress[cid]) S.progress[cid][sid] = Object.assign({}, remote.progress[cid][sid], S.progress[cid][sid]);
    }
    const union = (a, b) => [...new Set([...(a || []), ...(b || [])])];
    S.days = union(S.days, remote.days);
    S.frozen = union(S.frozen, remote.frozen);
    S.dailySolved = union(S.dailySolved, remote.dailySolved);
    S.owned = union(S.owned, remote.owned);
    S.achievements = Object.assign({}, remote.achievements, S.achievements);
    for (const d in remote.xpLog || {}) S.xpLog[d] = Math.max(S.xpLog[d] || 0, remote.xpLog[d]);
    S.xp = Math.max(S.xp, remote.xp || 0);
    S.gems = Math.max(S.gems, remote.gems || 0);
    S.freezes = Math.max(S.freezes, remote.freezes || 0);
    for (const k in remote.stats || {}) S.stats[k] = Math.max(S.stats[k] || 0, remote.stats[k]);
    if (!S.profile.name && remote.profile && remote.profile.name) S.profile.name = remote.profile.name;
    if (remote.league && (remote.league.tier || 0) > S.league.tier) S.league = remote.league;
    if (remote.teacher && remote.teacher.classes && !S.teacher.classes.length) S.teacher = remote.teacher;
    if (remote.myClasses && remote.myClasses.length && !S.myClasses.length) S.myClasses = remote.myClasses;
    S.bosses = Object.assign({}, remote.bosses, S.bosses);
    if (remote.arcade) {
      for (const k of ['robot', 'turtle']) for (const id in remote.arcade[k] || {}) S.arcade[k][id] = Math.max(S.arcade[k][id] || 0, remote.arcade[k][id]);
      S.arcade.snake = Math.max(S.arcade.snake || 0, remote.arcade.snake || 0);
    }
    S.trophies = union(S.trophies, remote.trophies);
    if (remote.gallery && remote.gallery.length && !S.gallery.length) S.gallery = remote.gallery;
    if (remote.pet && remote.pet.fed && (!S.pet.fed || remote.pet.fed > S.pet.fed)) S.pet = remote.pet;
    C.saveNow();
  }
  function snapshot() {
    const keys = ['progress', 'days', 'frozen', 'freezes', 'xp', 'xpLog', 'gems', 'dailySolved', 'achievements', 'owned', 'equip', 'profile', 'league', 'stats', 'teacher', 'myClasses', 'bosses', 'pet', 'trophies', 'gallery', 'arcade', 'battles'];
    const o = {};
    keys.forEach((k) => { o[k] = S[k]; });
    o.weekXP = C.game.weekXP();
    o.week = C.weekKey();
    o.tier = S.league.tier;
    o.name = S.profile.name || (cloud.user && cloud.user.displayName) || 'Codry';
    o.updated = Date.now();
    return JSON.parse(JSON.stringify(o));
  }

  // ---------- Firebase ----------
  let auth, db;
  function load(src) { return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }

  cloud.init = async () => {
    if (!cfg) { cloud.ready = true; return; }
    try {
      await load(FB + 'firebase-app-compat.js');
      await Promise.all([load(FB + 'firebase-auth-compat.js'), load(FB + 'firebase-firestore-compat.js')]);
      firebase.initializeApp(cfg);
      auth = firebase.auth();
      db = firebase.firestore();
      auth.onAuthStateChanged(async (u) => {
        cloud.user = u;
        cloud.status = null;
        if (unwatch) { unwatch(); unwatch = null; }
        if (u) {
          try { await ensureAccount(u); } catch (e) { console.warn('account', e); cloud.status = 'error'; }
          if (cloud.status === 'approved') await startSync(u);
        } else cloud.board = null;
        C.emit('auth', u);
      });
      C.on('saved', C.debounce(() => { if (cloud.active()) push(); }, 4000));
    } catch (e) {
      console.warn('Firebase init failed', e);
      cloud.enabled = false;
    }
    cloud.ready = true;
  };

  // ---------- Реєстрація з підтвердженням ----------
  // accounts/{uid}: { name, email, status: 'pending' | 'approved' | 'rejected', at, provider }
  // site/config: { registrationOpen: true | false }
  // Хмарні функції (синхронізація, рейтинг, форум, галерея, класи, турніри) — лише для підтверджених.
  let unwatch = null;
  const ADMINS = () => window.CODRY_ADMINS || [];
  cloud.isAdmin = () => !!(cloud.user && ADMINS().includes(cloud.user.uid));
  cloud.active = () => !!(cfg && cloud.user && cloud.status === 'approved');

  async function ensureAccount(u) {
    const ref = db.collection('accounts').doc(u.uid);
    let doc = await ref.get();
    if (!doc.exists) {
      const admin = ADMINS().includes(u.uid);
      if (!admin) {
        const conf = await db.collection('site').doc('config').get().catch(() => null);
        if (conf && conf.exists && conf.data().registrationOpen === false) { cloud.status = 'closed'; return; }
      }
      await ref.set({
        name: S.profile.name || u.displayName || '', email: u.email || '', status: admin ? 'approved' : 'pending',
        at: Date.now(), provider: (u.providerData[0] && u.providerData[0].providerId) || 'password'
      });
      doc = await ref.get();
    }
    cloud.status = doc.data().status;
    // Власник сайту, доданий в адміни вже після першого входу, підтверджує себе сам.
    if (cloud.status !== 'approved' && ADMINS().includes(u.uid)) { await ref.update({ status: 'approved' }); cloud.status = 'approved'; }
    // Стежимо за заявкою: щойно адмін підтвердить — вмикаємо хмару без перезавантаження.
    unwatch = ref.onSnapshot(async (snap) => {
      if (!snap.exists) return;
      const was = cloud.status;
      cloud.status = snap.data().status;
      if (was !== 'approved' && cloud.status === 'approved') { await startSync(u); C.emit('approved'); }
      if (was !== cloud.status) C.emit('auth', u);
    }, () => {});
  }
  async function startSync(u) {
    try {
      const doc = await db.collection('users').doc(u.uid).get();
      if (doc.exists) merge(doc.data());
      if (!S.profile.name && u.displayName) S.profile.name = u.displayName;
      await push();
      await refreshBoard();
    } catch (e) { console.warn('cloud sync', e); }
  }
  // Повторна заявка, якщо реєстрацію закрили, а потім відкрили знову.
  cloud.retryAccount = async () => { if (cloud.user) { await ensureAccount(cloud.user); if (cloud.status === 'approved') await startSync(cloud.user); C.emit('auth', cloud.user); } };

  // Для адміна
  cloud.listAccounts = async () => {
    const r = await db.collection('accounts').orderBy('at', 'desc').limit(300).get();
    return r.docs.map((d) => Object.assign({ uid: d.id }, d.data()));
  };
  cloud.setAccountStatus = (uid, status) => db.collection('accounts').doc(uid).update({ status, decided: Date.now() });
  cloud.getSiteConfig = async () => { const d = await db.collection('site').doc('config').get(); return d.exists ? d.data() : { registrationOpen: true }; };
  cloud.setRegistrationOpen = (open) => db.collection('site').doc('config').set({ registrationOpen: !!open }, { merge: true });

  async function push() { if (cloud.active()) await db.collection('users').doc(cloud.user.uid).set(snapshot(), { merge: true }); }

  async function refreshBoard() {
    if (!cloud.active()) return;
    const q = await db.collection('users').where('week', '==', C.weekKey()).where('tier', '==', S.league.tier).orderBy('weekXP', 'desc').limit(30).get();
    cloud.board = q.docs.map((d) => {
      const x = d.data();
      return { name: x.name, xp: x.weekXP || 0, me: d.id === cloud.user.uid, color: x.equip && x.equip.color, acc: x.equip && x.equip.acc };
    });
    C.emit('board');
  }
  cloud.refreshBoard = refreshBoard;

  cloud.signInGoogle = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  cloud.signInEmail = (e, p) => auth.signInWithEmailAndPassword(e, p);
  cloud.register = (e, p) => auth.createUserWithEmailAndPassword(e, p);
  cloud.signOut = () => auth.signOut();

  // ---------- Класи (режим учителя) ----------
  // classes/{code}: { name, teacher (uid), teacherName, assignments, updated }
  // classes/{code}/members/{uid}: { name, at }
  cloud.classesShared = () => cloud.active();
  cloud.saveClass = async (cls) => {
    await db.collection('classes').doc(cls.code).set({
      name: cls.name, teacher: cloud.user.uid, teacherName: S.profile.name || cloud.user.displayName || '',
      assignments: cls.assignments, updated: Date.now()
    }, { merge: true });
  };
  cloud.deleteClass = (code) => db.collection('classes').doc(code).delete();
  cloud.getClass = async (code) => {
    const d = await db.collection('classes').doc(code).get();
    return d.exists ? Object.assign({ code }, d.data()) : null;
  };
  cloud.joinClass = (code, name) => db.collection('classes').doc(code).collection('members').doc(cloud.user.uid).set({ name, at: Date.now() });
  cloud.leaveClass = (code) => db.collection('classes').doc(code).collection('members').doc(cloud.user.uid).delete();
  // Учні класу разом з їхнім прогресом (документи users доступні для читання).
  cloud.classMembers = async (code) => {
    const r = await db.collection('classes').doc(code).collection('members').get();
    return Promise.all(r.docs.map(async (m) => {
      const u = await db.collection('users').doc(m.id).get();
      const x = u.exists ? u.data() : {};
      return { uid: m.id, name: m.data().name || x.name || '?', progress: x.progress || {}, xp: x.xp || 0, days: x.days || [], frozen: x.frozen || [], weekXP: x.week === C.weekKey() ? x.weekXP || 0 : 0 };
    }));
  };

  // ---------- Тижневі турніри ----------
  // tournaments/{week}/entries/{uid}: { name, score, solved, color, at }
  cloud.tourneyShared = () => cloud.active();
  cloud.saveTourney = (week, entry) => db.collection('tournaments').doc(week).collection('entries').doc(cloud.user.uid)
    .set(Object.assign({ name: S.profile.name || cloud.user.displayName || '?', color: S.equip.color, at: Date.now() }, entry));
  cloud.tourneyBoard = async (week) => {
    const r = await db.collection('tournaments').doc(week).collection('entries').orderBy('score', 'desc').limit(50).get();
    return r.docs.map((d) => Object.assign({ me: d.id === cloud.user.uid }, d.data()));
  };

  // ---------- Ліга класів ----------
  // Учитель записує в документ класу тижневий бал (сума тижневого XP учнів).
  cloud.setClassScore = (code, weekScore) => db.collection('classes').doc(code).set({ week: C.weekKey(), weekScore }, { merge: true });
  cloud.classLeague = async () => {
    const r = await db.collection('classes').where('week', '==', C.weekKey()).orderBy('weekScore', 'desc').limit(20).get();
    return r.docs.map((d) => ({ code: d.id, name: d.data().name, score: d.data().weekScore || 0 }));
  };

  // ---------- Галерея робіт ----------
  cloud.galleryShared = () => cloud.active();
  cloud.listGallery = async () => {
    const r = await db.collection('gallery').orderBy('at', 'desc').limit(60).get();
    return r.docs.map((d) => Object.assign({ id: d.id }, d.data()));
  };
  cloud.addGallery = async (item) => {
    const doc = Object.assign({}, item, { author: { name: S.profile.name || cloud.user.displayName || '?', color: S.equip.color, uid: cloud.user.uid }, at: Date.now(), likes: 0 });
    const r = await db.collection('gallery').add(doc);
    return r.id;
  };
  cloud.likeGallery = (id) => db.collection('gallery').doc(id).update({ likes: firebase.firestore.FieldValue.increment(1) });

  // ---------- Форум ----------
  const LOCAL_KEY = 'forum';
  const localTopics = () => C.LS.get(LOCAL_KEY, []);
  const author = () => ({ name: S.profile.name || (cloud.user && cloud.user.displayName) || '?', color: S.equip.color, acc: S.equip.acc, uid: cloud.user ? cloud.user.uid : 'local' });

  cloud.forumShared = () => cloud.active();
  cloud.listTopics = async (cat) => {
    if (cloud.forumShared()) {
      let q = db.collection('topics').orderBy('at', 'desc').limit(50);
      if (cat && cat !== 'all') q = db.collection('topics').where('cat', '==', cat).orderBy('at', 'desc').limit(50);
      const r = await q.get();
      return r.docs.map((d) => Object.assign({ id: d.id }, d.data()));
    }
    return localTopics().filter((t) => !cat || cat === 'all' || t.cat === cat).sort((a, b) => b.at - a.at);
  };
  cloud.getTopic = async (id) => {
    if (cloud.forumShared()) {
      const d = await db.collection('topics').doc(id).get();
      if (!d.exists) return null;
      const r = await db.collection('topics').doc(id).collection('replies').orderBy('at').get();
      return Object.assign({ id: d.id }, d.data(), { replies: r.docs.map((x) => x.data()) });
    }
    return localTopics().find((t) => t.id === id) || null;
  };
  cloud.createTopic = async (cat, title, body) => {
    const t = { cat, title, body, author: author(), at: Date.now(), replyCount: 0, likes: 0 };
    if (cloud.forumShared()) { const r = await db.collection('topics').add(t); return r.id; }
    const all = localTopics();
    t.id = 't' + Date.now().toString(36);
    t.replies = [];
    all.push(t);
    C.LS.set(LOCAL_KEY, all);
    return t.id;
  };
  cloud.reply = async (id, body) => {
    const r = { body, author: author(), at: Date.now() };
    if (cloud.forumShared()) {
      await db.collection('topics').doc(id).collection('replies').add(r);
      await db.collection('topics').doc(id).update({ replyCount: firebase.firestore.FieldValue.increment(1) });
      return;
    }
    const all = localTopics();
    const t = all.find((x) => x.id === id);
    if (t) { t.replies.push(r); t.replyCount = t.replies.length; C.LS.set(LOCAL_KEY, all); }
  };
  cloud.like = async (id) => {
    const liked = C.LS.get('liked', []);
    if (liked.includes(id)) return false;
    liked.push(id); C.LS.set('liked', liked);
    if (cloud.forumShared()) { await db.collection('topics').doc(id).update({ likes: firebase.firestore.FieldValue.increment(1) }); return true; }
    const all = localTopics();
    const t = all.find((x) => x.id === id);
    if (t) { t.likes = (t.likes || 0) + 1; C.LS.set(LOCAL_KEY, all); }
    return true;
  };
})();
