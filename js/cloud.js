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
    C.saveNow();
  }
  function snapshot() {
    const keys = ['progress', 'days', 'frozen', 'freezes', 'xp', 'xpLog', 'gems', 'dailySolved', 'achievements', 'owned', 'equip', 'profile', 'league', 'stats'];
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
        if (u) {
          try {
            const doc = await db.collection('users').doc(u.uid).get();
            if (doc.exists) merge(doc.data());
            if (!S.profile.name && u.displayName) S.profile.name = u.displayName;
            await push();
            await refreshBoard();
          } catch (e) { console.warn('cloud sync', e); }
        } else cloud.board = null;
        C.emit('auth', u);
      });
      C.on('saved', C.debounce(() => { if (cloud.user) push(); }, 4000));
    } catch (e) {
      console.warn('Firebase init failed', e);
      cloud.enabled = false;
    }
    cloud.ready = true;
  };

  async function push() { if (cloud.user) await db.collection('users').doc(cloud.user.uid).set(snapshot(), { merge: true }); }

  async function refreshBoard() {
    if (!cloud.user) return;
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

  // ---------- Форум ----------
  const LOCAL_KEY = 'forum';
  const localTopics = () => C.LS.get(LOCAL_KEY, []);
  const author = () => ({ name: S.profile.name || (cloud.user && cloud.user.displayName) || '?', color: S.equip.color, acc: S.equip.acc, uid: cloud.user ? cloud.user.uid : 'local' });

  cloud.forumShared = () => !!(cfg && cloud.user);
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
