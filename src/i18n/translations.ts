import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  nav: {
    chat: string;
    video: string;
    images: string;
    youtube: string;
    voice: string;
    seo: string;
    profile: string;
    replitDeploy: string;
  };
  languages: {
    ru: string;
    uz: string;
    en: string;
    zh: string;
  };
  common: {
    loading: string;
    generate: string;
    generating: string;
    copy: string;
    copied: string;
    download: string;
    save: string;
    saved: string;
    delete: string;
    clear: string;
    micStart: string;
    micStop: string;
    listening: string;
    error: string;
    success: string;
    close: string;
    cancel: string;
    apply: string;
    details: string;
    proFeature: string;
    learnMore: string;
  };
  auth: {
    loginWithGoogle: string;
    register: string;
    logout: string;
    cabinetTitle: string;
    accountDetails: string;
    tier: string;
    tokensUsed: string;
    generationsCount: string;
    historyTitle: string;
    noHistory: string;
    exportHistory: string;
    mockGoogleSuccess: string;
    securityNote: string;
  };
  chat: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    presets: {
      all: string;
      general: string;
      minecraft_rules: string;
      minecraft_mods: string;
      youtube: string;
      code: string;
    };
    presetDesc: {
      general: string;
      minecraft_rules: string;
      minecraft_mods: string;
      youtube: string;
      code: string;
    };
    suggestedPrompts: string[];
    readAloud: string;
    stopAudio: string;
  };
  video: {
    title: string;
    subtitle: string;
    promptLabel: string;
    promptPlaceholder: string;
    durationLabel: string;
    durations: {
      '10s': string;
      '20s': string;
      '30s': string;
      '60s': string;
      '100s': string;
    };
    formatLabel: string;
    formats: {
      '16:9': string;
      '9:16': string;
      '1:1': string;
    };
    voiceLabel: string;
    voices: {
      male_energetic: string;
      female_natural: string;
      male_calm: string;
      female_expressive: string;
    };
    generateBtn: string;
    renderingMsg: string;
    downloadVideo: string;
    videoReady: string;
    cloudNoticeTitle: string;
    cloudNoticeDesc: string;
    apiCostTitle: string;
    apiCostDesc: string;
  };
  images: {
    title: string;
    subtitle: string;
    promptLabel: string;
    promptPlaceholder: string;
    enhancePrompt: string;
    categoryLabel: string;
    categories: {
      youtube_avatar: string;
      youtube_preview: string;
      minecraft: string;
      realistic: string;
    };
    aspectRatioLabel: string;
    generateBtn: string;
    downloadBtn: string;
    recentImages: string;
  };
  youtube: {
    title: string;
    subtitle: string;
    tabs: {
      shorts: string;
      longForm: string;
      script: string;
      titles: string;
      preview: string;
      sequel: string;
    };
    topicLabel: string;
    topicPlaceholder: string;
    generateIdeas: string;
    hooksTitle: string;
    structureTitle: string;
    sendToImages: string;
  };
  voice: {
    title: string;
    subtitle: string;
    statusReady: string;
    statusListening: string;
    statusThinking: string;
    statusSpeaking: string;
    tapToSpeak: string;
    stopSpeaking: string;
    continuousMode: string;
    voiceOutputLabel: string;
    transcriptPlaceholder: string;
  };
  seo: {
    title: string;
    subtitle: string;
    domainLabel: string;
    domainPlaceholder: string;
    verifyStatus: string;
    verified: string;
    unverified: string;
    methodsTitle: string;
    htmlFileTitle: string;
    htmlFileDesc: string;
    metaHtmlTitle: string;
    metaHtmlDesc: string;
    dnsTxtTitle: string;
    dnsTxtDesc: string;
    sitemapTitle: string;
    sitemapDesc: string;
    viewSitemap: string;
    robotsTitle: string;
    robotsDesc: string;
    viewRobots: string;
    auditTitle: string;
    runAudit: string;
    auditPassed: string;
    auditScore: string;
    googleConsoleLink: string;
    consoleInstruction: string;
    importantDisclaimer: string;
  };
  replit: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    downloadFiles: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    appName: 'Tochkas AI',
    tagline: 'Профессиональная экосистема искусственного интеллекта',
    nav: {
      chat: 'AI Чат',
      video: 'Создать видео',
      images: 'Создать изображения',
      youtube: 'YouTube Студия',
      voice: 'Голосовой AI',
      seo: 'Google Search Console',
      profile: 'Личный кабинет',
      replitDeploy: 'Публикация & Replit',
    },
    languages: {
      ru: 'Русский',
      uz: "O'zbekcha",
      en: 'English',
      zh: '中文',
    },
    common: {
      loading: 'Загрузка...',
      generate: 'Сгенерировать',
      generating: 'Генерация...',
      copy: 'Скопировать',
      copied: 'Скопировано в буфер!',
      download: 'Скачать результат',
      save: 'Сохранить',
      saved: 'Сохранено',
      delete: 'Удалить',
      clear: 'Очистить',
      micStart: 'Включить микрофон',
      micStop: 'Остановить запись',
      listening: 'Слушаю вас...',
      error: 'Произошла ошибка',
      success: 'Успешно выполнено',
      close: 'Закрыть',
      cancel: 'Отмена',
      apply: 'Применить',
      details: 'Подробнее',
      proFeature: 'PRO Возможность',
      learnMore: 'Узнать больше',
    },
    auth: {
      loginWithGoogle: 'Войти через Google',
      register: 'Быстрая регистрация Google',
      logout: 'Выйти из системы',
      cabinetTitle: 'Личный кабинет пользователя',
      accountDetails: 'Данные профиля',
      tier: 'Тарифный план',
      tokensUsed: 'Израсходовано токенов AI',
      generationsCount: 'Сохранено генераций',
      historyTitle: 'История запросов и генераций',
      noHistory: 'История пока пуста. Начните создавать шедевры с Tochkas AI!',
      exportHistory: 'Экспорт истории (JSON)',
      mockGoogleSuccess: 'Вы успешно авторизованы через Google аккаунт!',
      securityNote: 'Безопасное сквозное шифрование сессии Google OAuth 2.0 / Firebase Auth.',
    },
    chat: {
      title: 'Умный AI-Чат Tochkas',
      subtitle: 'Многозадачный интеллект: правила Minecraft, моды, YouTube-сценарии и программирование.',
      placeholder: 'Спросите о чём угодно: правила Minecraft, идеи для YouTube, код или моды...',
      send: 'Отправить',
      presets: {
        all: 'Все темы',
        general: 'Универсальный AI',
        minecraft_rules: 'Правила Minecraft',
        minecraft_mods: 'Помощь с модами',
        youtube: 'YouTube сценарии',
        code: 'Разработка и код',
      },
      presetDesc: {
        general: 'Интеллектуальные ответы на любые вопросы, анализ и генерация текстов.',
        minecraft_rules: 'Игровые механики, редстоун, команды, крафты, боссы, Эндер-мир и выживание.',
        minecraft_mods: 'Forge, Fabric, OptiFine, Create, JEI, решение конфликтов и краш-логов.',
        youtube: 'Вирусные хуки, сценарные таймкоды, удержание аудитории и CTA.',
        code: 'Написание скриптов, алгоритмов, веб-разработка и поиск багов.',
      },
      suggestedPrompts: [
        'Как построить автоматическую ферму железа в Minecraft 1.21?',
        'Какие топ-5 модов оптимизации для Fabric и как их настроить?',
        'Напиши вирусный сценарий Shorts на тему редких секретов Minecraft.',
        'Объясни механику спавна мобов и редстоун-таймеров простыми словами.',
      ],
      readAloud: 'Озвучить голосом AI',
      stopAudio: 'Остановить голос',
    },
    video: {
      title: 'Создать видео с AI',
      subtitle: 'Генерация полноценных видеороликов с кинематографичной анимацией и голосом AI.',
      promptLabel: 'Опишите видео',
      promptPlaceholder: 'Например: Топ-3 секретных крафта в Minecraft, о которых знают только ветераны игры...',
      durationLabel: 'Выбор продолжительности',
      durations: {
        '10s': '10 секунд (Тизер)',
        '20s': '20 секунд (Shorts Hook)',
        '30s': '30 секунд (Стандарт)',
        '60s': '60 секунд (Shorts/Reels)',
        '100s': '1 минута 40 секунд (Полный ролик)',
      },
      formatLabel: 'Выбор формата',
      formats: {
        '16:9': '16:9 (Горизонтальный для YouTube / TV)',
        '9:16': '9:16 (Вертикальный для Shorts, Reels, TikTok)',
        '1:1': '1:1 (Квадратный для постов и соцсетей)',
      },
      voiceLabel: 'Выбор голоса AI',
      voices: {
        male_energetic: '1. Мужской (Энергичный диктор)',
        female_natural: '2. Женский (Естественный)',
        male_calm: '3. Мужской спокойный (Документальный)',
        female_expressive: '4. Женский выразительный (Художественный)',
      },
      generateBtn: 'Сгенерировать видео',
      renderingMsg: 'Рендеринг видеопотока, наложение титров и синтез голоса...',
      downloadVideo: 'Скачать готовое видео (.mp4 / .webm)',
      videoReady: 'Видео успешно создано и готово к публикации!',
      cloudNoticeTitle: 'Настоящий видео-движок Tochkas AI Engine',
      cloudNoticeDesc: 'Генератор в реальном времени собирает раскадровку, анимированные эффекты, кинетическую типографику и накладывает озвучку выбранным AI-голосом в реальный видеофайл.',
      apiCostTitle: 'Интеграция с внешними облачными API (Veo / Omni Flash / Runway)',
      apiCostDesc: 'Для прямой покадровой нейросетевой диффузии (Google Veo / Gemini Omni 1.2 Flash) требуется платный аккаунт Google Cloud Vertex AI (стоимость: от $0.15 за 5-секундный клип). В Tochkas AI встроен оптимизированный локальный рендерер, генерирующий настоящее видео без дополнительных затрат!',
    },
    images: {
      title: 'Студия генерации изображений',
      subtitle: 'Создание профессиональных аватарок, превью YouTube, Minecraft-артов и реалистичных шедевров.',
      promptLabel: 'Опишите желаемое изображение',
      promptPlaceholder: 'Например: Эпический незеритовый рыцарь на краю адской крепости в лучах лавы, 4k...',
      enhancePrompt: 'Улучшить промпт через AI',
      categoryLabel: 'Категория изображения',
      categories: {
        youtube_avatar: 'Аватарки YouTube (Яркие, контрастные)',
        youtube_preview: 'Превью YouTube (Кликабельные обложки)',
        minecraft: 'Minecraft-изображения (Шейдеры, блоки, крафты)',
        realistic: 'Реалистичные изображения (Фотореализм, 8k)',
      },
      aspectRatioLabel: 'Размер и соотношение сторон',
      generateBtn: 'Создать изображение',
      downloadBtn: 'Скачать изображение (PNG)',
      recentImages: 'Недавние генерации',
    },
    youtube: {
      title: 'YouTube Студия Tochkas AI',
      subtitle: 'Полный арсенал контент-мейкера: вирусные идеи, сценарии, кликабельные заголовки и превью.',
      tabs: {
        shorts: 'Идеи для Shorts',
        longForm: 'Идеи для длинных роликов',
        script: 'Генератор сценариев',
        titles: 'Клик-заголовки',
        preview: 'Идеи превью',
        sequel: 'Продолжения видео',
      },
      topicLabel: 'Тема канала или будущего ролика',
      topicPlaceholder: 'Например: Выживание 100 дней в хардкорном Minecraft или обзор редких модов...',
      generateIdeas: 'Сгенерировать контент-план',
      hooksTitle: 'Первые 3 секунды (Хук для удержания):',
      structureTitle: 'Структура и ключевые сцены:',
      sendToImages: 'Сгенерировать превью в Image Studio →',
    },
    voice: {
      title: 'Интерактивный голосовой AI',
      subtitle: 'Живой диалог в реальном времени с поддержкой 4 языков и распознаванием речи.',
      statusReady: 'Готов к общению. Нажмите на микрофон.',
      statusListening: 'Слушаю вас... Говорите свободно.',
      statusThinking: 'AI думает над ответом...',
      statusSpeaking: 'AI отвечает голосом...',
      tapToSpeak: 'Нажмите, чтобы говорить',
      stopSpeaking: 'Остановить воспроизведение',
      continuousMode: 'Непрерывный режим диалога',
      voiceOutputLabel: 'Озвучивать ответы голосом',
      transcriptPlaceholder: 'Здесь появится транскрипт вашего голосового разговора...',
    },
    seo: {
      title: 'Google Search Console & SEO Индексация',
      subtitle: 'Полная подготовка Tochkas AI к подтверждению в Google Search Console и появлению в поиске Google.',
      domainLabel: 'Укажите домен вашего сайта',
      domainPlaceholder: 'например: tochkas-ai.com или my-app.run.app',
      verifyStatus: 'Статус верификации Google:',
      verified: 'Подтверждено в Google',
      unverified: 'Готово к подтверждению',
      methodsTitle: 'Способы подтверждения владения доменом:',
      htmlFileTitle: '1. Подтверждение через HTML-файл',
      htmlFileDesc: 'Google выдаёт файл вида google1234567890abcdef.html. Введите ваш верификационный код ниже, и Tochkas AI мгновенно откроет публичный маршрут для робота Google!',
      metaHtmlTitle: '2. Подтверждение через HTML-тег <meta>',
      metaHtmlDesc: 'Вставка проверочного тега google-site-verification в секцию <head> сайта.',
      dnsTxtTitle: '3. Подтверждение через DNS-запись TXT',
      dnsTxtDesc: 'Добавление записи google-site-verification=... в настройках домена у регистратора (Namecheap, Cloudflare, Reg.ru).',
      sitemapTitle: 'Карта сайта sitemap.xml',
      sitemapDesc: 'Сгенерирована автоматически со всеми мультиязычными маршрутами и приоритетом индексации 1.0.',
      viewSitemap: 'Открыть /sitemap.xml',
      robotsTitle: 'Файл robots.txt',
      robotsDesc: 'Настроен для поисковых роботов Googlebot с прямой ссылкой на карту сайта.',
      viewRobots: 'Открыть /robots.txt',
      auditTitle: 'Проверка готовности к поисковой индексации',
      runAudit: 'Запустить экспресс-аудит SEO',
      auditPassed: 'Все ключевые проверки пройдены!',
      auditScore: 'Оценка готовности к Google:',
      googleConsoleLink: 'Перейти в Google Search Console →',
      consoleInstruction: 'Пошаговый алгоритм: 1) Добавьте ваш URL ресурс в Search Console, 2) Выберите метод "HTML-файл" или "HTML-тег", 3) Введите код выше, 4) Нажмите "Подтвердить", 5) Отправьте sitemap.xml в разделе "Файлы Sitemap".',
      importantDisclaimer: 'Важное напоминание: Google Search Console индексирует страницы после отправки в течение нескольких дней. Мы подготовили 100% технических требований для успешного одобрения!',
    },
    replit: {
      title: 'Круглосуточный хостинг & Replit',
      subtitle: 'Инструкция по развертыванию Tochkas AI для непрерывной 24/7 работы с HTTPS и доменом.',
      step1Title: '1. Автономный Node.js сервер',
      step1Desc: 'Проект уже укомплектован файлом server.ts, объединяющим Express API и Vite сборку на порту 3000.',
      step2Title: '2. Конфигурация Replit (.replit & replit.nix)',
      step2Desc: 'Готовые файлы конфигурации для автоматического запуска и Replit Always-On / Deployments.',
      step3Title: '3. Привязка собственного домена',
      step3Desc: 'В настройках хостинга (Custom Domain) добавьте CNAME или A-запись на предоставленный адрес.',
      downloadFiles: 'Скачать конфиг для Replit',
    },
  },

  uz: {
    appName: 'Tochkas AI',
    tagline: "Professional sun'iy intellekt ekotizimi",
    nav: {
      chat: 'AI Chat',
      video: 'Video yaratish',
      images: 'Rasm yaratish',
      youtube: 'YouTube Studiya',
      voice: 'Ovozli AI',
      seo: 'Google Search Console',
      profile: 'Shaxsiy kabinet',
      replitDeploy: 'Nashr & Replit',
    },
    languages: {
      ru: 'Русский',
      uz: "O'zbekcha",
      en: 'English',
      zh: '中文',
    },
    common: {
      loading: 'Yuklanmoqda...',
      generate: 'Yaratish',
      generating: 'Yaratilmoqda...',
      copy: 'Nusxalash',
      copied: 'Nusxalandi!',
      download: 'Yuklab olish',
      save: 'Saqlash',
      saved: 'Saqlandi',
      delete: "O'chirish",
      clear: 'Tozalash',
      micStart: 'Mikrofonni yoqish',
      micStop: "To'xtatish",
      listening: 'Sizni tinglamoqdaman...',
      error: 'Xatolik yuz berdi',
      success: 'Muvaffaqiyatli bajarildi',
      close: 'Yopish',
      cancel: 'Bekor qilish',
      apply: "Qo'llash",
      details: 'Batafsil',
      proFeature: 'PRO Imkoniyat',
      learnMore: "Ko'proq bilish",
    },
    auth: {
      loginWithGoogle: 'Google orqali kirish',
      register: "Google orqali tezkor ro'yxatdan o'tish",
      logout: 'Tizimdan chiqish',
      cabinetTitle: 'Foydalanuvchi shaxsiy kabineti',
      accountDetails: "Profil ma'lumotlari",
      tier: 'Tarif rejasi',
      tokensUsed: 'Sarflangan AI tokenlari',
      generationsCount: 'Saqlangan ishlar',
      historyTitle: "So'rovlar va generatsiyalar tarixi",
      noHistory: "Tarix hozircha bo'sh. Tochkas AI bilan ijod qilishni boshlang!",
      exportHistory: 'Tarixni yuklash (JSON)',
      mockGoogleSuccess: 'Google hisobingiz orqali muvaffaqiyatli kirdingiz!',
      securityNote: 'Google OAuth 2.0 / Firebase Auth orqali toliq xavfsiz shifrlash.',
    },
    chat: {
      title: 'Tochkas Aqlli AI-Chati',
      subtitle: "Ko'p tarmoqli intellekt: Minecraft qoidalari, modlar, YouTube ssenariylari va dasturlash.",
      placeholder: 'Istalgan narsani so‘rang: Minecraft qoidalari, YouTube g‘oyalari, kod yoki modlar...',
      send: 'Yuborish',
      presets: {
        all: 'Barcha mavzular',
        general: 'Umumiy AI',
        minecraft_rules: 'Minecraft qoidalari',
        minecraft_mods: 'Modlar bo‘yicha yordam',
        youtube: 'YouTube ssenariylar',
        code: 'Dasturlash va kod',
      },
      presetDesc: {
        general: 'Barcha savollarga aqlli javoblar, tahlil va matn generatsiyasi.',
        minecraft_rules: 'O‘yin mexanikalari, redstoun, buyruqlar, retseptlar va omon qolish sirlari.',
        minecraft_mods: 'Forge, Fabric, OptiFine, Create, JEI va xatoliklarni bartaraf etish.',
        youtube: 'Virusli kirish so‘zlari, ushlab qolish vaqtlari va tomoshabinni jalb qilish.',
        code: 'Skriptlar, algoritmlar, veb-dasturlash va xatolarni tuzatish.',
      },
      suggestedPrompts: [
        'Minecraft 1.21 da avtomatik temir fermasini qanday qurish mumkin?',
        'Fabric uchun eng yaxshi 5 ta optimizatsiya modlari qaysilar?',
        'Minecraft sirlari haqida qiziqarli YouTube Shorts ssenariysini yozib ber.',
        'Redstoun mexanizmlari qanday ishlashini oddiy qilib tushuntir.',
      ],
      readAloud: 'AI ovozida eshitish',
      stopAudio: "Ovozni to'xtatish",
    },
    video: {
      title: 'AI bilan Video Yaratish',
      subtitle: 'Kinematografik animatsiya va AI ovozi bilan to‘liq professional videoroliklar yaratish.',
      promptLabel: 'Videoni tasvirlab bering',
      promptPlaceholder: 'Masalan: Minecraft o‘yinida faqat professional o‘yinchilar biladigan 3 ta sir...',
      durationLabel: 'Davomiylikni tanlang',
      durations: {
        '10s': '10 soniya (Tizer)',
        '20s': '20 soniya (Shorts kirish)',
        '30s': '30 soniya (Standart)',
        '60s': '60 soniya (Shorts/Reels)',
        '100s': '1 daqiqa 40 soniya (To‘liq rolik)',
      },
      formatLabel: 'Formatni tanlang',
      formats: {
        '16:9': '16:9 (YouTube va TV uchun gorizontal)',
        '9:16': '9:16 (Shorts, Reels, TikTok uchun vertikal)',
        '1:1': '1:1 (Ijtimoiy tarmoqlar uchun kvadrat)',
      },
      voiceLabel: 'AI Ovozini tanlang',
      voices: {
        male_energetic: '1. Erkak (G‘ayratli suxandon)',
        female_natural: '2. Ayol (Tabiiy va yoqimli)',
        male_calm: '3. Erkak sokin (Hujjatli film uslubi)',
        female_expressive: '4. Ayol ta’sirchan (Badiiy hikoyachi)',
      },
      generateBtn: 'Video yaratish',
      renderingMsg: 'Video oqimi render qilinmoqda, sarlavhalar va AI ovozi yozilmoqda...',
      downloadVideo: 'Tayyor videoni yuklab olish (.mp4 / .webm)',
      videoReady: 'Video muvaffaqiyatli yaratildi va yuklab olishga tayyor!',
      cloudNoticeTitle: 'Tochkas AI Haqiqiy Video Dvigateli',
      cloudNoticeDesc: 'Dvigatel real vaqtda animatsion effektlar, sahnalar, kinematik yozuvlar va tanlangan AI ovozini yagona video faylga yig‘ib beradi.',
      apiCostTitle: 'Tashqi bulutli API integratsiyasi (Veo / Omni Flash)',
      apiCostDesc: 'To‘g‘ridan-to‘g‘ri neyrotarmoqli diffuziya uchun Google Cloud Vertex AI pullik hisobi talab qilinadi. Tochkas AI da esa bepul va tezkor mahalliy render dvigateli o‘rnatilgan!',
    },
    images: {
      title: 'Rasm Yaratish Studiyasi',
      subtitle: 'YouTube avatarkalari, muqovalar, Minecraft san’ati va fotorealistik durdonalar.',
      promptLabel: 'Kerakli tasvirni tasvirlang',
      promptPlaceholder: 'Masalan: Qora qal’ada yonib turgan lava nurlaridagi epik nezerit ritsari, 4k...',
      enhancePrompt: 'AI bilan promptni kuchaytirish',
      categoryLabel: 'Tasvir toifasi',
      categories: {
        youtube_avatar: 'YouTube Avatarlar (Yorqin va zamonaviy)',
        youtube_preview: 'YouTube Muqovalar (Ko‘zga tashlanadigan)',
        minecraft: 'Minecraft san’ati (Sheyderlar, bloklar, binolar)',
        realistic: 'Haqiqiy fotosuratlar (Fotorealizm, 8k)',
      },
      aspectRatioLabel: 'O‘lcham va nisbat',
      generateBtn: 'Rasm yaratish',
      downloadBtn: 'Rasmni yuklab olish (PNG)',
      recentImages: 'Oxirgi generatsiyalar',
    },
    youtube: {
      title: 'Tochkas YouTube Studiya',
      subtitle: 'Kontent yaratuvchilar uchun qurol: g‘oyalar, ssenariylar, muqovalar va davomiyliklar.',
      tabs: {
        shorts: 'Shorts g‘oyalari',
        longForm: 'Katta videolar',
        script: 'Ssenariy generatori',
        titles: 'Trend sarlavhalar',
        preview: 'Muqova g‘oyalari',
        sequel: 'Video davomi',
      },
      topicLabel: 'Kanal yoki kelgusi video mavzusi',
      topicPlaceholder: 'Masalan: Minecraftda 100 kun xardkorda omon qolish yoki modlar sharhi...',
      generateIdeas: 'Reja tuzish',
      hooksTitle: 'Dastlabki 3 soniya (Ushlab qoluvchi qism):',
      structureTitle: 'Tuzilma va asosiy sahnalar:',
      sendToImages: 'Image Studiyada muqova chizish →',
    },
    voice: {
      title: 'Interaktiv Ovozli AI',
      subtitle: '4 ta tilda real vaqtda jonli ovozli suhbat va nutqni aniqlash.',
      statusReady: 'Suhbatga tayyor. Mikrofon tugmasini bosing.',
      statusListening: 'Sizni tinglamoqdaman... Gapiring.',
      statusThinking: 'AI javob tayyorlamoqda...',
      statusSpeaking: 'AI ovoz bilan javob bermoqda...',
      tapToSpeak: 'Gapirish uchun bosing',
      stopSpeaking: 'Ovozni to‘xtatish',
      continuousMode: 'Uzluksiz suhbat rejimi',
      voiceOutputLabel: 'Javoblarni ovoz bilan o‘qish',
      transcriptPlaceholder: 'Ovozli suhbatingiz matni bu yerda paydo bo‘ladi...',
    },
    seo: {
      title: 'Google Search Console & SEO',
      subtitle: 'Tochkas AI saytini Google qidiruv tizimiga to‘liq tayyorlash va tasdiqlash vositasi.',
      domainLabel: 'Saytingiz domenini kiriting',
      domainPlaceholder: 'masalan: tochkas-ai.com yoki sizning-sayt.run.app',
      verifyStatus: 'Google tasdiqlash holati:',
      verified: 'Google tomonidan tasdiqlangan',
      unverified: 'Tasdiqlashga tayyor',
      methodsTitle: 'Domen egaligini tasdiqlash usullari:',
      htmlFileTitle: '1. HTML-fayl orqali tasdiqlash',
      htmlFileDesc: 'Google bergan kodni kiriting (google123456.html) va Tochkas AI uni avtomatik ochadi!',
      metaHtmlTitle: '2. HTML <meta> tegi orqali',
      metaHtmlDesc: 'Sayt <head> qismiga google-site-verification meta tegini qo‘shish.',
      dnsTxtTitle: '3. DNS TXT yozuvi orqali',
      dnsTxtDesc: 'Domen boshqaruv panelida TXT yozuvini kiritish.',
      sitemapTitle: 'sitemap.xml sayt xaritasi',
      sitemapDesc: 'Barcha 4 ta tildagi havolalar bilan avtomatik yaratilgan.',
      viewSitemap: '/sitemap.xml ni ko‘rish',
      robotsTitle: 'robots.txt fayli',
      robotsDesc: 'Googlebot qidiruv robotlari uchun to‘liq sozlangan.',
      viewRobots: '/robots.txt ni ko‘rish',
      auditTitle: 'Google indeksatsiyasiga tayyorgarlik tekshiruvi',
      runAudit: 'SEO auditni ishga tushirish',
      auditPassed: 'Barcha asosiy talablar bajarildi!',
      auditScore: 'Google tayyorgarlik darajasi:',
      googleConsoleLink: 'Google Search Console ga o‘tish →',
      consoleInstruction: 'Ko‘rsatma: 1) Search Console ga saytingizni qo‘shing, 2) Tasdiqlash usulini tanlang, 3) Kodni yuqoriga yozing, 4) Tasdiqlash tugmasini bosing, 5) sitemap.xml ni jo‘nating.',
      importantDisclaimer: 'Eslatma: Google qidiruv tizimida chiqish bir necha kun vaqt oladi. Biz saytni 100% texnik talablariga moslab tayyorlab berdik!',
    },
    replit: {
      title: '24/7 Xosting & Replit',
      subtitle: 'Tochkas AI loyihasini uzluksiz kechayu-kunduz internetda ishlashga tayyorlash.',
      step1Title: '1. Mustaqil Node.js server',
      step1Desc: 'Loyiha server.ts fayli orqali Express API va Vite frontendni birga boshqaradi.',
      step2Title: '2. Replit konfiguratsiyasi',
      step2Desc: '.replit va replit.nix fayllari orqali 1 marta bosishda ishga tushirish.',
      step3Title: '3. O‘z domeningizni ulash',
      step3Desc: 'Replit Deployments bo‘limida CNAME yozuvini ulab o‘z domeningizni ishlatishingiz mumkin.',
      downloadFiles: 'Replit konfiguratsiyasini olish',
    },
  },

  en: {
    appName: 'Tochkas AI',
    tagline: 'Professional AI Creation Ecosystem',
    nav: {
      chat: 'AI Chat',
      video: 'Create Video',
      images: 'Generate Images',
      youtube: 'YouTube Studio',
      voice: 'Voice AI',
      seo: 'Google Search Console',
      profile: 'User Cabinet',
      replitDeploy: 'Deploy & Replit',
    },
    languages: {
      ru: 'Русский',
      uz: "O'zbekcha",
      en: 'English',
      zh: '中文',
    },
    common: {
      loading: 'Loading...',
      generate: 'Generate',
      generating: 'Generating...',
      copy: 'Copy',
      copied: 'Copied to clipboard!',
      download: 'Download Result',
      save: 'Save',
      saved: 'Saved',
      delete: 'Delete',
      clear: 'Clear',
      micStart: 'Turn On Mic',
      micStop: 'Stop Recording',
      listening: 'Listening to you...',
      error: 'An error occurred',
      success: 'Completed successfully',
      close: 'Close',
      cancel: 'Cancel',
      apply: 'Apply',
      details: 'Details',
      proFeature: 'PRO Feature',
      learnMore: 'Learn More',
    },
    auth: {
      loginWithGoogle: 'Sign in with Google',
      register: 'Fast Google Registration',
      logout: 'Sign Out',
      cabinetTitle: 'User Profile & Cabinet',
      accountDetails: 'Account Details',
      tier: 'Membership Plan',
      tokensUsed: 'AI Tokens Consumed',
      generationsCount: 'Saved Generations',
      historyTitle: 'Chat & Generation History',
      noHistory: 'History is empty. Start creating masterpieces with Tochkas AI!',
      exportHistory: 'Export History (JSON)',
      mockGoogleSuccess: 'Successfully authenticated with your Google account!',
      securityNote: 'Secure Google OAuth 2.0 / Firebase Auth encryption.',
    },
    chat: {
      title: 'Tochkas Intelligent AI Chat',
      subtitle: 'Multi-task intelligence: Minecraft rules, mods, YouTube scripts, and coding.',
      placeholder: 'Ask anything: Minecraft rules, YouTube ideas, code snippets, or modding...',
      send: 'Send',
      presets: {
        all: 'All Topics',
        general: 'Universal AI',
        minecraft_rules: 'Minecraft Rules',
        minecraft_mods: 'Modding Helper',
        youtube: 'YouTube Scripts',
        code: 'Coding & Dev',
      },
      presetDesc: {
        general: 'Smart answers to any questions, data analysis, and copywriting.',
        minecraft_rules: 'Game mechanics, redstone circuitry, commands, crafting, and Ender Dragon.',
        minecraft_mods: 'Forge, Fabric, OptiFine, Create, JEI, and crash log troubleshooting.',
        youtube: 'Viral hooks, pacing, audience retention, and compelling call-to-actions.',
        code: 'Full-stack code, scripts, algorithms, and bug fixing.',
      },
      suggestedPrompts: [
        'How to build an automated iron farm in Minecraft 1.21?',
        'What are the top 5 optimization mods for Fabric and how to install them?',
        'Write a viral YouTube Shorts script about unknown Minecraft secrets.',
        'Explain redstone tick delay and comparator signal strength simply.',
      ],
      readAloud: 'Read aloud with AI voice',
      stopAudio: 'Stop voice',
    },
    video: {
      title: 'Create Video with AI',
      subtitle: 'Generate complete video clips with cinematic motion graphics and voice narration.',
      promptLabel: 'Describe your video',
      promptPlaceholder: 'E.g.: Top 3 secret Minecraft crafting recipes that only veterans know about...',
      durationLabel: 'Select Duration',
      durations: {
        '10s': '10 seconds (Teaser)',
        '20s': '20 seconds (Shorts Hook)',
        '30s': '30 seconds (Standard)',
        '60s': '60 seconds (Shorts/Reels)',
        '100s': '1 minute 40 seconds (Full Video)',
      },
      formatLabel: 'Select Format',
      formats: {
        '16:9': '16:9 (Horizontal for YouTube & TV)',
        '9:16': '9:16 (Vertical for Shorts, Reels, TikTok)',
        '1:1': '1:1 (Square for Feed & Social Posts)',
      },
      voiceLabel: 'Select AI Voice',
      voices: {
        male_energetic: '1. Male (Energetic Presenter)',
        female_natural: '2. Female (Natural & Clear)',
        male_calm: '3. Male Calm (Documentary Narrator)',
        female_expressive: '4. Female Expressive (Storyteller)',
      },
      generateBtn: 'Generate Video',
      renderingMsg: 'Rendering video frames, animated typography, and synthesizing voice...',
      downloadVideo: 'Download Video File (.mp4 / .webm)',
      videoReady: 'Your video has been rendered and is ready for download!',
      cloudNoticeTitle: 'Tochkas AI Video Engine',
      cloudNoticeDesc: 'Our engine renders real-time storyboard animation, kinetic typography, scene transitions, and syncs voiceover narration into a downloadable video file.',
      apiCostTitle: 'External Cloud Video APIs (Veo / Omni Flash / Runway)',
      apiCostDesc: 'Frame-by-frame diffusion video APIs like Google Veo or Gemini Omni 1.2 Flash require a paid Vertex AI Cloud key (starts at ~$0.15 per 5s). Tochkas AI provides an optimized built-in video generator that renders complete videos for free!',
    },
    images: {
      title: 'Image Studio',
      subtitle: 'Create YouTube avatars, thumbnail covers, Minecraft scenes, and photorealistic art.',
      promptLabel: 'Describe the image you want',
      promptPlaceholder: 'E.g.: Epic Netherite knight standing at the edge of a fortress in fiery lava glow, 4k...',
      enhancePrompt: 'Enhance Prompt with AI',
      categoryLabel: 'Image Category',
      categories: {
        youtube_avatar: 'YouTube Avatars (Vibrant & High Contrast)',
        youtube_preview: 'YouTube Thumbnails (Click-through optimized)',
        minecraft: 'Minecraft Art (Shaders, voxels, blocks)',
        realistic: 'Realistic Photos (Cinematic 8k realism)',
      },
      aspectRatioLabel: 'Aspect Ratio',
      generateBtn: 'Generate Image',
      downloadBtn: 'Download Image (PNG)',
      recentImages: 'Recent Generations',
    },
    youtube: {
      title: 'Tochkas YouTube Studio',
      subtitle: 'Complete creator toolkit: viral concepts, scripts, CTR titles, and thumbnail ideas.',
      tabs: {
        shorts: 'Shorts Ideas',
        longForm: 'Long-form Videos',
        script: 'Script Generator',
        titles: 'Viral Titles',
        preview: 'Thumbnail Ideas',
        sequel: 'Video Sequels',
      },
      topicLabel: 'Channel niche or upcoming video topic',
      topicPlaceholder: 'E.g.: Surviving 100 days in hardcore Minecraft or rare mods review...',
      generateIdeas: 'Generate Content Plan',
      hooksTitle: 'First 3 Seconds Hook (Audience Retention):',
      structureTitle: 'Outline & Key Scenes:',
      sendToImages: 'Generate Thumbnail in Image Studio →',
    },
    voice: {
      title: 'Interactive Voice AI',
      subtitle: 'Live real-time conversational AI in 4 languages with speech recognition.',
      statusReady: 'Ready to chat. Click the microphone button.',
      statusListening: 'Listening to you... Speak now.',
      statusThinking: 'AI is thinking...',
      statusSpeaking: 'AI is speaking...',
      tapToSpeak: 'Click to Speak',
      stopSpeaking: 'Stop Audio Playback',
      continuousMode: 'Continuous Conversation Mode',
      voiceOutputLabel: 'Speak responses aloud',
      transcriptPlaceholder: 'Your conversation transcript will appear here...',
    },
    seo: {
      title: 'Google Search Console & SEO Ready',
      subtitle: 'Equip Tochkas AI for instant verification in Google Search Console and Google indexing.',
      domainLabel: 'Enter Your Website Domain',
      domainPlaceholder: 'e.g., tochkas-ai.com or your-app.run.app',
      verifyStatus: 'Google Verification Status:',
      verified: 'Verified in Google',
      unverified: 'Ready for Verification',
      methodsTitle: 'Domain Ownership Verification Methods:',
      htmlFileTitle: '1. HTML File Verification',
      htmlFileDesc: 'Enter your Google verification token (e.g. google1234567890abcdef.html) to open an active route for Googlebot.',
      metaHtmlTitle: '2. HTML <meta> Verification Tag',
      metaHtmlDesc: 'Insert a google-site-verification meta tag inside the <head> of the website.',
      dnsTxtTitle: '3. DNS TXT Record',
      dnsTxtDesc: 'Add a TXT record with google-site-verification=... in your domain registrar DNS settings.',
      sitemapTitle: 'sitemap.xml Sitemap',
      sitemapDesc: 'Generated with all multilingual routes and priority 1.0 for search engines.',
      viewSitemap: 'View /sitemap.xml',
      robotsTitle: 'robots.txt Configuration',
      robotsDesc: 'Configured for Googlebot with direct sitemap indexation links.',
      viewRobots: 'View /robots.txt',
      auditTitle: 'Search Engine Indexation Audit',
      runAudit: 'Run Express SEO Audit',
      auditPassed: 'All key SEO checks passed!',
      auditScore: 'Google Readiness Score:',
      googleConsoleLink: 'Go to Google Search Console →',
      consoleInstruction: 'Step-by-step: 1) Add URL prefix property in Google Search Console, 2) Select verification method, 3) Enter code above, 4) Click Verify, 5) Submit sitemap.xml in Sitemaps tab.',
      importantDisclaimer: 'Please note: Google Search Console crawls and indexes pages over a few days. Tochkas AI has 100% of the technical foundation prepared!',
    },
    replit: {
      title: '24/7 Hosting & Replit',
      subtitle: 'Guidelines to deploy Tochkas AI for non-stop round-the-clock availability with HTTPS.',
      step1Title: '1. Autonomous Node.js Server',
      step1Desc: 'Runs with server.ts combining Express API and Vite frontend on port 3000.',
      step2Title: '2. Replit Setup (.replit & replit.nix)',
      step2Desc: 'Configured for one-click launch and Replit Always-On deployments.',
      step3Title: '3. Custom Domain Setup',
      step3Desc: 'Attach your own domain via CNAME or A records in your hosting dashboard.',
      downloadFiles: 'Download Replit Config',
    },
  },

  zh: {
    appName: 'Tochkas AI',
    tagline: '专业级多功能人工智能生态系统',
    nav: {
      chat: 'AI 对话',
      video: '生成视频',
      images: '生成图片',
      youtube: 'YouTube 工作室',
      voice: '语音 AI',
      seo: 'Google Search Console',
      profile: '个人中心',
      replitDeploy: '部署与 Replit',
    },
    languages: {
      ru: 'Русский',
      uz: "O'zbekcha",
      en: 'English',
      zh: '中文',
    },
    common: {
      loading: '加载中...',
      generate: '生成',
      generating: '正在生成...',
      copy: '复制',
      copied: '已复制到剪贴板！',
      download: '下载结果',
      save: '保存',
      saved: '已保存',
      delete: '删除',
      clear: '清空',
      micStart: '开启麦克风',
      micStop: '停止录音',
      listening: '正在倾听...',
      error: '发生错误',
      success: '操作成功',
      close: '关闭',
      cancel: '取消',
      apply: '应用',
      details: '详情',
      proFeature: 'PRO 功能',
      learnMore: '了解更多',
    },
    auth: {
      loginWithGoogle: '使用 Google 登录',
      register: 'Google 快捷注册',
      logout: '退出登录',
      cabinetTitle: '用户个人中心',
      accountDetails: '账户信息',
      tier: '当前方案',
      tokensUsed: '已消耗 AI 代币',
      generationsCount: '保存的作品数',
      historyTitle: '对话与生成历史记录',
      noHistory: '历史记录为空。立即使用 Tochkas AI 开启您的创作！',
      exportHistory: '导出历史数据 (JSON)',
      mockGoogleSuccess: '已成功通过 Google 账户授权登录！',
      securityNote: '采用 Google OAuth 2.0 / Firebase 安全身份验证。',
    },
    chat: {
      title: 'Tochkas 智能 AI 助手',
      subtitle: '多任务全能模型：解答问题、Minecraft 规则、模组指南、YouTube 剧本与代码编写。',
      placeholder: '请输入任何问题：Minecraft 机制、YouTube 创意、代码或模组...',
      send: '发送',
      presets: {
        all: '全部主题',
        general: '通用 AI',
        minecraft_rules: 'Minecraft 规则',
        minecraft_mods: '模组助手',
        youtube: 'YouTube 剧本',
        code: '编程开发',
      },
      presetDesc: {
        general: '智能回答各种问题，数据分析与优质文案创作。',
        minecraft_rules: '游戏机制、红石电路、指令系统、合成配方与末影龙攻略。',
        minecraft_mods: 'Forge、Fabric、OptiFine、Create、JEI 及崩溃日志诊断。',
        youtube: '爆款黄金前三秒钩子、节奏把控、观众留存与行动号召。',
        code: '全栈编程、脚本自动化、算法实现与代码排错。',
      },
      suggestedPrompts: [
        '如何在 Minecraft 1.21 中建造高效全自动刷铁机？',
        'Fabric 必备的前 5 款性能优化模组及安装步骤？',
        '请写一段关于 Minecraft 不为人知的冷知识爆款 Shorts 脚本。',
        '通俗解释红石刻延迟与比较器信号强度的运作原理。',
      ],
      readAloud: 'AI 语音朗读',
      stopAudio: '停止朗读',
    },
    video: {
      title: 'AI 视频生成工作室',
      subtitle: '生成带有动态视效、字幕排版与 AI 语音配音的完整视频。',
      promptLabel: '描述您的视频内容',
      promptPlaceholder: '例如：Minecraft 只有骨灰级老玩家才知道的 3 大秘密合成配方...',
      durationLabel: '选择时长',
      durations: {
        '10s': '10 秒 (预告片)',
        '20s': '20 秒 (Shorts 黄金钩子)',
        '30s': '30 秒 (标准时长)',
        '60s': '60 秒 (Shorts/Reels)',
        '100s': '1 分 40 秒 (完整视频)',
      },
      formatLabel: '选择画面比例',
      formats: {
        '16:9': '16:9 (YouTube & 电脑横屏)',
        '9:16': '9:16 (Shorts、TikTok 竖屏)',
        '1:1': '1:1 (社交媒体方形)',
      },
      voiceLabel: '选择 AI 配音',
      voices: {
        male_energetic: '1. 男声 (活力主播)',
        female_natural: '2. 女声 (自然清晰)',
        male_calm: '3. 男声沉稳 (纪录片旁白)',
        female_expressive: '4. 女声富有表现力 (故事叙述者)',
      },
      generateBtn: '立即生成视频',
      renderingMsg: '正在渲染画面帧、动态排版及合成 AI 语音...',
      downloadVideo: '下载视频文件 (.mp4 / .webm)',
      videoReady: '视频已生成完毕，可立即下载与分享！',
      cloudNoticeTitle: 'Tochkas AI 自研视频渲染引擎',
      cloudNoticeDesc: '实时合成动态动画图层、电影级字幕与选定的 AI 语音，直接打包为真正的视频文件。',
      apiCostTitle: '外部云端 API 说明 (Veo / Omni Flash / Runway)',
      apiCostDesc: '纯逐帧神经扩散模型 (如 Google Veo 或 Gemini Omni 1.2 Flash) 需配置付费 Google Cloud Vertex AI 密钥 (单次 5 秒成本约 $0.15 起)。Tochkas AI 内置免费高效本地引擎，开箱即用！',
    },
    images: {
      title: '图片创作工坊',
      subtitle: '生成 YouTube 头像、高清封面、Minecraft 建筑概念与逼真写真。',
      promptLabel: '描述您想要生成的图片',
      promptPlaceholder: '例如：地狱堡垒熔岩光芒中身披下界合金铠甲的史诗骑士，4k 画质...',
      enhancePrompt: 'AI 智能扩展 Prompt',
      categoryLabel: '图片分类',
      categories: {
        youtube_avatar: 'YouTube 头像 (高对比明亮风格)',
        youtube_preview: 'YouTube 封面图 (高点击率设计)',
        minecraft: 'Minecraft 艺术 (光影、体素、方块)',
        realistic: '超现实写实 (8k 电影级质感)',
      },
      aspectRatioLabel: '选择尺寸比例',
      generateBtn: '生成图片',
      downloadBtn: '下载原图 (PNG)',
      recentImages: '最近生成的图片',
    },
    youtube: {
      title: 'Tochkas YouTube 创作者中心',
      subtitle: '从创意灵感、分镜脚本、爆款标题到封面设计的全套创作套件。',
      tabs: {
        shorts: 'Shorts 灵感',
        longForm: '长视频企划',
        script: '剧本生成器',
        titles: '爆款标题库',
        preview: '封面设计灵感',
        sequel: '续集规划',
      },
      topicLabel: '频道领域或下期视频主题',
      topicPlaceholder: '例如：在极限 Minecraft 中生存 100 天或冷门模组评测...',
      generateIdeas: '生成创作企划',
      hooksTitle: '黄金前 3 秒吸引力钩子：',
      structureTitle: '结构框架与关键分镜：',
      sendToImages: '去图片工坊生成封面 →',
    },
    voice: {
      title: '实时语音交互 AI',
      subtitle: '支持 4 种语言的实时语音对话与智能语音识别。',
      statusReady: '已就绪。点击麦克风开始交谈。',
      statusListening: '正在倾听... 请说话。',
      statusThinking: 'AI 正在思考中...',
      statusSpeaking: 'AI 正在语音回答...',
      tapToSpeak: '点击开始说话',
      stopSpeaking: '停止语音朗读',
      continuousMode: '连续对话模式',
      voiceOutputLabel: '语音朗读 AI 回复',
      transcriptPlaceholder: '您的语音对话记录将显示在这里...',
    },
    seo: {
      title: 'Google Search Console 与 SEO 优化',
      subtitle: '让 Tochkas AI 网站快速通过 Google Search Console 验证并被 Google 搜索引擎收录。',
      domainLabel: '填写您的网站域名',
      domainPlaceholder: '例如：tochkas-ai.com 或 my-app.run.app',
      verifyStatus: 'Google 验证状态：',
      verified: '已通过 Google 验证',
      unverified: '待验证',
      methodsTitle: '所有权验证的三种方式：',
      htmlFileTitle: '1. HTML 文件验证',
      htmlFileDesc: '输入 Google 提供的验证代码 (如 google12345.html)，Tochkas AI 后端会自动提供对应的公开验证路由！',
      metaHtmlTitle: '2. HTML <meta> 标签验证',
      metaHtmlDesc: '在网页 <head> 中插入 google-site-verification 元标记。',
      dnsTxtTitle: '3. DNS TXT 记录验证',
      dnsTxtDesc: '在域名解析商 (如 Cloudflare, 阿里云, Namecheap) 添加 TXT 记录。',
      sitemapTitle: 'sitemap.xml 网站地图',
      sitemapDesc: '自动包含 4 种语言的完整路径，优先级 1.0。',
      viewSitemap: '查看 /sitemap.xml',
      robotsTitle: 'robots.txt 爬虫协议',
      robotsDesc: '已针对 Googlebot 全面放行并关联 sitemap。',
      viewRobots: '查看 /robots.txt',
      auditTitle: 'Google 收录就绪自检',
      runAudit: '运行 SEO 快速自检',
      auditPassed: '全部核心 SEO 检查通过！',
      auditScore: 'Google 收录就绪指数：',
      googleConsoleLink: '前往 Google Search Console →',
      consoleInstruction: '操作流程：1) 在 Search Console 添加网址前缀，2) 选择 HTML 文件或元标记，3) 在上方输入代码，4) 点击验证，5) 在站点地图选项中提交 sitemap.xml。',
      importantDisclaimer: '特别说明：提交后 Google 爬虫通常需要数天完成审核与索引。我们已为您准备好 100% 的技术规范与文件！',
    },
    replit: {
      title: '24/7 在线托管与 Replit',
      subtitle: '部署 Tochkas AI，实现全天候稳定运行、自带 HTTPS 与绑定自定义域名。',
      step1Title: '1. 独立 Node.js 全栈服务端',
      step1Desc: '内置 server.ts，整合 Express API 与 Vite 前端，统一运行在 3000 端口。',
      step2Title: '2. Replit 配置文件',
      step2Desc: '包含 .replit 与 replit.nix，一键导入并支持 Always-On 后台守护。',
      step3Title: '3. 绑定独立域名',
      step3Desc: '在部署控制台添加 CNAME 解析记录，即可使用专属个性域名。',
      downloadFiles: '下载 Replit 配置文件',
    },
  },
};
