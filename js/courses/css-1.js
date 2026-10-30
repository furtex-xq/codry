// CSS — частина 1. У кожного кроку є базовий HTML (html), до якого застосовується CSS учня.
(function () {
  const L = Codry.L;
  const CH1 = L('Основи CSS', 'Основы CSS', 'CSS basics');
  const CH2 = L('Блокова модель', 'Блочная модель', 'The box model');
  const CH3 = L('Селектори та каскад', 'Селекторы и каскад', 'Selectors and the cascade');

  Codry.steps('css', [
    {
      id: 'selectors', chapter: CH1,
      title: L('Правила, селектори та кольори', 'Правила, селекторы и цвета', 'Rules, selectors and colours'),
      html: '<h1>Codry</h1>\n<p>A regular paragraph.</p>\n<p class="note">A paragraph with class note.</p>\n<p id="special">A paragraph with id special.</p>',
      theory: L(
        `<p><b>CSS</b> (Cascading Style Sheets) описує, <i>як</i> виглядають елементи. CSS-правило складається з <b>селектора</b> і блоку <b>оголошень</b>:</p>
<pre class="inline-code">h1 {
  color: royalblue;       /* властивість: значення; */
  background: lavender;
}</pre>
<p>Основні селектори:</p>
<ul><li><code>h1</code> — за тегом: усі <code>&lt;h1&gt;</code></li><li><code>.note</code> — за класом: елементи з <code>class="note"</code></li><li><code>#special</code> — за id: елемент з <code>id="special"</code></li><li><code>h1, h2</code> — кілька селекторів через кому</li><li><code>*</code> — усі елементи</li></ul>
<p><code>color</code> — колір тексту, <code>background</code> (або <code>background-color</code>) — колір фону. Коментарі в CSS: <code>/* ... */</code>.</p>`,
        `<p><b>CSS</b> (Cascading Style Sheets) описывает, <i>как</i> выглядят элементы. CSS-правило состоит из <b>селектора</b> и блока <b>объявлений</b>:</p>
<pre class="inline-code">h1 {
  color: royalblue;       /* свойство: значение; */
  background: lavender;
}</pre>
<p>Основные селекторы:</p>
<ul><li><code>h1</code> — по тегу: все <code>&lt;h1&gt;</code></li><li><code>.note</code> — по классу: элементы с <code>class="note"</code></li><li><code>#special</code> — по id: элемент с <code>id="special"</code></li><li><code>h1, h2</code> — несколько селекторов через запятую</li><li><code>*</code> — все элементы</li></ul>
<p><code>color</code> — цвет текста, <code>background</code> (или <code>background-color</code>) — цвет фона. Комментарии в CSS: <code>/* ... */</code>.</p>`,
        `<p><b>CSS</b> (Cascading Style Sheets) describes <i>how</i> elements look. A CSS rule has a <b>selector</b> and a block of <b>declarations</b>:</p>
<pre class="inline-code">h1 {
  color: royalblue;       /* property: value; */
  background: lavender;
}</pre>
<p>Basic selectors:</p>
<ul><li><code>h1</code> — by tag: all <code>&lt;h1&gt;</code></li><li><code>.note</code> — by class: elements with <code>class="note"</code></li><li><code>#special</code> — by id: the element with <code>id="special"</code></li><li><code>h1, h2</code> — several selectors separated by commas</li><li><code>*</code> — every element</li></ul>
<p><code>color</code> is the text colour, <code>background</code> (or <code>background-color</code>) the background. CSS comments: <code>/* ... */</code>.</p>`),
      why: L(`<p>Чому CSS окремо від HTML? Так можна змінити вигляд усього сайту, не чіпаючи розмітки: одна зміна в CSS — і всі кнопки стали круглими. Це як одяг і людина: людина та сама, а образ можна змінювати.</p>`,
        `<p>Почему CSS отдельно от HTML? Так можно изменить вид всего сайта, не трогая разметку: одно изменение в CSS — и все кнопки стали круглыми. Это как одежда и человек: человек тот же, а образ можно менять.</p>`,
        `<p>Why is CSS separate from HTML? So you can restyle a whole site without touching the markup: one CSS change and every button becomes round. Like clothes and a person — same person, different outfit.</p>`),
      mistakes: L(`<ul><li>Забута <code>;</code> між оголошеннями — наступна властивість не спрацює.</li><li>Крапка або решітка не там: <code>note { }</code> шукає тег &lt;note&gt;, а не клас.</li><li>Двокрапка замість <code>=</code>: правильно <code>color: red</code>, а не <code>color = red</code>.</li></ul>`,
        `<ul><li>Забытая <code>;</code> между объявлениями — следующее свойство не сработает.</li><li>Точка или решётка не там: <code>note { }</code> ищет тег &lt;note&gt;, а не класс.</li><li>Двоеточие, а не <code>=</code>: правильно <code>color: red</code>, а не <code>color = red</code>.</li></ul>`,
        `<ul><li>A missing <code>;</code> between declarations — the next property won’t apply.</li><li>A missing dot or hash: <code>note { }</code> looks for a &lt;note&gt; tag, not a class.</li><li>A colon, not <code>=</code>: it’s <code>color: red</code>, not <code>color = red</code>.</li></ul>`),
      examples: [
        { title: L('За тегом', 'По тегу', 'By tag'), code: 'h1 {\n  color: tomato;\n}\np {\n  color: #475569;\n}', note: L('Стиль застосовується до всіх тегів цього типу.', 'Стиль применяется ко всем тегам этого типа.', 'The style applies to every tag of that type.') },
        { title: L('Клас та id', 'Класс и id', 'Class and id'), code: '.note {\n  background: #fef08a;\n}\n#special {\n  color: white;\n  background: #3b82f6;\n}', note: L('Клас — для багатьох елементів, id — для одного.', 'Класс — для многих элементов, id — для одного.', 'A class is for many elements, an id for one.') },
        { title: L('Кілька селекторів', 'Несколько селекторов', 'Several selectors'), code: 'h1, .note, #special {\n  font-family: Georgia, serif;\n}\n* {\n  margin-left: 10px;\n}', note: L('Одне правило — для кількох селекторів.', 'Одно правило — для нескольких селекторов.', 'One rule for several selectors.') },
        { title: L('Назви кольорів', 'Названия цветов', 'Colour names'), code: 'h1 { color: rebeccapurple; }\n.note { color: darkorange; background: aliceblue; }\n#special { color: seagreen; }', note: L('Браузер знає ~140 кольорів за назвою.', 'Браузер знает ~140 цветов по названию.', 'Browsers know ~140 named colours.') }
      ],
      task: {
        text: L('Зроби текст <code>h1</code> червоним (<code>red</code>), фон <code>.note</code> — жовтим (<code>yellow</code>), а текст <code>#special</code> — синім (<code>blue</code>).', 'Сделай текст <code>h1</code> красным (<code>red</code>), фон <code>.note</code> — жёлтым (<code>yellow</code>), а текст <code>#special</code> — синим (<code>blue</code>).', 'Make the <code>h1</code> text red (<code>red</code>), the <code>.note</code> background yellow (<code>yellow</code>), and the <code>#special</code> text blue (<code>blue</code>).'),
        how: [L('Три правила: <code>h1 {}</code>, <code>.note {}</code>, <code>#special {}</code>.', 'Три правила: <code>h1 {}</code>, <code>.note {}</code>, <code>#special {}</code>.', 'Three rules: <code>h1 {}</code>, <code>.note {}</code>, <code>#special {}</code>.')],
        starter: 'h1 {\n  \n}\n',
        solution: 'h1 {\n  color: red;\n}\n.note {\n  background: yellow;\n}\n#special {\n  color: blue;\n}',
        hint: L('Для фону — <code>background</code>, для тексту — <code>color</code>.', 'Для фона — <code>background</code>, для текста — <code>color</code>.', 'Use <code>background</code> for backgrounds, <code>color</code> for text.'),
        check: function (doc, win) { var g = function (s) { return win.getComputedStyle(doc.querySelector(s)); }; return g('h1').color === 'rgb(255, 0, 0)' && g('.note').backgroundColor === 'rgb(255, 255, 0)' && g('#special').color === 'rgb(0, 0, 255)'; }
      },
      quiz: { q: L('Який селектор вибирає елементи з <code>class="btn"</code>?', 'Какой селектор выбирает элементы с <code>class="btn"</code>?', 'Which selector picks elements with <code>class="btn"</code>?'), options: ['#btn', '.btn', 'btn'], answer: 1, explain: L('Крапка — клас, решітка — id.', 'Точка — класс, решётка — id.', 'A dot means class, a hash means id.') },
      ref: [{ code: 'tag .class #id', d: L('селектори', 'селекторы', 'selectors') }, { code: 'color / background', d: L('колір тексту / фону', 'цвет текста / фона', 'text / background colour') }]
    },
    {
      id: 'colors', chapter: CH1,
      title: L('Формати кольорів і фони', 'Форматы цветов и фоны', 'Colour formats and backgrounds'),
      html: '<div class="hero"><h1>Sunset</h1></div>\n<div class="card">Card with a soft background</div>\n<div class="glass">Semi-transparent</div>',
      theory: L(
        `<p>Колір можна записати кількома способами:</p>
<table class="mini"><tr><td><code>red</code></td><td>назва</td></tr><tr><td><code>#ff0000</code> / <code>#f00</code></td><td>HEX: червоний, зелений, синій (00–ff)</td></tr><tr><td><code>rgb(255, 0, 0)</code></td><td>RGB: кожен канал 0–255</td></tr><tr><td><code>rgb(255 0 0 / 50%)</code>, <code>rgba(...)</code></td><td>з прозорістю (alpha)</td></tr><tr><td><code>hsl(0, 100%, 50%)</code></td><td>відтінок (0–360°), насиченість, світлість</td></tr></table>
<p>Фони:</p>
<ul><li><code>background: linear-gradient(90deg, #f97316, #db2777)</code> — градієнт</li><li><code>radial-gradient(circle, ...)</code> — круговий градієнт</li><li><code>background-image: url(photo.jpg)</code> + <code>background-size: cover</code> + <code>background-position: center</code></li><li><code>opacity: 0.5</code> — прозорість усього елемента</li></ul>`,
        `<p>Цвет можно записать несколькими способами:</p>
<table class="mini"><tr><td><code>red</code></td><td>название</td></tr><tr><td><code>#ff0000</code> / <code>#f00</code></td><td>HEX: красный, зелёный, синий (00–ff)</td></tr><tr><td><code>rgb(255, 0, 0)</code></td><td>RGB: каждый канал 0–255</td></tr><tr><td><code>rgb(255 0 0 / 50%)</code>, <code>rgba(...)</code></td><td>с прозрачностью (alpha)</td></tr><tr><td><code>hsl(0, 100%, 50%)</code></td><td>оттенок (0–360°), насыщенность, светлота</td></tr></table>
<p>Фоны:</p>
<ul><li><code>background: linear-gradient(90deg, #f97316, #db2777)</code> — градиент</li><li><code>radial-gradient(circle, ...)</code> — круговой градиент</li><li><code>background-image: url(photo.jpg)</code> + <code>background-size: cover</code> + <code>background-position: center</code></li><li><code>opacity: 0.5</code> — прозрачность всего элемента</li></ul>`,
        `<p>A colour can be written several ways:</p>
<table class="mini"><tr><td><code>red</code></td><td>name</td></tr><tr><td><code>#ff0000</code> / <code>#f00</code></td><td>HEX: red, green, blue (00–ff)</td></tr><tr><td><code>rgb(255, 0, 0)</code></td><td>RGB: each channel 0–255</td></tr><tr><td><code>rgb(255 0 0 / 50%)</code>, <code>rgba(...)</code></td><td>with transparency (alpha)</td></tr><tr><td><code>hsl(0, 100%, 50%)</code></td><td>hue (0–360°), saturation, lightness</td></tr></table>
<p>Backgrounds:</p>
<ul><li><code>background: linear-gradient(90deg, #f97316, #db2777)</code> — a gradient</li><li><code>radial-gradient(circle, ...)</code> — a radial gradient</li><li><code>background-image: url(photo.jpg)</code> + <code>background-size: cover</code> + <code>background-position: center</code></li><li><code>opacity: 0.5</code> — transparency of the whole element</li></ul>`),
      why: L(`<p>Чому стільки форматів? HEX — компактний, його дають дизайнери. RGB зручний для прозорості. HSL — найлюдяніший: змінюючи лише світлість, легко отримати світлішу чи темнішу версію того самого кольору для кнопок і hover-ефектів.</p>`,
        `<p>Зачем столько форматов? HEX — компактный, его дают дизайнеры. RGB удобен для прозрачности. HSL — самый человечный: меняя только светлоту, легко получить светлее или темнее тот же цвет для кнопок и hover-эффектов.</p>`,
        `<p>Why so many formats? HEX is compact and what designers hand over. RGB is handy for transparency. HSL is the most human: changing only lightness gives a lighter or darker version of the same colour for buttons and hover effects.</p>`),
      mistakes: L(`<ul><li>HEX без решітки: <code>ff0000</code> — не спрацює.</li><li><code>opacity</code> робить прозорим і текст. Щоб прозорим був лише фон — використовуй колір з alpha.</li></ul>`,
        `<ul><li>HEX без решётки: <code>ff0000</code> — не сработает.</li><li><code>opacity</code> делает прозрачным и текст. Чтобы прозрачным был только фон — используй цвет с alpha.</li></ul>`,
        `<ul><li>HEX without the hash: <code>ff0000</code> won’t work.</li><li><code>opacity</code> makes the text transparent too. For a transparent background only, use a colour with alpha.</li></ul>`),
      examples: [
        { title: L('Формати', 'Форматы', 'Formats'), code: '.hero { background: #0ea5e9; color: rgb(255, 255, 255); }\n.card { background: hsl(260, 80%, 92%); }\n.glass { background: rgb(0 0 0 / 20%); }', note: L('Чотири способи записати колір.', 'Четыре способа записать цвет.', 'Four ways to write a colour.') },
        { title: L('Градієнт', 'Градиент', 'Gradient'), code: '.hero {\n  background: linear-gradient(135deg, #f97316, #db2777, #7c3aed);\n  color: white;\n  padding: 30px;\n}\n.card {\n  background: radial-gradient(circle at top left, #fde68a, #fff);\n  padding: 20px;\n}', note: L('Кут і кілька кольорів.', 'Угол и несколько цветов.', 'An angle and several colours.') },
        { title: L('Фото-фон', 'Фото-фон', 'Photo background'), code: '.hero {\n  background-image: url("https://picsum.photos/id/1016/800/300");\n  background-size: cover;\n  background-position: center;\n  color: white;\n  height: 180px;\n  display: grid;\n  place-items: center;\n}', note: L('<code>cover</code> заповнює блок без спотворень.', '<code>cover</code> заполняет блок без искажений.', '<code>cover</code> fills the box without distortion.') },
        { title: 'opacity vs alpha', code: '.card { background: #3b82f6; color: white; opacity: 0.5; padding: 10px; }\n.glass { background: rgb(59 130 246 / 50%); color: white; padding: 10px; }', note: L('У першому напівпрозорий і текст, у другому — лише фон.', 'В первом полупрозрачный и текст, во втором — только фон.', 'The first fades the text too, the second only the background.') }
      ],
      task: {
        text: L('Зроби фон <code>.hero</code> лінійним градієнтом (будь-які кольори) і білий текст. Фон <code>.card</code> задай у форматі HEX <code>#e0e7ff</code>. Фон <code>.glass</code> — чорний з прозорістю 30% (<code>rgb(0 0 0 / 30%)</code>).', 'Сделай фон <code>.hero</code> линейным градиентом (любые цвета) и белый текст. Фон <code>.card</code> задай в формате HEX <code>#e0e7ff</code>. Фон <code>.glass</code> — чёрный с прозрачностью 30% (<code>rgb(0 0 0 / 30%)</code>).', 'Give <code>.hero</code> a linear-gradient background (any colours) and white text. Set the <code>.card</code> background to HEX <code>#e0e7ff</code>. Make <code>.glass</code> black at 30% opacity (<code>rgb(0 0 0 / 30%)</code>).'),
        how: [L('<code>background: linear-gradient(90deg, red, blue);</code>', '<code>background: linear-gradient(90deg, red, blue);</code>', '<code>background: linear-gradient(90deg, red, blue);</code>'), L('<code>color: white;</code>', '<code>color: white;</code>', '<code>color: white;</code>')],
        starter: '',
        solution: '.hero {\n  background: linear-gradient(90deg, #f97316, #db2777);\n  color: white;\n}\n.card {\n  background: #e0e7ff;\n}\n.glass {\n  background: rgb(0 0 0 / 30%);\n}',
        hint: L('Градієнт — це <code>background-image</code>, тож перевіряється саме він.', 'Градиент — это <code>background-image</code>, поэтому проверяется именно он.', 'A gradient is a <code>background-image</code>, so that’s what’s checked.'),
        check: function (doc, win) { var g = function (s) { return win.getComputedStyle(doc.querySelector(s)); }; return /linear-gradient/.test(g('.hero').backgroundImage) && g('.hero').color === 'rgb(255, 255, 255)' && g('.card').backgroundColor === 'rgb(224, 231, 255)' && /rgba\(0, 0, 0, 0\.3\)/.test(g('.glass').backgroundColor); }
      },
      quiz: { q: L('Що означає <code>#000</code>?', 'Что означает <code>#000</code>?', 'What does <code>#000</code> mean?'), options: [L('білий', 'белый', 'white'), L('чорний', 'чёрный', 'black'), L('прозорий', 'прозрачный', 'transparent')], answer: 1, explain: L('Усі канали на нулі — чорний.', 'Все каналы на нуле — чёрный.', 'All channels at zero — black.') },
      ref: [{ code: '#hex rgb() hsl()', d: L('формати кольорів', 'форматы цветов', 'colour formats') }, { code: 'linear-gradient()', d: L('градієнт', 'градиент', 'gradient') }, { code: 'background-size: cover', d: L('фото на весь блок', 'фото на весь блок', 'photo fills box') }]
    },
    {
      id: 'text', chapter: CH1,
      title: L('Текст і шрифти', 'Текст и шрифты', 'Text and fonts'),
      html: '<h1>Article title</h1>\n<p class="lead">A short introduction that should stand out.</p>\n<p>Regular article text. It talks about something interesting: CSS and fonts. Good typography makes reading comfortable.</p>\n<a href="#">A link</a>',
      theory: L(
        `<p>Властивості тексту:</p>
<table class="mini"><tr><td><code>font-family</code></td><td>шрифт зі списком запасних: <code>Inter, Arial, sans-serif</code></td></tr><tr><td><code>font-size</code></td><td>розмір: <code>16px</code>, <code>1.25rem</code></td></tr><tr><td><code>font-weight</code></td><td>товщина: <code>400</code>, <code>700</code>, <code>bold</code></td></tr><tr><td><code>font-style</code></td><td><code>italic</code></td></tr><tr><td><code>line-height</code></td><td>міжрядковий інтервал, краще без одиниць: <code>1.6</code></td></tr><tr><td><code>text-align</code></td><td><code>left / center / right / justify</code></td></tr><tr><td><code>text-transform</code></td><td><code>uppercase / lowercase / capitalize</code></td></tr><tr><td><code>letter-spacing</code></td><td>відстань між літерами</td></tr><tr><td><code>text-decoration</code></td><td><code>underline / none / line-through</code></td></tr><tr><td><code>text-shadow</code></td><td>тінь тексту</td></tr></table>
<p>Шрифти з Google Fonts підключають через <code>@import</code> або <code>&lt;link&gt;</code>.</p>`,
        `<p>Свойства текста:</p>
<table class="mini"><tr><td><code>font-family</code></td><td>шрифт со списком запасных: <code>Inter, Arial, sans-serif</code></td></tr><tr><td><code>font-size</code></td><td>размер: <code>16px</code>, <code>1.25rem</code></td></tr><tr><td><code>font-weight</code></td><td>толщина: <code>400</code>, <code>700</code>, <code>bold</code></td></tr><tr><td><code>font-style</code></td><td><code>italic</code></td></tr><tr><td><code>line-height</code></td><td>межстрочный интервал, лучше без единиц: <code>1.6</code></td></tr><tr><td><code>text-align</code></td><td><code>left / center / right / justify</code></td></tr><tr><td><code>text-transform</code></td><td><code>uppercase / lowercase / capitalize</code></td></tr><tr><td><code>letter-spacing</code></td><td>расстояние между буквами</td></tr><tr><td><code>text-decoration</code></td><td><code>underline / none / line-through</code></td></tr><tr><td><code>text-shadow</code></td><td>тень текста</td></tr></table>
<p>Шрифты из Google Fonts подключают через <code>@import</code> или <code>&lt;link&gt;</code>.</p>`,
        `<p>Text properties:</p>
<table class="mini"><tr><td><code>font-family</code></td><td>a font with fallbacks: <code>Inter, Arial, sans-serif</code></td></tr><tr><td><code>font-size</code></td><td>size: <code>16px</code>, <code>1.25rem</code></td></tr><tr><td><code>font-weight</code></td><td>weight: <code>400</code>, <code>700</code>, <code>bold</code></td></tr><tr><td><code>font-style</code></td><td><code>italic</code></td></tr><tr><td><code>line-height</code></td><td>line spacing, best unitless: <code>1.6</code></td></tr><tr><td><code>text-align</code></td><td><code>left / center / right / justify</code></td></tr><tr><td><code>text-transform</code></td><td><code>uppercase / lowercase / capitalize</code></td></tr><tr><td><code>letter-spacing</code></td><td>space between letters</td></tr><tr><td><code>text-decoration</code></td><td><code>underline / none / line-through</code></td></tr><tr><td><code>text-shadow</code></td><td>text shadow</td></tr></table>
<p>Google Fonts are loaded with <code>@import</code> or a <code>&lt;link&gt;</code>.</p>`),
      why: L(`<p>Текст — 90% вмісту більшості сайтів. Правильний розмір (16–18px для основного тексту), міжрядковий інтервал ~1.5 і ширина рядка до ~70 символів роблять читання легким. Список запасних шрифтів гарантує, що текст буде красивим, навіть якщо основний шрифт не завантажився.</p>`,
        `<p>Текст — 90% содержимого большинства сайтов. Правильный размер (16–18px для основного текста), межстрочный интервал ~1.5 и ширина строки до ~70 символов делают чтение лёгким. Список запасных шрифтов гарантирует, что текст будет красивым, даже если основной шрифт не загрузился.</p>`,
        `<p>Text is 90% of most sites. The right size (16–18px for body text), line height ~1.5 and line length up to ~70 characters make reading easy. A fallback font list keeps text looking good even if the main font fails to load.</p>`),
      mistakes: L(`<ul><li>Назви шрифтів з пробілом без лапок: <code>font-family: Times New Roman</code> — краще <code>"Times New Roman"</code>.</li><li>Занадто дрібний текст (12px) на телефоні.</li><li>Прибрати підкреслення в посилань, не давши іншого виділення.</li></ul>`,
        `<ul><li>Названия шрифтов с пробелом без кавычек: <code>font-family: Times New Roman</code> — лучше <code>"Times New Roman"</code>.</li><li>Слишком мелкий текст (12px) на телефоне.</li><li>Убрать подчёркивание у ссылок, не дав другого выделения.</li></ul>`,
        `<ul><li>Font names with spaces and no quotes: prefer <code>"Times New Roman"</code>.</li><li>Text too small (12px) on phones.</li><li>Removing link underlines without another visual cue.</li></ul>`),
      examples: [
        { title: L('Розміри', 'Размеры', 'Sizes'), code: 'h1 { font-size: 40px; font-weight: 800; }\n.lead { font-size: 20px; color: #64748b; }\np { line-height: 1.7; }', note: L('Розмір і товщина створюють ієрархію.', 'Размер и толщина создают иерархию.', 'Size and weight create hierarchy.') },
        { title: L('Шрифти', 'Шрифты', 'Fonts'), code: '@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");\nh1 { font-family: "Lobster", cursive; text-align: center; }\nbody { font-family: Georgia, "Times New Roman", serif; }', note: L('Google Font + запасні шрифти.', 'Google Font + запасные шрифты.', 'A Google Font + fallbacks.') },
        { title: L('Ефекти', 'Эффекты', 'Effects'), code: 'h1 {\n  text-transform: uppercase;\n  letter-spacing: 4px;\n  text-shadow: 3px 3px 0 #fbbf24;\n}\n.lead { font-style: italic; text-decoration: underline wavy #8b5cf6; }', note: L('Великі літери, тінь і хвиляста лінія.', 'Заглавные буквы, тень и волнистая линия.', 'Capitals, a shadow and a wavy underline.') },
        { title: L('Посилання', 'Ссылки', 'Links'), code: 'a { color: #2563eb; text-decoration: none; font-weight: 600; }\na:hover { text-decoration: underline; }', note: L('Підкреслення з’являється при наведенні.', 'Подчёркивание появляется при наведении.', 'The underline appears on hover.') }
      ],
      task: {
        text: L('Вирівняй <code>h1</code> по центру, задай йому розмір <code>36px</code> і <code>text-transform: uppercase</code>. Для <code>.lead</code> встанови товщину <code>700</code>, для всіх <code>p</code> — <code>line-height: 1.6</code>.', 'Выровняй <code>h1</code> по центру, задай ему размер <code>36px</code> и <code>text-transform: uppercase</code>. Для <code>.lead</code> установи толщину <code>700</code>, для всех <code>p</code> — <code>line-height: 1.6</code>.', 'Centre the <code>h1</code>, give it a size of <code>36px</code> and <code>text-transform: uppercase</code>. Set <code>.lead</code> weight to <code>700</code> and <code>line-height: 1.6</code> on all <code>p</code>.'),
        how: [L('Три правила: <code>h1</code>, <code>.lead</code>, <code>p</code>.', 'Три правила: <code>h1</code>, <code>.lead</code>, <code>p</code>.', 'Three rules: <code>h1</code>, <code>.lead</code>, <code>p</code>.')],
        starter: '',
        solution: 'h1 {\n  text-align: center;\n  font-size: 36px;\n  text-transform: uppercase;\n}\n.lead {\n  font-weight: 700;\n}\np {\n  line-height: 1.6;\n}',
        hint: L('<code>line-height</code> без одиниць множиться на розмір шрифту.', '<code>line-height</code> без единиц умножается на размер шрифта.', 'A unitless <code>line-height</code> multiplies the font size.'),
        check: function (doc, win) { var h = win.getComputedStyle(doc.querySelector('h1')); var l = win.getComputedStyle(doc.querySelector('.lead')); var p = win.getComputedStyle(doc.querySelectorAll('p')[1]); return h.textAlign === 'center' && h.fontSize === '36px' && h.textTransform === 'uppercase' && (l.fontWeight === '700' || l.fontWeight === 'bold') && Math.abs(parseFloat(p.lineHeight) / parseFloat(p.fontSize) - 1.6) < 0.02; }
      },
      quiz: { q: L('Навіщо список шрифтів через кому?', 'Зачем список шрифтов через запятую?', 'Why list fonts separated by commas?'), options: [L('щоб змішати їх', 'чтобы смешать их', 'to mix them'), L('запасні, якщо першого немає', 'запасные, если первого нет', 'fallbacks if the first is missing'), L('для різних розмірів', 'для разных размеров', 'for different sizes')], answer: 1, explain: L('Браузер бере перший доступний.', 'Браузер берёт первый доступный.', 'The browser uses the first available.') },
      ref: [{ code: 'font-family font-size font-weight', d: L('шрифт', 'шрифт', 'font') }, { code: 'text-align line-height', d: L('вирівнювання, інтервал', 'выравнивание, интервал', 'alignment, spacing') }]
    },
    {
      id: 'box', chapter: CH2,
      title: L('Блокова модель: padding, border, margin', 'Блочная модель: padding, border, margin', 'The box model: padding, border, margin'),
      html: '<div class="card">\n  <h2>Card</h2>\n  <p>Every element is a rectangle: content, padding, border, margin.</p>\n</div>\n<div class="card">Second card</div>',
      theory: L(
        `<p>Кожен елемент — прямокутна «коробка» з чотирьох шарів (зсередини назовні):</p>
<ol><li><b>content</b> — вміст</li><li><b>padding</b> — внутрішній відступ (фон його заповнює)</li><li><b>border</b> — рамка</li><li><b>margin</b> — зовнішній відступ до сусідів (завжди прозорий)</li></ol>
<p>Скорочений запис для 4 сторін (за годинниковою стрілкою: верх, право, низ, ліво):</p>
<ul><li><code>padding: 10px</code> — усі сторони</li><li><code>padding: 10px 20px</code> — верх/низ, ліво/право</li><li><code>padding: 5px 10px 15px 20px</code> — кожна окремо</li><li>Або окремо: <code>margin-top</code>, <code>padding-left</code>…</li></ul>
<p><code>border: 2px solid black</code> — товщина, стиль (<code>solid</code>, <code>dashed</code>, <code>dotted</code>), колір. <code>margin: 0 auto</code> центрує блок із заданою шириною.</p>
<div class="tip">💡 Натисни F12 у браузері й наведи на елемент — побачиш усі шари кольоровими.</div>`,
        `<p>Каждый элемент — прямоугольная «коробка» из четырёх слоёв (изнутри наружу):</p>
<ol><li><b>content</b> — содержимое</li><li><b>padding</b> — внутренний отступ (фон его заполняет)</li><li><b>border</b> — рамка</li><li><b>margin</b> — внешний отступ до соседей (всегда прозрачный)</li></ol>
<p>Сокращённая запись для 4 сторон (по часовой стрелке: верх, право, низ, лево):</p>
<ul><li><code>padding: 10px</code> — все стороны</li><li><code>padding: 10px 20px</code> — верх/низ, лево/право</li><li><code>padding: 5px 10px 15px 20px</code> — каждая отдельно</li><li>Или отдельно: <code>margin-top</code>, <code>padding-left</code>…</li></ul>
<p><code>border: 2px solid black</code> — толщина, стиль (<code>solid</code>, <code>dashed</code>, <code>dotted</code>), цвет. <code>margin: 0 auto</code> центрирует блок с заданной шириной.</p>
<div class="tip">💡 Нажми F12 в браузере и наведи на элемент — увидишь все слои цветными.</div>`,
        `<p>Every element is a rectangular “box” of four layers (inside out):</p>
<ol><li><b>content</b></li><li><b>padding</b> — inner spacing (the background fills it)</li><li><b>border</b></li><li><b>margin</b> — outer spacing to neighbours (always transparent)</li></ol>
<p>Shorthand for 4 sides (clockwise: top, right, bottom, left):</p>
<ul><li><code>padding: 10px</code> — all sides</li><li><code>padding: 10px 20px</code> — top/bottom, left/right</li><li><code>padding: 5px 10px 15px 20px</code> — each separately</li><li>Or individually: <code>margin-top</code>, <code>padding-left</code>…</li></ul>
<p><code>border: 2px solid black</code> — width, style (<code>solid</code>, <code>dashed</code>, <code>dotted</code>), colour. <code>margin: 0 auto</code> centres a block that has a width.</p>
<div class="tip">💡 Press F12 in a browser and hover an element — you’ll see every layer coloured.</div>`),
      why: L(`<p>Відступи — це «повітря» дизайну. Без них текст липне до рамок і сусідніх блоків, і сторінка виглядає тісною. Розуміння блокової моделі — ключ до будь-якої верстки: майже всі «чому мій блок не там» пояснюються саме нею.</p>`,
        `<p>Отступы — это «воздух» дизайна. Без них текст липнет к рамкам и соседним блокам, и страница выглядит тесной. Понимание блочной модели — ключ к любой вёрстке: почти все «почему мой блок не там» объясняются именно ею.</p>`,
        `<p>Spacing is the “air” of design. Without it text sticks to borders and neighbours and the page feels cramped. Understanding the box model is key to all layout: almost every “why is my box there?” is explained by it.</p>`),
      mistakes: L(`<ul><li>Плутати padding і margin: фон заповнює padding, але не margin.</li><li>Вертикальні margin двох сусідніх блоків «схлопуються» — береться більший, а не сума.</li></ul>`,
        `<ul><li>Путать padding и margin: фон заполняет padding, но не margin.</li><li>Вертикальные margin двух соседних блоков «схлопываются» — берётся больший, а не сумма.</li></ul>`,
        `<ul><li>Confusing padding and margin: the background fills padding, not margin.</li><li>Vertical margins of adjacent blocks collapse — the larger one wins, not the sum.</li></ul>`),
      examples: [
        { title: 'padding + border', code: '.card {\n  padding: 20px;\n  border: 3px solid #3b82f6;\n  background: #eff6ff;\n}', note: L('Фон заповнює і padding.', 'Фон заполняет и padding.', 'The background fills the padding too.') },
        { title: 'margin', code: '.card {\n  border: 2px dashed #f97316;\n  padding: 12px;\n  margin: 24px;\n}', note: L('Картки відсунулися одна від одної.', 'Карточки отодвинулись друг от друга.', 'The cards moved apart.') },
        { title: L('Скорочення', 'Сокращения', 'Shorthands'), code: '.card {\n  border: 1px solid #94a3b8;\n  padding: 5px 30px;\n  margin: 10px 0 30px 40px;\n  border-left: 8px solid #22c55e;\n}', note: L('Окрема рамка зліва поверх загальної.', 'Отдельная рамка слева поверх общей.', 'A separate left border over the general one.') },
        { title: L('Центрування', 'Центрирование', 'Centring'), code: 'body { background: #f1f5f9; }\n.card {\n  background: white;\n  width: 300px;\n  padding: 20px;\n  margin: 16px auto;\n}', note: L('<code>margin: auto</code> по боках центрує блок.', '<code>margin: auto</code> по бокам центрирует блок.', '<code>margin: auto</code> on the sides centres the block.') }
      ],
      task: {
        text: L('Задай <code>.card</code>: внутрішній відступ <code>16px</code>, рамку <code>2px solid black</code>, нижній зовнішній відступ <code>20px</code> і фон <code>white</code>.', 'Задай <code>.card</code>: внутренний отступ <code>16px</code>, рамку <code>2px solid black</code>, нижний внешний отступ <code>20px</code> и фон <code>white</code>.', 'Give <code>.card</code>: <code>16px</code> padding, a <code>2px solid black</code> border, a <code>20px</code> bottom margin and a <code>white</code> background.'),
        how: [L('<code>padding</code>, <code>border</code>, <code>margin-bottom</code>, <code>background</code>.', '<code>padding</code>, <code>border</code>, <code>margin-bottom</code>, <code>background</code>.', '<code>padding</code>, <code>border</code>, <code>margin-bottom</code>, <code>background</code>.')],
        starter: '.card {\n  \n}\n',
        solution: '.card {\n  padding: 16px;\n  border: 2px solid black;\n  margin-bottom: 20px;\n  background: white;\n}',
        hint: L('Нижній відступ — <code>margin-bottom</code>.', 'Нижний отступ — <code>margin-bottom</code>.', 'Bottom margin is <code>margin-bottom</code>.'),
        check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.card')); return s.paddingTop === '16px' && s.paddingLeft === '16px' && s.borderTopWidth === '2px' && s.borderTopStyle === 'solid' && s.borderTopColor === 'rgb(0, 0, 0)' && s.marginBottom === '20px' && s.backgroundColor === 'rgb(255, 255, 255)'; }
      },
      quiz: { q: L('Що з цього — відступ <b>всередині</b> рамки?', 'Что из этого — отступ <b>внутри</b> рамки?', 'Which is spacing <b>inside</b> the border?'), options: ['margin', 'padding', 'gap'], answer: 1, explain: L('padding — всередині, margin — зовні.', 'padding — внутри, margin — снаружи.', 'padding is inside, margin outside.') },
      ref: [{ code: 'padding / margin', d: L('внутрішній / зовнішній відступ', 'внутренний / внешний отступ', 'inner / outer spacing') }, { code: 'border: 1px solid #ccc', d: L('рамка', 'рамка', 'border') }, { code: 'margin: 0 auto', d: L('центрування блоку', 'центрирование блока', 'centre a block') }]
    },
    {
      id: 'sizing', chapter: CH2,
      title: L('Розміри, box-sizing і overflow', 'Размеры, box-sizing и overflow', 'Sizing, box-sizing and overflow'),
      html: '<div class="box">This box has a fixed width. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>\n<div class="wide">Wide box</div>',
      theory: L(
        `<p>Розміри задають властивості <code>width</code> і <code>height</code>, а також межі: <code>min-width</code>, <code>max-width</code>, <code>min-height</code>, <code>max-height</code>.</p>
<p><b>Важливо:</b> за замовчуванням <code>width</code> — це ширина лише <b>вмісту</b>. Padding і border додаються зверху: блок з <code>width: 200px; padding: 20px; border: 5px</code> насправді займає 250px!</p>
<p>Тому майже всі сайти пишуть на початку CSS:</p>
<pre class="inline-code">* { box-sizing: border-box; }</pre>
<p>Тепер <code>width</code> включає padding і border — набагато передбачуваніше.</p>
<p>Якщо вміст не вміщається, керує <code>overflow</code>: <code>visible</code> (вилазить), <code>hidden</code> (обрізається), <code>auto</code> (з’являється прокрутка).</p>
<p><code>max-width: 600px; width: 100%</code> — класика: на великому екрані блок не ширший за 600px, а на телефоні стискається.</p>`,
        `<p>Размеры задают свойства <code>width</code> и <code>height</code>, а также границы: <code>min-width</code>, <code>max-width</code>, <code>min-height</code>, <code>max-height</code>.</p>
<p><b>Важно:</b> по умолчанию <code>width</code> — это ширина только <b>содержимого</b>. Padding и border добавляются сверху: блок с <code>width: 200px; padding: 20px; border: 5px</code> на самом деле занимает 250px!</p>
<p>Поэтому почти все сайты пишут в начале CSS:</p>
<pre class="inline-code">* { box-sizing: border-box; }</pre>
<p>Теперь <code>width</code> включает padding и border — гораздо предсказуемее.</p>
<p>Если содержимое не помещается, управляет <code>overflow</code>: <code>visible</code> (вылезает), <code>hidden</code> (обрезается), <code>auto</code> (появляется прокрутка).</p>
<p><code>max-width: 600px; width: 100%</code> — классика: на большом экране блок не шире 600px, а на телефоне сжимается.</p>`,
        `<p>Size is set with <code>width</code> and <code>height</code>, plus limits: <code>min-width</code>, <code>max-width</code>, <code>min-height</code>, <code>max-height</code>.</p>
<p><b>Important:</b> by default <code>width</code> is the width of the <b>content</b> only. Padding and border are added on top: a box with <code>width: 200px; padding: 20px; border: 5px</code> actually takes 250px!</p>
<p>That’s why nearly every site starts its CSS with:</p>
<pre class="inline-code">* { box-sizing: border-box; }</pre>
<p>Now <code>width</code> includes padding and border — far more predictable.</p>
<p>When content doesn’t fit, <code>overflow</code> decides: <code>visible</code> (spills out), <code>hidden</code> (clipped), <code>auto</code> (scrollbar appears).</p>
<p><code>max-width: 600px; width: 100%</code> is a classic: on big screens the box is at most 600px, on phones it shrinks.</p>`),
      why: L(`<p>Чому історично <code>content-box</code>? Так вирішили автори CSS у 90-х. Але на практиці дизайнери думають «картка шириною 300px разом з відступами», тож <code>border-box</code> став неофіційним стандартом.</p>`,
        `<p>Почему исторически <code>content-box</code>? Так решили авторы CSS в 90-х. Но на практике дизайнеры думают «карточка шириной 300px вместе с отступами», поэтому <code>border-box</code> стал неофициальным стандартом.</p>`,
        `<p>Why was <code>content-box</code> the default? CSS authors chose it in the ’90s. But designers think “a 300px card including padding”, so <code>border-box</code> became the unofficial standard.</p>`),
      mistakes: L(`<ul><li><code>width: 100%</code> + padding без <code>border-box</code> — блок вилазить за батька.</li><li>Фіксована <code>height</code> для тексту — на телефоні текст не вміститься. Краще <code>min-height</code>.</li></ul>`,
        `<ul><li><code>width: 100%</code> + padding без <code>border-box</code> — блок вылезает за родителя.</li><li>Фиксированная <code>height</code> для текста — на телефоне текст не поместится. Лучше <code>min-height</code>.</li></ul>`,
        `<ul><li><code>width: 100%</code> + padding without <code>border-box</code> — the box overflows its parent.</li><li>A fixed <code>height</code> on text — it won’t fit on phones. Prefer <code>min-height</code>.</li></ul>`),
      examples: [
        { title: 'content-box', code: '.box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid #3b82f6;\n}\n.wide { width: 200px; background: #fde68a; }', note: L('Синій блок ширший за жовтий, хоча обидва «200px».', 'Синий блок шире жёлтого, хотя оба «200px».', 'The blue box is wider than the yellow one, though both are “200px”.') },
        { title: 'border-box', code: '* { box-sizing: border-box; }\n.box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid #3b82f6;\n}\n.wide { width: 200px; background: #fde68a; }', note: L('Тепер обидва однакові — 200px.', 'Теперь оба одинаковые — 200px.', 'Now both are 200px.') },
        { title: 'overflow', code: '.box {\n  width: 220px;\n  height: 70px;\n  border: 2px solid #f43f5e;\n  overflow: auto;\n}\n.wide { width: 220px; height: 30px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; border: 1px solid; }', note: L('Прокрутка і обрізання з трикрапкою.', 'Прокрутка и обрезка с многоточием.', 'Scrolling and clipping with an ellipsis.') },
        { title: 'max-width', code: '.box {\n  width: 100%;\n  max-width: 400px;\n  margin: 0 auto;\n  background: #e0e7ff;\n  padding: 12px;\n}', note: L('Гумовий блок з обмеженням.', 'Резиновый блок с ограничением.', 'A fluid box with a limit.') }
      ],
      task: {
        text: L('Увімкни <code>box-sizing: border-box</code> для всіх елементів. Задай <code>.box</code> ширину <code>300px</code>, padding <code>20px</code>, висоту <code>100px</code> і <code>overflow: auto</code>. Для <code>.wide</code> — <code>width: 100%</code> і <code>max-width: 500px</code>.', 'Включи <code>box-sizing: border-box</code> для всех элементов. Задай <code>.box</code> ширину <code>300px</code>, padding <code>20px</code>, высоту <code>100px</code> и <code>overflow: auto</code>. Для <code>.wide</code> — <code>width: 100%</code> и <code>max-width: 500px</code>.', 'Turn on <code>box-sizing: border-box</code> for every element. Give <code>.box</code> a width of <code>300px</code>, <code>20px</code> padding, a height of <code>100px</code> and <code>overflow: auto</code>. Give <code>.wide</code> <code>width: 100%</code> and <code>max-width: 500px</code>.'),
        how: [L('<code>* { box-sizing: border-box; }</code>', '<code>* { box-sizing: border-box; }</code>', '<code>* { box-sizing: border-box; }</code>')],
        starter: '',
        solution: '* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  height: 100px;\n  padding: 20px;\n  overflow: auto;\n}\n.wide {\n  width: 100%;\n  max-width: 500px;\n}',
        hint: L('Перевіряється реальна ширина: з border-box вона рівно 300px.', 'Проверяется реальная ширина: с border-box она ровно 300px.', 'The real width is checked: with border-box it’s exactly 300px.'),
        check: function (doc, win) { var b = doc.querySelector('.box'); var s = win.getComputedStyle(b); var w = doc.querySelector('.wide'); return s.boxSizing === 'border-box' && b.offsetWidth === 300 && b.offsetHeight === 100 && s.overflow.indexOf('auto') > -1 && s.paddingTop === '20px' && w.offsetWidth === 500; }
      },
      quiz: { q: L('Яка реальна ширина блоку <code>width:100px; padding:10px</code> з <code>box-sizing: border-box</code>?', 'Какая реальная ширина блока <code>width:100px; padding:10px</code> с <code>box-sizing: border-box</code>?', 'What’s the real width of <code>width:100px; padding:10px</code> with <code>box-sizing: border-box</code>?'), options: ['100px', '120px', '80px'], answer: 0, explain: L('Padding уже входить у 100px.', 'Padding уже входит в 100px.', 'The padding is already included in 100px.') },
      ref: [{ code: 'box-sizing: border-box', d: L('ширина з padding і border', 'ширина с padding и border', 'width includes padding/border') }, { code: 'max-width min-height', d: L('межі розміру', 'границы размера', 'size limits') }, { code: 'overflow: auto|hidden', d: L('переповнення', 'переполнение', 'overflow') }]
    },
    {
      id: 'borders', chapter: CH2,
      title: L('Заокруглення та тіні', 'Скругления и тени', 'Rounded corners and shadows'),
      html: '<div class="card">Soft card</div>\n<img class="avatar" src="https://picsum.photos/id/64/120/120" alt="Avatar">\n<button class="btn">Button</button>',
      theory: L(
        `<p><code>border-radius</code> заокруглює кути:</p>
<ul><li><code>border-radius: 12px</code> — усі кути</li><li><code>border-radius: 50%</code> — коло (для квадрата) або овал</li><li><code>border-radius: 20px 0</code> — різні кути</li></ul>
<p><code>box-shadow</code> додає тінь блоку: <code>зсув-x зсув-y розмиття розтягування колір</code>:</p>
<pre class="inline-code">box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);</pre>
<ul><li>Кілька тіней — через кому</li><li><code>inset</code> — внутрішня тінь</li><li>Без розмиття — «тверда» тінь у стилі неоморфізму/brutalism</li></ul>
<p><code>outline</code> — контур, що не займає місця (часто для фокусу клавіатури).</p>`,
        `<p><code>border-radius</code> скругляет углы:</p>
<ul><li><code>border-radius: 12px</code> — все углы</li><li><code>border-radius: 50%</code> — круг (для квадрата) или овал</li><li><code>border-radius: 20px 0</code> — разные углы</li></ul>
<p><code>box-shadow</code> добавляет тень блоку: <code>сдвиг-x сдвиг-y размытие растяжение цвет</code>:</p>
<pre class="inline-code">box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);</pre>
<ul><li>Несколько теней — через запятую</li><li><code>inset</code> — внутренняя тень</li><li>Без размытия — «твёрдая» тень в стиле brutalism</li></ul>
<p><code>outline</code> — контур, не занимающий места (часто для фокуса клавиатуры).</p>`,
        `<p><code>border-radius</code> rounds corners:</p>
<ul><li><code>border-radius: 12px</code> — all corners</li><li><code>border-radius: 50%</code> — a circle (for a square) or an oval</li><li><code>border-radius: 20px 0</code> — different corners</li></ul>
<p><code>box-shadow</code> adds a shadow: <code>offset-x offset-y blur spread colour</code>:</p>
<pre class="inline-code">box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);</pre>
<ul><li>Several shadows — separated by commas</li><li><code>inset</code> — an inner shadow</li><li>No blur — a “hard” brutalist shadow</li></ul>
<p><code>outline</code> — an outline that takes no space (often for keyboard focus).</p>`),
      why: L(`<p>Заокруглення та м’які тіні — основа сучасних інтерфейсів (iOS, Material Design). Тінь показує «висоту» елемента: картки здаються піднятими над фоном, а кнопки — натискними. Прозора чорна тінь (<code>rgba</code>) підходить до будь-якого фону.</p>`,
        `<p>Скругления и мягкие тени — основа современных интерфейсов (iOS, Material Design). Тень показывает «высоту» элемента: карточки кажутся поднятыми над фоном, а кнопки — нажимаемыми. Прозрачная чёрная тень (<code>rgba</code>) подходит к любому фону.</p>`,
        `<p>Rounded corners and soft shadows are the basis of modern interfaces (iOS, Material Design). A shadow shows an element’s “elevation”: cards look lifted, buttons look pressable. A transparent black shadow (<code>rgba</code>) suits any background.</p>`),
      mistakes: L(`<ul><li>Темна непрозора тінь <code>0 0 10px black</code> виглядає брудно — використовуй прозорість.</li><li>Прибирати <code>outline</code> у фокусі без заміни — клавіатурні користувачі загубляться.</li></ul>`,
        `<ul><li>Тёмная непрозрачная тень <code>0 0 10px black</code> выглядит грязно — используй прозрачность.</li><li>Убирать <code>outline</code> при фокусе без замены — клавиатурные пользователи потеряются.</li></ul>`,
        `<ul><li>A dark opaque shadow like <code>0 0 10px black</code> looks dirty — use transparency.</li><li>Removing the focus <code>outline</code> without a replacement — keyboard users get lost.</li></ul>`),
      examples: [
        { title: L('Картка', 'Карточка', 'Card'), code: 'body { background: #f1f5f9; padding: 20px; }\n.card {\n  background: white;\n  padding: 24px;\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);\n}', note: L('М’яка «піднята» картка.', 'Мягкая «поднятая» карточка.', 'A soft “lifted” card.') },
        { title: L('Аватар', 'Аватар', 'Avatar'), code: '.avatar {\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  border: 4px solid white;\n  box-shadow: 0 0 0 4px #3b82f6;\n}', note: L('Коло + подвійне кільце з тіні.', 'Круг + двойное кольцо из тени.', 'A circle plus a ring made from a shadow.') },
        { title: L('Тверда тінь', 'Твёрдая тень', 'Hard shadow'), code: '.btn {\n  background: #facc15;\n  border: 3px solid #111;\n  border-radius: 10px;\n  padding: 12px 24px;\n  font-weight: 800;\n  box-shadow: 5px 5px 0 #111;\n}', note: L('Стиль brutalism без розмиття.', 'Стиль brutalism без размытия.', 'Brutalist style with no blur.') },
        { title: L('Кілька тіней', 'Несколько теней', 'Multiple shadows'), code: '.card {\n  padding: 30px;\n  border-radius: 24px;\n  background: #e0e7ff;\n  box-shadow: inset 0 2px 6px rgba(255,255,255,.8), 0 1px 2px rgba(0,0,0,.1), 0 20px 40px -10px rgba(79,70,229,.4);\n}', note: L('Внутрішня і зовнішні тіні разом.', 'Внутренняя и внешние тени вместе.', 'Inner and outer shadows together.') }
      ],
      task: {
        text: L('Задай <code>.card</code> заокруглення <code>12px</code> і будь-яку тінь <code>box-shadow</code>. Зроби <code>.avatar</code> круглим (<code>border-radius: 50%</code>). Кнопці <code>.btn</code> дай заокруглення <code>999px</code> (форма «пігулки»).', 'Задай <code>.card</code> скругление <code>12px</code> и любую тень <code>box-shadow</code>. Сделай <code>.avatar</code> круглым (<code>border-radius: 50%</code>). Кнопке <code>.btn</code> дай скругление <code>999px</code> (форма «таблетки»).', 'Give <code>.card</code> a <code>12px</code> radius and any <code>box-shadow</code>. Make <code>.avatar</code> round (<code>border-radius: 50%</code>). Give <code>.btn</code> a <code>999px</code> radius (a “pill” shape).'),
        how: [L('Три правила з <code>border-radius</code>.', 'Три правила с <code>border-radius</code>.', 'Three rules with <code>border-radius</code>.')],
        starter: '',
        solution: '.card {\n  border-radius: 12px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n}\n.avatar {\n  border-radius: 50%;\n}\n.btn {\n  border-radius: 999px;\n}',
        hint: L('Тінь: <code>box-shadow: 0 8px 20px rgba(0,0,0,.15);</code>', 'Тень: <code>box-shadow: 0 8px 20px rgba(0,0,0,.15);</code>', 'Shadow: <code>box-shadow: 0 8px 20px rgba(0,0,0,.15);</code>'),
        check: function (doc, win) { var g = function (s) { return win.getComputedStyle(doc.querySelector(s)); }; return g('.card').borderTopLeftRadius === '12px' && g('.card').boxShadow !== 'none' && g('.avatar').borderTopLeftRadius === '50%' && g('.btn').borderTopLeftRadius === '999px'; }
      },
      quiz: { q: L('Що робить <code>border-radius: 50%</code> квадрату?', 'Что делает <code>border-radius: 50%</code> квадрату?', 'What does <code>border-radius: 50%</code> do to a square?'), options: [L('нічого', 'ничего', 'nothing'), L('робить коло', 'делает круг', 'makes a circle'), L('зменшує вдвічі', 'уменьшает вдвое', 'halves it')], answer: 1, explain: L('Кути заокруглюються до половини сторони.', 'Углы скругляются до половины стороны.', 'Corners round to half the side.') },
      ref: [{ code: 'border-radius', d: L('заокруглення', 'скругление', 'rounding') }, { code: 'box-shadow: x y blur color', d: L('тінь', 'тень', 'shadow') }]
    },
    {
      id: 'display', chapter: CH2,
      title: L('display: block, inline, inline-block', 'display: block, inline, inline-block', 'display: block, inline, inline-block'),
      html: '<div class="tag">div 1</div>\n<div class="tag">div 2</div>\n<span class="pill">span 1</span>\n<span class="pill">span 2</span>\n<p class="secret">Hidden paragraph</p>',
      theory: L(
        `<p>Властивість <code>display</code> визначає, як елемент поводиться в потоці сторінки:</p>
<table class="mini"><tr><td><code>block</code></td><td>з нового рядка, на всю ширину; width/height працюють (<code>div</code>, <code>p</code>, <code>h1</code>)</td></tr><tr><td><code>inline</code></td><td>у рядку з текстом, ширина за вмістом; width/height і вертикальні margin <b>не працюють</b> (<code>span</code>, <code>a</code>, <code>b</code>)</td></tr><tr><td><code>inline-block</code></td><td>у рядку, але width/height/padding працюють — ідеально для кнопок і тегів</td></tr><tr><td><code>none</code></td><td>елемент повністю зникає (і не займає місця)</td></tr><tr><td><code>flex</code> / <code>grid</code></td><td>сучасні способи розміщення (наступний розділ)</td></tr></table>
<p><code>visibility: hidden</code> ховає елемент, але <b>місце залишається</b>.</p>`,
        `<p>Свойство <code>display</code> определяет, как элемент ведёт себя в потоке страницы:</p>
<table class="mini"><tr><td><code>block</code></td><td>с новой строки, на всю ширину; width/height работают (<code>div</code>, <code>p</code>, <code>h1</code>)</td></tr><tr><td><code>inline</code></td><td>в строке с текстом, ширина по содержимому; width/height и вертикальные margin <b>не работают</b> (<code>span</code>, <code>a</code>, <code>b</code>)</td></tr><tr><td><code>inline-block</code></td><td>в строке, но width/height/padding работают — идеально для кнопок и тегов</td></tr><tr><td><code>none</code></td><td>элемент полностью исчезает (и не занимает места)</td></tr><tr><td><code>flex</code> / <code>grid</code></td><td>современные способы размещения (следующий раздел)</td></tr></table>
<p><code>visibility: hidden</code> прячет элемент, но <b>место остаётся</b>.</p>`,
        `<p><code>display</code> decides how an element behaves in the page flow:</p>
<table class="mini"><tr><td><code>block</code></td><td>starts on a new line, full width; width/height work (<code>div</code>, <code>p</code>, <code>h1</code>)</td></tr><tr><td><code>inline</code></td><td>flows with text, width fits content; width/height and vertical margins <b>don’t work</b> (<code>span</code>, <code>a</code>, <code>b</code>)</td></tr><tr><td><code>inline-block</code></td><td>flows inline but width/height/padding work — perfect for buttons and tags</td></tr><tr><td><code>none</code></td><td>the element disappears entirely (takes no space)</td></tr><tr><td><code>flex</code> / <code>grid</code></td><td>modern layout (next chapter)</td></tr></table>
<p><code>visibility: hidden</code> hides an element but <b>keeps its space</b>.</p>`),
      why: L(`<p>Кожен тег має свій «природний» display: абзаци — блоки, посилання — рядкові. Але виглядом можна керувати незалежно від тегу: посилання-кнопка стає <code>inline-block</code>, а пункти меню — в один рядок. Тег обирається за змістом, display — за виглядом.</p>`,
        `<p>У каждого тега свой «естественный» display: абзацы — блоки, ссылки — строчные. Но видом можно управлять независимо от тега: ссылка-кнопка становится <code>inline-block</code>, а пункты меню — в одну строку. Тег выбирается по смыслу, display — по виду.</p>`,
        `<p>Every tag has a “natural” display: paragraphs are blocks, links are inline. But you control looks independently: a link-button becomes <code>inline-block</code>, menu items line up in a row. Pick the tag by meaning, display by looks.</p>`),
      mistakes: L(`<ul><li>Задавати <code>width</code> рядковому <code>span</code> — нічого не зміниться.</li><li>Плутати <code>display: none</code> (місця немає) і <code>visibility: hidden</code> (місце є).</li></ul>`,
        `<ul><li>Задавать <code>width</code> строчному <code>span</code> — ничего не изменится.</li><li>Путать <code>display: none</code> (места нет) и <code>visibility: hidden</code> (место есть).</li></ul>`,
        `<ul><li>Setting <code>width</code> on an inline <code>span</code> — nothing changes.</li><li>Confusing <code>display: none</code> (no space) with <code>visibility: hidden</code> (space kept).</li></ul>`),
      examples: [
        { title: 'block vs inline', code: '.tag { background: #bfdbfe; margin: 4px; }\n.pill { background: #fbcfe8; width: 300px; margin: 20px; }', note: L('У span ширина й вертикальний margin ігноруються.', 'У span ширина и вертикальный margin игнорируются.', 'The span ignores width and vertical margin.') },
        { title: 'inline-block', code: '.pill {\n  display: inline-block;\n  width: 120px;\n  padding: 8px;\n  margin: 10px 4px;\n  text-align: center;\n  background: #fbcfe8;\n  border-radius: 999px;\n}', note: L('Тепер розміри працюють, а елементи в рядку.', 'Теперь размеры работают, а элементы в строке.', 'Now sizes work and items stay in a row.') },
        { title: L('Блоки в рядок', 'Блоки в строку', 'Blocks in a row'), code: '.tag { display: inline-block; background: #bbf7d0; padding: 10px 20px; }', note: L('div поводяться як рядкові.', 'div ведут себя как строчные.', 'The divs behave inline.') },
        { title: 'none vs hidden', code: '.tag:first-child { display: none; }\n.pill:nth-of-type(1) { visibility: hidden; }\n.secret { background: #fee2e2; }', note: L('Перший div зник з місцем, перший span — лише візуально.', 'Первый div исчез с местом, первый span — только визуально.', 'The first div vanished with its space, the first span only visually.') }
      ],
      task: {
        text: L('Зроби <code>.pill</code> елементами <code>inline-block</code> з шириною <code>100px</code> і padding <code>10px</code>. Розташуй <code>.tag</code> в один рядок через <code>inline-block</code>. Повністю сховай <code>.secret</code> (<code>display: none</code>).', 'Сделай <code>.pill</code> элементами <code>inline-block</code> с шириной <code>100px</code> и padding <code>10px</code>. Расположи <code>.tag</code> в одну строку через <code>inline-block</code>. Полностью спрячь <code>.secret</code> (<code>display: none</code>).', 'Make <code>.pill</code> <code>inline-block</code> with <code>100px</code> width and <code>10px</code> padding. Put the <code>.tag</code>s in one row with <code>inline-block</code>. Fully hide <code>.secret</code> (<code>display: none</code>).'),
        how: [L('Три правила з <code>display</code>.', 'Три правила с <code>display</code>.', 'Three rules with <code>display</code>.')],
        starter: '',
        solution: '.pill {\n  display: inline-block;\n  width: 100px;\n  padding: 10px;\n}\n.tag {\n  display: inline-block;\n}\n.secret {\n  display: none;\n}',
        hint: L('<code>width</code> спрацює лише після <code>display: inline-block</code>.', '<code>width</code> сработает только после <code>display: inline-block</code>.', '<code>width</code> only works after <code>display: inline-block</code>.'),
        check: function (doc, win) { var g = function (s) { return win.getComputedStyle(doc.querySelector(s)); }; var tags = doc.querySelectorAll('.tag'); return g('.pill').display === 'inline-block' && g('.pill').width === '100px' && g('.pill').paddingTop === '10px' && g('.tag').display === 'inline-block' && tags[0].offsetTop === tags[1].offsetTop && g('.secret').display === 'none'; }
      },
      quiz: { q: L('Який display ховає елемент разом з місцем?', 'Какой display прячет элемент вместе с местом?', 'Which display hides an element along with its space?'), options: ['hidden', 'none', 'inline'], answer: 1, explain: L('<code>display: none</code>.', '<code>display: none</code>.', '<code>display: none</code>.') },
      ref: [{ code: 'display: block|inline|inline-block|none', d: L('тип відображення', 'тип отображения', 'display type') }, { code: 'visibility: hidden', d: L('сховати, зберігши місце', 'спрятать, сохранив место', 'hide but keep space') }]
    },
    {
      id: 'combinators', chapter: CH3,
      title: L('Комбінатори та псевдокласи', 'Комбинаторы и псевдоклассы', 'Combinators and pseudo-classes'),
      html: '<nav class="menu">\n  <a href="#">Home</a>\n  <a href="#">Blog</a>\n  <a href="#">Shop</a>\n  <a href="#">Contacts</a>\n</nav>\n<ul class="list">\n  <li>One</li><li>Two</li><li>Three</li><li>Four</li><li>Five</li><li>Six</li>\n</ul>\n<p>Outside <a href="#">link</a></p>',
      theory: L(
        `<p><b>Комбінатори</b> вибирають елементи за їхнім розташуванням:</p>
<ul><li><code>.menu a</code> (пробіл) — нащадки: усі <code>a</code> всередині <code>.menu</code> на будь-якій глибині</li><li><code>.list &gt; li</code> — лише прямі діти</li><li><code>h2 + p</code> — перший сусід одразу після h2</li><li><code>h2 ~ p</code> — усі наступні сусіди</li></ul>
<p><b>Псевдокласи</b> вибирають за станом або позицією:</p>
<ul><li><code>:hover</code>, <code>:focus</code>, <code>:active</code> — наведення, фокус, натискання</li><li><code>:first-child</code>, <code>:last-child</code>, <code>:nth-child(2)</code>, <code>:nth-child(odd/even)</code>, <code>:nth-child(3n)</code></li><li><code>:not(.x)</code> — усі, крім</li><li><code>:checked</code>, <code>:disabled</code>, <code>:valid</code> — стани полів</li></ul>
<p><b>Псевдоелементи</b> <code>::before</code> і <code>::after</code> додають «віртуальний» вміст через <code>content: "…"</code>.</p>`,
        `<p><b>Комбинаторы</b> выбирают элементы по их расположению:</p>
<ul><li><code>.menu a</code> (пробел) — потомки: все <code>a</code> внутри <code>.menu</code> на любой глубине</li><li><code>.list &gt; li</code> — только прямые дети</li><li><code>h2 + p</code> — первый сосед сразу после h2</li><li><code>h2 ~ p</code> — все следующие соседи</li></ul>
<p><b>Псевдоклассы</b> выбирают по состоянию или позиции:</p>
<ul><li><code>:hover</code>, <code>:focus</code>, <code>:active</code> — наведение, фокус, нажатие</li><li><code>:first-child</code>, <code>:last-child</code>, <code>:nth-child(2)</code>, <code>:nth-child(odd/even)</code>, <code>:nth-child(3n)</code></li><li><code>:not(.x)</code> — все, кроме</li><li><code>:checked</code>, <code>:disabled</code>, <code>:valid</code> — состояния полей</li></ul>
<p><b>Псевдоэлементы</b> <code>::before</code> и <code>::after</code> добавляют «виртуальное» содержимое через <code>content: "…"</code>.</p>`,
        `<p><b>Combinators</b> select elements by position:</p>
<ul><li><code>.menu a</code> (space) — descendants: every <code>a</code> inside <code>.menu</code> at any depth</li><li><code>.list &gt; li</code> — direct children only</li><li><code>h2 + p</code> — the first sibling right after an h2</li><li><code>h2 ~ p</code> — all following siblings</li></ul>
<p><b>Pseudo-classes</b> select by state or position:</p>
<ul><li><code>:hover</code>, <code>:focus</code>, <code>:active</code> — hover, focus, pressed</li><li><code>:first-child</code>, <code>:last-child</code>, <code>:nth-child(2)</code>, <code>:nth-child(odd/even)</code>, <code>:nth-child(3n)</code></li><li><code>:not(.x)</code> — everything except</li><li><code>:checked</code>, <code>:disabled</code>, <code>:valid</code> — field states</li></ul>
<p><b>Pseudo-elements</b> <code>::before</code> and <code>::after</code> add “virtual” content with <code>content: "…"</code>.</p>`),
      why: L(`<p>Без комбінаторів довелося б давати клас кожному посиланню меню чи кожному другому рядку таблиці. Селектори на кшталт <code>.menu a</code> чи <code>tr:nth-child(even)</code> роблять HTML чистим, а CSS — розумним.</p>`,
        `<p>Без комбинаторов пришлось бы давать класс каждой ссылке меню или каждой второй строке таблицы. Селекторы вроде <code>.menu a</code> или <code>tr:nth-child(even)</code> делают HTML чистым, а CSS — умным.</p>`,
        `<p>Without combinators you’d need a class on every menu link or every other table row. Selectors like <code>.menu a</code> or <code>tr:nth-child(even)</code> keep HTML clean and CSS smart.</p>`),
      mistakes: L(`<ul><li>Пробіл має значення: <code>.menu a</code> (a всередині .menu) ≠ <code>.menu.a</code> (елемент з обома класами).</li><li><code>::before</code> без <code>content</code> не з’явиться.</li></ul>`,
        `<ul><li>Пробел важен: <code>.menu a</code> (a внутри .menu) ≠ <code>.menu.a</code> (элемент с обоими классами).</li><li><code>::before</code> без <code>content</code> не появится.</li></ul>`,
        `<ul><li>The space matters: <code>.menu a</code> (a inside .menu) ≠ <code>.menu.a</code> (an element with both classes).</li><li><code>::before</code> without <code>content</code> won’t appear.</li></ul>`),
      examples: [
        { title: L('Нащадки', 'Потомки', 'Descendants'), code: '.menu a {\n  color: white;\n  background: #1e293b;\n  padding: 8px 14px;\n  text-decoration: none;\n  border-radius: 8px;\n}\n.menu a:hover { background: #3b82f6; }', note: L('Стиль лише для посилань меню, а не всіх.', 'Стиль только для ссылок меню, а не всех.', 'Only menu links are styled, not all links.') },
        { title: 'nth-child', code: '.list li:nth-child(odd) { background: #f1f5f9; }\n.list li:first-child { font-weight: bold; }\n.list li:last-child { color: crimson; }\n.list li:nth-child(3n) { text-decoration: underline; }', note: L('Смугастий список без жодного класу.', 'Полосатый список без единого класса.', 'A striped list without any classes.') },
        { title: ':not', code: '.menu a:not(:last-child) { margin-right: 6px; border-right: 2px solid #94a3b8; padding-right: 6px; }', note: L('Роздільник у всіх, крім останнього.', 'Разделитель у всех, кроме последнего.', 'A divider on all but the last.') },
        { title: '::before / ::after', code: '.list li::before { content: "✔ "; color: #22c55e; }\n.menu a::after { content: " →"; }', note: L('Іконки без зміни HTML.', 'Иконки без изменения HTML.', 'Icons without touching the HTML.') }
      ],
      task: {
        text: L('Зроби посилання <b>всередині</b> <code>.menu</code> зеленими (<code>green</code>), не зачіпаючи посилання поза меню. Парні пункти списку (<code>:nth-child(even)</code>) зроби з фоном <code>lightgray</code>. Першому пункту списку дай жирний шрифт.', 'Сделай ссылки <b>внутри</b> <code>.menu</code> зелёными (<code>green</code>), не затрагивая ссылки вне меню. Чётные пункты списка (<code>:nth-child(even)</code>) сделай с фоном <code>lightgray</code>. Первому пункту списка дай жирный шрифт.', 'Make links <b>inside</b> <code>.menu</code> green (<code>green</code>) without affecting links outside it. Give even list items (<code>:nth-child(even)</code>) a <code>lightgray</code> background. Make the first list item bold.'),
        how: [L('<code>.menu a { color: green; }</code>', '<code>.menu a { color: green; }</code>', '<code>.menu a { color: green; }</code>'), L('<code>.list li:nth-child(even)</code> і <code>.list li:first-child</code>.', '<code>.list li:nth-child(even)</code> и <code>.list li:first-child</code>.', '<code>.list li:nth-child(even)</code> and <code>.list li:first-child</code>.')],
        starter: '',
        solution: '.menu a {\n  color: green;\n}\n.list li:nth-child(even) {\n  background: lightgray;\n}\n.list li:first-child {\n  font-weight: bold;\n}',
        hint: L('Якщо зелене стало й посилання внизу — ти написав просто <code>a { }</code>.', 'Если зелёной стала и ссылка внизу — ты написал просто <code>a { }</code>.', 'If the bottom link went green too, you wrote just <code>a { }</code>.'),
        check: function (doc, win) { var g = function (el) { return win.getComputedStyle(el); }; var lis = doc.querySelectorAll('.list li'); var out = doc.querySelector('p a'); return g(doc.querySelector('.menu a')).color === 'rgb(0, 128, 0)' && g(out).color !== 'rgb(0, 128, 0)' && g(lis[1]).backgroundColor === 'rgb(211, 211, 211)' && g(lis[2]).backgroundColor !== 'rgb(211, 211, 211)' && (g(lis[0]).fontWeight === '700' || g(lis[0]).fontWeight === 'bold'); }
      },
      quiz: { q: L('Що вибирає <code>ul &gt; li</code>?', 'Что выбирает <code>ul &gt; li</code>?', 'What does <code>ul &gt; li</code> select?'), options: [L('усі li на сторінці', 'все li на странице', 'every li on the page'), L('лише прямих дітей ul', 'только прямых детей ul', 'only direct children of ul'), L('li після ul', 'li после ul', 'li after a ul')], answer: 1, explain: L('&gt; — прямі діти.', '&gt; — прямые дети.', '&gt; means direct children.') },
      ref: [{ code: 'A B   A > B   A + B', d: L('нащадки, діти, сусід', 'потомки, дети, сосед', 'descendant, child, sibling') }, { code: ':hover :nth-child(odd) :not()', d: L('псевдокласи', 'псевдоклассы', 'pseudo-classes') }, { code: '::before { content: "" }', d: L('псевдоелемент', 'псевдоэлемент', 'pseudo-element') }]
    },
    {
      id: 'cascade', chapter: CH3,
      title: L('Каскад, специфічність і успадкування', 'Каскад, специфичность и наследование', 'Cascade, specificity and inheritance'),
      html: '<div class="box" id="hero">\n  <p class="text">Which colour wins?</p>\n  <p>Inherited text</p>\n</div>',
      theory: L(
        `<p>Коли кілька правил задають ту саму властивість, браузер обирає переможця за <b>каскадом</b>:</p>
<ol><li><b>Важливість</b>: <code>!important</code> перемагає все (використовуй якомога рідше)</li><li><b>Специфічність</b> селектора: id (1-0-0) &gt; клас/псевдоклас/атрибут (0-1-0) &gt; тег (0-0-1). <code>#hero .text</code> = 1-1-0 сильніше за <code>.box .text</code> = 0-2-0</li><li><b>Порядок</b>: за рівної специфічності перемагає правило, написане <b>пізніше</b></li></ol>
<p>Атрибут <code>style=""</code> сильніший за будь-який селектор.</p>
<h4>Успадкування</h4>
<p>Деякі властивості (колір, шрифт, line-height) <b>успадковуються</b> дітьми від батьків. Інші (border, padding, background, margin) — ні. Ключові слова <code>inherit</code>, <code>initial</code>, <code>unset</code> керують цим явно.</p>`,
        `<p>Когда несколько правил задают одно и то же свойство, браузер выбирает победителя по <b>каскаду</b>:</p>
<ol><li><b>Важность</b>: <code>!important</code> побеждает всё (используй как можно реже)</li><li><b>Специфичность</b> селектора: id (1-0-0) &gt; класс/псевдокласс/атрибут (0-1-0) &gt; тег (0-0-1). <code>#hero .text</code> = 1-1-0 сильнее, чем <code>.box .text</code> = 0-2-0</li><li><b>Порядок</b>: при равной специфичности побеждает правило, написанное <b>позже</b></li></ol>
<p>Атрибут <code>style=""</code> сильнее любого селектора.</p>
<h4>Наследование</h4>
<p>Некоторые свойства (цвет, шрифт, line-height) <b>наследуются</b> детьми от родителей. Другие (border, padding, background, margin) — нет. Ключевые слова <code>inherit</code>, <code>initial</code>, <code>unset</code> управляют этим явно.</p>`,
        `<p>When several rules set the same property, the browser picks a winner by the <b>cascade</b>:</p>
<ol><li><b>Importance</b>: <code>!important</code> beats everything (use it as rarely as possible)</li><li>Selector <b>specificity</b>: id (1-0-0) &gt; class/pseudo-class/attribute (0-1-0) &gt; tag (0-0-1). <code>#hero .text</code> = 1-1-0 beats <code>.box .text</code> = 0-2-0</li><li><b>Order</b>: with equal specificity the rule written <b>later</b> wins</li></ol>
<p>A <code>style=""</code> attribute beats any selector.</p>
<h4>Inheritance</h4>
<p>Some properties (colour, font, line-height) are <b>inherited</b> by children. Others (border, padding, background, margin) aren’t. The keywords <code>inherit</code>, <code>initial</code>, <code>unset</code> control this explicitly.</p>`),
      why: L(`<p>Слово «Cascading» у назві CSS — саме про це. Каскад дозволяє задати загальні стилі (усі абзаци сірі) і точково їх перевизначати (а цей — червоний). Розуміння специфічності рятує від «чому мій стиль не застосовується?!» і від хаосу з <code>!important</code>.</p>`,
        `<p>Слово «Cascading» в названии CSS — именно об этом. Каскад позволяет задать общие стили (все абзацы серые) и точечно их переопределять (а этот — красный). Понимание специфичности спасает от «почему мой стиль не применяется?!» и от хаоса с <code>!important</code>.</p>`,
        `<p>The “Cascading” in CSS is exactly this. The cascade lets you set general styles (all paragraphs grey) and override them precisely (this one red). Understanding specificity saves you from “why isn’t my style applied?!” and from <code>!important</code> chaos.</p>`),
      mistakes: L(`<ul><li>Лікувати все через <code>!important</code> — потім його доводиться перебивати іншим <code>!important</code>.</li><li>Стилізувати через id — їх важко перевизначити. Краще класи.</li></ul>`,
        `<ul><li>Лечить всё через <code>!important</code> — потом его приходится перебивать другим <code>!important</code>.</li><li>Стилизовать через id — их сложно переопределить. Лучше классы.</li></ul>`,
        `<ul><li>Fixing everything with <code>!important</code> — then you need another <code>!important</code> to override it.</li><li>Styling via ids — hard to override. Prefer classes.</li></ul>`),
      examples: [
        { title: L('Порядок', 'Порядок', 'Order'), code: 'p { color: blue; }\np { color: red; }', note: L('Однакова специфічність — перемагає останнє.', 'Одинаковая специфичность — побеждает последнее.', 'Same specificity — the last wins.') },
        { title: L('Специфічність', 'Специфичность', 'Specificity'), code: '#hero .text { color: green; }\n.box .text { color: red; }\np { color: blue; }', note: L('Зелений: id робить селектор найсильнішим, хоча він вище.', 'Зелёный: id делает селектор сильнейшим, хотя он выше.', 'Green: the id makes it strongest, even though it’s earlier.') },
        { title: L('Успадкування', 'Наследование', 'Inheritance'), code: '.box {\n  color: purple;\n  font-family: monospace;\n  border: 2px solid purple;\n  padding: 10px;\n}', note: L('Колір і шрифт успадкувалися абзацами, рамка — ні.', 'Цвет и шрифт унаследовались абзацами, рамка — нет.', 'Colour and font were inherited by paragraphs, the border wasn’t.') },
        { title: '!important', code: '.text { color: orange !important; }\n#hero .text { color: green; }', note: L('!important перебив навіть id. Уникай цього.', '!important перебил даже id. Избегай этого.', '!important beat even the id. Avoid it.') }
      ],
      task: {
        text: L('У коді вже є правило <code>#hero .text { color: red; }</code>. Не змінюючи і не видаляючи його та не використовуючи <code>!important</code>, зроби текст <code>.text</code> синім (<code>blue</code>) за рахунок <b>сильнішого селектора</b>. Окремо задай <code>.box</code> колір <code>purple</code> — другий абзац має успадкувати його.', 'В коде уже есть правило <code>#hero .text { color: red; }</code>. Не меняя и не удаляя его и не используя <code>!important</code>, сделай текст <code>.text</code> синим (<code>blue</code>) за счёт <b>более сильного селектора</b>. Отдельно задай <code>.box</code> цвет <code>purple</code> — второй абзац должен унаследовать его.', 'The code already has <code>#hero .text { color: red; }</code>. Without changing or removing it and without <code>!important</code>, make <code>.text</code> blue (<code>blue</code>) using a <b>stronger selector</b>. Separately give <code>.box</code> the colour <code>purple</code> — the second paragraph should inherit it.'),
        how: [L('Наприклад, <code>#hero p.text</code> (1-1-1) сильніший за <code>#hero .text</code> (1-1-0).', 'Например, <code>#hero p.text</code> (1-1-1) сильнее <code>#hero .text</code> (1-1-0).', 'E.g. <code>#hero p.text</code> (1-1-1) beats <code>#hero .text</code> (1-1-0).'), L('Або <code>#hero.box .text</code>.', 'Или <code>#hero.box .text</code>.', 'Or <code>#hero.box .text</code>.')],
        starter: '#hero .text {\n  color: red;\n}\n',
        solution: '#hero .text {\n  color: red;\n}\n#hero p.text {\n  color: blue;\n}\n.box {\n  color: purple;\n}',
        hint: L('Додай до селектора ще один тег або клас.', 'Добавь к селектору ещё один тег или класс.', 'Add one more tag or class to the selector.'),
        check: function (doc, win) {
          var css = Array.prototype.map.call(doc.querySelectorAll('style'), function (s) { return s.textContent; }).join('\n');
          if (/!important/.test(css) || !/#hero\s+\.text\s*\{\s*color:\s*red;?\s*\}/.test(css)) return false;
          var ps = doc.querySelectorAll('p');
          return win.getComputedStyle(ps[0]).color === 'rgb(0, 0, 255)' && win.getComputedStyle(ps[1]).color === 'rgb(128, 0, 128)';
        }
      },
      quiz: { q: L('Що сильніше: <code>.a .b .c</code> чи <code>#x</code>?', 'Что сильнее: <code>.a .b .c</code> или <code>#x</code>?', 'Which is stronger: <code>.a .b .c</code> or <code>#x</code>?'), options: ['.a .b .c', '#x', L('однаково', 'одинаково', 'equal')], answer: 1, explain: L('Один id (1-0-0) сильніший за будь-яку кількість класів.', 'Один id (1-0-0) сильнее любого количества классов.', 'One id (1-0-0) beats any number of classes.') },
      ref: [{ code: 'id > class > tag', d: L('специфічність', 'специфичность', 'specificity') }, { code: 'inherit initial', d: L('успадкування', 'наследование', 'inheritance') }]
    },
    {
      id: 'units', chapter: CH3,
      title: L('Одиниці виміру', 'Единицы измерения', 'Units'),
      html: '<div class="wrap">\n  <h1>Units</h1>\n  <p class="em">Text in em</p>\n  <div class="half">50% width</div>\n  <div class="screen">vw / vh</div>\n</div>',
      theory: L(
        `<p>Розміри в CSS бувають <b>абсолютні</b> й <b>відносні</b>:</p>
<table class="mini"><tr><td><code>px</code></td><td>піксель — фіксований розмір</td></tr><tr><td><code>%</code></td><td>відсоток від батьківського елемента</td></tr><tr><td><code>em</code></td><td>відносно розміру шрифту <b>самого елемента</b> (або батька для font-size)</td></tr><tr><td><code>rem</code></td><td>відносно розміру шрифту <b>кореня</b> (<code>html</code>, зазвичай 16px): <code>1.5rem</code> = 24px</td></tr><tr><td><code>vw / vh</code></td><td>1% ширини / висоти вікна</td></tr><tr><td><code>ch</code></td><td>ширина символу «0» — зручно для довжини рядка</td></tr></table>
<p>Функції: <code>calc(100% - 40px)</code> — обчислення, <code>clamp(1rem, 4vw, 3rem)</code> — «від мінімуму до максимуму, а між ними — гумово», <code>min()</code>, <code>max()</code>.</p>`,
        `<p>Размеры в CSS бывают <b>абсолютные</b> и <b>относительные</b>:</p>
<table class="mini"><tr><td><code>px</code></td><td>пиксель — фиксированный размер</td></tr><tr><td><code>%</code></td><td>процент от родительского элемента</td></tr><tr><td><code>em</code></td><td>относительно размера шрифта <b>самого элемента</b> (или родителя для font-size)</td></tr><tr><td><code>rem</code></td><td>относительно размера шрифта <b>корня</b> (<code>html</code>, обычно 16px): <code>1.5rem</code> = 24px</td></tr><tr><td><code>vw / vh</code></td><td>1% ширины / высоты окна</td></tr><tr><td><code>ch</code></td><td>ширина символа «0» — удобно для длины строки</td></tr></table>
<p>Функции: <code>calc(100% - 40px)</code> — вычисление, <code>clamp(1rem, 4vw, 3rem)</code> — «от минимума до максимума, а между ними — резиново», <code>min()</code>, <code>max()</code>.</p>`,
        `<p>CSS sizes are <b>absolute</b> or <b>relative</b>:</p>
<table class="mini"><tr><td><code>px</code></td><td>pixel — a fixed size</td></tr><tr><td><code>%</code></td><td>a percentage of the parent</td></tr><tr><td><code>em</code></td><td>relative to the element’s <b>own</b> font size (the parent’s for font-size)</td></tr><tr><td><code>rem</code></td><td>relative to the <b>root</b> font size (<code>html</code>, usually 16px): <code>1.5rem</code> = 24px</td></tr><tr><td><code>vw / vh</code></td><td>1% of the window width / height</td></tr><tr><td><code>ch</code></td><td>the width of “0” — handy for line length</td></tr></table>
<p>Functions: <code>calc(100% - 40px)</code> — calculations, <code>clamp(1rem, 4vw, 3rem)</code> — “from min to max, fluid in between”, <code>min()</code>, <code>max()</code>.</p>`),
      why: L(`<p>Екрани бувають від 320px (телефон) до 3840px (4K-монітор). Відносні одиниці роблять дизайн «гумовим». А <code>rem</code> поважає налаштування користувача: якщо людина зі слабким зором збільшила шрифт у браузері, весь сайт масштабується разом з ним.</p>`,
        `<p>Экраны бывают от 320px (телефон) до 3840px (4K-монитор). Относительные единицы делают дизайн «резиновым». А <code>rem</code> уважает настройки пользователя: если человек со слабым зрением увеличил шрифт в браузере, весь сайт масштабируется вместе с ним.</p>`,
        `<p>Screens range from 320px (phones) to 3840px (4K monitors). Relative units make design fluid. And <code>rem</code> respects user settings: if someone with poor eyesight enlarges the browser font, the whole site scales with it.</p>`),
      mistakes: L(`<ul><li>Вкладені <code>em</code> множаться: 1.2em у 1.2em у 1.2em — текст несподівано великий. Для шрифтів надійніший <code>rem</code>.</li><li><code>calc(100%-40px)</code> без пробілів навколо мінуса — не спрацює.</li></ul>`,
        `<ul><li>Вложенные <code>em</code> умножаются: 1.2em в 1.2em в 1.2em — текст неожиданно большой. Для шрифтов надёжнее <code>rem</code>.</li><li><code>calc(100%-40px)</code> без пробелов вокруг минуса — не сработает.</li></ul>`,
        `<ul><li>Nested <code>em</code>s multiply: 1.2em in 1.2em in 1.2em — surprisingly big text. <code>rem</code> is safer for fonts.</li><li><code>calc(100%-40px)</code> without spaces around the minus — won’t work.</li></ul>`),
      examples: [
        { title: 'rem / em', code: 'html { font-size: 16px; }\nh1 { font-size: 2rem; }\n.em { font-size: 20px; padding: 1em; background: #e0f2fe; }', note: L('h1 = 32px; padding .em = 20px (від його шрифту).', 'h1 = 32px; padding .em = 20px (от его шрифта).', 'h1 = 32px; .em padding = 20px (from its own font).') },
        { title: '%', code: '.wrap { width: 400px; border: 1px dashed; }\n.half { width: 50%; background: #fde68a; }', note: L('50% від 400px = 200px.', '50% от 400px = 200px.', '50% of 400px = 200px.') },
        { title: 'vw / vh', code: '.screen {\n  width: 50vw;\n  height: 20vh;\n  background: #c7d2fe;\n}', note: L('Залежить від розміру вікна, а не батька.', 'Зависит от размера окна, а не родителя.', 'Depends on the window, not the parent.') },
        { title: 'calc / clamp', code: '.half { width: calc(100% - 40px); margin: 0 20px; background: #bbf7d0; }\nh1 { font-size: clamp(1.5rem, 6vw, 3rem); }', note: L('Заголовок «дихає» з розміром вікна, але в межах.', 'Заголовок «дышит» с размером окна, но в пределах.', 'The heading scales with the window, within limits.') }
      ],
      task: {
        text: L('Задай <code>h1</code> розмір <code>2.5rem</code>. Для <code>.wrap</code> — ширину <code>600px</code>. Для <code>.half</code> — ширину <code>50%</code>. Для <code>.screen</code> — ширину <code>calc(100% - 100px)</code>.', 'Задай <code>h1</code> размер <code>2.5rem</code>. Для <code>.wrap</code> — ширину <code>600px</code>. Для <code>.half</code> — ширину <code>50%</code>. Для <code>.screen</code> — ширину <code>calc(100% - 100px)</code>.', 'Set <code>h1</code> to <code>2.5rem</code>. Give <code>.wrap</code> a width of <code>600px</code>, <code>.half</code> <code>50%</code>, and <code>.screen</code> <code>calc(100% - 100px)</code>.'),
        how: [L('Пробіли навколо <code>-</code> у calc обов’язкові.', 'Пробелы вокруг <code>-</code> в calc обязательны.', 'Spaces around <code>-</code> in calc are required.')],
        starter: '',
        solution: 'h1 {\n  font-size: 2.5rem;\n}\n.wrap {\n  width: 600px;\n}\n.half {\n  width: 50%;\n}\n.screen {\n  width: calc(100% - 100px);\n}',
        hint: L('2.5rem = 40px за стандартного шрифту.', '2.5rem = 40px при стандартном шрифте.', '2.5rem = 40px with the default font size.'),
        check: function (doc, win) { var g = function (s) { return doc.querySelector(s); }; return win.getComputedStyle(g('h1')).fontSize === '40px' && g('.wrap').offsetWidth === 600 && g('.half').offsetWidth === 300 && g('.screen').offsetWidth === 500; }
      },
      quiz: { q: L('Від чого рахується <code>rem</code>?', 'От чего считается <code>rem</code>?', 'What is <code>rem</code> relative to?'), options: [L('шрифт батька', 'шрифт родителя', 'the parent’s font'), L('шрифт html (кореня)', 'шрифт html (корня)', 'the html (root) font'), L('ширина вікна', 'ширина окна', 'the window width')], answer: 1, explain: L('r = root.', 'r = root.', 'r = root.') },
      ref: [{ code: 'px % em rem vw vh', d: L('одиниці', 'единицы', 'units') }, { code: 'calc() clamp()', d: L('обчислення розмірів', 'вычисление размеров', 'size functions') }]
    }
  ]);
})();
