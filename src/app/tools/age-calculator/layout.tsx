import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator — How Old Am I?",
  description: "Free online age calculator. Find your exact age in years, months, days, weeks, and hours from your date of birth. Fast and accurate results.",
  keywords: ["age calculator", "calculate age", "how old am i", "birthday calculator", "date of birth calculator"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/age-calculator",
    languages: {
      en: "https://toolpilot.pages.dev/tools/age-calculator",
      es: "https://toolpilot.pages.dev/es/tools/age-calculator",
      pt: "https://toolpilot.pages.dev/pt/tools/age-calculator",
      ja: "https://toolpilot.pages.dev/ja/tools/age-calculator",
      ko: "https://toolpilot.pages.dev/ko/tools/age-calculator",
      zh: "https://toolpilot.pages.dev/zh/tools/age-calculator",
      id: "https://toolpilot.pages.dev/id/tools/age-calculator",
      de: "https://toolpilot.pages.dev/de/tools/age-calculator",
      fr: "https://toolpilot.pages.dev/fr/tools/age-calculator",
    },
  },
  openGraph: {
    title: "Age Calculator — How Old Am I?",
    description: "Free online age calculator. Find your exact age in years, months, days, weeks, and hours from your date of birth. Fast and accurate results.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
