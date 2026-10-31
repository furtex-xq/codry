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
// Публічний конфіг веб-застосунку Firebase (це не секрет: доступ до даних захищають правила Firestore).
window.CODRY_FIREBASE = {
  apiKey: 'AIzaSyDkWPMD-KJewmPiO9y7HffA6R2NgtBlY0w',
  authDomain: 'codry-55381.firebaseapp.com',
  projectId: 'codry-55381',
  storageBucket: 'codry-55381.firebasestorage.app',
  messagingSenderId: '901706311569',
  appId: '1:901706311569:web:c154920e5472de99afdc30'
};

// UID адміністраторів, які підтверджують реєстрації (сторінка «Адмін»).
// Як дізнатися свій UID: увійди на сайт — на сторінці «Заявка на перевірці» буде кнопка «Скопіювати UID».
// Той самий UID треба вписати і в правила Firestore (див. README, функція isAdmin).
window.CODRY_ADMINS = [];
