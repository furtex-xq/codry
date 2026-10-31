// C# — частина 2: рекурсія, форматування рядків, enum, struct, узагальнення, делегати й події, Stack/Queue/HashSet, проєкт «Банк».
// Код сумісний із C# 7 (Mono на Wandbox) і .NET 8 (запасний сервер).
(function () {
  const L = Codry.L;
  const CH6 = L('Глибше в C#', 'Глубже в C#', 'Deeper into C#');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');
  const IND = (s, n) => s.split('\n').map((l) => (l ? ' '.repeat(n) + l : l)).join('\n');
  const M = (body, o) => {
    o = o || {};
    return (o.using || 'using System;') + '\n\n' + (o.before ? o.before + '\n\n' : '') + 'class Program\n{\n' +
      (o.members ? IND(o.members, 2) + '\n\n' : '') + '  static void Main()\n  {\n' + IND(body, 4) + '\n  }\n}';
  };
  const COLL = 'using System;\nusing System.Collections.Generic;';
  const TEXT = 'using System;\nusing System.Text;';

  Codry.steps('csharp', [
    {
      id: 'recursion', chapter: CH6,
      title: L('Рекурсія', 'Рекурсия', 'Recursion'),
      theory: L(
        `<p><b>Рекурсивний метод</b> викликає сам себе для меншої задачі. У ньому завжди є <b>базовий випадок</b> (зупинка) і <b>рекурсивний крок</b>:</p>
<pre class="inline-code">static long Factorial(int n)
{
  if (n &lt;= 1) return 1;            // базовий випадок
  return n * Factorial(n - 1);     // крок
}</pre>
<p>Часто зручно передавати в рекурсію <b>індекс</b> — так метод обробляє масив чи рядок по одному елементу, не створюючи копій:</p>
<pre class="inline-code">static int Sum(int[] a, int i) =&gt; i == a.Length ? 0 : a[i] + Sum(a, i + 1);</pre>
<p>Рекурсія природна для дерев: папки з підпапками, меню, сцени в Unity (об’єкт містить дочірні об’єкти, а ті — свої).</p>`,
        `<p><b>Рекурсивный метод</b> вызывает сам себя для меньшей задачи. В нём всегда есть <b>базовый случай</b> (остановка) и <b>рекурсивный шаг</b>:</p>
<pre class="inline-code">static long Factorial(int n)
{
  if (n &lt;= 1) return 1;            // базовый случай
  return n * Factorial(n - 1);     // шаг
}</pre>
<p>Часто удобно передавать в рекурсию <b>индекс</b> — так метод обрабатывает массив или строку по одному элементу, не создавая копий:</p>
<pre class="inline-code">static int Sum(int[] a, int i) =&gt; i == a.Length ? 0 : a[i] + Sum(a, i + 1);</pre>
<p>Рекурсия естественна для деревьев: папки с подпапками, меню, сцены в Unity (объект содержит дочерние объекты, а те — свои).</p>`,
        `<p>A <b>recursive method</b> calls itself on a smaller problem. It always has a <b>base case</b> (stop) and a <b>recursive step</b>:</p>
<pre class="inline-code">static long Factorial(int n)
{
  if (n &lt;= 1) return 1;            // base case
  return n * Factorial(n - 1);     // step
}</pre>
<p>Passing an <b>index</b> is handy — the method processes an array or string one item at a time without copies:</p>
<pre class="inline-code">static int Sum(int[] a, int i) =&gt; i == a.Length ? 0 : a[i] + Sum(a, i + 1);</pre>
<p>Recursion fits trees naturally: folders with sub-folders, menus, Unity scenes (an object holds children, which hold their own).</p>`),
      why: L(`<p>У Unity, щоб знайти об’єкт десь глибоко в ієрархії сцени, пишуть рекурсивний пошук: «перевір себе, потім кожного нащадка». Циклом це незручно, бо глибина невідома. Рекурсія описує такі задачі коротко й зрозуміло.</p>`,
        `<p>В Unity, чтобы найти объект где-то глубоко в иерархии сцены, пишут рекурсивный поиск: «проверь себя, потом каждого потомка». Циклом это неудобно, потому что глубина неизвестна. Рекурсия описывает такие задачи коротко и понятно.</p>`,
        `<p>In Unity, finding an object deep in a scene hierarchy is a recursive search: “check myself, then each child”. A loop is awkward because the depth is unknown. Recursion states such problems briefly and clearly.</p>`),
      mistakes: L(`<ul><li>Немає базового випадку — <code>StackOverflowException</code>, і програма падає без шансу перехопити.</li><li>Крок не зменшує задачу — та сама нескінченна рекурсія.</li><li><code>int</code> переповнюється для великих факторіалів — використовуй <code>long</code>.</li></ul>`,
        `<ul><li>Нет базового случая — <code>StackOverflowException</code>, и программа падает без шанса перехватить.</li><li>Шаг не уменьшает задачу — та же бесконечная рекурсия.</li><li><code>int</code> переполняется для больших факториалов — используй <code>long</code>.</li></ul>`,
        `<ul><li>No base case — <code>StackOverflowException</code>, which can’t even be caught.</li><li>A step that doesn’t shrink the problem — same infinite recursion.</li><li><code>int</code> overflows for big factorials — use <code>long</code>.</li></ul>`),
      examples: [
        { title: L('Факторіал і степінь', 'Факториал и степень', 'Factorial and power'), code: M(`Console.WriteLine(Factorial(10));
Console.WriteLine(Power(2, 16));`, { members: `static long Factorial(int n)
{
  if (n <= 1) return 1;
  return n * Factorial(n - 1);
}

static long Power(long b, int e)
{
  if (e == 0) return 1;
  return b * Power(b, e - 1);
}` }), note: L('Кожен виклик чекає на результат меншого.', 'Каждый вызов ждёт результат меньшего.', 'Each call waits for the smaller one.') },
        { title: L('Обхід дерева', 'Обход дерева', 'Tree walk'), code: M(`var root = new Node("Scene");
var player = new Node("Player");
player.Children.Add(new Node("Sword"));
root.Children.Add(player);
root.Children.Add(new Node("Enemy"));
Print(root, 0);`, { using: COLL, before: `class Node
{
  public string Name;
  public List<Node> Children = new List<Node>();
  public Node(string name) { Name = name; }
}`, members: `static void Print(Node n, int depth)
{
  Console.WriteLine(new string(' ', depth * 2) + n.Name);
  foreach (var c in n.Children) Print(c, depth + 1);
}` }), note: L('Як ієрархія сцени в Unity.', 'Как иерархия сцены в Unity.', 'Like a Unity scene hierarchy.') },
        { title: L('Двійковий запис', 'Двоичная запись', 'Binary'), code: M(`Console.WriteLine(ToBinary(13));
Console.WriteLine(ToBinary(255));`, { members: `static string ToBinary(int n)
{
  if (n < 2) return n.ToString();
  return ToBinary(n / 2) + (n % 2);
}` }), note: L('Остання цифра — остача, решта — рекурсія.', 'Последняя цифра — остаток, остальное — рекурсия.', 'The last digit is the remainder; the rest is recursion.') }
      ],
      task: {
        text: L('Напиши рекурсивні <code>static int Sum(int[] a, int i)</code> (сума елементів від індексу i) і <code>static string Reverse(string s)</code>. Виведи <code>Sum(new[] { 3, 5, 7, 9 }, 0)</code> і <code>Reverse("Unity")</code>.', 'Напиши рекурсивные <code>static int Sum(int[] a, int i)</code> (сумма элементов от индекса i) и <code>static string Reverse(string s)</code>. Выведи <code>Sum(new[] { 3, 5, 7, 9 }, 0)</code> и <code>Reverse("Unity")</code>.', 'Write recursive <code>static int Sum(int[] a, int i)</code> (sum from index i) and <code>static string Reverse(string s)</code>. Print <code>Sum(new[] { 3, 5, 7, 9 }, 0)</code> and <code>Reverse("Unity")</code>.'),
        how: [L('Sum: якщо <code>i == a.Length</code> — 0, інакше <code>a[i] + Sum(a, i + 1)</code>.', 'Sum: если <code>i == a.Length</code> — 0, иначе <code>a[i] + Sum(a, i + 1)</code>.', 'Sum: if <code>i == a.Length</code> return 0, else <code>a[i] + Sum(a, i + 1)</code>.'), L('Reverse: <code>Reverse(s.Substring(1)) + s[0]</code>.', 'Reverse: <code>Reverse(s.Substring(1)) + s[0]</code>.', 'Reverse: <code>Reverse(s.Substring(1)) + s[0]</code>.')],
        starter: M('// виклич Sum і Reverse', { members: '// напиши Sum і Reverse' }),
        solution: M(`Console.WriteLine(Sum(new[] { 3, 5, 7, 9 }, 0));
Console.WriteLine(Reverse("Unity"));`, { members: `static int Sum(int[] a, int i)
{
  if (i == a.Length) return 0;
  return a[i] + Sum(a, i + 1);
}

static string Reverse(string s)
{
  if (s.Length <= 1) return s;
  return Reverse(s.Substring(1)) + s[0];
}` }),
        hint: L('Очікувано: <code>24</code> і <code>ytinU</code>.', 'Ожидается: <code>24</code> и <code>ytinU</code>.', 'Expected: <code>24</code> and <code>ytinU</code>.'),
        expected: '24\nytinU',
        must: /Sum\s*\(\s*a\s*,\s*i\s*\+\s*1\s*\)[\s\S]*Reverse\s*\(/
      },
      quiz: { q: L('Яка помилка виникає при нескінченній рекурсії в C#?', 'Какая ошибка возникает при бесконечной рекурсии в C#?', 'Which error does infinite recursion cause in C#?'), options: ['StackOverflowException', 'NullReferenceException', 'IndexOutOfRangeException'], answer: 0, explain: L('Стек викликів переповнюється.', 'Стек вызовов переполняется.', 'The call stack overflows.') },
      ref: [{ code: 'static T F(n) { if (base) return …; return … F(smaller); }', d: L('шаблон рекурсії', 'шаблон рекурсии', 'recursion pattern') }]
    },
    {
      id: 'strings-format', chapter: CH6,
      title: L('Форматування рядків і StringBuilder', 'Форматирование строк и StringBuilder', 'String formatting and StringBuilder'),
      theory: L(
        `<p>В інтерполяції можна задавати <b>ширину</b> й <b>формат</b>:</p>
<table class="mini"><tr><td><code>{name,-10}</code></td><td>ширина 10, вирівнювання ліворуч</td></tr><tr><td><code>{price,6}</code></td><td>ширина 6, праворуч</td></tr><tr><td><code>{x:F2}</code></td><td>2 знаки після коми</td></tr><tr><td><code>{n:D3}</code></td><td>доповнити нулями: 007</td></tr><tr><td><code>{p:P0}</code></td><td>відсотки</td></tr></table>
<p>Корисні методи рядків: <code>PadLeft/PadRight</code>, <code>Trim</code>, <code>Split</code>, <code>string.Join</code>, <code>new string('-', 20)</code>, <code>IndexOf</code>, <code>StartsWith</code>.</p>
<p>Рядки в C# незмінні, тому для збирання великого тексту в циклі використовують <b>StringBuilder</b> (<code>using System.Text;</code>):</p>
<pre class="inline-code">var sb = new StringBuilder();
for (int i = 1; i &lt;= 3; i++) sb.Append(i).Append(' ');
Console.WriteLine(sb.ToString().Trim());</pre>`,
        `<p>В интерполяции можно задавать <b>ширину</b> и <b>формат</b>:</p>
<table class="mini"><tr><td><code>{name,-10}</code></td><td>ширина 10, выравнивание влево</td></tr><tr><td><code>{price,6}</code></td><td>ширина 6, вправо</td></tr><tr><td><code>{x:F2}</code></td><td>2 знака после запятой</td></tr><tr><td><code>{n:D3}</code></td><td>дополнить нулями: 007</td></tr><tr><td><code>{p:P0}</code></td><td>проценты</td></tr></table>
<p>Полезные методы строк: <code>PadLeft/PadRight</code>, <code>Trim</code>, <code>Split</code>, <code>string.Join</code>, <code>new string('-', 20)</code>, <code>IndexOf</code>, <code>StartsWith</code>.</p>
<p>Строки в C# неизменяемы, поэтому для сборки большого текста в цикле используют <b>StringBuilder</b> (<code>using System.Text;</code>):</p>
<pre class="inline-code">var sb = new StringBuilder();
for (int i = 1; i &lt;= 3; i++) sb.Append(i).Append(' ');
Console.WriteLine(sb.ToString().Trim());</pre>`,
        `<p>Interpolation can set <b>width</b> and <b>format</b>:</p>
<table class="mini"><tr><td><code>{name,-10}</code></td><td>width 10, left-aligned</td></tr><tr><td><code>{price,6}</code></td><td>width 6, right-aligned</td></tr><tr><td><code>{x:F2}</code></td><td>2 decimal places</td></tr><tr><td><code>{n:D3}</code></td><td>zero-padded: 007</td></tr><tr><td><code>{p:P0}</code></td><td>percent</td></tr></table>
<p>Handy string methods: <code>PadLeft/PadRight</code>, <code>Trim</code>, <code>Split</code>, <code>string.Join</code>, <code>new string('-', 20)</code>, <code>IndexOf</code>, <code>StartsWith</code>.</p>
<p>C# strings are immutable, so building big text in a loop uses <b>StringBuilder</b> (<code>using System.Text;</code>):</p>
<pre class="inline-code">var sb = new StringBuilder();
for (int i = 1; i &lt;= 3; i++) sb.Append(i).Append(' ');
Console.WriteLine(sb.ToString().Trim());</pre>`),
      why: L(`<p>Таблиця рекордів, чек у магазині гри, звіт для вчителя — скрізь потрібні рівні колонки. Ширина в інтерполяції робить це одним символом, без підрахунку пробілів вручну. А StringBuilder рятує від «підвисань», коли текст збирається з тисяч шматків.</p>`,
        `<p>Таблица рекордов, чек в магазине игры, отчёт для учителя — везде нужны ровные колонки. Ширина в интерполяции делает это одним символом, без подсчёта пробелов вручную. А StringBuilder спасает от «подвисаний», когда текст собирается из тысяч кусков.</p>`,
        `<p>High-score tables, shop receipts, teacher reports all need neat columns. Width in interpolation does it with one character — no counting spaces. StringBuilder prevents slowdowns when text is built from thousands of pieces.</p>`),
      mistakes: L(`<ul><li>Плутати знак: <code>{x,10}</code> — праворуч, <code>{x,-10}</code> — ліворуч.</li><li>Якщо текст довший за ширину, він не обрізається — колонка «з’їде».</li><li><code>{x:F2}</code> використовує роздільник вашої мови (кома або крапка).</li></ul>`,
        `<ul><li>Путать знак: <code>{x,10}</code> — вправо, <code>{x,-10}</code> — влево.</li><li>Если текст длиннее ширины, он не обрезается — колонка «съедет».</li><li><code>{x:F2}</code> использует разделитель вашего языка (запятая или точка).</li></ul>`,
        `<ul><li>Mixing up the sign: <code>{x,10}</code> is right, <code>{x,-10}</code> is left.</li><li>Text longer than the width isn’t cut — the column shifts.</li><li><code>{x:F2}</code> uses your locale’s decimal separator (comma or dot).</li></ul>`),
      examples: [
        { title: L('Колонки', 'Колонки', 'Columns'), code: M(`string[] names = { "Kira", "Maksym", "Ola" };
int[] scores = { 450, 1200, 75 };
for (int i = 0; i < names.Length; i++)
  Console.WriteLine($"{i + 1:D2}. {names[i],-8}{scores[i],6}");`), note: L('D2 — номер з нулем попереду.', 'D2 — номер с нулём впереди.', 'D2 pads the number with a zero.') },
        { title: 'StringBuilder', code: M(`var sb = new StringBuilder();
for (int row = 1; row <= 4; row++)
{
  sb.Append(new string(' ', 4 - row));
  sb.Append(new string('*', row * 2 - 1));
  sb.AppendLine();
}
Console.Write(sb.ToString());`, { using: TEXT }), note: L('Ялинка з одного буфера.', 'Ёлка из одного буфера.', 'A tree built in one buffer.') },
        { title: L('Методи рядків', 'Методы строк', 'String methods'), code: M(`string line = "  Kira, Max ,Ira  ";
string[] parts = line.Trim().Split(',');
for (int i = 0; i < parts.Length; i++) parts[i] = parts[i].Trim().ToUpper();
Console.WriteLine(string.Join(" | ", parts));
Console.WriteLine("Codry".PadLeft(8, '.'));
Console.WriteLine("level 7".StartsWith("level"));`), note: L('Trim прибирає пробіли по краях.', 'Trim убирает пробелы по краям.', 'Trim removes surrounding spaces.') }
      ],
      task: {
        text: L('Виведи чек: заголовок <code>Item      Price</code>, потім рядки предметів (назва шириною 8 ліворуч, ціна шириною 7 праворуч) для <code>Sword 150</code>, <code>Shield 90</code>, <code>Potion 25</code>, а наприкінці рядок <code>Total</code> у тому самому форматі (265). Збирай текст у <code>StringBuilder</code>.', 'Выведи чек: заголовок <code>Item      Price</code>, затем строки предметов (название шириной 8 влево, цена шириной 7 вправо) для <code>Sword 150</code>, <code>Shield 90</code>, <code>Potion 25</code>, а в конце строку <code>Total</code> в том же формате (265). Собирай текст в <code>StringBuilder</code>.', 'Print a receipt: the header <code>Item      Price</code>, then item rows (name width 8 left-aligned, price width 7 right-aligned) for <code>Sword 150</code>, <code>Shield 90</code>, <code>Potion 25</code>, and finally a <code>Total</code> row in the same format (265). Build it in a <code>StringBuilder</code>.'),
        how: [L('Рядок: <code>sb.AppendLine($"{name,-8}{price,7}");</code>', 'Строка: <code>sb.AppendLine($"{name,-8}{price,7}");</code>', 'A row: <code>sb.AppendLine($"{name,-8}{price,7}");</code>'), L('Заголовок можна зібрати так само: <code>$"{"Item",-8}{"Price",7}"</code>.', 'Заголовок можно собрать так же: <code>$"{"Item",-8}{"Price",7}"</code>.', 'Build the header the same way: <code>$"{"Item",-8}{"Price",7}"</code>.')],
        starter: M(`string[] items = { "Sword", "Shield", "Potion" };
int[] prices = { 150, 90, 25 };
var sb = new StringBuilder();
// чек`, { using: TEXT }),
        solution: M(`string[] items = { "Sword", "Shield", "Potion" };
int[] prices = { 150, 90, 25 };
var sb = new StringBuilder();
sb.AppendLine($"{"Item",-8}{"Price",7}");
int total = 0;
for (int i = 0; i < items.Length; i++)
{
  sb.AppendLine($"{items[i],-8}{prices[i],7}");
  total += prices[i];
}
sb.AppendLine($"{"Total",-8}{total,7}");
Console.Write(sb.ToString());`, { using: TEXT }),
        hint: L('Між <code>Item</code> і <code>Price</code> рівно 6 пробілів: 4 доповнюють «Item» до 8, ще 2 — «Price» до 7.', 'Между <code>Item</code> и <code>Price</code> ровно 6 пробелов: 4 дополняют «Item» до 8, ещё 2 — «Price» до 7.', 'Exactly 6 spaces between <code>Item</code> and <code>Price</code>: 4 pad “Item” to 8, 2 more pad “Price” to 7.'),
        expected: 'Item      Price\nSword       150\nShield       90\nPotion       25\nTotal       265',
        must: /StringBuilder[\s\S]*,-8\}/
      },
      quiz: { q: L('Що виведе <code>$"{7:D3}"</code>?', 'Что выведет <code>$"{7:D3}"</code>?', 'What does <code>$"{7:D3}"</code> print?'), options: ['7', '007', '7.000'], answer: 1, explain: L('D3 — щонайменше 3 цифри, доповнені нулями.', 'D3 — минимум 3 цифры, дополненные нулями.', 'D3 means at least 3 digits, zero-padded.') },
      ref: [{ code: '{x,-8} {x,7} {x:F2} {n:D3}', d: L('ширина й формат', 'ширина и формат', 'width and format') }, { code: 'new StringBuilder().Append(x).AppendLine()', d: 'StringBuilder' }]
    },
    {
      id: 'enums', chapter: CH6,
      title: L('Перелічення enum', 'Перечисления enum', 'Enums'),
      theory: L(
        `<p><b>enum</b> — тип з фіксованим набором іменованих значень:</p>
<pre class="inline-code">enum Weather { Sunny, Rainy, Snowy }

Weather w = Weather.Rainy;
switch (w)
{
  case Weather.Sunny: Console.WriteLine("Sunglasses"); break;
  case Weather.Rainy: Console.WriteLine("Umbrella"); break;
  default: Console.WriteLine("Jacket"); break;
}</pre>
<ul><li>Під капотом це числа: <code>(int)Weather.Rainy</code> = 1, а <code>(Weather)2</code> = Snowy</li><li><code>w.ToString()</code> — назва, <code>Enum.Parse&lt;Weather&gt;</code> або <code>(Weather)Enum.Parse(typeof(Weather), "Snowy")</code> — значення за назвою</li><li><code>Enum.GetValues(typeof(Weather))</code> — усі значення для циклу</li><li>Можна задати числа явно: <code>enum Rarity { Common = 1, Rare = 5, Epic = 20 }</code></li></ul>`,
        `<p><b>enum</b> — тип с фиксированным набором именованных значений:</p>
<pre class="inline-code">enum Weather { Sunny, Rainy, Snowy }

Weather w = Weather.Rainy;
switch (w)
{
  case Weather.Sunny: Console.WriteLine("Sunglasses"); break;
  case Weather.Rainy: Console.WriteLine("Umbrella"); break;
  default: Console.WriteLine("Jacket"); break;
}</pre>
<ul><li>Под капотом это числа: <code>(int)Weather.Rainy</code> = 1, а <code>(Weather)2</code> = Snowy</li><li><code>w.ToString()</code> — название, <code>(Weather)Enum.Parse(typeof(Weather), "Snowy")</code> — значение по названию</li><li><code>Enum.GetValues(typeof(Weather))</code> — все значения для цикла</li><li>Можно задать числа явно: <code>enum Rarity { Common = 1, Rare = 5, Epic = 20 }</code></li></ul>`,
        `<p>An <b>enum</b> is a type with a fixed set of named values:</p>
<pre class="inline-code">enum Weather { Sunny, Rainy, Snowy }

Weather w = Weather.Rainy;
switch (w)
{
  case Weather.Sunny: Console.WriteLine("Sunglasses"); break;
  case Weather.Rainy: Console.WriteLine("Umbrella"); break;
  default: Console.WriteLine("Jacket"); break;
}</pre>
<ul><li>Underneath they’re numbers: <code>(int)Weather.Rainy</code> is 1 and <code>(Weather)2</code> is Snowy</li><li><code>w.ToString()</code> gives the name; <code>(Weather)Enum.Parse(typeof(Weather), "Snowy")</code> gets a value by name</li><li><code>Enum.GetValues(typeof(Weather))</code> lists every value for a loop</li><li>Numbers can be explicit: <code>enum Rarity { Common = 1, Rare = 5, Epic = 20 }</code></li></ul>`),
      why: L(`<p>У Unity enum’и всюди: <code>KeyCode.Space</code>, <code>ForceMode.Impulse</code>, стани ворога. Вони захищають від друкарських помилок (компілятор не знає <code>Weather.Rainyy</code>), а в інспекторі Unity enum показується зручним списком.</p>`,
        `<p>В Unity enum’ы повсюду: <code>KeyCode.Space</code>, <code>ForceMode.Impulse</code>, состояния врага. Они защищают от опечаток (компилятор не знает <code>Weather.Rainyy</code>), а в инспекторе Unity enum показывается удобным списком.</p>`,
        `<p>Unity is full of enums: <code>KeyCode.Space</code>, <code>ForceMode.Impulse</code>, enemy states. They block typos (the compiler rejects <code>Weather.Rainyy</code>), and Unity’s inspector shows enums as a handy dropdown.</p>`),
      mistakes: L(`<ul><li>Забутий <code>break</code> у <code>case</code> — помилка компіляції в C#.</li><li><code>(Weather)99</code> не викликає помилки — з’явиться «невідоме» значення; перевіряй <code>Enum.IsDefined</code>.</li><li><code>Enum.Parse</code> з неіснуючою назвою кидає <code>ArgumentException</code>.</li></ul>`,
        `<ul><li>Забытый <code>break</code> в <code>case</code> — ошибка компиляции в C#.</li><li><code>(Weather)99</code> не вызывает ошибку — появится «неизвестное» значение; проверяй <code>Enum.IsDefined</code>.</li><li><code>Enum.Parse</code> с несуществующим названием бросает <code>ArgumentException</code>.</li></ul>`,
        `<ul><li>A missing <code>break</code> in a <code>case</code> is a compile error in C#.</li><li><code>(Weather)99</code> doesn’t fail — you get an “unknown” value; check <code>Enum.IsDefined</code>.</li><li><code>Enum.Parse</code> with a bad name throws <code>ArgumentException</code>.</li></ul>`),
      examples: [
        { title: L('Перебір і числа', 'Перебор и числа', 'Loop and numbers'), code: M(`foreach (Weather w in Enum.GetValues(typeof(Weather)))
  Console.WriteLine($"{(int)w}: {w}");
Weather x = (Weather)2;
Console.WriteLine(x);`, { before: 'enum Weather { Sunny, Rainy, Snowy }' }), note: L('Значення нумеруються з нуля.', 'Значения нумеруются с нуля.', 'Values are numbered from zero.') },
        { title: L('Явні числа', 'Явные числа', 'Explicit numbers'), code: M(`Rarity r = Rarity.Epic;
Console.WriteLine($"{r} x{(int)r}");
var parsed = (Rarity)Enum.Parse(typeof(Rarity), "Rare");
Console.WriteLine((int)parsed);
Console.WriteLine(Enum.IsDefined(typeof(Rarity), 7));`, { before: 'enum Rarity { Common = 1, Rare = 5, Epic = 20 }' }), note: L('Число можна використовувати як множник.', 'Число можно использовать как множитель.', 'The number can be a multiplier.') },
        { title: L('Стан ворога', 'Состояние врага', 'Enemy state'), code: M(`State s = State.Patrol;
foreach (int dist in new[] { 9, 4, 1, 6 })
{
  if (dist <= 1) s = State.Attack;
  else if (dist <= 5) s = State.Chase;
  else s = State.Patrol;
  Console.WriteLine($"{dist} -> {s}");
}`, { before: 'enum State { Patrol, Chase, Attack }' }), note: L('Машина станів на enum.', 'Машина состояний на enum.', 'A state machine on an enum.') }
      ],
      task: {
        text: L('Оголоси <code>enum Day { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }</code> і метод <code>static bool IsWeekend(Day d)</code>. Пройди всі дні через <code>Enum.GetValues</code> і виведи <code>Monday: school</code> … <code>Saturday: rest</code>, а наприкінці <code>Weekend days: 2</code>.', 'Объяви <code>enum Day { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }</code> и метод <code>static bool IsWeekend(Day d)</code>. Пройди все дни через <code>Enum.GetValues</code> и выведи <code>Monday: school</code> … <code>Saturday: rest</code>, а в конце <code>Weekend days: 2</code>.', 'Declare <code>enum Day { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }</code> and <code>static bool IsWeekend(Day d)</code>. Loop all days with <code>Enum.GetValues</code> and print <code>Monday: school</code> … <code>Saturday: rest</code>, then <code>Weekend days: 2</code>.'),
        how: [L('<code>return d == Day.Saturday || d == Day.Sunday;</code>', '<code>return d == Day.Saturday || d == Day.Sunday;</code>', '<code>return d == Day.Saturday || d == Day.Sunday;</code>'), L('<code>foreach (Day d in Enum.GetValues(typeof(Day)))</code>', '<code>foreach (Day d in Enum.GetValues(typeof(Day)))</code>', '<code>foreach (Day d in Enum.GetValues(typeof(Day)))</code>')],
        starter: M('// пройди всі дні', { before: 'enum Day { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }', members: '// IsWeekend' }),
        solution: M(`int weekend = 0;
foreach (Day d in Enum.GetValues(typeof(Day)))
{
  bool rest = IsWeekend(d);
  if (rest) weekend++;
  Console.WriteLine($"{d}: {(rest ? "rest" : "school")}");
}
Console.WriteLine($"Weekend days: {weekend}");`, { before: 'enum Day { Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday }', members: `static bool IsWeekend(Day d)
{
  return d == Day.Saturday || d == Day.Sunday;
}` }),
        hint: L('Сім рядків днів і підсумок.', 'Семь строк дней и итог.', 'Seven day lines and a total.'),
        expected: 'Monday: school\nTuesday: school\nWednesday: school\nThursday: school\nFriday: school\nSaturday: rest\nSunday: rest\nWeekend days: 2',
        must: /Enum\.GetValues[\s\S]*IsWeekend/
      },
      quiz: { q: L('Чому дорівнює <code>(int)Weather.Sunny</code> у <code>enum Weather { Sunny, Rainy }</code>?', 'Чему равно <code>(int)Weather.Sunny</code> в <code>enum Weather { Sunny, Rainy }</code>?', 'What is <code>(int)Weather.Sunny</code> in <code>enum Weather { Sunny, Rainy }</code>?'), options: ['0', '1', '-1'], answer: 0, explain: L('Нумерація починається з нуля.', 'Нумерация начинается с нуля.', 'Numbering starts at zero.') },
      ref: [{ code: 'enum E { A, B = 5 }', d: 'enum' }, { code: 'Enum.GetValues(typeof(E))  (E)Enum.Parse(typeof(E), "A")', d: L('утиліти', 'утилиты', 'helpers') }]
    },
    {
      id: 'structs', chapter: CH6,
      title: L('struct: значення проти посилань', 'struct: значения против ссылок', 'struct: values vs references'),
      theory: L(
        `<p>У C# є два види типів:</p>
<ul><li><b>Типи-значення</b> (<code>int</code>, <code>double</code>, <code>bool</code>, <b>struct</b>): змінна містить самі дані. Присвоєння <b>копіює</b> їх.</li><li><b>Типи-посилання</b> (<b>class</b>, масиви, <code>string</code>, <code>List</code>): змінна містить посилання на об’єкт. Присвоєння копіює лише <b>посилання</b> — дві змінні дивляться на один об’єкт.</li></ul>
<pre class="inline-code">struct PointS { public int X, Y; }
class  PointC { public int X, Y; }

var a = new PointS { X = 1 }; var b = a; b.X = 10;   // a.X = 1
var c = new PointC { X = 1 }; var d = c; d.X = 10;   // c.X = 10!</pre>
<p><b>struct</b> підходить для маленьких незалежних значень: координати, колір, розмір. У Unity <code>Vector3</code>, <code>Color</code>, <code>Quaternion</code> — саме struct.</p>`,
        `<p>В C# есть два вида типов:</p>
<ul><li><b>Типы-значения</b> (<code>int</code>, <code>double</code>, <code>bool</code>, <b>struct</b>): переменная содержит сами данные. Присваивание <b>копирует</b> их.</li><li><b>Типы-ссылки</b> (<b>class</b>, массивы, <code>string</code>, <code>List</code>): переменная содержит ссылку на объект. Присваивание копирует только <b>ссылку</b> — две переменные смотрят на один объект.</li></ul>
<pre class="inline-code">struct PointS { public int X, Y; }
class  PointC { public int X, Y; }

var a = new PointS { X = 1 }; var b = a; b.X = 10;   // a.X = 1
var c = new PointC { X = 1 }; var d = c; d.X = 10;   // c.X = 10!</pre>
<p><b>struct</b> подходит для маленьких независимых значений: координаты, цвет, размер. В Unity <code>Vector3</code>, <code>Color</code>, <code>Quaternion</code> — именно struct.</p>`,
        `<p>C# has two kinds of types:</p>
<ul><li><b>Value types</b> (<code>int</code>, <code>double</code>, <code>bool</code>, <b>struct</b>): the variable holds the data itself. Assignment <b>copies</b> it.</li><li><b>Reference types</b> (<b>class</b>, arrays, <code>string</code>, <code>List</code>): the variable holds a reference. Assignment copies only the <b>reference</b> — two variables see one object.</li></ul>
<pre class="inline-code">struct PointS { public int X, Y; }
class  PointC { public int X, Y; }

var a = new PointS { X = 1 }; var b = a; b.X = 10;   // a.X = 1
var c = new PointC { X = 1 }; var d = c; d.X = 10;   // c.X = 10!</pre>
<p><b>struct</b> suits small independent values: coordinates, colours, sizes. Unity’s <code>Vector3</code>, <code>Color</code> and <code>Quaternion</code> are structs.</p>`),
      why: L(`<p>Це одна з найчастіших «загадок» у Unity: <code>transform.position.x = 5;</code> не компілюється, бо <code>position</code> — struct, і ти змінив би лише копію. Розуміння різниці між значенням і посиланням пояснює десятки дивних багів: чому зміна в методі «не зберігається» або навпаки «зачепила» інший об’єкт.</p>`,
        `<p>Это одна из самых частых «загадок» в Unity: <code>transform.position.x = 5;</code> не компилируется, потому что <code>position</code> — struct, и ты изменил бы лишь копию. Понимание разницы между значением и ссылкой объясняет десятки странных багов: почему изменение в методе «не сохраняется» или наоборот «задело» другой объект.</p>`,
        `<p>A classic Unity puzzle: <code>transform.position.x = 5;</code> doesn’t compile because <code>position</code> is a struct and you’d change only a copy. Knowing value vs reference explains dozens of odd bugs — why a change in a method “doesn’t stick” or, conversely, “leaks” into another object.</p>`),
      mistakes: L(`<ul><li>Передав struct у метод і змінив там — оригінал не змінився (метод отримав копію). Поверни нове значення або використай <code>ref</code>.</li><li>Великі struct (десятки полів) копіюються повільно — для них краще class.</li><li>Два посилання на один об’єкт — зміна через одне видна через інше.</li></ul>`,
        `<ul><li>Передал struct в метод и изменил там — оригинал не изменился (метод получил копию). Верни новое значение или используй <code>ref</code>.</li><li>Большие struct (десятки полей) копируются медленно — для них лучше class.</li><li>Две ссылки на один объект — изменение через одну видно через другую.</li></ul>`,
        `<ul><li>Passing a struct into a method and changing it there leaves the original intact (the method got a copy). Return a new value or use <code>ref</code>.</li><li>Big structs (dozens of fields) copy slowly — use a class.</li><li>Two references to one object — a change through one shows through the other.</li></ul>`),
      examples: [
        { title: L('Копія чи посилання', 'Копия или ссылка', 'Copy or reference'), code: M(`var a = new PointS { X = 1, Y = 2 };
var b = a;
b.X = 10;
Console.WriteLine($"struct: a.X={a.X}, b.X={b.X}");
var c = new PointC { X = 1, Y = 2 };
var d = c;
d.X = 10;
Console.WriteLine($"class:  c.X={c.X}, d.X={d.X}");`, { before: `struct PointS { public int X, Y; }
class PointC { public int X, Y; }` }), note: L('Struct скопіювався, class — ні.', 'Struct скопировался, class — нет.', 'The struct was copied, the class wasn’t.') },
        { title: L('Метод і ref', 'Метод и ref', 'Method and ref'), code: M(`var p = new PointS { X = 0, Y = 0 };
MoveCopy(p);
Console.WriteLine(p.X);
MoveRef(ref p);
Console.WriteLine(p.X);`, { before: 'struct PointS { public int X, Y; }', members: `static void MoveCopy(PointS p) { p.X += 5; }
static void MoveRef(ref PointS p) { p.X += 5; }` }), note: L('ref передає саму змінну, а не копію.', 'ref передаёт саму переменную, а не копию.', 'ref passes the variable itself, not a copy.') },
        { title: L('Struct з методами', 'Struct с методами', 'Struct with methods'), code: M(`var a = new Vec2(3, 4);
var b = new Vec2(1, -2);
Console.WriteLine(a.Plus(b));
Console.WriteLine(a.Length());`, { before: `struct Vec2
{
  public double X, Y;
  public Vec2(double x, double y) { X = x; Y = y; }
  public Vec2 Plus(Vec2 o) { return new Vec2(X + o.X, Y + o.Y); }
  public double Length() { return Math.Sqrt(X * X + Y * Y); }
  public override string ToString() { return $"({X}, {Y})"; }
}` }), note: L('Як маленький Vector2 з Unity.', 'Как маленький Vector2 из Unity.', 'Like a tiny Unity Vector2.') }
      ],
      task: {
        text: L('Оголоси <code>struct Cell { public int Row, Col; }</code> з конструктором і методом <code>int Distance(Cell other)</code> (сума модулів різниць). Створи <code>a = (1, 2)</code>, <code>b = a</code>, зміни <code>b.Row = 5</code>. Виведи <code>a: 1,2</code>, <code>b: 5,2</code> і <code>Distance: 4</code> (відстань від a до b).', 'Объяви <code>struct Cell { public int Row, Col; }</code> с конструктором и методом <code>int Distance(Cell other)</code> (сумма модулей разностей). Создай <code>a = (1, 2)</code>, <code>b = a</code>, измени <code>b.Row = 5</code>. Выведи <code>a: 1,2</code>, <code>b: 5,2</code> и <code>Distance: 4</code> (расстояние от a до b).', 'Declare <code>struct Cell { public int Row, Col; }</code> with a constructor and <code>int Distance(Cell other)</code> (sum of absolute differences). Make <code>a = (1, 2)</code>, <code>b = a</code>, set <code>b.Row = 5</code>. Print <code>a: 1,2</code>, <code>b: 5,2</code> and <code>Distance: 4</code> (from a to b).'),
        how: [L('<code>return Math.Abs(Row - other.Row) + Math.Abs(Col - other.Col);</code>', '<code>return Math.Abs(Row - other.Row) + Math.Abs(Col - other.Col);</code>', '<code>return Math.Abs(Row - other.Row) + Math.Abs(Col - other.Col);</code>')],
        starter: M(`// створи a, b і виведи`, { before: `struct Cell
{
  // поля, конструктор, Distance
}` }),
        solution: M(`var a = new Cell(1, 2);
var b = a;
b.Row = 5;
Console.WriteLine($"a: {a.Row},{a.Col}");
Console.WriteLine($"b: {b.Row},{b.Col}");
Console.WriteLine($"Distance: {a.Distance(b)}");`, { before: `struct Cell
{
  public int Row, Col;
  public Cell(int row, int col) { Row = row; Col = col; }
  public int Distance(Cell other) { return Math.Abs(Row - other.Row) + Math.Abs(Col - other.Col); }
}` }),
        hint: L('a не змінилась, бо b — копія.', 'a не изменилась, потому что b — копия.', 'a is unchanged because b is a copy.'),
        expected: 'a: 1,2\nb: 5,2\nDistance: 4',
        must: /struct\s+Cell/
      },
      quiz: { q: L('Що копіює присвоєння <code>b = a</code>, якщо a — об’єкт класу?', 'Что копирует присваивание <code>b = a</code>, если a — объект класса?', 'What does <code>b = a</code> copy when a is a class object?'), options: [L('весь об’єкт', 'весь объект', 'the whole object'), L('лише посилання', 'только ссылку', 'only the reference'), L('нічого', 'ничего', 'nothing')], answer: 1, explain: L('Обидві змінні вказують на той самий об’єкт.', 'Обе переменные указывают на тот же объект.', 'Both variables point at the same object.') },
      ref: [{ code: 'struct S { public int X; }', d: L('тип-значення', 'тип-значение', 'value type') }, { code: 'void F(ref S s)', d: L('передати саму змінну', 'передать саму переменную', 'pass by reference') }]
    },
    {
      id: 'generics', chapter: CH6,
      title: L('Узагальнення (generics)', 'Обобщения (generics)', 'Generics'),
      theory: L(
        `<p>Ти вже користувався узагальненнями: <code>List&lt;int&gt;</code>, <code>Dictionary&lt;string, int&gt;</code>. Можна писати й свої класи та методи з <b>параметром типу</b> <code>T</code>:</p>
<pre class="inline-code">class Box&lt;T&gt;
{
  public T Value;
  public Box(T value) { Value = value; }
}

static T Max&lt;T&gt;(T a, T b) where T : IComparable&lt;T&gt;
{
  return a.CompareTo(b) &gt;= 0 ? a : b;
}</pre>
<ul><li><code>T</code> підставляється під час використання: <code>new Box&lt;string&gt;("hi")</code></li><li><code>where T : IComparable&lt;T&gt;</code> — <b>обмеження</b>: T має вміти порівнюватися</li><li>Часто компілятор сам виводить T: <code>Max(3, 8)</code></li><li><code>default(T)</code> — «порожнє» значення для будь-якого типу (0, null, false)</li></ul>`,
        `<p>Ты уже пользовался обобщениями: <code>List&lt;int&gt;</code>, <code>Dictionary&lt;string, int&gt;</code>. Можно писать и свои классы и методы с <b>параметром типа</b> <code>T</code>:</p>
<pre class="inline-code">class Box&lt;T&gt;
{
  public T Value;
  public Box(T value) { Value = value; }
}

static T Max&lt;T&gt;(T a, T b) where T : IComparable&lt;T&gt;
{
  return a.CompareTo(b) &gt;= 0 ? a : b;
}</pre>
<ul><li><code>T</code> подставляется при использовании: <code>new Box&lt;string&gt;("hi")</code></li><li><code>where T : IComparable&lt;T&gt;</code> — <b>ограничение</b>: T должен уметь сравниваться</li><li>Часто компилятор сам выводит T: <code>Max(3, 8)</code></li><li><code>default(T)</code> — «пустое» значение для любого типа (0, null, false)</li></ul>`,
        `<p>You’ve used generics already: <code>List&lt;int&gt;</code>, <code>Dictionary&lt;string, int&gt;</code>. You can write your own classes and methods with a <b>type parameter</b> <code>T</code>:</p>
<pre class="inline-code">class Box&lt;T&gt;
{
  public T Value;
  public Box(T value) { Value = value; }
}

static T Max&lt;T&gt;(T a, T b) where T : IComparable&lt;T&gt;
{
  return a.CompareTo(b) &gt;= 0 ? a : b;
}</pre>
<ul><li><code>T</code> is filled in at use: <code>new Box&lt;string&gt;("hi")</code></li><li><code>where T : IComparable&lt;T&gt;</code> is a <b>constraint</b>: T must be comparable</li><li>The compiler often infers T: <code>Max(3, 8)</code></li><li><code>default(T)</code> is the “empty” value of any type (0, null, false)</li></ul>`),
      why: L(`<p>Без узагальнень довелося б писати <code>IntBox</code>, <code>StringBox</code>, <code>PlayerBox</code>… або зберігати все як <code>object</code> і постійно приводити типи з ризиком помилки. Узагальнення дають <b>один</b> код для всіх типів, і компілятор усе одно перевіряє, що ти не поклав рядок туди, де чекають число. У Unity так працює <code>GetComponent&lt;Rigidbody&gt;()</code>.</p>`,
        `<p>Без обобщений пришлось бы писать <code>IntBox</code>, <code>StringBox</code>, <code>PlayerBox</code>… или хранить всё как <code>object</code> и постоянно приводить типы с риском ошибки. Обобщения дают <b>один</b> код для всех типов, и компилятор всё равно проверяет, что ты не положил строку туда, где ждут число. В Unity так работает <code>GetComponent&lt;Rigidbody&gt;()</code>.</p>`,
        `<p>Without generics you’d write <code>IntBox</code>, <code>StringBox</code>, <code>PlayerBox</code>… or store everything as <code>object</code> and cast constantly, risking errors. Generics give <b>one</b> piece of code for every type while the compiler still checks you never put a string where a number belongs. Unity’s <code>GetComponent&lt;Rigidbody&gt;()</code> works this way.</p>`),
      mistakes: L(`<ul><li>Викликати <code>a.CompareTo(b)</code> без обмеження <code>where T : IComparable&lt;T&gt;</code> — компілятор не знає, що T так уміє.</li><li><code>a &gt; b</code> для T не працює — оператори невідомі для довільного типу.</li><li><code>new T()</code> можна лише з обмеженням <code>where T : new()</code>.</li></ul>`,
        `<ul><li>Вызывать <code>a.CompareTo(b)</code> без ограничения <code>where T : IComparable&lt;T&gt;</code> — компилятор не знает, что T так умеет.</li><li><code>a &gt; b</code> для T не работает — операторы неизвестны для произвольного типа.</li><li><code>new T()</code> можно только с ограничением <code>where T : new()</code>.</li></ul>`,
        `<ul><li>Calling <code>a.CompareTo(b)</code> without <code>where T : IComparable&lt;T&gt;</code> — the compiler doesn’t know T can do that.</li><li><code>a &gt; b</code> on T doesn’t work — operators are unknown for an arbitrary type.</li><li><code>new T()</code> needs the <code>where T : new()</code> constraint.</li></ul>`),
      examples: [
        { title: 'Box<T>', code: M(`var a = new Box<int>(42);
var b = new Box<string>("sword");
Console.WriteLine(a.Value + 1);
Console.WriteLine(b.Value.ToUpper());
Console.WriteLine(a);`, { before: `class Box<T>
{
  public T Value;
  public Box(T value) { Value = value; }
  public override string ToString() { return $"Box({Value})"; }
}` }), note: L('Один клас — різні типи всередині.', 'Один класс — разные типы внутри.', 'One class, different types inside.') },
        { title: L('Метод з обмеженням', 'Метод с ограничением', 'Constrained method'), code: M(`Console.WriteLine(Max(3, 8));
Console.WriteLine(Max("apple", "pear"));
Console.WriteLine(Max(2.5, -1.0));`, { members: `static T Max<T>(T a, T b) where T : IComparable<T>
{
  return a.CompareTo(b) >= 0 ? a : b;
}` }), note: L('T виводиться з аргументів.', 'T выводится из аргументов.', 'T is inferred from the arguments.') },
        { title: L('Узагальнений список', 'Обобщённый список', 'Generic list'), code: M(`var inv = new Inventory<string>();
inv.Add("Potion");
inv.Add("Map");
Console.WriteLine($"{inv.Count} items, first: {inv.First()}");
var nums = new Inventory<int>();
Console.WriteLine(nums.First());`, { using: COLL, before: `class Inventory<T>
{
  private List<T> items = new List<T>();
  public void Add(T item) { items.Add(item); }
  public int Count { get { return items.Count; } }
  public T First() { return items.Count > 0 ? items[0] : default(T); }
}` }), note: L('default(int) — це 0.', 'default(int) — это 0.', 'default(int) is 0.') }
      ],
      task: {
        text: L('Напиши узагальнений клас <code>Pair&lt;TA, TB&gt;</code> з полями <code>First</code>, <code>Second</code>, конструктором і методом <code>Pair&lt;TB, TA&gt; Swap()</code>, а також метод <code>static T Largest&lt;T&gt;(T[] items) where T : IComparable&lt;T&gt;</code>. Виведи <code>new Pair&lt;string, int&gt;("Ira", 450)</code> як <code>Ira 450</code>, після Swap — <code>450 Ira</code>, і <code>Largest(new[] { 4, 17, 9 })</code> → <code>17</code>.', 'Напиши обобщённый класс <code>Pair&lt;TA, TB&gt;</code> с полями <code>First</code>, <code>Second</code>, конструктором и методом <code>Pair&lt;TB, TA&gt; Swap()</code>, а также метод <code>static T Largest&lt;T&gt;(T[] items) where T : IComparable&lt;T&gt;</code>. Выведи <code>new Pair&lt;string, int&gt;("Ira", 450)</code> как <code>Ira 450</code>, после Swap — <code>450 Ira</code>, и <code>Largest(new[] { 4, 17, 9 })</code> → <code>17</code>.', 'Write a generic <code>Pair&lt;TA, TB&gt;</code> with <code>First</code>, <code>Second</code>, a constructor and <code>Pair&lt;TB, TA&gt; Swap()</code>, plus <code>static T Largest&lt;T&gt;(T[] items) where T : IComparable&lt;T&gt;</code>. Print <code>new Pair&lt;string, int&gt;("Ira", 450)</code> as <code>Ira 450</code>, after Swap <code>450 Ira</code>, and <code>Largest(new[] { 4, 17, 9 })</code> → <code>17</code>.'),
        how: [L('<code>public Pair&lt;TB, TA&gt; Swap() { return new Pair&lt;TB, TA&gt;(Second, First); }</code>', '<code>public Pair&lt;TB, TA&gt; Swap() { return new Pair&lt;TB, TA&gt;(Second, First); }</code>', '<code>public Pair&lt;TB, TA&gt; Swap() { return new Pair&lt;TB, TA&gt;(Second, First); }</code>')],
        starter: M('// створи пару й виклич Largest', { before: `class Pair<TA, TB>
{
  // First, Second, конструктор, Swap
}`, members: '// static T Largest<T>(T[] items) where T : IComparable<T>' }),
        solution: M(`var p = new Pair<string, int>("Ira", 450);
Console.WriteLine($"{p.First} {p.Second}");
var s = p.Swap();
Console.WriteLine($"{s.First} {s.Second}");
Console.WriteLine(Largest(new[] { 4, 17, 9 }));`, { before: `class Pair<TA, TB>
{
  public TA First;
  public TB Second;
  public Pair(TA first, TB second) { First = first; Second = second; }
  public Pair<TB, TA> Swap() { return new Pair<TB, TA>(Second, First); }
}`, members: `static T Largest<T>(T[] items) where T : IComparable<T>
{
  T best = items[0];
  foreach (T x in items) if (x.CompareTo(best) > 0) best = x;
  return best;
}` }),
        hint: L('Очікувано: <code>Ira 450</code>, <code>450 Ira</code>, <code>17</code>.', 'Ожидается: <code>Ira 450</code>, <code>450 Ira</code>, <code>17</code>.', 'Expected: <code>Ira 450</code>, <code>450 Ira</code>, <code>17</code>.'),
        expected: 'Ira 450\n450 Ira\n17',
        must: /class\s+Pair\s*<[\s\S]*where\s+T\s*:\s*IComparable/
      },
      quiz: { q: L('Навіщо <code>where T : IComparable&lt;T&gt;</code>?', 'Зачем <code>where T : IComparable&lt;T&gt;</code>?', 'Why <code>where T : IComparable&lt;T&gt;</code>?'), options: [L('щоб можна було викликати CompareTo', 'чтобы можно было вызывать CompareTo', 'so CompareTo can be called'), L('щоб T був числом', 'чтобы T было числом', 'so T is a number'), L('для швидкості', 'для скорости', 'for speed')], answer: 0, explain: L('Обмеження обіцяє компілятору, що T уміє порівнюватися.', 'Ограничение обещает компилятору, что T умеет сравниваться.', 'The constraint promises the compiler that T can compare.') },
      ref: [{ code: 'class Box<T> { public T Value; }', d: L('узагальнений клас', 'обобщённый класс', 'generic class') }, { code: 'static T F<T>(T x) where T : IComparable<T>', d: L('метод з обмеженням', 'метод с ограничением', 'constrained method') }, { code: 'default(T)', d: L('значення за замовчуванням', 'значение по умолчанию', 'default value') }]
    },
    {
      id: 'delegates-events', chapter: CH6,
      title: L('Делегати, лямбди й події', 'Делегаты, лямбды и события', 'Delegates, lambdas and events'),
      theory: L(
        `<p><b>Делегат</b> — змінна, у якій лежить <b>метод</b>. Найчастіше використовують готові:</p>
<table class="mini"><tr><td><code>Action</code>, <code>Action&lt;T&gt;</code></td><td>метод, що нічого не повертає</td></tr><tr><td><code>Func&lt;T, TResult&gt;</code></td><td>метод, що повертає значення</td></tr><tr><td><code>Predicate&lt;T&gt;</code></td><td>метод, що повертає bool</td></tr></table>
<pre class="inline-code">Func&lt;int, int&gt; square = x =&gt; x * x;     // лямбда
Action&lt;string&gt; hello = name =&gt; Console.WriteLine("Hi, " + name);
Console.WriteLine(square(5));   // 25
hello("Ira");</pre>
<p><b>Подія</b> (<code>event</code>) — «дзвіночок» в об’єкті: інші частини програми <b>підписуються</b> (<code>+=</code>), а об’єкт <b>сповіщає</b> їх, коли щось стається:</p>
<pre class="inline-code">class Player
{
  public event Action&lt;int&gt; Died;
  public void Hit() { Died?.Invoke(3); }   // ?. — якщо є підписники
}
player.Died += lives =&gt; Console.WriteLine("Game over");</pre>`,
        `<p><b>Делегат</b> — переменная, в которой лежит <b>метод</b>. Чаще всего используют готовые:</p>
<table class="mini"><tr><td><code>Action</code>, <code>Action&lt;T&gt;</code></td><td>метод, ничего не возвращающий</td></tr><tr><td><code>Func&lt;T, TResult&gt;</code></td><td>метод, возвращающий значение</td></tr><tr><td><code>Predicate&lt;T&gt;</code></td><td>метод, возвращающий bool</td></tr></table>
<pre class="inline-code">Func&lt;int, int&gt; square = x =&gt; x * x;     // лямбда
Action&lt;string&gt; hello = name =&gt; Console.WriteLine("Hi, " + name);
Console.WriteLine(square(5));   // 25
hello("Ira");</pre>
<p><b>Событие</b> (<code>event</code>) — «колокольчик» в объекте: другие части программы <b>подписываются</b> (<code>+=</code>), а объект <b>оповещает</b> их, когда что-то происходит:</p>
<pre class="inline-code">class Player
{
  public event Action&lt;int&gt; Died;
  public void Hit() { Died?.Invoke(3); }   // ?. — если есть подписчики
}
player.Died += lives =&gt; Console.WriteLine("Game over");</pre>`,
        `<p>A <b>delegate</b> is a variable that holds a <b>method</b>. The built-in ones are used most:</p>
<table class="mini"><tr><td><code>Action</code>, <code>Action&lt;T&gt;</code></td><td>a method returning nothing</td></tr><tr><td><code>Func&lt;T, TResult&gt;</code></td><td>a method returning a value</td></tr><tr><td><code>Predicate&lt;T&gt;</code></td><td>a method returning bool</td></tr></table>
<pre class="inline-code">Func&lt;int, int&gt; square = x =&gt; x * x;     // lambda
Action&lt;string&gt; hello = name =&gt; Console.WriteLine("Hi, " + name);
Console.WriteLine(square(5));   // 25
hello("Ira");</pre>
<p>An <b>event</b> is a “bell” on an object: other code <b>subscribes</b> (<code>+=</code>) and the object <b>notifies</b> subscribers when something happens:</p>
<pre class="inline-code">class Player
{
  public event Action&lt;int&gt; Died;
  public void Hit() { Died?.Invoke(3); }   // ?. — only if someone listens
}
player.Died += lives =&gt; Console.WriteLine("Game over");</pre>`),
      why: L(`<p>Події розв’язують важливу проблему: гравець не повинен знати про UI, звуки й досягнення. Він просто «дзвонить»: <i>я помер</i>. А UI показує екран програшу, аудіо грає музику, система досягнень рахує смерті — кожен підписався сам. Так влаштовані кнопки Unity (<code>onClick</code>) і майже вся ігрова логіка.</p>`,
        `<p>События решают важную проблему: игрок не должен знать про UI, звуки и достижения. Он просто «звонит»: <i>я умер</i>. А UI показывает экран проигрыша, аудио играет музыку, система достижений считает смерти — каждый подписался сам. Так устроены кнопки Unity (<code>onClick</code>) и почти вся игровая логика.</p>`,
        `<p>Events solve a key problem: the player shouldn’t know about the UI, sounds or achievements. It just “rings”: <i>I died</i>. The UI shows a game-over screen, audio plays music, achievements count deaths — each subscribed on its own. Unity buttons (<code>onClick</code>) and most game logic work like this.</p>`),
      mistakes: L(`<ul><li>Виклик події без підписників: <code>Died(3)</code> — <code>NullReferenceException</code>; пиши <code>Died?.Invoke(3)</code>.</li><li><code>=</code> замість <code>+=</code> для делегата перезаписує всіх попередніх підписників.</li><li>Забули відписатися (<code>-=</code>) — об’єкт продовжує отримувати сповіщення.</li></ul>`,
        `<ul><li>Вызов события без подписчиков: <code>Died(3)</code> — <code>NullReferenceException</code>; пиши <code>Died?.Invoke(3)</code>.</li><li><code>=</code> вместо <code>+=</code> для делегата перезаписывает всех прежних подписчиков.</li><li>Забыли отписаться (<code>-=</code>) — объект продолжает получать оповещения.</li></ul>`,
        `<ul><li>Raising an event with no subscribers: <code>Died(3)</code> — <code>NullReferenceException</code>; write <code>Died?.Invoke(3)</code>.</li><li><code>=</code> instead of <code>+=</code> on a delegate overwrites all previous subscribers.</li><li>Forgetting to unsubscribe (<code>-=</code>) keeps notifications coming.</li></ul>`),
      examples: [
        { title: 'Func / Action', code: M(`Func<int, int> square = x => x * x;
Func<int, int, int> add = (a, b) => a + b;
Action<string> say = msg => Console.WriteLine(">> " + msg);
say(square(6).ToString());
say(add(2, 3).ToString());`), note: L('Лямбда — метод без імені.', 'Лямбда — метод без имени.', 'A lambda is a nameless method.') },
        { title: L('Метод приймає метод', 'Метод принимает метод', 'Method takes a method'), code: M(`int[] scores = { 40, 95, 70, 12 };
Console.WriteLine(CountIf(scores, s => s >= 50));
Console.WriteLine(CountIf(scores, s => s % 2 == 0));`, { members: `static int CountIf(int[] items, Predicate<int> test)
{
  int n = 0;
  foreach (int x in items) if (test(x)) n++;
  return n;
}` }), note: L('Правило передаємо як параметр.', 'Правило передаём как параметр.', 'Pass the rule as a parameter.') },
        { title: L('Подія', 'Событие', 'Event'), code: M(`var door = new Door();
door.Opened += who => Console.WriteLine($"UI: {who} opened the door");
door.Opened += who => Console.WriteLine("Sound: creak!");
door.Open("Kira");`, { before: `class Door
{
  public event Action<string> Opened;
  public void Open(string who) { Opened?.Invoke(who); }
}` }), note: L('Двері не знають про UI та звук.', 'Дверь не знает про UI и звук.', 'The door knows nothing about UI or sound.') }
      ],
      task: {
        text: L('Створи клас <code>Score</code> з подією <code>public event Action&lt;int&gt; Milestone</code> і методом <code>Add(int points)</code>: він додає очки й викликає подію щоразу, коли рахунок перетинає нову сотню (100, 200, …). Підпиши лямбду, що друкує <code>Milestone: 100</code>. Додай очки <code>40, 70, 50, 90</code> і наприкінці виведи <code>Total: 250</code>.', 'Создай класс <code>Score</code> с событием <code>public event Action&lt;int&gt; Milestone</code> и методом <code>Add(int points)</code>: он добавляет очки и вызывает событие каждый раз, когда счёт пересекает новую сотню (100, 200, …). Подпиши лямбду, печатающую <code>Milestone: 100</code>. Добавь очки <code>40, 70, 50, 90</code> и в конце выведи <code>Total: 250</code>.', 'Create a <code>Score</code> class with <code>public event Action&lt;int&gt; Milestone</code> and <code>Add(int points)</code>: it adds points and raises the event each time the score crosses a new hundred (100, 200, …). Subscribe a lambda printing <code>Milestone: 100</code>. Add <code>40, 70, 50, 90</code> and finally print <code>Total: 250</code>.'),
        how: [L('Перед додаванням запам’ятай <code>int before = Total / 100;</code>, після — порівняй із <code>Total / 100</code>.', 'Перед добавлением запомни <code>int before = Total / 100;</code>, после — сравни с <code>Total / 100</code>.', 'Before adding remember <code>int before = Total / 100;</code>, then compare with <code>Total / 100</code>.'), L('Для кожної нової сотні: <code>Milestone?.Invoke(h * 100);</code>', 'Для каждой новой сотни: <code>Milestone?.Invoke(h * 100);</code>', 'For each new hundred: <code>Milestone?.Invoke(h * 100);</code>')],
        starter: M(`var s = new Score();
// підпиши подію й додай очки`, { before: `class Score
{
  public int Total { get; private set; }
  // подія Milestone і метод Add
}` }),
        solution: M(`var s = new Score();
s.Milestone += m => Console.WriteLine($"Milestone: {m}");
foreach (int p in new[] { 40, 70, 50, 90 }) s.Add(p);
Console.WriteLine($"Total: {s.Total}");`, { before: `class Score
{
  public int Total { get; private set; }
  public event Action<int> Milestone;

  public void Add(int points)
  {
    int before = Total / 100;
    Total += points;
    for (int h = before + 1; h <= Total / 100; h++) Milestone?.Invoke(h * 100);
  }
}` }),
        hint: L('40 → 110 (подія 100) → 160 → 250 (подія 200).', '40 → 110 (событие 100) → 160 → 250 (событие 200).', '40 → 110 (event 100) → 160 → 250 (event 200).'),
        expected: 'Milestone: 100\nMilestone: 200\nTotal: 250',
        must: /event\s+Action<int>[\s\S]*\+=/
      },
      quiz: { q: L('Як безпечно викликати подію, на яку, можливо, ніхто не підписався?', 'Как безопасно вызвать событие, на которое, возможно, никто не подписался?', 'How do you safely raise an event that may have no subscribers?'), options: ['Ev()', 'Ev?.Invoke()', 'Ev.Run()'], answer: 1, explain: L('<code>?.</code> викличе лише якщо є підписники.', '<code>?.</code> вызовет только если есть подписчики.', '<code>?.</code> calls only when someone listens.') },
      ref: [{ code: 'Func<int, int> f = x => x * 2;', d: L('делегат з лямбдою', 'делегат с лямбдой', 'delegate with lambda') }, { code: 'public event Action<T> E;  E?.Invoke(v);  obj.E += …', d: L('подія', 'событие', 'event') }]
    },
    {
      id: 'stack-queue-set', chapter: CH6,
      title: L('Stack, Queue, HashSet', 'Stack, Queue, HashSet', 'Stack, Queue, HashSet'),
      theory: L(
        `<p>Три колекції з <code>System.Collections.Generic</code> для особливих задач:</p>
<table class="mini"><tr><td><code>Stack&lt;T&gt;</code></td><td>«останній прийшов — перший пішов»: <code>Push</code>, <code>Pop</code>, <code>Peek</code></td></tr><tr><td><code>Queue&lt;T&gt;</code></td><td>«перший прийшов — перший пішов»: <code>Enqueue</code>, <code>Dequeue</code>, <code>Peek</code></td></tr><tr><td><code>HashSet&lt;T&gt;</code></td><td>множина без повторів: <code>Add</code> (повертає false для повтору), <code>Contains</code>, <code>UnionWith</code>, <code>IntersectWith</code></td></tr></table>
<p>На відміну від C++, тут <code>Pop()</code> і <code>Dequeue()</code> <b>повертають</b> елемент. Кількість — <code>Count</code>. Порожній стек чи черга кидають <code>InvalidOperationException</code>, тому спершу перевіряй <code>Count &gt; 0</code>.</p>`,
        `<p>Три коллекции из <code>System.Collections.Generic</code> для особых задач:</p>
<table class="mini"><tr><td><code>Stack&lt;T&gt;</code></td><td>«последним пришёл — первым ушёл»: <code>Push</code>, <code>Pop</code>, <code>Peek</code></td></tr><tr><td><code>Queue&lt;T&gt;</code></td><td>«первым пришёл — первым ушёл»: <code>Enqueue</code>, <code>Dequeue</code>, <code>Peek</code></td></tr><tr><td><code>HashSet&lt;T&gt;</code></td><td>множество без повторов: <code>Add</code> (возвращает false для повтора), <code>Contains</code>, <code>UnionWith</code>, <code>IntersectWith</code></td></tr></table>
<p>В отличие от C++, здесь <code>Pop()</code> и <code>Dequeue()</code> <b>возвращают</b> элемент. Количество — <code>Count</code>. Пустой стек или очередь бросают <code>InvalidOperationException</code>, поэтому сначала проверяй <code>Count &gt; 0</code>.</p>`,
        `<p>Three collections from <code>System.Collections.Generic</code> for special jobs:</p>
<table class="mini"><tr><td><code>Stack&lt;T&gt;</code></td><td>last in, first out: <code>Push</code>, <code>Pop</code>, <code>Peek</code></td></tr><tr><td><code>Queue&lt;T&gt;</code></td><td>first in, first out: <code>Enqueue</code>, <code>Dequeue</code>, <code>Peek</code></td></tr><tr><td><code>HashSet&lt;T&gt;</code></td><td>a set without duplicates: <code>Add</code> (false for a duplicate), <code>Contains</code>, <code>UnionWith</code>, <code>IntersectWith</code></td></tr></table>
<p>Unlike C++, <code>Pop()</code> and <code>Dequeue()</code> <b>return</b> the item. The size is <code>Count</code>. An empty stack or queue throws <code>InvalidOperationException</code>, so check <code>Count &gt; 0</code> first.</p>`),
      why: L(`<p>Стек — це «скасувати» (Ctrl+Z) і історія екранів меню (кнопка «Назад»). Черга — ходи в покроковій грі, черга гравців у лобі, події, що чекають обробки. HashSet миттєво відповідає «чи бачили вже?» — зібрані предмети, відвідані кімнати, унікальні гравці.</p>`,
        `<p>Стек — это «отменить» (Ctrl+Z) и история экранов меню (кнопка «Назад»). Очередь — ходы в пошаговой игре, очередь игроков в лобби, события, ждущие обработки. HashSet мгновенно отвечает «видели ли уже?» — собранные предметы, посещённые комнаты, уникальные игроки.</p>`,
        `<p>A stack is undo (Ctrl+Z) and a menu’s screen history (the Back button). A queue is turns in a turn-based game, the lobby line, pending events. A HashSet instantly answers “seen it before?” — collected items, visited rooms, unique players.</p>`),
      mistakes: L(`<ul><li><code>Pop()</code> на порожньому стеку — виняток <code>Stack empty</code>.</li><li>Порядок у HashSet не гарантований — не покладайся на нього у виводі; відсортуй.</li><li>Перебирати Queue через <code>foreach</code> можна, але це не видаляє елементи.</li></ul>`,
        `<ul><li><code>Pop()</code> на пустом стеке — исключение <code>Stack empty</code>.</li><li>Порядок в HashSet не гарантирован — не полагайся на него в выводе; отсортируй.</li><li>Перебирать Queue через <code>foreach</code> можно, но это не удаляет элементы.</li></ul>`,
        `<ul><li><code>Pop()</code> on an empty stack throws <code>Stack empty</code>.</li><li>HashSet order isn’t guaranteed — sort before printing.</li><li>You can <code>foreach</code> a Queue, but it doesn’t remove items.</li></ul>`),
      examples: [
        { title: L('Кнопка «Назад»', 'Кнопка «Назад»', 'Back button'), code: M(`var screens = new Stack<string>();
screens.Push("Main");
screens.Push("Settings");
screens.Push("Audio");
Console.WriteLine($"Now: {screens.Peek()}");
screens.Pop();
Console.WriteLine($"Back to: {screens.Peek()} ({screens.Count} screens)");`, { using: COLL }), note: L('Peek дивиться, не забираючи.', 'Peek смотрит, не забирая.', 'Peek looks without removing.') },
        { title: L('Черга ходів', 'Очередь ходов', 'Turn queue'), code: M(`var turns = new Queue<string>(new[] { "Knight", "Archer", "Mage" });
for (int round = 1; round <= 5; round++)
{
  string who = turns.Dequeue();
  Console.WriteLine($"Turn {round}: {who}");
  turns.Enqueue(who);
}`, { using: COLL }), note: L('Хто сходив — стає в кінець черги.', 'Кто сходил — встаёт в конец очереди.', 'Whoever moved goes to the back.') },
        { title: 'HashSet', code: M(`var visited = new HashSet<string>();
foreach (string room in new[] { "hall", "kitchen", "hall", "cave", "kitchen" })
{
  if (visited.Add(room)) Console.WriteLine($"New room: {room}");
  else Console.WriteLine($"Been in {room}");
}
Console.WriteLine($"Unique: {visited.Count}");`, { using: COLL }), note: L('Add повертає false для повтору.', 'Add возвращает false для повтора.', 'Add returns false for a duplicate.') }
      ],
      task: {
        text: L('Зроби текстовий редактор з «Скасувати». Команди: <code>type A</code>, <code>type B</code>, <code>undo</code>, <code>type C</code>, <code>type D</code>, <code>undo</code>, <code>type B</code>. Тримай історію в <code>Stack&lt;string&gt;</code> (повний текст після кожної дії). Після всіх команд виведи текст (<code>ACB</code>), потім кількість <b>унікальних</b> набраних літер через <code>HashSet</code> (<code>Unique letters: 4</code>).', 'Сделай текстовый редактор с «Отменить». Команды: <code>type A</code>, <code>type B</code>, <code>undo</code>, <code>type C</code>, <code>type D</code>, <code>undo</code>, <code>type B</code>. Храни историю в <code>Stack&lt;string&gt;</code> (полный текст после каждого действия). После всех команд выведи текст (<code>ACB</code>), затем количество <b>уникальных</b> набранных букв через <code>HashSet</code> (<code>Unique letters: 4</code>).', 'Make a text editor with Undo. Commands: <code>type A</code>, <code>type B</code>, <code>undo</code>, <code>type C</code>, <code>type D</code>, <code>undo</code>, <code>type B</code>. Keep history in a <code>Stack&lt;string&gt;</code> (the full text after each action). After all commands print the text (<code>ACB</code>), then the number of <b>unique</b> typed letters using a <code>HashSet</code> (<code>Unique letters: 4</code>).'),
        how: [L('Почни зі стеку з порожнім рядком: <code>history.Push("")</code>. type — <code>history.Push(history.Peek() + letter)</code>; undo — <code>history.Pop()</code>, якщо Count &gt; 1.', 'Начни со стека с пустой строкой: <code>history.Push("")</code>. type — <code>history.Push(history.Peek() + letter)</code>; undo — <code>history.Pop()</code>, если Count &gt; 1.', 'Start the stack with an empty string: <code>history.Push("")</code>. type: <code>history.Push(history.Peek() + letter)</code>; undo: <code>history.Pop()</code> if Count &gt; 1.'), L('Кожну набрану літеру додавай у HashSet (навіть якщо її потім скасували).', 'Каждую набранную букву добавляй в HashSet (даже если её потом отменили).', 'Add every typed letter to the HashSet (even if undone later).')],
        starter: M(`string[] commands = { "type A", "type B", "undo", "type C", "type D", "undo", "type B" };
var history = new Stack<string>();
var typed = new HashSet<char>();
// обробка команд`, { using: COLL }),
        solution: M(`string[] commands = { "type A", "type B", "undo", "type C", "type D", "undo", "type B" };
var history = new Stack<string>();
var typed = new HashSet<char>();
history.Push("");
foreach (string cmd in commands)
{
  if (cmd == "undo")
  {
    if (history.Count > 1) history.Pop();
  }
  else
  {
    char letter = cmd[cmd.Length - 1];
    typed.Add(letter);
    history.Push(history.Peek() + letter);
  }
}
Console.WriteLine(history.Peek());
Console.WriteLine($"Unique letters: {typed.Count}");`, { using: COLL }),
        hint: L('A → AB → A → AC → ACD → AC → ACB; літери A, B, C, D.', 'A → AB → A → AC → ACD → AC → ACB; буквы A, B, C, D.', 'A → AB → A → AC → ACD → AC → ACB; letters A, B, C, D.'),
        expected: 'ACB\nUnique letters: 4',
        must: /Stack<string>[\s\S]*HashSet<char>/
      },
      quiz: { q: L('Що поверне <code>Dequeue()</code> у черзі з елементами A, B, C (додані по черзі)?', 'Что вернёт <code>Dequeue()</code> в очереди с элементами A, B, C (добавлены по очереди)?', 'What does <code>Dequeue()</code> return for a queue built from A, B, C in order?'), options: ['A', 'C', 'B'], answer: 0, explain: L('Черга — перший прийшов, перший пішов.', 'Очередь — первым пришёл, первым ушёл.', 'A queue is first in, first out.') },
      ref: [{ code: 'Stack<T>: Push Pop Peek', d: 'LIFO' }, { code: 'Queue<T>: Enqueue Dequeue Peek', d: 'FIFO' }, { code: 'HashSet<T>: Add Contains', d: L('без повторів', 'без повторов', 'no duplicates') }]
    }
  ], 'project-battle');

  Codry.steps('csharp', [
    {
      id: 'project-bank', chapter: CH5, project: true,
      title: L('Проєкт: банк', 'Проект: банк', 'Project: bank'),
      theory: L(
        `<p>Фінальний проєкт — маленька банківська система, що читає команди зі stdin. Тут знадобиться все:</p>
<ol><li>Клас <code>Account</code>: власник, баланс (<code>private set</code>), історія операцій (<code>List&lt;string&gt;</code>)</li><li>Власний виняток <code>class BankException : Exception</code> для помилок бізнес-логіки</li><li><code>Dictionary&lt;string, Account&gt;</code> — рахунки за іменем</li><li>Цикл читання: <code>while ((line = Console.ReadLine()) != null)</code></li><li>Розбір: <code>line.Split(' ')</code> і <code>switch</code> по команді</li><li>Один <code>try/catch</code> навколо обробки команди — будь-яка помилка друкується як <code>Error: …</code>, а програма працює далі</li></ol>
<p><b>Переказ</b> має бути <b>атомарним</b>: спершу перевіряємо все (обидва рахунки існують, грошей достатньо), і лише потім змінюємо баланси.</p>`,
        `<p>Финальный проект — маленькая банковская система, читающая команды из stdin. Здесь пригодится всё:</p>
<ol><li>Класс <code>Account</code>: владелец, баланс (<code>private set</code>), история операций (<code>List&lt;string&gt;</code>)</li><li>Собственное исключение <code>class BankException : Exception</code> для ошибок бизнес-логики</li><li><code>Dictionary&lt;string, Account&gt;</code> — счета по имени</li><li>Цикл чтения: <code>while ((line = Console.ReadLine()) != null)</code></li><li>Разбор: <code>line.Split(' ')</code> и <code>switch</code> по команде</li><li>Один <code>try/catch</code> вокруг обработки команды — любая ошибка печатается как <code>Error: …</code>, а программа работает дальше</li></ol>
<p><b>Перевод</b> должен быть <b>атомарным</b>: сначала проверяем всё (оба счёта существуют, денег достаточно), и лишь потом меняем балансы.</p>`,
        `<p>The final project is a small banking system reading commands from stdin. You’ll use everything:</p>
<ol><li>An <code>Account</code> class: owner, balance (<code>private set</code>), a history list (<code>List&lt;string&gt;</code>)</li><li>Your own exception <code>class BankException : Exception</code> for business-rule errors</li><li><code>Dictionary&lt;string, Account&gt;</code> — accounts by name</li><li>A read loop: <code>while ((line = Console.ReadLine()) != null)</code></li><li>Parsing: <code>line.Split(' ')</code> and a <code>switch</code> on the command</li><li>One <code>try/catch</code> around each command — any error prints as <code>Error: …</code> and the program keeps going</li></ol>
<p>A <b>transfer</b> must be <b>atomic</b>: check everything first (both accounts exist, enough money), only then change balances.</p>`),
      why: L(`<p>Чому власний виняток? Він відрізняє «очікувані» помилки (немає грошей) від справжніх багів (ділення на нуль). Перші ми показуємо користувачу, другі — шукаємо в коді. А атомарність переказу — головне правило будь-якого банку: гроші не можуть «зникнути» на півдорозі.</p>`,
        `<p>Почему собственное исключение? Оно отличает «ожидаемые» ошибки (нет денег) от настоящих багов (деление на ноль). Первые мы показываем пользователю, вторые — ищем в коде. А атомарность перевода — главное правило любого банка: деньги не могут «исчезнуть» на полпути.</p>`,
        `<p>Why a custom exception? It separates “expected” errors (no money) from real bugs (division by zero). We show the first to the user and hunt the second in code. And atomic transfers are every bank’s first rule: money can’t vanish halfway.</p>`),
      mistakes: L(`<ul><li>Спершу зняти гроші з першого рахунку, а потім виявити, що другого немає, — гроші зникли.</li><li><code>int.Parse</code> для «abc» кидає <code>FormatException</code> — його теж треба перехопити.</li><li>Перевіряти суму лише на «достатньо грошей», забувши про від’ємні суми.</li></ul>`,
        `<ul><li>Сначала снять деньги с первого счёта, а потом обнаружить, что второго нет, — деньги исчезли.</li><li><code>int.Parse</code> для «abc» бросает <code>FormatException</code> — его тоже нужно перехватить.</li><li>Проверять сумму только на «достаточно денег», забыв про отрицательные суммы.</li></ul>`,
        `<ul><li>Withdrawing from the first account, then finding the second doesn’t exist — the money is gone.</li><li><code>int.Parse("abc")</code> throws <code>FormatException</code> — catch that too.</li><li>Checking only for “enough money” and forgetting negative amounts.</li></ul>`),
      examples: [
        { title: L('Власний виняток', 'Собственное исключение', 'Custom exception'), code: M(`try
{
  Withdraw(50, 80);
}
catch (BankException e)
{
  Console.WriteLine("Error: " + e.Message);
}`, { before: `class BankException : Exception
{
  public BankException(string msg) : base(msg) { }
}`, members: `static int Withdraw(int balance, int amount)
{
  if (amount > balance) throw new BankException($"not enough money ({balance} < {amount})");
  return balance - amount;
}` }), note: L('Повідомлення передається в базовий Exception.', 'Сообщение передаётся в базовый Exception.', 'The message goes to the base Exception.') },
        { title: L('Читання команд', 'Чтение команд', 'Reading commands'), code: M(`string line;
int n = 0;
while ((line = Console.ReadLine()) != null)
{
  if (line.Trim() == "") continue;
  string[] p = line.Split(' ');
  n++;
  Console.WriteLine($"#{n}: command '{p[0]}' with {p.Length - 1} args");
}`), note: L('Приклад вводу: <code>open Ann</code>, <code>deposit Ann 100</code>.', 'Пример ввода: <code>open Ann</code>, <code>deposit Ann 100</code>.', 'Sample input: <code>open Ann</code>, <code>deposit Ann 100</code>.') },
        { title: L('Історія операцій', 'История операций', 'Operation history'), code: M(`var acc = new Account("Kira");
acc.Deposit(100);
acc.Deposit(25);
Console.WriteLine($"{acc.Owner}: {acc.Balance}");
Console.WriteLine(string.Join(", ", acc.History));`, { using: COLL, before: `class Account
{
  public string Owner { get; private set; }
  public int Balance { get; private set; }
  public List<string> History = new List<string>();
  public Account(string owner) { Owner = owner; }
  public void Deposit(int amount) { Balance += amount; History.Add("+" + amount); }
}` }), note: L('Кожна операція записується.', 'Каждая операция записывается.', 'Every operation is recorded.') }
      ],
      task: {
        text: L(`Зчитуй команди зі stdin (уже задано) і виконуй: <code>open NAME</code> → <code>Opened NAME</code>; <code>deposit NAME N</code>; <code>withdraw NAME N</code>; <code>transfer FROM TO N</code>; <code>balance NAME</code> → <code>NAME: 70</code>; <code>history NAME</code> → <code>NAME history: +100 -30</code>. Помилки друкуй як <code>Error: …</code>: немає рахунку — <code>no account NAME</code>, мало грошей — <code>not enough money</code>, сума ≤ 0 — <code>amount must be positive</code>, рахунок уже є — <code>NAME already exists</code>. У переказі в історію пиши <code>-N</code> відправнику й <code>+N</code> отримувачу.`,
          `Считывай команды из stdin (уже заданы) и выполняй: <code>open NAME</code> → <code>Opened NAME</code>; <code>deposit NAME N</code>; <code>withdraw NAME N</code>; <code>transfer FROM TO N</code>; <code>balance NAME</code> → <code>NAME: 70</code>; <code>history NAME</code> → <code>NAME history: +100 -30</code>. Ошибки печатай как <code>Error: …</code>: нет счёта — <code>no account NAME</code>, мало денег — <code>not enough money</code>, сумма ≤ 0 — <code>amount must be positive</code>, счёт уже есть — <code>NAME already exists</code>. В переводе в историю пиши <code>-N</code> отправителю и <code>+N</code> получателю.`,
          `Read commands from stdin (preset) and run them: <code>open NAME</code> → <code>Opened NAME</code>; <code>deposit NAME N</code>; <code>withdraw NAME N</code>; <code>transfer FROM TO N</code>; <code>balance NAME</code> → <code>NAME: 70</code>; <code>history NAME</code> → <code>NAME history: +100 -30</code>. Print errors as <code>Error: …</code>: missing account — <code>no account NAME</code>, too little money — <code>not enough money</code>, amount ≤ 0 — <code>amount must be positive</code>, account exists — <code>NAME already exists</code>. A transfer records <code>-N</code> for the sender and <code>+N</code> for the receiver.`),
        how: [L('Допоміжний метод <code>static Account Get(string name)</code> кидає <code>BankException($"no account {name}")</code>.', 'Вспомогательный метод <code>static Account Get(string name)</code> бросает <code>BankException($"no account {name}")</code>.', 'A helper <code>static Account Get(string name)</code> throws <code>BankException($"no account {name}")</code>.'), L('У transfer спершу <code>Get</code> обидва рахунки й перевір суму, потім <code>from.Withdraw</code> і <code>to.Deposit</code>.', 'В transfer сначала <code>Get</code> оба счёта и проверь сумму, затем <code>from.Withdraw</code> и <code>to.Deposit</code>.', 'In transfer first <code>Get</code> both accounts and check the amount, then <code>from.Withdraw</code> and <code>to.Deposit</code>.')],
        starter: M(`string line;
while ((line = Console.ReadLine()) != null)
{
  // розбери команду
}`, { using: COLL, before: `class BankException : Exception
{
  public BankException(string msg) : base(msg) { }
}

class Account
{
  // Owner, Balance, History, Deposit, Withdraw
}`, members: 'static Dictionary<string, Account> accounts = new Dictionary<string, Account>();' }),
        solution: M(`string line;
while ((line = Console.ReadLine()) != null)
{
  string[] p = line.Trim().Split(' ');
  if (p[0] == "") continue;
  try
  {
    switch (p[0])
    {
      case "open":
        if (accounts.ContainsKey(p[1])) throw new BankException($"{p[1]} already exists");
        accounts[p[1]] = new Account(p[1]);
        Console.WriteLine($"Opened {p[1]}");
        break;
      case "deposit":
        Get(p[1]).Deposit(int.Parse(p[2]));
        break;
      case "withdraw":
        Get(p[1]).Withdraw(int.Parse(p[2]));
        break;
      case "transfer":
        Account from = Get(p[1]), to = Get(p[2]);
        int amount = int.Parse(p[3]);
        from.Withdraw(amount);
        to.Deposit(amount);
        break;
      case "balance":
        Console.WriteLine($"{p[1]}: {Get(p[1]).Balance}");
        break;
      case "history":
        Console.WriteLine($"{p[1]} history: {string.Join(" ", Get(p[1]).History)}");
        break;
    }
  }
  catch (BankException e)
  {
    Console.WriteLine("Error: " + e.Message);
  }
}`, { using: COLL, before: `class BankException : Exception
{
  public BankException(string msg) : base(msg) { }
}

class Account
{
  public string Owner { get; private set; }
  public int Balance { get; private set; }
  public List<string> History = new List<string>();

  public Account(string owner) { Owner = owner; }

  public void Deposit(int amount)
  {
    if (amount <= 0) throw new BankException("amount must be positive");
    Balance += amount;
    History.Add("+" + amount);
  }

  public void Withdraw(int amount)
  {
    if (amount <= 0) throw new BankException("amount must be positive");
    if (amount > Balance) throw new BankException("not enough money");
    Balance -= amount;
    History.Add("-" + amount);
  }
}`, members: `static Dictionary<string, Account> accounts = new Dictionary<string, Account>();

static Account Get(string name)
{
  Account a;
  if (!accounts.TryGetValue(name, out a)) throw new BankException($"no account {name}");
  return a;
}` }),
        stdin: 'open Ann\ndeposit Ann 100\ntransfer Ann Bob 30\nopen Bob\ntransfer Ann Bob 30\nwithdraw Bob 50\ndeposit Bob -5\nopen Ann\nbalance Ann\nbalance Bob\nhistory Ann\nhistory Bob',
        hint: L('Переказ до Bob до відкриття рахунку не змінює баланс Ann.', 'Перевод Bob до открытия счёта не меняет баланс Ann.', 'Transferring to Bob before his account exists leaves Ann’s balance untouched.'),
        expected: 'Opened Ann\nError: no account Bob\nOpened Bob\nError: not enough money\nError: amount must be positive\nError: Ann already exists\nAnn: 70\nBob: 30\nAnn history: +100 -30\nBob history: +30',
        must: /class\s+BankException\s*:\s*Exception[\s\S]*catch\s*\(\s*BankException/
      },
      quiz: { q: L('Чому в transfer спершу шукаємо обидва рахунки, а вже потім знімаємо гроші?', 'Почему в transfer сначала ищем оба счёта, а уже потом снимаем деньги?', 'Why does transfer look up both accounts before withdrawing?'), options: [L('щоб гроші не зникли, якщо другого рахунку немає', 'чтобы деньги не исчезли, если второго счёта нет', 'so money can’t vanish if the second account is missing'), L('так швидше', 'так быстрее', 'it’s faster'), L('так вимагає C#', 'так требует C#', 'C# requires it')], answer: 0, explain: L('Операція має бути атомарною: або все, або нічого.', 'Операция должна быть атомарной: либо всё, либо ничего.', 'It must be atomic: all or nothing.') },
      ref: [{ code: 'class MyEx : Exception { public MyEx(string m) : base(m) { } }', d: L('власний виняток', 'собственное исключение', 'custom exception') }, { code: 'while ((line = Console.ReadLine()) != null)', d: L('читати до кінця', 'читать до конца', 'read to the end') }]
    }
  ]);
})();
