// JavaScript — частина 1: основи.
(function () {
  const L = Codry.L;
  const CH1 = L('Основи', 'Основы', 'Basics');
  const CH2 = L('Умови та логіка', 'Условия и логика', 'Conditions and logic');

  Codry.steps('javascript', [
    {
      id: 'console', chapter: CH1,
      title: L('Перша програма: console.log', 'Первая программа: console.log', 'Your first program: console.log'),
      theory: L(
        `<p><b>JavaScript</b> (JS) — мова, яка працює в кожному браузері. Саме вона робить сайти інтерактивними: кнопки, анімації, ігри, чати. А ще на JS пишуть сервери (Node.js) і мобільні застосунки.</p>
<p>Щоб вивести щось у <b>консоль</b>, використовують <code>console.log()</code>:</p>
<pre class="inline-code">console.log("Hello!");
console.log(2 + 3);</pre>
<p>Текст беруть у лапки: <code>"..."</code>, <code>'...'</code> або зворотні <code>\`...\`</code>. Кожну інструкцію прийнято закінчувати крапкою з комою <code>;</code>.</p>
<p>Коментарі: <code>// один рядок</code> або <code>/* кілька рядків */</code>.</p>`,
        `<p><b>JavaScript</b> (JS) — язык, который работает в каждом браузере. Именно он делает сайты интерактивными: кнопки, анимации, игры, чаты. А ещё на JS пишут серверы (Node.js) и мобильные приложения.</p>
<p>Чтобы вывести что-то в <b>консоль</b>, используют <code>console.log()</code>:</p>
<pre class="inline-code">console.log("Hello!");
console.log(2 + 3);</pre>
<p>Текст берут в кавычки: <code>"..."</code>, <code>'...'</code> или обратные <code>\`...\`</code>. Каждую инструкцию принято заканчивать точкой с запятой <code>;</code>.</p>
<p>Комментарии: <code>// одна строка</code> или <code>/* несколько строк */</code>.</p>`,
        `<p><b>JavaScript</b> (JS) runs in every browser. It makes websites interactive: buttons, animations, games, chats. JS also powers servers (Node.js) and mobile apps.</p>
<p>To print something to the <b>console</b>, use <code>console.log()</code>:</p>
<pre class="inline-code">console.log("Hello!");
console.log(2 + 3);</pre>
<p>Text goes in quotes: <code>"..."</code>, <code>'...'</code> or backticks <code>\`...\`</code>. Each statement conventionally ends with a semicolon <code>;</code>.</p>
<p>Comments: <code>// one line</code> or <code>/* several lines */</code>.</p>`),
      why: L(`<p>Консоль — головний інструмент розробника. Навіть професіонали постійно використовують <code>console.log</code>, щоб подивитися, що відбувається всередині програми. Відкрий у браузері F12 → Console — там JS теж працює!</p>`,
        `<p>Консоль — главный инструмент разработчика. Даже профессионалы постоянно используют <code>console.log</code>, чтобы посмотреть, что происходит внутри программы. Открой в браузере F12 → Console — там JS тоже работает!</p>`,
        `<p>The console is a developer’s main tool. Even pros use <code>console.log</code> all the time to see what’s happening inside a program. Press F12 → Console in your browser — JS works there too!</p>`),
      mistakes: L(`<ul><li><code>Console.log</code> — JS розрізняє регістр, правильно <code>console</code>.</li><li><code>console.log(Hello)</code> без лапок → <code>ReferenceError: Hello is not defined</code>.</li></ul>`,
        `<ul><li><code>Console.log</code> — JS различает регистр, правильно <code>console</code>.</li><li><code>console.log(Hello)</code> без кавычек → <code>ReferenceError: Hello is not defined</code>.</li></ul>`,
        `<ul><li><code>Console.log</code> — JS is case-sensitive; it’s <code>console</code>.</li><li><code>console.log(Hello)</code> without quotes → <code>ReferenceError: Hello is not defined</code>.</li></ul>`),
      examples: [
        { title: 'Hello', code: 'console.log("Hello, world!");', note: L('Перша програма на JS.', 'Первая программа на JS.', 'Your first JS program.') },
        { title: L('Кілька значень', 'Несколько значений', 'Several values'), code: 'console.log("Score:", 100);\nconsole.log(2 + 2);\nconsole.log("2 + 2");', note: L('Без лапок — обчислення, у лапках — текст.', 'Без кавычек — вычисление, в кавычках — текст.', 'Without quotes it’s calculated, with quotes it’s text.') },
        { title: L('Види повідомлень', 'Виды сообщений', 'Message types'), code: 'console.log("Normal message");\nconsole.warn("Warning");\nconsole.error("Error");', note: L('У консолі вони мають різні кольори.', 'В консоли они разного цвета.', 'They have different colours in the console.') },
        { title: L('Коментарі', 'Комментарии', 'Comments'), code: '// This line is a comment\nconsole.log("Visible"); // comment after code\n/* console.log("Hidden");\n   console.log("Hidden too"); */', note: L('Закоментований код не виконується.', 'Закомментированный код не выполняется.', 'Commented code doesn’t run.') }
      ],
      task: {
        text: L('Виведи в консоль два рядки: <code>I love JS</code> і результат обчислення <code>7 * 6</code>.', 'Выведи в консоль две строки: <code>I love JS</code> и результат вычисления <code>7 * 6</code>.', 'Print two lines: <code>I love JS</code> and the result of <code>7 * 6</code>.'),
        how: [L('<code>console.log("I love JS");</code>', '<code>console.log("I love JS");</code>', '<code>console.log("I love JS");</code>'), L('Другий виклик без лапок: <code>console.log(7 * 6);</code>', 'Второй вызов без кавычек: <code>console.log(7 * 6);</code>', 'Second call without quotes: <code>console.log(7 * 6);</code>')],
        starter: L('// Напиши код нижче\n', '// Напиши код ниже\n', '// Write your code below\n'),
        solution: 'console.log("I love JS");\nconsole.log(7 * 6);',
        hint: L('Друге значення має бути числом 42, обчисленим JS.', 'Второе значение должно быть числом 42, вычисленным JS.', 'The second value must be 42, computed by JS.'),
        expected: 'I love JS\n42',
        must: /7\s*\*\s*6/
      },
      quiz: { q: L('Що виведе <code>console.log(1 + "1")</code>?', 'Что выведет <code>console.log(1 + "1")</code>?', 'What does <code>console.log(1 + "1")</code> print?'), options: ['2', '11', 'Error'], answer: 1, explain: L('Число + рядок = склеювання рядків.', 'Число + строка = склеивание строк.', 'Number + string = string concatenation.') },
      ref: [{ code: 'console.log(x)', d: L('вивести в консоль', 'вывести в консоль', 'print to the console') }, { code: '// /* */', d: L('коментарі', 'комментарии', 'comments') }]
    },
    {
      id: 'vars', chapter: CH1,
      title: L('Змінні: let і const', 'Переменные: let и const', 'Variables: let and const'),
      theory: L(
        `<p>Змінні оголошують через <code>let</code> або <code>const</code>:</p>
<pre class="inline-code">let score = 0;        // можна змінювати
const name = "Alex";  // константа — не можна перепризначити
score = score + 10;
score += 5;</pre>
<p><code>let</code> — для значень, які змінюватимуться. <code>const</code> — для тих, що не змінюються. Правило: <b>використовуй <code>const</code> за замовчуванням</b>, а <code>let</code> — лише коли справді треба змінювати.</p>
<p>Імена пишуть у стилі <code>camelCase</code>: <code>userName</code>, <code>maxScore</code>. Можна латиницю, цифри, <code>_</code> і <code>$</code>, але не починати з цифри.</p>
<p><code>++</code> і <code>--</code> збільшують/зменшують на 1: <code>lives--</code>.</p>`,
        `<p>Переменные объявляют через <code>let</code> или <code>const</code>:</p>
<pre class="inline-code">let score = 0;        // можно менять
const name = "Alex";  // константа — нельзя переназначить
score = score + 10;
score += 5;</pre>
<p><code>let</code> — для значений, которые будут меняться. <code>const</code> — для тех, что не меняются. Правило: <b>используй <code>const</code> по умолчанию</b>, а <code>let</code> — только когда действительно нужно менять.</p>
<p>Имена пишут в стиле <code>camelCase</code>: <code>userName</code>, <code>maxScore</code>. Можно латиницу, цифры, <code>_</code> и <code>$</code>, но не начинать с цифры.</p>
<p><code>++</code> и <code>--</code> увеличивают/уменьшают на 1: <code>lives--</code>.</p>`,
        `<p>Declare variables with <code>let</code> or <code>const</code>:</p>
<pre class="inline-code">let score = 0;        // can change
const name = "Alex";  // constant — can’t be reassigned
score = score + 10;
score += 5;</pre>
<p><code>let</code> is for values that will change, <code>const</code> for those that won’t. Rule: <b>use <code>const</code> by default</b> and <code>let</code> only when you really need to reassign.</p>
<p>Names use <code>camelCase</code>: <code>userName</code>, <code>maxScore</code>. Latin letters, digits, <code>_</code> and <code>$</code> are allowed, but no leading digit.</p>
<p><code>++</code> and <code>--</code> add/subtract 1: <code>lives--</code>.</p>`),
      why: L(`<p>Чому <code>const</code> за замовчуванням? Коли бачиш <code>const</code>, одразу знаєш: це значення не зміниться нижче в коді. Менше сюрпризів — менше помилок. А старе <code>var</code> має дивні правила видимості, тому його вже майже не використовують.</p>`,
        `<p>Почему <code>const</code> по умолчанию? Когда видишь <code>const</code>, сразу знаешь: это значение не изменится ниже в коде. Меньше сюрпризов — меньше ошибок. А старое <code>var</code> имеет странные правила видимости, поэтому его уже почти не используют.</p>`,
        `<p>Why <code>const</code> by default? When you see <code>const</code> you know the value won’t change further down. Fewer surprises, fewer bugs. The old <code>var</code> has odd scoping rules, so it’s rarely used today.</p>`),
      mistakes: L(`<ul><li>Перепризначити <code>const</code> → <code>TypeError: Assignment to constant variable</code>.</li><li>Оголосити ту саму змінну двічі через <code>let</code> → <code>SyntaxError</code>.</li><li>Використати змінну до оголошення → <code>ReferenceError</code>.</li></ul>`,
        `<ul><li>Переназначить <code>const</code> → <code>TypeError: Assignment to constant variable</code>.</li><li>Объявить ту же переменную дважды через <code>let</code> → <code>SyntaxError</code>.</li><li>Использовать переменную до объявления → <code>ReferenceError</code>.</li></ul>`,
        `<ul><li>Reassigning a <code>const</code> → <code>TypeError: Assignment to constant variable</code>.</li><li>Declaring the same variable twice with <code>let</code> → <code>SyntaxError</code>.</li><li>Using a variable before declaring it → <code>ReferenceError</code>.</li></ul>`),
      examples: [
        { title: 'let', code: 'let lives = 3;\nconsole.log(lives);\nlives = lives - 1;\nconsole.log(lives);\nlives--;\nconsole.log(lives);', note: L('<code>lives--</code> — те саме, що <code>lives = lives - 1</code>.', '<code>lives--</code> — то же, что <code>lives = lives - 1</code>.', '<code>lives--</code> is the same as <code>lives = lives - 1</code>.') },
        { title: 'const', code: 'const PI = 3.14159;\nconsole.log(PI);\ntry {\n  PI = 3;\n} catch (e) {\n  console.log("Error:", e.message);\n}', note: L('Константу не можна перепризначити.', 'Константу нельзя переназначить.', 'A constant can’t be reassigned.') },
        { title: L('Покупка', 'Покупка', 'Shopping'), code: 'const price = 45;\nconst count = 3;\nlet total = price * count;\nconsole.log("Total:", total);\ntotal -= 15;\nconsole.log("With discount:", total);', note: L('Ціна і кількість не змінюються — <code>const</code>, сума змінюється — <code>let</code>.', 'Цена и количество не меняются — <code>const</code>, сумма меняется — <code>let</code>.', 'Price and count don’t change — <code>const</code>; total does — <code>let</code>.') },
        { title: L('Обмін значень', 'Обмен значений', 'Swapping'), code: 'let a = 1;\nlet b = 2;\n[a, b] = [b, a];\nconsole.log(a, b);', note: L('Деструктуризація масиву — про неї пізніше.', 'Деструктуризация массива — о ней позже.', 'Array destructuring — more on it later.') }
      ],
      task: {
        text: L('Створи константу <code>hero</code> = <code>"Neo"</code> і змінну <code>level</code> = <code>1</code>. Двічі збільш <code>level</code> на 1 (через <code>++</code>) і виведи <code>console.log(hero, level)</code> — має бути <code>Neo 3</code>.', 'Создай константу <code>hero</code> = <code>"Neo"</code> и переменную <code>level</code> = <code>1</code>. Дважды увеличь <code>level</code> на 1 (через <code>++</code>) и выведи <code>console.log(hero, level)</code> — должно быть <code>Neo 3</code>.', 'Create a constant <code>hero</code> = <code>"Neo"</code> and a variable <code>level</code> = <code>1</code>. Increase <code>level</code> by 1 twice (with <code>++</code>) and print <code>console.log(hero, level)</code> — it should be <code>Neo 3</code>.'),
        how: [L('<code>const hero = "Neo";</code>', '<code>const hero = "Neo";</code>', '<code>const hero = "Neo";</code>'), L('<code>let level = 1;</code>, потім двічі <code>level++;</code>', '<code>let level = 1;</code>, затем дважды <code>level++;</code>', '<code>let level = 1;</code>, then <code>level++;</code> twice')],
        starter: '',
        solution: 'const hero = "Neo";\nlet level = 1;\nlevel++;\nlevel++;\nconsole.log(hero, level);',
        hint: L('Не пиши 3 вручну.', 'Не пиши 3 вручную.', 'Don’t write 3 by hand.'),
        expected: 'Neo 3',
        check: (out, code) => out.trim() === 'Neo 3' && /const\s+hero/.test(code) && /let\s+level/.test(code) && /\+\+/.test(code)
      },
      quiz: { q: L('Що з цього не можна перепризначити?', 'Что из этого нельзя переназначить?', 'Which one cannot be reassigned?'), options: ['let', 'const', 'var'], answer: 1, explain: L('<code>const</code> — константа.', '<code>const</code> — константа.', '<code>const</code> is a constant.') },
      ref: [{ code: 'let x = 1;', d: L('змінна', 'переменная', 'variable') }, { code: 'const Y = 2;', d: L('константа', 'константа', 'constant') }, { code: 'x++  x += 5', d: L('збільшення', 'увеличение', 'increment') }]
    },
    {
      id: 'types', chapter: CH1,
      title: L('Типи даних', 'Типы данных', 'Data types'),
      theory: L(
        `<p>Основні (примітивні) типи JavaScript:</p>
<table class="mini"><tr><td><code>number</code></td><td>будь-яке число: <code>42</code>, <code>3.14</code>, <code>-7</code></td></tr><tr><td><code>string</code></td><td>текст: <code>"cat"</code></td></tr><tr><td><code>boolean</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>undefined</code></td><td>значення ще не присвоєно</td></tr><tr><td><code>null</code></td><td>«навмисно порожньо»</td></tr></table>
<p>Ще є складні типи: об’єкти та масиви. Оператор <code>typeof</code> показує тип: <code>typeof 42</code> → <code>"number"</code>.</p>
<h4>Перетворення</h4>
<ul><li><code>Number("42")</code> → 42, <code>parseInt("42px")</code> → 42, <code>parseFloat("3.5")</code> → 3.5</li><li><code>String(42)</code> → <code>"42"</code>, або <code>(42).toString()</code></li><li><code>Number("abc")</code> → <code>NaN</code> (Not a Number — «не число»)</li></ul>`,
        `<p>Основные (примитивные) типы JavaScript:</p>
<table class="mini"><tr><td><code>number</code></td><td>любое число: <code>42</code>, <code>3.14</code>, <code>-7</code></td></tr><tr><td><code>string</code></td><td>текст: <code>"cat"</code></td></tr><tr><td><code>boolean</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>undefined</code></td><td>значение ещё не присвоено</td></tr><tr><td><code>null</code></td><td>«намеренно пусто»</td></tr></table>
<p>Ещё есть сложные типы: объекты и массивы. Оператор <code>typeof</code> показывает тип: <code>typeof 42</code> → <code>"number"</code>.</p>
<h4>Преобразования</h4>
<ul><li><code>Number("42")</code> → 42, <code>parseInt("42px")</code> → 42, <code>parseFloat("3.5")</code> → 3.5</li><li><code>String(42)</code> → <code>"42"</code>, или <code>(42).toString()</code></li><li><code>Number("abc")</code> → <code>NaN</code> (Not a Number — «не число»)</li></ul>`,
        `<p>JavaScript’s basic (primitive) types:</p>
<table class="mini"><tr><td><code>number</code></td><td>any number: <code>42</code>, <code>3.14</code>, <code>-7</code></td></tr><tr><td><code>string</code></td><td>text: <code>"cat"</code></td></tr><tr><td><code>boolean</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>undefined</code></td><td>no value assigned yet</td></tr><tr><td><code>null</code></td><td>“intentionally empty”</td></tr></table>
<p>There are also complex types: objects and arrays. <code>typeof</code> shows the type: <code>typeof 42</code> → <code>"number"</code>.</p>
<h4>Conversion</h4>
<ul><li><code>Number("42")</code> → 42, <code>parseInt("42px")</code> → 42, <code>parseFloat("3.5")</code> → 3.5</li><li><code>String(42)</code> → <code>"42"</code>, or <code>(42).toString()</code></li><li><code>Number("abc")</code> → <code>NaN</code> (Not a Number)</li></ul>`),
      why: L(`<p>JavaScript перетворює типи <b>автоматично</b>, і це іноді дивує: <code>"5" * 2</code> = 10, але <code>"5" + 2</code> = "52". Оператор <code>+</code> віддає перевагу рядкам. Тому важливо знати типи своїх даних і перетворювати їх явно.</p>`,
        `<p>JavaScript преобразует типы <b>автоматически</b>, и это иногда удивляет: <code>"5" * 2</code> = 10, но <code>"5" + 2</code> = "52". Оператор <code>+</code> предпочитает строки. Поэтому важно знать типы своих данных и преобразовывать их явно.</p>`,
        `<p>JavaScript converts types <b>automatically</b>, which can surprise you: <code>"5" * 2</code> = 10, but <code>"5" + 2</code> = "52". The <code>+</code> operator prefers strings. So know your data’s types and convert explicitly.</p>`),
      mistakes: L(`<ul><li><code>typeof null</code> → <code>"object"</code> — це історична помилка JS, просто запам’ятай.</li><li><code>NaN === NaN</code> → false! Перевіряй через <code>Number.isNaN(x)</code>.</li></ul>`,
        `<ul><li><code>typeof null</code> → <code>"object"</code> — это историческая ошибка JS, просто запомни.</li><li><code>NaN === NaN</code> → false! Проверяй через <code>Number.isNaN(x)</code>.</li></ul>`,
        `<ul><li><code>typeof null</code> → <code>"object"</code> — a historical JS bug, just remember it.</li><li><code>NaN === NaN</code> → false! Check with <code>Number.isNaN(x)</code>.</li></ul>`),
      examples: [
        { title: 'typeof', code: 'console.log(typeof 42);\nconsole.log(typeof "hi");\nconsole.log(typeof true);\nconsole.log(typeof undefined);\nconsole.log(typeof null);\nconsole.log(typeof [1, 2]);', note: L('Масиви та null — теж <code>object</code>.', 'Массивы и null — тоже <code>object</code>.', 'Arrays and null are also <code>object</code>.') },
        { title: L('Автоперетворення', 'Автопреобразование', 'Auto conversion'), code: 'console.log("5" + 2);\nconsole.log("5" - 2);\nconsole.log("5" * "2");\nconsole.log(true + 1);', note: L('<code>+</code> склеює, інші оператори рахують.', '<code>+</code> склеивает, остальные операторы считают.', '<code>+</code> concatenates, other operators calculate.') },
        { title: L('Явне перетворення', 'Явное преобразование', 'Explicit conversion'), code: 'console.log(Number("42") + 8);\nconsole.log(parseInt("100px"));\nconsole.log(parseFloat("2.5kg"));\nconsole.log(String(7) + 7);', note: L('<code>parseInt</code> читає число з початку рядка.', '<code>parseInt</code> читает число из начала строки.', '<code>parseInt</code> reads a number from the start of the string.') },
        { title: 'NaN', code: 'const x = Number("abc");\nconsole.log(x);\nconsole.log(typeof x);\nconsole.log(x === NaN);\nconsole.log(Number.isNaN(x));', note: L('NaN — «не число», але тип у нього number.', 'NaN — «не число», но тип у него number.', 'NaN means “not a number”, yet its type is number.') }
      ],
      task: {
        text: L('Є рядки <code>a = "12"</code> і <code>b = "30"</code>. Виведи їхню суму <b>як чисел</b> (42), а потім результат склеювання (1230).', 'Есть строки <code>a = "12"</code> и <code>b = "30"</code>. Выведи их сумму <b>как чисел</b> (42), а затем результат склеивания (1230).', 'Given strings <code>a = "12"</code> and <code>b = "30"</code>, print their sum <b>as numbers</b> (42), then the concatenation (1230).'),
        how: [L('<code>Number(a) + Number(b)</code>', '<code>Number(a) + Number(b)</code>', '<code>Number(a) + Number(b)</code>'), L('<code>a + b</code>', '<code>a + b</code>', '<code>a + b</code>')],
        starter: 'const a = "12";\nconst b = "30";\n',
        solution: 'const a = "12";\nconst b = "30";\nconsole.log(Number(a) + Number(b));\nconsole.log(a + b);',
        hint: L('Можна також <code>parseInt(a)</code> або унарний плюс <code>+a</code>.', 'Можно также <code>parseInt(a)</code> или унарный плюс <code>+a</code>.', 'You can also use <code>parseInt(a)</code> or unary plus <code>+a</code>.'),
        expected: '42\n1230',
        must: /Number\s*\(|parseInt|parseFloat|\+\s*a/
      },
      quiz: { q: L('Що дає <code>"10" - 4</code>?', 'Что даёт <code>"10" - 4</code>?', 'What is <code>"10" - 4</code>?'), options: ['"104"', '6', 'NaN'], answer: 1, explain: L('Мінус працює лише з числами, тож "10" стає 10.', 'Минус работает только с числами, поэтому "10" становится 10.', 'Minus only works on numbers, so "10" becomes 10.') },
      ref: [{ code: 'typeof x', d: L('тип значення', 'тип значения', 'value type') }, { code: 'Number() String() parseInt()', d: L('перетворення', 'преобразование', 'conversion') }]
    },
    {
      id: 'math', chapter: CH1,
      title: L('Оператори та Math', 'Операторы и Math', 'Operators and Math'),
      theory: L(
        `<p>Арифметика в JS: <code>+ - * /</code>, <code>%</code> (остача), <code>**</code> (степінь). Ділення завжди дає точний результат: <code>7 / 2</code> → 3.5.</p>
<p>Для цілочисельного ділення використовують <code>Math.floor(7 / 2)</code> → 3.</p>
<p>Об’єкт <code>Math</code> містить корисні функції:</p>
<table class="mini"><tr><td><code>Math.round(x)</code></td><td>округлення</td></tr><tr><td><code>Math.floor / Math.ceil</code></td><td>вниз / вгору</td></tr><tr><td><code>Math.max / Math.min</code></td><td>максимум / мінімум</td></tr><tr><td><code>Math.abs(x)</code></td><td>модуль</td></tr><tr><td><code>Math.sqrt(x)</code></td><td>квадратний корінь</td></tr><tr><td><code>Math.random()</code></td><td>випадкове від 0 до 1</td></tr></table>
<p><code>x.toFixed(2)</code> — рядок з 2 знаками після крапки.</p>
<p>Випадкове ціле від 1 до 6: <code>Math.floor(Math.random() * 6) + 1</code>.</p>`,
        `<p>Арифметика в JS: <code>+ - * /</code>, <code>%</code> (остаток), <code>**</code> (степень). Деление всегда даёт точный результат: <code>7 / 2</code> → 3.5.</p>
<p>Для целочисленного деления используют <code>Math.floor(7 / 2)</code> → 3.</p>
<p>Объект <code>Math</code> содержит полезные функции:</p>
<table class="mini"><tr><td><code>Math.round(x)</code></td><td>округление</td></tr><tr><td><code>Math.floor / Math.ceil</code></td><td>вниз / вверх</td></tr><tr><td><code>Math.max / Math.min</code></td><td>максимум / минимум</td></tr><tr><td><code>Math.abs(x)</code></td><td>модуль</td></tr><tr><td><code>Math.sqrt(x)</code></td><td>квадратный корень</td></tr><tr><td><code>Math.random()</code></td><td>случайное от 0 до 1</td></tr></table>
<p><code>x.toFixed(2)</code> — строка с 2 знаками после точки.</p>
<p>Случайное целое от 1 до 6: <code>Math.floor(Math.random() * 6) + 1</code>.</p>`,
        `<p>Arithmetic in JS: <code>+ - * /</code>, <code>%</code> (remainder), <code>**</code> (power). Division always gives an exact result: <code>7 / 2</code> → 3.5.</p>
<p>For integer division use <code>Math.floor(7 / 2)</code> → 3.</p>
<p>The <code>Math</code> object has useful functions:</p>
<table class="mini"><tr><td><code>Math.round(x)</code></td><td>round</td></tr><tr><td><code>Math.floor / Math.ceil</code></td><td>down / up</td></tr><tr><td><code>Math.max / Math.min</code></td><td>max / min</td></tr><tr><td><code>Math.abs(x)</code></td><td>absolute value</td></tr><tr><td><code>Math.sqrt(x)</code></td><td>square root</td></tr><tr><td><code>Math.random()</code></td><td>random from 0 to 1</td></tr></table>
<p><code>x.toFixed(2)</code> — a string with 2 decimals.</p>
<p>A random integer from 1 to 6: <code>Math.floor(Math.random() * 6) + 1</code>.</p>`),
      why: L(`<p>Чому <code>Math.random() * 6</code>, а потім <code>floor</code> і <code>+1</code>? <code>random()</code> дає 0…0.999, множимо на 6 → 0…5.99, <code>floor</code> відкидає дріб → 0…5, <code>+1</code> → 1…6. Так будується будь-який діапазон.</p>`,
        `<p>Почему <code>Math.random() * 6</code>, а потом <code>floor</code> и <code>+1</code>? <code>random()</code> даёт 0…0.999, умножаем на 6 → 0…5.99, <code>floor</code> отбрасывает дробь → 0…5, <code>+1</code> → 1…6. Так строится любой диапазон.</p>`,
        `<p>Why <code>Math.random() * 6</code>, then <code>floor</code> and <code>+1</code>? <code>random()</code> gives 0…0.999, times 6 → 0…5.99, <code>floor</code> drops the fraction → 0…5, <code>+1</code> → 1…6. Any range is built this way.</p>`),
      mistakes: L(`<ul><li><code>0.1 + 0.2</code> = 0.30000000000000004 — так комп’ютер зберігає дроби. Для виводу використовуй <code>toFixed</code>.</li><li><code>toFixed</code> повертає <b>рядок</b>, а не число.</li><li>Ділення на 0 дає <code>Infinity</code>, а не помилку.</li></ul>`,
        `<ul><li><code>0.1 + 0.2</code> = 0.30000000000000004 — так компьютер хранит дроби. Для вывода используй <code>toFixed</code>.</li><li><code>toFixed</code> возвращает <b>строку</b>, а не число.</li><li>Деление на 0 даёт <code>Infinity</code>, а не ошибку.</li></ul>`,
        `<ul><li><code>0.1 + 0.2</code> = 0.30000000000000004 — that’s how computers store fractions. Use <code>toFixed</code> for display.</li><li><code>toFixed</code> returns a <b>string</b>, not a number.</li><li>Dividing by 0 gives <code>Infinity</code>, not an error.</li></ul>`),
      examples: [
        { title: L('Арифметика', 'Арифметика', 'Arithmetic'), code: 'console.log(7 + 3, 7 - 3, 7 * 3);\nconsole.log(7 / 2);\nconsole.log(7 % 2);\nconsole.log(2 ** 10);\nconsole.log(Math.floor(7 / 2));', note: L('Ціле ділення — через Math.floor.', 'Целое деление — через Math.floor.', 'Integer division via Math.floor.') },
        { title: 'Math', code: 'console.log(Math.round(4.6));\nconsole.log(Math.ceil(4.1), Math.floor(4.9));\nconsole.log(Math.max(3, 9, 2));\nconsole.log(Math.abs(-7));\nconsole.log(Math.sqrt(144));', note: L('Усі функції — через <code>Math.</code>.', 'Все функции — через <code>Math.</code>.', 'All functions via <code>Math.</code>.') },
        { title: L('Кубик', 'Кубик', 'Dice'), code: 'for (let i = 0; i < 5; i++) {\n  console.log(Math.floor(Math.random() * 6) + 1);\n}', note: L('Запусти кілька разів — числа різні.', 'Запусти несколько раз — числа разные.', 'Run it a few times — the numbers differ.') },
        { title: 'toFixed', code: 'console.log(0.1 + 0.2);\nconsole.log((0.1 + 0.2).toFixed(2));\nconst price = 19.5;\nconsole.log("Price: " + price.toFixed(2) + " UAH");', note: L('Гарне форматування грошей.', 'Красивое форматирование денег.', 'Nice money formatting.') }
      ],
      task: {
        text: L('Піца коштує <code>189.5</code> грн, друзів 3. Виведи: скільки заплатить кожен (з двома знаками після крапки через <code>toFixed</code>), а потім скільки цілих шматків отримає кожен з 8 (<code>Math.floor</code>).', 'Пицца стоит <code>189.5</code> грн, друзей 3. Выведи: сколько заплатит каждый (с двумя знаками после точки через <code>toFixed</code>), а затем сколько целых кусков получит каждый из 8 (<code>Math.floor</code>).', 'A pizza costs <code>189.5</code> UAH, there are 3 friends. Print how much each pays (two decimals via <code>toFixed</code>), then how many whole slices out of 8 each gets (<code>Math.floor</code>).'),
        how: [L('<code>(189.5 / 3).toFixed(2)</code>', '<code>(189.5 / 3).toFixed(2)</code>', '<code>(189.5 / 3).toFixed(2)</code>'), L('<code>Math.floor(8 / 3)</code>', '<code>Math.floor(8 / 3)</code>', '<code>Math.floor(8 / 3)</code>')],
        starter: 'const price = 189.5;\nconst friends = 3;\n',
        solution: 'const price = 189.5;\nconst friends = 3;\nconsole.log((price / friends).toFixed(2));\nconsole.log(Math.floor(8 / friends));',
        hint: L('Очікувано: 63.17 і 2.', 'Ожидается: 63.17 и 2.', 'Expected: 63.17 and 2.'),
        expected: '63.17\n2',
        must: /toFixed[\s\S]*Math\.floor/
      },
      quiz: { q: L('Що дасть <code>Math.floor(Math.random() * 10)</code>?', 'Что даст <code>Math.floor(Math.random() * 10)</code>?', 'What does <code>Math.floor(Math.random() * 10)</code> give?'), options: [L('ціле 1–10', 'целое 1–10', 'an integer 1–10'), L('ціле 0–9', 'целое 0–9', 'an integer 0–9'), L('дріб 0–10', 'дробь 0–10', 'a float 0–10')], answer: 1, explain: L('0…9.99 → floor → 0…9.', '0…9.99 → floor → 0…9.', '0…9.99 → floor → 0…9.') },
      ref: [{ code: '% **', d: L('остача, степінь', 'остаток, степень', 'remainder, power') }, { code: 'Math.round/floor/ceil', d: L('округлення', 'округление', 'rounding') }, { code: 'x.toFixed(2)', d: L('2 знаки після крапки', '2 знака после точки', '2 decimals') }]
    },
    {
      id: 'strings', chapter: CH1,
      title: L('Рядки та шаблонні рядки', 'Строки и шаблонные строки', 'Strings and template literals'),
      theory: L(
        `<p><b>Шаблонні рядки</b> пишуть у зворотних лапках <code>\`...\`</code>, а значення вставляють через <code>\${...}</code>:</p>
<pre class="inline-code">const name = "Ira";
const age = 14;
console.log(\`\${name} is \${age} years old\`);
console.log(\`Next year: \${age + 1}\`);</pre>
<p>Шаблонні рядки можуть займати кілька рядків коду без <code>\\n</code>.</p>
<p>Рядки мають довжину <code>s.length</code> і індекси з нуля: <code>s[0]</code> — перший символ, <code>s[s.length - 1]</code> або <code>s.at(-1)</code> — останній.</p>
<p>Старий спосіб — склеювання через <code>+</code>: <code>"Hi, " + name + "!"</code>. Працює, але читається гірше.</p>`,
        `<p><b>Шаблонные строки</b> пишут в обратных кавычках <code>\`...\`</code>, а значения вставляют через <code>\${...}</code>:</p>
<pre class="inline-code">const name = "Ira";
const age = 14;
console.log(\`\${name} is \${age} years old\`);
console.log(\`Next year: \${age + 1}\`);</pre>
<p>Шаблонные строки могут занимать несколько строк кода без <code>\\n</code>.</p>
<p>У строк есть длина <code>s.length</code> и индексы с нуля: <code>s[0]</code> — первый символ, <code>s[s.length - 1]</code> или <code>s.at(-1)</code> — последний.</p>
<p>Старый способ — склеивание через <code>+</code>: <code>"Hi, " + name + "!"</code>. Работает, но читается хуже.</p>`,
        `<p><b>Template literals</b> use backticks <code>\`...\`</code>, and values go inside <code>\${...}</code>:</p>
<pre class="inline-code">const name = "Ira";
const age = 14;
console.log(\`\${name} is \${age} years old\`);
console.log(\`Next year: \${age + 1}\`);</pre>
<p>Template literals can span several lines without <code>\\n</code>.</p>
<p>Strings have a length <code>s.length</code> and zero-based indices: <code>s[0]</code> is the first character, <code>s[s.length - 1]</code> or <code>s.at(-1)</code> the last.</p>
<p>The old way is concatenation with <code>+</code>: <code>"Hi, " + name + "!"</code>. It works but reads worse.</p>`),
      why: L(`<p>Шаблонні рядки з’явилися в 2015 році саме тому, що склеювання через <code>+</code> породжувало купу помилок з пробілами та лапками. Зараз це стандарт сучасного JS.</p>`,
        `<p>Шаблонные строки появились в 2015 году именно потому, что склеивание через <code>+</code> порождало кучу ошибок с пробелами и кавычками. Сейчас это стандарт современного JS.</p>`,
        `<p>Template literals arrived in 2015 precisely because <code>+</code> concatenation caused endless bugs with spaces and quotes. They’re now standard in modern JS.</p>`),
      mistakes: L(`<ul><li><code>"Hi \${name}"</code> у звичайних лапках — підстановка не спрацює, потрібні зворотні.</li><li>Апостроф <code>'</code> замість зворотної лапки <code>\`</code> (вона на клавіші з <code>~</code>).</li></ul>`,
        `<ul><li><code>"Hi \${name}"</code> в обычных кавычках — подстановка не сработает, нужны обратные.</li><li>Апостроф <code>'</code> вместо обратной кавычки <code>\`</code> (она на клавише с <code>~</code>).</li></ul>`,
        `<ul><li><code>"Hi \${name}"</code> in normal quotes — no substitution, you need backticks.</li><li>An apostrophe <code>'</code> instead of a backtick <code>\`</code> (it’s on the <code>~</code> key).</li></ul>`),
      examples: [
        { title: L('Шаблон', 'Шаблон', 'Template'), code: 'const item = "pizza";\nconst price = 199;\nconsole.log(`One ${item} costs ${price} UAH`);\nconsole.log(`Three cost ${price * 3} UAH`);', note: L('У <code>${}</code> — будь-який вираз.', 'В <code>${}</code> — любое выражение.', 'Any expression goes inside <code>${}</code>.') },
        { title: L('Багаторядковий', 'Многострочный', 'Multi-line'), code: 'const card = `Name: Ann\nLevel: 7\nClass: Mage`;\nconsole.log(card);', note: L('Переноси зберігаються.', 'Переносы сохраняются.', 'Line breaks are kept.') },
        { title: L('Довжина та індекси', 'Длина и индексы', 'Length and indices'), code: 'const word = "JavaScript";\nconsole.log(word.length);\nconsole.log(word[0]);\nconsole.log(word[word.length - 1]);\nconsole.log(word.at(-2));', note: L('<code>at(-1)</code> рахує з кінця.', '<code>at(-1)</code> считает с конца.', '<code>at(-1)</code> counts from the end.') },
        { title: L('+ проти шаблону', '+ против шаблона', '+ vs template'), code: 'const name = "Max";\nconst score = 90;\nconsole.log("Player " + name + " has " + score + " points");\nconsole.log(`Player ${name} has ${score} points`);', note: L('Результат однаковий, але шаблон читабельніший.', 'Результат одинаковый, но шаблон читабельнее.', 'Same result, but the template reads better.') }
      ],
      task: {
        text: L('Є <code>city = "Odesa"</code>, <code>temp = 27</code>. Виведи через шаблонний рядок: <code>Odesa: 27°C, feels like 29°C</code> (друге число — <code>temp + 2</code>, обчислене всередині <code>${}</code>).', 'Есть <code>city = "Odesa"</code>, <code>temp = 27</code>. Выведи через шаблонную строку: <code>Odesa: 27°C, feels like 29°C</code> (второе число — <code>temp + 2</code>, вычисленное внутри <code>${}</code>).', 'Given <code>city = "Odesa"</code>, <code>temp = 27</code>, print with a template literal: <code>Odesa: 27°C, feels like 29°C</code> (the second number is <code>temp + 2</code>, computed inside <code>${}</code>).'),
        how: [L('Зворотні лапки і <code>${city}</code>, <code>${temp}</code>, <code>${temp + 2}</code>.', 'Обратные кавычки и <code>${city}</code>, <code>${temp}</code>, <code>${temp + 2}</code>.', 'Backticks with <code>${city}</code>, <code>${temp}</code>, <code>${temp + 2}</code>.')],
        starter: 'const city = "Odesa";\nconst temp = 27;\n',
        solution: 'const city = "Odesa";\nconst temp = 27;\nconsole.log(`${city}: ${temp}°C, feels like ${temp + 2}°C`);',
        hint: L('<code>console.log(`${city}: ${temp}°C, feels like ${temp + 2}°C`);</code>', '<code>console.log(`${city}: ${temp}°C, feels like ${temp + 2}°C`);</code>', '<code>console.log(`${city}: ${temp}°C, feels like ${temp + 2}°C`);</code>'),
        expected: 'Odesa: 27°C, feels like 29°C',
        must: /`[^`]*\$\{\s*temp\s*\+\s*2\s*\}/
      },
      quiz: { q: L('Які лапки потрібні для <code>${...}</code>?', 'Какие кавычки нужны для <code>${...}</code>?', 'Which quotes are needed for <code>${...}</code>?'), options: ['"..."', "'...'", '`...`'], answer: 2, explain: L('Лише зворотні лапки.', 'Только обратные кавычки.', 'Only backticks.') },
      ref: [{ code: '`Hi ${x}`', d: L('шаблонний рядок', 'шаблонная строка', 'template literal') }, { code: 's.length  s[0]  s.at(-1)', d: L('довжина, символи', 'длина, символы', 'length, characters') }]
    },
    {
      id: 'str-methods', chapter: CH1,
      title: L('Методи рядків', 'Методы строк', 'String methods'),
      theory: L(
        `<p>Рядки мають багато корисних методів. Вони <b>не змінюють</b> оригінал, а повертають новий рядок:</p>
<table class="mini"><tr><td><code>toUpperCase() / toLowerCase()</code></td><td>регістр</td></tr><tr><td><code>trim()</code></td><td>прибрати пробіли по краях</td></tr><tr><td><code>includes(x)</code></td><td>чи містить підрядок</td></tr><tr><td><code>startsWith / endsWith</code></td><td>починається / закінчується</td></tr><tr><td><code>indexOf(x)</code></td><td>позиція (або -1)</td></tr><tr><td><code>slice(a, b)</code></td><td>вирізати частину</td></tr><tr><td><code>replace / replaceAll</code></td><td>замінити</td></tr><tr><td><code>split(sep)</code></td><td>розбити на масив</td></tr><tr><td><code>repeat(n)</code></td><td>повторити</td></tr><tr><td><code>padStart(n, ch)</code></td><td>доповнити зліва</td></tr></table>
<p>Методи можна ланцюжити: <code>" Hi ".trim().toUpperCase()</code>.</p>`,
        `<p>У строк много полезных методов. Они <b>не меняют</b> оригинал, а возвращают новую строку:</p>
<table class="mini"><tr><td><code>toUpperCase() / toLowerCase()</code></td><td>регистр</td></tr><tr><td><code>trim()</code></td><td>убрать пробелы по краям</td></tr><tr><td><code>includes(x)</code></td><td>содержит ли подстроку</td></tr><tr><td><code>startsWith / endsWith</code></td><td>начинается / заканчивается</td></tr><tr><td><code>indexOf(x)</code></td><td>позиция (или -1)</td></tr><tr><td><code>slice(a, b)</code></td><td>вырезать часть</td></tr><tr><td><code>replace / replaceAll</code></td><td>заменить</td></tr><tr><td><code>split(sep)</code></td><td>разбить на массив</td></tr><tr><td><code>repeat(n)</code></td><td>повторить</td></tr><tr><td><code>padStart(n, ch)</code></td><td>дополнить слева</td></tr></table>
<p>Методы можно сцеплять: <code>" Hi ".trim().toUpperCase()</code>.</p>`,
        `<p>Strings have many useful methods. They <b>don’t change</b> the original but return a new string:</p>
<table class="mini"><tr><td><code>toUpperCase() / toLowerCase()</code></td><td>case</td></tr><tr><td><code>trim()</code></td><td>trim spaces at the ends</td></tr><tr><td><code>includes(x)</code></td><td>contains a substring</td></tr><tr><td><code>startsWith / endsWith</code></td><td>starts / ends with</td></tr><tr><td><code>indexOf(x)</code></td><td>position (or -1)</td></tr><tr><td><code>slice(a, b)</code></td><td>cut out a part</td></tr><tr><td><code>replace / replaceAll</code></td><td>replace</td></tr><tr><td><code>split(sep)</code></td><td>split into an array</td></tr><tr><td><code>repeat(n)</code></td><td>repeat</td></tr><tr><td><code>padStart(n, ch)</code></td><td>pad on the left</td></tr></table>
<p>Methods can be chained: <code>" Hi ".trim().toUpperCase()</code>.</p>`),
      why: L(`<p>Пошук, валідація email, форматування імен, обробка тексту з форм — усе це робиться методами рядків. Знати їх — означає писати коротший і надійніший код.</p>`,
        `<p>Поиск, валидация email, форматирование имён, обработка текста из форм — всё это делается методами строк. Знать их — значит писать более короткий и надёжный код.</p>`,
        `<p>Search, email validation, name formatting, processing form text — all done with string methods. Knowing them means shorter, more reliable code.</p>`),
      mistakes: L(`<ul><li><code>replace</code> замінює лише <b>перше</b> входження. Для всіх — <code>replaceAll</code>.</li><li>Забути дужки: <code>s.toUpperCase</code> — це функція, а не результат.</li></ul>`,
        `<ul><li><code>replace</code> заменяет только <b>первое</b> вхождение. Для всех — <code>replaceAll</code>.</li><li>Забыть скобки: <code>s.toUpperCase</code> — это функция, а не результат.</li></ul>`,
        `<ul><li><code>replace</code> only replaces the <b>first</b> match. For all use <code>replaceAll</code>.</li><li>Forgetting parentheses: <code>s.toUpperCase</code> is the function, not the result.</li></ul>`),
      examples: [
        { title: L('Регістр і trim', 'Регистр и trim', 'Case and trim'), code: 'const raw = "  Hello World  ";\nconsole.log(`[${raw.trim()}]`);\nconsole.log(raw.trim().toUpperCase());\nconsole.log(raw.toLowerCase().trim());', note: L('Ланцюжок методів.', 'Цепочка методов.', 'A chain of methods.') },
        { title: L('Пошук', 'Поиск', 'Searching'), code: 'const email = "anna@codry.dev";\nconsole.log(email.includes("@"));\nconsole.log(email.endsWith(".dev"));\nconsole.log(email.indexOf("@"));\nconsole.log(email.indexOf("#"));', note: L('-1 означає «не знайдено».', '-1 значит «не найдено».', '-1 means “not found”.') },
        { title: 'slice / split', code: 'const email = "anna@codry.dev";\nconst at = email.indexOf("@");\nconsole.log(email.slice(0, at));\nconsole.log(email.slice(at + 1));\nconsole.log("red,green,blue".split(","));', note: L('Ділимо email на ім’я і домен.', 'Делим email на имя и домен.', 'Split an email into name and domain.') },
        { title: L('Заміна і доповнення', 'Замена и дополнение', 'Replace and pad'), code: 'console.log("I like cats. Cats are cool.".replaceAll("ats", "ogs"));\nconsole.log("ha".repeat(3));\nconsole.log("7".padStart(3, "0"));\nconsole.log("5:3".split(":").map(Number));', note: L('<code>padStart</code> зручний для годинників і номерів.', '<code>padStart</code> удобен для часов и номеров.', '<code>padStart</code> is handy for clocks and IDs.') }
      ],
      task: {
        text: L('Є рядок <code>raw = "   jOHN sMITH  "</code>. Прибери пробіли, зроби всі літери малими і виведи. Потім виведи ініціали великими літерами з крапками: <code>J.S.</code>', 'Есть строка <code>raw = "   jOHN sMITH  "</code>. Убери пробелы, сделай все буквы маленькими и выведи. Затем выведи инициалы большими буквами с точками: <code>J.S.</code>', 'Given <code>raw = "   jOHN sMITH  "</code>, trim it, lowercase it and print it. Then print the initials in uppercase with dots: <code>J.S.</code>'),
        how: [L('<code>const clean = raw.trim().toLowerCase();</code>', '<code>const clean = raw.trim().toLowerCase();</code>', '<code>const clean = raw.trim().toLowerCase();</code>'), L('<code>const [first, last] = clean.split(" ");</code>', '<code>const [first, last] = clean.split(" ");</code>', '<code>const [first, last] = clean.split(" ");</code>'), L('Ініціали: <code>first[0].toUpperCase() + "." + ...</code>', 'Инициалы: <code>first[0].toUpperCase() + "." + ...</code>', 'Initials: <code>first[0].toUpperCase() + "." + ...</code>')],
        starter: 'const raw = "   jOHN sMITH  ";\n',
        solution: 'const raw = "   jOHN sMITH  ";\nconst clean = raw.trim().toLowerCase();\nconsole.log(clean);\nconst parts = clean.split(" ");\nconsole.log(parts[0][0].toUpperCase() + "." + parts[1][0].toUpperCase() + ".");',
        hint: L('Очікувано: <code>john smith</code> і <code>J.S.</code>', 'Ожидается: <code>john smith</code> и <code>J.S.</code>', 'Expected: <code>john smith</code> and <code>J.S.</code>'),
        expected: 'john smith\nJ.S.',
        must: /trim\s*\(\s*\)/
      },
      quiz: { q: L('Що поверне <code>"banana".indexOf("n")</code>?', 'Что вернёт <code>"banana".indexOf("n")</code>?', 'What does <code>"banana".indexOf("n")</code> return?'), options: ['1', '2', '3'], answer: 1, explain: L('b=0, a=1, n=2.', 'b=0, a=1, n=2.', 'b=0, a=1, n=2.') },
      ref: [{ code: 's.trim() s.toUpperCase()', d: L('очистка, регістр', 'очистка, регистр', 'trim, case') }, { code: 's.includes(x) s.indexOf(x)', d: L('пошук', 'поиск', 'search') }, { code: 's.slice(a, b) s.split(sep)', d: L('частина, розбиття', 'часть, разбиение', 'part, split') }]
    },
    {
      id: 'compare', chapter: CH2,
      title: L('Порівняння та boolean', 'Сравнения и boolean', 'Comparisons and booleans'),
      theory: L(
        `<p>Порівняння повертає <code>true</code> або <code>false</code>:</p>
<table class="mini"><tr><td><code>===</code></td><td>строго дорівнює (і значення, і тип)</td></tr><tr><td><code>!==</code></td><td>строго не дорівнює</td></tr><tr><td><code>&gt; &lt; &gt;= &lt;=</code></td><td>більше, менше</td></tr></table>
<p>Є ще <code>==</code> і <code>!=</code> — «нестроге» порівняння з автоперетворенням типів: <code>"5" == 5</code> → true. Через це виникають дивні баги, тому <b>завжди використовуй <code>===</code></b>.</p>
<h4>Truthy і falsy</h4>
<p>У умовах будь-яке значення перетворюється на boolean. <b>Falsy</b> (хибні) значення: <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>. Усе інше — <b>truthy</b>, навіть <code>"0"</code> і <code>[]</code>.</p>`,
        `<p>Сравнение возвращает <code>true</code> или <code>false</code>:</p>
<table class="mini"><tr><td><code>===</code></td><td>строго равно (и значение, и тип)</td></tr><tr><td><code>!==</code></td><td>строго не равно</td></tr><tr><td><code>&gt; &lt; &gt;= &lt;=</code></td><td>больше, меньше</td></tr></table>
<p>Есть ещё <code>==</code> и <code>!=</code> — «нестрогое» сравнение с автопреобразованием типов: <code>"5" == 5</code> → true. Из-за этого возникают странные баги, поэтому <b>всегда используй <code>===</code></b>.</p>
<h4>Truthy и falsy</h4>
<p>В условиях любое значение превращается в boolean. <b>Falsy</b> (ложные) значения: <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>. Всё остальное — <b>truthy</b>, даже <code>"0"</code> и <code>[]</code>.</p>`,
        `<p>A comparison returns <code>true</code> or <code>false</code>:</p>
<table class="mini"><tr><td><code>===</code></td><td>strictly equal (value and type)</td></tr><tr><td><code>!==</code></td><td>strictly not equal</td></tr><tr><td><code>&gt; &lt; &gt;= &lt;=</code></td><td>greater, less</td></tr></table>
<p>There are also <code>==</code> and <code>!=</code> — “loose” comparison with type coercion: <code>"5" == 5</code> → true. It causes weird bugs, so <b>always use <code>===</code></b>.</p>
<h4>Truthy and falsy</h4>
<p>In conditions any value becomes a boolean. <b>Falsy</b> values: <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>. Everything else is <b>truthy</b>, even <code>"0"</code> and <code>[]</code>.</p>`),
      why: L(`<p><code>==</code> має складну таблицю перетворень: <code>0 == ""</code> → true, <code>null == undefined</code> → true, <code>[] == false</code> → true. Ніхто не хоче це запам’ятовувати. <code>===</code> працює передбачувано — порівнює «як є».</p>`,
        `<p><code>==</code> имеет сложную таблицу преобразований: <code>0 == ""</code> → true, <code>null == undefined</code> → true, <code>[] == false</code> → true. Никто не хочет это запоминать. <code>===</code> работает предсказуемо — сравнивает «как есть».</p>`,
        `<p><code>==</code> has a complex coercion table: <code>0 == ""</code> → true, <code>null == undefined</code> → true, <code>[] == false</code> → true. Nobody wants to memorise that. <code>===</code> is predictable — it compares as is.</p>`),
      mistakes: L(`<ul><li><code>if (x = 5)</code> — присвоєння замість порівняння, умова завжди true.</li><li>Перевіряти «порожність» масиву через <code>if (arr)</code> — порожній масив truthy! Використовуй <code>arr.length</code>.</li></ul>`,
        `<ul><li><code>if (x = 5)</code> — присваивание вместо сравнения, условие всегда true.</li><li>Проверять «пустоту» массива через <code>if (arr)</code> — пустой массив truthy! Используй <code>arr.length</code>.</li></ul>`,
        `<ul><li><code>if (x = 5)</code> — assignment instead of comparison; always true.</li><li>Checking an empty array with <code>if (arr)</code> — an empty array is truthy! Use <code>arr.length</code>.</li></ul>`),
      examples: [
        { title: L('Порівняння', 'Сравнения', 'Comparisons'), code: 'console.log(5 > 3);\nconsole.log(5 === 5);\nconsole.log(5 !== 3);\nconsole.log("apple" < "banana");', note: L('Рядки порівнюються за алфавітом.', 'Строки сравниваются по алфавиту.', 'Strings compare alphabetically.') },
        { title: '== vs ===', code: 'console.log("5" == 5);\nconsole.log("5" === 5);\nconsole.log(0 == "");\nconsole.log(0 === "");\nconsole.log(null == undefined);', note: L('Нестроге порівняння — джерело сюрпризів.', 'Нестрогое сравнение — источник сюрпризов.', 'Loose comparison is a source of surprises.') },
        { title: 'Boolean()', code: 'console.log(Boolean(0), Boolean(""), Boolean(null));\nconsole.log(Boolean(1), Boolean("0"), Boolean([]));\nconsole.log(!!"hello");', note: L('<code>!!x</code> — швидко перетворити на boolean.', '<code>!!x</code> — быстро превратить в boolean.', '<code>!!x</code> quickly converts to boolean.') },
        { title: L('У змінній', 'В переменной', 'In a variable'), code: 'const age = 16;\nconst isAdult = age >= 18;\nconst hasName = Boolean("Ann");\nconsole.log(isAdult, hasName);', note: L('Імена boolean-змінних часто починають з is/has.', 'Имена boolean-переменных часто начинают с is/has.', 'Boolean names often start with is/has.') }
      ],
      task: {
        text: L('Є <code>score = 73</code> і <code>record = 80</code>. Виведи три рядки: чи <code>score</code> більший за рекорд, чи він строго не дорівнює рядку <code>"73"</code>, і чи значення <code>""</code> (порожній рядок) truthy — через <code>Boolean()</code>.', 'Есть <code>score = 73</code> и <code>record = 80</code>. Выведи три строки: больше ли <code>score</code> рекорда, строго ли он не равен строке <code>"73"</code>, и truthy ли значение <code>""</code> (пустая строка) — через <code>Boolean()</code>.', 'Given <code>score = 73</code> and <code>record = 80</code>, print three lines: is <code>score</code> greater than the record, is it strictly not equal to the string <code>"73"</code>, and is <code>""</code> (empty string) truthy — via <code>Boolean()</code>.'),
        how: [L('<code>score &gt; record</code>', '<code>score &gt; record</code>', '<code>score &gt; record</code>'), L('<code>score !== "73"</code>', '<code>score !== "73"</code>', '<code>score !== "73"</code>'), L('<code>Boolean("")</code>', '<code>Boolean("")</code>', '<code>Boolean("")</code>')],
        starter: 'const score = 73;\nconst record = 80;\n',
        solution: 'const score = 73;\nconst record = 80;\nconsole.log(score > record);\nconsole.log(score !== "73");\nconsole.log(Boolean(""));',
        hint: L('Очікувано: false, true, false.', 'Ожидается: false, true, false.', 'Expected: false, true, false.'),
        expected: 'false\ntrue\nfalse',
        must: /!==/
      },
      quiz: { q: L('Яке значення truthy?', 'Какое значение truthy?', 'Which value is truthy?'), options: ['0', '""', '"0"', 'null'], answer: 2, explain: L('Непорожній рядок — truthy, навіть "0".', 'Непустая строка — truthy, даже "0".', 'A non-empty string is truthy, even "0".') },
      ref: [{ code: '=== !==', d: L('строге порівняння', 'строгое сравнение', 'strict comparison') }, { code: 'Boolean(x) !!x', d: L('у boolean', 'в boolean', 'to boolean') }]
    },
    {
      id: 'if', chapter: CH2,
      title: L('if / else і тернарний оператор', 'if / else и тернарный оператор', 'if / else and the ternary operator'),
      theory: L(
        `<p>Умова в JS:</p>
<pre class="inline-code">if (hour < 12) {
  console.log("Good morning");
} else if (hour < 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}</pre>
<p>Умову пишуть у <b>круглих дужках</b>, блок коду — у <b>фігурних</b>. Відступи в JS не обов’язкові, але роблять код читабельним.</p>
<p><b>Тернарний оператор</b> — короткий вираз «умова ? якщо так : якщо ні»:</p>
<pre class="inline-code">const status = age >= 18 ? "adult" : "teen";</pre>
<p>Його використовують, коли треба вибрати одне з двох <b>значень</b>.</p>`,
        `<p>Условие в JS:</p>
<pre class="inline-code">if (hour < 12) {
  console.log("Good morning");
} else if (hour < 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}</pre>
<p>Условие пишут в <b>круглых скобках</b>, блок кода — в <b>фигурных</b>. Отступы в JS не обязательны, но делают код читаемым.</p>
<p><b>Тернарный оператор</b> — короткое выражение «условие ? если да : если нет»:</p>
<pre class="inline-code">const status = age >= 18 ? "adult" : "teen";</pre>
<p>Его используют, когда нужно выбрать одно из двух <b>значений</b>.</p>`,
        `<p>A condition in JS:</p>
<pre class="inline-code">if (hour < 12) {
  console.log("Good morning");
} else if (hour < 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}</pre>
<p>The condition goes in <b>parentheses</b>, the block in <b>curly braces</b>. Indentation isn’t required in JS but keeps code readable.</p>
<p>The <b>ternary operator</b> is a short expression “condition ? if yes : if no”:</p>
<pre class="inline-code">const status = age >= 18 ? "adult" : "teen";</pre>
<p>Use it when picking one of two <b>values</b>.</p>`),
      why: L(`<p>Чому фігурні дужки, а не відступи як у Python? JS успадкував синтаксис від мов C і Java. Дужки чітко показують, де блок починається і закінчується, навіть якщо код «злипся» в один рядок.</p>`,
        `<p>Почему фигурные скобки, а не отступы как в Python? JS унаследовал синтаксис от языков C и Java. Скобки чётко показывают, где блок начинается и заканчивается, даже если код «слипся» в одну строку.</p>`,
        `<p>Why braces instead of indentation like Python? JS inherited its syntax from C and Java. Braces clearly show where a block starts and ends, even if the code is squashed onto one line.</p>`),
      mistakes: L(`<ul><li>Без фігурних дужок під <code>if</code> виконується лише <b>один</b> наступний рядок — дуже частий баг.</li><li>Вкладені тернарні оператори <code>a ? b : c ? d : e</code> важко читати — краще <code>if/else</code>.</li></ul>`,
        `<ul><li>Без фигурных скобок под <code>if</code> выполняется только <b>одна</b> следующая строка — очень частый баг.</li><li>Вложенные тернарные операторы <code>a ? b : c ? d : e</code> сложно читать — лучше <code>if/else</code>.</li></ul>`,
        `<ul><li>Without braces only <b>one</b> following line belongs to the <code>if</code> — a very common bug.</li><li>Nested ternaries <code>a ? b : c ? d : e</code> are hard to read — use <code>if/else</code>.</li></ul>`),
      examples: [
        { title: 'if / else if', code: 'const hour = 14;\nif (hour < 12) {\n  console.log("Good morning");\n} else if (hour < 18) {\n  console.log("Good afternoon");\n} else {\n  console.log("Good evening");\n}', note: L('Зміни <code>hour</code> і запусти знову.', 'Измени <code>hour</code> и запусти снова.', 'Change <code>hour</code> and run again.') },
        { title: L('Парне', 'Чётное', 'Even'), code: 'const n = 7;\nif (n % 2 === 0) {\n  console.log(n + " is even");\n} else {\n  console.log(n + " is odd");\n}', note: L('Класика з остачею.', 'Классика с остатком.', 'The remainder classic.') },
        { title: L('Тернарний', 'Тернарный', 'Ternary'), code: 'const points = 72;\nconst result = points >= 60 ? "passed" : "failed";\nconsole.log(result);\nconsole.log(`You have ${points} point${points === 1 ? "" : "s"}`);', note: L('Тернарний вираз можна вставити прямо в шаблон.', 'Тернарное выражение можно вставить прямо в шаблон.', 'A ternary can go right inside a template.') },
        { title: L('Пастка без дужок', 'Ловушка без скобок', 'The no-brace trap'), code: 'const loggedIn = false;\nif (loggedIn)\n  console.log("Welcome");\n  console.log("Secret data");  // runs anyway!', note: L('Другий рядок не належить до if, хоч і з відступом.', 'Вторая строка не относится к if, хотя и с отступом.', 'The second line isn’t part of the if despite the indent.') }
      ],
      task: {
        text: L('Є <code>temp = -5</code>. Виведи <code>cold</code>, якщо нижче 0; <code>warm</code> — від 0 до 25 включно; <code>hot</code> — вище 25. Потім окремим рядком через тернарний оператор виведи <code>freezing</code>, якщо <code>temp &lt;= -10</code>, інакше <code>ok</code>.', 'Есть <code>temp = -5</code>. Выведи <code>cold</code>, если ниже 0; <code>warm</code> — от 0 до 25 включительно; <code>hot</code> — выше 25. Затем отдельной строкой через тернарный оператор выведи <code>freezing</code>, если <code>temp &lt;= -10</code>, иначе <code>ok</code>.', 'Given <code>temp = -5</code>, print <code>cold</code> if below 0; <code>warm</code> for 0 to 25 inclusive; <code>hot</code> above 25. Then on a separate line use a ternary to print <code>freezing</code> if <code>temp &lt;= -10</code>, otherwise <code>ok</code>.'),
        how: [L('Ланцюжок <code>if / else if / else</code>.', 'Цепочка <code>if / else if / else</code>.', 'An <code>if / else if / else</code> chain.'), L('<code>console.log(temp &lt;= -10 ? "freezing" : "ok");</code>', '<code>console.log(temp &lt;= -10 ? "freezing" : "ok");</code>', '<code>console.log(temp &lt;= -10 ? "freezing" : "ok");</code>')],
        starter: 'const temp = -5;\n',
        solution: 'const temp = -5;\nif (temp < 0) {\n  console.log("cold");\n} else if (temp <= 25) {\n  console.log("warm");\n} else {\n  console.log("hot");\n}\nconsole.log(temp <= -10 ? "freezing" : "ok");',
        hint: L('Очікувано: cold і ok.', 'Ожидается: cold и ok.', 'Expected: cold and ok.'),
        expected: 'cold\nok',
        must: /else\s+if[\s\S]*\?[\s\S]*:/
      },
      quiz: { q: L('Що поверне <code>5 &gt; 3 ? "yes" : "no"</code>?', 'Что вернёт <code>5 &gt; 3 ? "yes" : "no"</code>?', 'What does <code>5 &gt; 3 ? "yes" : "no"</code> return?'), options: ['"yes"', '"no"', 'true'], answer: 0, explain: L('Умова істинна — перше значення.', 'Условие истинно — первое значение.', 'The condition is true — the first value.') },
      ref: [{ code: 'if (c) {} else if (d) {} else {}', d: L('умова', 'условие', 'condition') }, { code: 'c ? a : b', d: L('тернарний оператор', 'тернарный оператор', 'ternary operator') }]
    },
    {
      id: 'logic', chapter: CH2,
      title: L('Логічні оператори &&, ||, ??', 'Логические операторы &&, ||, ??', 'Logical operators &&, ||, ??'),
      theory: L(
        `<p>Умови поєднують логічними операторами:</p>
<ul><li><code>&amp;&amp;</code> — «і»: true, якщо обидві частини істинні</li><li><code>||</code> — «або»: true, якщо хоча б одна</li><li><code>!</code> — «не»: перевертає значення</li></ul>
<p>У JS ці оператори повертають не просто true/false, а <b>одне з значень</b>:</p>
<ul><li><code>a || b</code> — перше truthy значення (часто для значень за замовчуванням: <code>name || "Guest"</code>)</li><li><code>a &amp;&amp; b</code> — перше falsy, або останнє</li><li><code>a ?? b</code> — <code>b</code>, лише якщо <code>a</code> є <code>null</code> або <code>undefined</code></li></ul>
<p>Оператор <code>?.</code> (optional chaining) безпечно звертається до властивостей: <code>user?.address?.city</code> — не впаде, якщо <code>address</code> немає.</p>`,
        `<p>Условия объединяют логическими операторами:</p>
<ul><li><code>&amp;&amp;</code> — «и»: true, если обе части истинны</li><li><code>||</code> — «или»: true, если хотя бы одна</li><li><code>!</code> — «не»: переворачивает значение</li></ul>
<p>В JS эти операторы возвращают не просто true/false, а <b>одно из значений</b>:</p>
<ul><li><code>a || b</code> — первое truthy значение (часто для значений по умолчанию: <code>name || "Guest"</code>)</li><li><code>a &amp;&amp; b</code> — первое falsy, или последнее</li><li><code>a ?? b</code> — <code>b</code>, только если <code>a</code> равно <code>null</code> или <code>undefined</code></li></ul>
<p>Оператор <code>?.</code> (optional chaining) безопасно обращается к свойствам: <code>user?.address?.city</code> — не упадёт, если <code>address</code> нет.</p>`,
        `<p>Combine conditions with logical operators:</p>
<ul><li><code>&amp;&amp;</code> — “and”: true if both parts are true</li><li><code>||</code> — “or”: true if at least one is</li><li><code>!</code> — “not”: flips the value</li></ul>
<p>In JS these operators return <b>one of the values</b>, not just true/false:</p>
<ul><li><code>a || b</code> — the first truthy value (often for defaults: <code>name || "Guest"</code>)</li><li><code>a &amp;&amp; b</code> — the first falsy one, or the last</li><li><code>a ?? b</code> — <code>b</code> only if <code>a</code> is <code>null</code> or <code>undefined</code></li></ul>
<p>The <code>?.</code> operator (optional chaining) safely accesses properties: <code>user?.address?.city</code> won’t crash if there’s no <code>address</code>.</p>`),
      why: L(`<p>Чому <code>??</code>, якщо є <code>||</code>? Бо <code>||</code> вважає <code>0</code> і <code>""</code> «порожніми». Якщо гравець має 0 очок, <code>score || 10</code> помилково дасть 10, а <code>score ?? 10</code> — правильно 0.</p>`,
        `<p>Зачем <code>??</code>, если есть <code>||</code>? Потому что <code>||</code> считает <code>0</code> и <code>""</code> «пустыми». Если у игрока 0 очков, <code>score || 10</code> ошибочно даст 10, а <code>score ?? 10</code> — правильно 0.</p>`,
        `<p>Why <code>??</code> when there’s <code>||</code>? Because <code>||</code> treats <code>0</code> and <code>""</code> as “empty”. If a player has 0 points, <code>score || 10</code> wrongly gives 10, while <code>score ?? 10</code> correctly gives 0.</p>`),
      mistakes: L(`<ul><li><code>if (x === 1 || 2)</code> — завжди true. Правильно: <code>x === 1 || x === 2</code>.</li><li>Писати <code>and</code>/<code>or</code> як у Python — у JS це <code>&amp;&amp;</code>/<code>||</code>.</li></ul>`,
        `<ul><li><code>if (x === 1 || 2)</code> — всегда true. Правильно: <code>x === 1 || x === 2</code>.</li><li>Писать <code>and</code>/<code>or</code> как в Python — в JS это <code>&amp;&amp;</code>/<code>||</code>.</li></ul>`,
        `<ul><li><code>if (x === 1 || 2)</code> — always true. Correct: <code>x === 1 || x === 2</code>.</li><li>Writing <code>and</code>/<code>or</code> like Python — in JS it’s <code>&amp;&amp;</code>/<code>||</code>.</li></ul>`),
      examples: [
        { title: '&& ||', code: 'const age = 15;\nconst hasTicket = true;\nif (age >= 12 && hasTicket) {\n  console.log("Welcome to the cinema");\n}\nconst day = "Sunday";\nif (day === "Saturday" || day === "Sunday") {\n  console.log("Weekend!");\n}', note: L('Класичні поєднання умов.', 'Классические сочетания условий.', 'Classic combinations.') },
        { title: L('За замовчуванням', 'По умолчанию', 'Defaults'), code: 'const input = "";\nconst name = input || "Guest";\nconsole.log(name);\nconst score = 0;\nconsole.log(score || 10);\nconsole.log(score ?? 10);', note: L('Різниця між <code>||</code> і <code>??</code> для нуля.', 'Разница между <code>||</code> и <code>??</code> для нуля.', 'The difference between <code>||</code> and <code>??</code> for zero.') },
        { title: '?.', code: 'const user = { name: "Ann" };\nconsole.log(user.address?.city);\nconsole.log(user.address?.city ?? "unknown");\nconst user2 = { address: { city: "Lviv" } };\nconsole.log(user2.address?.city);', note: L('Без <code>?.</code> перший рядок викликав би помилку.', 'Без <code>?.</code> первая строка вызвала бы ошибку.', 'Without <code>?.</code> the first line would throw.') },
        { title: '!', code: 'const isRaining = false;\nif (!isRaining) {\n  console.log("Let\'s go for a walk");\n}\nconsole.log(!true, !0, !"text");', note: L('<code>!</code> перевертає truthy/falsy.', '<code>!</code> переворачивает truthy/falsy.', '<code>!</code> flips truthy/falsy.') }
      ],
      task: {
        text: L('Рік <code>year = 2024</code>. Виведи <code>leap</code>, якщо він високосний (ділиться на 4 і не на 100, або ділиться на 400), інакше <code>common</code>. Другим рядком виведи <code>nickname ?? "anonymous"</code>, де <code>nickname = null</code>.', 'Год <code>year = 2024</code>. Выведи <code>leap</code>, если он високосный (делится на 4 и не на 100, или делится на 400), иначе <code>common</code>. Второй строкой выведи <code>nickname ?? "anonymous"</code>, где <code>nickname = null</code>.', 'With <code>year = 2024</code>, print <code>leap</code> if it’s a leap year (divisible by 4 but not 100, or by 400), otherwise <code>common</code>. On the second line print <code>nickname ?? "anonymous"</code>, where <code>nickname = null</code>.'),
        how: [L('<code>(year % 4 === 0 &amp;&amp; year % 100 !== 0) || year % 400 === 0</code>', '<code>(year % 4 === 0 &amp;&amp; year % 100 !== 0) || year % 400 === 0</code>', '<code>(year % 4 === 0 &amp;&amp; year % 100 !== 0) || year % 400 === 0</code>'), L('<code>const nickname = null;</code>', '<code>const nickname = null;</code>', '<code>const nickname = null;</code>')],
        starter: 'const year = 2024;\n',
        solution: 'const year = 2024;\nconst isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;\nconsole.log(isLeap ? "leap" : "common");\nconst nickname = null;\nconsole.log(nickname ?? "anonymous");',
        hint: L('Очікувано: leap і anonymous.', 'Ожидается: leap и anonymous.', 'Expected: leap and anonymous.'),
        expected: 'leap\nanonymous',
        must: /&&[\s\S]*\|\||\|\|[\s\S]*&&/
      },
      quiz: { q: L('Що поверне <code>0 ?? 5</code>?', 'Что вернёт <code>0 ?? 5</code>?', 'What does <code>0 ?? 5</code> return?'), options: ['0', '5', 'null'], answer: 0, explain: L('0 — не null і не undefined.', '0 — не null и не undefined.', '0 is neither null nor undefined.') },
      ref: [{ code: '&& || !', d: L('і, або, не', 'и, или, не', 'and, or, not') }, { code: 'a ?? b', d: L('значення за замовчуванням для null/undefined', 'значение по умолчанию для null/undefined', 'default for null/undefined') }, { code: 'obj?.prop', d: L('безпечний доступ', 'безопасный доступ', 'safe access') }]
    },
    {
      id: 'switch', chapter: CH2,
      title: L('switch', 'switch', 'switch'),
      theory: L(
        `<p><code>switch</code> зручний, коли треба порівняти одне значення з багатьма варіантами:</p>
<pre class="inline-code">switch (day) {
  case "Sat":
  case "Sun":
    console.log("Weekend");
    break;
  case "Fri":
    console.log("Almost weekend");
    break;
  default:
    console.log("Work day");
}</pre>
<p>JS шукає <code>case</code>, що <b>строго дорівнює</b> (<code>===</code>) значенню, і виконує код з цього місця <b>до <code>break</code></b>. Кілька <code>case</code> підряд без коду поділяють один блок. <code>default</code> — якщо нічого не збіглося.</p>`,
        `<p><code>switch</code> удобен, когда нужно сравнить одно значение со многими вариантами:</p>
<pre class="inline-code">switch (day) {
  case "Sat":
  case "Sun":
    console.log("Weekend");
    break;
  case "Fri":
    console.log("Almost weekend");
    break;
  default:
    console.log("Work day");
}</pre>
<p>JS ищет <code>case</code>, который <b>строго равен</b> (<code>===</code>) значению, и выполняет код с этого места <b>до <code>break</code></b>. Несколько <code>case</code> подряд без кода разделяют один блок. <code>default</code> — если ничего не совпало.</p>`,
        `<p><code>switch</code> is handy when comparing one value against many options:</p>
<pre class="inline-code">switch (day) {
  case "Sat":
  case "Sun":
    console.log("Weekend");
    break;
  case "Fri":
    console.log("Almost weekend");
    break;
  default:
    console.log("Work day");
}</pre>
<p>JS finds the <code>case</code> that <b>strictly equals</b> (<code>===</code>) the value and runs code from there <b>until <code>break</code></b>. Several <code>case</code>s in a row share one block. <code>default</code> runs if nothing matched.</p>`),
      why: L(`<p>Довгий ланцюжок <code>if (x === "a") ... else if (x === "b") ...</code> важко читати. <code>switch</code> показує всі варіанти як таблицю. А «провалювання» без <code>break</code> дозволяє елегантно групувати варіанти.</p>`,
        `<p>Длинную цепочку <code>if (x === "a") ... else if (x === "b") ...</code> сложно читать. <code>switch</code> показывает все варианты как таблицу. А «проваливание» без <code>break</code> позволяет элегантно группировать варианты.</p>`,
        `<p>A long <code>if (x === "a") ... else if (x === "b") ...</code> chain is hard to read. <code>switch</code> lays the options out like a table, and fall-through without <code>break</code> groups options neatly.</p>`),
      mistakes: L(`<ul><li>Забутий <code>break</code> — виконаються і наступні <code>case</code>!</li><li><code>switch</code> порівнює строго: <code>case 1</code> не спрацює для рядка <code>"1"</code>.</li></ul>`,
        `<ul><li>Забытый <code>break</code> — выполнятся и следующие <code>case</code>!</li><li><code>switch</code> сравнивает строго: <code>case 1</code> не сработает для строки <code>"1"</code>.</li></ul>`,
        `<ul><li>A forgotten <code>break</code> — the following <code>case</code>s run too!</li><li><code>switch</code> compares strictly: <code>case 1</code> won’t match the string <code>"1"</code>.</li></ul>`),
      examples: [
        { title: L('Дні тижня', 'Дни недели', 'Weekdays'), code: 'const day = "Sun";\nswitch (day) {\n  case "Sat":\n  case "Sun":\n    console.log("Weekend");\n    break;\n  case "Fri":\n    console.log("Almost weekend");\n    break;\n  default:\n    console.log("Work day");\n}', note: L('Два case ділять один блок.', 'Два case делят один блок.', 'Two cases share one block.') },
        { title: L('Калькулятор', 'Калькулятор', 'Calculator'), code: 'const a = 12, b = 4, op = "/";\nlet result;\nswitch (op) {\n  case "+": result = a + b; break;\n  case "-": result = a - b; break;\n  case "*": result = a * b; break;\n  case "/": result = a / b; break;\n  default: result = "unknown operator";\n}\nconsole.log(result);', note: L('Компактний запис case в один рядок.', 'Компактная запись case в одну строку.', 'Compact one-line cases.') },
        { title: L('Без break', 'Без break', 'Without break'), code: 'const level = 2;\nswitch (level) {\n  case 1:\n    console.log("sword");\n  case 2:\n    console.log("shield");\n  case 3:\n    console.log("potion");\n}', note: L('З рівня 2 «провалюється» в 3 — отримуєш щит і зілля.', 'С уровня 2 «проваливается» в 3 — получаешь щит и зелье.', 'Level 2 falls through to 3 — you get the shield and potion.') },
        { title: L('Об’єкт замість switch', 'Объект вместо switch', 'Object instead of switch'), code: 'const sounds = { cat: "meow", dog: "woof", cow: "moo" };\nconst animal = "dog";\nconsole.log(sounds[animal] ?? "...");', note: L('Для простих відповідностей об’єкт ще коротший.', 'Для простых соответствий объект ещё короче.', 'For simple mappings an object is even shorter.') }
      ],
      task: {
        text: L('Є <code>grade = "B"</code>. Через <code>switch</code> виведи: <code>A</code> → <code>Excellent</code>, <code>B</code> і <code>C</code> → <code>Good</code>, <code>D</code> → <code>Pass</code>, інакше — <code>Fail</code>.', 'Есть <code>grade = "B"</code>. Через <code>switch</code> выведи: <code>A</code> → <code>Excellent</code>, <code>B</code> и <code>C</code> → <code>Good</code>, <code>D</code> → <code>Pass</code>, иначе — <code>Fail</code>.', 'Given <code>grade = "B"</code>, use <code>switch</code> to print: <code>A</code> → <code>Excellent</code>, <code>B</code> and <code>C</code> → <code>Good</code>, <code>D</code> → <code>Pass</code>, otherwise <code>Fail</code>.'),
        how: [L('<code>case "B": case "C":</code> підряд.', '<code>case "B": case "C":</code> подряд.', '<code>case "B": case "C":</code> back to back.'), L('Не забудь <code>break</code> після кожного блоку.', 'Не забудь <code>break</code> после каждого блока.', 'Don’t forget <code>break</code> after each block.')],
        starter: 'const grade = "B";\n',
        solution: 'const grade = "B";\nswitch (grade) {\n  case "A":\n    console.log("Excellent");\n    break;\n  case "B":\n  case "C":\n    console.log("Good");\n    break;\n  case "D":\n    console.log("Pass");\n    break;\n  default:\n    console.log("Fail");\n}',
        hint: L('Очікувано: Good.', 'Ожидается: Good.', 'Expected: Good.'),
        expected: 'Good',
        must: /switch[\s\S]*case[\s\S]*default/
      },
      quiz: { q: L('Що станеться без <code>break</code> у case?', 'Что произойдёт без <code>break</code> в case?', 'What happens without <code>break</code> in a case?'), options: [L('помилка', 'ошибка', 'an error'), L('виконаються наступні case', 'выполнятся следующие case', 'the following cases run'), L('нічого', 'ничего', 'nothing')], answer: 1, explain: L('«Провалювання» далі.', '«Проваливание» дальше.', 'It falls through.') },
      ref: [{ code: 'switch (x) { case 1: ...; break; default: ... }', d: L('вибір варіанта', 'выбор варианта', 'pick an option') }]
    }
  ]);
})();
