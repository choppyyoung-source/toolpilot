import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor — Reduce Image Size Online",
  description: "Free online image compressor. Reduce image file size while maintaining quality. All processing happens in your browser — no upload, fully private.",
  keywords: ["image compressor", "compress image online", "reduce image size", "image optimizer", "jpeg compressor"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/image-compressor",
    languages: {
      en: "https://toolpilot.pages.dev/tools/image-compressor",
      es: "https://toolpilot.pages.dev/es/tools/image-compressor",
      pt: "https://toolpilot.pages.dev/pt/tools/image-compressor",
      ja: "https://toolpilot.pages.dev/ja/tools/image-compressor",
      ko: "https://toolpilot.pages.dev/ko/tools/image-compressor",
      zh: "https://toolpilot.pages.dev/zh/tools/image-compressor",
      id: "https://toolpilot.pages.dev/id/tools/image-compressor",
      de: "https://toolpilot.pages.dev/de/tools/image-compressor",
      fr: "https://toolpilot.pages.dev/fr/tools/image-compressor",
    },
  },
  openGraph: {
    title: "Image Compressor — Reduce Image Size Online",
    description: "Free online image compressor. Reduce image file size while maintaining quality. All processing happens in your browser — no upload, fully private.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
