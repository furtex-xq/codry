# Codry — безкоштовне навчання програмуванню

Інтерактивні курси з 11 мов програмування для дітей, підлітків і всіх охочих. Інтерфейс і уроки — українською, російською та англійською.

## Курси (221 крок)

| Курс | Кроків | Де виконується код |
|---|---|---|
| Python | 34 | у браузері (Pyodide) |
| JavaScript | 30 | у браузері (Web Worker) |
| HTML | 21 | у браузері, живий перегляд |
| CSS | 21 | у браузері, живий перегляд |
| SQL | 18 | у браузері (sql.js / SQLite) |
| Lua | 14 | сервер Wandbox (Lua 5.4) |
| Roblox (Luau) | 20 | Wandbox + симулятор Roblox API |
| Java | 17 | Wandbox (OpenJDK 21) |
| C++ | 14 | Wandbox (GCC 13) |
| C# | 16 | Wandbox (Mono) |
| Go | 16 | Wandbox (Go 1.23) |

Кожен крок: теорія, «чому саме так», типові помилки, 3–4 приклади, завдання з автоперевіркою, покрокова інструкція, підказка, розв’язок, міні-тест і довідник. Кроки відкриваються суворо по черзі. У кожному курсі є фінальні проєкти.

## Що ще вміє

- XP, рівні, кристали, серія днів із заморозками, щоденні квести та скриня
- Задача дня (30 задач по колу, Python або JavaScript)
- 10 ліг з тижневим рейтингом, 34 досягнення, магазин
- Маскот Кодрик з мальованими емоціями, анімації, звуки, озвучка уроків
- Форум, профіль, сертифікати, пісочниця, повноекранний редактор
- Темна тема за замовчуванням (є світла)
- Без реєстрації все зберігається в браузері; з Firebase — вхід через Google і спільний рейтинг/форум

## Запуск на своєму комп’ютері

```bash
node server.js
```

Потім відкрий http://localhost:5173.

## Підключення Firebase (вхід через Google, спільний рейтинг і форум)

1. Створи проєкт на https://console.firebase.google.com (безкоштовний план Spark).
2. **Authentication → Sign-in method** — увімкни Google (і, за бажанням, Email/Password).
3. **Authentication → Settings → Authorized domains** — додай домен сайту (наприклад `твій-логін.github.io`).
4. **Firestore Database** — створи базу і встав правила:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /users/{uid} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
    match /topics/{id} {
      allow read: if true;
      allow create: if request.auth != null;
      match /replies/{rid} {
        allow read: if true;
        allow create: if request.auth != null;
      }
    }
  }
}
```

5. **Project settings → Your apps → Web** — скопіюй конфіг і встав його в `js/firebase-config.js` замість `null`.
6. Firestore попросить створити індекс для рейтингу — відкрий посилання з помилки в консолі браузера, і індекс створиться автоматично.

## Публікація на GitHub Pages

1. Створи репозиторій на GitHub (наприклад `codry`).
2. Завантаж туди всі файли проєкту (папки `css`, `js`, файл `index.html` тощо).
3. **Settings → Pages → Source: Deploy from a branch**, гілка `main`, папка `/ (root)`.
4. Через хвилину сайт буде доступний за адресою `https://твій-логін.github.io/codry/`.

Сайт повністю статичний — сервер не потрібен. `server.js` потрібен лише для локального запуску.

## Перевірка уроків

```bash
node tools/validate.js
```

Перевіряє структуру всіх курсів (три мови, приклади, тести) і запускає розв’язки JavaScript. З прапорцем `--run` ще й запускає еталонні розв’язки Python/Java/C++/C#/Go/Lua/Luau через Wandbox:

```bash
node tools/validate.js go --run
```

HTML, CSS і SQL перевіряються в браузері на сторінці `#/dev/html`, `#/dev/css`, `#/dev/sql`.

## Структура

- `index.html` — оболонка сторінки
- `css/style.css` — увесь дизайн
- `js/core.js` — стан, збереження, маршрутизація
- `js/i18n.js` — тексти інтерфейсу UA / RU / EN
- `js/courses/*.js` — уроки (`_courses.js` — список курсів)
- `js/daily-problems.js` — задачі дня
- `js/runners.js` — запуск коду (включно з симулятором Roblox)
- `js/game.js` — XP, ліги, квести, досягнення, магазин
- `js/cloud.js`, `js/firebase-config.js` — вхід і хмара
- `js/mascot.js`, `js/fx.js`, `js/icons.js` — маскот, анімації, іконки
- `js/pages/*.js` — сторінки сайту
- `tools/validate.js` — перевірка курсів
