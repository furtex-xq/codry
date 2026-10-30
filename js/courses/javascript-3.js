// JavaScript — частина 3: об’єкти, класи, асинхронність, проєкти.
(function () {
  const L = Codry.L;
  const CH6 = L('Об’єкти', 'Объекты', 'Objects');
  const CH7 = L('Класи та сучасний JS', 'Классы и современный JS', 'Classes and modern JS');
  const CH8 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');

  Codry.steps('javascript', [
    {
      id: 'objects', chapter: CH6,
      title: L('Об’єкти', 'Объекты', 'Objects'),
      theory: L(
        `<p><b>Об’єкт</b> групує дані про одну сутність у вигляді пар <b>ключ: значення</b> (властивостей):</p>
<pre class="inline-code">const user = {
  name: "Kate",
  age: 16,
  "favorite color": "green"
};</pre>
<ul><li>Читати: <code>user.name</code> або <code>user["name"]</code> (дужки — коли ключ у змінній чи з пробілами)</li><li>Змінити / додати: <code>user.age = 17</code>, <code>user.city = "Kyiv"</code></li><li>Видалити: <code>delete user.age</code></li><li>Перевірити: <code>"city" in user</code></li></ul>
<p>Перебір: <code>Object.keys(obj)</code> — масив ключів, <code>Object.values(obj)</code> — значень, <code>Object.entries(obj)</code> — пар <code>[ключ, значення]</code>.</p>
<p>Скорочений запис: якщо змінна має те саме ім’я, що й ключ — <code>{ name, age }</code>.</p>`,
        `<p><b>Объект</b> группирует данные об одной сущности в виде пар <b>ключ: значение</b> (свойств):</p>
<pre class="inline-code">const user = {
  name: "Kate",
  age: 16,
  "favorite color": "green"
};</pre>
<ul><li>Читать: <code>user.name</code> или <code>user["name"]</code> (скобки — когда ключ в переменной или с пробелами)</li><li>Изменить / добавить: <code>user.age = 17</code>, <code>user.city = "Kyiv"</code></li><li>Удалить: <code>delete user.age</code></li><li>Проверить: <code>"city" in user</code></li></ul>
<p>Перебор: <code>Object.keys(obj)</code> — массив ключей, <code>Object.values(obj)</code> — значений, <code>Object.entries(obj)</code> — пар <code>[ключ, значение]</code>.</p>
<p>Сокращённая запись: если переменная называется так же, как ключ — <code>{ name, age }</code>.</p>`,
        `<p>An <b>object</b> groups data about one thing as <b>key: value</b> pairs (properties):</p>
<pre class="inline-code">const user = {
  name: "Kate",
  age: 16,
  "favorite color": "green"
};</pre>
<ul><li>Read: <code>user.name</code> or <code>user["name"]</code> (brackets when the key is in a variable or has spaces)</li><li>Change / add: <code>user.age = 17</code>, <code>user.city = "Kyiv"</code></li><li>Delete: <code>delete user.age</code></li><li>Check: <code>"city" in user</code></li></ul>
<p>Iterating: <code>Object.keys(obj)</code> — array of keys, <code>Object.values(obj)</code> — values, <code>Object.entries(obj)</code> — <code>[key, value]</code> pairs.</p>
<p>Shorthand: if a variable has the same name as the key — <code>{ name, age }</code>.</p>`),
      why: L(`<p>Користувач, товар, повідомлення — у кожного кілька характеристик. Об’єкт тримає їх разом під зрозумілими іменами. Майже всі дані з інтернету (JSON) — це об’єкти та масиви об’єктів.</p>`,
        `<p>Пользователь, товар, сообщение — у каждого несколько характеристик. Объект держит их вместе под понятными именами. Почти все данные из интернета (JSON) — это объекты и массивы объектов.</p>`,
        `<p>A user, a product, a message — each has several characteristics. An object keeps them together under clear names. Nearly all data from the internet (JSON) is objects and arrays of objects.</p>`),
      mistakes: L(`<ul><li><code>user.key</code>, коли ключ у змінній — шукає буквально «key». Потрібно <code>user[key]</code>.</li><li>Звертатися до властивості <code>undefined</code>: <code>user.address.city</code> → помилка, якщо адреси немає. Використовуй <code>?.</code>.</li></ul>`,
        `<ul><li><code>user.key</code>, когда ключ в переменной — ищет буквально «key». Нужно <code>user[key]</code>.</li><li>Обращаться к свойству <code>undefined</code>: <code>user.address.city</code> → ошибка, если адреса нет. Используй <code>?.</code>.</li></ul>`,
        `<ul><li><code>user.key</code> when the key is in a variable looks for literally “key”. Use <code>user[key]</code>.</li><li>Accessing a property of <code>undefined</code>: <code>user.address.city</code> throws if there’s no address. Use <code>?.</code>.</li></ul>`),
      examples: [
        { title: L('Основи', 'Основы', 'Basics'), code: 'const car = { brand: "Tesla", year: 2024 };\nconsole.log(car.brand);\ncar.color = "red";\ncar.year = 2025;\nconsole.log(car);\nconsole.log("color" in car);', note: L('Читання, зміна, додавання.', 'Чтение, изменение, добавление.', 'Read, change, add.') },
        { title: L('Квадратні дужки', 'Квадратные скобки', 'Square brackets'), code: 'const stats = { hp: 100, mana: 40 };\nconst key = "mana";\nconsole.log(stats[key]);\nconsole.log(stats.key);\nstats["max hp"] = 120;\nconsole.log(stats);', note: L('<code>stats.key</code> шукає ключ «key».', '<code>stats.key</code> ищет ключ «key».', '<code>stats.key</code> looks for the key “key”.') },
        { title: L('Перебір', 'Перебор', 'Iterating'), code: 'const prices = { bread: 30, milk: 45, cheese: 120 };\nconsole.log(Object.keys(prices));\nconsole.log(Object.values(prices));\nfor (const [item, price] of Object.entries(prices)) {\n  console.log(`${item}: ${price}`);\n}', note: L('<code>entries</code> + деструктуризація.', '<code>entries</code> + деструктуризация.', '<code>entries</code> + destructuring.') },
        { title: L('Масив об’єктів', 'Массив объектов', 'Array of objects'), code: 'const students = [\n  { name: "Ira", mark: 11 },\n  { name: "Oleg", mark: 7 },\n  { name: "Yana", mark: 10 }\n];\nconst best = students.filter((s) => s.mark >= 10).map((s) => s.name);\nconsole.log(best);', note: L('Типова структура даних у застосунках.', 'Типичная структура данных в приложениях.', 'A typical data structure in apps.') }
      ],
      task: {
        text: L('Створи об’єкт <code>book</code> з властивостями <code>title: "Dune"</code>, <code>pages: 600</code>. Додай властивість <code>read: true</code>. Виведи <code>Dune - 600 pages</code>, а потім масив ключів об’єкта.', 'Создай объект <code>book</code> со свойствами <code>title: "Dune"</code>, <code>pages: 600</code>. Добавь свойство <code>read: true</code>. Выведи <code>Dune - 600 pages</code>, а затем массив ключей объекта.', 'Create an object <code>book</code> with <code>title: "Dune"</code> and <code>pages: 600</code>. Add a property <code>read: true</code>. Print <code>Dune - 600 pages</code>, then the array of the object’s keys.'),
        how: [L('Оголоси об’єкт з двома властивостями.', 'Объяви объект с двумя свойствами.', 'Declare the object with two properties.'), L('<code>book.read = true;</code>', '<code>book.read = true;</code>', '<code>book.read = true;</code>'), L('<code>Object.keys(book)</code>', '<code>Object.keys(book)</code>', '<code>Object.keys(book)</code>')],
        starter: '',
        solution: 'const book = { title: "Dune", pages: 600 };\nbook.read = true;\nconsole.log(`${book.title} - ${book.pages} pages`);\nconsole.log(Object.keys(book));',
        hint: L('Ключі: <code>[ "title", "pages", "read" ]</code>.', 'Ключи: <code>[ "title", "pages", "read" ]</code>.', 'Keys: <code>[ "title", "pages", "read" ]</code>.'),
        expected: 'Dune - 600 pages\n[ "title", "pages", "read" ]',
        must: /Object\.keys/
      },
      quiz: { q: L('Як прочитати властивість, ім’я якої в змінній <code>k</code>?', 'Как прочитать свойство, имя которого в переменной <code>k</code>?', 'How do you read a property whose name is in variable <code>k</code>?'), options: ['obj.k', 'obj[k]', 'obj{k}'], answer: 1, explain: L('Квадратні дужки обчислюють ключ.', 'Квадратные скобки вычисляют ключ.', 'Brackets evaluate the key.') },
      ref: [{ code: '{ k: v }', d: L('об’єкт', 'объект', 'object') }, { code: 'obj.k  obj[key]', d: L('доступ', 'доступ', 'access') }, { code: 'Object.keys/values/entries', d: L('перебір', 'перебор', 'iteration') }]
    },
    {
      id: 'this', chapter: CH6,
      title: L('Методи та this', 'Методы и this', 'Methods and this'),
      theory: L(
        `<p>Функція всередині об’єкта називається <b>методом</b>. Щоб метод звертався до інших властивостей свого об’єкта, використовують <code>this</code>:</p>
<pre class="inline-code">const hero = {
  name: "Mario",
  hp: 3,
  hit() {
    this.hp--;
    console.log(\`\${this.name}: \${this.hp} hp\`);
  }
};
hero.hit();</pre>
<p><code>this</code> — це «об’єкт, у якого викликали метод» (те, що стоїть перед крапкою).</p>
<p><b>Важливо:</b> у стрілкових функцій немає власного <code>this</code> — вони беруть його ззовні. Тому методи об’єкта пишуть звичайним синтаксисом <code>hit() { }</code>, а стрілкові функції зручні <b>всередині</b> методів (наприклад, у <code>forEach</code>).</p>`,
        `<p>Функция внутри объекта называется <b>методом</b>. Чтобы метод обращался к другим свойствам своего объекта, используют <code>this</code>:</p>
<pre class="inline-code">const hero = {
  name: "Mario",
  hp: 3,
  hit() {
    this.hp--;
    console.log(\`\${this.name}: \${this.hp} hp\`);
  }
};
hero.hit();</pre>
<p><code>this</code> — это «объект, у которого вызвали метод» (то, что стоит перед точкой).</p>
<p><b>Важно:</b> у стрелочных функций нет собственного <code>this</code> — они берут его снаружи. Поэтому методы объекта пишут обычным синтаксисом <code>hit() { }</code>, а стрелочные функции удобны <b>внутри</b> методов (например, в <code>forEach</code>).</p>`,
        `<p>A function inside an object is a <b>method</b>. To reach other properties of its object, a method uses <code>this</code>:</p>
<pre class="inline-code">const hero = {
  name: "Mario",
  hp: 3,
  hit() {
    this.hp--;
    console.log(\`\${this.name}: \${this.hp} hp\`);
  }
};
hero.hit();</pre>
<p><code>this</code> is “the object the method was called on” (whatever is before the dot).</p>
<p><b>Important:</b> arrow functions have no <code>this</code> of their own — they take it from outside. So object methods use the normal syntax <code>hit() { }</code>, while arrow functions are handy <b>inside</b> methods (e.g. in <code>forEach</code>).</p>`),
      why: L(`<p>Без <code>this</code> метод мав би звертатися до об’єкта за іменем змінної — і зламався б, якщо скопіювати метод в інший об’єкт. <code>this</code> робить методи універсальними: той самий код працює для будь-якого героя.</p>`,
        `<p>Без <code>this</code> метод обращался бы к объекту по имени переменной — и сломался бы, если скопировать метод в другой объект. <code>this</code> делает методы универсальными: тот же код работает для любого героя.</p>`,
        `<p>Without <code>this</code> a method would refer to its object by variable name — and break if copied to another object. <code>this</code> makes methods generic: the same code works for any hero.</p>`),
      mistakes: L(`<ul><li>Метод-стрілка <code>hit: () =&gt; { this.hp-- }</code> — <code>this</code> вказує не на об’єкт.</li><li>Передати метод як колбек <code>setTimeout(hero.hit)</code> — <code>this</code> загубиться. Використовуй <code>() =&gt; hero.hit()</code>.</li></ul>`,
        `<ul><li>Метод-стрелка <code>hit: () =&gt; { this.hp-- }</code> — <code>this</code> указывает не на объект.</li><li>Передать метод как колбэк <code>setTimeout(hero.hit)</code> — <code>this</code> потеряется. Используй <code>() =&gt; hero.hit()</code>.</li></ul>`,
        `<ul><li>An arrow method <code>hit: () =&gt; { this.hp-- }</code> — <code>this</code> doesn’t point to the object.</li><li>Passing a method as a callback <code>setTimeout(hero.hit)</code> loses <code>this</code>. Use <code>() =&gt; hero.hit()</code>.</li></ul>`),
      examples: [
        { title: L('Метод', 'Метод', 'Method'), code: 'const hero = {\n  name: "Mario",\n  hp: 3,\n  hit() {\n    this.hp--;\n    console.log(`${this.name} has ${this.hp} hp`);\n  }\n};\nhero.hit();\nhero.hit();', note: L('this = hero.', 'this = hero.', 'this = hero.') },
        { title: L('Кошик', 'Корзина', 'Cart'), code: 'const cart = {\n  items: [],\n  add(name, price) {\n    this.items.push({ name, price });\n  },\n  total() {\n    return this.items.reduce((s, i) => s + i.price, 0);\n  }\n};\ncart.add("pen", 15);\ncart.add("book", 120);\nconsole.log(cart.items.length, cart.total());', note: L('Стрілка всередині методу бачить this ззовні.', 'Стрелка внутри метода видит this снаружи.', 'An arrow inside the method sees the outer this.') },
        { title: L('Стрілка — пастка', 'Стрелка — ловушка', 'Arrow trap'), code: 'const counter = {\n  count: 0,\n  incGood() { this.count++; return this.count; },\n  incBad: () => typeof this\n};\nconsole.log(counter.incGood());\nconsole.log(counter.incBad());', note: L('У методі-стрілці this — не об’єкт.', 'В методе-стрелке this — не объект.', 'In an arrow method this isn’t the object.') },
        { title: L('Той самий метод', 'Тот же метод', 'Shared method'), code: 'function describe() {\n  return `${this.name} (${this.type})`;\n}\nconst cat = { name: "Murka", type: "cat", describe };\nconst dog = { name: "Rex", type: "dog", describe };\nconsole.log(cat.describe());\nconsole.log(dog.describe());', note: L('this залежить від того, хто викликає.', 'this зависит от того, кто вызывает.', 'this depends on who calls it.') }
      ],
      task: {
        text: L('Створи об’єкт <code>account</code> з властивостями <code>owner: "Ira"</code>, <code>balance: 100</code> і методами <code>deposit(n)</code>, <code>withdraw(n)</code> (якщо грошей не вистачає — виводить <code>Not enough money</code> і нічого не змінює) та <code>info()</code>, що повертає рядок <code>Ira: 120</code>. Виклики вже готові.', 'Создай объект <code>account</code> со свойствами <code>owner: "Ira"</code>, <code>balance: 100</code> и методами <code>deposit(n)</code>, <code>withdraw(n)</code> (если денег не хватает — выводит <code>Not enough money</code> и ничего не меняет) и <code>info()</code>, возвращающим строку <code>Ira: 120</code>. Вызовы уже готовы.', 'Create an object <code>account</code> with <code>owner: "Ira"</code>, <code>balance: 100</code> and methods <code>deposit(n)</code>, <code>withdraw(n)</code> (if there’s not enough money print <code>Not enough money</code> and change nothing) and <code>info()</code> returning a string like <code>Ira: 120</code>. The calls are ready.'),
        how: [L('У методах звертайся через <code>this.balance</code>.', 'В методах обращайся через <code>this.balance</code>.', 'Use <code>this.balance</code> in the methods.'), L('Методи пиши як <code>deposit(n) { ... }</code>, не стрілками.', 'Методы пиши как <code>deposit(n) { ... }</code>, не стрелками.', 'Write methods as <code>deposit(n) { ... }</code>, not arrows.')],
        starter: 'const account = {\n  // your code\n};\n\naccount.deposit(50);\naccount.withdraw(500);\naccount.withdraw(30);\nconsole.log(account.info());\n',
        solution: 'const account = {\n  owner: "Ira",\n  balance: 100,\n  deposit(n) {\n    this.balance += n;\n  },\n  withdraw(n) {\n    if (n > this.balance) {\n      console.log("Not enough money");\n      return;\n    }\n    this.balance -= n;\n  },\n  info() {\n    return `${this.owner}: ${this.balance}`;\n  }\n};\n\naccount.deposit(50);\naccount.withdraw(500);\naccount.withdraw(30);\nconsole.log(account.info());\n',
        hint: L('Очікувано: <code>Not enough money</code> і <code>Ira: 120</code>.', 'Ожидается: <code>Not enough money</code> и <code>Ira: 120</code>.', 'Expected: <code>Not enough money</code> and <code>Ira: 120</code>.'),
        expected: 'Not enough money\nIra: 120',
        must: /this\.balance/
      },
      quiz: { q: L('На що вказує <code>this</code> у <code>hero.hit()</code>?', 'На что указывает <code>this</code> в <code>hero.hit()</code>?', 'What does <code>this</code> refer to in <code>hero.hit()</code>?'), options: ['hit', 'hero', 'window'], answer: 1, explain: L('На об’єкт перед крапкою.', 'На объект перед точкой.', 'The object before the dot.') },
      ref: [{ code: 'method() { this.x }', d: L('метод і this', 'метод и this', 'method and this') }]
    },
    {
      id: 'destructuring', chapter: CH6,
      title: L('Деструктуризація та spread', 'Деструктуризация и spread', 'Destructuring and spread'),
      theory: L(
        `<p><b>Деструктуризація</b> дістає значення з масиву чи об’єкта в окремі змінні:</p>
<pre class="inline-code">const [first, second] = ["gold", "silver", "bronze"];
const { name, age } = user;
const { name: userName, city = "Kyiv" } = user;   // перейменування і значення за замовчуванням</pre>
<p>Працює і в параметрах функцій: <code>function show({ name, age }) { ... }</code>.</p>
<p><b>Spread</b> <code>...</code> «розгортає» масив чи об’єкт:</p>
<ul><li><code>[...a, ...b]</code> — об’єднати масиви</li><li><code>{ ...user, age: 17 }</code> — копія об’єкта зі зміною</li><li><code>Math.max(...nums)</code> — передати елементи як аргументи</li></ul>
<p><b>Rest</b> — той самий <code>...</code>, але збирає залишок: <code>const [head, ...tail] = arr;</code>.</p>`,
        `<p><b>Деструктуризация</b> достаёт значения из массива или объекта в отдельные переменные:</p>
<pre class="inline-code">const [first, second] = ["gold", "silver", "bronze"];
const { name, age } = user;
const { name: userName, city = "Kyiv" } = user;   // переименование и значение по умолчанию</pre>
<p>Работает и в параметрах функций: <code>function show({ name, age }) { ... }</code>.</p>
<p><b>Spread</b> <code>...</code> «разворачивает» массив или объект:</p>
<ul><li><code>[...a, ...b]</code> — объединить массивы</li><li><code>{ ...user, age: 17 }</code> — копия объекта с изменением</li><li><code>Math.max(...nums)</code> — передать элементы как аргументы</li></ul>
<p><b>Rest</b> — тот же <code>...</code>, но собирает остаток: <code>const [head, ...tail] = arr;</code>.</p>`,
        `<p><b>Destructuring</b> pulls values out of an array or object into separate variables:</p>
<pre class="inline-code">const [first, second] = ["gold", "silver", "bronze"];
const { name, age } = user;
const { name: userName, city = "Kyiv" } = user;   // rename and default value</pre>
<p>It works in function parameters too: <code>function show({ name, age }) { ... }</code>.</p>
<p><b>Spread</b> <code>...</code> expands an array or object:</p>
<ul><li><code>[...a, ...b]</code> — merge arrays</li><li><code>{ ...user, age: 17 }</code> — copy an object with a change</li><li><code>Math.max(...nums)</code> — pass items as arguments</li></ul>
<p><b>Rest</b> is the same <code>...</code> but collects the remainder: <code>const [head, ...tail] = arr;</code>.</p>`),
      why: L(`<p>Сучасний JS і фреймворки (React, Vue) постійно використовують ці прийоми: створення <b>копій</b> замість зміни оригіналу (<code>{...state, x: 1}</code>) робить програми передбачуванішими, а деструктуризація прибирає повторення <code>user.name</code>, <code>user.age</code>…</p>`,
        `<p>Современный JS и фреймворки (React, Vue) постоянно используют эти приёмы: создание <b>копий</b> вместо изменения оригинала (<code>{...state, x: 1}</code>) делает программы предсказуемее, а деструктуризация убирает повторение <code>user.name</code>, <code>user.age</code>…</p>`,
        `<p>Modern JS and frameworks (React, Vue) use these all the time: making <b>copies</b> instead of mutating (<code>{...state, x: 1}</code>) keeps programs predictable, and destructuring removes repeated <code>user.name</code>, <code>user.age</code>…</p>`),
      mistakes: L(`<ul><li>Spread робить <b>поверхневу</b> копію: вкладені об’єкти залишаються спільними.</li><li>Деструктуризація з <code>undefined</code> → помилка. Додавай значення за замовчуванням: <code>{ a } = obj || {}</code>.</li></ul>`,
        `<ul><li>Spread делает <b>поверхностную</b> копию: вложенные объекты остаются общими.</li><li>Деструктуризация из <code>undefined</code> → ошибка. Добавляй значение по умолчанию: <code>{ a } = obj || {}</code>.</li></ul>`,
        `<ul><li>Spread makes a <b>shallow</b> copy: nested objects are still shared.</li><li>Destructuring <code>undefined</code> throws. Add a default: <code>{ a } = obj || {}</code>.</li></ul>`),
      examples: [
        { title: L('Масив', 'Массив', 'Array'), code: 'const podium = ["Ann", "Bob", "Kate", "Max"];\nconst [gold, silver, ...others] = podium;\nconsole.log(gold, silver);\nconsole.log(others);', note: L('Rest збирає решту.', 'Rest собирает остальное.', 'Rest collects the remainder.') },
        { title: L('Об’єкт', 'Объект', 'Object'), code: 'const user = { name: "Ira", age: 14 };\nconst { name, age, city = "Lviv" } = user;\nconsole.log(name, age, city);\nconst { name: nick } = user;\nconsole.log(nick);', note: L('Значення за замовчуванням і перейменування.', 'Значение по умолчанию и переименование.', 'Defaults and renaming.') },
        { title: 'spread', code: 'const base = { hp: 100, speed: 5 };\nconst fast = { ...base, speed: 12 };\nconsole.log(base, fast);\nconst nums = [3, 9, 1];\nconsole.log(Math.max(...nums));\nconsole.log([0, ...nums, 10]);', note: L('Оригінал не змінюється.', 'Оригинал не меняется.', 'The original stays the same.') },
        { title: L('У параметрах', 'В параметрах', 'In parameters'), code: 'function card({ name, level = 1, items = [] }) {\n  return `${name} (lvl ${level}) items: ${items.length}`;\n}\nconsole.log(card({ name: "Neo" }));\nconsole.log(card({ name: "Trinity", level: 9, items: ["phone"] }));', note: L('Іменовані параметри через об’єкт.', 'Именованные параметры через объект.', 'Named parameters via an object.') }
      ],
      task: {
        text: L('Є <code>player = { name: "Alex", hp: 80, items: ["sword", "shield", "potion"] }</code>. Деструктуризацією дістань <code>name</code>, <code>hp</code> і перший предмет (<code>firstItem</code>). Виведи <code>Alex 80 sword</code>. Потім створи копію гравця з <code>hp: 100</code> через spread і виведи <code>hp</code> копії та оригіналу.', 'Есть <code>player = { name: "Alex", hp: 80, items: ["sword", "shield", "potion"] }</code>. Деструктуризацией достань <code>name</code>, <code>hp</code> и первый предмет (<code>firstItem</code>). Выведи <code>Alex 80 sword</code>. Затем создай копию игрока с <code>hp: 100</code> через spread и выведи <code>hp</code> копии и оригинала.', 'Given <code>player = { name: "Alex", hp: 80, items: ["sword", "shield", "potion"] }</code>, destructure <code>name</code>, <code>hp</code> and the first item (<code>firstItem</code>). Print <code>Alex 80 sword</code>. Then create a copy with <code>hp: 100</code> via spread and print the copy’s and the original’s <code>hp</code>.'),
        how: [L('<code>const { name, hp, items: [firstItem] } = player;</code>', '<code>const { name, hp, items: [firstItem] } = player;</code>', '<code>const { name, hp, items: [firstItem] } = player;</code>'), L('<code>const healed = { ...player, hp: 100 };</code>', '<code>const healed = { ...player, hp: 100 };</code>', '<code>const healed = { ...player, hp: 100 };</code>')],
        starter: 'const player = { name: "Alex", hp: 80, items: ["sword", "shield", "potion"] };\n',
        solution: 'const player = { name: "Alex", hp: 80, items: ["sword", "shield", "potion"] };\nconst { name, hp, items: [firstItem] } = player;\nconsole.log(name, hp, firstItem);\nconst healed = { ...player, hp: 100 };\nconsole.log(healed.hp, player.hp);',
        hint: L('Очікувано: <code>Alex 80 sword</code> і <code>100 80</code>.', 'Ожидается: <code>Alex 80 sword</code> и <code>100 80</code>.', 'Expected: <code>Alex 80 sword</code> and <code>100 80</code>.'),
        expected: 'Alex 80 sword\n100 80',
        must: /\{\s*\.\.\.player/
      },
      quiz: { q: L('Що буде в <code>b</code>: <code>const [a, ...b] = [1, 2, 3]</code>?', 'Что будет в <code>b</code>: <code>const [a, ...b] = [1, 2, 3]</code>?', 'What is <code>b</code> in <code>const [a, ...b] = [1, 2, 3]</code>?'), options: ['2', '[2, 3]', '[1, 2, 3]'], answer: 1, explain: L('Rest збирає залишок у масив.', 'Rest собирает остаток в массив.', 'Rest collects the remainder into an array.') },
      ref: [{ code: 'const { a, b } = obj', d: L('деструктуризація об’єкта', 'деструктуризация объекта', 'object destructuring') }, { code: 'const [x, ...rest] = arr', d: L('деструктуризація масиву', 'деструктуризация массива', 'array destructuring') }, { code: '{ ...obj, k: v }', d: L('копія зі зміною', 'копия с изменением', 'copy with a change') }]
    },
    {
      id: 'json', chapter: CH6,
      title: L('JSON', 'JSON', 'JSON'),
      theory: L(
        `<p><b>JSON</b> (JavaScript Object Notation) — текстовий формат для обміну даними між програмами, серверами й мовами. Виглядає майже як об’єкт JS:</p>
<pre class="inline-code">{"name": "Ann", "age": 14, "tags": ["js", "css"], "admin": false}</pre>
<p>Правила JSON суворіші: ключі — лише в <b>подвійних лапках</b>, немає функцій, <code>undefined</code>, коментарів і коми в кінці.</p>
<ul><li><code>JSON.stringify(obj)</code> — об’єкт → рядок JSON</li><li><code>JSON.stringify(obj, null, 2)</code> — гарно відформатований з відступами</li><li><code>JSON.parse(text)</code> — рядок JSON → об’єкт</li></ul>
<p>Так дані надсилають на сервер, зберігають у <code>localStorage</code> і отримують з API.</p>`,
        `<p><b>JSON</b> (JavaScript Object Notation) — текстовый формат для обмена данными между программами, серверами и языками. Выглядит почти как объект JS:</p>
<pre class="inline-code">{"name": "Ann", "age": 14, "tags": ["js", "css"], "admin": false}</pre>
<p>Правила JSON строже: ключи — только в <b>двойных кавычках</b>, нет функций, <code>undefined</code>, комментариев и запятой в конце.</p>
<ul><li><code>JSON.stringify(obj)</code> — объект → строка JSON</li><li><code>JSON.stringify(obj, null, 2)</code> — красиво отформатированный с отступами</li><li><code>JSON.parse(text)</code> — строка JSON → объект</li></ul>
<p>Так данные отправляют на сервер, сохраняют в <code>localStorage</code> и получают из API.</p>`,
        `<p><b>JSON</b> (JavaScript Object Notation) is a text format for exchanging data between programs, servers and languages. It looks almost like a JS object:</p>
<pre class="inline-code">{"name": "Ann", "age": 14, "tags": ["js", "css"], "admin": false}</pre>
<p>JSON is stricter: keys must be in <b>double quotes</b>, no functions, no <code>undefined</code>, no comments, no trailing commas.</p>
<ul><li><code>JSON.stringify(obj)</code> — object → JSON string</li><li><code>JSON.stringify(obj, null, 2)</code> — pretty-printed with indentation</li><li><code>JSON.parse(text)</code> — JSON string → object</li></ul>
<p>That’s how data is sent to servers, saved in <code>localStorage</code> and received from APIs.</p>`),
      why: L(`<p>Сервер на Python, застосунок на Swift і сайт на JS повинні «розуміти» одне одного. JSON — спільна мова даних: простий текст, який легко читати і людині, і будь-якій програмі.</p>`,
        `<p>Сервер на Python, приложение на Swift и сайт на JS должны «понимать» друг друга. JSON — общий язык данных: простой текст, который легко читать и человеку, и любой программе.</p>`,
        `<p>A Python server, a Swift app and a JS website must understand each other. JSON is the common language of data: plain text that’s easy for humans and any program to read.</p>`),
      mistakes: L(`<ul><li>Одинарні лапки в JSON → <code>JSON.parse</code> видасть <code>SyntaxError</code>.</li><li>Забути, що <code>JSON.parse</code> на поганих даних «падає» — загортай у <code>try/catch</code>.</li><li>Функції та <code>undefined</code> зникають при <code>stringify</code>.</li></ul>`,
        `<ul><li>Одинарные кавычки в JSON → <code>JSON.parse</code> выдаст <code>SyntaxError</code>.</li><li>Забыть, что <code>JSON.parse</code> на плохих данных «падает» — оборачивай в <code>try/catch</code>.</li><li>Функции и <code>undefined</code> исчезают при <code>stringify</code>.</li></ul>`,
        `<ul><li>Single quotes in JSON → <code>JSON.parse</code> throws <code>SyntaxError</code>.</li><li>Forgetting that <code>JSON.parse</code> throws on bad data — wrap it in <code>try/catch</code>.</li><li>Functions and <code>undefined</code> vanish in <code>stringify</code>.</li></ul>`),
      examples: [
        { title: 'stringify', code: 'const user = { name: "Ann", age: 14, tags: ["js", "css"] };\nconst text = JSON.stringify(user);\nconsole.log(text);\nconsole.log(typeof text);', note: L('Об’єкт став рядком.', 'Объект стал строкой.', 'The object became a string.') },
        { title: L('Гарний формат', 'Красивый формат', 'Pretty print'), code: 'const config = { theme: "dark", volume: 7, langs: ["uk", "en"] };\nconsole.log(JSON.stringify(config, null, 2));', note: L('Відступ 2 пробіли.', 'Отступ 2 пробела.', 'Indented by 2 spaces.') },
        { title: 'parse', code: 'const text = \'{"title":"Dune","pages":600,"read":true}\';\nconst book = JSON.parse(text);\nconsole.log(book.title, book.pages + 1);\nconsole.log(typeof book);', note: L('Рядок став об’єктом — можна рахувати.', 'Строка стала объектом — можно считать.', 'The string became an object — you can compute.') },
        { title: L('Погані дані', 'Плохие данные', 'Bad data'), code: "const bad = \"{name: 'Ann'}\";\ntry {\n  JSON.parse(bad);\n} catch (e) {\n  console.log(\"Invalid JSON:\", e.name);\n}\nconst lost = JSON.stringify({ a: 1, f() {}, u: undefined });\nconsole.log(lost);", note: L('Функції та undefined не потрапляють у JSON.', 'Функции и undefined не попадают в JSON.', 'Functions and undefined don’t make it into JSON.') }
      ],
      task: {
        text: L('Є JSON-рядок з даними гравців: <code>\'[{"name":"Ann","score":120},{"name":"Bob","score":95},{"name":"Kate","score":150}]\'</code>. Розбери його, знайди гравця з найбільшим рахунком і виведи його ім’я. Потім виведи JSON-рядок (без відступів) з масивом лише імен.', 'Есть JSON-строка с данными игроков: <code>\'[{"name":"Ann","score":120},{"name":"Bob","score":95},{"name":"Kate","score":150}]\'</code>. Разбери её, найди игрока с наибольшим счётом и выведи его имя. Затем выведи JSON-строку (без отступов) с массивом только имён.', 'Given a JSON string of players: <code>\'[{"name":"Ann","score":120},{"name":"Bob","score":95},{"name":"Kate","score":150}]\'</code>, parse it, find the player with the highest score and print their name. Then print a JSON string (no indentation) of just the names.'),
        how: [L('<code>const players = JSON.parse(text);</code>', '<code>const players = JSON.parse(text);</code>', '<code>const players = JSON.parse(text);</code>'), L('Найкращий: <code>reduce</code> або сортування.', 'Лучший: <code>reduce</code> или сортировка.', 'Best: <code>reduce</code> or sorting.'), L('<code>JSON.stringify(players.map(p =&gt; p.name))</code>', '<code>JSON.stringify(players.map(p =&gt; p.name))</code>', '<code>JSON.stringify(players.map(p =&gt; p.name))</code>')],
        starter: 'const text = \'[{"name":"Ann","score":120},{"name":"Bob","score":95},{"name":"Kate","score":150}]\';\n',
        solution: 'const text = \'[{"name":"Ann","score":120},{"name":"Bob","score":95},{"name":"Kate","score":150}]\';\nconst players = JSON.parse(text);\nconst best = players.reduce((a, b) => (b.score > a.score ? b : a));\nconsole.log(best.name);\nconsole.log(JSON.stringify(players.map((p) => p.name)));',
        hint: L('Очікувано: <code>Kate</code> і <code>["Ann","Bob","Kate"]</code>.', 'Ожидается: <code>Kate</code> и <code>["Ann","Bob","Kate"]</code>.', 'Expected: <code>Kate</code> and <code>["Ann","Bob","Kate"]</code>.'),
        expected: 'Kate\n["Ann","Bob","Kate"]',
        must: /JSON\.parse[\s\S]*JSON\.stringify/
      },
      quiz: { q: L('Що з цього — коректний JSON?', 'Что из этого — корректный JSON?', 'Which is valid JSON?'), options: ["{'a': 1}", '{"a": 1}', '{a: 1}'], answer: 1, explain: L('Ключі — у подвійних лапках.', 'Ключи — в двойных кавычках.', 'Keys in double quotes.') },
      ref: [{ code: 'JSON.stringify(obj, null, 2)', d: L('об’єкт → текст', 'объект → текст', 'object → text') }, { code: 'JSON.parse(text)', d: L('текст → об’єкт', 'текст → объект', 'text → object') }]
    },
    {
      id: 'classes', chapter: CH7,
      title: L('Класи', 'Классы', 'Classes'),
      theory: L(
        `<p><b>Клас</b> — шаблон для створення однотипних об’єктів:</p>
<pre class="inline-code">class Enemy {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
  }
  hit(damage) {
    this.hp = Math.max(0, this.hp - damage);
  }
  get alive() {            // геттер — читається як властивість
    return this.hp > 0;
  }
}
const slime = new Enemy("Slime", 30);
slime.hit(10);</pre>
<ul><li><code>constructor</code> викликається при <code>new</code> і налаштовує об’єкт.</li><li>Методи пишуться без слова <code>function</code>.</li><li><code>get</code> / <code>set</code> — властивості з логікою.</li><li><code>static</code> — метод самого класу, а не об’єктів: <code>Enemy.create()</code>.</li><li><code>#secret</code> — приватне поле, недоступне ззовні.</li></ul>`,
        `<p><b>Класс</b> — шаблон для создания однотипных объектов:</p>
<pre class="inline-code">class Enemy {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
  }
  hit(damage) {
    this.hp = Math.max(0, this.hp - damage);
  }
  get alive() {            // геттер — читается как свойство
    return this.hp > 0;
  }
}
const slime = new Enemy("Slime", 30);
slime.hit(10);</pre>
<ul><li><code>constructor</code> вызывается при <code>new</code> и настраивает объект.</li><li>Методы пишутся без слова <code>function</code>.</li><li><code>get</code> / <code>set</code> — свойства с логикой.</li><li><code>static</code> — метод самого класса, а не объектов: <code>Enemy.create()</code>.</li><li><code>#secret</code> — приватное поле, недоступное снаружи.</li></ul>`,
        `<p>A <b>class</b> is a template for creating similar objects:</p>
<pre class="inline-code">class Enemy {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
  }
  hit(damage) {
    this.hp = Math.max(0, this.hp - damage);
  }
  get alive() {            // a getter — read like a property
    return this.hp > 0;
  }
}
const slime = new Enemy("Slime", 30);
slime.hit(10);</pre>
<ul><li><code>constructor</code> runs on <code>new</code> and sets the object up.</li><li>Methods are written without the word <code>function</code>.</li><li><code>get</code> / <code>set</code> — properties with logic.</li><li><code>static</code> — a method of the class itself, not of objects: <code>Enemy.create()</code>.</li><li><code>#secret</code> — a private field, inaccessible from outside.</li></ul>`),
      why: L(`<p>Коли в грі 100 ворогів, писати 100 об’єктних літералів з однаковими методами — шлях до хаосу. Клас описує поведінку один раз, а <code>new</code> «штампує» об’єкти. Методи класу зберігаються один раз для всіх об’єктів — це ще й економить пам’ять.</p>`,
        `<p>Когда в игре 100 врагов, писать 100 объектных литералов с одинаковыми методами — путь к хаосу. Класс описывает поведение один раз, а <code>new</code> «штампует» объекты. Методы класса хранятся один раз для всех объектов — это ещё и экономит память.</p>`,
        `<p>With 100 enemies in a game, writing 100 object literals with identical methods is chaos. A class describes behaviour once, and <code>new</code> stamps out objects. Class methods are stored once for all objects, which also saves memory.</p>`),
      mistakes: L(`<ul><li>Забути <code>new</code> → <code>TypeError: Class constructor cannot be invoked without 'new'</code>.</li><li>Коми між методами класу (як в об’єкті) → синтаксична помилка.</li><li>Викликати геттер з дужками <code>slime.alive()</code> — це властивість.</li></ul>`,
        `<ul><li>Забыть <code>new</code> → <code>TypeError: Class constructor cannot be invoked without 'new'</code>.</li><li>Запятые между методами класса (как в объекте) → синтаксическая ошибка.</li><li>Вызывать геттер со скобками <code>slime.alive()</code> — это свойство.</li></ul>`,
        `<ul><li>Forgetting <code>new</code> → <code>TypeError: Class constructor cannot be invoked without 'new'</code>.</li><li>Commas between class methods (like in an object) → syntax error.</li><li>Calling a getter with parentheses <code>slime.alive()</code> — it’s a property.</li></ul>`),
      examples: [
        { title: L('Клас', 'Класс', 'Class'), code: 'class Dog {\n  constructor(name) {\n    this.name = name;\n  }\n  bark() {\n    return `${this.name}: Woof!`;\n  }\n}\nconst a = new Dog("Rex");\nconst b = new Dog("Bim");\nconsole.log(a.bark(), b.bark());', note: L('Два об’єкти з одного шаблону.', 'Два объекта из одного шаблона.', 'Two objects from one template.') },
        { title: L('Геттер', 'Геттер', 'Getter'), code: 'class Enemy {\n  constructor(name, hp) {\n    this.name = name;\n    this.hp = hp;\n  }\n  hit(d) { this.hp = Math.max(0, this.hp - d); }\n  get alive() { return this.hp > 0; }\n}\nconst slime = new Enemy("Slime", 30);\nslime.hit(20);\nconsole.log(slime.hp, slime.alive);\nslime.hit(20);\nconsole.log(slime.hp, slime.alive);', note: L('<code>alive</code> обчислюється, але читається як властивість.', '<code>alive</code> вычисляется, но читается как свойство.', '<code>alive</code> is computed but read like a property.') },
        { title: L('Приватне поле', 'Приватное поле', 'Private field'), code: 'class Wallet {\n  #balance = 0;\n  deposit(n) { if (n > 0) this.#balance += n; }\n  get balance() { return this.#balance; }\n}\nconst w = new Wallet();\nw.deposit(100);\nw.deposit(-50);\nconsole.log(w.balance);\nconsole.log(w["#balance"]);', note: L('Ззовні змінити баланс неможливо.', 'Снаружи изменить баланс невозможно.', 'The balance can’t be changed from outside.') },
        { title: 'static', code: 'class Temperature {\n  static toF(c) { return c * 9 / 5 + 32; }\n  static toC(f) { return ((f - 32) * 5) / 9; }\n}\nconsole.log(Temperature.toF(100));\nconsole.log(Temperature.toC(32));', note: L('Статичні методи — утиліти класу.', 'Статические методы — утилиты класса.', 'Static methods are class utilities.') }
      ],
      task: {
        text: L('Створи клас <code>Rectangle</code> з конструктором <code>(w, h)</code>, геттером <code>area</code>, методом <code>scale(k)</code> (множить обидві сторони) і методом <code>toString()</code>, що повертає <code>3x4</code>. Код нижче вже готовий.', 'Создай класс <code>Rectangle</code> с конструктором <code>(w, h)</code>, геттером <code>area</code>, методом <code>scale(k)</code> (умножает обе стороны) и методом <code>toString()</code>, возвращающим <code>3x4</code>. Код ниже уже готов.', 'Create a class <code>Rectangle</code> with a constructor <code>(w, h)</code>, a getter <code>area</code>, a method <code>scale(k)</code> (multiplies both sides) and <code>toString()</code> returning <code>3x4</code>. The code below is ready.'),
        how: [L('<code>get area() { return this.w * this.h; }</code>', '<code>get area() { return this.w * this.h; }</code>', '<code>get area() { return this.w * this.h; }</code>'), L('<code>scale(k)</code> змінює <code>this.w</code> і <code>this.h</code>.', '<code>scale(k)</code> меняет <code>this.w</code> и <code>this.h</code>.', '<code>scale(k)</code> changes <code>this.w</code> and <code>this.h</code>.')],
        starter: 'class Rectangle {\n  // your code\n}\n\nconst r = new Rectangle(3, 4);\nconsole.log(r.toString(), r.area);\nr.scale(2);\nconsole.log(r.toString(), r.area);\n',
        solution: 'class Rectangle {\n  constructor(w, h) {\n    this.w = w;\n    this.h = h;\n  }\n  get area() {\n    return this.w * this.h;\n  }\n  scale(k) {\n    this.w *= k;\n    this.h *= k;\n  }\n  toString() {\n    return `${this.w}x${this.h}`;\n  }\n}\n\nconst r = new Rectangle(3, 4);\nconsole.log(r.toString(), r.area);\nr.scale(2);\nconsole.log(r.toString(), r.area);\n',
        hint: L('Очікувано: <code>3x4 12</code> і <code>6x8 48</code>.', 'Ожидается: <code>3x4 12</code> и <code>6x8 48</code>.', 'Expected: <code>3x4 12</code> and <code>6x8 48</code>.'),
        expected: '3x4 12\n6x8 48',
        must: /class\s+Rectangle[\s\S]*get\s+area/
      },
      quiz: { q: L('Що потрібно, щоб створити об’єкт класу?', 'Что нужно, чтобы создать объект класса?', 'What do you need to create an object from a class?'), options: ['create Enemy()', 'new Enemy()', 'Enemy.new()'], answer: 1, explain: L('Ключове слово new.', 'Ключевое слово new.', 'The new keyword.') },
      ref: [{ code: 'class A { constructor() {} }', d: L('клас', 'класс', 'class') }, { code: 'new A()', d: L('створити об’єкт', 'создать объект', 'create an object') }, { code: 'get x() {}  #private', d: L('геттер, приватне поле', 'геттер, приватное поле', 'getter, private field') }]
    },
    {
      id: 'extends', chapter: CH7,
      title: L('Наслідування класів', 'Наследование классов', 'Class inheritance'),
      theory: L(
        `<p>Клас може <b>наслідувати</b> інший через <code>extends</code> — отримати всі його властивості й методи та додати свої:</p>
<pre class="inline-code">class Animal {
  constructor(name) { this.name = name; }
  speak() { return "..."; }
}
class Cat extends Animal {
  speak() { return "Meow"; }          // перевизначення
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);                     // спершу батьківський конструктор!
    this.breed = breed;
  }
  speak() { return \`\${super.speak()} Woof\`; }
}</pre>
<ul><li><code>super(...)</code> у конструкторі викликає конструктор батька — <b>обов’язково до</b> використання <code>this</code>.</li><li><code>super.method()</code> — виклик батьківської версії методу.</li><li><code>obj instanceof Animal</code> — перевірка належності.</li></ul>`,
        `<p>Класс может <b>наследовать</b> другой через <code>extends</code> — получить все его свойства и методы и добавить свои:</p>
<pre class="inline-code">class Animal {
  constructor(name) { this.name = name; }
  speak() { return "..."; }
}
class Cat extends Animal {
  speak() { return "Meow"; }          // переопределение
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);                     // сначала родительский конструктор!
    this.breed = breed;
  }
  speak() { return \`\${super.speak()} Woof\`; }
}</pre>
<ul><li><code>super(...)</code> в конструкторе вызывает конструктор родителя — <b>обязательно до</b> использования <code>this</code>.</li><li><code>super.method()</code> — вызов родительской версии метода.</li><li><code>obj instanceof Animal</code> — проверка принадлежности.</li></ul>`,
        `<p>A class can <b>inherit</b> from another with <code>extends</code> — get all its properties and methods and add its own:</p>
<pre class="inline-code">class Animal {
  constructor(name) { this.name = name; }
  speak() { return "..."; }
}
class Cat extends Animal {
  speak() { return "Meow"; }          // override
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);                     // parent constructor first!
    this.breed = breed;
  }
  speak() { return \`\${super.speak()} Woof\`; }
}</pre>
<ul><li><code>super(...)</code> in a constructor calls the parent’s constructor — <b>must come before</b> using <code>this</code>.</li><li><code>super.method()</code> calls the parent’s version of a method.</li><li><code>obj instanceof Animal</code> checks membership.</li></ul>`),
      why: L(`<p>У грі є гравець, вороги, NPC — усі мають ім’я, здоров’я, позицію. Спільне — у базовому класі <code>Character</code>, особливості — у нащадках. Змінив логіку руху в одному місці — змінилася для всіх.</p>`,
        `<p>В игре есть игрок, враги, NPC — у всех есть имя, здоровье, позиция. Общее — в базовом классе <code>Character</code>, особенности — в наследниках. Изменил логику движения в одном месте — изменилась для всех.</p>`,
        `<p>A game has a player, enemies, NPCs — all with a name, health and position. The shared part lives in a base <code>Character</code> class, the specifics in subclasses. Change movement logic once and it changes for everyone.</p>`),
      mistakes: L(`<ul><li><code>this</code> до <code>super()</code> → <code>ReferenceError: Must call super constructor</code>.</li><li>Глибокі ланцюжки наслідування (5+ рівнів) важко підтримувати.</li></ul>`,
        `<ul><li><code>this</code> до <code>super()</code> → <code>ReferenceError: Must call super constructor</code>.</li><li>Глубокие цепочки наследования (5+ уровней) сложно поддерживать.</li></ul>`,
        `<ul><li><code>this</code> before <code>super()</code> → <code>ReferenceError: Must call super constructor</code>.</li><li>Deep inheritance chains (5+ levels) are hard to maintain.</li></ul>`),
      examples: [
        { title: L('Тварини', 'Животные', 'Animals'), code: 'class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return "..."; }\n}\nclass Cat extends Animal { speak() { return "Meow"; } }\nclass Dog extends Animal { speak() { return "Woof"; } }\nfor (const a of [new Cat("Murka"), new Dog("Rex"), new Animal("Fish")]) {\n  console.log(`${a.name}: ${a.speak()}`);\n}', note: L('Поліморфізм — один виклик, різна поведінка.', 'Полиморфизм — один вызов, разное поведение.', 'Polymorphism — one call, different behaviour.') },
        { title: 'super()', code: 'class Character {\n  constructor(name, hp) { this.name = name; this.hp = hp; }\n}\nclass Boss extends Character {\n  constructor(name) {\n    super(name, 500);\n    this.phase = 1;\n  }\n}\nconst b = new Boss("Dragon");\nconsole.log(b.name, b.hp, b.phase);', note: L('Батьківський конструктор + свої поля.', 'Родительский конструктор + свои поля.', 'Parent constructor + own fields.') },
        { title: 'super.method()', code: 'class Shape {\n  describe() { return "Shape"; }\n}\nclass Circle extends Shape {\n  constructor(r) { super(); this.r = r; }\n  describe() { return `${super.describe()} > Circle r=${this.r}`; }\n}\nconsole.log(new Circle(5).describe());', note: L('Розширення батьківського методу.', 'Расширение родительского метода.', 'Extending the parent method.') },
        { title: 'instanceof', code: 'class Vehicle {}\nclass Car extends Vehicle {}\nconst c = new Car();\nconsole.log(c instanceof Car, c instanceof Vehicle, c instanceof Array);', note: L('Car — різновид Vehicle.', 'Car — разновидность Vehicle.', 'A Car is a kind of Vehicle.') }
      ],
      task: {
        text: L('Є клас <code>Employee(name, salary)</code> з методом <code>info()</code>. Створи <code>Manager extends Employee</code> з додатковим параметром <code>bonus</code>; його <code>info()</code> має повертати батьківський текст плюс <code> + bonus 500</code>. Код нижче вже готовий.', 'Есть класс <code>Employee(name, salary)</code> с методом <code>info()</code>. Создай <code>Manager extends Employee</code> с дополнительным параметром <code>bonus</code>; его <code>info()</code> должен возвращать родительский текст плюс <code> + bonus 500</code>. Код ниже уже готов.', 'There’s a class <code>Employee(name, salary)</code> with <code>info()</code>. Create <code>Manager extends Employee</code> with an extra <code>bonus</code> parameter; its <code>info()</code> returns the parent’s text plus <code> + bonus 500</code>. The code below is ready.'),
        how: [L('<code>constructor(name, salary, bonus) { super(name, salary); this.bonus = bonus; }</code>', '<code>constructor(name, salary, bonus) { super(name, salary); this.bonus = bonus; }</code>', '<code>constructor(name, salary, bonus) { super(name, salary); this.bonus = bonus; }</code>'), L('<code>info() { return `${super.info()} + bonus ${this.bonus}`; }</code>', '<code>info() { return `${super.info()} + bonus ${this.bonus}`; }</code>', '<code>info() { return `${super.info()} + bonus ${this.bonus}`; }</code>')],
        starter: 'class Employee {\n  constructor(name, salary) {\n    this.name = name;\n    this.salary = salary;\n  }\n  info() {\n    return `${this.name}: ${this.salary}`;\n  }\n}\n\n// class Manager ...\n\nconsole.log(new Employee("Ann", 1000).info());\nconsole.log(new Manager("Bob", 2000, 500).info());\n',
        solution: 'class Employee {\n  constructor(name, salary) {\n    this.name = name;\n    this.salary = salary;\n  }\n  info() {\n    return `${this.name}: ${this.salary}`;\n  }\n}\n\nclass Manager extends Employee {\n  constructor(name, salary, bonus) {\n    super(name, salary);\n    this.bonus = bonus;\n  }\n  info() {\n    return `${super.info()} + bonus ${this.bonus}`;\n  }\n}\n\nconsole.log(new Employee("Ann", 1000).info());\nconsole.log(new Manager("Bob", 2000, 500).info());\n',
        hint: L('Очікувано: <code>Ann: 1000</code> і <code>Bob: 2000 + bonus 500</code>.', 'Ожидается: <code>Ann: 1000</code> и <code>Bob: 2000 + bonus 500</code>.', 'Expected: <code>Ann: 1000</code> and <code>Bob: 2000 + bonus 500</code>.'),
        expected: 'Ann: 1000\nBob: 2000 + bonus 500',
        must: /extends\s+Employee[\s\S]*super\s*\(/
      },
      quiz: { q: L('Що треба викликати в конструкторі нащадка перед <code>this</code>?', 'Что нужно вызвать в конструкторе наследника перед <code>this</code>?', 'What must a subclass constructor call before using <code>this</code>?'), options: ['this()', 'super()', 'parent()'], answer: 1, explain: L('Спершу — конструктор батька.', 'Сначала — конструктор родителя.', 'The parent constructor first.') },
      ref: [{ code: 'class B extends A', d: L('наслідування', 'наследование', 'inheritance') }, { code: 'super(...)  super.m()', d: L('звернення до батька', 'обращение к родителю', 'call the parent') }]
    },
    {
      id: 'errors', chapter: CH7,
      title: L('Помилки: try / catch / throw', 'Ошибки: try / catch / throw', 'Errors: try / catch / throw'),
      theory: L(
        `<p>Коли щось іде не так, JS <b>кидає помилку</b> (exception). Без обробки програма зупиняється. <code>try/catch</code> дозволяє перехопити помилку і продовжити роботу:</p>
<pre class="inline-code">try {
  const data = JSON.parse(text);
} catch (err) {
  console.log("Bad data:", err.message);
} finally {
  console.log("always runs");
}</pre>
<p>Свої помилки кидають через <code>throw</code>:</p>
<pre class="inline-code">if (age < 0) throw new Error("Age cannot be negative");</pre>
<p>Об’єкт помилки має <code>name</code> (тип: <code>TypeError</code>, <code>RangeError</code>…) і <code>message</code> (опис). Можна створювати власні класи помилок: <code>class ValidationError extends Error {}</code>.</p>`,
        `<p>Когда что-то идёт не так, JS <b>бросает ошибку</b> (exception). Без обработки программа останавливается. <code>try/catch</code> позволяет перехватить ошибку и продолжить работу:</p>
<pre class="inline-code">try {
  const data = JSON.parse(text);
} catch (err) {
  console.log("Bad data:", err.message);
} finally {
  console.log("always runs");
}</pre>
<p>Свои ошибки бросают через <code>throw</code>:</p>
<pre class="inline-code">if (age < 0) throw new Error("Age cannot be negative");</pre>
<p>Объект ошибки имеет <code>name</code> (тип: <code>TypeError</code>, <code>RangeError</code>…) и <code>message</code> (описание). Можно создавать свои классы ошибок: <code>class ValidationError extends Error {}</code>.</p>`,
        `<p>When something goes wrong, JS <b>throws an error</b> (exception). Unhandled, it stops the program. <code>try/catch</code> lets you catch it and carry on:</p>
<pre class="inline-code">try {
  const data = JSON.parse(text);
} catch (err) {
  console.log("Bad data:", err.message);
} finally {
  console.log("always runs");
}</pre>
<p>Throw your own errors with <code>throw</code>:</p>
<pre class="inline-code">if (age < 0) throw new Error("Age cannot be negative");</pre>
<p>An error object has a <code>name</code> (type: <code>TypeError</code>, <code>RangeError</code>…) and a <code>message</code>. You can create custom error classes: <code>class ValidationError extends Error {}</code>.</p>`),
      why: L(`<p>Мережа може зникнути, сервер — повернути сміття, користувач — ввести дурницю. Хороша програма не «падає», а пояснює, що сталося. <code>throw</code> дозволяє функції чесно сказати «я не можу це зробити», а не повертати дивне значення.</p>`,
        `<p>Сеть может пропасть, сервер — вернуть мусор, пользователь — ввести ерунду. Хорошая программа не «падает», а объясняет, что случилось. <code>throw</code> позволяет функции честно сказать «я не могу это сделать», а не возвращать странное значение.</p>`,
        `<p>The network can drop, a server can return garbage, a user can type nonsense. A good program doesn’t crash — it explains what happened. <code>throw</code> lets a function honestly say “I can’t do this” instead of returning a strange value.</p>`),
      mistakes: L(`<ul><li>Порожній <code>catch {}</code> ховає помилки — хоча б виведи повідомлення.</li><li><code>throw "text"</code> замість <code>throw new Error("text")</code> — втрачається стек і <code>name</code>.</li></ul>`,
        `<ul><li>Пустой <code>catch {}</code> прячет ошибки — хотя бы выведи сообщение.</li><li><code>throw "text"</code> вместо <code>throw new Error("text")</code> — теряется стек и <code>name</code>.</li></ul>`,
        `<ul><li>An empty <code>catch {}</code> hides errors — at least print a message.</li><li><code>throw "text"</code> instead of <code>throw new Error("text")</code> — you lose the stack and <code>name</code>.</li></ul>`),
      examples: [
        { title: 'try / catch', code: 'const inputs = [\'{"a":1}\', "oops", "[1,2]"];\nfor (const text of inputs) {\n  try {\n    const data = JSON.parse(text);\n    console.log("OK:", data);\n  } catch (err) {\n    console.log("Bad JSON:", err.name);\n  }\n}', note: L('Програма не падає на поганих даних.', 'Программа не падает на плохих данных.', 'The program survives bad data.') },
        { title: 'throw', code: 'function setAge(age) {\n  if (typeof age !== "number") throw new TypeError("Age must be a number");\n  if (age < 0) throw new RangeError("Age cannot be negative");\n  return age;\n}\nfor (const v of [15, -3, "ten"]) {\n  try {\n    console.log("Age set:", setAge(v));\n  } catch (e) {\n    console.log(`${e.name}: ${e.message}`);\n  }\n}', note: L('Різні типи помилок для різних проблем.', 'Разные типы ошибок для разных проблем.', 'Different error types for different problems.') },
        { title: 'finally', code: 'function load() {\n  console.log("Loading...");\n  try {\n    throw new Error("Server down");\n  } catch (e) {\n    console.log("Error:", e.message);\n  } finally {\n    console.log("Hide spinner");\n  }\n}\nload();', note: L('finally — для «прибирання».', 'finally — для «уборки».', 'finally is for cleanup.') },
        { title: L('Свій клас', 'Свой класс', 'Custom class'), code: 'class ValidationError extends Error {\n  constructor(field, msg) {\n    super(msg);\n    this.name = "ValidationError";\n    this.field = field;\n  }\n}\ntry {\n  throw new ValidationError("email", "Email is invalid");\n} catch (e) {\n  console.log(e.name, e.field, e.message, e instanceof Error);\n}', note: L('Власна помилка з додатковими даними.', 'Своя ошибка с дополнительными данными.', 'A custom error with extra data.') }
      ],
      task: {
        text: L('Напиши функцію <code>divide(a, b)</code>, яка кидає <code>Error("Division by zero")</code>, якщо <code>b === 0</code>, інакше повертає <code>a / b</code>. Код нижче викликає її для трьох пар — обгорни виклик у <code>try/catch</code> так, щоб для помилки виводилося <code>Error: Division by zero</code>.', 'Напиши функцию <code>divide(a, b)</code>, которая бросает <code>Error("Division by zero")</code>, если <code>b === 0</code>, иначе возвращает <code>a / b</code>. Код ниже вызывает её для трёх пар — оберни вызов в <code>try/catch</code> так, чтобы для ошибки выводилось <code>Error: Division by zero</code>.', 'Write <code>divide(a, b)</code> that throws <code>Error("Division by zero")</code> when <code>b === 0</code>, otherwise returns <code>a / b</code>. The code below calls it for three pairs — wrap the call in <code>try/catch</code> so an error prints <code>Error: Division by zero</code>.'),
        how: [L('<code>if (b === 0) throw new Error("Division by zero");</code>', '<code>if (b === 0) throw new Error("Division by zero");</code>', '<code>if (b === 0) throw new Error("Division by zero");</code>'), L('У циклі: <code>try { console.log(divide(a, b)); } catch (e) { console.log(`Error: ${e.message}`); }</code>', 'В цикле: <code>try { console.log(divide(a, b)); } catch (e) { console.log(`Error: ${e.message}`); }</code>', 'In the loop: <code>try { console.log(divide(a, b)); } catch (e) { console.log(`Error: ${e.message}`); }</code>')],
        starter: 'function divide(a, b) {\n  // your code\n}\n\nfor (const [a, b] of [[10, 2], [5, 0], [9, 3]]) {\n  console.log(divide(a, b));\n}\n',
        solution: 'function divide(a, b) {\n  if (b === 0) throw new Error("Division by zero");\n  return a / b;\n}\n\nfor (const [a, b] of [[10, 2], [5, 0], [9, 3]]) {\n  try {\n    console.log(divide(a, b));\n  } catch (e) {\n    console.log(`Error: ${e.message}`);\n  }\n}\n',
        hint: L('Очікувано: 5, Error: Division by zero, 3.', 'Ожидается: 5, Error: Division by zero, 3.', 'Expected: 5, Error: Division by zero, 3.'),
        expected: '5\nError: Division by zero\n3',
        must: /throw\s+new\s+Error[\s\S]*catch/
      },
      quiz: { q: L('Яка властивість помилки містить її опис?', 'Какое свойство ошибки содержит её описание?', 'Which error property holds its description?'), options: ['name', 'message', 'text'], answer: 1, explain: L('name — тип, message — опис.', 'name — тип, message — описание.', 'name is the type, message the description.') },
      ref: [{ code: 'try {} catch (e) {} finally {}', d: L('обробка помилок', 'обработка ошибок', 'error handling') }, { code: 'throw new Error("msg")', d: L('кинути помилку', 'бросить ошибку', 'throw an error') }]
    },
    {
      id: 'map-set', chapter: CH7,
      title: L('Map і Set', 'Map и Set', 'Map and Set'),
      theory: L(
        `<p><b>Set</b> — колекція <b>унікальних</b> значень:</p>
<pre class="inline-code">const tags = new Set(["js", "css", "js"]);
tags.add("html");
tags.has("css");   // true
tags.size;         // 3</pre>
<p>Найпопулярніший трюк — прибрати дублікати з масиву: <code>[...new Set(arr)]</code>.</p>
<p><b>Map</b> — словник «ключ → значення», де ключем може бути <b>будь-що</b> (навіть об’єкт), і порядок додавання зберігається:</p>
<pre class="inline-code">const scores = new Map();
scores.set("Ann", 120);
scores.get("Ann");     // 120
scores.has("Bob");     // false
for (const [name, s] of scores) { ... }</pre>
<p>Методи: <code>set</code>, <code>get</code>, <code>has</code>, <code>delete</code>, <code>clear</code>, властивість <code>size</code>.</p>`,
        `<p><b>Set</b> — коллекция <b>уникальных</b> значений:</p>
<pre class="inline-code">const tags = new Set(["js", "css", "js"]);
tags.add("html");
tags.has("css");   // true
tags.size;         // 3</pre>
<p>Самый популярный трюк — убрать дубликаты из массива: <code>[...new Set(arr)]</code>.</p>
<p><b>Map</b> — словарь «ключ → значение», где ключом может быть <b>что угодно</b> (даже объект), и порядок добавления сохраняется:</p>
<pre class="inline-code">const scores = new Map();
scores.set("Ann", 120);
scores.get("Ann");     // 120
scores.has("Bob");     // false
for (const [name, s] of scores) { ... }</pre>
<p>Методы: <code>set</code>, <code>get</code>, <code>has</code>, <code>delete</code>, <code>clear</code>, свойство <code>size</code>.</p>`,
        `<p>A <b>Set</b> is a collection of <b>unique</b> values:</p>
<pre class="inline-code">const tags = new Set(["js", "css", "js"]);
tags.add("html");
tags.has("css");   // true
tags.size;         // 3</pre>
<p>The most popular trick is removing duplicates: <code>[...new Set(arr)]</code>.</p>
<p>A <b>Map</b> is a key → value dictionary where a key can be <b>anything</b> (even an object) and insertion order is kept:</p>
<pre class="inline-code">const scores = new Map();
scores.set("Ann", 120);
scores.get("Ann");     // 120
scores.has("Bob");     // false
for (const [name, s] of scores) { ... }</pre>
<p>Methods: <code>set</code>, <code>get</code>, <code>has</code>, <code>delete</code>, <code>clear</code>, and the <code>size</code> property.</p>`),
      why: L(`<p>Звичайний об’єкт теж може бути словником, але в нього ключі завжди рядки, є «вбудовані» ключі на кшталт <code>toString</code>, і немає зручного <code>size</code>. <code>Map</code> створено саме для словників, а <code>Set</code> — для швидкої перевірки «чи вже було таке значення».</p>`,
        `<p>Обычный объект тоже может быть словарём, но у него ключи всегда строки, есть «встроенные» ключи вроде <code>toString</code>, и нет удобного <code>size</code>. <code>Map</code> создан именно для словарей, а <code>Set</code> — для быстрой проверки «было ли уже такое значение».</p>`,
        `<p>A plain object can be a dictionary too, but its keys are always strings, it has built-in keys like <code>toString</code>, and no handy <code>size</code>. <code>Map</code> is made for dictionaries, and <code>Set</code> for quick “have I seen this value” checks.</p>`),
      mistakes: L(`<ul><li><code>map["key"] = 1</code> замість <code>map.set("key", 1)</code> — значення не потрапить у Map.</li><li><code>new Set("hello")</code> розбиває рядок на символи.</li></ul>`,
        `<ul><li><code>map["key"] = 1</code> вместо <code>map.set("key", 1)</code> — значение не попадёт в Map.</li><li><code>new Set("hello")</code> разбивает строку на символы.</li></ul>`,
        `<ul><li><code>map["key"] = 1</code> instead of <code>map.set("key", 1)</code> — the value doesn’t go into the Map.</li><li><code>new Set("hello")</code> splits the string into characters.</li></ul>`),
      examples: [
        { title: 'Set', code: 'const visited = new Set();\nfor (const city of ["Kyiv", "Lviv", "Kyiv", "Odesa", "Lviv"]) {\n  visited.add(city);\n}\nconsole.log(visited.size);\nconsole.log(visited.has("Lviv"));\nconsole.log([...visited]);', note: L('Повтори автоматично відкидаються.', 'Повторы автоматически отбрасываются.', 'Duplicates are dropped automatically.') },
        { title: L('Без дублікатів', 'Без дубликатов', 'No duplicates'), code: 'const nums = [3, 1, 3, 2, 1, 5];\nconst unique = [...new Set(nums)];\nconsole.log(unique);\nconsole.log(new Set("banana"));', note: L('Класичний однорядковий трюк.', 'Классический однострочный трюк.', 'A classic one-liner.') },
        { title: 'Map', code: 'const scores = new Map();\nscores.set("Ann", 120).set("Bob", 95);\nscores.set("Ann", scores.get("Ann") + 10);\nconsole.log(scores.get("Ann"), scores.size);\nfor (const [name, s] of scores) console.log(name, s);', note: L('set можна ланцюжити.', 'set можно сцеплять.', 'set calls can be chained.') },
        { title: L('Лічильник', 'Счётчик', 'Counter'), code: 'const text = "the cat and the dog and the bird";\nconst counts = new Map();\nfor (const w of text.split(" ")) {\n  counts.set(w, (counts.get(w) ?? 0) + 1);\n}\nconsole.log(counts);', note: L('Підрахунок частоти слів.', 'Подсчёт частоты слов.', 'Counting word frequency.') }
      ],
      task: {
        text: L('Є масив голосів <code>votes = ["cats", "dogs", "cats", "birds", "dogs", "cats"]</code>. Виведи кількість різних варіантів (через <code>Set</code>). Потім порахуй голоси в <code>Map</code> і виведи кожен варіант у форматі <code>cats: 3</code> у порядку першої появи.', 'Есть массив голосов <code>votes = ["cats", "dogs", "cats", "birds", "dogs", "cats"]</code>. Выведи количество разных вариантов (через <code>Set</code>). Затем посчитай голоса в <code>Map</code> и выведи каждый вариант в формате <code>cats: 3</code> в порядке первого появления.', 'Given <code>votes = ["cats", "dogs", "cats", "birds", "dogs", "cats"]</code>, print the number of distinct options (via <code>Set</code>). Then count the votes in a <code>Map</code> and print each as <code>cats: 3</code> in order of first appearance.'),
        how: [L('<code>new Set(votes).size</code>', '<code>new Set(votes).size</code>', '<code>new Set(votes).size</code>'), L('<code>counts.set(v, (counts.get(v) ?? 0) + 1)</code>', '<code>counts.set(v, (counts.get(v) ?? 0) + 1)</code>', '<code>counts.set(v, (counts.get(v) ?? 0) + 1)</code>'), L('<code>for (const [k, n] of counts)</code>', '<code>for (const [k, n] of counts)</code>', '<code>for (const [k, n] of counts)</code>')],
        starter: 'const votes = ["cats", "dogs", "cats", "birds", "dogs", "cats"];\n',
        solution: 'const votes = ["cats", "dogs", "cats", "birds", "dogs", "cats"];\nconsole.log(new Set(votes).size);\nconst counts = new Map();\nfor (const v of votes) counts.set(v, (counts.get(v) ?? 0) + 1);\nfor (const [k, n] of counts) console.log(`${k}: ${n}`);',
        hint: L('Очікувано: 3, cats: 3, dogs: 2, birds: 1.', 'Ожидается: 3, cats: 3, dogs: 2, birds: 1.', 'Expected: 3, cats: 3, dogs: 2, birds: 1.'),
        expected: '3\ncats: 3\ndogs: 2\nbirds: 1',
        must: /new\s+Set[\s\S]*new\s+Map/
      },
      quiz: { q: L('Що поверне <code>new Set([1, 1, 2]).size</code>?', 'Что вернёт <code>new Set([1, 1, 2]).size</code>?', 'What is <code>new Set([1, 1, 2]).size</code>?'), options: ['3', '2', '1'], answer: 1, explain: L('Унікальні: 1 і 2.', 'Уникальные: 1 и 2.', 'Unique: 1 and 2.') },
      ref: [{ code: 'new Set(arr)  [...new Set(arr)]', d: L('унікальні значення', 'уникальные значения', 'unique values') }, { code: 'map.set(k, v) map.get(k)', d: L('словник Map', 'словарь Map', 'Map dictionary') }]
    },
    {
      id: 'async', chapter: CH7,
      title: L('Асинхронність: Promise і async/await', 'Асинхронность: Promise и async/await', 'Async: Promise and async/await'),
      theory: L(
        `<p>Деякі дії потребують часу: запит до сервера, таймер, читання файлу. JS не чекає на них, а продовжує виконувати код — це <b>асинхронність</b>.</p>
<p><code>setTimeout(fn, ms)</code> — виконати функцію через <code>ms</code> мілісекунд.</p>
<p><b>Promise</b> («обіцянка») — об’єкт, що представляє результат, який буде пізніше: успіх (<code>resolve</code>) або помилка (<code>reject</code>).</p>
<pre class="inline-code">const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));</pre>
<p><code>async</code>/<code>await</code> дозволяє писати асинхронний код так, ніби він звичайний:</p>
<pre class="inline-code">async function start() {
  console.log("Loading...");
  await wait(500);          // чекаємо, не блокуючи програму
  console.log("Done!");
}</pre>
<p>Помилки в <code>async</code>-функціях ловлять звичайним <code>try/catch</code>. <code>Promise.all([...])</code> чекає на кілька обіцянок одночасно.</p>`,
        `<p>Некоторые действия требуют времени: запрос к серверу, таймер, чтение файла. JS не ждёт их, а продолжает выполнять код — это <b>асинхронность</b>.</p>
<p><code>setTimeout(fn, ms)</code> — выполнить функцию через <code>ms</code> миллисекунд.</p>
<p><b>Promise</b> («обещание») — объект, представляющий результат, который будет позже: успех (<code>resolve</code>) или ошибка (<code>reject</code>).</p>
<pre class="inline-code">const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));</pre>
<p><code>async</code>/<code>await</code> позволяет писать асинхронный код так, будто он обычный:</p>
<pre class="inline-code">async function start() {
  console.log("Loading...");
  await wait(500);          // ждём, не блокируя программу
  console.log("Done!");
}</pre>
<p>Ошибки в <code>async</code>-функциях ловят обычным <code>try/catch</code>. <code>Promise.all([...])</code> ждёт несколько обещаний одновременно.</p>`,
        `<p>Some actions take time: a server request, a timer, reading a file. JS doesn’t wait for them — it keeps running code. That’s <b>asynchrony</b>.</p>
<p><code>setTimeout(fn, ms)</code> runs a function after <code>ms</code> milliseconds.</p>
<p>A <b>Promise</b> is an object representing a result that arrives later: success (<code>resolve</code>) or failure (<code>reject</code>).</p>
<pre class="inline-code">const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));</pre>
<p><code>async</code>/<code>await</code> lets you write async code as if it were ordinary:</p>
<pre class="inline-code">async function start() {
  console.log("Loading...");
  await wait(500);          // wait without blocking the program
  console.log("Done!");
}</pre>
<p>Errors in <code>async</code> functions are caught with a normal <code>try/catch</code>. <code>Promise.all([...])</code> waits for several promises at once.</p>`),
      why: L(`<p>Якби JS чекав відповіді сервера, «завмираючи», сторінка не реагувала б на кліки цілі секунди. Асинхронність дозволяє інтерфейсу залишатися живим, поки дані завантажуються. <code>await</code> робить такий код читабельним, без «пекла колбеків».</p>`,
        `<p>Если бы JS ждал ответа сервера, «замирая», страница не реагировала бы на клики целые секунды. Асинхронность позволяет интерфейсу оставаться живым, пока данные загружаются. <code>await</code> делает такой код читаемым, без «ада колбэков».</p>`,
        `<p>If JS froze while waiting for a server, the page wouldn’t respond to clicks for seconds. Asynchrony keeps the interface alive while data loads. <code>await</code> keeps that code readable — no “callback hell”.</p>`),
      mistakes: L(`<ul><li><code>await</code> поза <code>async</code>-функцією (у звичайній функції) → помилка.</li><li>Забути <code>await</code> — отримаєш Promise замість значення.</li><li>Чекати, що код після <code>setTimeout</code> виконається пізніше за таймер — ні, раніше.</li></ul>`,
        `<ul><li><code>await</code> вне <code>async</code>-функции (в обычной функции) → ошибка.</li><li>Забыть <code>await</code> — получишь Promise вместо значения.</li><li>Ждать, что код после <code>setTimeout</code> выполнится позже таймера — нет, раньше.</li></ul>`,
        `<ul><li><code>await</code> outside an <code>async</code> function (in a regular one) → error.</li><li>Forgetting <code>await</code> — you get a Promise instead of the value.</li><li>Expecting code after <code>setTimeout</code> to run after the timer — it runs before.</li></ul>`),
      examples: [
        { title: 'setTimeout', code: 'console.log("1: start");\nsetTimeout(() => console.log("3: timer"), 300);\nconsole.log("2: end of code");', note: L('Таймер спрацьовує після решти коду.', 'Таймер срабатывает после остального кода.', 'The timer fires after the rest of the code.') },
        { title: 'Promise', code: 'const coin = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    Math.random() < 0.5 ? resolve("heads") : reject(new Error("tails"));\n  }, 200);\n});\ncoin\n  .then((r) => console.log("Win:", r))\n  .catch((e) => console.log("Lose:", e.message));', note: L('then — успіх, catch — помилка. Запусти кілька разів.', 'then — успех, catch — ошибка. Запусти несколько раз.', 'then is success, catch is failure. Run it several times.') },
        { title: 'async / await', code: 'const wait = (ms) => new Promise((r) => setTimeout(r, ms));\nasync function countdown() {\n  for (let i = 3; i > 0; i--) {\n    console.log(i);\n    await wait(200);\n  }\n  console.log("Go!");\n}\ncountdown();', note: L('Код виглядає послідовним, але не блокує сторінку.', 'Код выглядит последовательным, но не блокирует страницу.', 'The code looks sequential but doesn’t block the page.') },
        { title: 'Promise.all', code: 'const fakeFetch = (name, ms) => new Promise((r) => setTimeout(() => r(`${name} loaded`), ms));\nasync function loadAll() {\n  const results = await Promise.all([fakeFetch("users", 300), fakeFetch("posts", 100)]);\n  console.log(results);\n}\nloadAll();', note: L('Обидва «запити» йдуть паралельно.', 'Оба «запроса» идут параллельно.', 'Both “requests” run in parallel.') }
      ],
      task: {
        text: L('Напиши функцію <code>wait(ms)</code>, що повертає Promise, і <code>async</code>-функцію <code>cook()</code>, яка виводить <code>Boiling water...</code>, чекає 200 мс, виводить <code>Adding pasta...</code>, чекає 300 мс і виводить <code>Pasta is ready!</code>. Наприкінці коду виклич <code>cook()</code>.', 'Напиши функцию <code>wait(ms)</code>, возвращающую Promise, и <code>async</code>-функцию <code>cook()</code>, которая выводит <code>Boiling water...</code>, ждёт 200 мс, выводит <code>Adding pasta...</code>, ждёт 300 мс и выводит <code>Pasta is ready!</code>. В конце кода вызови <code>cook()</code>.', 'Write <code>wait(ms)</code> returning a Promise, and an <code>async</code> function <code>cook()</code> that prints <code>Boiling water...</code>, waits 200 ms, prints <code>Adding pasta...</code>, waits 300 ms and prints <code>Pasta is ready!</code>. Call <code>cook()</code> at the end.'),
        how: [L('<code>const wait = (ms) =&gt; new Promise((r) =&gt; setTimeout(r, ms));</code>', '<code>const wait = (ms) =&gt; new Promise((r) =&gt; setTimeout(r, ms));</code>', '<code>const wait = (ms) =&gt; new Promise((r) =&gt; setTimeout(r, ms));</code>'), L('<code>async function cook() { ...; await wait(200); ... }</code>', '<code>async function cook() { ...; await wait(200); ... }</code>', '<code>async function cook() { ...; await wait(200); ... }</code>')],
        starter: '',
        solution: 'const wait = (ms) => new Promise((r) => setTimeout(r, ms));\n\nasync function cook() {\n  console.log("Boiling water...");\n  await wait(200);\n  console.log("Adding pasta...");\n  await wait(300);\n  console.log("Pasta is ready!");\n}\n\ncook();',
        hint: L('Без <code>await</code> усі три повідомлення з’являться одразу.', 'Без <code>await</code> все три сообщения появятся сразу.', 'Without <code>await</code> all three messages appear at once.'),
        expected: 'Boiling water...\nAdding pasta...\nPasta is ready!',
        must: /async[\s\S]*await[\s\S]*await/
      },
      quiz: { q: L('У якому порядку виведеться: <code>console.log(1); setTimeout(() =&gt; console.log(2), 0); console.log(3);</code>?', 'В каком порядке выведется: <code>console.log(1); setTimeout(() =&gt; console.log(2), 0); console.log(3);</code>?', 'In what order is this printed: <code>console.log(1); setTimeout(() =&gt; console.log(2), 0); console.log(3);</code>?'), options: ['1 2 3', '1 3 2', '2 1 3'], answer: 1, explain: L('Навіть таймер на 0 мс чекає завершення поточного коду.', 'Даже таймер на 0 мс ждёт завершения текущего кода.', 'Even a 0 ms timer waits for the current code to finish.') },
      ref: [{ code: 'setTimeout(fn, ms)', d: L('відкладений виклик', 'отложенный вызов', 'delayed call') }, { code: 'new Promise((res, rej) => ...)', d: L('обіцянка', 'обещание', 'promise') }, { code: 'async function f() { await p; }', d: L('async/await', 'async/await', 'async/await') }]
    },
    {
      id: 'project-todo', chapter: CH8, project: true,
      title: L('Проєкт: менеджер завдань', 'Проект: менеджер задач', 'Project: Task manager'),
      theory: L(
        `<p>Створимо ядро застосунку «Список справ» — класу, що керує завданнями. Саме така логіка стоїть за Todoist, Trello та нотатками в телефоні.</p>
<h4>Клас <code>TodoList</code></h4>
<ul><li><code>add(title)</code> — додає завдання <code>{ id, title, done: false }</code>; id — 1, 2, 3… Повертає id.</li><li><code>toggle(id)</code> — перемикає <code>done</code>.</li><li><code>remove(id)</code> — видаляє.</li><li><code>get pending</code> — кількість невиконаних.</li><li><code>print()</code> — виводить кожне завдання як <code>[x] 1. title</code> або <code>[ ] 2. title</code>.</li></ul>
<p>Використаємо класи, приватні поля, методи масивів (<code>find</code>, <code>filter</code>, <code>forEach</code>) і шаблонні рядки.</p>`,
        `<p>Создадим ядро приложения «Список дел» — класс, управляющий задачами. Именно такая логика стоит за Todoist, Trello и заметками в телефоне.</p>
<h4>Класс <code>TodoList</code></h4>
<ul><li><code>add(title)</code> — добавляет задачу <code>{ id, title, done: false }</code>; id — 1, 2, 3… Возвращает id.</li><li><code>toggle(id)</code> — переключает <code>done</code>.</li><li><code>remove(id)</code> — удаляет.</li><li><code>get pending</code> — количество невыполненных.</li><li><code>print()</code> — выводит каждую задачу как <code>[x] 1. title</code> или <code>[ ] 2. title</code>.</li></ul>
<p>Используем классы, приватные поля, методы массивов (<code>find</code>, <code>filter</code>, <code>forEach</code>) и шаблонные строки.</p>`,
        `<p>Let’s build the core of a to-do app — a class that manages tasks. This logic powers Todoist, Trello and phone notes.</p>
<h4>The <code>TodoList</code> class</h4>
<ul><li><code>add(title)</code> — adds a task <code>{ id, title, done: false }</code>; ids are 1, 2, 3… Returns the id.</li><li><code>toggle(id)</code> — flips <code>done</code>.</li><li><code>remove(id)</code> — deletes it.</li><li><code>get pending</code> — the number of unfinished tasks.</li><li><code>print()</code> — prints each task as <code>[x] 1. title</code> or <code>[ ] 2. title</code>.</li></ul>
<p>We’ll use classes, private fields, array methods (<code>find</code>, <code>filter</code>, <code>forEach</code>) and template literals.</p>`),
      why: L(`<p>Розділення «даних і логіки» від «інтерфейсу» — ключовий принцип реальної розробки. Цей клас можна підключити до будь-якого інтерфейсу: сторінки, бота чи мобільного застосунку — і він працюватиме однаково.</p>`,
        `<p>Разделение «данных и логики» и «интерфейса» — ключевой принцип реальной разработки. Этот класс можно подключить к любому интерфейсу: странице, боту или мобильному приложению — и он будет работать одинаково.</p>`,
        `<p>Separating “data and logic” from “interface” is a key principle of real development. This class can plug into any interface — a page, a bot or a mobile app — and work the same way.</p>`),
      mistakes: L(`<ul><li>Генерувати id з <code>length + 1</code> — після видалення id можуть повторитися. Тримай окремий лічильник.</li><li>Змінювати масив під час <code>forEach</code> по ньому.</li></ul>`,
        `<ul><li>Генерировать id из <code>length + 1</code> — после удаления id могут повториться. Держи отдельный счётчик.</li><li>Менять массив во время <code>forEach</code> по нему.</li></ul>`,
        `<ul><li>Generating ids from <code>length + 1</code> — after deletions ids can repeat. Keep a separate counter.</li><li>Modifying an array during <code>forEach</code> over it.</li></ul>`),
      examples: [
        { title: L('Завдання як об’єкт', 'Задача как объект', 'Task as an object'), code: 'const tasks = [];\nlet nextId = 1;\ntasks.push({ id: nextId++, title: "Learn JS", done: false });\ntasks.push({ id: nextId++, title: "Walk the dog", done: true });\nfor (const t of tasks) console.log(`[${t.done ? "x" : " "}] ${t.id}. ${t.title}`);', note: L('Тернарний оператор у шаблоні для галочки.', 'Тернарный оператор в шаблоне для галочки.', 'A ternary in the template for the checkbox.') },
        { title: 'find / filter', code: 'const tasks = [\n  { id: 1, title: "A", done: false },\n  { id: 2, title: "B", done: true },\n  { id: 3, title: "C", done: false }\n];\nconst t = tasks.find((x) => x.id === 2);\nt.done = !t.done;\nconsole.log(tasks.filter((x) => !x.done).length);\nconsole.log(tasks.filter((x) => x.id !== 1).map((x) => x.title));', note: L('Перемикання і видалення через filter.', 'Переключение и удаление через filter.', 'Toggling and deleting via filter.') },
        { title: L('Каркас класу', 'Каркас класса', 'Class skeleton'), code: 'class TodoList {\n  #items = [];\n  #nextId = 1;\n  add(title) {\n    const id = this.#nextId++;\n    this.#items.push({ id, title, done: false });\n    return id;\n  }\n  get count() { return this.#items.length; }\n}\nconst list = new TodoList();\nconsole.log(list.add("x"), list.add("y"), list.count);', note: L('Приватні поля захищають дані.', 'Приватные поля защищают данные.', 'Private fields protect the data.') }
      ],
      task: {
        text: L('Реалізуй клас <code>TodoList</code> за описом у теорії. Код перевірки вже внизу.', 'Реализуй класс <code>TodoList</code> по описанию в теории. Код проверки уже внизу.', 'Implement the <code>TodoList</code> class as described in the theory. The test code is at the bottom.'),
        how: [L('Приватні поля <code>#items</code> і <code>#nextId</code>.', 'Приватные поля <code>#items</code> и <code>#nextId</code>.', 'Private fields <code>#items</code> and <code>#nextId</code>.'), L('<code>toggle</code> — через <code>find</code>, <code>remove</code> — через <code>filter</code>.', '<code>toggle</code> — через <code>find</code>, <code>remove</code> — через <code>filter</code>.', '<code>toggle</code> via <code>find</code>, <code>remove</code> via <code>filter</code>.'), L('<code>print()</code> використовує <code>forEach</code> і шаблон <code>`[${done ? "x" : " "}] ${id}. ${title}`</code>.', '<code>print()</code> использует <code>forEach</code> и шаблон <code>`[${done ? "x" : " "}] ${id}. ${title}`</code>.', '<code>print()</code> uses <code>forEach</code> and the template <code>`[${done ? "x" : " "}] ${id}. ${title}`</code>.')],
        starter: 'class TodoList {\n  // your code\n}\n\nconst list = new TodoList();\nlist.add("Learn JavaScript");\nconst walk = list.add("Walk the dog");\nlist.add("Buy milk");\nlist.toggle(walk);\nlist.remove(3);\nlist.add("Call grandma");\nlist.print();\nconsole.log("Pending:", list.pending);\n',
        solution: 'class TodoList {\n  #items = [];\n  #nextId = 1;\n  add(title) {\n    const id = this.#nextId++;\n    this.#items.push({ id, title, done: false });\n    return id;\n  }\n  toggle(id) {\n    const t = this.#items.find((x) => x.id === id);\n    if (t) t.done = !t.done;\n  }\n  remove(id) {\n    this.#items = this.#items.filter((x) => x.id !== id);\n  }\n  get pending() {\n    return this.#items.filter((x) => !x.done).length;\n  }\n  print() {\n    this.#items.forEach((t) => console.log(`[${t.done ? "x" : " "}] ${t.id}. ${t.title}`));\n  }\n}\n\nconst list = new TodoList();\nlist.add("Learn JavaScript");\nconst walk = list.add("Walk the dog");\nlist.add("Buy milk");\nlist.toggle(walk);\nlist.remove(3);\nlist.add("Call grandma");\nlist.print();\nconsole.log("Pending:", list.pending);\n',
        hint: L('Нове завдання після видалення отримає id 4, а не 3.', 'Новая задача после удаления получит id 4, а не 3.', 'The new task after deletion gets id 4, not 3.'),
        expected: '[ ] 1. Learn JavaScript\n[x] 2. Walk the dog\n[ ] 4. Call grandma\nPending: 2',
        must: /class\s+TodoList/
      },
      quiz: { q: L('Чому id не варто рахувати як <code>items.length + 1</code>?', 'Почему id не стоит считать как <code>items.length + 1</code>?', 'Why not compute ids as <code>items.length + 1</code>?'), options: [L('це повільно', 'это медленно', 'it’s slow'), L('після видалення id можуть повторитися', 'после удаления id могут повториться', 'ids can repeat after deletions'), L('length не існує', 'length не существует', 'length doesn’t exist')], answer: 1, explain: L('Окремий лічильник гарантує унікальність.', 'Отдельный счётчик гарантирует уникальность.', 'A separate counter guarantees uniqueness.') },
      ref: [{ code: 'arr.find(x => x.id === id)', d: L('знайти за id', 'найти по id', 'find by id') }]
    },
    {
      id: 'project-shop', chapter: CH8, project: true,
      title: L('Проєкт: інтернет-магазин', 'Проект: интернет-магазин', 'Project: Online shop'),
      theory: L(
        `<p>Фінальний проєкт курсу — логіка кошика інтернет-магазину з промокодами та асинхронною «оплатою».</p>
<h4>Що потрібно</h4>
<ul><li>Каталог — масив товарів <code>{ id, name, price, stock }</code>.</li><li>Клас <code>Cart</code>: <code>add(id, qty)</code> — додає товар; якщо товару немає на складі в такій кількості — кидає <code>Error("Out of stock: name")</code>.</li><li><code>total()</code> — сума з урахуванням промокоду.</li><li><code>applyCode(code)</code> — <code>"SALE10"</code> дає −10%, інший код — кидає <code>Error("Invalid code")</code>.</li><li><code>async checkout()</code> — «оплата» з затримкою: виводить <code>Paying...</code>, чекає, потім <code>Paid: 123.45</code> і очищує кошик.</li></ul>
<p>Тут зійдеться все: класи, масиви об’єктів, <code>find</code>/<code>reduce</code>, помилки та async/await.</p>`,
        `<p>Финальный проект курса — логика корзины интернет-магазина с промокодами и асинхронной «оплатой».</p>
<h4>Что нужно</h4>
<ul><li>Каталог — массив товаров <code>{ id, name, price, stock }</code>.</li><li>Класс <code>Cart</code>: <code>add(id, qty)</code> — добавляет товар; если товара нет на складе в таком количестве — бросает <code>Error("Out of stock: name")</code>.</li><li><code>total()</code> — сумма с учётом промокода.</li><li><code>applyCode(code)</code> — <code>"SALE10"</code> даёт −10%, другой код — бросает <code>Error("Invalid code")</code>.</li><li><code>async checkout()</code> — «оплата» с задержкой: выводит <code>Paying...</code>, ждёт, затем <code>Paid: 123.45</code> и очищает корзину.</li></ul>
<p>Здесь сойдётся всё: классы, массивы объектов, <code>find</code>/<code>reduce</code>, ошибки и async/await.</p>`,
        `<p>The course’s final project is the cart logic of an online shop with promo codes and an async “payment”.</p>
<h4>Requirements</h4>
<ul><li>A catalogue — an array of products <code>{ id, name, price, stock }</code>.</li><li>A <code>Cart</code> class: <code>add(id, qty)</code> adds a product; if there isn’t enough stock it throws <code>Error("Out of stock: name")</code>.</li><li><code>total()</code> — the sum including the promo code.</li><li><code>applyCode(code)</code> — <code>"SALE10"</code> gives −10%, any other code throws <code>Error("Invalid code")</code>.</li><li><code>async checkout()</code> — a delayed “payment”: prints <code>Paying...</code>, waits, then <code>Paid: 123.45</code> and empties the cart.</li></ul>
<p>Everything comes together: classes, arrays of objects, <code>find</code>/<code>reduce</code>, errors and async/await.</p>`),
      why: L(`<p>Магазини, доставки їжі, квитки — усі вони мають кошик, знижки, перевірку наявності й оплату. Пройшовши цей проєкт, ти розумітимеш логіку справжніх комерційних застосунків.</p>`,
        `<p>Магазины, доставки еды, билеты — у всех есть корзина, скидки, проверка наличия и оплата. Пройдя этот проект, ты будешь понимать логику настоящих коммерческих приложений.</p>`,
        `<p>Shops, food delivery, ticketing — they all have a cart, discounts, stock checks and payment. After this project you’ll understand the logic of real commercial apps.</p>`),
      mistakes: L(`<ul><li>Округлювати суму на кожному кроці — округлюй лише в кінці (<code>toFixed(2)</code>).</li><li>Не перевіряти, що товар існує в каталозі.</li></ul>`,
        `<ul><li>Округлять сумму на каждом шаге — округляй только в конце (<code>toFixed(2)</code>).</li><li>Не проверять, что товар существует в каталоге.</li></ul>`,
        `<ul><li>Rounding at every step — round only at the end (<code>toFixed(2)</code>).</li><li>Not checking that the product exists in the catalogue.</li></ul>`),
      examples: [
        { title: L('Сума кошика', 'Сумма корзины', 'Cart total'), code: 'const items = [{ name: "pen", price: 15, qty: 3 }, { name: "book", price: 120, qty: 1 }];\nconst total = items.reduce((s, i) => s + i.price * i.qty, 0);\nconsole.log(total, (total * 0.9).toFixed(2));', note: L('reduce + знижка.', 'reduce + скидка.', 'reduce + discount.') },
        { title: L('Перевірка складу', 'Проверка склада', 'Stock check'), code: 'const catalog = [{ id: 1, name: "mug", price: 99, stock: 2 }];\nfunction take(id, qty) {\n  const p = catalog.find((x) => x.id === id);\n  if (!p) throw new Error("No such product");\n  if (p.stock < qty) throw new Error(`Out of stock: ${p.name}`);\n  p.stock -= qty;\n  return p;\n}\ntry {\n  take(1, 1);\n  take(1, 5);\n} catch (e) {\n  console.log(e.message);\n}', note: L('Помилки як частина бізнес-логіки.', 'Ошибки как часть бизнес-логики.', 'Errors as part of business logic.') },
        { title: L('Асинхронна оплата', 'Асинхронная оплата', 'Async payment'), code: 'const wait = (ms) => new Promise((r) => setTimeout(r, ms));\nasync function pay(sum) {\n  console.log("Paying...");\n  await wait(300);\n  console.log(`Paid: ${sum.toFixed(2)}`);\n}\npay(42);', note: L('Імітація запиту до платіжної системи.', 'Имитация запроса к платёжной системе.', 'Simulating a payment provider request.') }
      ],
      task: {
        text: L('Реалізуй клас <code>Cart</code> за описом. Каталог і сценарій перевірки вже в коді. Затримка в <code>checkout</code> — 300 мс.', 'Реализуй класс <code>Cart</code> по описанию. Каталог и сценарий проверки уже в коде. Задержка в <code>checkout</code> — 300 мс.', 'Implement the <code>Cart</code> class as described. The catalogue and test scenario are already in the code. The <code>checkout</code> delay is 300 ms.'),
        how: [L('Зберігай позиції як <code>{ product, qty }</code>.', 'Храни позиции как <code>{ product, qty }</code>.', 'Store lines as <code>{ product, qty }</code>.'), L('<code>total()</code>: <code>reduce</code>, потім множник знижки.', '<code>total()</code>: <code>reduce</code>, затем множитель скидки.', '<code>total()</code>: <code>reduce</code>, then the discount multiplier.'), L('<code>checkout</code> — <code>async</code>, з <code>await wait(300)</code>, виводить суму через <code>toFixed(2)</code>.', '<code>checkout</code> — <code>async</code>, с <code>await wait(300)</code>, выводит сумму через <code>toFixed(2)</code>.', '<code>checkout</code> is <code>async</code> with <code>await wait(300)</code>, printing the sum via <code>toFixed(2)</code>.')],
        starter: 'const catalog = [\n  { id: 1, name: "Keyboard", price: 1200, stock: 5 },\n  { id: 2, name: "Mouse", price: 450, stock: 1 },\n  { id: 3, name: "Pad", price: 199.5, stock: 10 }\n];\nconst wait = (ms) => new Promise((r) => setTimeout(r, ms));\n\nclass Cart {\n  // your code\n}\n\nconst cart = new Cart();\ncart.add(1, 1);\ncart.add(3, 2);\ntry { cart.add(2, 3); } catch (e) { console.log(e.message); }\ntry { cart.applyCode("FREE"); } catch (e) { console.log(e.message); }\ncart.applyCode("SALE10");\nconsole.log(cart.total().toFixed(2));\ncart.checkout().then(() => console.log("Items left:", cart.count));\n',
        solution: 'const catalog = [\n  { id: 1, name: "Keyboard", price: 1200, stock: 5 },\n  { id: 2, name: "Mouse", price: 450, stock: 1 },\n  { id: 3, name: "Pad", price: 199.5, stock: 10 }\n];\nconst wait = (ms) => new Promise((r) => setTimeout(r, ms));\n\nclass Cart {\n  #lines = [];\n  #discount = 0;\n  add(id, qty) {\n    const product = catalog.find((p) => p.id === id);\n    if (!product) throw new Error("No such product");\n    if (product.stock < qty) throw new Error(`Out of stock: ${product.name}`);\n    product.stock -= qty;\n    this.#lines.push({ product, qty });\n  }\n  applyCode(code) {\n    if (code !== "SALE10") throw new Error("Invalid code");\n    this.#discount = 0.1;\n  }\n  total() {\n    const sum = this.#lines.reduce((s, l) => s + l.product.price * l.qty, 0);\n    return sum * (1 - this.#discount);\n  }\n  get count() {\n    return this.#lines.length;\n  }\n  async checkout() {\n    console.log("Paying...");\n    await wait(300);\n    console.log(`Paid: ${this.total().toFixed(2)}`);\n    this.#lines = [];\n  }\n}\n\nconst cart = new Cart();\ncart.add(1, 1);\ncart.add(3, 2);\ntry { cart.add(2, 3); } catch (e) { console.log(e.message); }\ntry { cart.applyCode("FREE"); } catch (e) { console.log(e.message); }\ncart.applyCode("SALE10");\nconsole.log(cart.total().toFixed(2));\ncart.checkout().then(() => console.log("Items left:", cart.count));\n',
        hint: L('Сума: (1200 + 2·199.5) · 0.9 = 1439.10.', 'Сумма: (1200 + 2·199.5) · 0.9 = 1439.10.', 'Total: (1200 + 2·199.5) · 0.9 = 1439.10.'),
        expected: 'Out of stock: Mouse\nInvalid code\n1439.10\nPaying...\nPaid: 1439.10\nItems left: 0',
        must: /class\s+Cart[\s\S]*async\s+checkout/
      },
      quiz: { q: L('Де краще округлювати гроші?', 'Где лучше округлять деньги?', 'Where should money be rounded?'), options: [L('на кожному кроці', 'на каждом шаге', 'at every step'), L('лише при виведенні', 'только при выводе', 'only when displaying'), L('ніколи', 'никогда', 'never')], answer: 1, explain: L('Інакше накопичуються похибки.', 'Иначе накапливаются погрешности.', 'Otherwise errors accumulate.') },
      ref: [{ code: 'async method() { await ... }', d: L('асинхронний метод', 'асинхронный метод', 'async method') }]
    }
  ]);
})();
