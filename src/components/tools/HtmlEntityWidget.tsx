"use client";

import { useState } from "react";

function encodeEntities(str: string): string {
  return str.replace(/[&<>"'/]/g, (c) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
    };
    return map[c] || c;
  });
}

function decodeEntities(str: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
}

const COMMON_ENTITIES: [string, string][] = [
  ["&amp;", "&"],
  ["&lt;", "<"],
  ["&gt;", ">"],
  ["&quot;", '"'],
  ["&#39;", "'"],
  ["&nbsp;", "(space)"],
  ["&copy;", "\u00a9"],
  ["&reg;", "\u00ae"],
];

interface HtmlEntityLabels {
  encode: string;
  decode: string;
  copy: string;
  encodePlaceholder: string;
  decodePlaceholder: string;
}

const defaultLabels: HtmlEntityLabels = {
  encode: "Encode",
  decode: "Decode",
  copy: "Copy",
  encodePlaceholder: 'Enter HTML (e.g., <div class="test">)',
  decodePlaceholder: "Enter entities (e.g., &lt;div&gt;)",
};

interface HtmlEntityWidgetProps {
  labels?: Partial<HtmlEntityLabels>;
}

export default function HtmlEntityWidget({ labels: labelsProp }: HtmlEntityWidgetProps = {}) {
  const labels = { ...defaultLabels, ...labelsProp };

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  function convert() {
    setOutput(mode === "encode" ? encodeEntities(input) : decodeEntities(input));
  }

  return (
    <div>
      {/* Mode Tabs */}
      <div className="mb-4 flex gap-2 rounded-lg bg-white p-2">
        <button
          onClick={() => setMode("encode")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            mode === "encode" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {labels.encode}
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium ${
            mode === "decode" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
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

      <button
        onClick={convert}
        className="mb-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        {mode === "encode" ? labels.encode : labels.decode}
      </button>

      {output && (
        <div className="relative mb-6">
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm"
            rows={6}
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

      {/* Common Entities Table */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {COMMON_ENTITIES.map(([entity, char]) => (
          <div key={entity} className="rounded border border-gray-200 p-2 text-center">
            <div className="font-mono text-xs text-gray-500">{entity}</div>
            <div className="text-lg">{char}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
