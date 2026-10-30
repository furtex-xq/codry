// Мальовані SVG-іконки (24×24, лінійний стиль) і генератор медалей-значків.
(function () {
  const P = {
    flame: '<path d="M12 22c4 0 7-2.7 7-6.6 0-3.2-2-5.4-3.6-7.3-.6 1.7-1.6 2.8-2.9 3.2.4-3.4-1-6.6-4-8.3.3 3.3-1.4 5.1-2.9 7C4.4 11.4 5 13.4 5 15.4 5 19.3 8 22 12 22z"/><path d="M12 22c-1.7 0-3-1.2-3-3 0-1.6 1.2-2.6 2-3.6.3 1 1 1.6 1.8 1.8.2-.9.8-1.6 1.6-2 .5 1 .6 1.9.6 2.8 0 2.2-1.3 4-3 4z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
    gem: '<path d="M6 3h12l4 6-10 12L2 9l4-6z"/><path d="M2 9h20M9 3l3 6 3-6M12 21 9 9M12 21l3-12"/>',
    star: '<path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9L12 2.8z"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M9 7h7M9 11h5"/>',
    code: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/>',
    rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M14.5 4.5C17 2 21 2 21 2s0 4-2.5 6.5L12 15l-3-3 5.5-7.5z"/><path d="M9 12 5.5 11 8 8h4M12 15l1 3.5 3-2.5v-4"/><circle cx="16" cy="8" r="1.4"/>',
    crown: '<path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5L3 7z"/><path d="M5 16h14"/>',
    heart: '<path d="M12 21s-8-5.2-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.8 12 21 12 21z"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
    sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2.5M12 20v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M1.5 12H4M20 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/>',
    check: '<path d="M4 12.5 9 17.5 20 6.5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    puzzle: '<path d="M10 3h4v2.5a1.5 1.5 0 1 0 3 0V3h4v7h-2.5a1.5 1.5 0 1 0 0 3H21v8h-7v-2.5a1.5 1.5 0 1 0-3 0V21H3v-8h2.5a1.5 1.5 0 1 0 0-3H3V3h7z"/>',
    flag: '<path d="M5 22V3M5 4h11l-2 4 2 4H5"/>',
    snow: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7"/><path d="m9 3.5 3 2.5 3-2.5M9 20.5l3-2.5 3 2.5M3 10.5l3.8-.6L5.5 6.3M21 13.5l-3.8.6 1.3 3.6M3 13.5l3.8.6-1.3 3.6M21 10.5l-3.8-.6 1.3-3.6"/>',
    chest: '<rect x="3" y="10" width="18" height="11" rx="2"/><path d="M3 10a9 5 0 0 1 18 0M3 14h18"/><rect x="10" y="12" width="4" height="4" rx="1"/>',
    bug: '<rect x="7" y="7" width="10" height="14" rx="5"/><path d="M12 7v14M9 4l1.5 3M15 4l-1.5 3M3 11h4M17 11h4M3 17h4M17 17h4M4 6l3 3M20 6l-3 3"/>',
    chat: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9h8M8 12h5"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.5A5 5 0 0 1 21.5 19"/>',
    shop: '<path d="M4 9h16l-1.2 11H5.2L4 9z"/><path d="M8.5 9V7a3.5 3.5 0 0 1 7 0v2"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9 15 2 2 4-4"/>',
    medal: '<circle cx="12" cy="15" r="6"/><path d="M8.5 2h7l-2 7.5h-3L8.5 2z"/><path d="m12 12.5.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3.9-1.8z"/>',
    owl: '<path d="M5 9c0-4 3-6 7-6s7 2 7 6v6c0 4-3 6-7 6s-7-2-7-6V9z"/><circle cx="9" cy="10" r="2.2"/><circle cx="15" cy="10" r="2.2"/><path d="m11 13 1 1.5 1-1.5M5 4l2 3M19 4l-2 3"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
    shield: '<path d="M12 2 4 5v6c0 5.5 3.4 9.4 8 11 4.6-1.6 8-5.5 8-11V5l-8-3z"/><path d="m8.5 12 2.5 2.5 4.5-4.5"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/><circle cx="12" cy="15.5" r="1.3"/>',
    volume: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    shrink: '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
    play: '<path d="M7 4.5v15l12-7.5-12-7.5z"/>',
    reset: '<path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/><path d="M3 3v5h5"/>',
    bulb: '<path d="M9 18h6M10 21.5h4M12 2.5a6.5 6.5 0 0 0-4 11.6c.8.6 1 1.4 1 2.4h6c0-1 .2-1.8 1-2.4a6.5 6.5 0 0 0-4-11.6z"/>',
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.8-9.8M17 6l3 3M14.5 8.5l2 2"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    home: '<path d="M3 11 12 3l9 8M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/><path d="M9 3v15M15 6v15"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
    db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    cube: '<path d="M12 2 3 7v10l9 5 9-5V7l-9-5z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
    gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13M12 8S10.5 3 8 3.5 7 8 12 8zM12 8s1.5-5 4-4.5S17 8 12 8z"/>',
    sparkle: '<path d="M12 2c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z"/><path d="M19 15c.3 2 1 2.7 3 3-2 .3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3z"/>',
    pencil: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/><path d="m14 6 4 4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    logout: '<path d="M14 4h5v16h-5M9 8l-4 4 4 4M5 12h11"/>',
    google: '<path d="M21 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7z" fill="#4285F4" stroke="none"/><path d="M12 21.5c2.6 0 4.7-.9 6.3-2.3l-3.1-2.4c-.9.6-1.9.9-3.2.9-2.5 0-4.6-1.7-5.3-3.9H3.5v2.5A9.5 9.5 0 0 0 12 21.5z" fill="#34A853" stroke="none"/><path d="M6.7 13.8a5.7 5.7 0 0 1 0-3.6V7.7H3.5a9.5 9.5 0 0 0 0 8.6l3.2-2.5z" fill="#FBBC05" stroke="none"/><path d="M12 6.3c1.4 0 2.7.5 3.7 1.4l2.7-2.7A9.5 9.5 0 0 0 3.5 7.7l3.2 2.5C7.4 8 9.5 6.3 12 6.3z" fill="#EA4335" stroke="none"/>'
  };

  // icon('flame', 20) → <svg>
  function icon(name, size, cls) {
    return `<svg class="ic ${cls || ''}" width="${size || 20}" height="${size || 20}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.star}</svg>`;
  }

  let uid = 0;
  // Медаль-значок: шестикутник з градієнтом, стрічкою та іконкою.
  function badge(name, c1, c2, size, locked) {
    const id = 'bg' + (++uid);
    const g1 = locked ? '#3a4566' : c1, g2 = locked ? '#252e4a' : c2;
    return `<svg class="badge-svg ${locked ? 'locked' : ''}" width="${size}" height="${size}" viewBox="0 0 100 110" aria-hidden="true">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g1}"/><stop offset="1" stop-color="${g2}"/></linearGradient>
        <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
      </defs>
      <path d="M30 78 22 106l14-6 8 10 6-26z" fill="${locked ? '#2a3352' : g2}" opacity=".9"/>
      <path d="M70 78l8 28-14-6-8 10-6-26z" fill="${locked ? '#2a3352' : g2}" opacity=".9"/>
      <path d="M50 4 88 26v44L50 92 12 70V26z" fill="url(#${id})" stroke="rgba(255,255,255,.35)" stroke-width="3"/>
      <path d="M50 14 79 31v34L50 82 21 65V31z" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2" stroke-dasharray="3 4"/>
      <path d="M50 4 88 26v20C70 40 30 52 12 46V26z" fill="url(#${id}s)"/>
      <g transform="translate(29 27) scale(1.75)" fill="none" stroke="${locked ? '#6b7699' : '#fff'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${locked ? P.lock : (P[name] || P.star)}</g>
    </svg>`;
  }

  window.Codry.icon = icon;
  window.Codry.badge = badge;
  window.Codry.iconNames = Object.keys(P);
})();
