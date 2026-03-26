"use client";

import { useState } from "react";

interface Labels {
  amount?: string;
  type?: string;
  paragraphs?: string;
  sentences?: string;
  words?: string;
  generate?: string;
  copy?: string;
}

const defaults: Labels = {
  amount: "Amount",
  type: "Type",
  paragraphs: "Paragraphs",
  sentences: "Sentences",
  words: "Words",
  generate: "Generate",
  copy: "Copy",
};

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(
    " "
  );

function randomWords(count: number): string {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return result.join(" ");
}

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const s = randomWords(len);
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}

function generateParagraph(): string {
  const sentences = 3 + Math.floor(Math.random() * 5);
  return Array.from({ length: sentences }, generateSentence).join(" ");
}

export default function LoremIpsumWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = useState("");

  function generate() {
    if (type === "paragraphs") {
      setOutput(Array.from({ length: count }, generateParagraph).join("\n\n"));
    } else if (type === "sentences") {
      setOutput(Array.from({ length: count }, generateSentence).join(" "));
    } else {
      setOutput(randomWords(count));
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end gap-4 rounded-lg bg-white p-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {labels.amount}
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, +e.target.value))}
            className="w-24 rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {labels.type}
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="paragraphs">{labels.paragraphs}</option>
            <option value="sentences">{labels.sentences}</option>
            <option value="words">{labels.words}</option>
          </select>
        </div>
        <button
          onClick={generate}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {labels.generate}
        </button>
      </div>

      {output && (
        <div className="relative">
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm"
            rows={12}
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
