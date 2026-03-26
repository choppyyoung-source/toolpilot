import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Picker & Special Characters — Copy & Paste",
  description:
    "Free emoji picker and special character map. Click to copy emojis, kaomoji, symbols, arrows, and special characters. Over 700 characters.",
  keywords: [
    "emoji picker",
    "emoji copy paste",
    "special characters",
    "kaomoji",
    "symbol picker",
    "emoticon copy",
    "unicode characters",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
