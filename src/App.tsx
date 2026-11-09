import React, { useState, useEffect } from 'react';
import { Language, ActiveTab, UserProfile } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { VideoStudio } from './components/VideoStudio';
import { ImageStudio } from './components/ImageStudio';
import { YouTubeStudio } from './components/YouTubeStudio';
import { VoiceAssistant } from './components/VoiceAssistant';
import { SearchConsoleView } from './components/SearchConsoleView';
import { ProfileModal, HistoryItem } from './components/ProfileModal';
import { ReplitModal } from './components/ReplitModal';

export default function App() {
  // 1. Language state with localStorage persistence
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('tochkas_lang');
    if (saved && ['ru', 'uz', 'en', 'zh'].includes(saved)) {
      return saved as Language;
    }
    return 'ru';
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('tochkas_lang', lang);
  };

  // 2. Active Tab state (Chat, Video, Images, YouTube, Voice, SEO, Profile)
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as ActiveTab;
      if (['chat', 'video', 'images', 'youtube', 'voice', 'seo', 'profile'].includes(tabParam)) {
        return tabParam;
      }
    }
    return 'chat';
  });

  // 3. User Profile state with Google Auth
  const [user, setUser] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem('tochkas_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {}
    }
    return {
      id: 'user-default-1',
      name: 'Ulugbek Rahimberdiyev',
      email: 'rahimberdiyevulugbek67@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      isGoogleAuthenticated: true,
      tier: 'Pro AI Studio',
      tokensUsed: 14850,
      tokensLimit: 250000,
      savedGenerationsCount: 12,
      joinedDate: '2026-11-09',
    };
  });

  // 4. Generation & Chat History state with localStorage persistence
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('tochkas_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 'hist-1',
        type: 'chat',
        prompt: 'Minecraft: Автоматическая ферма железа 1.21',
        result: 'Ферма жителей с испугом зомби и лавовым костром для железных големов.',
        timestamp: Date.now() - 3600000,
      },
      {
        id: 'hist-2',
        type: 'youtube',
        prompt: 'Shorts: 3 скрытых крафта Minecraft',
        result: 'Вирусный хук первых 3 секунд, сценарий на 40 сек и 5 тегов.',
        timestamp: Date.now() - 7200000,
      },
    ];
  });

  const saveToHistory = (type: string, prompt: string, result: string) => {
    const newItem: HistoryItem = {
      id: `hist-${Date.now()}`,
      type,
      prompt,
      result,
      timestamp: Date.now(),
    };
    setHistory((prev) => {
      const updated = [newItem, ...prev.slice(0, 49)];
      localStorage.setItem('tochkas_history', JSON.stringify(updated));
      return updated;
    });

    setUser((prev) => {
      const updated = {
        ...prev,
        tokensUsed: prev.tokensUsed + Math.floor(Math.random() * 80 + 20),
        savedGenerationsCount: prev.savedGenerationsCount + 1,
      };
      localStorage.setItem('tochkas_user', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    if (window.confirm('Очистить всю сохраненную историю?')) {
      setHistory([]);
      localStorage.removeItem('tochkas_history');
    }
  };

  // 5. Modals & Drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [replitModalOpen, setReplitModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060b17] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        user={user}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenReplit={() => setReplitModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeTab={activeTab}
      />

      {/* Main Layout (Sidebar + Content Workspace) */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'profile') {
              setProfileModalOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          currentLang={currentLang}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          onOpenReplit={() => setReplitModalOpen(true)}
        />

        {/* Dynamic View Container */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#080f21] to-[#050914] relative">
          {activeTab === 'chat' && (
            <ChatView
              currentLang={currentLang}
              onSaveToHistory={saveToHistory}
            />
          )}

          {activeTab === 'video' && (
            <VideoStudio
              currentLang={currentLang}
              onSaveToHistory={saveToHistory}
            />
          )}

          {activeTab === 'images' && (
            <ImageStudio
              currentLang={currentLang}
              onSaveToHistory={saveToHistory}
            />
          )}

          {activeTab === 'youtube' && (
            <YouTubeStudio
              currentLang={currentLang}
              onNavigateToImages={() => setActiveTab('images')}
              onSaveToHistory={saveToHistory}
            />
          )}

          {activeTab === 'voice' && (
            <VoiceAssistant
              currentLang={currentLang}
              onSaveToHistory={saveToHistory}
            />
          )}

          {activeTab === 'seo' && (
            <SearchConsoleView
              currentLang={currentLang}
            />
          )}
        </main>
      </div>

      {/* Profile & Google Auth Cabinet Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        setUser={setUser}
        currentLang={currentLang}
        history={history}
        onClearHistory={handleClearHistory}
      />

      {/* Replit 24/7 Deployment Modal */}
      <ReplitModal
        isOpen={replitModalOpen}
        onClose={() => setReplitModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
