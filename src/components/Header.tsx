import React from 'react';
import { Language, UserProfile, ActiveTab } from '../types';
import { translations } from '../i18n/translations';
import { 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  Server, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  user: UserProfile;
  onOpenProfile: () => void;
  onOpenReplit: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeTab: ActiveTab;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  user,
  onOpenProfile,
  onOpenReplit,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const t = translations[currentLang];

  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-[#060b17]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-300 hover:text-amber-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#070c18]">
                <Sparkles className="h-5 w-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight gold-text-gradient">
                  Tochkas AI
                </span>
                <span className="hidden sm:inline-flex rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/30">
                  FLAGSHIP
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Replit 24/7 Hosting pill */}
          <button
            onClick={onOpenReplit}
            className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-amber-500/50 hover:text-amber-300 transition-all"
            title="Инструкция по круглосуточному запуску Replit"
          >
            <Server className="h-3.5 w-3.5 text-amber-400" />
            <span>24/7 Replit</span>
          </button>

          {/* 4 Languages Selector */}
          <div className="relative flex items-center bg-slate-900/80 border border-slate-800 rounded-lg p-0.5">
            <div className="pl-2 pr-1 text-slate-400 hidden sm:block">
              <Globe className="h-4 w-4" />
            </div>
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent text-xs font-medium text-slate-200 py-1.5 px-2 focus:outline-none cursor-pointer rounded-md hover:text-amber-300"
              aria-label="Выбор языка / Language"
            >
              {languageOptions.map((opt) => (
                <option key={opt.code} value={opt.code} className="bg-[#0c1527] text-slate-200">
                  {opt.flag} {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Google Auth / Profile Button */}
          {user.isGoogleAuthenticated ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-amber-700/10 py-1 pl-1 pr-3 hover:border-amber-400 transition-all"
              title={t.auth.cabinetTitle}
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-7 w-7 rounded-full border border-amber-400/60 object-cover"
              />
              <span className="hidden sm:inline text-xs font-semibold text-amber-200 max-w-[110px] truncate">
                {user.name}
              </span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 hidden sm:inline" />
            </button>
          ) : (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{t.auth.loginWithGoogle}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
