"use client";

import { useState, useMemo } from "react";

interface RegexTesterLabels {
  pattern: string;
  testString: string;
  matches: string;
  match: string;
  index: string;
  length: string;
}

const defaultLabels: RegexTesterLabels = {
  pattern: "Pattern",
  testString: "Test String",
  matches: "Highlighted Matches",
  match: "Match",
  index: "Index",
  length: "Length",
};

interface RegexTesterWidgetProps {
  labels?: Partial<RegexTesterLabels>;
}

export default function RegexTesterWidget({ labels: labelsProp }: RegexTesterWidgetProps = {}) {
  const labels = { ...defaultLabels, ...labelsProp };

  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog.\nThe Quick Brown Fox Jumps Over The Lazy Dog."
  );
  const [error, setError] = useState("");

  const results = useMemo(() => {
    if (!pattern) return { matches: [], highlighted: text };
    try {
      const re = new RegExp(pattern, flags);
      setError("");
      const matches: { match: string; index: number; groups?: Record<string, string> }[] = [];
      let m;
      if (flags.includes("g")) {
        while ((m = re.exec(text)) !== null) {
          matches.push({ match: m[0], index: m.index, groups: m.groups });
          if (!m[0]) break;
        }
      } else {
        m = re.exec(text);
        if (m) matches.push({ match: m[0], index: m.index, groups: m.groups });
      }

      let highlighted = text;
      for (let i = matches.length - 1; i >= 0; i--) {
        const { match, index } = matches[i];
        highlighted =
          highlighted.slice(0, index) +
          `<mark class="bg-yellow-200 px-0.5 rounded">${match}</mark>` +
          highlighted.slice(index + match.length);
      }
      return { matches, highlighted };
    } catch (e: unknown) {
      setError((e as Error).message);
      return { matches: [], highlighted: text };
    }
  }, [pattern, flags, text]);

  const flagOptions = [
    { flag: "g", label: "Global" },
    { flag: "i", label: "Case Insensitive" },
    { flag: "m", label: "Multiline" },
    { flag: "s", label: "Dotall" },
  ];

  return (
    <div>
      {/* Pattern Input */}
      <div className="mb-4 rounded-lg bg-white p-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">{labels.pattern}</label>
        <div className="flex gap-2">
          <span className="flex items-center text-gray-400">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="flex-1 rounded border border-gray-300 px-3 py-2 font-mono text-sm"
            placeholder="[a-z]+"
          />
          <span className="flex items-center text-gray-400">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-16 rounded border border-gray-300 px-2 py-2 font-mono text-sm"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {flagOptions.map((f) => (
            <label key={f.flag} className="flex items-center gap-1 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={flags.includes(f.flag)}
                onChange={(e) =>
                  setFlags(e.target.checked ? flags + f.flag : flags.replace(f.flag, ""))
                }
              />
              {f.label} ({f.flag})
            </label>
          ))}
        </div>
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      </div>

      {/* Test String */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">{labels.testString}</label>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-4 font-mono text-sm"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* Results */}
      {pattern && !error && (
        <>
          <div className="mb-4 rounded-lg bg-white p-4">
            <div className="mb-2 text-sm font-medium text-gray-700">
              {labels.matches} ({results.matches.length})
            </div>
            <div
              className="whitespace-pre-wrap rounded border border-gray-200 bg-gray-50 p-3 font-mono text-sm"
              dangerouslySetInnerHTML={{ __html: results.highlighted }}
            />
          </div>

          {results.matches.length > 0 && (
            <div className="rounded-lg bg-white p-4">
              <div className="mb-2 text-sm font-medium text-gray-700">
                {labels.match} Details
              </div>
              <div className="max-h-60 overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs text-gray-500">
                      <th className="pb-2 pr-4">#</th>
                      <th className="pb-2 pr-4">{labels.match}</th>
                      <th className="pb-2 pr-4">{labels.index}</th>
                      <th className="pb-2">{labels.length}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.matches.map((m, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-1 pr-4 text-gray-400">{i + 1}</td>
                        <td className="py-1 pr-4 font-mono text-blue-600">{m.match || "(empty)"}</td>
                        <td className="py-1 pr-4">{m.index}</td>
                        <td className="py-1">{m.match.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
