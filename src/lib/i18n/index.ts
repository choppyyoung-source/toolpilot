import { type Locale } from "./locales";
import es from "./es";
import pt from "./pt";
import ja from "./ja";
import ko from "./ko";
import zh from "./zh";
import id from "./id";
import de from "./de";
import fr from "./fr";

const translations: Record<Locale, typeof es> = { es, pt, ja, ko, zh, id, de, fr };

export function getTranslation(locale: Locale) {
  return translations[locale];
}

export function getToolTranslation(locale: Locale, slug: string) {
  const t = translations[locale];
  return t.tools[slug as keyof typeof t.tools] || null;
}
