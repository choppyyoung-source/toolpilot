import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Entity Encoder & Decoder Online",
  description: "Free online HTML entity encoder and decoder. Encode special characters for safe HTML output or decode entities back to plain text. Helps prevent XSS.",
  keywords: ["html entity encoder", "html entity decoder", "html encode online", "html special characters", "xss prevention"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/html-entity-encoder",
    languages: {
      en: "https://toolpilot.pages.dev/tools/html-entity-encoder",
      es: "https://toolpilot.pages.dev/es/tools/html-entity-encoder",
      pt: "https://toolpilot.pages.dev/pt/tools/html-entity-encoder",
      ja: "https://toolpilot.pages.dev/ja/tools/html-entity-encoder",
      ko: "https://toolpilot.pages.dev/ko/tools/html-entity-encoder",
      zh: "https://toolpilot.pages.dev/zh/tools/html-entity-encoder",
      id: "https://toolpilot.pages.dev/id/tools/html-entity-encoder",
      de: "https://toolpilot.pages.dev/de/tools/html-entity-encoder",
      fr: "https://toolpilot.pages.dev/fr/tools/html-entity-encoder",
    },
  },
  openGraph: {
    title: "HTML Entity Encoder & Decoder Online",
    description: "Free online HTML entity encoder and decoder. Encode special characters for safe HTML output or decode entities back to plain text. Helps prevent XSS.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
