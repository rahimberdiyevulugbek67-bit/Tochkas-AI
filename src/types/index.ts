export type Language = 'ru' | 'uz' | 'en' | 'zh';

export type ActiveTab = 
  | 'chat'
  | 'video'
  | 'images'
  | 'youtube'
  | 'voice'
  | 'seo'
  | 'profile';

export type ChatPreset = 'general' | 'minecraft_rules' | 'minecraft_mods' | 'youtube' | 'code';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  preset?: ChatPreset;
  audioUrl?: string;
  isStreaming?: boolean;
}

export type VideoDuration = '10s' | '20s' | '30s' | '60s' | '100s';
export type VideoFormat = '16:9' | '9:16' | '1:1';
export type VideoVoice = 'male_energetic' | 'female_natural' | 'male_calm' | 'female_expressive';

export interface VideoConfig {
  prompt: string;
  duration: VideoDuration;
  format: VideoFormat;
  voice: VideoVoice;
}

export interface GeneratedVideo {
  id: string;
  prompt: string;
  videoUrl: string;
  duration: VideoDuration;
  format: VideoFormat;
  voice: VideoVoice;
  createdAt: number;
  title: string;
}

export type ImageCategory = 'youtube_avatar' | 'youtube_preview' | 'minecraft' | 'realistic';
export type ImageAspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface ImageConfig {
  prompt: string;
  category: ImageCategory;
  aspectRatio: ImageAspectRatio;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  category: ImageCategory;
  aspectRatio: ImageAspectRatio;
  createdAt: number;
}

export interface YouTubeIdea {
  id: string;
  type: 'shorts' | 'long_form' | 'script' | 'titles' | 'preview_ideas' | 'sequel';
  title: string;
  description: string;
  script?: string;
  tags?: string[];
  thumbnailConcept?: string;
  sequelIdeas?: string[];
  createdAt: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isGoogleAuthenticated: boolean;
  tier: 'Free Creator' | 'Pro AI Studio' | 'Enterprise';
  tokensUsed: number;
  tokensLimit: number;
  savedGenerationsCount: number;
  joinedDate: string;
}

export interface SeoAuditResult {
  score: number;
  checks: {
    title: string;
    passed: boolean;
    recommendation: string;
  }[];
}
