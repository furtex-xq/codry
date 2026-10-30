// HTML — частина 2: форми, медіа, доступність, JS на сторінці, проєкти.
(function () {
  const L = Codry.L;
  const CH4 = L('Форми та медіа', 'Формы и медиа', 'Forms and media');
  const CH5 = L('Якість сторінки', 'Качество страницы', 'Page quality');
  const CH6 = L('Оживляємо сторінку', 'Оживляем страницу', 'Bringing pages to life');
  const CH7 = L('Фінальні проєкти', 'Финальные проекты', 'Final projects');

  Codry.steps('html', [
    {
      id: 'form-controls', chapter: CH4,
      title: L('select, textarea і кнопки', 'select, textarea и кнопки', 'select, textarea and buttons'),
      theory: L(
        `<p>Ще кілька елементів форм:</p>
<ul><li><code>&lt;select&gt;</code> з <code>&lt;option&gt;</code> — випадаючий список. <code>selected</code> — обраний за замовчуванням, <code>&lt;optgroup label="..."&gt;</code> — групи</li><li><code>&lt;textarea rows="4"&gt;</code> — багаторядковий текст</li><li><code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> — групування полів з назвою</li><li><code>&lt;datalist&gt;</code> — підказки для текстового поля</li></ul>
<p>Кнопки <code>&lt;button type="..."&gt;</code>:</p>
<ul><li><code>submit</code> — надіслати форму (за замовчуванням!)</li><li><code>reset</code> — очистити поля</li><li><code>button</code> — звичайна кнопка, нічого не надсилає (для JavaScript)</li></ul>`,
        `<p>Ещё несколько элементов форм:</p>
<ul><li><code>&lt;select&gt;</code> с <code>&lt;option&gt;</code> — выпадающий список. <code>selected</code> — выбран по умолчанию, <code>&lt;optgroup label="..."&gt;</code> — группы</li><li><code>&lt;textarea rows="4"&gt;</code> — многострочный текст</li><li><code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> — группировка полей с названием</li><li><code>&lt;datalist&gt;</code> — подсказки для текстового поля</li></ul>
<p>Кнопки <code>&lt;button type="..."&gt;</code>:</p>
<ul><li><code>submit</code> — отправить форму (по умолчанию!)</li><li><code>reset</code> — очистить поля</li><li><code>button</code> — обычная кнопка, ничего не отправляет (для JavaScript)</li></ul>`,
        `<p>More form elements:</p>
<ul><li><code>&lt;select&gt;</code> with <code>&lt;option&gt;</code> — a dropdown. <code>selected</code> marks the default, <code>&lt;optgroup label="..."&gt;</code> groups options</li><li><code>&lt;textarea rows="4"&gt;</code> — multi-line text</li><li><code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> — a titled group of fields</li><li><code>&lt;datalist&gt;</code> — suggestions for a text field</li></ul>
<p>Buttons <code>&lt;button type="..."&gt;</code>:</p>
<ul><li><code>submit</code> — submits the form (the default!)</li><li><code>reset</code> — clears the fields</li><li><code>button</code> — a plain button that submits nothing (for JavaScript)</li></ul>`),
      why: L(`<p>Чому важливо вказувати <code>type</code> кнопки? За замовчуванням кнопка всередині форми — <code>submit</code>. Якщо ти зробиш кнопку «Показати пароль» без <code>type="button"</code>, кожен клік надсилатиме форму й перезавантажуватиме сторінку.</p>`,
        `<p>Почему важно указывать <code>type</code> кнопки? По умолчанию кнопка внутри формы — <code>submit</code>. Если сделать кнопку «Показать пароль» без <code>type="button"</code>, каждый клик будет отправлять форму и перезагружать страницу.</p>`,
        `<p>Why specify the button <code>type</code>? By default a button inside a form is <code>submit</code>. A “Show password” button without <code>type="button"</code> would submit the form and reload the page on every click.</p>`),
      mistakes: L(`<ul><li><code>&lt;option&gt;</code> без <code>value</code> — надішлеться текст пункту, який може змінитися при перекладі.</li><li>Текст між <code>&lt;textarea&gt;</code> і <code>&lt;/textarea&gt;</code> стає його значенням — не став туди пробіли й переноси випадково.</li></ul>`,
        `<ul><li><code>&lt;option&gt;</code> без <code>value</code> — отправится текст пункта, который может измениться при переводе.</li><li>Текст между <code>&lt;textarea&gt;</code> и <code>&lt;/textarea&gt;</code> становится его значением — не ставь туда пробелы и переносы случайно.</li></ul>`,
        `<ul><li><code>&lt;option&gt;</code> without a <code>value</code> sends the visible text, which may change with translation.</li><li>Text between <code>&lt;textarea&gt;</code> and <code>&lt;/textarea&gt;</code> becomes its value — don’t add stray spaces or line breaks.</li></ul>`),
      examples: [
        { title: 'select', code: '<label for="lang">Favourite language</label>\n<select id="lang" name="lang">\n  <optgroup label="Web">\n    <option value="js">JavaScript</option>\n    <option value="html">HTML</option>\n  </optgroup>\n  <optgroup label="Other">\n    <option value="py" selected>Python</option>\n    <option value="go">Go</option>\n  </optgroup>\n</select>', note: L('Python обрано за замовчуванням.', 'Python выбран по умолчанию.', 'Python is selected by default.') },
        { title: 'textarea', code: '<label for="msg">Message</label><br>\n<textarea id="msg" name="message" rows="4" cols="40" placeholder="Write something nice…"></textarea>', note: L('Розмір можна змінювати, потягнувши за кут.', 'Размер можно менять, потянув за угол.', 'Resize it by dragging the corner.') },
        { title: 'fieldset', code: '<form>\n  <fieldset>\n    <legend>Delivery</legend>\n    <label><input type="radio" name="d" value="post" checked> Post</label>\n    <label><input type="radio" name="d" value="courier"> Courier</label>\n  </fieldset>\n  <button type="reset">Clear</button>\n  <button type="button">Just a button</button>\n  <button type="submit">Order</button>\n</form>', note: L('Три типи кнопок.', 'Три типа кнопок.', 'Three button types.') },
        { title: 'datalist', code: '<label for="city">City</label>\n<input id="city" list="cities" placeholder="Start typing…">\n<datalist id="cities">\n  <option value="Kyiv"><option value="Lviv"><option value="Odesa"><option value="Kharkiv">\n</datalist>', note: L('Почни вводити — з’являться підказки.', 'Начни вводить — появятся подсказки.', 'Start typing — suggestions appear.') }
      ],
      task: {
        text: L('Створи форму відгуку: <code>select</code> з <code>name="rating"</code> і щонайменше трьома <code>option</code> зі значеннями (один — <code>selected</code>), <code>textarea</code> з <code>name="comment"</code>, кнопку <code>type="reset"</code> і кнопку <code>type="submit"</code>.', 'Создай форму отзыва: <code>select</code> с <code>name="rating"</code> и минимум тремя <code>option</code> со значениями (один — <code>selected</code>), <code>textarea</code> с <code>name="comment"</code>, кнопку <code>type="reset"</code> и кнопку <code>type="submit"</code>.', 'Create a feedback form: a <code>select</code> with <code>name="rating"</code> and at least three <code>option</code>s with values (one <code>selected</code>), a <code>textarea</code> with <code>name="comment"</code>, a <code>type="reset"</code> button and a <code>type="submit"</code> button.'),
        how: [L('<code>&lt;option value="5" selected&gt;Excellent&lt;/option&gt;</code>', '<code>&lt;option value="5" selected&gt;Excellent&lt;/option&gt;</code>', '<code>&lt;option value="5" selected&gt;Excellent&lt;/option&gt;</code>'), L('Дві кнопки з різними <code>type</code>.', 'Две кнопки с разными <code>type</code>.', 'Two buttons with different <code>type</code>s.')],
        starter: '<form>\n  \n</form>\n',
        solution: '<form>\n  <select name="rating">\n    <option value="5" selected>Excellent</option>\n    <option value="3">OK</option>\n    <option value="1">Bad</option>\n  </select>\n  <textarea name="comment" rows="3"></textarea>\n  <button type="reset">Clear</button>\n  <button type="submit">Send</button>\n</form>',
        hint: L('У кожного <code>option</code> має бути атрибут <code>value</code>.', 'У каждого <code>option</code> должен быть атрибут <code>value</code>.', 'Each <code>option</code> needs a <code>value</code>.'),
        check: function (doc) { var f = doc.querySelector('form'); if (!f) return false; var s = f.querySelector('select[name=rating]'); if (!s) return false; var opts = s.querySelectorAll('option[value]'); if (opts.length < 3 || !s.querySelector('option[selected]')) return false; return !!(f.querySelector('textarea[name=comment]') && f.querySelector('button[type=reset]') && f.querySelector('button[type=submit]')); }
      },
      quiz: { q: L('Який type має кнопка всередині форми за замовчуванням?', 'Какой type у кнопки внутри формы по умолчанию?', 'What is a button’s default type inside a form?'), options: ['button', 'submit', 'reset'], answer: 1, explain: L('Тому для звичайних кнопок пиши type="button".', 'Поэтому для обычных кнопок пиши type="button".', 'So write type="button" for plain buttons.') },
      ref: [{ code: '<select><option value>', d: L('випадаючий список', 'выпадающий список', 'dropdown') }, { code: '<textarea>', d: L('багаторядкове поле', 'многострочное поле', 'multi-line field') }, { code: '<button type="button|submit|reset">', d: L('типи кнопок', 'типы кнопок', 'button types') }]
    },
    {
      id: 'validation', chapter: CH4,
      title: L('Перевірка введених даних', 'Проверка введённых данных', 'Built-in validation'),
      theory: L(
        `<p>HTML вміє перевіряти поля <b>без жодного JavaScript</b>. Браузер не дасть надіслати форму, доки правила не виконано, і сам покаже підказку.</p>
<table class="mini"><tr><td><code>required</code></td><td>обов’язкове поле</td></tr><tr><td><code>minlength / maxlength</code></td><td>довжина тексту</td></tr><tr><td><code>min / max / step</code></td><td>межі для чисел і дат</td></tr><tr><td><code>pattern="[0-9]{5}"</code></td><td>регулярний вираз (формат)</td></tr><tr><td><code>type="email" / "url"</code></td><td>перевірка формату</td></tr></table>
<p>Ще корисне: <code>placeholder</code> — сіра підказка, <code>value</code> — початкове значення, <code>autocomplete="email"</code> — автозаповнення, <code>disabled</code> / <code>readonly</code> — заблоковане поле.</p>
<p>CSS бачить стан поля через псевдокласи <code>:valid</code> і <code>:invalid</code> — так роблять зелені/червоні рамки.</p>`,
        `<p>HTML умеет проверять поля <b>без всякого JavaScript</b>. Браузер не даст отправить форму, пока правила не выполнены, и сам покажет подсказку.</p>
<table class="mini"><tr><td><code>required</code></td><td>обязательное поле</td></tr><tr><td><code>minlength / maxlength</code></td><td>длина текста</td></tr><tr><td><code>min / max / step</code></td><td>границы для чисел и дат</td></tr><tr><td><code>pattern="[0-9]{5}"</code></td><td>регулярное выражение (формат)</td></tr><tr><td><code>type="email" / "url"</code></td><td>проверка формата</td></tr></table>
<p>Ещё полезное: <code>placeholder</code> — серая подсказка, <code>value</code> — начальное значение, <code>autocomplete="email"</code> — автозаполнение, <code>disabled</code> / <code>readonly</code> — заблокированное поле.</p>
<p>CSS видит состояние поля через псевдоклассы <code>:valid</code> и <code>:invalid</code> — так делают зелёные/красные рамки.</p>`,
        `<p>HTML can validate fields <b>without any JavaScript</b>. The browser won’t submit the form until the rules pass and shows a hint itself.</p>
<table class="mini"><tr><td><code>required</code></td><td>required field</td></tr><tr><td><code>minlength / maxlength</code></td><td>text length</td></tr><tr><td><code>min / max / step</code></td><td>bounds for numbers and dates</td></tr><tr><td><code>pattern="[0-9]{5}"</code></td><td>a regular expression (format)</td></tr><tr><td><code>type="email" / "url"</code></td><td>format check</td></tr></table>
<p>Also handy: <code>placeholder</code> — a grey hint, <code>value</code> — the initial value, <code>autocomplete="email"</code> — autofill, <code>disabled</code> / <code>readonly</code> — a locked field.</p>
<p>CSS sees a field’s state via the <code>:valid</code> and <code>:invalid</code> pseudo-classes — that’s how green/red borders are made.</p>`),
      why: L(`<p>Перевірка в браузері миттєва й зручна для користувача. <b>Але</b> її легко обійти, тож сервер завжди має перевіряти дані ще раз. Правило: браузерна перевірка — для зручності, серверна — для безпеки.</p>`,
        `<p>Проверка в браузере мгновенная и удобная для пользователя. <b>Но</b> её легко обойти, поэтому сервер всегда должен проверять данные ещё раз. Правило: браузерная проверка — для удобства, серверная — для безопасности.</p>`,
        `<p>Browser validation is instant and user-friendly. <b>But</b> it’s easy to bypass, so the server must always check data again. Rule: browser validation is for convenience, server validation for security.</p>`),
      mistakes: L(`<ul><li>Покладатися лише на <code>placeholder</code> як на підказку формату — додай текст поруч.</li><li>Занадто суворий <code>pattern</code> (наприклад, імена лише латиницею) відсіює реальних людей.</li></ul>`,
        `<ul><li>Полагаться только на <code>placeholder</code> как на подсказку формата — добавь текст рядом.</li><li>Слишком строгий <code>pattern</code> (например, имена только латиницей) отсеивает реальных людей.</li></ul>`,
        `<ul><li>Relying only on <code>placeholder</code> to explain the format — add text next to the field.</li><li>An over-strict <code>pattern</code> (e.g. Latin-only names) rejects real people.</li></ul>`),
      examples: [
        { title: 'required', code: '<form>\n  <input name="nick" required placeholder="Nickname (required)">\n  <button>Send</button>\n</form>', note: L('Натисни «Send» з порожнім полем.', 'Нажми «Send» с пустым полем.', 'Press “Send” with the field empty.') },
        { title: L('Числа', 'Числа', 'Numbers'), code: '<form>\n  <label>Age (7–99): <input type="number" name="age" min="7" max="99" required></label>\n  <label>Rating: <input type="range" min="1" max="5" step="1" value="5"></label>\n  <button>Check</button>\n</form>', note: L('Спробуй ввести 120.', 'Попробуй ввести 120.', 'Try entering 120.') },
        { title: 'pattern', code: '<form>\n  <label>ZIP code: <input name="zip" pattern="[0-9]{5}" title="5 digits" required></label>\n  <label>Password: <input type="password" minlength="8" required></label>\n  <button>Save</button>\n</form>', note: L('<code>title</code> показується в повідомленні про помилку.', '<code>title</code> показывается в сообщении об ошибке.', '<code>title</code> appears in the error message.') },
        { title: ':valid / :invalid', code: '<style>\n  input:invalid { border: 2px solid #f43f5e; }\n  input:valid { border: 2px solid #22c55e; }\n</style>\n<input type="email" required placeholder="you@mail.com">', note: L('Рамка змінює колір, поки пишеш.', 'Рамка меняет цвет, пока пишешь.', 'The border changes colour as you type.') }
      ],
      task: {
        text: L('Створи форму реєстрації: обов’язкове поле <code>name="nick"</code> з <code>minlength="3"</code>, обов’язкове поле email, поле віку <code>type="number"</code> з <code>min="7"</code> і <code>max="120"</code>, і кнопку.', 'Создай форму регистрации: обязательное поле <code>name="nick"</code> с <code>minlength="3"</code>, обязательное поле email, поле возраста <code>type="number"</code> с <code>min="7"</code> и <code>max="120"</code>, и кнопку.', 'Create a sign-up form: a required <code>name="nick"</code> field with <code>minlength="3"</code>, a required email field, an age field <code>type="number"</code> with <code>min="7"</code> and <code>max="120"</code>, and a button.'),
        how: [L('Атрибути без значення пишуться просто словом: <code>required</code>.', 'Атрибуты без значения пишутся просто словом: <code>required</code>.', 'Boolean attributes are just the word: <code>required</code>.')],
        starter: '<form>\n  \n</form>\n',
        solution: '<form>\n  <input name="nick" minlength="3" required placeholder="Nickname">\n  <input type="email" name="email" required placeholder="Email">\n  <input type="number" name="age" min="7" max="120" placeholder="Age">\n  <button>Sign up</button>\n</form>',
        hint: L('Перевір, що для email стоїть і <code>type="email"</code>, і <code>required</code>.', 'Проверь, что для email стоит и <code>type="email"</code>, и <code>required</code>.', 'Check that the email has both <code>type="email"</code> and <code>required</code>.'),
        check: function (doc) { var f = doc.querySelector('form'); if (!f) return false; var n = f.querySelector('input[name=nick]'); var e = f.querySelector('input[type=email]'); var a = f.querySelector('input[type=number]'); return !!(n && n.required && n.getAttribute('minlength') === '3' && e && e.required && a && a.getAttribute('min') === '7' && a.getAttribute('max') === '120' && f.querySelector('button, input[type=submit]')); }
      },
      quiz: { q: L('Чи достатньо перевірки лише в HTML?', 'Достаточно ли проверки только в HTML?', 'Is HTML-only validation enough?'), options: [L('так', 'да', 'yes'), L('ні, сервер теж має перевіряти', 'нет, сервер тоже должен проверять', 'no, the server must check too')], answer: 1, explain: L('Браузерну перевірку легко обійти.', 'Браузерную проверку легко обойти.', 'Browser validation is easy to bypass.') },
      ref: [{ code: 'required minlength pattern', d: L('правила перевірки', 'правила проверки', 'validation rules') }, { code: ':valid :invalid', d: L('стан поля в CSS', 'состояние поля в CSS', 'field state in CSS') }]
    },
    {
      id: 'media', chapter: CH4,
      title: L('Аудіо, відео та iframe', 'Аудио, видео и iframe', 'Audio, video and iframe'),
      theory: L(
        `<p>HTML5 вміє програвати медіа без плагінів:</p>
<pre class="inline-code">&lt;video src="movie.mp4" controls width="400" poster="cover.jpg"&gt;&lt;/video&gt;
&lt;audio src="song.mp3" controls&gt;&lt;/audio&gt;</pre>
<ul><li><code>controls</code> — показати кнопки відтворення</li><li><code>autoplay</code>, <code>muted</code>, <code>loop</code> — автозапуск (браузери дозволяють лише без звуку), без звуку, повтор</li><li><code>poster</code> — обкладинка відео</li><li>Кілька форматів: всередині <code>&lt;source src="..." type="video/webm"&gt;</code></li><li><code>&lt;track&gt;</code> — субтитри</li></ul>
<p><code>&lt;iframe&gt;</code> вбудовує іншу сторінку: відео з YouTube, карту, гру. Атрибут <code>title</code> обов’язковий для доступності, <code>loading="lazy"</code> пришвидшує сайт.</p>`,
        `<p>HTML5 умеет проигрывать медиа без плагинов:</p>
<pre class="inline-code">&lt;video src="movie.mp4" controls width="400" poster="cover.jpg"&gt;&lt;/video&gt;
&lt;audio src="song.mp3" controls&gt;&lt;/audio&gt;</pre>
<ul><li><code>controls</code> — показать кнопки воспроизведения</li><li><code>autoplay</code>, <code>muted</code>, <code>loop</code> — автозапуск (браузеры разрешают только без звука), без звука, повтор</li><li><code>poster</code> — обложка видео</li><li>Несколько форматов: внутри <code>&lt;source src="..." type="video/webm"&gt;</code></li><li><code>&lt;track&gt;</code> — субтитры</li></ul>
<p><code>&lt;iframe&gt;</code> встраивает другую страницу: видео с YouTube, карту, игру. Атрибут <code>title</code> обязателен для доступности, <code>loading="lazy"</code> ускоряет сайт.</p>`,
        `<p>HTML5 plays media without plugins:</p>
<pre class="inline-code">&lt;video src="movie.mp4" controls width="400" poster="cover.jpg"&gt;&lt;/video&gt;
&lt;audio src="song.mp3" controls&gt;&lt;/audio&gt;</pre>
<ul><li><code>controls</code> — show playback buttons</li><li><code>autoplay</code>, <code>muted</code>, <code>loop</code> — autoplay (browsers only allow it muted), muted, loop</li><li><code>poster</code> — a video cover image</li><li>Several formats: <code>&lt;source src="..." type="video/webm"&gt;</code> inside</li><li><code>&lt;track&gt;</code> — subtitles</li></ul>
<p><code>&lt;iframe&gt;</code> embeds another page: a YouTube video, a map, a game. A <code>title</code> is required for accessibility, and <code>loading="lazy"</code> speeds up the site.</p>`),
      why: L(`<p>Чому кілька <code>&lt;source&gt;</code>? Різні браузери підтримують різні формати. Браузер візьме перший, який вміє програвати. А <code>autoplay</code> зі звуком заборонили, бо раптова музика при відкритті сайту дратує всіх.</p>`,
        `<p>Зачем несколько <code>&lt;source&gt;</code>? Разные браузеры поддерживают разные форматы. Браузер возьмёт первый, который умеет проигрывать. А <code>autoplay</code> со звуком запретили, потому что внезапная музыка при открытии сайта раздражает всех.</p>`,
        `<p>Why several <code>&lt;source&gt;</code>s? Different browsers support different formats; the browser takes the first one it can play. Autoplay with sound was banned because sudden music on page load annoys everyone.</p>`),
      mistakes: L(`<ul><li>Забути <code>controls</code> — відео є, а кнопки «Play» немає.</li><li>Вбудовувати чужі сайти, які забороняють iframe — буде порожній блок.</li></ul>`,
        `<ul><li>Забыть <code>controls</code> — видео есть, а кнопки «Play» нет.</li><li>Встраивать чужие сайты, запрещающие iframe — будет пустой блок.</li></ul>`,
        `<ul><li>Forgetting <code>controls</code> — the video is there but there’s no Play button.</li><li>Embedding sites that forbid iframes — you get an empty box.</li></ul>`),
      examples: [
        { title: L('Відео', 'Видео', 'Video'), code: '<video controls width="360" poster="https://picsum.photos/id/1018/360/200">\n  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">\n  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">\n  Your browser does not support video.\n</video>', note: L('Текст усередині видно лише в дуже старих браузерах.', 'Текст внутри виден только в очень старых браузерах.', 'The inner text only shows in very old browsers.') },
        { title: L('Аудіо', 'Аудио', 'Audio'), code: '<audio controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>', note: L('Рик динозавра 🦖', 'Рык динозавра 🦖', 'A dinosaur roar 🦖') },
        { title: L('Фонове відео', 'Фоновое видео', 'Background video'), code: '<video autoplay muted loop width="360" src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"></video>', note: L('Автозапуск працює лише з <code>muted</code>.', 'Автозапуск работает только с <code>muted</code>.', 'Autoplay only works with <code>muted</code>.') },
        { title: 'iframe', code: '<iframe title="Map of Kyiv" width="360" height="220" loading="lazy"\n  src="https://www.openstreetmap.org/export/embed.html?bbox=30.45,50.40,30.60,50.48&layer=mapnik"></iframe>', note: L('Карта OpenStreetMap всередині сторінки.', 'Карта OpenStreetMap внутри страницы.', 'An OpenStreetMap map inside the page.') }
      ],
      task: {
        text: L('Додай <code>video</code> з атрибутами <code>controls</code> і <code>width</code>, що містить щонайменше один <code>&lt;source&gt;</code> з атрибутом <code>type</code>. Під ним додай <code>audio</code> з <code>controls</code>.', 'Добавь <code>video</code> с атрибутами <code>controls</code> и <code>width</code>, содержащий минимум один <code>&lt;source&gt;</code> с атрибутом <code>type</code>. Под ним добавь <code>audio</code> с <code>controls</code>.', 'Add a <code>video</code> with <code>controls</code> and <code>width</code>, containing at least one <code>&lt;source&gt;</code> with a <code>type</code>. Below it add an <code>audio</code> with <code>controls</code>.'),
        how: [L('Можна взяти адреси з прикладів.', 'Можно взять адреса из примеров.', 'You can reuse the URLs from the examples.')],
        starter: '\n',
        solution: '<video controls width="320">\n  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">\n</video>\n<audio controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>',
        hint: L('<code>&lt;source&gt;</code> — порожній тег усередині <code>video</code>.', '<code>&lt;source&gt;</code> — пустой тег внутри <code>video</code>.', '<code>&lt;source&gt;</code> is a void tag inside <code>video</code>.'),
        check: function (doc) { var v = doc.querySelector('video'); var a = doc.querySelector('audio'); return !!(v && v.hasAttribute('controls') && v.getAttribute('width') && v.querySelector('source[type][src]') && a && a.hasAttribute('controls')); }
      },
      quiz: { q: L('За якої умови браузер дозволить autoplay?', 'При каком условии браузер разрешит autoplay?', 'When will a browser allow autoplay?'), options: [L('завжди', 'всегда', 'always'), L('якщо відео muted', 'если видео muted', 'if the video is muted'), L('ніколи', 'никогда', 'never')], answer: 1, explain: L('Автозапуск зі звуком заблоковано.', 'Автозапуск со звуком заблокирован.', 'Autoplay with sound is blocked.') },
      ref: [{ code: '<video controls><source>', d: L('відео', 'видео', 'video') }, { code: '<audio controls>', d: L('аудіо', 'аудио', 'audio') }, { code: '<iframe title src>', d: L('вбудована сторінка', 'встроенная страница', 'embedded page') }]
    },
    {
      id: 'style-intro', chapter: CH5,
      title: L('Стилі в HTML: style і link', 'Стили в HTML: style и link', 'Styles in HTML: style and link'),
      theory: L(
        `<p>HTML відповідає за <b>структуру</b>, а за <b>вигляд</b> — CSS. Підключити CSS можна трьома способами:</p>
<ol><li><b>Вбудований</b> атрибут: <code>&lt;p style="color: red"&gt;</code> — для окремого елемента</li><li><b>Внутрішній</b> тег <code>&lt;style&gt;</code> у <code>&lt;head&gt;</code> — для однієї сторінки</li><li><b>Зовнішній</b> файл: <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> — для всього сайту</li></ol>
<pre class="inline-code">&lt;style&gt;
  h1 { color: royalblue; }
  .note { background: lightyellow; }
&lt;/style&gt;</pre>
<p>Правило CSS = <b>селектор</b> (що стилізувати) + <b>оголошення</b> у фігурних дужках (як). Детально CSS вивчається в окремому курсі.</p>`,
        `<p>HTML отвечает за <b>структуру</b>, а за <b>вид</b> — CSS. Подключить CSS можно тремя способами:</p>
<ol><li><b>Встроенный</b> атрибут: <code>&lt;p style="color: red"&gt;</code> — для отдельного элемента</li><li><b>Внутренний</b> тег <code>&lt;style&gt;</code> в <code>&lt;head&gt;</code> — для одной страницы</li><li><b>Внешний</b> файл: <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> — для всего сайта</li></ol>
<pre class="inline-code">&lt;style&gt;
  h1 { color: royalblue; }
  .note { background: lightyellow; }
&lt;/style&gt;</pre>
<p>Правило CSS = <b>селектор</b> (что стилизовать) + <b>объявления</b> в фигурных скобках (как). Подробно CSS изучается в отдельном курсе.</p>`,
        `<p>HTML handles <b>structure</b>, CSS handles <b>appearance</b>. There are three ways to add CSS:</p>
<ol><li>An <b>inline</b> attribute: <code>&lt;p style="color: red"&gt;</code> — for one element</li><li>An <b>internal</b> <code>&lt;style&gt;</code> tag in <code>&lt;head&gt;</code> — for one page</li><li>An <b>external</b> file: <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> — for the whole site</li></ol>
<pre class="inline-code">&lt;style&gt;
  h1 { color: royalblue; }
  .note { background: lightyellow; }
&lt;/style&gt;</pre>
<p>A CSS rule = a <b>selector</b> (what to style) + <b>declarations</b> in braces (how). CSS has its own full course.</p>`),
      why: L(`<p>Чому краще зовнішній файл? Один <code>style.css</code> для 50 сторінок — змінив колір кнопки один раз, і він змінився всюди. Браузер ще й кешує файл, тож сторінки відкриваються швидше. Вбудовані стилі — лише для швидких експериментів.</p>`,
        `<p>Почему лучше внешний файл? Один <code>style.css</code> на 50 страниц — изменил цвет кнопки один раз, и он изменился везде. Браузер ещё и кеширует файл, поэтому страницы открываются быстрее. Встроенные стили — только для быстрых экспериментов.</p>`,
        `<p>Why an external file? One <code>style.css</code> for 50 pages — change a button colour once and it changes everywhere. The browser caches the file too, so pages load faster. Inline styles are only for quick experiments.</p>`),
      mistakes: L(`<ul><li>Стилізувати все через <code>style="..."</code> — код стає нечитабельним і його неможливо підтримувати.</li><li>Використовувати застарілі теги оформлення <code>&lt;font&gt;</code>, <code>&lt;center&gt;</code>.</li></ul>`,
        `<ul><li>Стилизовать всё через <code>style="..."</code> — код становится нечитаемым и его невозможно поддерживать.</li><li>Использовать устаревшие теги оформления <code>&lt;font&gt;</code>, <code>&lt;center&gt;</code>.</li></ul>`,
        `<ul><li>Styling everything with <code>style="..."</code> — the code becomes unreadable and unmaintainable.</li><li>Using obsolete presentational tags like <code>&lt;font&gt;</code> and <code>&lt;center&gt;</code>.</li></ul>`),
      examples: [
        { title: 'style=""', code: '<p style="color: crimson; font-size: 20px;">Inline style</p>\n<p>Normal paragraph</p>', note: L('Лише для одного елемента.', 'Только для одного элемента.', 'Only for one element.') },
        { title: '<style>', code: '<style>\n  h1 { color: royalblue; text-align: center; }\n  .note { background: lightyellow; padding: 8px; border-radius: 8px; }\n</style>\n<h1>Styled page</h1>\n<p class="note">This note has a yellow background.</p>\n<p class="note">And this one too!</p>', note: L('Один стиль для всіх <code>.note</code>.', 'Один стиль для всех <code>.note</code>.', 'One style for every <code>.note</code>.') },
        { title: '<link>', code: '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">\n</head>\n<body>\n  <h1>External CSS</h1>\n  <p>This page uses a ready-made stylesheet.</p>\n  <button>Button</button>\n</body>\n</html>', note: L('Готовий стиль з інтернету змінив усю сторінку.', 'Готовый стиль из интернета изменил всю страницу.', 'A ready-made stylesheet restyled the whole page.') }
      ],
      task: {
        text: L('Додай тег <code>&lt;style&gt;</code>, у якому всі <code>h1</code> мають колір <code>green</code>, а елементи з класом <code>box</code> — фон <code>yellow</code>. Нижче — заголовок <code>h1</code> і два <code>div</code> з класом <code>box</code>.', 'Добавь тег <code>&lt;style&gt;</code>, в котором все <code>h1</code> имеют цвет <code>green</code>, а элементы с классом <code>box</code> — фон <code>yellow</code>. Ниже — заголовок <code>h1</code> и два <code>div</code> с классом <code>box</code>.', 'Add a <code>&lt;style&gt;</code> tag where all <code>h1</code> are <code>green</code> and elements with class <code>box</code> have a <code>yellow</code> background. Below that, an <code>h1</code> and two <code>div</code>s with class <code>box</code>.'),
        how: [L('<code>h1 { color: green; }</code>', '<code>h1 { color: green; }</code>', '<code>h1 { color: green; }</code>'), L('<code>.box { background: yellow; }</code>', '<code>.box { background: yellow; }</code>', '<code>.box { background: yellow; }</code>')],
        starter: '\n',
        solution: '<style>\n  h1 { color: green; }\n  .box { background: yellow; }\n</style>\n<h1>Hello</h1>\n<div class="box">One</div>\n<div class="box">Two</div>',
        hint: L('Клас у CSS пишеться з крапкою: <code>.box</code>.', 'Класс в CSS пишется с точкой: <code>.box</code>.', 'A class in CSS starts with a dot: <code>.box</code>.'),
        check: function (doc, win) { var h = doc.querySelector('h1'); var boxes = doc.querySelectorAll('div.box'); if (!h || boxes.length < 2 || !doc.querySelector('style')) return false; return win.getComputedStyle(h).color === 'rgb(0, 128, 0)' && win.getComputedStyle(boxes[1]).backgroundColor === 'rgb(255, 255, 0)'; }
      },
      quiz: { q: L('Який спосіб підключення CSS найкращий для великого сайту?', 'Какой способ подключения CSS лучший для большого сайта?', 'Which way of adding CSS is best for a large site?'), options: ['style=""', '<style>', '<link href="style.css">'], answer: 2, explain: L('Один файл для всіх сторінок.', 'Один файл для всех страниц.', 'One file for all pages.') },
      ref: [{ code: '<style> ... </style>', d: L('внутрішні стилі', 'внутренние стили', 'internal styles') }, { code: '<link rel="stylesheet" href>', d: L('зовнішній CSS-файл', 'внешний CSS-файл', 'external CSS file') }]
    },
    {
      id: 'entities', chapter: CH5,
      title: L('Спецсимволи та коментарі', 'Спецсимволы и комментарии', 'Entities and comments'),
      theory: L(
        `<p>Деякі символи в HTML мають особливе значення. Щоб показати їх як текст, використовують <b>сутності</b> (entities):</p>
<table class="mini"><tr><td><code>&amp;lt;</code> <code>&amp;gt;</code></td><td>&lt; &gt;</td></tr><tr><td><code>&amp;amp;</code></td><td>&amp;</td></tr><tr><td><code>&amp;quot;</code></td><td>"</td></tr><tr><td><code>&amp;nbsp;</code></td><td>нерозривний пробіл</td></tr><tr><td><code>&amp;copy;</code> <code>&amp;reg;</code> <code>&amp;trade;</code></td><td>© ® ™</td></tr><tr><td><code>&amp;euro;</code> <code>&amp;hearts;</code> <code>&amp;rarr;</code></td><td>€ ♥ →</td></tr></table>
<p><b>Коментар</b> HTML: <code>&lt;!-- текст --&gt;</code>. Його не видно на сторінці, але видно в коді (F12 → Elements), тож не пиши туди секрети.</p>`,
        `<p>Некоторые символы в HTML имеют особое значение. Чтобы показать их как текст, используют <b>сущности</b> (entities):</p>
<table class="mini"><tr><td><code>&amp;lt;</code> <code>&amp;gt;</code></td><td>&lt; &gt;</td></tr><tr><td><code>&amp;amp;</code></td><td>&amp;</td></tr><tr><td><code>&amp;quot;</code></td><td>"</td></tr><tr><td><code>&amp;nbsp;</code></td><td>неразрывный пробел</td></tr><tr><td><code>&amp;copy;</code> <code>&amp;reg;</code> <code>&amp;trade;</code></td><td>© ® ™</td></tr><tr><td><code>&amp;euro;</code> <code>&amp;hearts;</code> <code>&amp;rarr;</code></td><td>€ ♥ →</td></tr></table>
<p><b>Комментарий</b> HTML: <code>&lt;!-- текст --&gt;</code>. Его не видно на странице, но видно в коде (F12 → Elements), так что не пиши туда секреты.</p>`,
        `<p>Some characters have special meaning in HTML. To show them as text, use <b>entities</b>:</p>
<table class="mini"><tr><td><code>&amp;lt;</code> <code>&amp;gt;</code></td><td>&lt; &gt;</td></tr><tr><td><code>&amp;amp;</code></td><td>&amp;</td></tr><tr><td><code>&amp;quot;</code></td><td>"</td></tr><tr><td><code>&amp;nbsp;</code></td><td>non-breaking space</td></tr><tr><td><code>&amp;copy;</code> <code>&amp;reg;</code> <code>&amp;trade;</code></td><td>© ® ™</td></tr><tr><td><code>&amp;euro;</code> <code>&amp;hearts;</code> <code>&amp;rarr;</code></td><td>€ ♥ →</td></tr></table>
<p>An HTML <b>comment</b>: <code>&lt;!-- text --&gt;</code>. It’s invisible on the page but visible in the source (F12 → Elements), so never put secrets there.</p>`),
      why: L(`<p>Якщо написати <code>&lt;b&gt;</code> у тексті статті про HTML, браузер сприйме це як тег і зробить текст жирним. <code>&amp;lt;b&amp;gt;</code> — спосіб сказати «покажи ці символи, а не виконуй». А <code>&amp;nbsp;</code> не дає розірвати рядок між «100» і «грн».</p>`,
        `<p>Если написать <code>&lt;b&gt;</code> в тексте статьи про HTML, браузер воспримет это как тег и сделает текст жирным. <code>&amp;lt;b&amp;gt;</code> — способ сказать «покажи эти символы, а не выполняй». А <code>&amp;nbsp;</code> не даёт разорвать строку между «100» и «руб».</p>`,
        `<p>Write <code>&lt;b&gt;</code> in an article about HTML and the browser treats it as a tag and bolds the text. <code>&amp;lt;b&amp;gt;</code> says “show these characters, don’t execute them”. And <code>&amp;nbsp;</code> stops a line break between “100” and “USD”.</p>`),
      mistakes: L(`<ul><li>Забута крапка з комою: <code>&amp;copy</code> іноді працює, але не завжди.</li><li>Ставити кілька <code>&amp;nbsp;</code> для відступів — використовуй CSS.</li></ul>`,
        `<ul><li>Забытая точка с запятой: <code>&amp;copy</code> иногда работает, но не всегда.</li><li>Ставить несколько <code>&amp;nbsp;</code> для отступов — используй CSS.</li></ul>`,
        `<ul><li>A missing semicolon: <code>&amp;copy</code> sometimes works, but not always.</li><li>Using several <code>&amp;nbsp;</code> for spacing — use CSS.</li></ul>`),
      examples: [
        { title: L('Теги як текст', 'Теги как текст', 'Tags as text'), code: '<p>To make text bold use &lt;strong&gt;...&lt;/strong&gt;</p>\n<p>Tom &amp; Jerry</p>', note: L('Кутові дужки показано як текст.', 'Угловые скобки показаны как текст.', 'Angle brackets shown as text.') },
        { title: L('Символи', 'Символы', 'Symbols'), code: '<p>&copy; 2026 Codry&trade; &mdash; made with &hearts;</p>\n<p>Price: 100&nbsp;&euro; &rarr; 90&nbsp;&euro;</p>', note: L('Нерозривний пробіл тримає число з валютою разом.', 'Неразрывный пробел держит число с валютой вместе.', 'A non-breaking space keeps the number with the currency.') },
        { title: L('Коментар', 'Комментарий', 'Comment'), code: '<!-- Main heading -->\n<h1>Visible</h1>\n<!--\n<p>This whole block is commented out</p>\n-->\n<p>Also visible</p>', note: L('Закоментований абзац не відображається.', 'Закомментированный абзац не отображается.', 'The commented paragraph isn’t shown.') }
      ],
      task: {
        text: L('Виведи абзац з точним текстом <code>Use &lt;h1&gt; for titles &amp; &lt;p&gt; for text</code> (кутові дужки та амперсанд мають бути видимими), а нижче — абзац з символом © (через <code>&amp;copy;</code>). Додай будь-який HTML-коментар.', 'Выведи абзац с точным текстом <code>Use &lt;h1&gt; for titles &amp; &lt;p&gt; for text</code> (угловые скобки и амперсанд должны быть видимыми), а ниже — абзац с символом © (через <code>&amp;copy;</code>). Добавь любой HTML-комментарий.', 'Show a paragraph with exactly <code>Use &lt;h1&gt; for titles &amp; &lt;p&gt; for text</code> (the angle brackets and ampersand must be visible), then a paragraph with © (via <code>&amp;copy;</code>). Add any HTML comment.'),
        how: [L('<code>&amp;lt;h1&amp;gt;</code> покаже <code>&lt;h1&gt;</code>.', '<code>&amp;lt;h1&amp;gt;</code> покажет <code>&lt;h1&gt;</code>.', '<code>&amp;lt;h1&amp;gt;</code> shows <code>&lt;h1&gt;</code>.'), L('<code>&amp;amp;</code> — це <code>&amp;</code>.', '<code>&amp;amp;</code> — это <code>&amp;</code>.', '<code>&amp;amp;</code> is <code>&amp;</code>.')],
        starter: '\n',
        solution: '<!-- Entities demo -->\n<p>Use &lt;h1&gt; for titles &amp; &lt;p&gt; for text</p>\n<p>&copy; 2026</p>',
        hint: L('Якщо заголовок «зник» і текст став великим — ти написав справжній тег замість сутності.', 'Если заголовок «пропал» и текст стал большим — ты написал настоящий тег вместо сущности.', 'If text suddenly became a big heading, you wrote a real tag instead of an entity.'),
        check: function (doc) { var ps = doc.querySelectorAll('p'); var hasText = Array.prototype.some.call(ps, function (p) { return p.textContent.trim() === 'Use <h1> for titles & <p> for text'; }); var hasCopy = doc.body.textContent.indexOf('©') > -1; var hasComment = false; var it = doc.createNodeIterator(doc.documentElement, NodeFilter.SHOW_COMMENT); if (it.nextNode()) hasComment = true; return hasText && hasCopy && hasComment && !doc.querySelector('body h1'); }
      },
      quiz: { q: L('Як показати символ <code>&lt;</code> у тексті?', 'Как показать символ <code>&lt;</code> в тексте?', 'How do you show a <code>&lt;</code> in text?'), options: ['&lt;', '&less;', '\\<'], answer: 0, explain: 'lt = less than.' },
      ref: [{ code: '&lt; &gt; &amp; &nbsp; &copy;', d: L('спецсимволи', 'спецсимволы', 'entities') }, { code: '<!-- … -->', d: L('коментар', 'комментарий', 'comment') }]
    },
    {
      id: 'a11y', chapter: CH5,
      title: L('Доступність (a11y)', 'Доступность (a11y)', 'Accessibility (a11y)'),
      theory: L(
        `<p><b>Доступність</b> — це коли сайтом можуть користуватися всі: люди з порушеннями зору, слуху, моторики, а також з повільним інтернетом чи старим телефоном. Головні правила:</p>
<ul><li>Правильні теги: кнопка — це <code>&lt;button&gt;</code>, а не <code>&lt;div&gt;</code> з кліком; посилання — <code>&lt;a&gt;</code></li><li>Ієрархія заголовків без пропусків: h1 → h2 → h3</li><li><code>alt</code> у кожного зображення (порожній <code>alt=""</code> — для декоративних)</li><li><code>&lt;label&gt;</code> у кожного поля</li><li><code>lang</code> у тегу <code>html</code></li><li><code>aria-label</code> — текстова назва для кнопок-іконок: <code>&lt;button aria-label="Close"&gt;✕&lt;/button&gt;</code></li><li>Достатній контраст тексту й можливість користуватися сайтом лише клавіатурою (Tab)</li></ul>`,
        `<p><b>Доступность</b> — это когда сайтом могут пользоваться все: люди с нарушениями зрения, слуха, моторики, а также с медленным интернетом или старым телефоном. Главные правила:</p>
<ul><li>Правильные теги: кнопка — это <code>&lt;button&gt;</code>, а не <code>&lt;div&gt;</code> с кликом; ссылка — <code>&lt;a&gt;</code></li><li>Иерархия заголовков без пропусков: h1 → h2 → h3</li><li><code>alt</code> у каждого изображения (пустой <code>alt=""</code> — для декоративных)</li><li><code>&lt;label&gt;</code> у каждого поля</li><li><code>lang</code> в теге <code>html</code></li><li><code>aria-label</code> — текстовое название для кнопок-иконок: <code>&lt;button aria-label="Close"&gt;✕&lt;/button&gt;</code></li><li>Достаточный контраст текста и возможность пользоваться сайтом только клавиатурой (Tab)</li></ul>`,
        `<p><b>Accessibility</b> means everyone can use a site: people with visual, hearing or motor impairments, and people on slow internet or old phones. Key rules:</p>
<ul><li>The right tags: a button is a <code>&lt;button&gt;</code>, not a clickable <code>&lt;div&gt;</code>; a link is an <code>&lt;a&gt;</code></li><li>A heading hierarchy with no gaps: h1 → h2 → h3</li><li>An <code>alt</code> on every image (empty <code>alt=""</code> for decorative ones)</li><li>A <code>&lt;label&gt;</code> for every field</li><li><code>lang</code> on the <code>html</code> tag</li><li><code>aria-label</code> — a text name for icon buttons: <code>&lt;button aria-label="Close"&gt;✕&lt;/button&gt;</code></li><li>Enough text contrast and full keyboard (Tab) usability</li></ul>`),
      why: L(`<p>Приблизно кожна шоста людина у світі має певну інвалідність. Доступний сайт — це повага до них, а ще кращий SEO і зручність для всіх (наприклад, субтитри корисні в метро без навушників). У багатьох країнах доступність вимагає закон.</p>`,
        `<p>Примерно каждый шестой человек в мире имеет ту или иную инвалидность. Доступный сайт — это уважение к ним, а ещё лучший SEO и удобство для всех (например, субтитры полезны в метро без наушников). Во многих странах доступность требует закон.</p>`,
        `<p>Roughly one in six people worldwide has a disability. An accessible site respects them, ranks better in search and is more convenient for everyone (subtitles help on the subway without headphones). Many countries require accessibility by law.</p>`),
      mistakes: L(`<ul><li><code>&lt;div onclick&gt;</code> замість кнопки — до нього не дістатися клавіатурою.</li><li>Посилання «тут», «детальніше» без контексту.</li><li>Сірий текст на сірому фоні.</li></ul>`,
        `<ul><li><code>&lt;div onclick&gt;</code> вместо кнопки — до него не добраться клавиатурой.</li><li>Ссылки «тут», «подробнее» без контекста.</li><li>Серый текст на сером фоне.</li></ul>`,
        `<ul><li><code>&lt;div onclick&gt;</code> instead of a button — unreachable by keyboard.</li><li>Links like “here” or “more” without context.</li><li>Grey text on a grey background.</li></ul>`),
      examples: [
        { title: L('Кнопка проти div', 'Кнопка против div', 'Button vs div'), code: '<div onclick="alert(\'div\')" style="display:inline-block;padding:8px;background:#ddd">Fake button</div>\n<button onclick="alert(\'button\')">Real button</button>\n<p>Press Tab — only the real button gets focus.</p>', note: L('Справжня кнопка працює з клавіатури.', 'Настоящая кнопка работает с клавиатуры.', 'The real button works with a keyboard.') },
        { title: 'aria-label', code: '<button aria-label="Close dialog">✕</button>\n<button aria-label="Search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg></button>', note: L('Екранний читач скаже «Close dialog», а не «✕».', 'Экранный чтец скажет «Close dialog», а не «✕».', 'A screen reader says “Close dialog”, not “✕”.') },
        { title: 'alt', code: '<img src="https://picsum.photos/id/1062/200/120" alt="Dog in a raincoat on a rainy street">\n<img src="https://picsum.photos/id/1000/200/40" alt="" role="presentation">', note: L('Порожній alt — для декоративних картинок.', 'Пустой alt — для декоративных картинок.', 'Empty alt is for decorative images.') },
        { title: L('Посилання', 'Ссылки', 'Links'), code: '<p>Bad: To read the docs <a href="#">click here</a>.</p>\n<p>Good: Read the <a href="#">Python documentation</a>.</p>', note: L('Текст посилання має мати сенс сам по собі.', 'Текст ссылки должен иметь смысл сам по себе.', 'Link text should make sense on its own.') }
      ],
      task: {
        text: L('Виправ доступність: у коді є картинка без <code>alt</code>, поле без підпису та «кнопка» на <code>div</code>. Додай змістовний <code>alt</code>, пов’язаний <code>&lt;label&gt;</code> для поля і заміни <code>div</code> на <code>&lt;button&gt;</code> з <code>aria-label="Send"</code>.', 'Исправь доступность: в коде есть картинка без <code>alt</code>, поле без подписи и «кнопка» на <code>div</code>. Добавь содержательный <code>alt</code>, связанный <code>&lt;label&gt;</code> для поля и замени <code>div</code> на <code>&lt;button&gt;</code> с <code>aria-label="Send"</code>.', 'Fix the accessibility: there’s an image without <code>alt</code>, a field without a label and a “button” made of a <code>div</code>. Add a meaningful <code>alt</code>, a linked <code>&lt;label&gt;</code> for the field, and replace the <code>div</code> with a <code>&lt;button&gt;</code> with <code>aria-label="Send"</code>.'),
        how: [L('<code>alt</code> — опиши, що на фото (5+ символів).', '<code>alt</code> — опиши, что на фото (5+ символов).', '<code>alt</code> — describe the photo (5+ characters).'), L('Полю дай <code>id</code> і додай <code>&lt;label for="..."&gt;</code>.', 'Полю дай <code>id</code> и добавь <code>&lt;label for="..."&gt;</code>.', 'Give the field an <code>id</code> and add <code>&lt;label for="..."&gt;</code>.')],
        starter: '<img src="https://picsum.photos/id/1025/200/140">\n<input type="email" placeholder="Email">\n<div class="btn" onclick="alert(\'sent\')">➤</div>\n',
        solution: '<img src="https://picsum.photos/id/1025/200/140" alt="Pug wrapped in a blanket">\n<label for="mail">Email</label>\n<input id="mail" type="email" placeholder="Email">\n<button aria-label="Send" onclick="alert(\'sent\')">➤</button>\n',
        hint: L('Після виправлення в коді не має лишитися <code>div</code>-кнопки.', 'После исправления в коде не должно остаться <code>div</code>-кнопки.', 'After fixing, no <code>div</code> button should remain.'),
        check: function (doc) { var img = doc.querySelector('img'); var inp = doc.querySelector('input[type=email]'); var b = doc.querySelector('button[aria-label=Send]'); return !!(img && (img.getAttribute('alt') || '').trim().length >= 5 && inp && inp.id && doc.querySelector('label[for="' + inp.id + '"]') && b && !doc.querySelector('div[onclick]')); }
      },
      quiz: { q: L('Що найкраще використати для клікабельної дії?', 'Что лучше всего использовать для кликабельного действия?', 'What’s best for a clickable action?'), options: ['<div onclick>', '<button>', '<span>'], answer: 1, explain: L('button працює з клавіатурою та екранними читачами.', 'button работает с клавиатурой и экранными чтецами.', 'button works with keyboards and screen readers.') },
      ref: [{ code: 'aria-label="..."', d: L('назва для екранних читачів', 'название для экранных чтецов', 'name for screen readers') }, { code: 'alt=""', d: L('декоративне зображення', 'декоративное изображение', 'decorative image') }]
    },
    {
      id: 'seo', chapter: CH5,
      title: L('Метадані та SEO', 'Метаданные и SEO', 'Metadata and SEO'),
      theory: L(
        `<p>У <code>&lt;head&gt;</code> живуть <b>метадані</b> — інформація для браузерів, пошуковиків і соцмереж:</p>
<pre class="inline-code">&lt;title&gt;Learn Python free — Codry&lt;/title&gt;
&lt;meta name="description" content="Interactive Python lessons..."&gt;
&lt;meta property="og:title" content="Codry"&gt;
&lt;meta property="og:image" content="https://.../preview.png"&gt;
&lt;link rel="icon" href="favicon.png"&gt;</pre>
<ul><li><code>title</code> — назва у вкладці й заголовок у результатах Google (до ~60 символів)</li><li><code>description</code> — опис під заголовком у пошуку (~150 символів)</li><li><code>og:*</code> (Open Graph) — як виглядає посилання в Telegram, Facebook, Viber</li><li><code>rel="icon"</code> — значок вкладки (favicon)</li><li><code>theme-color</code> — колір рядка браузера на телефоні</li></ul>`,
        `<p>В <code>&lt;head&gt;</code> живут <b>метаданные</b> — информация для браузеров, поисковиков и соцсетей:</p>
<pre class="inline-code">&lt;title&gt;Learn Python free — Codry&lt;/title&gt;
&lt;meta name="description" content="Interactive Python lessons..."&gt;
&lt;meta property="og:title" content="Codry"&gt;
&lt;meta property="og:image" content="https://.../preview.png"&gt;
&lt;link rel="icon" href="favicon.png"&gt;</pre>
<ul><li><code>title</code> — название во вкладке и заголовок в результатах Google (до ~60 символов)</li><li><code>description</code> — описание под заголовком в поиске (~150 символов)</li><li><code>og:*</code> (Open Graph) — как выглядит ссылка в Telegram, Facebook, Viber</li><li><code>rel="icon"</code> — значок вкладки (favicon)</li><li><code>theme-color</code> — цвет строки браузера на телефоне</li></ul>`,
        `<p>The <code>&lt;head&gt;</code> holds <b>metadata</b> — info for browsers, search engines and social networks:</p>
<pre class="inline-code">&lt;title&gt;Learn Python free — Codry&lt;/title&gt;
&lt;meta name="description" content="Interactive Python lessons..."&gt;
&lt;meta property="og:title" content="Codry"&gt;
&lt;meta property="og:image" content="https://.../preview.png"&gt;
&lt;link rel="icon" href="favicon.png"&gt;</pre>
<ul><li><code>title</code> — the tab title and the Google result headline (up to ~60 chars)</li><li><code>description</code> — the snippet under it in search (~150 chars)</li><li><code>og:*</code> (Open Graph) — how links look in Telegram, Facebook, Viber</li><li><code>rel="icon"</code> — the tab icon (favicon)</li><li><code>theme-color</code> — the browser bar colour on phones</li></ul>`),
      why: L(`<p>Гарний сайт ніхто не знайде, якщо Google не розуміє, про що він. <b>SEO</b> (пошукова оптимізація) починається з правильних <code>title</code>, <code>description</code>, заголовків і <code>alt</code>. А красиве прев’ю в месенджерах суттєво збільшує кількість кліків.</p>`,
        `<p>Хороший сайт никто не найдёт, если Google не понимает, о чём он. <b>SEO</b> (поисковая оптимизация) начинается с правильных <code>title</code>, <code>description</code>, заголовков и <code>alt</code>. А красивое превью в мессенджерах заметно увеличивает количество кликов.</p>`,
        `<p>Nobody finds a great site if Google can’t tell what it’s about. <b>SEO</b> (search engine optimisation) starts with good <code>title</code>, <code>description</code>, headings and <code>alt</code>. And a nice preview in messengers noticeably boosts clicks.</p>`),
      mistakes: L(`<ul><li>Однаковий <code>title</code> на всіх сторінках сайту.</li><li>Набивати description ключовими словами через кому — пошуковики за це знижують позиції.</li></ul>`,
        `<ul><li>Одинаковый <code>title</code> на всех страницах сайта.</li><li>Набивать description ключевыми словами через запятую — поисковики за это понижают позиции.</li></ul>`,
        `<ul><li>The same <code>title</code> on every page of the site.</li><li>Stuffing the description with comma-separated keywords — search engines penalise it.</li></ul>`),
      examples: [
        { title: L('Повний head', 'Полный head', 'Full head'), code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Pizza Roma — wood-fired pizza in Lviv</title>\n  <meta name="description" content="Hand-made Neapolitan pizza baked in a wood-fired oven. Delivery across Lviv in 40 minutes.">\n  <meta name="theme-color" content="#dc2626">\n</head>\n<body><h1>Pizza Roma</h1></body>\n</html>', note: L('Конкретний title і корисний опис.', 'Конкретный title и полезное описание.', 'A specific title and a useful description.') },
        { title: 'Open Graph', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>My portfolio</title>\n  <meta property="og:title" content="Anna — web developer">\n  <meta property="og:description" content="Projects, skills and contacts">\n  <meta property="og:image" content="https://picsum.photos/1200/630">\n  <meta property="og:type" content="website">\n</head>\n<body><h1>Anna</h1></body>\n</html>', note: L('Так формується картка-прев’ю при пересиланні посилання.', 'Так формируется карточка-превью при пересылке ссылки.', 'This builds the preview card when a link is shared.') },
        { title: 'favicon', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Emoji favicon</title>\n  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">\n</head>\n<body><p>Look at the tab icon (in a real browser tab).</p></body>\n</html>', note: L('Емодзі як іконка вкладки без окремого файлу.', 'Эмодзи как иконка вкладки без отдельного файла.', 'An emoji tab icon without a separate file.') }
      ],
      task: {
        text: L('Напиши повний документ для сайту кав’ярні: <code>title</code> (непорожній), <code>meta name="description"</code> з описом довжиною від 50 символів, <code>meta property="og:title"</code>, <code>meta name="viewport"</code> і <code>h1</code> у body.', 'Напиши полный документ для сайта кофейни: <code>title</code> (непустой), <code>meta name="description"</code> с описанием длиной от 50 символов, <code>meta property="og:title"</code>, <code>meta name="viewport"</code> и <code>h1</code> в body.', 'Write a full document for a café website: a non-empty <code>title</code>, a <code>meta name="description"</code> at least 50 characters long, <code>meta property="og:title"</code>, <code>meta name="viewport"</code> and an <code>h1</code> in the body.'),
        how: [L('Почни з каркасу з кроку «Структура документа».', 'Начни с каркаса из шага «Структура документа».', 'Start from the skeleton in “Document structure”.'), L('Опис пиши для людей, а не для роботів.', 'Описание пиши для людей, а не для роботов.', 'Write the description for humans, not robots.')],
        starter: '',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Bean There — specialty coffee in Kyiv</title>\n  <meta name="description" content="Freshly roasted specialty coffee, homemade desserts and cosy armchairs in the heart of Kyiv. Open daily from 8 am.">\n  <meta property="og:title" content="Bean There café">\n</head>\n<body>\n  <h1>Bean There</h1>\n</body>\n</html>',
        hint: L('Атрибут <code>content</code> містить сам текст опису.', 'Атрибут <code>content</code> содержит сам текст описания.', 'The <code>content</code> attribute holds the description text.'),
        check: function (doc) { var d = doc.querySelector('meta[name=description]'); return !!(doc.title.trim() && d && (d.getAttribute('content') || '').length >= 50 && doc.querySelector('meta[property="og:title"]') && doc.querySelector('meta[name=viewport]') && doc.querySelector('body h1')); }
      },
      quiz: { q: L('Що показує Google під заголовком сайту в результатах пошуку?', 'Что показывает Google под заголовком сайта в результатах поиска?', 'What does Google show under a site’s title in search results?'), options: ['h1', 'meta description', 'footer'], answer: 1, explain: L('Зазвичай саме description.', 'Обычно именно description.', 'Usually the description.') },
      ref: [{ code: '<meta name="description" content>', d: L('опис для пошуку', 'описание для поиска', 'search description') }, { code: '<meta property="og:…">', d: L('прев’ю в соцмережах', 'превью в соцсетях', 'social preview') }, { code: '<link rel="icon">', d: L('іконка вкладки', 'иконка вкладки', 'tab icon') }]
    },
    {
      id: 'script-dom', chapter: CH6,
      title: L('JavaScript на сторінці: DOM', 'JavaScript на странице: DOM', 'JavaScript on the page: the DOM'),
      theory: L(
        `<p>Тег <code>&lt;script&gt;</code> підключає JavaScript, який може <b>змінювати сторінку</b>. Браузер перетворює HTML на дерево об’єктів — <b>DOM</b> (Document Object Model), і JS працює з ним:</p>
<pre class="inline-code">&lt;h1 id="title"&gt;Hello&lt;/h1&gt;
&lt;script&gt;
  const h = document.querySelector("#title");
  h.textContent = "Hello, Codry!";
  h.style.color = "royalblue";
&lt;/script&gt;</pre>
<ul><li><code>document.querySelector(css)</code> — знайти перший елемент за CSS-селектором; <code>querySelectorAll</code> — усі</li><li><code>el.textContent</code> — текст, <code>el.innerHTML</code> — HTML усередині</li><li><code>el.classList.add/remove/toggle("x")</code> — класи</li><li><code>document.createElement("li")</code> + <code>parent.append(el)</code> — створити й додати елемент</li></ul>
<p>Скрипт ставлять <b>в кінці body</b> (або з атрибутом <code>defer</code> у head), щоб HTML уже був завантажений.</p>`,
        `<p>Тег <code>&lt;script&gt;</code> подключает JavaScript, который может <b>изменять страницу</b>. Браузер превращает HTML в дерево объектов — <b>DOM</b> (Document Object Model), и JS работает с ним:</p>
<pre class="inline-code">&lt;h1 id="title"&gt;Hello&lt;/h1&gt;
&lt;script&gt;
  const h = document.querySelector("#title");
  h.textContent = "Hello, Codry!";
  h.style.color = "royalblue";
&lt;/script&gt;</pre>
<ul><li><code>document.querySelector(css)</code> — найти первый элемент по CSS-селектору; <code>querySelectorAll</code> — все</li><li><code>el.textContent</code> — текст, <code>el.innerHTML</code> — HTML внутри</li><li><code>el.classList.add/remove/toggle("x")</code> — классы</li><li><code>document.createElement("li")</code> + <code>parent.append(el)</code> — создать и добавить элемент</li></ul>
<p>Скрипт ставят <b>в конце body</b> (или с атрибутом <code>defer</code> в head), чтобы HTML уже был загружен.</p>`,
        `<p>The <code>&lt;script&gt;</code> tag adds JavaScript that can <b>change the page</b>. The browser turns HTML into a tree of objects — the <b>DOM</b> (Document Object Model) — and JS works with it:</p>
<pre class="inline-code">&lt;h1 id="title"&gt;Hello&lt;/h1&gt;
&lt;script&gt;
  const h = document.querySelector("#title");
  h.textContent = "Hello, Codry!";
  h.style.color = "royalblue";
&lt;/script&gt;</pre>
<ul><li><code>document.querySelector(css)</code> — find the first element by CSS selector; <code>querySelectorAll</code> — all of them</li><li><code>el.textContent</code> — text, <code>el.innerHTML</code> — the HTML inside</li><li><code>el.classList.add/remove/toggle("x")</code> — classes</li><li><code>document.createElement("li")</code> + <code>parent.append(el)</code> — create and add an element</li></ul>
<p>Put scripts <b>at the end of body</b> (or in head with <code>defer</code>) so the HTML has already loaded.</p>`),
      why: L(`<p>HTML — статичний, як друкована газета. DOM і JS роблять сторінку <b>живою</b>: лічильники, списки, що ростуть, фільтри, ігри. Саме так працюють Gmail, YouTube і будь-який сучасний застосунок у браузері.</p>`,
        `<p>HTML — статичный, как печатная газета. DOM и JS делают страницу <b>живой</b>: счётчики, растущие списки, фильтры, игры. Именно так работают Gmail, YouTube и любое современное приложение в браузере.</p>`,
        `<p>HTML is static, like a printed newspaper. The DOM and JS make a page <b>alive</b>: counters, growing lists, filters, games. That’s how Gmail, YouTube and every modern web app work.</p>`),
      mistakes: L(`<ul><li>Скрипт у <code>head</code> без <code>defer</code> — елементи ще не існують, <code>querySelector</code> поверне <code>null</code>.</li><li><code>innerHTML</code> з текстом від користувача — небезпечно (XSS). Для тексту використовуй <code>textContent</code>.</li></ul>`,
        `<ul><li>Скрипт в <code>head</code> без <code>defer</code> — элементы ещё не существуют, <code>querySelector</code> вернёт <code>null</code>.</li><li><code>innerHTML</code> с текстом от пользователя — опасно (XSS). Для текста используй <code>textContent</code>.</li></ul>`,
        `<ul><li>A script in <code>head</code> without <code>defer</code> — elements don’t exist yet, so <code>querySelector</code> returns <code>null</code>.</li><li><code>innerHTML</code> with user text — dangerous (XSS). Use <code>textContent</code> for text.</li></ul>`),
      examples: [
        { title: L('Зміна тексту', 'Изменение текста', 'Changing text'), code: '<h1 id="title">Hello</h1>\n<p class="info">Loading…</p>\n<script>\n  document.querySelector("#title").textContent = "Hello, Codry!";\n  const p = document.querySelector(".info");\n  p.textContent = "Page loaded at " + new Date().toLocaleTimeString();\n  p.style.color = "seagreen";\n</script>', note: L('JS змінив вміст після завантаження.', 'JS изменил содержимое после загрузки.', 'JS changed the content after loading.') },
        { title: L('Створення елементів', 'Создание элементов', 'Creating elements'), code: '<ul id="list"></ul>\n<script>\n  const list = document.querySelector("#list");\n  ["HTML", "CSS", "JavaScript"].forEach((name) => {\n    const li = document.createElement("li");\n    li.textContent = name;\n    list.append(li);\n  });\n</script>', note: L('Список побудовано з масиву.', 'Список построен из массива.', 'The list is built from an array.') },
        { title: 'classList', code: '<style>.big { font-size: 32px; color: crimson; }</style>\n<p>One</p><p>Two</p><p>Three</p>\n<script>\n  document.querySelectorAll("p").forEach((p, i) => {\n    if (i % 2 === 0) p.classList.add("big");\n  });\n</script>', note: L('Клас додано кожному другому абзацу.', 'Класс добавлен каждому второму абзацу.', 'A class added to every other paragraph.') },
        { title: 'defer', code: '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <script>\n    document.addEventListener("DOMContentLoaded", () => {\n      document.querySelector("h1").textContent = "DOM is ready!";\n    });\n  </script>\n</head>\n<body><h1>Waiting…</h1></body>\n</html>', note: L('Подія DOMContentLoaded чекає на HTML.', 'Событие DOMContentLoaded ждёт HTML.', 'DOMContentLoaded waits for the HTML.') }
      ],
      task: {
        text: L('Є порожній <code>&lt;ul id="fruits"&gt;</code> і масив у скрипті. Допиши скрипт: для кожного фрукта створи <code>&lt;li&gt;</code> з його назвою й додай у список. Потім зміни текст заголовка <code>#count</code> на <code>3 fruits</code> (кількість — через <code>.length</code>).', 'Есть пустой <code>&lt;ul id="fruits"&gt;</code> и массив в скрипте. Допиши скрипт: для каждого фрукта создай <code>&lt;li&gt;</code> с его названием и добавь в список. Затем измени текст заголовка <code>#count</code> на <code>3 fruits</code> (количество — через <code>.length</code>).', 'There’s an empty <code>&lt;ul id="fruits"&gt;</code> and an array in the script. Finish the script: for each fruit create an <code>&lt;li&gt;</code> with its name and add it to the list. Then change the <code>#count</code> heading text to <code>3 fruits</code> (count via <code>.length</code>).'),
        how: [L('<code>const li = document.createElement("li"); li.textContent = f; list.append(li);</code>', '<code>const li = document.createElement("li"); li.textContent = f; list.append(li);</code>', '<code>const li = document.createElement("li"); li.textContent = f; list.append(li);</code>'), L('<code>document.querySelector("#count").textContent = `${fruits.length} fruits`;</code>', '<code>document.querySelector("#count").textContent = `${fruits.length} fruits`;</code>', '<code>document.querySelector("#count").textContent = `${fruits.length} fruits`;</code>')],
        starter: '<h2 id="count">0 fruits</h2>\n<ul id="fruits"></ul>\n<script>\n  const fruits = ["apple", "banana", "kiwi"];\n  const list = document.querySelector("#fruits");\n  // your code\n</script>\n',
        solution: '<h2 id="count">0 fruits</h2>\n<ul id="fruits"></ul>\n<script>\n  const fruits = ["apple", "banana", "kiwi"];\n  const list = document.querySelector("#fruits");\n  fruits.forEach((f) => {\n    const li = document.createElement("li");\n    li.textContent = f;\n    list.append(li);\n  });\n  document.querySelector("#count").textContent = `${fruits.length} fruits`;\n</script>\n',
        hint: L('Цикл <code>forEach</code> по масиву <code>fruits</code>.', 'Цикл <code>forEach</code> по массиву <code>fruits</code>.', 'A <code>forEach</code> loop over <code>fruits</code>.'),
        check: function (doc) { var lis = doc.querySelectorAll('#fruits > li'); var names = Array.prototype.map.call(lis, function (l) { return l.textContent.trim(); }); return names.join(',') === 'apple,banana,kiwi' && doc.querySelector('#count').textContent.trim() === '3 fruits'; }
      },
      quiz: { q: L('Що повертає <code>document.querySelector("#x")</code>, якщо елемента немає?', 'Что возвращает <code>document.querySelector("#x")</code>, если элемента нет?', 'What does <code>document.querySelector("#x")</code> return if there’s no such element?'), options: ['undefined', 'null', L('помилку', 'ошибку', 'an error')], answer: 1, explain: L('null — «нічого не знайдено».', 'null — «ничего не найдено».', 'null means nothing was found.') },
      ref: [{ code: 'document.querySelector(sel)', d: L('знайти елемент', 'найти элемент', 'find an element') }, { code: 'el.textContent = "..."', d: L('змінити текст', 'изменить текст', 'change text') }, { code: 'document.createElement / append', d: L('створити й додати', 'создать и добавить', 'create and add') }]
    },
    {
      id: 'events', chapter: CH6,
      title: L('Події: клік, введення, відправка форми', 'События: клик, ввод, отправка формы', 'Events: click, input, submit'),
      theory: L(
        `<p><b>Подія</b> — це щось, що сталося: клік, натискання клавіші, введення тексту, відправка форми. JS «слухає» події через <code>addEventListener</code>:</p>
<pre class="inline-code">button.addEventListener("click", () => {
  count++;
  label.textContent = count;
});</pre>
<p>Популярні події: <code>click</code>, <code>input</code> (текст у полі змінився), <code>change</code>, <code>submit</code> (форма), <code>keydown</code>, <code>mouseover</code>.</p>
<p>Обробник отримує об’єкт події <code>e</code>: <code>e.target</code> — елемент, з яким сталася подія; <code>e.preventDefault()</code> — скасувати стандартну дію (наприклад, перезавантаження сторінки при відправці форми).</p>
<p>Значення поля читають через <code>input.value</code>.</p>`,
        `<p><b>Событие</b> — это что-то, что произошло: клик, нажатие клавиши, ввод текста, отправка формы. JS «слушает» события через <code>addEventListener</code>:</p>
<pre class="inline-code">button.addEventListener("click", () => {
  count++;
  label.textContent = count;
});</pre>
<p>Популярные события: <code>click</code>, <code>input</code> (текст в поле изменился), <code>change</code>, <code>submit</code> (форма), <code>keydown</code>, <code>mouseover</code>.</p>
<p>Обработчик получает объект события <code>e</code>: <code>e.target</code> — элемент, с которым произошло событие; <code>e.preventDefault()</code> — отменить стандартное действие (например, перезагрузку страницы при отправке формы).</p>
<p>Значение поля читают через <code>input.value</code>.</p>`,
        `<p>An <b>event</b> is something that happened: a click, a key press, typing, a form submit. JS listens for events with <code>addEventListener</code>:</p>
<pre class="inline-code">button.addEventListener("click", () => {
  count++;
  label.textContent = count;
});</pre>
<p>Common events: <code>click</code>, <code>input</code> (the field’s text changed), <code>change</code>, <code>submit</code> (forms), <code>keydown</code>, <code>mouseover</code>.</p>
<p>The handler receives an event object <code>e</code>: <code>e.target</code> is the element the event happened on; <code>e.preventDefault()</code> cancels the default action (e.g. the page reload on form submit).</p>
<p>Read a field’s value via <code>input.value</code>.</p>`),
      why: L(`<p>Події — міст між людиною та програмою. Без них сторінка лише показує, а з ними — відповідає: рахує, фільтрує, перевіряє, грає. <code>preventDefault</code> на формах дозволяє обробити дані в JS без перезавантаження — так працюють усі сучасні сайти.</p>`,
        `<p>События — мост между человеком и программой. Без них страница только показывает, а с ними — отвечает: считает, фильтрует, проверяет, играет. <code>preventDefault</code> на формах позволяет обработать данные в JS без перезагрузки — так работают все современные сайты.</p>`,
        `<p>Events are the bridge between people and programs. Without them a page only displays; with them it responds — counting, filtering, validating, playing. <code>preventDefault</code> on forms lets JS handle data without a reload — that’s how modern sites work.</p>`),
      mistakes: L(`<ul><li><code>addEventListener("click", update())</code> — функцію викликано одразу! Треба <code>update</code> без дужок або <code>() =&gt; update()</code>.</li><li>Забути <code>e.preventDefault()</code> у <code>submit</code> — сторінка перезавантажиться і все зникне.</li><li><code>input.value</code> — це завжди рядок; для чисел — <code>Number(...)</code>.</li></ul>`,
        `<ul><li><code>addEventListener("click", update())</code> — функция вызвана сразу! Нужно <code>update</code> без скобок или <code>() =&gt; update()</code>.</li><li>Забыть <code>e.preventDefault()</code> в <code>submit</code> — страница перезагрузится и всё исчезнет.</li><li><code>input.value</code> — это всегда строка; для чисел — <code>Number(...)</code>.</li></ul>`,
        `<ul><li><code>addEventListener("click", update())</code> — the function runs immediately! Use <code>update</code> without parentheses or <code>() =&gt; update()</code>.</li><li>Forgetting <code>e.preventDefault()</code> on <code>submit</code> — the page reloads and everything vanishes.</li><li><code>input.value</code> is always a string; use <code>Number(...)</code> for numbers.</li></ul>`),
      examples: [
        { title: L('Лічильник', 'Счётчик', 'Counter'), code: '<button id="btn">Click me</button>\n<p>Clicks: <b id="n">0</b></p>\n<script>\n  let count = 0;\n  document.querySelector("#btn").addEventListener("click", () => {\n    count++;\n    document.querySelector("#n").textContent = count;\n  });\n</script>', note: L('Поклацай кнопку в результаті.', 'Пощёлкай кнопку в результате.', 'Click the button in the result.') },
        { title: 'input', code: '<input id="name" placeholder="Your name">\n<h2 id="hello">Hello!</h2>\n<script>\n  const input = document.querySelector("#name");\n  input.addEventListener("input", () => {\n    document.querySelector("#hello").textContent = `Hello, ${input.value || "stranger"}!`;\n  });\n</script>', note: L('Текст оновлюється з кожною літерою.', 'Текст обновляется с каждой буквой.', 'The text updates with every letter.') },
        { title: 'submit', code: '<form id="f">\n  <input id="todo" placeholder="New task" required>\n  <button>Add</button>\n</form>\n<ul id="list"></ul>\n<script>\n  document.querySelector("#f").addEventListener("submit", (e) => {\n    e.preventDefault();\n    const li = document.createElement("li");\n    li.textContent = document.querySelector("#todo").value;\n    document.querySelector("#list").append(li);\n    e.target.reset();\n  });\n</script>', note: L('Міні-список справ без перезавантаження.', 'Мини-список дел без перезагрузки.', 'A mini to-do list without reloads.') },
        { title: L('Тема', 'Тема', 'Theme toggle'), code: '<style>\n  body.dark { background: #0b1020; color: #e8edfb; }\n  body { transition: background .3s; }\n</style>\n<button id="t">🌙 Toggle theme</button>\n<p>Some text</p>\n<script>\n  document.querySelector("#t").addEventListener("click", () => {\n    document.body.classList.toggle("dark");\n  });\n</script>', note: L('<code>classList.toggle</code> вмикає/вимикає клас.', '<code>classList.toggle</code> включает/выключает класс.', '<code>classList.toggle</code> switches a class on/off.') }
      ],
      task: {
        text: L('Зроби лічильник: кнопки <code>#plus</code> і <code>#minus</code> змінюють число в <code>#value</code> на ±1. Число не може стати від’ємним. Кнопка <code>#reset</code> повертає 0.', 'Сделай счётчик: кнопки <code>#plus</code> и <code>#minus</code> меняют число в <code>#value</code> на ±1. Число не может стать отрицательным. Кнопка <code>#reset</code> возвращает 0.', 'Build a counter: buttons <code>#plus</code> and <code>#minus</code> change the number in <code>#value</code> by ±1. It can’t go negative. A <code>#reset</code> button sets it back to 0.'),
        how: [L('Змінна <code>let n = 0;</code> і функція <code>render()</code>, що пише <code>n</code> у <code>#value</code>.', 'Переменная <code>let n = 0;</code> и функция <code>render()</code>, пишущая <code>n</code> в <code>#value</code>.', 'A variable <code>let n = 0;</code> and a <code>render()</code> function that writes <code>n</code> into <code>#value</code>.'), L('Для мінуса: <code>if (n &gt; 0) n--;</code>', 'Для минуса: <code>if (n &gt; 0) n--;</code>', 'For minus: <code>if (n &gt; 0) n--;</code>')],
        starter: '<button id="minus">−</button>\n<span id="value">0</span>\n<button id="plus">+</button>\n<button id="reset">Reset</button>\n<script>\n  // your code\n</script>\n',
        solution: '<button id="minus">−</button>\n<span id="value">0</span>\n<button id="plus">+</button>\n<button id="reset">Reset</button>\n<script>\n  let n = 0;\n  const out = document.querySelector("#value");\n  const render = () => { out.textContent = n; };\n  document.querySelector("#plus").addEventListener("click", () => { n++; render(); });\n  document.querySelector("#minus").addEventListener("click", () => { if (n > 0) n--; render(); });\n  document.querySelector("#reset").addEventListener("click", () => { n = 0; render(); });\n</script>\n',
        hint: L('Перевірка натисне + тричі, − п’ять разів, потім Reset.', 'Проверка нажмёт + трижды, − пять раз, затем Reset.', 'The check presses + three times, − five times, then Reset.'),
        check: function (doc) { var v = function () { return doc.querySelector('#value').textContent.trim(); }; var click = function (id, n) { for (var i = 0; i < n; i++) doc.querySelector(id).click(); }; click('#plus', 3); if (v() !== '3') return false; click('#minus', 5); if (v() !== '0') return false; click('#plus', 2); click('#reset', 1); return v() === '0'; }
      },
      quiz: { q: L('Навіщо <code>e.preventDefault()</code> в обробнику submit?', 'Зачем <code>e.preventDefault()</code> в обработчике submit?', 'Why call <code>e.preventDefault()</code> in a submit handler?'), options: [L('щоб очистити форму', 'чтобы очистить форму', 'to clear the form'), L('щоб сторінка не перезавантажилась', 'чтобы страница не перезагрузилась', 'so the page doesn’t reload'), L('щоб заблокувати кнопку', 'чтобы заблокировать кнопку', 'to disable the button')], answer: 1, explain: L('Стандартна дія форми — надіслати й перезавантажити.', 'Стандартное действие формы — отправить и перезагрузить.', 'A form’s default action is to submit and reload.') },
      ref: [{ code: 'el.addEventListener("click", fn)', d: L('слухати подію', 'слушать событие', 'listen for an event') }, { code: 'e.preventDefault() e.target', d: L('скасувати дію, джерело', 'отменить действие, источник', 'cancel default, source') }, { code: 'input.value', d: L('значення поля', 'значение поля', 'field value') }]
    },
    {
      id: 'project-profile', chapter: CH7, project: true,
      title: L('Проєкт: сторінка-візитка', 'Проект: страница-визитка', 'Project: Personal page'),
      theory: L(
        `<p>Створи власну сторінку-візитку — перший справжній сайт. Він має бути правильно структурованим і доступним.</p>
<h4>Вимоги</h4>
<ol><li><code>header</code> з <code>h1</code> (твоє ім’я або нік) і <code>nav</code> з посиланнями-якорями на розділи</li><li><code>main</code> з трьома <code>section</code>, у кожної є <code>id</code> і заголовок <code>h2</code>:<ul><li>«Про мене» — фото (<code>img</code> з <code>alt</code>) і абзац</li><li>«Навички» — список <code>ul</code> щонайменше з 3 пунктів</li><li>«Контакти» — посилання <code>mailto:</code></li></ul></li><li><code>footer</code> з <code>&amp;copy;</code></li><li>Кожне посилання в <code>nav</code> веде на існуючий <code>id</code></li></ol>
<p>Додай <code>&lt;style&gt;</code>, щоб зробити сторінку красивою, — це за бажанням.</p>`,
        `<p>Создай свою страницу-визитку — первый настоящий сайт. Он должен быть правильно структурированным и доступным.</p>
<h4>Требования</h4>
<ol><li><code>header</code> с <code>h1</code> (твоё имя или ник) и <code>nav</code> со ссылками-якорями на разделы</li><li><code>main</code> с тремя <code>section</code>, у каждой есть <code>id</code> и заголовок <code>h2</code>:<ul><li>«Обо мне» — фото (<code>img</code> с <code>alt</code>) и абзац</li><li>«Навыки» — список <code>ul</code> минимум из 3 пунктов</li><li>«Контакты» — ссылка <code>mailto:</code></li></ul></li><li><code>footer</code> с <code>&amp;copy;</code></li><li>Каждая ссылка в <code>nav</code> ведёт на существующий <code>id</code></li></ol>
<p>Добавь <code>&lt;style&gt;</code>, чтобы сделать страницу красивой, — по желанию.</p>`,
        `<p>Create your own personal page — your first real website. It must be well structured and accessible.</p>
<h4>Requirements</h4>
<ol><li>A <code>header</code> with an <code>h1</code> (your name or nickname) and a <code>nav</code> with anchor links to the sections</li><li>A <code>main</code> with three <code>section</code>s, each with an <code>id</code> and an <code>h2</code>:<ul><li>“About me” — a photo (<code>img</code> with <code>alt</code>) and a paragraph</li><li>“Skills” — a <code>ul</code> of at least 3 items</li><li>“Contacts” — a <code>mailto:</code> link</li></ul></li><li>A <code>footer</code> with <code>&amp;copy;</code></li><li>Every <code>nav</code> link points to an existing <code>id</code></li></ol>
<p>Add a <code>&lt;style&gt;</code> to make it pretty — optional.</p>`),
      why: L(`<p>Такий сайт — перша сходинка портфоліо. Його можна опублікувати безкоштовно (GitHub Pages) і додати посилання в резюме чи профіль. А ще ти перевіриш, що вмієш поєднувати все вивчене в одну структуру.</p>`,
        `<p>Такой сайт — первая ступенька портфолио. Его можно опубликовать бесплатно (GitHub Pages) и добавить ссылку в резюме или профиль. А ещё ты проверишь, что умеешь объединять всё изученное в одну структуру.</p>`,
        `<p>A site like this is the first step of a portfolio. You can publish it free (GitHub Pages) and link it in a CV or profile. It also proves you can combine everything you’ve learned into one structure.</p>`),
      mistakes: L(`<ul><li>Якір <code>href="#skils"</code> з опечаткою — посилання нікуди не веде.</li><li>Фото без <code>alt</code>.</li></ul>`,
        `<ul><li>Якорь <code>href="#skils"</code> с опечаткой — ссылка никуда не ведёт.</li><li>Фото без <code>alt</code>.</li></ul>`,
        `<ul><li>An anchor like <code>href="#skils"</code> with a typo leads nowhere.</li><li>A photo without <code>alt</code>.</li></ul>`),
      examples: [
        { title: L('Шапка з меню', 'Шапка с меню', 'Header with menu'), code: '<header>\n  <h1>Ira Koval</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#skills">Skills</a>\n    <a href="#contacts">Contacts</a>\n  </nav>\n</header>', note: L('Посилання ведуть на id розділів.', 'Ссылки ведут на id разделов.', 'Links point to section ids.') },
        { title: L('Розділ «Про мене»', 'Раздел «Обо мне»', '“About me” section'), code: '<section id="about">\n  <h2>About me</h2>\n  <img src="https://picsum.photos/id/64/160/160" alt="Portrait of Ira smiling" width="160">\n  <p>I am 14, I love drawing and building websites.</p>\n</section>', note: L('Фото з описом і короткий текст.', 'Фото с описанием и короткий текст.', 'A described photo and a short text.') },
        { title: L('Стилі', 'Стили', 'Styling'), code: '<style>\n  body { font-family: system-ui; max-width: 640px; margin: auto; }\n  header { text-align: center; }\n  nav a { margin: 0 8px; }\n  section { padding: 16px; border-radius: 12px; background: #f1f5ff; margin: 12px 0; }\n</style>\n<header><h1>Styled</h1><nav><a href="#a">A</a></nav></header>\n<section id="a"><h2>Section</h2></section>', note: L('Кілька рядків CSS — і сторінка охайна.', 'Несколько строк CSS — и страница аккуратная.', 'A few lines of CSS make the page tidy.') }
      ],
      task: {
        text: L('Створи сторінку-візитку за вимогами з теорії.', 'Создай страницу-визитку по требованиям из теории.', 'Build the personal page according to the requirements in the theory.'),
        how: [L('Почни з каркасу header → main → footer.', 'Начни с каркаса header → main → footer.', 'Start with the header → main → footer skeleton.'), L('Додай три section з id та h2.', 'Добавь три section с id и h2.', 'Add three sections with ids and h2s.'), L('Перевір, що кожне посилання в nav відповідає id.', 'Проверь, что каждая ссылка в nav соответствует id.', 'Check that each nav link matches an id.')],
        starter: '\n',
        solution: '<header>\n  <h1>Alex</h1>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#skills">Skills</a>\n    <a href="#contacts">Contacts</a>\n  </nav>\n</header>\n<main>\n  <section id="about">\n    <h2>About me</h2>\n    <img src="https://picsum.photos/id/1005/160/160" alt="Portrait of Alex" width="160">\n    <p>I learn web development on Codry.</p>\n  </section>\n  <section id="skills">\n    <h2>Skills</h2>\n    <ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>\n  </section>\n  <section id="contacts">\n    <h2>Contacts</h2>\n    <a href="mailto:alex@example.com">alex@example.com</a>\n  </section>\n</main>\n<footer>&copy; 2026 Alex</footer>',
        hint: L('Найчастіша помилка — невідповідність <code>href="#..."</code> і <code>id</code>.', 'Самая частая ошибка — несоответствие <code>href="#..."</code> и <code>id</code>.', 'The most common mistake is a mismatch between <code>href="#..."</code> and the <code>id</code>.'),
        check: function (doc) {
          var h = doc.querySelector('header'); if (!h || !h.querySelector('h1')) return false;
          var links = h.querySelectorAll('nav a[href^="#"]'); if (links.length < 3) return false;
          for (var i = 0; i < links.length; i++) { var id = links[i].getAttribute('href').slice(1); if (!id || !doc.getElementById(id)) return false; }
          var secs = doc.querySelectorAll('main section[id]'); if (secs.length < 3) return false;
          for (var j = 0; j < secs.length; j++) if (!secs[j].querySelector('h2')) return false;
          var img = doc.querySelector('main img'); if (!img || !(img.getAttribute('alt') || '').trim()) return false;
          var ul = doc.querySelector('main ul'); if (!ul || ul.querySelectorAll('li').length < 3) return false;
          if (!doc.querySelector('main a[href^="mailto:"]')) return false;
          var f = doc.querySelector('footer'); return !!f && f.textContent.indexOf('©') > -1;
        }
      },
      quiz: { q: L('Що потрібно, щоб посилання <code>#skills</code> працювало?', 'Что нужно, чтобы ссылка <code>#skills</code> работала?', 'What does the <code>#skills</code> link need to work?'), options: [L('файл skills.html', 'файл skills.html', 'a skills.html file'), L('елемент з id="skills"', 'элемент с id="skills"', 'an element with id="skills"'), L('клас skills', 'класс skills', 'a skills class')], answer: 1, explain: L('Якір шукає id на сторінці.', 'Якорь ищет id на странице.', 'An anchor looks for an id on the page.') },
      ref: [{ code: 'nav a[href="#id"] → section#id', d: L('меню з якорями', 'меню с якорями', 'anchor menu') }]
    },
    {
      id: 'project-quiz', chapter: CH7, project: true,
      title: L('Проєкт: інтерактивна вікторина', 'Проект: интерактивная викторина', 'Project: Interactive quiz'),
      theory: L(
        `<p>Фінальний проєкт курсу — вікторина, що поєднує HTML-форму та JavaScript.</p>
<h4>Вимоги</h4>
<ol><li>Форма <code>#quiz</code> з трьома питаннями. Кожне питання — <code>fieldset</code> з <code>legend</code> і радіокнопками (одне <code>name</code> на питання). Правильна відповідь має <code>value="right"</code>, неправильні — будь-які інші значення.</li><li>Кнопка надсилання форми.</li><li>При <code>submit</code>: скасуй перезавантаження, порахуй кількість правильних відповідей і виведи в <code>&lt;p id="result"&gt;</code> текст <code>Score: N/3</code>.</li></ol>
<p>Підказка: обрану радіокнопку питання знаходять селектором <code>input[name="q1"]:checked</code>.</p>`,
        `<p>Финальный проект курса — викторина, объединяющая HTML-форму и JavaScript.</p>
<h4>Требования</h4>
<ol><li>Форма <code>#quiz</code> с тремя вопросами. Каждый вопрос — <code>fieldset</code> с <code>legend</code> и радиокнопками (одно <code>name</code> на вопрос). Правильный ответ имеет <code>value="right"</code>, неправильные — любые другие значения.</li><li>Кнопка отправки формы.</li><li>При <code>submit</code>: отмени перезагрузку, посчитай количество правильных ответов и выведи в <code>&lt;p id="result"&gt;</code> текст <code>Score: N/3</code>.</li></ol>
<p>Подсказка: выбранную радиокнопку вопроса находят селектором <code>input[name="q1"]:checked</code>.</p>`,
        `<p>The course’s final project is a quiz combining an HTML form and JavaScript.</p>
<h4>Requirements</h4>
<ol><li>A form <code>#quiz</code> with three questions. Each question is a <code>fieldset</code> with a <code>legend</code> and radio buttons (one <code>name</code> per question). The correct answer has <code>value="right"</code>, wrong ones any other value.</li><li>A submit button.</li><li>On <code>submit</code>: prevent the reload, count the correct answers and show <code>Score: N/3</code> in <code>&lt;p id="result"&gt;</code>.</li></ol>
<p>Hint: find a question’s selected radio with <code>input[name="q1"]:checked</code>.</p>`),
      why: L(`<p>Форми + події + DOM — основа будь-якого інтерактивного сайту: тести, опитування, калькулятори, кошики. Цей проєкт показує повний цикл: розмітка → дії користувача → обробка → результат на сторінці.</p>`,
        `<p>Формы + события + DOM — основа любого интерактивного сайта: тесты, опросы, калькуляторы, корзины. Этот проект показывает полный цикл: разметка → действия пользователя → обработка → результат на странице.</p>`,
        `<p>Forms + events + DOM are the foundation of every interactive site: tests, polls, calculators, carts. This project shows the full cycle: markup → user action → processing → result on the page.</p>`),
      mistakes: L(`<ul><li>Різні <code>name</code> у радіокнопок одного питання — можна обрати кілька відповідей.</li><li>Не перевірити, що відповідь узагалі обрана (<code>:checked</code> може повернути <code>null</code>).</li></ul>`,
        `<ul><li>Разные <code>name</code> у радиокнопок одного вопроса — можно выбрать несколько ответов.</li><li>Не проверить, что ответ вообще выбран (<code>:checked</code> может вернуть <code>null</code>).</li></ul>`,
        `<ul><li>Different <code>name</code>s on one question’s radios — several answers can be picked.</li><li>Not checking that an answer was chosen at all (<code>:checked</code> can return <code>null</code>).</li></ul>`),
      examples: [
        { title: L('Питання', 'Вопрос', 'Question'), code: '<fieldset>\n  <legend>Which tag makes a link?</legend>\n  <label><input type="radio" name="q1" value="right"> &lt;a&gt;</label>\n  <label><input type="radio" name="q1" value="no"> &lt;link&gt;</label>\n  <label><input type="radio" name="q1" value="no"> &lt;href&gt;</label>\n</fieldset>', note: L('Одне name — одна група.', 'Одно name — одна группа.', 'One name, one group.') },
        { title: ':checked', code: '<label><input type="radio" name="c" value="red" checked> Red</label>\n<label><input type="radio" name="c" value="blue"> Blue</label>\n<button id="b" type="button">Which?</button>\n<p id="o"></p>\n<script>\n  document.querySelector("#b").addEventListener("click", () => {\n    const sel = document.querySelector(\'input[name="c"]:checked\');\n    document.querySelector("#o").textContent = sel ? sel.value : "nothing";\n  });\n</script>', note: L('Знаходимо обрану радіокнопку.', 'Находим выбранную радиокнопку.', 'Finding the selected radio.') },
        { title: L('Підрахунок', 'Подсчёт', 'Counting'), code: '<form id="f">\n  <input type="checkbox" class="x" checked> A\n  <input type="checkbox" class="x"> B\n  <input type="checkbox" class="x" checked> C\n  <button>Count</button>\n</form>\n<p id="r"></p>\n<script>\n  document.querySelector("#f").addEventListener("submit", (e) => {\n    e.preventDefault();\n    const n = document.querySelectorAll(".x:checked").length;\n    document.querySelector("#r").textContent = `Checked: ${n}`;\n  });\n</script>', note: L('Той самий принцип для вікторини.', 'Тот же принцип для викторины.', 'The same principle as the quiz.') }
      ],
      task: {
        text: L('Створи вікторину за вимогами з теорії. Перевірка обере правильні відповіді в питаннях 1 і 3 та неправильну в 2, а потім відправить форму — має з’явитися <code>Score: 2/3</code>.', 'Создай викторину по требованиям из теории. Проверка выберет правильные ответы в вопросах 1 и 3 и неправильный во 2, а затем отправит форму — должно появиться <code>Score: 2/3</code>.', 'Build the quiz as described. The check picks the correct answers for questions 1 and 3 and a wrong one for 2, then submits — <code>Score: 2/3</code> should appear.'),
        how: [L('Імена груп: <code>q1</code>, <code>q2</code>, <code>q3</code>.', 'Имена групп: <code>q1</code>, <code>q2</code>, <code>q3</code>.', 'Group names: <code>q1</code>, <code>q2</code>, <code>q3</code>.'), L('У обробнику: цикл по <code>["q1","q2","q3"]</code>, рахуй <code>:checked</code> з <code>value === "right"</code>.', 'В обработчике: цикл по <code>["q1","q2","q3"]</code>, считай <code>:checked</code> с <code>value === "right"</code>.', 'In the handler: loop over <code>["q1","q2","q3"]</code>, count <code>:checked</code> with <code>value === "right"</code>.')],
        starter: '<form id="quiz">\n  \n  <button>Check</button>\n</form>\n<p id="result"></p>\n<script>\n  // your code\n</script>\n',
        solution: '<form id="quiz">\n  <fieldset>\n    <legend>1. Which tag makes a link?</legend>\n    <label><input type="radio" name="q1" value="right"> &lt;a&gt;</label>\n    <label><input type="radio" name="q1" value="no"> &lt;link&gt;</label>\n  </fieldset>\n  <fieldset>\n    <legend>2. Which tag is the main heading?</legend>\n    <label><input type="radio" name="q2" value="right"> &lt;h1&gt;</label>\n    <label><input type="radio" name="q2" value="no"> &lt;head&gt;</label>\n  </fieldset>\n  <fieldset>\n    <legend>3. Which attribute describes an image?</legend>\n    <label><input type="radio" name="q3" value="right"> alt</label>\n    <label><input type="radio" name="q3" value="no"> src</label>\n  </fieldset>\n  <button>Check</button>\n</form>\n<p id="result"></p>\n<script>\n  document.querySelector("#quiz").addEventListener("submit", (e) => {\n    e.preventDefault();\n    let score = 0;\n    ["q1", "q2", "q3"].forEach((q) => {\n      const sel = document.querySelector(`input[name="${q}"]:checked`);\n      if (sel && sel.value === "right") score++;\n    });\n    document.querySelector("#result").textContent = `Score: ${score}/3`;\n  });\n</script>\n',
        hint: L('Не забудь <code>e.preventDefault()</code>, інакше результат зникне.', 'Не забудь <code>e.preventDefault()</code>, иначе результат исчезнет.', 'Don’t forget <code>e.preventDefault()</code>, or the result will vanish.'),
        check: function (doc) {
          var f = doc.querySelector('form#quiz'); if (!f) return false;
          if (f.querySelectorAll('fieldset legend').length < 3) return false;
          var pick = function (q, right) { var list = f.querySelectorAll('input[type=radio][name="' + q + '"]'); for (var i = 0; i < list.length; i++) { if ((list[i].value === 'right') === right) { list[i].checked = true; return true; } } return false; };
          if (!pick('q1', true) || !pick('q2', false) || !pick('q3', true)) return false;
          f.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          var r = doc.querySelector('#result'); return !!r && r.textContent.trim() === 'Score: 2/3';
        }
      },
      quiz: { q: L('Який селектор знаходить обрану радіокнопку групи q1?', 'Какой селектор находит выбранную радиокнопку группы q1?', 'Which selector finds the selected radio of group q1?'), options: ['input[name="q1"]', 'input[name="q1"]:checked', '#q1:selected'], answer: 1, explain: L(':checked — лише обрані.', ':checked — только выбранные.', ':checked matches only selected ones.') },
      ref: [{ code: 'input[name="x"]:checked', d: L('обрана радіокнопка', 'выбранная радиокнопка', 'selected radio') }]
    }
  ]);
})();
