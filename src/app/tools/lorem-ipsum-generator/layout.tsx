import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Free Placeholder Text",
  description:
    "Generate Lorem Ipsum placeholder text in paragraphs, sentences, or words. Free online dummy text generator for designers and developers.",
  keywords: [
    "lorem ipsum generator",
    "placeholder text",
    "dummy text",
    "filler text generator",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
