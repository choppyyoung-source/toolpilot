import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter — Transform Text Case Online",
  description: "Free online case converter. Transform text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case instantly. No install needed.",
  keywords: [
    "case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "camelCase converter",
    "snake_case converter",
  ],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/case-converter",
    languages: {
      en: "https://toolpilot.pages.dev/tools/case-converter",
      es: "https://toolpilot.pages.dev/es/tools/case-converter",
      pt: "https://toolpilot.pages.dev/pt/tools/case-converter",
      ja: "https://toolpilot.pages.dev/ja/tools/case-converter",
      ko: "https://toolpilot.pages.dev/ko/tools/case-converter",
      zh: "https://toolpilot.pages.dev/zh/tools/case-converter",
      id: "https://toolpilot.pages.dev/id/tools/case-converter",
      de: "https://toolpilot.pages.dev/de/tools/case-converter",
      fr: "https://toolpilot.pages.dev/fr/tools/case-converter",
    },
  },
  openGraph: {
    title: "Case Converter — Transform Text Case Online",
    description: "Free online case converter. Transform text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case instantly. No install needed.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
