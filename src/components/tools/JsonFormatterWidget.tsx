"use client";

import { useState } from "react";

interface Labels {
  input?: string;
  output?: string;
  format?: string;
  minify?: string;
  copy?: string;
  placeholder?: string;
}

const defaults: Labels = {
  input: "Input",
  output: "Output",
  format: "Format",
  minify: "Minify",
  copy: "Copy",
  placeholder: "Paste your JSON here...",
};

export default function JsonFormatterWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  function format() {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function minify() {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">{labels.input}</label>
          <div className="flex gap-2">
            <select
              value={indent}
              onChange={(e) => setIndent(+e.target.value)}
              className="rounded border border-gray-300 px-2 py-1 text-xs"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
            <button
              onClick={format}
              className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
            >
              {labels.format}
            </button>
            <button
              onClick={minify}
              className="rounded bg-gray-600 px-3 py-1 text-xs text-white hover:bg-gray-700"
            >
              {labels.minify}
            </button>
          </div>
        </div>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none"
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
            <button
              onClick={copy}
              className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
            >
              {labels.copy}
            </button>
          )}
        </div>
        {error ? (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
            <strong>Error:</strong> {error}
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
