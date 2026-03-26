import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter — Count Words & Characters Online",
  description: "Free online word counter. Count words, characters, sentences, paragraphs, and estimated reading time instantly. No sign-up required, works offline.",
  keywords: [
    "word counter",
    "character counter",
    "word count online",
    "letter count",
    "sentence counter",
    "reading time calculator",
  ],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/word-counter",
    languages: {
      en: "https://toolpilot.pages.dev/tools/word-counter",
      es: "https://toolpilot.pages.dev/es/tools/word-counter",
      pt: "https://toolpilot.pages.dev/pt/tools/word-counter",
      ja: "https://toolpilot.pages.dev/ja/tools/word-counter",
      ko: "https://toolpilot.pages.dev/ko/tools/word-counter",
      zh: "https://toolpilot.pages.dev/zh/tools/word-counter",
      id: "https://toolpilot.pages.dev/id/tools/word-counter",
      de: "https://toolpilot.pages.dev/de/tools/word-counter",
      fr: "https://toolpilot.pages.dev/fr/tools/word-counter",
    },
  },
  openGraph: {
    title: "Word Counter — Count Words & Characters Online",
    description: "Free online word counter. Count words, characters, sentences, paragraphs, and estimated reading time instantly. No sign-up required, works offline.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
