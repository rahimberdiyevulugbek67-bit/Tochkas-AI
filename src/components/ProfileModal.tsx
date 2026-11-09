import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { translations } from '../i18n/translations';
import { 
  X, 
  CheckCircle2, 
  Download, 
  Trash2, 
  LogOut, 
  ShieldCheck, 
  User, 
  Sparkles, 
  Clock, 
  Copy, 
  Check, 
  Zap, 
  Coins 
} from 'lucide-react';

export interface HistoryItem {
  id: string;
  type: string;
  prompt: string;
  result: string;
  timestamp: number;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  currentLang: Language;
  history: HistoryItem[];
  onClearHistory: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  setUser,
  currentLang,
  history,
  onClearHistory,
}) => {
  const t = translations[currentLang];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    // Authenticate user with Google credentials
    const updatedUser: UserProfile = {
      ...user,
      isGoogleAuthenticated: true,
      name: 'Ulugbek Rahimberdiyev',
      email: 'rahimberdiyevulugbek67@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      tier: 'Pro AI Studio',
      tokensLimit: 250000,
    };
    setUser(updatedUser);
    localStorage.setItem('tochkas_user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    const defaultUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: 'Tochkas Guest',
      email: 'guest@tochkas-ai.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      isGoogleAuthenticated: false,
      tier: 'Free Creator',
      tokensUsed: 1240,
      tokensLimit: 50000,
      savedGenerationsCount: history.length,
      joinedDate: '2026-11-09',
    };
    setUser(defaultUser);
    localStorage.removeItem('tochkas_user');
  };

  const exportHistoryJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tochkas-ai-history-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyResult = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl border border-amber-500/30 bg-[#070c18] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/15 p-6 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">{t.auth.cabinetTitle}</h2>
              <p className="text-xs text-slate-400">{t.auth.accountDetails}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Profile Card */}
          <div className="rounded-2xl border border-amber-500/20 bg-slate-900/80 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-14 w-14 rounded-full border-2 border-amber-400 object-cover shadow-lg shadow-amber-500/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-100">{user.name}</h3>
                    {user.isGoogleAuthenticated && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Google Auth
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  <p className="text-[11px] text-amber-400/90 font-medium mt-0.5">
                    {t.auth.tier}: {user.tier}
                  </p>
                </div>
              </div>

              <div>
                {user.isGoogleAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/40 transition-all"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>{t.auth.logout}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/25 hover:from-amber-300 hover:to-amber-500 transition-all"
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

            {/* Token progress bar */}
            <div className="border-t border-slate-800 pt-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Coins className="h-3.5 w-3.5 text-amber-400" />
                  <span>{t.auth.tokensUsed}:</span>
                </span>
                <span className="font-semibold text-amber-300">
                  {user.tokensUsed.toLocaleString()} / {user.tokensLimit.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                  style={{ width: `${Math.min((user.tokensUsed / user.tokensLimit) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>{t.auth.historyTitle} ({history.length})</span>
              </h4>

              {history.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportHistoryJson}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{t.auth.exportHistory}</span>
                  </button>
                  <button
                    onClick={onClearHistory}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors ml-2"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{t.common.clear}</span>
                  </button>
                </div>
              )}
            </div>

            {history.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-6 text-center text-xs text-slate-500">
                {t.auth.noHistory}
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-400">
                        {item.type}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </span>
                    </div>

                    <p className="font-semibold text-slate-200 truncate">
                      "{item.prompt}"
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                      <span className="truncate max-w-[80%]">{item.result.slice(0, 60)}...</span>
                      <button
                        onClick={() => copyResult(item.id, item.result)}
                        className="text-amber-400 hover:text-amber-300 shrink-0"
                        title={t.common.copy}
                      >
                        {copiedId === item.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security Note */}
          <div className="rounded-xl border border-slate-800 bg-[#060b17] p-3 text-xs text-slate-400 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">{t.auth.securityNote}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-4 text-right">
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
