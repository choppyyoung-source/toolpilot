import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator — Create Free QR Codes Online",
  description: "Free online QR code generator. Create QR codes for URLs, text, Wi-Fi, and more. Download as high-resolution PNG. No sign-up required.",
  keywords: ["qr code generator", "create qr code", "qr code maker", "free qr code", "qr code online"],
  alternates: {
    canonical: "https://toolpilot.pages.dev/tools/qr-code-generator",
    languages: {
      en: "https://toolpilot.pages.dev/tools/qr-code-generator",
      es: "https://toolpilot.pages.dev/es/tools/qr-code-generator",
      pt: "https://toolpilot.pages.dev/pt/tools/qr-code-generator",
      ja: "https://toolpilot.pages.dev/ja/tools/qr-code-generator",
      ko: "https://toolpilot.pages.dev/ko/tools/qr-code-generator",
      zh: "https://toolpilot.pages.dev/zh/tools/qr-code-generator",
      id: "https://toolpilot.pages.dev/id/tools/qr-code-generator",
      de: "https://toolpilot.pages.dev/de/tools/qr-code-generator",
      fr: "https://toolpilot.pages.dev/fr/tools/qr-code-generator",
    },
  },
  openGraph: {
    title: "QR Code Generator — Create Free QR Codes Online",
    description: "Free online QR code generator. Create QR codes for URLs, text, Wi-Fi, and more. Download as high-resolution PNG. No sign-up required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
