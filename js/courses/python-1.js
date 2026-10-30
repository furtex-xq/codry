// Python — частина 1: перші кроки та логіка.
(function () {
  const L = Codry.L;
  const CH1 = L('Перші кроки', 'Первые шаги', 'First steps');
  const CH2 = L('Логіка та умови', 'Логика и условия', 'Logic and conditions');

  Codry.steps('python', [
    {
      id: 'print', chapter: CH1,
      title: L('Перша програма: print()', 'Первая программа: print()', 'Your first program: print()'),
      theory: L(
        `<p><b>Програма</b> — це список інструкцій, які комп’ютер виконує по черзі, <b>зверху вниз</b>. Python читає твій код рядок за рядком і робить те, що там написано.</p>
<p>Перша інструкція, яку вивчає кожен програміст, — <code>print()</code>. Вона <b>виводить</b> на екран те, що ти напишеш у дужках.</p>
<pre class="inline-code">print("Привіт!")</pre>
<p>Текст у програмуванні називається <b>рядком</b> (англ. <i>string</i>). Рядок завжди пишуть у лапках — подвійних <code>"..."</code> або одинарних <code>'...'</code>. Числа пишуть без лапок: <code>print(42)</code>.</p>
<p>Кожен виклик <code>print()</code> починає вивід з нового рядка.</p>`,
        `<p><b>Программа</b> — это список инструкций, которые компьютер выполняет по очереди, <b>сверху вниз</b>. Python читает твой код строка за строкой и делает то, что там написано.</p>
<p>Первая инструкция, которую изучает каждый программист, — <code>print()</code>. Она <b>выводит</b> на экран то, что ты напишешь в скобках.</p>
<pre class="inline-code">print("Привет!")</pre>
<p>Текст в программировании называется <b>строкой</b> (англ. <i>string</i>). Строку всегда пишут в кавычках — двойных <code>"..."</code> или одинарных <code>'...'</code>. Числа пишут без кавычек: <code>print(42)</code>.</p>
<p>Каждый вызов <code>print()</code> начинает вывод с новой строки.</p>`,
        `<p>A <b>program</b> is a list of instructions the computer runs one by one, <b>top to bottom</b>. Python reads your code line by line and does exactly what it says.</p>
<p>The first instruction every programmer learns is <code>print()</code>. It <b>outputs</b> whatever you put inside the parentheses.</p>
<pre class="inline-code">print("Hello!")</pre>
<p>Text in programming is called a <b>string</b>. A string is always written in quotes — double <code>"..."</code> or single <code>'...'</code>. Numbers are written without quotes: <code>print(42)</code>.</p>
<p>Every <code>print()</code> call starts its output on a new line.</p>`),
      why: L(
        `<p>Навіщо лапки? Без них Python вважає слово <b>іменем</b> чогось (змінної чи функції) і шукає його. Лапки кажуть: «це просто текст, нічого не шукай».</p><p>А дужки після <code>print</code> означають <b>виклик</b> функції: «зроби дію з тим, що всередині». Так влаштовані всі функції в Python.</p>`,
        `<p>Зачем кавычки? Без них Python считает слово <b>именем</b> чего-то (переменной или функции) и ищет его. Кавычки говорят: «это просто текст, ничего не ищи».</p><p>А скобки после <code>print</code> означают <b>вызов</b> функции: «сделай действие с тем, что внутри». Так устроены все функции в Python.</p>`,
        `<p>Why quotes? Without them Python treats a word as a <b>name</b> of something (a variable or function) and looks it up. Quotes say: “this is just text, don’t look anything up”.</p><p>The parentheses after <code>print</code> mean a <b>call</b>: “do the action with what’s inside”. Every function in Python works like this.</p>`),
      mistakes: L(
        `<ul><li><code>print(Hello)</code> — забули лапки → <code>NameError</code>.</li><li><code>Print("Hi")</code> — Python розрізняє великі й малі літери, <code>Print</code> не існує.</li><li><code>print("Hi)</code> — лапку відкрили, але не закрили → <code>SyntaxError</code>.</li></ul>`,
        `<ul><li><code>print(Hello)</code> — забыли кавычки → <code>NameError</code>.</li><li><code>Print("Hi")</code> — Python различает большие и маленькие буквы, <code>Print</code> не существует.</li><li><code>print("Hi)</code> — кавычку открыли, но не закрыли → <code>SyntaxError</code>.</li></ul>`,
        `<ul><li><code>print(Hello)</code> — missing quotes → <code>NameError</code>.</li><li><code>Print("Hi")</code> — Python is case-sensitive, <code>Print</code> doesn’t exist.</li><li><code>print("Hi)</code> — the quote was opened but never closed → <code>SyntaxError</code>.</li></ul>`),
      examples: [
        { title: L('Привітання', 'Приветствие', 'Greeting'), code: 'print("Hello, world!")', note: L('Класична перша програма будь-якого програміста.', 'Классическая первая программа любого программиста.', 'The classic first program of every programmer.') },
        { title: L('Кілька рядків', 'Несколько строк', 'Several lines'), code: 'print("One")\nprint("Two")\nprint("Three")', note: L('Інструкції виконуються по черзі, кожен print — новий рядок.', 'Инструкции выполняются по очереди, каждый print — новая строка.', 'Instructions run in order; each print is a new line.') },
        { title: L('Текст і числа', 'Текст и числа', 'Text and numbers'), code: 'print("I am", 13, "years old")\nprint(2026)\nprint("2 + 2 =", 2 + 2)', note: L('Через кому можна передати кілька значень — Python поставить між ними пробіли. Без лапок <code>2 + 2</code> обчислюється.', 'Через запятую можно передать несколько значений — Python поставит между ними пробелы. Без кавычек <code>2 + 2</code> вычисляется.', 'Separate several values with commas — Python puts spaces between them. Without quotes <code>2 + 2</code> is calculated.') },
        { title: L('Одинарні лапки', 'Одинарные кавычки', 'Single quotes'), code: "print('Single quotes work too')\nprint(\"It's easy\")\nprint('He said \"hi\"')", note: L('Якщо всередині тексту є апостроф — бери подвійні лапки, і навпаки.', 'Если внутри текста есть апостроф — бери двойные кавычки, и наоборот.', 'If the text contains an apostrophe use double quotes, and vice versa.') }
      ],
      task: {
        text: L('Виведи на екран два рядки: спочатку <code>Hello, Codry!</code>, потім <code>I can code</code>.', 'Выведи на экран две строки: сначала <code>Hello, Codry!</code>, затем <code>I can code</code>.', 'Print two lines: first <code>Hello, Codry!</code>, then <code>I can code</code>.'),
        how: [L('Напиши <code>print("Hello, Codry!")</code>.', 'Напиши <code>print("Hello, Codry!")</code>.', 'Write <code>print("Hello, Codry!")</code>.'), L('На новому рядку — другий <code>print</code> з текстом <code>I can code</code>.', 'На новой строке — второй <code>print</code> с текстом <code>I can code</code>.', 'On a new line add a second <code>print</code> with <code>I can code</code>.'), L('Натисни «Перевірити».', 'Нажми «Проверить».', 'Press “Check”.')],
        starter: L('# Напиши свій код нижче\n', '# Напиши свой код ниже\n', '# Write your code below\n'),
        solution: 'print("Hello, Codry!")\nprint("I can code")',
        hint: L('Два окремі виклики <code>print</code>, кожен на своєму рядку. Текст точно як у завданні.', 'Два отдельных вызова <code>print</code>, каждый на своей строке. Текст точно как в задании.', 'Two separate <code>print</code> calls, each on its own line. Text exactly as in the task.'),
        expected: 'Hello, Codry!\nI can code'
      },
      quiz: { q: L('Що виведе <code>print("5 + 5")</code>?', 'Что выведет <code>print("5 + 5")</code>?', 'What does <code>print("5 + 5")</code> output?'), options: ['10', '5 + 5', 'Error'], answer: 1, explain: L('У лапках — рядок, тож Python виводить текст як є.', 'В кавычках — строка, поэтому Python выводит текст как есть.', 'In quotes it is a string, so Python prints the text as is.') },
      ref: [{ code: 'print("text")', d: L('вивести на екран', 'вывести на экран', 'print to the screen') }, { code: 'print(a, b)', d: L('кілька значень через пробіл', 'несколько значений через пробел', 'several values separated by spaces') }]
    },
    {
      id: 'strings-escape', chapter: CH1,
      title: L('Рядки та спецсимволи', 'Строки и спецсимволы', 'Strings and special characters'),
      theory: L(
        `<p>Усередині рядка можна писати <b>спецсимволи</b>, які починаються зі зворотної риски <code>\\</code>:</p>
<table class="mini"><tr><td><code>\\n</code></td><td>новий рядок</td></tr><tr><td><code>\\t</code></td><td>табуляція (великий відступ)</td></tr><tr><td><code>\\"</code></td><td>лапка всередині рядка</td></tr><tr><td><code>\\\\</code></td><td>сама зворотна риска</td></tr></table>
<p>Функція <code>print</code> має корисні налаштування: <code>sep</code> — чим розділяти значення (за замовчуванням пробіл) і <code>end</code> — що поставити в кінці (за замовчуванням <code>\\n</code>).</p>
<pre class="inline-code">print("a", "b", sep="-")   # a-b
print("Hi", end="!")       # Hi! (без переходу на новий рядок)</pre>
<p>Довгий текст на кілька рядків пишуть у потрійних лапках <code>"""..."""</code>.</p>`,
        `<p>Внутри строки можно писать <b>спецсимволы</b>, которые начинаются с обратной косой черты <code>\\</code>:</p>
<table class="mini"><tr><td><code>\\n</code></td><td>новая строка</td></tr><tr><td><code>\\t</code></td><td>табуляция (большой отступ)</td></tr><tr><td><code>\\"</code></td><td>кавычка внутри строки</td></tr><tr><td><code>\\\\</code></td><td>сама обратная черта</td></tr></table>
<p>Функция <code>print</code> имеет полезные настройки: <code>sep</code> — чем разделять значения (по умолчанию пробел) и <code>end</code> — что поставить в конце (по умолчанию <code>\\n</code>).</p>
<pre class="inline-code">print("a", "b", sep="-")   # a-b
print("Hi", end="!")       # Hi! (без перехода на новую строку)</pre>
<p>Длинный текст на несколько строк пишут в тройных кавычках <code>"""..."""</code>.</p>`,
        `<p>Inside a string you can use <b>escape characters</b> that start with a backslash <code>\\</code>:</p>
<table class="mini"><tr><td><code>\\n</code></td><td>new line</td></tr><tr><td><code>\\t</code></td><td>tab (wide indent)</td></tr><tr><td><code>\\"</code></td><td>a quote inside the string</td></tr><tr><td><code>\\\\</code></td><td>the backslash itself</td></tr></table>
<p><code>print</code> has handy options: <code>sep</code> — what goes between values (space by default) and <code>end</code> — what goes at the end (<code>\\n</code> by default).</p>
<pre class="inline-code">print("a", "b", sep="-")   # a-b
print("Hi", end="!")       # Hi! (no new line)</pre>
<p>Long multi-line text is written in triple quotes <code>"""..."""</code>.</p>`),
      why: L(`<p>Клавішу Enter не можна «покласти» в рядок у звичайних лапках — рядок мусить закінчитися на тому ж рядку коду. Тому придумали код <code>\\n</code>: два символи в коді, але один невидимий символ «перенос» у тексті.</p>`,
        `<p>Клавишу Enter нельзя «положить» в строку в обычных кавычках — строка должна закончиться на той же строке кода. Поэтому придумали код <code>\\n</code>: два символа в коде, но один невидимый символ «перенос» в тексте.</p>`,
        `<p>You can’t put the Enter key inside a normal quoted string — the string must end on the same line of code. That’s why <code>\\n</code> exists: two characters in code, one invisible “line break” character in the text.</p>`),
      mistakes: L(`<ul><li>Писати <code>/n</code> замість <code>\\n</code> — це звичайна похила риска, вона так і виведеться.</li><li><code>print("He said "hi"")</code> — лапки всередині закривають рядок. Використай <code>\\"</code> або інші лапки.</li></ul>`,
        `<ul><li>Писать <code>/n</code> вместо <code>\\n</code> — это обычная косая черта, она так и выведется.</li><li><code>print("He said "hi"")</code> — кавычки внутри закрывают строку. Используй <code>\\"</code> или другие кавычки.</li></ul>`,
        `<ul><li>Writing <code>/n</code> instead of <code>\\n</code> — that’s a regular slash and is printed as is.</li><li><code>print("He said "hi"")</code> — inner quotes close the string. Use <code>\\"</code> or the other quote type.</li></ul>`),
      examples: [
        { title: '\\n', code: 'print("Line 1\\nLine 2\\nLine 3")', note: L('Один print — три рядки.', 'Один print — три строки.', 'One print — three lines.') },
        { title: '\\t', code: 'print("Name\\tAge")\nprint("Ann\\t14")\nprint("Max\\t15")', note: L('Табуляція вирівнює колонки.', 'Табуляция выравнивает колонки.', 'Tabs line up columns.') },
        { title: 'sep / end', code: 'print(2026, 10, 17, sep="-")\nprint("Loading", end="")\nprint("...", end="")\nprint(" done!")', note: L('<code>end=""</code> залишає курсор на тому ж рядку.', '<code>end=""</code> оставляет курсор на той же строке.', '<code>end=""</code> keeps the cursor on the same line.') },
        { title: '"""', code: 'poem = """Roses are red,\nViolets are blue,\nPython is fun!"""\nprint(poem)', note: L('Потрійні лапки зберігають переноси як є.', 'Тройные кавычки сохраняют переносы как есть.', 'Triple quotes keep line breaks as they are.') }
      ],
      task: {
        text: L('Одним викликом <code>print</code> виведи три рядки: <code>Python</code>, <code>is</code>, <code>fun</code> (кожне слово на новому рядку). Використай <code>\\n</code>.', 'Одним вызовом <code>print</code> выведи три строки: <code>Python</code>, <code>is</code>, <code>fun</code> (каждое слово на новой строке). Используй <code>\\n</code>.', 'With a single <code>print</code> call output three lines: <code>Python</code>, <code>is</code>, <code>fun</code> (each word on a new line). Use <code>\\n</code>.'),
        how: [L('Усе в одних лапках.', 'Всё в одних кавычках.', 'Everything in one pair of quotes.'), L('Між словами постав <code>\\n</code> без пробілів.', 'Между словами поставь <code>\\n</code> без пробелов.', 'Put <code>\\n</code> between words with no spaces.')],
        starter: '',
        solution: 'print("Python\\nis\\nfun")',
        hint: L('<code>print("Python\\nis\\nfun")</code>', '<code>print("Python\\nis\\nfun")</code>', '<code>print("Python\\nis\\nfun")</code>'),
        expected: 'Python\nis\nfun',
        check: (out, code) => out.trim() === 'Python\nis\nfun' && (code.match(/print\s*\(/g) || []).length === 1
      },
      quiz: { q: L('Що виведе <code>print("A", "B", sep="")</code>?', 'Что выведет <code>print("A", "B", sep="")</code>?', 'What does <code>print("A", "B", sep="")</code> print?'), options: ['A B', 'AB', 'A\\nB'], answer: 1, explain: L('Порожній <code>sep</code> — нічого між значеннями.', 'Пустой <code>sep</code> — ничего между значениями.', 'An empty <code>sep</code> means nothing between values.') },
      ref: [{ code: '\\n  \\t', d: L('новий рядок, табуляція', 'новая строка, табуляция', 'new line, tab') }, { code: 'print(a, b, sep="-", end="")', d: L('розділювач і кінець', 'разделитель и конец', 'separator and ending') }]
    },
    {
      id: 'comments-errors', chapter: CH1,
      title: L('Коментарі та помилки', 'Комментарии и ошибки', 'Comments and errors'),
      theory: L(
        `<p><b>Коментар</b> — це текст для людей. Він починається з <code>#</code>, і Python його повністю ігнорує. Коментарями пояснюють складні місця або тимчасово «вимикають» рядок коду.</p>
<p>Помилки — нормальна частина програмування. Python повідомляє, <b>де</b> і <b>що</b> пішло не так. Найчастіші:</p>
<ul><li><code>SyntaxError</code> — код написано неправильно (забута дужка, лапка).</li><li><code>NameError</code> — використали ім’я, якого не існує (опечатка).</li><li><code>TypeError</code> — дія з неправильним типом (наприклад, текст + число).</li><li><code>IndentationError</code> — неправильні відступи.</li></ul>
<p>Читай повідомлення <b>знизу вгору</b>: останній рядок каже тип помилки, а вище вказано номер рядка коду.</p>`,
        `<p><b>Комментарий</b> — это текст для людей. Он начинается с <code>#</code>, и Python его полностью игнорирует. Комментариями поясняют сложные места или временно «выключают» строку кода.</p>
<p>Ошибки — нормальная часть программирования. Python сообщает, <b>где</b> и <b>что</b> пошло не так. Самые частые:</p>
<ul><li><code>SyntaxError</code> — код написан неправильно (забыта скобка, кавычка).</li><li><code>NameError</code> — использовали имя, которого не существует (опечатка).</li><li><code>TypeError</code> — действие с неправильным типом (например, текст + число).</li><li><code>IndentationError</code> — неправильные отступы.</li></ul>
<p>Читай сообщение <b>снизу вверх</b>: последняя строка говорит тип ошибки, а выше указан номер строки кода.</p>`,
        `<p>A <b>comment</b> is text for humans. It starts with <code>#</code> and Python ignores it completely. Comments explain tricky parts or temporarily “switch off” a line of code.</p>
<p>Errors are a normal part of programming. Python tells you <b>where</b> and <b>what</b> went wrong. The most common:</p>
<ul><li><code>SyntaxError</code> — the code is written incorrectly (missing bracket or quote).</li><li><code>NameError</code> — you used a name that doesn’t exist (a typo).</li><li><code>TypeError</code> — an operation with the wrong type (e.g. text + number).</li><li><code>IndentationError</code> — wrong indentation.</li></ul>
<p>Read the message <b>bottom-up</b>: the last line names the error, the lines above show the line number.</p>`),
      why: L(`<p>Програми читають частіше, ніж пишуть — і ти сам через тиждень забудеш, навіщо писав той чи інший рядок. Коментарі економлять час. А детальні повідомлення про помилки — це підказка від Python, а не покарання.</p>`,
        `<p>Программы читают чаще, чем пишут — и ты сам через неделю забудешь, зачем писал ту или иную строку. Комментарии экономят время. А подробные сообщения об ошибках — это подсказка от Python, а не наказание.</p>`,
        `<p>Code is read more often than it is written — even you will forget why you wrote a line a week later. Comments save time. Detailed error messages are Python helping you, not punishing you.</p>`),
      mistakes: L(`<ul><li>Коментувати очевидне: <code>x = 5  # x дорівнює 5</code> — краще пояснюй «навіщо».</li><li>Ігнорувати текст помилки й одразу переписувати все — спершу прочитай!</li></ul>`,
        `<ul><li>Комментировать очевидное: <code>x = 5  # x равно 5</code> — лучше объясняй «зачем».</li><li>Игнорировать текст ошибки и сразу переписывать всё — сначала прочитай!</li></ul>`,
        `<ul><li>Commenting the obvious: <code>x = 5  # x is 5</code> — explain “why” instead.</li><li>Ignoring the error text and rewriting everything — read it first!</li></ul>`),
      examples: [
        { title: L('Коментарі', 'Комментарии', 'Comments'), code: '# This program greets the user\nprint("Hi!")  # a comment after the code\n# print("This line is switched off")', note: L('Третій рядок не виконається — він закоментований.', 'Третья строка не выполнится — она закомментирована.', 'The third line won’t run — it is commented out.') },
        { title: 'NameError', code: 'print("Start")\nprint(mesage)', note: L('Запусти й прочитай помилку: Python вказує рядок 2 та ім’я <code>mesage</code>.', 'Запусти и прочитай ошибку: Python указывает строку 2 и имя <code>mesage</code>.', 'Run it and read the error: Python points to line 2 and the name <code>mesage</code>.') },
        { title: 'SyntaxError', code: 'print("Hello"', note: L('Забута закривальна дужка.', 'Забыта закрывающая скобка.', 'A missing closing parenthesis.') },
        { title: 'TypeError', code: 'print("Age: " + 15)', note: L('Не можна склеїти рядок і число через <code>+</code>. Як це виправити — дізнаєшся далі.', 'Нельзя склеить строку и число через <code>+</code>. Как это исправить — узнаешь дальше.', 'You can’t join a string and a number with <code>+</code>. You’ll learn how to fix it soon.') }
      ],
      task: {
        text: L('У коді є дві помилки. Виправ їх, щоб програма вивела <code>Bug</code> і <code>fixed</code> на двох рядках. Залиш коментар, що пояснює програму.', 'В коде две ошибки. Исправь их, чтобы программа вывела <code>Bug</code> и <code>fixed</code> на двух строках. Оставь комментарий, поясняющий программу.', 'There are two bugs in the code. Fix them so the program prints <code>Bug</code> and <code>fixed</code> on two lines. Keep the comment explaining the program.'),
        how: [L('Натисни «Запустити» і прочитай помилку.', 'Нажми «Запустить» и прочитай ошибку.', 'Press “Run” and read the error.'), L('Виправ і запусти знову — з’явиться друга помилка.', 'Исправь и запусти снова — появится вторая ошибка.', 'Fix it and run again — the second error will appear.')],
        starter: '# Prints a short message\nprint("Bug)\nPrint("fixed")\n',
        solution: '# Prints a short message\nprint("Bug")\nprint("fixed")\n',
        hint: L('Закрий лапку в першому рядку, а <code>Print</code> напиши з маленької літери.', 'Закрой кавычку в первой строке, а <code>Print</code> напиши с маленькой буквы.', 'Close the quote in the first line and write <code>print</code> in lowercase.'),
        expected: 'Bug\nfixed',
        check: (out, code) => out.trim() === 'Bug\nfixed' && /#/.test(code)
      },
      quiz: { q: L('Яка помилка буде в <code>prnt("hi")</code>?', 'Какая ошибка будет в <code>prnt("hi")</code>?', 'What error does <code>prnt("hi")</code> cause?'), options: ['SyntaxError', 'NameError', 'TypeError'], answer: 1, explain: L('Ім’я <code>prnt</code> не існує — це <code>NameError</code>.', 'Имя <code>prnt</code> не существует — это <code>NameError</code>.', 'The name <code>prnt</code> doesn’t exist — <code>NameError</code>.') },
      ref: [{ code: '# comment', d: L('коментар', 'комментарий', 'comment') }, { code: 'NameError / SyntaxError', d: L('типові помилки', 'типичные ошибки', 'common errors') }]
    },
    {
      id: 'math', chapter: CH1,
      title: L('Числа та арифметика', 'Числа и арифметика', 'Numbers and arithmetic'),
      theory: L(
        `<p>Python — потужний калькулятор. Основні операції:</p>
<table class="mini"><tr><th>Знак</th><th>Дія</th><th>Приклад</th></tr><tr><td><code>+ -</code></td><td>додавання, віднімання</td><td><code>7 - 2</code> → 5</td></tr><tr><td><code>*</code></td><td>множення</td><td><code>7 * 2</code> → 14</td></tr><tr><td><code>/</code></td><td>ділення (результат завжди дробовий)</td><td><code>7 / 2</code> → 3.5</td></tr><tr><td><code>//</code></td><td>цілочисельне ділення</td><td><code>7 // 2</code> → 3</td></tr><tr><td><code>%</code></td><td>остача від ділення</td><td><code>7 % 2</code> → 1</td></tr><tr><td><code>**</code></td><td>степінь</td><td><code>2 ** 3</code> → 8</td></tr></table>
<p>Порядок дій як у математиці: спершу <code>**</code>, потім <code>* / // %</code>, потім <code>+ -</code>. Дужки змінюють порядок.</p>
<p>Цілі числа називаються <code>int</code>, дробові — <code>float</code> (через крапку: <code>3.14</code>). Корисні функції: <code>abs(-5)</code> → 5, <code>round(3.7)</code> → 4, <code>max(1, 9, 4)</code>, <code>min(...)</code>.</p>`,
        `<p>Python — мощный калькулятор. Основные операции:</p>
<table class="mini"><tr><th>Знак</th><th>Действие</th><th>Пример</th></tr><tr><td><code>+ -</code></td><td>сложение, вычитание</td><td><code>7 - 2</code> → 5</td></tr><tr><td><code>*</code></td><td>умножение</td><td><code>7 * 2</code> → 14</td></tr><tr><td><code>/</code></td><td>деление (результат всегда дробный)</td><td><code>7 / 2</code> → 3.5</td></tr><tr><td><code>//</code></td><td>целочисленное деление</td><td><code>7 // 2</code> → 3</td></tr><tr><td><code>%</code></td><td>остаток от деления</td><td><code>7 % 2</code> → 1</td></tr><tr><td><code>**</code></td><td>степень</td><td><code>2 ** 3</code> → 8</td></tr></table>
<p>Порядок действий как в математике: сначала <code>**</code>, потом <code>* / // %</code>, потом <code>+ -</code>. Скобки меняют порядок.</p>
<p>Целые числа называются <code>int</code>, дробные — <code>float</code> (через точку: <code>3.14</code>). Полезные функции: <code>abs(-5)</code> → 5, <code>round(3.7)</code> → 4, <code>max(1, 9, 4)</code>, <code>min(...)</code>.</p>`,
        `<p>Python is a powerful calculator. The main operations:</p>
<table class="mini"><tr><th>Sign</th><th>Operation</th><th>Example</th></tr><tr><td><code>+ -</code></td><td>add, subtract</td><td><code>7 - 2</code> → 5</td></tr><tr><td><code>*</code></td><td>multiply</td><td><code>7 * 2</code> → 14</td></tr><tr><td><code>/</code></td><td>divide (always a decimal result)</td><td><code>7 / 2</code> → 3.5</td></tr><tr><td><code>//</code></td><td>integer division</td><td><code>7 // 2</code> → 3</td></tr><tr><td><code>%</code></td><td>remainder</td><td><code>7 % 2</code> → 1</td></tr><tr><td><code>**</code></td><td>power</td><td><code>2 ** 3</code> → 8</td></tr></table>
<p>Order of operations is like in maths: <code>**</code> first, then <code>* / // %</code>, then <code>+ -</code>. Parentheses change the order.</p>
<p>Whole numbers are <code>int</code>, decimals are <code>float</code> (with a dot: <code>3.14</code>). Handy functions: <code>abs(-5)</code> → 5, <code>round(3.7)</code> → 4, <code>max(1, 9, 4)</code>, <code>min(...)</code>.</p>`),
      why: L(`<p>Навіщо окремі <code>//</code> і <code>%</code>? Вони постійно потрібні в реальних задачах: скільки повних коробок вийде з 50 яблук по 12 (<code>50 // 12</code>) і скільки яблук залишиться (<code>50 % 12</code>). А <code>% 2</code> миттєво каже, чи число парне.</p>`,
        `<p>Зачем отдельные <code>//</code> и <code>%</code>? Они постоянно нужны в реальных задачах: сколько полных коробок выйдет из 50 яблок по 12 (<code>50 // 12</code>) и сколько яблок останется (<code>50 % 12</code>). А <code>% 2</code> мгновенно говорит, чётное ли число.</p>`,
        `<p>Why separate <code>//</code> and <code>%</code>? Real tasks need them all the time: how many full boxes of 12 you get from 50 apples (<code>50 // 12</code>) and how many apples are left (<code>50 % 12</code>). And <code>% 2</code> instantly tells whether a number is even.</p>`),
      mistakes: L(`<ul><li>Дробові числа пишуть через <b>крапку</b>: <code>3.5</code>, а не <code>3,5</code> (кома розділяє значення).</li><li><code>0.1 + 0.2</code> дає <code>0.30000000000000004</code> — так комп’ютер зберігає дроби; використовуй <code>round()</code>.</li><li>Ділення на нуль → <code>ZeroDivisionError</code>.</li></ul>`,
        `<ul><li>Дробные числа пишут через <b>точку</b>: <code>3.5</code>, а не <code>3,5</code> (запятая разделяет значения).</li><li><code>0.1 + 0.2</code> даёт <code>0.30000000000000004</code> — так компьютер хранит дроби; используй <code>round()</code>.</li><li>Деление на ноль → <code>ZeroDivisionError</code>.</li></ul>`,
        `<ul><li>Decimals use a <b>dot</b>: <code>3.5</code>, not <code>3,5</code> (a comma separates values).</li><li><code>0.1 + 0.2</code> gives <code>0.30000000000000004</code> — that’s how computers store fractions; use <code>round()</code>.</li><li>Dividing by zero → <code>ZeroDivisionError</code>.</li></ul>`),
      examples: [
        { title: L('Калькулятор', 'Калькулятор', 'Calculator'), code: 'print(7 + 3)\nprint(7 - 3)\nprint(7 * 3)\nprint(7 / 2)\nprint(7 // 2)\nprint(7 % 2)\nprint(2 ** 10)', note: L('Порівняй <code>/</code> і <code>//</code>.', 'Сравни <code>/</code> и <code>//</code>.', 'Compare <code>/</code> and <code>//</code>.') },
        { title: L('Порядок дій', 'Порядок действий', 'Order of operations'), code: 'print(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(2 ** 3 ** 2)\nprint(-3 ** 2)', note: L('Степінь виконується справа наліво, а мінус застосовується після степеня.', 'Степень выполняется справа налево, а минус применяется после степени.', 'Power is evaluated right to left, and the minus applies after the power.') },
        { title: L('Коробки з яблуками', 'Коробки с яблоками', 'Apple boxes'), code: 'print("Full boxes:", 50 // 12)\nprint("Left over:", 50 % 12)\nprint("Is 50 even?", 50 % 2 == 0)', note: L('Класичне застосування <code>//</code> і <code>%</code>.', 'Классическое применение <code>//</code> и <code>%</code>.', 'The classic use of <code>//</code> and <code>%</code>.') },
        { title: L('Функції', 'Функции', 'Functions'), code: 'print(abs(-7))\nprint(round(3.14159, 2))\nprint(max(4, 9, 1))\nprint(min(4, 9, 1))\nprint(0.1 + 0.2)\nprint(round(0.1 + 0.2, 2))', note: L('<code>round(x, 2)</code> залишає 2 знаки після крапки.', '<code>round(x, 2)</code> оставляет 2 знака после точки.', '<code>round(x, 2)</code> keeps 2 decimal places.') }
      ],
      task: {
        text: L('У класі 29 учнів, за кожну парту сідає по 2. Виведи два числа: скільки парт буде повністю зайнято (<code>//</code>) і скільки учнів сяде самостійно (<code>%</code>). Потім виведи <code>2</code> у 10-му степені.', 'В классе 29 учеников, за каждую парту садятся по 2. Выведи два числа: сколько парт будет полностью занято (<code>//</code>) и сколько учеников сядет в одиночку (<code>%</code>). Затем выведи <code>2</code> в 10-й степени.', 'A class has 29 students, 2 per desk. Print two numbers: how many desks are fully taken (<code>//</code>) and how many students sit alone (<code>%</code>). Then print <code>2</code> to the power of 10.'),
        how: [L('<code>print(29 // 2)</code>', '<code>print(29 // 2)</code>', '<code>print(29 // 2)</code>'), L('<code>print(29 % 2)</code>', '<code>print(29 % 2)</code>', '<code>print(29 % 2)</code>'), L('Степінь — оператор <code>**</code>.', 'Степень — оператор <code>**</code>.', 'Power is the <code>**</code> operator.')],
        starter: '',
        solution: 'print(29 // 2)\nprint(29 % 2)\nprint(2 ** 10)',
        hint: L('Три окремі print: <code>29 // 2</code>, <code>29 % 2</code>, <code>2 ** 10</code>.', 'Три отдельных print: <code>29 // 2</code>, <code>29 % 2</code>, <code>2 ** 10</code>.', 'Three prints: <code>29 // 2</code>, <code>29 % 2</code>, <code>2 ** 10</code>.'),
        expected: '14\n1\n1024',
        must: /\/\/[\s\S]*%[\s\S]*\*\*/
      },
      quiz: { q: L('Чому дорівнює <code>17 % 5</code>?', 'Чему равно <code>17 % 5</code>?', 'What is <code>17 % 5</code>?'), options: ['3', '2', '3.4'], answer: 1, explain: L('17 = 5·3 + 2, остача 2.', '17 = 5·3 + 2, остаток 2.', '17 = 5·3 + 2, remainder 2.') },
      ref: [{ code: '// %', d: L('ціле ділення, остача', 'целое деление, остаток', 'integer division, remainder') }, { code: '**', d: L('степінь', 'степень', 'power') }, { code: 'round(x, 2)', d: L('округлення', 'округление', 'rounding') }]
    },
    {
      id: 'variables', chapter: CH1,
      title: L('Змінні', 'Переменные', 'Variables'),
      theory: L(
        `<p><b>Змінна</b> — це ім’я, яке вказує на значення в пам’яті. Уяви коробку з наклейкою: на наклейці ім’я, всередині — значення.</p>
<pre class="inline-code">score = 10
name = "Oleh"</pre>
<p>Знак <code>=</code> означає <b>присвоєння</b>: «поклади значення справа в змінну зліва». Це не математична рівність!</p>
<p>Значення змінної можна змінювати: <code>score = score + 5</code> — візьми старе значення, додай 5 і збережи назад. Скорочено: <code>score += 5</code> (також <code>-=</code>, <code>*=</code>, <code>/=</code>).</p>
<h4>Правила імен</h4>
<ul><li>Латинські літери, цифри та <code>_</code>; не можна починати з цифри.</li><li>Великі й малі літери різні: <code>age</code> і <code>Age</code> — різні змінні.</li><li>Стиль Python — <code>snake_case</code>: <code>user_name</code>, <code>max_score</code>.</li></ul>`,
        `<p><b>Переменная</b> — это имя, которое указывает на значение в памяти. Представь коробку с наклейкой: на наклейке имя, внутри — значение.</p>
<pre class="inline-code">score = 10
name = "Oleh"</pre>
<p>Знак <code>=</code> означает <b>присваивание</b>: «положи значение справа в переменную слева». Это не математическое равенство!</p>
<p>Значение переменной можно менять: <code>score = score + 5</code> — возьми старое значение, прибавь 5 и сохрани обратно. Сокращённо: <code>score += 5</code> (также <code>-=</code>, <code>*=</code>, <code>/=</code>).</p>
<h4>Правила имён</h4>
<ul><li>Латинские буквы, цифры и <code>_</code>; нельзя начинать с цифры.</li><li>Большие и маленькие буквы различаются: <code>age</code> и <code>Age</code> — разные переменные.</li><li>Стиль Python — <code>snake_case</code>: <code>user_name</code>, <code>max_score</code>.</li></ul>`,
        `<p>A <b>variable</b> is a name that points to a value in memory. Picture a box with a label: the label is the name, the content is the value.</p>
<pre class="inline-code">score = 10
name = "Oleh"</pre>
<p>The <code>=</code> sign means <b>assignment</b>: “put the value on the right into the variable on the left”. It is not mathematical equality!</p>
<p>A variable’s value can change: <code>score = score + 5</code> — take the old value, add 5 and store it back. Short form: <code>score += 5</code> (also <code>-=</code>, <code>*=</code>, <code>/=</code>).</p>
<h4>Naming rules</h4>
<ul><li>Latin letters, digits and <code>_</code>; can’t start with a digit.</li><li>Case matters: <code>age</code> and <code>Age</code> are different variables.</li><li>Python style is <code>snake_case</code>: <code>user_name</code>, <code>max_score</code>.</li></ul>`),
      why: L(`<p>Змінні дають значенням <b>імена зі змістом</b>. Порівняй <code>print(45 * 3)</code> і <code>print(price * count)</code> — у другому випадку зрозуміло, що відбувається. А якщо ціна зміниться, достатньо поміняти одне місце.</p>`,
        `<p>Переменные дают значениям <b>осмысленные имена</b>. Сравни <code>print(45 * 3)</code> и <code>print(price * count)</code> — во втором случае понятно, что происходит. А если цена изменится, достаточно поменять одно место.</p>`,
        `<p>Variables give values <b>meaningful names</b>. Compare <code>print(45 * 3)</code> with <code>print(price * count)</code> — the second is self-explanatory. And if the price changes, you edit one place only.</p>`),
      mistakes: L(`<ul><li>Використати змінну до того, як її створили → <code>NameError</code>.</li><li><code>5 = x</code> — змінна завжди зліва від <code>=</code>.</li><li>Імена на кшталт <code>a</code>, <code>b2</code>, <code>xx</code> — через тиждень ніхто не згадає, що в них.</li></ul>`,
        `<ul><li>Использовать переменную до того, как её создали → <code>NameError</code>.</li><li><code>5 = x</code> — переменная всегда слева от <code>=</code>.</li><li>Имена вроде <code>a</code>, <code>b2</code>, <code>xx</code> — через неделю никто не вспомнит, что в них.</li></ul>`,
        `<ul><li>Using a variable before it exists → <code>NameError</code>.</li><li><code>5 = x</code> — the variable always goes on the left of <code>=</code>.</li><li>Names like <code>a</code>, <code>b2</code>, <code>xx</code> — nobody will remember what they hold a week later.</li></ul>`),
      examples: [
        { title: L('Створення', 'Создание', 'Creating'), code: 'name = "Olya"\nage = 14\nprint(name)\nprint(age)\nprint(name, "is", age)', note: L('Змінна запам’ятовує значення, ми звертаємося до неї за іменем.', 'Переменная запоминает значение, мы обращаемся к ней по имени.', 'A variable remembers a value; we refer to it by name.') },
        { title: L('Зміна значення', 'Изменение значения', 'Changing the value'), code: 'score = 10\nprint(score)\nscore = 25\nprint(score)\nscore += 5\nprint(score)\nscore *= 2\nprint(score)', note: L('Кожне присвоєння замінює попереднє значення.', 'Каждое присваивание заменяет предыдущее значение.', 'Each assignment replaces the previous value.') },
        { title: L('Покупка', 'Покупка', 'Shopping'), code: 'price = 45\ncount = 3\ntotal = price * count\nprint("Total:", total)\ndiscount = 15\ntotal -= discount\nprint("With discount:", total)', note: L('Імена пояснюють, що рахуємо.', 'Имена объясняют, что считаем.', 'The names explain what we calculate.') },
        { title: L('Обмін значень', 'Обмен значений', 'Swapping values'), code: 'a = 1\nb = 2\na, b = b, a\nprint(a, b)\nx = y = 0\nprint(x, y)', note: L('Python вміє присвоювати кілька змінних одразу.', 'Python умеет присваивать несколько переменных сразу.', 'Python can assign several variables at once.') }
      ],
      task: {
        text: L('Гравець має <code>coins = 120</code>. Він купує меч за 75 монет, потім знаходить скарб на 40. Онови змінну за допомогою <code>-=</code> і <code>+=</code> та виведи підсумок: <code>Coins: 85</code>.', 'У игрока <code>coins = 120</code>. Он покупает меч за 75 монет, затем находит клад на 40. Обнови переменную с помощью <code>-=</code> и <code>+=</code> и выведи итог: <code>Coins: 85</code>.', 'A player has <code>coins = 120</code>. They buy a sword for 75 coins, then find treasure worth 40. Update the variable with <code>-=</code> and <code>+=</code> and print the result: <code>Coins: 85</code>.'),
        how: [L('<code>coins -= 75</code>', '<code>coins -= 75</code>', '<code>coins -= 75</code>'), L('<code>coins += 40</code>', '<code>coins += 40</code>', '<code>coins += 40</code>'), L('<code>print("Coins:", coins)</code>', '<code>print("Coins:", coins)</code>', '<code>print("Coins:", coins)</code>')],
        starter: 'coins = 120\n',
        solution: 'coins = 120\ncoins -= 75\ncoins += 40\nprint("Coins:", coins)',
        hint: L('Не пиши 85 вручну — нехай Python порахує.', 'Не пиши 85 вручную — пусть Python посчитает.', 'Don’t write 85 by hand — let Python calculate it.'),
        expected: 'Coins: 85',
        must: /-=[\s\S]*\+=/
      },
      quiz: { q: L('Що буде в <code>x</code>: <code>x = 4; x = x * 3; x -= 2</code>?', 'Что будет в <code>x</code>: <code>x = 4; x = x * 3; x -= 2</code>?', 'What is <code>x</code> after <code>x = 4; x = x * 3; x -= 2</code>?'), options: ['10', '12', '4'], answer: 0, explain: L('4·3 = 12, потім 12 − 2 = 10.', '4·3 = 12, затем 12 − 2 = 10.', '4·3 = 12, then 12 − 2 = 10.') },
      ref: [{ code: 'x = 5', d: L('створити змінну', 'создать переменную', 'create a variable') }, { code: 'x += 1', d: L('збільшити на 1', 'увеличить на 1', 'increase by 1') }, { code: 'a, b = b, a', d: L('обміняти значення', 'обменять значения', 'swap values') }]
    },
    {
      id: 'types', chapter: CH1,
      title: L('Типи даних і перетворення', 'Типы данных и преобразования', 'Data types and conversion'),
      theory: L(
        `<p>Кожне значення має <b>тип</b>. Основні типи Python:</p>
<table class="mini"><tr><td><code>int</code></td><td>ціле число</td><td><code>42</code>, <code>-7</code></td></tr><tr><td><code>float</code></td><td>дробове число</td><td><code>3.14</code></td></tr><tr><td><code>str</code></td><td>рядок</td><td><code>"cat"</code></td></tr><tr><td><code>bool</code></td><td>логічне</td><td><code>True</code>, <code>False</code></td></tr></table>
<p>Функція <code>type(x)</code> показує тип. А функції з назвами типів <b>перетворюють</b> значення:</p>
<ul><li><code>int("25")</code> → 25 (рядок у число)</li><li><code>str(25)</code> → <code>"25"</code> (число в рядок)</li><li><code>float("2.5")</code> → 2.5</li><li><code>int(3.99)</code> → 3 (відкидає дробову частину)</li></ul>
<p>Тип визначає, що можна робити: числа додаються, а рядки <b>склеюються</b>: <code>"2" + "2"</code> → <code>"22"</code>.</p>`,
        `<p>Каждое значение имеет <b>тип</b>. Основные типы Python:</p>
<table class="mini"><tr><td><code>int</code></td><td>целое число</td><td><code>42</code>, <code>-7</code></td></tr><tr><td><code>float</code></td><td>дробное число</td><td><code>3.14</code></td></tr><tr><td><code>str</code></td><td>строка</td><td><code>"cat"</code></td></tr><tr><td><code>bool</code></td><td>логическое</td><td><code>True</code>, <code>False</code></td></tr></table>
<p>Функция <code>type(x)</code> показывает тип. А функции с названиями типов <b>преобразуют</b> значения:</p>
<ul><li><code>int("25")</code> → 25 (строку в число)</li><li><code>str(25)</code> → <code>"25"</code> (число в строку)</li><li><code>float("2.5")</code> → 2.5</li><li><code>int(3.99)</code> → 3 (отбрасывает дробную часть)</li></ul>
<p>Тип определяет, что можно делать: числа складываются, а строки <b>склеиваются</b>: <code>"2" + "2"</code> → <code>"22"</code>.</p>`,
        `<p>Every value has a <b>type</b>. Python’s basic types:</p>
<table class="mini"><tr><td><code>int</code></td><td>whole number</td><td><code>42</code>, <code>-7</code></td></tr><tr><td><code>float</code></td><td>decimal number</td><td><code>3.14</code></td></tr><tr><td><code>str</code></td><td>string</td><td><code>"cat"</code></td></tr><tr><td><code>bool</code></td><td>boolean</td><td><code>True</code>, <code>False</code></td></tr></table>
<p><code>type(x)</code> shows the type. Functions named after types <b>convert</b> values:</p>
<ul><li><code>int("25")</code> → 25 (string to number)</li><li><code>str(25)</code> → <code>"25"</code> (number to string)</li><li><code>float("2.5")</code> → 2.5</li><li><code>int(3.99)</code> → 3 (drops the fraction)</li></ul>
<p>The type decides what you can do: numbers add up, strings <b>concatenate</b>: <code>"2" + "2"</code> → <code>"22"</code>.</p>`),
      why: L(`<p>Чому Python не перетворює типи сам? Бо не знає, чого ти хочеш: <code>"2" + 2</code> — це 4 чи "22"? Замість того щоб вгадувати і робити тихі помилки, Python вимагає явного рішення — це робить програми надійнішими.</p>`,
        `<p>Почему Python не преобразует типы сам? Потому что не знает, чего ты хочешь: <code>"2" + 2</code> — это 4 или "22"? Вместо того чтобы угадывать и делать тихие ошибки, Python требует явного решения — это делает программы надёжнее.</p>`,
        `<p>Why doesn’t Python convert types by itself? Because it can’t know your intent: is <code>"2" + 2</code> 4 or "22"? Instead of guessing and causing silent bugs, Python asks you to decide explicitly — that makes programs more reliable.</p>`),
      mistakes: L(`<ul><li><code>int("3.5")</code> → помилка: спершу <code>float("3.5")</code>, потім <code>int()</code>.</li><li><code>int("abc")</code> → <code>ValueError</code>: у рядку не число.</li><li><code>True</code> і <code>False</code> пишуться з великої літери.</li></ul>`,
        `<ul><li><code>int("3.5")</code> → ошибка: сначала <code>float("3.5")</code>, потом <code>int()</code>.</li><li><code>int("abc")</code> → <code>ValueError</code>: в строке не число.</li><li><code>True</code> и <code>False</code> пишутся с большой буквы.</li></ul>`,
        `<ul><li><code>int("3.5")</code> → error: do <code>float("3.5")</code> first, then <code>int()</code>.</li><li><code>int("abc")</code> → <code>ValueError</code>: the string isn’t a number.</li><li><code>True</code> and <code>False</code> start with a capital letter.</li></ul>`),
      examples: [
        { title: 'type()', code: 'print(type(42))\nprint(type(3.14))\nprint(type("hi"))\nprint(type(True))\nprint(type("42"))', note: L('Останнє — рядок, хоч і схоже на число.', 'Последнее — строка, хоть и похоже на число.', 'The last one is a string even though it looks like a number.') },
        { title: L('Склеювання vs додавання', 'Склеивание vs сложение', 'Concatenation vs addition'), code: 'print("2" + "2")\nprint(2 + 2)\nprint("Ha" * 3)\nprint(int("2") + int("2"))', note: L('Той самий <code>+</code> по-різному працює для різних типів.', 'Тот же <code>+</code> по-разному работает для разных типов.', 'The same <code>+</code> behaves differently for different types.') },
        { title: 'str()', code: 'age = 15\nprint("Age: " + str(age))\nprint("Next year: " + str(age + 1))', note: L('Щоб склеїти з текстом, число треба перетворити на рядок.', 'Чтобы склеить с текстом, число нужно превратить в строку.', 'To join with text, convert the number to a string.') },
        { title: 'int / float', code: 'print(int(3.99))\nprint(float(7))\nprint(int("100") * 2)\nprint(float("2.5") + 1)\nprint(int(float("3.5")))', note: L('<code>int()</code> не округлює, а відкидає дробову частину.', '<code>int()</code> не округляет, а отбрасывает дробную часть.', '<code>int()</code> doesn’t round, it drops the fraction.') }
      ],
      task: {
        text: L('Є рядки <code>a = "12"</code> і <code>b = "30"</code>. Виведи їхню <b>суму як чисел</b> (42), а потім результат <b>склеювання</b> рядків (1230).', 'Есть строки <code>a = "12"</code> и <code>b = "30"</code>. Выведи их <b>сумму как чисел</b> (42), а затем результат <b>склеивания</b> строк (1230).', 'Given strings <code>a = "12"</code> and <code>b = "30"</code>, print their <b>numeric sum</b> (42), then the result of <b>concatenating</b> them (1230).'),
        how: [L('<code>int(a) + int(b)</code> — сума чисел.', '<code>int(a) + int(b)</code> — сумма чисел.', '<code>int(a) + int(b)</code> — numeric sum.'), L('<code>a + b</code> — склеювання.', '<code>a + b</code> — склеивание.', '<code>a + b</code> — concatenation.')],
        starter: 'a = "12"\nb = "30"\n',
        solution: 'a = "12"\nb = "30"\nprint(int(a) + int(b))\nprint(a + b)',
        hint: L('Перетвори рядки на числа через <code>int()</code> тільки для першого print.', 'Преобразуй строки в числа через <code>int()</code> только для первого print.', 'Convert with <code>int()</code> only for the first print.'),
        expected: '42\n1230',
        must: /int\s*\(/
      },
      quiz: { q: L('Що виведе <code>print(str(5) * 2)</code>?', 'Что выведет <code>print(str(5) * 2)</code>?', 'What does <code>print(str(5) * 2)</code> print?'), options: ['10', '55', 'Error'], answer: 1, explain: L('Рядок <code>"5"</code>, повторений двічі.', 'Строка <code>"5"</code>, повторённая дважды.', 'The string <code>"5"</code> repeated twice.') },
      ref: [{ code: 'type(x)', d: L('тип значення', 'тип значения', 'value type') }, { code: 'int() str() float()', d: L('перетворення типів', 'преобразование типов', 'type conversion') }]
    },
    {
      id: 'input', chapter: CH1,
      title: L('Введення: input()', 'Ввод: input()', 'Input: input()'),
      theory: L(
        `<p>Функція <code>input()</code> чекає, поки користувач щось введе, і <b>повертає</b> введений текст. Зазвичай результат зберігають у змінну:</p>
<pre class="inline-code">name = input("What is your name? ")
print("Hi,", name)</pre>
<p>Текст у дужках — підказка, яку побачить користувач.</p>
<p><b>Важливо:</b> <code>input()</code> завжди повертає <b>рядок</b>, навіть якщо ввели цифри. Щоб рахувати, перетвори: <code>age = int(input())</code>.</p>
<div class="tip">💡 У Codry, коли запускаєш код з <code>input()</code>, браузер покаже віконце для введення. У завданнях вхідні дані підставляються автоматично — так перевіряються справжні програми.</div>`,
        `<p>Функция <code>input()</code> ждёт, пока пользователь что-то введёт, и <b>возвращает</b> введённый текст. Обычно результат сохраняют в переменную:</p>
<pre class="inline-code">name = input("What is your name? ")
print("Hi,", name)</pre>
<p>Текст в скобках — подсказка, которую увидит пользователь.</p>
<p><b>Важно:</b> <code>input()</code> всегда возвращает <b>строку</b>, даже если ввели цифры. Чтобы считать, преобразуй: <code>age = int(input())</code>.</p>
<div class="tip">💡 В Codry, когда запускаешь код с <code>input()</code>, браузер покажет окошко для ввода. В заданиях входные данные подставляются автоматически — так проверяются настоящие программы.</div>`,
        `<p><code>input()</code> waits for the user to type something and <b>returns</b> the text. Usually you store it in a variable:</p>
<pre class="inline-code">name = input("What is your name? ")
print("Hi,", name)</pre>
<p>The text in parentheses is a prompt shown to the user.</p>
<p><b>Important:</b> <code>input()</code> always returns a <b>string</b>, even if digits were typed. To do maths, convert it: <code>age = int(input())</code>.</p>
<div class="tip">💡 In Codry, running code with <code>input()</code> shows a browser input box. In tasks the input is supplied automatically — that’s how real programs are tested.</div>`),
      why: L(`<p>Чому завжди рядок? З клавіатури приходять лише символи. <code>"25"</code> може бути віком, номером квартири чи паролем — тільки ти знаєш, як це трактувати, тому перетворення лишається за тобою.</p>`,
        `<p>Почему всегда строка? С клавиатуры приходят только символы. <code>"25"</code> может быть возрастом, номером квартиры или паролем — только ты знаешь, как это трактовать, поэтому преобразование остаётся за тобой.</p>`,
        `<p>Why always a string? A keyboard only sends characters. <code>"25"</code> could be an age, a flat number or a password — only you know how to treat it, so conversion is up to you.</p>`),
      mistakes: L(`<ul><li><code>age = input()</code>, потім <code>age + 1</code> → <code>TypeError</code>. Потрібно <code>int(input())</code>.</li><li>Забути зберегти результат: <code>input()</code> без змінної — введене значення загубиться.</li></ul>`,
        `<ul><li><code>age = input()</code>, затем <code>age + 1</code> → <code>TypeError</code>. Нужно <code>int(input())</code>.</li><li>Забыть сохранить результат: <code>input()</code> без переменной — введённое значение потеряется.</li></ul>`,
        `<ul><li><code>age = input()</code> then <code>age + 1</code> → <code>TypeError</code>. You need <code>int(input())</code>.</li><li>Forgetting to store the result: <code>input()</code> without a variable loses the value.</li></ul>`),
      examples: [
        { title: L('Привітання', 'Приветствие', 'Greeting'), code: 'name = input("Your name: ")\nprint("Nice to meet you,", name)', note: L('Запусти й введи своє ім’я у віконці.', 'Запусти и введи своё имя в окошке.', 'Run it and type your name in the box.') },
        { title: L('Вік через рік', 'Возраст через год', 'Age next year'), code: 'age = int(input("Age: "))\nprint("Next year you will be", age + 1)', note: L('<code>int()</code> одразу перетворює введений рядок на число.', '<code>int()</code> сразу превращает введённую строку в число.', '<code>int()</code> converts the typed string right away.') },
        { title: L('Калькулятор', 'Калькулятор', 'Calculator'), code: 'a = float(input("First number: "))\nb = float(input("Second number: "))\nprint("Sum:", a + b)\nprint("Product:", a * b)', note: L('<code>float</code> дозволяє вводити дроби.', '<code>float</code> позволяет вводить дроби.', '<code>float</code> allows decimals.') }
      ],
      task: {
        text: L('Програма отримує два рядки: ціну товару і кількість. Виведи загальну вартість у форматі <code>Total: 150</code>. (Для перевірки вводяться <code>50</code> і <code>3</code>.)', 'Программа получает две строки: цену товара и количество. Выведи общую стоимость в формате <code>Total: 150</code>. (Для проверки вводятся <code>50</code> и <code>3</code>.)', 'The program receives two lines: a price and a quantity. Print the total as <code>Total: 150</code>. (The check inputs <code>50</code> and <code>3</code>.)'),
        how: [L('<code>price = int(input())</code>', '<code>price = int(input())</code>', '<code>price = int(input())</code>'), L('<code>count = int(input())</code>', '<code>count = int(input())</code>', '<code>count = int(input())</code>'), L('Виведи <code>"Total:"</code> і добуток. Не пиши текст-підказку в <code>input()</code>, щоб вивід збігся.', 'Выведи <code>"Total:"</code> и произведение. Не пиши текст-подсказку в <code>input()</code>, чтобы вывод совпал.', 'Print <code>"Total:"</code> and the product. Don’t put a prompt in <code>input()</code> so the output matches.')],
        starter: '',
        stdin: '50\n3',
        solution: 'price = int(input())\ncount = int(input())\nprint("Total:", price * count)',
        hint: L('Не забудь <code>int()</code> навколо кожного <code>input()</code>.', 'Не забудь <code>int()</code> вокруг каждого <code>input()</code>.', 'Remember <code>int()</code> around each <code>input()</code>.'),
        expected: 'Total: 150',
        must: /input\s*\(/
      },
      quiz: { q: L('Який тип повертає <code>input()</code>?', 'Какой тип возвращает <code>input()</code>?', 'What type does <code>input()</code> return?'), options: ['int', 'str', L('залежить від введеного', 'зависит от введённого', 'depends on what was typed')], answer: 1, explain: L('Завжди <code>str</code>.', 'Всегда <code>str</code>.', 'Always <code>str</code>.') },
      ref: [{ code: 'x = input("?")', d: L('прочитати рядок', 'прочитать строку', 'read a line') }, { code: 'int(input())', d: L('прочитати число', 'прочитать число', 'read a number') }]
    },
    {
      id: 'fstrings', chapter: CH1,
      title: L('f-рядки та форматування', 'f-строки и форматирование', 'f-strings and formatting'),
      theory: L(
        `<p>Найзручніший спосіб вставити значення в текст — <b>f-рядок</b>. Перед лапками пишемо <code>f</code>, а змінні та вирази — у фігурних дужках:</p>
<pre class="inline-code">name = "Ira"
age = 14
print(f"{name} is {age} years old")</pre>
<p>Усередині <code>{}</code> може бути будь-який вираз: <code>{age + 1}</code>, <code>{price * 2}</code>.</p>
<h4>Формат чисел</h4>
<ul><li><code>{x:.2f}</code> — 2 знаки після крапки: <code>3.14</code></li><li><code>{x:,}</code> — розділювач тисяч: <code>1,000,000</code></li><li><code>{x:>5}</code> — вирівняти праворуч на 5 символів</li><li><code>{x:%}</code> — відсотки</li></ul>`,
        `<p>Самый удобный способ вставить значение в текст — <b>f-строка</b>. Перед кавычками пишем <code>f</code>, а переменные и выражения — в фигурных скобках:</p>
<pre class="inline-code">name = "Ira"
age = 14
print(f"{name} is {age} years old")</pre>
<p>Внутри <code>{}</code> может быть любое выражение: <code>{age + 1}</code>, <code>{price * 2}</code>.</p>
<h4>Формат чисел</h4>
<ul><li><code>{x:.2f}</code> — 2 знака после точки: <code>3.14</code></li><li><code>{x:,}</code> — разделитель тысяч: <code>1,000,000</code></li><li><code>{x:>5}</code> — выровнять вправо на 5 символов</li><li><code>{x:%}</code> — проценты</li></ul>`,
        `<p>The handiest way to put values into text is an <b>f-string</b>. Write <code>f</code> before the quotes and put variables and expressions in curly braces:</p>
<pre class="inline-code">name = "Ira"
age = 14
print(f"{name} is {age} years old")</pre>
<p>Any expression can go inside <code>{}</code>: <code>{age + 1}</code>, <code>{price * 2}</code>.</p>
<h4>Number formatting</h4>
<ul><li><code>{x:.2f}</code> — 2 decimal places: <code>3.14</code></li><li><code>{x:,}</code> — thousands separator: <code>1,000,000</code></li><li><code>{x:>5}</code> — right-align in 5 characters</li><li><code>{x:%}</code> — percentage</li></ul>`),
      why: L(`<p>Порівняй: <code>"Hi, " + name + "! You are " + str(age)</code> і <code>f"Hi, {name}! You are {age}"</code>. f-рядок коротший, не потребує <code>str()</code> і одразу видно, як виглядатиме результат.</p>`,
        `<p>Сравни: <code>"Hi, " + name + "! You are " + str(age)</code> и <code>f"Hi, {name}! You are {age}"</code>. f-строка короче, не требует <code>str()</code> и сразу видно, как будет выглядеть результат.</p>`,
        `<p>Compare <code>"Hi, " + name + "! You are " + str(age)</code> with <code>f"Hi, {name}! You are {age}"</code>. The f-string is shorter, needs no <code>str()</code> and shows exactly what the result looks like.</p>`),
      mistakes: L(`<ul><li>Забули <code>f</code> перед лапками — виведеться буквально <code>{name}</code>.</li><li>Круглі дужки замість фігурних: <code>f"(name)"</code>.</li></ul>`,
        `<ul><li>Забыли <code>f</code> перед кавычками — выведется буквально <code>{name}</code>.</li><li>Круглые скобки вместо фигурных: <code>f"(name)"</code>.</li></ul>`,
        `<ul><li>Forgetting the <code>f</code> — you’ll literally get <code>{name}</code>.</li><li>Round brackets instead of curly ones: <code>f"(name)"</code>.</li></ul>`),
      examples: [
        { title: L('Основи', 'Основы', 'Basics'), code: 'name = "Max"\nage = 13\nprint(f"My name is {name}, I am {age}")\nprint(f"In 5 years: {age + 5}")', note: L('Вирази обчислюються прямо в рядку.', 'Выражения вычисляются прямо в строке.', 'Expressions are evaluated inside the string.') },
        { title: L('Дробові числа', 'Дробные числа', 'Decimals'), code: 'pi = 3.14159265\nprint(f"{pi:.2f}")\nprint(f"{pi:.4f}")\nprice = 19.5\nprint(f"Price: {price:.2f} UAH")', note: L('<code>.2f</code> — два знаки після крапки з округленням.', '<code>.2f</code> — два знака после точки с округлением.', '<code>.2f</code> — two decimals with rounding.') },
        { title: L('Таблиця', 'Таблица', 'Table'), code: 'print(f"{\'Item\':<10}{\'Price\':>8}")\nprint(f"{\'Apple\':<10}{12.5:>8.2f}")\nprint(f"{\'Melon\':<10}{80:>8.2f}")', note: L('<code>&lt;</code> — ліворуч, <code>&gt;</code> — праворуч, число — ширина.', '<code>&lt;</code> — влево, <code>&gt;</code> — вправо, число — ширина.', '<code>&lt;</code> left, <code>&gt;</code> right, the number is the width.') },
        { title: L('Великі числа', 'Большие числа', 'Big numbers'), code: 'population = 41000000\nprint(f"{population:,}")\nratio = 0.875\nprint(f"{ratio:.1%}")', note: L('Кома розділяє тисячі, <code>%</code> множить на 100.', 'Запятая разделяет тысячи, <code>%</code> умножает на 100.', 'The comma separates thousands, <code>%</code> multiplies by 100.') }
      ],
      task: {
        text: L('Є <code>item = "Pizza"</code>, <code>price = 189.5</code>, <code>count = 2</code>. Виведи f-рядком: <code>2 x Pizza = 379.00 UAH</code> (сума з двома знаками після крапки).', 'Есть <code>item = "Pizza"</code>, <code>price = 189.5</code>, <code>count = 2</code>. Выведи f-строкой: <code>2 x Pizza = 379.00 UAH</code> (сумма с двумя знаками после точки).', 'Given <code>item = "Pizza"</code>, <code>price = 189.5</code>, <code>count = 2</code>, print with an f-string: <code>2 x Pizza = 379.00 UAH</code> (total with two decimals).'),
        how: [L('Починай з <code>print(f"...")</code>.', 'Начинай с <code>print(f"...")</code>.', 'Start with <code>print(f"...")</code>.'), L('Суму рахуй усередині дужок: <code>{price * count:.2f}</code>.', 'Сумму считай внутри скобок: <code>{price * count:.2f}</code>.', 'Compute the total inside braces: <code>{price * count:.2f}</code>.')],
        starter: 'item = "Pizza"\nprice = 189.5\ncount = 2\n',
        solution: 'item = "Pizza"\nprice = 189.5\ncount = 2\nprint(f"{count} x {item} = {price * count:.2f} UAH")',
        hint: L('<code>f"{count} x {item} = {price * count:.2f} UAH"</code>', '<code>f"{count} x {item} = {price * count:.2f} UAH"</code>', '<code>f"{count} x {item} = {price * count:.2f} UAH"</code>'),
        expected: '2 x Pizza = 379.00 UAH',
        must: /f["']/
      },
      quiz: { q: L('Що виведе <code>print(f"{7/2:.1f}")</code>?', 'Что выведет <code>print(f"{7/2:.1f}")</code>?', 'What does <code>print(f"{7/2:.1f}")</code> print?'), options: ['3', '3.5', '3.50'], answer: 1, explain: L('Один знак після крапки.', 'Один знак после точки.', 'One decimal place.') },
      ref: [{ code: 'f"{x}"', d: L('вставити значення', 'вставить значение', 'insert a value') }, { code: 'f"{x:.2f}"', d: L('2 знаки після крапки', '2 знака после точки', '2 decimals') }]
    },
    {
      id: 'bool', chapter: CH2,
      title: L('Порівняння та True/False', 'Сравнения и True/False', 'Comparisons and True/False'),
      theory: L(
        `<p>Програми постійно ставлять запитання: «гравець має достатньо монет?», «пароль правильний?». Відповідь — <b>логічне значення</b> типу <code>bool</code>: <code>True</code> (так) або <code>False</code> (ні).</p>
<p>Оператори порівняння:</p>
<table class="mini"><tr><td><code>==</code></td><td>дорівнює</td><td><code>5 == 5</code> → True</td></tr><tr><td><code>!=</code></td><td>не дорівнює</td><td><code>5 != 3</code> → True</td></tr><tr><td><code>&gt; &lt;</code></td><td>більше, менше</td><td><code>2 &gt; 7</code> → False</td></tr><tr><td><code>&gt;= &lt;=</code></td><td>більше/менше або дорівнює</td><td><code>3 &lt;= 3</code> → True</td></tr></table>
<p>Рядки теж можна порівнювати: <code>"cat" == "cat"</code> → True. Python навіть вміє ланцюжки: <code>0 &lt; x &lt; 10</code>.</p>
<p>Результат порівняння можна зберегти у змінну: <code>is_adult = age &gt;= 18</code>.</p>`,
        `<p>Программы постоянно задают вопросы: «у игрока достаточно монет?», «пароль правильный?». Ответ — <b>логическое значение</b> типа <code>bool</code>: <code>True</code> (да) или <code>False</code> (нет).</p>
<p>Операторы сравнения:</p>
<table class="mini"><tr><td><code>==</code></td><td>равно</td><td><code>5 == 5</code> → True</td></tr><tr><td><code>!=</code></td><td>не равно</td><td><code>5 != 3</code> → True</td></tr><tr><td><code>&gt; &lt;</code></td><td>больше, меньше</td><td><code>2 &gt; 7</code> → False</td></tr><tr><td><code>&gt;= &lt;=</code></td><td>больше/меньше или равно</td><td><code>3 &lt;= 3</code> → True</td></tr></table>
<p>Строки тоже можно сравнивать: <code>"cat" == "cat"</code> → True. Python даже умеет цепочки: <code>0 &lt; x &lt; 10</code>.</p>
<p>Результат сравнения можно сохранить в переменную: <code>is_adult = age &gt;= 18</code>.</p>`,
        `<p>Programs constantly ask questions: “does the player have enough coins?”, “is the password correct?”. The answer is a <b>boolean</b> value of type <code>bool</code>: <code>True</code> or <code>False</code>.</p>
<p>Comparison operators:</p>
<table class="mini"><tr><td><code>==</code></td><td>equal</td><td><code>5 == 5</code> → True</td></tr><tr><td><code>!=</code></td><td>not equal</td><td><code>5 != 3</code> → True</td></tr><tr><td><code>&gt; &lt;</code></td><td>greater, less</td><td><code>2 &gt; 7</code> → False</td></tr><tr><td><code>&gt;= &lt;=</code></td><td>greater/less or equal</td><td><code>3 &lt;= 3</code> → True</td></tr></table>
<p>Strings can be compared too: <code>"cat" == "cat"</code> → True. Python even supports chains: <code>0 &lt; x &lt; 10</code>.</p>
<p>You can store a comparison in a variable: <code>is_adult = age &gt;= 18</code>.</p>`),
      why: L(`<p>Чому <code>==</code>, а не <code>=</code>? Бо одинарний <code>=</code> уже зайнятий присвоєнням. Подвійний — це запитання «чи рівні?», одинарний — команда «поклади».</p>`,
        `<p>Почему <code>==</code>, а не <code>=</code>? Потому что одинарный <code>=</code> уже занят присваиванием. Двойной — это вопрос «равны ли?», одинарный — команда «положи».</p>`,
        `<p>Why <code>==</code> and not <code>=</code>? Because a single <code>=</code> is already taken by assignment. Double is the question “are they equal?”, single is the command “store this”.</p>`),
      mistakes: L(`<ul><li><code>if x = 5:</code> — тут потрібен <code>==</code>.</li><li><code>"5" == 5</code> → False: рядок і число — різні значення.</li><li><code>"Cat" == "cat"</code> → False: регістр важливий.</li></ul>`,
        `<ul><li><code>if x = 5:</code> — здесь нужен <code>==</code>.</li><li><code>"5" == 5</code> → False: строка и число — разные значения.</li><li><code>"Cat" == "cat"</code> → False: регистр важен.</li></ul>`,
        `<ul><li><code>if x = 5:</code> — you need <code>==</code> here.</li><li><code>"5" == 5</code> → False: a string and a number differ.</li><li><code>"Cat" == "cat"</code> → False: case matters.</li></ul>`),
      examples: [
        { title: L('Порівняння', 'Сравнения', 'Comparisons'), code: 'print(5 > 3)\nprint(5 == 3)\nprint(5 != 3)\nprint(3 <= 3)\nprint(10 / 2 == 5)', note: L('Кожне порівняння дає True або False.', 'Каждое сравнение даёт True или False.', 'Every comparison yields True or False.') },
        { title: L('У змінній', 'В переменной', 'In a variable'), code: 'age = 16\nis_adult = age >= 18\nprint(is_adult)\nprint(type(is_adult))', note: L('Результат порівняння — звичайне значення.', 'Результат сравнения — обычное значение.', 'A comparison result is an ordinary value.') },
        { title: L('Рядки', 'Строки', 'Strings'), code: 'password = "qwerty"\nprint(password == "qwerty")\nprint(password == "Qwerty")\nprint("apple" < "banana")\nprint("5" == 5)', note: L('Рядки порівнюються посимвольно, як у словнику.', 'Строки сравниваются посимвольно, как в словаре.', 'Strings compare character by character, like in a dictionary.') },
        { title: L('Ланцюжок', 'Цепочка', 'Chain'), code: 'temp = 22\nprint(18 <= temp <= 25)\nx = 15\nprint(0 < x < 10)', note: L('Перевірка «між» в один вираз.', 'Проверка «между» в одно выражение.', 'A “between” check in one expression.') }
      ],
      task: {
        text: L('Є <code>score = 73</code> і <code>record = 80</code>. Виведи три рядки (True/False): чи <code>score</code> більший за рекорд, чи він не дорівнює рекорду, чи він у межах від 50 до 100 включно.', 'Есть <code>score = 73</code> и <code>record = 80</code>. Выведи три строки (True/False): больше ли <code>score</code> рекорда, не равен ли он рекорду, находится ли он в пределах от 50 до 100 включительно.', 'Given <code>score = 73</code> and <code>record = 80</code>, print three lines (True/False): is <code>score</code> greater than the record, is it not equal to the record, is it between 50 and 100 inclusive.'),
        how: [L('<code>print(score &gt; record)</code>', '<code>print(score &gt; record)</code>', '<code>print(score &gt; record)</code>'), L('<code>print(score != record)</code>', '<code>print(score != record)</code>', '<code>print(score != record)</code>'), L('Ланцюжок <code>50 &lt;= score &lt;= 100</code>.', 'Цепочка <code>50 &lt;= score &lt;= 100</code>.', 'Chain <code>50 &lt;= score &lt;= 100</code>.')],
        starter: 'score = 73\nrecord = 80\n',
        solution: 'score = 73\nrecord = 80\nprint(score > record)\nprint(score != record)\nprint(50 <= score <= 100)',
        hint: L('Відповідь: False, True, True.', 'Ответ: False, True, True.', 'The answer is False, True, True.'),
        expected: 'False\nTrue\nTrue',
        must: /score\s*>\s*record[\s\S]*!=/
      },
      quiz: { q: L('Що поверне <code>10 == "10"</code>?', 'Что вернёт <code>10 == "10"</code>?', 'What does <code>10 == "10"</code> return?'), options: ['True', 'False', 'Error'], answer: 1, explain: L('Число не дорівнює рядку.', 'Число не равно строке.', 'A number never equals a string.') },
      ref: [{ code: '== != > < >= <=', d: L('порівняння', 'сравнения', 'comparisons') }, { code: 'True / False', d: L('логічні значення', 'логические значения', 'booleans') }]
    },
    {
      id: 'if-else', chapter: CH2,
      title: L('Умови: if і else', 'Условия: if и else', 'Conditions: if and else'),
      theory: L(
        `<p>Інструкція <code>if</code> виконує блок коду, <b>тільки якщо</b> умова істинна:</p>
<pre class="inline-code">if coins >= 50:
    print("You can buy the sword")
else:
    print("Not enough coins")</pre>
<p>Будова: <code>if</code>, умова, <b>двокрапка</b>. Код усередині пишуть з <b>відступом у 4 пробіли</b> — так Python розуміє, що він належить до <code>if</code>. Блок <code>else</code> («інакше») виконується, коли умова хибна. Він необов’язковий.</p>
<p>Код після блоку (без відступу) виконується завжди.</p>`,
        `<p>Инструкция <code>if</code> выполняет блок кода, <b>только если</b> условие истинно:</p>
<pre class="inline-code">if coins >= 50:
    print("You can buy the sword")
else:
    print("Not enough coins")</pre>
<p>Устройство: <code>if</code>, условие, <b>двоеточие</b>. Код внутри пишут с <b>отступом в 4 пробела</b> — так Python понимает, что он относится к <code>if</code>. Блок <code>else</code> («иначе») выполняется, когда условие ложно. Он необязателен.</p>
<p>Код после блока (без отступа) выполняется всегда.</p>`,
        `<p>The <code>if</code> statement runs a block of code <b>only if</b> the condition is true:</p>
<pre class="inline-code">if coins >= 50:
    print("You can buy the sword")
else:
    print("Not enough coins")</pre>
<p>Structure: <code>if</code>, condition, <b>colon</b>. Code inside is indented by <b>4 spaces</b> — that’s how Python knows it belongs to the <code>if</code>. The <code>else</code> block runs when the condition is false. It’s optional.</p>
<p>Code after the block (no indent) always runs.</p>`),
      why: L(`<p>Чому відступи, а не дужки, як в інших мовах? Автор Python вирішив: якщо програмісти й так роблять відступи для читабельності, нехай вони мають сенс. Тому код Python завжди виглядає охайно — інакше він просто не запуститься.</p>`,
        `<p>Почему отступы, а не скобки, как в других языках? Автор Python решил: раз программисты и так делают отступы для читаемости, пусть они имеют смысл. Поэтому код Python всегда выглядит аккуратно — иначе он просто не запустится.</p>`,
        `<p>Why indentation instead of braces like other languages? Python’s author decided: programmers indent for readability anyway, so let indentation carry meaning. That’s why Python code always looks tidy — otherwise it won’t run.</p>`),
      mistakes: L(`<ul><li>Забута двокрапка після умови → <code>SyntaxError</code>.</li><li>Немає відступу в блоці → <code>IndentationError</code>.</li><li>Змішування табуляцій і пробілів — обирай щось одне (Tab у Codry ставить 4 пробіли).</li></ul>`,
        `<ul><li>Забытое двоеточие после условия → <code>SyntaxError</code>.</li><li>Нет отступа в блоке → <code>IndentationError</code>.</li><li>Смешивание табуляций и пробелов — выбирай что-то одно (Tab в Codry ставит 4 пробела).</li></ul>`,
        `<ul><li>Missing colon after the condition → <code>SyntaxError</code>.</li><li>No indentation in the block → <code>IndentationError</code>.</li><li>Mixing tabs and spaces — pick one (Tab in Codry inserts 4 spaces).</li></ul>`),
      examples: [
        { title: L('Простий if', 'Простой if', 'Simple if'), code: 'temp = 30\nif temp > 25:\n    print("It is hot")\n    print("Take water")\nprint("Have a nice day")', note: L('Два рядки з відступом — частина if. Останній виконується завжди.', 'Две строки с отступом — часть if. Последняя выполняется всегда.', 'The two indented lines belong to the if. The last one always runs.') },
        { title: 'if / else', code: 'age = 16\nif age >= 18:\n    print("Access granted")\nelse:\n    print("Too young")', note: L('Зміни <code>age</code> на 20 і запусти знову.', 'Измени <code>age</code> на 20 и запусти снова.', 'Change <code>age</code> to 20 and run again.') },
        { title: L('Парне / непарне', 'Чётное / нечётное', 'Even / odd'), code: 'n = 7\nif n % 2 == 0:\n    print(n, "is even")\nelse:\n    print(n, "is odd")', note: L('Класична перевірка через остачу.', 'Классическая проверка через остаток.', 'The classic remainder check.') },
        { title: L('Пароль', 'Пароль', 'Password'), code: 'password = input("Password: ")\nif password == "codry123":\n    print("Welcome!")\nelse:\n    print("Wrong password")', note: L('Умова з введеними даними.', 'Условие с введёнными данными.', 'A condition with user input.') }
      ],
      task: {
        text: L('Програма отримує число (тест вводить <code>-4</code>). Якщо воно від’ємне — виведи <code>negative</code>, інакше — <code>not negative</code>. У кінці завжди виведи <code>done</code>.', 'Программа получает число (тест вводит <code>-4</code>). Если оно отрицательное — выведи <code>negative</code>, иначе — <code>not negative</code>. В конце всегда выведи <code>done</code>.', 'The program reads a number (the test enters <code>-4</code>). If it’s negative print <code>negative</code>, otherwise <code>not negative</code>. Always print <code>done</code> at the end.'),
        how: [L('<code>n = int(input())</code>', '<code>n = int(input())</code>', '<code>n = int(input())</code>'), L('<code>if n &lt; 0:</code> з відступом і <code>else:</code>.', '<code>if n &lt; 0:</code> с отступом и <code>else:</code>.', '<code>if n &lt; 0:</code> with indentation and <code>else:</code>.'), L('<code>print("done")</code> — без відступу.', '<code>print("done")</code> — без отступа.', '<code>print("done")</code> — without indentation.')],
        starter: '',
        stdin: '-4',
        solution: 'n = int(input())\nif n < 0:\n    print("negative")\nelse:\n    print("not negative")\nprint("done")',
        hint: L('Останній print має бути на рівні <code>if</code>, а не всередині блоку.', 'Последний print должен быть на уровне <code>if</code>, а не внутри блока.', 'The last print must be at the level of <code>if</code>, not inside the block.'),
        expected: 'negative\ndone',
        must: /if[\s\S]*else/
      },
      quiz: { q: L('Скільки пробілів відступу прийнято в Python?', 'Сколько пробелов отступа принято в Python?', 'How many spaces of indentation are standard in Python?'), options: ['2', '4', '8'], answer: 1, explain: L('Стандарт PEP 8 — 4 пробіли.', 'Стандарт PEP 8 — 4 пробела.', 'The PEP 8 standard is 4 spaces.') },
      ref: [{ code: 'if cond:\\n    ...', d: L('умова', 'условие', 'condition') }, { code: 'else:', d: L('інакше', 'иначе', 'otherwise') }]
    },
    {
      id: 'elif', chapter: CH2,
      title: L('Кілька варіантів: elif', 'Несколько вариантов: elif', 'Several options: elif'),
      theory: L(
        `<p>Коли варіантів більше двох, використовують <code>elif</code> (скорочення від <i>else if</i> — «інакше, якщо»):</p>
<pre class="inline-code">if score >= 90:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 50:
    grade = "C"
else:
    grade = "F"</pre>
<p>Python перевіряє умови <b>згори вниз</b> і виконує <b>лише перший</b> блок, умова якого істинна. Решту пропускає.</p>
<p>Умови можна також <b>вкладати</b> — ставити <code>if</code> усередину іншого <code>if</code> з додатковим відступом.</p>`,
        `<p>Когда вариантов больше двух, используют <code>elif</code> (сокращение от <i>else if</i> — «иначе, если»):</p>
<pre class="inline-code">if score >= 90:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 50:
    grade = "C"
else:
    grade = "F"</pre>
<p>Python проверяет условия <b>сверху вниз</b> и выполняет <b>только первый</b> блок, условие которого истинно. Остальные пропускает.</p>
<p>Условия можно также <b>вкладывать</b> — ставить <code>if</code> внутрь другого <code>if</code> с дополнительным отступом.</p>`,
        `<p>When there are more than two options, use <code>elif</code> (short for <i>else if</i>):</p>
<pre class="inline-code">if score >= 90:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 50:
    grade = "C"
else:
    grade = "F"</pre>
<p>Python checks conditions <b>top to bottom</b> and runs <b>only the first</b> block whose condition is true. The rest are skipped.</p>
<p>Conditions can also be <b>nested</b> — an <code>if</code> inside another <code>if</code> with extra indentation.</p>`),
      why: L(`<p>Чому порядок важливий? Якщо спершу перевірити <code>score &gt;= 50</code>, то й 95 балів отримають «C», бо ця умова теж істинна. Тому від найсуворішої умови йдуть до найм’якшої.</p>`,
        `<p>Почему порядок важен? Если сначала проверить <code>score &gt;= 50</code>, то и 95 баллов получат «C», ведь это условие тоже истинно. Поэтому от самого строгого условия идут к самому мягкому.</p>`,
        `<p>Why does order matter? If you check <code>score &gt;= 50</code> first, even 95 points would get a “C” because that condition is also true. So go from the strictest condition to the loosest.</p>`),
      mistakes: L(`<ul><li>Кілька окремих <code>if</code> замість <code>elif</code> — тоді можуть спрацювати кілька блоків.</li><li><code>else</code> з умовою: <code>else x &gt; 5:</code> — у <code>else</code> умови немає.</li></ul>`,
        `<ul><li>Несколько отдельных <code>if</code> вместо <code>elif</code> — тогда могут сработать несколько блоков.</li><li><code>else</code> с условием: <code>else x &gt; 5:</code> — у <code>else</code> условия нет.</li></ul>`,
        `<ul><li>Several separate <code>if</code>s instead of <code>elif</code> — several blocks may run.</li><li><code>else</code> with a condition: <code>else x &gt; 5:</code> — <code>else</code> has no condition.</li></ul>`),
      examples: [
        { title: L('Оцінки', 'Оценки', 'Grades'), code: 'score = 78\nif score >= 90:\n    print("Excellent")\nelif score >= 70:\n    print("Good")\nelif score >= 50:\n    print("OK")\nelse:\n    print("Try again")', note: L('Спрацює лише «Good».', 'Сработает только «Good».', 'Only “Good” runs.') },
        { title: L('Світлофор', 'Светофор', 'Traffic light'), code: 'light = "yellow"\nif light == "green":\n    print("Go")\nelif light == "yellow":\n    print("Get ready")\nelif light == "red":\n    print("Stop")\nelse:\n    print("Unknown signal")', note: L('Порівняння рядків в elif.', 'Сравнение строк в elif.', 'String comparisons in elif.') },
        { title: L('Вкладені умови', 'Вложенные условия', 'Nested conditions'), code: 'age = 15\nhas_ticket = True\nif has_ticket:\n    if age >= 12:\n        print("Enjoy the movie")\n    else:\n        print("Need an adult")\nelse:\n    print("Buy a ticket first")', note: L('Внутрішній if перевіряється лише при наявності квитка.', 'Внутренний if проверяется только при наличии билета.', 'The inner if is checked only if there is a ticket.') },
        { title: L('Чому elif', 'Почему elif', 'Why elif'), code: 'x = 95\n# with separate ifs:\nif x >= 50:\n    print("C")\nif x >= 90:\n    print("A")\n# with elif:\nif x >= 90:\n    print("A")\nelif x >= 50:\n    print("C")', note: L('Окремі if спрацювали обидва — це помилка логіки.', 'Отдельные if сработали оба — это ошибка логики.', 'Both separate ifs fired — a logic bug.') }
      ],
      task: {
        text: L('Програма отримує температуру (тест: <code>12</code>). Виведи: <code>cold</code>, якщо нижче 0; <code>cool</code> — від 0 до 15 включно; <code>warm</code> — від 16 до 25; <code>hot</code> — вище 25.', 'Программа получает температуру (тест: <code>12</code>). Выведи: <code>cold</code>, если ниже 0; <code>cool</code> — от 0 до 15 включительно; <code>warm</code> — от 16 до 25; <code>hot</code> — выше 25.', 'The program reads a temperature (test: <code>12</code>). Print <code>cold</code> if below 0; <code>cool</code> for 0 to 15 inclusive; <code>warm</code> for 16 to 25; <code>hot</code> above 25.'),
        how: [L('Прочитай число через <code>int(input())</code>.', 'Прочитай число через <code>int(input())</code>.', 'Read a number with <code>int(input())</code>.'), L('<code>if t &lt; 0</code> → <code>elif t &lt;= 15</code> → <code>elif t &lt;= 25</code> → <code>else</code>.', '<code>if t &lt; 0</code> → <code>elif t &lt;= 15</code> → <code>elif t &lt;= 25</code> → <code>else</code>.', '<code>if t &lt; 0</code> → <code>elif t &lt;= 15</code> → <code>elif t &lt;= 25</code> → <code>else</code>.')],
        starter: '',
        stdin: '12',
        solution: 't = int(input())\nif t < 0:\n    print("cold")\nelif t <= 15:\n    print("cool")\nelif t <= 25:\n    print("warm")\nelse:\n    print("hot")',
        hint: L('Завдяки порядку в elif достатньо перевіряти лише верхню межу.', 'Благодаря порядку в elif достаточно проверять только верхнюю границу.', 'Thanks to elif order you only need to check the upper bound.'),
        expected: 'cool',
        must: /elif[\s\S]*elif[\s\S]*else/
      },
      quiz: { q: L('Скільки блоків максимум виконається в ланцюжку if/elif/else?', 'Сколько блоков максимум выполнится в цепочке if/elif/else?', 'At most how many blocks run in an if/elif/else chain?'), options: ['1', '2', L('усі істинні', 'все истинные', 'all true ones')], answer: 0, explain: L('Лише перший з істинною умовою.', 'Только первый с истинным условием.', 'Only the first true one.') },
      ref: [{ code: 'elif cond:', d: L('інакше, якщо', 'иначе, если', 'else if') }]
    },
    {
      id: 'logic', chapter: CH2,
      title: L('and, or, not', 'and, or, not', 'and, or, not'),
      theory: L(
        `<p>Кілька умов поєднують <b>логічними операторами</b>:</p>
<ul><li><code>and</code> — «і»: True, тільки якщо <b>обидві</b> умови істинні.</li><li><code>or</code> — «або»: True, якщо <b>хоча б одна</b> умова істинна.</li><li><code>not</code> — «не»: перевертає значення (<code>not True</code> → False).</li></ul>
<table class="mini"><tr><th>A</th><th>B</th><th>A and B</th><th>A or B</th></tr><tr><td>True</td><td>True</td><td>True</td><td>True</td></tr><tr><td>True</td><td>False</td><td>False</td><td>True</td></tr><tr><td>False</td><td>False</td><td>False</td><td>False</td></tr></table>
<p>Пріоритет: спершу <code>not</code>, потім <code>and</code>, потім <code>or</code>. Якщо сумніваєшся — став дужки.</p>`,
        `<p>Несколько условий объединяют <b>логическими операторами</b>:</p>
<ul><li><code>and</code> — «и»: True, только если <b>оба</b> условия истинны.</li><li><code>or</code> — «или»: True, если <b>хотя бы одно</b> условие истинно.</li><li><code>not</code> — «не»: переворачивает значение (<code>not True</code> → False).</li></ul>
<table class="mini"><tr><th>A</th><th>B</th><th>A and B</th><th>A or B</th></tr><tr><td>True</td><td>True</td><td>True</td><td>True</td></tr><tr><td>True</td><td>False</td><td>False</td><td>True</td></tr><tr><td>False</td><td>False</td><td>False</td><td>False</td></tr></table>
<p>Приоритет: сначала <code>not</code>, потом <code>and</code>, потом <code>or</code>. Если сомневаешься — ставь скобки.</p>`,
        `<p>Combine several conditions with <b>logical operators</b>:</p>
<ul><li><code>and</code> — True only if <b>both</b> conditions are true.</li><li><code>or</code> — True if <b>at least one</b> is true.</li><li><code>not</code> — flips the value (<code>not True</code> → False).</li></ul>
<table class="mini"><tr><th>A</th><th>B</th><th>A and B</th><th>A or B</th></tr><tr><td>True</td><td>True</td><td>True</td><td>True</td></tr><tr><td>True</td><td>False</td><td>False</td><td>True</td></tr><tr><td>False</td><td>False</td><td>False</td><td>False</td></tr></table>
<p>Precedence: <code>not</code> first, then <code>and</code>, then <code>or</code>. When in doubt, use parentheses.</p>`),
      why: L(`<p>Python «лінивий»: в <code>A and B</code>, якщо A хибне, B навіть не перевіряється — відповідь уже відома. Це зручно: <code>x != 0 and 10 / x &gt; 2</code> ніколи не поділить на нуль.</p>`,
        `<p>Python «ленивый»: в <code>A and B</code>, если A ложно, B даже не проверяется — ответ уже известен. Это удобно: <code>x != 0 and 10 / x &gt; 2</code> никогда не разделит на ноль.</p>`,
        `<p>Python is “lazy”: in <code>A and B</code>, if A is false, B isn’t even checked — the answer is already known. Handy: <code>x != 0 and 10 / x &gt; 2</code> never divides by zero.</p>`),
      mistakes: L(`<ul><li><code>if x == 1 or 2:</code> — завжди True! Правильно: <code>x == 1 or x == 2</code>.</li><li>Писати <code>&amp;&amp;</code> і <code>||</code> як в інших мовах — у Python це <code>and</code> і <code>or</code>.</li></ul>`,
        `<ul><li><code>if x == 1 or 2:</code> — всегда True! Правильно: <code>x == 1 or x == 2</code>.</li><li>Писать <code>&amp;&amp;</code> и <code>||</code> как в других языках — в Python это <code>and</code> и <code>or</code>.</li></ul>`,
        `<ul><li><code>if x == 1 or 2:</code> — always True! Correct: <code>x == 1 or x == 2</code>.</li><li>Writing <code>&amp;&amp;</code> and <code>||</code> like other languages — in Python it’s <code>and</code> and <code>or</code>.</li></ul>`),
      examples: [
        { title: 'and', code: 'age = 15\nhas_ticket = True\nif age >= 12 and has_ticket:\n    print("Welcome to the cinema")', note: L('Обидві умови мають бути виконані.', 'Оба условия должны быть выполнены.', 'Both conditions must hold.') },
        { title: 'or', code: 'day = "Sunday"\nif day == "Saturday" or day == "Sunday":\n    print("Weekend!")\nelse:\n    print("School day")', note: L('Достатньо однієї умови.', 'Достаточно одного условия.', 'One condition is enough.') },
        { title: 'not', code: 'raining = False\nif not raining:\n    print("Let\'s go outside")\nprint(not True, not False)', note: L('<code>not</code> перевертає значення.', '<code>not</code> переворачивает значение.', '<code>not</code> flips the value.') },
        { title: L('Пастка з or', 'Ловушка с or', 'The or trap'), code: 'x = 5\nprint(x == 1 or 2)          # wrong: 2 is truthy\nprint(x == 1 or x == 2)     # correct\nprint(x in (1, 2))          # even shorter', note: L('Ненульове число Python вважає «істинним».', 'Ненулевое число Python считает «истинным».', 'Python treats any non-zero number as “truthy”.') }
      ],
      task: {
        text: L('Рік (тест: <code>2024</code>) — <b>високосний</b>, якщо він ділиться на 4 і не ділиться на 100, <b>або</b> ділиться на 400. Виведи <code>leap</code> або <code>common</code>.', 'Год (тест: <code>2024</code>) — <b>високосный</b>, если он делится на 4 и не делится на 100, <b>или</b> делится на 400. Выведи <code>leap</code> или <code>common</code>.', 'A year (test: <code>2024</code>) is a <b>leap year</b> if it’s divisible by 4 and not by 100, <b>or</b> divisible by 400. Print <code>leap</code> or <code>common</code>.'),
        how: [L('Прочитай рік.', 'Прочитай год.', 'Read the year.'), L('Умова: <code>(y % 4 == 0 and y % 100 != 0) or y % 400 == 0</code>.', 'Условие: <code>(y % 4 == 0 and y % 100 != 0) or y % 400 == 0</code>.', 'Condition: <code>(y % 4 == 0 and y % 100 != 0) or y % 400 == 0</code>.')],
        starter: '',
        stdin: '2024',
        solution: 'y = int(input())\nif (y % 4 == 0 and y % 100 != 0) or y % 400 == 0:\n    print("leap")\nelse:\n    print("common")',
        hint: L('«Ділиться» означає остача <code>== 0</code>.', '«Делится» значит остаток <code>== 0</code>.', '“Divisible” means the remainder is <code>== 0</code>.'),
        expected: 'leap',
        must: /and[\s\S]*or|or[\s\S]*and/
      },
      quiz: { q: L('<code>True or False and False</code> = ?', '<code>True or False and False</code> = ?', '<code>True or False and False</code> = ?'), options: ['True', 'False'], answer: 0, explain: L('Спершу <code>and</code>: False and False = False, потім True or False = True.', 'Сначала <code>and</code>: False and False = False, затем True or False = True.', '<code>and</code> first: False and False = False, then True or False = True.') },
      ref: [{ code: 'a and b', d: L('обидві істинні', 'оба истинны', 'both true') }, { code: 'a or b', d: L('хоча б одна', 'хотя бы одно', 'at least one') }, { code: 'not a', d: L('заперечення', 'отрицание', 'negation') }]
    }
  ]);
})();
