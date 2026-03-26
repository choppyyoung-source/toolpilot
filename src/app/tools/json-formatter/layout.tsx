import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Beautify JSON Online",
  description:
    "Free online JSON formatter and validator. Beautify, minify, and validate JSON data instantly. Debug JSON errors with clear error messages.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json pretty print",
    "json minifier",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
