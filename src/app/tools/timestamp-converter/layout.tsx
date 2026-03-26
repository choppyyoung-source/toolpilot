import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter — Epoch Time to Date",
  description: "Free online Unix timestamp converter. Convert between Unix timestamps and human-readable dates. Supports seconds and milliseconds.",
  keywords: ["timestamp converter", "unix timestamp", "epoch converter", "date to timestamp", "epoch time"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
