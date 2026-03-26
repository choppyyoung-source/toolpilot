import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Beautify JSON",
  description: "Free online JSON formatter and validator. Beautify, minify, and validate JSON data instantly. Debug JSON errors with clear, actionable error messages.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json pretty print",
    "json minifier",
  ],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/json-formatter",
    languages: {
      en: "https://toolpilot.pages.dev/tools/json-formatter",
      es: "https://toolpilot.pages.dev/es/tools/json-formatter",
      pt: "https://toolpilot.pages.dev/pt/tools/json-formatter",
      ja: "https://toolpilot.pages.dev/ja/tools/json-formatter",
      ko: "https://toolpilot.pages.dev/ko/tools/json-formatter",
      zh: "https://toolpilot.pages.dev/zh/tools/json-formatter",
      id: "https://toolpilot.pages.dev/id/tools/json-formatter",
      de: "https://toolpilot.pages.dev/de/tools/json-formatter",
      fr: "https://toolpilot.pages.dev/fr/tools/json-formatter",
    },
  },
  openGraph: {
    title: "JSON Formatter & Validator — Beautify JSON",
    description: "Free online JSON formatter and validator. Beautify, minify, and validate JSON data instantly. Debug JSON errors with clear, actionable error messages.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
