import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO, AEO & GEO Analyzer — Free Website Checker",
  description: "Free SEO, AEO, and GEO analyzer. Check any website with 28+ checks covering on-page SEO, Answer Engine, and Generative Engine Optimization.",
  keywords: [
    "seo analyzer",
    "aeo checker",
    "geo analyzer",
    "answer engine optimization",
    "generative engine optimization",
    "seo audit tool",
    "website seo checker",
    "ai seo tool",
  ],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/seo-analyzer",
    languages: {
      en: "https://toolpilot.pages.dev/tools/seo-analyzer",
      es: "https://toolpilot.pages.dev/es/tools/seo-analyzer",
      pt: "https://toolpilot.pages.dev/pt/tools/seo-analyzer",
      ja: "https://toolpilot.pages.dev/ja/tools/seo-analyzer",
      ko: "https://toolpilot.pages.dev/ko/tools/seo-analyzer",
      zh: "https://toolpilot.pages.dev/zh/tools/seo-analyzer",
      id: "https://toolpilot.pages.dev/id/tools/seo-analyzer",
      de: "https://toolpilot.pages.dev/de/tools/seo-analyzer",
      fr: "https://toolpilot.pages.dev/fr/tools/seo-analyzer",
    },
  },
  openGraph: {
    title: "SEO, AEO & GEO Analyzer — Free Website Checker",
    description: "Free SEO, AEO, and GEO analyzer. Check any website with 28+ checks covering on-page SEO, Answer Engine, and Generative Engine Optimization.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
