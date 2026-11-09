import React, { useState } from 'react';
import { YouTubeIdea, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Youtube, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  Film, 
  FileText, 
  Hash, 
  Image as ImageIcon, 
  Repeat, 
  Loader2 
} from 'lucide-react';

interface YouTubeStudioProps {
  currentLang: Language;
  onNavigateToImages: () => void;
  onSaveToHistory: (type: string, prompt: string, result: string) => void;
}

export const YouTubeStudio: React.FC<YouTubeStudioProps> = ({
  currentLang,
  onNavigateToImages,
  onSaveToHistory,
}) => {
  const t = translations[currentLang];

  const [activeSubTab, setActiveSubTab] = useState<
    'shorts' | 'longForm' | 'script' | 'titles' | 'preview' | 'sequel'
  >('shorts');

  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const subTabs = [
    { id: 'shorts', label: t.youtube.tabs.shorts, icon: <Film className="h-4 w-4" /> },
    { id: 'longForm', label: t.youtube.tabs.longForm, icon: <Youtube className="h-4 w-4" /> },
    { id: 'script', label: t.youtube.tabs.script, icon: <FileText className="h-4 w-4" /> },
    { id: 'titles', label: t.youtube.tabs.titles, icon: <Hash className="h-4 w-4" /> },
    { id: 'preview', label: t.youtube.tabs.preview, icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'sequel', label: t.youtube.tabs.sequel, icon: <Repeat className="h-4 w-4" /> },
  ];

  const handleGenerate = async () => {
    if (!topic.trim() || isGenerating) return;
    setIsGenerating(true);

    const promptsMap: Record<string, string> = {
      shorts: `Создай 3 вирусных идеи для YouTube Shorts на тему: "${topic}". Для каждой идеи укажи:
1. Заголовок Shorts.
2. Первые 3 секунды (Хук для 100% удержания).
3. Пошаговый сценарий на 40-50 секунд.
4. Описание и 5 вирусных тегов.`,

      longForm: `Разработай полноценный контент-план длинного видео (10-15 минут) на тему: "${topic}":
1. Кликабельный заголовок с высоким CTR.
2. Концепция обложки (Превью).
3. Подробная структура сценария (Вступление, 4 основных блока, Кульминация, CTA).
4. Оптимизированное SEO-описание для поисковой выдачи YouTube.`,

      script: `Напиши готовый профессиональный сценарий ролика на тему: "${topic}":
- [0:00 - 0:10] Интригующий хук.
- [0:10 - 0:30] Завязка и обещание ценности.
- [0:30 - 3:00] Часть 1: Суть проблемы и демонстрация.
- [3:00 - 6:00] Часть 2: Главный секрет / Лайфхак.
- [6:00 - Финал] Заключение, призыв поставить лайк и подписаться.`,

      titles: `Сгенерируй 10 кликабельных заголовков с высоким CTR (Click-Through-Rate) для ролика: "${topic}".
Раздели их на категории:
- Интригующие ("Я попробовал...")
- Секретные / Топовые ("99% игроков не знают...")
- Вызов / Челлендж ("Смогу ли я...")
- Сравнение / Аналитика.`,

      preview: `Создай 3 детальных концепта для превью (Thumbnail) на тему: "${topic}":
Для каждого концепта опиши:
1. Текст на превью (максимум 2-3 слова крупным шрифтом).
2. Главный персонаж или объект в фокусе.
3. Эмоция на лице (шок, удивление, триумф).
4. Цветовая палитра и задний план (контраст желтого, красного и синего).
5. Готовый текстовый промпт, который можно вставить в Tochkas AI Image Studio!`,

      sequel: `Создай план франшизы / серии продолжений для видео: "${topic}":
1. Идея для Части 2 (Сиквел): повышение сложности.
2. Идея для Части 3 (Кульминация серии).
3. Как связать ролики подсказками и конечными заставками.`,
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptsMap[activeSubTab] || promptsMap.shorts,
          preset: 'youtube',
          language: currentLang,
        }),
      });

      const data = await res.json();
      setGeneratedResult(data.text || 'План успешно сформирован.');
      onSaveToHistory('youtube', `${activeSubTab}: ${topic}`, data.text);
    } catch (err: any) {
      alert('Ошибка при генерации: ' + (err?.message || err));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-amber-500/15 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950">
            <Youtube className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{t.youtube.title}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{t.youtube.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Sub-tabs bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {subTabs.map((st) => (
          <button
            key={st.id}
            onClick={() => setActiveSubTab(st.id as any)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all ${
              activeSubTab === st.id
                ? 'border-amber-400 bg-amber-500/15 text-amber-300 shadow-md shadow-amber-500/10'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {st.icon}
            <span>{st.label}</span>
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="rounded-2xl border border-amber-500/25 bg-slate-900/80 p-5 shadow-xl space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
            {t.youtube.topicLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.youtube.topicPlaceholder}
              className="flex-1 rounded-xl border border-slate-800 bg-[#070c18] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              disabled={isGenerating}
            />

            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Генерация...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>{t.youtube.generateIdeas}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-500">Примеры тем:</span>
          {[
            'Выживание 100 дней в Minecraft',
            'Секреты редстоун ферм',
            'Топ-5 модов оптимизации',
            'Как победить Вардена без брони',
          ].map((ex, i) => (
            <button
              key={i}
              onClick={() => setTopic(ex)}
              className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-slate-400 hover:border-amber-500/40 hover:text-amber-300 transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Result Card */}
      {generatedResult && (
        <div className="rounded-2xl border border-amber-500/20 bg-slate-900/90 p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span>Результат Tochkas YouTube Studio</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 hover:border-amber-400 transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? t.common.copied : t.common.copy}</span>
              </button>

              <button
                onClick={onNavigateToImages}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition-all"
              >
                <span>{t.youtube.sendToImages}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200 font-normal">
            {generatedResult}
          </div>
        </div>
      )}
    </div>
  );
};
