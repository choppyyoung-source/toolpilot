"use client";

import { useState, useRef, useEffect } from "react";
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

const flags: Record<string, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  pt: "🇧🇷",
  ja: "🇯🇵",
  ko: "🇰🇷",
  zh: "🇨🇳",
  id: "🇮🇩",
  de: "🇩🇪",
  fr: "🇫🇷",
};

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Detect current locale from path
  const currentLocale = locales.find((l) => pathname.startsWith(`/${l}`));
  const currentLang = currentLocale || "en";
  const currentLabel = currentLocale ? localeNames[currentLocale] : "English";

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Build path for a given locale
  function getLocalePath(locale: string) {
    if (locale === "en") {
      // Strip locale prefix if present
      if (currentLocale) return pathname.replace(`/${currentLocale}`, "") || "/";
      return pathname;
    }
    if (currentLocale) {
      return pathname.replace(`/${currentLocale}`, `/${locale}`);
    }
    return `/${locale}${pathname}`;
  }

  // Auto-suggest on first visit
  useEffect(() => {
    if (currentLocale) return; // Already on a locale page
    if (localStorage.getItem("lang-seen")) return;
    localStorage.setItem("lang-seen", "1");
    const browserLang = navigator.language;
    const matched = langMap[browserLang] || langMap[browserLang.split("-")[0]];
    if (matched) setOpen(true); // Open dropdown to hint
  }, [currentLocale]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Select language"
      >
        <span>{flags[currentLang]}</span>
        <span className="hidden sm:inline">{currentLabel}</span>
        <svg className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {/* English */}
          <Link
            href={getLocalePath("en")}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 ${currentLang === "en" ? "font-medium text-blue-600 bg-blue-50" : "text-gray-700"}`}
          >
            <span>🇺🇸</span> English
          </Link>
          {/* Other locales */}
          {locales.map((l) => (
            <Link
              key={l}
              href={getLocalePath(l)}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 ${currentLang === l ? "font-medium text-blue-600 bg-blue-50" : "text-gray-700"}`}
            >
              <span>{flags[l]}</span> {localeNames[l]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
