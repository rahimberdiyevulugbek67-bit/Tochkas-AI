import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDomain, generateSitemapXml, generateRobotsTxt, performSeoAudit } from './seo-utils';
import { parseDurationToSeconds, getResolutionForFormat, generateStoryboardTimeline } from './video-utils';

test('validateDomain recognizes valid and invalid domains', () => {
  assert.equal(validateDomain('tochkas-ai.com'), true);
  assert.equal(validateDomain('sub.domain.my-site.org'), true);
  assert.equal(validateDomain('https://tochkas.ai/'), true);
  assert.equal(validateDomain('not a domain'), false);
  assert.equal(validateDomain(''), false);
  assert.equal(validateDomain('invalid..domain'), false);
});

test('generateSitemapXml produces valid XML with 4 languages', () => {
  const xml = generateSitemapXml('https://tochkas-ai.com');
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<urlset'));
  assert.ok(xml.includes('<loc>https://tochkas-ai.com/video</loc>'));
  assert.ok(xml.includes('hreflang="ru"'));
  assert.ok(xml.includes('hreflang="uz"'));
  assert.ok(xml.includes('hreflang="en"'));
  assert.ok(xml.includes('hreflang="zh"'));
});

test('generateRobotsTxt contains Googlebot and sitemap link', () => {
  const robots = generateRobotsTxt('https://tochkas-ai.com');
  assert.ok(robots.includes('User-agent: Googlebot'));
  assert.ok(robots.includes('Sitemap: https://tochkas-ai.com/sitemap.xml'));
});

test('performSeoAudit calculates accurate score and audit checks', () => {
  const result = performSeoAudit({
    title: 'Tochkas AI – Многофункциональная платформа',
    description: 'Многофункциональная AI-платформа: умный чат, генератор видео и изображений, YouTube-студия, голосовой ассистент и SEO.',
    domain: 'tochkas-ai.com',
    hasVerification: true,
    hasSitemap: true,
    hasRobots: true,
    isMobileResponsive: true,
  });

  assert.ok(result.score >= 80, `Expected score >= 80, got ${result.score}`);
  assert.equal(result.checks.length, 7);
  const passed = result.checks.filter(c => c.passed);
  assert.ok(passed.length >= 6);
});

test('parseDurationToSeconds maps duration strings to numeric seconds', () => {
  assert.equal(parseDurationToSeconds('10s'), 10);
  assert.equal(parseDurationToSeconds('20s'), 20);
  assert.equal(parseDurationToSeconds('30s'), 30);
  assert.equal(parseDurationToSeconds('60s'), 60);
  assert.equal(parseDurationToSeconds('100s'), 100);
});

test('getResolutionForFormat provides correct dimensions and aspect ratios', () => {
  const landscape = getResolutionForFormat('16:9');
  assert.equal(landscape.width, 1280);
  assert.equal(landscape.height, 720);

  const vertical = getResolutionForFormat('9:16');
  assert.equal(vertical.width, 720);
  assert.equal(vertical.height, 1280);

  const square = getResolutionForFormat('1:1');
  assert.equal(square.width, 1000);
  assert.equal(square.height, 1000);
});

test('generateStoryboardTimeline breaks duration into smooth scenes', () => {
  const scenes = generateStoryboardTimeline('Minecraft secret crafts', 30);
  assert.equal(scenes.length, 4);
  assert.equal(scenes[0].startTime, 0);
  assert.ok(scenes[scenes.length - 1].endTime >= 30);
});
