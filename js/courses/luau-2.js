// Roblox (Luau) — частина 2: взаємодія, клієнт-сервер, збереження, ефекти, інтерфейс, проєкти.
(function () {
  const L = Codry.L;
  const CH4 = L('Взаємодія та ігрова логіка', 'Взаимодействие и игровая логика', 'Interaction and game logic');
  const CH5 = L('Клієнт, сервер і збереження', 'Клиент, сервер и сохранение', 'Client, server and saving');
  const CH6 = L('Анімації та інтерфейс', 'Анимации и интерфейс', 'Animation and UI');
  const CH7 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');

  Codry.steps('luau', [
    {
      id: 'click', chapter: CH4,
      title: L('Кліки: ClickDetector', 'Клики: ClickDetector', 'Clicks: ClickDetector'),
      theory: L(
        `<p>Щоб гравець міг <b>клацнути</b> по деталі у світі (кнопка, скриня, двері), до неї додають об’єкт <code>ClickDetector</code>:</p>
<pre class="inline-code">local detector = Instance.new("ClickDetector")
detector.Parent = button

detector.MouseClick:Connect(function(player)
  print(player.Name .. " clicked!")
end)</pre>
<ul><li>Подія <code>MouseClick</code> одразу передає <b>гравця</b>, який клацнув, — не треба шукати його через персонажа</li><li><code>MaxActivationDistance</code> — з якої відстані можна клацнути (типово 32)</li><li>Схожий об’єкт <code>ProximityPrompt</code> показує підказку «Натисни E» поруч із предметом (подія <code>Triggered</code>)</li></ul>
<div class="tip">🧪 У симуляторі клік: <code>Simulator.click(detector, player)</code>.</div>`,
        `<p>Чтобы игрок мог <b>кликнуть</b> по детали в мире (кнопка, сундук, двери), к ней добавляют объект <code>ClickDetector</code>:</p>
<pre class="inline-code">local detector = Instance.new("ClickDetector")
detector.Parent = button

detector.MouseClick:Connect(function(player)
  print(player.Name .. " clicked!")
end)</pre>
<ul><li>Событие <code>MouseClick</code> сразу передаёт <b>игрока</b>, который кликнул, — не нужно искать его через персонажа</li><li><code>MaxActivationDistance</code> — с какого расстояния можно кликнуть (по умолчанию 32)</li><li>Похожий объект <code>ProximityPrompt</code> показывает подсказку «Нажми E» рядом с предметом (событие <code>Triggered</code>)</li></ul>
<div class="tip">🧪 В симуляторе клик: <code>Simulator.click(detector, player)</code>.</div>`,
        `<p>To let a player <b>click</b> a part in the world (a button, chest, door), add a <code>ClickDetector</code> to it:</p>
<pre class="inline-code">local detector = Instance.new("ClickDetector")
detector.Parent = button

detector.MouseClick:Connect(function(player)
  print(player.Name .. " clicked!")
end)</pre>
<ul><li><code>MouseClick</code> passes the <b>player</b> who clicked — no need to find them via the character</li><li><code>MaxActivationDistance</code> — how far away you can click from (default 32)</li><li>The similar <code>ProximityPrompt</code> shows a “Press E” hint near an object (event <code>Triggered</code>)</li></ul>
<div class="tip">🧪 In the simulator: <code>Simulator.click(detector, player)</code>.</div>`),
      why: L(`<p>Чому клік обробляється на сервері? Бо саме сервер вирішує, чи відчинити двері для всіх і чи видати нагороду. Якби це робив клієнт, двері відчинилися б лише в одного гравця, а нагороду міг би «накрутити» читер.</p>`,
        `<p>Почему клик обрабатывается на сервере? Потому что именно сервер решает, открыть ли двери для всех и выдать ли награду. Если бы это делал клиент, двери открылись бы только у одного игрока, а награду мог бы «накрутить» читер.</p>`,
        `<p>Why handle the click on the server? Because the server decides whether to open the door for everyone and whether to give a reward. If the client did it, the door would open for one player only, and cheaters could farm rewards.</p>`),
      mistakes: L(`<ul><li>Підключати <code>Touched</code> замість <code>MouseClick</code> для кнопки — спрацює, коли гравець просто пройде повз.</li><li>Забути покласти ClickDetector <b>усередину</b> деталі — клацати не буде по чому.</li></ul>`,
        `<ul><li>Подключать <code>Touched</code> вместо <code>MouseClick</code> для кнопки — сработает, когда игрок просто пройдёт мимо.</li><li>Забыть положить ClickDetector <b>внутрь</b> детали — кликать будет не по чему.</li></ul>`,
        `<ul><li>Using <code>Touched</code> instead of <code>MouseClick</code> for a button — it fires when a player merely walks past.</li><li>Not putting the ClickDetector <b>inside</b> the part — there’s nothing to click.</li></ul>`),
      examples: [
        { title: L('Кнопка', 'Кнопка', 'Button'), code: 'local button = Instance.new("Part", workspace)\nbutton.Name = "RedButton"\nlocal detector = Instance.new("ClickDetector", button)\ndetector.MouseClick:Connect(function(player)\n  print(`{player.Name} pressed {button.Name}`)\nend)\nlocal alex = Simulator.addPlayer("Alex")\nSimulator.click(detector, alex)', note: L('Подія передає гравця.', 'Событие передаёт игрока.', 'The event passes the player.') },
        { title: L('Двері', 'Двери', 'Door'), code: 'local door = Instance.new("Part", workspace)\ndoor.Name = "Door"\nlocal open = false\nlocal cd = Instance.new("ClickDetector", door)\ncd.MouseClick:Connect(function()\n  open = not open\n  door.Transparency = open and 0.8 or 0\n  door.CanCollide = not open\n  print("Door open:", open)\nend)\nlocal p = Simulator.addPlayer("Ira")\nSimulator.click(cd, p)\nSimulator.click(cd, p)', note: L('<code>умова and A or B</code> — короткий вибір значення.', '<code>условие and A or B</code> — короткий выбор значения.', '<code>cond and A or B</code> picks a value in one line.') },
        { title: L('Лічильник кліків', 'Счётчик кликов', 'Click counter'), code: 'local clicks = {}\nlocal orb = Instance.new("Part", workspace)\nlocal cd = Instance.new("ClickDetector", orb)\ncd.MouseClick:Connect(function(player)\n  clicks[player.Name] = (clicks[player.Name] or 0) + 1\n  print(player.Name, clicks[player.Name])\nend)\nlocal a = Simulator.addPlayer("Alex")\nlocal b = Simulator.addPlayer("Max")\nSimulator.click(cd, a)\nSimulator.click(cd, b)\nSimulator.click(cd, a)', note: L('Окремий лічильник для кожного гравця.', 'Отдельный счётчик для каждого игрока.', 'A separate counter per player.') }
      ],
      task: {
        text: L('Створи деталь <code>Chest</code> з <code>ClickDetector</code>. При кліку гравець отримує 10 монет (таблиця <code>coins[player.Name]</code>) і бачить <code>NAME opened the chest: N coins</code>. Додай гравця <code>Alex</code> і клацни двічі.', 'Создай деталь <code>Chest</code> с <code>ClickDetector</code>. При клике игрок получает 10 монет (таблица <code>coins[player.Name]</code>) и видит <code>NAME opened the chest: N coins</code>. Добавь игрока <code>Alex</code> и кликни дважды.', 'Create a part <code>Chest</code> with a <code>ClickDetector</code>. On click the player gets 10 coins (table <code>coins[player.Name]</code>) and sees <code>NAME opened the chest: N coins</code>. Add player <code>Alex</code> and click twice.'),
        how: [L('<code>local coins = {}</code> поза обробником.', '<code>local coins = {}</code> вне обработчика.', '<code>local coins = {}</code> outside the handler.'), L('<code>coins[player.Name] = (coins[player.Name] or 0) + 10</code>', '<code>coins[player.Name] = (coins[player.Name] or 0) + 10</code>', '<code>coins[player.Name] = (coins[player.Name] or 0) + 10</code>')],
        starter: '',
        solution: 'local coins = {}\nlocal chest = Instance.new("Part")\nchest.Name = "Chest"\nchest.Parent = workspace\n\nlocal detector = Instance.new("ClickDetector")\ndetector.Parent = chest\n\ndetector.MouseClick:Connect(function(player)\n  coins[player.Name] = (coins[player.Name] or 0) + 10\n  print(`{player.Name} opened the chest: {coins[player.Name]} coins`)\nend)\n\nlocal alex = Simulator.addPlayer("Alex")\nSimulator.click(detector, alex)\nSimulator.click(detector, alex)',
        hint: L('Другий клік: 20 coins.', 'Второй клик: 20 coins.', 'Second click: 20 coins.'),
        expected: 'Alex opened the chest: 10 coins\nAlex opened the chest: 20 coins',
        must: /ClickDetector[\s\S]*MouseClick/
      },
      quiz: { q: L('Що передає подія <code>MouseClick</code>?', 'Что передаёт событие <code>MouseClick</code>?', 'What does <code>MouseClick</code> pass?'), options: [L('деталь, по якій клацнули', 'деталь, по которой кликнули', 'the clicked part'), L('гравця, який клацнув', 'игрока, который кликнул', 'the player who clicked'), L('координати миші', 'координаты мыши', 'mouse coordinates')], answer: 1, explain: L('Саме тому кліки зручні.', 'Именно поэтому клики удобны.', 'That’s why clicks are convenient.') },
      ref: [{ code: 'Instance.new("ClickDetector", part)', d: L('зробити клікабельним', 'сделать кликабельным', 'make clickable') }, { code: 'detector.MouseClick:Connect(function(player) end)', d: L('обробник кліку', 'обработчик клика', 'click handler') }]
    },
    {
      id: 'debounce', chapter: CH4,
      title: L('Debounce і task.wait', 'Debounce и task.wait', 'Debounce and task.wait'),
      theory: L(
        `<p><code>task.wait(секунди)</code> призупиняє скрипт на певний час. З ним роблять таймери, відлік і перезарядку:</p>
<pre class="inline-code">for i = 3, 1, -1 do
  print(i)
  task.wait(1)
end
print("GO!")</pre>
<p>Подія <code>Touched</code> спрацьовує <b>десятки разів</b>: кожна нога, рука й тулуб — окремий дотик. Щоб нагорода видавалася раз, роблять <b>debounce</b> («антидребезг»):</p>
<pre class="inline-code">local busy = false
pad.Touched:Connect(function(hit)
  if busy then return end   -- уже обробляємо — ігноруємо
  busy = true
  print("Boost!")
  task.wait(2)              -- перезарядка
  busy = false
end)</pre>
<p>Кожен обробник події в Roblox працює в окремому <b>потоці</b>: поки один чекає на <code>task.wait</code>, інші дотики приходять і бачать <code>busy = true</code>.</p>
<p><code>task.delay(t, fn)</code> — виклич функцію через t секунд, не зупиняючи скрипт; <code>time()</code> — скільки секунд іде гра.</p>`,
        `<p><code>task.wait(секунды)</code> приостанавливает скрипт на время. С ним делают таймеры, отсчёт и перезарядку:</p>
<pre class="inline-code">for i = 3, 1, -1 do
  print(i)
  task.wait(1)
end
print("GO!")</pre>
<p>Событие <code>Touched</code> срабатывает <b>десятки раз</b>: каждая нога, рука и торс — отдельное касание. Чтобы награда выдавалась один раз, делают <b>debounce</b> («антидребезг»):</p>
<pre class="inline-code">local busy = false
pad.Touched:Connect(function(hit)
  if busy then return end   -- уже обрабатываем — игнорируем
  busy = true
  print("Boost!")
  task.wait(2)              -- перезарядка
  busy = false
end)</pre>
<p>Каждый обработчик события в Roblox работает в отдельном <b>потоке</b>: пока один ждёт на <code>task.wait</code>, другие касания приходят и видят <code>busy = true</code>.</p>
<p><code>task.delay(t, fn)</code> — вызови функцию через t секунд, не останавливая скрипт; <code>time()</code> — сколько секунд идёт игра.</p>`,
        `<p><code>task.wait(seconds)</code> pauses the script. It’s used for timers, countdowns and cooldowns:</p>
<pre class="inline-code">for i = 3, 1, -1 do
  print(i)
  task.wait(1)
end
print("GO!")</pre>
<p><code>Touched</code> fires <b>dozens of times</b>: every foot, arm and torso is a separate touch. To give a reward once, use a <b>debounce</b>:</p>
<pre class="inline-code">local busy = false
pad.Touched:Connect(function(hit)
  if busy then return end   -- already handling — ignore
  busy = true
  print("Boost!")
  task.wait(2)              -- cooldown
  busy = false
end)</pre>
<p>Each event handler runs in its own <b>thread</b>: while one waits in <code>task.wait</code>, other touches arrive and see <code>busy = true</code>.</p>
<p><code>task.delay(t, fn)</code> calls a function after t seconds without pausing; <code>time()</code> is how long the game has been running.</p>`),
      why: L(`<p>Без debounce одна монета дасть +15 замість +1, а пастка вб’є гравця кілька разів поспіль. Це найчастіший баг у перших іграх Roblox. Шаблон «перевір прапорець → постав → почекай → зніми» запам’ятай назавжди.</p>`,
        `<p>Без debounce одна монета даст +15 вместо +1, а ловушка убьёт игрока несколько раз подряд. Это самый частый баг в первых играх Roblox. Шаблон «проверь флаг → поставь → подожди → сними» запомни навсегда.</p>`,
        `<p>Without a debounce one coin gives +15 instead of +1, and a trap kills a player several times in a row. It’s the most common bug in first Roblox games. Memorise the pattern “check flag → set → wait → clear”.</p>`),
      mistakes: L(`<ul><li>Забути <code>busy = false</code> у кінці — спрацює лише раз за всю гру.</li><li>Застарілі <code>wait()</code> і <code>spawn()</code> — у нових іграх використовуй <code>task.wait</code> і <code>task.spawn</code>.</li><li>Один спільний прапорець для всіх гравців, коли потрібна окрема перезарядка кожному (див. приклад «для кожного»).</li></ul>`,
        `<ul><li>Забыть <code>busy = false</code> в конце — сработает только раз за всю игру.</li><li>Устаревшие <code>wait()</code> и <code>spawn()</code> — в новых играх используй <code>task.wait</code> и <code>task.spawn</code>.</li><li>Один общий флаг для всех игроков, когда нужна отдельная перезарядка каждому (см. пример «для каждого»).</li></ul>`,
        `<ul><li>Forgetting <code>busy = false</code> at the end — it fires once per game.</li><li>Legacy <code>wait()</code> and <code>spawn()</code> — use <code>task.wait</code> and <code>task.spawn</code> in new games.</li><li>One shared flag for everyone when each player needs their own cooldown (see the “per player” example).</li></ul>`),
      examples: [
        { title: L('Відлік', 'Отсчёт', 'Countdown'), code: 'for i = 3, 1, -1 do\n  print(i)\n  task.wait(1)\nend\nprint("GO!", "time:", time())', note: L('Минуло 3 секунди гри.', 'Прошло 3 секунды игры.', '3 seconds of game time passed.') },
        { title: 'Debounce', code: 'local pad = Instance.new("Part", workspace)\nlocal busy = false\npad.Touched:Connect(function(hit)\n  if busy then return end\n  busy = true\n  print("Boost at", time())\n  task.wait(2)\n  busy = false\nend)\nlocal foot = Instance.new("Part")\nSimulator.touch(pad, foot)\nSimulator.touch(pad, foot) -- ігнорується\ntask.wait(3)\nSimulator.touch(pad, foot)', note: L('Другий дотик під час перезарядки ігнорується.', 'Второе касание во время перезарядки игнорируется.', 'The second touch during cooldown is ignored.') },
        { title: L('Для кожного', 'Для каждого', 'Per player'), code: 'local Players = game:GetService("Players")\nlocal cooldown = {}\nlocal pad = Instance.new("Part", workspace)\npad.Touched:Connect(function(hit)\n  local player = Players:GetPlayerFromCharacter(hit.Parent)\n  if not player or cooldown[player] then return end\n  cooldown[player] = true\n  print(player.Name .. " got a reward")\n  task.wait(5)\n  cooldown[player] = nil\nend)\nlocal a = Simulator.addPlayer("Alex")\nlocal b = Simulator.addPlayer("Ira")\nSimulator.touch(pad, a.Character.Head)\nSimulator.touch(pad, a.Character.HumanoidRootPart)\nSimulator.touch(pad, b.Character.Head)', note: L('Перезарядка окремо для кожного гравця.', 'Перезарядка отдельно для каждого игрока.', 'A separate cooldown per player.') },
        { title: 'task.delay', code: 'print("Bomb planted")\ntask.delay(3, function()\n  print("BOOM at", time())\nend)\nprint("Run!")', note: L('Скрипт не чекає — функція спрацює пізніше.', 'Скрипт не ждёт — функция сработает позже.', 'The script doesn’t wait; the function runs later.') }
      ],
      task: {
        text: L('Зроби <code>SpeedPad</code> з debounce і перезарядкою 3 секунди: при дотику виводь <code>Speed boost!</code>. Симулюй: дотик, ще один дотик одразу, <code>task.wait(4)</code>, ще один дотик. Має бути рівно 2 повідомлення.', 'Сделай <code>SpeedPad</code> с debounce и перезарядкой 3 секунды: при касании выводи <code>Speed boost!</code>. Смоделируй: касание, ещё одно касание сразу, <code>task.wait(4)</code>, ещё одно касание. Должно быть ровно 2 сообщения.', 'Make a <code>SpeedPad</code> with a debounce and a 3-second cooldown: on touch print <code>Speed boost!</code>. Simulate: a touch, another touch immediately, <code>task.wait(4)</code>, another touch. There must be exactly 2 messages.'),
        how: [L('<code>local busy = false</code>, у обробнику — <code>if busy then return end</code>.', '<code>local busy = false</code>, в обработчике — <code>if busy then return end</code>.', '<code>local busy = false</code>; in the handler <code>if busy then return end</code>.'), L('Після print — <code>task.wait(3)</code> і <code>busy = false</code>.', 'После print — <code>task.wait(3)</code> и <code>busy = false</code>.', 'After print: <code>task.wait(3)</code> and <code>busy = false</code>.')],
        starter: 'local pad = Instance.new("Part")\npad.Name = "SpeedPad"\npad.Parent = workspace\nlocal foot = Instance.new("Part")\n',
        solution: 'local pad = Instance.new("Part")\npad.Name = "SpeedPad"\npad.Parent = workspace\nlocal foot = Instance.new("Part")\n\nlocal busy = false\npad.Touched:Connect(function(hit)\n  if busy then return end\n  busy = true\n  print("Speed boost!")\n  task.wait(3)\n  busy = false\nend)\n\nSimulator.touch(pad, foot)\nSimulator.touch(pad, foot)\ntask.wait(4)\nSimulator.touch(pad, foot)',
        hint: L('Без debounce було б 3 повідомлення.', 'Без debounce было бы 3 сообщения.', 'Without a debounce there would be 3.'),
        expected: 'Speed boost!\nSpeed boost!',
        must: /task\.wait\s*\(\s*3\s*\)/
      },
      quiz: { q: L('Навіщо debounce у <code>Touched</code>?', 'Зачем debounce в <code>Touched</code>?', 'Why debounce <code>Touched</code>?'), options: [L('щоб пришвидшити гру', 'чтобы ускорить игру', 'to speed up the game'), L('подія спрацьовує багато разів поспіль', 'событие срабатывает много раз подряд', 'the event fires many times in a row'), L('інакше подія не працює', 'иначе событие не работает', 'otherwise it doesn’t work')], answer: 1, explain: L('Кожна частина тіла — окремий дотик.', 'Каждая часть тела — отдельное касание.', 'Each body part is a separate touch.') },
      ref: [{ code: 'task.wait(s)', d: L('пауза', 'пауза', 'pause') }, { code: 'task.delay(s, fn)', d: L('виклик пізніше', 'вызов позже', 'call later') }, { code: 'if busy then return end', d: 'debounce' }]
    },
    {
      id: 'humanoid', chapter: CH4,
      title: L('Здоров’я, пастки й смерть', 'Здоровье, ловушки и смерть', 'Health, traps and death'),
      theory: L(
        `<p>У кожного персонажа є <code>Humanoid</code>. Через нього роблять шкоду, лікування й смерть:</p>
<ul><li><code>humanoid.Health</code> / <code>MaxHealth</code> — здоров’я (типово 100)</li><li><code>humanoid:TakeDamage(25)</code> — завдати шкоди (враховує щит ForceField)</li><li><code>humanoid.Health = 0</code> — миттєва смерть</li><li><code>humanoid.Died</code> — подія смерті; <code>HealthChanged</code> — зміна здоров’я</li></ul>
<p>Класична <b>«лава»</b> (kill brick):</p>
<pre class="inline-code">lava.Touched:Connect(function(hit)
  local humanoid = hit.Parent:FindFirstChild("Humanoid")
  if humanoid then
    humanoid.Health = 0
  end
end)</pre>
<p>Перевірка <code>if humanoid</code> обов’язкова: лави може торкнутися будь-яка деталь, а не лише персонаж.</p>`,
        `<p>У каждого персонажа есть <code>Humanoid</code>. Через него делают урон, лечение и смерть:</p>
<ul><li><code>humanoid.Health</code> / <code>MaxHealth</code> — здоровье (по умолчанию 100)</li><li><code>humanoid:TakeDamage(25)</code> — нанести урон (учитывает щит ForceField)</li><li><code>humanoid.Health = 0</code> — мгновенная смерть</li><li><code>humanoid.Died</code> — событие смерти; <code>HealthChanged</code> — изменение здоровья</li></ul>
<p>Классическая <b>«лава»</b> (kill brick):</p>
<pre class="inline-code">lava.Touched:Connect(function(hit)
  local humanoid = hit.Parent:FindFirstChild("Humanoid")
  if humanoid then
    humanoid.Health = 0
  end
end)</pre>
<p>Проверка <code>if humanoid</code> обязательна: лавы может коснуться любая деталь, а не только персонаж.</p>`,
        `<p>Every character has a <code>Humanoid</code> for damage, healing and death:</p>
<ul><li><code>humanoid.Health</code> / <code>MaxHealth</code> — health (default 100)</li><li><code>humanoid:TakeDamage(25)</code> — deal damage (respects ForceField)</li><li><code>humanoid.Health = 0</code> — instant death</li><li><code>humanoid.Died</code> — death event; <code>HealthChanged</code> — health changed</li></ul>
<p>The classic <b>kill brick</b>:</p>
<pre class="inline-code">lava.Touched:Connect(function(hit)
  local humanoid = hit.Parent:FindFirstChild("Humanoid")
  if humanoid then
    humanoid.Health = 0
  end
end)</pre>
<p>The <code>if humanoid</code> check is required: any part can touch the lava, not only characters.</p>`),
      why: L(`<p>Чому шукаємо Humanoid, а не перевіряємо ім’я деталі? Бо персонажі мають різні частини (R6, R15, аксесуари), а Humanoid є в кожного. Це надійний спосіб відрізнити «живу істоту» від м’яча чи ящика — так само працюють і NPC-вороги.</p>`,
        `<p>Почему ищем Humanoid, а не проверяем имя детали? Потому что у персонажей разные части (R6, R15, аксессуары), а Humanoid есть у каждого. Это надёжный способ отличить «живое существо» от мяча или ящика — так же работают и NPC-враги.</p>`,
        `<p>Why look for a Humanoid instead of checking part names? Characters have different parts (R6, R15, accessories), but every one has a Humanoid. It reliably separates a “living thing” from a ball or crate — NPC enemies work the same way.</p>`),
      mistakes: L(`<ul><li><code>hit.Parent.Humanoid.Health = 0</code> без перевірки — помилка, якщо торкнулася звичайна деталь.</li><li>Шкода без debounce — <code>TakeDamage(10)</code> спрацює 10 разів за мить.</li></ul>`,
        `<ul><li><code>hit.Parent.Humanoid.Health = 0</code> без проверки — ошибка, если коснулась обычная деталь.</li><li>Урон без debounce — <code>TakeDamage(10)</code> сработает 10 раз за миг.</li></ul>`,
        `<ul><li><code>hit.Parent.Humanoid.Health = 0</code> without a check errors when a normal part touches it.</li><li>Damage without a debounce — <code>TakeDamage(10)</code> fires 10 times in an instant.</li></ul>`),
      examples: [
        { title: L('Лава', 'Лава', 'Lava'), code: 'local lava = Instance.new("Part", workspace)\nlava.Name = "Lava"\nlava.Touched:Connect(function(hit)\n  local hum = hit.Parent:FindFirstChild("Humanoid")\n  if hum then\n    hum.Health = 0\n    print(hit.Parent.Name .. " fell into lava")\n  end\nend)\nlocal box = Instance.new("Part", workspace)\nSimulator.touch(lava, box) -- нічого\nlocal p = Simulator.addPlayer("Alex")\nSimulator.touch(lava, p.Character.Head)', note: L('Ящик ігнорується, персонаж — ні.', 'Ящик игнорируется, персонаж — нет.', 'The box is ignored; the character isn’t.') },
        { title: 'TakeDamage', code: 'local p = Simulator.addPlayer("Ira")\nlocal hum = p.Character:FindFirstChild("Humanoid")\nhum.HealthChanged:Connect(function(hp)\n  print("HP:", hp)\nend)\nhum.Died:Connect(function()\n  print(p.Name .. " died!")\nend)\nfor i = 1, 4 do\n  hum:TakeDamage(30)\nend', note: L('Здоров’я не падає нижче 0.', 'Здоровье не падает ниже 0.', 'Health doesn’t drop below 0.') },
        { title: L('Лікування', 'Лечение', 'Healing'), code: 'local p = Simulator.addPlayer("Max")\nlocal hum = p.Character.Humanoid\nhum.Health = 40\nlocal heal = Instance.new("Part", workspace)\nheal.Touched:Connect(function(hit)\n  local h = hit.Parent:FindFirstChild("Humanoid")\n  if h then\n    h.Health = math.min(h.Health + 50, h.MaxHealth)\n    print("Healed to", h.Health)\n  end\nend)\nSimulator.touch(heal, p.Character.Head)\nSimulator.touch(heal, p.Character.Head)', note: L('Не вище MaxHealth.', 'Не выше MaxHealth.', 'Never above MaxHealth.') },
        { title: L('Отрута', 'Яд', 'Poison'), code: 'local p = Simulator.addPlayer("Kate")\nlocal hum = p.Character.Humanoid\nhum.Died:Connect(function() print("Poisoned at", time(), "s") end)\nwhile hum.Health > 0 do\n  hum:TakeDamage(25)\n  task.wait(1)\nend', note: L('Шкода щосекунди.', 'Урон каждую секунду.', 'Damage every second.') }
      ],
      task: {
        text: L('Зроби пастку <code>Spikes</code>: при дотику персонажа вона завдає 40 шкоди (<code>TakeDamage</code>) з debounce 1 с і виводить <code>NAME HP: N</code>. Підключи <code>Died</code> до повідомлення <code>NAME was defeated</code>. Гравець <code>Alex</code> торкається шипів 3 рази з паузою <code>task.wait(2)</code> між дотиками.', 'Сделай ловушку <code>Spikes</code>: при касании персонажа она наносит 40 урона (<code>TakeDamage</code>) с debounce 1 с и выводит <code>NAME HP: N</code>. Подключи <code>Died</code> к сообщению <code>NAME was defeated</code>. Игрок <code>Alex</code> касается шипов 3 раза с паузой <code>task.wait(2)</code> между касаниями.', 'Make a <code>Spikes</code> trap: when a character touches it, deal 40 damage (<code>TakeDamage</code>) with a 1 s debounce and print <code>NAME HP: N</code>. Connect <code>Died</code> to print <code>NAME was defeated</code>. Player <code>Alex</code> touches the spikes 3 times with <code>task.wait(2)</code> between touches.'),
        how: [L('Humanoid — <code>hit.Parent:FindFirstChild("Humanoid")</code>.', 'Humanoid — <code>hit.Parent:FindFirstChild("Humanoid")</code>.', 'Humanoid: <code>hit.Parent:FindFirstChild("Humanoid")</code>.'), L('<code>Died</code> підключи заздалегідь до Humanoid персонажа Alex.', '<code>Died</code> подключи заранее к Humanoid персонажа Alex.', 'Connect <code>Died</code> to Alex’s Humanoid beforehand.'), L('Очікуване HP: 60, 20, 0.', 'Ожидаемое HP: 60, 20, 0.', 'Expected HP: 60, 20, 0.')],
        starter: 'local spikes = Instance.new("Part")\nspikes.Name = "Spikes"\nspikes.Parent = workspace\n',
        solution: 'local spikes = Instance.new("Part")\nspikes.Name = "Spikes"\nspikes.Parent = workspace\n\nlocal busy = false\nspikes.Touched:Connect(function(hit)\n  local hum = hit.Parent:FindFirstChild("Humanoid")\n  if not hum or busy then return end\n  busy = true\n  hum:TakeDamage(40)\n  print(`{hit.Parent.Name} HP: {hum.Health}`)\n  task.wait(1)\n  busy = false\nend)\n\nlocal alex = Simulator.addPlayer("Alex")\nalex.Character.Humanoid.Died:Connect(function()\n  print(`{alex.Name} was defeated`)\nend)\n\nfor i = 1, 3 do\n  Simulator.touch(spikes, alex.Character.Head)\n  task.wait(2)\nend',
        hint: L('Died спрацює одразу, коли HP стане 0 — ще до print з HP.', 'Died сработает сразу, когда HP станет 0 — ещё до print с HP.', 'Died fires the moment HP hits 0 — before the HP print.'),
        expected: 'Alex HP: 60\nAlex HP: 20\nAlex was defeated\nAlex HP: 0',
        must: /^(?=[\s\S]*TakeDamage)(?=[\s\S]*Died)/
      },
      quiz: { q: L('Чому потрібна перевірка <code>if humanoid then</code>?', 'Зачем проверка <code>if humanoid then</code>?', 'Why check <code>if humanoid then</code>?'), options: [L('щоб пришвидшити код', 'чтобы ускорить код', 'to speed things up'), L('пастки може торкнутися не персонаж', 'ловушки может коснуться не персонаж', 'something other than a character may touch it'), L('Humanoid завжди nil', 'Humanoid всегда nil', 'Humanoid is always nil')], answer: 1, explain: L('Інакше буде помилка.', 'Иначе будет ошибка.', 'Otherwise it errors.') },
      ref: [{ code: 'hum:TakeDamage(n)', d: L('шкода', 'урон', 'damage') }, { code: 'hum.Died:Connect(fn)', d: L('смерть', 'смерть', 'death') }, { code: 'hit.Parent:FindFirstChild("Humanoid")', d: L('чи персонаж', 'персонаж ли', 'is it a character') }]
    },
    {
      id: 'loops-world', chapter: CH4,
      title: L('Рухомі платформи та ігрові цикли', 'Движущиеся платформы и игровые циклы', 'Moving platforms and game loops'),
      theory: L(
        `<p>Багато речей у грі відбуваються <b>постійно</b>: платформа їздить туди-сюди, кожні 10 секунд з’являється монета, раунд триває 60 секунд. Це робиться циклом із <code>task.wait</code>:</p>
<pre class="inline-code">while true do
  platform.Position += Vector3.new(0, 0, 10)
  task.wait(2)
  platform.Position -= Vector3.new(0, 0, 10)
  task.wait(2)
end</pre>
<p>Такий нескінченний цикл <b>обов’язково</b> має містити <code>task.wait</code> — інакше гра зависне. А щоб він не блокував решту скрипта, його запускають у окремому потоці: <code>task.spawn(function() … end)</code>.</p>
<p>Для покрокового руху використовують <code>Vector3</code>: додавання зсуває позицію, а <code>(a - b).Magnitude</code> дає відстань між точками.</p>`,
        `<p>Многое в игре происходит <b>постоянно</b>: платформа ездит туда-сюда, каждые 10 секунд появляется монета, раунд длится 60 секунд. Это делается циклом с <code>task.wait</code>:</p>
<pre class="inline-code">while true do
  platform.Position += Vector3.new(0, 0, 10)
  task.wait(2)
  platform.Position -= Vector3.new(0, 0, 10)
  task.wait(2)
end</pre>
<p>Такой бесконечный цикл <b>обязательно</b> должен содержать <code>task.wait</code> — иначе игра зависнет. А чтобы он не блокировал остальной скрипт, его запускают в отдельном потоке: <code>task.spawn(function() … end)</code>.</p>
<p>Для пошагового движения используют <code>Vector3</code>: сложение сдвигает позицию, а <code>(a - b).Magnitude</code> даёт расстояние между точками.</p>`,
        `<p>Many things happen <b>continuously</b>: a platform moves back and forth, a coin spawns every 10 seconds, a round lasts 60 seconds. That’s a loop with <code>task.wait</code>:</p>
<pre class="inline-code">while true do
  platform.Position += Vector3.new(0, 0, 10)
  task.wait(2)
  platform.Position -= Vector3.new(0, 0, 10)
  task.wait(2)
end</pre>
<p>An infinite loop <b>must</b> contain <code>task.wait</code>, or the game freezes. To avoid blocking the rest of the script, run it in its own thread: <code>task.spawn(function() … end)</code>.</p>
<p>Use <code>Vector3</code> for stepwise movement: adding shifts the position, and <code>(a - b).Magnitude</code> is the distance between points.</p>`),
      why: L(`<p>Ігровий цикл — серце будь-якої гри: раунди, хвилі ворогів, зміна дня й ночі. <code>task.spawn</code> дозволяє запустити кілька таких «моторів» одночасно, і вони не заважають один одному.</p>`,
        `<p>Игровой цикл — сердце любой игры: раунды, волны врагов, смена дня и ночи. <code>task.spawn</code> позволяет запустить несколько таких «моторов» одновременно, и они не мешают друг другу.</p>`,
        `<p>The game loop is the heart of every game: rounds, enemy waves, day and night. <code>task.spawn</code> lets several such “engines” run at once without interfering.</p>`),
      mistakes: L(`<ul><li><code>while true do … end</code> без <code>task.wait</code> — Studio зависне.</li><li>Код після нескінченного циклу ніколи не виконається — запускай цикл через <code>task.spawn</code>.</li></ul>`,
        `<ul><li><code>while true do … end</code> без <code>task.wait</code> — Studio зависнет.</li><li>Код после бесконечного цикла никогда не выполнится — запускай цикл через <code>task.spawn</code>.</li></ul>`,
        `<ul><li><code>while true do … end</code> without <code>task.wait</code> freezes Studio.</li><li>Code after an infinite loop never runs — start the loop with <code>task.spawn</code>.</li></ul>`),
      examples: [
        { title: L('Платформа', 'Платформа', 'Platform'), code: 'local platform = Instance.new("Part", workspace)\nplatform.Anchored = true\nplatform.Position = Vector3.new(0, 5, 0)\nfor i = 1, 4 do\n  platform.Position += Vector3.new(0, 0, 5)\n  print(time(), platform.Position)\n  task.wait(1)\nend', note: L('Рух кроками по осі Z.', 'Движение шагами по оси Z.', 'Stepwise motion along Z.') },
        { title: 'task.spawn', code: 'task.spawn(function()\n  for i = 1, 3 do\n    print("[spinner] tick", i)\n    task.wait(1)\n  end\nend)\nprint("Script keeps going!")\ntask.wait(5)\nprint("Done at", time())', note: L('Цикл працює паралельно.', 'Цикл работает параллельно.', 'The loop runs in parallel.') },
        { title: L('Раунди', 'Раунды', 'Rounds'), code: 'local ROUND, INTERMISSION = 30, 10\nfor round = 1, 3 do\n  print(`Intermission... ({INTERMISSION}s)`)\n  task.wait(INTERMISSION)\n  print(`Round {round} started at {time()}s`)\n  task.wait(ROUND)\nend\nprint("Game over at", time())', note: L('Типовий цикл раундів.', 'Типичный цикл раундов.', 'A typical round loop.') },
        { title: L('Відстань', 'Расстояние', 'Distance'), code: 'local player = Vector3.new(0, 0, 0)\nlocal coins = { Vector3.new(3, 0, 4), Vector3.new(10, 0, 0), Vector3.new(1, 0, 1) }\nfor i, pos in ipairs(coins) do\n  local d = (pos - player).Magnitude\n  print(`coin {i}: {math.round(d * 10) / 10}`, d < 5 and "near" or "far")\nend', note: L('Magnitude — довжина вектора.', 'Magnitude — длина вектора.', 'Magnitude is a vector’s length.') }
      ],
      task: {
        text: L('Створи ліфт <code>Elevator</code> на висоті Y = 0. Запусти через <code>task.spawn</code> цикл з 5 кроків: піднімай ліфт на 4 (<code>+= Vector3.new(0, 4, 0)</code>), виводь <code>Floor N: Y</code> і чекай 1 с. Після <code>task.spawn</code> основний скрипт одразу виводить <code>Elevator started</code>.', 'Создай лифт <code>Elevator</code> на высоте Y = 0. Запусти через <code>task.spawn</code> цикл из 5 шагов: поднимай лифт на 4 (<code>+= Vector3.new(0, 4, 0)</code>), выводи <code>Floor N: Y</code> и жди 1 с. После <code>task.spawn</code> основной скрипт сразу выводит <code>Elevator started</code>.', 'Create an <code>Elevator</code> at Y = 0. Use <code>task.spawn</code> to run a 5-step loop: raise it by 4 (<code>+= Vector3.new(0, 4, 0)</code>), print <code>Floor N: Y</code> and wait 1 s. Right after <code>task.spawn</code> the main script prints <code>Elevator started</code>.'),
        how: [L('Перший крок виконується до першого <code>task.wait</code>, тому <code>Floor 1</code> з’явиться раніше за <code>Elevator started</code>.', 'Первый шаг выполняется до первого <code>task.wait</code>, поэтому <code>Floor 1</code> появится раньше <code>Elevator started</code>.', 'The first step runs before the first <code>task.wait</code>, so <code>Floor 1</code> appears before <code>Elevator started</code>.')],
        starter: 'local elevator = Instance.new("Part")\nelevator.Name = "Elevator"\nelevator.Anchored = true\nelevator.Position = Vector3.new(0, 0, 0)\nelevator.Parent = workspace\n',
        solution: 'local elevator = Instance.new("Part")\nelevator.Name = "Elevator"\nelevator.Anchored = true\nelevator.Position = Vector3.new(0, 0, 0)\nelevator.Parent = workspace\n\ntask.spawn(function()\n  for floor = 1, 5 do\n    elevator.Position += Vector3.new(0, 4, 0)\n    print(`Floor {floor}: {elevator.Position.Y}`)\n    task.wait(1)\n  end\nend)\nprint("Elevator started")',
        hint: L('Висоти: 4, 8, 12, 16, 20.', 'Высоты: 4, 8, 12, 16, 20.', 'Heights: 4, 8, 12, 16, 20.'),
        expected: 'Floor 1: 4\nElevator started\nFloor 2: 8\nFloor 3: 12\nFloor 4: 16\nFloor 5: 20',
        must: /task\.spawn[\s\S]*task\.wait/
      },
      quiz: { q: L('Що станеться з <code>while true do end</code> без task.wait?', 'Что будет с <code>while true do end</code> без task.wait?', 'What happens to <code>while true do end</code> without task.wait?'), options: [L('нічого', 'ничего', 'nothing'), L('гра зависне', 'игра зависнет', 'the game freezes'), L('цикл виконається раз', 'цикл выполнится раз', 'it runs once')], answer: 1, explain: L('Цикл ніколи не віддає керування.', 'Цикл никогда не отдаёт управление.', 'It never yields control.') },
      ref: [{ code: 'task.spawn(fn)', d: L('паралельний потік', 'параллельный поток', 'parallel thread') }, { code: '(a - b).Magnitude', d: L('відстань', 'расстояние', 'distance') }]
    },
    {
      id: 'remotes', chapter: CH5,
      title: L('RemoteEvent: клієнт ↔ сервер', 'RemoteEvent: клиент ↔ сервер', 'RemoteEvent: client ↔ server'),
      theory: L(
        `<p>LocalScript (клієнт) і Script (сервер) працюють на різних комп’ютерах. Спілкуються вони через <b>RemoteEvent</b>, який кладуть у <code>ReplicatedStorage</code> (його бачать обидві сторони):</p>
<pre class="inline-code">-- LocalScript (гравець натиснув кнопку «Купити»)
buyEvent:FireServer("Sword")

-- Script на сервері
buyEvent.OnServerEvent:Connect(function(player, item)
  -- player Roblox підставляє САМ — підробити неможливо
end)</pre>
<ul><li><code>FireServer(...)</code> → <code>OnServerEvent(player, ...)</code></li><li><code>FireClient(player, ...)</code> → <code>OnClientEvent(...)</code> (сервер пише одному гравцю)</li><li><code>FireAllClients(...)</code> — усім гравцям</li></ul>
<p><b>Золоте правило:</b> сервер <b>перевіряє все</b>, що прийшло від клієнта: чи вистачає грошей, чи існує предмет, чи гравець поруч. Клієнт може надіслати будь-що.</p>
<div class="tip">🧪 У симуляторі клієнтський і серверний код — в одному скрипті, а <code>FireServer</code> надсилає від імені першого гравця.</div>`,
        `<p>LocalScript (клиент) и Script (сервер) работают на разных компьютерах. Общаются они через <b>RemoteEvent</b>, который кладут в <code>ReplicatedStorage</code> (его видят обе стороны):</p>
<pre class="inline-code">-- LocalScript (игрок нажал кнопку «Купить»)
buyEvent:FireServer("Sword")

-- Script на сервере
buyEvent.OnServerEvent:Connect(function(player, item)
  -- player Roblox подставляет САМ — подделать невозможно
end)</pre>
<ul><li><code>FireServer(...)</code> → <code>OnServerEvent(player, ...)</code></li><li><code>FireClient(player, ...)</code> → <code>OnClientEvent(...)</code> (сервер пишет одному игроку)</li><li><code>FireAllClients(...)</code> — всем игрокам</li></ul>
<p><b>Золотое правило:</b> сервер <b>проверяет всё</b>, что пришло от клиента: хватает ли денег, существует ли предмет, рядом ли игрок. Клиент может прислать что угодно.</p>
<div class="tip">🧪 В симуляторе клиентский и серверный код — в одном скрипте, а <code>FireServer</code> отправляет от имени первого игрока.</div>`,
        `<p>LocalScripts (client) and Scripts (server) run on different computers. They talk through a <b>RemoteEvent</b> placed in <code>ReplicatedStorage</code> (visible to both):</p>
<pre class="inline-code">-- LocalScript (the player pressed “Buy”)
buyEvent:FireServer("Sword")

-- Script on the server
buyEvent.OnServerEvent:Connect(function(player, item)
  -- Roblox fills in player ITSELF — it can’t be faked
end)</pre>
<ul><li><code>FireServer(...)</code> → <code>OnServerEvent(player, ...)</code></li><li><code>FireClient(player, ...)</code> → <code>OnClientEvent(...)</code> (server to one player)</li><li><code>FireAllClients(...)</code> — to everyone</li></ul>
<p><b>Golden rule:</b> the server <b>validates everything</b> from the client: enough money, item exists, player nearby. A client can send anything.</p>
<div class="tip">🧪 In the simulator client and server code share one script, and <code>FireServer</code> sends as the first player.</div>`),
      why: L(`<p>Чому не можна просто надіслати «дай мені 1000 монет»? Бо читер змінить LocalScript і надішле що завгодно. Тому клієнт лише <b>просить</b> («хочу купити меч»), а сервер <b>вирішує</b> й сам рахує гроші. Так влаштовані всі чесні магазини в Roblox.</p>`,
        `<p>Почему нельзя просто отправить «дай мне 1000 монет»? Потому что читер изменит LocalScript и отправит что угодно. Поэтому клиент только <b>просит</b> («хочу купить меч»), а сервер <b>решает</b> и сам считает деньги. Так устроены все честные магазины в Roblox.</p>`,
        `<p>Why not just send “give me 1000 coins”? A cheater can edit the LocalScript and send anything. So the client only <b>asks</b> (“I want to buy a sword”), while the server <b>decides</b> and counts the money itself. That’s how every fair Roblox shop works.</p>`),
      mistakes: L(`<ul><li>Передавати ціну з клієнта: <code>FireServer("Sword", 0)</code> — читер купить усе за 0. Ціни зберігай на сервері.</li><li>Додавати першим параметром <code>player</code> у <code>FireServer</code> — Roblox робить це сам.</li></ul>`,
        `<ul><li>Передавать цену с клиента: <code>FireServer("Sword", 0)</code> — читер купит всё за 0. Цены храни на сервере.</li><li>Добавлять первым параметром <code>player</code> в <code>FireServer</code> — Roblox делает это сам.</li></ul>`,
        `<ul><li>Sending the price from the client: <code>FireServer("Sword", 0)</code> lets a cheater buy everything for 0. Keep prices on the server.</li><li>Passing <code>player</code> to <code>FireServer</code> — Roblox adds it for you.</li></ul>`),
      examples: [
        { title: L('Запит до сервера', 'Запрос к серверу', 'Request to server'), code: 'local RS = game:GetService("ReplicatedStorage")\nlocal remote = Instance.new("RemoteEvent")\nremote.Name = "SayHello"\nremote.Parent = RS\n\n-- Сервер\nremote.OnServerEvent:Connect(function(player, message)\n  print(`[server] {player.Name} says: {message}`)\nend)\n\n-- Клієнт\nSimulator.addPlayer("Alex")\nremote:FireServer("Hi!")', note: L('Сервер отримує гравця першим аргументом.', 'Сервер получает игрока первым аргументом.', 'The server gets the player first.') },
        { title: L('Перевірка на сервері', 'Проверка на сервере', 'Server validation'), code: 'local RS = game:GetService("ReplicatedStorage")\nlocal buy = Instance.new("RemoteEvent", RS)\nlocal PRICES = { Sword = 50, Shield = 80 }\nlocal money = 100\nbuy.OnServerEvent:Connect(function(player, item)\n  local price = PRICES[item]\n  if not price then print("Unknown item:", item) return end\n  if money < price then print("Not enough money for", item) return end\n  money -= price\n  print(`{player.Name} bought {item}, left {money}`)\nend)\nSimulator.addPlayer("Ira")\nbuy:FireServer("Sword")\nbuy:FireServer("Rocket")\nbuy:FireServer("Shield")', note: L('Ціна — на сервері, не від клієнта.', 'Цена — на сервере, не от клиента.', 'The price lives on the server.') },
        { title: 'FireAllClients', code: 'local RS = game:GetService("ReplicatedStorage")\nlocal announce = Instance.new("RemoteEvent", RS)\nannounce.OnClientEvent:Connect(function(text)\n  print("[UI] " .. text)\nend)\nannounce:FireAllClients("Round starts in 10 seconds!")', note: L('Повідомлення всім гравцям.', 'Сообщение всем игрокам.', 'A message to all players.') }
      ],
      task: {
        text: L('Створи в ReplicatedStorage <code>RemoteEvent</code> з іменем <code>Heal</code>. Сервер лікує гравця на 30 (не вище 100), але лише якщо в нього є зілля: таблиця <code>potions[player.Name]</code> (у Alex — 1). Виводь <code>NAME healed to HP</code> або <code>NAME has no potions</code>. Alex з HP 50 двічі надсилає <code>Heal:FireServer()</code>.', 'Создай в ReplicatedStorage <code>RemoteEvent</code> с именем <code>Heal</code>. Сервер лечит игрока на 30 (не выше 100), но только если у него есть зелье: таблица <code>potions[player.Name]</code> (у Alex — 1). Выводи <code>NAME healed to HP</code> или <code>NAME has no potions</code>. Alex с HP 50 дважды отправляет <code>Heal:FireServer()</code>.', 'Create a <code>RemoteEvent</code> named <code>Heal</code> in ReplicatedStorage. The server heals the player by 30 (max 100), but only if they have a potion: table <code>potions[player.Name]</code> (Alex has 1). Print <code>NAME healed to HP</code> or <code>NAME has no potions</code>. Alex with HP 50 sends <code>Heal:FireServer()</code> twice.'),
        how: [L('Humanoid гравця: <code>player.Character.Humanoid</code>.', 'Humanoid игрока: <code>player.Character.Humanoid</code>.', 'The player’s Humanoid: <code>player.Character.Humanoid</code>.'), L('Після лікування зменш <code>potions[player.Name] -= 1</code>.', 'После лечения уменьши <code>potions[player.Name] -= 1</code>.', 'After healing do <code>potions[player.Name] -= 1</code>.')],
        starter: 'local RS = game:GetService("ReplicatedStorage")\nlocal potions = { Alex = 1 }\n',
        solution: 'local RS = game:GetService("ReplicatedStorage")\nlocal potions = { Alex = 1 }\n\nlocal heal = Instance.new("RemoteEvent")\nheal.Name = "Heal"\nheal.Parent = RS\n\nheal.OnServerEvent:Connect(function(player)\n  if (potions[player.Name] or 0) <= 0 then\n    print(`{player.Name} has no potions`)\n    return\n  end\n  potions[player.Name] -= 1\n  local hum = player.Character.Humanoid\n  hum.Health = math.min(hum.Health + 30, 100)\n  print(`{player.Name} healed to {hum.Health}`)\nend)\n\nlocal alex = Simulator.addPlayer("Alex")\nalex.Character.Humanoid.Health = 50\nheal:FireServer()\nheal:FireServer()',
        hint: L('Очікувано: healed to 80, потім no potions.', 'Ожидается: healed to 80, затем no potions.', 'Expected: healed to 80, then no potions.'),
        expected: 'Alex healed to 80\nAlex has no potions',
        must: /OnServerEvent[\s\S]*FireServer/
      },
      quiz: { q: L('Хто вирішує, чи вистачає грошей на покупку?', 'Кто решает, хватает ли денег на покупку?', 'Who decides whether there’s enough money?'), options: [L('LocalScript', 'LocalScript', 'the LocalScript'), L('сервер', 'сервер', 'the server'), L('гравець', 'игрок', 'the player')], answer: 1, explain: L('Клієнту довіряти не можна.', 'Клиенту доверять нельзя.', 'Never trust the client.') },
      ref: [{ code: 'remote:FireServer(...)', d: L('клієнт → сервер', 'клиент → сервер', 'client → server') }, { code: 'remote.OnServerEvent:Connect(function(player, ...) end)', d: L('прийом на сервері', 'приём на сервере', 'server receive') }, { code: 'remote:FireClient(p, ...)', d: L('сервер → гравець', 'сервер → игрок', 'server → player') }]
    },
    {
      id: 'modules', chapter: CH5,
      title: L('ModuleScript: свій модуль', 'ModuleScript: свой модуль', 'ModuleScript: your own module'),
      theory: L(
        `<p>Коли код потрібен у кількох скриптах (формули, налаштування, список предметів), його виносять у <b>ModuleScript</b>. Модуль — це таблиця, яку він повертає:</p>
<pre class="inline-code">-- ModuleScript "Utils" у ReplicatedStorage
local Utils = {}
Utils.MAX_LEVEL = 50

function Utils.xpForLevel(level)
  return level * 100
end

return Utils</pre>
<pre class="inline-code">-- будь-який інший скрипт
local Utils = require(game.ReplicatedStorage.Utils)
print(Utils.xpForLevel(5))</pre>
<p><code>require</code> виконує модуль <b>один раз</b> і далі повертає ту саму таблицю всім, хто його підключає. Тому в модулі можна тримати спільний стан.</p>
<div class="tip">🧪 У симуляторі немає окремих файлів, тому модуль пишемо прямо в скрипті — таблиця й функції точно ті самі, що в справжньому ModuleScript.</div>`,
        `<p>Когда код нужен в нескольких скриптах (формулы, настройки, список предметов), его выносят в <b>ModuleScript</b>. Модуль — это таблица, которую он возвращает:</p>
<pre class="inline-code">-- ModuleScript "Utils" в ReplicatedStorage
local Utils = {}
Utils.MAX_LEVEL = 50

function Utils.xpForLevel(level)
  return level * 100
end

return Utils</pre>
<pre class="inline-code">-- любой другой скрипт
local Utils = require(game.ReplicatedStorage.Utils)
print(Utils.xpForLevel(5))</pre>
<p><code>require</code> выполняет модуль <b>один раз</b> и дальше возвращает ту же таблицу всем, кто его подключает. Поэтому в модуле можно держать общее состояние.</p>
<div class="tip">🧪 В симуляторе нет отдельных файлов, поэтому модуль пишем прямо в скрипте — таблица и функции точно такие же, как в настоящем ModuleScript.</div>`,
        `<p>When code is needed by several scripts (formulas, settings, item lists), move it into a <b>ModuleScript</b>. A module is the table it returns:</p>
<pre class="inline-code">-- ModuleScript "Utils" in ReplicatedStorage
local Utils = {}
Utils.MAX_LEVEL = 50

function Utils.xpForLevel(level)
  return level * 100
end

return Utils</pre>
<pre class="inline-code">-- any other script
local Utils = require(game.ReplicatedStorage.Utils)
print(Utils.xpForLevel(5))</pre>
<p><code>require</code> runs the module <b>once</b> and then returns the same table to everyone who requires it, so modules can hold shared state.</p>
<div class="tip">🧪 The simulator has no separate files, so we write the module inside the script — the table and functions are exactly what a real ModuleScript contains.</div>`),
      why: L(`<p>Принцип <b>DRY</b> («не повторюйся»): якщо ціна меча записана в 5 скриптах, колись ти зміниш її лише в 4. Модуль — єдине джерело правди. А ще модулі роблять код коротким і зрозумілим: <code>Shop.buy(player, "Sword")</code> читається як речення.</p>`,
        `<p>Принцип <b>DRY</b> («не повторяйся»): если цена меча записана в 5 скриптах, когда-нибудь ты изменишь её только в 4. Модуль — единый источник правды. А ещё модули делают код коротким и понятным: <code>Shop.buy(player, "Sword")</code> читается как предложение.</p>`,
        `<p>The <b>DRY</b> principle (“don’t repeat yourself”): if a sword’s price lives in 5 scripts, one day you’ll update only 4. A module is the single source of truth. Modules also keep code short and readable: <code>Shop.buy(player, "Sword")</code> reads like a sentence.</p>`),
      mistakes: L(`<ul><li>Забути <code>return Utils</code> у кінці модуля — <code>require</code> видасть помилку.</li><li>Покласти серверний модуль із секретами в ReplicatedStorage — клієнти зможуть його прочитати. Для них є <code>ServerStorage</code>.</li></ul>`,
        `<ul><li>Забыть <code>return Utils</code> в конце модуля — <code>require</code> выдаст ошибку.</li><li>Положить серверный модуль с секретами в ReplicatedStorage — клиенты смогут его прочитать. Для них есть <code>ServerStorage</code>.</li></ul>`,
        `<ul><li>Forgetting <code>return Utils</code> at the end — <code>require</code> errors.</li><li>Putting a server module with secrets in ReplicatedStorage — clients can read it. Use <code>ServerStorage</code>.</li></ul>`),
      examples: [
        { title: L('Модуль-утиліта', 'Модуль-утилита', 'Utility module'), code: '-- ModuleScript "Utils"\nlocal Utils = {}\nfunction Utils.formatNumber(n)\n  if n >= 1000000 then return `{math.floor(n / 100000) / 10}M` end\n  if n >= 1000 then return `{math.floor(n / 100) / 10}K` end\n  return tostring(n)\nend\n\n-- Script\nprint(Utils.formatNumber(950))\nprint(Utils.formatNumber(15300))\nprint(Utils.formatNumber(2500000))', note: L('Скорочення великих чисел як у симуляторах.', 'Сокращение больших чисел как в симуляторах.', 'Shortening big numbers like simulator games do.') },
        { title: L('Налаштування', 'Настройки', 'Config'), code: '-- ModuleScript "Config"\nlocal Config = {\n  ROUND_TIME = 120,\n  START_COINS = 50,\n  ITEMS = {\n    { name = "Sword", price = 100 },\n    { name = "Bow", price = 150 },\n  },\n}\n\n-- Script\nprint("Round:", Config.ROUND_TIME)\nfor _, item in ipairs(Config.ITEMS) do\n  print(item.name, item.price)\nend', note: L('Усі числа гри в одному місці.', 'Все числа игры в одном месте.', 'All game numbers in one place.') },
        { title: L('Спільний стан', 'Общее состояние', 'Shared state'), code: '-- ModuleScript "Score"\nlocal Score = { total = 0 }\nfunction Score.add(n)\n  Score.total += n\n  return Score.total\nend\n\n-- два різні скрипти отримують ту саму таблицю\nlocal fromScriptA = Score\nlocal fromScriptB = Score\nfromScriptA.add(10)\nfromScriptB.add(5)\nprint(Score.total, fromScriptA == fromScriptB)', note: L('require повертає один і той самий об’єкт.', 'require возвращает один и тот же объект.', 'require returns the same object.') }
      ],
      task: {
        text: L('Напиши модуль <code>Levels</code> з константою <code>XP_PER_LEVEL = 100</code> і функцією <code>Levels.getLevel(xp)</code>, що повертає <code>math.floor(xp / XP_PER_LEVEL) + 1</code>. Виведи рівні для 0, 250 і 1000 XP у форматі <code>250 XP -> level 3</code>.', 'Напиши модуль <code>Levels</code> с константой <code>XP_PER_LEVEL = 100</code> и функцией <code>Levels.getLevel(xp)</code>, возвращающей <code>math.floor(xp / XP_PER_LEVEL) + 1</code>. Выведи уровни для 0, 250 и 1000 XP в формате <code>250 XP -> level 3</code>.', 'Write a <code>Levels</code> module with constant <code>XP_PER_LEVEL = 100</code> and function <code>Levels.getLevel(xp)</code> returning <code>math.floor(xp / XP_PER_LEVEL) + 1</code>. Print levels for 0, 250 and 1000 XP as <code>250 XP -> level 3</code>.'),
        how: [L('<code>local Levels = {}</code>, далі <code>Levels.XP_PER_LEVEL = 100</code>.', '<code>local Levels = {}</code>, далее <code>Levels.XP_PER_LEVEL = 100</code>.', '<code>local Levels = {}</code>, then <code>Levels.XP_PER_LEVEL = 100</code>.'), L('<code>function Levels.getLevel(xp) … end</code>', '<code>function Levels.getLevel(xp) … end</code>', '<code>function Levels.getLevel(xp) … end</code>')],
        starter: '-- ModuleScript "Levels"\n\n\n-- Script\n',
        solution: '-- ModuleScript "Levels"\nlocal Levels = {}\nLevels.XP_PER_LEVEL = 100\n\nfunction Levels.getLevel(xp)\n  return math.floor(xp / Levels.XP_PER_LEVEL) + 1\nend\n\n-- Script\nfor _, xp in ipairs({0, 250, 1000}) do\n  print(`{xp} XP -> level {Levels.getLevel(xp)}`)\nend',
        hint: L('Рівні: 1, 3, 11.', 'Уровни: 1, 3, 11.', 'Levels: 1, 3, 11.'),
        expected: '0 XP -> level 1\n250 XP -> level 3\n1000 XP -> level 11',
        must: /function\s+Levels\.getLevel/
      },
      quiz: { q: L('Скільки разів виконується код модуля при кількох <code>require</code>?', 'Сколько раз выполняется код модуля при нескольких <code>require</code>?', 'How many times does a module run with several <code>require</code>s?'), options: [L('щоразу', 'каждый раз', 'every time'), L('один раз', 'один раз', 'once'), L('жодного', 'ни разу', 'never')], answer: 1, explain: L('Далі повертається та сама таблиця.', 'Дальше возвращается та же таблица.', 'Afterwards the same table is returned.') },
      ref: [{ code: 'local M = {} … return M', d: L('структура модуля', 'структура модуля', 'module shape') }, { code: 'require(path.To.Module)', d: L('підключити', 'подключить', 'require it') }]
    },
    {
      id: 'datastore', chapter: CH5,
      title: L('DataStore: збереження прогресу', 'DataStore: сохранение прогресса', 'DataStore: saving progress'),
      theory: L(
        `<p>Коли гравець виходить, усі змінні зникають. Щоб монети й рівень зберігалися між сесіями, використовують <b>DataStoreService</b> — сховище Roblox у хмарі:</p>
<pre class="inline-code">local DataStoreService = game:GetService("DataStoreService")
local store = DataStoreService:GetDataStore("PlayerData")

-- завантаження
local ok, data = pcall(function()
  return store:GetAsync("Player_" .. player.UserId)
end)

-- збереження
pcall(function()
  store:SetAsync("Player_" .. player.UserId, { coins = 120, level = 4 })
end)</pre>
<ul><li>Ключ — <b>UserId</b> (а не ім’я: ім’я можна змінити)</li><li>Значення — число, рядок або таблиця</li><li>Запити йдуть через інтернет і можуть не вдатися, тому їх загортають у <code>pcall</code> — «спробуй, а якщо помилка — не падай»</li><li>Новий гравець — <code>GetAsync</code> повертає <code>nil</code>, тож потрібні значення за замовчуванням</li></ul>`,
        `<p>Когда игрок выходит, все переменные исчезают. Чтобы монеты и уровень сохранялись между сессиями, используют <b>DataStoreService</b> — облачное хранилище Roblox:</p>
<pre class="inline-code">local DataStoreService = game:GetService("DataStoreService")
local store = DataStoreService:GetDataStore("PlayerData")

-- загрузка
local ok, data = pcall(function()
  return store:GetAsync("Player_" .. player.UserId)
end)

-- сохранение
pcall(function()
  store:SetAsync("Player_" .. player.UserId, { coins = 120, level = 4 })
end)</pre>
<ul><li>Ключ — <b>UserId</b> (а не имя: имя можно изменить)</li><li>Значение — число, строка или таблица</li><li>Запросы идут через интернет и могут не удаться, поэтому их оборачивают в <code>pcall</code> — «попробуй, а если ошибка — не падай»</li><li>Новый игрок — <code>GetAsync</code> возвращает <code>nil</code>, так что нужны значения по умолчанию</li></ul>`,
        `<p>When a player leaves, every variable is gone. To keep coins and levels between sessions, use <b>DataStoreService</b> — Roblox’s cloud storage:</p>
<pre class="inline-code">local DataStoreService = game:GetService("DataStoreService")
local store = DataStoreService:GetDataStore("PlayerData")

-- load
local ok, data = pcall(function()
  return store:GetAsync("Player_" .. player.UserId)
end)

-- save
pcall(function()
  store:SetAsync("Player_" .. player.UserId, { coins = 120, level = 4 })
end)</pre>
<ul><li>The key is the <b>UserId</b> (not the name — names can change)</li><li>The value is a number, string or table</li><li>Requests go over the internet and can fail, so wrap them in <code>pcall</code> — “try, and if it errors, don’t crash”</li><li>For a new player <code>GetAsync</code> returns <code>nil</code>, so you need defaults</li></ul>`),
      why: L(`<p>Чому <code>pcall</code>, а не просто виклик? Сервери Roblox іноді зайняті. Без pcall помилка зупинить увесь скрипт — і гравець зайде з нулем монет або не збереже прогрес. З pcall ми дізнаємося про збій (<code>ok == false</code>) і можемо повторити спробу.</p>`,
        `<p>Почему <code>pcall</code>, а не просто вызов? Серверы Roblox иногда заняты. Без pcall ошибка остановит весь скрипт — и игрок зайдёт с нулём монет или не сохранит прогресс. С pcall мы узнаем о сбое (<code>ok == false</code>) и можем повторить попытку.</p>`,
        `<p>Why <code>pcall</code> instead of a plain call? Roblox servers are sometimes busy. Without pcall an error stops the whole script — the player joins with zero coins or loses progress. With pcall we learn about the failure (<code>ok == false</code>) and can retry.</p>`),
      mistakes: L(`<ul><li>Зберігати за <code>player.Name</code> — після зміни ніку прогрес «зникне».</li><li>Зберігати при кожній зміні монет — у DataStore є ліміти запитів. Зберігай при виході та раз на кілька хвилин.</li><li>DataStore не працює в Studio, поки в налаштуваннях гри не ввімкнено «Enable Studio Access to API Services».</li></ul>`,
        `<ul><li>Сохранять по <code>player.Name</code> — после смены ника прогресс «исчезнет».</li><li>Сохранять при каждом изменении монет — у DataStore есть лимиты запросов. Сохраняй при выходе и раз в несколько минут.</li><li>DataStore не работает в Studio, пока в настройках игры не включено «Enable Studio Access to API Services».</li></ul>`,
        `<ul><li>Saving by <code>player.Name</code> — progress “vanishes” after a rename.</li><li>Saving on every coin change — DataStore has request limits. Save on leave and every few minutes.</li><li>DataStore won’t work in Studio until “Enable Studio Access to API Services” is on in Game Settings.</li></ul>`),
      examples: [
        { title: 'GetAsync / SetAsync', code: 'local DSS = game:GetService("DataStoreService")\nlocal store = DSS:GetDataStore("Coins")\nlocal key = "Player_1001"\nprint("Before:", store:GetAsync(key))\nstore:SetAsync(key, 250)\nprint("After:", store:GetAsync(key))', note: L('Новий ключ — nil.', 'Новый ключ — nil.', 'A new key is nil.') },
        { title: 'pcall', code: 'local ok, result = pcall(function()\n  return 10 / 2\nend)\nprint(ok, result)\n\nlocal ok2, err = pcall(function()\n  error("DataStore is busy")\nend)\nprint(ok2, err)', note: L('pcall ловить помилку замість падіння.', 'pcall ловит ошибку вместо падения.', 'pcall catches the error instead of crashing.') },
        { title: L('Вхід і вихід', 'Вход и выход', 'Join and leave'), code: 'local Players = game:GetService("Players")\nlocal store = game:GetService("DataStoreService"):GetDataStore("PlayerData")\nlocal session = {}\n\nPlayers.PlayerAdded:Connect(function(player)\n  local ok, data = pcall(function() return store:GetAsync(player.UserId) end)\n  session[player] = (ok and data) or { coins = 0 }\n  print(player.Name, "loaded coins:", session[player].coins)\nend)\n\nPlayers.PlayerRemoving:Connect(function(player)\n  pcall(function() store:SetAsync(player.UserId, session[player]) end)\n  print(player.Name, "saved")\n  session[player] = nil\nend)\n\nlocal p = Simulator.addPlayer("Alex")\nsession[p].coins += 75\nSimulator.removePlayer(p)\n-- той самий гравець повернувся\nlocal again = Simulator.addPlayer("Alex")\nprint(store:GetAsync(1001).coins)', note: L('Повний цикл: завантажити → грати → зберегти.', 'Полный цикл: загрузить → играть → сохранить.', 'The full cycle: load → play → save.') }
      ],
      task: {
        text: L('Напиши функції <code>loadData(userId)</code> (повертає збережене або <code>{ coins = 0, level = 1 }</code>, через <code>pcall</code>) і <code>saveData(userId, data)</code>. Для ключа <code>1001</code>: завантаж дані, додай 40 монет і 1 рівень, збережи, завантаж знову й виведи <code>coins=40 level=2</code>.', 'Напиши функции <code>loadData(userId)</code> (возвращает сохранённое или <code>{ coins = 0, level = 1 }</code>, через <code>pcall</code>) и <code>saveData(userId, data)</code>. Для ключа <code>1001</code>: загрузи данные, добавь 40 монет и 1 уровень, сохрани, загрузи снова и выведи <code>coins=40 level=2</code>.', 'Write <code>loadData(userId)</code> (returns saved data or <code>{ coins = 0, level = 1 }</code>, using <code>pcall</code>) and <code>saveData(userId, data)</code>. For key <code>1001</code>: load, add 40 coins and 1 level, save, load again and print <code>coins=40 level=2</code>.'),
        how: [L('<code>local ok, data = pcall(function() return store:GetAsync(userId) end)</code>', '<code>local ok, data = pcall(function() return store:GetAsync(userId) end)</code>', '<code>local ok, data = pcall(function() return store:GetAsync(userId) end)</code>'), L('<code>if ok and data then return data end</code>', '<code>if ok and data then return data end</code>', '<code>if ok and data then return data end</code>')],
        starter: 'local store = game:GetService("DataStoreService"):GetDataStore("PlayerData")\n',
        solution: 'local store = game:GetService("DataStoreService"):GetDataStore("PlayerData")\n\nlocal function loadData(userId)\n  local ok, data = pcall(function()\n    return store:GetAsync(userId)\n  end)\n  if ok and data then\n    return data\n  end\n  return { coins = 0, level = 1 }\nend\n\nlocal function saveData(userId, data)\n  local ok = pcall(function()\n    store:SetAsync(userId, data)\n  end)\n  return ok\nend\n\nlocal data = loadData(1001)\ndata.coins += 40\ndata.level += 1\nsaveData(1001, data)\n\nlocal loaded = loadData(1001)\nprint(`coins={loaded.coins} level={loaded.level}`)',
        hint: L('pcall повертає <code>ok</code> і результат функції.', 'pcall возвращает <code>ok</code> и результат функции.', 'pcall returns <code>ok</code> and the function’s result.'),
        expected: 'coins=40 level=2',
        must: /pcall[\s\S]*GetAsync[\s\S]*SetAsync/
      },
      quiz: { q: L('Чому ключ — UserId, а не ім’я?', 'Почему ключ — UserId, а не имя?', 'Why use UserId, not the name, as the key?'), options: [L('він коротший', 'он короче', 'it’s shorter'), L('ім’я можна змінити, UserId — ні', 'имя можно изменить, UserId — нет', 'names change, UserIds don’t'), L('так швидше', 'так быстрее', 'it’s faster')], answer: 1, explain: L('UserId постійний.', 'UserId постоянный.', 'UserId is permanent.') },
      ref: [{ code: 'DSS:GetDataStore(name)', d: L('сховище', 'хранилище', 'a store') }, { code: 'store:GetAsync(k) / SetAsync(k, v)', d: L('читати / писати', 'читать / писать', 'read / write') }, { code: 'pcall(fn)', d: L('безпечний виклик', 'безопасный вызов', 'protected call') }]
    },
    {
      id: 'tween', chapter: CH6,
      title: L('TweenService: плавні анімації', 'TweenService: плавные анимации', 'TweenService: smooth animation'),
      theory: L(
        `<p>Щоб двері плавно від’їхали, а монета м’яко піднялася, використовують <b>TweenService</b>. Він поступово змінює властивості від поточних до цільових:</p>
<pre class="inline-code">local TweenService = game:GetService("TweenService")
local info = TweenInfo.new(2)   -- 2 секунди
local goal = { Position = Vector3.new(0, 10, 0), Transparency = 0.5 }

local tween = TweenService:Create(part, info, goal)
tween:Play()
tween.Completed:Wait()   -- дочекатися кінця</pre>
<ul><li><code>TweenInfo.new(час, стиль, напрямок, повтори, туди-назад, затримка)</code> — стилі: <code>Enum.EasingStyle.Quad</code>, <code>Bounce</code>, <code>Elastic</code>…</li><li>Анімувати можна майже все: Position, Size, Color, Transparency, а в інтерфейсі — розміри й позиції кнопок</li><li><code>tween.Completed</code> — подія завершення</li></ul>`,
        `<p>Чтобы двери плавно отъехали, а монета мягко поднялась, используют <b>TweenService</b>. Он постепенно меняет свойства от текущих к целевым:</p>
<pre class="inline-code">local TweenService = game:GetService("TweenService")
local info = TweenInfo.new(2)   -- 2 секунды
local goal = { Position = Vector3.new(0, 10, 0), Transparency = 0.5 }

local tween = TweenService:Create(part, info, goal)
tween:Play()
tween.Completed:Wait()   -- дождаться конца</pre>
<ul><li><code>TweenInfo.new(время, стиль, направление, повторы, туда-обратно, задержка)</code> — стили: <code>Enum.EasingStyle.Quad</code>, <code>Bounce</code>, <code>Elastic</code>…</li><li>Анимировать можно почти всё: Position, Size, Color, Transparency, а в интерфейсе — размеры и позиции кнопок</li><li><code>tween.Completed</code> — событие завершения</li></ul>`,
        `<p>To make a door slide smoothly or a coin float up, use <b>TweenService</b>. It gradually changes properties from current to target values:</p>
<pre class="inline-code">local TweenService = game:GetService("TweenService")
local info = TweenInfo.new(2)   -- 2 seconds
local goal = { Position = Vector3.new(0, 10, 0), Transparency = 0.5 }

local tween = TweenService:Create(part, info, goal)
tween:Play()
tween.Completed:Wait()   -- wait for the end</pre>
<ul><li><code>TweenInfo.new(time, style, direction, repeats, reverses, delay)</code> — styles: <code>Enum.EasingStyle.Quad</code>, <code>Bounce</code>, <code>Elastic</code>…</li><li>You can tween almost anything: Position, Size, Color, Transparency, and UI sizes and positions</li><li><code>tween.Completed</code> fires when it ends</li></ul>`),
      why: L(`<p>Чому не змінювати позицію в циклі? Твін робить це плавно 60 разів на секунду, з красивими кривими прискорення, і не навантажує твій скрипт. Плавність — те, що відрізняє «шкільний проєкт» від гри, у яку хочеться грати.</p>`,
        `<p>Почему не менять позицию в цикле? Твин делает это плавно 60 раз в секунду, с красивыми кривыми ускорения, и не нагружает твой скрипт. Плавность — то, что отличает «школьный проект» от игры, в которую хочется играть.</p>`,
        `<p>Why not move the part in a loop? A tween does it smoothly 60 times per second with nice easing curves, without loading your script. Smoothness is what separates a “school project” from a game people want to play.</p>`),
      mistakes: L(`<ul><li>Забути <code>:Play()</code> — твін створено, але нічого не рухається.</li><li>Анімувати незакріплену деталь — фізика «боротиметься» з анімацією. Став <code>Anchored = true</code>.</li></ul>`,
        `<ul><li>Забыть <code>:Play()</code> — твин создан, но ничего не двигается.</li><li>Анимировать незакреплённую деталь — физика будет «бороться» с анимацией. Ставь <code>Anchored = true</code>.</li></ul>`,
        `<ul><li>Forgetting <code>:Play()</code> — the tween exists but nothing moves.</li><li>Tweening an unanchored part — physics fights the animation. Set <code>Anchored = true</code>.</li></ul>`),
      examples: [
        { title: L('Двері', 'Двери', 'Door'), code: 'local TweenService = game:GetService("TweenService")\nlocal door = Instance.new("Part", workspace)\ndoor.Name = "Door"\ndoor.Anchored = true\nlocal tween = TweenService:Create(door, TweenInfo.new(1.5), { Position = Vector3.new(0, 12, 0) })\ntween:Play()\ntween.Completed:Wait()\nprint("Door at", door.Position, "time", time())', note: L('Completed:Wait() чекає завершення.', 'Completed:Wait() ждёт завершения.', 'Completed:Wait() waits for the end.') },
        { title: L('Зникнення', 'Исчезновение', 'Fade out'), code: 'local TweenService = game:GetService("TweenService")\nlocal ghost = Instance.new("Part", workspace)\nghost.Name = "Ghost"\nlocal t = TweenService:Create(ghost, TweenInfo.new(2), { Transparency = 1 })\nt.Completed:Connect(function()\n  print("Ghost vanished, transparency:", ghost.Transparency)\n  ghost:Destroy()\nend)\nt:Play()\nprint("Fading...")', note: L('Після анімації об’єкт видаляється.', 'После анимации объект удаляется.', 'The object is removed after the animation.') },
        { title: L('Ланцюжок', 'Цепочка', 'Chain'), code: 'local TS = game:GetService("TweenService")\nlocal coin = Instance.new("Part", workspace)\ncoin.Name = "Coin"\nlocal up = TS:Create(coin, TweenInfo.new(0.5), { Position = Vector3.new(0, 3, 0) })\nlocal down = TS:Create(coin, TweenInfo.new(0.5), { Position = Vector3.new(0, 0, 0) })\nfor i = 1, 2 do\n  up:Play() up.Completed:Wait()\n  down:Play() down.Completed:Wait()\nend\nprint("Bounced twice in", time(), "s")', note: L('Дві анімації по черзі.', 'Две анимации по очереди.', 'Two animations in sequence.') }
      ],
      task: {
        text: L('Створи закріплену деталь <code>Gate</code>. Анімуй її за 3 секунди до позиції <code>0, 15, 0</code> і прозорості <code>0.5</code>. Виведи <code>Opening...</code> одразу після <code>Play()</code>, а після завершення (<code>Completed:Wait()</code>) — <code>Gate opened: Y=15</code>.', 'Создай закреплённую деталь <code>Gate</code>. Анимируй её за 3 секунды к позиции <code>0, 15, 0</code> и прозрачности <code>0.5</code>. Выведи <code>Opening...</code> сразу после <code>Play()</code>, а после завершения (<code>Completed:Wait()</code>) — <code>Gate opened: Y=15</code>.', 'Create an anchored part <code>Gate</code>. Tween it over 3 seconds to position <code>0, 15, 0</code> and transparency <code>0.5</code>. Print <code>Opening...</code> right after <code>Play()</code>, and after it finishes (<code>Completed:Wait()</code>) print <code>Gate opened: Y=15</code>.'),
        how: [L('<code>TweenService:Create(gate, TweenInfo.new(3), { Position = …, Transparency = 0.5 })</code>', '<code>TweenService:Create(gate, TweenInfo.new(3), { Position = …, Transparency = 0.5 })</code>', '<code>TweenService:Create(gate, TweenInfo.new(3), { Position = …, Transparency = 0.5 })</code>'), L('Симулятор теж виводить рядок <code>[Tween] …</code> — це нормально.', 'Симулятор тоже выводит строку <code>[Tween] …</code> — это нормально.', 'The simulator also prints a <code>[Tween] …</code> line — that’s fine.')],
        starter: 'local TweenService = game:GetService("TweenService")\n',
        solution: 'local TweenService = game:GetService("TweenService")\n\nlocal gate = Instance.new("Part")\ngate.Name = "Gate"\ngate.Anchored = true\ngate.Parent = workspace\n\nlocal tween = TweenService:Create(gate, TweenInfo.new(3), {\n  Position = Vector3.new(0, 15, 0),\n  Transparency = 0.5,\n})\ntween:Play()\nprint("Opening...")\ntween.Completed:Wait()\nprint(`Gate opened: Y={gate.Position.Y}`)',
        hint: L('Значення застосуються в кінці анімації.', 'Значения применятся в конце анимации.', 'Values apply at the end of the tween.'),
        check: (out) => /Opening\.\.\.\s*\n\s*Gate opened: Y=15\s*$/.test(out.trim()),
        must: /TweenService\s*:\s*Create/
      },
      quiz: { q: L('Що забули, якщо твін нічого не робить?', 'Что забыли, если твин ничего не делает?', 'What’s missing if a tween does nothing?'), options: ['tween:Play()', 'tween:Start()', 'tween.Enabled = true'], answer: 0, explain: L('Без Play анімація не стартує.', 'Без Play анимация не стартует.', 'Without Play it never starts.') },
      ref: [{ code: 'TS:Create(obj, TweenInfo.new(t), goal)', d: L('створити твін', 'создать твин', 'create a tween') }, { code: 'tween:Play()  tween.Completed:Wait()', d: L('запустити, дочекатися', 'запустить, дождаться', 'play, wait') }]
    },
    {
      id: 'gui', chapter: CH6,
      title: L('Інтерфейс: ScreenGui і кнопки', 'Интерфейс: ScreenGui и кнопки', 'UI: ScreenGui and buttons'),
      theory: L(
        `<p>Інтерфейс (лічильник монет, кнопки магазину, меню) будують з об’єктів GUI. Їх кладуть у <code>StarterGui</code>, а Roblox копіює їх у <code>PlayerGui</code> кожного гравця:</p>
<ul><li><code>ScreenGui</code> — «полотно» на екрані</li><li><code>Frame</code> — панель-контейнер</li><li><code>TextLabel</code> — текст, <code>TextButton</code> — кнопка, <code>ImageLabel</code> — картинка</li></ul>
<p>Розмір і позиція задаються через <code>UDim2.new(scaleX, offsetX, scaleY, offsetY)</code>: <b>scale</b> — частка екрана (0–1), <b>offset</b> — пікселі. <code>UDim2.new(0.5, 0, 0, 50)</code> — пів ширини екрана й 50 px заввишки. Scale робить інтерфейс однаковим на телефоні й ПК.</p>
<pre class="inline-code">button.MouseButton1Click:Connect(function()
  label.Text = "Clicked!"
end)</pre>
<p>Код інтерфейсу пишуть у <b>LocalScript</b>, бо екран — у кожного гравця свій.</p>`,
        `<p>Интерфейс (счётчик монет, кнопки магазина, меню) строят из объектов GUI. Их кладут в <code>StarterGui</code>, а Roblox копирует их в <code>PlayerGui</code> каждого игрока:</p>
<ul><li><code>ScreenGui</code> — «холст» на экране</li><li><code>Frame</code> — панель-контейнер</li><li><code>TextLabel</code> — текст, <code>TextButton</code> — кнопка, <code>ImageLabel</code> — картинка</li></ul>
<p>Размер и позиция задаются через <code>UDim2.new(scaleX, offsetX, scaleY, offsetY)</code>: <b>scale</b> — доля экрана (0–1), <b>offset</b> — пиксели. <code>UDim2.new(0.5, 0, 0, 50)</code> — пол ширины экрана и 50 px в высоту. Scale делает интерфейс одинаковым на телефоне и ПК.</p>
<pre class="inline-code">button.MouseButton1Click:Connect(function()
  label.Text = "Clicked!"
end)</pre>
<p>Код интерфейса пишут в <b>LocalScript</b>, ведь экран у каждого игрока свой.</p>`,
        `<p>UI (coin counters, shop buttons, menus) is built from GUI objects. They go in <code>StarterGui</code>, and Roblox copies them into each player’s <code>PlayerGui</code>:</p>
<ul><li><code>ScreenGui</code> — the on-screen canvas</li><li><code>Frame</code> — a container panel</li><li><code>TextLabel</code> — text, <code>TextButton</code> — a button, <code>ImageLabel</code> — an image</li></ul>
<p>Size and position use <code>UDim2.new(scaleX, offsetX, scaleY, offsetY)</code>: <b>scale</b> is a fraction of the screen (0–1), <b>offset</b> is pixels. <code>UDim2.new(0.5, 0, 0, 50)</code> is half the screen wide and 50 px tall. Scale keeps UI consistent on phones and PCs.</p>
<pre class="inline-code">button.MouseButton1Click:Connect(function()
  label.Text = "Clicked!"
end)</pre>
<p>UI code lives in a <b>LocalScript</b>, because each player has their own screen.</p>`),
      why: L(`<p>Понад половина гравців Roblox — на телефонах. Інтерфейс у пікселях (offset) на малому екрані налізе одне на одне, а у частках (scale) — підлаштується. Тому досвідчені розробники майже завжди використовують scale.</p>`,
        `<p>Больше половины игроков Roblox — на телефонах. Интерфейс в пикселях (offset) на маленьком экране налезет друг на друга, а в долях (scale) — подстроится. Поэтому опытные разработчики почти всегда используют scale.</p>`,
        `<p>Over half of Roblox players are on phones. UI in pixels (offset) overlaps on small screens, while scale adapts. That’s why experienced developers almost always use scale.</p>`),
      mistakes: L(`<ul><li>Змінювати інтерфейс з серверного Script — краще надіслати подію клієнту, а він оновить свій екран.</li><li>Плутати порядок у UDim2: <code>(scaleX, offsetX, scaleY, offsetY)</code>.</li></ul>`,
        `<ul><li>Менять интерфейс из серверного Script — лучше отправить событие клиенту, а он обновит свой экран.</li><li>Путать порядок в UDim2: <code>(scaleX, offsetX, scaleY, offsetY)</code>.</li></ul>`,
        `<ul><li>Changing UI from a server Script — send an event to the client and let it update its screen.</li><li>Mixing up UDim2’s order: <code>(scaleX, offsetX, scaleY, offsetY)</code>.</li></ul>`),
      examples: [
        { title: L('Лічильник', 'Счётчик', 'Counter'), code: 'local player = Simulator.addPlayer("Alex")\nlocal gui = Instance.new("ScreenGui")\ngui.Parent = player:WaitForChild("PlayerGui")\nlocal label = Instance.new("TextLabel")\nlabel.Size = UDim2.new(0.3, 0, 0, 40)\nlabel.Text = "Coins: 0"\nlabel.Parent = gui\nfor i = 1, 3 do\n  label.Text = `Coins: {i * 10}`\nend\nprint(label.Text, label.Size)', note: L('Текст оновлюється з кодом.', 'Текст обновляется кодом.', 'Code updates the text.') },
        { title: L('Кнопка', 'Кнопка', 'Button'), code: 'local gui = Instance.new("ScreenGui")\nlocal button = Instance.new("TextButton", gui)\nbutton.Text = "Play"\nlocal clicks = 0\nbutton.MouseButton1Click:Connect(function()\n  clicks += 1\n  button.Text = `Clicked {clicks}x`\n  print(button.Text)\nend)\nSimulator.fire(button, "MouseButton1Click")\nSimulator.fire(button, "MouseButton1Click")', note: L('<code>Simulator.fire</code> імітує натискання.', '<code>Simulator.fire</code> имитирует нажатие.', '<code>Simulator.fire</code> imitates a press.') },
        { title: L('Оновлення з leaderstats', 'Обновление из leaderstats', 'Update from leaderstats'), code: 'local coins = Instance.new("IntValue")\ncoins.Name = "Coins"\nlocal label = Instance.new("TextLabel")\nlocal function refresh()\n  label.Text = `💰 {coins.Value}`\n  print("UI:", label.Text)\nend\ncoins.Changed:Connect(refresh)\nrefresh()\ncoins.Value = 25\ncoins.Value = 60', note: L('Інтерфейс сам реагує на зміну значення.', 'Интерфейс сам реагирует на изменение значения.', 'The UI reacts to value changes.') }
      ],
      task: {
        text: L('Зроби кнопку <code>TextButton</code> з текстом <code>Buy (5)</code> і мітку <code>TextLabel</code> з текстом <code>Coins: 12</code>. Кожне натискання знімає 5 монет і оновлює мітку; якщо монет менше 5 — кнопка показує <code>Not enough</code>. Натисни 3 рази й після кожного виведи <code>LABEL | BUTTON</code>.', 'Сделай кнопку <code>TextButton</code> с текстом <code>Buy (5)</code> и метку <code>TextLabel</code> с текстом <code>Coins: 12</code>. Каждое нажатие снимает 5 монет и обновляет метку; если монет меньше 5 — кнопка показывает <code>Not enough</code>. Нажми 3 раза и после каждого выведи <code>LABEL | BUTTON</code>.', 'Make a <code>TextButton</code> with text <code>Buy (5)</code> and a <code>TextLabel</code> with text <code>Coins: 12</code>. Each press takes 5 coins and updates the label; with fewer than 5 coins the button shows <code>Not enough</code>. Press 3 times and after each print <code>LABEL | BUTTON</code>.'),
        how: [L('Змінна <code>local coins = 12</code>.', 'Переменная <code>local coins = 12</code>.', 'A variable <code>local coins = 12</code>.'), L('Натискання: <code>Simulator.fire(button, "MouseButton1Click")</code>.', 'Нажатие: <code>Simulator.fire(button, "MouseButton1Click")</code>.', 'Press: <code>Simulator.fire(button, "MouseButton1Click")</code>.')],
        starter: 'local gui = Instance.new("ScreenGui")\n',
        solution: 'local gui = Instance.new("ScreenGui")\nlocal coins = 12\n\nlocal label = Instance.new("TextLabel")\nlabel.Text = `Coins: {coins}`\nlabel.Parent = gui\n\nlocal button = Instance.new("TextButton")\nbutton.Text = "Buy (5)"\nbutton.Parent = gui\n\nbutton.MouseButton1Click:Connect(function()\n  if coins < 5 then\n    button.Text = "Not enough"\n  else\n    coins -= 5\n    label.Text = `Coins: {coins}`\n  end\n  print(`{label.Text} | {button.Text}`)\nend)\n\nfor i = 1, 3 do\n  Simulator.fire(button, "MouseButton1Click")\nend',
        hint: L('12 → 7 → 2 → «Not enough».', '12 → 7 → 2 → «Not enough».', '12 → 7 → 2 → “Not enough”.'),
        expected: 'Coins: 7 | Buy (5)\nCoins: 2 | Buy (5)\nCoins: 2 | Not enough',
        must: /MouseButton1Click/
      },
      quiz: { q: L('Що означає <code>UDim2.new(1, 0, 0, 30)</code>?', 'Что значит <code>UDim2.new(1, 0, 0, 30)</code>?', 'What is <code>UDim2.new(1, 0, 0, 30)</code>?'), options: [L('1 px × 30 px', '1 px × 30 px', '1 px × 30 px'), L('уся ширина × 30 px', 'вся ширина × 30 px', 'full width × 30 px'), L('30% ширини', '30% ширины', '30% width')], answer: 1, explain: L('scaleX = 1 — 100% ширини.', 'scaleX = 1 — 100% ширины.', 'scaleX = 1 means 100% width.') },
      ref: [{ code: 'ScreenGui Frame TextLabel TextButton', d: L('елементи GUI', 'элементы GUI', 'GUI elements') }, { code: 'UDim2.new(sx, ox, sy, oy)', d: L('розмір/позиція', 'размер/позиция', 'size/position') }, { code: 'button.MouseButton1Click', d: L('натискання', 'нажатие', 'press') }]
    },
    {
      id: 'project-obby', chapter: CH7, project: true,
      title: L('Проєкт: Обі з чекпойнтами', 'Проект: Обби с чекпойнтами', 'Project: Obby with checkpoints'),
      theory: L(
        `<p><b>Обі</b> (obstacle course) — найпопулярніший жанр для першої гри. Зберемо його механіку з усього, що вивчили:</p>
<ol><li><b>Етапи</b> — деталі <code>Stage1</code>, <code>Stage2</code>, <code>Stage3</code> у папці <code>Checkpoints</code>, створені циклом. Номер етапу зберігаємо атрибутом: <code>part:SetAttribute("Stage", i)</code></li><li><b>Прогрес</b> — <code>leaderstats.Stage</code> (видно в таблиці)</li><li><b>Чекпойнт</b> — при дотику, якщо номер етапу <b>рівно на 1 більший</b> за поточний, оновлюємо прогрес (не можна перескочити й не можна «повернутися назад»)</li><li><b>Лава</b> — убиває персонажа</li><li><b>Респаун</b> — після смерті гравець з’являється на своєму останньому етапі (<code>CharacterAdded</code>)</li></ol>
<div class="tip">🧪 Новий персонаж у симуляторі: <code>Simulator.respawn(player)</code>.</div>`,
        `<p><b>Обби</b> (obstacle course) — самый популярный жанр для первой игры. Соберём его механику из всего, что изучили:</p>
<ol><li><b>Этапы</b> — детали <code>Stage1</code>, <code>Stage2</code>, <code>Stage3</code> в папке <code>Checkpoints</code>, созданные циклом. Номер этапа храним атрибутом: <code>part:SetAttribute("Stage", i)</code></li><li><b>Прогресс</b> — <code>leaderstats.Stage</code> (видно в таблице)</li><li><b>Чекпойнт</b> — при касании, если номер этапа <b>ровно на 1 больше</b> текущего, обновляем прогресс (нельзя перескочить и нельзя «вернуться назад»)</li><li><b>Лава</b> — убивает персонажа</li><li><b>Респаун</b> — после смерти игрок появляется на своём последнем этапе (<code>CharacterAdded</code>)</li></ol>
<div class="tip">🧪 Новый персонаж в симуляторе: <code>Simulator.respawn(player)</code>.</div>`,
        `<p>An <b>obby</b> (obstacle course) is the most popular first-game genre. Let’s build its mechanics from everything so far:</p>
<ol><li><b>Stages</b> — parts <code>Stage1</code>, <code>Stage2</code>, <code>Stage3</code> in a <code>Checkpoints</code> folder, created in a loop. Store the stage number as an attribute: <code>part:SetAttribute("Stage", i)</code></li><li><b>Progress</b> — <code>leaderstats.Stage</code> (shown on the leaderboard)</li><li><b>Checkpoint</b> — on touch, if the stage number is <b>exactly 1 more</b> than the current one, update progress (no skipping, no going back)</li><li><b>Lava</b> kills the character</li><li><b>Respawn</b> — after dying the player appears at their last stage (<code>CharacterAdded</code>)</li></ol>
<div class="tip">🧪 A new character in the simulator: <code>Simulator.respawn(player)</code>.</div>`),
      why: L(`<p>Правило «рівно +1» — захист від багів і читів: гравець не перескочить на фінал, торкнувшись далекого чекпойнта, і не втратить прогрес, випадково зачепивши старий. Атрибути (<code>SetAttribute</code>) зручніші, ніж «витягувати» номер з імені деталі.</p>`,
        `<p>Правило «ровно +1» — защита от багов и читов: игрок не перескочит на финал, коснувшись далёкого чекпойнта, и не потеряет прогресс, случайно задев старый. Атрибуты (<code>SetAttribute</code>) удобнее, чем «вытаскивать» номер из имени детали.</p>`,
        `<p>The “exactly +1” rule guards against bugs and cheats: a player can’t jump to the finish by touching a far checkpoint, nor lose progress by brushing an old one. Attributes (<code>SetAttribute</code>) beat parsing numbers out of part names.</p>`),
      mistakes: L(`<ul><li>Перевірка <code>stage > current</code> замість <code>stage == current + 1</code> — можна перескочити етапи.</li><li>Підключити <code>CharacterAdded</code> після того, як персонаж уже з’явився, — перший спавн пропущено.</li></ul>`,
        `<ul><li>Проверка <code>stage > current</code> вместо <code>stage == current + 1</code> — можно перескочить этапы.</li><li>Подключить <code>CharacterAdded</code> после того, как персонаж уже появился, — первый спавн пропущен.</li></ul>`,
        `<ul><li>Checking <code>stage > current</code> instead of <code>stage == current + 1</code> lets players skip stages.</li><li>Connecting <code>CharacterAdded</code> after the character spawned misses the first spawn.</li></ul>`),
      examples: [
        { title: L('Етапи циклом', 'Этапы циклом', 'Stages in a loop'), code: 'local folder = Instance.new("Folder", workspace)\nfolder.Name = "Checkpoints"\nfor i = 1, 3 do\n  local s = Instance.new("Part")\n  s.Name = `Stage{i}`\n  s.Anchored = true\n  s.Position = Vector3.new(i * 20, i * 4, 0)\n  s:SetAttribute("Stage", i)\n  s.Parent = folder\nend\nfor _, s in ipairs(folder:GetChildren()) do\n  print(s.Name, s:GetAttribute("Stage"), s.Position)\nend', note: L('Атрибут зберігає номер етапу.', 'Атрибут хранит номер этапа.', 'The attribute stores the stage number.') },
        { title: L('Правило +1', 'Правило +1', 'The +1 rule'), code: 'local current = 1\nlocal function reach(stage)\n  if stage == current + 1 then\n    current = stage\n    print("Checkpoint", stage)\n  else\n    print("Ignored", stage)\n  end\nend\nreach(3)\nreach(2)\nreach(2)\nreach(3)', note: L('Перескок і повтор ігноруються.', 'Перескок и повтор игнорируются.', 'Skips and repeats are ignored.') },
        { title: L('Респаун', 'Респаун', 'Respawn'), code: 'local p = Simulator.addPlayer("Alex")\np.CharacterAdded:Connect(function(ch)\n  print("New character for", p.Name)\nend)\nlocal hum = p.Character.Humanoid\nhum.Died:Connect(function() print("Died!") end)\nhum.Health = 0\nSimulator.respawn(p)', note: L('Після смерті — новий персонаж.', 'После смерти — новый персонаж.', 'A new character after death.') }
      ],
      task: {
        text: L(`Збери обі:
<ol><li>Папка <code>Checkpoints</code> з етапами <code>Stage1..Stage3</code> (атрибут <code>Stage</code>) і деталь <code>Lava</code></li><li>У <code>PlayerAdded</code> — leaderstats з <code>IntValue</code> <code>Stage = 1</code> і обробник <code>CharacterAdded</code>, що виводить <code>NAME spawned at stage N</code></li><li>Дотик до етапу: якщо номер = поточний + 1 — оновлює й виводить <code>NAME reached stage N</code></li><li>Лава: <code>Health = 0</code></li></ol>
Сценарій (вже в стартовому коді): Alex заходить → торкається Stage2 → Stage3 → Stage2 → лава → респаун.`,
          `Собери обби:
<ol><li>Папка <code>Checkpoints</code> с этапами <code>Stage1..Stage3</code> (атрибут <code>Stage</code>) и деталь <code>Lava</code></li><li>В <code>PlayerAdded</code> — leaderstats с <code>IntValue</code> <code>Stage = 1</code> и обработчик <code>CharacterAdded</code>, выводящий <code>NAME spawned at stage N</code></li><li>Касание этапа: если номер = текущий + 1 — обновляет и выводит <code>NAME reached stage N</code></li><li>Лава: <code>Health = 0</code></li></ol>
Сценарий (уже в стартовом коде): Alex заходит → касается Stage2 → Stage3 → Stage2 → лава → респаун.`,
          `Build the obby:
<ol><li>A <code>Checkpoints</code> folder with stages <code>Stage1..Stage3</code> (attribute <code>Stage</code>) and a <code>Lava</code> part</li><li>In <code>PlayerAdded</code>: leaderstats with an <code>IntValue</code> <code>Stage = 1</code> and a <code>CharacterAdded</code> handler printing <code>NAME spawned at stage N</code></li><li>Touching a stage: if its number = current + 1, update and print <code>NAME reached stage N</code></li><li>Lava: <code>Health = 0</code></li></ol>
The scenario (already in the starter): Alex joins → touches Stage2 → Stage3 → Stage2 → lava → respawn.`),
        how: [L('У симуляторі персонаж уже існує, коли спрацьовує PlayerAdded, і одразу після нього спрацьовує CharacterAdded — тому підключай CharacterAdded всередині PlayerAdded.', 'В симуляторе персонаж уже существует, когда срабатывает PlayerAdded, и сразу после него срабатывает CharacterAdded — поэтому подключай CharacterAdded внутри PlayerAdded.', 'In the simulator CharacterAdded fires right after PlayerAdded, so connect it inside PlayerAdded.'), L('Гравець за деталлю: <code>Players:GetPlayerFromCharacter(hit.Parent)</code>.', 'Игрок по детали: <code>Players:GetPlayerFromCharacter(hit.Parent)</code>.', 'Player from a part: <code>Players:GetPlayerFromCharacter(hit.Parent)</code>.')],
        starter: 'local Players = game:GetService("Players")\n\n-- 1. Етапи та лава\n\n-- 2. PlayerAdded\n\n-- 3. Дотики\n\n-- Сценарій\nlocal alex = Simulator.addPlayer("Alex")\nlocal folder = workspace.Checkpoints\nSimulator.touch(folder.Stage2, alex.Character.Head)\nSimulator.touch(folder.Stage3, alex.Character.Head)\nSimulator.touch(folder.Stage2, alex.Character.Head)\nSimulator.touch(workspace.Lava, alex.Character.Head)\nSimulator.respawn(alex)\n',
        solution: 'local Players = game:GetService("Players")\n\n-- 1. Етапи та лава\nlocal checkpoints = Instance.new("Folder")\ncheckpoints.Name = "Checkpoints"\ncheckpoints.Parent = workspace\n\nfor i = 1, 3 do\n  local stage = Instance.new("Part")\n  stage.Name = `Stage{i}`\n  stage.Anchored = true\n  stage:SetAttribute("Stage", i)\n  stage.Parent = checkpoints\n\n  stage.Touched:Connect(function(hit)\n    local player = Players:GetPlayerFromCharacter(hit.Parent)\n    if not player then return end\n    local current = player.leaderstats.Stage\n    if i == current.Value + 1 then\n      current.Value = i\n      print(`{player.Name} reached stage {i}`)\n    end\n  end)\nend\n\nlocal lava = Instance.new("Part")\nlava.Name = "Lava"\nlava.Anchored = true\nlava.Parent = workspace\nlava.Touched:Connect(function(hit)\n  local hum = hit.Parent:FindFirstChild("Humanoid")\n  if hum then\n    hum.Health = 0\n  end\nend)\n\n-- 2. PlayerAdded\nPlayers.PlayerAdded:Connect(function(player)\n  local stats = Instance.new("Folder")\n  stats.Name = "leaderstats"\n  stats.Parent = player\n  local stage = Instance.new("IntValue")\n  stage.Name = "Stage"\n  stage.Value = 1\n  stage.Parent = stats\n\n  player.CharacterAdded:Connect(function(character)\n    print(`{player.Name} spawned at stage {stage.Value}`)\n  end)\nend)\n\n-- Сценарій\nlocal alex = Simulator.addPlayer("Alex")\nlocal folder = workspace.Checkpoints\nSimulator.touch(folder.Stage2, alex.Character.Head)\nSimulator.touch(folder.Stage3, alex.Character.Head)\nSimulator.touch(folder.Stage2, alex.Character.Head)\nSimulator.touch(workspace.Lava, alex.Character.Head)\nSimulator.respawn(alex)',
        hint: L('Очікувано 4 рядки: spawned 1, reached 2, reached 3, spawned 3.', 'Ожидается 4 строки: spawned 1, reached 2, reached 3, spawned 3.', 'Expected 4 lines: spawned 1, reached 2, reached 3, spawned 3.'),
        expected: 'Alex spawned at stage 1\nAlex reached stage 2\nAlex reached stage 3\nAlex spawned at stage 3',
        must: /SetAttribute[\s\S]*leaderstats[\s\S]*CharacterAdded/
      },
      quiz: { q: L('Яка умова чекпойнта не дає перескочити етапи?', 'Какое условие чекпойнта не даёт перескочить этапы?', 'Which checkpoint condition prevents skipping?'), options: ['stage > current', 'stage == current + 1', 'stage ~= current'], answer: 1, explain: L('Лише наступний етап.', 'Только следующий этап.', 'Only the next stage.') },
      ref: [{ code: 'part:SetAttribute(k, v) / GetAttribute(k)', d: L('атрибути', 'атрибуты', 'attributes') }, { code: 'Players:GetPlayerFromCharacter(model)', d: L('гравець за персонажем', 'игрок по персонажу', 'player from character') }]
    },
    {
      id: 'project-simulator', chapter: CH7, project: true,
      title: L('Проєкт: симулятор монет із магазином', 'Проект: симулятор монет с магазином', 'Project: coin simulator with a shop'),
      theory: L(
        `<p>Фінальний проєкт — міні-<b>симулятор</b>, як найпопулярніші ігри Roblox. Він поєднує все:</p>
<ol><li><b>Модуль Config</b> — ціни й нагороди в одному місці</li><li><b>leaderstats</b> — монети гравця</li><li><b>Монети у світі</b> — шаблон клонується в папку <code>Coins</code>; дотик дає нагороду й знищує монету (знищення — природний debounce)</li><li><b>Магазин через RemoteEvent</b> — клієнт просить «купити швидкість», сервер перевіряє гроші й збільшує <code>WalkSpeed</code></li><li><b>Збереження</b> — DataStore при виході й завантаження при вході</li></ol>
<p>Це справжня архітектура: дані на сервері, клієнт лише просить, усі числа — в конфігурації.</p>`,
        `<p>Финальный проект — мини-<b>симулятор</b>, как самые популярные игры Roblox. Он объединяет всё:</p>
<ol><li><b>Модуль Config</b> — цены и награды в одном месте</li><li><b>leaderstats</b> — монеты игрока</li><li><b>Монеты в мире</b> — шаблон клонируется в папку <code>Coins</code>; касание даёт награду и уничтожает монету (уничтожение — естественный debounce)</li><li><b>Магазин через RemoteEvent</b> — клиент просит «купить скорость», сервер проверяет деньги и увеличивает <code>WalkSpeed</code></li><li><b>Сохранение</b> — DataStore при выходе и загрузка при входе</li></ol>
<p>Это настоящая архитектура: данные на сервере, клиент только просит, все числа — в конфигурации.</p>`,
        `<p>The final project is a mini <b>simulator</b>, like Roblox’s most popular games. It combines everything:</p>
<ol><li><b>A Config module</b> — prices and rewards in one place</li><li><b>leaderstats</b> — the player’s coins</li><li><b>Coins in the world</b> — a template cloned into a <code>Coins</code> folder; touching gives a reward and destroys the coin (destroying is a natural debounce)</li><li><b>A shop via RemoteEvent</b> — the client asks to “buy speed”, the server checks money and raises <code>WalkSpeed</code></li><li><b>Saving</b> — DataStore on leave, loading on join</li></ol>
<p>This is real architecture: data on the server, the client only asks, every number in config.</p>`),
      why: L(`<p>Чому монета знищується одразу при дотику? Це найпростіший і найнадійніший debounce: знищену монету вже не можна торкнутися вдруге. А перевірка <code>coin.Parent</code> захищає, якщо дві частини тіла торкнулися в один момент.</p>`,
        `<p>Почему монета уничтожается сразу при касании? Это самый простой и надёжный debounce: уничтоженную монету уже нельзя коснуться второй раз. А проверка <code>coin.Parent</code> защищает, если две части тела коснулись в один момент.</p>`,
        `<p>Why destroy the coin immediately on touch? It’s the simplest, most reliable debounce: a destroyed coin can’t be touched again. Checking <code>coin.Parent</code> protects against two body parts touching at the same moment.</p>`),
      mistakes: L(`<ul><li>Продавати швидкість без перевірки грошей на сервері.</li><li>Не зберігати дані при виході — гравець утратить усе.</li></ul>`,
        `<ul><li>Продавать скорость без проверки денег на сервере.</li><li>Не сохранять данные при выходе — игрок потеряет всё.</li></ul>`,
        `<ul><li>Selling speed without checking money on the server.</li><li>Not saving on leave — the player loses everything.</li></ul>`),
      examples: [
        { title: 'Config', code: 'local Config = {\n  COIN_VALUE = 5,\n  SPEED_PRICE = 10,\n  SPEED_BONUS = 4,\n}\nprint(`Coin = {Config.COIN_VALUE}, speed costs {Config.SPEED_PRICE}`)', note: L('Усі числа — тут.', 'Все числа — здесь.', 'All numbers live here.') },
        { title: L('Монети-клони', 'Монеты-клоны', 'Coin clones'), code: 'local folder = Instance.new("Folder", workspace)\nfolder.Name = "Coins"\nlocal template = Instance.new("Part")\ntemplate.Name = "Coin"\nfor i = 1, 3 do\n  local c = template:Clone()\n  c.Position = Vector3.new(i * 6, 2, 0)\n  c.Parent = folder\n  c.Touched:Connect(function()\n    if not c.Parent then return end\n    c:Destroy()\n    print("Collected coin", i, "| left:", #folder:GetChildren())\n  end)\nend\nlocal foot = Instance.new("Part")\nSimulator.touch(folder:GetChildren()[1], foot)', note: L('Знищення = debounce.', 'Уничтожение = debounce.', 'Destroying = debounce.') },
        { title: L('Покупка', 'Покупка', 'Purchase'), code: 'local RS = game:GetService("ReplicatedStorage")\nlocal buy = Instance.new("RemoteEvent", RS)\nlocal p = Simulator.addPlayer("Ira")\nlocal money = 12\nbuy.OnServerEvent:Connect(function(player)\n  if money < 10 then print("Need 10 coins") return end\n  money -= 10\n  local hum = player.Character.Humanoid\n  hum.WalkSpeed += 4\n  print("Speed:", hum.WalkSpeed, "money:", money)\nend)\nbuy:FireServer()\nbuy:FireServer()', note: L('Сервер перевіряє гроші.', 'Сервер проверяет деньги.', 'The server checks money.') }
      ],
      task: {
        text: L(`Збери симулятор (сценарій уже в стартовому коді):
<ol><li><code>Config</code>: <code>COIN_VALUE = 5</code>, <code>SPEED_PRICE = 10</code>, <code>SPEED_BONUS = 4</code></li><li><code>PlayerAdded</code>: leaderstats.Coins з DataStore (<code>GetAsync(player.UserId)</code> або 0), вивід <code>NAME loaded N coins</code></li><li>3 монети в папці <code>Coins</code>: дотик гравця дає <code>COIN_VALUE</code> і знищує монету</li><li>RemoteEvent <code>BuySpeed</code> у ReplicatedStorage: якщо монет достатньо — знімає ціну, додає швидкість і виводить <code>NAME speed N, coins M</code>, інакше <code>NAME needs more coins</code></li><li><code>PlayerRemoving</code>: зберігає монети й виводить <code>NAME saved N coins</code></li></ol>`,
          `Собери симулятор (сценарий уже в стартовом коде):
<ol><li><code>Config</code>: <code>COIN_VALUE = 5</code>, <code>SPEED_PRICE = 10</code>, <code>SPEED_BONUS = 4</code></li><li><code>PlayerAdded</code>: leaderstats.Coins из DataStore (<code>GetAsync(player.UserId)</code> или 0), вывод <code>NAME loaded N coins</code></li><li>3 монеты в папке <code>Coins</code>: касание игрока даёт <code>COIN_VALUE</code> и уничтожает монету</li><li>RemoteEvent <code>BuySpeed</code> в ReplicatedStorage: если монет достаточно — снимает цену, добавляет скорость и выводит <code>NAME speed N, coins M</code>, иначе <code>NAME needs more coins</code></li><li><code>PlayerRemoving</code>: сохраняет монеты и выводит <code>NAME saved N coins</code></li></ol>`,
          `Build the simulator (the scenario is already in the starter):
<ol><li><code>Config</code>: <code>COIN_VALUE = 5</code>, <code>SPEED_PRICE = 10</code>, <code>SPEED_BONUS = 4</code></li><li><code>PlayerAdded</code>: leaderstats.Coins from DataStore (<code>GetAsync(player.UserId)</code> or 0), print <code>NAME loaded N coins</code></li><li>3 coins in a <code>Coins</code> folder: a player’s touch gives <code>COIN_VALUE</code> and destroys the coin</li><li>RemoteEvent <code>BuySpeed</code> in ReplicatedStorage: with enough coins subtract the price, add speed and print <code>NAME speed N, coins M</code>, otherwise <code>NAME needs more coins</code></li><li><code>PlayerRemoving</code>: save coins and print <code>NAME saved N coins</code></li></ol>`),
        how: [L('Сценарій: Alex збирає 3 монети (15), купує швидкість (16 → 20, лишається 5), пробує ще раз (не вистачає), виходить і заходить знову.', 'Сценарий: Alex собирает 3 монеты (15), покупает скорость (16 → 20, остаётся 5), пробует ещё раз (не хватает), выходит и заходит снова.', 'Scenario: Alex collects 3 coins (15), buys speed (16 → 20, 5 left), tries again (not enough), leaves and rejoins.'), L('Монети: <code>for i = 1, 3</code> з <code>template:Clone()</code>.', 'Монеты: <code>for i = 1, 3</code> с <code>template:Clone()</code>.', 'Coins: <code>for i = 1, 3</code> with <code>template:Clone()</code>.')],
        starter: 'local Players = game:GetService("Players")\nlocal RS = game:GetService("ReplicatedStorage")\nlocal store = game:GetService("DataStoreService"):GetDataStore("Simulator")\n\n-- твій код тут\n\n-- Сценарій\nlocal alex = Simulator.addPlayer("Alex")\nfor _, coin in ipairs(workspace.Coins:GetChildren()) do\n  Simulator.touch(coin, alex.Character.Head)\nend\nRS.BuySpeed:FireServer()\nRS.BuySpeed:FireServer()\nSimulator.removePlayer(alex)\nSimulator.addPlayer("Alex")\n',
        solution: 'local Players = game:GetService("Players")\nlocal RS = game:GetService("ReplicatedStorage")\nlocal store = game:GetService("DataStoreService"):GetDataStore("Simulator")\n\nlocal Config = {\n  COIN_VALUE = 5,\n  SPEED_PRICE = 10,\n  SPEED_BONUS = 4,\n}\n\nPlayers.PlayerAdded:Connect(function(player)\n  local ok, saved = pcall(function()\n    return store:GetAsync(player.UserId)\n  end)\n  local stats = Instance.new("Folder")\n  stats.Name = "leaderstats"\n  stats.Parent = player\n  local coins = Instance.new("IntValue")\n  coins.Name = "Coins"\n  coins.Value = (ok and saved) or 0\n  coins.Parent = stats\n  print(`{player.Name} loaded {coins.Value} coins`)\nend)\n\nPlayers.PlayerRemoving:Connect(function(player)\n  local value = player.leaderstats.Coins.Value\n  pcall(function()\n    store:SetAsync(player.UserId, value)\n  end)\n  print(`{player.Name} saved {value} coins`)\nend)\n\nlocal folder = Instance.new("Folder")\nfolder.Name = "Coins"\nfolder.Parent = workspace\nlocal template = Instance.new("Part")\ntemplate.Name = "Coin"\nfor i = 1, 3 do\n  local coin = template:Clone()\n  coin.Position = Vector3.new(i * 8, 2, 0)\n  coin.Parent = folder\n  coin.Touched:Connect(function(hit)\n    local player = Players:GetPlayerFromCharacter(hit.Parent)\n    if not player or not coin.Parent then return end\n    coin:Destroy()\n    player.leaderstats.Coins.Value += Config.COIN_VALUE\n  end)\nend\n\nlocal buySpeed = Instance.new("RemoteEvent")\nbuySpeed.Name = "BuySpeed"\nbuySpeed.Parent = RS\nbuySpeed.OnServerEvent:Connect(function(player)\n  local coins = player.leaderstats.Coins\n  if coins.Value < Config.SPEED_PRICE then\n    print(`{player.Name} needs more coins`)\n    return\n  end\n  coins.Value -= Config.SPEED_PRICE\n  local hum = player.Character.Humanoid\n  hum.WalkSpeed += Config.SPEED_BONUS\n  print(`{player.Name} speed {hum.WalkSpeed}, coins {coins.Value}`)\nend)\n\n-- Сценарій\nlocal alex = Simulator.addPlayer("Alex")\nfor _, coin in ipairs(workspace.Coins:GetChildren()) do\n  Simulator.touch(coin, alex.Character.Head)\nend\nRS.BuySpeed:FireServer()\nRS.BuySpeed:FireServer()\nSimulator.removePlayer(alex)\nSimulator.addPlayer("Alex")',
        hint: L('Після повернення — <code>Alex loaded 5 coins</code>: той самий акаунт має той самий UserId.', 'После возвращения — <code>Alex loaded 5 coins</code>. Подсказка: ключ хранения — UserId.', 'After rejoining: <code>Alex loaded 5 coins</code>. Hint: the storage key is the UserId.'),
        expected: 'Alex loaded 0 coins\nAlex speed 20, coins 5\nAlex needs more coins\nAlex saved 5 coins\nAlex loaded 5 coins',
        must: /^(?=[\s\S]*OnServerEvent)(?=[\s\S]*SetAsync)(?=[\s\S]*leaderstats)/
      },
      quiz: { q: L('Де мають жити ціни товарів?', 'Где должны жить цены товаров?', 'Where should item prices live?'), options: [L('у LocalScript', 'в LocalScript', 'in a LocalScript'), L('на сервері (Config-модуль)', 'на сервере (Config-модуль)', 'on the server (a Config module)'), L('у тексті кнопки', 'в тексте кнопки', 'in the button text')], answer: 1, explain: L('Клієнт може змінити будь-що своє.', 'Клиент может изменить что угодно у себя.', 'The client can change anything on its side.') },
      ref: [{ code: 'Config + leaderstats + RemoteEvent + DataStore', d: L('архітектура симулятора', 'архитектура симулятора', 'simulator architecture') }]
    }
  ]);
})();
