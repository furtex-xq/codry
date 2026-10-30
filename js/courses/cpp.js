// C++ — курс. Код компілюється GCC 13 (C++17) і виконується на сервері Wandbox.
(function () {
  const L = Codry.L;
  const CH1 = L('Основи C++', 'Основы C++', 'C++ basics');
  const CH2 = L('Умови, цикли, функції', 'Условия, циклы, функции', 'Conditions, loops, functions');
  const CH3 = L('Контейнери STL і пам’ять', 'Контейнеры STL и память', 'STL containers and memory');
  const CH4 = L('Класи та ООП', 'Классы и ООП', 'Classes and OOP');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');
  const M = (body, inc) => (inc || '#include <iostream>\nusing namespace std;') + '\n\nint main() {\n' + body.split('\n').map((l) => (l ? '  ' + l : l)).join('\n') + '\n  return 0;\n}';

  Codry.steps('cpp', [
    {
      id: 'hello', chapter: CH1,
      title: L('Перша програма: iostream і main', 'Первая программа: iostream и main', 'First program: iostream and main'),
      theory: L(
        `<p><b>C++</b> — мова, на якій пишуть ігрові рушії (Unreal Engine), браузери (Chrome), операційні системи, програми для роботів і олімпіадні задачі. Вона дуже швидка, бо компілюється прямо в машинний код процесора.</p>
<pre class="inline-code">#include &lt;iostream&gt;
using namespace std;

int main() {
  cout &lt;&lt; "Hello, C++!" &lt;&lt; endl;
  return 0;
}</pre>
<ul><li><code>#include &lt;iostream&gt;</code> — підключити бібліотеку введення/виведення</li><li><code>using namespace std;</code> — щоб писати <code>cout</code>, а не <code>std::cout</code></li><li><code>int main()</code> — точка входу; <code>return 0</code> означає «усе пройшло добре»</li><li><code>cout &lt;&lt; …</code> — вивід; <code>&lt;&lt;</code> можна ланцюжити; <code>endl</code> або <code>"\\n"</code> — новий рядок</li></ul>`,
        `<p><b>C++</b> — язык, на котором пишут игровые движки (Unreal Engine), браузеры (Chrome), операционные системы, программы для роботов и олимпиадные задачи. Он очень быстрый, потому что компилируется прямо в машинный код процессора.</p>
<pre class="inline-code">#include &lt;iostream&gt;
using namespace std;

int main() {
  cout &lt;&lt; "Hello, C++!" &lt;&lt; endl;
  return 0;
}</pre>
<ul><li><code>#include &lt;iostream&gt;</code> — подключить библиотеку ввода/вывода</li><li><code>using namespace std;</code> — чтобы писать <code>cout</code>, а не <code>std::cout</code></li><li><code>int main()</code> — точка входа; <code>return 0</code> означает «всё прошло хорошо»</li><li><code>cout &lt;&lt; …</code> — вывод; <code>&lt;&lt;</code> можно цеплять; <code>endl</code> или <code>"\\n"</code> — новая строка</li></ul>`,
        `<p><b>C++</b> powers game engines (Unreal Engine), browsers (Chrome), operating systems, robots and competitive programming. It’s very fast because it compiles straight to the CPU’s machine code.</p>
<pre class="inline-code">#include &lt;iostream&gt;
using namespace std;

int main() {
  cout &lt;&lt; "Hello, C++!" &lt;&lt; endl;
  return 0;
}</pre>
<ul><li><code>#include &lt;iostream&gt;</code> — include the input/output library</li><li><code>using namespace std;</code> — write <code>cout</code> instead of <code>std::cout</code></li><li><code>int main()</code> is the entry point; <code>return 0</code> means “all good”</li><li><code>cout &lt;&lt; …</code> prints; <code>&lt;&lt;</code> chains; <code>endl</code> or <code>"\\n"</code> is a newline</li></ul>`),
      why: L(`<p>Чому C++ такий популярний в іграх? Гра має 60 разів на секунду обчислити фізику, світло й штучний інтелект. C++ дає повний контроль над пам’яттю й процесором, без «посередників», тому важкі рушії пишуть саме ним.</p>`,
        `<p>Почему C++ так популярен в играх? Игра должна 60 раз в секунду рассчитать физику, свет и искусственный интеллект. C++ даёт полный контроль над памятью и процессором, без «посредников», поэтому тяжёлые движки пишут именно на нём.</p>`,
        `<p>Why is C++ so popular for games? A game must compute physics, lighting and AI 60 times a second. C++ gives full control over memory and the CPU with no middlemen, so heavy engines are written in it.</p>`),
      mistakes: L(`<ul><li>Забута <code>;</code> після інструкції — помилка компіляції.</li><li><code>cout &gt;&gt; "Hi"</code> — стрілки у виводі дивляться <b>до</b> cout: <code>&lt;&lt;</code>.</li><li>Без <code>#include &lt;iostream&gt;</code> компілятор не знає, що таке cout.</li></ul>`,
        `<ul><li>Забытая <code>;</code> после инструкции — ошибка компиляции.</li><li><code>cout &gt;&gt; "Hi"</code> — стрелки в выводе смотрят <b>к</b> cout: <code>&lt;&lt;</code>.</li><li>Без <code>#include &lt;iostream&gt;</code> компилятор не знает, что такое cout.</li></ul>`,
        `<ul><li>A missing <code>;</code> after a statement — compile error.</li><li><code>cout &gt;&gt; "Hi"</code> — output arrows point <b>toward</b> cout: <code>&lt;&lt;</code>.</li><li>Without <code>#include &lt;iostream&gt;</code> the compiler doesn’t know cout.</li></ul>`),
      examples: [
        { title: 'cout', code: M('cout << "Hello, C++!" << endl;\ncout << "Codry teaches C++" << "\\n";'), note: L('endl і "\\n" — новий рядок.', 'endl и "\\n" — новая строка.', 'endl and "\\n" both end a line.') },
        { title: L('Ланцюжок', 'Цепочка', 'Chaining'), code: M('cout << "2 + 3 = " << 2 + 3 << "\\n";\ncout << "Level " << 5 << ", coins " << 120 << "\\n";'), note: L('Текст і числа разом.', 'Текст и числа вместе.', 'Text and numbers together.') },
        { title: 'std::', code: '#include <iostream>\n\nint main() {\n  std::cout << "Without using namespace" << std::endl;\n  return 0;\n}', note: L('Повна форма з префіксом std::.', 'Полная форма с префиксом std::.', 'The full form with the std:: prefix.') }
      ],
      task: {
        text: L('Виведи два рядки: <code>Hello, C++!</code> і <code>2 * 21 = 42</code> (число обчисли виразом).', 'Выведи две строки: <code>Hello, C++!</code> и <code>2 * 21 = 42</code> (число вычисли выражением).', 'Print two lines: <code>Hello, C++!</code> and <code>2 * 21 = 42</code> (compute the number).'),
        how: [L('<code>cout &lt;&lt; "2 * 21 = " &lt;&lt; 2 * 21 &lt;&lt; "\\n";</code>', '<code>cout &lt;&lt; "2 * 21 = " &lt;&lt; 2 * 21 &lt;&lt; "\\n";</code>', '<code>cout &lt;&lt; "2 * 21 = " &lt;&lt; 2 * 21 &lt;&lt; "\\n";</code>')],
        starter: M('// твій код тут'),
        solution: M('cout << "Hello, C++!" << "\\n";\ncout << "2 * 21 = " << 2 * 21 << "\\n";'),
        hint: L('Множення має пріоритет над <code>&lt;&lt;</code>.', 'Умножение имеет приоритет над <code>&lt;&lt;</code>.', 'Multiplication binds tighter than <code>&lt;&lt;</code>.'),
        expected: 'Hello, C++!\n2 * 21 = 42',
        must: /2\s*\*\s*21\s*<</
      },
      quiz: { q: L('Що означає <code>return 0;</code> у main?', 'Что означает <code>return 0;</code> в main?', 'What does <code>return 0;</code> in main mean?'), options: [L('помилка', 'ошибка', 'an error'), L('програма завершилася успішно', 'программа завершилась успешно', 'the program finished successfully'), L('вивести 0', 'вывести 0', 'print 0')], answer: 1, explain: L('Код 0 — успіх.', 'Код 0 — успех.', 'Exit code 0 means success.') },
      ref: [{ code: '#include <iostream>', d: L('бібліотека вводу/виводу', 'библиотека ввода/вывода', 'I/O library') }, { code: 'cout << x << "\\n";', d: L('вивід', 'вывод', 'output') }]
    },
    {
      id: 'variables', chapter: CH1,
      title: L('Змінні, типи й ділення', 'Переменные, типы и деление', 'Variables, types and division'),
      theory: L(
        `<p>Основні типи C++:</p>
<table class="mini"><tr><td><code>int</code></td><td>ціле (≈ ±2 мільярди)</td></tr><tr><td><code>long long</code></td><td>дуже велике ціле</td></tr><tr><td><code>double</code></td><td>дробове</td></tr><tr><td><code>char</code></td><td>символ <code>'A'</code></td></tr><tr><td><code>bool</code></td><td><code>true</code>/<code>false</code> (виводиться як 1/0)</td></tr><tr><td><code>string</code></td><td>рядок (потрібен <code>#include &lt;string&gt;</code>)</td></tr></table>
<p><code>auto</code> — тип визначиться сам: <code>auto x = 3.5;</code>. Константа — <code>const int MAX = 100;</code>.</p>
<p>Як і в Java, <b>ділення цілих — ціле</b>: <code>7 / 2 == 3</code>. Для дробового — <code>7 / 2.0</code> або <code>(double)7 / 2</code>. Остача — <code>%</code>.</p>
<p>Точність виводу: <code>#include &lt;iomanip&gt;</code> і <code>cout &lt;&lt; fixed &lt;&lt; setprecision(2) &lt;&lt; x;</code></p>`,
        `<p>Основные типы C++:</p>
<table class="mini"><tr><td><code>int</code></td><td>целое (≈ ±2 миллиарда)</td></tr><tr><td><code>long long</code></td><td>очень большое целое</td></tr><tr><td><code>double</code></td><td>дробное</td></tr><tr><td><code>char</code></td><td>символ <code>'A'</code></td></tr><tr><td><code>bool</code></td><td><code>true</code>/<code>false</code> (выводится как 1/0)</td></tr><tr><td><code>string</code></td><td>строка (нужен <code>#include &lt;string&gt;</code>)</td></tr></table>
<p><code>auto</code> — тип определится сам: <code>auto x = 3.5;</code>. Константа — <code>const int MAX = 100;</code>.</p>
<p>Как и в Java, <b>деление целых — целое</b>: <code>7 / 2 == 3</code>. Для дробного — <code>7 / 2.0</code> или <code>(double)7 / 2</code>. Остаток — <code>%</code>.</p>
<p>Точность вывода: <code>#include &lt;iomanip&gt;</code> и <code>cout &lt;&lt; fixed &lt;&lt; setprecision(2) &lt;&lt; x;</code></p>`,
        `<p>Core C++ types:</p>
<table class="mini"><tr><td><code>int</code></td><td>integer (≈ ±2 billion)</td></tr><tr><td><code>long long</code></td><td>a very big integer</td></tr><tr><td><code>double</code></td><td>decimal</td></tr><tr><td><code>char</code></td><td>character <code>'A'</code></td></tr><tr><td><code>bool</code></td><td><code>true</code>/<code>false</code> (printed as 1/0)</td></tr><tr><td><code>string</code></td><td>text (needs <code>#include &lt;string&gt;</code>)</td></tr></table>
<p><code>auto</code> infers the type: <code>auto x = 3.5;</code>. A constant: <code>const int MAX = 100;</code>.</p>
<p>As in Java, <b>integer division is integer</b>: <code>7 / 2 == 3</code>. For decimals use <code>7 / 2.0</code> or <code>(double)7 / 2</code>. Remainder: <code>%</code>.</p>
<p>Output precision: <code>#include &lt;iomanip&gt;</code> and <code>cout &lt;&lt; fixed &lt;&lt; setprecision(2) &lt;&lt; x;</code></p>`),
      why: L(`<p>Чому в C++ кілька цілих типів? Кожен займає різну кількість пам’яті. У грі з мільйоном частинок різниця між 4 і 8 байтами на кожну — це мегабайти. C++ дає вибір, бо створений для програм, де кожен байт і кожна наносекунда мають значення.</p>`,
        `<p>Почему в C++ несколько целых типов? Каждый занимает разное количество памяти. В игре с миллионом частиц разница между 4 и 8 байтами на каждую — это мегабайты. C++ даёт выбор, потому что создан для программ, где важен каждый байт и каждая наносекунда.</p>`,
        `<p>Why several integer types? Each uses a different amount of memory. In a game with a million particles, 4 versus 8 bytes each is megabytes. C++ gives you the choice because it’s built for programs where every byte and nanosecond counts.</p>`),
      mistakes: L(`<ul><li>Неініціалізована змінна <code>int x; cout &lt;&lt; x;</code> — виведе «сміття» з пам’яті. Завжди задавай початкове значення.</li><li>Переповнення: <code>int big = 3000000000;</code> не влазить в int — бери <code>long long</code>.</li></ul>`,
        `<ul><li>Неинициализированная переменная <code>int x; cout &lt;&lt; x;</code> — выведет «мусор» из памяти. Всегда задавай начальное значение.</li><li>Переполнение: <code>int big = 3000000000;</code> не помещается в int — бери <code>long long</code>.</li></ul>`,
        `<ul><li>An uninitialised <code>int x; cout &lt;&lt; x;</code> prints garbage from memory. Always initialise.</li><li>Overflow: <code>int big = 3000000000;</code> doesn’t fit in an int — use <code>long long</code>.</li></ul>`),
      examples: [
        { title: L('Типи', 'Типы', 'Types'), code: M('int age = 14;\ndouble height = 1.68;\nchar grade = \'A\';\nbool online = true;\nstring name = "Ira";\ncout << name << ", " << age << ", " << height << ", " << grade << ", " << online << "\\n";\ncout << boolalpha << online << "\\n";', '#include <iostream>\n#include <string>\nusing namespace std;'), note: L('boolalpha — виводити true/false.', 'boolalpha — выводить true/false.', 'boolalpha prints true/false.') },
        { title: L('Ділення', 'Деление', 'Division'), code: M('cout << 7 / 2 << "\\n";\ncout << 7 / 2.0 << "\\n";\ncout << 7 % 3 << "\\n";\ncout << (double)7 / 2 << "\\n";\ncout << (int)9.99 << "\\n";'), note: L('Як у Java.', 'Как в Java.', 'Same as Java.') },
        { title: 'setprecision', code: M('double price = 19.987;\ncout << fixed << setprecision(2) << price << "\\n";\ncout << setprecision(1) << 3.14159 << "\\n";', '#include <iostream>\n#include <iomanip>\nusing namespace std;'), note: L('fixed + setprecision — кількість знаків після коми.', 'fixed + setprecision — количество знаков после запятой.', 'fixed + setprecision sets decimal places.') },
        { title: 'auto / const', code: M('auto lives = 3;\nauto speed = 2.5;\nconst int MAX_LIVES = 5;\nlives += 1;\ncout << lives << "/" << MAX_LIVES << " at speed " << speed << "\\n";'), note: L('auto виводить тип з значення.', 'auto выводит тип из значения.', 'auto infers from the value.') }
      ],
      task: {
        text: L('Магазин: <code>int apples = 7</code>, ціна <code>double price = 0.45</code>. Виведи загальну вартість з двома знаками (<code>Total: 3.15</code>) і скільки повних пакетів по 3 яблука вийде та скільки залишиться (<code>Bags: 2, left: 1</code>).', 'Магазин: <code>int apples = 7</code>, цена <code>double price = 0.45</code>. Выведи общую стоимость с двумя знаками (<code>Total: 3.15</code>) и сколько полных пакетов по 3 яблока получится и сколько останется (<code>Bags: 2, left: 1</code>).', 'A shop: <code>int apples = 7</code>, <code>double price = 0.45</code>. Print the total with two decimals (<code>Total: 3.15</code>) and how many full bags of 3 there are and how many are left (<code>Bags: 2, left: 1</code>).'),
        how: [L('Цілочисельне ділення <code>/</code> і остача <code>%</code>.', 'Целочисленное деление <code>/</code> и остаток <code>%</code>.', 'Integer division <code>/</code> and remainder <code>%</code>.'), L('<code>fixed &lt;&lt; setprecision(2)</code> з <code>&lt;iomanip&gt;</code>.', '<code>fixed &lt;&lt; setprecision(2)</code> из <code>&lt;iomanip&gt;</code>.', '<code>fixed &lt;&lt; setprecision(2)</code> from <code>&lt;iomanip&gt;</code>.')],
        starter: M('int apples = 7;\ndouble price = 0.45;\n', '#include <iostream>\n#include <iomanip>\nusing namespace std;'),
        solution: M('int apples = 7;\ndouble price = 0.45;\ncout << "Total: " << fixed << setprecision(2) << apples * price << "\\n";\ncout << "Bags: " << apples / 3 << ", left: " << apples % 3 << "\\n";', '#include <iostream>\n#include <iomanip>\nusing namespace std;'),
        hint: L('7 / 3 = 2, 7 % 3 = 1.', '7 / 3 = 2, 7 % 3 = 1.', '7 / 3 = 2, 7 % 3 = 1.'),
        expected: 'Total: 3.15\nBags: 2, left: 1',
        must: /setprecision[\s\S]*%\s*3/
      },
      quiz: { q: L('Що виведе <code>cout &lt;&lt; 10 / 4;</code>?', 'Что выведет <code>cout &lt;&lt; 10 / 4;</code>?', 'What does <code>cout &lt;&lt; 10 / 4;</code> print?'), options: ['2.5', '2', '3'], answer: 1, explain: L('Ділення цілих.', 'Деление целых.', 'Integer division.') },
      ref: [{ code: 'int long long double char bool string', d: L('типи', 'типы', 'types') }, { code: 'fixed << setprecision(n)', d: L('знаки після коми', 'знаки после запятой', 'decimal places') }]
    },
    {
      id: 'input', chapter: CH1,
      title: L('Введення: cin і getline', 'Ввод: cin и getline', 'Input: cin and getline'),
      theory: L(
        `<p><code>cin &gt;&gt; x</code> читає значення до пробілу або нового рядка:</p>
<pre class="inline-code">int a, b;
cin &gt;&gt; a &gt;&gt; b;      // "3 4" або "3" і "4" в різних рядках
string word;
cin &gt;&gt; word;        // одне слово</pre>
<p>Щоб прочитати <b>увесь рядок</b> з пробілами, використовують <code>getline(cin, line);</code>.</p>
<p>Читати, поки є дані: <code>while (cin &gt;&gt; x) { … }</code> — цикл закінчиться, коли введення скінчиться.</p>
<div class="tip">💡 У Codry вхідні дані пишуться в поле <b>«Вхідні дані (stdin)»</b> під редактором.</div>`,
        `<p><code>cin &gt;&gt; x</code> читает значение до пробела или новой строки:</p>
<pre class="inline-code">int a, b;
cin &gt;&gt; a &gt;&gt; b;      // "3 4" или "3" и "4" в разных строках
string word;
cin &gt;&gt; word;        // одно слово</pre>
<p>Чтобы прочитать <b>всю строку</b> с пробелами, используют <code>getline(cin, line);</code>.</p>
<p>Читать, пока есть данные: <code>while (cin &gt;&gt; x) { … }</code> — цикл закончится, когда ввод кончится.</p>
<div class="tip">💡 В Codry входные данные пишутся в поле <b>«Входные данные (stdin)»</b> под редактором.</div>`,
        `<p><code>cin &gt;&gt; x</code> reads a value up to a space or newline:</p>
<pre class="inline-code">int a, b;
cin &gt;&gt; a &gt;&gt; b;      // "3 4", or "3" and "4" on separate lines
string word;
cin &gt;&gt; word;        // one word</pre>
<p>To read <b>a whole line</b> with spaces, use <code>getline(cin, line);</code>.</p>
<p>Read while data remains: <code>while (cin &gt;&gt; x) { … }</code> — the loop ends when input runs out.</p>
<div class="tip">💡 In Codry, type input into the <b>“Input (stdin)”</b> box under the editor.</div>`),
      why: L(`<p>У олімпіадах і на співбесідах майже кожна задача читає дані через <code>cin</code>. Шаблон <code>while (cin &gt;&gt; x)</code> — найкоротший спосіб обробити невідому кількість чисел, і його варто знати напам’ять.</p>`,
        `<p>На олимпиадах и собеседованиях почти каждая задача читает данные через <code>cin</code>. Шаблон <code>while (cin &gt;&gt; x)</code> — самый короткий способ обработать неизвестное количество чисел, и его стоит знать наизусть.</p>`,
        `<p>In competitions and interviews nearly every task reads input via <code>cin</code>. The <code>while (cin &gt;&gt; x)</code> pattern is the shortest way to process an unknown count of numbers — know it by heart.</p>`),
      mistakes: L(`<ul><li><code>cin &gt;&gt; name</code> для «Ivan Petrenko» прочитає лише «Ivan».</li><li>Після <code>cin &gt;&gt; n</code> одразу <code>getline</code> поверне порожній рядок — спершу <code>cin.ignore()</code>.</li></ul>`,
        `<ul><li><code>cin &gt;&gt; name</code> для «Ivan Petrenko» прочитает только «Ivan».</li><li>После <code>cin &gt;&gt; n</code> сразу <code>getline</code> вернёт пустую строку — сначала <code>cin.ignore()</code>.</li></ul>`,
        `<ul><li><code>cin &gt;&gt; name</code> for “Ivan Petrenko” reads only “Ivan”.</li><li><code>getline</code> right after <code>cin &gt;&gt; n</code> returns an empty line — call <code>cin.ignore()</code> first.</li></ul>`),
      examples: [
        { title: L('Два числа', 'Два числа', 'Two numbers'), code: M('int a, b;\ncin >> a >> b;\ncout << a << " + " << b << " = " << a + b << "\\n";'), note: L('Введи, наприклад, <code>3 4</code>.', 'Введи, например, <code>3 4</code>.', 'Type e.g. <code>3 4</code>.') },
        { title: 'getline', code: M('string line;\ngetline(cin, line);\ncout << "You said: " << line << " (" << line.size() << " chars)\\n";', '#include <iostream>\n#include <string>\nusing namespace std;'), note: L('Увесь рядок з пробілами.', 'Вся строка с пробелами.', 'The whole line, spaces included.') },
        { title: L('Поки є числа', 'Пока есть числа', 'While numbers remain'), code: M('int x, sum = 0, count = 0;\nwhile (cin >> x) {\n  sum += x;\n  count++;\n}\ncout << count << " numbers, sum " << sum << "\\n";'), note: L('Класичний олімпіадний шаблон.', 'Классический олимпиадный шаблон.', 'The classic contest pattern.') }
      ],
      task: {
        text: L('Прочитай число <code>n</code>, а потім <code>n</code> оцінок. Виведи <code>Max: M</code> і <code>Min: K</code>. Вхідні дані вже задано: <code>5</code> і <code>7 12 3 9 10</code>.', 'Прочитай число <code>n</code>, а затем <code>n</code> оценок. Выведи <code>Max: M</code> и <code>Min: K</code>. Входные данные уже заданы: <code>5</code> и <code>7 12 3 9 10</code>.', 'Read a number <code>n</code>, then <code>n</code> grades. Print <code>Max: M</code> and <code>Min: K</code>. Input is preset: <code>5</code> and <code>7 12 3 9 10</code>.'),
        how: [L('Перше значення — стартові max і min.', 'Первое значение — стартовые max и min.', 'The first value starts both max and min.'), L('Цикл <code>for (int i = 0; i &lt; n; i++)</code> з <code>cin &gt;&gt; x</code>.', 'Цикл <code>for (int i = 0; i &lt; n; i++)</code> с <code>cin &gt;&gt; x</code>.', 'A <code>for (int i = 0; i &lt; n; i++)</code> loop with <code>cin &gt;&gt; x</code>.')],
        starter: M('int n;\ncin >> n;\n'),
        solution: M('int n;\ncin >> n;\nint mx = -1000000, mn = 1000000;\nfor (int i = 0; i < n; i++) {\n  int x;\n  cin >> x;\n  if (x > mx) mx = x;\n  if (x < mn) mn = x;\n}\ncout << "Max: " << mx << "\\n";\ncout << "Min: " << mn << "\\n";'),
        stdin: '5\n7 12 3 9 10',
        hint: L('Очікувано: Max: 12, Min: 3.', 'Ожидается: Max: 12, Min: 3.', 'Expected: Max: 12, Min: 3.'),
        expected: 'Max: 12\nMin: 3',
        must: /cin\s*>>/
      },
      quiz: { q: L('Як прочитати рядок із пробілами?', 'Как прочитать строку с пробелами?', 'How do you read a line with spaces?'), options: ['cin >> s', 'getline(cin, s)', 'read(s)'], answer: 1, explain: L('cin зупиняється на пробілі.', 'cin останавливается на пробеле.', 'cin stops at a space.') },
      ref: [{ code: 'cin >> a >> b;', d: L('читання значень', 'чтение значений', 'read values') }, { code: 'getline(cin, s);', d: L('увесь рядок', 'вся строка', 'whole line') }, { code: 'while (cin >> x)', d: L('до кінця вводу', 'до конца ввода', 'until input ends') }]
    },
    {
      id: 'conditions', chapter: CH2,
      title: L('Умови: if, switch, тернарний', 'Условия: if, switch, тернарный', 'Conditions: if, switch, ternary'),
      theory: L(
        `<p>Умови в C++ майже як у Java та JavaScript:</p>
<pre class="inline-code">if (hp &lt;= 0) {
  cout &lt;&lt; "Game over";
} else if (hp &lt; 30) {
  cout &lt;&lt; "Low HP";
} else {
  cout &lt;&lt; "OK";
}</pre>
<p>Логіка: <code>&amp;&amp;</code>, <code>||</code>, <code>!</code>. Тернарний: <code>string s = (x &gt; 0) ? "pos" : "neg";</code>.</p>
<p><b>switch</b> працює з цілими й символами. Кожен <code>case</code> закінчують <code>break</code>, інакше виконання «провалиться» в наступний:</p>
<pre class="inline-code">switch (key) {
  case 'w': cout &lt;&lt; "up"; break;
  case 's': cout &lt;&lt; "down"; break;
  default:  cout &lt;&lt; "?";
}</pre>
<p>Особливість C++: будь-яке ненульове число — це <code>true</code>, а <code>0</code> — <code>false</code>.</p>`,
        `<p>Условия в C++ почти как в Java и JavaScript:</p>
<pre class="inline-code">if (hp &lt;= 0) {
  cout &lt;&lt; "Game over";
} else if (hp &lt; 30) {
  cout &lt;&lt; "Low HP";
} else {
  cout &lt;&lt; "OK";
}</pre>
<p>Логика: <code>&amp;&amp;</code>, <code>||</code>, <code>!</code>. Тернарный: <code>string s = (x &gt; 0) ? "pos" : "neg";</code>.</p>
<p><b>switch</b> работает с целыми и символами. Каждый <code>case</code> заканчивают <code>break</code>, иначе выполнение «провалится» в следующий:</p>
<pre class="inline-code">switch (key) {
  case 'w': cout &lt;&lt; "up"; break;
  case 's': cout &lt;&lt; "down"; break;
  default:  cout &lt;&lt; "?";
}</pre>
<p>Особенность C++: любое ненулевое число — это <code>true</code>, а <code>0</code> — <code>false</code>.</p>`,
        `<p>C++ conditions look like Java and JavaScript:</p>
<pre class="inline-code">if (hp &lt;= 0) {
  cout &lt;&lt; "Game over";
} else if (hp &lt; 30) {
  cout &lt;&lt; "Low HP";
} else {
  cout &lt;&lt; "OK";
}</pre>
<p>Logic: <code>&amp;&amp;</code>, <code>||</code>, <code>!</code>. Ternary: <code>string s = (x &gt; 0) ? "pos" : "neg";</code>.</p>
<p><b>switch</b> works with integers and chars. End each <code>case</code> with <code>break</code>, or execution “falls through” into the next:</p>
<pre class="inline-code">switch (key) {
  case 'w': cout &lt;&lt; "up"; break;
  case 's': cout &lt;&lt; "down"; break;
  default:  cout &lt;&lt; "?";
}</pre>
<p>A C++ quirk: any non-zero number is <code>true</code>, and <code>0</code> is <code>false</code>.</p>`),
      why: L(`<p>Чому в switch потрібен break? Так задумано ще в мові C: «провалювання» дозволяє об’єднати кілька case в одну дію (<code>case 'a': case 'A':</code>). Це потужно, але часто дає баги, тому сучасні мови (Java з <code>-&gt;</code>, Go) від цього відмовилися.</p>`,
        `<p>Почему в switch нужен break? Так задумано ещё в языке C: «проваливание» позволяет объединить несколько case в одно действие (<code>case 'a': case 'A':</code>). Это мощно, но часто даёт баги, поэтому современные языки (Java с <code>-&gt;</code>, Go) от этого отказались.</p>`,
        `<p>Why does switch need break? It dates back to C: fall-through lets several cases share one action (<code>case 'a': case 'A':</code>). Powerful, but bug-prone, so modern languages (Java with <code>-&gt;</code>, Go) dropped it.</p>`),
      mistakes: L(`<ul><li><code>if (x = 5)</code> — у C++ це <b>компілюється</b>: x стає 5, умова завжди true. Підступна помилка!</li><li><code>if (0 &lt; x &lt; 10)</code> — працює не так, як у математиці. Пиши <code>0 &lt; x &amp;&amp; x &lt; 10</code>.</li></ul>`,
        `<ul><li><code>if (x = 5)</code> — в C++ это <b>компилируется</b>: x становится 5, условие всегда true. Коварная ошибка!</li><li><code>if (0 &lt; x &lt; 10)</code> — работает не так, как в математике. Пиши <code>0 &lt; x &amp;&amp; x &lt; 10</code>.</li></ul>`,
        `<ul><li><code>if (x = 5)</code> <b>compiles</b> in C++: x becomes 5 and the condition is always true. A sneaky bug!</li><li><code>if (0 &lt; x &lt; 10)</code> doesn’t work like maths. Write <code>0 &lt; x &amp;&amp; x &lt; 10</code>.</li></ul>`),
      examples: [
        { title: 'if / else', code: M('int hp = 25;\nif (hp <= 0) {\n  cout << "Game over\\n";\n} else if (hp < 30) {\n  cout << "Low HP!\\n";\n} else {\n  cout << "OK\\n";\n}'), note: L('Перша правдива гілка.', 'Первая истинная ветка.', 'The first true branch.') },
        { title: 'switch', code: M('char keys[] = {\'w\', \'d\', \'q\'};\nfor (char key : keys) {\n  switch (key) {\n    case \'w\': cout << "up\\n"; break;\n    case \'s\': cout << "down\\n"; break;\n    case \'a\': case \'d\': cout << "side\\n"; break;\n    default: cout << "unknown\\n";\n  }\n}'), note: L('Два case на одну дію.', 'Два case на одно действие.', 'Two cases share an action.') },
        { title: L('Тернарний', 'Тернарный', 'Ternary'), code: M('int coins = 7;\ncout << (coins == 1 ? "coin" : "coins") << "\\n";\nint a = 4, b = 9;\ncout << "Max: " << (a > b ? a : b) << "\\n";'), note: L('Короткий вибір значення.', 'Короткий выбор значения.', 'A short value choice.') }
      ],
      task: {
        text: L('Визнач тип року для <code>2024, 1900, 2000, 2023</code>: високосний, якщо ділиться на 4, але не на 100, <b>або</b> ділиться на 400. Для кожного виведи <code>2024: leap</code> або <code>2023: common</code>.', 'Определи тип года для <code>2024, 1900, 2000, 2023</code>: високосный, если делится на 4, но не на 100, <b>или</b> делится на 400. Для каждого выведи <code>2024: leap</code> или <code>2023: common</code>.', 'Classify the years <code>2024, 1900, 2000, 2023</code>: a leap year is divisible by 4 but not by 100, <b>or</b> divisible by 400. Print <code>2024: leap</code> or <code>2023: common</code> for each.'),
        how: [L('<code>bool leap = (y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0;</code>', '<code>bool leap = (y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0;</code>', '<code>bool leap = (y % 4 == 0 &amp;&amp; y % 100 != 0) || y % 400 == 0;</code>'), L('Цикл <code>for (int y : {2024, 1900, 2000, 2023})</code>.', 'Цикл <code>for (int y : {2024, 1900, 2000, 2023})</code>.', 'Loop <code>for (int y : {2024, 1900, 2000, 2023})</code>.')],
        starter: M('for (int y : {2024, 1900, 2000, 2023}) {\n  \n}'),
        solution: M('for (int y : {2024, 1900, 2000, 2023}) {\n  bool leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;\n  cout << y << ": " << (leap ? "leap" : "common") << "\\n";\n}'),
        hint: L('1900 — не високосний, 2000 — високосний.', '1900 — не високосный, 2000 — високосный.', '1900 isn’t a leap year; 2000 is.'),
        expected: '2024: leap\n1900: common\n2000: leap\n2023: common',
        must: /%\s*400/
      },
      quiz: { q: L('Що станеться без <code>break</code> у case?', 'Что будет без <code>break</code> в case?', 'What happens without <code>break</code> in a case?'), options: [L('помилка компіляції', 'ошибка компиляции', 'a compile error'), L('виконаються й наступні case', 'выполнятся и следующие case', 'the following cases run too'), L('нічого', 'ничего', 'nothing')], answer: 1, explain: L('«Провалювання».', '«Проваливание».', 'Fall-through.') },
      ref: [{ code: 'if (c) { } else if (d) { } else { }', d: L('розгалуження', 'ветвление', 'branching') }, { code: 'switch (x) { case 1: …; break; default: … }', d: 'switch' }]
    },
    {
      id: 'loops', chapter: CH2,
      title: L('Цикли', 'Циклы', 'Loops'),
      theory: L(
        `<p>Три цикли C++:</p>
<pre class="inline-code">for (int i = 0; i &lt; 5; i++) { … }    // лічильник
while (lives &gt; 0) { … }               // поки умова
do { … } while (choice != 0);         // хоча б раз</pre>
<p><b>Range-for</b> — пройти всі елементи: <code>for (int x : {3, 1, 4}) { … }</code> або <code>for (auto&amp; item : items)</code>.</p>
<p><code>break</code> — вийти, <code>continue</code> — наступна ітерація.</p>
<p>Вкладені цикли малюють фігури й таблиці. Рядок з повторами: <code>string(5, '*')</code> → <code>*****</code>.</p>`,
        `<p>Три цикла C++:</p>
<pre class="inline-code">for (int i = 0; i &lt; 5; i++) { … }    // счётчик
while (lives &gt; 0) { … }               // пока условие
do { … } while (choice != 0);         // хотя бы раз</pre>
<p><b>Range-for</b> — пройти все элементы: <code>for (int x : {3, 1, 4}) { … }</code> или <code>for (auto&amp; item : items)</code>.</p>
<p><code>break</code> — выйти, <code>continue</code> — следующая итерация.</p>
<p>Вложенные циклы рисуют фигуры и таблицы. Строка с повторами: <code>string(5, '*')</code> → <code>*****</code>.</p>`,
        `<p>C++ has three loops:</p>
<pre class="inline-code">for (int i = 0; i &lt; 5; i++) { … }    // counter
while (lives &gt; 0) { … }               // while a condition holds
do { … } while (choice != 0);         // at least once</pre>
<p><b>Range-for</b> visits every element: <code>for (int x : {3, 1, 4}) { … }</code> or <code>for (auto&amp; item : items)</code>.</p>
<p><code>break</code> exits, <code>continue</code> skips to the next iteration.</p>
<p>Nested loops draw shapes and tables. A repeated string: <code>string(5, '*')</code> → <code>*****</code>.</p>`),
      why: L(`<p>У C++ цикли — основа швидкості: компілятор оптимізує прості цикли так, що мільярд операцій виконується за частки секунди. Тому олімпіадні задачі на «перебір» розв’язують саме на C++.</p>`,
        `<p>В C++ циклы — основа скорости: компилятор оптимизирует простые циклы так, что миллиард операций выполняется за доли секунды. Поэтому олимпиадные задачи на «перебор» решают именно на C++.</p>`,
        `<p>Loops are where C++ speed shines: the compiler optimises simple loops so a billion operations run in a fraction of a second. That’s why brute-force contest problems are solved in C++.</p>`),
      mistakes: L(`<ul><li><code>for (int i = 0; i &lt;= n; i++)</code> замість <code>&lt; n</code> — зайвий крок.</li><li><code>for (auto item : items)</code> копіює кожен елемент; щоб змінювати оригінал — <code>auto&amp;</code>.</li></ul>`,
        `<ul><li><code>for (int i = 0; i &lt;= n; i++)</code> вместо <code>&lt; n</code> — лишний шаг.</li><li><code>for (auto item : items)</code> копирует каждый элемент; чтобы менять оригинал — <code>auto&amp;</code>.</li></ul>`,
        `<ul><li><code>for (int i = 0; i &lt;= n; i++)</code> instead of <code>&lt; n</code> — one step too many.</li><li><code>for (auto item : items)</code> copies each element; use <code>auto&amp;</code> to modify the original.</li></ul>`),
      examples: [
        { title: 'for', code: M('for (int i = 1; i <= 5; i++) cout << i * i << " ";\ncout << "\\n";\nfor (int i = 10; i >= 0; i -= 5) cout << i << " ";\ncout << "\\n";'), note: L('Квадрати й зворотний відлік.', 'Квадраты и обратный отсчёт.', 'Squares and a countdown.') },
        { title: 'while', code: M('int n = 1234, digits = 0, sum = 0;\nwhile (n > 0) {\n  sum += n % 10;\n  n /= 10;\n  digits++;\n}\ncout << digits << " digits, sum " << sum << "\\n";'), note: L('Розбір числа на цифри.', 'Разбор числа на цифры.', 'Splitting a number into digits.') },
        { title: L('Ялинка', 'Ёлочка', 'Tree'), code: M('int h = 4;\nfor (int i = 1; i <= h; i++) {\n  cout << string(h - i, \' \') << string(2 * i - 1, \'*\') << "\\n";\n}', '#include <iostream>\n#include <string>\nusing namespace std;'), note: L('string(n, c) — n однакових символів.', 'string(n, c) — n одинаковых символов.', 'string(n, c) repeats a character.') },
        { title: 'break', code: M('for (int i = 2; i < 100; i++) {\n  if (i * i > 50) {\n    cout << "First square over 50: " << i * i << "\\n";\n    break;\n  }\n}'), note: L('Вихід після першої знахідки.', 'Выход после первой находки.', 'Stop at the first match.') }
      ],
      task: {
        text: L('Виведи всі прості числа від 2 до 30 через пробіл. Число просте, якщо ділиться лише на 1 і на себе. Перевіряй дільники до <code>d * d &lt;= n</code>.', 'Выведи все простые числа от 2 до 30 через пробел. Число простое, если делится только на 1 и на себя. Проверяй делители до <code>d * d &lt;= n</code>.', 'Print all primes from 2 to 30, space-separated. A prime is divisible only by 1 and itself. Check divisors while <code>d * d &lt;= n</code>.'),
        how: [L('Зовнішній цикл по n, внутрішній — по дільниках d.', 'Внешний цикл по n, внутренний — по делителям d.', 'Outer loop over n, inner over divisors d.'), L('Прапорець <code>bool prime = true;</code>, при знайденому дільнику — false і break.', 'Флаг <code>bool prime = true;</code>, при найденном делителе — false и break.', 'A <code>bool prime = true;</code> flag; set false and break on a divisor.')],
        starter: M('for (int n = 2; n <= 30; n++) {\n  \n}\ncout << "\\n";'),
        solution: M('bool first = true;\nfor (int n = 2; n <= 30; n++) {\n  bool prime = true;\n  for (int d = 2; d * d <= n; d++) {\n    if (n % d == 0) {\n      prime = false;\n      break;\n    }\n  }\n  if (prime) {\n    if (!first) cout << " ";\n    cout << n;\n    first = false;\n  }\n}\ncout << "\\n";'),
        hint: L('2 3 5 7 11 13 17 19 23 29.', '2 3 5 7 11 13 17 19 23 29.', '2 3 5 7 11 13 17 19 23 29.'),
        expected: '2 3 5 7 11 13 17 19 23 29',
        must: /for[\s\S]*for/
      },
      quiz: { q: L('Навіщо <code>auto&amp;</code> у range-for?', 'Зачем <code>auto&amp;</code> в range-for?', 'Why <code>auto&amp;</code> in range-for?'), options: [L('щоб змінювати елементи без копіювання', 'чтобы менять элементы без копирования', 'to modify elements without copying'), L('щоб цикл був довшим', 'чтобы цикл был длиннее', 'to make the loop longer'), L('обов’язково завжди', 'обязательно всегда', 'always required')], answer: 0, explain: L('Посилання на оригінал.', 'Ссылка на оригинал.', 'A reference to the original.') },
      ref: [{ code: 'for (int i = 0; i < n; i++)', d: L('лічильник', 'счётчик', 'counter') }, { code: 'for (auto& x : v)', d: 'range-for' }, { code: 'string(n, c)', d: L('повтор символу', 'повтор символа', 'repeat a char') }]
    },
    {
      id: 'functions', chapter: CH2,
      title: L('Функції, перевантаження, рекурсія', 'Функции, перегрузка, рекурсия', 'Functions, overloading, recursion'),
      theory: L(
        `<p>Функцію оголошують <b>до</b> місця виклику (або пишуть її прототип зверху):</p>
<pre class="inline-code">int add(int a, int b) {
  return a + b;
}

void greet(string name = "friend") {   // значення за замовчуванням
  cout &lt;&lt; "Hi, " &lt;&lt; name &lt;&lt; "\\n";
}</pre>
<ul><li>Тип перед іменем — що повертає; <code>void</code> — нічого</li><li><b>Перевантаження</b>: <code>area(double r)</code> і <code>area(double w, double h)</code></li><li><b>Параметри за замовчуванням</b>: <code>greet()</code> → «Hi, friend»</li><li><b>Рекурсія</b> — функція викликає себе (обов’язково з умовою зупинки)</li></ul>
<p>Звичайні параметри передаються <b>копією</b>: зміна всередині функції не впливає на змінну ззовні. Як це змінити — у наступному кроці (посилання).</p>`,
        `<p>Функцию объявляют <b>до</b> места вызова (или пишут её прототип сверху):</p>
<pre class="inline-code">int add(int a, int b) {
  return a + b;
}

void greet(string name = "friend") {   // значение по умолчанию
  cout &lt;&lt; "Hi, " &lt;&lt; name &lt;&lt; "\\n";
}</pre>
<ul><li>Тип перед именем — что возвращает; <code>void</code> — ничего</li><li><b>Перегрузка</b>: <code>area(double r)</code> и <code>area(double w, double h)</code></li><li><b>Параметры по умолчанию</b>: <code>greet()</code> → «Hi, friend»</li><li><b>Рекурсия</b> — функция вызывает себя (обязательно с условием остановки)</li></ul>
<p>Обычные параметры передаются <b>копией</b>: изменение внутри функции не влияет на переменную снаружи. Как это изменить — в следующем шаге (ссылки).</p>`,
        `<p>Declare a function <b>before</b> it’s called (or put a prototype at the top):</p>
<pre class="inline-code">int add(int a, int b) {
  return a + b;
}

void greet(string name = "friend") {   // default value
  cout &lt;&lt; "Hi, " &lt;&lt; name &lt;&lt; "\\n";
}</pre>
<ul><li>The type before the name is what it returns; <code>void</code> returns nothing</li><li><b>Overloading</b>: <code>area(double r)</code> and <code>area(double w, double h)</code></li><li><b>Default parameters</b>: <code>greet()</code> → “Hi, friend”</li><li><b>Recursion</b> — a function calling itself (always with a base case)</li></ul>
<p>Plain parameters are passed <b>by copy</b>: changes inside don’t affect the caller’s variable. How to change that is next (references).</p>`),
      why: L(`<p>Чому функцію треба оголосити до виклику? Компілятор C++ читає файл <b>згори вниз</b> один раз — так він працює дуже швидко навіть з мільйонами рядків. Якщо він ще не бачив функцію, то не знає її параметрів і не може перевірити виклик.</p>`,
        `<p>Почему функцию нужно объявить до вызова? Компилятор C++ читает файл <b>сверху вниз</b> один раз — так он работает очень быстро даже с миллионами строк. Если он ещё не видел функцию, то не знает её параметров и не может проверить вызов.</p>`,
        `<p>Why declare before calling? The C++ compiler reads the file <b>top to bottom</b> once — that keeps it fast even for millions of lines. If it hasn’t seen the function yet, it doesn’t know the parameters and can’t check the call.</p>`),
      mistakes: L(`<ul><li>Виклик функції, оголошеної нижче, без прототипу — <code>was not declared in this scope</code>.</li><li>Функція з типом <code>int</code> без <code>return</code> — компілюється, але повертає сміття.</li></ul>`,
        `<ul><li>Вызов функции, объявленной ниже, без прототипа — <code>was not declared in this scope</code>.</li><li>Функция с типом <code>int</code> без <code>return</code> — компилируется, но возвращает мусор.</li></ul>`,
        `<ul><li>Calling a function declared further down without a prototype — <code>was not declared in this scope</code>.</li><li>An <code>int</code> function without <code>return</code> compiles but returns garbage.</li></ul>`),
      examples: [
        { title: L('Функції', 'Функции', 'Functions'), code: '#include <iostream>\nusing namespace std;\n\nint add(int a, int b) { return a + b; }\nbool isEven(int n) { return n % 2 == 0; }\n\nint main() {\n  cout << add(2, 3) << "\\n";\n  cout << boolalpha << isEven(4) << " " << isEven(7) << "\\n";\n  return 0;\n}', note: L('Оголошення до main.', 'Объявление до main.', 'Declared before main.') },
        { title: L('За замовчуванням', 'По умолчанию', 'Defaults'), code: '#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid greet(string name = "friend", int times = 1) {\n  for (int i = 0; i < times; i++) cout << "Hi, " << name << "!\\n";\n}\n\nint main() {\n  greet();\n  greet("Ira");\n  greet("Max", 2);\n  return 0;\n}', note: L('Пропущені аргументи беруться за замовчуванням.', 'Пропущенные аргументы берутся по умолчанию.', 'Omitted arguments use defaults.') },
        { title: L('Перевантаження', 'Перегрузка', 'Overloading'), code: '#include <iostream>\nusing namespace std;\n\ndouble area(double r) { return 3.14159 * r * r; }\ndouble area(double w, double h) { return w * h; }\n\nint main() {\n  cout << area(1.0) << "\\n";\n  cout << area(3.0, 4.0) << "\\n";\n  return 0;\n}', note: L('Одне ім’я — різні параметри.', 'Одно имя — разные параметры.', 'One name, different parameters.') },
        { title: L('Рекурсія', 'Рекурсия', 'Recursion'), code: '#include <iostream>\nusing namespace std;\n\nlong long fib(int n) {\n  if (n < 2) return n;\n  return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n  for (int i = 0; i < 10; i++) cout << fib(i) << " ";\n  cout << "\\n";\n  return 0;\n}', note: L('Числа Фібоначчі.', 'Числа Фибоначчи.', 'Fibonacci numbers.') }
      ],
      task: {
        text: L('Напиши функцію <code>int gcd(int a, int b)</code> — найбільший спільний дільник за алгоритмом Евкліда (рекурсивно: якщо <code>b == 0</code>, повернути <code>a</code>, інакше <code>gcd(b, a % b)</code>). І функцію <code>int lcm(int a, int b)</code> = <code>a / gcd(a, b) * b</code>. Виведи <code>gcd(48, 18) = 6</code> і <code>lcm(4, 6) = 12</code>.', 'Напиши функцию <code>int gcd(int a, int b)</code> — наибольший общий делитель по алгоритму Евклида (рекурсивно: если <code>b == 0</code>, вернуть <code>a</code>, иначе <code>gcd(b, a % b)</code>). И функцию <code>int lcm(int a, int b)</code> = <code>a / gcd(a, b) * b</code>. Выведи <code>gcd(48, 18) = 6</code> и <code>lcm(4, 6) = 12</code>.', 'Write <code>int gcd(int a, int b)</code> — the greatest common divisor via Euclid’s algorithm (recursively: if <code>b == 0</code> return <code>a</code>, else <code>gcd(b, a % b)</code>). And <code>int lcm(int a, int b)</code> = <code>a / gcd(a, b) * b</code>. Print <code>gcd(48, 18) = 6</code> and <code>lcm(4, 6) = 12</code>.'),
        how: [L('Обидві функції — над <code>main</code>, <code>gcd</code> — перед <code>lcm</code>.', 'Обе функции — над <code>main</code>, <code>gcd</code> — перед <code>lcm</code>.', 'Both above <code>main</code>, <code>gcd</code> before <code>lcm</code>.')],
        starter: '#include <iostream>\nusing namespace std;\n\n// gcd і lcm\n\nint main() {\n  return 0;\n}',
        solution: '#include <iostream>\nusing namespace std;\n\nint gcd(int a, int b) {\n  if (b == 0) return a;\n  return gcd(b, a % b);\n}\n\nint lcm(int a, int b) {\n  return a / gcd(a, b) * b;\n}\n\nint main() {\n  cout << "gcd(48, 18) = " << gcd(48, 18) << "\\n";\n  cout << "lcm(4, 6) = " << lcm(4, 6) << "\\n";\n  return 0;\n}',
        hint: L('gcd(48,18) → gcd(18,12) → gcd(12,6) → gcd(6,0) = 6.', 'gcd(48,18) → gcd(18,12) → gcd(12,6) → gcd(6,0) = 6.', 'gcd(48,18) → gcd(18,12) → gcd(12,6) → gcd(6,0) = 6.'),
        expected: 'gcd(48, 18) = 6\nlcm(4, 6) = 12',
        must: /int\s+gcd[\s\S]*return\s+gcd\s*\(/
      },
      quiz: { q: L('Як передаються звичайні параметри?', 'Как передаются обычные параметры?', 'How are plain parameters passed?'), options: [L('копією', 'копией', 'by copy'), L('посиланням', 'по ссылке', 'by reference'), L('глобально', 'глобально', 'globally')], answer: 0, explain: L('Зміни не виходять за межі функції.', 'Изменения не выходят за пределы функции.', 'Changes stay inside the function.') },
      ref: [{ code: 'int f(int a, int b = 0) { return …; }', d: L('функція', 'функция', 'function') }, { code: 'void g();', d: L('прототип', 'прототип', 'prototype') }]
    },
    {
      id: 'vectors', chapter: CH3,
      title: L('vector і алгоритми', 'vector и алгоритмы', 'vector and algorithms'),
      theory: L(
        `<p><code>vector</code> — динамічний масив зі стандартної бібліотеки (STL). Він сам росте й знає свій розмір:</p>
<pre class="inline-code">#include &lt;vector&gt;
vector&lt;int&gt; v = {5, 2, 8};
v.push_back(10);      // додати в кінець
v.size();             // 4
v[0];                 // 5
v.pop_back();         // прибрати останній
v.empty();            // чи порожній</pre>
<p>Бібліотека <code>&lt;algorithm&gt;</code> містить готові алгоритми:</p>
<ul><li><code>sort(v.begin(), v.end())</code> — сортування; <code>sort(…, greater&lt;int&gt;())</code> — за спаданням</li><li><code>reverse</code>, <code>find</code>, <code>count</code>, <code>*max_element</code>, <code>*min_element</code></li><li><code>accumulate(v.begin(), v.end(), 0)</code> із <code>&lt;numeric&gt;</code> — сума</li></ul>
<p><code>v.begin()</code> і <code>v.end()</code> — <b>ітератори</b>, «вказівники» на початок і місце після кінця.</p>`,
        `<p><code>vector</code> — динамический массив из стандартной библиотеки (STL). Он сам растёт и знает свой размер:</p>
<pre class="inline-code">#include &lt;vector&gt;
vector&lt;int&gt; v = {5, 2, 8};
v.push_back(10);      // добавить в конец
v.size();             // 4
v[0];                 // 5
v.pop_back();         // убрать последний
v.empty();            // пуст ли</pre>
<p>Библиотека <code>&lt;algorithm&gt;</code> содержит готовые алгоритмы:</p>
<ul><li><code>sort(v.begin(), v.end())</code> — сортировка; <code>sort(…, greater&lt;int&gt;())</code> — по убыванию</li><li><code>reverse</code>, <code>find</code>, <code>count</code>, <code>*max_element</code>, <code>*min_element</code></li><li><code>accumulate(v.begin(), v.end(), 0)</code> из <code>&lt;numeric&gt;</code> — сумма</li></ul>
<p><code>v.begin()</code> и <code>v.end()</code> — <b>итераторы</b>, «указатели» на начало и место после конца.</p>`,
        `<p><code>vector</code> is the standard library’s (STL) dynamic array. It grows by itself and knows its size:</p>
<pre class="inline-code">#include &lt;vector&gt;
vector&lt;int&gt; v = {5, 2, 8};
v.push_back(10);      // append
v.size();             // 4
v[0];                 // 5
v.pop_back();         // remove the last
v.empty();            // is it empty</pre>
<p><code>&lt;algorithm&gt;</code> has ready-made algorithms:</p>
<ul><li><code>sort(v.begin(), v.end())</code>; <code>sort(…, greater&lt;int&gt;())</code> for descending</li><li><code>reverse</code>, <code>find</code>, <code>count</code>, <code>*max_element</code>, <code>*min_element</code></li><li><code>accumulate(v.begin(), v.end(), 0)</code> from <code>&lt;numeric&gt;</code> — the sum</li></ul>
<p><code>v.begin()</code> and <code>v.end()</code> are <b>iterators</b> — “pointers” to the start and one past the end.</p>`),
      why: L(`<p>Чому не писати сортування самому? Стандартний <code>sort</code> — результат десятиліть оптимізацій: він швидший і надійніший за будь-яке «домашнє» сортування. Професіонали спершу шукають готовий алгоритм у STL і лише потім пишуть свій.</p>`,
        `<p>Почему не писать сортировку самому? Стандартный <code>sort</code> — результат десятилетий оптимизаций: он быстрее и надёжнее любой «домашней» сортировки. Профессионалы сначала ищут готовый алгоритм в STL и только потом пишут свой.</p>`,
        `<p>Why not write your own sort? The standard <code>sort</code> is decades of optimisation: faster and more reliable than any homemade one. Professionals look for an STL algorithm first and write their own only if needed.</p>`),
      mistakes: L(`<ul><li><code>v[10]</code> для вектора з 4 елементів — невизначена поведінка (може «працювати» і псувати пам’ять). Безпечніше <code>v.at(10)</code> — кине виняток.</li><li><code>for (int i = 0; i &lt; v.size() - 1; i++)</code> для порожнього вектора: <code>size()</code> беззнаковий, і <code>0 - 1</code> стає величезним числом.</li></ul>`,
        `<ul><li><code>v[10]</code> для вектора из 4 элементов — неопределённое поведение (может «работать» и портить память). Безопаснее <code>v.at(10)</code> — бросит исключение.</li><li><code>for (int i = 0; i &lt; v.size() - 1; i++)</code> для пустого вектора: <code>size()</code> беззнаковый, и <code>0 - 1</code> становится огромным числом.</li></ul>`,
        `<ul><li><code>v[10]</code> on a 4-element vector is undefined behaviour (it may “work” and corrupt memory). Safer: <code>v.at(10)</code> throws.</li><li><code>for (int i = 0; i &lt; v.size() - 1; i++)</code> on an empty vector: <code>size()</code> is unsigned, so <code>0 - 1</code> becomes huge.</li></ul>`),
      examples: [
        { title: 'push_back', code: M('vector<string> team;\nteam.push_back("Ira");\nteam.push_back("Max");\nteam.push_back("Alex");\nteam.pop_back();\ncout << team.size() << " players: ";\nfor (const auto& p : team) cout << p << " ";\ncout << "\\n";', '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;'), note: L('const auto& — читати без копій.', 'const auto& — читать без копий.', 'const auto& reads without copies.') },
        { title: 'sort', code: M('vector<int> v = {5, 2, 9, 1, 7};\nsort(v.begin(), v.end());\nfor (int x : v) cout << x << " ";\ncout << "\\n";\nsort(v.begin(), v.end(), greater<int>());\nfor (int x : v) cout << x << " ";\ncout << "\\n";', '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;'), note: L('Зростання і спадання.', 'Возрастание и убывание.', 'Ascending and descending.') },
        { title: L('max, сума, count', 'max, сумма, count', 'max, sum, count'), code: M('vector<int> v = {4, 8, 15, 16, 23, 42, 8};\ncout << "max " << *max_element(v.begin(), v.end()) << "\\n";\ncout << "sum " << accumulate(v.begin(), v.end(), 0) << "\\n";\ncout << "eights " << count(v.begin(), v.end(), 8) << "\\n";', '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;'), note: L('Готові алгоритми замість циклів.', 'Готовые алгоритмы вместо циклов.', 'Ready algorithms instead of loops.') },
        { title: L('2D-вектор', '2D-вектор', '2D vector'), code: M('vector<vector<int>> grid(3, vector<int>(4, 0));\ngrid[1][2] = 7;\nfor (const auto& row : grid) {\n  for (int x : row) cout << x << " ";\n  cout << "\\n";\n}', '#include <iostream>\n#include <vector>\nusing namespace std;'), note: L('Поле 3×4 для гри.', 'Поле 3×4 для игры.', 'A 3×4 game grid.') }
      ],
      task: {
        text: L('Таблиця рекордів: <code>vector&lt;int&gt; scores = {320, 150, 990, 470, 150, 800}</code>. Відсортуй за спаданням і виведи топ-3 через пробіл (<code>990 800 470</code>), потім суму всіх очок (<code>Sum: 2880</code>) і скільки разів трапляється 150 (<code>150 x2</code>).', 'Таблица рекордов: <code>vector&lt;int&gt; scores = {320, 150, 990, 470, 150, 800}</code>. Отсортируй по убыванию и выведи топ-3 через пробел (<code>990 800 470</code>), затем сумму всех очков (<code>Sum: 2880</code>) и сколько раз встречается 150 (<code>150 x2</code>).', 'A high-score table: <code>vector&lt;int&gt; scores = {320, 150, 990, 470, 150, 800}</code>. Sort descending and print the top 3 space-separated (<code>990 800 470</code>), then the sum (<code>Sum: 2880</code>) and how many times 150 appears (<code>150 x2</code>).'),
        how: [L('<code>sort(scores.begin(), scores.end(), greater&lt;int&gt;());</code>', '<code>sort(scores.begin(), scores.end(), greater&lt;int&gt;());</code>', '<code>sort(scores.begin(), scores.end(), greater&lt;int&gt;());</code>'), L('<code>accumulate</code> і <code>count</code>.', '<code>accumulate</code> и <code>count</code>.', '<code>accumulate</code> and <code>count</code>.')],
        starter: M('vector<int> scores = {320, 150, 990, 470, 150, 800};\n', '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;'),
        solution: M('vector<int> scores = {320, 150, 990, 470, 150, 800};\nsort(scores.begin(), scores.end(), greater<int>());\ncout << scores[0] << " " << scores[1] << " " << scores[2] << "\\n";\ncout << "Sum: " << accumulate(scores.begin(), scores.end(), 0) << "\\n";\ncout << "150 x" << count(scores.begin(), scores.end(), 150) << "\\n";', '#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <numeric>\nusing namespace std;'),
        hint: L('Сума: 320+150+990+470+150+800 = 2880.', 'Сумма: 320+150+990+470+150+800 = 2880.', 'Sum: 320+150+990+470+150+800 = 2880.'),
        expected: '990 800 470\nSum: 2880\n150 x2',
        must: /sort\s*\(/
      },
      quiz: { q: L('Як додати елемент у кінець vector?', 'Как добавить элемент в конец vector?', 'How do you append to a vector?'), options: ['v.add(x)', 'v.push_back(x)', 'v.append(x)'], answer: 1, explain: L('push_back.', 'push_back.', 'push_back.') },
      ref: [{ code: 'vector<T> v; v.push_back(x); v.size()', d: 'vector' }, { code: 'sort(v.begin(), v.end())', d: L('сортування', 'сортировка', 'sort') }, { code: 'accumulate count max_element', d: L('алгоритми', 'алгоритмы', 'algorithms') }]
    },
    {
      id: 'strings-maps', chapter: CH3,
      title: L('string і map', 'string и map', 'string and map'),
      theory: L(
        `<p><b>string</b> у C++ — повноцінний рядок:</p>
<ul><li><code>s.size()</code>, <code>s[i]</code>, <code>s + t</code>, <code>s += "!"</code></li><li><code>s.substr(pos, len)</code>, <code>s.find("ab")</code> (повертає <code>string::npos</code>, якщо не знайдено)</li><li><code>to_string(42)</code> — число в рядок, <code>stoi("42")</code> — рядок у число</li><li><code>toupper(c)</code> / <code>tolower(c)</code> з <code>&lt;cctype&gt;</code> — для символів</li></ul>
<p><b>map</b> — словник, <b>завжди відсортований за ключем</b>:</p>
<pre class="inline-code">#include &lt;map&gt;
map&lt;string, int&gt; age;
age["Ira"] = 14;
age["Max"]++;            // відсутній ключ створюється зі значенням 0
age.count("Ira");        // 1 — є, 0 — немає
for (auto&amp; [name, a] : age) cout &lt;&lt; name &lt;&lt; " " &lt;&lt; a;</pre>
<p><code>unordered_map</code> — те саме без сортування, але швидше. <code>set</code> — множина унікальних значень.</p>`,
        `<p><b>string</b> в C++ — полноценная строка:</p>
<ul><li><code>s.size()</code>, <code>s[i]</code>, <code>s + t</code>, <code>s += "!"</code></li><li><code>s.substr(pos, len)</code>, <code>s.find("ab")</code> (возвращает <code>string::npos</code>, если не найдено)</li><li><code>to_string(42)</code> — число в строку, <code>stoi("42")</code> — строку в число</li><li><code>toupper(c)</code> / <code>tolower(c)</code> из <code>&lt;cctype&gt;</code> — для символов</li></ul>
<p><b>map</b> — словарь, <b>всегда отсортированный по ключу</b>:</p>
<pre class="inline-code">#include &lt;map&gt;
map&lt;string, int&gt; age;
age["Ira"] = 14;
age["Max"]++;            // отсутствующий ключ создаётся со значением 0
age.count("Ira");        // 1 — есть, 0 — нет
for (auto&amp; [name, a] : age) cout &lt;&lt; name &lt;&lt; " " &lt;&lt; a;</pre>
<p><code>unordered_map</code> — то же без сортировки, но быстрее. <code>set</code> — множество уникальных значений.</p>`,
        `<p>A C++ <b>string</b> is a full-featured string:</p>
<ul><li><code>s.size()</code>, <code>s[i]</code>, <code>s + t</code>, <code>s += "!"</code></li><li><code>s.substr(pos, len)</code>, <code>s.find("ab")</code> (returns <code>string::npos</code> if not found)</li><li><code>to_string(42)</code> number → string, <code>stoi("42")</code> string → number</li><li><code>toupper(c)</code> / <code>tolower(c)</code> from <code>&lt;cctype&gt;</code> for characters</li></ul>
<p><b>map</b> is a dictionary <b>always sorted by key</b>:</p>
<pre class="inline-code">#include &lt;map&gt;
map&lt;string, int&gt; age;
age["Ira"] = 14;
age["Max"]++;            // a missing key is created with value 0
age.count("Ira");        // 1 present, 0 absent
for (auto&amp; [name, a] : age) cout &lt;&lt; name &lt;&lt; " " &lt;&lt; a;</pre>
<p><code>unordered_map</code> is the same without sorting but faster. <code>set</code> holds unique values.</p>`),
      why: L(`<p>Те, що <code>age["Max"]++</code> автоматично створює ключ із нулем, робить лічильники однорядковими: «порахуй кожне слово» — це просто <code>count[word]++</code>. Але будь уважним: навіть <i>читання</i> <code>m["x"]</code> створює ключ. Для перевірки використовуй <code>count</code> або <code>find</code>.</p>`,
        `<p>То, что <code>age["Max"]++</code> автоматически создаёт ключ с нулём, делает счётчики однострочными: «посчитай каждое слово» — это просто <code>count[word]++</code>. Но будь внимателен: даже <i>чтение</i> <code>m["x"]</code> создаёт ключ. Для проверки используй <code>count</code> или <code>find</code>.</p>`,
        `<p>Because <code>age["Max"]++</code> auto-creates the key with zero, counters are one-liners: “count every word” is just <code>count[word]++</code>. But careful: even <i>reading</i> <code>m["x"]</code> creates the key. Use <code>count</code> or <code>find</code> to check.</p>`),
      mistakes: L(`<ul><li><code>if (s.find("x") &gt; 0)</code> — неправильно; порівнюй з <code>string::npos</code>.</li><li><code>"a" + "b"</code> — помилка: це два C-рядки. Хоча б один має бути <code>string</code>: <code>string("a") + "b"</code>.</li></ul>`,
        `<ul><li><code>if (s.find("x") &gt; 0)</code> — неправильно; сравнивай с <code>string::npos</code>.</li><li><code>"a" + "b"</code> — ошибка: это две C-строки. Хотя бы одна должна быть <code>string</code>: <code>string("a") + "b"</code>.</li></ul>`,
        `<ul><li><code>if (s.find("x") &gt; 0)</code> is wrong; compare with <code>string::npos</code>.</li><li><code>"a" + "b"</code> is an error: they’re two C strings. At least one must be a <code>string</code>: <code>string("a") + "b"</code>.</li></ul>`),
      examples: [
        { title: 'string', code: M('string s = "Hello, World";\ncout << s.size() << "\\n";\ncout << s.substr(7) << "\\n";\ncout << (s.find("World") != string::npos) << "\\n";\nstring n = to_string(2026) + "!";\ncout << n << " " << stoi("41") + 1 << "\\n";', '#include <iostream>\n#include <string>\nusing namespace std;'), note: L('find повертає позицію або npos.', 'find возвращает позицию или npos.', 'find returns a position or npos.') },
        { title: L('Регістр', 'Регистр', 'Case'), code: M('string word = "Codry";\nfor (char& c : word) c = toupper(c);\ncout << word << "\\n";\nint vowels = 0;\nfor (char c : string("programming")) if (string("aeiou").find(c) != string::npos) vowels++;\ncout << vowels << " vowels\\n";', '#include <iostream>\n#include <string>\n#include <cctype>\nusing namespace std;'), note: L('char& — змінюємо символи рядка.', 'char& — меняем символы строки.', 'char& modifies the string’s characters.') },
        { title: 'map', code: M('map<string, int> count;\nstring words[] = {"red", "blue", "red", "green", "red"};\nfor (const auto& w : words) count[w]++;\nfor (const auto& [w, n] : count) cout << w << ": " << n << "\\n";', '#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;'), note: L('Ключі виводяться за алфавітом.', 'Ключи выводятся по алфавиту.', 'Keys print alphabetically.') },
        { title: 'set', code: M('set<int> seen = {5, 1, 5, 3, 1, 9};\ncout << seen.size() << " unique: ";\nfor (int x : seen) cout << x << " ";\ncout << "\\n" << seen.count(3) << " " << seen.count(4) << "\\n";', '#include <iostream>\n#include <set>\nusing namespace std;'), note: L('Без повторів і відсортовано.', 'Без повторов и отсортировано.', 'No duplicates, sorted.') }
      ],
      task: {
        text: L('Порахуй частоту кожної літери в слові <code>"banana"</code> через <code>map&lt;char, int&gt;</code> і виведи <code>a: 3</code>, <code>b: 1</code>, <code>n: 2</code> (за алфавітом). Потім виведи слово задом наперед: <code>ananab</code>.', 'Посчитай частоту каждой буквы в слове <code>"banana"</code> через <code>map&lt;char, int&gt;</code> и выведи <code>a: 3</code>, <code>b: 1</code>, <code>n: 2</code> (по алфавиту). Затем выведи слово задом наперёд: <code>ananab</code>.', 'Count each letter of <code>"banana"</code> with a <code>map&lt;char, int&gt;</code> and print <code>a: 3</code>, <code>b: 1</code>, <code>n: 2</code> (alphabetically). Then print the word reversed: <code>ananab</code>.'),
        how: [L('<code>for (char c : word) freq[c]++;</code>', '<code>for (char c : word) freq[c]++;</code>', '<code>for (char c : word) freq[c]++;</code>'), L('Розворот: <code>string rev(word.rbegin(), word.rend());</code> або <code>reverse</code>.', 'Разворот: <code>string rev(word.rbegin(), word.rend());</code> или <code>reverse</code>.', 'Reverse: <code>string rev(word.rbegin(), word.rend());</code> or <code>reverse</code>.')],
        starter: M('string word = "banana";\n', '#include <iostream>\n#include <map>\n#include <string>\n#include <algorithm>\nusing namespace std;'),
        solution: M('string word = "banana";\nmap<char, int> freq;\nfor (char c : word) freq[c]++;\nfor (const auto& [c, n] : freq) cout << c << ": " << n << "\\n";\nstring rev = word;\nreverse(rev.begin(), rev.end());\ncout << rev << "\\n";', '#include <iostream>\n#include <map>\n#include <string>\n#include <algorithm>\nusing namespace std;'),
        hint: L('map сам сортує ключі.', 'map сам сортирует ключи.', 'map sorts keys itself.'),
        expected: 'a: 3\nb: 1\nn: 2\nananab',
        must: /map\s*<\s*char/
      },
      quiz: { q: L('Що зробить <code>m["new"]++</code> для відсутнього ключа?', 'Что сделает <code>m["new"]++</code> для отсутствующего ключа?', 'What does <code>m["new"]++</code> do for a missing key?'), options: [L('помилку', 'ошибку', 'an error'), L('створить ключ зі значенням 1', 'создаст ключ со значением 1', 'creates the key with value 1'), L('нічого', 'ничего', 'nothing')], answer: 1, explain: L('0 + 1.', '0 + 1.', '0 + 1.') },
      ref: [{ code: 's.substr s.find to_string stoi', d: 'string' }, { code: 'map<K,V> m; m[k]++; m.count(k)', d: 'map' }, { code: 'set<T>', d: L('унікальні значення', 'уникальные значения', 'unique values') }]
    },
    {
      id: 'references', chapter: CH3,
      title: L('Посилання та вказівники', 'Ссылки и указатели', 'References and pointers'),
      theory: L(
        `<p>Це те, що відрізняє C++ від більшості мов: ти можеш працювати з <b>адресами пам’яті</b>.</p>
<p><b>Посилання</b> (<code>&amp;</code>) — друге ім’я для тієї самої змінної:</p>
<pre class="inline-code">void heal(int&amp; hp) { hp += 20; }   // змінює оригінал
int hp = 50;
heal(hp);   // hp == 70</pre>
<p><b>Вказівник</b> (<code>*</code>) — змінна, що зберігає <b>адресу</b> іншої змінної:</p>
<pre class="inline-code">int x = 10;
int* p = &amp;x;    // &amp;x — адреса x
*p = 25;        // *p — значення за адресою, x == 25</pre>
<ul><li><code>const T&amp;</code> — передати великий об’єкт без копіювання й без права змінювати (ідеально для <code>string</code>, <code>vector</code>)</li><li><code>nullptr</code> — «вказівник у нікуди»</li><li>У сучасному C++ замість <code>new/delete</code> використовують <code>vector</code> і «розумні» вказівники <code>unique_ptr</code></li></ul>`,
        `<p>Это то, что отличает C++ от большинства языков: ты можешь работать с <b>адресами памяти</b>.</p>
<p><b>Ссылка</b> (<code>&amp;</code>) — второе имя для той же переменной:</p>
<pre class="inline-code">void heal(int&amp; hp) { hp += 20; }   // меняет оригинал
int hp = 50;
heal(hp);   // hp == 70</pre>
<p><b>Указатель</b> (<code>*</code>) — переменная, хранящая <b>адрес</b> другой переменной:</p>
<pre class="inline-code">int x = 10;
int* p = &amp;x;    // &amp;x — адрес x
*p = 25;        // *p — значение по адресу, x == 25</pre>
<ul><li><code>const T&amp;</code> — передать большой объект без копирования и без права менять (идеально для <code>string</code>, <code>vector</code>)</li><li><code>nullptr</code> — «указатель в никуда»</li><li>В современном C++ вместо <code>new/delete</code> используют <code>vector</code> и «умные» указатели <code>unique_ptr</code></li></ul>`,
        `<p>This is what sets C++ apart from most languages: you can work with <b>memory addresses</b>.</p>
<p>A <b>reference</b> (<code>&amp;</code>) is a second name for the same variable:</p>
<pre class="inline-code">void heal(int&amp; hp) { hp += 20; }   // changes the original
int hp = 50;
heal(hp);   // hp == 70</pre>
<p>A <b>pointer</b> (<code>*</code>) stores the <b>address</b> of another variable:</p>
<pre class="inline-code">int x = 10;
int* p = &amp;x;    // &amp;x is x’s address
*p = 25;        // *p is the value at the address; x == 25</pre>
<ul><li><code>const T&amp;</code> passes a big object with no copy and no permission to change it (ideal for <code>string</code>, <code>vector</code>)</li><li><code>nullptr</code> is a pointer to nothing</li><li>Modern C++ prefers <code>vector</code> and smart pointers like <code>unique_ptr</code> over <code>new/delete</code></li></ul>`),
      why: L(`<p>Навіщо посилання? Копіювання вектора з мільйоном елементів у кожну функцію — величезна витрата. <code>const vector&lt;int&gt;&amp;</code> передає лише «адресу» — миттєво. А вказівники лежать в основі всього: рушії ігор, структури даних (дерева, графи), робота із залізом.</p>`,
        `<p>Зачем ссылки? Копирование вектора с миллионом элементов в каждую функцию — огромная трата. <code>const vector&lt;int&gt;&amp;</code> передаёт только «адрес» — мгновенно. А указатели лежат в основе всего: игровые движки, структуры данных (деревья, графы), работа с железом.</p>`,
        `<p>Why references? Copying a million-element vector into every function is a huge waste; <code>const vector&lt;int&gt;&amp;</code> passes only an “address” — instantly. Pointers underpin everything: game engines, data structures (trees, graphs), hardware access.</p>`),
      mistakes: L(`<ul><li>Розіменування <code>nullptr</code> — програма аварійно завершиться (segmentation fault).</li><li>Повертати посилання на локальну змінну функції — після виходу вона знищена.</li><li><code>new</code> без <code>delete</code> — витік пам’яті. Краще <code>vector</code> або <code>unique_ptr</code>.</li></ul>`,
        `<ul><li>Разыменование <code>nullptr</code> — программа аварийно завершится (segmentation fault).</li><li>Возвращать ссылку на локальную переменную функции — после выхода она уничтожена.</li><li><code>new</code> без <code>delete</code> — утечка памяти. Лучше <code>vector</code> или <code>unique_ptr</code>.</li></ul>`,
        `<ul><li>Dereferencing <code>nullptr</code> crashes the program (segmentation fault).</li><li>Returning a reference to a local variable — it’s destroyed when the function returns.</li><li><code>new</code> without <code>delete</code> leaks memory. Prefer <code>vector</code> or <code>unique_ptr</code>.</li></ul>`),
      examples: [
        { title: L('Копія vs посилання', 'Копия vs ссылка', 'Copy vs reference'), code: '#include <iostream>\nusing namespace std;\n\nvoid healCopy(int hp) { hp += 20; }\nvoid healRef(int& hp) { hp += 20; }\n\nint main() {\n  int hp = 50;\n  healCopy(hp);\n  cout << hp << "\\n";\n  healRef(hp);\n  cout << hp << "\\n";\n  return 0;\n}', note: L('Лише посилання змінює оригінал.', 'Только ссылка меняет оригинал.', 'Only the reference changes the original.') },
        { title: L('Вказівник', 'Указатель', 'Pointer'), code: M('int x = 10;\nint* p = &x;\ncout << *p << "\\n";\n*p = 25;\ncout << x << "\\n";\nint* none = nullptr;\ncout << (none == nullptr ? "null" : "set") << "\\n";'), note: L('*p — значення за адресою.', '*p — значение по адресу.', '*p is the value at the address.') },
        { title: 'swap', code: '#include <iostream>\nusing namespace std;\n\nvoid mySwap(int& a, int& b) {\n  int t = a;\n  a = b;\n  b = t;\n}\n\nint main() {\n  int x = 1, y = 2;\n  mySwap(x, y);\n  cout << x << " " << y << "\\n";\n  swap(x, y);\n  cout << x << " " << y << "\\n";\n  return 0;\n}', note: L('Обмін значень через посилання.', 'Обмен значений через ссылки.', 'Swapping values via references.') },
        { title: 'const &', code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint total(const vector<int>& v) {\n  int s = 0;\n  for (int x : v) s += x;\n  return s;\n}\n\nint main() {\n  vector<int> big(1000000, 1);\n  cout << total(big) << "\\n";\n  return 0;\n}', note: L('Мільйон елементів без копіювання.', 'Миллион элементов без копирования.', 'A million elements, no copy.') }
      ],
      task: {
        text: L('Напиши функцію <code>void applyDiscount(vector&lt;double&gt;&amp; prices, double percent)</code>, що зменшує <b>кожну</b> ціну у векторі на percent відсотків, і функцію <code>double sum(const vector&lt;double&gt;&amp; v)</code>. Для цін <code>{100, 40, 60}</code> зі знижкою 25 виведи <code>75 30 45</code> і <code>Sum: 150</code>.', 'Напиши функцию <code>void applyDiscount(vector&lt;double&gt;&amp; prices, double percent)</code>, уменьшающую <b>каждую</b> цену в векторе на percent процентов, и функцию <code>double sum(const vector&lt;double&gt;&amp; v)</code>. Для цен <code>{100, 40, 60}</code> со скидкой 25 выведи <code>75 30 45</code> и <code>Sum: 150</code>.', 'Write <code>void applyDiscount(vector&lt;double&gt;&amp; prices, double percent)</code> that reduces <b>every</b> price by percent, and <code>double sum(const vector&lt;double&gt;&amp; v)</code>. For prices <code>{100, 40, 60}</code> with a 25% discount print <code>75 30 45</code> and <code>Sum: 150</code>.'),
        how: [L('Усередині: <code>for (double&amp; p : prices) p *= (1 - percent / 100);</code>', 'Внутри: <code>for (double&amp; p : prices) p *= (1 - percent / 100);</code>', 'Inside: <code>for (double&amp; p : prices) p *= (1 - percent / 100);</code>'), L('Без <code>&amp;</code> у циклі зміниться лише копія!', 'Без <code>&amp;</code> в цикле изменится только копия!', 'Without <code>&amp;</code> in the loop only a copy changes!')],
        starter: '#include <iostream>\n#include <vector>\nusing namespace std;\n\n// applyDiscount і sum\n\nint main() {\n  vector<double> prices = {100, 40, 60};\n  return 0;\n}',
        solution: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid applyDiscount(vector<double>& prices, double percent) {\n  for (double& p : prices) p *= (1 - percent / 100);\n}\n\ndouble sum(const vector<double>& v) {\n  double s = 0;\n  for (double x : v) s += x;\n  return s;\n}\n\nint main() {\n  vector<double> prices = {100, 40, 60};\n  applyDiscount(prices, 25);\n  for (size_t i = 0; i < prices.size(); i++) {\n    if (i) cout << " ";\n    cout << prices[i];\n  }\n  cout << "\\n";\n  cout << "Sum: " << sum(prices) << "\\n";\n  return 0;\n}',
        hint: L('cout виводить 75.0 як <code>75</code>.', 'cout выводит 75.0 как <code>75</code>.', 'cout prints 75.0 as <code>75</code>.'),
        expected: '75 30 45\nSum: 150',
        must: /vector\s*<\s*double\s*>\s*&\s*prices[\s\S]*const\s+vector/
      },
      quiz: { q: L('Що зберігає <code>int* p = &amp;x;</code>?', 'Что хранит <code>int* p = &amp;x;</code>?', 'What does <code>int* p = &amp;x;</code> store?'), options: [L('копію x', 'копию x', 'a copy of x'), L('адресу x', 'адрес x', 'x’s address'), L('завжди 0', 'всегда 0', 'always 0')], answer: 1, explain: L('&x — адреса.', '&x — адрес.', '&x is the address.') },
      ref: [{ code: 'void f(int& x)', d: L('посилання', 'ссылка', 'reference') }, { code: 'const T& v', d: L('без копії', 'без копии', 'no copy') }, { code: 'int* p = &x; *p', d: L('вказівник', 'указатель', 'pointer') }]
    },
    {
      id: 'classes', chapter: CH4,
      title: L('Класи, конструктори, інкапсуляція', 'Классы, конструкторы, инкапсуляция', 'Classes, constructors, encapsulation'),
      theory: L(
        `<p>Клас у C++ поєднує дані й методи. За замовчуванням усе <code>private</code>, тому відкриті частини позначають <code>public:</code>.</p>
<pre class="inline-code">class Hero {
private:
  string name;
  int hp;
public:
  Hero(string n, int h) : name(n), hp(h) {}   // список ініціалізації
  void takeDamage(int d) { hp = max(0, hp - d); }
  bool alive() const { return hp &gt; 0; }        // const — не змінює об’єкт
  int getHp() const { return hp; }
};</pre>
<ul><li>Після класу <b>обов’язкова</b> крапка з комою <code>};</code></li><li><code>: name(n), hp(h)</code> — ініціалізація полів до тіла конструктора (так правильно й швидше)</li><li><code>const</code> після методу — обіцянка не змінювати поля; такі методи можна викликати для <code>const</code>-об’єктів</li><li><code>struct</code> — те саме, що class, але все <code>public</code> за замовчуванням (для простих даних)</li></ul>`,
        `<p>Класс в C++ объединяет данные и методы. По умолчанию всё <code>private</code>, поэтому открытые части помечают <code>public:</code>.</p>
<pre class="inline-code">class Hero {
private:
  string name;
  int hp;
public:
  Hero(string n, int h) : name(n), hp(h) {}   // список инициализации
  void takeDamage(int d) { hp = max(0, hp - d); }
  bool alive() const { return hp &gt; 0; }        // const — не меняет объект
  int getHp() const { return hp; }
};</pre>
<ul><li>После класса <b>обязательна</b> точка с запятой <code>};</code></li><li><code>: name(n), hp(h)</code> — инициализация полей до тела конструктора (так правильно и быстрее)</li><li><code>const</code> после метода — обещание не менять поля; такие методы можно вызывать для <code>const</code>-объектов</li><li><code>struct</code> — то же, что class, но всё <code>public</code> по умолчанию (для простых данных)</li></ul>`,
        `<p>A C++ class bundles data and methods. Everything is <code>private</code> by default, so mark the open parts <code>public:</code>.</p>
<pre class="inline-code">class Hero {
private:
  string name;
  int hp;
public:
  Hero(string n, int h) : name(n), hp(h) {}   // initialiser list
  void takeDamage(int d) { hp = max(0, hp - d); }
  bool alive() const { return hp &gt; 0; }        // const: doesn’t modify
  int getHp() const { return hp; }
};</pre>
<ul><li>A semicolon after the class <code>};</code> is <b>mandatory</b></li><li><code>: name(n), hp(h)</code> initialises fields before the constructor body (correct and faster)</li><li><code>const</code> after a method promises not to change fields; such methods work on <code>const</code> objects</li><li><code>struct</code> is the same as class but <code>public</code> by default (for plain data)</li></ul>`),
      why: L(`<p>Чому в C++ усе приватне за замовчуванням? Мова підштовхує до інкапсуляції: спершу все сховано, а ти свідомо вирішуєш, що відкрити. Так у великому рушії ніхто не змінить здоров’я персонажа в обхід методу <code>takeDamage</code>, де є перевірки й анімації.</p>`,
        `<p>Почему в C++ всё приватное по умолчанию? Язык подталкивает к инкапсуляции: сначала всё спрятано, а ты осознанно решаешь, что открыть. Так в большом движке никто не изменит здоровье персонажа в обход метода <code>takeDamage</code>, где есть проверки и анимации.</p>`,
        `<p>Why is everything private by default? C++ nudges you toward encapsulation: hide first, then deliberately choose what to expose. In a big engine nobody can change a character’s health bypassing <code>takeDamage</code>, which holds the checks and animations.</p>`),
      mistakes: L(`<ul><li>Забута <code>;</code> після <code>}</code> класу — дивні помилки в наступних рядках.</li><li>Звернення до <code>private</code> поля ззовні — <code>is private within this context</code>.</li></ul>`,
        `<ul><li>Забытая <code>;</code> после <code>}</code> класса — странные ошибки в следующих строках.</li><li>Обращение к <code>private</code> полю снаружи — <code>is private within this context</code>.</li></ul>`,
        `<ul><li>A missing <code>;</code> after the class <code>}</code> causes strange errors on later lines.</li><li>Accessing a <code>private</code> field from outside — <code>is private within this context</code>.</li></ul>`),
      examples: [
        { title: L('Клас Hero', 'Класс Hero', 'Hero class'), code: '#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Hero {\nprivate:\n  string name;\n  int hp;\npublic:\n  Hero(string n, int h) : name(n), hp(h) {}\n  void takeDamage(int d) { hp = max(0, hp - d); }\n  bool alive() const { return hp > 0; }\n  string info() const { return name + " hp=" + to_string(hp); }\n};\n\nint main() {\n  Hero h("Knight", 50);\n  h.takeDamage(20);\n  cout << h.info() << "\\n";\n  h.takeDamage(40);\n  cout << h.info() << " alive=" << h.alive() << "\\n";\n  return 0;\n}', note: L('hp не опускається нижче 0.', 'hp не опускается ниже 0.', 'hp never drops below 0.') },
        { title: 'struct', code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Point {\n  int x, y;\n};\n\nint main() {\n  vector<Point> path = {{0, 0}, {3, 4}, {6, 8}};\n  for (const auto& p : path) cout << "(" << p.x << "," << p.y << ") ";\n  cout << "\\n";\n  return 0;\n}', note: L('struct — прості дані.', 'struct — простые данные.', 'struct for plain data.') },
        { title: L('Статичний лічильник', 'Статический счётчик', 'Static counter'), code: '#include <iostream>\nusing namespace std;\n\nclass Enemy {\npublic:\n  static int count;\n  Enemy() { count++; }\n  ~Enemy() { count--; }\n};\nint Enemy::count = 0;\n\nint main() {\n  Enemy a, b;\n  {\n    Enemy c;\n    cout << Enemy::count << "\\n";\n  }\n  cout << Enemy::count << "\\n";\n  return 0;\n}', note: L('~Enemy — деструктор, викликається при знищенні.', '~Enemy — деструктор, вызывается при уничтожении.', '~Enemy is the destructor, called on destruction.') }
      ],
      task: {
        text: L('Створи клас <code>Timer</code> з приватним полем <code>int seconds</code>. Конструктор приймає секунди. Методи: <code>void tick()</code> (−1, не нижче 0), <code>bool done() const</code>, <code>string show() const</code> у форматі <code>MM:SS</code> (з ведучим нулем). Для таймера на 125 секунд виведи <code>02:05</code>, потім 6 разів tick і знову show (<code>01:59</code>), і <code>done: 0</code>.', 'Создай класс <code>Timer</code> с приватным полем <code>int seconds</code>. Конструктор принимает секунды. Методы: <code>void tick()</code> (−1, не ниже 0), <code>bool done() const</code>, <code>string show() const</code> в формате <code>MM:SS</code> (с ведущим нулём). Для таймера на 125 секунд выведи <code>02:05</code>, затем 6 раз tick и снова show (<code>01:59</code>), и <code>done: 0</code>.', 'Create a <code>Timer</code> class with a private <code>int seconds</code>. The constructor takes seconds. Methods: <code>void tick()</code> (−1, not below 0), <code>bool done() const</code>, <code>string show() const</code> as <code>MM:SS</code> (zero-padded). For a 125-second timer print <code>02:05</code>, then tick 6 times and show again (<code>01:59</code>), then <code>done: 0</code>.'),
        how: [L('Ведучий нуль: <code>(m &lt; 10 ? "0" : "") + to_string(m)</code>.', 'Ведущий ноль: <code>(m &lt; 10 ? "0" : "") + to_string(m)</code>.', 'Zero padding: <code>(m &lt; 10 ? "0" : "") + to_string(m)</code>.'), L('Хвилини — <code>seconds / 60</code>, секунди — <code>seconds % 60</code>.', 'Минуты — <code>seconds / 60</code>, секунды — <code>seconds % 60</code>.', 'Minutes <code>seconds / 60</code>, seconds <code>seconds % 60</code>.')],
        starter: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Timer {\n};\n\nint main() {\n  return 0;\n}',
        solution: '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Timer {\nprivate:\n  int seconds;\n  static string two(int n) { return (n < 10 ? "0" : "") + to_string(n); }\npublic:\n  Timer(int s) : seconds(s) {}\n  void tick() { if (seconds > 0) seconds--; }\n  bool done() const { return seconds == 0; }\n  string show() const { return two(seconds / 60) + ":" + two(seconds % 60); }\n};\n\nint main() {\n  Timer t(125);\n  cout << t.show() << "\\n";\n  for (int i = 0; i < 6; i++) t.tick();\n  cout << t.show() << "\\n";\n  cout << "done: " << t.done() << "\\n";\n  return 0;\n}',
        hint: L('125 − 6 = 119 = 1 хв 59 с.', '125 − 6 = 119 = 1 мин 59 с.', '125 − 6 = 119 = 1 min 59 s.'),
        expected: '02:05\n01:59\ndone: 0',
        must: /class\s+Timer[\s\S]*private[\s\S]*const/
      },
      quiz: { q: L('Який доступ у полів class за замовчуванням?', 'Какой доступ у полей class по умолчанию?', 'What’s the default access in a class?'), options: ['public', 'private', 'protected'], answer: 1, explain: L('У struct — public.', 'У struct — public.', 'In a struct it’s public.') },
      ref: [{ code: 'class A { private: … public: … };', d: L('клас', 'класс', 'class') }, { code: 'A(int x) : x(x) {}', d: L('список ініціалізації', 'список инициализации', 'initialiser list') }, { code: 'int get() const', d: L('const-метод', 'const-метод', 'const method') }]
    },
    {
      id: 'inheritance', chapter: CH4,
      title: L('Наслідування й virtual', 'Наследование и virtual', 'Inheritance and virtual'),
      theory: L(
        `<p>Дочірній клас наслідує батьківський через <code>: public Base</code>:</p>
<pre class="inline-code">class Shape {
public:
  virtual double area() const { return 0; }
  virtual ~Shape() = default;
};

class Circle : public Shape {
  double r;
public:
  Circle(double r) : r(r) {}
  double area() const override { return 3.14159 * r * r; }
};</pre>
<ul><li><code>virtual</code> — метод можна перевизначити, і через вказівник/посилання на базовий клас буде викликана версія нащадка (<b>поліморфізм</b>)</li><li><code>override</code> — компілятор перевірить, що метод справді перевизначає віртуальний</li><li><code>virtual double area() const = 0;</code> — <b>чисто віртуальний</b> метод: клас стає абстрактним</li><li>Віртуальний деструктор потрібен, якщо об’єкти видаляють через вказівник на базовий клас</li></ul>
<p>Поліморфні об’єкти зберігають як <code>vector&lt;unique_ptr&lt;Shape&gt;&gt;</code> (<code>#include &lt;memory&gt;</code>), створюючи через <code>make_unique&lt;Circle&gt;(2)</code>.</p>`,
        `<p>Дочерний класс наследует родительский через <code>: public Base</code>:</p>
<pre class="inline-code">class Shape {
public:
  virtual double area() const { return 0; }
  virtual ~Shape() = default;
};

class Circle : public Shape {
  double r;
public:
  Circle(double r) : r(r) {}
  double area() const override { return 3.14159 * r * r; }
};</pre>
<ul><li><code>virtual</code> — метод можно переопределить, и через указатель/ссылку на базовый класс будет вызвана версия наследника (<b>полиморфизм</b>)</li><li><code>override</code> — компилятор проверит, что метод действительно переопределяет виртуальный</li><li><code>virtual double area() const = 0;</code> — <b>чисто виртуальный</b> метод: класс становится абстрактным</li><li>Виртуальный деструктор нужен, если объекты удаляют через указатель на базовый класс</li></ul>
<p>Полиморфные объекты хранят как <code>vector&lt;unique_ptr&lt;Shape&gt;&gt;</code> (<code>#include &lt;memory&gt;</code>), создавая через <code>make_unique&lt;Circle&gt;(2)</code>.</p>`,
        `<p>A child class inherits with <code>: public Base</code>:</p>
<pre class="inline-code">class Shape {
public:
  virtual double area() const { return 0; }
  virtual ~Shape() = default;
};

class Circle : public Shape {
  double r;
public:
  Circle(double r) : r(r) {}
  double area() const override { return 3.14159 * r * r; }
};</pre>
<ul><li><code>virtual</code> lets a method be overridden, so calls through a base pointer/reference run the child’s version (<b>polymorphism</b>)</li><li><code>override</code> makes the compiler check it really overrides a virtual method</li><li><code>virtual double area() const = 0;</code> is <b>pure virtual</b>: the class becomes abstract</li><li>A virtual destructor is needed when deleting through a base pointer</li></ul>
<p>Store polymorphic objects as <code>vector&lt;unique_ptr&lt;Shape&gt;&gt;</code> (<code>#include &lt;memory&gt;</code>), created with <code>make_unique&lt;Circle&gt;(2)</code>.</p>`),
      why: L(`<p>Чому в C++ треба явно писати <code>virtual</code>, а в Java — ні? Віртуальний виклик трохи повільніший (пошук у таблиці методів). C++ дотримується принципу «не плати за те, чим не користуєшся»: звичайні методи викликаються максимально швидко, а поліморфізм вмикаєш лише там, де він потрібен.</p>`,
        `<p>Почему в C++ нужно явно писать <code>virtual</code>, а в Java — нет? Виртуальный вызов чуть медленнее (поиск в таблице методов). C++ следует принципу «не плати за то, чем не пользуешься»: обычные методы вызываются максимально быстро, а полиморфизм включаешь только там, где он нужен.</p>`,
        `<p>Why must C++ say <code>virtual</code> explicitly when Java doesn’t? A virtual call is slightly slower (a method-table lookup). C++ follows “don’t pay for what you don’t use”: normal methods are as fast as possible, and you enable polymorphism only where needed.</p>`),
      mistakes: L(`<ul><li>Без <code>virtual</code> у базовому класі виклик через вказівник на базу запустить <b>базову</b> версію.</li><li><code>vector&lt;Shape&gt;</code> замість <code>vector&lt;unique_ptr&lt;Shape&gt;&gt;</code> — «зрізання»: нащадки перетворяться на базові об’єкти.</li></ul>`,
        `<ul><li>Без <code>virtual</code> в базовом классе вызов через указатель на базу запустит <b>базовую</b> версию.</li><li><code>vector&lt;Shape&gt;</code> вместо <code>vector&lt;unique_ptr&lt;Shape&gt;&gt;</code> — «срезка»: наследники превратятся в базовые объекты.</li></ul>`,
        `<ul><li>Without <code>virtual</code> in the base class, a call through a base pointer runs the <b>base</b> version.</li><li><code>vector&lt;Shape&gt;</code> instead of <code>vector&lt;unique_ptr&lt;Shape&gt;&gt;</code> causes “slicing”: children become base objects.</li></ul>`),
      examples: [
        { title: 'virtual', code: '#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Animal {\npublic:\n  virtual string sound() const { return "..."; }\n  virtual ~Animal() = default;\n};\n\nclass Cat : public Animal {\npublic:\n  string sound() const override { return "Meow"; }\n};\n\nclass Dog : public Animal {\npublic:\n  string sound() const override { return "Woof"; }\n};\n\nint main() {\n  vector<unique_ptr<Animal>> zoo;\n  zoo.push_back(make_unique<Cat>());\n  zoo.push_back(make_unique<Dog>());\n  zoo.push_back(make_unique<Animal>());\n  for (const auto& a : zoo) cout << a->sound() << "\\n";\n  return 0;\n}', note: L('-> — виклик методу через вказівник.', '-> — вызов метода через указатель.', '-> calls a method via a pointer.') },
        { title: L('Абстрактний клас', 'Абстрактный класс', 'Abstract class'), code: '#include <iostream>\n#include <vector>\n#include <memory>\nusing namespace std;\n\nclass Shape {\npublic:\n  virtual double area() const = 0;\n  virtual string name() const = 0;\n  virtual ~Shape() = default;\n};\n\nclass Rect : public Shape {\n  double w, h;\npublic:\n  Rect(double w, double h) : w(w), h(h) {}\n  double area() const override { return w * h; }\n  string name() const override { return "Rect"; }\n};\n\nclass Square : public Rect {\npublic:\n  Square(double s) : Rect(s, s) {}\n  string name() const override { return "Square"; }\n};\n\nint main() {\n  vector<unique_ptr<Shape>> shapes;\n  shapes.push_back(make_unique<Rect>(2, 5));\n  shapes.push_back(make_unique<Square>(3));\n  for (const auto& s : shapes) cout << s->name() << " " << s->area() << "\\n";\n  return 0;\n}', note: L('Square наслідує Rect і змінює лише name.', 'Square наследует Rect и меняет только name.', 'Square extends Rect and only changes name.') },
        { title: L('Без virtual', 'Без virtual', 'Without virtual'), code: '#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n  string hi() const { return "Base"; }\n  virtual string vhi() const { return "Base"; }\n};\n\nclass Child : public Base {\npublic:\n  string hi() const { return "Child"; }\n  string vhi() const override { return "Child"; }\n};\n\nint main() {\n  Child c;\n  const Base& b = c;\n  cout << b.hi() << " " << b.vhi() << "\\n";\n  return 0;\n}', note: L('Лише virtual-метод «знає» справжній тип.', 'Только virtual-метод «знает» настоящий тип.', 'Only the virtual method knows the real type.') }
      ],
      task: {
        text: L('Створи абстрактний клас <code>Unit</code> з полем <code>name</code>, чисто віртуальним <code>int power() const</code> і методом <code>string report() const</code>, що повертає <code>NAME: POWER</code>. Нащадки: <code>Archer</code> (power 7), <code>Knight</code> (power 12), <code>Mage</code> (power 15). Збери армію в <code>vector&lt;unique_ptr&lt;Unit&gt;&gt;</code> (Robin — Archer, Arthur — Knight, Merlin — Mage), виведи звіт кожного й <code>Army power: 34</code>.', 'Создай абстрактный класс <code>Unit</code> с полем <code>name</code>, чисто виртуальным <code>int power() const</code> и методом <code>string report() const</code>, возвращающим <code>NAME: POWER</code>. Наследники: <code>Archer</code> (power 7), <code>Knight</code> (power 12), <code>Mage</code> (power 15). Собери армию в <code>vector&lt;unique_ptr&lt;Unit&gt;&gt;</code> (Robin — Archer, Arthur — Knight, Merlin — Mage), выведи отчёт каждого и <code>Army power: 34</code>.', 'Create an abstract <code>Unit</code> class with a <code>name</code> field, a pure virtual <code>int power() const</code> and <code>string report() const</code> returning <code>NAME: POWER</code>. Children: <code>Archer</code> (power 7), <code>Knight</code> (12), <code>Mage</code> (15). Build an army in a <code>vector&lt;unique_ptr&lt;Unit&gt;&gt;</code> (Robin the Archer, Arthur the Knight, Merlin the Mage), print each report and <code>Army power: 34</code>.'),
        how: [L('Конструктор нащадка: <code>Archer(string n) : Unit(n) {}</code>.', 'Конструктор наследника: <code>Archer(string n) : Unit(n) {}</code>.', 'Child constructor: <code>Archer(string n) : Unit(n) {}</code>.'), L('<code>report()</code> у базовому класі викликає віртуальний <code>power()</code>.', '<code>report()</code> в базовом классе вызывает виртуальный <code>power()</code>.', 'The base <code>report()</code> calls the virtual <code>power()</code>.')],
        starter: '#include <iostream>\n#include <vector>\n#include <memory>\n#include <string>\nusing namespace std;\n\nclass Unit {\n};\n\nint main() {\n  return 0;\n}',
        solution: '#include <iostream>\n#include <vector>\n#include <memory>\n#include <string>\nusing namespace std;\n\nclass Unit {\nprotected:\n  string name;\npublic:\n  Unit(string n) : name(n) {}\n  virtual int power() const = 0;\n  string report() const { return name + ": " + to_string(power()); }\n  virtual ~Unit() = default;\n};\n\nclass Archer : public Unit {\npublic:\n  Archer(string n) : Unit(n) {}\n  int power() const override { return 7; }\n};\n\nclass Knight : public Unit {\npublic:\n  Knight(string n) : Unit(n) {}\n  int power() const override { return 12; }\n};\n\nclass Mage : public Unit {\npublic:\n  Mage(string n) : Unit(n) {}\n  int power() const override { return 15; }\n};\n\nint main() {\n  vector<unique_ptr<Unit>> army;\n  army.push_back(make_unique<Archer>("Robin"));\n  army.push_back(make_unique<Knight>("Arthur"));\n  army.push_back(make_unique<Mage>("Merlin"));\n  int total = 0;\n  for (const auto& u : army) {\n    cout << u->report() << "\\n";\n    total += u->power();\n  }\n  cout << "Army power: " << total << "\\n";\n  return 0;\n}',
        hint: L('<code>protected</code> — поле видно нащадкам.', '<code>protected</code> — поле видно наследникам.', '<code>protected</code> makes the field visible to children.'),
        expected: 'Robin: 7\nArthur: 12\nMerlin: 15\nArmy power: 34',
        must: /virtual\s+int\s+power\s*\(\s*\)\s*const\s*=\s*0[\s\S]*unique_ptr/
      },
      quiz: { q: L('Що робить <code>= 0</code> після віртуального методу?', 'Что делает <code>= 0</code> после виртуального метода?', 'What does <code>= 0</code> after a virtual method do?'), options: [L('повертає 0', 'возвращает 0', 'returns 0'), L('робить метод чисто віртуальним', 'делает метод чисто виртуальным', 'makes it pure virtual'), L('видаляє метод', 'удаляет метод', 'deletes it')], answer: 1, explain: L('Клас стає абстрактним.', 'Класс становится абстрактным.', 'The class becomes abstract.') },
      ref: [{ code: 'class B : public A', d: L('наслідування', 'наследование', 'inheritance') }, { code: 'virtual … override', d: L('поліморфізм', 'полиморфизм', 'polymorphism') }, { code: 'vector<unique_ptr<A>>; make_unique<B>()', d: L('колекція нащадків', 'коллекция наследников', 'a collection of children') }]
    },
    {
      id: 'operators-templates', chapter: CH4,
      title: L('Перевантаження операторів і шаблони', 'Перегрузка операторов и шаблоны', 'Operator overloading and templates'),
      theory: L(
        `<p>C++ дозволяє навчити власні класи працювати з операторами <code>+</code>, <code>==</code>, <code>&lt;&lt;</code>:</p>
<pre class="inline-code">struct Vec2 {
  double x, y;
  Vec2 operator+(const Vec2&amp; o) const { return {x + o.x, y + o.y}; }
  bool operator==(const Vec2&amp; o) const { return x == o.x &amp;&amp; y == o.y; }
};

ostream&amp; operator&lt;&lt;(ostream&amp; out, const Vec2&amp; v) {
  return out &lt;&lt; "(" &lt;&lt; v.x &lt;&lt; ", " &lt;&lt; v.y &lt;&lt; ")";
}</pre>
<p><b>Шаблони</b> (<code>template</code>) дозволяють написати функцію чи клас <b>для будь-якого типу</b>:</p>
<pre class="inline-code">template &lt;typename T&gt;
T biggest(T a, T b) { return a &gt; b ? a : b; }

biggest(3, 7);           // int
biggest(2.5, 1.1);       // double
biggest(string("a"), string("b"));</pre>
<p>Саме так побудовані <code>vector&lt;T&gt;</code>, <code>map&lt;K, V&gt;</code> і вся STL.</p>`,
        `<p>C++ позволяет научить собственные классы работать с операторами <code>+</code>, <code>==</code>, <code>&lt;&lt;</code>:</p>
<pre class="inline-code">struct Vec2 {
  double x, y;
  Vec2 operator+(const Vec2&amp; o) const { return {x + o.x, y + o.y}; }
  bool operator==(const Vec2&amp; o) const { return x == o.x &amp;&amp; y == o.y; }
};

ostream&amp; operator&lt;&lt;(ostream&amp; out, const Vec2&amp; v) {
  return out &lt;&lt; "(" &lt;&lt; v.x &lt;&lt; ", " &lt;&lt; v.y &lt;&lt; ")";
}</pre>
<p><b>Шаблоны</b> (<code>template</code>) позволяют написать функцию или класс <b>для любого типа</b>:</p>
<pre class="inline-code">template &lt;typename T&gt;
T biggest(T a, T b) { return a &gt; b ? a : b; }

biggest(3, 7);           // int
biggest(2.5, 1.1);       // double
biggest(string("a"), string("b"));</pre>
<p>Именно так построены <code>vector&lt;T&gt;</code>, <code>map&lt;K, V&gt;</code> и вся STL.</p>`,
        `<p>C++ lets your own classes work with operators like <code>+</code>, <code>==</code>, <code>&lt;&lt;</code>:</p>
<pre class="inline-code">struct Vec2 {
  double x, y;
  Vec2 operator+(const Vec2&amp; o) const { return {x + o.x, y + o.y}; }
  bool operator==(const Vec2&amp; o) const { return x == o.x &amp;&amp; y == o.y; }
};

ostream&amp; operator&lt;&lt;(ostream&amp; out, const Vec2&amp; v) {
  return out &lt;&lt; "(" &lt;&lt; v.x &lt;&lt; ", " &lt;&lt; v.y &lt;&lt; ")";
}</pre>
<p><b>Templates</b> let you write a function or class <b>for any type</b>:</p>
<pre class="inline-code">template &lt;typename T&gt;
T biggest(T a, T b) { return a &gt; b ? a : b; }

biggest(3, 7);           // int
biggest(2.5, 1.1);       // double
biggest(string("a"), string("b"));</pre>
<p>That’s how <code>vector&lt;T&gt;</code>, <code>map&lt;K, V&gt;</code> and the whole STL are built.</p>`),
      why: L(`<p>Ігрові рушії постійно додають вектори позицій і швидкостей. <code>pos = pos + vel * dt</code> читається як формула з підручника фізики, а не як <code>pos = add(pos, mul(vel, dt))</code>. А шаблони дають одну реалізацію замість десяти копій для різних типів — без втрати швидкості.</p>`,
        `<p>Игровые движки постоянно складывают векторы позиций и скоростей. <code>pos = pos + vel * dt</code> читается как формула из учебника физики, а не как <code>pos = add(pos, mul(vel, dt))</code>. А шаблоны дают одну реализацию вместо десяти копий для разных типов — без потери скорости.</p>`,
        `<p>Game engines constantly add position and velocity vectors. <code>pos = pos + vel * dt</code> reads like a physics formula instead of <code>pos = add(pos, mul(vel, dt))</code>. Templates give one implementation instead of ten copies per type — with no speed loss.</p>`),
      mistakes: L(`<ul><li>Оператор <code>&lt;&lt;</code> має бути <b>поза</b> класом (зліва стоїть <code>ostream</code>, а не твій об’єкт) і повертати <code>ostream&amp;</code> для ланцюжків.</li><li>Перевантажувати оператор з неочевидним змістом (<code>+</code>, що видаляє файли) — заплутує всіх.</li></ul>`,
        `<ul><li>Оператор <code>&lt;&lt;</code> должен быть <b>вне</b> класса (слева стоит <code>ostream</code>, а не твой объект) и возвращать <code>ostream&amp;</code> для цепочек.</li><li>Перегружать оператор с неочевидным смыслом (<code>+</code>, удаляющий файлы) — запутывает всех.</li></ul>`,
        `<ul><li><code>operator&lt;&lt;</code> must live <b>outside</b> the class (the left side is <code>ostream</code>, not your object) and return <code>ostream&amp;</code> for chaining.</li><li>Overloading an operator with a surprising meaning (a <code>+</code> that deletes files) confuses everyone.</li></ul>`),
      examples: [
        { title: 'Vec2', code: '#include <iostream>\nusing namespace std;\n\nstruct Vec2 {\n  double x, y;\n  Vec2 operator+(const Vec2& o) const { return {x + o.x, y + o.y}; }\n  Vec2 operator*(double k) const { return {x * k, y * k}; }\n};\n\nostream& operator<<(ostream& out, const Vec2& v) {\n  return out << "(" << v.x << ", " << v.y << ")";\n}\n\nint main() {\n  Vec2 pos{0, 0}, vel{2, 1};\n  for (int i = 0; i < 3; i++) {\n    pos = pos + vel * 0.5;\n    cout << pos << "\\n";\n  }\n  return 0;\n}', note: L('Фізика руху як формула.', 'Физика движения как формула.', 'Motion physics as a formula.') },
        { title: L('Шаблонна функція', 'Шаблонная функция', 'Function template'), code: '#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate <typename T>\nT biggest(T a, T b) { return a > b ? a : b; }\n\nint main() {\n  cout << biggest(3, 7) << "\\n";\n  cout << biggest(2.5, 1.1) << "\\n";\n  cout << biggest(string("apple"), string("pear")) << "\\n";\n  return 0;\n}', note: L('Одна функція — різні типи.', 'Одна функция — разные типы.', 'One function, many types.') },
        { title: L('Шаблонний клас', 'Шаблонный класс', 'Class template'), code: '#include <iostream>\n#include <vector>\nusing namespace std;\n\ntemplate <typename T>\nclass Stack {\n  vector<T> data;\npublic:\n  void push(T x) { data.push_back(x); }\n  T pop() { T x = data.back(); data.pop_back(); return x; }\n  bool empty() const { return data.empty(); }\n};\n\nint main() {\n  Stack<string> s;\n  s.push("first");\n  s.push("second");\n  s.push("third");\n  while (!s.empty()) cout << s.pop() << "\\n";\n  return 0;\n}', note: L('Стек — останнім прийшов, першим вийшов.', 'Стек — последним пришёл, первым вышел.', 'A stack: last in, first out.') }
      ],
      task: {
        text: L('Створи <code>struct Money</code> з полем <code>long long cents</code>. Перевантаж <code>+</code> (додає), <code>&lt;</code> (порівнює) і <code>&lt;&lt;</code> (вивід як <code>$12.05</code> — центи завжди двома цифрами). Напиши шаблонну функцію <code>template &lt;typename T&gt; T maxOf(const vector&lt;T&gt;&amp; v)</code>. Для <code>{Money{1205}, Money{899}, Money{3010}}</code> виведи суму (<code>$51.14</code>) і максимум (<code>$30.10</code>).', 'Создай <code>struct Money</code> с полем <code>long long cents</code>. Перегрузи <code>+</code> (складывает), <code>&lt;</code> (сравнивает) и <code>&lt;&lt;</code> (вывод как <code>$12.05</code> — центы всегда двумя цифрами). Напиши шаблонную функцию <code>template &lt;typename T&gt; T maxOf(const vector&lt;T&gt;&amp; v)</code>. Для <code>{Money{1205}, Money{899}, Money{3010}}</code> выведи сумму (<code>$51.14</code>) и максимум (<code>$30.10</code>).', 'Create <code>struct Money</code> with a <code>long long cents</code> field. Overload <code>+</code> (adds), <code>&lt;</code> (compares) and <code>&lt;&lt;</code> (prints like <code>$12.05</code> — always two cent digits). Write a template <code>template &lt;typename T&gt; T maxOf(const vector&lt;T&gt;&amp; v)</code>. For <code>{Money{1205}, Money{899}, Money{3010}}</code> print the sum (<code>$51.14</code>) and the max (<code>$30.10</code>).'),
        how: [L('Вивід: <code>out &lt;&lt; "$" &lt;&lt; m.cents / 100 &lt;&lt; "." &lt;&lt; (c &lt; 10 ? "0" : "") &lt;&lt; c</code>, де <code>c = m.cents % 100</code>.', 'Вывод: <code>out &lt;&lt; "$" &lt;&lt; m.cents / 100 &lt;&lt; "." &lt;&lt; (c &lt; 10 ? "0" : "") &lt;&lt; c</code>, где <code>c = m.cents % 100</code>.', 'Output: <code>out &lt;&lt; "$" &lt;&lt; m.cents / 100 &lt;&lt; "." &lt;&lt; (c &lt; 10 ? "0" : "") &lt;&lt; c</code>, with <code>c = m.cents % 100</code>.'), L('<code>maxOf</code> використовує лише <code>&lt;</code>.', '<code>maxOf</code> использует только <code>&lt;</code>.', '<code>maxOf</code> uses only <code>&lt;</code>.')],
        starter: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Money {\n  long long cents;\n};\n\nint main() {\n  vector<Money> v = {Money{1205}, Money{899}, Money{3010}};\n  return 0;\n}',
        solution: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nstruct Money {\n  long long cents;\n  Money operator+(const Money& o) const { return Money{cents + o.cents}; }\n  bool operator<(const Money& o) const { return cents < o.cents; }\n};\n\nostream& operator<<(ostream& out, const Money& m) {\n  long long c = m.cents % 100;\n  return out << "$" << m.cents / 100 << "." << (c < 10 ? "0" : "") << c;\n}\n\ntemplate <typename T>\nT maxOf(const vector<T>& v) {\n  T best = v[0];\n  for (const auto& x : v) if (best < x) best = x;\n  return best;\n}\n\nint main() {\n  vector<Money> v = {Money{1205}, Money{899}, Money{3010}};\n  Money total{0};\n  for (const auto& m : v) total = total + m;\n  cout << total << "\\n";\n  cout << maxOf(v) << "\\n";\n  return 0;\n}',
        hint: L('Гроші в центах — без похибок double.', 'Деньги в центах — без погрешностей double.', 'Money in cents avoids double rounding errors.'),
        expected: '$51.14\n$30.10',
        must: /operator\s*\+[\s\S]*operator\s*<[\s\S]*template/
      },
      quiz: { q: L('Навіщо шаблони?', 'Зачем шаблоны?', 'Why templates?'), options: [L('писати код для будь-якого типу', 'писать код для любого типа', 'write code for any type'), L('прискорити компіляцію', 'ускорить компиляцию', 'speed up compilation'), L('оформлювати текст', 'оформлять текст', 'format text')], answer: 0, explain: L('Як vector&lt;T&gt;.', 'Как vector&lt;T&gt;.', 'Like vector&lt;T&gt;.') },
      ref: [{ code: 'T operator+(const T& o) const', d: L('оператор', 'оператор', 'operator') }, { code: 'ostream& operator<<(ostream&, const T&)', d: L('вивід', 'вывод', 'output') }, { code: 'template <typename T>', d: L('шаблон', 'шаблон', 'template') }]
    },
    {
      id: 'project-grades', chapter: CH5, project: true,
      title: L('Проєкт: журнал оцінок', 'Проект: журнал оценок', 'Project: grade book'),
      theory: L(
        `<p>Програма читає список учнів з оцінками та будує звіт — типова «обробка даних»:</p>
<ol><li><code>struct Student { string name; vector&lt;int&gt; grades; double average() const; }</code></li><li>Читання: спершу кількість учнів, потім для кожного — ім’я, кількість оцінок і оцінки</li><li>Сортування за середнім балом (за спаданням) через <code>sort</code> з <b>лямбдою</b>:<br><code>sort(v.begin(), v.end(), [](const Student&amp; a, const Student&amp; b) { return a.average() &gt; b.average(); });</code></li><li>Звіт із двома знаками після коми й найкращий учень</li></ol>
<p><b>Лямбда</b> <code>[](…) { … }</code> — функція без імені, яку пишуть прямо там, де вона потрібна.</p>`,
        `<p>Программа читает список учеников с оценками и строит отчёт — типичная «обработка данных»:</p>
<ol><li><code>struct Student { string name; vector&lt;int&gt; grades; double average() const; }</code></li><li>Чтение: сначала количество учеников, затем для каждого — имя, количество оценок и оценки</li><li>Сортировка по среднему баллу (по убыванию) через <code>sort</code> с <b>лямбдой</b>:<br><code>sort(v.begin(), v.end(), [](const Student&amp; a, const Student&amp; b) { return a.average() &gt; b.average(); });</code></li><li>Отчёт с двумя знаками после запятой и лучший ученик</li></ol>
<p><b>Лямбда</b> <code>[](…) { … }</code> — функция без имени, которую пишут прямо там, где она нужна.</p>`,
        `<p>The program reads students with grades and builds a report — classic data processing:</p>
<ol><li><code>struct Student { string name; vector&lt;int&gt; grades; double average() const; }</code></li><li>Input: first the number of students, then for each a name, a grade count and the grades</li><li>Sort by average (descending) using <code>sort</code> with a <b>lambda</b>:<br><code>sort(v.begin(), v.end(), [](const Student&amp; a, const Student&amp; b) { return a.average() &gt; b.average(); });</code></li><li>A report with two decimals and the top student</li></ol>
<p>A <b>lambda</b> <code>[](…) { … }</code> is a nameless function written right where it’s needed.</p>`),
      why: L(`<p>Лямбда в <code>sort</code> — найзручніший спосіб сказати «сортуй <i>за цим</i>». Не треба оголошувати окрему функцію десь угорі файлу: правило сортування стоїть поруч із викликом, і код легко читати.</p>`,
        `<p>Лямбда в <code>sort</code> — самый удобный способ сказать «сортируй <i>по этому</i>». Не нужно объявлять отдельную функцию где-то вверху файла: правило сортировки стоит рядом с вызовом, и код легко читать.</p>`,
        `<p>A lambda in <code>sort</code> is the neatest way to say “sort <i>by this</i>”. No separate function up the file: the rule sits next to the call and the code stays readable.</p>`),
      mistakes: L(`<ul><li>Середнє через <code>sum / size</code> з цілими — втрата дробової частини.</li><li>Компаратор з <code>&gt;=</code> замість <code>&gt;</code> — порушує правила sort і може зламати програму.</li></ul>`,
        `<ul><li>Среднее через <code>sum / size</code> с целыми — потеря дробной части.</li><li>Компаратор с <code>&gt;=</code> вместо <code>&gt;</code> — нарушает правила sort и может сломать программу.</li></ul>`,
        `<ul><li>Averaging with integer <code>sum / size</code> loses the fraction.</li><li>A comparator using <code>&gt;=</code> instead of <code>&gt;</code> breaks sort’s rules and can crash.</li></ul>`),
      examples: [
        { title: L('Лямбда', 'Лямбда', 'Lambda'), code: M('vector<string> words = {"kiwi", "banana", "fig", "apple"};\nsort(words.begin(), words.end(), [](const string& a, const string& b) {\n  return a.size() < b.size();\n});\nfor (const auto& w : words) cout << w << " ";\ncout << "\\n";', '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;'), note: L('Сортування за довжиною.', 'Сортировка по длине.', 'Sorting by length.') },
        { title: L('Метод average', 'Метод average', 'average method'), code: '#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nstruct Student {\n  string name;\n  vector<int> grades;\n  double average() const {\n    if (grades.empty()) return 0;\n    return (double)accumulate(grades.begin(), grades.end(), 0) / grades.size();\n  }\n};\n\nint main() {\n  Student s{"Ira", {10, 11, 12}};\n  cout << s.name << " " << s.average() << "\\n";\n  return 0;\n}', note: L('Ініціалізація структури у фігурних дужках.', 'Инициализация структуры в фигурных скобках.', 'Brace-initialising a struct.') },
        { title: L('Читання груп', 'Чтение групп', 'Reading groups'), code: M('int n;\ncin >> n;\nfor (int i = 0; i < n; i++) {\n  string name;\n  int k;\n  cin >> name >> k;\n  int sum = 0;\n  for (int j = 0; j < k; j++) { int g; cin >> g; sum += g; }\n  cout << name << " sum " << sum << "\\n";\n}', '#include <iostream>\n#include <string>\nusing namespace std;'), note: L('Приклад вводу: <code>2</code>, <code>Ira 2 10 12</code>, <code>Max 1 7</code>.', 'Пример ввода: <code>2</code>, <code>Ira 2 10 12</code>, <code>Max 1 7</code>.', 'Sample input: <code>2</code>, <code>Ira 2 10 12</code>, <code>Max 1 7</code>.') }
      ],
      task: {
        text: L(`Напиши журнал оцінок. Формат вводу (вже задано): кількість учнів, далі рядки <code>Ім’я K оцінка1 … оцінкаK</code>. Виведи учнів за спаданням середнього як <code>1. Ira 11.33</code> (номер, ім’я, середнє з 2 знаками), а потім <code>Best: Ira</code> і <code>Class average: 9.07</code> (середнє всіх оцінок).`,
          `Напиши журнал оценок. Формат ввода (уже задан): количество учеников, далее строки <code>Имя K оценка1 … оценкаK</code>. Выведи учеников по убыванию среднего как <code>1. Ira 11.33</code> (номер, имя, среднее с 2 знаками), а затем <code>Best: Ira</code> и <code>Class average: 9.07</code> (среднее всех оценок).`,
          `Write a grade book. Input format (preset): the number of students, then lines <code>Name K grade1 … gradeK</code>. Print students by descending average as <code>1. Ira 11.33</code> (rank, name, average with 2 decimals), then <code>Best: Ira</code> and <code>Class average: 9.07</code> (the average of all grades).`),
        how: [L('Для середнього класу збирай суму й кількість <b>усіх</b> оцінок окремо.', 'Для среднего класса собирай сумму и количество <b>всех</b> оценок отдельно.', 'For the class average track the sum and count of <b>all</b> grades separately.'), L('<code>cout &lt;&lt; fixed &lt;&lt; setprecision(2)</code> один раз на початку.', '<code>cout &lt;&lt; fixed &lt;&lt; setprecision(2)</code> один раз в начале.', '<code>cout &lt;&lt; fixed &lt;&lt; setprecision(2)</code> once at the start.')],
        starter: '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <numeric>\n#include <iomanip>\nusing namespace std;\n\nstruct Student {\n  string name;\n  vector<int> grades;\n};\n\nint main() {\n  return 0;\n}',
        solution: '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <numeric>\n#include <iomanip>\nusing namespace std;\n\nstruct Student {\n  string name;\n  vector<int> grades;\n  double average() const {\n    if (grades.empty()) return 0;\n    return (double)accumulate(grades.begin(), grades.end(), 0) / grades.size();\n  }\n};\n\nint main() {\n  int n;\n  cin >> n;\n  vector<Student> students;\n  long long total = 0, count = 0;\n  for (int i = 0; i < n; i++) {\n    Student s;\n    int k;\n    cin >> s.name >> k;\n    for (int j = 0; j < k; j++) {\n      int g;\n      cin >> g;\n      s.grades.push_back(g);\n      total += g;\n      count++;\n    }\n    students.push_back(s);\n  }\n  sort(students.begin(), students.end(), [](const Student& a, const Student& b) {\n    return a.average() > b.average();\n  });\n  cout << fixed << setprecision(2);\n  for (size_t i = 0; i < students.size(); i++) {\n    cout << i + 1 << ". " << students[i].name << " " << students[i].average() << "\\n";\n  }\n  cout << "Best: " << students[0].name << "\\n";\n  cout << "Class average: " << (double)total / count << "\\n";\n  return 0;\n}',
        stdin: '4\nMax 3 7 8 9\nIra 3 12 11 11\nOleh 4 6 7 5 8\nKate 5 10 12 9 11 10',
        hint: L('Середні: Ira 11.33, Kate 10.40, Max 8.00, Oleh 6.50. Усього 15 оцінок, сума 142.', 'Средние: Ira 11.33, Kate 10.40, Max 8.00, Oleh 6.50. Всего 15 оценок, сумма 142.', 'Averages: Ira 11.33, Kate 10.40, Max 8.00, Oleh 6.50. 15 grades in total, sum 142.'),
        expected: '1. Ira 11.33\n2. Kate 10.40\n3. Max 8.00\n4. Oleh 6.50\nBest: Ira\nClass average: 9.07',
        must: /sort\s*\([\s\S]*\[\s*\]/
      },
      quiz: { q: L('Що таке <code>[](int a, int b) { return a &lt; b; }</code>?', 'Что такое <code>[](int a, int b) { return a &lt; b; }</code>?', 'What is <code>[](int a, int b) { return a &lt; b; }</code>?'), options: [L('масив', 'массив', 'an array'), L('лямбда-функція', 'лямбда-функция', 'a lambda function'), L('шаблон', 'шаблон', 'a template')], answer: 1, explain: L('Функція без імені.', 'Функция без имени.', 'A nameless function.') },
      ref: [{ code: 'sort(b, e, [](const T& a, const T& b) { return …; })', d: L('сортування з лямбдою', 'сортировка с лямбдой', 'sort with a lambda') }]
    },
    {
      id: 'project-dungeon', chapter: CH5, project: true,
      title: L('Проєкт: покрокова битва в підземеллі', 'Проект: пошаговая битва в подземелье', 'Project: turn-based dungeon battle'),
      theory: L(
        `<p>Фінальний проєкт — текстова гра з класами, поліморфізмом і контейнерами:</p>
<ol><li>Абстрактний <code>class Creature</code>: ім’я, hp, атака; віртуальний <code>int attackPower(int turn) const</code>; методи <code>takeHit</code>, <code>alive</code></li><li>Нащадки з особливостями: <code>Warrior</code> (кожен 3-й хід — подвійний удар), <code>Goblin</code> (звичайна атака)</li><li>Бій: герой і монстри з <code>vector&lt;unique_ptr&lt;Creature&gt;&gt;</code> по черзі обмінюються ударами, поки хтось не впаде</li><li>Лог бою й підсумок</li></ol>
<p>Щоб результат був передбачуваним (і його можна було перевірити), у грі немає випадковості — особливі удари залежать від номера ходу.</p>`,
        `<p>Финальный проект — текстовая игра с классами, полиморфизмом и контейнерами:</p>
<ol><li>Абстрактный <code>class Creature</code>: имя, hp, атака; виртуальный <code>int attackPower(int turn) const</code>; методы <code>takeHit</code>, <code>alive</code></li><li>Наследники с особенностями: <code>Warrior</code> (каждый 3-й ход — двойной удар), <code>Goblin</code> (обычная атака)</li><li>Бой: герой и монстры из <code>vector&lt;unique_ptr&lt;Creature&gt;&gt;</code> по очереди обмениваются ударами, пока кто-то не упадёт</li><li>Лог боя и итог</li></ol>
<p>Чтобы результат был предсказуемым (и его можно было проверить), в игре нет случайности — особые удары зависят от номера хода.</p>`,
        `<p>The final project is a text game with classes, polymorphism and containers:</p>
<ol><li>An abstract <code>class Creature</code>: name, hp, attack; a virtual <code>int attackPower(int turn) const</code>; methods <code>takeHit</code>, <code>alive</code></li><li>Children with quirks: <code>Warrior</code> (double hit every 3rd turn), <code>Goblin</code> (plain attack)</li><li>Battle: the hero and monsters from a <code>vector&lt;unique_ptr&lt;Creature&gt;&gt;</code> trade blows until someone falls</li><li>A battle log and summary</li></ol>
<p>To keep results predictable (and checkable), there’s no randomness — special hits depend on the turn number.</p>`),
      why: L(`<p>Ця архітектура — спрощена модель справжніх ігор: кожен тип істоти сам знає, як атакує, а «двигун бою» лише викликає <code>attackPower</code>. Додати дракона — означає написати один новий клас, не чіпаючи бій.</p>`,
        `<p>Эта архитектура — упрощённая модель настоящих игр: каждый тип существа сам знает, как атакует, а «движок боя» лишь вызывает <code>attackPower</code>. Добавить дракона — значит написать один новый класс, не трогая бой.</p>`,
        `<p>This architecture is a simplified model of real games: each creature type knows how it attacks, and the battle engine just calls <code>attackPower</code>. Adding a dragon means writing one new class without touching the battle.</p>`),
      mistakes: L(`<ul><li>Бій без перевірки <code>alive()</code> після кожного удару — мертвий монстр ще встигне вдарити.</li><li>Безкінечний цикл бою, якщо атака може бути 0.</li></ul>`,
        `<ul><li>Бой без проверки <code>alive()</code> после каждого удара — мёртвый монстр ещё успеет ударить.</li><li>Бесконечный цикл боя, если атака может быть 0.</li></ul>`,
        `<ul><li>No <code>alive()</code> check after each hit — a dead monster still gets to strike.</li><li>An infinite battle loop if attack can be 0.</li></ul>`),
      examples: [
        { title: L('Обмін ударами', 'Обмен ударами', 'Trading blows'), code: M('int heroHp = 30, monsterHp = 25;\nint turn = 1;\nwhile (heroHp > 0 && monsterHp > 0) {\n  monsterHp -= 8;\n  cout << "Turn " << turn << ": monster " << max(0, monsterHp) << "\\n";\n  if (monsterHp <= 0) break;\n  heroHp -= 5;\n  turn++;\n}\ncout << (heroHp > 0 ? "Hero wins" : "Monster wins") << "\\n";', '#include <iostream>\n#include <algorithm>\nusing namespace std;'), note: L('break — монстр не б’є після смерті.', 'break — монстр не бьёт после смерти.', 'break: the monster can’t hit after dying.') },
        { title: L('Особливий удар', 'Особый удар', 'Special hit'), code: M('int base = 6;\nfor (int turn = 1; turn <= 6; turn++) {\n  int power = (turn % 3 == 0) ? base * 2 : base;\n  cout << "turn " << turn << ": " << power << (power > base ? " CRIT" : "") << "\\n";\n}'), note: L('Кожен 3-й хід — подвійна сила.', 'Каждый 3-й ход — двойная сила.', 'Every 3rd turn hits twice as hard.') },
        { title: L('Черга монстрів', 'Очередь монстров', 'Monster queue'), code: M('vector<pair<string, int>> monsters = {{"Rat", 5}, {"Wolf", 12}, {"Troll", 30}};\nfor (const auto& [name, hp] : monsters) {\n  cout << "A wild " << name << " (" << hp << " hp) appears!\\n";\n}', '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;'), note: L('pair — пара значень.', 'pair — пара значений.', 'pair holds two values.') }
      ],
      task: {
        text: L(`Реалізуй бій. Герой <code>Warrior "Aria"</code>: hp 40, атака 9, кожен 3-й <b>його</b> хід — подвійна шкода. Монстри по черзі: <code>Goblin "Snik"</code> (hp 15, атака 4) і <code>Goblin "Grok"</code> (hp 20, атака 6). Правила ходу: герой б’є поточного монстра; якщо монстр вижив — б’є у відповідь. Хід героя рахується для всього бою (1, 2, 3…). Лог:
<ul><li><code>Aria hits Snik for 9 (Snik: 6)</code></li><li><code>Snik hits Aria for 4 (Aria: 36)</code></li><li><code>Snik is defeated!</code></li></ul>
Наприкінці — <code>Victory! Aria has N hp</code> або <code>Aria has fallen...</code>.`,
          `Реализуй бой. Герой <code>Warrior "Aria"</code>: hp 40, атака 9, каждый 3-й <b>его</b> ход — двойной урон. Монстры по очереди: <code>Goblin "Snik"</code> (hp 15, атака 4) и <code>Goblin "Grok"</code> (hp 20, атака 6). Правила хода: герой бьёт текущего монстра; если монстр выжил — бьёт в ответ. Ход героя считается на весь бой (1, 2, 3…). Лог:
<ul><li><code>Aria hits Snik for 9 (Snik: 6)</code></li><li><code>Snik hits Aria for 4 (Aria: 36)</code></li><li><code>Snik is defeated!</code></li></ul>
В конце — <code>Victory! Aria has N hp</code> или <code>Aria has fallen...</code>.`,
          `Implement the battle. Hero <code>Warrior "Aria"</code>: hp 40, attack 9, double damage on every 3rd of <b>her</b> turns. Monsters in order: <code>Goblin "Snik"</code> (hp 15, attack 4) and <code>Goblin "Grok"</code> (hp 20, attack 6). Each turn the hero hits the current monster; if it survives, it hits back. The hero’s turn counter spans the whole battle (1, 2, 3…). Log lines:
<ul><li><code>Aria hits Snik for 9 (Snik: 6)</code></li><li><code>Snik hits Aria for 4 (Aria: 36)</code></li><li><code>Snik is defeated!</code></li></ul>
At the end print <code>Victory! Aria has N hp</code> or <code>Aria has fallen...</code>.`),
        how: [L('<code>takeHit</code> не опускає hp нижче 0 — у лозі виводь уже обмежене значення.', '<code>takeHit</code> не опускает hp ниже 0 — в логе выводи уже ограниченное значение.', '<code>takeHit</code> clamps hp at 0 — log the clamped value.'), L('Хід 1: 9, хід 2: 9 (Snik мертвий), хід 3: 18 по Grok, хід 4: 9, хід 5: 9.', 'Ход 1: 9, ход 2: 9 (Snik мёртв), ход 3: 18 по Grok, ход 4: 9, ход 5: 9.', 'Turn 1: 9, turn 2: 9 (Snik dies), turn 3: 18 on Grok, turn 4: 9, turn 5: 9.')],
        starter: '#include <iostream>\n#include <vector>\n#include <memory>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Creature {\n};\n\nint main() {\n  return 0;\n}',
        solution: '#include <iostream>\n#include <vector>\n#include <memory>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Creature {\nprotected:\n  string name;\n  int hp, attack;\npublic:\n  Creature(string n, int h, int a) : name(n), hp(h), attack(a) {}\n  virtual int attackPower(int turn) const = 0;\n  void takeHit(int d) { hp = max(0, hp - d); }\n  bool alive() const { return hp > 0; }\n  const string& getName() const { return name; }\n  int getHp() const { return hp; }\n  virtual ~Creature() = default;\n};\n\nclass Warrior : public Creature {\npublic:\n  Warrior(string n, int h, int a) : Creature(n, h, a) {}\n  int attackPower(int turn) const override { return turn % 3 == 0 ? attack * 2 : attack; }\n};\n\nclass Goblin : public Creature {\npublic:\n  Goblin(string n, int h, int a) : Creature(n, h, a) {}\n  int attackPower(int) const override { return attack; }\n};\n\nint main() {\n  Warrior hero("Aria", 40, 9);\n  vector<unique_ptr<Creature>> monsters;\n  monsters.push_back(make_unique<Goblin>("Snik", 15, 4));\n  monsters.push_back(make_unique<Goblin>("Grok", 20, 6));\n  int turn = 1;\n  for (auto& m : monsters) {\n    while (m->alive() && hero.alive()) {\n      int dmg = hero.attackPower(turn++);\n      m->takeHit(dmg);\n      cout << hero.getName() << " hits " << m->getName() << " for " << dmg << " (" << m->getName() << ": " << m->getHp() << ")\\n";\n      if (!m->alive()) {\n        cout << m->getName() << " is defeated!\\n";\n        break;\n      }\n      int back = m->attackPower(0);\n      hero.takeHit(back);\n      cout << m->getName() << " hits " << hero.getName() << " for " << back << " (" << hero.getName() << ": " << hero.getHp() << ")\\n";\n    }\n    if (!hero.alive()) break;\n  }\n  if (hero.alive()) cout << "Victory! " << hero.getName() << " has " << hero.getHp() << " hp\\n";\n  else cout << hero.getName() << " has fallen...\\n";\n  return 0;\n}',
        hint: L('Підсумок: Victory! Aria has 30 hp.', 'Итог: Victory! Aria has 30 hp.', 'Result: Victory! Aria has 30 hp.'),
        expected: 'Aria hits Snik for 9 (Snik: 6)\nSnik hits Aria for 4 (Aria: 36)\nAria hits Snik for 9 (Snik: 0)\nSnik is defeated!\nAria hits Grok for 18 (Grok: 2)\nGrok hits Aria for 6 (Aria: 30)\nAria hits Grok for 9 (Grok: 0)\nGrok is defeated!\nVictory! Aria has 30 hp',
        must: /virtual[\s\S]*override[\s\S]*unique_ptr/
      },
      quiz: { q: L('Що треба змінити в бою, щоб додати новий тип монстра?', 'Что нужно изменить в бою, чтобы добавить новый тип монстра?', 'What must change in the battle to add a new monster type?'), options: [L('увесь цикл бою', 'весь цикл боя', 'the whole battle loop'), L('нічого — лише новий клас', 'ничего — только новый класс', 'nothing — just a new class'), L('main повністю', 'main полностью', 'all of main')], answer: 1, explain: L('Поліморфізм.', 'Полиморфизм.', 'Polymorphism.') },
      ref: [{ code: 'virtual int attackPower(int) const = 0', d: L('поведінка нащадків', 'поведение наследников', 'children’s behaviour') }]
    }
  ]);
})();
