import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to CSV Converter — Convert JSON Online",
  description: "Free online JSON to CSV converter. Convert JSON arrays to CSV format instantly and download the file. Supports nested objects and large datasets.",
  keywords: ["json to csv", "convert json to csv", "json csv converter", "json to csv online", "json to spreadsheet"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/json-to-csv",
    languages: {
      en: "https://toolpilot.pages.dev/tools/json-to-csv",
      es: "https://toolpilot.pages.dev/es/tools/json-to-csv",
      pt: "https://toolpilot.pages.dev/pt/tools/json-to-csv",
      ja: "https://toolpilot.pages.dev/ja/tools/json-to-csv",
      ko: "https://toolpilot.pages.dev/ko/tools/json-to-csv",
      zh: "https://toolpilot.pages.dev/zh/tools/json-to-csv",
      id: "https://toolpilot.pages.dev/id/tools/json-to-csv",
      de: "https://toolpilot.pages.dev/de/tools/json-to-csv",
      fr: "https://toolpilot.pages.dev/fr/tools/json-to-csv",
    },
  },
  openGraph: {
    title: "JSON to CSV Converter — Convert JSON Online",
    description: "Free online JSON to CSV converter. Convert JSON arrays to CSV format instantly and download the file. Supports nested objects and large datasets.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
