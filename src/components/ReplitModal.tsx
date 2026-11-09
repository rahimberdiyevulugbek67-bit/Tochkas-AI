import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  X, 
  Server, 
  CheckCircle2, 
  Globe, 
  Lock, 
  Terminal, 
  ExternalLink, 
  Download 
} from 'lucide-react';

interface ReplitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const ReplitModal: React.FC<ReplitModalProps> = ({ isOpen, onClose, currentLang }) => {
  const t = translations[currentLang];

  if (!isOpen) return null;

  const downloadConfigs = () => {
    const replitContent = `entrypoint = "server.ts"\nmodules = ["nodejs-20"]\nrun = "npm run dev"\n\n[deployment]\nrun = ["sh", "-c", "npm run build && npm start"]\ndeploymentTarget = "cloudrun"\n\n[[ports]]\nlocalPort = 3000\nexternalPort = 80\n`;
    const blob = new Blob([replitContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.replit';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-amber-500/30 bg-[#070c18] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/15 p-6 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">{t.replit.title}</h2>
              <p className="text-xs text-slate-400">{t.replit.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-300">
          <div className="grid grid-cols-1 gap-3">
            {/* Step 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <Terminal className="h-4 w-4" />
                <span>{t.replit.step1Title}</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {t.replit.step1Desc}
              </p>
              <div className="rounded bg-black/50 p-2 font-mono text-[11px] text-emerald-400">
                $ npm run build && npm start
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>{t.replit.step2Title}</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {t.replit.step2Desc} Файлы <code>.replit</code> и <code>replit.nix</code> уже сгенерированы в корне проекта.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <Globe className="h-4 w-4" />
                <span>{t.replit.step3Title}</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {t.replit.step3Desc} HTTPS-сертификат (SSL) выдаётся и обновляется автоматически.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300 flex items-center gap-2">
            <Lock className="h-4 w-4 shrink-0" />
            <span className="text-[11px]">
              Круглосуточный режим работы, HTTPS шифрование и постоянный публичный URL готовы к запуску.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-4 flex items-center justify-between">
          <button
            onClick={downloadConfigs}
            className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{t.replit.downloadFiles}</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
