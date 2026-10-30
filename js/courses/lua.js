// Lua — курс. Код виконується на справжньому Lua 5.4 (сервер Wandbox).
(function () {
  const L = Codry.L;
  const CH1 = L('Основи Lua', 'Основы Lua', 'Lua basics');
  const CH2 = L('Таблиці та функції', 'Таблицы и функции', 'Tables and functions');
  const CH3 = L('Просунутий Lua', 'Продвинутый Lua', 'Advanced Lua');
  const CH4 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');

  Codry.steps('lua', [
    {
      id: 'print', chapter: CH1,
      title: L('Перша програма та коментарі', 'Первая программа и комментарии', 'First program and comments'),
      theory: L(
        `<p><b>Lua</b> (з португальської — «місяць») — маленька, швидка й проста мова. Її вбудовують в ігри та програми: на ній пишуть скрипти для <b>Roblox</b> (діалект Luau), моди для World of Warcraft, Garry’s Mod, Dota 2, ігри на рушіях Defold і LÖVE.</p>
<pre class="inline-code">print("Hello, Lua!")
print(2 + 3)
print("Score:", 100)</pre>
<p><code>print</code> виводить значення; кілька значень через кому розділяються табуляцією.</p>
<p>Коментарі: <code>-- один рядок</code> і <code>--[[ кілька рядків ]]</code>. Крапка з комою в кінці рядка не потрібна.</p>`,
        `<p><b>Lua</b> (с португальского — «луна») — маленький, быстрый и простой язык. Его встраивают в игры и программы: на нём пишут скрипты для <b>Roblox</b> (диалект Luau), моды для World of Warcraft, Garry’s Mod, Dota 2, игры на движках Defold и LÖVE.</p>
<pre class="inline-code">print("Hello, Lua!")
print(2 + 3)
print("Score:", 100)</pre>
<p><code>print</code> выводит значения; несколько значений через запятую разделяются табуляцией.</p>
<p>Комментарии: <code>-- одна строка</code> и <code>--[[ несколько строк ]]</code>. Точка с запятой в конце строки не нужна.</p>`,
        `<p><b>Lua</b> (Portuguese for “moon”) is a small, fast, simple language. It’s embedded in games and apps: <b>Roblox</b> scripts (the Luau dialect), World of Warcraft mods, Garry’s Mod, Dota 2, and games on the Defold and LÖVE engines.</p>
<pre class="inline-code">print("Hello, Lua!")
print(2 + 3)
print("Score:", 100)</pre>
<p><code>print</code> outputs values; several comma-separated values are separated by tabs.</p>
<p>Comments: <code>-- one line</code> and <code>--[[ several lines ]]</code>. No semicolons needed.</p>`),
      why: L(`<p>Чому саме Lua для ігор? Інтерпретатор займає лише ~300 КБ, легко вбудовується в C/C++ і працює дуже швидко. Розробники рушія пишуть важку частину на C++, а логіку гри — квести, зброю, інтерфейс — дизайнери пишуть на простому Lua.</p>`,
        `<p>Почему именно Lua для игр? Интерпретатор занимает всего ~300 КБ, легко встраивается в C/C++ и работает очень быстро. Разработчики движка пишут тяжёлую часть на C++, а логику игры — квесты, оружие, интерфейс — дизайнеры пишут на простом Lua.</p>`,
        `<p>Why Lua for games? The interpreter is only ~300 KB, embeds easily in C/C++ and is very fast. Engine developers write the heavy parts in C++, while designers write game logic — quests, weapons, UI — in simple Lua.</p>`),
      mistakes: L(`<ul><li><code>Print</code> з великої — Lua чутливий до регістру.</li><li>Коментар як у JS (<code>//</code>) — у Lua це <code>--</code>.</li></ul>`,
        `<ul><li><code>Print</code> с большой — Lua чувствителен к регистру.</li><li>Комментарий как в JS (<code>//</code>) — в Lua это <code>--</code>.</li></ul>`,
        `<ul><li><code>Print</code> capitalised — Lua is case-sensitive.</li><li>A JS-style comment (<code>//</code>) — in Lua it’s <code>--</code>.</li></ul>`),
      examples: [
        { title: 'Hello', code: 'print("Hello, Lua!")', note: L('Перша програма.', 'Первая программа.', 'Your first program.') },
        { title: L('Кілька значень', 'Несколько значений', 'Several values'), code: 'print("Score:", 100)\nprint(10, 20, 30)\nprint("2 + 2 =", 2 + 2)', note: L('Значення розділяються табуляцією.', 'Значения разделяются табуляцией.', 'Values are tab-separated.') },
        { title: L('Коментарі', 'Комментарии', 'Comments'), code: '-- this is a comment\nprint("visible") -- after code\n--[[\nprint("hidden")\nprint("also hidden")\n]]', note: L('Багаторядковий коментар вимикає блок.', 'Многострочный комментарий выключает блок.', 'A block comment switches code off.') }
      ],
      task: {
        text: L('Виведи два рядки: <code>Hello, Lua!</code> і результат <code>12 * 12</code>.', 'Выведи две строки: <code>Hello, Lua!</code> и результат <code>12 * 12</code>.', 'Print two lines: <code>Hello, Lua!</code> and the result of <code>12 * 12</code>.'),
        how: [L('Два виклики <code>print</code>.', 'Два вызова <code>print</code>.', 'Two <code>print</code> calls.')],
        starter: '-- your code\n',
        solution: 'print("Hello, Lua!")\nprint(12 * 12)',
        hint: L('Друге — без лапок.', 'Второе — без кавычек.', 'The second without quotes.'),
        expected: 'Hello, Lua!\n144',
        must: /12\s*\*\s*12/
      },
      quiz: { q: L('Як позначається однорядковий коментар у Lua?', 'Как обозначается однострочный комментарий в Lua?', 'How is a one-line comment written in Lua?'), options: ['//', '--', '#'], answer: 1, explain: L('Два дефіси.', 'Два дефиса.', 'Two dashes.') },
      ref: [{ code: 'print(a, b)', d: L('вивести', 'вывести', 'print') }, { code: '-- / --[[ ]]', d: L('коментарі', 'комментарии', 'comments') }]
    },
    {
      id: 'vars', chapter: CH1,
      title: L('Змінні, local і типи', 'Переменные, local и типы', 'Variables, local and types'),
      theory: L(
        `<p>Змінну створюють присвоєнням. <b>Завжди</b> пиши <code>local</code>:</p>
<pre class="inline-code">local name = "Steve"
local hp = 20
local alive = true</pre>
<p>Без <code>local</code> змінна стає <b>глобальною</b> — видимою всюди, що часто спричиняє помилки.</p>
<p>Типи Lua: <code>nil</code> (нічого), <code>boolean</code>, <code>number</code> (і цілі, і дробові), <code>string</code>, <code>table</code>, <code>function</code>. Функція <code>type(x)</code> повертає назву типу.</p>
<p>Неіснуюча змінна має значення <code>nil</code> (помилки немає). Можна присвоювати кілька змінних одразу: <code>local a, b = 1, 2</code>.</p>`,
        `<p>Переменную создают присваиванием. <b>Всегда</b> пиши <code>local</code>:</p>
<pre class="inline-code">local name = "Steve"
local hp = 20
local alive = true</pre>
<p>Без <code>local</code> переменная становится <b>глобальной</b> — видимой везде, что часто вызывает ошибки.</p>
<p>Типы Lua: <code>nil</code> (ничего), <code>boolean</code>, <code>number</code> (и целые, и дробные), <code>string</code>, <code>table</code>, <code>function</code>. Функция <code>type(x)</code> возвращает название типа.</p>
<p>Несуществующая переменная равна <code>nil</code> (ошибки нет). Можно присваивать несколько переменных сразу: <code>local a, b = 1, 2</code>.</p>`,
        `<p>Create a variable by assigning it. <b>Always</b> write <code>local</code>:</p>
<pre class="inline-code">local name = "Steve"
local hp = 20
local alive = true</pre>
<p>Without <code>local</code> a variable becomes <b>global</b> — visible everywhere, a common source of bugs.</p>
<p>Lua types: <code>nil</code> (nothing), <code>boolean</code>, <code>number</code> (integers and decimals), <code>string</code>, <code>table</code>, <code>function</code>. <code>type(x)</code> returns the type name.</p>
<p>An undefined variable is just <code>nil</code> (no error). You can assign several at once: <code>local a, b = 1, 2</code>.</p>`),
      why: L(`<p>Чому <code>local</code> так важливий? Локальні змінні швидші (Lua звертається до них напряму) і не конфліктують між різними скриптами. У Roblox сотні скриптів працюють одночасно — глобальні змінні там перетворюються на хаос.</p>`,
        `<p>Почему <code>local</code> так важен? Локальные переменные быстрее (Lua обращается к ним напрямую) и не конфликтуют между разными скриптами. В Roblox сотни скриптов работают одновременно — глобальные переменные там превращаются в хаос.</p>`,
        `<p>Why is <code>local</code> so important? Locals are faster (Lua accesses them directly) and don’t clash between scripts. In Roblox hundreds of scripts run at once — globals turn into chaos.</p>`),
      mistakes: L(`<ul><li>Опечатка в імені — Lua не скаже про помилку, просто поверне <code>nil</code>.</li><li><code>true</code> і <code>false</code> — з малої літери.</li></ul>`,
        `<ul><li>Опечатка в имени — Lua не скажет об ошибке, просто вернёт <code>nil</code>.</li><li><code>true</code> и <code>false</code> — с маленькой буквы.</li></ul>`,
        `<ul><li>A typo in a name — Lua won’t complain, it just returns <code>nil</code>.</li><li><code>true</code> and <code>false</code> are lowercase.</li></ul>`),
      examples: [
        { title: 'local', code: 'local name = "Steve"\nlocal hp = 20\nprint(name, hp)\nhp = hp - 5\nprint(name, hp)', note: L('Значення змінюється простим присвоєнням.', 'Значение меняется простым присваиванием.', 'Change a value by reassigning.') },
        { title: 'type()', code: 'print(type(42))\nprint(type(3.14))\nprint(type("hi"))\nprint(type(true))\nprint(type(nil))\nprint(type({}))', note: L('Шість основних типів.', 'Шесть основных типов.', 'Six main types.') },
        { title: 'nil', code: 'local x\nprint(x)\nprint(undefinedThing)\nlocal score = 10\nscore = nil\nprint(score)', note: L('Неіснуюче — це nil, без помилки.', 'Несуществующее — это nil, без ошибки.', 'Missing values are nil, no error.') },
        { title: L('Кілька змінних', 'Несколько переменных', 'Multiple'), code: 'local a, b, c = 1, 2\nprint(a, b, c)\na, b = b, a\nprint(a, b)', note: L('Зайве отримує nil; обмін значень в один рядок.', 'Лишнее получает nil; обмен значений в одну строку.', 'Extras get nil; swap in one line.') }
      ],
      task: {
        text: L('Створи локальні змінні <code>player = "Alex"</code> і <code>coins = 50</code>. Збільш <code>coins</code> на 25 і виведи <code>print(player, coins)</code>.', 'Создай локальные переменные <code>player = "Alex"</code> и <code>coins = 50</code>. Увеличь <code>coins</code> на 25 и выведи <code>print(player, coins)</code>.', 'Create local variables <code>player = "Alex"</code> and <code>coins = 50</code>. Increase <code>coins</code> by 25 and print <code>print(player, coins)</code>.'),
        how: [L('У Lua немає <code>+=</code>: пиши <code>coins = coins + 25</code>.', 'В Lua нет <code>+=</code>: пиши <code>coins = coins + 25</code>.', 'Lua has no <code>+=</code>: write <code>coins = coins + 25</code>.')],
        starter: '',
        solution: 'local player = "Alex"\nlocal coins = 50\ncoins = coins + 25\nprint(player, coins)',
        hint: L('Вивід розділяється табуляцією: <code>Alex	75</code>.', 'Вывод разделяется табуляцией: <code>Alex	75</code>.', 'Output is tab-separated: <code>Alex	75</code>.'),
        expected: 'Alex\t75',
        must: /local\s+player[\s\S]*local\s+coins/
      },
      quiz: { q: L('Що поверне звернення до неоголошеної змінної?', 'Что вернёт обращение к необъявленной переменной?', 'What does reading an undeclared variable give?'), options: [L('помилку', 'ошибку', 'an error'), 'nil', '0'], answer: 1, explain: L('У Lua неіснуюче = nil.', 'В Lua несуществующее = nil.', 'In Lua missing = nil.') },
      ref: [{ code: 'local x = 1', d: L('локальна змінна', 'локальная переменная', 'local variable') }, { code: 'type(x)', d: L('тип', 'тип', 'type') }]
    },
    {
      id: 'math-strings', chapter: CH1,
      title: L('Арифметика та рядки', 'Арифметика и строки', 'Arithmetic and strings'),
      theory: L(
        `<p>Арифметика: <code>+ - * /</code> (ділення завжди дробове), <code>//</code> (ціле ділення), <code>%</code> (остача), <code>^</code> (степінь). Бібліотека <code>math</code>: <code>math.floor</code>, <code>math.ceil</code>, <code>math.max</code>, <code>math.min</code>, <code>math.abs</code>, <code>math.sqrt</code>, <code>math.random(1, 6)</code>.</p>
<p>Рядки:</p>
<ul><li>Склеювання — оператор <code>..</code> (дві крапки): <code>"Hi, " .. name</code></li><li>Довжина — <code>#text</code></li><li>Форматування — <code>string.format("%s has %d hp", name, hp)</code>: <code>%s</code> рядок, <code>%d</code> ціле, <code>%.2f</code> дріб з 2 знаками</li><li><code>tostring(5)</code>, <code>tonumber("5")</code> — перетворення</li></ul>`,
        `<p>Арифметика: <code>+ - * /</code> (деление всегда дробное), <code>//</code> (целое деление), <code>%</code> (остаток), <code>^</code> (степень). Библиотека <code>math</code>: <code>math.floor</code>, <code>math.ceil</code>, <code>math.max</code>, <code>math.min</code>, <code>math.abs</code>, <code>math.sqrt</code>, <code>math.random(1, 6)</code>.</p>
<p>Строки:</p>
<ul><li>Склеивание — оператор <code>..</code> (две точки): <code>"Hi, " .. name</code></li><li>Длина — <code>#text</code></li><li>Форматирование — <code>string.format("%s has %d hp", name, hp)</code>: <code>%s</code> строка, <code>%d</code> целое, <code>%.2f</code> дробь с 2 знаками</li><li><code>tostring(5)</code>, <code>tonumber("5")</code> — преобразования</li></ul>`,
        `<p>Arithmetic: <code>+ - * /</code> (division is always fractional), <code>//</code> (integer division), <code>%</code> (remainder), <code>^</code> (power). The <code>math</code> library: <code>math.floor</code>, <code>math.ceil</code>, <code>math.max</code>, <code>math.min</code>, <code>math.abs</code>, <code>math.sqrt</code>, <code>math.random(1, 6)</code>.</p>
<p>Strings:</p>
<ul><li>Concatenation uses <code>..</code> (two dots): <code>"Hi, " .. name</code></li><li>Length: <code>#text</code></li><li>Formatting: <code>string.format("%s has %d hp", name, hp)</code>: <code>%s</code> string, <code>%d</code> integer, <code>%.2f</code> 2 decimals</li><li><code>tostring(5)</code>, <code>tonumber("5")</code> — conversion</li></ul>`),
      why: L(`<p>Чому <code>..</code>, а не <code>+</code>? У Lua <code>+</code> — лише для чисел, і <code>"10" + 5</code> дасть 15 (рядок перетвориться на число). Окремий оператор склеювання прибирає плутанину, яку має JavaScript.</p>`,
        `<p>Почему <code>..</code>, а не <code>+</code>? В Lua <code>+</code> — только для чисел, и <code>"10" + 5</code> даст 15 (строка превратится в число). Отдельный оператор склеивания убирает путаницу, которая есть в JavaScript.</p>`,
        `<p>Why <code>..</code> and not <code>+</code>? In Lua <code>+</code> is numbers only, so <code>"10" + 5</code> gives 15 (the string becomes a number). A separate concatenation operator removes JavaScript-style confusion.</p>`),
      mistakes: L(`<ul><li><code>"Hi" + name</code> → помилка «attempt to perform arithmetic on a string».</li><li><code>"HP: " .. nil</code> → помилка; склеювати можна лише рядки й числа.</li></ul>`,
        `<ul><li><code>"Hi" + name</code> → ошибка «attempt to perform arithmetic on a string».</li><li><code>"HP: " .. nil</code> → ошибка; склеивать можно только строки и числа.</li></ul>`,
        `<ul><li><code>"Hi" + name</code> → “attempt to perform arithmetic on a string”.</li><li><code>"HP: " .. nil</code> → error; only strings and numbers concatenate.</li></ul>`),
      examples: [
        { title: L('Арифметика', 'Арифметика', 'Arithmetic'), code: 'print(7 / 2)\nprint(7 // 2)\nprint(7 % 2)\nprint(2 ^ 10)\nprint(math.floor(3.7), math.ceil(3.2))\nprint(math.max(4, 9, 1))', note: L('<code>^</code> повертає дріб.', '<code>^</code> возвращает дробь.', '<code>^</code> returns a float.') },
        { title: '..', code: 'local name = "Alex"\nlocal level = 7\nprint("Player " .. name .. " is level " .. level)\nprint(#name)', note: L('Числа склеюються автоматично.', 'Числа склеиваются автоматически.', 'Numbers concatenate automatically.') },
        { title: 'string.format', code: 'local name, hp, speed = "Knight", 85, 12.456\nprint(string.format("%s: %d hp, speed %.1f", name, hp, speed))\nprint(string.format("%03d", 7))', note: L('<code>%03d</code> доповнює нулями.', '<code>%03d</code> дополняет нулями.', '<code>%03d</code> pads with zeros.') },
        { title: L('Перетворення', 'Преобразования', 'Conversion'), code: 'print(tonumber("42") + 8)\nprint(tostring(3.5) .. "!")\nprint("10" + 5)\nprint(tonumber("abc"))', note: L('tonumber повертає nil для не-чисел.', 'tonumber возвращает nil для не-чисел.', 'tonumber returns nil for non-numbers.') }
      ],
      task: {
        text: L('Є <code>item = "Sword"</code>, <code>price = 150</code>, <code>count = 3</code>. Виведи через <code>string.format</code>: <code>3 x Sword = 450 coins</code>. Потім виведи довжину слова <code>item</code>.', 'Есть <code>item = "Sword"</code>, <code>price = 150</code>, <code>count = 3</code>. Выведи через <code>string.format</code>: <code>3 x Sword = 450 coins</code>. Затем выведи длину слова <code>item</code>.', 'Given <code>item = "Sword"</code>, <code>price = 150</code>, <code>count = 3</code>, print via <code>string.format</code>: <code>3 x Sword = 450 coins</code>. Then print the length of <code>item</code>.'),
        how: [L('<code>string.format("%d x %s = %d coins", count, item, price * count)</code>', '<code>string.format("%d x %s = %d coins", count, item, price * count)</code>', '<code>string.format("%d x %s = %d coins", count, item, price * count)</code>'), L('<code>print(#item)</code>', '<code>print(#item)</code>', '<code>print(#item)</code>')],
        starter: 'local item = "Sword"\nlocal price = 150\nlocal count = 3\n',
        solution: 'local item = "Sword"\nlocal price = 150\nlocal count = 3\nprint(string.format("%d x %s = %d coins", count, item, price * count))\nprint(#item)',
        hint: L('<code>#</code> перед рядком дає його довжину.', '<code>#</code> перед строкой даёт её длину.', '<code>#</code> before a string gives its length.'),
        expected: '3 x Sword = 450 coins\n5',
        must: /string\.format/
      },
      quiz: { q: L('Як склеїти рядки в Lua?', 'Как склеить строки в Lua?', 'How do you join strings in Lua?'), options: ['+', '..', '&'], answer: 1, explain: L('Дві крапки.', 'Две точки.', 'Two dots.') },
      ref: [{ code: 'a .. b   #s', d: L('склеювання, довжина', 'склеивание, длина', 'concat, length') }, { code: 'string.format("%s %d %.2f", ...)', d: L('форматування', 'форматирование', 'formatting') }, { code: '// % ^', d: L('ціле ділення, остача, степінь', 'целое деление, остаток, степень', 'int division, remainder, power') }]
    },
    {
      id: 'if', chapter: CH1,
      title: L('Умови: if / elseif / else', 'Условия: if / elseif / else', 'Conditions: if / elseif / else'),
      theory: L(
        `<p>Умова в Lua:</p>
<pre class="inline-code">if hp <= 0 then
  print("Game over")
elseif hp < 20 then
  print("Low health!")
else
  print("OK")
end</pre>
<p>Будова: <code>if умова then</code> … <code>end</code>. Слово <code>elseif</code> пишеться разом.</p>
<p>Порівняння: <code>==</code>, <code>~=</code> (не дорівнює — увага, не <code>!=</code>!), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Логіка: <code>and</code>, <code>or</code>, <code>not</code>.</p>
<p><b>Хибними</b> в Lua вважаються лише <code>false</code> і <code>nil</code>. Число <code>0</code> і порожній рядок <code>""</code> — <b>істинні</b> (на відміну від інших мов).</p>`,
        `<p>Условие в Lua:</p>
<pre class="inline-code">if hp <= 0 then
  print("Game over")
elseif hp < 20 then
  print("Low health!")
else
  print("OK")
end</pre>
<p>Устройство: <code>if условие then</code> … <code>end</code>. Слово <code>elseif</code> пишется слитно.</p>
<p>Сравнения: <code>==</code>, <code>~=</code> (не равно — внимание, не <code>!=</code>!), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Логика: <code>and</code>, <code>or</code>, <code>not</code>.</p>
<p><b>Ложными</b> в Lua считаются только <code>false</code> и <code>nil</code>. Число <code>0</code> и пустая строка <code>""</code> — <b>истинные</b> (в отличие от других языков).</p>`,
        `<p>A condition in Lua:</p>
<pre class="inline-code">if hp <= 0 then
  print("Game over")
elseif hp < 20 then
  print("Low health!")
else
  print("OK")
end</pre>
<p>Structure: <code>if condition then</code> … <code>end</code>. <code>elseif</code> is one word.</p>
<p>Comparisons: <code>==</code>, <code>~=</code> (not equal — note, not <code>!=</code>!), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Logic: <code>and</code>, <code>or</code>, <code>not</code>.</p>
<p>Only <code>false</code> and <code>nil</code> are <b>falsy</b> in Lua. <code>0</code> and the empty string <code>""</code> are <b>truthy</b> (unlike other languages).</p>`),
      why: L(`<p>Чому <code>then</code> і <code>end</code> замість дужок? Lua створювали для людей, які не є професійними програмістами (інженерів, дизайнерів). Слова читаються природніше за символи.</p>`,
        `<p>Почему <code>then</code> и <code>end</code> вместо скобок? Lua создавали для людей, которые не являются профессиональными программистами (инженеров, дизайнеров). Слова читаются естественнее символов.</p>`,
        `<p>Why <code>then</code> and <code>end</code> instead of braces? Lua was designed for non-professional programmers (engineers, designers). Words read more naturally than symbols.</p>`),
      mistakes: L(`<ul><li><code>!=</code> замість <code>~=</code> → синтаксична помилка.</li><li>Забутий <code>then</code> або <code>end</code>.</li><li><code>else if</code> окремо створює вкладений if, і тоді потрібен зайвий <code>end</code>.</li></ul>`,
        `<ul><li><code>!=</code> вместо <code>~=</code> → синтаксическая ошибка.</li><li>Забытый <code>then</code> или <code>end</code>.</li><li><code>else if</code> раздельно создаёт вложенный if, и тогда нужен лишний <code>end</code>.</li></ul>`,
        `<ul><li><code>!=</code> instead of <code>~=</code> → syntax error.</li><li>A missing <code>then</code> or <code>end</code>.</li><li><code>else if</code> as two words creates a nested if needing an extra <code>end</code>.</li></ul>`),
      examples: [
        { title: 'if / elseif', code: 'local hp = 15\nif hp <= 0 then\n  print("Game over")\nelseif hp < 20 then\n  print("Low health!")\nelse\n  print("OK")\nend', note: L('Зміни hp і перевір.', 'Измени hp и проверь.', 'Change hp and check.') },
        { title: '~=', code: 'local password = "lua123"\nif password ~= "admin" then\n  print("Not the admin password")\nend', note: L('Не дорівнює — <code>~=</code>.', 'Не равно — <code>~=</code>.', 'Not equal is <code>~=</code>.') },
        { title: 'and / or', code: 'local level, hasKey = 5, true\nif level >= 5 and hasKey then\n  print("Door opened")\nend\nlocal name = nil\nprint(name or "Guest")', note: L('<code>a or b</code> — значення за замовчуванням.', '<code>a or b</code> — значение по умолчанию.', '<code>a or b</code> gives a default.') },
        { title: L('0 — істина!', '0 — истина!', '0 is truthy!'), code: 'if 0 then print("0 is true in Lua") end\nif "" then print("empty string is true too") end\nif not nil then print("nil is false") end', note: L('Лише false і nil хибні.', 'Только false и nil ложны.', 'Only false and nil are falsy.') }
      ],
      task: {
        text: L('Змінна <code>score = 73</code>. Виведи <code>A</code> для 90+, <code>B</code> для 75–89, <code>C</code> для 50–74, <code>F</code> — нижче.', 'Переменная <code>score = 73</code>. Выведи <code>A</code> для 90+, <code>B</code> для 75–89, <code>C</code> для 50–74, <code>F</code> — ниже.', 'With <code>score = 73</code>, print <code>A</code> for 90+, <code>B</code> for 75–89, <code>C</code> for 50–74, <code>F</code> below that.'),
        how: [L('<code>if … then … elseif … then … else … end</code>', '<code>if … then … elseif … then … else … end</code>', '<code>if … then … elseif … then … else … end</code>')],
        starter: 'local score = 73\n',
        solution: 'local score = 73\nif score >= 90 then\n  print("A")\nelseif score >= 75 then\n  print("B")\nelseif score >= 50 then\n  print("C")\nelse\n  print("F")\nend',
        hint: L('Від найбільшої межі до найменшої.', 'От самой большой границы к самой маленькой.', 'From the highest bound down.'),
        expected: 'C',
        must: /elseif[\s\S]*elseif[\s\S]*else/
      },
      quiz: { q: L('Яке значення в Lua хибне?', 'Какое значение в Lua ложно?', 'Which value is falsy in Lua?'), options: ['0', '""', 'nil'], answer: 2, explain: L('Хибні лише false і nil.', 'Ложны только false и nil.', 'Only false and nil.') },
      ref: [{ code: 'if c then … elseif … else … end', d: L('умова', 'условие', 'condition') }, { code: '~=  and or not', d: L('не дорівнює, логіка', 'не равно, логика', 'not equal, logic') }]
    },
    {
      id: 'loops', chapter: CH1,
      title: L('Цикли: while, repeat, for', 'Циклы: while, repeat, for', 'Loops: while, repeat, for'),
      theory: L(
        `<p><b>Числовий for</b>:</p>
<pre class="inline-code">for i = 1, 5 do        -- 1, 2, 3, 4, 5 (кінець ВКЛЮЧНО)
  print(i)
end
for i = 10, 0, -2 do   -- крок -2
  print(i)
end</pre>
<p><b>while</b> — поки умова істинна: <code>while hp &gt; 0 do … end</code>.</p>
<p><b>repeat … until</b> — виконує тіло, доки умова <b>не стане</b> істинною (хоча б один раз):</p>
<pre class="inline-code">repeat
  roll = math.random(1, 6)
until roll == 6</pre>
<p><code>break</code> виходить з циклу. Окремого <code>continue</code> у Lua немає (у Luau/Roblox — є).</p>`,
        `<p><b>Числовой for</b>:</p>
<pre class="inline-code">for i = 1, 5 do        -- 1, 2, 3, 4, 5 (конец ВКЛЮЧИТЕЛЬНО)
  print(i)
end
for i = 10, 0, -2 do   -- шаг -2
  print(i)
end</pre>
<p><b>while</b> — пока условие истинно: <code>while hp &gt; 0 do … end</code>.</p>
<p><b>repeat … until</b> — выполняет тело, пока условие <b>не станет</b> истинным (хотя бы один раз):</p>
<pre class="inline-code">repeat
  roll = math.random(1, 6)
until roll == 6</pre>
<p><code>break</code> выходит из цикла. Отдельного <code>continue</code> в Lua нет (в Luau/Roblox — есть).</p>`,
        `<p>The <b>numeric for</b>:</p>
<pre class="inline-code">for i = 1, 5 do        -- 1, 2, 3, 4, 5 (end INCLUDED)
  print(i)
end
for i = 10, 0, -2 do   -- step -2
  print(i)
end</pre>
<p><b>while</b> — while the condition is true: <code>while hp &gt; 0 do … end</code>.</p>
<p><b>repeat … until</b> runs the body until the condition <b>becomes</b> true (at least once):</p>
<pre class="inline-code">repeat
  roll = math.random(1, 6)
until roll == 6</pre>
<p><code>break</code> exits a loop. Plain Lua has no <code>continue</code> (Luau/Roblox does).</p>`),
      why: L(`<p>На відміну від Python, у Lua кінець діапазону <b>включається</b>: <code>for i = 1, 10</code> — рівно десять разів, від 1 до 10. Це інтуїтивніше для початківців. Нумерація в Lua взагалі починається з 1 (ти побачиш це в таблицях).</p>`,
        `<p>В отличие от Python, в Lua конец диапазона <b>включается</b>: <code>for i = 1, 10</code> — ровно десять раз, от 1 до 10. Это интуитивнее для новичков. Нумерация в Lua вообще начинается с 1 (ты увидишь это в таблицах).</p>`,
        `<p>Unlike Python, Lua’s range end is <b>included</b>: <code>for i = 1, 10</code> runs exactly ten times, 1 to 10. That’s more intuitive for beginners. Lua counting generally starts at 1 (you’ll see this in tables).</p>`),
      mistakes: L(`<ul><li>Забутий <code>do</code> після умови циклу.</li><li><code>while</code> без зміни змінної — нескінченний цикл.</li></ul>`,
        `<ul><li>Забытый <code>do</code> после условия цикла.</li><li><code>while</code> без изменения переменной — бесконечный цикл.</li></ul>`,
        `<ul><li>Forgetting <code>do</code> after the loop header.</li><li>A <code>while</code> that never changes its variable — infinite loop.</li></ul>`),
      examples: [
        { title: 'for', code: 'for i = 1, 5 do\n  print("Level " .. i)\nend', note: L('Кінець включно.', 'Конец включительно.', 'End included.') },
        { title: L('Крок', 'Шаг', 'Step'), code: 'for i = 10, 0, -2 do\n  io.write(i, " ")\nend\nprint()', note: L('<code>io.write</code> пише без переносу рядка.', '<code>io.write</code> пишет без переноса строки.', '<code>io.write</code> prints without a newline.') },
        { title: 'while', code: 'local hp, turns = 100, 0\nwhile hp > 0 do\n  hp = hp - 30\n  turns = turns + 1\nend\nprint("Defeated in", turns, "turns")', note: L('Кількість ходів заздалегідь невідома.', 'Количество ходов заранее неизвестно.', 'The number of turns isn’t known in advance.') },
        { title: 'repeat', code: 'local n = 1\nrepeat\n  n = n * 3\nuntil n > 100\nprint(n)', note: L('Виконується, доки n не перевищить 100.', 'Выполняется, пока n не превысит 100.', 'Runs until n exceeds 100.') }
      ],
      task: {
        text: L('Порахуй суму всіх <b>парних</b> чисел від 2 до 20 включно через <code>for</code> з кроком 2 і виведи її.', 'Посчитай сумму всех <b>чётных</b> чисел от 2 до 20 включительно через <code>for</code> с шагом 2 и выведи её.', 'Sum all <b>even</b> numbers from 2 to 20 inclusive using <code>for</code> with step 2, and print it.'),
        how: [L('<code>local sum = 0</code>', '<code>local sum = 0</code>', '<code>local sum = 0</code>'), L('<code>for i = 2, 20, 2 do sum = sum + i end</code>', '<code>for i = 2, 20, 2 do sum = sum + i end</code>', '<code>for i = 2, 20, 2 do sum = sum + i end</code>')],
        starter: '',
        solution: 'local sum = 0\nfor i = 2, 20, 2 do\n  sum = sum + i\nend\nprint(sum)',
        hint: L('Відповідь: 110.', 'Ответ: 110.', 'The answer is 110.'),
        expected: '110',
        must: /for\s+\w+\s*=\s*2\s*,\s*20\s*,\s*2/
      },
      quiz: { q: L('Скільки разів виконається <code>for i = 1, 3 do</code>?', 'Сколько раз выполнится <code>for i = 1, 3 do</code>?', 'How many times does <code>for i = 1, 3 do</code> run?'), options: ['2', '3', '4'], answer: 1, explain: L('1, 2, 3 — кінець включно.', '1, 2, 3 — конец включительно.', '1, 2, 3 — end included.') },
      ref: [{ code: 'for i = a, b, step do … end', d: L('числовий цикл', 'числовой цикл', 'numeric loop') }, { code: 'while c do … end', d: L('поки', 'пока', 'while') }, { code: 'repeat … until c', d: L('до умови', 'до условия', 'until') }]
    },
    {
      id: 'functions', chapter: CH2,
      title: L('Функції', 'Функции', 'Functions'),
      theory: L(
        `<p>Функцію оголошують через <code>function</code> … <code>end</code>:</p>
<pre class="inline-code">local function greet(name)
  return "Hi, " .. name .. "!"
end
print(greet("Ann"))</pre>
<ul><li><code>local function</code> — локальна функція (як і зі змінними, це краще)</li><li><code>return</code> повертає значення; у Lua можна повернути <b>кілька</b>: <code>return min, max</code></li><li>Якщо аргументів передано менше — решта параметрів <code>nil</code>; значення за замовчуванням роблять так: <code>n = n or 1</code></li><li>Функції — це значення: їх можна класти в змінні й таблиці, передавати в інші функції</li></ul>`,
        `<p>Функцию объявляют через <code>function</code> … <code>end</code>:</p>
<pre class="inline-code">local function greet(name)
  return "Hi, " .. name .. "!"
end
print(greet("Ann"))</pre>
<ul><li><code>local function</code> — локальная функция (как и с переменными, это лучше)</li><li><code>return</code> возвращает значение; в Lua можно вернуть <b>несколько</b>: <code>return min, max</code></li><li>Если аргументов передано меньше — остальные параметры <code>nil</code>; значение по умолчанию делают так: <code>n = n or 1</code></li><li>Функции — это значения: их можно класть в переменные и таблицы, передавать в другие функции</li></ul>`,
        `<p>Declare a function with <code>function</code> … <code>end</code>:</p>
<pre class="inline-code">local function greet(name)
  return "Hi, " .. name .. "!"
end
print(greet("Ann"))</pre>
<ul><li><code>local function</code> — a local function (better, as with variables)</li><li><code>return</code> gives back a value; Lua can return <b>several</b>: <code>return min, max</code></li><li>Fewer arguments than parameters → the rest are <code>nil</code>; defaults look like <code>n = n or 1</code></li><li>Functions are values: store them in variables and tables, pass them to other functions</li></ul>`),
      why: L(`<p>Повернення кількох значень — фішка Lua, яка позбавляє від створення тимчасових таблиць: <code>local x, y = getPosition()</code>. А функції-значення лежать в основі подій у Roblox: <code>part.Touched:Connect(function() … end)</code>.</p>`,
        `<p>Возврат нескольких значений — фишка Lua, избавляющая от создания временных таблиц: <code>local x, y = getPosition()</code>. А функции-значения лежат в основе событий в Roblox: <code>part.Touched:Connect(function() … end)</code>.</p>`,
        `<p>Returning several values is a Lua perk that avoids temporary tables: <code>local x, y = getPosition()</code>. And functions-as-values underpin Roblox events: <code>part.Touched:Connect(function() … end)</code>.</p>`),
      mistakes: L(`<ul><li>Викликати локальну функцію вище її оголошення → <code>attempt to call a nil value</code>.</li><li>Забути <code>end</code> функції.</li></ul>`,
        `<ul><li>Вызывать локальную функцию выше её объявления → <code>attempt to call a nil value</code>.</li><li>Забыть <code>end</code> функции.</li></ul>`,
        `<ul><li>Calling a local function above its declaration → <code>attempt to call a nil value</code>.</li><li>Forgetting the function’s <code>end</code>.</li></ul>`),
      examples: [
        { title: 'return', code: 'local function area(w, h)\n  return w * h\nend\nprint(area(4, 5))\nprint(area(2, 3) + area(1, 1))', note: L('Результат використовується далі.', 'Результат используется дальше.', 'The result is used further.') },
        { title: L('Кілька значень', 'Несколько значений', 'Multiple returns'), code: 'local function minMax(a, b, c)\n  return math.min(a, b, c), math.max(a, b, c)\nend\nlocal lo, hi = minMax(4, 9, 1)\nprint(lo, hi)', note: L('Дві змінні з одного виклику.', 'Две переменные из одного вызова.', 'Two variables from one call.') },
        { title: L('За замовчуванням', 'По умолчанию', 'Defaults'), code: 'local function heal(hp, amount)\n  amount = amount or 10\n  return math.min(hp + amount, 100)\nend\nprint(heal(50))\nprint(heal(95, 20))', note: L('<code>or</code> — значення за замовчуванням.', '<code>or</code> — значение по умолчанию.', '<code>or</code> provides a default.') },
        { title: L('Функція як значення', 'Функция как значение', 'Function as value'), code: 'local function applyTwice(f, x)\n  return f(f(x))\nend\nprint(applyTwice(function(n) return n * 3 end, 2))', note: L('Безіменна функція передана як аргумент.', 'Безымянная функция передана как аргумент.', 'An anonymous function passed as an argument.') }
      ],
      task: {
        text: L('Напиши функцію <code>damage(hp, dmg, armor)</code>, що повертає нове здоров’я: <code>hp - (dmg - armor)</code>, але шкода не може бути меншою за 1, а здоров’я — нижче 0. Параметр <code>armor</code> за замовчуванням 0. Виклики готові.', 'Напиши функцию <code>damage(hp, dmg, armor)</code>, возвращающую новое здоровье: <code>hp - (dmg - armor)</code>, но урон не может быть меньше 1, а здоровье — ниже 0. Параметр <code>armor</code> по умолчанию 0. Вызовы готовы.', 'Write <code>damage(hp, dmg, armor)</code> returning the new health: <code>hp - (dmg - armor)</code>, but damage can’t be below 1 and health can’t go below 0. <code>armor</code> defaults to 0. The calls are ready.'),
        how: [L('<code>armor = armor or 0</code>', '<code>armor = armor or 0</code>', '<code>armor = armor or 0</code>'), L('<code>local real = math.max(1, dmg - armor)</code>', '<code>local real = math.max(1, dmg - armor)</code>', '<code>local real = math.max(1, dmg - armor)</code>'), L('<code>return math.max(0, hp - real)</code>', '<code>return math.max(0, hp - real)</code>', '<code>return math.max(0, hp - real)</code>')],
        starter: 'local function damage(hp, dmg, armor)\n  -- your code\nend\n\nprint(damage(100, 30))\nprint(damage(100, 30, 10))\nprint(damage(100, 5, 20))\nprint(damage(10, 50))\n',
        solution: 'local function damage(hp, dmg, armor)\n  armor = armor or 0\n  local real = math.max(1, dmg - armor)\n  return math.max(0, hp - real)\nend\n\nprint(damage(100, 30))\nprint(damage(100, 30, 10))\nprint(damage(100, 5, 20))\nprint(damage(10, 50))\n',
        hint: L('Очікувано: 70, 80, 99, 0.', 'Ожидается: 70, 80, 99, 0.', 'Expected: 70, 80, 99, 0.'),
        expected: '70\n80\n99\n0',
        must: /return/
      },
      quiz: { q: L('Скільки значень може повернути функція в Lua?', 'Сколько значений может вернуть функция в Lua?', 'How many values can a Lua function return?'), options: ['1', L('кілька', 'несколько', 'several'), '0'], answer: 1, explain: L('return a, b, c.', 'return a, b, c.', 'return a, b, c.') },
      ref: [{ code: 'local function f(a) return a end', d: L('функція', 'функция', 'function') }, { code: 'return a, b', d: L('кілька результатів', 'несколько результатов', 'multiple results') }, { code: 'x = x or default', d: L('значення за замовчуванням', 'значение по умолчанию', 'default value') }]
    },
    {
      id: 'arrays', chapter: CH2,
      title: L('Таблиці як масиви', 'Таблицы как массивы', 'Tables as arrays'),
      theory: L(
        `<p>У Lua є лише одна структура даних — <b>таблиця</b>. Вона працює і як масив, і як словник, і як об’єкт.</p>
<pre class="inline-code">local fruits = {"apple", "banana", "kiwi"}
print(fruits[1])     -- "apple" — індекси з 1!
print(#fruits)       -- 3 — довжина</pre>
<p>Бібліотека <code>table</code>:</p>
<ul><li><code>table.insert(t, x)</code> — додати в кінець, <code>table.insert(t, 1, x)</code> — на початок</li><li><code>table.remove(t)</code> — забрати останній, <code>table.remove(t, i)</code> — за індексом</li><li><code>table.sort(t)</code> — сортувати (можна з функцією порівняння)</li><li><code>table.concat(t, ", ")</code> — склеїти в рядок</li></ul>
<p>Перебір: <code>for i, v in ipairs(t) do … end</code> — індекс і значення по порядку.</p>`,
        `<p>В Lua есть только одна структура данных — <b>таблица</b>. Она работает и как массив, и как словарь, и как объект.</p>
<pre class="inline-code">local fruits = {"apple", "banana", "kiwi"}
print(fruits[1])     -- "apple" — индексы с 1!
print(#fruits)       -- 3 — длина</pre>
<p>Библиотека <code>table</code>:</p>
<ul><li><code>table.insert(t, x)</code> — добавить в конец, <code>table.insert(t, 1, x)</code> — в начало</li><li><code>table.remove(t)</code> — забрать последний, <code>table.remove(t, i)</code> — по индексу</li><li><code>table.sort(t)</code> — сортировать (можно с функцией сравнения)</li><li><code>table.concat(t, ", ")</code> — склеить в строку</li></ul>
<p>Перебор: <code>for i, v in ipairs(t) do … end</code> — индекс и значение по порядку.</p>`,
        `<p>Lua has only one data structure — the <b>table</b>. It works as an array, a dictionary and an object.</p>
<pre class="inline-code">local fruits = {"apple", "banana", "kiwi"}
print(fruits[1])     -- "apple" — indices start at 1!
print(#fruits)       -- 3 — the length</pre>
<p>The <code>table</code> library:</p>
<ul><li><code>table.insert(t, x)</code> — add to the end, <code>table.insert(t, 1, x)</code> — to the start</li><li><code>table.remove(t)</code> — take the last, <code>table.remove(t, i)</code> — by index</li><li><code>table.sort(t)</code> — sort (optionally with a compare function)</li><li><code>table.concat(t, ", ")</code> — join into a string</li></ul>
<p>Iterate with <code>for i, v in ipairs(t) do … end</code> — index and value in order.</p>`),
      why: L(`<p>Чому індекси з 1? Lua створювали для людей поза програмуванням, а «перший елемент — номер 1» природно для всіх. Одна універсальна структура (таблиця) робить мову маленькою: вивчив таблиці — знаєш майже все.</p>`,
        `<p>Почему индексы с 1? Lua создавали для людей вне программирования, а «первый элемент — номер 1» естественно для всех. Одна универсальная структура (таблица) делает язык маленьким: изучил таблицы — знаешь почти всё.</p>`,
        `<p>Why start at 1? Lua was made for non-programmers, and “the first item is number 1” is natural for everyone. A single universal structure (the table) keeps the language small: learn tables and you know almost everything.</p>`),
      mistakes: L(`<ul><li><code>t[0]</code> — за замовчуванням там <code>nil</code>; перший елемент — <code>t[1]</code>.</li><li>«Дірки» (<code>nil</code> посередині масиву) ламають <code>#</code> та <code>ipairs</code>.</li><li><code>print(t)</code> виводить адресу, а не вміст — використовуй <code>table.concat</code>.</li></ul>`,
        `<ul><li><code>t[0]</code> — по умолчанию там <code>nil</code>; первый элемент — <code>t[1]</code>.</li><li>«Дыры» (<code>nil</code> посередине массива) ломают <code>#</code> и <code>ipairs</code>.</li><li><code>print(t)</code> выводит адрес, а не содержимое — используй <code>table.concat</code>.</li></ul>`,
        `<ul><li><code>t[0]</code> is <code>nil</code> by default; the first item is <code>t[1]</code>.</li><li>“Holes” (<code>nil</code> in the middle) break <code>#</code> and <code>ipairs</code>.</li><li><code>print(t)</code> prints an address, not the contents — use <code>table.concat</code>.</li></ul>`),
      examples: [
        { title: L('Основи', 'Основы', 'Basics'), code: 'local games = {"Minecraft", "Roblox", "Terraria"}\nprint(games[1], games[#games])\nprint(#games)\nprint(table.concat(games, ", "))', note: L('<code>t[#t]</code> — останній елемент.', '<code>t[#t]</code> — последний элемент.', '<code>t[#t]</code> is the last item.') },
        { title: 'insert / remove', code: 'local stack = {}\ntable.insert(stack, "a")\ntable.insert(stack, "b")\ntable.insert(stack, 1, "start")\nprint(table.concat(stack, " "))\nlocal last = table.remove(stack)\nprint(last, #stack)', note: L('remove повертає вилучене.', 'remove возвращает извлечённое.', 'remove returns what it took.') },
        { title: 'ipairs', code: 'local scores = {40, 85, 72}\nlocal total = 0\nfor i, s in ipairs(scores) do\n  print(i, s)\n  total = total + s\nend\nprint("Total:", total)', note: L('Індекс і значення по порядку.', 'Индекс и значение по порядку.', 'Index and value in order.') },
        { title: 'sort', code: 'local nums = {5, 2, 9, 1}\ntable.sort(nums)\nprint(table.concat(nums, " "))\ntable.sort(nums, function(a, b) return a > b end)\nprint(table.concat(nums, " "))', note: L('Функція порівняння для спадання.', 'Функция сравнения для убывания.', 'A compare function for descending order.') }
      ],
      task: {
        text: L('Є таблиця <code>loot = {"sword", "potion", "shield"}</code>. Додай <code>"bow"</code> у кінець, видали другий елемент, відсортуй за абеткою й виведи через <code>table.concat</code> з <code>", "</code>. Потім виведи кількість предметів.', 'Есть таблица <code>loot = {"sword", "potion", "shield"}</code>. Добавь <code>"bow"</code> в конец, удали второй элемент, отсортируй по алфавиту и выведи через <code>table.concat</code> с <code>", "</code>. Затем выведи количество предметов.', 'Given <code>loot = {"sword", "potion", "shield"}</code>, add <code>"bow"</code> to the end, remove the second item, sort alphabetically and print with <code>table.concat</code> using <code>", "</code>. Then print the number of items.'),
        how: [L('<code>table.insert</code>, <code>table.remove(loot, 2)</code>, <code>table.sort</code>.', '<code>table.insert</code>, <code>table.remove(loot, 2)</code>, <code>table.sort</code>.', '<code>table.insert</code>, <code>table.remove(loot, 2)</code>, <code>table.sort</code>.')],
        starter: 'local loot = {"sword", "potion", "shield"}\n',
        solution: 'local loot = {"sword", "potion", "shield"}\ntable.insert(loot, "bow")\ntable.remove(loot, 2)\ntable.sort(loot)\nprint(table.concat(loot, ", "))\nprint(#loot)',
        hint: L('Очікувано: <code>bow, shield, sword</code> і 3.', 'Ожидается: <code>bow, shield, sword</code> и 3.', 'Expected: <code>bow, shield, sword</code> and 3.'),
        expected: 'bow, shield, sword\n3',
        must: /table\.insert[\s\S]*table\.remove[\s\S]*table\.sort/
      },
      quiz: { q: L('Що виведе <code>print(({"a","b","c"})[1])</code>?', 'Что выведет <code>print(({"a","b","c"})[1])</code>?', 'What does <code>print(({"a","b","c"})[1])</code> print?'), options: ['a', 'b', 'nil'], answer: 0, explain: L('Індекси Lua з 1.', 'Индексы Lua с 1.', 'Lua indices start at 1.') },
      ref: [{ code: '{1, 2, 3}  t[1]  #t', d: L('масив', 'массив', 'array') }, { code: 'table.insert/remove/sort/concat', d: L('бібліотека table', 'библиотека table', 'table library') }, { code: 'for i, v in ipairs(t)', d: L('перебір по порядку', 'перебор по порядку', 'ordered iteration') }]
    },
    {
      id: 'dicts', chapter: CH2,
      title: L('Таблиці як словники', 'Таблицы как словари', 'Tables as dictionaries'),
      theory: L(
        `<p>Ключами таблиці можуть бути рядки — тоді це <b>словник</b>:</p>
<pre class="inline-code">local player = {name = "Steve", hp = 20, level = 3}
print(player.name)        -- крапка
print(player["hp"])       -- або дужки
player.gold = 100         -- додати поле
player.level = nil        -- видалити поле</pre>
<p>Перебір усіх пар — <code>pairs</code>:</p>
<pre class="inline-code">for key, value in pairs(player) do
  print(key, value)
end</pre>
<p><b>Увага:</b> порядок у <code>pairs</code> <b>не гарантований</b>. Якщо порядок важливий — збери ключі в масив і відсортуй.</p>
<p>Таблиці можна вкладати: <code>player.inventory = {"sword", "map"}</code>.</p>`,
        `<p>Ключами таблицы могут быть строки — тогда это <b>словарь</b>:</p>
<pre class="inline-code">local player = {name = "Steve", hp = 20, level = 3}
print(player.name)        -- точка
print(player["hp"])       -- или скобки
player.gold = 100         -- добавить поле
player.level = nil        -- удалить поле</pre>
<p>Перебор всех пар — <code>pairs</code>:</p>
<pre class="inline-code">for key, value in pairs(player) do
  print(key, value)
end</pre>
<p><b>Внимание:</b> порядок в <code>pairs</code> <b>не гарантирован</b>. Если порядок важен — собери ключи в массив и отсортируй.</p>
<p>Таблицы можно вкладывать: <code>player.inventory = {"sword", "map"}</code>.</p>`,
        `<p>Table keys can be strings — then it’s a <b>dictionary</b>:</p>
<pre class="inline-code">local player = {name = "Steve", hp = 20, level = 3}
print(player.name)        -- dot
print(player["hp"])       -- or brackets
player.gold = 100         -- add a field
player.level = nil        -- remove a field</pre>
<p>Iterate all pairs with <code>pairs</code>:</p>
<pre class="inline-code">for key, value in pairs(player) do
  print(key, value)
end</pre>
<p><b>Note:</b> <code>pairs</code> order is <b>not guaranteed</b>. If order matters, collect the keys into an array and sort it.</p>
<p>Tables nest: <code>player.inventory = {"sword", "map"}</code>.</p>`),
      why: L(`<p>Гравець, предмет, налаштування гри — усе описується таблицею з полями. У Roblox так зберігають статистику, конфігурації зброї, дані гравців для збереження (DataStore).</p>`,
        `<p>Игрок, предмет, настройки игры — всё описывается таблицей с полями. В Roblox так хранят статистику, конфигурации оружия, данные игроков для сохранения (DataStore).</p>`,
        `<p>A player, an item, game settings — all described by a table with fields. In Roblox this is how stats, weapon configs and saved player data (DataStore) are stored.</p>`),
      mistakes: L(`<ul><li><code>#dict</code> для словника не працює (дає 0) — порахуй через <code>pairs</code>.</li><li><code>t.key</code>, коли ключ у змінній <code>key</code> — треба <code>t[key]</code>.</li></ul>`,
        `<ul><li><code>#dict</code> для словаря не работает (даёт 0) — посчитай через <code>pairs</code>.</li><li><code>t.key</code>, когда ключ в переменной <code>key</code> — нужно <code>t[key]</code>.</li></ul>`,
        `<ul><li><code>#dict</code> doesn’t work on a dictionary (gives 0) — count with <code>pairs</code>.</li><li><code>t.key</code> when the key is in variable <code>key</code> — use <code>t[key]</code>.</li></ul>`),
      examples: [
        { title: L('Поля', 'Поля', 'Fields'), code: 'local player = {name = "Steve", hp = 20}\nplayer.gold = 100\nplayer.hp = player.hp - 5\nprint(player.name, player.hp, player.gold)\nprint(player.mana)', note: L('Неіснуюче поле — nil.', 'Несуществующее поле — nil.', 'A missing field is nil.') },
        { title: 'pairs', code: 'local prices = {bread = 30, milk = 45, cheese = 120}\nlocal total = 0\nfor item, price in pairs(prices) do\n  total = total + price\nend\nprint("Total:", total)', note: L('Сума не залежить від порядку.', 'Сумма не зависит от порядка.', 'The sum doesn’t depend on order.') },
        { title: L('Відсортовані ключі', 'Отсортированные ключи', 'Sorted keys'), code: 'local stats = {strength = 7, agility = 9, magic = 3}\nlocal keys = {}\nfor k in pairs(stats) do table.insert(keys, k) end\ntable.sort(keys)\nfor _, k in ipairs(keys) do\n  print(k, stats[k])\nend', note: L('Стабільний порядок для виводу.', 'Стабильный порядок для вывода.', 'A stable order for printing.') },
        { title: L('Вкладені', 'Вложенные', 'Nested'), code: 'local hero = {\n  name = "Link",\n  pos = {x = 10, y = 4},\n  items = {"sword", "shield"}\n}\nprint(hero.pos.x, hero.items[2])', note: L('Таблиці в таблицях.', 'Таблицы в таблицах.', 'Tables in tables.') }
      ],
      task: {
        text: L('Порахуй, скільки разів зустрічається кожне слово в масиві <code>votes = {"red", "blue", "red", "green", "red", "blue"}</code>, у таблиці-словнику. Виведи результати <b>за абеткою</b> у форматі <code>blue: 2</code>.', 'Посчитай, сколько раз встречается каждое слово в массиве <code>votes = {"red", "blue", "red", "green", "red", "blue"}</code>, в таблице-словаре. Выведи результаты <b>по алфавиту</b> в формате <code>blue: 2</code>.', 'Count how often each word appears in <code>votes = {"red", "blue", "red", "green", "red", "blue"}</code> using a dictionary table. Print the results <b>alphabetically</b> as <code>blue: 2</code>.'),
        how: [L('<code>counts[v] = (counts[v] or 0) + 1</code>', '<code>counts[v] = (counts[v] or 0) + 1</code>', '<code>counts[v] = (counts[v] or 0) + 1</code>'), L('Збери ключі, відсортуй, виведи.', 'Собери ключи, отсортируй, выведи.', 'Collect the keys, sort, print.')],
        starter: 'local votes = {"red", "blue", "red", "green", "red", "blue"}\n',
        solution: 'local votes = {"red", "blue", "red", "green", "red", "blue"}\nlocal counts = {}\nfor _, v in ipairs(votes) do\n  counts[v] = (counts[v] or 0) + 1\nend\nlocal keys = {}\nfor k in pairs(counts) do table.insert(keys, k) end\ntable.sort(keys)\nfor _, k in ipairs(keys) do\n  print(k .. ": " .. counts[k])\nend',
        hint: L('Очікувано: blue: 2, green: 1, red: 3.', 'Ожидается: blue: 2, green: 1, red: 3.', 'Expected: blue: 2, green: 1, red: 3.'),
        expected: 'blue: 2\ngreen: 1\nred: 3',
        must: /pairs/
      },
      quiz: { q: L('Чи гарантований порядок у <code>pairs</code>?', 'Гарантирован ли порядок в <code>pairs</code>?', 'Is <code>pairs</code> order guaranteed?'), options: [L('так', 'да', 'yes'), L('ні', 'нет', 'no')], answer: 1, explain: L('Для порядку — сортуй ключі.', 'Для порядка — сортируй ключи.', 'Sort the keys for order.') },
      ref: [{ code: '{key = value}  t.key  t[k]', d: L('словник', 'словарь', 'dictionary') }, { code: 'for k, v in pairs(t)', d: L('перебір пар', 'перебор пар', 'iterate pairs') }]
    },
    {
      id: 'strlib', chapter: CH2,
      title: L('Бібліотека string', 'Библиотека string', 'The string library'),
      theory: L(
        `<p>Корисні функції для тексту (можна викликати через двокрапку: <code>s:upper()</code>):</p>
<table class="mini"><tr><td><code>s:upper() / s:lower()</code></td><td>регістр</td></tr><tr><td><code>s:len()</code> або <code>#s</code></td><td>довжина</td></tr><tr><td><code>s:sub(i, j)</code></td><td>підрядок з i по j (від’ємні — з кінця)</td></tr><tr><td><code>s:rep(n)</code></td><td>повторити</td></tr><tr><td><code>s:reverse()</code></td><td>навпаки</td></tr><tr><td><code>s:find("x")</code></td><td>позиція</td></tr><tr><td><code>s:gsub("a", "b")</code></td><td>замінити (повертає рядок і кількість замін)</td></tr><tr><td><code>s:gmatch("%a+")</code></td><td>перебрати збіги шаблону</td></tr></table>
<p>Шаблони Lua: <code>%a</code> літера, <code>%d</code> цифра, <code>%s</code> пробіл, <code>%w</code> літера або цифра, <code>+</code> — один або більше, <code>.</code> — будь-який символ.</p>`,
        `<p>Полезные функции для текста (можно вызывать через двоеточие: <code>s:upper()</code>):</p>
<table class="mini"><tr><td><code>s:upper() / s:lower()</code></td><td>регистр</td></tr><tr><td><code>s:len()</code> или <code>#s</code></td><td>длина</td></tr><tr><td><code>s:sub(i, j)</code></td><td>подстрока с i по j (отрицательные — с конца)</td></tr><tr><td><code>s:rep(n)</code></td><td>повторить</td></tr><tr><td><code>s:reverse()</code></td><td>наоборот</td></tr><tr><td><code>s:find("x")</code></td><td>позиция</td></tr><tr><td><code>s:gsub("a", "b")</code></td><td>заменить (возвращает строку и количество замен)</td></tr><tr><td><code>s:gmatch("%a+")</code></td><td>перебрать совпадения шаблона</td></tr></table>
<p>Шаблоны Lua: <code>%a</code> буква, <code>%d</code> цифра, <code>%s</code> пробел, <code>%w</code> буква или цифра, <code>+</code> — один или больше, <code>.</code> — любой символ.</p>`,
        `<p>Useful text functions (callable with a colon: <code>s:upper()</code>):</p>
<table class="mini"><tr><td><code>s:upper() / s:lower()</code></td><td>case</td></tr><tr><td><code>s:len()</code> or <code>#s</code></td><td>length</td></tr><tr><td><code>s:sub(i, j)</code></td><td>substring i to j (negatives count from the end)</td></tr><tr><td><code>s:rep(n)</code></td><td>repeat</td></tr><tr><td><code>s:reverse()</code></td><td>reverse</td></tr><tr><td><code>s:find("x")</code></td><td>position</td></tr><tr><td><code>s:gsub("a", "b")</code></td><td>replace (returns the string and the number of replacements)</td></tr><tr><td><code>s:gmatch("%a+")</code></td><td>iterate pattern matches</td></tr></table>
<p>Lua patterns: <code>%a</code> letter, <code>%d</code> digit, <code>%s</code> space, <code>%w</code> letter or digit, <code>+</code> one or more, <code>.</code> any character.</p>`),
      why: L(`<p>Чат-команди («/kick Alex»), розбір введення, перевірка ніків — усе це обробка рядків. Шаблони Lua — легка версія регулярних виразів, вбудована прямо в мову.</p>`,
        `<p>Чат-команды («/kick Alex»), разбор ввода, проверка ников — всё это обработка строк. Шаблоны Lua — лёгкая версия регулярных выражений, встроенная прямо в язык.</p>`,
        `<p>Chat commands (“/kick Alex”), parsing input, validating nicknames — all string processing. Lua patterns are a lightweight form of regular expressions built into the language.</p>`),
      mistakes: L(`<ul><li><code>gsub</code> повертає <b>два</b> значення — у <code>print</code> побачиш і кількість замін. Загорни в дужки: <code>print((s:gsub(...)))</code>.</li><li>Спецсимволи в шаблонах (<code>. % - +</code>) треба екранувати через <code>%</code>.</li></ul>`,
        `<ul><li><code>gsub</code> возвращает <b>два</b> значения — в <code>print</code> увидишь и количество замен. Оберни в скобки: <code>print((s:gsub(...)))</code>.</li><li>Спецсимволы в шаблонах (<code>. % - +</code>) нужно экранировать через <code>%</code>.</li></ul>`,
        `<ul><li><code>gsub</code> returns <b>two</b> values — <code>print</code> shows the count too. Wrap it in parentheses: <code>print((s:gsub(...)))</code>.</li><li>Special pattern characters (<code>. % - +</code>) must be escaped with <code>%</code>.</li></ul>`),
      examples: [
        { title: L('Основи', 'Основы', 'Basics'), code: 'local s = "Hello, Lua"\nprint(s:upper())\nprint(s:sub(1, 5))\nprint(s:sub(-3))\nprint(s:reverse())\nprint(("ab"):rep(3))', note: L('Двокрапка викликає функцію для рядка.', 'Двоеточие вызывает функцию для строки.', 'A colon calls the function on the string.') },
        { title: 'find / gsub', code: 'local text = "I like cats. Cats are cool."\nprint(text:find("cats"))\nlocal new, n = text:gsub("[Cc]ats", "dogs")\nprint(new)\nprint("replaced:", n)', note: L('<code>[Cc]</code> — будь-яка з літер.', '<code>[Cc]</code> — любая из букв.', '<code>[Cc]</code> — either letter.') },
        { title: 'gmatch', code: 'local sentence = "the quick brown fox"\nlocal count = 0\nfor word in sentence:gmatch("%a+") do\n  count = count + 1\n  print(count, word)\nend', note: L('Розбиття на слова.', 'Разбиение на слова.', 'Splitting into words.') },
        { title: L('Чат-команда', 'Чат-команда', 'Chat command'), code: 'local msg = "/give Alex 50"\nlocal cmd, who, amount = msg:match("^/(%a+)%s+(%w+)%s+(%d+)$")\nprint(cmd, who, tonumber(amount) + 1)', note: L('<code>match</code> з групами в дужках.', '<code>match</code> с группами в скобках.', '<code>match</code> with capture groups.') }
      ],
      task: {
        text: L('Рядок <code>raw = "  hello world from lua  "</code>. Порахуй кількість слів (через <code>gmatch("%a+")</code>), виведи її, а потім виведи кожне слово з великої першої літери, склеєні пробілом: <code>Hello World From Lua</code>.', 'Строка <code>raw = "  hello world from lua  "</code>. Посчитай количество слов (через <code>gmatch("%a+")</code>), выведи его, а затем выведи каждое слово с заглавной первой буквы, склеенные пробелом: <code>Hello World From Lua</code>.', 'Given <code>raw = "  hello world from lua  "</code>, count the words (with <code>gmatch("%a+")</code>), print the count, then print every word capitalised and joined with spaces: <code>Hello World From Lua</code>.'),
        how: [L('Для кожного слова: <code>w:sub(1,1):upper() .. w:sub(2)</code> і <code>table.insert</code>.', 'Для каждого слова: <code>w:sub(1,1):upper() .. w:sub(2)</code> и <code>table.insert</code>.', 'For each word: <code>w:sub(1,1):upper() .. w:sub(2)</code> and <code>table.insert</code>.'), L('Наприкінці <code>table.concat(words, " ")</code>.', 'В конце <code>table.concat(words, " ")</code>.', 'Finally <code>table.concat(words, " ")</code>.')],
        starter: 'local raw = "  hello world from lua  "\n',
        solution: 'local raw = "  hello world from lua  "\nlocal words = {}\nfor w in raw:gmatch("%a+") do\n  table.insert(words, w:sub(1, 1):upper() .. w:sub(2))\nend\nprint(#words)\nprint(table.concat(words, " "))',
        hint: L('Слів 4.', 'Слов 4.', 'There are 4 words.'),
        expected: '4\nHello World From Lua',
        must: /gmatch/
      },
      quiz: { q: L('Що означає <code>%d</code> у шаблоні Lua?', 'Что означает <code>%d</code> в шаблоне Lua?', 'What does <code>%d</code> mean in a Lua pattern?'), options: [L('літера', 'буква', 'a letter'), L('цифра', 'цифра', 'a digit'), L('пробіл', 'пробел', 'a space')], answer: 1, explain: L('d — digit.', 'd — digit.', 'd — digit.') },
      ref: [{ code: 's:sub(i, j) s:upper()', d: L('підрядок, регістр', 'подстрока, регистр', 'substring, case') }, { code: 's:gsub(p, r) s:gmatch(p)', d: L('заміна, перебір збігів', 'замена, перебор совпадений', 'replace, iterate matches') }]
    },
    {
      id: 'closures', chapter: CH3,
      title: L('Область видимості та замикання', 'Область видимости и замыкания', 'Scope and closures'),
      theory: L(
        `<p>Локальна змінна видима лише в <b>блоці</b>, де її оголошено: усередині функції, циклу, <code>if</code> чи <code>do … end</code>.</p>
<p>Функція, створена всередині іншої, <b>запам’ятовує</b> її локальні змінні навіть після завершення — це <b>замикання</b>:</p>
<pre class="inline-code">local function makeCounter()
  local count = 0
  return function()
    count = count + 1
    return count
  end
end
local next = makeCounter()
print(next(), next())  -- 1  2</pre>
<p><b>Варіативні аргументи</b> <code>...</code> приймають будь-яку кількість значень: <code>local args = {...}</code> або <code>select("#", ...)</code> — кількість.</p>`,
        `<p>Локальная переменная видна только в <b>блоке</b>, где её объявили: внутри функции, цикла, <code>if</code> или <code>do … end</code>.</p>
<p>Функция, созданная внутри другой, <b>запоминает</b> её локальные переменные даже после завершения — это <b>замыкание</b>:</p>
<pre class="inline-code">local function makeCounter()
  local count = 0
  return function()
    count = count + 1
    return count
  end
end
local next = makeCounter()
print(next(), next())  -- 1  2</pre>
<p><b>Вариативные аргументы</b> <code>...</code> принимают любое количество значений: <code>local args = {...}</code> или <code>select("#", ...)</code> — количество.</p>`,
        `<p>A local variable is visible only in the <b>block</b> where it’s declared: a function, a loop, an <code>if</code> or <code>do … end</code>.</p>
<p>A function created inside another <b>remembers</b> its locals even after it finishes — a <b>closure</b>:</p>
<pre class="inline-code">local function makeCounter()
  local count = 0
  return function()
    count = count + 1
    return count
  end
end
local next = makeCounter()
print(next(), next())  -- 1  2</pre>
<p><b>Varargs</b> <code>...</code> accept any number of values: <code>local args = {...}</code>, or <code>select("#", ...)</code> for the count.</p>`),
      why: L(`<p>Замикання дають «приватний стан» без класів: лічильники, таймери перезарядки зброї, генератори ID. У Roblox обробники подій постійно використовують змінні з навколишнього коду — це теж замикання.</p>`,
        `<p>Замыкания дают «приватное состояние» без классов: счётчики, таймеры перезарядки оружия, генераторы ID. В Roblox обработчики событий постоянно используют переменные из окружающего кода — это тоже замыкания.</p>`,
        `<p>Closures give “private state” without classes: counters, weapon cooldown timers, ID generators. Roblox event handlers constantly use variables from the surrounding code — closures again.</p>`),
      mistakes: L(`<ul><li>Оголосити змінну всередині циклу й чекати, що вона збережеться після нього.</li><li>Перевизначити <code>local x</code> всередині блоку — зовнішня <code>x</code> «затіниться».</li></ul>`,
        `<ul><li>Объявить переменную внутри цикла и ждать, что она сохранится после него.</li><li>Переопределить <code>local x</code> внутри блока — внешняя <code>x</code> «затенится».</li></ul>`,
        `<ul><li>Declaring a variable inside a loop and expecting it to survive after.</li><li>Redeclaring <code>local x</code> inside a block shadows the outer <code>x</code>.</li></ul>`),
      examples: [
        { title: L('Блоки', 'Блоки', 'Blocks'), code: 'local x = "outer"\ndo\n  local x = "inner"\n  print(x)\nend\nprint(x)', note: L('Внутрішня x існує лише в блоці.', 'Внутренняя x существует только в блоке.', 'The inner x exists only in the block.') },
        { title: L('Лічильник', 'Счётчик', 'Counter'), code: 'local function makeCounter()\n  local count = 0\n  return function()\n    count = count + 1\n    return count\n  end\nend\nlocal a, b = makeCounter(), makeCounter()\nprint(a(), a(), a())\nprint(b())', note: L('Кожен лічильник має свій стан.', 'У каждого счётчика своё состояние.', 'Each counter has its own state.') },
        { title: L('Перезарядка', 'Перезарядка', 'Cooldown'), code: 'local function makeWeapon(shots)\n  local ammo = shots\n  return function()\n    if ammo == 0 then return "click" end\n    ammo = ammo - 1\n    return "bang (" .. ammo .. " left)"\n  end\nend\nlocal fire = makeWeapon(2)\nprint(fire()) print(fire()) print(fire())', note: L('Боєзапас «захований» у замиканні.', 'Боезапас «спрятан» в замыкании.', 'Ammo is hidden in the closure.') },
        { title: '...', code: 'local function sum(...)\n  local total = 0\n  for _, v in ipairs({...}) do total = total + v end\n  return total, select("#", ...)\nend\nprint(sum(1, 2, 3, 4))', note: L('Будь-яка кількість аргументів.', 'Любое количество аргументов.', 'Any number of arguments.') }
      ],
      task: {
        text: L('Напиши функцію <code>makeBank(start)</code>, що повертає дві функції: <code>deposit(n)</code> (додає до балансу і повертає новий баланс) і <code>balance()</code>. Баланс має зберігатися в замиканні. Код нижче вже використовує їх.', 'Напиши функцию <code>makeBank(start)</code>, возвращающую две функции: <code>deposit(n)</code> (добавляет к балансу и возвращает новый баланс) и <code>balance()</code>. Баланс должен храниться в замыкании. Код ниже уже использует их.', 'Write <code>makeBank(start)</code> returning two functions: <code>deposit(n)</code> (adds to the balance and returns it) and <code>balance()</code>. The balance must live in a closure. The code below uses them.'),
        how: [L('<code>local money = start</code>', '<code>local money = start</code>', '<code>local money = start</code>'), L('<code>return function(n) … end, function() return money end</code>', '<code>return function(n) … end, function() return money end</code>', '<code>return function(n) … end, function() return money end</code>')],
        starter: 'local function makeBank(start)\n  -- your code\nend\n\nlocal deposit, balance = makeBank(100)\nprint(deposit(50))\nprint(deposit(25))\nprint(balance())\n',
        solution: 'local function makeBank(start)\n  local money = start\n  local function deposit(n)\n    money = money + n\n    return money\n  end\n  local function balance()\n    return money\n  end\n  return deposit, balance\nend\n\nlocal deposit, balance = makeBank(100)\nprint(deposit(50))\nprint(deposit(25))\nprint(balance())\n',
        hint: L('Очікувано: 150, 175, 175.', 'Ожидается: 150, 175, 175.', 'Expected: 150, 175, 175.'),
        expected: '150\n175\n175',
        must: /return/
      },
      quiz: { q: L('Що таке замикання?', 'Что такое замыкание?', 'What is a closure?'), options: [L('функція, що пам’ятає змінні оточення', 'функция, помнящая переменные окружения', 'a function that remembers surrounding variables'), L('кінець циклу', 'конец цикла', 'the end of a loop'), L('закрита таблиця', 'закрытая таблица', 'a closed table')], answer: 0, explain: L('Вона «тримає» локальні змінні.', 'Она «держит» локальные переменные.', 'It holds on to locals.') },
      ref: [{ code: 'return function() … end', d: L('замикання', 'замыкание', 'closure') }, { code: 'function f(...) {...} end', d: L('варіативні аргументи', 'вариативные аргументы', 'varargs') }]
    },
    {
      id: 'oop', chapter: CH3,
      title: L('ООП: метатаблиці та двокрапка', 'ООП: метатаблицы и двоеточие', 'OOP: metatables and the colon'),
      theory: L(
        `<p>У Lua немає класів, але їх легко зробити з таблиць і <b>метатаблиць</b>:</p>
<pre class="inline-code">local Enemy = {}
Enemy.__index = Enemy

function Enemy.new(name, hp)
  local self = setmetatable({}, Enemy)
  self.name = name
  self.hp = hp
  return self
end

function Enemy:hit(dmg)        -- двокрапка!
  self.hp = self.hp - dmg
end

local slime = Enemy.new("Slime", 30)
slime:hit(10)</pre>
<ul><li><code>setmetatable(obj, Enemy)</code> + <code>Enemy.__index = Enemy</code>: якщо поля немає в об’єкті, Lua шукає його в <code>Enemy</code> — так об’єкти отримують методи</li><li><b>Двокрапка</b> <code>obj:method()</code> автоматично передає сам об’єкт як <code>self</code>. Це те саме, що <code>obj.method(obj)</code></li></ul>`,
        `<p>В Lua нет классов, но их легко сделать из таблиц и <b>метатаблиц</b>:</p>
<pre class="inline-code">local Enemy = {}
Enemy.__index = Enemy

function Enemy.new(name, hp)
  local self = setmetatable({}, Enemy)
  self.name = name
  self.hp = hp
  return self
end

function Enemy:hit(dmg)        -- двоеточие!
  self.hp = self.hp - dmg
end

local slime = Enemy.new("Slime", 30)
slime:hit(10)</pre>
<ul><li><code>setmetatable(obj, Enemy)</code> + <code>Enemy.__index = Enemy</code>: если поля нет в объекте, Lua ищет его в <code>Enemy</code> — так объекты получают методы</li><li><b>Двоеточие</b> <code>obj:method()</code> автоматически передаёт сам объект как <code>self</code>. Это то же самое, что <code>obj.method(obj)</code></li></ul>`,
        `<p>Lua has no classes, but they’re easy to build from tables and <b>metatables</b>:</p>
<pre class="inline-code">local Enemy = {}
Enemy.__index = Enemy

function Enemy.new(name, hp)
  local self = setmetatable({}, Enemy)
  self.name = name
  self.hp = hp
  return self
end

function Enemy:hit(dmg)        -- a colon!
  self.hp = self.hp - dmg
end

local slime = Enemy.new("Slime", 30)
slime:hit(10)</pre>
<ul><li><code>setmetatable(obj, Enemy)</code> + <code>Enemy.__index = Enemy</code>: if a field isn’t in the object, Lua looks in <code>Enemy</code> — that’s how objects get methods</li><li>The <b>colon</b> <code>obj:method()</code> passes the object itself as <code>self</code>. It’s the same as <code>obj.method(obj)</code></li></ul>`),
      why: L(`<p>Саме так влаштовані «класи» в Roblox-модулях і більшості ігор на Lua. А двокрапку ти постійно бачитимеш у Roblox: <code>part:Destroy()</code>, <code>game:GetService("Players")</code>, <code>event:Connect(fn)</code>.</p>`,
        `<p>Именно так устроены «классы» в Roblox-модулях и большинстве игр на Lua. А двоеточие ты постоянно будешь видеть в Roblox: <code>part:Destroy()</code>, <code>game:GetService("Players")</code>, <code>event:Connect(fn)</code>.</p>`,
        `<p>This is how “classes” work in Roblox modules and most Lua games. And you’ll see the colon constantly in Roblox: <code>part:Destroy()</code>, <code>game:GetService("Players")</code>, <code>event:Connect(fn)</code>.</p>`),
      mistakes: L(`<ul><li><code>slime.hit(10)</code> крапкою замість двокрапки — <code>self</code> стане числом 10.</li><li>Забути <code>Enemy.__index = Enemy</code> — методи «не знаходяться» (<code>attempt to call a nil value</code>).</li></ul>`,
        `<ul><li><code>slime.hit(10)</code> точкой вместо двоеточия — <code>self</code> станет числом 10.</li><li>Забыть <code>Enemy.__index = Enemy</code> — методы «не находятся» (<code>attempt to call a nil value</code>).</li></ul>`,
        `<ul><li><code>slime.hit(10)</code> with a dot instead of a colon — <code>self</code> becomes the number 10.</li><li>Forgetting <code>Enemy.__index = Enemy</code> — methods can’t be found (<code>attempt to call a nil value</code>).</li></ul>`),
      examples: [
        { title: L('Клас', 'Класс', 'Class'), code: 'local Dog = {}\nDog.__index = Dog\nfunction Dog.new(name)\n  return setmetatable({name = name}, Dog)\nend\nfunction Dog:bark()\n  print(self.name .. ": Woof!")\nend\nDog.new("Rex"):bark()\nDog.new("Bim"):bark()', note: L('Два об’єкти з одного «класу».', 'Два объекта из одного «класса».', 'Two objects from one “class”.') },
        { title: L('Двокрапка', 'Двоеточие', 'The colon'), code: 'local box = {size = 3}\nfunction box:grow(n) self.size = self.size + n end\nbox:grow(2)\nbox.grow(box, 5)\nprint(box.size)', note: L('Дві форми одного виклику.', 'Две формы одного вызова.', 'Two forms of the same call.') },
        { title: L('Наслідування', 'Наследование', 'Inheritance'), code: 'local Animal = {}\nAnimal.__index = Animal\nfunction Animal.new(n) return setmetatable({name = n}, Animal) end\nfunction Animal:speak() return "..." end\n\nlocal Cat = setmetatable({}, {__index = Animal})\nCat.__index = Cat\nfunction Cat.new(n) return setmetatable(Animal.new(n), Cat) end\nfunction Cat:speak() return "Meow" end\n\nprint(Cat.new("Murka"):speak(), Animal.new("x"):speak())', note: L('Ланцюжок __index дає наслідування.', 'Цепочка __index даёт наследование.', 'An __index chain gives inheritance.') },
        { title: '__tostring', code: 'local V = {}\nV.__index = V\nV.__tostring = function(v) return "(" .. v.x .. ", " .. v.y .. ")" end\nV.__add = function(a, b) return setmetatable({x = a.x + b.x, y = a.y + b.y}, V) end\nlocal a = setmetatable({x = 1, y = 2}, V)\nlocal b = setmetatable({x = 3, y = 4}, V)\nprint(tostring(a + b))', note: L('Метаметоди змінюють поведінку операторів.', 'Метаметоды меняют поведение операторов.', 'Metamethods change operator behaviour.') }
      ],
      task: {
        text: L('Створи «клас» <code>Hero</code> з конструктором <code>Hero.new(name)</code> (hp = 100) і методами <code>Hero:hit(dmg)</code> (hp не нижче 0) та <code>Hero:info()</code>, що повертає <code>Name: hp</code>. Код нижче вже готовий.', 'Создай «класс» <code>Hero</code> с конструктором <code>Hero.new(name)</code> (hp = 100) и методами <code>Hero:hit(dmg)</code> (hp не ниже 0) и <code>Hero:info()</code>, возвращающим <code>Name: hp</code>. Код ниже уже готов.', 'Create a “class” <code>Hero</code> with a constructor <code>Hero.new(name)</code> (hp = 100) and methods <code>Hero:hit(dmg)</code> (hp not below 0) and <code>Hero:info()</code> returning <code>Name: hp</code>. The code below is ready.'),
        how: [L('<code>Hero.__index = Hero</code> і <code>setmetatable</code> у new.', '<code>Hero.__index = Hero</code> и <code>setmetatable</code> в new.', '<code>Hero.__index = Hero</code> and <code>setmetatable</code> in new.'), L('Методи через двокрапку: <code>function Hero:hit(dmg)</code>.', 'Методы через двоеточие: <code>function Hero:hit(dmg)</code>.', 'Methods with a colon: <code>function Hero:hit(dmg)</code>.')],
        starter: 'local Hero = {}\n-- your code\n\nlocal h = Hero.new("Link")\nh:hit(30)\nprint(h:info())\nh:hit(200)\nprint(h:info())\n',
        solution: 'local Hero = {}\nHero.__index = Hero\n\nfunction Hero.new(name)\n  local self = setmetatable({}, Hero)\n  self.name = name\n  self.hp = 100\n  return self\nend\n\nfunction Hero:hit(dmg)\n  self.hp = math.max(0, self.hp - dmg)\nend\n\nfunction Hero:info()\n  return self.name .. ": " .. self.hp\nend\n\nlocal h = Hero.new("Link")\nh:hit(30)\nprint(h:info())\nh:hit(200)\nprint(h:info())\n',
        hint: L('Очікувано: <code>Link: 70</code> і <code>Link: 0</code>.', 'Ожидается: <code>Link: 70</code> и <code>Link: 0</code>.', 'Expected: <code>Link: 70</code> and <code>Link: 0</code>.'),
        expected: 'Link: 70\nLink: 0',
        must: /setmetatable[\s\S]*__index|__index[\s\S]*setmetatable/
      },
      quiz: { q: L('Що робить двокрапка в <code>obj:move()</code>?', 'Что делает двоеточие в <code>obj:move()</code>?', 'What does the colon do in <code>obj:move()</code>?'), options: [L('нічого особливого', 'ничего особенного', 'nothing special'), L('передає obj як self', 'передаёт obj как self', 'passes obj as self'), L('робить метод приватним', 'делает метод приватным', 'makes the method private')], answer: 1, explain: L('Те саме, що obj.move(obj).', 'То же, что obj.move(obj).', 'Same as obj.move(obj).') },
      ref: [{ code: 'setmetatable(t, mt)  mt.__index = mt', d: L('«клас» у Lua', '«класс» в Lua', 'a Lua “class”') }, { code: 'function C:method() self … end', d: L('метод', 'метод', 'method') }]
    },
    {
      id: 'errors', chapter: CH3,
      title: L('Помилки: error і pcall', 'Ошибки: error и pcall', 'Errors: error and pcall'),
      theory: L(
        `<p><code>error("message")</code> зупиняє виконання з помилкою. Щоб перехопити помилку й не «впасти», використовують <code>pcall</code> (protected call):</p>
<pre class="inline-code">local ok, result = pcall(function()
  return riskyThing()
end)
if ok then
  print("Result:", result)
else
  print("Error:", result)
end</pre>
<p><code>pcall</code> повертає <code>true</code> і результат, або <code>false</code> і текст помилки.</p>
<p><code>assert(condition, "message")</code> — коротка перевірка: якщо умова хибна, кидає помилку.</p>
<p>У Roblox <code>pcall</code> обов’язковий для роботи з мережею та DataStore — сервер може не відповісти.</p>`,
        `<p><code>error("message")</code> останавливает выполнение с ошибкой. Чтобы перехватить ошибку и не «упасть», используют <code>pcall</code> (protected call):</p>
<pre class="inline-code">local ok, result = pcall(function()
  return riskyThing()
end)
if ok then
  print("Result:", result)
else
  print("Error:", result)
end</pre>
<p><code>pcall</code> возвращает <code>true</code> и результат, или <code>false</code> и текст ошибки.</p>
<p><code>assert(condition, "message")</code> — короткая проверка: если условие ложно, бросает ошибку.</p>
<p>В Roblox <code>pcall</code> обязателен для работы с сетью и DataStore — сервер может не ответить.</p>`,
        `<p><code>error("message")</code> stops execution with an error. To catch it without crashing, use <code>pcall</code> (protected call):</p>
<pre class="inline-code">local ok, result = pcall(function()
  return riskyThing()
end)
if ok then
  print("Result:", result)
else
  print("Error:", result)
end</pre>
<p><code>pcall</code> returns <code>true</code> and the result, or <code>false</code> and the error text.</p>
<p><code>assert(condition, "message")</code> is a quick check: if the condition is false it throws.</p>
<p>In Roblox <code>pcall</code> is essential for network and DataStore calls — the server may not respond.</p>`),
      why: L(`<p>Ігрові сервери працюють годинами, і одна помилка в скрипті не повинна «покласти» всю гру. <code>pcall</code> ізолює ризиковані частини: збереження прогресу, покупки, завантаження даних.</p>`,
        `<p>Игровые серверы работают часами, и одна ошибка в скрипте не должна «уронить» всю игру. <code>pcall</code> изолирует рискованные части: сохранение прогресса, покупки, загрузку данных.</p>`,
        `<p>Game servers run for hours, and one script error mustn’t take the whole game down. <code>pcall</code> isolates risky parts: saving progress, purchases, loading data.</p>`),
      mistakes: L(`<ul><li><code>pcall(riskyThing())</code> — функцію викликано <b>до</b> pcall! Треба <code>pcall(riskyThing)</code> або <code>pcall(function() … end)</code>.</li><li>Ігнорувати перше значення <code>ok</code>.</li></ul>`,
        `<ul><li><code>pcall(riskyThing())</code> — функция вызвана <b>до</b> pcall! Нужно <code>pcall(riskyThing)</code> или <code>pcall(function() … end)</code>.</li><li>Игнорировать первое значение <code>ok</code>.</li></ul>`,
        `<ul><li><code>pcall(riskyThing())</code> calls the function <b>before</b> pcall! Use <code>pcall(riskyThing)</code> or <code>pcall(function() … end)</code>.</li><li>Ignoring the first value, <code>ok</code>.</li></ul>`),
      examples: [
        { title: 'pcall', code: 'local ok, err = pcall(function()\n  local t = nil\n  return t.field\nend)\nprint(ok)\nprint(err)', note: L('Програма продовжує роботу після помилки.', 'Программа продолжает работу после ошибки.', 'The program keeps running after the error.') },
        { title: 'error', code: 'local function setAge(age)\n  if age < 0 then error("age cannot be negative", 0) end\n  return age\nend\nprint(pcall(setAge, 15))\nprint(pcall(setAge, -3))', note: L('Другий аргумент 0 прибирає номер рядка з тексту.', 'Второй аргумент 0 убирает номер строки из текста.', 'The second argument 0 drops the line number.') },
        { title: 'assert', code: 'local ok, err = pcall(function()\n  local coins = 5\n  assert(coins >= 10, "not enough coins")\nend)\nprint(ok, err)', note: L('assert — коротка перевірка.', 'assert — короткая проверка.', 'assert is a quick check.') },
        { title: L('Безпечне перетворення', 'Безопасное преобразование', 'Safe conversion'), code: 'local function toNumberStrict(s)\n  local n = tonumber(s)\n  if not n then error("not a number: " .. s, 0) end\n  return n\nend\nfor _, v in ipairs({"10", "abc", "3.5"}) do\n  local ok, res = pcall(toNumberStrict, v)\n  print(v, ok, res)\nend', note: L('Обробка кожного значення окремо.', 'Обработка каждого значения отдельно.', 'Each value handled separately.') }
      ],
      task: {
        text: L('Напиши функцію <code>buy(coins, price)</code>, що кидає <code>error("not enough coins", 0)</code>, якщо монет менше за ціну, інакше повертає залишок. Для кожної пари в коді виклич її через <code>pcall</code> і виведи <code>ok: 30</code> або <code>fail: not enough coins</code>.', 'Напиши функцию <code>buy(coins, price)</code>, которая бросает <code>error("not enough coins", 0)</code>, если монет меньше цены, иначе возвращает остаток. Для каждой пары в коде вызови её через <code>pcall</code> и выведи <code>ok: 30</code> или <code>fail: not enough coins</code>.', 'Write <code>buy(coins, price)</code> that throws <code>error("not enough coins", 0)</code> if coins are below the price, otherwise returns the change. For each pair below call it with <code>pcall</code> and print <code>ok: 30</code> or <code>fail: not enough coins</code>.'),
        how: [L('<code>local ok, res = pcall(buy, pair[1], pair[2])</code>', '<code>local ok, res = pcall(buy, pair[1], pair[2])</code>', '<code>local ok, res = pcall(buy, pair[1], pair[2])</code>'), L('<code>print((ok and "ok: " or "fail: ") .. res)</code>', '<code>print((ok and "ok: " or "fail: ") .. res)</code>', '<code>print((ok and "ok: " or "fail: ") .. res)</code>')],
        starter: 'local function buy(coins, price)\n  -- your code\nend\n\nlocal tries = {{100, 70}, {20, 50}, {60, 60}}\n',
        solution: 'local function buy(coins, price)\n  if coins < price then\n    error("not enough coins", 0)\n  end\n  return coins - price\nend\n\nlocal tries = {{100, 70}, {20, 50}, {60, 60}}\nfor _, pair in ipairs(tries) do\n  local ok, res = pcall(buy, pair[1], pair[2])\n  if ok then\n    print("ok: " .. res)\n  else\n    print("fail: " .. res)\n  end\nend\n',
        hint: L('Очікувано: ok: 30, fail: not enough coins, ok: 0.', 'Ожидается: ok: 30, fail: not enough coins, ok: 0.', 'Expected: ok: 30, fail: not enough coins, ok: 0.'),
        expected: 'ok: 30\nfail: not enough coins\nok: 0',
        must: /pcall[\s\S]*error|error[\s\S]*pcall/
      },
      quiz: { q: L('Що поверне <code>pcall</code> при помилці?', 'Что вернёт <code>pcall</code> при ошибке?', 'What does <code>pcall</code> return on error?'), options: ['nil', L('false і текст помилки', 'false и текст ошибки', 'false and the error text'), L('нічого — програма впаде', 'ничего — программа упадёт', 'nothing — the program crashes')], answer: 1, explain: L('Перше значення — успіх.', 'Первое значение — успех.', 'The first value is success.') },
      ref: [{ code: 'local ok, res = pcall(f, ...)', d: L('захищений виклик', 'защищённый вызов', 'protected call') }, { code: 'error("msg", 0)  assert(c, msg)', d: L('кинути помилку', 'бросить ошибку', 'throw an error') }]
    },
    {
      id: 'project-inventory', chapter: CH4, project: true,
      title: L('Проєкт: інвентар гравця', 'Проект: инвентарь игрока', 'Project: Player inventory'),
      theory: L(
        `<p>Зроби систему інвентарю, як у RPG.</p>
<h4>«Клас» <code>Inventory</code></h4>
<ul><li><code>Inventory.new(maxSlots)</code> — порожній інвентар</li><li><code>inv:add(item, count)</code> — додає предмети (count за замовчуванням 1). Якщо це новий предмет і всі слоти зайняті — повертає <code>false, "full"</code>, інакше <code>true</code></li><li><code>inv:remove(item, count)</code> — забирає; якщо предметів не вистачає — <code>false, "not enough"</code>. Коли кількість стає 0, предмет зникає</li><li><code>inv:list()</code> — рядок з предметами <b>за абеткою</b>: <code>potion x3, sword x1</code> (або <code>empty</code>)</li></ul>
<p>Зберігай предмети у словнику <code>self.items[item] = count</code> і окремо рахуй зайняті слоти.</p>`,
        `<p>Сделай систему инвентаря, как в RPG.</p>
<h4>«Класс» <code>Inventory</code></h4>
<ul><li><code>Inventory.new(maxSlots)</code> — пустой инвентарь</li><li><code>inv:add(item, count)</code> — добавляет предметы (count по умолчанию 1). Если это новый предмет и все слоты заняты — возвращает <code>false, "full"</code>, иначе <code>true</code></li><li><code>inv:remove(item, count)</code> — забирает; если предметов не хватает — <code>false, "not enough"</code>. Когда количество становится 0, предмет исчезает</li><li><code>inv:list()</code> — строка с предметами <b>по алфавиту</b>: <code>potion x3, sword x1</code> (или <code>empty</code>)</li></ul>
<p>Храни предметы в словаре <code>self.items[item] = count</code> и отдельно считай занятые слоты.</p>`,
        `<p>Build an RPG-style inventory system.</p>
<h4>The <code>Inventory</code> “class”</h4>
<ul><li><code>Inventory.new(maxSlots)</code> — an empty inventory</li><li><code>inv:add(item, count)</code> — adds items (count defaults to 1). If it’s a new item and all slots are full, return <code>false, "full"</code>, otherwise <code>true</code></li><li><code>inv:remove(item, count)</code> — takes items; if there aren’t enough, return <code>false, "not enough"</code>. At count 0 the item disappears</li><li><code>inv:list()</code> — a string of items <b>alphabetically</b>: <code>potion x3, sword x1</code> (or <code>empty</code>)</li></ul>
<p>Store items in a dictionary <code>self.items[item] = count</code> and track used slots separately.</p>`),
      why: L(`<p>Інвентар є майже в кожній грі. Тут поєднуються «класи» на метатаблицях, словники, сортування ключів, значення за замовчуванням і повернення кількох значень (<code>false, "full"</code>) — ідіоматичний Lua.</p>`,
        `<p>Инвентарь есть почти в каждой игре. Здесь соединяются «классы» на метатаблицах, словари, сортировка ключей, значения по умолчанию и возврат нескольких значений (<code>false, "full"</code>) — идиоматичный Lua.</p>`,
        `<p>Almost every game has an inventory. This combines metatable “classes”, dictionaries, sorting keys, defaults and multiple returns (<code>false, "full"</code>) — idiomatic Lua.</p>`),
      mistakes: L(`<ul><li>Рахувати слоти через <code>#self.items</code> — для словника це завжди 0.</li><li>Залишати предмет з кількістю 0 у словнику.</li></ul>`,
        `<ul><li>Считать слоты через <code>#self.items</code> — для словаря это всегда 0.</li><li>Оставлять предмет с количеством 0 в словаре.</li></ul>`,
        `<ul><li>Counting slots with <code>#self.items</code> — always 0 for a dictionary.</li><li>Leaving an item with count 0 in the dictionary.</li></ul>`),
      examples: [
        { title: L('Каркас класу', 'Каркас класса', 'Class skeleton'), code: 'local Inventory = {}\nInventory.__index = Inventory\nfunction Inventory.new(max)\n  return setmetatable({items = {}, used = 0, max = max}, Inventory)\nend\nlocal inv = Inventory.new(3)\nprint(inv.max, inv.used)', note: L('Поля для предметів і слотів.', 'Поля для предметов и слотов.', 'Fields for items and slots.') },
        { title: L('Кілька результатів', 'Несколько результатов', 'Multiple results'), code: 'local function tryOpen(hasKey)\n  if not hasKey then return false, "locked" end\n  return true\nend\nprint(tryOpen(true))\nprint(tryOpen(false))', note: L('Ідіома Lua: успіх + причина невдачі.', 'Идиома Lua: успех + причина неудачи.', 'A Lua idiom: success + failure reason.') },
        { title: L('Список за абеткою', 'Список по алфавиту', 'Sorted listing'), code: 'local items = {sword = 1, apple = 5, map = 1}\nlocal keys = {}\nfor k in pairs(items) do keys[#keys + 1] = k end\ntable.sort(keys)\nlocal parts = {}\nfor _, k in ipairs(keys) do parts[#parts + 1] = k .. " x" .. items[k] end\nprint(table.concat(parts, ", "))', note: L('Стабільний вивід словника.', 'Стабильный вывод словаря.', 'Stable dictionary output.') }
      ],
      task: {
        text: L('Реалізуй <code>Inventory</code> за описом. Сценарій перевірки вже в коді.', 'Реализуй <code>Inventory</code> по описанию. Сценарий проверки уже в коде.', 'Implement <code>Inventory</code> as described. The test scenario is already in the code.'),
        how: [L('Конструктор + методи через двокрапку.', 'Конструктор + методы через двоеточие.', 'A constructor + colon methods.'), L('У <code>add</code>: якщо <code>self.items[item] == nil</code> — новий предмет, займає слот.', 'В <code>add</code>: если <code>self.items[item] == nil</code> — новый предмет, занимает слот.', 'In <code>add</code>: if <code>self.items[item] == nil</code> it’s new and takes a slot.')],
        starter: 'local Inventory = {}\nInventory.__index = Inventory\n\n-- your code\n\nlocal inv = Inventory.new(2)\nprint(inv:list())\nprint(inv:add("sword"))\nprint(inv:add("potion", 3))\nprint(inv:add("shield"))\nprint(inv:add("potion", 2))\nprint(inv:remove("potion", 10))\nprint(inv:remove("sword"))\nprint(inv:add("shield"))\nprint(inv:list())\n',
        solution: 'local Inventory = {}\nInventory.__index = Inventory\n\nfunction Inventory.new(maxSlots)\n  return setmetatable({items = {}, used = 0, max = maxSlots}, Inventory)\nend\n\nfunction Inventory:add(item, count)\n  count = count or 1\n  if self.items[item] == nil then\n    if self.used >= self.max then return false, "full" end\n    self.used = self.used + 1\n    self.items[item] = 0\n  end\n  self.items[item] = self.items[item] + count\n  return true\nend\n\nfunction Inventory:remove(item, count)\n  count = count or 1\n  local have = self.items[item] or 0\n  if have < count then return false, "not enough" end\n  if have == count then\n    self.items[item] = nil\n    self.used = self.used - 1\n  else\n    self.items[item] = have - count\n  end\n  return true\nend\n\nfunction Inventory:list()\n  local keys = {}\n  for k in pairs(self.items) do keys[#keys + 1] = k end\n  if #keys == 0 then return "empty" end\n  table.sort(keys)\n  local parts = {}\n  for _, k in ipairs(keys) do parts[#parts + 1] = k .. " x" .. self.items[k] end\n  return table.concat(parts, ", ")\nend\n\nlocal inv = Inventory.new(2)\nprint(inv:list())\nprint(inv:add("sword"))\nprint(inv:add("potion", 3))\nprint(inv:add("shield"))\nprint(inv:add("potion", 2))\nprint(inv:remove("potion", 10))\nprint(inv:remove("sword"))\nprint(inv:add("shield"))\nprint(inv:list())\n',
        hint: L('Вивід <code>print(false, "full")</code> — це <code>false	full</code> через табуляцію.', 'Вывод <code>print(false, "full")</code> — это <code>false	full</code> через табуляцию.', '<code>print(false, "full")</code> prints <code>false	full</code> with a tab.'),
        expected: 'empty\ntrue\ntrue\nfalse\tfull\ntrue\nfalse\tnot enough\ntrue\ntrue\npotion x5, shield x1',
        must: /setmetatable/
      },
      quiz: { q: L('Чому не можна рахувати слоти через <code>#self.items</code>?', 'Почему нельзя считать слоты через <code>#self.items</code>?', 'Why not count slots with <code>#self.items</code>?'), options: [L('це повільно', 'это медленно', 'it’s slow'), L('для словника # дає 0', 'для словаря # даёт 0', '# gives 0 for a dictionary'), L('# не існує', '# не существует', '# doesn’t exist')], answer: 1, explain: L('# працює лише для масивів.', '# работает только для массивов.', '# only works for arrays.') },
      ref: [{ code: 'return false, "reason"', d: L('невдача з причиною', 'неудача с причиной', 'failure with a reason') }]
    },
    {
      id: 'project-battle', chapter: CH4, project: true,
      title: L('Проєкт: покрокова битва', 'Проект: пошаговая битва', 'Project: Turn-based battle'),
      theory: L(
        `<p>Фінальний проєкт курсу — симулятор покрокової битви двох бійців.</p>
<h4>Правила</h4>
<ul><li>Боєць: <code>name</code>, <code>hp</code>, <code>attack</code>, <code>defense</code></li><li>Шкода за удар = <code>math.max(1, attacker.attack - defender.defense)</code></li><li>Кожен <b>третій</b> хід бійця (його 3-й, 6-й, 9-й удар) — <b>критичний</b>: шкода подвоюється</li><li>Бійці б’ють по черзі, першим — перший боєць. Після кожного удару виводь рядок<br><code>Knight hits Orc for 12 (Orc: 48)</code><br>Для криту: <code>Knight CRITS Orc for 24 (Orc: 24)</code></li><li>Коли hp ≤ 0 (виводь 0, а не від’ємне), виведи <code>Knight wins!</code> і заверши</li></ul>
<p>Використай таблиці для бійців, функцію <code>attack(a, d)</code> і цикл <code>while</code>.</p>`,
        `<p>Финальный проект курса — симулятор пошаговой битвы двух бойцов.</p>
<h4>Правила</h4>
<ul><li>Боец: <code>name</code>, <code>hp</code>, <code>attack</code>, <code>defense</code></li><li>Урон за удар = <code>math.max(1, attacker.attack - defender.defense)</code></li><li>Каждый <b>третий</b> ход бойца (его 3-й, 6-й, 9-й удар) — <b>критический</b>: урон удваивается</li><li>Бойцы бьют по очереди, первым — первый боец. После каждого удара выводи строку<br><code>Knight hits Orc for 12 (Orc: 48)</code><br>Для крита: <code>Knight CRITS Orc for 24 (Orc: 24)</code></li><li>Когда hp ≤ 0 (выводи 0, а не отрицательное), выведи <code>Knight wins!</code> и заверши</li></ul>
<p>Используй таблицы для бойцов, функцию <code>attack(a, d)</code> и цикл <code>while</code>.</p>`,
        `<p>The course’s final project is a turn-based battle simulator for two fighters.</p>
<h4>Rules</h4>
<ul><li>A fighter has <code>name</code>, <code>hp</code>, <code>attack</code>, <code>defense</code></li><li>Damage per hit = <code>math.max(1, attacker.attack - defender.defense)</code></li><li>Every <b>third</b> hit by a fighter (their 3rd, 6th, 9th) is a <b>critical</b>: damage doubles</li><li>Fighters alternate, the first fighter starts. After each hit print<br><code>Knight hits Orc for 12 (Orc: 48)</code><br>For a crit: <code>Knight CRITS Orc for 24 (Orc: 24)</code></li><li>When hp ≤ 0 (print 0, not a negative number), print <code>Knight wins!</code> and stop</li></ul>
<p>Use tables for fighters, an <code>attack(a, d)</code> function and a <code>while</code> loop.</p>`),
      why: L(`<p>Ігрова логіка — це правила, стан і цикл ходів. Цей проєкт — мініатюра справжньої гри: тут таблиці, функції, умови, лічильники й форматування разом. Далі в курсі Roblox ти робитимеш подібне, але з 3D-світом.</p>`,
        `<p>Игровая логика — это правила, состояние и цикл ходов. Этот проект — миниатюра настоящей игры: здесь таблицы, функции, условия, счётчики и форматирование вместе. Дальше в курсе Roblox ты будешь делать подобное, но с 3D-миром.</p>`,
        `<p>Game logic is rules, state and a turn loop. This project is a miniature real game: tables, functions, conditions, counters and formatting together. In the Roblox course you’ll do similar things in a 3D world.</p>`),
      mistakes: L(`<ul><li>Виводити від’ємне здоров’я — обмеж <code>math.max(0, hp)</code>.</li><li>Один спільний лічильник ходів для обох бійців — у кожного свій.</li></ul>`,
        `<ul><li>Выводить отрицательное здоровье — ограничь <code>math.max(0, hp)</code>.</li><li>Один общий счётчик ходов для обоих бойцов — у каждого свой.</li></ul>`,
        `<ul><li>Printing negative health — clamp with <code>math.max(0, hp)</code>.</li><li>One shared turn counter for both — each fighter needs their own.</li></ul>`),
      examples: [
        { title: L('Бійці', 'Бойцы', 'Fighters'), code: 'local knight = {name = "Knight", hp = 60, attack = 15, defense = 5, hits = 0}\nlocal orc = {name = "Orc", hp = 60, attack = 12, defense = 3, hits = 0}\nprint(knight.name, knight.attack - orc.defense)', note: L('Таблиці з характеристиками.', 'Таблицы с характеристиками.', 'Tables of stats.') },
        { title: L('Чергування', 'Чередование', 'Alternating'), code: 'local a, b = "A", "B"\nfor turn = 1, 4 do\n  print("turn " .. turn .. ": " .. a .. " attacks " .. b)\n  a, b = b, a\nend', note: L('Обмін ролями в один рядок.', 'Обмен ролями в одну строку.', 'Swap roles in one line.') },
        { title: L('Кожен третій', 'Каждый третий', 'Every third'), code: 'for hit = 1, 7 do\n  local crit = hit % 3 == 0\n  print(hit, crit and "CRIT" or "normal")\nend', note: L('Остача від ділення на 3.', 'Остаток от деления на 3.', 'The remainder modulo 3.') }
      ],
      task: {
        text: L('Напиши симулятор за правилами. Бійці: <code>Knight</code> (hp 60, attack 15, defense 3) і <code>Orc</code> (hp 50, attack 12, defense 4). Першим б’є Knight.', 'Напиши симулятор по правилам. Бойцы: <code>Knight</code> (hp 60, attack 15, defense 3) и <code>Orc</code> (hp 50, attack 12, defense 4). Первым бьёт Knight.', 'Write the simulator by the rules. Fighters: <code>Knight</code> (hp 60, attack 15, defense 3) and <code>Orc</code> (hp 50, attack 12, defense 4). Knight strikes first.'),
        how: [L('Функція <code>attack(a, d)</code>: збільш <code>a.hits</code>, порахуй шкоду, крит, зменш hp, виведи рядок.', 'Функция <code>attack(a, d)</code>: увеличь <code>a.hits</code>, посчитай урон, крит, уменьши hp, выведи строку.', '<code>attack(a, d)</code>: increment <code>a.hits</code>, compute damage and crit, reduce hp, print the line.'), L('<code>while true do</code> з <code>break</code> після перемоги, міняй <code>a, b = b, a</code>.', '<code>while true do</code> с <code>break</code> после победы, меняй <code>a, b = b, a</code>.', '<code>while true do</code> with <code>break</code> on a win, swapping <code>a, b = b, a</code>.')],
        starter: 'local knight = {name = "Knight", hp = 60, attack = 15, defense = 3, hits = 0}\nlocal orc = {name = "Orc", hp = 50, attack = 12, defense = 4, hits = 0}\n',
        solution: 'local knight = {name = "Knight", hp = 60, attack = 15, defense = 3, hits = 0}\nlocal orc = {name = "Orc", hp = 50, attack = 12, defense = 4, hits = 0}\n\nlocal function attack(a, d)\n  a.hits = a.hits + 1\n  local dmg = math.max(1, a.attack - d.defense)\n  local crit = a.hits % 3 == 0\n  if crit then dmg = dmg * 2 end\n  d.hp = math.max(0, d.hp - dmg)\n  local verb = crit and " CRITS " or " hits "\n  print(a.name .. verb .. d.name .. " for " .. dmg .. " (" .. d.name .. ": " .. d.hp .. ")")\nend\n\nlocal a, b = knight, orc\nwhile true do\n  attack(a, b)\n  if b.hp <= 0 then\n    print(a.name .. " wins!")\n    break\n  end\n  a, b = b, a\nend\n',
        hint: L('Перший рядок: <code>Knight hits Orc for 11 (Orc: 39)</code>.', 'Первая строка: <code>Knight hits Orc for 11 (Orc: 39)</code>.', 'First line: <code>Knight hits Orc for 11 (Orc: 39)</code>.'),
        expected: 'Knight hits Orc for 11 (Orc: 39)\nOrc hits Knight for 9 (Knight: 51)\nKnight hits Orc for 11 (Orc: 28)\nOrc hits Knight for 9 (Knight: 42)\nKnight CRITS Orc for 22 (Orc: 6)\nOrc CRITS Knight for 18 (Knight: 24)\nKnight hits Orc for 11 (Orc: 0)\nKnight wins!',
        must: /while/
      },
      quiz: { q: L('Як визначити кожен третій удар?', 'Как определить каждый третий удар?', 'How do you detect every third hit?'), options: ['hits / 3 == 1', 'hits % 3 == 0', 'hits == 3'], answer: 1, explain: L('Остача 0 — ділиться на 3.', 'Остаток 0 — делится на 3.', 'A remainder of 0 means divisible by 3.') },
      ref: [{ code: 'a, b = b, a', d: L('обмін змінних', 'обмен переменных', 'swap variables') }]
    }
  ]);
})();
