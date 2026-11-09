import { VideoDuration, VideoFormat } from '../types';

export function parseDurationToSeconds(duration: VideoDuration): number {
  switch (duration) {
    case '10s': return 10;
    case '20s': return 20;
    case '30s': return 30;
    case '60s': return 60;
    case '100s': return 100;
    default: return 30;
  }
}

export function getResolutionForFormat(format: VideoFormat): { width: number; height: number; aspect: string } {
  switch (format) {
    case '16:9':
      return { width: 1280, height: 720, aspect: '16/9' };
    case '9:16':
      return { width: 720, height: 1280, aspect: '9/16' };
    case '1:1':
      return { width: 1000, height: 1000, aspect: '1/1' };
    default:
      return { width: 1280, height: 720, aspect: '16/9' };
  }
}

export interface VideoScene {
  id: number;
  startTime: number;
  endTime: number;
  title: string;
  subtitle: string;
  bgTheme: 'gold_matrix' | 'minecraft_block' | 'cyber_nebula' | 'cinematic_dark';
  cameraZoom: number;
}

export function generateStoryboardTimeline(prompt: string, totalSeconds: number): VideoScene[] {
  // Split totalSeconds into 3-5 paced scenes
  const sceneCount = totalSeconds <= 10 ? 2 : totalSeconds <= 20 ? 3 : totalSeconds <= 30 ? 4 : 5;
  const sceneDuration = totalSeconds / sceneCount;
  
  const words = prompt.trim().split(/\s+/);
  const keyword = words.slice(0, 3).join(' ') || 'Tochkas AI';

  const themes: VideoScene['bgTheme'][] = ['gold_matrix', 'minecraft_block', 'cyber_nebula', 'cinematic_dark'];

  const scenes: VideoScene[] = [];
  for (let i = 0; i < sceneCount; i++) {
    const start = Math.round(i * sceneDuration * 10) / 10;
    const end = Math.round((i + 1) * sceneDuration * 10) / 10;
    scenes.push({
      id: i + 1,
      startTime: start,
      endTime: end,
      title: i === 0 ? `Tochkas AI: ${keyword}` : `Сцена ${i + 1}: Разбор деталей`,
      subtitle: i === 0 ? 'Эксклюзивный выпуск' : `Ключевой инсайт #${i + 1}`,
      bgTheme: themes[i % themes.length],
      cameraZoom: 1.0 + (i * 0.05),
    });
  }

  return scenes;
}
