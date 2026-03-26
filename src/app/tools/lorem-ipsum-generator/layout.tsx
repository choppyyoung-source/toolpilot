import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Free Placeholder Text",
  description: "Generate Lorem Ipsum placeholder text in paragraphs, sentences, or words. Free online dummy text generator for designers and developers. Instant output.",
  keywords: [
    "lorem ipsum generator",
    "placeholder text",
    "dummy text",
    "filler text generator",
  ],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/lorem-ipsum-generator",
    languages: {
      en: "https://toolpilot.pages.dev/tools/lorem-ipsum-generator",
      es: "https://toolpilot.pages.dev/es/tools/lorem-ipsum-generator",
      pt: "https://toolpilot.pages.dev/pt/tools/lorem-ipsum-generator",
      ja: "https://toolpilot.pages.dev/ja/tools/lorem-ipsum-generator",
      ko: "https://toolpilot.pages.dev/ko/tools/lorem-ipsum-generator",
      zh: "https://toolpilot.pages.dev/zh/tools/lorem-ipsum-generator",
      id: "https://toolpilot.pages.dev/id/tools/lorem-ipsum-generator",
      de: "https://toolpilot.pages.dev/de/tools/lorem-ipsum-generator",
      fr: "https://toolpilot.pages.dev/fr/tools/lorem-ipsum-generator",
    },
  },
  openGraph: {
    title: "Lorem Ipsum Generator — Free Placeholder Text",
    description: "Generate Lorem Ipsum placeholder text in paragraphs, sentences, or words. Free online dummy text generator for designers and developers. Instant output.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
