# Codry — безкоштовне навчання програмуванню

Інтерактивні курси з 11 мов програмування для дітей, підлітків і всіх охочих. Інтерфейс і уроки — українською, російською та англійською.

Сайт: https://furtex-xq.github.io/codry/

Хмара: Firebase-проєкт `codry-55381` (вхід Google та email, Firestore у регіоні eur3, правила з README, індекси для рейтингу й ліги класів). Адмін-сторінка: меню аватара → «Адмін: заявки».

## Курси (266 кроків)

| Курс | Кроків | Де виконується код |
|---|---|---|
| Python | 34 | у браузері (Pyodide) |
| JavaScript | 30 | у браузері (Web Worker) |
| HTML | 21 | у браузері, живий перегляд |
| CSS | 21 | у браузері, живий перегляд |
| SQL | 26 | у браузері (sql.js / SQLite) |
| Lua | 21 | у браузері (Fengari) |
| Roblox (Luau) | 20 | у браузері (Fengari + симулятор Roblox API) |
| Java | 25 | сервер (OpenJDK 21) |
| C++ | 21 | сервер (GCC 13) |
| C# | 24 | сервер (Mono / .NET) |
| Go | 23 | сервер (Go 1.23) |

Java, C++, C# і Go компілюються на сервері Wandbox. Якщо він недоступний, код автоматично надсилається на запасний сервер Compiler Explorer (godbolt.org). Якщо бібліотека Fengari не завантажилась, Lua теж виконується на сервері.

Кожен крок: теорія, «чому саме так», типові помилки, 3–4 приклади, завдання з автоперевіркою, покрокова інструкція, підказка, розв’язок, міні-тест і довідник. Кроки відкриваються суворо по черзі. У кожному курсі є фінальні проєкти.

## Що ще вміє

- XP, рівні, кристали, серія днів із заморозками, щоденні квести та скриня
- Задача дня (30 задач по колу, Python або JavaScript)
- 10 ліг з тижневим рейтингом, 34 досягнення, магазин
- Маскот Кодрик з мальованими емоціями, анімації, звуки, озвучка уроків
- Форум, профіль, сертифікати, пісочниця, повноекранний редактор
- **Карта світу** для кожного курсу: острови-глави, стежка кроків, замки-проєкти
- **Боси** наприкінці кожної глави: бій на час із питаннями глави (серця, шкала здоров’я, нагорода)
- **Ігри з кодом** (JavaScript): Робот (10 рівнів — від команд до лабіринтів), Черепашка (8 фігур + вільне малювання), Змійка-бот (пишеш їй «мозок»)
- **Код-батли**: дуель на швидкість із трьома ботами та виклик друга посиланням
- **Улюбленець Кодрик**: росте від XP (яйце → майстер), ситість і настрій залежать від щоденних занять
- **Галерея робіт**: вибране, мої роботи, спільнота (з Firebase) з лайками
- **Турнір тижня**: 5 задач для всіх, таблиця, трофеї для топ-10 (40 задач у пулі)
- **Ліга класів**: класи змагаються сумою тижневого XP учнів (з Firebase)
- **Режим учителя**: класи, завдання з будь-якого курсу з терміном, таблиця прогресу учнів, експорт у CSV
- **Мій клас** для учнів: завдання від учителя з прогресом і кнопкою «Продовжити»
- Сторінка «Підтримати» з посиланнями й криптогаманцями (з QR-кодами)
- Темна тема за замовчуванням (є світла)
- Без реєстрації все зберігається в браузері; з Firebase — вхід через Google, спільний рейтинг, форум і класи

## Режим учителя

**Без Firebase (працює одразу):**
1. Учитель: **Ще → Для вчителя** → створює клас і додає завдання (курс, кроки «з — по», термін).
2. Копіює посилання-запрошення й надсилає учням.
3. Учень відкриває посилання — клас з’являється в **Ще → Мій клас**.
4. Учень натискає **«Звіт для вчителя»** і надсилає код учителю (у месенджер чи пошту).
5. Учитель вставляє коди в таблицю класу — бачить прогрес кожного учня.

**З Firebase:** учні входять в акаунт, вводять 6-значний код класу, і прогрес оновлюється в таблиці вчителя автоматично.

## Донати й «Про нас»

Усе налаштовується у файлі `js/site-config.js` — без програмування:
- `CODRY_DONATE.links` — посилання (Monobank, Buy Me a Coffee, PayPal…)
- `CODRY_DONATE.crypto` — монета, мережа й адреса гаманця (QR-код створиться сам)
- `CODRY_ABOUT` — опис проєкту, команда, контакти

Порожні поля на сайті не показуються.

## Запуск на своєму комп’ютері

```bash
node server.js
```

Потім відкрий http://localhost:5173.

## Реєстрація з підтвердженням

Щоб користувачів не стало забагато одразу, кожна реєстрація потребує підтвердження адміністратора:

1. Учень реєструється (Google або email + пароль) — створюється заявка зі статусом «очікує».
2. Поки заявку не підтверджено, він вчиться як раніше (прогрес у браузері), але хмарні функції вимкнені: синхронізація, рейтинг, форум, галерея, класи, турніри. Це захищено правилами Firestore, тож обійти з браузера не можна.
3. Адміністратор відкриває **меню аватара → Адмін: заявки** і натискає «Підтвердити» або «Відхилити».
4. Щойно заявку підтверджено, в учня все вмикається саме, без перезавантаження.

