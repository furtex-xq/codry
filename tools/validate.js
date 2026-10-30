// Перевірка курсів: структура (3 мови, приклади, тести) + запуск еталонних розв’язків.
//   node tools/validate.js            — усі курси, лише структура та JS
//   node tools/validate.js --run      — + розв’язки через Wandbox (Python, Java, C++, C#, Go, Lua, Luau, SQL)
//   node tools/validate.js python --run
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const args = process.argv.slice(2);
const RUN = args.includes('--run');
const only = args.filter((a) => !a.startsWith('--'));

const store = {};
const ctx = {
  window: {}, console, navigator: { language: 'uk' }, setTimeout, clearTimeout, fetch, AbortController,
  localStorage: { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = v; }, removeItem: (k) => { delete store[k]; } },
  document: { addEventListener() {}, getElementById: () => null }, matchMedia: () => ({ matches: false })
};
ctx.window = ctx;
ctx.window.addEventListener = () => {};
vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
['js/i18n.js', 'js/core.js', 'js/runners.js', 'js/courses/_courses.js'].forEach(load);
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/src="(js\/courses\/[^"]+)"/g)].map((m) => m[1]).filter((f) => !f.endsWith('_courses.js'));
files.forEach(load);
const C = ctx.Codry;

let errors = 0, warns = 0;
const err = (m) => { errors++; console.log('  ✗ ' + m); };
const warn = (m) => { warns++; console.log('  ⚠ ' + m); };

function checkL(v, where) {
  if (v == null) return;
  if (typeof v === 'object' && !Array.isArray(v) && ('uk' in v || 'ru' in v || 'en' in v)) {
    for (const l of ['uk', 'ru', 'en']) if (!v[l] || !String(v[l]).trim()) err(`${where}: немає мови ${l}`);
  }
}

const COMP = { python: 'cpython-3.13.8', java: 'openjdk-jdk-21+35', cpp: 'gcc-13.2.0', csharp: 'mono-6.12.0.199', go: 'go-1.23.2', lua: 'lua-5.4.7', luau: 'lua-5.4.7', sql: 'sqlite-3.46.1' };
async function wandbox(lang, code, stdin) {
  if (args.includes('--godbolt')) return viaGodbolt(lang, code, stdin);
  let src = code;
  if (lang === 'java') src = src.replace(/public\s+(final\s+)?class\s+/g, 'class ');
  let lastErr = "";
  if (lang === 'luau') src = ctx.CodryRun.luauProgram(code);
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      await new Promise((r) => setTimeout(r, 700));
      const r = await fetch('https://wandbox.org/api/compile.json', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ compiler: COMP[lang], code: src, stdin: stdin || '' }) });
      const text = await r.text();
      if (/^Error: |OCI runtime|Resource temporarily/i.test(text.slice(0, 200))) { lastErr = 'rate limit'; await new Promise((r) => setTimeout(r, 8000 + attempt * 4000)); continue; }
      const j = JSON.parse(text);
      if (!j.program_output && /OCI runtime|Resource temporarily|crun:/i.test((j.compiler_error || '') + (j.program_error || ''))) { lastErr = 'oci'; await new Promise((r) => setTimeout(r, 5000 + attempt * 3000)); continue; }
      return { out: (j.program_output || '').replace(/\n$/, ''), err: (j.compiler_error || '') + (j.program_error || '') };
    } catch (e) { lastErr = String(e.cause || e); await new Promise((r) => setTimeout(r, 2500 * (attempt + 1))); }
  }
  return { out: "", err: "network " + lastErr };
}
// Той самий запасний сервер, що й на сайті (Compiler Explorer).
async function viaGodbolt(lang, code, stdin) {
  let src = code;
  if (lang === 'java') src = src.replace(/public\s+(final\s+)?class\s+/g, 'class ');
  if (lang === 'luau') src = ctx.CodryRun.luauProgram(code);
  let lastErr = '';
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      await new Promise((r) => setTimeout(r, 400));
      const j = await ctx.CodryRun.godbolt(lang, src, stdin);
      return { out: (j.program_output || '').replace(/\n$/, ''), err: (j.compiler_error || '') + (j.program_error || '') };
    } catch (e) { lastErr = String(e); await new Promise((r) => setTimeout(r, 3000 * (attempt + 1))); }
  }
  return { out: '', err: 'network ' + lastErr };
}
async function runNodeJS(code) {
  const out = [];
  const fmt = (v, d) => {
    d = d || 0;
    if (typeof v === 'string') return d ? JSON.stringify(v) : v;
    if (v === undefined) return 'undefined';
    if (v === null) return 'null';
    if (typeof v === 'function') return '[Function: ' + (v.name || 'anonymous') + ']';
    if (typeof v !== 'object') return String(v);
    if (Array.isArray(v)) return '[' + (v.length ? ' ' + v.map((x) => fmt(x, d + 1)).join(', ') + ' ' : '') + ']';
    if (v instanceof Map) return 'Map(' + v.size + ') {' + [...v].map(([k, x]) => ' ' + fmt(k, d + 1) + ' => ' + fmt(x, d + 1)).join(',') + ' }';
    if (v instanceof Set) return 'Set(' + v.size + ') {' + [...v].map((x) => ' ' + fmt(x, d + 1)).join(',') + ' }';
    if (v instanceof Error) return v.name + ': ' + v.message;
    const keys = Object.keys(v);
    const name = v.constructor && v.constructor !== Object && v.constructor.name ? v.constructor.name + ' ' : '';
    if (!keys.length) return name + '{}';
    return name + '{ ' + keys.map((k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)) + ': ' + fmt(v[k], d + 1)).join(', ') + ' }';
  };
  const con = { log: (...a) => out.push(a.map((x) => fmt(x)).join(' ')), info: (...a) => out.push(a.map((x) => fmt(x)).join(' ')), warn() {}, error() {}, table: (x) => out.push(fmt(x)) };
  let err = '';
  try { vm.runInNewContext(code, { console: con, setTimeout, clearTimeout, setInterval, clearInterval, Math, JSON, Date, Promise, Map, Set }, { timeout: 2000 }); }
  catch (e) { err = String(e); }
  if (/setTimeout|async|Promise|await/.test(code)) await new Promise((r) => setTimeout(r, 1300));
  return { out: out.join('\n'), err };
}
const norm = (s) => String(s).replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').trim();

