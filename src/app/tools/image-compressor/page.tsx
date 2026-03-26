"use client";

import { useState, useRef } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function ImageCompressorPage() {
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

  const saved = original && compressed ? Math.round((1 - compressed.size / original.size) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "Image Compressor", description: "Free online image compressor. Reduce image file size while maintaining quality. Supports JPEG and PNG.", url: "https://toolpilot.pages.dev/tools/image-compressor", category: "DesignApplication", keywords: ["image compressor", "compress image", "reduce image size", "image optimizer"] })} />
      <JsonLd data={howToSchema({ name: "How to compress an image online", description: "Reduce image file size in your browser — no upload required — with adjustable quality control.", steps: [{ name: "Step 1", text: "Upload an image" }, { name: "Step 2", text: "Adjust quality slider" }, { name: "Step 3", text: "Download compressed image" }] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Converters", href: "/#converter" }, { label: "Image Compressor", href: "/tools/image-compressor" }]} />

      <h1 className="mb-2 text-3xl font-bold">Image Compressor</h1>
      <p className="mb-6 text-gray-600">Compress images to reduce file size while maintaining quality. All processing happens in your browser — images are never uploaded to any server.</p>

      <div className="mb-6 rounded-lg bg-white p-6">
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" id="image-upload" />
        <label
          htmlFor="image-upload"
          className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 transition-colors hover:border-blue-400 hover:bg-blue-50"
        >
          <svg className="mb-2 h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10V8a5 5 0 0110 0v2" /></svg>
          <span className="text-sm font-medium text-gray-700">{original ? original.name : "Click to upload an image"}</span>
          <span className="mt-1 text-xs text-gray-400">JPEG, PNG, WebP, GIF — any size</span>
        </label>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">Quality: {Math.round(quality * 100)}%</label>
          <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => handleQuality(+e.target.value)} className="w-full" />
          <div className="flex justify-between text-xs text-gray-400"><span>Smaller file</span><span>Higher quality</span></div>
        </div>
      </div>

      {loading && <div className="mb-4 text-center text-sm text-gray-500">Compressing...</div>}

      {original && compressed && (
        <>
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="text-xs text-gray-500">Original</div>
              <div className="text-lg font-bold">{formatSize(original.size)}</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="text-xs text-gray-500">Compressed</div>
              <div className="text-lg font-bold text-green-600">{formatSize(compressed.size)}</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="text-xs text-gray-500">Saved</div>
              <div className="text-lg font-bold text-blue-600">{saved}%</div>
            </div>
          </div>
          <div className="mb-6 grid gap-4 lg:grid-cols-2">
            <div><div className="mb-1 text-xs text-gray-500">Original</div><img src={original.url} alt="Original" className="w-full rounded-lg border" /></div>
            <div><div className="mb-1 text-xs text-gray-500">Compressed</div><img src={compressed.url} alt="Compressed" className="w-full rounded-lg border" /></div>
          </div>
          <a href={compressed.url} download={`compressed-${original.name}`} className="block w-full rounded-lg bg-blue-600 py-3 text-center text-sm font-medium text-white hover:bg-blue-700">Download Compressed Image</a>
        </>
      )}

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is Image Compression?</h2>
        <p>Image compression reduces file size by removing unnecessary data. Lossy compression (like JPEG) sacrifices some quality for smaller files, while lossless compression preserves quality. This tool uses adjustable lossy compression for the best balance between size and quality.</p>
      </section>

      <FAQ items={[
        { question: "How does image compression work?", answer: "This tool uses your browser's built-in Canvas API to re-encode images as JPEG with adjustable quality. Lower quality means smaller files but may introduce visible artifacts." },
        { question: "Are my images uploaded to a server?", answer: "No. All compression happens entirely in your browser using JavaScript. Your images never leave your device." },
        { question: "What image formats are supported?", answer: "You can upload any image format your browser supports (JPEG, PNG, WebP, GIF, BMP). The output is always JPEG for optimal compression." },
        { question: "How much can I reduce the file size?", answer: "Typically 50-80% reduction at 70% quality with minimal visible difference. Results vary depending on the image content and original format." },
      ]} />
      <RelatedTools currentSlug="image-compressor" />
    </div>
  );
}
