import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Counter — Count Words, Characters, Sentences Online",
  description:
    "Free online word counter. Count words, characters, sentences, paragraphs, and reading time instantly. No sign-up required.",
  keywords: [
    "word counter",
    "character counter",
    "word count online",
    "letter count",
    "sentence counter",
    "reading time calculator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
