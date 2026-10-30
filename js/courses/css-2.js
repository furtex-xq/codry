// CSS — частина 2: Flexbox, Grid, позиціонування, анімації, адаптивність, змінні, проєкти.
(function () {
  const L = Codry.L;
  const CH4 = L('Розміщення: Flexbox і Grid', 'Размещение: Flexbox и Grid', 'Layout: Flexbox and Grid');
  const CH5 = L('Позиціонування та анімації', 'Позиционирование и анимации', 'Positioning and animation');
  const CH6 = L('Адаптивний сучасний CSS', 'Адаптивный современный CSS', 'Responsive modern CSS');
  const CH7 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');
  const BOXES = '<div class="row">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>\n<style>.box{background:#8b5cf6;color:#fff;padding:20px;font:700 20px sans-serif;border-radius:10px;text-align:center}</style>';

  // Знайти правило в таблицях стилів (зокрема всередині @media).
  // Використовується лише всередині check-функцій, тому дублюється там текстом.

  Codry.steps('css', [
    {
      id: 'flex', chapter: CH4,
      title: L('Flexbox: основи', 'Flexbox: основы', 'Flexbox basics'),
      html: BOXES,
      theory: L(
        `<p><b>Flexbox</b> — найзручніший спосіб розмістити елементи в <b>ряд</b> або <b>колонку</b>. Вмикається на <b>батьківському</b> елементі (контейнері):</p>
<pre class="inline-code">.row { display: flex; }</pre>
<p>Після цього прямі діти стають <b>flex-елементами</b> і вишиковуються в ряд.</p>
<ul><li><code>flex-direction</code>: <code>row</code> (за замовчуванням), <code>column</code>, <code>row-reverse</code>, <code>column-reverse</code></li><li><code>gap: 12px</code> — відстань між елементами</li><li><code>justify-content</code> — розподіл уздовж <b>головної осі</b>: <code>flex-start</code>, <code>center</code>, <code>flex-end</code>, <code>space-between</code>, <code>space-around</code>, <code>space-evenly</code></li><li><code>align-items</code> — вирівнювання по <b>поперечній осі</b>: <code>stretch</code>, <code>center</code>, <code>flex-start</code>, <code>flex-end</code></li></ul>
<p>Головна вісь — напрямок <code>flex-direction</code>. Для <code>row</code> вона горизонтальна, для <code>column</code> — вертикальна.</p>`,
        `<p><b>Flexbox</b> — самый удобный способ расположить элементы в <b>ряд</b> или <b>колонку</b>. Включается на <b>родительском</b> элементе (контейнере):</p>
<pre class="inline-code">.row { display: flex; }</pre>
<p>После этого прямые дети становятся <b>flex-элементами</b> и выстраиваются в ряд.</p>
<ul><li><code>flex-direction</code>: <code>row</code> (по умолчанию), <code>column</code>, <code>row-reverse</code>, <code>column-reverse</code></li><li><code>gap: 12px</code> — расстояние между элементами</li><li><code>justify-content</code> — распределение вдоль <b>главной оси</b>: <code>flex-start</code>, <code>center</code>, <code>flex-end</code>, <code>space-between</code>, <code>space-around</code>, <code>space-evenly</code></li><li><code>align-items</code> — выравнивание по <b>поперечной оси</b>: <code>stretch</code>, <code>center</code>, <code>flex-start</code>, <code>flex-end</code></li></ul>
<p>Главная ось — направление <code>flex-direction</code>. Для <code>row</code> она горизонтальная, для <code>column</code> — вертикальная.</p>`,
        `<p><b>Flexbox</b> is the easiest way to lay items out in a <b>row</b> or <b>column</b>. Turn it on for the <b>parent</b> (the container):</p>
<pre class="inline-code">.row { display: flex; }</pre>
<p>Its direct children become <b>flex items</b> and line up in a row.</p>
<ul><li><code>flex-direction</code>: <code>row</code> (default), <code>column</code>, <code>row-reverse</code>, <code>column-reverse</code></li><li><code>gap: 12px</code> — space between items</li><li><code>justify-content</code> — distribution along the <b>main axis</b>: <code>flex-start</code>, <code>center</code>, <code>flex-end</code>, <code>space-between</code>, <code>space-around</code>, <code>space-evenly</code></li><li><code>align-items</code> — alignment on the <b>cross axis</b>: <code>stretch</code>, <code>center</code>, <code>flex-start</code>, <code>flex-end</code></li></ul>
<p>The main axis follows <code>flex-direction</code>: horizontal for <code>row</code>, vertical for <code>column</code>.</p>`),
      why: L(`<p>До Flexbox центрувати блок по вертикалі було справжньою мукою з «хаками». Тепер це три рядки. Flexbox ідеальний для одновимірних розкладок: меню, ряд кнопок, картка з іконкою і текстом, шапка сайту.</p>`,
        `<p>До Flexbox центрировать блок по вертикали было настоящей мукой с «хаками». Теперь это три строки. Flexbox идеален для одномерных раскладок: меню, ряд кнопок, карточка с иконкой и текстом, шапка сайта.</p>`,
        `<p>Before Flexbox, vertical centring was a nightmare of hacks. Now it’s three lines. Flexbox is perfect for one-dimensional layouts: menus, button rows, a card with an icon and text, a site header.</p>`),
      mistakes: L(`<ul><li>Ставити <code>display: flex</code> на дочірні елементи замість батька.</li><li>Плутати осі: для <code>column</code> <code>justify-content</code> працює вертикально.</li></ul>`,
        `<ul><li>Ставить <code>display: flex</code> на дочерние элементы вместо родителя.</li><li>Путать оси: для <code>column</code> <code>justify-content</code> работает вертикально.</li></ul>`,
        `<ul><li>Putting <code>display: flex</code> on the children instead of the parent.</li><li>Mixing up axes: with <code>column</code>, <code>justify-content</code> works vertically.</li></ul>`),
      examples: [
        { title: L('В ряд', 'В ряд', 'In a row'), code: '.row {\n  display: flex;\n  gap: 12px;\n}', note: L('Блоки стали в ряд з відступами.', 'Блоки встали в ряд с отступами.', 'The boxes line up with gaps.') },
        { title: 'space-between', code: '.row {\n  display: flex;\n  justify-content: space-between;\n  background: #ede9fe;\n  padding: 10px;\n}', note: L('Крайні — по краях, решта між ними.', 'Крайние — по краям, остальные между ними.', 'The outer ones hug the edges.') },
        { title: L('Центрування', 'Центрирование', 'Centring'), code: '.row {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 8px;\n  height: 220px;\n  background: #f5f3ff;\n}', note: L('Ідеальне центрування по обох осях.', 'Идеальное центрирование по обеим осям.', 'Perfect centring on both axes.') },
        { title: L('Колонка', 'Колонка', 'Column'), code: '.row {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: 200px;\n}', note: L('Ті самі блоки стовпчиком.', 'Те же блоки столбиком.', 'The same boxes stacked.') }
      ],
      task: {
        text: L('Зроби <code>.row</code> flex-контейнером: блоки по центру (<code>justify-content: center</code>), вирівняні по центру вертикально (<code>align-items: center</code>), з відстанню <code>20px</code>, висота контейнера <code>200px</code>.', 'Сделай <code>.row</code> flex-контейнером: блоки по центру (<code>justify-content: center</code>), выровненные по центру вертикально (<code>align-items: center</code>), с расстоянием <code>20px</code>, высота контейнера <code>200px</code>.', 'Make <code>.row</code> a flex container: items centred (<code>justify-content: center</code>), vertically centred (<code>align-items: center</code>), with a <code>20px</code> gap, and a container height of <code>200px</code>.'),
        how: [L('П’ять властивостей у <code>.row</code>.', 'Пять свойств в <code>.row</code>.', 'Five properties on <code>.row</code>.')],
        starter: '.row {\n  \n}\n',
        solution: '.row {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n  height: 200px;\n}',
        hint: L('Усе пишеться в батьківському <code>.row</code>, не в <code>.box</code>.', 'Всё пишется в родительском <code>.row</code>, не в <code>.box</code>.', 'Everything goes on the parent <code>.row</code>, not <code>.box</code>.'),
        check: function (doc, win) { var s = win.getComputedStyle(doc.querySelector('.row')); return s.display === 'flex' && s.justifyContent === 'center' && s.alignItems === 'center' && s.columnGap === '20px' && s.height === '200px'; }
      },
      quiz: { q: L('Яка властивість ставить flex-елементи стовпчиком?', 'Какое свойство ставит flex-элементы столбиком?', 'Which property stacks flex items vertically?'), options: ['align-items: column', 'flex-direction: column', 'display: column'], answer: 1, explain: L('flex-direction змінює головну вісь.', 'flex-direction меняет главную ось.', 'flex-direction changes the main axis.') },
      ref: [{ code: 'display: flex; gap', d: L('flex-контейнер', 'flex-контейнер', 'flex container') }, { code: 'justify-content / align-items', d: L('головна / поперечна вісь', 'главная / поперечная ось', 'main / cross axis') }]
    },
    {
      id: 'flex-2', chapter: CH4,
      title: L('Flexbox: розміри, перенос, порядок', 'Flexbox: размеры, перенос, порядок', 'Flexbox: sizing, wrapping, order'),
      html: '<div class="row">\n  <div class="box">Logo</div>\n  <div class="box grow">Search</div>\n  <div class="box">Login</div>\n</div>\n<div class="tags">\n  <span>html</span><span>css</span><span>javascript</span><span>python</span><span>design</span><span>games</span><span>roblox</span><span>sql</span>\n</div>\n<style>.box{background:#0ea5e9;color:#fff;padding:14px;border-radius:10px;font:700 16px sans-serif}.tags span{background:#e0f2fe;padding:6px 12px;border-radius:99px;font:14px sans-serif}.tags{width:300px;margin-top:20px}</style>',
      theory: L(
        `<p>Властивості <b>дочірніх</b> flex-елементів:</p>
<ul><li><code>flex-grow: 1</code> — забирати вільне місце (з коефіцієнтом)</li><li><code>flex-shrink: 0</code> — не стискатися</li><li><code>flex-basis: 200px</code> — початковий розмір</li><li>Скорочення: <code>flex: 1</code> = «рости, стискайся, базис 0»</li><li><code>align-self</code> — власне вирівнювання елемента</li><li><code>order: -1</code> — змінити порядок відображення</li></ul>
<p>Властивість контейнера <code>flex-wrap: wrap</code> дозволяє елементам <b>переноситися</b> на новий рядок, коли не вміщаються. Тоді <code>align-content</code> розподіляє самі рядки.</p>`,
        `<p>Свойства <b>дочерних</b> flex-элементов:</p>
<ul><li><code>flex-grow: 1</code> — забирать свободное место (с коэффициентом)</li><li><code>flex-shrink: 0</code> — не сжиматься</li><li><code>flex-basis: 200px</code> — начальный размер</li><li>Сокращение: <code>flex: 1</code> = «расти, сжимайся, базис 0»</li><li><code>align-self</code> — собственное выравнивание элемента</li><li><code>order: -1</code> — изменить порядок отображения</li></ul>
<p>Свойство контейнера <code>flex-wrap: wrap</code> позволяет элементам <b>переноситься</b> на новую строку, когда не помещаются. Тогда <code>align-content</code> распределяет сами строки.</p>`,
        `<p>Properties of <b>child</b> flex items:</p>
<ul><li><code>flex-grow: 1</code> — take up free space (by a factor)</li><li><code>flex-shrink: 0</code> — don’t shrink</li><li><code>flex-basis: 200px</code> — the starting size</li><li>Shorthand: <code>flex: 1</code> = “grow, shrink, basis 0”</li><li><code>align-self</code> — the item’s own alignment</li><li><code>order: -1</code> — change the visual order</li></ul>
<p>The container property <code>flex-wrap: wrap</code> lets items <b>wrap</b> to a new line when they don’t fit. Then <code>align-content</code> distributes the lines.</p>`),
      why: L(`<p>Шапка сайту: логотип і кнопка мають свій розмір, а поле пошуку має розтягнутися на все, що залишилось. Це один рядок <code>flex: 1</code>. А <code>flex-wrap</code> робить список тегів чи карток «гумовим» без жодних медіазапитів.</p>`,
        `<p>Шапка сайта: логотип и кнопка имеют свой размер, а поле поиска должно растянуться на всё оставшееся. Это одна строка <code>flex: 1</code>. А <code>flex-wrap</code> делает список тегов или карточек «резиновым» без единого медиазапроса.</p>`,
        `<p>A site header: the logo and button keep their size, while the search field stretches over the rest. That’s one line of <code>flex: 1</code>. And <code>flex-wrap</code> makes a list of tags or cards fluid without a single media query.</p>`),
      mistakes: L(`<ul><li>Без <code>flex-wrap</code> елементи стискаються в один рядок і можуть вилізти за контейнер.</li><li><code>order</code> змінює лише вигляд — для клавіатури й екранних читачів порядок у HTML лишається.</li></ul>`,
        `<ul><li>Без <code>flex-wrap</code> элементы сжимаются в одну строку и могут вылезти за контейнер.</li><li><code>order</code> меняет только вид — для клавиатуры и экранных чтецов порядок в HTML остаётся.</li></ul>`,
        `<ul><li>Without <code>flex-wrap</code>, items squeeze into one line and may overflow.</li><li><code>order</code> only changes visuals — keyboard and screen readers still follow the HTML order.</li></ul>`),
      examples: [
        { title: 'flex: 1', code: '.row { display: flex; gap: 10px; }\n.grow { flex: 1; }', note: L('«Search» забрав усе вільне місце.', '«Search» забрал всё свободное место.', '“Search” took all the free space.') },
        { title: 'flex-wrap', code: '.tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}', note: L('Теги переносяться на нові рядки.', 'Теги переносятся на новые строки.', 'Tags wrap onto new lines.') },
        { title: L('Пропорції', 'Пропорции', 'Ratios'), code: '.row { display: flex; gap: 10px; }\n.box { flex: 1; }\n.grow { flex: 3; }', note: L('Середній утричі ширший за інших.', 'Средний втрое шире остальных.', 'The middle one is three times wider.') },
        { title: 'order / align-self', code: '.row { display: flex; gap: 10px; height: 120px; align-items: flex-start; }\n.box:last-child { order: -1; align-self: flex-end; }', note: L('Остання кнопка стала першою й опустилася вниз.', 'Последняя кнопка стала первой и опустилась вниз.', 'The last box became first and dropped down.') }
      ],
      task: {
        text: L('Зроби <code>.row</code> flex-контейнером з <code>gap: 10px</code>, а <code>.grow</code> — щоб займав усе вільне місце (<code>flex: 1</code>). Зроби <code>.tags</code> flex-контейнером з переносом (<code>flex-wrap: wrap</code>) і <code>gap: 6px</code>.', 'Сделай <code>.row</code> flex-контейнером с <code>gap: 10px</code>, а <code>.grow</code> — чтобы занимал всё свободное место (<code>flex: 1</code>). Сделай <code>.tags</code> flex-контейнером с переносом (<code>flex-wrap: wrap</code>) и <code>gap: 6px</code>.', 'Make <code>.row</code> a flex container with <code>gap: 10px</code>, and <code>.grow</code> fill all free space (<code>flex: 1</code>). Make <code>.tags</code> a wrapping flex container (<code>flex-wrap: wrap</code>) with <code>gap: 6px</code>.'),
        how: [L('Три правила: <code>.row</code>, <code>.grow</code>, <code>.tags</code>.', 'Три правила: <code>.row</code>, <code>.grow</code>, <code>.tags</code>.', 'Three rules: <code>.row</code>, <code>.grow</code>, <code>.tags</code>.')],
        starter: '',
        solution: '.row {\n  display: flex;\n  gap: 10px;\n}\n.grow {\n  flex: 1;\n}\n.tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}',
        hint: L('Перевіряється, що «Search» ширший за 600px, а теги стоять у кількох рядках.', 'Проверяется, что «Search» шире 600px, а теги стоят в нескольких строках.', 'The check expects “Search” wider than 600px and the tags on several lines.'),
        check: function (doc, win) { var r = win.getComputedStyle(doc.querySelector('.row')); var t = win.getComputedStyle(doc.querySelector('.tags')); var spans = doc.querySelectorAll('.tags span'); return r.display === 'flex' && r.columnGap === '10px' && doc.querySelector('.grow').offsetWidth > 600 && t.display === 'flex' && t.flexWrap === 'wrap' && spans[spans.length - 1].offsetTop > spans[0].offsetTop; }
      },
      quiz: { q: L('Що робить <code>flex-wrap: wrap</code>?', 'Что делает <code>flex-wrap: wrap</code>?', 'What does <code>flex-wrap: wrap</code> do?'), options: [L('обгортає рамкою', 'оборачивает рамкой', 'adds a border'), L('дозволяє перенос на новий рядок', 'разрешает перенос на новую строку', 'allows wrapping to a new line'), L('стискає елементи', 'сжимает элементы', 'shrinks items')], answer: 1, explain: L('Елементи переходять на новий рядок.', 'Элементы переходят на новую строку.', 'Items move onto a new line.') },
      ref: [{ code: 'flex: 1', d: L('забрати вільне місце', 'забрать свободное место', 'take free space') }, { code: 'flex-wrap: wrap', d: L('перенос рядків', 'перенос строк', 'wrapping') }, { code: 'order align-self', d: L('порядок, власне вирівнювання', 'порядок, своё выравнивание', 'order, own alignment') }]
    },
    {
      id: 'grid', chapter: CH4,
      title: L('CSS Grid: сітка', 'CSS Grid: сетка', 'CSS Grid'),
      html: '<div class="grid">\n  <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>\n  <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>\n</div>\n<style>.cell{background:#22d3ee;color:#083344;padding:20px;font:800 20px sans-serif;text-align:center;border-radius:10px}</style>',
      theory: L(
        `<p><b>Grid</b> — розкладка у <b>двох вимірах</b>: рядки й колонки одночасно.</p>
<pre class="inline-code">.grid {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  gap: 16px;
}</pre>
<ul><li><code>grid-template-columns</code> / <code>grid-template-rows</code> — розміри колонок/рядків</li><li><code>fr</code> — «частка вільного місця»: <code>1fr 2fr</code> → друга колонка вдвічі ширша</li><li><code>repeat(3, 1fr)</code> — три однакові колонки</li><li><code>gap</code> — проміжки між клітинками</li></ul>
<p>Елемент може займати кілька клітинок: <code>grid-column: span 2</code> або <code>grid-column: 1 / 3</code> (від лінії 1 до лінії 3), так само <code>grid-row</code>.</p>`,
        `<p><b>Grid</b> — раскладка в <b>двух измерениях</b>: строки и колонки одновременно.</p>
<pre class="inline-code">.grid {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  gap: 16px;
}</pre>
<ul><li><code>grid-template-columns</code> / <code>grid-template-rows</code> — размеры колонок/строк</li><li><code>fr</code> — «доля свободного места»: <code>1fr 2fr</code> → вторая колонка вдвое шире</li><li><code>repeat(3, 1fr)</code> — три одинаковые колонки</li><li><code>gap</code> — промежутки между ячейками</li></ul>
<p>Элемент может занимать несколько ячеек: <code>grid-column: span 2</code> или <code>grid-column: 1 / 3</code> (от линии 1 до линии 3), так же <code>grid-row</code>.</p>`,
        `<p><b>Grid</b> is a <b>two-dimensional</b> layout: rows and columns at once.</p>
<pre class="inline-code">.grid {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  gap: 16px;
}</pre>
<ul><li><code>grid-template-columns</code> / <code>grid-template-rows</code> — column/row sizes</li><li><code>fr</code> — “a fraction of free space”: <code>1fr 2fr</code> → the second column is twice as wide</li><li><code>repeat(3, 1fr)</code> — three equal columns</li><li><code>gap</code> — space between cells</li></ul>
<p>An item can span several cells: <code>grid-column: span 2</code> or <code>grid-column: 1 / 3</code> (from line 1 to line 3); likewise <code>grid-row</code>.</p>`),
      why: L(`<p>Flexbox керує одним рядком, а Grid — усією сіткою. Галерея фото, таблиця товарів, макет сторінки «шапка — бокова панель — вміст — підвал» — це задачі для Grid. Разом Flexbox і Grid закривають 99% розкладок.</p>`,
        `<p>Flexbox управляет одной строкой, а Grid — всей сеткой. Галерея фото, таблица товаров, макет страницы «шапка — боковая панель — содержимое — подвал» — это задачи для Grid. Вместе Flexbox и Grid закрывают 99% раскладок.</p>`,
        `<p>Flexbox manages a single line, Grid the whole grid. Photo galleries, product grids and “header — sidebar — content — footer” page layouts are Grid jobs. Together Flexbox and Grid cover 99% of layouts.</p>`),
      mistakes: L(`<ul><li>Плутати <code>fr</code> з <code>%</code>: <code>fr</code> ділить місце <b>після</b> віднімання gap і фіксованих колонок.</li><li>Задавати сітку дочірнім елементам, а не контейнеру.</li></ul>`,
        `<ul><li>Путать <code>fr</code> с <code>%</code>: <code>fr</code> делит место <b>после</b> вычитания gap и фиксированных колонок.</li><li>Задавать сетку дочерним элементам, а не контейнеру.</li></ul>`,
        `<ul><li>Confusing <code>fr</code> with <code>%</code>: <code>fr</code> splits space <b>after</b> subtracting gaps and fixed columns.</li><li>Setting the grid on the children instead of the container.</li></ul>`),
      examples: [
        { title: L('3 колонки', '3 колонки', '3 columns'), code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}', note: L('Шість клітинок — два рядки по три.', 'Шесть ячеек — две строки по три.', 'Six cells — two rows of three.') },
        { title: 'fr', code: '.grid {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 12px;\n}', note: L('Середня колонка вдвічі ширша.', 'Средняя колонка вдвое шире.', 'The middle column is twice as wide.') },
        { title: 'span', code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.cell:first-child { grid-column: span 2; background: #f472b6; }\n.cell:nth-child(4) { grid-row: span 2; background: #facc15; }', note: L('Клітинки на кілька колонок і рядків.', 'Ячейки на несколько колонок и строк.', 'Cells spanning columns and rows.') },
        { title: L('Фіксована + гумова', 'Фиксированная + резиновая', 'Fixed + fluid'), code: '.grid {\n  display: grid;\n  grid-template-columns: 150px 1fr;\n  grid-template-rows: 60px 120px;\n  gap: 10px;\n}', note: L('Колонка 150px і решта місця.', 'Колонка 150px и остальное место.', 'A 150px column and the rest.') }
      ],
      task: {
        text: L('Зроби <code>.grid</code> сіткою з <b>трьома однаковими колонками</b> (<code>repeat(3, 1fr)</code>) і проміжком <code>10px</code>. Перша клітинка має займати <b>дві колонки</b>.', 'Сделай <code>.grid</code> сеткой с <b>тремя одинаковыми колонками</b> (<code>repeat(3, 1fr)</code>) и промежутком <code>10px</code>. Первая ячейка должна занимать <b>две колонки</b>.', 'Make <code>.grid</code> a grid with <b>three equal columns</b> (<code>repeat(3, 1fr)</code>) and a <code>10px</code> gap. The first cell should span <b>two columns</b>.'),
        how: [L('<code>.cell:first-child { grid-column: span 2; }</code>', '<code>.cell:first-child { grid-column: span 2; }</code>', '<code>.cell:first-child { grid-column: span 2; }</code>')],
        starter: '.grid {\n  \n}\n',
        solution: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n.cell:first-child {\n  grid-column: span 2;\n}',
        hint: L('Ширина першої клітинки = дві колонки + один gap.', 'Ширина первой ячейки = две колонки + один gap.', 'The first cell’s width = two columns + one gap.'),
        check: function (doc, win) { var g = doc.querySelector('.grid'); var s = win.getComputedStyle(g); var cells = doc.querySelectorAll('.cell'); var cols = s.gridTemplateColumns.split(' ').filter(Boolean); return s.display === 'grid' && cols.length === 3 && Math.abs(parseFloat(cols[0]) - parseFloat(cols[2])) < 1 && s.columnGap === '10px' && Math.abs(cells[0].offsetWidth - (cells[1].offsetWidth * 2 + 10)) <= 2; }
      },
      quiz: { q: L('Що означає <code>1fr</code>?', 'Что означает <code>1fr</code>?', 'What does <code>1fr</code> mean?'), options: [L('1 піксель', '1 пиксель', '1 pixel'), L('частка вільного місця', 'доля свободного места', 'a fraction of free space'), L('1% ширини', '1% ширины', '1% of the width')], answer: 1, explain: L('fr — fraction.', 'fr — fraction.', 'fr — fraction.') },
      ref: [{ code: 'display: grid', d: L('сітка', 'сетка', 'grid') }, { code: 'grid-template-columns: repeat(3, 1fr)', d: L('колонки', 'колонки', 'columns') }, { code: 'grid-column: span 2', d: L('на дві колонки', 'на две колонки', 'span two columns') }]
    },
    {
      id: 'grid-2', chapter: CH4,
      title: L('Grid: області та автоматичні колонки', 'Grid: области и автоматические колонки', 'Grid: areas and auto columns'),
      html: '<div class="page">\n  <header>Header</header>\n  <aside>Sidebar</aside>\n  <main>Content</main>\n  <footer>Footer</footer>\n</div>\n<div class="gallery">\n  <div></div><div></div><div></div><div></div><div></div><div></div><div></div>\n</div>\n<style>.page>*{background:#ddd6fe;padding:16px;font:700 16px sans-serif;border-radius:8px}.gallery div{background:#fbcfe8;height:80px;border-radius:8px}.gallery{margin-top:20px}</style>',
      theory: L(
        `<p><b>Іменовані області</b> дозволяють «намалювати» макет прямо в CSS:</p>
<pre class="inline-code">.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "aside  main"
    "footer footer";
}
header { grid-area: header; }
aside  { grid-area: aside; }</pre>
<p><b>Автоматичні колонки</b> — магія адаптивних галерей без медіазапитів:</p>
<pre class="inline-code">grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));</pre>
<p>«Вмісти стільки колонок, скільки влізе, кожна щонайменше 150px, а залишок розподіли порівну». На телефоні — 1–2 колонки, на моніторі — 6.</p>
<p>Вирівнювання в Grid: <code>justify-items</code>, <code>align-items</code>, <code>place-items: center</code> (обидва одразу).</p>`,
        `<p><b>Именованные области</b> позволяют «нарисовать» макет прямо в CSS:</p>
<pre class="inline-code">.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "aside  main"
    "footer footer";
}
header { grid-area: header; }
aside  { grid-area: aside; }</pre>
<p><b>Автоматические колонки</b> — магия адаптивных галерей без медиазапросов:</p>
<pre class="inline-code">grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));</pre>
<p>«Помести столько колонок, сколько влезет, каждая минимум 150px, а остаток раздели поровну». На телефоне — 1–2 колонки, на мониторе — 6.</p>
<p>Выравнивание в Grid: <code>justify-items</code>, <code>align-items</code>, <code>place-items: center</code> (оба сразу).</p>`,
        `<p><b>Named areas</b> let you “draw” the layout right in CSS:</p>
<pre class="inline-code">.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "aside  main"
    "footer footer";
}
header { grid-area: header; }
aside  { grid-area: aside; }</pre>
<p><b>Auto columns</b> — the magic of responsive galleries without media queries:</p>
<pre class="inline-code">grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));</pre>
<p>“Fit as many columns as possible, each at least 150px, and share the rest equally.” 1–2 columns on a phone, 6 on a monitor.</p>
<p>Grid alignment: <code>justify-items</code>, <code>align-items</code>, <code>place-items: center</code> (both at once).</p>`),
      why: L(`<p><code>grid-template-areas</code> — найнаочніший спосіб описати макет: ти буквально бачиш його в коді. А <code>auto-fit + minmax</code> позбавляє від купи медіазапитів — галерея сама підлаштовується під будь-який екран.</p>`,
        `<p><code>grid-template-areas</code> — самый наглядный способ описать макет: ты буквально видишь его в коде. А <code>auto-fit + minmax</code> избавляет от кучи медиазапросов — галерея сама подстраивается под любой экран.</p>`,
        `<p><code>grid-template-areas</code> is the most visual way to describe a layout: you literally see it in the code. And <code>auto-fit + minmax</code> saves a pile of media queries — the gallery adapts to any screen by itself.</p>`),
      mistakes: L(`<ul><li>Області мають утворювати прямокутники — L-подібна область не спрацює.</li><li>Кожен рядок <code>grid-template-areas</code> має мати однакову кількість назв.</li></ul>`,
        `<ul><li>Области должны образовывать прямоугольники — L-образная область не сработает.</li><li>Каждая строка <code>grid-template-areas</code> должна иметь одинаковое количество названий.</li></ul>`,
        `<ul><li>Areas must form rectangles — an L-shaped area won’t work.</li><li>Every row of <code>grid-template-areas</code> needs the same number of names.</li></ul>`),
      examples: [
        { title: L('Макет', 'Макет', 'Layout'), code: '.page {\n  display: grid;\n  grid-template-columns: 160px 1fr;\n  grid-template-areas:\n    "header header"\n    "aside main"\n    "footer footer";\n  gap: 10px;\n}\nheader { grid-area: header; }\naside { grid-area: aside; }\nmain { grid-area: main; min-height: 120px; }\nfooter { grid-area: footer; }', note: L('Макет «намальований» словами.', 'Макет «нарисован» словами.', 'The layout is “drawn” with words.') },
        { title: 'auto-fit', code: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 10px;\n}', note: L('Зміни ширину вікна — кількість колонок зміниться.', 'Измени ширину окна — количество колонок изменится.', 'Resize the window — the column count changes.') },
        { title: 'place-items', code: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  place-items: center;\n  gap: 10px;\n}\n.gallery div { width: 50px; }', note: L('Вміст кожної клітинки — по центру.', 'Содержимое каждой ячейки — по центру.', 'Each cell’s content is centred.') }
      ],
      task: {
        text: L('Створи макет <code>.page</code> через <code>grid-template-areas</code>: шапка зверху на всю ширину, нижче бокова панель (<code>200px</code>) і вміст, підвал знизу на всю ширину. Галерею <code>.gallery</code> зроби з <code>repeat(auto-fit, minmax(150px, 1fr))</code>.', 'Создай макет <code>.page</code> через <code>grid-template-areas</code>: шапка сверху на всю ширину, ниже боковая панель (<code>200px</code>) и содержимое, подвал снизу на всю ширину. Галерею <code>.gallery</code> сделай с <code>repeat(auto-fit, minmax(150px, 1fr))</code>.', 'Build the <code>.page</code> layout with <code>grid-template-areas</code>: a full-width header on top, a sidebar (<code>200px</code>) and content below, and a full-width footer. Make <code>.gallery</code> use <code>repeat(auto-fit, minmax(150px, 1fr))</code>.'),
        how: [L('Кожному з header/aside/main/footer дай <code>grid-area</code>.', 'Каждому из header/aside/main/footer дай <code>grid-area</code>.', 'Give each of header/aside/main/footer a <code>grid-area</code>.')],
        starter: '',
        solution: '.page {\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  grid-template-areas:\n    "header header"\n    "aside main"\n    "footer footer";\n  gap: 10px;\n}\nheader { grid-area: header; }\naside { grid-area: aside; }\nmain { grid-area: main; }\nfooter { grid-area: footer; }\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 10px;\n}',
        hint: L('Перевірка: aside і main в одному рядку, aside шириною 200px, header на всю ширину.', 'Проверка: aside и main в одной строке, aside шириной 200px, header на всю ширину.', 'Check: aside and main on one row, aside 200px wide, header full width.'),
        check: function (doc, win) { var q = function (s) { return doc.querySelector(s); }; var page = q('.page'); var gs = win.getComputedStyle(q('.gallery')); return win.getComputedStyle(page).display === 'grid' && q('aside').offsetWidth === 200 && q('aside').offsetTop === q('main').offsetTop && q('header').offsetWidth === page.clientWidth && q('footer').offsetWidth === page.clientWidth && q('footer').offsetTop > q('main').offsetTop && gs.display === 'grid' && gs.gridTemplateColumns.split(' ').length >= 4; }
      },
      quiz: { q: L('Що робить <code>repeat(auto-fit, minmax(200px, 1fr))</code>?', 'Что делает <code>repeat(auto-fit, minmax(200px, 1fr))</code>?', 'What does <code>repeat(auto-fit, minmax(200px, 1fr))</code> do?'), options: [L('рівно 200 колонок', 'ровно 200 колонок', 'exactly 200 columns'), L('стільки колонок ≥200px, скільки вміститься', 'столько колонок ≥200px, сколько поместится', 'as many ≥200px columns as fit'), L('одну колонку 200px', 'одну колонку 200px', 'one 200px column')], answer: 1, explain: L('Кількість колонок підлаштовується під ширину.', 'Количество колонок подстраивается под ширину.', 'The column count adapts to the width.') },
      ref: [{ code: 'grid-template-areas + grid-area', d: L('іменовані області', 'именованные области', 'named areas') }, { code: 'repeat(auto-fit, minmax(150px, 1fr))', d: L('адаптивна сітка', 'адаптивная сетка', 'responsive grid') }]
    },
    {
      id: 'position', chapter: CH5,
      title: L('position і z-index', 'position и z-index', 'position and z-index'),
      html: '<div class="card">\n  <span class="badge">NEW</span>\n  <h3>Product</h3>\n  <p>Some description of a cool product.</p>\n</div>\n<div class="toast">Saved!</div>\n<style>.card{background:#f1f5f9;padding:20px;width:260px;border-radius:12px}.badge{background:#ef4444;color:#fff;padding:4px 8px;border-radius:6px;font:700 12px sans-serif}.toast{background:#111;color:#fff;padding:10px 16px;border-radius:10px}</style>',
      theory: L(
        `<p><code>position</code> керує тим, як елемент розташовується:</p>
<table class="mini"><tr><td><code>static</code></td><td>звичайний потік (за замовчуванням)</td></tr><tr><td><code>relative</code></td><td>зсув відносно свого місця; місце в потоці зберігається. Головне — стає «якорем» для absolute-дітей</td></tr><tr><td><code>absolute</code></td><td>вийнятий з потоку; позиціонується відносно найближчого предка з position ≠ static</td></tr><tr><td><code>fixed</code></td><td>відносно вікна, не прокручується (шапки, кнопки «вгору»)</td></tr><tr><td><code>sticky</code></td><td>звичайний, доки не «прилипне» при прокрутці</td></tr></table>
<p>Координати: <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>. <code>inset: 0</code> — усі чотири одразу.</p>
<p><code>z-index</code> визначає, хто зверху, коли елементи перекриваються (працює для позиціонованих).</p>`,
        `<p><code>position</code> управляет тем, как располагается элемент:</p>
<table class="mini"><tr><td><code>static</code></td><td>обычный поток (по умолчанию)</td></tr><tr><td><code>relative</code></td><td>сдвиг относительно своего места; место в потоке сохраняется. Главное — становится «якорем» для absolute-детей</td></tr><tr><td><code>absolute</code></td><td>вынут из потока; позиционируется относительно ближайшего предка с position ≠ static</td></tr><tr><td><code>fixed</code></td><td>относительно окна, не прокручивается (шапки, кнопки «наверх»)</td></tr><tr><td><code>sticky</code></td><td>обычный, пока не «прилипнет» при прокрутке</td></tr></table>
<p>Координаты: <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>. <code>inset: 0</code> — все четыре сразу.</p>
<p><code>z-index</code> определяет, кто сверху, когда элементы перекрываются (работает для позиционированных).</p>`,
        `<p><code>position</code> controls how an element is placed:</p>
<table class="mini"><tr><td><code>static</code></td><td>normal flow (default)</td></tr><tr><td><code>relative</code></td><td>offset from its own spot; keeps its space. Mainly becomes the “anchor” for absolute children</td></tr><tr><td><code>absolute</code></td><td>removed from flow; positioned relative to the nearest ancestor with position ≠ static</td></tr><tr><td><code>fixed</code></td><td>relative to the window, doesn’t scroll (headers, “back to top” buttons)</td></tr><tr><td><code>sticky</code></td><td>normal until it “sticks” while scrolling</td></tr></table>
<p>Coordinates: <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>. <code>inset: 0</code> sets all four.</p>
<p><code>z-index</code> decides who’s on top when elements overlap (works on positioned elements).</p>`),
      why: L(`<p>Значок «NEW» у куті картки, хрестик закриття вікна, сповіщення в куті екрана, липка шапка — усе це position. Пара <code>relative</code> (батько) + <code>absolute</code> (дитина) — один із найчастіших прийомів верстки.</p>`,
        `<p>Значок «NEW» в углу карточки, крестик закрытия окна, уведомление в углу экрана, липкая шапка — всё это position. Пара <code>relative</code> (родитель) + <code>absolute</code> (ребёнок) — один из самых частых приёмов вёрстки.</p>`,
        `<p>A “NEW” badge in a card corner, a dialog’s close button, a corner notification, a sticky header — all position. The <code>relative</code> parent + <code>absolute</code> child pair is one of the most common layout tricks.</p>`),
      mistakes: L(`<ul><li>Забути <code>position: relative</code> у батька — absolute-елемент «втече» до краю сторінки.</li><li><code>z-index</code> без position (крім flex/grid-дітей) не працює.</li></ul>`,
        `<ul><li>Забыть <code>position: relative</code> у родителя — absolute-элемент «убежит» к краю страницы.</li><li><code>z-index</code> без position (кроме flex/grid-детей) не работает.</li></ul>`,
        `<ul><li>Forgetting <code>position: relative</code> on the parent — the absolute child flies to the page edge.</li><li><code>z-index</code> without position (except on flex/grid children) does nothing.</li></ul>`),
      examples: [
        { title: L('Значок у куті', 'Значок в углу', 'Corner badge'), code: '.card { position: relative; }\n.badge {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n}', note: L('Батько relative — дитина absolute.', 'Родитель relative — ребёнок absolute.', 'Parent relative, child absolute.') },
        { title: 'fixed', code: '.toast {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n}', note: L('Сповіщення в куті вікна.', 'Уведомление в углу окна.', 'A notification in the window corner.') },
        { title: 'relative', code: '.badge { position: relative; top: 5px; left: 20px; }', note: L('Зсув від свого місця, сусіди не рухаються.', 'Сдвиг от своего места, соседи не двигаются.', 'Offset from its spot; neighbours stay.') },
        { title: 'z-index', code: '.card { position: relative; z-index: 1; }\n.toast { position: absolute; top: 40px; left: 60px; z-index: 2; opacity: .9; }', note: L('Більший z-index — вище.', 'Больший z-index — выше.', 'Higher z-index is on top.') }
      ],
      task: {
        text: L('Помісти <code>.badge</code> у правий верхній кут картки: <code>.card</code> — <code>position: relative</code>, <code>.badge</code> — <code>position: absolute</code>, <code>top: 10px</code>, <code>right: 10px</code>. Зроби <code>.toast</code> фіксованим у правому нижньому куті вікна (<code>bottom: 20px</code>, <code>right: 20px</code>).', 'Помести <code>.badge</code> в правый верхний угол карточки: <code>.card</code> — <code>position: relative</code>, <code>.badge</code> — <code>position: absolute</code>, <code>top: 10px</code>, <code>right: 10px</code>. Сделай <code>.toast</code> фиксированным в правом нижнем углу окна (<code>bottom: 20px</code>, <code>right: 20px</code>).', 'Put <code>.badge</code> in the card’s top-right corner: <code>.card</code> <code>position: relative</code>, <code>.badge</code> <code>position: absolute</code>, <code>top: 10px</code>, <code>right: 10px</code>. Make <code>.toast</code> fixed in the window’s bottom-right corner (<code>bottom: 20px</code>, <code>right: 20px</code>).'),
        how: [L('Три правила з <code>position</code>.', 'Три правила с <code>position</code>.', 'Three rules with <code>position</code>.')],
        starter: '',
        solution: '.card {\n  position: relative;\n}\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n.toast {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n}',
        hint: L('Значок має опинитися всередині картки, біля її правого краю.', 'Значок должен оказаться внутри карточки, у её правого края.', 'The badge should sit inside the card near its right edge.'),
        check: function (doc, win) { var c = doc.querySelector('.card').getBoundingClientRect(); var b = doc.querySelector('.badge').getBoundingClientRect(); var t = win.getComputedStyle(doc.querySelector('.toast')); return Math.abs(b.top - c.top - 10) < 2 && Math.abs(c.right - b.right - 10) < 2 && t.position === 'fixed' && t.bottom === '20px' && t.right === '20px'; }
      },
      quiz: { q: L('Відносно чого позиціонується <code>absolute</code>?', 'Относительно чего позиционируется <code>absolute</code>?', 'What is <code>absolute</code> positioned relative to?'), options: [L('вікна', 'окна', 'the window'), L('найближчого позиціонованого предка', 'ближайшего позиционированного предка', 'the nearest positioned ancestor'), L('свого місця', 'своего места', 'its own spot')], answer: 1, explain: L('Тому батькові ставлять relative.', 'Поэтому родителю ставят relative.', 'That’s why the parent gets relative.') },
      ref: [{ code: 'relative + absolute', d: L('позиція всередині батька', 'позиция внутри родителя', 'position inside a parent') }, { code: 'fixed / sticky', d: L('прив’язка до вікна / прилипання', 'привязка к окну / прилипание', 'pinned to window / sticky') }, { code: 'z-index', d: L('порядок шарів', 'порядок слоёв', 'layer order') }]
    },
    {
      id: 'transitions', chapter: CH5,
      title: L('Transition і transform', 'Transition и transform', 'Transition and transform'),
      html: '<button class="btn">Hover me</button>\n<div class="card">Card</div>\n<style>.card{background:#e0e7ff;padding:30px;width:180px;margin-top:20px;border-radius:14px;font:700 18px sans-serif}.btn{font:700 18px sans-serif}</style>',
      theory: L(
        `<p><code>transform</code> змінює елемент візуально, не зачіпаючи сусідів:</p>
<ul><li><code>translate(20px, 10px)</code> / <code>translateY(-5px)</code> — зсув</li><li><code>scale(1.1)</code> — масштаб</li><li><code>rotate(15deg)</code> — поворот</li><li><code>skew(10deg)</code> — нахил</li><li>Кілька — через пробіл: <code>translateY(-4px) scale(1.05)</code></li></ul>
<p><code>transition</code> робить зміни <b>плавними</b>:</p>
<pre class="inline-code">.btn { transition: transform 0.3s ease, background 0.3s; }
.btn:hover { transform: scale(1.1); background: green; }</pre>
<p>Формат: <code>властивість тривалість функція затримка</code>. Функції: <code>ease</code>, <code>linear</code>, <code>ease-in-out</code>, <code>cubic-bezier(...)</code>.</p>`,
        `<p><code>transform</code> меняет элемент визуально, не затрагивая соседей:</p>
<ul><li><code>translate(20px, 10px)</code> / <code>translateY(-5px)</code> — сдвиг</li><li><code>scale(1.1)</code> — масштаб</li><li><code>rotate(15deg)</code> — поворот</li><li><code>skew(10deg)</code> — наклон</li><li>Несколько — через пробел: <code>translateY(-4px) scale(1.05)</code></li></ul>
<p><code>transition</code> делает изменения <b>плавными</b>:</p>
<pre class="inline-code">.btn { transition: transform 0.3s ease, background 0.3s; }
.btn:hover { transform: scale(1.1); background: green; }</pre>
<p>Формат: <code>свойство длительность функция задержка</code>. Функции: <code>ease</code>, <code>linear</code>, <code>ease-in-out</code>, <code>cubic-bezier(...)</code>.</p>`,
        `<p><code>transform</code> changes an element visually without affecting neighbours:</p>
<ul><li><code>translate(20px, 10px)</code> / <code>translateY(-5px)</code> — move</li><li><code>scale(1.1)</code> — scale</li><li><code>rotate(15deg)</code> — rotate</li><li><code>skew(10deg)</code> — skew</li><li>Several — space-separated: <code>translateY(-4px) scale(1.05)</code></li></ul>
<p><code>transition</code> makes changes <b>smooth</b>:</p>
<pre class="inline-code">.btn { transition: transform 0.3s ease, background 0.3s; }
.btn:hover { transform: scale(1.1); background: green; }</pre>
<p>Format: <code>property duration timing-function delay</code>. Functions: <code>ease</code>, <code>linear</code>, <code>ease-in-out</code>, <code>cubic-bezier(...)</code>.</p>`),
      why: L(`<p>Мікроанімації роблять інтерфейс «живим» і зрозумілим: кнопка трохи піднімається при наведенні — отже, її можна натиснути. <code>transform</code> і <code>opacity</code> анімуються найплавніше, бо браузер обробляє їх на відеокарті, не перераховуючи розкладку сторінки.</p>`,
        `<p>Микроанимации делают интерфейс «живым» и понятным: кнопка слегка приподнимается при наведении — значит, её можно нажать. <code>transform</code> и <code>opacity</code> анимируются плавнее всего, потому что браузер обрабатывает их на видеокарте, не пересчитывая раскладку страницы.</p>`,
        `<p>Micro-animations make interfaces feel alive and clear: a button lifting slightly on hover says “I’m clickable”. <code>transform</code> and <code>opacity</code> animate most smoothly because the browser handles them on the GPU without recalculating layout.</p>`),
      mistakes: L(`<ul><li><code>transition</code> у <code>:hover</code> замість основного правила — анімація буде лише «туди», а назад — ривком.</li><li>Анімувати <code>width</code>, <code>top</code>, <code>margin</code> — працює, але гальмує. Краще <code>transform</code>.</li></ul>`,
        `<ul><li><code>transition</code> в <code>:hover</code> вместо основного правила — анимация будет только «туда», а обратно — рывком.</li><li>Анимировать <code>width</code>, <code>top</code>, <code>margin</code> — работает, но тормозит. Лучше <code>transform</code>.</li></ul>`,
        `<ul><li>Putting <code>transition</code> in <code>:hover</code> instead of the base rule — it animates in but snaps back.</li><li>Animating <code>width</code>, <code>top</code>, <code>margin</code> works but is janky. Prefer <code>transform</code>.</li></ul>`),
      examples: [
        { title: 'hover', code: '.btn {\n  background: #3b82f6;\n  color: white;\n  border: 0;\n  padding: 14px 28px;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all .25s ease;\n}\n.btn:hover {\n  background: #1d4ed8;\n  transform: translateY(-4px) scale(1.05);\n  box-shadow: 0 10px 20px rgba(29, 78, 216, .4);\n}', note: L('Наведи курсор на кнопку.', 'Наведи курсор на кнопку.', 'Hover the button.') },
        { title: 'rotate', code: '.card { transition: transform .5s; }\n.card:hover { transform: rotate(-6deg) scale(1.1); }', note: L('Картка нахиляється при наведенні.', 'Карточка наклоняется при наведении.', 'The card tilts on hover.') },
        { title: L('Функції часу', 'Функции времени', 'Timing'), code: '.card { transition: transform 1s cubic-bezier(.2, 1.6, .4, 1); }\n.card:hover { transform: translateX(120px); }', note: L('«Пружинний» ефект завдяки cubic-bezier.', '«Пружинный» эффект благодаря cubic-bezier.', 'A springy effect via cubic-bezier.') },
        { title: L('Натискання', 'Нажатие', 'Press'), code: '.btn { transition: transform .1s; }\n.btn:active { transform: scale(.92); }', note: L('Кнопка «вдавлюється» при кліку.', 'Кнопка «вдавливается» при клике.', 'The button squishes on click.') }
      ],
      task: {
        text: L('Додай <code>.btn</code> плавний перехід (<code>transition</code> тривалістю <code>0.3s</code>), а при наведенні (<code>.btn:hover</code>) — фон <code>green</code> і <code>transform: scale(1.1)</code>.', 'Добавь <code>.btn</code> плавный переход (<code>transition</code> длительностью <code>0.3s</code>), а при наведении (<code>.btn:hover</code>) — фон <code>green</code> и <code>transform: scale(1.1)</code>.', 'Give <code>.btn</code> a smooth <code>0.3s</code> <code>transition</code>, and on hover (<code>.btn:hover</code>) a <code>green</code> background and <code>transform: scale(1.1)</code>.'),
        how: [L('<code>transition</code> — у звичайному правилі <code>.btn</code>.', '<code>transition</code> — в обычном правиле <code>.btn</code>.', '<code>transition</code> goes in the base <code>.btn</code> rule.')],
        starter: '.btn {\n  padding: 12px 24px;\n}\n',
        solution: '.btn {\n  padding: 12px 24px;\n  transition: all 0.3s ease;\n}\n.btn:hover {\n  background: green;\n  transform: scale(1.1);\n}',
        hint: L('Перевіряється тривалість переходу і наявність правила <code>.btn:hover</code>.', 'Проверяется длительность перехода и наличие правила <code>.btn:hover</code>.', 'The transition duration and a <code>.btn:hover</code> rule are checked.'),
        check: function (doc, win) {
          var s = win.getComputedStyle(doc.querySelector('.btn'));
          if (s.transitionDuration.split(',')[0].trim() !== '0.3s') return false;
          var ok = false;
          for (var i = 0; i < doc.styleSheets.length; i++) { var rules; try { rules = doc.styleSheets[i].cssRules; } catch (e) { continue; } for (var j = 0; j < rules.length; j++) { var r = rules[j]; if (r.selectorText && /\.btn:hover/.test(r.selectorText) && /green|rgb\(0, 128, 0\)/.test(r.style.background + r.style.backgroundColor) && /scale\(1\.1\)/.test(r.style.transform)) ok = true; } }
          return ok;
        }
      },
      quiz: { q: L('Де краще писати <code>transition</code>?', 'Где лучше писать <code>transition</code>?', 'Where should <code>transition</code> go?'), options: [L('у :hover', 'в :hover', 'in :hover'), L('в основному правилі', 'в основном правиле', 'in the base rule'), L('в обох', 'в обоих', 'in both')], answer: 1, explain: L('Тоді анімація працює в обидва боки.', 'Тогда анимация работает в обе стороны.', 'Then it animates both ways.') },
      ref: [{ code: 'transform: translate scale rotate', d: L('перетворення', 'преобразования', 'transforms') }, { code: 'transition: all .3s ease', d: L('плавний перехід', 'плавный переход', 'smooth transition') }]
    },
    {
      id: 'keyframes', chapter: CH5,
      title: L('Анімації @keyframes', 'Анимации @keyframes', '@keyframes animations'),
      html: '<div class="ball"></div>\n<div class="spinner"></div>\n<p class="pulse">● Live</p>',
      theory: L(
        `<p>Для анімацій без наведення — що грають самі, повторюються, мають кілька етапів — використовують <code>@keyframes</code>:</p>
<pre class="inline-code">@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-40px); }
  100% { transform: translateY(0); }
}
.ball { animation: bounce 1s ease-in-out infinite; }</pre>
<p>Властивість <code>animation</code> — скорочення для:</p>
<ul><li><code>animation-name</code> — назва keyframes</li><li><code>animation-duration</code> — тривалість</li><li><code>animation-timing-function</code> — функція часу</li><li><code>animation-delay</code> — затримка</li><li><code>animation-iteration-count</code> — кількість повторів або <code>infinite</code></li><li><code>animation-direction: alternate</code> — туди-назад</li><li><code>animation-fill-mode: forwards</code> — залишитися в кінцевому стані</li></ul>`,
        `<p>Для анимаций без наведения — которые играют сами, повторяются, имеют несколько этапов — используют <code>@keyframes</code>:</p>
<pre class="inline-code">@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-40px); }
  100% { transform: translateY(0); }
}
.ball { animation: bounce 1s ease-in-out infinite; }</pre>
<p>Свойство <code>animation</code> — сокращение для:</p>
<ul><li><code>animation-name</code> — название keyframes</li><li><code>animation-duration</code> — длительность</li><li><code>animation-timing-function</code> — функция времени</li><li><code>animation-delay</code> — задержка</li><li><code>animation-iteration-count</code> — количество повторов или <code>infinite</code></li><li><code>animation-direction: alternate</code> — туда-обратно</li><li><code>animation-fill-mode: forwards</code> — остаться в конечном состоянии</li></ul>`,
        `<p>For animations that play on their own, repeat or have several stages, use <code>@keyframes</code>:</p>
<pre class="inline-code">@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-40px); }
  100% { transform: translateY(0); }
}
.ball { animation: bounce 1s ease-in-out infinite; }</pre>
<p><code>animation</code> is a shorthand for:</p>
<ul><li><code>animation-name</code> — the keyframes name</li><li><code>animation-duration</code></li><li><code>animation-timing-function</code></li><li><code>animation-delay</code></li><li><code>animation-iteration-count</code> — a number or <code>infinite</code></li><li><code>animation-direction: alternate</code> — back and forth</li><li><code>animation-fill-mode: forwards</code> — keep the final state</li></ul>`),
      why: L(`<p>Спінери завантаження, пульсуючі індикатори «онлайн», маскот Кодрик, що підстрибує, — усе це <code>@keyframes</code>. Без JavaScript, плавно й економно. А <code>prefers-reduced-motion</code> дозволяє вимкнути анімації для людей, яким вони заважають.</p>`,
        `<p>Спиннеры загрузки, пульсирующие индикаторы «онлайн», подпрыгивающий маскот Кодрик — всё это <code>@keyframes</code>. Без JavaScript, плавно и экономно. А <code>prefers-reduced-motion</code> позволяет отключить анимации для людей, которым они мешают.</p>`,
        `<p>Loading spinners, pulsing “online” dots, the bouncing Codry mascot — all <code>@keyframes</code>. No JavaScript, smooth and cheap. And <code>prefers-reduced-motion</code> lets you turn animations off for people who find them distracting.</p>`),
      mistakes: L(`<ul><li>Назва в <code>animation</code> не збігається з <code>@keyframes</code> — нічого не відбувається.</li><li>Забути тривалість: <code>animation: spin infinite</code> — тривалість 0, анімації не видно.</li></ul>`,
        `<ul><li>Название в <code>animation</code> не совпадает с <code>@keyframes</code> — ничего не происходит.</li><li>Забыть длительность: <code>animation: spin infinite</code> — длительность 0, анимации не видно.</li></ul>`,
        `<ul><li>The name in <code>animation</code> doesn’t match the <code>@keyframes</code> — nothing happens.</li><li>Forgetting the duration: <code>animation: spin infinite</code> — duration 0, nothing visible.</li></ul>`),
      examples: [
        { title: L('М’ячик', 'Мячик', 'Ball'), code: '.ball {\n  width: 50px;\n  height: 50px;\n  margin-top: 50px;\n  border-radius: 50%;\n  background: #f97316;\n  animation: jump .6s ease-in-out infinite alternate;\n}\n@keyframes jump {\n  from { transform: translateY(0); }\n  to { transform: translateY(-50px) scale(1.1); }\n}', note: L('alternate — туди-назад.', 'alternate — туда-обратно.', 'alternate — back and forth.') },
        { title: L('Спінер', 'Спиннер', 'Spinner'), code: '.spinner {\n  width: 40px;\n  height: 40px;\n  border: 5px solid #e2e8f0;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin .8s linear infinite;\n}\n@keyframes spin { to { transform: rotate(360deg); } }', note: L('Класичний індикатор завантаження.', 'Классический индикатор загрузки.', 'The classic loading indicator.') },
        { title: L('Пульс', 'Пульс', 'Pulse'), code: '.pulse { color: #ef4444; font: 700 18px sans-serif; animation: pulse 1.2s ease-in-out infinite; }\n@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: .3; }\n}', note: L('Кілька відсотків в одному блоці.', 'Несколько процентов в одном блоке.', 'Several percentages in one block.') },
        { title: L('Поява', 'Появление', 'Fade-in'), code: '.pulse { animation: fadeUp 1s ease-out .5s both; }\n@keyframes fadeUp {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: none; }\n}', note: L('Затримка 0.5s і збереження станів (both).', 'Задержка 0.5s и сохранение состояний (both).', 'A 0.5s delay with states kept (both).') }
      ],
      task: {
        text: L('Створи анімацію <code>@keyframes spin</code>, що обертає елемент до <code>rotate(360deg)</code>, і застосуй її до <code>.spinner</code>: тривалість <code>1s</code>, <code>linear</code>, <code>infinite</code>. Дай спінеру розмір <code>40px × 40px</code> і рамку.', 'Создай анимацию <code>@keyframes spin</code>, вращающую элемент до <code>rotate(360deg)</code>, и примени её к <code>.spinner</code>: длительность <code>1s</code>, <code>linear</code>, <code>infinite</code>. Дай спиннеру размер <code>40px × 40px</code> и рамку.', 'Create <code>@keyframes spin</code> rotating an element to <code>rotate(360deg)</code> and apply it to <code>.spinner</code>: duration <code>1s</code>, <code>linear</code>, <code>infinite</code>. Give the spinner a <code>40px × 40px</code> size and a border.'),
        how: [L('<code>@keyframes spin { to { transform: rotate(360deg); } }</code>', '<code>@keyframes spin { to { transform: rotate(360deg); } }</code>', '<code>@keyframes spin { to { transform: rotate(360deg); } }</code>'), L('<code>animation: spin 1s linear infinite;</code>', '<code>animation: spin 1s linear infinite;</code>', '<code>animation: spin 1s linear infinite;</code>')],
        starter: '',
        solution: '.spinner {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #ddd;\n  border-top-color: #3b82f6;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}',
        hint: L('Назва в <code>animation</code> має точно збігатися з назвою в <code>@keyframes</code>.', 'Название в <code>animation</code> должно точно совпадать с названием в <code>@keyframes</code>.', 'The name in <code>animation</code> must exactly match the <code>@keyframes</code> name.'),
        check: function (doc, win) {
          var s = win.getComputedStyle(doc.querySelector('.spinner'));
          var hasKf = false;
          for (var i = 0; i < doc.styleSheets.length; i++) { var rules; try { rules = doc.styleSheets[i].cssRules; } catch (e) { continue; } for (var j = 0; j < rules.length; j++) if (rules[j].type === 7 && rules[j].name === 'spin' && /360deg/.test(rules[j].cssText)) hasKf = true; }
          return hasKf && s.animationName === 'spin' && s.animationDuration === '1s' && s.animationIterationCount === 'infinite' && s.animationTimingFunction === 'linear' && s.width === '40px' && s.borderTopStyle !== 'none';
        }
      },
      quiz: { q: L('Що зробить <code>animation-iteration-count: infinite</code>?', 'Что сделает <code>animation-iteration-count: infinite</code>?', 'What does <code>animation-iteration-count: infinite</code> do?'), options: [L('зупинить анімацію', 'остановит анимацию', 'stop the animation'), L('повторюватиме безкінечно', 'будет повторять бесконечно', 'repeat forever'), L('прискорить', 'ускорит', 'speed it up')], answer: 1, explain: L('Анімація грає по колу.', 'Анимация играет по кругу.', 'It loops forever.') },
      ref: [{ code: '@keyframes name { from {} to {} }', d: L('кадри анімації', 'кадры анимации', 'animation frames') }, { code: 'animation: name 1s ease infinite', d: L('запустити анімацію', 'запустить анимацию', 'run an animation') }]
    },
    {
      id: 'media', chapter: CH6,
      title: L('Адаптивність: медіазапити', 'Адаптивность: медиазапросы', 'Responsive design: media queries'),
      html: '<div class="cards">\n  <div class="card">1</div><div class="card">2</div><div class="card">3</div>\n</div>\n<h1 class="title">Responsive title</h1>\n<style>.card{background:#a7f3d0;padding:30px;text-align:center;font:800 22px sans-serif;border-radius:12px}</style>',
      theory: L(
        `<p>Понад половина відвідувачів сайтів — з телефонів. <b>Медіазапити</b> дозволяють застосовувати стилі залежно від ширини екрана:</p>
<pre class="inline-code">.cards { display: grid; grid-template-columns: repeat(3, 1fr); }

@media (max-width: 600px) {
  .cards { grid-template-columns: 1fr; }
}</pre>
<p>«Якщо ширина вікна ≤ 600px — використовуй ці правила».</p>
<ul><li><code>max-width</code> — для екранів <b>до</b> певної ширини (підхід desktop-first)</li><li><code>min-width</code> — <b>від</b> певної ширини (mobile-first: спершу стилі для телефона, потім розширюємо)</li><li>Також: <code>(orientation: landscape)</code>, <code>(prefers-color-scheme: dark)</code>, <code>(prefers-reduced-motion: reduce)</code>, <code>(hover: hover)</code></li></ul>
<p>Обов’язково мати в HTML <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>.</p>`,
        `<p>Больше половины посетителей сайтов — с телефонов. <b>Медиазапросы</b> позволяют применять стили в зависимости от ширины экрана:</p>
<pre class="inline-code">.cards { display: grid; grid-template-columns: repeat(3, 1fr); }

@media (max-width: 600px) {
  .cards { grid-template-columns: 1fr; }
}</pre>
<p>«Если ширина окна ≤ 600px — используй эти правила».</p>
<ul><li><code>max-width</code> — для экранов <b>до</b> определённой ширины (подход desktop-first)</li><li><code>min-width</code> — <b>от</b> определённой ширины (mobile-first: сначала стили для телефона, потом расширяем)</li><li>Также: <code>(orientation: landscape)</code>, <code>(prefers-color-scheme: dark)</code>, <code>(prefers-reduced-motion: reduce)</code>, <code>(hover: hover)</code></li></ul>
<p>Обязательно иметь в HTML <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>.</p>`,
        `<p>Over half of website visitors are on phones. <b>Media queries</b> apply styles depending on screen width:</p>
<pre class="inline-code">.cards { display: grid; grid-template-columns: repeat(3, 1fr); }

@media (max-width: 600px) {
  .cards { grid-template-columns: 1fr; }
}</pre>
<p>“If the window is ≤ 600px wide, use these rules.”</p>
<ul><li><code>max-width</code> — for screens <b>up to</b> a width (desktop-first)</li><li><code>min-width</code> — <b>from</b> a width (mobile-first: phone styles first, then expand)</li><li>Also: <code>(orientation: landscape)</code>, <code>(prefers-color-scheme: dark)</code>, <code>(prefers-reduced-motion: reduce)</code>, <code>(hover: hover)</code></li></ul>
<p>Your HTML must include <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>.</p>`),
      why: L(`<p>Три колонки на телефоні шириною 375px — це текст по 3 слова в рядку. Медіазапити перебудовують макет під екран: на телефоні колонки стають одна під одною, меню ховається в «бургер», шрифти зменшуються. Google також ранжує вище сайти, зручні на мобільних.</p>`,
        `<p>Три колонки на телефоне шириной 375px — это текст по 3 слова в строке. Медиазапросы перестраивают макет под экран: на телефоне колонки встают друг под другом, меню прячется в «бургер», шрифты уменьшаются. Google также ранжирует выше сайты, удобные на мобильных.</p>`,
        `<p>Three columns on a 375px phone means three words per line. Media queries rebuild the layout for the screen: columns stack on phones, the menu hides in a “burger”, fonts shrink. Google also ranks mobile-friendly sites higher.</p>`),
      mistakes: L(`<ul><li>Медіазапит вище за основне правило — основне перезапише його (каскад!). Пиши медіазапити <b>нижче</b>.</li><li>Забути <code>meta viewport</code> — телефон показуватиме «десктопну» версію дрібно.</li></ul>`,
        `<ul><li>Медиазапрос выше основного правила — основное перезапишет его (каскад!). Пиши медиазапросы <b>ниже</b>.</li><li>Забыть <code>meta viewport</code> — телефон будет показывать «десктопную» версию мелко.</li></ul>`,
        `<ul><li>A media query placed above the base rule gets overridden (the cascade!). Write media queries <b>below</b>.</li><li>Forgetting <code>meta viewport</code> — phones show the desktop version tiny.</li></ul>`),
      examples: [
        { title: 'max-width', code: '.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }\n@media (max-width: 600px) {\n  .cards { grid-template-columns: 1fr; }\n}', note: L('Зменш вікно (або відкрий на телефоні) — колонки стануть одна під одною.', 'Уменьши окно (или открой на телефоне) — колонки встанут друг под другом.', 'Shrink the window (or use a phone) — the columns stack.') },
        { title: 'mobile-first', code: '.cards { display: grid; gap: 10px; }\n@media (min-width: 500px) { .cards { grid-template-columns: 1fr 1fr; } }\n@media (min-width: 900px) { .cards { grid-template-columns: repeat(3, 1fr); } }', note: L('1 → 2 → 3 колонки з ростом екрана.', '1 → 2 → 3 колонки с ростом экрана.', '1 → 2 → 3 columns as the screen grows.') },
        { title: L('Темна тема', 'Тёмная тема', 'Dark scheme'), code: 'body { background: white; color: #111; }\n@media (prefers-color-scheme: dark) {\n  body { background: #0b1020; color: #e8edfb; }\n}', note: L('Підлаштовується під тему системи.', 'Подстраивается под тему системы.', 'Follows the system theme.') },
        { title: L('Менше руху', 'Меньше движения', 'Reduced motion'), code: '.card { transition: transform .4s; }\n.card:hover { transform: scale(1.1) rotate(3deg); }\n@media (prefers-reduced-motion: reduce) {\n  .card { transition: none; }\n}', note: L('Повага до налаштувань доступності.', 'Уважение к настройкам доступности.', 'Respecting accessibility settings.') }
      ],
      task: {
        text: L('Зроби <code>.cards</code> сіткою на <code>3</code> однакові колонки з <code>gap: 10px</code>. Додай медіазапит <code>@media (max-width: 600px)</code>, у якому <code>.cards</code> має <b>одну</b> колонку, а <code>.title</code> — розмір шрифту <code>24px</code>.', 'Сделай <code>.cards</code> сеткой на <code>3</code> одинаковые колонки с <code>gap: 10px</code>. Добавь медиазапрос <code>@media (max-width: 600px)</code>, в котором <code>.cards</code> имеет <b>одну</b> колонку, а <code>.title</code> — размер шрифта <code>24px</code>.', 'Make <code>.cards</code> a 3-equal-column grid with <code>gap: 10px</code>. Add <code>@media (max-width: 600px)</code> where <code>.cards</code> has <b>one</b> column and <code>.title</code> has a <code>24px</code> font size.'),
        how: [L('Основне правило — вище, медіазапит — нижче.', 'Основное правило — выше, медиазапрос — ниже.', 'Base rule above, media query below.'), L('У медіазапиті: <code>grid-template-columns: 1fr</code>.', 'В медиазапросе: <code>grid-template-columns: 1fr</code>.', 'In the media query: <code>grid-template-columns: 1fr</code>.')],
        starter: '',
        solution: '.cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n@media (max-width: 600px) {\n  .cards {\n    grid-template-columns: 1fr;\n  }\n  .title {\n    font-size: 24px;\n  }\n}',
        hint: L('Перевірка дивиться і на звичайний вигляд, і на правила всередині медіазапиту.', 'Проверка смотрит и на обычный вид, и на правила внутри медиазапроса.', 'The check looks at both the normal view and the rules inside the media query.'),
        check: function (doc, win) {
          var s = win.getComputedStyle(doc.querySelector('.cards'));
          if (s.display !== 'grid' || s.gridTemplateColumns.split(' ').length !== 3 || s.columnGap !== '10px') return false;
          var cardsOne = false, title = false;
          for (var i = 0; i < doc.styleSheets.length; i++) {
            var rules; try { rules = doc.styleSheets[i].cssRules; } catch (e) { continue; }
            for (var j = 0; j < rules.length; j++) {
              var m = rules[j];
              if (m.type === 4 && /max-width:\s*600px/.test(m.conditionText || m.media.mediaText)) {
                for (var k = 0; k < m.cssRules.length; k++) {
                  var r = m.cssRules[k];
                  if (/\.cards/.test(r.selectorText) && /^1fr$|^minmax\(0px, 1fr\)$/.test(r.style.gridTemplateColumns.trim())) cardsOne = true;
                  if (/\.title/.test(r.selectorText) && r.style.fontSize === '24px') title = true;
                }
              }
            }
          }
          return cardsOne && title;
        }
      },
      quiz: { q: L('Коли спрацює <code>@media (min-width: 800px)</code>?', 'Когда сработает <code>@media (min-width: 800px)</code>?', 'When does <code>@media (min-width: 800px)</code> apply?'), options: [L('на екранах до 800px', 'на экранах до 800px', 'on screens up to 800px'), L('на екранах від 800px', 'на экранах от 800px', 'on screens 800px and wider'), L('завжди', 'всегда', 'always')], answer: 1, explain: L('min-width — «щонайменше».', 'min-width — «как минимум».', 'min-width means “at least”.') },
      ref: [{ code: '@media (max-width: 600px) { }', d: L('стилі для вузьких екранів', 'стили для узких экранов', 'styles for narrow screens') }, { code: 'prefers-color-scheme', d: L('тема системи', 'тема системы', 'system theme') }]
    },
    {
      id: 'variables', chapter: CH6,
      title: L('CSS-змінні та темна тема', 'CSS-переменные и тёмная тема', 'CSS variables and dark mode'),
      html: '<div class="app">\n  <h2>Settings</h2>\n  <p>Theme colours come from variables.</p>\n  <button class="btn">Save</button>\n</div>',
      theory: L(
        `<p><b>CSS-змінні</b> (custom properties) зберігають значення, щоб використовувати їх багато разів:</p>
<pre class="inline-code">:root {
  --primary: #3b82f6;
  --radius: 12px;
}
.btn {
  background: var(--primary);
  border-radius: var(--radius);
}</pre>
<ul><li>Ім’я починається з двох дефісів: <code>--primary</code></li><li>Читається через <code>var(--primary)</code>, можна з запасним значенням: <code>var(--x, red)</code></li><li><code>:root</code> — корінь документа, змінні там доступні всюди</li><li>Змінні <b>успадковуються</b> і їх можна перевизначати для частини сторінки</li></ul>
<p>Темна тема одним класом: перевизнач змінні в <code>.dark { --bg: #0b1020; --text: #e8edfb; }</code> — і вся сторінка зміниться. Саме так зроблено темну тему Codry!</p>`,
        `<p><b>CSS-переменные</b> (custom properties) хранят значения, чтобы использовать их много раз:</p>
<pre class="inline-code">:root {
  --primary: #3b82f6;
  --radius: 12px;
}
.btn {
  background: var(--primary);
  border-radius: var(--radius);
}</pre>
<ul><li>Имя начинается с двух дефисов: <code>--primary</code></li><li>Читается через <code>var(--primary)</code>, можно с запасным значением: <code>var(--x, red)</code></li><li><code>:root</code> — корень документа, переменные там доступны везде</li><li>Переменные <b>наследуются</b> и их можно переопределять для части страницы</li></ul>
<p>Тёмная тема одним классом: переопредели переменные в <code>.dark { --bg: #0b1020; --text: #e8edfb; }</code> — и вся страница изменится. Именно так сделана тёмная тема Codry!</p>`,
        `<p><b>CSS variables</b> (custom properties) store values to reuse:</p>
<pre class="inline-code">:root {
  --primary: #3b82f6;
  --radius: 12px;
}
.btn {
  background: var(--primary);
  border-radius: var(--radius);
}</pre>
<ul><li>Names start with two dashes: <code>--primary</code></li><li>Read with <code>var(--primary)</code>, optionally with a fallback: <code>var(--x, red)</code></li><li><code>:root</code> is the document root; variables there are available everywhere</li><li>Variables are <b>inherited</b> and can be overridden for part of the page</li></ul>
<p>Dark mode with one class: override the variables in <code>.dark { --bg: #0b1020; --text: #e8edfb; }</code> and the whole page changes. That’s exactly how Codry’s dark theme works!</p>`),
      why: L(`<p>У дизайн-системі один «фірмовий синій» використовується в сотні місць. Без змінних його зміна — це пошук і заміна по всьому коду. Зі змінними — один рядок. Плюс теми, кольори брендів і налаштування користувача стають тривіальними.</p>`,
        `<p>В дизайн-системе один «фирменный синий» используется в сотне мест. Без переменных его смена — это поиск и замена по всему коду. С переменными — одна строка. Плюс темы, цвета брендов и настройки пользователя становятся тривиальными.</p>`,
        `<p>In a design system one “brand blue” appears in a hundred places. Without variables, changing it means find-and-replace across the code. With variables it’s one line. Themes, brand colours and user settings become trivial.</p>`),
      mistakes: L(`<ul><li><code>var(primary)</code> без дефісів — не спрацює.</li><li>Пробіл між <code>--</code> і назвою.</li><li>Змінні не працюють у назвах селекторів і медіазапитів — лише у значеннях властивостей.</li></ul>`,
        `<ul><li><code>var(primary)</code> без дефисов — не сработает.</li><li>Пробел между <code>--</code> и названием.</li><li>Переменные не работают в названиях селекторов и медиазапросов — только в значениях свойств.</li></ul>`,
        `<ul><li><code>var(primary)</code> without the dashes won’t work.</li><li>A space between <code>--</code> and the name.</li><li>Variables don’t work in selectors or media queries — only in property values.</li></ul>`),
      examples: [
        { title: L('Змінні', 'Переменные', 'Variables'), code: ':root {\n  --primary: #8b5cf6;\n  --radius: 14px;\n}\n.btn {\n  background: var(--primary);\n  color: white;\n  border: 0;\n  padding: 12px 22px;\n  border-radius: var(--radius);\n}\nh2 { color: var(--primary); }', note: L('Зміни <code>--primary</code> — зміняться і кнопка, і заголовок.', 'Измени <code>--primary</code> — изменятся и кнопка, и заголовок.', 'Change <code>--primary</code> — both the button and heading change.') },
        { title: L('Темна тема', 'Тёмная тема', 'Dark theme'), code: ':root { --bg: #ffffff; --text: #0f172a; --card: #f1f5f9; }\n.app { background: var(--card); color: var(--text); padding: 20px; border-radius: 12px; }\nbody { background: var(--bg); }\n.app:hover { --card: #1e293b; --text: #e2e8f0; }', note: L('Наведи на картку — змінні перевизначаються.', 'Наведи на карточку — переменные переопределяются.', 'Hover the card — the variables are overridden.') },
        { title: L('Запасне значення', 'Запасное значение', 'Fallback'), code: '.btn { background: var(--accent, tomato); color: white; padding: 10px; }', note: L('Змінної <code>--accent</code> немає — береться tomato.', 'Переменной <code>--accent</code> нет — берётся tomato.', 'There’s no <code>--accent</code>, so tomato is used.') },
        { title: 'calc + var', code: ':root { --space: 8px; }\n.app { padding: calc(var(--space) * 3); }\n.btn { margin-top: calc(var(--space) * 2); padding: var(--space) calc(var(--space) * 2); }', note: L('Система відступів на одній змінній.', 'Система отступов на одной переменной.', 'A spacing system on one variable.') }
      ],
      task: {
        text: L('Оголоси в <code>:root</code> змінні <code>--primary: #22c55e</code> і <code>--radius: 10px</code>. Використай їх: фон <code>.btn</code> = <code>var(--primary)</code>, заокруглення <code>.btn</code> і <code>.app</code> = <code>var(--radius)</code>, колір <code>h2</code> = <code>var(--primary)</code>.', 'Объяви в <code>:root</code> переменные <code>--primary: #22c55e</code> и <code>--radius: 10px</code>. Используй их: фон <code>.btn</code> = <code>var(--primary)</code>, скругление <code>.btn</code> и <code>.app</code> = <code>var(--radius)</code>, цвет <code>h2</code> = <code>var(--primary)</code>.', 'Declare <code>--primary: #22c55e</code> and <code>--radius: 10px</code> in <code>:root</code>. Use them: <code>.btn</code> background = <code>var(--primary)</code>, <code>.btn</code> and <code>.app</code> radius = <code>var(--radius)</code>, <code>h2</code> colour = <code>var(--primary)</code>.'),
        how: [L('<code>:root { --primary: #22c55e; --radius: 10px; }</code>', '<code>:root { --primary: #22c55e; --radius: 10px; }</code>', '<code>:root { --primary: #22c55e; --radius: 10px; }</code>')],
        starter: '',
        solution: ':root {\n  --primary: #22c55e;\n  --radius: 10px;\n}\n.btn {\n  background: var(--primary);\n  border-radius: var(--radius);\n}\n.app {\n  border-radius: var(--radius);\n}\nh2 {\n  color: var(--primary);\n}',
        hint: L('Перевіряються значення змінних і те, що в CSS використано <code>var(...)</code>.', 'Проверяются значения переменных и то, что в CSS использовано <code>var(...)</code>.', 'The variable values and use of <code>var(...)</code> are checked.'),
        check: function (doc, win) { var root = win.getComputedStyle(doc.documentElement); var css = Array.prototype.map.call(doc.querySelectorAll('style'), function (s) { return s.textContent; }).join(''); var g = function (s) { return win.getComputedStyle(doc.querySelector(s)); }; return root.getPropertyValue('--primary').trim().toLowerCase() === '#22c55e' && root.getPropertyValue('--radius').trim() === '10px' && (css.match(/var\(--primary\)/g) || []).length >= 2 && (css.match(/var\(--radius\)/g) || []).length >= 2 && g('.btn').backgroundColor === 'rgb(34, 197, 94)' && g('.app').borderTopLeftRadius === '10px' && g('h2').color === 'rgb(34, 197, 94)'; }
      },
      quiz: { q: L('Як прочитати змінну <code>--gap</code>?', 'Как прочитать переменную <code>--gap</code>?', 'How do you read the variable <code>--gap</code>?'), options: ['$gap', 'var(--gap)', '--gap()'], answer: 1, explain: L('Через функцію var().', 'Через функцию var().', 'With the var() function.') },
      ref: [{ code: ':root { --x: 10px; }', d: L('оголосити змінну', 'объявить переменную', 'declare a variable') }, { code: 'var(--x, fallback)', d: L('використати змінну', 'использовать переменную', 'use a variable') }]
    },
    {
      id: 'project-card', chapter: CH7, project: true,
      title: L('Проєкт: картка товару', 'Проект: карточка товара', 'Project: Product card'),
      html: '<article class="product">\n  <img src="https://picsum.photos/id/96/400/260" alt="Wireless headphones">\n  <span class="badge">-20%</span>\n  <div class="body">\n    <h3 class="name">Wireless headphones</h3>\n    <p class="desc">Noise cancelling, 30 hours of battery, fast charging.</p>\n    <div class="footer">\n      <span class="price">2 399 ₴</span>\n      <button class="buy">Add to cart</button>\n    </div>\n  </div>\n</article>',
      theory: L(
        `<p>Зверстай картку товару, як в інтернет-магазині. HTML готовий — потрібен лише CSS.</p>
<h4>Вимоги</h4>
<ol><li><code>.product</code>: ширина <code>300px</code>, білий фон, заокруглення ≥ <code>12px</code>, тінь, <code>overflow: hidden</code>, <code>position: relative</code></li><li>Картинка на всю ширину картки (<code>width: 100%</code>, <code>display: block</code>)</li><li><code>.badge</code>: <code>position: absolute</code> у лівому верхньому куті (<code>top</code> і <code>left</code> по <code>12px</code>)</li><li><code>.body</code>: внутрішні відступи</li><li><code>.footer</code>: <code>display: flex</code>, ціна зліва, кнопка справа (<code>justify-content: space-between</code>), по центру вертикально</li><li><code>.buy:hover</code>: будь-яка зміна з плавним переходом</li><li><code>.product:hover</code>: картка трохи піднімається (<code>transform</code>)</li></ol>`,
        `<p>Сверстай карточку товара, как в интернет-магазине. HTML готов — нужен только CSS.</p>
<h4>Требования</h4>
<ol><li><code>.product</code>: ширина <code>300px</code>, белый фон, скругление ≥ <code>12px</code>, тень, <code>overflow: hidden</code>, <code>position: relative</code></li><li>Картинка на всю ширину карточки (<code>width: 100%</code>, <code>display: block</code>)</li><li><code>.badge</code>: <code>position: absolute</code> в левом верхнем углу (<code>top</code> и <code>left</code> по <code>12px</code>)</li><li><code>.body</code>: внутренние отступы</li><li><code>.footer</code>: <code>display: flex</code>, цена слева, кнопка справа (<code>justify-content: space-between</code>), по центру вертикально</li><li><code>.buy:hover</code>: любое изменение с плавным переходом</li><li><code>.product:hover</code>: карточка слегка поднимается (<code>transform</code>)</li></ol>`,
        `<p>Style a product card like in an online shop. The HTML is ready — you only need CSS.</p>
<h4>Requirements</h4>
<ol><li><code>.product</code>: <code>300px</code> wide, white background, radius ≥ <code>12px</code>, a shadow, <code>overflow: hidden</code>, <code>position: relative</code></li><li>The image spans the card width (<code>width: 100%</code>, <code>display: block</code>)</li><li><code>.badge</code>: <code>position: absolute</code> in the top-left corner (<code>top</code> and <code>left</code> of <code>12px</code>)</li><li><code>.body</code>: inner padding</li><li><code>.footer</code>: <code>display: flex</code>, price left, button right (<code>justify-content: space-between</code>), vertically centred</li><li><code>.buy:hover</code>: any change with a smooth transition</li><li><code>.product:hover</code>: the card lifts slightly (<code>transform</code>)</li></ol>`),
      why: L(`<p>Картка — найпоширеніший компонент вебу: товари, статті, профілі, курси (як на головній Codry). У ній поєднується все: блокова модель, позиціонування, Flexbox, тіні й анімації. Зверставши її, ти зможеш зверстати більшість інтерфейсів.</p>`,
        `<p>Карточка — самый распространённый компонент веба: товары, статьи, профили, курсы (как на главной Codry). В ней соединяется всё: блочная модель, позиционирование, Flexbox, тени и анимации. Сверстав её, ты сможешь сверстать большинство интерфейсов.</p>`,
        `<p>The card is the web’s most common component: products, articles, profiles, courses (like on Codry’s home page). It combines everything: the box model, positioning, Flexbox, shadows and animation. Build it and you can build most interfaces.</p>`),
      mistakes: L(`<ul><li>Без <code>overflow: hidden</code> картинка «вилазить» за заокруглені кути.</li><li>Без <code>position: relative</code> на картці значок прилипне до кута сторінки.</li></ul>`,
        `<ul><li>Без <code>overflow: hidden</code> картинка «вылезает» за скруглённые углы.</li><li>Без <code>position: relative</code> на карточке значок прилипнет к углу страницы.</li></ul>`,
        `<ul><li>Without <code>overflow: hidden</code> the image pokes out of the rounded corners.</li><li>Without <code>position: relative</code> on the card the badge sticks to the page corner.</li></ul>`),
      examples: [
        { title: L('Основа картки', 'Основа карточки', 'Card base'), code: 'body { background: #f1f5f9; }\n.product {\n  width: 300px;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(0,0,0,.1);\n  overflow: hidden;\n}\n.product img { width: 100%; display: block; }', note: L('Картинка ідеально вписана в заокруглення.', 'Картинка идеально вписана в скругление.', 'The image fits the rounded corners perfectly.') },
        { title: L('Низ картки', 'Низ карточки', 'Card footer'), code: '.footer { display: flex; justify-content: space-between; align-items: center; }\n.price { font: 800 22px sans-serif; }\n.buy { background: #111; color: white; border: 0; padding: 10px 16px; border-radius: 10px; }', note: L('Ціна і кнопка по краях.', 'Цена и кнопка по краям.', 'Price and button at opposite ends.') },
        { title: L('Анімація', 'Анимация', 'Animation'), code: '.product { transition: transform .3s, box-shadow .3s; }\n.product:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,.15); }', note: L('Картка «піднімається».', 'Карточка «поднимается».', 'The card lifts.') }
      ],
      task: {
        text: L('Зверстай картку за вимогами з теорії.', 'Сверстай карточку по требованиям из теории.', 'Style the card per the requirements in the theory.'),
        how: [L('Почни з <code>.product</code> і картинки.', 'Начни с <code>.product</code> и картинки.', 'Start with <code>.product</code> and the image.'), L('Потім значок, низ картки та hover-ефекти.', 'Затем значок, низ карточки и hover-эффекты.', 'Then the badge, footer and hover effects.')],
        starter: '',
        solution: 'body { background: #f1f5f9; font-family: system-ui, sans-serif; }\n.product {\n  position: relative;\n  width: 300px;\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  transition: transform 0.3s;\n}\n.product:hover { transform: translateY(-6px); }\n.product img { width: 100%; display: block; }\n.badge {\n  position: absolute;\n  top: 12px;\n  left: 12px;\n  background: #ef4444;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-weight: 700;\n}\n.body { padding: 16px; }\n.footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.price { font-size: 22px; font-weight: 800; }\n.buy {\n  background: #111;\n  color: white;\n  border: 0;\n  padding: 10px 16px;\n  border-radius: 10px;\n  transition: background 0.2s;\n}\n.buy:hover { background: #3b82f6; }',
        hint: L('Значок має опинитися за 12px від лівого й верхнього краю картки.', 'Значок должен оказаться в 12px от левого и верхнего края карточки.', 'The badge should be 12px from the card’s left and top edges.'),
        check: function (doc, win) {
          var q = function (s) { return doc.querySelector(s); }; var cs = function (s) { return win.getComputedStyle(q(s)); };
          var p = cs('.product');
          if (q('.product').offsetWidth !== 300 || p.backgroundColor !== 'rgb(255, 255, 255)' || parseFloat(p.borderTopLeftRadius) < 12 || p.boxShadow === 'none' || p.overflow.indexOf('hidden') < 0 || p.position !== 'relative') return false;
          if (q('.product img').offsetWidth !== 300) return false;
          var c = q('.product').getBoundingClientRect(), b = q('.badge').getBoundingClientRect();
          if (cs('.badge').position !== 'absolute' || Math.abs(b.top - c.top - 12) > 2 || Math.abs(b.left - c.left - 12) > 2) return false;
          if (parseFloat(cs('.body').paddingTop) <= 0) return false;
          var f = cs('.footer'); if (f.display !== 'flex' || f.justifyContent !== 'space-between' || f.alignItems !== 'center') return false;
          if (cs('.buy').transitionDuration === '0s') return false;
          var hoverBuy = false, hoverCard = false;
          for (var i = 0; i < doc.styleSheets.length; i++) { var rules; try { rules = doc.styleSheets[i].cssRules; } catch (e) { continue; } for (var j = 0; j < rules.length; j++) { var r = rules[j]; if (!r.selectorText) continue; if (/\.buy:hover/.test(r.selectorText)) hoverBuy = true; if (/\.product:hover/.test(r.selectorText) && r.style.transform && r.style.transform !== 'none') hoverCard = true; } }
          return hoverBuy && hoverCard;
        }
      },
      quiz: { q: L('Навіщо картці <code>overflow: hidden</code>?', 'Зачем карточке <code>overflow: hidden</code>?', 'Why does the card need <code>overflow: hidden</code>?'), options: [L('щоб сховати текст', 'чтобы спрятать текст', 'to hide text'), L('щоб картинка не виходила за заокруглені кути', 'чтобы картинка не выходила за скруглённые углы', 'so the image doesn’t poke out of the rounded corners'), L('для прокрутки', 'для прокрутки', 'for scrolling')], answer: 1, explain: L('Вміст обрізається по формі картки.', 'Содержимое обрезается по форме карточки.', 'Content is clipped to the card shape.') },
      ref: [{ code: 'overflow: hidden + border-radius', d: L('обрізати по заокругленню', 'обрезать по скруглению', 'clip to rounding') }]
    },
    {
      id: 'project-landing', chapter: CH7, project: true,
      title: L('Проєкт: адаптивний лендинг', 'Проект: адаптивный лендинг', 'Project: Responsive landing page'),
      html: '<header class="nav">\n  <span class="logo">🚀 Rocket</span>\n  <nav class="links"><a href="#">Features</a><a href="#">Pricing</a><a href="#">Contact</a></nav>\n</header>\n<section class="hero">\n  <h1>Launch your idea today</h1>\n  <p>The simplest way to build and grow your project.</p>\n  <a class="cta" href="#">Get started</a>\n</section>\n<section class="features">\n  <div class="feature">⚡ Fast</div>\n  <div class="feature">🔒 Secure</div>\n  <div class="feature">💎 Beautiful</div>\n</section>',
      theory: L(
        `<p>Фінальний проєкт курсу — головна сторінка (лендинг) стартапу, що добре виглядає і на моніторі, і на телефоні.</p>
<h4>Вимоги</h4>
<ol><li>Змінні в <code>:root</code>: щонайменше <code>--primary</code> (використовується через <code>var()</code>)</li><li><code>.nav</code> — <code>display: flex</code>, логотип зліва, посилання справа (<code>space-between</code>), вирівнювання по центру</li><li><code>.links</code> — flex з <code>gap</code></li><li><code>.hero</code> — текст по центру, фон-градієнт</li><li><code>.cta</code> — кнопка-посилання (<code>inline-block</code>, padding, заокруглення, без підкреслення), з <code>:hover</code></li><li><code>.features</code> — <code>display: grid</code> з <b>трьома</b> колонками і <code>gap</code></li><li>Медіазапит <code>@media (max-width: 600px)</code>: <code>.features</code> — одна колонка, <code>.links</code> — сховати (<code>display: none</code>)</li></ol>`,
        `<p>Финальный проект курса — главная страница (лендинг) стартапа, которая хорошо выглядит и на мониторе, и на телефоне.</p>
<h4>Требования</h4>
<ol><li>Переменные в <code>:root</code>: минимум <code>--primary</code> (используется через <code>var()</code>)</li><li><code>.nav</code> — <code>display: flex</code>, логотип слева, ссылки справа (<code>space-between</code>), выравнивание по центру</li><li><code>.links</code> — flex с <code>gap</code></li><li><code>.hero</code> — текст по центру, фон-градиент</li><li><code>.cta</code> — кнопка-ссылка (<code>inline-block</code>, padding, скругление, без подчёркивания), с <code>:hover</code></li><li><code>.features</code> — <code>display: grid</code> с <b>тремя</b> колонками и <code>gap</code></li><li>Медиазапрос <code>@media (max-width: 600px)</code>: <code>.features</code> — одна колонка, <code>.links</code> — спрятать (<code>display: none</code>)</li></ol>`,
        `<p>The course’s final project is a startup landing page that looks good on both monitors and phones.</p>
<h4>Requirements</h4>
<ol><li>Variables in <code>:root</code>: at least <code>--primary</code> (used via <code>var()</code>)</li><li><code>.nav</code> — <code>display: flex</code>, logo left, links right (<code>space-between</code>), centred vertically</li><li><code>.links</code> — flex with a <code>gap</code></li><li><code>.hero</code> — centred text, a gradient background</li><li><code>.cta</code> — a link styled as a button (<code>inline-block</code>, padding, radius, no underline) with a <code>:hover</code></li><li><code>.features</code> — <code>display: grid</code> with <b>three</b> columns and a <code>gap</code></li><li><code>@media (max-width: 600px)</code>: <code>.features</code> one column, <code>.links</code> hidden (<code>display: none</code>)</li></ol>`),
      why: L(`<p>Лендинг — найчастіше замовлення для фронтенд-розробника-початківця. Цей проєкт збирає все, що ти вивчив: змінні, Flexbox для шапки, Grid для переваг, градієнти, hover-ефекти й адаптивність. Таку сторінку вже не соромно показати в портфоліо.</p>`,
        `<p>Лендинг — самый частый заказ для начинающего фронтенд-разработчика. Этот проект собирает всё, что ты изучил: переменные, Flexbox для шапки, Grid для преимуществ, градиенты, hover-эффекты и адаптивность. Такую страницу уже не стыдно показать в портфолио.</p>`,
        `<p>A landing page is the most common job for a junior frontend developer. This project uses everything you’ve learned: variables, Flexbox for the header, Grid for features, gradients, hover effects and responsiveness. It’s portfolio-worthy.</p>`),
      mistakes: L(`<ul><li>Медіазапит вище основних правил — він не спрацює.</li><li>Забути прибрати підкреслення в посилання-кнопки.</li></ul>`,
        `<ul><li>Медиазапрос выше основных правил — он не сработает.</li><li>Забыть убрать подчёркивание у ссылки-кнопки.</li></ul>`,
        `<ul><li>A media query above the base rules won’t take effect.</li><li>Forgetting to remove the underline from the link button.</li></ul>`),
      examples: [
        { title: L('Шапка', 'Шапка', 'Header'), code: '.nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; }\n.links { display: flex; gap: 20px; }\n.links a { color: inherit; text-decoration: none; }', note: L('Логотип і меню по краях.', 'Логотип и меню по краям.', 'Logo and menu at opposite ends.') },
        { title: 'Hero', code: ':root { --primary: #7c3aed; }\n.hero { text-align: center; padding: 60px 20px; color: white; background: linear-gradient(135deg, var(--primary), #db2777); }\n.cta { display: inline-block; background: white; color: var(--primary); padding: 14px 28px; border-radius: 999px; text-decoration: none; font-weight: 800; }', note: L('Градієнтний банер з кнопкою.', 'Градиентный баннер с кнопкой.', 'A gradient banner with a button.') },
        { title: L('Адаптивність', 'Адаптивность', 'Responsive'), code: '.features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 24px; }\n.feature { background: #f5f3ff; padding: 24px; border-radius: 14px; text-align: center; }\n@media (max-width: 600px) {\n  .features { grid-template-columns: 1fr; }\n  .links { display: none; }\n}', note: L('На телефоні — одна колонка без меню.', 'На телефоне — одна колонка без меню.', 'One column with no menu on phones.') }
      ],
      task: {
        text: L('Зверстай лендинг за вимогами з теорії.', 'Сверстай лендинг по требованиям из теории.', 'Build the landing page per the requirements in the theory.'),
        how: [L('Змінні → шапка → hero → переваги → медіазапит (останнім).', 'Переменные → шапка → hero → преимущества → медиазапрос (последним).', 'Variables → header → hero → features → media query (last).')],
        starter: ':root {\n  --primary: #7c3aed;\n}\n',
        solution: ':root {\n  --primary: #7c3aed;\n}\nbody { margin: 0; font-family: system-ui, sans-serif; }\n.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n}\n.links { display: flex; gap: 20px; }\n.links a { color: inherit; text-decoration: none; }\n.hero {\n  text-align: center;\n  padding: 60px 20px;\n  color: white;\n  background: linear-gradient(135deg, var(--primary), #db2777);\n}\n.cta {\n  display: inline-block;\n  background: white;\n  color: var(--primary);\n  padding: 14px 28px;\n  border-radius: 999px;\n  text-decoration: none;\n  font-weight: 800;\n  transition: transform 0.2s;\n}\n.cta:hover { transform: scale(1.05); }\n.features {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  padding: 24px;\n}\n.feature { background: #f5f3ff; padding: 24px; border-radius: 14px; text-align: center; }\n@media (max-width: 600px) {\n  .features { grid-template-columns: 1fr; }\n  .links { display: none; }\n}',
        hint: L('Перевіряються всі 7 пунктів, зокрема правила всередині медіазапиту.', 'Проверяются все 7 пунктов, в том числе правила внутри медиазапроса.', 'All 7 points are checked, including the rules inside the media query.'),
        check: function (doc, win) {
          var cs = function (s) { return win.getComputedStyle(doc.querySelector(s)); };
          var css = Array.prototype.map.call(doc.querySelectorAll('style'), function (s) { return s.textContent; }).join('');
          if (!win.getComputedStyle(doc.documentElement).getPropertyValue('--primary').trim() || !/var\(--primary\)/.test(css)) return false;
          var n = cs('.nav'); if (n.display !== 'flex' || n.justifyContent !== 'space-between' || n.alignItems !== 'center') return false;
          var l = cs('.links'); if (l.display !== 'flex' || l.columnGap === 'normal' || l.columnGap === '0px') return false;
          var h = cs('.hero'); if (h.textAlign !== 'center' || !/gradient/.test(h.backgroundImage)) return false;
          var c = cs('.cta'); if (c.display !== 'inline-block' || parseFloat(c.paddingTop) <= 0 || parseFloat(c.borderTopLeftRadius) <= 0 || c.textDecorationLine !== 'none') return false;
          var f = cs('.features'); if (f.display !== 'grid' || f.gridTemplateColumns.split(' ').length !== 3 || f.columnGap === 'normal' || f.columnGap === '0px') return false;
          var hov = false, mFeat = false, mLinks = false;
          for (var i = 0; i < doc.styleSheets.length; i++) { var rules; try { rules = doc.styleSheets[i].cssRules; } catch (e) { continue; } for (var j = 0; j < rules.length; j++) { var r = rules[j]; if (r.selectorText && /\.cta:hover/.test(r.selectorText)) hov = true; if (r.type === 4 && /max-width:\s*600px/.test(r.conditionText || r.media.mediaText)) { for (var k = 0; k < r.cssRules.length; k++) { var m = r.cssRules[k]; if (/\.features/.test(m.selectorText) && /^1fr$|^minmax\(0px, 1fr\)$/.test(m.style.gridTemplateColumns.trim())) mFeat = true; if (/\.links/.test(m.selectorText) && m.style.display === 'none') mLinks = true; } } } }
          return hov && mFeat && mLinks;
        }
      },
      quiz: { q: L('Де в CSS-файлі краще розміщувати медіазапити?', 'Где в CSS-файле лучше размещать медиазапросы?', 'Where should media queries go in a CSS file?'), options: [L('на початку', 'в начале', 'at the top'), L('після основних правил', 'после основных правил', 'after the base rules'), L('неважливо', 'неважно', 'it doesn’t matter')], answer: 1, explain: L('Інакше основні правила їх перекриють.', 'Иначе основные правила их перекроют.', 'Otherwise the base rules override them.') },
      ref: [{ code: 'flex + grid + @media', d: L('адаптивна сторінка', 'адаптивная страница', 'responsive page') }]
    }
  ]);
})();
