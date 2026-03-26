import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder & Decoder — Encode/Decode URLs Online",
  description: "Free online URL encoder and decoder. Percent-encode or decode URLs and query parameters instantly. Supports Unicode.",
  keywords: ["url encoder", "url decoder", "percent encoding", "urlencode online", "decode url"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
