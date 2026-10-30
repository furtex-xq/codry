// Java — курс. Код компілюється та виконується на справжньому OpenJDK 21 (сервер Wandbox).
(function () {
  const L = Codry.L;
  const CH1 = L('Основи Java', 'Основы Java', 'Java basics');
  const CH2 = L('Умови, цикли, масиви, методи', 'Условия, циклы, массивы, методы', 'Conditions, loops, arrays, methods');
  const CH3 = L('Об’єктно-орієнтоване програмування', 'Объектно-ориентированное программирование', 'Object-oriented programming');
  const CH4 = L('Колекції та винятки', 'Коллекции и исключения', 'Collections and exceptions');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');
  // Обгортка main: більшість прикладів — тіло методу main.
  const M = (body, imports) => (imports ? imports + '\n\n' : '') + 'public class Main {\n  public static void main(String[] args) {\n' + body.split('\n').map((l) => (l ? '    ' + l : l)).join('\n') + '\n  }\n}';

  Codry.steps('java', [
    {
      id: 'hello', chapter: CH1,
      title: L('Перша програма: клас і main', 'Первая программа: класс и main', 'First program: class and main'),
      theory: L(
        `<p><b>Java</b> — одна з найпопулярніших мов у світі: на ній написано Minecraft (Java Edition), застосунки Android, банківські системи та сервери великих компаній. Її девіз — «написав раз, запускай будь-де»: програма виконується у віртуальній машині JVM на будь-якому комп’ютері.</p>
<pre class="inline-code">public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
  }
}</pre>
<ul><li>Увесь код у Java живе всередині <b>класу</b> (<code>class Main</code>)</li><li><code>main</code> — точка входу: звідси починається програма</li><li><code>System.out.println(…)</code> — вивести рядок і перейти на новий; <code>System.out.print</code> — без переходу</li><li>Кожна інструкція закінчується <code>;</code>, блоки — у фігурних дужках <code>{ }</code></li></ul>
<p>Коментарі: <code>// рядок</code> і <code>/* блок */</code>.</p>`,
        `<p><b>Java</b> — один из самых популярных языков в мире: на нём написаны Minecraft (Java Edition), приложения Android, банковские системы и серверы крупных компаний. Его девиз — «написал раз, запускай где угодно»: программа выполняется в виртуальной машине JVM на любом компьютере.</p>
<pre class="inline-code">public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
  }
}</pre>
<ul><li>Весь код в Java живёт внутри <b>класса</b> (<code>class Main</code>)</li><li><code>main</code> — точка входа: отсюда начинается программа</li><li><code>System.out.println(…)</code> — вывести строку и перейти на новую; <code>System.out.print</code> — без перехода</li><li>Каждая инструкция заканчивается <code>;</code>, блоки — в фигурных скобках <code>{ }</code></li></ul>
<p>Комментарии: <code>// строка</code> и <code>/* блок */</code>.</p>`,
        `<p><b>Java</b> is one of the world’s most popular languages: Minecraft (Java Edition), Android apps, banking systems and big-company servers are written in it. Its motto is “write once, run anywhere”: programs run inside the JVM virtual machine on any computer.</p>
<pre class="inline-code">public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
  }
}</pre>
<ul><li>All Java code lives inside a <b>class</b> (<code>class Main</code>)</li><li><code>main</code> is the entry point: the program starts here</li><li><code>System.out.println(…)</code> prints a line and moves to a new one; <code>System.out.print</code> doesn’t</li><li>Every statement ends with <code>;</code>, blocks use braces <code>{ }</code></li></ul>
<p>Comments: <code>// line</code> and <code>/* block */</code>.</p>`),
      why: L(`<p>Чому стільки «зайвих» слів заради одного рядка? Java створювали для величезних програм, де працюють сотні людей. Суворі правила (класи, типи, крапки з комою) роблять код передбачуваним: компілятор знаходить помилки <b>до запуску</b>, а не тоді, коли програмою вже користуються мільйони.</p>`,
        `<p>Почему столько «лишних» слов ради одной строки? Java создавали для огромных программ, где работают сотни людей. Строгие правила (классы, типы, точки с запятой) делают код предсказуемым: компилятор находит ошибки <b>до запуска</b>, а не тогда, когда программой уже пользуются миллионы.</p>`,
        `<p>Why so many “extra” words for one line? Java was designed for huge programs worked on by hundreds of people. Strict rules (classes, types, semicolons) make code predictable: the compiler catches mistakes <b>before running</b>, not after millions of people use the program.</p>`),
      mistakes: L(`<ul><li>Забута <code>;</code> — помилка компіляції <code>';' expected</code>.</li><li><code>system.out.println</code> з малої — Java розрізняє великі й малі літери.</li><li>Рядки — лише в подвійних лапках: <code>'Hi'</code> — це помилка (одинарні — для одного символу).</li></ul>`,
        `<ul><li>Забытая <code>;</code> — ошибка компиляции <code>';' expected</code>.</li><li><code>system.out.println</code> с маленькой — Java различает большие и маленькие буквы.</li><li>Строки — только в двойных кавычках: <code>'Hi'</code> — ошибка (одинарные — для одного символа).</li></ul>`,
        `<ul><li>A missing <code>;</code> — compile error <code>';' expected</code>.</li><li><code>system.out.println</code> in lowercase — Java is case-sensitive.</li><li>Strings use double quotes only: <code>'Hi'</code> is an error (single quotes are for one character).</li></ul>`),
      examples: [
        { title: 'println', code: M('System.out.println("Hello, Java!");\nSystem.out.println("I am learning on Codry");'), note: L('Кожен println — новий рядок.', 'Каждый println — новая строка.', 'Each println is a new line.') },
        { title: 'print', code: M('System.out.print("Loading");\nSystem.out.print("...");\nSystem.out.println(" done!");\nSystem.out.println(2 + 3);'), note: L('print не переводить рядок.', 'print не переводит строку.', 'print doesn’t add a newline.') },
        { title: L('Коментарі', 'Комментарии', 'Comments'), code: M('// це коментар — Java його ігнорує\nSystem.out.println("Visible");\n/* багаторядковий\n   коментар */\n// System.out.println("Hidden");'), note: L('Закоментований рядок не виконується.', 'Закомментированная строка не выполняется.', 'A commented-out line doesn’t run.') }
      ],
      task: {
        text: L('Виведи два рядки: <code>Hello, Java!</code> і <code>My first program</code>.', 'Выведи две строки: <code>Hello, Java!</code> и <code>My first program</code>.', 'Print two lines: <code>Hello, Java!</code> and <code>My first program</code>.'),
        how: [L('Усередині <code>main</code> напиши два виклики <code>System.out.println</code>.', 'Внутри <code>main</code> напиши два вызова <code>System.out.println</code>.', 'Inside <code>main</code> write two <code>System.out.println</code> calls.')],
        starter: M('// твій код тут'),
        solution: M('System.out.println("Hello, Java!");\nSystem.out.println("My first program");'),
        hint: L('Не забудь <code>;</code> у кінці кожного рядка.', 'Не забудь <code>;</code> в конце каждой строки.', 'Don’t forget <code>;</code> at the end of each line.'),
        expected: 'Hello, Java!\nMy first program'
      },
      quiz: { q: L('З якого методу починається програма Java?', 'С какого метода начинается программа Java?', 'Which method does a Java program start from?'), options: ['start()', 'main()', 'run()'], answer: 1, explain: L('<code>public static void main(String[] args)</code>.', '<code>public static void main(String[] args)</code>.', '<code>public static void main(String[] args)</code>.') },
      ref: [{ code: 'System.out.println(x);', d: L('вивід з новим рядком', 'вывод с новой строкой', 'print with newline') }, { code: 'public static void main(String[] args)', d: L('точка входу', 'точка входа', 'entry point') }]
    },
    {
      id: 'variables', chapter: CH1,
      title: L('Змінні та типи даних', 'Переменные и типы данных', 'Variables and data types'),
      theory: L(
        `<p>Java — мова зі <b>статичною типізацією</b>: у кожної змінної є тип, і змінити його не можна.</p>
<table class="mini"><tr><td><code>int</code></td><td>ціле число: <code>int age = 14;</code></td></tr><tr><td><code>double</code></td><td>дробове: <code>double price = 9.99;</code></td></tr><tr><td><code>boolean</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>char</code></td><td>один символ: <code>char grade = 'A';</code></td></tr><tr><td><code>String</code></td><td>рядок: <code>String name = "Ira";</code></td></tr><tr><td><code>long</code></td><td>велике ціле: <code>long views = 3_000_000_000L;</code></td></tr></table>
<p>Зміна значення: <code>age = 15;</code>. Константа — <code>final int MAX = 100;</code> (змінити не можна). Слово <code>var</code> дозволяє не писати тип, якщо він очевидний: <code>var score = 10;</code> (тип усе одно <code>int</code>).</p>
<p>Рядки з’єднуються через <code>+</code>: <code>"Age: " + age</code>.</p>`,
        `<p>Java — язык со <b>статической типизацией</b>: у каждой переменной есть тип, и изменить его нельзя.</p>
<table class="mini"><tr><td><code>int</code></td><td>целое число: <code>int age = 14;</code></td></tr><tr><td><code>double</code></td><td>дробное: <code>double price = 9.99;</code></td></tr><tr><td><code>boolean</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>char</code></td><td>один символ: <code>char grade = 'A';</code></td></tr><tr><td><code>String</code></td><td>строка: <code>String name = "Ira";</code></td></tr><tr><td><code>long</code></td><td>большое целое: <code>long views = 3_000_000_000L;</code></td></tr></table>
<p>Изменение значения: <code>age = 15;</code>. Константа — <code>final int MAX = 100;</code> (изменить нельзя). Слово <code>var</code> позволяет не писать тип, если он очевиден: <code>var score = 10;</code> (тип всё равно <code>int</code>).</p>
<p>Строки соединяются через <code>+</code>: <code>"Age: " + age</code>.</p>`,
        `<p>Java is <b>statically typed</b>: every variable has a type that can’t change.</p>
<table class="mini"><tr><td><code>int</code></td><td>integer: <code>int age = 14;</code></td></tr><tr><td><code>double</code></td><td>decimal: <code>double price = 9.99;</code></td></tr><tr><td><code>boolean</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>char</code></td><td>one character: <code>char grade = 'A';</code></td></tr><tr><td><code>String</code></td><td>text: <code>String name = "Ira";</code></td></tr><tr><td><code>long</code></td><td>big integer: <code>long views = 3_000_000_000L;</code></td></tr></table>
<p>Reassign with <code>age = 15;</code>. A constant: <code>final int MAX = 100;</code> (can’t change). <code>var</code> lets you skip an obvious type: <code>var score = 10;</code> (still an <code>int</code>).</p>
<p>Join strings with <code>+</code>: <code>"Age: " + age</code>.</p>`),
      why: L(`<p>Навіщо вказувати тип? Компілятор не дасть випадково покласти текст у змінну для віку чи помножити ім’я на 2. А ще Java знає, скільки пам’яті виділити: <code>int</code> займає 4 байти, <code>long</code> — 8. Тому Java-програми швидкі й надійні.</p>`,
        `<p>Зачем указывать тип? Компилятор не даст случайно положить текст в переменную для возраста или умножить имя на 2. А ещё Java знает, сколько памяти выделить: <code>int</code> занимает 4 байта, <code>long</code> — 8. Поэтому Java-программы быстрые и надёжные.</p>`,
        `<p>Why declare types? The compiler won’t let you accidentally store text in an age variable or multiply a name by 2. Java also knows how much memory to reserve: <code>int</code> is 4 bytes, <code>long</code> 8. That’s why Java programs are fast and reliable.</p>`),
      mistakes: L(`<ul><li><code>int x = 3.5;</code> — помилка: дробове не влазить у ціле без явного перетворення.</li><li><code>String</code> з малої літери — це клас, пишеться з великої.</li><li>Використати змінну до присвоєння значення — помилка компіляції.</li></ul>`,
        `<ul><li><code>int x = 3.5;</code> — ошибка: дробное не помещается в целое без явного преобразования.</li><li><code>String</code> с маленькой буквы — это класс, пишется с большой.</li><li>Использовать переменную до присвоения значения — ошибка компиляции.</li></ul>`,
        `<ul><li><code>int x = 3.5;</code> — error: a decimal doesn’t fit an int without an explicit cast.</li><li><code>String</code> lowercase — it’s a class, capitalised.</li><li>Using a variable before assigning it — compile error.</li></ul>`),
      examples: [
        { title: L('Типи', 'Типы', 'Types'), code: M('int age = 14;\ndouble height = 1.65;\nboolean isStudent = true;\nchar grade = \'A\';\nString name = "Ira";\nSystem.out.println(name + " is " + age);\nSystem.out.println("Height: " + height + ", grade " + grade + ", student: " + isStudent);'), note: L('П’ять основних типів.', 'Пять основных типов.', 'Five basic types.') },
        { title: L('Зміна і final', 'Изменение и final', 'Reassign and final'), code: M('int score = 10;\nscore = score + 5;\nscore += 20;\nfinal int MAX_SCORE = 100;\nSystem.out.println(score + "/" + MAX_SCORE);'), note: L('final — константа.', 'final — константа.', 'final means constant.') },
        { title: 'var', code: M('var city = "Kyiv";\nvar year = 2026;\nvar pi = 3.14;\nSystem.out.println(city + " " + year + " " + pi);'), note: L('Тип виводиться автоматично.', 'Тип выводится автоматически.', 'The type is inferred.') }
      ],
      task: {
        text: L('Створи змінні: <code>String hero = "Steve"</code>, <code>int level = 7</code>, <code>double hp = 18.5</code>, <code>boolean alive = true</code>. Виведи рядок <code>Steve | level 7 | hp 18.5 | alive: true</code>.', 'Создай переменные: <code>String hero = "Steve"</code>, <code>int level = 7</code>, <code>double hp = 18.5</code>, <code>boolean alive = true</code>. Выведи строку <code>Steve | level 7 | hp 18.5 | alive: true</code>.', 'Create variables: <code>String hero = "Steve"</code>, <code>int level = 7</code>, <code>double hp = 18.5</code>, <code>boolean alive = true</code>. Print <code>Steve | level 7 | hp 18.5 | alive: true</code>.'),
        how: [L('Склей частини через <code>+</code>: <code>hero + " | level " + level + …</code>', 'Склей части через <code>+</code>: <code>hero + " | level " + level + …</code>', 'Join parts with <code>+</code>: <code>hero + " | level " + level + …</code>')],
        starter: M('// оголоси змінні\n'),
        solution: M('String hero = "Steve";\nint level = 7;\ndouble hp = 18.5;\nboolean alive = true;\nSystem.out.println(hero + " | level " + level + " | hp " + hp + " | alive: " + alive);'),
        hint: L('Пробіли навколо <code>|</code> — частина рядків.', 'Пробелы вокруг <code>|</code> — часть строк.', 'The spaces around <code>|</code> are part of the strings.'),
        expected: 'Steve | level 7 | hp 18.5 | alive: true',
        must: /int\s+level[\s\S]*double\s+hp[\s\S]*boolean\s+alive/
      },
      quiz: { q: L('Який тип для числа 3.75?', 'Какой тип для числа 3.75?', 'Which type holds 3.75?'), options: ['int', 'double', 'char'], answer: 1, explain: L('double — дробові числа.', 'double — дробные числа.', 'double is for decimals.') },
      ref: [{ code: 'int double boolean char String', d: L('основні типи', 'основные типы', 'basic types') }, { code: 'final int MAX = 10;', d: L('константа', 'константа', 'constant') }]
    },
    {
      id: 'operators', chapter: CH1,
      title: L('Оператори, ділення й перетворення типів', 'Операторы, деление и приведение типов', 'Operators, division and casting'),
      theory: L(
        `<p>Арифметика: <code>+ - * / %</code>. Головна пастка Java — <b>цілочисельне ділення</b>: якщо обидва числа <code>int</code>, результат теж <code>int</code>, а дробова частина відкидається.</p>
<pre class="inline-code">System.out.println(7 / 2);     // 3
System.out.println(7 / 2.0);   // 3.5
System.out.println(7 % 2);     // 1 — остача</pre>
<p><b>Приведення типів</b> (cast): <code>(double) 7 / 2</code> → 3.5, <code>(int) 9.99</code> → 9 (відкидає, а не округлює).</p>
<p>Клас <code>Math</code>: <code>Math.max(a, b)</code>, <code>Math.min</code>, <code>Math.abs</code>, <code>Math.pow(2, 10)</code>, <code>Math.sqrt(16)</code>, <code>Math.round(2.5)</code>.</p>
<p>Скорочення: <code>x++</code>, <code>x--</code>, <code>x += 5</code>, <code>x *= 2</code>. Красивий вивід дробових — <code>String.format("%.2f", x)</code>.</p>`,
        `<p>Арифметика: <code>+ - * / %</code>. Главная ловушка Java — <b>целочисленное деление</b>: если оба числа <code>int</code>, результат тоже <code>int</code>, а дробная часть отбрасывается.</p>
<pre class="inline-code">System.out.println(7 / 2);     // 3
System.out.println(7 / 2.0);   // 3.5
System.out.println(7 % 2);     // 1 — остаток</pre>
<p><b>Приведение типов</b> (cast): <code>(double) 7 / 2</code> → 3.5, <code>(int) 9.99</code> → 9 (отбрасывает, а не округляет).</p>
<p>Класс <code>Math</code>: <code>Math.max(a, b)</code>, <code>Math.min</code>, <code>Math.abs</code>, <code>Math.pow(2, 10)</code>, <code>Math.sqrt(16)</code>, <code>Math.round(2.5)</code>.</p>
<p>Сокращения: <code>x++</code>, <code>x--</code>, <code>x += 5</code>, <code>x *= 2</code>. Красивый вывод дробных — <code>String.format("%.2f", x)</code>.</p>`,
        `<p>Arithmetic: <code>+ - * / %</code>. Java’s biggest trap is <b>integer division</b>: if both numbers are <code>int</code>, the result is an <code>int</code> and the fraction is dropped.</p>
<pre class="inline-code">System.out.println(7 / 2);     // 3
System.out.println(7 / 2.0);   // 3.5
System.out.println(7 % 2);     // 1 — remainder</pre>
<p><b>Casting</b>: <code>(double) 7 / 2</code> → 3.5, <code>(int) 9.99</code> → 9 (truncates, doesn’t round).</p>
<p>The <code>Math</code> class: <code>Math.max(a, b)</code>, <code>Math.min</code>, <code>Math.abs</code>, <code>Math.pow(2, 10)</code>, <code>Math.sqrt(16)</code>, <code>Math.round(2.5)</code>.</p>
<p>Shortcuts: <code>x++</code>, <code>x--</code>, <code>x += 5</code>, <code>x *= 2</code>. Nicely formatted decimals: <code>String.format("%.2f", x)</code>.</p>`),
      why: L(`<p>Чому 7 / 2 = 3? Процесор ділить цілі числа значно швидше, а в багатьох задачах (кількість повних коробок, номер сторінки) потрібна саме ціла частина. Java не вгадує за тебе — вирішуєш ти, через тип чисел.</p>`,
        `<p>Почему 7 / 2 = 3? Процессор делит целые числа гораздо быстрее, а во многих задачах (количество полных коробок, номер страницы) нужна именно целая часть. Java не угадывает за тебя — решаешь ты, через тип чисел.</p>`,
        `<p>Why is 7 / 2 = 3? CPUs divide integers much faster, and many tasks (full boxes, page numbers) need exactly the whole part. Java doesn’t guess for you — you decide via the number types.</p>`),
      mistakes: L(`<ul><li><code>double avg = sum / count;</code> з цілими sum і count — ділення вже цілочисельне. Пиши <code>(double) sum / count</code>.</li><li><code>"Sum: " + 2 + 3</code> дає <code>Sum: 23</code> — рядок «склеює». Бери в дужки: <code>"Sum: " + (2 + 3)</code>.</li></ul>`,
        `<ul><li><code>double avg = sum / count;</code> с целыми sum и count — деление уже целочисленное. Пиши <code>(double) sum / count</code>.</li><li><code>"Sum: " + 2 + 3</code> даёт <code>Sum: 23</code> — строка «склеивает». Бери в скобки: <code>"Sum: " + (2 + 3)</code>.</li></ul>`,
        `<ul><li><code>double avg = sum / count;</code> with int sum and count — the division is already integer. Write <code>(double) sum / count</code>.</li><li><code>"Sum: " + 2 + 3</code> gives <code>Sum: 23</code> — strings concatenate. Use parentheses: <code>"Sum: " + (2 + 3)</code>.</li></ul>`),
      examples: [
        { title: L('Ділення', 'Деление', 'Division'), code: M('System.out.println(7 / 2);\nSystem.out.println(7 / 2.0);\nSystem.out.println(7 % 2);\nSystem.out.println((double) 7 / 2);\nSystem.out.println((int) 9.99);'), note: L('Тип чисел визначає результат.', 'Тип чисел определяет результат.', 'Number types decide the result.') },
        { title: 'Math', code: M('System.out.println(Math.max(4, 9));\nSystem.out.println(Math.abs(-15));\nSystem.out.println(Math.pow(2, 10));\nSystem.out.println(Math.sqrt(81));\nSystem.out.println(Math.round(4.5));'), note: L('pow і sqrt повертають double.', 'pow и sqrt возвращают double.', 'pow and sqrt return doubles.') },
        { title: 'String.format', code: M('double price = 19.987;\nSystem.out.println(String.format("%.2f", price));\nSystem.out.println(String.format("%s has %d coins", "Ira", 42));\nSystem.out.printf("%5.1f%%%n", 87.456);'), note: L('%d — ціле, %s — рядок, %.2f — 2 знаки.', '%d — целое, %s — строка, %.2f — 2 знака.', '%d int, %s string, %.2f two decimals.') },
        { title: L('Пастка з рядком', 'Ловушка со строкой', 'String trap'), code: M('System.out.println("Sum: " + 2 + 3);\nSystem.out.println("Sum: " + (2 + 3));\nSystem.out.println(2 + 3 + " is the sum");'), note: L('Порядок обчислення — зліва направо.', 'Порядок вычисления — слева направо.', 'Evaluation goes left to right.') }
      ],
      task: {
        text: L('Оцінки: <code>int a = 9, b = 7, c = 8</code>. Обчисли суму і середнє (дробове!). Виведи <code>Sum: 24</code> і <code>Average: 8.00</code> (два знаки через <code>String.format</code>).', 'Оценки: <code>int a = 9, b = 7, c = 8</code>. Вычисли сумму и среднее (дробное!). Выведи <code>Sum: 24</code> и <code>Average: 8.00</code> (два знака через <code>String.format</code>).', 'Grades: <code>int a = 9, b = 7, c = 8</code>. Compute the sum and the (decimal!) average. Print <code>Sum: 24</code> and <code>Average: 8.00</code> (two decimals via <code>String.format</code>).'),
        how: [L('<code>double avg = (double) sum / 3;</code>', '<code>double avg = (double) sum / 3;</code>', '<code>double avg = (double) sum / 3;</code>'), L('<code>String.format("%.2f", avg)</code>', '<code>String.format("%.2f", avg)</code>', '<code>String.format("%.2f", avg)</code>')],
        starter: M('int a = 9, b = 7, c = 8;\n'),
        solution: M('int a = 9, b = 7, c = 8;\nint sum = a + b + c;\ndouble avg = (double) sum / 3;\nSystem.out.println("Sum: " + sum);\nSystem.out.println("Average: " + String.format("%.2f", avg));'),
        hint: L('Без <code>(double)</code> середнє теж 8, але з іншими числами помилка вилізе.', 'Без <code>(double)</code> среднее тоже 8, но с другими числами ошибка вылезет.', 'Without <code>(double)</code> it’s also 8 here, but other numbers would expose the bug.'),
        expected: 'Sum: 24\nAverage: 8.00',
        must: /\(double\)|\/\s*3\.0/
      },
      quiz: { q: L('Що виведе <code>System.out.println(9 / 4);</code>?', 'Что выведет <code>System.out.println(9 / 4);</code>?', 'What does <code>System.out.println(9 / 4);</code> print?'), options: ['2.25', '2', '3'], answer: 1, explain: L('Цілочисельне ділення.', 'Целочисленное деление.', 'Integer division.') },
      ref: [{ code: '(double) a / b', d: L('дробове ділення', 'дробное деление', 'decimal division') }, { code: 'String.format("%.2f", x)', d: L('формат числа', 'формат числа', 'format a number') }, { code: 'Math.max/min/abs/pow/sqrt', d: L('математика', 'математика', 'math') }]
    },
    {
      id: 'strings', chapter: CH1,
      title: L('Рядки: методи String', 'Строки: методы String', 'Strings: String methods'),
      theory: L(
        `<p><code>String</code> — об’єкт із корисними методами:</p>
<table class="mini"><tr><td><code>s.length()</code></td><td>довжина</td></tr><tr><td><code>s.charAt(0)</code></td><td>символ за індексом (з 0)</td></tr><tr><td><code>s.toUpperCase()</code> / <code>toLowerCase()</code></td><td>регістр</td></tr><tr><td><code>s.substring(1, 4)</code></td><td>частина з 1 до 4 (не включно)</td></tr><tr><td><code>s.indexOf("a")</code></td><td>позиція або -1</td></tr><tr><td><code>s.contains("ab")</code>, <code>startsWith</code></td><td>перевірки</td></tr><tr><td><code>s.replace("a", "b")</code>, <code>trim()</code></td><td>заміна, обрізання пробілів</td></tr><tr><td><code>s.split(",")</code></td><td>масив частин</td></tr></table>
<p><b>Важливо:</b> рядки порівнюють методом <code>s.equals("text")</code>, а не <code>==</code>. Оператор <code>==</code> перевіряє, чи це <i>той самий об’єкт</i> у пам’яті, а не однаковий текст.</p>
<p>Рядки <b>незмінні</b>: <code>s.toUpperCase()</code> повертає новий рядок, а <code>s</code> лишається як був.</p>`,
        `<p><code>String</code> — объект с полезными методами:</p>
<table class="mini"><tr><td><code>s.length()</code></td><td>длина</td></tr><tr><td><code>s.charAt(0)</code></td><td>символ по индексу (с 0)</td></tr><tr><td><code>s.toUpperCase()</code> / <code>toLowerCase()</code></td><td>регистр</td></tr><tr><td><code>s.substring(1, 4)</code></td><td>часть с 1 до 4 (не включительно)</td></tr><tr><td><code>s.indexOf("a")</code></td><td>позиция или -1</td></tr><tr><td><code>s.contains("ab")</code>, <code>startsWith</code></td><td>проверки</td></tr><tr><td><code>s.replace("a", "b")</code>, <code>trim()</code></td><td>замена, обрезка пробелов</td></tr><tr><td><code>s.split(",")</code></td><td>массив частей</td></tr></table>
<p><b>Важно:</b> строки сравнивают методом <code>s.equals("text")</code>, а не <code>==</code>. Оператор <code>==</code> проверяет, <i>тот же ли это объект</i> в памяти, а не одинаковый ли текст.</p>
<p>Строки <b>неизменяемы</b>: <code>s.toUpperCase()</code> возвращает новую строку, а <code>s</code> остаётся как был.</p>`,
        `<p><code>String</code> is an object with handy methods:</p>
<table class="mini"><tr><td><code>s.length()</code></td><td>length</td></tr><tr><td><code>s.charAt(0)</code></td><td>character at index (from 0)</td></tr><tr><td><code>s.toUpperCase()</code> / <code>toLowerCase()</code></td><td>case</td></tr><tr><td><code>s.substring(1, 4)</code></td><td>part from 1 to 4 (exclusive)</td></tr><tr><td><code>s.indexOf("a")</code></td><td>position or -1</td></tr><tr><td><code>s.contains("ab")</code>, <code>startsWith</code></td><td>checks</td></tr><tr><td><code>s.replace("a", "b")</code>, <code>trim()</code></td><td>replace, trim spaces</td></tr><tr><td><code>s.split(",")</code></td><td>array of parts</td></tr></table>
<p><b>Important:</b> compare strings with <code>s.equals("text")</code>, not <code>==</code>. <code>==</code> checks whether it’s <i>the same object</i> in memory, not the same text.</p>
<p>Strings are <b>immutable</b>: <code>s.toUpperCase()</code> returns a new string and <code>s</code> stays the same.</p>`),
      why: L(`<p>Чому рядки незмінні? Їх можна безпечно передавати між частинами програми: ніхто не зіпсує твій рядок «зсередини». А Java ще й економить пам’ять, зберігаючи однакові рядки один раз. Саме тому <code>==</code> іноді «випадково працює» — і тим небезпечніший.</p>`,
        `<p>Почему строки неизменяемы? Их можно безопасно передавать между частями программы: никто не испортит твою строку «изнутри». А Java ещё и экономит память, храня одинаковые строки один раз. Именно поэтому <code>==</code> иногда «случайно работает» — и тем опаснее.</p>`,
        `<p>Why are strings immutable? They can be passed around safely: nobody can corrupt your string “from inside”. Java also saves memory by storing identical strings once — which is why <code>==</code> sometimes “accidentally works”, making it even more dangerous.</p>`),
      mistakes: L(`<ul><li><code>if (answer == "yes")</code> — може повернути false навіть для однакового тексту. Використовуй <code>equals</code>.</li><li><code>s.length</code> без дужок — у рядка це метод <code>length()</code> (а в масиву — поле <code>length</code>).</li><li><code>charAt(s.length())</code> — вихід за межі: останній індекс <code>length() - 1</code>.</li></ul>`,
        `<ul><li><code>if (answer == "yes")</code> — может вернуть false даже для одинакового текста. Используй <code>equals</code>.</li><li><code>s.length</code> без скобок — у строки это метод <code>length()</code> (а у массива — поле <code>length</code>).</li><li><code>charAt(s.length())</code> — выход за границы: последний индекс <code>length() - 1</code>.</li></ul>`,
        `<ul><li><code>if (answer == "yes")</code> can be false even for equal text. Use <code>equals</code>.</li><li><code>s.length</code> without parentheses — for strings it’s the method <code>length()</code> (arrays have the field <code>length</code>).</li><li><code>charAt(s.length())</code> is out of bounds: the last index is <code>length() - 1</code>.</li></ul>`),
      examples: [
        { title: L('Основні методи', 'Основные методы', 'Basic methods'), code: M('String s = "Minecraft";\nSystem.out.println(s.length());\nSystem.out.println(s.charAt(0));\nSystem.out.println(s.toUpperCase());\nSystem.out.println(s.substring(4));\nSystem.out.println(s.indexOf("craft"));'), note: L('Індекси з нуля.', 'Индексы с нуля.', 'Indexes start at zero.') },
        { title: 'equals', code: M('String a = "hello";\nString b = new String("hello");\nSystem.out.println(a == b);\nSystem.out.println(a.equals(b));\nSystem.out.println("HeLLo".equalsIgnoreCase(a));'), note: L('== порівнює об’єкти, equals — текст.', '== сравнивает объекты, equals — текст.', '== compares objects, equals compares text.') },
        { title: 'split', code: M('String csv = "apple,banana,cherry";\nString[] parts = csv.split(",");\nSystem.out.println(parts.length);\nSystem.out.println(parts[1]);\nSystem.out.println(String.join(" | ", parts));'), note: L('Розбити й склеїти назад.', 'Разбить и склеить обратно.', 'Split and join back.') },
        { title: 'StringBuilder', code: M('StringBuilder sb = new StringBuilder();\nfor (int i = 1; i <= 5; i++) {\n  sb.append(i).append(" ");\n}\nSystem.out.println(sb.toString().trim());\nSystem.out.println(new StringBuilder("level").reverse());'), note: L('Швидке збирання рядка в циклі.', 'Быстрая сборка строки в цикле.', 'Fast string building in loops.') }
      ],
      task: {
        text: L('Є <code>String nick = "  dragonSlayer  ";</code>. Прибери пробіли, виведи нік великими літерами, його довжину, першу літеру та чи містить він <code>"Slayer"</code>. Очікувано: <code>DRAGONSLAYER</code>, <code>12</code>, <code>d</code>, <code>true</code>.', 'Есть <code>String nick = "  dragonSlayer  ";</code>. Убери пробелы, выведи ник заглавными, его длину, первую букву и содержит ли он <code>"Slayer"</code>. Ожидается: <code>DRAGONSLAYER</code>, <code>12</code>, <code>d</code>, <code>true</code>.', 'Given <code>String nick = "  dragonSlayer  ";</code>. Trim it, print the nick in uppercase, its length, the first letter and whether it contains <code>"Slayer"</code>. Expected: <code>DRAGONSLAYER</code>, <code>12</code>, <code>d</code>, <code>true</code>.'),
        how: [L('<code>String clean = nick.trim();</code>', '<code>String clean = nick.trim();</code>', '<code>String clean = nick.trim();</code>'), L('Далі — <code>toUpperCase()</code>, <code>length()</code>, <code>charAt(0)</code>, <code>contains</code>.', 'Дальше — <code>toUpperCase()</code>, <code>length()</code>, <code>charAt(0)</code>, <code>contains</code>.', 'Then <code>toUpperCase()</code>, <code>length()</code>, <code>charAt(0)</code>, <code>contains</code>.')],
        starter: M('String nick = "  dragonSlayer  ";\n'),
        solution: M('String nick = "  dragonSlayer  ";\nString clean = nick.trim();\nSystem.out.println(clean.toUpperCase());\nSystem.out.println(clean.length());\nSystem.out.println(clean.charAt(0));\nSystem.out.println(clean.contains("Slayer"));'),
        hint: L('Довжина без пробілів — 12.', 'Длина без пробелов — 12.', 'Length without spaces is 12.'),
        expected: 'DRAGONSLAYER\n12\nd\ntrue',
        must: /trim\s*\(\s*\)/
      },
      quiz: { q: L('Як правильно порівняти рядки?', 'Как правильно сравнить строки?', 'How do you compare strings correctly?'), options: ['a == b', 'a.equals(b)', 'a = b'], answer: 1, explain: L('equals порівнює вміст.', 'equals сравнивает содержимое.', 'equals compares contents.') },
      ref: [{ code: 's.length() s.charAt(i) s.substring(a, b)', d: L('довжина, символ, частина', 'длина, символ, часть', 'length, char, part') }, { code: 's.equals(t)', d: L('порівняння', 'сравнение', 'comparison') }, { code: 's.split(",")  String.join(sep, arr)', d: L('розбити/склеїти', 'разбить/склеить', 'split/join') }]
    },
    {
      id: 'input', chapter: CH1,
      title: L('Введення: Scanner', 'Ввод: Scanner', 'Input: Scanner'),
      theory: L(
        `<p>Щоб прочитати те, що вводить користувач, використовують клас <code>Scanner</code>. Його треба <b>імпортувати</b> на початку файлу:</p>
<pre class="inline-code">import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    String name = in.nextLine();   // увесь рядок
    int age = in.nextInt();        // ціле число
    System.out.println(name + " is " + age);
  }
}</pre>
<ul><li><code>nextLine()</code> — рядок до Enter, <code>next()</code> — одне слово</li><li><code>nextInt()</code>, <code>nextDouble()</code> — числа</li><li><code>hasNextInt()</code> — чи є ще число (зручно для циклів)</li></ul>
<div class="tip">💡 У Codry вхідні дані пишуться в поле <b>«Вхідні дані (stdin)»</b> під редактором — кожен рядок як окреме введення.</div>`,
        `<p>Чтобы прочитать то, что вводит пользователь, используют класс <code>Scanner</code>. Его нужно <b>импортировать</b> в начале файла:</p>
<pre class="inline-code">import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    String name = in.nextLine();   // вся строка
    int age = in.nextInt();        // целое число
    System.out.println(name + " is " + age);
  }
}</pre>
<ul><li><code>nextLine()</code> — строка до Enter, <code>next()</code> — одно слово</li><li><code>nextInt()</code>, <code>nextDouble()</code> — числа</li><li><code>hasNextInt()</code> — есть ли ещё число (удобно для циклов)</li></ul>
<div class="tip">💡 В Codry входные данные пишутся в поле <b>«Входные данные (stdin)»</b> под редактором — каждая строка как отдельный ввод.</div>`,
        `<p>To read user input, use the <code>Scanner</code> class. It must be <b>imported</b> at the top of the file:</p>
<pre class="inline-code">import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    String name = in.nextLine();   // the whole line
    int age = in.nextInt();        // an integer
    System.out.println(name + " is " + age);
  }
}</pre>
<ul><li><code>nextLine()</code> — a line up to Enter, <code>next()</code> — one word</li><li><code>nextInt()</code>, <code>nextDouble()</code> — numbers</li><li><code>hasNextInt()</code> — is there another number (handy in loops)</li></ul>
<div class="tip">💡 In Codry, type input into the <b>“Input (stdin)”</b> box under the editor — each line is a separate input.</div>`),
      why: L(`<p>Чому треба <code>import</code>? У Java тисячі класів, і завантажувати всі одразу було б повільно й заплутано. Імпорт каже: «з бібліотеки <code>java.util</code> мені потрібен <code>Scanner</code>». Так код явно показує, чим користується.</p>`,
        `<p>Почему нужен <code>import</code>? В Java тысячи классов, и загружать все сразу было бы медленно и запутанно. Импорт говорит: «из библиотеки <code>java.util</code> мне нужен <code>Scanner</code>». Так код явно показывает, чем пользуется.</p>`,
        `<p>Why <code>import</code>? Java has thousands of classes, and loading them all would be slow and confusing. The import says “from <code>java.util</code> I need <code>Scanner</code>”, so the code clearly shows what it uses.</p>`),
      mistakes: L(`<ul><li>Після <code>nextInt()</code> виклик <code>nextLine()</code> поверне порожній рядок — залишок старого рядка. Додай зайвий <code>nextLine()</code>.</li><li>Забути <code>import java.util.Scanner;</code> — помилка <code>cannot find symbol</code>.</li></ul>`,
        `<ul><li>После <code>nextInt()</code> вызов <code>nextLine()</code> вернёт пустую строку — остаток старой строки. Добавь лишний <code>nextLine()</code>.</li><li>Забыть <code>import java.util.Scanner;</code> — ошибка <code>cannot find symbol</code>.</li></ul>`,
        `<ul><li>After <code>nextInt()</code>, <code>nextLine()</code> returns an empty string — the rest of the old line. Add an extra <code>nextLine()</code>.</li><li>Forgetting <code>import java.util.Scanner;</code> — error <code>cannot find symbol</code>.</li></ul>`),
      examples: [
        { title: L('Ім’я', 'Имя', 'Name'), code: 'import java.util.Scanner;\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner in = new Scanner(System.in);\n    System.out.println("What is your name?");\n    String name = in.nextLine();\n    System.out.println("Hi, " + name + "!");\n  }\n}', note: L('Введи ім’я в поле stdin.', 'Введи имя в поле stdin.', 'Type a name into stdin.') },
        { title: L('Сума двох чисел', 'Сумма двух чисел', 'Sum of two'), code: 'import java.util.Scanner;\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner in = new Scanner(System.in);\n    int a = in.nextInt();\n    int b = in.nextInt();\n    System.out.println(a + " + " + b + " = " + (a + b));\n  }\n}', note: L('Числа можна писати в одному рядку через пробіл.', 'Числа можно писать в одной строке через пробел.', 'Numbers may share one line separated by spaces.') },
        { title: L('Поки є числа', 'Пока есть числа', 'While numbers remain'), code: 'import java.util.Scanner;\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner in = new Scanner(System.in);\n    int sum = 0, count = 0;\n    while (in.hasNextInt()) {\n      sum += in.nextInt();\n      count++;\n    }\n    System.out.println("Read " + count + " numbers, sum " + sum);\n  }\n}', note: L('Читає всі числа до кінця вводу.', 'Читает все числа до конца ввода.', 'Reads every number until input ends.') }
      ],
      task: {
        text: L('Прочитай ім’я (рядок) і рік народження (число). Виведи <code>NAME will be AGE in 2030</code>, де AGE = 2030 − рік. Вхідні дані вже задано: <code>Taras</code> і <code>2012</code>.', 'Прочитай имя (строку) и год рождения (число). Выведи <code>NAME will be AGE in 2030</code>, где AGE = 2030 − год. Входные данные уже заданы: <code>Taras</code> и <code>2012</code>.', 'Read a name (line) and a birth year (number). Print <code>NAME will be AGE in 2030</code>, where AGE = 2030 − year. Input is preset: <code>Taras</code> and <code>2012</code>.'),
        how: [L('<code>String name = in.nextLine();</code>, потім <code>int year = in.nextInt();</code>', '<code>String name = in.nextLine();</code>, затем <code>int year = in.nextInt();</code>', '<code>String name = in.nextLine();</code>, then <code>int year = in.nextInt();</code>')],
        starter: 'import java.util.Scanner;\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner in = new Scanner(System.in);\n    // прочитай ім’я та рік\n  }\n}',
        solution: 'import java.util.Scanner;\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner in = new Scanner(System.in);\n    String name = in.nextLine();\n    int year = in.nextInt();\n    System.out.println(name + " will be " + (2030 - year) + " in 2030");\n  }\n}',
        stdin: 'Taras\n2012',
        hint: L('Дужки навколо <code>2030 - year</code> обов’язкові.', 'Скобки вокруг <code>2030 - year</code> обязательны.', 'Parentheses around <code>2030 - year</code> are required.'),
        expected: 'Taras will be 18 in 2030',
        must: /nextLine[\s\S]*nextInt/
      },
      quiz: { q: L('Який метод читає ціле число?', 'Какой метод читает целое число?', 'Which method reads an integer?'), options: ['nextLine()', 'nextInt()', 'readInt()'], answer: 1, explain: L('nextInt — наступне ціле.', 'nextInt — следующее целое.', 'nextInt reads the next integer.') },
      ref: [{ code: 'import java.util.Scanner;', d: L('імпорт', 'импорт', 'import') }, { code: 'in.nextLine() in.nextInt() in.hasNextInt()', d: L('читання', 'чтение', 'reading') }]
    },
    {
      id: 'conditions', chapter: CH2,
      title: L('Умови: if, else, switch', 'Условия: if, else, switch', 'Conditions: if, else, switch'),
      theory: L(
        `<p>Умова пишеться в <b>круглих дужках</b>, а дії — у фігурних:</p>
<pre class="inline-code">if (score >= 90) {
  System.out.println("A");
} else if (score >= 75) {
  System.out.println("B");
} else {
  System.out.println("C");
}</pre>
<p>Порівняння: <code>== != &lt; &gt; &lt;= &gt;=</code>. Логіка: <code>&amp;&amp;</code> (і), <code>||</code> (або), <code>!</code> (ні).</p>
<p><b>switch</b> — коли порівнюєш одне значення з багатьма варіантами. Сучасний запис (Java 14+) зі стрілками:</p>
<pre class="inline-code">String day = switch (n) {
  case 6, 7 -> "Weekend";
  default -> "Workday";
};</pre>
<p>Тернарний оператор: <code>String r = age >= 18 ? "adult" : "teen";</code></p>`,
        `<p>Условие пишется в <b>круглых скобках</b>, а действия — в фигурных:</p>
<pre class="inline-code">if (score >= 90) {
  System.out.println("A");
} else if (score >= 75) {
  System.out.println("B");
} else {
  System.out.println("C");
}</pre>
<p>Сравнения: <code>== != &lt; &gt; &lt;= &gt;=</code>. Логика: <code>&amp;&amp;</code> (и), <code>||</code> (или), <code>!</code> (не).</p>
<p><b>switch</b> — когда сравниваешь одно значение с многими вариантами. Современная запись (Java 14+) со стрелками:</p>
<pre class="inline-code">String day = switch (n) {
  case 6, 7 -> "Weekend";
  default -> "Workday";
};</pre>
<p>Тернарный оператор: <code>String r = age >= 18 ? "adult" : "teen";</code></p>`,
        `<p>The condition goes in <b>parentheses</b>, actions in braces:</p>
<pre class="inline-code">if (score >= 90) {
  System.out.println("A");
} else if (score >= 75) {
  System.out.println("B");
} else {
  System.out.println("C");
}</pre>
<p>Comparisons: <code>== != &lt; &gt; &lt;= &gt;=</code>. Logic: <code>&amp;&amp;</code> (and), <code>||</code> (or), <code>!</code> (not).</p>
<p><b>switch</b> compares one value against many options. The modern arrow form (Java 14+):</p>
<pre class="inline-code">String day = switch (n) {
  case 6, 7 -> "Weekend";
  default -> "Workday";
};</pre>
<p>Ternary operator: <code>String r = age >= 18 ? "adult" : "teen";</code></p>`),
      why: L(`<p>Чому порядок <code>else if</code> важливий? Java перевіряє умови згори вниз і зупиняється на першій правдивій. Якщо спершу перевірити <code>score >= 75</code>, оцінку A не отримає ніхто. Тому від суворішої умови — до м’якшої.</p>`,
        `<p>Почему порядок <code>else if</code> важен? Java проверяет условия сверху вниз и останавливается на первом истинном. Если сначала проверить <code>score >= 75</code>, оценку A не получит никто. Поэтому от строгого условия — к мягкому.</p>`,
        `<p>Why does <code>else if</code> order matter? Java checks top to bottom and stops at the first true one. If you check <code>score >= 75</code> first, nobody ever gets an A. So go from strictest to loosest.</p>`),
      mistakes: L(`<ul><li><code>if (x = 5)</code> — присвоєння замість порівняння, помилка компіляції. Треба <code>==</code>.</li><li>У старому <code>switch</code> з двокрапками забутий <code>break</code> — виконаються й наступні case. Стрілки <code>-></code> цієї проблеми не мають.</li></ul>`,
        `<ul><li><code>if (x = 5)</code> — присваивание вместо сравнения, ошибка компиляции. Нужно <code>==</code>.</li><li>В старом <code>switch</code> с двоеточиями забытый <code>break</code> — выполнятся и следующие case. Стрелки <code>-></code> этой проблемы не имеют.</li></ul>`,
        `<ul><li><code>if (x = 5)</code> — assignment instead of comparison, a compile error. Use <code>==</code>.</li><li>In an old colon-style <code>switch</code>, a missing <code>break</code> falls through to the next cases. Arrow <code>-></code> cases don’t have that problem.</li></ul>`),
      examples: [
        { title: 'if / else if', code: M('int score = 82;\nif (score >= 90) {\n  System.out.println("A");\n} else if (score >= 75) {\n  System.out.println("B");\n} else {\n  System.out.println("C");\n}'), note: L('Перша правдива умова виграє.', 'Первое истинное условие побеждает.', 'The first true condition wins.') },
        { title: L('Логіка', 'Логика', 'Logic'), code: M('int age = 13;\nboolean hasTicket = true;\nif (age >= 12 && hasTicket) {\n  System.out.println("Welcome to the ride!");\n}\nboolean weekend = false, holiday = true;\nSystem.out.println(weekend || holiday ? "Day off" : "School");'), note: L('&& — обидві умови, || — хоча б одна.', '&& — оба условия, || — хотя бы одно.', '&& both, || at least one.') },
        { title: 'switch ->', code: M('int month = 7;\nString season = switch (month) {\n  case 12, 1, 2 -> "Winter";\n  case 3, 4, 5 -> "Spring";\n  case 6, 7, 8 -> "Summer";\n  default -> "Autumn";\n};\nSystem.out.println(season);'), note: L('switch повертає значення.', 'switch возвращает значение.', 'switch returns a value.') }
      ],
      task: {
        text: L('Напиши програму, що за температурою <code>int t</code> виводить: <code>Freezing</code> (менше 0), <code>Cold</code> (0–14), <code>Warm</code> (15–24), <code>Hot</code> (25 і більше). Перевір для значень <code>-5, 10, 20, 30</code> у циклі <code>for (int t : new int[]{-5, 10, 20, 30})</code>.', 'Напиши программу, которая по температуре <code>int t</code> выводит: <code>Freezing</code> (меньше 0), <code>Cold</code> (0–14), <code>Warm</code> (15–24), <code>Hot</code> (25 и больше). Проверь для значений <code>-5, 10, 20, 30</code> в цикле <code>for (int t : new int[]{-5, 10, 20, 30})</code>.', 'Write a program that, for temperature <code>int t</code>, prints <code>Freezing</code> (below 0), <code>Cold</code> (0–14), <code>Warm</code> (15–24), <code>Hot</code> (25+). Test with <code>-5, 10, 20, 30</code> in <code>for (int t : new int[]{-5, 10, 20, 30})</code>.'),
        how: [L('Ланцюжок <code>if / else if / else</code> від найменшої межі.', 'Цепочка <code>if / else if / else</code> от самой маленькой границы.', 'An <code>if / else if / else</code> chain from the lowest bound.')],
        starter: M('for (int t : new int[]{-5, 10, 20, 30}) {\n  // твоя умова\n}'),
        solution: M('for (int t : new int[]{-5, 10, 20, 30}) {\n  if (t < 0) {\n    System.out.println("Freezing");\n  } else if (t < 15) {\n    System.out.println("Cold");\n  } else if (t < 25) {\n    System.out.println("Warm");\n  } else {\n    System.out.println("Hot");\n  }\n}'),
        hint: L('Після <code>t < 0</code> вже відомо, що t ≥ 0.', 'После <code>t < 0</code> уже известно, что t ≥ 0.', 'After <code>t < 0</code> we already know t ≥ 0.'),
        expected: 'Freezing\nCold\nWarm\nHot',
        must: /else\s+if/
      },
      quiz: { q: L('Що означає <code>&&</code>?', 'Что означает <code>&&</code>?', 'What does <code>&&</code> mean?'), options: [L('або', 'или', 'or'), L('і', 'и', 'and'), L('ні', 'не', 'not')], answer: 1, explain: L('Обидві умови мають бути true.', 'Оба условия должны быть true.', 'Both must be true.') },
      ref: [{ code: 'if (c) { } else if (d) { } else { }', d: L('розгалуження', 'ветвление', 'branching') }, { code: 'switch (x) { case 1 -> …; default -> …; }', d: 'switch' }, { code: 'c ? a : b', d: L('тернарний', 'тернарный', 'ternary') }]
    },
    {
      id: 'loops', chapter: CH2,
      title: L('Цикли: for, while, do-while', 'Циклы: for, while, do-while', 'Loops: for, while, do-while'),
      theory: L(
        `<p><b>for</b> — коли відома кількість повторів. У дужках три частини: старт; умова; крок.</p>
<pre class="inline-code">for (int i = 1; i <= 5; i++) {
  System.out.println("Step " + i);
}</pre>
<p><b>while</b> — поки умова правдива (кількість наперед невідома):</p>
<pre class="inline-code">int hp = 100;
while (hp > 0) {
  hp -= 30;
}</pre>
<p><b>do { } while (умова);</b> — виконається хоча б раз (зручно для меню).</p>
<p>Керування: <code>break</code> — вийти з циклу, <code>continue</code> — перейти до наступної ітерації. Цикли можна вкладати один в один (таблиця множення).</p>`,
        `<p><b>for</b> — когда известно количество повторов. В скобках три части: старт; условие; шаг.</p>
<pre class="inline-code">for (int i = 1; i <= 5; i++) {
  System.out.println("Step " + i);
}</pre>
<p><b>while</b> — пока условие истинно (количество заранее неизвестно):</p>
<pre class="inline-code">int hp = 100;
while (hp > 0) {
  hp -= 30;
}</pre>
<p><b>do { } while (условие);</b> — выполнится хотя бы раз (удобно для меню).</p>
<p>Управление: <code>break</code> — выйти из цикла, <code>continue</code> — перейти к следующей итерации. Циклы можно вкладывать друг в друга (таблица умножения).</p>`,
        `<p><b>for</b> — when you know how many repeats. Three parts in parentheses: start; condition; step.</p>
<pre class="inline-code">for (int i = 1; i <= 5; i++) {
  System.out.println("Step " + i);
}</pre>
<p><b>while</b> — while a condition holds (unknown count):</p>
<pre class="inline-code">int hp = 100;
while (hp > 0) {
  hp -= 30;
}</pre>
<p><b>do { } while (condition);</b> runs at least once (handy for menus).</p>
<p>Control: <code>break</code> exits the loop, <code>continue</code> skips to the next iteration. Loops can be nested (a multiplication table).</p>`),
      why: L(`<p>Чому три види циклів? Кожен краще передає <b>намір</b>: <code>for</code> — «рівно N разів», <code>while</code> — «поки щось не станеться», <code>do-while</code> — «спершу зроби, потім перевір». Код, що виражає намір, легше читати й важче зламати.</p>`,
        `<p>Почему три вида циклов? Каждый лучше передаёт <b>намерение</b>: <code>for</code> — «ровно N раз», <code>while</code> — «пока что-то не случится», <code>do-while</code> — «сначала сделай, потом проверь». Код, выражающий намерение, легче читать и труднее сломать.</p>`,
        `<p>Why three loop kinds? Each expresses <b>intent</b> best: <code>for</code> — “exactly N times”, <code>while</code> — “until something happens”, <code>do-while</code> — “do first, check after”. Code that shows intent is easier to read and harder to break.</p>`),
      mistakes: L(`<ul><li><code>for (int i = 0; i <= 5; i++)</code> замість <code>&lt; 5</code> — зайва ітерація («помилка на одиницю»).</li><li><code>while</code>, у якому змінна умови не змінюється, — нескінченний цикл.</li><li>Крапка з комою після <code>for (...);</code> — тіло циклу стає порожнім.</li></ul>`,
        `<ul><li><code>for (int i = 0; i <= 5; i++)</code> вместо <code>&lt; 5</code> — лишняя итерация («ошибка на единицу»).</li><li><code>while</code>, в котором переменная условия не меняется, — бесконечный цикл.</li><li>Точка с запятой после <code>for (...);</code> — тело цикла становится пустым.</li></ul>`,
        `<ul><li><code>for (int i = 0; i <= 5; i++)</code> instead of <code>&lt; 5</code> — one extra iteration (“off by one”).</li><li>A <code>while</code> whose condition variable never changes — an infinite loop.</li><li>A semicolon after <code>for (...);</code> empties the loop body.</li></ul>`),
      examples: [
        { title: 'for', code: M('for (int i = 1; i <= 5; i++) {\n  System.out.print(i + " ");\n}\nSystem.out.println();\nfor (int i = 10; i > 0; i -= 3) {\n  System.out.print(i + " ");\n}'), note: L('Вперед і назад з кроком.', 'Вперёд и назад с шагом.', 'Forward, and backward with a step.') },
        { title: 'while', code: M('int hp = 100;\nint hits = 0;\nwhile (hp > 0) {\n  hp -= 30;\n  hits++;\n}\nSystem.out.println("Defeated after " + hits + " hits, hp = " + hp);'), note: L('Кількість ударів невідома наперед.', 'Количество ударов заранее неизвестно.', 'The number of hits isn’t known in advance.') },
        { title: 'break / continue', code: M('for (int i = 1; i <= 10; i++) {\n  if (i % 3 == 0) continue;\n  if (i > 8) break;\n  System.out.print(i + " ");\n}'), note: L('Пропуск кратних 3 і вихід після 8.', 'Пропуск кратных 3 и выход после 8.', 'Skip multiples of 3, stop after 8.') },
        { title: L('Вкладені', 'Вложенные', 'Nested'), code: M('for (int r = 1; r <= 3; r++) {\n  StringBuilder row = new StringBuilder();\n  for (int c = 1; c <= 4; c++) {\n    row.append(r * c).append("\\t");\n  }\n  System.out.println(row.toString().trim());\n}'), note: L('Таблиця множення 3×4.', 'Таблица умножения 3×4.', 'A 3×4 multiplication table.') }
      ],
      task: {
        text: L('Виведи числа від 1 до 15, але замість кратних 3 пиши <code>Fizz</code>, кратних 5 — <code>Buzz</code>, кратних і 3, і 5 — <code>FizzBuzz</code>. Кожне — з нового рядка.', 'Выведи числа от 1 до 15, но вместо кратных 3 пиши <code>Fizz</code>, кратных 5 — <code>Buzz</code>, кратных и 3, и 5 — <code>FizzBuzz</code>. Каждое — с новой строки.', 'Print numbers 1 to 15, but write <code>Fizz</code> for multiples of 3, <code>Buzz</code> for multiples of 5, and <code>FizzBuzz</code> for multiples of both. One per line.'),
        how: [L('Спершу перевір <code>i % 15 == 0</code> — інакше спрацює Fizz.', 'Сначала проверь <code>i % 15 == 0</code> — иначе сработает Fizz.', 'Check <code>i % 15 == 0</code> first — otherwise Fizz wins.')],
        starter: M('for (int i = 1; i <= 15; i++) {\n  \n}'),
        solution: M('for (int i = 1; i <= 15; i++) {\n  if (i % 15 == 0) {\n    System.out.println("FizzBuzz");\n  } else if (i % 3 == 0) {\n    System.out.println("Fizz");\n  } else if (i % 5 == 0) {\n    System.out.println("Buzz");\n  } else {\n    System.out.println(i);\n  }\n}'),
        hint: L('Класична задача співбесід!', 'Классическая задача собеседований!', 'A classic interview task!'),
        expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
        must: /for\s*\(/
      },
      quiz: { q: L('Скільки разів виконається <code>for (int i = 0; i < 4; i++)</code>?', 'Сколько раз выполнится <code>for (int i = 0; i < 4; i++)</code>?', 'How many times does <code>for (int i = 0; i < 4; i++)</code> run?'), options: ['3', '4', '5'], answer: 1, explain: L('i = 0, 1, 2, 3.', 'i = 0, 1, 2, 3.', 'i = 0, 1, 2, 3.') },
      ref: [{ code: 'for (int i = 0; i < n; i++) { }', d: L('цикл з лічильником', 'цикл со счётчиком', 'counting loop') }, { code: 'while (c) { }  do { } while (c);', d: L('цикли з умовою', 'циклы с условием', 'conditional loops') }, { code: 'break; continue;', d: L('керування', 'управление', 'control') }]
    },
    {
      id: 'arrays', chapter: CH2,
      title: L('Масиви', 'Массивы', 'Arrays'),
      theory: L(
        `<p><b>Масив</b> — набір значень <i>одного типу</i> фіксованої довжини.</p>
<pre class="inline-code">int[] scores = {90, 75, 88};
String[] names = new String[3];   // 3 порожні комірки (null)
names[0] = "Ira";</pre>
<ul><li>Індекси з <b>0</b>: <code>scores[0]</code> — перший, <code>scores[scores.length - 1]</code> — останній</li><li><code>scores.length</code> — довжина (поле, без дужок)</li><li>Цикл <b>for-each</b>: <code>for (int s : scores) { … }</code> — пройти всі елементи</li><li>Утиліти <code>java.util.Arrays</code>: <code>Arrays.toString(a)</code>, <code>Arrays.sort(a)</code>, <code>Arrays.fill(a, 0)</code></li></ul>
<p>Довжину масиву змінити не можна. Якщо потрібен список, що росте, — є <code>ArrayList</code> (далі в курсі).</p>`,
        `<p><b>Массив</b> — набор значений <i>одного типа</i> фиксированной длины.</p>
<pre class="inline-code">int[] scores = {90, 75, 88};
String[] names = new String[3];   // 3 пустые ячейки (null)
names[0] = "Ira";</pre>
<ul><li>Индексы с <b>0</b>: <code>scores[0]</code> — первый, <code>scores[scores.length - 1]</code> — последний</li><li><code>scores.length</code> — длина (поле, без скобок)</li><li>Цикл <b>for-each</b>: <code>for (int s : scores) { … }</code> — пройти все элементы</li><li>Утилиты <code>java.util.Arrays</code>: <code>Arrays.toString(a)</code>, <code>Arrays.sort(a)</code>, <code>Arrays.fill(a, 0)</code></li></ul>
<p>Длину массива изменить нельзя. Если нужен растущий список — есть <code>ArrayList</code> (дальше в курсе).</p>`,
        `<p>An <b>array</b> is a fixed-length collection of values of <i>one type</i>.</p>
<pre class="inline-code">int[] scores = {90, 75, 88};
String[] names = new String[3];   // 3 empty slots (null)
names[0] = "Ira";</pre>
<ul><li>Indexes start at <b>0</b>: <code>scores[0]</code> is first, <code>scores[scores.length - 1]</code> last</li><li><code>scores.length</code> is the length (a field, no parentheses)</li><li>The <b>for-each</b> loop: <code>for (int s : scores) { … }</code> visits every element</li><li><code>java.util.Arrays</code> helpers: <code>Arrays.toString(a)</code>, <code>Arrays.sort(a)</code>, <code>Arrays.fill(a, 0)</code></li></ul>
<p>An array’s length can’t change. For a growing list there’s <code>ArrayList</code> (later in the course).</p>`),
      why: L(`<p>Чому масив фіксованої довжини? Він лежить у пам’яті одним суцільним блоком, тому доступ до <code>a[i]</code> миттєвий — комп’ютер просто обчислює адресу. Це найшвидша структура даних, і всі інші (списки, рядки) побудовані на масивах.</p>`,
        `<p>Почему массив фиксированной длины? Он лежит в памяти одним сплошным блоком, поэтому доступ к <code>a[i]</code> мгновенный — компьютер просто вычисляет адрес. Это самая быстрая структура данных, и все остальные (списки, строки) построены на массивах.</p>`,
        `<p>Why fixed length? An array sits in memory as one continuous block, so <code>a[i]</code> is instant — the computer just computes the address. It’s the fastest data structure, and others (lists, strings) are built on arrays.</p>`),
      mistakes: L(`<ul><li><code>a[a.length]</code> — <code>ArrayIndexOutOfBoundsException</code>: останній індекс <code>length - 1</code>.</li><li><code>System.out.println(a)</code> виведе щось на кшталт <code>[I@1b6d3586</code>. Використовуй <code>Arrays.toString(a)</code>.</li></ul>`,
        `<ul><li><code>a[a.length]</code> — <code>ArrayIndexOutOfBoundsException</code>: последний индекс <code>length - 1</code>.</li><li><code>System.out.println(a)</code> выведет что-то вроде <code>[I@1b6d3586</code>. Используй <code>Arrays.toString(a)</code>.</li></ul>`,
        `<ul><li><code>a[a.length]</code> throws <code>ArrayIndexOutOfBoundsException</code>: the last index is <code>length - 1</code>.</li><li><code>System.out.println(a)</code> prints something like <code>[I@1b6d3586</code>. Use <code>Arrays.toString(a)</code>.</li></ul>`),
      examples: [
        { title: L('Створення', 'Создание', 'Creating'), code: M('int[] scores = {90, 75, 88, 62};\nSystem.out.println(scores[0]);\nSystem.out.println(scores[scores.length - 1]);\nscores[1] = 80;\nSystem.out.println(Arrays.toString(scores));', 'import java.util.Arrays;'), note: L('Arrays.toString — гарний вивід.', 'Arrays.toString — красивый вывод.', 'Arrays.toString prints nicely.') },
        { title: 'for-each', code: M('String[] fruits = {"apple", "kiwi", "mango"};\nfor (String f : fruits) {\n  System.out.println(f + " has " + f.length() + " letters");\n}'), note: L('Без індексів.', 'Без индексов.', 'No indexes needed.') },
        { title: L('Сума й максимум', 'Сумма и максимум', 'Sum and max'), code: M('int[] nums = {4, 17, 9, 23, 8};\nint sum = 0, max = nums[0];\nfor (int n : nums) {\n  sum += n;\n  if (n > max) max = n;\n}\nSystem.out.println("Sum " + sum + ", max " + max);'), note: L('Класичний шаблон обходу.', 'Классический шаблон обхода.', 'The classic traversal pattern.') },
        { title: 'sort', code: M('int[] a = {5, 2, 9, 1, 7};\nArrays.sort(a);\nSystem.out.println(Arrays.toString(a));\nint[] zeros = new int[4];\nSystem.out.println(Arrays.toString(zeros));', 'import java.util.Arrays;'), note: L('Нові int-масиви заповнені нулями.', 'Новые int-массивы заполнены нулями.', 'New int arrays are filled with zeros.') }
      ],
      task: {
        text: L('Є масив часів проходження рівня (секунди): <code>{48, 35, 61, 29, 52}</code>. Виведи кращий час (мінімум), середній (ціле, діленням int) і відсортований масив. Очікувано: <code>Best: 29</code>, <code>Average: 45</code>, <code>[29, 35, 48, 52, 61]</code>.', 'Есть массив времени прохождения уровня (секунды): <code>{48, 35, 61, 29, 52}</code>. Выведи лучшее время (минимум), среднее (целое, делением int) и отсортированный массив. Ожидается: <code>Best: 29</code>, <code>Average: 45</code>, <code>[29, 35, 48, 52, 61]</code>.', 'An array of level times (seconds): <code>{48, 35, 61, 29, 52}</code>. Print the best time (minimum), the average (an int, via int division) and the sorted array. Expected: <code>Best: 29</code>, <code>Average: 45</code>, <code>[29, 35, 48, 52, 61]</code>.'),
        how: [L('Мінімум і суму — одним for-each.', 'Минимум и сумму — одним for-each.', 'Min and sum in one for-each.'), L('<code>import java.util.Arrays;</code> для sort і toString.', '<code>import java.util.Arrays;</code> для sort и toString.', '<code>import java.util.Arrays;</code> for sort and toString.')],
        starter: M('int[] times = {48, 35, 61, 29, 52};\n', 'import java.util.Arrays;'),
        solution: M('int[] times = {48, 35, 61, 29, 52};\nint best = times[0];\nint sum = 0;\nfor (int t : times) {\n  sum += t;\n  if (t < best) best = t;\n}\nSystem.out.println("Best: " + best);\nSystem.out.println("Average: " + sum / times.length);\nArrays.sort(times);\nSystem.out.println(Arrays.toString(times));', 'import java.util.Arrays;'),
        hint: L('Сума 225, 225 / 5 = 45.', 'Сумма 225, 225 / 5 = 45.', 'Sum 225, 225 / 5 = 45.'),
        expected: 'Best: 29\nAverage: 45\n[29, 35, 48, 52, 61]',
        must: /Arrays\.sort/
      },
      quiz: { q: L('Як дізнатися довжину масиву <code>a</code>?', 'Как узнать длину массива <code>a</code>?', 'How do you get array <code>a</code>’s length?'), options: ['a.length()', 'a.length', 'a.size()'], answer: 1, explain: L('У масиву — поле length.', 'У массива — поле length.', 'Arrays have a length field.') },
      ref: [{ code: 'int[] a = {1, 2}; new int[n]', d: L('створення', 'создание', 'creation') }, { code: 'for (int x : a) { }', d: 'for-each' }, { code: 'Arrays.toString(a) Arrays.sort(a)', d: L('утиліти', 'утилиты', 'utilities') }]
    },
    {
      id: 'methods', chapter: CH2,
      title: L('Методи', 'Методы', 'Methods'),
      theory: L(
        `<p><b>Метод</b> — іменований блок коду, який можна викликати багато разів. Поки ми не вивчили об’єкти, пишемо методи як <code>static</code> всередині <code>Main</code>:</p>
<pre class="inline-code">static int square(int x) {
  return x * x;
}</pre>
<ul><li><code>int</code> перед іменем — тип результату; <code>void</code> — метод нічого не повертає</li><li>У дужках — <b>параметри</b> з типами</li><li><code>return</code> повертає значення й завершує метод</li></ul>
<p><b>Перевантаження</b>: кілька методів з одним іменем, але різними параметрами — Java сама обере потрібний: <code>area(5)</code> і <code>area(3, 4)</code>.</p>
<p>Метод може викликати сам себе — це <b>рекурсія</b> (факторіал, обхід дерева).</p>`,
        `<p><b>Метод</b> — именованный блок кода, который можно вызывать много раз. Пока мы не изучили объекты, пишем методы как <code>static</code> внутри <code>Main</code>:</p>
<pre class="inline-code">static int square(int x) {
  return x * x;
}</pre>
<ul><li><code>int</code> перед именем — тип результата; <code>void</code> — метод ничего не возвращает</li><li>В скобках — <b>параметры</b> с типами</li><li><code>return</code> возвращает значение и завершает метод</li></ul>
<p><b>Перегрузка</b>: несколько методов с одним именем, но разными параметрами — Java сама выберет нужный: <code>area(5)</code> и <code>area(3, 4)</code>.</p>
<p>Метод может вызывать сам себя — это <b>рекурсия</b> (факториал, обход дерева).</p>`,
        `<p>A <b>method</b> is a named block of code you can call many times. Until we learn objects, we write methods as <code>static</code> inside <code>Main</code>:</p>
<pre class="inline-code">static int square(int x) {
  return x * x;
}</pre>
<ul><li><code>int</code> before the name is the return type; <code>void</code> returns nothing</li><li>Inside the parentheses are typed <b>parameters</b></li><li><code>return</code> returns a value and ends the method</li></ul>
<p><b>Overloading</b>: several methods share a name with different parameters, and Java picks the right one: <code>area(5)</code> and <code>area(3, 4)</code>.</p>
<p>A method can call itself — that’s <b>recursion</b> (factorial, tree traversal).</p>`),
      why: L(`<p>Методи — головний інструмент проти хаосу. Замість 200 рядків у <code>main</code> ти маєш <code>calculateDamage()</code>, <code>printStats()</code>, <code>isGameOver()</code> — код читається як план дій, а помилку легко знайти в конкретному методі. Правило: один метод — одна справа.</p>`,
        `<p>Методы — главный инструмент против хаоса. Вместо 200 строк в <code>main</code> у тебя <code>calculateDamage()</code>, <code>printStats()</code>, <code>isGameOver()</code> — код читается как план действий, а ошибку легко найти в конкретном методе. Правило: один метод — одно дело.</p>`,
        `<p>Methods are the main weapon against chaos. Instead of 200 lines in <code>main</code> you have <code>calculateDamage()</code>, <code>printStats()</code>, <code>isGameOver()</code> — code reads like a plan, and bugs are easy to locate. Rule: one method, one job.</p>`),
      mistakes: L(`<ul><li>Метод з типом <code>int</code> без <code>return</code> на якомусь шляху — помилка <code>missing return statement</code>.</li><li>Забути <code>static</code> і викликати з <code>main</code> — <code>non-static method cannot be referenced</code>.</li><li>Рекурсія без умови зупинки — <code>StackOverflowError</code>.</li></ul>`,
        `<ul><li>Метод с типом <code>int</code> без <code>return</code> на каком-то пути — ошибка <code>missing return statement</code>.</li><li>Забыть <code>static</code> и вызвать из <code>main</code> — <code>non-static method cannot be referenced</code>.</li><li>Рекурсия без условия остановки — <code>StackOverflowError</code>.</li></ul>`,
        `<ul><li>An <code>int</code> method missing <code>return</code> on some path — <code>missing return statement</code>.</li><li>Forgetting <code>static</code> and calling from <code>main</code> — <code>non-static method cannot be referenced</code>.</li><li>Recursion without a stopping condition — <code>StackOverflowError</code>.</li></ul>`),
      examples: [
        { title: 'return', code: 'public class Main {\n  static int square(int x) {\n    return x * x;\n  }\n\n  static boolean isEven(int n) {\n    return n % 2 == 0;\n  }\n\n  public static void main(String[] args) {\n    System.out.println(square(7));\n    System.out.println(isEven(10) + " " + isEven(7));\n  }\n}', note: L('Методи повертають значення.', 'Методы возвращают значения.', 'Methods return values.') },
        { title: 'void', code: 'public class Main {\n  static void printBar(String label, int value) {\n    System.out.println(label + " " + "#".repeat(value));\n  }\n\n  public static void main(String[] args) {\n    printBar("HP  ", 8);\n    printBar("Mana", 5);\n    printBar("XP  ", 3);\n  }\n}', note: L('void — лише дія, без результату.', 'void — только действие, без результата.', 'void just acts, no result.') },
        { title: L('Перевантаження', 'Перегрузка', 'Overloading'), code: 'public class Main {\n  static double area(double r) {\n    return Math.PI * r * r;\n  }\n\n  static double area(double w, double h) {\n    return w * h;\n  }\n\n  public static void main(String[] args) {\n    System.out.printf("%.2f%n", area(2));\n    System.out.println(area(3, 4));\n  }\n}', note: L('Одне ім’я — різні параметри.', 'Одно имя — разные параметры.', 'One name, different parameters.') },
        { title: L('Рекурсія', 'Рекурсия', 'Recursion'), code: 'public class Main {\n  static long factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n  }\n\n  public static void main(String[] args) {\n    for (int i = 1; i <= 5; i++) {\n      System.out.println(i + "! = " + factorial(i));\n    }\n  }\n}', note: L('Умова зупинки — n ≤ 1.', 'Условие остановки — n ≤ 1.', 'The base case is n ≤ 1.') }
      ],
      task: {
        text: L('Напиши метод <code>static int damage(int attack, int armor)</code>: шкода = attack − armor, але не менше 1. І метод <code>static String status(int hp)</code>: <code>"dead"</code> якщо hp ≤ 0, <code>"low"</code> якщо &lt; 30, інакше <code>"ok"</code>. У main у ворога 50 hp; б’ємо 3 рази з attack 25 і armor 5 й після кожного удару виводимо <code>hp=30 ok</code> тощо.', 'Напиши метод <code>static int damage(int attack, int armor)</code>: урон = attack − armor, но не меньше 1. И метод <code>static String status(int hp)</code>: <code>"dead"</code> если hp ≤ 0, <code>"low"</code> если &lt; 30, иначе <code>"ok"</code>. В main у врага 50 hp; бьём 3 раза с attack 25 и armor 5 и после каждого удара выводим <code>hp=30 ok</code> и т. д.', 'Write <code>static int damage(int attack, int armor)</code>: damage = attack − armor, but at least 1. And <code>static String status(int hp)</code>: <code>"dead"</code> if hp ≤ 0, <code>"low"</code> if &lt; 30, else <code>"ok"</code>. In main an enemy has 50 hp; hit 3 times with attack 25 and armor 5, printing <code>hp=30 ok</code> etc. after each hit.'),
        how: [L('<code>return Math.max(1, attack - armor);</code>', '<code>return Math.max(1, attack - armor);</code>', '<code>return Math.max(1, attack - armor);</code>'), L('Шкода 20: 50 → 30 → 10 → −10.', 'Урон 20: 50 → 30 → 10 → −10.', 'Damage 20: 50 → 30 → 10 → −10.')],
        starter: 'public class Main {\n  // методи damage і status\n\n  public static void main(String[] args) {\n    int hp = 50;\n  }\n}',
        solution: 'public class Main {\n  static int damage(int attack, int armor) {\n    return Math.max(1, attack - armor);\n  }\n\n  static String status(int hp) {\n    if (hp <= 0) return "dead";\n    if (hp < 30) return "low";\n    return "ok";\n  }\n\n  public static void main(String[] args) {\n    int hp = 50;\n    for (int i = 0; i < 3; i++) {\n      hp -= damage(25, 5);\n      System.out.println("hp=" + hp + " " + status(hp));\n    }\n  }\n}',
        hint: L('Очікувано: hp=30 ok, hp=10 low, hp=-10 dead.', 'Ожидается: hp=30 ok, hp=10 low, hp=-10 dead.', 'Expected: hp=30 ok, hp=10 low, hp=-10 dead.'),
        expected: 'hp=30 ok\nhp=10 low\nhp=-10 dead',
        must: /static\s+int\s+damage[\s\S]*static\s+String\s+status/
      },
      quiz: { q: L('Що означає <code>void</code>?', 'Что означает <code>void</code>?', 'What does <code>void</code> mean?'), options: [L('метод нічого не повертає', 'метод ничего не возвращает', 'the method returns nothing'), L('метод порожній', 'метод пустой', 'the method is empty'), L('метод приватний', 'метод приватный', 'the method is private')], answer: 0, explain: L('Без значення результату.', 'Без значения результата.', 'No result value.') },
      ref: [{ code: 'static int f(int x) { return …; }', d: L('метод з результатом', 'метод с результатом', 'method with result') }, { code: 'static void g() { }', d: L('без результату', 'без результата', 'no result') }]
    },
    {
      id: 'classes', chapter: CH3,
      title: L('Класи й об’єкти', 'Классы и объекты', 'Classes and objects'),
      theory: L(
        `<p><b>Клас</b> — це креслення, <b>об’єкт</b> — річ, створена за ним. Клас <code>Dog</code> описує, що в кожного собаки є ім’я й вік і що він уміє гавкати; конкретні Рекс і Бім — об’єкти.</p>
<pre class="inline-code">class Dog {
  String name;     // поля — дані об’єкта
  int age;

  void bark() {    // метод — поведінка
    System.out.println(name + ": Woof!");
  }
}

Dog rex = new Dog();   // створити об’єкт
rex.name = "Rex";
rex.bark();</pre>
<ul><li><code>new Dog()</code> створює новий об’єкт у пам’яті</li><li>Поля й методи викликаються через крапку</li><li>У кожного об’єкта — <b>свої</b> значення полів</li></ul>
<p>Метод <code>toString()</code> визначає, як об’єкт виглядає при виводі через <code>println</code>.</p>`,
        `<p><b>Класс</b> — это чертёж, <b>объект</b> — вещь, созданная по нему. Класс <code>Dog</code> описывает, что у каждой собаки есть имя и возраст и что она умеет лаять; конкретные Рекс и Бим — объекты.</p>
<pre class="inline-code">class Dog {
  String name;     // поля — данные объекта
  int age;

  void bark() {    // метод — поведение
    System.out.println(name + ": Woof!");
  }
}

Dog rex = new Dog();   // создать объект
rex.name = "Rex";
rex.bark();</pre>
<ul><li><code>new Dog()</code> создаёт новый объект в памяти</li><li>Поля и методы вызываются через точку</li><li>У каждого объекта — <b>свои</b> значения полей</li></ul>
<p>Метод <code>toString()</code> определяет, как объект выглядит при выводе через <code>println</code>.</p>`,
        `<p>A <b>class</b> is a blueprint; an <b>object</b> is a thing built from it. The <code>Dog</code> class says every dog has a name and age and can bark; specific dogs Rex and Bim are objects.</p>
<pre class="inline-code">class Dog {
  String name;     // fields — the object’s data
  int age;

  void bark() {    // a method — behaviour
    System.out.println(name + ": Woof!");
  }
}

Dog rex = new Dog();   // create an object
rex.name = "Rex";
rex.bark();</pre>
<ul><li><code>new Dog()</code> creates a new object in memory</li><li>Fields and methods are accessed with a dot</li><li>Each object has <b>its own</b> field values</li></ul>
<p>The <code>toString()</code> method controls how an object looks when printed with <code>println</code>.</p>`),
      why: L(`<p>Чому ООП? Великі програми моделюють реальний світ: гравці, предмети, замовлення. Клас тримає дані й дії над ними <b>разом</b>, тож замість десятка паралельних масивів <code>names[]</code>, <code>ages[]</code> у тебе масив об’єктів <code>Dog[]</code>, і нічого не роз’їдеться.</p>`,
        `<p>Почему ООП? Большие программы моделируют реальный мир: игроки, предметы, заказы. Класс держит данные и действия над ними <b>вместе</b>, так что вместо десятка параллельных массивов <code>names[]</code>, <code>ages[]</code> у тебя массив объектов <code>Dog[]</code>, и ничего не разъедется.</p>`,
        `<p>Why OOP? Big programs model the real world: players, items, orders. A class keeps data and the actions on it <b>together</b>, so instead of a dozen parallel arrays <code>names[]</code>, <code>ages[]</code> you have one <code>Dog[]</code> array and nothing gets out of sync.</p>`),
      mistakes: L(`<ul><li>Оголосити <code>Dog d;</code> і викликати <code>d.bark()</code> без <code>new</code> — <code>NullPointerException</code>.</li><li>Два <code>public</code> класи в одному файлі — помилка. У Codry пиши допоміжні класи без <code>public</code>.</li></ul>`,
        `<ul><li>Объявить <code>Dog d;</code> и вызвать <code>d.bark()</code> без <code>new</code> — <code>NullPointerException</code>.</li><li>Два <code>public</code> класса в одном файле — ошибка. В Codry пиши вспомогательные классы без <code>public</code>.</li></ul>`,
        `<ul><li>Declaring <code>Dog d;</code> and calling <code>d.bark()</code> without <code>new</code> — <code>NullPointerException</code>.</li><li>Two <code>public</code> classes in one file is an error. In Codry write helper classes without <code>public</code>.</li></ul>`),
      examples: [
        { title: L('Клас Dog', 'Класс Dog', 'Dog class'), code: 'class Dog {\n  String name;\n  int age;\n\n  void bark() {\n    System.out.println(name + ": Woof!");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog rex = new Dog();\n    rex.name = "Rex";\n    rex.age = 3;\n    Dog bim = new Dog();\n    bim.name = "Bim";\n    rex.bark();\n    bim.bark();\n    System.out.println(rex.name + " is " + rex.age);\n  }\n}', note: L('Два об’єкти — свої дані.', 'Два объекта — свои данные.', 'Two objects, separate data.') },
        { title: 'toString', code: 'class Item {\n  String name;\n  int price;\n\n  public String toString() {\n    return name + " ($" + price + ")";\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Item sword = new Item();\n    sword.name = "Sword";\n    sword.price = 120;\n    System.out.println(sword);\n    System.out.println("You found: " + sword);\n  }\n}', note: L('println викликає toString сам.', 'println вызывает toString сам.', 'println calls toString itself.') },
        { title: L('Метод змінює поле', 'Метод меняет поле', 'Method changes a field'), code: 'class Counter {\n  int value;\n\n  void increment() {\n    value++;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Counter c = new Counter();\n    for (int i = 0; i < 5; i++) c.increment();\n    System.out.println(c.value);\n  }\n}', note: L('Об’єкт пам’ятає стан.', 'Объект помнит состояние.', 'The object remembers its state.') }
      ],
      task: {
        text: L('Створи клас <code>Player</code> з полями <code>String name</code>, <code>int score</code> і методами <code>void addPoints(int p)</code> та <code>toString()</code>, що повертає <code>NAME: SCORE pts</code>. У main створи двох гравців (<code>Alex</code>, <code>Ira</code>), дай Alex 10 і 15 очок, Ira — 30, і виведи обох.', 'Создай класс <code>Player</code> с полями <code>String name</code>, <code>int score</code> и методами <code>void addPoints(int p)</code> и <code>toString()</code>, возвращающим <code>NAME: SCORE pts</code>. В main создай двух игроков (<code>Alex</code>, <code>Ira</code>), дай Alex 10 и 15 очков, Ira — 30, и выведи обоих.', 'Create a <code>Player</code> class with fields <code>String name</code>, <code>int score</code> and methods <code>void addPoints(int p)</code> and <code>toString()</code> returning <code>NAME: SCORE pts</code>. In main create two players (<code>Alex</code>, <code>Ira</code>), give Alex 10 and 15 points and Ira 30, then print both.'),
        how: [L('Клас <code>Player</code> — над <code>public class Main</code>, без <code>public</code>.', 'Класс <code>Player</code> — над <code>public class Main</code>, без <code>public</code>.', 'Put <code>Player</code> above <code>public class Main</code>, without <code>public</code>.'), L('<code>public String toString() { return name + ": " + score + " pts"; }</code>', '<code>public String toString() { return name + ": " + score + " pts"; }</code>', '<code>public String toString() { return name + ": " + score + " pts"; }</code>')],
        starter: 'class Player {\n  // поля й методи\n}\n\npublic class Main {\n  public static void main(String[] args) {\n  }\n}',
        solution: 'class Player {\n  String name;\n  int score;\n\n  void addPoints(int p) {\n    score += p;\n  }\n\n  public String toString() {\n    return name + ": " + score + " pts";\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Player alex = new Player();\n    alex.name = "Alex";\n    Player ira = new Player();\n    ira.name = "Ira";\n    alex.addPoints(10);\n    alex.addPoints(15);\n    ira.addPoints(30);\n    System.out.println(alex);\n    System.out.println(ira);\n  }\n}',
        hint: L('Нове поле <code>int</code> стартує з 0.', 'Новое поле <code>int</code> стартует с 0.', 'A new <code>int</code> field starts at 0.'),
        expected: 'Alex: 25 pts\nIra: 30 pts',
        must: /class\s+Player[\s\S]*addPoints[\s\S]*toString/
      },
      quiz: { q: L('Що створює <code>new Player()</code>?', 'Что создаёт <code>new Player()</code>?', 'What does <code>new Player()</code> create?'), options: [L('новий клас', 'новый класс', 'a new class'), L('новий об’єкт', 'новый объект', 'a new object'), L('новий метод', 'новый метод', 'a new method')], answer: 1, explain: L('Об’єкт за кресленням класу.', 'Объект по чертежу класса.', 'An object from the class blueprint.') },
      ref: [{ code: 'class A { int x; void m() { } }', d: L('клас', 'класс', 'class') }, { code: 'A a = new A();', d: L('об’єкт', 'объект', 'object') }, { code: 'public String toString()', d: L('текстовий вигляд', 'текстовый вид', 'text form') }]
    },
    {
      id: 'constructors', chapter: CH3,
      title: L('Конструктори та інкапсуляція', 'Конструкторы и инкапсуляция', 'Constructors and encapsulation'),
      theory: L(
        `<p><b>Конструктор</b> — спеціальний метод з іменем класу, який викликається при <code>new</code> і задає початкові значення:</p>
<pre class="inline-code">class Account {
  private String owner;
  private double balance;

  Account(String owner, double balance) {
    this.owner = owner;       // this.owner — поле, owner — параметр
    this.balance = balance;
  }

  double getBalance() { return balance; }

  void deposit(double amount) {
    if (amount > 0) balance += amount;
  }
}</pre>
<p><b>Інкапсуляція</b>: поля роблять <code>private</code> (доступні лише всередині класу), а назовні дають методи — <b>гетери</b> (<code>getBalance()</code>) і методи з перевірками (<code>deposit</code>). Так ніхто не зможе написати <code>acc.balance = -1000000</code>.</p>
<p>Модифікатори доступу: <code>private</code> — лише цей клас, <code>public</code> — усі, без слова — у межах пакета.</p>`,
        `<p><b>Конструктор</b> — специальный метод с именем класса, который вызывается при <code>new</code> и задаёт начальные значения:</p>
<pre class="inline-code">class Account {
  private String owner;
  private double balance;

  Account(String owner, double balance) {
    this.owner = owner;       // this.owner — поле, owner — параметр
    this.balance = balance;
  }

  double getBalance() { return balance; }

  void deposit(double amount) {
    if (amount > 0) balance += amount;
  }
}</pre>
<p><b>Инкапсуляция</b>: поля делают <code>private</code> (доступны только внутри класса), а наружу дают методы — <b>геттеры</b> (<code>getBalance()</code>) и методы с проверками (<code>deposit</code>). Так никто не сможет написать <code>acc.balance = -1000000</code>.</p>
<p>Модификаторы доступа: <code>private</code> — только этот класс, <code>public</code> — все, без слова — в пределах пакета.</p>`,
        `<p>A <b>constructor</b> is a special method named after the class, called by <code>new</code> to set initial values:</p>
<pre class="inline-code">class Account {
  private String owner;
  private double balance;

  Account(String owner, double balance) {
    this.owner = owner;       // this.owner is the field, owner the parameter
    this.balance = balance;
  }

  double getBalance() { return balance; }

  void deposit(double amount) {
    if (amount > 0) balance += amount;
  }
}</pre>
<p><b>Encapsulation</b>: make fields <code>private</code> (visible only inside the class) and expose methods — <b>getters</b> (<code>getBalance()</code>) and methods with checks (<code>deposit</code>). Then nobody can write <code>acc.balance = -1000000</code>.</p>
<p>Access modifiers: <code>private</code> — this class only, <code>public</code> — everyone, none — within the package.</p>`),
      why: L(`<p>Інкапсуляція — це «захист від дурня» і від себе через пів року. Якщо баланс змінюється лише через <code>deposit</code> і <code>withdraw</code>, то правило «не можна зняти більше, ніж є» записане в <b>одному місці</b> і виконується завжди. Банки, ігри й магазини тримаються саме на цьому.</p>`,
        `<p>Инкапсуляция — это «защита от дурака» и от себя через полгода. Если баланс меняется только через <code>deposit</code> и <code>withdraw</code>, то правило «нельзя снять больше, чем есть» записано в <b>одном месте</b> и выполняется всегда. Банки, игры и магазины держатся именно на этом.</p>`,
        `<p>Encapsulation is protection against mistakes — including your own six months later. If the balance only changes via <code>deposit</code> and <code>withdraw</code>, the rule “can’t withdraw more than you have” lives in <b>one place</b> and always holds. Banks, games and shops rely on exactly this.</p>`),
      mistakes: L(`<ul><li>У конструкторі <code>owner = owner;</code> без <code>this</code> — параметр присвоюється сам собі, поле лишається null.</li><li>Конструктору не пишуть тип результату: <code>void Account(...)</code> — це вже звичайний метод!</li></ul>`,
        `<ul><li>В конструкторе <code>owner = owner;</code> без <code>this</code> — параметр присваивается сам себе, поле остаётся null.</li><li>Конструктору не пишут тип результата: <code>void Account(...)</code> — это уже обычный метод!</li></ul>`,
        `<ul><li><code>owner = owner;</code> without <code>this</code> assigns the parameter to itself; the field stays null.</li><li>Constructors have no return type: <code>void Account(...)</code> is an ordinary method!</li></ul>`),
      examples: [
        { title: L('Конструктор', 'Конструктор', 'Constructor'), code: 'class Hero {\n  String name;\n  int hp;\n\n  Hero(String name, int hp) {\n    this.name = name;\n    this.hp = hp;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Hero h = new Hero("Knight", 120);\n    System.out.println(h.name + " " + h.hp);\n  }\n}', note: L('Значення задаються одразу при new.', 'Значения задаются сразу при new.', 'Values are set right at new.') },
        { title: L('private + перевірки', 'private + проверки', 'private + checks'), code: 'class Account {\n  private double balance;\n\n  double getBalance() { return balance; }\n\n  boolean withdraw(double amount) {\n    if (amount <= 0 || amount > balance) return false;\n    balance -= amount;\n    return true;\n  }\n\n  void deposit(double amount) {\n    if (amount > 0) balance += amount;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Account a = new Account();\n    a.deposit(100);\n    System.out.println(a.withdraw(30) + " " + a.getBalance());\n    System.out.println(a.withdraw(500) + " " + a.getBalance());\n    a.deposit(-50);\n    System.out.println(a.getBalance());\n  }\n}', note: L('Некоректні операції відхиляються.', 'Некорректные операции отклоняются.', 'Invalid operations are rejected.') },
        { title: L('Кілька конструкторів', 'Несколько конструкторов', 'Several constructors'), code: 'class Point {\n  int x, y;\n\n  Point() {\n    this(0, 0);\n  }\n\n  Point(int x, int y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  public String toString() { return "(" + x + ", " + y + ")"; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(new Point());\n    System.out.println(new Point(3, 4));\n  }\n}', note: L('<code>this(…)</code> викликає інший конструктор.', '<code>this(…)</code> вызывает другой конструктор.', '<code>this(…)</code> calls another constructor.') }
      ],
      task: {
        text: L('Створи клас <code>Inventory</code> з <code>private int capacity</code> і <code>private int items</code>. Конструктор приймає місткість. Метод <code>boolean add(int n)</code> додає предмети, лише якщо вони вміщаються, інакше повертає false. Гетер <code>getItems()</code>. Місткість 10: додай 4, 5, 3 і виведи результат кожного виклику, а потім <code>Items: 9/10</code>.', 'Создай класс <code>Inventory</code> с <code>private int capacity</code> и <code>private int items</code>. Конструктор принимает вместимость. Метод <code>boolean add(int n)</code> добавляет предметы, только если они помещаются, иначе возвращает false. Геттер <code>getItems()</code>. Вместимость 10: добавь 4, 5, 3 и выведи результат каждого вызова, а затем <code>Items: 9/10</code>.', 'Create an <code>Inventory</code> class with <code>private int capacity</code> and <code>private int items</code>. The constructor takes the capacity. <code>boolean add(int n)</code> adds items only if they fit, otherwise returns false. A getter <code>getItems()</code>. With capacity 10: add 4, 5, 3, print each call’s result, then <code>Items: 9/10</code>.'),
        how: [L('<code>if (items + n > capacity) return false;</code>', '<code>if (items + n > capacity) return false;</code>', '<code>if (items + n > capacity) return false;</code>'), L('Для виводу місткості додай гетер <code>getCapacity()</code>.', 'Для вывода вместимости добавь геттер <code>getCapacity()</code>.', 'Add a <code>getCapacity()</code> getter to print capacity.')],
        starter: 'class Inventory {\n  private int capacity;\n  private int items;\n}\n\npublic class Main {\n  public static void main(String[] args) {\n  }\n}',
        solution: 'class Inventory {\n  private int capacity;\n  private int items;\n\n  Inventory(int capacity) {\n    this.capacity = capacity;\n  }\n\n  boolean add(int n) {\n    if (n <= 0 || items + n > capacity) return false;\n    items += n;\n    return true;\n  }\n\n  int getItems() { return items; }\n  int getCapacity() { return capacity; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Inventory inv = new Inventory(10);\n    System.out.println(inv.add(4));\n    System.out.println(inv.add(5));\n    System.out.println(inv.add(3));\n    System.out.println("Items: " + inv.getItems() + "/" + inv.getCapacity());\n  }\n}',
        hint: L('Очікувано: true, true, false, Items: 9/10.', 'Ожидается: true, true, false, Items: 9/10.', 'Expected: true, true, false, Items: 9/10.'),
        expected: 'true\ntrue\nfalse\nItems: 9/10',
        must: /private\s+int\s+items[\s\S]*Inventory\s*\(\s*int/
      },
      quiz: { q: L('Навіщо <code>this.name = name</code>?', 'Зачем <code>this.name = name</code>?', 'Why <code>this.name = name</code>?'), options: [L('щоб розрізнити поле й параметр', 'чтобы различить поле и параметр', 'to tell the field from the parameter'), L('щоб пришвидшити код', 'чтобы ускорить код', 'to speed things up'), L('так вимагає println', 'так требует println', 'println needs it')], answer: 0, explain: L('this — поточний об’єкт.', 'this — текущий объект.', 'this is the current object.') },
      ref: [{ code: 'A(int x) { this.x = x; }', d: L('конструктор', 'конструктор', 'constructor') }, { code: 'private int x; int getX()', d: L('інкапсуляція', 'инкапсуляция', 'encapsulation') }]
    },
    {
      id: 'inheritance', chapter: CH3,
      title: L('Наслідування й поліморфізм', 'Наследование и полиморфизм', 'Inheritance and polymorphism'),
      theory: L(
        `<p><b>Наслідування</b> дозволяє створити клас на основі іншого: дочірній клас отримує всі поля й методи батьківського і додає свої.</p>
<pre class="inline-code">class Animal {
  String name;
  Animal(String name) { this.name = name; }
  String sound() { return "..."; }
}

class Cat extends Animal {
  Cat(String name) { super(name); }   // виклик конструктора батька
  @Override
  String sound() { return "Meow"; }   // перевизначення
}</pre>
<p><b>Поліморфізм</b> — змінна батьківського типу може зберігати будь-якого нащадка, а метод виконається «свій»:</p>
<pre class="inline-code">Animal[] zoo = { new Cat("Tom"), new Dog("Rex") };
for (Animal a : zoo) System.out.println(a.sound());</pre>
<p><code>abstract class</code> — клас-шаблон, з якого не можна створити об’єкт, лише наслідувати. <code>@Override</code> просить компілятор перевірити, що метод справді перевизначає батьківський.</p>`,
        `<p><b>Наследование</b> позволяет создать класс на основе другого: дочерний класс получает все поля и методы родительского и добавляет свои.</p>
<pre class="inline-code">class Animal {
  String name;
  Animal(String name) { this.name = name; }
  String sound() { return "..."; }
}

class Cat extends Animal {
  Cat(String name) { super(name); }   // вызов конструктора родителя
  @Override
  String sound() { return "Meow"; }   // переопределение
}</pre>
<p><b>Полиморфизм</b> — переменная родительского типа может хранить любого наследника, а метод выполнится «свой»:</p>
<pre class="inline-code">Animal[] zoo = { new Cat("Tom"), new Dog("Rex") };
for (Animal a : zoo) System.out.println(a.sound());</pre>
<p><code>abstract class</code> — класс-шаблон, из которого нельзя создать объект, только наследовать. <code>@Override</code> просит компилятор проверить, что метод действительно переопределяет родительский.</p>`,
        `<p><b>Inheritance</b> builds a class on top of another: the child gets all of the parent’s fields and methods and adds its own.</p>
<pre class="inline-code">class Animal {
  String name;
  Animal(String name) { this.name = name; }
  String sound() { return "..."; }
}

class Cat extends Animal {
  Cat(String name) { super(name); }   // call the parent constructor
  @Override
  String sound() { return "Meow"; }   // override
}</pre>
<p><b>Polymorphism</b>: a parent-type variable can hold any child, and the child’s own method runs:</p>
<pre class="inline-code">Animal[] zoo = { new Cat("Tom"), new Dog("Rex") };
for (Animal a : zoo) System.out.println(a.sound());</pre>
<p>An <code>abstract class</code> is a template you can’t instantiate, only extend. <code>@Override</code> asks the compiler to verify the method really overrides the parent’s.</p>`),
      why: L(`<p>Поліморфізм дозволяє писати код, який працює з речами, <b>яких ще не існує</b>. Цикл «для кожного ворога викликати attack()» не зміниться, коли ти додаси дракона чи робота — просто напишеш новий клас. Саме так Minecraft підтримує сотні видів мобів.</p>`,
        `<p>Полиморфизм позволяет писать код, который работает с вещами, <b>которых ещё не существует</b>. Цикл «для каждого врага вызвать attack()» не изменится, когда ты добавишь дракона или робота — просто напишешь новый класс. Именно так Minecraft поддерживает сотни видов мобов.</p>`,
        `<p>Polymorphism lets you write code that works with things <b>that don’t exist yet</b>. The loop “for each enemy call attack()” doesn’t change when you add a dragon or a robot — you just write a new class. That’s how Minecraft supports hundreds of mob types.</p>`),
      mistakes: L(`<ul><li>Забути <code>super(…)</code>, якщо в батька немає конструктора без параметрів, — помилка компіляції.</li><li>Опечатка в імені методу без <code>@Override</code> — створиться новий метод, а перевизначення не буде.</li></ul>`,
        `<ul><li>Забыть <code>super(…)</code>, если у родителя нет конструктора без параметров, — ошибка компиляции.</li><li>Опечатка в имени метода без <code>@Override</code> — создастся новый метод, а переопределения не будет.</li></ul>`,
        `<ul><li>Forgetting <code>super(…)</code> when the parent has no no-arg constructor — a compile error.</li><li>A typo in a method name without <code>@Override</code> creates a new method instead of overriding.</li></ul>`),
      examples: [
        { title: 'extends', code: 'class Animal {\n  String name;\n  Animal(String name) { this.name = name; }\n  String sound() { return "..."; }\n  void speak() { System.out.println(name + ": " + sound()); }\n}\n\nclass Cat extends Animal {\n  Cat(String name) { super(name); }\n  @Override\n  String sound() { return "Meow"; }\n}\n\nclass Dog extends Animal {\n  Dog(String name) { super(name); }\n  @Override\n  String sound() { return "Woof"; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal[] zoo = { new Cat("Tom"), new Dog("Rex"), new Animal("Fish") };\n    for (Animal a : zoo) a.speak();\n  }\n}', note: L('speak() — спільний, sound() — свій.', 'speak() — общий, sound() — свой.', 'speak() is shared, sound() differs.') },
        { title: 'abstract', code: 'abstract class Shape {\n  abstract double area();\n  public String toString() { return getClass().getSimpleName() + " " + String.format("%.1f", area()); }\n}\n\nclass Circle extends Shape {\n  double r;\n  Circle(double r) { this.r = r; }\n  double area() { return Math.PI * r * r; }\n}\n\nclass Rect extends Shape {\n  double w, h;\n  Rect(double w, double h) { this.w = w; this.h = h; }\n  double area() { return w * h; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Shape[] shapes = { new Circle(1), new Rect(2, 3) };\n    for (Shape s : shapes) System.out.println(s);\n  }\n}', note: L('Абстрактний метод зобов’язує нащадків.', 'Абстрактный метод обязывает наследников.', 'An abstract method obliges children.') },
        { title: 'super.method()', code: 'class Enemy {\n  int hp = 50;\n  String info() { return "hp=" + hp; }\n}\n\nclass Boss extends Enemy {\n  int shield = 30;\n  @Override\n  String info() { return super.info() + ", shield=" + shield; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(new Enemy().info());\n    System.out.println(new Boss().info());\n  }\n}', note: L('super.info() — версія батька.', 'super.info() — версия родителя.', 'super.info() is the parent’s version.') }
      ],
      task: {
        text: L('Створи клас <code>Enemy</code> з полем <code>name</code>, конструктором і методом <code>int attack()</code>, що повертає 5. Нащадки: <code>Goblin</code> (attack 8) і <code>Dragon</code> (attack 25). У main у масиві <code>Enemy[]</code> — Goblin «Grub», Dragon «Smaug», Enemy «Slime». Виведи для кожного <code>NAME attacks for N</code> і загальну шкоду <code>Total: 38</code>.', 'Создай класс <code>Enemy</code> с полем <code>name</code>, конструктором и методом <code>int attack()</code>, возвращающим 5. Наследники: <code>Goblin</code> (attack 8) и <code>Dragon</code> (attack 25). В main в массиве <code>Enemy[]</code> — Goblin «Grub», Dragon «Smaug», Enemy «Slime». Выведи для каждого <code>NAME attacks for N</code> и общий урон <code>Total: 38</code>.', 'Create an <code>Enemy</code> class with a <code>name</code> field, a constructor and <code>int attack()</code> returning 5. Children: <code>Goblin</code> (attack 8) and <code>Dragon</code> (attack 25). In main put Goblin “Grub”, Dragon “Smaug” and Enemy “Slime” in an <code>Enemy[]</code>. Print <code>NAME attacks for N</code> for each and the total <code>Total: 38</code>.'),
        how: [L('<code>class Goblin extends Enemy { Goblin(String n) { super(n); } @Override int attack() { return 8; } }</code>', '<code>class Goblin extends Enemy { Goblin(String n) { super(n); } @Override int attack() { return 8; } }</code>', '<code>class Goblin extends Enemy { Goblin(String n) { super(n); } @Override int attack() { return 8; } }</code>')],
        starter: 'class Enemy {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n  }\n}',
        solution: 'class Enemy {\n  String name;\n  Enemy(String name) { this.name = name; }\n  int attack() { return 5; }\n}\n\nclass Goblin extends Enemy {\n  Goblin(String name) { super(name); }\n  @Override\n  int attack() { return 8; }\n}\n\nclass Dragon extends Enemy {\n  Dragon(String name) { super(name); }\n  @Override\n  int attack() { return 25; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Enemy[] enemies = { new Goblin("Grub"), new Dragon("Smaug"), new Enemy("Slime") };\n    int total = 0;\n    for (Enemy e : enemies) {\n      int dmg = e.attack();\n      total += dmg;\n      System.out.println(e.name + " attacks for " + dmg);\n    }\n    System.out.println("Total: " + total);\n  }\n}',
        hint: L('8 + 25 + 5 = 38.', '8 + 25 + 5 = 38.', '8 + 25 + 5 = 38.'),
        expected: 'Grub attacks for 8\nSmaug attacks for 25\nSlime attacks for 5\nTotal: 38',
        must: /extends\s+Enemy[\s\S]*extends\s+Enemy/
      },
      quiz: { q: L('Що робить <code>super(name)</code>?', 'Что делает <code>super(name)</code>?', 'What does <code>super(name)</code> do?'), options: [L('викликає конструктор батька', 'вызывает конструктор родителя', 'calls the parent constructor'), L('створює новий клас', 'создаёт новый класс', 'creates a new class'), L('видаляє об’єкт', 'удаляет объект', 'deletes the object')], answer: 0, explain: L('Ініціалізує батьківську частину.', 'Инициализирует родительскую часть.', 'It initialises the parent part.') },
      ref: [{ code: 'class B extends A', d: L('наслідування', 'наследование', 'inheritance') }, { code: '@Override', d: L('перевизначення', 'переопределение', 'override') }, { code: 'abstract class / abstract method', d: L('шаблон', 'шаблон', 'template') }]
    },
    {
      id: 'interfaces', chapter: CH3,
      title: L('Інтерфейси', 'Интерфейсы', 'Interfaces'),
      theory: L(
        `<p><b>Інтерфейс</b> — це контракт: перелік методів, які клас <b>зобов’язується</b> реалізувати. Він описує «що вміє», а не «що це таке».</p>
<pre class="inline-code">interface Payable {
  double cost();
}

class Pizza implements Payable {
  public double cost() { return 8.5; }
}

class Ticket implements Payable {
  public double cost() { return 12; }
}</pre>
<ul><li>Клас може наслідувати <b>один</b> клас, але реалізувати <b>багато</b> інтерфейсів: <code>class Duck implements Flyable, Swimmable</code></li><li>Методи інтерфейсу завжди <code>public</code></li><li><code>default</code>-метод має готову реалізацію в самому інтерфейсі</li></ul>
<p>Стандартний приклад — <code>Comparable&lt;T&gt;</code>: реалізуй <code>compareTo</code>, і об’єкти можна сортувати.</p>`,
        `<p><b>Интерфейс</b> — это контракт: перечень методов, которые класс <b>обязуется</b> реализовать. Он описывает «что умеет», а не «что это такое».</p>
<pre class="inline-code">interface Payable {
  double cost();
}

class Pizza implements Payable {
  public double cost() { return 8.5; }
}

class Ticket implements Payable {
  public double cost() { return 12; }
}</pre>
<ul><li>Класс может наследовать <b>один</b> класс, но реализовать <b>много</b> интерфейсов: <code>class Duck implements Flyable, Swimmable</code></li><li>Методы интерфейса всегда <code>public</code></li><li><code>default</code>-метод имеет готовую реализацию в самом интерфейсе</li></ul>
<p>Стандартный пример — <code>Comparable&lt;T&gt;</code>: реализуй <code>compareTo</code>, и объекты можно сортировать.</p>`,
        `<p>An <b>interface</b> is a contract: a list of methods a class <b>promises</b> to implement. It describes “what it can do”, not “what it is”.</p>
<pre class="inline-code">interface Payable {
  double cost();
}

class Pizza implements Payable {
  public double cost() { return 8.5; }
}

class Ticket implements Payable {
  public double cost() { return 12; }
}</pre>
<ul><li>A class can extend <b>one</b> class but implement <b>many</b> interfaces: <code>class Duck implements Flyable, Swimmable</code></li><li>Interface methods are always <code>public</code></li><li>A <code>default</code> method has a ready implementation inside the interface</li></ul>
<p>A standard example is <code>Comparable&lt;T&gt;</code>: implement <code>compareTo</code> and objects become sortable.</p>`),
      why: L(`<p>Піца й квиток не мають нічого спільного — окрім того, що за них можна заплатити. Наслідування тут було б дивним («квиток — це різновид піци?»), а інтерфейс <code>Payable</code> дозволяє порахувати кошик із будь-яких товарів. Інтерфейси з’єднують непов’язані класи спільною здатністю.</p>`,
        `<p>У пиццы и билета нет ничего общего — кроме того, что за них можно заплатить. Наследование здесь было бы странным («билет — это разновидность пиццы?»), а интерфейс <code>Payable</code> позволяет посчитать корзину из любых товаров. Интерфейсы соединяют несвязанные классы общей способностью.</p>`,
        `<p>A pizza and a ticket have nothing in common — except you can pay for them. Inheritance would be odd here (“is a ticket a kind of pizza?”), but a <code>Payable</code> interface lets you total a cart of anything. Interfaces connect unrelated classes through a shared ability.</p>`),
      mistakes: L(`<ul><li>Реалізувати метод інтерфейсу без <code>public</code> — помилка <code>attempting to assign weaker access privileges</code>.</li><li>Не реалізувати всі методи інтерфейсу — клас доведеться зробити abstract.</li></ul>`,
        `<ul><li>Реализовать метод интерфейса без <code>public</code> — ошибка <code>attempting to assign weaker access privileges</code>.</li><li>Не реализовать все методы интерфейса — класс придётся сделать abstract.</li></ul>`,
        `<ul><li>Implementing an interface method without <code>public</code> — <code>attempting to assign weaker access privileges</code>.</li><li>Not implementing every method — the class would have to be abstract.</li></ul>`),
      examples: [
        { title: L('Кошик', 'Корзина', 'Cart'), code: 'interface Payable {\n  double cost();\n}\n\nclass Pizza implements Payable {\n  public double cost() { return 8.5; }\n}\n\nclass Ticket implements Payable {\n  public double cost() { return 12; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Payable[] cart = { new Pizza(), new Ticket(), new Pizza() };\n    double total = 0;\n    for (Payable p : cart) total += p.cost();\n    System.out.println("Total: " + total);\n  }\n}', note: L('Різні класи — один контракт.', 'Разные классы — один контракт.', 'Different classes, one contract.') },
        { title: L('Кілька інтерфейсів', 'Несколько интерфейсов', 'Several interfaces'), code: 'interface Flyable { String fly(); }\ninterface Swimmable { String swim(); }\n\nclass Duck implements Flyable, Swimmable {\n  public String fly() { return "Duck flies"; }\n  public String swim() { return "Duck swims"; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Duck d = new Duck();\n    System.out.println(d.fly());\n    System.out.println(d.swim());\n    Flyable f = d;\n    System.out.println(f instanceof Swimmable);\n  }\n}', note: L('Качка вміє і літати, і плавати.', 'Утка умеет и летать, и плавать.', 'A duck can fly and swim.') },
        { title: 'Comparable', code: 'import java.util.Arrays;\n\nclass Player implements Comparable<Player> {\n  String name;\n  int score;\n  Player(String n, int s) { name = n; score = s; }\n  public int compareTo(Player o) { return o.score - score; }\n  public String toString() { return name + "=" + score; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Player[] top = { new Player("Ira", 40), new Player("Max", 95), new Player("Alex", 70) };\n    Arrays.sort(top);\n    System.out.println(Arrays.toString(top));\n  }\n}', note: L('Сортування за спаданням очок.', 'Сортировка по убыванию очков.', 'Sorted by score, descending.') }
      ],
      task: {
        text: L('Створи інтерфейс <code>Describable</code> з методом <code>String describe()</code> і <code>default</code>-методом <code>String tag()</code>, що повертає <code>"[" + describe() + "]"</code>. Реалізуй його в класах <code>Book</code> (поле title, describe → <code>Book: TITLE</code>) і <code>Song</code> (поле artist, describe → <code>Song by ARTIST</code>). Виведи <code>tag()</code> для книжки «Dune» і пісні гурту «Queen».', 'Создай интерфейс <code>Describable</code> с методом <code>String describe()</code> и <code>default</code>-методом <code>String tag()</code>, возвращающим <code>"[" + describe() + "]"</code>. Реализуй его в классах <code>Book</code> (поле title, describe → <code>Book: TITLE</code>) и <code>Song</code> (поле artist, describe → <code>Song by ARTIST</code>). Выведи <code>tag()</code> для книги «Dune» и песни группы «Queen».', 'Create an interface <code>Describable</code> with <code>String describe()</code> and a <code>default</code> method <code>String tag()</code> returning <code>"[" + describe() + "]"</code>. Implement it in <code>Book</code> (field title, describe → <code>Book: TITLE</code>) and <code>Song</code> (field artist, describe → <code>Song by ARTIST</code>). Print <code>tag()</code> for the book “Dune” and a song by “Queen”.'),
        how: [L('<code>default String tag() { return "[" + describe() + "]"; }</code>', '<code>default String tag() { return "[" + describe() + "]"; }</code>', '<code>default String tag() { return "[" + describe() + "]"; }</code>'), L('Методи реалізації — <code>public</code>.', 'Методы реализации — <code>public</code>.', 'Implementing methods are <code>public</code>.')],
        starter: 'interface Describable {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n  }\n}',
        solution: 'interface Describable {\n  String describe();\n  default String tag() { return "[" + describe() + "]"; }\n}\n\nclass Book implements Describable {\n  String title;\n  Book(String title) { this.title = title; }\n  public String describe() { return "Book: " + title; }\n}\n\nclass Song implements Describable {\n  String artist;\n  Song(String artist) { this.artist = artist; }\n  public String describe() { return "Song by " + artist; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Describable[] things = { new Book("Dune"), new Song("Queen") };\n    for (Describable d : things) System.out.println(d.tag());\n  }\n}',
        hint: L('Очікувано: <code>[Book: Dune]</code>, <code>[Song by Queen]</code>.', 'Ожидается: <code>[Book: Dune]</code>, <code>[Song by Queen]</code>.', 'Expected: <code>[Book: Dune]</code>, <code>[Song by Queen]</code>.'),
        expected: '[Book: Dune]\n[Song by Queen]',
        must: /default\s+String\s+tag[\s\S]*implements\s+Describable/
      },
      quiz: { q: L('Скільки інтерфейсів може реалізувати клас?', 'Сколько интерфейсов может реализовать класс?', 'How many interfaces can a class implement?'), options: [L('лише один', 'только один', 'only one'), L('скільки завгодно', 'сколько угодно', 'any number'), L('жодного', 'ни одного', 'none')], answer: 1, explain: L('На відміну від наслідування класів.', 'В отличие от наследования классов.', 'Unlike class inheritance.') },
      ref: [{ code: 'interface I { void m(); }', d: L('контракт', 'контракт', 'contract') }, { code: 'class C implements I, J', d: L('реалізація', 'реализация', 'implementation') }, { code: 'default void m() { }', d: L('метод за замовчуванням', 'метод по умолчанию', 'default method') }]
    },
    {
      id: 'collections', chapter: CH4,
      title: L('ArrayList і HashMap', 'ArrayList и HashMap', 'ArrayList and HashMap'),
      theory: L(
        `<p>Масиви мають фіксовану довжину. Для даних, що ростуть, є <b>колекції</b> з <code>java.util</code>:</p>
<p><b>ArrayList</b> — список, що сам розширюється:</p>
<pre class="inline-code">ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add("milk");  list.add("bread");
list.get(0);       list.size();
list.remove("milk"); list.contains("bread");</pre>
<p><b>HashMap</b> — словник «ключ → значення»:</p>
<pre class="inline-code">HashMap&lt;String, Integer&gt; stock = new HashMap&lt;&gt;();
stock.put("apple", 10);
stock.get("apple");              // 10
stock.getOrDefault("kiwi", 0);   // 0
stock.containsKey("apple");
for (String key : stock.keySet()) { … }</pre>
<p>У кутових дужках <code>&lt;…&gt;</code> — <b>generic</b>-тип вмісту. Примітиви записують через «обгортки»: <code>Integer</code>, <code>Double</code>, <code>Boolean</code>. <code>TreeMap</code> — словник, відсортований за ключами.</p>`,
        `<p>Массивы имеют фиксированную длину. Для растущих данных есть <b>коллекции</b> из <code>java.util</code>:</p>
<p><b>ArrayList</b> — список, который сам расширяется:</p>
<pre class="inline-code">ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add("milk");  list.add("bread");
list.get(0);       list.size();
list.remove("milk"); list.contains("bread");</pre>
<p><b>HashMap</b> — словарь «ключ → значение»:</p>
<pre class="inline-code">HashMap&lt;String, Integer&gt; stock = new HashMap&lt;&gt;();
stock.put("apple", 10);
stock.get("apple");              // 10
stock.getOrDefault("kiwi", 0);   // 0
stock.containsKey("apple");
for (String key : stock.keySet()) { … }</pre>
<p>В угловых скобках <code>&lt;…&gt;</code> — <b>generic</b>-тип содержимого. Примитивы записывают через «обёртки»: <code>Integer</code>, <code>Double</code>, <code>Boolean</code>. <code>TreeMap</code> — словарь, отсортированный по ключам.</p>`,
        `<p>Arrays have a fixed length. For growing data there are <b>collections</b> in <code>java.util</code>:</p>
<p><b>ArrayList</b> — a list that grows by itself:</p>
<pre class="inline-code">ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add("milk");  list.add("bread");
list.get(0);       list.size();
list.remove("milk"); list.contains("bread");</pre>
<p><b>HashMap</b> — a “key → value” dictionary:</p>
<pre class="inline-code">HashMap&lt;String, Integer&gt; stock = new HashMap&lt;&gt;();
stock.put("apple", 10);
stock.get("apple");              // 10
stock.getOrDefault("kiwi", 0);   // 0
stock.containsKey("apple");
for (String key : stock.keySet()) { … }</pre>
<p>The angle brackets <code>&lt;…&gt;</code> hold the <b>generic</b> content type. Primitives use wrappers: <code>Integer</code>, <code>Double</code>, <code>Boolean</code>. <code>TreeMap</code> is a dictionary sorted by key.</p>`),
      why: L(`<p>HashMap шукає значення за ключем <b>миттєво</b>, навіть серед мільйона записів, — бо обчислює місце зберігання з самого ключа (хеш). Пошук у списку перебирав би всі елементи. Тому словники — це інвентарі, бази користувачів, кеші, лічильники слів.</p>`,
        `<p>HashMap находит значение по ключу <b>мгновенно</b>, даже среди миллиона записей, — потому что вычисляет место хранения из самого ключа (хеш). Поиск в списке перебирал бы все элементы. Поэтому словари — это инвентари, базы пользователей, кэши, счётчики слов.</p>`,
        `<p>HashMap finds a value by key <b>instantly</b>, even among a million entries, because it computes the storage slot from the key itself (a hash). Searching a list would scan every element. That’s why dictionaries power inventories, user databases, caches and word counters.</p>`),
      mistakes: L(`<ul><li><code>ArrayList&lt;int&gt;</code> — помилка, потрібно <code>ArrayList&lt;Integer&gt;</code>.</li><li><code>map.get("x")</code> для відсутнього ключа повертає <code>null</code>; при присвоєнні в <code>int</code> — <code>NullPointerException</code>. Використовуй <code>getOrDefault</code>.</li><li>Порядок у <code>HashMap</code> не гарантований — для сортування бери <code>TreeMap</code>.</li></ul>`,
        `<ul><li><code>ArrayList&lt;int&gt;</code> — ошибка, нужно <code>ArrayList&lt;Integer&gt;</code>.</li><li><code>map.get("x")</code> для отсутствующего ключа возвращает <code>null</code>; при присвоении в <code>int</code> — <code>NullPointerException</code>. Используй <code>getOrDefault</code>.</li><li>Порядок в <code>HashMap</code> не гарантирован — для сортировки бери <code>TreeMap</code>.</li></ul>`,
        `<ul><li><code>ArrayList&lt;int&gt;</code> is an error; use <code>ArrayList&lt;Integer&gt;</code>.</li><li><code>map.get("x")</code> for a missing key returns <code>null</code>; assigning it to an <code>int</code> throws <code>NullPointerException</code>. Use <code>getOrDefault</code>.</li><li><code>HashMap</code> order isn’t guaranteed — use <code>TreeMap</code> for sorted keys.</li></ul>`),
      examples: [
        { title: 'ArrayList', code: M('ArrayList<String> todo = new ArrayList<>();\ntodo.add("Homework");\ntodo.add("Gym");\ntodo.add("Read");\ntodo.remove("Gym");\ntodo.add(0, "Breakfast");\nSystem.out.println(todo);\nSystem.out.println(todo.size() + " tasks, first: " + todo.get(0));', 'import java.util.ArrayList;'), note: L('Список росте й зменшується.', 'Список растёт и уменьшается.', 'The list grows and shrinks.') },
        { title: 'HashMap', code: M('HashMap<String, Integer> stock = new HashMap<>();\nstock.put("apple", 10);\nstock.put("pear", 4);\nstock.put("apple", stock.get("apple") - 3);\nSystem.out.println(stock.get("apple"));\nSystem.out.println(stock.getOrDefault("kiwi", 0));\nSystem.out.println(stock.containsKey("pear"));', 'import java.util.HashMap;'), note: L('put з тим самим ключем перезаписує.', 'put с тем же ключом перезаписывает.', 'put with the same key overwrites.') },
        { title: L('Лічильник слів', 'Счётчик слов', 'Word counter'), code: M('String text = "to be or not to be";\nTreeMap<String, Integer> count = new TreeMap<>();\nfor (String w : text.split(" ")) {\n  count.put(w, count.getOrDefault(w, 0) + 1);\n}\nfor (String w : count.keySet()) {\n  System.out.println(w + ": " + count.get(w));\n}', 'import java.util.TreeMap;'), note: L('TreeMap — ключі за алфавітом.', 'TreeMap — ключи по алфавиту.', 'TreeMap keeps keys sorted.') },
        { title: L('Список об’єктів', 'Список объектов', 'List of objects'), code: 'import java.util.ArrayList;\n\nclass Task {\n  String title;\n  boolean done;\n  Task(String t) { title = t; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<Task> tasks = new ArrayList<>();\n    tasks.add(new Task("Code"));\n    tasks.add(new Task("Sleep"));\n    tasks.get(0).done = true;\n    for (Task t : tasks) System.out.println((t.done ? "[x] " : "[ ] ") + t.title);\n  }\n}', note: L('Колекції зберігають будь-які об’єкти.', 'Коллекции хранят любые объекты.', 'Collections hold any objects.') }
      ],
      task: {
        text: L('Голосування: є масив голосів <code>{"cats", "dogs", "cats", "fish", "dogs", "cats"}</code>. Порахуй голоси в <code>TreeMap&lt;String, Integer&gt;</code>, виведи кожен варіант <code>NAME: N</code> (за алфавітом) і переможця <code>Winner: cats</code>.', 'Голосование: есть массив голосов <code>{"cats", "dogs", "cats", "fish", "dogs", "cats"}</code>. Посчитай голоса в <code>TreeMap&lt;String, Integer&gt;</code>, выведи каждый вариант <code>NAME: N</code> (по алфавиту) и победителя <code>Winner: cats</code>.', 'A vote: the array <code>{"cats", "dogs", "cats", "fish", "dogs", "cats"}</code>. Count votes in a <code>TreeMap&lt;String, Integer&gt;</code>, print each option <code>NAME: N</code> (alphabetically) and the winner <code>Winner: cats</code>.'),
        how: [L('<code>votes.put(v, votes.getOrDefault(v, 0) + 1);</code>', '<code>votes.put(v, votes.getOrDefault(v, 0) + 1);</code>', '<code>votes.put(v, votes.getOrDefault(v, 0) + 1);</code>'), L('Переможця шукай у тому ж циклі виводу.', 'Победителя ищи в том же цикле вывода.', 'Find the winner in the same output loop.')],
        starter: M('String[] ballots = {"cats", "dogs", "cats", "fish", "dogs", "cats"};\n', 'import java.util.TreeMap;'),
        solution: M('String[] ballots = {"cats", "dogs", "cats", "fish", "dogs", "cats"};\nTreeMap<String, Integer> votes = new TreeMap<>();\nfor (String v : ballots) {\n  votes.put(v, votes.getOrDefault(v, 0) + 1);\n}\nString winner = null;\nfor (String option : votes.keySet()) {\n  int n = votes.get(option);\n  System.out.println(option + ": " + n);\n  if (winner == null || n > votes.get(winner)) winner = option;\n}\nSystem.out.println("Winner: " + winner);', 'import java.util.TreeMap;'),
        hint: L('cats: 3, dogs: 2, fish: 1.', 'cats: 3, dogs: 2, fish: 1.', 'cats: 3, dogs: 2, fish: 1.'),
        expected: 'cats: 3\ndogs: 2\nfish: 1\nWinner: cats',
        must: /Map\s*</
      },
      quiz: { q: L('Що поверне <code>map.get(k)</code> для відсутнього ключа?', 'Что вернёт <code>map.get(k)</code> для отсутствующего ключа?', 'What does <code>map.get(k)</code> return for a missing key?'), options: ['0', 'null', L('помилку', 'ошибку', 'an error')], answer: 1, explain: L('Тому зручний getOrDefault.', 'Поэтому удобен getOrDefault.', 'That’s why getOrDefault is handy.') },
      ref: [{ code: 'ArrayList<T>: add get set remove size', d: L('список', 'список', 'list') }, { code: 'HashMap<K,V>: put get getOrDefault containsKey keySet', d: L('словник', 'словарь', 'dictionary') }]
    },
    {
      id: 'exceptions', chapter: CH4,
      title: L('Винятки: try, catch, throw', 'Исключения: try, catch, throw', 'Exceptions: try, catch, throw'),
      theory: L(
        `<p>Коли щось іде не так (ділення на нуль, неправильне число, вихід за межі масиву), Java <b>кидає виняток</b>. Якщо його не перехопити, програма впаде.</p>
<pre class="inline-code">try {
  int n = Integer.parseInt("12a");
} catch (NumberFormatException e) {
  System.out.println("Not a number: " + e.getMessage());
} finally {
  System.out.println("Always runs");
}</pre>
<ul><li><code>try</code> — небезпечний код, <code>catch</code> — що робити при помилці, <code>finally</code> — виконується завжди</li><li>Поширені: <code>ArithmeticException</code>, <code>NumberFormatException</code>, <code>ArrayIndexOutOfBoundsException</code>, <code>NullPointerException</code></li><li>Свій виняток: <code>throw new IllegalArgumentException("Age must be positive");</code></li></ul>`,
        `<p>Когда что-то идёт не так (деление на ноль, неправильное число, выход за границы массива), Java <b>бросает исключение</b>. Если его не перехватить, программа упадёт.</p>
<pre class="inline-code">try {
  int n = Integer.parseInt("12a");
} catch (NumberFormatException e) {
  System.out.println("Not a number: " + e.getMessage());
} finally {
  System.out.println("Always runs");
}</pre>
<ul><li><code>try</code> — опасный код, <code>catch</code> — что делать при ошибке, <code>finally</code> — выполняется всегда</li><li>Частые: <code>ArithmeticException</code>, <code>NumberFormatException</code>, <code>ArrayIndexOutOfBoundsException</code>, <code>NullPointerException</code></li><li>Своё исключение: <code>throw new IllegalArgumentException("Age must be positive");</code></li></ul>`,
        `<p>When something goes wrong (division by zero, a bad number, an index out of bounds), Java <b>throws an exception</b>. If nobody catches it, the program crashes.</p>
<pre class="inline-code">try {
  int n = Integer.parseInt("12a");
} catch (NumberFormatException e) {
  System.out.println("Not a number: " + e.getMessage());
} finally {
  System.out.println("Always runs");
}</pre>
<ul><li><code>try</code> holds risky code, <code>catch</code> handles the error, <code>finally</code> always runs</li><li>Common ones: <code>ArithmeticException</code>, <code>NumberFormatException</code>, <code>ArrayIndexOutOfBoundsException</code>, <code>NullPointerException</code></li><li>Throw your own: <code>throw new IllegalArgumentException("Age must be positive");</code></li></ul>`),
      why: L(`<p>Чому винятки, а не просто <code>return -1</code>? Код помилки легко проігнорувати, і програма продовжить працювати з неправильними даними. Виняток <b>неможливо не помітити</b>: або ти його обробиш, або програма зупиниться й покаже, де саме проблема.</p>`,
        `<p>Почему исключения, а не просто <code>return -1</code>? Код ошибки легко проигнорировать, и программа продолжит работать с неправильными данными. Исключение <b>невозможно не заметить</b>: либо ты его обработаешь, либо программа остановится и покажет, где именно проблема.</p>`,
        `<p>Why exceptions instead of <code>return -1</code>? An error code is easy to ignore, and the program keeps running with bad data. An exception <b>can’t be missed</b>: either you handle it, or the program stops and shows exactly where the problem is.</p>`),
      mistakes: L(`<ul><li>Порожній <code>catch (Exception e) { }</code> — помилка «зникає», і її неможливо знайти.</li><li>Ловити <code>Exception</code> там, де очікуєш конкретну помилку, — перехопиш і ті, яких не чекав.</li></ul>`,
        `<ul><li>Пустой <code>catch (Exception e) { }</code> — ошибка «исчезает», и её невозможно найти.</li><li>Ловить <code>Exception</code> там, где ожидаешь конкретную ошибку, — перехватишь и те, которых не ждал.</li></ul>`,
        `<ul><li>An empty <code>catch (Exception e) { }</code> makes errors vanish and impossible to find.</li><li>Catching <code>Exception</code> when you expect a specific error also swallows ones you didn’t expect.</li></ul>`),
      examples: [
        { title: 'parseInt', code: M('String[] inputs = {"42", "7x", "-3"};\nfor (String s : inputs) {\n  try {\n    int n = Integer.parseInt(s);\n    System.out.println("OK: " + n);\n  } catch (NumberFormatException e) {\n    System.out.println("Bad input: " + s);\n  }\n}'), note: L('Програма не падає на «7x».', 'Программа не падает на «7x».', 'The program survives “7x”.') },
        { title: 'finally', code: M('try {\n  int[] a = {1, 2, 3};\n  System.out.println(a[5]);\n} catch (ArrayIndexOutOfBoundsException e) {\n  System.out.println("Error: " + e.getMessage());\n} finally {\n  System.out.println("Cleanup done");\n}'), note: L('finally — завжди.', 'finally — всегда.', 'finally always runs.') },
        { title: 'throw', code: 'public class Main {\n  static int setAge(int age) {\n    if (age < 0) throw new IllegalArgumentException("Age must be positive");\n    return age;\n  }\n\n  public static void main(String[] args) {\n    try {\n      System.out.println(setAge(15));\n      System.out.println(setAge(-2));\n    } catch (IllegalArgumentException e) {\n      System.out.println("Caught: " + e.getMessage());\n    }\n  }\n}', note: L('Власна перевірка з винятком.', 'Собственная проверка с исключением.', 'Your own check with an exception.') }
      ],
      task: {
        text: L('Напиши метод <code>static int safeDivide(String a, String b)</code>, що перетворює рядки на числа й ділить. Перехоплюй <code>NumberFormatException</code> (виводь <code>Not a number</code>, повертай 0) і <code>ArithmeticException</code> (виводь <code>Division by zero</code>, повертай 0). Виклич для пар <code>("20","4")</code>, <code>("9","0")</code>, <code>("x","3")</code> і виведи результати.', 'Напиши метод <code>static int safeDivide(String a, String b)</code>, который превращает строки в числа и делит. Перехватывай <code>NumberFormatException</code> (выводи <code>Not a number</code>, возвращай 0) и <code>ArithmeticException</code> (выводи <code>Division by zero</code>, возвращай 0). Вызови для пар <code>("20","4")</code>, <code>("9","0")</code>, <code>("x","3")</code> и выведи результаты.', 'Write <code>static int safeDivide(String a, String b)</code> that parses both strings and divides. Catch <code>NumberFormatException</code> (print <code>Not a number</code>, return 0) and <code>ArithmeticException</code> (print <code>Division by zero</code>, return 0). Call it for <code>("20","4")</code>, <code>("9","0")</code>, <code>("x","3")</code> and print the results.'),
        how: [L('Два <code>catch</code> поспіль після одного <code>try</code>.', 'Два <code>catch</code> подряд после одного <code>try</code>.', 'Two <code>catch</code> blocks after one <code>try</code>.')],
        starter: 'public class Main {\n  static int safeDivide(String a, String b) {\n    return Integer.parseInt(a) / Integer.parseInt(b);\n  }\n\n  public static void main(String[] args) {\n    System.out.println(safeDivide("20", "4"));\n    System.out.println(safeDivide("9", "0"));\n    System.out.println(safeDivide("x", "3"));\n  }\n}',
        solution: 'public class Main {\n  static int safeDivide(String a, String b) {\n    try {\n      return Integer.parseInt(a) / Integer.parseInt(b);\n    } catch (NumberFormatException e) {\n      System.out.println("Not a number");\n      return 0;\n    } catch (ArithmeticException e) {\n      System.out.println("Division by zero");\n      return 0;\n    }\n  }\n\n  public static void main(String[] args) {\n    System.out.println(safeDivide("20", "4"));\n    System.out.println(safeDivide("9", "0"));\n    System.out.println(safeDivide("x", "3"));\n  }\n}',
        hint: L('Повідомлення друкується всередині методу, тому йде перед 0.', 'Сообщение печатается внутри метода, поэтому идёт перед 0.', 'The message prints inside the method, so it comes before 0.'),
        expected: '5\nDivision by zero\n0\nNot a number\n0',
        must: /catch\s*\(\s*NumberFormatException[\s\S]*catch\s*\(\s*ArithmeticException|catch\s*\(\s*ArithmeticException[\s\S]*catch\s*\(\s*NumberFormatException/
      },
      quiz: { q: L('Коли виконується <code>finally</code>?', 'Когда выполняется <code>finally</code>?', 'When does <code>finally</code> run?'), options: [L('лише при помилці', 'только при ошибке', 'only on error'), L('завжди', 'всегда', 'always'), L('ніколи', 'никогда', 'never')], answer: 1, explain: L('І з помилкою, і без.', 'И с ошибкой, и без.', 'With or without an error.') },
      ref: [{ code: 'try { } catch (E e) { } finally { }', d: L('обробка', 'обработка', 'handling') }, { code: 'throw new IllegalArgumentException(msg)', d: L('кинути виняток', 'бросить исключение', 'throw') }]
    },
    {
      id: 'project-bank', chapter: CH5, project: true,
      title: L('Проєкт: банківська система', 'Проект: банковская система', 'Project: banking system'),
      theory: L(
        `<p>Збери міні-банк, використовуючи все про ООП:</p>
<ol><li>Клас <code>Account</code>: <code>private</code> поля <code>id</code>, <code>owner</code>, <code>balance</code>; конструктор; гетери</li><li><code>deposit(amount)</code> і <code>withdraw(amount)</code> кидають <code>IllegalArgumentException</code> при неправильній сумі або нестачі коштів</li><li>Клас <code>Bank</code> зберігає рахунки в <code>HashMap&lt;Integer, Account&gt;</code>, видає нові id (1, 2, 3…) і вміє робити <code>transfer(from, to, amount)</code></li><li>У <code>main</code> — сценарій з помилками, які перехоплюються <code>try/catch</code></li></ol>
<p>Переказ має бути <b>атомарним</b>: якщо зняти не вдалося, на інший рахунок нічого не зараховується.</p>`,
        `<p>Собери мини-банк, используя всё об ООП:</p>
<ol><li>Класс <code>Account</code>: <code>private</code> поля <code>id</code>, <code>owner</code>, <code>balance</code>; конструктор; геттеры</li><li><code>deposit(amount)</code> и <code>withdraw(amount)</code> бросают <code>IllegalArgumentException</code> при неправильной сумме или нехватке средств</li><li>Класс <code>Bank</code> хранит счета в <code>HashMap&lt;Integer, Account&gt;</code>, выдаёт новые id (1, 2, 3…) и умеет делать <code>transfer(from, to, amount)</code></li><li>В <code>main</code> — сценарий с ошибками, которые перехватываются <code>try/catch</code></li></ol>
<p>Перевод должен быть <b>атомарным</b>: если снять не удалось, на другой счёт ничего не зачисляется.</p>`,
        `<p>Build a mini bank using everything about OOP:</p>
<ol><li>An <code>Account</code> class: <code>private</code> fields <code>id</code>, <code>owner</code>, <code>balance</code>; a constructor; getters</li><li><code>deposit(amount)</code> and <code>withdraw(amount)</code> throw <code>IllegalArgumentException</code> on a bad amount or insufficient funds</li><li>A <code>Bank</code> class stores accounts in a <code>HashMap&lt;Integer, Account&gt;</code>, issues ids (1, 2, 3…) and supports <code>transfer(from, to, amount)</code></li><li>In <code>main</code>, a scenario with errors caught by <code>try/catch</code></li></ol>
<p>A transfer must be <b>atomic</b>: if the withdrawal fails, nothing is credited to the other account.</p>`),
      why: L(`<p>Атомарність — головне правило фінансів: гроші не можуть «зникнути» чи «з’явитися» через збій посередині операції. Порядок «спершу зняти (може кинути виняток) → потім зарахувати» гарантує це без додаткових перевірок.</p>`,
        `<p>Атомарность — главное правило финансов: деньги не могут «исчезнуть» или «появиться» из-за сбоя посреди операции. Порядок «сначала снять (может бросить исключение) → потом зачислить» гарантирует это без дополнительных проверок.</p>`,
        `<p>Atomicity is the first rule of finance: money can’t vanish or appear because of a failure mid-operation. The order “withdraw first (may throw) → then credit” guarantees it without extra checks.</p>`),
      mistakes: L(`<ul><li>Спершу зарахувати, потім зняти — при помилці гроші «намалюються».</li><li>Зробити <code>balance</code> публічним — уся перевірка втрачає сенс.</li></ul>`,
        `<ul><li>Сначала зачислить, потом снять — при ошибке деньги «нарисуются».</li><li>Сделать <code>balance</code> публичным — вся проверка теряет смысл.</li></ul>`,
        `<ul><li>Crediting first, then withdrawing — on error money appears from nowhere.</li><li>Making <code>balance</code> public defeats all the checks.</li></ul>`),
      examples: [
        { title: L('Рахунок з винятками', 'Счёт с исключениями', 'Account with exceptions'), code: 'class Account {\n  private double balance;\n  void withdraw(double a) {\n    if (a <= 0) throw new IllegalArgumentException("Invalid amount");\n    if (a > balance) throw new IllegalArgumentException("Insufficient funds");\n    balance -= a;\n  }\n  void deposit(double a) {\n    if (a <= 0) throw new IllegalArgumentException("Invalid amount");\n    balance += a;\n  }\n  double getBalance() { return balance; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Account acc = new Account();\n    acc.deposit(50);\n    try {\n      acc.withdraw(80);\n    } catch (IllegalArgumentException e) {\n      System.out.println(e.getMessage());\n    }\n    System.out.println(acc.getBalance());\n  }\n}', note: L('Помилка не змінює баланс.', 'Ошибка не меняет баланс.', 'An error doesn’t change the balance.') },
        { title: L('Видача id', 'Выдача id', 'Issuing ids'), code: 'import java.util.HashMap;\n\npublic class Main {\n  static int nextId = 1;\n  static HashMap<Integer, String> owners = new HashMap<>();\n\n  static int open(String owner) {\n    int id = nextId++;\n    owners.put(id, owner);\n    return id;\n  }\n\n  public static void main(String[] args) {\n    System.out.println(open("Ira"));\n    System.out.println(open("Max"));\n    System.out.println(owners);\n  }\n}', note: L('nextId++ повертає старе значення, потім збільшує.', 'nextId++ возвращает старое значение, затем увеличивает.', 'nextId++ returns the old value, then increments.') },
        { title: L('Форматування грошей', 'Форматирование денег', 'Formatting money'), code: M('double[] amounts = {5, 12.5, 1234.567};\nfor (double a : amounts) {\n  System.out.println(String.format("$%.2f", a));\n}'), note: L('Гроші — завжди 2 знаки.', 'Деньги — всегда 2 знака.', 'Money always has 2 decimals.') }
      ],
      task: {
        text: L(`Реалізуй <code>Account</code> і <code>Bank</code> (див. теорію). Метод <code>Account.toString()</code> повертає <code>#ID OWNER: $BALANCE</code> (2 знаки). Сценарій у main:
<ol><li>Відкрий рахунки Ira (100) і Max (20)</li><li>Переказ 30 від Ira до Max</li><li>Переказ 500 від Max до Ira — перехопи помилку й виведи <code>Error: Insufficient funds</code></li><li>Внесок −5 на рахунок Ira — <code>Error: Invalid amount</code></li><li>Виведи обидва рахунки</li></ol>`,
          `Реализуй <code>Account</code> и <code>Bank</code> (см. теорию). Метод <code>Account.toString()</code> возвращает <code>#ID OWNER: $BALANCE</code> (2 знака). Сценарий в main:
<ol><li>Открой счета Ira (100) и Max (20)</li><li>Перевод 30 от Ira к Max</li><li>Перевод 500 от Max к Ira — перехвати ошибку и выведи <code>Error: Insufficient funds</code></li><li>Взнос −5 на счёт Ira — <code>Error: Invalid amount</code></li><li>Выведи оба счёта</li></ol>`,
          `Implement <code>Account</code> and <code>Bank</code> (see the theory). <code>Account.toString()</code> returns <code>#ID OWNER: $BALANCE</code> (2 decimals). The scenario in main:
<ol><li>Open accounts for Ira (100) and Max (20)</li><li>Transfer 30 from Ira to Max</li><li>Transfer 500 from Max to Ira — catch the error and print <code>Error: Insufficient funds</code></li><li>Deposit −5 into Ira’s account — <code>Error: Invalid amount</code></li><li>Print both accounts</li></ol>`),
        how: [L('<code>Bank.open(owner, initial)</code> повертає id.', '<code>Bank.open(owner, initial)</code> возвращает id.', '<code>Bank.open(owner, initial)</code> returns the id.'), L('<code>transfer</code>: <code>get(from).withdraw(a); get(to).deposit(a);</code>', '<code>transfer</code>: <code>get(from).withdraw(a); get(to).deposit(a);</code>', '<code>transfer</code>: <code>get(from).withdraw(a); get(to).deposit(a);</code>')],
        starter: 'import java.util.HashMap;\n\nclass Account {\n}\n\nclass Bank {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n  }\n}',
        solution: 'import java.util.HashMap;\n\nclass Account {\n  private final int id;\n  private final String owner;\n  private double balance;\n\n  Account(int id, String owner, double balance) {\n    this.id = id;\n    this.owner = owner;\n    this.balance = balance;\n  }\n\n  void deposit(double amount) {\n    if (amount <= 0) throw new IllegalArgumentException("Invalid amount");\n    balance += amount;\n  }\n\n  void withdraw(double amount) {\n    if (amount <= 0) throw new IllegalArgumentException("Invalid amount");\n    if (amount > balance) throw new IllegalArgumentException("Insufficient funds");\n    balance -= amount;\n  }\n\n  public String toString() {\n    return "#" + id + " " + owner + ": $" + String.format("%.2f", balance);\n  }\n}\n\nclass Bank {\n  private final HashMap<Integer, Account> accounts = new HashMap<>();\n  private int nextId = 1;\n\n  int open(String owner, double initial) {\n    int id = nextId++;\n    accounts.put(id, new Account(id, owner, initial));\n    return id;\n  }\n\n  Account get(int id) { return accounts.get(id); }\n\n  void transfer(int from, int to, double amount) {\n    get(from).withdraw(amount);\n    get(to).deposit(amount);\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Bank bank = new Bank();\n    int ira = bank.open("Ira", 100);\n    int max = bank.open("Max", 20);\n    bank.transfer(ira, max, 30);\n    try {\n      bank.transfer(max, ira, 500);\n    } catch (IllegalArgumentException e) {\n      System.out.println("Error: " + e.getMessage());\n    }\n    try {\n      bank.get(ira).deposit(-5);\n    } catch (IllegalArgumentException e) {\n      System.out.println("Error: " + e.getMessage());\n    }\n    System.out.println(bank.get(ira));\n    System.out.println(bank.get(max));\n  }\n}',
        hint: L('Підсумок: Ira 70.00, Max 50.00.', 'Итог: Ira 70.00, Max 50.00.', 'Result: Ira 70.00, Max 50.00.'),
        expected: 'Error: Insufficient funds\nError: Invalid amount\n#1 Ira: $70.00\n#2 Max: $50.00',
        must: /private[\s\S]*balance[\s\S]*HashMap[\s\S]*transfer/
      },
      quiz: { q: L('Чому в transfer спершу withdraw, а потім deposit?', 'Почему в transfer сначала withdraw, а потом deposit?', 'Why withdraw before deposit in transfer?'), options: [L('так швидше', 'так быстрее', 'it’s faster'), L('при помилці зняття гроші не зарахуються', 'при ошибке снятия деньги не зачислятся', 'if withdrawal fails nothing is credited'), L('так вимагає HashMap', 'так требует HashMap', 'HashMap requires it')], answer: 1, explain: L('Атомарність операції.', 'Атомарность операции.', 'Operation atomicity.') },
      ref: [{ code: 'throw + try/catch + private', d: L('надійна модель', 'надёжная модель', 'a robust model') }]
    },
    {
      id: 'project-library', chapter: CH5, project: true,
      title: L('Проєкт: бібліотека книжок', 'Проект: библиотека книг', 'Project: book library'),
      theory: L(
        `<p>Другий проєкт — система бібліотеки з пошуком, видачею і статистикою:</p>
<ol><li><code>Book</code>: назва, автор, рік, прапорець <code>borrowed</code>; реалізує <code>Comparable&lt;Book&gt;</code> (сортування за роком)</li><li><code>Library</code>: <code>ArrayList&lt;Book&gt;</code>; методи <code>add</code>, <code>findByAuthor</code> (повертає список), <code>borrow(title)</code> і <code>giveBack(title)</code></li><li>Статистика: <code>HashMap&lt;String, Integer&gt;</code> — скільки книжок кожного автора</li></ol>
<p><code>borrow</code> повертає <code>boolean</code>: false, якщо книжки немає або її вже взяли. Так інтерфейс бібліотеки показує результат, а не падає.</p>`,
        `<p>Второй проект — система библиотеки с поиском, выдачей и статистикой:</p>
<ol><li><code>Book</code>: название, автор, год, флаг <code>borrowed</code>; реализует <code>Comparable&lt;Book&gt;</code> (сортировка по году)</li><li><code>Library</code>: <code>ArrayList&lt;Book&gt;</code>; методы <code>add</code>, <code>findByAuthor</code> (возвращает список), <code>borrow(title)</code> и <code>giveBack(title)</code></li><li>Статистика: <code>HashMap&lt;String, Integer&gt;</code> — сколько книг каждого автора</li></ol>
<p><code>borrow</code> возвращает <code>boolean</code>: false, если книги нет или её уже взяли. Так интерфейс библиотеки показывает результат, а не падает.</p>`,
        `<p>The second project is a library system with search, lending and stats:</p>
<ol><li><code>Book</code>: title, author, year, a <code>borrowed</code> flag; implements <code>Comparable&lt;Book&gt;</code> (sort by year)</li><li><code>Library</code>: an <code>ArrayList&lt;Book&gt;</code>; methods <code>add</code>, <code>findByAuthor</code> (returns a list), <code>borrow(title)</code> and <code>giveBack(title)</code></li><li>Stats: a <code>HashMap&lt;String, Integer&gt;</code> — how many books per author</li></ol>
<p><code>borrow</code> returns a <code>boolean</code>: false if the book is missing or already lent. The library reports the result instead of crashing.</p>`),
      why: L(`<p>Тут ти обираєш між <code>boolean</code> і винятком. Правило: виняток — для <b>несподіваних</b> ситуацій (зламані дані), а «книжку вже взяли» — звичайна подія, тому <code>boolean</code>. Вміння обрати правильний спосіб повідомити про проблему — ознака досвідченого розробника.</p>`,
        `<p>Здесь ты выбираешь между <code>boolean</code> и исключением. Правило: исключение — для <b>неожиданных</b> ситуаций (сломанные данные), а «книгу уже взяли» — обычное событие, поэтому <code>boolean</code>. Умение выбрать правильный способ сообщить о проблеме — признак опытного разработчика.</p>`,
        `<p>Here you choose between a <code>boolean</code> and an exception. Rule: exceptions are for <b>unexpected</b> situations (broken data), while “the book is already lent” is a normal event, so a <code>boolean</code>. Choosing how to report a problem is a sign of an experienced developer.</p>`),
      mistakes: L(`<ul><li>Видаляти книжку з <code>ArrayList</code> під час for-each — <code>ConcurrentModificationException</code>.</li><li>Порівнювати назви через <code>==</code> — пошук «не знайде» книжку.</li></ul>`,
        `<ul><li>Удалять книгу из <code>ArrayList</code> во время for-each — <code>ConcurrentModificationException</code>.</li><li>Сравнивать названия через <code>==</code> — поиск «не найдёт» книгу.</li></ul>`,
        `<ul><li>Removing a book from an <code>ArrayList</code> inside for-each — <code>ConcurrentModificationException</code>.</li><li>Comparing titles with <code>==</code> — the search won’t find the book.</li></ul>`),
      examples: [
        { title: L('Пошук у списку', 'Поиск в списке', 'Searching a list'), code: 'import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> titles = new ArrayList<>();\n    titles.add("Dune");\n    titles.add("Emma");\n    titles.add("Dracula");\n    ArrayList<String> d = new ArrayList<>();\n    for (String t : titles) if (t.startsWith("D")) d.add(t);\n    System.out.println(d);\n  }\n}', note: L('Новий список із результатами.', 'Новый список с результатами.', 'A new list of results.') },
        { title: 'Collections.sort', code: 'import java.util.ArrayList;\nimport java.util.Collections;\n\nclass Book implements Comparable<Book> {\n  String title; int year;\n  Book(String t, int y) { title = t; year = y; }\n  public int compareTo(Book o) { return Integer.compare(year, o.year); }\n  public String toString() { return title + " (" + year + ")"; }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<Book> books = new ArrayList<>();\n    books.add(new Book("Dune", 1965));\n    books.add(new Book("Emma", 1815));\n    books.add(new Book("It", 1986));\n    Collections.sort(books);\n    System.out.println(books);\n  }\n}', note: L('Сортування за compareTo.', 'Сортировка по compareTo.', 'Sorting with compareTo.') },
        { title: L('Видача', 'Выдача', 'Lending'), code: 'public class Main {\n  static boolean borrowed = false;\n\n  static boolean borrow() {\n    if (borrowed) return false;\n    borrowed = true;\n    return true;\n  }\n\n  public static void main(String[] args) {\n    System.out.println(borrow());\n    System.out.println(borrow());\n  }\n}', note: L('Друга спроба — false.', 'Вторая попытка — false.', 'The second attempt is false.') }
      ],
      task: {
        text: L(`Реалізуй бібліотеку (див. теорію). <code>Book.toString()</code> → <code>TITLE (YEAR)</code>. Сценарій:
<ol><li>Додай: «Dune» Herbert 1965, «Emma» Austen 1815, «Pride» Austen 1813, «It» King 1986</li><li>Виведи книжки Austen: <code>Austen: [Emma (1815), Pride (1813)]</code></li><li>Видай «Dune» двічі й «Ghost» раз, виводячи результат кожної спроби (<code>true</code>, <code>false</code>, <code>false</code>)</li><li>Виведи всі книжки, відсортовані за роком</li><li>Виведи кількість книжок Austen з мапи статистики: <code>Austen books: 2</code></li></ol>`,
          `Реализуй библиотеку (см. теорию). <code>Book.toString()</code> → <code>TITLE (YEAR)</code>. Сценарий:
<ol><li>Добавь: «Dune» Herbert 1965, «Emma» Austen 1815, «Pride» Austen 1813, «It» King 1986</li><li>Выведи книги Austen: <code>Austen: [Emma (1815), Pride (1813)]</code></li><li>Выдай «Dune» дважды и «Ghost» раз, выводя результат каждой попытки (<code>true</code>, <code>false</code>, <code>false</code>)</li><li>Выведи все книги, отсортированные по году</li><li>Выведи количество книг Austen из карты статистики: <code>Austen books: 2</code></li></ol>`,
          `Implement the library (see the theory). <code>Book.toString()</code> → <code>TITLE (YEAR)</code>. Scenario:
<ol><li>Add: “Dune” Herbert 1965, “Emma” Austen 1815, “Pride” Austen 1813, “It” King 1986</li><li>Print Austen’s books: <code>Austen: [Emma (1815), Pride (1813)]</code></li><li>Borrow “Dune” twice and “Ghost” once, printing each result (<code>true</code>, <code>false</code>, <code>false</code>)</li><li>Print all books sorted by year</li><li>Print Austen’s count from the stats map: <code>Austen books: 2</code></li></ol>`),
        how: [L('Сортуй копію списку: <code>new ArrayList&lt;&gt;(books)</code>, щоб не змінювати порядок у бібліотеці.', 'Сортируй копию списка: <code>new ArrayList&lt;&gt;(books)</code>, чтобы не менять порядок в библиотеке.', 'Sort a copy: <code>new ArrayList&lt;&gt;(books)</code>, so the library order stays.'), L('Статистику оновлюй у <code>add</code> через <code>getOrDefault</code>.', 'Статистику обновляй в <code>add</code> через <code>getOrDefault</code>.', 'Update stats in <code>add</code> via <code>getOrDefault</code>.')],
        starter: 'import java.util.*;\n\nclass Book {\n}\n\nclass Library {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n  }\n}',
        solution: 'import java.util.*;\n\nclass Book implements Comparable<Book> {\n  final String title, author;\n  final int year;\n  boolean borrowed;\n\n  Book(String title, String author, int year) {\n    this.title = title;\n    this.author = author;\n    this.year = year;\n  }\n\n  public int compareTo(Book o) { return Integer.compare(year, o.year); }\n  public String toString() { return title + " (" + year + ")"; }\n}\n\nclass Library {\n  private final ArrayList<Book> books = new ArrayList<>();\n  private final HashMap<String, Integer> byAuthor = new HashMap<>();\n\n  void add(Book b) {\n    books.add(b);\n    byAuthor.put(b.author, byAuthor.getOrDefault(b.author, 0) + 1);\n  }\n\n  ArrayList<Book> findByAuthor(String author) {\n    ArrayList<Book> result = new ArrayList<>();\n    for (Book b : books) if (b.author.equals(author)) result.add(b);\n    return result;\n  }\n\n  Book find(String title) {\n    for (Book b : books) if (b.title.equals(title)) return b;\n    return null;\n  }\n\n  boolean borrow(String title) {\n    Book b = find(title);\n    if (b == null || b.borrowed) return false;\n    b.borrowed = true;\n    return true;\n  }\n\n  boolean giveBack(String title) {\n    Book b = find(title);\n    if (b == null || !b.borrowed) return false;\n    b.borrowed = false;\n    return true;\n  }\n\n  ArrayList<Book> sortedByYear() {\n    ArrayList<Book> copy = new ArrayList<>(books);\n    Collections.sort(copy);\n    return copy;\n  }\n\n  int countByAuthor(String author) { return byAuthor.getOrDefault(author, 0); }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Library lib = new Library();\n    lib.add(new Book("Dune", "Herbert", 1965));\n    lib.add(new Book("Emma", "Austen", 1815));\n    lib.add(new Book("Pride", "Austen", 1813));\n    lib.add(new Book("It", "King", 1986));\n    System.out.println("Austen: " + lib.findByAuthor("Austen"));\n    System.out.println(lib.borrow("Dune"));\n    System.out.println(lib.borrow("Dune"));\n    System.out.println(lib.borrow("Ghost"));\n    System.out.println(lib.sortedByYear());\n    System.out.println("Austen books: " + lib.countByAuthor("Austen"));\n  }\n}',
        hint: L('Відсортовано: [Pride (1813), Emma (1815), Dune (1965), It (1986)].', 'Отсортировано: [Pride (1813), Emma (1815), Dune (1965), It (1986)].', 'Sorted: [Pride (1813), Emma (1815), Dune (1965), It (1986)].'),
        expected: 'Austen: [Emma (1815), Pride (1813)]\ntrue\nfalse\nfalse\n[Pride (1813), Emma (1815), Dune (1965), It (1986)]\nAusten books: 2',
        must: /Comparable[\s\S]*ArrayList[\s\S]*HashMap/
      },
      quiz: { q: L('Коли краще повернути boolean, а не кинути виняток?', 'Когда лучше вернуть boolean, а не бросить исключение?', 'When is returning a boolean better than throwing?'), options: [L('для очікуваних ситуацій', 'для ожидаемых ситуаций', 'for expected situations'), L('завжди', 'всегда', 'always'), L('ніколи', 'никогда', 'never')], answer: 0, explain: L('Винятки — для несподіваного.', 'Исключения — для неожиданного.', 'Exceptions are for the unexpected.') },
      ref: [{ code: 'Comparable + Collections.sort', d: L('сортування', 'сортировка', 'sorting') }, { code: 'ArrayList + HashMap', d: L('зберігання й статистика', 'хранение и статистика', 'storage and stats') }]
    }
  ]);
})();
