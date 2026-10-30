// Java — частина 2: рекурсія, StringBuilder, enum, узагальнення, лямбди й стріми, Set/Queue, records, проєкт «Турнір».
(function () {
  const L = Codry.L;
  const CH6 = L('Сучасна Java', 'Современная Java', 'Modern Java');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');
  const IND = (s, n) => s.split('\n').map((l) => (l ? ' '.repeat(n) + l : l)).join('\n');
  // M(тіло main, імпорти, додаткові члени класу Main (static-методи), типи поза Main)
  const M = (body, imports, members, before) => (imports ? imports + '\n\n' : '') + (before ? before + '\n\n' : '') + 'public class Main {\n' +
    (members ? IND(members, 2) + '\n\n' : '') + '  public static void main(String[] args) {\n' + IND(body, 4) + '\n  }\n}';
  const UTIL = 'import java.util.*;';
  const STREAM = 'import java.util.*;\nimport java.util.stream.*;';

  Codry.steps('java', [
    {
      id: 'recursion', chapter: CH6,
      title: L('Рекурсія', 'Рекурсия', 'Recursion'),
      theory: L(
        `<p><b>Рекурсивний метод</b> викликає сам себе для меншої задачі. Обов’язкові частини: <b>базовий випадок</b> (зупинка) і <b>рекурсивний крок</b>.</p>
<pre class="inline-code">static long factorial(int n) {
  if (n &lt;= 1) return 1;            // базовий випадок
  return n * factorial(n - 1);     // крок
}</pre>
<p>Рекурсія зручна, коли дані самі вкладені (папки, дерева, меню) або коли треба перебрати всі варіанти. Кожен виклик чекає на стеку, тому дуже глибока рекурсія закінчиться <code>StackOverflowError</code>.</p>
<p>Корисний прийом — <b>допоміжний метод з додатковими параметрами</b>: публічний <code>reverse(s)</code> викликає приватний <code>reverse(s, index)</code>.</p>`,
        `<p><b>Рекурсивный метод</b> вызывает сам себя для меньшей задачи. Обязательные части: <b>базовый случай</b> (остановка) и <b>рекурсивный шаг</b>.</p>
<pre class="inline-code">static long factorial(int n) {
  if (n &lt;= 1) return 1;            // базовый случай
  return n * factorial(n - 1);     // шаг
}</pre>
<p>Рекурсия удобна, когда данные сами вложены (папки, деревья, меню) или когда нужно перебрать все варианты. Каждый вызов ждёт на стеке, поэтому очень глубокая рекурсия закончится <code>StackOverflowError</code>.</p>
<p>Полезный приём — <b>вспомогательный метод с дополнительными параметрами</b>: публичный <code>reverse(s)</code> вызывает приватный <code>reverse(s, index)</code>.</p>`,
        `<p>A <b>recursive method</b> calls itself on a smaller problem. Required parts: a <b>base case</b> (stop) and a <b>recursive step</b>.</p>
<pre class="inline-code">static long factorial(int n) {
  if (n &lt;= 1) return 1;            // base case
  return n * factorial(n - 1);     // step
}</pre>
<p>Recursion suits nested data (folders, trees, menus) and trying every option. Each call waits on the stack, so very deep recursion ends in <code>StackOverflowError</code>.</p>
<p>A handy trick is a <b>helper with extra parameters</b>: a public <code>reverse(s)</code> calls a private <code>reverse(s, index)</code>.</p>`),
      why: L(`<p>Рекурсія дозволяє записати рішення так, як його пояснюють словами: «паліндром — це слово, у якого перша й остання літери однакові, а середина теж паліндром». Такий код коротший і легше перевіряється, ніж цикл з кількома індексами.</p>`,
        `<p>Рекурсия позволяет записать решение так, как его объясняют словами: «палиндром — это слово, у которого первая и последняя буквы одинаковы, а середина тоже палиндром». Такой код короче и легче проверяется, чем цикл с несколькими индексами.</p>`,
        `<p>Recursion writes the solution the way you’d explain it: “a palindrome is a word whose first and last letters match and whose middle is also a palindrome”. That code is shorter and easier to verify than a loop with several indexes.</p>`),
      mistakes: L(`<ul><li>Немає базового випадку — <code>StackOverflowError</code>.</li><li><code>int</code> переповнюється вже на 13! — використовуй <code>long</code>.</li><li>Створення нового рядка <code>substring</code> на кожному кроці для довгих рядків повільне — краще передавати індекси.</li></ul>`,
        `<ul><li>Нет базового случая — <code>StackOverflowError</code>.</li><li><code>int</code> переполняется уже на 13! — используй <code>long</code>.</li><li>Создание новой строки <code>substring</code> на каждом шаге для длинных строк медленно — лучше передавать индексы.</li></ul>`,
        `<ul><li>No base case — <code>StackOverflowError</code>.</li><li><code>int</code> overflows already at 13! — use <code>long</code>.</li><li>Making a new <code>substring</code> each step is slow for long strings — pass indexes instead.</li></ul>`),
      examples: [
        { title: L('Факторіал і степінь', 'Факториал и степень', 'Factorial and power'), code: M(`System.out.println(factorial(15));
System.out.println(power(2, 20));`, null, `static long factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

static long power(long b, int e) {
  if (e == 0) return 1;
  return b * power(b, e - 1);
}`), note: L('long вміщує 15! = 1 307 674 368 000.', 'long вмещает 15! = 1 307 674 368 000.', 'long holds 15! = 1,307,674,368,000.') },
        { title: L('Паліндром', 'Палиндром', 'Palindrome'), code: M(`for (String w : new String[]{"level", "racecar", "java"}) {
  System.out.println(w + " " + isPal(w, 0, w.length() - 1));
}`, null, `static boolean isPal(String s, int i, int j) {
  if (i >= j) return true;
  if (s.charAt(i) != s.charAt(j)) return false;
  return isPal(s, i + 1, j - 1);
}`), note: L('Індекси замість нових рядків.', 'Индексы вместо новых строк.', 'Indexes instead of new strings.') },
        { title: L('Ханойські вежі', 'Ханойские башни', 'Towers of Hanoi'), code: M(`hanoi(3, 'A', 'C', 'B');
System.out.println("Moves: " + moves);`, null, `static int moves = 0;

static void hanoi(int n, char from, char to, char via) {
  if (n == 0) return;
  hanoi(n - 1, from, via, to);
  moves++;
  System.out.println("disk " + n + ": " + from + " -> " + to);
  hanoi(n - 1, via, to, from);
}`), note: L('Класична задача: 2ⁿ − 1 ходів.', 'Классическая задача: 2ⁿ − 1 ходов.', 'The classic puzzle: 2ⁿ − 1 moves.') }
      ],
      task: {
        text: L('Напиши рекурсивні <code>static String reverse(String s)</code> і <code>static int countChar(String s, char c)</code>. Виведи <code>reverse("Codry")</code> і <code>countChar("banana", \'a\')</code>.', 'Напиши рекурсивные <code>static String reverse(String s)</code> и <code>static int countChar(String s, char c)</code>. Выведи <code>reverse("Codry")</code> и <code>countChar("banana", \'a\')</code>.', 'Write recursive <code>static String reverse(String s)</code> and <code>static int countChar(String s, char c)</code>. Print <code>reverse("Codry")</code> and <code>countChar("banana", \'a\')</code>.'),
        how: [L('reverse: порожній рядок — база; інакше <code>reverse(s.substring(1)) + s.charAt(0)</code>.', 'reverse: пустая строка — база; иначе <code>reverse(s.substring(1)) + s.charAt(0)</code>.', 'reverse: empty string is the base; else <code>reverse(s.substring(1)) + s.charAt(0)</code>.'), L('countChar: <code>(s.charAt(0) == c ? 1 : 0) + countChar(s.substring(1), c)</code>.', 'countChar: <code>(s.charAt(0) == c ? 1 : 0) + countChar(s.substring(1), c)</code>.', 'countChar: <code>(s.charAt(0) == c ? 1 : 0) + countChar(s.substring(1), c)</code>.')],
        starter: M(`// System.out.println(reverse("Codry"));`, null, `// напиши reverse і countChar`),
        solution: M(`System.out.println(reverse("Codry"));
System.out.println(countChar("banana", 'a'));`, null, `static String reverse(String s) {
  if (s.isEmpty()) return "";
  return reverse(s.substring(1)) + s.charAt(0);
}

static int countChar(String s, char c) {
  if (s.isEmpty()) return 0;
  return (s.charAt(0) == c ? 1 : 0) + countChar(s.substring(1), c);
}`),
        hint: L('Очікувано: <code>yrdoC</code> і <code>3</code>.', 'Ожидается: <code>yrdoC</code> и <code>3</code>.', 'Expected: <code>yrdoC</code> and <code>3</code>.'),
        expected: 'yrdoC\n3',
        must: /reverse\s*\(\s*s\.substring[\s\S]*countChar\s*\(\s*s\.substring/
      },
      quiz: { q: L('Яка помилка виникає при нескінченній рекурсії в Java?', 'Какая ошибка возникает при бесконечной рекурсии в Java?', 'Which error does infinite recursion cause in Java?'), options: ['NullPointerException', 'StackOverflowError', 'OutOfBoundsException'], answer: 1, explain: L('Стек викликів переповнюється.', 'Стек вызовов переполняется.', 'The call stack overflows.') },
      ref: [{ code: 'static T f(n) { if (base) return …; return … f(smaller); }', d: L('шаблон рекурсії', 'шаблон рекурсии', 'recursion pattern') }]
    },
    {
      id: 'stringbuilder', chapter: CH6,
      title: L('StringBuilder і обробка тексту', 'StringBuilder и обработка текста', 'StringBuilder and text processing'),
      theory: L(
        `<p>Рядки <code>String</code> у Java <b>незмінні</b>: <code>s = s + "x"</code> щоразу створює новий рядок. У циклі на тисячі кроків це дуже повільно. Для збирання тексту є <b>StringBuilder</b>:</p>
<pre class="inline-code">StringBuilder sb = new StringBuilder();
for (int i = 1; i &lt;= 3; i++) sb.append(i).append(", ");
sb.setLength(sb.length() - 2);   // прибрати останню кому
System.out.println(sb);           // 1, 2, 3</pre>
<table class="mini"><tr><td><code>append(x)</code></td><td>додати в кінець</td></tr><tr><td><code>insert(i, x)</code></td><td>вставити</td></tr><tr><td><code>reverse()</code></td><td>розвернути</td></tr><tr><td><code>deleteCharAt(i)</code>, <code>setCharAt(i, c)</code></td><td>змінити символи</td></tr><tr><td><code>toString()</code></td><td>отримати String</td></tr></table>
<p>Ще корисне: <code>String.join(", ", list)</code>, <code>s.split("\\\\s+")</code> (розбити за пробілами), <code>Character.isDigit / isLetter / toUpperCase</code>, <code>s.chars()</code>.</p>`,
        `<p>Строки <code>String</code> в Java <b>неизменяемы</b>: <code>s = s + "x"</code> каждый раз создаёт новую строку. В цикле на тысячи шагов это очень медленно. Для сборки текста есть <b>StringBuilder</b>:</p>
<pre class="inline-code">StringBuilder sb = new StringBuilder();
for (int i = 1; i &lt;= 3; i++) sb.append(i).append(", ");
sb.setLength(sb.length() - 2);   // убрать последнюю запятую
System.out.println(sb);           // 1, 2, 3</pre>
<table class="mini"><tr><td><code>append(x)</code></td><td>добавить в конец</td></tr><tr><td><code>insert(i, x)</code></td><td>вставить</td></tr><tr><td><code>reverse()</code></td><td>развернуть</td></tr><tr><td><code>deleteCharAt(i)</code>, <code>setCharAt(i, c)</code></td><td>изменить символы</td></tr><tr><td><code>toString()</code></td><td>получить String</td></tr></table>
<p>Ещё полезное: <code>String.join(", ", list)</code>, <code>s.split("\\\\s+")</code> (разбить по пробелам), <code>Character.isDigit / isLetter / toUpperCase</code>, <code>s.chars()</code>.</p>`,
        `<p>Java <code>String</code>s are <b>immutable</b>: <code>s = s + "x"</code> makes a new string every time. In a loop of thousands of steps that’s very slow. To build text use <b>StringBuilder</b>:</p>
<pre class="inline-code">StringBuilder sb = new StringBuilder();
for (int i = 1; i &lt;= 3; i++) sb.append(i).append(", ");
sb.setLength(sb.length() - 2);   // drop the last comma
System.out.println(sb);           // 1, 2, 3</pre>
<table class="mini"><tr><td><code>append(x)</code></td><td>add to the end</td></tr><tr><td><code>insert(i, x)</code></td><td>insert</td></tr><tr><td><code>reverse()</code></td><td>reverse</td></tr><tr><td><code>deleteCharAt(i)</code>, <code>setCharAt(i, c)</code></td><td>edit characters</td></tr><tr><td><code>toString()</code></td><td>get a String</td></tr></table>
<p>Also useful: <code>String.join(", ", list)</code>, <code>s.split("\\\\s+")</code> (split on whitespace), <code>Character.isDigit / isLetter / toUpperCase</code>, <code>s.chars()</code>.</p>`),
      why: L(`<p>Склеювання <code>+</code> у циклі на 100 000 рядків змушує Java скопіювати текст 100 000 разів — програма «зависає». StringBuilder змінює один буфер на місці, тож працює в сотні разів швидше. Так будують звіти, HTML, логи й будь-який великий текст.</p>`,
        `<p>Склейка <code>+</code> в цикле на 100 000 строк заставляет Java скопировать текст 100 000 раз — программа «зависает». StringBuilder меняет один буфер на месте, поэтому работает в сотни раз быстрее. Так строят отчёты, HTML, логи и любой большой текст.</p>`,
        `<p>Concatenating with <code>+</code> in a 100,000-line loop makes Java copy the text 100,000 times — the program crawls. StringBuilder edits one buffer in place, so it’s hundreds of times faster. Reports, HTML, logs and any large text are built this way.</p>`),
      mistakes: L(`<ul><li>Порівнювати StringBuilder через <code>equals</code> — він порівнює об’єкти, а не текст; спершу <code>toString()</code>.</li><li><code>split(" ")</code> для тексту з подвійними пробілами дає порожні слова; використовуй <code>split("\\\\s+")</code>.</li><li><code>sb.reverse()</code> змінює сам sb, а не повертає копію.</li></ul>`,
        `<ul><li>Сравнивать StringBuilder через <code>equals</code> — он сравнивает объекты, а не текст; сначала <code>toString()</code>.</li><li><code>split(" ")</code> для текста с двойными пробелами даёт пустые слова; используй <code>split("\\\\s+")</code>.</li><li><code>sb.reverse()</code> меняет сам sb, а не возвращает копию.</li></ul>`,
        `<ul><li>Comparing StringBuilders with <code>equals</code> compares objects, not text; call <code>toString()</code> first.</li><li><code>split(" ")</code> on text with double spaces yields empty words; use <code>split("\\\\s+")</code>.</li><li><code>sb.reverse()</code> changes sb itself rather than returning a copy.</li></ul>`),
      examples: [
        { title: 'append / insert / reverse', code: M(`StringBuilder sb = new StringBuilder("Java");
sb.append(" is").append(" fun");
sb.insert(0, ">> ");
System.out.println(sb);
sb.reverse();
System.out.println(sb);
System.out.println(sb.length());`), note: L('Методи можна з’єднувати ланцюжком.', 'Методы можно соединять цепочкой.', 'Methods chain together.') },
        { title: L('Таблиця множення', 'Таблица умножения', 'Times table'), code: M(`StringBuilder sb = new StringBuilder();
for (int r = 1; r <= 3; r++) {
  for (int c = 1; c <= 4; c++) {
    sb.append(String.format("%3d", r * c));
  }
  sb.append('\\n');
}
System.out.print(sb);`), note: L('Один буфер замість дванадцяти нових рядків.', 'Один буфер вместо двенадцати новых строк.', 'One buffer instead of twelve new strings.') },
        { title: L('Слова й символи', 'Слова и символы', 'Words and characters'), code: M(`String text = "  Java   is  everywhere  ";
String[] words = text.trim().split("\\\\s+");
System.out.println(words.length + " words: " + String.join("|", words));
int digits = 0;
for (char ch : "R2-D2 and C-3PO".toCharArray()) if (Character.isDigit(ch)) digits++;
System.out.println("digits: " + digits);`), note: L('trim прибирає пробіли по краях.', 'trim убирает пробелы по краям.', 'trim removes surrounding spaces.') }
      ],
      task: {
        text: L('Напиши <code>static String compress(String s)</code>, що стискає повтори: <code>"aaabccdddd"</code> → <code>"a3bc2d4"</code> (якщо символ один — число не пишемо). Використай StringBuilder. Виведи <code>compress("aaabccdddd")</code> і <code>compress("hello")</code>.', 'Напиши <code>static String compress(String s)</code>, сжимающую повторы: <code>"aaabccdddd"</code> → <code>"a3bc2d4"</code> (если символ один — число не пишем). Используй StringBuilder. Выведи <code>compress("aaabccdddd")</code> и <code>compress("hello")</code>.', 'Write <code>static String compress(String s)</code> that squeezes repeats: <code>"aaabccdddd"</code> → <code>"a3bc2d4"</code> (no number for a single char). Use StringBuilder. Print <code>compress("aaabccdddd")</code> and <code>compress("hello")</code>.'),
        how: [L('Дві змінні: індекс <code>i</code> і <code>j</code>, що біжить, поки символи однакові.', 'Две переменные: индекс <code>i</code> и <code>j</code>, который бежит, пока символы одинаковы.', 'Two indexes: <code>i</code> and <code>j</code>, which runs while characters match.'), L('<code>sb.append(s.charAt(i)); if (j - i &gt; 1) sb.append(j - i);</code>', '<code>sb.append(s.charAt(i)); if (j - i &gt; 1) sb.append(j - i);</code>', '<code>sb.append(s.charAt(i)); if (j - i &gt; 1) sb.append(j - i);</code>')],
        starter: M(`System.out.println(compress("aaabccdddd"));`, null, `static String compress(String s) {
  StringBuilder sb = new StringBuilder();
  return sb.toString();
}`),
        solution: M(`System.out.println(compress("aaabccdddd"));
System.out.println(compress("hello"));`, null, `static String compress(String s) {
  StringBuilder sb = new StringBuilder();
  int i = 0;
  while (i < s.length()) {
    int j = i;
    while (j < s.length() && s.charAt(j) == s.charAt(i)) j++;
    sb.append(s.charAt(i));
    if (j - i > 1) sb.append(j - i);
    i = j;
  }
  return sb.toString();
}`),
        hint: L('Очікувано: <code>a3bc2d4</code> і <code>hel2o</code>.', 'Ожидается: <code>a3bc2d4</code> и <code>hel2o</code>.', 'Expected: <code>a3bc2d4</code> and <code>hel2o</code>.'),
        expected: 'a3bc2d4\nhel2o',
        must: /StringBuilder[\s\S]*append/
      },
      quiz: { q: L('Чому для збирання тексту в циклі краще StringBuilder?', 'Почему для сборки текста в цикле лучше StringBuilder?', 'Why use StringBuilder to build text in a loop?'), options: [L('String незмінний, + щоразу створює копію', 'String неизменяем, + каждый раз создаёт копию', 'String is immutable; + copies every time'), L('StringBuilder має більше кольорів', 'у StringBuilder больше цветов', 'StringBuilder has more colours'), L('String не підтримує +', 'String не поддерживает +', 'String has no +')], answer: 0, explain: L('StringBuilder змінює один буфер.', 'StringBuilder меняет один буфер.', 'StringBuilder edits one buffer.') },
      ref: [{ code: 'new StringBuilder().append(x).toString()', d: 'StringBuilder' }, { code: 's.split("\\\\s+")  String.join(", ", xs)', d: L('розбити / склеїти', 'разбить / склеить', 'split / join') }]
    },
    {
      id: 'enums', chapter: CH6,
      title: L('Перелічення (enum)', 'Перечисления (enum)', 'Enums'),
      theory: L(
        `<p><b>enum</b> — тип із фіксованим набором значень. У Java перелічення — повноцінні класи: у них можуть бути поля, конструктор і методи.</p>
<pre class="inline-code">enum Rarity {
  COMMON(1), RARE(5), EPIC(20), LEGENDARY(100);

  final int multiplier;
  Rarity(int m) { multiplier = m; }
}

Rarity r = Rarity.EPIC;
System.out.println(r + " x" + r.multiplier);  // EPIC x20</pre>
<ul><li><code>Rarity.values()</code> — масив усіх значень, <code>r.ordinal()</code> — номер, <code>r.name()</code> — назва</li><li><code>Rarity.valueOf("RARE")</code> — значення за назвою</li><li>Перелічення зручно використовувати в <code>switch</code>: <code>case EPIC -&gt; …</code></li></ul>`,
        `<p><b>enum</b> — тип с фиксированным набором значений. В Java перечисления — полноценные классы: у них могут быть поля, конструктор и методы.</p>
<pre class="inline-code">enum Rarity {
  COMMON(1), RARE(5), EPIC(20), LEGENDARY(100);

  final int multiplier;
  Rarity(int m) { multiplier = m; }
}

Rarity r = Rarity.EPIC;
System.out.println(r + " x" + r.multiplier);  // EPIC x20</pre>
<ul><li><code>Rarity.values()</code> — массив всех значений, <code>r.ordinal()</code> — номер, <code>r.name()</code> — название</li><li><code>Rarity.valueOf("RARE")</code> — значение по названию</li><li>Перечисления удобно использовать в <code>switch</code>: <code>case EPIC -&gt; …</code></li></ul>`,
        `<p>An <b>enum</b> is a type with a fixed set of values. Java enums are full classes: they can have fields, a constructor and methods.</p>
<pre class="inline-code">enum Rarity {
  COMMON(1), RARE(5), EPIC(20), LEGENDARY(100);

  final int multiplier;
  Rarity(int m) { multiplier = m; }
}

Rarity r = Rarity.EPIC;
System.out.println(r + " x" + r.multiplier);  // EPIC x20</pre>
<ul><li><code>Rarity.values()</code> is an array of all values, <code>r.ordinal()</code> the index, <code>r.name()</code> the name</li><li><code>Rarity.valueOf("RARE")</code> looks a value up by name</li><li>Enums shine in <code>switch</code>: <code>case EPIC -&gt; …</code></li></ul>`),
      why: L(`<p>Рідкісність предмета, напрямок руху, стан гри — значення з короткого фіксованого списку. Рядки на зразок <code>"epik"</code> пропускають друкарські помилки, а числа нічого не пояснюють. enum ловить помилки під час компіляції та зберігає пов’язані дані (множник, колір, ціну) прямо в значенні.</p>`,
        `<p>Редкость предмета, направление движения, состояние игры — значения из короткого фиксированного списка. Строки вроде <code>"epik"</code> пропускают опечатки, а числа ничего не объясняют. enum ловит ошибки при компиляции и хранит связанные данные (множитель, цвет, цену) прямо в значении.</p>`,
        `<p>Item rarity, direction, game state — values from a short fixed list. Strings like <code>"epik"</code> let typos through, numbers explain nothing. An enum catches mistakes at compile time and keeps related data (multiplier, colour, price) right in the value.</p>`),
      mistakes: L(`<ul><li><code>Rarity.valueOf("epic")</code> — <code>IllegalArgumentException</code>: регістр має збігатися.</li><li>Порівнювати enum можна через <code>==</code> — це правильно й безпечно (на відміну від рядків).</li><li>Константи переліку пишуть ВЕЛИКИМИ літерами — така домовленість у Java.</li></ul>`,
        `<ul><li><code>Rarity.valueOf("epic")</code> — <code>IllegalArgumentException</code>: регистр должен совпадать.</li><li>Сравнивать enum можно через <code>==</code> — это правильно и безопасно (в отличие от строк).</li><li>Константы перечисления пишут БОЛЬШИМИ буквами — такая договорённость в Java.</li></ul>`,
        `<ul><li><code>Rarity.valueOf("epic")</code> throws <code>IllegalArgumentException</code>: case must match.</li><li>Comparing enums with <code>==</code> is correct and safe (unlike strings).</li><li>Enum constants are UPPER_CASE by Java convention.</li></ul>`),
      examples: [
        { title: L('values і switch', 'values и switch', 'values and switch'), code: M(`for (Dir d : Dir.values()) {
  String arrow = switch (d) {
    case UP -> "^";
    case RIGHT -> ">";
    case DOWN -> "v";
    case LEFT -> "<";
  };
  System.out.println(d.ordinal() + " " + d + " " + arrow);
}`, null, null, `enum Dir { UP, RIGHT, DOWN, LEFT }`), note: L('switch по enum без default — компілятор перевіряє всі варіанти.', 'switch по enum без default — компилятор проверяет все варианты.', 'A switch over an enum without default — the compiler checks every case.') },
        { title: L('Поля й методи', 'Поля и методы', 'Fields and methods'), code: M(`for (Planet p : Planet.values()) {
  System.out.printf("%s: %.1f kg%n", p, p.weight(50));
}`, null, null, `enum Planet {
  MERCURY(0.38), EARTH(1.0), JUPITER(2.53);

  private final double gravity;
  Planet(double g) { gravity = g; }
  double weight(double earthKg) { return earthKg * gravity; }
}`), note: L('Кожне значення має власні дані.', 'Каждое значение имеет свои данные.', 'Each value carries its own data.') },
        { title: 'valueOf', code: M(`String input = "MEDIUM";
Level lvl = Level.valueOf(input);
System.out.println(lvl + " -> enemies: " + lvl.enemies);
try {
  Level.valueOf("insane");
} catch (IllegalArgumentException e) {
  System.out.println("No such level");
}`, null, null, `enum Level {
  EASY(3), MEDIUM(6), HARD(10);
  final int enemies;
  Level(int e) { enemies = e; }
}`), note: L('Рядок → enum, з обробкою помилки.', 'Строка → enum, с обработкой ошибки.', 'String → enum, with error handling.') }
      ],
      task: {
        text: L('Опиши <code>enum Rarity</code> зі значеннями <code>COMMON(10)</code>, <code>RARE(50)</code>, <code>EPIC(200)</code> (ціна в монетах) і методом <code>int price(int count)</code>. Для інвентаря <code>{RARE, COMMON, EPIC, COMMON}</code> виведи кожен предмет як <code>RARE: 50</code>, а потім <code>Total: 270</code> і <code>Most valuable: EPIC</code>.', 'Опиши <code>enum Rarity</code> со значениями <code>COMMON(10)</code>, <code>RARE(50)</code>, <code>EPIC(200)</code> (цена в монетах) и методом <code>int price(int count)</code>. Для инвентаря <code>{RARE, COMMON, EPIC, COMMON}</code> выведи каждый предмет как <code>RARE: 50</code>, а затем <code>Total: 270</code> и <code>Most valuable: EPIC</code>.', 'Define <code>enum Rarity</code> with <code>COMMON(10)</code>, <code>RARE(50)</code>, <code>EPIC(200)</code> (price in coins) and a method <code>int price(int count)</code>. For the inventory <code>{RARE, COMMON, EPIC, COMMON}</code> print each item as <code>RARE: 50</code>, then <code>Total: 270</code> and <code>Most valuable: EPIC</code>.'),
        how: [L('Поле <code>final int coins;</code> і конструктор <code>Rarity(int c)</code>; <code>price(count)</code> повертає <code>coins * count</code>.', 'Поле <code>final int coins;</code> и конструктор <code>Rarity(int c)</code>; <code>price(count)</code> возвращает <code>coins * count</code>.', 'A field <code>final int coins;</code> and constructor <code>Rarity(int c)</code>; <code>price(count)</code> returns <code>coins * count</code>.'), L('Найцінніший — порівнюй <code>coins</code> або <code>ordinal()</code>.', 'Самый ценный — сравнивай <code>coins</code> или <code>ordinal()</code>.', 'Most valuable: compare <code>coins</code> or <code>ordinal()</code>.')],
        starter: M(`Rarity[] bag = {Rarity.RARE, Rarity.COMMON, Rarity.EPIC, Rarity.COMMON};
// вивід`, null, null, `enum Rarity {
  COMMON, RARE, EPIC
}`),
        solution: M(`Rarity[] bag = {Rarity.RARE, Rarity.COMMON, Rarity.EPIC, Rarity.COMMON};
int total = 0;
Rarity best = bag[0];
for (Rarity r : bag) {
  System.out.println(r + ": " + r.price(1));
  total += r.price(1);
  if (r.coins > best.coins) best = r;
}
System.out.println("Total: " + total);
System.out.println("Most valuable: " + best);`, null, null, `enum Rarity {
  COMMON(10), RARE(50), EPIC(200);

  final int coins;
  Rarity(int c) { coins = c; }
  int price(int count) { return coins * count; }
}`),
        hint: L('50 + 10 + 200 + 10 = 270.', '50 + 10 + 200 + 10 = 270.', '50 + 10 + 200 + 10 = 270.'),
        expected: 'RARE: 50\nCOMMON: 10\nEPIC: 200\nCOMMON: 10\nTotal: 270\nMost valuable: EPIC',
        must: /enum\s+Rarity\s*\{[\s\S]*Rarity\s*\(\s*int/
      },
      quiz: { q: L('Що повертає <code>Rarity.values()</code>?', 'Что возвращает <code>Rarity.values()</code>?', 'What does <code>Rarity.values()</code> return?'), options: [L('масив усіх значень', 'массив всех значений', 'an array of all values'), L('кількість значень', 'количество значений', 'the number of values'), L('перше значення', 'первое значение', 'the first value')], answer: 0, explain: L('Зручно для циклу по всіх варіантах.', 'Удобно для цикла по всем вариантам.', 'Handy for looping over every option.') },
      ref: [{ code: 'enum E { A(1), B(2); final int v; E(int v) { this.v = v; } }', d: L('enum з полем', 'enum с полем', 'enum with a field') }, { code: 'E.values()  E.valueOf("A")  e.ordinal()', d: L('утиліти', 'утилиты', 'helpers') }]
    },
    {
      id: 'generics', chapter: CH6,
      title: L('Узагальнення (generics)', 'Обобщения (generics)', 'Generics'),
      theory: L(
        `<p>Ти вже користувався узагальненнями: <code>ArrayList&lt;String&gt;</code>, <code>HashMap&lt;String, Integer&gt;</code>. У кутових дужках — <b>параметр типу</b>. Можна писати власні узагальнені класи й методи:</p>
<pre class="inline-code">class Box&lt;T&gt; {
  private T value;
  Box(T v) { value = v; }
  T get() { return value; }
}

Box&lt;String&gt; name = new Box&lt;&gt;("Ira");
Box&lt;Integer&gt; level = new Box&lt;&gt;(7);</pre>
<ul><li><code>T</code> — «якийсь тип», який вкажуть під час використання</li><li>Узагальнений метод: <code>static &lt;T&gt; T firstOf(List&lt;T&gt; list)</code></li><li>Обмеження: <code>&lt;T extends Comparable&lt;T&gt;&gt;</code> — «T, який вміє порівнюватися», тоді можна викликати <code>a.compareTo(b)</code></li><li>Узагальнення працюють лише з об’єктами: <code>Integer</code>, а не <code>int</code></li></ul>`,
        `<p>Ты уже пользовался обобщениями: <code>ArrayList&lt;String&gt;</code>, <code>HashMap&lt;String, Integer&gt;</code>. В угловых скобках — <b>параметр типа</b>. Можно писать собственные обобщённые классы и методы:</p>
<pre class="inline-code">class Box&lt;T&gt; {
  private T value;
  Box(T v) { value = v; }
  T get() { return value; }
}

Box&lt;String&gt; name = new Box&lt;&gt;("Ira");
Box&lt;Integer&gt; level = new Box&lt;&gt;(7);</pre>
<ul><li><code>T</code> — «какой-то тип», который укажут при использовании</li><li>Обобщённый метод: <code>static &lt;T&gt; T firstOf(List&lt;T&gt; list)</code></li><li>Ограничение: <code>&lt;T extends Comparable&lt;T&gt;&gt;</code> — «T, который умеет сравниваться», тогда можно вызывать <code>a.compareTo(b)</code></li><li>Обобщения работают только с объектами: <code>Integer</code>, а не <code>int</code></li></ul>`,
        `<p>You’ve already used generics: <code>ArrayList&lt;String&gt;</code>, <code>HashMap&lt;String, Integer&gt;</code>. The angle brackets hold a <b>type parameter</b>. You can write your own generic classes and methods:</p>
<pre class="inline-code">class Box&lt;T&gt; {
  private T value;
  Box(T v) { value = v; }
  T get() { return value; }
}

Box&lt;String&gt; name = new Box&lt;&gt;("Ira");
Box&lt;Integer&gt; level = new Box&lt;&gt;(7);</pre>
<ul><li><code>T</code> is “some type” chosen at the point of use</li><li>A generic method: <code>static &lt;T&gt; T firstOf(List&lt;T&gt; list)</code></li><li>A bound: <code>&lt;T extends Comparable&lt;T&gt;&gt;</code> means “a T that can be compared”, so <code>a.compareTo(b)</code> works</li><li>Generics work with objects only: <code>Integer</code>, not <code>int</code></li></ul>`),
      why: L(`<p>Без узагальнень довелося б писати окремий клас для коробки з рядком, з числом, з гравцем… або використовувати <code>Object</code> і постійно приводити типи, ризикуючи <code>ClassCastException</code>. Узагальнення дають <b>один</b> код для будь-яких типів і при цьому зберігають перевірку типів компілятором.</p>`,
        `<p>Без обобщений пришлось бы писать отдельный класс для коробки со строкой, с числом, с игроком… или использовать <code>Object</code> и постоянно приводить типы, рискуя <code>ClassCastException</code>. Обобщения дают <b>один</b> код для любых типов и при этом сохраняют проверку типов компилятором.</p>`,
        `<p>Without generics you’d write a separate box class for strings, numbers, players… or use <code>Object</code> and cast constantly, risking <code>ClassCastException</code>. Generics give you <b>one</b> piece of code for any type while keeping compile-time type checks.</p>`),
      mistakes: L(`<ul><li><code>Box&lt;int&gt;</code> — помилка: примітиви не можна, пиши <code>Box&lt;Integer&gt;</code>.</li><li><code>new T()</code> усередині класу не працює — тип стирається під час виконання.</li><li>Сирий тип <code>ArrayList list = …</code> без <code>&lt;&gt;</code> вимикає перевірки — компілятор лише попереджає.</li></ul>`,
        `<ul><li><code>Box&lt;int&gt;</code> — ошибка: примитивы нельзя, пиши <code>Box&lt;Integer&gt;</code>.</li><li><code>new T()</code> внутри класса не работает — тип стирается при выполнении.</li><li>Сырой тип <code>ArrayList list = …</code> без <code>&lt;&gt;</code> отключает проверки — компилятор лишь предупреждает.</li></ul>`,
        `<ul><li><code>Box&lt;int&gt;</code> is an error: no primitives, write <code>Box&lt;Integer&gt;</code>.</li><li><code>new T()</code> inside the class doesn’t work — the type is erased at runtime.</li><li>A raw type <code>ArrayList list = …</code> without <code>&lt;&gt;</code> disables checks — only a warning.</li></ul>`),
      examples: [
        { title: L('Клас Pair', 'Класс Pair', 'A Pair class'), code: M(`Pair<String, Integer> p = new Pair<>("Ira", 450);
System.out.println(p.first() + " -> " + p.second());
Pair<Integer, Boolean> q = new Pair<>(7, true);
System.out.println(q);`, null, null, `class Pair<A, B> {
  private final A a;
  private final B b;
  Pair(A a, B b) { this.a = a; this.b = b; }
  A first() { return a; }
  B second() { return b; }
  public String toString() { return "(" + a + ", " + b + ")"; }
}`), note: L('Два параметри типу — A і B.', 'Два параметра типа — A и B.', 'Two type parameters — A and B.') },
        { title: L('Узагальнений метод', 'Обобщённый метод', 'Generic method'), code: M(`System.out.println(maxOf(List.of(3, 17, 8)));
System.out.println(maxOf(List.of("pear", "apple", "zucchini")));`, UTIL, `static <T extends Comparable<T>> T maxOf(List<T> list) {
  T best = list.get(0);
  for (T x : list) if (x.compareTo(best) > 0) best = x;
  return best;
}`), note: L('Працює і для чисел, і для рядків.', 'Работает и для чисел, и для строк.', 'Works for numbers and strings alike.') },
        { title: L('Стек на списку', 'Стек на списке', 'Stack on a list'), code: M(`MyStack<String> s = new MyStack<>();
s.push("a");
s.push("b");
System.out.println(s.pop() + s.pop() + " empty=" + s.isEmpty());`, UTIL, null, `class MyStack<T> {
  private final List<T> items = new ArrayList<>();
  void push(T x) { items.add(x); }
  T pop() { return items.remove(items.size() - 1); }
  boolean isEmpty() { return items.isEmpty(); }
}`), note: L('Один клас — стек для будь-якого типу.', 'Один класс — стек для любого типа.', 'One class — a stack for any type.') }
      ],
      task: {
        text: L('Напиши узагальнений клас <code>Inventory&lt;T&gt;</code> зі списком предметів і методами <code>add(T item)</code>, <code>int size()</code>, <code>T last()</code>, а також узагальнений метод <code>static &lt;T&gt; int countEqual(List&lt;T&gt; list, T value)</code>. Створи <code>Inventory&lt;String&gt;</code>, додай <code>sword</code>, <code>potion</code>, <code>potion</code> і виведи <code>3</code>, <code>potion</code>, а потім <code>countEqual(List.of(1, 2, 1, 1), 1)</code> → <code>3</code>.', 'Напиши обобщённый класс <code>Inventory&lt;T&gt;</code> со списком предметов и методами <code>add(T item)</code>, <code>int size()</code>, <code>T last()</code>, а также обобщённый метод <code>static &lt;T&gt; int countEqual(List&lt;T&gt; list, T value)</code>. Создай <code>Inventory&lt;String&gt;</code>, добавь <code>sword</code>, <code>potion</code>, <code>potion</code> и выведи <code>3</code>, <code>potion</code>, а затем <code>countEqual(List.of(1, 2, 1, 1), 1)</code> → <code>3</code>.', 'Write a generic <code>Inventory&lt;T&gt;</code> with a list of items and methods <code>add(T item)</code>, <code>int size()</code>, <code>T last()</code>, plus a generic <code>static &lt;T&gt; int countEqual(List&lt;T&gt; list, T value)</code>. Create an <code>Inventory&lt;String&gt;</code>, add <code>sword</code>, <code>potion</code>, <code>potion</code> and print <code>3</code>, <code>potion</code>, then <code>countEqual(List.of(1, 2, 1, 1), 1)</code> → <code>3</code>.'),
        how: [L('Порівнюй через <code>x.equals(value)</code>, а не <code>==</code>.', 'Сравнивай через <code>x.equals(value)</code>, а не <code>==</code>.', 'Compare with <code>x.equals(value)</code>, not <code>==</code>.')],
        starter: M(`Inventory<String> inv = new Inventory<>();
// add, size, last, countEqual`, UTIL, `// static <T> int countEqual(...)`, `class Inventory<T> {
  private final List<T> items = new ArrayList<>();
}`),
        solution: M(`Inventory<String> inv = new Inventory<>();
inv.add("sword");
inv.add("potion");
inv.add("potion");
System.out.println(inv.size());
System.out.println(inv.last());
System.out.println(countEqual(List.of(1, 2, 1, 1), 1));`, UTIL, `static <T> int countEqual(List<T> list, T value) {
  int n = 0;
  for (T x : list) if (x.equals(value)) n++;
  return n;
}`, `class Inventory<T> {
  private final List<T> items = new ArrayList<>();
  void add(T item) { items.add(item); }
  int size() { return items.size(); }
  T last() { return items.get(items.size() - 1); }
}`),
        hint: L('Очікувано: <code>3</code>, <code>potion</code>, <code>3</code>.', 'Ожидается: <code>3</code>, <code>potion</code>, <code>3</code>.', 'Expected: <code>3</code>, <code>potion</code>, <code>3</code>.'),
        expected: '3\npotion\n3',
        must: /class\s+Inventory\s*<\s*T\s*>[\s\S]*static\s*<\s*T\s*>/
      },
      quiz: { q: L('Чому не можна написати <code>List&lt;int&gt;</code>?', 'Почему нельзя написать <code>List&lt;int&gt;</code>?', 'Why can’t you write <code>List&lt;int&gt;</code>?'), options: [L('узагальнення працюють лише з об’єктами', 'обобщения работают только с объектами', 'generics only take objects'), L('int занадто малий', 'int слишком маленький', 'int is too small'), L('можна, це помилка редактора', 'можно, это ошибка редактора', 'you can — it’s an editor bug')], answer: 0, explain: L('Використовуй обгортку Integer.', 'Используй обёртку Integer.', 'Use the Integer wrapper.') },
      ref: [{ code: 'class Box<T> { T v; }', d: L('узагальнений клас', 'обобщённый класс', 'generic class') }, { code: 'static <T> T f(List<T> xs)', d: L('узагальнений метод', 'обобщённый метод', 'generic method') }, { code: '<T extends Comparable<T>>', d: L('обмеження', 'ограничение', 'bound') }]
    },
    {
      id: 'streams', chapter: CH6,
      title: L('Лямбди та Stream API', 'Лямбды и Stream API', 'Lambdas and the Stream API'),
      theory: L(
        `<p><b>Лямбда</b> — коротка функція без імені: <code>x -&gt; x * 2</code>, <code>(a, b) -&gt; a + b</code>. Її можна передати в метод як значення.</p>
<p><b>Stream</b> — «конвеєр» обробки колекції: дані проходять через ланцюжок операцій.</p>
<pre class="inline-code">List&lt;Integer&gt; scores = List.of(40, 85, 92, 60, 77);
int sumGood = scores.stream()
    .filter(s -&gt; s &gt;= 60)      // відібрати
    .mapToInt(s -&gt; s)          // до int
    .sum();                    // підсумок</pre>
<table class="mini"><tr><td><code>filter</code></td><td>відібрати</td></tr><tr><td><code>map</code></td><td>перетворити кожен</td></tr><tr><td><code>sorted</code></td><td>сортувати</td></tr><tr><td><code>limit(n)</code></td><td>перші n</td></tr><tr><td><code>count / sum / max / average</code></td><td>підсумки</td></tr><tr><td><code>collect(Collectors.toList())</code>, <code>toList()</code></td><td>зібрати в список</td></tr><tr><td><code>Collectors.joining(", ")</code></td><td>склеїти в рядок</td></tr><tr><td><code>Collectors.groupingBy(…)</code></td><td>згрупувати</td></tr></table>
<p>Порівняння: <code>Comparator.comparing(Player::score).reversed()</code> — <code>Player::score</code> це <b>посилання на метод</b>, скорочення для <code>p -&gt; p.score()</code>.</p>`,
        `<p><b>Лямбда</b> — короткая функция без имени: <code>x -&gt; x * 2</code>, <code>(a, b) -&gt; a + b</code>. Её можно передать в метод как значение.</p>
<p><b>Stream</b> — «конвейер» обработки коллекции: данные проходят через цепочку операций.</p>
<pre class="inline-code">List&lt;Integer&gt; scores = List.of(40, 85, 92, 60, 77);
int sumGood = scores.stream()
    .filter(s -&gt; s &gt;= 60)      // отобрать
    .mapToInt(s -&gt; s)          // в int
    .sum();                    // итог</pre>
<table class="mini"><tr><td><code>filter</code></td><td>отобрать</td></tr><tr><td><code>map</code></td><td>преобразовать каждый</td></tr><tr><td><code>sorted</code></td><td>сортировать</td></tr><tr><td><code>limit(n)</code></td><td>первые n</td></tr><tr><td><code>count / sum / max / average</code></td><td>итоги</td></tr><tr><td><code>collect(Collectors.toList())</code>, <code>toList()</code></td><td>собрать в список</td></tr><tr><td><code>Collectors.joining(", ")</code></td><td>склеить в строку</td></tr><tr><td><code>Collectors.groupingBy(…)</code></td><td>сгруппировать</td></tr></table>
<p>Сравнение: <code>Comparator.comparing(Player::score).reversed()</code> — <code>Player::score</code> это <b>ссылка на метод</b>, сокращение для <code>p -&gt; p.score()</code>.</p>`,
        `<p>A <b>lambda</b> is a short nameless function: <code>x -&gt; x * 2</code>, <code>(a, b) -&gt; a + b</code>. You can pass it to a method as a value.</p>
<p>A <b>Stream</b> is a processing “conveyor belt”: data flows through a chain of operations.</p>
<pre class="inline-code">List&lt;Integer&gt; scores = List.of(40, 85, 92, 60, 77);
int sumGood = scores.stream()
    .filter(s -&gt; s &gt;= 60)      // keep
    .mapToInt(s -&gt; s)          // to int
    .sum();                    // total</pre>
<table class="mini"><tr><td><code>filter</code></td><td>keep matching</td></tr><tr><td><code>map</code></td><td>transform each</td></tr><tr><td><code>sorted</code></td><td>sort</td></tr><tr><td><code>limit(n)</code></td><td>first n</td></tr><tr><td><code>count / sum / max / average</code></td><td>totals</td></tr><tr><td><code>collect(Collectors.toList())</code>, <code>toList()</code></td><td>collect to a list</td></tr><tr><td><code>Collectors.joining(", ")</code></td><td>join into a string</td></tr><tr><td><code>Collectors.groupingBy(…)</code></td><td>group</td></tr></table>
<p>Ordering: <code>Comparator.comparing(Player::score).reversed()</code> — <code>Player::score</code> is a <b>method reference</b>, short for <code>p -&gt; p.score()</code>.</p>`),
      why: L(`<p>«Імена трьох найкращих гравців з рахунком від 60, через кому» — у стрімах це один читабельний ланцюжок, а циклами — тимчасовий список, сортування, лічильник і склеювання. Код описує <b>що</b> потрібно отримати, а не <b>як</b> крок за кроком, тому в ньому менше місць для помилок.</p>`,
        `<p>«Имена трёх лучших игроков со счётом от 60, через запятую» — в стримах это одна читаемая цепочка, а циклами — временный список, сортировка, счётчик и склейка. Код описывает <b>что</b> нужно получить, а не <b>как</b> шаг за шагом, поэтому в нём меньше мест для ошибок.</p>`,
        `<p>“Names of the top three players scoring 60+, comma-separated” is one readable stream chain; with loops it’s a temp list, a sort, a counter and joining. The code states <b>what</b> you want rather than <b>how</b> step by step, leaving fewer places for bugs.</p>`),
      mistakes: L(`<ul><li>Стрім можна пройти лише <b>один раз</b> — повторне використання дає <code>IllegalStateException</code>.</li><li>Без кінцевої операції (<code>count</code>, <code>collect</code>, <code>forEach</code>…) ланцюжок нічого не робить.</li><li><code>max()</code> повертає <code>Optional</code> — значення дістають через <code>.get()</code> або <code>.orElse(…)</code>.</li></ul>`,
        `<ul><li>Стрим можно пройти только <b>один раз</b> — повторное использование даёт <code>IllegalStateException</code>.</li><li>Без конечной операции (<code>count</code>, <code>collect</code>, <code>forEach</code>…) цепочка ничего не делает.</li><li><code>max()</code> возвращает <code>Optional</code> — значение достают через <code>.get()</code> или <code>.orElse(…)</code>.</li></ul>`,
        `<ul><li>A stream can be consumed only <b>once</b> — reuse throws <code>IllegalStateException</code>.</li><li>Without a terminal operation (<code>count</code>, <code>collect</code>, <code>forEach</code>…) the chain does nothing.</li><li><code>max()</code> returns an <code>Optional</code> — get the value with <code>.get()</code> or <code>.orElse(…)</code>.</li></ul>`),
      examples: [
        { title: 'filter / map / joining', code: M(`List<String> names = List.of("ira", "maksym", "ola", "bohdan", "kira");
String result = names.stream()
    .filter(n -> n.length() <= 4)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.joining(", "));
System.out.println(result);`, STREAM), note: L('<code>String::toUpperCase</code> — посилання на метод.', '<code>String::toUpperCase</code> — ссылка на метод.', '<code>String::toUpperCase</code> is a method reference.') },
        { title: L('Підсумки', 'Итоги', 'Totals'), code: M(`List<Integer> nums = List.of(4, 15, 8, 23, 42, 16);
System.out.println(nums.stream().mapToInt(n -> n).sum());
System.out.println(nums.stream().mapToInt(n -> n).max().getAsInt());
System.out.println(nums.stream().filter(n -> n % 2 == 0).count());
System.out.printf("%.2f%n", nums.stream().mapToInt(n -> n).average().orElse(0));`, STREAM), note: L('mapToInt дає IntStream з sum/max/average.', 'mapToInt даёт IntStream с sum/max/average.', 'mapToInt yields an IntStream with sum/max/average.') },
        { title: 'groupingBy', code: M(`List<String> words = List.of("apple", "avocado", "banana", "blueberry", "cherry");
Map<Character, List<String>> byLetter = words.stream()
    .collect(Collectors.groupingBy(w -> w.charAt(0), TreeMap::new, Collectors.toList()));
System.out.println(byLetter);`, STREAM), note: L('TreeMap — щоб ключі йшли за алфавітом.', 'TreeMap — чтобы ключи шли по алфавиту.', 'TreeMap keeps keys alphabetical.') }
      ],
      task: {
        text: L('Дано список гравців (record <code>Player(String name, int score)</code>): Ira 450, Max 120, Ola 300, Taras 520, Kira 80. Через стріми виведи: імена тих, хто має ≥ 300, за спаданням рахунку через кому (<code>Taras, Ira, Ola</code>), суму всіх очок (<code>1470</code>) і ім’я гравця з найменшим рахунком (<code>Kira</code>).', 'Дан список игроков (record <code>Player(String name, int score)</code>): Ira 450, Max 120, Ola 300, Taras 520, Kira 80. С помощью стримов выведи: имена тех, у кого ≥ 300, по убыванию счёта через запятую (<code>Taras, Ira, Ola</code>), сумму всех очков (<code>1470</code>) и имя игрока с наименьшим счётом (<code>Kira</code>).', 'Given players (record <code>Player(String name, int score)</code>): Ira 450, Max 120, Ola 300, Taras 520, Kira 80. Using streams print: names with ≥ 300, by descending score, comma-separated (<code>Taras, Ira, Ola</code>), the total score (<code>1470</code>) and the name of the lowest scorer (<code>Kira</code>).'),
        how: [L('<code>.sorted(Comparator.comparingInt(Player::score).reversed())</code>', '<code>.sorted(Comparator.comparingInt(Player::score).reversed())</code>', '<code>.sorted(Comparator.comparingInt(Player::score).reversed())</code>'), L('Мінімум: <code>.min(Comparator.comparingInt(Player::score)).get().name()</code>', 'Минимум: <code>.min(Comparator.comparingInt(Player::score)).get().name()</code>', 'Minimum: <code>.min(Comparator.comparingInt(Player::score)).get().name()</code>')],
        starter: M(`List<Player> players = List.of(
    new Player("Ira", 450), new Player("Max", 120), new Player("Ola", 300),
    new Player("Taras", 520), new Player("Kira", 80));
// три рядки через stream()`, STREAM, null, `record Player(String name, int score) {}`),
        solution: M(`List<Player> players = List.of(
    new Player("Ira", 450), new Player("Max", 120), new Player("Ola", 300),
    new Player("Taras", 520), new Player("Kira", 80));
System.out.println(players.stream()
    .filter(p -> p.score() >= 300)
    .sorted(Comparator.comparingInt(Player::score).reversed())
    .map(Player::name)
    .collect(Collectors.joining(", ")));
System.out.println(players.stream().mapToInt(Player::score).sum());
System.out.println(players.stream().min(Comparator.comparingInt(Player::score)).get().name());`, STREAM, null, `record Player(String name, int score) {}`),
        hint: L('450 + 120 + 300 + 520 + 80 = 1470.', '450 + 120 + 300 + 520 + 80 = 1470.', '450 + 120 + 300 + 520 + 80 = 1470.'),
        expected: 'Taras, Ira, Ola\n1470\nKira',
        must: /\.stream\(\)[\s\S]*filter[\s\S]*sorted/
      },
      quiz: { q: L('Що повертає <code>stream().max(…)</code>?', 'Что возвращает <code>stream().max(…)</code>?', 'What does <code>stream().max(…)</code> return?'), options: ['int', 'Optional', 'List'], answer: 1, explain: L('Optional — бо колекція може бути порожньою.', 'Optional — потому что коллекция может быть пустой.', 'Optional — the collection may be empty.') },
      ref: [{ code: 'x -> x * 2   (a, b) -> a + b', d: L('лямбди', 'лямбды', 'lambdas') }, { code: '.stream().filter().map().sorted().collect()', d: 'Stream' }, { code: 'Collectors.joining / groupingBy / toList', d: 'Collectors' }]
    },
    {
      id: 'sets-queues', chapter: CH6,
      title: L('Set, Deque, PriorityQueue', 'Set, Deque, PriorityQueue', 'Set, Deque, PriorityQueue'),
      theory: L(
        `<p>Окрім <code>ArrayList</code> і <code>HashMap</code>, у <code>java.util</code> є ще кілька важливих колекцій:</p>
<table class="mini"><tr><td><code>HashSet&lt;T&gt;</code></td><td>множина без повторів, порядок не гарантований</td></tr><tr><td><code>TreeSet&lt;T&gt;</code></td><td>множина, завжди відсортована</td></tr><tr><td><code>LinkedHashSet&lt;T&gt;</code></td><td>множина в порядку додавання</td></tr><tr><td><code>ArrayDeque&lt;T&gt;</code></td><td>і стек (<code>push/pop/peek</code>), і черга (<code>offer/poll/peek</code>)</td></tr><tr><td><code>PriorityQueue&lt;T&gt;</code></td><td>черга, що віддає <b>найменший</b> елемент першим</td></tr></table>
<pre class="inline-code">Set&lt;String&gt; seen = new HashSet&lt;&gt;();
if (!seen.add("Ira")) System.out.println("already here");  // add повертає false для повтору

Deque&lt;Integer&gt; stack = new ArrayDeque&lt;&gt;();
stack.push(1); stack.push(2);
stack.pop();   // 2

Queue&lt;String&gt; q = new ArrayDeque&lt;&gt;();
q.offer("A"); q.offer("B");
q.poll();      // "A"</pre>
<p>Для «найбільший першим»: <code>new PriorityQueue&lt;&gt;(Comparator.reverseOrder())</code>.</p>`,
        `<p>Кроме <code>ArrayList</code> и <code>HashMap</code>, в <code>java.util</code> есть ещё несколько важных коллекций:</p>
<table class="mini"><tr><td><code>HashSet&lt;T&gt;</code></td><td>множество без повторов, порядок не гарантирован</td></tr><tr><td><code>TreeSet&lt;T&gt;</code></td><td>множество, всегда отсортированное</td></tr><tr><td><code>LinkedHashSet&lt;T&gt;</code></td><td>множество в порядке добавления</td></tr><tr><td><code>ArrayDeque&lt;T&gt;</code></td><td>и стек (<code>push/pop/peek</code>), и очередь (<code>offer/poll/peek</code>)</td></tr><tr><td><code>PriorityQueue&lt;T&gt;</code></td><td>очередь, отдающая <b>наименьший</b> элемент первым</td></tr></table>
<pre class="inline-code">Set&lt;String&gt; seen = new HashSet&lt;&gt;();
if (!seen.add("Ira")) System.out.println("already here");  // add возвращает false для повтора

Deque&lt;Integer&gt; stack = new ArrayDeque&lt;&gt;();
stack.push(1); stack.push(2);
stack.pop();   // 2

Queue&lt;String&gt; q = new ArrayDeque&lt;&gt;();
q.offer("A"); q.offer("B");
q.poll();      // "A"</pre>
<p>Для «наибольший первым»: <code>new PriorityQueue&lt;&gt;(Comparator.reverseOrder())</code>.</p>`,
        `<p>Besides <code>ArrayList</code> and <code>HashMap</code>, <code>java.util</code> has more key collections:</p>
<table class="mini"><tr><td><code>HashSet&lt;T&gt;</code></td><td>a set without duplicates, no guaranteed order</td></tr><tr><td><code>TreeSet&lt;T&gt;</code></td><td>a set that’s always sorted</td></tr><tr><td><code>LinkedHashSet&lt;T&gt;</code></td><td>a set in insertion order</td></tr><tr><td><code>ArrayDeque&lt;T&gt;</code></td><td>both a stack (<code>push/pop/peek</code>) and a queue (<code>offer/poll/peek</code>)</td></tr><tr><td><code>PriorityQueue&lt;T&gt;</code></td><td>a queue that hands out the <b>smallest</b> item first</td></tr></table>
<pre class="inline-code">Set&lt;String&gt; seen = new HashSet&lt;&gt;();
if (!seen.add("Ira")) System.out.println("already here");  // add returns false for a duplicate

Deque&lt;Integer&gt; stack = new ArrayDeque&lt;&gt;();
stack.push(1); stack.push(2);
stack.pop();   // 2

Queue&lt;String&gt; q = new ArrayDeque&lt;&gt;();
q.offer("A"); q.offer("B");
q.poll();      // "A"</pre>
<p>For “largest first”: <code>new PriorityQueue&lt;&gt;(Comparator.reverseOrder())</code>.</p>`),
      why: L(`<p>Правильна колекція робить задачу простою: «чи був уже цей гравець?» — <code>HashSet</code> відповідає миттєво; «обробляти запити по черзі» — <code>ArrayDeque</code>; «наступне найтерміновіше завдання» — <code>PriorityQueue</code>. З <code>ArrayList</code> те саме можна зробити, але повільніше й з більшою кількістю коду.</p>`,
        `<p>Правильная коллекция делает задачу простой: «был ли уже этот игрок?» — <code>HashSet</code> отвечает мгновенно; «обрабатывать запросы по очереди» — <code>ArrayDeque</code>; «следующая самая срочная задача» — <code>PriorityQueue</code>. С <code>ArrayList</code> то же можно сделать, но медленнее и с большим количеством кода.</p>`,
        `<p>The right collection makes a problem simple: “have we seen this player?” — <code>HashSet</code> answers instantly; “handle requests in order” — <code>ArrayDeque</code>; “the next most urgent job” — <code>PriorityQueue</code>. An <code>ArrayList</code> can do all this, but slower and with more code.</p>`),
      mistakes: L(`<ul><li>Друкувати <code>HashSet</code> і чекати певного порядку — він може бути будь-яким; для виводу використовуй <code>TreeSet</code>.</li><li><code>System.out.println(pq)</code> не показує елементи в порядку пріоритету — лише <code>poll()</code> віддає їх правильно.</li><li><code>pop()</code> на порожньому ArrayDeque кидає виняток, а <code>poll()</code> повертає <code>null</code>.</li></ul>`,
        `<ul><li>Печатать <code>HashSet</code> и ждать определённого порядка — он может быть любым; для вывода используй <code>TreeSet</code>.</li><li><code>System.out.println(pq)</code> не показывает элементы в порядке приоритета — только <code>poll()</code> отдаёт их правильно.</li><li><code>pop()</code> на пустом ArrayDeque бросает исключение, а <code>poll()</code> возвращает <code>null</code>.</li></ul>`,
        `<ul><li>Printing a <code>HashSet</code> and expecting an order — it can be anything; use <code>TreeSet</code> for output.</li><li><code>System.out.println(pq)</code> doesn’t show priority order — only <code>poll()</code> hands items out correctly.</li><li><code>pop()</code> on an empty ArrayDeque throws, <code>poll()</code> returns <code>null</code>.</li></ul>`),
      examples: [
        { title: L('Множини', 'Множества', 'Sets'), code: M(`List<String> visits = List.of("ira", "max", "ira", "ola", "max", "ira");
Set<String> unique = new TreeSet<>(visits);
System.out.println(unique);
Set<String> order = new LinkedHashSet<>(visits);
System.out.println(order);
Set<String> seen = new HashSet<>();
for (String v : visits) if (!seen.add(v)) System.out.print(v + " again; ");
System.out.println();`, UTIL), note: L('add повертає false, якщо елемент уже є.', 'add возвращает false, если элемент уже есть.', 'add returns false when the item exists.') },
        { title: L('Стек і черга', 'Стек и очередь', 'Stack and queue'), code: M(`Deque<String> undo = new ArrayDeque<>();
undo.push("draw line");
undo.push("fill red");
System.out.println("Undo: " + undo.pop());
Queue<String> printer = new ArrayDeque<>();
printer.offer("doc1");
printer.offer("doc2");
printer.offer("doc3");
while (!printer.isEmpty()) System.out.print(printer.poll() + " ");
System.out.println();`, UTIL), note: L('Один ArrayDeque — дві ролі.', 'Один ArrayDeque — две роли.', 'One ArrayDeque, two roles.') },
        { title: 'PriorityQueue', code: M(`PriorityQueue<Integer> pq = new PriorityQueue<>(List.of(30, 5, 18, 2));
while (!pq.isEmpty()) System.out.print(pq.poll() + " ");
System.out.println();
PriorityQueue<String> longest = new PriorityQueue<>(Comparator.comparingInt(String::length).reversed());
longest.addAll(List.of("cat", "hippopotamus", "zebra"));
System.out.println(longest.poll());`, UTIL), note: L('За замовчуванням — найменший першим.', 'По умолчанию — наименьший первым.', 'Smallest first by default.') }
      ],
      task: {
        text: L('Служба підтримки отримує звернення <code>"Ira:3"</code>, <code>"Max:1"</code>, <code>"Ola:2"</code>, <code>"Ira:1"</code>, <code>"Kira:3"</code> (ім’я:терміновість, 1 — найтерміновіше). Через <code>PriorityQueue</code> обробі їх від найтерміновішого (при рівній — за порядком надходження) і виведи <code>Max (1)</code>, … Потім через <code>TreeSet</code> виведи унікальних клієнтів: <code>Clients: [Ira, Kira, Max, Ola]</code>.', 'Служба поддержки получает обращения <code>"Ira:3"</code>, <code>"Max:1"</code>, <code>"Ola:2"</code>, <code>"Ira:1"</code>, <code>"Kira:3"</code> (имя:срочность, 1 — самое срочное). С помощью <code>PriorityQueue</code> обработай их от самого срочного (при равной — по порядку поступления) и выведи <code>Max (1)</code>, … Затем через <code>TreeSet</code> выведи уникальных клиентов: <code>Clients: [Ira, Kira, Max, Ola]</code>.', 'A help desk gets tickets <code>"Ira:3"</code>, <code>"Max:1"</code>, <code>"Ola:2"</code>, <code>"Ira:1"</code>, <code>"Kira:3"</code> (name:urgency, 1 = most urgent). Use a <code>PriorityQueue</code> to handle them most urgent first (ties in arrival order) and print <code>Max (1)</code>, … Then use a <code>TreeSet</code> to print unique clients: <code>Clients: [Ira, Kira, Max, Ola]</code>.'),
        how: [L('Збережи кожне звернення як <code>int[]{urgency, order}</code> або record і порівнюй спершу за терміновістю, потім за номером.', 'Сохрани каждое обращение как <code>int[]{urgency, order}</code> или record и сравнивай сначала по срочности, затем по номеру.', 'Store each ticket as a record (or <code>int[]{urgency, order}</code>) and compare by urgency, then by arrival index.'), L('<code>Comparator.comparingInt(Ticket::urgency).thenComparingInt(Ticket::order)</code>', '<code>Comparator.comparingInt(Ticket::urgency).thenComparingInt(Ticket::order)</code>', '<code>Comparator.comparingInt(Ticket::urgency).thenComparingInt(Ticket::order)</code>')],
        starter: M(`String[] raw = {"Ira:3", "Max:1", "Ola:2", "Ira:1", "Kira:3"};
// PriorityQueue і TreeSet`, UTIL, null, `record Ticket(String name, int urgency, int order) {}`),
        solution: M(`String[] raw = {"Ira:3", "Max:1", "Ola:2", "Ira:1", "Kira:3"};
PriorityQueue<Ticket> pq = new PriorityQueue<>(
    Comparator.comparingInt(Ticket::urgency).thenComparingInt(Ticket::order));
Set<String> clients = new TreeSet<>();
for (int i = 0; i < raw.length; i++) {
  String[] parts = raw[i].split(":");
  pq.offer(new Ticket(parts[0], Integer.parseInt(parts[1]), i));
  clients.add(parts[0]);
}
while (!pq.isEmpty()) {
  Ticket t = pq.poll();
  System.out.println(t.name() + " (" + t.urgency() + ")");
}
System.out.println("Clients: " + clients);`, UTIL, null, `record Ticket(String name, int urgency, int order) {}`),
        hint: L('Порядок: Max (1), Ira (1), Ola (2), Ira (3), Kira (3).', 'Порядок: Max (1), Ira (1), Ola (2), Ira (3), Kira (3).', 'Order: Max (1), Ira (1), Ola (2), Ira (3), Kira (3).'),
        expected: 'Max (1)\nIra (1)\nOla (2)\nIra (3)\nKira (3)\nClients: [Ira, Kira, Max, Ola]',
        must: /PriorityQueue[\s\S]*TreeSet|TreeSet[\s\S]*PriorityQueue/
      },
      quiz: { q: L('Яка множина зберігає елементи відсортованими?', 'Какое множество хранит элементы отсортированными?', 'Which set keeps items sorted?'), options: ['HashSet', 'TreeSet', 'LinkedHashSet'], answer: 1, explain: L('TreeSet — дерево пошуку, завжди впорядковане.', 'TreeSet — дерево поиска, всегда упорядочено.', 'TreeSet is a search tree, always ordered.') },
      ref: [{ code: 'HashSet / TreeSet / LinkedHashSet', d: L('множини', 'множества', 'sets') }, { code: 'ArrayDeque: push pop / offer poll peek', d: L('стек і черга', 'стек и очередь', 'stack and queue') }, { code: 'new PriorityQueue<>(comparator)', d: L('черга з пріоритетом', 'очередь с приоритетом', 'priority queue') }]
    },
    {
      id: 'records', chapter: CH6,
      title: L('Records і незмінні дані', 'Records и неизменяемые данные', 'Records and immutable data'),
      theory: L(
        `<p><b>record</b> (Java 16+) — короткий спосіб оголосити клас, який просто зберігає дані:</p>
<pre class="inline-code">record Point(int x, int y) {}</pre>
<p>Цей один рядок автоматично створює: приватні <code>final</code> поля, конструктор, методи доступу <code>x()</code> і <code>y()</code>, а також правильні <code>equals</code>, <code>hashCode</code> і <code>toString</code> (<code>Point[x=1, y=2]</code>).</p>
<ul><li>Записи <b>незмінні</b>: замість зміни створюють новий — <code>p.withX(5)</code> пишуть самі як метод</li><li>Можна додавати методи й перевірку в <b>компактному конструкторі</b>:<br><code>record Age(int value) { Age { if (value &lt; 0) throw new IllegalArgumentException(); } }</code></li><li>Два записи з однаковими даними рівні: <code>new Point(1, 2).equals(new Point(1, 2))</code> → <code>true</code>, тож їх зручно класти в <code>HashSet</code> і використовувати як ключі <code>HashMap</code></li></ul>`,
        `<p><b>record</b> (Java 16+) — короткий способ объявить класс, который просто хранит данные:</p>
<pre class="inline-code">record Point(int x, int y) {}</pre>
<p>Эта одна строка автоматически создаёт: приватные <code>final</code> поля, конструктор, методы доступа <code>x()</code> и <code>y()</code>, а также правильные <code>equals</code>, <code>hashCode</code> и <code>toString</code> (<code>Point[x=1, y=2]</code>).</p>
<ul><li>Записи <b>неизменяемы</b>: вместо изменения создают новую — <code>p.withX(5)</code> пишут сами как метод</li><li>Можно добавлять методы и проверку в <b>компактном конструкторе</b>:<br><code>record Age(int value) { Age { if (value &lt; 0) throw new IllegalArgumentException(); } }</code></li><li>Две записи с одинаковыми данными равны: <code>new Point(1, 2).equals(new Point(1, 2))</code> → <code>true</code>, поэтому их удобно класть в <code>HashSet</code> и использовать как ключи <code>HashMap</code></li></ul>`,
        `<p>A <b>record</b> (Java 16+) is a short way to declare a class that just holds data:</p>
<pre class="inline-code">record Point(int x, int y) {}</pre>
<p>That one line automatically creates private <code>final</code> fields, a constructor, accessors <code>x()</code> and <code>y()</code>, plus correct <code>equals</code>, <code>hashCode</code> and <code>toString</code> (<code>Point[x=1, y=2]</code>).</p>
<ul><li>Records are <b>immutable</b>: instead of changing one you create a new one — write a <code>p.withX(5)</code> method yourself</li><li>You can add methods and validation in a <b>compact constructor</b>:<br><code>record Age(int value) { Age { if (value &lt; 0) throw new IllegalArgumentException(); } }</code></li><li>Two records with the same data are equal: <code>new Point(1, 2).equals(new Point(1, 2))</code> → <code>true</code>, so they work well in a <code>HashSet</code> and as <code>HashMap</code> keys</li></ul>`),
      why: L(`<p>Звичайний клас-«контейнер» для двох полів займав 30 рядків (поля, конструктор, геттери, equals, hashCode, toString), і в ньому легко помилитися. record робить те саме одним рядком і без помилок. А незмінність означає, що ніхто не змінить дані «за спиною» — це особливо важливо, коли об’єкт використовують у кількох місцях одночасно.</p>`,
        `<p>Обычный класс-«контейнер» для двух полей занимал 30 строк (поля, конструктор, геттеры, equals, hashCode, toString), и в нём легко ошибиться. record делает то же одной строкой и без ошибок. А неизменяемость значит, что никто не изменит данные «за спиной» — это особенно важно, когда объект используется в нескольких местах одновременно.</p>`,
        `<p>A plain “holder” class for two fields used to take 30 lines (fields, constructor, getters, equals, hashCode, toString) — easy to get wrong. A record does it in one line, correctly. Immutability means nobody changes the data behind your back — vital when one object is used in several places.</p>`),
      mistakes: L(`<ul><li>Методи доступу — <code>p.x()</code>, а не <code>p.getX()</code> чи <code>p.x</code>.</li><li>Змінити поле запису (<code>p.x = 5</code>) не можна — поля <code>final</code>.</li><li>Звичайні класи порівнюються через <code>equals</code> за <b>посиланням</b>, якщо не перевизначити; records — за даними.</li></ul>`,
        `<ul><li>Методы доступа — <code>p.x()</code>, а не <code>p.getX()</code> или <code>p.x</code>.</li><li>Изменить поле записи (<code>p.x = 5</code>) нельзя — поля <code>final</code>.</li><li>Обычные классы сравниваются через <code>equals</code> по <b>ссылке</b>, если не переопределить; records — по данным.</li></ul>`,
        `<ul><li>Accessors are <code>p.x()</code>, not <code>p.getX()</code> or <code>p.x</code>.</li><li>You can’t assign a record field (<code>p.x = 5</code>) — fields are <code>final</code>.</li><li>Plain classes compare by <b>reference</b> in <code>equals</code> unless overridden; records compare by data.</li></ul>`),
      examples: [
        { title: L('Основи', 'Основы', 'Basics'), code: M(`Point a = new Point(1, 2);
Point b = new Point(1, 2);
System.out.println(a);
System.out.println(a.x() + a.y());
System.out.println(a.equals(b) + " " + (a == b));
System.out.println(a.move(3, -1));`, null, null, `record Point(int x, int y) {
  Point move(int dx, int dy) { return new Point(x + dx, y + dy); }
}`), note: L('equals за даними, == за об’єктом.', 'equals по данным, == по объекту.', 'equals by data, == by object.') },
        { title: L('Перевірка даних', 'Проверка данных', 'Validation'), code: M(`System.out.println(new Score("Ira", 95));
try {
  new Score("Max", 140);
} catch (IllegalArgumentException e) {
  System.out.println("Error: " + e.getMessage());
}`, null, null, `record Score(String name, int value) {
  Score {
    if (value < 0 || value > 100) throw new IllegalArgumentException("score " + value);
  }
}`), note: L('Компактний конструктор без параметрів у дужках.', 'Компактный конструктор без параметров в скобках.', 'A compact constructor has no parameter list.') },
        { title: L('Ключі множини', 'Ключи множества', 'Set keys'), code: M(`Set<Cell> visited = new HashSet<>();
visited.add(new Cell(0, 0));
visited.add(new Cell(0, 1));
visited.add(new Cell(0, 0));
System.out.println(visited.size());
System.out.println(visited.contains(new Cell(0, 1)));`, UTIL, null, `record Cell(int row, int col) {}`), note: L('Однакові клітинки — один елемент множини.', 'Одинаковые клетки — один элемент множества.', 'Equal cells count once in the set.') }
      ],
      task: {
        text: L('Оголоси <code>record Money(int cents)</code> з перевіркою (від’ємні — <code>IllegalArgumentException("negative")</code>), методами <code>Money plus(Money o)</code> і <code>String show()</code> (формат <code>$12.05</code>). Виведи <code>new Money(1250).plus(new Money(755)).show()</code>, потім <code>new Money(300).equals(new Money(300))</code>, а потім спробуй створити <code>new Money(-1)</code> і виведи <code>Error: negative</code>.', 'Объяви <code>record Money(int cents)</code> с проверкой (отрицательные — <code>IllegalArgumentException("negative")</code>), методами <code>Money plus(Money o)</code> и <code>String show()</code> (формат <code>$12.05</code>). Выведи <code>new Money(1250).plus(new Money(755)).show()</code>, затем <code>new Money(300).equals(new Money(300))</code>, а потом попробуй создать <code>new Money(-1)</code> и выведи <code>Error: negative</code>.', 'Declare <code>record Money(int cents)</code> with validation (negative → <code>IllegalArgumentException("negative")</code>), methods <code>Money plus(Money o)</code> and <code>String show()</code> (format <code>$12.05</code>). Print <code>new Money(1250).plus(new Money(755)).show()</code>, then <code>new Money(300).equals(new Money(300))</code>, then try <code>new Money(-1)</code> and print <code>Error: negative</code>.'),
        how: [L('<code>show()</code>: <code>String.format("$%d.%02d", cents / 100, cents % 100)</code>.', '<code>show()</code>: <code>String.format("$%d.%02d", cents / 100, cents % 100)</code>.', '<code>show()</code>: <code>String.format("$%d.%02d", cents / 100, cents % 100)</code>.')],
        starter: M(`// виведи три рядки`, null, null, `record Money(int cents) {
}`),
        solution: M(`System.out.println(new Money(1250).plus(new Money(755)).show());
System.out.println(new Money(300).equals(new Money(300)));
try {
  new Money(-1);
} catch (IllegalArgumentException e) {
  System.out.println("Error: " + e.getMessage());
}`, null, null, `record Money(int cents) {
  Money {
    if (cents < 0) throw new IllegalArgumentException("negative");
  }

  Money plus(Money o) { return new Money(cents + o.cents); }

  String show() { return String.format("$%d.%02d", cents / 100, cents % 100); }
}`),
        hint: L('1250 + 755 = 2005 центів = <code>$20.05</code>.', '1250 + 755 = 2005 центов = <code>$20.05</code>.', '1250 + 755 = 2005 cents = <code>$20.05</code>.'),
        expected: '$20.05\ntrue\nError: negative',
        must: /record\s+Money/
      },
      quiz: { q: L('Як прочитати поле <code>x</code> у <code>record Point(int x, int y)</code>?', 'Как прочитать поле <code>x</code> в <code>record Point(int x, int y)</code>?', 'How do you read <code>x</code> in <code>record Point(int x, int y)</code>?'), options: ['p.getX()', 'p.x()', 'p.x'], answer: 1, explain: L('Метод доступу має ту саму назву, що й поле.', 'Метод доступа называется так же, как поле.', 'The accessor has the field’s name.') },
      ref: [{ code: 'record P(int x, int y) {}', d: 'record' }, { code: 'record A(int v) { A { if (v < 0) throw …; } }', d: L('компактний конструктор', 'компактный конструктор', 'compact constructor') }]
    }
  ], 'project-bank');

  Codry.steps('java', [
    {
      id: 'project-tournament', chapter: CH5, project: true,
      title: L('Проєкт: турнірна таблиця', 'Проект: турнирная таблица', 'Project: tournament table'),
      theory: L(
        `<p>Фінальний проєкт об’єднує все сучасне в Java: зчитаємо результати матчів і побудуємо турнірну таблицю, як у футбольній лізі чи кіберспорті.</p>
<ol><li><code>record Match(String home, String away, int hg, int ag)</code> — результат матчу</li><li><code>enum Result { WIN(3), DRAW(1), LOSS(0) }</code> — скільки очок дає результат</li><li>Клас <code>Team</code> зі статистикою: очки, перемоги, забиті й пропущені голи</li><li><code>Map&lt;String, Team&gt;</code> + <code>computeIfAbsent</code> — створює команду при першій появі</li><li>Сортування стрімом: очки ↓, різниця голів ↓, назва ↑</li><li>Форматований вивід через <code>printf</code>: <code>%-8s</code> — текст по лівому краю шириною 8</li></ol>`,
        `<p>Финальный проект объединяет всё современное в Java: считаем результаты матчей и построим турнирную таблицу, как в футбольной лиге или киберспорте.</p>
<ol><li><code>record Match(String home, String away, int hg, int ag)</code> — результат матча</li><li><code>enum Result { WIN(3), DRAW(1), LOSS(0) }</code> — сколько очков даёт результат</li><li>Класс <code>Team</code> со статистикой: очки, победы, забитые и пропущенные голы</li><li><code>Map&lt;String, Team&gt;</code> + <code>computeIfAbsent</code> — создаёт команду при первом появлении</li><li>Сортировка стримом: очки ↓, разница голов ↓, название ↑</li><li>Форматированный вывод через <code>printf</code>: <code>%-8s</code> — текст по левому краю шириной 8</li></ol>`,
        `<p>The final project brings modern Java together: read match results and build a league table, like football or esports.</p>
<ol><li><code>record Match(String home, String away, int hg, int ag)</code> — a match result</li><li><code>enum Result { WIN(3), DRAW(1), LOSS(0) }</code> — points per result</li><li>A <code>Team</code> class with stats: points, wins, goals for and against</li><li><code>Map&lt;String, Team&gt;</code> + <code>computeIfAbsent</code> — creates a team on first sight</li><li>Stream sorting: points ↓, goal difference ↓, name ↑</li><li>Formatted output with <code>printf</code>: <code>%-8s</code> — left-aligned text, width 8</li></ol>`),
      why: L(`<p>Чому стільки типів для простої таблиці? Кожен відповідає за одне: <code>Match</code> — незмінні факти, <code>Result</code> — правила нарахування очок, <code>Team</code> — накопичена статистика. Якщо ліга вирішить давати 2 очки за перемогу, змінюється лише одне число в enum, а не логіка в десяти місцях.</p>`,
        `<p>Почему столько типов для простой таблицы? Каждый отвечает за одно: <code>Match</code> — неизменяемые факты, <code>Result</code> — правила начисления очков, <code>Team</code> — накопленная статистика. Если лига решит давать 2 очка за победу, меняется лишь одно число в enum, а не логика в десяти местах.</p>`,
        `<p>Why so many types for a simple table? Each owns one thing: <code>Match</code> is immutable facts, <code>Result</code> the scoring rules, <code>Team</code> the accumulated stats. If the league switches to 2 points per win, one number in the enum changes — not logic in ten places.</p>`),
      mistakes: L(`<ul><li>Нараховувати очки лише господарям — гостьова команда теж грає матч.</li><li>Сортувати лише за очками — при рівних очках порядок випадковий.</li><li><code>map.get(name)</code> для нової команди дає <code>null</code> → <code>NullPointerException</code>; використовуй <code>computeIfAbsent</code>.</li></ul>`,
        `<ul><li>Начислять очки только хозяевам — гостевая команда тоже играет матч.</li><li>Сортировать только по очкам — при равных очках порядок случайный.</li><li><code>map.get(name)</code> для новой команды даёт <code>null</code> → <code>NullPointerException</code>; используй <code>computeIfAbsent</code>.</li></ul>`,
        `<ul><li>Scoring only the home team — the away team plays the match too.</li><li>Sorting by points alone — ties come out in random order.</li><li><code>map.get(name)</code> for a new team is <code>null</code> → <code>NullPointerException</code>; use <code>computeIfAbsent</code>.</li></ul>`),
      examples: [
        { title: 'computeIfAbsent', code: M(`Map<String, List<Integer>> goals = new TreeMap<>();
String[][] data = {{"Lions", "2"}, {"Eagles", "1"}, {"Lions", "3"}};
for (String[] d : data) {
  goals.computeIfAbsent(d[0], k -> new ArrayList<>()).add(Integer.parseInt(d[1]));
}
System.out.println(goals);`, UTIL), note: L('Список створюється лише для нового ключа.', 'Список создаётся только для нового ключа.', 'The list is created only for a new key.') },
        { title: L('Сортування за кількома полями', 'Сортировка по нескольким полям', 'Multi-field sort'), code: M(`List<Row> rows = new ArrayList<>(List.of(new Row("B", 6, 2), new Row("A", 6, 2), new Row("C", 7, -1)));
rows.sort(Comparator.comparingInt(Row::pts).reversed()
    .thenComparing(Comparator.comparingInt(Row::diff).reversed())
    .thenComparing(Row::name));
rows.forEach(System.out::println);`, UTIL, null, `record Row(String name, int pts, int diff) {}`), note: L('thenComparing — правило для рівних.', 'thenComparing — правило для равных.', 'thenComparing breaks ties.') },
        { title: 'printf', code: M(`System.out.printf("%-3s%-8s%4s%5s%n", "#", "Team", "Pts", "GD");
System.out.printf("%-3d%-8s%4d%+5d%n", 1, "Lions", 7, 4);
System.out.printf("%-3d%-8s%4d%+5d%n", 2, "Eagles", 4, -1);`), note: L('<code>%+d</code> завжди показує знак.', '<code>%+d</code> всегда показывает знак.', '<code>%+d</code> always shows the sign.') }
      ],
      task: {
        text: L(`Зчитай матчі зі stdin (уже задано) у форматі <code>Home Away 2 1</code> і побудуй таблицю. Перемога — 3 очки, нічия — 1. Порядок: очки ↓, різниця голів ↓, назва ↑. Формат рядка: <code>printf("%d. %-7s %2d pts  W%d  GD %+d%n", місце, назва, очки, перемоги, різниця)</code>. Наприкінці виведи <code>Top scorer team: …</code> — команду з найбільшою кількістю забитих голів.`,
          `Считай матчи из stdin (уже заданы) в формате <code>Home Away 2 1</code> и построй таблицу. Победа — 3 очка, ничья — 1. Порядок: очки ↓, разница голов ↓, название ↑. Формат строки: <code>printf("%d. %-7s %2d pts  W%d  GD %+d%n", место, название, очки, победы, разница)</code>. В конце выведи <code>Top scorer team: …</code> — команду с наибольшим количеством забитых голов.`,
          `Read matches from stdin (preset) as <code>Home Away 2 1</code> and build the table. Win = 3 points, draw = 1. Order: points ↓, goal difference ↓, name ↑. Row format: <code>printf("%d. %-7s %2d pts  W%d  GD %+d%n", place, name, points, wins, diff)</code>. Finally print <code>Top scorer team: …</code> — the team with the most goals scored.`),
        how: [L('Для кожного матчу онови обидві команди: <code>home.add(hg, ag)</code>, <code>away.add(ag, hg)</code>.', 'Для каждого матча обнови обе команды: <code>home.add(hg, ag)</code>, <code>away.add(ag, hg)</code>.', 'For each match update both teams: <code>home.add(hg, ag)</code>, <code>away.add(ag, hg)</code>.'), L('У <code>Team.add(for, against)</code> визначай Result і додавай <code>result.points</code>.', 'В <code>Team.add(for, against)</code> определяй Result и прибавляй <code>result.points</code>.', 'In <code>Team.add(for, against)</code> work out the Result and add <code>result.points</code>.')],
        starter: M(`Scanner in = new Scanner(System.in);
Map<String, Team> teams = new HashMap<>();
while (in.hasNext()) {
  String home = in.next(), away = in.next();
  int hg = in.nextInt(), ag = in.nextInt();
  // онови статистику
}
// відсортуй і виведи`, UTIL, null, `enum Result {
  WIN(3), DRAW(1), LOSS(0);
  final int points;
  Result(int p) { points = p; }
}

class Team {
  final String name;
  int points, wins, scored, conceded;
  Team(String name) { this.name = name; }
}`),
        solution: M(`Scanner in = new Scanner(System.in);
Map<String, Team> teams = new HashMap<>();
while (in.hasNext()) {
  String home = in.next(), away = in.next();
  int hg = in.nextInt(), ag = in.nextInt();
  teams.computeIfAbsent(home, Team::new).add(hg, ag);
  teams.computeIfAbsent(away, Team::new).add(ag, hg);
}
List<Team> table = teams.values().stream()
    .sorted(Comparator.comparingInt((Team t) -> t.points).reversed()
        .thenComparing(Comparator.comparingInt(Team::diff).reversed())
        .thenComparing(t -> t.name))
    .toList();
int place = 1;
for (Team t : table) {
  System.out.printf("%d. %-7s %2d pts  W%d  GD %+d%n", place++, t.name, t.points, t.wins, t.diff());
}
Team top = table.stream().max(Comparator.comparingInt((Team t) -> t.scored)).get();
System.out.println("Top scorer team: " + top.name);`, UTIL, null, `enum Result {
  WIN(3), DRAW(1), LOSS(0);
  final int points;
  Result(int p) { points = p; }
}

class Team {
  final String name;
  int points, wins, scored, conceded;
  Team(String name) { this.name = name; }

  void add(int forGoals, int against) {
    Result r = forGoals > against ? Result.WIN : forGoals == against ? Result.DRAW : Result.LOSS;
    points += r.points;
    if (r == Result.WIN) wins++;
    scored += forGoals;
    conceded += against;
  }

  int diff() { return scored - conceded; }
}`),
        stdin: 'Lions Eagles 2 1\nWolves Bears 0 0\nEagles Wolves 3 3\nBears Lions 1 4\nLions Wolves 1 1\nEagles Bears 2 0',
        hint: L('Lions: 7 очок, Eagles: 4, Wolves: 3, Bears: 1.', 'Lions: 7 очков, Eagles: 4, Wolves: 3, Bears: 1.', 'Lions: 7 points, Eagles: 4, Wolves: 3, Bears: 1.'),
        expected: '1. Lions    7 pts  W2  GD +4\n2. Eagles   4 pts  W1  GD +1\n3. Wolves   3 pts  W0  GD +0\n4. Bears    1 pts  W0  GD -5\nTop scorer team: Lions',
        must: /enum\s+Result[\s\S]*computeIfAbsent/
      },
      quiz: { q: L('Що робить <code>computeIfAbsent(key, Team::new)</code>?', 'Что делает <code>computeIfAbsent(key, Team::new)</code>?', 'What does <code>computeIfAbsent(key, Team::new)</code> do?'), options: [L('створює Team, якщо ключа ще немає, і повертає значення', 'создаёт Team, если ключа ещё нет, и возвращает значение', 'creates a Team if the key is missing and returns the value'), L('видаляє ключ', 'удаляет ключ', 'removes the key'), L('завжди створює нову Team', 'всегда создаёт новую Team', 'always creates a new Team')], answer: 0, explain: L('Наявне значення повертається без змін.', 'Существующее значение возвращается без изменений.', 'An existing value is returned untouched.') },
      ref: [{ code: 'map.computeIfAbsent(k, K::new)', d: L('створити за потреби', 'создать при необходимости', 'create on demand') }, { code: 'Comparator…reversed().thenComparing(…)', d: L('сортування за кількома полями', 'сортировка по нескольким полям', 'multi-field sort') }]
    }
  ]);
})();
