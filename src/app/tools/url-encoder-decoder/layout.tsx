import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder — Encode URLs Online",
  description: "Free online URL encoder and decoder. Percent-encode or decode URLs and query parameters instantly. Supports full Unicode and complex query strings.",
  keywords: ["url encoder", "url decoder", "percent encoding", "urlencode online", "decode url"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/url-encoder-decoder",
    languages: {
      en: "https://toolpilot.pages.dev/tools/url-encoder-decoder",
      es: "https://toolpilot.pages.dev/es/tools/url-encoder-decoder",
      pt: "https://toolpilot.pages.dev/pt/tools/url-encoder-decoder",
      ja: "https://toolpilot.pages.dev/ja/tools/url-encoder-decoder",
      ko: "https://toolpilot.pages.dev/ko/tools/url-encoder-decoder",
      zh: "https://toolpilot.pages.dev/zh/tools/url-encoder-decoder",
      id: "https://toolpilot.pages.dev/id/tools/url-encoder-decoder",
      de: "https://toolpilot.pages.dev/de/tools/url-encoder-decoder",
      fr: "https://toolpilot.pages.dev/fr/tools/url-encoder-decoder",
    },
  },
  openGraph: {
    title: "URL Encoder & Decoder — Encode URLs Online",
    description: "Free online URL encoder and decoder. Percent-encode or decode URLs and query parameters instantly. Supports full Unicode and complex query strings.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
