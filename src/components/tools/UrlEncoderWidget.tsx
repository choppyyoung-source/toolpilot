"use client";

import { useState } from "react";

interface UrlEncoderLabels {
  encode: string;
  decode: string;
  copy: string;
  encodePlaceholder: string;
  decodePlaceholder: string;
}

const defaultLabels: UrlEncoderLabels = {
  encode: "Encode",
  decode: "Decode",
  copy: "Copy",
  encodePlaceholder: "Enter text to URL encode...",
  decodePlaceholder: "Enter encoded URL to decode...",
};

interface UrlEncoderWidgetProps {
  labels?: Partial<UrlEncoderLabels>;
}

export default function UrlEncoderWidget({ labels: labelsProp }: UrlEncoderWidgetProps = {}) {
  const labels = { ...defaultLabels, ...labelsProp };

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
    <div>
      {/* Mode Tabs */}
      <div className="mb-4 flex gap-2 rounded-lg bg-white p-2">
        <button
          onClick={() => { setMode("encode"); setError(""); }}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            mode === "encode" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {labels.encode}
        </button>
        <button
          onClick={() => { setMode("decode"); setError(""); }}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            mode === "decode" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {labels.decode}
        </button>
      </div>

      <textarea
        className="mb-4 w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none"
        rows={5}
        placeholder={mode === "encode" ? labels.encodePlaceholder : labels.decodePlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={convert}
        className="mb-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        {mode === "encode" ? labels.encode : labels.decode}
      </button>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {output && (
        <div className="relative">
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm"
            rows={5}
            readOnly
            value={output}
          />
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            {labels.copy}
          </button>
        </div>
      )}
    </div>
  );
}
