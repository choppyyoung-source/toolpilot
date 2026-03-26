"use client";

import { useState } from "react";

interface Labels {
  placeholder?: string;
  copy?: string;
}

const defaults: Labels = {
  placeholder: "Type or paste your text here...",
  copy: "Copy",
};

const converters = [
  { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { label: "lowercase", fn: (s: string) => s.toLowerCase() },
  {
    label: "Title Case",
    fn: (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
  },
  {
    label: "Sentence case",
    fn: (s: string) =>
      s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
  },
  {
    label: "camelCase",
    fn: (s: string) =>
      s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  },
  {
    label: "snake_case",
    fn: (s: string) =>
      s
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[A-Z]/g, (c) => "_" + c.toLowerCase())
        .replace(/^_/, "")
        .replace(/_+/g, "_")
        .toLowerCase(),
  },
  {
    label: "kebab-case",
    fn: (s: string) =>
      s
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())
        .replace(/^-/, "")
        .replace(/-+/g, "-")
        .toLowerCase(),
  },
];

export default function CaseConverterWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [active, setActive] = useState("");

  function convert(label: string, fn: (s: string) => string) {
    setActive(label);
    setOutput(fn(input));
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div>
      <textarea
        className="mb-4 w-full rounded-lg border border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
        rows={6}
        placeholder={labels.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {converters.map((c) => (
          <button
            key={c.label}
            onClick={() => convert(c.label, c.fn)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              active === c.label
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {output && (
        <div className="relative">
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-white p-4 text-base"
            rows={6}
            readOnly
            value={output}
          />
          <button
            onClick={copyOutput}
            className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            {labels.copy}
          </button>
        </div>
      )}
    </div>
  );
}
