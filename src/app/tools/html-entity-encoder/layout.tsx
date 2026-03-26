import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Entity Encoder & Decoder — Encode HTML Online",
  description: "Free online HTML entity encoder and decoder. Encode special characters for safe HTML or decode entities back to text.",
  keywords: ["html entity encoder", "html entity decoder", "html encode online", "html special characters", "xss prevention"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
