// Оголошення всіх курсів. Кроки додаються у файлах <курс>-N.js через Codry.steps(id, [...]).
(function () {
  const C = window.Codry, L = C.L;

  C.course({
    id: 'python', name: 'Python', short: 'Py', color: '#3b82f6', color2: '#facc15', lang: 'python', file: 'main.py', cat: 'lang',
    desc: L('Найкраща перша мова. Автоматизація, боти, аналіз даних, штучний інтелект і бекенд.',
      'Лучший первый язык. Автоматизация, боты, анализ данных, искусственный интеллект и бэкенд.',
      'The best first language. Automation, bots, data analysis, AI and backend.')
  });
  C.course({
    id: 'javascript', name: 'JavaScript', short: 'JS', color: '#f59e0b', color2: '#fde047', lang: 'javascript', file: 'script.js', cat: 'web',
    desc: L('Мова інтернету: оживляє сайти, браузерні ігри, мобільні застосунки та сервери.',
      'Язык интернета: оживляет сайты, браузерные игры, мобильные приложения и серверы.',
      'The language of the web: brings sites, browser games, mobile apps and servers to life.')
  });
  C.course({
    id: 'html', name: 'HTML', short: 'HTML', color: '#f97316', color2: '#fb7185', lang: 'html', file: 'index.html', cat: 'web',
    desc: L('Скелет кожного сайту: тексти, посилання, картинки, таблиці, форми й семантика.',
      'Скелет каждого сайта: тексты, ссылки, картинки, таблицы, формы и семантика.',
      'The skeleton of every website: text, links, images, tables, forms and semantics.')
  });
  C.course({
    id: 'css', name: 'CSS', short: 'CSS', color: '#8b5cf6', color2: '#22d3ee', lang: 'css', file: 'style.css', cat: 'web',
    desc: L('Робить сайти красивими: кольори, шрифти, відступи, Flexbox, Grid, адаптивність, анімації.',
      'Делает сайты красивыми: цвета, шрифты, отступы, Flexbox, Grid, адаптивность, анимации.',
      'Makes websites beautiful: colors, fonts, spacing, Flexbox, Grid, responsiveness, animations.')
  });
  C.course({
    id: 'sql', name: 'SQL', short: 'SQL', color: '#06b6d4', color2: '#3b82f6', lang: 'sql', file: 'query.sql', cat: 'data',
    desc: L('Мова баз даних. Вибирай, фільтруй, сортуй і об’єднуй дані, як справжній аналітик.',
      'Язык баз данных. Выбирай, фильтруй, сортируй и объединяй данные, как настоящий аналитик.',
      'The language of databases. Select, filter, sort and join data like a real analyst.')
  });
  C.course({
    id: 'lua', name: 'Lua', short: 'Lua', color: '#1e3a8a', color2: '#60a5fa', lang: 'lua', file: 'main.lua', cat: 'games',
    desc: L('Легка і швидка мова для ігор та скриптів. Основа для Roblox, Garry’s Mod, Defold і модів.',
      'Лёгкий и быстрый язык для игр и скриптов. Основа для Roblox, Garry’s Mod, Defold и модов.',
      'A light, fast language for games and scripting. The base for Roblox, Garry’s Mod, Defold and mods.')
  });
  C.course({
    id: 'luau', name: 'Roblox (Luau)', short: 'Rbx', color: '#ef4444', color2: '#7c3aed', lang: 'luau', file: 'Script.lua', cat: 'games',
    tag: L('Ігри', 'Игры', 'Games'),
    desc: L('Створюй власні ігри в Roblox: деталі, події, гравці, таблиця лідерів, магазини й обміни між клієнтом і сервером.',
      'Создавай свои игры в Roblox: детали, события, игроки, таблица лидеров, магазины и обмен между клиентом и сервером.',
      'Build your own Roblox games: parts, events, players, leaderboards, shops and client-server communication.')
  });
  C.course({
    id: 'java', name: 'Java', short: 'Java', color: '#ea580c', color2: '#b91c1c', lang: 'java', file: 'Main.java', cat: 'lang',
    desc: L('Мова Android, Minecraft і великих компаній. Строга типізація та об’єктно-орієнтоване програмування.',
      'Язык Android, Minecraft и крупных компаний. Строгая типизация и объектно-ориентированное программирование.',
      'The language of Android, Minecraft and big companies. Static typing and object-oriented programming.')
  });
  C.course({
    id: 'cpp', name: 'C++', short: 'C++', color: '#2563eb', color2: '#0ea5e9', lang: 'cpp', file: 'main.cpp', cat: 'lang',
    desc: L('Швидкість і контроль: ігрові рушії, олімпіадне програмування, системи та робототехніка.',
      'Скорость и контроль: игровые движки, олимпиадное программирование, системы и робототехника.',
      'Speed and control: game engines, competitive programming, systems and robotics.')
  });
  C.course({
    id: 'csharp', name: 'C#', short: 'C#', color: '#7c3aed', color2: '#a855f7', lang: 'csharp', file: 'Program.cs', cat: 'lang',
    desc: L('Мова Unity та .NET: ігри, програми для Windows, веб-сервери.',
      'Язык Unity и .NET: игры, программы для Windows, веб-серверы.',
      'The language of Unity and .NET: games, Windows apps, web servers.')
  });
  C.course({
    id: 'go', name: 'Go', short: 'Go', color: '#06b6d4', color2: '#0e7490', lang: 'go', file: 'main.go', cat: 'lang',
    desc: L('Проста і швидка мова від Google для серверів, хмарних сервісів і утиліт.',
      'Простой и быстрый язык от Google для серверов, облачных сервисов и утилит.',
      'A simple, fast language from Google for servers, cloud services and tools.')
  });
})();
