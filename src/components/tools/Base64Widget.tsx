"use client";

import { useState } from "react";

interface Labels {
  encode?: string;
  decode?: string;
  swap?: string;
  copy?: string;
  encodePlaceholder?: string;
  decodePlaceholder?: string;
}

const defaults: Labels = {
  encode: "Encode",
  decode: "Decode",
  swap: "Swap",
  copy: "Copy",
  encodePlaceholder: "Enter text to encode...",
  decodePlaceholder: "Enter Base64 string to decode...",
};

export default function Base64Widget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
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
    <div>
      <div className="mb-4 flex gap-2 rounded-lg bg-white p-2">
        <button
          onClick={() => { setMode("encode"); setError(""); }}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "encode"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {labels.encode}
        </button>
        <button
          onClick={() => { setMode("decode"); setError(""); }}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "decode"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {labels.decode}
        </button>
      </div>

      <textarea
        className="mb-4 w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none"
        rows={6}
        placeholder={mode === "encode" ? labels.encodePlaceholder : labels.decodePlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="mb-4 flex gap-2">
        <button
          onClick={handleConvert}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {mode === "encode" ? labels.encode : labels.decode}
        </button>
        <button
          onClick={swap}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          {labels.swap}
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
            {labels.copy}
          </button>
        </div>
      )}
    </div>
  );
}
