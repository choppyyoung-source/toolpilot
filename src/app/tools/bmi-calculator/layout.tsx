import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Calculator — Calculate Body Mass Index",
  description: "Free online BMI calculator. Calculate your Body Mass Index using metric or imperial units. Get instant results with health category and weight range.",
  keywords: ["bmi calculator", "body mass index calculator", "calculate bmi", "bmi checker", "weight calculator"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/bmi-calculator",
    languages: {
      en: "https://toolpilot.pages.dev/tools/bmi-calculator",
      es: "https://toolpilot.pages.dev/es/tools/bmi-calculator",
      pt: "https://toolpilot.pages.dev/pt/tools/bmi-calculator",
      ja: "https://toolpilot.pages.dev/ja/tools/bmi-calculator",
      ko: "https://toolpilot.pages.dev/ko/tools/bmi-calculator",
      zh: "https://toolpilot.pages.dev/zh/tools/bmi-calculator",
      id: "https://toolpilot.pages.dev/id/tools/bmi-calculator",
      de: "https://toolpilot.pages.dev/de/tools/bmi-calculator",
      fr: "https://toolpilot.pages.dev/fr/tools/bmi-calculator",
    },
  },
  openGraph: {
    title: "BMI Calculator — Calculate Body Mass Index",
    description: "Free online BMI calculator. Calculate your Body Mass Index using metric or imperial units. Get instant results with health category and weight range.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
