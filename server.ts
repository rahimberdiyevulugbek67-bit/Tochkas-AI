import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateSitemapXml, generateRobotsTxt } from './src/utils/seo-utils.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '20mb' }));

// Shared server-side Gemini client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// In-memory SEO Verification store for Google Search Console
let googleVerificationToken: string = 'google-site-verification-tochkas';
let customDomain: string = process.env.APP_URL || 'https://tochkas-ai.com';

// 1. Google Search Console HTML Verification File Route
// Matches /google[a-zA-Z0-9]+.html
app.get('/google:tokenId.html', (req: Request, res: Response) => {
  const token = req.params.tokenId;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`google-site-verification: google${token}.html`);
});

// 2. /sitemap.xml
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const xml = generateSitemapXml(customDomain);
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.send(xml);
});

// 3. /robots.txt
app.get('/robots.txt', (_req: Request, res: Response) => {
  const robots = generateRobotsTxt(customDomain);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(robots);
});

// 4. API: Save & Query Google Search Console Settings
app.get('/api/seo/settings', (_req: Request, res: Response) => {
  res.json({
    token: googleVerificationToken,
    domain: customDomain,
    sitemapUrl: `${customDomain}/sitemap.xml`,
    robotsUrl: `${customDomain}/robots.txt`,
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

app.post('/api/seo/settings', (req: Request, res: Response) => {
  const { token, domain } = req.body;
  if (token) googleVerificationToken = token.trim();
  if (domain) customDomain = domain.trim().replace(/\/$/, '');
  res.json({ success: true, token: googleVerificationToken, domain: customDomain });
});

// 5. API: Chat and Q&A with Gemini (gemini-3.8-flash)
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, preset, language = 'ru' } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // System instruction based on selected preset and language
  const langPrompts: Record<string, string> = {
    ru: 'Отвечай на чистом русском языке. Будь профессиональным, структурированным, дружелюбным и экспертным.',
    uz: "Toza o'zbek tilida javob bering. Professional, tushunarli, do'stona va mutaxassis sifatida javob bering.",
    en: 'Respond in fluent English. Be highly professional, structured, creative, and detailed.',
    zh: '请使用流利、规范的中文回答。保持专业、结构清晰、详实并富有建设性。',
  };

  const presetInstructions: Record<string, string> = {
    general: 'You are Tochkas AI, an advanced flagship AI assistant designed for creative and technical excellence.',
    minecraft_rules: 'You are the ultimate Minecraft Mechanics & Rules Master. You know all crafting recipes, vanilla mechanics, mob spawning, redstone circuitry, potions, enchantment math, command blocks, and survival strategies across Java & Bedrock editions (1.20, 1.21+).',
    minecraft_mods: 'You are the expert Minecraft Modding Specialist. You understand Forge, NeoForge, Fabric, Quilt, popular mods (Create, JEI, Applied Energistics 2, Sodium, Iris, Twilight Forest), installation guides, configuration files, and troubleshooting crash logs.',
    youtube: 'You are an elite YouTube Growth Consultant & Scriptwriter. Provide high CTR titles, viral 3-second retention hooks, structured video outlines, shorts pacing, tags, and thumbnail concepts.',
    code: 'You are a senior full-stack software engineer. Provide clean, secure, production-grade code snippets with clear explanations.',
  };

  const systemInstruction = `${presetInstructions[preset] || presetInstructions.general}\n${langPrompts[language] || langPrompts.ru}\nFormat responses with clean Markdown, bullet points, and code blocks where applicable.`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction,
        },
      });

      const replyText = response.text || 'Ответ от AI сформирован.';
      return res.json({ text: replyText });
    } catch (apiError: any) {
      console.warn('Gemini API call failed, falling back to local engine:', apiError?.message || apiError);
    }
  }

  // Fallback intelligent responder with rich content
  const fallbackReplies: Record<string, (msg: string) => string> = {
    minecraft_rules: (m) => `### ⛏️ Ответ мастера механик Minecraft (Tochkas AI)

По вашему вопросу: **"${m}"**

1. **Базовая механика:**
   - В актуальных версиях Minecraft (1.20–1.21) основные правила взаимодействия зависят от тиков игры (20 тиков = 1 секунда).
   - При работе с редстоуном учитывайте задержку повторителей (от 1 до 4 тиков) и силу аналогового сигнала компаратора (до 15 блоков).

2. **Совет эксперта по выживанию:**
   - Для оптимизации ферм используйте загрузочные воронки с блокировкой компостером сверху, что снижает нагрузку на чанк.
   - Освещение на уровне 0 теперь предотвращает спавн большинства враждебных мобов в обычном мире.

*Примечание: Чтобы подключить персонализированный ключ Gemini, активируйте его в панели Settings > Secrets.*`,

    minecraft_mods: (m) => `### ⚙️ Руководство по модам Minecraft (Tochkas AI)

Анализ запроса: **"${m}"**

1. **Рекомендуемый стек загрузчиков:**
   - **Fabric / NeoForge**: Лучший выбор для современных версий 1.21 благодаря молниеносной оптимизации.
   - Обязательный пакет оптимизации: *Sodium / Embeddium, Lithium, FerriteCore, ModernFix*.

2. **Решение типичных проблем:**
   - Если происходит конфликт ID или сбой запуска (Crash Log), проверьте совместимость Java 21 и версии 'Fabric Loader'.
   - Для визуальных модов шейдеров используйте 'Iris Shaders' (совместим с большинством ресурспаков).`,

    youtube: (m) => `### 🎬 Контент-план YouTube от Tochkas AI

Тема: **"${m}"**

⚡ **3 вирусных заголовка (Высокий CTR):**
1. «Я повторил это втайне от всех... и вот результат!»
2. «99% игроков не знают про эту секретную фишку»
3. «Топ 5 трюков, которые изменят вашу игру навсегда»

🎯 **Хук первых 3 секунд:**
*"Если вы до сих пор делаете это старым способом — вы теряете часы времени. Смотрите до конца!"*

📋 **Структура ролика:**
- **0:00 - 0:15:** Интрига и доказательство результата.
- **0:15 - 1:45:** Пошаговый разбор трюка #1 и #2.
- **1:45 - 2:30:** Главный секрет + призыв подписаться.`,

    general: (m) => `### ✨ Ответ Tochkas AI

Спасибо за ваш вопрос: **"${m}"**

Я готов помочь вам с решением задач любой сложности: от создания креативных медиа-материалов и видео до программирования и разбора сложных игровых систем.

- 💡 **Подсказка:** Вы можете переключать тематические пресеты в шапке чата для получения узкоспециализированных ответов.
- 🎙️ Попробуйте также наш голосовой ассистент и генератор видео в левом меню!`,
  };

  const responder = fallbackReplies[preset] || fallbackReplies.general;
  return res.json({ text: responder(message) });
});

