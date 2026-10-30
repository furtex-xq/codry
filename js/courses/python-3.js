// Python — частина 3: функції, модулі, помилки, файли, класи, проєкти.
(function () {
  const L = Codry.L;
  const CH5 = L('Функції та модулі', 'Функции и модули', 'Functions and modules');
  const CH6 = L('Надійні програми та ООП', 'Надёжные программы и ООП', 'Robust programs and OOP');
  const CH7 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');

  Codry.steps('python', [
    {
      id: 'def', chapter: CH5,
      title: L('Функції: def і параметри', 'Функции: def и параметры', 'Functions: def and parameters'),
      theory: L(
        `<p><b>Функція</b> — іменований шматок коду, який можна викликати багато разів. Ти вже користувався вбудованими: <code>print()</code>, <code>len()</code>. Тепер створимо власні:</p>
<pre class="inline-code">def greet(name):
    print(f"Hello, {name}!")

greet("Ann")
greet("Bob")</pre>
<p><code>def</code> — ключове слово, далі ім’я функції, у дужках — <b>параметри</b> (змінні, які отримають значення при виклику), двокрапка і тіло з відступом.</p>
<p>Значення, які передаєш при виклику, називаються <b>аргументами</b>. Параметрів може бути кілька або жодного: <code>def show_menu():</code>.</p>
<p>Функцію треба <b>оголосити до</b> того, як її викликати.</p>`,
        `<p><b>Функция</b> — именованный кусок кода, который можно вызывать много раз. Ты уже пользовался встроенными: <code>print()</code>, <code>len()</code>. Теперь создадим свои:</p>
<pre class="inline-code">def greet(name):
    print(f"Hello, {name}!")

greet("Ann")
greet("Bob")</pre>
<p><code>def</code> — ключевое слово, дальше имя функции, в скобках — <b>параметры</b> (переменные, которые получат значения при вызове), двоеточие и тело с отступом.</p>
<p>Значения, которые передаёшь при вызове, называются <b>аргументами</b>. Параметров может быть несколько или ни одного: <code>def show_menu():</code>.</p>
<p>Функцию нужно <b>объявить до</b> того, как её вызывать.</p>`,
        `<p>A <b>function</b> is a named piece of code you can call many times. You’ve used built-in ones: <code>print()</code>, <code>len()</code>. Now let’s make our own:</p>
<pre class="inline-code">def greet(name):
    print(f"Hello, {name}!")

greet("Ann")
greet("Bob")</pre>
<p><code>def</code> is the keyword, then the function name, <b>parameters</b> in parentheses (variables that receive values on call), a colon and an indented body.</p>
<p>Values you pass when calling are <b>arguments</b>. There can be several parameters or none: <code>def show_menu():</code>.</p>
<p>A function must be <b>defined before</b> it is called.</p>`),
      why: L(`<p>Принцип <b>DRY</b> — «Don’t Repeat Yourself». Якщо код повторюється, його виносять у функцію: виправив помилку в одному місці — вона виправлена всюди. Ще функції дають блокам коду зрозумілі імена.</p>`,
        `<p>Принцип <b>DRY</b> — «Don’t Repeat Yourself». Если код повторяется, его выносят в функцию: исправил ошибку в одном месте — она исправлена везде. Ещё функции дают блокам кода понятные имена.</p>`,
        `<p>The <b>DRY</b> principle — “Don’t Repeat Yourself”. Repeated code goes into a function: fix a bug once and it’s fixed everywhere. Functions also give blocks of code clear names.</p>`),
      mistakes: L(`<ul><li>Оголосити функцію і забути її викликати — нічого не станеться.</li><li>Передати не ту кількість аргументів → <code>TypeError: missing 1 required positional argument</code>.</li><li>Викликати функцію вище за її оголошення → <code>NameError</code>.</li></ul>`,
        `<ul><li>Объявить функцию и забыть её вызвать — ничего не произойдёт.</li><li>Передать не то количество аргументов → <code>TypeError: missing 1 required positional argument</code>.</li><li>Вызвать функцию выше её объявления → <code>NameError</code>.</li></ul>`,
        `<ul><li>Defining a function and never calling it — nothing happens.</li><li>Passing the wrong number of arguments → <code>TypeError: missing 1 required positional argument</code>.</li><li>Calling a function above its definition → <code>NameError</code>.</li></ul>`),
      examples: [
        { title: L('Без параметрів', 'Без параметров', 'No parameters'), code: 'def line():\n    print("-" * 20)\n\nline()\nprint("Menu")\nline()', note: L('Один раз оголосили — двічі використали.', 'Один раз объявили — дважды использовали.', 'Defined once, used twice.') },
        { title: L('Один параметр', 'Один параметр', 'One parameter'), code: 'def greet(name):\n    print(f"Hi, {name}! Welcome to Codry.")\n\ngreet("Liza")\ngreet("Ivan")', note: L('<code>name</code> отримує різні значення при кожному виклику.', '<code>name</code> получает разные значения при каждом вызове.', '<code>name</code> gets a different value on each call.') },
        { title: L('Кілька параметрів', 'Несколько параметров', 'Several parameters'), code: 'def box(width, height, char):\n    for _ in range(height):\n        print(char * width)\n\nbox(5, 2, "#")\nbox(3, 3, "*")', note: L('Аргументи підставляються по порядку.', 'Аргументы подставляются по порядку.', 'Arguments are matched in order.') },
        { title: L('Функція в циклі', 'Функция в цикле', 'Function in a loop'), code: 'def show(item, price):\n    print(f"{item:<8}{price:>6.2f}")\n\nmenu = [("Tea", 25), ("Coffee", 45.5), ("Cake", 60)]\nfor item, price in menu:\n    show(item, price)', note: L('Функція оформлює кожен рядок меню однаково.', 'Функция оформляет каждую строку меню одинаково.', 'The function formats every menu line the same way.') }
      ],
      task: {
        text: L('Напиши функцію <code>stars(n)</code>, яка виводить рядок з <code>n</code> зірочок. Викличи її для 1, 3 і 5.', 'Напиши функцию <code>stars(n)</code>, которая выводит строку из <code>n</code> звёздочек. Вызови её для 1, 3 и 5.', 'Write a function <code>stars(n)</code> that prints a line of <code>n</code> stars. Call it for 1, 3 and 5.'),
        how: [L('<code>def stars(n):</code>', '<code>def stars(n):</code>', '<code>def stars(n):</code>'), L('У тілі: <code>print("*" * n)</code>', 'В теле: <code>print("*" * n)</code>', 'Body: <code>print("*" * n)</code>'), L('Три виклики під функцією.', 'Три вызова под функцией.', 'Three calls below the function.')],
        starter: '',
        solution: 'def stars(n):\n    print("*" * n)\n\nstars(1)\nstars(3)\nstars(5)',
        hint: L('Множення рядка на число повторює його.', 'Умножение строки на число повторяет её.', 'Multiplying a string by a number repeats it.'),
        expected: '*\n***\n*****',
        must: /def\s+stars\s*\(/
      },
      quiz: { q: L('Як називаються значення, передані у функцію при виклику?', 'Как называются значения, переданные в функцию при вызове?', 'What are the values passed to a function when calling it called?'), options: [L('параметри', 'параметры', 'parameters'), L('аргументи', 'аргументы', 'arguments'), L('змінні', 'переменные', 'variables')], answer: 1, explain: L('Параметри — у визначенні, аргументи — при виклику.', 'Параметры — в определении, аргументы — при вызове.', 'Parameters are in the definition, arguments at the call.') },
      ref: [{ code: 'def name(a, b):', d: L('оголосити функцію', 'объявить функцию', 'define a function') }, { code: 'name(1, 2)', d: L('викликати', 'вызвать', 'call') }]
    },
    {
      id: 'return', chapter: CH5,
      title: L('Повернення значення: return', 'Возврат значения: return', 'Returning values: return'),
      theory: L(
        `<p>Функція може не лише щось робити, а й <b>повертати результат</b> через <code>return</code>:</p>
<pre class="inline-code">def square(x):
    return x * x

area = square(5) + square(3)   # 25 + 9</pre>
<p>Повернене значення можна зберегти, вивести, використати у виразі чи передати в іншу функцію.</p>
<p><code>return</code> одразу <b>завершує</b> функцію — код після нього не виконується. Можна повернути кілька значень через кому (насправді це кортеж): <code>return low, high</code>.</p>
<p>Функція без <code>return</code> повертає спеціальне значення <code>None</code>.</p>`,
        `<p>Функция может не только что-то делать, но и <b>возвращать результат</b> через <code>return</code>:</p>
<pre class="inline-code">def square(x):
    return x * x

area = square(5) + square(3)   # 25 + 9</pre>
<p>Возвращённое значение можно сохранить, вывести, использовать в выражении или передать в другую функцию.</p>
<p><code>return</code> сразу <b>завершает</b> функцию — код после него не выполняется. Можно вернуть несколько значений через запятую (на самом деле это кортеж): <code>return low, high</code>.</p>
<p>Функция без <code>return</code> возвращает специальное значение <code>None</code>.</p>`,
        `<p>A function can not only do something but also <b>return a result</b> with <code>return</code>:</p>
<pre class="inline-code">def square(x):
    return x * x

area = square(5) + square(3)   # 25 + 9</pre>
<p>A returned value can be stored, printed, used in an expression or passed to another function.</p>
<p><code>return</code> immediately <b>ends</b> the function — code after it doesn’t run. You can return several values separated by commas (it’s actually a tuple): <code>return low, high</code>.</p>
<p>A function without <code>return</code> returns the special value <code>None</code>.</p>`),
      why: L(`<p>Різниця між <code>print</code> і <code>return</code> — ключова. <code>print</code> лише показує текст людині. <code>return</code> віддає значення програмі, щоб вона могла рахувати далі. Функції, що повертають результат, можна комбінувати, як цеглинки LEGO.</p>`,
        `<p>Разница между <code>print</code> и <code>return</code> — ключевая. <code>print</code> лишь показывает текст человеку. <code>return</code> отдаёт значение программе, чтобы она могла считать дальше. Функции, возвращающие результат, можно комбинировать, как кирпичики LEGO.</p>`,
        `<p>The difference between <code>print</code> and <code>return</code> is key. <code>print</code> only shows text to a human. <code>return</code> hands a value back to the program so it can keep computing. Functions that return results combine like LEGO bricks.</p>`),
      mistakes: L(`<ul><li>Писати <code>print</code> замість <code>return</code>, а потім дивуватися, чому <code>result = f()</code> дає None.</li><li>Код після <code>return</code> у тому ж блоці — «мертвий», він ніколи не виконається.</li></ul>`,
        `<ul><li>Писать <code>print</code> вместо <code>return</code>, а потом удивляться, почему <code>result = f()</code> даёт None.</li><li>Код после <code>return</code> в том же блоке — «мёртвый», он никогда не выполнится.</li></ul>`,
        `<ul><li>Using <code>print</code> instead of <code>return</code>, then wondering why <code>result = f()</code> is None.</li><li>Code after <code>return</code> in the same block is “dead” — it never runs.</li></ul>`),
      examples: [
        { title: 'return', code: 'def area(w, h):\n    return w * h\n\nroom = area(4, 5)\nprint("Room:", room)\nprint("Two rooms:", area(4, 5) + area(3, 3))', note: L('Результат використовується у виразах.', 'Результат используется в выражениях.', 'The result is used in expressions.') },
        { title: 'print vs return', code: 'def show_double(x):\n    print(x * 2)\n\ndef get_double(x):\n    return x * 2\n\na = show_double(5)\nb = get_double(5)\nprint("a =", a)\nprint("b =", b)', note: L('<code>show_double</code> повертає None.', '<code>show_double</code> возвращает None.', '<code>show_double</code> returns None.') },
        { title: L('Ранній вихід', 'Ранний выход', 'Early exit'), code: 'def grade(score):\n    if score >= 90:\n        return "A"\n    if score >= 70:\n        return "B"\n    return "C"\n\nfor s in [95, 75, 40]:\n    print(s, grade(s))', note: L('<code>return</code> зупиняє функцію — <code>elif</code> не потрібен.', '<code>return</code> останавливает функцию — <code>elif</code> не нужен.', '<code>return</code> stops the function — no need for <code>elif</code>.') },
        { title: L('Кілька значень', 'Несколько значений', 'Multiple values'), code: 'def stats(nums):\n    return min(nums), max(nums), sum(nums) / len(nums)\n\nlow, high, avg = stats([4, 8, 15, 16, 23, 42])\nprint(low, high, avg)', note: L('Повертаємо кортеж і розпаковуємо.', 'Возвращаем кортеж и распаковываем.', 'Return a tuple and unpack it.') }
      ],
      task: {
        text: L('Напиши функцію <code>is_even(n)</code>, що повертає <code>True</code> для парних чисел, і функцію <code>count_even(nums)</code>, що <b>повертає</b> кількість парних у списку (використовуючи <code>is_even</code>). Код нижче вже викликає їх.', 'Напиши функцию <code>is_even(n)</code>, возвращающую <code>True</code> для чётных чисел, и функцию <code>count_even(nums)</code>, которая <b>возвращает</b> количество чётных в списке (используя <code>is_even</code>). Код ниже уже вызывает их.', 'Write <code>is_even(n)</code> that returns <code>True</code> for even numbers, and <code>count_even(nums)</code> that <b>returns</b> how many evens are in the list (using <code>is_even</code>). The code below already calls them.'),
        how: [L('<code>return n % 2 == 0</code>', '<code>return n % 2 == 0</code>', '<code>return n % 2 == 0</code>'), L('У <code>count_even</code>: лічильник + цикл + <code>if is_even(n)</code>.', 'В <code>count_even</code>: счётчик + цикл + <code>if is_even(n)</code>.', 'In <code>count_even</code>: counter + loop + <code>if is_even(n)</code>.')],
        starter: 'def is_even(n):\n    pass\n\ndef count_even(nums):\n    pass\n\nprint(is_even(4), is_even(7))\nprint(count_even([1, 2, 3, 4, 6, 9, 10]))\n',
        solution: 'def is_even(n):\n    return n % 2 == 0\n\ndef count_even(nums):\n    count = 0\n    for n in nums:\n        if is_even(n):\n            count += 1\n    return count\n\nprint(is_even(4), is_even(7))\nprint(count_even([1, 2, 3, 4, 6, 9, 10]))\n',
        hint: L('Порівняння саме по собі дає True/False — його можна одразу повернути.', 'Сравнение само по себе даёт True/False — его можно сразу вернуть.', 'A comparison already yields True/False — return it directly.'),
        expected: 'True False\n4',
        must: /return/
      },
      quiz: { q: L('Що поверне функція без <code>return</code>?', 'Что вернёт функция без <code>return</code>?', 'What does a function without <code>return</code> return?'), options: ['0', 'None', '""'], answer: 1, explain: L('За замовчуванням — None.', 'По умолчанию — None.', 'None by default.') },
      ref: [{ code: 'return value', d: L('повернути результат', 'вернуть результат', 'return a result') }, { code: 'return a, b', d: L('кілька значень', 'несколько значений', 'several values') }]
    },
    {
      id: 'args-scope', chapter: CH5,
      title: L('Аргументи за замовчуванням і область видимості', 'Аргументы по умолчанию и область видимости', 'Default arguments and scope'),
      theory: L(
        `<p>Параметр може мати <b>значення за замовчуванням</b> — тоді аргумент можна не передавати:</p>
<pre class="inline-code">def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Ann")              # Hello, Ann!
greet("Bob", "Hi")        # Hi, Bob!
greet(greeting="Yo", name="Max")   # іменовані аргументи</pre>
<p><code>*args</code> збирає будь-яку кількість аргументів у кортеж: <code>def total(*nums): return sum(nums)</code>.</p>
<h4>Область видимості</h4>
<p>Змінні, створені <b>всередині</b> функції, — <b>локальні</b>: вони існують лише під час її виконання і не видимі ззовні. Змінні поза функціями — <b>глобальні</b>, їх можна читати всередині. Краще передавати дані через параметри і повертати через <code>return</code>, ніж змінювати глобальні змінні.</p>`,
        `<p>Параметр может иметь <b>значение по умолчанию</b> — тогда аргумент можно не передавать:</p>
<pre class="inline-code">def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Ann")              # Hello, Ann!
greet("Bob", "Hi")        # Hi, Bob!
greet(greeting="Yo", name="Max")   # именованные аргументы</pre>
<p><code>*args</code> собирает любое количество аргументов в кортеж: <code>def total(*nums): return sum(nums)</code>.</p>
<h4>Область видимости</h4>
<p>Переменные, созданные <b>внутри</b> функции, — <b>локальные</b>: они существуют только во время её выполнения и не видны снаружи. Переменные вне функций — <b>глобальные</b>, их можно читать внутри. Лучше передавать данные через параметры и возвращать через <code>return</code>, чем менять глобальные переменные.</p>`,
        `<p>A parameter can have a <b>default value</b> — then the argument is optional:</p>
<pre class="inline-code">def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Ann")              # Hello, Ann!
greet("Bob", "Hi")        # Hi, Bob!
greet(greeting="Yo", name="Max")   # keyword arguments</pre>
<p><code>*args</code> collects any number of arguments into a tuple: <code>def total(*nums): return sum(nums)</code>.</p>
<h4>Scope</h4>
<p>Variables created <b>inside</b> a function are <b>local</b>: they exist only while it runs and aren’t visible outside. Variables outside functions are <b>global</b> and can be read inside. It’s better to pass data in through parameters and out through <code>return</code> than to modify globals.</p>`),
      why: L(`<p>Локальні змінні захищають від хаосу: дві різні функції можуть мати змінну <code>i</code> і не заважати одна одній. Значення за замовчуванням роблять функції гнучкими: прості виклики залишаються простими.</p>`,
        `<p>Локальные переменные защищают от хаоса: две разные функции могут иметь переменную <code>i</code> и не мешать друг другу. Значения по умолчанию делают функции гибкими: простые вызовы остаются простыми.</p>`,
        `<p>Local variables prevent chaos: two functions can both have an <code>i</code> without interfering. Default values make functions flexible while simple calls stay simple.</p>`),
      mistakes: L(`<ul><li>Параметри зі значенням за замовчуванням мають іти <b>після</b> звичайних.</li><li>Змінний об’єкт як значення за замовчуванням (<code>def f(lst=[])</code>) — список спільний для всіх викликів! Використовуй <code>None</code>.</li><li>Намагатися прочитати локальну змінну поза функцією → <code>NameError</code>.</li></ul>`,
        `<ul><li>Параметры со значением по умолчанию должны идти <b>после</b> обычных.</li><li>Изменяемый объект как значение по умолчанию (<code>def f(lst=[])</code>) — список общий для всех вызовов! Используй <code>None</code>.</li><li>Пытаться прочитать локальную переменную вне функции → <code>NameError</code>.</li></ul>`,
        `<ul><li>Parameters with defaults must come <b>after</b> regular ones.</li><li>A mutable default (<code>def f(lst=[])</code>) — the list is shared across calls! Use <code>None</code>.</li><li>Reading a local variable outside its function → <code>NameError</code>.</li></ul>`),
      examples: [
        { title: L('За замовчуванням', 'По умолчанию', 'Defaults'), code: 'def power(base, exp=2):\n    return base ** exp\n\nprint(power(5))\nprint(power(2, 10))\nprint(power(exp=3, base=4))', note: L('Іменовані аргументи можна передавати в будь-якому порядку.', 'Именованные аргументы можно передавать в любом порядке.', 'Keyword arguments can be in any order.') },
        { title: '*args', code: 'def average(*nums):\n    return sum(nums) / len(nums)\n\nprint(average(10, 20))\nprint(average(1, 2, 3, 4, 5))', note: L('Будь-яка кількість аргументів.', 'Любое количество аргументов.', 'Any number of arguments.') },
        { title: L('Локальні змінні', 'Локальные переменные', 'Local variables'), code: 'def make_total():\n    total = 100\n    print("inside:", total)\n\ntotal = 5\nmake_total()\nprint("outside:", total)', note: L('Внутрішня <code>total</code> — інша змінна.', 'Внутренняя <code>total</code> — другая переменная.', 'The inner <code>total</code> is a different variable.') },
        { title: L('Пастка зі списком', 'Ловушка со списком', 'The list trap'), code: 'def add_bad(item, box=[]):\n    box.append(item)\n    return box\n\ndef add_good(item, box=None):\n    if box is None:\n        box = []\n    box.append(item)\n    return box\n\nprint(add_bad(1), add_bad(2))\nprint(add_good(1), add_good(2))', note: L('У першій функції список «запам’ятовується» між викликами.', 'В первой функции список «запоминается» между вызовами.', 'In the first function the list is “remembered” between calls.') }
      ],
      task: {
        text: L('Напиши функцію <code>price_with_tax(price, tax=20)</code>, що повертає ціну з податком у відсотках, округлену до 2 знаків. Виклики нижче вже готові.', 'Напиши функцию <code>price_with_tax(price, tax=20)</code>, которая возвращает цену с налогом в процентах, округлённую до 2 знаков. Вызовы ниже уже готовы.', 'Write <code>price_with_tax(price, tax=20)</code> that returns the price with a percentage tax, rounded to 2 decimals. The calls below are ready.'),
        how: [L('Формула: <code>price * (1 + tax / 100)</code>', 'Формула: <code>price * (1 + tax / 100)</code>', 'Formula: <code>price * (1 + tax / 100)</code>'), L('Поверни <code>round(..., 2)</code>.', 'Верни <code>round(..., 2)</code>.', 'Return <code>round(..., 2)</code>.')],
        starter: 'def price_with_tax(price, tax=20):\n    pass\n\nprint(price_with_tax(100))\nprint(price_with_tax(100, 7))\nprint(price_with_tax(19.99, tax=5))\n',
        solution: 'def price_with_tax(price, tax=20):\n    return round(price * (1 + tax / 100), 2)\n\nprint(price_with_tax(100))\nprint(price_with_tax(100, 7))\nprint(price_with_tax(19.99, tax=5))\n',
        hint: L('Очікувано: 120.0, 107.0, 20.99.', 'Ожидается: 120.0, 107.0, 20.99.', 'Expected: 120.0, 107.0, 20.99.'),
        expected: '120.0\n107.0\n20.99',
        must: /return/
      },
      quiz: { q: L('Де видно змінну, створену всередині функції?', 'Где видна переменная, созданная внутри функции?', 'Where is a variable created inside a function visible?'), options: [L('всюди', 'везде', 'everywhere'), L('лише всередині функції', 'только внутри функции', 'only inside the function'), L('лише після виклику', 'только после вызова', 'only after the call')], answer: 1, explain: L('Це локальна змінна.', 'Это локальная переменная.', 'It’s a local variable.') },
      ref: [{ code: 'def f(a, b=2):', d: L('значення за замовчуванням', 'значение по умолчанию', 'default value') }, { code: 'def f(*args):', d: L('довільна кількість аргументів', 'произвольное число аргументов', 'any number of arguments') }]
    },
    {
      id: 'lambda', chapter: CH5,
      title: L('lambda та сортування за ключем', 'lambda и сортировка по ключу', 'lambda and sorting by key'),
      theory: L(
        `<p>У Python функції — це теж <b>значення</b>: їх можна зберегти в змінну або передати в іншу функцію.</p>
<p><code>lambda</code> — коротка безіменна функція в один вираз:</p>
<pre class="inline-code">double = lambda x: x * 2
print(double(5))   # 10</pre>
<p>Найчастіше lambda використовують як <b>ключ</b> для сортування чи пошуку максимуму:</p>
<pre class="inline-code">words = ["kiwi", "banana", "fig"]
print(sorted(words, key=len))             # за довжиною
print(sorted(words, key=lambda w: w[-1])) # за останньою літерою</pre>
<p><code>reverse=True</code> сортує за спаданням. Так само <code>max(list, key=...)</code> і <code>min(list, key=...)</code>.</p>
<p>Функції <code>map(f, list)</code> і <code>filter(f, list)</code> застосовують функцію до кожного елемента / відбирають елементи.</p>`,
        `<p>В Python функции — это тоже <b>значения</b>: их можно сохранить в переменную или передать в другую функцию.</p>
<p><code>lambda</code> — короткая безымянная функция в одно выражение:</p>
<pre class="inline-code">double = lambda x: x * 2
print(double(5))   # 10</pre>
<p>Чаще всего lambda используют как <b>ключ</b> для сортировки или поиска максимума:</p>
<pre class="inline-code">words = ["kiwi", "banana", "fig"]
print(sorted(words, key=len))             # по длине
print(sorted(words, key=lambda w: w[-1])) # по последней букве</pre>
<p><code>reverse=True</code> сортирует по убыванию. Так же <code>max(list, key=...)</code> и <code>min(list, key=...)</code>.</p>
<p>Функции <code>map(f, list)</code> и <code>filter(f, list)</code> применяют функцию к каждому элементу / отбирают элементы.</p>`,
        `<p>In Python functions are <b>values</b> too: you can store them in variables or pass them to other functions.</p>
<p><code>lambda</code> is a short nameless one-expression function:</p>
<pre class="inline-code">double = lambda x: x * 2
print(double(5))   # 10</pre>
<p>Lambdas are most often used as a <b>key</b> for sorting or finding a max:</p>
<pre class="inline-code">words = ["kiwi", "banana", "fig"]
print(sorted(words, key=len))             # by length
print(sorted(words, key=lambda w: w[-1])) # by last letter</pre>
<p><code>reverse=True</code> sorts descending. Same for <code>max(list, key=...)</code> and <code>min(list, key=...)</code>.</p>
<p><code>map(f, list)</code> and <code>filter(f, list)</code> apply a function to each item / keep matching items.</p>`),
      why: L(`<p>Як відсортувати учнів за оцінкою, а не за іменем? Замість писати власне сортування, ти лише кажеш Python, <b>за чим</b> порівнювати — <code>key=lambda s: s[1]</code>. Решту робить вбудований швидкий алгоритм.</p>`,
        `<p>Как отсортировать учеников по оценке, а не по имени? Вместо того чтобы писать свою сортировку, ты лишь говоришь Python, <b>по чему</b> сравнивать — <code>key=lambda s: s[1]</code>. Остальное делает встроенный быстрый алгоритм.</p>`,
        `<p>How do you sort students by mark rather than name? Instead of writing your own sort, you just tell Python <b>what to compare by</b> — <code>key=lambda s: s[1]</code>. The fast built-in algorithm does the rest.</p>`),
      mistakes: L(`<ul><li><code>key=len()</code> — дужки не потрібні: передаємо саму функцію, а не результат її виклику.</li><li>Пхати в lambda складну логіку — для цього є <code>def</code>.</li></ul>`,
        `<ul><li><code>key=len()</code> — скобки не нужны: передаём саму функцию, а не результат её вызова.</li><li>Пихать в lambda сложную логику — для этого есть <code>def</code>.</li></ul>`,
        `<ul><li><code>key=len()</code> — no parentheses: pass the function itself, not its result.</li><li>Putting complex logic in a lambda — that’s what <code>def</code> is for.</li></ul>`),
      examples: [
        { title: 'lambda', code: 'square = lambda x: x * x\nadd = lambda a, b: a + b\nprint(square(6))\nprint(add(2, 3))', note: L('Коротка функція в один рядок.', 'Короткая функция в одну строку.', 'A short one-line function.') },
        { title: L('Сортування', 'Сортировка', 'Sorting'), code: 'words = ["banana", "kiwi", "apple", "fig"]\nprint(sorted(words))\nprint(sorted(words, key=len))\nprint(sorted(words, key=len, reverse=True))', note: L('<code>key</code> визначає, за чим порівнювати.', '<code>key</code> определяет, по чему сравнивать.', '<code>key</code> decides what to compare by.') },
        { title: L('Учні', 'Ученики', 'Students'), code: 'students = [("Ann", 11), ("Bob", 7), ("Kate", 12), ("Max", 9)]\nby_mark = sorted(students, key=lambda s: s[1], reverse=True)\nfor name, mark in by_mark:\n    print(name, mark)\nbest = max(students, key=lambda s: s[1])\nprint("Best:", best[0])', note: L('<code>s[1]</code> — оцінка в кортежі.', '<code>s[1]</code> — оценка в кортеже.', '<code>s[1]</code> is the mark in the tuple.') },
        { title: 'map / filter', code: 'nums = [1, 2, 3, 4, 5, 6]\nprint(list(map(lambda x: x * 10, nums)))\nprint(list(filter(lambda x: x % 2 == 0, nums)))', note: L('Те саме можна зробити генератором списку.', 'То же самое можно сделать генератором списка.', 'The same can be done with a comprehension.') }
      ],
      task: {
        text: L('Є список товарів <code>items = [("pen", 15), ("book", 120), ("bag", 450), ("eraser", 8)]</code>. Виведи назви товарів, відсортованих <b>від найдорожчого до найдешевшого</b>, кожну з нового рядка.', 'Есть список товаров <code>items = [("pen", 15), ("book", 120), ("bag", 450), ("eraser", 8)]</code>. Выведи названия товаров, отсортированных <b>от самого дорогого к самому дешёвому</b>, каждое с новой строки.', 'Given <code>items = [("pen", 15), ("book", 120), ("bag", 450), ("eraser", 8)]</code>, print the item names sorted <b>from most to least expensive</b>, one per line.'),
        how: [L('<code>sorted(items, key=lambda it: it[1], reverse=True)</code>', '<code>sorted(items, key=lambda it: it[1], reverse=True)</code>', '<code>sorted(items, key=lambda it: it[1], reverse=True)</code>'), L('Цикл і виведення першого елемента кортежу.', 'Цикл и вывод первого элемента кортежа.', 'Loop and print the first element of each tuple.')],
        starter: 'items = [("pen", 15), ("book", 120), ("bag", 450), ("eraser", 8)]\n',
        solution: 'items = [("pen", 15), ("book", 120), ("bag", 450), ("eraser", 8)]\nfor name, price in sorted(items, key=lambda it: it[1], reverse=True):\n    print(name)',
        hint: L('Порядок: bag, book, pen, eraser.', 'Порядок: bag, book, pen, eraser.', 'Order: bag, book, pen, eraser.'),
        expected: 'bag\nbook\npen\neraser',
        must: /key\s*=/
      },
      quiz: { q: L('Що поверне <code>max(["aa", "b", "cccc"], key=len)</code>?', 'Что вернёт <code>max(["aa", "b", "cccc"], key=len)</code>?', 'What does <code>max(["aa", "b", "cccc"], key=len)</code> return?'), options: ['"b"', '"cccc"', '4'], answer: 1, explain: L('Найдовший рядок.', 'Самая длинная строка.', 'The longest string.') },
      ref: [{ code: 'lambda x: x * 2', d: L('безіменна функція', 'безымянная функция', 'anonymous function') }, { code: 'sorted(lst, key=f, reverse=True)', d: L('сортування за ключем', 'сортировка по ключу', 'sort by key') }]
    },
    {
      id: 'modules', chapter: CH5,
      title: L('Модулі: math і random', 'Модули: math и random', 'Modules: math and random'),
      theory: L(
        `<p><b>Модуль</b> — файл з готовими функціями. Python має величезну «бібліотеку з батарейками». Підключаємо через <code>import</code>:</p>
<pre class="inline-code">import math
print(math.sqrt(16))    # 4.0
print(math.pi)

from random import randint
print(randint(1, 6))    # кубик</pre>
<p><b>math</b>: <code>sqrt</code>, <code>pi</code>, <code>ceil</code> (округлення вгору), <code>floor</code> (вниз), <code>gcd</code>, <code>factorial</code>.</p>
<p><b>random</b>: <code>randint(a, b)</code> — ціле від a до b включно, <code>choice(list)</code> — випадковий елемент, <code>shuffle(list)</code> — перемішати, <code>random()</code> — дріб від 0 до 1.</p>
<p><code>random.seed(42)</code> робить «випадкові» числа відтворюваними — однаковими при кожному запуску. Це корисно для тестів.</p>`,
        `<p><b>Модуль</b> — файл с готовыми функциями. У Python огромная «библиотека с батарейками». Подключаем через <code>import</code>:</p>
<pre class="inline-code">import math
print(math.sqrt(16))    # 4.0
print(math.pi)

from random import randint
print(randint(1, 6))    # кубик</pre>
<p><b>math</b>: <code>sqrt</code>, <code>pi</code>, <code>ceil</code> (округление вверх), <code>floor</code> (вниз), <code>gcd</code>, <code>factorial</code>.</p>
<p><b>random</b>: <code>randint(a, b)</code> — целое от a до b включительно, <code>choice(list)</code> — случайный элемент, <code>shuffle(list)</code> — перемешать, <code>random()</code> — дробь от 0 до 1.</p>
<p><code>random.seed(42)</code> делает «случайные» числа воспроизводимыми — одинаковыми при каждом запуске. Это полезно для тестов.</p>`,
        `<p>A <b>module</b> is a file of ready-made functions. Python ships with a huge “batteries included” library. Import with <code>import</code>:</p>
<pre class="inline-code">import math
print(math.sqrt(16))    # 4.0
print(math.pi)

from random import randint
print(randint(1, 6))    # a dice roll</pre>
<p><b>math</b>: <code>sqrt</code>, <code>pi</code>, <code>ceil</code> (round up), <code>floor</code> (round down), <code>gcd</code>, <code>factorial</code>.</p>
<p><b>random</b>: <code>randint(a, b)</code> — an integer from a to b inclusive, <code>choice(list)</code> — a random item, <code>shuffle(list)</code> — shuffle, <code>random()</code> — a float from 0 to 1.</p>
<p><code>random.seed(42)</code> makes “random” numbers reproducible — the same every run. Useful for tests.</p>`),
      why: L(`<p>Не треба винаходити колесо: тисячі розробників уже написали й перевірили функції для математики, дат, інтернету, ігор. Уміння знайти і підключити потрібний модуль — одна з головних навичок програміста.</p>`,
        `<p>Не нужно изобретать колесо: тысячи разработчиков уже написали и проверили функции для математики, дат, интернета, игр. Умение найти и подключить нужный модуль — один из главных навыков программиста.</p>`,
        `<p>No need to reinvent the wheel: thousands of developers have already written and tested functions for maths, dates, the internet, games. Knowing how to find and import the right module is a core programming skill.</p>`),
      mistakes: L(`<ul><li>Забути <code>import</code> → <code>NameError: name 'math' is not defined</code>.</li><li>Назвати свій файл <code>random.py</code> — Python підключить його замість стандартного модуля.</li><li><code>randint(1, 6)</code> включає 6, а <code>range(1, 6)</code> — ні.</li></ul>`,
        `<ul><li>Забыть <code>import</code> → <code>NameError: name 'math' is not defined</code>.</li><li>Назвать свой файл <code>random.py</code> — Python подключит его вместо стандартного модуля.</li><li><code>randint(1, 6)</code> включает 6, а <code>range(1, 6)</code> — нет.</li></ul>`,
        `<ul><li>Forgetting <code>import</code> → <code>NameError: name 'math' is not defined</code>.</li><li>Naming your file <code>random.py</code> — Python imports it instead of the standard module.</li><li><code>randint(1, 6)</code> includes 6, <code>range(1, 6)</code> doesn’t.</li></ul>`),
      examples: [
        { title: 'math', code: 'import math\nprint(math.sqrt(81))\nprint(round(math.pi, 4))\nprint(math.ceil(4.1), math.floor(4.9))\nprint(math.factorial(5))\nprint(math.gcd(12, 18))', note: L('Звертаємося через <code>math.</code>.', 'Обращаемся через <code>math.</code>.', 'Access via <code>math.</code>.') },
        { title: L('Кубик', 'Кубик', 'Dice'), code: 'import random\nfor _ in range(5):\n    print(random.randint(1, 6), end=" ")', note: L('Запусти кілька разів — результат щоразу інший.', 'Запусти несколько раз — результат каждый раз другой.', 'Run it a few times — the result differs each time.') },
        { title: 'choice / shuffle', code: 'import random\nmoves = ["rock", "paper", "scissors"]\nprint("Computer:", random.choice(moves))\ncards = [1, 2, 3, 4, 5]\nrandom.shuffle(cards)\nprint(cards)', note: L('Гра «камінь-ножиці-папір» починається тут.', 'Игра «камень-ножницы-бумага» начинается здесь.', 'Rock-paper-scissors starts here.') },
        { title: 'from ... import', code: 'from math import sqrt, pi\nr = 3\nprint(f"Area: {pi * r ** 2:.2f}")\nprint(f"Diagonal of 3x4: {sqrt(3**2 + 4**2)}")', note: L('Імпорт конкретних імен — без префікса <code>math.</code>.', 'Импорт конкретных имён — без префикса <code>math.</code>.', 'Import specific names — no <code>math.</code> prefix.') }
      ],
      task: {
        text: L('Програма отримує катети прямокутного трикутника (тест: <code>6</code> і <code>8</code>, кожен з нового рядка). Обчисли гіпотенузу через <code>math.sqrt</code> і виведи її. Потім виведи площу кола радіусом, що дорівнює гіпотенузі, з двома знаками після крапки.', 'Программа получает катеты прямоугольного треугольника (тест: <code>6</code> и <code>8</code>, каждый с новой строки). Вычисли гипотенузу через <code>math.sqrt</code> и выведи её. Затем выведи площадь круга радиусом, равным гипотенузе, с двумя знаками после точки.', 'The program reads the legs of a right triangle (test: <code>6</code> and <code>8</code>, one per line). Compute the hypotenuse with <code>math.sqrt</code> and print it. Then print the area of a circle whose radius is the hypotenuse, with two decimals.'),
        how: [L('<code>import math</code>', '<code>import math</code>', '<code>import math</code>'), L('<code>c = math.sqrt(a ** 2 + b ** 2)</code>', '<code>c = math.sqrt(a ** 2 + b ** 2)</code>', '<code>c = math.sqrt(a ** 2 + b ** 2)</code>'), L('<code>f"{math.pi * c ** 2:.2f}"</code>', '<code>f"{math.pi * c ** 2:.2f}"</code>', '<code>f"{math.pi * c ** 2:.2f}"</code>')],
        starter: '',
        stdin: '6\n8',
        solution: 'import math\na = int(input())\nb = int(input())\nc = math.sqrt(a ** 2 + b ** 2)\nprint(c)\nprint(f"{math.pi * c ** 2:.2f}")',
        hint: L('Гіпотенуза 10.0, площа 314.16.', 'Гипотенуза 10.0, площадь 314.16.', 'Hypotenuse 10.0, area 314.16.'),
        expected: '10.0\n314.16',
        must: /import\s+math|from\s+math/
      },
      quiz: { q: L('Яке з чисел НЕ може повернути <code>randint(1, 3)</code>?', 'Какое из чисел НЕ может вернуть <code>randint(1, 3)</code>?', 'Which number can <code>randint(1, 3)</code> NOT return?'), options: ['1', '3', '4'], answer: 2, explain: L('Діапазон 1–3 включно.', 'Диапазон 1–3 включительно.', 'The range is 1–3 inclusive.') },
      ref: [{ code: 'import math', d: L('підключити модуль', 'подключить модуль', 'import a module') }, { code: 'random.randint(a, b)', d: L('випадкове ціле', 'случайное целое', 'random integer') }, { code: 'random.choice(lst)', d: L('випадковий елемент', 'случайный элемент', 'random item') }]
    },
    {
      id: 'try-except', chapter: CH6,
      title: L('Обробка помилок: try / except', 'Обработка ошибок: try / except', 'Handling errors: try / except'),
      theory: L(
        `<p>Деякі помилки неможливо передбачити: користувач ввів «abc» замість числа, файл не знайдено, ділення на нуль. Щоб програма не «падала», використовують <code>try</code>/<code>except</code>:</p>
<pre class="inline-code">try:
    age = int(input())
    print("In 10 years:", age + 10)
except ValueError:
    print("That is not a number!")</pre>
<p>Python виконує блок <code>try</code>. Якщо в ньому виникає помилка вказаного типу, виконання переходить у <code>except</code>, і програма працює далі.</p>
<ul><li>Кілька <code>except</code> для різних помилок: <code>except ZeroDivisionError:</code></li><li><code>except ValueError as e:</code> — отримати текст помилки</li><li><code>else:</code> — якщо помилки не було, <code>finally:</code> — виконується завжди</li><li><code>raise ValueError("...")</code> — викликати помилку самому</li></ul>`,
        `<p>Некоторые ошибки невозможно предусмотреть: пользователь ввёл «abc» вместо числа, файл не найден, деление на ноль. Чтобы программа не «падала», используют <code>try</code>/<code>except</code>:</p>
<pre class="inline-code">try:
    age = int(input())
    print("In 10 years:", age + 10)
except ValueError:
    print("That is not a number!")</pre>
<p>Python выполняет блок <code>try</code>. Если в нём возникает ошибка указанного типа, выполнение переходит в <code>except</code>, и программа работает дальше.</p>
<ul><li>Несколько <code>except</code> для разных ошибок: <code>except ZeroDivisionError:</code></li><li><code>except ValueError as e:</code> — получить текст ошибки</li><li><code>else:</code> — если ошибки не было, <code>finally:</code> — выполняется всегда</li><li><code>raise ValueError("...")</code> — вызвать ошибку самому</li></ul>`,
        `<p>Some errors can’t be foreseen: the user typed “abc” instead of a number, a file is missing, division by zero. To keep the program from crashing, use <code>try</code>/<code>except</code>:</p>
<pre class="inline-code">try:
    age = int(input())
    print("In 10 years:", age + 10)
except ValueError:
    print("That is not a number!")</pre>
<p>Python runs the <code>try</code> block. If an error of the given type occurs, execution jumps to <code>except</code> and the program carries on.</p>
<ul><li>Several <code>except</code> blocks for different errors: <code>except ZeroDivisionError:</code></li><li><code>except ValueError as e:</code> — get the error text</li><li><code>else:</code> — if no error, <code>finally:</code> — always runs</li><li><code>raise ValueError("...")</code> — raise an error yourself</li></ul>`),
      why: L(`<p>Реальні користувачі роблять усе, чого ти не чекаєш. Програма, яка падає від одного неправильного символу, — погана програма. <code>try/except</code> дозволяє зрозуміло пояснити проблему і дати другий шанс.</p>`,
        `<p>Реальные пользователи делают всё, чего ты не ждёшь. Программа, которая падает от одного неправильного символа, — плохая программа. <code>try/except</code> позволяет понятно объяснить проблему и дать второй шанс.</p>`,
        `<p>Real users do everything you don’t expect. A program that crashes on one wrong character is a bad program. <code>try/except</code> lets you explain the problem clearly and give a second chance.</p>`),
      mistakes: L(`<ul><li>Голий <code>except:</code> без типу ловить <b>усе</b>, навіть твої опечатки — помилки ховаються. Вказуй конкретний тип.</li><li>Загортати в <code>try</code> забагато коду — важко зрозуміти, що саме зламалося.</li></ul>`,
        `<ul><li>Голый <code>except:</code> без типа ловит <b>всё</b>, даже твои опечатки — ошибки прячутся. Указывай конкретный тип.</li><li>Оборачивать в <code>try</code> слишком много кода — сложно понять, что именно сломалось.</li></ul>`,
        `<ul><li>A bare <code>except:</code> catches <b>everything</b>, even your typos — bugs get hidden. Name the specific type.</li><li>Wrapping too much code in <code>try</code> — hard to tell what actually broke.</li></ul>`),
      examples: [
        { title: 'ValueError', code: 'for text in ["42", "abc", "7"]:\n    try:\n        n = int(text)\n        print(n, "squared is", n * n)\n    except ValueError:\n        print(f"\'{text}\' is not a number")', note: L('Програма не падає на «abc».', 'Программа не падает на «abc».', 'The program survives “abc”.') },
        { title: L('Кілька типів', 'Несколько типов', 'Several types'), code: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "cannot divide by zero"\n    except TypeError:\n        return "numbers only"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))\nprint(safe_divide(10, "x"))', note: L('Різні помилки — різні повідомлення.', 'Разные ошибки — разные сообщения.', 'Different errors — different messages.') },
        { title: 'else / finally', code: 'try:\n    value = int("15")\nexcept ValueError:\n    print("bad")\nelse:\n    print("ok:", value)\nfinally:\n    print("always runs")', note: L('<code>finally</code> — для «прибирання» (закрити файл тощо).', '<code>finally</code> — для «уборки» (закрыть файл и т.п.).', '<code>finally</code> is for cleanup (closing files etc.).') },
        { title: 'raise', code: 'def set_age(age):\n    if age < 0:\n        raise ValueError("age cannot be negative")\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print("Error:", e)', note: L('Свої правила перевірки даних.', 'Свои правила проверки данных.', 'Your own validation rules.') }
      ],
      task: {
        text: L('Програма отримує 4 рядки (тест: <code>10</code>, <code>abc</code>, <code>0</code>, <code>4</code>). Для кожного спробуй обчислити <code>100 / число</code> і виведи результат. Якщо це не число — виведи <code>not a number</code>, якщо нуль — <code>division by zero</code>.', 'Программа получает 4 строки (тест: <code>10</code>, <code>abc</code>, <code>0</code>, <code>4</code>). Для каждой попробуй вычислить <code>100 / число</code> и выведи результат. Если это не число — выведи <code>not a number</code>, если ноль — <code>division by zero</code>.', 'The program reads 4 lines (test: <code>10</code>, <code>abc</code>, <code>0</code>, <code>4</code>). For each, try computing <code>100 / number</code> and print the result. If it’s not a number print <code>not a number</code>, if zero — <code>division by zero</code>.'),
        how: [L('<code>for _ in range(4):</code> і <code>text = input()</code>', '<code>for _ in range(4):</code> и <code>text = input()</code>', '<code>for _ in range(4):</code> and <code>text = input()</code>'), L('У <code>try</code>: <code>print(100 / int(text))</code>', 'В <code>try</code>: <code>print(100 / int(text))</code>', 'In <code>try</code>: <code>print(100 / int(text))</code>'), L('Два <code>except</code>: <code>ValueError</code> і <code>ZeroDivisionError</code>.', 'Два <code>except</code>: <code>ValueError</code> и <code>ZeroDivisionError</code>.', 'Two <code>except</code>s: <code>ValueError</code> and <code>ZeroDivisionError</code>.')],
        starter: '',
        stdin: '10\nabc\n0\n4',
        solution: 'for _ in range(4):\n    text = input()\n    try:\n        print(100 / int(text))\n    except ValueError:\n        print("not a number")\n    except ZeroDivisionError:\n        print("division by zero")',
        hint: L('Очікувано: 10.0, not a number, division by zero, 25.0.', 'Ожидается: 10.0, not a number, division by zero, 25.0.', 'Expected: 10.0, not a number, division by zero, 25.0.'),
        expected: '10.0\nnot a number\ndivision by zero\n25.0',
        must: /except\s+ValueError[\s\S]*except\s+ZeroDivisionError|except\s+ZeroDivisionError[\s\S]*except\s+ValueError/
      },
      quiz: { q: L('Коли виконується блок <code>finally</code>?', 'Когда выполняется блок <code>finally</code>?', 'When does the <code>finally</code> block run?'), options: [L('лише при помилці', 'только при ошибке', 'only on error'), L('лише без помилки', 'только без ошибки', 'only without error'), L('завжди', 'всегда', 'always')], answer: 2, explain: L('Незалежно від помилки.', 'Независимо от ошибки.', 'Regardless of errors.') },
      ref: [{ code: 'try: ... except ValueError:', d: L('перехопити помилку', 'перехватить ошибку', 'catch an error') }, { code: 'raise ValueError("msg")', d: L('викликати помилку', 'вызвать ошибку', 'raise an error') }]
    },
    {
      id: 'files', chapter: CH6,
      title: L('Робота з файлами', 'Работа с файлами', 'Working with files'),
      theory: L(
        `<p>Програми зберігають дані у <b>файлах</b>, щоб вони не зникали після завершення. Файл відкривають функцією <code>open(ім’я, режим)</code>:</p>
<ul><li><code>"w"</code> — записати (створює файл або <b>стирає</b> старий вміст)</li><li><code>"a"</code> — дописати в кінець</li><li><code>"r"</code> — прочитати (за замовчуванням)</li></ul>
<p>Найкраще відкривати через <code>with</code> — тоді файл <b>закриється автоматично</b>:</p>
<pre class="inline-code">with open("notes.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")

with open("notes.txt") as f:
    for line in f:
        print(line.strip())</pre>
<p><code>f.read()</code> — увесь вміст одним рядком, <code>f.readlines()</code> — список рядків.</p>
<div class="tip">💡 Python у Codry має власну віртуальну файлову систему, тож ці приклади справді працюють.</div>`,
        `<p>Программы хранят данные в <b>файлах</b>, чтобы они не исчезали после завершения. Файл открывают функцией <code>open(имя, режим)</code>:</p>
<ul><li><code>"w"</code> — записать (создаёт файл или <b>стирает</b> старое содержимое)</li><li><code>"a"</code> — дописать в конец</li><li><code>"r"</code> — прочитать (по умолчанию)</li></ul>
<p>Лучше всего открывать через <code>with</code> — тогда файл <b>закроется автоматически</b>:</p>
<pre class="inline-code">with open("notes.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")

with open("notes.txt") as f:
    for line in f:
        print(line.strip())</pre>
<p><code>f.read()</code> — всё содержимое одной строкой, <code>f.readlines()</code> — список строк.</p>
<div class="tip">💡 Python в Codry имеет свою виртуальную файловую систему, так что эти примеры действительно работают.</div>`,
        `<p>Programs store data in <b>files</b> so it survives after they finish. Open a file with <code>open(name, mode)</code>:</p>
<ul><li><code>"w"</code> — write (creates the file or <b>erases</b> old content)</li><li><code>"a"</code> — append to the end</li><li><code>"r"</code> — read (the default)</li></ul>
<p>Open files with <code>with</code> so they <b>close automatically</b>:</p>
<pre class="inline-code">with open("notes.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")

with open("notes.txt") as f:
    for line in f:
        print(line.strip())</pre>
<p><code>f.read()</code> returns everything as one string, <code>f.readlines()</code> a list of lines.</p>
<div class="tip">💡 Python in Codry has its own virtual file system, so these examples really work.</div>`),
      why: L(`<p>Чому <code>with</code>? Відкритий файл займає ресурси системи, а незакритий може не зберегти останні дані. <code>with</code> гарантує закриття навіть якщо всередині сталася помилка — тобі не треба про це пам’ятати.</p>`,
        `<p>Почему <code>with</code>? Открытый файл занимает ресурсы системы, а незакрытый может не сохранить последние данные. <code>with</code> гарантирует закрытие даже если внутри произошла ошибка — тебе не нужно об этом помнить.</p>`,
        `<p>Why <code>with</code>? An open file holds system resources, and an unclosed one may lose the last data written. <code>with</code> guarantees closing even if an error happens inside — you don’t have to remember.</p>`),
      mistakes: L(`<ul><li>Режим <code>"w"</code> стирає файл — для додавання використовуй <code>"a"</code>.</li><li><code>write()</code> не додає перенос рядка сам — пиши <code>\\n</code>.</li><li>Читати неіснуючий файл → <code>FileNotFoundError</code>.</li></ul>`,
        `<ul><li>Режим <code>"w"</code> стирает файл — для добавления используй <code>"a"</code>.</li><li><code>write()</code> не добавляет перенос строки сам — пиши <code>\\n</code>.</li><li>Читать несуществующий файл → <code>FileNotFoundError</code>.</li></ul>`,
        `<ul><li><code>"w"</code> erases the file — use <code>"a"</code> to append.</li><li><code>write()</code> doesn’t add a newline — write <code>\\n</code> yourself.</li><li>Reading a missing file → <code>FileNotFoundError</code>.</li></ul>`),
      examples: [
        { title: L('Запис і читання', 'Запись и чтение', 'Write and read'), code: 'with open("hello.txt", "w") as f:\n    f.write("Hello, file!\\n")\n    f.write("Second line\\n")\n\nwith open("hello.txt") as f:\n    print(f.read())', note: L('Файл створюється, потім читається.', 'Файл создаётся, потом читается.', 'The file is created, then read.') },
        { title: L('Дописування', 'Дописывание', 'Appending'), code: 'with open("log.txt", "w") as f:\n    f.write("start\\n")\nfor i in range(3):\n    with open("log.txt", "a") as f:\n        f.write(f"event {i}\\n")\nwith open("log.txt") as f:\n    print(f.readlines())', note: L('Режим <code>"a"</code> не стирає старий вміст.', 'Режим <code>"a"</code> не стирает старое содержимое.', 'Mode <code>"a"</code> keeps old content.') },
        { title: L('Рядок за рядком', 'Построчно', 'Line by line'), code: 'with open("scores.txt", "w") as f:\n    f.write("Ann,11\\nBob,7\\nKate,12\\n")\n\ntotal = 0\nwith open("scores.txt") as f:\n    for line in f:\n        name, score = line.strip().split(",")\n        total += int(score)\n        print(name, score)\nprint("Total:", total)', note: L('Простий формат CSV: значення через кому.', 'Простой формат CSV: значения через запятую.', 'Simple CSV: comma-separated values.') },
        { title: 'FileNotFoundError', code: 'try:\n    with open("missing.txt") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print("No such file — creating it")\n    with open("missing.txt", "w") as f:\n        f.write("created")', note: L('Обробка відсутнього файлу.', 'Обработка отсутствующего файла.', 'Handling a missing file.') }
      ],
      task: {
        text: L('Запиши у файл <code>shop.txt</code> три рядки: <code>milk,45</code>, <code>bread,30</code>, <code>cheese,120</code>. Потім прочитай файл, виведи кожен товар у форматі <code>milk: 45</code> і в кінці <code>Total: 195</code>.', 'Запиши в файл <code>shop.txt</code> три строки: <code>milk,45</code>, <code>bread,30</code>, <code>cheese,120</code>. Затем прочитай файл, выведи каждый товар в формате <code>milk: 45</code> и в конце <code>Total: 195</code>.', 'Write three lines to <code>shop.txt</code>: <code>milk,45</code>, <code>bread,30</code>, <code>cheese,120</code>. Then read the file, print each item as <code>milk: 45</code> and finally <code>Total: 195</code>.'),
        how: [L('Запис: <code>with open("shop.txt", "w") as f:</code> і <code>f.write(...)</code> з <code>\\n</code>.', 'Запись: <code>with open("shop.txt", "w") as f:</code> и <code>f.write(...)</code> с <code>\\n</code>.', 'Write: <code>with open("shop.txt", "w") as f:</code> and <code>f.write(...)</code> with <code>\\n</code>.'), L('Читання: цикл по рядках, <code>split(",")</code>, накопичення суми.', 'Чтение: цикл по строкам, <code>split(",")</code>, накопление суммы.', 'Read: loop over lines, <code>split(",")</code>, sum up.')],
        starter: '',
        solution: 'with open("shop.txt", "w") as f:\n    f.write("milk,45\\nbread,30\\ncheese,120\\n")\n\ntotal = 0\nwith open("shop.txt") as f:\n    for line in f:\n        item, price = line.strip().split(",")\n        print(f"{item}: {price}")\n        total += int(price)\nprint("Total:", total)',
        hint: L('Не забудь <code>strip()</code>, щоб прибрати <code>\\n</code> перед <code>split</code>.', 'Не забудь <code>strip()</code>, чтобы убрать <code>\\n</code> перед <code>split</code>.', 'Remember <code>strip()</code> to remove <code>\\n</code> before <code>split</code>.'),
        expected: 'milk: 45\nbread: 30\ncheese: 120\nTotal: 195',
        must: /open\s*\(/
      },
      quiz: { q: L('Який режим додає дані в кінець файлу?', 'Какой режим добавляет данные в конец файла?', 'Which mode appends to the end of a file?'), options: ['"w"', '"a"', '"r"'], answer: 1, explain: L('a — append.', 'a — append.', 'a — append.') },
      ref: [{ code: 'with open(f, "w") as f:', d: L('запис у файл', 'запись в файл', 'write a file') }, { code: 'for line in f:', d: L('читання по рядках', 'чтение по строкам', 'read line by line') }]
    },
    {
      id: 'classes', chapter: CH6,
      title: L('Класи та об’єкти', 'Классы и объекты', 'Classes and objects'),
      theory: L(
        `<p><b>Клас</b> — це креслення, за яким створюються <b>об’єкти</b>. Об’єкт поєднує дані (<b>атрибути</b>) і дії (<b>методи</b>).</p>
<pre class="inline-code">class Pet:
    def __init__(self, name, kind):
        self.name = name
        self.kind = kind
        self.happy = 5

    def play(self):
        self.happy += 1
        print(f"{self.name} is happy: {self.happy}")

rex = Pet("Rex", "dog")
rex.play()</pre>
<ul><li><code>__init__</code> — <b>конструктор</b>, викликається при створенні об’єкта.</li><li><code>self</code> — посилання на сам об’єкт; через нього метод отримує доступ до своїх атрибутів.</li><li><code>Pet("Rex", "dog")</code> — створення об’єкта (екземпляра класу).</li></ul>
<p>Метод <code>__str__</code> визначає, як об’єкт виглядає в <code>print()</code>.</p>`,
        `<p><b>Класс</b> — это чертёж, по которому создаются <b>объекты</b>. Объект объединяет данные (<b>атрибуты</b>) и действия (<b>методы</b>).</p>
<pre class="inline-code">class Pet:
    def __init__(self, name, kind):
        self.name = name
        self.kind = kind
        self.happy = 5

    def play(self):
        self.happy += 1
        print(f"{self.name} is happy: {self.happy}")

rex = Pet("Rex", "dog")
rex.play()</pre>
<ul><li><code>__init__</code> — <b>конструктор</b>, вызывается при создании объекта.</li><li><code>self</code> — ссылка на сам объект; через неё метод получает доступ к своим атрибутам.</li><li><code>Pet("Rex", "dog")</code> — создание объекта (экземпляра класса).</li></ul>
<p>Метод <code>__str__</code> определяет, как объект выглядит в <code>print()</code>.</p>`,
        `<p>A <b>class</b> is a blueprint for creating <b>objects</b>. An object combines data (<b>attributes</b>) and actions (<b>methods</b>).</p>
<pre class="inline-code">class Pet:
    def __init__(self, name, kind):
        self.name = name
        self.kind = kind
        self.happy = 5

    def play(self):
        self.happy += 1
        print(f"{self.name} is happy: {self.happy}")

rex = Pet("Rex", "dog")
rex.play()</pre>
<ul><li><code>__init__</code> is the <b>constructor</b>, called when an object is created.</li><li><code>self</code> refers to the object itself; methods use it to reach their attributes.</li><li><code>Pet("Rex", "dog")</code> creates an object (an instance of the class).</li></ul>
<p>The <code>__str__</code> method defines how an object looks in <code>print()</code>.</p>`),
      why: L(`<p>У грі сотні ворогів, у кожного своє здоров’я, позиція та поведінка. Клас <code>Enemy</code> описує це один раз, а потім ти створюєш скільки завгодно об’єктів. Це <b>об’єктно-орієнтоване програмування</b> (ООП) — основа великих програм.</p>`,
        `<p>В игре сотни врагов, у каждого своё здоровье, позиция и поведение. Класс <code>Enemy</code> описывает это один раз, а потом ты создаёшь сколько угодно объектов. Это <b>объектно-ориентированное программирование</b> (ООП) — основа больших программ.</p>`,
        `<p>A game has hundreds of enemies, each with its own health, position and behaviour. An <code>Enemy</code> class describes it once, then you create as many objects as you like. This is <b>object-oriented programming</b> (OOP) — the backbone of large programs.</p>`),
      mistakes: L(`<ul><li>Забути <code>self</code> першим параметром методу → <code>TypeError</code> при виклику.</li><li>Писати <code>name = name</code> замість <code>self.name = name</code> — атрибут не збережеться.</li><li>Один підкреслювальний символ замість двох: <code>_init_</code>.</li></ul>`,
        `<ul><li>Забыть <code>self</code> первым параметром метода → <code>TypeError</code> при вызове.</li><li>Писать <code>name = name</code> вместо <code>self.name = name</code> — атрибут не сохранится.</li><li>Одно подчёркивание вместо двух: <code>_init_</code>.</li></ul>`,
        `<ul><li>Forgetting <code>self</code> as the first method parameter → <code>TypeError</code> on call.</li><li>Writing <code>name = name</code> instead of <code>self.name = name</code> — the attribute isn’t stored.</li><li>One underscore instead of two: <code>_init_</code>.</li></ul>`),
      examples: [
        { title: L('Перший клас', 'Первый класс', 'First class'), code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        print(f"{self.name}: Woof!")\n\na = Dog("Rex")\nb = Dog("Bim")\na.bark()\nb.bark()', note: L('Два об’єкти з одного класу.', 'Два объекта из одного класса.', 'Two objects from one class.') },
        { title: L('Стан об’єкта', 'Состояние объекта', 'Object state'), code: 'class Counter:\n    def __init__(self):\n        self.value = 0\n\n    def click(self):\n        self.value += 1\n\nc = Counter()\nfor _ in range(3):\n    c.click()\nprint(c.value)', note: L('Об’єкт пам’ятає свої дані між викликами.', 'Объект помнит свои данные между вызовами.', 'The object remembers its data between calls.') },
        { title: '__str__', code: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\np = Point(3, 4)\nprint(p)\nprint("Point:", p)', note: L('<code>__str__</code> повертає рядок для print.', '<code>__str__</code> возвращает строку для print.', '<code>__str__</code> returns the string for print.') },
        { title: L('Банківський рахунок', 'Банковский счёт', 'Bank account'), code: 'class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            print("Not enough money")\n            return\n        self.balance -= amount\n\nacc = Account("Ira", 100)\nacc.deposit(50)\nacc.withdraw(500)\nacc.withdraw(30)\nprint(acc.owner, acc.balance)', note: L('Методи захищають дані від неправильних змін.', 'Методы защищают данные от неправильных изменений.', 'Methods protect data from invalid changes.') }
      ],
      task: {
        text: L('Створи клас <code>Hero</code> з атрибутами <code>name</code> і <code>hp</code> (за замовчуванням 100) та методом <code>hit(damage)</code>, що зменшує <code>hp</code>, але не нижче 0. Метод <code>__str__</code> має повертати <code>Name (hp)</code>. Код нижче вже готовий.', 'Создай класс <code>Hero</code> с атрибутами <code>name</code> и <code>hp</code> (по умолчанию 100) и методом <code>hit(damage)</code>, уменьшающим <code>hp</code>, но не ниже 0. Метод <code>__str__</code> должен возвращать <code>Name (hp)</code>. Код ниже уже готов.', 'Create a class <code>Hero</code> with attributes <code>name</code> and <code>hp</code> (default 100) and a method <code>hit(damage)</code> that lowers <code>hp</code> but not below 0. <code>__str__</code> should return <code>Name (hp)</code>. The code below is ready.'),
        how: [L('<code>def __init__(self, name, hp=100):</code>', '<code>def __init__(self, name, hp=100):</code>', '<code>def __init__(self, name, hp=100):</code>'), L('У <code>hit</code>: <code>self.hp = max(0, self.hp - damage)</code>', 'В <code>hit</code>: <code>self.hp = max(0, self.hp - damage)</code>', 'In <code>hit</code>: <code>self.hp = max(0, self.hp - damage)</code>'), L('<code>__str__</code> повертає f-рядок.', '<code>__str__</code> возвращает f-строку.', '<code>__str__</code> returns an f-string.')],
        starter: 'class Hero:\n    pass\n\nh = Hero("Link")\nprint(h)\nh.hit(30)\nprint(h)\nh.hit(100)\nprint(h)\n',
        solution: 'class Hero:\n    def __init__(self, name, hp=100):\n        self.name = name\n        self.hp = hp\n\n    def hit(self, damage):\n        self.hp = max(0, self.hp - damage)\n\n    def __str__(self):\n        return f"{self.name} ({self.hp})"\n\nh = Hero("Link")\nprint(h)\nh.hit(30)\nprint(h)\nh.hit(100)\nprint(h)\n',
        hint: L('Очікувано: Link (100), Link (70), Link (0).', 'Ожидается: Link (100), Link (70), Link (0).', 'Expected: Link (100), Link (70), Link (0).'),
        expected: 'Link (100)\nLink (70)\nLink (0)',
        must: /class\s+Hero[\s\S]*__init__[\s\S]*__str__/
      },
      quiz: { q: L('Що таке <code>self</code>?', 'Что такое <code>self</code>?', 'What is <code>self</code>?'), options: [L('назва класу', 'название класса', 'the class name'), L('посилання на поточний об’єкт', 'ссылка на текущий объект', 'a reference to the current object'), L('глобальна змінна', 'глобальная переменная', 'a global variable')], answer: 1, explain: L('Через self метод бачить дані свого об’єкта.', 'Через self метод видит данные своего объекта.', 'Through self a method sees its object’s data.') },
      ref: [{ code: 'class Name:', d: L('оголосити клас', 'объявить класс', 'define a class') }, { code: 'def __init__(self, ...):', d: L('конструктор', 'конструктор', 'constructor') }, { code: 'obj = Name(...)', d: L('створити об’єкт', 'создать объект', 'create an object') }]
    },
    {
      id: 'inheritance', chapter: CH6,
      title: L('Наслідування', 'Наследование', 'Inheritance'),
      theory: L(
        `<p><b>Наслідування</b> дозволяє створити новий клас на основі існуючого: дочірній клас отримує всі атрибути й методи батьківського і може додати свої або змінити наявні.</p>
<pre class="inline-code">class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):          # перевизначення
        return "Meow"</pre>
<p><code>super()</code> викликає метод батьківського класу — зазвичай у конструкторі, щоб не дублювати код:</p>
<pre class="inline-code">class Boss(Enemy):
    def __init__(self, name):
        super().__init__(name, hp=500)</pre>
<p><code>isinstance(obj, Class)</code> перевіряє, чи об’єкт належить до класу (або його нащадка).</p>`,
        `<p><b>Наследование</b> позволяет создать новый класс на основе существующего: дочерний класс получает все атрибуты и методы родительского и может добавить свои или изменить имеющиеся.</p>
<pre class="inline-code">class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):          # переопределение
        return "Meow"</pre>
<p><code>super()</code> вызывает метод родительского класса — обычно в конструкторе, чтобы не дублировать код:</p>
<pre class="inline-code">class Boss(Enemy):
    def __init__(self, name):
        super().__init__(name, hp=500)</pre>
<p><code>isinstance(obj, Class)</code> проверяет, принадлежит ли объект классу (или его наследнику).</p>`,
        `<p><b>Inheritance</b> lets you build a new class on top of an existing one: the child class gets all of the parent’s attributes and methods and can add its own or override them.</p>
<pre class="inline-code">class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):          # override
        return "Meow"</pre>
<p><code>super()</code> calls the parent’s method — usually in the constructor, to avoid duplicating code:</p>
<pre class="inline-code">class Boss(Enemy):
    def __init__(self, name):
        super().__init__(name, hp=500)</pre>
<p><code>isinstance(obj, Class)</code> checks whether an object belongs to a class (or a subclass).</p>`),
      why: L(`<p>Кіт, собака і папуга — усі тварини: в усіх є ім’я, усі їдять. Спільне описуємо в <code>Animal</code> один раз, а відмінності — у нащадках. Плюс <b>поліморфізм</b>: можна викликати <code>speak()</code> для списку різних тварин, і кожна відповість по-своєму.</p>`,
        `<p>Кот, собака и попугай — все животные: у всех есть имя, все едят. Общее описываем в <code>Animal</code> один раз, а различия — в наследниках. Плюс <b>полиморфизм</b>: можно вызвать <code>speak()</code> для списка разных животных, и каждое ответит по-своему.</p>`,
        `<p>A cat, a dog and a parrot are all animals: they all have names and eat. The shared parts go into <code>Animal</code> once, the differences into subclasses. Plus <b>polymorphism</b>: call <code>speak()</code> on a list of different animals and each answers in its own way.</p>`),
      mistakes: L(`<ul><li>Перевизначити <code>__init__</code> і забути <code>super().__init__(...)</code> — атрибути батька не створяться.</li><li>Наслідувати «заради наслідування»: якщо класи не пов’язані зв’язком «є різновидом», наслідування не потрібне.</li></ul>`,
        `<ul><li>Переопределить <code>__init__</code> и забыть <code>super().__init__(...)</code> — атрибуты родителя не создадутся.</li><li>Наследовать «ради наследования»: если классы не связаны отношением «является разновидностью», наследование не нужно.</li></ul>`,
        `<ul><li>Overriding <code>__init__</code> and forgetting <code>super().__init__(...)</code> — the parent’s attributes won’t exist.</li><li>Inheriting for the sake of it: if there’s no “is a kind of” relationship, don’t inherit.</li></ul>`),
      examples: [
        { title: L('Тварини', 'Животные', 'Animals'), code: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return "..."\n\nclass Cat(Animal):\n    def speak(self):\n        return "Meow"\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\n\nfor a in [Cat("Murka"), Dog("Rex"), Animal("Fish")]:\n    print(a.name, "says", a.speak())', note: L('Поліморфізм: один виклик, різна поведінка.', 'Полиморфизм: один вызов, разное поведение.', 'Polymorphism: one call, different behaviour.') },
        { title: 'super()', code: 'class Enemy:\n    def __init__(self, name, hp=50):\n        self.name = name\n        self.hp = hp\n\nclass Boss(Enemy):\n    def __init__(self, name):\n        super().__init__(name, hp=500)\n        self.phase = 1\n\nb = Boss("Dragon")\nprint(b.name, b.hp, b.phase)', note: L('Батьківський конструктор + власні атрибути.', 'Родительский конструктор + свои атрибуты.', 'Parent constructor + own attributes.') },
        { title: L('Розширення методу', 'Расширение метода', 'Extending a method'), code: 'class Shape:\n    def describe(self):\n        return "I am a shape"\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def describe(self):\n        return super().describe() + f", a square with side {self.side}"\n\nprint(Square(4).describe())', note: L('Дочірній метод використовує батьківський.', 'Дочерний метод использует родительский.', 'The child method builds on the parent’s.') },
        { title: 'isinstance', code: 'class Vehicle: pass\nclass Car(Vehicle): pass\nclass Bike(Vehicle): pass\n\nc = Car()\nprint(isinstance(c, Car))\nprint(isinstance(c, Vehicle))\nprint(isinstance(c, Bike))', note: L('Об’єкт Car — це також Vehicle.', 'Объект Car — это также Vehicle.', 'A Car object is also a Vehicle.') }
      ],
      task: {
        text: L('Є клас <code>Shape</code> з методом <code>area()</code>, що повертає 0. Створи нащадків <code>Rect(w, h)</code> і <code>Circle(r)</code> з власним <code>area()</code> (для кола використай <code>3.14</code>). Код нижче виводить площі.', 'Есть класс <code>Shape</code> с методом <code>area()</code>, возвращающим 0. Создай наследников <code>Rect(w, h)</code> и <code>Circle(r)</code> со своим <code>area()</code> (для круга используй <code>3.14</code>). Код ниже выводит площади.', 'There is a <code>Shape</code> class whose <code>area()</code> returns 0. Create subclasses <code>Rect(w, h)</code> and <code>Circle(r)</code> with their own <code>area()</code> (use <code>3.14</code> for the circle). The code below prints the areas.'),
        how: [L('<code>class Rect(Shape):</code> з <code>__init__</code> і <code>area</code>.', '<code>class Rect(Shape):</code> с <code>__init__</code> и <code>area</code>.', '<code>class Rect(Shape):</code> with <code>__init__</code> and <code>area</code>.'), L('<code>class Circle(Shape):</code> — <code>return 3.14 * self.r ** 2</code>.', '<code>class Circle(Shape):</code> — <code>return 3.14 * self.r ** 2</code>.', '<code>class Circle(Shape):</code> — <code>return 3.14 * self.r ** 2</code>.')],
        starter: 'class Shape:\n    def area(self):\n        return 0\n\n# your classes here\n\nfor s in [Rect(3, 4), Circle(2), Shape()]:\n    print(s.area())\n',
        solution: 'class Shape:\n    def area(self):\n        return 0\n\nclass Rect(Shape):\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return 3.14 * self.r ** 2\n\nfor s in [Rect(3, 4), Circle(2), Shape()]:\n    print(s.area())\n',
        hint: L('Очікувано: 12, 12.56, 0.', 'Ожидается: 12, 12.56, 0.', 'Expected: 12, 12.56, 0.'),
        expected: '12\n12.56\n0',
        must: /class\s+Rect\s*\(\s*Shape\s*\)[\s\S]*class\s+Circle\s*\(\s*Shape\s*\)|class\s+Circle\s*\(\s*Shape\s*\)[\s\S]*class\s+Rect\s*\(\s*Shape\s*\)/
      },
      quiz: { q: L('Що робить <code>super().__init__(...)</code>?', 'Что делает <code>super().__init__(...)</code>?', 'What does <code>super().__init__(...)</code> do?'), options: [L('створює новий клас', 'создаёт новый класс', 'creates a new class'), L('викликає конструктор батьківського класу', 'вызывает конструктор родительского класса', 'calls the parent class constructor'), L('видаляє об’єкт', 'удаляет объект', 'deletes the object')], answer: 1, explain: L('Щоб батьківська частина ініціалізувалася.', 'Чтобы родительская часть инициализировалась.', 'So the parent part gets initialised.') },
      ref: [{ code: 'class Child(Parent):', d: L('наслідування', 'наследование', 'inheritance') }, { code: 'super().method()', d: L('виклик батьківського методу', 'вызов родительского метода', 'call the parent method') }]
    },
    {
      id: 'project-guess', chapter: CH7, project: true,
      title: L('Проєкт: гра «Вгадай число»', 'Проект: игра «Угадай число»', 'Project: Guess the Number'),
      theory: L(
        `<p>Час зібрати все разом! Зробимо класичну гру: комп’ютер загадує число, гравець вгадує, а програма підказує «більше» чи «менше».</p>
<h4>План</h4>
<ol><li>Загадане число і спроби отримуємо з <code>input()</code> (у справжній грі — <code>random.randint</code>, але для тесту число задано).</li><li>У циклі читаємо спробу, рахуємо кількість спроб.</li><li>Порівнюємо: <code>Too small</code>, <code>Too big</code> або перемога.</li><li>Після перемоги виводимо кількість спроб і виходимо з циклу через <code>break</code>.</li><li>Неправильне введення (не число) обробляємо через <code>try/except</code> — така спроба не рахується.</li></ol>
<p>Розбий програму на функцію <code>check(guess, secret)</code>, яка повертає текст підказки, і основний цикл.</p>`,
        `<p>Время собрать всё вместе! Сделаем классическую игру: компьютер загадывает число, игрок угадывает, а программа подсказывает «больше» или «меньше».</p>
<h4>План</h4>
<ol><li>Загаданное число и попытки получаем из <code>input()</code> (в настоящей игре — <code>random.randint</code>, но для теста число задано).</li><li>В цикле читаем попытку, считаем количество попыток.</li><li>Сравниваем: <code>Too small</code>, <code>Too big</code> или победа.</li><li>После победы выводим количество попыток и выходим из цикла через <code>break</code>.</li><li>Неправильный ввод (не число) обрабатываем через <code>try/except</code> — такая попытка не считается.</li></ol>
<p>Разбей программу на функцию <code>check(guess, secret)</code>, которая возвращает текст подсказки, и основной цикл.</p>`,
        `<p>Time to put it all together! Let’s build the classic game: the computer picks a number, the player guesses, and the program says “higher” or “lower”.</p>
<h4>Plan</h4>
<ol><li>Read the secret number and the guesses with <code>input()</code> (a real game would use <code>random.randint</code>, but the test fixes the number).</li><li>In a loop read a guess and count attempts.</li><li>Compare: <code>Too small</code>, <code>Too big</code> or a win.</li><li>After a win print the number of attempts and leave the loop with <code>break</code>.</li><li>Handle invalid input (not a number) with <code>try/except</code> — such an attempt doesn’t count.</li></ol>
<p>Split the program into a function <code>check(guess, secret)</code> that returns the hint text, and the main loop.</p>`),
      why: L(`<p>Цей проєкт використовує <b>все</b>, що ти вивчив: змінні, введення, умови, цикли, функції й обробку помилок. Саме так виглядає справжнє програмування — комбінування простих інструментів у щось цікаве.</p>`,
        `<p>Этот проект использует <b>всё</b>, что ты изучил: переменные, ввод, условия, циклы, функции и обработку ошибок. Именно так выглядит настоящее программирование — комбинирование простых инструментов во что-то интересное.</p>`,
        `<p>This project uses <b>everything</b> you’ve learned: variables, input, conditions, loops, functions and error handling. That’s what real programming looks like — combining simple tools into something fun.</p>`),
      mistakes: L(`<ul><li>Забути <code>break</code> після перемоги — гра чекатиме нових спроб.</li><li>Рахувати некоректне введення як спробу.</li><li>Порівнювати рядок з числом — спершу <code>int()</code>.</li></ul>`,
        `<ul><li>Забыть <code>break</code> после победы — игра будет ждать новых попыток.</li><li>Считать некорректный ввод как попытку.</li><li>Сравнивать строку с числом — сначала <code>int()</code>.</li></ul>`,
        `<ul><li>Forgetting <code>break</code> after a win — the game keeps waiting for guesses.</li><li>Counting invalid input as an attempt.</li><li>Comparing a string with a number — <code>int()</code> first.</li></ul>`),
      examples: [
        { title: L('Функція підказки', 'Функция подсказки', 'Hint function'), code: 'def check(guess, secret):\n    if guess < secret:\n        return "Too small"\n    if guess > secret:\n        return "Too big"\n    return "Correct"\n\nfor g in [10, 90, 42]:\n    print(g, check(g, 42))', note: L('Логіку порівняння винесено в окрему функцію.', 'Логика сравнения вынесена в отдельную функцию.', 'The comparison logic lives in its own function.') },
        { title: L('Справжня випадковість', 'Настоящая случайность', 'Real randomness'), code: 'import random\nsecret = random.randint(1, 100)\nprint("I picked a number from 1 to 100")\nprint("(psst, it is", secret, ")")', note: L('У справжній грі число загадує <code>random</code>.', 'В настоящей игре число загадывает <code>random</code>.', 'In a real game <code>random</code> picks the number.') },
        { title: L('Цикл гри (симуляція)', 'Цикл игры (симуляция)', 'Game loop (simulated)'), code: 'secret = 7\nguesses = [3, 9, 7]\nattempts = 0\nfor g in guesses:\n    attempts += 1\n    if g == secret:\n        print(f"Won in {attempts} attempts!")\n        break\n    print("Too small" if g < secret else "Too big")', note: L('Тернарний вираз: <code>A if умова else B</code>.', 'Тернарное выражение: <code>A if условие else B</code>.', 'A conditional expression: <code>A if cond else B</code>.') }
      ],
      task: {
        text: L('Напиши гру. Перший рядок введення — загадане число, далі — спроби гравця (тест: <code>42</code>, потім <code>50</code>, <code>abc</code>, <code>20</code>, <code>42</code>). Для кожної спроби виводь <code>Too big</code> / <code>Too small</code>, для нечислового введення — <code>Enter a number</code> (не рахується як спроба). При вгадуванні виведи <code>You won in N attempts!</code> і заверши гру.', 'Напиши игру. Первая строка ввода — загаданное число, дальше — попытки игрока (тест: <code>42</code>, затем <code>50</code>, <code>abc</code>, <code>20</code>, <code>42</code>). Для каждой попытки выводи <code>Too big</code> / <code>Too small</code>, для нечислового ввода — <code>Enter a number</code> (не считается попыткой). При угадывании выведи <code>You won in N attempts!</code> и заверши игру.', 'Write the game. The first input line is the secret number, then the player’s guesses (test: <code>42</code>, then <code>50</code>, <code>abc</code>, <code>20</code>, <code>42</code>). For each guess print <code>Too big</code> / <code>Too small</code>; for non-numeric input print <code>Enter a number</code> (doesn’t count). On a correct guess print <code>You won in N attempts!</code> and end the game.'),
        how: [L('<code>secret = int(input())</code>, <code>attempts = 0</code>', '<code>secret = int(input())</code>, <code>attempts = 0</code>', '<code>secret = int(input())</code>, <code>attempts = 0</code>'), L('<code>while True:</code> → <code>try: guess = int(input())</code> / <code>except ValueError: print(...); continue</code>', '<code>while True:</code> → <code>try: guess = int(input())</code> / <code>except ValueError: print(...); continue</code>', '<code>while True:</code> → <code>try: guess = int(input())</code> / <code>except ValueError: print(...); continue</code>'), L('Збільш <code>attempts</code>, порівняй, при перемозі — <code>break</code>.', 'Увеличь <code>attempts</code>, сравни, при победе — <code>break</code>.', 'Increase <code>attempts</code>, compare, <code>break</code> on a win.')],
        starter: '',
        stdin: '42\n50\nabc\n20\n42',
        solution: 'def check(guess, secret):\n    if guess < secret:\n        return "Too small"\n    if guess > secret:\n        return "Too big"\n    return "Correct"\n\nsecret = int(input())\nattempts = 0\nwhile True:\n    try:\n        guess = int(input())\n    except ValueError:\n        print("Enter a number")\n        continue\n    attempts += 1\n    result = check(guess, secret)\n    if result == "Correct":\n        print(f"You won in {attempts} attempts!")\n        break\n    print(result)',
        hint: L('Очікувано: Too big, Enter a number, Too small, You won in 3 attempts!', 'Ожидается: Too big, Enter a number, Too small, You won in 3 attempts!', 'Expected: Too big, Enter a number, Too small, You won in 3 attempts!'),
        expected: 'Too big\nEnter a number\nToo small\nYou won in 3 attempts!',
        must: /while[\s\S]*try[\s\S]*except/
      },
      quiz: { q: L('Що зробить <code>continue</code> у блоці <code>except</code> всередині циклу гри?', 'Что сделает <code>continue</code> в блоке <code>except</code> внутри цикла игры?', 'What does <code>continue</code> in the <code>except</code> block inside the game loop do?'), options: [L('завершить гру', 'завершит игру', 'end the game'), L('перейде до наступної спроби', 'перейдёт к следующей попытке', 'move on to the next guess'), L('повторить помилку', 'повторит ошибку', 'repeat the error')], answer: 1, explain: L('Решта тіла циклу пропускається.', 'Остаток тела цикла пропускается.', 'The rest of the loop body is skipped.') },
      ref: [{ code: 'A if cond else B', d: L('тернарний вираз', 'тернарное выражение', 'conditional expression') }]
    },
    {
      id: 'project-report', chapter: CH7, project: true,
      title: L('Проєкт: журнал оцінок', 'Проект: журнал оценок', 'Project: Grade book'),
      theory: L(
        `<p>Фінальний проєкт курсу — програма-журнал. Вона читає оцінки учнів і будує звіт: середні бали, найкращого учня, статистику.</p>
<h4>Вхідні дані</h4>
<p>Перший рядок — кількість учнів <code>N</code>. Далі <code>N</code> рядків у форматі <code>Ім’я оцінка оцінка ...</code>.</p>
<h4>Що вивести</h4>
<ol><li>Для кожного учня в порядку введення: <code>Ім’я: середнє</code> (1 знак після крапки).</li><li><code>Best: Ім’я</code> — учень з найвищим середнім.</li><li><code>Class average: X</code> — середнє всіх середніх (1 знак).</li><li><code>Excellent: імена</code> — учні із середнім ≥ 10 через кому з пробілом, за алфавітом.</li></ol>
<p>Зберігай дані у словнику <code>{ім’я: [оцінки]}</code>, а обчислення винеси у функцію <code>average(marks)</code>.</p>`,
        `<p>Финальный проект курса — программа-журнал. Она читает оценки учеников и строит отчёт: средние баллы, лучшего ученика, статистику.</p>
<h4>Входные данные</h4>
<p>Первая строка — количество учеников <code>N</code>. Дальше <code>N</code> строк в формате <code>Имя оценка оценка ...</code>.</p>
<h4>Что вывести</h4>
<ol><li>Для каждого ученика в порядке ввода: <code>Имя: среднее</code> (1 знак после точки).</li><li><code>Best: Имя</code> — ученик с самым высоким средним.</li><li><code>Class average: X</code> — среднее всех средних (1 знак).</li><li><code>Excellent: имена</code> — ученики со средним ≥ 10 через запятую с пробелом, по алфавиту.</li></ol>
<p>Храни данные в словаре <code>{имя: [оценки]}</code>, а вычисления вынеси в функцию <code>average(marks)</code>.</p>`,
        `<p>The course’s final project is a grade book program. It reads students’ marks and builds a report: averages, the best student, statistics.</p>
<h4>Input</h4>
<p>The first line is the number of students <code>N</code>. Then <code>N</code> lines in the format <code>Name mark mark ...</code>.</p>
<h4>Output</h4>
<ol><li>For each student in input order: <code>Name: average</code> (1 decimal).</li><li><code>Best: Name</code> — the student with the highest average.</li><li><code>Class average: X</code> — the average of all averages (1 decimal).</li><li><code>Excellent: names</code> — students with an average ≥ 10, comma-and-space separated, alphabetically.</li></ol>
<p>Store data in a dict <code>{name: [marks]}</code> and put the maths in a function <code>average(marks)</code>.</p>`),
      why: L(`<p>Читання структурованих даних, словники, функції, сортування, форматування — це щоденна робота аналітика даних і бекенд-розробника. Пройшовши цей проєкт, ти зможеш автоматизувати реальні задачі: таблиці, звіти, підрахунки.</p>`,
        `<p>Чтение структурированных данных, словари, функции, сортировка, форматирование — это ежедневная работа аналитика данных и бэкенд-разработчика. Пройдя этот проект, ты сможешь автоматизировать реальные задачи: таблицы, отчёты, подсчёты.</p>`,
        `<p>Reading structured data, dicts, functions, sorting, formatting — that’s the daily work of data analysts and backend developers. After this project you can automate real tasks: tables, reports, calculations.</p>`),
      mistakes: L(`<ul><li>Забути перетворити оцінки на числа — <code>sum</code> не спрацює з рядками.</li><li>Округлювати проміжні значення — округлюй лише при виведенні.</li></ul>`,
        `<ul><li>Забыть превратить оценки в числа — <code>sum</code> не сработает со строками.</li><li>Округлять промежуточные значения — округляй только при выводе.</li></ul>`,
        `<ul><li>Forgetting to convert marks to numbers — <code>sum</code> won’t work on strings.</li><li>Rounding intermediate values — round only when printing.</li></ul>`),
      examples: [
        { title: L('Розбір рядка', 'Разбор строки', 'Parsing a line'), code: 'line = "Ann 10 12 11"\nparts = line.split()\nname = parts[0]\nmarks = [int(x) for x in parts[1:]]\nprint(name, marks, sum(marks) / len(marks))', note: L('Перше слово — ім’я, решта — оцінки.', 'Первое слово — имя, остальные — оценки.', 'The first word is the name, the rest are marks.') },
        { title: L('Словник журналу', 'Словарь журнала', 'Grade book dict'), code: 'book = {"Ann": [10, 12], "Bob": [7, 8, 9]}\nbook["Kate"] = [12, 12]\nfor name, marks in book.items():\n    print(f"{name}: {sum(marks) / len(marks):.1f}")', note: L('Ключ — ім’я, значення — список оцінок.', 'Ключ — имя, значение — список оценок.', 'Key: name, value: a list of marks.') },
        { title: L('Найкращий', 'Лучший', 'The best'), code: 'avgs = {"Ann": 11.0, "Bob": 8.0, "Kate": 12.0}\nbest = max(avgs, key=avgs.get)\nprint("Best:", best)\ntop = sorted(n for n, a in avgs.items() if a >= 10)\nprint(", ".join(top))', note: L('<code>max</code> з <code>key</code> шукає ключ з найбільшим значенням.', '<code>max</code> с <code>key</code> ищет ключ с наибольшим значением.', '<code>max</code> with <code>key</code> finds the key with the biggest value.') }
      ],
      task: {
        text: L('Реалізуй журнал за описом у теорії. Тестове введення:<br><code>4</code><br><code>Ann 10 12 11</code><br><code>Bob 7 8 6</code><br><code>Kate 12 11 12</code><br><code>Max 9 10 11</code>', 'Реализуй журнал по описанию в теории. Тестовый ввод:<br><code>4</code><br><code>Ann 10 12 11</code><br><code>Bob 7 8 6</code><br><code>Kate 12 11 12</code><br><code>Max 9 10 11</code>', 'Implement the grade book as described in the theory. Test input:<br><code>4</code><br><code>Ann 10 12 11</code><br><code>Bob 7 8 6</code><br><code>Kate 12 11 12</code><br><code>Max 9 10 11</code>'),
        how: [L('Функція <code>average(marks)</code>.', 'Функция <code>average(marks)</code>.', 'A function <code>average(marks)</code>.'), L('Цикл на <code>N</code> рядків → заповни словник.', 'Цикл на <code>N</code> строк → заполни словарь.', 'Loop over <code>N</code> lines → fill the dict.'), L('Виведи середні, найкращого, загальне середнє та відмінників.', 'Выведи средние, лучшего, общее среднее и отличников.', 'Print the averages, the best student, the class average and the top students.')],
        starter: 'def average(marks):\n    pass\n\n',
        stdin: '4\nAnn 10 12 11\nBob 7 8 6\nKate 12 11 12\nMax 9 10 11',
        solution: 'def average(marks):\n    return sum(marks) / len(marks)\n\nn = int(input())\nbook = {}\nfor _ in range(n):\n    parts = input().split()\n    book[parts[0]] = [int(x) for x in parts[1:]]\n\navgs = {name: average(marks) for name, marks in book.items()}\nfor name, avg in avgs.items():\n    print(f"{name}: {avg:.1f}")\nprint("Best:", max(avgs, key=avgs.get))\nprint(f"Class average: {average(list(avgs.values())):.1f}")\nexcellent = sorted(name for name, avg in avgs.items() if avg >= 10)\nprint("Excellent:", ", ".join(excellent))',
        hint: L('Середні: 11.0, 7.0, 11.7, 10.0. Загальне — 9.9.', 'Средние: 11.0, 7.0, 11.7, 10.0. Общее — 9.9.', 'Averages: 11.0, 7.0, 11.7, 10.0. Class average 9.9.'),
        expected: 'Ann: 11.0\nBob: 7.0\nKate: 11.7\nMax: 10.0\nBest: Kate\nClass average: 9.9\nExcellent: Ann, Kate, Max',
        must: /def\s+average/
      },
      quiz: { q: L('Яка структура найкраще підходить для «ім’я → оцінки»?', 'Какая структура лучше всего подходит для «имя → оценки»?', 'Which structure best fits “name → marks”?'), options: [L('список', 'список', 'list'), L('словник', 'словарь', 'dict'), L('множина', 'множество', 'set')], answer: 1, explain: L('Ключ — ім’я, значення — список оцінок.', 'Ключ — имя, значение — список оценок.', 'Key is the name, value is the list of marks.') },
      ref: [{ code: 'max(d, key=d.get)', d: L('ключ з найбільшим значенням', 'ключ с наибольшим значением', 'key with the largest value') }]
    }
  ]);
})();
