// C++ — частина 2: рекурсія, алгоритми STL, стек і черга, множини й пари, винятки, enum class, проєкт «Лабіринт».
(function () {
  const L = Codry.L;
  const CH6 = L('Алгоритми та структури даних', 'Алгоритмы и структуры данных', 'Algorithms and data structures');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');
  const IND = (s) => s.split('\n').map((l) => (l ? '  ' + l : l)).join('\n');
  // M(тіло main, include-рядки, код перед main)
  const M = (body, inc, before) => (inc || '#include <iostream>\nusing namespace std;') + '\n\n' + (before ? before + '\n\n' : '') + 'int main() {\n' + IND(body) + '\n  return 0;\n}';
  const INC = (...h) => h.map((x) => `#include <${x}>`).join('\n') + '\nusing namespace std;';

  Codry.steps('cpp', [
    {
      id: 'recursion', chapter: CH6,
      title: L('Рекурсія', 'Рекурсия', 'Recursion'),
      theory: L(
        `<p><b>Рекурсивна функція</b> викликає сама себе. Щоб вона не працювала вічно, у неї завжди є:</p>
<ol><li><b>базовий випадок</b> — відповідь відома одразу;</li><li><b>рекурсивний крок</b> — виклик для <i>меншої</i> задачі.</li></ol>
<pre class="inline-code">long long factorial(int n) {
  if (n &lt;= 1) return 1;          // базовий випадок
  return n * factorial(n - 1);   // крок
}</pre>
<p>Кожен виклик отримує власні локальні змінні й «чекає» на стеку викликів, поки не повернеться менший. Тому дуже глибока рекурсія (сотні тисяч рівнів) може переповнити стек.</p>
<p>Класичні рекурсивні задачі: факторіал, степінь, НСД, перебір варіантів, обхід дерев і лабіринтів.</p>`,
        `<p><b>Рекурсивная функция</b> вызывает саму себя. Чтобы она не работала вечно, у неё всегда есть:</p>
<ol><li><b>базовый случай</b> — ответ известен сразу;</li><li><b>рекурсивный шаг</b> — вызов для <i>меньшей</i> задачи.</li></ol>
<pre class="inline-code">long long factorial(int n) {
  if (n &lt;= 1) return 1;          // базовый случай
  return n * factorial(n - 1);   // шаг
}</pre>
<p>Каждый вызов получает собственные локальные переменные и «ждёт» на стеке вызовов, пока не вернётся меньший. Поэтому очень глубокая рекурсия (сотни тысяч уровней) может переполнить стек.</p>
<p>Классические рекурсивные задачи: факториал, степень, НОД, перебор вариантов, обход деревьев и лабиринтов.</p>`,
        `<p>A <b>recursive function</b> calls itself. So it doesn’t run forever it always has:</p>
<ol><li>a <b>base case</b> — the answer is known immediately;</li><li>a <b>recursive step</b> — a call on a <i>smaller</i> problem.</li></ol>
<pre class="inline-code">long long factorial(int n) {
  if (n &lt;= 1) return 1;          // base case
  return n * factorial(n - 1);   // step
}</pre>
<p>Each call gets its own local variables and “waits” on the call stack until the smaller one returns. That’s why very deep recursion (hundreds of thousands of levels) can overflow the stack.</p>
<p>Classic recursive problems: factorial, power, GCD, trying all options, walking trees and mazes.</p>`),
      why: L(`<p>Багато задач легше описати рекурсивно: «НСД(a, b) = НСД(b, a mod b)» — це вже готовий код. Рекурсія також лежить в основі швидких алгоритмів (швидке сортування, сортування злиттям) і перебору — наприклад, пошуку всіх способів розставити фігури чи пройти лабіринт.</p>`,
        `<p>Многие задачи проще описать рекурсивно: «НОД(a, b) = НОД(b, a mod b)» — это уже готовый код. Рекурсия также лежит в основе быстрых алгоритмов (быстрая сортировка, сортировка слиянием) и перебора — например, поиска всех способов расставить фигуры или пройти лабиринт.</p>`,
        `<p>Many problems are simplest stated recursively: “gcd(a, b) = gcd(b, a mod b)” is already code. Recursion also powers fast algorithms (quicksort, merge sort) and exhaustive search — finding every way to place pieces or walk a maze.</p>`),
      mistakes: L(`<ul><li>Немає базового випадку — програма падає з <code>Segmentation fault</code> (переповнення стека).</li><li>Факторіал 20 не влазить в <code>int</code> — використовуй <code>long long</code>.</li><li>Наївний рекурсивний Фібоначчі для n = 50 працює хвилинами: ті самі значення рахуються мільйони разів.</li></ul>`,
        `<ul><li>Нет базового случая — программа падает с <code>Segmentation fault</code> (переполнение стека).</li><li>Факториал 20 не помещается в <code>int</code> — используй <code>long long</code>.</li><li>Наивный рекурсивный Фибоначчи для n = 50 работает минутами: одни и те же значения считаются миллионы раз.</li></ul>`,
        `<ul><li>No base case — the program dies with <code>Segmentation fault</code> (stack overflow).</li><li>20! doesn’t fit an <code>int</code> — use <code>long long</code>.</li><li>Naive recursive Fibonacci for n = 50 takes minutes: the same values are recomputed millions of times.</li></ul>`),
      examples: [
        { title: L('Факторіал і НСД', 'Факториал и НОД', 'Factorial and GCD'), code: M(`cout << factorial(10) << "\\n";
cout << factorial(20) << "\\n";
cout << gcd(84, 36) << "\\n";`, null, `long long factorial(int n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

int gcd(int a, int b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}`), note: L('НСД за Евклідом — один рядок рекурсії.', 'НОД по Евклиду — одна строка рекурсии.', 'Euclid’s GCD is one recursive line.') },
        { title: L('Перебір підмножин', 'Перебор подмножеств', 'All subsets'), code: M(`vector<char> items = {'A', 'B', 'C'};
string cur;
subsets(items, 0, cur);`, INC('iostream', 'vector', 'string'), `void subsets(const vector<char>& items, int i, string& cur) {
  if (i == (int)items.size()) {
    cout << "{" << cur << "}\\n";
    return;
  }
  subsets(items, i + 1, cur);          // без items[i]
  cur.push_back(items[i]);
  subsets(items, i + 1, cur);          // з items[i]
  cur.pop_back();
}`), note: L('Кожен елемент: «брати» або «не брати» — 2³ = 8 варіантів.', 'Каждый элемент: «брать» или «не брать» — 2³ = 8 вариантов.', 'Each item: take it or not — 2³ = 8 options.') },
        { title: L('Рекурсія з пам’яттю', 'Рекурсия с памятью', 'Memoised recursion'), code: M(`cout << fib(50) << "\\n";
cout << fib(90) << "\\n";`, INC('iostream', 'map'), `map<int, long long> memo;

long long fib(int n) {
  if (n < 2) return n;
  if (memo.count(n)) return memo[n];
  return memo[n] = fib(n - 1) + fib(n - 2);
}`), note: L('Запам’ятовуємо готові відповіді — миттєво навіть для 90.', 'Запоминаем готовые ответы — мгновенно даже для 90.', 'Remembering answers makes even 90 instant.') }
      ],
      task: {
        text: L('Напиши рекурсивні функції <code>long long power(long long base, int exp)</code> і <code>int digitSum(int n)</code> (сума цифр). Виведи <code>power(3, 13)</code> і <code>digitSum(987654)</code>, кожне з нового рядка.', 'Напиши рекурсивные функции <code>long long power(long long base, int exp)</code> и <code>int digitSum(int n)</code> (сумма цифр). Выведи <code>power(3, 13)</code> и <code>digitSum(987654)</code>, каждое с новой строки.', 'Write recursive <code>long long power(long long base, int exp)</code> and <code>int digitSum(int n)</code> (sum of digits). Print <code>power(3, 13)</code> and <code>digitSum(987654)</code>, each on its own line.'),
        how: [L('power: базовий випадок <code>exp == 0</code> → 1.', 'power: базовый случай <code>exp == 0</code> → 1.', 'power: base case <code>exp == 0</code> → 1.'), L('digitSum: <code>n &lt; 10</code> → n, інакше <code>n % 10 + digitSum(n / 10)</code>.', 'digitSum: <code>n &lt; 10</code> → n, иначе <code>n % 10 + digitSum(n / 10)</code>.', 'digitSum: <code>n &lt; 10</code> → n, else <code>n % 10 + digitSum(n / 10)</code>.')],
        starter: M(`// виклич power і digitSum`, null, `// напиши power і digitSum`),
        solution: M(`cout << power(3, 13) << "\\n";
cout << digitSum(987654) << "\\n";`, null, `long long power(long long base, int exp) {
  if (exp == 0) return 1;
  return base * power(base, exp - 1);
}

int digitSum(int n) {
  if (n < 10) return n;
  return n % 10 + digitSum(n / 10);
}`),
        hint: L('3¹³ = 1594323, а 9+8+7+6+5+4 = 39.', '3¹³ = 1594323, а 9+8+7+6+5+4 = 39.', '3¹³ = 1594323 and 9+8+7+6+5+4 = 39.'),
        expected: '1594323\n39',
        must: /power\s*\([^)]*exp\s*-\s*1\s*\)[\s\S]*digitSum\s*\(\s*n\s*\/\s*10\s*\)/
      },
      quiz: { q: L('Що зберігає стек викликів?', 'Что хранит стек вызовов?', 'What does the call stack hold?'), options: [L('незавершені виклики функцій', 'незавершённые вызовы функций', 'unfinished function calls'), L('глобальні змінні', 'глобальные переменные', 'global variables'), L('код програми', 'код программы', 'the program code')], answer: 0, explain: L('Кожен виклик чекає там на результат вкладеного.', 'Каждый вызов ждёт там результат вложенного.', 'Each call waits there for the nested one.') },
      ref: [{ code: 'T f(n) { if (base) return …; return … f(smaller); }', d: L('шаблон рекурсії', 'шаблон рекурсии', 'recursion pattern') }]
    },
    {
      id: 'stl-algorithms', chapter: CH6,
      title: L('Алгоритми STL і лямбди', 'Алгоритмы STL и лямбды', 'STL algorithms and lambdas'),
      theory: L(
        `<p>Заголовок <code>&lt;algorithm&gt;</code> містить десятки готових перевірених алгоритмів. Вони працюють з <b>діапазоном</b> <code>v.begin()</code> … <code>v.end()</code>, а правило часто передається <b>лямбдою</b> <code>[](int x) { return x &gt; 0; }</code>:</p>
<table class="mini"><tr><td><code>sort(b, e, cmp)</code></td><td>сортувати</td></tr><tr><td><code>count_if(b, e, pred)</code></td><td>скільки підходить</td></tr><tr><td><code>find_if(b, e, pred)</code></td><td>перший, що підходить (ітератор)</td></tr><tr><td><code>any_of / all_of / none_of</code></td><td>перевірки</td></tr><tr><td><code>transform(b, e, out, f)</code></td><td>перетворити кожен</td></tr><tr><td><code>*max_element(b, e)</code></td><td>найбільший</td></tr><tr><td><code>accumulate(b, e, 0)</code></td><td>сума (&lt;numeric&gt;)</td></tr><tr><td><code>reverse(b, e)</code></td><td>розвернути</td></tr></table>
<p>Лямбда може «захоплювати» змінні: <code>[limit](int x) { return x &gt; limit; }</code> — копія, <code>[&amp;total](int x) { total += x; }</code> — за посиланням.</p>`,
        `<p>Заголовок <code>&lt;algorithm&gt;</code> содержит десятки готовых проверенных алгоритмов. Они работают с <b>диапазоном</b> <code>v.begin()</code> … <code>v.end()</code>, а правило часто передаётся <b>лямбдой</b> <code>[](int x) { return x &gt; 0; }</code>:</p>
<table class="mini"><tr><td><code>sort(b, e, cmp)</code></td><td>сортировать</td></tr><tr><td><code>count_if(b, e, pred)</code></td><td>сколько подходит</td></tr><tr><td><code>find_if(b, e, pred)</code></td><td>первый подходящий (итератор)</td></tr><tr><td><code>any_of / all_of / none_of</code></td><td>проверки</td></tr><tr><td><code>transform(b, e, out, f)</code></td><td>преобразовать каждый</td></tr><tr><td><code>*max_element(b, e)</code></td><td>наибольший</td></tr><tr><td><code>accumulate(b, e, 0)</code></td><td>сумма (&lt;numeric&gt;)</td></tr><tr><td><code>reverse(b, e)</code></td><td>развернуть</td></tr></table>
<p>Лямбда может «захватывать» переменные: <code>[limit](int x) { return x &gt; limit; }</code> — копия, <code>[&amp;total](int x) { total += x; }</code> — по ссылке.</p>`,
        `<p>The <code>&lt;algorithm&gt;</code> header holds dozens of ready, well-tested algorithms. They work on a <b>range</b> <code>v.begin()</code> … <code>v.end()</code>, and the rule is often a <b>lambda</b> <code>[](int x) { return x &gt; 0; }</code>:</p>
<table class="mini"><tr><td><code>sort(b, e, cmp)</code></td><td>sort</td></tr><tr><td><code>count_if(b, e, pred)</code></td><td>how many match</td></tr><tr><td><code>find_if(b, e, pred)</code></td><td>first match (iterator)</td></tr><tr><td><code>any_of / all_of / none_of</code></td><td>checks</td></tr><tr><td><code>transform(b, e, out, f)</code></td><td>transform each</td></tr><tr><td><code>*max_element(b, e)</code></td><td>largest</td></tr><tr><td><code>accumulate(b, e, 0)</code></td><td>sum (&lt;numeric&gt;)</td></tr><tr><td><code>reverse(b, e)</code></td><td>reverse</td></tr></table>
<p>A lambda can “capture” variables: <code>[limit](int x) { return x &gt; limit; }</code> copies, <code>[&amp;total](int x) { total += x; }</code> captures by reference.</p>`),
      why: L(`<p>Навіщо готові алгоритми, якщо цикл можна написати самому? Вони вже перевірені мільйонами програмістів, оптимізовані й одразу кажуть читачеві, <b>що</b> робить код: <code>count_if</code> зрозуміліший, ніж цикл з лічильником і умовою. Менше власного коду — менше помилок на кшталт «вийшов за межі масиву».</p>`,
        `<p>Зачем готовые алгоритмы, если цикл можно написать самому? Они уже проверены миллионами программистов, оптимизированы и сразу говорят читателю, <b>что</b> делает код: <code>count_if</code> понятнее, чем цикл со счётчиком и условием. Меньше своего кода — меньше ошибок вроде «вышел за пределы массива».</p>`,
        `<p>Why ready-made algorithms if you can write the loop? They’re tested by millions, optimised, and tell the reader <b>what</b> the code does: <code>count_if</code> is clearer than a loop with a counter and a condition. Less hand-written code means fewer off-by-one bugs.</p>`),
      mistakes: L(`<ul><li><code>find_if</code> повертає <b>ітератор</b>; якщо нічого не знайдено, це <code>v.end()</code> — розіменовувати його не можна.</li><li><code>max_element</code> на порожньому векторі теж дає <code>end()</code>.</li><li><code>accumulate(b, e, 0)</code> з дробовими числами — початкове <code>0</code> робить суму цілою; пиши <code>0.0</code>.</li></ul>`,
        `<ul><li><code>find_if</code> возвращает <b>итератор</b>; если ничего не найдено, это <code>v.end()</code> — разыменовывать его нельзя.</li><li><code>max_element</code> на пустом векторе тоже даёт <code>end()</code>.</li><li><code>accumulate(b, e, 0)</code> с дробными числами — начальное <code>0</code> делает сумму целой; пиши <code>0.0</code>.</li></ul>`,
        `<ul><li><code>find_if</code> returns an <b>iterator</b>; when nothing matches it’s <code>v.end()</code>, which you must not dereference.</li><li><code>max_element</code> on an empty vector also gives <code>end()</code>.</li><li><code>accumulate(b, e, 0)</code> on doubles — the <code>0</code> start makes the sum an int; write <code>0.0</code>.</li></ul>`),
      examples: [
        { title: 'count_if / any_of', code: M(`vector<int> hp = {40, 0, 75, 0, 100};
int alive = count_if(hp.begin(), hp.end(), [](int h) { return h > 0; });
cout << "Alive: " << alive << "\\n";
bool full = any_of(hp.begin(), hp.end(), [](int h) { return h == 100; });
cout << boolalpha << "Someone full: " << full << "\\n";
cout << "Max: " << *max_element(hp.begin(), hp.end()) << "\\n";`, INC('iostream', 'vector', 'algorithm')), note: L('<code>boolalpha</code> друкує true/false словами.', '<code>boolalpha</code> печатает true/false словами.', '<code>boolalpha</code> prints true/false as words.') },
        { title: 'find_if', code: M(`vector<string> names = {"Ira", "Maksym", "Ola", "Bohdan"};
auto it = find_if(names.begin(), names.end(), [](const string& s) { return s.size() > 4; });
if (it != names.end()) cout << "First long: " << *it << " at " << (it - names.begin()) << "\\n";
auto none = find_if(names.begin(), names.end(), [](const string& s) { return s[0] == 'Z'; });
cout << (none == names.end() ? "No Z names" : *none) << "\\n";`, INC('iostream', 'vector', 'string', 'algorithm')), note: L('Позиція = ітератор − begin().', 'Позиция = итератор − begin().', 'Index = iterator − begin().') },
        { title: L('transform і захоплення', 'transform и захват', 'transform and capture'), code: M(`vector<int> prices = {100, 250, 80};
int discount = 20;
vector<int> sale(prices.size());
transform(prices.begin(), prices.end(), sale.begin(), [discount](int p) { return p * (100 - discount) / 100; });
for (int p : sale) cout << p << " ";
cout << "\\n";
int total = accumulate(sale.begin(), sale.end(), 0);
cout << "Total: " << total << "\\n";`, INC('iostream', 'vector', 'algorithm', 'numeric')), note: L('Лямбда «бачить» discount завдяки захопленню.', 'Лямбда «видит» discount благодаря захвату.', 'The lambda sees discount via capture.') }
      ],
      task: {
        text: L('Дано <code>vector&lt;int&gt; v = {7, -3, 12, 0, 5, -8, 20};</code>. Через алгоритми STL виведи: кількість додатних (<code>4</code>), перше число більше за 10 (<code>12</code>), а потім вектор, відсортований <b>за спаданням модуля</b> через пробіл (<code>20 12 -8 7 5 -3 0</code>).', 'Дано <code>vector&lt;int&gt; v = {7, -3, 12, 0, 5, -8, 20};</code>. С помощью алгоритмов STL выведи: количество положительных (<code>4</code>), первое число больше 10 (<code>12</code>), а затем вектор, отсортированный <b>по убыванию модуля</b> через пробел (<code>20 12 -8 7 5 -3 0</code>).', 'Given <code>vector&lt;int&gt; v = {7, -3, 12, 0, 5, -8, 20};</code>, use STL algorithms to print: the count of positives (<code>4</code>), the first number above 10 (<code>12</code>), then the vector sorted <b>by descending absolute value</b>, space-separated (<code>20 12 -8 7 5 -3 0</code>).'),
        how: [L('<code>count_if</code> і <code>find_if</code> з лямбдами.', '<code>count_if</code> и <code>find_if</code> с лямбдами.', '<code>count_if</code> and <code>find_if</code> with lambdas.'), L('Сортування: <code>sort(v.begin(), v.end(), [](int a, int b) { return abs(a) &gt; abs(b); });</code>', 'Сортировка: <code>sort(v.begin(), v.end(), [](int a, int b) { return abs(a) &gt; abs(b); });</code>', 'Sorting: <code>sort(v.begin(), v.end(), [](int a, int b) { return abs(a) &gt; abs(b); });</code>')],
        starter: M(`vector<int> v = {7, -3, 12, 0, 5, -8, 20};
// count_if, find_if, sort`, INC('iostream', 'vector', 'algorithm', 'cstdlib')),
        solution: M(`vector<int> v = {7, -3, 12, 0, 5, -8, 20};
cout << count_if(v.begin(), v.end(), [](int x) { return x > 0; }) << "\\n";
auto it = find_if(v.begin(), v.end(), [](int x) { return x > 10; });
cout << *it << "\\n";
sort(v.begin(), v.end(), [](int a, int b) { return abs(a) > abs(b); });
for (size_t i = 0; i < v.size(); i++) cout << v[i] << (i + 1 < v.size() ? " " : "\\n");`, INC('iostream', 'vector', 'algorithm', 'cstdlib')),
        hint: L('Три рядки: <code>4</code>, <code>12</code>, <code>20 12 -8 7 5 -3 0</code>.', 'Три строки: <code>4</code>, <code>12</code>, <code>20 12 -8 7 5 -3 0</code>.', 'Three lines: <code>4</code>, <code>12</code>, <code>20 12 -8 7 5 -3 0</code>.'),
        expected: '4\n12\n20 12 -8 7 5 -3 0',
        must: /count_if[\s\S]*find_if[\s\S]*sort/
      },
      quiz: { q: L('Що повертає <code>find_if</code>, якщо нічого не знайдено?', 'Что возвращает <code>find_if</code>, если ничего не найдено?', 'What does <code>find_if</code> return if nothing matches?'), options: ['-1', 'v.end()', 'nullptr'], answer: 1, explain: L('Ітератор «за кінцем» діапазону.', 'Итератор «за концом» диапазона.', 'The past-the-end iterator.') },
      ref: [{ code: 'count_if / find_if / any_of / all_of', d: L('пошук і підрахунок', 'поиск и подсчёт', 'search and count') }, { code: 'sort(b, e, [](T a, T b) { return …; })', d: L('сортування з лямбдою', 'сортировка с лямбдой', 'sort with a lambda') }, { code: '[x] [&x] [=] [&]', d: L('захоплення', 'захват', 'captures') }]
    },
    {
      id: 'stack-queue', chapter: CH6,
      title: L('Стек, черга, черга з пріоритетом', 'Стек, очередь, очередь с приоритетом', 'Stack, queue, priority queue'),
      theory: L(
        `<p>Три контейнери з особливими правилами доступу:</p>
<table class="mini"><tr><td><code>stack&lt;T&gt;</code></td><td>«останній прийшов — перший пішов» (LIFO), як стопка тарілок: <code>push</code>, <code>top</code>, <code>pop</code></td></tr><tr><td><code>queue&lt;T&gt;</code></td><td>«перший прийшов — перший пішов» (FIFO), як черга в магазині: <code>push</code>, <code>front</code>, <code>pop</code></td></tr><tr><td><code>priority_queue&lt;T&gt;</code></td><td>на вершині завжди <b>найбільший</b> елемент: <code>push</code>, <code>top</code>, <code>pop</code></td></tr><tr><td><code>deque&lt;T&gt;</code></td><td>додавати й забирати з обох кінців: <code>push_front</code>, <code>push_back</code></td></tr></table>
<p>Зверни увагу: <code>pop()</code> лише <b>видаляє</b> елемент і нічого не повертає — спершу прочитай <code>top()</code> чи <code>front()</code>.</p>
<p>Щоб <code>priority_queue</code> віддавала найменший, використовують <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code>.</p>`,
        `<p>Три контейнера с особыми правилами доступа:</p>
<table class="mini"><tr><td><code>stack&lt;T&gt;</code></td><td>«последним пришёл — первым ушёл» (LIFO), как стопка тарелок: <code>push</code>, <code>top</code>, <code>pop</code></td></tr><tr><td><code>queue&lt;T&gt;</code></td><td>«первым пришёл — первым ушёл» (FIFO), как очередь в магазине: <code>push</code>, <code>front</code>, <code>pop</code></td></tr><tr><td><code>priority_queue&lt;T&gt;</code></td><td>на вершине всегда <b>наибольший</b> элемент: <code>push</code>, <code>top</code>, <code>pop</code></td></tr><tr><td><code>deque&lt;T&gt;</code></td><td>добавлять и забирать с обоих концов: <code>push_front</code>, <code>push_back</code></td></tr></table>
<p>Обрати внимание: <code>pop()</code> только <b>удаляет</b> элемент и ничего не возвращает — сначала прочитай <code>top()</code> или <code>front()</code>.</p>
<p>Чтобы <code>priority_queue</code> отдавала наименьший, используют <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code>.</p>`,
        `<p>Three containers with special access rules:</p>
<table class="mini"><tr><td><code>stack&lt;T&gt;</code></td><td>last in, first out (LIFO), like a stack of plates: <code>push</code>, <code>top</code>, <code>pop</code></td></tr><tr><td><code>queue&lt;T&gt;</code></td><td>first in, first out (FIFO), like a shop queue: <code>push</code>, <code>front</code>, <code>pop</code></td></tr><tr><td><code>priority_queue&lt;T&gt;</code></td><td>the <b>largest</b> item is always on top: <code>push</code>, <code>top</code>, <code>pop</code></td></tr><tr><td><code>deque&lt;T&gt;</code></td><td>add and remove at both ends: <code>push_front</code>, <code>push_back</code></td></tr></table>
<p>Note: <code>pop()</code> only <b>removes</b> and returns nothing — read <code>top()</code> or <code>front()</code> first.</p>
<p>For a smallest-first <code>priority_queue</code> use <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code>.</p>`),
      why: L(`<p>Обмеження — це перевага: стек ідеальний для «скасувати дію» (Ctrl+Z повертає останню), перевірки дужок і обходу в глибину; черга — для обробки подій по порядку та пошуку найкоротшого шляху (BFS); черга з пріоритетом — для «наступного найважливішого» завдання, як-от ворога з найбільшою загрозою чи алгоритму Дейкстри.</p>`,
        `<p>Ограничение — это преимущество: стек идеален для «отменить действие» (Ctrl+Z возвращает последнее), проверки скобок и обхода в глубину; очередь — для обработки событий по порядку и поиска кратчайшего пути (BFS); очередь с приоритетом — для «следующей самой важной» задачи, например врага с наибольшей угрозой или алгоритма Дейкстры.</p>`,
        `<p>The restriction is a feature: a stack is perfect for undo (Ctrl+Z returns the last action), bracket checking and depth-first search; a queue for processing events in order and shortest paths (BFS); a priority queue for “the next most important” job — the biggest threat, or Dijkstra’s algorithm.</p>`),
      mistakes: L(`<ul><li><code>int x = s.pop();</code> — помилка: <code>pop</code> нічого не повертає.</li><li><code>top()</code> чи <code>front()</code> на порожньому контейнері — невизначена поведінка; перевіряй <code>empty()</code>.</li><li>Перебирати stack/queue циклом <code>for</code> не можна — лише забирати по одному.</li></ul>`,
        `<ul><li><code>int x = s.pop();</code> — ошибка: <code>pop</code> ничего не возвращает.</li><li><code>top()</code> или <code>front()</code> на пустом контейнере — неопределённое поведение; проверяй <code>empty()</code>.</li><li>Перебирать stack/queue циклом <code>for</code> нельзя — только забирать по одному.</li></ul>`,
        `<ul><li><code>int x = s.pop();</code> is an error: <code>pop</code> returns nothing.</li><li><code>top()</code> or <code>front()</code> on an empty container is undefined behaviour; check <code>empty()</code>.</li><li>You can’t range-for over stack/queue — only take items one by one.</li></ul>`),
      examples: [
        { title: L('Стек: скасування', 'Стек: отмена', 'Stack: undo'), code: M(`stack<string> history;
history.push("type A");
history.push("type B");
history.push("delete");
while (!history.empty()) {
  cout << "Undo: " << history.top() << "\\n";
  history.pop();
}`, INC('iostream', 'stack', 'string')), note: L('Останнє скасовується першим.', 'Последнее отменяется первым.', 'The last action is undone first.') },
        { title: L('Черга: каса', 'Очередь: касса', 'Queue: checkout'), code: M(`queue<string> line;
for (string name : {"Ira", "Max", "Ola"}) line.push(name);
while (!line.empty()) {
  cout << "Serving " << line.front() << ", left " << line.size() - 1 << "\\n";
  line.pop();
}`, INC('iostream', 'queue', 'string')), note: L('Хто першим прийшов — першим обслужений.', 'Кто первым пришёл — первым обслужен.', 'First come, first served.') },
        { title: 'priority_queue', code: M(`priority_queue<pair<int, string>> threats;
threats.push({30, "Archer"});
threats.push({90, "Dragon"});
threats.push({55, "Knight"});
while (!threats.empty()) {
  cout << threats.top().second << " (" << threats.top().first << ")\\n";
  threats.pop();
}`, INC('iostream', 'queue', 'string', 'vector')), note: L('pair порівнюється спершу за першим полем.', 'pair сравнивается сначала по первому полю.', 'pairs compare by the first field first.') }
      ],
      task: {
        text: L('Напиши <code>bool balanced(const string&amp; s)</code>, що перевіряє дужки <code>()[]{}</code> за допомогою стека. Для рядків <code>"{[()()]}"</code>, <code>"([)]"</code>, <code>"((()"</code> виведи <code>OK</code> або <code>BAD</code>.', 'Напиши <code>bool balanced(const string&amp; s)</code>, которая проверяет скобки <code>()[]{}</code> с помощью стека. Для строк <code>"{[()()]}"</code>, <code>"([)]"</code>, <code>"((()"</code> выведи <code>OK</code> или <code>BAD</code>.', 'Write <code>bool balanced(const string&amp; s)</code> that checks <code>()[]{}</code> brackets using a stack. For <code>"{[()()]}"</code>, <code>"([)]"</code>, <code>"((()"</code> print <code>OK</code> or <code>BAD</code>.'),
        how: [L('Відкриваюча дужка — <code>push</code>. Закриваюча: стек порожній або на вершині не пара — <code>false</code>, інакше <code>pop</code>.', 'Открывающая скобка — <code>push</code>. Закрывающая: стек пуст или на вершине не пара — <code>false</code>, иначе <code>pop</code>.', 'Opening bracket: <code>push</code>. Closing: empty stack or wrong pair on top → <code>false</code>, else <code>pop</code>.'), L('Наприкінці стек має бути порожнім.', 'В конце стек должен быть пустым.', 'At the end the stack must be empty.')],
        starter: M(`for (string s : {"{[()()]}", "([)]", "((()"}) {
  // cout << (balanced(s) ? "OK" : "BAD") << "\\n";
}`, INC('iostream', 'stack', 'string'), `bool balanced(const string& s) {
  stack<char> st;
  return false;
}`),
        solution: M(`for (string s : {"{[()()]}", "([)]", "((()"}) {
  cout << (balanced(s) ? "OK" : "BAD") << "\\n";
}`, INC('iostream', 'stack', 'string'), `bool balanced(const string& s) {
  stack<char> st;
  for (char c : s) {
    if (c == '(' || c == '[' || c == '{') {
      st.push(c);
    } else {
      if (st.empty()) return false;
      char open = st.top();
      st.pop();
      if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) return false;
    }
  }
  return st.empty();
}`),
        hint: L('Очікувано: <code>OK</code>, <code>BAD</code>, <code>BAD</code>.', 'Ожидается: <code>OK</code>, <code>BAD</code>, <code>BAD</code>.', 'Expected: <code>OK</code>, <code>BAD</code>, <code>BAD</code>.'),
        expected: 'OK\nBAD\nBAD',
        must: /stack<char>[\s\S]*push[\s\S]*pop/
      },
      quiz: { q: L('Який контейнер працює за принципом «перший прийшов — перший пішов»?', 'Какой контейнер работает по принципу «первым пришёл — первым ушёл»?', 'Which container is first-in, first-out?'), options: ['stack', 'queue', 'priority_queue'], answer: 1, explain: L('Черга — FIFO, стек — LIFO.', 'Очередь — FIFO, стек — LIFO.', 'Queue is FIFO, stack is LIFO.') },
      ref: [{ code: 'stack: push top pop empty', d: 'LIFO' }, { code: 'queue: push front pop empty', d: 'FIFO' }, { code: 'priority_queue: push top pop', d: L('найбільший зверху', 'наибольший сверху', 'largest on top') }]
    },
    {
      id: 'sets-pairs', chapter: CH6,
      title: L('set, unordered_map і pair', 'set, unordered_map и pair', 'set, unordered_map and pair'),
      theory: L(
        `<p><b>set&lt;T&gt;</b> — множина: кожне значення зберігається <b>один раз</b> і завжди відсортоване.</p>
<pre class="inline-code">set&lt;string&gt; tags = {"rpg", "co-op", "rpg"};  // {"co-op", "rpg"}
tags.insert("pvp");
if (tags.count("rpg")) cout &lt;&lt; "has rpg";</pre>
<p><b>unordered_map&lt;K, V&gt;</b> — як <code>map</code>, але без сортування ключів і зазвичай швидша. <b>unordered_set</b> — така сама множина без порядку.</p>
<p><b>pair&lt;A, B&gt;</b> — два значення разом: <code>pair&lt;string, int&gt; p = {"Ira", 12};</code>, поля <code>p.first</code>, <code>p.second</code>.</p>
<p><b>Структурне зв’язування</b> (C++17) розпаковує пари й елементи мапи в змінні:</p>
<pre class="inline-code">for (const auto&amp; [name, score] : scores)
  cout &lt;&lt; name &lt;&lt; ": " &lt;&lt; score &lt;&lt; "\\n";</pre>`,
        `<p><b>set&lt;T&gt;</b> — множество: каждое значение хранится <b>один раз</b> и всегда отсортировано.</p>
<pre class="inline-code">set&lt;string&gt; tags = {"rpg", "co-op", "rpg"};  // {"co-op", "rpg"}
tags.insert("pvp");
if (tags.count("rpg")) cout &lt;&lt; "has rpg";</pre>
<p><b>unordered_map&lt;K, V&gt;</b> — как <code>map</code>, но без сортировки ключей и обычно быстрее. <b>unordered_set</b> — такое же множество без порядка.</p>
<p><b>pair&lt;A, B&gt;</b> — два значения вместе: <code>pair&lt;string, int&gt; p = {"Ira", 12};</code>, поля <code>p.first</code>, <code>p.second</code>.</p>
<p><b>Структурное связывание</b> (C++17) распаковывает пары и элементы мапы в переменные:</p>
<pre class="inline-code">for (const auto&amp; [name, score] : scores)
  cout &lt;&lt; name &lt;&lt; ": " &lt;&lt; score &lt;&lt; "\\n";</pre>`,
        `<p><b>set&lt;T&gt;</b> is a set: each value is stored <b>once</b> and always kept sorted.</p>
<pre class="inline-code">set&lt;string&gt; tags = {"rpg", "co-op", "rpg"};  // {"co-op", "rpg"}
tags.insert("pvp");
if (tags.count("rpg")) cout &lt;&lt; "has rpg";</pre>
<p><b>unordered_map&lt;K, V&gt;</b> is like <code>map</code> but without key ordering, and usually faster. <b>unordered_set</b> is the unordered set.</p>
<p><b>pair&lt;A, B&gt;</b> holds two values: <code>pair&lt;string, int&gt; p = {"Ira", 12};</code>, fields <code>p.first</code>, <code>p.second</code>.</p>
<p><b>Structured bindings</b> (C++17) unpack pairs and map entries into variables:</p>
<pre class="inline-code">for (const auto&amp; [name, score] : scores)
  cout &lt;&lt; name &lt;&lt; ": " &lt;&lt; score &lt;&lt; "\\n";</pre>`),
      why: L(`<p>Множина відповідає на питання «чи бачили ми це вже?» миттєво — так знаходять унікальних відвідувачів, відвідані клітинки лабіринту чи повтори в списку. <code>set</code> обирають, коли потрібен порядок, <code>unordered_*</code> — коли важлива швидкість. А <code>pair</code> і структурне зв’язування позбавляють від зайвих структур для «двох значень разом».</p>`,
        `<p>Множество отвечает на вопрос «видели ли мы это уже?» мгновенно — так находят уникальных посетителей, посещённые клетки лабиринта или повторы в списке. <code>set</code> выбирают, когда нужен порядок, <code>unordered_*</code> — когда важна скорость. А <code>pair</code> и структурное связывание избавляют от лишних структур для «двух значений вместе».</p>`,
        `<p>A set answers “have we seen this already?” instantly — unique visitors, visited maze cells, duplicates in a list. Pick <code>set</code> when you need order, <code>unordered_*</code> when you need speed. <code>pair</code> and structured bindings save you from writing tiny structs for “two values together”.</p>`),
      mistakes: L(`<ul><li>Порядок обходу <code>unordered_map</code> не визначений — не покладайся на нього у виводі.</li><li><code>m[key]</code> для неіснуючого ключа <b>створює</b> його зі значенням 0; для перевірки використовуй <code>count</code> чи <code>find</code>.</li><li><code>set</code> не має індексів: <code>s[0]</code> — помилка.</li></ul>`,
        `<ul><li>Порядок обхода <code>unordered_map</code> не определён — не полагайся на него в выводе.</li><li><code>m[key]</code> для несуществующего ключа <b>создаёт</b> его со значением 0; для проверки используй <code>count</code> или <code>find</code>.</li><li>У <code>set</code> нет индексов: <code>s[0]</code> — ошибка.</li></ul>`,
        `<ul><li><code>unordered_map</code> iteration order is unspecified — don’t rely on it for output.</li><li><code>m[key]</code> on a missing key <b>creates</b> it with value 0; use <code>count</code> or <code>find</code> to check.</li><li>A <code>set</code> has no indexes: <code>s[0]</code> is an error.</li></ul>`),
      examples: [
        { title: L('Унікальні значення', 'Уникальные значения', 'Unique values'), code: M(`vector<int> visits = {5, 3, 5, 9, 3, 3, 1};
set<int> unique(visits.begin(), visits.end());
cout << unique.size() << " unique:";
for (int v : unique) cout << " " << v;
cout << "\\n";
cout << unique.count(9) << " " << unique.count(7) << "\\n";`, INC('iostream', 'set', 'vector')), note: L('Повтори зникли, порядок — зростання.', 'Повторы исчезли, порядок — возрастание.', 'Duplicates gone, sorted ascending.') },
        { title: L('pair і зв’язування', 'pair и связывание', 'pair and bindings'), code: M(`pair<string, int> best = {"Ira", 450};
cout << best.first << " " << best.second << "\\n";
auto [name, score] = best;
cout << name << " has " << score << "\\n";
vector<pair<int, string>> ranks = {{3, "Ola"}, {1, "Max"}, {2, "Ira"}};
sort(ranks.begin(), ranks.end());
for (const auto& [place, who] : ranks) cout << place << ". " << who << "\\n";`, INC('iostream', 'string', 'vector', 'algorithm')), note: L('pair сортується за first, потім за second.', 'pair сортируется по first, затем по second.', 'pairs sort by first, then second.') },
        { title: 'unordered_map', code: M(`unordered_map<string, int> stock = {{"apple", 5}, {"pear", 0}};
stock["plum"] += 3;
for (string item : {"apple", "pear", "kiwi", "plum"}) {
  auto it = stock.find(item);
  if (it == stock.end()) cout << item << ": unknown\\n";
  else cout << item << ": " << it->second << "\\n";
}`, INC('iostream', 'string', 'unordered_map')), note: L('find не створює новий ключ.', 'find не создаёт новый ключ.', 'find doesn’t create a key.') }
      ],
      task: {
        text: L('Дано два списки учасників: <code>{"Ira", "Max", "Ola", "Taras"}</code> (клуб шахів) і <code>{"Max", "Kira", "Taras", "Yana"}</code> (клуб кодингу). Через <code>set</code> виведи: <code>Both: Max Taras</code>, <code>Only chess: Ira Ola</code>, <code>Total: 6</code> (усього різних людей).', 'Даны два списка участников: <code>{"Ira", "Max", "Ola", "Taras"}</code> (клуб шахмат) и <code>{"Max", "Kira", "Taras", "Yana"}</code> (клуб кодинга). С помощью <code>set</code> выведи: <code>Both: Max Taras</code>, <code>Only chess: Ira Ola</code>, <code>Total: 6</code> (всего разных людей).', 'Given two member lists: <code>{"Ira", "Max", "Ola", "Taras"}</code> (chess club) and <code>{"Max", "Kira", "Taras", "Yana"}</code> (coding club), use <code>set</code> to print: <code>Both: Max Taras</code>, <code>Only chess: Ira Ola</code>, <code>Total: 6</code> (distinct people).'),
        how: [L('Збери обидва списки в <code>set&lt;string&gt;</code>; спільні — ті з шахів, для яких <code>coding.count(n)</code> = 1.', 'Собери оба списка в <code>set&lt;string&gt;</code>; общие — те из шахмат, для которых <code>coding.count(n)</code> = 1.', 'Put both lists in <code>set&lt;string&gt;</code>; common members are chess names with <code>coding.count(n)</code> = 1.'), L('Усього: ще одна множина, куди вставити всіх.', 'Всего: ещё одно множество, куда вставить всех.', 'Total: another set with everyone inserted.')],
        starter: M(`set<string> chess = {"Ira", "Max", "Ola", "Taras"};
set<string> coding = {"Max", "Kira", "Taras", "Yana"};
// Both, Only chess, Total`, INC('iostream', 'set', 'string')),
        solution: M(`set<string> chess = {"Ira", "Max", "Ola", "Taras"};
set<string> coding = {"Max", "Kira", "Taras", "Yana"};
cout << "Both:";
for (const string& n : chess) if (coding.count(n)) cout << " " << n;
cout << "\\nOnly chess:";
for (const string& n : chess) if (!coding.count(n)) cout << " " << n;
set<string> all = chess;
all.insert(coding.begin(), coding.end());
cout << "\\nTotal: " << all.size() << "\\n";`, INC('iostream', 'set', 'string')),
        hint: L('set обходиться в алфавітному порядку — тому Max перед Taras.', 'set обходится в алфавитном порядке — поэтому Max перед Taras.', 'A set iterates alphabetically — so Max comes before Taras.'),
        expected: 'Both: Max Taras\nOnly chess: Ira Ola\nTotal: 6',
        must: /set<string>[\s\S]*count/
      },
      quiz: { q: L('Скільки елементів у <code>set&lt;int&gt;{3, 1, 3, 2, 1}</code>?', 'Сколько элементов в <code>set&lt;int&gt;{3, 1, 3, 2, 1}</code>?', 'How many items are in <code>set&lt;int&gt;{3, 1, 3, 2, 1}</code>?'), options: ['5', '3', '2'], answer: 1, explain: L('Повтори відкидаються: {1, 2, 3}.', 'Повторы отбрасываются: {1, 2, 3}.', 'Duplicates are dropped: {1, 2, 3}.') },
      ref: [{ code: 'set<T> s; s.insert(x); s.count(x)', d: L('множина', 'множество', 'set') }, { code: 'unordered_map<K, V>', d: L('швидка мапа', 'быстрая мапа', 'hash map') }, { code: 'auto [a, b] = p;', d: L('структурне зв’язування', 'структурное связывание', 'structured binding') }]
    },
    {
      id: 'exceptions', chapter: CH6,
      title: L('Винятки: try, throw, catch', 'Исключения: try, throw, catch', 'Exceptions: try, throw, catch'),
      theory: L(
        `<p>Коли функція не може виконати свою роботу (неправильні дані, немає грошей, файл не знайдено), вона може <b>кинути виняток</b>:</p>
<pre class="inline-code">void withdraw(int&amp; balance, int amount) {
  if (amount &gt; balance) throw runtime_error("not enough money");
  balance -= amount;
}

try {
  withdraw(balance, 500);
} catch (const exception&amp; e) {
  cout &lt;&lt; "Error: " &lt;&lt; e.what() &lt;&lt; "\\n";
}</pre>
<ul><li>Стандартні винятки (<code>&lt;stdexcept&gt;</code>): <code>runtime_error</code>, <code>invalid_argument</code>, <code>out_of_range</code></li><li><code>e.what()</code> — текст помилки</li><li>Після <code>throw</code> решта функції <b>не виконується</b>: керування стрибає до найближчого відповідного <code>catch</code></li><li><code>v.at(i)</code> кидає <code>out_of_range</code>, а <code>v[i]</code> — ні (просто читає чужу пам’ять)</li><li><code>stoi("abc")</code> кидає <code>invalid_argument</code></li></ul>`,
        `<p>Когда функция не может выполнить свою работу (неверные данные, нет денег, файл не найден), она может <b>бросить исключение</b>:</p>
<pre class="inline-code">void withdraw(int&amp; balance, int amount) {
  if (amount &gt; balance) throw runtime_error("not enough money");
  balance -= amount;
}

try {
  withdraw(balance, 500);
} catch (const exception&amp; e) {
  cout &lt;&lt; "Error: " &lt;&lt; e.what() &lt;&lt; "\\n";
}</pre>
<ul><li>Стандартные исключения (<code>&lt;stdexcept&gt;</code>): <code>runtime_error</code>, <code>invalid_argument</code>, <code>out_of_range</code></li><li><code>e.what()</code> — текст ошибки</li><li>После <code>throw</code> остаток функции <b>не выполняется</b>: управление прыгает к ближайшему подходящему <code>catch</code></li><li><code>v.at(i)</code> бросает <code>out_of_range</code>, а <code>v[i]</code> — нет (просто читает чужую память)</li><li><code>stoi("abc")</code> бросает <code>invalid_argument</code></li></ul>`,
        `<p>When a function can’t do its job (bad data, not enough money, file missing), it can <b>throw an exception</b>:</p>
<pre class="inline-code">void withdraw(int&amp; balance, int amount) {
  if (amount &gt; balance) throw runtime_error("not enough money");
  balance -= amount;
}

try {
  withdraw(balance, 500);
} catch (const exception&amp; e) {
  cout &lt;&lt; "Error: " &lt;&lt; e.what() &lt;&lt; "\\n";
}</pre>
<ul><li>Standard exceptions (<code>&lt;stdexcept&gt;</code>): <code>runtime_error</code>, <code>invalid_argument</code>, <code>out_of_range</code></li><li><code>e.what()</code> is the message</li><li>After <code>throw</code> the rest of the function <b>doesn’t run</b>: control jumps to the nearest matching <code>catch</code></li><li><code>v.at(i)</code> throws <code>out_of_range</code>; <code>v[i]</code> doesn’t (it just reads foreign memory)</li><li><code>stoi("abc")</code> throws <code>invalid_argument</code></li></ul>`),
      why: L(`<p>Без винятків функції повертали б «коди помилок», які легко забути перевірити, і програма тихо працювала б з неправильними даними. Виняток <b>неможливо</b> проігнорувати: або його хтось обробить, або програма зупиниться з повідомленням. А обробку можна зібрати в одному місці, а не після кожного виклику.</p>`,
        `<p>Без исключений функции возвращали бы «коды ошибок», которые легко забыть проверить, и программа тихо работала бы с неправильными данными. Исключение <b>невозможно</b> проигнорировать: либо его кто-то обработает, либо программа остановится с сообщением. А обработку можно собрать в одном месте, а не после каждого вызова.</p>`,
        `<p>Without exceptions functions would return “error codes” that are easy to forget to check, and the program would silently carry on with bad data. An exception <b>can’t</b> be ignored: someone handles it or the program stops with a message. And handling can live in one place instead of after every call.</p>`),
      mistakes: L(`<ul><li>Ловити за значенням <code>catch (exception e)</code> — губиться інформація про конкретний тип; лови <code>const exception&amp;</code>.</li><li>Загальний <code>catch (...)</code> перед конкретними — конкретні ніколи не спрацюють.</li><li>Кидати винятки для звичайних ситуацій (кінець циклу) — це повільно й заплутано.</li></ul>`,
        `<ul><li>Ловить по значению <code>catch (exception e)</code> — теряется информация о конкретном типе; лови <code>const exception&amp;</code>.</li><li>Общий <code>catch (...)</code> перед конкретными — конкретные никогда не сработают.</li><li>Бросать исключения для обычных ситуаций (конец цикла) — медленно и запутанно.</li></ul>`,
        `<ul><li>Catching by value <code>catch (exception e)</code> loses the concrete type; catch <code>const exception&amp;</code>.</li><li>A catch-all <code>catch (...)</code> before specific ones means they never fire.</li><li>Throwing for ordinary situations (like ending a loop) is slow and confusing.</li></ul>`),
      examples: [
        { title: 'at() / stoi', code: M(`vector<int> v = {1, 2, 3};
try {
  cout << v.at(1) << "\\n";
  cout << v.at(10) << "\\n";
  cout << "never printed\\n";
} catch (const out_of_range& e) {
  cout << "Out of range!\\n";
}
try {
  int n = stoi("12abc");
  cout << n << "\\n";
  stoi("abc");
} catch (const invalid_argument& e) {
  cout << "Not a number\\n";
}`, INC('iostream', 'vector', 'string', 'stdexcept')), note: L('stoi("12abc") читає 12, а "abc" — помилка.', 'stoi("12abc") читает 12, а "abc" — ошибка.', 'stoi("12abc") reads 12; "abc" fails.') },
        { title: L('Свій throw', 'Свой throw', 'Your own throw'), code: M(`for (int age : {14, -3, 200}) {
  try {
    setAge(age);
  } catch (const invalid_argument& e) {
    cout << "Error: " << e.what() << "\\n";
  }
}`, INC('iostream', 'stdexcept'), `void setAge(int age) {
  if (age < 0 || age > 150) throw invalid_argument("bad age " + to_string(age));
  cout << "Age set to " << age << "\\n";
}`), note: L('Програма не падає — помилки оброблені.', 'Программа не падает — ошибки обработаны.', 'The program survives — errors are handled.') },
        { title: L('Кілька catch', 'Несколько catch', 'Several catches'), code: M(`for (int i = 0; i < 3; i++) {
  try {
    risky(i);
  } catch (const out_of_range& e) {
    cout << "range: " << e.what() << "\\n";
  } catch (const exception& e) {
    cout << "other: " << e.what() << "\\n";
  }
}`, INC('iostream', 'stdexcept'), `void risky(int kind) {
  if (kind == 0) throw out_of_range("index 99");
  if (kind == 1) throw runtime_error("server down");
  cout << "all good\\n";
}`), note: L('Спрацьовує перший відповідний catch.', 'Срабатывает первый подходящий catch.', 'The first matching catch runs.') }
      ],
      task: {
        text: L('Напиши <code>int parseScore(const string&amp; s)</code>: перетворює рядок через <code>stoi</code> і кидає <code>out_of_range("score must be 0-100")</code>, якщо число поза 0…100. Для рядків <code>"85"</code>, <code>"abc"</code>, <code>"150"</code>, <code>"40"</code> виведи <code>OK 85</code>, <code>Not a number: abc</code>, <code>Error: score must be 0-100</code>, <code>OK 40</code>, а наприкінці <code>Sum: 125</code>.', 'Напиши <code>int parseScore(const string&amp; s)</code>: преобразует строку через <code>stoi</code> и бросает <code>out_of_range("score must be 0-100")</code>, если число вне 0…100. Для строк <code>"85"</code>, <code>"abc"</code>, <code>"150"</code>, <code>"40"</code> выведи <code>OK 85</code>, <code>Not a number: abc</code>, <code>Error: score must be 0-100</code>, <code>OK 40</code>, а в конце <code>Sum: 125</code>.', 'Write <code>int parseScore(const string&amp; s)</code>: converts with <code>stoi</code> and throws <code>out_of_range("score must be 0-100")</code> if outside 0…100. For <code>"85"</code>, <code>"abc"</code>, <code>"150"</code>, <code>"40"</code> print <code>OK 85</code>, <code>Not a number: abc</code>, <code>Error: score must be 0-100</code>, <code>OK 40</code>, and finally <code>Sum: 125</code>.'),
        how: [L('Два catch: <code>invalid_argument</code> (від stoi) і <code>out_of_range</code> (твій).', 'Два catch: <code>invalid_argument</code> (от stoi) и <code>out_of_range</code> (твой).', 'Two catches: <code>invalid_argument</code> (from stoi) and <code>out_of_range</code> (yours).'), L('Додавай до суми лише у блоці <code>try</code> після успішного виклику.', 'Прибавляй к сумме только в блоке <code>try</code> после успешного вызова.', 'Add to the sum only inside <code>try</code>, after a successful call.')],
        starter: M(`int sum = 0;
for (string s : {"85", "abc", "150", "40"}) {
  // try / catch
}
cout << "Sum: " << sum << "\\n";`, INC('iostream', 'string', 'stdexcept'), `int parseScore(const string& s) {
  return stoi(s);
}`),
        solution: M(`int sum = 0;
for (string s : {"85", "abc", "150", "40"}) {
  try {
    int v = parseScore(s);
    sum += v;
    cout << "OK " << v << "\\n";
  } catch (const invalid_argument& e) {
    cout << "Not a number: " << s << "\\n";
  } catch (const out_of_range& e) {
    cout << "Error: " << e.what() << "\\n";
  }
}
cout << "Sum: " << sum << "\\n";`, INC('iostream', 'string', 'stdexcept'), `int parseScore(const string& s) {
  int v = stoi(s);
  if (v < 0 || v > 100) throw out_of_range("score must be 0-100");
  return v;
}`),
        hint: L('85 + 40 = 125.', '85 + 40 = 125.', '85 + 40 = 125.'),
        expected: 'OK 85\nNot a number: abc\nError: score must be 0-100\nOK 40\nSum: 125',
        must: /throw\s+out_of_range[\s\S]*catch/
      },
      quiz: { q: L('Що повертає <code>e.what()</code>?', 'Что возвращает <code>e.what()</code>?', 'What does <code>e.what()</code> return?'), options: [L('код помилки', 'код ошибки', 'an error code'), L('текст повідомлення', 'текст сообщения', 'the message text'), L('номер рядка', 'номер строки', 'the line number')], answer: 1, explain: L('Той рядок, що передали в конструктор винятку.', 'Ту строку, что передали в конструктор исключения.', 'The string given to the exception’s constructor.') },
      ref: [{ code: 'throw runtime_error("…");', d: L('кинути', 'бросить', 'throw') }, { code: 'try { } catch (const exception& e) { e.what(); }', d: L('перехопити', 'перехватить', 'catch') }, { code: 'v.at(i)  stoi(s)', d: L('кидають винятки', 'бросают исключения', 'throwing helpers') }]
    },
    {
      id: 'enum-switch', chapter: CH6,
      title: L('enum class і машина станів', 'enum class и машина состояний', 'enum class and state machines'),
      theory: L(
        `<p><b>enum class</b> — тип з фіксованим набором іменованих значень:</p>
<pre class="inline-code">enum class State { Idle, Walking, Jumping, Dead };

State s = State::Idle;
switch (s) {
  case State::Idle:    cout &lt;&lt; "idle"; break;
  case State::Walking: cout &lt;&lt; "walk"; break;
  default: break;
}</pre>
<ul><li>Значення пишуться з префіксом: <code>State::Idle</code> — без плутанини з іншими enum</li><li><code>enum class</code> не перетворюється на число сам — для виводу пишуть функцію <code>toString(State)</code> або <code>static_cast&lt;int&gt;(s)</code></li><li>Компілятор попереджає, якщо в <code>switch</code> забули якийсь стан</li></ul>
<p><b>Машина станів</b> — об’єкт завжди перебуває в одному стані, а події переводять його в інший: світлофор, ворог (патруль → переслідування → атака), меню гри.</p>`,
        `<p><b>enum class</b> — тип с фиксированным набором именованных значений:</p>
<pre class="inline-code">enum class State { Idle, Walking, Jumping, Dead };

State s = State::Idle;
switch (s) {
  case State::Idle:    cout &lt;&lt; "idle"; break;
  case State::Walking: cout &lt;&lt; "walk"; break;
  default: break;
}</pre>
<ul><li>Значения пишутся с префиксом: <code>State::Idle</code> — без путаницы с другими enum</li><li><code>enum class</code> не превращается в число сам — для вывода пишут функцию <code>toString(State)</code> или <code>static_cast&lt;int&gt;(s)</code></li><li>Компилятор предупреждает, если в <code>switch</code> забыли какое-то состояние</li></ul>
<p><b>Машина состояний</b> — объект всегда находится в одном состоянии, а события переводят его в другое: светофор, враг (патруль → преследование → атака), меню игры.</p>`,
        `<p>An <b>enum class</b> is a type with a fixed set of named values:</p>
<pre class="inline-code">enum class State { Idle, Walking, Jumping, Dead };

State s = State::Idle;
switch (s) {
  case State::Idle:    cout &lt;&lt; "idle"; break;
  case State::Walking: cout &lt;&lt; "walk"; break;
  default: break;
}</pre>
<ul><li>Values carry a prefix: <code>State::Idle</code> — no clashes with other enums</li><li>An <code>enum class</code> doesn’t silently become a number — write a <code>toString(State)</code> or use <code>static_cast&lt;int&gt;(s)</code></li><li>The compiler warns if a <code>switch</code> misses a state</li></ul>
<p>A <b>state machine</b>: an object is always in exactly one state, and events move it to another — a traffic light, an enemy (patrol → chase → attack), a game menu.</p>`),
      why: L(`<p>Чому не просто числа <code>0, 1, 2</code> чи рядки <code>"idle"</code>? Число нічого не каже читачеві, а в рядку легко зробити друкарську помилку (<code>"idel"</code>), яку компілятор не помітить. <code>State::Idle</code> зрозумілий, а помилку в назві компілятор знайде одразу. Так влаштовано ШІ ворогів у більшості ігор.</p>`,
        `<p>Почему не просто числа <code>0, 1, 2</code> или строки <code>"idle"</code>? Число ничего не говорит читателю, а в строке легко сделать опечатку (<code>"idel"</code>), которую компилятор не заметит. <code>State::Idle</code> понятен, а ошибку в названии компилятор найдёт сразу. Так устроен ИИ врагов в большинстве игр.</p>`,
        `<p>Why not plain numbers <code>0, 1, 2</code> or strings like <code>"idle"</code>? A number tells the reader nothing, and a string typo (<code>"idel"</code>) slips past the compiler. <code>State::Idle</code> is clear, and a misspelt name is caught immediately. Most game enemy AI is built this way.</p>`),
      mistakes: L(`<ul><li><code>cout &lt;&lt; State::Idle</code> не компілюється — enum class не друкується сам.</li><li>Забутий <code>break</code> у <code>switch</code> — виконаються й наступні гілки.</li><li>Писати <code>Idle</code> без <code>State::</code> — помилка «not declared».</li></ul>`,
        `<ul><li><code>cout &lt;&lt; State::Idle</code> не компилируется — enum class не печатается сам.</li><li>Забытый <code>break</code> в <code>switch</code> — выполнятся и следующие ветки.</li><li>Писать <code>Idle</code> без <code>State::</code> — ошибка «not declared».</li></ul>`,
        `<ul><li><code>cout &lt;&lt; State::Idle</code> doesn’t compile — an enum class can’t print itself.</li><li>A missing <code>break</code> in a <code>switch</code> falls into the next cases.</li><li>Writing <code>Idle</code> without <code>State::</code> — “not declared” error.</li></ul>`),
      examples: [
        { title: 'toString', code: M(`for (Dir d : {Dir::North, Dir::East, Dir::South, Dir::West}) {
  cout << toString(d) << " -> " << toString(turnRight(d)) << "\\n";
}`, null, `enum class Dir { North, East, South, West };

string toString(Dir d) {
  switch (d) {
    case Dir::North: return "North";
    case Dir::East: return "East";
    case Dir::South: return "South";
    case Dir::West: return "West";
  }
  return "?";
}

Dir turnRight(Dir d) {
  return static_cast<Dir>((static_cast<int>(d) + 1) % 4);
}`), note: L('static_cast — явне перетворення enum ↔ int.', 'static_cast — явное преобразование enum ↔ int.', 'static_cast converts enum ↔ int explicitly.') },
        { title: L('Світлофор', 'Светофор', 'Traffic light'), code: M(`Light l = Light::Red;
for (int tick = 0; tick < 5; tick++) {
  cout << name(l) << "\\n";
  l = next(l);
}`, INC('iostream', 'string'), `enum class Light { Red, Green, Yellow };

string name(Light l) {
  if (l == Light::Red) return "RED";
  if (l == Light::Green) return "GREEN";
  return "YELLOW";
}

Light next(Light l) {
  switch (l) {
    case Light::Red: return Light::Green;
    case Light::Green: return Light::Yellow;
    case Light::Yellow: return Light::Red;
  }
  return Light::Red;
}`), note: L('Кожен стан знає, який наступний.', 'Каждое состояние знает, какое следующее.', 'Each state knows the next one.') },
        { title: L('Стан у класі', 'Состояние в классе', 'State inside a class'), code: M(`Door d;
d.press();
d.press();
d.lock();
d.press();`, INC('iostream'), `class Door {
  enum class S { Closed, Open, Locked };
  S s = S::Closed;
public:
  void press() {
    if (s == S::Closed) { s = S::Open; cout << "Door opens\\n"; }
    else if (s == S::Open) { s = S::Closed; cout << "Door closes\\n"; }
    else cout << "It's locked\\n";
  }
  void lock() { if (s == S::Closed) { s = S::Locked; cout << "Locked\\n"; } }
};`), note: L('enum можна сховати всередині класу.', 'enum можно спрятать внутри класса.', 'An enum can live inside a class.') }
      ],
      task: {
        text: L(`Зроби ворога-машину станів: <code>enum class Mode { Patrol, Chase, Attack }</code>. Функція <code>Mode update(Mode m, int dist)</code>: якщо <code>dist &lt;= 1</code> → Attack; якщо <code>dist &lt;= 5</code> → Chase; інакше Patrol. Для відстаней <code>{9, 5, 2, 1, 3, 8}</code> виведи рядки <code>dist 9: Patrol</code> … і наприкінці кількість змін стану: <code>Changes: 4</code> (стартовий стан — Patrol).`,
          `Сделай врага-машину состояний: <code>enum class Mode { Patrol, Chase, Attack }</code>. Функция <code>Mode update(Mode m, int dist)</code>: если <code>dist &lt;= 1</code> → Attack; если <code>dist &lt;= 5</code> → Chase; иначе Patrol. Для расстояний <code>{9, 5, 2, 1, 3, 8}</code> выведи строки <code>dist 9: Patrol</code> … и в конце количество смен состояния: <code>Changes: 4</code> (начальное состояние — Patrol).`,
          `Make an enemy state machine: <code>enum class Mode { Patrol, Chase, Attack }</code>. <code>Mode update(Mode m, int dist)</code>: <code>dist &lt;= 1</code> → Attack; <code>dist &lt;= 5</code> → Chase; otherwise Patrol. For distances <code>{9, 5, 2, 1, 3, 8}</code> print <code>dist 9: Patrol</code> … and finally the number of state changes: <code>Changes: 4</code> (starting state is Patrol).`),
        how: [L('Допоміжна <code>string name(Mode m)</code> для виводу.', 'Вспомогательная <code>string name(Mode m)</code> для вывода.', 'A helper <code>string name(Mode m)</code> for printing.'), L('Зберігай попередній стан і збільшуй лічильник, коли новий відрізняється.', 'Храни предыдущее состояние и увеличивай счётчик, когда новое отличается.', 'Keep the previous state and count when the new one differs.')],
        starter: M(`Mode m = Mode::Patrol;
int changes = 0;
for (int dist : {9, 5, 2, 1, 3, 8}) {
  // онови стан і виведи
}
cout << "Changes: " << changes << "\\n";`, INC('iostream', 'string'), `enum class Mode { Patrol, Chase, Attack };`),
        solution: M(`Mode m = Mode::Patrol;
int changes = 0;
for (int dist : {9, 5, 2, 1, 3, 8}) {
  Mode next = update(m, dist);
  if (next != m) changes++;
  m = next;
  cout << "dist " << dist << ": " << name(m) << "\\n";
}
cout << "Changes: " << changes << "\\n";`, INC('iostream', 'string'), `enum class Mode { Patrol, Chase, Attack };

string name(Mode m) {
  switch (m) {
    case Mode::Patrol: return "Patrol";
    case Mode::Chase: return "Chase";
    case Mode::Attack: return "Attack";
  }
  return "?";
}

Mode update(Mode m, int dist) {
  if (dist <= 1) return Mode::Attack;
  if (dist <= 5) return Mode::Chase;
  return Mode::Patrol;
}`),
        hint: L('Patrol → Chase → Chase → Attack → Chase → Patrol: зміни на 5, 1, 3, 8.', 'Patrol → Chase → Chase → Attack → Chase → Patrol: смены на 5, 1, 3, 8.', 'Patrol → Chase → Chase → Attack → Chase → Patrol: changes at 5, 1, 3, 8.'),
        expected: 'dist 9: Patrol\ndist 5: Chase\ndist 2: Chase\ndist 1: Attack\ndist 3: Chase\ndist 8: Patrol\nChanges: 4',
        must: /enum\s+class\s+Mode/
      },
      quiz: { q: L('Як звернутися до значення Idle з <code>enum class State</code>?', 'Как обратиться к значению Idle из <code>enum class State</code>?', 'How do you refer to Idle in <code>enum class State</code>?'), options: ['Idle', 'State::Idle', 'State.Idle'], answer: 1, explain: L('enum class вимагає префікс типу.', 'enum class требует префикс типа.', 'enum class needs the type prefix.') },
      ref: [{ code: 'enum class E { A, B };  E::A', d: 'enum class' }, { code: 'static_cast<int>(e)', d: L('у число', 'в число', 'to number') }]
    }
  ], 'project-grades');

  Codry.steps('cpp', [
    {
      id: 'project-maze', chapter: CH5, project: true,
      title: L('Проєкт: найкоротший шлях у лабіринті', 'Проект: кратчайший путь в лабиринте', 'Project: shortest path in a maze'),
      theory: L(
        `<p>Знайдемо найкоротший шлях від <code>S</code> до <code>E</code> у лабіринті — саме так рухаються вороги в стратегіях і бот-навігатори. Алгоритм — <b>пошук у ширину (BFS)</b>:</p>
<ol><li>Кладемо старт у <b>чергу</b> з відстанню 0</li><li>Беремо клітинку з черги й дивимось 4 сусідів (вгору, вниз, вліво, вправо)</li><li>Кожного вільного й ще не відвіданого сусіда позначаємо відстанню <code>+1</code> і кладемо в чергу</li><li>Коли дійшли до <code>E</code> — його відстань і є найкоротшою</li></ol>
<p>Черга гарантує, що спершу обробляються всі клітинки на відстані 1, потім 2 і так далі — «хвиля» розходиться від старту. Щоб відновити сам шлях, для кожної клітинки запам’ятовуємо, <b>звідки</b> ми в неї прийшли.</p>`,
        `<p>Найдём кратчайший путь от <code>S</code> до <code>E</code> в лабиринте — именно так двигаются враги в стратегиях и боты-навигаторы. Алгоритм — <b>поиск в ширину (BFS)</b>:</p>
<ol><li>Кладём старт в <b>очередь</b> с расстоянием 0</li><li>Берём клетку из очереди и смотрим 4 соседей (вверх, вниз, влево, вправо)</li><li>Каждого свободного и ещё не посещённого соседа отмечаем расстоянием <code>+1</code> и кладём в очередь</li><li>Когда дошли до <code>E</code> — его расстояние и есть кратчайшее</li></ol>
<p>Очередь гарантирует, что сначала обрабатываются все клетки на расстоянии 1, потом 2 и так далее — «волна» расходится от старта. Чтобы восстановить сам путь, для каждой клетки запоминаем, <b>откуда</b> мы в неё пришли.</p>`,
        `<p>Let’s find the shortest path from <code>S</code> to <code>E</code> in a maze — exactly how strategy-game units and navigation bots move. The algorithm is <b>breadth-first search (BFS)</b>:</p>
<ol><li>Put the start into a <b>queue</b> with distance 0</li><li>Take a cell from the queue and look at its 4 neighbours (up, down, left, right)</li><li>Mark every free, unvisited neighbour with distance <code>+1</code> and push it</li><li>When you reach <code>E</code>, its distance is the shortest</li></ol>
<p>The queue guarantees all cells at distance 1 are handled before distance 2, and so on — a “wave” spreading from the start. To rebuild the path itself, remember for each cell <b>where</b> you came from.</p>`),
      why: L(`<p>Чому BFS, а не просто «йти до виходу»? Жадібний рух упирається в стіни й тупики. BFS перевіряє всі варіанти рівномірно, тому знайдена відстань <b>гарантовано</b> найменша. Масиви <code>dr</code>/<code>dc</code> для чотирьох напрямків прибирають чотири майже однакові блоки коду.</p>`,
        `<p>Почему BFS, а не просто «идти к выходу»? Жадное движение упирается в стены и тупики. BFS проверяет все варианты равномерно, поэтому найденное расстояние <b>гарантированно</b> наименьшее. Массивы <code>dr</code>/<code>dc</code> для четырёх направлений убирают четыре почти одинаковых блока кода.</p>`,
        `<p>Why BFS rather than “walk towards the exit”? Greedy moves get stuck on walls and dead ends. BFS explores every option evenly, so the distance it finds is <b>guaranteed</b> minimal. The <code>dr</code>/<code>dc</code> arrays for the four directions replace four near-identical code blocks.</p>`),
      mistakes: L(`<ul><li>Не позначати клітинку відвіданою при додаванні в чергу — вона потрапить туди багато разів.</li><li>Не перевіряти межі сітки — вихід за межі масиву.</li><li>Стек замість черги дасть <b>якийсь</b> шлях, але не найкоротший.</li></ul>`,
        `<ul><li>Не отмечать клетку посещённой при добавлении в очередь — она попадёт туда много раз.</li><li>Не проверять границы сетки — выход за пределы массива.</li><li>Стек вместо очереди даст <b>какой-то</b> путь, но не кратчайший.</li></ul>`,
        `<ul><li>Not marking a cell visited when pushing it — it enters the queue many times.</li><li>Not checking grid bounds — going outside the array.</li><li>A stack instead of a queue finds <b>a</b> path, not the shortest.</li></ul>`),
      examples: [
        { title: L('Сусіди клітинки', 'Соседи клетки', 'Cell neighbours'), code: M(`vector<string> g = {"#.#", "...", "#.#"};
int r = 1, c = 1;
int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
for (int k = 0; k < 4; k++) {
  int nr = r + dr[k], nc = c + dc[k];
  bool inside = nr >= 0 && nr < (int)g.size() && nc >= 0 && nc < (int)g[0].size();
  cout << nr << "," << nc << (inside && g[nr][nc] == '.' ? " free" : " blocked") << "\\n";
}`, INC('iostream', 'vector', 'string')), note: L('Чотири напрямки — два маленькі масиви.', 'Четыре направления — два маленьких массива.', 'Four directions — two tiny arrays.') },
        { title: L('Хвиля відстаней', 'Волна расстояний', 'Distance wave'), code: M(`vector<string> g = {"....", ".##.", "...."};
int R = g.size(), C = g[0].size();
vector<vector<int>> d(R, vector<int>(C, -1));
queue<pair<int, int>> q;
d[0][0] = 0;
q.push({0, 0});
int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
while (!q.empty()) {
  auto [r, c] = q.front();
  q.pop();
  for (int k = 0; k < 4; k++) {
    int nr = r + dr[k], nc = c + dc[k];
    if (nr < 0 || nr >= R || nc < 0 || nc >= C || g[nr][nc] == '#' || d[nr][nc] != -1) continue;
    d[nr][nc] = d[r][c] + 1;
    q.push({nr, nc});
  }
}
for (auto& row : d) {
  for (int x : row) cout << (x < 0 ? "#" : to_string(x)) << " ";
  cout << "\\n";
}`, INC('iostream', 'vector', 'string', 'queue')), note: L('Кожна клітинка отримала відстань від кута.', 'Каждая клетка получила расстояние от угла.', 'Every cell gets its distance from the corner.') },
        { title: L('Відновлення шляху', 'Восстановление пути', 'Rebuilding the path'), code: M(`// prev[клітинка] = звідки прийшли
map<int, int> prev = {{3, 2}, {2, 1}, {1, 0}};
vector<int> path;
for (int v = 3; v != 0; v = prev[v]) path.push_back(v);
path.push_back(0);
reverse(path.begin(), path.end());
for (int v : path) cout << v << " ";
cout << "\\n";`, INC('iostream', 'vector', 'map', 'algorithm')), note: L('Йдемо назад від кінця, потім розвертаємо.', 'Идём назад от конца, потом разворачиваем.', 'Walk back from the end, then reverse.') }
      ],
      task: {
        text: L(`Зчитай лабіринт зі stdin (уже задано): спершу <code>R C</code>, далі R рядків із символів <code>#</code> (стіна), <code>.</code> (прохід), <code>S</code> (старт), <code>E</code> (вихід). Знайди найкоротший шлях BFS-ом, виведи <code>Steps: N</code>, а потім лабіринт, де клітинки шляху (крім S та E) замінені на <code>*</code>. Якщо шляху немає — <code>No path</code>.`,
          `Считай лабиринт из stdin (уже задан): сначала <code>R C</code>, далее R строк из символов <code>#</code> (стена), <code>.</code> (проход), <code>S</code> (старт), <code>E</code> (выход). Найди кратчайший путь BFS-ом, выведи <code>Steps: N</code>, а затем лабиринт, где клетки пути (кроме S и E) заменены на <code>*</code>. Если пути нет — <code>No path</code>.`,
          `Read a maze from stdin (preset): first <code>R C</code>, then R lines of <code>#</code> (wall), <code>.</code> (open), <code>S</code> (start), <code>E</code> (exit). Find the shortest path with BFS, print <code>Steps: N</code>, then the maze with path cells (except S and E) replaced by <code>*</code>. If there is no path, print <code>No path</code>.`),
        how: [L('Зберігай <code>vector&lt;vector&lt;int&gt;&gt; dist</code> (−1 = не відвідано) і <code>vector&lt;vector&lt;pair&lt;int,int&gt;&gt;&gt; prev</code>.', 'Храни <code>vector&lt;vector&lt;int&gt;&gt; dist</code> (−1 = не посещено) и <code>vector&lt;vector&lt;pair&lt;int,int&gt;&gt;&gt; prev</code>.', 'Keep <code>vector&lt;vector&lt;int&gt;&gt; dist</code> (−1 = unvisited) and <code>vector&lt;vector&lt;pair&lt;int,int&gt;&gt;&gt; prev</code>.'), L('Після BFS іди від E по <code>prev</code> до S і став <code>*</code>.', 'После BFS иди от E по <code>prev</code> до S и ставь <code>*</code>.', 'After BFS walk from E via <code>prev</code> back to S, placing <code>*</code>.'), L('Порядок напрямків — вгору, вниз, вліво, вправо (від нього залежить, який із рівних шляхів знайдеться).', 'Порядок направлений — вверх, вниз, влево, вправо (от него зависит, какой из равных путей найдётся).', 'Direction order: up, down, left, right (it decides which of equal paths is found).')],
        starter: M(`int R, C;
cin >> R >> C;
vector<string> g(R);
for (auto& row : g) cin >> row;
// BFS`, INC('iostream', 'vector', 'string', 'queue')),
        solution: M(`int R, C;
cin >> R >> C;
vector<string> g(R);
for (auto& row : g) cin >> row;
int sr = 0, sc = 0, er = 0, ec = 0;
for (int r = 0; r < R; r++)
  for (int c = 0; c < C; c++) {
    if (g[r][c] == 'S') { sr = r; sc = c; }
    if (g[r][c] == 'E') { er = r; ec = c; }
  }
vector<vector<int>> dist(R, vector<int>(C, -1));
vector<vector<pair<int, int>>> prev(R, vector<pair<int, int>>(C, {-1, -1}));
queue<pair<int, int>> q;
dist[sr][sc] = 0;
q.push({sr, sc});
int dr[] = {-1, 1, 0, 0}, dc[] = {0, 0, -1, 1};
while (!q.empty()) {
  auto [r, c] = q.front();
  q.pop();
  if (r == er && c == ec) break;
  for (int k = 0; k < 4; k++) {
    int nr = r + dr[k], nc = c + dc[k];
    if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
    if (g[nr][nc] == '#' || dist[nr][nc] != -1) continue;
    dist[nr][nc] = dist[r][c] + 1;
    prev[nr][nc] = {r, c};
    q.push({nr, nc});
  }
}
if (dist[er][ec] == -1) {
  cout << "No path\\n";
  return 0;
}
cout << "Steps: " << dist[er][ec] << "\\n";
auto cur = prev[er][ec];
while (cur.first != sr || cur.second != sc) {
  g[cur.first][cur.second] = '*';
  cur = prev[cur.first][cur.second];
}
for (const auto& row : g) cout << row << "\\n";`, INC('iostream', 'vector', 'string', 'queue')),
        stdin: '5 7\nS.#....\n.##.##.\n...#...\n.#...#E\n...#...',
        hint: L('Найкоротший шлях має 11 кроків і обходить стіну в середньому рядку згори.', 'Кратчайший путь состоит из 11 шагов и обходит стену в среднем ряду сверху.', 'The shortest path has 11 steps and goes around the middle wall from above.'),
        expected: 'Steps: 11\nS.#....\n*##.##.\n***#***\n.#***#E\n...#...',
        must: /queue<[\s\S]*push[\s\S]*front/
      },
      quiz: { q: L('Чому BFS знаходить саме найкоротший шлях?', 'Почему BFS находит именно кратчайший путь?', 'Why does BFS find the shortest path?'), options: [L('бо обробляє клітинки в порядку зростання відстані', 'потому что обрабатывает клетки в порядке возрастания расстояния', 'it handles cells in order of increasing distance'), L('бо використовує рекурсію', 'потому что использует рекурсию', 'it uses recursion'), L('випадково', 'случайно', 'by luck')], answer: 0, explain: L('Черга = хвиля: спершу відстань 1, потім 2…', 'Очередь = волна: сначала расстояние 1, потом 2…', 'The queue is a wave: distance 1, then 2…') },
      ref: [{ code: 'queue<pair<int,int>> q; q.push(start);', d: 'BFS' }, { code: 'int dr[] = {-1,1,0,0}, dc[] = {0,0,-1,1};', d: L('4 напрямки', '4 направления', '4 directions') }]
    }
  ]);
})();
