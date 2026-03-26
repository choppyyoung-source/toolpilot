export const locales = ["es", "pt", "ja", "ko", "zh", "id", "de", "fr"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: "Español",
  pt: "Português",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
  id: "Bahasa Indonesia",
  de: "Deutsch",
  fr: "Français",
};

export const localeLabels: Record<Locale, string> = {
  es: "Spanish",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  id: "Indonesian",
  de: "German",
  fr: "French",
};
