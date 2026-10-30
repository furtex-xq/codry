// Python — частина 2: цикли та колекції.
(function () {
  const L = Codry.L;
  const CH3 = L('Цикли', 'Циклы', 'Loops');
  const CH4 = L('Рядки та колекції', 'Строки и коллекции', 'Strings and collections');

  Codry.steps('python', [
    {
      id: 'while', chapter: CH3,
      title: L('Цикл while', 'Цикл while', 'The while loop'),
      theory: L(
        `<p><b>Цикл</b> повторює блок коду. Цикл <code>while</code> («поки») повторює, <b>поки умова істинна</b>:</p>
<pre class="inline-code">count = 1
while count <= 3:
    print(count)
    count += 1</pre>
<p>Як це працює: Python перевіряє умову → якщо True, виконує тіло → повертається до умови → і так далі. Коли умова стає False, цикл завершується і програма йде далі.</p>
<p>Кожне повторення називається <b>ітерацією</b>. Усередині тіла обов’язково щось має змінюватися, щоб умова колись стала хибною.</p>`,
        `<p><b>Цикл</b> повторяет блок кода. Цикл <code>while</code> («пока») повторяет, <b>пока условие истинно</b>:</p>
<pre class="inline-code">count = 1
while count <= 3:
    print(count)
    count += 1</pre>
<p>Как это работает: Python проверяет условие → если True, выполняет тело → возвращается к условию → и так далее. Когда условие становится False, цикл завершается и программа идёт дальше.</p>
<p>Каждое повторение называется <b>итерацией</b>. Внутри тела обязательно что-то должно меняться, чтобы условие когда-то стало ложным.</p>`,
        `<p>A <b>loop</b> repeats a block of code. The <code>while</code> loop repeats <b>as long as the condition is true</b>:</p>
<pre class="inline-code">count = 1
while count <= 3:
    print(count)
    count += 1</pre>
<p>How it works: Python checks the condition → if True runs the body → goes back to the condition → and so on. When the condition becomes False the loop ends and the program continues.</p>
<p>Each repetition is an <b>iteration</b>. Something inside the body must change so the condition eventually becomes false.</p>`),
      why: L(`<p><code>while</code> потрібен, коли ти <b>не знаєш заздалегідь</b>, скільки буде повторень: поки гравець живий, поки пароль неправильний, поки грошей достатньо.</p>`,
        `<p><code>while</code> нужен, когда ты <b>не знаешь заранее</b>, сколько будет повторений: пока игрок жив, пока пароль неправильный, пока денег достаточно.</p>`,
        `<p><code>while</code> is for when you <b>don’t know in advance</b> how many repetitions there will be: while the player is alive, while the password is wrong, while there’s enough money.</p>`),
      mistakes: L(`<ul><li>Забули змінити змінну (<code>count += 1</code>) → <b>нескінченний цикл</b>. Codry зупинить його, але в реальній програмі вона зависне.</li><li>Неправильна межа: <code>&lt;</code> замість <code>&lt;=</code> — на одну ітерацію менше.</li></ul>`,
        `<ul><li>Забыли изменить переменную (<code>count += 1</code>) → <b>бесконечный цикл</b>. Codry остановит его, но в реальной программе она зависнет.</li><li>Неправильная граница: <code>&lt;</code> вместо <code>&lt;=</code> — на одну итерацию меньше.</li></ul>`,
        `<ul><li>Forgetting to change the variable (<code>count += 1</code>) → an <b>infinite loop</b>. Codry stops it, but a real program would freeze.</li><li>Wrong boundary: <code>&lt;</code> instead of <code>&lt;=</code> — one iteration fewer.</li></ul>`),
      examples: [
        { title: L('Лічба', 'Счёт', 'Counting'), code: 'n = 1\nwhile n <= 5:\n    print("Step", n)\n    n += 1\nprint("Finished")', note: L('Після циклу виконання йде далі.', 'После цикла выполнение идёт дальше.', 'Execution continues after the loop.') },
        { title: L('Зворотний відлік', 'Обратный отсчёт', 'Countdown'), code: 'seconds = 5\nwhile seconds > 0:\n    print(seconds)\n    seconds -= 1\nprint("Liftoff!")', note: L('Змінна може і зменшуватися.', 'Переменная может и уменьшаться.', 'The variable can decrease too.') },
        { title: L('Накопичення', 'Накопление', 'Accumulating'), code: 'money = 0\ndays = 0\nwhile money < 100:\n    money += 15\n    days += 1\nprint(f"{days} days to save {money}")', note: L('Не знаємо кількості днів наперед — тому while.', 'Не знаем количество дней заранее — поэтому while.', 'We don’t know the number of days ahead — hence while.') },
        { title: L('Подвоєння', 'Удвоение', 'Doubling'), code: 'x = 1\nsteps = 0\nwhile x < 1000:\n    x *= 2\n    steps += 1\nprint(x, steps)', note: L('За 10 подвоєнь 1 стає 1024.', 'За 10 удвоений 1 становится 1024.', 'In 10 doublings 1 becomes 1024.') }
      ],
      task: {
        text: L('Виведи числа від 10 до 50 з кроком 10 (10, 20, 30, 40, 50) за допомогою <code>while</code>, кожне з нового рядка.', 'Выведи числа от 10 до 50 с шагом 10 (10, 20, 30, 40, 50) с помощью <code>while</code>, каждое с новой строки.', 'Print the numbers from 10 to 50 in steps of 10 (10, 20, 30, 40, 50) using <code>while</code>, each on a new line.'),
        how: [L('Почни з <code>n = 10</code>.', 'Начни с <code>n = 10</code>.', 'Start with <code>n = 10</code>.'), L('Умова <code>n &lt;= 50</code>.', 'Условие <code>n &lt;= 50</code>.', 'Condition <code>n &lt;= 50</code>.'), L('У тілі: <code>print(n)</code> і <code>n += 10</code>.', 'В теле: <code>print(n)</code> и <code>n += 10</code>.', 'In the body: <code>print(n)</code> and <code>n += 10</code>.')],
        starter: 'n = 10\n',
        solution: 'n = 10\nwhile n <= 50:\n    print(n)\n    n += 10',
        hint: L('Без <code>n += 10</code> цикл стане нескінченним.', 'Без <code>n += 10</code> цикл станет бесконечным.', 'Without <code>n += 10</code> the loop never ends.'),
        expected: '10\n20\n30\n40\n50',
        must: /while/
      },
      quiz: { q: L('Скільки разів виконається тіло: <code>i = 0; while i &lt; 3: i += 1</code>?', 'Сколько раз выполнится тело: <code>i = 0; while i &lt; 3: i += 1</code>?', 'How many times does the body run: <code>i = 0; while i &lt; 3: i += 1</code>?'), options: ['2', '3', '4'], answer: 1, explain: L('i = 0, 1, 2 — три рази.', 'i = 0, 1, 2 — три раза.', 'i = 0, 1, 2 — three times.') },
      ref: [{ code: 'while cond:', d: L('повторювати, поки умова істинна', 'повторять, пока условие истинно', 'repeat while the condition is true') }]
    },
    {
      id: 'for-range', chapter: CH3,
      title: L('Цикл for і range()', 'Цикл for и range()', 'The for loop and range()'),
      theory: L(
        `<p>Цикл <code>for</code> проходить по <b>послідовності</b> елементів. Найчастіше — по числах із <code>range()</code>:</p>
<pre class="inline-code">for i in range(5):
    print(i)      # 0 1 2 3 4</pre>
<ul><li><code>range(5)</code> — від 0 до 4 (5 чисел, кінець <b>не включається</b>)</li><li><code>range(1, 6)</code> — від 1 до 5</li><li><code>range(0, 10, 2)</code> — 0, 2, 4, 6, 8 (третій аргумент — крок)</li><li><code>range(5, 0, -1)</code> — 5, 4, 3, 2, 1</li></ul>
<p>Змінна <code>i</code> на кожній ітерації отримує наступне значення. Ім’я змінної довільне.</p>
<p><code>for</code> також перебирає символи рядка: <code>for ch in "hello":</code>.</p>`,
        `<p>Цикл <code>for</code> проходит по <b>последовательности</b> элементов. Чаще всего — по числам из <code>range()</code>:</p>
<pre class="inline-code">for i in range(5):
    print(i)      # 0 1 2 3 4</pre>
<ul><li><code>range(5)</code> — от 0 до 4 (5 чисел, конец <b>не включается</b>)</li><li><code>range(1, 6)</code> — от 1 до 5</li><li><code>range(0, 10, 2)</code> — 0, 2, 4, 6, 8 (третий аргумент — шаг)</li><li><code>range(5, 0, -1)</code> — 5, 4, 3, 2, 1</li></ul>
<p>Переменная <code>i</code> на каждой итерации получает следующее значение. Имя переменной произвольное.</p>
<p><code>for</code> также перебирает символы строки: <code>for ch in "hello":</code>.</p>`,
        `<p>The <code>for</code> loop walks through a <b>sequence</b> of items. Most often numbers from <code>range()</code>:</p>
<pre class="inline-code">for i in range(5):
    print(i)      # 0 1 2 3 4</pre>
<ul><li><code>range(5)</code> — 0 to 4 (5 numbers, the end is <b>excluded</b>)</li><li><code>range(1, 6)</code> — 1 to 5</li><li><code>range(0, 10, 2)</code> — 0, 2, 4, 6, 8 (the third argument is the step)</li><li><code>range(5, 0, -1)</code> — 5, 4, 3, 2, 1</li></ul>
<p>On each iteration <code>i</code> takes the next value. The variable name is up to you.</p>
<p><code>for</code> also iterates over the characters of a string: <code>for ch in "hello":</code>.</p>`),
      why: L(`<p>Чому кінець не включається? Так <code>range(n)</code> дає рівно <code>n</code> чисел, а <code>range(a, b)</code> — рівно <code>b - a</code>. Плюс нумерація з нуля збігається з індексами списків, які ти скоро вивчиш.</p>`,
        `<p>Почему конец не включается? Так <code>range(n)</code> даёт ровно <code>n</code> чисел, а <code>range(a, b)</code> — ровно <code>b - a</code>. Плюс нумерация с нуля совпадает с индексами списков, которые ты скоро изучишь.</p>`,
        `<p>Why is the end excluded? So <code>range(n)</code> gives exactly <code>n</code> numbers and <code>range(a, b)</code> exactly <code>b - a</code>. Plus zero-based counting matches list indices you’ll learn soon.</p>`),
      mistakes: L(`<ul><li>Чекати, що <code>range(1, 10)</code> включає 10 — ні, лише до 9.</li><li>Змінювати <code>i</code> всередині for — на наступній ітерації вона все одно отримає нове значення.</li></ul>`,
        `<ul><li>Ждать, что <code>range(1, 10)</code> включает 10 — нет, только до 9.</li><li>Менять <code>i</code> внутри for — на следующей итерации она всё равно получит новое значение.</li></ul>`,
        `<ul><li>Expecting <code>range(1, 10)</code> to include 10 — it stops at 9.</li><li>Changing <code>i</code> inside the for — it gets the next value anyway.</li></ul>`),
      examples: [
        { title: 'range(n)', code: 'for i in range(3):\n    print("Hello", i)', note: L('Три повторення: i = 0, 1, 2.', 'Три повторения: i = 0, 1, 2.', 'Three repetitions: i = 0, 1, 2.') },
        { title: L('Початок і крок', 'Начало и шаг', 'Start and step'), code: 'for n in range(2, 11, 2):\n    print(n, end=" ")\nprint()\nfor n in range(5, 0, -1):\n    print(n, end=" ")', note: L('Від’ємний крок рахує назад.', 'Отрицательный шаг считает назад.', 'A negative step counts backwards.') },
        { title: L('Сума', 'Сумма', 'Sum'), code: 'total = 0\nfor n in range(1, 101):\n    total += n\nprint("1 + 2 + ... + 100 =", total)', note: L('Накопичення суми — одна з найчастіших задач.', 'Накопление суммы — одна из самых частых задач.', 'Accumulating a sum is a very common task.') },
        { title: L('По рядку', 'По строке', 'Over a string'), code: 'word = "Codry"\nfor letter in word:\n    print(letter * 3)', note: L('Цикл по кожній літері.', 'Цикл по каждой букве.', 'Loop over each letter.') }
      ],
      task: {
        text: L('Виведи таблицю множення на 7 від <code>7 x 1 = 7</code> до <code>7 x 5 = 35</code> (5 рядків).', 'Выведи таблицу умножения на 7 от <code>7 x 1 = 7</code> до <code>7 x 5 = 35</code> (5 строк).', 'Print the 7 times table from <code>7 x 1 = 7</code> to <code>7 x 5 = 35</code> (5 lines).'),
        how: [L('<code>for i in range(1, 6):</code>', '<code>for i in range(1, 6):</code>', '<code>for i in range(1, 6):</code>'), L('Усередині — f-рядок <code>f"7 x {i} = {7 * i}"</code>.', 'Внутри — f-строка <code>f"7 x {i} = {7 * i}"</code>.', 'Inside — the f-string <code>f"7 x {i} = {7 * i}"</code>.')],
        starter: '',
        solution: 'for i in range(1, 6):\n    print(f"7 x {i} = {7 * i}")',
        hint: L('<code>range(1, 6)</code> дає 1, 2, 3, 4, 5.', '<code>range(1, 6)</code> даёт 1, 2, 3, 4, 5.', '<code>range(1, 6)</code> gives 1, 2, 3, 4, 5.'),
        expected: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35',
        must: /for\s+\w+\s+in\s+range/
      },
      quiz: { q: L('Які числа дає <code>range(2, 8, 3)</code>?', 'Какие числа даёт <code>range(2, 8, 3)</code>?', 'Which numbers does <code>range(2, 8, 3)</code> give?'), options: ['2, 5', '2, 5, 8', '3, 6'], answer: 0, explain: L('2, 5; наступне 8 вже не входить.', '2, 5; следующее 8 уже не входит.', '2, 5; the next one, 8, is excluded.') },
      ref: [{ code: 'for i in range(a, b, step):', d: L('цикл по числах', 'цикл по числам', 'loop over numbers') }, { code: 'for ch in text:', d: L('по символах', 'по символам', 'over characters') }]
    },
    {
      id: 'break-continue', chapter: CH3,
      title: L('break і continue', 'break и continue', 'break and continue'),
      theory: L(
        `<p>Двома командами можна керувати циклом зсередини:</p>
<ul><li><code>break</code> — <b>негайно завершити</b> цикл.</li><li><code>continue</code> — <b>пропустити</b> решту поточної ітерації і перейти до наступної.</li></ul>
<pre class="inline-code">for n in range(1, 10):
    if n == 5:
        break        # зупинитися на 5
    if n % 2 == 0:
        continue     # пропустити парні
    print(n)         # 1 3</pre>
<p>Часто використовують «нескінченний» цикл <code>while True:</code> з <code>break</code> усередині — коли умова виходу з’являється посередині тіла.</p>`,
        `<p>Двумя командами можно управлять циклом изнутри:</p>
<ul><li><code>break</code> — <b>немедленно завершить</b> цикл.</li><li><code>continue</code> — <b>пропустить</b> остаток текущей итерации и перейти к следующей.</li></ul>
<pre class="inline-code">for n in range(1, 10):
    if n == 5:
        break        # остановиться на 5
    if n % 2 == 0:
        continue     # пропустить чётные
    print(n)         # 1 3</pre>
<p>Часто используют «бесконечный» цикл <code>while True:</code> с <code>break</code> внутри — когда условие выхода появляется посередине тела.</p>`,
        `<p>Two commands control a loop from inside:</p>
<ul><li><code>break</code> — <b>stop the loop immediately</b>.</li><li><code>continue</code> — <b>skip</b> the rest of this iteration and move to the next.</li></ul>
<pre class="inline-code">for n in range(1, 10):
    if n == 5:
        break        # stop at 5
    if n % 2 == 0:
        continue     # skip even numbers
    print(n)         # 1 3</pre>
<p>A common pattern is an “infinite” <code>while True:</code> loop with a <code>break</code> inside — when the exit condition appears in the middle of the body.</p>`),
      why: L(`<p>Навіщо <code>break</code>, якщо є умова циклу? Іноді вихід потрібен лише в певній точці: знайшли потрібний елемент — далі шукати немає сенсу. Це економить час і робить код простішим.</p>`,
        `<p>Зачем <code>break</code>, если есть условие цикла? Иногда выход нужен только в определённой точке: нашли нужный элемент — дальше искать нет смысла. Это экономит время и делает код проще.</p>`,
        `<p>Why <code>break</code> if loops have conditions? Sometimes you need to exit at a specific point: once you’ve found what you need there’s no point searching further. It saves time and keeps code simple.</p>`),
      mistakes: L(`<ul><li><code>while True</code> без <code>break</code> — програма ніколи не закінчиться.</li><li><code>continue</code> у <code>while</code> до зміни лічильника → нескінченний цикл.</li></ul>`,
        `<ul><li><code>while True</code> без <code>break</code> — программа никогда не закончится.</li><li><code>continue</code> в <code>while</code> до изменения счётчика → бесконечный цикл.</li></ul>`,
        `<ul><li><code>while True</code> without <code>break</code> — the program never ends.</li><li><code>continue</code> in a <code>while</code> before updating the counter → infinite loop.</li></ul>`),
      examples: [
        { title: 'break', code: 'for n in range(1, 100):\n    if n * n > 50:\n        print("First square over 50:", n * n)\n        break', note: L('Шукаємо перше число, що підходить, і виходимо.', 'Ищем первое подходящее число и выходим.', 'Find the first match and exit.') },
        { title: 'continue', code: 'for n in range(1, 11):\n    if n % 3 == 0:\n        continue\n    print(n, end=" ")', note: L('Числа, кратні 3, пропущено.', 'Числа, кратные 3, пропущены.', 'Multiples of 3 are skipped.') },
        { title: 'while True', code: 'attempts = 0\nwhile True:\n    attempts += 1\n    if attempts == 3:\n        print("Got it on attempt", attempts)\n        break\n    print("Attempt", attempts, "failed")', note: L('Вихід посередині тіла.', 'Выход посередине тела.', 'Exit in the middle of the body.') },
        { title: L('Пошук', 'Поиск', 'Search'), code: 'text = "find the letter z here"\nfor i in range(len(text)):\n    if text[i] == "z":\n        print("Found z at position", i)\n        break\nelse:\n    print("Not found")', note: L('<code>else</code> у циклі виконується, якщо не було <code>break</code>.', '<code>else</code> в цикле выполняется, если не было <code>break</code>.', 'A loop’s <code>else</code> runs when there was no <code>break</code>.') }
      ],
      task: {
        text: L('Виведи числа від 1 до 20, <b>пропускаючи</b> кратні 4 (<code>continue</code>), і <b>зупинись</b> (<code>break</code>), як тільки число стане більшим за 13. Кожне число з нового рядка.', 'Выведи числа от 1 до 20, <b>пропуская</b> кратные 4 (<code>continue</code>), и <b>остановись</b> (<code>break</code>), как только число станет больше 13. Каждое число с новой строки.', 'Print numbers 1 to 20, <b>skipping</b> multiples of 4 (<code>continue</code>) and <b>stopping</b> (<code>break</code>) as soon as the number exceeds 13. Each on a new line.'),
        how: [L('<code>for n in range(1, 21):</code>', '<code>for n in range(1, 21):</code>', '<code>for n in range(1, 21):</code>'), L('Спершу перевір <code>n &gt; 13</code> → <code>break</code>.', 'Сначала проверь <code>n &gt; 13</code> → <code>break</code>.', 'First check <code>n &gt; 13</code> → <code>break</code>.'), L('Потім <code>n % 4 == 0</code> → <code>continue</code>, а далі <code>print(n)</code>.', 'Потом <code>n % 4 == 0</code> → <code>continue</code>, а дальше <code>print(n)</code>.', 'Then <code>n % 4 == 0</code> → <code>continue</code>, then <code>print(n)</code>.')],
        starter: '',
        solution: 'for n in range(1, 21):\n    if n > 13:\n        break\n    if n % 4 == 0:\n        continue\n    print(n)',
        hint: L('Очікувано: 1 2 3 5 6 7 9 10 11 13.', 'Ожидается: 1 2 3 5 6 7 9 10 11 13.', 'Expected: 1 2 3 5 6 7 9 10 11 13.'),
        expected: '1\n2\n3\n5\n6\n7\n9\n10\n11\n13',
        must: /break[\s\S]*continue|continue[\s\S]*break/
      },
      quiz: { q: L('Що робить <code>continue</code>?', 'Что делает <code>continue</code>?', 'What does <code>continue</code> do?'), options: [L('Завершує цикл', 'Завершает цикл', 'Ends the loop'), L('Переходить до наступної ітерації', 'Переходит к следующей итерации', 'Jumps to the next iteration'), L('Повторює ітерацію', 'Повторяет итерацию', 'Repeats the iteration')], answer: 1, explain: L('Решта тіла пропускається.', 'Остаток тела пропускается.', 'The rest of the body is skipped.') },
      ref: [{ code: 'break', d: L('вийти з циклу', 'выйти из цикла', 'exit the loop') }, { code: 'continue', d: L('наступна ітерація', 'следующая итерация', 'next iteration') }]
    },
    {
      id: 'nested-loops', chapter: CH3,
      title: L('Вкладені цикли', 'Вложенные циклы', 'Nested loops'),
      theory: L(
        `<p>Цикл можна покласти всередину іншого циклу. Тоді для <b>кожної</b> ітерації зовнішнього циклу внутрішній виконується <b>повністю</b>:</p>
<pre class="inline-code">for row in range(3):
    for col in range(4):
        print("*", end="")
    print()</pre>
<p>Результат — прямокутник 3×4 із зірочок. Зовнішній цикл відповідає за рядки, внутрішній — за стовпчики.</p>
<p>Загальна кількість повторень = добуток: 3 × 4 = 12 зірочок. Тому з вкладеними циклами треба бути уважним — на великих числах вони працюють повільно.</p>`,
        `<p>Цикл можно положить внутрь другого цикла. Тогда для <b>каждой</b> итерации внешнего цикла внутренний выполняется <b>полностью</b>:</p>
<pre class="inline-code">for row in range(3):
    for col in range(4):
        print("*", end="")
    print()</pre>
<p>Результат — прямоугольник 3×4 из звёздочек. Внешний цикл отвечает за строки, внутренний — за столбцы.</p>
<p>Общее количество повторений = произведение: 3 × 4 = 12 звёздочек. Поэтому с вложенными циклами нужно быть внимательным — на больших числах они работают медленно.</p>`,
        `<p>A loop can be placed inside another loop. Then for <b>each</b> iteration of the outer loop the inner loop runs <b>completely</b>:</p>
<pre class="inline-code">for row in range(3):
    for col in range(4):
        print("*", end="")
    print()</pre>
<p>The result is a 3×4 rectangle of stars. The outer loop handles rows, the inner one columns.</p>
<p>The total number of repetitions is the product: 3 × 4 = 12 stars. So be careful — nested loops get slow with big numbers.</p>`),
      why: L(`<p>Багато даних «двовимірні»: таблиці, ігрові поля, пікселі зображень, розклад. Щоб обійти кожну клітинку, потрібно пройти по рядках і в кожному рядку — по колонках.</p>`,
        `<p>Многие данные «двумерные»: таблицы, игровые поля, пиксели изображений, расписание. Чтобы обойти каждую клетку, нужно пройти по строкам и в каждой строке — по колонкам.</p>`,
        `<p>Lots of data is “two-dimensional”: tables, game boards, image pixels, timetables. To visit every cell you go through rows and, in each row, through columns.</p>`),
      mistakes: L(`<ul><li>Однакові імена змінних у обох циклах (<code>i</code> і <code>i</code>) — внутрішній зіпсує зовнішній.</li><li>Неправильний відступ у <code>print()</code> після внутрішнього циклу — перенос рядка опиниться не там.</li></ul>`,
        `<ul><li>Одинаковые имена переменных в обоих циклах (<code>i</code> и <code>i</code>) — внутренний испортит внешний.</li><li>Неправильный отступ у <code>print()</code> после внутреннего цикла — перенос строки окажется не там.</li></ul>`,
        `<ul><li>Same variable name in both loops (<code>i</code> and <code>i</code>) — the inner one breaks the outer one.</li><li>Wrong indentation of the <code>print()</code> after the inner loop — the line break ends up in the wrong place.</li></ul>`),
      examples: [
        { title: L('Прямокутник', 'Прямоугольник', 'Rectangle'), code: 'for row in range(3):\n    for col in range(5):\n        print("#", end="")\n    print()', note: L('Внутрішній цикл малює рядок, <code>print()</code> переносить.', 'Внутренний цикл рисует строку, <code>print()</code> переносит.', 'The inner loop draws a row, <code>print()</code> moves to the next line.') },
        { title: L('Трикутник', 'Треугольник', 'Triangle'), code: 'for row in range(1, 6):\n    for col in range(row):\n        print("*", end="")\n    print()', note: L('Внутрішній цикл залежить від зовнішнього.', 'Внутренний цикл зависит от внешнего.', 'The inner loop depends on the outer one.') },
        { title: L('Таблиця множення', 'Таблица умножения', 'Times table'), code: 'for a in range(1, 5):\n    for b in range(1, 5):\n        print(f"{a * b:4}", end="")\n    print()', note: L('<code>:4</code> вирівнює числа в колонки.', '<code>:4</code> выравнивает числа в колонки.', '<code>:4</code> aligns numbers into columns.') },
        { title: L('Пари', 'Пары', 'Pairs'), code: 'for x in "AB":\n    for y in "123":\n        print(x + y, end=" ")', note: L('Усі комбінації: A1 A2 A3 B1 B2 B3.', 'Все комбинации: A1 A2 A3 B1 B2 B3.', 'All combinations: A1 A2 A3 B1 B2 B3.') }
      ],
      task: {
        text: L('Намалюй «сходинки» з цифр: у рядку <code>n</code> виведи числа від 1 до <code>n</code> підряд без пробілів. Рядків — 4.<br><code>1</code><br><code>12</code><br><code>123</code><br><code>1234</code>', 'Нарисуй «ступеньки» из цифр: в строке <code>n</code> выведи числа от 1 до <code>n</code> подряд без пробелов. Строк — 4.<br><code>1</code><br><code>12</code><br><code>123</code><br><code>1234</code>', 'Draw “stairs” of digits: on line <code>n</code> print numbers 1 to <code>n</code> with no spaces. 4 lines.<br><code>1</code><br><code>12</code><br><code>123</code><br><code>1234</code>'),
        how: [L('Зовнішній: <code>for n in range(1, 5):</code>', 'Внешний: <code>for n in range(1, 5):</code>', 'Outer: <code>for n in range(1, 5):</code>'), L('Внутрішній: <code>for k in range(1, n + 1):</code> з <code>print(k, end="")</code>.', 'Внутренний: <code>for k in range(1, n + 1):</code> с <code>print(k, end="")</code>.', 'Inner: <code>for k in range(1, n + 1):</code> with <code>print(k, end="")</code>.'), L('Після внутрішнього — <code>print()</code>.', 'После внутреннего — <code>print()</code>.', 'After the inner loop — <code>print()</code>.')],
        starter: '',
        solution: 'for n in range(1, 5):\n    for k in range(1, n + 1):\n        print(k, end="")\n    print()',
        hint: L('Внутрішній цикл має йти до <code>n + 1</code>, бо кінець не включається.', 'Внутренний цикл должен идти до <code>n + 1</code>, потому что конец не включается.', 'The inner loop goes up to <code>n + 1</code> because the end is excluded.'),
        expected: '1\n12\n123\n1234',
        must: /for[\s\S]*for/
      },
      quiz: { q: L('Скільки разів виконається внутрішнє тіло: <code>for i in range(3): for j in range(4): ...</code>?', 'Сколько раз выполнится внутреннее тело: <code>for i in range(3): for j in range(4): ...</code>?', 'How many times does the inner body run: <code>for i in range(3): for j in range(4): ...</code>?'), options: ['7', '12', '4'], answer: 1, explain: '3 × 4 = 12.' },
      ref: [{ code: 'for r in ...:\\n    for c in ...:', d: L('вкладені цикли', 'вложенные циклы', 'nested loops') }]
    },
    {
      id: 'str-index', chapter: CH4,
      title: L('Рядки: індекси та зрізи', 'Строки: индексы и срезы', 'Strings: indexing and slicing'),
      theory: L(
        `<p>Рядок — це послідовність символів, кожен має <b>індекс</b> (номер). Нумерація починається з <b>0</b>:</p>
<pre class="inline-code">word = "Python"
#       P y t h o n
#       0 1 2 3 4 5
#      -6-5-4-3-2-1</pre>
<ul><li><code>word[0]</code> → <code>"P"</code>, <code>word[-1]</code> → <code>"n"</code> (від’ємні індекси рахують з кінця)</li><li><code>len(word)</code> → 6 — довжина</li></ul>
<p><b>Зріз</b> (slice) вирізає частину: <code>word[start:end]</code>, кінець не включається.</p>
<ul><li><code>word[0:3]</code> → <code>"Pyt"</code></li><li><code>word[2:]</code> → <code>"thon"</code> (до кінця)</li><li><code>word[:2]</code> → <code>"Py"</code> (з початку)</li><li><code>word[::-1]</code> → <code>"nohtyP"</code> (навпаки)</li></ul>
<p>Оператор <code>in</code> перевіряє, чи є підрядок: <code>"th" in word</code> → True.</p>`,
        `<p>Строка — это последовательность символов, у каждого есть <b>индекс</b> (номер). Нумерация начинается с <b>0</b>:</p>
<pre class="inline-code">word = "Python"
#       P y t h o n
#       0 1 2 3 4 5
#      -6-5-4-3-2-1</pre>
<ul><li><code>word[0]</code> → <code>"P"</code>, <code>word[-1]</code> → <code>"n"</code> (отрицательные индексы считают с конца)</li><li><code>len(word)</code> → 6 — длина</li></ul>
<p><b>Срез</b> (slice) вырезает часть: <code>word[start:end]</code>, конец не включается.</p>
<ul><li><code>word[0:3]</code> → <code>"Pyt"</code></li><li><code>word[2:]</code> → <code>"thon"</code> (до конца)</li><li><code>word[:2]</code> → <code>"Py"</code> (с начала)</li><li><code>word[::-1]</code> → <code>"nohtyP"</code> (наоборот)</li></ul>
<p>Оператор <code>in</code> проверяет, есть ли подстрока: <code>"th" in word</code> → True.</p>`,
        `<p>A string is a sequence of characters; each has an <b>index</b>. Counting starts at <b>0</b>:</p>
<pre class="inline-code">word = "Python"
#       P y t h o n
#       0 1 2 3 4 5
#      -6-5-4-3-2-1</pre>
<ul><li><code>word[0]</code> → <code>"P"</code>, <code>word[-1]</code> → <code>"n"</code> (negative indices count from the end)</li><li><code>len(word)</code> → 6 — the length</li></ul>
<p>A <b>slice</b> cuts out a part: <code>word[start:end]</code>, the end is excluded.</p>
<ul><li><code>word[0:3]</code> → <code>"Pyt"</code></li><li><code>word[2:]</code> → <code>"thon"</code> (to the end)</li><li><code>word[:2]</code> → <code>"Py"</code> (from the start)</li><li><code>word[::-1]</code> → <code>"nohtyP"</code> (reversed)</li></ul>
<p>The <code>in</code> operator checks for a substring: <code>"th" in word</code> → True.</p>`),
      why: L(`<p>Чому з нуля? Індекс — це <b>зсув від початку</b>: перший символ зсунутий на 0. Так рахують майже всі мови програмування, і з цим легко рахувати зрізи: <code>s[:n]</code> — рівно перші n символів.</p>`,
        `<p>Почему с нуля? Индекс — это <b>смещение от начала</b>: первый символ смещён на 0. Так считают почти все языки программирования, и с этим легко считать срезы: <code>s[:n]</code> — ровно первые n символов.</p>`,
        `<p>Why zero? An index is the <b>offset from the start</b>: the first character is offset by 0. Almost every language counts this way, and it makes slices easy: <code>s[:n]</code> is exactly the first n characters.</p>`),
      mistakes: L(`<ul><li><code>word[6]</code> для рядка з 6 символів → <code>IndexError</code> (останній індекс 5).</li><li>Рядки <b>незмінні</b>: <code>word[0] = "J"</code> → помилка. Треба створити новий: <code>"J" + word[1:]</code>.</li></ul>`,
        `<ul><li><code>word[6]</code> для строки из 6 символов → <code>IndexError</code> (последний индекс 5).</li><li>Строки <b>неизменяемы</b>: <code>word[0] = "J"</code> → ошибка. Нужно создать новую: <code>"J" + word[1:]</code>.</li></ul>`,
        `<ul><li><code>word[6]</code> on a 6-character string → <code>IndexError</code> (the last index is 5).</li><li>Strings are <b>immutable</b>: <code>word[0] = "J"</code> → error. Build a new one: <code>"J" + word[1:]</code>.</li></ul>`),
      examples: [
        { title: L('Індекси', 'Индексы', 'Indices'), code: 'word = "Python"\nprint(word[0])\nprint(word[3])\nprint(word[-1])\nprint(len(word))', note: L('Останній символ — <code>[-1]</code> або <code>[len - 1]</code>.', 'Последний символ — <code>[-1]</code> или <code>[len - 1]</code>.', 'The last char is <code>[-1]</code> or <code>[len - 1]</code>.') },
        { title: L('Зрізи', 'Срезы', 'Slices'), code: 's = "programming"\nprint(s[0:7])\nprint(s[3:])\nprint(s[:3])\nprint(s[-4:])', note: L('Порожня межа означає «з початку» чи «до кінця».', 'Пустая граница означает «с начала» или «до конца».', 'An empty bound means “from the start” or “to the end”.') },
        { title: L('Крок і реверс', 'Шаг и реверс', 'Step and reverse'), code: 's = "abcdefgh"\nprint(s[::2])\nprint(s[::-1])\nword = "level"\nprint(word == word[::-1])', note: L('Перевірка паліндрома одним рядком.', 'Проверка палиндрома одной строкой.', 'A one-line palindrome check.') },
        { title: 'in', code: 'email = "anna@codry.dev"\nprint("@" in email)\nprint("gmail" in email)\nat = email.index("@")\nprint("User:", email[:at])\nprint("Domain:", email[at + 1:])', note: L('<code>index()</code> знаходить позицію символу.', '<code>index()</code> находит позицию символа.', '<code>index()</code> finds a character’s position.') }
      ],
      task: {
        text: L('Програма отримує слово (тест: <code>codry</code>). Виведи: перший символ, останній символ, слово без першої та останньої літери, слово задом наперед.', 'Программа получает слово (тест: <code>codry</code>). Выведи: первый символ, последний символ, слово без первой и последней буквы, слово задом наперёд.', 'The program reads a word (test: <code>codry</code>). Print: the first character, the last character, the word without its first and last letters, the word reversed.'),
        how: [L('<code>w = input()</code>', '<code>w = input()</code>', '<code>w = input()</code>'), L('<code>w[0]</code>, <code>w[-1]</code>, <code>w[1:-1]</code>, <code>w[::-1]</code>', '<code>w[0]</code>, <code>w[-1]</code>, <code>w[1:-1]</code>, <code>w[::-1]</code>', '<code>w[0]</code>, <code>w[-1]</code>, <code>w[1:-1]</code>, <code>w[::-1]</code>')],
        starter: '',
        stdin: 'codry',
        solution: 'w = input()\nprint(w[0])\nprint(w[-1])\nprint(w[1:-1])\nprint(w[::-1])',
        hint: L('<code>w[1:-1]</code> — від другого до передостаннього.', '<code>w[1:-1]</code> — от второго до предпоследнего.', '<code>w[1:-1]</code> — from the second to the second-to-last.'),
        expected: 'c\ny\nodr\nyrdoc',
        must: /\[/
      },
      quiz: { q: L('Що дає <code>"hello"[1:3]</code>?', 'Что даёт <code>"hello"[1:3]</code>?', 'What is <code>"hello"[1:3]</code>?'), options: ['"he"', '"el"', '"ell"'], answer: 1, explain: L('Індекси 1 і 2: e, l.', 'Индексы 1 и 2: e, l.', 'Indices 1 and 2: e, l.') },
      ref: [{ code: 's[i]  s[-1]', d: L('символ за індексом', 'символ по индексу', 'character by index') }, { code: 's[a:b]  s[::-1]', d: L('зріз, реверс', 'срез, реверс', 'slice, reverse') }, { code: 'len(s)', d: L('довжина', 'длина', 'length') }]
    },
    {
      id: 'str-methods', chapter: CH4,
      title: L('Методи рядків', 'Методы строк', 'String methods'),
      theory: L(
        `<p><b>Метод</b> — це функція, що «належить» значенню. Викликається через крапку: <code>text.upper()</code>. Корисні методи рядків:</p>
<table class="mini"><tr><td><code>upper() / lower()</code></td><td>ВЕЛИКІ / малі літери</td></tr><tr><td><code>capitalize() / title()</code></td><td>Перша велика / Кожне Слово</td></tr><tr><td><code>strip()</code></td><td>прибрати пробіли по краях</td></tr><tr><td><code>replace(a, b)</code></td><td>замінити a на b</td></tr><tr><td><code>split(sep)</code></td><td>розбити на список</td></tr><tr><td><code>sep.join(list)</code></td><td>склеїти список у рядок</td></tr><tr><td><code>count(x) / find(x)</code></td><td>скільки разів / де знаходиться</td></tr><tr><td><code>startswith / endswith</code></td><td>починається / закінчується на</td></tr><tr><td><code>isdigit() / isalpha()</code></td><td>лише цифри / лише літери</td></tr></table>
<p>Методи <b>не змінюють</b> рядок, а повертають новий. Щоб зберегти результат: <code>name = name.strip()</code>.</p>`,
        `<p><b>Метод</b> — это функция, которая «принадлежит» значению. Вызывается через точку: <code>text.upper()</code>. Полезные методы строк:</p>
<table class="mini"><tr><td><code>upper() / lower()</code></td><td>БОЛЬШИЕ / маленькие буквы</td></tr><tr><td><code>capitalize() / title()</code></td><td>Первая большая / Каждое Слово</td></tr><tr><td><code>strip()</code></td><td>убрать пробелы по краям</td></tr><tr><td><code>replace(a, b)</code></td><td>заменить a на b</td></tr><tr><td><code>split(sep)</code></td><td>разбить на список</td></tr><tr><td><code>sep.join(list)</code></td><td>склеить список в строку</td></tr><tr><td><code>count(x) / find(x)</code></td><td>сколько раз / где находится</td></tr><tr><td><code>startswith / endswith</code></td><td>начинается / заканчивается на</td></tr><tr><td><code>isdigit() / isalpha()</code></td><td>только цифры / только буквы</td></tr></table>
<p>Методы <b>не меняют</b> строку, а возвращают новую. Чтобы сохранить результат: <code>name = name.strip()</code>.</p>`,
        `<p>A <b>method</b> is a function that “belongs” to a value. You call it with a dot: <code>text.upper()</code>. Useful string methods:</p>
<table class="mini"><tr><td><code>upper() / lower()</code></td><td>UPPER / lower case</td></tr><tr><td><code>capitalize() / title()</code></td><td>First capital / Every Word</td></tr><tr><td><code>strip()</code></td><td>trim spaces at the ends</td></tr><tr><td><code>replace(a, b)</code></td><td>replace a with b</td></tr><tr><td><code>split(sep)</code></td><td>split into a list</td></tr><tr><td><code>sep.join(list)</code></td><td>join a list into a string</td></tr><tr><td><code>count(x) / find(x)</code></td><td>how many times / where</td></tr><tr><td><code>startswith / endswith</code></td><td>starts / ends with</td></tr><tr><td><code>isdigit() / isalpha()</code></td><td>digits only / letters only</td></tr></table>
<p>Methods <b>don’t change</b> the string, they return a new one. To keep the result: <code>name = name.strip()</code>.</p>`),
      why: L(`<p>Користувачі вводять дані як завгодно: « Anna », «ANNA», «anna». Методи дозволяють <b>нормалізувати</b> текст — <code>.strip().lower()</code> — і порівнювати коректно. Це щоденна робота з даними.</p>`,
        `<p>Пользователи вводят данные как угодно: « Anna », «ANNA», «anna». Методы позволяют <b>нормализовать</b> текст — <code>.strip().lower()</code> — и сравнивать корректно. Это ежедневная работа с данными.</p>`,
        `<p>Users type data any way they like: “ Anna ”, “ANNA”, “anna”. Methods let you <b>normalise</b> text — <code>.strip().lower()</code> — and compare correctly. It’s everyday data work.</p>`),
      mistakes: L(`<ul><li><code>name.upper()</code> без присвоєння — результат губиться.</li><li>Забуті дужки: <code>name.upper</code> — це сам метод, а не його результат.</li></ul>`,
        `<ul><li><code>name.upper()</code> без присваивания — результат теряется.</li><li>Забытые скобки: <code>name.upper</code> — это сам метод, а не его результат.</li></ul>`,
        `<ul><li><code>name.upper()</code> without assignment — the result is lost.</li><li>Missing parentheses: <code>name.upper</code> is the method itself, not its result.</li></ul>`),
      examples: [
        { title: L('Регістр', 'Регистр', 'Case'), code: 's = "hello world"\nprint(s.upper())\nprint(s.title())\nprint(s.capitalize())\nprint("HeLLo".lower())', note: L('Оригінальний рядок не змінюється.', 'Исходная строка не меняется.', 'The original string stays the same.') },
        { title: 'strip / replace', code: 'raw = "   anna@mail.com   "\nclean = raw.strip()\nprint(f"[{clean}]")\nprint("I like cats".replace("cats", "dogs"))', note: L('Дужки показують, що пробілів більше немає.', 'Скобки показывают, что пробелов больше нет.', 'The brackets show the spaces are gone.') },
        { title: 'split / join', code: 'line = "red,green,blue"\ncolors = line.split(",")\nprint(colors)\nprint(" | ".join(colors))\nwords = "Python is really fun".split()\nprint(len(words), "words")', note: L('<code>split()</code> без аргументу ділить за пробілами.', '<code>split()</code> без аргумента делит по пробелам.', '<code>split()</code> with no argument splits on spaces.') },
        { title: L('Перевірки', 'Проверки', 'Checks'), code: 'print("2026".isdigit())\nprint("abc".isalpha())\nprint("photo.png".endswith(".png"))\nprint("banana".count("a"))\nprint("banana".find("n"))', note: L('Методи-перевірки повертають True/False.', 'Методы-проверки возвращают True/False.', 'Check methods return True/False.') }
      ],
      task: {
        text: L('Програма отримує рядок з зайвими пробілами й дивним регістром (тест: <code>"   hELLo   wORLD  "</code>). Прибери пробіли по краях, зроби кожне слово з великої літери й виведи результат, а в другому рядку — кількість слів.', 'Программа получает строку с лишними пробелами и странным регистром (тест: <code>"   hELLo   wORLD  "</code>). Убери пробелы по краям, сделай каждое слово с большой буквы и выведи результат, а во второй строке — количество слов.', 'The program reads a string with extra spaces and odd casing (test: <code>"   hELLo   wORLD  "</code>). Trim the ends, capitalise every word and print it; on the second line print the number of words.'),
        how: [L('<code>s = input().strip()</code>', '<code>s = input().strip()</code>', '<code>s = input().strip()</code>'), L('Слова: <code>words = s.split()</code> — пробіли між словами теж приберуться.', 'Слова: <code>words = s.split()</code> — пробелы между словами тоже уберутся.', 'Words: <code>words = s.split()</code> — this also removes extra inner spaces.'), L('Виведи <code>" ".join(words).title()</code> і <code>len(words)</code>.', 'Выведи <code>" ".join(words).title()</code> и <code>len(words)</code>.', 'Print <code>" ".join(words).title()</code> and <code>len(words)</code>.')],
        starter: '',
        stdin: '   hELLo   wORLD  ',
        solution: 's = input().strip()\nwords = s.split()\nprint(" ".join(words).title())\nprint(len(words))',
        hint: L('<code>title()</code> робить першу літеру кожного слова великою, а решту — малими.', '<code>title()</code> делает первую букву каждого слова большой, а остальные — маленькими.', '<code>title()</code> capitalises the first letter of each word and lowercases the rest.'),
        expected: 'Hello World\n2'
      },
      quiz: { q: L('Що поверне <code>"a-b-c".split("-")</code>?', 'Что вернёт <code>"a-b-c".split("-")</code>?', 'What does <code>"a-b-c".split("-")</code> return?'), options: ['"abc"', "['a', 'b', 'c']", "['a-b-c']"], answer: 1, explain: L('Список із трьох частин.', 'Список из трёх частей.', 'A list of three parts.') },
      ref: [{ code: 's.upper() s.lower() s.title()', d: L('регістр', 'регистр', 'case') }, { code: 's.strip() s.replace(a, b)', d: L('очищення, заміна', 'очистка, замена', 'trim, replace') }, { code: 's.split() " ".join(lst)', d: L('розбити / склеїти', 'разбить / склеить', 'split / join') }]
    },
    {
      id: 'lists', chapter: CH4,
      title: L('Списки', 'Списки', 'Lists'),
      theory: L(
        `<p><b>Список</b> (list) зберігає <b>багато значень</b> в одній змінній, у певному порядку:</p>
<pre class="inline-code">fruits = ["apple", "banana", "kiwi"]
nums = [4, 8, 15, 16, 23, 42]
empty = []</pre>
<p>Індекси й зрізи працюють так само, як у рядках: <code>fruits[0]</code>, <code>fruits[-1]</code>, <code>nums[1:3]</code>.</p>
<p>На відміну від рядків, списки <b>змінні</b>: <code>fruits[1] = "mango"</code>.</p>
<p>Корисні функції: <code>len(lst)</code>, <code>sum(lst)</code>, <code>min(lst)</code>, <code>max(lst)</code>, <code>sorted(lst)</code>. Перевірка наявності — <code>"kiwi" in fruits</code>.</p>
<p>Список може містити будь-які значення, навіть інші списки.</p>`,
        `<p><b>Список</b> (list) хранит <b>много значений</b> в одной переменной, в определённом порядке:</p>
<pre class="inline-code">fruits = ["apple", "banana", "kiwi"]
nums = [4, 8, 15, 16, 23, 42]
empty = []</pre>
<p>Индексы и срезы работают так же, как в строках: <code>fruits[0]</code>, <code>fruits[-1]</code>, <code>nums[1:3]</code>.</p>
<p>В отличие от строк, списки <b>изменяемы</b>: <code>fruits[1] = "mango"</code>.</p>
<p>Полезные функции: <code>len(lst)</code>, <code>sum(lst)</code>, <code>min(lst)</code>, <code>max(lst)</code>, <code>sorted(lst)</code>. Проверка наличия — <code>"kiwi" in fruits</code>.</p>
<p>Список может содержать любые значения, даже другие списки.</p>`,
        `<p>A <b>list</b> stores <b>many values</b> in one variable, in order:</p>
<pre class="inline-code">fruits = ["apple", "banana", "kiwi"]
nums = [4, 8, 15, 16, 23, 42]
empty = []</pre>
<p>Indexing and slicing work just like strings: <code>fruits[0]</code>, <code>fruits[-1]</code>, <code>nums[1:3]</code>.</p>
<p>Unlike strings, lists are <b>mutable</b>: <code>fruits[1] = "mango"</code>.</p>
<p>Handy functions: <code>len(lst)</code>, <code>sum(lst)</code>, <code>min(lst)</code>, <code>max(lst)</code>, <code>sorted(lst)</code>. Membership — <code>"kiwi" in fruits</code>.</p>
<p>A list can hold any values, even other lists.</p>`),
      why: L(`<p>Уяви 30 оцінок у 30 окремих змінних — <code>mark1</code>, <code>mark2</code>… Список дозволяє зберегти їх разом і обробити циклом або однією функцією: <code>sum(marks) / len(marks)</code>.</p>`,
        `<p>Представь 30 оценок в 30 отдельных переменных — <code>mark1</code>, <code>mark2</code>… Список позволяет сохранить их вместе и обработать циклом или одной функцией: <code>sum(marks) / len(marks)</code>.</p>`,
        `<p>Imagine 30 marks in 30 separate variables — <code>mark1</code>, <code>mark2</code>… A list keeps them together so one loop or function handles them all: <code>sum(marks) / len(marks)</code>.</p>`),
      mistakes: L(`<ul><li>Індекс за межами: у списку з 3 елементів немає <code>[3]</code>.</li><li><code>sum()</code> для списку рядків → <code>TypeError</code>.</li></ul>`,
        `<ul><li>Индекс за пределами: в списке из 3 элементов нет <code>[3]</code>.</li><li><code>sum()</code> для списка строк → <code>TypeError</code>.</li></ul>`,
        `<ul><li>Index out of range: a 3-element list has no <code>[3]</code>.</li><li><code>sum()</code> on a list of strings → <code>TypeError</code>.</li></ul>`),
      examples: [
        { title: L('Основи', 'Основы', 'Basics'), code: 'games = ["Minecraft", "Roblox", "Fortnite"]\nprint(games)\nprint(games[0])\nprint(games[-1])\nprint(len(games))', note: L('Список виводиться з квадратними дужками.', 'Список выводится с квадратными скобками.', 'A list prints with square brackets.') },
        { title: L('Зміна', 'Изменение', 'Changing'), code: 'colors = ["red", "green", "blue"]\ncolors[1] = "yellow"\nprint(colors)\nprint("blue" in colors)\nprint("green" in colors)', note: L('Списки можна змінювати.', 'Списки можно изменять.', 'Lists can be changed.') },
        { title: L('Статистика', 'Статистика', 'Statistics'), code: 'marks = [10, 8, 12, 9, 11]\nprint("Sum:", sum(marks))\nprint("Max:", max(marks))\nprint("Min:", min(marks))\nprint("Average:", sum(marks) / len(marks))\nprint("Sorted:", sorted(marks))', note: L('<code>sorted()</code> повертає новий відсортований список.', '<code>sorted()</code> возвращает новый отсортированный список.', '<code>sorted()</code> returns a new sorted list.') },
        { title: L('Вкладені', 'Вложенные', 'Nested'), code: 'board = [["X", "O", "X"],\n         ["O", "X", "O"],\n         ["O", "X", "X"]]\nprint(board[0][2])\nfor row in board:\n    print(" ".join(row))', note: L('Список списків — ігрове поле хрестики-нулики.', 'Список списков — игровое поле крестики-нолики.', 'A list of lists — a tic-tac-toe board.') }
      ],
      task: {
        text: L('Є список температур <code>temps = [12, 17, 9, 21, 15, 18, 11]</code>. Виведи три рядки: максимальну, мінімальну і середню (округлену до 1 знака) температуру.', 'Есть список температур <code>temps = [12, 17, 9, 21, 15, 18, 11]</code>. Выведи три строки: максимальную, минимальную и среднюю (округлённую до 1 знака) температуру.', 'Given <code>temps = [12, 17, 9, 21, 15, 18, 11]</code>, print three lines: the max, the min and the average temperature (rounded to 1 decimal).'),
        how: [L('<code>max(temps)</code>, <code>min(temps)</code>', '<code>max(temps)</code>, <code>min(temps)</code>', '<code>max(temps)</code>, <code>min(temps)</code>'), L('<code>round(sum(temps) / len(temps), 1)</code>', '<code>round(sum(temps) / len(temps), 1)</code>', '<code>round(sum(temps) / len(temps), 1)</code>')],
        starter: 'temps = [12, 17, 9, 21, 15, 18, 11]\n',
        solution: 'temps = [12, 17, 9, 21, 15, 18, 11]\nprint(max(temps))\nprint(min(temps))\nprint(round(sum(temps) / len(temps), 1))',
        hint: L('Середнє = сума / кількість.', 'Среднее = сумма / количество.', 'Average = sum / count.'),
        expected: '21\n9\n14.7',
        must: /sum\s*\(/
      },
      quiz: { q: L('Що виведе <code>print([1, 2, 3][-2])</code>?', 'Что выведет <code>print([1, 2, 3][-2])</code>?', 'What does <code>print([1, 2, 3][-2])</code> print?'), options: ['1', '2', '3'], answer: 1, explain: L('-1 — останній (3), -2 — передостанній (2).', '-1 — последний (3), -2 — предпоследний (2).', '-1 is the last (3), -2 the second to last (2).') },
      ref: [{ code: '[1, 2, 3]', d: L('список', 'список', 'list') }, { code: 'sum() max() min() sorted()', d: L('функції списків', 'функции списков', 'list functions') }]
    },
    {
      id: 'list-methods', chapter: CH4,
      title: L('Методи списків і перебір', 'Методы списков и перебор', 'List methods and iteration'),
      theory: L(
        `<p>Методи, що <b>змінюють</b> список на місці:</p>
<table class="mini"><tr><td><code>append(x)</code></td><td>додати в кінець</td></tr><tr><td><code>insert(i, x)</code></td><td>вставити на позицію i</td></tr><tr><td><code>remove(x)</code></td><td>видалити перше значення x</td></tr><tr><td><code>pop()</code> / <code>pop(i)</code></td><td>забрати останній / за індексом (і повернути його)</td></tr><tr><td><code>sort()</code> / <code>reverse()</code></td><td>сортувати / розвернути</td></tr><tr><td><code>index(x)</code> / <code>count(x)</code></td><td>позиція / кількість</td></tr></table>
<p>Перебір списку циклом <code>for</code>:</p>
<pre class="inline-code">for fruit in fruits:
    print(fruit)

for i, fruit in enumerate(fruits, 1):
    print(i, fruit)     # з номерами</pre>
<p>Типовий шаблон — <b>фільтрація</b>: створити порожній список і додавати в нього через <code>append</code> лише потрібні елементи.</p>`,
        `<p>Методы, которые <b>изменяют</b> список на месте:</p>
<table class="mini"><tr><td><code>append(x)</code></td><td>добавить в конец</td></tr><tr><td><code>insert(i, x)</code></td><td>вставить на позицию i</td></tr><tr><td><code>remove(x)</code></td><td>удалить первое значение x</td></tr><tr><td><code>pop()</code> / <code>pop(i)</code></td><td>забрать последний / по индексу (и вернуть его)</td></tr><tr><td><code>sort()</code> / <code>reverse()</code></td><td>сортировать / развернуть</td></tr><tr><td><code>index(x)</code> / <code>count(x)</code></td><td>позиция / количество</td></tr></table>
<p>Перебор списка циклом <code>for</code>:</p>
<pre class="inline-code">for fruit in fruits:
    print(fruit)

for i, fruit in enumerate(fruits, 1):
    print(i, fruit)     # с номерами</pre>
<p>Типичный шаблон — <b>фильтрация</b>: создать пустой список и добавлять в него через <code>append</code> только нужные элементы.</p>`,
        `<p>Methods that <b>modify</b> the list in place:</p>
<table class="mini"><tr><td><code>append(x)</code></td><td>add to the end</td></tr><tr><td><code>insert(i, x)</code></td><td>insert at position i</td></tr><tr><td><code>remove(x)</code></td><td>remove the first x</td></tr><tr><td><code>pop()</code> / <code>pop(i)</code></td><td>take the last / by index (and return it)</td></tr><tr><td><code>sort()</code> / <code>reverse()</code></td><td>sort / reverse</td></tr><tr><td><code>index(x)</code> / <code>count(x)</code></td><td>position / count</td></tr></table>
<p>Iterating with <code>for</code>:</p>
<pre class="inline-code">for fruit in fruits:
    print(fruit)

for i, fruit in enumerate(fruits, 1):
    print(i, fruit)     # numbered</pre>
<p>A common pattern is <b>filtering</b>: create an empty list and <code>append</code> only the items you need.</p>`),
      why: L(`<p>Чому <code>sort()</code> нічого не повертає, а <code>sorted()</code> повертає? <code>sort()</code> змінює сам список (економить пам’ять), а <code>sorted()</code> створює копію, залишаючи оригінал. Обирай за ситуацією.</p>`,
        `<p>Почему <code>sort()</code> ничего не возвращает, а <code>sorted()</code> возвращает? <code>sort()</code> меняет сам список (экономит память), а <code>sorted()</code> создаёт копию, оставляя оригинал. Выбирай по ситуации.</p>`,
        `<p>Why does <code>sort()</code> return nothing while <code>sorted()</code> returns a list? <code>sort()</code> changes the list itself (saves memory), <code>sorted()</code> makes a copy and keeps the original. Pick per situation.</p>`),
      mistakes: L(`<ul><li><code>lst = lst.sort()</code> → у <code>lst</code> опиниться <code>None</code>!</li><li><code>remove(x)</code>, коли x немає → <code>ValueError</code>; спершу перевір <code>if x in lst</code>.</li><li>Видаляти елементи зі списку під час його перебору — елементи «перестрибуються».</li></ul>`,
        `<ul><li><code>lst = lst.sort()</code> → в <code>lst</code> окажется <code>None</code>!</li><li><code>remove(x)</code>, когда x нет → <code>ValueError</code>; сначала проверь <code>if x in lst</code>.</li><li>Удалять элементы из списка во время его перебора — элементы «перепрыгиваются».</li></ul>`,
        `<ul><li><code>lst = lst.sort()</code> → <code>lst</code> becomes <code>None</code>!</li><li><code>remove(x)</code> when x is missing → <code>ValueError</code>; check <code>if x in lst</code> first.</li><li>Removing items while iterating over the same list — items get skipped.</li></ul>`),
      examples: [
        { title: 'append / insert', code: 'todo = ["learn Python"]\ntodo.append("eat")\ntodo.append("sleep")\ntodo.insert(0, "wake up")\nprint(todo)', note: L('<code>insert(0, x)</code> вставляє на початок.', '<code>insert(0, x)</code> вставляет в начало.', '<code>insert(0, x)</code> inserts at the beginning.') },
        { title: 'remove / pop', code: 'stack = [1, 2, 3, 4]\nlast = stack.pop()\nprint(last, stack)\nstack.remove(2)\nprint(stack)', note: L('<code>pop</code> повертає вилучений елемент.', '<code>pop</code> возвращает извлечённый элемент.', '<code>pop</code> returns the removed item.') },
        { title: L('Фільтр', 'Фильтр', 'Filter'), code: 'nums = [5, 12, 7, 20, 3, 15]\nbig = []\nfor n in nums:\n    if n > 10:\n        big.append(n)\nbig.sort()\nprint(big)', note: L('Шаблон «порожній список + append».', 'Шаблон «пустой список + append».', 'The “empty list + append” pattern.') },
        { title: 'enumerate', code: 'players = ["Ann", "Bob", "Kate"]\nfor place, name in enumerate(players, 1):\n    print(f"{place}. {name}")', note: L('<code>enumerate</code> дає номер і значення.', '<code>enumerate</code> даёт номер и значение.', '<code>enumerate</code> gives the number and the value.') }
      ],
      task: {
        text: L('Є <code>nums = [8, 3, 15, 4, 23, 16, 42, 7]</code>. Створи новий список лише з <b>парних</b> чисел, відсортуй його за зростанням і виведи. Потім виведи, скільки в ньому елементів.', 'Есть <code>nums = [8, 3, 15, 4, 23, 16, 42, 7]</code>. Создай новый список только из <b>чётных</b> чисел, отсортируй его по возрастанию и выведи. Затем выведи, сколько в нём элементов.', 'Given <code>nums = [8, 3, 15, 4, 23, 16, 42, 7]</code>, build a new list of only the <b>even</b> numbers, sort it ascending and print it. Then print how many items it has.'),
        how: [L('<code>evens = []</code>', '<code>evens = []</code>', '<code>evens = []</code>'), L('Цикл + <code>if n % 2 == 0: evens.append(n)</code>.', 'Цикл + <code>if n % 2 == 0: evens.append(n)</code>.', 'Loop + <code>if n % 2 == 0: evens.append(n)</code>.'), L('<code>evens.sort()</code>, <code>print(evens)</code>, <code>print(len(evens))</code>.', '<code>evens.sort()</code>, <code>print(evens)</code>, <code>print(len(evens))</code>.', '<code>evens.sort()</code>, <code>print(evens)</code>, <code>print(len(evens))</code>.')],
        starter: 'nums = [8, 3, 15, 4, 23, 16, 42, 7]\n',
        solution: 'nums = [8, 3, 15, 4, 23, 16, 42, 7]\nevens = []\nfor n in nums:\n    if n % 2 == 0:\n        evens.append(n)\nevens.sort()\nprint(evens)\nprint(len(evens))',
        hint: L('Очікуваний список: <code>[4, 8, 16, 42]</code>.', 'Ожидаемый список: <code>[4, 8, 16, 42]</code>.', 'Expected list: <code>[4, 8, 16, 42]</code>.'),
        expected: '[4, 8, 16, 42]\n4',
        must: /append/
      },
      quiz: { q: L('Що буде в <code>x</code> після <code>x = [3, 1, 2].sort()</code>?', 'Что будет в <code>x</code> после <code>x = [3, 1, 2].sort()</code>?', 'What is <code>x</code> after <code>x = [3, 1, 2].sort()</code>?'), options: ['[1, 2, 3]', 'None', '[3, 1, 2]'], answer: 1, explain: L('<code>sort()</code> повертає None.', '<code>sort()</code> возвращает None.', '<code>sort()</code> returns None.') },
      ref: [{ code: 'lst.append(x) lst.pop()', d: L('додати / забрати', 'добавить / забрать', 'add / take') }, { code: 'lst.sort() sorted(lst)', d: L('сортування', 'сортировка', 'sorting') }, { code: 'enumerate(lst, 1)', d: L('номер + значення', 'номер + значение', 'index + value') }]
    },
    {
      id: 'tuples-sets', chapter: CH4,
      title: L('Кортежі та множини', 'Кортежи и множества', 'Tuples and sets'),
      theory: L(
        `<p><b>Кортеж</b> (tuple) — як список, але <b>незмінний</b>. Пишеться в круглих дужках:</p>
<pre class="inline-code">point = (3, 5)
x, y = point        # розпакування</pre>
<p>Кортежі використовують для даних, які не повинні змінюватися: координати, RGB-колір, дата.</p>
<p><b>Множина</b> (set) — набір <b>унікальних</b> значень без порядку. Фігурні дужки:</p>
<pre class="inline-code">tags = {"python", "code", "python"}
print(tags)    # {'python', 'code'} — повтор зник</pre>
<ul><li><code>set(list)</code> — прибрати дублікати зі списку</li><li><code>s.add(x)</code>, <code>s.remove(x)</code></li><li><code>a | b</code> — об’єднання, <code>a &amp; b</code> — перетин, <code>a - b</code> — різниця</li></ul>`,
        `<p><b>Кортеж</b> (tuple) — как список, но <b>неизменяемый</b>. Пишется в круглых скобках:</p>
<pre class="inline-code">point = (3, 5)
x, y = point        # распаковка</pre>
<p>Кортежи используют для данных, которые не должны меняться: координаты, RGB-цвет, дата.</p>
<p><b>Множество</b> (set) — набор <b>уникальных</b> значений без порядка. Фигурные скобки:</p>
<pre class="inline-code">tags = {"python", "code", "python"}
print(tags)    # {'python', 'code'} — повтор исчез</pre>
<ul><li><code>set(list)</code> — убрать дубликаты из списка</li><li><code>s.add(x)</code>, <code>s.remove(x)</code></li><li><code>a | b</code> — объединение, <code>a &amp; b</code> — пересечение, <code>a - b</code> — разность</li></ul>`,
        `<p>A <b>tuple</b> is like a list but <b>immutable</b>. Written in parentheses:</p>
<pre class="inline-code">point = (3, 5)
x, y = point        # unpacking</pre>
<p>Tuples hold data that shouldn’t change: coordinates, an RGB colour, a date.</p>
<p>A <b>set</b> is a collection of <b>unique</b> values with no order. Curly braces:</p>
<pre class="inline-code">tags = {"python", "code", "python"}
print(tags)    # {'python', 'code'} — the duplicate is gone</pre>
<ul><li><code>set(list)</code> — remove duplicates from a list</li><li><code>s.add(x)</code>, <code>s.remove(x)</code></li><li><code>a | b</code> — union, <code>a &amp; b</code> — intersection, <code>a - b</code> — difference</li></ul>`),
      why: L(`<p>Перевірка <code>x in set</code> працює <b>миттєво</b> навіть для мільйона елементів, а у списку Python перебирає все підряд. Тому множини використовують для швидкого пошуку й прибирання повторів.</p>`,
        `<p>Проверка <code>x in set</code> работает <b>мгновенно</b> даже для миллиона элементов, а в списке Python перебирает всё подряд. Поэтому множества используют для быстрого поиска и удаления повторов.</p>`,
        `<p>Checking <code>x in set</code> is <b>instant</b> even for a million items, while a list is scanned item by item. That’s why sets are used for fast lookups and removing duplicates.</p>`),
      mistakes: L(`<ul><li><code>{}</code> — це порожній <b>словник</b>, а не множина. Порожня множина — <code>set()</code>.</li><li>Кортеж з одного елемента потребує коми: <code>(5,)</code>.</li><li>У множини немає індексів: <code>s[0]</code> → помилка.</li></ul>`,
        `<ul><li><code>{}</code> — это пустой <b>словарь</b>, а не множество. Пустое множество — <code>set()</code>.</li><li>Кортеж из одного элемента требует запятой: <code>(5,)</code>.</li><li>У множества нет индексов: <code>s[0]</code> → ошибка.</li></ul>`,
        `<ul><li><code>{}</code> is an empty <b>dict</b>, not a set. An empty set is <code>set()</code>.</li><li>A one-item tuple needs a comma: <code>(5,)</code>.</li><li>Sets have no indices: <code>s[0]</code> → error.</li></ul>`),
      examples: [
        { title: L('Кортеж', 'Кортеж', 'Tuple'), code: 'rgb = (255, 128, 0)\nr, g, b = rgb\nprint(r, g, b)\nprint(rgb[0], len(rgb))', note: L('Розпакування — зручний спосіб дістати значення.', 'Распаковка — удобный способ достать значения.', 'Unpacking is a handy way to get values.') },
        { title: L('Без дублікатів', 'Без дубликатов', 'No duplicates'), code: 'visits = ["kyiv", "lviv", "kyiv", "odesa", "lviv"]\nunique = set(visits)\nprint(len(unique))\nprint(sorted(unique))', note: L('<code>sorted()</code> повертає з множини впорядкований список.', '<code>sorted()</code> возвращает из множества упорядоченный список.', '<code>sorted()</code> turns a set into an ordered list.') },
        { title: L('Операції', 'Операции', 'Operations'), code: 'ann = {"python", "js", "html"}\nbob = {"python", "java"}\nprint(sorted(ann & bob))\nprint(sorted(ann | bob))\nprint(sorted(ann - bob))', note: L('Спільні, усі разом, лише в Ann.', 'Общие, все вместе, только у Ann.', 'Shared, all together, Ann only.') },
        { title: L('Функція повертає кортеж', 'Функция возвращает кортеж', 'Returning a tuple'), code: 'nums = [4, 9, 1, 7]\nlowest, highest = min(nums), max(nums)\nprint(lowest, highest)\npair = divmod(17, 5)\nprint(pair)', note: L('<code>divmod</code> повертає (частка, остача).', '<code>divmod</code> возвращает (частное, остаток).', '<code>divmod</code> returns (quotient, remainder).') }
      ],
      task: {
        text: L('Програма отримує рядок слів через пробіл (тест: <code>cat dog cat bird dog cat</code>). Виведи кількість <b>унікальних</b> слів, а потім самі слова в алфавітному порядку через кому з пробілом.', 'Программа получает строку слов через пробел (тест: <code>cat dog cat bird dog cat</code>). Выведи количество <b>уникальных</b> слов, а затем сами слова в алфавитном порядке через запятую с пробелом.', 'The program reads space-separated words (test: <code>cat dog cat bird dog cat</code>). Print the number of <b>unique</b> words, then the words in alphabetical order separated by comma and space.'),
        how: [L('<code>words = input().split()</code>', '<code>words = input().split()</code>', '<code>words = input().split()</code>'), L('<code>unique = set(words)</code>', '<code>unique = set(words)</code>', '<code>unique = set(words)</code>'), L('<code>", ".join(sorted(unique))</code>', '<code>", ".join(sorted(unique))</code>', '<code>", ".join(sorted(unique))</code>')],
        starter: '',
        stdin: 'cat dog cat bird dog cat',
        solution: 'words = input().split()\nunique = set(words)\nprint(len(unique))\nprint(", ".join(sorted(unique)))',
        hint: L('Відповідь: 3 і <code>bird, cat, dog</code>.', 'Ответ: 3 и <code>bird, cat, dog</code>.', 'Answer: 3 and <code>bird, cat, dog</code>.'),
        expected: '3\nbird, cat, dog',
        must: /set\s*\(/
      },
      quiz: { q: L('Як створити порожню множину?', 'Как создать пустое множество?', 'How do you create an empty set?'), options: ['{}', 'set()', '[]'], answer: 1, explain: L('<code>{}</code> — порожній словник.', '<code>{}</code> — пустой словарь.', '<code>{}</code> is an empty dict.') },
      ref: [{ code: '(1, 2)', d: L('кортеж', 'кортеж', 'tuple') }, { code: '{1, 2}  set()', d: L('множина', 'множество', 'set') }, { code: 'a & b  a | b  a - b', d: L('перетин, об’єднання, різниця', 'пересечение, объединение, разность', 'intersection, union, difference') }]
    },
    {
      id: 'dicts', chapter: CH4,
      title: L('Словники', 'Словари', 'Dictionaries'),
      theory: L(
        `<p><b>Словник</b> (dict) зберігає пари <b>ключ → значення</b>. Як телефонна книга: ім’я → номер.</p>
<pre class="inline-code">player = {"name": "Steve", "hp": 20, "level": 3}</pre>
<ul><li><code>player["name"]</code> — отримати значення за ключем</li><li><code>player["hp"] = 15</code> — змінити, <code>player["gold"] = 0</code> — додати новий ключ</li><li><code>player.get("mana", 0)</code> — отримати або значення за замовчуванням, якщо ключа немає</li><li><code>"hp" in player</code> — чи є ключ</li><li><code>del player["level"]</code> — видалити</li></ul>
<p>Перебір:</p>
<pre class="inline-code">for key, value in player.items():
    print(key, value)</pre>
<p>Також є <code>.keys()</code> і <code>.values()</code>.</p>`,
        `<p><b>Словарь</b> (dict) хранит пары <b>ключ → значение</b>. Как телефонная книга: имя → номер.</p>
<pre class="inline-code">player = {"name": "Steve", "hp": 20, "level": 3}</pre>
<ul><li><code>player["name"]</code> — получить значение по ключу</li><li><code>player["hp"] = 15</code> — изменить, <code>player["gold"] = 0</code> — добавить новый ключ</li><li><code>player.get("mana", 0)</code> — получить или значение по умолчанию, если ключа нет</li><li><code>"hp" in player</code> — есть ли ключ</li><li><code>del player["level"]</code> — удалить</li></ul>
<p>Перебор:</p>
<pre class="inline-code">for key, value in player.items():
    print(key, value)</pre>
<p>Также есть <code>.keys()</code> и <code>.values()</code>.</p>`,
        `<p>A <b>dict</b> stores <b>key → value</b> pairs. Like a phone book: name → number.</p>
<pre class="inline-code">player = {"name": "Steve", "hp": 20, "level": 3}</pre>
<ul><li><code>player["name"]</code> — get the value by key</li><li><code>player["hp"] = 15</code> — change, <code>player["gold"] = 0</code> — add a new key</li><li><code>player.get("mana", 0)</code> — get, or a default if the key is missing</li><li><code>"hp" in player</code> — is the key there</li><li><code>del player["level"]</code> — delete</li></ul>
<p>Iterating:</p>
<pre class="inline-code">for key, value in player.items():
    print(key, value)</pre>
<p>There are also <code>.keys()</code> and <code>.values()</code>.</p>`),
      why: L(`<p>У списку шукати «рахунок гравця Ann» довго: треба перебрати всіх. У словнику <code>scores["Ann"]</code> знаходиться миттєво. Словники — основа JSON, баз даних і майже всіх реальних програм.</p>`,
        `<p>В списке искать «счёт игрока Ann» долго: нужно перебрать всех. В словаре <code>scores["Ann"]</code> находится мгновенно. Словари — основа JSON, баз данных и почти всех реальных программ.</p>`,
        `<p>Finding “Ann’s score” in a list means scanning everyone. In a dict <code>scores["Ann"]</code> is instant. Dicts are the foundation of JSON, databases and nearly every real program.</p>`),
      mistakes: L(`<ul><li><code>d["missing"]</code> → <code>KeyError</code>. Використовуй <code>get()</code> або перевір <code>in</code>.</li><li>Ключі мають бути незмінними (рядки, числа, кортежі) — список ключем бути не може.</li></ul>`,
        `<ul><li><code>d["missing"]</code> → <code>KeyError</code>. Используй <code>get()</code> или проверь <code>in</code>.</li><li>Ключи должны быть неизменяемыми (строки, числа, кортежи) — список ключом быть не может.</li></ul>`,
        `<ul><li><code>d["missing"]</code> → <code>KeyError</code>. Use <code>get()</code> or check with <code>in</code>.</li><li>Keys must be immutable (strings, numbers, tuples) — a list can’t be a key.</li></ul>`),
      examples: [
        { title: L('Профіль', 'Профиль', 'Profile'), code: 'user = {"name": "Dasha", "age": 15, "city": "Lviv"}\nprint(user["name"])\nuser["age"] = 16\nuser["hobby"] = "coding"\nprint(user)\nprint(len(user))', note: L('Нові ключі додаються простим присвоєнням.', 'Новые ключи добавляются простым присваиванием.', 'New keys are added by simple assignment.') },
        { title: L('Перебір', 'Перебор', 'Iterating'), code: 'prices = {"bread": 30, "milk": 45, "cheese": 120}\nfor item, price in prices.items():\n    print(f"{item}: {price} UAH")\nprint("Total:", sum(prices.values()))', note: L('<code>.items()</code> — пари, <code>.values()</code> — лише значення.', '<code>.items()</code> — пары, <code>.values()</code> — только значения.', '<code>.items()</code> — pairs, <code>.values()</code> — values only.') },
        { title: 'get()', code: 'stock = {"apples": 5, "pears": 0}\nprint(stock.get("apples", 0))\nprint(stock.get("plums", 0))\nprint("plums" in stock)', note: L('<code>get</code> не падає, якщо ключа немає.', '<code>get</code> не падает, если ключа нет.', '<code>get</code> doesn’t crash if the key is missing.') },
        { title: L('Лічильник', 'Счётчик', 'Counter'), code: 'text = "the cat and the dog and the bird"\ncounts = {}\nfor word in text.split():\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)\nprint("Most common:", max(counts, key=counts.get))', note: L('Класична задача: підрахунок частоти слів.', 'Классическая задача: подсчёт частоты слов.', 'A classic task: counting word frequency.') }
      ],
      task: {
        text: L('Є словник оцінок <code>marks = {"Ann": 11, "Bob": 7, "Kate": 12, "Max": 9}</code>. Виведи імена тих, у кого оцінка 9 і вище, у форматі <code>Ann: 11</code> (у порядку словника). Останнім рядком виведи середню оцінку всіх учнів.', 'Есть словарь оценок <code>marks = {"Ann": 11, "Bob": 7, "Kate": 12, "Max": 9}</code>. Выведи имена тех, у кого оценка 9 и выше, в формате <code>Ann: 11</code> (в порядке словаря). Последней строкой выведи среднюю оценку всех учеников.', 'Given <code>marks = {"Ann": 11, "Bob": 7, "Kate": 12, "Max": 9}</code>, print the names of those with a mark of 9 or more as <code>Ann: 11</code> (in dict order). On the last line print the average of all marks.'),
        how: [L('<code>for name, mark in marks.items():</code> з умовою.', '<code>for name, mark in marks.items():</code> с условием.', '<code>for name, mark in marks.items():</code> with a condition.'), L('Середнє: <code>sum(marks.values()) / len(marks)</code>.', 'Среднее: <code>sum(marks.values()) / len(marks)</code>.', 'Average: <code>sum(marks.values()) / len(marks)</code>.')],
        starter: 'marks = {"Ann": 11, "Bob": 7, "Kate": 12, "Max": 9}\n',
        solution: 'marks = {"Ann": 11, "Bob": 7, "Kate": 12, "Max": 9}\nfor name, mark in marks.items():\n    if mark >= 9:\n        print(f"{name}: {mark}")\nprint(sum(marks.values()) / len(marks))',
        hint: L('Середнє вийде 9.75.', 'Среднее получится 9.75.', 'The average is 9.75.'),
        expected: 'Ann: 11\nKate: 12\nMax: 9\n9.75',
        must: /items\s*\(/
      },
      quiz: { q: L('Що поверне <code>{"a": 1}.get("b", 5)</code>?', 'Что вернёт <code>{"a": 1}.get("b", 5)</code>?', 'What does <code>{"a": 1}.get("b", 5)</code> return?'), options: ['None', '5', 'KeyError'], answer: 1, explain: L('Ключа немає — повертається значення за замовчуванням.', 'Ключа нет — возвращается значение по умолчанию.', 'The key is missing, so the default is returned.') },
      ref: [{ code: '{"k": v}', d: L('словник', 'словарь', 'dict') }, { code: 'd.get(k, default)', d: L('безпечне читання', 'безопасное чтение', 'safe read') }, { code: 'd.items() d.keys() d.values()', d: L('перебір', 'перебор', 'iteration') }]
    },
    {
      id: 'comprehensions', chapter: CH4,
      title: L('Генератори списків', 'Генераторы списков', 'List comprehensions'),
      theory: L(
        `<p><b>Генератор списку</b> (list comprehension) — короткий запис циклу, що створює список, в один рядок:</p>
<pre class="inline-code">squares = [n * n for n in range(1, 6)]
# [1, 4, 9, 16, 25]</pre>
<p>Читається так: «<b>n·n</b> для кожного <b>n</b> з <b>range(1, 6)</b>». Можна додати фільтр:</p>
<pre class="inline-code">evens = [n for n in range(10) if n % 2 == 0]</pre>
<p>Це те саме, що:</p>
<pre class="inline-code">evens = []
for n in range(10):
    if n % 2 == 0:
        evens.append(n)</pre>
<p>Так само працюють генератори словників: <code>{name: len(name) for name in names}</code> і множин: <code>{x % 3 for x in nums}</code>.</p>`,
        `<p><b>Генератор списка</b> (list comprehension) — короткая запись цикла, создающего список, в одну строку:</p>
<pre class="inline-code">squares = [n * n for n in range(1, 6)]
# [1, 4, 9, 16, 25]</pre>
<p>Читается так: «<b>n·n</b> для каждого <b>n</b> из <b>range(1, 6)</b>». Можно добавить фильтр:</p>
<pre class="inline-code">evens = [n for n in range(10) if n % 2 == 0]</pre>
<p>Это то же самое, что:</p>
<pre class="inline-code">evens = []
for n in range(10):
    if n % 2 == 0:
        evens.append(n)</pre>
<p>Так же работают генераторы словарей: <code>{name: len(name) for name in names}</code> и множеств: <code>{x % 3 for x in nums}</code>.</p>`,
        `<p>A <b>list comprehension</b> is a one-line way to write a loop that builds a list:</p>
<pre class="inline-code">squares = [n * n for n in range(1, 6)]
# [1, 4, 9, 16, 25]</pre>
<p>Read it as: “<b>n·n</b> for each <b>n</b> in <b>range(1, 6)</b>”. You can add a filter:</p>
<pre class="inline-code">evens = [n for n in range(10) if n % 2 == 0]</pre>
<p>It’s the same as:</p>
<pre class="inline-code">evens = []
for n in range(10):
    if n % 2 == 0:
        evens.append(n)</pre>
<p>Dict and set comprehensions work the same way: <code>{name: len(name) for name in names}</code>, <code>{x % 3 for x in nums}</code>.</p>`),
      why: L(`<p>Чотири рядки перетворюються на один, і код читається майже як звичайне речення. Це «пітонічний» стиль — так пишуть досвідчені Python-розробники. Але якщо вираз стає дуже складним, краще повернутися до звичайного циклу.</p>`,
        `<p>Четыре строки превращаются в одну, и код читается почти как обычное предложение. Это «питонический» стиль — так пишут опытные Python-разработчики. Но если выражение становится очень сложным, лучше вернуться к обычному циклу.</p>`,
        `<p>Four lines become one, and the code reads almost like a sentence. It’s the “Pythonic” style experienced developers use. If an expression gets too complex, though, go back to a regular loop.</p>`),
      mistakes: L(`<ul><li>Плутати порядок: умова <code>if</code> іде <b>після</b> <code>for</code>.</li><li>Пхати в один рядок забагато логіки — читабельність важливіша.</li></ul>`,
        `<ul><li>Путать порядок: условие <code>if</code> идёт <b>после</b> <code>for</code>.</li><li>Пихать в одну строку слишком много логики — читаемость важнее.</li></ul>`,
        `<ul><li>Mixing up the order: the <code>if</code> filter goes <b>after</b> the <code>for</code>.</li><li>Cramming too much logic into one line — readability matters more.</li></ul>`),
      examples: [
        { title: L('Квадрати', 'Квадраты', 'Squares'), code: 'squares = [n ** 2 for n in range(1, 8)]\nprint(squares)', note: L('Список з виразу.', 'Список из выражения.', 'A list from an expression.') },
        { title: L('З фільтром', 'С фильтром', 'With a filter'), code: 'nums = [3, 18, 7, 24, 11, 6]\nbig = [n for n in nums if n > 10]\nprint(big)\nodd_doubled = [n * 2 for n in nums if n % 2]\nprint(odd_doubled)', note: L('<code>if n % 2</code> — True для непарних.', '<code>if n % 2</code> — True для нечётных.', '<code>if n % 2</code> is True for odd numbers.') },
        { title: L('Рядки', 'Строки', 'Strings'), code: 'names = ["ann", "bob", "kate"]\nprint([n.title() for n in names])\nprint([len(n) for n in names])\nprint("".join([w[0] for w in "Portable Network Graphics".split()]))', note: L('Останній рядок робить абревіатуру PNG.', 'Последняя строка делает аббревиатуру PNG.', 'The last line builds the acronym PNG.') },
        { title: L('Словник', 'Словарь', 'Dict'), code: 'words = ["apple", "kiwi", "banana"]\nlengths = {w: len(w) for w in words}\nprint(lengths)', note: L('Генератор словника: ключ: значення.', 'Генератор словаря: ключ: значение.', 'A dict comprehension: key: value.') }
      ],
      task: {
        text: L('Програма отримує числа через пробіл (тест: <code>4 -2 9 0 -7 13</code>). Одним генератором створи список квадратів лише <b>додатних</b> чисел і виведи його.', 'Программа получает числа через пробел (тест: <code>4 -2 9 0 -7 13</code>). Одним генератором создай список квадратов только <b>положительных</b> чисел и выведи его.', 'The program reads space-separated numbers (test: <code>4 -2 9 0 -7 13</code>). With one comprehension build a list of squares of the <b>positive</b> numbers only and print it.'),
        how: [L('Числа: <code>nums = [int(x) for x in input().split()]</code>', 'Числа: <code>nums = [int(x) for x in input().split()]</code>', 'Numbers: <code>nums = [int(x) for x in input().split()]</code>'), L('Квадрати: <code>[n * n for n in nums if n &gt; 0]</code>', 'Квадраты: <code>[n * n for n in nums if n &gt; 0]</code>', 'Squares: <code>[n * n for n in nums if n &gt; 0]</code>')],
        starter: '',
        stdin: '4 -2 9 0 -7 13',
        solution: 'nums = [int(x) for x in input().split()]\nprint([n * n for n in nums if n > 0])',
        hint: L('Нуль не додатний: <code>n &gt; 0</code>, а не <code>&gt;=</code>.', 'Ноль не положительный: <code>n &gt; 0</code>, а не <code>&gt;=</code>.', 'Zero isn’t positive: <code>n &gt; 0</code>, not <code>&gt;=</code>.'),
        expected: '[16, 81, 169]',
        must: /\[[^\]]*for[^\]]*if/
      },
      quiz: { q: L('Що дасть <code>[x for x in "abc"]</code>?', 'Что даст <code>[x for x in "abc"]</code>?', 'What is <code>[x for x in "abc"]</code>?'), options: ['"abc"', "['a', 'b', 'c']", "['abc']"], answer: 1, explain: L('Кожен символ стає елементом.', 'Каждый символ становится элементом.', 'Each character becomes an item.') },
      ref: [{ code: '[f(x) for x in seq if cond]', d: L('генератор списку', 'генератор списка', 'list comprehension') }, { code: '{k: v for ...}', d: L('генератор словника', 'генератор словаря', 'dict comprehension') }]
    }
  ]);
})();
