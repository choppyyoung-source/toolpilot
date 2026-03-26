import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Picker & Special Characters — Copy & Paste",
  description: "Free emoji picker and special character map. Click to copy emojis, kaomoji, symbols, arrows, and special characters. Over 700 characters available.",
  keywords: [
    "emoji picker",
    "emoji copy paste",
    "special characters",
    "kaomoji",
    "symbol picker",
    "emoticon copy",
    "unicode characters",
  ],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/emoji-picker",
    languages: {
      en: "https://toolpilot.pages.dev/tools/emoji-picker",
      es: "https://toolpilot.pages.dev/es/tools/emoji-picker",
      pt: "https://toolpilot.pages.dev/pt/tools/emoji-picker",
      ja: "https://toolpilot.pages.dev/ja/tools/emoji-picker",
      ko: "https://toolpilot.pages.dev/ko/tools/emoji-picker",
      zh: "https://toolpilot.pages.dev/zh/tools/emoji-picker",
      id: "https://toolpilot.pages.dev/id/tools/emoji-picker",
      de: "https://toolpilot.pages.dev/de/tools/emoji-picker",
      fr: "https://toolpilot.pages.dev/fr/tools/emoji-picker",
    },
  },
  openGraph: {
    title: "Emoji Picker & Special Characters — Copy & Paste",
    description: "Free emoji picker and special character map. Click to copy emojis, kaomoji, symbols, arrows, and special characters. Over 700 characters available.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
