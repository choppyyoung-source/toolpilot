import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter — Transform Text Case Online",
  description:
    "Free online case converter. Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case instantly.",
  keywords: [
    "case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "camelCase converter",
    "snake_case converter",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
