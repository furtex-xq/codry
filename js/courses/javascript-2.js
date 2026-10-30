// JavaScript — частина 2: цикли, масиви, функції.
(function () {
  const L = Codry.L;
  const CH3 = L('Цикли', 'Циклы', 'Loops');
  const CH4 = L('Масиви', 'Массивы', 'Arrays');
  const CH5 = L('Функції', 'Функции', 'Functions');

  Codry.steps('javascript', [
    {
      id: 'for', chapter: CH3,
      title: L('Цикл for', 'Цикл for', 'The for loop'),
      theory: L(
        `<p>Цикл <code>for</code> повторює код задану кількість разів. Він складається з трьох частин у дужках:</p>
<pre class="inline-code">for (let i = 0; i < 5; i++) {
  console.log(i);
}</pre>
<ol><li><code>let i = 0</code> — <b>старт</b>: виконується один раз на початку.</li><li><code>i &lt; 5</code> — <b>умова</b>: перевіряється перед кожною ітерацією; якщо false — цикл закінчується.</li><li><code>i++</code> — <b>крок</b>: виконується після кожної ітерації.</li></ol>
<p>Лічильник може рахувати як завгодно: <code>i += 2</code>, <code>i--</code>, <code>i *= 2</code>.</p>`,
        `<p>Цикл <code>for</code> повторяет код заданное количество раз. Он состоит из трёх частей в скобках:</p>
<pre class="inline-code">for (let i = 0; i < 5; i++) {
  console.log(i);
}</pre>
<ol><li><code>let i = 0</code> — <b>старт</b>: выполняется один раз в начале.</li><li><code>i &lt; 5</code> — <b>условие</b>: проверяется перед каждой итерацией; если false — цикл заканчивается.</li><li><code>i++</code> — <b>шаг</b>: выполняется после каждой итерации.</li></ol>
<p>Счётчик может считать как угодно: <code>i += 2</code>, <code>i--</code>, <code>i *= 2</code>.</p>`,
        `<p>The <code>for</code> loop repeats code a set number of times. It has three parts in parentheses:</p>
<pre class="inline-code">for (let i = 0; i < 5; i++) {
  console.log(i);
}</pre>
<ol><li><code>let i = 0</code> — <b>start</b>: runs once at the beginning.</li><li><code>i &lt; 5</code> — <b>condition</b>: checked before each iteration; when false, the loop ends.</li><li><code>i++</code> — <b>step</b>: runs after each iteration.</li></ol>
<p>The counter can change any way you like: <code>i += 2</code>, <code>i--</code>, <code>i *= 2</code>.</p>`),
      why: L(`<p>Три частини в одному рядку дають повний контроль над циклом: звідки почати, коли зупинитися, як крокувати. Усе видно одразу — не треба шукати зміну лічильника десь у тілі.</p>`,
        `<p>Три части в одной строке дают полный контроль над циклом: откуда начать, когда остановиться, как шагать. Всё видно сразу — не нужно искать изменение счётчика где-то в теле.</p>`,
        `<p>Three parts on one line give full control: where to start, when to stop, how to step. It’s all visible at once — no hunting for the counter update inside the body.</p>`),
      mistakes: L(`<ul><li>Коми замість крапок з комою: <code>for (let i = 0, i &lt; 5, i++)</code> → помилка.</li><li><code>i &lt;= arr.length</code> замість <code>&lt;</code> — на одну ітерацію більше.</li><li>Умова, яка ніколи не стане false → нескінченний цикл.</li></ul>`,
        `<ul><li>Запятые вместо точек с запятой: <code>for (let i = 0, i &lt; 5, i++)</code> → ошибка.</li><li><code>i &lt;= arr.length</code> вместо <code>&lt;</code> — на одну итерацию больше.</li><li>Условие, которое никогда не станет false → бесконечный цикл.</li></ul>`,
        `<ul><li>Commas instead of semicolons: <code>for (let i = 0, i &lt; 5, i++)</code> → error.</li><li><code>i &lt;= arr.length</code> instead of <code>&lt;</code> — one iteration too many.</li><li>A condition that never becomes false → infinite loop.</li></ul>`),
      examples: [
        { title: L('Лічба', 'Счёт', 'Counting'), code: 'for (let i = 1; i <= 5; i++) {\n  console.log("Level " + i);\n}', note: L('Від 1 до 5 включно.', 'От 1 до 5 включительно.', 'From 1 to 5 inclusive.') },
        { title: L('Крок 2 і назад', 'Шаг 2 и назад', 'Step 2 and backwards'), code: 'for (let i = 0; i <= 10; i += 2) console.log(i);\nfor (let i = 3; i > 0; i--) console.log("T-" + i);', note: L('Тіло з одного рядка можна без дужок (але обережно!).', 'Тело из одной строки можно без скобок (но осторожно!).', 'A one-line body can skip braces (carefully!).') },
        { title: L('Сума', 'Сумма', 'Sum'), code: 'let sum = 0;\nfor (let n = 1; n <= 100; n++) {\n  sum += n;\n}\nconsole.log(sum);', note: L('Накопичення суми.', 'Накопление суммы.', 'Accumulating a sum.') },
        { title: L('Рядок символів', 'Строка символов', 'Building a string'), code: 'let line = "";\nfor (let i = 0; i < 5; i++) {\n  line += i % 2 === 0 ? "#" : "-";\n}\nconsole.log(line);', note: L('Будуємо рядок у циклі.', 'Строим строку в цикле.', 'Building a string in a loop.') }
      ],
      task: {
        text: L('Виведи таблицю множення на 7 від <code>7 x 1 = 7</code> до <code>7 x 5 = 35</code>.', 'Выведи таблицу умножения на 7 от <code>7 x 1 = 7</code> до <code>7 x 5 = 35</code>.', 'Print the 7 times table from <code>7 x 1 = 7</code> to <code>7 x 5 = 35</code>.'),
        how: [L('<code>for (let i = 1; i &lt;= 5; i++)</code>', '<code>for (let i = 1; i &lt;= 5; i++)</code>', '<code>for (let i = 1; i &lt;= 5; i++)</code>'), L('Шаблонний рядок <code>`7 x ${i} = ${7 * i}`</code>.', 'Шаблонная строка <code>`7 x ${i} = ${7 * i}`</code>.', 'Template literal <code>`7 x ${i} = ${7 * i}`</code>.')],
        starter: '',
        solution: 'for (let i = 1; i <= 5; i++) {\n  console.log(`7 x ${i} = ${7 * i}`);\n}',
        hint: L('Умова <code>i &lt;= 5</code>, щоб включити 5.', 'Условие <code>i &lt;= 5</code>, чтобы включить 5.', 'Condition <code>i &lt;= 5</code> to include 5.'),
        expected: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35',
        must: /for\s*\(/
      },
      quiz: { q: L('Скільки разів виконається <code>for (let i = 0; i &lt; 10; i += 3)</code>?', 'Сколько раз выполнится <code>for (let i = 0; i &lt; 10; i += 3)</code>?', 'How many times does <code>for (let i = 0; i &lt; 10; i += 3)</code> run?'), options: ['3', '4', '10'], answer: 1, explain: 'i = 0, 3, 6, 9.' },
      ref: [{ code: 'for (let i = 0; i < n; i++)', d: L('цикл з лічильником', 'цикл со счётчиком', 'counter loop') }]
    },
    {
      id: 'while', chapter: CH3,
      title: L('while, do...while, break, continue', 'while, do...while, break, continue', 'while, do...while, break, continue'),
      theory: L(
        `<p><code>while</code> повторює код, <b>поки умова істинна</b>. Використовують, коли кількість повторень невідома:</p>
<pre class="inline-code">let money = 100;
while (money > 0) {
  money -= 30;
}</pre>
<p><code>do { ... } while (умова);</code> — перевіряє умову <b>після</b> тіла, тож виконається хоча б раз.</p>
<p>Керування циклом:</p>
<ul><li><code>break</code> — вийти з циклу негайно</li><li><code>continue</code> — пропустити решту ітерації та перейти до наступної</li></ul>`,
        `<p><code>while</code> повторяет код, <b>пока условие истинно</b>. Используют, когда количество повторений неизвестно:</p>
<pre class="inline-code">let money = 100;
while (money > 0) {
  money -= 30;
}</pre>
<p><code>do { ... } while (условие);</code> — проверяет условие <b>после</b> тела, поэтому выполнится хотя бы раз.</p>
<p>Управление циклом:</p>
<ul><li><code>break</code> — выйти из цикла немедленно</li><li><code>continue</code> — пропустить остаток итерации и перейти к следующей</li></ul>`,
        `<p><code>while</code> repeats code <b>while the condition is true</b>. Use it when the number of repetitions is unknown:</p>
<pre class="inline-code">let money = 100;
while (money > 0) {
  money -= 30;
}</pre>
<p><code>do { ... } while (condition);</code> checks the condition <b>after</b> the body, so it runs at least once.</p>
<p>Loop control:</p>
<ul><li><code>break</code> — exit the loop immediately</li><li><code>continue</code> — skip the rest of the iteration and move to the next</li></ul>`),
      why: L(`<p><code>for</code> — коли знаєш, скільки разів. <code>while</code> — коли чекаєш на подію: поки ворог живий, поки є дані, поки користувач не ввів правильний пароль. <code>do...while</code> — коли дію треба зробити хоча б раз (наприклад, показати меню).</p>`,
        `<p><code>for</code> — когда знаешь, сколько раз. <code>while</code> — когда ждёшь события: пока враг жив, пока есть данные, пока пользователь не ввёл правильный пароль. <code>do...while</code> — когда действие нужно сделать хотя бы раз (например, показать меню).</p>`,
        `<p><code>for</code> — when you know how many times. <code>while</code> — when waiting for something: while the enemy lives, while data remains, until the user enters the right password. <code>do...while</code> — when the action must happen at least once (e.g. show a menu).</p>`),
      mistakes: L(`<ul><li>Забути змінити змінну умови → нескінченний цикл (Codry зупинить його через 3 с).</li><li><code>continue</code> у <code>while</code> до збільшення лічильника — теж нескінченний цикл.</li></ul>`,
        `<ul><li>Забыть изменить переменную условия → бесконечный цикл (Codry остановит его через 3 с).</li><li><code>continue</code> в <code>while</code> до увеличения счётчика — тоже бесконечный цикл.</li></ul>`,
        `<ul><li>Forgetting to change the condition variable → infinite loop (Codry stops it after 3 s).</li><li><code>continue</code> in a <code>while</code> before the counter update — also an infinite loop.</li></ul>`),
      examples: [
        { title: 'while', code: 'let money = 100;\nlet days = 0;\nwhile (money > 0) {\n  money -= 30;\n  days++;\n}\nconsole.log(`Money lasted ${days} days`);', note: L('Кількість днів заздалегідь невідома.', 'Количество дней заранее неизвестно.', 'The number of days isn’t known in advance.') },
        { title: 'do...while', code: 'let tries = 0;\ndo {\n  tries++;\n  console.log("Attempt", tries);\n} while (tries < 3);', note: L('Тіло виконується до перевірки умови.', 'Тело выполняется до проверки условия.', 'The body runs before the condition is checked.') },
        { title: 'break', code: 'for (let n = 1; n < 100; n++) {\n  if (n * n > 50) {\n    console.log("First square > 50:", n * n);\n    break;\n  }\n}', note: L('Знайшли — виходимо.', 'Нашли — выходим.', 'Found it — exit.') },
        { title: 'continue', code: 'for (let n = 1; n <= 10; n++) {\n  if (n % 3 === 0) continue;\n  console.log(n);\n}', note: L('Кратні 3 пропущено.', 'Кратные 3 пропущены.', 'Multiples of 3 are skipped.') }
      ],
      task: {
        text: L('Число <code>n = 1</code> подвоюється, поки не стане більшим за 500. Виведи кожне значення <b>до</b> подвоєння в одному циклі <code>while</code> (1, 2, 4, …, 256), а в кінці — кількість кроків рядком <code>steps: 9</code>.', 'Число <code>n = 1</code> удваивается, пока не станет больше 500. Выведи каждое значение <b>до</b> удвоения в одном цикле <code>while</code> (1, 2, 4, …, 256), а в конце — количество шагов строкой <code>steps: 9</code>.', 'The number <code>n = 1</code> doubles until it exceeds 500. In one <code>while</code> loop print each value <b>before</b> doubling (1, 2, 4, …, 256), then the step count as <code>steps: 9</code>.'),
        how: [L('<code>let n = 1, steps = 0;</code>', '<code>let n = 1, steps = 0;</code>', '<code>let n = 1, steps = 0;</code>'), L('<code>while (n &lt;= 500) { console.log(n); n *= 2; steps++; }</code>', '<code>while (n &lt;= 500) { console.log(n); n *= 2; steps++; }</code>', '<code>while (n &lt;= 500) { console.log(n); n *= 2; steps++; }</code>')],
        starter: '',
        solution: 'let n = 1;\nlet steps = 0;\nwhile (n <= 500) {\n  console.log(n);\n  n *= 2;\n  steps++;\n}\nconsole.log(`steps: ${steps}`);',
        hint: L('Останнє виведене число — 256 (512 вже більше за 500).', 'Последнее выведенное число — 256 (512 уже больше 500).', 'The last printed number is 256 (512 exceeds 500).'),
        expected: '1\n2\n4\n8\n16\n32\n64\n128\n256\nsteps: 9',
        must: /while\s*\(/
      },
      quiz: { q: L('Який цикл гарантовано виконається хоча б раз?', 'Какой цикл гарантированно выполнится хотя бы раз?', 'Which loop is guaranteed to run at least once?'), options: ['for', 'while', 'do...while'], answer: 2, explain: L('Умова перевіряється після тіла.', 'Условие проверяется после тела.', 'The condition is checked after the body.') },
      ref: [{ code: 'while (c) {}', d: L('поки умова істинна', 'пока условие истинно', 'while true') }, { code: 'break / continue', d: L('вихід / пропуск', 'выход / пропуск', 'exit / skip') }]
    },
    {
      id: 'arrays', chapter: CH4,
      title: L('Масиви', 'Массивы', 'Arrays'),
      theory: L(
        `<p><b>Масив</b> — впорядкований список значень:</p>
<pre class="inline-code">const colors = ["red", "green", "blue"];
console.log(colors[0]);       // "red"
console.log(colors.length);   // 3
colors[1] = "yellow";         // змінити елемент</pre>
<p>Індекси починаються з <b>0</b>, останній елемент — <code>arr[arr.length - 1]</code> або <code>arr.at(-1)</code>.</p>
<p>Додавання й видалення:</p>
<ul><li><code>push(x)</code> — додати в кінець, <code>pop()</code> — забрати з кінця</li><li><code>unshift(x)</code> — додати на початок, <code>shift()</code> — забрати з початку</li></ul>
<p>Пошук: <code>includes(x)</code> → true/false, <code>indexOf(x)</code> → позиція або -1.</p>
<div class="tip">💡 <code>const</code>-масив можна змінювати (додавати елементи). Не можна лише присвоїти змінній зовсім інший масив.</div>`,
        `<p><b>Массив</b> — упорядоченный список значений:</p>
<pre class="inline-code">const colors = ["red", "green", "blue"];
console.log(colors[0]);       // "red"
console.log(colors.length);   // 3
colors[1] = "yellow";         // изменить элемент</pre>
<p>Индексы начинаются с <b>0</b>, последний элемент — <code>arr[arr.length - 1]</code> или <code>arr.at(-1)</code>.</p>
<p>Добавление и удаление:</p>
<ul><li><code>push(x)</code> — добавить в конец, <code>pop()</code> — забрать с конца</li><li><code>unshift(x)</code> — добавить в начало, <code>shift()</code> — забрать с начала</li></ul>
<p>Поиск: <code>includes(x)</code> → true/false, <code>indexOf(x)</code> → позиция или -1.</p>
<div class="tip">💡 <code>const</code>-массив можно изменять (добавлять элементы). Нельзя лишь присвоить переменной совсем другой массив.</div>`,
        `<p>An <b>array</b> is an ordered list of values:</p>
<pre class="inline-code">const colors = ["red", "green", "blue"];
console.log(colors[0]);       // "red"
console.log(colors.length);   // 3
colors[1] = "yellow";         // change an item</pre>
<p>Indices start at <b>0</b>; the last item is <code>arr[arr.length - 1]</code> or <code>arr.at(-1)</code>.</p>
<p>Adding and removing:</p>
<ul><li><code>push(x)</code> — add to the end, <code>pop()</code> — take from the end</li><li><code>unshift(x)</code> — add to the start, <code>shift()</code> — take from the start</li></ul>
<p>Search: <code>includes(x)</code> → true/false, <code>indexOf(x)</code> → position or -1.</p>
<div class="tip">💡 A <code>const</code> array can be changed (items added). You just can’t assign a completely different array to the variable.</div>`),
      why: L(`<p>Список справ, товари в кошику, повідомлення в чаті, вороги на рівні — усе це масиви. Без них довелося б створювати окрему змінну для кожного елемента.</p>`,
        `<p>Список дел, товары в корзине, сообщения в чате, враги на уровне — всё это массивы. Без них пришлось бы создавать отдельную переменную для каждого элемента.</p>`,
        `<p>To-do lists, cart items, chat messages, enemies on a level — they’re all arrays. Without them you’d need a separate variable for every item.</p>`),
      mistakes: L(`<ul><li><code>arr[arr.length]</code> → <code>undefined</code>: останній індекс на 1 менший.</li><li>Порівнювати масиви через <code>===</code> — два однакові масиви не рівні (<code>[1] === [1]</code> → false), бо це різні об’єкти.</li></ul>`,
        `<ul><li><code>arr[arr.length]</code> → <code>undefined</code>: последний индекс на 1 меньше.</li><li>Сравнивать массивы через <code>===</code> — два одинаковых массива не равны (<code>[1] === [1]</code> → false), потому что это разные объекты.</li></ul>`,
        `<ul><li><code>arr[arr.length]</code> → <code>undefined</code>: the last index is one less.</li><li>Comparing arrays with <code>===</code> — two identical arrays aren’t equal (<code>[1] === [1]</code> → false) because they’re different objects.</li></ul>`),
      examples: [
        { title: L('Основи', 'Основы', 'Basics'), code: 'const games = ["Minecraft", "Roblox", "Fortnite"];\nconsole.log(games);\nconsole.log(games[0], games.at(-1));\nconsole.log(games.length);\ngames[2] = "Terraria";\nconsole.log(games);', note: L('Читання та зміна за індексом.', 'Чтение и изменение по индексу.', 'Reading and changing by index.') },
        { title: 'push / pop', code: 'const stack = [];\nstack.push("a");\nstack.push("b");\nstack.push("c");\nconsole.log(stack);\nconst top = stack.pop();\nconsole.log(top, stack);', note: L('Стек: останній прийшов — перший пішов.', 'Стек: последний пришёл — первый ушёл.', 'A stack: last in, first out.') },
        { title: 'shift / unshift', code: 'const queue = ["Ann", "Bob"];\nqueue.push("Kate");\nconst first = queue.shift();\nconsole.log(first, queue);\nqueue.unshift("VIP");\nconsole.log(queue);', note: L('Черга: перший прийшов — перший пішов.', 'Очередь: первый пришёл — первый ушёл.', 'A queue: first in, first out.') },
        { title: L('Пошук', 'Поиск', 'Search'), code: 'const fruits = ["apple", "kiwi", "plum"];\nconsole.log(fruits.includes("kiwi"));\nconsole.log(fruits.indexOf("plum"));\nconsole.log(fruits.indexOf("mango"));\nconsole.log([1, 2] === [1, 2]);', note: L('Масиви порівнюються за посиланням, а не вмістом.', 'Массивы сравниваются по ссылке, а не по содержимому.', 'Arrays compare by reference, not content.') }
      ],
      task: {
        text: L('Є <code>todo = ["learn JS", "eat"]</code>. Додай <code>"sleep"</code> у кінець і <code>"wake up"</code> на початок. Виведи масив, потім його довжину, потім чи містить він <code>"eat"</code>.', 'Есть <code>todo = ["learn JS", "eat"]</code>. Добавь <code>"sleep"</code> в конец и <code>"wake up"</code> в начало. Выведи массив, затем его длину, затем содержит ли он <code>"eat"</code>.', 'Given <code>todo = ["learn JS", "eat"]</code>, add <code>"sleep"</code> to the end and <code>"wake up"</code> to the start. Print the array, then its length, then whether it includes <code>"eat"</code>.'),
        how: [L('<code>todo.push("sleep")</code>', '<code>todo.push("sleep")</code>', '<code>todo.push("sleep")</code>'), L('<code>todo.unshift("wake up")</code>', '<code>todo.unshift("wake up")</code>', '<code>todo.unshift("wake up")</code>'), L('<code>todo.length</code>, <code>todo.includes("eat")</code>', '<code>todo.length</code>, <code>todo.includes("eat")</code>', '<code>todo.length</code>, <code>todo.includes("eat")</code>')],
        starter: 'const todo = ["learn JS", "eat"];\n',
        solution: 'const todo = ["learn JS", "eat"];\ntodo.push("sleep");\ntodo.unshift("wake up");\nconsole.log(todo);\nconsole.log(todo.length);\nconsole.log(todo.includes("eat"));',
        hint: L('Масив у консолі виглядає так: <code>[ "wake up", "learn JS", "eat", "sleep" ]</code>.', 'Массив в консоли выглядит так: <code>[ "wake up", "learn JS", "eat", "sleep" ]</code>.', 'In the console the array looks like <code>[ "wake up", "learn JS", "eat", "sleep" ]</code>.'),
        expected: '[ "wake up", "learn JS", "eat", "sleep" ]\n4\ntrue',
        must: /push[\s\S]*unshift|unshift[\s\S]*push/
      },
      quiz: { q: L('Що повертає <code>pop()</code>?', 'Что возвращает <code>pop()</code>?', 'What does <code>pop()</code> return?'), options: [L('новий масив', 'новый массив', 'a new array'), L('вилучений останній елемент', 'извлечённый последний элемент', 'the removed last item'), L('довжину', 'длину', 'the length')], answer: 1, explain: L('pop забирає й повертає останній елемент.', 'pop забирает и возвращает последний элемент.', 'pop removes and returns the last item.') },
      ref: [{ code: 'arr.push(x) arr.pop()', d: L('кінець масиву', 'конец массива', 'end of array') }, { code: 'arr.unshift(x) arr.shift()', d: L('початок масиву', 'начало массива', 'start of array') }, { code: 'arr.includes(x) arr.indexOf(x)', d: L('пошук', 'поиск', 'search') }]
    },
    {
      id: 'array-methods', chapter: CH4,
      title: L('slice, splice, sort, join', 'slice, splice, sort, join', 'slice, splice, sort, join'),
      theory: L(
        `<p>Ще кілька важливих методів масивів:</p>
<table class="mini"><tr><td><code>slice(a, b)</code></td><td>копія частини від a до b (не змінює масив)</td></tr><tr><td><code>splice(i, n, ...items)</code></td><td>видалити n елементів з позиції i і вставити нові (змінює масив)</td></tr><tr><td><code>concat(arr2)</code> або <code>[...a, ...b]</code></td><td>об’єднати</td></tr><tr><td><code>join(sep)</code></td><td>склеїти в рядок</td></tr><tr><td><code>reverse()</code></td><td>розвернути (змінює)</td></tr><tr><td><code>sort()</code></td><td>сортувати (змінює)</td></tr></table>
<p><b>Увага:</b> <code>sort()</code> без аргументу сортує як <b>рядки</b>: <code>[10, 9, 1].sort()</code> → <code>[1, 10, 9]</code>. Для чисел передай функцію порівняння:</p>
<pre class="inline-code">nums.sort((a, b) => a - b);   // за зростанням
nums.sort((a, b) => b - a);   // за спаданням</pre>`,
        `<p>Ещё несколько важных методов массивов:</p>
<table class="mini"><tr><td><code>slice(a, b)</code></td><td>копия части от a до b (не меняет массив)</td></tr><tr><td><code>splice(i, n, ...items)</code></td><td>удалить n элементов с позиции i и вставить новые (меняет массив)</td></tr><tr><td><code>concat(arr2)</code> или <code>[...a, ...b]</code></td><td>объединить</td></tr><tr><td><code>join(sep)</code></td><td>склеить в строку</td></tr><tr><td><code>reverse()</code></td><td>развернуть (меняет)</td></tr><tr><td><code>sort()</code></td><td>сортировать (меняет)</td></tr></table>
<p><b>Внимание:</b> <code>sort()</code> без аргумента сортирует как <b>строки</b>: <code>[10, 9, 1].sort()</code> → <code>[1, 10, 9]</code>. Для чисел передай функцию сравнения:</p>
<pre class="inline-code">nums.sort((a, b) => a - b);   // по возрастанию
nums.sort((a, b) => b - a);   // по убыванию</pre>`,
        `<p>More important array methods:</p>
<table class="mini"><tr><td><code>slice(a, b)</code></td><td>copy a part from a to b (doesn’t change the array)</td></tr><tr><td><code>splice(i, n, ...items)</code></td><td>remove n items at position i and insert new ones (changes the array)</td></tr><tr><td><code>concat(arr2)</code> or <code>[...a, ...b]</code></td><td>merge</td></tr><tr><td><code>join(sep)</code></td><td>join into a string</td></tr><tr><td><code>reverse()</code></td><td>reverse (changes)</td></tr><tr><td><code>sort()</code></td><td>sort (changes)</td></tr></table>
<p><b>Careful:</b> <code>sort()</code> without an argument sorts as <b>strings</b>: <code>[10, 9, 1].sort()</code> → <code>[1, 10, 9]</code>. For numbers pass a compare function:</p>
<pre class="inline-code">nums.sort((a, b) => a - b);   // ascending
nums.sort((a, b) => b - a);   // descending</pre>`),
      why: L(`<p>Чому <code>sort</code> порівнює як рядки? Масив може містити що завгодно — числа, рядки, об’єкти. Перетворення на рядок — єдиний універсальний спосіб. Функція порівняння повертає від’ємне число (a раніше), додатне (b раніше) або 0 — і ти сам вирішуєш порядок.</p>`,
        `<p>Почему <code>sort</code> сравнивает как строки? Массив может содержать что угодно — числа, строки, объекты. Преобразование в строку — единственный универсальный способ. Функция сравнения возвращает отрицательное число (a раньше), положительное (b раньше) или 0 — и ты сам решаешь порядок.</p>`,
        `<p>Why does <code>sort</code> compare as strings? An array can hold anything — numbers, strings, objects. Converting to strings is the only universal option. The compare function returns a negative number (a first), positive (b first) or 0 — so you decide the order.</p>`),
      mistakes: L(`<ul><li>Плутати <code>slice</code> (копія) і <code>splice</code> (змінює оригінал).</li><li><code>sort()</code> для чисел без функції порівняння.</li></ul>`,
        `<ul><li>Путать <code>slice</code> (копия) и <code>splice</code> (меняет оригинал).</li><li><code>sort()</code> для чисел без функции сравнения.</li></ul>`,
        `<ul><li>Mixing up <code>slice</code> (copy) and <code>splice</code> (modifies the original).</li><li><code>sort()</code> on numbers without a compare function.</li></ul>`),
      examples: [
        { title: 'slice', code: 'const letters = ["a", "b", "c", "d", "e"];\nconsole.log(letters.slice(1, 3));\nconsole.log(letters.slice(-2));\nconsole.log(letters);', note: L('Оригінал не змінився.', 'Оригинал не изменился.', 'The original is unchanged.') },
        { title: 'splice', code: 'const team = ["Ann", "Bob", "Kate", "Max"];\nconst removed = team.splice(1, 2, "Ira");\nconsole.log(removed);\nconsole.log(team);', note: L('Видалили Bob і Kate, вставили Ira.', 'Удалили Bob и Kate, вставили Ira.', 'Removed Bob and Kate, inserted Ira.') },
        { title: 'sort', code: 'const nums = [10, 9, 1, 25, 3];\nconsole.log([...nums].sort());\nconsole.log([...nums].sort((a, b) => a - b));\nconsole.log([...nums].sort((a, b) => b - a));', note: L('<code>[...nums]</code> — копія, щоб не змінювати оригінал.', '<code>[...nums]</code> — копия, чтобы не менять оригинал.', '<code>[...nums]</code> makes a copy so the original stays.') },
        { title: 'join / concat', code: 'const a = [1, 2];\nconst b = [3, 4];\nconsole.log(a.concat(b));\nconsole.log([...a, ...b, 5]);\nconsole.log(["2026", "10", "17"].join("-"));', note: L('Оператор <code>...</code> «розгортає» масив.', 'Оператор <code>...</code> «разворачивает» массив.', 'The <code>...</code> operator spreads an array.') }
      ],
      task: {
        text: L('Є <code>scores = [40, 100, 7, 85, 23]</code>. Відсортуй <b>копію</b> за спаданням і виведи її. Потім виведи топ-3 через <code>slice</code>, склеєні рядком <code>" | "</code>. Останнім рядком виведи оригінальний масив без змін.', 'Есть <code>scores = [40, 100, 7, 85, 23]</code>. Отсортируй <b>копию</b> по убыванию и выведи её. Затем выведи топ-3 через <code>slice</code>, склеенные строкой <code>" | "</code>. Последней строкой выведи исходный массив без изменений.', 'Given <code>scores = [40, 100, 7, 85, 23]</code>, sort a <b>copy</b> descending and print it. Then print the top 3 via <code>slice</code>, joined with <code>" | "</code>. Finally print the original array unchanged.'),
        how: [L('<code>const sorted = [...scores].sort((a, b) =&gt; b - a);</code>', '<code>const sorted = [...scores].sort((a, b) =&gt; b - a);</code>', '<code>const sorted = [...scores].sort((a, b) =&gt; b - a);</code>'), L('<code>sorted.slice(0, 3).join(" | ")</code>', '<code>sorted.slice(0, 3).join(" | ")</code>', '<code>sorted.slice(0, 3).join(" | ")</code>')],
        starter: 'const scores = [40, 100, 7, 85, 23];\n',
        solution: 'const scores = [40, 100, 7, 85, 23];\nconst sorted = [...scores].sort((a, b) => b - a);\nconsole.log(sorted);\nconsole.log(sorted.slice(0, 3).join(" | "));\nconsole.log(scores);',
        hint: L('Без копії <code>sort</code> змінить і <code>scores</code>.', 'Без копии <code>sort</code> изменит и <code>scores</code>.', 'Without a copy <code>sort</code> changes <code>scores</code> too.'),
        expected: '[ 100, 85, 40, 23, 7 ]\n100 | 85 | 40\n[ 40, 100, 7, 85, 23 ]',
        must: /sort\s*\(\s*\(\s*\w+\s*,\s*\w+\s*\)\s*=>/
      },
      quiz: { q: L('Що дасть <code>[3, 20, 100].sort()</code>?', 'Что даст <code>[3, 20, 100].sort()</code>?', 'What does <code>[3, 20, 100].sort()</code> give?'), options: ['[3, 20, 100]', '[100, 20, 3]', '[20, 3, 100]'], answer: 1, explain: L('Порівняння як рядків: "100" &lt; "20" &lt; "3".', 'Сравнение как строк: "100" &lt; "20" &lt; "3".', 'String comparison: "100" &lt; "20" &lt; "3".') },
      ref: [{ code: 'arr.slice(a, b)', d: L('копія частини', 'копия части', 'copy a part') }, { code: 'arr.splice(i, n, ...)', d: L('видалити/вставити', 'удалить/вставить', 'remove/insert') }, { code: 'arr.sort((a, b) => a - b)', d: L('числове сортування', 'числовая сортировка', 'numeric sort') }]
    },
    {
      id: 'iterate', chapter: CH4,
      title: L('Перебір: for...of і forEach', 'Перебор: for...of и forEach', 'Iterating: for...of and forEach'),
      theory: L(
        `<p>Найзручніший спосіб пройти по масиву — <code>for...of</code>:</p>
<pre class="inline-code">for (const fruit of fruits) {
  console.log(fruit);
}</pre>
<p>Якщо потрібен і індекс — <code>entries()</code>:</p>
<pre class="inline-code">for (const [i, fruit] of fruits.entries()) {
  console.log(i, fruit);
}</pre>
<p>Метод <code>forEach</code> викликає функцію для кожного елемента:</p>
<pre class="inline-code">fruits.forEach((fruit, i) => console.log(i, fruit));</pre>
<p><code>for...of</code> також працює з рядками (по символах). А <code>for...in</code> перебирає <b>ключі об’єкта</b> — для масивів його краще не використовувати.</p>`,
        `<p>Самый удобный способ пройти по массиву — <code>for...of</code>:</p>
<pre class="inline-code">for (const fruit of fruits) {
  console.log(fruit);
}</pre>
<p>Если нужен и индекс — <code>entries()</code>:</p>
<pre class="inline-code">for (const [i, fruit] of fruits.entries()) {
  console.log(i, fruit);
}</pre>
<p>Метод <code>forEach</code> вызывает функцию для каждого элемента:</p>
<pre class="inline-code">fruits.forEach((fruit, i) => console.log(i, fruit));</pre>
<p><code>for...of</code> также работает со строками (по символам). А <code>for...in</code> перебирает <b>ключи объекта</b> — для массивов его лучше не использовать.</p>`,
        `<p>The handiest way to walk through an array is <code>for...of</code>:</p>
<pre class="inline-code">for (const fruit of fruits) {
  console.log(fruit);
}</pre>
<p>If you need the index too, use <code>entries()</code>:</p>
<pre class="inline-code">for (const [i, fruit] of fruits.entries()) {
  console.log(i, fruit);
}</pre>
<p><code>forEach</code> calls a function for each item:</p>
<pre class="inline-code">fruits.forEach((fruit, i) => console.log(i, fruit));</pre>
<p><code>for...of</code> works on strings too (character by character). <code>for...in</code> iterates over <b>object keys</b> — avoid it for arrays.</p>`),
      why: L(`<p>Класичний <code>for (let i = 0; ...)</code> змушує думати про індекси й межі, де легко помилитися на одиницю. <code>for...of</code> каже прямо: «для кожного елемента» — менше коду, менше помилок.</p>`,
        `<p>Классический <code>for (let i = 0; ...)</code> заставляет думать об индексах и границах, где легко ошибиться на единицу. <code>for...of</code> говорит прямо: «для каждого элемента» — меньше кода, меньше ошибок.</p>`,
        `<p>The classic <code>for (let i = 0; ...)</code> makes you think about indices and bounds where off-by-one bugs lurk. <code>for...of</code> says it plainly: “for each item” — less code, fewer bugs.</p>`),
      mistakes: L(`<ul><li>У <code>forEach</code> не працює <code>break</code> — якщо потрібно перервати, використовуй <code>for...of</code>.</li><li><code>for...in</code> для масиву дає індекси як <b>рядки</b> ("0", "1").</li></ul>`,
        `<ul><li>В <code>forEach</code> не работает <code>break</code> — если нужно прервать, используй <code>for...of</code>.</li><li><code>for...in</code> для массива даёт индексы как <b>строки</b> ("0", "1").</li></ul>`,
        `<ul><li><code>break</code> doesn’t work in <code>forEach</code> — use <code>for...of</code> if you need to stop early.</li><li><code>for...in</code> on an array gives indices as <b>strings</b> ("0", "1").</li></ul>`),
      examples: [
        { title: 'for...of', code: 'const friends = ["Ann", "Bob", "Kate"];\nfor (const f of friends) {\n  console.log(`Hi, ${f}!`);\n}', note: L('Простий перебір значень.', 'Простой перебор значений.', 'Simple iteration over values.') },
        { title: L('З індексом', 'С индексом', 'With index'), code: 'const podium = ["gold", "silver", "bronze"];\nfor (const [i, medal] of podium.entries()) {\n  console.log(`${i + 1}. ${medal}`);\n}', note: L('Деструктуризація <code>[i, medal]</code>.', 'Деструктуризация <code>[i, medal]</code>.', 'Destructuring <code>[i, medal]</code>.') },
        { title: 'forEach', code: 'const prices = [120, 45, 300];\nlet total = 0;\nprices.forEach((p) => {\n  total += p;\n});\nconsole.log("Total:", total);', note: L('Функція для кожного елемента.', 'Функция для каждого элемента.', 'A function for each item.') },
        { title: L('По рядку', 'По строке', 'Over a string'), code: 'let vowels = 0;\nfor (const ch of "javascript") {\n  if ("aeiou".includes(ch)) vowels++;\n}\nconsole.log("Vowels:", vowels);', note: L('for...of по символах рядка.', 'for...of по символам строки.', 'for...of over string characters.') }
      ],
      task: {
        text: L('Є масив <code>words = ["sun", "planet", "galaxy", "moon"]</code>. Виведи кожне слово з номером у форматі <code>1. sun (3)</code>, де в дужках — довжина слова. Потім виведи найдовше слово.', 'Есть массив <code>words = ["sun", "planet", "galaxy", "moon"]</code>. Выведи каждое слово с номером в формате <code>1. sun (3)</code>, где в скобках — длина слова. Затем выведи самое длинное слово.', 'Given <code>words = ["sun", "planet", "galaxy", "moon"]</code>, print each word with its number as <code>1. sun (3)</code>, with the word length in parentheses. Then print the longest word.'),
        how: [L('<code>for (const [i, w] of words.entries())</code>', '<code>for (const [i, w] of words.entries())</code>', '<code>for (const [i, w] of words.entries())</code>'), L('Найдовше шукай у тому ж циклі: якщо <code>w.length &gt; longest.length</code>, запам’ятай.', 'Самое длинное ищи в том же цикле: если <code>w.length &gt; longest.length</code>, запомни.', 'Find the longest in the same loop: if <code>w.length &gt; longest.length</code>, remember it.')],
        starter: 'const words = ["sun", "planet", "galaxy", "moon"];\n',
        solution: 'const words = ["sun", "planet", "galaxy", "moon"];\nlet longest = "";\nfor (const [i, w] of words.entries()) {\n  console.log(`${i + 1}. ${w} (${w.length})`);\n  if (w.length > longest.length) longest = w;\n}\nconsole.log(longest);',
        hint: L('planet і galaxy однакової довжини — залишається перше (строге <code>&gt;</code>).', 'planet и galaxy одинаковой длины — остаётся первое (строгое <code>&gt;</code>).', 'planet and galaxy have equal length — the first stays (strict <code>&gt;</code>).'),
        expected: '1. sun (3)\n2. planet (6)\n3. galaxy (6)\n4. moon (4)\nplanet',
        must: /for\s*\(\s*const[\s\S]*of|forEach/
      },
      quiz: { q: L('Що НЕ можна зробити у <code>forEach</code>?', 'Что НЕЛЬЗЯ сделать в <code>forEach</code>?', 'What can’t you do in <code>forEach</code>?'), options: [L('отримати індекс', 'получить индекс', 'get the index'), L('перервати через break', 'прервать через break', 'stop with break'), L('змінити зовнішню змінну', 'изменить внешнюю переменную', 'change an outer variable')], answer: 1, explain: L('break у forEach не працює.', 'break в forEach не работает.', 'break doesn’t work in forEach.') },
      ref: [{ code: 'for (const x of arr)', d: L('перебір значень', 'перебор значений', 'iterate values') }, { code: 'arr.entries()', d: L('пари [індекс, значення]', 'пары [индекс, значение]', '[index, value] pairs') }, { code: 'arr.forEach((x, i) => ...)', d: L('функція для кожного', 'функция для каждого', 'function for each') }]
    },
    {
      id: 'map-filter', chapter: CH4,
      title: L('map, filter, reduce, find', 'map, filter, reduce, find', 'map, filter, reduce, find'),
      theory: L(
        `<p>Чотири «суперсили» масивів, які не змінюють оригінал:</p>
<ul><li><code>map(fn)</code> — новий масив, де кожен елемент <b>перетворено</b>: <code>[1,2,3].map(x =&gt; x * 2)</code> → <code>[2,4,6]</code></li><li><code>filter(fn)</code> — новий масив лише з елементів, для яких fn повернула true</li><li><code>find(fn)</code> — <b>перший</b> елемент, що підходить (або undefined); <code>findIndex</code> — його індекс</li><li><code>reduce(fn, start)</code> — «згортає» масив в одне значення: <code>nums.reduce((sum, x) =&gt; sum + x, 0)</code></li></ul>
<p>Ще корисні: <code>some(fn)</code> — чи підходить хоча б один, <code>every(fn)</code> — чи підходять усі.</p>
<p>Їх можна ланцюжити: <code>orders.filter(o =&gt; o.paid).map(o =&gt; o.sum)</code>.</p>`,
        `<p>Четыре «суперсилы» массивов, которые не меняют оригинал:</p>
<ul><li><code>map(fn)</code> — новый массив, где каждый элемент <b>преобразован</b>: <code>[1,2,3].map(x =&gt; x * 2)</code> → <code>[2,4,6]</code></li><li><code>filter(fn)</code> — новый массив только из элементов, для которых fn вернула true</li><li><code>find(fn)</code> — <b>первый</b> подходящий элемент (или undefined); <code>findIndex</code> — его индекс</li><li><code>reduce(fn, start)</code> — «сворачивает» массив в одно значение: <code>nums.reduce((sum, x) =&gt; sum + x, 0)</code></li></ul>
<p>Ещё полезные: <code>some(fn)</code> — подходит ли хотя бы один, <code>every(fn)</code> — подходят ли все.</p>
<p>Их можно сцеплять: <code>orders.filter(o =&gt; o.paid).map(o =&gt; o.sum)</code>.</p>`,
        `<p>Four array “superpowers” that don’t change the original:</p>
<ul><li><code>map(fn)</code> — a new array with each item <b>transformed</b>: <code>[1,2,3].map(x =&gt; x * 2)</code> → <code>[2,4,6]</code></li><li><code>filter(fn)</code> — a new array of only the items for which fn returned true</li><li><code>find(fn)</code> — the <b>first</b> matching item (or undefined); <code>findIndex</code> gives its index</li><li><code>reduce(fn, start)</code> — “folds” the array into one value: <code>nums.reduce((sum, x) =&gt; sum + x, 0)</code></li></ul>
<p>Also handy: <code>some(fn)</code> — does at least one match, <code>every(fn)</code> — do all match.</p>
<p>They chain: <code>orders.filter(o =&gt; o.paid).map(o =&gt; o.sum)</code>.</p>`),
      why: L(`<p>Замість циклу з тимчасовими змінними ти <b>описуєш, що хочеш</b>: «відфільтруй оплачені, візьми суми, додай». Такий код коротший, його легше читати й тестувати. Це стиль сучасного JavaScript і React.</p>`,
        `<p>Вместо цикла с временными переменными ты <b>описываешь, что хочешь</b>: «отфильтруй оплаченные, возьми суммы, сложи». Такой код короче, его легче читать и тестировать. Это стиль современного JavaScript и React.</p>`,
        `<p>Instead of a loop with temporary variables you <b>describe what you want</b>: “keep the paid ones, take the sums, add them up”. The code is shorter and easier to read and test. It’s the style of modern JavaScript and React.</p>`),
      mistakes: L(`<ul><li>У <code>map</code> забути <code>return</code> у фігурних дужках: <code>x =&gt; { x * 2 }</code> поверне undefined.</li><li><code>reduce</code> без початкового значення на порожньому масиві → помилка.</li></ul>`,
        `<ul><li>В <code>map</code> забыть <code>return</code> в фигурных скобках: <code>x =&gt; { x * 2 }</code> вернёт undefined.</li><li><code>reduce</code> без начального значения на пустом массиве → ошибка.</li></ul>`,
        `<ul><li>Forgetting <code>return</code> inside braces in <code>map</code>: <code>x =&gt; { x * 2 }</code> returns undefined.</li><li><code>reduce</code> without an initial value on an empty array → error.</li></ul>`),
      examples: [
        { title: 'map', code: 'const nums = [1, 2, 3, 4];\nconsole.log(nums.map((x) => x * 10));\nconst names = ["ann", "bob"];\nconsole.log(names.map((n) => n.toUpperCase()));', note: L('Той самий розмір, нові значення.', 'Тот же размер, новые значения.', 'Same size, new values.') },
        { title: 'filter / find', code: 'const nums = [5, 12, 8, 130, 44];\nconsole.log(nums.filter((n) => n > 10));\nconsole.log(nums.find((n) => n > 10));\nconsole.log(nums.findIndex((n) => n > 100));', note: L('filter — усі, find — перший.', 'filter — все, find — первый.', 'filter gives all, find the first.') },
        { title: 'reduce', code: 'const cart = [120, 45, 300];\nconst total = cart.reduce((sum, p) => sum + p, 0);\nconsole.log("Total:", total);\nconst max = cart.reduce((m, p) => (p > m ? p : m), cart[0]);\nconsole.log("Max:", max);', note: L('reduce може рахувати що завгодно.', 'reduce может считать что угодно.', 'reduce can compute anything.') },
        { title: L('Ланцюжок', 'Цепочка', 'Chaining'), code: 'const orders = [\n  { id: 1, sum: 250, paid: true },\n  { id: 2, sum: 100, paid: false },\n  { id: 3, sum: 400, paid: true }\n];\nconst revenue = orders\n  .filter((o) => o.paid)\n  .map((o) => o.sum)\n  .reduce((a, b) => a + b, 0);\nconsole.log(revenue);\nconsole.log(orders.some((o) => !o.paid), orders.every((o) => o.sum > 50));', note: L('Реальна задача в три рядки.', 'Реальная задача в три строки.', 'A real task in three lines.') }
      ],
      task: {
        text: L('Є <code>temps = [-3, 5, 12, -8, 20, 0, 7]</code>. Виведи: масив лише додатних температур; масив усіх температур у Фаренгейтах (<code>t * 9 / 5 + 32</code>); суму всіх температур через <code>reduce</code>; першу температуру вище 10 через <code>find</code>.', 'Есть <code>temps = [-3, 5, 12, -8, 20, 0, 7]</code>. Выведи: массив только положительных температур; массив всех температур в Фаренгейтах (<code>t * 9 / 5 + 32</code>); сумму всех температур через <code>reduce</code>; первую температуру выше 10 через <code>find</code>.', 'Given <code>temps = [-3, 5, 12, -8, 20, 0, 7]</code>, print: an array of only positive temperatures; an array of all temperatures in Fahrenheit (<code>t * 9 / 5 + 32</code>); the sum via <code>reduce</code>; the first temperature above 10 via <code>find</code>.'),
        how: [L('<code>temps.filter(t =&gt; t &gt; 0)</code>', '<code>temps.filter(t =&gt; t &gt; 0)</code>', '<code>temps.filter(t =&gt; t &gt; 0)</code>'), L('<code>temps.map(t =&gt; t * 9 / 5 + 32)</code>', '<code>temps.map(t =&gt; t * 9 / 5 + 32)</code>', '<code>temps.map(t =&gt; t * 9 / 5 + 32)</code>'), L('<code>reduce((s, t) =&gt; s + t, 0)</code>, <code>find(t =&gt; t &gt; 10)</code>', '<code>reduce((s, t) =&gt; s + t, 0)</code>, <code>find(t =&gt; t &gt; 10)</code>', '<code>reduce((s, t) =&gt; s + t, 0)</code>, <code>find(t =&gt; t &gt; 10)</code>')],
        starter: 'const temps = [-3, 5, 12, -8, 20, 0, 7];\n',
        solution: 'const temps = [-3, 5, 12, -8, 20, 0, 7];\nconsole.log(temps.filter((t) => t > 0));\nconsole.log(temps.map((t) => t * 9 / 5 + 32));\nconsole.log(temps.reduce((s, t) => s + t, 0));\nconsole.log(temps.find((t) => t > 10));',
        hint: L('Нуль не є додатним.', 'Ноль не является положительным.', 'Zero isn’t positive.'),
        expected: '[ 5, 12, 20, 7 ]\n[ 26.6, 41, 53.6, 17.6, 68, 32, 44.6 ]\n33\n12',
        must: /filter[\s\S]*map[\s\S]*reduce[\s\S]*find/
      },
      quiz: { q: L('Що поверне <code>[1, 2, 3].map(x =&gt; x * 2)</code>?', 'Что вернёт <code>[1, 2, 3].map(x =&gt; x * 2)</code>?', 'What does <code>[1, 2, 3].map(x =&gt; x * 2)</code> return?'), options: ['12', '[2, 4, 6]', '[1, 2, 3, 2]'], answer: 1, explain: L('Новий масив того ж розміру.', 'Новый массив того же размера.', 'A new array of the same size.') },
      ref: [{ code: 'arr.map(fn)', d: L('перетворити кожен', 'преобразовать каждый', 'transform each') }, { code: 'arr.filter(fn) arr.find(fn)', d: L('відібрати / знайти', 'отобрать / найти', 'filter / find') }, { code: 'arr.reduce((acc, x) => ..., init)', d: L('згорнути в одне значення', 'свернуть в одно значение', 'fold into one value') }]
    },
    {
      id: 'functions', chapter: CH5,
      title: L('Функції', 'Функции', 'Functions'),
      theory: L(
        `<p><b>Функція</b> — іменований блок коду, який можна викликати багато разів:</p>
<pre class="inline-code">function greet(name) {
  return \`Hi, \${name}!\`;
}
console.log(greet("Ann"));</pre>
<ul><li><code>name</code> — <b>параметр</b>, <code>"Ann"</code> — <b>аргумент</b></li><li><code>return</code> повертає результат і завершує функцію</li><li>без <code>return</code> функція повертає <code>undefined</code></li></ul>
<p>Функцію можна також створити як <b>вираз</b> і зберегти у змінну:</p>
<pre class="inline-code">const square = function (x) {
  return x * x;
};</pre>
<p>Оголошення <code>function name()</code> «піднімаються» (hoisting) — їх можна викликати навіть вище в коді. Вирази — ні.</p>`,
        `<p><b>Функция</b> — именованный блок кода, который можно вызывать много раз:</p>
<pre class="inline-code">function greet(name) {
  return \`Hi, \${name}!\`;
}
console.log(greet("Ann"));</pre>
<ul><li><code>name</code> — <b>параметр</b>, <code>"Ann"</code> — <b>аргумент</b></li><li><code>return</code> возвращает результат и завершает функцию</li><li>без <code>return</code> функция возвращает <code>undefined</code></li></ul>
<p>Функцию можно также создать как <b>выражение</b> и сохранить в переменную:</p>
<pre class="inline-code">const square = function (x) {
  return x * x;
};</pre>
<p>Объявления <code>function name()</code> «поднимаются» (hoisting) — их можно вызывать даже выше в коде. Выражения — нет.</p>`,
        `<p>A <b>function</b> is a named block of code you can call many times:</p>
<pre class="inline-code">function greet(name) {
  return \`Hi, \${name}!\`;
}
console.log(greet("Ann"));</pre>
<ul><li><code>name</code> is a <b>parameter</b>, <code>"Ann"</code> an <b>argument</b></li><li><code>return</code> gives back a result and ends the function</li><li>without <code>return</code> a function returns <code>undefined</code></li></ul>
<p>A function can also be created as an <b>expression</b> and stored in a variable:</p>
<pre class="inline-code">const square = function (x) {
  return x * x;
};</pre>
<p><code>function name()</code> declarations are hoisted — you can call them even above in the code. Expressions can’t.</p>`),
      why: L(`<p>Функції ділять програму на маленькі зрозумілі частини з іменами: <code>calculateTotal()</code>, <code>showError()</code>. Кожну частину можна перевірити окремо, а повторюваний код писати один раз.</p>`,
        `<p>Функции делят программу на маленькие понятные части с именами: <code>calculateTotal()</code>, <code>showError()</code>. Каждую часть можно проверить отдельно, а повторяющийся код писать один раз.</p>`,
        `<p>Functions split a program into small, clear, named parts: <code>calculateTotal()</code>, <code>showError()</code>. Each part can be tested on its own, and repeated code is written once.</p>`),
      mistakes: L(`<ul><li><code>console.log</code> замість <code>return</code> — значення не повернеться для подальших обчислень.</li><li>Виклик без дужок <code>greet</code> — це посилання на функцію, а не виклик.</li></ul>`,
        `<ul><li><code>console.log</code> вместо <code>return</code> — значение не вернётся для дальнейших вычислений.</li><li>Вызов без скобок <code>greet</code> — это ссылка на функцию, а не вызов.</li></ul>`,
        `<ul><li><code>console.log</code> instead of <code>return</code> — the value isn’t returned for further use.</li><li>Calling without parentheses — <code>greet</code> is a reference to the function, not a call.</li></ul>`),
      examples: [
        { title: 'function', code: 'function greet(name) {\n  return `Hi, ${name}!`;\n}\nconsole.log(greet("Ann"));\nconsole.log(greet("Bob"));', note: L('Класичне оголошення.', 'Классическое объявление.', 'A classic declaration.') },
        { title: 'return', code: 'function area(w, h) {\n  return w * h;\n}\nconst room = area(4, 5);\nconsole.log(room, area(2, 3) + area(1, 1));', note: L('Результат використовується далі.', 'Результат используется дальше.', 'The result is used further.') },
        { title: L('Ранній return', 'Ранний return', 'Early return'), code: 'function grade(score) {\n  if (score >= 90) return "A";\n  if (score >= 70) return "B";\n  return "C";\n}\n[95, 75, 40].forEach((s) => console.log(s, grade(s)));', note: L('return зупиняє функцію.', 'return останавливает функцию.', 'return stops the function.') },
        { title: 'Hoisting', code: 'console.log(double(4));\nfunction double(x) {\n  return x * 2;\n}\ntry {\n  triple(3);\n} catch (e) {\n  console.log(e.name);\n}\nconst triple = function (x) { return x * 3; };', note: L('Оголошення працює до визначення, вираз — ні.', 'Объявление работает до определения, выражение — нет.', 'A declaration works before its definition, an expression doesn’t.') }
      ],
      task: {
        text: L('Напиши функцію <code>isAdult(age)</code>, що повертає <code>true</code>, якщо вік ≥ 18, і функцію <code>countAdults(ages)</code>, що повертає кількість дорослих у масиві. Виклики вже готові.', 'Напиши функцию <code>isAdult(age)</code>, возвращающую <code>true</code>, если возраст ≥ 18, и функцию <code>countAdults(ages)</code>, возвращающую количество взрослых в массиве. Вызовы уже готовы.', 'Write <code>isAdult(age)</code> that returns <code>true</code> if age ≥ 18, and <code>countAdults(ages)</code> that returns the number of adults in an array. The calls are ready.'),
        how: [L('<code>return age &gt;= 18;</code>', '<code>return age &gt;= 18;</code>', '<code>return age &gt;= 18;</code>'), L('<code>return ages.filter(isAdult).length;</code> — функцію можна передати прямо у filter.', '<code>return ages.filter(isAdult).length;</code> — функцию можно передать прямо в filter.', '<code>return ages.filter(isAdult).length;</code> — pass the function straight to filter.')],
        starter: 'function isAdult(age) {\n  // your code\n}\n\nfunction countAdults(ages) {\n  // your code\n}\n\nconsole.log(isAdult(15), isAdult(21));\nconsole.log(countAdults([12, 18, 30, 17, 45]));\n',
        solution: 'function isAdult(age) {\n  return age >= 18;\n}\n\nfunction countAdults(ages) {\n  return ages.filter(isAdult).length;\n}\n\nconsole.log(isAdult(15), isAdult(21));\nconsole.log(countAdults([12, 18, 30, 17, 45]));\n',
        hint: L('Очікувано: <code>false true</code> і <code>3</code>.', 'Ожидается: <code>false true</code> и <code>3</code>.', 'Expected: <code>false true</code> and <code>3</code>.'),
        expected: 'false true\n3',
        must: /return/
      },
      quiz: { q: L('Що повертає функція без <code>return</code>?', 'Что возвращает функция без <code>return</code>?', 'What does a function without <code>return</code> return?'), options: ['null', 'undefined', '0'], answer: 1, explain: L('За замовчуванням — undefined.', 'По умолчанию — undefined.', 'undefined by default.') },
      ref: [{ code: 'function f(a) { return a; }', d: L('оголошення функції', 'объявление функции', 'function declaration') }, { code: 'const f = function () {}', d: L('функціональний вираз', 'функциональное выражение', 'function expression') }]
    },
    {
      id: 'arrow', chapter: CH5,
      title: L('Стрілкові функції та параметри', 'Стрелочные функции и параметры', 'Arrow functions and parameters'),
      theory: L(
        `<p><b>Стрілкова функція</b> — короткий сучасний запис:</p>
<pre class="inline-code">const add = (a, b) => a + b;
const square = x => x * x;          // один параметр — без дужок
const hello = () => "Hello!";       // без параметрів
const sum = (a, b) => {             // кілька рядків — фігурні дужки і return
  const s = a + b;
  return s;
};</pre>
<p>Якщо тіло — один вираз, він повертається <b>автоматично</b>, без <code>return</code>.</p>
<h4>Параметри</h4>
<ul><li>Значення за замовчуванням: <code>(name = "Guest") =&gt; ...</code></li><li>Rest-параметр збирає решту аргументів у масив: <code>(...nums) =&gt; nums.length</code></li></ul>`,
        `<p><b>Стрелочная функция</b> — короткая современная запись:</p>
<pre class="inline-code">const add = (a, b) => a + b;
const square = x => x * x;          // один параметр — без скобок
const hello = () => "Hello!";       // без параметров
const sum = (a, b) => {             // несколько строк — фигурные скобки и return
  const s = a + b;
  return s;
};</pre>
<p>Если тело — одно выражение, оно возвращается <b>автоматически</b>, без <code>return</code>.</p>
<h4>Параметры</h4>
<ul><li>Значение по умолчанию: <code>(name = "Guest") =&gt; ...</code></li><li>Rest-параметр собирает остальные аргументы в массив: <code>(...nums) =&gt; nums.length</code></li></ul>`,
        `<p>An <b>arrow function</b> is a short modern syntax:</p>
<pre class="inline-code">const add = (a, b) => a + b;
const square = x => x * x;          // one parameter — no parentheses
const hello = () => "Hello!";       // no parameters
const sum = (a, b) => {             // several lines — braces and return
  const s = a + b;
  return s;
};</pre>
<p>If the body is a single expression, it’s returned <b>automatically</b>, no <code>return</code> needed.</p>
<h4>Parameters</h4>
<ul><li>Default values: <code>(name = "Guest") =&gt; ...</code></li><li>A rest parameter collects the remaining arguments into an array: <code>(...nums) =&gt; nums.length</code></li></ul>`),
      why: L(`<p>Стрілкові функції ідеальні для коротких колбеків у <code>map</code>, <code>filter</code>, обробниках подій. Ще одна їхня особливість — у них немає власного <code>this</code>, що зручно всередині методів об’єктів і класів (детальніше — далі).</p>`,
        `<p>Стрелочные функции идеальны для коротких колбэков в <code>map</code>, <code>filter</code>, обработчиках событий. Ещё одна их особенность — у них нет собственного <code>this</code>, что удобно внутри методов объектов и классов (подробнее — дальше).</p>`,
        `<p>Arrow functions are perfect for short callbacks in <code>map</code>, <code>filter</code> and event handlers. They also have no <code>this</code> of their own, which is handy inside object and class methods (more later).</p>`),
      mistakes: L(`<ul><li>Повернути об’єкт: <code>() =&gt; { a: 1 }</code> — фігурні дужки сприймаються як тіло! Правильно: <code>() =&gt; ({ a: 1 })</code>.</li><li>Багаторядкове тіло без <code>return</code> → undefined.</li></ul>`,
        `<ul><li>Вернуть объект: <code>() =&gt; { a: 1 }</code> — фигурные скобки воспринимаются как тело! Правильно: <code>() =&gt; ({ a: 1 })</code>.</li><li>Многострочное тело без <code>return</code> → undefined.</li></ul>`,
        `<ul><li>Returning an object: <code>() =&gt; { a: 1 }</code> — the braces are read as a body! Correct: <code>() =&gt; ({ a: 1 })</code>.</li><li>A multi-line body without <code>return</code> → undefined.</li></ul>`),
      examples: [
        { title: L('Короткі', 'Короткие', 'Short'), code: 'const square = (x) => x * x;\nconst add = (a, b) => a + b;\nconst hello = () => "Hello!";\nconsole.log(square(7), add(2, 3), hello());', note: L('Один вираз — автоматичний return.', 'Одно выражение — автоматический return.', 'One expression — automatic return.') },
        { title: L('За замовчуванням', 'По умолчанию', 'Defaults'), code: 'const power = (base, exp = 2) => base ** exp;\nconsole.log(power(5));\nconsole.log(power(2, 10));\nconst greet = (name = "Guest") => `Hi, ${name}`;\nconsole.log(greet(), greet("Ann"));', note: L('Параметр отримує значення, якщо аргумент не передано.', 'Параметр получает значение, если аргумент не передан.', 'The parameter gets a value when no argument is passed.') },
        { title: 'rest', code: 'const average = (...nums) => nums.reduce((a, b) => a + b, 0) / nums.length;\nconsole.log(average(10, 20));\nconsole.log(average(1, 2, 3, 4, 5));\nconst nums = [4, 8];\nconsole.log(average(...nums));', note: L('<code>...</code> у параметрах збирає, у виклику — розгортає.', '<code>...</code> в параметрах собирает, в вызове — разворачивает.', '<code>...</code> gathers in parameters, spreads in calls.') },
        { title: L('Об’єкт', 'Объект', 'Object'), code: 'const makeUser = (name, age) => ({ name, age });\nconsole.log(makeUser("Ira", 14));\nconst bad = () => { name: "x" };\nconsole.log(bad());', note: L('Об’єкт треба взяти в круглі дужки.', 'Объект нужно взять в круглые скобки.', 'Wrap the object in parentheses.') }
      ],
      task: {
        text: L('Напиши стрілкові функції: <code>discount(price, percent = 10)</code> — повертає ціну зі знижкою; <code>total(...prices)</code> — повертає суму всіх цін. Виклики вже готові.', 'Напиши стрелочные функции: <code>discount(price, percent = 10)</code> — возвращает цену со скидкой; <code>total(...prices)</code> — возвращает сумму всех цен. Вызовы уже готовы.', 'Write arrow functions: <code>discount(price, percent = 10)</code> returns the discounted price; <code>total(...prices)</code> returns the sum of all prices. The calls are ready.'),
        how: [L('<code>const discount = (price, percent = 10) =&gt; price * (1 - percent / 100);</code>', '<code>const discount = (price, percent = 10) =&gt; price * (1 - percent / 100);</code>', '<code>const discount = (price, percent = 10) =&gt; price * (1 - percent / 100);</code>'), L('<code>const total = (...prices) =&gt; prices.reduce(...)</code>', '<code>const total = (...prices) =&gt; prices.reduce(...)</code>', '<code>const total = (...prices) =&gt; prices.reduce(...)</code>')],
        starter: '// your functions here\n\nconsole.log(discount(200));\nconsole.log(discount(200, 25));\nconsole.log(total(10, 20, 30));\nconsole.log(total(discount(100), discount(50, 50)));\n',
        solution: 'const discount = (price, percent = 10) => price * (1 - percent / 100);\nconst total = (...prices) => prices.reduce((a, b) => a + b, 0);\n\nconsole.log(discount(200));\nconsole.log(discount(200, 25));\nconsole.log(total(10, 20, 30));\nconsole.log(total(discount(100), discount(50, 50)));\n',
        hint: L('Очікувано: 180, 150, 60, 115.', 'Ожидается: 180, 150, 60, 115.', 'Expected: 180, 150, 60, 115.'),
        expected: '180\n150\n60\n115',
        must: /=>/
      },
      quiz: { q: L('Як правильно повернути об’єкт зі стрілкової функції?', 'Как правильно вернуть объект из стрелочной функции?', 'How do you correctly return an object from an arrow function?'), options: ['() => { a: 1 }', '() => ({ a: 1 })', '() => [a: 1]'], answer: 1, explain: L('Круглі дужки навколо об’єкта.', 'Круглые скобки вокруг объекта.', 'Parentheses around the object.') },
      ref: [{ code: '(a, b) => a + b', d: L('стрілкова функція', 'стрелочная функция', 'arrow function') }, { code: '(x = 1) =>', d: L('значення за замовчуванням', 'значение по умолчанию', 'default value') }, { code: '(...args) =>', d: L('rest-параметр', 'rest-параметр', 'rest parameter') }]
    },
    {
      id: 'scope', chapter: CH5,
      title: L('Область видимості та замикання', 'Область видимости и замыкания', 'Scope and closures'),
      theory: L(
        `<p><b>Область видимості</b> визначає, де доступна змінна. Змінні <code>let</code> і <code>const</code> мають <b>блочну</b> видимість — вони існують лише всередині <code>{ }</code>, де оголошені:</p>
<pre class="inline-code">if (true) {
  const secret = 42;
}
console.log(secret); // ReferenceError</pre>
<p>Внутрішня функція бачить змінні зовнішньої. Більше того — вона <b>запам’ятовує</b> їх навіть після того, як зовнішня функція завершилася. Це називається <b>замикання</b> (closure):</p>
<pre class="inline-code">function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
next(); next();   // 1, 2</pre>
<p>Змінна <code>count</code> «живе» всередині замикання, і змінити її ззовні неможливо.</p>`,
        `<p><b>Область видимости</b> определяет, где доступна переменная. Переменные <code>let</code> и <code>const</code> имеют <b>блочную</b> видимость — они существуют только внутри <code>{ }</code>, где объявлены:</p>
<pre class="inline-code">if (true) {
  const secret = 42;
}
console.log(secret); // ReferenceError</pre>
<p>Внутренняя функция видит переменные внешней. Более того — она <b>запоминает</b> их даже после того, как внешняя функция завершилась. Это называется <b>замыкание</b> (closure):</p>
<pre class="inline-code">function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
next(); next();   // 1, 2</pre>
<p>Переменная <code>count</code> «живёт» внутри замыкания, и изменить её снаружи невозможно.</p>`,
        `<p><b>Scope</b> determines where a variable is available. <code>let</code> and <code>const</code> are <b>block-scoped</b> — they exist only inside the <code>{ }</code> where they’re declared:</p>
<pre class="inline-code">if (true) {
  const secret = 42;
}
console.log(secret); // ReferenceError</pre>
<p>An inner function sees the outer function’s variables. Moreover, it <b>remembers</b> them even after the outer function has finished. This is a <b>closure</b>:</p>
<pre class="inline-code">function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
next(); next();   // 1, 2</pre>
<p><code>count</code> lives inside the closure and can’t be changed from outside.</p>`),
      why: L(`<p>Замикання дозволяють створювати <b>приватні дані</b>: лічильник, який не можна «зламати» ззовні, функції з налаштуваннями (<code>makeMultiplier(3)</code>), обробники подій, що пам’ятають контекст. Це одна з найважливіших ідей JavaScript.</p>`,
        `<p>Замыкания позволяют создавать <b>приватные данные</b>: счётчик, который нельзя «сломать» снаружи, функции с настройками (<code>makeMultiplier(3)</code>), обработчики событий, помнящие контекст. Это одна из важнейших идей JavaScript.</p>`,
        `<p>Closures let you create <b>private data</b>: a counter that can’t be broken from outside, configured functions (<code>makeMultiplier(3)</code>), event handlers that remember context. It’s one of JavaScript’s most important ideas.</p>`),
      mistakes: L(`<ul><li>Використати змінну поза її блоком → <code>ReferenceError</code>.</li><li>Змінна з тим самим ім’ям усередині блоку «затіняє» зовнішню — легко заплутатися.</li></ul>`,
        `<ul><li>Использовать переменную вне её блока → <code>ReferenceError</code>.</li><li>Переменная с тем же именем внутри блока «затеняет» внешнюю — легко запутаться.</li></ul>`,
        `<ul><li>Using a variable outside its block → <code>ReferenceError</code>.</li><li>A same-named variable inside a block shadows the outer one — easy to get confused.</li></ul>`),
      examples: [
        { title: L('Блочна видимість', 'Блочная видимость', 'Block scope'), code: 'const x = "outer";\n{\n  const x = "inner";\n  console.log(x);\n}\nconsole.log(x);', note: L('Внутрішня <code>x</code> затіняє зовнішню лише всередині блоку.', 'Внутренняя <code>x</code> затеняет внешнюю только внутри блока.', 'The inner <code>x</code> shadows the outer only inside the block.') },
        { title: L('Лічильник', 'Счётчик', 'Counter'), code: 'function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst a = makeCounter();\nconst b = makeCounter();\nconsole.log(a(), a(), a());\nconsole.log(b());', note: L('Кожен лічильник має свою приватну змінну.', 'У каждого счётчика своя приватная переменная.', 'Each counter has its own private variable.') },
        { title: L('Фабрика функцій', 'Фабрика функций', 'Function factory'), code: 'const makeMultiplier = (k) => (x) => x * k;\nconst double = makeMultiplier(2);\nconst triple = makeMultiplier(3);\nconsole.log(double(5), triple(5));', note: L('Функція повертає функцію, яка пам’ятає <code>k</code>.', 'Функция возвращает функцию, которая помнит <code>k</code>.', 'A function returns a function that remembers <code>k</code>.') },
        { title: L('Банк', 'Банк', 'Bank'), code: 'function createWallet(start) {\n  let balance = start;\n  return {\n    deposit: (n) => { balance += n; },\n    get: () => balance\n  };\n}\nconst w = createWallet(100);\nw.deposit(50);\nconsole.log(w.get());\nconsole.log(w.balance);', note: L('Напряму до <code>balance</code> не дістатися — лише через методи.', 'Напрямую к <code>balance</code> не добраться — только через методы.', 'You can’t reach <code>balance</code> directly — only via methods.') }
      ],
      task: {
        text: L('Напиши функцію <code>makeScore()</code>, що повертає об’єкт з методами <code>add(n)</code> (додає очки) і <code>total()</code> (повертає суму). Очки мають зберігатися в замиканні. Код нижче вже використовує два незалежні рахунки.', 'Напиши функцию <code>makeScore()</code>, возвращающую объект с методами <code>add(n)</code> (добавляет очки) и <code>total()</code> (возвращает сумму). Очки должны храниться в замыкании. Код ниже уже использует два независимых счёта.', 'Write <code>makeScore()</code> returning an object with methods <code>add(n)</code> (adds points) and <code>total()</code> (returns the sum). Points must live in a closure. The code below already uses two independent scores.'),
        how: [L('Усередині: <code>let points = 0;</code>', 'Внутри: <code>let points = 0;</code>', 'Inside: <code>let points = 0;</code>'), L('Поверни <code>{ add: (n) =&gt; { points += n; }, total: () =&gt; points }</code>.', 'Верни <code>{ add: (n) =&gt; { points += n; }, total: () =&gt; points }</code>.', 'Return <code>{ add: (n) =&gt; { points += n; }, total: () =&gt; points }</code>.')],
        starter: 'function makeScore() {\n  // your code\n}\n\nconst ann = makeScore();\nconst bob = makeScore();\nann.add(10);\nann.add(5);\nbob.add(7);\nconsole.log(ann.total(), bob.total());\n',
        solution: 'function makeScore() {\n  let points = 0;\n  return {\n    add: (n) => { points += n; },\n    total: () => points\n  };\n}\n\nconst ann = makeScore();\nconst bob = makeScore();\nann.add(10);\nann.add(5);\nbob.add(7);\nconsole.log(ann.total(), bob.total());\n',
        hint: L('Очікувано: <code>15 7</code>.', 'Ожидается: <code>15 7</code>.', 'Expected: <code>15 7</code>.'),
        expected: '15 7',
        must: /let\s+\w+\s*=\s*0/
      },
      quiz: { q: L('Що таке замикання?', 'Что такое замыкание?', 'What is a closure?'), options: [L('функція, що пам’ятає змінні з місця створення', 'функция, помнящая переменные из места создания', 'a function that remembers variables from where it was created'), L('закритий цикл', 'закрытый цикл', 'a closed loop'), L('приватний клас', 'приватный класс', 'a private class')], answer: 0, explain: L('Внутрішня функція «тримає» зовнішні змінні.', 'Внутренняя функция «держит» внешние переменные.', 'The inner function holds on to outer variables.') },
      ref: [{ code: '{ let x }', d: L('блочна видимість', 'блочная видимость', 'block scope') }, { code: 'const f = () => () => ...', d: L('замикання', 'замыкание', 'closure') }]
    }
  ]);
})();
