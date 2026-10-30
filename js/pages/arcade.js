// Сторінка «Ігри»: Робот (рівні з алгоритмами), Черепашка (малювання кодом), Змійка (свій штучний інтелект).
(function () {
  'use strict';
  const C = window.Codry, S = C.state, G = C.game, fx = C.fx, tr = C.tr, esc = C.esc;
  const T = (uk, ru, en) => tr({ uk, ru, en });
  const L = (uk, ru, en) => ({ uk, ru, en });
  const A = () => window.CodryArcade;

  // ---------- Рівні ----------
  const ROBOT = [
    { maps: [['>..G']], par: 3, title: L('Перші кроки', 'Первые шаги', 'First steps'),
      text: L('Доведи робота до прапорця. Команда <code>move()</code> — крок уперед.', 'Доведи робота до флажка. Команда <code>move()</code> — шаг вперёд.', 'Get the robot to the flag. <code>move()</code> steps forward.'),
      sol: 'move();\nmove();\nmove();' },
    { maps: [['>..#', '##.#', '##.G']], par: 7, title: L('Поворот', 'Поворот', 'Turning'),
      text: L('<code>turnRight()</code> і <code>turnLeft()</code> повертають робота на місці.', '<code>turnRight()</code> и <code>turnLeft()</code> поворачивают робота на месте.', '<code>turnRight()</code> and <code>turnLeft()</code> turn on the spot.'),
      sol: 'move();\nmove();\nturnRight();\nmove();\nmove();\nturnLeft();\nmove();' },
    { maps: [['>.*.G']], par: 5, title: L('Кристал', 'Кристалл', 'Crystal'),
      text: L('Збери кристал: стань на нього й виклич <code>pickUp()</code>. Рівень пройдено, коли зібрано все.', 'Собери кристалл: встань на него и вызови <code>pickUp()</code>. Уровень пройден, когда собрано всё.', 'Collect the crystal: stand on it and call <code>pickUp()</code>. The level needs every crystal.'),
      sol: 'move();\nmove();\npickUp();\nmove();\nmove();' },
    { maps: [['>.........G']], par: 2, title: L('Довгий коридор', 'Длинный коридор', 'Long corridor'),
      text: L('Десять кроків поспіль? Не пиши <code>move()</code> десять разів — використай цикл <code>for</code>. На 3 зірки — 2 рядки коду.', 'Десять шагов подряд? Не пиши <code>move()</code> десять раз — используй цикл <code>for</code>. На 3 звезды — 2 строки кода.', 'Ten steps in a row? Don’t write <code>move()</code> ten times — use a <code>for</code> loop. 2 lines for 3 stars.'),
      sol: 'for (let i = 0; i < 10; i++) move();' },
    { maps: [['>.####', '#..###', '##..##', '###..#', '####.G']], par: 7, title: L('Сходи', 'Лестница', 'Stairs'),
      text: L('Сходинки повторюються: знайди, які команди складають одну сходинку, і повтори їх у циклі.', 'Ступеньки повторяются: найди, какие команды составляют одну ступеньку, и повтори их в цикле.', 'The steps repeat: find the commands for one step and loop them.'),
      sol: 'move();\nfor (let i = 0; i < 4; i++) {\n  turnRight();\n  move();\n  turnLeft();\n  move();\n}' },
    { maps: [['>....', '####G'], ['>.......', '#######G']], par: 3, title: L('Поки не стіна', 'Пока не стена', 'Until the wall'),
      text: L('Тепер <b>дві карти</b> різної довжини — один код має пройти обидві. <code>wallAhead()</code> каже, чи попереду стіна. Спробуй <code>while (!wallAhead())</code>.', 'Теперь <b>две карты</b> разной длины — один код должен пройти обе. <code>wallAhead()</code> говорит, есть ли впереди стена. Попробуй <code>while (!wallAhead())</code>.', 'Now there are <b>two maps</b> of different length — one program must solve both. <code>wallAhead()</code> tells you if a wall is ahead. Try <code>while (!wallAhead())</code>.'),
      sol: 'while (!wallAhead()) move();\nturnRight();\nmove();' },
    { maps: [['>.*..*.*G'], ['>*.*.**..G']], par: 4, title: L('Збирач', 'Собиратель', 'Collector'),
      text: L('Кристали лежать по-різному. <code>gemHere()</code> — чи є кристал під роботом, <code>atGoal()</code> — чи дійшли до прапорця.', 'Кристаллы лежат по-разному. <code>gemHere()</code> — есть ли кристалл под роботом, <code>atGoal()</code> — дошли ли до флажка.', 'Crystals are placed differently. <code>gemHere()</code> — is there a crystal here, <code>atGoal()</code> — are we at the flag.'),
      sol: 'while (!atGoal()) {\n  move();\n  if (gemHere()) pickUp();\n}' },
    { maps: [['>.####', '#..###', '##..##', '###..#', '####.G'], ['>.##', '#..#', '##.G']], par: 7, title: L('Сходи будь-якої висоти', 'Лестница любой высоты', 'Stairs of any height'),
      text: L('Дві драбини різної висоти. Замість <code>for</code> з числом використай <code>while (!atGoal())</code>.', 'Две лестницы разной высоты. Вместо <code>for</code> с числом используй <code>while (!atGoal())</code>.', 'Two staircases of different height. Use <code>while (!atGoal())</code> instead of a counted <code>for</code>.'),
      sol: 'move();\nwhile (!atGoal()) {\n  turnRight();\n  move();\n  turnLeft();\n  move();\n}' },
    { maps: [['>.#...#', '#.#.#.#', '#...#..', '#####.#', 'G.....#'], ['>...#.G', '###.#.#', '#...#.#', '#.###.#', '#.....#']], par: 10, title: L('Лабіринт', 'Лабиринт', 'Maze'),
      text: L('Правило правої руки: якщо праворуч вільно — повернись праворуч і йди; інакше, якщо вільно попереду — йди; інакше повернись ліворуч. Є <code>wallRight()</code> і <code>wallLeft()</code>.', 'Правило правой руки: если справа свободно — повернись направо и иди; иначе, если свободно впереди — иди; иначе повернись налево. Есть <code>wallRight()</code> и <code>wallLeft()</code>.', 'The right-hand rule: if the right is free, turn right and go; else if ahead is free, go; else turn left. You have <code>wallRight()</code> and <code>wallLeft()</code>.'),
      sol: 'while (!atGoal()) {\n  if (!wallRight()) {\n    turnRight();\n    move();\n  } else if (!wallAhead()) {\n    move();\n  } else {\n    turnLeft();\n  }\n}' },
    { maps: [['>*.*', '*..*', '.**.', 'G..*']], par: 11, title: L('Прибирання поля', 'Уборка поля', 'Field sweep'),
      text: L('Обійди все поле «змійкою» й збери всі кристали. Створи свою функцію, наприклад <code>function row() { … }</code>, щоб не повторюватись.', 'Обойди всё поле «змейкой» и собери все кристаллы. Создай свою функцию, например <code>function row() { … }</code>, чтобы не повторяться.', 'Sweep the whole field in a zigzag and collect every crystal. Write your own function like <code>function row() { … }</code> to avoid repeating yourself.'),
      sol: 'function step() {\n  move();\n  if (gemHere()) pickUp();\n}\nfunction row() {\n  for (let i = 0; i < 3; i++) step();\n}\nrow(); turnRight(); step(); turnRight();\nrow(); turnLeft(); step(); turnLeft();\nrow(); turnRight(); step(); turnRight();\nrow();' }
  ];
  const TURTLE = [
    { title: L('Лінія', 'Линия', 'Line'), text: L('Черепашка дивиться праворуч. <code>forward(150)</code> — пройти 150 кроків, залишаючи слід.', 'Черепашка смотрит вправо. <code>forward(150)</code> — пройти 150 шагов, оставляя след.', 'The turtle faces right. <code>forward(150)</code> walks 150 steps leaving a trail.'), ref: 'forward(150);' },
    { title: L('Квадрат', 'Квадрат', 'Square'), text: L('Сторона 120. <code>right(90)</code> — поворот на 90°. Спробуй цикл!', 'Сторона 120. <code>right(90)</code> — поворот на 90°. Попробуй цикл!', 'Side 120. <code>right(90)</code> turns 90°. Try a loop!'), ref: 'for (let i = 0; i < 4; i++) {\n  forward(120);\n  right(90);\n}' },
    { title: L('Трикутник', 'Треугольник', 'Triangle'), text: L('Сторона 150. На скільки градусів повертати? Підказка: 360 / 3.', 'Сторона 150. На сколько градусов поворачивать? Подсказка: 360 / 3.', 'Side 150. How many degrees to turn? Hint: 360 / 3.'), ref: 'for (let i = 0; i < 3; i++) {\n  forward(150);\n  right(120);\n}' },
    { title: L('Шестикутник', 'Шестиугольник', 'Hexagon'), text: L('Шість сторін по 80. Кут — 360 / 6.', 'Шесть сторон по 80. Угол — 360 / 6.', 'Six sides of 80. The angle is 360 / 6.'), ref: 'for (let i = 0; i < 6; i++) {\n  forward(80);\n  right(60);\n}' },
    { title: L('Зірка', 'Звезда', 'Star'), text: L('П’ять променів довжиною 160. Секрет зірки — поворот на 144°.', 'Пять лучей длиной 160. Секрет звезды — поворот на 144°.', 'Five lines of 160. The star’s secret is a 144° turn.'), ref: 'for (let i = 0; i < 5; i++) {\n  forward(160);\n  right(144);\n}' },
    { title: L('Сходинки', 'Ступеньки', 'Stairs'), text: L('Чотири сходинки вгору: 40 вперед, ліворуч, 40 вперед, праворуч.', 'Четыре ступеньки вверх: 40 вперёд, налево, 40 вперёд, направо.', 'Four steps up: 40 forward, left, 40 forward, right.'), ref: 'for (let i = 0; i < 4; i++) {\n  forward(40);\n  left(90);\n  forward(40);\n  right(90);\n}' },
    { title: L('Спіраль', 'Спираль', 'Spiral'), text: L('30 відрізків, кожен довший за попередній на 6, після кожного — поворот праворуч на 90°.', '30 отрезков, каждый длиннее предыдущего на 6, после каждого — поворот направо на 90°.', '30 segments, each 6 longer than the last, turning right 90° after each.'), ref: 'for (let i = 1; i <= 30; i++) {\n  forward(i * 6);\n  right(90);\n}' },
    { title: L('Квітка', 'Цветок', 'Flower'), text: L('12 квадратів зі стороною 70, після кожного квадрата — поворот на 30°. Цикл у циклі!', '12 квадратов со стороной 70, после каждого квадрата — поворот на 30°. Цикл в цикле!', '12 squares of side 70, turning 30° after each square. A loop inside a loop!'), ref: 'for (let k = 0; k < 12; k++) {\n  for (let i = 0; i < 4; i++) {\n    forward(70);\n    right(90);\n  }\n  right(30);\n}' }
  ];
  const SNAKE_STARS = [5, 15, 30];
  const SNAKE_START = () => T(`// Функція move отримує стан гри й повертає напрямок:
// 'up', 'down', 'left' або 'right'.
// s.head — голова {x, y}, s.food — їжа {x, y}, s.body — уся змійка,
// s.dir — поточний напрямок, s.width × s.height — розмір поля (20 × 15).`, `// Функция move получает состояние игры и возвращает направление:
// 'up', 'down', 'left' или 'right'.
// s.head — голова {x, y}, s.food — еда {x, y}, s.body — вся змейка,
// s.dir — текущее направление, s.width × s.height — размер поля (20 × 15).`, `// move receives the game state and returns a direction:
// 'up', 'down', 'left' or 'right'.
// s.head — head {x, y}, s.food — food {x, y}, s.body — the whole snake,
// s.dir — current direction, s.width × s.height — board size (20 × 15).`) + `
function move(s) {
  if (s.food.x > s.head.x) return 'right';
  if (s.food.x < s.head.x) return 'left';
  if (s.food.y > s.head.y) return 'down';
  return 'up';
}`;

  // ---------- Збереження прогресу ----------
  const arc = () => { S.arcade = S.arcade || { robot: {}, turtle: {}, snake: 0 }; return S.arcade; };
  function reward(kind, id, stars) {
    const store = arc()[kind];
    const old = store[id] || 0;
    if (stars <= old) return 0;
    store[id] = stars;
    const gain = stars - old;
    G.addXP(10 * gain);
    G.addGems(5 * gain);
    C.save();
    return gain;
  }
  const starsHTML = (n, max) => Array.from({ length: max || 3 }, (_, i) => `<span class="${i < n ? 'on' : ''}">${C.icon('star', 18)}</span>`).join('');
  const codeLines = (code) => code.split('\n').filter((l) => l.trim() && !l.trim().startsWith('//')).length;
  const ERR = {
    WALL: L('Бум! Робот врізався в стіну.', 'Бум! Робот врезался в стену.', 'Bump! The robot hit a wall.'),
    NOGEM: L('Тут немає кристала — pickUp() не спрацював.', 'Здесь нет кристалла — pickUp() не сработал.', 'No crystal here — pickUp() failed.'),
    LIMIT: L('Забагато команд — схоже на нескінченний цикл.', 'Слишком много команд — похоже на бесконечный цикл.', 'Too many commands — looks like an infinite loop.'),
    TIMEOUT: L('Програма працює занадто довго — мабуть, нескінченний цикл.', 'Программа работает слишком долго — наверное, бесконечный цикл.', 'The program runs too long — probably an infinite loop.'),
    NOFN: L('Не знайдено функцію move(s).', 'Не найдена функция move(s).', 'No move(s) function found.')
  };
  const errText = (e) => (ERR[e] ? tr(ERR[e]) : e);

  // ================= Хаб =================
  C.pages.arcade = (game, n) => {
    if (game === 'robot') return robotPage(+n || 1);
    if (game === 'turtle') return turtlePage(n == null ? 1 : +n);
    if (game === 'snake') return snakePage();
    const a = arc();
    const rStars = Object.values(a.robot).reduce((x, y) => x + y, 0), tStars = Object.values(a.turtle).reduce((x, y) => x + y, 0);
    const card = (href, cls, art, title, desc, stat, i) => `<a class="card game-card ${cls}" href="${href}" data-reveal="${i * 80}"><div class="gc-art">${art}</div><div><h2>${title}</h2><p class="muted">${desc}</p><div class="gc-stat">${stat}</div></div></a>`;
    C.app.innerHTML = `<div class="page">
      <div class="tc-hero" data-reveal><div>${C.mascot({ size: 110, mood: 'excited', anim: 'jump' })}</div>
        <div><h1 class="page-title">${C.icon('puzzle', 30)} ${T('Ігри з кодом', 'Игры с кодом', 'Code games')}</h1>
        <p class="section-sub left">${T('Керуй роботом, малюй черепашкою й напиши розум для змійки. Код — на JavaScript, а кожна зірка дає XP і кристали.', 'Управляй роботом, рисуй черепашкой и напиши разум для змейки. Код — на JavaScript, а каждая звезда даёт XP и кристаллы.', 'Drive a robot, draw with a turtle and write a brain for a snake. Code in JavaScript; every star earns XP and gems.')}</p></div></div>
      <div class="game-grid">
        ${card('#/arcade/robot/' + Math.min(ROBOT.length, Object.keys(a.robot).length + 1), 'robot', robotSVG(90), T('Робот', 'Робот', 'Robot'), T('Проведи робота лабіринтами: команди, цикли, умови й алгоритми.', 'Проведи робота по лабиринтам: команды, циклы, условия и алгоритмы.', 'Guide a robot through mazes: commands, loops, conditions, algorithms.'), `${starsHTML(Math.round(rStars / ROBOT.length), 3)} <b>${rStars}/${ROBOT.length * 3}</b>`, 0)}
        ${card('#/arcade/turtle/1', 'turtle', turtleSVG(90), T('Черепашка', 'Черепашка', 'Turtle'), T('Малюй фігури кодом: квадрати, зірки, спіралі, квіти — і вільне малювання.', 'Рисуй фигуры кодом: квадраты, звёзды, спирали, цветы — и свободное рисование.', 'Draw shapes with code: squares, stars, spirals, flowers — plus free drawing.'), `${starsHTML(Math.round(tStars / TURTLE.length), 3)} <b>${tStars}/${TURTLE.length * 3}</b>`, 1)}
        ${card('#/arcade/snake', 'snake', snakeSVG(90), T('Змійка-бот', 'Змейка-бот', 'Snake bot'), T('Напиши функцію, яка сама керує змійкою. Скільки яблук вона з’їсть?', 'Напиши функцию, которая сама управляет змейкой. Сколько яблок она съест?', 'Write a function that steers the snake. How many apples can it eat?'), `${T('Рекорд', 'Рекорд', 'Best')}: <b>${a.snake || 0}</b> 🍎`, 2)}
      </div>
    </div>${C.footer()}`;
  };

  // ---------- Картинки ----------
  function robotSVG(size) {
    return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true"><line x1="32" y1="6" x2="32" y2="14" stroke="#0b1020" stroke-width="3"/><circle cx="32" cy="6" r="4" fill="#facc15" stroke="#0b1020" stroke-width="2.5"/>
      <rect x="10" y="14" width="44" height="36" rx="12" fill="#60a5fa" stroke="#0b1020" stroke-width="3.5"/><rect x="17" y="22" width="30" height="16" rx="7" fill="#0b1020"/>
      <circle cx="26" cy="30" r="4" fill="#5eead4"/><circle cx="38" cy="30" r="4" fill="#5eead4"/><rect x="16" y="50" width="10" height="8" rx="3" fill="#334155" stroke="#0b1020" stroke-width="3"/><rect x="38" y="50" width="10" height="8" rx="3" fill="#334155" stroke="#0b1020" stroke-width="3"/>
      <path d="M54 32h6" stroke="#0b1020" stroke-width="4" stroke-linecap="round"/></svg>`;
  }
  function turtleSVG(size) {
    return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true"><circle cx="52" cy="32" r="8" fill="#86efac" stroke="#0b1020" stroke-width="3"/><circle cx="55" cy="29" r="1.8" fill="#0b1020"/>
      <ellipse cx="14" cy="16" rx="6" ry="5" fill="#86efac" stroke="#0b1020" stroke-width="3"/><ellipse cx="14" cy="48" rx="6" ry="5" fill="#86efac" stroke="#0b1020" stroke-width="3"/><ellipse cx="40" cy="14" rx="6" ry="5" fill="#86efac" stroke="#0b1020" stroke-width="3"/><ellipse cx="40" cy="50" rx="6" ry="5" fill="#86efac" stroke="#0b1020" stroke-width="3"/>
      <ellipse cx="27" cy="32" rx="19" ry="16" fill="#16a34a" stroke="#0b1020" stroke-width="3.5"/><path d="M27 18v28M12 32h30M17 22l20 20M37 22 17 42" stroke="#065f46" stroke-width="2.5"/></svg>`;
  }
  function snakeSVG(size) {
    return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true"><path d="M8 50c10 0 10-14 20-14s10 14 20 14 8-14 8-22" fill="none" stroke="#0b1020" stroke-width="13" stroke-linecap="round"/><path d="M8 50c10 0 10-14 20-14s10 14 20 14 8-14 8-22" fill="none" stroke="#a3e635" stroke-width="8" stroke-linecap="round"/>
      <circle cx="56" cy="22" r="8" fill="#a3e635" stroke="#0b1020" stroke-width="3"/><circle cx="58" cy="20" r="2" fill="#0b1020"/><circle cx="16" cy="14" r="7" fill="#ef4444" stroke="#0b1020" stroke-width="3"/><path d="M16 7c1-3 4-4 6-3" stroke="#16a34a" stroke-width="3" fill="none"/></svg>`;
  }

  // ---------- Спільний каркас сторінки гри ----------
  function shell(o) {
    C.app.innerHTML = `<div class="page game-page">
      <a class="back" href="#/arcade">← ${T('Усі ігри', 'Все игры', 'All games')}</a>
      ${o.levels || ''}
      <div class="game-layout">
        <div class="game-side">
          <div class="card"><h1 class="game-title">${o.title}</h1><div class="task-text">${o.text}</div>
            ${o.api ? `<details class="api-box"><summary>${C.icon('book', 15)} ${T('Команди', 'Команды', 'Commands')}</summary>${o.api}</details>` : ''}</div>
          <div class="workspace solo"><div class="ws-bar"><span class="file-tab">game.js</span>
            <div class="ws-actions"><button class="btn ghost sm" id="gSol" hidden>${C.icon('bulb', 15)} <span>${T('Розв’язок', 'Решение', 'Solution')}</span></button><button class="btn ghost sm" id="gReset">${C.icon('reset', 15)} <span>${T('Скинути', 'Сбросить', 'Reset')}</span></button><button class="btn primary sm" id="gRun">${C.icon('play', 15)} <span>${T('Запустити', 'Запустить', 'Run')}</span></button></div></div>
            <div class="editor-wrap"><textarea id="gEditor"></textarea></div></div>
          <div class="game-msg" id="gMsg"></div>
        </div>
        <div class="game-stage card"><div id="stage"></div><div class="stage-bar" id="stageBar"></div></div>
      </div>
    </div>`;
    fx.reveal(C.app);
    const ed = C.editor(document.getElementById('gEditor'), 'javascript', () => document.getElementById('gRun').click());
    const key = 'arc:' + o.key;
    ed.setValue(C.LS.get(key, o.starter));
    ed.on('change', C.debounce(() => C.LS.set(key, ed.getValue()), 300));
    document.getElementById('gReset').onclick = () => { ed.setValue(o.starter); if (o.onReset) o.onReset(); };
    let fails = 0;
    const solBtn = document.getElementById('gSol');
    if (o.solution) solBtn.onclick = () => { ed.setValue(o.solution); fx.toast(T('Розберись, як це працює, — і спробуй написати по-своєму!', 'Разберись, как это работает, — и попробуй написать по-своему!', 'Figure out how it works — then try your own version!'), 'ok', 'bulb'); };
    const msg = (html, kind) => { const m = document.getElementById('gMsg'); m.className = 'game-msg ' + (kind || ''); m.innerHTML = html; };
    const failed = () => { fails++; if (o.solution && fails >= 2) solBtn.hidden = false; };
    return { ed, msg, failed };
  }
  const levelNav = (kind, list, cur, done, extra) => `<div class="level-nav">${list.map((l, i) => {
    const n = i + 1, st = done[n] || 0, open = n === 1 || (done[n - 1] || 0) > 0 || st > 0;
    return `<a class="lv ${n === cur ? 'cur' : ''} ${st ? 'done' : ''} ${open ? '' : 'locked'}" href="${open ? `#/arcade/${kind}/${n}` : 'javascript:void 0'}" title="${esc(tr(l.title))}"><b>${open ? n : '🔒'}</b><small>${'★'.repeat(st)}${'☆'.repeat(3 - st)}</small></a>`;
  }).join('')}${extra || ''}</div>`;
  const unlocked = (done, n) => n === 1 || (done[n - 1] || 0) > 0 || (done[n] || 0) > 0;

  // ================= Робот =================
  function robotPage(n) {
    const a = arc();
    if (n > ROBOT.length || !unlocked(a.robot, n)) { location.hash = '#/arcade/robot/1'; return; }
    const lv = ROBOT[n - 1];
    const api = `<ul class="api-list"><li><code>move()</code> ${T('крок уперед', 'шаг вперёд', 'step forward')}</li><li><code>turnLeft()</code> / <code>turnRight()</code> ${T('поворот', 'поворот', 'turn')}</li><li><code>pickUp()</code> ${T('підняти кристал', 'поднять кристалл', 'pick up a crystal')}</li><li><code>wallAhead()</code>, <code>wallLeft()</code>, <code>wallRight()</code> ${T('чи є стіна', 'есть ли стена', 'is there a wall')}</li><li><code>gemHere()</code> ${T('чи є кристал тут', 'есть ли кристалл здесь', 'crystal here?')}</li><li><code>atGoal()</code> ${T('чи на прапорці', 'на флажке ли', 'at the flag?')}</li></ul>`;
    const ui = shell({
      key: 'robot:' + n, title: `${n}. ${tr(lv.title)}`, text: tr(lv.text) + `<p class="muted small">${T('На 3 зірки — не більше', 'На 3 звезды — не больше', '3 stars: at most')} ${lv.par} ${T('рядків коду.', 'строк кода.', 'lines of code.')}</p>`,
      api, starter: '// ' + T('Напиши команди для робота', 'Напиши команды для робота', 'Write commands for the robot') + '\n', solution: lv.sol,
      levels: levelNav('robot', ROBOT, n, a.robot), onReset: () => draw(0, null)
    });
    const stage = document.getElementById('stage');
    const bar = document.getElementById('stageBar');
    let anim = null;
    C.setCleanup(() => clearInterval(anim));
    const DEG = [0, 90, 180, 270];
    // Малюємо карту k у кадрі frame
    function draw(k, frame) {
      const rows = lv.maps[k];
      const W = Math.max(...rows.map((r) => r.length)), H = rows.length;
      let rx = 0, ry = 0, rd = 0;
      rows.forEach((r, y) => [...r].forEach((ch, x) => { if ('>v<^'.includes(ch)) { rx = x; ry = y; rd = '>v<^'.indexOf(ch); } }));
      const f = frame || { x: rx, y: ry, d: rd, got: [] };
      const got = new Set(f.got);
      stage.innerHTML = `<div class="rgrid" style="--w:${W};--h:${H}">${rows.map((r, y) => [...r.padEnd(W, '#')].map((ch, x) => {
        const gem = ch === '*' && !got.has(x + ',' + y);
        return `<div class="rc ${ch === '#' ? 'wall' : ''}">${ch === 'G' ? '<span class="rflag">🚩</span>' : ''}${gem ? '<span class="rgem">💎</span>' : ''}</div>`;
      }).join('')).join('')}
        <div class="rbot" style="left:calc(${f.x} * 100% / ${W});top:calc(${f.y} * 100% / ${H});width:calc(100% / ${W});height:calc(100% / ${H})"><div style="transform:rotate(${DEG[f.d]}deg)">${robotSVG(64)}</div></div></div>`;
      bar.innerHTML = lv.maps.length > 1 ? `${T('Карта', 'Карта', 'Map')} ${k + 1}/${lv.maps.length}` : '';
    }
    draw(0, null);
    document.getElementById('gRun').onclick = async () => {
      clearInterval(anim);
      ui.msg(`${C.icon('play', 15)} ${T('Робот виконує програму…', 'Робот выполняет программу…', 'The robot is running…')}`);
      const code = ui.ed.getValue();
      const r = await A().play('robot', code, { maps: lv.maps });
      if (r.error && !r.results) { ui.msg(errText(r.error), 'bad'); fx.sound('fail'); ui.failed(); return; }
      const queue = [];
      r.results.forEach((res, k) => res.frames.forEach((fr, i) => queue.push([k, fr, i === res.frames.length - 1 ? res : null])));
      let i = 0;
      const speed = Math.max(60, Math.min(260, 4000 / queue.length));
      anim = setInterval(() => {
        if (i >= queue.length) {
          clearInterval(anim);
          const last = r.results[r.results.length - 1];
          if (r.ok) {
            const lines = codeLines(code), stars = lines <= lv.par ? 3 : lines <= lv.par + 3 ? 2 : 1;
            const gain = reward('robot', n, stars);
            fx.sound('ok');
            fx.confetti(stars * 30);
            ui.msg(`<div class="win-row"><b>${T('Рівень пройдено!', 'Уровень пройден!', 'Level complete!')}</b> <span class="stars">${starsHTML(stars)}</span> <span class="muted">${lines} ${T('рядків', 'строк', 'lines')}</span>${gain ? ` · +${gain * 10} XP · +${gain * 5} 💎` : ''}
              ${n < ROBOT.length ? `<a class="btn primary sm" href="#/arcade/robot/${n + 1}">${T('Далі', 'Дальше', 'Next')} →</a>` : ''}</div>${stars < 3 ? `<small class="muted">${T('Спробуй коротший код для 3 зірок.', 'Попробуй код покороче для 3 звёзд.', 'Try shorter code for 3 stars.')}</small>` : ''}`, 'ok');
            if (gain) setTimeout(() => robotLevels(), 50);
          } else {
            fx.sound('fail');
            ui.failed();
            ui.msg(last.error ? errText(last.error) : !last.atGoal ? T('Робот не дійшов до прапорця.', 'Робот не дошёл до флажка.', 'The robot didn’t reach the flag.') + (r.results.length > 1 ? ` (${T('карта', 'карта', 'map')} ${r.results.length})` : '')
              : T(`Залишилось кристалів: ${last.gemsLeft}.`, `Осталось кристаллов: ${last.gemsLeft}.`, `Crystals left: ${last.gemsLeft}.`), 'bad');
          }
          if (r.logs && r.logs.length) ui.msg(document.getElementById('gMsg').innerHTML + `<pre class="glog">${esc(r.logs.join('\n'))}</pre>`, document.getElementById('gMsg').className.replace('game-msg ', ''));
          return;
        }
        const [k, fr] = queue[i++];
        draw(k, fr);
      }, speed);
    };
    function robotLevels() { const nav = document.querySelector('.level-nav'); if (nav) nav.outerHTML = levelNav('robot', ROBOT, n, arc().robot); }
  }

  // ================= Черепашка =================
  function turtlePage(n) {
    const a = arc();
    const free = n === 0;
    if (!free && (n > TURTLE.length || !unlocked(a.turtle, n))) { location.hash = '#/arcade/turtle/1'; return; }
    const lv = free ? null : TURTLE[n - 1];
    const api = `<ul class="api-list"><li><code>forward(n)</code> / <code>back(n)</code> ${T('рух', 'движение', 'move')}</li><li><code>right(deg)</code> / <code>left(deg)</code> ${T('поворот', 'поворот', 'turn')}</li><li><code>penUp()</code> / <code>penDown()</code> ${T('підняти / опустити олівець', 'поднять / опустить карандаш', 'pen up / down')}</li><li><code>color('red')</code>, <code>width(5)</code> ${T('колір і товщина', 'цвет и толщина', 'colour and width')}</li><li><code>circle(r)</code>, <code>goTo(x, y)</code></li></ul>`;
    const freeLink = `<a class="lv free ${free ? 'cur' : ''}" href="#/arcade/turtle/0"><b>✏️</b><small>${T('вільно', 'свободно', 'free')}</small></a>`;
    const ui = shell({
      key: 'turtle:' + n, title: free ? T('Вільне малювання', 'Свободное рисование', 'Free drawing') : `${n}. ${tr(lv.title)}`,
      text: free ? T('Малюй що завгодно! Сподобалось — опублікуй у галереї.', 'Рисуй что угодно! Понравилось — опубликуй в галерее.', 'Draw anything! Like it? Publish it to the gallery.') : tr(lv.text) + `<p class="muted small">${T('Сіра пунктирна лінія — що треба намалювати.', 'Серая пунктирная линия — что нужно нарисовать.', 'The grey dashed line is the target.')}</p>`,
      api, starter: free ? "color('#f472b6');\nwidth(4);\nfor (let i = 0; i < 36; i++) {\n  forward(120);\n  right(170);\n}\n" : '// ' + T('Черепашка в центрі й дивиться праворуч', 'Черепашка в центре и смотрит вправо', 'The turtle is in the centre facing right') + '\n',
      solution: free ? null : lv.ref, levels: levelNav('turtle', TURTLE, n, a.turtle, freeLink)
    });
    const stage = document.getElementById('stage');
    stage.innerHTML = `<canvas id="tCanvas" width="400" height="400" class="tcanvas"></canvas>`;
    const cv = document.getElementById('tCanvas'), ctx = cv.getContext('2d');
    let target = null, raf = null;
    C.setCleanup(() => clearTimeout(raf));
    const paintTarget = () => {
      ctx.clearRect(0, 0, 400, 400);
      ctx.fillStyle = '#0b1226'; ctx.fillRect(0, 0, 400, 400);
      ctx.strokeStyle = 'rgba(148,163,184,.12)'; ctx.lineWidth = 1;
      for (let g = 0; g <= 400; g += 40) { ctx.beginPath(); ctx.moveTo(g, 0); ctx.lineTo(g, 400); ctx.moveTo(0, g); ctx.lineTo(400, g); ctx.stroke(); }
      if (target) { ctx.setLineDash([6, 6]); ctx.strokeStyle = 'rgba(203,213,225,.5)'; ctx.lineWidth = 3; target.forEach(([x1, y1, x2, y2]) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }); ctx.setLineDash([]); }
    };
    const turtleAt = (x, y, ang) => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang * Math.PI / 180); ctx.fillStyle = '#22c55e'; ctx.strokeStyle = '#0b1020'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(-7, -7); ctx.lineTo(-4, 0); ctx.lineTo(-7, 7); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); };
    (async () => {
      if (lv) { const r = await A().play('turtle', lv.ref, {}); target = r.segs; }
      paintTarget(); turtleAt(200, 200, 0);
    })();
    document.getElementById('gRun').onclick = async () => {
      clearTimeout(raf);
      const code = ui.ed.getValue();
      const r = await A().play('turtle', code, {});
      paintTarget();
      if (r.error) { ui.msg(errText(r.error), 'bad'); fx.sound('fail'); ui.failed(); return; }
      const segs = r.segs;
      const perFrame = Math.max(1, Math.ceil(segs.length / 90));
      let i = 0;
      const step = () => {
        for (let k = 0; k < perFrame && i < segs.length; k++, i++) {
          const [x1, y1, x2, y2, col, w] = segs[i];
          ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
        if (i < segs.length) { raf = setTimeout(step, 16); return; }
        turtleAt(r.end[0], r.end[1], r.end[2]);
        if (free) {
          ui.msg(`${T('Готово!', 'Готово!', 'Done!')} <button class="btn primary sm" id="pubDraw">${C.icon('sparkle', 15)} ${T('У галерею', 'В галерею', 'To gallery')}</button>`, 'ok');
          document.getElementById('pubDraw').onclick = () => C.publishToGallery && C.publishToGallery({ type: 'turtle', code });
          return;
        }
        const sim = A().similarity(segs, target);
        const stars = sim >= 0.9 ? 3 : sim >= 0.8 ? 2 : sim >= 0.7 ? 1 : 0;
        if (stars) {
          const gain = reward('turtle', n, stars);
          fx.sound('ok'); fx.confetti(stars * 30);
          ui.msg(`<div class="win-row"><b>${T('Чудово!', 'Отлично!', 'Great!')}</b> <span class="stars">${starsHTML(stars)}</span> <span class="muted">${T('збіг', 'совпадение', 'match')} ${Math.round(sim * 100)}%</span>${gain ? ` · +${gain * 10} XP · +${gain * 5} 💎` : ''}
            ${n < TURTLE.length ? `<a class="btn primary sm" href="#/arcade/turtle/${n + 1}">${T('Далі', 'Дальше', 'Next')} →</a>` : ''}</div>`, 'ok');
          if (gain) { const nav = document.querySelector('.level-nav'); if (nav) nav.outerHTML = levelNav('turtle', TURTLE, n, arc().turtle, freeLink); }
        } else {
          fx.sound('fail'); ui.failed();
          ui.msg(T(`Схоже лише на ${Math.round(sim * 100)}% — потрібно хоча б 70%. Порівняй із сірою лінією.`, `Похоже лишь на ${Math.round(sim * 100)}% — нужно хотя бы 70%. Сравни с серой линией.`, `Only ${Math.round(sim * 100)}% similar — you need 70%. Compare with the grey line.`), 'bad');
        }
      };
      step();
    };
  }

  // ================= Змійка =================
  function snakePage() {
    const a = arc();
    const ui = shell({
      key: 'snake', title: T('Змійка-бот', 'Змейка-бот', 'Snake bot'),
      text: T(`Ти не натискаєш кнопки — змійкою керує твоя функція <code>move(s)</code>. Вона викликається щокроку й повертає напрямок. Зірки: ${SNAKE_STARS.join(' / ')} яблук. Стартовий код погано обходить свій хвіст — покращ його!`, `Ты не нажимаешь кнопки — змейкой управляет твоя функция <code>move(s)</code>. Она вызывается каждый шаг и возвращает направление. Звёзды: ${SNAKE_STARS.join(' / ')} яблок. Стартовый код плохо обходит свой хвост — улучши его!`, `No buttons — your <code>move(s)</code> function steers the snake. It’s called every tick and returns a direction. Stars: ${SNAKE_STARS.join(' / ')} apples. The starter code crashes into its own tail — improve it!`),
      api: `<ul class="api-list"><li><code>s.head</code>, <code>s.food</code> — {x, y}</li><li><code>s.body</code> — ${T('масив клітинок змійки', 'массив клеток змейки', 'array of snake cells')}</li><li><code>s.dir</code> — ${T('поточний напрямок', 'текущее направление', 'current direction')}</li><li><code>s.width</code> = 20, <code>s.height</code> = 15</li><li>${T('Повертай', 'Возвращай', 'Return')} 'up' / 'down' / 'left' / 'right'</li></ul>`,
      starter: SNAKE_START()
    });
    const stage = document.getElementById('stage'), bar = document.getElementById('stageBar');
    stage.innerHTML = `<canvas id="sCanvas" width="440" height="330" class="tcanvas"></canvas>`;
    const cv = document.getElementById('sCanvas'), ctx = cv.getContext('2d'), Z = 22;
    let anim = null;
    C.setCleanup(() => clearInterval(anim));
    const drawFrame = (f) => {
      ctx.fillStyle = '#0b1226'; ctx.fillRect(0, 0, 440, 330);
      for (let x = 0; x < 20; x++) for (let y = 0; y < 15; y++) if ((x + y) % 2) { ctx.fillStyle = '#0e1630'; ctx.fillRect(x * Z, y * Z, Z, Z); }
      ctx.font = `${Z - 4}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('🍎', f.food[0] * Z + Z / 2, f.food[1] * Z + Z / 2 + 1);
      f.snake.forEach(([x, y], i) => { ctx.fillStyle = i === 0 ? '#bef264' : i % 2 ? '#84cc16' : '#65a30d'; ctx.beginPath(); ctx.roundRect(x * Z + 2, y * Z + 2, Z - 4, Z - 4, i === 0 ? 8 : 5); ctx.fill(); });
      const [hx, hy] = f.snake[0]; ctx.fillStyle = '#0b1020'; ctx.beginPath(); ctx.arc(hx * Z + Z / 2 - 4, hy * Z + Z / 2 - 3, 2.5, 0, 7); ctx.arc(hx * Z + Z / 2 + 4, hy * Z + Z / 2 - 3, 2.5, 0, 7); ctx.fill();
      bar.innerHTML = `🍎 <b>${f.score}</b> · ${T('рекорд', 'рекорд', 'best')} <b>${arc().snake || 0}</b>`;
    };
    drawFrame({ snake: [[5, 7], [4, 7], [3, 7]], food: [12, 7], score: 0 });
    document.getElementById('gRun').onclick = async () => {
      clearInterval(anim);
      ui.msg(T('Змійка думає…', 'Змейка думает…', 'The snake is thinking…'));
      const r = await A().play('snake', ui.ed.getValue(), { seed: 7, ticks: 600 });
      if (!r.frames) { ui.msg(errText(r.error), 'bad'); fx.sound('fail'); return; }
      let i = 0;
      const fast = r.frames.length > 300 ? 25 : 55;
      anim = setInterval(() => {
        if (i >= r.frames.length) {
          clearInterval(anim);
          const stars = SNAKE_STARS.filter((s) => r.score >= s).length;
          const best = Math.max(arc().snake || 0, r.score);
          const oldStars = SNAKE_STARS.filter((s) => (arc().snake || 0) >= s).length;
          arc().snake = best;
          let gain = 0;
          if (stars > oldStars) { gain = stars - oldStars; G.addXP(10 * gain); G.addGems(5 * gain); }
          C.save();
          const why = r.error ? errText(r.error) : r.dead === 'wall' ? T('врізалась у стіну', 'врезалась в стену', 'hit a wall') : r.dead === 'self' ? T('вкусила себе за хвіст', 'укусила себя за хвост', 'bit its own tail') : T('час вийшов', 'время вышло', 'time ran out');
          ui.msg(`<div class="win-row"><b>🍎 ${r.score}</b> <span class="stars">${starsHTML(stars)}</span> <span class="muted">${why}</span>${gain ? ` · +${gain * 10} XP · +${gain * 5} 💎` : ''}</div>`, stars ? 'ok' : 'bad');
          fx.sound(stars ? 'ok' : 'fail');
          if (gain) fx.confetti(40 * gain);
          drawFrame(r.frames[r.frames.length - 1]);
          return;
        }
        drawFrame(r.frames[i++]);
      }, fast);
    };
  }
})();
