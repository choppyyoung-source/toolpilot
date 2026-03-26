import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Preview — Live Markdown Editor & Viewer",
  description: "Free online Markdown previewer. Write Markdown and see a live preview instantly. Copy rendered HTML with one click.",
  keywords: ["markdown preview", "markdown editor", "markdown to html", "markdown viewer", "live markdown"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
