import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter — Epoch Time to Date",
  description: "Free online Unix timestamp converter. Convert between Unix timestamps and human-readable dates. Supports both seconds and milliseconds epoch formats.",
  keywords: ["timestamp converter", "unix timestamp", "epoch converter", "date to timestamp", "epoch time"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/timestamp-converter",
    languages: {
      en: "https://toolpilot.pages.dev/tools/timestamp-converter",
      es: "https://toolpilot.pages.dev/es/tools/timestamp-converter",
      pt: "https://toolpilot.pages.dev/pt/tools/timestamp-converter",
      ja: "https://toolpilot.pages.dev/ja/tools/timestamp-converter",
      ko: "https://toolpilot.pages.dev/ko/tools/timestamp-converter",
      zh: "https://toolpilot.pages.dev/zh/tools/timestamp-converter",
      id: "https://toolpilot.pages.dev/id/tools/timestamp-converter",
      de: "https://toolpilot.pages.dev/de/tools/timestamp-converter",
      fr: "https://toolpilot.pages.dev/fr/tools/timestamp-converter",
    },
  },
  openGraph: {
    title: "Unix Timestamp Converter — Epoch Time to Date",
    description: "Free online Unix timestamp converter. Convert between Unix timestamps and human-readable dates. Supports both seconds and milliseconds epoch formats.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
