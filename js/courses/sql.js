// SQL — курс на справжньому SQLite (sql.js) прямо в браузері.
// Перевірка: результат учня порівнюється з результатом еталонного запиту на тій самій базі.
(function () {
  const C = window.Codry, L = C.L;

  const DB = `CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT, score INTEGER);
INSERT INTO students VALUES
(1,'Anna',14,'Kyiv',87),(2,'Bohdan',15,'Lviv',72),(3,'Kate',13,'Kyiv',95),(4,'Max',16,'Odesa',64),(5,'Ira',14,'Lviv',91),
(6,'Oleg',15,'Kharkiv',58),(7,'Sofia',13,'Odesa',79),(8,'Taras',16,'Kyiv',83),(9,'Liza',14,NULL,70),(10,'Nazar',15,'Dnipro',99);
CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT, level TEXT, price INTEGER);
INSERT INTO courses VALUES
(1,'Python Basics','beginner',0),(2,'Web Start','beginner',0),(3,'JavaScript Pro','advanced',300),(4,'Roblox Games','intermediate',150),(5,'SQL Data','intermediate',200);
CREATE TABLE enrollments (student_id INTEGER, course_id INTEGER, progress INTEGER);
INSERT INTO enrollments VALUES
(1,1,100),(1,2,40),(2,3,20),(3,1,100),(3,5,60),(4,4,80),(5,2,100),(5,3,55),(6,1,10),(7,4,100),(8,1,70),(8,5,30),(10,1,100),(10,3,100),(10,5,90);`;

  C.course({ id: 'sql', db: DB });

  const CH1 = L('Вибірка даних', 'Выборка данных', 'Selecting data');
  const CH2 = L('Агрегація', 'Агрегация', 'Aggregation');
  const CH3 = L('Кілька таблиць', 'Несколько таблиц', 'Multiple tables');
  const CH4 = L('Зміна даних', 'Изменение данных', 'Changing data');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');

  C.steps('sql', [
    {
      id: 'select', chapter: CH1,
      title: L('SELECT: перший запит', 'SELECT: первый запрос', 'SELECT: your first query'),
      theory: L(
        `<p><b>База даних</b> зберігає інформацію в <b>таблицях</b>: рядки — це записи (один учень), стовпці — поля (ім’я, вік). <b>SQL</b> (Structured Query Language) — мова, якою «розмовляють» з базами даних. Нею користуються аналітики, бекенд-розробники, маркетологи.</p>
<p>Найголовніша команда — <code>SELECT</code> (вибрати):</p>
<pre class="inline-code">SELECT name, age FROM students;</pre>
<ul><li><code>SELECT</code> — які стовпці показати (через кому)</li><li><code>*</code> — усі стовпці</li><li><code>FROM</code> — з якої таблиці</li><li><code>;</code> — кінець запиту</li></ul>
<p>Ключові слова прийнято писати ВЕЛИКИМИ літерами, хоча SQL не чутливий до регістру. Розгорни «Таблиці бази» вище, щоб побачити структуру.</p>`,
        `<p><b>База данных</b> хранит информацию в <b>таблицах</b>: строки — это записи (один ученик), столбцы — поля (имя, возраст). <b>SQL</b> (Structured Query Language) — язык, на котором «разговаривают» с базами данных. Им пользуются аналитики, бэкенд-разработчики, маркетологи.</p>
<p>Самая главная команда — <code>SELECT</code> (выбрать):</p>
<pre class="inline-code">SELECT name, age FROM students;</pre>
<ul><li><code>SELECT</code> — какие столбцы показать (через запятую)</li><li><code>*</code> — все столбцы</li><li><code>FROM</code> — из какой таблицы</li><li><code>;</code> — конец запроса</li></ul>
<p>Ключевые слова принято писать БОЛЬШИМИ буквами, хотя SQL не чувствителен к регистру. Разверни «Таблицы базы» выше, чтобы увидеть структуру.</p>`,
        `<p>A <b>database</b> stores information in <b>tables</b>: rows are records (one student), columns are fields (name, age). <b>SQL</b> (Structured Query Language) is how you talk to databases. Analysts, backend developers and marketers all use it.</p>
<p>The key command is <code>SELECT</code>:</p>
<pre class="inline-code">SELECT name, age FROM students;</pre>
<ul><li><code>SELECT</code> — which columns to show (comma-separated)</li><li><code>*</code> — all columns</li><li><code>FROM</code> — which table</li><li><code>;</code> — end of the query</li></ul>
<p>Keywords are conventionally UPPERCASE, though SQL isn’t case-sensitive. Expand “Database tables” above to see the structure.</p>`),
      why: L(`<p>Чому не просто Excel? Бази даних зберігають мільйони рядків, дозволяють тисячам людей працювати одночасно й відповідають на складні питання за мілісекунди. Instagram, банки, ігри, Codry — усі зберігають дані в базах і отримують їх через SQL.</p>`,
        `<p>Почему не просто Excel? Базы данных хранят миллионы строк, позволяют тысячам людей работать одновременно и отвечают на сложные вопросы за миллисекунды. Instagram, банки, игры, Codry — все хранят данные в базах и получают их через SQL.</p>`,
        `<p>Why not just Excel? Databases hold millions of rows, let thousands of people work at once and answer complex questions in milliseconds. Instagram, banks, games and Codry all store data in databases and query it with SQL.</p>`),
      mistakes: L(`<ul><li>Кома після останнього стовпця: <code>SELECT name, age, FROM</code> → помилка.</li><li>Опечатка в назві таблиці → <code>no such table</code>.</li><li><code>SELECT *</code> у великих таблицях — повільно; обирай лише потрібні стовпці.</li></ul>`,
        `<ul><li>Запятая после последнего столбца: <code>SELECT name, age, FROM</code> → ошибка.</li><li>Опечатка в названии таблицы → <code>no such table</code>.</li><li><code>SELECT *</code> в больших таблицах — медленно; выбирай только нужные столбцы.</li></ul>`,
        `<ul><li>A comma after the last column: <code>SELECT name, age, FROM</code> → error.</li><li>A typo in the table name → <code>no such table</code>.</li><li><code>SELECT *</code> on big tables is slow; pick only the columns you need.</li></ul>`),
      examples: [
        { title: L('Усе', 'Всё', 'Everything'), code: 'SELECT * FROM students;', note: L('Уся таблиця учнів.', 'Вся таблица учеников.', 'The whole students table.') },
        { title: L('Окремі стовпці', 'Отдельные столбцы', 'Some columns'), code: 'SELECT name, city FROM students;', note: L('Лише ім’я та місто.', 'Только имя и город.', 'Only name and city.') },
        { title: L('Інша таблиця', 'Другая таблица', 'Another table'), code: 'SELECT title, price FROM courses;', note: L('Курси та ціни.', 'Курсы и цены.', 'Courses and prices.') },
        { title: L('Кілька запитів', 'Несколько запросов', 'Several queries'), code: 'SELECT COUNT(*) FROM students;\nSELECT COUNT(*) FROM courses;', note: L('Можна виконати кілька запитів одразу.', 'Можно выполнить несколько запросов сразу.', 'You can run several queries at once.') }
      ],
      task: {
        text: L('Виведи <b>назву</b> (<code>title</code>) і <b>рівень</b> (<code>level</code>) усіх курсів.', 'Выведи <b>название</b> (<code>title</code>) и <b>уровень</b> (<code>level</code>) всех курсов.', 'Show the <b>title</b> and <b>level</b> of all courses.'),
        how: [L('<code>SELECT title, level FROM courses;</code>', '<code>SELECT title, level FROM courses;</code>', '<code>SELECT title, level FROM courses;</code>')],
        starter: '',
        solution: 'SELECT title, level FROM courses;',
        hint: L('Два стовпці через кому, таблиця <code>courses</code>.', 'Два столбца через запятую, таблица <code>courses</code>.', 'Two columns with a comma, table <code>courses</code>.')
      },
      quiz: { q: L('Що означає <code>*</code> у <code>SELECT *</code>?', 'Что означает <code>*</code> в <code>SELECT *</code>?', 'What does <code>*</code> mean in <code>SELECT *</code>?'), options: [L('множення', 'умножение', 'multiplication'), L('усі стовпці', 'все столбцы', 'all columns'), L('усі таблиці', 'все таблицы', 'all tables')], answer: 1, explain: L('Зірочка — «усі стовпці».', 'Звёздочка — «все столбцы».', 'The star means all columns.') },
      ref: [{ code: 'SELECT col1, col2 FROM t;', d: L('вибрати стовпці', 'выбрать столбцы', 'select columns') }]
    },
    {
      id: 'where', chapter: CH1,
      title: L('WHERE: фільтрація', 'WHERE: фильтрация', 'WHERE: filtering'),
      theory: L(
        `<p><code>WHERE</code> залишає лише рядки, що відповідають умові:</p>
<pre class="inline-code">SELECT name, score FROM students WHERE score > 80;</pre>
<p>Оператори порівняння: <code>=</code> (дорівнює — один знак!), <code>!=</code> або <code>&lt;&gt;</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.</p>
<p>Текст пишуть в <b>одинарних</b> лапках: <code>WHERE city = 'Kyiv'</code>. Числа — без лапок.</p>
<p>Порядок частин запиту фіксований: <code>SELECT … FROM … WHERE …</code>.</p>`,
        `<p><code>WHERE</code> оставляет только строки, соответствующие условию:</p>
<pre class="inline-code">SELECT name, score FROM students WHERE score > 80;</pre>
<p>Операторы сравнения: <code>=</code> (равно — один знак!), <code>!=</code> или <code>&lt;&gt;</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.</p>
<p>Текст пишут в <b>одинарных</b> кавычках: <code>WHERE city = 'Kyiv'</code>. Числа — без кавычек.</p>
<p>Порядок частей запроса фиксирован: <code>SELECT … FROM … WHERE …</code>.</p>`,
        `<p><code>WHERE</code> keeps only rows matching a condition:</p>
<pre class="inline-code">SELECT name, score FROM students WHERE score > 80;</pre>
<p>Comparison operators: <code>=</code> (equals — a single sign!), <code>!=</code> or <code>&lt;&gt;</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.</p>
<p>Text goes in <b>single</b> quotes: <code>WHERE city = 'Kyiv'</code>. Numbers have no quotes.</p>
<p>The order of clauses is fixed: <code>SELECT … FROM … WHERE …</code>.</p>`),
      why: L(`<p>Таблиці бувають величезні, а потрібна завжди частина: замовлення за сьогодні, користувачі з Києва, товари дешевше 500 грн. База фільтрує сама й швидко — набагато швидше, ніж якби програма завантажила все й перебирала циклом.</p>`,
        `<p>Таблицы бывают огромными, а нужна всегда часть: заказы за сегодня, пользователи из Киева, товары дешевле 500 грн. База фильтрует сама и быстро — гораздо быстрее, чем если бы программа загрузила всё и перебирала циклом.</p>`,
        `<p>Tables can be huge, and you always need a part: today’s orders, users from Kyiv, products under 500. The database filters quickly itself — far faster than loading everything into a program and looping.</p>`),
      mistakes: L(`<ul><li><code>==</code> замість <code>=</code> (у SQLite працює, але це не стандарт).</li><li>Подвійні лапки для тексту: <code>"Kyiv"</code> — у SQL це означає назву стовпця.</li><li>Регістр у тексті важливий: <code>'kyiv'</code> ≠ <code>'Kyiv'</code>.</li></ul>`,
        `<ul><li><code>==</code> вместо <code>=</code> (в SQLite работает, но это не стандарт).</li><li>Двойные кавычки для текста: <code>"Kyiv"</code> — в SQL это означает название столбца.</li><li>Регистр в тексте важен: <code>'kyiv'</code> ≠ <code>'Kyiv'</code>.</li></ul>`,
        `<ul><li><code>==</code> instead of <code>=</code> (works in SQLite but isn’t standard).</li><li>Double quotes for text: <code>"Kyiv"</code> means a column name in SQL.</li><li>Case matters in text: <code>'kyiv'</code> ≠ <code>'Kyiv'</code>.</li></ul>`),
      examples: [
        { title: L('Числа', 'Числа', 'Numbers'), code: 'SELECT name, score FROM students WHERE score > 80;', note: L('Учні з балом понад 80.', 'Ученики с баллом выше 80.', 'Students scoring above 80.') },
        { title: L('Текст', 'Текст', 'Text'), code: "SELECT name, age FROM students WHERE city = 'Kyiv';", note: L('Одинарні лапки для тексту.', 'Одинарные кавычки для текста.', 'Single quotes for text.') },
        { title: L('Не дорівнює', 'Не равно', 'Not equal'), code: "SELECT title, level FROM courses WHERE level != 'beginner';", note: L('Усі, крім початкових.', 'Все, кроме начальных.', 'All but beginner.') },
        { title: L('Безкоштовні', 'Бесплатные', 'Free ones'), code: 'SELECT title FROM courses WHERE price = 0;', note: L('Курси з ціною 0.', 'Курсы с ценой 0.', 'Courses priced 0.') }
      ],
      task: {
        text: L('Виведи імена та вік учнів, яким <b>14 років</b>.', 'Выведи имена и возраст учеников, которым <b>14 лет</b>.', 'Show the names and ages of students who are <b>14</b>.'),
        how: [L('<code>WHERE age = 14</code>', '<code>WHERE age = 14</code>', '<code>WHERE age = 14</code>')],
        starter: 'SELECT name, age FROM students\n',
        solution: 'SELECT name, age FROM students WHERE age = 14;',
        hint: L('Має вийти троє учнів.', 'Должно получиться трое учеников.', 'You should get three students.')
      },
      quiz: { q: L('Як правильно написати умову для міста Lviv?', 'Как правильно написать условие для города Lviv?', 'How do you correctly filter for the city Lviv?'), options: ["city = 'Lviv'", 'city = Lviv', 'city == "Lviv"'], answer: 0, explain: L('Текст — в одинарних лапках.', 'Текст — в одинарных кавычках.', 'Text in single quotes.') },
      ref: [{ code: "WHERE col = 'text'", d: L('фільтр', 'фильтр', 'filter') }, { code: '= != > < >= <=', d: L('порівняння', 'сравнения', 'comparisons') }]
    },
    {
      id: 'logic', chapter: CH1,
      title: L('AND, OR, IN, BETWEEN', 'AND, OR, IN, BETWEEN', 'AND, OR, IN, BETWEEN'),
      theory: L(
        `<p>Умови комбінують:</p>
<ul><li><code>AND</code> — обидві умови: <code>age &gt;= 14 AND score &gt; 80</code></li><li><code>OR</code> — хоча б одна: <code>city = 'Kyiv' OR city = 'Lviv'</code></li><li><code>NOT</code> — заперечення</li></ul>
<p>Скорочення:</p>
<ul><li><code>city IN ('Kyiv', 'Lviv', 'Odesa')</code> — значення зі списку (замість кількох OR)</li><li><code>score BETWEEN 70 AND 90</code> — від 70 до 90 <b>включно</b></li><li><code>NOT IN</code>, <code>NOT BETWEEN</code></li></ul>
<p><code>AND</code> виконується раніше за <code>OR</code>. Для ясності ставь дужки: <code>(a OR b) AND c</code>.</p>`,
        `<p>Условия комбинируют:</p>
<ul><li><code>AND</code> — оба условия: <code>age &gt;= 14 AND score &gt; 80</code></li><li><code>OR</code> — хотя бы одно: <code>city = 'Kyiv' OR city = 'Lviv'</code></li><li><code>NOT</code> — отрицание</li></ul>
<p>Сокращения:</p>
<ul><li><code>city IN ('Kyiv', 'Lviv', 'Odesa')</code> — значение из списка (вместо нескольких OR)</li><li><code>score BETWEEN 70 AND 90</code> — от 70 до 90 <b>включительно</b></li><li><code>NOT IN</code>, <code>NOT BETWEEN</code></li></ul>
<p><code>AND</code> выполняется раньше <code>OR</code>. Для ясности ставь скобки: <code>(a OR b) AND c</code>.</p>`,
        `<p>Combine conditions:</p>
<ul><li><code>AND</code> — both: <code>age &gt;= 14 AND score &gt; 80</code></li><li><code>OR</code> — at least one: <code>city = 'Kyiv' OR city = 'Lviv'</code></li><li><code>NOT</code> — negation</li></ul>
<p>Shortcuts:</p>
<ul><li><code>city IN ('Kyiv', 'Lviv', 'Odesa')</code> — a value from a list (instead of several ORs)</li><li><code>score BETWEEN 70 AND 90</code> — 70 to 90 <b>inclusive</b></li><li><code>NOT IN</code>, <code>NOT BETWEEN</code></li></ul>
<p><code>AND</code> binds before <code>OR</code>. Use parentheses for clarity: <code>(a OR b) AND c</code>.</p>`),
      why: L(`<p>Реальні запити майже завжди мають кілька умов: «замовлення з Києва <i>за цей місяць</i> <i>понад 1000 грн</i>». <code>IN</code> і <code>BETWEEN</code> роблять такі запити коротшими й читабельнішими.</p>`,
        `<p>Реальные запросы почти всегда имеют несколько условий: «заказы из Киева <i>за этот месяц</i> <i>дороже 1000 грн</i>». <code>IN</code> и <code>BETWEEN</code> делают такие запросы короче и читабельнее.</p>`,
        `<p>Real queries nearly always have several conditions: “orders from Kyiv <i>this month</i> <i>over 1000</i>”. <code>IN</code> and <code>BETWEEN</code> keep them short and readable.</p>`),
      mistakes: L(`<ul><li><code>city = 'Kyiv' OR 'Lviv'</code> — неправильно. Треба повторити стовпець або використати <code>IN</code>.</li><li>Забути дужки при змішуванні AND і OR — результат несподіваний.</li></ul>`,
        `<ul><li><code>city = 'Kyiv' OR 'Lviv'</code> — неправильно. Нужно повторить столбец или использовать <code>IN</code>.</li><li>Забыть скобки при смешивании AND и OR — результат неожиданный.</li></ul>`,
        `<ul><li><code>city = 'Kyiv' OR 'Lviv'</code> is wrong. Repeat the column or use <code>IN</code>.</li><li>Forgetting parentheses when mixing AND and OR — surprising results.</li></ul>`),
      examples: [
        { title: 'AND', code: 'SELECT name, age, score FROM students WHERE age >= 15 AND score > 70;', note: L('Обидві умови.', 'Оба условия.', 'Both conditions.') },
        { title: 'IN', code: "SELECT name, city FROM students WHERE city IN ('Kyiv', 'Lviv');", note: L('Замість <code>city = ... OR city = ...</code>.', 'Вместо <code>city = ... OR city = ...</code>.', 'Instead of <code>city = ... OR city = ...</code>.') },
        { title: 'BETWEEN', code: 'SELECT name, score FROM students WHERE score BETWEEN 70 AND 90;', note: L('Межі включно.', 'Границы включительно.', 'Bounds inclusive.') },
        { title: L('Дужки', 'Скобки', 'Parentheses'), code: "SELECT name, city, age FROM students WHERE (city = 'Kyiv' OR city = 'Odesa') AND age < 15;", note: L('Спершу OR у дужках, потім AND.', 'Сначала OR в скобках, потом AND.', 'OR in parentheses first, then AND.') }
      ],
      task: {
        text: L('Виведи ім’я, місто та бал учнів з <b>Kyiv або Lviv</b>, у яких бал <b>від 80 до 95 включно</b>.', 'Выведи имя, город и балл учеников из <b>Kyiv или Lviv</b>, у которых балл <b>от 80 до 95 включительно</b>.', 'Show the name, city and score of students from <b>Kyiv or Lviv</b> with a score <b>between 80 and 95 inclusive</b>.'),
        how: [L("<code>city IN ('Kyiv', 'Lviv')</code>", "<code>city IN ('Kyiv', 'Lviv')</code>", "<code>city IN ('Kyiv', 'Lviv')</code>"), L('<code>AND score BETWEEN 80 AND 95</code>', '<code>AND score BETWEEN 80 AND 95</code>', '<code>AND score BETWEEN 80 AND 95</code>')],
        starter: '',
        solution: "SELECT name, city, score FROM students WHERE city IN ('Kyiv', 'Lviv') AND score BETWEEN 80 AND 95;",
        hint: L('Має вийти 4 учні.', 'Должно получиться 4 ученика.', 'You should get 4 students.')
      },
      quiz: { q: L('Чи включає <code>BETWEEN 1 AND 5</code> число 5?', 'Включает ли <code>BETWEEN 1 AND 5</code> число 5?', 'Does <code>BETWEEN 1 AND 5</code> include 5?'), options: [L('так', 'да', 'yes'), L('ні', 'нет', 'no')], answer: 0, explain: L('Межі включно.', 'Границы включительно.', 'Bounds are inclusive.') },
      ref: [{ code: 'AND OR NOT', d: L('логіка', 'логика', 'logic') }, { code: "IN ('a','b')  BETWEEN x AND y", d: L('список, діапазон', 'список, диапазон', 'list, range') }]
    },
    {
      id: 'like-null', chapter: CH1,
      title: L('LIKE і NULL', 'LIKE и NULL', 'LIKE and NULL'),
      theory: L(
        `<p><code>LIKE</code> шукає за шаблоном:</p>
<ul><li><code>%</code> — будь-яка кількість будь-яких символів</li><li><code>_</code> — рівно один символ</li><li><code>name LIKE 'A%'</code> — починається з A</li><li><code>name LIKE '%a'</code> — закінчується на a</li><li><code>title LIKE '%Script%'</code> — містить «Script»</li></ul>
<p>У SQLite <code>LIKE</code> не розрізняє регістр латинських літер.</p>
<h4>NULL</h4>
<p><code>NULL</code> — «значення невідоме / відсутнє». Це не нуль і не порожній рядок. З ним не працює <code>=</code>: <code>city = NULL</code> завжди хибне! Правильно: <code>city IS NULL</code> або <code>city IS NOT NULL</code>.</p>
<p><code>COALESCE(city, 'unknown')</code> підставляє значення замість NULL.</p>`,
        `<p><code>LIKE</code> ищет по шаблону:</p>
<ul><li><code>%</code> — любое количество любых символов</li><li><code>_</code> — ровно один символ</li><li><code>name LIKE 'A%'</code> — начинается с A</li><li><code>name LIKE '%a'</code> — заканчивается на a</li><li><code>title LIKE '%Script%'</code> — содержит «Script»</li></ul>
<p>В SQLite <code>LIKE</code> не различает регистр латинских букв.</p>
<h4>NULL</h4>
<p><code>NULL</code> — «значение неизвестно / отсутствует». Это не ноль и не пустая строка. С ним не работает <code>=</code>: <code>city = NULL</code> всегда ложно! Правильно: <code>city IS NULL</code> или <code>city IS NOT NULL</code>.</p>
<p><code>COALESCE(city, 'unknown')</code> подставляет значение вместо NULL.</p>`,
        `<p><code>LIKE</code> searches by pattern:</p>
<ul><li><code>%</code> — any number of any characters</li><li><code>_</code> — exactly one character</li><li><code>name LIKE 'A%'</code> — starts with A</li><li><code>name LIKE '%a'</code> — ends with a</li><li><code>title LIKE '%Script%'</code> — contains “Script”</li></ul>
<p>In SQLite <code>LIKE</code> ignores the case of Latin letters.</p>
<h4>NULL</h4>
<p><code>NULL</code> means “unknown / missing”. It’s not zero or an empty string. <code>=</code> doesn’t work with it: <code>city = NULL</code> is never true! Use <code>city IS NULL</code> or <code>city IS NOT NULL</code>.</p>
<p><code>COALESCE(city, 'unknown')</code> substitutes a value for NULL.</p>`),
      why: L(`<p>Пошук у застосунках («знайти користувача, чиє ім’я містить "ann"») часто працює саме через LIKE. А NULL — реальність будь-яких даних: хтось не вказав телефон, замовлення ще не доставлене. Неправильна робота з NULL — одна з найчастіших помилок у SQL.</p>`,
        `<p>Поиск в приложениях («найти пользователя, чьё имя содержит "ann"») часто работает именно через LIKE. А NULL — реальность любых данных: кто-то не указал телефон, заказ ещё не доставлен. Неправильная работа с NULL — одна из самых частых ошибок в SQL.</p>`,
        `<p>In-app search (“find users whose name contains ‘ann’”) often uses LIKE. And NULL is a fact of all data: someone left out their phone, an order isn’t delivered yet. Mishandling NULL is one of the most common SQL bugs.</p>`),
      mistakes: L(`<ul><li><code>WHERE city = NULL</code> — нічого не знайде. Лише <code>IS NULL</code>.</li><li>Забути <code>%</code>: <code>LIKE 'A'</code> шукає рівно рядок «A».</li></ul>`,
        `<ul><li><code>WHERE city = NULL</code> — ничего не найдёт. Только <code>IS NULL</code>.</li><li>Забыть <code>%</code>: <code>LIKE 'A'</code> ищет ровно строку «A».</li></ul>`,
        `<ul><li><code>WHERE city = NULL</code> finds nothing. Only <code>IS NULL</code>.</li><li>Forgetting <code>%</code>: <code>LIKE 'A'</code> matches exactly “A”.</li></ul>`),
      examples: [
        { title: L('Починається з', 'Начинается с', 'Starts with'), code: "SELECT name FROM students WHERE name LIKE 'K%';", note: L('Імена на K.', 'Имена на K.', 'Names starting with K.') },
        { title: L('Містить', 'Содержит', 'Contains'), code: "SELECT title FROM courses WHERE title LIKE '%a%';", note: L('Назви з літерою a.', 'Названия с буквой a.', 'Titles containing an a.') },
        { title: 'IS NULL', code: 'SELECT name FROM students WHERE city IS NULL;\nSELECT COUNT(*) FROM students WHERE city = NULL;', note: L('Друге дає 0 — так NULL не шукають.', 'Второе даёт 0 — так NULL не ищут.', 'The second returns 0 — that’s not how to find NULL.') },
        { title: 'COALESCE', code: "SELECT name, COALESCE(city, 'unknown') AS city FROM students;", note: L('Замість NULL — «unknown».', 'Вместо NULL — «unknown».', '“unknown” instead of NULL.') }
      ],
      task: {
        text: L('Виведи імена учнів, чиє ім’я <b>закінчується на «a»</b> і в яких <b>місто вказане</b> (не NULL).', 'Выведи имена учеников, чьё имя <b>заканчивается на «a»</b> и у которых <b>город указан</b> (не NULL).', 'Show the names of students whose name <b>ends with “a”</b> and whose <b>city is known</b> (not NULL).'),
        how: [L("<code>name LIKE '%a'</code>", "<code>name LIKE '%a'</code>", "<code>name LIKE '%a'</code>"), L('<code>AND city IS NOT NULL</code>', '<code>AND city IS NOT NULL</code>', '<code>AND city IS NOT NULL</code>')],
        starter: '',
        solution: "SELECT name FROM students WHERE name LIKE '%a' AND city IS NOT NULL;",
        hint: L('Liza теж закінчується на a, але міста в неї немає.', 'Liza тоже заканчивается на a, но города у неё нет.', 'Liza also ends in a but has no city.')
      },
      quiz: { q: L('Як знайти рядки без телефону (phone = NULL)?', 'Как найти строки без телефона (phone = NULL)?', 'How do you find rows with no phone (phone = NULL)?'), options: ['phone = NULL', 'phone IS NULL', "phone = ''"], answer: 1, explain: L('NULL перевіряють лише через IS.', 'NULL проверяют только через IS.', 'NULL is checked only with IS.') },
      ref: [{ code: "LIKE 'A%'  '%x%'", d: L('пошук за шаблоном', 'поиск по шаблону', 'pattern search') }, { code: 'IS NULL / IS NOT NULL', d: L('перевірка NULL', 'проверка NULL', 'NULL check') }]
    },
    {
      id: 'order', chapter: CH1,
      title: L('ORDER BY і LIMIT', 'ORDER BY и LIMIT', 'ORDER BY and LIMIT'),
      theory: L(
        `<p>Без явного сортування база повертає рядки в довільному порядку. <code>ORDER BY</code> сортує:</p>
<pre class="inline-code">SELECT name, score FROM students ORDER BY score DESC;</pre>
<ul><li><code>ASC</code> — за зростанням (за замовчуванням), <code>DESC</code> — за спаданням</li><li>Кілька ключів: <code>ORDER BY city ASC, score DESC</code> — спершу за містом, у межах міста — за балом</li></ul>
<p><code>LIMIT n</code> — лише перші n рядків. <code>LIMIT 5 OFFSET 10</code> — 5 рядків, пропустивши 10 (так роблять сторінки «Далі»).</p>
<p>Порядок: <code>SELECT … FROM … WHERE … ORDER BY … LIMIT …</code>.</p>`,
        `<p>Без явной сортировки база возвращает строки в произвольном порядке. <code>ORDER BY</code> сортирует:</p>
<pre class="inline-code">SELECT name, score FROM students ORDER BY score DESC;</pre>
<ul><li><code>ASC</code> — по возрастанию (по умолчанию), <code>DESC</code> — по убыванию</li><li>Несколько ключей: <code>ORDER BY city ASC, score DESC</code> — сначала по городу, внутри города — по баллу</li></ul>
<p><code>LIMIT n</code> — только первые n строк. <code>LIMIT 5 OFFSET 10</code> — 5 строк, пропустив 10 (так делают страницы «Далее»).</p>
<p>Порядок: <code>SELECT … FROM … WHERE … ORDER BY … LIMIT …</code>.</p>`,
        `<p>Without explicit sorting, a database returns rows in any order. <code>ORDER BY</code> sorts:</p>
<pre class="inline-code">SELECT name, score FROM students ORDER BY score DESC;</pre>
<ul><li><code>ASC</code> — ascending (default), <code>DESC</code> — descending</li><li>Several keys: <code>ORDER BY city ASC, score DESC</code> — by city, then by score within a city</li></ul>
<p><code>LIMIT n</code> — only the first n rows. <code>LIMIT 5 OFFSET 10</code> — 5 rows after skipping 10 (that’s how “Next page” works).</p>
<p>Order: <code>SELECT … FROM … WHERE … ORDER BY … LIMIT …</code>.</p>`),
      why: L(`<p>«Топ-10 гравців», «найновіші пости», «найдешевші товари» — усе це <code>ORDER BY</code> + <code>LIMIT</code>. Рейтинг у Codry теж будується саме так: сортування за XP за спаданням.</p>`,
        `<p>«Топ-10 игроков», «новейшие посты», «самые дешёвые товары» — всё это <code>ORDER BY</code> + <code>LIMIT</code>. Рейтинг в Codry тоже строится именно так: сортировка по XP по убыванию.</p>`,
        `<p>“Top 10 players”, “newest posts”, “cheapest products” — all <code>ORDER BY</code> + <code>LIMIT</code>. Codry’s leaderboard works the same way: sorted by XP descending.</p>`),
      mistakes: L(`<ul><li><code>LIMIT</code> до <code>ORDER BY</code> — синтаксична помилка.</li><li>Покладатися на «природний» порядок без <code>ORDER BY</code> — він не гарантований.</li></ul>`,
        `<ul><li><code>LIMIT</code> до <code>ORDER BY</code> — синтаксическая ошибка.</li><li>Полагаться на «естественный» порядок без <code>ORDER BY</code> — он не гарантирован.</li></ul>`,
        `<ul><li><code>LIMIT</code> before <code>ORDER BY</code> — a syntax error.</li><li>Relying on “natural” order without <code>ORDER BY</code> — it isn’t guaranteed.</li></ul>`),
      examples: [
        { title: 'DESC', code: 'SELECT name, score FROM students ORDER BY score DESC;', note: L('Від найбільшого балу.', 'От наибольшего балла.', 'Highest score first.') },
        { title: L('Топ-3', 'Топ-3', 'Top 3'), code: 'SELECT name, score FROM students ORDER BY score DESC LIMIT 3;', note: L('Лише три найкращі.', 'Только три лучших.', 'Only the best three.') },
        { title: L('Два ключі', 'Два ключа', 'Two keys'), code: 'SELECT city, name, score FROM students WHERE city IS NOT NULL ORDER BY city, score DESC;', note: L('Групування за містом, усередині — за балом.', 'Группировка по городу, внутри — по баллу.', 'By city, then by score within.') },
        { title: 'OFFSET', code: 'SELECT name FROM students ORDER BY name LIMIT 3 OFFSET 3;', note: L('«Друга сторінка» по 3 записи.', '«Вторая страница» по 3 записи.', 'The “second page” of 3 records.') }
      ],
      task: {
        text: L('Виведи ім’я та вік <b>трьох наймолодших</b> учнів. Якщо вік однаковий — сортуй за ім’ям за абеткою.', 'Выведи имя и возраст <b>трёх самых младших</b> учеников. Если возраст одинаковый — сортируй по имени по алфавиту.', 'Show the name and age of the <b>three youngest</b> students. If ages tie, sort by name alphabetically.'),
        how: [L('<code>ORDER BY age, name</code>', '<code>ORDER BY age, name</code>', '<code>ORDER BY age, name</code>'), L('<code>LIMIT 3</code>', '<code>LIMIT 3</code>', '<code>LIMIT 3</code>')],
        starter: '',
        solution: 'SELECT name, age FROM students ORDER BY age, name LIMIT 3;',
        hint: L('Наймолодші — Kate і Sofia (13), далі за абеткою серед 14-річних.', 'Самые младшие — Kate и Sofia (13), дальше по алфавиту среди 14-летних.', 'The youngest are Kate and Sofia (13), then alphabetically among 14-year-olds.')
      },
      quiz: { q: L('Що означає <code>DESC</code>?', 'Что означает <code>DESC</code>?', 'What does <code>DESC</code> mean?'), options: [L('опис', 'описание', 'description'), L('за спаданням', 'по убыванию', 'descending'), L('видалити', 'удалить', 'delete')], answer: 1, explain: L('DESC — descending.', 'DESC — descending.', 'DESC — descending.') },
      ref: [{ code: 'ORDER BY col DESC', d: L('сортування', 'сортировка', 'sorting') }, { code: 'LIMIT n OFFSET m', d: L('обмеження, пропуск', 'ограничение, пропуск', 'limit, skip') }]
    },
    {
      id: 'distinct-alias', chapter: CH1,
      title: L('DISTINCT, AS та обчислення', 'DISTINCT, AS и вычисления', 'DISTINCT, AS and expressions'),
      theory: L(
        `<p><code>SELECT DISTINCT city FROM students</code> — лише <b>унікальні</b> значення, без повторів.</p>
<p>У <code>SELECT</code> можна обчислювати:</p>
<ul><li>Арифметика: <code>price * 1.2</code>, <code>score / 10.0</code></li><li>Склеювання тексту: <code>name || ' from ' || city</code></li><li>Функції: <code>UPPER(name)</code>, <code>LOWER()</code>, <code>LENGTH()</code>, <code>ROUND(x, 1)</code>, <code>ABS()</code></li></ul>
<p><code>AS</code> дає стовпцю гарну назву (<b>псевдонім</b>): <code>SELECT price * 1.2 AS price_with_tax</code>. Таблиці теж можна перейменовувати: <code>FROM students AS s</code>.</p>`,
        `<p><code>SELECT DISTINCT city FROM students</code> — только <b>уникальные</b> значения, без повторов.</p>
<p>В <code>SELECT</code> можно вычислять:</p>
<ul><li>Арифметика: <code>price * 1.2</code>, <code>score / 10.0</code></li><li>Склеивание текста: <code>name || ' from ' || city</code></li><li>Функции: <code>UPPER(name)</code>, <code>LOWER()</code>, <code>LENGTH()</code>, <code>ROUND(x, 1)</code>, <code>ABS()</code></li></ul>
<p><code>AS</code> даёт столбцу красивое название (<b>псевдоним</b>): <code>SELECT price * 1.2 AS price_with_tax</code>. Таблицы тоже можно переименовывать: <code>FROM students AS s</code>.</p>`,
        `<p><code>SELECT DISTINCT city FROM students</code> returns only <b>unique</b> values.</p>
<p>You can compute in <code>SELECT</code>:</p>
<ul><li>Arithmetic: <code>price * 1.2</code>, <code>score / 10.0</code></li><li>Text concatenation: <code>name || ' from ' || city</code></li><li>Functions: <code>UPPER(name)</code>, <code>LOWER()</code>, <code>LENGTH()</code>, <code>ROUND(x, 1)</code>, <code>ABS()</code></li></ul>
<p><code>AS</code> gives a column a nice name (an <b>alias</b>): <code>SELECT price * 1.2 AS price_with_tax</code>. Tables can be aliased too: <code>FROM students AS s</code>.</p>`),
      why: L(`<p>Звіти потребують гарних назв колонок і готових обчислень. Краще порахувати «ціну з податком» одразу в базі, ніж тягнути сирі дані в програму. А <code>DISTINCT</code> відповідає на питання «які взагалі бувають значення?».</p>`,
        `<p>Отчёты требуют красивых названий колонок и готовых вычислений. Лучше посчитать «цену с налогом» сразу в базе, чем тянуть сырые данные в программу. А <code>DISTINCT</code> отвечает на вопрос «какие вообще бывают значения?».</p>`,
        `<p>Reports need nice column names and ready-made calculations. It’s better to compute “price with tax” in the database than pull raw data into a program. <code>DISTINCT</code> answers “what values even exist?”.</p>`),
      mistakes: L(`<ul><li><code>score / 10</code> з цілими числами дає ціле (87/10 = 8). Пиши <code>10.0</code>.</li><li><code>+</code> для склеювання тексту в SQLite не працює — потрібно <code>||</code>.</li></ul>`,
        `<ul><li><code>score / 10</code> с целыми числами даёт целое (87/10 = 8). Пиши <code>10.0</code>.</li><li><code>+</code> для склеивания текста в SQLite не работает — нужно <code>||</code>.</li></ul>`,
        `<ul><li><code>score / 10</code> with integers gives an integer (87/10 = 8). Write <code>10.0</code>.</li><li><code>+</code> doesn’t concatenate text in SQLite — use <code>||</code>.</li></ul>`),
      examples: [
        { title: 'DISTINCT', code: 'SELECT DISTINCT city FROM students WHERE city IS NOT NULL ORDER BY city;', note: L('Кожне місто один раз.', 'Каждый город один раз.', 'Each city once.') },
        { title: 'AS', code: 'SELECT title, price, price * 1.2 AS price_with_tax FROM courses;', note: L('Обчислений стовпець з назвою.', 'Вычисляемый столбец с названием.', 'A computed, named column.') },
        { title: '||', code: "SELECT name || ' (' || age || ')' AS student FROM students;", note: L('Склеювання тексту й чисел.', 'Склеивание текста и чисел.', 'Joining text and numbers.') },
        { title: L('Функції', 'Функции', 'Functions'), code: 'SELECT UPPER(name) AS loud, LENGTH(name) AS len, ROUND(score / 10.0, 1) AS grade FROM students;', note: L('Регістр, довжина, округлення.', 'Регистр, длина, округление.', 'Case, length, rounding.') }
      ],
      task: {
        text: L('Виведи для кожного курсу назву і ціну зі знижкою 25% у стовпці з назвою <code>sale_price</code>, лише для платних курсів (ціна більша за 0).', 'Выведи для каждого курса название и цену со скидкой 25% в столбце с названием <code>sale_price</code>, только для платных курсов (цена больше 0).', 'For each paid course (price above 0) show the title and the price with a 25% discount in a column named <code>sale_price</code>.'),
        how: [L('<code>price * 0.75 AS sale_price</code>', '<code>price * 0.75 AS sale_price</code>', '<code>price * 0.75 AS sale_price</code>'), L('<code>WHERE price &gt; 0</code>', '<code>WHERE price &gt; 0</code>', '<code>WHERE price &gt; 0</code>')],
        starter: '',
        solution: 'SELECT title, price * 0.75 AS sale_price FROM courses WHERE price > 0;',
        hint: L('Для JavaScript Pro має вийти 225.', 'Для JavaScript Pro должно получиться 225.', 'JavaScript Pro should come out at 225.')
      },
      quiz: { q: L('Що повертає <code>SELECT DISTINCT level FROM courses</code>?', 'Что возвращает <code>SELECT DISTINCT level FROM courses</code>?', 'What does <code>SELECT DISTINCT level FROM courses</code> return?'), options: [L('5 рядків', '5 строк', '5 rows'), L('3 унікальні рівні', '3 уникальных уровня', '3 unique levels'), L('1 рядок', '1 строку', '1 row')], answer: 1, explain: L('beginner, intermediate, advanced.', 'beginner, intermediate, advanced.', 'beginner, intermediate, advanced.') },
      ref: [{ code: 'SELECT DISTINCT col', d: L('унікальні значення', 'уникальные значения', 'unique values') }, { code: 'expr AS name', d: L('псевдонім', 'псевдоним', 'alias') }, { code: "a || ' ' || b", d: L('склеювання тексту', 'склеивание текста', 'concatenation') }]
    },
    {
      id: 'aggregate', chapter: CH2,
      title: L('COUNT, SUM, AVG, MIN, MAX', 'COUNT, SUM, AVG, MIN, MAX', 'COUNT, SUM, AVG, MIN, MAX'),
      theory: L(
        `<p><b>Агрегатні функції</b> «згортають» багато рядків в одне число:</p>
<table class="mini"><tr><td><code>COUNT(*)</code></td><td>кількість рядків</td></tr><tr><td><code>COUNT(col)</code></td><td>кількість не-NULL значень</td></tr><tr><td><code>COUNT(DISTINCT col)</code></td><td>кількість унікальних</td></tr><tr><td><code>SUM(col)</code></td><td>сума</td></tr><tr><td><code>AVG(col)</code></td><td>середнє</td></tr><tr><td><code>MIN(col)</code> / <code>MAX(col)</code></td><td>мінімум / максимум</td></tr></table>
<pre class="inline-code">SELECT COUNT(*) AS total, AVG(score) AS avg_score FROM students;</pre>
<p>Агрегати поєднуються з <code>WHERE</code>: спершу фільтр, потім підрахунок.</p>`,
        `<p><b>Агрегатные функции</b> «сворачивают» много строк в одно число:</p>
<table class="mini"><tr><td><code>COUNT(*)</code></td><td>количество строк</td></tr><tr><td><code>COUNT(col)</code></td><td>количество не-NULL значений</td></tr><tr><td><code>COUNT(DISTINCT col)</code></td><td>количество уникальных</td></tr><tr><td><code>SUM(col)</code></td><td>сумма</td></tr><tr><td><code>AVG(col)</code></td><td>среднее</td></tr><tr><td><code>MIN(col)</code> / <code>MAX(col)</code></td><td>минимум / максимум</td></tr></table>
<pre class="inline-code">SELECT COUNT(*) AS total, AVG(score) AS avg_score FROM students;</pre>
<p>Агрегаты сочетаются с <code>WHERE</code>: сначала фильтр, потом подсчёт.</p>`,
        `<p><b>Aggregate functions</b> fold many rows into one number:</p>
<table class="mini"><tr><td><code>COUNT(*)</code></td><td>number of rows</td></tr><tr><td><code>COUNT(col)</code></td><td>number of non-NULL values</td></tr><tr><td><code>COUNT(DISTINCT col)</code></td><td>number of unique values</td></tr><tr><td><code>SUM(col)</code></td><td>sum</td></tr><tr><td><code>AVG(col)</code></td><td>average</td></tr><tr><td><code>MIN(col)</code> / <code>MAX(col)</code></td><td>min / max</td></tr></table>
<pre class="inline-code">SELECT COUNT(*) AS total, AVG(score) AS avg_score FROM students;</pre>
<p>Aggregates combine with <code>WHERE</code>: filter first, then count.</p>`),
      why: L(`<p>Бізнесу потрібні не рядки, а відповіді: скільки продали, яка середня оцінка, який найдорожчий товар. Агрегати дають ці відповіді за один запит — це основа аналітики й дашбордів.</p>`,
        `<p>Бизнесу нужны не строки, а ответы: сколько продали, какая средняя оценка, какой самый дорогой товар. Агрегаты дают эти ответы за один запрос — это основа аналитики и дашбордов.</p>`,
        `<p>Businesses want answers, not rows: how much was sold, the average grade, the most expensive product. Aggregates give those answers in one query — the basis of analytics and dashboards.</p>`),
      mistakes: L(`<ul><li>Змішувати агрегат і звичайний стовпець без <code>GROUP BY</code>: <code>SELECT name, MAX(score)</code> — результат неоднозначний (наступний крок).</li><li><code>COUNT(city)</code> не рахує NULL — це відрізняється від <code>COUNT(*)</code>.</li></ul>`,
        `<ul><li>Смешивать агрегат и обычный столбец без <code>GROUP BY</code>: <code>SELECT name, MAX(score)</code> — результат неоднозначный (следующий шаг).</li><li><code>COUNT(city)</code> не считает NULL — это отличается от <code>COUNT(*)</code>.</li></ul>`,
        `<ul><li>Mixing an aggregate with a plain column without <code>GROUP BY</code>: <code>SELECT name, MAX(score)</code> is ambiguous (next step).</li><li><code>COUNT(city)</code> skips NULLs — different from <code>COUNT(*)</code>.</li></ul>`),
      examples: [
        { title: 'COUNT', code: 'SELECT COUNT(*) AS students, COUNT(city) AS with_city, COUNT(DISTINCT city) AS cities FROM students;', note: L('Три різні «кількості».', 'Три разных «количества».', 'Three different counts.') },
        { title: 'AVG / MIN / MAX', code: 'SELECT AVG(score) AS avg, MIN(score) AS min, MAX(score) AS max FROM students;', note: L('Статистика балів.', 'Статистика баллов.', 'Score statistics.') },
        { title: 'SUM', code: 'SELECT SUM(price) AS total_price FROM courses;', note: L('Сума цін усіх курсів.', 'Сумма цен всех курсов.', 'The sum of all course prices.') },
        { title: '+ WHERE', code: "SELECT COUNT(*) AS kyiv_students, ROUND(AVG(score), 1) AS avg FROM students WHERE city = 'Kyiv';", note: L('Агрегат лише для Києва.', 'Агрегат только для Киева.', 'An aggregate for Kyiv only.') }
      ],
      task: {
        text: L('Одним запитом виведи для таблиці <code>enrollments</code>: кількість записів, кількість <b>завершених</b> курсів (progress = 100) і середній прогрес, округлений до цілого. (Підказка: завершені порахуй як <code>SUM(progress = 100)</code> — у SQLite умова дає 1 або 0.)', 'Одним запросом выведи для таблицы <code>enrollments</code>: количество записей, количество <b>завершённых</b> курсов (progress = 100) и средний прогресс, округлённый до целого. (Подсказка: завершённые посчитай как <code>SUM(progress = 100)</code> — в SQLite условие даёт 1 или 0.)', 'In one query on <code>enrollments</code>, show: the number of records, the number of <b>completed</b> courses (progress = 100) and the average progress rounded to a whole number. (Hint: count completed as <code>SUM(progress = 100)</code> — in SQLite a condition yields 1 or 0.)'),
        how: [L('<code>COUNT(*)</code>, <code>SUM(progress = 100)</code>, <code>ROUND(AVG(progress))</code>', '<code>COUNT(*)</code>, <code>SUM(progress = 100)</code>, <code>ROUND(AVG(progress))</code>', '<code>COUNT(*)</code>, <code>SUM(progress = 100)</code>, <code>ROUND(AVG(progress))</code>')],
        starter: '',
        solution: 'SELECT COUNT(*) AS total, SUM(progress = 100) AS completed, ROUND(AVG(progress)) AS avg_progress FROM enrollments;',
        hint: L('Записів 15, завершених 6.', 'Записей 15, завершённых 6.', '15 records, 6 completed.')
      },
      quiz: { q: L('Чим <code>COUNT(city)</code> відрізняється від <code>COUNT(*)</code>?', 'Чем <code>COUNT(city)</code> отличается от <code>COUNT(*)</code>?', 'How does <code>COUNT(city)</code> differ from <code>COUNT(*)</code>?'), options: [L('нічим', 'ничем', 'no difference'), L('не рахує NULL', 'не считает NULL', 'it skips NULLs'), L('рахує лише унікальні', 'считает только уникальные', 'it counts only unique values')], answer: 1, explain: L('NULL пропускаються.', 'NULL пропускаются.', 'NULLs are skipped.') },
      ref: [{ code: 'COUNT SUM AVG MIN MAX', d: L('агрегатні функції', 'агрегатные функции', 'aggregate functions') }]
    },
    {
      id: 'group-by', chapter: CH2,
      title: L('GROUP BY: групування', 'GROUP BY: группировка', 'GROUP BY'),
      theory: L(
        `<p><code>GROUP BY</code> ділить рядки на групи й рахує агрегат <b>для кожної групи</b>:</p>
<pre class="inline-code">SELECT city, COUNT(*) AS students, AVG(score) AS avg_score
FROM students
GROUP BY city;</pre>
<p>Результат: один рядок на кожне місто.</p>
<p>Правило: у <code>SELECT</code> можуть бути лише стовпці з <code>GROUP BY</code> та агрегатні функції.</p>
<p>Можна групувати за кількома стовпцями: <code>GROUP BY city, age</code>. І, звісно, сортувати результат: <code>ORDER BY students DESC</code>.</p>`,
        `<p><code>GROUP BY</code> делит строки на группы и считает агрегат <b>для каждой группы</b>:</p>
<pre class="inline-code">SELECT city, COUNT(*) AS students, AVG(score) AS avg_score
FROM students
GROUP BY city;</pre>
<p>Результат: одна строка на каждый город.</p>
<p>Правило: в <code>SELECT</code> могут быть только столбцы из <code>GROUP BY</code> и агрегатные функции.</p>
<p>Можно группировать по нескольким столбцам: <code>GROUP BY city, age</code>. И, конечно, сортировать результат: <code>ORDER BY students DESC</code>.</p>`,
        `<p><code>GROUP BY</code> splits rows into groups and computes an aggregate <b>for each group</b>:</p>
<pre class="inline-code">SELECT city, COUNT(*) AS students, AVG(score) AS avg_score
FROM students
GROUP BY city;</pre>
<p>Result: one row per city.</p>
<p>Rule: <code>SELECT</code> may contain only <code>GROUP BY</code> columns and aggregate functions.</p>
<p>You can group by several columns: <code>GROUP BY city, age</code>, and sort the result: <code>ORDER BY students DESC</code>.</p>`),
      why: L(`<p>«Продажі по місяцях», «користувачі по країнах», «середній бал по класах» — це GROUP BY. Це найпотужніший інструмент аналітика: одна команда замінює години ручного підрахунку в таблицях.</p>`,
        `<p>«Продажи по месяцам», «пользователи по странам», «средний балл по классам» — это GROUP BY. Это самый мощный инструмент аналитика: одна команда заменяет часы ручного подсчёта в таблицах.</p>`,
        `<p>“Sales by month”, “users by country”, “average grade by class” — that’s GROUP BY. It’s the analyst’s most powerful tool: one command replaces hours of manual spreadsheet counting.</p>`),
      mistakes: L(`<ul><li><code>SELECT name, city, COUNT(*) … GROUP BY city</code> — <code>name</code> не з групування; в інших СУБД це помилка.</li><li>NULL утворює окрему групу.</li></ul>`,
        `<ul><li><code>SELECT name, city, COUNT(*) … GROUP BY city</code> — <code>name</code> не из группировки; в других СУБД это ошибка.</li><li>NULL образует отдельную группу.</li></ul>`,
        `<ul><li><code>SELECT name, city, COUNT(*) … GROUP BY city</code> — <code>name</code> isn’t grouped; other databases reject this.</li><li>NULL forms its own group.</li></ul>`),
      examples: [
        { title: L('За містом', 'По городу', 'By city'), code: 'SELECT city, COUNT(*) AS students FROM students GROUP BY city ORDER BY students DESC;', note: L('NULL — окрема група.', 'NULL — отдельная группа.', 'NULL is its own group.') },
        { title: L('Середнє', 'Среднее', 'Average'), code: 'SELECT age, ROUND(AVG(score), 1) AS avg_score FROM students GROUP BY age ORDER BY age;', note: L('Середній бал за віком.', 'Средний балл по возрасту.', 'Average score by age.') },
        { title: L('Курси', 'Курсы', 'Courses'), code: 'SELECT course_id, COUNT(*) AS learners, MAX(progress) AS best FROM enrollments GROUP BY course_id;', note: L('Скільки людей на кожному курсі.', 'Сколько людей на каждом курсе.', 'How many people per course.') },
        { title: L('Рівні', 'Уровни', 'Levels'), code: 'SELECT level, COUNT(*) AS courses, SUM(price) AS total FROM courses GROUP BY level;', note: L('Кількість і сума за рівнем.', 'Количество и сумма по уровню.', 'Count and sum per level.') }
      ],
      task: {
        text: L('Для кожного учня в <code>enrollments</code> виведи <code>student_id</code> і кількість курсів, на які він записаний (стовпець <code>courses</code>). Відсортуй за кількістю курсів за спаданням, а за рівної кількості — за <code>student_id</code>.', 'Для каждого ученика в <code>enrollments</code> выведи <code>student_id</code> и количество курсов, на которые он записан (столбец <code>courses</code>). Отсортируй по количеству курсов по убыванию, а при равном количестве — по <code>student_id</code>.', 'For each student in <code>enrollments</code> show <code>student_id</code> and how many courses they’re enrolled in (column <code>courses</code>). Sort by course count descending, then by <code>student_id</code>.'),
        how: [L('<code>GROUP BY student_id</code>', '<code>GROUP BY student_id</code>', '<code>GROUP BY student_id</code>'), L('<code>ORDER BY courses DESC, student_id</code>', '<code>ORDER BY courses DESC, student_id</code>', '<code>ORDER BY courses DESC, student_id</code>')],
        starter: '',
        solution: 'SELECT student_id, COUNT(*) AS courses FROM enrollments GROUP BY student_id ORDER BY courses DESC, student_id;',
        hint: L('Першим буде учень 10 з трьома курсами.', 'Первым будет ученик 10 с тремя курсами.', 'Student 10 with three courses comes first.')
      },
      quiz: { q: L('Що можна писати в SELECT разом з GROUP BY city?', 'Что можно писать в SELECT вместе с GROUP BY city?', 'What can go in SELECT with GROUP BY city?'), options: [L('будь-які стовпці', 'любые столбцы', 'any column'), L('city та агрегатні функції', 'city и агрегатные функции', 'city and aggregate functions'), L('лише COUNT', 'только COUNT', 'only COUNT')], answer: 1, explain: L('Інші стовпці неоднозначні.', 'Другие столбцы неоднозначны.', 'Other columns are ambiguous.') },
      ref: [{ code: 'GROUP BY col', d: L('групування', 'группировка', 'grouping') }]
    },
    {
      id: 'having', chapter: CH2,
      title: L('HAVING: фільтр груп', 'HAVING: фильтр групп', 'HAVING: filtering groups'),
      theory: L(
        `<p><code>WHERE</code> фільтрує <b>рядки до</b> групування, а <code>HAVING</code> — <b>групи після</b> підрахунку:</p>
<pre class="inline-code">SELECT city, COUNT(*) AS students
FROM students
GROUP BY city
HAVING COUNT(*) >= 2;</pre>
<p>У <code>HAVING</code> можна використовувати агрегати, у <code>WHERE</code> — ні.</p>
<p>Повний порядок частин запиту:</p>
<pre class="inline-code">SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …</pre>`,
        `<p><code>WHERE</code> фильтрует <b>строки до</b> группировки, а <code>HAVING</code> — <b>группы после</b> подсчёта:</p>
<pre class="inline-code">SELECT city, COUNT(*) AS students
FROM students
GROUP BY city
HAVING COUNT(*) >= 2;</pre>
<p>В <code>HAVING</code> можно использовать агрегаты, в <code>WHERE</code> — нет.</p>
<p>Полный порядок частей запроса:</p>
<pre class="inline-code">SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …</pre>`,
        `<p><code>WHERE</code> filters <b>rows before</b> grouping, <code>HAVING</code> filters <b>groups after</b> counting:</p>
<pre class="inline-code">SELECT city, COUNT(*) AS students
FROM students
GROUP BY city
HAVING COUNT(*) >= 2;</pre>
<p>Aggregates are allowed in <code>HAVING</code>, not in <code>WHERE</code>.</p>
<p>The full clause order:</p>
<pre class="inline-code">SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT …</pre>`),
      why: L(`<p>Питання на кшталт «які міста мають понад 100 клієнтів?» чи «які товари продалися більш ніж на 10 000?» неможливо задати через WHERE — кількість стає відомою лише після групування. Для цього й існує HAVING.</p>`,
        `<p>Вопросы вроде «какие города имеют больше 100 клиентов?» или «какие товары продались больше чем на 10 000?» невозможно задать через WHERE — количество становится известным только после группировки. Для этого и существует HAVING.</p>`,
        `<p>Questions like “which cities have over 100 customers?” or “which products sold over 10,000?” can’t be asked with WHERE — the count only exists after grouping. That’s what HAVING is for.</p>`),
      mistakes: L(`<ul><li><code>WHERE COUNT(*) &gt; 2</code> → помилка: агрегатам місце в HAVING.</li><li>Фільтрувати звичайні умови в HAVING замість WHERE — працює, але повільніше.</li></ul>`,
        `<ul><li><code>WHERE COUNT(*) &gt; 2</code> → ошибка: агрегатам место в HAVING.</li><li>Фильтровать обычные условия в HAVING вместо WHERE — работает, но медленнее.</li></ul>`,
        `<ul><li><code>WHERE COUNT(*) &gt; 2</code> → error: aggregates belong in HAVING.</li><li>Putting plain conditions in HAVING instead of WHERE — works but is slower.</li></ul>`),
      examples: [
        { title: 'HAVING', code: 'SELECT city, COUNT(*) AS students FROM students GROUP BY city HAVING COUNT(*) >= 2;', note: L('Міста з двома й більше учнями.', 'Города с двумя и более учениками.', 'Cities with two or more students.') },
        { title: 'WHERE + HAVING', code: 'SELECT city, AVG(score) AS avg FROM students WHERE age >= 14 GROUP BY city HAVING AVG(score) > 80;', note: L('Спершу рядки (вік), потім групи (середнє).', 'Сначала строки (возраст), потом группы (среднее).', 'Rows first (age), then groups (average).') },
        { title: L('Популярні курси', 'Популярные курсы', 'Popular courses'), code: 'SELECT course_id, COUNT(*) AS learners FROM enrollments GROUP BY course_id HAVING learners >= 3 ORDER BY learners DESC;', note: L('У SQLite можна посилатися на псевдонім.', 'В SQLite можно ссылаться на псевдоним.', 'SQLite lets you reference the alias.') }
      ],
      task: {
        text: L('Виведи <code>course_id</code> і середній прогрес (<code>avg_progress</code>, округлений до цілого) для курсів, де <b>середній прогрес понад 60</b>.', 'Выведи <code>course_id</code> и средний прогресс (<code>avg_progress</code>, округлённый до целого) для курсов, где <b>средний прогресс больше 60</b>.', 'Show <code>course_id</code> and the average progress (<code>avg_progress</code>, rounded to a whole number) for courses whose <b>average progress is above 60</b>.'),
        how: [L('<code>GROUP BY course_id HAVING AVG(progress) &gt; 60</code>', '<code>GROUP BY course_id HAVING AVG(progress) &gt; 60</code>', '<code>GROUP BY course_id HAVING AVG(progress) &gt; 60</code>')],
        starter: '',
        solution: 'SELECT course_id, ROUND(AVG(progress)) AS avg_progress FROM enrollments GROUP BY course_id HAVING AVG(progress) > 60;',
        hint: L('Має вийти 3 курси.', 'Должно получиться 3 курса.', 'You should get 3 courses.')
      },
      quiz: { q: L('Де фільтрують за <code>COUNT(*)</code>?', 'Где фильтруют по <code>COUNT(*)</code>?', 'Where do you filter by <code>COUNT(*)</code>?'), options: ['WHERE', 'HAVING', 'ORDER BY'], answer: 1, explain: L('Агрегати — у HAVING.', 'Агрегаты — в HAVING.', 'Aggregates go in HAVING.') },
      ref: [{ code: 'GROUP BY … HAVING cond', d: L('фільтр груп', 'фильтр групп', 'filter groups') }]
    },
    {
      id: 'join', chapter: CH3,
      title: L('JOIN: об’єднання таблиць', 'JOIN: объединение таблиц', 'JOIN: combining tables'),
      theory: L(
        `<p>Дані зберігають у кількох таблицях, пов’язаних <b>ключами</b>: <code>enrollments.student_id</code> вказує на <code>students.id</code>, а <code>course_id</code> — на <code>courses.id</code>. <code>JOIN</code> «склеює» таблиці за цими зв’язками:</p>
<pre class="inline-code">SELECT s.name, c.title, e.progress
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id;</pre>
<ul><li><code>JOIN</code> (= <code>INNER JOIN</code>) — лише рядки, для яких знайшлася пара в обох таблицях</li><li><code>ON</code> — умова зв’язку</li><li>Псевдоніми таблиць (<code>s</code>, <code>c</code>, <code>e</code>) роблять запит коротшим</li><li>Стовпці з однаковими назвами уточнюй: <code>s.id</code>, <code>c.id</code></li></ul>`,
        `<p>Данные хранят в нескольких таблицах, связанных <b>ключами</b>: <code>enrollments.student_id</code> указывает на <code>students.id</code>, а <code>course_id</code> — на <code>courses.id</code>. <code>JOIN</code> «склеивает» таблицы по этим связям:</p>
<pre class="inline-code">SELECT s.name, c.title, e.progress
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id;</pre>
<ul><li><code>JOIN</code> (= <code>INNER JOIN</code>) — только строки, для которых нашлась пара в обеих таблицах</li><li><code>ON</code> — условие связи</li><li>Псевдонимы таблиц (<code>s</code>, <code>c</code>, <code>e</code>) делают запрос короче</li><li>Столбцы с одинаковыми названиями уточняй: <code>s.id</code>, <code>c.id</code></li></ul>`,
        `<p>Data lives in several tables linked by <b>keys</b>: <code>enrollments.student_id</code> points to <code>students.id</code>, and <code>course_id</code> to <code>courses.id</code>. <code>JOIN</code> glues tables together via these links:</p>
<pre class="inline-code">SELECT s.name, c.title, e.progress
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN courses  AS c ON c.id = e.course_id;</pre>
<ul><li><code>JOIN</code> (= <code>INNER JOIN</code>) — only rows with a match in both tables</li><li><code>ON</code> — the join condition</li><li>Table aliases (<code>s</code>, <code>c</code>, <code>e</code>) keep it short</li><li>Qualify same-named columns: <code>s.id</code>, <code>c.id</code></li></ul>`),
      why: L(`<p>Чому не одна велика таблиця? Тоді ім’я учня повторювалося б у кожному його записі на курс, а зміна імені вимагала б оновити десятки рядків. Розділення на таблиці (<b>нормалізація</b>) усуває дублювання, а JOIN збирає дані назад, коли потрібно.</p>`,
        `<p>Почему не одна большая таблица? Тогда имя ученика повторялось бы в каждой его записи на курс, а смена имени требовала бы обновить десятки строк. Разделение на таблицы (<b>нормализация</b>) устраняет дублирование, а JOIN собирает данные обратно, когда нужно.</p>`,
        `<p>Why not one big table? Then a student’s name would repeat in every enrollment, and a name change would mean updating dozens of rows. Splitting into tables (<b>normalisation</b>) removes duplication, and JOIN reassembles the data when needed.</p>`),
      mistakes: L(`<ul><li>Забути <code>ON</code> — вийде «кожен з кожним» (декартів добуток): 10 учнів × 15 записів = 150 рядків.</li><li><code>id</code> без уточнення таблиці → <code>ambiguous column name</code>.</li></ul>`,
        `<ul><li>Забыть <code>ON</code> — получится «каждый с каждым» (декартово произведение): 10 учеников × 15 записей = 150 строк.</li><li><code>id</code> без уточнения таблицы → <code>ambiguous column name</code>.</li></ul>`,
        `<ul><li>Forgetting <code>ON</code> gives every-row-with-every-row (a Cartesian product): 10 students × 15 enrollments = 150 rows.</li><li>An unqualified <code>id</code> → <code>ambiguous column name</code>.</li></ul>`),
      examples: [
        { title: L('Дві таблиці', 'Две таблицы', 'Two tables'), code: 'SELECT s.name, e.course_id, e.progress\nFROM enrollments AS e\nJOIN students AS s ON s.id = e.student_id;', note: L('Ім’я замість номера учня.', 'Имя вместо номера ученика.', 'A name instead of a student number.') },
        { title: L('Три таблиці', 'Три таблицы', 'Three tables'), code: 'SELECT s.name, c.title, e.progress\nFROM enrollments e\nJOIN students s ON s.id = e.student_id\nJOIN courses c ON c.id = e.course_id\nORDER BY s.name;', note: L('Повна картина: хто, що, наскільки.', 'Полная картина: кто, что, насколько.', 'The full picture: who, what, how far.') },
        { title: L('JOIN + WHERE', 'JOIN + WHERE', 'JOIN + WHERE'), code: "SELECT s.name, e.progress\nFROM enrollments e\nJOIN students s ON s.id = e.student_id\nJOIN courses c ON c.id = e.course_id\nWHERE c.title = 'Python Basics';", note: L('Учні конкретного курсу.', 'Ученики конкретного курса.', 'Students of a specific course.') },
        { title: L('Без ON (погано)', 'Без ON (плохо)', 'No ON (bad)'), code: 'SELECT COUNT(*) FROM students, enrollments;', note: L('150 — кожен рядок з кожним.', '150 — каждая строка с каждой.', '150 — every row with every row.') }
      ],
      task: {
        text: L('Виведи імена учнів і назви курсів, які вони <b>завершили</b> (progress = 100). Відсортуй за іменем, потім за назвою курсу.', 'Выведи имена учеников и названия курсов, которые они <b>завершили</b> (progress = 100). Отсортируй по имени, затем по названию курса.', 'Show student names and the titles of courses they’ve <b>completed</b> (progress = 100). Sort by name, then by course title.'),
        how: [L('Два JOIN: до <code>students</code> і до <code>courses</code>.', 'Два JOIN: к <code>students</code> и к <code>courses</code>.', 'Two JOINs: to <code>students</code> and to <code>courses</code>.'), L('<code>WHERE e.progress = 100</code>', '<code>WHERE e.progress = 100</code>', '<code>WHERE e.progress = 100</code>')],
        starter: 'SELECT s.name, c.title\nFROM enrollments e\n',
        solution: 'SELECT s.name, c.title\nFROM enrollments e\nJOIN students s ON s.id = e.student_id\nJOIN courses c ON c.id = e.course_id\nWHERE e.progress = 100\nORDER BY s.name, c.title;',
        hint: L('Має вийти 6 рядків; Nazar — двічі.', 'Должно получиться 6 строк; Nazar — дважды.', 'You should get 6 rows; Nazar appears twice.')
      },
      quiz: { q: L('Що повертає INNER JOIN?', 'Что возвращает INNER JOIN?', 'What does INNER JOIN return?'), options: [L('усі рядки обох таблиць', 'все строки обеих таблиц', 'all rows of both tables'), L('лише рядки з парою в обох таблицях', 'только строки с парой в обеих таблицах', 'only rows matched in both tables'), L('лише ліву таблицю', 'только левую таблицу', 'only the left table')], answer: 1, explain: L('Без пари рядок не потрапляє.', 'Без пары строка не попадает.', 'Unmatched rows are dropped.') },
      ref: [{ code: 'JOIN t2 ON t2.id = t1.t2_id', d: L('об’єднання таблиць', 'объединение таблиц', 'joining tables') }]
    },
    {
      id: 'left-join', chapter: CH3,
      title: L('LEFT JOIN', 'LEFT JOIN', 'LEFT JOIN'),
      theory: L(
        `<p><code>LEFT JOIN</code> залишає <b>усі</b> рядки лівої таблиці, навіть якщо в правій для них немає пари. Відсутні значення стають <code>NULL</code>:</p>
<pre class="inline-code">SELECT s.name, e.course_id
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id;</pre>
<p>Учениця Liza не записана на жоден курс — з <code>JOIN</code> її не видно, а з <code>LEFT JOIN</code> вона з’явиться з <code>NULL</code>.</p>
<p>Класичний прийом — знайти «тих, у кого нічого немає»:</p>
<pre class="inline-code">… LEFT JOIN enrollments e ON e.student_id = s.id
WHERE e.student_id IS NULL;</pre>
<p>Порахувати разом з нулями: <code>COUNT(e.course_id)</code> (не <code>COUNT(*)</code>!).</p>`,
        `<p><code>LEFT JOIN</code> оставляет <b>все</b> строки левой таблицы, даже если в правой для них нет пары. Отсутствующие значения становятся <code>NULL</code>:</p>
<pre class="inline-code">SELECT s.name, e.course_id
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id;</pre>
<p>Ученица Liza не записана ни на один курс — с <code>JOIN</code> её не видно, а с <code>LEFT JOIN</code> она появится с <code>NULL</code>.</p>
<p>Классический приём — найти «тех, у кого ничего нет»:</p>
<pre class="inline-code">… LEFT JOIN enrollments e ON e.student_id = s.id
WHERE e.student_id IS NULL;</pre>
<p>Посчитать вместе с нулями: <code>COUNT(e.course_id)</code> (не <code>COUNT(*)</code>!).</p>`,
        `<p><code>LEFT JOIN</code> keeps <b>all</b> rows of the left table even when the right table has no match. Missing values become <code>NULL</code>:</p>
<pre class="inline-code">SELECT s.name, e.course_id
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id;</pre>
<p>Liza isn’t enrolled anywhere — invisible with <code>JOIN</code>, but shown with <code>NULL</code> using <code>LEFT JOIN</code>.</p>
<p>The classic trick — find “those with nothing”:</p>
<pre class="inline-code">… LEFT JOIN enrollments e ON e.student_id = s.id
WHERE e.student_id IS NULL;</pre>
<p>To count including zeros use <code>COUNT(e.course_id)</code> (not <code>COUNT(*)</code>!).</p>`),
      why: L(`<p>Звіти мають показувати всіх: «скільки замовлень у кожного клієнта» — і клієнти з нулем замовлень теж важливі (можливо, їм варто надіслати знижку). INNER JOIN їх тихо «губить», LEFT JOIN — зберігає.</p>`,
        `<p>Отчёты должны показывать всех: «сколько заказов у каждого клиента» — и клиенты с нулём заказов тоже важны (возможно, им стоит отправить скидку). INNER JOIN их тихо «теряет», LEFT JOIN — сохраняет.</p>`,
        `<p>Reports should show everyone: “orders per customer” — customers with zero orders matter too (maybe send them a discount). INNER JOIN silently drops them, LEFT JOIN keeps them.</p>`),
      mistakes: L(`<ul><li><code>COUNT(*)</code> з LEFT JOIN дає 1 замість 0 для «порожніх».</li><li>Умова на праву таблицю у WHERE (<code>WHERE e.progress &gt; 50</code>) перетворює LEFT JOIN на звичайний JOIN. Таку умову пиши в <code>ON</code>.</li></ul>`,
        `<ul><li><code>COUNT(*)</code> с LEFT JOIN даёт 1 вместо 0 для «пустых».</li><li>Условие на правую таблицу в WHERE (<code>WHERE e.progress &gt; 50</code>) превращает LEFT JOIN в обычный JOIN. Такое условие пиши в <code>ON</code>.</li></ul>`,
        `<ul><li><code>COUNT(*)</code> with LEFT JOIN gives 1 instead of 0 for “empty” rows.</li><li>A condition on the right table in WHERE (<code>WHERE e.progress &gt; 50</code>) turns a LEFT JOIN into an inner join. Put it in <code>ON</code>.</li></ul>`),
      examples: [
        { title: 'LEFT JOIN', code: 'SELECT s.name, e.course_id, e.progress\nFROM students s\nLEFT JOIN enrollments e ON e.student_id = s.id\nORDER BY s.id;', note: L('Liza з NULL.', 'Liza с NULL.', 'Liza with NULL.') },
        { title: L('Хто без курсів', 'Кто без курсов', 'No courses'), code: 'SELECT s.name\nFROM students s\nLEFT JOIN enrollments e ON e.student_id = s.id\nWHERE e.student_id IS NULL;', note: L('Учні без жодного запису.', 'Ученики без единой записи.', 'Students with no enrollments.') },
        { title: L('Підрахунок з нулями', 'Подсчёт с нулями', 'Counting zeros'), code: 'SELECT s.name, COUNT(e.course_id) AS courses, COUNT(*) AS wrong\nFROM students s\nLEFT JOIN enrollments e ON e.student_id = s.id\nGROUP BY s.id\nORDER BY courses;', note: L('Порівняй стовпці для Liza.', 'Сравни столбцы для Liza.', 'Compare the columns for Liza.') }
      ],
      task: {
        text: L('Виведи <b>кожен курс</b> (назву) і кількість учнів на ньому (<code>learners</code>), включно з курсами без учнів. Відсортуй за кількістю за спаданням, потім за назвою.', 'Выведи <b>каждый курс</b> (название) и количество учеников на нём (<code>learners</code>), включая курсы без учеников. Отсортируй по количеству по убыванию, затем по названию.', 'Show <b>every course</b> (title) and its number of students (<code>learners</code>), including courses with none. Sort by count descending, then by title.'),
        how: [L('<code>FROM courses c LEFT JOIN enrollments e ON e.course_id = c.id</code>', '<code>FROM courses c LEFT JOIN enrollments e ON e.course_id = c.id</code>', '<code>FROM courses c LEFT JOIN enrollments e ON e.course_id = c.id</code>'), L('<code>COUNT(e.student_id) AS learners</code>, <code>GROUP BY c.id</code>', '<code>COUNT(e.student_id) AS learners</code>, <code>GROUP BY c.id</code>', '<code>COUNT(e.student_id) AS learners</code>, <code>GROUP BY c.id</code>')],
        starter: '',
        solution: 'SELECT c.title, COUNT(e.student_id) AS learners\nFROM courses c\nLEFT JOIN enrollments e ON e.course_id = c.id\nGROUP BY c.id\nORDER BY learners DESC, c.title;',
        hint: L('Python Basics лідирує з 5 учнями.', 'Python Basics лидирует с 5 учениками.', 'Python Basics leads with 5 students.'),
        must: /LEFT\s+JOIN/i
      },
      quiz: { q: L('Що з’явиться в стовпцях правої таблиці, якщо пари немає?', 'Что появится в столбцах правой таблицы, если пары нет?', 'What appears in the right table’s columns when there’s no match?'), options: ['0', 'NULL', L('рядок пропадає', 'строка пропадает', 'the row disappears')], answer: 1, explain: L('LEFT JOIN заповнює NULL.', 'LEFT JOIN заполняет NULL.', 'LEFT JOIN fills NULL.') },
      ref: [{ code: 'LEFT JOIN … WHERE r.id IS NULL', d: L('знайти без пари', 'найти без пары', 'find unmatched rows') }]
    },
    {
      id: 'subquery', chapter: CH3,
      title: L('Підзапити', 'Подзапросы', 'Subqueries'),
      theory: L(
        `<p><b>Підзапит</b> — запит усередині іншого запиту, у дужках:</p>
<pre class="inline-code">SELECT name, score FROM students
WHERE score > (SELECT AVG(score) FROM students);</pre>
<p>Спершу виконується внутрішній запит (середній бал), потім зовнішній використовує результат.</p>
<ul><li>Скалярний підзапит повертає <b>одне</b> значення — його ставлять у порівняння</li><li>Підзапит-список — з <code>IN</code>: <code>WHERE id IN (SELECT student_id FROM enrollments WHERE progress = 100)</code></li><li><code>EXISTS (SELECT …)</code> — чи є хоч один рядок</li><li>Підзапит у <code>FROM</code> — як тимчасова таблиця</li></ul>
<p>Складні запити зручно оформлювати через <code>WITH name AS (…) SELECT …</code> (CTE).</p>`,
        `<p><b>Подзапрос</b> — запрос внутри другого запроса, в скобках:</p>
<pre class="inline-code">SELECT name, score FROM students
WHERE score > (SELECT AVG(score) FROM students);</pre>
<p>Сначала выполняется внутренний запрос (средний балл), потом внешний использует результат.</p>
<ul><li>Скалярный подзапрос возвращает <b>одно</b> значение — его ставят в сравнение</li><li>Подзапрос-список — с <code>IN</code>: <code>WHERE id IN (SELECT student_id FROM enrollments WHERE progress = 100)</code></li><li><code>EXISTS (SELECT …)</code> — есть ли хоть одна строка</li><li>Подзапрос в <code>FROM</code> — как временная таблица</li></ul>
<p>Сложные запросы удобно оформлять через <code>WITH name AS (…) SELECT …</code> (CTE).</p>`,
        `<p>A <b>subquery</b> is a query inside another query, in parentheses:</p>
<pre class="inline-code">SELECT name, score FROM students
WHERE score > (SELECT AVG(score) FROM students);</pre>
<p>The inner query (the average) runs first; the outer one uses the result.</p>
<ul><li>A scalar subquery returns <b>one</b> value — use it in a comparison</li><li>A list subquery goes with <code>IN</code>: <code>WHERE id IN (SELECT student_id FROM enrollments WHERE progress = 100)</code></li><li><code>EXISTS (SELECT …)</code> — is there at least one row</li><li>A subquery in <code>FROM</code> acts like a temporary table</li></ul>
<p>Complex queries read well with <code>WITH name AS (…) SELECT …</code> (a CTE).</p>`),
      why: L(`<p>«Хто має бал вище середнього?» — щоб відповісти, спершу треба знати середнє. Підзапити дозволяють поставити кілька питань в одному запиті. CTE (<code>WITH</code>) робить такий код читабельним, як розповідь крок за кроком.</p>`,
        `<p>«У кого балл выше среднего?» — чтобы ответить, сначала нужно знать среднее. Подзапросы позволяют задать несколько вопросов в одном запросе. CTE (<code>WITH</code>) делает такой код читаемым, как рассказ шаг за шагом.</p>`,
        `<p>“Who scored above average?” — you need the average first. Subqueries let you ask several questions in one query. CTEs (<code>WITH</code>) make such code read like a step-by-step story.</p>`),
      mistakes: L(`<ul><li>Скалярний підзапит повертає кілька рядків — помилка або несподіваний результат.</li><li><code>NOT IN</code> з підзапитом, що містить NULL, повертає порожньо. Безпечніше <code>NOT EXISTS</code>.</li></ul>`,
        `<ul><li>Скалярный подзапрос возвращает несколько строк — ошибка или неожиданный результат.</li><li><code>NOT IN</code> с подзапросом, содержащим NULL, возвращает пусто. Безопаснее <code>NOT EXISTS</code>.</li></ul>`,
        `<ul><li>A scalar subquery returning several rows — an error or a surprise.</li><li><code>NOT IN</code> with a subquery containing NULL returns nothing. <code>NOT EXISTS</code> is safer.</li></ul>`),
      examples: [
        { title: L('Вище середнього', 'Выше среднего', 'Above average'), code: 'SELECT name, score FROM students\nWHERE score > (SELECT AVG(score) FROM students)\nORDER BY score DESC;', note: L('Середнє рахується всередині.', 'Среднее считается внутри.', 'The average is computed inside.') },
        { title: 'IN', code: 'SELECT name FROM students\nWHERE id IN (SELECT student_id FROM enrollments WHERE progress = 100);', note: L('Хто завершив хоча б один курс.', 'Кто завершил хотя бы один курс.', 'Who completed at least one course.') },
        { title: 'NOT EXISTS', code: 'SELECT name FROM students s\nWHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.id);', note: L('Ще один спосіб знайти учнів без курсів.', 'Ещё один способ найти учеников без курсов.', 'Another way to find students with no courses.') },
        { title: 'WITH', code: 'WITH totals AS (\n  SELECT student_id, SUM(progress) AS total FROM enrollments GROUP BY student_id\n)\nSELECT s.name, t.total FROM totals t JOIN students s ON s.id = t.student_id\nORDER BY t.total DESC LIMIT 3;', note: L('Тимчасова іменована таблиця.', 'Временная именованная таблица.', 'A temporary named table.') }
      ],
      task: {
        text: L('Виведи назви курсів, ціна яких <b>вища за середню ціну</b> всіх курсів.', 'Выведи названия курсов, цена которых <b>выше средней цены</b> всех курсов.', 'Show the titles of courses priced <b>above the average price</b> of all courses.'),
        how: [L('<code>WHERE price &gt; (SELECT AVG(price) FROM courses)</code>', '<code>WHERE price &gt; (SELECT AVG(price) FROM courses)</code>', '<code>WHERE price &gt; (SELECT AVG(price) FROM courses)</code>')],
        starter: '',
        solution: 'SELECT title FROM courses WHERE price > (SELECT AVG(price) FROM courses);',
        hint: L('Середня ціна — 130.', 'Средняя цена — 130.', 'The average price is 130.'),
        must: /\(\s*SELECT/i
      },
      quiz: { q: L('Що виконується першим?', 'Что выполняется первым?', 'What runs first?'), options: [L('зовнішній запит', 'внешний запрос', 'the outer query'), L('підзапит', 'подзапрос', 'the subquery'), L('одночасно', 'одновременно', 'both at once')], answer: 1, explain: L('Зовнішньому потрібен результат підзапиту.', 'Внешнему нужен результат подзапроса.', 'The outer query needs its result.') },
      ref: [{ code: 'WHERE x > (SELECT …)', d: L('скалярний підзапит', 'скалярный подзапрос', 'scalar subquery') }, { code: 'WITH t AS (…) SELECT …', d: L('CTE', 'CTE', 'CTE') }]
    },
    {
      id: 'case', chapter: CH3,
      title: L('CASE: умови в запитах', 'CASE: условия в запросах', 'CASE: conditions in queries'),
      theory: L(
        `<p><code>CASE</code> — це «if/else» усередині SQL. Він обчислює значення залежно від умов:</p>
<pre class="inline-code">SELECT name, score,
  CASE
    WHEN score >= 90 THEN 'excellent'
    WHEN score >= 75 THEN 'good'
    ELSE 'keep trying'
  END AS grade
FROM students;</pre>
<p>Умови перевіряються згори вниз, береться перша істинна. Без <code>ELSE</code> результат буде <code>NULL</code>.</p>
<p>CASE можна використовувати в <code>SELECT</code>, <code>ORDER BY</code>, всередині агрегатів: <code>SUM(CASE WHEN progress = 100 THEN 1 ELSE 0 END)</code>.</p>`,
        `<p><code>CASE</code> — это «if/else» внутри SQL. Он вычисляет значение в зависимости от условий:</p>
<pre class="inline-code">SELECT name, score,
  CASE
    WHEN score >= 90 THEN 'excellent'
    WHEN score >= 75 THEN 'good'
    ELSE 'keep trying'
  END AS grade
FROM students;</pre>
<p>Условия проверяются сверху вниз, берётся первое истинное. Без <code>ELSE</code> результат будет <code>NULL</code>.</p>
<p>CASE можно использовать в <code>SELECT</code>, <code>ORDER BY</code>, внутри агрегатов: <code>SUM(CASE WHEN progress = 100 THEN 1 ELSE 0 END)</code>.</p>`,
        `<p><code>CASE</code> is “if/else” inside SQL. It computes a value based on conditions:</p>
<pre class="inline-code">SELECT name, score,
  CASE
    WHEN score >= 90 THEN 'excellent'
    WHEN score >= 75 THEN 'good'
    ELSE 'keep trying'
  END AS grade
FROM students;</pre>
<p>Conditions are checked top to bottom; the first true one wins. Without <code>ELSE</code> the result is <code>NULL</code>.</p>
<p>Use CASE in <code>SELECT</code>, <code>ORDER BY</code> and inside aggregates: <code>SUM(CASE WHEN progress = 100 THEN 1 ELSE 0 END)</code>.</p>`),
      why: L(`<p>Звіти часто потребують категорій: «VIP / звичайний клієнт», «вчасно / прострочено», «оцінка буквою». CASE робить це прямо в базі, без постобробки в програмі. А CASE всередині SUM — спосіб порахувати кілька різних речей в одному запиті.</p>`,
        `<p>Отчёты часто требуют категорий: «VIP / обычный клиент», «вовремя / просрочено», «оценка буквой». CASE делает это прямо в базе, без постобработки в программе. А CASE внутри SUM — способ посчитать несколько разных вещей в одном запросе.</p>`,
        `<p>Reports often need categories: “VIP / regular”, “on time / overdue”, “letter grade”. CASE does it in the database, no post-processing. CASE inside SUM counts several different things in one query.</p>`),
      mistakes: L(`<ul><li>Забути <code>END</code> — синтаксична помилка.</li><li>Неправильний порядок <code>WHEN</code>: якщо першою стоїть <code>score &gt;= 75</code>, то 95 балів отримає «good».</li></ul>`,
        `<ul><li>Забыть <code>END</code> — синтаксическая ошибка.</li><li>Неправильный порядок <code>WHEN</code>: если первым стоит <code>score &gt;= 75</code>, то 95 баллов получит «good».</li></ul>`,
        `<ul><li>Forgetting <code>END</code> — a syntax error.</li><li>Wrong <code>WHEN</code> order: with <code>score &gt;= 75</code> first, 95 gets “good”.</li></ul>`),
      examples: [
        { title: L('Оцінки', 'Оценки', 'Grades'), code: "SELECT name, score,\n  CASE WHEN score >= 90 THEN 'A' WHEN score >= 75 THEN 'B' ELSE 'C' END AS grade\nFROM students ORDER BY score DESC;", note: L('Буквена оцінка з балів.', 'Буквенная оценка из баллов.', 'A letter grade from scores.') },
        { title: L('Безкоштовно', 'Бесплатно', 'Free'), code: "SELECT title, CASE WHEN price = 0 THEN 'free' ELSE price || ' UAH' END AS cost FROM courses;", note: L('Текст замість нуля.', 'Текст вместо нуля.', 'Text instead of zero.') },
        { title: L('Підрахунок по категоріях', 'Подсчёт по категориям', 'Counting by category'), code: 'SELECT\n  SUM(CASE WHEN progress = 100 THEN 1 ELSE 0 END) AS done,\n  SUM(CASE WHEN progress BETWEEN 50 AND 99 THEN 1 ELSE 0 END) AS halfway,\n  SUM(CASE WHEN progress < 50 THEN 1 ELSE 0 END) AS started\nFROM enrollments;', note: L('Три лічильники одним запитом.', 'Три счётчика одним запросом.', 'Three counters in one query.') }
      ],
      task: {
        text: L('Виведи ім’я та вік кожного учня і стовпець <code>group_name</code>: <code>junior</code> для 13–14 років, <code>senior</code> для 15 і старших.', 'Выведи имя и возраст каждого ученика и столбец <code>group_name</code>: <code>junior</code> для 13–14 лет, <code>senior</code> для 15 и старше.', 'Show each student’s name and age plus a <code>group_name</code> column: <code>junior</code> for ages 13–14, <code>senior</code> for 15 and over.'),
        how: [L("<code>CASE WHEN age &lt;= 14 THEN 'junior' ELSE 'senior' END AS group_name</code>", "<code>CASE WHEN age &lt;= 14 THEN 'junior' ELSE 'senior' END AS group_name</code>", "<code>CASE WHEN age &lt;= 14 THEN 'junior' ELSE 'senior' END AS group_name</code>")],
        starter: '',
        solution: "SELECT name, age, CASE WHEN age <= 14 THEN 'junior' ELSE 'senior' END AS group_name FROM students;",
        hint: L('Тексти <code>junior</code> і <code>senior</code> — малими літерами.', 'Тексты <code>junior</code> и <code>senior</code> — маленькими буквами.', 'Write <code>junior</code> and <code>senior</code> in lowercase.'),
        must: /CASE/i
      },
      quiz: { q: L('Що поверне CASE, якщо жодна умова не підійшла і ELSE немає?', 'Что вернёт CASE, если ни одно условие не подошло и ELSE нет?', 'What does CASE return when nothing matches and there’s no ELSE?'), options: ['0', 'NULL', L('помилку', 'ошибку', 'an error')], answer: 1, explain: L('За замовчуванням — NULL.', 'По умолчанию — NULL.', 'NULL by default.') },
      ref: [{ code: 'CASE WHEN … THEN … ELSE … END', d: L('умова в запиті', 'условие в запросе', 'condition in a query') }]
    },
    {
      id: 'insert', chapter: CH4,
      title: L('INSERT: додавання даних', 'INSERT: добавление данных', 'INSERT: adding data'),
      theory: L(
        `<p><code>INSERT</code> додає нові рядки:</p>
<pre class="inline-code">INSERT INTO students (name, age, city, score)
VALUES ('Mira', 13, 'Kyiv', 88);</pre>
<ul><li>У дужках після назви таблиці — стовпці, які заповнюємо</li><li>У <code>VALUES</code> — значення в тому самому порядку</li><li>Стовпці, яких немає у списку, отримають NULL або значення за замовчуванням; <code>id INTEGER PRIMARY KEY</code> заповнюється автоматично</li><li>Кілька рядків одразу: <code>VALUES (...), (...), (...)</code></li></ul>
<p>Після зміни даних зазвичай перевіряють результат звичайним <code>SELECT</code>.</p>
<div class="tip">💡 У Codry кожен запуск починається з «чистої» бази, тож можеш сміливо експериментувати.</div>`,
        `<p><code>INSERT</code> добавляет новые строки:</p>
<pre class="inline-code">INSERT INTO students (name, age, city, score)
VALUES ('Mira', 13, 'Kyiv', 88);</pre>
<ul><li>В скобках после названия таблицы — столбцы, которые заполняем</li><li>В <code>VALUES</code> — значения в том же порядке</li><li>Столбцы, которых нет в списке, получат NULL или значение по умолчанию; <code>id INTEGER PRIMARY KEY</code> заполняется автоматически</li><li>Несколько строк сразу: <code>VALUES (...), (...), (...)</code></li></ul>
<p>После изменения данных обычно проверяют результат обычным <code>SELECT</code>.</p>
<div class="tip">💡 В Codry каждый запуск начинается с «чистой» базы, так что можешь смело экспериментировать.</div>`,
        `<p><code>INSERT</code> adds new rows:</p>
<pre class="inline-code">INSERT INTO students (name, age, city, score)
VALUES ('Mira', 13, 'Kyiv', 88);</pre>
<ul><li>The parentheses after the table name list the columns being filled</li><li><code>VALUES</code> gives the values in the same order</li><li>Columns left out get NULL or their default; <code>id INTEGER PRIMARY KEY</code> fills in automatically</li><li>Several rows at once: <code>VALUES (...), (...), (...)</code></li></ul>
<p>After changing data you usually check it with a normal <code>SELECT</code>.</p>
<div class="tip">💡 In Codry every run starts with a fresh database, so experiment freely.</div>`),
      why: L(`<p>Кожна реєстрація, коментар, замовлення чи лайк — це <code>INSERT</code> у якусь таблицю. Явний список стовпців робить запит надійним: якщо в таблицю додадуть новий стовпець, запит не зламається.</p>`,
        `<p>Каждая регистрация, комментарий, заказ или лайк — это <code>INSERT</code> в какую-то таблицу. Явный список столбцов делает запрос надёжным: если в таблицу добавят новый столбец, запрос не сломается.</p>`,
        `<p>Every sign-up, comment, order or like is an <code>INSERT</code> into some table. An explicit column list makes it robust: adding a new column to the table won’t break the query.</p>`),
      mistakes: L(`<ul><li>Кількість значень не збігається з кількістю стовпців.</li><li>Текст без лапок: <code>VALUES (Mira, ...)</code> → помилка.</li></ul>`,
        `<ul><li>Количество значений не совпадает с количеством столбцов.</li><li>Текст без кавычек: <code>VALUES (Mira, ...)</code> → ошибка.</li></ul>`,
        `<ul><li>The number of values doesn’t match the number of columns.</li><li>Unquoted text: <code>VALUES (Mira, ...)</code> → error.</li></ul>`),
      examples: [
        { title: L('Один рядок', 'Одна строка', 'One row'), code: "INSERT INTO students (name, age, city, score) VALUES ('Mira', 13, 'Kyiv', 88);\nSELECT * FROM students WHERE name = 'Mira';", note: L('id присвоївся автоматично (11).', 'id присвоился автоматически (11).', 'The id was assigned automatically (11).') },
        { title: L('Кілька рядків', 'Несколько строк', 'Several rows'), code: "INSERT INTO courses (title, level, price) VALUES\n  ('C++ Start', 'beginner', 0),\n  ('Go Backend', 'advanced', 250);\nSELECT * FROM courses;", note: L('Два курси одним запитом.', 'Два курса одним запросом.', 'Two courses in one query.') },
        { title: L('Не всі стовпці', 'Не все столбцы', 'Some columns'), code: "INSERT INTO students (name) VALUES ('Guest');\nSELECT * FROM students WHERE name = 'Guest';", note: L('Решта полів — NULL.', 'Остальные поля — NULL.', 'Other fields are NULL.') }
      ],
      task: {
        text: L('Додай курс <code>Lua Scripting</code> рівня <code>beginner</code> за ціною <code>100</code>. Потім виведи назви й ціни всіх курсів, відсортовані за ціною за зростанням, а за рівної ціни — за назвою.', 'Добавь курс <code>Lua Scripting</code> уровня <code>beginner</code> по цене <code>100</code>. Затем выведи названия и цены всех курсов, отсортированные по цене по возрастанию, а при равной цене — по названию.', 'Add a course <code>Lua Scripting</code>, level <code>beginner</code>, price <code>100</code>. Then show the titles and prices of all courses sorted by price ascending, then by title.'),
        how: [L("<code>INSERT INTO courses (title, level, price) VALUES ('Lua Scripting', 'beginner', 100);</code>", "<code>INSERT INTO courses (title, level, price) VALUES ('Lua Scripting', 'beginner', 100);</code>", "<code>INSERT INTO courses (title, level, price) VALUES ('Lua Scripting', 'beginner', 100);</code>"), L('Потім <code>SELECT … ORDER BY price, title;</code>', 'Затем <code>SELECT … ORDER BY price, title;</code>', 'Then <code>SELECT … ORDER BY price, title;</code>')],
        starter: '',
        solution: "INSERT INTO courses (title, level, price) VALUES ('Lua Scripting', 'beginner', 100);\nSELECT title, price FROM courses ORDER BY price, title;",
        hint: L('Перевіряється останній SELECT — у ньому має бути 6 курсів.', 'Проверяется последний SELECT — в нём должно быть 6 курсов.', 'The final SELECT is checked — it should list 6 courses.'),
        must: /INSERT\s+INTO/i
      },
      quiz: { q: L('Що станеться зі стовпцем, якого немає в списку INSERT?', 'Что произойдёт со столбцом, которого нет в списке INSERT?', 'What happens to a column not listed in an INSERT?'), options: [L('помилка', 'ошибка', 'an error'), L('NULL або значення за замовчуванням', 'NULL или значение по умолчанию', 'NULL or its default'), L('0', '0', '0')], answer: 1, explain: L('Якщо немає обмеження NOT NULL.', 'Если нет ограничения NOT NULL.', 'Unless it’s NOT NULL.') },
      ref: [{ code: 'INSERT INTO t (a, b) VALUES (1, 2);', d: L('додати рядок', 'добавить строку', 'add a row') }]
    },
    {
      id: 'update-delete', chapter: CH4,
      title: L('UPDATE і DELETE', 'UPDATE и DELETE', 'UPDATE and DELETE'),
      theory: L(
        `<p><code>UPDATE</code> змінює існуючі рядки:</p>
<pre class="inline-code">UPDATE students SET score = score + 5 WHERE city = 'Odesa';</pre>
<p><code>DELETE</code> видаляє рядки:</p>
<pre class="inline-code">DELETE FROM enrollments WHERE progress < 20;</pre>
<div class="warn-box">⚠️ <b>Найнебезпечніша помилка в SQL</b> — забути <code>WHERE</code>. <code>UPDATE students SET score = 0;</code> обнулить <b>усіх</b>, а <code>DELETE FROM students;</code> видалить усю таблицю. Перед змінами завжди перевіряй умову звичайним <code>SELECT … WHERE …</code>.</div>
<p>Можна змінювати кілька стовпців: <code>SET age = 15, city = 'Lviv'</code>.</p>`,
        `<p><code>UPDATE</code> изменяет существующие строки:</p>
<pre class="inline-code">UPDATE students SET score = score + 5 WHERE city = 'Odesa';</pre>
<p><code>DELETE</code> удаляет строки:</p>
<pre class="inline-code">DELETE FROM enrollments WHERE progress < 20;</pre>
<div class="warn-box">⚠️ <b>Самая опасная ошибка в SQL</b> — забыть <code>WHERE</code>. <code>UPDATE students SET score = 0;</code> обнулит <b>всех</b>, а <code>DELETE FROM students;</code> удалит всю таблицу. Перед изменениями всегда проверяй условие обычным <code>SELECT … WHERE …</code>.</div>
<p>Можно менять несколько столбцов: <code>SET age = 15, city = 'Lviv'</code>.</p>`,
        `<p><code>UPDATE</code> changes existing rows:</p>
<pre class="inline-code">UPDATE students SET score = score + 5 WHERE city = 'Odesa';</pre>
<p><code>DELETE</code> removes rows:</p>
<pre class="inline-code">DELETE FROM enrollments WHERE progress < 20;</pre>
<div class="warn-box">⚠️ <b>The most dangerous SQL mistake</b> is forgetting <code>WHERE</code>. <code>UPDATE students SET score = 0;</code> zeroes <b>everyone</b>, and <code>DELETE FROM students;</code> wipes the table. Always test the condition with a plain <code>SELECT … WHERE …</code> first.</div>
<p>You can set several columns: <code>SET age = 15, city = 'Lviv'</code>.</p>`),
      why: L(`<p>Зміна пароля, редагування профілю, видалення коментаря — це UPDATE і DELETE. Через небезпеку масових змін у реальних системах такі запити обгортають у <b>транзакції</b> (<code>BEGIN … COMMIT</code> / <code>ROLLBACK</code>), щоб помилку можна було скасувати.</p>`,
        `<p>Смена пароля, редактирование профиля, удаление комментария — это UPDATE и DELETE. Из-за опасности массовых изменений в реальных системах такие запросы оборачивают в <b>транзакции</b> (<code>BEGIN … COMMIT</code> / <code>ROLLBACK</code>), чтобы ошибку можно было отменить.</p>`,
        `<p>Password changes, profile edits, deleting a comment — that’s UPDATE and DELETE. Because mass changes are dangerous, real systems wrap them in <b>transactions</b> (<code>BEGIN … COMMIT</code> / <code>ROLLBACK</code>) so mistakes can be undone.</p>`),
      mistakes: L(`<ul><li>Без <code>WHERE</code> — змінюються всі рядки.</li><li>Видалити учня, але залишити його записи в <code>enrollments</code> — «сироти». Видаляй пов’язані дані або використовуй <code>ON DELETE CASCADE</code>.</li></ul>`,
        `<ul><li>Без <code>WHERE</code> — изменяются все строки.</li><li>Удалить ученика, но оставить его записи в <code>enrollments</code> — «сироты». Удаляй связанные данные или используй <code>ON DELETE CASCADE</code>.</li></ul>`,
        `<ul><li>No <code>WHERE</code> — every row changes.</li><li>Deleting a student but leaving their <code>enrollments</code> — “orphans”. Delete related data or use <code>ON DELETE CASCADE</code>.</li></ul>`),
      examples: [
        { title: 'UPDATE', code: "UPDATE students SET score = score + 5 WHERE city = 'Odesa';\nSELECT name, city, score FROM students WHERE city = 'Odesa';", note: L('Бонус учням з Одеси.', 'Бонус ученикам из Одессы.', 'A bonus for students from Odesa.') },
        { title: L('Кілька стовпців', 'Несколько столбцов', 'Several columns'), code: "UPDATE students SET city = 'Kyiv', age = 15 WHERE name = 'Liza';\nSELECT * FROM students WHERE name = 'Liza';", note: L('Заповнили відсутнє місто.', 'Заполнили отсутствующий город.', 'Filled in the missing city.') },
        { title: 'DELETE', code: 'SELECT COUNT(*) FROM enrollments WHERE progress < 30;\nDELETE FROM enrollments WHERE progress < 30;\nSELECT COUNT(*) FROM enrollments;', note: L('Спершу перевір, скільки рядків зачепиш.', 'Сначала проверь, сколько строк затронешь.', 'Check how many rows you’ll hit first.') },
        { title: L('Транзакція', 'Транзакция', 'Transaction'), code: 'BEGIN;\nDELETE FROM students;\nSELECT COUNT(*) AS left FROM students;\nROLLBACK;\nSELECT COUNT(*) AS restored FROM students;', note: L('ROLLBACK скасував видалення.', 'ROLLBACK отменил удаление.', 'ROLLBACK undid the delete.') }
      ],
      task: {
        text: L('Учні з Києва отримують +3 бали. Курс з <code>id = 2</code> подорожчав до <code>50</code>. Видали записи на курси з прогресом менше <code>15</code>. Наприкінці виведи <code>name</code> і <code>score</code> учнів з Києва, відсортованих за ім’ям.', 'Ученики из Киева получают +3 балла. Курс с <code>id = 2</code> подорожал до <code>50</code>. Удали записи на курсы с прогрессом меньше <code>15</code>. В конце выведи <code>name</code> и <code>score</code> учеников из Киева, отсортированных по имени.', 'Students from Kyiv get +3 points. The course with <code>id = 2</code> now costs <code>50</code>. Delete enrollments with progress under <code>15</code>. Finally show the <code>name</code> and <code>score</code> of Kyiv students sorted by name.'),
        how: [L("<code>UPDATE students SET score = score + 3 WHERE city = 'Kyiv';</code>", "<code>UPDATE students SET score = score + 3 WHERE city = 'Kyiv';</code>", "<code>UPDATE students SET score = score + 3 WHERE city = 'Kyiv';</code>"), L('<code>UPDATE courses SET price = 50 WHERE id = 2;</code>', '<code>UPDATE courses SET price = 50 WHERE id = 2;</code>', '<code>UPDATE courses SET price = 50 WHERE id = 2;</code>'), L('<code>DELETE FROM enrollments WHERE progress &lt; 15;</code> і фінальний SELECT.', '<code>DELETE FROM enrollments WHERE progress &lt; 15;</code> и финальный SELECT.', '<code>DELETE FROM enrollments WHERE progress &lt; 15;</code> and the final SELECT.')],
        starter: '',
        solution: "UPDATE students SET score = score + 3 WHERE city = 'Kyiv';\nUPDATE courses SET price = 50 WHERE id = 2;\nDELETE FROM enrollments WHERE progress < 15;\nSELECT name, score FROM students WHERE city = 'Kyiv' ORDER BY name;",
        hint: L('Anna стане 90.', 'Anna станет 90.', 'Anna becomes 90.'),
        check: function (res, code) {
          if (!/UPDATE\s+courses/i.test(code) || !/DELETE\s+FROM\s+enrollments/i.test(code)) return false;
          const last = res.results[res.results.length - 1];
          return !!last && JSON.stringify(last.values) === JSON.stringify([['Anna', 90], ['Kate', 98], ['Taras', 86]]);
        }
      },
      quiz: { q: L('Що зробить <code>DELETE FROM students;</code>?', 'Что сделает <code>DELETE FROM students;</code>?', 'What does <code>DELETE FROM students;</code> do?'), options: [L('нічого без WHERE', 'ничего без WHERE', 'nothing without WHERE'), L('видалить усі рядки', 'удалит все строки', 'delete every row'), L('видалить таблицю', 'удалит таблицу', 'drop the table')], answer: 1, explain: L('Без WHERE — усі рядки (сама таблиця залишиться порожньою).', 'Без WHERE — все строки (сама таблица останется пустой).', 'Without WHERE, all rows (the empty table remains).') },
      ref: [{ code: 'UPDATE t SET a = 1 WHERE …', d: L('змінити', 'изменить', 'update') }, { code: 'DELETE FROM t WHERE …', d: L('видалити', 'удалить', 'delete') }, { code: 'BEGIN / COMMIT / ROLLBACK', d: L('транзакції', 'транзакции', 'transactions') }]
    },
    {
      id: 'create', chapter: CH4,
      title: L('CREATE TABLE і обмеження', 'CREATE TABLE и ограничения', 'CREATE TABLE and constraints'),
      db: '',
      theory: L(
        `<p>Таблицю створюють командою <code>CREATE TABLE</code>, описуючи стовпці та їхні типи:</p>
<pre class="inline-code">CREATE TABLE pets (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  kind TEXT DEFAULT 'cat',
  age INTEGER CHECK (age >= 0),
  chip TEXT UNIQUE
);</pre>
<p>Типи SQLite: <code>INTEGER</code>, <code>REAL</code> (дробові), <code>TEXT</code>, <code>BLOB</code>. <b>Обмеження</b> захищають дані:</p>
<ul><li><code>PRIMARY KEY</code> — унікальний ідентифікатор рядка</li><li><code>NOT NULL</code> — обов’язкове значення</li><li><code>UNIQUE</code> — без повторів</li><li><code>DEFAULT</code> — значення за замовчуванням</li><li><code>CHECK (умова)</code> — довільна перевірка</li><li><code>REFERENCES other(id)</code> — зовнішній ключ (зв’язок з іншою таблицею)</li></ul>
<p><code>DROP TABLE name</code> — видалити таблицю, <code>ALTER TABLE … ADD COLUMN …</code> — додати стовпець.</p>`,
        `<p>Таблицу создают командой <code>CREATE TABLE</code>, описывая столбцы и их типы:</p>
<pre class="inline-code">CREATE TABLE pets (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  kind TEXT DEFAULT 'cat',
  age INTEGER CHECK (age >= 0),
  chip TEXT UNIQUE
);</pre>
<p>Типы SQLite: <code>INTEGER</code>, <code>REAL</code> (дробные), <code>TEXT</code>, <code>BLOB</code>. <b>Ограничения</b> защищают данные:</p>
<ul><li><code>PRIMARY KEY</code> — уникальный идентификатор строки</li><li><code>NOT NULL</code> — обязательное значение</li><li><code>UNIQUE</code> — без повторов</li><li><code>DEFAULT</code> — значение по умолчанию</li><li><code>CHECK (условие)</code> — произвольная проверка</li><li><code>REFERENCES other(id)</code> — внешний ключ (связь с другой таблицей)</li></ul>
<p><code>DROP TABLE name</code> — удалить таблицу, <code>ALTER TABLE … ADD COLUMN …</code> — добавить столбец.</p>`,
        `<p>Create a table with <code>CREATE TABLE</code>, describing columns and their types:</p>
<pre class="inline-code">CREATE TABLE pets (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  kind TEXT DEFAULT 'cat',
  age INTEGER CHECK (age >= 0),
  chip TEXT UNIQUE
);</pre>
<p>SQLite types: <code>INTEGER</code>, <code>REAL</code> (decimals), <code>TEXT</code>, <code>BLOB</code>. <b>Constraints</b> protect data:</p>
<ul><li><code>PRIMARY KEY</code> — a unique row identifier</li><li><code>NOT NULL</code> — a required value</li><li><code>UNIQUE</code> — no duplicates</li><li><code>DEFAULT</code> — a default value</li><li><code>CHECK (condition)</code> — a custom check</li><li><code>REFERENCES other(id)</code> — a foreign key (a link to another table)</li></ul>
<p><code>DROP TABLE name</code> deletes a table, <code>ALTER TABLE … ADD COLUMN …</code> adds a column.</p>`),
      why: L(`<p>Обмеження — це правила, які база виконує <b>сама</b>, навіть якщо в програмі помилка: не дасть зберегти користувача без email, від’ємну ціну чи два однакові логіни. Добре спроєктована таблиця — половина надійності застосунку.</p>`,
        `<p>Ограничения — это правила, которые база выполняет <b>сама</b>, даже если в программе ошибка: не даст сохранить пользователя без email, отрицательную цену или два одинаковых логина. Хорошо спроектированная таблица — половина надёжности приложения.</p>`,
        `<p>Constraints are rules the database enforces <b>itself</b>, even when the program has a bug: no users without email, no negative prices, no duplicate logins. A well-designed table is half of an app’s reliability.</p>`),
      mistakes: L(`<ul><li>Кома після останнього стовпця в <code>CREATE TABLE</code> → помилка.</li><li>Зберігати ціну як <code>TEXT</code> — потім не порахуєш суму правильно.</li></ul>`,
        `<ul><li>Запятая после последнего столбца в <code>CREATE TABLE</code> → ошибка.</li><li>Хранить цену как <code>TEXT</code> — потом не посчитаешь сумму правильно.</li></ul>`,
        `<ul><li>A comma after the last column in <code>CREATE TABLE</code> → error.</li><li>Storing a price as <code>TEXT</code> — sums won’t work properly later.</li></ul>`),
      examples: [
        { title: L('Створення', 'Создание', 'Creating'), code: "CREATE TABLE pets (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  kind TEXT DEFAULT 'cat',\n  age INTEGER CHECK (age >= 0)\n);\nINSERT INTO pets (name, age) VALUES ('Murka', 3);\nINSERT INTO pets (name, kind, age) VALUES ('Rex', 'dog', 5);\nSELECT * FROM pets;", note: L('DEFAULT підставив cat.', 'DEFAULT подставил cat.', 'DEFAULT filled in cat.') },
        { title: L('Обмеження спрацювало', 'Ограничение сработало', 'A constraint fires'), code: "CREATE TABLE users (id INTEGER PRIMARY KEY, login TEXT UNIQUE NOT NULL);\nINSERT INTO users (login) VALUES ('ann');\nINSERT INTO users (login) VALUES ('ann');", note: L('Помилка UNIQUE — так і задумано.', 'Ошибка UNIQUE — так и задумано.', 'A UNIQUE error — as intended.') },
        { title: L('Зовнішній ключ', 'Внешний ключ', 'Foreign key'), code: 'CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, author_id INTEGER REFERENCES authors(id));\nINSERT INTO authors VALUES (1, \'Orwell\');\nINSERT INTO books (title, author_id) VALUES (\'1984\', 1), (\'Animal Farm\', 1);\nSELECT b.title, a.name FROM books b JOIN authors a ON a.id = b.author_id;', note: L('Дві пов’язані таблиці.', 'Две связанные таблицы.', 'Two linked tables.') },
        { title: 'ALTER TABLE', code: "CREATE TABLE notes (id INTEGER PRIMARY KEY, text TEXT);\nALTER TABLE notes ADD COLUMN done INTEGER DEFAULT 0;\nINSERT INTO notes (text) VALUES ('Learn SQL');\nSELECT * FROM notes;", note: L('Додали стовпець пізніше.', 'Добавили столбец позже.', 'A column added later.') }
      ],
      task: {
        text: L('Створи таблицю <code>products</code> зі стовпцями: <code>id</code> (INTEGER PRIMARY KEY), <code>name</code> (TEXT NOT NULL), <code>price</code> (REAL, CHECK price &gt; 0), <code>stock</code> (INTEGER DEFAULT 0). Додай товари <code>Pen</code> (15.5, stock 100) і <code>Book</code> (120, stock не вказуй). Виведи <code>name</code>, <code>price</code>, <code>stock</code> усіх товарів.', 'Создай таблицу <code>products</code> со столбцами: <code>id</code> (INTEGER PRIMARY KEY), <code>name</code> (TEXT NOT NULL), <code>price</code> (REAL, CHECK price &gt; 0), <code>stock</code> (INTEGER DEFAULT 0). Добавь товары <code>Pen</code> (15.5, stock 100) и <code>Book</code> (120, stock не указывай). Выведи <code>name</code>, <code>price</code>, <code>stock</code> всех товаров.', 'Create a <code>products</code> table with columns: <code>id</code> (INTEGER PRIMARY KEY), <code>name</code> (TEXT NOT NULL), <code>price</code> (REAL, CHECK price &gt; 0), <code>stock</code> (INTEGER DEFAULT 0). Add <code>Pen</code> (15.5, stock 100) and <code>Book</code> (120, leave stock out). Show <code>name</code>, <code>price</code>, <code>stock</code> of all products.'),
        how: [L('<code>CREATE TABLE products (...);</code>', '<code>CREATE TABLE products (...);</code>', '<code>CREATE TABLE products (...);</code>'), L('Два <code>INSERT</code>: для Book не передавай stock.', 'Два <code>INSERT</code>: для Book не передавай stock.', 'Two <code>INSERT</code>s: omit stock for Book.'), L('Фінальний <code>SELECT name, price, stock FROM products;</code>', 'Финальный <code>SELECT name, price, stock FROM products;</code>', 'A final <code>SELECT name, price, stock FROM products;</code>')],
        starter: '',
        solution: "CREATE TABLE products (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  price REAL CHECK (price > 0),\n  stock INTEGER DEFAULT 0\n);\nINSERT INTO products (name, price, stock) VALUES ('Pen', 15.5, 100);\nINSERT INTO products (name, price) VALUES ('Book', 120);\nSELECT name, price, stock FROM products;",
        hint: L('У Book stock має стати 0 завдяки DEFAULT.', 'У Book stock должен стать 0 благодаря DEFAULT.', 'Book’s stock should be 0 thanks to DEFAULT.'),
        must: /CREATE\s+TABLE[\s\S]*CHECK[\s\S]*DEFAULT/i
      },
      quiz: { q: L('Яке обмеження забороняє однакові значення?', 'Какое ограничение запрещает одинаковые значения?', 'Which constraint forbids duplicate values?'), options: ['NOT NULL', 'UNIQUE', 'DEFAULT'], answer: 1, explain: L('UNIQUE — без повторів.', 'UNIQUE — без повторов.', 'UNIQUE means no duplicates.') },
      ref: [{ code: 'CREATE TABLE t (id INTEGER PRIMARY KEY, …);', d: L('створити таблицю', 'создать таблицу', 'create a table') }, { code: 'NOT NULL UNIQUE DEFAULT CHECK', d: L('обмеження', 'ограничения', 'constraints') }]
    },
    {
      id: 'project-report', chapter: CH5, project: true,
      title: L('Проєкт: аналітичний звіт', 'Проект: аналитический отчёт', 'Project: Analytics report'),
      theory: L(
        `<p>Ти — аналітик платформи Codry. Керівництво хоче звіт по учнях одним запитом.</p>
<h4>Для кожного учня, у якого є хоча б один запис на курс, вивести:</h4>
<ol><li><code>name</code> — ім’я</li><li><code>courses</code> — кількість курсів</li><li><code>avg_progress</code> — середній прогрес, округлений до цілого</li><li><code>completed</code> — кількість завершених курсів (progress = 100)</li><li><code>status</code>: <code>champion</code>, якщо завершено 2+ курси; <code>active</code>, якщо середній прогрес ≥ 50; інакше <code>needs help</code></li></ol>
<p>Відсортуй за <code>completed</code> за спаданням, потім за <code>avg_progress</code> за спаданням, потім за ім’ям.</p>`,
        `<p>Ты — аналитик платформы Codry. Руководство хочет отчёт по ученикам одним запросом.</p>
<h4>Для каждого ученика, у которого есть хотя бы одна запись на курс, вывести:</h4>
<ol><li><code>name</code> — имя</li><li><code>courses</code> — количество курсов</li><li><code>avg_progress</code> — средний прогресс, округлённый до целого</li><li><code>completed</code> — количество завершённых курсов (progress = 100)</li><li><code>status</code>: <code>champion</code>, если завершено 2+ курса; <code>active</code>, если средний прогресс ≥ 50; иначе <code>needs help</code></li></ol>
<p>Отсортируй по <code>completed</code> по убыванию, затем по <code>avg_progress</code> по убыванию, затем по имени.</p>`,
        `<p>You’re an analyst at Codry. Management wants a student report in one query.</p>
<h4>For each student with at least one enrollment, show:</h4>
<ol><li><code>name</code></li><li><code>courses</code> — number of courses</li><li><code>avg_progress</code> — average progress rounded to a whole number</li><li><code>completed</code> — number of completed courses (progress = 100)</li><li><code>status</code>: <code>champion</code> if 2+ completed; <code>active</code> if average progress ≥ 50; otherwise <code>needs help</code></li></ol>
<p>Sort by <code>completed</code> descending, then <code>avg_progress</code> descending, then name.</p>`),
      why: L(`<p>Саме такі запити щодня пишуть аналітики даних: JOIN + GROUP BY + агрегати + CASE + сортування. Результат одразу йде в презентацію чи дашборд. Це реальна робота, за яку платять.</p>`,
        `<p>Именно такие запросы ежедневно пишут аналитики данных: JOIN + GROUP BY + агрегаты + CASE + сортировка. Результат сразу идёт в презентацию или дашборд. Это реальная работа, за которую платят.</p>`,
        `<p>Data analysts write queries like this every day: JOIN + GROUP BY + aggregates + CASE + sorting. The result goes straight into a presentation or dashboard. It’s real, paid work.</p>`),
      mistakes: L(`<ul><li>Використати в CASE псевдонім <code>completed</code> до його визначення — надійніше повторити вираз.</li><li>Округлювати перед порівнянням у CASE — порівнюй точне середнє.</li></ul>`,
        `<ul><li>Использовать в CASE псевдоним <code>completed</code> до его определения — надёжнее повторить выражение.</li><li>Округлять перед сравнением в CASE — сравнивай точное среднее.</li></ul>`,
        `<ul><li>Using the alias <code>completed</code> inside CASE before it exists — repeating the expression is safer.</li><li>Rounding before the CASE comparison — compare the exact average.</li></ul>`),
      examples: [
        { title: L('Каркас', 'Каркас', 'Skeleton'), code: 'SELECT s.name, COUNT(*) AS courses\nFROM enrollments e\nJOIN students s ON s.id = e.student_id\nGROUP BY s.id\nORDER BY courses DESC;', note: L('JOIN + GROUP BY.', 'JOIN + GROUP BY.', 'JOIN + GROUP BY.') },
        { title: L('Завершені', 'Завершённые', 'Completed'), code: 'SELECT student_id, SUM(CASE WHEN progress = 100 THEN 1 ELSE 0 END) AS completed\nFROM enrollments GROUP BY student_id;', note: L('CASE усередині SUM.', 'CASE внутри SUM.', 'CASE inside SUM.') },
        { title: L('Статус', 'Статус', 'Status'), code: "SELECT student_id, AVG(progress) AS avg,\n  CASE WHEN AVG(progress) >= 50 THEN 'active' ELSE 'needs help' END AS status\nFROM enrollments GROUP BY student_id;", note: L('CASE з агрегатом.', 'CASE с агрегатом.', 'CASE with an aggregate.') }
      ],
      task: {
        text: L('Напиши запит-звіт за вимогами з теорії.', 'Напиши запрос-отчёт по требованиям из теории.', 'Write the report query as described in the theory.'),
        how: [L('FROM enrollments + JOIN students, GROUP BY s.id.', 'FROM enrollments + JOIN students, GROUP BY s.id.', 'FROM enrollments + JOIN students, GROUP BY s.id.'), L('<code>SUM(CASE WHEN e.progress = 100 THEN 1 ELSE 0 END)</code> — і в стовпці, і в CASE статусу.', '<code>SUM(CASE WHEN e.progress = 100 THEN 1 ELSE 0 END)</code> — и в столбце, и в CASE статуса.', '<code>SUM(CASE WHEN e.progress = 100 THEN 1 ELSE 0 END)</code> — both in the column and in the status CASE.')],
        starter: '',
        solution: "SELECT s.name,\n  COUNT(*) AS courses,\n  ROUND(AVG(e.progress)) AS avg_progress,\n  SUM(CASE WHEN e.progress = 100 THEN 1 ELSE 0 END) AS completed,\n  CASE\n    WHEN SUM(CASE WHEN e.progress = 100 THEN 1 ELSE 0 END) >= 2 THEN 'champion'\n    WHEN AVG(e.progress) >= 50 THEN 'active'\n    ELSE 'needs help'\n  END AS status\nFROM enrollments e\nJOIN students s ON s.id = e.student_id\nGROUP BY s.id\nORDER BY completed DESC, avg_progress DESC, s.name;",
        hint: L('Першим буде Nazar (champion), останнім — Oleg (needs help).', 'Первым будет Nazar (champion), последним — Oleg (needs help).', 'Nazar comes first (champion), Oleg last (needs help).')
      },
      quiz: { q: L('У якій частині запиту фільтрують за результатом агрегата?', 'В какой части запроса фильтруют по результату агрегата?', 'Which clause filters by an aggregate result?'), options: ['WHERE', 'HAVING', 'FROM'], answer: 1, explain: L('HAVING працює після GROUP BY.', 'HAVING работает после GROUP BY.', 'HAVING works after GROUP BY.') },
      ref: [{ code: 'JOIN + GROUP BY + CASE', d: L('аналітичний звіт', 'аналитический отчёт', 'analytics report') }]
    },
    {
      id: 'project-shop', chapter: CH5, project: true,
      title: L('Проєкт: база даних магазину', 'Проект: база данных магазина', 'Project: Shop database'),
      db: '',
      theory: L(
        `<p>Спроєктуй з нуля базу інтернет-магазину й дай відповідь на бізнес-питання.</p>
<h4>1. Таблиці</h4>
<ul><li><code>customers</code>: <code>id</code>, <code>name</code> (NOT NULL), <code>city</code></li><li><code>orders</code>: <code>id</code>, <code>customer_id</code> (посилання на customers), <code>product</code> (NOT NULL), <code>price</code> (REAL, CHECK &gt; 0), <code>qty</code> (INTEGER DEFAULT 1)</li></ul>
<h4>2. Дані</h4>
<p>Клієнти: <code>(1, 'Ann', 'Kyiv')</code>, <code>(2, 'Bob', 'Lviv')</code>, <code>(3, 'Kate', 'Kyiv')</code>.<br>Замовлення: Ann — Laptop 25000 ×1, Mouse 500 ×2; Bob — Phone 15000 ×1; Kate — замовлень немає.</p>
<h4>3. Запит</h4>
<p>Для <b>кожного</b> клієнта (навіть без замовлень) виведи <code>name</code>, <code>orders</code> (кількість замовлень) і <code>spent</code> (сума <code>price * qty</code>, для клієнтів без замовлень — <code>0</code> через <code>COALESCE</code>). Відсортуй за <code>spent</code> за спаданням.</p>`,
        `<p>Спроектируй с нуля базу интернет-магазина и ответь на бизнес-вопрос.</p>
<h4>1. Таблицы</h4>
<ul><li><code>customers</code>: <code>id</code>, <code>name</code> (NOT NULL), <code>city</code></li><li><code>orders</code>: <code>id</code>, <code>customer_id</code> (ссылка на customers), <code>product</code> (NOT NULL), <code>price</code> (REAL, CHECK &gt; 0), <code>qty</code> (INTEGER DEFAULT 1)</li></ul>
<h4>2. Данные</h4>
<p>Клиенты: <code>(1, 'Ann', 'Kyiv')</code>, <code>(2, 'Bob', 'Lviv')</code>, <code>(3, 'Kate', 'Kyiv')</code>.<br>Заказы: Ann — Laptop 25000 ×1, Mouse 500 ×2; Bob — Phone 15000 ×1; Kate — заказов нет.</p>
<h4>3. Запрос</h4>
<p>Для <b>каждого</b> клиента (даже без заказов) выведи <code>name</code>, <code>orders</code> (количество заказов) и <code>spent</code> (сумма <code>price * qty</code>, для клиентов без заказов — <code>0</code> через <code>COALESCE</code>). Отсортируй по <code>spent</code> по убыванию.</p>`,
        `<p>Design an online shop database from scratch and answer a business question.</p>
<h4>1. Tables</h4>
<ul><li><code>customers</code>: <code>id</code>, <code>name</code> (NOT NULL), <code>city</code></li><li><code>orders</code>: <code>id</code>, <code>customer_id</code> (references customers), <code>product</code> (NOT NULL), <code>price</code> (REAL, CHECK &gt; 0), <code>qty</code> (INTEGER DEFAULT 1)</li></ul>
<h4>2. Data</h4>
<p>Customers: <code>(1, 'Ann', 'Kyiv')</code>, <code>(2, 'Bob', 'Lviv')</code>, <code>(3, 'Kate', 'Kyiv')</code>.<br>Orders: Ann — Laptop 25000 ×1, Mouse 500 ×2; Bob — Phone 15000 ×1; Kate — no orders.</p>
<h4>3. Query</h4>
<p>For <b>every</b> customer (even without orders) show <code>name</code>, <code>orders</code> (number of orders) and <code>spent</code> (the sum of <code>price * qty</code>, <code>0</code> for customers without orders via <code>COALESCE</code>). Sort by <code>spent</code> descending.</p>`),
      why: L(`<p>Це повний цикл роботи бекенд-розробника з даними: спроєктувати схему, заповнити її та отримати бізнес-відповідь. LEFT JOIN + COALESCE — класичний прийом, щоб «нульові» клієнти не зникали зі звіту.</p>`,
        `<p>Это полный цикл работы бэкенд-разработчика с данными: спроектировать схему, заполнить её и получить бизнес-ответ. LEFT JOIN + COALESCE — классический приём, чтобы «нулевые» клиенты не исчезали из отчёта.</p>`,
        `<p>This is the full backend data workflow: design a schema, fill it and get a business answer. LEFT JOIN + COALESCE is the classic trick to keep zero-order customers in the report.</p>`),
      mistakes: L(`<ul><li>INNER JOIN — Kate зникне.</li><li><code>SUM</code> для Kate дасть NULL — тому <code>COALESCE(…, 0)</code>.</li></ul>`,
        `<ul><li>INNER JOIN — Kate исчезнет.</li><li><code>SUM</code> для Kate даст NULL — поэтому <code>COALESCE(…, 0)</code>.</li></ul>`,
        `<ul><li>INNER JOIN — Kate disappears.</li><li><code>SUM</code> is NULL for Kate — hence <code>COALESCE(…, 0)</code>.</li></ul>`),
      examples: [
        { title: L('Схема', 'Схема', 'Schema'), code: 'CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT);\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  customer_id INTEGER REFERENCES customers(id),\n  product TEXT NOT NULL,\n  price REAL CHECK (price > 0),\n  qty INTEGER DEFAULT 1\n);\nSELECT name FROM sqlite_master WHERE type = \'table\';', note: L('Дві пов’язані таблиці.', 'Две связанные таблицы.', 'Two linked tables.') },
        { title: 'COALESCE + SUM', code: 'CREATE TABLE t (x INTEGER);\nSELECT SUM(x) AS raw, COALESCE(SUM(x), 0) AS fixed FROM t;', note: L('SUM порожнього набору — NULL.', 'SUM пустого набора — NULL.', 'SUM of nothing is NULL.') },
        { title: L('Сума рядка', 'Сумма строки', 'Line total'), code: "CREATE TABLE o (product TEXT, price REAL, qty INTEGER);\nINSERT INTO o VALUES ('Mouse', 500, 2), ('Pad', 199.5, 3);\nSELECT product, price * qty AS total FROM o;", note: L('Обчислення у SELECT.', 'Вычисление в SELECT.', 'A calculation in SELECT.') }
      ],
      task: {
        text: L('Виконай усі три частини проєкту з теорії одним скриптом. Перевіряється результат фінального <code>SELECT</code>.', 'Выполни все три части проекта из теории одним скриптом. Проверяется результат финального <code>SELECT</code>.', 'Do all three parts of the project in one script. The final <code>SELECT</code> result is checked.'),
        how: [L('Два <code>CREATE TABLE</code>.', 'Два <code>CREATE TABLE</code>.', 'Two <code>CREATE TABLE</code>s.'), L('<code>INSERT</code> клієнтів і замовлень (для Phone qty можна не вказувати).', '<code>INSERT</code> клиентов и заказов (для Phone qty можно не указывать).', '<code>INSERT</code> customers and orders (qty can be omitted for Phone).'), L('<code>LEFT JOIN</code>, <code>COUNT(o.id)</code>, <code>COALESCE(SUM(o.price * o.qty), 0)</code>.', '<code>LEFT JOIN</code>, <code>COUNT(o.id)</code>, <code>COALESCE(SUM(o.price * o.qty), 0)</code>.', '<code>LEFT JOIN</code>, <code>COUNT(o.id)</code>, <code>COALESCE(SUM(o.price * o.qty), 0)</code>.')],
        starter: '',
        solution: "CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, city TEXT);\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  customer_id INTEGER REFERENCES customers(id),\n  product TEXT NOT NULL,\n  price REAL CHECK (price > 0),\n  qty INTEGER DEFAULT 1\n);\nINSERT INTO customers VALUES (1, 'Ann', 'Kyiv'), (2, 'Bob', 'Lviv'), (3, 'Kate', 'Kyiv');\nINSERT INTO orders (customer_id, product, price, qty) VALUES (1, 'Laptop', 25000, 1), (1, 'Mouse', 500, 2);\nINSERT INTO orders (customer_id, product, price) VALUES (2, 'Phone', 15000);\nSELECT c.name, COUNT(o.id) AS orders, COALESCE(SUM(o.price * o.qty), 0) AS spent\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nGROUP BY c.id\nORDER BY spent DESC;",
        hint: L('Очікувано: Ann 2 26000, Bob 1 15000, Kate 0 0.', 'Ожидается: Ann 2 26000, Bob 1 15000, Kate 0 0.', 'Expected: Ann 2 26000, Bob 1 15000, Kate 0 0.'),
        must: /CREATE\s+TABLE[\s\S]*CREATE\s+TABLE[\s\S]*LEFT\s+JOIN/i
      },
      quiz: { q: L('Навіщо тут <code>COALESCE</code>?', 'Зачем здесь <code>COALESCE</code>?', 'Why use <code>COALESCE</code> here?'), options: [L('щоб прибрати дублікати', 'чтобы убрать дубликаты', 'to remove duplicates'), L('щоб замість NULL показати 0', 'чтобы вместо NULL показать 0', 'to show 0 instead of NULL'), L('для сортування', 'для сортировки', 'for sorting')], answer: 1, explain: L('Сума без замовлень — NULL.', 'Сумма без заказов — NULL.', 'A sum with no orders is NULL.') },
      ref: [{ code: 'COALESCE(SUM(x), 0)', d: L('нуль замість NULL', 'ноль вместо NULL', 'zero instead of NULL') }]
    }
  ]);
})();
