import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter — Length, Weight & Temperature",
  description: "Free online unit converter. Convert between units of length, weight, temperature, area, and volume. Supports both metric and imperial measurement systems.",
  keywords: [
    "unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "metric to imperial",
  ],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/unit-converter",
    languages: {
      en: "https://toolpilot.pages.dev/tools/unit-converter",
      es: "https://toolpilot.pages.dev/es/tools/unit-converter",
      pt: "https://toolpilot.pages.dev/pt/tools/unit-converter",
      ja: "https://toolpilot.pages.dev/ja/tools/unit-converter",
      ko: "https://toolpilot.pages.dev/ko/tools/unit-converter",
      zh: "https://toolpilot.pages.dev/zh/tools/unit-converter",
      id: "https://toolpilot.pages.dev/id/tools/unit-converter",
      de: "https://toolpilot.pages.dev/de/tools/unit-converter",
      fr: "https://toolpilot.pages.dev/fr/tools/unit-converter",
    },
  },
  openGraph: {
    title: "Unit Converter — Length, Weight & Temperature",
    description: "Free online unit converter. Convert between units of length, weight, temperature, area, and volume. Supports both metric and imperial measurement systems.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
