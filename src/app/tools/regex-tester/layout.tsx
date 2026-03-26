import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester — Test Regular Expressions Online",
  description: "Free online regex tester. Test regular expressions with real-time matching, highlighting, and match details. Supports all JavaScript regex flags and syntax.",
  keywords: ["regex tester", "regular expression tester", "regex online", "regex checker", "regex debugger"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/regex-tester",
    languages: {
      en: "https://toolpilot.pages.dev/tools/regex-tester",
      es: "https://toolpilot.pages.dev/es/tools/regex-tester",
      pt: "https://toolpilot.pages.dev/pt/tools/regex-tester",
      ja: "https://toolpilot.pages.dev/ja/tools/regex-tester",
      ko: "https://toolpilot.pages.dev/ko/tools/regex-tester",
      zh: "https://toolpilot.pages.dev/zh/tools/regex-tester",
      id: "https://toolpilot.pages.dev/id/tools/regex-tester",
      de: "https://toolpilot.pages.dev/de/tools/regex-tester",
      fr: "https://toolpilot.pages.dev/fr/tools/regex-tester",
    },
  },
  openGraph: {
    title: "Regex Tester — Test Regular Expressions Online",
    description: "Free online regex tester. Test regular expressions with real-time matching, highlighting, and match details. Supports all JavaScript regex flags and syntax.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