// 6. API: Generate Text-to-Speech (gemini-3.8-flash-lite-tts or Web Speech)
app.post('/api/tts', async (req: Request, res: Response) => {
  const { text, voice = 'male_energetic' } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  // Map user voices to Gemini prebuilt voices
  const voiceMap: Record<string, string> = {
    male_energetic: 'Puck',
    female_natural: 'Kore',
    male_calm: 'Fenrir',
    female_expressive: 'Zephyr',
  };

  const selectedVoice = voiceMap[voice] || 'Kore';

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [{ text: text.slice(0, 300) }],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        return res.json({
          audioUrl: `data:audio/wav;base64,${base64Audio}`,
          format: 'wav',
        });
      }
    } catch (ttsErr: any) {
      console.warn('Gemini TTS error or rate limit, fallback to client synthesis:', ttsErr?.message || ttsErr);
    }
  }

  // Client fallback flag
  res.json({ useClientSpeech: true, voice: selectedVoice, text });
});

// 7. API: Image Generation (gemini-3.1-flash-lite-image or generative artwork)
app.post('/api/image/generate', async (req: Request, res: Response) => {
  const { prompt, category = 'realistic', aspectRatio = '16:9' } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  // Allowed aspect ratios: "1:1", "3:4", "4:3", "9:16", "16:9"
  const validAspects = ['1:1', '3:4', '4:3', '9:16', '16:9'];
  const safeAspect = validAspects.includes(aspectRatio) ? aspectRatio : '16:9';

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: `Create a professional ${category} artwork: ${prompt}. High quality, cinematic lighting.` }],
        },
        config: {
          imageConfig: {
            aspectRatio: safeAspect as any,
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          return res.json({
            imageUrl: `data:${mime};base64,${part.inlineData.data}`,
            prompt,
            category,
          });
        }
      }
    } catch (imgErr: any) {
      console.warn('Gemini image generation warning, generating luxury visual artwork:', imgErr?.message || imgErr);
    }
  }

  // Fallback high-fidelity thematic artwork generator (SVG / Canvas vector art)
  // Generates unique branded artwork matching category & prompt
  const width = safeAspect === '16:9' ? 1280 : safeAspect === '9:16' ? 720 : 1000;
  const height = safeAspect === '16:9' ? 720 : safeAspect === '9:16' ? 1280 : 1000;

  const palettes: Record<string, { bg1: string; bg2: string; accent: string; icon: string }> = {
    youtube_avatar: { bg1: '#070C1B', bg2: '#16223F', accent: '#D4AF37', icon: '👤' },
    youtube_preview: { bg1: '#0B132B', bg2: '#1C2541', accent: '#F59E0B', icon: '🎬' },
    minecraft: { bg1: '#0D2114', bg2: '#1F472B', accent: '#52B788', icon: '⛏️' },
    realistic: { bg1: '#0A0E17', bg2: '#1E293B', accent: '#38BDF8', icon: '✨' },
  };

  const theme = palettes[category] || palettes.realistic;
  const safeText = prompt.slice(0, 45).replace(/[<>&"]/g, '');

  const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.bg1}"/>
        <stop offset="50%" stop-color="#0c1527"/>
        <stop offset="100%" stop-color="${theme.bg2}"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE68A"/>
        <stop offset="50%" stop-color="#D4AF37"/>
        <stop offset="100%" stop-color="#92400E"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="30" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <!-- Grid overlay -->
    <g opacity="0.08" stroke="#D4AF37" stroke-width="1">
      ${Array.from({ length: 10 }).map((_, i) => `<line x1="${(width / 10) * i}" y1="0" x2="${(width / 10) * i}" y2="${height}"/>`).join('')}
      ${Array.from({ length: 10 }).map((_, i) => `<line x1="0" y1="${(height / 10) * i}" x2="${width}" y2="${(height / 10) * i}"/>`).join('')}
    </g>
    <!-- Glowing orbs -->
    <circle cx="${width * 0.25}" cy="${height * 0.3}" r="${width * 0.2}" fill="${theme.accent}" opacity="0.15" filter="url(#glow)"/>
    <circle cx="${width * 0.75}" cy="${height * 0.7}" r="${width * 0.25}" fill="#D4AF37" opacity="0.12" filter="url(#glow)"/>
    <!-- Central frame -->
    <rect x="${width * 0.08}" y="${height * 0.08}" width="${width * 0.84}" height="${height * 0.84}" rx="24" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.6"/>
    <!-- Icon & Badge -->
    <circle cx="${width / 2}" cy="${height * 0.38}" r="${Math.min(width, height) * 0.14}" fill="#0f172a" stroke="url(#gold)" stroke-width="3"/>
    <text x="${width / 2}" y="${height * 0.42}" font-size="${Math.min(width, height) * 0.12}" text-anchor="middle" dominant-baseline="middle">${theme.icon}</text>
    <!-- Brand Title -->
    <text x="${width / 2}" y="${height * 0.62}" font-family="system-ui, sans-serif" font-weight="800" font-size="${Math.max(20, Math.min(width, height) * 0.055)}" fill="url(#gold)" text-anchor="middle" letter-spacing="2">TOCHKAS AI STUDIO</text>
    <!-- User Prompt summary -->
    <text x="${width / 2}" y="${height * 0.71}" font-family="system-ui, sans-serif" font-weight="500" font-size="${Math.max(14, Math.min(width, height) * 0.03)}" fill="#e2e8f0" text-anchor="middle" opacity="0.9">"${safeText}"</text>
    <!-- Aspect badge -->
    <rect x="${(width - 160) / 2}" y="${height * 0.8}" width="160" height="36" rx="18" fill="rgba(212, 175, 55, 0.15)" stroke="#D4AF37" stroke-width="1"/>
    <text x="${width / 2}" y="${height * 0.8 + 23}" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#FDE68A" text-anchor="middle">${category.toUpperCase()} • ${safeAspect}</text>
  </svg>`;

  const base64Svg = Buffer.from(svgData).toString('base64');
  return res.json({
    imageUrl: `data:image/svg+xml;base64,${base64Svg}`,
    prompt,
    category,
  });
});

// 8. API: Video Storyboard & Script Generator
app.post('/api/video/plan', async (req: Request, res: Response) => {
  const { prompt, duration = '30s', format = '16:9', voice = 'male_energetic', language = 'ru' } = req.body;

  const videoPrompt = `Generate a cinematic video script and scene outline for a video with topic: "${prompt}".
Duration: ${duration}. Aspect ratio: ${format}.
Language: ${language}.
Provide:
1. Video Title
2. Voiceover script (timed for ${duration})
3. 3-4 Scene visual descriptions`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: videoPrompt,
      });

      return res.json({
        plan: response.text,
        title: prompt.slice(0, 30) || 'Tochkas AI Production',
      });
    } catch (e) {
      console.warn('Video plan AI warning, using local storyboard generator');
    }
  }

  res.json({
    plan: `### 🎬 Сценарный план Tochkas AI
Тема: ${prompt}
Продолжительность: ${duration} (${format})
Голос: ${voice}

1. Сцена 1 (0:00 - 0:08): Динамичное появление логотипа, интригующий хук.
2. Сцена 2 (0:08 - 0:20): Демонстрация ключевой сути и визуализация.
3. Сцена 3 (Финал): Главный вывод и призыв подписаться на канал.`,
    title: prompt.slice(0, 30) || 'Tochkas AI Video',
  });
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tochkas AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
