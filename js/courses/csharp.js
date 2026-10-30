// C# — курс. Код компілюється та виконується на справжньому Mono (.NET) через сервер Wandbox.
(function () {
  const L = Codry.L;
  const CH1 = L('Основи C#', 'Основы C#', 'C# basics');
  const CH2 = L('Умови, цикли, масиви, методи', 'Условия, циклы, массивы, методы', 'Conditions, loops, arrays, methods');
  const CH3 = L('Класи та ООП', 'Классы и ООП', 'Classes and OOP');
  const CH4 = L('Колекції, LINQ, винятки', 'Коллекции, LINQ, исключения', 'Collections, LINQ, exceptions');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');
  const IND = (s, n) => s.split('\n').map((l) => (l ? ' '.repeat(n) + l : l)).join('\n');
  // M(тіло Main, { using, before: класи перед Program, members: статичні методи в Program })
  const M = (body, o) => {
    o = o || {};
    return (o.using || 'using System;') + '\n\n' + (o.before ? o.before + '\n\n' : '') + 'class Program\n{\n' +
      (o.members ? IND(o.members, 2) + '\n\n' : '') + '  static void Main()\n  {\n' + IND(body, 4) + '\n  }\n}';
  };
  const LINQ = 'using System;\nusing System.Collections.Generic;\nusing System.Linq;';
  const COLL = 'using System;\nusing System.Collections.Generic;';

  Codry.steps('csharp', [
    {
      id: 'hello', chapter: CH1,
      title: L('Перша програма на C#', 'Первая программа на C#', 'Your first C# program'),
      theory: L(
        `<p><b>C#</b> (читається «сі-шарп») — мова від Microsoft. На ній пишуть ігри в <b>Unity</b> (Hollow Knight, Among Us, Cuphead), програми для Windows, сайти й сервери на .NET.</p>
<pre class="inline-code">using System;

class Program
{
  static void Main()
  {
    Console.WriteLine("Hello, C#!");
  }
}</pre>
<ul><li><code>using System;</code> — підключаємо простір імен, де живе <code>Console</code></li><li><code>class Program</code> — увесь код C# знаходиться всередині класів</li><li><code>static void Main()</code> — <b>точка входу</b>, звідси починається програма</li><li><code>Console.WriteLine(…)</code> — вивести рядок і перейти на новий; <code>Console.Write</code> — без переходу</li><li>Кожна інструкція закінчується <code>;</code></li></ul>`,
        `<p><b>C#</b> (читается «си-шарп») — язык от Microsoft. На нём пишут игры в <b>Unity</b> (Hollow Knight, Among Us, Cuphead), программы для Windows, сайты и серверы на .NET.</p>
<pre class="inline-code">using System;

class Program
{
  static void Main()
  {
    Console.WriteLine("Hello, C#!");
  }
}</pre>
<ul><li><code>using System;</code> — подключаем пространство имён, где живёт <code>Console</code></li><li><code>class Program</code> — весь код C# находится внутри классов</li><li><code>static void Main()</code> — <b>точка входа</b>, отсюда начинается программа</li><li><code>Console.WriteLine(…)</code> — вывести строку и перейти на новую; <code>Console.Write</code> — без перехода</li><li>Каждая инструкция заканчивается <code>;</code></li></ul>`,
        `<p><b>C#</b> (“C sharp”) is a language from Microsoft. It powers <b>Unity</b> games (Hollow Knight, Among Us, Cuphead), Windows apps, and .NET websites and servers.</p>
<pre class="inline-code">using System;

class Program
{
  static void Main()
  {
    Console.WriteLine("Hello, C#!");
  }
}</pre>
<ul><li><code>using System;</code> brings in the namespace where <code>Console</code> lives</li><li><code>class Program</code> — all C# code lives inside classes</li><li><code>static void Main()</code> is the <b>entry point</b>, where the program starts</li><li><code>Console.WriteLine(…)</code> prints a line and moves to a new one; <code>Console.Write</code> doesn’t</li><li>Every statement ends with <code>;</code></li></ul>`),
      why: L(`<p>Чому стільки обгортки навколо одного рядка? C# — мова для великих проєктів: класи впорядковують код, а компілятор перевіряє всю програму <b>до запуску</b>. Якщо ти помилився в назві чи забув <code>;</code>, гра навіть не запуститься — і ти одразу побачиш, де помилка.</p>`,
        `<p>Почему столько обёртки вокруг одной строки? C# — язык для больших проектов: классы упорядочивают код, а компилятор проверяет всю программу <b>до запуска</b>. Если ты ошибся в названии или забыл <code>;</code>, игра даже не запустится — и ты сразу увидишь, где ошибка.</p>`,
        `<p>Why so much wrapping around one line? C# is built for big projects: classes organise code and the compiler checks the whole program <b>before it runs</b>. A typo or a missing <code>;</code> stops the build, so you see the mistake immediately.</p>`),
      mistakes: L(`<ul><li><code>console.writeline</code> з малих літер — C# розрізняє регістр: треба <code>Console.WriteLine</code>.</li><li>Забута <code>;</code> — помилка <code>; expected</code>.</li><li>Рядок в одинарних лапках <code>'Hi'</code> — помилка; одинарні лапки лише для одного символу (<code>char</code>).</li></ul>`,
        `<ul><li><code>console.writeline</code> с маленьких букв — C# различает регистр: нужно <code>Console.WriteLine</code>.</li><li>Забытая <code>;</code> — ошибка <code>; expected</code>.</li><li>Строка в одинарных кавычках <code>'Hi'</code> — ошибка; одинарные кавычки только для одного символа (<code>char</code>).</li></ul>`,
        `<ul><li><code>console.writeline</code> in lowercase — C# is case-sensitive: use <code>Console.WriteLine</code>.</li><li>A missing <code>;</code> — error <code>; expected</code>.</li><li>A string in single quotes <code>'Hi'</code> is an error; single quotes are for one character (<code>char</code>).</li></ul>`),
      examples: [
        { title: 'WriteLine', code: M(`Console.WriteLine("Hello, C#!");
Console.WriteLine("Unity uses C#");`), note: L('Кожен WriteLine — окремий рядок.', 'Каждый WriteLine — отдельная строка.', 'Each WriteLine is its own line.') },
        { title: 'Write', code: M(`Console.Write("Level ");
Console.Write(1);
Console.WriteLine(" loaded");
Console.WriteLine(10 + 5);`), note: L('Write не переводить рядок, а числа можна виводити напряму.', 'Write не переводит строку, а числа можно выводить напрямую.', 'Write adds no newline, and numbers print directly.') },
        { title: L('Коментарі', 'Комментарии', 'Comments'), code: M(`// однорядковий коментар
/* багаторядковий
   коментар */
Console.WriteLine("Visible");
// Console.WriteLine("Hidden");`), note: L('Коментарі компілятор пропускає.', 'Комментарии компилятор пропускает.', 'The compiler skips comments.') }
      ],
      task: {
        text: L('Виведи два рядки: <code>Hello, C#!</code> і <code>I code in Codry</code>.', 'Выведи две строки: <code>Hello, C#!</code> и <code>I code in Codry</code>.', 'Print two lines: <code>Hello, C#!</code> and <code>I code in Codry</code>.'),
        how: [L('Усередині <code>Main</code> напиши два <code>Console.WriteLine</code>.', 'Внутри <code>Main</code> напиши два <code>Console.WriteLine</code>.', 'Inside <code>Main</code> write two <code>Console.WriteLine</code> calls.')],
        starter: M('// твій код тут'),
        solution: M(`Console.WriteLine("Hello, C#!");
Console.WriteLine("I code in Codry");`),
        hint: L('Текст — у подвійних лапках, у кінці — <code>;</code>.', 'Текст — в двойных кавычках, в конце — <code>;</code>.', 'Text in double quotes, <code>;</code> at the end.'),
        expected: 'Hello, C#!\nI code in Codry'
      },
      quiz: { q: L('Як називається метод — точка входу в C#?', 'Как называется метод — точка входа в C#?', 'What is the entry-point method in C#?'), options: ['Start', 'Main', 'Run'], answer: 1, explain: L('<code>static void Main()</code>.', '<code>static void Main()</code>.', '<code>static void Main()</code>.') },
      ref: [{ code: 'Console.WriteLine(x);', d: L('вивід з новим рядком', 'вывод с новой строкой', 'print with newline') }, { code: 'Console.Write(x);', d: L('вивід без нового рядка', 'вывод без новой строки', 'print without newline') }]
    },
    {
      id: 'variables', chapter: CH1,
      title: L('Змінні, типи та інтерполяція', 'Переменные, типы и интерполяция', 'Variables, types and interpolation'),
      theory: L(
        `<p>У C# кожна змінна має <b>тип</b>:</p>
<table class="mini"><tr><td><code>int</code></td><td>ціле: <code>int lives = 3;</code></td></tr><tr><td><code>double</code></td><td>дробове: <code>double speed = 4.5;</code></td></tr><tr><td><code>bool</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>char</code></td><td>один символ: <code>char key = 'W';</code></td></tr><tr><td><code>string</code></td><td>текст: <code>string name = "Kira";</code></td></tr></table>
<p><code>var</code> — компілятор сам визначить тип: <code>var coins = 10;</code> (це <code>int</code>). <code>const</code> — значення, яке не змінюється: <code>const int MaxHp = 100;</code></p>
<p><b>Інтерполяція рядків</b> — знак <code>$</code> перед лапками, а змінні у <code>{ }</code>:</p>
<pre class="inline-code">Console.WriteLine($"{name} has {lives} lives");</pre>
<p>Увага: <code>bool</code> виводиться як <code>True</code>/<code>False</code> з великої літери.</p>`,
        `<p>В C# каждая переменная имеет <b>тип</b>:</p>
<table class="mini"><tr><td><code>int</code></td><td>целое: <code>int lives = 3;</code></td></tr><tr><td><code>double</code></td><td>дробное: <code>double speed = 4.5;</code></td></tr><tr><td><code>bool</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>char</code></td><td>один символ: <code>char key = 'W';</code></td></tr><tr><td><code>string</code></td><td>текст: <code>string name = "Kira";</code></td></tr></table>
<p><code>var</code> — компилятор сам определит тип: <code>var coins = 10;</code> (это <code>int</code>). <code>const</code> — значение, которое не меняется: <code>const int MaxHp = 100;</code></p>
<p><b>Интерполяция строк</b> — знак <code>$</code> перед кавычками, а переменные в <code>{ }</code>:</p>
<pre class="inline-code">Console.WriteLine($"{name} has {lives} lives");</pre>
<p>Внимание: <code>bool</code> выводится как <code>True</code>/<code>False</code> с большой буквы.</p>`,
        `<p>In C# every variable has a <b>type</b>:</p>
<table class="mini"><tr><td><code>int</code></td><td>integer: <code>int lives = 3;</code></td></tr><tr><td><code>double</code></td><td>decimal: <code>double speed = 4.5;</code></td></tr><tr><td><code>bool</code></td><td><code>true</code> / <code>false</code></td></tr><tr><td><code>char</code></td><td>one character: <code>char key = 'W';</code></td></tr><tr><td><code>string</code></td><td>text: <code>string name = "Kira";</code></td></tr></table>
<p><code>var</code> lets the compiler infer the type: <code>var coins = 10;</code> (an <code>int</code>). <code>const</code> is a value that never changes: <code>const int MaxHp = 100;</code></p>
<p><b>String interpolation</b> — put <code>$</code> before the quotes and variables inside <code>{ }</code>:</p>
<pre class="inline-code">Console.WriteLine($"{name} has {lives} lives");</pre>
<p>Note: a <code>bool</code> prints as <code>True</code>/<code>False</code> with a capital letter.</p>`),
      why: L(`<p>Типи — це захист від безглуздих помилок. Unity-гра з тисячею змінних не скомпілюється, якщо ти випадково запишеш текст у змінну для здоров’я. А інтерполяція <code>$"…"</code> читається як звичайне речення — набагато зручніше, ніж клеїти шматки через <code>+</code>.</p>`,
        `<p>Типы — это защита от бессмысленных ошибок. Unity-игра с тысячей переменных не скомпилируется, если ты случайно запишешь текст в переменную для здоровья. А интерполяция <code>$"…"</code> читается как обычное предложение — гораздо удобнее, чем клеить куски через <code>+</code>.</p>`,
        `<p>Types protect you from silly bugs. A Unity game with a thousand variables won’t compile if you accidentally store text in a health variable. And <code>$"…"</code> interpolation reads like a normal sentence — far nicer than gluing pieces with <code>+</code>.</p>`),
      mistakes: L(`<ul><li>Забутий <code>$</code>: <code>"{name}"</code> виведе буквально <code>{name}</code>.</li><li><code>int x = 2.5;</code> — помилка: дробове не влазить у ціле без перетворення.</li><li>Змінна без значення: <code>int a; Console.WriteLine(a);</code> — помилка «use of unassigned variable».</li></ul>`,
        `<ul><li>Забытый <code>$</code>: <code>"{name}"</code> выведет буквально <code>{name}</code>.</li><li><code>int x = 2.5;</code> — ошибка: дробное не помещается в целое без преобразования.</li><li>Переменная без значения: <code>int a; Console.WriteLine(a);</code> — ошибка «use of unassigned variable».</li></ul>`,
        `<ul><li>Forgetting <code>$</code>: <code>"{name}"</code> prints literally <code>{name}</code>.</li><li><code>int x = 2.5;</code> — error: a decimal doesn’t fit an int without conversion.</li><li>An unassigned variable: <code>int a; Console.WriteLine(a);</code> — error “use of unassigned variable”.</li></ul>`),
      examples: [
        { title: L('Типи', 'Типы', 'Types'), code: M(`int lives = 3;
double speed = 4.5;
bool hasKey = true;
char button = 'E';
string hero = "Kira";
Console.WriteLine(lives);
Console.WriteLine(speed);
Console.WriteLine(hasKey);
Console.WriteLine(button);
Console.WriteLine(hero);`), note: L('Зверни увагу: <code>True</code> з великої.', 'Обрати внимание: <code>True</code> с большой.', 'Note: <code>True</code> is capitalised.') },
        { title: L('Інтерполяція', 'Интерполяция', 'Interpolation'), code: M(`string hero = "Kira";
int coins = 42;
Console.WriteLine($"{hero} has {coins} coins");
Console.WriteLine($"Double: {coins * 2}");
Console.WriteLine("Old way: " + hero + " " + coins);`), note: L('У <code>{ }</code> можна писати навіть вирази.', 'В <code>{ }</code> можно писать даже выражения.', 'You can put whole expressions in <code>{ }</code>.') },
        { title: 'var / const', code: M(`const int MaxHp = 100;
var hp = 75;
hp = hp + 10;
Console.WriteLine($"HP {hp}/{MaxHp}");
// MaxHp = 50; // помилка: константу змінити не можна`), note: L('<code>var</code> не означає «будь-який тип» — тип визначається один раз.', '<code>var</code> не значит «любой тип» — тип определяется один раз.', '<code>var</code> isn’t “any type” — the type is fixed once.') }
      ],
      task: {
        text: L('Створи змінні <code>hero = "Kira"</code>, <code>level = 7</code>, <code>power = 12.5</code> і виведи через інтерполяцію: <code>Kira level 7, power 12.5</code>.', 'Создай переменные <code>hero = "Kira"</code>, <code>level = 7</code>, <code>power = 12.5</code> и выведи через интерполяцию: <code>Kira level 7, power 12.5</code>.', 'Create <code>hero = "Kira"</code>, <code>level = 7</code>, <code>power = 12.5</code> and print with interpolation: <code>Kira level 7, power 12.5</code>.'),
        how: [L('Типи: <code>string</code>, <code>int</code>, <code>double</code>.', 'Типы: <code>string</code>, <code>int</code>, <code>double</code>.', 'Types: <code>string</code>, <code>int</code>, <code>double</code>.'), L('<code>Console.WriteLine($"{hero} level {level}, power {power}");</code>', '<code>Console.WriteLine($"{hero} level {level}, power {power}");</code>', '<code>Console.WriteLine($"{hero} level {level}, power {power}");</code>')],
        starter: M('// оголоси три змінні та виведи рядок'),
        solution: M(`string hero = "Kira";
int level = 7;
double power = 12.5;
Console.WriteLine($"{hero} level {level}, power {power}");`),
        hint: L('Не забудь знак <code>$</code> перед лапками.', 'Не забудь знак <code>$</code> перед кавычками.', 'Don’t forget the <code>$</code> before the quotes.'),
        expected: 'Kira level 7, power 12.5',
        must: /\$"/
      },
      quiz: { q: L('Що виведе <code>Console.WriteLine(5 > 3);</code>?', 'Что выведет <code>Console.WriteLine(5 > 3);</code>?', 'What does <code>Console.WriteLine(5 > 3);</code> print?'), options: ['true', 'True', '1'], answer: 1, explain: L('bool у C# друкується з великої літери.', 'bool в C# печатается с большой буквы.', 'C# prints bool with a capital letter.') },
      ref: [{ code: 'int double bool char string', d: L('основні типи', 'основные типы', 'basic types') }, { code: '$"{x}"', d: L('інтерполяція', 'интерполяция', 'interpolation') }, { code: 'const int Max = 5;', d: L('константа', 'константа', 'constant') }]
    },
    {
      id: 'input', chapter: CH1,
      title: L('Введення: Console.ReadLine', 'Ввод: Console.ReadLine', 'Input: Console.ReadLine'),
      theory: L(
        `<p><code>Console.ReadLine()</code> читає <b>один рядок</b> тексту, який ввів користувач, і повертає <code>string</code>.</p>
<pre class="inline-code">string name = Console.ReadLine();
int age = int.Parse(Console.ReadLine());
double h = double.Parse(Console.ReadLine());</pre>
<p>Щоб отримати число, рядок треба <b>перетворити</b>: <code>int.Parse</code>, <code>double.Parse</code>. Кілька чисел в одному рядку розбивають через <code>Split</code>:</p>
<pre class="inline-code">string[] parts = Console.ReadLine().Split(' ');
int a = int.Parse(parts[0]);
int b = int.Parse(parts[1]);</pre>
<div class="tip">💡 У Codry вхідні дані пишуться в поле <b>«Вхідні дані (stdin)»</b> під редактором — кожен рядок як окреме введення.</div>`,
        `<p><code>Console.ReadLine()</code> читает <b>одну строку</b> текста, которую ввёл пользователь, и возвращает <code>string</code>.</p>
<pre class="inline-code">string name = Console.ReadLine();
int age = int.Parse(Console.ReadLine());
double h = double.Parse(Console.ReadLine());</pre>
<p>Чтобы получить число, строку нужно <b>преобразовать</b>: <code>int.Parse</code>, <code>double.Parse</code>. Несколько чисел в одной строке разбивают через <code>Split</code>:</p>
<pre class="inline-code">string[] parts = Console.ReadLine().Split(' ');
int a = int.Parse(parts[0]);
int b = int.Parse(parts[1]);</pre>
<div class="tip">💡 В Codry входные данные пишутся в поле <b>«Входные данные (stdin)»</b> под редактором — каждая строка как отдельный ввод.</div>`,
        `<p><code>Console.ReadLine()</code> reads <b>one line</b> the user typed and returns a <code>string</code>.</p>
<pre class="inline-code">string name = Console.ReadLine();
int age = int.Parse(Console.ReadLine());
double h = double.Parse(Console.ReadLine());</pre>
<p>To get a number you must <b>convert</b> the string: <code>int.Parse</code>, <code>double.Parse</code>. Several numbers on one line are split with <code>Split</code>:</p>
<pre class="inline-code">string[] parts = Console.ReadLine().Split(' ');
int a = int.Parse(parts[0]);
int b = int.Parse(parts[1]);</pre>
<div class="tip">💡 In Codry, type input into the <b>“Input (stdin)”</b> box under the editor — each line is a separate input.</div>`),
      why: L(`<p>Чому ReadLine завжди дає рядок? Клавіатура не знає, що ти вводиш — число чи ім’я, вона надсилає символи. Програма сама вирішує, як їх розуміти. Явний <code>int.Parse</code> показує: «тут я чекаю число» — і якщо прийде текст, ти одразу дізнаєшся про помилку.</p>`,
        `<p>Почему ReadLine всегда даёт строку? Клавиатура не знает, что ты вводишь — число или имя, она отправляет символы. Программа сама решает, как их понимать. Явный <code>int.Parse</code> показывает: «здесь я жду число» — и если придёт текст, ты сразу узнаешь об ошибке.</p>`,
        `<p>Why does ReadLine always give a string? The keyboard doesn’t know whether you’re typing a number or a name — it just sends characters. The program decides how to read them. An explicit <code>int.Parse</code> says “I expect a number here”, and if text arrives you find out immediately.</p>`),
      mistakes: L(`<ul><li><code>int age = Console.ReadLine();</code> — помилка: рядок не можна покласти в <code>int</code>.</li><li><code>int.Parse("abc")</code> — виняток <code>FormatException</code>.</li><li>Два числа в одному рядку, а читаєш двома ReadLine — другий отримає наступний рядок або <code>null</code>.</li></ul>`,
        `<ul><li><code>int age = Console.ReadLine();</code> — ошибка: строку нельзя положить в <code>int</code>.</li><li><code>int.Parse("abc")</code> — исключение <code>FormatException</code>.</li><li>Два числа в одной строке, а читаешь двумя ReadLine — второй получит следующую строку или <code>null</code>.</li></ul>`,
        `<ul><li><code>int age = Console.ReadLine();</code> — error: a string can’t go into an <code>int</code>.</li><li><code>int.Parse("abc")</code> throws <code>FormatException</code>.</li><li>Two numbers on one line read with two ReadLine calls — the second gets the next line or <code>null</code>.</li></ul>`),
      examples: [
        { title: L('Ім’я', 'Имя', 'Name'), code: M(`Console.WriteLine("What is your name?");
string name = Console.ReadLine();
Console.WriteLine($"Hi, {name}!");`), note: L('Введи ім’я в stdin.', 'Введи имя в stdin.', 'Type a name into stdin.') },
        { title: L('Два числа в рядку', 'Два числа в строке', 'Two numbers on a line'), code: M(`string[] parts = Console.ReadLine().Split(' ');
int a = int.Parse(parts[0]);
int b = int.Parse(parts[1]);
Console.WriteLine($"{a} + {b} = {a + b}");`), note: L('Приклад вводу: <code>4 9</code>.', 'Пример ввода: <code>4 9</code>.', 'Sample input: <code>4 9</code>.') },
        { title: L('Дробові', 'Дробные', 'Decimals'), code: M(`double price = double.Parse(Console.ReadLine());
int count = int.Parse(Console.ReadLine());
Console.WriteLine($"Total: {price * count}");`), note: L('Приклад вводу: <code>2.5</code> і <code>4</code>.', 'Пример ввода: <code>2.5</code> и <code>4</code>.', 'Sample input: <code>2.5</code> and <code>4</code>.') }
      ],
      task: {
        text: L('Прочитай ім’я і рік народження. Виведи <code>NAME will be AGE in 2030</code>. Вхідні дані вже задано: <code>Olena</code> і <code>2011</code>.', 'Прочитай имя и год рождения. Выведи <code>NAME will be AGE in 2030</code>. Входные данные уже заданы: <code>Olena</code> и <code>2011</code>.', 'Read a name and a birth year. Print <code>NAME will be AGE in 2030</code>. Input is preset: <code>Olena</code> and <code>2011</code>.'),
        how: [L('Рік: <code>int year = int.Parse(Console.ReadLine());</code>', 'Год: <code>int year = int.Parse(Console.ReadLine());</code>', 'Year: <code>int year = int.Parse(Console.ReadLine());</code>'), L('Вік: <code>2030 - year</code> (можна прямо в <code>{ }</code>).', 'Возраст: <code>2030 - year</code> (можно прямо в <code>{ }</code>).', 'Age: <code>2030 - year</code> (right inside <code>{ }</code>).')],
        starter: M('// прочитай ім’я та рік'),
        solution: M(`string name = Console.ReadLine();
int year = int.Parse(Console.ReadLine());
Console.WriteLine($"{name} will be {2030 - year} in 2030");`),
        stdin: 'Olena\n2011',
        hint: L('Очікувано: <code>Olena will be 19 in 2030</code>.', 'Ожидается: <code>Olena will be 19 in 2030</code>.', 'Expected: <code>Olena will be 19 in 2030</code>.'),
        expected: 'Olena will be 19 in 2030',
        must: /ReadLine[\s\S]*Parse/
      },
      quiz: { q: L('Що повертає Console.ReadLine()?', 'Что возвращает Console.ReadLine()?', 'What does Console.ReadLine() return?'), options: ['int', 'string', 'char'], answer: 1, explain: L('Завжди рядок — число треба розібрати через Parse.', 'Всегда строку — число нужно разобрать через Parse.', 'Always a string — parse numbers with Parse.') },
      ref: [{ code: 'Console.ReadLine()', d: L('читати рядок', 'читать строку', 'read a line') }, { code: 'int.Parse(s)', d: L('рядок → int', 'строка → int', 'string → int') }, { code: 's.Split(\' \')', d: L('розбити за пробілом', 'разбить по пробелу', 'split by space') }]
    },
    {
      id: 'math-strings', chapter: CH1,
      title: L('Арифметика та робота з рядками', 'Арифметика и работа со строками', 'Arithmetic and strings'),
      theory: L(
        `<p>Оператори: <code>+ - * / %</code>. Якщо обидва числа цілі, <code>/</code> — це <b>цілочисельне ділення</b>: <code>17 / 5 = 3</code>, а <code>17 % 5 = 2</code> (остача). Для дробу: <code>17.0 / 5 = 3.4</code> або <code>(double)a / b</code>.</p>
<p>Скорочення: <code>x += 5</code>, <code>x++</code> (плюс 1), <code>x--</code>. Клас <code>Math</code>: <code>Math.Max</code>, <code>Math.Min</code>, <code>Math.Abs</code>, <code>Math.Pow(2, 10)</code>, <code>Math.Sqrt</code>, <code>Math.Round(x, 2)</code>.</p>
<p>Рядки — це об’єкти з корисними методами:</p>
<table class="mini"><tr><td><code>s.Length</code></td><td>довжина</td></tr><tr><td><code>s.ToUpper()</code> / <code>ToLower()</code></td><td>регістр</td></tr><tr><td><code>s.Contains("ab")</code></td><td>чи містить</td></tr><tr><td><code>s.Replace("a", "o")</code></td><td>заміна</td></tr><tr><td><code>s.Substring(0, 3)</code></td><td>шматок: від індексу 0, 3 символи</td></tr><tr><td><code>s[0]</code></td><td>перший символ</td></tr></table>`,
        `<p>Операторы: <code>+ - * / %</code>. Если оба числа целые, <code>/</code> — это <b>целочисленное деление</b>: <code>17 / 5 = 3</code>, а <code>17 % 5 = 2</code> (остаток). Для дроби: <code>17.0 / 5 = 3.4</code> или <code>(double)a / b</code>.</p>
<p>Сокращения: <code>x += 5</code>, <code>x++</code> (плюс 1), <code>x--</code>. Класс <code>Math</code>: <code>Math.Max</code>, <code>Math.Min</code>, <code>Math.Abs</code>, <code>Math.Pow(2, 10)</code>, <code>Math.Sqrt</code>, <code>Math.Round(x, 2)</code>.</p>
<p>Строки — это объекты с полезными методами:</p>
<table class="mini"><tr><td><code>s.Length</code></td><td>длина</td></tr><tr><td><code>s.ToUpper()</code> / <code>ToLower()</code></td><td>регистр</td></tr><tr><td><code>s.Contains("ab")</code></td><td>содержит ли</td></tr><tr><td><code>s.Replace("a", "o")</code></td><td>замена</td></tr><tr><td><code>s.Substring(0, 3)</code></td><td>кусок: с индекса 0, 3 символа</td></tr><tr><td><code>s[0]</code></td><td>первый символ</td></tr></table>`,
        `<p>Operators: <code>+ - * / %</code>. If both numbers are integers, <code>/</code> is <b>integer division</b>: <code>17 / 5 = 3</code>, and <code>17 % 5 = 2</code> (remainder). For a fraction: <code>17.0 / 5 = 3.4</code> or <code>(double)a / b</code>.</p>
<p>Shortcuts: <code>x += 5</code>, <code>x++</code> (add 1), <code>x--</code>. The <code>Math</code> class: <code>Math.Max</code>, <code>Math.Min</code>, <code>Math.Abs</code>, <code>Math.Pow(2, 10)</code>, <code>Math.Sqrt</code>, <code>Math.Round(x, 2)</code>.</p>
<p>Strings are objects with handy methods:</p>
<table class="mini"><tr><td><code>s.Length</code></td><td>length</td></tr><tr><td><code>s.ToUpper()</code> / <code>ToLower()</code></td><td>case</td></tr><tr><td><code>s.Contains("ab")</code></td><td>contains?</td></tr><tr><td><code>s.Replace("a", "o")</code></td><td>replace</td></tr><tr><td><code>s.Substring(0, 3)</code></td><td>a slice: from index 0, 3 chars</td></tr><tr><td><code>s[0]</code></td><td>first character</td></tr></table>`),
      why: L(`<p>Цілочисельне ділення — не баг, а дуже корисна річ: «скільки повних рядів по 5 місць», «скільки хвилин у 437 секундах» (<code>437 / 60</code>), а остача <code>%</code> — «що залишилось» (<code>437 % 60</code> секунд). Так у іграх рахують таймери, сітки та чергування ходів.</p>`,
        `<p>Целочисленное деление — не баг, а очень полезная вещь: «сколько полных рядов по 5 мест», «сколько минут в 437 секундах» (<code>437 / 60</code>), а остаток <code>%</code> — «что осталось» (<code>437 % 60</code> секунд). Так в играх считают таймеры, сетки и чередование ходов.</p>`,
        `<p>Integer division isn’t a bug, it’s useful: “how many full rows of 5”, “how many minutes in 437 seconds” (<code>437 / 60</code>), and the remainder <code>%</code> is “what’s left” (<code>437 % 60</code> seconds). Games use this for timers, grids and turn order.</p>`),
      mistakes: L(`<ul><li><code>double avg = 7 / 2;</code> дає <code>3</code>, а не 3.5 — ділення цілих відбулося ще до запису в double.</li><li><code>s.Substring(5, 10)</code> за межами рядка — виняток <code>ArgumentOutOfRangeException</code>.</li><li>Рядки незмінні: <code>s.ToUpper();</code> без присвоєння нічого не змінить у <code>s</code>.</li></ul>`,
        `<ul><li><code>double avg = 7 / 2;</code> даёт <code>3</code>, а не 3.5 — деление целых произошло ещё до записи в double.</li><li><code>s.Substring(5, 10)</code> за пределами строки — исключение <code>ArgumentOutOfRangeException</code>.</li><li>Строки неизменяемы: <code>s.ToUpper();</code> без присваивания ничего не изменит в <code>s</code>.</li></ul>`,
        `<ul><li><code>double avg = 7 / 2;</code> gives <code>3</code>, not 3.5 — integer division happened before storing.</li><li><code>s.Substring(5, 10)</code> past the end throws <code>ArgumentOutOfRangeException</code>.</li><li>Strings are immutable: <code>s.ToUpper();</code> without assignment changes nothing.</li></ul>`),
      examples: [
        { title: L('Ділення', 'Деление', 'Division'), code: M(`int seconds = 437;
Console.WriteLine($"{seconds / 60} min {seconds % 60} sec");
Console.WriteLine(7 / 2);
Console.WriteLine(7.0 / 2);
Console.WriteLine((double)7 / 2);`), note: L('Порівняй 3 і 3.5.', 'Сравни 3 и 3.5.', 'Compare 3 and 3.5.') },
        { title: 'Math', code: M(`Console.WriteLine(Math.Max(8, 13));
Console.WriteLine(Math.Abs(-5));
Console.WriteLine(Math.Pow(2, 10));
Console.WriteLine(Math.Sqrt(81));
Console.WriteLine(Math.Round(3.14159, 2));`), note: L('Math.Pow повертає double.', 'Math.Pow возвращает double.', 'Math.Pow returns a double.') },
        { title: L('Рядки', 'Строки', 'Strings'), code: M(`string s = "Hello, Unity";
Console.WriteLine(s.Length);
Console.WriteLine(s.ToUpper());
Console.WriteLine(s.Contains("Unity"));
Console.WriteLine(s.Replace("Unity", "Codry"));
Console.WriteLine(s.Substring(0, 5));
Console.WriteLine(s[7]);`), note: L('Індекси починаються з 0.', 'Индексы начинаются с 0.', 'Indexes start at 0.') }
      ],
      task: {
        text: L('Дано <code>string word = "programming";</code>. Виведи три рядки: довжину слова, слово великими літерами, і результат <code>17 / 5</code> та <code>17 % 5</code> через пробіл (<code>3 2</code>).', 'Дано <code>string word = "programming";</code>. Выведи три строки: длину слова, слово большими буквами, и результат <code>17 / 5</code> и <code>17 % 5</code> через пробел (<code>3 2</code>).', 'Given <code>string word = "programming";</code>, print three lines: the word’s length, the word in uppercase, and <code>17 / 5</code> and <code>17 % 5</code> separated by a space (<code>3 2</code>).'),
        how: [L('<code>word.Length</code> і <code>word.ToUpper()</code>.', '<code>word.Length</code> и <code>word.ToUpper()</code>.', '<code>word.Length</code> and <code>word.ToUpper()</code>.'), L('<code>$"{17 / 5} {17 % 5}"</code>', '<code>$"{17 / 5} {17 % 5}"</code>', '<code>$"{17 / 5} {17 % 5}"</code>')],
        starter: M(`string word = "programming";
// твій код`),
        solution: M(`string word = "programming";
Console.WriteLine(word.Length);
Console.WriteLine(word.ToUpper());
Console.WriteLine($"{17 / 5} {17 % 5}");`),
        hint: L('Очікувано: <code>11</code>, <code>PROGRAMMING</code>, <code>3 2</code>.', 'Ожидается: <code>11</code>, <code>PROGRAMMING</code>, <code>3 2</code>.', 'Expected: <code>11</code>, <code>PROGRAMMING</code>, <code>3 2</code>.'),
        expected: '11\nPROGRAMMING\n3 2',
        must: /Length[\s\S]*ToUpper/
      },
      quiz: { q: L('Чому дорівнює <code>10 % 4</code>?', 'Чему равно <code>10 % 4</code>?', 'What is <code>10 % 4</code>?'), options: ['2', '2.5', '0'], answer: 0, explain: L('10 = 4·2 + 2, остача 2.', '10 = 4·2 + 2, остаток 2.', '10 = 4·2 + 2, remainder 2.') },
      ref: [{ code: '/ %', d: L('ділення й остача', 'деление и остаток', 'division and remainder') }, { code: 'Math.Max Math.Pow Math.Round', d: 'Math' }, { code: 's.Length s.ToUpper() s.Substring(i, n)', d: L('рядки', 'строки', 'strings') }]
    },
    {
      id: 'conditions', chapter: CH2,
      title: L('Умови: if, else, switch', 'Условия: if, else, switch', 'Conditions: if, else, switch'),
      theory: L(
        `<pre class="inline-code">if (hp &lt;= 0)
{
  Console.WriteLine("Game over");
}
else if (hp &lt; 20)
{
  Console.WriteLine("Low HP!");
}
else
{
  Console.WriteLine("OK");
}</pre>
<p>Порівняння: <code>== != &lt; &gt; &lt;= &gt;=</code>. Логіка: <code>&amp;&amp;</code> (і), <code>||</code> (або), <code>!</code> (ні).</p>
<p><b>switch</b> — вибір з багатьох варіантів одного значення. Кожна гілка закінчується <code>break</code>:</p>
<pre class="inline-code">switch (key)
{
  case "W": Console.WriteLine("Up"); break;
  case "S": Console.WriteLine("Down"); break;
  default: Console.WriteLine("?"); break;
}</pre>
<p>Тернарний оператор: <code>string s = hp &gt; 0 ? "alive" : "dead";</code></p>`,
        `<pre class="inline-code">if (hp &lt;= 0)
{
  Console.WriteLine("Game over");
}
else if (hp &lt; 20)
{
  Console.WriteLine("Low HP!");
}
else
{
  Console.WriteLine("OK");
}</pre>
<p>Сравнения: <code>== != &lt; &gt; &lt;= &gt;=</code>. Логика: <code>&amp;&amp;</code> (и), <code>||</code> (или), <code>!</code> (не).</p>
<p><b>switch</b> — выбор из многих вариантов одного значения. Каждая ветка заканчивается <code>break</code>:</p>
<pre class="inline-code">switch (key)
{
  case "W": Console.WriteLine("Up"); break;
  case "S": Console.WriteLine("Down"); break;
  default: Console.WriteLine("?"); break;
}</pre>
<p>Тернарный оператор: <code>string s = hp &gt; 0 ? "alive" : "dead";</code></p>`,
        `<pre class="inline-code">if (hp &lt;= 0)
{
  Console.WriteLine("Game over");
}
else if (hp &lt; 20)
{
  Console.WriteLine("Low HP!");
}
else
{
  Console.WriteLine("OK");
}</pre>
<p>Comparisons: <code>== != &lt; &gt; &lt;= &gt;=</code>. Logic: <code>&amp;&amp;</code> (and), <code>||</code> (or), <code>!</code> (not).</p>
<p><b>switch</b> picks one of many cases for a single value. Each case ends with <code>break</code>:</p>
<pre class="inline-code">switch (key)
{
  case "W": Console.WriteLine("Up"); break;
  case "S": Console.WriteLine("Down"); break;
  default: Console.WriteLine("?"); break;
}</pre>
<p>Ternary operator: <code>string s = hp &gt; 0 ? "alive" : "dead";</code></p>`),
      why: L(`<p>Чому <code>else if</code>, а не кілька окремих <code>if</code>? Ланцюжок перевіряється згори вниз і зупиняється на <b>першій</b> правдивій умові. Для оцінки 95 окремі if-и спрацювали б і на «≥ 90», і на «≥ 75» — а ланцюжок дасть лише одну правильну відповідь.</p>`,
        `<p>Почему <code>else if</code>, а не несколько отдельных <code>if</code>? Цепочка проверяется сверху вниз и останавливается на <b>первом</b> истинном условии. Для оценки 95 отдельные if-ы сработали бы и на «≥ 90», и на «≥ 75» — а цепочка даст только один правильный ответ.</p>`,
        `<p>Why <code>else if</code> rather than separate <code>if</code>s? The chain is checked top to bottom and stops at the <b>first</b> true condition. For a score of 95 separate ifs would fire for both “≥ 90” and “≥ 75”; the chain gives exactly one answer.</p>`),
      mistakes: L(`<ul><li><code>if (x = 5)</code> — у C# це помилка компіляції; порівняння — <code>==</code>.</li><li>Забутий <code>break</code> у <code>case</code> — помилка «Control cannot fall through».</li><li>Неправильний порядок: спершу <code>&gt;= 60</code>, потім <code>&gt;= 90</code> — друга умова ніколи не спрацює.</li></ul>`,
        `<ul><li><code>if (x = 5)</code> — в C# это ошибка компиляции; сравнение — <code>==</code>.</li><li>Забытый <code>break</code> в <code>case</code> — ошибка «Control cannot fall through».</li><li>Неправильный порядок: сначала <code>&gt;= 60</code>, потом <code>&gt;= 90</code> — второе условие никогда не сработает.</li></ul>`,
        `<ul><li><code>if (x = 5)</code> is a compile error in C#; comparison is <code>==</code>.</li><li>A missing <code>break</code> in a <code>case</code> — error “Control cannot fall through”.</li><li>Wrong order: <code>&gt;= 60</code> before <code>&gt;= 90</code> means the second never fires.</li></ul>`),
      examples: [
        { title: 'if / else if', code: M(`int hp = 15;
if (hp <= 0)
{
  Console.WriteLine("Game over");
}
else if (hp < 20)
{
  Console.WriteLine("Low HP!");
}
else
{
  Console.WriteLine("OK");
}`), note: L('Змінюй hp і дивись, яка гілка спрацює.', 'Меняй hp и смотри, какая ветка сработает.', 'Change hp and see which branch runs.') },
        { title: '&& / ||', code: M(`int age = 13;
bool hasTicket = true;
if (age >= 12 && hasTicket) Console.WriteLine("Welcome to the ride");
if (age < 6 || age > 70) Console.WriteLine("Free entry");
else Console.WriteLine("Normal price");
Console.WriteLine(age >= 18 ? "adult" : "teen");`), note: L('Для однієї дії фігурні дужки можна пропустити.', 'Для одного действия фигурные скобки можно опустить.', 'Braces are optional for a single statement.') },
        { title: 'switch', code: M(`string key = "S";
switch (key)
{
  case "W": Console.WriteLine("Up"); break;
  case "S": Console.WriteLine("Down"); break;
  case "A":
  case "D": Console.WriteLine("Side"); break;
  default: Console.WriteLine("Unknown key"); break;
}`), note: L('Кілька case поспіль — одна спільна дія.', 'Несколько case подряд — одно общее действие.', 'Stacked cases share one action.') }
      ],
      task: {
        text: L('Дано <code>int score = 82;</code> і <code>int day = 6;</code>. Виведи оцінку: ≥ 90 → <code>A</code>, ≥ 75 → <code>B</code>, ≥ 60 → <code>C</code>, інакше <code>F</code>. Потім через <code>switch</code> по <code>day</code>: 6 і 7 → <code>Weekend</code>, інакше <code>Workday</code>.', 'Дано <code>int score = 82;</code> и <code>int day = 6;</code>. Выведи оценку: ≥ 90 → <code>A</code>, ≥ 75 → <code>B</code>, ≥ 60 → <code>C</code>, иначе <code>F</code>. Затем через <code>switch</code> по <code>day</code>: 6 и 7 → <code>Weekend</code>, иначе <code>Workday</code>.', 'Given <code>int score = 82;</code> and <code>int day = 6;</code>, print the grade: ≥ 90 → <code>A</code>, ≥ 75 → <code>B</code>, ≥ 60 → <code>C</code>, else <code>F</code>. Then use <code>switch</code> on <code>day</code>: 6 and 7 → <code>Weekend</code>, otherwise <code>Workday</code>.'),
        how: [L('Ланцюжок <code>if / else if / else</code> від найбільшого порогу.', 'Цепочка <code>if / else if / else</code> от самого большого порога.', 'An <code>if / else if / else</code> chain from the highest threshold.'), L('<code>case 6: case 7: … break; default: … break;</code>', '<code>case 6: case 7: … break; default: … break;</code>', '<code>case 6: case 7: … break; default: … break;</code>')],
        starter: M(`int score = 82;
int day = 6;
// оцінка та день`),
        solution: M(`int score = 82;
int day = 6;
if (score >= 90) Console.WriteLine("A");
else if (score >= 75) Console.WriteLine("B");
else if (score >= 60) Console.WriteLine("C");
else Console.WriteLine("F");
switch (day)
{
  case 6:
  case 7: Console.WriteLine("Weekend"); break;
  default: Console.WriteLine("Workday"); break;
}`),
        hint: L('Очікувано: <code>B</code>, потім <code>Weekend</code>.', 'Ожидается: <code>B</code>, затем <code>Weekend</code>.', 'Expected: <code>B</code>, then <code>Weekend</code>.'),
        expected: 'B\nWeekend',
        must: /switch/
      },
      quiz: { q: L('Що потрібно в кінці кожного case у C#?', 'Что нужно в конце каждого case в C#?', 'What must end every case in C#?'), options: ['continue', 'break', L('нічого', 'ничего', 'nothing')], answer: 1, explain: L('C# забороняє «провалюватися» в наступний case.', 'C# запрещает «проваливаться» в следующий case.', 'C# forbids falling through to the next case.') },
      ref: [{ code: 'if (…) { } else if (…) { } else { }', d: L('умови', 'условия', 'conditions') }, { code: 'switch (x) { case 1: …; break; }', d: 'switch' }, { code: 'c ? a : b', d: L('тернарний', 'тернарный', 'ternary') }]
    },
    {
      id: 'loops', chapter: CH2,
      title: L('Цикли: for, while, foreach', 'Циклы: for, while, foreach', 'Loops: for, while, foreach'),
      theory: L(
        `<p><b>for</b> — коли відомо, скільки разів повторювати:</p>
<pre class="inline-code">for (int i = 1; i &lt;= 5; i++)
{
  Console.WriteLine(i);
}</pre>
<p>Три частини: <i>старт</i> (<code>int i = 1</code>), <i>умова продовження</i> (<code>i &lt;= 5</code>), <i>крок</i> (<code>i++</code>).</p>
<p><b>while</b> — повторювати, поки умова правдива; <b>do … while</b> — те саме, але тіло виконається хоча б раз. <b>foreach</b> — пройти по кожному елементу набору: <code>foreach (char c in "abc")</code>.</p>
<p><code>break</code> — вийти з циклу, <code>continue</code> — перейти до наступного кроку.</p>`,
        `<p><b>for</b> — когда известно, сколько раз повторять:</p>
<pre class="inline-code">for (int i = 1; i &lt;= 5; i++)
{
  Console.WriteLine(i);
}</pre>
<p>Три части: <i>старт</i> (<code>int i = 1</code>), <i>условие продолжения</i> (<code>i &lt;= 5</code>), <i>шаг</i> (<code>i++</code>).</p>
<p><b>while</b> — повторять, пока условие истинно; <b>do … while</b> — то же, но тело выполнится хотя бы раз. <b>foreach</b> — пройти по каждому элементу набора: <code>foreach (char c in "abc")</code>.</p>
<p><code>break</code> — выйти из цикла, <code>continue</code> — перейти к следующему шагу.</p>`,
        `<p><b>for</b> — when you know how many repetitions:</p>
<pre class="inline-code">for (int i = 1; i &lt;= 5; i++)
{
  Console.WriteLine(i);
}</pre>
<p>Three parts: <i>start</i> (<code>int i = 1</code>), <i>keep-going condition</i> (<code>i &lt;= 5</code>), <i>step</i> (<code>i++</code>).</p>
<p><b>while</b> repeats while a condition is true; <b>do … while</b> is the same but runs the body at least once. <b>foreach</b> visits every item of a collection: <code>foreach (char c in "abc")</code>.</p>
<p><code>break</code> leaves the loop, <code>continue</code> jumps to the next iteration.</p>`),
      why: L(`<p>Гра — це, по суті, один великий цикл: кожен кадр (60 разів на секунду) Unity викликає <code>Update()</code>. Хвилі ворогів, перевірка всіх куль, анімації — усе це цикли. Вибір циклу підказує читачеві намір: <code>for</code> — «рівно N разів», <code>while</code> — «поки щось не станеться», <code>foreach</code> — «для кожного».</p>`,
        `<p>Игра — это, по сути, один большой цикл: каждый кадр (60 раз в секунду) Unity вызывает <code>Update()</code>. Волны врагов, проверка всех пуль, анимации — всё это циклы. Выбор цикла подсказывает читателю намерение: <code>for</code> — «ровно N раз», <code>while</code> — «пока что-то не случится», <code>foreach</code> — «для каждого».</p>`,
        `<p>A game is basically one big loop: every frame (60 times a second) Unity calls <code>Update()</code>. Enemy waves, checking every bullet, animations — all loops. The loop you choose tells the reader your intent: <code>for</code> “exactly N times”, <code>while</code> “until something happens”, <code>foreach</code> “for each one”.</p>`),
      mistakes: L(`<ul><li>Нескінченний <code>while</code>: забув змінити змінну умови всередині.</li><li><code>for (int i = 0; i &lt;= 10; i++)</code> замість <code>&lt; 10</code> — зайвий крок.</li><li>Крапка з комою після заголовка: <code>for (…);</code> — тіло виконається лише раз, після циклу.</li></ul>`,
        `<ul><li>Бесконечный <code>while</code>: забыл изменить переменную условия внутри.</li><li><code>for (int i = 0; i &lt;= 10; i++)</code> вместо <code>&lt; 10</code> — лишний шаг.</li><li>Точка с запятой после заголовка: <code>for (…);</code> — тело выполнится лишь раз, после цикла.</li></ul>`,
        `<ul><li>An infinite <code>while</code>: you forgot to change the condition variable inside.</li><li><code>for (int i = 0; i &lt;= 10; i++)</code> instead of <code>&lt; 10</code> — one extra step.</li><li>A semicolon after the header: <code>for (…);</code> — the body runs once, after the loop.</li></ul>`),
      examples: [
        { title: 'for', code: M(`for (int i = 3; i >= 1; i--)
{
  Console.WriteLine($"{i}...");
}
Console.WriteLine("Go!");
for (int i = 0; i <= 20; i += 5) Console.Write(i + " ");
Console.WriteLine();`), note: L('Крок може бути будь-яким.', 'Шаг может быть любым.', 'The step can be anything.') },
        { title: 'while / do', code: M(`int coins = 0;
int waves = 0;
while (coins < 50)
{
  coins += 15;
  waves++;
}
Console.WriteLine($"{waves} waves, {coins} coins");
int n = 100;
do
{
  Console.WriteLine($"Runs once: {n}");
} while (n < 10);`), note: L('do-while перевіряє умову після тіла.', 'do-while проверяет условие после тела.', 'do-while checks after the body.') },
        { title: 'foreach / break / continue', code: M(`foreach (char c in "C#Unity")
{
  if (c == '#') continue;
  if (c == 'i') break;
  Console.Write(c);
}
Console.WriteLine();`), note: L('Пропустили # і зупинились на i.', 'Пропустили # и остановились на i.', 'Skipped # and stopped at i.') }
      ],
      task: {
        text: L('Виведи числа від 1 до 15, але замість кратних 3 пиши <code>Fizz</code>, кратних 5 — <code>Buzz</code>, кратних 15 — <code>FizzBuzz</code>. Кожне значення — з нового рядка.', 'Выведи числа от 1 до 15, но вместо кратных 3 пиши <code>Fizz</code>, кратных 5 — <code>Buzz</code>, кратных 15 — <code>FizzBuzz</code>. Каждое значение — с новой строки.', 'Print 1 to 15, but write <code>Fizz</code> for multiples of 3, <code>Buzz</code> for multiples of 5 and <code>FizzBuzz</code> for multiples of 15. One value per line.'),
        how: [L('Цикл <code>for (int i = 1; i &lt;= 15; i++)</code>.', 'Цикл <code>for (int i = 1; i &lt;= 15; i++)</code>.', 'Loop <code>for (int i = 1; i &lt;= 15; i++)</code>.'), L('Спочатку перевір <code>i % 15 == 0</code> — інакше Fizz «перехопить» 15.', 'Сначала проверь <code>i % 15 == 0</code> — иначе Fizz «перехватит» 15.', 'Check <code>i % 15 == 0</code> first — otherwise Fizz grabs 15.')],
        starter: M('// FizzBuzz від 1 до 15'),
        solution: M(`for (int i = 1; i <= 15; i++)
{
  if (i % 15 == 0) Console.WriteLine("FizzBuzz");
  else if (i % 3 == 0) Console.WriteLine("Fizz");
  else if (i % 5 == 0) Console.WriteLine("Buzz");
  else Console.WriteLine(i);
}`),
        hint: L('Останній рядок — <code>FizzBuzz</code>.', 'Последняя строка — <code>FizzBuzz</code>.', 'The last line is <code>FizzBuzz</code>.'),
        expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz'
      },
      quiz: { q: L('Скільки разів виконається тіло <code>for (int i = 0; i &lt; 4; i++)</code>?', 'Сколько раз выполнится тело <code>for (int i = 0; i &lt; 4; i++)</code>?', 'How many times does <code>for (int i = 0; i &lt; 4; i++)</code> run?'), options: ['3', '4', '5'], answer: 1, explain: L('i = 0, 1, 2, 3.', 'i = 0, 1, 2, 3.', 'i = 0, 1, 2, 3.') },
      ref: [{ code: 'for (int i = 0; i < n; i++)', d: 'for' }, { code: 'while (c) { }  do { } while (c);', d: 'while' }, { code: 'foreach (var x in items)', d: 'foreach' }]
    },
    {
      id: 'arrays', chapter: CH2,
      title: L('Масиви', 'Массивы', 'Arrays'),
      theory: L(
        `<p><b>Масив</b> — набір значень одного типу фіксованого розміру.</p>
<pre class="inline-code">int[] scores = { 7, 3, 9 };
string[] names = new string[3]; // три порожні місця
names[0] = "Ira";
Console.WriteLine(scores.Length); // 3</pre>
<ul><li>Індекси від <code>0</code> до <code>Length - 1</code></li><li><code>Array.Sort(arr)</code> — сортує на місці, <code>Array.Reverse(arr)</code> — розвертає</li><li><code>string.Join(", ", arr)</code> — склеїти елементи в один рядок</li><li><code>Array.IndexOf(arr, x)</code> — де лежить x (або -1)</li></ul>
<p>Двовимірний масив (сітка, мапа рівня): <code>int[,] grid = new int[3, 4];</code>, доступ <code>grid[1, 2]</code>.</p>`,
        `<p><b>Массив</b> — набор значений одного типа фиксированного размера.</p>
<pre class="inline-code">int[] scores = { 7, 3, 9 };
string[] names = new string[3]; // три пустых места
names[0] = "Ira";
Console.WriteLine(scores.Length); // 3</pre>
<ul><li>Индексы от <code>0</code> до <code>Length - 1</code></li><li><code>Array.Sort(arr)</code> — сортирует на месте, <code>Array.Reverse(arr)</code> — разворачивает</li><li><code>string.Join(", ", arr)</code> — склеить элементы в одну строку</li><li><code>Array.IndexOf(arr, x)</code> — где лежит x (или -1)</li></ul>
<p>Двумерный массив (сетка, карта уровня): <code>int[,] grid = new int[3, 4];</code>, доступ <code>grid[1, 2]</code>.</p>`,
        `<p>An <b>array</b> is a fixed-size collection of values of one type.</p>
<pre class="inline-code">int[] scores = { 7, 3, 9 };
string[] names = new string[3]; // three empty slots
names[0] = "Ira";
Console.WriteLine(scores.Length); // 3</pre>
<ul><li>Indexes go from <code>0</code> to <code>Length - 1</code></li><li><code>Array.Sort(arr)</code> sorts in place, <code>Array.Reverse(arr)</code> reverses</li><li><code>string.Join(", ", arr)</code> glues items into one string</li><li><code>Array.IndexOf(arr, x)</code> finds x (or -1)</li></ul>
<p>A 2D array (grid, level map): <code>int[,] grid = new int[3, 4];</code>, accessed as <code>grid[1, 2]</code>.</p>`),
      why: L(`<p>Уяви 30 змінних <code>score1</code>…<code>score30</code> — жах. Масив дає одне ім’я на весь набір і номер для кожного елемента, тож обробити всі значення можна одним циклом. Саме тому інвентар, таблиця рекордів чи клітинки поля в іграх зберігаються в масивах.</p>`,
        `<p>Представь 30 переменных <code>score1</code>…<code>score30</code> — ужас. Массив даёт одно имя на весь набор и номер для каждого элемента, так что обработать все значения можно одним циклом. Именно поэтому инвентарь, таблица рекордов или клетки поля в играх хранятся в массивах.</p>`,
        `<p>Imagine 30 variables <code>score1</code>…<code>score30</code> — awful. An array gives one name for the whole set and a number for each item, so one loop handles them all. That’s why inventories, high-score tables and board cells in games live in arrays.</p>`),
      mistakes: L(`<ul><li><code>arr[arr.Length]</code> — <code>IndexOutOfRangeException</code>; останній — <code>arr[arr.Length - 1]</code>.</li><li><code>Console.WriteLine(arr)</code> виведе <code>System.Int32[]</code> — використовуй <code>string.Join</code>.</li><li>Розмір масиву змінити не можна — для цього є <code>List</code> (далі в курсі).</li></ul>`,
        `<ul><li><code>arr[arr.Length]</code> — <code>IndexOutOfRangeException</code>; последний — <code>arr[arr.Length - 1]</code>.</li><li><code>Console.WriteLine(arr)</code> выведет <code>System.Int32[]</code> — используй <code>string.Join</code>.</li><li>Размер массива изменить нельзя — для этого есть <code>List</code> (дальше в курсе).</li></ul>`,
        `<ul><li><code>arr[arr.Length]</code> throws <code>IndexOutOfRangeException</code>; the last is <code>arr[arr.Length - 1]</code>.</li><li><code>Console.WriteLine(arr)</code> prints <code>System.Int32[]</code> — use <code>string.Join</code>.</li><li>An array can’t be resized — that’s what <code>List</code> is for (later in the course).</li></ul>`),
      examples: [
        { title: L('Основи', 'Основы', 'Basics'), code: M(`string[] items = { "Sword", "Shield", "Potion" };
Console.WriteLine(items[0]);
Console.WriteLine(items[items.Length - 1]);
items[1] = "Bow";
Console.WriteLine(string.Join(", ", items));
Console.WriteLine(items.Length);`), note: L('Останній елемент — Length - 1.', 'Последний элемент — Length - 1.', 'The last item is Length - 1.') },
        { title: L('Сума й максимум', 'Сумма и максимум', 'Sum and max'), code: M(`int[] scores = { 12, 7, 19, 4 };
int sum = 0;
int best = scores[0];
foreach (int s in scores)
{
  sum += s;
  if (s > best) best = s;
}
Console.WriteLine($"Sum {sum}, best {best}");
Array.Sort(scores);
Console.WriteLine(string.Join(" ", scores));`), note: L('Array.Sort змінює сам масив.', 'Array.Sort меняет сам массив.', 'Array.Sort changes the array itself.') },
        { title: L('Сітка 2D', 'Сетка 2D', '2D grid'), code: M(`int[,] map = new int[3, 4];
map[1, 2] = 1;
for (int r = 0; r < 3; r++)
{
  for (int c = 0; c < 4; c++)
    Console.Write(map[r, c] == 1 ? "#" : ".");
  Console.WriteLine();
}`), note: L('Так малюють мапи рівнів.', 'Так рисуют карты уровней.', 'This is how level maps are drawn.') }
      ],
      task: {
        text: L('Дано <code>int[] scores = { 7, 3, 9, 4, 10 };</code>. Виведи <code>Sum 33</code>, <code>Max 10</code> і <code>Average 6.6</code> — кожне з нового рядка.', 'Дано <code>int[] scores = { 7, 3, 9, 4, 10 };</code>. Выведи <code>Sum 33</code>, <code>Max 10</code> и <code>Average 6.6</code> — каждое с новой строки.', 'Given <code>int[] scores = { 7, 3, 9, 4, 10 };</code>, print <code>Sum 33</code>, <code>Max 10</code> and <code>Average 6.6</code>, each on its own line.'),
        how: [L('Цикл <code>foreach</code> для суми й максимуму.', 'Цикл <code>foreach</code> для суммы и максимума.', 'A <code>foreach</code> for sum and max.'), L('Середнє: <code>(double)sum / scores.Length</code>.', 'Среднее: <code>(double)sum / scores.Length</code>.', 'Average: <code>(double)sum / scores.Length</code>.')],
        starter: M(`int[] scores = { 7, 3, 9, 4, 10 };
// сума, максимум, середнє`),
        solution: M(`int[] scores = { 7, 3, 9, 4, 10 };
int sum = 0;
int max = scores[0];
foreach (int s in scores)
{
  sum += s;
  if (s > max) max = s;
}
Console.WriteLine($"Sum {sum}");
Console.WriteLine($"Max {max}");
Console.WriteLine($"Average {(double)sum / scores.Length}");`),
        hint: L('Без <code>(double)</code> середнє вийде 6.', 'Без <code>(double)</code> среднее выйдет 6.', 'Without <code>(double)</code> the average is 6.'),
        expected: 'Sum 33\nMax 10\nAverage 6.6'
      },
      quiz: { q: L('Який індекс останнього елемента масиву з 5 елементів?', 'Какой индекс последнего элемента массива из 5 элементов?', 'What is the last index of a 5-item array?'), options: ['5', '4', '6'], answer: 1, explain: L('Індекси 0…4.', 'Индексы 0…4.', 'Indexes 0…4.') },
      ref: [{ code: 'int[] a = { 1, 2 };', d: L('створення', 'создание', 'creation') }, { code: 'a.Length', d: L('розмір', 'размер', 'size') }, { code: 'Array.Sort(a)  string.Join(", ", a)', d: L('утиліти', 'утилиты', 'helpers') }]
    },
    {
      id: 'methods', chapter: CH2,
      title: L('Методи (функції)', 'Методы (функции)', 'Methods (functions)'),
      theory: L(
        `<p><b>Метод</b> — іменований шматок коду, який можна викликати багато разів. Поки що всі наші методи будуть <code>static</code> і житимуть у класі <code>Program</code> поруч із <code>Main</code>:</p>
<pre class="inline-code">static int Add(int a, int b)
{
  return a + b;
}

static void Greet(string name)
{
  Console.WriteLine($"Hi, {name}");
}</pre>
<ul><li>Перед ім’ям — <b>тип результату</b>: <code>int</code>, <code>string</code>, <code>bool</code>… або <code>void</code> («нічого не повертає»)</li><li>У дужках — <b>параметри</b> з типами</li><li><code>return</code> повертає значення і завершує метод</li><li>Параметр за замовчуванням: <code>static void Hit(int dmg = 10)</code></li><li><b>Перевантаження</b>: кілька методів з одним ім’ям, але різними параметрами</li></ul>
<p>Короткий запис для однорядкових: <code>static int Square(int x) =&gt; x * x;</code></p>`,
        `<p><b>Метод</b> — именованный кусок кода, который можно вызывать много раз. Пока что все наши методы будут <code>static</code> и жить в классе <code>Program</code> рядом с <code>Main</code>:</p>
<pre class="inline-code">static int Add(int a, int b)
{
  return a + b;
}

static void Greet(string name)
{
  Console.WriteLine($"Hi, {name}");
}</pre>
<ul><li>Перед именем — <b>тип результата</b>: <code>int</code>, <code>string</code>, <code>bool</code>… или <code>void</code> («ничего не возвращает»)</li><li>В скобках — <b>параметры</b> с типами</li><li><code>return</code> возвращает значение и завершает метод</li><li>Параметр по умолчанию: <code>static void Hit(int dmg = 10)</code></li><li><b>Перегрузка</b>: несколько методов с одним именем, но разными параметрами</li></ul>
<p>Короткая запись для однострочных: <code>static int Square(int x) =&gt; x * x;</code></p>`,
        `<p>A <b>method</b> is a named block of code you can call many times. For now our methods are <code>static</code> and live in <code>Program</code> next to <code>Main</code>:</p>
<pre class="inline-code">static int Add(int a, int b)
{
  return a + b;
}

static void Greet(string name)
{
  Console.WriteLine($"Hi, {name}");
}</pre>
<ul><li>Before the name is the <b>return type</b>: <code>int</code>, <code>string</code>, <code>bool</code>… or <code>void</code> (“returns nothing”)</li><li>Inside the parentheses are typed <b>parameters</b></li><li><code>return</code> gives back a value and ends the method</li><li>Default parameter: <code>static void Hit(int dmg = 10)</code></li><li><b>Overloading</b>: several methods with one name but different parameters</li></ul>
<p>Short form for one-liners: <code>static int Square(int x) =&gt; x * x;</code></p>`),
      why: L(`<p>Методи — головний інструмент проти повторів. Якщо формулу шкоди написано в одному місці, то щоб збалансувати гру, її треба змінити лише раз. А ще гарна назва (<code>IsGameOver()</code>) пояснює код краще за будь-який коментар.</p>`,
        `<p>Методы — главный инструмент против повторов. Если формула урона написана в одном месте, то чтобы сбалансировать игру, её нужно изменить лишь раз. А ещё хорошее название (<code>IsGameOver()</code>) объясняет код лучше любого комментария.</p>`,
        `<p>Methods are the main weapon against repetition. If the damage formula lives in one place, rebalancing the game means changing it once. And a good name (<code>IsGameOver()</code>) explains code better than any comment.</p>`),
      mistakes: L(`<ul><li>Метод з типом <code>int</code> без <code>return</code> на якомусь шляху — помилка «not all code paths return a value».</li><li>Виклик без дужок: <code>Greet;</code> — це не виклик.</li><li>Без <code>static</code> метод не можна викликати прямо з <code>static Main</code>.</li></ul>`,
        `<ul><li>Метод с типом <code>int</code> без <code>return</code> на каком-то пути — ошибка «not all code paths return a value».</li><li>Вызов без скобок: <code>Greet;</code> — это не вызов.</li><li>Без <code>static</code> метод нельзя вызвать прямо из <code>static Main</code>.</li></ul>`,
        `<ul><li>An <code>int</code> method missing <code>return</code> on some path — error “not all code paths return a value”.</li><li>Calling without parentheses: <code>Greet;</code> isn’t a call.</li><li>Without <code>static</code>, a method can’t be called directly from <code>static Main</code>.</li></ul>`),
      examples: [
        { title: L('Повернення значення', 'Возврат значения', 'Returning a value'), code: M(`Console.WriteLine(Add(2, 3));
Console.WriteLine(Add(Add(1, 1), 10));
Greet("Max");`, { members: `static int Add(int a, int b)
{
  return a + b;
}

static void Greet(string name)
{
  Console.WriteLine($"Hi, {name}!");
}` }), note: L('Результат методу можна передати в інший метод.', 'Результат метода можно передать в другой метод.', 'One method’s result can feed another.') },
        { title: L('За замовчуванням', 'По умолчанию', 'Defaults'), code: M(`Hit("Slime");
Hit("Dragon", 50);`, { members: `static void Hit(string target, int damage = 10)
{
  Console.WriteLine($"{target} takes {damage} damage");
}` }), note: L('Другий аргумент можна не передавати.', 'Второй аргумент можно не передавать.', 'The second argument is optional.') },
        { title: L('Перевантаження і =>', 'Перегрузка и =>', 'Overloading and =>'), code: M(`Console.WriteLine(Area(5));
Console.WriteLine(Area(3, 4));
Console.WriteLine(IsAdult(16));`, { members: `static int Area(int side) => side * side;
static int Area(int w, int h) => w * h;
static bool IsAdult(int age) => age >= 18;` }), note: L('Компілятор обирає метод за кількістю аргументів.', 'Компилятор выбирает метод по количеству аргументов.', 'The compiler picks by argument count.') }
      ],
      task: {
        text: L('Напиши методи <code>static int Square(int x)</code> і <code>static bool IsEven(int n)</code>. У <code>Main</code> виведи <code>Square(7)</code>, <code>IsEven(10)</code>, <code>IsEven(7)</code>.', 'Напиши методы <code>static int Square(int x)</code> и <code>static bool IsEven(int n)</code>. В <code>Main</code> выведи <code>Square(7)</code>, <code>IsEven(10)</code>, <code>IsEven(7)</code>.', 'Write <code>static int Square(int x)</code> and <code>static bool IsEven(int n)</code>. In <code>Main</code> print <code>Square(7)</code>, <code>IsEven(10)</code>, <code>IsEven(7)</code>.'),
        how: [L('Методи пишуться всередині <code>class Program</code>, але поза <code>Main</code>.', 'Методы пишутся внутри <code>class Program</code>, но вне <code>Main</code>.', 'Methods go inside <code>class Program</code> but outside <code>Main</code>.'), L('Парне: <code>n % 2 == 0</code>.', 'Чётное: <code>n % 2 == 0</code>.', 'Even: <code>n % 2 == 0</code>.')],
        starter: M(`// виклич методи тут`, { members: '// напиши Square та IsEven' }),
        solution: M(`Console.WriteLine(Square(7));
Console.WriteLine(IsEven(10));
Console.WriteLine(IsEven(7));`, { members: `static int Square(int x)
{
  return x * x;
}

static bool IsEven(int n)
{
  return n % 2 == 0;
}` }),
        hint: L('Очікувано: <code>49</code>, <code>True</code>, <code>False</code>.', 'Ожидается: <code>49</code>, <code>True</code>, <code>False</code>.', 'Expected: <code>49</code>, <code>True</code>, <code>False</code>.'),
        expected: '49\nTrue\nFalse',
        must: /static\s+int\s+Square[\s\S]*static\s+bool\s+IsEven/
      },
      quiz: { q: L('Що означає <code>void</code>?', 'Что означает <code>void</code>?', 'What does <code>void</code> mean?'), options: [L('метод нічого не повертає', 'метод ничего не возвращает', 'the method returns nothing'), L('порожній рядок', 'пустая строка', 'an empty string'), L('метод приватний', 'метод приватный', 'the method is private')], answer: 0, explain: L('void — «без результату».', 'void — «без результата».', 'void means “no result”.') },
      ref: [{ code: 'static int F(int a) { return a; }', d: L('метод', 'метод', 'method') }, { code: 'static int F(int a) => a * 2;', d: L('коротко', 'коротко', 'short form') }, { code: 'void F(int x = 5)', d: L('за замовчуванням', 'по умолчанию', 'default') }]
    },
    {
      id: 'classes', chapter: CH3,
      title: L('Класи та об’єкти', 'Классы и объекты', 'Classes and objects'),
      theory: L(
        `<p><b>Клас</b> — креслення, а <b>об’єкт</b> — річ, створена за кресленням. Клас <code>Pet</code> описує, що є в кожного улюбленця (поля) і що він уміє (методи):</p>
<pre class="inline-code">class Pet
{
  public string Name;
  public int Hunger;

  public Pet(string name, int hunger) // конструктор
  {
    Name = name;
    Hunger = hunger;
  }

  public void Feed()
  {
    Hunger -= 3;
  }
}

Pet rex = new Pet("Rex", 8);
rex.Feed();</pre>
<ul><li><b>Конструктор</b> — метод з ім’ям класу без типу результату; викликається при <code>new</code></li><li><code>public</code> — видно ззовні, <code>private</code> — лише всередині класу (за замовчуванням)</li><li><code>this</code> — «цей об’єкт»: <code>this.Name = name;</code></li><li>Методи об’єкта <b>без</b> <code>static</code> — вони працюють з даними конкретного об’єкта</li></ul>`,
        `<p><b>Класс</b> — чертёж, а <b>объект</b> — вещь, созданная по чертежу. Класс <code>Pet</code> описывает, что есть у каждого питомца (поля) и что он умеет (методы):</p>
<pre class="inline-code">class Pet
{
  public string Name;
  public int Hunger;

  public Pet(string name, int hunger) // конструктор
  {
    Name = name;
    Hunger = hunger;
  }

  public void Feed()
  {
    Hunger -= 3;
  }
}

Pet rex = new Pet("Rex", 8);
rex.Feed();</pre>
<ul><li><b>Конструктор</b> — метод с именем класса без типа результата; вызывается при <code>new</code></li><li><code>public</code> — видно снаружи, <code>private</code> — только внутри класса (по умолчанию)</li><li><code>this</code> — «этот объект»: <code>this.Name = name;</code></li><li>Методы объекта <b>без</b> <code>static</code> — они работают с данными конкретного объекта</li></ul>`,
        `<p>A <b>class</b> is a blueprint, an <b>object</b> is a thing built from it. The <code>Pet</code> class describes what every pet has (fields) and can do (methods):</p>
<pre class="inline-code">class Pet
{
  public string Name;
  public int Hunger;

  public Pet(string name, int hunger) // constructor
  {
    Name = name;
    Hunger = hunger;
  }

  public void Feed()
  {
    Hunger -= 3;
  }
}

Pet rex = new Pet("Rex", 8);
rex.Feed();</pre>
<ul><li>A <b>constructor</b> is a method named after the class with no return type; it runs on <code>new</code></li><li><code>public</code> is visible outside, <code>private</code> only inside the class (the default)</li><li><code>this</code> means “this object”: <code>this.Name = name;</code></li><li>Object methods have <b>no</b> <code>static</code> — they work with that object’s data</li></ul>`),
      why: L(`<p>У Unity <b>все</b> — класи: гравець, ворог, монетка — це об’єкти зі своїми даними й поведінкою. Клас збирає разом те, що логічно пов’язано: не треба тримати окремі масиви імен, здоров’я і швидкостей — у кожного ворога є власні поля. Сто ворогів — сто об’єктів одного класу.</p>`,
        `<p>В Unity <b>всё</b> — классы: игрок, враг, монетка — это объекты со своими данными и поведением. Класс собирает вместе то, что логически связано: не нужно держать отдельные массивы имён, здоровья и скоростей — у каждого врага есть собственные поля. Сто врагов — сто объектов одного класса.</p>`,
        `<p>In Unity <b>everything</b> is a class: the player, an enemy, a coin — objects with their own data and behaviour. A class bundles what belongs together: no separate arrays of names, health and speeds — each enemy has its own fields. A hundred enemies are a hundred objects of one class.</p>`),
      mistakes: L(`<ul><li>Забутий <code>new</code>: <code>Pet p;</code> — змінна є, а об’єкта немає.</li><li>Поле без <code>public</code> — помилка «inaccessible due to its protection level».</li><li>Параметр з тим самим ім’ям, що й поле: <code>Name = Name;</code> — присвоїть сам собі; використовуй <code>this.Name</code>.</li></ul>`,
        `<ul><li>Забытый <code>new</code>: <code>Pet p;</code> — переменная есть, а объекта нет.</li><li>Поле без <code>public</code> — ошибка «inaccessible due to its protection level».</li><li>Параметр с тем же именем, что и поле: <code>Name = Name;</code> — присвоит сам себе; используй <code>this.Name</code>.</li></ul>`,
        `<ul><li>Forgetting <code>new</code>: <code>Pet p;</code> — a variable but no object.</li><li>A field without <code>public</code> — error “inaccessible due to its protection level”.</li><li>A parameter named like the field: <code>Name = Name;</code> assigns to itself; use <code>this.Name</code>.</li></ul>`),
      examples: [
        { title: L('Клас і об’єкти', 'Класс и объекты', 'Class and objects'), code: M(`Enemy a = new Enemy("Slime", 20);
Enemy b = new Enemy("Orc", 50);
a.TakeHit(5);
b.TakeHit(12);
a.Show();
b.Show();`, { before: `class Enemy
{
  public string Name;
  public int Hp;

  public Enemy(string name, int hp)
  {
    Name = name;
    Hp = hp;
  }

  public void TakeHit(int dmg)
  {
    Hp -= dmg;
  }

  public void Show()
  {
    Console.WriteLine($"{Name}: {Hp} hp");
  }
}` }), note: L('Кожен об’єкт має свої поля.', 'Каждый объект имеет свои поля.', 'Each object has its own fields.') },
        { title: 'this', code: M(`var p = new Player("Nika");
p.AddScore(10);
p.AddScore(5);
Console.WriteLine($"{p.name}: {p.score}");`, { before: `class Player
{
  public string name;
  public int score;

  public Player(string name)
  {
    this.name = name;
    this.score = 0;
  }

  public void AddScore(int score)
  {
    this.score += score;
  }
}` }), note: L('this розрізняє поле й параметр з однаковим ім’ям.', 'this различает поле и параметр с одинаковым именем.', 'this tells a field from a same-named parameter.') },
        { title: L('Метод повертає значення', 'Метод возвращает значение', 'Method returning a value'), code: M(`var r = new Rect(4, 3);
Console.WriteLine(r.Area());
Console.WriteLine(r.IsSquare());`, { before: `class Rect
{
  public int W, H;
  public Rect(int w, int h) { W = w; H = h; }
  public int Area() => W * H;
  public bool IsSquare() => W == H;
}` }), note: L('Методи об’єкта користуються його полями.', 'Методы объекта пользуются его полями.', 'Object methods use its fields.') }
      ],
      task: {
        text: L('Створи клас <code>Pet</code> з полями <code>Name</code>, <code>Hunger</code>, конструктором і методами <code>Feed()</code> (голод −3, але не менше 0) та <code>Status()</code> (виводить <code>Rex hunger 2</code>). У Main: <code>new Pet("Rex", 8)</code>, двічі Feed, Status, ще раз Feed, Status.', 'Создай класс <code>Pet</code> с полями <code>Name</code>, <code>Hunger</code>, конструктором и методами <code>Feed()</code> (голод −3, но не меньше 0) и <code>Status()</code> (выводит <code>Rex hunger 2</code>). В Main: <code>new Pet("Rex", 8)</code>, дважды Feed, Status, ещё раз Feed, Status.', 'Create a <code>Pet</code> class with <code>Name</code>, <code>Hunger</code>, a constructor, and methods <code>Feed()</code> (hunger −3, not below 0) and <code>Status()</code> (prints <code>Rex hunger 2</code>). In Main: <code>new Pet("Rex", 8)</code>, Feed twice, Status, Feed again, Status.'),
        how: [L('Не нижче нуля: <code>Hunger = Math.Max(0, Hunger - 3);</code>', 'Не ниже нуля: <code>Hunger = Math.Max(0, Hunger - 3);</code>', 'Not below zero: <code>Hunger = Math.Max(0, Hunger - 3);</code>'), L('Клас пиши над <code>class Program</code>.', 'Класс пиши над <code>class Program</code>.', 'Put the class above <code>class Program</code>.')],
        starter: M(`// створи улюбленця`, { before: `class Pet
{
  // поля, конструктор, Feed, Status
}` }),
        solution: M(`Pet rex = new Pet("Rex", 8);
rex.Feed();
rex.Feed();
rex.Status();
rex.Feed();
rex.Status();`, { before: `class Pet
{
  public string Name;
  public int Hunger;

  public Pet(string name, int hunger)
  {
    Name = name;
    Hunger = hunger;
  }

  public void Feed()
  {
    Hunger = Math.Max(0, Hunger - 3);
  }

  public void Status()
  {
    Console.WriteLine($"{Name} hunger {Hunger}");
  }
}` }),
        hint: L('8 → 5 → 2, потім 2 → 0 (не −1).', '8 → 5 → 2, затем 2 → 0 (не −1).', '8 → 5 → 2, then 2 → 0 (not −1).'),
        expected: 'Rex hunger 2\nRex hunger 0',
        must: /class\s+Pet[\s\S]*public\s+Pet\s*\(/
      },
      quiz: { q: L('Що створює новий об’єкт?', 'Что создаёт новый объект?', 'What creates a new object?'), options: ['class', 'new', 'this'], answer: 1, explain: L('<code>new Pet(…)</code> викликає конструктор.', '<code>new Pet(…)</code> вызывает конструктор.', '<code>new Pet(…)</code> calls the constructor.') },
      ref: [{ code: 'class A { public int X; }', d: L('клас', 'класс', 'class') }, { code: 'public A(int x) { X = x; }', d: L('конструктор', 'конструктор', 'constructor') }, { code: 'var a = new A(5);', d: L('об’єкт', 'объект', 'object') }]
    },
    {
      id: 'properties', chapter: CH3,
      title: L('Властивості та інкапсуляція', 'Свойства и инкапсуляция', 'Properties and encapsulation'),
      theory: L(
        `<p><b>Інкапсуляція</b> — ховати дані всередині об’єкта й давати змінювати їх лише «правильними» способами. У C# для цього є <b>властивості</b>:</p>
<pre class="inline-code">class Account
{
  public string Owner { get; set; }        // звичайна
  public int Balance { get; private set; }  // читати можна, змінювати — лише всередині

  public void Deposit(int amount)
  {
    if (amount &gt; 0) Balance += amount;
  }
}</pre>
<p>Властивість з перевіркою в <code>set</code>:</p>
<pre class="inline-code">private int hp;
public int Hp
{
  get { return hp; }
  set { hp = Math.Max(0, value); } // value — нове значення
}</pre>
<p>Обчислювана: <code>public bool IsAlive =&gt; Hp &gt; 0;</code>. <b>static</b>-поле спільне для всіх об’єктів класу: <code>public static int Count;</code></p>`,
        `<p><b>Инкапсуляция</b> — прятать данные внутри объекта и давать изменять их только «правильными» способами. В C# для этого есть <b>свойства</b>:</p>
<pre class="inline-code">class Account
{
  public string Owner { get; set; }        // обычное
  public int Balance { get; private set; }  // читать можно, менять — только внутри

  public void Deposit(int amount)
  {
    if (amount &gt; 0) Balance += amount;
  }
}</pre>
<p>Свойство с проверкой в <code>set</code>:</p>
<pre class="inline-code">private int hp;
public int Hp
{
  get { return hp; }
  set { hp = Math.Max(0, value); } // value — новое значение
}</pre>
<p>Вычисляемое: <code>public bool IsAlive =&gt; Hp &gt; 0;</code>. <b>static</b>-поле общее для всех объектов класса: <code>public static int Count;</code></p>`,
        `<p><b>Encapsulation</b> means hiding data inside an object and letting it change only in “correct” ways. C# uses <b>properties</b> for that:</p>
<pre class="inline-code">class Account
{
  public string Owner { get; set; }        // ordinary
  public int Balance { get; private set; }  // readable, changed only inside

  public void Deposit(int amount)
  {
    if (amount &gt; 0) Balance += amount;
  }
}</pre>
<p>A property with a check in <code>set</code>:</p>
<pre class="inline-code">private int hp;
public int Hp
{
  get { return hp; }
  set { hp = Math.Max(0, value); } // value is the new value
}</pre>
<p>Computed: <code>public bool IsAlive =&gt; Hp &gt; 0;</code>. A <b>static</b> field is shared by all objects of a class: <code>public static int Count;</code></p>`),
      why: L(`<p>Якщо будь-хто може написати <code>account.Balance = 1000000</code>, баги й «чити» гарантовані. З <code>private set</code> гроші змінюються лише через <code>Deposit</code>/<code>Withdraw</code>, де є перевірки. Помилку легко знайти: шукати треба в двох методах, а не по всьому проєкту.</p>`,
        `<p>Если кто угодно может написать <code>account.Balance = 1000000</code>, баги и «читы» гарантированы. С <code>private set</code> деньги меняются только через <code>Deposit</code>/<code>Withdraw</code>, где есть проверки. Ошибку легко найти: искать нужно в двух методах, а не по всему проекту.</p>`,
        `<p>If anyone can write <code>account.Balance = 1000000</code>, bugs and cheats are guaranteed. With <code>private set</code>, money only changes via <code>Deposit</code>/<code>Withdraw</code>, which have checks. Bugs are easy to find: look in two methods, not the whole project.</p>`),
      mistakes: L(`<ul><li>Усередині <code>set</code> писати <code>Hp = value</code> замість поля <code>hp</code> — нескінченна рекурсія й <code>StackOverflowException</code>.</li><li>Спроба змінити <code>private set</code>-властивість ззовні — помилка компіляції (і це добре!).</li></ul>`,
        `<ul><li>Внутри <code>set</code> писать <code>Hp = value</code> вместо поля <code>hp</code> — бесконечная рекурсия и <code>StackOverflowException</code>.</li><li>Попытка изменить <code>private set</code>-свойство снаружи — ошибка компиляции (и это хорошо!).</li></ul>`,
        `<ul><li>Writing <code>Hp = value</code> inside <code>set</code> instead of the field <code>hp</code> — infinite recursion and <code>StackOverflowException</code>.</li><li>Changing a <code>private set</code> property from outside — compile error (which is good!).</li></ul>`),
      examples: [
        { title: L('Автовластивості', 'Автосвойства', 'Auto-properties'), code: M(`var h = new Hero { Name = "Kira", Level = 3 };
h.Level++;
Console.WriteLine($"{h.Name} lvl {h.Level}");`, { before: `class Hero
{
  public string Name { get; set; }
  public int Level { get; set; }
}` }), note: L('Ініціалізатор <code>{ Name = … }</code> заповнює властивості.', 'Инициализатор <code>{ Name = … }</code> заполняет свойства.', 'The initializer <code>{ Name = … }</code> sets properties.') },
        { title: L('Перевірка в set', 'Проверка в set', 'Validation in set'), code: M(`var u = new Unit();
u.Hp = 30;
Console.WriteLine(u.Hp);
u.Hp = -15;
Console.WriteLine(u.Hp);
Console.WriteLine(u.IsAlive);`, { before: `class Unit
{
  private int hp;
  public int Hp
  {
    get { return hp; }
    set { hp = Math.Max(0, value); }
  }
  public bool IsAlive => Hp > 0;
}` }), note: L('Від’ємне здоров’я стало 0.', 'Отрицательное здоровье стало 0.', 'Negative health became 0.') },
        { title: 'static', code: M(`new Coin();
new Coin();
new Coin();
Console.WriteLine($"Coins created: {Coin.Count}");`, { before: `class Coin
{
  public static int Count = 0;
  public Coin() { Count++; }
}` }), note: L('static-поле одне на весь клас.', 'static-поле одно на весь класс.', 'A static field is one per class.') }
      ],
      task: {
        text: L('Зроби клас <code>BankAccount</code> з <code>public int Balance { get; private set; }</code>, методами <code>Deposit(int)</code> і <code>bool Withdraw(int)</code> (знімає, лише якщо вистачає, і повертає true/false). У Main: Deposit(100), виведи <code>Withdraw(30)</code>, <code>Withdraw(100)</code> і <code>Balance 70</code>.', 'Сделай класс <code>BankAccount</code> с <code>public int Balance { get; private set; }</code>, методами <code>Deposit(int)</code> и <code>bool Withdraw(int)</code> (снимает, только если хватает, и возвращает true/false). В Main: Deposit(100), выведи <code>Withdraw(30)</code>, <code>Withdraw(100)</code> и <code>Balance 70</code>.', 'Make a <code>BankAccount</code> class with <code>public int Balance { get; private set; }</code>, methods <code>Deposit(int)</code> and <code>bool Withdraw(int)</code> (withdraws only if there’s enough and returns true/false). In Main: Deposit(100), then print <code>Withdraw(30)</code>, <code>Withdraw(100)</code> and <code>Balance 70</code>.'),
        how: [L('У Withdraw: <code>if (amount &gt; Balance) return false;</code>', 'В Withdraw: <code>if (amount &gt; Balance) return false;</code>', 'In Withdraw: <code>if (amount &gt; Balance) return false;</code>')],
        starter: M(`var acc = new BankAccount();
// Deposit, Withdraw, Balance`, { before: `class BankAccount
{
  // Balance, Deposit, Withdraw
}` }),
        solution: M(`var acc = new BankAccount();
acc.Deposit(100);
Console.WriteLine(acc.Withdraw(30));
Console.WriteLine(acc.Withdraw(100));
Console.WriteLine($"Balance {acc.Balance}");`, { before: `class BankAccount
{
  public int Balance { get; private set; }

  public void Deposit(int amount)
  {
    if (amount > 0) Balance += amount;
  }

  public bool Withdraw(int amount)
  {
    if (amount > Balance) return false;
    Balance -= amount;
    return true;
  }
}` }),
        hint: L('Очікувано: <code>True</code>, <code>False</code>, <code>Balance 70</code>.', 'Ожидается: <code>True</code>, <code>False</code>, <code>Balance 70</code>.', 'Expected: <code>True</code>, <code>False</code>, <code>Balance 70</code>.'),
        expected: 'True\nFalse\nBalance 70',
        must: /private\s+set/
      },
      quiz: { q: L('Що дає <code>{ get; private set; }</code>?', 'Что даёт <code>{ get; private set; }</code>?', 'What does <code>{ get; private set; }</code> give?'), options: [L('читати всім, змінювати лише класу', 'читать всем, менять только классу', 'everyone reads, only the class writes'), L('ніхто не читає', 'никто не читает', 'nobody can read'), L('змінювати всім', 'менять всем', 'everyone can write')], answer: 0, explain: L('get публічний, set приватний.', 'get публичный, set приватный.', 'get is public, set is private.') },
      ref: [{ code: 'public int X { get; set; }', d: L('автовластивість', 'автосвойство', 'auto-property') }, { code: '{ get; private set; }', d: L('лише читання ззовні', 'только чтение снаружи', 'read-only outside') }, { code: 'public bool Ok => X > 0;', d: L('обчислювана', 'вычисляемое', 'computed') }]
    },
    {
      id: 'inheritance', chapter: CH3,
      title: L('Успадкування та інтерфейси', 'Наследование и интерфейсы', 'Inheritance and interfaces'),
      theory: L(
        `<p><b>Успадкування</b>: клас-нащадок отримує все від батьківського й додає своє. Запис — через двокрапку:</p>
<pre class="inline-code">class Enemy
{
  public string Name;
  public Enemy(string name) { Name = name; }
  public virtual int Damage() =&gt; 5;   // можна перевизначити
}

class Boss : Enemy
{
  public Boss(string name) : base(name) { } // виклик батьківського конструктора
  public override int Damage() =&gt; 20;     // перевизначили
}</pre>
<ul><li><code>virtual</code> — «нащадки можуть змінити», <code>override</code> — «змінюю»</li><li><code>base</code> — звернення до батьківського класу</li><li><code>abstract</code> клас не можна створити напряму, а <code>abstract</code> метод нащадки <b>зобов’язані</b> реалізувати</li></ul>
<p><b>Інтерфейс</b> — контракт «що вміє»: <code>interface IDamageable { void TakeDamage(int d); }</code>. Клас може реалізувати кілька інтерфейсів: <code>class Box : IDamageable</code>.</p>
<p><b>Поліморфізм</b>: у масиві <code>Enemy[]</code> можуть бути і звичайні вороги, і боси — і кожен викличе свою версію <code>Damage()</code>.</p>`,
        `<p><b>Наследование</b>: класс-наследник получает всё от родительского и добавляет своё. Запись — через двоеточие:</p>
<pre class="inline-code">class Enemy
{
  public string Name;
  public Enemy(string name) { Name = name; }
  public virtual int Damage() =&gt; 5;   // можно переопределить
}

class Boss : Enemy
{
  public Boss(string name) : base(name) { } // вызов родительского конструктора
  public override int Damage() =&gt; 20;     // переопределили
}</pre>
<ul><li><code>virtual</code> — «наследники могут изменить», <code>override</code> — «изменяю»</li><li><code>base</code> — обращение к родительскому классу</li><li><code>abstract</code> класс нельзя создать напрямую, а <code>abstract</code> метод наследники <b>обязаны</b> реализовать</li></ul>
<p><b>Интерфейс</b> — контракт «что умеет»: <code>interface IDamageable { void TakeDamage(int d); }</code>. Класс может реализовать несколько интерфейсов: <code>class Box : IDamageable</code>.</p>
<p><b>Полиморфизм</b>: в массиве <code>Enemy[]</code> могут быть и обычные враги, и боссы — и каждый вызовет свою версию <code>Damage()</code>.</p>`,
        `<p><b>Inheritance</b>: a child class gets everything from its parent and adds its own. Written with a colon:</p>
<pre class="inline-code">class Enemy
{
  public string Name;
  public Enemy(string name) { Name = name; }
  public virtual int Damage() =&gt; 5;   // may be overridden
}

class Boss : Enemy
{
  public Boss(string name) : base(name) { } // call the parent constructor
  public override int Damage() =&gt; 20;     // overridden
}</pre>
<ul><li><code>virtual</code> = “children may change this”, <code>override</code> = “I’m changing it”</li><li><code>base</code> refers to the parent class</li><li>An <code>abstract</code> class can’t be created directly, and children <b>must</b> implement an <code>abstract</code> method</li></ul>
<p>An <b>interface</b> is a “can do” contract: <code>interface IDamageable { void TakeDamage(int d); }</code>. A class can implement several: <code>class Box : IDamageable</code>.</p>
<p><b>Polymorphism</b>: an <code>Enemy[]</code> can hold regular enemies and bosses — each calls its own <code>Damage()</code>.</p>`),
      why: L(`<p>Без успадкування довелося б копіювати однаковий код у кожен тип ворога. А з ним спільне (ім’я, здоров’я, рух) пишеться раз у <code>Enemy</code>, а особливе — у нащадках. У Unity кожен твій скрипт успадковується від <code>MonoBehaviour</code> — саме так рушій «знає», як викликати твої <code>Start()</code> і <code>Update()</code>.</p>`,
        `<p>Без наследования пришлось бы копировать одинаковый код в каждый тип врага. А с ним общее (имя, здоровье, движение) пишется раз в <code>Enemy</code>, а особенное — в наследниках. В Unity каждый твой скрипт наследуется от <code>MonoBehaviour</code> — именно так движок «знает», как вызывать твои <code>Start()</code> и <code>Update()</code>.</p>`,
        `<p>Without inheritance you’d copy the same code into every enemy type. With it, shared parts (name, health, movement) are written once in <code>Enemy</code> and the special parts in children. In Unity every script inherits from <code>MonoBehaviour</code> — that’s how the engine knows to call your <code>Start()</code> and <code>Update()</code>.</p>`),
      mistakes: L(`<ul><li><code>override</code> без <code>virtual</code> у батька — помилка компіляції.</li><li>Забутий <code>: base(name)</code>, коли в батька немає конструктора без параметрів.</li><li>Метод інтерфейсу без <code>public</code> у класі — помилка «does not implement interface member».</li></ul>`,
        `<ul><li><code>override</code> без <code>virtual</code> у родителя — ошибка компиляции.</li><li>Забытый <code>: base(name)</code>, когда у родителя нет конструктора без параметров.</li><li>Метод интерфейса без <code>public</code> в классе — ошибка «does not implement interface member».</li></ul>`,
        `<ul><li><code>override</code> without <code>virtual</code> in the parent — compile error.</li><li>Forgetting <code>: base(name)</code> when the parent has no parameterless constructor.</li><li>An interface method without <code>public</code> in the class — error “does not implement interface member”.</li></ul>`),
      examples: [
        { title: 'virtual / override', code: M(`Animal[] zoo = { new Animal(), new Dog(), new Cat() };
foreach (Animal a in zoo) Console.WriteLine(a.Speak());`, { before: `class Animal
{
  public virtual string Speak() => "...";
}

class Dog : Animal
{
  public override string Speak() => "Woof";
}

class Cat : Animal
{
  public override string Speak() => "Meow";
}` }), note: L('Поліморфізм: кожен об’єкт — своя версія.', 'Полиморфизм: каждый объект — своя версия.', 'Polymorphism: each object uses its own version.') },
        { title: 'abstract + base', code: M(`Shape[] shapes = { new Square(3), new Rectangle(2, 5) };
foreach (Shape s in shapes) Console.WriteLine($"{s.Name}: {s.Area()}");`, { before: `abstract class Shape
{
  public string Name;
  protected Shape(string name) { Name = name; }
  public abstract int Area();
}

class Square : Shape
{
  int side;
  public Square(int side) : base("Square") { this.side = side; }
  public override int Area() => side * side;
}

class Rectangle : Shape
{
  int w, h;
  public Rectangle(int w, int h) : base("Rectangle") { this.w = w; this.h = h; }
  public override int Area() => w * h;
}` }), note: L('<code>new Shape()</code> написати не можна — він абстрактний.', '<code>new Shape()</code> написать нельзя — он абстрактный.', 'You can’t write <code>new Shape()</code> — it’s abstract.') },
        { title: L('Інтерфейс', 'Интерфейс', 'Interface'), code: M(`IDamageable[] things = { new Crate(), new Player() };
foreach (var t in things) t.TakeDamage(10);`, { before: `interface IDamageable
{
  void TakeDamage(int amount);
}

class Crate : IDamageable
{
  public void TakeDamage(int amount) { Console.WriteLine("Crate breaks!"); }
}

class Player : IDamageable
{
  int hp = 100;
  public void TakeDamage(int amount)
  {
    hp -= amount;
    Console.WriteLine($"Player hp {hp}");
  }
}` }), note: L('Різні класи, один контракт.', 'Разные классы, один контракт.', 'Different classes, one contract.') }
      ],
      task: {
        text: L('Створи клас <code>Enemy</code> (поле <code>Name</code>, конструктор, <code>virtual int Damage()</code> → 5) і нащадка <code>Boss</code> (<code>override</code> → 20). У Main масив <code>{ new Enemy("Slime"), new Boss("Dragon") }</code>: для кожного виведи <code>Slime deals 5</code>, а в кінці <code>Total 25</code>.', 'Создай класс <code>Enemy</code> (поле <code>Name</code>, конструктор, <code>virtual int Damage()</code> → 5) и наследника <code>Boss</code> (<code>override</code> → 20). В Main массив <code>{ new Enemy("Slime"), new Boss("Dragon") }</code>: для каждого выведи <code>Slime deals 5</code>, а в конце <code>Total 25</code>.', 'Create class <code>Enemy</code> (field <code>Name</code>, constructor, <code>virtual int Damage()</code> → 5) and a child <code>Boss</code> (<code>override</code> → 20). In Main, the array <code>{ new Enemy("Slime"), new Boss("Dragon") }</code>: print <code>Slime deals 5</code> for each, then <code>Total 25</code>.'),
        how: [L('Конструктор Boss: <code>public Boss(string name) : base(name) { }</code>', 'Конструктор Boss: <code>public Boss(string name) : base(name) { }</code>', 'Boss constructor: <code>public Boss(string name) : base(name) { }</code>'), L('Масив типу <code>Enemy[]</code> і <code>foreach</code>.', 'Массив типа <code>Enemy[]</code> и <code>foreach</code>.', 'An <code>Enemy[]</code> array and <code>foreach</code>.')],
        starter: M(`// масив ворогів і підсумок`, { before: `class Enemy
{
  // Name, конструктор, virtual Damage
}

// class Boss : Enemy …` }),
        solution: M(`Enemy[] enemies = { new Enemy("Slime"), new Boss("Dragon") };
int total = 0;
foreach (Enemy e in enemies)
{
  Console.WriteLine($"{e.Name} deals {e.Damage()}");
  total += e.Damage();
}
Console.WriteLine($"Total {total}");`, { before: `class Enemy
{
  public string Name;
  public Enemy(string name) { Name = name; }
  public virtual int Damage() => 5;
}

class Boss : Enemy
{
  public Boss(string name) : base(name) { }
  public override int Damage() => 20;
}` }),
        hint: L('Очікувано: <code>Slime deals 5</code>, <code>Dragon deals 20</code>, <code>Total 25</code>.', 'Ожидается: <code>Slime deals 5</code>, <code>Dragon deals 20</code>, <code>Total 25</code>.', 'Expected: <code>Slime deals 5</code>, <code>Dragon deals 20</code>, <code>Total 25</code>.'),
        expected: 'Slime deals 5\nDragon deals 20\nTotal 25',
        must: /virtual[\s\S]*override/
      },
      quiz: { q: L('Яке слово дозволяє нащадкам змінити метод?', 'Какое слово позволяет наследникам изменить метод?', 'Which keyword lets children change a method?'), options: ['static', 'virtual', 'const'], answer: 1, explain: L('virtual у батька, override у нащадка.', 'virtual у родителя, override у наследника.', 'virtual in the parent, override in the child.') },
      ref: [{ code: 'class B : A', d: L('успадкування', 'наследование', 'inheritance') }, { code: 'virtual / override / base', d: L('перевизначення', 'переопределение', 'overriding') }, { code: 'interface I { void F(); }', d: L('інтерфейс', 'интерфейс', 'interface') }]
    },
    {
      id: 'collections', chapter: CH4,
      title: L('List і Dictionary', 'List и Dictionary', 'List and Dictionary'),
      theory: L(
        `<p>Масив має фіксований розмір, а <b>List&lt;T&gt;</b> росте й зменшується (потрібен <code>using System.Collections.Generic;</code>):</p>
<pre class="inline-code">List&lt;string&gt; bag = new List&lt;string&gt;();
bag.Add("Sword");
bag.Add("Potion");
bag.Remove("Sword");
Console.WriteLine(bag.Count);         // 1
Console.WriteLine(bag.Contains("Potion")); // True</pre>
<p><b>Dictionary&lt;K, V&gt;</b> — словник «ключ → значення», як телефонна книга:</p>
<pre class="inline-code">var prices = new Dictionary&lt;string, int&gt;();
prices["Sword"] = 150;
prices["Shield"] = 90;
if (prices.ContainsKey("Sword")) Console.WriteLine(prices["Sword"]);
foreach (var pair in prices) Console.WriteLine($"{pair.Key}: {pair.Value}");</pre>
<p><code>TryGetValue(key, out int v)</code> — безпечно дістати значення без винятку.</p>`,
        `<p>Массив имеет фиксированный размер, а <b>List&lt;T&gt;</b> растёт и уменьшается (нужен <code>using System.Collections.Generic;</code>):</p>
<pre class="inline-code">List&lt;string&gt; bag = new List&lt;string&gt;();
bag.Add("Sword");
bag.Add("Potion");
bag.Remove("Sword");
Console.WriteLine(bag.Count);         // 1
Console.WriteLine(bag.Contains("Potion")); // True</pre>
<p><b>Dictionary&lt;K, V&gt;</b> — словарь «ключ → значение», как телефонная книга:</p>
<pre class="inline-code">var prices = new Dictionary&lt;string, int&gt;();
prices["Sword"] = 150;
prices["Shield"] = 90;
if (prices.ContainsKey("Sword")) Console.WriteLine(prices["Sword"]);
foreach (var pair in prices) Console.WriteLine($"{pair.Key}: {pair.Value}");</pre>
<p><code>TryGetValue(key, out int v)</code> — безопасно достать значение без исключения.</p>`,
        `<p>An array has a fixed size, while <b>List&lt;T&gt;</b> grows and shrinks (needs <code>using System.Collections.Generic;</code>):</p>
<pre class="inline-code">List&lt;string&gt; bag = new List&lt;string&gt;();
bag.Add("Sword");
bag.Add("Potion");
bag.Remove("Sword");
Console.WriteLine(bag.Count);         // 1
Console.WriteLine(bag.Contains("Potion")); // True</pre>
<p><b>Dictionary&lt;K, V&gt;</b> maps keys to values, like a phone book:</p>
<pre class="inline-code">var prices = new Dictionary&lt;string, int&gt;();
prices["Sword"] = 150;
prices["Shield"] = 90;
if (prices.ContainsKey("Sword")) Console.WriteLine(prices["Sword"]);
foreach (var pair in prices) Console.WriteLine($"{pair.Key}: {pair.Value}");</pre>
<p><code>TryGetValue(key, out int v)</code> safely gets a value without an exception.</p>`),
      why: L(`<p>Інвентар, список гравців у лобі, вороги на рівні — їхня кількість постійно змінюється, тож масив не підходить. А словник знаходить значення за ключем <b>миттєво</b>, навіть серед мільйона записів: не треба перебирати все циклом, щоб дізнатися ціну меча.</p>`,
        `<p>Инвентарь, список игроков в лобби, враги на уровне — их количество постоянно меняется, так что массив не подходит. А словарь находит значение по ключу <b>мгновенно</b>, даже среди миллиона записей: не нужно перебирать всё циклом, чтобы узнать цену меча.</p>`,
        `<p>Inventories, lobby player lists, enemies on a level — their count keeps changing, so arrays don’t fit. A dictionary finds a value by key <b>instantly</b>, even among a million entries: no looping through everything to find a sword’s price.</p>`),
      mistakes: L(`<ul><li><code>dict["Bow"]</code> для неіснуючого ключа — <code>KeyNotFoundException</code>; перевіряй <code>ContainsKey</code> або <code>TryGetValue</code>.</li><li>Видаляти елементи зі списку всередині <code>foreach</code> по ньому ж — <code>InvalidOperationException</code>.</li><li>У List — <code>Count</code>, а не <code>Length</code>.</li></ul>`,
        `<ul><li><code>dict["Bow"]</code> для несуществующего ключа — <code>KeyNotFoundException</code>; проверяй <code>ContainsKey</code> или <code>TryGetValue</code>.</li><li>Удалять элементы из списка внутри <code>foreach</code> по нему же — <code>InvalidOperationException</code>.</li><li>У List — <code>Count</code>, а не <code>Length</code>.</li></ul>`,
        `<ul><li><code>dict["Bow"]</code> for a missing key throws <code>KeyNotFoundException</code>; check <code>ContainsKey</code> or use <code>TryGetValue</code>.</li><li>Removing from a list inside a <code>foreach</code> over it throws <code>InvalidOperationException</code>.</li><li>A List has <code>Count</code>, not <code>Length</code>.</li></ul>`),
      examples: [
        { title: 'List', code: M(`var party = new List<string> { "Kira", "Max" };
party.Add("Ira");
party.Insert(0, "Leader");
party.Remove("Max");
Console.WriteLine(string.Join(", ", party));
Console.WriteLine($"{party.Count} members, first: {party[0]}");`, { using: COLL }), note: L('Insert вставляє на позицію.', 'Insert вставляет на позицию.', 'Insert puts an item at a position.') },
        { title: 'Dictionary', code: M(`var hp = new Dictionary<string, int>
{
  { "Slime", 20 },
  { "Orc", 50 }
};
hp["Dragon"] = 300;
hp["Orc"] -= 15;
foreach (var p in hp) Console.WriteLine($"{p.Key}: {p.Value}");
Console.WriteLine(hp.ContainsKey("Ghost"));`, { using: COLL }), note: L('Присвоєння за новим ключем додає запис.', 'Присваивание по новому ключу добавляет запись.', 'Assigning a new key adds an entry.') },
        { title: 'TryGetValue', code: M(`var prices = new Dictionary<string, int> { { "Sword", 150 } };
string[] wanted = { "Sword", "Bow" };
foreach (string item in wanted)
{
  if (prices.TryGetValue(item, out int price))
    Console.WriteLine($"{item} costs {price}");
  else
    Console.WriteLine($"{item} is not sold here");
}`, { using: COLL }), note: L('<code>out</code> — метод записує результат у змінну.', '<code>out</code> — метод записывает результат в переменную.', '<code>out</code> lets the method write into a variable.') }
      ],
      task: {
        text: L('Порахуй, скільки разів трапляється кожне слово в рядку <code>"red blue red green blue red"</code>, і виведи в порядку першої появи: <code>red 3</code>, <code>blue 2</code>, <code>green 1</code>.', 'Посчитай, сколько раз встречается каждое слово в строке <code>"red blue red green blue red"</code>, и выведи в порядке первого появления: <code>red 3</code>, <code>blue 2</code>, <code>green 1</code>.', 'Count how many times each word appears in <code>"red blue red green blue red"</code> and print in order of first appearance: <code>red 3</code>, <code>blue 2</code>, <code>green 1</code>.'),
        how: [L('<code>Split(\' \')</code> дає масив слів.', '<code>Split(\' \')</code> даёт массив слов.', '<code>Split(\' \')</code> gives an array of words.'), L('Якщо ключа немає — <code>counts[w] = 1</code>, інакше <code>counts[w]++</code>.', 'Если ключа нет — <code>counts[w] = 1</code>, иначе <code>counts[w]++</code>.', 'If the key is missing, <code>counts[w] = 1</code>; else <code>counts[w]++</code>.')],
        starter: M(`string text = "red blue red green blue red";
// словник лічильників`, { using: COLL }),
        solution: M(`string text = "red blue red green blue red";
var counts = new Dictionary<string, int>();
foreach (string w in text.Split(' '))
{
  if (counts.ContainsKey(w)) counts[w]++;
  else counts[w] = 1;
}
foreach (var p in counts) Console.WriteLine($"{p.Key} {p.Value}");`, { using: COLL }),
        hint: L('Нові ключі додаються в кінець словника.', 'Новые ключи добавляются в конец словаря.', 'New keys are appended to the dictionary.'),
        expected: 'red 3\nblue 2\ngreen 1',
        must: /Dictionary/
      },
      quiz: { q: L('Як дізнатися кількість елементів у List?', 'Как узнать количество элементов в List?', 'How do you get a List’s size?'), options: ['.Length', '.Count', '.Size()'], answer: 1, explain: L('List — Count, масив — Length.', 'List — Count, массив — Length.', 'List uses Count, arrays use Length.') },
      ref: [{ code: 'new List<int>()  .Add .Remove .Count', d: 'List' }, { code: 'new Dictionary<string, int>()', d: 'Dictionary' }, { code: 'd.TryGetValue(k, out var v)', d: L('безпечне читання', 'безопасное чтение', 'safe read') }]
    },
    {
      id: 'linq', chapter: CH4,
      title: L('LINQ: запити до колекцій', 'LINQ: запросы к коллекциям', 'LINQ: querying collections'),
      theory: L(
        `<p><b>LINQ</b> (<code>using System.Linq;</code>) — набір методів, щоб фільтрувати, сортувати й рахувати колекції одним рядком. Усередині — <b>лямбди</b> <code>x =&gt; …</code> («для кожного x …»):</p>
<table class="mini"><tr><td><code>Where(x =&gt; x &gt; 10)</code></td><td>відібрати</td></tr><tr><td><code>Select(x =&gt; x * 2)</code></td><td>перетворити кожен</td></tr><tr><td><code>OrderBy(x =&gt; x)</code> / <code>OrderByDescending</code></td><td>сортувати</td></tr><tr><td><code>Sum() Max() Min() Average() Count()</code></td><td>підсумки</td></tr><tr><td><code>First() Any(x =&gt; …) All(x =&gt; …)</code></td><td>пошук і перевірки</td></tr><tr><td><code>ToList()</code> / <code>ToArray()</code></td><td>зібрати результат</td></tr></table>
<pre class="inline-code">var top = scores.Where(s =&gt; s &gt;= 50).OrderByDescending(s =&gt; s).Take(3).ToList();</pre>
<p>Методи можна з’єднувати в ланцюжок — читається як речення.</p>`,
        `<p><b>LINQ</b> (<code>using System.Linq;</code>) — набор методов, чтобы фильтровать, сортировать и считать коллекции одной строкой. Внутри — <b>лямбды</b> <code>x =&gt; …</code> («для каждого x …»):</p>
<table class="mini"><tr><td><code>Where(x =&gt; x &gt; 10)</code></td><td>отобрать</td></tr><tr><td><code>Select(x =&gt; x * 2)</code></td><td>преобразовать каждый</td></tr><tr><td><code>OrderBy(x =&gt; x)</code> / <code>OrderByDescending</code></td><td>сортировать</td></tr><tr><td><code>Sum() Max() Min() Average() Count()</code></td><td>итоги</td></tr><tr><td><code>First() Any(x =&gt; …) All(x =&gt; …)</code></td><td>поиск и проверки</td></tr><tr><td><code>ToList()</code> / <code>ToArray()</code></td><td>собрать результат</td></tr></table>
<pre class="inline-code">var top = scores.Where(s =&gt; s &gt;= 50).OrderByDescending(s =&gt; s).Take(3).ToList();</pre>
<p>Методы можно соединять в цепочку — читается как предложение.</p>`,
        `<p><b>LINQ</b> (<code>using System.Linq;</code>) is a set of methods to filter, sort and summarise collections in one line. Inside are <b>lambdas</b> <code>x =&gt; …</code> (“for each x …”):</p>
<table class="mini"><tr><td><code>Where(x =&gt; x &gt; 10)</code></td><td>filter</td></tr><tr><td><code>Select(x =&gt; x * 2)</code></td><td>transform each</td></tr><tr><td><code>OrderBy(x =&gt; x)</code> / <code>OrderByDescending</code></td><td>sort</td></tr><tr><td><code>Sum() Max() Min() Average() Count()</code></td><td>totals</td></tr><tr><td><code>First() Any(x =&gt; …) All(x =&gt; …)</code></td><td>search and checks</td></tr><tr><td><code>ToList()</code> / <code>ToArray()</code></td><td>collect the result</td></tr></table>
<pre class="inline-code">var top = scores.Where(s =&gt; s &gt;= 50).OrderByDescending(s =&gt; s).Take(3).ToList();</pre>
<p>Methods chain together and read like a sentence.</p>`),
      why: L(`<p>Без LINQ «топ-3 гравців з рахунком від 50» — це цикл, тимчасовий список, сортування і ще цикл. З LINQ — один рядок, який каже <b>що</b> ти хочеш, а не <b>як</b> це рахувати. Менше коду — менше місць для помилок.</p>`,
        `<p>Без LINQ «топ-3 игроков со счётом от 50» — это цикл, временный список, сортировка и ещё цикл. С LINQ — одна строка, которая говорит <b>что</b> ты хочешь, а не <b>как</b> это считать. Меньше кода — меньше мест для ошибок.</p>`,
        `<p>Without LINQ, “top 3 players scoring 50+” is a loop, a temp list, a sort and another loop. With LINQ it’s one line that says <b>what</b> you want, not <b>how</b> to compute it. Less code, fewer places for bugs.</p>`),
      mistakes: L(`<ul><li>Забутий <code>using System.Linq;</code> — методів <code>Where</code>/<code>Sum</code> «не існує».</li><li><code>First()</code> на порожній колекції — виняток; безпечніше <code>FirstOrDefault()</code>.</li><li><code>Console.WriteLine(list.Where(…))</code> виведе назву типу — склей через <code>string.Join</code>.</li></ul>`,
        `<ul><li>Забытый <code>using System.Linq;</code> — методов <code>Where</code>/<code>Sum</code> «не существует».</li><li><code>First()</code> на пустой коллекции — исключение; безопаснее <code>FirstOrDefault()</code>.</li><li><code>Console.WriteLine(list.Where(…))</code> выведет название типа — склей через <code>string.Join</code>.</li></ul>`,
        `<ul><li>Missing <code>using System.Linq;</code> — <code>Where</code>/<code>Sum</code> “don’t exist”.</li><li><code>First()</code> on an empty collection throws; <code>FirstOrDefault()</code> is safer.</li><li><code>Console.WriteLine(list.Where(…))</code> prints a type name — use <code>string.Join</code>.</li></ul>`),
      examples: [
        { title: 'Where / Select', code: M(`int[] nums = { 4, 9, 15, 2, 22, 7 };
var big = nums.Where(n => n > 8);
Console.WriteLine(string.Join(" ", big));
var doubled = nums.Select(n => n * 2);
Console.WriteLine(string.Join(" ", doubled));`, { using: LINQ }), note: L('Лямбда <code>n =&gt; n &gt; 8</code> — умова для кожного n.', 'Лямбда <code>n =&gt; n &gt; 8</code> — условие для каждого n.', 'The lambda <code>n =&gt; n &gt; 8</code> is a test for each n.') },
        { title: L('Підсумки', 'Итоги', 'Totals'), code: M(`var scores = new List<int> { 70, 45, 90, 60 };
Console.WriteLine(scores.Sum());
Console.WriteLine(scores.Max());
Console.WriteLine(scores.Average());
Console.WriteLine(scores.Count(s => s >= 60));
Console.WriteLine(scores.Any(s => s == 100));`, { using: LINQ }), note: L('Count може приймати умову.', 'Count может принимать условие.', 'Count can take a condition.') },
        { title: L('Об’єкти', 'Объекты', 'Objects'), code: M(`var players = new List<Player>
{
  new Player { Name = "Kira", Score = 120 },
  new Player { Name = "Max", Score = 300 },
  new Player { Name = "Ira", Score = 210 }
};
var ranking = players.OrderByDescending(p => p.Score).Select(p => p.Name);
Console.WriteLine(string.Join(" > ", ranking));
Console.WriteLine(players.First(p => p.Score > 200).Name);`, { using: LINQ, before: `class Player
{
  public string Name { get; set; }
  public int Score { get; set; }
}` }), note: L('Сортування об’єктів за полем.', 'Сортировка объектов по полю.', 'Sorting objects by a field.') }
      ],
      task: {
        text: L('Дано <code>int[] nums = { 5, 12, 8, 3, 20, 15 };</code>. За допомогою LINQ виведи: парні числа за зростанням через кому (<code>8, 12, 20</code>), суму чисел більших за 10 (<code>47</code>) і кількість непарних (<code>3</code>).', 'Дано <code>int[] nums = { 5, 12, 8, 3, 20, 15 };</code>. С помощью LINQ выведи: чётные числа по возрастанию через запятую (<code>8, 12, 20</code>), сумму чисел больше 10 (<code>47</code>) и количество нечётных (<code>3</code>).', 'Given <code>int[] nums = { 5, 12, 8, 3, 20, 15 };</code>, use LINQ to print: even numbers ascending joined by commas (<code>8, 12, 20</code>), the sum of numbers greater than 10 (<code>47</code>) and the count of odd numbers (<code>3</code>).'),
        how: [L('<code>string.Join(", ", nums.Where(…).OrderBy(n =&gt; n))</code>', '<code>string.Join(", ", nums.Where(…).OrderBy(n =&gt; n))</code>', '<code>string.Join(", ", nums.Where(…).OrderBy(n =&gt; n))</code>'), L('<code>nums.Where(n =&gt; n &gt; 10).Sum()</code> і <code>nums.Count(n =&gt; n % 2 != 0)</code>.', '<code>nums.Where(n =&gt; n &gt; 10).Sum()</code> и <code>nums.Count(n =&gt; n % 2 != 0)</code>.', '<code>nums.Where(n =&gt; n &gt; 10).Sum()</code> and <code>nums.Count(n =&gt; n % 2 != 0)</code>.')],
        starter: M(`int[] nums = { 5, 12, 8, 3, 20, 15 };
// три рядки через LINQ`, { using: LINQ }),
        solution: M(`int[] nums = { 5, 12, 8, 3, 20, 15 };
Console.WriteLine(string.Join(", ", nums.Where(n => n % 2 == 0).OrderBy(n => n)));
Console.WriteLine(nums.Where(n => n > 10).Sum());
Console.WriteLine(nums.Count(n => n % 2 != 0));`, { using: LINQ }),
        hint: L('12 + 20 + 15 = 47.', '12 + 20 + 15 = 47.', '12 + 20 + 15 = 47.'),
        expected: '8, 12, 20\n47\n3',
        must: /Where/
      },
      quiz: { q: L('Що робить <code>Select(x =&gt; x * 2)</code>?', 'Что делает <code>Select(x =&gt; x * 2)</code>?', 'What does <code>Select(x =&gt; x * 2)</code> do?'), options: [L('відбирає парні', 'отбирает чётные', 'keeps even ones'), L('подвоює кожен елемент', 'удваивает каждый элемент', 'doubles each item'), L('сортує', 'сортирует', 'sorts')], answer: 1, explain: L('Select перетворює кожен елемент.', 'Select преобразует каждый элемент.', 'Select transforms each item.') },
      ref: [{ code: '.Where(x => …)', d: L('фільтр', 'фильтр', 'filter') }, { code: '.Select(x => …)', d: L('перетворення', 'преобразование', 'map') }, { code: '.OrderBy(x => …) .Sum() .Count()', d: L('сортування, підсумки', 'сортировка, итоги', 'sorting, totals') }]
    },
    {
      id: 'exceptions', chapter: CH4,
      title: L('Винятки: try / catch', 'Исключения: try / catch', 'Exceptions: try / catch'),
      theory: L(
        `<p><b>Виняток</b> — сигнал «щось пішло не так»: ділення на нуль, неправильний формат числа, вихід за межі масиву. Якщо його не перехопити, програма аварійно завершиться.</p>
<pre class="inline-code">try
{
  int n = int.Parse("abc");
}
catch (FormatException)
{
  Console.WriteLine("Not a number");
}
finally
{
  Console.WriteLine("Always runs");
}</pre>
<ul><li><code>try</code> — небезпечний код, <code>catch (Тип e)</code> — що робити при помилці (<code>e.Message</code> — опис)</li><li><code>finally</code> — виконується завжди (закрити файл, зберегти гру)</li><li><code>throw new ArgumentException("…")</code> — кинути свій виняток</li></ul>
<p>Часто краще <b>не допускати</b> винятку: <code>int.TryParse(s, out int n)</code> повертає <code>false</code> замість аварії.</p>`,
        `<p><b>Исключение</b> — сигнал «что-то пошло не так»: деление на ноль, неправильный формат числа, выход за пределы массива. Если его не перехватить, программа аварийно завершится.</p>
<pre class="inline-code">try
{
  int n = int.Parse("abc");
}
catch (FormatException)
{
  Console.WriteLine("Not a number");
}
finally
{
  Console.WriteLine("Always runs");
}</pre>
<ul><li><code>try</code> — опасный код, <code>catch (Тип e)</code> — что делать при ошибке (<code>e.Message</code> — описание)</li><li><code>finally</code> — выполняется всегда (закрыть файл, сохранить игру)</li><li><code>throw new ArgumentException("…")</code> — бросить своё исключение</li></ul>
<p>Часто лучше <b>не допускать</b> исключения: <code>int.TryParse(s, out int n)</code> возвращает <code>false</code> вместо аварии.</p>`,
        `<p>An <b>exception</b> signals “something went wrong”: division by zero, a bad number format, going past an array’s end. Uncaught, it crashes the program.</p>
<pre class="inline-code">try
{
  int n = int.Parse("abc");
}
catch (FormatException)
{
  Console.WriteLine("Not a number");
}
finally
{
  Console.WriteLine("Always runs");
}</pre>
<ul><li><code>try</code> holds risky code, <code>catch (Type e)</code> handles the error (<code>e.Message</code> describes it)</li><li><code>finally</code> always runs (close a file, save the game)</li><li><code>throw new ArgumentException("…")</code> raises your own exception</li></ul>
<p>Often it’s better to <b>avoid</b> the exception: <code>int.TryParse(s, out int n)</code> returns <code>false</code> instead of crashing.</p>`),
      why: L(`<p>Гравці завжди введуть щось несподіване, файл збереження може бути пошкоджений, сервер — недоступний. Перехоплений виняток перетворює аварію на зрозуміле повідомлення: «Збереження пошкоджене — почати нову гру?». Але не ховай усі помилки під <code>catch</code> — лише ті, які знаєш, як обробити.</p>`,
        `<p>Игроки всегда введут что-то неожиданное, файл сохранения может быть повреждён, сервер — недоступен. Перехваченное исключение превращает аварию в понятное сообщение: «Сохранение повреждено — начать новую игру?». Но не прячь все ошибки под <code>catch</code> — только те, которые знаешь, как обработать.</p>`,
        `<p>Players will always type something unexpected, save files get corrupted, servers go down. A caught exception turns a crash into a clear message: “Save is corrupted — start a new game?”. But don’t hide every error under <code>catch</code> — only those you know how to handle.</p>`),
      mistakes: L(`<ul><li>Порожній <code>catch { }</code> — помилка зникає безслідно, і баг шукатимеш годинами.</li><li>Ділення на нуль для <code>double</code> не кидає виняток — дає <code>∞</code> (Infinity).</li><li><code>catch (Exception)</code> перед конкретнішими — компілятор не дозволить: загальний має йти останнім.</li></ul>`,
        `<ul><li>Пустой <code>catch { }</code> — ошибка исчезает бесследно, и баг будешь искать часами.</li><li>Деление на ноль для <code>double</code> не бросает исключение — даёт <code>∞</code> (Infinity).</li><li><code>catch (Exception)</code> перед более конкретными — компилятор не разрешит: общий должен идти последним.</li></ul>`,
        `<ul><li>An empty <code>catch { }</code> makes errors vanish and bugs take hours to find.</li><li>Dividing a <code>double</code> by zero doesn’t throw — it gives <code>∞</code> (Infinity).</li><li><code>catch (Exception)</code> before more specific ones won’t compile: the general one goes last.</li></ul>`),
      examples: [
        { title: 'try / catch / finally', code: M(`string[] inputs = { "42", "hello" };
foreach (string s in inputs)
{
  try
  {
    int n = int.Parse(s);
    Console.WriteLine($"Number {n}");
  }
  catch (FormatException)
  {
    Console.WriteLine($"'{s}' is not a number");
  }
  finally
  {
    Console.WriteLine("checked");
  }
}`), note: L('finally спрацював обидва рази.', 'finally сработал оба раза.', 'finally ran both times.') },
        { title: 'TryParse', code: M(`string[] data = { "7", "x", "12", "" };
int sum = 0;
foreach (string s in data)
{
  if (int.TryParse(s, out int n)) sum += n;
  else Console.WriteLine($"skip '{s}'");
}
Console.WriteLine($"sum {sum}");`), note: L('Жодного винятку — просто false.', 'Ни одного исключения — просто false.', 'No exceptions — just false.') },
        { title: 'throw', code: M(`try
{
  SetVolume(50);
  SetVolume(150);
}
catch (ArgumentException e)
{
  Console.WriteLine("Error: " + e.Message);
}`, { members: `static void SetVolume(int v)
{
  if (v < 0 || v > 100) throw new ArgumentException("volume must be 0-100");
  Console.WriteLine($"Volume {v}");
}` }), note: L('Свій виняток з поясненням.', 'Своё исключение с объяснением.', 'Your own exception with a message.') }
      ],
      task: {
        text: L('Дано <code>string[] data = { "10", "abc", "5" };</code>. Через <code>int.TryParse</code> додай коректні числа, для некоректних виведи <code>Bad: abc</code>, потім <code>Sum 15</code>. Далі в <code>try/catch</code> поділи <code>10</code> на змінну <code>zero = 0</code> і при <code>DivideByZeroException</code> виведи <code>Cannot divide by zero</code>.', 'Дано <code>string[] data = { "10", "abc", "5" };</code>. Через <code>int.TryParse</code> сложи корректные числа, для некорректных выведи <code>Bad: abc</code>, затем <code>Sum 15</code>. Далее в <code>try/catch</code> подели <code>10</code> на переменную <code>zero = 0</code> и при <code>DivideByZeroException</code> выведи <code>Cannot divide by zero</code>.', 'Given <code>string[] data = { "10", "abc", "5" };</code>, use <code>int.TryParse</code> to add the valid numbers, print <code>Bad: abc</code> for invalid ones, then <code>Sum 15</code>. Then in a <code>try/catch</code> divide <code>10</code> by a variable <code>zero = 0</code> and on <code>DivideByZeroException</code> print <code>Cannot divide by zero</code>.'),
        how: [L('Нуль тримай у змінній: <code>int zero = 0;</code> — інакше компілятор сам помітить ділення на нуль.', 'Ноль держи в переменной: <code>int zero = 0;</code> — иначе компилятор сам заметит деление на ноль.', 'Keep zero in a variable: <code>int zero = 0;</code> — otherwise the compiler spots the division itself.')],
        starter: M(`string[] data = { "10", "abc", "5" };
// TryParse і try/catch`),
        solution: M(`string[] data = { "10", "abc", "5" };
int sum = 0;
foreach (string s in data)
{
  if (int.TryParse(s, out int n)) sum += n;
  else Console.WriteLine($"Bad: {s}");
}
Console.WriteLine($"Sum {sum}");
int zero = 0;
try
{
  int r = 10 / zero;
  Console.WriteLine(r);
}
catch (DivideByZeroException)
{
  Console.WriteLine("Cannot divide by zero");
}`),
        hint: L('Три рядки: <code>Bad: abc</code>, <code>Sum 15</code>, <code>Cannot divide by zero</code>.', 'Три строки: <code>Bad: abc</code>, <code>Sum 15</code>, <code>Cannot divide by zero</code>.', 'Three lines: <code>Bad: abc</code>, <code>Sum 15</code>, <code>Cannot divide by zero</code>.'),
        expected: 'Bad: abc\nSum 15\nCannot divide by zero',
        must: /TryParse[\s\S]*catch/
      },
      quiz: { q: L('Який блок виконується завжди?', 'Какой блок выполняется всегда?', 'Which block always runs?'), options: ['try', 'catch', 'finally'], answer: 2, explain: L('finally — і при успіху, і при помилці.', 'finally — и при успехе, и при ошибке.', 'finally runs on success and on error.') },
      ref: [{ code: 'try { } catch (FormatException e) { } finally { }', d: L('перехоплення', 'перехват', 'handling') }, { code: 'throw new ArgumentException("…");', d: L('кинути виняток', 'бросить исключение', 'throw') }, { code: 'int.TryParse(s, out int n)', d: L('без винятків', 'без исключений', 'no exceptions') }]
    },
    {
      id: 'project-battle', chapter: CH5, project: true,
      title: L('Проєкт: покрокова битва', 'Проект: пошаговая битва', 'Project: turn-based battle'),
      theory: L(
        `<p>Збираємо все разом у міні-гру, схожу на бій у RPG:</p>
<ol><li>Клас <code>Character</code>: властивості <code>Name</code>, <code>Hp</code> (з <code>private set</code>), <code>Attack</code></li><li>Метод <code>TakeDamage(int)</code> — зменшує Hp, але не нижче 0</li><li>Обчислювана властивість <code>IsAlive =&gt; Hp &gt; 0</code></li><li>Цикл ходів: герой б’є, перевірка, монстр б’є, перевірка</li><li>Підсумкове повідомлення</li></ol>
<p>Це та сама структура, що в Unity: дані й поведінка персонажа — в класі, а «ігровий цикл» керує ходами.</p>`,
        `<p>Собираем всё вместе в мини-игру, похожую на бой в RPG:</p>
<ol><li>Класс <code>Character</code>: свойства <code>Name</code>, <code>Hp</code> (с <code>private set</code>), <code>Attack</code></li><li>Метод <code>TakeDamage(int)</code> — уменьшает Hp, но не ниже 0</li><li>Вычисляемое свойство <code>IsAlive =&gt; Hp &gt; 0</code></li><li>Цикл ходов: герой бьёт, проверка, монстр бьёт, проверка</li><li>Итоговое сообщение</li></ol>
<p>Это та же структура, что в Unity: данные и поведение персонажа — в классе, а «игровой цикл» управляет ходами.</p>`,
        `<p>Let’s combine everything into a mini RPG fight:</p>
<ol><li>A <code>Character</code> class: properties <code>Name</code>, <code>Hp</code> (with <code>private set</code>), <code>Attack</code></li><li><code>TakeDamage(int)</code> lowers Hp, never below 0</li><li>A computed <code>IsAlive =&gt; Hp &gt; 0</code></li><li>A turn loop: hero hits, check, monster hits, check</li><li>A final message</li></ol>
<p>It’s the same structure as in Unity: a character’s data and behaviour live in a class, while the “game loop” runs the turns.</p>`),
      why: L(`<p>Чому <code>Hp</code> з <code>private set</code>, а шкода — через метод? Так неможливо «випадково» зробити здоров’я від’ємним чи змінити його в обхід правил. Хочеш додати броню чи критичні удари — змінюєш лише <code>TakeDamage</code>, і нове правило працює для всіх персонажів.</p>`,
        `<p>Почему <code>Hp</code> с <code>private set</code>, а урон — через метод? Так невозможно «случайно» сделать здоровье отрицательным или изменить его в обход правил. Хочешь добавить броню или критические удары — меняешь только <code>TakeDamage</code>, и новое правило работает для всех персонажей.</p>`,
        `<p>Why is <code>Hp</code> <code>private set</code> with damage through a method? So nothing can “accidentally” make health negative or bypass the rules. Want armour or critical hits? Change only <code>TakeDamage</code> and the rule applies to every character.</p>`),
      mistakes: L(`<ul><li>Перевірка смерті лише в кінці раунду — монстр устигне вдарити, вже будучи переможеним.</li><li><code>while (true)</code> без <code>break</code> — нескінченний бій.</li></ul>`,
        `<ul><li>Проверка смерти только в конце раунда — монстр успеет ударить, уже будучи побеждённым.</li><li><code>while (true)</code> без <code>break</code> — бесконечный бой.</li></ul>`,
        `<ul><li>Checking for death only at the end of a round — the monster strikes after being defeated.</li><li><code>while (true)</code> without <code>break</code> — an endless fight.</li></ul>`),
      examples: [
        { title: L('Клас персонажа', 'Класс персонажа', 'Character class'), code: M(`var c = new Character("Hero", 30, 7);
c.TakeDamage(12);
Console.WriteLine($"{c.Name} {c.Hp} {c.IsAlive}");
c.TakeDamage(100);
Console.WriteLine($"{c.Name} {c.Hp} {c.IsAlive}");`, { before: `class Character
{
  public string Name { get; private set; }
  public int Hp { get; private set; }
  public int Attack { get; private set; }
  public bool IsAlive => Hp > 0;

  public Character(string name, int hp, int attack)
  {
    Name = name;
    Hp = hp;
    Attack = attack;
  }

  public void TakeDamage(int amount)
  {
    Hp = Math.Max(0, Hp - amount);
  }
}` }), note: L('Hp не стає від’ємним.', 'Hp не становится отрицательным.', 'Hp never goes negative.') },
        { title: L('Один удар', 'Один удар', 'One hit'), code: M(`int hp = 20;
int attack = 7;
hp = Math.Max(0, hp - attack);
Console.WriteLine($"Hero hits Goblin: {hp} hp left");`), note: L('Формат повідомлення з проєкту.', 'Формат сообщения из проекта.', 'The project’s message format.') },
        { title: L('Цикл з break', 'Цикл с break', 'Loop with break'), code: M(`int a = 10, b = 10;
int round = 0;
while (true)
{
  round++;
  b -= 4;
  if (b <= 0) { Console.WriteLine($"A wins in round {round}"); break; }
  a -= 3;
  if (a <= 0) { Console.WriteLine($"B wins in round {round}"); break; }
}`), note: L('Перевірка одразу після кожного удару.', 'Проверка сразу после каждого удара.', 'Check right after each hit.') }
      ],
      task: {
        text: L(`Зроби клас <code>Character</code> (Name, Hp з private set, Attack, TakeDamage, IsAlive). Герой <code>Hero</code> (30 hp, атака 7) б’ється з <code>Goblin</code> (20 hp, атака 4). Кожен хід: герой б’є → <code>Hero hits Goblin: 13 hp left</code>; якщо гоблін живий — він б’є → <code>Goblin hits Hero: 26 hp left</code>. Коли гоблін падає: <code>Goblin is defeated! Hero has 22 hp</code> (якщо падає герой — <code>Hero is defeated!</code>).`,
          `Сделай класс <code>Character</code> (Name, Hp с private set, Attack, TakeDamage, IsAlive). Герой <code>Hero</code> (30 hp, атака 7) сражается с <code>Goblin</code> (20 hp, атака 4). Каждый ход: герой бьёт → <code>Hero hits Goblin: 13 hp left</code>; если гоблин жив — он бьёт → <code>Goblin hits Hero: 26 hp left</code>. Когда гоблин падает: <code>Goblin is defeated! Hero has 22 hp</code> (если падает герой — <code>Hero is defeated!</code>).`,
          `Make a <code>Character</code> class (Name, Hp with private set, Attack, TakeDamage, IsAlive). <code>Hero</code> (30 hp, attack 7) fights <code>Goblin</code> (20 hp, attack 4). Each turn: the hero hits → <code>Hero hits Goblin: 13 hp left</code>; if the goblin lives it hits back → <code>Goblin hits Hero: 26 hp left</code>. When the goblin falls: <code>Goblin is defeated! Hero has 22 hp</code> (if the hero falls: <code>Hero is defeated!</code>).`),
        how: [L('Цикл <code>while (hero.IsAlive &amp;&amp; goblin.IsAlive)</code>.', 'Цикл <code>while (hero.IsAlive &amp;&amp; goblin.IsAlive)</code>.', 'Loop <code>while (hero.IsAlive &amp;&amp; goblin.IsAlive)</code>.'), L('Після удару героя: <code>if (!goblin.IsAlive) break;</code>', 'После удара героя: <code>if (!goblin.IsAlive) break;</code>', 'After the hero’s hit: <code>if (!goblin.IsAlive) break;</code>'), L('Метод <code>Hit(Character target)</code> зручно додати в клас.', 'Метод <code>Hit(Character target)</code> удобно добавить в класс.', 'A <code>Hit(Character target)</code> method in the class is handy.')],
        starter: M(`var hero = new Character("Hero", 30, 7);
var goblin = new Character("Goblin", 20, 4);
// ігровий цикл`, { before: `class Character
{
  // Name, Hp, Attack, IsAlive, конструктор, TakeDamage
}` }),
        solution: M(`var hero = new Character("Hero", 30, 7);
var goblin = new Character("Goblin", 20, 4);
while (hero.IsAlive && goblin.IsAlive)
{
  hero.Hit(goblin);
  if (!goblin.IsAlive) break;
  goblin.Hit(hero);
}
if (hero.IsAlive) Console.WriteLine($"{goblin.Name} is defeated! {hero.Name} has {hero.Hp} hp");
else Console.WriteLine($"{hero.Name} is defeated!");`, { before: `class Character
{
  public string Name { get; private set; }
  public int Hp { get; private set; }
  public int Attack { get; private set; }
  public bool IsAlive => Hp > 0;

  public Character(string name, int hp, int attack)
  {
    Name = name;
    Hp = hp;
    Attack = attack;
  }

  public void TakeDamage(int amount)
  {
    Hp = Math.Max(0, Hp - amount);
  }

  public void Hit(Character target)
  {
    target.TakeDamage(Attack);
    Console.WriteLine($"{Name} hits {target.Name}: {target.Hp} hp left");
  }
}` }),
        hint: L('Гоблін: 20 → 13 → 6 → 0, герой: 30 → 26 → 22.', 'Гоблин: 20 → 13 → 6 → 0, герой: 30 → 26 → 22.', 'Goblin: 20 → 13 → 6 → 0, hero: 30 → 26 → 22.'),
        expected: 'Hero hits Goblin: 13 hp left\nGoblin hits Hero: 26 hp left\nHero hits Goblin: 6 hp left\nGoblin hits Hero: 22 hp left\nHero hits Goblin: 0 hp left\nGoblin is defeated! Hero has 22 hp',
        must: /class\s+Character[\s\S]*private\s+set/
      },
      quiz: { q: L('Навіщо перевіряти гобліна одразу після удару героя?', 'Зачем проверять гоблина сразу после удара героя?', 'Why check the goblin right after the hero’s hit?'), options: [L('щоб переможений не бив у відповідь', 'чтобы побеждённый не бил в ответ', 'so a defeated goblin can’t strike back'), L('для швидкості', 'для скорости', 'for speed'), L('так вимагає C#', 'так требует C#', 'C# requires it')], answer: 0, explain: L('Інакше «мертвий» гоблін зробить ще один хід.', 'Иначе «мёртвый» гоблин сделает ещё один ход.', 'Otherwise a “dead” goblin takes another turn.') },
      ref: [{ code: 'while (a.IsAlive && b.IsAlive)', d: L('ігровий цикл', 'игровой цикл', 'game loop') }, { code: 'Hp = Math.Max(0, Hp - d);', d: L('не нижче нуля', 'не ниже нуля', 'not below zero') }]
    },
    {
      id: 'project-shop', chapter: CH5, project: true,
      title: L('Проєкт: магазин та інвентар', 'Проект: магазин и инвентарь', 'Project: shop and inventory'),
      theory: L(
        `<p>Другий проєкт — ігровий магазин, як у будь-якій RPG чи симуляторі:</p>
<ol><li>Клас <code>Item</code> з <code>Name</code> і <code>Price</code></li><li>Каталог товарів — <code>Dictionary&lt;string, int&gt;</code> (назва → ціна)</li><li>Інвентар гравця — <code>List&lt;Item&gt;</code>, золото — <code>int</code></li><li><code>Buy(name)</code>: якщо золота не вистачає — повідомлення; інакше списати й додати в інвентар</li><li><code>Sell(name)</code>: продати за половину ціни (знайти через LINQ <code>FirstOrDefault</code>)</li><li>Звіт: інвентар від найдорожчого (<code>OrderByDescending</code>) і загальна вартість (<code>Sum</code>)</li></ol>`,
        `<p>Второй проект — игровой магазин, как в любой RPG или симуляторе:</p>
<ol><li>Класс <code>Item</code> с <code>Name</code> и <code>Price</code></li><li>Каталог товаров — <code>Dictionary&lt;string, int&gt;</code> (название → цена)</li><li>Инвентарь игрока — <code>List&lt;Item&gt;</code>, золото — <code>int</code></li><li><code>Buy(name)</code>: если золота не хватает — сообщение; иначе списать и добавить в инвентарь</li><li><code>Sell(name)</code>: продать за половину цены (найти через LINQ <code>FirstOrDefault</code>)</li><li>Отчёт: инвентарь от самого дорогого (<code>OrderByDescending</code>) и общая стоимость (<code>Sum</code>)</li></ol>`,
        `<p>The second project is a game shop, like in any RPG or simulator:</p>
<ol><li>An <code>Item</code> class with <code>Name</code> and <code>Price</code></li><li>A catalogue — <code>Dictionary&lt;string, int&gt;</code> (name → price)</li><li>The player’s inventory — <code>List&lt;Item&gt;</code>, gold — an <code>int</code></li><li><code>Buy(name)</code>: if there isn’t enough gold, say so; otherwise pay and add the item</li><li><code>Sell(name)</code>: sell for half price (find it with LINQ <code>FirstOrDefault</code>)</li><li>Report: inventory from most expensive (<code>OrderByDescending</code>) and total value (<code>Sum</code>)</li></ol>`),
      why: L(`<p>Чому каталог — словник, а інвентар — список? Ціну шукаємо за назвою (словник робить це миттєво), а в інвентарі можуть бути <b>дві однакові</b> речі, і важливий порядок — це список. Правильна структура даних робить решту коду простою.</p>`,
        `<p>Почему каталог — словарь, а инвентарь — список? Цену ищем по названию (словарь делает это мгновенно), а в инвентаре могут быть <b>две одинаковые</b> вещи, и важен порядок — это список. Правильная структура данных делает остальной код простым.</p>`,
        `<p>Why is the catalogue a dictionary and the inventory a list? Prices are looked up by name (a dictionary does that instantly), while an inventory can hold <b>two identical</b> items and order matters — that’s a list. The right data structure keeps the rest of the code simple.</p>`),
      mistakes: L(`<ul><li>Купівля без перевірки золота — від’ємний баланс.</li><li><code>First</code> замість <code>FirstOrDefault</code> при продажу неіснуючої речі — виняток.</li><li>Ціна продажу <code>price / 2</code> для непарних цін округлюється вниз — це нормально, але знай про це.</li></ul>`,
        `<ul><li>Покупка без проверки золота — отрицательный баланс.</li><li><code>First</code> вместо <code>FirstOrDefault</code> при продаже несуществующей вещи — исключение.</li><li>Цена продажи <code>price / 2</code> для нечётных цен округляется вниз — это нормально, но знай об этом.</li></ul>`,
        `<ul><li>Buying without checking gold — a negative balance.</li><li><code>First</code> instead of <code>FirstOrDefault</code> when selling a missing item — an exception.</li><li>A sell price of <code>price / 2</code> rounds down for odd prices — fine, but be aware.</li></ul>`),
      examples: [
        { title: L('Каталог', 'Каталог', 'Catalogue'), code: M(`var catalog = new Dictionary<string, int>
{
  { "Sword", 150 }, { "Shield", 90 }, { "Potion", 25 }
};
foreach (var p in catalog.OrderBy(p => p.Value))
  Console.WriteLine($"{p.Key,-8}{p.Value,5} gold");`, { using: LINQ }), note: L('<code>{x,-8}</code> вирівнює текст по ширині.', '<code>{x,-8}</code> выравнивает текст по ширине.', '<code>{x,-8}</code> pads text to a width.') },
        { title: 'FirstOrDefault', code: M(`var bag = new List<string> { "Potion", "Rope" };
string found = bag.FirstOrDefault(i => i == "Sword");
Console.WriteLine(found == null ? "No sword" : "Has sword");
Console.WriteLine(bag.FirstOrDefault(i => i.StartsWith("R")));`, { using: LINQ }), note: L('Якщо нічого не знайдено — null.', 'Если ничего не найдено — null.', 'Returns null when nothing matches.') },
        { title: L('Сума властивостей', 'Сумма свойств', 'Summing properties'), code: M(`var items = new List<Item> { new Item("Bow", 120), new Item("Arrow", 2), new Item("Map", 30) };
Console.WriteLine(items.Sum(i => i.Price));
Console.WriteLine(string.Join(", ", items.OrderByDescending(i => i.Price).Select(i => i.Name)));`, { using: LINQ, before: `class Item
{
  public string Name { get; }
  public int Price { get; }
  public Item(string name, int price) { Name = name; Price = price; }
}` }), note: L('<code>{ get; }</code> — властивість лише для читання.', '<code>{ get; }</code> — свойство только для чтения.', '<code>{ get; }</code> is a read-only property.') }
      ],
      task: {
        text: L(`Напиши клас <code>Shop</code> із золотом <b>300</b>, каталогом (Sword 150, Shield 90, Bow 120, Potion 25), інвентарем <code>List&lt;Item&gt;</code> і методами <code>Buy</code>, <code>Sell</code> (половина ціни), <code>Report</code>. Виконай: Buy Sword, Buy Shield, Buy Bow, Sell Shield, Buy Potion, Report. Повідомлення: <code>Bought Sword, gold 150</code>, <code>Not enough gold for Bow</code>, <code>Sold Shield, gold 105</code>, <code>Inventory: Sword, Potion</code> (від найдорожчого), <code>Total value 175</code>.`,
          `Напиши класс <code>Shop</code> с золотом <b>300</b>, каталогом (Sword 150, Shield 90, Bow 120, Potion 25), инвентарём <code>List&lt;Item&gt;</code> и методами <code>Buy</code>, <code>Sell</code> (половина цены), <code>Report</code>. Выполни: Buy Sword, Buy Shield, Buy Bow, Sell Shield, Buy Potion, Report. Сообщения: <code>Bought Sword, gold 150</code>, <code>Not enough gold for Bow</code>, <code>Sold Shield, gold 105</code>, <code>Inventory: Sword, Potion</code> (от самого дорогого), <code>Total value 175</code>.`,
          `Write a <code>Shop</code> class with <b>300</b> gold, a catalogue (Sword 150, Shield 90, Bow 120, Potion 25), an inventory <code>List&lt;Item&gt;</code> and methods <code>Buy</code>, <code>Sell</code> (half price), <code>Report</code>. Run: Buy Sword, Buy Shield, Buy Bow, Sell Shield, Buy Potion, Report. Messages: <code>Bought Sword, gold 150</code>, <code>Not enough gold for Bow</code>, <code>Sold Shield, gold 105</code>, <code>Inventory: Sword, Potion</code> (most expensive first), <code>Total value 175</code>.`),
        how: [L('Buy: <code>int price = catalog[name]; if (price &gt; gold) { … return; }</code>', 'Buy: <code>int price = catalog[name]; if (price &gt; gold) { … return; }</code>', 'Buy: <code>int price = catalog[name]; if (price &gt; gold) { … return; }</code>'), L('Sell: <code>var item = inventory.FirstOrDefault(i =&gt; i.Name == name);</code>, потім <code>inventory.Remove(item)</code>.', 'Sell: <code>var item = inventory.FirstOrDefault(i =&gt; i.Name == name);</code>, затем <code>inventory.Remove(item)</code>.', 'Sell: <code>var item = inventory.FirstOrDefault(i =&gt; i.Name == name);</code>, then <code>inventory.Remove(item)</code>.')],
        starter: M(`var shop = new Shop();
shop.Buy("Sword");
shop.Buy("Shield");
shop.Buy("Bow");
shop.Sell("Shield");
shop.Buy("Potion");
shop.Report();`, { using: LINQ, before: `class Item
{
  public string Name { get; }
  public int Price { get; }
  public Item(string name, int price) { Name = name; Price = price; }
}

class Shop
{
  // gold, catalog, inventory, Buy, Sell, Report
}` }),
        solution: M(`var shop = new Shop();
shop.Buy("Sword");
shop.Buy("Shield");
shop.Buy("Bow");
shop.Sell("Shield");
shop.Buy("Potion");
shop.Report();`, { using: LINQ, before: `class Item
{
  public string Name { get; }
  public int Price { get; }
  public Item(string name, int price) { Name = name; Price = price; }
}

class Shop
{
  int gold = 300;
  Dictionary<string, int> catalog = new Dictionary<string, int>
  {
    { "Sword", 150 }, { "Shield", 90 }, { "Bow", 120 }, { "Potion", 25 }
  };
  List<Item> inventory = new List<Item>();

  public void Buy(string name)
  {
    int price = catalog[name];
    if (price > gold)
    {
      Console.WriteLine($"Not enough gold for {name}");
      return;
    }
    gold -= price;
    inventory.Add(new Item(name, price));
    Console.WriteLine($"Bought {name}, gold {gold}");
  }

  public void Sell(string name)
  {
    var item = inventory.FirstOrDefault(i => i.Name == name);
    if (item == null)
    {
      Console.WriteLine($"No {name} to sell");
      return;
    }
    inventory.Remove(item);
    gold += item.Price / 2;
    Console.WriteLine($"Sold {name}, gold {gold}");
  }

  public void Report()
  {
    var names = inventory.OrderByDescending(i => i.Price).Select(i => i.Name);
    Console.WriteLine("Inventory: " + string.Join(", ", names));
    Console.WriteLine($"Total value {inventory.Sum(i => i.Price)}");
  }
}` }),
        hint: L('300 − 150 − 90 = 60 → на лук не вистачає; +45 за щит = 105; −25 = 80.', '300 − 150 − 90 = 60 → на лук не хватает; +45 за щит = 105; −25 = 80.', '300 − 150 − 90 = 60 → can’t afford the bow; +45 for the shield = 105; −25 = 80.'),
        expected: 'Bought Sword, gold 150\nBought Shield, gold 60\nNot enough gold for Bow\nSold Shield, gold 105\nBought Potion, gold 80\nInventory: Sword, Potion\nTotal value 175',
        must: /Dictionary[\s\S]*List<Item>/
      },
      quiz: { q: L('Чому інвентар — List, а не Dictionary?', 'Почему инвентарь — List, а не Dictionary?', 'Why is the inventory a List rather than a Dictionary?'), options: [L('можуть бути однакові речі й важливий порядок', 'могут быть одинаковые вещи и важен порядок', 'duplicates are allowed and order matters'), L('List швидший за все', 'List быстрее всего', 'List is always faster'), L('Dictionary не працює з рядками', 'Dictionary не работает со строками', 'Dictionary can’t hold strings')], answer: 0, explain: L('Ключі словника мають бути унікальними.', 'Ключи словаря должны быть уникальными.', 'Dictionary keys must be unique.') },
      ref: [{ code: 'list.FirstOrDefault(x => …)', d: L('знайти або null', 'найти или null', 'find or null') }, { code: 'list.Sum(x => x.Price)', d: L('сума властивостей', 'сумма свойств', 'sum a property') }]
    }
  ]);
})();
