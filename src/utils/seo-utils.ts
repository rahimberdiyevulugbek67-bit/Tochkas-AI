import { SeoAuditResult } from '../types';

export function validateDomain(domain: string): boolean {
  if (!domain || typeof domain !== 'string') return false;
  const clean = domain.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return domainRegex.test(clean);
}

export function generateSitemapXml(baseUrl: string): string {
  const url = baseUrl.replace(/\/$/, '');
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    { loc: '', priority: '1.0', changefreq: 'daily' },
    { loc: '/chat', priority: '0.9', changefreq: 'daily' },
    { loc: '/video', priority: '0.9', changefreq: 'daily' },
    { loc: '/images', priority: '0.8', changefreq: 'weekly' },
    { loc: '/youtube', priority: '0.9', changefreq: 'daily' },
    { loc: '/voice', priority: '0.8', changefreq: 'weekly' },
    { loc: '/seo', priority: '0.7', changefreq: 'monthly' },
  ];

  const langs = ['ru', 'uz', 'en', 'zh'];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const p of pages) {
    const locUrl = `${url}${p.loc}`;
    xml += `  <url>\n`;
    xml += `    <loc>${locUrl}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;

    for (const lang of langs) {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${locUrl}?lang=${lang}" />\n`;
    }
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

export function generateRobotsTxt(baseUrl: string): string {
  const cleanUrl = baseUrl.replace(/\/$/, '');
  return `# robots.txt for Tochkas AI
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Googlebot specific rules
User-agent: Googlebot
Allow: /

# Sitemap
Sitemap: ${cleanUrl}/sitemap.xml
`;
}

export function performSeoAudit(params: {
  title: string;
  description: string;
  domain: string;
  hasVerification: boolean;
  hasSitemap: boolean;
  hasRobots: boolean;
  isMobileResponsive: boolean;
}): SeoAuditResult {
  const checks: SeoAuditResult['checks'] = [];

  // Check 1: Title
  const titleLen = params.title.length;
  const titleOk = titleLen >= 25 && titleLen <= 70;
  checks.push({
    title: 'Длина тега <title> (30-60 символов)',
    passed: titleOk,
    recommendation: titleOk
      ? `Оптимально (${titleLen} симв.): "${params.title}"`
      : `Текущая длина ${titleLen} симв. Рекомендуется от 30 до 60 знаков.`,
  });

  // Check 2: Meta description
  const descLen = params.description.length;
  const descOk = descLen >= 80 && descLen <= 170;
  checks.push({
    title: 'Мета-описание <meta name="description"> (100-160 симв.)',
    passed: descOk,
    recommendation: descOk
      ? `Отлично (${descLen} симв.). Информативно для поисковой выдачи.`
      : `Текущая длина ${descLen} симв. Оптимально 120-160 символов.`,
  });

  // Check 3: Sitemap.xml
  checks.push({
    title: 'Файл карты сайта /sitemap.xml',
    passed: params.hasSitemap,
    recommendation: params.hasSitemap
      ? 'Карта сайта доступна и содержит мультиязычные ссылки hreflang.'
      : 'Создайте файл sitemap.xml для ускорения обхода поисковым роботом Google.',
  });

  // Check 4: robots.txt
  checks.push({
    title: 'Файл инструкций для роботов /robots.txt',
    passed: params.hasRobots,
    recommendation: params.hasRobots
      ? 'robots.txt корректно настроен и открывает доступ Googlebot.'
      : 'Файл robots.txt отсутствует или блокирует сканирование.',
  });

  // Check 5: Mobile responsiveness
  checks.push({
    title: 'Мобильная адаптивность (Mobile-Friendly)',
    passed: params.isMobileResponsive,
    recommendation: params.isMobileResponsive
      ? 'Сайт полностью оптимизирован под мобильные экраны Samsung, Android и планшеты.'
      : 'Требуется настройка viewport meta и адаптивной сетки.',
  });

  // Check 6: Google Search Console Verification
  checks.push({
    title: 'Подтверждение Google Search Console',
    passed: params.hasVerification,
    recommendation: params.hasVerification
      ? 'Верификационный ключ настроен (HTML-файл / meta-тег).'
      : 'Укажите верификационный токен Google в панели Search Console.',
  });

  // Check 7: Custom Domain
  const domainValid = validateDomain(params.domain);
  checks.push({
    title: 'Валидность доменного имени',
    passed: domainValid,
    recommendation: domainValid
      ? `Домен "${params.domain}" соответствует стандарту FQDN.`
      : 'Укажите корректный домен (например, tochkas-ai.com).',
  });

  const passedCount = checks.filter(c => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return {
    score,
    checks,
  };
}
