// Go — курс. Код компілюється та виконується на справжньому Go 1.23 (сервер Wandbox).
(function () {
  const L = Codry.L;
  const CH1 = L('Основи Go', 'Основы Go', 'Go basics');
  const CH2 = L('Умови, цикли, зрізи, функції', 'Условия, циклы, срезы, функции', 'Conditions, loops, slices, functions');
  const CH3 = L('Мапи, структури, інтерфейси', 'Мапы, структуры, интерфейсы', 'Maps, structs, interfaces');
  const CH4 = L('Помилки та паралельність', 'Ошибки и параллельность', 'Errors and concurrency');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');
  const IND = (s) => s.split('\n').map((l) => (l ? '\t' + l : l)).join('\n');
  // G(тіло main, ['fmt', 'strings'], код перед main)
  const G = (body, imps, before) => {
    imps = imps || ['fmt'];
    const im = imps.length === 1 ? `import "${imps[0]}"` : 'import (\n' + imps.map((i) => `\t"${i}"`).join('\n') + '\n)';
    return 'package main\n\n' + im + '\n\n' + (before ? before + '\n\n' : '') + 'func main() {\n' + IND(body) + '\n}';
  };

  Codry.steps('go', [
    {
      id: 'hello', chapter: CH1,
      title: L('Перша програма на Go', 'Первая программа на Go', 'Your first Go program'),
      theory: L(
        `<p><b>Go</b> (або Golang) створили в Google у 2009 році, щоб писати швидкі сервери просто й без зайвих складнощів. На Go написані Docker, Kubernetes, частини YouTube, Twitch і Discord.</p>
<pre class="inline-code">package main

import "fmt"

func main() {
	fmt.Println("Hello, Go!")
}</pre>
<ul><li><code>package main</code> — це програма, яку можна запустити (а не бібліотека)</li><li><code>import "fmt"</code> — пакет для виводу й форматування</li><li><code>func main()</code> — точка входу</li><li><code>fmt.Println(a, b)</code> — виводить значення через пробіл і переходить на новий рядок; <code>fmt.Print</code> — без переходу</li><li>Крапка з комою в кінці <b>не потрібна</b>, а <code>{</code> має стояти на тому ж рядку, що й <code>func</code></li></ul>`,
        `<p><b>Go</b> (или Golang) создали в Google в 2009 году, чтобы писать быстрые серверы просто и без лишних сложностей. На Go написаны Docker, Kubernetes, части YouTube, Twitch и Discord.</p>
<pre class="inline-code">package main

import "fmt"

func main() {
	fmt.Println("Hello, Go!")
}</pre>
<ul><li><code>package main</code> — это программа, которую можно запустить (а не библиотека)</li><li><code>import "fmt"</code> — пакет для вывода и форматирования</li><li><code>func main()</code> — точка входа</li><li><code>fmt.Println(a, b)</code> — выводит значения через пробел и переходит на новую строку; <code>fmt.Print</code> — без перехода</li><li>Точка с запятой в конце <b>не нужна</b>, а <code>{</code> должна стоять на той же строке, что и <code>func</code></li></ul>`,
        `<p><b>Go</b> (or Golang) was created at Google in 2009 to write fast servers simply, without needless complexity. Docker, Kubernetes and parts of YouTube, Twitch and Discord are written in Go.</p>
<pre class="inline-code">package main

import "fmt"

func main() {
	fmt.Println("Hello, Go!")
}</pre>
<ul><li><code>package main</code> means a runnable program (not a library)</li><li><code>import "fmt"</code> is the package for printing and formatting</li><li><code>func main()</code> is the entry point</li><li><code>fmt.Println(a, b)</code> prints values separated by spaces plus a newline; <code>fmt.Print</code> adds no newline</li><li>No semicolons needed, and <code>{</code> must be on the same line as <code>func</code></li></ul>`),
      why: L(`<p>Go навмисно маленька мова: у ній лише 25 ключових слів, а форматування коду однакове в усіх (інструмент <code>gofmt</code>). Тому чужий Go-код читається так само легко, як свій. Компілятор суворий: навіть <b>невикористаний імпорт чи змінна</b> — це помилка, щоб у коді не накопичувалось сміття.</p>`,
        `<p>Go намеренно маленький язык: в нём всего 25 ключевых слов, а форматирование кода одинаковое у всех (инструмент <code>gofmt</code>). Поэтому чужой Go-код читается так же легко, как свой. Компилятор строгий: даже <b>неиспользованный импорт или переменная</b> — это ошибка, чтобы в коде не копился мусор.</p>`,
        `<p>Go is deliberately small: just 25 keywords, and everyone’s code is formatted the same way (the <code>gofmt</code> tool). So other people’s Go reads as easily as your own. The compiler is strict: even an <b>unused import or variable</b> is an error, so junk never piles up.</p>`),
      mistakes: L(`<ul><li><code>{</code> на новому рядку після <code>func main()</code> — помилка компіляції.</li><li><code>fmt.println</code> з малої — у Go з великої літери пишуться всі «публічні» функції пакетів.</li><li>Імпортував пакет і не використав — <code>"os" imported and not used</code>.</li></ul>`,
        `<ul><li><code>{</code> на новой строке после <code>func main()</code> — ошибка компиляции.</li><li><code>fmt.println</code> с маленькой — в Go с большой буквы пишутся все «публичные» функции пакетов.</li><li>Импортировал пакет и не использовал — <code>"os" imported and not used</code>.</li></ul>`,
        `<ul><li><code>{</code> on a new line after <code>func main()</code> — compile error.</li><li><code>fmt.println</code> in lowercase — public package functions in Go start with a capital letter.</li><li>Importing a package without using it — <code>"os" imported and not used</code>.</li></ul>`),
      examples: [
        { title: 'Println', code: G(`fmt.Println("Hello, Go!")
fmt.Println("Gophers", "love", "Go")
fmt.Println(2+3, true)`), note: L('Кілька значень — через пробіл.', 'Несколько значений — через пробел.', 'Several values — separated by spaces.') },
        { title: 'Print', code: G(`fmt.Print("Loading")
fmt.Print("...")
fmt.Println(" done")
fmt.Println("Next line")`), note: L('Print не переводить рядок.', 'Print не переводит строку.', 'Print adds no newline.') },
        { title: L('Коментарі', 'Комментарии', 'Comments'), code: G(`// однорядковий коментар
/* багаторядковий
   коментар */
fmt.Println("Visible")
// fmt.Println("Hidden")`), note: L('Коментарі компілятор пропускає.', 'Комментарии компилятор пропускает.', 'The compiler skips comments.') }
      ],
      task: {
        text: L('Виведи два рядки: <code>Hello, Go!</code> і <code>Go is fast</code>.', 'Выведи две строки: <code>Hello, Go!</code> и <code>Go is fast</code>.', 'Print two lines: <code>Hello, Go!</code> and <code>Go is fast</code>.'),
        how: [L('Два виклики <code>fmt.Println</code> усередині <code>main</code>.', 'Два вызова <code>fmt.Println</code> внутри <code>main</code>.', 'Two <code>fmt.Println</code> calls inside <code>main</code>.')],
        starter: G('// твій код тут\nfmt.Print("")'),
        solution: G(`fmt.Println("Hello, Go!")
fmt.Println("Go is fast")`),
        hint: L('Текст — у подвійних лапках.', 'Текст — в двойных кавычках.', 'Text goes in double quotes.'),
        expected: 'Hello, Go!\nGo is fast'
      },
      quiz: { q: L('Що станеться, якщо імпортувати пакет і не використати його?', 'Что будет, если импортировать пакет и не использовать его?', 'What happens if you import a package and don’t use it?'), options: [L('нічого', 'ничего', 'nothing'), L('помилка компіляції', 'ошибка компиляции', 'a compile error'), L('попередження', 'предупреждение', 'a warning')], answer: 1, explain: L('Go не дозволяє зайвих імпортів.', 'Go не разрешает лишних импортов.', 'Go forbids unused imports.') },
      ref: [{ code: 'fmt.Println(a, b)', d: L('вивід з новим рядком', 'вывод с новой строкой', 'print with newline') }, { code: 'func main() { }', d: L('точка входу', 'точка входа', 'entry point') }]
    },
    {
      id: 'variables', chapter: CH1,
      title: L('Змінні, типи та Printf', 'Переменные, типы и Printf', 'Variables, types and Printf'),
      theory: L(
        `<p>Дві форми оголошення:</p>
<pre class="inline-code">var lives int = 3   // повна
name := "Gopher"    // коротка: тип визначається сам (лише всередині функцій)
const MaxHp = 100   // константа</pre>
<table class="mini"><tr><td><code>int</code></td><td>ціле</td></tr><tr><td><code>float64</code></td><td>дробове</td></tr><tr><td><code>bool</code></td><td><code>true</code>/<code>false</code></td></tr><tr><td><code>string</code></td><td>текст</td></tr></table>
<p>Змінна без значення отримує <b>нульове значення</b>: <code>0</code>, <code>""</code>, <code>false</code>.</p>
<p><code>fmt.Printf</code> — вивід за шаблоном: <code>%d</code> ціле, <code>%s</code> рядок, <code>%.2f</code> дробове з 2 знаками, <code>%v</code> будь-що, <code>%t</code> bool. Наприкінці потрібен <code>\\n</code>:</p>
<pre class="inline-code">fmt.Printf("%s has %d lives\\n", name, lives)</pre>
<p><code>fmt.Sprintf</code> — те саме, але повертає рядок, а не друкує.</p>`,
        `<p>Две формы объявления:</p>
<pre class="inline-code">var lives int = 3   // полная
name := "Gopher"    // короткая: тип определяется сам (только внутри функций)
const MaxHp = 100   // константа</pre>
<table class="mini"><tr><td><code>int</code></td><td>целое</td></tr><tr><td><code>float64</code></td><td>дробное</td></tr><tr><td><code>bool</code></td><td><code>true</code>/<code>false</code></td></tr><tr><td><code>string</code></td><td>текст</td></tr></table>
<p>Переменная без значения получает <b>нулевое значение</b>: <code>0</code>, <code>""</code>, <code>false</code>.</p>
<p><code>fmt.Printf</code> — вывод по шаблону: <code>%d</code> целое, <code>%s</code> строка, <code>%.2f</code> дробное с 2 знаками, <code>%v</code> что угодно, <code>%t</code> bool. В конце нужен <code>\\n</code>:</p>
<pre class="inline-code">fmt.Printf("%s has %d lives\\n", name, lives)</pre>
<p><code>fmt.Sprintf</code> — то же, но возвращает строку, а не печатает.</p>`,
        `<p>Two ways to declare:</p>
<pre class="inline-code">var lives int = 3   // full form
name := "Gopher"    // short: type inferred (inside functions only)
const MaxHp = 100   // constant</pre>
<table class="mini"><tr><td><code>int</code></td><td>integer</td></tr><tr><td><code>float64</code></td><td>decimal</td></tr><tr><td><code>bool</code></td><td><code>true</code>/<code>false</code></td></tr><tr><td><code>string</code></td><td>text</td></tr></table>
<p>A variable without a value gets its <b>zero value</b>: <code>0</code>, <code>""</code>, <code>false</code>.</p>
<p><code>fmt.Printf</code> prints with a template: <code>%d</code> integer, <code>%s</code> string, <code>%.2f</code> decimal with 2 places, <code>%v</code> anything, <code>%t</code> bool. End with <code>\\n</code>:</p>
<pre class="inline-code">fmt.Printf("%s has %d lives\\n", name, lives)</pre>
<p><code>fmt.Sprintf</code> does the same but returns a string instead of printing.</p>`),
      why: L(`<p><code>:=</code> — улюблений запис Go-програмістів: коротко, а тип усе одно суворо перевіряється. Нульові значення означають, що в Go не буває «сміття» в змінних: нова змінна завжди в передбачуваному стані. А <code>Printf</code> дає точний контроль — наприклад, гроші завжди з двома знаками.</p>`,
        `<p><code>:=</code> — любимая запись Go-программистов: коротко, а тип всё равно строго проверяется. Нулевые значения означают, что в Go не бывает «мусора» в переменных: новая переменная всегда в предсказуемом состоянии. А <code>Printf</code> даёт точный контроль — например, деньги всегда с двумя знаками.</p>`,
        `<p><code>:=</code> is Go programmers’ favourite: short, yet the type is still strictly checked. Zero values mean Go variables never hold “garbage”: a new variable is always predictable. And <code>Printf</code> gives exact control — money always with two decimals, say.</p>`),
      mistakes: L(`<ul><li>Оголосив змінну й не використав — <code>declared and not used</code>.</li><li><code>:=</code> поза функцією — помилка; там тільки <code>var</code>.</li><li><code>x := 5</code> вдруге для тієї ж змінної — <code>no new variables on left side of :=</code>; для зміни пиши <code>x = 6</code>.</li><li>Забутий <code>\\n</code> у Printf — наступний вивід прилипне до рядка.</li></ul>`,
        `<ul><li>Объявил переменную и не использовал — <code>declared and not used</code>.</li><li><code>:=</code> вне функции — ошибка; там только <code>var</code>.</li><li><code>x := 5</code> второй раз для той же переменной — <code>no new variables on left side of :=</code>; для изменения пиши <code>x = 6</code>.</li><li>Забытый <code>\\n</code> в Printf — следующий вывод прилипнет к строке.</li></ul>`,
        `<ul><li>Declaring a variable and not using it — <code>declared and not used</code>.</li><li><code>:=</code> outside a function — error; use <code>var</code> there.</li><li><code>x := 5</code> again for the same variable — <code>no new variables on left side of :=</code>; use <code>x = 6</code>.</li><li>Forgetting <code>\\n</code> in Printf — the next output sticks to the line.</li></ul>`),
      examples: [
        { title: L('Оголошення', 'Объявление', 'Declaring'), code: G(`var lives int = 3
name := "Gopher"
speed := 4.5
ready := true
var score int
fmt.Println(name, lives, speed, ready, score)
lives = lives - 1
fmt.Println("Lives left:", lives)`), note: L('score отримав нульове значення 0.', 'score получил нулевое значение 0.', 'score got the zero value 0.') },
        { title: 'Printf', code: G(`name := "Mila"
coins := 42
price := 3.14159
fmt.Printf("%s has %d coins\\n", name, coins)
fmt.Printf("Price: %.2f\\n", price)
fmt.Printf("Any value: %v %v\\n", coins, true)`), note: L('%.2f — два знаки після крапки.', '%.2f — два знака после точки.', '%.2f — two decimal places.') },
        { title: 'Sprintf / const', code: G(`const MaxHp = 100
hp := 75
bar := fmt.Sprintf("HP %d/%d", hp, MaxHp)
fmt.Println(bar)
fmt.Println(len(bar), "characters")`), note: L('Sprintf повертає рядок.', 'Sprintf возвращает строку.', 'Sprintf returns a string.') }
      ],
      task: {
        text: L('Створи <code>hero := "Gopher"</code>, <code>level := 5</code>, <code>power := 12.5</code> і виведи через <code>Printf</code>: <code>Gopher: level 5, power 12.5</code>.', 'Создай <code>hero := "Gopher"</code>, <code>level := 5</code>, <code>power := 12.5</code> и выведи через <code>Printf</code>: <code>Gopher: level 5, power 12.5</code>.', 'Create <code>hero := "Gopher"</code>, <code>level := 5</code>, <code>power := 12.5</code> and print with <code>Printf</code>: <code>Gopher: level 5, power 12.5</code>.'),
        how: [L('Шаблон: <code>"%s: level %d, power %.1f\\n"</code>.', 'Шаблон: <code>"%s: level %d, power %.1f\\n"</code>.', 'Template: <code>"%s: level %d, power %.1f\\n"</code>.')],
        starter: G('// три змінні та Printf\nfmt.Print("")'),
        solution: G(`hero := "Gopher"
level := 5
power := 12.5
fmt.Printf("%s: level %d, power %.1f\\n", hero, level, power)`),
        hint: L('<code>%.1f</code> — один знак після крапки.', '<code>%.1f</code> — один знак после точки.', '<code>%.1f</code> — one decimal place.'),
        expected: 'Gopher: level 5, power 12.5',
        must: /Printf/
      },
      quiz: { q: L('Яке значення має <code>var n int</code> без присвоєння?', 'Какое значение у <code>var n int</code> без присваивания?', 'What value does <code>var n int</code> have unassigned?'), options: ['nil', '0', L('випадкове', 'случайное', 'random')], answer: 1, explain: L('Нульове значення для int — 0.', 'Нулевое значение для int — 0.', 'The zero value of int is 0.') },
      ref: [{ code: 'x := 5', d: L('коротке оголошення', 'короткое объявление', 'short declaration') }, { code: 'fmt.Printf("%d %s %.2f\\n", …)', d: L('форматування', 'форматирование', 'formatting') }, { code: 'fmt.Sprintf(…)', d: L('рядок за шаблоном', 'строка по шаблону', 'formatted string') }]
    },
    {
      id: 'input', chapter: CH1,
      title: L('Введення: fmt.Scan', 'Ввод: fmt.Scan', 'Input: fmt.Scan'),
      theory: L(
        `<p><code>fmt.Scan</code> читає значення, розділені пробілами чи переносами рядків, і записує їх у змінні. Перед змінною ставиться <code>&amp;</code> — «ось адреса, куди покласти результат»:</p>
<pre class="inline-code">var name string
var year int
fmt.Scan(&amp;name, &amp;year)</pre>
<p>Тип змінної визначає, як читати: в <code>int</code> прочитається число, у <code>string</code> — одне слово.</p>
<p>Щоб прочитати <b>цілий рядок</b> з пробілами, використовують <code>bufio.Scanner</code>:</p>
<pre class="inline-code">sc := bufio.NewScanner(os.Stdin)
for sc.Scan() {
	line := sc.Text()
	// …
}</pre>
<div class="tip">💡 У Codry вхідні дані пишуться в поле <b>«Вхідні дані (stdin)»</b> під редактором.</div>`,
        `<p><code>fmt.Scan</code> читает значения, разделённые пробелами или переносами строк, и записывает их в переменные. Перед переменной ставится <code>&amp;</code> — «вот адрес, куда положить результат»:</p>
<pre class="inline-code">var name string
var year int
fmt.Scan(&amp;name, &amp;year)</pre>
<p>Тип переменной определяет, как читать: в <code>int</code> прочитается число, в <code>string</code> — одно слово.</p>
<p>Чтобы прочитать <b>целую строку</b> с пробелами, используют <code>bufio.Scanner</code>:</p>
<pre class="inline-code">sc := bufio.NewScanner(os.Stdin)
for sc.Scan() {
	line := sc.Text()
	// …
}</pre>
<div class="tip">💡 В Codry входные данные пишутся в поле <b>«Входные данные (stdin)»</b> под редактором.</div>`,
        `<p><code>fmt.Scan</code> reads values separated by spaces or newlines into variables. Put <code>&amp;</code> before each variable — “here’s the address to store the result”:</p>
<pre class="inline-code">var name string
var year int
fmt.Scan(&amp;name, &amp;year)</pre>
<p>The variable’s type decides how to read: an <code>int</code> reads a number, a <code>string</code> reads one word.</p>
<p>To read a <b>whole line</b> with spaces, use <code>bufio.Scanner</code>:</p>
<pre class="inline-code">sc := bufio.NewScanner(os.Stdin)
for sc.Scan() {
	line := sc.Text()
	// …
}</pre>
<div class="tip">💡 In Codry, type input into the <b>“Input (stdin)”</b> box under the editor.</div>`),
      why: L(`<p>Навіщо <code>&amp;</code>? Функція в Go отримує <b>копії</b> аргументів. Якби ми передали просто <code>name</code>, Scan заповнив би копію, а наша змінна лишилась би порожньою. Адреса (<code>&amp;name</code>) дозволяє записати значення саме туди, куди треба. Детально про це — в уроці про вказівники.</p>`,
        `<p>Зачем <code>&amp;</code>? Функция в Go получает <b>копии</b> аргументов. Если бы мы передали просто <code>name</code>, Scan заполнил бы копию, а наша переменная осталась бы пустой. Адрес (<code>&amp;name</code>) позволяет записать значение именно туда, куда нужно. Подробно об этом — в уроке про указатели.</p>`,
        `<p>Why <code>&amp;</code>? Go functions receive <b>copies</b> of arguments. Passing plain <code>name</code> would make Scan fill a copy and leave our variable empty. The address (<code>&amp;name</code>) lets it write exactly where we need. More on this in the pointers lesson.</p>`),
      mistakes: L(`<ul><li>Забутий <code>&amp;</code>: <code>fmt.Scan(name)</code> — значення не запишеться.</li><li><code>fmt.Scan</code> у <code>string</code> читає лише <b>одне слово</b> — для фраз потрібен <code>bufio.Scanner</code>.</li></ul>`,
        `<ul><li>Забытый <code>&amp;</code>: <code>fmt.Scan(name)</code> — значение не запишется.</li><li><code>fmt.Scan</code> в <code>string</code> читает только <b>одно слово</b> — для фраз нужен <code>bufio.Scanner</code>.</li></ul>`,
        `<ul><li>Forgetting <code>&amp;</code>: <code>fmt.Scan(name)</code> stores nothing.</li><li><code>fmt.Scan</code> into a <code>string</code> reads only <b>one word</b> — use <code>bufio.Scanner</code> for phrases.</li></ul>`),
      examples: [
        { title: L('Ім’я', 'Имя', 'Name'), code: G(`var name string
fmt.Println("What is your name?")
fmt.Scan(&name)
fmt.Println("Hi,", name+"!")`), note: L('Введи ім’я в stdin.', 'Введи имя в stdin.', 'Type a name into stdin.') },
        { title: L('Два числа', 'Два числа', 'Two numbers'), code: G(`var a, b int
fmt.Scan(&a, &b)
fmt.Printf("%d + %d = %d\\n", a, b, a+b)`), note: L('Приклад вводу: <code>4 9</code>.', 'Пример ввода: <code>4 9</code>.', 'Sample input: <code>4 9</code>.') },
        { title: L('Рядки цілком', 'Строки целиком', 'Whole lines'), code: G(`sc := bufio.NewScanner(os.Stdin)
n := 0
for sc.Scan() {
	n++
	fmt.Printf("%d: %s\\n", n, sc.Text())
}`, ['bufio', 'fmt', 'os']), note: L('Введи кілька рядків з пробілами.', 'Введи несколько строк с пробелами.', 'Type a few lines with spaces.') }
      ],
      task: {
        text: L('Прочитай ім’я і рік народження. Виведи <code>NAME will be AGE in 2030</code>. Вхідні дані вже задано: <code>Mila</code> і <code>2013</code>.', 'Прочитай имя и год рождения. Выведи <code>NAME will be AGE in 2030</code>. Входные данные уже заданы: <code>Mila</code> и <code>2013</code>.', 'Read a name and a birth year. Print <code>NAME will be AGE in 2030</code>. Input is preset: <code>Mila</code> and <code>2013</code>.'),
        how: [L('<code>var name string</code>, <code>var year int</code>, потім <code>fmt.Scan(&amp;name, &amp;year)</code>.', '<code>var name string</code>, <code>var year int</code>, затем <code>fmt.Scan(&amp;name, &amp;year)</code>.', '<code>var name string</code>, <code>var year int</code>, then <code>fmt.Scan(&amp;name, &amp;year)</code>.')],
        starter: G('// прочитай ім’я та рік\nfmt.Print("")'),
        solution: G(`var name string
var year int
fmt.Scan(&name, &year)
fmt.Printf("%s will be %d in 2030\\n", name, 2030-year)`),
        stdin: 'Mila\n2013',
        hint: L('Очікувано: <code>Mila will be 17 in 2030</code>.', 'Ожидается: <code>Mila will be 17 in 2030</code>.', 'Expected: <code>Mila will be 17 in 2030</code>.'),
        expected: 'Mila will be 17 in 2030',
        must: /Scan/
      },
      quiz: { q: L('Навіщо <code>&amp;</code> у <code>fmt.Scan(&amp;x)</code>?', 'Зачем <code>&amp;</code> в <code>fmt.Scan(&amp;x)</code>?', 'Why the <code>&amp;</code> in <code>fmt.Scan(&amp;x)</code>?'), options: [L('передати адресу змінної', 'передать адрес переменной', 'to pass the variable’s address'), L('для краси', 'для красоты', 'for style'), L('щоб прочитати рядок', 'чтобы прочитать строку', 'to read a line')], answer: 0, explain: L('Scan записує значення за адресою.', 'Scan записывает значение по адресу.', 'Scan writes the value at that address.') },
      ref: [{ code: 'fmt.Scan(&a, &b)', d: L('читати значення', 'читать значения', 'read values') }, { code: 'bufio.NewScanner(os.Stdin)', d: L('читати рядки', 'читать строки', 'read lines') }]
    },
    {
      id: 'math-strings', chapter: CH1,
      title: L('Арифметика, рядки, strconv', 'Арифметика, строки, strconv', 'Arithmetic, strings, strconv'),
      theory: L(
        `<p>Оператори <code>+ - * / %</code>. Ділення цілих — ціле: <code>17 / 5 = 3</code>, остача <code>17 % 5 = 2</code>. Go <b>не змішує типи</b>: <code>int</code> і <code>float64</code> не можна додати без перетворення — <code>float64(n)</code>, <code>int(x)</code>.</p>
<p>Пакет <code>strings</code>:</p>
<table class="mini"><tr><td><code>strings.ToUpper(s)</code></td><td>великими</td></tr><tr><td><code>strings.Contains(s, "go")</code></td><td>чи містить</td></tr><tr><td><code>strings.Replace(s, "a", "o", -1)</code></td><td>замінити всі</td></tr><tr><td><code>strings.Split(s, ",")</code> / <code>strings.Fields(s)</code></td><td>розбити</td></tr><tr><td><code>strings.Repeat("=", 10)</code></td><td>повторити</td></tr><tr><td><code>strings.Join(parts, " ")</code></td><td>склеїти</td></tr></table>
<p><code>len(s)</code> — довжина в <b>байтах</b> (для латиниці = кількість символів). Пакет <code>strconv</code>: <code>strconv.Itoa(5)</code> → <code>"5"</code>, <code>strconv.Atoi("42")</code> → <code>42, nil</code>. Пакет <code>math</code>: <code>math.Sqrt</code>, <code>math.Pow</code>, <code>math.Max</code>.</p>`,
        `<p>Операторы <code>+ - * / %</code>. Деление целых — целое: <code>17 / 5 = 3</code>, остаток <code>17 % 5 = 2</code>. Go <b>не смешивает типы</b>: <code>int</code> и <code>float64</code> нельзя сложить без преобразования — <code>float64(n)</code>, <code>int(x)</code>.</p>
<p>Пакет <code>strings</code>:</p>
<table class="mini"><tr><td><code>strings.ToUpper(s)</code></td><td>большими</td></tr><tr><td><code>strings.Contains(s, "go")</code></td><td>содержит ли</td></tr><tr><td><code>strings.Replace(s, "a", "o", -1)</code></td><td>заменить все</td></tr><tr><td><code>strings.Split(s, ",")</code> / <code>strings.Fields(s)</code></td><td>разбить</td></tr><tr><td><code>strings.Repeat("=", 10)</code></td><td>повторить</td></tr><tr><td><code>strings.Join(parts, " ")</code></td><td>склеить</td></tr></table>
<p><code>len(s)</code> — длина в <b>байтах</b> (для латиницы = количество символов). Пакет <code>strconv</code>: <code>strconv.Itoa(5)</code> → <code>"5"</code>, <code>strconv.Atoi("42")</code> → <code>42, nil</code>. Пакет <code>math</code>: <code>math.Sqrt</code>, <code>math.Pow</code>, <code>math.Max</code>.</p>`,
        `<p>Operators <code>+ - * / %</code>. Integer division is integer: <code>17 / 5 = 3</code>, remainder <code>17 % 5 = 2</code>. Go <b>never mixes types</b>: you can’t add an <code>int</code> and a <code>float64</code> without converting — <code>float64(n)</code>, <code>int(x)</code>.</p>
<p>The <code>strings</code> package:</p>
<table class="mini"><tr><td><code>strings.ToUpper(s)</code></td><td>uppercase</td></tr><tr><td><code>strings.Contains(s, "go")</code></td><td>contains?</td></tr><tr><td><code>strings.Replace(s, "a", "o", -1)</code></td><td>replace all</td></tr><tr><td><code>strings.Split(s, ",")</code> / <code>strings.Fields(s)</code></td><td>split</td></tr><tr><td><code>strings.Repeat("=", 10)</code></td><td>repeat</td></tr><tr><td><code>strings.Join(parts, " ")</code></td><td>join</td></tr></table>
<p><code>len(s)</code> is the length in <b>bytes</b> (equals characters for Latin text). The <code>strconv</code> package: <code>strconv.Itoa(5)</code> → <code>"5"</code>, <code>strconv.Atoi("42")</code> → <code>42, nil</code>. The <code>math</code> package: <code>math.Sqrt</code>, <code>math.Pow</code>, <code>math.Max</code>.</p>`),
      why: L(`<p>Чому Go не перетворює типи сам? Автоматичні перетворення — джерело тихих багів: дріб губиться, число переповнюється, а ти не помічаєш. У Go кожне перетворення видно в коді — <code>float64(total) / float64(count)</code> — тож зрозуміло, що відбувається.</p>`,
        `<p>Почему Go не преобразует типы сам? Автоматические преобразования — источник тихих багов: дробь теряется, число переполняется, а ты не замечаешь. В Go каждое преобразование видно в коде — <code>float64(total) / float64(count)</code> — так что понятно, что происходит.</p>`,
        `<p>Why doesn’t Go convert types for you? Automatic conversions cause silent bugs: fractions vanish, numbers overflow, and you never notice. In Go every conversion is visible — <code>float64(total) / float64(count)</code> — so it’s clear what happens.</p>`),
      mistakes: L(`<ul><li><code>n + 1.5</code>, де n — int: <code>mismatched types</code>.</li><li><code>"Score: " + 10</code> — помилка; потрібно <code>strconv.Itoa(10)</code> або <code>fmt.Sprintf</code>.</li><li><code>len("привіт")</code> = 12, а не 6: кирилиця займає по 2 байти.</li></ul>`,
        `<ul><li><code>n + 1.5</code>, где n — int: <code>mismatched types</code>.</li><li><code>"Score: " + 10</code> — ошибка; нужно <code>strconv.Itoa(10)</code> или <code>fmt.Sprintf</code>.</li><li><code>len("привет")</code> = 12, а не 6: кириллица занимает по 2 байта.</li></ul>`,
        `<ul><li><code>n + 1.5</code> with an int n: <code>mismatched types</code>.</li><li><code>"Score: " + 10</code> is an error; use <code>strconv.Itoa(10)</code> or <code>fmt.Sprintf</code>.</li><li><code>len("привіт")</code> is 12, not 6: Cyrillic letters take 2 bytes each.</li></ul>`),
      examples: [
        { title: L('Ділення', 'Деление', 'Division'), code: G(`seconds := 437
fmt.Println(seconds/60, "min", seconds%60, "sec")
total, count := 7, 2
fmt.Println(total / count)
fmt.Println(float64(total) / float64(count))
fmt.Println(math.Sqrt(81), math.Pow(2, 10))`, ['fmt', 'math']), note: L('Явне перетворення float64(…).', 'Явное преобразование float64(…).', 'An explicit float64(…) conversion.') },
        { title: 'strings', code: G(`s := "go is fun, go is fast"
fmt.Println(strings.ToUpper(s))
fmt.Println(strings.Contains(s, "fast"))
fmt.Println(strings.Count(s, "go"))
fmt.Println(strings.Replace(s, "go", "Go", -1))
words := strings.Fields(s)
fmt.Println(len(words), strings.Join(words[:3], "_"))`, ['fmt', 'strings']), note: L('Fields розбиває за пробілами.', 'Fields разбивает по пробелам.', 'Fields splits on spaces.') },
        { title: 'strconv', code: G(`n, err := strconv.Atoi("42")
fmt.Println(n+1, err)
_, err = strconv.Atoi("hello")
fmt.Println(err)
label := "Level " + strconv.Itoa(7)
fmt.Println(label)`, ['fmt', 'strconv']), note: L('<code>_</code> — «це значення мені не потрібне».', '<code>_</code> — «это значение мне не нужно».', '<code>_</code> means “I don’t need this value”.') }
      ],
      task: {
        text: L('Дано <code>word := "gopher"</code>. Виведи чотири рядки: слово великими літерами, його довжину, рядок з <code>=</code> такої самої довжини (<code>======</code>) і <code>17/5</code> та <code>17%5</code> через пробіл (<code>3 2</code>).', 'Дано <code>word := "gopher"</code>. Выведи четыре строки: слово большими буквами, его длину, строку из <code>=</code> такой же длины (<code>======</code>) и <code>17/5</code> и <code>17%5</code> через пробел (<code>3 2</code>).', 'Given <code>word := "gopher"</code>, print four lines: the word in uppercase, its length, a line of <code>=</code> of the same length (<code>======</code>), and <code>17/5</code> and <code>17%5</code> separated by a space (<code>3 2</code>).'),
        how: [L('<code>strings.Repeat("=", len(word))</code>', '<code>strings.Repeat("=", len(word))</code>', '<code>strings.Repeat("=", len(word))</code>'), L('<code>fmt.Println(17/5, 17%5)</code> сам поставить пробіл.', '<code>fmt.Println(17/5, 17%5)</code> сам поставит пробел.', '<code>fmt.Println(17/5, 17%5)</code> adds the space itself.')],
        starter: G(`word := "gopher"
fmt.Println(word)`, ['fmt', 'strings']).replace('import (\n\t"fmt"\n\t"strings"\n)', 'import (\n\t"fmt"\n\t// "strings"\n)'),
        solution: G(`word := "gopher"
fmt.Println(strings.ToUpper(word))
fmt.Println(len(word))
fmt.Println(strings.Repeat("=", len(word)))
fmt.Println(17/5, 17%5)`, ['fmt', 'strings']),
        hint: L('Розкоментуй імпорт <code>"strings"</code>.', 'Раскомментируй импорт <code>"strings"</code>.', 'Uncomment the <code>"strings"</code> import.'),
        expected: 'GOPHER\n6\n======\n3 2',
        must: /strings\.Repeat/
      },
      quiz: { q: L('Що поверне <code>strconv.Itoa(25)</code>?', 'Что вернёт <code>strconv.Itoa(25)</code>?', 'What does <code>strconv.Itoa(25)</code> return?'), options: ['25 (int)', '"25" (string)', 'error'], answer: 1, explain: L('Itoa: integer → ASCII-рядок.', 'Itoa: integer → ASCII-строка.', 'Itoa: integer → ASCII string.') },
      ref: [{ code: 'float64(n) int(x)', d: L('перетворення типів', 'преобразование типов', 'type conversion') }, { code: 'strings.ToUpper/Contains/Fields/Join', d: 'strings' }, { code: 'strconv.Itoa / strconv.Atoi', d: 'strconv' }]
    },
    {
      id: 'conditions', chapter: CH2,
      title: L('Умови: if і switch', 'Условия: if и switch', 'Conditions: if and switch'),
      theory: L(
        `<p>У Go умову пишуть <b>без дужок</b>, а фігурні дужки обов’язкові:</p>
<pre class="inline-code">if hp &lt;= 0 {
	fmt.Println("Game over")
} else if hp &lt; 20 {
	fmt.Println("Low HP!")
} else {
	fmt.Println("OK")
}</pre>
<p>Особливість Go — коротка інструкція <b>перед</b> умовою: <code>if n := len(name); n &gt; 5 { … }</code> (змінна <code>n</code> існує лише всередині if).</p>
<p><b>switch</b> у Go не потребує <code>break</code> — виконується лише одна гілка:</p>
<pre class="inline-code">switch day {
case 6, 7:
	fmt.Println("Weekend")
default:
	fmt.Println("Workday")
}</pre>
<p>Switch без значення — зручна заміна ланцюжка if: <code>switch { case score &gt;= 90: … }</code>. Тернарного оператора <code>?:</code> у Go немає — навмисно.</p>`,
        `<p>В Go условие пишут <b>без скобок</b>, а фигурные скобки обязательны:</p>
<pre class="inline-code">if hp &lt;= 0 {
	fmt.Println("Game over")
} else if hp &lt; 20 {
	fmt.Println("Low HP!")
} else {
	fmt.Println("OK")
}</pre>
<p>Особенность Go — короткая инструкция <b>перед</b> условием: <code>if n := len(name); n &gt; 5 { … }</code> (переменная <code>n</code> существует только внутри if).</p>
<p><b>switch</b> в Go не требует <code>break</code> — выполняется только одна ветка:</p>
<pre class="inline-code">switch day {
case 6, 7:
	fmt.Println("Weekend")
default:
	fmt.Println("Workday")
}</pre>
<p>Switch без значения — удобная замена цепочки if: <code>switch { case score &gt;= 90: … }</code>. Тернарного оператора <code>?:</code> в Go нет — намеренно.</p>`,
        `<p>In Go the condition has <b>no parentheses</b>, and braces are mandatory:</p>
<pre class="inline-code">if hp &lt;= 0 {
	fmt.Println("Game over")
} else if hp &lt; 20 {
	fmt.Println("Low HP!")
} else {
	fmt.Println("OK")
}</pre>
<p>A Go feature: a short statement <b>before</b> the condition: <code>if n := len(name); n &gt; 5 { … }</code> (<code>n</code> exists only inside the if).</p>
<p>Go’s <b>switch</b> needs no <code>break</code> — only one case runs:</p>
<pre class="inline-code">switch day {
case 6, 7:
	fmt.Println("Weekend")
default:
	fmt.Println("Workday")
}</pre>
<p>A switch with no value neatly replaces an if-chain: <code>switch { case score &gt;= 90: … }</code>. Go has no ternary <code>?:</code> — on purpose.</p>`),
      why: L(`<p>Чому без <code>break</code> і без тернарного оператора? Автори Go помітили, що забутий <code>break</code> і заплутані <code>a ? b : c ? d : e</code> — часті джерела багів. Тож у Go «правильний» шлях — водночас і найпростіший, а код виглядає однаково в усіх.</p>`,
        `<p>Почему без <code>break</code> и без тернарного оператора? Авторы Go заметили, что забытый <code>break</code> и запутанные <code>a ? b : c ? d : e</code> — частые источники багов. Поэтому в Go «правильный» путь — одновременно и самый простой, а код выглядит одинаково у всех.</p>`,
        `<p>Why no <code>break</code> and no ternary? Go’s authors noticed that forgotten <code>break</code>s and tangled <code>a ? b : c ? d : e</code> cause lots of bugs. So in Go the right way is also the simplest, and everyone’s code looks the same.</p>`),
      mistakes: L(`<ul><li><code>if x &gt; 5</code> без <code>{ }</code> — помилка: дужки обов’язкові навіть для однієї дії.</li><li><code>} else {</code> має стояти на одному рядку із закриваючою дужкою.</li><li>Порівняння різних типів (<code>int</code> з <code>float64</code>) — помилка компіляції.</li></ul>`,
        `<ul><li><code>if x &gt; 5</code> без <code>{ }</code> — ошибка: скобки обязательны даже для одного действия.</li><li><code>} else {</code> должно стоять на одной строке с закрывающей скобкой.</li><li>Сравнение разных типов (<code>int</code> с <code>float64</code>) — ошибка компиляции.</li></ul>`,
        `<ul><li><code>if x &gt; 5</code> without <code>{ }</code> — error: braces are required even for one statement.</li><li><code>} else {</code> must be on the same line as the closing brace.</li><li>Comparing different types (<code>int</code> with <code>float64</code>) — compile error.</li></ul>`),
      examples: [
        { title: 'if / else', code: G(`hp := 15
if hp <= 0 {
	fmt.Println("Game over")
} else if hp < 20 {
	fmt.Println("Low HP!")
} else {
	fmt.Println("OK")
}
age, hasTicket := 13, true
if age >= 12 && hasTicket {
	fmt.Println("Welcome to the ride")
}`), note: L('&& — обидві умови мають бути правдиві.', '&& — оба условия должны быть истинны.', '&& — both must be true.') },
        { title: L('if з ініціалізацією', 'if с инициализацией', 'if with init'), code: G(`name := "Gopherina"
if n := len(name); n > 5 {
	fmt.Println("Long name:", n)
} else {
	fmt.Println("Short name:", n)
}`), note: L('n видно лише всередині if/else.', 'n видно только внутри if/else.', 'n is visible only inside if/else.') },
        { title: 'switch', code: G(`key := "S"
switch key {
case "W":
	fmt.Println("Up")
case "S":
	fmt.Println("Down")
case "A", "D":
	fmt.Println("Side")
default:
	fmt.Println("Unknown")
}
temp := 27
switch {
case temp < 0:
	fmt.Println("Freezing")
case temp < 25:
	fmt.Println("Nice")
default:
	fmt.Println("Hot")
}`), note: L('Жодного break — і нічого не «провалюється».', 'Ни одного break — и ничего не «проваливается».', 'No breaks — and nothing falls through.') }
      ],
      task: {
        text: L('Дано <code>score := 82</code> і <code>day := 6</code>. Виведи оцінку: ≥ 90 → <code>A</code>, ≥ 75 → <code>B</code>, ≥ 60 → <code>C</code>, інакше <code>F</code>. Потім через <code>switch</code> по <code>day</code>: 6 і 7 → <code>Weekend</code>, інакше <code>Workday</code>.', 'Дано <code>score := 82</code> и <code>day := 6</code>. Выведи оценку: ≥ 90 → <code>A</code>, ≥ 75 → <code>B</code>, ≥ 60 → <code>C</code>, иначе <code>F</code>. Затем через <code>switch</code> по <code>day</code>: 6 и 7 → <code>Weekend</code>, иначе <code>Workday</code>.', 'Given <code>score := 82</code> and <code>day := 6</code>, print the grade: ≥ 90 → <code>A</code>, ≥ 75 → <code>B</code>, ≥ 60 → <code>C</code>, else <code>F</code>. Then <code>switch</code> on <code>day</code>: 6 and 7 → <code>Weekend</code>, otherwise <code>Workday</code>.'),
        how: [L('Оцінку зручно зробити через <code>switch { case score &gt;= 90: … }</code> або if-ланцюжок.', 'Оценку удобно сделать через <code>switch { case score &gt;= 90: … }</code> или if-цепочку.', 'Do the grade with <code>switch { case score &gt;= 90: … }</code> or an if-chain.'), L('<code>case 6, 7:</code>', '<code>case 6, 7:</code>', '<code>case 6, 7:</code>')],
        starter: G(`score := 82
day := 6
fmt.Println(score, day)`),
        solution: G(`score := 82
day := 6
if score >= 90 {
	fmt.Println("A")
} else if score >= 75 {
	fmt.Println("B")
} else if score >= 60 {
	fmt.Println("C")
} else {
	fmt.Println("F")
}
switch day {
case 6, 7:
	fmt.Println("Weekend")
default:
	fmt.Println("Workday")
}`),
        hint: L('Очікувано: <code>B</code>, потім <code>Weekend</code>.', 'Ожидается: <code>B</code>, затем <code>Weekend</code>.', 'Expected: <code>B</code>, then <code>Weekend</code>.'),
        expected: 'B\nWeekend',
        must: /switch/
      },
      quiz: { q: L('Чи потрібен break у switch у Go?', 'Нужен ли break в switch в Go?', 'Does Go’s switch need break?'), options: [L('так, завжди', 'да, всегда', 'yes, always'), L('ні, виконується одна гілка', 'нет, выполняется одна ветка', 'no, only one case runs'), L('лише в default', 'только в default', 'only in default')], answer: 1, explain: L('Для «провалювання» є окреме слово fallthrough.', 'Для «проваливания» есть отдельное слово fallthrough.', 'There’s a separate fallthrough keyword for that.') },
      ref: [{ code: 'if x > 0 { } else { }', d: L('умова', 'условие', 'condition') }, { code: 'if v := f(); v > 0 { }', d: L('з ініціалізацією', 'с инициализацией', 'with init') }, { code: 'switch x { case 1, 2: … default: … }', d: 'switch' }]
    },
    {
      id: 'loops', chapter: CH2,
      title: L('Цикл for — єдиний цикл Go', 'Цикл for — единственный цикл Go', 'for — Go’s only loop'),
      theory: L(
        `<p>У Go є лише одне слово для циклів — <code>for</code>, але воно вміє все:</p>
<pre class="inline-code">for i := 1; i &lt;= 5; i++ { }   // класичний
for hp &gt; 0 { }                // як while
for { }                        // нескінченний (вихід через break)
for i, ch := range "go" { }    // перебір</pre>
<p><code>range</code> повертає <b>індекс і значення</b>. Якщо індекс не потрібен — <code>for _, v := range items</code>.</p>
<p><code>break</code> — вийти з циклу, <code>continue</code> — перейти до наступного кроку.</p>`,
        `<p>В Go есть только одно слово для циклов — <code>for</code>, но оно умеет всё:</p>
<pre class="inline-code">for i := 1; i &lt;= 5; i++ { }   // классический
for hp &gt; 0 { }                // как while
for { }                        // бесконечный (выход через break)
for i, ch := range "go" { }    // перебор</pre>
<p><code>range</code> возвращает <b>индекс и значение</b>. Если индекс не нужен — <code>for _, v := range items</code>.</p>
<p><code>break</code> — выйти из цикла, <code>continue</code> — перейти к следующему шагу.</p>`,
        `<p>Go has just one loop keyword — <code>for</code> — and it does everything:</p>
<pre class="inline-code">for i := 1; i &lt;= 5; i++ { }   // classic
for hp &gt; 0 { }                // like while
for { }                        // infinite (exit with break)
for i, ch := range "go" { }    // iteration</pre>
<p><code>range</code> yields <b>index and value</b>. If you don’t need the index: <code>for _, v := range items</code>.</p>
<p><code>break</code> leaves the loop, <code>continue</code> skips to the next iteration.</p>`),
      why: L(`<p>Навіщо три різних слова (for, while, do), якщо одне може все? Менше конструкцій — менше правил, які треба пам’ятати. Побачивши <code>for</code>, ти точно знаєш: це цикл, а умова видна в першому ж рядку.</p>`,
        `<p>Зачем три разных слова (for, while, do), если одно может всё? Меньше конструкций — меньше правил, которые нужно помнить. Увидев <code>for</code>, ты точно знаешь: это цикл, а условие видно в первой же строке.</p>`,
        `<p>Why three keywords (for, while, do) when one can do it all? Fewer constructs, fewer rules to remember. When you see <code>for</code> you know it’s a loop, and the condition is right on the first line.</p>`),
      mistakes: L(`<ul><li><code>for i := 0; i &lt; 10; i++</code> з дужками <code>( )</code> — у Go так не пишуть.</li><li>Невикористаний індекс у <code>range</code> — помилка; заміни його на <code>_</code>.</li><li><code>for { }</code> без <code>break</code> — програма ніколи не завершиться.</li></ul>`,
        `<ul><li><code>for i := 0; i &lt; 10; i++</code> со скобками <code>( )</code> — в Go так не пишут.</li><li>Неиспользованный индекс в <code>range</code> — ошибка; замени его на <code>_</code>.</li><li><code>for { }</code> без <code>break</code> — программа никогда не завершится.</li></ul>`,
        `<ul><li>Wrapping the header in <code>( )</code> — not Go style.</li><li>An unused index in <code>range</code> is an error; replace it with <code>_</code>.</li><li><code>for { }</code> without <code>break</code> never ends.</li></ul>`),
      examples: [
        { title: L('Класичний', 'Классический', 'Classic'), code: G(`for i := 3; i >= 1; i-- {
	fmt.Println(i, "...")
}
fmt.Println("Go!")
for i := 0; i <= 20; i += 5 {
	fmt.Print(i, " ")
}
fmt.Println()`), note: L('Крок може бути будь-яким.', 'Шаг может быть любым.', 'Any step works.') },
        { title: L('Як while', 'Как while', 'Like while'), code: G(`coins, waves := 0, 0
for coins < 50 {
	coins += 15
	waves++
}
fmt.Println(waves, "waves,", coins, "coins")
n := 1
for {
	n *= 2
	if n > 100 {
		break
	}
}
fmt.Println("First power of 2 over 100:", n)`), note: L('for з умовою = while.', 'for с условием = while.', 'for with a condition = while.') },
        { title: 'range / continue', code: G(`for i, ch := range "Gopher" {
	if ch == 'p' {
		continue
	}
	fmt.Println(i, string(ch))
}`), note: L('<code>string(ch)</code> перетворює символ на рядок.', '<code>string(ch)</code> превращает символ в строку.', '<code>string(ch)</code> turns a character into a string.') }
      ],
      task: {
        text: L('Виведи зворотний відлік від 10 з кроком 3 (<code>10</code>, <code>7</code>, <code>4</code>, <code>1</code>), потім <code>Liftoff!</code>, а потім суму чисел від 1 до 100: <code>Sum 5050</code>.', 'Выведи обратный отсчёт от 10 с шагом 3 (<code>10</code>, <code>7</code>, <code>4</code>, <code>1</code>), затем <code>Liftoff!</code>, а потом сумму чисел от 1 до 100: <code>Sum 5050</code>.', 'Print a countdown from 10 in steps of 3 (<code>10</code>, <code>7</code>, <code>4</code>, <code>1</code>), then <code>Liftoff!</code>, then the sum of 1 to 100: <code>Sum 5050</code>.'),
        how: [L('<code>for i := 10; i &gt;= 1; i -= 3</code>', '<code>for i := 10; i &gt;= 1; i -= 3</code>', '<code>for i := 10; i &gt;= 1; i -= 3</code>'), L('Сума: змінна <code>sum</code> і цикл від 1 до 100.', 'Сумма: переменная <code>sum</code> и цикл от 1 до 100.', 'Sum: a <code>sum</code> variable and a loop from 1 to 100.')],
        starter: G('// відлік і сума\nfmt.Print("")'),
        solution: G(`for i := 10; i >= 1; i -= 3 {
	fmt.Println(i)
}
fmt.Println("Liftoff!")
sum := 0
for i := 1; i <= 100; i++ {
	sum += i
}
fmt.Println("Sum", sum)`),
        hint: L('Після 1 наступне було б −2 — цикл зупиняється.', 'После 1 следующее было бы −2 — цикл останавливается.', 'After 1 comes −2 — the loop stops.'),
        expected: '10\n7\n4\n1\nLiftoff!\nSum 5050'
      },
      quiz: { q: L('Як у Go записати цикл «поки x &lt; 10»?', 'Как в Go записать цикл «пока x &lt; 10»?', 'How do you write “while x &lt; 10” in Go?'), options: ['while x < 10 { }', 'for x < 10 { }', 'loop x < 10 { }'], answer: 1, explain: L('while у Go немає — є for з умовою.', 'while в Go нет — есть for с условием.', 'Go has no while — use for with a condition.') },
      ref: [{ code: 'for i := 0; i < n; i++ { }', d: L('класичний', 'классический', 'classic') }, { code: 'for cond { }  for { }', d: L('while / нескінченний', 'while / бесконечный', 'while / infinite') }, { code: 'for i, v := range xs { }', d: 'range' }]
    },
    {
      id: 'slices', chapter: CH2,
      title: L('Масиви та зрізи (slices)', 'Массивы и срезы (slices)', 'Arrays and slices'),
      theory: L(
        `<p><b>Масив</b> у Go має фіксований розмір, що є частиною типу: <code>var a [3]int</code>. Набагато частіше використовують <b>зрізи</b> — «гнучкі масиви»:</p>
<pre class="inline-code">scores := []int{7, 3, 9}
scores = append(scores, 4)   // додати — обов’язково присвоїти результат!
fmt.Println(len(scores))      // 4
fmt.Println(scores[1:3])      // [3 9] — шматок від 1 до 3 (не включно)</pre>
<ul><li><code>make([]int, 5)</code> — зріз з 5 нулів</li><li><code>s[:2]</code> — перші два, <code>s[2:]</code> — від третього до кінця</li><li><code>sort.Ints(s)</code>, <code>sort.Strings(s)</code> — сортування (пакет <code>sort</code>)</li><li><code>fmt.Println(s)</code> друкує зріз як <code>[3 4 7 9]</code></li></ul>`,
        `<p><b>Массив</b> в Go имеет фиксированный размер, который является частью типа: <code>var a [3]int</code>. Гораздо чаще используют <b>срезы</b> — «гибкие массивы»:</p>
<pre class="inline-code">scores := []int{7, 3, 9}
scores = append(scores, 4)   // добавить — обязательно присвоить результат!
fmt.Println(len(scores))      // 4
fmt.Println(scores[1:3])      // [3 9] — кусок от 1 до 3 (не включительно)</pre>
<ul><li><code>make([]int, 5)</code> — срез из 5 нулей</li><li><code>s[:2]</code> — первые два, <code>s[2:]</code> — с третьего до конца</li><li><code>sort.Ints(s)</code>, <code>sort.Strings(s)</code> — сортировка (пакет <code>sort</code>)</li><li><code>fmt.Println(s)</code> печатает срез как <code>[3 4 7 9]</code></li></ul>`,
        `<p>A Go <b>array</b> has a fixed size that’s part of its type: <code>var a [3]int</code>. Far more common are <b>slices</b> — “flexible arrays”:</p>
<pre class="inline-code">scores := []int{7, 3, 9}
scores = append(scores, 4)   // append — you must assign the result!
fmt.Println(len(scores))      // 4
fmt.Println(scores[1:3])      // [3 9] — from 1 up to (not including) 3</pre>
<ul><li><code>make([]int, 5)</code> — a slice of 5 zeros</li><li><code>s[:2]</code> — the first two, <code>s[2:]</code> — from the third to the end</li><li><code>sort.Ints(s)</code>, <code>sort.Strings(s)</code> — sorting (package <code>sort</code>)</li><li><code>fmt.Println(s)</code> prints a slice like <code>[3 4 7 9]</code></li></ul>`),
      why: L(`<p>Чому <code>append</code> повертає новий зріз? Коли місце в пам’яті закінчується, Go виділяє більший блок і копіює туди елементи — адреса змінюється. Присвоюючи результат (<code>s = append(s, x)</code>), ти завжди працюєш з актуальною версією. Це плата за швидкість: зрізи в Go майже такі ж швидкі, як звичайні масиви.</p>`,
        `<p>Почему <code>append</code> возвращает новый срез? Когда место в памяти заканчивается, Go выделяет больший блок и копирует туда элементы — адрес меняется. Присваивая результат (<code>s = append(s, x)</code>), ты всегда работаешь с актуальной версией. Это плата за скорость: срезы в Go почти так же быстры, как обычные массивы.</p>`,
        `<p>Why does <code>append</code> return a new slice? When space runs out, Go allocates a bigger block and copies the items — the address changes. Assigning the result (<code>s = append(s, x)</code>) keeps you on the current version. That’s the price of speed: Go slices are nearly as fast as plain arrays.</p>`),
      mistakes: L(`<ul><li><code>append(s, 5)</code> без присвоєння — помилка «value is not used».</li><li><code>s[len(s)]</code> — паніка <code>index out of range</code>.</li><li>Зріз <code>b := a[1:3]</code> ділить пам’ять з <code>a</code>: зміна <code>b[0]</code> змінить і <code>a[1]</code>.</li></ul>`,
        `<ul><li><code>append(s, 5)</code> без присваивания — ошибка «value is not used».</li><li><code>s[len(s)]</code> — паника <code>index out of range</code>.</li><li>Срез <code>b := a[1:3]</code> делит память с <code>a</code>: изменение <code>b[0]</code> изменит и <code>a[1]</code>.</li></ul>`,
        `<ul><li><code>append(s, 5)</code> without assigning — error “value is not used”.</li><li><code>s[len(s)]</code> panics with <code>index out of range</code>.</li><li><code>b := a[1:3]</code> shares memory with <code>a</code>: changing <code>b[0]</code> changes <code>a[1]</code>.</li></ul>`),
      examples: [
        { title: L('Зрізи', 'Срезы', 'Slices'), code: G(`items := []string{"Sword", "Shield"}
items = append(items, "Potion", "Map")
fmt.Println(items, len(items))
fmt.Println(items[0], items[len(items)-1])
fmt.Println(items[1:3])
fmt.Println(items[:2], items[2:])`), note: L('append може додати кілька значень одразу.', 'append может добавить несколько значений сразу.', 'append can add several values at once.') },
        { title: L('Сума і максимум', 'Сумма и максимум', 'Sum and max'), code: G(`scores := []int{12, 7, 19, 4}
sum, best := 0, scores[0]
for _, s := range scores {
	sum += s
	if s > best {
		best = s
	}
}
fmt.Println("sum", sum, "best", best)
sort.Ints(scores)
fmt.Println(scores)`, ['fmt', 'sort']), note: L('sort.Ints змінює сам зріз.', 'sort.Ints меняет сам срез.', 'sort.Ints sorts in place.') },
        { title: L('Масив і make', 'Массив и make', 'Array and make'), code: G(`var grid [3]int
grid[1] = 5
fmt.Println(grid, len(grid))
squares := make([]int, 5)
for i := range squares {
	squares[i] = i * i
}
fmt.Println(squares)`), note: L('<code>for i := range s</code> — лише індекси.', '<code>for i := range s</code> — только индексы.', '<code>for i := range s</code> gives indexes only.') }
      ],
      task: {
        text: L('Дано <code>scores := []int{7, 3, 9, 4, 10}</code>. Додай <code>6</code> через <code>append</code>, потім виведи <code>Count 6</code>, <code>Sum 39</code>, <code>Max 10</code> і відсортований зріз <code>[3 4 6 7 9 10]</code>.', 'Дано <code>scores := []int{7, 3, 9, 4, 10}</code>. Добавь <code>6</code> через <code>append</code>, затем выведи <code>Count 6</code>, <code>Sum 39</code>, <code>Max 10</code> и отсортированный срез <code>[3 4 6 7 9 10]</code>.', 'Given <code>scores := []int{7, 3, 9, 4, 10}</code>, append <code>6</code>, then print <code>Count 6</code>, <code>Sum 39</code>, <code>Max 10</code> and the sorted slice <code>[3 4 6 7 9 10]</code>.'),
        how: [L('<code>scores = append(scores, 6)</code>', '<code>scores = append(scores, 6)</code>', '<code>scores = append(scores, 6)</code>'), L('<code>sort.Ints(scores)</code>, а потім <code>fmt.Println(scores)</code>.', '<code>sort.Ints(scores)</code>, а затем <code>fmt.Println(scores)</code>.', '<code>sort.Ints(scores)</code>, then <code>fmt.Println(scores)</code>.')],
        starter: G(`scores := []int{7, 3, 9, 4, 10}
fmt.Println(scores)`, ['fmt']),
        solution: G(`scores := []int{7, 3, 9, 4, 10}
scores = append(scores, 6)
sum, max := 0, scores[0]
for _, s := range scores {
	sum += s
	if s > max {
		max = s
	}
}
fmt.Println("Count", len(scores))
fmt.Println("Sum", sum)
fmt.Println("Max", max)
sort.Ints(scores)
fmt.Println(scores)`, ['fmt', 'sort']),
        hint: L('Додай <code>"sort"</code> до імпортів.', 'Добавь <code>"sort"</code> в импорты.', 'Add <code>"sort"</code> to the imports.'),
        expected: 'Count 6\nSum 39\nMax 10\n[3 4 6 7 9 10]',
        must: /append/
      },
      quiz: { q: L('Що виведе <code>fmt.Println([]int{1,2,3,4}[1:3])</code>?', 'Что выведет <code>fmt.Println([]int{1,2,3,4}[1:3])</code>?', 'What does <code>fmt.Println([]int{1,2,3,4}[1:3])</code> print?'), options: ['[1 2 3]', '[2 3]', '[2 3 4]'], answer: 1, explain: L('Від індексу 1 до 3, не включаючи 3.', 'От индекса 1 до 3, не включая 3.', 'From index 1 up to, not including, 3.') },
      ref: [{ code: 's = append(s, x)', d: L('додати', 'добавить', 'append') }, { code: 's[a:b]  len(s)', d: L('шматок, довжина', 'кусок, длина', 'slice, length') }, { code: 'sort.Ints(s)', d: L('сортування', 'сортировка', 'sorting') }]
    },
    {
      id: 'functions', chapter: CH2,
      title: L('Функції та кілька результатів', 'Функции и несколько результатов', 'Functions and multiple results'),
      theory: L(
        `<pre class="inline-code">func add(a, b int) int {
	return a + b
}

func divmod(a, b int) (int, int) {  // два результати
	return a / b, a % b
}

q, r := divmod(17, 5)  // 3 2</pre>
<ul><li>Тип пишеться <b>після</b> імені: <code>a int</code>; однакові типи можна об’єднати: <code>a, b int</code></li><li>Функція може повертати <b>кілька значень</b> — у Go так повертають результат і помилку</li><li>Непотрібний результат відкидають через <code>_</code>: <code>q, _ := divmod(9, 2)</code></li><li><b>Варіативні</b> параметри: <code>func sum(nums ...int)</code> — скільки завгодно аргументів, усередині це зріз</li><li>Функції — це значення: їх можна класти в змінні й передавати іншим функціям</li></ul>`,
        `<pre class="inline-code">func add(a, b int) int {
	return a + b
}

func divmod(a, b int) (int, int) {  // два результата
	return a / b, a % b
}

q, r := divmod(17, 5)  // 3 2</pre>
<ul><li>Тип пишется <b>после</b> имени: <code>a int</code>; одинаковые типы можно объединить: <code>a, b int</code></li><li>Функция может возвращать <b>несколько значений</b> — в Go так возвращают результат и ошибку</li><li>Ненужный результат отбрасывают через <code>_</code>: <code>q, _ := divmod(9, 2)</code></li><li><b>Вариативные</b> параметры: <code>func sum(nums ...int)</code> — сколько угодно аргументов, внутри это срез</li><li>Функции — это значения: их можно класть в переменные и передавать другим функциям</li></ul>`,
        `<pre class="inline-code">func add(a, b int) int {
	return a + b
}

func divmod(a, b int) (int, int) {  // two results
	return a / b, a % b
}

q, r := divmod(17, 5)  // 3 2</pre>
<ul><li>The type goes <b>after</b> the name: <code>a int</code>; same types can be grouped: <code>a, b int</code></li><li>A function can return <b>several values</b> — Go uses this to return a result and an error</li><li>Discard an unwanted result with <code>_</code>: <code>q, _ := divmod(9, 2)</code></li><li><b>Variadic</b> parameters: <code>func sum(nums ...int)</code> takes any number of arguments, a slice inside</li><li>Functions are values: store them in variables and pass them to other functions</li></ul>`),
      why: L(`<p>Кілька результатів — фірмова риса Go. Замість винятків функція чесно каже: «ось результат, а ось помилка» — <code>value, err := f()</code>. Ти бачиш у коді кожне місце, де щось може піти не так, і не забудеш його обробити.</p>`,
        `<p>Несколько результатов — фирменная черта Go. Вместо исключений функция честно говорит: «вот результат, а вот ошибка» — <code>value, err := f()</code>. Ты видишь в коде каждое место, где что-то может пойти не так, и не забудешь его обработать.</p>`,
        `<p>Multiple results are a Go signature. Instead of exceptions, a function honestly says “here’s the result, and here’s the error” — <code>value, err := f()</code>. Every place that can fail is visible in the code, so you won’t forget to handle it.</p>`),
      mistakes: L(`<ul><li>Функція з типом результату без <code>return</code> — <code>missing return</code>.</li><li><code>x := divmod(9, 2)</code> — помилка: функція повертає два значення, треба дві змінні.</li><li>Передати зріз у варіативну функцію: <code>sum(nums...)</code> — з трьома крапками.</li></ul>`,
        `<ul><li>Функция с типом результата без <code>return</code> — <code>missing return</code>.</li><li><code>x := divmod(9, 2)</code> — ошибка: функция возвращает два значения, нужны две переменные.</li><li>Передать срез в вариативную функцию: <code>sum(nums...)</code> — с тремя точками.</li></ul>`,
        `<ul><li>A function with a result type but no <code>return</code> — <code>missing return</code>.</li><li><code>x := divmod(9, 2)</code> — error: two values returned, two variables needed.</li><li>Passing a slice to a variadic function: <code>sum(nums...)</code> — with three dots.</li></ul>`),
      examples: [
        { title: L('Прості функції', 'Простые функции', 'Simple functions'), code: G(`fmt.Println(add(2, 3))
fmt.Println(add(add(1, 1), 10))
greet("Gopher")`, ['fmt'], `func add(a, b int) int {
	return a + b
}

func greet(name string) {
	fmt.Println("Hi,", name)
}`), note: L('Функції оголошуються поза main.', 'Функции объявляются вне main.', 'Functions are declared outside main.') },
        { title: L('Два результати', 'Два результата', 'Two results'), code: G(`q, r := divmod(17, 5)
fmt.Println(q, r)
m, _ := divmod(437, 60)
fmt.Println(m, "minutes")`, ['fmt'], `func divmod(a, b int) (int, int) {
	return a / b, a % b
}`), note: L('<code>_</code> відкидає зайве значення.', '<code>_</code> отбрасывает лишнее значение.', '<code>_</code> discards a value.') },
        { title: L('Варіативні й анонімні', 'Вариативные и анонимные', 'Variadic and anonymous'), code: G(`fmt.Println(sum(1, 2, 3))
nums := []int{10, 20, 30}
fmt.Println(sum(nums...))
double := func(x int) int { return x * 2 }
fmt.Println(double(21))`, ['fmt'], `func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}`), note: L('Функцію можна покласти в змінну.', 'Функцию можно положить в переменную.', 'A function can live in a variable.') }
      ],
      task: {
        text: L('Напиши <code>func minMax(nums []int) (int, int)</code> — повертає найменше й найбільше, і <code>func sum(nums ...int) int</code>. У main виведи <code>minMax([]int{4, 9, 1, 7})</code> (рядок <code>1 9</code>) і <code>sum(1, 2, 3, 4)</code> (<code>10</code>).', 'Напиши <code>func minMax(nums []int) (int, int)</code> — возвращает наименьшее и наибольшее, и <code>func sum(nums ...int) int</code>. В main выведи <code>minMax([]int{4, 9, 1, 7})</code> (строка <code>1 9</code>) и <code>sum(1, 2, 3, 4)</code> (<code>10</code>).', 'Write <code>func minMax(nums []int) (int, int)</code> returning the smallest and largest, and <code>func sum(nums ...int) int</code>. In main print <code>minMax([]int{4, 9, 1, 7})</code> (line <code>1 9</code>) and <code>sum(1, 2, 3, 4)</code> (<code>10</code>).'),
        how: [L('Почни з <code>lo, hi := nums[0], nums[0]</code> і онови в циклі.', 'Начни с <code>lo, hi := nums[0], nums[0]</code> и обнови в цикле.', 'Start with <code>lo, hi := nums[0], nums[0]</code> and update in a loop.'), L('<code>lo, hi := minMax(…)</code>, потім <code>fmt.Println(lo, hi)</code>.', '<code>lo, hi := minMax(…)</code>, затем <code>fmt.Println(lo, hi)</code>.', '<code>lo, hi := minMax(…)</code>, then <code>fmt.Println(lo, hi)</code>.')],
        starter: G(`// виклич minMax і sum
fmt.Print("")`, ['fmt'], '// напиши minMax і sum'),
        solution: G(`lo, hi := minMax([]int{4, 9, 1, 7})
fmt.Println(lo, hi)
fmt.Println(sum(1, 2, 3, 4))`, ['fmt'], `func minMax(nums []int) (int, int) {
	lo, hi := nums[0], nums[0]
	for _, n := range nums {
		if n < lo {
			lo = n
		}
		if n > hi {
			hi = n
		}
	}
	return lo, hi
}

func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}`),
        hint: L('Очікувано: <code>1 9</code> і <code>10</code>.', 'Ожидается: <code>1 9</code> и <code>10</code>.', 'Expected: <code>1 9</code> and <code>10</code>.'),
        expected: '1 9\n10',
        must: /func\s+minMax[\s\S]*\(int,\s*int\)[\s\S]*\.\.\.int/
      },
      quiz: { q: L('Як відкинути другий результат функції?', 'Как отбросить второй результат функции?', 'How do you discard a function’s second result?'), options: ['a, null := f()', 'a, _ := f()', 'a := f()[0]'], answer: 1, explain: L('<code>_</code> — порожній ідентифікатор.', '<code>_</code> — пустой идентификатор.', '<code>_</code> is the blank identifier.') },
      ref: [{ code: 'func f(a, b int) int { }', d: L('функція', 'функция', 'function') }, { code: 'func f() (int, error)', d: L('кілька результатів', 'несколько результатов', 'multiple results') }, { code: 'func f(xs ...int)', d: L('варіативна', 'вариативная', 'variadic') }]
    },
    {
      id: 'maps', chapter: CH3,
      title: L('Мапи (map)', 'Мапы (map)', 'Maps'),
      theory: L(
        `<p><b>map</b> — словник «ключ → значення»:</p>
<pre class="inline-code">prices := map[string]int{"Sword": 150, "Shield": 90}
prices["Potion"] = 25          // додати / змінити
delete(prices, "Shield")       // видалити
fmt.Println(len(prices))       // 2

price, ok := prices["Bow"]      // ok = false, price = 0
if !ok { fmt.Println("not sold") }</pre>
<ul><li>Неіснуючий ключ повертає <b>нульове значення</b> — тому <code>counts[w]++</code> працює навіть для нового слова</li><li>Форма <code>v, ok := m[k]</code> показує, чи ключ справді є</li><li><code>for k, v := range m</code> — перебір, але порядок <b>випадковий</b>! Для стабільного виводу відсортуй ключі</li></ul>`,
        `<p><b>map</b> — словарь «ключ → значение»:</p>
<pre class="inline-code">prices := map[string]int{"Sword": 150, "Shield": 90}
prices["Potion"] = 25          // добавить / изменить
delete(prices, "Shield")       // удалить
fmt.Println(len(prices))       // 2

price, ok := prices["Bow"]      // ok = false, price = 0
if !ok { fmt.Println("not sold") }</pre>
<ul><li>Несуществующий ключ возвращает <b>нулевое значение</b> — поэтому <code>counts[w]++</code> работает даже для нового слова</li><li>Форма <code>v, ok := m[k]</code> показывает, есть ли ключ на самом деле</li><li><code>for k, v := range m</code> — перебор, но порядок <b>случайный</b>! Для стабильного вывода отсортируй ключи</li></ul>`,
        `<p>A <b>map</b> is a key → value dictionary:</p>
<pre class="inline-code">prices := map[string]int{"Sword": 150, "Shield": 90}
prices["Potion"] = 25          // add / change
delete(prices, "Shield")       // remove
fmt.Println(len(prices))       // 2

price, ok := prices["Bow"]      // ok = false, price = 0
if !ok { fmt.Println("not sold") }</pre>
<ul><li>A missing key returns the <b>zero value</b> — so <code>counts[w]++</code> works even for a new word</li><li>The form <code>v, ok := m[k]</code> tells you whether the key really exists</li><li><code>for k, v := range m</code> iterates, but in <b>random</b> order! Sort the keys for stable output</li></ul>`),
      why: L(`<p>Чому порядок випадковий? Go навмисно перемішує його, щоб ніхто не покладався на порядок, якого мова не обіцяє. Інакше програма працювала б «випадково правильно» і зламалась би після оновлення. Сортування ключів робить намір явним.</p>`,
        `<p>Почему порядок случайный? Go намеренно перемешивает его, чтобы никто не полагался на порядок, которого язык не обещает. Иначе программа работала бы «случайно правильно» и сломалась бы после обновления. Сортировка ключей делает намерение явным.</p>`,
        `<p>Why random order? Go shuffles it on purpose so nobody relies on an order the language doesn’t promise. Otherwise a program might work “by luck” and break after an update. Sorting keys makes your intent explicit.</p>`),
      mistakes: L(`<ul><li><code>var m map[string]int</code> і одразу <code>m["a"] = 1</code> — паніка: nil-мапу треба створити через <code>make</code> або <code>{}</code>.</li><li>Очікувати однаковий порядок у <code>range</code> по мапі — вивід щоразу різний.</li></ul>`,
        `<ul><li><code>var m map[string]int</code> и сразу <code>m["a"] = 1</code> — паника: nil-мапу нужно создать через <code>make</code> или <code>{}</code>.</li><li>Ожидать одинаковый порядок в <code>range</code> по мапе — вывод каждый раз разный.</li></ul>`,
        `<ul><li><code>var m map[string]int</code> then <code>m["a"] = 1</code> panics: create the map with <code>make</code> or <code>{}</code> first.</li><li>Expecting stable <code>range</code> order over a map — the output changes each run.</li></ul>`),
      examples: [
        { title: L('Основи', 'Основы', 'Basics'), code: G(`hp := map[string]int{"Slime": 20, "Orc": 50}
hp["Dragon"] = 300
hp["Orc"] -= 15
fmt.Println(hp["Orc"], len(hp))
delete(hp, "Slime")
_, ok := hp["Slime"]
fmt.Println("Slime alive?", ok)`), note: L('delete видаляє ключ, а ok показує, чи він є.', 'delete удаляет ключ, а ok показывает, есть ли он.', 'delete removes a key; ok tells whether it exists.') },
        { title: L('Лічильник', 'Счётчик', 'Counter'), code: G(`votes := []string{"cat", "dog", "cat", "fox", "cat"}
count := map[string]int{}
for _, v := range votes {
	count[v]++
}
fmt.Println(count)`), note: L('Новий ключ починає з 0; Println друкує мапу з відсортованими ключами.', 'Новый ключ начинает с 0; Println печатает мапу с отсортированными ключами.', 'A new key starts at 0; Println prints a map with sorted keys.') },
        { title: L('Відсортовані ключі', 'Отсортированные ключи', 'Sorted keys'), code: G(`ages := map[string]int{"Max": 15, "Ira": 13, "Kira": 14}
names := make([]string, 0, len(ages))
for name := range ages {
	names = append(names, name)
}
sort.Strings(names)
for _, n := range names {
	fmt.Println(n, ages[n])
}`, ['fmt', 'sort']), note: L('Стабільний порядок через sort.Strings.', 'Стабильный порядок через sort.Strings.', 'Stable order via sort.Strings.') }
      ],
      task: {
        text: L('Порахуй слова в рядку <code>"go is fun and go is fast"</code> і виведи їх в <b>алфавітному порядку</b>: <code>and 1</code>, <code>fast 1</code>, <code>fun 1</code>, <code>go 2</code>, <code>is 2</code>.', 'Посчитай слова в строке <code>"go is fun and go is fast"</code> и выведи их в <b>алфавитном порядке</b>: <code>and 1</code>, <code>fast 1</code>, <code>fun 1</code>, <code>go 2</code>, <code>is 2</code>.', 'Count the words in <code>"go is fun and go is fast"</code> and print them in <b>alphabetical order</b>: <code>and 1</code>, <code>fast 1</code>, <code>fun 1</code>, <code>go 2</code>, <code>is 2</code>.'),
        how: [L('<code>strings.Fields(text)</code> і <code>count[w]++</code>.', '<code>strings.Fields(text)</code> и <code>count[w]++</code>.', '<code>strings.Fields(text)</code> and <code>count[w]++</code>.'), L('Збери ключі в зріз, <code>sort.Strings</code>, потім виведи.', 'Собери ключи в срез, <code>sort.Strings</code>, затем выведи.', 'Collect keys into a slice, <code>sort.Strings</code>, then print.')],
        starter: G(`text := "go is fun and go is fast"
fmt.Println(text)`, ['fmt']),
        solution: G(`text := "go is fun and go is fast"
count := map[string]int{}
for _, w := range strings.Fields(text) {
	count[w]++
}
keys := []string{}
for k := range count {
	keys = append(keys, k)
}
sort.Strings(keys)
for _, k := range keys {
	fmt.Println(k, count[k])
}`, ['fmt', 'sort', 'strings']),
        hint: L('Імпорти: <code>"fmt"</code>, <code>"sort"</code>, <code>"strings"</code>.', 'Импорты: <code>"fmt"</code>, <code>"sort"</code>, <code>"strings"</code>.', 'Imports: <code>"fmt"</code>, <code>"sort"</code>, <code>"strings"</code>.'),
        expected: 'and 1\nfast 1\nfun 1\ngo 2\nis 2',
        must: /map\[string\]int[\s\S]*sort\./
      },
      quiz: { q: L('Що поверне <code>m["missing"]</code> для <code>map[string]int</code>?', 'Что вернёт <code>m["missing"]</code> для <code>map[string]int</code>?', 'What does <code>m["missing"]</code> return for <code>map[string]int</code>?'), options: [L('паніку', 'панику', 'a panic'), '0', 'nil'], answer: 1, explain: L('Нульове значення типу int.', 'Нулевое значение типа int.', 'The int zero value.') },
      ref: [{ code: 'm := map[string]int{}', d: L('створення', 'создание', 'creation') }, { code: 'v, ok := m[k]', d: L('перевірка ключа', 'проверка ключа', 'key check') }, { code: 'delete(m, k)', d: L('видалення', 'удаление', 'delete') }]
    },
    {
      id: 'structs', chapter: CH3,
      title: L('Структури та методи', 'Структуры и методы', 'Structs and methods'),
      theory: L(
        `<p>Класів у Go немає — замість них <b>структури</b> (набір полів) і <b>методи</b> до них:</p>
<pre class="inline-code">type Player struct {
	Name  string
	Level int
	XP    int
}

func (p Player) Info() string {        // метод зі «значенням» — читає копію
	return fmt.Sprintf("%s lvl %d", p.Name, p.Level)
}

func (p *Player) AddXP(n int) {        // метод з вказівником — змінює оригінал
	p.XP += n
}

p := Player{Name: "Nika", Level: 1}
p.AddXP(50)</pre>
<ul><li><code>(p Player)</code> перед ім’ям — це <b>отримувач</b> (receiver), як <code>this</code> в інших мовах</li><li>Щоб метод <b>змінював</b> структуру, отримувач має бути вказівником <code>*Player</code></li><li>Поля з великої літери видно з інших пакетів, з малої — лише у своєму</li><li>Конструктор у Go — звичайна функція: <code>func NewPlayer(name string) *Player</code></li></ul>`,
        `<p>Классов в Go нет — вместо них <b>структуры</b> (набор полей) и <b>методы</b> к ним:</p>
<pre class="inline-code">type Player struct {
	Name  string
	Level int
	XP    int
}

func (p Player) Info() string {        // метод со «значением» — читает копию
	return fmt.Sprintf("%s lvl %d", p.Name, p.Level)
}

func (p *Player) AddXP(n int) {        // метод с указателем — меняет оригинал
	p.XP += n
}

p := Player{Name: "Nika", Level: 1}
p.AddXP(50)</pre>
<ul><li><code>(p Player)</code> перед именем — это <b>получатель</b> (receiver), как <code>this</code> в других языках</li><li>Чтобы метод <b>изменял</b> структуру, получатель должен быть указателем <code>*Player</code></li><li>Поля с большой буквы видно из других пакетов, с маленькой — только в своём</li><li>Конструктор в Go — обычная функция: <code>func NewPlayer(name string) *Player</code></li></ul>`,
        `<p>Go has no classes — instead there are <b>structs</b> (sets of fields) and <b>methods</b> on them:</p>
<pre class="inline-code">type Player struct {
	Name  string
	Level int
	XP    int
}

func (p Player) Info() string {        // value receiver — reads a copy
	return fmt.Sprintf("%s lvl %d", p.Name, p.Level)
}

func (p *Player) AddXP(n int) {        // pointer receiver — changes the original
	p.XP += n
}

p := Player{Name: "Nika", Level: 1}
p.AddXP(50)</pre>
<ul><li><code>(p Player)</code> before the name is the <b>receiver</b>, like <code>this</code> elsewhere</li><li>For a method to <b>modify</b> the struct, the receiver must be a pointer <code>*Player</code></li><li>Capitalised fields are visible from other packages, lowercase ones only within their own</li><li>A Go constructor is just a function: <code>func NewPlayer(name string) *Player</code></li></ul>`),
      why: L(`<p>Чому Go відмовився від класів і успадкування? Глибокі ієрархії класів (<code>Animal → Mammal → Dog → Puppy</code>) з часом стає важко змінювати. Go пропонує простіше: дані — у структурі, поведінка — у методах, а спільні можливості описують <b>інтерфейси</b> (наступні уроки).</p>`,
        `<p>Почему Go отказался от классов и наследования? Глубокие иерархии классов (<code>Animal → Mammal → Dog → Puppy</code>) со временем становится трудно менять. Go предлагает проще: данные — в структуре, поведение — в методах, а общие возможности описывают <b>интерфейсы</b> (следующие уроки).</p>`,
        `<p>Why did Go drop classes and inheritance? Deep hierarchies (<code>Animal → Mammal → Dog → Puppy</code>) become hard to change. Go is simpler: data in structs, behaviour in methods, and shared abilities described by <b>interfaces</b> (coming up).</p>`),
      mistakes: L(`<ul><li>Метод зі значенням <code>(p Player)</code> змінює <b>копію</b> — оригінал залишиться старим.</li><li>Забута кома після останнього поля в багаторядковому літералі <code>Player{\\n Name: "A",\\n}</code> — помилка.</li><li>Невідоме поле в літералі (<code>Lvl:</code> замість <code>Level:</code>) — помилка компіляції.</li></ul>`,
        `<ul><li>Метод со значением <code>(p Player)</code> меняет <b>копию</b> — оригинал останется прежним.</li><li>Забытая запятая после последнего поля в многострочном литерале <code>Player{\\n Name: "A",\\n}</code> — ошибка.</li><li>Неизвестное поле в литерале (<code>Lvl:</code> вместо <code>Level:</code>) — ошибка компиляции.</li></ul>`,
        `<ul><li>A value receiver <code>(p Player)</code> modifies a <b>copy</b> — the original stays the same.</li><li>A missing comma after the last field in a multi-line literal <code>Player{\\n Name: "A",\\n}</code> — error.</li><li>An unknown field in a literal (<code>Lvl:</code> instead of <code>Level:</code>) — compile error.</li></ul>`),
      examples: [
        { title: L('Структура', 'Структура', 'Struct'), code: G(`e := Enemy{Name: "Orc", Hp: 50}
e.Hp -= 12
fmt.Println(e.Name, e.Hp)
fmt.Printf("%+v\\n", e)
boss := Enemy{"Dragon", 300}
fmt.Println(boss)`, ['fmt'], `type Enemy struct {
	Name string
	Hp   int
}`), note: L('<code>%+v</code> друкує імена полів.', '<code>%+v</code> печатает имена полей.', '<code>%+v</code> prints field names.') },
        { title: L('Значення чи вказівник', 'Значение или указатель', 'Value vs pointer'), code: G(`c := Counter{}
c.IncCopy()
fmt.Println("after IncCopy:", c.N)
c.Inc()
c.Inc()
fmt.Println("after Inc x2:", c.N)`, ['fmt'], `type Counter struct {
	N int
}

func (c Counter) IncCopy() {
	c.N++
}

func (c *Counter) Inc() {
	c.N++
}`), note: L('IncCopy змінив копію — N лишився 0.', 'IncCopy изменил копию — N остался 0.', 'IncCopy changed a copy — N stayed 0.') },
        { title: L('Функція-конструктор', 'Функция-конструктор', 'Constructor function'), code: G(`r := NewRect(4, 3)
fmt.Println(r.Area(), r.IsSquare())
s := NewRect(5, 5)
fmt.Println(s.Area(), s.IsSquare())`, ['fmt'], `type Rect struct {
	W, H int
}

func NewRect(w, h int) *Rect {
	return &Rect{W: w, H: h}
}

func (r *Rect) Area() int     { return r.W * r.H }
func (r *Rect) IsSquare() bool { return r.W == r.H }`), note: L('Назва NewXxx — домовленість Go.', 'Название NewXxx — договорённость Go.', 'NewXxx is a Go naming convention.') }
      ],
      task: {
        text: L(`Створи <code>type Player struct { Name string; Level, XP int }</code>, метод <code>(p *Player) AddXP(n int)</code> — додає досвід і, поки XP ≥ 100, віднімає 100 й підвищує рівень, та метод <code>Status()</code>, що друкує <code>Nika: level 1, xp 70</code>. У main: <code>Player{Name: "Nika", Level: 1}</code>, AddXP(70) → Status, AddXP(60) → Status, AddXP(250) → Status.`,
          `Создай <code>type Player struct { Name string; Level, XP int }</code>, метод <code>(p *Player) AddXP(n int)</code> — добавляет опыт и, пока XP ≥ 100, вычитает 100 и повышает уровень, и метод <code>Status()</code>, печатающий <code>Nika: level 1, xp 70</code>. В main: <code>Player{Name: "Nika", Level: 1}</code>, AddXP(70) → Status, AddXP(60) → Status, AddXP(250) → Status.`,
          `Create <code>type Player struct { Name string; Level, XP int }</code>, a method <code>(p *Player) AddXP(n int)</code> that adds XP and, while XP ≥ 100, subtracts 100 and levels up, and <code>Status()</code> printing <code>Nika: level 1, xp 70</code>. In main: <code>Player{Name: "Nika", Level: 1}</code>, AddXP(70) → Status, AddXP(60) → Status, AddXP(250) → Status.`),
        how: [L('Усередині AddXP: <code>for p.XP &gt;= 100 { p.XP -= 100; p.Level++ }</code>', 'Внутри AddXP: <code>for p.XP &gt;= 100 { p.XP -= 100; p.Level++ }</code>', 'Inside AddXP: <code>for p.XP &gt;= 100 { p.XP -= 100; p.Level++ }</code>'), L('Отримувач AddXP — обов’язково <code>*Player</code>.', 'Получатель AddXP — обязательно <code>*Player</code>.', 'AddXP’s receiver must be <code>*Player</code>.')],
        starter: G(`p := Player{Name: "Nika", Level: 1}
fmt.Println(p)`, ['fmt'], `type Player struct {
	Name  string
	Level int
	XP    int
}

// AddXP і Status`),
        solution: G(`p := Player{Name: "Nika", Level: 1}
p.AddXP(70)
p.Status()
p.AddXP(60)
p.Status()
p.AddXP(250)
p.Status()`, ['fmt'], `type Player struct {
	Name  string
	Level int
	XP    int
}

func (p *Player) AddXP(n int) {
	p.XP += n
	for p.XP >= 100 {
		p.XP -= 100
		p.Level++
	}
}

func (p Player) Status() {
	fmt.Printf("%s: level %d, xp %d\\n", p.Name, p.Level, p.XP)
}`),
        hint: L('130 XP → рівень 2 і 30 XP; 280 → ще +2 рівні й 80 XP.', '130 XP → уровень 2 и 30 XP; 280 → ещё +2 уровня и 80 XP.', '130 XP → level 2 with 30 XP; 280 → two more levels and 80 XP.'),
        expected: 'Nika: level 1, xp 70\nNika: level 2, xp 30\nNika: level 4, xp 80',
        must: /func\s*\(\s*\w+\s+\*Player\s*\)\s*AddXP/
      },
      quiz: { q: L('Який отримувач потрібен, щоб метод змінював поля структури?', 'Какой получатель нужен, чтобы метод менял поля структуры?', 'Which receiver lets a method modify struct fields?'), options: ['(p Player)', '(p *Player)', '(Player p)'], answer: 1, explain: L('Вказівник дає доступ до оригіналу.', 'Указатель даёт доступ к оригиналу.', 'A pointer reaches the original.') },
      ref: [{ code: 'type T struct { A int }', d: L('структура', 'структура', 'struct') }, { code: 'func (t *T) M() { }', d: L('метод', 'метод', 'method') }, { code: 'T{A: 1}  &T{A: 1}', d: L('літерал', 'литерал', 'literal') }]
    },
    {
      id: 'pointers', chapter: CH3,
      title: L('Вказівники', 'Указатели', 'Pointers'),
      theory: L(
        `<p><b>Вказівник</b> — змінна, що зберігає <b>адресу</b> іншої змінної, а не саме значення.</p>
<pre class="inline-code">x := 10
p := &amp;x        // p — адреса x, тип *int
fmt.Println(*p) // 10 — «що лежить за адресою»
*p = 20         // змінили x через вказівник
fmt.Println(x)  // 20</pre>
<ul><li><code>&amp;x</code> — взяти адресу</li><li><code>*p</code> — дістати (або змінити) значення за адресою</li><li><code>*int</code> — тип «вказівник на int»</li><li>Порожній вказівник — <code>nil</code>; звернення <code>*p</code> до nil — паніка</li></ul>
<p>Головне застосування: функція, що має <b>змінити</b> змінну, отримує її адресу: <code>func reset(n *int) { *n = 0 }</code>, виклик — <code>reset(&amp;score)</code>.</p>`,
        `<p><b>Указатель</b> — переменная, которая хранит <b>адрес</b> другой переменной, а не само значение.</p>
<pre class="inline-code">x := 10
p := &amp;x        // p — адрес x, тип *int
fmt.Println(*p) // 10 — «что лежит по адресу»
*p = 20         // изменили x через указатель
fmt.Println(x)  // 20</pre>
<ul><li><code>&amp;x</code> — взять адрес</li><li><code>*p</code> — достать (или изменить) значение по адресу</li><li><code>*int</code> — тип «указатель на int»</li><li>Пустой указатель — <code>nil</code>; обращение <code>*p</code> к nil — паника</li></ul>
<p>Главное применение: функция, которая должна <b>изменить</b> переменную, получает её адрес: <code>func reset(n *int) { *n = 0 }</code>, вызов — <code>reset(&amp;score)</code>.</p>`,
        `<p>A <b>pointer</b> stores the <b>address</b> of another variable rather than a value.</p>
<pre class="inline-code">x := 10
p := &amp;x        // p is x’s address, type *int
fmt.Println(*p) // 10 — “what’s at the address”
*p = 20         // changed x through the pointer
fmt.Println(x)  // 20</pre>
<ul><li><code>&amp;x</code> takes an address</li><li><code>*p</code> reads (or writes) the value at the address</li><li><code>*int</code> is the type “pointer to int”</li><li>An empty pointer is <code>nil</code>; <code>*p</code> on nil panics</li></ul>
<p>Main use: a function that must <b>change</b> a variable receives its address: <code>func reset(n *int) { *n = 0 }</code>, called as <code>reset(&amp;score)</code>.</p>`),
      why: L(`<p>Уяви, що замість ксерокопії документа даєш другові адресу шафи, де він лежить: друг зможе внести правки в оригінал. Так само й тут: передати велику структуру вказівником — швидко (копіюється лише адреса), і функція може її змінити. А без вказівника функція працює з безпечною копією.</p>`,
        `<p>Представь, что вместо ксерокопии документа даёшь другу адрес шкафа, где он лежит: друг сможет внести правки в оригинал. Так и здесь: передать большую структуру указателем — быстро (копируется только адрес), и функция может её изменить. А без указателя функция работает с безопасной копией.</p>`,
        `<p>Imagine giving a friend the address of the cabinet holding a document instead of a photocopy: they can edit the original. Same here: passing a big struct by pointer is fast (only the address is copied) and lets the function change it. Without a pointer the function works on a safe copy.</p>`),
      mistakes: L(`<ul><li>Виклик <code>double(x)</code> замість <code>double(&amp;x)</code> — помилка типів: функція чекає <code>*int</code>.</li><li><code>p = 5</code> замість <code>*p = 5</code> — спроба записати число у вказівник.</li><li>Розіменування <code>nil</code> — <code>invalid memory address or nil pointer dereference</code>.</li></ul>`,
        `<ul><li>Вызов <code>double(x)</code> вместо <code>double(&amp;x)</code> — ошибка типов: функция ждёт <code>*int</code>.</li><li><code>p = 5</code> вместо <code>*p = 5</code> — попытка записать число в указатель.</li><li>Разыменование <code>nil</code> — <code>invalid memory address or nil pointer dereference</code>.</li></ul>`,
        `<ul><li>Calling <code>double(x)</code> instead of <code>double(&amp;x)</code> — type error: the function wants <code>*int</code>.</li><li><code>p = 5</code> instead of <code>*p = 5</code> — writing a number into a pointer.</li><li>Dereferencing <code>nil</code> — <code>invalid memory address or nil pointer dereference</code>.</li></ul>`),
      examples: [
        { title: L('& і *', '& и *', '& and *'), code: G(`x := 10
p := &x
fmt.Println(*p)
*p = 20
fmt.Println(x)
fmt.Println(p != nil)`), note: L('x змінився через p.', 'x изменился через p.', 'x changed through p.') },
        { title: L('Функція змінює змінну', 'Функция меняет переменную', 'Function changes a variable'), code: G(`score := 50
tryReset(score)
fmt.Println("after tryReset:", score)
reset(&score)
fmt.Println("after reset:", score)`, ['fmt'], `func tryReset(n int) {
	n = 0
}

func reset(n *int) {
	*n = 0
}`), note: L('Без вказівника змінилась лише копія.', 'Без указателя изменилась только копия.', 'Without a pointer only a copy changed.') },
        { title: L('Вказівник на структуру', 'Указатель на структуру', 'Pointer to struct'), code: G(`h := Hero{Name: "Kira", Hp: 100}
heal(&h, 25)
fmt.Println(h.Name, h.Hp)
p := &h
p.Hp -= 40
fmt.Println(h.Hp)`, ['fmt'], `type Hero struct {
	Name string
	Hp   int
}

func heal(h *Hero, amount int) {
	h.Hp += amount
}`), note: L('Для полів Go сам пише (*p).Hp — досить p.Hp.', 'Для полей Go сам пишет (*p).Hp — достаточно p.Hp.', 'For fields Go handles (*p).Hp — just write p.Hp.') }
      ],
      task: {
        text: L('Напиши <code>func double(n *int)</code> (подвоює значення) і <code>func swap(a, b *int)</code> (міняє місцями). У main: <code>x := 5</code>, двічі <code>double(&amp;x)</code>, виведи x (<code>20</code>). Потім <code>a, b := 1, 2</code>, <code>swap(&amp;a, &amp;b)</code> і виведи <code>2 1</code>.', 'Напиши <code>func double(n *int)</code> (удваивает значение) и <code>func swap(a, b *int)</code> (меняет местами). В main: <code>x := 5</code>, дважды <code>double(&amp;x)</code>, выведи x (<code>20</code>). Затем <code>a, b := 1, 2</code>, <code>swap(&amp;a, &amp;b)</code> и выведи <code>2 1</code>.', 'Write <code>func double(n *int)</code> (doubles the value) and <code>func swap(a, b *int)</code> (swaps them). In main: <code>x := 5</code>, call <code>double(&amp;x)</code> twice, print x (<code>20</code>). Then <code>a, b := 1, 2</code>, <code>swap(&amp;a, &amp;b)</code> and print <code>2 1</code>.'),
        how: [L('<code>*n *= 2</code>', '<code>*n *= 2</code>', '<code>*n *= 2</code>'), L('Обмін у Go: <code>*a, *b = *b, *a</code>', 'Обмен в Go: <code>*a, *b = *b, *a</code>', 'Swapping in Go: <code>*a, *b = *b, *a</code>')],
        starter: G(`x := 5
fmt.Println(x)`, ['fmt'], '// double і swap'),
        solution: G(`x := 5
double(&x)
double(&x)
fmt.Println(x)
a, b := 1, 2
swap(&a, &b)
fmt.Println(a, b)`, ['fmt'], `func double(n *int) {
	*n *= 2
}

func swap(a, b *int) {
	*a, *b = *b, *a
}`),
        hint: L('5 → 10 → 20.', '5 → 10 → 20.', '5 → 10 → 20.'),
        expected: '20\n2 1',
        must: /\*int/
      },
      quiz: { q: L('Що робить <code>*p = 7</code>?', 'Что делает <code>*p = 7</code>?', 'What does <code>*p = 7</code> do?'), options: [L('записує 7 у змінну, на яку вказує p', 'записывает 7 в переменную, на которую указывает p', 'stores 7 in the variable p points to'), L('створює вказівник', 'создаёт указатель', 'creates a pointer'), L('множить p на 7', 'умножает p на 7', 'multiplies p by 7')], answer: 0, explain: L('<code>*p</code> — значення за адресою.', '<code>*p</code> — значение по адресу.', '<code>*p</code> is the value at the address.') },
      ref: [{ code: 'p := &x', d: L('адреса', 'адрес', 'address') }, { code: '*p = v', d: L('запис за адресою', 'запись по адресу', 'write through') }, { code: 'func f(n *int)', d: L('параметр-вказівник', 'параметр-указатель', 'pointer parameter') }]
    },
    {
      id: 'interfaces', chapter: CH3,
      title: L('Інтерфейси', 'Интерфейсы', 'Interfaces'),
      theory: L(
        `<p><b>Інтерфейс</b> — список методів, «що вміє» тип:</p>
<pre class="inline-code">type Enemy interface {
	Name() string
	Damage() int
}</pre>
<p>Магія Go: тип реалізує інтерфейс <b>автоматично</b>, якщо має всі його методи — писати <code>implements</code> не треба.</p>
<pre class="inline-code">type Slime struct{}
func (Slime) Name() string { return "Slime" }
func (Slime) Damage() int  { return 5 }

var e Enemy = Slime{}  // підходить!</pre>
<p>Тепер можна зробити зріз <code>[]Enemy</code> з різних типів і викликати методи в одному циклі — це <b>поліморфізм</b>. Найвідоміший інтерфейс Go — <code>fmt.Stringer</code> з методом <code>String() string</code>: якщо він є, <code>fmt.Println</code> друкує твій тип саме так.</p>`,
        `<p><b>Интерфейс</b> — список методов, «что умеет» тип:</p>
<pre class="inline-code">type Enemy interface {
	Name() string
	Damage() int
}</pre>
<p>Магия Go: тип реализует интерфейс <b>автоматически</b>, если у него есть все его методы — писать <code>implements</code> не нужно.</p>
<pre class="inline-code">type Slime struct{}
func (Slime) Name() string { return "Slime" }
func (Slime) Damage() int  { return 5 }

var e Enemy = Slime{}  // подходит!</pre>
<p>Теперь можно сделать срез <code>[]Enemy</code> из разных типов и вызывать методы в одном цикле — это <b>полиморфизм</b>. Самый известный интерфейс Go — <code>fmt.Stringer</code> с методом <code>String() string</code>: если он есть, <code>fmt.Println</code> печатает твой тип именно так.</p>`,
        `<p>An <b>interface</b> is a list of methods — what a type “can do”:</p>
<pre class="inline-code">type Enemy interface {
	Name() string
	Damage() int
}</pre>
<p>Go’s magic: a type implements an interface <b>automatically</b> if it has all its methods — no <code>implements</code> keyword.</p>
<pre class="inline-code">type Slime struct{}
func (Slime) Name() string { return "Slime" }
func (Slime) Damage() int  { return 5 }

var e Enemy = Slime{}  // fits!</pre>
<p>Now a <code>[]Enemy</code> can hold different types, and one loop calls their methods — that’s <b>polymorphism</b>. Go’s best-known interface is <code>fmt.Stringer</code> with <code>String() string</code>: if present, <code>fmt.Println</code> prints your type that way.</p>`),
      why: L(`<p>Інтерфейси дозволяють писати код, якому байдуже, з чим саме він працює: функції бою потрібне лише «щось, що має Damage()». Додаси нового ворога — не змінюєш ані рядка в бою. А автоматична реалізація означає, що можна описати інтерфейс навіть для чужих типів, які про нього не знають.</p>`,
        `<p>Интерфейсы позволяют писать код, которому безразлично, с чем именно он работает: функции боя нужно лишь «что-то, у чего есть Damage()». Добавишь нового врага — не меняешь ни строки в бою. А автоматическая реализация значит, что можно описать интерфейс даже для чужих типов, которые о нём не знают.</p>`,
        `<p>Interfaces let code not care what exactly it works with: the battle function only needs “something with Damage()”. Add a new enemy and the battle code doesn’t change. And automatic implementation means you can describe an interface even for other people’s types that never heard of it.</p>`),
      mistakes: L(`<ul><li>Бракує одного методу — тип <b>не</b> підходить: <code>does not implement Enemy (missing method Damage)</code>.</li><li>Метод з отримувачем-вказівником <code>(d *Dragon)</code>: тоді в інтерфейс кладуть <code>&amp;Dragon{}</code>, а не <code>Dragon{}</code>.</li></ul>`,
        `<ul><li>Не хватает одного метода — тип <b>не</b> подходит: <code>does not implement Enemy (missing method Damage)</code>.</li><li>Метод с получателем-указателем <code>(d *Dragon)</code>: тогда в интерфейс кладут <code>&amp;Dragon{}</code>, а не <code>Dragon{}</code>.</li></ul>`,
        `<ul><li>One method missing — the type does <b>not</b> fit: <code>does not implement Enemy (missing method Damage)</code>.</li><li>A pointer receiver <code>(d *Dragon)</code> means you store <code>&amp;Dragon{}</code>, not <code>Dragon{}</code>, in the interface.</li></ul>`),
      examples: [
        { title: L('Поліморфізм', 'Полиморфизм', 'Polymorphism'), code: G(`animals := []Speaker{Dog{}, Cat{}, Robot{Model: "R2"}}
for _, a := range animals {
	fmt.Println(a.Speak())
}`, ['fmt'], `type Speaker interface {
	Speak() string
}

type Dog struct{}
type Cat struct{}
type Robot struct{ Model string }

func (Dog) Speak() string   { return "Woof" }
func (Cat) Speak() string   { return "Meow" }
func (r Robot) Speak() string { return r.Model + ": beep" }`), note: L('Різні типи, один цикл.', 'Разные типы, один цикл.', 'Different types, one loop.') },
        { title: 'Stringer', code: G(`c := Coin{Value: 25}
fmt.Println(c)
fmt.Println("In bag:", c)`, ['fmt'], `type Coin struct{ Value int }

func (c Coin) String() string {
	return fmt.Sprintf("🪙%d", c.Value)
}`), note: L('Println викликає String() сам.', 'Println вызывает String() сам.', 'Println calls String() itself.') },
        { title: L('Функція приймає інтерфейс', 'Функция принимает интерфейс', 'Function takes an interface'), code: G(`fmt.Println(totalArea([]Shape{Square{3}, Rect{2, 5}}))`, ['fmt'], `type Shape interface {
	Area() int
}

type Square struct{ S int }
type Rect struct{ W, H int }

func (s Square) Area() int { return s.S * s.S }
func (r Rect) Area() int   { return r.W * r.H }

func totalArea(shapes []Shape) int {
	sum := 0
	for _, s := range shapes {
		sum += s.Area()
	}
	return sum
}`), note: L('totalArea не знає про Square і Rect.', 'totalArea не знает о Square и Rect.', 'totalArea knows nothing about Square or Rect.') }
      ],
      task: {
        text: L('Опиши інтерфейс <code>Enemy</code> з методами <code>Name() string</code> і <code>Damage() int</code>. Типи: <code>Slime</code> (шкода 5) і <code>Dragon</code> з полем <code>Level</code> (шкода Level × 10). Для зрізу <code>[]Enemy{Slime{}, Dragon{Level: 3}, Slime{}}</code> виведи <code>Slime deals 5</code>, <code>Dragon deals 30</code>, <code>Slime deals 5</code> і <code>Total 40</code>.', 'Опиши интерфейс <code>Enemy</code> с методами <code>Name() string</code> и <code>Damage() int</code>. Типы: <code>Slime</code> (урон 5) и <code>Dragon</code> с полем <code>Level</code> (урон Level × 10). Для среза <code>[]Enemy{Slime{}, Dragon{Level: 3}, Slime{}}</code> выведи <code>Slime deals 5</code>, <code>Dragon deals 30</code>, <code>Slime deals 5</code> и <code>Total 40</code>.', 'Define an <code>Enemy</code> interface with <code>Name() string</code> and <code>Damage() int</code>. Types: <code>Slime</code> (damage 5) and <code>Dragon</code> with a <code>Level</code> field (damage Level × 10). For <code>[]Enemy{Slime{}, Dragon{Level: 3}, Slime{}}</code> print <code>Slime deals 5</code>, <code>Dragon deals 30</code>, <code>Slime deals 5</code> and <code>Total 40</code>.'),
        how: [L('<code>func (d Dragon) Damage() int { return d.Level * 10 }</code>', '<code>func (d Dragon) Damage() int { return d.Level * 10 }</code>', '<code>func (d Dragon) Damage() int { return d.Level * 10 }</code>')],
        starter: G(`// зріз ворогів і підсумок
fmt.Print("")`, ['fmt'], `type Enemy interface {
	// методи
}`),
        solution: G(`enemies := []Enemy{Slime{}, Dragon{Level: 3}, Slime{}}
total := 0
for _, e := range enemies {
	fmt.Println(e.Name(), "deals", e.Damage())
	total += e.Damage()
}
fmt.Println("Total", total)`, ['fmt'], `type Enemy interface {
	Name() string
	Damage() int
}

type Slime struct{}

func (Slime) Name() string { return "Slime" }
func (Slime) Damage() int  { return 5 }

type Dragon struct {
	Level int
}

func (d Dragon) Name() string { return "Dragon" }
func (d Dragon) Damage() int  { return d.Level * 10 }`),
        hint: L('5 + 30 + 5 = 40.', '5 + 30 + 5 = 40.', '5 + 30 + 5 = 40.'),
        expected: 'Slime deals 5\nDragon deals 30\nSlime deals 5\nTotal 40',
        must: /interface\s*\{[\s\S]*Damage\(\)\s*int/
      },
      quiz: { q: L('Як тип у Go реалізує інтерфейс?', 'Как тип в Go реализует интерфейс?', 'How does a Go type implement an interface?'), options: [L('словом implements', 'словом implements', 'with implements'), L('автоматично, якщо має всі методи', 'автоматически, если есть все методы', 'automatically, by having all methods'), L('через успадкування', 'через наследование', 'via inheritance')], answer: 1, explain: L('Це називають «качина типізація»: крякає як качка — отже качка.', 'Это называют «утиная типизация»: крякает как утка — значит утка.', 'It’s “duck typing”: if it quacks like a duck, it’s a duck.') },
      ref: [{ code: 'type I interface { M() int }', d: L('інтерфейс', 'интерфейс', 'interface') }, { code: 'var x I = T{}', d: L('значення інтерфейсу', 'значение интерфейса', 'interface value') }, { code: 'String() string', d: 'fmt.Stringer' }]
    },
    {
      id: 'errors', chapter: CH4,
      title: L('Обробка помилок', 'Обработка ошибок', 'Error handling'),
      theory: L(
        `<p>У Go немає <code>try/catch</code>. Помилка — це звичайне значення типу <code>error</code>, яке функція повертає <b>останнім</b>:</p>
<pre class="inline-code">func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil   // nil — «помилки немає»
}

result, err := divide(10, 0)
if err != nil {
	fmt.Println("Error:", err)
	return
}</pre>
<ul><li><code>errors.New("текст")</code> — проста помилка (пакет <code>errors</code>)</li><li><code>fmt.Errorf("need %d, have %d", a, b)</code> — помилка з форматуванням</li><li><code>if err != nil { … }</code> — найчастіший рядок у Go-коді</li><li><code>panic</code> — аварійна зупинка, лише для справді неможливих ситуацій</li></ul>`,
        `<p>В Go нет <code>try/catch</code>. Ошибка — это обычное значение типа <code>error</code>, которое функция возвращает <b>последним</b>:</p>
<pre class="inline-code">func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil   // nil — «ошибки нет»
}

result, err := divide(10, 0)
if err != nil {
	fmt.Println("Error:", err)
	return
}</pre>
<ul><li><code>errors.New("текст")</code> — простая ошибка (пакет <code>errors</code>)</li><li><code>fmt.Errorf("need %d, have %d", a, b)</code> — ошибка с форматированием</li><li><code>if err != nil { … }</code> — самая частая строка в Go-коде</li><li><code>panic</code> — аварийная остановка, только для действительно невозможных ситуаций</li></ul>`,
        `<p>Go has no <code>try/catch</code>. An error is an ordinary value of type <code>error</code> that a function returns <b>last</b>:</p>
<pre class="inline-code">func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil   // nil means “no error”
}

result, err := divide(10, 0)
if err != nil {
	fmt.Println("Error:", err)
	return
}</pre>
<ul><li><code>errors.New("text")</code> — a simple error (package <code>errors</code>)</li><li><code>fmt.Errorf("need %d, have %d", a, b)</code> — an error with formatting</li><li><code>if err != nil { … }</code> — the most common line in Go code</li><li><code>panic</code> — an emergency stop, only for truly impossible situations</li></ul>`),
      why: L(`<p>Винятки «вистрибують» з будь-якого місця, і по коду не видно, що може зламатися. У Go кожна можлива помилка — у сигнатурі функції, і ти вирішуєш, що з нею робити, <b>прямо там</b>. Коду трохи більше, зате сюрпризів — значно менше. Саме тому на Go так люблять писати надійні сервери.</p>`,
        `<p>Исключения «выпрыгивают» из любого места, и по коду не видно, что может сломаться. В Go каждая возможная ошибка — в сигнатуре функции, и ты решаешь, что с ней делать, <b>прямо там</b>. Кода чуть больше, зато сюрпризов — намного меньше. Именно поэтому на Go так любят писать надёжные серверы.</p>`,
        `<p>Exceptions jump out from anywhere, and the code doesn’t show what can fail. In Go every possible error is in the function’s signature, and you decide what to do with it <b>right there</b>. Slightly more code, far fewer surprises — which is why people love Go for reliable servers.</p>`),
      mistakes: L(`<ul><li>Ігнорувати помилку: <code>n, _ := strconv.Atoi(s)</code> — при поганому вводі тихо отримаєш 0.</li><li>Використовувати результат, не перевіривши <code>err</code>.</li><li>Повертати помилку не останньою: домовленість Go — <code>(результат, error)</code>.</li></ul>`,
        `<ul><li>Игнорировать ошибку: <code>n, _ := strconv.Atoi(s)</code> — при плохом вводе тихо получишь 0.</li><li>Использовать результат, не проверив <code>err</code>.</li><li>Возвращать ошибку не последней: договорённость Go — <code>(результат, error)</code>.</li></ul>`,
        `<ul><li>Ignoring an error: <code>n, _ := strconv.Atoi(s)</code> silently gives 0 on bad input.</li><li>Using the result without checking <code>err</code>.</li><li>Not returning the error last: the Go convention is <code>(result, error)</code>.</li></ul>`),
      examples: [
        { title: 'errors.New', code: G(`for _, b := range []int{2, 0} {
	r, err := divide(10, b)
	if err != nil {
		fmt.Println("Error:", err)
		continue
	}
	fmt.Println("Result:", r)
}`, ['errors', 'fmt'], `func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}`), note: L('nil означає успіх.', 'nil означает успех.', 'nil means success.') },
        { title: 'strconv.Atoi', code: G(`for _, s := range []string{"42", "abc", "7"} {
	n, err := strconv.Atoi(s)
	if err != nil {
		fmt.Println("bad input:", s)
		continue
	}
	fmt.Println(n * 2)
}`, ['fmt', 'strconv']), note: L('Стандартні функції теж повертають error.', 'Стандартные функции тоже возвращают error.', 'Standard functions return errors too.') },
        { title: 'fmt.Errorf', code: G(`if err := buy(30, 50); err != nil {
	fmt.Println(err)
}
if err := buy(80, 50); err == nil {
	fmt.Println("bought!")
}`, ['fmt'], `func buy(gold, price int) error {
	if gold < price {
		return fmt.Errorf("need %d more gold", price-gold)
	}
	return nil
}`), note: L('Функція може повертати лише error.', 'Функция может возвращать только error.', 'A function may return just an error.') }
      ],
      task: {
        text: L(`Напиши <code>func withdraw(balance, amount int) (int, error)</code>: якщо amount ≤ 0 — помилка <code>invalid amount</code>; якщо amount &gt; balance — <code>not enough money: have 70, need 200</code> (через <code>fmt.Errorf</code>); інакше повертає новий баланс і <code>nil</code>. Почни з балансу 100 і по черзі зніми <code>30, -5, 200, 50</code>: при успіху виводь <code>Balance 70</code>, при помилці — <code>Error: …</code>.`,
          `Напиши <code>func withdraw(balance, amount int) (int, error)</code>: если amount ≤ 0 — ошибка <code>invalid amount</code>; если amount &gt; balance — <code>not enough money: have 70, need 200</code> (через <code>fmt.Errorf</code>); иначе возвращает новый баланс и <code>nil</code>. Начни с баланса 100 и по очереди сними <code>30, -5, 200, 50</code>: при успехе выводи <code>Balance 70</code>, при ошибке — <code>Error: …</code>.`,
          `Write <code>func withdraw(balance, amount int) (int, error)</code>: if amount ≤ 0 return error <code>invalid amount</code>; if amount &gt; balance return <code>not enough money: have 70, need 200</code> (via <code>fmt.Errorf</code>); otherwise return the new balance and <code>nil</code>. Start with balance 100 and withdraw <code>30, -5, 200, 50</code> in turn: print <code>Balance 70</code> on success, <code>Error: …</code> on failure.`),
        how: [L('<code>nb, err := withdraw(balance, a)</code>; якщо <code>err != nil</code> — <code>fmt.Println("Error:", err)</code>, інакше <code>balance = nb</code>.', '<code>nb, err := withdraw(balance, a)</code>; если <code>err != nil</code> — <code>fmt.Println("Error:", err)</code>, иначе <code>balance = nb</code>.', '<code>nb, err := withdraw(balance, a)</code>; if <code>err != nil</code> print <code>fmt.Println("Error:", err)</code>, else <code>balance = nb</code>.')],
        starter: G(`balance := 100
fmt.Println("Balance", balance)`, ['fmt'], '// func withdraw(balance, amount int) (int, error)'),
        solution: G(`balance := 100
for _, a := range []int{30, -5, 200, 50} {
	nb, err := withdraw(balance, a)
	if err != nil {
		fmt.Println("Error:", err)
		continue
	}
	balance = nb
	fmt.Println("Balance", balance)
}`, ['errors', 'fmt'], `func withdraw(balance, amount int) (int, error) {
	if amount <= 0 {
		return balance, errors.New("invalid amount")
	}
	if amount > balance {
		return balance, fmt.Errorf("not enough money: have %d, need %d", balance, amount)
	}
	return balance - amount, nil
}`),
        hint: L('Очікувано 4 рядки: Balance 70, Error: invalid amount, Error: not enough money…, Balance 20.', 'Ожидается 4 строки: Balance 70, Error: invalid amount, Error: not enough money…, Balance 20.', 'Expect 4 lines: Balance 70, Error: invalid amount, Error: not enough money…, Balance 20.'),
        expected: 'Balance 70\nError: invalid amount\nError: not enough money: have 70, need 200\nBalance 20',
        must: /err\s*!=\s*nil/
      },
      quiz: { q: L('Що повертає функція, коли помилки немає?', 'Что возвращает функция, когда ошибки нет?', 'What does a function return when there’s no error?'), options: ['false', 'nil', '0'], answer: 1, explain: L('nil у позиції error = успіх.', 'nil в позиции error = успех.', 'nil in the error slot means success.') },
      ref: [{ code: 'errors.New("…")', d: L('нова помилка', 'новая ошибка', 'new error') }, { code: 'fmt.Errorf("… %d", x)', d: L('з форматуванням', 'с форматированием', 'formatted') }, { code: 'if err != nil { }', d: L('перевірка', 'проверка', 'check') }]
    },
    {
      id: 'goroutines', chapter: CH4,
      title: L('Горутини та канали', 'Горутины и каналы', 'Goroutines and channels'),
      theory: L(
        `<p>Головна суперсила Go — <b>горутини</b>: легкі «потоки», що виконуються одночасно. Достатньо написати <code>go</code> перед викликом:</p>
<pre class="inline-code">go download("file1")   // запуск у фоні
go download("file2")</pre>
<p>Горутини спілкуються через <b>канали</b> — «труби», куди одна горутина кладе значення, а інша забирає:</p>
<pre class="inline-code">ch := make(chan int)
go func() { ch &lt;- 42 }()   // відправити
v := &lt;-ch                  // отримати (чекає, доки щось прийде)</pre>
<ul><li><code>sync.WaitGroup</code> — дочекатися завершення групи горутин: <code>wg.Add(1)</code>, <code>defer wg.Done()</code>, <code>wg.Wait()</code></li><li><code>close(ch)</code> + <code>for v := range ch</code> — читати, доки канал не закриють</li><li>Порядок виконання горутин <b>не гарантовано</b> — результат треба збирати так, щоб він від порядку не залежав</li></ul>
<p><code>defer</code> — «виконати в самому кінці функції».</p>`,
        `<p>Главная суперсила Go — <b>горутины</b>: лёгкие «потоки», выполняющиеся одновременно. Достаточно написать <code>go</code> перед вызовом:</p>
<pre class="inline-code">go download("file1")   // запуск в фоне
go download("file2")</pre>
<p>Горутины общаются через <b>каналы</b> — «трубы», куда одна горутина кладёт значение, а другая забирает:</p>
<pre class="inline-code">ch := make(chan int)
go func() { ch &lt;- 42 }()   // отправить
v := &lt;-ch                  // получить (ждёт, пока что-то придёт)</pre>
<ul><li><code>sync.WaitGroup</code> — дождаться завершения группы горутин: <code>wg.Add(1)</code>, <code>defer wg.Done()</code>, <code>wg.Wait()</code></li><li><code>close(ch)</code> + <code>for v := range ch</code> — читать, пока канал не закроют</li><li>Порядок выполнения горутин <b>не гарантирован</b> — результат нужно собирать так, чтобы он от порядка не зависел</li></ul>
<p><code>defer</code> — «выполнить в самом конце функции».</p>`,
        `<p>Go’s superpower is <b>goroutines</b>: lightweight “threads” that run at the same time. Just put <code>go</code> before a call:</p>
<pre class="inline-code">go download("file1")   // run in the background
go download("file2")</pre>
<p>Goroutines talk through <b>channels</b> — “pipes” where one goroutine puts a value and another takes it:</p>
<pre class="inline-code">ch := make(chan int)
go func() { ch &lt;- 42 }()   // send
v := &lt;-ch                  // receive (waits until something arrives)</pre>
<ul><li><code>sync.WaitGroup</code> waits for a group of goroutines: <code>wg.Add(1)</code>, <code>defer wg.Done()</code>, <code>wg.Wait()</code></li><li><code>close(ch)</code> + <code>for v := range ch</code> reads until the channel is closed</li><li>Goroutine order is <b>not guaranteed</b> — collect results so they don’t depend on order</li></ul>
<p><code>defer</code> means “run this at the very end of the function”.</p>`),
      why: L(`<p>Сервер обслуговує тисячі гравців одночасно: поки один чекає відповіді від бази даних, інші не повинні стояти в черзі. У Go можна запустити <b>мільйон</b> горутин на звичайному ноутбуці — вони значно легші за потоки операційної системи. А канали замінюють складні блокування: «не спілкуйтеся через спільну пам’ять — діліться пам’яттю через спілкування».</p>`,
        `<p>Сервер обслуживает тысячи игроков одновременно: пока один ждёт ответа от базы данных, другие не должны стоять в очереди. В Go можно запустить <b>миллион</b> горутин на обычном ноутбуке — они намного легче потоков операционной системы. А каналы заменяют сложные блокировки: «не общайтесь через общую память — делитесь памятью через общение».</p>`,
        `<p>A server handles thousands of players at once: while one waits for the database, the others mustn’t queue. Go can run a <b>million</b> goroutines on an ordinary laptop — far lighter than OS threads. And channels replace tricky locks: “don’t communicate by sharing memory; share memory by communicating”.</p>`),
      mistakes: L(`<ul><li><code>main</code> завершилась раніше за горутини — їхній вивід зникає; використовуй WaitGroup або канал.</li><li>Читання з каналу, у який ніхто не пише — <code>fatal error: all goroutines are asleep - deadlock!</code></li><li><code>for v := range ch</code> без <code>close(ch)</code> — вічне очікування.</li></ul>`,
        `<ul><li><code>main</code> завершилась раньше горутин — их вывод пропадает; используй WaitGroup или канал.</li><li>Чтение из канала, в который никто не пишет — <code>fatal error: all goroutines are asleep - deadlock!</code></li><li><code>for v := range ch</code> без <code>close(ch)</code> — вечное ожидание.</li></ul>`,
        `<ul><li><code>main</code> finishing before the goroutines — their output disappears; use a WaitGroup or channel.</li><li>Reading from a channel nobody writes to — <code>fatal error: all goroutines are asleep - deadlock!</code></li><li><code>for v := range ch</code> without <code>close(ch)</code> — waits forever.</li></ul>`),
      examples: [
        { title: L('Канал', 'Канал', 'Channel'), code: G(`ch := make(chan string)
go func() {
	ch <- "hello from goroutine"
}()
msg := <-ch
fmt.Println(msg)`), note: L('main чекає на <code>&lt;-ch</code>, доки горутина не надішле.', 'main ждёт на <code>&lt;-ch</code>, пока горутина не отправит.', 'main waits at <code>&lt;-ch</code> until the goroutine sends.') },
        { title: 'WaitGroup', code: G(`var wg sync.WaitGroup
results := make([]int, 5)
for i := 0; i < 5; i++ {
	wg.Add(1)
	go func(n int) {
		defer wg.Done()
		results[n] = n * 10
	}(i)
}
wg.Wait()
fmt.Println(results)`, ['fmt', 'sync']), note: L('Кожна горутина пише у свою клітинку — порядок не важливий.', 'Каждая горутина пишет в свою ячейку — порядок не важен.', 'Each goroutine writes its own slot — order doesn’t matter.') },
        { title: 'close + range', code: G(`ch := make(chan int)
go func() {
	for i := 1; i <= 3; i++ {
		ch <- i * i
	}
	close(ch)
}()
for v := range ch {
	fmt.Println("got", v)
}
fmt.Println("channel closed")`), note: L('Одна горутина пише — порядок збережено.', 'Одна горутина пишет — порядок сохранён.', 'One writer — order is preserved.') }
      ],
      task: {
        text: L('Запусти 5 горутин — для n від 1 до 5 кожна надсилає в канал <code>n * n</code>. У main прийми 5 значень і виведи <code>Workers: 5</code> та <code>Sum of squares: 55</code>.', 'Запусти 5 горутин — для n от 1 до 5 каждая отправляет в канал <code>n * n</code>. В main прими 5 значений и выведи <code>Workers: 5</code> и <code>Sum of squares: 55</code>.', 'Start 5 goroutines — for n from 1 to 5, each sends <code>n * n</code> into a channel. In main receive 5 values and print <code>Workers: 5</code> and <code>Sum of squares: 55</code>.'),
        how: [L('<code>ch := make(chan int)</code>; у циклі <code>go func(n int) { ch &lt;- n * n }(i)</code>.', '<code>ch := make(chan int)</code>; в цикле <code>go func(n int) { ch &lt;- n * n }(i)</code>.', '<code>ch := make(chan int)</code>; in a loop <code>go func(n int) { ch &lt;- n * n }(i)</code>.'), L('Потім 5 разів <code>sum += &lt;-ch</code> — сума не залежить від порядку.', 'Затем 5 раз <code>sum += &lt;-ch</code> — сумма не зависит от порядка.', 'Then 5 times <code>sum += &lt;-ch</code> — the sum ignores order.')],
        starter: G(`workers := 5
fmt.Println("Workers:", workers)`),
        solution: G(`workers := 5
ch := make(chan int)
for i := 1; i <= workers; i++ {
	go func(n int) {
		ch <- n * n
	}(i)
}
sum := 0
for i := 0; i < workers; i++ {
	sum += <-ch
}
fmt.Println("Workers:", workers)
fmt.Println("Sum of squares:", sum)`),
        hint: L('1 + 4 + 9 + 16 + 25 = 55.', '1 + 4 + 9 + 16 + 25 = 55.', '1 + 4 + 9 + 16 + 25 = 55.'),
        expected: 'Workers: 5\nSum of squares: 55',
        must: /go\s+func[\s\S]*chan/
      },
      quiz: { q: L('Що робить <code>v := &lt;-ch</code>?', 'Что делает <code>v := &lt;-ch</code>?', 'What does <code>v := &lt;-ch</code> do?'), options: [L('надсилає v у канал', 'отправляет v в канал', 'sends v'), L('отримує значення з каналу', 'получает значение из канала', 'receives a value from the channel'), L('закриває канал', 'закрывает канал', 'closes the channel')], answer: 1, explain: L('Стрілка «витягує» значення з каналу.', 'Стрелка «вытягивает» значение из канала.', 'The arrow pulls a value out.') },
      ref: [{ code: 'go f()', d: L('запустити горутину', 'запустить горутину', 'start a goroutine') }, { code: 'ch := make(chan int); ch <- 1; v := <-ch', d: L('канали', 'каналы', 'channels') }, { code: 'sync.WaitGroup', d: L('дочекатися групи', 'дождаться группы', 'wait for a group') }]
    },
    {
      id: 'project-todo', chapter: CH5, project: true,
      title: L('Проєкт: менеджер завдань', 'Проект: менеджер задач', 'Project: task manager'),
      theory: L(
        `<p>Створимо консольний менеджер завдань, що читає команди зі stdin — так працюють справжні утиліти командного рядка:</p>
<ol><li><code>type Task struct { Title string; Done bool }</code> і зріз <code>[]Task</code></li><li>Читання рядків через <code>bufio.Scanner</code></li><li>Розбір команди: <code>strings.SplitN(line, " ", 2)</code> → команда й аргумент</li><li><code>switch</code> по команді: <code>add</code>, <code>done N</code>, <code>remove N</code>, <code>list</code>, <code>stats</code></li><li>Номер перетворюємо через <code>strconv.Atoi</code> і перевіряємо межі</li><li>Видалення зі зрізу: <code>tasks = append(tasks[:i], tasks[i+1:]...)</code></li></ol>`,
        `<p>Создадим консольный менеджер задач, читающий команды из stdin — так работают настоящие утилиты командной строки:</p>
<ol><li><code>type Task struct { Title string; Done bool }</code> и срез <code>[]Task</code></li><li>Чтение строк через <code>bufio.Scanner</code></li><li>Разбор команды: <code>strings.SplitN(line, " ", 2)</code> → команда и аргумент</li><li><code>switch</code> по команде: <code>add</code>, <code>done N</code>, <code>remove N</code>, <code>list</code>, <code>stats</code></li><li>Номер преобразуем через <code>strconv.Atoi</code> и проверяем границы</li><li>Удаление из среза: <code>tasks = append(tasks[:i], tasks[i+1:]...)</code></li></ol>`,
        `<p>Let’s build a console task manager that reads commands from stdin — the way real command-line tools work:</p>
<ol><li><code>type Task struct { Title string; Done bool }</code> and a <code>[]Task</code> slice</li><li>Read lines with <code>bufio.Scanner</code></li><li>Parse a command: <code>strings.SplitN(line, " ", 2)</code> → command and argument</li><li><code>switch</code> on the command: <code>add</code>, <code>done N</code>, <code>remove N</code>, <code>list</code>, <code>stats</code></li><li>Convert the number with <code>strconv.Atoi</code> and check bounds</li><li>Delete from a slice: <code>tasks = append(tasks[:i], tasks[i+1:]...)</code></li></ol>`),
      why: L(`<p>Чому окрема функція для пошуку завдання за номером? Користувач рахує з 1, а зріз — з 0, і номер може бути неправильним. Одна функція <code>getIndex</code>, що повертає <code>(int, error)</code>, обробляє це для всіх команд — і помилку в розрахунку індексу неможливо зробити в одному місці й забути виправити в іншому.</p>`,
        `<p>Почему отдельная функция для поиска задачи по номеру? Пользователь считает с 1, а срез — с 0, и номер может быть неправильным. Одна функция <code>getIndex</code>, возвращающая <code>(int, error)</code>, обрабатывает это для всех команд — и ошибку в расчёте индекса невозможно сделать в одном месте и забыть исправить в другом.</p>`,
        `<p>Why a separate function to find a task by number? Users count from 1, slices from 0, and the number may be invalid. One <code>getIndex</code> returning <code>(int, error)</code> handles that for every command — so an indexing bug can’t be fixed in one place and forgotten in another.</p>`),
      mistakes: L(`<ul><li>Забути відняти 1 від номера — <code>done 2</code> позначить третє завдання.</li><li><code>done 9</code> без перевірки меж — паніка <code>index out of range</code>.</li><li>Змінювати копію в <code>for _, t := range tasks { t.Done = true }</code> — оригінал не зміниться; пиши <code>tasks[i].Done = true</code>.</li></ul>`,
        `<ul><li>Забыть вычесть 1 из номера — <code>done 2</code> отметит третью задачу.</li><li><code>done 9</code> без проверки границ — паника <code>index out of range</code>.</li><li>Менять копию в <code>for _, t := range tasks { t.Done = true }</code> — оригинал не изменится; пиши <code>tasks[i].Done = true</code>.</li></ul>`,
        `<ul><li>Forgetting to subtract 1 — <code>done 2</code> marks the third task.</li><li><code>done 9</code> without a bounds check panics with <code>index out of range</code>.</li><li>Changing a copy in <code>for _, t := range tasks { t.Done = true }</code> — the original stays; write <code>tasks[i].Done = true</code>.</li></ul>`),
      examples: [
        { title: 'SplitN', code: G(`for _, line := range []string{"add Buy milk", "done 2", "list"} {
	parts := strings.SplitN(line, " ", 2)
	arg := ""
	if len(parts) > 1 {
		arg = parts[1]
	}
	fmt.Printf("cmd=%q arg=%q\\n", parts[0], arg)
}`, ['fmt', 'strings']), note: L('<code>%q</code> друкує рядок у лапках.', '<code>%q</code> печатает строку в кавычках.', '<code>%q</code> prints a quoted string.') },
        { title: L('Видалення зі зрізу', 'Удаление из среза', 'Deleting from a slice'), code: G(`items := []string{"a", "b", "c", "d"}
i := 1
items = append(items[:i], items[i+1:]...)
fmt.Println(items, len(items))`), note: L('Склеюємо частину до i і після i.', 'Склеиваем часть до i и после i.', 'Join the parts before and after i.') },
        { title: L('Чекбокси', 'Чекбоксы', 'Checkboxes'), code: G(`tasks := []Task{{"Read", true}, {"Code", false}}
for i, t := range tasks {
	mark := " "
	if t.Done {
		mark = "x"
	}
	fmt.Printf("%d. [%s] %s\\n", i+1, mark, t.Title)
}`, ['fmt'], `type Task struct {
	Title string
	Done  bool
}`), note: L('Номер для людини — i + 1.', 'Номер для человека — i + 1.', 'The human number is i + 1.') }
      ],
      task: {
        text: L(`Напиши менеджер завдань. Команди зі stdin (уже задано): <code>add ТЕКСТ</code> → <code>Added: ТЕКСТ</code>; <code>done N</code> → <code>Done: ТЕКСТ</code>; <code>remove N</code> → <code>Removed: ТЕКСТ</code>; неправильний номер → <code>No task N</code>; <code>list</code> → рядки <code>1. [ ] Buy milk</code> / <code>2. [x] Learn Go</code>; <code>stats</code> → <code>Done 1 of 2</code>.`,
          `Напиши менеджер задач. Команды из stdin (уже заданы): <code>add ТЕКСТ</code> → <code>Added: ТЕКСТ</code>; <code>done N</code> → <code>Done: ТЕКСТ</code>; <code>remove N</code> → <code>Removed: ТЕКСТ</code>; неверный номер → <code>No task N</code>; <code>list</code> → строки <code>1. [ ] Buy milk</code> / <code>2. [x] Learn Go</code>; <code>stats</code> → <code>Done 1 of 2</code>.`,
          `Write a task manager. Commands from stdin (preset): <code>add TEXT</code> → <code>Added: TEXT</code>; <code>done N</code> → <code>Done: TEXT</code>; <code>remove N</code> → <code>Removed: TEXT</code>; a bad number → <code>No task N</code>; <code>list</code> → lines <code>1. [ ] Buy milk</code> / <code>2. [x] Learn Go</code>; <code>stats</code> → <code>Done 1 of 2</code>.`),
        how: [L('Допоміжна функція: <code>func index(arg string, n int) (int, bool)</code> — перетворює номер і перевіряє межі.', 'Вспомогательная функция: <code>func index(arg string, n int) (int, bool)</code> — преобразует номер и проверяет границы.', 'Helper: <code>func index(arg string, n int) (int, bool)</code> converts the number and checks bounds.'), L('Головний цикл: <code>for sc.Scan() { parts := strings.SplitN(sc.Text(), " ", 2); switch parts[0] { … } }</code>', 'Главный цикл: <code>for sc.Scan() { parts := strings.SplitN(sc.Text(), " ", 2); switch parts[0] { … } }</code>', 'Main loop: <code>for sc.Scan() { parts := strings.SplitN(sc.Text(), " ", 2); switch parts[0] { … } }</code>')],
        starter: G(`sc := bufio.NewScanner(os.Stdin)
tasks := []Task{}
for sc.Scan() {
	line := sc.Text()
	fmt.Println(line, len(tasks))
}`, ['bufio', 'fmt', 'os'], `type Task struct {
	Title string
	Done  bool
}`),
        solution: G(`sc := bufio.NewScanner(os.Stdin)
tasks := []Task{}
for sc.Scan() {
	parts := strings.SplitN(sc.Text(), " ", 2)
	arg := ""
	if len(parts) > 1 {
		arg = parts[1]
	}
	switch parts[0] {
	case "add":
		tasks = append(tasks, Task{Title: arg})
		fmt.Println("Added:", arg)
	case "done":
		if i, ok := index(arg, len(tasks)); ok {
			tasks[i].Done = true
			fmt.Println("Done:", tasks[i].Title)
		} else {
			fmt.Println("No task", arg)
		}
	case "remove":
		if i, ok := index(arg, len(tasks)); ok {
			fmt.Println("Removed:", tasks[i].Title)
			tasks = append(tasks[:i], tasks[i+1:]...)
		} else {
			fmt.Println("No task", arg)
		}
	case "list":
		for i, t := range tasks {
			mark := " "
			if t.Done {
				mark = "x"
			}
			fmt.Printf("%d. [%s] %s\\n", i+1, mark, t.Title)
		}
	case "stats":
		done := 0
		for _, t := range tasks {
			if t.Done {
				done++
			}
		}
		fmt.Printf("Done %d of %d\\n", done, len(tasks))
	}
}`, ['bufio', 'fmt', 'os', 'strconv', 'strings'], `type Task struct {
	Title string
	Done  bool
}

func index(arg string, n int) (int, bool) {
	num, err := strconv.Atoi(arg)
	if err != nil || num < 1 || num > n {
		return 0, false
	}
	return num - 1, true
}`),
        stdin: 'add Buy milk\nadd Learn Go\nadd Walk the dog\ndone 2\nlist\ndone 9\nremove 1\nlist\nstats',
        hint: L('Після <code>remove 1</code> нумерація зсувається: Learn Go стає №1.', 'После <code>remove 1</code> нумерация сдвигается: Learn Go становится №1.', 'After <code>remove 1</code> numbering shifts: Learn Go becomes #1.'),
        expected: 'Added: Buy milk\nAdded: Learn Go\nAdded: Walk the dog\nDone: Learn Go\n1. [ ] Buy milk\n2. [x] Learn Go\n3. [ ] Walk the dog\nNo task 9\nRemoved: Buy milk\n1. [x] Learn Go\n2. [ ] Walk the dog\nDone 1 of 2',
        must: /bufio[\s\S]*switch/
      },
      quiz: { q: L('Як видалити елемент i зі зрізу s?', 'Как удалить элемент i из среза s?', 'How do you delete element i from slice s?'), options: ['delete(s, i)', 's = append(s[:i], s[i+1:]...)', 's.remove(i)'], answer: 1, explain: L('delete — лише для мап.', 'delete — только для мап.', 'delete is for maps only.') },
      ref: [{ code: 'strings.SplitN(s, " ", 2)', d: L('розбити на 2 частини', 'разбить на 2 части', 'split into 2 parts') }, { code: 's = append(s[:i], s[i+1:]...)', d: L('видалити зі зрізу', 'удалить из среза', 'delete from slice') }]
    },
    {
      id: 'project-leaderboard', chapter: CH5, project: true,
      title: L('Проєкт: таблиця лідерів', 'Проект: таблица лидеров', 'Project: leaderboard'),
      theory: L(
        `<p>Фінальний проєкт — обробка результатів ігор, як на сервері справжньої гри:</p>
<ol><li>Читаємо рядки <code>ім’я очки</code> (кожен рядок — одна гра) через <code>fmt.Scan</code> у циклі</li><li>Накопичуємо статистику в <code>map[string]*Stats</code>: сума, кількість ігор, найкраща гра</li><li>Перетворюємо мапу на зріз і сортуємо через <code>sort.Slice</code> з функцією порівняння: спершу за сумою (спадання), при рівності — за ім’ям</li><li>Виводимо таблицю й рекорд однієї гри</li></ol>
<pre class="inline-code">sort.Slice(list, func(i, j int) bool {
	return list[i].Total &gt; list[j].Total
})</pre>`,
        `<p>Финальный проект — обработка результатов игр, как на сервере настоящей игры:</p>
<ol><li>Читаем строки <code>имя очки</code> (каждая строка — одна игра) через <code>fmt.Scan</code> в цикле</li><li>Накапливаем статистику в <code>map[string]*Stats</code>: сумма, количество игр, лучшая игра</li><li>Превращаем мапу в срез и сортируем через <code>sort.Slice</code> с функцией сравнения: сначала по сумме (убывание), при равенстве — по имени</li><li>Выводим таблицу и рекорд одной игры</li></ol>
<pre class="inline-code">sort.Slice(list, func(i, j int) bool {
	return list[i].Total &gt; list[j].Total
})</pre>`,
        `<p>The final project processes game results, like a real game server:</p>
<ol><li>Read lines <code>name score</code> (each line is one game) with <code>fmt.Scan</code> in a loop</li><li>Accumulate stats in a <code>map[string]*Stats</code>: total, games played, best game</li><li>Turn the map into a slice and sort with <code>sort.Slice</code> and a comparison function: by total (descending), ties by name</li><li>Print the table and the single-game record</li></ol>
<pre class="inline-code">sort.Slice(list, func(i, j int) bool {
	return list[i].Total &gt; list[j].Total
})</pre>`),
      why: L(`<p>Чому мапа зберігає <b>вказівники</b> <code>*Stats</code>? Значення в мапі не можна змінювати по полях: <code>m["kira"].Total += 5</code> — помилка компіляції. З вказівником ми змінюємо саму структуру, на яку він вказує. А сортування з правилом «при рівності — за ім’ям» робить результат стабільним, щоб таблиця не «стрибала» між запусками.</p>`,
        `<p>Почему мапа хранит <b>указатели</b> <code>*Stats</code>? Значения в мапе нельзя изменять по полям: <code>m["kira"].Total += 5</code> — ошибка компиляции. С указателем мы меняем саму структуру, на которую он указывает. А сортировка с правилом «при равенстве — по имени» делает результат стабильным, чтобы таблица не «прыгала» между запусками.</p>`,
        `<p>Why does the map store <b>pointers</b> <code>*Stats</code>? You can’t modify a map value’s fields: <code>m["kira"].Total += 5</code> doesn’t compile. With a pointer we change the struct it points to. And sorting with a “ties by name” rule keeps the table stable between runs.</p>`),
      mistakes: L(`<ul><li><code>map[string]Stats</code> і <code>m[name].Total += s</code> — <code>cannot assign to struct field in map</code>.</li><li>Ділення цілих для середнього: <code>total / games</code> — дробова частина зникне (тут це навмисно, бо очки цілі).</li><li>Порівняння в <code>sort.Slice</code> через <code>&gt;=</code> — нестабільний порядок при рівних значеннях.</li></ul>`,
        `<ul><li><code>map[string]Stats</code> и <code>m[name].Total += s</code> — <code>cannot assign to struct field in map</code>.</li><li>Деление целых для среднего: <code>total / games</code> — дробная часть исчезнет (здесь это намеренно, очки целые).</li><li>Сравнение в <code>sort.Slice</code> через <code>&gt;=</code> — нестабильный порядок при равных значениях.</li></ul>`,
        `<ul><li><code>map[string]Stats</code> with <code>m[name].Total += s</code> — <code>cannot assign to struct field in map</code>.</li><li>Integer division for the average: <code>total / games</code> drops the fraction (intended here, scores are integers).</li><li>Using <code>&gt;=</code> in <code>sort.Slice</code> — unstable order for equal values.</li></ul>`),
      examples: [
        { title: 'sort.Slice', code: G(`people := []Person{{"Max", 15}, {"Ira", 13}, {"Kira", 15}}
sort.Slice(people, func(i, j int) bool {
	if people[i].Age != people[j].Age {
		return people[i].Age > people[j].Age
	}
	return people[i].Name < people[j].Name
})
fmt.Println(people)`, ['fmt', 'sort'], `type Person struct {
	Name string
	Age  int
}`), note: L('При рівному віці — за алфавітом.', 'При равном возрасте — по алфавиту.', 'Same age — alphabetical.') },
        { title: L('Мапа вказівників', 'Мапа указателей', 'Map of pointers'), code: G(`stats := map[string]*Stats{}
for _, name := range []string{"kira", "max", "kira"} {
	if stats[name] == nil {
		stats[name] = &Stats{Name: name}
	}
	stats[name].Games++
}
fmt.Println(stats["kira"].Games, stats["max"].Games)`, ['fmt'], `type Stats struct {
	Name  string
	Games int
}`), note: L('Новий запис створюємо, якщо там nil.', 'Новую запись создаём, если там nil.', 'Create an entry when it’s nil.') },
        { title: L('Читання до кінця', 'Чтение до конца', 'Reading to the end'), code: G(`var name string
var score int
for {
	n, _ := fmt.Scan(&name, &score)
	if n < 2 {
		break
	}
	fmt.Println(name, "scored", score)
}`), note: L('Scan повертає кількість прочитаних значень.', 'Scan возвращает количество прочитанных значений.', 'Scan returns how many values it read.') }
      ],
      task: {
        text: L(`Зчитуй рядки <code>ім’я очки</code> до кінця вводу (уже задано). Для кожного гравця порахуй суму, кількість ігор і середнє (ціле). Виведи таблицю за спаданням суми: <code>1. max 350 (2 games, avg 175)</code>, а потім <code>Best game: max 300</code>.`,
          `Считывай строки <code>имя очки</code> до конца ввода (уже задано). Для каждого игрока посчитай сумму, количество игр и среднее (целое). Выведи таблицу по убыванию суммы: <code>1. max 350 (2 games, avg 175)</code>, а затем <code>Best game: max 300</code>.`,
          `Read <code>name score</code> lines until input ends (preset). For each player compute the total, games played and the (integer) average. Print the table by descending total: <code>1. max 350 (2 games, avg 175)</code>, then <code>Best game: max 300</code>.`),
        how: [L('<code>type Stats struct { Name string; Total, Games int }</code> і <code>map[string]*Stats</code>.', '<code>type Stats struct { Name string; Total, Games int }</code> и <code>map[string]*Stats</code>.', '<code>type Stats struct { Name string; Total, Games int }</code> and <code>map[string]*Stats</code>.'), L('Рекорд гри зберігай окремо: <code>bestName</code>, <code>bestScore</code>.', 'Рекорд игры храни отдельно: <code>bestName</code>, <code>bestScore</code>.', 'Track the game record separately: <code>bestName</code>, <code>bestScore</code>.'), L('Після сортування: <code>fmt.Printf("%d. %s %d (%d games, avg %d)\\n", …)</code>', 'После сортировки: <code>fmt.Printf("%d. %s %d (%d games, avg %d)\\n", …)</code>', 'After sorting: <code>fmt.Printf("%d. %s %d (%d games, avg %d)\\n", …)</code>')],
        starter: G(`var name string
var score int
for {
	n, _ := fmt.Scan(&name, &score)
	if n < 2 {
		break
	}
	fmt.Println(name, score)
}`, ['fmt'], `type Stats struct {
	Name  string
	Total int
	Games int
}`),
        solution: G(`stats := map[string]*Stats{}
bestName, bestScore := "", -1
var name string
var score int
for {
	n, _ := fmt.Scan(&name, &score)
	if n < 2 {
		break
	}
	if stats[name] == nil {
		stats[name] = &Stats{Name: name}
	}
	stats[name].Total += score
	stats[name].Games++
	if score > bestScore {
		bestName, bestScore = name, score
	}
}
list := []*Stats{}
for _, s := range stats {
	list = append(list, s)
}
sort.Slice(list, func(i, j int) bool {
	if list[i].Total != list[j].Total {
		return list[i].Total > list[j].Total
	}
	return list[i].Name < list[j].Name
})
for i, s := range list {
	fmt.Printf("%d. %s %d (%d games, avg %d)\\n", i+1, s.Name, s.Total, s.Games, s.Total/s.Games)
}
fmt.Printf("Best game: %s %d\\n", bestName, bestScore)`, ['fmt', 'sort'], `type Stats struct {
	Name  string
	Total int
	Games int
}`),
        stdin: 'kira 120\nmax 300\nira 210\nkira 200\nmax 50\nira 90',
        hint: L('Суми: max 350, kira 320, ira 300.', 'Суммы: max 350, kira 320, ira 300.', 'Totals: max 350, kira 320, ira 300.'),
        expected: '1. max 350 (2 games, avg 175)\n2. kira 320 (2 games, avg 160)\n3. ira 300 (2 games, avg 150)\nBest game: max 300',
        must: /sort\.Slice/
      },
      quiz: { q: L('Чому в мапі зберігаються <code>*Stats</code>, а не <code>Stats</code>?', 'Почему в мапе хранятся <code>*Stats</code>, а не <code>Stats</code>?', 'Why does the map hold <code>*Stats</code> rather than <code>Stats</code>?'), options: [L('щоб змінювати поля прямо в мапі', 'чтобы менять поля прямо в мапе', 'to modify fields in place'), L('так швидше друкувати', 'так быстрее печатать', 'faster printing'), L('мапа не приймає структури', 'мапа не принимает структуры', 'maps can’t hold structs')], answer: 0, explain: L('Поле значення в мапі змінити не можна.', 'Поле значения в мапе изменить нельзя.', 'You can’t assign to a field of a map value.') },
      ref: [{ code: 'sort.Slice(s, func(i, j int) bool { … })', d: L('сортування за правилом', 'сортировка по правилу', 'custom sort') }, { code: 'map[string]*T', d: L('мапа вказівників', 'мапа указателей', 'map of pointers') }]
    }
  ]);
})();
