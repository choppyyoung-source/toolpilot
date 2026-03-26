"use client";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export default function AdBanner({
  slot,
  format = "auto",
  className = "",
}: AdBannerProps) {
  // In production, replace data-ad-client with your actual AdSense publisher ID
  // and data-ad-slot with the actual ad unit slot ID
  return (
    <div className={`ad-container my-4 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5473625991326486"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {/* Placeholder shown during development */}
      <div className="flex h-[90px] items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400">
        Ad Space — {format}
      </div>
    </div>
  );
}
