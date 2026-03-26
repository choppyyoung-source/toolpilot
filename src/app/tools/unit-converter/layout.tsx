import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter — Length, Weight, Temperature & More",
  description:
    "Free online unit converter. Convert between units of length, weight, temperature, area, and volume. Supports metric and imperial systems.",
  keywords: [
    "unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "metric to imperial",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
