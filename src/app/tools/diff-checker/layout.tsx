import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diff Checker — Compare Text Online",
  description: "Free online diff checker. Compare two texts and see differences highlighted line by line. Perfect for code, documents, and configs.",
  keywords: ["diff checker", "text compare", "diff tool online", "compare text", "code diff"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/diff-checker",
    languages: {
      en: "https://toolpilot.pages.dev/tools/diff-checker",
      es: "https://toolpilot.pages.dev/es/tools/diff-checker",
      pt: "https://toolpilot.pages.dev/pt/tools/diff-checker",
      ja: "https://toolpilot.pages.dev/ja/tools/diff-checker",
      ko: "https://toolpilot.pages.dev/ko/tools/diff-checker",
      zh: "https://toolpilot.pages.dev/zh/tools/diff-checker",
      id: "https://toolpilot.pages.dev/id/tools/diff-checker",
      de: "https://toolpilot.pages.dev/de/tools/diff-checker",
      fr: "https://toolpilot.pages.dev/fr/tools/diff-checker",
    },
  },
  openGraph: {
    title: "Diff Checker — Compare Text Online",
    description: "Free online diff checker. Compare two texts and see differences highlighted line by line. Perfect for code, documents, and configs.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
