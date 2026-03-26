import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Encode/Decode Online",
  description: "Free online Base64 encoder and decoder. Convert text or files to and from Base64 format instantly with full Unicode support. No sign-up needed.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "encode base64 online",
    "decode base64 online",
  ],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/base64-encoder-decoder",
    languages: {
      en: "https://toolpilot.pages.dev/tools/base64-encoder-decoder",
      es: "https://toolpilot.pages.dev/es/tools/base64-encoder-decoder",
      pt: "https://toolpilot.pages.dev/pt/tools/base64-encoder-decoder",
      ja: "https://toolpilot.pages.dev/ja/tools/base64-encoder-decoder",
      ko: "https://toolpilot.pages.dev/ko/tools/base64-encoder-decoder",
      zh: "https://toolpilot.pages.dev/zh/tools/base64-encoder-decoder",
      id: "https://toolpilot.pages.dev/id/tools/base64-encoder-decoder",
      de: "https://toolpilot.pages.dev/de/tools/base64-encoder-decoder",
      fr: "https://toolpilot.pages.dev/fr/tools/base64-encoder-decoder",
    },
  },
  openGraph: {
    title: "Base64 Encoder & Decoder — Encode/Decode Online",
    description: "Free online Base64 encoder and decoder. Convert text or files to and from Base64 format instantly with full Unicode support. No sign-up needed.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
