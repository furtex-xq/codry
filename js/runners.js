// Запуск коду користувача.
//  • JavaScript — у Web Worker (нескінченний цикл зупиняється через 3 с)
//  • Python — Pyodide (справжній CPython у WebAssembly)
//  • SQL — sql.js (справжній SQLite у WebAssembly)
//  • HTML/CSS — ізольований iframe
//  • Java, C++, C#, Go, Lua, Luau — компіляція на сервері Wandbox (безкоштовний публічний API)
(function () {
  'use strict';

  // ================= JavaScript =================
  const WORKER_SRC = `
    function fmt(v, depth) {
      depth = depth || 0;
      if (typeof v === 'string') return depth ? JSON.stringify(v) : v;
      if (v === undefined) return 'undefined';
      if (v === null) return 'null';
      if (typeof v === 'function') return '[Function: ' + (v.name || 'anonymous') + ']';
      if (typeof v === 'bigint') return v.toString() + 'n';
      if (typeof v === 'symbol') return v.toString();
      if (typeof v !== 'object') return String(v);
      if (depth > 3) return Array.isArray(v) ? '[Array]' : '[Object]';
      if (v instanceof Error) return v.name + ': ' + v.message;
      if (v instanceof Date) return v.toISOString();
      if (Array.isArray(v)) return '[' + (v.length ? ' ' + v.map(x => fmt(x, depth + 1)).join(', ') + ' ' : '') + ']';
      if (v instanceof Map) return 'Map(' + v.size + ') {' + [...v].map(([k, x]) => ' ' + fmt(k, depth + 1) + ' => ' + fmt(x, depth + 1)).join(',') + ' }';
      if (v instanceof Set) return 'Set(' + v.size + ') {' + [...v].map(x => ' ' + fmt(x, depth + 1)).join(',') + ' }';
      const keys = Object.keys(v);
      const name = v.constructor && v.constructor !== Object && v.constructor.name ? v.constructor.name + ' ' : '';
      if (!keys.length) return name + '{}';
      return name + '{ ' + keys.map(k => (/^[A-Za-z_$][\\w$]*$/.test(k) ? k : JSON.stringify(k)) + ': ' + fmt(v[k], depth + 1)).join(', ') + ' }';
    }
    function send(level, args) { postMessage({ type: 'log', level, text: args.map(a => fmt(a)).join(' ') }); }
    self.console = {
      log: (...a) => send('log', a), info: (...a) => send('log', a), debug: (...a) => send('log', a),
      warn: (...a) => send('warn', a), error: (...a) => send('error', a),
      table: (d) => send('log', [d])
    };
    self.alert = (m) => send('log', [m]);
    self.prompt = () => null;
    self.onerror = (msg) => { send('error', [String(msg)]); return true; };
    self.onunhandledrejection = (e) => send('error', ['Uncaught (in promise) ' + fmt(e.reason)]);
    onmessage = (e) => {
      try { (0, eval)(e.data); }
      catch (err) { send('error', [(err && err.name ? err.name + ': ' + err.message : String(err))]); }
      postMessage({ type: 'sync-done' });
    };
  `;
  let workerUrl = null, currentWorker = null;

  function runJS(code, onLog, opts) {
    opts = opts || {};
    if (currentWorker) { currentWorker.terminate(); currentWorker = null; }
    if (!workerUrl) workerUrl = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' }));
    return new Promise((resolve) => {
      const w = new Worker(workerUrl);
      currentWorker = w;
      let syncDone = false, finished = false, tailTimer = null;
      const finish = (timedOut) => {
        if (finished) return;
        finished = true;
        clearTimeout(hardTimer); clearTimeout(tailTimer);
        if (timedOut) onLog('error', opts.timeoutText || 'Timeout');
        w.terminate();
        if (currentWorker === w) currentWorker = null;
        resolve();
      };
      const hardTimer = setTimeout(() => { if (!syncDone) finish(true); }, 3000);
      w.onmessage = (e) => {
        const d = e.data;
        if (d.type === 'log') onLog(d.level, d.text);
        else if (d.type === 'sync-done') {
          syncDone = true;
          clearTimeout(hardTimer);
          tailTimer = setTimeout(() => finish(false), opts.tail == null ? 1200 : opts.tail);
        }
      };
      w.onerror = (e) => { onLog('error', e.message); e.preventDefault(); finish(false); };
      w.postMessage(code);
    });
  }

  // ================= Python =================
  const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  let pyPromise = null;
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }
  function loadPython() {
    if (!pyPromise) {
      pyPromise = loadScript(PYODIDE + 'pyodide.js')
        .then(() => window.loadPyodide({ indexURL: PYODIDE }))
        .catch((e) => { pyPromise = null; throw e; });
    }
    return pyPromise;
  }
  async function runPython(code, onLog, opts) {
    opts = opts || {};
    let py = window.__codryPy;
    if (!py) {
      opts.onLoading && opts.onLoading(true);
      try { py = await loadPython(); }
      catch (e) { opts.onLoading && opts.onLoading(false); onLog('error', opts.failText || 'Python failed to load'); return; }
      window.__codryPy = py;
      opts.onLoading && opts.onLoading(false);
    }
    py.setStdout({ batched: (s) => onLog('log', s) });
    py.setStderr({ batched: (s) => onLog('error', s) });
    const stdinLines = (opts.stdin || '').split('\n');
    let si = 0;
    py.setStdin({ stdin: () => (opts.stdin ? (si < stdinLines.length ? stdinLines[si++] : '') : (window.prompt('input()') ?? '')) });
    const globals = py.globals.get('dict')();
    try { await py.runPythonAsync(code, { globals }); }
    catch (err) { onLog('error', cleanTraceback(String((err && err.message) || err))); }
    finally { globals.destroy && globals.destroy(); }
  }
  function cleanTraceback(msg) {
    const out = [];
    let skip = false;
    for (const l of msg.split('\n')) {
      if (/^\s*File "\/lib\//.test(l)) { skip = true; continue; }
      if (skip && /^\s{4}/.test(l)) continue;
      skip = false;
      out.push(l.replace(/File "<exec>", line (\d+), in <module>/, 'Line $1').replace(/File "<exec>", line (\d+)/, 'Line $1'));
    }
    return out.join('\n').trim();
  }

  // ================= SQL (sql.js) =================
  const SQLJS = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';
  let sqlPromise = null;
  function loadSQL() {
    if (!sqlPromise) {
      sqlPromise = loadScript(SQLJS + 'sql-wasm.js')
        .then(() => window.initSqlJs({ locateFile: (f) => SQLJS + f }))
        .catch((e) => { sqlPromise = null; throw e; });
    }
    return sqlPromise;
  }
  // Повертає { results: [{columns, values}], error }
  async function runSQL(setup, code) {
    const SQL = await loadSQL();
    const db = new SQL.Database();
    try {
      if (setup) db.run(setup);
      const results = db.exec(code);
      const changes = db.getRowsModified();
      return { results, changes };
    } catch (e) {
      return { results: [], error: String(e.message || e) };
    } finally { db.close(); }
  }

  // ================= Wandbox =================
  const COMPILERS = {
    java: 'openjdk-jdk-21+35',
    cpp: 'gcc-13.2.0',
    c: 'gcc-13.2.0-c',
    csharp: 'mono-6.12.0.199',
    go: 'go-1.23.2',
    lua: 'lua-5.4.7',
    luau: 'lua-5.4.7'
  };
  async function runRemote(lang, code, onLog, opts) {
    opts = opts || {};
    let src = code;
    if (lang === 'java') src = src.replace(/public\s+(final\s+)?class\s+/g, 'class ');
    if (lang === 'luau') src = luauProgram(code);
    let res = null, busy = false;
    // Тимчасові збої сервера Wandbox (перевантаження контейнерів) — просто повторюємо запит.
    const transient = (s) => /OCI runtime|Resource temporarily unavailable|clone:|^Error: /i.test(s || '');
    for (let attempt = 0; attempt < 5 && !res; attempt++) {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 90000);
      try {
        const r = await fetch('https://wandbox.org/api/compile.json', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ compiler: COMPILERS[lang], code: src, stdin: opts.stdin || '', save: false }),
          signal: ctrl.signal
        });
        const text = await r.text();
        if (r.status === 429 || /too many/i.test(text.slice(0, 80))) { busy = true; throw new Error('busy'); }
        if (transient(text.slice(0, 120))) { busy = true; throw new Error('busy'); }
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const j = JSON.parse(text);
        if (!j.program_output && /OCI runtime|Resource temporarily unavailable|crun:/i.test((j.compiler_error || '') + (j.program_error || '') + (j.compiler_message || ''))) { busy = true; throw new Error('busy'); }
        res = j;
      } catch (e) {
        if (attempt < 4) await new Promise((ok) => setTimeout(ok, 2000 * (attempt + 1)));
      } finally { clearTimeout(timer); }
    }
    if (!res) { onLog('error', busy ? (opts.busyText || 'Server is busy, try again in a few seconds.') : (opts.netText || 'Network error')); return; }
    const strip = (s) => (s || '').replace(/^prog\.\w+:/gm, 'main:').replace(/\n$/, '');
    if (res.compiler_error) onLog('error', strip(res.compiler_error));
    if (res.program_output) res.program_output.replace(/\n$/, '').split('\n').forEach((l) => onLog('log', l));
    if (res.program_error) {
      let err = strip(res.program_error);
      if (lang === 'luau' || lang === 'lua') err = err.replace(/lua: prog\.lua:(\d+):/g, (m, n) => 'line ' + (lang === 'luau' ? Math.max(1, n - LUAU_SHIM_LINES) : n) + ':').replace(/stack traceback:[\s\S]*/, '').trim();
      if (err) onLog('error', err);
    }
    if (res.signal) onLog('error', 'Signal: ' + res.signal);
  }

  // ---------- Luau → Lua 5.4 (спрощено) ----------
  function luauToLua(code) {
    const out = code.split('\n').map((line) => {
      let l = line;
      // `Hello {name}` → ("Hello " .. tostring(name))
      l = l.replace(/`([^`]*)`/g, (m, body) => {
        const parts = [];
        let last = 0;
        body.replace(/\{([^}]+)\}/g, (mm, expr, idx) => {
          if (idx > last) parts.push(JSON.stringify(body.slice(last, idx)));
          parts.push('tostring(' + expr + ')');
          last = idx + mm.length;
        });
        if (last < body.length) parts.push(JSON.stringify(body.slice(last)));
        return '(' + (parts.length ? parts.join(' .. ') : '""') + ')';
      });
      // x += 1 → x = x + (1)
      l = l.replace(/^(\s*)([A-Za-z_][\w.\[\]"']*)\s*(\+|-|\*|\/\/|\/|%|\^|\.\.)=\s*(.+)$/, (m, ind, v, op, rest) => `${ind}${v} = ${v} ${op} (${rest})`);
      // then x += 1 end
      l = l.replace(/(\b(?:then|do|else)\s+)([A-Za-z_][\w.\[\]"']*)\s*(\+|-|\*|\/\/|\/|%|\^|\.\.)=\s*(.+?)(\s+end\b)/g, (m, pre, v, op, rest, end) => `${pre}${v} = ${v} ${op} (${rest})${end}`);
      // типи: local x: number = 1
      l = l.replace(/\blocal\s+([A-Za-z_]\w*)\s*:\s*[\w?{}\[\]<>|.]+(\s*=)/, 'local $1$2');
      // типи параметрів і результату функції
      l = l.replace(/(function\s*[\w.:]*\s*)\(([^)]*)\)(\s*:\s*[\w?{}\[\]<>|.]+)?/, (m, head, params) =>
        head + '(' + params.split(',').map((p) => p.replace(/:\s*[\w?{}\[\]<>|.]+/, '')).join(',') + ')');
      return l;
    }).join('\n');
    return addContinueLabels(out);
  }

  // continue → goto continue_N з міткою ::continue_N:: перед кінцем свого циклу.
  function addContinueLabels(code) {
    if (!/\bcontinue\b/.test(code)) return code;
    const stack = []; // { kind: 'loop'|'block'|'func'|'if'|'repeat', label }
    let expectDo = false, n = 0, out = '', i = 0;
    const re = /--\[\[[\s\S]*?\]\]|--[^\n]*|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|\[\[[\s\S]*?\]\]|\b(for|while|repeat|until|function|if|do|end|continue)\b/g;
    let m;
    while ((m = re.exec(code))) {
      if (!m[1]) continue;
      const kw = m[1];
      out += code.slice(i, m.index);
      i = m.index + kw.length;
      let rep = kw;
      if (kw === 'for' || kw === 'while') { stack.push({ kind: 'loop' }); expectDo = true; }
      else if (kw === 'do') { if (expectDo) expectDo = false; else stack.push({ kind: 'block' }); }
      else if (kw === 'repeat') stack.push({ kind: 'repeat' });
      else if (kw === 'function') stack.push({ kind: 'func' });
      else if (kw === 'if') stack.push({ kind: 'if' });
      else if (kw === 'end' || kw === 'until') {
        const top = stack.pop();
        if (top && top.label) rep = '::' + top.label + ':: ' + kw;
      } else if (kw === 'continue') {
        for (let k = stack.length - 1; k >= 0; k--) {
          if (stack[k].kind === 'func') break;
          if (stack[k].kind === 'loop' || stack[k].kind === 'repeat') {
            stack[k].label = stack[k].label || 'continue_' + (++n);
            rep = 'goto ' + stack[k].label;
            break;
          }
        }
      }
      out += rep;
    }
    return out + code.slice(i);
  }

  // Мінімальна симуляція Roblox API, щоб скрипти з уроків працювали в текстовому режимі.
  const LUAU_SHIM = String.raw`local __print = print
local __tostr = tostring
function tostring(v) if math.type(v) == "float" and v == math.floor(v) and v > -1e15 and v < 1e15 then return string.format("%d", v) end return __tostr(v) end
function print(...) local t = table.pack(...) for i = 1, t.n do t[i] = tostring(t[i]) end __print(table.concat(t, " ")) end
function warn(...) local t = table.pack(...) for i = 1, t.n do t[i] = tostring(t[i]) end __print("⚠ " .. table.concat(t, " ")) end
-- Віртуальний час: task.wait у потоці подій призупиняє його, у головному — «перемотує» час.
local __now, __tasks, __steps = 0, {}, 0
local function __resume(co, ...)
  local ok, err = coroutine.resume(co, ...)
  if not ok then io.stderr:write("lua: " .. tostring(err) .. string.char(10)) end
end
local function __guard() __steps = __steps + 1 if __now > 3600 or __steps > 200000 then error("stopped: the script waited for more than an hour of game time (infinite loop?)", 0) end end
function __runNext()
  local bi
  for i, t in ipairs(__tasks) do if not bi or t.t < __tasks[bi].t then bi = i end end
  if not bi then return false end
  local t = table.remove(__tasks, bi)
  if t.t > __now then __now = t.t end
  __guard()
  if t.co then __resume(t.co, t.dt) else __resume(coroutine.create(t.fn), table.unpack(t.args, 1, t.args.n)) end
  return true
end
local function __runUntil(T)
  while true do
    local bi
    for i, t in ipairs(__tasks) do if t.t <= T and (not bi or t.t < __tasks[bi].t) then bi = i end end
    if not bi then break end
    local t = table.remove(__tasks, bi)
    if t.t > __now then __now = t.t end
    __guard()
    if t.co then __resume(t.co, t.dt) else __resume(coroutine.create(t.fn), table.unpack(t.args, 1, t.args.n)) end
  end
  if T > __now then __now = T end
end
task = {}
function task.wait(n)
  n = n or 0.03
  __guard()
  local co, main = coroutine.running()
  if main then __runUntil(__now + n) return n end
  table.insert(__tasks, { co = co, t = __now + n, dt = n })
  return coroutine.yield()
end
function task.spawn(f, ...) __resume(coroutine.create(f), ...) end
function task.delay(t, f, ...) table.insert(__tasks, { fn = f, t = __now + (t or 0), args = table.pack(...) }) end
function task.defer(f, ...) task.delay(0, f, ...) end
wait, spawn, delay = task.wait, task.spawn, task.delay
function time() return __now end
function tick() return 1700000000 + __now end
function math.clamp(x, a, b) if x < a then return a elseif x > b then return b end return x end
function math.round(x) return math.floor(x + 0.5) end
function math.sign(x) if x > 0 then return 1 elseif x < 0 then return -1 end return 0 end
function string.split(s, sep) local r = {} sep = sep or "," for p in (s .. sep):gmatch("(.-)" .. sep:gsub("%p", "%%%0")) do r[#r + 1] = p end return r end
function table.find(t, v) for i, x in ipairs(t) do if x == v then return i end end return nil end
function table.clear(t) for k in pairs(t) do t[k] = nil end end
local function __mkEvent()
  local ev = { _h = {} }
  function ev:Connect(f) table.insert(self._h, f) local c = { Connected = true } function c.Disconnect() for i, h in ipairs(ev._h) do if h == f then table.remove(ev._h, i) end end c.Connected = false end return c end
  function ev:Fire(...) local hs = {} for i, h in ipairs(self._h) do hs[i] = h end for _, h in ipairs(hs) do task.spawn(h, ...) end end
  function ev:Wait()
    local co, main = coroutine.running()
    if main then
      local fired, args = false, nil
      local c = self:Connect(function(...) fired = true args = table.pack(...) end)
      while not fired and __runNext() do end
      c.Disconnect()
      if args then return table.unpack(args, 1, args.n) end
      return nil
    end
    local c c = self:Connect(function(...) c.Disconnect() __resume(co, ...) end) return coroutine.yield() end
  function ev:Once(f) local c c = self:Connect(function(...) c.Disconnect() f(...) end) return c end
  return ev
end
local __typeof = {}
Vector3 = {}
Vector3.__index = Vector3
function Vector3.new(x, y, z) local v = setmetatable({ X = x or 0, Y = y or 0, Z = z or 0 }, Vector3) v.Magnitude = math.sqrt(v.X ^ 2 + v.Y ^ 2 + v.Z ^ 2) if v.Magnitude == math.floor(v.Magnitude) then v.Magnitude = math.floor(v.Magnitude) end __typeof[v] = "Vector3" return v end
Vector3.__add = function(a, b) return Vector3.new(a.X + b.X, a.Y + b.Y, a.Z + b.Z) end
Vector3.__sub = function(a, b) return Vector3.new(a.X - b.X, a.Y - b.Y, a.Z - b.Z) end
Vector3.__mul = function(a, b) if type(a) == "number" then a, b = b, a end if type(b) == "number" then return Vector3.new(a.X * b, a.Y * b, a.Z * b) end return Vector3.new(a.X * b.X, a.Y * b.Y, a.Z * b.Z) end
Vector3.__eq = function(a, b) return a.X == b.X and a.Y == b.Y and a.Z == b.Z end
Vector3.__tostring = function(v) local function f(n) if n == math.floor(n) then return string.format("%d", n) end return tostring(n) end return f(v.X) .. ", " .. f(v.Y) .. ", " .. f(v.Z) end
Vector3.zero = Vector3.new(0, 0, 0)
Vector3.one = Vector3.new(1, 1, 1)
Color3 = {}
Color3.__index = Color3
Color3.__tostring = function(c) return string.format("%g, %g, %g", c.R, c.G, c.B) end
function Color3.new(r, g, b) local c = setmetatable({ R = r or 0, G = g or 0, B = b or 0 }, Color3) __typeof[c] = "Color3" return c end
function Color3.fromRGB(r, g, b) return Color3.new((r or 0) / 255, (g or 0) / 255, (b or 0) / 255) end
BrickColor = { new = function(n) return setmetatable({ Name = n }, { __tostring = function(s) return s.Name end }) end }
UDim2 = { new = function(a, b, c, d) return setmetatable({ X = { Scale = a, Offset = b }, Y = { Scale = c, Offset = d } }, { __tostring = function() return string.format("{%g, %g}, {%g, %g}", a, b, c, d) end }) end }
CFrame = { new = function(x, y, z) return setmetatable({ Position = Vector3.new(x, y, z) }, { __tostring = function(s) return "CFrame(" .. tostring(s.Position) .. ")" end }) end }
Enum = setmetatable({}, { __index = function(_, cat) return setmetatable({}, { __index = function(_, item) return setmetatable({ Name = item, EnumType = cat }, { __tostring = function() return "Enum." .. cat .. "." .. item end }) end }) end })
local Instance_mt = {}
local __eventNames = {}
for _, n in ipairs({ "PlayerAdded", "Touched", "TouchEnded", "Changed", "ChildAdded", "ChildRemoved", "PlayerAdded", "PlayerRemoving", "MouseClick", "Activated", "MouseButton1Click", "Died", "CharacterAdded", "Heartbeat", "Stepped", "OnServerEvent", "OnClientEvent", "Event", "Triggered", "ChildRemoving", "AncestryChanged", "MouseButton1Down", "Completed", "PromptTriggered", "InputBegan", "HealthChanged" }) do __eventNames[n] = true end
local function __inst(className, name)
  local o = { _p = { ClassName = className, Name = name or className, Parent = nil }, _c = {}, _ev = {} }
  return setmetatable(o, Instance_mt)
end
Instance_mt.__index = function(o, k)
  local p = rawget(o, "_p")
  if p[k] ~= nil then return p[k] end
  local m = Instance_mt[k]
  if m then return m end
  if __eventNames[k] then o._ev[k] = o._ev[k] or __mkEvent() return o._ev[k] end
  for _, ch in ipairs(o._c) do if ch.Name == k then return ch end end
  return nil
end
Instance_mt.__newindex = function(o, k, v)
  local p = rawget(o, "_p")
  if k == "Parent" then
    if p.Parent then for i, ch in ipairs(p.Parent._c) do if ch == o then table.remove(p.Parent._c, i) break end end end
    p.Parent = v
    if v then table.insert(v._c, o) if v._ev.ChildAdded then v._ev.ChildAdded:Fire(o) end end
  else
    local old = p[k]
    p[k] = v
    if old ~= v and o._ev.Changed then o._ev.Changed:Fire(k) end
    if old ~= v and o._ev["P_" .. k] then o._ev["P_" .. k]:Fire() end
    if k == "Health" and p.ClassName == "Humanoid" and old ~= v then
      if o._ev.HealthChanged then o._ev.HealthChanged:Fire(v) end
      if v <= 0 and (old or 0) > 0 and o._ev.Died then o._ev.Died:Fire() end
    end
  end
end
Instance_mt.__tostring = function(o) return o.Name end
function Instance_mt.GetChildren(o) local r = {} for i, c in ipairs(o._c) do r[i] = c end return r end
function Instance_mt.GetDescendants(o) local r = {} local function walk(x) for _, c in ipairs(x._c) do r[#r + 1] = c walk(c) end end walk(o) return r end
function Instance_mt.FindFirstChild(o, n) for _, c in ipairs(o._c) do if c.Name == n then return c end end return nil end
function Instance_mt.WaitForChild(o, n) return o:FindFirstChild(n) end
function Instance_mt.FindFirstChildOfClass(o, n) for _, c in ipairs(o._c) do if c.ClassName == n then return c end end return nil end
function Instance_mt.IsA(o, n) return o.ClassName == n or (n == "BasePart" and (o.ClassName == "Part" or o.ClassName == "MeshPart")) or n == "Instance" end
function Instance_mt.Destroy(o) o.Parent = nil rawget(o, "_p").Destroyed = true end
function Instance_mt.ClearAllChildren(o) for _, c in ipairs(o:GetChildren()) do c:Destroy() end end
function Instance_mt.Clone(o) local n = __inst(o.ClassName) for k, v in pairs(rawget(o, "_p")) do if k ~= "Parent" then rawget(n, "_p")[k] = v end end for _, c in ipairs(o._c) do c:Clone().Parent = n end return n end
function Instance_mt.GetFullName(o) local n = o.Name local p = o.Parent while p and p ~= game do n = p.Name .. "." .. n p = p.Parent end return n end
function Instance_mt.GetAttribute(o, k) return (rawget(o, "_attr") or {})[k] end
function Instance_mt.SetAttribute(o, k, v) local a = rawget(o, "_attr") or {} rawset(o, "_attr", a) a[k] = v end
function Instance_mt.GetPropertyChangedSignal(o, prop) o._ev["P_" .. prop] = o._ev["P_" .. prop] or __mkEvent() return o._ev["P_" .. prop] end
function Instance_mt.FireServer(o, ...) if o._ev.OnServerEvent then o._ev.OnServerEvent:Fire(game.Players.LocalPlayer, ...) end end
function Instance_mt.Fire(o, ...) if o._ev.Event then o._ev.Event:Fire(...) end end
function Instance_mt.TakeDamage(o, n) o.Health = math.max(0, (o.Health or 100) - n) end
function Instance_mt.FireClient(o, player, ...) if o._ev.OnClientEvent then o._ev.OnClientEvent:Fire(...) end end
function Instance_mt.FireAllClients(o, ...) if o._ev.OnClientEvent then o._ev.OnClientEvent:Fire(...) end end
function Instance_mt.InvokeServer(o, ...) local f = rawget(o, "_p").OnServerInvoke if f then return f(game.Players.LocalPlayer, ...) end end
function Instance_mt.Play(o) o.Playing = true print("[Sound] " .. o.Name .. " playing") end
function Instance_mt.Stop(o) o.Playing = false end
function Instance_mt.GetPlayerByUserId(o, id) for _, p in ipairs(o:GetChildren()) do if p.UserId == id then return p end end return nil end
local __defaults = {
  Part = { Size = Vector3.new(4, 1, 2), Position = Vector3.new(0, 0, 0), Anchored = false, CanCollide = true, Transparency = 0, Color = Color3.fromRGB(163, 162, 165), Material = "Plastic" },
  Humanoid = { Health = 100, MaxHealth = 100, WalkSpeed = 16, JumpPower = 50 },
  IntValue = { Value = 0 }, NumberValue = { Value = 0 }, StringValue = { Value = "" }, BoolValue = { Value = false },
  PointLight = { Brightness = 1, Range = 8 }, Sound = { Volume = 0.5, Playing = false },
  TextLabel = { Text = "Label", TextSize = 14 }, TextButton = { Text = "Button" }, ScreenGui = {}, Frame = {}
}
Instance = {}
function Instance.new(className, parent)
  local o = __inst(className)
  for k, v in pairs(__defaults[className] or {}) do rawget(o, "_p")[k] = v end
  if parent then o.Parent = parent end
  return o
end
game = __inst("DataModel", "Game")
workspace = Instance.new("Workspace") workspace.Name = "Workspace" workspace.Parent = game
game.Workspace = workspace
local __services = { Workspace = workspace }
for _, s in ipairs({ "Players", "ReplicatedStorage", "ServerStorage", "Lighting", "StarterGui", "RunService", "TweenService", "UserInputService", "SoundService", "Debris", "DataStoreService", "MarketplaceService", "ServerScriptService", "StarterPack", "Teams" }) do
  local sv = Instance.new(s) sv.Name = s sv.Parent = game __services[s] = sv
end
function Instance_mt.GetService(o, n) return __services[n] end
local Players = __services.Players
function Players.GetPlayers(o) local r = {} for _, p in ipairs(o._c) do if p.ClassName == "Player" then r[#r + 1] = p end end return r end
function Players.GetPlayerFromCharacter(o, ch) for _, p in ipairs(o:GetPlayers()) do if p.Character == ch then return p end end return nil end
local __uid, __ids = 1000, {}
function __services.Debris.AddItem(o, item, t) end
function __services.TweenService.Create(o, inst, info, goal)
  local tw = { Completed = __mkEvent(), PlaybackState = "Begin" }
  function tw.Play() tw.PlaybackState = "Playing" print("[Tween] " .. inst.Name .. " started (" .. tostring(info.Time) .. "s)") task.delay(info.Time, function() for k, v in pairs(goal) do inst[k] = v end tw.PlaybackState = "Completed" tw.Completed:Fire("Completed") end) end
  function tw.Cancel() tw.PlaybackState = "Cancelled" end
  return tw
end
TweenInfo = { new = function(t, ...) return { Time = t or 1 } end }
__services.Lighting.ClockTime = 14
__services.Lighting.Brightness = 2
local __store = {}
function __services.DataStoreService.GetDataStore(o, name)
  __store[name] = __store[name] or {}
  local s = __store[name]
  return { GetAsync = function(_, k) return s[k] end, SetAsync = function(_, k, v) s[k] = v end, UpdateAsync = function(_, k, f) s[k] = f(s[k]) return s[k] end }
end
-- Допоміжні функції симулятора Codry (у справжньому Roblox їх немає — гравці заходять самі).
Simulator = {}
function Simulator.__char(p)
  local ch = Instance.new("Model") ch.Name = p.Name
  Instance.new("Humanoid", ch)
  local root = Instance.new("Part", ch) root.Name = "HumanoidRootPart"
  local head = Instance.new("Part", ch) head.Name = "Head"
  ch.Parent = workspace
  p.Character = ch
  return ch
end
function Simulator.respawn(p)
  if p.Character then p.Character:Destroy() end
  local ch = Simulator.__char(p)
  if p._ev.CharacterAdded then p._ev.CharacterAdded:Fire(ch) end
  return ch
end
function Simulator.addPlayer(name)
  -- той самий нік = той самий акаунт (UserId), як при повторному вході в гру
  local id = name and __ids[name]
  if not id then __uid = __uid + 1 id = __uid if name then __ids[name] = id end end
  local p = Instance.new("Player") p.Name = name or ("Player" .. id) p.UserId = id
  Instance.new("PlayerGui", p) Instance.new("Backpack", p)
  local ch = Simulator.__char(p)
  p.Parent = Players
  if not Players.LocalPlayer then Players.LocalPlayer = p end
  if Players._ev.PlayerAdded then Players._ev.PlayerAdded:Fire(p) end
  if p._ev.CharacterAdded then p._ev.CharacterAdded:Fire(ch) end
  return p
end
function Simulator.touch(part, byPart) if part._ev.Touched then part._ev.Touched:Fire(byPart) end end
function Simulator.click(detector, player) if detector._ev.MouseClick then detector._ev.MouseClick:Fire(player or Players.LocalPlayer) end end
function Simulator.fire(obj, eventName, ...) if obj._ev[eventName] then obj._ev[eventName]:Fire(...) end end
function Simulator.wait(n) task.wait(n) end
function Simulator.__flush() __runUntil(math.huge) end
function Simulator.removePlayer(p) if Players._ev.PlayerRemoving then Players._ev.PlayerRemoving:Fire(p) end p.Parent = nil end
function typeof(v) if __typeof[v] then return __typeof[v] end local mt = getmetatable(v) if mt == Instance_mt then return "Instance" end return type(v) end`;
  function luauProgram(code) { return LUAU_SHIM + '\n' + luauToLua(code) + '\nSimulator.__flush()'; }
  const LUAU_SHIM_LINES = LUAU_SHIM.split('\n').length + 1;

  // ================= HTML / CSS перевірка =================
  function runWebCheck(html, checkFn) {
    return new Promise((resolve) => {
      const id = 'c' + Math.random().toString(36).slice(2);
      const f = document.createElement('iframe');
      f.setAttribute('sandbox', 'allow-scripts allow-forms');
      f.style.cssText = 'position:fixed;left:-9999px;top:0;width:1024px;height:768px;border:0;visibility:hidden';
      const script = `<script>var __done=false;function __run(){if(__done)return;__done=true;setTimeout(function(){var r=false;try{r=!!(${checkFn.toString()})(document,window)}catch(e){r=false}parent.postMessage({__codry:'${id}',ok:r},'*')},80)}window.addEventListener('load',__run);document.addEventListener('DOMContentLoaded',function(){setTimeout(__run,2500)});<\/script>`;
      const onMsg = (e) => { if (e.data && e.data.__codry === id) done(e.data.ok); };
      const timer = setTimeout(() => done(false), 5000);
      function done(ok) { clearTimeout(timer); window.removeEventListener('message', onMsg); f.remove(); resolve(ok); }
      window.addEventListener('message', onMsg);
      f.srcdoc = html + script;
      document.body.appendChild(f);
    });
  }

  window.CodryRun = { runJS, runPython, runSQL, runRemote, runWebCheck, loadPython, loadSQL, luauToLua, luauProgram, LUAU_SHIM, COMPILERS };
})();
