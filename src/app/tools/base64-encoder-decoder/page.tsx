"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

const faqs = [
  {
    question: "What is Base64 encoding?",
    answer:
      "Base64 is a binary-to-text encoding scheme that represents binary data as an ASCII string. It uses 64 printable characters (A-Z, a-z, 0-9, +, /) to represent data, making it safe for transmission over text-based protocols like HTTP and email.",
  },
  {
    question: "When should I use Base64 encoding?",
    answer:
      "Base64 is commonly used for embedding images in HTML/CSS via data URIs, encoding file attachments in emails, transmitting binary data in JSON/XML APIs, storing binary data in text-based databases, and encoding authentication credentials in HTTP headers.",
  },
  {
    question: "Does Base64 encoding encrypt my data?",
    answer:
      "No. Base64 is an encoding scheme, not encryption. It is easily reversible and provides no security. Anyone can decode Base64 data. If you need to protect sensitive data, use proper encryption instead.",
  },
  {
    question: "Does this tool support Unicode characters?",
    answer:
      "Yes. This tool fully supports Unicode text including emojis, Chinese, Japanese, Korean, and other non-ASCII characters. It uses UTF-8 encoding before Base64 conversion.",
  },
  {
    question: "What is the size overhead of Base64?",
    answer:
      "Base64 encoding increases the data size by approximately 33%. For example, a 3-byte input becomes 4 characters in Base64 output. This is the trade-off for being able to safely transmit binary data as text.",
  },
];

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
    } catch {
      setError(
        mode === "encode"
          ? "Failed to encode. Please check your input."
          : "Invalid Base64 string. Please check your input."
      );
      setOutput("");
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
  }

  function swap() {
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setInput(output);
    setOutput("");
    setError("");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "Base64 Encoder & Decoder",
          description:
            "Free online Base64 encoder and decoder. Convert text to and from Base64 with full Unicode support.",
          url: "https://toolpilot.pages.dev/tools/base64-encoder-decoder",
          category: "DeveloperApplication",
          keywords: [
            "base64 encoder",
            "base64 decoder",
            "base64 converter",
            "encode base64",
          ],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: "How to Encode or Decode Base64 Online",
          description:
            "Use ToolPilot's free Base64 tool to encode text to Base64 or decode Base64 back to text.",
          steps: [
            {
              name: "Choose encode or decode",
              text: "Select whether you want to encode text to Base64 or decode Base64 back to text.",
            },
            {
              name: "Enter your input",
              text: "Type or paste the text (for encoding) or Base64 string (for decoding) into the input field.",
            },
            {
              name: "Convert and copy",
              text: "Click the Encode/Decode button to convert. Use the Copy button to copy the result, or Swap to reverse the operation.",
            },
          ],
        })}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/#developer" },
          { label: "Base64 Encoder & Decoder", href: "/tools/base64-encoder-decoder" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">Base64 Encoder & Decoder</h1>
      <p className="mb-6 text-gray-600">
        Encode text to Base64 or decode Base64 back to plain text. Supports full
        Unicode including emojis and non-Latin characters.
      </p>

      <AdBanner slot="tool-top" format="horizontal" />

      <div className="mb-4 flex gap-2 rounded-lg bg-white p-2">
        <button
          onClick={() => {
            setMode("encode");
            setError("");
          }}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "encode"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => {
            setMode("decode");
            setError("");
          }}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "decode"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Decode
        </button>
      </div>

      <textarea
        className="mb-4 w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none"
        rows={6}
        placeholder={
          mode === "encode"
            ? "Enter text to encode..."
            : "Enter Base64 string to decode..."
        }
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="mb-4 flex gap-2">
        <button
          onClick={handleConvert}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
        <button
          onClick={swap}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          Swap
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {output && (
        <div className="relative">
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm"
            rows={6}
            readOnly
            value={output}
          />
          <button
            onClick={copy}
            className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      )}

      <AdBanner slot="tool-mid" format="rectangle" />

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          What Is Base64 Encoding?
        </h2>
        <p className="mb-3">
          Base64 is a group of binary-to-text encoding schemes that represent
          binary data as a sequence of printable ASCII characters. It is
          designed to carry data stored in binary formats across channels that
          only reliably support text content.
        </p>
        <h3 className="mb-1 font-semibold text-gray-900">Common Use Cases</h3>
        <ul className="list-inside list-disc space-y-1">
          <li>Embedding images in HTML/CSS via data URIs</li>
          <li>Encoding email attachments (MIME)</li>
          <li>Transmitting binary data in JSON/XML APIs</li>
          <li>HTTP Basic Authentication headers</li>
          <li>Storing binary blobs in text databases</li>
        </ul>
      </section>

      <FAQ items={faqs} />

      <AdBanner slot="tool-bottom" format="horizontal" />
      <RelatedTools currentSlug="base64-encoder-decoder" />
    </div>
  );
}
