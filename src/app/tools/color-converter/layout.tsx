import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Converter — HEX to RGB, HSL & More",
  description:
    "Free online color converter. Convert colors between HEX, RGB, and HSL formats with a live color picker and preview.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hex to hsl",
    "color picker online",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
