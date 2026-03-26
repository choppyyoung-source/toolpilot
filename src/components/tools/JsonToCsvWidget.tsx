"use client";

import { useState } from "react";

interface Labels {
  input?: string;
  output?: string;
  convert?: string;
  copy?: string;
  download?: string;
  placeholder?: string;
}

const defaults: Labels = {
  input: "JSON Input",
  output: "CSV Output",
  convert: "Convert",
  copy: "Copy",
  download: "Download CSV",
  placeholder: '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]',
};

function jsonToCsv(json: unknown[]): string {
  if (!Array.isArray(json) || json.length === 0) return "";
  const headers = [...new Set(json.flatMap((row) => Object.keys(row as Record<string, unknown>)))];
  const escape = (v: unknown): string => {
    const s = String(v ?? "");
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };
  const rows = json.map((row) =>
    headers.map((h) => escape((row as Record<string, unknown>)[h])).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export default function JsonToCsvWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function convert() {
    setError("");
    try {
      let data = JSON.parse(input);
      if (!Array.isArray(data)) data = [data];
      setOutput(jsonToCsv(data));
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function download() {
    const blob = new Blob([output], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.csv";
    a.click();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">{labels.input}</label>
          <button
            onClick={convert}
            className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            {labels.convert}
          </button>
        </div>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 font-mono text-sm"
          rows={16}
          placeholder={labels.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">{labels.output}</label>
          {output && (
            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
              >
                {labels.copy}
              </button>
              <button
                onClick={download}
                className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
              >
                {labels.download}
              </button>
            </div>
          )}
        </div>
        {error ? (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        ) : (
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm"
            rows={16}
            readOnly
            value={output}
          />
        )}
      </div>
    </div>
  );
}
