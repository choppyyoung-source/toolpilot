import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Converter — HEX to RGB, HSL & More",
  description: "Free online color converter. Convert colors between HEX, RGB, and HSL formats instantly with a live color picker and real-time preview. No sign-up needed.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hex to hsl",
    "color picker online",
  ],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/color-converter",
    languages: {
      en: "https://toolpilot.pages.dev/tools/color-converter",
      es: "https://toolpilot.pages.dev/es/tools/color-converter",
      pt: "https://toolpilot.pages.dev/pt/tools/color-converter",
      ja: "https://toolpilot.pages.dev/ja/tools/color-converter",
      ko: "https://toolpilot.pages.dev/ko/tools/color-converter",
      zh: "https://toolpilot.pages.dev/zh/tools/color-converter",
      id: "https://toolpilot.pages.dev/id/tools/color-converter",
      de: "https://toolpilot.pages.dev/de/tools/color-converter",
      fr: "https://toolpilot.pages.dev/fr/tools/color-converter",
    },
  },
  openGraph: {
    title: "Color Converter — HEX to RGB, HSL & More",
    description: "Free online color converter. Convert colors between HEX, RGB, and HSL formats instantly with a live color picker and real-time preview. No sign-up needed.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
