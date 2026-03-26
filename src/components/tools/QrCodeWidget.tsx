"use client";

import { useState, useRef } from "react";
import QRCode from "qrcode";

interface Labels {
  placeholder?: string;
  generate?: string;
  download?: string;
  preview?: string;
}

const defaults: Labels = {
  placeholder: "Enter URL or text (e.g., https://example.com)",
  generate: "Generate QR Code",
  download: "Download PNG",
  preview: "QR code will appear here",
};

export default function QrCodeWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function generate() {
    if (!text.trim()) return;
    try {
      const url = await QRCode.toDataURL(text, {
        width: 400,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      });
      setQrUrl(url);
    } catch {
      setQrUrl("");
    }
  }

  function download() {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qrcode.png";
    a.click();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <textarea
          className="mb-4 w-full rounded-lg border border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
          rows={5}
          placeholder={labels.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={generate}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          {labels.generate}
        </button>
      </div>
      <div className="flex flex-col items-center rounded-lg bg-white p-6">
        {qrUrl ? (
          <>
            <img src={qrUrl} alt="Generated QR Code" className="mb-4 h-64 w-64" />
            <button
              onClick={download}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {labels.download}
            </button>
          </>
        ) : (
          <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-400">
            {labels.preview}
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
