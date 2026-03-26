import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator — SHA-256, SHA-1, SHA-512 Online",
  description: "Free online hash generator. Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text using the Web Crypto API. Instant and secure results.",
  keywords: ["hash generator", "sha256 generator", "sha1 hash", "sha512 online", "hash calculator"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/hash-generator",
    languages: {
      en: "https://toolpilot.pages.dev/tools/hash-generator",
      es: "https://toolpilot.pages.dev/es/tools/hash-generator",
      pt: "https://toolpilot.pages.dev/pt/tools/hash-generator",
      ja: "https://toolpilot.pages.dev/ja/tools/hash-generator",
      ko: "https://toolpilot.pages.dev/ko/tools/hash-generator",
      zh: "https://toolpilot.pages.dev/zh/tools/hash-generator",
      id: "https://toolpilot.pages.dev/id/tools/hash-generator",
      de: "https://toolpilot.pages.dev/de/tools/hash-generator",
      fr: "https://toolpilot.pages.dev/fr/tools/hash-generator",
    },
  },
  openGraph: {
    title: "Hash Generator — SHA-256, SHA-1, SHA-512 Online",
    description: "Free online hash generator. Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text using the Web Crypto API. Instant and secure results.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
