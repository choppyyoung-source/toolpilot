import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Preview — Live Markdown Editor & Viewer",
  description: "Free online Markdown previewer and editor. Write Markdown and see a live rendered preview instantly. Copy the rendered HTML output with one click.",
  keywords: ["markdown preview", "markdown editor", "markdown to html", "markdown viewer", "live markdown"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/markdown-preview",
    languages: {
      en: "https://toolpilot.pages.dev/tools/markdown-preview",
      es: "https://toolpilot.pages.dev/es/tools/markdown-preview",
      pt: "https://toolpilot.pages.dev/pt/tools/markdown-preview",
      ja: "https://toolpilot.pages.dev/ja/tools/markdown-preview",
      ko: "https://toolpilot.pages.dev/ko/tools/markdown-preview",
      zh: "https://toolpilot.pages.dev/zh/tools/markdown-preview",
      id: "https://toolpilot.pages.dev/id/tools/markdown-preview",
      de: "https://toolpilot.pages.dev/de/tools/markdown-preview",
      fr: "https://toolpilot.pages.dev/fr/tools/markdown-preview",
    },
  },
  openGraph: {
    title: "Markdown Preview — Live Markdown Editor & Viewer",
    description: "Free online Markdown previewer and editor. Write Markdown and see a live rendered preview instantly. Copy the rendered HTML output with one click.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
