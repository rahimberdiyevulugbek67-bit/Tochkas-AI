import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Radio, 
  RotateCcw, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';

interface VoiceAssistantProps {
  currentLang: Language;
  onSaveToHistory: (type: string, prompt: string, result: string) => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ currentLang, onSaveToHistory }) => {
  const t = translations[currentLang];

  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [continuousMode, setContinuousMode] = useState(true);
  const [voiceOutput, setVoiceOutput] = useState(true);

  const [currentTranscript, setCurrentTranscript] = useState('');
  const [dialogue, setDialogue] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: currentLang === 'ru' 
        ? 'Здравствуйте! Я ваш голосовой ассистент Tochkas AI. Нажмите на микрофон или скажите ваш вопрос вслух.' 
        : currentLang === 'uz'
        ? "Assalomu alaykum! Men Tochkas AI ovozli yordamchisiman. Mikrofonni bosing yoki savolingizni ayting."
        : currentLang === 'en'
        ? "Hello! I am your Tochkas AI live voice assistant. Click the microphone or speak freely."
        : "您好！我是 Tochkas AI 实时语音助手。请点击麦克风开启语音交谈。",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Setup speech recognition
  const startRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Голосовое распознавание не поддерживается в этом браузере.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;

      const langMap: Record<Language, string> = {
        ru: 'ru-RU',
        uz: 'uz-UZ',
        en: 'en-US',
        zh: 'zh-CN',
      };
      recognition.lang = langMap[currentLang] || 'ru-RU';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const finalTranscript = event.results[i][0].transcript;
            setCurrentTranscript(finalTranscript);
            handleUserVoiceQuery(finalTranscript);
          } else {
            interim += event.results[i][0].transcript;
            setCurrentTranscript(interim);
          }
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition notice:', e?.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleUserVoiceQuery = async (queryText: string) => {
    const text = queryText.trim();
    if (!text) return;

    // Add user turn
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDialogue((prev) => [...prev, { sender: 'user', text, time: nowTime }]);
    setIsThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          preset: 'general',
          language: currentLang,
        }),
      });

      const data = await res.json();
      const aiReply = data.text || 'Ответ сформирован.';

      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setDialogue((prev) => [...prev, { sender: 'ai', text: aiReply, time: replyTime }]);
      onSaveToHistory('voice', text, aiReply);

      // Play voice output if enabled
      if (voiceOutput) {
        await speakAiResponse(aiReply);
      } else if (continuousMode) {
        startRecognition();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  const speakAiResponse = async (text: string) => {
    setIsSpeaking(true);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.slice(0, 250),
          voice: 'female_natural',
        }),
      });

      const data = await res.json();

      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          if (continuousMode) {
            setTimeout(() => startRecognition(), 800);
          }
        };
        await audio.play();
        return;
      }

      // Browser synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.slice(0, 250));
        const langMap: Record<Language, string> = { ru: 'ru-RU', uz: 'uz-UZ', en: 'en-US', zh: 'zh-CN' };
        utterance.lang = langMap[currentLang] || 'ru-RU';
        utterance.onend = () => {
          setIsSpeaking(false);
          if (continuousMode) {
            setTimeout(() => startRecognition(), 800);
          }
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
      }
    } catch (e) {
      console.error(e);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) audioRef.current.pause();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-amber-500/15 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950">
            <Mic className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{t.voice.title}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{t.voice.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Interactive Visualizer & Mic Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#0e182e] via-[#070c18] to-[#050811] p-8 text-center shadow-2xl">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 mb-8">
          <Radio className={`h-3.5 w-3.5 ${isListening || isSpeaking ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
          <span>
            {isListening
              ? t.voice.statusListening
              : isThinking
              ? t.voice.statusThinking
              : isSpeaking
              ? t.voice.statusSpeaking
              : t.voice.statusReady}
          </span>
        </div>

        {/* Dynamic Soundwave Visualizer Rings */}
        <div className="relative my-8 flex items-center justify-center">
          {/* Animated pulsing orb rings */}
          <div className={`absolute h-48 w-48 rounded-full border border-amber-400/20 transition-all duration-700 ${
            isListening ? 'scale-125 border-rose-500/40 animate-ping' : isSpeaking ? 'scale-125 border-amber-400/50 animate-pulse' : 'scale-100'
          }`} />
          <div className={`absolute h-36 w-36 rounded-full border border-amber-400/30 transition-all duration-500 ${
            isListening ? 'scale-110 border-rose-400/60' : isSpeaking ? 'scale-115 border-amber-300/60' : 'scale-95'
          }`} />

          {/* Central Microphone Button */}
          <button
            type="button"
            onClick={isListening ? stopRecognition : startRecognition}
            disabled={isThinking}
            className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full shadow-2xl transition-all ${
              isListening
                ? 'bg-rose-500 text-white shadow-rose-500/50 scale-105 animate-pulse'
                : isSpeaking
                ? 'bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-slate-950 shadow-amber-400/40 scale-105'
                : 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-amber-500/30 hover:scale-105'
            }`}
            title={t.voice.tapToSpeak}
          >
            {isListening ? (
              <MicOff className="h-10 w-10 text-white" />
            ) : isThinking ? (
              <Loader2 className="h-10 w-10 text-slate-950 animate-spin" />
            ) : isSpeaking ? (
              <Volume2 className="h-10 w-10 text-slate-950 animate-bounce" />
            ) : (
              <Mic className="h-10 w-10 text-slate-950" />
            )}
          </button>
        </div>

        {/* Current Interim Speech Output */}
        <p className="min-h-[28px] text-sm font-medium text-amber-300/90 italic">
          {currentTranscript ? `"${currentTranscript}"` : t.voice.tapToSpeak}
        </p>

        {/* Toggles (Continuous & Voice Output) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={continuousMode}
              onChange={(e) => setContinuousMode(e.target.checked)}
              className="rounded accent-amber-500"
            />
            <span>{t.voice.continuousMode}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={voiceOutput}
              onChange={(e) => setVoiceOutput(e.target.checked)}
              className="rounded accent-amber-500"
            />
            <span>{t.voice.voiceOutputLabel}</span>
          </label>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1 text-rose-300 hover:bg-slate-700 transition-all"
            >
              <VolumeX className="h-3.5 w-3.5" />
              <span>{t.voice.stopSpeaking}</span>
            </button>
          )}
        </div>
      </div>

      {/* Transcript Log */}
      <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-5 shadow-xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Транскрипт голосового разговора</span>
          <span className="text-slate-500 font-normal">{dialogue.length} сообщений</span>
        </h3>

        <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
          {dialogue.map((turn, i) => (
            <div
              key={i}
              className={`rounded-xl p-3 text-xs leading-relaxed ${
                turn.sender === 'ai'
                  ? 'bg-slate-900/90 border border-amber-500/20 text-slate-200'
                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-200 ml-6'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span className="font-bold uppercase tracking-wider">
                  {turn.sender === 'ai' ? 'Tochkas AI' : 'Вы'}
                </span>
                <span>{turn.time}</span>
              </div>
              <p className="whitespace-pre-wrap">{turn.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
