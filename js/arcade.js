// Аркада: рушій трьох ігор (робот, черепашка, змійка). Код учня виконується у Web Worker,
// гра записує кадри, а сторінка їх анімує. Той самий SIM використовується в тестах (node).
(function () {
  'use strict';

  // ---------- Симуляція (рядок, бо виконується всередині Worker) ----------
  const SIM = String.raw`
function simulate(kind, code, data) {
  const logs = [];
  const log = (...a) => { if (logs.length < 200) logs.push(a.map((x) => typeof x === 'object' ? JSON.stringify(x) : String(x)).join(' ')); };
  const runUser = (api) => {
    const names = Object.keys(api);
    const fn = new Function('console', ...names, '"use strict";\n' + code);
    fn({ log, info: log, warn: log, error: log }, ...names.map((n) => api[n]));
  };

  if (kind === 'robot') {
    const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];   // схід, південь, захід, північ
    const results = [];
    for (const rows of data.maps) {
      const H = rows.length, W = Math.max(...rows.map((r) => r.length));
      const cell = (x, y) => (y < 0 || y >= H || x < 0 || x >= W ? '#' : rows[y][x] || '#');
      let x = 0, y = 0, d = 0;
      const gems = new Set();
      let goal = null;
      rows.forEach((r, yy) => [...r].forEach((ch, xx) => {
        if ('>v<^'.includes(ch)) { x = xx; y = yy; d = '>v<^'.indexOf(ch); }
        if (ch === '*') gems.add(xx + ',' + yy);
        if (ch === 'G') goal = [xx, yy];
      }));
      const total = gems.size;
      const frames = [{ x, y, d, got: [] }];
      const got = [];
      let actions = 0, error = null;
      const act = () => { if (++actions > 3000) throw new Error('LIMIT'); };
      const push = () => frames.push({ x, y, d, got: got.slice() });
      const ahead = (dd) => { const [dx, dy] = DIRS[(d + dd + 4) % 4]; return cell(x + dx, y + dy) === '#'; };
      const api = {
        move() { act(); const [dx, dy] = DIRS[d]; if (cell(x + dx, y + dy) === '#') { push(); throw new Error('WALL'); } x += dx; y += dy; push(); },
        turnLeft() { act(); d = (d + 3) % 4; push(); },
        turnRight() { act(); d = (d + 1) % 4; push(); },
        pickUp() { act(); const k = x + ',' + y; if (!gems.has(k)) throw new Error('NOGEM'); gems.delete(k); got.push(k); push(); },
        wallAhead: () => ahead(0), wallRight: () => ahead(1), wallLeft: () => ahead(-1),
        gemHere: () => gems.has(x + ',' + y),
        atGoal: () => !!goal && x === goal[0] && y === goal[1]
      };
      try { runUser(api); } catch (e) { error = e.message === 'WALL' || e.message === 'NOGEM' || e.message === 'LIMIT' ? e.message : String(e && e.message || e); }
      const ok = !error && !!goal && x === goal[0] && y === goal[1] && gems.size === 0;
      results.push({ rows, frames, ok, error, gemsLeft: gems.size, total, atGoal: !!goal && x === goal[0] && y === goal[1] });
      if (!ok) break;
    }
    return { results, logs, ok: results.length === data.maps.length && results.every((r) => r.ok) };
  }

  if (kind === 'turtle') {
    let x = 200, y = 200, a = 0, pen = true, color = '#60a5fa', width = 3;
    const segs = [];
    let n = 0;
    const lim = () => { if (++n > 20000) throw new Error('LIMIT'); };
    const rad = () => a * Math.PI / 180;
    const api = {
      forward(s) { lim(); s = +s || 0; const nx = x + Math.cos(rad()) * s, ny = y + Math.sin(rad()) * s; if (pen) segs.push([x, y, nx, ny, color, width]); x = nx; y = ny; },
      back(s) { api.forward(-(+s || 0)); },
      right(g) { lim(); a += +g || 0; }, left(g) { lim(); a -= +g || 0; },
      penUp() { pen = false; }, penDown() { pen = true; },
      color(c) { color = String(c); }, width(w) { width = Math.max(1, Math.min(20, +w || 1)); },
      goTo(nx, ny) { lim(); if (pen) segs.push([x, y, +nx, +ny, color, width]); x = +nx; y = +ny; },
      circle(r) { const steps = 36; for (let i = 0; i < steps; i++) { api.forward(2 * Math.PI * r / steps); api.right(360 / steps); } }
    };
    let error = null;
    try { runUser(api); } catch (e) { error = e.message === 'LIMIT' ? 'LIMIT' : String(e && e.message || e); }
    return { segs, error, logs, end: [x, y, a] };
  }

  if (kind === 'snake') {
    const W = 20, H = 15;
    let seed = data.seed || 7;
    const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
    let snake = [{ x: 5, y: 7 }, { x: 4, y: 7 }, { x: 3, y: 7 }];
    let dir = 'right', score = 0, error = null, dead = '';
    const free = () => { for (let k = 0; k < 500; k++) { const f = { x: Math.floor(rnd() * W), y: Math.floor(rnd() * H) }; if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f; } return { x: 0, y: 0 }; };
    let food = free();
    const frames = [{ snake: snake.map((s) => [s.x, s.y]), food: [food.x, food.y], score }];
    let decide = null;
    try {
      const names = [];
      const fn = new Function('console', '"use strict";\n' + code + '\n;return typeof move === "function" ? move : null;');
      decide = fn({ log, info: log, warn: log, error: log });
      if (!decide) throw new Error('NOFN');
    } catch (e) { return { frames, score, error: e.message === 'NOFN' ? 'NOFN' : String(e.message || e), logs }; }
    const V = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    const OPP = { up: 'down', down: 'up', left: 'right', right: 'left' };
    for (let t = 0; t < (data.ticks || 500); t++) {
      let next;
      try {
        next = decide({ head: { ...snake[0] }, body: snake.map((s) => ({ ...s })), food: { ...food }, dir, width: W, height: H, score });
      } catch (e) { error = String(e.message || e); break; }
      if (V[next] && next !== OPP[dir]) dir = next;
      const h = { x: snake[0].x + V[dir][0], y: snake[0].y + V[dir][1] };
      if (h.x < 0 || h.y < 0 || h.x >= W || h.y >= H) { dead = 'wall'; break; }
      const eats = h.x === food.x && h.y === food.y;
      const bodyCheck = eats ? snake : snake.slice(0, -1);
      if (bodyCheck.some((s) => s.x === h.x && s.y === h.y)) { dead = 'self'; break; }
      snake.unshift(h);
      if (eats) { score++; food = free(); } else snake.pop();
      frames.push({ snake: snake.map((s) => [s.x, s.y]), food: [food.x, food.y], score });
    }
    return { frames, score, error, dead, logs };
  }
  return { error: 'unknown game' };
}`;

  const WORKER = SIM + `\nonmessage = (e) => { const { kind, code, data } = e.data; let r; try { r = simulate(kind, code, data); } catch (err) { r = { error: String(err && err.message || err) }; } postMessage(r); };`;
  let url = null;

  // Запуск у Worker з тайм-аутом (нескінченний цикл → TIMEOUT).
  function play(kind, code, data, ms) {
    if (!url) url = URL.createObjectURL(new Blob([WORKER], { type: 'text/javascript' }));
    return new Promise((ok) => {
      const w = new Worker(url);
      const timer = setTimeout(() => { w.terminate(); ok({ error: 'TIMEOUT' }); }, ms || 4000);
      w.onmessage = (e) => { clearTimeout(timer); w.terminate(); ok(e.data); };
      w.onerror = (e) => { clearTimeout(timer); w.terminate(); e.preventDefault(); ok({ error: e.message }); };
      w.postMessage({ kind, code, data });
    });
  }

  // Порівняння малюнків черепашки: растр 100×100, частка спільних клітинок (IoU).
  function raster(segs) {
    const set = new Set();
    for (const [x1, y1, x2, y2] of segs) {
      const len = Math.hypot(x2 - x1, y2 - y1), n = Math.max(1, Math.ceil(len / 2));
      for (let i = 0; i <= n; i++) {
        const px = Math.round((x1 + (x2 - x1) * i / n) / 4), py = Math.round((y1 + (y2 - y1) * i / n) / 4);
        for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) set.add((px + dx) + ',' + (py + dy));
      }
    }
    return set;
  }
  function similarity(a, b) {
    const A = raster(a), B = raster(b);
    if (!A.size && !B.size) return 1;
    let inter = 0;
    for (const k of A) if (B.has(k)) inter++;
    return inter / (A.size + B.size - inter);
  }

  const api = { SIM, play, similarity };
  if (typeof window !== 'undefined') window.CodryArcade = api;
  if (typeof module !== 'undefined') module.exports = api;
})();
