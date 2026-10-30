// Lua — частина 2: рекурсія, varargs, метатаблиці, співпрограми, алгоритми, модулі, проєкт-квест.
// Кроки вставляються перед фінальними проєктами першої частини.
(function () {
  const L = Codry.L;
  const CH5 = L('Алгоритми, метатаблиці, співпрограми', 'Алгоритмы, метатаблицы, сопрограммы', 'Algorithms, metatables, coroutines');
  const CH4 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');

  Codry.steps('lua', [
    {
      id: 'recursion', chapter: CH5,
      title: L('Рекурсія', 'Рекурсия', 'Recursion'),
      theory: L(
        `<p><b>Рекурсія</b> — це коли функція викликає сама себе. Кожна рекурсивна функція має дві частини:</p>
<ol><li><b>Базовий випадок</b> — коли відповідь відома одразу і викликати себе вже не треба</li><li><b>Рекурсивний крок</b> — задача зводиться до <i>меншої</i> такої самої задачі</li></ol>
<pre class="inline-code">local function factorial(n)
  if n &lt;= 1 then return 1 end      -- базовий випадок
  return n * factorial(n - 1)       -- крок: n! = n · (n-1)!
end
print(factorial(5))  --&gt; 120</pre>
<p>Рекурсія природна для «вкладених» даних: дерева папок, меню з підменю, таблиці в таблицях. Щоб пройти таблицю будь-якої глибини, функція викликає себе для кожної вкладеної таблиці.</p>`,
        `<p><b>Рекурсия</b> — это когда функция вызывает саму себя. У каждой рекурсивной функции есть две части:</p>
<ol><li><b>Базовый случай</b> — когда ответ известен сразу и вызывать себя уже не нужно</li><li><b>Рекурсивный шаг</b> — задача сводится к <i>меньшей</i> такой же задаче</li></ol>
<pre class="inline-code">local function factorial(n)
  if n &lt;= 1 then return 1 end      -- базовый случай
  return n * factorial(n - 1)       -- шаг: n! = n · (n-1)!
end
print(factorial(5))  --&gt; 120</pre>
<p>Рекурсия естественна для «вложенных» данных: деревья папок, меню с подменю, таблицы в таблицах. Чтобы пройти таблицу любой глубины, функция вызывает себя для каждой вложенной таблицы.</p>`,
        `<p><b>Recursion</b> is when a function calls itself. Every recursive function has two parts:</p>
<ol><li>A <b>base case</b> — the answer is known immediately, no more self-calls</li><li>A <b>recursive step</b> — the problem shrinks into a <i>smaller</i> copy of itself</li></ol>
<pre class="inline-code">local function factorial(n)
  if n &lt;= 1 then return 1 end      -- base case
  return n * factorial(n - 1)       -- step: n! = n · (n-1)!
end
print(factorial(5))  --&gt; 120</pre>
<p>Recursion fits “nested” data: folder trees, menus with sub-menus, tables inside tables. To walk a table of any depth, a function calls itself for each nested table.</p>`),
      why: L(`<p>Чому не завжди цикл? Деякі задачі <b>самі по собі</b> рекурсивні: щоб порахувати файли в папці, треба порахувати файли в кожній підпапці — а там ще підпапки. Циклом це писати незручно, бо невідомо, скільки рівнів вкладеності. Рекурсія описує задачу так, як ми її думаємо: «зроби те саме для кожної частини».</p>`,
        `<p>Почему не всегда цикл? Некоторые задачи <b>сами по себе</b> рекурсивны: чтобы посчитать файлы в папке, нужно посчитать файлы в каждой подпапке — а там ещё подпапки. Циклом это писать неудобно, потому что неизвестно, сколько уровней вложенности. Рекурсия описывает задачу так, как мы её думаем: «сделай то же самое для каждой части».</p>`,
        `<p>Why not always a loop? Some problems are recursive <b>by nature</b>: to count files in a folder you count files in each sub-folder — which has its own sub-folders. A loop is awkward because the depth is unknown. Recursion describes the task the way we think about it: “do the same for every part”.</p>`),
      mistakes: L(`<ul><li>Немає базового випадку — <code>stack overflow</code>: функція викликає себе нескінченно.</li><li>Крок не зменшує задачу (<code>f(n)</code> замість <code>f(n - 1)</code>) — той самий результат.</li><li>Рекурсивна локальна функція має бути оголошена як <code>local function f</code>, а не <code>local f = function</code> — інакше всередині <code>f</code> ще не видно.</li></ul>`,
        `<ul><li>Нет базового случая — <code>stack overflow</code>: функция вызывает себя бесконечно.</li><li>Шаг не уменьшает задачу (<code>f(n)</code> вместо <code>f(n - 1)</code>) — тот же результат.</li><li>Рекурсивная локальная функция должна быть объявлена как <code>local function f</code>, а не <code>local f = function</code> — иначе внутри <code>f</code> ещё не видна.</li></ul>`,
        `<ul><li>No base case — <code>stack overflow</code>: the function calls itself forever.</li><li>The step doesn’t shrink the problem (<code>f(n)</code> instead of <code>f(n - 1)</code>) — same result.</li><li>A recursive local function must be <code>local function f</code>, not <code>local f = function</code> — otherwise <code>f</code> isn’t visible inside itself yet.</li></ul>`),
      examples: [
        { title: L('Факторіал і степінь', 'Факториал и степень', 'Factorial and power'), code: `local function factorial(n)
  if n <= 1 then return 1 end
  return n * factorial(n - 1)
end

local function power(base, exp)
  if exp == 0 then return 1 end
  return base * power(base, exp - 1)
end

print(factorial(5), factorial(10))
print(power(2, 10))`, note: L('Кожен виклик чекає на результат меншого.', 'Каждый вызов ждёт результат меньшего.', 'Each call waits for the smaller one.') },
        { title: L('Сума вкладених таблиць', 'Сумма вложенных таблиц', 'Sum of nested tables'), code: `local function deepSum(t)
  local total = 0
  for _, v in ipairs(t) do
    if type(v) == "table" then
      total = total + deepSum(v)
    else
      total = total + v
    end
  end
  return total
end

print(deepSum({1, 2, {3, 4, {5}}, 6}))`, note: L('Глибина вкладеності може бути будь-якою.', 'Глубина вложенности может быть любой.', 'Nesting can be any depth.') },
        { title: L('Дерево меню', 'Дерево меню', 'Menu tree'), code: `local menu = {
  name = "Game",
  children = {
    { name = "Play", children = {} },
    { name = "Settings", children = {
      { name = "Sound", children = {} },
      { name = "Video", children = {} }
    } }
  }
}

local function show(node, depth)
  print(string.rep("  ", depth) .. node.name)
  for _, child in ipairs(node.children) do
    show(child, depth + 1)
  end
end

show(menu, 0)`, note: L('Відступ росте з глибиною.', 'Отступ растёт с глубиной.', 'Indentation grows with depth.') }
      ],
      task: {
        text: L('Напиши рекурсивну функцію <code>fib(n)</code> (fib(0)=0, fib(1)=1, fib(n)=fib(n−1)+fib(n−2)) і функцію <code>countDown(n)</code>, що друкує числа від n до 1, а потім <code>Go!</code>. Виведи <code>fib(10)</code>, потім виклич <code>countDown(3)</code>.', 'Напиши рекурсивную функцию <code>fib(n)</code> (fib(0)=0, fib(1)=1, fib(n)=fib(n−1)+fib(n−2)) и функцию <code>countDown(n)</code>, которая печатает числа от n до 1, а затем <code>Go!</code>. Выведи <code>fib(10)</code>, затем вызови <code>countDown(3)</code>.', 'Write a recursive <code>fib(n)</code> (fib(0)=0, fib(1)=1, fib(n)=fib(n−1)+fib(n−2)) and <code>countDown(n)</code> that prints n down to 1 and then <code>Go!</code>. Print <code>fib(10)</code>, then call <code>countDown(3)</code>.'),
        how: [L('Базовий випадок fib: <code>if n &lt; 2 then return n end</code>.', 'Базовый случай fib: <code>if n &lt; 2 then return n end</code>.', 'fib base case: <code>if n &lt; 2 then return n end</code>.'), L('countDown: якщо <code>n == 0</code> — друкуємо <code>Go!</code>, інакше друкуємо n і викликаємо <code>countDown(n - 1)</code>.', 'countDown: если <code>n == 0</code> — печатаем <code>Go!</code>, иначе печатаем n и вызываем <code>countDown(n - 1)</code>.', 'countDown: if <code>n == 0</code> print <code>Go!</code>, otherwise print n and call <code>countDown(n - 1)</code>.')],
        starter: `local function fib(n)
  -- твій код
end

local function countDown(n)
  -- твій код
end

print(fib(10))
countDown(3)`,
        solution: `local function fib(n)
  if n < 2 then return n end
  return fib(n - 1) + fib(n - 2)
end

local function countDown(n)
  if n == 0 then
    print("Go!")
    return
  end
  print(n)
  countDown(n - 1)
end

print(fib(10))
countDown(3)`,
        hint: L('Очікувано: <code>55</code>, <code>3</code>, <code>2</code>, <code>1</code>, <code>Go!</code>.', 'Ожидается: <code>55</code>, <code>3</code>, <code>2</code>, <code>1</code>, <code>Go!</code>.', 'Expected: <code>55</code>, <code>3</code>, <code>2</code>, <code>1</code>, <code>Go!</code>.'),
        expected: '55\n3\n2\n1\nGo!',
        must: /fib\s*\(\s*n\s*-\s*1\s*\)[\s\S]*countDown\s*\(\s*n\s*-\s*1\s*\)/
      },
      quiz: { q: L('Що станеться без базового випадку?', 'Что случится без базового случая?', 'What happens without a base case?'), options: [L('функція поверне nil', 'функция вернёт nil', 'the function returns nil'), L('переповнення стека (stack overflow)', 'переполнение стека (stack overflow)', 'stack overflow'), L('нічого', 'ничего', 'nothing')], answer: 1, explain: L('Виклики накопичуються, доки не скінчиться пам’ять стека.', 'Вызовы накапливаются, пока не кончится память стека.', 'Calls pile up until the stack runs out.') },
      ref: [{ code: 'local function f(n) if n == 0 then return … end return … f(n - 1) end', d: L('шаблон рекурсії', 'шаблон рекурсии', 'recursion pattern') }]
    },
    {
      id: 'varargs', chapter: CH5,
      title: L('Кілька значень і змінна кількість аргументів', 'Несколько значений и переменное число аргументов', 'Multiple values and varargs'),
      theory: L(
        `<p>Функція в Lua може <b>повертати кілька значень</b>:</p>
<pre class="inline-code">local function minMax(a, b)
  if a &lt; b then return a, b end
  return b, a
end
local lo, hi = minMax(9, 4)   -- lo = 4, hi = 9</pre>
<p>Три крапки <code>...</code> у параметрах означають «будь-яка кількість аргументів»:</p>
<pre class="inline-code">local function sum(...)
  local total = 0
  for _, v in ipairs({...}) do total = total + v end
  return total
end
print(sum(1, 2, 3, 4))  --&gt; 10</pre>
<ul><li><code>{...}</code> — зібрати аргументи в таблицю; <code>select("#", ...)</code> — їхня кількість</li><li><code>table.unpack(t)</code> — навпаки, «розпакувати» таблицю в окремі значення: <code>math.max(table.unpack(scores))</code></li><li>Зайві значення відкидаються, відсутні стають <code>nil</code></li></ul>`,
        `<p>Функция в Lua может <b>возвращать несколько значений</b>:</p>
<pre class="inline-code">local function minMax(a, b)
  if a &lt; b then return a, b end
  return b, a
end
local lo, hi = minMax(9, 4)   -- lo = 4, hi = 9</pre>
<p>Три точки <code>...</code> в параметрах означают «любое количество аргументов»:</p>
<pre class="inline-code">local function sum(...)
  local total = 0
  for _, v in ipairs({...}) do total = total + v end
  return total
end
print(sum(1, 2, 3, 4))  --&gt; 10</pre>
<ul><li><code>{...}</code> — собрать аргументы в таблицу; <code>select("#", ...)</code> — их количество</li><li><code>table.unpack(t)</code> — наоборот, «распаковать» таблицу в отдельные значения: <code>math.max(table.unpack(scores))</code></li><li>Лишние значения отбрасываются, недостающие становятся <code>nil</code></li></ul>`,
        `<p>A Lua function can <b>return several values</b>:</p>
<pre class="inline-code">local function minMax(a, b)
  if a &lt; b then return a, b end
  return b, a
end
local lo, hi = minMax(9, 4)   -- lo = 4, hi = 9</pre>
<p>Three dots <code>...</code> in the parameters mean “any number of arguments”:</p>
<pre class="inline-code">local function sum(...)
  local total = 0
  for _, v in ipairs({...}) do total = total + v end
  return total
end
print(sum(1, 2, 3, 4))  --&gt; 10</pre>
<ul><li><code>{...}</code> packs the arguments into a table; <code>select("#", ...)</code> counts them</li><li><code>table.unpack(t)</code> does the reverse — spreads a table into separate values: <code>math.max(table.unpack(scores))</code></li><li>Extra values are dropped, missing ones become <code>nil</code></li></ul>`),
      why: L(`<p>Кілька результатів позбавляють від «костилів»: не треба створювати таблицю лише для того, щоб повернути мінімум і максимум. А <code>...</code> дозволяє писати зручні функції на кшталт <code>print</code> чи <code>math.max</code>, які приймають скільки завгодно значень — у Roblox так працюють, наприклад, події з різною кількістю параметрів.</p>`,
        `<p>Несколько результатов избавляют от «костылей»: не нужно создавать таблицу только ради того, чтобы вернуть минимум и максимум. А <code>...</code> позволяет писать удобные функции вроде <code>print</code> или <code>math.max</code>, которые принимают сколько угодно значений — в Roblox так работают, например, события с разным количеством параметров.</p>`,
        `<p>Multiple results avoid workarounds: no table just to return a min and a max. And <code>...</code> lets you write handy functions like <code>print</code> or <code>math.max</code> that accept any number of values — Roblox events with varying parameters work this way.</p>`),
      mistakes: L(`<ul><li><code>local t = minMax(9, 4)</code> — збережеться лише <b>перше</b> значення.</li><li><code>#{...}</code> помиляється, якщо серед аргументів є <code>nil</code> — рахуй через <code>select("#", ...)</code>.</li><li>Виклик у дужках <code>(f())</code> обрізає результати до одного.</li></ul>`,
        `<ul><li><code>local t = minMax(9, 4)</code> — сохранится только <b>первое</b> значение.</li><li><code>#{...}</code> ошибается, если среди аргументов есть <code>nil</code> — считай через <code>select("#", ...)</code>.</li><li>Вызов в скобках <code>(f())</code> обрезает результаты до одного.</li></ul>`,
        `<ul><li><code>local t = minMax(9, 4)</code> keeps only the <b>first</b> value.</li><li><code>#{...}</code> is wrong when an argument is <code>nil</code> — use <code>select("#", ...)</code>.</li><li>Wrapping a call in parentheses <code>(f())</code> trims results to one.</li></ul>`),
      examples: [
        { title: L('Кілька результатів', 'Несколько результатов', 'Multiple results'), code: `local function divmod(a, b)
  return a // b, a % b
end

local q, r = divmod(17, 5)
print(q, r)
local onlyFirst = divmod(17, 5)
print(onlyFirst)
print((divmod(17, 5)))`, note: L('Дужки навколо виклику залишають одне значення.', 'Скобки вокруг вызова оставляют одно значение.', 'Parentheses keep a single value.') },
        { title: L('Будь-яка кількість', 'Любое количество', 'Any number'), code: `local function average(...)
  local n = select("#", ...)
  if n == 0 then return 0 end
  local total = 0
  for _, v in ipairs({...}) do total = total + v end
  return total / n
end

print(average(4, 8, 15))
print(average())`, note: L('<code>select("#", ...)</code> — кількість аргументів.', '<code>select("#", ...)</code> — количество аргументов.', '<code>select("#", ...)</code> — argument count.') },
        { title: 'table.unpack', code: `local scores = {12, 45, 7, 30}
print(math.max(table.unpack(scores)))
print(math.min(table.unpack(scores)))
local a, b = table.unpack({"x", "y", "z"})
print(a, b)`, note: L('Таблиця перетворюється на список аргументів.', 'Таблица превращается в список аргументов.', 'A table becomes an argument list.') }
      ],
      task: {
        text: L('Напиши <code>stats(...)</code>, що повертає <b>три</b> значення: кількість аргументів, їхню суму та найбільше. Виведи результат <code>stats(4, 9, 2, 7)</code> одним <code>print</code> (через табуляцію), а потім найменше з таблиці <code>{8, 3, 11}</code> через <code>math.min</code> і <code>table.unpack</code>.', 'Напиши <code>stats(...)</code>, которая возвращает <b>три</b> значения: количество аргументов, их сумму и наибольшее. Выведи результат <code>stats(4, 9, 2, 7)</code> одним <code>print</code> (через табуляцию), а затем наименьшее из таблицы <code>{8, 3, 11}</code> через <code>math.min</code> и <code>table.unpack</code>.', 'Write <code>stats(...)</code> returning <b>three</b> values: the argument count, their sum and the largest. Print <code>stats(4, 9, 2, 7)</code> with one <code>print</code> (tab-separated), then the smallest of <code>{8, 3, 11}</code> using <code>math.min</code> and <code>table.unpack</code>.'),
        how: [L('<code>return select("#", ...), total, math.max(...)</code>', '<code>return select("#", ...), total, math.max(...)</code>', '<code>return select("#", ...), total, math.max(...)</code>'), L('<code>print(stats(4, 9, 2, 7))</code> надрукує всі три значення.', '<code>print(stats(4, 9, 2, 7))</code> напечатает все три значения.', '<code>print(stats(4, 9, 2, 7))</code> prints all three values.')],
        starter: `local function stats(...)
  -- кількість, сума, максимум
end

print(stats(4, 9, 2, 7))`,
        solution: `local function stats(...)
  local total = 0
  for _, v in ipairs({...}) do total = total + v end
  return select("#", ...), total, math.max(...)
end

print(stats(4, 9, 2, 7))
print(math.min(table.unpack({8, 3, 11})))`,
        hint: L('Очікувано: <code>4	22	9</code> і <code>3</code>.', 'Ожидается: <code>4	22	9</code> и <code>3</code>.', 'Expected: <code>4	22	9</code> and <code>3</code>.'),
        expected: '4\t22\t9\n3',
        must: /\.\.\.[\s\S]*table\.unpack/
      },
      quiz: { q: L('Що потрапить у <code>x</code>: <code>local x = f()</code>, де f повертає 1, 2, 3?', 'Что попадёт в <code>x</code>: <code>local x = f()</code>, где f возвращает 1, 2, 3?', 'What is <code>x</code> in <code>local x = f()</code> when f returns 1, 2, 3?'), options: ['1', '3', '{1, 2, 3}'], answer: 0, explain: L('Зайві значення відкидаються.', 'Лишние значения отбрасываются.', 'Extra values are dropped.') },
      ref: [{ code: 'return a, b', d: L('кілька результатів', 'несколько результатов', 'multiple results') }, { code: 'function f(...) local t = {...} end', d: 'varargs' }, { code: 'table.unpack(t)  select("#", ...)', d: L('розпакування, кількість', 'распаковка, количество', 'unpack, count') }]
    },
    {
      id: 'metatables', chapter: CH5,
      title: L('Метатаблиці та оператори', 'Метатаблицы и операторы', 'Metatables and operators'),
      theory: L(
        `<p><b>Метатаблиця</b> — це «інструкція поведінки» для таблиці. Вона каже Lua, що робити, коли таблицю додають, порівнюють, друкують чи шукають у ній неіснуючий ключ. Спеціальні ключі називають <b>метаметодами</b>:</p>
<table class="mini"><tr><td><code>__add</code>, <code>__sub</code>, <code>__mul</code></td><td><code>a + b</code>, <code>a - b</code>, <code>a * b</code></td></tr><tr><td><code>__eq</code>, <code>__lt</code>, <code>__le</code></td><td><code>==</code>, <code>&lt;</code>, <code>&lt;=</code></td></tr><tr><td><code>__tostring</code></td><td><code>tostring(a)</code> і <code>print(a)</code></td></tr><tr><td><code>__index</code></td><td>читання відсутнього ключа</td></tr><tr><td><code>__call</code></td><td>виклик таблиці як функції <code>a()</code></td></tr><tr><td><code>__len</code></td><td><code>#a</code></td></tr></table>
<pre class="inline-code">local Vec = {}
Vec.__index = Vec
Vec.__add = function(a, b) return Vec.new(a.x + b.x, a.y + b.y) end
Vec.__tostring = function(v) return "(" .. v.x .. ", " .. v.y .. ")" end
function Vec.new(x, y) return setmetatable({x = x, y = y}, Vec) end

print(Vec.new(1, 2) + Vec.new(3, 4))  --&gt; (4, 6)</pre>`,
        `<p><b>Метатаблица</b> — это «инструкция поведения» для таблицы. Она говорит Lua, что делать, когда таблицу складывают, сравнивают, печатают или ищут в ней несуществующий ключ. Специальные ключи называют <b>метаметодами</b>:</p>
<table class="mini"><tr><td><code>__add</code>, <code>__sub</code>, <code>__mul</code></td><td><code>a + b</code>, <code>a - b</code>, <code>a * b</code></td></tr><tr><td><code>__eq</code>, <code>__lt</code>, <code>__le</code></td><td><code>==</code>, <code>&lt;</code>, <code>&lt;=</code></td></tr><tr><td><code>__tostring</code></td><td><code>tostring(a)</code> и <code>print(a)</code></td></tr><tr><td><code>__index</code></td><td>чтение отсутствующего ключа</td></tr><tr><td><code>__call</code></td><td>вызов таблицы как функции <code>a()</code></td></tr><tr><td><code>__len</code></td><td><code>#a</code></td></tr></table>
<pre class="inline-code">local Vec = {}
Vec.__index = Vec
Vec.__add = function(a, b) return Vec.new(a.x + b.x, a.y + b.y) end
Vec.__tostring = function(v) return "(" .. v.x .. ", " .. v.y .. ")" end
function Vec.new(x, y) return setmetatable({x = x, y = y}, Vec) end

print(Vec.new(1, 2) + Vec.new(3, 4))  --&gt; (4, 6)</pre>`,
        `<p>A <b>metatable</b> is a “behaviour manual” for a table. It tells Lua what to do when the table is added, compared, printed, or asked for a missing key. The special keys are called <b>metamethods</b>:</p>
<table class="mini"><tr><td><code>__add</code>, <code>__sub</code>, <code>__mul</code></td><td><code>a + b</code>, <code>a - b</code>, <code>a * b</code></td></tr><tr><td><code>__eq</code>, <code>__lt</code>, <code>__le</code></td><td><code>==</code>, <code>&lt;</code>, <code>&lt;=</code></td></tr><tr><td><code>__tostring</code></td><td><code>tostring(a)</code> and <code>print(a)</code></td></tr><tr><td><code>__index</code></td><td>reading a missing key</td></tr><tr><td><code>__call</code></td><td>calling the table like a function <code>a()</code></td></tr><tr><td><code>__len</code></td><td><code>#a</code></td></tr></table>
<pre class="inline-code">local Vec = {}
Vec.__index = Vec
Vec.__add = function(a, b) return Vec.new(a.x + b.x, a.y + b.y) end
Vec.__tostring = function(v) return "(" .. v.x .. ", " .. v.y .. ")" end
function Vec.new(x, y) return setmetatable({x = x, y = y}, Vec) end

print(Vec.new(1, 2) + Vec.new(3, 4))  --&gt; (4, 6)</pre>`),
      why: L(`<p>Метатаблиці — серце Lua: на них побудовані класи, успадкування і навіть увесь API Roblox (<code>Vector3</code>, <code>CFrame</code>, <code>Color3</code> — це таблиці з метатаблицями, тому їх можна додавати й множити). Знаючи метаметоди, ти розумієш, як влаштовані «магічні» об’єкти рушія, і можеш створювати власні.</p>`,
        `<p>Метатаблицы — сердце Lua: на них построены классы, наследование и даже весь API Roblox (<code>Vector3</code>, <code>CFrame</code>, <code>Color3</code> — это таблицы с метатаблицами, поэтому их можно складывать и умножать). Зная метаметоды, ты понимаешь, как устроены «магические» объекты движка, и можешь создавать свои.</p>`,
        `<p>Metatables are the heart of Lua: classes, inheritance and even Roblox’s API are built on them (<code>Vector3</code>, <code>CFrame</code>, <code>Color3</code> are tables with metatables, which is why you can add and multiply them). Knowing metamethods shows you how the engine’s “magic” objects work — and lets you build your own.</p>`),
      mistakes: L(`<ul><li>Забутий <code>setmetatable</code> — <code>attempt to perform arithmetic on a table value</code>.</li><li>Метаметоди пишуться з <b>двома</b> підкресленнями: <code>__add</code>, не <code>_add</code>.</li><li><code>__eq</code> спрацьовує лише для двох таблиць; порівняння таблиці з числом завжди <code>false</code>.</li></ul>`,
        `<ul><li>Забытый <code>setmetatable</code> — <code>attempt to perform arithmetic on a table value</code>.</li><li>Метаметоды пишутся с <b>двумя</b> подчёркиваниями: <code>__add</code>, не <code>_add</code>.</li><li><code>__eq</code> срабатывает только для двух таблиц; сравнение таблицы с числом всегда <code>false</code>.</li></ul>`,
        `<ul><li>Forgetting <code>setmetatable</code> — <code>attempt to perform arithmetic on a table value</code>.</li><li>Metamethods have <b>two</b> underscores: <code>__add</code>, not <code>_add</code>.</li><li><code>__eq</code> only fires for two tables; a table compared with a number is always <code>false</code>.</li></ul>`),
      examples: [
        { title: L('Значення за замовчуванням', 'Значения по умолчанию', 'Default values'), code: `local defaults = { hp = 100, speed = 16 }
local player = setmetatable({ name = "Alex" }, { __index = defaults })
print(player.name, player.hp, player.speed)
player.hp = 70
print(player.hp, defaults.hp)`, note: L('Відсутні ключі шукаються в defaults.', 'Отсутствующие ключи ищутся в defaults.', 'Missing keys are looked up in defaults.') },
        { title: L('Гроші з операторами', 'Деньги с операторами', 'Money with operators'), code: `local Money = {}
Money.__index = Money
function Money.new(c) return setmetatable({ cents = c }, Money) end
Money.__add = function(a, b) return Money.new(a.cents + b.cents) end
Money.__lt = function(a, b) return a.cents < b.cents end
Money.__tostring = function(m) return string.format("$%d.%02d", m.cents // 100, m.cents % 100) end

local price, tip = Money.new(1250), Money.new(175)
print(price + tip)
print(tip < price)`, note: L('<code>__lt</code> дає оператор <code>&lt;</code>.', '<code>__lt</code> даёт оператор <code>&lt;</code>.', '<code>__lt</code> enables <code>&lt;</code>.') },
        { title: '__call / __len', code: `local Deck = setmetatable({ cards = {"A", "K", "Q"} }, {
  __call = function(self) return table.remove(self.cards) end,
  __len = function(self) return #self.cards end
})
print(#Deck)
print(Deck())
print(#Deck)`, note: L('Таблицю можна «викликати» як функцію.', 'Таблицу можно «вызвать» как функцию.', 'A table can be “called” like a function.') }
      ],
      task: {
        text: L('Створи «клас» <code>Vec</code> з <code>Vec.new(x, y)</code> і метаметодами <code>__add</code> (додає вектори), <code>__mul</code> (множить вектор на число: <code>v * 2</code>), <code>__eq</code> і <code>__tostring</code> (формат <code>(4, 6)</code>). Виведи <code>a + b</code>, <code>a * 3</code> і <code>a + b == Vec.new(4, 6)</code>, де <code>a = (1, 2)</code>, <code>b = (3, 4)</code>.', 'Создай «класс» <code>Vec</code> с <code>Vec.new(x, y)</code> и метаметодами <code>__add</code> (складывает векторы), <code>__mul</code> (умножает вектор на число: <code>v * 2</code>), <code>__eq</code> и <code>__tostring</code> (формат <code>(4, 6)</code>). Выведи <code>a + b</code>, <code>a * 3</code> и <code>a + b == Vec.new(4, 6)</code>, где <code>a = (1, 2)</code>, <code>b = (3, 4)</code>.', 'Create a <code>Vec</code> “class” with <code>Vec.new(x, y)</code> and metamethods <code>__add</code> (adds vectors), <code>__mul</code> (vector times number: <code>v * 2</code>), <code>__eq</code> and <code>__tostring</code> (format <code>(4, 6)</code>). Print <code>a + b</code>, <code>a * 3</code> and <code>a + b == Vec.new(4, 6)</code>, where <code>a = (1, 2)</code>, <code>b = (3, 4)</code>.'),
        how: [L('<code>Vec.__mul = function(v, k) return Vec.new(v.x * k, v.y * k) end</code>', '<code>Vec.__mul = function(v, k) return Vec.new(v.x * k, v.y * k) end</code>', '<code>Vec.__mul = function(v, k) return Vec.new(v.x * k, v.y * k) end</code>'), L('<code>__eq</code> порівнює і x, і y.', '<code>__eq</code> сравнивает и x, и y.', '<code>__eq</code> compares both x and y.')],
        starter: `local Vec = {}
Vec.__index = Vec

function Vec.new(x, y)
  return setmetatable({ x = x, y = y }, Vec)
end

-- метаметоди тут

local a, b = Vec.new(1, 2), Vec.new(3, 4)
print(a.x, b.y)`,
        solution: `local Vec = {}
Vec.__index = Vec

function Vec.new(x, y)
  return setmetatable({ x = x, y = y }, Vec)
end

Vec.__add = function(a, b) return Vec.new(a.x + b.x, a.y + b.y) end
Vec.__mul = function(v, k) return Vec.new(v.x * k, v.y * k) end
Vec.__eq = function(a, b) return a.x == b.x and a.y == b.y end
Vec.__tostring = function(v) return "(" .. v.x .. ", " .. v.y .. ")" end

local a, b = Vec.new(1, 2), Vec.new(3, 4)
print(a + b)
print(a * 3)
print(a + b == Vec.new(4, 6))`,
        hint: L('Очікувано: <code>(4, 6)</code>, <code>(3, 6)</code>, <code>true</code>.', 'Ожидается: <code>(4, 6)</code>, <code>(3, 6)</code>, <code>true</code>.', 'Expected: <code>(4, 6)</code>, <code>(3, 6)</code>, <code>true</code>.'),
        expected: '(4, 6)\n(3, 6)\ntrue',
        must: /__add[\s\S]*__mul|__mul[\s\S]*__add/
      },
      quiz: { q: L('Який метаметод викликається для <code>print(obj)</code>?', 'Какой метаметод вызывается для <code>print(obj)</code>?', 'Which metamethod runs for <code>print(obj)</code>?'), options: ['__index', '__tostring', '__call'], answer: 1, explain: L('print викликає tostring, а той — __tostring.', 'print вызывает tostring, а тот — __tostring.', 'print calls tostring, which uses __tostring.') },
      ref: [{ code: 'setmetatable(t, mt)', d: L('призначити метатаблицю', 'назначить метатаблицу', 'set a metatable') }, { code: '__add __eq __lt __tostring __index __call __len', d: L('метаметоди', 'метаметоды', 'metamethods') }]
    },
    {
      id: 'coroutines', chapter: CH5,
      title: L('Співпрограми (coroutine)', 'Сопрограммы (coroutine)', 'Coroutines'),
      theory: L(
        `<p><b>Співпрограма</b> — функція, яку можна <b>поставити на паузу</b> посередині й пізніше продовжити з того самого місця.</p>
<pre class="inline-code">local co = coroutine.create(function()
  print("step 1")
  coroutine.yield()     -- пауза
  print("step 2")
end)
coroutine.resume(co)    --&gt; step 1
coroutine.resume(co)    --&gt; step 2</pre>
<ul><li><code>coroutine.create(f)</code> — створити, <code>coroutine.resume(co, …)</code> — запустити або продовжити</li><li><code>coroutine.yield(v)</code> — пауза; <code>v</code> повертається тому, хто викликав <code>resume</code></li><li><code>coroutine.status(co)</code> — <code>"suspended"</code>, <code>"running"</code> або <code>"dead"</code></li><li><code>coroutine.wrap(f)</code> — зручна форма: повертає функцію, яку достатньо просто викликати</li></ul>
<p>Співпрограми — <b>не</b> паралельність: у кожен момент виконується лише одна, але вони чемно передають одна одній керування.</p>`,
        `<p><b>Сопрограмма</b> — функция, которую можно <b>поставить на паузу</b> посередине и позже продолжить с того же места.</p>
<pre class="inline-code">local co = coroutine.create(function()
  print("step 1")
  coroutine.yield()     -- пауза
  print("step 2")
end)
coroutine.resume(co)    --&gt; step 1
coroutine.resume(co)    --&gt; step 2</pre>
<ul><li><code>coroutine.create(f)</code> — создать, <code>coroutine.resume(co, …)</code> — запустить или продолжить</li><li><code>coroutine.yield(v)</code> — пауза; <code>v</code> возвращается тому, кто вызвал <code>resume</code></li><li><code>coroutine.status(co)</code> — <code>"suspended"</code>, <code>"running"</code> или <code>"dead"</code></li><li><code>coroutine.wrap(f)</code> — удобная форма: возвращает функцию, которую достаточно просто вызывать</li></ul>
<p>Сопрограммы — <b>не</b> параллельность: в каждый момент выполняется только одна, но они вежливо передают друг другу управление.</p>`,
        `<p>A <b>coroutine</b> is a function you can <b>pause</b> midway and resume later from the same spot.</p>
<pre class="inline-code">local co = coroutine.create(function()
  print("step 1")
  coroutine.yield()     -- pause
  print("step 2")
end)
coroutine.resume(co)    --&gt; step 1
coroutine.resume(co)    --&gt; step 2</pre>
<ul><li><code>coroutine.create(f)</code> creates, <code>coroutine.resume(co, …)</code> starts or continues</li><li><code>coroutine.yield(v)</code> pauses; <code>v</code> goes back to whoever called <code>resume</code></li><li><code>coroutine.status(co)</code> is <code>"suspended"</code>, <code>"running"</code> or <code>"dead"</code></li><li><code>coroutine.wrap(f)</code> is the handy form: it returns a function you simply call</li></ul>
<p>Coroutines are <b>not</b> parallel: only one runs at a time, but they politely hand control to each other.</p>`),
      why: L(`<p>У Roblox <code>task.wait()</code> працює саме так: скрипт «засинає» на паузі, а рушій тим часом обробляє інших гравців, фізику й анімації. Співпрограми дозволяють писати покрокову логіку (катсцени, діалоги, хвилі ворогів) звичайним кодом зверху вниз — замість заплутаних лічильників станів.</p>`,
        `<p>В Roblox <code>task.wait()</code> работает именно так: скрипт «засыпает» на паузе, а движок тем временем обрабатывает других игроков, физику и анимации. Сопрограммы позволяют писать пошаговую логику (катсцены, диалоги, волны врагов) обычным кодом сверху вниз — вместо запутанных счётчиков состояний.</p>`,
        `<p>Roblox’s <code>task.wait()</code> works exactly like this: the script “sleeps” on a pause while the engine handles other players, physics and animation. Coroutines let you write step-by-step logic (cutscenes, dialogue, enemy waves) as plain top-to-bottom code instead of tangled state counters.</p>`),
      mistakes: L(`<ul><li><code>resume</code> для завершеної співпрограми повертає <code>false, "cannot resume dead coroutine"</code>.</li><li><code>coroutine.yield()</code> поза співпрограмою — помилка.</li><li>Помилка всередині співпрограми не «вилітає» назовні: перевіряй перше значення <code>resume</code> (<code>ok</code>).</li></ul>`,
        `<ul><li><code>resume</code> для завершённой сопрограммы возвращает <code>false, "cannot resume dead coroutine"</code>.</li><li><code>coroutine.yield()</code> вне сопрограммы — ошибка.</li><li>Ошибка внутри сопрограммы не «вылетает» наружу: проверяй первое значение <code>resume</code> (<code>ok</code>).</li></ul>`,
        `<ul><li><code>resume</code> on a finished coroutine returns <code>false, "cannot resume dead coroutine"</code>.</li><li><code>coroutine.yield()</code> outside a coroutine is an error.</li><li>An error inside a coroutine doesn’t escape: check <code>resume</code>’s first value (<code>ok</code>).</li></ul>`),
      examples: [
        { title: L('Пауза і статус', 'Пауза и статус', 'Pause and status'), code: `local co = coroutine.create(function()
  print("Wave 1")
  coroutine.yield()
  print("Wave 2")
end)
print(coroutine.status(co))
coroutine.resume(co)
print(coroutine.status(co))
coroutine.resume(co)
print(coroutine.status(co))
print(coroutine.resume(co))`, note: L('Після завершення — dead.', 'После завершения — dead.', 'After finishing — dead.') },
        { title: L('Генератор', 'Генератор', 'Generator'), code: `local function range(n)
  return coroutine.wrap(function()
    for i = 1, n do coroutine.yield(i * i) end
  end)
end

for sq in range(5) do
  io.write(sq, " ")
end
print()`, note: L('wrap + yield = свій ітератор для for.', 'wrap + yield = свой итератор для for.', 'wrap + yield = your own for-iterator.') },
        { title: L('Обмін значеннями', 'Обмен значениями', 'Passing values'), code: `local chat = coroutine.wrap(function(name)
  print("Hello, " .. name)
  local answer = coroutine.yield("How old are you?")
  print(name .. " is " .. answer)
  return "bye"
end)

local q = chat("Mila")
print("NPC asks: " .. q)
print(chat(13))`, note: L('Значення з resume стає результатом yield.', 'Значение из resume становится результатом yield.', 'resume’s value becomes yield’s result.') }
      ],
      task: {
        text: L('Зроби співпрограму-«світлофор» через <code>coroutine.wrap</code>: у нескінченному циклі вона по черзі віддає <code>green</code>, <code>yellow</code>, <code>red</code>. Виклич її 5 разів і виведи кожен колір з номером: <code>1 green</code> … <code>5 yellow</code>.', 'Сделай сопрограмму-«светофор» через <code>coroutine.wrap</code>: в бесконечном цикле она по очереди отдаёт <code>green</code>, <code>yellow</code>, <code>red</code>. Вызови её 5 раз и выведи каждый цвет с номером: <code>1 green</code> … <code>5 yellow</code>.', 'Make a “traffic light” coroutine with <code>coroutine.wrap</code>: in an endless loop it yields <code>green</code>, <code>yellow</code>, <code>red</code> in turn. Call it 5 times and print each colour with its number: <code>1 green</code> … <code>5 yellow</code>.'),
        how: [L('Усередині: <code>while true do for _, c in ipairs(colors) do coroutine.yield(c) end end</code>', 'Внутри: <code>while true do for _, c in ipairs(colors) do coroutine.yield(c) end end</code>', 'Inside: <code>while true do for _, c in ipairs(colors) do coroutine.yield(c) end end</code>'), L('Ззовні: <code>for i = 1, 5 do print(i, light()) end</code> — але між номером і кольором має бути пробіл.', 'Снаружи: <code>for i = 1, 5 do print(i, light()) end</code> — но между номером и цветом должен быть пробел.', 'Outside: <code>for i = 1, 5 do print(i, light()) end</code> — but use a space between number and colour.')],
        starter: `local colors = {"green", "yellow", "red"}

local light = coroutine.wrap(function()
  -- нескінченний цикл з yield
end)

-- виклич light() 5 разів`,
        solution: `local colors = {"green", "yellow", "red"}

local light = coroutine.wrap(function()
  while true do
    for _, c in ipairs(colors) do
      coroutine.yield(c)
    end
  end
end)

for i = 1, 5 do
  print(i .. " " .. light())
end`,
        hint: L('Після <code>red</code> знову <code>green</code>: 1 green, 2 yellow, 3 red, 4 green, 5 yellow.', 'После <code>red</code> снова <code>green</code>: 1 green, 2 yellow, 3 red, 4 green, 5 yellow.', 'After <code>red</code> comes <code>green</code> again: 1 green, 2 yellow, 3 red, 4 green, 5 yellow.'),
        expected: '1 green\n2 yellow\n3 red\n4 green\n5 yellow',
        must: /coroutine\.(wrap|create)[\s\S]*coroutine\.yield/
      },
      quiz: { q: L('Що робить <code>coroutine.yield</code>?', 'Что делает <code>coroutine.yield</code>?', 'What does <code>coroutine.yield</code> do?'), options: [L('завершує програму', 'завершает программу', 'ends the program'), L('ставить співпрограму на паузу', 'ставит сопрограмму на паузу', 'pauses the coroutine'), L('запускає новий потік', 'запускает новый поток', 'starts a new thread')], answer: 1, explain: L('Продовжити можна через resume.', 'Продолжить можно через resume.', 'resume continues it.') },
      ref: [{ code: 'coroutine.create / resume / yield / status', d: L('основи', 'основы', 'basics') }, { code: 'coroutine.wrap(f)', d: L('співпрограма як функція', 'сопрограмма как функция', 'coroutine as a function') }]
    },
    {
      id: 'algorithms', chapter: CH5,
      title: L('Алгоритми: сортування і пошук', 'Алгоритмы: сортировка и поиск', 'Algorithms: sorting and searching'),
      theory: L(
        `<p><b>Алгоритм</b> — точний рецепт розв’язання задачі. Два найважливіші — <b>сортування</b> і <b>пошук</b>.</p>
<p><code>table.sort(t, cmp)</code> сортує таблицю на місці. Функція порівняння <code>cmp(a, b)</code> повертає <code>true</code>, якщо <code>a</code> має стояти <b>перед</b> <code>b</code>:</p>
<pre class="inline-code">table.sort(players, function(a, b)
  if a.score ~= b.score then return a.score &gt; b.score end
  return a.name &lt; b.name   -- при рівних очках — за алфавітом
end)</pre>
<p><b>Бінарний пошук</b> у відсортованому масиві: дивимось у середину, і якщо шукане менше — відкидаємо праву половину, інакше ліву. За кожен крок область пошуку зменшується вдвічі: серед мільйона елементів знайдемо за ~20 кроків замість мільйона.</p>
<p><b>Сортування бульбашкою</b> — найпростіший алгоритм для розуміння: сусідні елементи, що стоять не по порядку, міняються місцями, доки масив не відсортується.</p>`,
        `<p><b>Алгоритм</b> — точный рецепт решения задачи. Два самых важных — <b>сортировка</b> и <b>поиск</b>.</p>
<p><code>table.sort(t, cmp)</code> сортирует таблицу на месте. Функция сравнения <code>cmp(a, b)</code> возвращает <code>true</code>, если <code>a</code> должен стоять <b>перед</b> <code>b</code>:</p>
<pre class="inline-code">table.sort(players, function(a, b)
  if a.score ~= b.score then return a.score &gt; b.score end
  return a.name &lt; b.name   -- при равных очках — по алфавиту
end)</pre>
<p><b>Бинарный поиск</b> в отсортированном массиве: смотрим в середину, и если искомое меньше — отбрасываем правую половину, иначе левую. За каждый шаг область поиска уменьшается вдвое: среди миллиона элементов найдём за ~20 шагов вместо миллиона.</p>
<p><b>Сортировка пузырьком</b> — самый простой алгоритм для понимания: соседние элементы, стоящие не по порядку, меняются местами, пока массив не отсортируется.</p>`,
        `<p>An <b>algorithm</b> is an exact recipe for solving a problem. The two most important are <b>sorting</b> and <b>searching</b>.</p>
<p><code>table.sort(t, cmp)</code> sorts a table in place. The comparator <code>cmp(a, b)</code> returns <code>true</code> when <code>a</code> should come <b>before</b> <code>b</code>:</p>
<pre class="inline-code">table.sort(players, function(a, b)
  if a.score ~= b.score then return a.score &gt; b.score end
  return a.name &lt; b.name   -- equal scores — alphabetical
end)</pre>
<p><b>Binary search</b> in a sorted array: look at the middle; if the target is smaller, drop the right half, otherwise the left. Each step halves the search area: among a million items it takes ~20 steps instead of a million.</p>
<p><b>Bubble sort</b> is the easiest to understand: neighbouring items in the wrong order are swapped until the array is sorted.</p>`),
      why: L(`<p>Чому не просто перебрати все циклом? Для 10 елементів різниці немає, а для таблиці рекордів на мільйон гравців — величезна. Бінарний пошук і хороше сортування — це те, що робить ігри й сайти швидкими. До того ж ці алгоритми часто питають на олімпіадах і співбесідах.</p>`,
        `<p>Почему не просто перебрать всё циклом? Для 10 элементов разницы нет, а для таблицы рекордов на миллион игроков — огромная. Бинарный поиск и хорошая сортировка — то, что делает игры и сайты быстрыми. К тому же эти алгоритмы часто спрашивают на олимпиадах и собеседованиях.</p>`,
        `<p>Why not just loop over everything? For 10 items there’s no difference; for a million-player leaderboard it’s huge. Binary search and good sorting are what make games and sites fast. They also come up constantly in contests and interviews.</p>`),
      mistakes: L(`<ul><li>Бінарний пошук у <b>невідсортованому</b> масиві дає неправильну відповідь.</li><li>Компаратор з <code>&gt;=</code> замість <code>&gt;</code> — <code>invalid order function for sorting</code>.</li><li>Середина <code>(lo + hi) / 2</code> — дробове число; потрібно <code>(lo + hi) // 2</code>.</li></ul>`,
        `<ul><li>Бинарный поиск в <b>неотсортированном</b> массиве даёт неправильный ответ.</li><li>Компаратор с <code>&gt;=</code> вместо <code>&gt;</code> — <code>invalid order function for sorting</code>.</li><li>Середина <code>(lo + hi) / 2</code> — дробное число; нужно <code>(lo + hi) // 2</code>.</li></ul>`,
        `<ul><li>Binary search on an <b>unsorted</b> array gives wrong answers.</li><li>A comparator using <code>&gt;=</code> instead of <code>&gt;</code> — <code>invalid order function for sorting</code>.</li><li>The midpoint <code>(lo + hi) / 2</code> is a float; use <code>(lo + hi) // 2</code>.</li></ul>`),
      examples: [
        { title: L('Сортування за правилом', 'Сортировка по правилу', 'Custom sort'), code: `local players = {
  { name = "Max", score = 300 },
  { name = "Ira", score = 450 },
  { name = "Alex", score = 300 }
}
table.sort(players, function(a, b)
  if a.score ~= b.score then return a.score > b.score end
  return a.name < b.name
end)
for i, p in ipairs(players) do
  print(i, p.name, p.score)
end`, note: L('Alex і Max мають рівні очки — тоді за алфавітом.', 'У Alex и Max равные очки — тогда по алфавиту.', 'Alex and Max tie — so alphabetical.') },
        { title: L('Бульбашка', 'Пузырёк', 'Bubble sort'), code: `local t = {5, 1, 4, 2, 8}
local n = #t
for pass = 1, n - 1 do
  for i = 1, n - pass do
    if t[i] > t[i + 1] then
      t[i], t[i + 1] = t[i + 1], t[i]
    end
  end
end
print(table.concat(t, " "))`, note: L('Обмін у Lua: <code>a, b = b, a</code>.', 'Обмен в Lua: <code>a, b = b, a</code>.', 'Swapping in Lua: <code>a, b = b, a</code>.') },
        { title: L('Лінійний пошук', 'Линейный поиск', 'Linear search'), code: `local function indexOf(t, value)
  for i, v in ipairs(t) do
    if v == value then return i end
  end
  return nil
end

local items = {"sword", "shield", "potion"}
print(indexOf(items, "potion"))
print(indexOf(items, "bow"))`, note: L('Простий, але повільний для великих масивів.', 'Простой, но медленный для больших массивов.', 'Simple but slow for big arrays.') }
      ],
      task: {
        text: L('Напиши <code>binarySearch(t, target)</code>, що повертає <b>індекс</b> елемента та <b>кількість кроків</b> (або <code>nil</code> і кількість кроків, якщо не знайдено). Для масиву непарних чисел від 1 до 99 (<code>{1, 3, 5, …, 99}</code>) виведи результат для <code>73</code> і для <code>40</code>.', 'Напиши <code>binarySearch(t, target)</code>, которая возвращает <b>индекс</b> элемента и <b>количество шагов</b> (или <code>nil</code> и количество шагов, если не найдено). Для массива нечётных чисел от 1 до 99 (<code>{1, 3, 5, …, 99}</code>) выведи результат для <code>73</code> и для <code>40</code>.', 'Write <code>binarySearch(t, target)</code> returning the item’s <b>index</b> and the <b>number of steps</b> (or <code>nil</code> and the steps if not found). For the array of odd numbers 1 to 99 (<code>{1, 3, 5, …, 99}</code>) print the result for <code>73</code> and for <code>40</code>.'),
        how: [L('<code>local lo, hi, steps = 1, #t, 0</code>; цикл <code>while lo &lt;= hi do</code>.', '<code>local lo, hi, steps = 1, #t, 0</code>; цикл <code>while lo &lt;= hi do</code>.', '<code>local lo, hi, steps = 1, #t, 0</code>; loop <code>while lo &lt;= hi do</code>.'), L('Кожен крок: <code>steps = steps + 1</code>, <code>local mid = (lo + hi) // 2</code>, далі порівняння з <code>t[mid]</code>.', 'Каждый шаг: <code>steps = steps + 1</code>, <code>local mid = (lo + hi) // 2</code>, далее сравнение с <code>t[mid]</code>.', 'Each step: <code>steps = steps + 1</code>, <code>local mid = (lo + hi) // 2</code>, then compare with <code>t[mid]</code>.')],
        starter: `local t = {}
for i = 1, 99, 2 do t[#t + 1] = i end

local function binarySearch(t, target)
  -- повертає індекс (або nil) і кількість кроків
end

print(binarySearch(t, 73))
print(binarySearch(t, 40))`,
        solution: `local t = {}
for i = 1, 99, 2 do t[#t + 1] = i end

local function binarySearch(t, target)
  local lo, hi, steps = 1, #t, 0
  while lo <= hi do
    steps = steps + 1
    local mid = (lo + hi) // 2
    if t[mid] == target then
      return mid, steps
    elseif t[mid] < target then
      lo = mid + 1
    else
      hi = mid - 1
    end
  end
  return nil, steps
end

print(binarySearch(t, 73))
print(binarySearch(t, 40))`,
        hint: L('73 — це 37-й елемент. Масив має 50 елементів, тож кроків не більше 6: очікувано <code>37	6</code> і <code>nil	6</code>.', '73 — это 37-й элемент. В массиве 50 элементов, так что шагов не больше 6: ожидается <code>37	6</code> и <code>nil	6</code>.', '73 is the 37th item. The array has 50 items, so at most 6 steps: expect <code>37	6</code> and <code>nil	6</code>.'),
        expected: '37\t6\nnil\t6',
        must: /\/\/\s*2/
      },
      quiz: { q: L('Скільки кроків бінарного пошуку потрібно для 1000 елементів (максимум)?', 'Сколько шагов бинарного поиска нужно для 1000 элементов (максимум)?', 'How many binary-search steps does 1000 items need at most?'), options: ['10', '100', '500'], answer: 0, explain: L('2¹⁰ = 1024 ≥ 1000.', '2¹⁰ = 1024 ≥ 1000.', '2¹⁰ = 1024 ≥ 1000.') },
      ref: [{ code: 'table.sort(t, function(a, b) return a < b end)', d: L('сортування з правилом', 'сортировка с правилом', 'custom sort') }, { code: 'local mid = (lo + hi) // 2', d: L('середина', 'середина', 'midpoint') }]
    },
    {
      id: 'modules', chapter: CH5,
      title: L('Модулі та організація коду', 'Модули и организация кода', 'Modules and code organisation'),
      theory: L(
        `<p>Коли програма росте, код ділять на <b>модулі</b> — окремі частини зі своїми функціями. У Lua модуль — це просто <b>таблиця</b>, яку файл повертає:</p>
<pre class="inline-code">-- файл mathx.lua
local M = {}

local function helper(x) return x * x end   -- приватна: не потрапить у M

function M.square(x) return helper(x) end
function M.clamp(x, lo, hi) return math.max(lo, math.min(hi, x)) end

return M</pre>
<p>Інший файл підключає його: <code>local mathx = require("mathx")</code>. У Roblox так само працюють <b>ModuleScript</b>: <code>require(game.ReplicatedStorage.Config)</code>.</p>
<ul><li>Усе, що не потрапило в таблицю <code>M</code>, лишається <b>приватним</b></li><li><code>require</code> виконує файл лише <b>один раз</b> і кешує результат</li><li>У нашому редакторі один файл, тож модуль імітуємо блоком <code>do … end</code>, який повертає таблицю</li></ul>`,
        `<p>Когда программа растёт, код делят на <b>модули</b> — отдельные части со своими функциями. В Lua модуль — это просто <b>таблица</b>, которую возвращает файл:</p>
<pre class="inline-code">-- файл mathx.lua
local M = {}

local function helper(x) return x * x end   -- приватная: не попадёт в M

function M.square(x) return helper(x) end
function M.clamp(x, lo, hi) return math.max(lo, math.min(hi, x)) end

return M</pre>
<p>Другой файл подключает его: <code>local mathx = require("mathx")</code>. В Roblox так же работают <b>ModuleScript</b>: <code>require(game.ReplicatedStorage.Config)</code>.</p>
<ul><li>Всё, что не попало в таблицу <code>M</code>, остаётся <b>приватным</b></li><li><code>require</code> выполняет файл только <b>один раз</b> и кеширует результат</li><li>В нашем редакторе один файл, поэтому модуль имитируем блоком <code>do … end</code>, который возвращает таблицу</li></ul>`,
        `<p>As a program grows, code is split into <b>modules</b> — separate parts with their own functions. In Lua a module is just a <b>table</b> that a file returns:</p>
<pre class="inline-code">-- file mathx.lua
local M = {}

local function helper(x) return x * x end   -- private: not put in M

function M.square(x) return helper(x) end
function M.clamp(x, lo, hi) return math.max(lo, math.min(hi, x)) end

return M</pre>
<p>Another file loads it: <code>local mathx = require("mathx")</code>. Roblox <b>ModuleScripts</b> work the same: <code>require(game.ReplicatedStorage.Config)</code>.</p>
<ul><li>Anything not put in <code>M</code> stays <b>private</b></li><li><code>require</code> runs the file only <b>once</b> and caches the result</li><li>Our editor has one file, so we imitate a module with a function or <code>do … end</code> block that returns a table</li></ul>`),
      why: L(`<p>Гра на 5000 рядків в одному файлі — це хаос: важко знайти потрібне, а зміна в одному місці ламає інше. Модулі дають кожній частині власний «будинок» з дверима (публічні функції) і замкненими кімнатами (приватні). Команда може працювати над різними модулями одночасно, не заважаючи одне одному.</p>`,
        `<p>Игра на 5000 строк в одном файле — это хаос: трудно найти нужное, а изменение в одном месте ломает другое. Модули дают каждой части собственный «дом» с дверями (публичные функции) и запертыми комнатами (приватные). Команда может работать над разными модулями одновременно, не мешая друг другу.</p>`,
        `<p>A 5000-line game in one file is chaos: hard to find anything, and a change in one place breaks another. Modules give each part its own “house” with doors (public functions) and locked rooms (private ones). A team can work on different modules at once without getting in each other’s way.</p>`),
      mistakes: L(`<ul><li>Забутий <code>return M</code> у кінці модуля — <code>require</code> поверне <code>true</code>, а не таблицю.</li><li>Глобальні змінні в модулі «протікають» у всю програму — роби все <code>local</code>.</li><li>Два модулі, що <code>require</code> одне одного, — циклічна залежність; винеси спільне в третій.</li></ul>`,
        `<ul><li>Забытый <code>return M</code> в конце модуля — <code>require</code> вернёт <code>true</code>, а не таблицу.</li><li>Глобальные переменные в модуле «протекают» во всю программу — делай всё <code>local</code>.</li><li>Два модуля, которые <code>require</code> друг друга, — циклическая зависимость; вынеси общее в третий.</li></ul>`,
        `<ul><li>Forgetting <code>return M</code> — <code>require</code> returns <code>true</code> instead of the table.</li><li>Globals inside a module leak into the whole program — make everything <code>local</code>.</li><li>Two modules that <code>require</code> each other — a circular dependency; move shared code into a third.</li></ul>`),
      examples: [
        { title: L('Модуль-таблиця', 'Модуль-таблица', 'Module table'), code: `local MathX = (function()
  local M = {}
  local function sq(x) return x * x end
  function M.dist(x1, y1, x2, y2)
    return math.sqrt(sq(x2 - x1) + sq(y2 - y1))
  end
  function M.clamp(x, lo, hi)
    return math.max(lo, math.min(hi, x))
  end
  return M
end)()

print(MathX.dist(0, 0, 3, 4))
print(MathX.clamp(150, 0, 100))
print(MathX.sq)`, note: L('sq — приватна, ззовні її не видно (nil).', 'sq — приватная, снаружи её не видно (nil).', 'sq is private — invisible outside (nil).') },
        { title: L('Модуль зі станом', 'Модуль с состоянием', 'Module with state'), code: `local Score = (function()
  local M = {}
  local points = 0
  function M.add(n) points = points + n end
  function M.get() return points end
  return M
end)()

Score.add(10)
Score.add(5)
print(Score.get())
print(Score.points)`, note: L('points сховано: змінити можна лише через add.', 'points спрятан: изменить можно только через add.', 'points is hidden: only add can change it.') },
        { title: L('Конфіг', 'Конфиг', 'Config'), code: `local Config = {
  MAX_PLAYERS = 8,
  ROUND_TIME = 120,
  COLORS = { "Red", "Blue" }
}

local function describe(cfg)
  return string.format("%d players, %ds rounds, teams: %s",
    cfg.MAX_PLAYERS, cfg.ROUND_TIME, table.concat(cfg.COLORS, "/"))
end
print(describe(Config))`, note: L('Налаштування гри в одному місці — як ModuleScript у Roblox.', 'Настройки игры в одном месте — как ModuleScript в Roblox.', 'Game settings in one place — like a Roblox ModuleScript.') }
      ],
      task: {
        text: L('Створи модуль <code>Inventory</code> (функція, що повертає таблицю) з приватною таблицею <code>items</code> і публічними функціями <code>add(name, n)</code>, <code>remove(name, n)</code> (повертає <code>false</code>, якщо не вистачає) та <code>count(name)</code>. Додай 3 <code>apple</code>, спробуй забрати 5, потім 2 і виведи результати та залишок: <code>false</code>, <code>true</code>, <code>1</code>.', 'Создай модуль <code>Inventory</code> (функция, возвращающая таблицу) с приватной таблицей <code>items</code> и публичными функциями <code>add(name, n)</code>, <code>remove(name, n)</code> (возвращает <code>false</code>, если не хватает) и <code>count(name)</code>. Добавь 3 <code>apple</code>, попробуй забрать 5, затем 2 и выведи результаты и остаток: <code>false</code>, <code>true</code>, <code>1</code>.', 'Create an <code>Inventory</code> module (a function returning a table) with a private <code>items</code> table and public <code>add(name, n)</code>, <code>remove(name, n)</code> (returns <code>false</code> if there aren’t enough) and <code>count(name)</code>. Add 3 <code>apple</code>, try removing 5, then 2, and print the results and what’s left: <code>false</code>, <code>true</code>, <code>1</code>.'),
        how: [L('<code>count</code>: <code>return items[name] or 0</code>.', '<code>count</code>: <code>return items[name] or 0</code>.', '<code>count</code>: <code>return items[name] or 0</code>.'), L('Наприкінці виведи ще <code>Inventory.items</code> — має бути <code>nil</code>, бо таблиця приватна.', 'В конце выведи ещё <code>Inventory.items</code> — должно быть <code>nil</code>, потому что таблица приватная.', 'Finally print <code>Inventory.items</code> — it must be <code>nil</code> because the table is private.')],
        starter: `local Inventory = (function()
  local M = {}
  local items = {}
  -- add, remove, count
  return M
end)()

Inventory.add("apple", 3)`,
        solution: `local Inventory = (function()
  local M = {}
  local items = {}

  function M.add(name, n)
    items[name] = (items[name] or 0) + n
  end

  function M.count(name)
    return items[name] or 0
  end

  function M.remove(name, n)
    if M.count(name) < n then return false end
    items[name] = items[name] - n
    return true
  end

  return M
end)()

Inventory.add("apple", 3)
print(Inventory.remove("apple", 5))
print(Inventory.remove("apple", 2))
print(Inventory.count("apple"))
print(Inventory.items)`,
        hint: L('Очікувано: <code>false</code>, <code>true</code>, <code>1</code>, <code>nil</code>.', 'Ожидается: <code>false</code>, <code>true</code>, <code>1</code>, <code>nil</code>.', 'Expected: <code>false</code>, <code>true</code>, <code>1</code>, <code>nil</code>.'),
        expected: 'false\ntrue\n1\nnil',
        must: /local\s+items[\s\S]*return\s+M/
      },
      quiz: { q: L('Що повертає модуль у Lua?', 'Что возвращает модуль в Lua?', 'What does a Lua module return?'), options: [L('рядок з кодом', 'строку с кодом', 'a code string'), L('таблицю з публічними функціями', 'таблицу с публичными функциями', 'a table of public functions'), L('нічого', 'ничего', 'nothing')], answer: 1, explain: L('Те, що повертає <code>return M</code>, отримує <code>require</code>.', 'То, что возвращает <code>return M</code>, получает <code>require</code>.', '<code>require</code> receives what <code>return M</code> returns.') },
      ref: [{ code: 'local M = {} … return M', d: L('шаблон модуля', 'шаблон модуля', 'module pattern') }, { code: 'local m = require("name")', d: L('підключення', 'подключение', 'loading') }]
    }
  ], 'project-inventory');

  // Третій фінальний проєкт — у кінець курсу.
  Codry.steps('lua', [
    {
      id: 'project-quest', chapter: CH4, project: true,
      title: L('Проєкт: текстовий квест', 'Проект: текстовый квест', 'Project: text adventure'),
      theory: L(
        `<p>Створимо текстову гру, як найперші комп’ютерні пригоди. Гравець вводить команди, а гра описує, що відбувається. Тут знадобиться все:</p>
<ol><li><b>Світ — це таблиця кімнат</b>: опис, виходи (<code>exits = { north = "hall" }</code>) і предмети</li><li><b>Стан гравця</b>: поточна кімната, інвентар</li><li><b>Цикл команд</b>: <code>for line in io.lines() do … end</code> читає команди по рядку</li><li><b>Розбір команди</b>: <code>local verb, obj = line:match("^(%a+)%s*(%a*)$")</code></li><li><b>Таблиця обробників</b> замість довгого <code>if</code>: <code>handlers[verb](obj)</code></li></ol>
<p>Такий підхід називають <b>машиною станів</b>: гра завжди в одному зі станів (кімнат), і команди переводять її між ними.</p>`,
        `<p>Создадим текстовую игру, как самые первые компьютерные приключения. Игрок вводит команды, а игра описывает, что происходит. Здесь пригодится всё:</p>
<ol><li><b>Мир — это таблица комнат</b>: описание, выходы (<code>exits = { north = "hall" }</code>) и предметы</li><li><b>Состояние игрока</b>: текущая комната, инвентарь</li><li><b>Цикл команд</b>: <code>for line in io.lines() do … end</code> читает команды построчно</li><li><b>Разбор команды</b>: <code>local verb, obj = line:match("^(%a+)%s*(%a*)$")</code></li><li><b>Таблица обработчиков</b> вместо длинного <code>if</code>: <code>handlers[verb](obj)</code></li></ol>
<p>Такой подход называют <b>машиной состояний</b>: игра всегда в одном из состояний (комнат), и команды переводят её между ними.</p>`,
        `<p>Let’s build a text game like the very first computer adventures. The player types commands and the game describes what happens. You’ll use everything:</p>
<ol><li><b>The world is a table of rooms</b>: a description, exits (<code>exits = { north = "hall" }</code>) and items</li><li><b>Player state</b>: current room, inventory</li><li><b>A command loop</b>: <code>for line in io.lines() do … end</code> reads commands line by line</li><li><b>Parsing</b>: <code>local verb, obj = line:match("^(%a+)%s*(%a*)$")</code></li><li><b>A handler table</b> instead of a long <code>if</code>: <code>handlers[verb](obj)</code></li></ol>
<p>This is a <b>state machine</b>: the game is always in one state (room), and commands move it between states.</p>`),
      why: L(`<p>Чому таблиця обработчиків, а не <code>if verb == "go" … elseif …</code>? Щоб додати нову команду, достатньо дописати одну функцію в таблицю — решта коду не змінюється. А світ, описаний даними (таблицею кімнат), можна розширювати без жодного нового рядка логіки: нова кімната — це лише новий запис.</p>`,
        `<p>Почему таблица обработчиков, а не <code>if verb == "go" … elseif …</code>? Чтобы добавить новую команду, достаточно дописать одну функцию в таблицу — остальной код не меняется. А мир, описанный данными (таблицей комнат), можно расширять без единой новой строки логики: новая комната — это лишь новая запись.</p>`,
        `<p>Why a handler table instead of <code>if verb == "go" … elseif …</code>? Adding a command means adding one function to the table — nothing else changes. And a world described as data (a room table) grows without any new logic: a new room is just a new entry.</p>`),
      mistakes: L(`<ul><li>Невідома команда викликає <code>handlers[verb]</code>, що дорівнює <code>nil</code>, — <code>attempt to call a nil value</code>. Перевіряй наявність обробника.</li><li>Предмет, узятий з кімнати, лишається і там — видаляй його з <code>room.items</code>.</li></ul>`,
        `<ul><li>Неизвестная команда вызывает <code>handlers[verb]</code>, равный <code>nil</code>, — <code>attempt to call a nil value</code>. Проверяй наличие обработчика.</li><li>Предмет, взятый из комнаты, остаётся и там — удаляй его из <code>room.items</code>.</li></ul>`,
        `<ul><li>An unknown command calls a <code>nil</code> <code>handlers[verb]</code> — <code>attempt to call a nil value</code>. Check the handler exists.</li><li>An item taken from a room stays there too — remove it from <code>room.items</code>.</li></ul>`),
      examples: [
        { title: L('Розбір команди', 'Разбор команды', 'Parsing a command'), code: `for _, line in ipairs({"go north", "take key", "look", "jump around"}) do
  local verb, obj = line:match("^(%a+)%s*(%a*)$")
  print(verb, obj == "" and "-" or obj)
end`, note: L('Шаблон не підходить — обидва значення nil.', 'Шаблон не подходит — оба значения nil.', 'No match — both values are nil.') },
        { title: L('Таблиця обробників', 'Таблица обработчиков', 'Handler table'), code: `local handlers = {
  hello = function(who) print("Hello, " .. who .. "!") end,
  bye = function() print("See you!") end
}

local function run(verb, obj)
  local h = handlers[verb]
  if h then h(obj) else print("I don't know '" .. verb .. "'") end
end

run("hello", "Kira")
run("dance", "")
run("bye", "")`, note: L('Нова команда — один новий рядок у таблиці.', 'Новая команда — одна новая строка в таблице.', 'A new command is one new table entry.') },
        { title: L('Кімнати', 'Комнаты', 'Rooms'), code: `local rooms = {
  hall = { desc = "A dusty hall.", exits = { east = "kitchen" } },
  kitchen = { desc = "Smells of bread.", exits = { west = "hall" } }
}
local here = "hall"
for _, dir in ipairs({"east", "east", "west"}) do
  local nextRoom = rooms[here].exits[dir]
  if nextRoom then
    here = nextRoom
    print(rooms[here].desc)
  else
    print("You can't go " .. dir)
  end
end`, note: L('Світ описаний даними, а не кодом.', 'Мир описан данными, а не кодом.', 'The world is data, not code.') }
      ],
      task: {
        text: L(`Зроби квест із трьох кімнат: <code>cell</code> («A cold cell.», вихід north → <code>corridor</code>, предмет <code>key</code>), <code>corridor</code> («A dark corridor.», south → cell, east → <code>gate</code>), <code>gate</code> («The exit gate!»). Команди зі stdin (уже задано): <code>look</code> → опис; <code>take X</code> → <code>Taken: key</code> або <code>No X here</code>; <code>go DIR</code> → опис нової кімнати або <code>Can't go DIR</code>; у <code>gate</code> без ключа — <code>The gate is locked</code> (гравець лишається в коридорі), з ключем — <code>You escaped!</code> і гра закінчується. Невідома команда — <code>Unknown command</code>.`,
          `Сделай квест из трёх комнат: <code>cell</code> («A cold cell.», выход north → <code>corridor</code>, предмет <code>key</code>), <code>corridor</code> («A dark corridor.», south → cell, east → <code>gate</code>), <code>gate</code> («The exit gate!»). Команды из stdin (уже заданы): <code>look</code> → описание; <code>take X</code> → <code>Taken: key</code> или <code>No X here</code>; <code>go DIR</code> → описание новой комнаты или <code>Can't go DIR</code>; в <code>gate</code> без ключа — <code>The gate is locked</code> (игрок остаётся в коридоре), с ключом — <code>You escaped!</code> и игра заканчивается. Неизвестная команда — <code>Unknown command</code>.`,
          `Build a three-room quest: <code>cell</code> (“A cold cell.”, exit north → <code>corridor</code>, item <code>key</code>), <code>corridor</code> (“A dark corridor.”, south → cell, east → <code>gate</code>), <code>gate</code> (“The exit gate!”). Commands from stdin (preset): <code>look</code> → description; <code>take X</code> → <code>Taken: key</code> or <code>No X here</code>; <code>go DIR</code> → the new room’s description or <code>Can't go DIR</code>; entering <code>gate</code> without the key — <code>The gate is locked</code> (the player stays in the corridor), with it — <code>You escaped!</code> and the game ends. Unknown command — <code>Unknown command</code>.`),
        how: [L('Предмети кімнати тримай як множину: <code>items = { key = true }</code> — тоді взяти: <code>room.items[obj] = nil</code>.', 'Предметы комнаты держи как множество: <code>items = { key = true }</code> — тогда взять: <code>room.items[obj] = nil</code>.', 'Store room items as a set: <code>items = { key = true }</code> — taking is then <code>room.items[obj] = nil</code>.'), L('Щоб завершити гру, обробник <code>go</code> може повертати <code>true</code>, а цикл — робити <code>break</code>.', 'Чтобы завершить игру, обработчик <code>go</code> может возвращать <code>true</code>, а цикл — делать <code>break</code>.', 'To end the game, the <code>go</code> handler can return <code>true</code> and the loop can <code>break</code>.')],
        starter: `local rooms = {
  cell = { desc = "A cold cell.", exits = { north = "corridor" }, items = { key = true } },
  -- corridor, gate
}
local here, bag = "cell", {}

for line in io.lines() do
  print("> " .. line)
end`,
        solution: `local rooms = {
  cell = { desc = "A cold cell.", exits = { north = "corridor" }, items = { key = true } },
  corridor = { desc = "A dark corridor.", exits = { south = "cell", east = "gate" }, items = {} },
  gate = { desc = "The exit gate!", exits = {}, items = {} }
}
local here, bag = "cell", {}

local handlers = {}

function handlers.look()
  print(rooms[here].desc)
end

function handlers.take(obj)
  if rooms[here].items[obj] then
    rooms[here].items[obj] = nil
    bag[obj] = true
    print("Taken: " .. obj)
  else
    print("No " .. obj .. " here")
  end
end

function handlers.go(dir)
  local target = rooms[here].exits[dir]
  if not target then
    print("Can't go " .. dir)
    return false
  end
  if target == "gate" then
    if not bag.key then
      print("The gate is locked")
      return false
    end
    print("You escaped!")
    return true
  end
  here = target
  print(rooms[here].desc)
  return false
end

for line in io.lines() do
  local verb, obj = line:match("^(%a+)%s*(%a*)$")
  local h = verb and handlers[verb]
  if h then
    if h(obj) then break end
  else
    print("Unknown command")
  end
end`,
        stdin: 'look\ntake sword\ngo north\ngo east\ndance\ngo south\ntake key\ngo north\ngo east\nlook',
        hint: L('Остання команда <code>look</code> не виконується — гра вже скінчилась.', 'Последняя команда <code>look</code> не выполняется — игра уже закончилась.', 'The last <code>look</code> never runs — the game is already over.'),
        expected: "A cold cell.\nNo sword here\nA dark corridor.\nThe gate is locked\nUnknown command\nA cold cell.\nTaken: key\nA dark corridor.\nYou escaped!",
        must: /handlers[\s\S]*io\.lines/
      },
      quiz: { q: L('Чому світ квесту зручно описувати таблицею кімнат?', 'Почему мир квеста удобно описывать таблицей комнат?', 'Why describe the quest world as a table of rooms?'), options: [L('нові кімнати додаються без нової логіки', 'новые комнаты добавляются без новой логики', 'new rooms need no new logic'), L('так швидше працює print', 'так быстрее работает print', 'print runs faster'), L('Lua не має if', 'в Lua нет if', 'Lua has no if')], answer: 0, explain: L('Дані окремо, логіка окремо.', 'Данные отдельно, логика отдельно.', 'Data apart from logic.') },
      ref: [{ code: 'for line in io.lines() do … end', d: L('читати команди', 'читать команды', 'read commands') }, { code: 'line:match("^(%a+)%s*(%a*)$")', d: L('розбір команди', 'разбор команды', 'parse a command') }]
    }
  ]);
})();
