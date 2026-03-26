"use client";

import { useState, useRef } from "react";

interface Labels {
  quality?: string;
  original?: string;
  compressed?: string;
  saved?: string;
  download?: string;
  compressing?: string;
}

const defaults: Labels = {
  quality: "Quality",
  original: "Original",
  compressed: "Compressed",
  saved: "Saved",
  download: "Download Compressed Image",
  compressing: "Compressing...",
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function ImageCompressorWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(null);
  const [compressed, setCompressed] = useState<{ url: string; size: number } | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginal({ url: URL.createObjectURL(file), size: file.size, name: file.name });
    setCompressed(null);
    compress(file, quality);
  }

  function compress(file: File, q: number) {
    setLoading(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressed({ url: URL.createObjectURL(blob), size: blob.size });
          }
          setLoading(false);
        },
        "image/jpeg",
        q
      );
    };
    img.src = URL.createObjectURL(file);
  }

  function handleQuality(q: number) {
    setQuality(q);
    if (inputRef.current?.files?.[0]) compress(inputRef.current.files[0], q);
  }

  const saved =
    original && compressed ? Math.round((1 - compressed.size / original.size) * 100) : 0;

  return (
    <div>
      <div className="mb-6 rounded-lg bg-white p-6">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="mb-4 w-full text-sm"
        />
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {labels.quality}: {Math.round(quality * 100)}%
          </label>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={quality}
            onChange={(e) => handleQuality(+e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Smaller file</span>
            <span>Higher quality</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="mb-4 text-center text-sm text-gray-500">{labels.compressing}</div>
      )}

      {original && compressed && (
        <>
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="text-xs text-gray-500">{labels.original}</div>
              <div className="text-lg font-bold">{formatSize(original.size)}</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="text-xs text-gray-500">{labels.compressed}</div>
              <div className="text-lg font-bold text-green-600">{formatSize(compressed.size)}</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="text-xs text-gray-500">{labels.saved}</div>
              <div className="text-lg font-bold text-blue-600">{saved}%</div>
            </div>
          </div>
          <div className="mb-6 grid gap-4 lg:grid-cols-2">
            <div>
              <div className="mb-1 text-xs text-gray-500">{labels.original}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={original.url} alt="Original" className="w-full rounded-lg border" />
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-500">{labels.compressed}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={compressed.url} alt="Compressed" className="w-full rounded-lg border" />
            </div>
          </div>
          <a
            href={compressed.url}
            download={`compressed-${original.name}`}
            className="block w-full rounded-lg bg-blue-600 py-3 text-center text-sm font-medium text-white hover:bg-blue-700"
          >
            {labels.download}
          </a>
        </>
      )}
    </div>
  );
}
