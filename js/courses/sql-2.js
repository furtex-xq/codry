// SQL — частина 2: рядкові функції, дати, WITH, UNION/INTERSECT/EXCEPT, віконні функції, VIEW та INDEX, транзакції, проєкт «Кінотеатр».
(function () {
  const C = window.Codry, L = C.L;
  const CH6 = L('Глибше в SQL', 'Глубже в SQL', 'Deeper into SQL');
  const CH5 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');

  const EVENTS = `CREATE TABLE events (id INTEGER PRIMARY KEY, title TEXT, starts TEXT, ends TEXT, seats INTEGER);
INSERT INTO events VALUES
(1,'Python Hackathon','2026-01-17','2026-01-18',40),(2,'Roblox Jam','2026-02-07','2026-02-09',60),(3,'Web Day','2026-02-21','2026-02-21',80),
(4,'Math Olympiad','2026-03-14','2026-03-14',120),(5,'Game Dev Camp','2026-03-23','2026-03-29',30),(6,'SQL Quest','2026-04-04','2026-04-05',50),
(7,'Robotics Cup','2026-05-16','2026-05-17',70),(8,'Summer Code','2026-06-01','2026-06-12',25);`;

  const CINEMA = `CREATE TABLE movies (id INTEGER PRIMARY KEY, title TEXT, genre TEXT, minutes INTEGER, age_limit INTEGER);
INSERT INTO movies VALUES
(1,'Robot Friends','animation',95,0),(2,'Space Pirates','adventure',118,12),(3,'The Last Bug','comedy',101,6),
(4,'Dragon Code','fantasy',126,12),(5,'Ocean Secrets','documentary',88,0),(6,'Night Server','thriller',112,16);
CREATE TABLE halls (id INTEGER PRIMARY KEY, name TEXT, seats INTEGER);
INSERT INTO halls VALUES (1,'Red',60),(2,'Blue',40),(3,'IMAX',120);
CREATE TABLE sessions (id INTEGER PRIMARY KEY, movie_id INTEGER, hall_id INTEGER, day TEXT, time TEXT, price INTEGER);
INSERT INTO sessions VALUES
(1,1,1,'2026-11-07','10:00',120),(2,1,2,'2026-11-07','13:00',120),(3,2,3,'2026-11-07','18:00',220),(4,3,1,'2026-11-07','16:00',150),
(5,4,3,'2026-11-08','12:00',200),(6,4,3,'2026-11-08','19:30',240),(7,5,2,'2026-11-08','11:00',100),(8,6,1,'2026-11-08','21:00',180),
(9,2,1,'2026-11-08','15:00',180),(10,3,2,'2026-11-08','17:00',150);
CREATE TABLE tickets (id INTEGER PRIMARY KEY, session_id INTEGER, seat INTEGER);
INSERT INTO tickets (session_id, seat) VALUES
(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20),(1,21),(1,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,33),(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,44),(1,45),
(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8),(2,9),(2,10),
(3,1),(3,2),(3,3),(3,4),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(3,17),(3,18),(3,19),(3,20),(3,21),(3,22),(3,23),(3,24),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30),(3,31),(3,32),(3,33),(3,34),(3,35),(3,36),(3,37),(3,38),(3,39),(3,40),(3,41),(3,42),(3,43),(3,44),(3,45),(3,46),(3,47),(3,48),(3,49),(3,50),(3,51),(3,52),(3,53),(3,54),(3,55),(3,56),(3,57),(3,58),(3,59),(3,60),(3,61),(3,62),(3,63),(3,64),(3,65),(3,66),(3,67),(3,68),(3,69),(3,70),(3,71),(3,72),(3,73),(3,74),(3,75),(3,76),(3,77),(3,78),(3,79),(3,80),(3,81),(3,82),(3,83),(3,84),(3,85),(3,86),(3,87),(3,88),(3,89),(3,90),
(4,1),(4,2),(4,3),(4,4),(4,5),(4,6),(4,7),(4,8),(4,9),(4,10),(4,11),(4,12),(4,13),(4,14),(4,15),(4,16),(4,17),(4,18),(4,19),(4,20),
(5,1),(5,2),(5,3),(5,4),(5,5),(5,6),(5,7),(5,8),(5,9),(5,10),(5,11),(5,12),(5,13),(5,14),(5,15),(5,16),(5,17),(5,18),(5,19),(5,20),(5,21),(5,22),(5,23),(5,24),(5,25),(5,26),(5,27),(5,28),(5,29),(5,30),(5,31),(5,32),(5,33),(5,34),(5,35),(5,36),(5,37),(5,38),(5,39),(5,40),(5,41),(5,42),(5,43),(5,44),(5,45),(5,46),(5,47),(5,48),(5,49),(5,50),(5,51),(5,52),(5,53),(5,54),(5,55),(5,56),(5,57),(5,58),(5,59),(5,60),
(6,1),(6,2),(6,3),(6,4),(6,5),(6,6),(6,7),(6,8),(6,9),(6,10),(6,11),(6,12),(6,13),(6,14),(6,15),(6,16),(6,17),(6,18),(6,19),(6,20),(6,21),(6,22),(6,23),(6,24),(6,25),(6,26),(6,27),(6,28),(6,29),(6,30),(6,31),(6,32),(6,33),(6,34),(6,35),(6,36),(6,37),(6,38),(6,39),(6,40),(6,41),(6,42),(6,43),(6,44),(6,45),(6,46),(6,47),(6,48),(6,49),(6,50),(6,51),(6,52),(6,53),(6,54),(6,55),(6,56),(6,57),(6,58),(6,59),(6,60),(6,61),(6,62),(6,63),(6,64),(6,65),(6,66),(6,67),(6,68),(6,69),(6,70),(6,71),(6,72),(6,73),(6,74),(6,75),(6,76),(6,77),(6,78),(6,79),(6,80),(6,81),(6,82),(6,83),(6,84),(6,85),(6,86),(6,87),(6,88),(6,89),(6,90),(6,91),(6,92),(6,93),(6,94),(6,95),(6,96),(6,97),(6,98),(6,99),(6,100),(6,101),(6,102),(6,103),(6,104),(6,105),(6,106),(6,107),(6,108),(6,109),(6,110),
(7,1),(7,2),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8),
(8,1),(8,2),(8,3),(8,4),(8,5),(8,6),(8,7),(8,8),(8,9),(8,10),(8,11),(8,12),(8,13),(8,14),(8,15),(8,16),(8,17),(8,18),(8,19),(8,20),(8,21),(8,22),(8,23),(8,24),(8,25),(8,26),(8,27),(8,28),(8,29),(8,30),(8,31),(8,32),(8,33),(8,34),(8,35),
(9,1),(9,2),(9,3),(9,4),(9,5),(9,6),(9,7),(9,8),(9,9),(9,10),(9,11),(9,12),(9,13),(9,14),(9,15),(9,16),(9,17),(9,18),(9,19),(9,20),(9,21),(9,22),(9,23),(9,24),(9,25),(9,26),(9,27),(9,28),(9,29),(9,30),(9,31),(9,32),(9,33),(9,34),(9,35),(9,36),(9,37),(9,38),(9,39),(9,40),(9,41),(9,42),(9,43),(9,44),(9,45),(9,46),(9,47),(9,48),(9,49),(9,50),(9,51),(9,52),(9,53),(9,54),(9,55),
(10,1),(10,2),(10,3),(10,4),(10,5),(10,6),(10,7),(10,8),(10,9),(10,10),(10,11),(10,12),(10,13),(10,14),(10,15),(10,16),(10,17),(10,18),(10,19),(10,20),(10,21),(10,22),(10,23),(10,24),(10,25),(10,26),(10,27),(10,28),(10,29),(10,30);`;

  C.steps('sql', [
    {
      id: 'string-funcs', chapter: CH6,
      title: L('Функції рядків і COALESCE', 'Функции строк и COALESCE', 'String functions and COALESCE'),
      theory: L(
        `<p>SQL уміє обробляти текст прямо в запиті:</p>
<table class="mini"><tr><td><code>UPPER(x)</code>, <code>LOWER(x)</code></td><td>великі / малі літери</td></tr><tr><td><code>LENGTH(x)</code></td><td>довжина рядка</td></tr><tr><td><code>SUBSTR(x, start, n)</code></td><td>шматок рядка (нумерація з 1)</td></tr><tr><td><code>a || b</code></td><td>склеювання рядків</td></tr><tr><td><code>REPLACE(x, 'a', 'b')</code></td><td>заміна</td></tr><tr><td><code>TRIM(x)</code></td><td>прибрати пробіли з країв</td></tr><tr><td><code>INSTR(x, 'a')</code></td><td>позиція підрядка (0 — немає)</td></tr></table>
<p><b>COALESCE(a, b, …)</b> повертає перше значення, що не <code>NULL</code>. Так підставляють «запасне» значення: <code>COALESCE(city, 'unknown')</code>. <code>IFNULL(a, b)</code> — те саме для двох аргументів.</p>
<p>Будь-яка дія з <code>NULL</code> дає <code>NULL</code>: <code>'Hi ' || NULL</code> → <code>NULL</code>. Тому COALESCE особливо корисний при склеюванні.</p>`,
        `<p>SQL умеет обрабатывать текст прямо в запросе:</p>
<table class="mini"><tr><td><code>UPPER(x)</code>, <code>LOWER(x)</code></td><td>большие / маленькие буквы</td></tr><tr><td><code>LENGTH(x)</code></td><td>длина строки</td></tr><tr><td><code>SUBSTR(x, start, n)</code></td><td>кусок строки (нумерация с 1)</td></tr><tr><td><code>a || b</code></td><td>склейка строк</td></tr><tr><td><code>REPLACE(x, 'a', 'b')</code></td><td>замена</td></tr><tr><td><code>TRIM(x)</code></td><td>убрать пробелы по краям</td></tr><tr><td><code>INSTR(x, 'a')</code></td><td>позиция подстроки (0 — нет)</td></tr></table>
<p><b>COALESCE(a, b, …)</b> возвращает первое значение, которое не <code>NULL</code>. Так подставляют «запасное» значение: <code>COALESCE(city, 'unknown')</code>. <code>IFNULL(a, b)</code> — то же для двух аргументов.</p>
<p>Любое действие с <code>NULL</code> даёт <code>NULL</code>: <code>'Hi ' || NULL</code> → <code>NULL</code>. Поэтому COALESCE особенно полезен при склейке.</p>`,
        `<p>SQL can process text right inside a query:</p>
<table class="mini"><tr><td><code>UPPER(x)</code>, <code>LOWER(x)</code></td><td>upper / lower case</td></tr><tr><td><code>LENGTH(x)</code></td><td>string length</td></tr><tr><td><code>SUBSTR(x, start, n)</code></td><td>a piece of the string (1-based)</td></tr><tr><td><code>a || b</code></td><td>concatenation</td></tr><tr><td><code>REPLACE(x, 'a', 'b')</code></td><td>replace</td></tr><tr><td><code>TRIM(x)</code></td><td>strip spaces at the ends</td></tr><tr><td><code>INSTR(x, 'a')</code></td><td>substring position (0 = none)</td></tr></table>
<p><b>COALESCE(a, b, …)</b> returns the first non-<code>NULL</code> value — a fallback: <code>COALESCE(city, 'unknown')</code>. <code>IFNULL(a, b)</code> does the same for two arguments.</p>
<p>Anything combined with <code>NULL</code> gives <code>NULL</code>: <code>'Hi ' || NULL</code> → <code>NULL</code>. That’s why COALESCE matters when concatenating.</p>`),
      why: L(`<p>Дані з реального світу «брудні»: зайві пробіли, різний регістр, порожні поля. Почистити й красиво оформити їх прямо в запиті швидше, ніж вивантажувати й правити вручну. А логіни, коди товарів і короткі мітки часто збирають саме через <code>SUBSTR</code> і <code>||</code>.</p>`,
        `<p>Данные из реального мира «грязные»: лишние пробелы, разный регистр, пустые поля. Почистить и красиво оформить их прямо в запросе быстрее, чем выгружать и править вручную. А логины, коды товаров и короткие метки часто собирают именно через <code>SUBSTR</code> и <code>||</code>.</p>`,
        `<p>Real-world data is messy: stray spaces, mixed case, empty fields. Cleaning and formatting it inside the query beats exporting and fixing by hand. Logins, product codes and short labels are often built with <code>SUBSTR</code> and <code>||</code>.</p>`),
      mistakes: L(`<ul><li><code>SUBSTR(name, 0, 3)</code> — у SQLite нумерація з 1, тож вийде лише 2 літери.</li><li><code>+</code> замість <code>||</code>: <code>'a' + 'b'</code> у SQLite дає 0.</li><li>Забути COALESCE — увесь склеєний рядок стає <code>NULL</code>.</li></ul>`,
        `<ul><li><code>SUBSTR(name, 0, 3)</code> — в SQLite нумерация с 1, так что выйдет только 2 буквы.</li><li><code>+</code> вместо <code>||</code>: <code>'a' + 'b'</code> в SQLite даёт 0.</li><li>Забыть COALESCE — вся склеенная строка становится <code>NULL</code>.</li></ul>`,
        `<ul><li><code>SUBSTR(name, 0, 3)</code> — SQLite is 1-based, so you get only 2 letters.</li><li><code>+</code> instead of <code>||</code>: <code>'a' + 'b'</code> is 0 in SQLite.</li><li>Forgetting COALESCE turns the whole concatenation into <code>NULL</code>.</li></ul>`),
      examples: [
        { title: L('Регістр і довжина', 'Регистр и длина', 'Case and length'), code: 'SELECT name, UPPER(name) AS big, LOWER(name) AS small, LENGTH(name) AS len\nFROM students\nORDER BY len DESC, name;', note: L('Сортувати можна й за обчисленим стовпцем.', 'Сортировать можно и по вычисленному столбцу.', 'You can sort by a computed column.') },
        { title: L('Склеювання', 'Склейка', 'Concatenation'), code: "SELECT name || ' (' || age || ')' AS label,\n  'Hi ' || city AS greeting,\n  'Hi ' || COALESCE(city, 'friend') AS safe\nFROM students\nWHERE id IN (1, 9);", note: L('У Liza немає міста — greeting став NULL.', 'У Liza нет города — greeting стал NULL.', 'Liza has no city — greeting became NULL.') },
        { title: 'SUBSTR / REPLACE / INSTR', code: "SELECT title,\n  SUBSTR(title, 1, 4) AS short,\n  REPLACE(title, ' ', '_') AS slug,\n  INSTR(title, 'S') AS s_pos\nFROM courses;", note: L('slug — так роблять адреси сторінок.', 'slug — так делают адреса страниц.', 'A slug is how page URLs are made.') }
      ],
      task: {
        text: L('Для кожного учня виведи <code>name</code>, <code>code</code> — перші 3 літери імені ВЕЛИКИМИ і через дефіс його <code>id</code> (наприклад <code>ANN-1</code>), та <code>city</code>, де замість порожнього міста стоїть <code>unknown</code>. Відсортуй за <code>name</code>.', 'Для каждого ученика выведи <code>name</code>, <code>code</code> — первые 3 буквы имени БОЛЬШИМИ и через дефис его <code>id</code> (например <code>ANN-1</code>), и <code>city</code>, где вместо пустого города стоит <code>unknown</code>. Отсортируй по <code>name</code>.', 'For each student show <code>name</code>, <code>code</code> — the first 3 letters of the name UPPERCASE, a dash and the <code>id</code> (e.g. <code>ANN-1</code>), and <code>city</code> with <code>unknown</code> instead of an empty city. Sort by <code>name</code>.'),
        how: [L('<code>UPPER(SUBSTR(name, 1, 3)) || \'-\' || id AS code</code>', '<code>UPPER(SUBSTR(name, 1, 3)) || \'-\' || id AS code</code>', '<code>UPPER(SUBSTR(name, 1, 3)) || \'-\' || id AS code</code>'), L('<code>COALESCE(city, \'unknown\') AS city</code>', '<code>COALESCE(city, \'unknown\') AS city</code>', '<code>COALESCE(city, \'unknown\') AS city</code>')],
        starter: '',
        solution: "SELECT name, UPPER(SUBSTR(name, 1, 3)) || '-' || id AS code, COALESCE(city, 'unknown') AS city\nFROM students\nORDER BY name;",
        hint: L('У Liza місто — <code>unknown</code>, код — <code>LIZ-9</code>.', 'У Liza город — <code>unknown</code>, код — <code>LIZ-9</code>.', 'Liza’s city is <code>unknown</code>, code <code>LIZ-9</code>.'),
        must: /COALESCE|IFNULL/i
      },
      quiz: { q: L('Що поверне <code>COALESCE(NULL, NULL, \'x\', \'y\')</code>?', 'Что вернёт <code>COALESCE(NULL, NULL, \'x\', \'y\')</code>?', 'What does <code>COALESCE(NULL, NULL, \'x\', \'y\')</code> return?'), options: ['NULL', "'x'", "'y'"], answer: 1, explain: L('Перше значення, що не NULL.', 'Первое значение, которое не NULL.', 'The first non-NULL value.') },
      ref: [{ code: 'UPPER LOWER LENGTH SUBSTR(x, 1, n) REPLACE TRIM INSTR', d: L('рядки', 'строки', 'strings') }, { code: "a || b", d: L('склеювання', 'склейка', 'concat') }, { code: "COALESCE(x, 'default')", d: L('замість NULL', 'вместо NULL', 'instead of NULL') }]
    },
    {
      id: 'dates', chapter: CH6,
      title: L('Дати й час', 'Даты и время', 'Dates and time'),
      db: EVENTS,
      theory: L(
        `<p>SQLite зберігає дати як текст у форматі <b>ISO</b>: <code>'2026-03-14'</code> (рік-місяць-день). Такі рядки правильно сортуються й порівнюються навіть як текст. Функції для роботи з ними:</p>
<table class="mini"><tr><td><code>date('2026-03-14', '+7 days')</code></td><td>зсув дати: <code>'+1 month'</code>, <code>'-1 year'</code></td></tr><tr><td><code>strftime('%m', d)</code></td><td>частина дати: <code>%Y</code> рік, <code>%m</code> місяць, <code>%d</code> день, <code>%w</code> день тижня (0 — неділя)</td></tr><tr><td><code>julianday(b) - julianday(a)</code></td><td>різниця в днях</td></tr><tr><td><code>date('now')</code></td><td>сьогодні</td></tr></table>
<pre class="inline-code">SELECT title, strftime('%m', starts) AS month
FROM events
WHERE starts BETWEEN '2026-02-01' AND '2026-03-31';</pre>
<p>У цьому уроці своя база — таблиця <code>events</code> (заходи школи програмування).</p>`,
        `<p>SQLite хранит даты как текст в формате <b>ISO</b>: <code>'2026-03-14'</code> (год-месяц-день). Такие строки правильно сортируются и сравниваются даже как текст. Функции для работы с ними:</p>
<table class="mini"><tr><td><code>date('2026-03-14', '+7 days')</code></td><td>сдвиг даты: <code>'+1 month'</code>, <code>'-1 year'</code></td></tr><tr><td><code>strftime('%m', d)</code></td><td>часть даты: <code>%Y</code> год, <code>%m</code> месяц, <code>%d</code> день, <code>%w</code> день недели (0 — воскресенье)</td></tr><tr><td><code>julianday(b) - julianday(a)</code></td><td>разница в днях</td></tr><tr><td><code>date('now')</code></td><td>сегодня</td></tr></table>
<pre class="inline-code">SELECT title, strftime('%m', starts) AS month
FROM events
WHERE starts BETWEEN '2026-02-01' AND '2026-03-31';</pre>
<p>В этом уроке своя база — таблица <code>events</code> (мероприятия школы программирования).</p>`,
        `<p>SQLite stores dates as <b>ISO</b> text: <code>'2026-03-14'</code> (year-month-day). Such strings sort and compare correctly even as text. Date functions:</p>
<table class="mini"><tr><td><code>date('2026-03-14', '+7 days')</code></td><td>shift a date: <code>'+1 month'</code>, <code>'-1 year'</code></td></tr><tr><td><code>strftime('%m', d)</code></td><td>part of a date: <code>%Y</code> year, <code>%m</code> month, <code>%d</code> day, <code>%w</code> weekday (0 = Sunday)</td></tr><tr><td><code>julianday(b) - julianday(a)</code></td><td>difference in days</td></tr><tr><td><code>date('now')</code></td><td>today</td></tr></table>
<pre class="inline-code">SELECT title, strftime('%m', starts) AS month
FROM events
WHERE starts BETWEEN '2026-02-01' AND '2026-03-31';</pre>
<p>This lesson has its own database — the <code>events</code> table (coding-school events).</p>`),
      why: L(`<p>Майже кожна таблиця має дати: замовлення, реєстрації, уроки. «Скільки продажів у березні?», «Хто не заходив 30 днів?», «Коли закінчиться підписка?» — усе це дати. Формат ISO обрано не випадково: він сортується правильно навіть як звичайний текст.</p>`,
        `<p>Почти каждая таблица имеет даты: заказы, регистрации, уроки. «Сколько продаж в марте?», «Кто не заходил 30 дней?», «Когда закончится подписка?» — всё это даты. Формат ISO выбран не случайно: он сортируется правильно даже как обычный текст.</p>`,
        `<p>Almost every table has dates: orders, sign-ups, lessons. “How many sales in March?”, “Who hasn’t logged in for 30 days?”, “When does the subscription end?” — all dates. ISO format isn’t random: it sorts correctly even as plain text.</p>`),
      mistakes: L(`<ul><li>Формат <code>'14.03.2026'</code> — функції дат його не розуміють, а сортування буде неправильним.</li><li><code>strftime</code> повертає <b>текст</b> <code>'03'</code>, а не число 3: порівнюй з <code>'03'</code> або обгорни в <code>CAST(… AS INTEGER)</code>.</li><li>Різниця <code>julianday</code> — дробове число; для цілих днів обгорни в <code>CAST</code> чи <code>ROUND</code>.</li></ul>`,
        `<ul><li>Формат <code>'14.03.2026'</code> — функции дат его не понимают, а сортировка будет неправильной.</li><li><code>strftime</code> возвращает <b>текст</b> <code>'03'</code>, а не число 3: сравнивай с <code>'03'</code> или оберни в <code>CAST(… AS INTEGER)</code>.</li><li>Разница <code>julianday</code> — дробное число; для целых дней оберни в <code>CAST</code> или <code>ROUND</code>.</li></ul>`,
        `<ul><li>The format <code>'14.03.2026'</code> — date functions don’t understand it and sorting breaks.</li><li><code>strftime</code> returns <b>text</b> <code>'03'</code>, not the number 3: compare with <code>'03'</code> or wrap in <code>CAST(… AS INTEGER)</code>.</li><li>A <code>julianday</code> difference is fractional; wrap in <code>CAST</code> or <code>ROUND</code> for whole days.</li></ul>`),
      examples: [
        { title: L('Тривалість', 'Длительность', 'Duration'), code: 'SELECT title, starts, ends,\n  CAST(julianday(ends) - julianday(starts) AS INTEGER) + 1 AS days\nFROM events\nORDER BY days DESC;', note: L('+1, бо перший день теж рахується.', '+1, потому что первый день тоже считается.', '+1 because the first day counts too.') },
        { title: L('За місяцями', 'По месяцам', 'By month'), code: "SELECT strftime('%m', starts) AS month, COUNT(*) AS events, SUM(seats) AS seats\nFROM events\nGROUP BY month\nORDER BY month;", note: L('Групування за частиною дати.', 'Группировка по части даты.', 'Grouping by part of a date.') },
        { title: L('Зсув і день тижня', 'Сдвиг и день недели', 'Shift and weekday'), code: "SELECT title, starts,\n  date(starts, '-14 days') AS register_by,\n  strftime('%w', starts) AS weekday\nFROM events\nWHERE starts < '2026-03-01';", note: L('6 — субота: більшість заходів у вихідні.', '6 — суббота: большинство мероприятий в выходные.', '6 is Saturday: most events are on weekends.') }
      ],
      task: {
        text: L('Для заходів, що починаються в <b>лютому або березні 2026</b>, виведи <code>title</code>, <code>days</code> — тривалість у днях (включно з першим і останнім) та <code>reminder</code> — дату за 3 дні до початку. Відсортуй за датою початку.', 'Для мероприятий, которые начинаются в <b>феврале или марте 2026</b>, выведи <code>title</code>, <code>days</code> — длительность в днях (включая первый и последний) и <code>reminder</code> — дату за 3 дня до начала. Отсортируй по дате начала.', 'For events starting in <b>February or March 2026</b>, show <code>title</code>, <code>days</code> — the length in days (counting first and last) and <code>reminder</code> — the date 3 days before the start. Sort by start date.'),
        how: [L("<code>WHERE starts BETWEEN '2026-02-01' AND '2026-03-31'</code>", "<code>WHERE starts BETWEEN '2026-02-01' AND '2026-03-31'</code>", "<code>WHERE starts BETWEEN '2026-02-01' AND '2026-03-31'</code>"), L("<code>date(starts, '-3 days') AS reminder</code>", "<code>date(starts, '-3 days') AS reminder</code>", "<code>date(starts, '-3 days') AS reminder</code>")],
        starter: 'SELECT title, starts, ends FROM events;',
        solution: "SELECT title,\n  CAST(julianday(ends) - julianday(starts) AS INTEGER) + 1 AS days,\n  date(starts, '-3 days') AS reminder\nFROM events\nWHERE starts BETWEEN '2026-02-01' AND '2026-03-31'\nORDER BY starts;",
        hint: L('Має вийти 4 заходи; Game Dev Camp триває 7 днів, нагадування для Roblox Jam — <code>2026-02-04</code>.', 'Должно получиться 4 мероприятия; Game Dev Camp длится 7 дней, напоминание для Roblox Jam — <code>2026-02-04</code>.', 'You should get 4 events; Game Dev Camp lasts 7 days, the Roblox Jam reminder is <code>2026-02-04</code>.'),
        must: /date\s*\(/i
      },
      quiz: { q: L('Чому дати зберігають у форматі <code>РРРР-ММ-ДД</code>?', 'Почему даты хранят в формате <code>ГГГГ-ММ-ДД</code>?', 'Why store dates as <code>YYYY-MM-DD</code>?'), options: [L('так коротше', 'так короче', 'it’s shorter'), L('вони правильно сортуються як текст', 'они правильно сортируются как текст', 'they sort correctly as text'), L('так вимагає закон', 'так требует закон', 'the law says so')], answer: 1, explain: L('Рік → місяць → день: від старшого до молодшого.', 'Год → месяц → день: от старшего к младшему.', 'Year → month → day: biggest to smallest.') },
      ref: [{ code: "date(d, '+7 days')", d: L('зсув дати', 'сдвиг даты', 'shift a date') }, { code: "strftime('%Y-%m', d)", d: L('частина дати', 'часть даты', 'part of a date') }, { code: 'julianday(b) - julianday(a)', d: L('різниця днів', 'разница дней', 'days between') }]
    },
    {
      id: 'with-cte', chapter: CH6,
      title: L('WITH: тимчасові таблиці запиту', 'WITH: временные таблицы запроса', 'WITH: common table expressions'),
      theory: L(
        `<p>Складний запит зручно розбити на кроки за допомогою <b>WITH</b> (CTE — common table expression). Кожен крок отримує ім’я, і далі його використовують як звичайну таблицю:</p>
<pre class="inline-code">WITH stats AS (
  SELECT student_id, AVG(progress) AS avg_p
  FROM enrollments
  GROUP BY student_id
)
SELECT s.name, ROUND(stats.avg_p) AS avg_p
FROM stats
JOIN students s ON s.id = stats.student_id
WHERE stats.avg_p > 70;</pre>
<ul><li>Кілька кроків — через кому: <code>WITH a AS (…), b AS (SELECT … FROM a)</code></li><li>Пізніший крок може використовувати попередні</li><li>CTE існує лише всередині одного запиту</li></ul>
<p>Є й <b>рекурсивний</b> WITH: <code>WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n WHERE x &lt; 5) SELECT x FROM n;</code> — генерує числа 1…5.</p>`,
        `<p>Сложный запрос удобно разбить на шаги с помощью <b>WITH</b> (CTE — common table expression). Каждый шаг получает имя, и дальше его используют как обычную таблицу:</p>
<pre class="inline-code">WITH stats AS (
  SELECT student_id, AVG(progress) AS avg_p
  FROM enrollments
  GROUP BY student_id
)
SELECT s.name, ROUND(stats.avg_p) AS avg_p
FROM stats
JOIN students s ON s.id = stats.student_id
WHERE stats.avg_p > 70;</pre>
<ul><li>Несколько шагов — через запятую: <code>WITH a AS (…), b AS (SELECT … FROM a)</code></li><li>Более поздний шаг может использовать предыдущие</li><li>CTE существует только внутри одного запроса</li></ul>
<p>Есть и <b>рекурсивный</b> WITH: <code>WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n WHERE x &lt; 5) SELECT x FROM n;</code> — генерирует числа 1…5.</p>`,
        `<p>Split a complex query into steps with <b>WITH</b> (a CTE — common table expression). Each step gets a name and is then used like a normal table:</p>
<pre class="inline-code">WITH stats AS (
  SELECT student_id, AVG(progress) AS avg_p
  FROM enrollments
  GROUP BY student_id
)
SELECT s.name, ROUND(stats.avg_p) AS avg_p
FROM stats
JOIN students s ON s.id = stats.student_id
WHERE stats.avg_p > 70;</pre>
<ul><li>Several steps are comma-separated: <code>WITH a AS (…), b AS (SELECT … FROM a)</code></li><li>A later step can use earlier ones</li><li>A CTE exists only inside one query</li></ul>
<p>There is also <b>recursive</b> WITH: <code>WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n WHERE x &lt; 5) SELECT x FROM n;</code> generates 1…5.</p>`),
      why: L(`<p>Вкладені підзапити в три поверхи важко читати й виправляти. WITH перетворює їх на «рецепт» зверху вниз: спочатку порахуй це, потім із цього — оте. Аналітики пишуть так майже всі великі запити, а рекурсивний WITH обходить дерева: категорії товарів, коментарі-відповіді, оргструктуру.</p>`,
        `<p>Вложенные подзапросы в три этажа трудно читать и исправлять. WITH превращает их в «рецепт» сверху вниз: сначала посчитай это, потом из этого — то. Аналитики пишут так почти все большие запросы, а рекурсивный WITH обходит деревья: категории товаров, комментарии-ответы, оргструктуру.</p>`,
        `<p>Three-level nested subqueries are hard to read and fix. WITH turns them into a top-down recipe: compute this, then from it compute that. Analysts write almost every big query this way, and recursive WITH walks trees: product categories, comment threads, org charts.</p>`),
      mistakes: L(`<ul><li>Кома після останнього CTE перед головним SELECT → синтаксична помилка.</li><li>Слово <code>WITH</code> перед кожним кроком — пишеться один раз.</li><li>Рекурсивний WITH без умови зупинки працює вічно.</li></ul>`,
        `<ul><li>Запятая после последнего CTE перед главным SELECT → синтаксическая ошибка.</li><li>Слово <code>WITH</code> перед каждым шагом — пишется один раз.</li><li>Рекурсивный WITH без условия остановки работает вечно.</li></ul>`,
        `<ul><li>A comma after the last CTE before the main SELECT → syntax error.</li><li><code>WITH</code> before every step — write it once.</li><li>Recursive WITH without a stop condition runs forever.</li></ul>`),
      examples: [
        { title: L('Один крок', 'Один шаг', 'One step'), code: 'WITH kyiv AS (\n  SELECT * FROM students WHERE city = \'Kyiv\'\n)\nSELECT name, score FROM kyiv ORDER BY score DESC;', note: L('Як тимчасова таблиця.', 'Как временная таблица.', 'Like a temporary table.') },
        { title: L('Два кроки', 'Два шага', 'Two steps'), code: 'WITH per_course AS (\n  SELECT course_id, COUNT(*) AS n FROM enrollments GROUP BY course_id\n),\npopular AS (\n  SELECT * FROM per_course WHERE n >= 3\n)\nSELECT c.title, p.n\nFROM popular p JOIN courses c ON c.id = p.course_id\nORDER BY p.n DESC, c.title;', note: L('popular будується з per_course.', 'popular строится из per_course.', 'popular is built from per_course.') },
        { title: 'WITH RECURSIVE', code: 'WITH RECURSIVE pow(n, value) AS (\n  SELECT 0, 1\n  UNION ALL\n  SELECT n + 1, value * 2 FROM pow WHERE n < 10\n)\nSELECT n, value FROM pow;', note: L('Степені двійки без жодної таблиці.', 'Степени двойки без всякой таблицы.', 'Powers of two without any table.') }
      ],
      task: {
        text: L('Через <code>WITH</code> порахуй для кожного учня середній прогрес (<code>avg_p</code>), потім знайди загальне середнє цих значень і виведи учнів, у яких <code>avg_p</code> більше за загальне: <code>name</code> і <code>avg_p</code> (округлене до цілого), за спаданням <code>avg_p</code>.', 'Через <code>WITH</code> посчитай для каждого ученика средний прогресс (<code>avg_p</code>), затем найди общее среднее этих значений и выведи учеников, у которых <code>avg_p</code> больше общего: <code>name</code> и <code>avg_p</code> (округлённое до целого), по убыванию <code>avg_p</code>.', 'Using <code>WITH</code>, compute each student’s average progress (<code>avg_p</code>), then the overall average of those values, and show students whose <code>avg_p</code> beats it: <code>name</code> and <code>avg_p</code> (rounded), by <code>avg_p</code> descending.'),
        how: [L('Крок 1: <code>stats AS (SELECT student_id, AVG(progress) AS avg_p FROM enrollments GROUP BY student_id)</code>.', 'Шаг 1: <code>stats AS (SELECT student_id, AVG(progress) AS avg_p FROM enrollments GROUP BY student_id)</code>.', 'Step 1: <code>stats AS (SELECT student_id, AVG(progress) AS avg_p FROM enrollments GROUP BY student_id)</code>.'), L('Умова: <code>WHERE st.avg_p &gt; (SELECT AVG(avg_p) FROM stats)</code>.', 'Условие: <code>WHERE st.avg_p &gt; (SELECT AVG(avg_p) FROM stats)</code>.', 'Condition: <code>WHERE st.avg_p &gt; (SELECT AVG(avg_p) FROM stats)</code>.')],
        starter: 'WITH stats AS (\n  \n)\nSELECT …',
        solution: 'WITH stats AS (\n  SELECT student_id, AVG(progress) AS avg_p\n  FROM enrollments\n  GROUP BY student_id\n)\nSELECT s.name, ROUND(st.avg_p) AS avg_p\nFROM stats st\nJOIN students s ON s.id = st.student_id\nWHERE st.avg_p > (SELECT AVG(avg_p) FROM stats)\nORDER BY st.avg_p DESC, s.name;',
        hint: L('Першою буде Sofia (100), за нею Nazar (97); має вийти 6 учнів.', 'Первой будет Sofia (100), за ней Nazar (97); должно получиться 6 учеников.', 'Sofia comes first (100), then Nazar (97); you should get 6 students.'),
        must: /^\s*WITH\b/i
      },
      quiz: { q: L('Скільки разів пишуть слово WITH, якщо CTE три?', 'Сколько раз пишут слово WITH, если CTE три?', 'How many times do you write WITH for three CTEs?'), options: ['1', '3', '0'], answer: 0, explain: L('WITH a AS (…), b AS (…), c AS (…)', 'WITH a AS (…), b AS (…), c AS (…)', 'WITH a AS (…), b AS (…), c AS (…)') },
      ref: [{ code: 'WITH a AS (SELECT …), b AS (SELECT … FROM a) SELECT …', d: 'CTE' }, { code: 'WITH RECURSIVE t(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM t WHERE x < 10)', d: L('рекурсія', 'рекурсия', 'recursion') }]
    },
    {
      id: 'set-ops', chapter: CH6,
      title: 'UNION, INTERSECT, EXCEPT',
      theory: L(
        `<p>Результати двох запитів можна поєднати як <b>множини</b>:</p>
<table class="mini"><tr><td><code>A UNION B</code></td><td>усі рядки з A і B, без повторів</td></tr><tr><td><code>A UNION ALL B</code></td><td>усі рядки з повторами (швидше)</td></tr><tr><td><code>A INTERSECT B</code></td><td>лише рядки, що є і в A, і в B</td></tr><tr><td><code>A EXCEPT B</code></td><td>рядки з A, яких немає в B</td></tr></table>
<pre class="inline-code">SELECT student_id FROM enrollments WHERE course_id = 1
INTERSECT
SELECT student_id FROM enrollments WHERE course_id = 5;</pre>
<p>Правила: однакова кількість стовпців в обох запитах, назви стовпців беруться з першого, <code>ORDER BY</code> пишуть один раз — у самому кінці.</p>`,
        `<p>Результаты двух запросов можно объединить как <b>множества</b>:</p>
<table class="mini"><tr><td><code>A UNION B</code></td><td>все строки из A и B, без повторов</td></tr><tr><td><code>A UNION ALL B</code></td><td>все строки с повторами (быстрее)</td></tr><tr><td><code>A INTERSECT B</code></td><td>только строки, которые есть и в A, и в B</td></tr><tr><td><code>A EXCEPT B</code></td><td>строки из A, которых нет в B</td></tr></table>
<pre class="inline-code">SELECT student_id FROM enrollments WHERE course_id = 1
INTERSECT
SELECT student_id FROM enrollments WHERE course_id = 5;</pre>
<p>Правила: одинаковое количество столбцов в обоих запросах, названия столбцов берутся из первого, <code>ORDER BY</code> пишут один раз — в самом конце.</p>`,
        `<p>You can combine two query results as <b>sets</b>:</p>
<table class="mini"><tr><td><code>A UNION B</code></td><td>all rows from A and B, no duplicates</td></tr><tr><td><code>A UNION ALL B</code></td><td>all rows with duplicates (faster)</td></tr><tr><td><code>A INTERSECT B</code></td><td>only rows in both A and B</td></tr><tr><td><code>A EXCEPT B</code></td><td>rows in A that aren’t in B</td></tr></table>
<pre class="inline-code">SELECT student_id FROM enrollments WHERE course_id = 1
INTERSECT
SELECT student_id FROM enrollments WHERE course_id = 5;</pre>
<p>Rules: both queries have the same number of columns, column names come from the first, and <code>ORDER BY</code> appears once — at the very end.</p>`),
      why: L(`<p>«Хто купив і A, і B?», «Хто зареєструвався, але жодного разу не заходив?», «Загальний список email з двох таблиць» — ці питання з маркетингу та аналітики найприродніше записуються саме операціями над множинами. Без них довелося б городити складні JOIN-и.</p>`,
        `<p>«Кто купил и A, и B?», «Кто зарегистрировался, но ни разу не заходил?», «Общий список email из двух таблиц» — эти вопросы из маркетинга и аналитики естественнее всего записываются именно операциями над множествами. Без них пришлось бы городить сложные JOIN-ы.</p>`,
        `<p>“Who bought both A and B?”, “Who signed up but never logged in?”, “One email list from two tables” — these marketing and analytics questions are most natural as set operations. Without them you’d build awkward JOINs.</p>`),
      mistakes: L(`<ul><li>Різна кількість стовпців: <code>SELECTs to the left and right of UNION do not have the same number of result columns</code>.</li><li><code>ORDER BY</code> у першій частині — помилка; лише в кінці.</li><li>UNION прибирає дублікати — якщо потрібна кількість, бери UNION ALL.</li></ul>`,
        `<ul><li>Разное количество столбцов: <code>SELECTs to the left and right of UNION do not have the same number of result columns</code>.</li><li><code>ORDER BY</code> в первой части — ошибка; только в конце.</li><li>UNION убирает дубликаты — если нужно количество, бери UNION ALL.</li></ul>`,
        `<ul><li>Different column counts: <code>SELECTs to the left and right of UNION do not have the same number of result columns</code>.</li><li><code>ORDER BY</code> in the first part is an error — only at the end.</li><li>UNION removes duplicates — use UNION ALL when counts matter.</li></ul>`),
      examples: [
        { title: 'UNION', code: "SELECT name AS who, 'student' AS role FROM students WHERE score >= 90\nUNION\nSELECT title, 'course' FROM courses WHERE price = 0\nORDER BY role, who;", note: L('Дві різні таблиці в одному списку.', 'Две разные таблицы в одном списке.', 'Two different tables in one list.') },
        { title: 'INTERSECT', code: 'SELECT s.name FROM students s JOIN enrollments e ON e.student_id = s.id WHERE e.course_id = 1\nINTERSECT\nSELECT s.name FROM students s JOIN enrollments e ON e.student_id = s.id WHERE e.course_id = 5;', note: L('Хто вчить і Python, і SQL.', 'Кто учит и Python, и SQL.', 'Who studies both Python and SQL.') },
        { title: 'EXCEPT', code: 'SELECT id, name FROM students\nEXCEPT\nSELECT s.id, s.name FROM students s JOIN enrollments e ON e.student_id = s.id;', note: L('Учні без жодного курсу.', 'Ученики без единого курса.', 'Students with no course at all.') }
      ],
      task: {
        text: L('Виведи імена (<code>name</code>) учнів, які записані на курс <b>Python Basics</b> (course_id = 1), але <b>не</b> записані на жоден платний курс (price &gt; 0). Використай <code>EXCEPT</code>, відсортуй за іменем.', 'Выведи имена (<code>name</code>) учеников, которые записаны на курс <b>Python Basics</b> (course_id = 1), но <b>не</b> записаны ни на один платный курс (price &gt; 0). Используй <code>EXCEPT</code>, отсортируй по имени.', 'Show the <code>name</code> of students enrolled in <b>Python Basics</b> (course_id = 1) but <b>not</b> in any paid course (price &gt; 0). Use <code>EXCEPT</code> and sort by name.'),
        how: [L('Друга частина: JOIN students + enrollments + courses з умовою <code>c.price &gt; 0</code>.', 'Вторая часть: JOIN students + enrollments + courses с условием <code>c.price &gt; 0</code>.', 'Second part: JOIN students + enrollments + courses with <code>c.price &gt; 0</code>.'), L('<code>ORDER BY name</code> — у самому кінці.', '<code>ORDER BY name</code> — в самом конце.', '<code>ORDER BY name</code> goes at the very end.')],
        starter: '',
        solution: 'SELECT s.name FROM students s JOIN enrollments e ON e.student_id = s.id WHERE e.course_id = 1\nEXCEPT\nSELECT s.name FROM students s\nJOIN enrollments e ON e.student_id = s.id\nJOIN courses c ON c.id = e.course_id\nWHERE c.price > 0\nORDER BY name;',
        hint: L('Має вийти двоє: Anna та Oleg.', 'Должно получиться двое: Anna и Oleg.', 'You should get two: Anna and Oleg.'),
        must: /EXCEPT/i
      },
      quiz: { q: L('Чим UNION ALL відрізняється від UNION?', 'Чем UNION ALL отличается от UNION?', 'How does UNION ALL differ from UNION?'), options: [L('зберігає дублікати', 'сохраняет дубликаты', 'keeps duplicates'), L('сортує результат', 'сортирует результат', 'sorts the result'), L('бере лише спільні рядки', 'берёт только общие строки', 'keeps only shared rows')], answer: 0, explain: L('UNION прибирає повтори, UNION ALL — ні.', 'UNION убирает повторы, UNION ALL — нет.', 'UNION removes duplicates, UNION ALL doesn’t.') },
      ref: [{ code: 'A UNION [ALL] B', d: L('об’єднання', 'объединение', 'union') }, { code: 'A INTERSECT B', d: L('перетин', 'пересечение', 'intersection') }, { code: 'A EXCEPT B', d: L('різниця', 'разность', 'difference') }]
    },
    {
      id: 'window', chapter: CH6,
      title: L('Віконні функції', 'Оконные функции', 'Window functions'),
      theory: L(
        `<p><b>Віконна функція</b> рахує щось «по сусідніх рядках», але, на відміну від GROUP BY, <b>не схлопує</b> рядки — кожен лишається на місці й отримує свій результат:</p>
<pre class="inline-code">SELECT name, city, score,
  RANK() OVER (ORDER BY score DESC) AS place,
  AVG(score) OVER (PARTITION BY city) AS city_avg
FROM students;</pre>
<ul><li><code>OVER (…)</code> — описує «вікно»</li><li><code>PARTITION BY</code> — розбиває на групи (як GROUP BY, але без схлопування)</li><li><code>ORDER BY</code> всередині OVER — порядок у вікні</li></ul>
<table class="mini"><tr><td><code>ROW_NUMBER()</code></td><td>1, 2, 3, 4 — завжди різні</td></tr><tr><td><code>RANK()</code></td><td>1, 2, 2, 4 — рівним однакове місце, далі пропуск</td></tr><tr><td><code>DENSE_RANK()</code></td><td>1, 2, 2, 3 — без пропусків</td></tr><tr><td><code>SUM(x) OVER (ORDER BY …)</code></td><td>накопичувальна сума</td></tr><tr><td><code>LAG(x)</code>, <code>LEAD(x)</code></td><td>значення з попереднього / наступного рядка</td></tr></table>`,
        `<p><b>Оконная функция</b> считает что-то «по соседним строкам», но, в отличие от GROUP BY, <b>не схлопывает</b> строки — каждая остаётся на месте и получает свой результат:</p>
<pre class="inline-code">SELECT name, city, score,
  RANK() OVER (ORDER BY score DESC) AS place,
  AVG(score) OVER (PARTITION BY city) AS city_avg
FROM students;</pre>
<ul><li><code>OVER (…)</code> — описывает «окно»</li><li><code>PARTITION BY</code> — разбивает на группы (как GROUP BY, но без схлопывания)</li><li><code>ORDER BY</code> внутри OVER — порядок в окне</li></ul>
<table class="mini"><tr><td><code>ROW_NUMBER()</code></td><td>1, 2, 3, 4 — всегда разные</td></tr><tr><td><code>RANK()</code></td><td>1, 2, 2, 4 — равным одинаковое место, дальше пропуск</td></tr><tr><td><code>DENSE_RANK()</code></td><td>1, 2, 2, 3 — без пропусков</td></tr><tr><td><code>SUM(x) OVER (ORDER BY …)</code></td><td>накопительная сумма</td></tr><tr><td><code>LAG(x)</code>, <code>LEAD(x)</code></td><td>значение из предыдущей / следующей строки</td></tr></table>`,
        `<p>A <b>window function</b> computes something across neighbouring rows but, unlike GROUP BY, <b>doesn’t collapse</b> them — every row stays and gets its own result:</p>
<pre class="inline-code">SELECT name, city, score,
  RANK() OVER (ORDER BY score DESC) AS place,
  AVG(score) OVER (PARTITION BY city) AS city_avg
FROM students;</pre>
<ul><li><code>OVER (…)</code> describes the “window”</li><li><code>PARTITION BY</code> splits rows into groups (like GROUP BY without collapsing)</li><li><code>ORDER BY</code> inside OVER sets the order in the window</li></ul>
<table class="mini"><tr><td><code>ROW_NUMBER()</code></td><td>1, 2, 3, 4 — always distinct</td></tr><tr><td><code>RANK()</code></td><td>1, 2, 2, 4 — ties share a place, then a gap</td></tr><tr><td><code>DENSE_RANK()</code></td><td>1, 2, 2, 3 — no gaps</td></tr><tr><td><code>SUM(x) OVER (ORDER BY …)</code></td><td>running total</td></tr><tr><td><code>LAG(x)</code>, <code>LEAD(x)</code></td><td>value from the previous / next row</td></tr></table>`),
      why: L(`<p>Таблиці лідерів («ти на 3-му місці у своєму місті»), «топ-3 у кожній категорії», баланс рахунку після кожної операції, «на скільки зросли продажі порівняно з минулим місяцем» — усе це віконні функції. Без них такі звіти потребують складних підзапитів, а з ними — один рядок.</p>`,
        `<p>Таблицы лидеров («ты на 3-м месте в своём городе»), «топ-3 в каждой категории», баланс счёта после каждой операции, «на сколько выросли продажи по сравнению с прошлым месяцем» — всё это оконные функции. Без них такие отчёты требуют сложных подзапросов, а с ними — одна строка.</p>`,
        `<p>Leaderboards (“you’re 3rd in your city”), “top 3 per category”, account balance after each transaction, “how much sales grew vs last month” — all window functions. Without them these reports need complex subqueries; with them, one line.</p>`),
      mistakes: L(`<ul><li>Фільтрувати за віконною функцією в WHERE не можна — WHERE виконується раніше. Обгорни запит у WITH і фільтруй зовні.</li><li>Плутати RANK і ROW_NUMBER: при рівних балах ROW_NUMBER дасть різні місця.</li><li>Забути PARTITION BY — рахується по всій таблиці, а не в групах.</li></ul>`,
        `<ul><li>Фильтровать по оконной функции в WHERE нельзя — WHERE выполняется раньше. Оберни запрос в WITH и фильтруй снаружи.</li><li>Путать RANK и ROW_NUMBER: при равных баллах ROW_NUMBER даст разные места.</li><li>Забыть PARTITION BY — считается по всей таблице, а не в группах.</li></ul>`,
        `<ul><li>You can’t filter on a window function in WHERE — WHERE runs earlier. Wrap the query in WITH and filter outside.</li><li>Mixing up RANK and ROW_NUMBER: on ties ROW_NUMBER gives different places.</li><li>Forgetting PARTITION BY computes over the whole table, not per group.</li></ul>`),
      examples: [
        { title: L('Рейтинг', 'Рейтинг', 'Ranking'), code: 'SELECT name, age,\n  ROW_NUMBER() OVER (ORDER BY age) AS row_n,\n  RANK() OVER (ORDER BY age) AS rnk,\n  DENSE_RANK() OVER (ORDER BY age) AS dense\nFROM students\nORDER BY age, name;', note: L('Подивись, як відрізняються три стовпці.', 'Посмотри, как отличаются три столбца.', 'See how the three columns differ.') },
        { title: 'PARTITION BY', code: 'SELECT city, name, score,\n  RANK() OVER (PARTITION BY city ORDER BY score DESC) AS place_in_city,\n  ROUND(AVG(score) OVER (PARTITION BY city)) AS city_avg\nFROM students\nWHERE city IS NOT NULL\nORDER BY city, place_in_city;', note: L('Окремий рейтинг у кожному місті.', 'Отдельный рейтинг в каждом городе.', 'A separate ranking per city.') },
        { title: L('Накопичувальна сума й LAG', 'Накопительная сумма и LAG', 'Running total and LAG'), code: 'SELECT id, name, score,\n  SUM(score) OVER (ORDER BY id) AS running,\n  score - LAG(score) OVER (ORDER BY id) AS diff\nFROM students\nORDER BY id;', note: L('У першого рядка LAG = NULL.', 'У первой строки LAG = NULL.', 'LAG is NULL on the first row.') }
      ],
      task: {
        text: L('Для кожного запису з <code>enrollments</code> виведи <code>course_id</code>, <code>student_id</code>, <code>progress</code> і <code>place</code> — місце учня на цьому курсі за прогресом (<code>RANK</code>, найбільший прогрес — 1). Залиш лише тих, у кого <code>place = 1</code>, і відсортуй за <code>course_id</code>, потім <code>student_id</code>.', 'Для каждой записи из <code>enrollments</code> выведи <code>course_id</code>, <code>student_id</code>, <code>progress</code> и <code>place</code> — место ученика на этом курсе по прогрессу (<code>RANK</code>, наибольший прогресс — 1). Оставь только тех, у кого <code>place = 1</code>, и отсортируй по <code>course_id</code>, затем <code>student_id</code>.', 'For each <code>enrollments</code> row show <code>course_id</code>, <code>student_id</code>, <code>progress</code> and <code>place</code> — the student’s rank on that course by progress (<code>RANK</code>, highest = 1). Keep only <code>place = 1</code> and sort by <code>course_id</code>, then <code>student_id</code>.'),
        how: [L('<code>RANK() OVER (PARTITION BY course_id ORDER BY progress DESC) AS place</code>', '<code>RANK() OVER (PARTITION BY course_id ORDER BY progress DESC) AS place</code>', '<code>RANK() OVER (PARTITION BY course_id ORDER BY progress DESC) AS place</code>'), L('Обгорни в <code>WITH ranked AS (…)</code> і фільтруй <code>WHERE place = 1</code> зовні.', 'Оберни в <code>WITH ranked AS (…)</code> и фильтруй <code>WHERE place = 1</code> снаружи.', 'Wrap in <code>WITH ranked AS (…)</code> and filter <code>WHERE place = 1</code> outside.')],
        starter: '',
        solution: 'WITH ranked AS (\n  SELECT course_id, student_id, progress,\n    RANK() OVER (PARTITION BY course_id ORDER BY progress DESC) AS place\n  FROM enrollments\n)\nSELECT * FROM ranked\nWHERE place = 1\nORDER BY course_id, student_id;',
        hint: L('На Python Basics (курс 1) троє поділили перше місце з прогресом 100 — разом має вийти 7 рядків.', 'На Python Basics (курс 1) трое разделили первое место с прогрессом 100 — всего должно получиться 7 строк.', 'On Python Basics (course 1) three students share first place with 100 — 7 rows in total.'),
        must: /RANK\s*\(\s*\)\s*OVER/i
      },
      quiz: { q: L('Бали 90, 80, 80, 70. Яке місце RANK() дасть балу 70?', 'Баллы 90, 80, 80, 70. Какое место RANK() даст баллу 70?', 'Scores 90, 80, 80, 70. What place does RANK() give 70?'), options: ['3', '4', '2'], answer: 1, explain: L('Після двох других місць іде пропуск: 1, 2, 2, 4.', 'После двух вторых мест идёт пропуск: 1, 2, 2, 4.', 'Two second places leave a gap: 1, 2, 2, 4.') },
      ref: [{ code: 'RANK() OVER (PARTITION BY g ORDER BY x DESC)', d: L('місце в групі', 'место в группе', 'rank in group') }, { code: 'ROW_NUMBER()  DENSE_RANK()', d: L('нумерація', 'нумерация', 'numbering') }, { code: 'SUM(x) OVER (ORDER BY id)', d: L('накопичувальна сума', 'накопительная сумма', 'running total') }, { code: 'LAG(x)  LEAD(x)', d: L('сусідні рядки', 'соседние строки', 'neighbour rows') }]
    },
    {
      id: 'view-index', chapter: CH6,
      title: L('VIEW та INDEX', 'VIEW и INDEX', 'VIEW and INDEX'),
      theory: L(
        `<p><b>Представлення (VIEW)</b> — збережений запит, до якого звертаються як до таблиці:</p>
<pre class="inline-code">CREATE VIEW leaderboard AS
SELECT name, score FROM students ORDER BY score DESC;

SELECT * FROM leaderboard LIMIT 3;</pre>
<p>VIEW не зберігає копію даних: щоразу виконується його запит, тож результат завжди актуальний. Видалити — <code>DROP VIEW leaderboard</code>.</p>
<p><b>Індекс (INDEX)</b> — «зміст книги» для стовпця. Без нього база перебирає всі рядки; з ним — одразу знаходить потрібні, як у словнику за абеткою:</p>
<pre class="inline-code">CREATE INDEX idx_students_city ON students(city);
CREATE UNIQUE INDEX idx_email ON users(email);</pre>
<p>Чи використано індекс, показує <code>EXPLAIN QUERY PLAN SELECT …</code>: <code>SEARCH … USING INDEX</code> — так, <code>SCAN</code> — перебір усієї таблиці.</p>`,
        `<p><b>Представление (VIEW)</b> — сохранённый запрос, к которому обращаются как к таблице:</p>
<pre class="inline-code">CREATE VIEW leaderboard AS
SELECT name, score FROM students ORDER BY score DESC;

SELECT * FROM leaderboard LIMIT 3;</pre>
<p>VIEW не хранит копию данных: каждый раз выполняется его запрос, так что результат всегда актуален. Удалить — <code>DROP VIEW leaderboard</code>.</p>
<p><b>Индекс (INDEX)</b> — «оглавление книги» для столбца. Без него база перебирает все строки; с ним — сразу находит нужные, как в словаре по алфавиту:</p>
<pre class="inline-code">CREATE INDEX idx_students_city ON students(city);
CREATE UNIQUE INDEX idx_email ON users(email);</pre>
<p>Используется ли индекс, показывает <code>EXPLAIN QUERY PLAN SELECT …</code>: <code>SEARCH … USING INDEX</code> — да, <code>SCAN</code> — перебор всей таблицы.</p>`,
        `<p>A <b>VIEW</b> is a saved query you use like a table:</p>
<pre class="inline-code">CREATE VIEW leaderboard AS
SELECT name, score FROM students ORDER BY score DESC;

SELECT * FROM leaderboard LIMIT 3;</pre>
<p>A view stores no copy of the data: its query runs each time, so the result is always current. Remove it with <code>DROP VIEW leaderboard</code>.</p>
<p>An <b>INDEX</b> is a “table of contents” for a column. Without it the database scans every row; with it, it jumps straight to the right ones, like an alphabetical dictionary:</p>
<pre class="inline-code">CREATE INDEX idx_students_city ON students(city);
CREATE UNIQUE INDEX idx_email ON users(email);</pre>
<p><code>EXPLAIN QUERY PLAN SELECT …</code> shows whether an index is used: <code>SEARCH … USING INDEX</code> means yes, <code>SCAN</code> means a full table scan.</p>`),
      why: L(`<p>VIEW ховає складний запит за простим іменем: аналітик пише <code>SELECT * FROM monthly_sales</code>, не згадуючи про п’ять JOIN-ів. А індекси — головна причина, чому пошук серед мільйонів користувачів займає мілісекунди. Без індексу на <code>email</code> кожен вхід на сайт перебирав би всю таблицю.</p>`,
        `<p>VIEW прячет сложный запрос за простым именем: аналитик пишет <code>SELECT * FROM monthly_sales</code>, не вспоминая про пять JOIN-ов. А индексы — главная причина, почему поиск среди миллионов пользователей занимает миллисекунды. Без индекса на <code>email</code> каждый вход на сайт перебирал бы всю таблицу.</p>`,
        `<p>A view hides a complex query behind a simple name: an analyst writes <code>SELECT * FROM monthly_sales</code> without thinking about five JOINs. Indexes are why searching millions of users takes milliseconds. Without an index on <code>email</code>, every login would scan the whole table.</p>`),
      mistakes: L(`<ul><li>Індекси на кожен стовпець «про запас» — вони займають місце й сповільнюють INSERT/UPDATE.</li><li>Створити VIEW з іменем, яке вже є, — помилка; використовуй <code>CREATE VIEW IF NOT EXISTS</code> або спочатку DROP.</li><li>Думати, що VIEW — копія: якщо змінити таблицю, VIEW теж «зміниться».</li></ul>`,
        `<ul><li>Индексы на каждый столбец «про запас» — они занимают место и замедляют INSERT/UPDATE.</li><li>Создать VIEW с именем, которое уже есть, — ошибка; используй <code>CREATE VIEW IF NOT EXISTS</code> или сначала DROP.</li><li>Думать, что VIEW — копия: если изменить таблицу, VIEW тоже «изменится».</li></ul>`,
        `<ul><li>Indexing every column “just in case” — indexes take space and slow down INSERT/UPDATE.</li><li>Creating a view whose name exists is an error; use <code>CREATE VIEW IF NOT EXISTS</code> or DROP first.</li><li>Thinking a view is a copy: change the table and the view “changes” too.</li></ul>`),
      examples: [
        { title: 'VIEW', code: "CREATE VIEW course_stats AS\nSELECT c.title, COUNT(e.student_id) AS learners, ROUND(AVG(e.progress)) AS avg_p\nFROM courses c LEFT JOIN enrollments e ON e.course_id = c.id\nGROUP BY c.id;\n\nSELECT * FROM course_stats WHERE learners >= 3 ORDER BY avg_p DESC;", note: L('Далі працюємо з VIEW як з таблицею.', 'Дальше работаем с VIEW как с таблицей.', 'Then use the view like a table.') },
        { title: L('VIEW завжди актуальний', 'VIEW всегда актуален', 'A view is always current'), code: "CREATE VIEW top AS SELECT name, score FROM students WHERE score >= 90;\nSELECT COUNT(*) AS before FROM top;\nUPDATE students SET score = 92 WHERE name = 'Anna';\nSELECT COUNT(*) AS after FROM top;", note: L('Anna з’явилась у VIEW без його перестворення.', 'Anna появилась во VIEW без его пересоздания.', 'Anna appears in the view without recreating it.') },
        { title: 'INDEX', code: "EXPLAIN QUERY PLAN SELECT * FROM students WHERE city = 'Lviv';\nCREATE INDEX idx_city ON students(city);\nEXPLAIN QUERY PLAN SELECT * FROM students WHERE city = 'Lviv';", note: L('Було SCAN, стало SEARCH USING INDEX.', 'Было SCAN, стало SEARCH USING INDEX.', 'SCAN becomes SEARCH USING INDEX.') }
      ],
      task: {
        text: L('Створи VIEW <code>student_summary</code> зі стовпцями <code>name</code>, <code>courses</code> (кількість записів) і <code>best</code> (найбільший прогрес) для кожного учня, що має записи. Створи індекс <code>idx_enr_student</code> на <code>enrollments(student_id)</code>. Потім виведи з VIEW учнів, у яких <code>best = 100</code>, за іменем.', 'Создай VIEW <code>student_summary</code> со столбцами <code>name</code>, <code>courses</code> (количество записей) и <code>best</code> (наибольший прогресс) для каждого ученика с записями. Создай индекс <code>idx_enr_student</code> на <code>enrollments(student_id)</code>. Затем выведи из VIEW учеников, у которых <code>best = 100</code>, по имени.', 'Create a view <code>student_summary</code> with <code>name</code>, <code>courses</code> (number of enrollments) and <code>best</code> (highest progress) for every student with enrollments. Create index <code>idx_enr_student</code> on <code>enrollments(student_id)</code>. Then select students with <code>best = 100</code> from the view, sorted by name.'),
        how: [L('<code>CREATE VIEW student_summary AS SELECT s.name, COUNT(*) AS courses, MAX(e.progress) AS best FROM … GROUP BY s.id;</code>', '<code>CREATE VIEW student_summary AS SELECT s.name, COUNT(*) AS courses, MAX(e.progress) AS best FROM … GROUP BY s.id;</code>', '<code>CREATE VIEW student_summary AS SELECT s.name, COUNT(*) AS courses, MAX(e.progress) AS best FROM … GROUP BY s.id;</code>'), L('Перевіряється останній SELECT.', 'Проверяется последний SELECT.', 'The final SELECT is checked.')],
        starter: '',
        solution: 'CREATE VIEW student_summary AS\nSELECT s.name, COUNT(*) AS courses, MAX(e.progress) AS best\nFROM enrollments e\nJOIN students s ON s.id = e.student_id\nGROUP BY s.id;\nCREATE INDEX idx_enr_student ON enrollments(student_id);\nSELECT * FROM student_summary WHERE best = 100 ORDER BY name;',
        hint: L('Має вийти 5 учнів, першою — Anna (2 курси).', 'Должно получиться 5 учеников, первой — Anna (2 курса).', 'You should get 5 students, Anna first (2 courses).'),
        must: /CREATE\s+VIEW[\s\S]*CREATE\s+(UNIQUE\s+)?INDEX|CREATE\s+(UNIQUE\s+)?INDEX[\s\S]*CREATE\s+VIEW/i
      },
      quiz: { q: L('Що зберігає VIEW?', 'Что хранит VIEW?', 'What does a VIEW store?'), options: [L('копію даних', 'копию данных', 'a copy of the data'), L('лише текст запиту', 'только текст запроса', 'only the query'), L('індекс', 'индекс', 'an index')], answer: 1, explain: L('Дані щоразу беруться з таблиць.', 'Данные каждый раз берутся из таблиц.', 'Data comes from the tables each time.') },
      ref: [{ code: 'CREATE VIEW v AS SELECT …', d: L('збережений запит', 'сохранённый запрос', 'saved query') }, { code: 'CREATE [UNIQUE] INDEX i ON t(col)', d: L('індекс', 'индекс', 'index') }, { code: 'EXPLAIN QUERY PLAN SELECT …', d: L('план запиту', 'план запроса', 'query plan') }]
    },
    {
      id: 'transactions', chapter: CH6,
      title: L('Транзакції', 'Транзакции', 'Transactions'),
      db: `CREATE TABLE wallets (id INTEGER PRIMARY KEY, owner TEXT, gems INTEGER CHECK (gems >= 0));
INSERT INTO wallets VALUES (1,'Anna',120),(2,'Max',40),(3,'Ira',75);
CREATE TABLE transfers (id INTEGER PRIMARY KEY, from_id INTEGER, to_id INTEGER, amount INTEGER);`,
      theory: L(
        `<p><b>Транзакція</b> — група змін, що виконується <b>повністю або ніяк</b>. Класичний приклад — переказ: зняти з одного гаманця й додати на інший. Якщо друга дія не вдалась, першу треба скасувати.</p>
<pre class="inline-code">BEGIN;
UPDATE wallets SET gems = gems - 30 WHERE id = 1;
UPDATE wallets SET gems = gems + 30 WHERE id = 2;
COMMIT;      -- зберегти все</pre>
<ul><li><code>BEGIN</code> — почати транзакцію</li><li><code>COMMIT</code> — зафіксувати всі зміни</li><li><code>ROLLBACK</code> — скасувати все від BEGIN</li><li><code>SAVEPOINT s</code> / <code>ROLLBACK TO s</code> — часткове скасування</li></ul>
<p>Бази даних гарантують властивості <b>ACID</b>: атомарність (все або нічого), узгодженість (правила CHECK не порушуються), ізольованість (інші не бачать незавершених змін) і довговічність (після COMMIT дані не зникнуть навіть при вимкненні світла).</p>
<p>У цьому уроці своя база: гаманці з кристалами <code>wallets</code> і журнал переказів <code>transfers</code>.</p>`,
        `<p><b>Транзакция</b> — группа изменений, которая выполняется <b>полностью или никак</b>. Классический пример — перевод: снять с одного кошелька и добавить на другой. Если второе действие не удалось, первое нужно отменить.</p>
<pre class="inline-code">BEGIN;
UPDATE wallets SET gems = gems - 30 WHERE id = 1;
UPDATE wallets SET gems = gems + 30 WHERE id = 2;
COMMIT;      -- сохранить всё</pre>
<ul><li><code>BEGIN</code> — начать транзакцию</li><li><code>COMMIT</code> — зафиксировать все изменения</li><li><code>ROLLBACK</code> — отменить всё от BEGIN</li><li><code>SAVEPOINT s</code> / <code>ROLLBACK TO s</code> — частичная отмена</li></ul>
<p>Базы данных гарантируют свойства <b>ACID</b>: атомарность (всё или ничего), согласованность (правила CHECK не нарушаются), изолированность (другие не видят незавершённых изменений) и долговечность (после COMMIT данные не пропадут даже при отключении света).</p>
<p>В этом уроке своя база: кошельки с кристаллами <code>wallets</code> и журнал переводов <code>transfers</code>.</p>`,
        `<p>A <b>transaction</b> is a group of changes that happens <b>completely or not at all</b>. The classic example is a transfer: take from one wallet, add to another. If the second step fails, the first must be undone.</p>
<pre class="inline-code">BEGIN;
UPDATE wallets SET gems = gems - 30 WHERE id = 1;
UPDATE wallets SET gems = gems + 30 WHERE id = 2;
COMMIT;      -- save everything</pre>
<ul><li><code>BEGIN</code> starts a transaction</li><li><code>COMMIT</code> saves all changes</li><li><code>ROLLBACK</code> undoes everything since BEGIN</li><li><code>SAVEPOINT s</code> / <code>ROLLBACK TO s</code> — partial undo</li></ul>
<p>Databases guarantee <b>ACID</b>: atomicity (all or nothing), consistency (CHECK rules hold), isolation (others don’t see unfinished changes) and durability (after COMMIT data survives even a power cut).</p>
<p>This lesson has its own database: gem wallets <code>wallets</code> and a transfer log <code>transfers</code>.</p>`),
      why: L(`<p>Уяви: гра списала 500 кристалів за меч, а сервер упав до того, як меч потрапив в інвентар. Без транзакції гравець втратив кристали. З транзакцією — або є і списання, і меч, або нічого не сталось. Банки, магазини й ігрові економіки тримаються саме на цьому.</p>`,
        `<p>Представь: игра списала 500 кристаллов за меч, а сервер упал до того, как меч попал в инвентарь. Без транзакции игрок потерял кристаллы. С транзакцией — либо есть и списание, и меч, либо ничего не произошло. Банки, магазины и игровые экономики держатся именно на этом.</p>`,
        `<p>Picture this: a game charged 500 gems for a sword and the server crashed before the sword reached the inventory. Without a transaction the player lost the gems. With one, either both happen or nothing does. Banks, shops and game economies rely on exactly this.</p>`),
      mistakes: L(`<ul><li>Забути <code>COMMIT</code> — у багатьох програмах зміни зникнуть при закритті з’єднання.</li><li><code>ROLLBACK</code> без <code>BEGIN</code> — помилка <code>no transaction is active</code>.</li><li>Робити переказ двома окремими UPDATE без транзакції — між ними може статися збій.</li></ul>`,
        `<ul><li>Забыть <code>COMMIT</code> — во многих программах изменения пропадут при закрытии соединения.</li><li><code>ROLLBACK</code> без <code>BEGIN</code> — ошибка <code>no transaction is active</code>.</li><li>Делать перевод двумя отдельными UPDATE без транзакции — между ними может случиться сбой.</li></ul>`,
        `<ul><li>Forgetting <code>COMMIT</code> — many apps lose the changes when the connection closes.</li><li><code>ROLLBACK</code> without <code>BEGIN</code> → <code>no transaction is active</code>.</li><li>Doing a transfer as two separate UPDATEs without a transaction — a crash can hit in between.</li></ul>`),
      examples: [
        { title: 'COMMIT', code: 'BEGIN;\nUPDATE wallets SET gems = gems - 30 WHERE id = 1;\nUPDATE wallets SET gems = gems + 30 WHERE id = 2;\nINSERT INTO transfers (from_id, to_id, amount) VALUES (1, 2, 30);\nCOMMIT;\nSELECT * FROM wallets;', note: L('Переказ і запис у журнал — разом.', 'Перевод и запись в журнал — вместе.', 'Transfer and log entry together.') },
        { title: 'ROLLBACK', code: "BEGIN;\nDELETE FROM wallets;\nSELECT COUNT(*) AS during FROM wallets;\nROLLBACK;\nSELECT COUNT(*) AS after FROM wallets;", note: L('Видалення скасовано — гаманці на місці.', 'Удаление отменено — кошельки на месте.', 'The delete is undone — wallets are back.') },
        { title: 'SAVEPOINT', code: "BEGIN;\nUPDATE wallets SET gems = gems + 10 WHERE owner = 'Ira';\nSAVEPOINT bonus;\nUPDATE wallets SET gems = gems * 100 WHERE owner = 'Ira';\nROLLBACK TO bonus;\nCOMMIT;\nSELECT owner, gems FROM wallets WHERE owner = 'Ira';", note: L('Скасовано лише помилкове множення.', 'Отменено только ошибочное умножение.', 'Only the bad multiplication is undone.') }
      ],
      task: {
        text: L('Виконай у транзакції переказ <b>50 кристалів</b> від Anna (id 1) до Ira (id 3) і запиши його в <code>transfers</code>, потім <code>COMMIT</code>. Далі почни другу транзакцію, спробуй зняти з Max (id 2) 100 кристалів — і скасуй її через <code>ROLLBACK</code>. Наприкінці виведи <code>owner</code> і <code>gems</code> усіх гаманців за <code>id</code>.', 'Выполни в транзакции перевод <b>50 кристаллов</b> от Anna (id 1) к Ira (id 3) и запиши его в <code>transfers</code>, затем <code>COMMIT</code>. Дальше начни вторую транзакцию, попробуй снять с Max (id 2) 100 кристаллов — и отмени её через <code>ROLLBACK</code>. В конце выведи <code>owner</code> и <code>gems</code> всех кошельков по <code>id</code>.', 'In a transaction, transfer <b>50 gems</b> from Anna (id 1) to Ira (id 3), log it in <code>transfers</code>, then <code>COMMIT</code>. Then start a second transaction, try to take 100 gems from Max (id 2) and undo it with <code>ROLLBACK</code>. Finally list <code>owner</code> and <code>gems</code> of all wallets by <code>id</code>.'),
        how: [L('Знімання з Max порушить <code>CHECK (gems &gt;= 0)</code> — у справжній програмі саме тоді й роблять ROLLBACK. Тут достатньо <code>BEGIN; UPDATE wallets SET gems = 0 WHERE id = 2; ROLLBACK;</code>', 'Снятие с Max нарушит <code>CHECK (gems &gt;= 0)</code> — в настоящей программе именно тогда и делают ROLLBACK. Здесь достаточно <code>BEGIN; UPDATE wallets SET gems = 0 WHERE id = 2; ROLLBACK;</code>', 'Taking from Max would break <code>CHECK (gems &gt;= 0)</code> — real programs ROLLBACK exactly then. Here <code>BEGIN; UPDATE wallets SET gems = 0 WHERE id = 2; ROLLBACK;</code> is enough.')],
        starter: '',
        solution: "BEGIN;\nUPDATE wallets SET gems = gems - 50 WHERE id = 1;\nUPDATE wallets SET gems = gems + 50 WHERE id = 3;\nINSERT INTO transfers (from_id, to_id, amount) VALUES (1, 3, 50);\nCOMMIT;\nBEGIN;\nUPDATE wallets SET gems = 0 WHERE id = 2;\nROLLBACK;\nSELECT owner, gems FROM wallets ORDER BY id;",
        hint: L('Очікувано: Anna 70, Max 40, Ira 125.', 'Ожидается: Anna 70, Max 40, Ira 125.', 'Expected: Anna 70, Max 40, Ira 125.'),
        check: function (res, code) {
          if (!/BEGIN[\s\S]*COMMIT/i.test(code) || !/ROLLBACK/i.test(code) || !/INSERT\s+INTO\s+transfers/i.test(code)) return false;
          const last = res.results[res.results.length - 1];
          if (!last || last.values.length !== 3) return false;
          return JSON.stringify(last.values.map((r) => [r[0], r[1]])) === JSON.stringify([['Anna', 70], ['Max', 40], ['Ira', 125]]);
        }
      },
      quiz: { q: L('Що робить ROLLBACK?', 'Что делает ROLLBACK?', 'What does ROLLBACK do?'), options: [L('зберігає зміни', 'сохраняет изменения', 'saves the changes'), L('скасовує зміни від BEGIN', 'отменяет изменения от BEGIN', 'undoes changes since BEGIN'), L('видаляє таблицю', 'удаляет таблицу', 'drops the table')], answer: 1, explain: L('Усе, що зроблено після BEGIN, зникає.', 'Всё, что сделано после BEGIN, исчезает.', 'Everything done after BEGIN is gone.') },
      ref: [{ code: 'BEGIN; … COMMIT;', d: L('зберегти разом', 'сохранить вместе', 'save together') }, { code: 'ROLLBACK;', d: L('скасувати', 'отменить', 'undo') }, { code: 'SAVEPOINT s; ROLLBACK TO s;', d: L('часткове скасування', 'частичная отмена', 'partial undo') }]
    }
  ], 'project-report');

  C.steps('sql', [
    {
      id: 'project-cinema', chapter: CH5, project: true,
      title: L('Проєкт: кінотеатр', 'Проект: кинотеатр', 'Project: Cinema'),
      db: CINEMA,
      theory: L(
        `<p>Ти — аналітик мережі кінотеатрів. У базі чотири таблиці: <code>movies</code> (фільми), <code>halls</code> (зали з кількістю місць), <code>sessions</code> (сеанси: фільм, зал, день, час, ціна) і <code>tickets</code> (продані квитки).</p>
<h4>Звіт по кожному фільму, що мав хоча б один сеанс:</h4>
<ol><li><code>title</code> — назва</li><li><code>sessions</code> — кількість сеансів</li><li><code>tickets</code> — продано квитків</li><li><code>revenue</code> — виручка (сума цін проданих квитків)</li><li><code>fill</code> — заповненість залів у відсотках: проданих квитків / усіх місць на сеансах × 100, округлено до цілого</li><li><code>place</code> — місце фільму за виручкою (<code>RANK</code>, найбільша — 1)</li><li><code>verdict</code>: <code>hit</code>, якщо заповненість ≥ 70; <code>ok</code>, якщо ≥ 40; інакше <code>flop</code></li></ol>
<p>Відсортуй за <code>place</code>, а при рівних — за назвою.</p>
<p><b>Пастка:</b> якщо одразу з’єднати сеанси з квитками й рахувати <code>SUM(h.seats)</code>, місця залу помножаться на кількість квитків. Тому спочатку порахуй квитки на кожен сеанс окремо (через WITH), а вже потім збирай звіт.</p>`,
        `<p>Ты — аналитик сети кинотеатров. В базе четыре таблицы: <code>movies</code> (фильмы), <code>halls</code> (залы с количеством мест), <code>sessions</code> (сеансы: фильм, зал, день, время, цена) и <code>tickets</code> (проданные билеты).</p>
<h4>Отчёт по каждому фильму, у которого был хотя бы один сеанс:</h4>
<ol><li><code>title</code> — название</li><li><code>sessions</code> — количество сеансов</li><li><code>tickets</code> — продано билетов</li><li><code>revenue</code> — выручка (сумма цен проданных билетов)</li><li><code>fill</code> — заполненность залов в процентах: проданных билетов / всех мест на сеансах × 100, округлено до целого</li><li><code>place</code> — место фильма по выручке (<code>RANK</code>, наибольшая — 1)</li><li><code>verdict</code>: <code>hit</code>, если заполненность ≥ 70; <code>ok</code>, если ≥ 40; иначе <code>flop</code></li></ol>
<p>Отсортируй по <code>place</code>, а при равных — по названию.</p>
<p><b>Ловушка:</b> если сразу соединить сеансы с билетами и считать <code>SUM(h.seats)</code>, места зала умножатся на количество билетов. Поэтому сначала посчитай билеты на каждый сеанс отдельно (через WITH), а уже потом собирай отчёт.</p>`,
        `<p>You’re an analyst for a cinema chain. The database has four tables: <code>movies</code>, <code>halls</code> (with seat counts), <code>sessions</code> (movie, hall, day, time, price) and <code>tickets</code> (tickets sold).</p>
<h4>Report for every movie with at least one session:</h4>
<ol><li><code>title</code></li><li><code>sessions</code> — number of sessions</li><li><code>tickets</code> — tickets sold</li><li><code>revenue</code> — sum of prices of sold tickets</li><li><code>fill</code> — occupancy in percent: tickets sold / all seats across its sessions × 100, rounded</li><li><code>place</code> — rank by revenue (<code>RANK</code>, highest = 1)</li><li><code>verdict</code>: <code>hit</code> if occupancy ≥ 70; <code>ok</code> if ≥ 40; else <code>flop</code></li></ol>
<p>Sort by <code>place</code>, ties by title.</p>
<p><b>Trap:</b> joining sessions with tickets straight away and computing <code>SUM(h.seats)</code> multiplies hall seats by the ticket count. Count tickets per session first (with WITH), then build the report.</p>`),
      why: L(`<p>Цей проєкт збирає все з курсу: JOIN чотирьох таблиць, GROUP BY, агрегати, WITH, віконну функцію RANK і CASE. Саме такі звіти бачать менеджери кінотеатрів, щоб вирішити, які фільми лишити в прокаті й у які зали їх ставити. А «пастка з подвійним рахунком» — найчастіша помилка аналітиків-початківців.</p>`,
        `<p>Этот проект собирает всё из курса: JOIN четырёх таблиц, GROUP BY, агрегаты, WITH, оконную функцию RANK и CASE. Именно такие отчёты видят менеджеры кинотеатров, чтобы решить, какие фильмы оставить в прокате и в какие залы их ставить. А «ловушка двойного подсчёта» — самая частая ошибка начинающих аналитиков.</p>`,
        `<p>This project uses everything from the course: a four-table JOIN, GROUP BY, aggregates, WITH, the RANK window function and CASE. Cinema managers use exactly these reports to decide which films to keep and which halls to use. And the “double-counting trap” is the most common beginner analyst mistake.</p>`),
      mistakes: L(`<ul><li>Подвійний підрахунок місць після JOIN з квитками (див. пастку в теорії).</li><li>Ділення цілих: <code>100 / 120</code> у SQLite — 0. Множ на <code>100.0</code>.</li><li>Фільтрувати за <code>place</code> чи <code>fill</code> у WHERE того самого запиту — винеси в зовнішній запит.</li></ul>`,
        `<ul><li>Двойной подсчёт мест после JOIN с билетами (см. ловушку в теории).</li><li>Деление целых: <code>100 / 120</code> в SQLite — 0. Умножай на <code>100.0</code>.</li><li>Фильтровать по <code>place</code> или <code>fill</code> в WHERE того же запроса — вынеси во внешний запрос.</li></ul>`,
        `<ul><li>Double-counting seats after joining tickets (see the trap above).</li><li>Integer division: <code>100 / 120</code> is 0 in SQLite. Multiply by <code>100.0</code>.</li><li>Filtering by <code>place</code> or <code>fill</code> in the same query’s WHERE — move it to an outer query.</li></ul>`),
      examples: [
        { title: L('Квитки на сеанс', 'Билеты на сеанс', 'Tickets per session'), code: 'SELECT s.id, m.title, h.name AS hall, h.seats, COUNT(t.id) AS sold\nFROM sessions s\nJOIN movies m ON m.id = s.movie_id\nJOIN halls h ON h.id = s.hall_id\nLEFT JOIN tickets t ON t.session_id = s.id\nGROUP BY s.id\nORDER BY s.id;', note: L('LEFT JOIN — на випадок сеансу без квитків.', 'LEFT JOIN — на случай сеанса без билетов.', 'LEFT JOIN in case a session sold nothing.') },
        { title: L('Пастка подвійного рахунку', 'Ловушка двойного подсчёта', 'The double-count trap'), code: 'SELECT m.title, SUM(h.seats) AS wrong_seats\nFROM sessions s\nJOIN movies m ON m.id = s.movie_id\nJOIN halls h ON h.id = s.hall_id\nJOIN tickets t ON t.session_id = s.id\nWHERE m.id = 5\nGROUP BY m.id;', note: L('Зал на 40 місць «перетворився» на 320.', 'Зал на 40 мест «превратился» в 320.', 'A 40-seat hall “became” 320.') },
        { title: L('Виручка по днях', 'Выручка по дням', 'Revenue per day'), code: "SELECT s.day, COUNT(t.id) AS tickets, SUM(s.price) AS revenue,\n  SUM(SUM(s.price)) OVER (ORDER BY s.day) AS running\nFROM sessions s\nJOIN tickets t ON t.session_id = s.id\nGROUP BY s.day\nORDER BY s.day;", note: L('Віконна функція поверх агрегата.', 'Оконная функция поверх агрегата.', 'A window function over an aggregate.') }
      ],
      task: {
        text: L('Напиши запит-звіт за вимогами з теорії. Стовпці: <code>title, sessions, tickets, revenue, fill, place, verdict</code>.', 'Напиши запрос-отчёт по требованиям из теории. Столбцы: <code>title, sessions, tickets, revenue, fill, place, verdict</code>.', 'Write the report query from the theory. Columns: <code>title, sessions, tickets, revenue, fill, place, verdict</code>.'),
        how: [L('<code>WITH per_session AS (SELECT s.id, s.movie_id, s.price, h.seats, COUNT(t.id) AS sold FROM sessions s JOIN halls h … LEFT JOIN tickets t … GROUP BY s.id)</code>', '<code>WITH per_session AS (SELECT s.id, s.movie_id, s.price, h.seats, COUNT(t.id) AS sold FROM sessions s JOIN halls h … LEFT JOIN tickets t … GROUP BY s.id)</code>', '<code>WITH per_session AS (SELECT s.id, s.movie_id, s.price, h.seats, COUNT(t.id) AS sold FROM sessions s JOIN halls h … LEFT JOIN tickets t … GROUP BY s.id)</code>'), L('Другий крок <code>per_movie</code>: <code>COUNT(*) AS sessions, SUM(sold) AS tickets, SUM(sold * price) AS revenue, SUM(seats) AS seats</code>, GROUP BY movie_id.', 'Второй шаг <code>per_movie</code>: <code>COUNT(*) AS sessions, SUM(sold) AS tickets, SUM(sold * price) AS revenue, SUM(seats) AS seats</code>, GROUP BY movie_id.', 'Second step <code>per_movie</code>: <code>COUNT(*) AS sessions, SUM(sold) AS tickets, SUM(sold * price) AS revenue, SUM(seats) AS seats</code>, GROUP BY movie_id.'), L('У фінальному SELECT: <code>ROUND(tickets * 100.0 / seats) AS fill</code>, <code>RANK() OVER (ORDER BY revenue DESC) AS place</code> і CASE для verdict.', 'В финальном SELECT: <code>ROUND(tickets * 100.0 / seats) AS fill</code>, <code>RANK() OVER (ORDER BY revenue DESC) AS place</code> и CASE для verdict.', 'In the final SELECT: <code>ROUND(tickets * 100.0 / seats) AS fill</code>, <code>RANK() OVER (ORDER BY revenue DESC) AS place</code> and CASE for verdict.')],
        starter: 'WITH per_session AS (\n  \n)\nSELECT …',
        solution: "WITH per_session AS (\n  SELECT s.id, s.movie_id, s.price, h.seats, COUNT(t.id) AS sold\n  FROM sessions s\n  JOIN halls h ON h.id = s.hall_id\n  LEFT JOIN tickets t ON t.session_id = s.id\n  GROUP BY s.id\n),\nper_movie AS (\n  SELECT movie_id, COUNT(*) AS sessions, SUM(sold) AS tickets,\n    SUM(sold * price) AS revenue, SUM(seats) AS seats\n  FROM per_session\n  GROUP BY movie_id\n)\nSELECT m.title, p.sessions, p.tickets, p.revenue,\n  ROUND(p.tickets * 100.0 / p.seats) AS fill,\n  RANK() OVER (ORDER BY p.revenue DESC) AS place,\n  CASE\n    WHEN p.tickets * 100.0 / p.seats >= 70 THEN 'hit'\n    WHEN p.tickets * 100.0 / p.seats >= 40 THEN 'ok'\n    ELSE 'flop'\n  END AS verdict\nFROM per_movie p\nJOIN movies m ON m.id = p.movie_id\nORDER BY place, m.title;",
        hint: L('Першим буде Dragon Code (hit), останнім — Ocean Secrets (flop, 20%).', 'Первым будет Dragon Code (hit), последним — Ocean Secrets (flop, 20%).', 'Dragon Code comes first (hit), Ocean Secrets last (flop, 20%).'),
        must: /RANK\s*\(\s*\)\s*OVER/i
      },
      quiz: { q: L('Чому <code>SUM(h.seats)</code> після JOIN з квитками дає завелике число?', 'Почему <code>SUM(h.seats)</code> после JOIN с билетами даёт слишком большое число?', 'Why does <code>SUM(h.seats)</code> after joining tickets come out too big?'), options: [L('рядок сеансу повторюється для кожного квитка', 'строка сеанса повторяется для каждого билета', 'the session row repeats for every ticket'), L('SUM рахує NULL', 'SUM считает NULL', 'SUM counts NULLs'), L('через ORDER BY', 'из-за ORDER BY', 'because of ORDER BY')], answer: 0, explain: L('JOIN розмножує рядки — тому спочатку агрегують, потім з’єднують.', 'JOIN размножает строки — поэтому сначала агрегируют, потом соединяют.', 'JOIN multiplies rows — aggregate first, then join.') },
      ref: [{ code: 'WITH per_x AS (… GROUP BY …) SELECT … FROM per_x', d: L('агрегуй, потім з’єднуй', 'агрегируй, потом соединяй', 'aggregate, then join') }, { code: 'x * 100.0 / y', d: L('дробове ділення', 'дробное деление', 'decimal division') }]
    }
  ]);
})();
