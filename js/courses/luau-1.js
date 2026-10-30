// Roblox (Luau) — частина 1. Код виконується в текстовому симуляторі Roblox API (на Lua 5.4).
(function () {
  const L = Codry.L;
  const CH1 = L('Luau та Roblox Studio', 'Luau и Roblox Studio', 'Luau and Roblox Studio');
  const CH2 = L('Об’єкти світу', 'Объекты мира', 'World objects');
  const CH3 = L('Події та гравці', 'События и игроки', 'Events and players');
  const SIM = L(
    `<div class="tip">🧪 У Codry скрипти виконуються в <b>симуляторі Roblox</b>: об’єкти, властивості й події працюють, а результат видно в консолі (як вікно Output у Studio). Справжній 3D-світ — у Roblox Studio, куди можна скопіювати цей код.</div>`,
    `<div class="tip">🧪 В Codry скрипты выполняются в <b>симуляторе Roblox</b>: объекты, свойства и события работают, а результат виден в консоли (как окно Output в Studio). Настоящий 3D-мир — в Roblox Studio, куда можно скопировать этот код.</div>`,
    `<div class="tip">🧪 In Codry scripts run in a <b>Roblox simulator</b>: objects, properties and events work, and results appear in the console (like Studio’s Output window). The real 3D world is in Roblox Studio, where you can paste this code.</div>`);

  Codry.steps('luau', [
    {
      id: 'intro', chapter: CH1,
      title: L('Roblox Studio і перший скрипт', 'Roblox Studio и первый скрипт', 'Roblox Studio and your first script'),
      theory: L(
        `<p><b>Roblox</b> — платформа, де мільйони людей створюють ігри. Ігри роблять у безкоштовній програмі <b>Roblox Studio</b>, а логіку пишуть мовою <b>Luau</b> — швидкою версією Lua з корисними доповненнями.</p>
<p>У Studio є три види скриптів:</p>
<ul><li><b>Script</b> — працює на <b>сервері</b> (у ServerScriptService або в деталях світу): логіка гри, гроші, збереження</li><li><b>LocalScript</b> — працює на <b>комп’ютері гравця</b>: інтерфейс, камера, керування</li><li><b>ModuleScript</b> — бібліотека коду, яку підключають інші скрипти</li></ul>
<p>Вікно <b>Explorer</b> показує дерево об’єктів гри: <code>Workspace</code> (3D-світ), <code>Players</code>, <code>Lighting</code>, <code>ReplicatedStorage</code>… Вікно <b>Output</b> показує все, що виводить <code>print</code>.</p>
${SIM.uk}`,
        `<p><b>Roblox</b> — платформа, где миллионы людей создают игры. Игры делают в бесплатной программе <b>Roblox Studio</b>, а логику пишут на языке <b>Luau</b> — быстрой версии Lua с полезными дополнениями.</p>
<p>В Studio есть три вида скриптов:</p>
<ul><li><b>Script</b> — работает на <b>сервере</b> (в ServerScriptService или в деталях мира): логика игры, деньги, сохранение</li><li><b>LocalScript</b> — работает на <b>компьютере игрока</b>: интерфейс, камера, управление</li><li><b>ModuleScript</b> — библиотека кода, которую подключают другие скрипты</li></ul>
<p>Окно <b>Explorer</b> показывает дерево объектов игры: <code>Workspace</code> (3D-мир), <code>Players</code>, <code>Lighting</code>, <code>ReplicatedStorage</code>… Окно <b>Output</b> показывает всё, что выводит <code>print</code>.</p>
${SIM.ru}`,
        `<p><b>Roblox</b> is a platform where millions of people make games. Games are built in the free <b>Roblox Studio</b> app, and logic is written in <b>Luau</b> — a fast version of Lua with handy extras.</p>
<p>Studio has three kinds of scripts:</p>
<ul><li><b>Script</b> — runs on the <b>server</b> (in ServerScriptService or parts in the world): game logic, money, saving</li><li><b>LocalScript</b> — runs on the <b>player’s computer</b>: UI, camera, controls</li><li><b>ModuleScript</b> — a code library other scripts require</li></ul>
<p>The <b>Explorer</b> window shows the game’s object tree: <code>Workspace</code> (the 3D world), <code>Players</code>, <code>Lighting</code>, <code>ReplicatedStorage</code>… The <b>Output</b> window shows everything <code>print</code> outputs.</p>
${SIM.en}`),
      why: L(`<p>Чому сервер і клієнт окремо? Якби гроші рахувалися на комп’ютері гравця, читер легко б їх «намалював». Тому все важливе — на сервері, а клієнт лише показує й надсилає дії. Це головне правило безпечних ігор у Roblox.</p>`,
        `<p>Почему сервер и клиент отдельно? Если бы деньги считались на компьютере игрока, читер легко бы их «нарисовал». Поэтому всё важное — на сервере, а клиент только показывает и отправляет действия. Это главное правило безопасных игр в Roblox.</p>`,
        `<p>Why separate server and client? If money were counted on the player’s computer, a cheater could simply edit it. So everything important lives on the server; the client only displays and sends actions. That’s the core rule of secure Roblox games.</p>`),
      mistakes: L(`<ul><li>Покласти Script туди, де він не запускається (наприклад, у ReplicatedStorage) — він просто не працюватиме.</li><li>Довіряти даним від клієнта (про це — у розділі про RemoteEvents).</li></ul>`,
        `<ul><li>Положить Script туда, где он не запускается (например, в ReplicatedStorage) — он просто не будет работать.</li><li>Доверять данным от клиента (об этом — в разделе про RemoteEvents).</li></ul>`,
        `<ul><li>Putting a Script somewhere it doesn’t run (e.g. ReplicatedStorage) — it simply won’t work.</li><li>Trusting data from the client (covered in the RemoteEvents chapter).</li></ul>`),
      examples: [
        { title: 'print', code: 'print("Hello, Roblox!")\nprint("Players online:", 1)', note: L('У Roblox print розділяє значення пробілом.', 'В Roblox print разделяет значения пробелом.', 'In Roblox print separates values with a space.') },
        { title: 'warn', code: 'print("Game started")\nwarn("Low server memory!")', note: L('<code>warn</code> виводить попередження (жовтим у Studio).', '<code>warn</code> выводит предупреждение (жёлтым в Studio).', '<code>warn</code> prints a warning (yellow in Studio).') },
        { title: L('Сервіси', 'Сервисы', 'Services'), code: 'local Players = game:GetService("Players")\nlocal Lighting = game:GetService("Lighting")\nprint(Players.Name, Lighting.Name)\nprint(workspace.Name)', note: L('Головні «відділи» гри отримують через GetService.', 'Главные «отделы» игры получают через GetService.', 'The game’s main “departments” come from GetService.') }
      ],
      task: {
        text: L('Виведи <code>Welcome to my game!</code>, потім отримай сервіс <code>Players</code> через <code>game:GetService</code> і виведи його ім’я (<code>.Name</code>).', 'Выведи <code>Welcome to my game!</code>, затем получи сервис <code>Players</code> через <code>game:GetService</code> и выведи его имя (<code>.Name</code>).', 'Print <code>Welcome to my game!</code>, then get the <code>Players</code> service via <code>game:GetService</code> and print its name (<code>.Name</code>).'),
        how: [L('<code>local Players = game:GetService("Players")</code>', '<code>local Players = game:GetService("Players")</code>', '<code>local Players = game:GetService("Players")</code>'), L('<code>print(Players.Name)</code>', '<code>print(Players.Name)</code>', '<code>print(Players.Name)</code>')],
        starter: '',
        solution: 'print("Welcome to my game!")\nlocal Players = game:GetService("Players")\nprint(Players.Name)',
        hint: L('Двокрапка перед GetService обов’язкова.', 'Двоеточие перед GetService обязательно.', 'The colon before GetService is required.'),
        expected: 'Welcome to my game!\nPlayers',
        must: /GetService\s*\(\s*["']Players["']\s*\)/
      },
      quiz: { q: L('Де мають працювати скрипти з грошима гравців?', 'Где должны работать скрипты с деньгами игроков?', 'Where should scripts handling player money run?'), options: [L('у LocalScript', 'в LocalScript', 'in a LocalScript'), L('на сервері (Script)', 'на сервере (Script)', 'on the server (Script)'), L('байдуже', 'неважно', 'doesn’t matter')], answer: 1, explain: L('Клієнту довіряти не можна.', 'Клиенту доверять нельзя.', 'The client can’t be trusted.') },
      ref: [{ code: 'game:GetService("Players")', d: L('отримати сервіс', 'получить сервис', 'get a service') }, { code: 'print / warn', d: L('вивід у Output', 'вывод в Output', 'output') }]
    },
    {
      id: 'luau-syntax', chapter: CH1,
      title: L('Що додає Luau: +=, шаблони, continue', 'Что добавляет Luau: +=, шаблоны, continue', 'What Luau adds: +=, templates, continue'),
      theory: L(
        `<p>Luau — це Lua з доповненнями, які роблять код коротшим:</p>
<ul><li><b>Складене присвоєння</b>: <code>coins += 10</code>, <code>hp -= 5</code>, <code>name ..= "!"</code></li><li><b>Рядкові шаблони</b> у зворотних лапках: <code>print(\`Coins: {coins}\`)</code> — вирази у фігурних дужках</li><li><b>continue</b> у циклах — перейти до наступної ітерації</li><li>Корисні функції: <code>math.clamp(x, min, max)</code>, <code>math.round</code>, <code>string.split(s, ",")</code>, <code>table.find(t, v)</code></li><li><code>typeof(x)</code> — як <code>type</code>, але знає типи Roblox (<code>Vector3</code>, <code>Instance</code>)</li></ul>
<p>Усе інше — звичайний Lua: <code>local</code>, <code>if … then … end</code>, таблиці з індексами від 1.</p>`,
        `<p>Luau — это Lua с дополнениями, которые делают код короче:</p>
<ul><li><b>Составное присваивание</b>: <code>coins += 10</code>, <code>hp -= 5</code>, <code>name ..= "!"</code></li><li><b>Строковые шаблоны</b> в обратных кавычках: <code>print(\`Coins: {coins}\`)</code> — выражения в фигурных скобках</li><li><b>continue</b> в циклах — перейти к следующей итерации</li><li>Полезные функции: <code>math.clamp(x, min, max)</code>, <code>math.round</code>, <code>string.split(s, ",")</code>, <code>table.find(t, v)</code></li><li><code>typeof(x)</code> — как <code>type</code>, но знает типы Roblox (<code>Vector3</code>, <code>Instance</code>)</li></ul>
<p>Всё остальное — обычный Lua: <code>local</code>, <code>if … then … end</code>, таблицы с индексами от 1.</p>`,
        `<p>Luau is Lua with additions that make code shorter:</p>
<ul><li><b>Compound assignment</b>: <code>coins += 10</code>, <code>hp -= 5</code>, <code>name ..= "!"</code></li><li><b>String templates</b> in backticks: <code>print(\`Coins: {coins}\`)</code> — expressions in braces</li><li><b>continue</b> in loops — skip to the next iteration</li><li>Handy functions: <code>math.clamp(x, min, max)</code>, <code>math.round</code>, <code>string.split(s, ",")</code>, <code>table.find(t, v)</code></li><li><code>typeof(x)</code> — like <code>type</code> but knows Roblox types (<code>Vector3</code>, <code>Instance</code>)</li></ul>
<p>Everything else is regular Lua: <code>local</code>, <code>if … then … end</code>, tables indexed from 1.</p>`),
      why: L(`<p>Roblox створив Luau, бо мільйони скриптів потребували швидкості та зручності. <code>+=</code> і шаблони прибирають купу повторень, а <code>math.clamp</code> — найчастіша операція в іграх (обмежити здоров’я, швидкість, гучність).</p>`,
        `<p>Roblox создал Luau, потому что миллионам скриптов нужны были скорость и удобство. <code>+=</code> и шаблоны убирают кучу повторений, а <code>math.clamp</code> — самая частая операция в играх (ограничить здоровье, скорость, громкость).</p>`,
        `<p>Roblox built Luau because millions of scripts needed speed and convenience. <code>+=</code> and templates remove lots of repetition, and <code>math.clamp</code> is the most common game operation (clamping health, speed, volume).</p>`),
      mistakes: L(`<ul><li>Шаблон у звичайних лапках <code>"Coins: {coins}"</code> — підстановки не буде.</li><li><code>coins++</code> — такого оператора немає, лише <code>+= 1</code>.</li></ul>`,
        `<ul><li>Шаблон в обычных кавычках <code>"Coins: {coins}"</code> — подстановки не будет.</li><li><code>coins++</code> — такого оператора нет, только <code>+= 1</code>.</li></ul>`,
        `<ul><li>A template in normal quotes <code>"Coins: {coins}"</code> — no substitution.</li><li><code>coins++</code> doesn’t exist — use <code>+= 1</code>.</li></ul>`),
      examples: [
        { title: '+=', code: 'local coins = 10\ncoins += 5\ncoins *= 2\nprint(coins)\nlocal tag = "VIP"\ntag ..= "+"\nprint(tag)', note: L('Коротше за <code>coins = coins + 5</code>.', 'Короче, чем <code>coins = coins + 5</code>.', 'Shorter than <code>coins = coins + 5</code>.') },
        { title: L('Шаблони', 'Шаблоны', 'Templates'), code: 'local player, level = "Alex", 7\nprint(`{player} reached level {level}!`)\nprint(`Next level in {(level + 1) * 100} XP`)', note: L('Будь-які вирази в <code>{}</code>.', 'Любые выражения в <code>{}</code>.', 'Any expression inside <code>{}</code>.') },
        { title: 'continue', code: 'for i = 1, 6 do\n  if i % 2 == 0 then\n    continue\n  end\n  print(`odd: {i}`)\nend', note: L('Парні пропущено.', 'Чётные пропущены.', 'Even numbers skipped.') },
        { title: L('Утиліти', 'Утилиты', 'Utilities'), code: 'print(math.clamp(150, 0, 100))\nprint(math.round(4.6))\nlocal parts = string.split("red,green,blue", ",")\nprint(#parts, parts[2])\nprint(table.find(parts, "blue"))', note: L('Вбудовані функції Luau.', 'Встроенные функции Luau.', 'Built-in Luau functions.') }
      ],
      task: {
        text: L('Змінна <code>hp = 80</code>. Гравець отримує лікування +50, але здоров’я не може перевищити 100 (використай <code>+=</code> і <code>math.clamp</code>). Виведи шаблоном: <code>HP: 100/100</code>.', 'Переменная <code>hp = 80</code>. Игрок получает лечение +50, но здоровье не может превысить 100 (используй <code>+=</code> и <code>math.clamp</code>). Выведи шаблоном: <code>HP: 100/100</code>.', 'Variable <code>hp = 80</code>. The player heals +50, but health can’t exceed 100 (use <code>+=</code> and <code>math.clamp</code>). Print with a template: <code>HP: 100/100</code>.'),
        how: [L('<code>hp += 50</code>', '<code>hp += 50</code>', '<code>hp += 50</code>'), L('<code>hp = math.clamp(hp, 0, 100)</code>', '<code>hp = math.clamp(hp, 0, 100)</code>', '<code>hp = math.clamp(hp, 0, 100)</code>'), L('<code>print(`HP: {hp}/100`)</code>', '<code>print(`HP: {hp}/100`)</code>', '<code>print(`HP: {hp}/100`)</code>')],
        starter: 'local hp = 80\n',
        solution: 'local hp = 80\nhp += 50\nhp = math.clamp(hp, 0, 100)\nprint(`HP: {hp}/100`)',
        hint: L('Шаблон — у зворотних лапках <code>`…`</code>.', 'Шаблон — в обратных кавычках <code>`…`</code>.', 'Templates use backticks <code>`…`</code>.'),
        expected: 'HP: 100/100',
        must: /\+=[\s\S]*math\.clamp[\s\S]*`/
      },
      quiz: { q: L('Як у Luau збільшити <code>x</code> на 1?', 'Как в Luau увеличить <code>x</code> на 1?', 'How do you add 1 to <code>x</code> in Luau?'), options: ['x++', 'x += 1', 'inc(x)'], answer: 1, explain: L('Складене присвоєння.', 'Составное присваивание.', 'Compound assignment.') },
      ref: [{ code: 'x += 1  s ..= "!"', d: L('складене присвоєння', 'составное присваивание', 'compound assignment') }, { code: '`Hi {name}`', d: L('рядковий шаблон', 'строковый шаблон', 'string template') }, { code: 'math.clamp(x, a, b)', d: L('обмежити значення', 'ограничить значение', 'clamp a value') }]
    },
    {
      id: 'types', chapter: CH1,
      title: L('Типи в Luau', 'Типы в Luau', 'Types in Luau'),
      theory: L(
        `<p>Luau дозволяє (але не вимагає) вказувати <b>типи</b> змінних і функцій:</p>
<pre class="inline-code">local coins: number = 0
local name: string = "Alex"
local function heal(hp: number, amount: number): number
  return math.min(hp + amount, 100)
end</pre>
<p>Studio підсвічує помилки ще до запуску: якщо передати в <code>heal</code> рядок, побачиш попередження. Для цього вгорі скрипта пишуть <code>--!strict</code>.</p>
<p>Корисні типи: <code>number</code>, <code>string</code>, <code>boolean</code>, <code>{number}</code> (масив чисел), <code>{[string]: number}</code> (словник), <code>Player</code>, <code>Part</code>, <code>Vector3</code>, а <code>string?</code> означає «рядок або nil».</p>`,
        `<p>Luau позволяет (но не требует) указывать <b>типы</b> переменных и функций:</p>
<pre class="inline-code">local coins: number = 0
local name: string = "Alex"
local function heal(hp: number, amount: number): number
  return math.min(hp + amount, 100)
end</pre>
<p>Studio подсвечивает ошибки ещё до запуска: если передать в <code>heal</code> строку, увидишь предупреждение. Для этого вверху скрипта пишут <code>--!strict</code>.</p>
<p>Полезные типы: <code>number</code>, <code>string</code>, <code>boolean</code>, <code>{number}</code> (массив чисел), <code>{[string]: number}</code> (словарь), <code>Player</code>, <code>Part</code>, <code>Vector3</code>, а <code>string?</code> значит «строка или nil».</p>`,
        `<p>Luau lets you (optionally) annotate <b>types</b> on variables and functions:</p>
<pre class="inline-code">local coins: number = 0
local name: string = "Alex"
local function heal(hp: number, amount: number): number
  return math.min(hp + amount, 100)
end</pre>
<p>Studio highlights mistakes before you run: pass a string to <code>heal</code> and you get a warning. Enable it with <code>--!strict</code> at the top of a script.</p>
<p>Useful types: <code>number</code>, <code>string</code>, <code>boolean</code>, <code>{number}</code> (an array of numbers), <code>{[string]: number}</code> (a dictionary), <code>Player</code>, <code>Part</code>, <code>Vector3</code>, and <code>string?</code> means “string or nil”.</p>`),
      why: L(`<p>У великій грі тисячі рядків коду. Типи працюють як підказки й страховка: редактор попереджає про опечатки й неправильні аргументи, а код пояснює сам себе. Великі студії Roblox пишуть майже весь код зі <code>--!strict</code>.</p>`,
        `<p>В большой игре тысячи строк кода. Типы работают как подсказки и страховка: редактор предупреждает об опечатках и неправильных аргументах, а код объясняет сам себя. Крупные студии Roblox пишут почти весь код со <code>--!strict</code>.</p>`,
        `<p>Big games have thousands of lines. Types act as hints and safety nets: the editor warns about typos and wrong arguments, and the code documents itself. Large Roblox studios write almost everything with <code>--!strict</code>.</p>`),
      mistakes: L(`<ul><li>Типи не змінюють поведінку під час запуску — це перевірка в редакторі.</li><li>Плутати <code>:</code> типу (<code>x: number</code>) і <code>:</code> методу (<code>obj:Destroy()</code>).</li></ul>`,
        `<ul><li>Типы не меняют поведение во время запуска — это проверка в редакторе.</li><li>Путать <code>:</code> типа (<code>x: number</code>) и <code>:</code> метода (<code>obj:Destroy()</code>).</li></ul>`,
        `<ul><li>Types don’t change runtime behaviour — they’re an editor check.</li><li>Confusing the type colon (<code>x: number</code>) with the method colon (<code>obj:Destroy()</code>).</li></ul>`),
      examples: [
        { title: L('Змінні', 'Переменные', 'Variables'), code: 'local coins: number = 50\nlocal nick: string = "Alex"\nlocal vip: boolean = true\nprint(nick, coins, vip)', note: L('Анотації після двокрапки.', 'Аннотации после двоеточия.', 'Annotations after a colon.') },
        { title: L('Функції', 'Функции', 'Functions'), code: 'local function heal(hp: number, amount: number): number\n  return math.min(hp + amount, 100)\nend\nprint(heal(70, 20))\nprint(heal(95, 20))', note: L('Тип параметрів і результату.', 'Тип параметров и результата.', 'Parameter and return types.') },
        { title: 'typeof', code: 'print(typeof(5), typeof("x"), typeof(Vector3.new(1, 2, 3)), typeof(workspace))', note: L('typeof знає типи Roblox.', 'typeof знает типы Roblox.', 'typeof knows Roblox types.') }
      ],
      task: {
        text: L('Напиши типізовану функцію <code>xpForLevel(level: number): number</code>, що повертає <code>level * level * 100</code>. Виведи результати для рівнів 1, 5 і 10 шаблоном <code>Level 5: 2500 XP</code>.', 'Напиши типизированную функцию <code>xpForLevel(level: number): number</code>, возвращающую <code>level * level * 100</code>. Выведи результаты для уровней 1, 5 и 10 шаблоном <code>Level 5: 2500 XP</code>.', 'Write a typed function <code>xpForLevel(level: number): number</code> returning <code>level * level * 100</code>. Print results for levels 1, 5 and 10 using the template <code>Level 5: 2500 XP</code>.'),
        how: [L('<code>local function xpForLevel(level: number): number</code>', '<code>local function xpForLevel(level: number): number</code>', '<code>local function xpForLevel(level: number): number</code>'), L('Цикл по <code>{1, 5, 10}</code> з <code>ipairs</code>.', 'Цикл по <code>{1, 5, 10}</code> с <code>ipairs</code>.', 'Loop over <code>{1, 5, 10}</code> with <code>ipairs</code>.')],
        starter: '',
        solution: 'local function xpForLevel(level: number): number\n  return level * level * 100\nend\n\nfor _, lvl in ipairs({1, 5, 10}) do\n  print(`Level {lvl}: {xpForLevel(lvl)} XP`)\nend',
        hint: L('Очікувано: 100, 2500, 10000.', 'Ожидается: 100, 2500, 10000.', 'Expected: 100, 2500, 10000.'),
        expected: 'Level 1: 100 XP\nLevel 5: 2500 XP\nLevel 10: 10000 XP',
        must: /level\s*:\s*number\s*\)\s*:\s*number/
      },
      quiz: { q: L('Що означає тип <code>string?</code>?', 'Что означает тип <code>string?</code>?', 'What does the type <code>string?</code> mean?'), options: [L('рядок-питання', 'строка-вопрос', 'a question string'), L('рядок або nil', 'строка или nil', 'string or nil'), L('будь-який тип', 'любой тип', 'any type')], answer: 1, explain: L('? — «може бути nil».', '? — «может быть nil».', '? means “may be nil”.') },
      ref: [{ code: 'local x: number = 0', d: L('анотація типу', 'аннотация типа', 'type annotation') }, { code: '--!strict', d: L('строга перевірка', 'строгая проверка', 'strict checking') }]
    },
    {
      id: 'instances', chapter: CH2,
      title: L('Instance: створення об’єктів', 'Instance: создание объектов', 'Instance: creating objects'),
      theory: L(
        `<p>Усе в грі Roblox — деталі, моделі, звуки, світло, папки — це об’єкти класу <b>Instance</b>. Їх можна створювати кодом:</p>
<pre class="inline-code">local part = Instance.new("Part")
part.Name = "Platform"
part.Parent = workspace</pre>
<ul><li><code>Instance.new("ClassName")</code> — створити об’єкт (Part, Folder, Model, Sound, PointLight, IntValue…)</li><li><code>.Name</code> — ім’я в Explorer</li><li><code>.Parent</code> — куди покласти. Поки Parent не задано, об’єкт «висить у повітрі» й у світі не видно</li><li><code>.ClassName</code> — клас об’єкта (лише для читання)</li></ul>
<p><code>workspace</code> — короткий запис для <code>game.Workspace</code>, 3D-світу гри.</p>`,
        `<p>Всё в игре Roblox — детали, модели, звуки, свет, папки — это объекты класса <b>Instance</b>. Их можно создавать кодом:</p>
<pre class="inline-code">local part = Instance.new("Part")
part.Name = "Platform"
part.Parent = workspace</pre>
<ul><li><code>Instance.new("ClassName")</code> — создать объект (Part, Folder, Model, Sound, PointLight, IntValue…)</li><li><code>.Name</code> — имя в Explorer</li><li><code>.Parent</code> — куда положить. Пока Parent не задан, объект «висит в воздухе» и в мире не виден</li><li><code>.ClassName</code> — класс объекта (только для чтения)</li></ul>
<p><code>workspace</code> — короткая запись для <code>game.Workspace</code>, 3D-мира игры.</p>`,
        `<p>Everything in a Roblox game — parts, models, sounds, lights, folders — is an <b>Instance</b>. You can create them in code:</p>
<pre class="inline-code">local part = Instance.new("Part")
part.Name = "Platform"
part.Parent = workspace</pre>
<ul><li><code>Instance.new("ClassName")</code> — create an object (Part, Folder, Model, Sound, PointLight, IntValue…)</li><li><code>.Name</code> — the name in Explorer</li><li><code>.Parent</code> — where to put it. Until Parent is set, the object floats nowhere and isn’t visible</li><li><code>.ClassName</code> — the object’s class (read-only)</li></ul>
<p><code>workspace</code> is shorthand for <code>game.Workspace</code>, the game’s 3D world.</p>`),
      why: L(`<p>Чому Parent встановлюють <b>останнім</b>? Коли об’єкт потрапляє у світ, Roblox одразу малює його й надсилає гравцям. Якщо спершу поставити Parent, а потім змінювати 10 властивостей, буде 10 оновлень замість одного. Тому: створив → налаштував → Parent.</p>`,
        `<p>Почему Parent устанавливают <b>последним</b>? Когда объект попадает в мир, Roblox сразу рисует его и отправляет игрокам. Если сначала поставить Parent, а потом менять 10 свойств, будет 10 обновлений вместо одного. Поэтому: создал → настроил → Parent.</p>`,
        `<p>Why set Parent <b>last</b>? Once an object enters the world, Roblox renders it and replicates it to players. Setting Parent first and then changing 10 properties means 10 updates instead of one. So: create → configure → Parent.</p>`),
      mistakes: L(`<ul><li>Забути <code>Parent</code> — деталь створено, але її ніде немає.</li><li>Опечатка в назві класу: <code>Instance.new("part")</code> — назви класів з великої літери.</li></ul>`,
        `<ul><li>Забыть <code>Parent</code> — деталь создана, но её нигде нет.</li><li>Опечатка в названии класса: <code>Instance.new("part")</code> — названия классов с большой буквы.</li></ul>`,
        `<ul><li>Forgetting <code>Parent</code> — the part exists but nowhere in the world.</li><li>A class-name typo: <code>Instance.new("part")</code> — class names are capitalised.</li></ul>`),
      examples: [
        { title: 'Part', code: 'local part = Instance.new("Part")\npart.Name = "Platform"\npart.Parent = workspace\nprint(part.Name, part.ClassName, part.Parent.Name)', note: L('Деталь у світі.', 'Деталь в мире.', 'A part in the world.') },
        { title: 'Folder', code: 'local coins = Instance.new("Folder")\ncoins.Name = "Coins"\ncoins.Parent = workspace\nfor i = 1, 3 do\n  local c = Instance.new("Part")\n  c.Name = `Coin{i}`\n  c.Parent = coins\nend\nprint(#coins:GetChildren())', note: L('Папка з трьома монетами.', 'Папка с тремя монетами.', 'A folder with three coins.') },
        { title: L('Parent у new', 'Parent в new', 'Parent in new'), code: 'local light = Instance.new("PointLight", workspace)\nprint(light.Parent.Name, light.Brightness)', note: L('Другий аргумент — Parent (зручно, але Parent краще ставити в кінці).', 'Второй аргумент — Parent (удобно, но Parent лучше ставить в конце).', 'The second argument is Parent (handy, but setting Parent last is better).') }
      ],
      task: {
        text: L('Створи папку <code>Level1</code> у <code>workspace</code>, а в ній дві деталі (<code>Part</code>) з іменами <code>Start</code> і <code>Finish</code>. Виведи імена всіх дітей папки через цикл <code>for … in ipairs(folder:GetChildren())</code>.', 'Создай папку <code>Level1</code> в <code>workspace</code>, а в ней две детали (<code>Part</code>) с именами <code>Start</code> и <code>Finish</code>. Выведи имена всех детей папки через цикл <code>for … in ipairs(folder:GetChildren())</code>.', 'Create a folder <code>Level1</code> in <code>workspace</code> with two <code>Part</code>s named <code>Start</code> and <code>Finish</code>. Print the names of the folder’s children with <code>for … in ipairs(folder:GetChildren())</code>.'),
        how: [L('<code>Instance.new("Folder")</code>, Name, Parent.', '<code>Instance.new("Folder")</code>, Name, Parent.', '<code>Instance.new("Folder")</code>, Name, Parent.'), L('Дві деталі з Parent = folder.', 'Две детали с Parent = folder.', 'Two parts with Parent = folder.')],
        starter: '',
        solution: 'local folder = Instance.new("Folder")\nfolder.Name = "Level1"\nfolder.Parent = workspace\n\nfor _, name in ipairs({"Start", "Finish"}) do\n  local part = Instance.new("Part")\n  part.Name = name\n  part.Parent = folder\nend\n\nfor _, child in ipairs(folder:GetChildren()) do\n  print(child.Name)\nend',
        hint: L('Порядок дітей — порядок додавання.', 'Порядок детей — порядок добавления.', 'Children keep insertion order.'),
        expected: 'Start\nFinish',
        must: /Instance\.new\s*\(\s*["']Folder/
      },
      quiz: { q: L('Коли новий об’єкт з’являється у світі?', 'Когда новый объект появляется в мире?', 'When does a new object appear in the world?'), options: [L('одразу після Instance.new', 'сразу после Instance.new', 'right after Instance.new'), L('коли задано Parent у workspace', 'когда задан Parent в workspace', 'when its Parent is set inside workspace'), L('після перезапуску', 'после перезапуска', 'after a restart')], answer: 1, explain: L('Без Parent об’єкта немає у світі.', 'Без Parent объекта нет в мире.', 'Without a Parent it isn’t in the world.') },
      ref: [{ code: 'Instance.new("Part")', d: L('створити об’єкт', 'создать объект', 'create an object') }, { code: 'obj.Parent = workspace', d: L('помістити у світ', 'поместить в мир', 'put into the world') }]
    },
    {
      id: 'properties', chapter: CH2,
      title: L('Властивості деталей', 'Свойства деталей', 'Part properties'),
      theory: L(
        `<p>Деталь (<code>Part</code>) має десятки властивостей. Найважливіші:</p>
<table class="mini"><tr><td><code>Size</code></td><td>розмір — <code>Vector3.new(x, y, z)</code></td></tr><tr><td><code>Position</code></td><td>позиція у світі — <code>Vector3</code></td></tr><tr><td><code>Anchored</code></td><td><code>true</code> — деталь не падає (закріплена)</td></tr><tr><td><code>CanCollide</code></td><td>чи можна крізь неї пройти</td></tr><tr><td><code>Color</code></td><td><code>Color3.fromRGB(255, 0, 0)</code></td></tr><tr><td><code>Transparency</code></td><td>0 — непрозора, 1 — невидима</td></tr><tr><td><code>Material</code></td><td><code>Enum.Material.Neon</code>, <code>Wood</code>, <code>Grass</code>…</td></tr></table>
<p><code>Vector3</code> — тривимірний вектор: X (ліво-право), Y (вгору-вниз), Z (вперед-назад). Його складові читають як <code>pos.X</code>, <code>pos.Y</code>.</p>`,
        `<p>Деталь (<code>Part</code>) имеет десятки свойств. Самые важные:</p>
<table class="mini"><tr><td><code>Size</code></td><td>размер — <code>Vector3.new(x, y, z)</code></td></tr><tr><td><code>Position</code></td><td>позиция в мире — <code>Vector3</code></td></tr><tr><td><code>Anchored</code></td><td><code>true</code> — деталь не падает (закреплена)</td></tr><tr><td><code>CanCollide</code></td><td>можно ли сквозь неё пройти</td></tr><tr><td><code>Color</code></td><td><code>Color3.fromRGB(255, 0, 0)</code></td></tr><tr><td><code>Transparency</code></td><td>0 — непрозрачная, 1 — невидимая</td></tr><tr><td><code>Material</code></td><td><code>Enum.Material.Neon</code>, <code>Wood</code>, <code>Grass</code>…</td></tr></table>
<p><code>Vector3</code> — трёхмерный вектор: X (лево-право), Y (вверх-вниз), Z (вперёд-назад). Его составляющие читают как <code>pos.X</code>, <code>pos.Y</code>.</p>`,
        `<p>A <code>Part</code> has dozens of properties. The key ones:</p>
<table class="mini"><tr><td><code>Size</code></td><td>size — <code>Vector3.new(x, y, z)</code></td></tr><tr><td><code>Position</code></td><td>world position — a <code>Vector3</code></td></tr><tr><td><code>Anchored</code></td><td><code>true</code> — the part doesn’t fall</td></tr><tr><td><code>CanCollide</code></td><td>whether things can pass through it</td></tr><tr><td><code>Color</code></td><td><code>Color3.fromRGB(255, 0, 0)</code></td></tr><tr><td><code>Transparency</code></td><td>0 opaque, 1 invisible</td></tr><tr><td><code>Material</code></td><td><code>Enum.Material.Neon</code>, <code>Wood</code>, <code>Grass</code>…</td></tr></table>
<p><code>Vector3</code> is a 3D vector: X (left-right), Y (up-down), Z (forward-back). Read components with <code>pos.X</code>, <code>pos.Y</code>.</p>`),
      why: L(`<p>Будь-яка механіка — це зміна властивостей: двері відчиняються (<code>Transparency</code> і <code>CanCollide</code>), платформа рухається (<code>Position</code>), лава світиться (<code>Material = Neon</code>). Знаючи властивості, ти керуєш світом гри.</p>`,
        `<p>Любая механика — это изменение свойств: двери открываются (<code>Transparency</code> и <code>CanCollide</code>), платформа двигается (<code>Position</code>), лава светится (<code>Material = Neon</code>). Зная свойства, ты управляешь миром игры.</p>`,
        `<p>Every mechanic is property changes: doors open (<code>Transparency</code> and <code>CanCollide</code>), platforms move (<code>Position</code>), lava glows (<code>Material = Neon</code>). Know the properties and you control the game world.</p>`),
      mistakes: L(`<ul><li>Забути <code>Anchored = true</code> — деталь упаде під дією гравітації.</li><li><code>part.Size = 5</code> — розмір завжди <code>Vector3</code>.</li><li><code>Color3.new(255, 0, 0)</code> — <code>new</code> приймає 0–1, для 0–255 використовуй <code>fromRGB</code>.</li></ul>`,
        `<ul><li>Забыть <code>Anchored = true</code> — деталь упадёт под действием гравитации.</li><li><code>part.Size = 5</code> — размер всегда <code>Vector3</code>.</li><li><code>Color3.new(255, 0, 0)</code> — <code>new</code> принимает 0–1, для 0–255 используй <code>fromRGB</code>.</li></ul>`,
        `<ul><li>Forgetting <code>Anchored = true</code> — the part falls with gravity.</li><li><code>part.Size = 5</code> — size is always a <code>Vector3</code>.</li><li><code>Color3.new(255, 0, 0)</code> — <code>new</code> takes 0–1; use <code>fromRGB</code> for 0–255.</li></ul>`),
      examples: [
        { title: L('Платформа', 'Платформа', 'Platform'), code: 'local p = Instance.new("Part")\np.Name = "Platform"\np.Size = Vector3.new(10, 1, 10)\np.Position = Vector3.new(0, 5, 0)\np.Anchored = true\np.Parent = workspace\nprint(p.Size, p.Position.Y, p.Anchored)', note: L('Закріплена платформа 10×1×10.', 'Закреплённая платформа 10×1×10.', 'An anchored 10×1×10 platform.') },
        { title: L('Колір і матеріал', 'Цвет и материал', 'Colour and material'), code: 'local lava = Instance.new("Part")\nlava.Color = Color3.fromRGB(255, 80, 0)\nlava.Material = Enum.Material.Neon\nlava.Parent = workspace\nprint(lava.Color, lava.Material)', note: L('Яскрава неонова лава.', 'Яркая неоновая лава.', 'Glowing neon lava.') },
        { title: L('Невидима стіна', 'Невидимая стена', 'Invisible wall'), code: 'local wall = Instance.new("Part")\nwall.Transparency = 1\nwall.CanCollide = true\nwall.Anchored = true\nwall.Parent = workspace\nprint("Invisible:", wall.Transparency == 1, "Solid:", wall.CanCollide)', note: L('Не видно, але не пройти.', 'Не видно, но не пройти.', 'Invisible but solid.') },
        { title: 'Vector3', code: 'local a = Vector3.new(1, 2, 3)\nlocal b = Vector3.new(4, 0, -1)\nprint(a + b)\nprint(a * 2)\nprint(a.X, a.Y, a.Z)\nprint(Vector3.new(3, 4, 0).Magnitude)', note: L('Вектори можна додавати й множити.', 'Векторы можно складывать и умножать.', 'Vectors can be added and scaled.') }
      ],
      task: {
        text: L('Створи деталь <code>Bridge</code>: розмір <code>20, 1, 4</code>, позиція <code>0, 10, 0</code>, закріплена, колір <code>Color3.fromRGB(139, 69, 19)</code>, у <code>workspace</code>. Виведи <code>Size</code>, потім <code>Position.Y</code>, потім <code>Anchored</code> — кожне окремим print.', 'Создай деталь <code>Bridge</code>: размер <code>20, 1, 4</code>, позиция <code>0, 10, 0</code>, закреплена, цвет <code>Color3.fromRGB(139, 69, 19)</code>, в <code>workspace</code>. Выведи <code>Size</code>, затем <code>Position.Y</code>, затем <code>Anchored</code> — каждое отдельным print.', 'Create a part <code>Bridge</code>: size <code>20, 1, 4</code>, position <code>0, 10, 0</code>, anchored, colour <code>Color3.fromRGB(139, 69, 19)</code>, in <code>workspace</code>. Print <code>Size</code>, then <code>Position.Y</code>, then <code>Anchored</code>, each with its own print.'),
        how: [L('Налаштуй усі властивості, Parent — останнім.', 'Настрой все свойства, Parent — последним.', 'Set every property, Parent last.')],
        starter: 'local bridge = Instance.new("Part")\n',
        solution: 'local bridge = Instance.new("Part")\nbridge.Name = "Bridge"\nbridge.Size = Vector3.new(20, 1, 4)\nbridge.Position = Vector3.new(0, 10, 0)\nbridge.Anchored = true\nbridge.Color = Color3.fromRGB(139, 69, 19)\nbridge.Parent = workspace\nprint(bridge.Size)\nprint(bridge.Position.Y)\nprint(bridge.Anchored)',
        hint: L('Vector3 виводиться як <code>20, 1, 4</code>.', 'Vector3 выводится как <code>20, 1, 4</code>.', 'A Vector3 prints as <code>20, 1, 4</code>.'),
        expected: '20, 1, 4\n10\ntrue',
        must: /Anchored\s*=\s*true[\s\S]*Parent\s*=\s*workspace|Parent\s*=\s*workspace/
      },
      quiz: { q: L('Що робить <code>Anchored = true</code>?', 'Что делает <code>Anchored = true</code>?', 'What does <code>Anchored = true</code> do?'), options: [L('робить деталь невидимою', 'делает деталь невидимой', 'makes the part invisible'), L('закріплює деталь — вона не падає', 'закрепляет деталь — она не падает', 'pins the part so it doesn’t fall'), L('прив’язує до гравця', 'привязывает к игроку', 'attaches it to the player')], answer: 1, explain: L('Фізика на неї не діє.', 'Физика на неё не действует.', 'Physics doesn’t move it.') },
      ref: [{ code: 'Vector3.new(x, y, z)', d: L('розмір/позиція', 'размер/позиция', 'size/position') }, { code: 'Color3.fromRGB(r, g, b)', d: L('колір', 'цвет', 'colour') }, { code: 'Anchored CanCollide Transparency', d: L('фізика й видимість', 'физика и видимость', 'physics and visibility') }]
    },
    {
      id: 'hierarchy', chapter: CH2,
      title: L('Ієрархія: пошук, клонування, видалення', 'Иерархия: поиск, клонирование, удаление', 'Hierarchy: find, clone, destroy'),
      theory: L(
        `<p>Об’єкти утворюють <b>дерево</b>: у кожного є <code>Parent</code> і можуть бути діти. Методи для роботи з деревом:</p>
<ul><li><code>obj:FindFirstChild("Name")</code> — знайти дитину за іменем або <code>nil</code></li><li><code>obj:WaitForChild("Name")</code> — дочекатися появи (важливо для клієнта, бо об’єкти завантажуються поступово)</li><li><code>obj:GetChildren()</code> — масив прямих дітей, <code>obj:GetDescendants()</code> — усіх нащадків</li><li><code>obj:IsA("BasePart")</code> — перевірити клас</li><li><code>obj:Clone()</code> — копія з усіма дітьми (Parent у копії порожній!)</li><li><code>obj:Destroy()</code> — видалити назавжди</li></ul>
<p>Звертатися до дитини можна й через крапку: <code>workspace.Level1.Start</code> — але якщо об’єкта немає, буде помилка. <code>FindFirstChild</code> безпечніший.</p>`,
        `<p>Объекты образуют <b>дерево</b>: у каждого есть <code>Parent</code> и могут быть дети. Методы для работы с деревом:</p>
<ul><li><code>obj:FindFirstChild("Name")</code> — найти ребёнка по имени или <code>nil</code></li><li><code>obj:WaitForChild("Name")</code> — дождаться появления (важно для клиента, ведь объекты загружаются постепенно)</li><li><code>obj:GetChildren()</code> — массив прямых детей, <code>obj:GetDescendants()</code> — всех потомков</li><li><code>obj:IsA("BasePart")</code> — проверить класс</li><li><code>obj:Clone()</code> — копия со всеми детьми (Parent у копии пустой!)</li><li><code>obj:Destroy()</code> — удалить навсегда</li></ul>
<p>Обращаться к ребёнку можно и через точку: <code>workspace.Level1.Start</code> — но если объекта нет, будет ошибка. <code>FindFirstChild</code> безопаснее.</p>`,
        `<p>Objects form a <b>tree</b>: each has a <code>Parent</code> and may have children. Tree methods:</p>
<ul><li><code>obj:FindFirstChild("Name")</code> — find a child by name, or <code>nil</code></li><li><code>obj:WaitForChild("Name")</code> — wait until it appears (important on the client, since objects load gradually)</li><li><code>obj:GetChildren()</code> — direct children, <code>obj:GetDescendants()</code> — all descendants</li><li><code>obj:IsA("BasePart")</code> — check the class</li><li><code>obj:Clone()</code> — a copy with all children (the copy’s Parent is empty!)</li><li><code>obj:Destroy()</code> — delete permanently</li></ul>
<p>You can also use dots: <code>workspace.Level1.Start</code> — but it errors if missing. <code>FindFirstChild</code> is safer.</p>`),
      why: L(`<p>Скрипти постійно шукають об’єкти: «чи є в цьому персонажі Humanoid?», «знайди всі монети в папці». А <code>Clone</code> — основа спавну: ворога чи монету роблять один раз як шаблон, а потім клонують скільки завгодно.</p>`,
        `<p>Скрипты постоянно ищут объекты: «есть ли в этом персонаже Humanoid?», «найди все монеты в папке». А <code>Clone</code> — основа спавна: врага или монету делают один раз как шаблон, а потом клонируют сколько угодно.</p>`,
        `<p>Scripts constantly look things up: “does this character have a Humanoid?”, “find all coins in the folder”. <code>Clone</code> is the basis of spawning: build an enemy or coin once as a template, then clone as many as you need.</p>`),
      mistakes: L(`<ul><li>Забути встановити <code>Parent</code> у клону — копія ніде не з’явиться.</li><li>Використовувати знищений об’єкт після <code>Destroy()</code>.</li></ul>`,
        `<ul><li>Забыть установить <code>Parent</code> у клона — копия нигде не появится.</li><li>Использовать уничтоженный объект после <code>Destroy()</code>.</li></ul>`,
        `<ul><li>Forgetting to set the clone’s <code>Parent</code> — the copy never appears.</li><li>Using an object after <code>Destroy()</code>.</li></ul>`),
      examples: [
        { title: 'FindFirstChild', code: 'local f = Instance.new("Folder", workspace)\nf.Name = "Spawns"\nInstance.new("Part", f).Name = "A"\nprint(workspace:FindFirstChild("Spawns") ~= nil)\nprint(f:FindFirstChild("A").Name)\nprint(f:FindFirstChild("Z"))', note: L('Відсутнє — nil, без помилки.', 'Отсутствующее — nil, без ошибки.', 'Missing returns nil, no error.') },
        { title: 'Clone', code: 'local template = Instance.new("Part")\ntemplate.Name = "Coin"\nfor i = 1, 3 do\n  local c = template:Clone()\n  c.Position = Vector3.new(i * 5, 2, 0)\n  c.Parent = workspace\nend\nlocal count = 0\nfor _, obj in ipairs(workspace:GetChildren()) do\n  if obj.Name == "Coin" then count += 1 end\nend\nprint(count)', note: L('Шаблон + клони.', 'Шаблон + клоны.', 'A template plus clones.') },
        { title: 'Destroy', code: 'local trap = Instance.new("Part", workspace)\ntrap.Name = "Trap"\nprint(workspace:FindFirstChild("Trap") ~= nil)\ntrap:Destroy()\nprint(workspace:FindFirstChild("Trap"))', note: L('Після Destroy об’єкта немає.', 'После Destroy объекта нет.', 'After Destroy it’s gone.') },
        { title: 'IsA', code: 'Instance.new("Part", workspace)\nInstance.new("Folder", workspace)\nfor _, obj in ipairs(workspace:GetChildren()) do\n  print(obj.ClassName, obj:IsA("BasePart"))\nend', note: L('BasePart — усі види деталей.', 'BasePart — все виды деталей.', 'BasePart covers every kind of part.') }
      ],
      task: {
        text: L('Створи шаблон деталі з іменем <code>Enemy</code>. Склонуй його 4 рази в папку <code>Enemies</code> (у workspace), даючи клонам імена <code>Enemy1</code>…<code>Enemy4</code>. Потім знищ <code>Enemy2</code> і виведи кількість дітей папки та чи існує ще <code>Enemy2</code> (<code>FindFirstChild ~= nil</code>).', 'Создай шаблон детали с именем <code>Enemy</code>. Склонируй его 4 раза в папку <code>Enemies</code> (в workspace), давая клонам имена <code>Enemy1</code>…<code>Enemy4</code>. Затем уничтожь <code>Enemy2</code> и выведи количество детей папки и существует ли ещё <code>Enemy2</code> (<code>FindFirstChild ~= nil</code>).', 'Create a part template named <code>Enemy</code>. Clone it 4 times into a folder <code>Enemies</code> (in workspace), naming the clones <code>Enemy1</code>…<code>Enemy4</code>. Then destroy <code>Enemy2</code> and print the folder’s child count and whether <code>Enemy2</code> still exists (<code>FindFirstChild ~= nil</code>).'),
        how: [L('Цикл <code>for i = 1, 4</code> з <code>template:Clone()</code>.', 'Цикл <code>for i = 1, 4</code> с <code>template:Clone()</code>.', 'A <code>for i = 1, 4</code> loop with <code>template:Clone()</code>.'), L('<code>folder:FindFirstChild("Enemy2"):Destroy()</code>', '<code>folder:FindFirstChild("Enemy2"):Destroy()</code>', '<code>folder:FindFirstChild("Enemy2"):Destroy()</code>')],
        starter: '',
        solution: 'local template = Instance.new("Part")\ntemplate.Name = "Enemy"\n\nlocal folder = Instance.new("Folder")\nfolder.Name = "Enemies"\nfolder.Parent = workspace\n\nfor i = 1, 4 do\n  local e = template:Clone()\n  e.Name = `Enemy{i}`\n  e.Parent = folder\nend\n\nfolder:FindFirstChild("Enemy2"):Destroy()\nprint(#folder:GetChildren())\nprint(folder:FindFirstChild("Enemy2") ~= nil)',
        hint: L('Очікувано: 3 і false.', 'Ожидается: 3 и false.', 'Expected: 3 and false.'),
        expected: '3\nfalse',
        must: /Clone\s*\(\s*\)[\s\S]*Destroy\s*\(\s*\)/
      },
      quiz: { q: L('Який Parent має щойно створений клон?', 'Какой Parent у только что созданного клона?', 'What is a fresh clone’s Parent?'), options: [L('той самий, що в оригіналу', 'тот же, что у оригинала', 'the same as the original'), 'nil', 'workspace'], answer: 1, explain: L('Клон треба самому покласти у світ.', 'Клон нужно самому положить в мир.', 'You must parent the clone yourself.') },
      ref: [{ code: 'obj:FindFirstChild(name)', d: L('безпечний пошук', 'безопасный поиск', 'safe lookup') }, { code: 'obj:Clone() obj:Destroy()', d: L('копія, видалення', 'копия, удаление', 'copy, delete') }, { code: 'obj:GetChildren() obj:IsA(c)', d: L('діти, перевірка класу', 'дети, проверка класса', 'children, class check') }]
    },
    {
      id: 'events', chapter: CH3,
      title: L('Події: Touched і Connect', 'События: Touched и Connect', 'Events: Touched and Connect'),
      theory: L(
        `<p>Ігри Roblox <b>реагують на події</b>: дотик, клік, вхід гравця, смерть персонажа. Щоб реагувати, до події <b>підключають</b> функцію:</p>
<pre class="inline-code">part.Touched:Connect(function(hit)
  print(hit.Name .. " touched the part")
end)</pre>
<ul><li><code>part.Touched</code> — подія «щось торкнулося деталі»</li><li><code>:Connect(fn)</code> — виклич <code>fn</code> щоразу, коли подія стається</li><li><code>hit</code> — деталь, яка торкнулася (наприклад, нога персонажа)</li><li><code>Connect</code> повертає з’єднання; <code>connection:Disconnect()</code> перестає слухати</li></ul>
<p>Персонаж гравця — модель, а <code>hit</code> — одна з її частин. Тому персонажа знаходять як <code>hit.Parent</code>.</p>
<div class="tip">🧪 У симуляторі дотик викликається вручну: <code>Simulator.touch(part, хтоТоркнувся)</code>. У справжній грі це робить фізика.</div>`,
        `<p>Игры Roblox <b>реагируют на события</b>: касание, клик, вход игрока, смерть персонажа. Чтобы реагировать, к событию <b>подключают</b> функцию:</p>
<pre class="inline-code">part.Touched:Connect(function(hit)
  print(hit.Name .. " touched the part")
end)</pre>
<ul><li><code>part.Touched</code> — событие «что-то коснулось детали»</li><li><code>:Connect(fn)</code> — вызови <code>fn</code> каждый раз, когда событие происходит</li><li><code>hit</code> — деталь, которая коснулась (например, нога персонажа)</li><li><code>Connect</code> возвращает соединение; <code>connection:Disconnect()</code> перестаёт слушать</li></ul>
<p>Персонаж игрока — модель, а <code>hit</code> — одна из её частей. Поэтому персонажа находят как <code>hit.Parent</code>.</p>
<div class="tip">🧪 В симуляторе касание вызывается вручную: <code>Simulator.touch(part, ктоКоснулся)</code>. В настоящей игре это делает физика.</div>`,
        `<p>Roblox games <b>react to events</b>: touches, clicks, players joining, characters dying. To react, you <b>connect</b> a function to an event:</p>
<pre class="inline-code">part.Touched:Connect(function(hit)
  print(hit.Name .. " touched the part")
end)</pre>
<ul><li><code>part.Touched</code> — the “something touched this part” event</li><li><code>:Connect(fn)</code> — call <code>fn</code> every time it happens</li><li><code>hit</code> — the part that touched it (e.g. a character’s foot)</li><li><code>Connect</code> returns a connection; <code>connection:Disconnect()</code> stops listening</li></ul>
<p>A player’s character is a model and <code>hit</code> is one of its parts, so the character is <code>hit.Parent</code>.</p>
<div class="tip">🧪 In the simulator you trigger touches manually: <code>Simulator.touch(part, whoTouched)</code>. In a real game physics does it.</div>`),
      why: L(`<p>Події — це спосіб гри «чекати», не витрачаючи ресурсів. Замість безкінечної перевірки «чи торкнувся хтось лави?» Roblox сам викликає твою функцію в потрібний момент. Майже вся логіка ігор будується на подіях.</p>`,
        `<p>События — это способ игры «ждать», не тратя ресурсы. Вместо бесконечной проверки «коснулся ли кто-то лавы?» Roblox сам вызывает твою функцию в нужный момент. Почти вся логика игр строится на событиях.</p>`,
        `<p>Events let a game “wait” without wasting resources. Instead of endlessly checking “did anyone touch the lava?”, Roblox calls your function at the right moment. Nearly all game logic is event-driven.</p>`),
      mistakes: L(`<ul><li><code>part.Touched:Connect(onTouch())</code> — функцію викликано одразу! Треба <code>Connect(onTouch)</code>.</li><li>Touched спрацьовує <b>багато разів</b> поспіль (кожна частина тіла) — потрібен «debounce» (далі в курсі).</li></ul>`,
        `<ul><li><code>part.Touched:Connect(onTouch())</code> — функция вызвана сразу! Нужно <code>Connect(onTouch)</code>.</li><li>Touched срабатывает <b>много раз</b> подряд (каждая часть тела) — нужен «debounce» (дальше в курсе).</li></ul>`,
        `<ul><li><code>part.Touched:Connect(onTouch())</code> calls the function immediately! Use <code>Connect(onTouch)</code>.</li><li>Touched fires <b>many times</b> in a row (each body part) — you need a “debounce” (later in the course).</li></ul>`),
      examples: [
        { title: 'Touched', code: 'local pad = Instance.new("Part", workspace)\npad.Name = "JumpPad"\npad.Touched:Connect(function(hit)\n  print(`{hit.Name} touched {pad.Name}`)\nend)\nlocal ball = Instance.new("Part", workspace)\nball.Name = "Ball"\nSimulator.touch(pad, ball)', note: L('Функція викликається при дотику.', 'Функция вызывается при касании.', 'The function runs on touch.') },
        { title: L('Іменована функція', 'Именованная функция', 'Named function'), code: 'local count = 0\nlocal button = Instance.new("Part", workspace)\nlocal function onTouched(hit)\n  count += 1\n  print("Touches:", count)\nend\nbutton.Touched:Connect(onTouched)\nlocal foot = Instance.new("Part")\nSimulator.touch(button, foot)\nSimulator.touch(button, foot)', note: L('Передаємо функцію без дужок.', 'Передаём функцию без скобок.', 'Pass the function without parentheses.') },
        { title: 'Disconnect', code: 'local p = Instance.new("Part", workspace)\nlocal conn\nconn = p.Touched:Connect(function()\n  print("first touch only")\n  conn:Disconnect()\nend)\nlocal x = Instance.new("Part")\nSimulator.touch(p, x)\nSimulator.touch(p, x)', note: L('Відключення після першого разу.', 'Отключение после первого раза.', 'Disconnect after the first time.') },
        { title: L('Чий персонаж', 'Чей персонаж', 'Whose character'), code: 'local Players = game:GetService("Players")\nlocal pad = Instance.new("Part", workspace)\npad.Touched:Connect(function(hit)\n  local character = hit.Parent\n  local player = Players:GetPlayerFromCharacter(character)\n  if player then\n    print(player.Name .. " stepped on the pad")\n  end\nend)\nlocal alex = Simulator.addPlayer("Alex")\nSimulator.touch(pad, alex.Character.Head)', note: L('hit.Parent — модель персонажа.', 'hit.Parent — модель персонажа.', 'hit.Parent is the character model.') }
      ],
      task: {
        text: L('Створи деталь <code>Checkpoint</code>. Підключи до <code>Touched</code> функцію, яка виводить <code>Checkpoint reached by NAME</code>, де NAME — ім’я деталі, що торкнулася. Потім створи деталь <code>Foot</code> і симулюй два дотики.', 'Создай деталь <code>Checkpoint</code>. Подключи к <code>Touched</code> функцию, которая выводит <code>Checkpoint reached by NAME</code>, где NAME — имя коснувшейся детали. Затем создай деталь <code>Foot</code> и смоделируй два касания.', 'Create a part <code>Checkpoint</code>. Connect a function to <code>Touched</code> that prints <code>Checkpoint reached by NAME</code>, where NAME is the touching part’s name. Then create a part <code>Foot</code> and simulate two touches.'),
        how: [L('<code>checkpoint.Touched:Connect(function(hit) … end)</code>', '<code>checkpoint.Touched:Connect(function(hit) … end)</code>', '<code>checkpoint.Touched:Connect(function(hit) … end)</code>'), L('Двічі <code>Simulator.touch(checkpoint, foot)</code>.', 'Дважды <code>Simulator.touch(checkpoint, foot)</code>.', 'Call <code>Simulator.touch(checkpoint, foot)</code> twice.')],
        starter: '',
        solution: 'local checkpoint = Instance.new("Part")\ncheckpoint.Name = "Checkpoint"\ncheckpoint.Parent = workspace\n\ncheckpoint.Touched:Connect(function(hit)\n  print(`Checkpoint reached by {hit.Name}`)\nend)\n\nlocal foot = Instance.new("Part")\nfoot.Name = "Foot"\nSimulator.touch(checkpoint, foot)\nSimulator.touch(checkpoint, foot)',
        hint: L('Вивід двічі: <code>Checkpoint reached by Foot</code>.', 'Вывод дважды: <code>Checkpoint reached by Foot</code>.', 'Printed twice: <code>Checkpoint reached by Foot</code>.'),
        expected: 'Checkpoint reached by Foot\nCheckpoint reached by Foot',
        must: /Touched\s*:\s*Connect/
      },
      quiz: { q: L('Як знайти персонажа за деталлю <code>hit</code>?', 'Как найти персонажа по детали <code>hit</code>?', 'How do you get the character from <code>hit</code>?'), options: ['hit.Character', 'hit.Parent', 'hit:GetPlayer()'], answer: 1, explain: L('Деталь — частина моделі персонажа.', 'Деталь — часть модели персонажа.', 'The part belongs to the character model.') },
      ref: [{ code: 'part.Touched:Connect(function(hit) end)', d: L('подія дотику', 'событие касания', 'touch event') }, { code: 'conn:Disconnect()', d: L('відключити', 'отключить', 'disconnect') }]
    },
    {
      id: 'players', chapter: CH3,
      title: L('Гравці: PlayerAdded', 'Игроки: PlayerAdded', 'Players: PlayerAdded'),
      theory: L(
        `<p>Сервіс <code>Players</code> знає про всіх гравців на сервері:</p>
<pre class="inline-code">local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  print(player.Name .. " joined!")
end)</pre>
<ul><li><code>PlayerAdded</code> — гравець зайшов; <code>PlayerRemoving</code> — виходить (тут зберігають прогрес)</li><li><code>player.Name</code>, <code>player.UserId</code> — ім’я та унікальний номер</li><li><code>player.Character</code> — модель персонажа (з’являється трохи пізніше); подія <code>player.CharacterAdded</code></li><li><code>Players:GetPlayers()</code> — масив усіх гравців</li></ul>
<p>У персонажа є <code>Humanoid</code> — об’єкт, що керує здоров’ям (<code>Health</code>, <code>MaxHealth</code>), швидкістю (<code>WalkSpeed</code>) і стрибком (<code>JumpPower</code>).</p>
<div class="tip">🧪 У симуляторі гравця «запускають» так: <code>Simulator.addPlayer("Alex")</code>.</div>`,
        `<p>Сервис <code>Players</code> знает обо всех игроках на сервере:</p>
<pre class="inline-code">local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  print(player.Name .. " joined!")
end)</pre>
<ul><li><code>PlayerAdded</code> — игрок зашёл; <code>PlayerRemoving</code> — выходит (здесь сохраняют прогресс)</li><li><code>player.Name</code>, <code>player.UserId</code> — имя и уникальный номер</li><li><code>player.Character</code> — модель персонажа (появляется чуть позже); событие <code>player.CharacterAdded</code></li><li><code>Players:GetPlayers()</code> — массив всех игроков</li></ul>
<p>У персонажа есть <code>Humanoid</code> — объект, управляющий здоровьем (<code>Health</code>, <code>MaxHealth</code>), скоростью (<code>WalkSpeed</code>) и прыжком (<code>JumpPower</code>).</p>
<div class="tip">🧪 В симуляторе игрока «запускают» так: <code>Simulator.addPlayer("Alex")</code>.</div>`,
        `<p>The <code>Players</code> service knows every player on the server:</p>
<pre class="inline-code">local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  print(player.Name .. " joined!")
end)</pre>
<ul><li><code>PlayerAdded</code> — a player joined; <code>PlayerRemoving</code> — leaving (where progress is saved)</li><li><code>player.Name</code>, <code>player.UserId</code> — name and unique number</li><li><code>player.Character</code> — the character model (appears a bit later); event <code>player.CharacterAdded</code></li><li><code>Players:GetPlayers()</code> — an array of all players</li></ul>
<p>A character has a <code>Humanoid</code> that controls health (<code>Health</code>, <code>MaxHealth</code>), speed (<code>WalkSpeed</code>) and jumping (<code>JumpPower</code>).</p>
<div class="tip">🧪 In the simulator you add a player with <code>Simulator.addPlayer("Alex")</code>.</div>`),
      why: L(`<p>PlayerAdded — точка, де для кожного гравця створюють усе особисте: статистику, інвентар, завантажують збережений прогрес. Це обов’язкова частина майже кожної гри.</p>`,
        `<p>PlayerAdded — точка, где для каждого игрока создают всё личное: статистику, инвентарь, загружают сохранённый прогресс. Это обязательная часть почти каждой игры.</p>`,
        `<p>PlayerAdded is where every player’s personal stuff is created: stats, inventory, loading saved progress. Nearly every game needs it.</p>`),
      mistakes: L(`<ul><li>Звертатися до <code>player.Character</code> одразу в PlayerAdded — персонаж може ще не з’явитися. Використовуй <code>CharacterAdded</code>.</li><li>Підключити PlayerAdded після того, як гравці вже зайшли (у Studio-тестах) — пропустиш їх.</li></ul>`,
        `<ul><li>Обращаться к <code>player.Character</code> сразу в PlayerAdded — персонаж может ещё не появиться. Используй <code>CharacterAdded</code>.</li><li>Подключить PlayerAdded после того, как игроки уже зашли (в Studio-тестах) — пропустишь их.</li></ul>`,
        `<ul><li>Reading <code>player.Character</code> right in PlayerAdded — the character may not exist yet. Use <code>CharacterAdded</code>.</li><li>Connecting PlayerAdded after players have joined (in Studio tests) — you miss them.</li></ul>`),
      examples: [
        { title: 'PlayerAdded', code: 'local Players = game:GetService("Players")\nPlayers.PlayerAdded:Connect(function(player)\n  print(`Welcome, {player.Name}! (id {player.UserId})`)\nend)\nSimulator.addPlayer("Alex")\nSimulator.addPlayer("Ira")\nprint(#Players:GetPlayers(), "players online")', note: L('Привітання кожного гравця.', 'Приветствие каждого игрока.', 'Greeting every player.') },
        { title: 'Humanoid', code: 'local Players = game:GetService("Players")\nPlayers.PlayerAdded:Connect(function(player)\n  player.CharacterAdded:Connect(function(character)\n    local hum = character:FindFirstChild("Humanoid")\n    hum.WalkSpeed = 24\n    print(player.Name, "speed:", hum.WalkSpeed, "hp:", hum.Health)\n  end)\nend)\nSimulator.addPlayer("Max")', note: L('Швидший персонаж через CharacterAdded.', 'Более быстрый персонаж через CharacterAdded.', 'A faster character via CharacterAdded.') },
        { title: 'PlayerRemoving', code: 'local Players = game:GetService("Players")\nPlayers.PlayerRemoving:Connect(function(player)\n  print(player.Name .. " left — saving progress...")\nend)\nlocal p = Simulator.addPlayer("Kate")\nSimulator.removePlayer(p)', note: L('Тут зберігають дані.', 'Здесь сохраняют данные.', 'This is where data is saved.') }
      ],
      task: {
        text: L('Підключи <code>PlayerAdded</code>: для кожного гравця виведи <code>NAME joined</code>, а в його персонажа (через <code>CharacterAdded</code>) встанови <code>JumpPower = 100</code> і виведи <code>NAME jump: 100</code>. Додай гравців <code>Alex</code> і <code>Ira</code>.', 'Подключи <code>PlayerAdded</code>: для каждого игрока выведи <code>NAME joined</code>, а его персонажу (через <code>CharacterAdded</code>) установи <code>JumpPower = 100</code> и выведи <code>NAME jump: 100</code>. Добавь игроков <code>Alex</code> и <code>Ira</code>.', 'Connect <code>PlayerAdded</code>: for each player print <code>NAME joined</code>, and on their character (via <code>CharacterAdded</code>) set <code>JumpPower = 100</code> and print <code>NAME jump: 100</code>. Add players <code>Alex</code> and <code>Ira</code>.'),
        how: [L('Усередині PlayerAdded — <code>player.CharacterAdded:Connect(function(character) … end)</code>.', 'Внутри PlayerAdded — <code>player.CharacterAdded:Connect(function(character) … end)</code>.', 'Inside PlayerAdded: <code>player.CharacterAdded:Connect(function(character) … end)</code>.'), L('<code>character:FindFirstChild("Humanoid").JumpPower = 100</code>', '<code>character:FindFirstChild("Humanoid").JumpPower = 100</code>', '<code>character:FindFirstChild("Humanoid").JumpPower = 100</code>')],
        starter: 'local Players = game:GetService("Players")\n',
        solution: 'local Players = game:GetService("Players")\n\nPlayers.PlayerAdded:Connect(function(player)\n  print(`{player.Name} joined`)\n  player.CharacterAdded:Connect(function(character)\n    local hum = character:FindFirstChild("Humanoid")\n    hum.JumpPower = 100\n    print(`{player.Name} jump: {hum.JumpPower}`)\n  end)\nend)\n\nSimulator.addPlayer("Alex")\nSimulator.addPlayer("Ira")',
        hint: L('Порядок: Alex joined, Alex jump: 100, Ira joined, Ira jump: 100.', 'Порядок: Alex joined, Alex jump: 100, Ira joined, Ira jump: 100.', 'Order: Alex joined, Alex jump: 100, Ira joined, Ira jump: 100.'),
        expected: 'Alex joined\nAlex jump: 100\nIra joined\nIra jump: 100',
        must: /PlayerAdded[\s\S]*CharacterAdded/
      },
      quiz: { q: L('Де краще зберігати прогрес гравця?', 'Где лучше сохранять прогресс игрока?', 'Where should player progress be saved?'), options: ['PlayerAdded', 'PlayerRemoving', 'Touched'], answer: 1, explain: L('Коли гравець виходить.', 'Когда игрок выходит.', 'When the player leaves.') },
      ref: [{ code: 'Players.PlayerAdded:Connect(fn)', d: L('гравець зайшов', 'игрок зашёл', 'player joined') }, { code: 'player.CharacterAdded', d: L('з’явився персонаж', 'появился персонаж', 'character spawned') }, { code: 'Humanoid.Health/WalkSpeed', d: L('здоров’я, швидкість', 'здоровье, скорость', 'health, speed') }]
    },
    {
      id: 'leaderstats', chapter: CH3,
      title: L('Таблиця лідерів: leaderstats', 'Таблица лидеров: leaderstats', 'Leaderboard: leaderstats'),
      theory: L(
        `<p>Щоб у правому верхньому куті з’явилася таблиця з монетами чи очками, Roblox використовує домовленість <b>leaderstats</b>:</p>
<pre class="inline-code">Players.PlayerAdded:Connect(function(player)
  local stats = Instance.new("Folder")
  stats.Name = "leaderstats"     -- саме так, малими літерами!
  stats.Parent = player

  local coins = Instance.new("IntValue")
  coins.Name = "Coins"
  coins.Value = 0
  coins.Parent = stats
end)</pre>
<p>Кожне значення в папці стає колонкою таблиці. Типи значень: <code>IntValue</code> (ціле), <code>NumberValue</code> (дробове), <code>StringValue</code>, <code>BoolValue</code>.</p>
<p>Змінити значення: <code>player.leaderstats.Coins.Value += 10</code> — таблиця оновиться автоматично в усіх гравців.</p>`,
        `<p>Чтобы в правом верхнем углу появилась таблица с монетами или очками, Roblox использует договорённость <b>leaderstats</b>:</p>
<pre class="inline-code">Players.PlayerAdded:Connect(function(player)
  local stats = Instance.new("Folder")
  stats.Name = "leaderstats"     -- именно так, маленькими буквами!
  stats.Parent = player

  local coins = Instance.new("IntValue")
  coins.Name = "Coins"
  coins.Value = 0
  coins.Parent = stats
end)</pre>
<p>Каждое значение в папке становится колонкой таблицы. Типы значений: <code>IntValue</code> (целое), <code>NumberValue</code> (дробное), <code>StringValue</code>, <code>BoolValue</code>.</p>
<p>Изменить значение: <code>player.leaderstats.Coins.Value += 10</code> — таблица обновится автоматически у всех игроков.</p>`,
        `<p>To show a coins or points table in the top-right corner, Roblox uses the <b>leaderstats</b> convention:</p>
<pre class="inline-code">Players.PlayerAdded:Connect(function(player)
  local stats = Instance.new("Folder")
  stats.Name = "leaderstats"     -- exactly this, lowercase!
  stats.Parent = player

  local coins = Instance.new("IntValue")
  coins.Name = "Coins"
  coins.Value = 0
  coins.Parent = stats
end)</pre>
<p>Each value in the folder becomes a column. Value types: <code>IntValue</code> (integer), <code>NumberValue</code> (decimal), <code>StringValue</code>, <code>BoolValue</code>.</p>
<p>Change a value with <code>player.leaderstats.Coins.Value += 10</code> — the table updates for everyone automatically.</p>`),
      why: L(`<p>Чому значення зберігають в об’єктах <code>IntValue</code>, а не просто в змінних? Об’єкти автоматично синхронізуються між сервером і клієнтами та мають подію <code>Changed</code>. Так інтерфейс і таблиця лідерів завжди показують актуальні числа.</p>`,
        `<p>Почему значения хранят в объектах <code>IntValue</code>, а не просто в переменных? Объекты автоматически синхронизируются между сервером и клиентами и имеют событие <code>Changed</code>. Так интерфейс и таблица лидеров всегда показывают актуальные числа.</p>`,
        `<p>Why store values in <code>IntValue</code> objects rather than variables? Objects sync automatically between server and clients and have a <code>Changed</code> event, so the UI and leaderboard always show current numbers.</p>`),
      mistakes: L(`<ul><li><code>Leaderstats</code> з великої літери — таблиця не з’явиться.</li><li><code>coins += 10</code> замість <code>coins.Value += 10</code> — змінюєш змінну, а не значення об’єкта.</li></ul>`,
        `<ul><li><code>Leaderstats</code> с большой буквы — таблица не появится.</li><li><code>coins += 10</code> вместо <code>coins.Value += 10</code> — меняешь переменную, а не значение объекта.</li></ul>`,
        `<ul><li><code>Leaderstats</code> capitalised — the table won’t appear.</li><li><code>coins += 10</code> instead of <code>coins.Value += 10</code> — you change the variable, not the object’s value.</li></ul>`),
      examples: [
        { title: 'leaderstats', code: 'local Players = game:GetService("Players")\nPlayers.PlayerAdded:Connect(function(player)\n  local stats = Instance.new("Folder")\n  stats.Name = "leaderstats"\n  stats.Parent = player\n  local coins = Instance.new("IntValue")\n  coins.Name = "Coins"\n  coins.Parent = stats\nend)\nlocal p = Simulator.addPlayer("Alex")\np.leaderstats.Coins.Value += 25\nprint(p.Name, p.leaderstats.Coins.Value)', note: L('Монети зберігаються в IntValue.', 'Монеты хранятся в IntValue.', 'Coins live in an IntValue.') },
        { title: L('Кілька колонок', 'Несколько колонок', 'Several columns'), code: 'local Players = game:GetService("Players")\nPlayers.PlayerAdded:Connect(function(player)\n  local stats = Instance.new("Folder")\n  stats.Name = "leaderstats"\n  stats.Parent = player\n  for _, name in ipairs({"Coins", "Kills", "Level"}) do\n    local v = Instance.new("IntValue")\n    v.Name = name\n    v.Parent = stats\n  end\n  stats.Level.Value = 1\nend)\nlocal p = Simulator.addPlayer("Ira")\nfor _, v in ipairs(p.leaderstats:GetChildren()) do\n  print(v.Name, v.Value)\nend', note: L('Три колонки таблиці.', 'Три колонки таблицы.', 'Three leaderboard columns.') },
        { title: 'Changed', code: 'local v = Instance.new("IntValue")\nv.Changed:Connect(function()\n  print("New value:", v.Value)\nend)\nv.Value = 10\nv.Value = 20', note: L('Реакція на зміну значення.', 'Реакция на изменение значения.', 'Reacting to value changes.') }
      ],
      task: {
        text: L('Створи leaderstats з двома значеннями: <code>Coins</code> (стартово 50) і <code>Gems</code> (стартово 0). Додай гравця <code>Alex</code>, дай йому +30 монет і +2 кристали та виведи <code>Alex: 80 coins, 2 gems</code>.', 'Создай leaderstats с двумя значениями: <code>Coins</code> (стартово 50) и <code>Gems</code> (стартово 0). Добавь игрока <code>Alex</code>, дай ему +30 монет и +2 кристалла и выведи <code>Alex: 80 coins, 2 gems</code>.', 'Create leaderstats with two values: <code>Coins</code> (starting at 50) and <code>Gems</code> (starting at 0). Add player <code>Alex</code>, give them +30 coins and +2 gems, and print <code>Alex: 80 coins, 2 gems</code>.'),
        how: [L('Папка <code>leaderstats</code> + два <code>IntValue</code>.', 'Папка <code>leaderstats</code> + два <code>IntValue</code>.', 'A <code>leaderstats</code> folder + two <code>IntValue</code>s.'), L('<code>local p = Simulator.addPlayer("Alex")</code>, далі <code>p.leaderstats.Coins.Value += 30</code>.', '<code>local p = Simulator.addPlayer("Alex")</code>, далее <code>p.leaderstats.Coins.Value += 30</code>.', '<code>local p = Simulator.addPlayer("Alex")</code>, then <code>p.leaderstats.Coins.Value += 30</code>.')],
        starter: 'local Players = game:GetService("Players")\n',
        solution: 'local Players = game:GetService("Players")\n\nPlayers.PlayerAdded:Connect(function(player)\n  local stats = Instance.new("Folder")\n  stats.Name = "leaderstats"\n  stats.Parent = player\n\n  local coins = Instance.new("IntValue")\n  coins.Name = "Coins"\n  coins.Value = 50\n  coins.Parent = stats\n\n  local gems = Instance.new("IntValue")\n  gems.Name = "Gems"\n  gems.Value = 0\n  gems.Parent = stats\nend)\n\nlocal p = Simulator.addPlayer("Alex")\np.leaderstats.Coins.Value += 30\np.leaderstats.Gems.Value += 2\nprint(`{p.Name}: {p.leaderstats.Coins.Value} coins, {p.leaderstats.Gems.Value} gems`)',
        hint: L('Назва папки — рівно <code>leaderstats</code>.', 'Название папки — ровно <code>leaderstats</code>.', 'The folder name is exactly <code>leaderstats</code>.'),
        expected: 'Alex: 80 coins, 2 gems',
        must: /["']leaderstats["']/
      },
      quiz: { q: L('Як правильно додати 10 монет?', 'Как правильно добавить 10 монет?', 'How do you correctly add 10 coins?'), options: ['coins += 10', 'coins.Value += 10', 'coins:Add(10)'], answer: 1, explain: L('Змінюємо властивість Value.', 'Меняем свойство Value.', 'Change the Value property.') },
      ref: [{ code: 'Folder "leaderstats" + IntValue', d: L('таблиця лідерів', 'таблица лидеров', 'leaderboard') }, { code: 'value.Value += n', d: L('змінити значення', 'изменить значение', 'change a value') }]
    }
  ]);
})();
