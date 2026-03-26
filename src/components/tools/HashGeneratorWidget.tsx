"use client";

import { useState } from "react";

interface Labels {
  placeholder?: string;
  generate?: string;
  copy?: string;
}

const defaults: Labels = {
  placeholder: "Enter text to hash...",
  generate: "Generate Hashes",
  copy: "Copy",
};

async function hashText(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const algos = [
  { id: "SHA-1", label: "SHA-1" },
  { id: "SHA-256", label: "SHA-256" },
  { id: "SHA-384", label: "SHA-384" },
  { id: "SHA-512", label: "SHA-512" },
];

export default function HashGeneratorWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});

  async function generate() {
    const r: Record<string, string> = {};
    for (const a of algos) {
      r[a.id] = await hashText(a.id, input);
    }
    setResults(r);
  }

  return (
    <div>
      <textarea
        className="mb-4 w-full rounded-lg border border-gray-300 p-4 font-mono text-sm"
        rows={5}
        placeholder={labels.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={generate}
        className="mb-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        {labels.generate}
      </button>

      {Object.keys(results).length > 0 && (
        <div className="space-y-3">
          {algos.map((a) => (
            <div key={a.id} className="rounded-lg bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{a.label}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(results[a.id])}
                  className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                >
                  {labels.copy}
                </button>
              </div>
              <div className="break-all font-mono text-xs text-gray-600">{results[a.id]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
