import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Gradient Generator — Create Gradients Online",
  description: "Free CSS gradient generator. Create beautiful linear and radial gradients with live preview and instantly copy the ready-to-use CSS code. No sign-up.",
  keywords: ["css gradient generator", "gradient maker", "css gradient", "linear gradient generator", "radial gradient"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/css-gradient-generator",
    languages: {
      en: "https://toolpilot.pages.dev/tools/css-gradient-generator",
      es: "https://toolpilot.pages.dev/es/tools/css-gradient-generator",
      pt: "https://toolpilot.pages.dev/pt/tools/css-gradient-generator",
      ja: "https://toolpilot.pages.dev/ja/tools/css-gradient-generator",
      ko: "https://toolpilot.pages.dev/ko/tools/css-gradient-generator",
      zh: "https://toolpilot.pages.dev/zh/tools/css-gradient-generator",
      id: "https://toolpilot.pages.dev/id/tools/css-gradient-generator",
      de: "https://toolpilot.pages.dev/de/tools/css-gradient-generator",
      fr: "https://toolpilot.pages.dev/fr/tools/css-gradient-generator",
    },
  },
  openGraph: {
    title: "CSS Gradient Generator — Create Gradients Online",
    description: "Free CSS gradient generator. Create beautiful linear and radial gradients with live preview and instantly copy the ready-to-use CSS code. No sign-up.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
