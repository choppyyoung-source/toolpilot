"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

const faqs = [
  { question: "What is URL encoding?", answer: "URL encoding (percent-encoding) replaces unsafe characters in a URL with a '%' followed by two hexadecimal digits. For example, a space becomes '%20'. This ensures URLs are transmitted correctly over the internet." },
  { question: "When should I URL encode?", answer: "You should URL encode when passing special characters in query parameters, form data, or path segments. Characters like spaces, &, =, ?, #, and non-ASCII characters must be encoded to avoid breaking the URL structure." },
  { question: "What is the difference between encodeURI and encodeURIComponent?", answer: "encodeURI encodes a full URI but preserves characters like :, /, ?, and #. encodeURIComponent encodes everything including those characters, making it suitable for encoding individual query parameter values." },
  { question: "Is URL encoding the same as Base64 encoding?", answer: "No. URL encoding (percent-encoding) makes strings safe for URLs by replacing special characters with %XX sequences. Base64 encoding converts binary data to ASCII text. They serve different purposes." },
];

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  function convert() {
    setError("");
    try {
      setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch {
      setError("Invalid input. Please check and try again.");
      setOutput("");
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "URL Encoder & Decoder", description: "Free online URL encoder and decoder. Encode or decode URLs and query parameters instantly.", url: "https://toolpilot.pages.dev/tools/url-encoder-decoder", category: "DeveloperApplication", keywords: ["url encoder", "url decoder", "percent encoding", "urlencode online"] })} />
      <JsonLd data={howToSchema({ name: "How to Encode or Decode a URL", description: "Use ToolPilot to encode or decode URLs and query parameters.", steps: [{ name: "Choose mode", text: "Select Encode or Decode." }, { name: "Enter input", text: "Paste the URL or text to convert." }, { name: "Convert", text: "Click the button and copy the result." }] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developer Tools", href: "/#developer" }, { label: "URL Encoder/Decoder", href: "/tools/url-encoder-decoder" }]} />

      <h1 className="mb-2 text-3xl font-bold">URL Encoder & Decoder</h1>
      <p className="mb-6 text-gray-600">Encode or decode URLs and query parameters instantly. Supports full Unicode characters.</p>

      <AdBanner slot="tool-top" format="horizontal" />

      <div className="mb-4 flex gap-2 rounded-lg bg-white p-2">
        <button onClick={() => { setMode("encode"); setError(""); }} className={`flex-1 rounded-lg py-2 text-sm font-medium ${mode === "encode" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Encode</button>
        <button onClick={() => { setMode("decode"); setError(""); }} className={`flex-1 rounded-lg py-2 text-sm font-medium ${mode === "decode" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Decode</button>
      </div>
      <textarea className="mb-4 w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none" rows={5} placeholder={mode === "encode" ? "Enter text to URL encode..." : "Enter encoded URL to decode..."} value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={convert} className="mb-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">{mode === "encode" ? "Encode" : "Decode"}</button>
      {error && <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">{error}</div>}
      {output && (
        <div className="relative">
          <textarea className="w-full rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm" rows={5} readOnly value={output} />
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">Copy</button>
        </div>
      )}

      <AdBanner slot="tool-mid" format="rectangle" />

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is URL Encoding?</h2>
        <p>URL encoding, also known as percent-encoding, is a mechanism for encoding special characters in URLs. Characters that are not allowed in URLs (spaces, &, =, etc.) are replaced with a percent sign followed by their hexadecimal ASCII value. For example, a space becomes %20 and an ampersand becomes %26.</p>
      </section>

      <FAQ items={faqs} />
      <AdBanner slot="tool-bottom" format="horizontal" />
      <RelatedTools currentSlug="url-encoder-decoder" />
    </div>
  );
}
