"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/locales";

const langMap: Record<string, Locale> = {
  es: "es", "es-ES": "es", "es-MX": "es", "es-AR": "es",
  pt: "pt", "pt-BR": "pt", "pt-PT": "pt",
  ja: "ja", "ja-JP": "ja",
  ko: "ko", "ko-KR": "ko",
  zh: "zh", "zh-CN": "zh", "zh-TW": "zh", "zh-HK": "zh",
  id: "id", "id-ID": "id", ms: "id",
  de: "de", "de-DE": "de", "de-AT": "de", "de-CH": "de",
  fr: "fr", "fr-FR": "fr", "fr-CA": "fr", "fr-BE": "fr",
};

const suggestions: Record<Locale, string> = {
  es: "Esta página está disponible en español",
  pt: "Esta página está disponível em português",
  ja: "このページは日本語でご覧いただけます",
  ko: "이 페이지는 한국어로 제공됩니다",
  zh: "此页面提供中文版本",
  id: "Halaman ini tersedia dalam Bahasa Indonesia",
  de: "Diese Seite ist auf Deutsch verfügbar",
  fr: "Cette page est disponible en français",
};

export default function LanguageSuggest() {
  const [suggestedLocale, setSuggestedLocale] = useState<Locale | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show on locale pages
    if (locales.some((l) => pathname.startsWith(`/${l}`))) return;

    // Check if already dismissed
    if (localStorage.getItem("lang-dismissed")) return;

    // Detect browser language
    const browserLang = navigator.language;
    const matched = langMap[browserLang] || langMap[browserLang.split("-")[0]];
    if (matched) setSuggestedLocale(matched);
  }, [pathname]);

  if (!suggestedLocale || dismissed) return null;

  // Build localized path
  const localePath = `/${suggestedLocale}${pathname}`;

  function dismiss() {
    setDismissed(true);
    localStorage.setItem("lang-dismissed", "1");
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg animate-[slideUp_0.3s_ease-out] rounded-lg border border-blue-200 bg-white p-4 shadow-lg sm:left-auto sm:right-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <p className="font-medium text-gray-900">
            {suggestions[suggestedLocale]}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href={localePath}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
          >
            {localeNames[suggestedLocale]}
          </Link>
          <button
            onClick={dismiss}
            className="rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-600 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