На сторінці адміна є кнопка **«Закрити реєстрацію»** — нові заявки взагалі перестануть прийматися.

**Як стати адміністратором (один раз):**
1. Підключи Firebase (розділ нижче), зайди на сайт і зареєструйся.
2. На сторінці «Заявка на перевірці» розгорни «Я власник сайту» і скопіюй UID.
3. Впиши його в `js/firebase-config.js`: `window.CODRY_ADMINS = ['твій_UID'];`
4. І в правила Firestore замість `ВАШ_UID`. Після цього твій акаунт підтвердиться автоматично.

## Підключення Firebase (вхід через Google, спільний рейтинг, форум і класи)

1. Створи проєкт на https://console.firebase.google.com (безкоштовний план Spark).
2. **Authentication → Sign-in method** — увімкни Google (і, за бажанням, Email/Password).
3. **Authentication → Settings → Authorized domains** — додай `furtex-xq.github.io`.
4. **Firestore Database** — створи базу і встав правила:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    // Впиши сюди свій UID (його показує сторінка «Заявка на перевірці»)
    function isAdmin() { return request.auth != null && request.auth.uid in ['ВАШ_UID']; }
    function approved() {
      return request.auth != null && (isAdmin()
        || get(/databases/$(db)/documents/accounts/$(request.auth.uid)).data.status == 'approved');
    }
    function regOpen() {
      return !exists(/databases/$(db)/documents/site/config)
        || get(/databases/$(db)/documents/site/config).data.registrationOpen != false;
    }

    // Заявки на реєстрацію
    match /accounts/{uid} {
      allow read: if request.auth != null && (request.auth.uid == uid || isAdmin());
      allow create: if request.auth != null && request.auth.uid == uid
        && (request.resource.data.status == 'pending' && regOpen()
            || request.resource.data.status == 'approved' && isAdmin());
      allow update, delete: if isAdmin();
    }
    match /site/{doc} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /users/{uid} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == uid && approved();
    }
    match /topics/{id} {
      allow read: if true;
      allow create: if approved();
      allow update: if approved()
        && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes', 'replyCount']);
      match /replies/{rid} {
        allow read: if true;
        allow create: if approved();
      }
    }
    match /classes/{code} {
      allow read: if true;
      allow create: if approved() && request.resource.data.teacher == request.auth.uid;
      allow update, delete: if approved() && resource.data.teacher == request.auth.uid;
      match /members/{uid} {
        allow read: if true;
        allow write: if approved() && request.auth.uid == uid;
      }
    }
    match /gallery/{id} {
      allow read: if true;
      allow create: if approved() && request.resource.data.author.uid == request.auth.uid
        && request.resource.data.code.size() < 20001;
      allow update: if approved()
        && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes']);
      allow delete: if approved() && (resource.data.author.uid == request.auth.uid || isAdmin());
    }
    match /tournaments/{week}/entries/{uid} {
      allow read: if true;
      allow write: if approved() && request.auth.uid == uid;
    }
  }
}
```

5. **Project settings → Your apps → Web** — скопіюй конфіг і встав його в `js/firebase-config.js` замість `null`.
6. Firestore попросить створити індекс для рейтингу — відкрий посилання з помилки в консолі браузера, і індекс створиться автоматично.

## Публікація на GitHub Pages

Сайт уже опубліковано з репозиторію `furtex-xq/codry` (гілка `main`, папка `/`). Щоб оновити — зроби коміт і `git push`; GitHub Pages перебудує сайт за хвилину.

Файл `.nojekyll` обов’язковий: без нього GitHub Pages сховає `js/courses/_courses.js`.

## Перевірка уроків

```bash
node tools/validate.js
```

Перевіряє структуру всіх курсів (три мови, приклади, тести) і запускає розв’язки JavaScript. З прапорцем `--run` ще й запускає еталонні розв’язки через Wandbox, а з `--godbolt` — через Compiler Explorer. `--examples` додатково запускає всі приклади:

```bash
node tools/validate.js go --run
node tools/validate.js java --run --godbolt --examples
```

HTML, CSS і SQL перевіряються в браузері на сторінці `#/dev/html`, `#/dev/css`, `#/dev/sql`.

## Структура

- `index.html` — оболонка сторінки
- `css/style.css` — увесь дизайн
- `js/core.js` — стан, збереження, реєстр курсів
- `js/i18n.js` — тексти інтерфейсу UA / RU / EN
- `js/courses/*.js` — уроки (`_courses.js` — список курсів, `*-2.js` — другі частини курсів)
- `js/daily-problems.js` — задачі дня
- `js/runners.js` — запуск коду (Fengari, Wandbox, Compiler Explorer, симулятор Roblox)
- `js/game.js` — XP, ліги, квести, досягнення, магазин
- `js/cloud.js`, `js/firebase-config.js` — вхід, хмара, класи
- `js/site-config.js` — донати і «Про нас»
- `js/mascot.js`, `js/fx.js`, `js/icons.js` — маскот, анімації, іконки
- `js/pages/*.js` — сторінки сайту (`teacher.js` — режим учителя, `support.js` — донати й «Про нас»)
- `tools/validate.js` — перевірка курсів
