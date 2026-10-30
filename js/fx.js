// Ефекти: тости, модалки, конфеті, летючі нагороди, звуки, поява при прокрутці, нахил карток.
(function () {
  'use strict';
  const C = window.Codry, S = C.state;
  const fx = C.fx = {};
  const reduced = () => S.settings.motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Тости ----------
  fx.toast = (msg, kind, iconName) => {
    const box = document.getElementById('toasts');
    const n = C.el(`<div class="toast ${kind || ''}">${iconName ? C.icon(iconName, 20) : ''}<span>${msg}</span></div>`);
    box.appendChild(n);
    setTimeout(() => { n.classList.add('out'); setTimeout(() => n.remove(), 350); }, 3000);
  };

  // ---------- Модалки ----------
  fx.modal = (html, onMount, cls) => {
    const m = document.getElementById('modal');
    m.innerHTML = `<div class="modal-backdrop" data-close></div><div class="modal-card ${cls || ''}"><button class="modal-x" data-close aria-label="close">✕</button>${html}</div>`;
    m.hidden = false;
    document.body.classList.add('modal-open');
    m.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', fx.closeModal));
    onMount && onMount(m);
  };
  fx.closeModal = () => {
    const m = document.getElementById('modal');
    if (m.hidden) return;
    m.hidden = true; m.innerHTML = '';
    document.body.classList.remove('modal-open');
  };
  fx.confirm = (text) => new Promise((res) => {
    fx.modal(`<div class="confirm">${C.mascot({ size: 90, mood: 'think' })}<p>${text}</p><div class="row-center"><button class="btn ghost" data-no>${C.t('cancel')}</button><button class="btn primary" data-yes>${C.t('ok')}</button></div></div>`, (m) => {
      m.querySelector('[data-yes]').onclick = () => { fx.closeModal(); res(true); };
      m.querySelectorAll('[data-no],.modal-backdrop,.modal-x').forEach((b) => { b.onclick = () => { fx.closeModal(); res(false); }; });
    }, 'small');
  });

  // ---------- Конфеті ----------
  fx.confetti = (amount) => {
    if (reduced()) return;
    const colors = ['#3b82f6', '#facc15', '#22c55e', '#f97316', '#8b5cf6', '#ec4899', '#22d3ee'];
    const wrap = C.el('<div class="confetti"></div>');
    const n = amount || 80;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('i');
      const shape = i % 3;
      p.className = 's' + shape;
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
      p.style.setProperty('--r', (Math.random() * 1080 - 540) + 'deg');
      p.style.animationDelay = Math.random() * 0.5 + 's';
      p.style.animationDuration = 1.8 + Math.random() * 1.6 + 's';
      wrap.appendChild(p);
    }
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 4200);
  };

  // ---------- Летючі нагороди до лічильників у шапці ----------
  fx.fly = (from, kind, n) => {
    const target = document.getElementById(kind === 'gem' ? 'gemStat' : 'xpStat');
    if (!target || reduced()) return;
    const a = from ? from.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    const b = target.getBoundingClientRect();
    const count = Math.min(8, Math.max(3, Math.round(n / 5)));
    for (let i = 0; i < count; i++) {
      const p = C.el(`<div class="flyer ${kind}">${C.icon(kind === 'gem' ? 'gem' : 'bolt', 18)}</div>`);
      const sx = a.left + a.width / 2 + (Math.random() * 60 - 30), sy = a.top + a.height / 2 + (Math.random() * 30 - 15);
      p.style.left = sx + 'px'; p.style.top = sy + 'px';
      document.body.appendChild(p);
      const dx = b.left + b.width / 2 - sx, dy = b.top + b.height / 2 - sy;
      p.animate([
        { transform: 'translate(0,0) scale(.4)', opacity: 0 },
        { transform: `translate(${dx * 0.1}px, ${-40 - Math.random() * 40}px) scale(1.2)`, opacity: 1, offset: 0.3 },
        { transform: `translate(${dx}px, ${dy}px) scale(.6)`, opacity: 0.9 }
      ], { duration: 900 + i * 90, easing: 'cubic-bezier(.5,0,.3,1)' }).onfinish = () => {
        p.remove();
        target.classList.remove('bump'); void target.offsetWidth; target.classList.add('bump');
      };
    }
  };

  // ---------- Плаваючий текст (+20 XP) ----------
  fx.floatText = (el, text, cls) => {
    if (!el || reduced()) return;
    const r = el.getBoundingClientRect();
    const t = C.el(`<div class="float-text ${cls || ''}">${text}</div>`);
    t.style.left = r.left + r.width / 2 + 'px';
    t.style.top = r.top + 'px';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1400);
  };

  // ---------- Лічильник, що «набігає» ----------
  fx.countUp = (el, to, ms) => {
    if (!el) return;
    if (reduced()) { el.textContent = to; return; }
    const from = 0, start = performance.now(), dur = ms || 900;
    const step = (now) => {
      const k = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // ---------- Поява при прокрутці ----------
  let io = null;
  fx.reveal = (root) => {
    const els = (root || document).querySelectorAll('[data-reveal]:not(.revealed)');
    if (reduced() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('revealed')); return; }
    if (!io) io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target); }
    }), { threshold: 0.12 });
    els.forEach((e, i) => { e.style.transitionDelay = ((+e.dataset.reveal || 0) || (i % 6) * 60) + 'ms'; io.observe(e); });
    (root || document).querySelectorAll('[data-count]').forEach((e) => fx.countUp(e, +e.dataset.count));
  };

  // ---------- Нахил карток за курсором ----------
  document.addEventListener('pointermove', (e) => {
    if (reduced()) return;
    const card = e.target.closest && e.target.closest('.tilt');
    document.querySelectorAll('.tilt.tilting').forEach((c) => { if (c !== card) { c.classList.remove('tilting'); c.style.transform = ''; } });
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.classList.add('tilting');
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    card.style.setProperty('--mx', (x + 0.5) * 100 + '%');
    card.style.setProperty('--my', (y + 0.5) * 100 + '%');
  });

  // ---------- «Хвиля» на кнопках ----------
  document.addEventListener('pointerdown', (e) => {
    const b = e.target.closest && e.target.closest('.btn');
    if (!b || reduced()) return;
    const r = b.getBoundingClientRect();
    const s = C.el('<span class="ripple"></span>');
    const d = Math.max(r.width, r.height);
    s.style.width = s.style.height = d + 'px';
    s.style.left = e.clientX - r.left - d / 2 + 'px';
    s.style.top = e.clientY - r.top - d / 2 + 'px';
    b.appendChild(s);
    setTimeout(() => s.remove(), 600);
    fx.sound('click');
  });

  // ---------- Звуки (WebAudio, без файлів) ----------
  let ac = null;
  function tone(freq, start, dur, type, vol) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, ac.currentTime + start);
    g.gain.setValueAtTime(0.0001, ac.currentTime + start);
    g.gain.exponentialRampToValueAtTime(vol || 0.12, ac.currentTime + start + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(ac.currentTime + start); o.stop(ac.currentTime + start + dur + 0.05);
  }
  const SOUNDS = {
    click: () => tone(900, 0, 0.04, 'triangle', 0.025),
    ok: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.08, 0.22, 'triangle', 0.1)); },
    fail: () => { tone(220, 0, 0.18, 'sawtooth', 0.05); tone(180, 0.12, 0.25, 'sawtooth', 0.05); },
    coin: () => { tone(988, 0, 0.08, 'square', 0.04); tone(1319, 0.07, 0.25, 'square', 0.04); },
    level: () => { [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.09, 0.3, 'triangle', 0.09)); },
    chest: () => { [330, 440, 554, 659, 880].forEach((f, i) => tone(f, i * 0.06, 0.35, 'sine', 0.1)); tone(1760, 0.35, 0.5, 'triangle', 0.05); },
    pop: () => tone(600, 0, 0.08, 'sine', 0.06)
  };
  fx.sound = (name) => {
    if (!S.settings.sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
      SOUNDS[name] && SOUNDS[name]();
    } catch (e) { /* без звуку */ }
  };

  // ---------- Фон із плаваючими символами коду ----------
  fx.codeRain = (canvas) => {
    if (!canvas || reduced()) return () => {};
    const ctx = canvas.getContext('2d');
    const glyphs = ['{ }', '</>', '()', '=>', '[]', ';', 'if', 'for', '#', '==', '++', 'def', 'fn', '&&', '::'];
    let w, h, parts, raf, alive = true;
    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      parts = Array.from({ length: Math.round(w / 70) }, () => ({ x: Math.random() * w, y: Math.random() * h, s: 0.2 + Math.random() * 0.6, g: glyphs[Math.floor(Math.random() * glyphs.length)], o: 0.05 + Math.random() * 0.12, z: 12 + Math.random() * 14 }));
    };
    resize();
    window.addEventListener('resize', resize);
    const loop = () => {
      if (!alive || !document.body.contains(canvas)) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.s * devicePixelRatio;
        if (p.y < -30) { p.y = h + 20; p.x = Math.random() * w; }
        ctx.font = `600 ${p.z * devicePixelRatio}px JetBrains Mono, monospace`;
        ctx.fillStyle = `rgba(120,170,255,${p.o})`;
        ctx.fillText(p.g, p.x, p.y);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { alive = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  };

  // ---------- Озвучка (Web Speech API) ----------
  fx.speaking = false;
  fx.speak = (text, onEnd) => {
    if (!('speechSynthesis' in window)) { fx.toast(C.t('no_voice'), 'bad'); return false; }
    speechSynthesis.cancel();
    const code = { uk: 'uk', ru: 'ru', en: 'en' }[S.lang];
    const voices = speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang.toLowerCase().startsWith(code));
    if (!voice && voices.length) { fx.toast(C.t('no_voice'), 'bad'); return false; }
    // Довгий текст ділимо на речення: деякі браузери обривають довгі фрази.
    const parts = text.replace(/\s+/g, ' ').match(/[^.!?…]+[.!?…]*/g) || [text];
    fx.speaking = true;
    parts.forEach((p, i) => {
      const u = new SpeechSynthesisUtterance(p.trim());
      if (voice) u.voice = voice;
      u.lang = voice ? voice.lang : code;
      u.rate = S.settings.voiceRate || 1;
      if (i === parts.length - 1) u.onend = () => { fx.speaking = false; onEnd && onEnd(); };
      speechSynthesis.speak(u);
    });
    return true;
  };
  fx.stopSpeak = () => { if ('speechSynthesis' in window) speechSynthesis.cancel(); fx.speaking = false; };
  if ('speechSynthesis' in window) speechSynthesis.getVoices();
})();
