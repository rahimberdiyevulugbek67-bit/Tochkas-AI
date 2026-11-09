import React from 'react';
import { ActiveTab, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  MessageSquare, 
  Video, 
  Image, 
  Youtube, 
  Mic, 
  Search, 
  UserCircle,
  Zap,
  Server
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentLang: Language;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenReplit: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentLang,
  mobileOpen,
  onCloseMobile,
  onOpenReplit,
}) => {
  const t = translations[currentLang];

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'chat', label: t.nav.chat, icon: <MessageSquare className="h-5 w-5" />, badge: 'Gemini 3.8' },
    { id: 'video', label: t.nav.video, icon: <Video className="h-5 w-5" />, badge: 'Studio' },
    { id: 'images', label: t.nav.images, icon: <Image className="h-5 w-5" /> },
    { id: 'youtube', label: t.nav.youtube, icon: <Youtube className="h-5 w-5" />, badge: 'Viral' },
    { id: 'voice', label: t.nav.voice, icon: <Mic className="h-5 w-5" />, badge: 'Live' },
    { id: 'seo', label: t.nav.seo, icon: <Search className="h-5 w-5" />, badge: 'Googlebot' },
    { id: 'profile', label: t.nav.profile, icon: <UserCircle className="h-5 w-5" /> },
  ];

  const handleSelect = (id: ActiveTab) => {
    onTabChange(id);
    onCloseMobile();
  };

  const content = (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="space-y-1.5">
        <div className="px-3 pb-3 pt-1 text-[11px] font-bold uppercase tracking-wider text-amber-400/80">
          Инструменты AI / Tools
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? 'border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-transparent text-amber-300 shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:border-slate-800 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`transition-colors ${isActive ? 'text-amber-400' : 'text-slate-500 group-hover:text-amber-400'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  isActive 
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Status Card */}
      <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-b from-[#0e182e] to-[#070c18] p-3.5 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-300">Tochkas Cloud Online</span>
        </div>
        <p className="text-[11px] text-slate-400 mb-3 leading-tight">
          Автономная AI-сеть с безопасной Google-авторизацией.
        </p>
        <button
          onClick={onOpenReplit}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-2 text-xs font-medium text-slate-200 hover:border-amber-400/50 hover:bg-slate-800 hover:text-amber-300 transition-all"
        >
          <Server className="h-3.5 w-3.5 text-amber-400" />
          <span>24/7 Replit Setup</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 lg:w-72 shrink-0 border-r border-amber-500/15 bg-[#060b17] min-h-[calc(100vh-4rem)]">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative flex w-4/5 max-w-xs flex-1 flex-col bg-[#070c18] border-r border-amber-500/20 shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