(async () => {
  const jobs = [];
  for (const c of C.courses) {
    if (only.length && !only.includes(c.id)) continue;
    console.log(`\n■ ${c.id}: ${c.steps.length} кроків`);
    const ids = new Set();
    c.steps.forEach((s, i) => {
      const w = `${c.id}#${i + 1} ${s.id}`;
      if (ids.has(s.id)) err(`${w}: повторний id`);
      ids.add(s.id);
      ['title', 'theory', 'why', 'mistakes', 'chapter'].forEach((k) => checkL(s[k], `${w}.${k}`));
      if (!s.theory) err(`${w}: немає теорії`);
      if (!s.why) warn(`${w}: немає «чому»`);
      if (!s.examples || s.examples.length < 3) warn(`${w}: прикладів ${s.examples ? s.examples.length : 0}`);
      (s.examples || []).forEach((e, k) => { checkL(e.title, `${w}.ex${k}.title`); checkL(e.note, `${w}.ex${k}.note`); if (!e.code) err(`${w}.ex${k}: немає коду`); });
      if (!s.task) { err(`${w}: немає завдання`); return; }
      checkL(s.task.text, `${w}.task.text`); checkL(s.task.hint, `${w}.task.hint`);
      (s.task.how || []).forEach((h, k) => checkL(h, `${w}.how${k}`));
      if (!s.task.solution) err(`${w}: немає розв’язку`);
      const web = c.lang === 'html' || c.lang === 'css';
      if (!web && c.lang !== 'sql' && s.task.expected == null && !s.task.check) err(`${w}: немає expected/check`);
      if (web && !s.task.check) err(`${w}: немає check`);
      if (s.quiz) { checkL(s.quiz.q, `${w}.quiz`); checkL(s.quiz.explain, `${w}.quiz.explain`); if (s.quiz.answer >= s.quiz.options.length) err(`${w}: quiz.answer поза межами`); s.quiz.options.forEach((o, k) => checkL(o, `${w}.quiz.o${k}`)); }
      else warn(`${w}: немає тесту`);
      (s.ref || []).forEach((r, k) => checkL(r.d, `${w}.ref${k}`));
      if (c.lang === 'javascript') jobs.push(async () => {
        const r = await runNodeJS(s.task.solution);
        const ok = s.task.check ? s.task.check(r.out, s.task.solution) : norm(r.out) === norm(s.task.expected) && (!s.task.must || s.task.must.test(s.task.solution));
        if (!ok) err(`${w}: розв’язок не проходить перевірку\n      out: ${JSON.stringify(r.out)} ${r.err}\n      exp: ${JSON.stringify(s.task.expected)}`);
        const st = s.task.starter ? C.tr(s.task.starter) : '';
        if (st.trim()) { const r2 = await runNodeJS(st); const ok2 = s.task.check ? s.task.check(r2.out, st) : norm(r2.out) === norm(s.task.expected); if (ok2) warn(`${w}: стартовий код уже проходить перевірку`); }
      }); else if (RUN && COMP[c.lang] && c.lang !== 'sql') {
        jobs.push(async () => {
          const r = await wandbox(c.lang, s.task.solution, s.task.stdin);
          const ok = s.task.check ? s.task.check(r.out, s.task.solution) : norm(r.out) === norm(s.task.expected) && (!s.task.must || s.task.must.test(s.task.solution));
          if (!ok) err(`${w}: розв’язок не проходить\n      out: ${JSON.stringify(r.out)}\n      err: ${r.err.slice(0, 400)}\n      exp: ${JSON.stringify(s.task.expected)}`);
          else process.stdout.write('.');
          const st = s.task.starter ? C.tr(s.task.starter) : '';
          if (st.trim() && st !== s.task.solution) {
            const r2 = await wandbox(c.lang, st, s.task.stdin);
            const ok2 = s.task.check ? s.task.check(r2.out, st) : norm(r2.out) === norm(s.task.expected);
            if (ok2) warn(`${w}: стартовий код уже проходить перевірку`);
          }
        });
        if (process.argv.includes('--examples')) (s.examples || []).forEach((e, k) => jobs.push(async () => {
          if (/input\(|Scanner|cin\s*>>|ReadLine|bufio|io\.read/.test(C.tr(e.code))) return;
          const r = await wandbox(c.lang, C.tr(e.code));
          if (process.argv.includes('--show')) console.log(`\n--- ${w}.ex${k}\n${r.out}${r.err ? '\nERR: ' + r.err.slice(0, 300) : ''}`);
          if (r.err && !/Error|error|panic|Exception/.test(C.tr(e.note || '') + C.tr(e.title || ''))) warn(`${w}.ex${k}: помилка в прикладі: ${r.err.slice(0, 200)}`);
        }));
      }
    });
  }
  // Паралельно по 4 запити
  let i = 0;
  await Promise.all(Array.from({ length: 1 }, async () => { while (i < jobs.length) { const j = jobs[i++]; await j(); } }));
  console.log(`\n\nПомилок: ${errors}, попереджень: ${warns}`);
  process.exit(errors ? 1 : 0);
})();
