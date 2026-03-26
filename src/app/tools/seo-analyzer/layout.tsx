import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO, AEO & GEO Analyzer — Free Website Checker",
  description:
    "Free SEO, AEO, and GEO analyzer. Check any website with 28+ checks covering on-page SEO, Answer Engine Optimization, and Generative Engine Optimization. Get a score and actionable recommendations.",
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
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
