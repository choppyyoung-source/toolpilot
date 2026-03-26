"use client";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

// Auto ads are handled by the AdSense script in layout.tsx.
// This component renders nothing — kept as a placeholder for future manual ad units.
export default function AdBanner({}: AdBannerProps) {
  return null;
}
