import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatPreset, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sparkles, 
  Compass, 
  Hammer, 
  FileCode2, 
  Video, 
  Bot, 
  User,
  Trash2
} from 'lucide-react';

interface ChatViewProps {
  currentLang: Language;
  onSaveToHistory: (type: string, prompt: string, result: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ currentLang, onSaveToHistory }) => {
  const t = translations[currentLang];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: currentLang === 'ru' 
        ? 'Привет! Я Tochkas AI — флагманский искусственный интеллект. Я отлично знаю правила и механику Minecraft, помогаю устанавливать и настраивать моды (Forge, Fabric), пишу сценарии и вирусные идеи для YouTube, а также программирую на любых языках. О чём хотите поговорить?'
        : currentLang === 'uz'
        ? "Salom! Men Tochkas AI — zamonaviy sun'iy intellektman. Minecraft qoidalari va mexanikalari, modlar (Forge, Fabric), YouTube uchun ssenariylar va g'oyalar, hamda dasturlashda yordam berishga tayyorman!"
        : currentLang === 'en'
        ? "Hello! I am Tochkas AI — your flagship AI creation assistant. I excel at Minecraft vanilla mechanics & redstone, modding (Forge/Fabric), YouTube scripts & viral hooks, and code development. How can I help you today?"
        : "您好！我是 Tochkas AI 全功能旗舰人工智能助手。我擅长解答问题、剖析 Minecraft 游戏规则与红石电路、模组配置 (Forge/Fabric)、编写 YouTube 爆款剧本及编程开发。今天想聊些什么？",
      timestamp: Date.now(),
      preset: 'general',
    },
  ]);

  const [input, setInput] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<ChatPreset>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Speech Recognition setup (Web Speech API)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Голосовой ввод не поддерживается данным браузером. Попробуйте Chrome или Samsung Internet.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;

      const langMap: Record<Language, string> = {
        ru: 'ru-RU',
        uz: 'uz-UZ',
        en: 'en-US',
        zh: 'zh-CN',
      };
      recognition.lang = langMap[currentLang] || 'ru-RU';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now(),
      preset: selectedPreset,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          preset: selectedPreset,
          language: currentLang,
        }),
      });

      const data = await res.json();
      const aiReply = data.text || 'Ответ от AI получен.';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: Date.now(),
        preset: selectedPreset,
      };

      setMessages((prev) => [...prev, aiMsg]);
      onSaveToHistory('chat', text, aiReply);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'Не удалось получить ответ от сервера. Проверьте интернет-соединение или повторите запрос.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Speak AI message
  const handleReadAloud = async (msg: ChatMessage) => {
    if (activeAudioId === msg.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setActiveAudioId(null);
      return;
    }

    setActiveAudioId(msg.id);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: msg.text.slice(0, 300),
          voice: 'female_natural',
        }),
      });

      const data = await res.json();

      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audioRef.current = audio;
        audio.onended = () => setActiveAudioId(null);
        audio.onerror = () => setActiveAudioId(null);
        await audio.play();
        return;
      }

      // Browser synthesis fallback
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(msg.text.slice(0, 300));
        const langMap: Record<Language, string> = {
          ru: 'ru-RU',
          uz: 'uz-UZ',
          en: 'en-US',
          zh: 'zh-CN',
        };
        utterance.lang = langMap[currentLang] || 'ru-RU';
        utterance.onend = () => setActiveAudioId(null);
        utterance.onerror = () => setActiveAudioId(null);
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.error(e);
      setActiveAudioId(null);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    if (window.confirm('Очистить диалог?')) {
      setMessages([]);
    }
  };

  const presets: { id: ChatPreset; label: string; icon: React.ReactNode }[] = [
    { id: 'general', label: t.chat.presets.general, icon: <Sparkles className="h-3.5 w-3.5" /> },
    { id: 'minecraft_rules', label: t.chat.presets.minecraft_rules, icon: <Compass className="h-3.5 w-3.5" /> },
    { id: 'minecraft_mods', label: t.chat.presets.minecraft_mods, icon: <Hammer className="h-3.5 w-3.5" /> },
    { id: 'youtube', label: t.chat.presets.youtube, icon: <Video className="h-3.5 w-3.5" /> },
    { id: 'code', label: t.chat.presets.code, icon: <FileCode2 className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex h-full flex-col max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/15">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
              {t.chat.title}
            </h1>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/30">
              Gemini 3.8
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.chat.subtitle}
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="self-start sm:self-center flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400 hover:border-rose-500/40 hover:text-rose-300 transition-all"
            title="Очистить историю"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>{t.common.clear}</span>
          </button>
        )}
      </div>

      {/* Preset Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
        {presets.map((p) => {
          const isSelected = selectedPreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(p.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-amber-300'
              }`}
            >
              {p.icon}
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                  isAi
                    ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                {isAi ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
                  isAi
                    ? 'border border-amber-500/20 bg-slate-900/90 text-slate-100 shadow-lg shadow-black/40'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-wrap break-words">{msg.text}</div>

                {/* AI Footer Actions */}
                {isAi && (
                  <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2 text-xs text-slate-400">
                    <span className="text-[11px] text-slate-500">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReadAloud(msg)}
                        className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors ${
                          activeAudioId === msg.id
                            ? 'bg-amber-400/20 text-amber-300'
                            : 'hover:bg-slate-800 hover:text-slate-200'
                        }`}
                        title={activeAudioId === msg.id ? t.chat.stopAudio : t.chat.readAloud}
                      >
                        {activeAudioId === msg.id ? (
                          <VolumeX className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                        ) : (
                          <Volume2 className="h-3.5 w-3.5" />
                        )}
                        <span>{activeAudioId === msg.id ? t.chat.stopAudio : t.chat.readAloud}</span>
                      </button>

                      <button
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                        title={t.common.copy}
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">{t.common.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>{t.common.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 text-sm text-amber-400/90 pl-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Bot className="h-4 w-4 animate-spin" />
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span>{t.common.generating}</span>
              <span className="flex space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts (if chat is short) */}
      {messages.length <= 2 && (
        <div className="py-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Рекомендуемые темы / Quick ideas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {t.chat.suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-left rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs text-slate-300 hover:border-amber-500/40 hover:bg-slate-800 hover:text-amber-300 transition-all"
              >
                💡 {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="mt-2 pt-2 border-t border-slate-800/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center rounded-2xl border border-amber-500/30 bg-slate-900/90 p-1.5 shadow-xl shadow-black/50 focus-within:border-amber-400 transition-all"
        >
          {/* Microphone toggle */}
          <button
            type="button"
            onClick={toggleListening}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-amber-400'
            }`}
            title={isListening ? t.common.micStop : t.common.micStart}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? t.common.listening : t.chat.placeholder}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-4 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-300 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>{t.chat.send}</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
