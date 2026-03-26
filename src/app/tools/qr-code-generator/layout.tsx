import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator — Create Free QR Codes Online",
  description:
    "Free online QR code generator. Create QR codes for URLs, text, Wi-Fi, and more. Download as high-resolution PNG. No sign-up required.",
  keywords: ["qr code generator", "create qr code", "qr code maker", "free qr code", "qr code online"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
