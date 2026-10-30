// Кодрик — мальований SVG-маскот з емоціями, кольорами та аксесуарами.
(function () {
  const C = window.Codry;

  const COLORS = {
    blue: ['#7cb6ff', '#2563eb', '#dbeafe'],
    green: ['#6ee7a8', '#059669', '#d1fae5'],
    pink: ['#f9a8d4', '#db2777', '#fce7f3'],
    purple: ['#c4b5fd', '#7c3aed', '#ede9fe'],
    orange: ['#fdba74', '#ea580c', '#ffedd5'],
    gold: ['#fde68a', '#d97706', '#fef9c3'],
    mint: ['#99f6e4', '#0d9488', '#ccfbf1'],
    red: ['#fca5a5', '#dc2626', '#fee2e2'],
    night: ['#64748b', '#0f172a', '#cbd5e1']
  };

  const INK = '#0b1020';
  const EYES = {
    normal: `<g class="m-eyes"><ellipse cx="56" cy="66" rx="7" ry="9" fill="${INK}"/><ellipse cx="84" cy="66" rx="7" ry="9" fill="${INK}"/><circle cx="58.5" cy="62.5" r="2.6" fill="#fff"/><circle cx="86.5" cy="62.5" r="2.6" fill="#fff"/></g>`,
    happy: `<path d="M49 68q7-9 14 0M77 68q7-9 14 0" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
    sad: `<g class="m-eyes"><ellipse cx="56" cy="69" rx="6" ry="7" fill="${INK}"/><ellipse cx="84" cy="69" rx="6" ry="7" fill="${INK}"/><circle cx="58" cy="66.5" r="2" fill="#fff"/><circle cx="86" cy="66.5" r="2" fill="#fff"/></g><path d="M47 58l13 4M93 58l-13 4" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    think: `<g class="m-eyes"><ellipse cx="57" cy="64" rx="6.5" ry="8.5" fill="${INK}"/><ellipse cx="85" cy="64" rx="6.5" ry="8.5" fill="${INK}"/><circle cx="60" cy="60" r="2.4" fill="#fff"/><circle cx="88" cy="60" r="2.4" fill="#fff"/></g><path d="M78 53q7-4 14 1" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    surprised: `<circle cx="56" cy="65" r="9.5" fill="#fff" stroke="${INK}" stroke-width="3.5"/><circle cx="84" cy="65" r="9.5" fill="#fff" stroke="${INK}" stroke-width="3.5"/><circle cx="56" cy="65" r="4.5" fill="${INK}"/><circle cx="84" cy="65" r="4.5" fill="${INK}"/>`,
    love: `<path d="M56 74s-9-5.5-9-11a4.8 4.8 0 0 1 9-2.3 4.8 4.8 0 0 1 9 2.3c0 5.5-9 11-9 11zM84 74s-9-5.5-9-11a4.8 4.8 0 0 1 9-2.3 4.8 4.8 0 0 1 9 2.3c0 5.5-9 11-9 11z" fill="#f43f5e"/>`,
    sleepy: `<path d="M49 67h14M77 67h14" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>`,
    cool: `<path d="M42 58h56v4c0 9-6 14-13 14s-12-5-13-11h-4c-1 6-6 11-13 11s-13-5-13-14v-4z" fill="${INK}"/><path d="M48 61h12M80 61h12" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>`,
    wink: `<g class="m-eyes"><ellipse cx="56" cy="66" rx="7" ry="9" fill="${INK}"/><circle cx="58.5" cy="62.5" r="2.6" fill="#fff"/></g><path d="M77 68q7-8 14 0" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
    confused: `<g class="m-eyes"><ellipse cx="56" cy="66" rx="5" ry="6.5" fill="${INK}"/><ellipse cx="84" cy="65" rx="8" ry="10" fill="${INK}"/><circle cx="87" cy="61" r="2.6" fill="#fff"/></g><path d="M48 56l12-3" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    excited: `<path d="m56 56 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8zM84 56l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8z" fill="#facc15" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`,
    oops: `<path d="M50 60l11 6-11 6M90 60l-11 6 11 6" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  };
  const MOUTH = {
    normal: `<path d="M62 80q8 7 16 0" stroke="${INK}" stroke-width="3.8" fill="none" stroke-linecap="round"/>`,
    big: `<path d="M60 78h20q0 12-10 12t-10-12z" fill="${INK}"/><path d="M64 85q6 4 12 0" stroke="#f87171" stroke-width="4" stroke-linecap="round"/>`,
    sad: `<path d="M62 85q8-7 16 0" stroke="${INK}" stroke-width="3.8" fill="none" stroke-linecap="round"/>`,
    o: `<ellipse cx="70" cy="83" rx="5.5" ry="6.5" fill="${INK}"/>`,
    flat: `<path d="M63 82h14" stroke="${INK}" stroke-width="3.8" stroke-linecap="round"/>`,
    wavy: `<path d="M60 83q3.5-4 7 0t7 0 7 0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    smirk: `<path d="M63 82q9 5 15-3" stroke="${INK}" stroke-width="3.8" fill="none" stroke-linecap="round"/>`,
    teeth: `<path d="M60 79h20q-1 10-10 10t-10-10z" fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/><path d="M60 79h20" stroke="${INK}" stroke-width="3"/>`
  };

  const MOODS = {
    idle: { eyes: 'normal', mouth: 'normal' },
    happy: { eyes: 'happy', mouth: 'big' },
    celebrate: { eyes: 'happy', mouth: 'big', arms: 'up', extra: 'confetti' },
    sad: { eyes: 'sad', mouth: 'sad', extra: 'tear' },
    think: { eyes: 'think', mouth: 'flat', extra: 'question', arms: 'chin' },
    surprised: { eyes: 'surprised', mouth: 'o', extra: 'marks' },
    love: { eyes: 'love', mouth: 'big', extra: 'hearts' },
    sleepy: { eyes: 'sleepy', mouth: 'o', extra: 'zzz' },
    cool: { eyes: 'cool', mouth: 'smirk' },
    wink: { eyes: 'wink', mouth: 'smirk', arms: 'wave' },
    proud: { eyes: 'happy', mouth: 'smirk', arms: 'hips', extra: 'sparkle' },
    confused: { eyes: 'confused', mouth: 'wavy', extra: 'question' },
    excited: { eyes: 'excited', mouth: 'teeth', arms: 'up', extra: 'sparkle' },
    oops: { eyes: 'oops', mouth: 'wavy', extra: 'sweat' }
  };

  const EXTRA = {
    tear: '<path class="m-tear" d="M44 76q-4 7 0 9t4-3q0-2-4-6z" fill="#60a5fa"/>',
    question: `<g class="m-float"><text x="112" y="34" font-family="Unbounded,sans-serif" font-weight="800" font-size="26" fill="#facc15" stroke="${INK}" stroke-width="1.5">?</text></g>`,
    marks: '<g class="m-float" stroke="#facc15" stroke-width="4" stroke-linecap="round"><path d="M18 30l8 8M14 46h10M122 30l-8 8M126 46h-10"/></g>',
    hearts: '<g class="m-float"><path d="M118 30s-7-4.4-7-8.8a3.9 3.9 0 0 1 7-1.9 3.9 3.9 0 0 1 7 1.9c0 4.4-7 8.8-7 8.8z" fill="#f43f5e"/><path d="M22 40s-5-3-5-6.2a2.7 2.7 0 0 1 5-1.3 2.7 2.7 0 0 1 5 1.3c0 3.2-5 6.2-5 6.2z" fill="#fb7185"/></g>',
    zzz: `<g class="m-float" font-family="Unbounded,sans-serif" font-weight="800" fill="#93c5fd" stroke="${INK}" stroke-width="1"><text x="108" y="36" font-size="16">z</text><text x="118" y="24" font-size="12">z</text><text x="126" y="14" font-size="9">z</text></g>`,
    sparkle: '<g class="m-twinkle" fill="#facc15"><path d="M120 22c.5 4 2 5.5 6 6-4 .5-5.5 2-6 6-.5-4-2-5.5-6-6 4-.5 5.5-2 6-6z"/><path d="M18 50c.4 3 1.5 4 4.5 4.5-3 .4-4 1.5-4.5 4.5-.4-3-1.5-4-4.5-4.5 3-.4 4-1.5 4.5-4.5z"/></g>',
    sweat: '<path class="m-tear" d="M104 46q-5 8 0 10t5-4q0-2-5-6z" fill="#7dd3fc" stroke="#0b1020" stroke-width="1.5"/>',
    confetti: '<g class="m-confetti"><rect x="14" y="20" width="6" height="10" rx="1.5" fill="#f43f5e" transform="rotate(-20 17 25)"/><rect x="118" y="16" width="6" height="10" rx="1.5" fill="#facc15" transform="rotate(25 121 21)"/><circle cx="128" cy="44" r="3.5" fill="#22c55e"/><circle cx="10" cy="46" r="3.5" fill="#a78bfa"/><rect x="30" y="6" width="5" height="9" rx="1.5" fill="#38bdf8" transform="rotate(35 32 10)"/><rect x="104" y="4" width="5" height="9" rx="1.5" fill="#fb923c" transform="rotate(-30 106 8)"/></g>'
  };

  // Аксесуари малюються поверх голови.
  const ACC = {
    none: '',
    cap: '<path d="M38 36q32-30 64 0z" fill="#ef4444" stroke="#0b1020" stroke-width="2.5"/><path d="M96 34q22 0 26 8-16 2-30-2z" fill="#dc2626" stroke="#0b1020" stroke-width="2.5" stroke-linejoin="round"/><circle cx="70" cy="13" r="3.5" fill="#fff" stroke="#0b1020" stroke-width="2"/>',
    crown: '<path d="M42 38 46 12l13 13 11-18 11 18 13-13 4 26z" fill="#facc15" stroke="#0b1020" stroke-width="2.5" stroke-linejoin="round"/><circle cx="70" cy="26" r="4" fill="#ef4444"/><circle cx="54" cy="30" r="3" fill="#3b82f6"/><circle cx="86" cy="30" r="3" fill="#22c55e"/>',
    wizard: '<path d="M36 40q34 6 68 0L76 -2q-6-6-10 2z" fill="#6d28d9" stroke="#0b1020" stroke-width="2.5" stroke-linejoin="round"/><path d="M60 22l2 4 4 .5-3 2.6.8 4-3.8-2-3.8 2 .8-4-3-2.6 4-.5z" fill="#facc15"/><circle cx="82" cy="30" r="2" fill="#fde68a"/><path d="M34 40q36 10 72 0" stroke="#0b1020" stroke-width="2.5" fill="none"/>',
    headphones: '<path d="M24 66V56a46 40 0 0 1 92 0v10" stroke="#0b1020" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M24 66V56a46 40 0 0 1 92 0v10" stroke="#f43f5e" stroke-width="4.5" fill="none" stroke-linecap="round"/><rect x="12" y="56" width="18" height="28" rx="8" fill="#f43f5e" stroke="#0b1020" stroke-width="2.5"/><rect x="110" y="56" width="18" height="28" rx="8" fill="#f43f5e" stroke="#0b1020" stroke-width="2.5"/>',
    glasses: '<circle cx="56" cy="66" r="12" fill="rgba(255,255,255,.25)" stroke="#0b1020" stroke-width="3.5"/><circle cx="84" cy="66" r="12" fill="rgba(255,255,255,.25)" stroke="#0b1020" stroke-width="3.5"/><path d="M68 65h4M44 63l-8-3M96 63l8-3" stroke="#0b1020" stroke-width="3.5" stroke-linecap="round"/>',
    bow: '<path d="M70 26 52 16q-6 10 0 20zM70 26l18-10q6 10 0 20z" fill="#ec4899" stroke="#0b1020" stroke-width="2.5" stroke-linejoin="round"/><circle cx="70" cy="26" r="5" fill="#f472b6" stroke="#0b1020" stroke-width="2.5"/>',
    party: '<path d="M54 34 70 -2l16 36z" fill="#22d3ee" stroke="#0b1020" stroke-width="2.5" stroke-linejoin="round"/><path d="M60 22l6 2M58 28l14 4M64 12l6 2" stroke="#f43f5e" stroke-width="3" stroke-linecap="round"/><circle cx="70" cy="-2" r="5" fill="#facc15" stroke="#0b1020" stroke-width="2"/>',
    halo: '<ellipse class="m-float" cx="70" cy="10" rx="24" ry="6" fill="none" stroke="#fde047" stroke-width="5"/>',
    beanie: '<path d="M34 42q2-34 36-34t36 34z" fill="#10b981" stroke="#0b1020" stroke-width="2.5"/><path d="M32 42h76" stroke="#0b1020" stroke-width="7" stroke-linecap="round"/><path d="M32 42h76" stroke="#047857" stroke-width="4" stroke-linecap="round"/><circle cx="70" cy="7" r="7" fill="#fbbf24" stroke="#0b1020" stroke-width="2.5"/>',
    grad: '<path d="M30 26 70 10l40 16-40 16z" fill="#1e293b" stroke="#0b1020" stroke-width="2.5" stroke-linejoin="round"/><path d="M48 33v8q22 10 44 0v-8" fill="#334155" stroke="#0b1020" stroke-width="2.5"/><path d="M108 27v18" stroke="#facc15" stroke-width="3"/><circle cx="108" cy="47" r="4" fill="#facc15"/>',
    flower: '<g transform="translate(96 26)"><circle r="6" cx="0" cy="-9" fill="#f9a8d4"/><circle r="6" cx="9" cy="-2" fill="#f9a8d4"/><circle r="6" cx="5" cy="8" fill="#f9a8d4"/><circle r="6" cx="-6" cy="7" fill="#f9a8d4"/><circle r="6" cx="-9" cy="-3" fill="#f9a8d4"/><circle r="5" fill="#facc15" stroke="#0b1020" stroke-width="2"/></g>',
    pirate: '<path d="M32 40q38-48 76 0q-38-8-76 0z" fill="#111827" stroke="#0b1020" stroke-width="2.5"/><circle cx="70" cy="24" r="5" fill="#f8fafc"/><path d="M66 31l8-3M66 28l8 3" stroke="#f8fafc" stroke-width="2"/>'
  };

  let uid = 0;
  function mascot(opts) {
    opts = opts || {};
    const size = opts.size || 120;
    const mood = MOODS[opts.mood] ? opts.mood : 'idle';
    const m = MOODS[mood];
    const col = COLORS[opts.color || (C.state.equip && C.state.equip.color) || 'blue'] || COLORS.blue;
    const acc = ACC[opts.acc != null ? opts.acc : (C.state.equip && C.state.equip.acc) || 'none'] || '';
    const id = 'kd' + (++uid);
    const arms = m.arms || 'down';
    const armL = {
      down: 'M24 86q-12 6-10 20', up: 'M24 80q-16-10-14-28', wave: 'M24 86q-12 6-10 20', chin: 'M24 86q-12 6-10 20', hips: 'M24 80q-12 10 2 20'
    }[arms];
    const armR = {
      down: 'M116 86q12 6 10 20', up: 'M116 80q16-10 14-28', wave: 'M116 82q18-8 16-30', chin: 'M116 86q6 10-14 6', hips: 'M116 80q12 10-2 20'
    }[arms];
    return `<svg class="mascot mood-${mood} ${opts.anim ? 'anim-' + opts.anim : ''} ${opts.cls || ''}" width="${size}" height="${Math.round(size * 150 / 140)}" viewBox="-6 -10 152 160" aria-hidden="true">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="${col[0]}"/><stop offset="1" stop-color="${col[1]}"/></linearGradient>
        <radialGradient id="${id}h" cx=".3" cy=".2" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      </defs>
      <ellipse class="m-shadow" cx="70" cy="144" rx="38" ry="5" fill="#000" opacity=".22"/>
      <g class="m-body">
        <rect x="44" y="120" width="18" height="16" rx="8" fill="${col[1]}" stroke="${INK}" stroke-width="2.5"/>
        <rect x="78" y="120" width="18" height="16" rx="8" fill="${col[1]}" stroke="${INK}" stroke-width="2.5"/>
        <path class="m-arm-l" d="${armL}" stroke="${INK}" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path class="m-arm-l" d="${armL}" stroke="${col[1]}" stroke-width="5.5" fill="none" stroke-linecap="round"/>
        <g class="m-arm-r-g"><path d="${armR}" stroke="${INK}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="${armR}" stroke="${col[1]}" stroke-width="5.5" fill="none" stroke-linecap="round"/></g>
        <line x1="54" y1="34" x2="46" y2="14" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><line x1="54" y1="34" x2="46" y2="14" stroke="${col[1]}" stroke-width="3" stroke-linecap="round"/>
        <line x1="86" y1="34" x2="94" y2="14" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><line x1="86" y1="34" x2="94" y2="14" stroke="${col[1]}" stroke-width="3" stroke-linecap="round"/>
        <circle class="m-bulb" cx="45" cy="12" r="6" fill="#facc15" stroke="${INK}" stroke-width="2.5"/><circle class="m-bulb b2" cx="95" cy="12" r="6" fill="#facc15" stroke="${INK}" stroke-width="2.5"/>
        <rect x="20" y="30" width="100" height="96" rx="44" fill="url(#${id})" stroke="${INK}" stroke-width="3"/>
        <rect x="20" y="30" width="100" height="96" rx="44" fill="url(#${id}h)"/>
        <rect x="32" y="46" width="76" height="52" rx="24" fill="${col[2]}" stroke="${INK}" stroke-width="2.5"/>
        <circle cx="45" cy="82" r="5" fill="#fda4af" opacity=".75"/><circle cx="95" cy="82" r="5" fill="#fda4af" opacity=".75"/>
        ${EYES[m.eyes]}
        ${MOUTH[m.mouth]}
        <text x="70" y="117" text-anchor="middle" font-family="JetBrains Mono,monospace" font-weight="800" font-size="13" fill="${col[2]}" opacity=".9">{ }</text>
        ${acc}
      </g>
      ${m.extra ? EXTRA[m.extra] : ''}
    </svg>`;
  }

  C.mascot = mascot;
  C.mascotMoods = Object.keys(MOODS);
  C.mascotColors = COLORS;
  C.mascotAcc = Object.keys(ACC);
})();
