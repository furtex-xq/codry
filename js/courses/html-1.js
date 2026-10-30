// HTML — частина 1. Функція check(document, window) виконується всередині сторінки-результату.
(function () {
  const L = Codry.L;
  const CH1 = L('Основи розмітки', 'Основы разметки', 'Markup basics');
  const CH2 = L('Контент', 'Контент', 'Content');
  const CH3 = L('Структура сторінки', 'Структура страницы', 'Page structure');

  Codry.steps('html', [
    {
      id: 'tags', chapter: CH1,
      title: L('Теги та заголовки', 'Теги и заголовки', 'Tags and headings'),
      theory: L(
        `<p><b>HTML</b> (HyperText Markup Language) — мова розмітки. Вона не «програмує», а <b>описує</b>, що є на сторінці: заголовок, абзац, картинка, кнопка. Браузер читає HTML і малює сторінку.</p>
<p>Розмітка складається з <b>тегів</b> у кутових дужках:</p>
<pre class="inline-code">&lt;h1&gt;Hello!&lt;/h1&gt;</pre>
<p><code>&lt;h1&gt;</code> — відкривальний тег, <code>&lt;/h1&gt;</code> — закривальний (зі слешем), а разом із вмістом це <b>елемент</b>.</p>
<p>Заголовки мають 6 рівнів: від <code>&lt;h1&gt;</code> (найважливіший) до <code>&lt;h6&gt;</code>. На сторінці зазвичай один <code>h1</code> — головна тема, далі <code>h2</code> для розділів, <code>h3</code> для підрозділів.</p>
<div class="tip">💡 Праворуч у вкладці «Результат» сторінка оновлюється наживо, поки ти пишеш.</div>`,
        `<p><b>HTML</b> (HyperText Markup Language) — язык разметки. Он не «программирует», а <b>описывает</b>, что есть на странице: заголовок, абзац, картинка, кнопка. Браузер читает HTML и рисует страницу.</p>
<p>Разметка состоит из <b>тегов</b> в угловых скобках:</p>
<pre class="inline-code">&lt;h1&gt;Hello!&lt;/h1&gt;</pre>
<p><code>&lt;h1&gt;</code> — открывающий тег, <code>&lt;/h1&gt;</code> — закрывающий (со слешем), а вместе с содержимым это <b>элемент</b>.</p>
<p>Заголовки имеют 6 уровней: от <code>&lt;h1&gt;</code> (самый важный) до <code>&lt;h6&gt;</code>. На странице обычно один <code>h1</code> — главная тема, дальше <code>h2</code> для разделов, <code>h3</code> для подразделов.</p>
<div class="tip">💡 Справа во вкладке «Результат» страница обновляется вживую, пока ты пишешь.</div>`,
        `<p><b>HTML</b> (HyperText Markup Language) is a markup language. It doesn’t “program” — it <b>describes</b> what’s on a page: a heading, a paragraph, an image, a button. The browser reads HTML and draws the page.</p>
<p>Markup is made of <b>tags</b> in angle brackets:</p>
<pre class="inline-code">&lt;h1&gt;Hello!&lt;/h1&gt;</pre>
<p><code>&lt;h1&gt;</code> is the opening tag, <code>&lt;/h1&gt;</code> the closing tag (with a slash), and together with the content it’s an <b>element</b>.</p>
<p>Headings have 6 levels: from <code>&lt;h1&gt;</code> (most important) to <code>&lt;h6&gt;</code>. A page usually has one <code>h1</code> — the main topic — then <code>h2</code> for sections and <code>h3</code> for subsections.</p>
<div class="tip">💡 The “Result” tab on the right updates live as you type.</div>`),
      why: L(`<p>Чому розмітка, а не просто текст? Браузеру, пошуковикам і програмам для незрячих людей потрібно розуміти <b>роль</b> кожного шматка тексту. Заголовок <code>h1</code> каже Google, про що сторінка, а екранний читач може перестрибувати між заголовками.</p>`,
        `<p>Почему разметка, а не просто текст? Браузеру, поисковикам и программам для незрячих людей нужно понимать <b>роль</b> каждого куска текста. Заголовок <code>h1</code> говорит Google, о чём страница, а экранный чтец может перепрыгивать между заголовками.</p>`,
        `<p>Why markup instead of plain text? Browsers, search engines and screen readers need to understand the <b>role</b> of each piece of text. An <code>h1</code> tells Google what the page is about, and a screen reader can jump between headings.</p>`),
      mistakes: L(`<ul><li>Забути закривальний тег — увесь текст далі стане заголовком.</li><li>Вибирати рівень заголовка за розміром шрифту — розмір змінюють у CSS, а рівень показує важливість.</li></ul>`,
        `<ul><li>Забыть закрывающий тег — весь текст дальше станет заголовком.</li><li>Выбирать уровень заголовка по размеру шрифта — размер меняют в CSS, а уровень показывает важность.</li></ul>`,
        `<ul><li>Forgetting the closing tag — all the following text becomes a heading.</li><li>Picking heading levels by font size — size is set in CSS, the level shows importance.</li></ul>`),
      examples: [
        { title: L('Заголовки', 'Заголовки', 'Headings'), code: '<h1>Main heading</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>\n<h6>The smallest</h6>', note: L('Що більша цифра — то менш важливий заголовок.', 'Чем больше цифра — тем менее важный заголовок.', 'The bigger the number, the less important the heading.') },
        { title: L('Ієрархія', 'Иерархия', 'Hierarchy'), code: '<h1>My trip to the mountains</h1>\n<h2>Day 1</h2>\n<h3>Morning</h3>\n<h3>Evening</h3>\n<h2>Day 2</h2>', note: L('Як зміст книжки: розділи й підрозділи.', 'Как оглавление книги: разделы и подразделы.', 'Like a book’s table of contents.') },
        { title: L('Вкладені теги', 'Вложенные теги', 'Nested tags'), code: '<h1>My <i>first</i> website</h1>\n<h2>About <b>me</b></h2>', note: L('Теги можна вкладати. Закривай їх у зворотному порядку.', 'Теги можно вкладывать. Закрывай их в обратном порядке.', 'Tags can be nested. Close them in reverse order.') },
        { title: L('Забутий тег', 'Забытый тег', 'Forgotten tag'), code: '<h2>Oops, I forgot to close this\n<p>This paragraph is fine</p>', note: L('Браузер намагається «вгадати», але результат часто дивний.', 'Браузер пытается «угадать», но результат часто странный.', 'The browser tries to guess, but the result is often odd.') }
      ],
      task: {
        text: L('Створи заголовок <code>h1</code> з текстом <code>My Website</code>, під ним <code>h2</code> з будь-яким текстом і ще один <code>h2</code> нижче.', 'Создай заголовок <code>h1</code> с текстом <code>My Website</code>, под ним <code>h2</code> с любым текстом и ещё один <code>h2</code> ниже.', 'Create an <code>h1</code> with the text <code>My Website</code>, an <code>h2</code> with any text below it, and another <code>h2</code> under that.'),
        how: [L('<code>&lt;h1&gt;My Website&lt;/h1&gt;</code>', '<code>&lt;h1&gt;My Website&lt;/h1&gt;</code>', '<code>&lt;h1&gt;My Website&lt;/h1&gt;</code>'), L('Два елементи <code>&lt;h2&gt;...&lt;/h2&gt;</code>.', 'Два элемента <code>&lt;h2&gt;...&lt;/h2&gt;</code>.', 'Two <code>&lt;h2&gt;...&lt;/h2&gt;</code> elements.')],
        starter: '\n',
        solution: '<h1>My Website</h1>\n<h2>About</h2>\n<h2>Contacts</h2>',
        hint: L('Текст у <code>h1</code> має точно збігатися: <code>My Website</code>.', 'Текст в <code>h1</code> должен точно совпадать: <code>My Website</code>.', 'The <code>h1</code> text must match exactly: <code>My Website</code>.'),
        check: function (doc) { var h = doc.querySelector('h1'); var h2 = doc.querySelectorAll('h2'); return !!h && h.textContent.trim() === 'My Website' && h2.length >= 2 && h2[0].textContent.trim() && h2[1].textContent.trim(); }
      },
      quiz: { q: L('Який тег — найважливіший заголовок?', 'Какой тег — самый важный заголовок?', 'Which tag is the most important heading?'), options: ['<h6>', '<h1>', '<head>'], answer: 1, explain: L('<code>&lt;head&gt;</code> — це службова частина сторінки, не заголовок.', '<code>&lt;head&gt;</code> — это служебная часть страницы, не заголовок.', '<code>&lt;head&gt;</code> is the page’s service section, not a heading.') },
      ref: [{ code: '<h1>…</h1> … <h6>', d: L('заголовки', 'заголовки', 'headings') }]
    },
    {
      id: 'document', chapter: CH1,
      title: L('Структура документа', 'Структура документа', 'Document structure'),
      theory: L(
        `<p>Повна HTML-сторінка має обов’язковий каркас:</p>
<pre class="inline-code">&lt;!DOCTYPE html&gt;
&lt;html lang="uk"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;title&gt;My page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
<ul><li><code>&lt;!DOCTYPE html&gt;</code> — «це сучасний HTML5»</li><li><code>&lt;html lang="..."&gt;</code> — корінь сторінки та її мова</li><li><code>&lt;head&gt;</code> — службова інформація: кодування, назва у вкладці, підключення стилів</li><li><code>&lt;body&gt;</code> — усе, що бачить користувач</li></ul>
<p>Деякі теги — <b>порожні</b> (без закривальної пари): <code>&lt;meta&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>.</p>`,
        `<p>Полная HTML-страница имеет обязательный каркас:</p>
<pre class="inline-code">&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;title&gt;My page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
<ul><li><code>&lt;!DOCTYPE html&gt;</code> — «это современный HTML5»</li><li><code>&lt;html lang="..."&gt;</code> — корень страницы и её язык</li><li><code>&lt;head&gt;</code> — служебная информация: кодировка, название во вкладке, подключение стилей</li><li><code>&lt;body&gt;</code> — всё, что видит пользователь</li></ul>
<p>Некоторые теги — <b>пустые</b> (без закрывающей пары): <code>&lt;meta&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>.</p>`,
        `<p>A full HTML page has a required skeleton:</p>
<pre class="inline-code">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;title&gt;My page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
<ul><li><code>&lt;!DOCTYPE html&gt;</code> — “this is modern HTML5”</li><li><code>&lt;html lang="..."&gt;</code> — the page root and its language</li><li><code>&lt;head&gt;</code> — service info: encoding, the tab title, linked styles</li><li><code>&lt;body&gt;</code> — everything the user sees</li></ul>
<p>Some tags are <b>void</b> (no closing pair): <code>&lt;meta&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>.</p>`),
      why: L(`<p><code>charset="utf-8"</code> потрібен, щоб кирилиця та емодзі відображалися правильно, а не «кракозябрами». <code>viewport</code> робить сайт нормальним на телефоні. <code>lang</code> допомагає перекладачам, пошуковикам і озвучці вибрати правильну мову.</p>`,
        `<p><code>charset="utf-8"</code> нужен, чтобы кириллица и эмодзи отображались правильно, а не «кракозябрами». <code>viewport</code> делает сайт нормальным на телефоне. <code>lang</code> помогает переводчикам, поисковикам и озвучке выбрать правильный язык.</p>`,
        `<p><code>charset="utf-8"</code> makes Cyrillic and emoji display correctly instead of garbled text. <code>viewport</code> makes the site look right on phones. <code>lang</code> helps translators, search engines and screen readers pick the right language.</p>`),
      mistakes: L(`<ul><li>Писати видимий контент у <code>&lt;head&gt;</code> — він не відобразиться.</li><li>Забути <code>charset</code> — український текст може перетворитися на ��.</li></ul>`,
        `<ul><li>Писать видимый контент в <code>&lt;head&gt;</code> — он не отобразится.</li><li>Забыть <code>charset</code> — русский текст может превратиться в ��.</li></ul>`,
        `<ul><li>Putting visible content in <code>&lt;head&gt;</code> — it won’t display.</li><li>Forgetting <code>charset</code> — non-Latin text can turn into ��.</li></ul>`),
      examples: [
        { title: L('Повна сторінка', 'Полная страница', 'Full page'), code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>My page</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n    <p>This is a complete HTML document.</p>\n  </body>\n</html>', note: L('Мінімальний правильний документ.', 'Минимальный правильный документ.', 'A minimal valid document.') },
        { title: 'viewport', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mobile-friendly</title>\n</head>\n<body>\n  <h1>I look good on phones</h1>\n</body>\n</html>', note: L('Без viewport телефон показує сторінку дрібною.', 'Без viewport телефон показывает страницу мелкой.', 'Without viewport phones show the page tiny.') },
        { title: L('Емодзі та кирилиця', 'Эмодзи и кириллица', 'Emoji and Cyrillic'), code: '<!DOCTYPE html>\n<html lang="uk">\n<head><meta charset="utf-8"><title>UTF-8</title></head>\n<body>\n  <p>Привіт! Привет! 🚀 ✨</p>\n</body>\n</html>', note: L('UTF-8 вміщує всі мови світу.', 'UTF-8 вмещает все языки мира.', 'UTF-8 covers every language.') }
      ],
      task: {
        text: L('Напиши повний HTML-документ: <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html lang="en"&gt;</code>, у <code>head</code> — <code>meta charset="utf-8"</code> і <code>title</code> з текстом <code>Codry</code>, у <code>body</code> — заголовок <code>h1</code>.', 'Напиши полный HTML-документ: <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html lang="en"&gt;</code>, в <code>head</code> — <code>meta charset="utf-8"</code> и <code>title</code> с текстом <code>Codry</code>, в <code>body</code> — заголовок <code>h1</code>.', 'Write a full HTML document: <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html lang="en"&gt;</code>, in <code>head</code> a <code>meta charset="utf-8"</code> and a <code>title</code> with <code>Codry</code>, in <code>body</code> an <code>h1</code>.'),
        how: [L('Почни з доктайпу.', 'Начни с доктайпа.', 'Start with the doctype.'), L('Усередині <code>html</code> — <code>head</code>, потім <code>body</code>.', 'Внутри <code>html</code> — <code>head</code>, затем <code>body</code>.', 'Inside <code>html</code>: <code>head</code>, then <code>body</code>.')],
        starter: '',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Codry</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>',
        hint: L('Скопіюй структуру з теорії й зміни <code>title</code>.', 'Скопируй структуру из теории и измени <code>title</code>.', 'Copy the structure from the theory and change the <code>title</code>.'),
        check: function (doc) { return doc.doctype && doc.documentElement.getAttribute('lang') === 'en' && doc.querySelector('head meta[charset]') && doc.title.trim() === 'Codry' && doc.querySelector('body h1'); }
      },
      quiz: { q: L('Де пишуть <code>&lt;title&gt;</code>?', 'Где пишут <code>&lt;title&gt;</code>?', 'Where does <code>&lt;title&gt;</code> go?'), options: ['<body>', '<head>', '<footer>'], answer: 1, explain: L('Назва вкладки — службова інформація.', 'Название вкладки — служебная информация.', 'The tab title is service info.') },
      ref: [{ code: '<!DOCTYPE html>', d: L('тип документа', 'тип документа', 'document type') }, { code: '<head> <body>', d: L('службова / видима частина', 'служебная / видимая часть', 'service / visible part') }, { code: '<meta charset="utf-8">', d: L('кодування', 'кодировка', 'encoding') }]
    },
    {
      id: 'text', chapter: CH2,
      title: L('Абзаци та форматування тексту', 'Абзацы и форматирование текста', 'Paragraphs and text formatting'),
      theory: L(
        `<p>Абзац тексту — тег <code>&lt;p&gt;</code>. Браузер сам додає відступи між абзацами.</p>
<table class="mini"><tr><td><code>&lt;strong&gt;</code> / <code>&lt;b&gt;</code></td><td>важливий / жирний текст</td></tr><tr><td><code>&lt;em&gt;</code> / <code>&lt;i&gt;</code></td><td>наголос / курсив</td></tr><tr><td><code>&lt;mark&gt;</code></td><td>виділення маркером</td></tr><tr><td><code>&lt;del&gt;</code> / <code>&lt;ins&gt;</code></td><td>видалений / вставлений текст</td></tr><tr><td><code>&lt;sub&gt;</code> / <code>&lt;sup&gt;</code></td><td>нижній / верхній індекс</td></tr><tr><td><code>&lt;code&gt;</code></td><td>код</td></tr><tr><td><code>&lt;br&gt;</code></td><td>перенос рядка</td></tr><tr><td><code>&lt;hr&gt;</code></td><td>горизонтальна лінія</td></tr><tr><td><code>&lt;blockquote&gt;</code></td><td>цитата</td></tr></table>
<p>Важливо: браузер <b>ігнорує зайві пробіли та переноси</b> в коді — кілька пробілів стають одним. Для нового рядка використовуй <code>&lt;br&gt;</code> або новий <code>&lt;p&gt;</code>. Текст «як є» з пробілами — тег <code>&lt;pre&gt;</code>.</p>`,
        `<p>Абзац текста — тег <code>&lt;p&gt;</code>. Браузер сам добавляет отступы между абзацами.</p>
<table class="mini"><tr><td><code>&lt;strong&gt;</code> / <code>&lt;b&gt;</code></td><td>важный / жирный текст</td></tr><tr><td><code>&lt;em&gt;</code> / <code>&lt;i&gt;</code></td><td>ударение / курсив</td></tr><tr><td><code>&lt;mark&gt;</code></td><td>выделение маркером</td></tr><tr><td><code>&lt;del&gt;</code> / <code>&lt;ins&gt;</code></td><td>удалённый / вставленный текст</td></tr><tr><td><code>&lt;sub&gt;</code> / <code>&lt;sup&gt;</code></td><td>нижний / верхний индекс</td></tr><tr><td><code>&lt;code&gt;</code></td><td>код</td></tr><tr><td><code>&lt;br&gt;</code></td><td>перенос строки</td></tr><tr><td><code>&lt;hr&gt;</code></td><td>горизонтальная линия</td></tr><tr><td><code>&lt;blockquote&gt;</code></td><td>цитата</td></tr></table>
<p>Важно: браузер <b>игнорирует лишние пробелы и переносы</b> в коде — несколько пробелов становятся одним. Для новой строки используй <code>&lt;br&gt;</code> или новый <code>&lt;p&gt;</code>. Текст «как есть» с пробелами — тег <code>&lt;pre&gt;</code>.</p>`,
        `<p>A paragraph is the <code>&lt;p&gt;</code> tag. The browser adds spacing between paragraphs automatically.</p>
<table class="mini"><tr><td><code>&lt;strong&gt;</code> / <code>&lt;b&gt;</code></td><td>important / bold text</td></tr><tr><td><code>&lt;em&gt;</code> / <code>&lt;i&gt;</code></td><td>emphasis / italic</td></tr><tr><td><code>&lt;mark&gt;</code></td><td>highlighted</td></tr><tr><td><code>&lt;del&gt;</code> / <code>&lt;ins&gt;</code></td><td>deleted / inserted text</td></tr><tr><td><code>&lt;sub&gt;</code> / <code>&lt;sup&gt;</code></td><td>subscript / superscript</td></tr><tr><td><code>&lt;code&gt;</code></td><td>code</td></tr><tr><td><code>&lt;br&gt;</code></td><td>line break</td></tr><tr><td><code>&lt;hr&gt;</code></td><td>horizontal rule</td></tr><tr><td><code>&lt;blockquote&gt;</code></td><td>quotation</td></tr></table>
<p>Important: the browser <b>ignores extra spaces and line breaks</b> in code — several spaces become one. For a new line use <code>&lt;br&gt;</code> or a new <code>&lt;p&gt;</code>. For text “as is” with spaces, use <code>&lt;pre&gt;</code>.</p>`),
      why: L(`<p>Чому і <code>&lt;b&gt;</code>, і <code>&lt;strong&gt;</code>? <code>b</code> — просто жирний вигляд, а <code>strong</code> означає «це <b>важливо</b>» — екранний читач вимовить його з наголосом. Так само <code>em</code> (наголос) проти <code>i</code> (курсив). Обирай тег за змістом, а не за виглядом.</p>`,
        `<p>Почему и <code>&lt;b&gt;</code>, и <code>&lt;strong&gt;</code>? <code>b</code> — просто жирный вид, а <code>strong</code> означает «это <b>важно</b>» — экранный чтец произнесёт его с ударением. Так же <code>em</code> (ударение) против <code>i</code> (курсив). Выбирай тег по смыслу, а не по виду.</p>`,
        `<p>Why both <code>&lt;b&gt;</code> and <code>&lt;strong&gt;</code>? <code>b</code> is just a bold look, while <code>strong</code> means “this is <b>important</b>” — a screen reader stresses it. Same with <code>em</code> (emphasis) vs <code>i</code> (italic). Pick tags by meaning, not looks.</p>`),
      mistakes: L(`<ul><li>Робити відступи кількома <code>&lt;br&gt;&lt;br&gt;&lt;br&gt;</code> — для цього є CSS.</li><li>Вкладати <code>&lt;p&gt;</code> всередину <code>&lt;p&gt;</code> — так не можна, браузер розірве абзац.</li></ul>`,
        `<ul><li>Делать отступы несколькими <code>&lt;br&gt;&lt;br&gt;&lt;br&gt;</code> — для этого есть CSS.</li><li>Вкладывать <code>&lt;p&gt;</code> внутрь <code>&lt;p&gt;</code> — так нельзя, браузер разорвёт абзац.</li></ul>`,
        `<ul><li>Making spacing with <code>&lt;br&gt;&lt;br&gt;&lt;br&gt;</code> — that’s what CSS is for.</li><li>Nesting <code>&lt;p&gt;</code> inside <code>&lt;p&gt;</code> — not allowed; the browser splits the paragraph.</li></ul>`),
      examples: [
        { title: L('Абзаци', 'Абзацы', 'Paragraphs'), code: '<p>This is the first paragraph.</p>\n<p>This is the second.     Extra     spaces\n   and line breaks     are ignored.</p>', note: L('Зайві пробіли «схлопуються».', 'Лишние пробелы «схлопываются».', 'Extra spaces collapse.') },
        { title: L('Форматування', 'Форматирование', 'Formatting'), code: '<p>This is <strong>very important</strong>, and this is <em>emphasised</em>.</p>\n<p>You can <mark>highlight</mark>, <del>strike</del> and <ins>insert</ins> text.</p>\n<p>H<sub>2</sub>O and E = mc<sup>2</sup></p>\n<p>Run <code>print("hi")</code> in Python.</p>', note: L('Кожен тег має своє значення.', 'Каждый тег имеет своё значение.', 'Each tag has its own meaning.') },
        { title: L('Вірш', 'Стих', 'Poem'), code: '<h3>A short poem</h3>\n<p>Roses are red,<br>\nviolets are blue,<br>\nHTML is easy<br>\nand so are you.</p>\n<hr>\n<p><i>— Codry</i></p>', note: L('<code>&lt;br&gt;</code> переносить рядок усередині абзацу.', '<code>&lt;br&gt;</code> переносит строку внутри абзаца.', '<code>&lt;br&gt;</code> breaks a line inside a paragraph.') },
        { title: L('Цитата і pre', 'Цитата и pre', 'Quote and pre'), code: '<blockquote>\n  The best way to predict the future is to invent it.\n</blockquote>\n<pre>\n  pre   keeps\n     all    the   spaces\n</pre>', note: L('<code>pre</code> зберігає форматування.', '<code>pre</code> сохраняет форматирование.', '<code>pre</code> keeps formatting.') }
      ],
      task: {
        text: L('Напиши два абзаци. У першому одне слово виділи тегом <code>&lt;strong&gt;</code>, у другому — тегом <code>&lt;em&gt;</code>. Між абзацами постав горизонтальну лінію <code>&lt;hr&gt;</code>.', 'Напиши два абзаца. В первом одно слово выдели тегом <code>&lt;strong&gt;</code>, во втором — тегом <code>&lt;em&gt;</code>. Между абзацами поставь горизонтальную линию <code>&lt;hr&gt;</code>.', 'Write two paragraphs. In the first, wrap one word in <code>&lt;strong&gt;</code>; in the second, in <code>&lt;em&gt;</code>. Put a horizontal rule <code>&lt;hr&gt;</code> between them.'),
        how: [L('<code>&lt;p&gt;I am &lt;strong&gt;learning&lt;/strong&gt; HTML.&lt;/p&gt;</code>', '<code>&lt;p&gt;I am &lt;strong&gt;learning&lt;/strong&gt; HTML.&lt;/p&gt;</code>', '<code>&lt;p&gt;I am &lt;strong&gt;learning&lt;/strong&gt; HTML.&lt;/p&gt;</code>'), L('<code>&lt;hr&gt;</code> — без закривального тегу.', '<code>&lt;hr&gt;</code> — без закрывающего тега.', '<code>&lt;hr&gt;</code> has no closing tag.')],
        starter: '\n',
        solution: '<p>I am <strong>learning</strong> HTML.</p>\n<hr>\n<p>It is <em>really</em> fun!</p>',
        hint: L('Порядок: <code>p</code> → <code>hr</code> → <code>p</code>.', 'Порядок: <code>p</code> → <code>hr</code> → <code>p</code>.', 'Order: <code>p</code> → <code>hr</code> → <code>p</code>.'),
        check: function (doc) { var ps = doc.querySelectorAll('p'); var hr = doc.querySelector('hr'); if (ps.length < 2 || !hr) return false; var s = ps[0].querySelector('strong'), e = ps[1].querySelector('em'); return !!(s && s.textContent.trim() && e && e.textContent.trim()) && (ps[0].compareDocumentPosition(hr) & 4) && (hr.compareDocumentPosition(ps[1]) & 4); }
      },
      quiz: { q: L('Який тег означає «важливий текст»?', 'Какой тег означает «важный текст»?', 'Which tag means “important text”?'), options: ['<b>', '<strong>', '<big>'], answer: 1, explain: L('<code>strong</code> — за змістом, <code>b</code> — лише вигляд.', '<code>strong</code> — по смыслу, <code>b</code> — только вид.', '<code>strong</code> is semantic, <code>b</code> is just looks.') },
      ref: [{ code: '<p> <br> <hr>', d: L('абзац, перенос, лінія', 'абзац, перенос, линия', 'paragraph, break, rule') }, { code: '<strong> <em> <mark>', d: L('важливо, наголос, маркер', 'важно, ударение, маркер', 'important, emphasis, highlight') }]
    },
    {
      id: 'links', chapter: CH2,
      title: L('Посилання', 'Ссылки', 'Links'),
      theory: L(
        `<p>Посилання — основа інтернету. Тег <code>&lt;a&gt;</code> з атрибутом <code>href</code>:</p>
<pre class="inline-code">&lt;a href="https://wikipedia.org"&gt;Wikipedia&lt;/a&gt;</pre>
<p><b>Атрибути</b> — додаткові налаштування тегу: <code>&lt;тег атрибут="значення"&gt;</code>.</p>
<ul><li><b>Абсолютне</b> посилання — повна адреса: <code>https://...</code></li><li><b>Відносне</b> — до файлу на тому ж сайті: <code>about.html</code>, <code>../img/cat.png</code></li><li><b>Якір</b> — до місця на сторінці: <code>href="#contacts"</code> веде до елемента з <code>id="contacts"</code></li><li><code>mailto:</code> і <code>tel:</code> — лист і дзвінок</li></ul>
<p><code>target="_blank"</code> відкриває посилання в новій вкладці (разом з ним додають <code>rel="noopener"</code> для безпеки).</p>`,
        `<p>Ссылки — основа интернета. Тег <code>&lt;a&gt;</code> с атрибутом <code>href</code>:</p>
<pre class="inline-code">&lt;a href="https://wikipedia.org"&gt;Wikipedia&lt;/a&gt;</pre>
<p><b>Атрибуты</b> — дополнительные настройки тега: <code>&lt;тег атрибут="значение"&gt;</code>.</p>
<ul><li><b>Абсолютная</b> ссылка — полный адрес: <code>https://...</code></li><li><b>Относительная</b> — на файл того же сайта: <code>about.html</code>, <code>../img/cat.png</code></li><li><b>Якорь</b> — на место на странице: <code>href="#contacts"</code> ведёт к элементу с <code>id="contacts"</code></li><li><code>mailto:</code> и <code>tel:</code> — письмо и звонок</li></ul>
<p><code>target="_blank"</code> открывает ссылку в новой вкладке (вместе с ним добавляют <code>rel="noopener"</code> для безопасности).</p>`,
        `<p>Links are the foundation of the web. The <code>&lt;a&gt;</code> tag with an <code>href</code> attribute:</p>
<pre class="inline-code">&lt;a href="https://wikipedia.org"&gt;Wikipedia&lt;/a&gt;</pre>
<p><b>Attributes</b> are extra settings of a tag: <code>&lt;tag attribute="value"&gt;</code>.</p>
<ul><li>An <b>absolute</b> link is a full address: <code>https://...</code></li><li>A <b>relative</b> link points to a file on the same site: <code>about.html</code>, <code>../img/cat.png</code></li><li>An <b>anchor</b> points to a spot on the page: <code>href="#contacts"</code> goes to the element with <code>id="contacts"</code></li><li><code>mailto:</code> and <code>tel:</code> — email and phone</li></ul>
<p><code>target="_blank"</code> opens the link in a new tab (add <code>rel="noopener"</code> with it for security).</p>`),
      why: L(`<p>Текст посилання має пояснювати, <b>куди</b> воно веде. «Документація Python» краще за «натисніть тут»: пошуковики використовують цей текст, а незрячі користувачі часто слухають список посилань без контексту.</p>`,
        `<p>Текст ссылки должен объяснять, <b>куда</b> она ведёт. «Документация Python» лучше, чем «нажмите здесь»: поисковики используют этот текст, а незрячие пользователи часто слушают список ссылок без контекста.</p>`,
        `<p>Link text should explain <b>where</b> it leads. “Python documentation” beats “click here”: search engines use the text, and blind users often hear a list of links without context.</p>`),
      mistakes: L(`<ul><li><code>href="www.site.com"</code> без <code>https://</code> — браузер вважатиме це відносним шляхом.</li><li>Забути лапки навколо значення атрибута.</li></ul>`,
        `<ul><li><code>href="www.site.com"</code> без <code>https://</code> — браузер посчитает это относительным путём.</li><li>Забыть кавычки вокруг значения атрибута.</li></ul>`,
        `<ul><li><code>href="www.site.com"</code> without <code>https://</code> — the browser treats it as a relative path.</li><li>Forgetting quotes around the attribute value.</li></ul>`),
      examples: [
        { title: L('Зовнішнє', 'Внешняя', 'External'), code: '<p>Read more on <a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN</a>.</p>', note: L('Відкриється в новій вкладці.', 'Откроется в новой вкладке.', 'Opens in a new tab.') },
        { title: L('Якорі', 'Якоря', 'Anchors'), code: '<a href="#contacts">Go to contacts ↓</a>\n<p style="height:400px">Lots of content…</p>\n<h2 id="contacts">Contacts</h2>\n<a href="#top">Back to top ↑</a>', note: L('Клікни — сторінка прокрутиться до заголовка.', 'Кликни — страница прокрутится к заголовку.', 'Click — the page scrolls to the heading.') },
        { title: 'mailto / tel', code: '<p>Email: <a href="mailto:hello@example.com">hello@example.com</a></p>\n<p>Phone: <a href="tel:+380441234567">+38 044 123 45 67</a></p>', note: L('На телефоні відкриється пошта або дзвінок.', 'На телефоне откроется почта или звонок.', 'On a phone these open mail or the dialler.') },
        { title: L('Навігація', 'Навигация', 'Navigation'), code: '<nav>\n  <a href="index.html">Home</a> |\n  <a href="about.html">About</a> |\n  <a href="blog/">Blog</a>\n</nav>', note: L('Відносні посилання між сторінками сайту.', 'Относительные ссылки между страницами сайта.', 'Relative links between pages of a site.') }
      ],
      task: {
        text: L('Створи посилання на <code>https://wikipedia.org</code> з текстом <code>Wikipedia</code>, що відкривається в новій вкладці. Нижче — заголовок <code>h2</code> з <code>id="faq"</code> і посилання-якір на нього з текстом <code>FAQ</code> (розмісти якір вище заголовка).', 'Создай ссылку на <code>https://wikipedia.org</code> с текстом <code>Wikipedia</code>, открывающуюся в новой вкладке. Ниже — заголовок <code>h2</code> с <code>id="faq"</code> и ссылка-якорь на него с текстом <code>FAQ</code> (размести якорь выше заголовка).', 'Create a link to <code>https://wikipedia.org</code> with text <code>Wikipedia</code> that opens in a new tab. Below it, an <code>h2</code> with <code>id="faq"</code>, and an anchor link to it with text <code>FAQ</code> (place the anchor above the heading).'),
        how: [L('<code>&lt;a href="https://wikipedia.org" target="_blank"&gt;Wikipedia&lt;/a&gt;</code>', '<code>&lt;a href="https://wikipedia.org" target="_blank"&gt;Wikipedia&lt;/a&gt;</code>', '<code>&lt;a href="https://wikipedia.org" target="_blank"&gt;Wikipedia&lt;/a&gt;</code>'), L('<code>&lt;a href="#faq"&gt;FAQ&lt;/a&gt;</code> і <code>&lt;h2 id="faq"&gt;...&lt;/h2&gt;</code>', '<code>&lt;a href="#faq"&gt;FAQ&lt;/a&gt;</code> и <code>&lt;h2 id="faq"&gt;...&lt;/h2&gt;</code>', '<code>&lt;a href="#faq"&gt;FAQ&lt;/a&gt;</code> and <code>&lt;h2 id="faq"&gt;...&lt;/h2&gt;</code>')],
        starter: '\n',
        solution: '<a href="https://wikipedia.org" target="_blank" rel="noopener">Wikipedia</a>\n<p><a href="#faq">FAQ</a></p>\n<h2 id="faq">Frequently asked questions</h2>',
        hint: L('У <code>href</code> якоря перед ім’ям стоїть <code>#</code>, а в <code>id</code> — ні.', 'В <code>href</code> якоря перед именем стоит <code>#</code>, а в <code>id</code> — нет.', 'The anchor’s <code>href</code> has <code>#</code> before the name; the <code>id</code> doesn’t.'),
        check: function (doc) { var links = Array.prototype.slice.call(doc.querySelectorAll('a[href]')); var w = links.find(function (a) { return /wikipedia\.org/.test(a.getAttribute('href')); }); var f = links.find(function (a) { return a.getAttribute('href') === '#faq'; }); var h = doc.querySelector('h2#faq'); return !!(w && w.textContent.trim() === 'Wikipedia' && w.getAttribute('target') === '_blank' && f && f.textContent.trim() === 'FAQ' && h && (f.compareDocumentPosition(h) & 4)); }
      },
      quiz: { q: L('Куди веде <code>href="#top"</code>?', 'Куда ведёт <code>href="#top"</code>?', 'Where does <code>href="#top"</code> lead?'), options: [L('на сайт top.com', 'на сайт top.com', 'to the site top.com'), L('до елемента з id="top"', 'к элементу с id="top"', 'to the element with id="top"'), L('у файл top.html', 'в файл top.html', 'to the file top.html')], answer: 1, explain: L('# — якір усередині сторінки.', '# — якорь внутри страницы.', '# is an in-page anchor.') },
      ref: [{ code: '<a href="url">', d: L('посилання', 'ссылка', 'link') }, { code: 'href="#id"', d: L('якір', 'якорь', 'anchor') }, { code: 'target="_blank"', d: L('нова вкладка', 'новая вкладка', 'new tab') }]
    },
    {
      id: 'images', chapter: CH2,
      title: L('Зображення', 'Изображения', 'Images'),
      theory: L(
        `<p>Картинку вставляє порожній тег <code>&lt;img&gt;</code>:</p>
<pre class="inline-code">&lt;img src="cat.jpg" alt="Ginger cat sleeping" width="300"&gt;</pre>
<ul><li><code>src</code> — адреса файлу (відносна або повна URL)</li><li><code>alt</code> — <b>текстовий опис</b>: його читають незрячі, бачать при помилці завантаження, ним користуються пошуковики. Обов’язковий!</li><li><code>width</code> / <code>height</code> — розміри в пікселях (краще задавати один або обидва, щоб сторінка не «стрибала» при завантаженні)</li><li><code>loading="lazy"</code> — завантажувати, коли картинка близько до екрана</li></ul>
<p>Картинку з підписом обгортають у <code>&lt;figure&gt;</code> з <code>&lt;figcaption&gt;</code>.</p>
<p>Формати: <b>JPG</b> — фото, <b>PNG</b> — з прозорістю, <b>SVG</b> — векторні іконки, <b>WebP</b> — сучасний легкий формат.</p>`,
        `<p>Картинку вставляет пустой тег <code>&lt;img&gt;</code>:</p>
<pre class="inline-code">&lt;img src="cat.jpg" alt="Ginger cat sleeping" width="300"&gt;</pre>
<ul><li><code>src</code> — адрес файла (относительный или полный URL)</li><li><code>alt</code> — <b>текстовое описание</b>: его читают незрячие, видят при ошибке загрузки, им пользуются поисковики. Обязателен!</li><li><code>width</code> / <code>height</code> — размеры в пикселях (лучше задавать один или оба, чтобы страница не «прыгала» при загрузке)</li><li><code>loading="lazy"</code> — загружать, когда картинка близко к экрану</li></ul>
<p>Картинку с подписью оборачивают в <code>&lt;figure&gt;</code> с <code>&lt;figcaption&gt;</code>.</p>
<p>Форматы: <b>JPG</b> — фото, <b>PNG</b> — с прозрачностью, <b>SVG</b> — векторные иконки, <b>WebP</b> — современный лёгкий формат.</p>`,
        `<p>An image is inserted with the void <code>&lt;img&gt;</code> tag:</p>
<pre class="inline-code">&lt;img src="cat.jpg" alt="Ginger cat sleeping" width="300"&gt;</pre>
<ul><li><code>src</code> — the file address (relative or full URL)</li><li><code>alt</code> — a <b>text description</b>: read by screen readers, shown if loading fails, used by search engines. Required!</li><li><code>width</code> / <code>height</code> — size in pixels (set one or both so the page doesn’t jump while loading)</li><li><code>loading="lazy"</code> — load when the image is near the screen</li></ul>
<p>An image with a caption is wrapped in <code>&lt;figure&gt;</code> with a <code>&lt;figcaption&gt;</code>.</p>
<p>Formats: <b>JPG</b> for photos, <b>PNG</b> with transparency, <b>SVG</b> for vector icons, <b>WebP</b> — a modern lightweight format.</p>`),
      why: L(`<p>Чому <code>alt</code> такий важливий? Мільйони людей користуються екранними читачами. Без <code>alt</code> вони почують лише «зображення», і не дізнаються, що там. До того ж Google не бачить картинок — лише їхні описи.</p>`,
        `<p>Почему <code>alt</code> так важен? Миллионы людей пользуются экранными чтецами. Без <code>alt</code> они услышат лишь «изображение» и не узнают, что там. К тому же Google не видит картинок — только их описания.</p>`,
        `<p>Why is <code>alt</code> so important? Millions of people use screen readers. Without <code>alt</code> they just hear “image” and never learn what’s there. Also, Google can’t see pictures — only their descriptions.</p>`),
      mistakes: L(`<ul><li><code>alt="image"</code> або <code>alt="photo.jpg"</code> — це не опис. Пиши, що зображено.</li><li>Задавати обидва розміри не в пропорції — картинка розтягнеться.</li><li>Додавати закривальний тег <code>&lt;/img&gt;</code> — його не існує.</li></ul>`,
        `<ul><li><code>alt="image"</code> или <code>alt="photo.jpg"</code> — это не описание. Пиши, что изображено.</li><li>Задавать оба размера не в пропорции — картинка растянется.</li><li>Добавлять закрывающий тег <code>&lt;/img&gt;</code> — его не существует.</li></ul>`,
        `<ul><li><code>alt="image"</code> or <code>alt="photo.jpg"</code> isn’t a description. Say what’s shown.</li><li>Setting both sizes out of proportion — the image stretches.</li><li>Adding a closing <code>&lt;/img&gt;</code> — it doesn’t exist.</li></ul>`),
      examples: [
        { title: L('Зображення', 'Изображение', 'Image'), code: '<img src="https://picsum.photos/id/237/300/200" alt="Black puppy looking up" width="300">', note: L('Фото з сервісу picsum.photos.', 'Фото с сервиса picsum.photos.', 'A photo from picsum.photos.') },
        { title: 'figure', code: '<figure>\n  <img src="https://picsum.photos/id/1015/400/220" alt="River between mountains" width="400">\n  <figcaption>Fig. 1 — A river valley in Norway</figcaption>\n</figure>', note: L('Підпис семантично пов’язаний з картинкою.', 'Подпись семантически связана с картинкой.', 'The caption is semantically tied to the image.') },
        { title: L('Битий файл', 'Битый файл', 'Broken file'), code: '<img src="missing.png" alt="Company logo" width="200">\n<p>If the file is missing, the browser shows the alt text.</p>', note: L('Ось навіщо alt — замість порожнечі видно опис.', 'Вот зачем alt — вместо пустоты видно описание.', 'This is why alt matters — you see the description instead of nothing.') },
        { title: L('Картинка-посилання', 'Картинка-ссылка', 'Image link'), code: '<a href="https://picsum.photos" target="_blank">\n  <img src="https://picsum.photos/id/1025/200/140" alt="Pug wrapped in a blanket" loading="lazy">\n</a>', note: L('Картинку можна загорнути в посилання.', 'Картинку можно обернуть в ссылку.', 'An image can be wrapped in a link.') }
      ],
      task: {
        text: L('Додай елемент <code>&lt;figure&gt;</code>: усередині — зображення з будь-яким <code>src</code>, змістовним <code>alt</code> (не менше 5 символів) і <code>width="250"</code>, а під ним <code>&lt;figcaption&gt;</code> з підписом.', 'Добавь элемент <code>&lt;figure&gt;</code>: внутри — изображение с любым <code>src</code>, содержательным <code>alt</code> (не менее 5 символов) и <code>width="250"</code>, а под ним <code>&lt;figcaption&gt;</code> с подписью.', 'Add a <code>&lt;figure&gt;</code>: inside it an image with any <code>src</code>, a meaningful <code>alt</code> (at least 5 characters) and <code>width="250"</code>, followed by a <code>&lt;figcaption&gt;</code>.'),
        how: [L('Можеш взяти <code>src="https://picsum.photos/250"</code>.', 'Можешь взять <code>src="https://picsum.photos/250"</code>.', 'You can use <code>src="https://picsum.photos/250"</code>.'), L('<code>figcaption</code> — після <code>img</code>, усередині <code>figure</code>.', '<code>figcaption</code> — после <code>img</code>, внутри <code>figure</code>.', '<code>figcaption</code> goes after <code>img</code>, inside <code>figure</code>.')],
        starter: '\n',
        solution: '<figure>\n  <img src="https://picsum.photos/250" alt="A random landscape photo" width="250">\n  <figcaption>My favourite view</figcaption>\n</figure>',
        hint: L('Атрибути пишуться в одному тегу <code>img</code> через пробіл.', 'Атрибуты пишутся в одном теге <code>img</code> через пробел.', 'Attributes go in the same <code>img</code> tag separated by spaces.'),
        check: function (doc) { var f = doc.querySelector('figure'); if (!f) return false; var img = f.querySelector('img[src]'); var cap = f.querySelector('figcaption'); return !!(img && (img.getAttribute('alt') || '').trim().length >= 5 && img.getAttribute('width') === '250' && cap && cap.textContent.trim()); }
      },
      quiz: { q: L('Навіщо атрибут <code>alt</code>?', 'Зачем атрибут <code>alt</code>?', 'What is <code>alt</code> for?'), options: [L('задає розмір', 'задаёт размер', 'sets the size'), L('текстовий опис зображення', 'текстовое описание изображения', 'a text description of the image'), L('адреса файлу', 'адрес файла', 'the file address')], answer: 1, explain: L('Для доступності, SEO і при помилці завантаження.', 'Для доступности, SEO и при ошибке загрузки.', 'For accessibility, SEO and failed loads.') },
      ref: [{ code: '<img src="" alt="">', d: L('зображення', 'изображение', 'image') }, { code: '<figure><figcaption>', d: L('картинка з підписом', 'картинка с подписью', 'captioned image') }]
    },
    {
      id: 'lists', chapter: CH2,
      title: L('Списки', 'Списки', 'Lists'),
      theory: L(
        `<p>HTML має три види списків:</p>
<ul><li><code>&lt;ul&gt;</code> — <b>маркований</b> (unordered): порядок не важливий</li><li><code>&lt;ol&gt;</code> — <b>нумерований</b> (ordered): порядок важливий. Атрибути: <code>start="5"</code>, <code>reversed</code>, <code>type="A"</code></li><li><code>&lt;dl&gt;</code> — <b>список визначень</b>: <code>&lt;dt&gt;</code> термін, <code>&lt;dd&gt;</code> пояснення</li></ul>
<p>Пункти <code>ul</code>/<code>ol</code> — це <code>&lt;li&gt;</code> (list item). Списки можна вкладати: новий <code>&lt;ul&gt;</code> пишуть <b>всередині</b> <code>&lt;li&gt;</code>.</p>
<pre class="inline-code">&lt;ul&gt;
  &lt;li&gt;Frontend
    &lt;ul&gt;&lt;li&gt;HTML&lt;/li&gt;&lt;li&gt;CSS&lt;/li&gt;&lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</pre>`,
        `<p>В HTML три вида списков:</p>
<ul><li><code>&lt;ul&gt;</code> — <b>маркированный</b> (unordered): порядок не важен</li><li><code>&lt;ol&gt;</code> — <b>нумерованный</b> (ordered): порядок важен. Атрибуты: <code>start="5"</code>, <code>reversed</code>, <code>type="A"</code></li><li><code>&lt;dl&gt;</code> — <b>список определений</b>: <code>&lt;dt&gt;</code> термин, <code>&lt;dd&gt;</code> пояснение</li></ul>
<p>Пункты <code>ul</code>/<code>ol</code> — это <code>&lt;li&gt;</code> (list item). Списки можно вкладывать: новый <code>&lt;ul&gt;</code> пишут <b>внутри</b> <code>&lt;li&gt;</code>.</p>
<pre class="inline-code">&lt;ul&gt;
  &lt;li&gt;Frontend
    &lt;ul&gt;&lt;li&gt;HTML&lt;/li&gt;&lt;li&gt;CSS&lt;/li&gt;&lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</pre>`,
        `<p>HTML has three kinds of lists:</p>
<ul><li><code>&lt;ul&gt;</code> — <b>unordered</b>: order doesn’t matter</li><li><code>&lt;ol&gt;</code> — <b>ordered</b>: order matters. Attributes: <code>start="5"</code>, <code>reversed</code>, <code>type="A"</code></li><li><code>&lt;dl&gt;</code> — a <b>description list</b>: <code>&lt;dt&gt;</code> term, <code>&lt;dd&gt;</code> description</li></ul>
<p>Items of <code>ul</code>/<code>ol</code> are <code>&lt;li&gt;</code> (list item). Lists can be nested: put a new <code>&lt;ul&gt;</code> <b>inside</b> an <code>&lt;li&gt;</code>.</p>
<pre class="inline-code">&lt;ul&gt;
  &lt;li&gt;Frontend
    &lt;ul&gt;&lt;li&gt;HTML&lt;/li&gt;&lt;li&gt;CSS&lt;/li&gt;&lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</pre>`),
      why: L(`<p>Меню сайту, кроки рецепта, характеристики товару, навігація — це все списки. Справжній список (а не рядки з тире) дозволяє екранному читачу сказати «список з 5 пунктів», а CSS — легко перетворити його на горизонтальне меню.</p>`,
        `<p>Меню сайта, шаги рецепта, характеристики товара, навигация — это всё списки. Настоящий список (а не строки с тире) позволяет экранному чтецу сказать «список из 5 пунктов», а CSS — легко превратить его в горизонтальное меню.</p>`,
        `<p>Site menus, recipe steps, product specs, navigation — they’re all lists. A real list (not lines with dashes) lets a screen reader say “list of 5 items” and lets CSS turn it into a horizontal menu.</p>`),
      mistakes: L(`<ul><li>Текст напряму в <code>&lt;ul&gt;</code> без <code>&lt;li&gt;</code> — неправильно.</li><li>Вкладений список поза <code>&lt;li&gt;</code> (між двома <code>li</code>) — невалідно.</li></ul>`,
        `<ul><li>Текст напрямую в <code>&lt;ul&gt;</code> без <code>&lt;li&gt;</code> — неправильно.</li><li>Вложенный список вне <code>&lt;li&gt;</code> (между двумя <code>li</code>) — невалидно.</li></ul>`,
        `<ul><li>Text directly inside <code>&lt;ul&gt;</code> without <code>&lt;li&gt;</code> — wrong.</li><li>A nested list outside an <code>&lt;li&gt;</code> (between two <code>li</code>s) — invalid.</li></ul>`),
      examples: [
        { title: 'ul', code: '<h3>Shopping</h3>\n<ul>\n  <li>Milk</li>\n  <li>Bread</li>\n  <li>Apples</li>\n</ul>', note: L('Порядок не важливий.', 'Порядок не важен.', 'Order doesn’t matter.') },
        { title: 'ol', code: '<h3>How to make tea</h3>\n<ol>\n  <li>Boil water</li>\n  <li>Add a tea bag</li>\n  <li>Pour the water</li>\n</ol>\n<ol start="10" reversed>\n  <li>Ten</li><li>Nine</li><li>Eight</li>\n</ol>', note: L('<code>start</code> і <code>reversed</code> керують нумерацією.', '<code>start</code> и <code>reversed</code> управляют нумерацией.', '<code>start</code> and <code>reversed</code> control numbering.') },
        { title: L('Вкладений', 'Вложенный', 'Nested'), code: '<ul>\n  <li>Frontend\n    <ul>\n      <li>HTML</li>\n      <li>CSS</li>\n      <li>JavaScript</li>\n    </ul>\n  </li>\n  <li>Backend\n    <ol>\n      <li>Python</li>\n      <li>Go</li>\n    </ol>\n  </li>\n</ul>', note: L('Вкладений список — усередині <code>li</code>.', 'Вложенный список — внутри <code>li</code>.', 'The nested list goes inside the <code>li</code>.') },
        { title: 'dl', code: '<dl>\n  <dt>HTML</dt>\n  <dd>The structure of a page</dd>\n  <dt>CSS</dt>\n  <dd>The look of a page</dd>\n</dl>', note: L('Словник термінів.', 'Словарь терминов.', 'A glossary of terms.') }
      ],
      task: {
        text: L('Створи <b>нумерований</b> список з трьома кроками ранку. У другому пункті зроби <b>вкладений маркований</b> список з двох пунктів.', 'Создай <b>нумерованный</b> список из трёх шагов утра. Во втором пункте сделай <b>вложенный маркированный</b> список из двух пунктов.', 'Create an <b>ordered</b> list of three morning steps. In the second item add a <b>nested unordered</b> list of two items.'),
        how: [L('<code>&lt;ol&gt;</code> з трьома <code>&lt;li&gt;</code>.', '<code>&lt;ol&gt;</code> с тремя <code>&lt;li&gt;</code>.', '<code>&lt;ol&gt;</code> with three <code>&lt;li&gt;</code>.'), L('У другому <code>li</code>: текст, а потім <code>&lt;ul&gt;</code> з двома <code>li</code>.', 'Во втором <code>li</code>: текст, а затем <code>&lt;ul&gt;</code> с двумя <code>li</code>.', 'In the second <code>li</code>: text, then a <code>&lt;ul&gt;</code> with two <code>li</code>s.')],
        starter: '\n',
        solution: '<ol>\n  <li>Wake up</li>\n  <li>Breakfast\n    <ul>\n      <li>Tea</li>\n      <li>Toast</li>\n    </ul>\n  </li>\n  <li>Go to school</li>\n</ol>',
        hint: L('Вкладений <code>&lt;ul&gt;</code> закривається перед <code>&lt;/li&gt;</code> другого пункту.', 'Вложенный <code>&lt;ul&gt;</code> закрывается перед <code>&lt;/li&gt;</code> второго пункта.', 'The nested <code>&lt;ul&gt;</code> closes before the second item’s <code>&lt;/li&gt;</code>.'),
        check: function (doc) { var ol = doc.querySelector('ol'); if (!ol) return false; var items = ol.querySelectorAll(':scope > li'); if (items.length !== 3) return false; var inner = items[1].querySelector(':scope > ul'); return !!inner && inner.querySelectorAll(':scope > li').length === 2; }
      },
      quiz: { q: L('Де має бути вкладений список?', 'Где должен быть вложенный список?', 'Where must a nested list go?'), options: [L('між двома li', 'между двумя li', 'between two li'), L('всередині li', 'внутри li', 'inside an li'), L('після закриття ul', 'после закрытия ul', 'after closing the ul')], answer: 1, explain: L('Він належить конкретному пункту.', 'Он принадлежит конкретному пункту.', 'It belongs to a specific item.') },
      ref: [{ code: '<ul><li>', d: L('маркований список', 'маркированный список', 'unordered list') }, { code: '<ol start reversed>', d: L('нумерований список', 'нумерованный список', 'ordered list') }, { code: '<dl><dt><dd>', d: L('список визначень', 'список определений', 'description list') }]
    },
    {
      id: 'tables', chapter: CH2,
      title: L('Таблиці', 'Таблицы', 'Tables'),
      theory: L(
        `<p>Таблиця будується з рядків і клітинок:</p>
<table class="mini"><tr><td><code>&lt;table&gt;</code></td><td>уся таблиця</td></tr><tr><td><code>&lt;caption&gt;</code></td><td>назва таблиці</td></tr><tr><td><code>&lt;thead&gt; &lt;tbody&gt; &lt;tfoot&gt;</code></td><td>шапка, тіло, підсумок</td></tr><tr><td><code>&lt;tr&gt;</code></td><td>рядок</td></tr><tr><td><code>&lt;th&gt;</code></td><td>клітинка-заголовок</td></tr><tr><td><code>&lt;td&gt;</code></td><td>звичайна клітинка</td></tr></table>
<p><code>colspan="2"</code> — клітинка займає дві колонки, <code>rowspan="2"</code> — два рядки.</p>
<div class="tip">⚠️ Таблиці — для <b>табличних даних</b> (розклад, ціни, результати). Не використовуй їх для розміщення блоків сторінки — для цього є CSS Flexbox і Grid.</div>`,
        `<p>Таблица строится из строк и ячеек:</p>
<table class="mini"><tr><td><code>&lt;table&gt;</code></td><td>вся таблица</td></tr><tr><td><code>&lt;caption&gt;</code></td><td>название таблицы</td></tr><tr><td><code>&lt;thead&gt; &lt;tbody&gt; &lt;tfoot&gt;</code></td><td>шапка, тело, итог</td></tr><tr><td><code>&lt;tr&gt;</code></td><td>строка</td></tr><tr><td><code>&lt;th&gt;</code></td><td>ячейка-заголовок</td></tr><tr><td><code>&lt;td&gt;</code></td><td>обычная ячейка</td></tr></table>
<p><code>colspan="2"</code> — ячейка занимает две колонки, <code>rowspan="2"</code> — две строки.</p>
<div class="tip">⚠️ Таблицы — для <b>табличных данных</b> (расписание, цены, результаты). Не используй их для размещения блоков страницы — для этого есть CSS Flexbox и Grid.</div>`,
        `<p>A table is built from rows and cells:</p>
<table class="mini"><tr><td><code>&lt;table&gt;</code></td><td>the whole table</td></tr><tr><td><code>&lt;caption&gt;</code></td><td>table title</td></tr><tr><td><code>&lt;thead&gt; &lt;tbody&gt; &lt;tfoot&gt;</code></td><td>head, body, footer</td></tr><tr><td><code>&lt;tr&gt;</code></td><td>row</td></tr><tr><td><code>&lt;th&gt;</code></td><td>header cell</td></tr><tr><td><code>&lt;td&gt;</code></td><td>data cell</td></tr></table>
<p><code>colspan="2"</code> makes a cell span two columns, <code>rowspan="2"</code> two rows.</p>
<div class="tip">⚠️ Tables are for <b>tabular data</b> (timetables, prices, results). Don’t use them for page layout — that’s what CSS Flexbox and Grid are for.</div>`),
      why: L(`<p><code>&lt;th&gt;</code> і <code>&lt;thead&gt;</code> пояснюють браузеру, що є заголовком: екранний читач, читаючи клітинку, каже «Ціна: 120», а при друці довгої таблиці шапка повторюється на кожній сторінці.</p>`,
        `<p><code>&lt;th&gt;</code> и <code>&lt;thead&gt;</code> объясняют браузеру, что является заголовком: экранный чтец, читая ячейку, говорит «Цена: 120», а при печати длинной таблицы шапка повторяется на каждой странице.</p>`,
        `<p><code>&lt;th&gt;</code> and <code>&lt;thead&gt;</code> tell the browser what’s a header: a screen reader announces a cell as “Price: 120”, and when printing a long table the header repeats on every page.</p>`),
      mistakes: L(`<ul><li>Різна кількість клітинок у рядках — таблиця «поїде».</li><li><code>&lt;td&gt;</code> напряму в <code>&lt;table&gt;</code> без <code>&lt;tr&gt;</code>.</li></ul>`,
        `<ul><li>Разное количество ячеек в строках — таблица «поедет».</li><li><code>&lt;td&gt;</code> напрямую в <code>&lt;table&gt;</code> без <code>&lt;tr&gt;</code>.</li></ul>`,
        `<ul><li>A different number of cells per row — the table breaks.</li><li><code>&lt;td&gt;</code> directly inside <code>&lt;table&gt;</code> without a <code>&lt;tr&gt;</code>.</li></ul>`),
      examples: [
        { title: L('Розклад', 'Расписание', 'Timetable'), code: '<table border="1" cellpadding="6">\n  <caption>Lessons</caption>\n  <thead>\n    <tr><th>Day</th><th>Subject</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Mon</td><td>Python</td></tr>\n    <tr><td>Tue</td><td>HTML</td></tr>\n  </tbody>\n</table>', note: L('<code>border</code> — тимчасово, оформлення робиться в CSS.', '<code>border</code> — временно, оформление делается в CSS.', '<code>border</code> is temporary; styling belongs in CSS.') },
        { title: 'colspan', code: '<table border="1" cellpadding="6">\n  <tr><th colspan="2">Match score</th></tr>\n  <tr><td>Dynamo</td><td>2</td></tr>\n  <tr><td>Shakhtar</td><td>1</td></tr>\n</table>', note: L('Заголовок на дві колонки.', 'Заголовок на две колонки.', 'A header across two columns.') },
        { title: 'rowspan', code: '<table border="1" cellpadding="6">\n  <tr><th rowspan="2">Morning</th><td>Math</td></tr>\n  <tr><td>Physics</td></tr>\n  <tr><th>Evening</th><td>Sport</td></tr>\n</table>', note: L('Клітинка на два рядки.', 'Ячейка на две строки.', 'A cell across two rows.') },
        { title: 'tfoot', code: '<table border="1" cellpadding="6">\n  <thead><tr><th>Item</th><th>Price</th></tr></thead>\n  <tbody>\n    <tr><td>Pen</td><td>15</td></tr>\n    <tr><td>Book</td><td>120</td></tr>\n  </tbody>\n  <tfoot><tr><th>Total</th><th>135</th></tr></tfoot>\n</table>', note: L('Підсумковий рядок.', 'Итоговая строка.', 'A totals row.') }
      ],
      task: {
        text: L('Створи таблицю з <code>&lt;thead&gt;</code> (заголовки <code>Name</code> і <code>Age</code> у <code>&lt;th&gt;</code>) та <code>&lt;tbody&gt;</code> з щонайменше трьома рядками даних. Додай <code>&lt;caption&gt;</code>.', 'Создай таблицу с <code>&lt;thead&gt;</code> (заголовки <code>Name</code> и <code>Age</code> в <code>&lt;th&gt;</code>) и <code>&lt;tbody&gt;</code> минимум с тремя строками данных. Добавь <code>&lt;caption&gt;</code>.', 'Create a table with a <code>&lt;thead&gt;</code> (headers <code>Name</code> and <code>Age</code> in <code>&lt;th&gt;</code>) and a <code>&lt;tbody&gt;</code> with at least three data rows. Add a <code>&lt;caption&gt;</code>.'),
        how: [L('<code>caption</code> — першим усередині <code>table</code>.', '<code>caption</code> — первым внутри <code>table</code>.', '<code>caption</code> goes first inside <code>table</code>.'), L('У кожному рядку <code>tbody</code> — по дві <code>td</code>.', 'В каждой строке <code>tbody</code> — по две <code>td</code>.', 'Each <code>tbody</code> row has two <code>td</code>s.')],
        starter: '<table border="1">\n  \n</table>\n',
        solution: '<table border="1">\n  <caption>Students</caption>\n  <thead>\n    <tr><th>Name</th><th>Age</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Ann</td><td>14</td></tr>\n    <tr><td>Max</td><td>15</td></tr>\n    <tr><td>Ira</td><td>13</td></tr>\n  </tbody>\n</table>',
        hint: L('Структура: table → caption → thead → tr → th, потім tbody → tr → td.', 'Структура: table → caption → thead → tr → th, затем tbody → tr → td.', 'Structure: table → caption → thead → tr → th, then tbody → tr → td.'),
        check: function (doc) { var t = doc.querySelector('table'); if (!t || !t.querySelector('caption')) return false; var th = Array.prototype.map.call(t.querySelectorAll('thead th'), function (x) { return x.textContent.trim(); }); var rows = t.querySelectorAll('tbody tr'); var ok = true; Array.prototype.forEach.call(rows, function (r) { if (r.querySelectorAll('td').length < 2) ok = false; }); return th.indexOf('Name') > -1 && th.indexOf('Age') > -1 && rows.length >= 3 && ok; }
      },
      quiz: { q: L('Який тег — клітинка-заголовок?', 'Какой тег — ячейка-заголовок?', 'Which tag is a header cell?'), options: ['<td>', '<th>', '<tr>'], answer: 1, explain: L('th — table header.', 'th — table header.', 'th — table header.') },
      ref: [{ code: '<table><tr><th><td>', d: L('таблиця', 'таблица', 'table') }, { code: 'colspan rowspan', d: L('об’єднання клітинок', 'объединение ячеек', 'merging cells') }]
    },
    {
      id: 'attrs', chapter: CH3,
      title: L('id, class, div і span', 'id, class, div и span', 'id, class, div and span'),
      theory: L(
        `<p>Два найважливіші атрибути, що є в будь-якого тегу:</p>
<ul><li><code>id="name"</code> — <b>унікальний</b> ідентифікатор елемента (на сторінці лише один такий)</li><li><code>class="a b"</code> — один або кілька <b>класів</b>, які можна давати багатьом елементам</li></ul>
<p>Вони потрібні, щоб CSS міг стилізувати, а JavaScript — знаходити елементи.</p>
<p>Універсальні контейнери без змісту:</p>
<ul><li><code>&lt;div&gt;</code> — <b>блочний</b>: займає всю ширину й починається з нового рядка</li><li><code>&lt;span&gt;</code> — <b>рядковий</b>: займає лише ширину свого тексту</li></ul>
<p>Інші атрибути: <code>title</code> (підказка при наведенні), <code>style</code> (вбудований CSS), <code>hidden</code> (сховати), <code>data-*</code> (свої дані для JS: <code>data-price="99"</code>).</p>`,
        `<p>Два самых важных атрибута, которые есть у любого тега:</p>
<ul><li><code>id="name"</code> — <b>уникальный</b> идентификатор элемента (на странице только один такой)</li><li><code>class="a b"</code> — один или несколько <b>классов</b>, которые можно давать многим элементам</li></ul>
<p>Они нужны, чтобы CSS мог стилизовать, а JavaScript — находить элементы.</p>
<p>Универсальные контейнеры без смысла:</p>
<ul><li><code>&lt;div&gt;</code> — <b>блочный</b>: занимает всю ширину и начинается с новой строки</li><li><code>&lt;span&gt;</code> — <b>строчный</b>: занимает только ширину своего текста</li></ul>
<p>Другие атрибуты: <code>title</code> (подсказка при наведении), <code>style</code> (встроенный CSS), <code>hidden</code> (скрыть), <code>data-*</code> (свои данные для JS: <code>data-price="99"</code>).</p>`,
        `<p>Two of the most important attributes every tag has:</p>
<ul><li><code>id="name"</code> — a <b>unique</b> identifier (only one per page)</li><li><code>class="a b"</code> — one or more <b>classes</b> that many elements can share</li></ul>
<p>They let CSS style elements and JavaScript find them.</p>
<p>Generic containers with no meaning:</p>
<ul><li><code>&lt;div&gt;</code> — <b>block</b>: takes the full width and starts on a new line</li><li><code>&lt;span&gt;</code> — <b>inline</b>: only as wide as its text</li></ul>
<p>Other attributes: <code>title</code> (hover tooltip), <code>style</code> (inline CSS), <code>hidden</code> (hide), <code>data-*</code> (your own data for JS: <code>data-price="99"</code>).</p>`),
      why: L(`<p><code>class</code> описує «який це елемент» (картка, кнопка, попередження), а <code>id</code> — «саме цей елемент». Завдяки класам можна написати стиль «картка» один раз і застосувати до сотні карток.</p>`,
        `<p><code>class</code> описывает «какой это элемент» (карточка, кнопка, предупреждение), а <code>id</code> — «именно этот элемент». Благодаря классам можно написать стиль «карточка» один раз и применить к сотне карточек.</p>`,
        `<p><code>class</code> describes “what kind of element” (card, button, warning), <code>id</code> means “this exact element”. Classes let you write a “card” style once and apply it to a hundred cards.</p>`),
      mistakes: L(`<ul><li>Однаковий <code>id</code> у кількох елементів — порушує правила і ламає JS.</li><li>Пробіли в імені класу означають <b>кілька</b> класів: <code>class="big red"</code> — це два класи.</li><li>Обгортати все в <code>div</code>, коли є семантичні теги.</li></ul>`,
        `<ul><li>Одинаковый <code>id</code> у нескольких элементов — нарушает правила и ломает JS.</li><li>Пробелы в имени класса означают <b>несколько</b> классов: <code>class="big red"</code> — это два класса.</li><li>Оборачивать всё в <code>div</code>, когда есть семантические теги.</li></ul>`,
        `<ul><li>The same <code>id</code> on several elements — breaks the rules and JS.</li><li>Spaces in a class name mean <b>several</b> classes: <code>class="big red"</code> is two classes.</li><li>Wrapping everything in <code>div</code>s when semantic tags exist.</li></ul>`),
      examples: [
        { title: 'div / span', code: '<div style="background:#e0e7ff;padding:10px">\n  This is a div with a <span style="color:crimson;font-weight:bold">red span</span> inside.\n</div>\n<div style="background:#fef3c7;padding:10px">Another div — new line</div>', note: L('div — блок на всю ширину, span — шматок тексту.', 'div — блок на всю ширину, span — кусок текста.', 'div is a full-width block, span a piece of text.') },
        { title: 'class', code: '<style>\n  .card { border: 2px solid #3b82f6; border-radius: 12px; padding: 10px; margin: 8px 0; }\n  .warning { background: #fee2e2; }\n</style>\n<div class="card">Card one</div>\n<div class="card warning">Card two (also a warning)</div>\n<div class="card">Card three</div>', note: L('Один стиль — багато елементів. Другий має два класи.', 'Один стиль — много элементов. У второго два класса.', 'One style, many elements. The second has two classes.') },
        { title: 'id', code: '<style>#hero { background: linear-gradient(90deg,#8b5cf6,#22d3ee); color: white; padding: 20px; }</style>\n<div id="hero">Unique hero block</div>\n<a href="#hero">Jump to hero</a>', note: L('id використовують і для якорів.', 'id используют и для якорей.', 'ids are also used for anchors.') },
        { title: 'title / data-*', code: '<p>Hover over <abbr title="HyperText Markup Language">HTML</abbr>.</p>\n<button data-price="99" data-currency="UAH">Buy</button>\n<p hidden>You cannot see me</p>', note: L('<code>data-*</code> зберігає дані для JavaScript.', '<code>data-*</code> хранит данные для JavaScript.', '<code>data-*</code> stores data for JavaScript.') }
      ],
      task: {
        text: L('Створи три елементи <code>div</code> з класом <code>card</code>. Другий також має мати клас <code>active</code> та <code>id="main"</code>. У першій картці виділи одне слово тегом <code>span</code> з класом <code>tag</code>.', 'Создай три элемента <code>div</code> с классом <code>card</code>. Второй также должен иметь класс <code>active</code> и <code>id="main"</code>. В первой карточке выдели одно слово тегом <code>span</code> с классом <code>tag</code>.', 'Create three <code>div</code>s with class <code>card</code>. The second must also have class <code>active</code> and <code>id="main"</code>. In the first card wrap one word in a <code>span</code> with class <code>tag</code>.'),
        how: [L('<code>&lt;div class="card"&gt;...&lt;/div&gt;</code>', '<code>&lt;div class="card"&gt;...&lt;/div&gt;</code>', '<code>&lt;div class="card"&gt;...&lt;/div&gt;</code>'), L('Другий: <code>&lt;div class="card active" id="main"&gt;</code>', 'Второй: <code>&lt;div class="card active" id="main"&gt;</code>', 'Second: <code>&lt;div class="card active" id="main"&gt;</code>')],
        starter: '\n',
        solution: '<div class="card">First <span class="tag">new</span> card</div>\n<div class="card active" id="main">Second card</div>\n<div class="card">Third card</div>',
        hint: L('Кілька класів пишуться в одному атрибуті через пробіл.', 'Несколько классов пишутся в одном атрибуте через пробел.', 'Multiple classes go in one attribute separated by a space.'),
        check: function (doc) { var cards = doc.querySelectorAll('div.card'); if (cards.length !== 3) return false; return cards[1].classList.contains('active') && cards[1].id === 'main' && !!cards[0].querySelector('span.tag') && cards[0].querySelector('span.tag').textContent.trim().length > 0; }
      },
      quiz: { q: L('Скільки елементів на сторінці можуть мати однаковий id?', 'Сколько элементов на странице могут иметь одинаковый id?', 'How many elements on a page may share an id?'), options: ['1', '2', L('скільки завгодно', 'сколько угодно', 'any number')], answer: 0, explain: L('id — унікальний.', 'id — уникальный.', 'An id is unique.') },
      ref: [{ code: 'id="x" class="a b"', d: L('ідентифікатор, класи', 'идентификатор, классы', 'identifier, classes') }, { code: '<div> <span>', d: L('блочний / рядковий контейнер', 'блочный / строчный контейнер', 'block / inline container') }]
    },
    {
      id: 'semantic', chapter: CH3,
      title: L('Семантична розмітка', 'Семантическая разметка', 'Semantic markup'),
      theory: L(
        `<p><b>Семантичні теги</b> описують роль частини сторінки:</p>
<table class="mini"><tr><td><code>&lt;header&gt;</code></td><td>шапка (логотип, меню)</td></tr><tr><td><code>&lt;nav&gt;</code></td><td>навігація</td></tr><tr><td><code>&lt;main&gt;</code></td><td>основний вміст (один на сторінці)</td></tr><tr><td><code>&lt;section&gt;</code></td><td>тематичний розділ із заголовком</td></tr><tr><td><code>&lt;article&gt;</code></td><td>самостійний матеріал: пост, новина, товар</td></tr><tr><td><code>&lt;aside&gt;</code></td><td>бічна панель, додаткова інформація</td></tr><tr><td><code>&lt;footer&gt;</code></td><td>підвал (контакти, копірайт)</td></tr></table>
<p>Візуально вони нічим не відрізняються від <code>div</code>, але несуть <b>зміст</b>. Типовий каркас: <code>header</code> → <code>nav</code> → <code>main</code> (з <code>section</code>/<code>article</code>) → <code>aside</code> → <code>footer</code>.</p>`,
        `<p><b>Семантические теги</b> описывают роль части страницы:</p>
<table class="mini"><tr><td><code>&lt;header&gt;</code></td><td>шапка (логотип, меню)</td></tr><tr><td><code>&lt;nav&gt;</code></td><td>навигация</td></tr><tr><td><code>&lt;main&gt;</code></td><td>основное содержимое (одно на странице)</td></tr><tr><td><code>&lt;section&gt;</code></td><td>тематический раздел с заголовком</td></tr><tr><td><code>&lt;article&gt;</code></td><td>самостоятельный материал: пост, новость, товар</td></tr><tr><td><code>&lt;aside&gt;</code></td><td>боковая панель, дополнительная информация</td></tr><tr><td><code>&lt;footer&gt;</code></td><td>подвал (контакты, копирайт)</td></tr></table>
<p>Визуально они ничем не отличаются от <code>div</code>, но несут <b>смысл</b>. Типичный каркас: <code>header</code> → <code>nav</code> → <code>main</code> (с <code>section</code>/<code>article</code>) → <code>aside</code> → <code>footer</code>.</p>`,
        `<p><b>Semantic tags</b> describe the role of a part of the page:</p>
<table class="mini"><tr><td><code>&lt;header&gt;</code></td><td>header (logo, menu)</td></tr><tr><td><code>&lt;nav&gt;</code></td><td>navigation</td></tr><tr><td><code>&lt;main&gt;</code></td><td>main content (one per page)</td></tr><tr><td><code>&lt;section&gt;</code></td><td>a thematic section with a heading</td></tr><tr><td><code>&lt;article&gt;</code></td><td>self-contained content: a post, news, a product</td></tr><tr><td><code>&lt;aside&gt;</code></td><td>sidebar, extra info</td></tr><tr><td><code>&lt;footer&gt;</code></td><td>footer (contacts, copyright)</td></tr></table>
<p>They look no different from a <code>div</code>, but carry <b>meaning</b>. A typical layout: <code>header</code> → <code>nav</code> → <code>main</code> (with <code>section</code>/<code>article</code>) → <code>aside</code> → <code>footer</code>.</p>`),
      why: L(`<p>Пошуковики краще ранжують сайти з правильною структурою, а екранні читачі дають кнопку «перейти до основного вмісту» саме завдяки <code>&lt;main&gt;</code>. Плюс код, де замість десятка <code>div</code> стоять <code>header</code>, <code>nav</code>, <code>footer</code>, набагато легше читати.</p>`,
        `<p>Поисковики лучше ранжируют сайты с правильной структурой, а экранные чтецы дают кнопку «перейти к основному содержимому» именно благодаря <code>&lt;main&gt;</code>. Плюс код, где вместо десятка <code>div</code> стоят <code>header</code>, <code>nav</code>, <code>footer</code>, гораздо легче читать.</p>`,
        `<p>Search engines rank well-structured sites better, and screen readers offer “skip to main content” thanks to <code>&lt;main&gt;</code>. Plus code with <code>header</code>, <code>nav</code>, <code>footer</code> instead of a dozen <code>div</code>s is far easier to read.</p>`),
      mistakes: L(`<ul><li>Кілька <code>&lt;main&gt;</code> на сторінці.</li><li><code>&lt;section&gt;</code> без заголовка — тоді краще звичайний <code>div</code>.</li></ul>`,
        `<ul><li>Несколько <code>&lt;main&gt;</code> на странице.</li><li><code>&lt;section&gt;</code> без заголовка — тогда лучше обычный <code>div</code>.</li></ul>`,
        `<ul><li>Several <code>&lt;main&gt;</code> elements on a page.</li><li>A <code>&lt;section&gt;</code> without a heading — use a plain <code>div</code> instead.</li></ul>`),
      examples: [
        { title: L('Каркас сайту', 'Каркас сайта', 'Site skeleton'), code: '<header>\n  <h1>My blog</h1>\n  <nav>\n    <a href="#">Home</a> |\n    <a href="#">Posts</a> |\n    <a href="#">Contacts</a>\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>First post</h2>\n    <p>Today I started learning HTML!</p>\n  </article>\n</main>\n<footer>© 2026 My blog</footer>', note: L('Типова структура будь-якого сайту.', 'Типичная структура любого сайта.', 'The typical structure of any site.') },
        { title: 'section', code: '<main>\n  <section>\n    <h2>Courses</h2>\n    <p>Python, JavaScript, HTML…</p>\n  </section>\n  <section>\n    <h2>Reviews</h2>\n    <p>“Great site!”</p>\n  </section>\n</main>', note: L('Розділи сторінки із заголовками.', 'Разделы страницы с заголовками.', 'Page sections with headings.') },
        { title: 'article + aside', code: '<main>\n  <article>\n    <h2>How to learn coding</h2>\n    <p>Practice every day…</p>\n  </article>\n  <aside>\n    <h3>Popular</h3>\n    <ul><li>Top 10 tips</li><li>Python vs JS</li></ul>\n  </aside>\n</main>', note: L('Бічна панель з додатковим вмістом.', 'Боковая панель с дополнительным содержимым.', 'A sidebar with extra content.') },
        { title: L('Div-суп (погано)', 'Div-суп (плохо)', 'Div soup (bad)'), code: '<div class="header">\n  <div class="title">My blog</div>\n</div>\n<div class="content">\n  <div class="post">Post…</div>\n</div>\n<div class="footer">© 2026</div>', note: L('Працює, але браузер не розуміє ролей блоків.', 'Работает, но браузер не понимает ролей блоков.', 'It works, but the browser doesn’t understand the blocks’ roles.') }
      ],
      task: {
        text: L('Збери каркас: <code>header</code> з <code>h1</code> і <code>nav</code> (щонайменше 2 посилання), <code>main</code> з двома <code>section</code> (кожна з <code>h2</code>), і <code>footer</code>.', 'Собери каркас: <code>header</code> с <code>h1</code> и <code>nav</code> (минимум 2 ссылки), <code>main</code> с двумя <code>section</code> (каждая с <code>h2</code>), и <code>footer</code>.', 'Build a skeleton: a <code>header</code> with an <code>h1</code> and a <code>nav</code> (at least 2 links), a <code>main</code> with two <code>section</code>s (each with an <code>h2</code>), and a <code>footer</code>.'),
        how: [L('Порядок: header → main → footer.', 'Порядок: header → main → footer.', 'Order: header → main → footer.'), L('У кожній section — свій <code>h2</code>.', 'В каждой section — свой <code>h2</code>.', 'Each section has its own <code>h2</code>.')],
        starter: '\n',
        solution: '<header>\n  <h1>My site</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#work">Work</a>\n  </nav>\n</header>\n<main>\n  <section id="about">\n    <h2>About</h2>\n    <p>Hello!</p>\n  </section>\n  <section id="work">\n    <h2>Work</h2>\n    <p>My projects</p>\n  </section>\n</main>\n<footer>© 2026</footer>',
        hint: L('<code>nav</code> — усередині <code>header</code>.', '<code>nav</code> — внутри <code>header</code>.', '<code>nav</code> goes inside <code>header</code>.'),
        check: function (doc) { var h = doc.querySelector('header'); var m = doc.querySelector('main'); var f = doc.querySelector('footer'); if (!h || !m || !f) return false; if (!h.querySelector('h1') || !h.querySelector('nav') || h.querySelectorAll('nav a').length < 2) return false; var secs = m.querySelectorAll('section'); if (secs.length < 2) return false; for (var i = 0; i < secs.length; i++) if (!secs[i].querySelector('h2')) return false; return true; }
      },
      quiz: { q: L('Скільки <code>&lt;main&gt;</code> може бути на сторінці?', 'Сколько <code>&lt;main&gt;</code> может быть на странице?', 'How many <code>&lt;main&gt;</code> elements can a page have?'), options: ['1', '2', L('скільки завгодно', 'сколько угодно', 'any number')], answer: 0, explain: L('Один основний вміст.', 'Одно основное содержимое.', 'One main content.') },
      ref: [{ code: '<header> <nav> <main> <footer>', d: L('каркас сторінки', 'каркас страницы', 'page skeleton') }, { code: '<section> <article> <aside>', d: L('розділ, стаття, бічна панель', 'раздел, статья, боковая панель', 'section, article, sidebar') }]
    },
    {
      id: 'forms', chapter: CH3,
      title: L('Форми та поля вводу', 'Формы и поля ввода', 'Forms and inputs'),
      theory: L(
        `<p>Форми збирають дані від користувача: реєстрація, пошук, замовлення.</p>
<pre class="inline-code">&lt;form action="/signup" method="post"&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input id="email" name="email" type="email" placeholder="you@mail.com"&gt;
  &lt;button type="submit"&gt;Sign up&lt;/button&gt;
&lt;/form&gt;</pre>
<ul><li><code>&lt;form&gt;</code> — контейнер; <code>action</code> — куди надсилати, <code>method</code> — як (<code>get</code>/<code>post</code>)</li><li><code>&lt;input&gt;</code> — поле; <code>type</code>: <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>date</code>, <code>color</code>, <code>range</code>, <code>checkbox</code>, <code>radio</code>, <code>file</code>…</li><li><code>name</code> — ім’я, під яким значення піде на сервер</li><li><code>&lt;label for="id"&gt;</code> — підпис, пов’язаний з полем; клік по ньому ставить курсор у поле</li></ul>`,
        `<p>Формы собирают данные от пользователя: регистрация, поиск, заказ.</p>
<pre class="inline-code">&lt;form action="/signup" method="post"&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input id="email" name="email" type="email" placeholder="you@mail.com"&gt;
  &lt;button type="submit"&gt;Sign up&lt;/button&gt;
&lt;/form&gt;</pre>
<ul><li><code>&lt;form&gt;</code> — контейнер; <code>action</code> — куда отправлять, <code>method</code> — как (<code>get</code>/<code>post</code>)</li><li><code>&lt;input&gt;</code> — поле; <code>type</code>: <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>date</code>, <code>color</code>, <code>range</code>, <code>checkbox</code>, <code>radio</code>, <code>file</code>…</li><li><code>name</code> — имя, под которым значение уйдёт на сервер</li><li><code>&lt;label for="id"&gt;</code> — подпись, связанная с полем; клик по ней ставит курсор в поле</li></ul>`,
        `<p>Forms collect data from users: sign-ups, search, orders.</p>
<pre class="inline-code">&lt;form action="/signup" method="post"&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input id="email" name="email" type="email" placeholder="you@mail.com"&gt;
  &lt;button type="submit"&gt;Sign up&lt;/button&gt;
&lt;/form&gt;</pre>
<ul><li><code>&lt;form&gt;</code> — the container; <code>action</code> — where to send, <code>method</code> — how (<code>get</code>/<code>post</code>)</li><li><code>&lt;input&gt;</code> — a field; <code>type</code>: <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>date</code>, <code>color</code>, <code>range</code>, <code>checkbox</code>, <code>radio</code>, <code>file</code>…</li><li><code>name</code> — the name the value is sent under</li><li><code>&lt;label for="id"&gt;</code> — a label tied to the field; clicking it focuses the field</li></ul>`),
      why: L(`<p>Правильний <code>type</code> дає безкоштовні бонуси: на телефоні <code>type="email"</code> показує клавіатуру з <code>@</code>, <code>type="number"</code> — цифрову, <code>type="date"</code> — календар. А <code>label</code> робить поле більшою ціллю для пальця й зрозумілим для екранних читачів.</p>`,
        `<p>Правильный <code>type</code> даёт бесплатные бонусы: на телефоне <code>type="email"</code> показывает клавиатуру с <code>@</code>, <code>type="number"</code> — цифровую, <code>type="date"</code> — календарь. А <code>label</code> делает поле большей целью для пальца и понятным для экранных чтецов.</p>`,
        `<p>The right <code>type</code> gives free bonuses: on phones <code>type="email"</code> shows a keyboard with <code>@</code>, <code>type="number"</code> a numeric one, <code>type="date"</code> a calendar. And <code>label</code> makes the field a bigger tap target and clear for screen readers.</p>`),
      mistakes: L(`<ul><li>Поле без <code>name</code> — його значення не надішлеться.</li><li>Підказка тільки в <code>placeholder</code> без <code>label</code> — коли почнеш писати, підказка зникне.</li><li><code>for</code> у label не збігається з <code>id</code> поля.</li></ul>`,
        `<ul><li>Поле без <code>name</code> — его значение не отправится.</li><li>Подсказка только в <code>placeholder</code> без <code>label</code> — когда начнёшь писать, подсказка исчезнет.</li><li><code>for</code> в label не совпадает с <code>id</code> поля.</li></ul>`,
        `<ul><li>A field without <code>name</code> — its value isn’t sent.</li><li>A hint only in <code>placeholder</code> without a <code>label</code> — it disappears once you type.</li><li>The label’s <code>for</code> doesn’t match the field’s <code>id</code>.</li></ul>`),
      examples: [
        { title: L('Вхід', 'Вход', 'Login'), code: '<form>\n  <label for="em">Email</label><br>\n  <input id="em" name="email" type="email" placeholder="you@mail.com"><br><br>\n  <label for="pw">Password</label><br>\n  <input id="pw" name="password" type="password"><br><br>\n  <button type="submit">Sign in</button>\n</form>', note: L('Клікни по підпису — курсор стрибне в поле.', 'Кликни по подписи — курсор прыгнет в поле.', 'Click a label — the cursor jumps into the field.') },
        { title: L('Типи полів', 'Типы полей', 'Input types'), code: '<form>\n  <input type="number" min="1" max="10" value="3"><br>\n  <input type="date"><br>\n  <input type="color" value="#3b82f6"><br>\n  <input type="range" min="0" max="100"><br>\n  <input type="file">\n</form>', note: L('Браузер сам малює зручні елементи.', 'Браузер сам рисует удобные элементы.', 'The browser draws handy controls for you.') },
        { title: 'checkbox / radio', code: '<form>\n  <label><input type="checkbox" name="news" checked> Subscribe</label><br>\n  <p>Level:</p>\n  <label><input type="radio" name="level" value="kid"> Beginner</label>\n  <label><input type="radio" name="level" value="pro"> Pro</label>\n</form>', note: L('Радіокнопки з однаковим <code>name</code> — одна група.', 'Радиокнопки с одинаковым <code>name</code> — одна группа.', 'Radio buttons with the same <code>name</code> form one group.') },
        { title: L('Пошук (GET)', 'Поиск (GET)', 'Search (GET)'), code: '<form action="https://www.google.com/search" method="get" target="_blank">\n  <input name="q" type="search" placeholder="Search Google">\n  <button>Go</button>\n</form>', note: L('Дані підуть в адресу: <code>?q=...</code>.', 'Данные уйдут в адрес: <code>?q=...</code>.', 'Data goes into the URL: <code>?q=...</code>.') }
      ],
      task: {
        text: L('Створи форму з полем імені (<code>type="text"</code>, <code>name="username"</code>), полем email (<code>type="email"</code>), полем пароля і кнопкою. Кожне поле повинно мати <code>id</code> і пов’язаний <code>&lt;label for="..."&gt;</code>.', 'Создай форму с полем имени (<code>type="text"</code>, <code>name="username"</code>), полем email (<code>type="email"</code>), полем пароля и кнопкой. Каждое поле должно иметь <code>id</code> и связанный <code>&lt;label for="..."&gt;</code>.', 'Create a form with a name field (<code>type="text"</code>, <code>name="username"</code>), an email field (<code>type="email"</code>), a password field and a button. Each field needs an <code>id</code> and a matching <code>&lt;label for="..."&gt;</code>.'),
        how: [L('<code>&lt;label for="u"&gt;Name&lt;/label&gt; &lt;input id="u" name="username" type="text"&gt;</code>', '<code>&lt;label for="u"&gt;Name&lt;/label&gt; &lt;input id="u" name="username" type="text"&gt;</code>', '<code>&lt;label for="u"&gt;Name&lt;/label&gt; &lt;input id="u" name="username" type="text"&gt;</code>'), L('Так само для email і password.', 'Так же для email и password.', 'Same for email and password.')],
        starter: '<form>\n  \n</form>\n',
        solution: '<form>\n  <label for="u">Name</label>\n  <input id="u" name="username" type="text">\n  <label for="e">Email</label>\n  <input id="e" name="email" type="email">\n  <label for="p">Password</label>\n  <input id="p" name="password" type="password">\n  <button type="submit">Create account</button>\n</form>',
        hint: L('Значення <code>for</code> має точно дорівнювати <code>id</code> поля.', 'Значение <code>for</code> должно точно равняться <code>id</code> поля.', 'The <code>for</code> value must exactly equal the field’s <code>id</code>.'),
        check: function (doc) { var f = doc.querySelector('form'); if (!f) return false; var need = ['input[type=text][name=username]', 'input[type=email]', 'input[type=password]']; for (var i = 0; i < need.length; i++) { var el = f.querySelector(need[i]); if (!el || !el.id || !f.querySelector('label[for="' + el.id + '"]')) return false; } return !!f.querySelector('button, input[type=submit]'); }
      },
      quiz: { q: L('Що робить атрибут <code>name</code> у полі?', 'Что делает атрибут <code>name</code> в поле?', 'What does the <code>name</code> attribute do on a field?'), options: [L('підпис над полем', 'подпись над полем', 'a label above the field'), L('ім’я, під яким значення надсилається', 'имя, под которым значение отправляется', 'the name the value is sent under'), L('підказка в полі', 'подсказка в поле', 'a hint inside the field')], answer: 1, explain: L('Без name поле не потрапить у дані форми.', 'Без name поле не попадёт в данные формы.', 'Without name the field isn’t included in the form data.') },
      ref: [{ code: '<form action method>', d: L('форма', 'форма', 'form') }, { code: '<input type name id>', d: L('поле вводу', 'поле ввода', 'input field') }, { code: '<label for="id">', d: L('підпис поля', 'подпись поля', 'field label') }]
    }
  ]);
})();
