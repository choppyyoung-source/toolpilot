import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder — Encode/Decode Online",
  description:
    "Free online Base64 encoder and decoder. Convert text to and from Base64 format instantly with full Unicode support.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "encode base64 online",
    "decode base64 online",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
