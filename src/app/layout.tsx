import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd, { websiteSchema, organizationSchema } from "@/components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toolpilot.pages.dev"),
  alternates: {
    canonical: "https://toolpilot.pages.dev",
    languages: {
      en: "https://toolpilot.pages.dev",
      es: "https://toolpilot.pages.dev/es",
      pt: "https://toolpilot.pages.dev/pt",
      ja: "https://toolpilot.pages.dev/ja",
      ko: "https://toolpilot.pages.dev/ko",
      zh: "https://toolpilot.pages.dev/zh",
      id: "https://toolpilot.pages.dev/id",
      de: "https://toolpilot.pages.dev/de",
      fr: "https://toolpilot.pages.dev/fr",
    },
  },
  title: {
    default: "ToolPilot — Free Online Tools for Everyone",
    template: "%s | ToolPilot",
  },
  description:
    "Free online tools: word counter, JSON formatter, Base64 encoder, color converter, unit converter, and more. No sign-up. Fast and private.",
  keywords: [
    "online tools",
    "free tools",
    "word counter",
    "json formatter",
    "base64 encoder",
    "color converter",
    "unit converter",
    "case converter",
    "developer tools",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ToolPilot",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ToolPilot — Free Online Tools for Everyone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-adsense-account" content="ca-pub-5473625991326486" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5473625991326486"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex min-h-full flex-col bg-gray-50 text-gray-900">
        <JsonLd data={websiteSchema()} />
        <JsonLd data={organizationSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
