import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Analyzer — Free Website SEO Checker",
  description:
    "Free SEO analyzer tool. Check any website's SEO score with 16+ on-page checks. Get actionable recommendations for meta tags, headings, images, structured data, and more.",
  keywords: [
    "seo analyzer",
    "seo checker",
    "website analyzer",
    "seo audit tool",
    "site seo check",
    "free seo tool",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
