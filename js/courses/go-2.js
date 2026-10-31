// Go — частина 2: рекурсія, замикання й defer/panic, руни й Unicode, вбудовування, узагальнення, сортування й пошук, проєкт «Гра „Життя“».
(function () {
  const L = Codry.L;
  const CH6 = L('Глибше в Go', 'Глубже в Go', 'Deeper into Go');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');
  const IND = (s) => s.split('\n').map((l) => (l ? '\t' + l : l)).join('\n');
  const G = (body, imps, before) => {
    imps = imps || ['fmt'];
    const im = imps.length === 1 ? `import "${imps[0]}"` : 'import (\n' + imps.map((i) => `\t"${i}"`).join('\n') + '\n)';
    return 'package main\n\n' + im + '\n\n' + (before ? before + '\n\n' : '') + 'func main() {\n' + IND(body) + '\n}';
  };

  Codry.steps('go', [
    {
      id: 'recursion', chapter: CH6,
      title: L('Рекурсія', 'Рекурсия', 'Recursion'),
      theory: L(
        `<p><b>Рекурсивна функція</b> викликає сама себе для меншої задачі. Обов’язкові частини — <b>базовий випадок</b> і <b>рекурсивний крок</b>:</p>
<pre class="inline-code">func factorial(n int) int {
	if n &lt;= 1 {
		return 1 // базовий випадок
	}
	return n * factorial(n-1) // крок
}</pre>
<p>У Go немає обмеження на глибину стеку в кілька тисяч, як у деяких мовах: стек горутини росте сам. Але нескінченна рекурсія все одно закінчиться помилкою <code>stack overflow</code>.</p>
<p>Рекурсія зручна для дерев (файли, JSON), перебору варіантів і класичних алгоритмів: НСД, швидке сортування, обхід у глибину.</p>`,
        `<p><b>Рекурсивная функция</b> вызывает сама себя для меньшей задачи. Обязательные части — <b>базовый случай</b> и <b>рекурсивный шаг</b>:</p>
<pre class="inline-code">func factorial(n int) int {
	if n &lt;= 1 {
		return 1 // базовый случай
	}
	return n * factorial(n-1) // шаг
}</pre>
<p>В Go нет ограничения на глубину стека в несколько тысяч, как в некоторых языках: стек горутины растёт сам. Но бесконечная рекурсия всё равно закончится ошибкой <code>stack overflow</code>.</p>
<p>Рекурсия удобна для деревьев (файлы, JSON), перебора вариантов и классических алгоритмов: НОД, быстрая сортировка, обход в глубину.</p>`,
        `<p>A <b>recursive function</b> calls itself on a smaller problem. It needs a <b>base case</b> and a <b>recursive step</b>:</p>
<pre class="inline-code">func factorial(n int) int {
	if n &lt;= 1 {
		return 1 // base case
	}
	return n * factorial(n-1) // step
}</pre>
<p>Go has no small fixed stack limit like some languages: a goroutine’s stack grows by itself. Infinite recursion still ends in <code>stack overflow</code>.</p>
<p>Recursion suits trees (files, JSON), trying all options, and classic algorithms: GCD, quicksort, depth-first search.</p>`),
      why: L(`<p>Багато задач простіше записати рекурсивно, ніж циклом: «рядок — паліндром, якщо крайні літери однакові, а середина — теж паліндром». Код читається як означення, і в ньому важче помилитися з індексами.</p>`,
        `<p>Многие задачи проще записать рекурсивно, чем циклом: «строка — палиндром, если крайние буквы одинаковы, а середина — тоже палиндром». Код читается как определение, и в нём труднее ошибиться с индексами.</p>`,
        `<p>Many problems are simpler recursively than with a loop: “a string is a palindrome if its ends match and the middle is a palindrome too”. The code reads like the definition and is harder to get wrong with indexes.</p>`),
      mistakes: L(`<ul><li>Немає базового випадку — <code>goroutine stack exceeds 1000000000-byte limit</code>.</li><li>Рекурсивний Фібоначчі без запам’ятовування для n = 50 рахується хвилинами.</li><li>Для рядків з кирилицею індекс <code>s[i]</code> дає <b>байт</b>, а не літеру — перетвори на <code>[]rune</code>.</li></ul>`,
        `<ul><li>Нет базового случая — <code>goroutine stack exceeds 1000000000-byte limit</code>.</li><li>Рекурсивный Фибоначчи без запоминания для n = 50 считается минутами.</li><li>Для строк с кириллицей индекс <code>s[i]</code> даёт <b>байт</b>, а не букву — преобразуй в <code>[]rune</code>.</li></ul>`,
        `<ul><li>No base case — <code>goroutine stack exceeds 1000000000-byte limit</code>.</li><li>Recursive Fibonacci without memoisation takes minutes for n = 50.</li><li>For non-Latin strings <code>s[i]</code> is a <b>byte</b>, not a letter — convert to <code>[]rune</code>.</li></ul>`),
      examples: [
        { title: L('Факторіал і степінь', 'Факториал и степень', 'Factorial and power'), code: G(`fmt.Println(factorial(10))
fmt.Println(power(3, 5))`, ['fmt'], `func factorial(n int) int {
	if n <= 1 {
		return 1
	}
	return n * factorial(n-1)
}

func power(b, e int) int {
	if e == 0 {
		return 1
	}
	return b * power(b, e-1)
}`), note: L('Кожен виклик чекає на менший.', 'Каждый вызов ждёт меньший.', 'Each call waits for the smaller one.') },
        { title: L('Сума вкладених зрізів', 'Сумма вложенных срезов', 'Sum of nested slices'), code: G(`data := []any{1, 2, []any{3, 4, []any{5}}, 6}
fmt.Println(deepSum(data))`, ['fmt'], `func deepSum(items []any) int {
	total := 0
	for _, x := range items {
		switch v := x.(type) {
		case int:
			total += v
		case []any:
			total += deepSum(v)
		}
	}
	return total
}`), note: L('<code>x.(type)</code> — перевірка типу значення.', '<code>x.(type)</code> — проверка типа значения.', '<code>x.(type)</code> checks the value’s type.') },
        { title: L('Фібоначчі з пам’яттю', 'Фибоначчи с памятью', 'Memoised Fibonacci'), code: G(`memo := map[int]int{}
fmt.Println(fib(50, memo))
fmt.Println(fib(90, memo))`, ['fmt'], `func fib(n int, memo map[int]int) int {
	if n < 2 {
		return n
	}
	if v, ok := memo[n]; ok {
		return v
	}
	memo[n] = fib(n-1, memo) + fib(n-2, memo)
	return memo[n]
}`), note: L('Готові відповіді беремо з мапи.', 'Готовые ответы берём из мапы.', 'Ready answers come from the map.') }
      ],
      task: {
        text: L('Напиши рекурсивні <code>func isPalindrome(s string) bool</code> і <code>func gcd(a, b int) int</code> (алгоритм Евкліда). Виведи <code>isPalindrome("level")</code>, <code>isPalindrome("gopher")</code> і <code>gcd(84, 36)</code>.', 'Напиши рекурсивные <code>func isPalindrome(s string) bool</code> и <code>func gcd(a, b int) int</code> (алгоритм Евклида). Выведи <code>isPalindrome("level")</code>, <code>isPalindrome("gopher")</code> и <code>gcd(84, 36)</code>.', 'Write recursive <code>func isPalindrome(s string) bool</code> and <code>func gcd(a, b int) int</code> (Euclid). Print <code>isPalindrome("level")</code>, <code>isPalindrome("gopher")</code> and <code>gcd(84, 36)</code>.'),
        how: [L('isPalindrome: якщо довжина &lt; 2 — true; якщо <code>s[0] != s[len(s)-1]</code> — false; інакше <code>isPalindrome(s[1 : len(s)-1])</code>.', 'isPalindrome: если длина &lt; 2 — true; если <code>s[0] != s[len(s)-1]</code> — false; иначе <code>isPalindrome(s[1 : len(s)-1])</code>.', 'isPalindrome: length &lt; 2 → true; <code>s[0] != s[len(s)-1]</code> → false; else <code>isPalindrome(s[1 : len(s)-1])</code>.'), L('gcd: <code>if b == 0 { return a }</code>, інакше <code>gcd(b, a%b)</code>.', 'gcd: <code>if b == 0 { return a }</code>, иначе <code>gcd(b, a%b)</code>.', 'gcd: <code>if b == 0 { return a }</code>, else <code>gcd(b, a%b)</code>.')],
        starter: G('fmt.Println("?")', ['fmt'], '// isPalindrome і gcd'),
        solution: G(`fmt.Println(isPalindrome("level"))
fmt.Println(isPalindrome("gopher"))
fmt.Println(gcd(84, 36))`, ['fmt'], `func isPalindrome(s string) bool {
	if len(s) < 2 {
		return true
	}
	if s[0] != s[len(s)-1] {
		return false
	}
	return isPalindrome(s[1 : len(s)-1])
}

func gcd(a, b int) int {
	if b == 0 {
		return a
	}
	return gcd(b, a%b)
}`),
        hint: L('Очікувано: <code>true</code>, <code>false</code>, <code>12</code>.', 'Ожидается: <code>true</code>, <code>false</code>, <code>12</code>.', 'Expected: <code>true</code>, <code>false</code>, <code>12</code>.'),
        expected: 'true\nfalse\n12',
        must: /isPalindrome\s*\(\s*s\s*\[[\s\S]*gcd\s*\(\s*b\s*,/
      },
      quiz: { q: L('Що повертає <code>gcd(a, 0)</code>?', 'Что возвращает <code>gcd(a, 0)</code>?', 'What does <code>gcd(a, 0)</code> return?'), options: ['0', 'a', '1'], answer: 1, explain: L('Це базовий випадок алгоритму Евкліда.', 'Это базовый случай алгоритма Евклида.', 'It’s Euclid’s base case.') },
      ref: [{ code: 'func f(n int) int { if base { return … }; return … f(n-1) }', d: L('шаблон рекурсії', 'шаблон рекурсии', 'recursion pattern') }]
    },
    {
      id: 'closures-defer', chapter: CH6,
      title: L('Замикання, defer, panic і recover', 'Замыкания, defer, panic и recover', 'Closures, defer, panic and recover'),
      theory: L(
        `<p><b>Замикання</b> — функція, що «пам’ятає» змінні, які були поруч, коли її створили:</p>
<pre class="inline-code">func counter() func() int {
	n := 0
	return func() int { n++; return n }
}
next := counter()
next(); next() // 1, 2 — n живе між викликами</pre>
<p><b>defer</b> відкладає виклик до моменту виходу з функції. Кілька defer виконуються у <b>зворотному</b> порядку (як стопка). Ним закривають файли й відпускають ресурси: <code>defer f.Close()</code>.</p>
<p><b>panic</b> — аварійна зупинка (вихід за межі зрізу, ділення на нуль). <b>recover</b> усередині відкладеної функції «ловить» паніку й дає програмі жити далі:</p>
<pre class="inline-code">defer func() {
	if r := recover(); r != nil {
		fmt.Println("recovered:", r)
	}
}()</pre>`,
        `<p><b>Замыкание</b> — функция, которая «помнит» переменные, бывшие рядом, когда её создали:</p>
<pre class="inline-code">func counter() func() int {
	n := 0
	return func() int { n++; return n }
}
next := counter()
next(); next() // 1, 2 — n живёт между вызовами</pre>
<p><b>defer</b> откладывает вызов до момента выхода из функции. Несколько defer выполняются в <b>обратном</b> порядке (как стопка). Им закрывают файлы и освобождают ресурсы: <code>defer f.Close()</code>.</p>
<p><b>panic</b> — аварийная остановка (выход за границы среза, деление на ноль). <b>recover</b> внутри отложенной функции «ловит» панику и даёт программе жить дальше:</p>
<pre class="inline-code">defer func() {
	if r := recover(); r != nil {
		fmt.Println("recovered:", r)
	}
}()</pre>`,
        `<p>A <b>closure</b> is a function that “remembers” the variables around it when it was created:</p>
<pre class="inline-code">func counter() func() int {
	n := 0
	return func() int { n++; return n }
}
next := counter()
next(); next() // 1, 2 — n survives between calls</pre>
<p><b>defer</b> postpones a call until the function exits. Several defers run in <b>reverse</b> order (like a stack). It closes files and frees resources: <code>defer f.Close()</code>.</p>
<p><b>panic</b> is an emergency stop (slice out of range, division by zero). <b>recover</b> inside a deferred function “catches” the panic so the program can continue:</p>
<pre class="inline-code">defer func() {
	if r := recover(); r != nil {
		fmt.Println("recovered:", r)
	}
}()</pre>`),
      why: L(`<p>Замикання дають функціям власну «пам’ять» без глобальних змінних — так роблять генератори ID, лічильники й обробники подій. <code>defer</code> гарантує прибирання навіть при ранньому <code>return</code> чи помилці — ресурси не «протікають». А <code>recover</code> рятує сервер: одна зламана задача не повинна вимикати весь сайт.</p>`,
        `<p>Замыкания дают функциям собственную «память» без глобальных переменных — так делают генераторы ID, счётчики и обработчики событий. <code>defer</code> гарантирует уборку даже при раннем <code>return</code> или ошибке — ресурсы не «утекают». А <code>recover</code> спасает сервер: одна сломанная задача не должна выключать весь сайт.</p>`,
        `<p>Closures give functions their own “memory” without globals — ID generators, counters and event handlers use them. <code>defer</code> guarantees cleanup even on early <code>return</code> or errors — nothing leaks. And <code>recover</code> saves a server: one broken task shouldn’t take down the whole site.</p>`),
      mistakes: L(`<ul><li><code>recover()</code> поза відкладеною функцією завжди повертає <code>nil</code>.</li><li>Аргументи defer обчислюються <b>одразу</b>: <code>defer fmt.Println(i)</code> запам’ятає поточне i.</li><li>Використовувати panic замість звичайних помилок <code>error</code> — у Go так не прийнято.</li></ul>`,
        `<ul><li><code>recover()</code> вне отложенной функции всегда возвращает <code>nil</code>.</li><li>Аргументы defer вычисляются <b>сразу</b>: <code>defer fmt.Println(i)</code> запомнит текущее i.</li><li>Использовать panic вместо обычных ошибок <code>error</code> — в Go так не принято.</li></ul>`,
        `<ul><li><code>recover()</code> outside a deferred function always returns <code>nil</code>.</li><li>defer arguments are evaluated <b>immediately</b>: <code>defer fmt.Println(i)</code> captures the current i.</li><li>Using panic instead of ordinary <code>error</code> values isn’t idiomatic Go.</li></ul>`),
      examples: [
        { title: L('Генератор ID', 'Генератор ID', 'ID generator'), code: G(`nextID := idGen("player")
fmt.Println(nextID())
fmt.Println(nextID())
other := idGen("enemy")
fmt.Println(other(), nextID())`, ['fmt'], `func idGen(prefix string) func() string {
	n := 0
	return func() string {
		n++
		return fmt.Sprintf("%s-%d", prefix, n)
	}
}`), note: L('У кожного генератора свій n.', 'У каждого генератора свой n.', 'Each generator has its own n.') },
        { title: L('Порядок defer', 'Порядок defer', 'defer order'), code: G(`fmt.Println("open file")
defer fmt.Println("close file")
for i := 1; i <= 3; i++ {
	defer fmt.Println("deferred", i)
}
fmt.Println("work")`), note: L('Останній відкладений виконується першим.', 'Последний отложенный выполняется первым.', 'The last deferred call runs first.') },
        { title: 'panic / recover', code: G(`fmt.Println(safeGet([]int{1, 2, 3}, 1))
fmt.Println(safeGet([]int{1, 2, 3}, 10))
fmt.Println("still running")`, ['fmt'], `func safeGet(xs []int, i int) (v int) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("recovered:", r)
			v = -1
		}
	}()
	return xs[i]
}`), note: L('Іменований результат v можна змінити в defer.', 'Именованный результат v можно изменить в defer.', 'A named result v can be changed in defer.') }
      ],
      task: {
        text: L('1) Напиши <code>func makeAdder(step int) func() int</code>: кожен виклик повертає наступне число, кратне step. Виклич її тричі для step = 5 і виведи <code>5 10 15</code>. 2) Напиши <code>countdown()</code>, яка в циклі відкладає друк чисел 1, 2, 3, потім друкує <code>start</code> (вивід: start, 3, 2, 1). 3) Напиши <code>safeDiv(a, b int) int</code> з recover і виклич <code>safeDiv(10, 0)</code>: має надрукуватися <code>recovered: runtime error: integer divide by zero</code>.', '1) Напиши <code>func makeAdder(step int) func() int</code>: каждый вызов возвращает следующее число, кратное step. Вызови её трижды для step = 5 и выведи <code>5 10 15</code>. 2) Напиши <code>countdown()</code>, которая в цикле откладывает печать чисел 1, 2, 3, затем печатает <code>start</code> (вывод: start, 3, 2, 1). 3) Напиши <code>safeDiv(a, b int) int</code> с recover и вызови <code>safeDiv(10, 0)</code>: должно напечататься <code>recovered: runtime error: integer divide by zero</code>.', '1) Write <code>func makeAdder(step int) func() int</code>: each call returns the next multiple of step. Call it three times for step = 5 and print <code>5 10 15</code>. 2) Write <code>countdown()</code> that defers printing 1, 2, 3 in a loop, then prints <code>start</code> (output: start, 3, 2, 1). 3) Write <code>safeDiv(a, b int) int</code> with recover and call <code>safeDiv(10, 0)</code>: it must print <code>recovered: runtime error: integer divide by zero</code>.'),
        how: [L('Друк в один рядок: <code>fmt.Println(add(), add(), add())</code>.', 'Печать в одну строку: <code>fmt.Println(add(), add(), add())</code>.', 'One line: <code>fmt.Println(add(), add(), add())</code>.'), L('У safeDiv: <code>defer func() { if r := recover(); r != nil { fmt.Println("recovered:", r) } }()</code>, потім <code>return a / b</code>.', 'В safeDiv: <code>defer func() { if r := recover(); r != nil { fmt.Println("recovered:", r) } }()</code>, затем <code>return a / b</code>.', 'In safeDiv: <code>defer func() { if r := recover(); r != nil { fmt.Println("recovered:", r) } }()</code>, then <code>return a / b</code>.')],
        starter: G('fmt.Println("?")', ['fmt'], '// makeAdder, countdown, safeDiv'),
        solution: G(`add := makeAdder(5)
fmt.Println(add(), add(), add())
countdown()
safeDiv(10, 0)`, ['fmt'], `func makeAdder(step int) func() int {
	total := 0
	return func() int {
		total += step
		return total
	}
}

func countdown() {
	for i := 1; i <= 3; i++ {
		defer fmt.Println(i)
	}
	fmt.Println("start")
}

func safeDiv(a, b int) int {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("recovered:", r)
		}
	}()
	return a / b
}`),
        hint: L('Ділення на нуль цілих чисел у Go — це паніка, а не помилка компіляції (якщо b — змінна).', 'Деление на ноль целых чисел в Go — это паника, а не ошибка компиляции (если b — переменная).', 'Integer division by zero in Go is a panic, not a compile error (when b is a variable).'),
        expected: '5 10 15\nstart\n3\n2\n1\nrecovered: runtime error: integer divide by zero',
        must: /func\s+makeAdder[\s\S]*defer[\s\S]*recover\(\)/
      },
      quiz: { q: L('У якому порядку виконаються <code>defer A()</code>, <code>defer B()</code>?', 'В каком порядке выполнятся <code>defer A()</code>, <code>defer B()</code>?', 'In what order do <code>defer A()</code>, <code>defer B()</code> run?'), options: [L('A, потім B', 'A, затем B', 'A then B'), L('B, потім A', 'B, затем A', 'B then A'), L('одночасно', 'одновременно', 'at once')], answer: 1, explain: L('defer — стек: останній першим.', 'defer — стек: последний первым.', 'defer is a stack: last first.') },
      ref: [{ code: 'func gen() func() int { n := 0; return func() int { n++; return n } }', d: L('замикання', 'замыкание', 'closure') }, { code: 'defer f()', d: L('при виході з функції', 'при выходе из функции', 'on function exit') }, { code: 'defer func() { if r := recover(); r != nil { … } }()', d: 'recover' }]
    },
    {
      id: 'runes', chapter: CH6,
      title: L('Руни, Unicode і strings.Builder', 'Руны, Unicode и strings.Builder', 'Runes, Unicode and strings.Builder'),
      theory: L(
        `<p>Рядок у Go — це послідовність <b>байтів</b> у кодуванні UTF-8. Латинська літера займає 1 байт, кирилична — 2, емодзі — 4. Тому:</p>
<pre class="inline-code">s := "Привіт"
len(s)                        // 12 — байти!
utf8.RuneCountInString(s)     // 6 — літери
[]rune(s)[0]                  // 'П'</pre>
<ul><li><b>rune</b> — один символ Unicode (тип <code>int32</code>)</li><li><code>for i, r := range s</code> перебирає саме <b>руни</b> (i — байтова позиція)</li><li><code>[]rune(s)</code> — зріз літер; <code>string(runes)</code> — назад у рядок</li><li>Пакет <code>unicode</code>: <code>IsLetter</code>, <code>IsDigit</code>, <code>IsUpper</code>, <code>ToUpper</code></li></ul>
<p>Для збирання рядка по шматочках використовують <b>strings.Builder</b>: <code>var b strings.Builder; b.WriteString("Go"); b.WriteRune('!'); b.String()</code>.</p>`,
        `<p>Строка в Go — это последовательность <b>байтов</b> в кодировке UTF-8. Латинская буква занимает 1 байт, кириллическая — 2, эмодзи — 4. Поэтому:</p>
<pre class="inline-code">s := "Привет"
len(s)                        // 12 — байты!
utf8.RuneCountInString(s)     // 6 — буквы
[]rune(s)[0]                  // 'П'</pre>
<ul><li><b>rune</b> — один символ Unicode (тип <code>int32</code>)</li><li><code>for i, r := range s</code> перебирает именно <b>руны</b> (i — байтовая позиция)</li><li><code>[]rune(s)</code> — срез букв; <code>string(runes)</code> — обратно в строку</li><li>Пакет <code>unicode</code>: <code>IsLetter</code>, <code>IsDigit</code>, <code>IsUpper</code>, <code>ToUpper</code></li></ul>
<p>Для сборки строки по кусочкам используют <b>strings.Builder</b>: <code>var b strings.Builder; b.WriteString("Go"); b.WriteRune('!'); b.String()</code>.</p>`,
        `<p>A Go string is a sequence of <b>bytes</b> in UTF-8. A Latin letter takes 1 byte, a Cyrillic one 2, an emoji 4. So:</p>
<pre class="inline-code">s := "Привіт"
len(s)                        // 12 — bytes!
utf8.RuneCountInString(s)     // 6 — letters
[]rune(s)[0]                  // 'П'</pre>
<ul><li>A <b>rune</b> is one Unicode character (type <code>int32</code>)</li><li><code>for i, r := range s</code> iterates <b>runes</b> (i is a byte offset)</li><li><code>[]rune(s)</code> gives a slice of letters; <code>string(runes)</code> converts back</li><li>Package <code>unicode</code>: <code>IsLetter</code>, <code>IsDigit</code>, <code>IsUpper</code>, <code>ToUpper</code></li></ul>
<p>To build a string piece by piece use <b>strings.Builder</b>: <code>var b strings.Builder; b.WriteString("Go"); b.WriteRune('!'); b.String()</code>.</p>`),
      why: L(`<p>Codry вивчають українською та російською, тож імена гравців, чати й назви — кирилицею. Якщо розвертати чи обрізати рядок по байтах, літери «ламаються» на знаки питання. Руни гарантують, що програма правильно працює з будь-якою мовою й емодзі.</p>`,
        `<p>Codry изучают на украинском и русском, так что имена игроков, чаты и названия — кириллицей. Если разворачивать или обрезать строку по байтам, буквы «ломаются» на знаки вопроса. Руны гарантируют, что программа правильно работает с любым языком и эмодзи.</p>`,
        `<p>Codry is learnt in Ukrainian and Russian, so player names, chats and titles use Cyrillic. Reversing or cutting a string by bytes breaks letters into garbage. Runes make your program handle any language and emoji correctly.</p>`),
      mistakes: L(`<ul><li><code>len("Привіт")</code> — 12, а не 6.</li><li><code>s[0]</code> для кирилиці — половина літери (байт 208).</li><li>Склеювання <code>+=</code> у великому циклі повільне — використовуй <code>strings.Builder</code>.</li></ul>`,
        `<ul><li><code>len("Привет")</code> — 12, а не 6.</li><li><code>s[0]</code> для кириллицы — половина буквы (байт 208).</li><li>Склейка <code>+=</code> в большом цикле медленная — используй <code>strings.Builder</code>.</li></ul>`,
        `<ul><li><code>len("Привіт")</code> is 12, not 6.</li><li><code>s[0]</code> on Cyrillic is half a letter (byte 208).</li><li><code>+=</code> in a big loop is slow — use <code>strings.Builder</code>.</li></ul>`),
      examples: [
        { title: L('Байти й руни', 'Байты и руны', 'Bytes and runes'), code: G(`s := "Go 🚀 Код"
fmt.Println(len(s), utf8.RuneCountInString(s))
for i, r := range s {
	fmt.Printf("%d:%c ", i, r)
}
fmt.Println()`, ['fmt', 'unicode/utf8']), note: L('Позиції стрибають: емодзі займає 4 байти.', 'Позиции прыгают: эмодзи занимает 4 байта.', 'Offsets jump: the emoji takes 4 bytes.') },
        { title: 'unicode', code: G(`text := "Codry 2026 — Вчимося!"
letters, digits, upper := 0, 0, 0
for _, r := range text {
	if unicode.IsLetter(r) {
		letters++
	}
	if unicode.IsDigit(r) {
		digits++
	}
	if unicode.IsUpper(r) {
		upper++
	}
}
fmt.Println(letters, digits, upper)`, ['fmt', 'unicode']), note: L('Працює й для кирилиці.', 'Работает и для кириллицы.', 'Works for Cyrillic too.') },
        { title: 'strings.Builder', code: G(`var b strings.Builder
for i := 1; i <= 5; i++ {
	if i > 1 {
		b.WriteString(" → ")
	}
	b.WriteString(fmt.Sprint(i))
}
b.WriteRune('✓')
fmt.Println(b.String())`, ['fmt', 'strings']), note: L('Один буфер замість багатьох рядків.', 'Один буфер вместо многих строк.', 'One buffer instead of many strings.') }
      ],
      task: {
        text: L('Напиши <code>func reverse(s string) string</code>, що правильно розвертає рядок з кирилицею (через <code>[]rune</code>). Виведи <code>reverse("Привіт, Go!")</code>, потім через пробіл кількість байтів і літер у <code>"Привіт"</code> (<code>12 6</code>), а потім рядок <code>a-b-c</code>, зібраний через <code>strings.Builder</code> зі зрізу <code>[]string{"a", "b", "c"}</code>.', 'Напиши <code>func reverse(s string) string</code>, которая правильно разворачивает строку с кириллицей (через <code>[]rune</code>). Выведи <code>reverse("Привіт, Go!")</code>, затем через пробел количество байтов и букв в <code>"Привіт"</code> (<code>12 6</code>), а потом строку <code>a-b-c</code>, собранную через <code>strings.Builder</code> из среза <code>[]string{"a", "b", "c"}</code>.', 'Write <code>func reverse(s string) string</code> that reverses Cyrillic text correctly (via <code>[]rune</code>). Print <code>reverse("Привіт, Go!")</code>, then the byte and letter counts of <code>"Привіт"</code> separated by a space (<code>12 6</code>), then <code>a-b-c</code> built with <code>strings.Builder</code> from <code>[]string{"a", "b", "c"}</code>.'),
        how: [L('reverse: <code>r := []rune(s)</code>, міняй місцями <code>r[i], r[j]</code>, поверни <code>string(r)</code>.', 'reverse: <code>r := []rune(s)</code>, меняй местами <code>r[i], r[j]</code>, верни <code>string(r)</code>.', 'reverse: <code>r := []rune(s)</code>, swap <code>r[i], r[j]</code>, return <code>string(r)</code>.'), L('Імпорти: <code>"fmt"</code>, <code>"strings"</code>, <code>"unicode/utf8"</code>.', 'Импорты: <code>"fmt"</code>, <code>"strings"</code>, <code>"unicode/utf8"</code>.', 'Imports: <code>"fmt"</code>, <code>"strings"</code>, <code>"unicode/utf8"</code>.')],
        starter: G('fmt.Println("?")', ['fmt'], '// func reverse(s string) string'),
        solution: G(`fmt.Println(reverse("Привіт, Go!"))
fmt.Println(len("Привіт"), utf8.RuneCountInString("Привіт"))
var b strings.Builder
for i, part := range []string{"a", "b", "c"} {
	if i > 0 {
		b.WriteString("-")
	}
	b.WriteString(part)
}
fmt.Println(b.String())`, ['fmt', 'strings', 'unicode/utf8'], `func reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}`),
        hint: L('Очікувано: <code>!oG ,тівирП</code>, <code>12 6</code>, <code>a-b-c</code>.', 'Ожидается: <code>!oG ,тівирП</code>, <code>12 6</code>, <code>a-b-c</code>.', 'Expected: <code>!oG ,тівирП</code>, <code>12 6</code>, <code>a-b-c</code>.'),
        expected: '!oG ,тівирП\n12 6\na-b-c',
        must: /\[\]rune[\s\S]*strings\.Builder/
      },
      quiz: { q: L('Скільки байтів займає літера «Ж» в UTF-8?', 'Сколько байтов занимает буква «Ж» в UTF-8?', 'How many bytes does “Ж” take in UTF-8?'), options: ['1', '2', '4'], answer: 1, explain: L('Кирилиця — по 2 байти.', 'Кириллица — по 2 байта.', 'Cyrillic letters take 2 bytes.') },
      ref: [{ code: '[]rune(s)  string(r)  utf8.RuneCountInString(s)', d: L('руни', 'руны', 'runes') }, { code: 'var b strings.Builder; b.WriteString(x); b.String()', d: 'Builder' }]
    },
    {
      id: 'embedding', chapter: CH6,
      title: L('Вбудовування структур', 'Встраивание структур', 'Struct embedding'),
      theory: L(
        `<p>У Go немає успадкування класів. Замість нього — <b>вбудовування</b>: одна структура містить іншу <b>без імені поля</b>, і всі поля й методи вбудованої стають доступні напряму:</p>
<pre class="inline-code">type Entity struct {
	Name string
	HP   int
}
func (e *Entity) Damage(n int) { e.HP -= n }

type Player struct {
	Entity        // вбудовано
	Level int
}

p := Player{Entity{"Hero", 100}, 3}
p.Damage(20)       // метод Entity «підтягнувся»
fmt.Println(p.HP)  // 80</pre>
<ul><li>Методи вбудованого типу <b>просуваються</b> (promoted) у зовнішній</li><li>Зовнішній тип може оголосити метод з тим самим ім’ям — він «перекриє» вбудований; до оригіналу можна звернутися <code>p.Entity.Status()</code></li><li>Тип автоматично задовольняє інтерфейс, якщо потрібні методи прийшли через вбудовування</li></ul>`,
        `<p>В Go нет наследования классов. Вместо него — <b>встраивание</b>: одна структура содержит другую <b>без имени поля</b>, и все поля и методы встроенной становятся доступны напрямую:</p>
<pre class="inline-code">type Entity struct {
	Name string
	HP   int
}
func (e *Entity) Damage(n int) { e.HP -= n }

type Player struct {
	Entity        // встроено
	Level int
}

p := Player{Entity{"Hero", 100}, 3}
p.Damage(20)       // метод Entity «подтянулся»
fmt.Println(p.HP)  // 80</pre>
<ul><li>Методы встроенного типа <b>продвигаются</b> (promoted) во внешний</li><li>Внешний тип может объявить метод с тем же именем — он «перекроет» встроенный; к оригиналу можно обратиться <code>p.Entity.Status()</code></li><li>Тип автоматически удовлетворяет интерфейсу, если нужные методы пришли через встраивание</li></ul>`,
        `<p>Go has no class inheritance. Instead it has <b>embedding</b>: one struct contains another <b>without a field name</b>, and the embedded fields and methods become directly accessible:</p>
<pre class="inline-code">type Entity struct {
	Name string
	HP   int
}
func (e *Entity) Damage(n int) { e.HP -= n }

type Player struct {
	Entity        // embedded
	Level int
}

p := Player{Entity{"Hero", 100}, 3}
p.Damage(20)       // Entity’s method is promoted
fmt.Println(p.HP)  // 80</pre>
<ul><li>Methods of the embedded type are <b>promoted</b> to the outer type</li><li>The outer type may declare a method with the same name — it “shadows” the embedded one; reach the original with <code>p.Entity.Status()</code></li><li>A type satisfies an interface automatically when the needed methods arrive via embedding</li></ul>`),
      why: L(`<p>Вбудовування — це <b>композиція</b>: «гравець <i>має</i> здоров’я й ім’я», а не «гравець <i>є</i> сутністю». Так легше комбінувати можливості (<code>Movable</code>, <code>Damageable</code>, <code>Inventory</code>) як конструктор Lego, не будуючи крихких ієрархій класів. Цей підхід використовують і великі ігрові рушії (Entity-Component-System).</p>`,
        `<p>Встраивание — это <b>композиция</b>: «игрок <i>имеет</i> здоровье и имя», а не «игрок <i>является</i> сущностью». Так легче комбинировать возможности (<code>Movable</code>, <code>Damageable</code>, <code>Inventory</code>) как конструктор Lego, не строя хрупких иерархий классов. Этот подход используют и большие игровые движки (Entity-Component-System).</p>`,
        `<p>Embedding is <b>composition</b>: “a player <i>has</i> health and a name”, not “a player <i>is</i> an entity”. Capabilities (<code>Movable</code>, <code>Damageable</code>, <code>Inventory</code>) combine like Lego without fragile class hierarchies. Big game engines use the same idea (Entity-Component-System).</p>`),
      mistakes: L(`<ul><li>Вбудовування — <b>не</b> успадкування: <code>Player</code> не можна передати туди, де чекають <code>Entity</code>; передавай <code>p.Entity</code> або використовуй інтерфейс.</li><li>Метод з отримувачем-вказівником <code>(e *Entity)</code> через значення <code>Player</code> у зрізі інтерфейсів вимагає <code>&amp;Player{…}</code>.</li><li>Два вбудовані типи з однаковим методом — неоднозначність, яку компілятор не пропустить.</li></ul>`,
        `<ul><li>Встраивание — <b>не</b> наследование: <code>Player</code> нельзя передать туда, где ждут <code>Entity</code>; передавай <code>p.Entity</code> или используй интерфейс.</li><li>Метод с получателем-указателем <code>(e *Entity)</code> через значение <code>Player</code> в срезе интерфейсов требует <code>&amp;Player{…}</code>.</li><li>Два встроенных типа с одинаковым методом — неоднозначность, которую компилятор не пропустит.</li></ul>`,
        `<ul><li>Embedding is <b>not</b> inheritance: a <code>Player</code> can’t go where an <code>Entity</code> is expected; pass <code>p.Entity</code> or use an interface.</li><li>A pointer-receiver method <code>(e *Entity)</code> used through an interface needs <code>&amp;Player{…}</code>.</li><li>Two embedded types with the same method create an ambiguity the compiler rejects.</li></ul>`),
      examples: [
        { title: L('Просування методів', 'Продвижение методов', 'Promoted methods'), code: G(`p := Player{Entity: Entity{Name: "Hero", HP: 100}, Level: 3}
p.Damage(25)
fmt.Println(p.Name, p.HP, p.Level)
fmt.Println(p.Entity.HP == p.HP)`, ['fmt'], `type Entity struct {
	Name string
	HP   int
}

func (e *Entity) Damage(n int) { e.HP -= n }

type Player struct {
	Entity
	Level int
}`), note: L('p.HP і p.Entity.HP — те саме поле.', 'p.HP и p.Entity.HP — одно и то же поле.', 'p.HP and p.Entity.HP are the same field.') },
        { title: L('Перекриття методу', 'Перекрытие метода', 'Shadowing a method'), code: G(`b := Boss{Base{"Dragon"}, 3}
fmt.Println(b.Describe())
fmt.Println(b.Base.Describe())`, ['fmt'], `type Base struct{ Name string }

func (b Base) Describe() string { return "I am " + b.Name }

type Boss struct {
	Base
	Phase int
}

func (b Boss) Describe() string { return fmt.Sprintf("BOSS %s (phase %d)", b.Name, b.Phase) }`), note: L('Зовнішній метод перекриває вбудований.', 'Внешний метод перекрывает встроенный.', 'The outer method shadows the embedded one.') },
        { title: L('Інтерфейс через вбудовування', 'Интерфейс через встраивание', 'Interface via embedding'), code: G(`things := []Named{Dog{Animal{"Rex"}}, Cat{Animal{"Murka"}}}
for _, t := range things {
	fmt.Println(t.GetName())
}`, ['fmt'], `type Named interface{ GetName() string }

type Animal struct{ Name string }

func (a Animal) GetName() string { return a.Name }

type Dog struct{ Animal }
type Cat struct{ Animal }`), note: L('Dog і Cat отримали GetName від Animal.', 'Dog и Cat получили GetName от Animal.', 'Dog and Cat got GetName from Animal.') }
      ],
      task: {
        text: L(`Опиши <code>Entity{Name string; HP int}</code> з методами <code>(e *Entity) Damage(n int)</code> (HP не нижче 0) і <code>(e Entity) Status() string</code> → <code>Slime: 0 hp</code>. Далі <code>Player{Entity; Level int}</code> зі своїм <code>Status()</code> → <code>Hero: 80 hp, level 3</code>, і <code>Monster{Entity}</code> без власного Status. Створи <code>hero</code> (100 hp, рівень 3) і <code>slime</code> (15 hp), нанеси по 20 шкоди обом і виведи їхні статуси.`,
          `Опиши <code>Entity{Name string; HP int}</code> с методами <code>(e *Entity) Damage(n int)</code> (HP не ниже 0) и <code>(e Entity) Status() string</code> → <code>Slime: 0 hp</code>. Далее <code>Player{Entity; Level int}</code> со своим <code>Status()</code> → <code>Hero: 80 hp, level 3</code>, и <code>Monster{Entity}</code> без собственного Status. Создай <code>hero</code> (100 hp, уровень 3) и <code>slime</code> (15 hp), нанеси по 20 урона обоим и выведи их статусы.`,
          `Define <code>Entity{Name string; HP int}</code> with <code>(e *Entity) Damage(n int)</code> (HP not below 0) and <code>(e Entity) Status() string</code> → <code>Slime: 0 hp</code>. Then <code>Player{Entity; Level int}</code> with its own <code>Status()</code> → <code>Hero: 80 hp, level 3</code>, and <code>Monster{Entity}</code> without its own Status. Make <code>hero</code> (100 hp, level 3) and <code>slime</code> (15 hp), deal 20 damage to both and print their statuses.`),
        how: [L('Player.Status може використати вбудований: <code>return p.Entity.Status() + fmt.Sprintf(", level %d", p.Level)</code>.', 'Player.Status может использовать встроенный: <code>return p.Entity.Status() + fmt.Sprintf(", level %d", p.Level)</code>.', 'Player.Status can reuse the embedded one: <code>return p.Entity.Status() + fmt.Sprintf(", level %d", p.Level)</code>.')],
        starter: G('fmt.Println("?")', ['fmt'], `type Entity struct {
	Name string
	HP   int
}

// Damage, Status, Player, Monster`),
        solution: G(`hero := Player{Entity{"Hero", 100}, 3}
slime := Monster{Entity{"Slime", 15}}
hero.Damage(20)
slime.Damage(20)
fmt.Println(hero.Status())
fmt.Println(slime.Status())`, ['fmt'], `type Entity struct {
	Name string
	HP   int
}

func (e *Entity) Damage(n int) {
	e.HP -= n
	if e.HP < 0 {
		e.HP = 0
	}
}

func (e Entity) Status() string { return fmt.Sprintf("%s: %d hp", e.Name, e.HP) }

type Player struct {
	Entity
	Level int
}

func (p Player) Status() string { return p.Entity.Status() + fmt.Sprintf(", level %d", p.Level) }

type Monster struct {
	Entity
}`),
        hint: L('Очікувано: <code>Hero: 80 hp, level 3</code> і <code>Slime: 0 hp</code>.', 'Ожидается: <code>Hero: 80 hp, level 3</code> и <code>Slime: 0 hp</code>.', 'Expected: <code>Hero: 80 hp, level 3</code> and <code>Slime: 0 hp</code>.'),
        expected: 'Hero: 80 hp, level 3\nSlime: 0 hp',
        must: /type\s+Player\s+struct\s*\{\s*Entity/
      },
      quiz: { q: L('Як звернутися до перекритого методу вбудованого типу?', 'Как обратиться к перекрытому методу встроенного типа?', 'How do you call the shadowed method of an embedded type?'), options: ['p.super.Status()', 'p.Entity.Status()', 'base.Status()'], answer: 1, explain: L('Вбудоване поле має ім’я свого типу.', 'Встроенное поле имеет имя своего типа.', 'The embedded field is named after its type.') },
      ref: [{ code: 'type B struct { A; X int }', d: L('вбудовування', 'встраивание', 'embedding') }, { code: 'b.A.Method()', d: L('метод вбудованого', 'метод встроенного', 'embedded method') }]
    },
    {
      id: 'generics', chapter: CH6,
      title: L('Узагальнення (generics)', 'Обобщения (generics)', 'Generics'),
      theory: L(
        `<p>З Go 1.18 функції й типи можуть мати <b>параметри типу</b> у квадратних дужках:</p>
<pre class="inline-code">func Map[T, U any](xs []T, f func(T) U) []U {
	out := make([]U, 0, len(xs))
	for _, x := range xs {
		out = append(out, f(x))
	}
	return out
}

type Stack[T any] struct{ items []T }
func (s *Stack[T]) Push(x T) { s.items = append(s.items, x) }</pre>
<ul><li><code>any</code> — будь-який тип</li><li><b>Обмеження</b> описуються інтерфейсом: <code>cmp.Ordered</code> (числа й рядки, можна порівнювати &lt;), <code>comparable</code> (можна ==)</li><li>Власне обмеження-набір: <code>type Number interface { ~int | ~float64 }</code></li><li>Тип зазвичай виводиться сам: <code>Map(nums, double)</code></li></ul>`,
        `<p>С Go 1.18 функции и типы могут иметь <b>параметры типа</b> в квадратных скобках:</p>
<pre class="inline-code">func Map[T, U any](xs []T, f func(T) U) []U {
	out := make([]U, 0, len(xs))
	for _, x := range xs {
		out = append(out, f(x))
	}
	return out
}

type Stack[T any] struct{ items []T }
func (s *Stack[T]) Push(x T) { s.items = append(s.items, x) }</pre>
<ul><li><code>any</code> — любой тип</li><li><b>Ограничения</b> описываются интерфейсом: <code>cmp.Ordered</code> (числа и строки, можно сравнивать &lt;), <code>comparable</code> (можно ==)</li><li>Собственное ограничение-набор: <code>type Number interface { ~int | ~float64 }</code></li><li>Тип обычно выводится сам: <code>Map(nums, double)</code></li></ul>`,
        `<p>Since Go 1.18, functions and types can take <b>type parameters</b> in square brackets:</p>
<pre class="inline-code">func Map[T, U any](xs []T, f func(T) U) []U {
	out := make([]U, 0, len(xs))
	for _, x := range xs {
		out = append(out, f(x))
	}
	return out
}

type Stack[T any] struct{ items []T }
func (s *Stack[T]) Push(x T) { s.items = append(s.items, x) }</pre>
<ul><li><code>any</code> means any type</li><li><b>Constraints</b> are interfaces: <code>cmp.Ordered</code> (numbers and strings, comparable with &lt;), <code>comparable</code> (usable with ==)</li><li>Your own type-set constraint: <code>type Number interface { ~int | ~float64 }</code></li><li>Types are usually inferred: <code>Map(nums, double)</code></li></ul>`),
      why: L(`<p>До узагальнень у Go доводилося писати <code>SumInts</code>, <code>SumFloats</code>, <code>MaxStrings</code>… Тепер одна функція працює для всіх підхожих типів, а компілятор усе одно перевіряє типи. Стандартні пакети <code>slices</code> і <code>maps</code> побудовані саме на узагальненнях.</p>`,
        `<p>До обобщений в Go приходилось писать <code>SumInts</code>, <code>SumFloats</code>, <code>MaxStrings</code>… Теперь одна функция работает для всех подходящих типов, а компилятор всё равно проверяет типы. Стандартные пакеты <code>slices</code> и <code>maps</code> построены именно на обобщениях.</p>`,
        `<p>Before generics Go code had <code>SumInts</code>, <code>SumFloats</code>, <code>MaxStrings</code>… Now one function serves every suitable type, still type-checked. The standard <code>slices</code> and <code>maps</code> packages are built on generics.</p>`),
      mistakes: L(`<ul><li><code>a &lt; b</code> для <code>T any</code> не компілюється — потрібне обмеження <code>cmp.Ordered</code>.</li><li><code>a + b</code> працює лише якщо всі типи набору підтримують +.</li><li>Методи не можуть мати власних параметрів типу — лише тип, до якого вони належать.</li></ul>`,
        `<ul><li><code>a &lt; b</code> для <code>T any</code> не компилируется — нужно ограничение <code>cmp.Ordered</code>.</li><li><code>a + b</code> работает только если все типы набора поддерживают +.</li><li>Методы не могут иметь собственных параметров типа — только тип, к которому они относятся.</li></ul>`,
        `<ul><li><code>a &lt; b</code> on <code>T any</code> doesn’t compile — use the <code>cmp.Ordered</code> constraint.</li><li><code>a + b</code> works only if every type in the set supports +.</li><li>Methods can’t have their own type parameters — only their receiver type can.</li></ul>`),
      examples: [
        { title: 'Map / Filter', code: G(`nums := []int{1, 2, 3, 4, 5}
squares := Map(nums, func(x int) int { return x * x })
words := Map(nums, func(x int) string { return strings.Repeat("*", x) })
fmt.Println(squares)
fmt.Println(words)`, ['fmt', 'strings'], `func Map[T, U any](xs []T, f func(T) U) []U {
	out := make([]U, 0, len(xs))
	for _, x := range xs {
		out = append(out, f(x))
	}
	return out
}`), note: L('Різні типи результату — одна функція.', 'Разные типы результата — одна функция.', 'Different result types, one function.') },
        { title: 'cmp.Ordered', code: G(`fmt.Println(Max([]int{3, 9, 2}))
fmt.Println(Max([]string{"pear", "apple", "plum"}))
fmt.Println(Max([]float64{2.5, -1, 0.75}))`, ['cmp', 'fmt'], `func Max[T cmp.Ordered](xs []T) T {
	best := xs[0]
	for _, x := range xs[1:] {
		if x > best {
			best = x
		}
	}
	return best
}`), note: L('Порівняння &gt; дозволено завдяки обмеженню.', 'Сравнение &gt; разрешено благодаря ограничению.', '&gt; is allowed thanks to the constraint.') },
        { title: 'Stack[T]', code: G(`var s Stack[string]
s.Push("main menu")
s.Push("settings")
top, _ := s.Pop()
fmt.Println(top, len(s.items))
var n Stack[int]
_, ok := n.Pop()
fmt.Println(ok)`, ['fmt'], `type Stack[T any] struct{ items []T }

func (s *Stack[T]) Push(x T) { s.items = append(s.items, x) }

func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	x := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return x, true
}`), note: L('<code>var zero T</code> — нульове значення будь-якого типу.', '<code>var zero T</code> — нулевое значение любого типа.', '<code>var zero T</code> is the zero value of any type.') }
      ],
      task: {
        text: L('Напиши <code>func Filter[T any](xs []T, keep func(T) bool) []T</code> і <code>func Sum[T Number](xs []T) T</code>, де <code>type Number interface { ~int | ~float64 }</code>. Виведи парні числа від 1 до 10 через Filter (<code>[2 4 6 8 10]</code>), їхню суму через Sum (<code>30</code>) і <code>Sum([]float64{1.5, 2.5})</code> (<code>4</code>).', 'Напиши <code>func Filter[T any](xs []T, keep func(T) bool) []T</code> и <code>func Sum[T Number](xs []T) T</code>, где <code>type Number interface { ~int | ~float64 }</code>. Выведи чётные числа от 1 до 10 через Filter (<code>[2 4 6 8 10]</code>), их сумму через Sum (<code>30</code>) и <code>Sum([]float64{1.5, 2.5})</code> (<code>4</code>).', 'Write <code>func Filter[T any](xs []T, keep func(T) bool) []T</code> and <code>func Sum[T Number](xs []T) T</code>, with <code>type Number interface { ~int | ~float64 }</code>. Print the even numbers 1–10 via Filter (<code>[2 4 6 8 10]</code>), their Sum (<code>30</code>) and <code>Sum([]float64{1.5, 2.5})</code> (<code>4</code>).'),
        how: [L('Зріз 1..10 збери циклом, потім <code>Filter(nums, func(x int) bool { return x%2 == 0 })</code>.', 'Срез 1..10 собери циклом, затем <code>Filter(nums, func(x int) bool { return x%2 == 0 })</code>.', 'Build 1..10 in a loop, then <code>Filter(nums, func(x int) bool { return x%2 == 0 })</code>.'), L('У Sum: <code>var total T</code>, далі додавай.', 'В Sum: <code>var total T</code>, дальше прибавляй.', 'In Sum: <code>var total T</code>, then add.')],
        starter: G('fmt.Println("?")', ['fmt'], `type Number interface {
	~int | ~float64
}

// Filter і Sum`),
        solution: G(`nums := []int{}
for i := 1; i <= 10; i++ {
	nums = append(nums, i)
}
evens := Filter(nums, func(x int) bool { return x%2 == 0 })
fmt.Println(evens)
fmt.Println(Sum(evens))
fmt.Println(Sum([]float64{1.5, 2.5}))`, ['fmt'], `type Number interface {
	~int | ~float64
}

func Filter[T any](xs []T, keep func(T) bool) []T {
	out := []T{}
	for _, x := range xs {
		if keep(x) {
			out = append(out, x)
		}
	}
	return out
}

func Sum[T Number](xs []T) T {
	var total T
	for _, x := range xs {
		total += x
	}
	return total
}`),
        hint: L('fmt.Println(4.0) друкує <code>4</code>.', 'fmt.Println(4.0) печатает <code>4</code>.', 'fmt.Println(4.0) prints <code>4</code>.'),
        expected: '[2 4 6 8 10]\n30\n4',
        must: /func\s+Filter\s*\[[\s\S]*func\s+Sum\s*\[\s*T\s+Number/
      },
      quiz: { q: L('Яке обмеження дозволяє порівнювати значення через &lt;?', 'Какое ограничение позволяет сравнивать значения через &lt;?', 'Which constraint allows comparing with &lt;?'), options: ['any', 'comparable', 'cmp.Ordered'], answer: 2, explain: L('comparable дає лише == і !=.', 'comparable даёт только == и !=.', 'comparable only gives == and !=.') },
      ref: [{ code: 'func F[T any](x T) T', d: L('узагальнена функція', 'обобщённая функция', 'generic function') }, { code: 'type S[T any] struct{ v []T }', d: L('узагальнений тип', 'обобщённый тип', 'generic type') }, { code: 'interface{ ~int | ~float64 }', d: L('набір типів', 'набор типов', 'type set') }]
    },
    {
      id: 'sort-search', chapter: CH6,
      title: L('Сортування й пошук', 'Сортировка и поиск', 'Sorting and searching'),
      theory: L(
        `<p>Пакети <code>sort</code> і <code>slices</code> дають готові алгоритми:</p>
<table class="mini"><tr><td><code>slices.Sort(xs)</code>, <code>sort.Ints/Strings</code></td><td>сортування за зростанням</td></tr><tr><td><code>sort.Slice(xs, func(i, j int) bool {…})</code></td><td>сортування за своїм правилом</td></tr><tr><td><code>sort.SliceStable</code></td><td>зберігає порядок рівних</td></tr><tr><td><code>slices.Contains</code>, <code>slices.Index</code></td><td>пошук перебором</td></tr><tr><td><code>sort.SearchInts(xs, x)</code>, <code>slices.BinarySearch</code></td><td><b>бінарний пошук</b> у відсортованому зрізі</td></tr><tr><td><code>slices.Reverse</code>, <code>slices.Max</code></td><td>утиліти</td></tr></table>
<p>Бінарний пошук повертає позицію, <b>куди треба вставити</b> x, щоб порядок зберігся. Якщо там лежить саме x — його знайдено.</p>`,
        `<p>Пакеты <code>sort</code> и <code>slices</code> дают готовые алгоритмы:</p>
<table class="mini"><tr><td><code>slices.Sort(xs)</code>, <code>sort.Ints/Strings</code></td><td>сортировка по возрастанию</td></tr><tr><td><code>sort.Slice(xs, func(i, j int) bool {…})</code></td><td>сортировка по своему правилу</td></tr><tr><td><code>sort.SliceStable</code></td><td>сохраняет порядок равных</td></tr><tr><td><code>slices.Contains</code>, <code>slices.Index</code></td><td>поиск перебором</td></tr><tr><td><code>sort.SearchInts(xs, x)</code>, <code>slices.BinarySearch</code></td><td><b>бинарный поиск</b> в отсортированном срезе</td></tr><tr><td><code>slices.Reverse</code>, <code>slices.Max</code></td><td>утилиты</td></tr></table>
<p>Бинарный поиск возвращает позицию, <b>куда нужно вставить</b> x, чтобы порядок сохранился. Если там лежит именно x — он найден.</p>`,
        `<p>The <code>sort</code> and <code>slices</code> packages provide ready algorithms:</p>
<table class="mini"><tr><td><code>slices.Sort(xs)</code>, <code>sort.Ints/Strings</code></td><td>ascending sort</td></tr><tr><td><code>sort.Slice(xs, func(i, j int) bool {…})</code></td><td>sort by your rule</td></tr><tr><td><code>sort.SliceStable</code></td><td>keeps equal items in order</td></tr><tr><td><code>slices.Contains</code>, <code>slices.Index</code></td><td>linear search</td></tr><tr><td><code>sort.SearchInts(xs, x)</code>, <code>slices.BinarySearch</code></td><td><b>binary search</b> in a sorted slice</td></tr><tr><td><code>slices.Reverse</code>, <code>slices.Max</code></td><td>helpers</td></tr></table>
<p>Binary search returns the position <b>where x should be inserted</b> to keep the order. If x is actually there, it was found.</p>`),
      why: L(`<p>Таблиці рекордів, каталоги, автодоповнення пошуку — усе це відсортовані дані. Бінарний пошук знаходить елемент серед мільйона за ~20 кроків, а не за мільйон. Готові функції з <code>sort</code> і <code>slices</code> швидкі й перевірені — писати їх самому має сенс лише для навчання.</p>`,
        `<p>Таблицы рекордов, каталоги, автодополнение поиска — всё это отсортированные данные. Бинарный поиск находит элемент среди миллиона за ~20 шагов, а не за миллион. Готовые функции из <code>sort</code> и <code>slices</code> быстрые и проверенные — писать их самому имеет смысл только для обучения.</p>`,
        `<p>High-score tables, catalogues, search autocomplete — all sorted data. Binary search finds an item among a million in ~20 steps, not a million. The ready functions in <code>sort</code> and <code>slices</code> are fast and tested — writing your own only makes sense for learning.</p>`),
      mistakes: L(`<ul><li>Бінарний пошук у невідсортованому зрізі дає неправильну відповідь.</li><li>Результат <code>SearchInts</code> — позиція вставки, а не «знайдено/ні»: перевіряй <code>i &lt; len(xs) &amp;&amp; xs[i] == x</code>.</li><li>Правило в <code>sort.Slice</code> через <code>&gt;=</code> замість <code>&gt;</code> ламає сортування рівних.</li></ul>`,
        `<ul><li>Бинарный поиск в неотсортированном срезе даёт неправильный ответ.</li><li>Результат <code>SearchInts</code> — позиция вставки, а не «найдено/нет»: проверяй <code>i &lt; len(xs) &amp;&amp; xs[i] == x</code>.</li><li>Правило в <code>sort.Slice</code> через <code>&gt;=</code> вместо <code>&gt;</code> ломает сортировку равных.</li></ul>`,
        `<ul><li>Binary search on an unsorted slice gives wrong answers.</li><li><code>SearchInts</code> returns an insertion point, not found/not found: check <code>i &lt; len(xs) &amp;&amp; xs[i] == x</code>.</li><li>Using <code>&gt;=</code> instead of <code>&gt;</code> in <code>sort.Slice</code> breaks ties.</li></ul>`),
      examples: [
        { title: 'slices', code: G(`xs := []int{42, 7, 19, 3, 25}
slices.Sort(xs)
fmt.Println(xs)
fmt.Println(slices.Contains(xs, 19), slices.Index(xs, 25))
fmt.Println(slices.Max(xs))
slices.Reverse(xs)
fmt.Println(xs)`, ['fmt', 'slices']), note: L('Пакет slices — з Go 1.21.', 'Пакет slices — с Go 1.21.', 'The slices package arrived in Go 1.21.') },
        { title: L('Кілька правил', 'Несколько правил', 'Several keys'), code: G(`ps := []P{{"Max", 300}, {"Ira", 450}, {"Ann", 300}, {"Leo", 120}}
sort.Slice(ps, func(i, j int) bool {
	if ps[i].Score != ps[j].Score {
		return ps[i].Score > ps[j].Score
	}
	return ps[i].Name < ps[j].Name
})
for i, p := range ps {
	fmt.Printf("%d. %s %d\\n", i+1, p.Name, p.Score)
}`, ['fmt', 'sort'], `type P struct {
	Name  string
	Score int
}`), note: L('Рівні очки — за алфавітом.', 'Равные очки — по алфавиту.', 'Ties go alphabetical.') },
        { title: L('Бінарний пошук', 'Бинарный поиск', 'Binary search'), code: G(`xs := []int{3, 8, 15, 23, 42, 57}
for _, x := range []int{42, 20, 100} {
	i := sort.SearchInts(xs, x)
	found := i < len(xs) && xs[i] == x
	fmt.Println(x, i, found)
}`, ['fmt', 'sort']), note: L('20 вставили б на позицію 3.', '20 вставили бы на позицию 3.', '20 would go at position 3.') }
      ],
      task: {
        text: L('Дано учнів <code>{"Ola", 87}, {"Max", 95}, {"Ira", 87}, {"Taras", 72}</code>. Відсортуй через <code>sort.Slice</code> за спаданням балу, а при рівних — за ім’ям, і виведи <code>1. Max 95</code> … Потім зібери всі бали в зріз, відсортуй за зростанням і через <code>sort.SearchInts</code> виведи позицію <code>87</code> (<code>87 found at 1</code>) і позицію вставки <code>90</code> (<code>90 goes to 3</code>).', 'Даны ученики <code>{"Ola", 87}, {"Max", 95}, {"Ira", 87}, {"Taras", 72}</code>. Отсортируй через <code>sort.Slice</code> по убыванию балла, а при равных — по имени, и выведи <code>1. Max 95</code> … Затем собери все баллы в срез, отсортируй по возрастанию и через <code>sort.SearchInts</code> выведи позицию <code>87</code> (<code>87 found at 1</code>) и позицию вставки <code>90</code> (<code>90 goes to 3</code>).', 'Given students <code>{"Ola", 87}, {"Max", 95}, {"Ira", 87}, {"Taras", 72}</code>, sort with <code>sort.Slice</code> by score descending, ties by name, and print <code>1. Max 95</code> … Then collect the scores, sort ascending and use <code>sort.SearchInts</code> to print the position of <code>87</code> (<code>87 found at 1</code>) and the insertion point of <code>90</code> (<code>90 goes to 3</code>).'),
        how: [L('Бали після сортування: [72 87 87 95] — перше 87 на позиції 1.', 'Баллы после сортировки: [72 87 87 95] — первое 87 на позиции 1.', 'Sorted scores: [72 87 87 95] — the first 87 is at 1.')],
        starter: G(`st := []Student{{"Ola", 87}, {"Max", 95}, {"Ira", 87}, {"Taras", 72}}
fmt.Println(st)`, ['fmt'], `type Student struct {
	Name  string
	Score int
}`),
        solution: G(`st := []Student{{"Ola", 87}, {"Max", 95}, {"Ira", 87}, {"Taras", 72}}
sort.Slice(st, func(i, j int) bool {
	if st[i].Score != st[j].Score {
		return st[i].Score > st[j].Score
	}
	return st[i].Name < st[j].Name
})
scores := []int{}
for i, s := range st {
	fmt.Printf("%d. %s %d\\n", i+1, s.Name, s.Score)
	scores = append(scores, s.Score)
}
sort.Ints(scores)
fmt.Printf("87 found at %d\\n", sort.SearchInts(scores, 87))
fmt.Printf("90 goes to %d\\n", sort.SearchInts(scores, 90))`, ['fmt', 'sort'], `type Student struct {
	Name  string
	Score int
}`),
        hint: L('Ira стоїть перед Ola: бали рівні, I &lt; O.', 'Ira стоит перед Ola: баллы равны, I &lt; O.', 'Ira comes before Ola: equal scores, I &lt; O.'),
        expected: '1. Max 95\n2. Ira 87\n3. Ola 87\n4. Taras 72\n87 found at 1\n90 goes to 3',
        must: /sort\.Slice[\s\S]*sort\.SearchInts/
      },
      quiz: { q: L('Що повертає <code>sort.SearchInts([]int{1, 5, 9}, 6)</code>?', 'Что возвращает <code>sort.SearchInts([]int{1, 5, 9}, 6)</code>?', 'What does <code>sort.SearchInts([]int{1, 5, 9}, 6)</code> return?'), options: ['-1', '2', '1'], answer: 1, explain: L('6 треба вставити перед 9 — на позицію 2.', '6 нужно вставить перед 9 — на позицию 2.', '6 belongs before 9 — position 2.') },
      ref: [{ code: 'sort.Slice(xs, func(i, j int) bool { … })', d: L('своє правило', 'своё правило', 'custom order') }, { code: 'slices.Sort / Contains / Index / Max', d: 'slices' }, { code: 'sort.SearchInts(xs, x)', d: L('бінарний пошук', 'бинарный поиск', 'binary search') }]
    }
  ], 'project-todo');

  Codry.steps('go', [
    {
      id: 'project-life', chapter: CH5, project: true,
      title: L('Проєкт: гра «Життя»', 'Проект: игра «Жизнь»', 'Project: Game of Life'),
      theory: L(
        `<p><b>Гра «Життя»</b> (Джон Конвей, 1970) — клітинковий автомат: поле клітинок, кожна жива (<code>#</code>) або мертва (<code>.</code>). Кожен крок усі клітинки змінюються <b>одночасно</b> за правилами:</p>
<ol><li>Жива клітинка з <b>2 або 3</b> живими сусідами виживає</li><li>Мертва клітинка рівно з <b>3</b> живими сусідами оживає</li><li>Інші клітинки помирають або лишаються мертвими</li></ol>
<p>Сусіди — 8 клітинок навколо (по горизонталі, вертикалі й діагоналях). За межами поля — мертві клітинки.</p>
<p>Ключова ідея: нове покоління рахується в <b>новий</b> зріз, а не змінює старий, інакше зміни «розтечуться» посеред кроку. З цих простих правил виникають «планери», що повзуть полем, і навіть цілі обчислювальні машини.</p>`,
        `<p><b>Игра «Жизнь»</b> (Джон Конвей, 1970) — клеточный автомат: поле клеток, каждая живая (<code>#</code>) или мёртвая (<code>.</code>). Каждый шаг все клетки меняются <b>одновременно</b> по правилам:</p>
<ol><li>Живая клетка с <b>2 или 3</b> живыми соседями выживает</li><li>Мёртвая клетка ровно с <b>3</b> живыми соседями оживает</li><li>Остальные клетки умирают или остаются мёртвыми</li></ol>
<p>Соседи — 8 клеток вокруг (по горизонтали, вертикали и диагоналям). За пределами поля — мёртвые клетки.</p>
<p>Ключевая идея: новое поколение считается в <b>новый</b> срез, а не меняет старый, иначе изменения «растекутся» посреди шага. Из этих простых правил возникают «планеры», ползущие по полю, и даже целые вычислительные машины.</p>`,
        `<p>The <b>Game of Life</b> (John Conway, 1970) is a cellular automaton: a grid of cells, each alive (<code>#</code>) or dead (<code>.</code>). Every step all cells change <b>at once</b> by the rules:</p>
<ol><li>A live cell with <b>2 or 3</b> live neighbours survives</li><li>A dead cell with exactly <b>3</b> live neighbours comes alive</li><li>All other cells die or stay dead</li></ol>
<p>Neighbours are the 8 surrounding cells (horizontal, vertical, diagonal). Outside the grid, cells are dead.</p>
<p>The key idea: compute the next generation into a <b>new</b> slice instead of changing the old one, or changes leak mid-step. These simple rules produce “gliders” crawling across the grid and even whole computers.</p>`),
      why: L(`<p>Проєкт тренує двовимірні зрізи, вкладені цикли, перевірку меж і функції з чіткими обов’язками: <code>parse</code>, <code>neighbours</code>, <code>step</code>, <code>render</code>. А ще він красивий: прості правила — і несподівано «живі» візерунки. Схожі симуляції використовують у моделюванні пожеж, натовпів і процедурній генерації печер в іграх.</p>`,
        `<p>Проект тренирует двумерные срезы, вложенные циклы, проверку границ и функции с чёткими обязанностями: <code>parse</code>, <code>neighbours</code>, <code>step</code>, <code>render</code>. А ещё он красивый: простые правила — и неожиданно «живые» узоры. Похожие симуляции используют в моделировании пожаров, толп и процедурной генерации пещер в играх.</p>`,
        `<p>The project trains 2D slices, nested loops, bounds checks and focused functions: <code>parse</code>, <code>neighbours</code>, <code>step</code>, <code>render</code>. It’s also beautiful: simple rules, surprisingly lifelike patterns. Similar simulations model fires, crowds, and procedurally generated game caves.</p>`),
      mistakes: L(`<ul><li>Змінювати поле «на місці» під час кроку — сусіди рахуються вже за зміненими клітинками.</li><li>Рахувати саму клітинку серед своїх сусідів (пропусти <code>dr == 0 &amp;&amp; dc == 0</code>).</li><li>Виходити за межі зрізу на краях поля — <code>index out of range</code>.</li></ul>`,
        `<ul><li>Менять поле «на месте» во время шага — соседи считаются уже по изменённым клеткам.</li><li>Считать саму клетку среди своих соседей (пропусти <code>dr == 0 &amp;&amp; dc == 0</code>).</li><li>Выходить за пределы среза на краях поля — <code>index out of range</code>.</li></ul>`,
        `<ul><li>Updating the grid in place during a step — neighbours get counted from already-changed cells.</li><li>Counting the cell itself as a neighbour (skip <code>dr == 0 &amp;&amp; dc == 0</code>).</li><li>Going past the slice at the edges — <code>index out of range</code>.</li></ul>`),
      examples: [
        { title: L('Двовимірний зріз', 'Двумерный срез', '2D slice'), code: G(`rows := []string{"..#", "#.#", "..."}
grid := make([][]bool, len(rows))
for r, line := range rows {
	grid[r] = make([]bool, len(line))
	for c, ch := range line {
		grid[r][c] = ch == '#'
	}
}
fmt.Println(grid)`), note: L('Рядок → зріз булевих значень.', 'Строка → срез булевых значений.', 'A string becomes a slice of bools.') },
        { title: L('Підрахунок сусідів', 'Подсчёт соседей', 'Counting neighbours'), code: G(`grid := [][]bool{{true, true, false}, {false, true, false}, {false, false, true}}
fmt.Println(neighbours(grid, 1, 1), neighbours(grid, 0, 2), neighbours(grid, 2, 0))`, ['fmt'], `func neighbours(g [][]bool, r, c int) int {
	n := 0
	for dr := -1; dr <= 1; dr++ {
		for dc := -1; dc <= 1; dc++ {
			if dr == 0 && dc == 0 {
				continue
			}
			nr, nc := r+dr, c+dc
			if nr >= 0 && nr < len(g) && nc >= 0 && nc < len(g[0]) && g[nr][nc] {
				n++
			}
		}
	}
	return n
}`), note: L('Межі поля перевіряємо явно.', 'Границы поля проверяем явно.', 'Bounds are checked explicitly.') },
        { title: L('Мигалка', 'Мигалка', 'Blinker'), code: G(`frames := []string{".#.\\n.#.\\n.#.", "...\\n###\\n..."}
for i := 0; i < 4; i++ {
	fmt.Printf("step %d:\\n%s\\n", i, frames[i%2])
}`), note: L('Найпростіший осцилятор: період 2.', 'Простейший осциллятор: период 2.', 'The simplest oscillator: period 2.') }
      ],
      task: {
        text: L(`Зчитай поле зі stdin (уже задано): рядки з <code>#</code> і <code>.</code>. Виконай 4 кроки гри «Життя». Перед кожним станом друкуй заголовок <code>Gen 0:</code>, <code>Gen 1:</code>… (усього 5 станів: початковий і 4 нові) і рядки поля. Наприкінці виведи <code>Alive: N</code> — кількість живих клітинок після 4-го кроку.`,
          `Считай поле из stdin (уже задано): строки из <code>#</code> и <code>.</code>. Выполни 4 шага игры «Жизнь». Перед каждым состоянием печатай заголовок <code>Gen 0:</code>, <code>Gen 1:</code>… (всего 5 состояний: начальное и 4 новых) и строки поля. В конце выведи <code>Alive: N</code> — количество живых клеток после 4-го шага.`,
          `Read the grid from stdin (preset): lines of <code>#</code> and <code>.</code>. Run 4 steps of the Game of Life. Before each state print a header <code>Gen 0:</code>, <code>Gen 1:</code>… (5 states: the initial one plus 4 new) and the grid lines. Finally print <code>Alive: N</code> — live cells after step 4.`),
        how: [L('Читай рядки через <code>bufio.Scanner</code>, пропускаючи порожні.', 'Читай строки через <code>bufio.Scanner</code>, пропуская пустые.', 'Read lines with <code>bufio.Scanner</code>, skipping empty ones.'), L('<code>step(g)</code> створює новий <code>[][]bool</code> і заповнює його за правилами.', '<code>step(g)</code> создаёт новый <code>[][]bool</code> и заполняет его по правилам.', '<code>step(g)</code> creates a new <code>[][]bool</code> and fills it by the rules.'), L('На початковому полі — «планер»: після 4 кроків він зсувається на клітинку вниз і вправо.', 'На начальном поле — «планер»: через 4 шага он сдвигается на клетку вниз и вправо.', 'The start is a “glider”: after 4 steps it moves one cell down and right.')],
        starter: G(`sc := bufio.NewScanner(os.Stdin)
for sc.Scan() {
	fmt.Println(sc.Text())
}`, ['bufio', 'fmt', 'os']),
        solution: G(`sc := bufio.NewScanner(os.Stdin)
grid := [][]bool{}
for sc.Scan() {
	line := strings.TrimSpace(sc.Text())
	if line == "" {
		continue
	}
	row := make([]bool, len(line))
	for c, ch := range line {
		row[c] = ch == '#'
	}
	grid = append(grid, row)
}
for gen := 0; gen <= 4; gen++ {
	if gen > 0 {
		grid = step(grid)
	}
	fmt.Printf("Gen %d:\\n", gen)
	render(grid)
}
alive := 0
for _, row := range grid {
	for _, v := range row {
		if v {
			alive++
		}
	}
}
fmt.Println("Alive:", alive)`, ['bufio', 'fmt', 'os', 'strings'], `func neighbours(g [][]bool, r, c int) int {
	n := 0
	for dr := -1; dr <= 1; dr++ {
		for dc := -1; dc <= 1; dc++ {
			if dr == 0 && dc == 0 {
				continue
			}
			nr, nc := r+dr, c+dc
			if nr >= 0 && nr < len(g) && nc >= 0 && nc < len(g[nr]) && g[nr][nc] {
				n++
			}
		}
	}
	return n
}

func step(g [][]bool) [][]bool {
	next := make([][]bool, len(g))
	for r := range g {
		next[r] = make([]bool, len(g[r]))
		for c := range g[r] {
			n := neighbours(g, r, c)
			next[r][c] = n == 3 || (g[r][c] && n == 2)
		}
	}
	return next
}

func render(g [][]bool) {
	for _, row := range g {
		var b strings.Builder
		for _, v := range row {
			if v {
				b.WriteByte('#')
			} else {
				b.WriteByte('.')
			}
		}
		fmt.Println(b.String())
	}
}`),
        stdin: '.#....\n..#...\n###...\n......\n......\n......',
        hint: L('Планер має 5 живих клітинок у кожному поколінні.', 'У планера 5 живых клеток в каждом поколении.', 'A glider has 5 live cells in every generation.'),
        expected: 'Gen 0:\n.#....\n..#...\n###...\n......\n......\n......\nGen 1:\n......\n#.#...\n.##...\n.#....\n......\n......\nGen 2:\n......\n..#...\n#.#...\n.##...\n......\n......\nGen 3:\n......\n.#....\n..##..\n.##...\n......\n......\nGen 4:\n......\n..#...\n...#..\n.###..\n......\n......\nAlive: 5',
        must: /func\s+step[\s\S]*func\s+neighbours|func\s+neighbours[\s\S]*func\s+step/
      },
      quiz: { q: L('Чому нове покоління рахують в окремий зріз?', 'Почему новое поколение считают в отдельный срез?', 'Why compute the next generation into a separate slice?'), options: [L('щоб усі клітинки змінились одночасно', 'чтобы все клетки изменились одновременно', 'so all cells change at once'), L('так менше пам’яті', 'так меньше памяти', 'it uses less memory'), L('інакше не компілюється', 'иначе не компилируется', 'otherwise it won’t compile')], answer: 0, explain: L('Інакше сусіди рахувались би за вже зміненими клітинками.', 'Иначе соседи считались бы по уже изменённым клеткам.', 'Otherwise neighbours would be counted from already-changed cells.') },
      ref: [{ code: 'next := make([][]bool, len(g))', d: L('нове поле', 'новое поле', 'new grid') }, { code: 'n == 3 || (alive && n == 2)', d: L('правила Конвея', 'правила Конвея', 'Conway’s rules') }]
    }
  ]);
})();
