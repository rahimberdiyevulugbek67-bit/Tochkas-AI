import React, { useState } from 'react';
import { ImageCategory, ImageAspectRatio, GeneratedImage, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Image as ImageIcon, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Maximize2, 
  Eye, 
  Loader2, 
  Wand2 
} from 'lucide-react';

interface ImageStudioProps {
  currentLang: Language;
  onSaveToHistory: (type: string, prompt: string, result: string) => void;
}

export const ImageStudio: React.FC<ImageStudioProps> = ({ currentLang, onSaveToHistory }) => {
  const t = translations[currentLang];

  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState<ImageCategory>('youtube_preview');
  const [aspectRatio, setAspectRatio] = useState<ImageAspectRatio>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [recentImages, setRecentImages] = useState<GeneratedImage[]>([]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const categories: { id: ImageCategory; label: string; icon: string }[] = [
    { id: 'youtube_avatar', label: t.images.categories.youtube_avatar, icon: '👤' },
    { id: 'youtube_preview', label: t.images.categories.youtube_preview, icon: '🎬' },
    { id: 'minecraft', label: t.images.categories.minecraft, icon: '⛏️' },
    { id: 'realistic', label: t.images.categories.realistic, icon: '📸' },
  ];

  const aspectRatios: { id: ImageAspectRatio; label: string; ratio: string }[] = [
    { id: '16:9', label: '16:9', ratio: 'YouTube Превью' },
    { id: '1:1', label: '1:1', ratio: 'Аватарка / Квадрат' },
    { id: '9:16', label: '9:16', ratio: 'Shorts / Stories' },
    { id: '4:3', label: '4:3', ratio: 'Классический' },
    { id: '3:4', label: '3:4', ratio: 'Портрет' },
  ];

  // AI Prompt Enhancer
  const handleEnhancePrompt = async () => {
    if (!prompt.trim() || isEnhancing) return;
    setIsEnhancing(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Enhance and expand this image prompt into a detailed, visually rich image generation prompt with lighting, atmosphere, colors, style (${category}): "${prompt}". Return ONLY the improved prompt text in 1-2 sentences.`,
          preset: 'general',
          language: currentLang,
        }),
      });

      const data = await res.json();
      if (data.text) {
        setPrompt(data.text.replace(/^[#*"\s]+|[#*"\s]+$/g, ''));
      }
    } catch (e) {
      console.warn('Enhance prompt fallback');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          category,
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (data.imageUrl) {
        const newImg: GeneratedImage = {
          id: `img-${Date.now()}`,
          prompt,
          imageUrl: data.imageUrl,
          category,
          aspectRatio,
          createdAt: Date.now(),
        };

        setCurrentImage(newImg);
        setRecentImages((prev) => [newImg, ...prev.slice(0, 7)]);
        onSaveToHistory('image', prompt, `Изображение (${category}, ${aspectRatio})`);
      }
    } catch (err: any) {
      alert('Ошибка при генерации: ' + (err?.message || err));
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPrompt = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-amber-500/15 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{t.images.title}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{t.images.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {t.images.categoryLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.id);
                    if (cat.id === 'youtube_avatar') setAspectRatio('1:1');
                    else if (cat.id === 'youtube_preview') setAspectRatio('16:9');
                  }}
                  className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                    category === cat.id
                      ? 'border-amber-400 bg-amber-500/15 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Maximize2 className="h-4 w-4" />
              <span>{t.images.aspectRatioLabel}</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {aspectRatios.map((ar) => (
                <button
                  key={ar.id}
                  onClick={() => setAspectRatio(ar.id)}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                    aspectRatio === ar.id
                      ? 'border-amber-400 bg-amber-500/15 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold">{ar.label}</span>
                  <span className="text-[10px] text-slate-500 truncate w-full">{ar.ratio}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-400">
              <span>{t.images.promptLabel}</span>
              <button
                type="button"
                onClick={handleEnhancePrompt}
                disabled={!prompt.trim() || isEnhancing}
                className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 disabled:opacity-40"
              >
                {isEnhancing ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Wand2 className="h-3.5 w-3.5" />
                )}
                <span>{t.images.enhancePrompt}</span>
              </button>
            </div>

            <div className="relative rounded-2xl border border-amber-500/30 bg-slate-900/90 p-2 focus-within:border-amber-400 shadow-xl transition-all">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.images.promptPlaceholder}
                rows={4}
                className="w-full bg-transparent p-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none"
                disabled={isGenerating}
              />
            </div>
          </div>

          {/* Quick inspiration tags */}
          <div className="flex flex-wrap gap-1.5">
            {[
              'Незеритовый меч в лаве',
              'Minecraft замок на скале',
              'Киберпанк YouTube аватар',
              'Превью: 100 дней выживания',
            ].map((tag, i) => (
              <button
                key={i}
                onClick={() => setPrompt(tag)}
                className="rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-400 hover:border-amber-500/40 hover:text-amber-300 transition-all"
              >
                + {tag}
              </button>
            ))}
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-4 text-sm font-black text-slate-950 shadow-xl shadow-amber-500/25 hover:from-amber-300 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Создание шедевра...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>{t.images.generateBtn}</span>
              </>
            )}
          </button>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-amber-500/20 bg-slate-900/80 p-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-amber-400" />
                <span>Результат / Canvas Preview</span>
              </span>
              {currentImage && (
                <span className="text-[11px] text-amber-400 font-medium">
                  {currentImage.aspectRatio}
                </span>
              )}
            </h3>

            {/* Image Preview Box */}
            <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-black border border-slate-800 ${
              aspectRatio === '16:9' ? 'aspect-video' : aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[460px] mx-auto' : 'aspect-square'
            }`}>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
                  <p className="text-xs font-semibold text-slate-300">
                    Рендеринг нейросетевого изображения...
                  </p>
                </div>
              ) : currentImage ? (
                <img
                  src={currentImage.imageUrl}
                  alt={currentImage.prompt}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500">
                  <ImageIcon className="h-12 w-12 mb-2 opacity-30 text-amber-400" />
                  <p className="text-xs font-medium">Изображение будет отображено здесь</p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Выберите категорию и нажмите «{t.images.generateBtn}»
                  </p>
                </div>
              )}
            </div>

            {/* Actions for Current Image */}
            {currentImage && !isGenerating && (
              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                <a
                  href={currentImage.imageUrl}
                  download={`tochkas-ai-${currentImage.category}-${Date.now()}.png`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span>{t.images.downloadBtn}</span>
                </a>

                <button
                  type="button"
                  onClick={copyPrompt}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-all"
                >
                  {copiedPrompt ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedPrompt ? t.common.copied : 'Скопировать промпт'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Recent gallery */}
          {recentImages.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {t.images.recentImages}
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {recentImages.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImage(img)}
                    className="relative aspect-square overflow-hidden rounded-lg border border-slate-800 hover:border-amber-400 transition-all"
                  >
                    <img src={img.imageUrl} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
