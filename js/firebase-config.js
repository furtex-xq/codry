// Налаштування Firebase (безкоштовний сервер для входу, рейтингу та форуму).
// Поки тут null — сайт працює в локальному режимі (усе зберігається в браузері).
// Як увімкнути: див. README.md, розділ «Підключення Firebase», і вставте сюди свій конфіг:
//
// window.CODRY_FIREBASE = {
//   apiKey: "...",
//   authDomain: "your-project.firebaseapp.com",
//   projectId: "your-project",
//   appId: "..."
// };
window.CODRY_FIREBASE = null;

// UID адміністраторів, які підтверджують реєстрації (сторінка «Адмін»).
// Як дізнатися свій UID: увійди на сайт — на сторінці «Заявка на перевірці» буде кнопка «Скопіювати UID».
// Той самий UID треба вписати і в правила Firestore (див. README, функція isAdmin).
window.CODRY_ADMINS = [];
