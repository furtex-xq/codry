// Сторінки: Пісочниця (усі мови), Довідник.
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, t = C.t, tr = C.tr, esc = C.esc;

  const PG = {
    python: ['Python', 'main.py', 'import random\n\nnums = [random.randint(1, 100) for _ in range(5)]\nprint("Numbers:", nums)\nprint("Max:", max(nums))\n'],
    javascript: ['JavaScript', 'script.js', 'const emojis = ["🚀", "🔥", "✨"];\nemojis.forEach((e, i) => console.log(i + 1, e));\n'],
    html: ['HTML/CSS/JS', 'index.html', '<!doctype html>\n<html>\n<head>\n<style>\n  body { font-family: sans-serif; display: grid; place-items: center; height: 90vh; background: #0b1020; color: white; }\n  button { font-size: 20px; padding: 12px 24px; border-radius: 12px; border: 0; background: #3b82f6; color: white; cursor: pointer; }\n</style>\n</head>\n<body>\n  <div>\n    <h1 id="t">Click!</h1>\n    <button onclick="n++; t.textContent = \'Clicks: \' + n">+1</button>\n  </div>\n  <script>let n = 0;</script>\n</body>\n</html>\n'],
    sql: ['SQL', 'query.sql', "CREATE TABLE pets (name TEXT, kind TEXT, age INTEGER);\nINSERT INTO pets VALUES ('Rex', 'dog', 3), ('Murka', 'cat', 5), ('Kesha', 'parrot', 2);\n\nSELECT * FROM pets ORDER BY age;\n"],
    java: ['Java', 'Main.java', 'public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            System.out.println("Hello from Java #" + i);\n        }\n    }\n}\n'],
    cpp: ['C++', 'main.cpp', '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from C++!" << endl;\n    return 0;\n}\n'],
    csharp: ['C#', 'Program.cs', 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello from C#!");\n    }\n}\n'],
    go: ['Go', 'main.go', 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}\n'],
    lua: ['Lua', 'main.lua', 'for i = 1, 3 do\n  print("Hello from Lua #" .. i)\nend\n'],
    luau: ['Luau (Roblox)', 'Script.lua', 'local part = Instance.new("Part")\npart.Name = "Lava"\npart.Parent = workspace\n\npart.Touched:Connect(function(hit)\n  print(hit.Name .. " touched the lava!")\nend)\n\nlocal player = Simulator.addPlayer("Alex")\nSimulator.touch(part, player.Character.Head)\n']
  };

  C.pages.playground = (lang) => {
    if (!PG[lang]) lang = C.LS.get('pg:lang', 'python');
    C.LS.set('pg:lang', lang);
    const runner = C.runnerOf(lang), isWeb = runner === 'web', hasStdin = runner === 'py' || runner === 'remote';
    C.app.innerHTML = `<div class="page pg">
      <div class="pg-head" data-reveal><div><h1 class="page-title">${C.icon('code', 30)} ${t('playground_title')}</h1><p class="section-sub left">${t('playground_sub')}</p></div></div>
      <div class="chips scroll" data-reveal>${Object.keys(PG).map((id) => `<a href="#/playground/${id}" class="${id === lang ? 'active' : ''}">${PG[id][0]}</a>`).join('')}</div>
      <div class="pg-grid" data-reveal>
        <div class="workspace solo">
          <div class="ws-bar"><span class="file-tab">${PG[lang][1]}</span>
            <div class="ws-actions"><button class="btn ghost sm icon" id="pgFull" title="${t('fullscreen')}">${C.icon('expand', 17)}</button><button class="btn ghost sm" id="pgReset">${C.icon('reset', 15)}<span>${t('reset')}</span></button><button class="btn primary sm" id="pgRun">${C.icon('play', 15)} ${t('run')}</button></div></div>
          <div class="editor-wrap"><textarea id="pgEditor"></textarea></div>
        </div>
        <div class="out solo">
          <div class="out-tabs"><button class="active">${isWeb ? t('preview') : t('output')}</button></div>
          ${isWeb ? '<div class="out-pane active"><iframe id="pgPreview" sandbox="allow-scripts allow-popups allow-modals allow-forms" title="preview"></iframe></div>'
                  : `<div class="out-pane active console" id="pgConsole"><div class="line muted">${t('output_empty')}</div></div>`}
          ${hasStdin ? `<div class="stdin-box"><small>${t('stdin')} (input / Scanner / cin)</small><textarea id="pgStdin" rows="2" spellcheck="false">${esc(C.LS.get('pg:stdin:' + lang, ''))}</textarea></div>` : ''}
        </div>
      </div>
    </div>`;
    const ed = C.editor(document.getElementById('pgEditor'), lang, () => run());
    ed.setValue(C.LS.get('pg:' + lang, PG[lang][2]));
    const save = C.debounce(() => C.LS.set('pg:' + lang, ed.getValue()), 300);
    const live = C.debounce(() => run(), 400);
    ed.on('change', () => { save(); if (isWeb) live(); });
    const stdin = document.getElementById('pgStdin');
    if (stdin) stdin.oninput = () => C.LS.set('pg:stdin:' + lang, stdin.value);
    let busy = false;
    async function run() {
      if (isWeb) { document.getElementById('pgPreview').srcdoc = C.buildDoc('html', ed.getValue()); return; }
      if (busy) return;
      busy = true;
      G.track('pgrun');
      await C.run(lang, ed.getValue(), document.getElementById('pgConsole'), { stdin: stdin ? stdin.value : '' });
      busy = false;
    }
    document.getElementById('pgRun').onclick = run;
    document.getElementById('pgReset').onclick = async () => { if (await fx.confirm(t('reset_confirm'))) ed.setValue(PG[lang][2]); };
    document.getElementById('pgFull').onclick = () => { document.body.classList.toggle('ws-full'); setTimeout(() => ed.refresh(), 60); };
    if (isWeb) run();
    C.setCleanup(() => document.body.classList.remove('ws-full'));
  };

  // Прихована сторінка для розробника: перевіряє еталонні розв’язки HTML/CSS/SQL прямо в браузері.
  C.pages.dev = async (only) => {
    C.app.innerHTML = '<div class="page"><h1>Dev check</h1><pre id="devOut" class="code" style="white-space:pre-wrap"></pre></div>';
    const out = document.getElementById('devOut');
    const log = (s) => { out.textContent += s + '\n'; };
    let bad = 0, total = 0;
    for (const c of C.courses) {
      const r = C.runnerOf(c.lang);
      if (!['web', 'sql'].includes(r) || (only && only !== c.id)) continue;
      log(`■ ${c.id}`);
      for (const [i, s] of c.steps.entries()) {
        total++;
        let ok, starterOk = false;
        if (r === 'web') {
          ok = await window.CodryRun.runWebCheck(C.buildDoc(c.lang, s.task.solution, s.html), s.task.check);
          const st = tr(s.task.starter) || '';
          if (st.trim()) starterOk = await window.CodryRun.runWebCheck(C.buildDoc(c.lang, st, s.html), s.task.check);
        } else {
          const setup = (s.db != null ? s.db : c.db) || '';
          const res = await window.CodryRun.runSQL(setup, s.task.solution);
          ok = !res.error && (!s.task.check || s.task.check(res, s.task.solution));
          if (res.error) log(`   SQL error: ${res.error}`);
          for (const [k, e] of (s.examples || []).entries()) {
            const er = await window.CodryRun.runSQL(setup, tr(e.code));
            if (er.error && !/error|помилк|ошибк/i.test(tr(e.note || ''))) log(`   ⚠ ${i + 1}.ex${k}: ${er.error}`);
          }
        }
        if (!ok) { bad++; log(`  ✗ ${i + 1} ${s.id}: розв’язок не проходить`); }
        if (starterOk) { bad++; log(`  ✗ ${i + 1} ${s.id}: стартовий код уже проходить`); }
      }
    }
    log(`\nГотово: ${total} кроків, проблем: ${bad}`);
    window.__devResult = { total, bad };
  };

  C.pages.reference = () => {
    C.app.innerHTML = `<div class="page">
      <h1 class="page-title" data-reveal>${C.icon('book', 30)} ${t('reference_title')}</h1>
      <p class="section-sub left" data-reveal>${t('reference_sub')}</p>
      <input class="search" id="refSearch" placeholder="${t('search')}" autocomplete="off">
      <div class="ref-grid" id="refGrid">
        ${C.courses.map((c, ci) => `<div class="ref-col" style="--c1:${c.color};--c2:${c.color2}" data-reveal="${(ci % 4) * 60}">
          <h2>${C.courseBadge(c, 30)} ${c.name}</h2>
          ${c.steps.map((s, i) => (s.ref || []).map((r) => `<a class="ref-item" href="#/learn/${c.id}/${i + 1}" data-q="${esc((r.code + ' ' + tr(r.d) + ' ' + tr(s.title)).toLowerCase())}">
            <code>${esc(r.code)}</code><span>${esc(tr(r.d))}</span></a>`).join('')).join('')}
        </div>`).join('')}
      </div></div>${C.footer()}`;
    document.getElementById('refSearch').oninput = (e) => {
      const q = e.target.value.trim().toLowerCase();
      C.app.querySelectorAll('.ref-item').forEach((a) => { a.hidden = !!q && !a.dataset.q.includes(q); });
      C.app.querySelectorAll('.ref-col').forEach((col) => { col.hidden = !!q && !col.querySelector('.ref-item:not([hidden])'); });
    };
  };
})();
