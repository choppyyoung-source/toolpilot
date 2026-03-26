import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator — Strong Random Passwords",
  description: "Free online password generator. Create strong, random, secure passwords with customizable length and character types. No data stored, fully private.",
  keywords: ["password generator", "random password", "strong password generator", "secure password", "password creator"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/password-generator",
    languages: {
      en: "https://toolpilot.pages.dev/tools/password-generator",
      es: "https://toolpilot.pages.dev/es/tools/password-generator",
      pt: "https://toolpilot.pages.dev/pt/tools/password-generator",
      ja: "https://toolpilot.pages.dev/ja/tools/password-generator",
      ko: "https://toolpilot.pages.dev/ko/tools/password-generator",
      zh: "https://toolpilot.pages.dev/zh/tools/password-generator",
      id: "https://toolpilot.pages.dev/id/tools/password-generator",
      de: "https://toolpilot.pages.dev/de/tools/password-generator",
      fr: "https://toolpilot.pages.dev/fr/tools/password-generator",
    },
  },
  openGraph: {
    title: "Password Generator — Strong Random Passwords",
    description: "Free online password generator. Create strong, random, secure passwords with customizable length and character types. No data stored, fully private.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
