"use client";

import { useState, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.\nThe Quick Brown Fox Jumps Over The Lazy Dog.");
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
        highlighted = highlighted.slice(0, index) + `<mark class="bg-yellow-200 px-0.5 rounded">${match}</mark>` + highlighted.slice(index + match.length);
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
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "Regex Tester", description: "Free online regex tester. Test regular expressions with real-time matching, highlighting, and match details.", url: "https://toolpilot.pages.dev/tools/regex-tester", category: "DeveloperApplication", keywords: ["regex tester", "regular expression tester", "regex checker", "regex online"] })} />
      <JsonLd data={howToSchema({ name: "How to test a regular expression online", description: "Test regex patterns against sample text with live match highlighting and detailed results.", steps: [{ name: "Step 1", text: "Enter a regex pattern" }, { name: "Step 2", text: "Paste test text" }, { name: "Step 3", text: "View highlighted matches and details" }] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developer Tools", href: "/#developer" }, { label: "Regex Tester", href: "/tools/regex-tester" }]} />

      <h1 className="mb-2 text-3xl font-bold">Regex Tester</h1>
      <p className="mb-6 text-gray-600">Test regular expressions with real-time matching and highlighting. Supports all JavaScript regex features.</p>

      <div className="mb-4 rounded-lg bg-white p-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">Pattern</label>
        <div className="flex gap-2">
          <span className="flex items-center text-gray-400">/</span>
          <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} className="flex-1 rounded border border-gray-300 px-3 py-2 font-mono text-sm" placeholder="[a-z]+" />
          <span className="flex items-center text-gray-400">/</span>
          <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} className="w-16 rounded border border-gray-300 px-2 py-2 font-mono text-sm" />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {flagOptions.map((f) => (
            <label key={f.flag} className="flex items-center gap-1 text-xs text-gray-600">
              <input type="checkbox" checked={flags.includes(f.flag)} onChange={(e) => setFlags(e.target.checked ? flags + f.flag : flags.replace(f.flag, ""))} />
              {f.label} ({f.flag})
            </label>
          ))}
        </div>
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">Test String</label>
        <textarea className="w-full rounded-lg border border-gray-300 p-4 font-mono text-sm" rows={6} value={text} onChange={(e) => setText(e.target.value)} />
      </div>

      {pattern && !error && (
        <>
          <div className="mb-4 rounded-lg bg-white p-4">
            <div className="mb-2 text-sm font-medium text-gray-700">Highlighted Matches ({results.matches.length})</div>
            <div className="whitespace-pre-wrap rounded border border-gray-200 bg-gray-50 p-3 font-mono text-sm" dangerouslySetInnerHTML={{ __html: results.highlighted }} />
          </div>

          {results.matches.length > 0 && (
            <div className="rounded-lg bg-white p-4">
              <div className="mb-2 text-sm font-medium text-gray-700">Match Details</div>
              <div className="max-h-60 overflow-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left text-xs text-gray-500"><th className="pb-2 pr-4">#</th><th className="pb-2 pr-4">Match</th><th className="pb-2 pr-4">Index</th><th className="pb-2">Length</th></tr></thead>
                  <tbody>
                    {results.matches.map((m, i) => (
                      <tr key={i} className="border-b border-gray-100"><td className="py-1 pr-4 text-gray-400">{i + 1}</td><td className="py-1 pr-4 font-mono text-blue-600">{m.match || "(empty)"}</td><td className="py-1 pr-4">{m.index}</td><td className="py-1">{m.match.length}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is a Regular Expression?</h2>
        <p>A regular expression (regex) is a sequence of characters that defines a search pattern. It is used for string matching, validation, find-and-replace, and data extraction in virtually every programming language.</p>
      </section>

      <FAQ items={[
        { question: "What regex flavor does this use?", answer: "This tool uses JavaScript's built-in RegExp engine, which supports ES2018+ features including named groups, lookbehind assertions, and the dotall (s) flag." },
        { question: "What do the flags mean?", answer: "g (global) finds all matches, i (case insensitive) ignores case, m (multiline) makes ^ and $ match line boundaries, s (dotall) makes . match newlines." },
        { question: "Can I use named capture groups?", answer: "Yes. Use (?<name>pattern) syntax. Named groups will appear in the match details." },
        { question: "Is there a regex cheat sheet?", answer: ". matches any character, \\d matches digits, \\w matches word characters, \\s matches whitespace, * is 0+, + is 1+, ? is 0 or 1, {n} is exactly n, [abc] is character class, ^ is start, $ is end." },
      ]} />
      <RelatedTools currentSlug="regex-tester" />
    </div>
  );
}
