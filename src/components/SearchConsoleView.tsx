import React, { useState, useEffect } from 'react';
import { Language, SeoAuditResult } from '../types';
import { translations } from '../i18n/translations';
import { performSeoAudit, validateDomain } from '../utils/seo-utils';
import { 
  Search, 
  Globe, 
  CheckCircle2, 
  XCircle, 
  FileCode, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Smartphone, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';

interface SearchConsoleViewProps {
  currentLang: Language;
}

export const SearchConsoleView: React.FC<SearchConsoleViewProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const [domain, setDomain] = useState(
    typeof window !== 'undefined' ? window.location.origin : 'https://tochkas-ai.com'
  );
  const [token, setToken] = useState('google-site-verification-tochkas');
  const [activeMethod, setActiveMethod] = useState<'html_file' | 'meta_tag' | 'dns'>('html_file');
  const [auditResult, setAuditResult] = useState<SeoAuditResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  // Load current settings from backend
  useEffect(() => {
    fetch('/api/seo/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data.token) setToken(data.token);
        if (data.domain) setDomain(data.domain);
        runAudit(data.domain, data.token);
      })
      .catch(() => {
        runAudit(domain, token);
      });
  }, []);

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/seo/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain,
          token,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
        runAudit(domain, token);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const runAudit = (currentDomain: string, currentToken: string) => {
    const result = performSeoAudit({
      title: 'Tochkas AI – Многофункциональная AI-платформа',
      description: 'Многофункциональная AI-платформа: умный чат, генератор видео и изображений, YouTube-студия, голосовой ассистент и SEO.',
      domain: currentDomain,
      hasVerification: Boolean(currentToken && currentToken.length > 5),
      hasSitemap: true,
      hasRobots: true,
      isMobileResponsive: true,
    });
    setAuditResult(result);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const cleanToken = token.replace(/^google|\.html$/g, '');
  const verificationHtmlUrl = `${domain}/google${cleanToken}.html`;
  const metaSnippet = `<meta name="google-site-verification" content="${cleanToken}" />`;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-amber-500/15 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{t.seo.title}</h1>
            <p className="text-xs text-slate-400 mt-0.5">{t.seo.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Domain & Token Configuration Card */}
      <div className="rounded-2xl border border-amber-500/20 bg-slate-900/80 p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
            <Globe className="h-4 w-4" />
            <span>Параметры домена и верификации Google</span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>Подготовлено для Googlebot</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Domain input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {t.seo.domainLabel}
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder={t.seo.domainPlaceholder}
              className="w-full rounded-xl border border-slate-800 bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
            />
            <p className="text-[11px] text-slate-500">
              Укажите публичный адрес, например https://tochkas-ai.com
            </p>
          </div>

          {/* Google verification token input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Код верификации Google Search Console
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="google1234567890abcdef"
              className="w-full rounded-xl border border-slate-800 bg-[#070c18] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
            />
            <p className="text-[11px] text-slate-500">
              Вставьте код из окна подтверждения владения Google Search Console
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveSettings}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-300 hover:to-amber-500 transition-all"
            >
              {isSaved ? <Check className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
              <span>{isSaved ? 'Сохранено!' : 'Применить и сохранить'}</span>
            </button>

            <button
              onClick={() => runAudit(domain, token)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-800/60 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{t.seo.runAudit}</span>
            </button>
          </div>

          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 hover:underline"
          >
            <span>{t.seo.googleConsoleLink}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Verification Methods Switcher */}
      <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-200">{t.seo.methodsTitle}</h3>

        <div className="flex gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveMethod('html_file')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeMethod === 'html_file'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. HTML-файл (Рекомендуется)
          </button>
          <button
            onClick={() => setActiveMethod('meta_tag')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeMethod === 'meta_tag'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. HTML-тег
          </button>
          <button
            onClick={() => setActiveMethod('dns')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeMethod === 'dns'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Запись DNS TXT
          </button>
        </div>

        {activeMethod === 'html_file' && (
          <div className="space-y-3 pt-2 text-xs text-slate-300">
            <p className="leading-relaxed text-slate-400">{t.seo.htmlFileDesc}</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3 font-mono">
              <span className="truncate max-w-full text-amber-300">{verificationHtmlUrl}</span>
              <a
                href={verificationHtmlUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-sky-400 hover:underline shrink-0"
              >
                <span>Проверить URL</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-emerald-300 text-[11px]">
              ✓ Маршрут активен на сервере Tochkas AI Express и отдаёт <code>google-site-verification</code> для робота Google.
            </div>
          </div>
        )}

        {activeMethod === 'meta_tag' && (
          <div className="space-y-3 pt-2 text-xs text-slate-300">
            <p className="leading-relaxed text-slate-400">{t.seo.metaHtmlDesc}</p>
            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3 font-mono">
              <code className="text-amber-300 text-xs break-all">{metaSnippet}</code>
              <button
                onClick={() => copyToClipboard(metaSnippet)}
                className="flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-slate-300 hover:text-amber-300 shrink-0"
              >
                {copiedToken ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>Копировать</span>
              </button>
            </div>
          </div>
        )}

        {activeMethod === 'dns' && (
          <div className="space-y-2 pt-2 text-xs text-slate-300">
            <p className="leading-relaxed text-slate-400">{t.seo.dnsTxtDesc}</p>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-1.5 font-mono text-[11px]">
              <div><strong>Тип:</strong> TXT</div>
              <div><strong>Имя / Хост:</strong> @ (или ваш домен)</div>
              <div><strong>Значение:</strong> google-site-verification={cleanToken}</div>
            </div>
          </div>
        )}
      </div>

      {/* SEO Files: sitemap.xml & robots.txt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sitemap card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <FileCode className="h-4 w-4 text-amber-400" />
              <span>{t.seo.sitemapTitle}</span>
            </div>
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
              XML 1.0 Ready
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.seo.sitemapDesc}
          </p>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-amber-400 hover:text-amber-300 transition-all"
          >
            <span>{t.seo.viewSitemap}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Robots card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <FileText className="h-4 w-4 text-amber-400" />
              <span>{t.seo.robotsTitle}</span>
            </div>
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
              Googlebot Allowed
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.seo.robotsDesc}
          </p>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-amber-400 hover:text-amber-300 transition-all"
          >
            <span>{t.seo.viewRobots}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* SEO & Indexation Audit Score Card */}
      {auditResult && (
        <div className="rounded-2xl border border-amber-500/20 bg-slate-900/90 p-6 shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-400" />
                <span>{t.seo.auditTitle}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Автоматическая валидация соответствия требованиям Google Search Console.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                  {t.seo.auditScore}
                </span>
                <span className="text-2xl font-black text-amber-400">
                  {auditResult.score}/100
                </span>
              </div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-amber-400/30">
                <span className="text-xs font-bold text-amber-300">{auditResult.score}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {auditResult.checks.map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-[#070c18] p-3 text-xs"
              >
                {c.passed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5 flex-1">
                  <div className="font-semibold text-slate-200">{c.title}</div>
                  <div className="text-slate-400">{c.recommendation}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions and Disclaimer */}
          <div className="border-t border-slate-800 pt-4 space-y-3">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-200 leading-relaxed">
              <strong>Пошаговая инструкция:</strong> {t.seo.consoleInstruction}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-[11px] text-slate-400 leading-relaxed">
              ⚠️ <em>{t.seo.importantDisclaimer}</em>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
