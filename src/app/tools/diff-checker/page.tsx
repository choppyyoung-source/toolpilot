"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { webApplicationSchema } from "@/components/JsonLd";

function diffLines(a: string, b: string): { type: "same" | "add" | "remove"; text: string }[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const result: { type: "same" | "add" | "remove"; text: string }[] = [];
  const max = Math.max(linesA.length, linesB.length);
  let ia = 0, ib = 0;
  while (ia < linesA.length || ib < linesB.length) {
    if (ia < linesA.length && ib < linesB.length && linesA[ia] === linesB[ib]) {
      result.push({ type: "same", text: linesA[ia] });
      ia++; ib++;
    } else if (ib < linesB.length && (ia >= linesA.length || linesA.indexOf(linesB[ib], ia) === -1)) {
      result.push({ type: "add", text: linesB[ib] });
      ib++;
    } else {
      result.push({ type: "remove", text: linesA[ia] });
      ia++;
    }
    if (result.length > max * 2) break;
  }
  return result;
}

export default function DiffCheckerPage() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [diff, setDiff] = useState<ReturnType<typeof diffLines>>([]);
  const [compared, setCompared] = useState(false);

  function compare() { setDiff(diffLines(left, right)); setCompared(true); }

  const adds = diff.filter((d) => d.type === "add").length;
  const removes = diff.filter((d) => d.type === "remove").length;
  const same = diff.filter((d) => d.type === "same").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "Diff Checker", description: "Free online diff checker. Compare two texts and see the differences highlighted line by line.", url: "https://toolpilot.pages.dev/tools/diff-checker", category: "DeveloperApplication", keywords: ["diff checker", "text compare", "diff tool", "compare text online"] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developer Tools", href: "/#developer" }, { label: "Diff Checker", href: "/tools/diff-checker" }]} />

      <h1 className="mb-2 text-3xl font-bold">Diff Checker</h1>
      <p className="mb-6 text-gray-600">Compare two texts and see the differences highlighted line by line. Perfect for comparing code, documents, and configurations.</p>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Original</label>
          <textarea className="w-full rounded-lg border border-gray-300 p-3 font-mono text-sm" rows={12} placeholder="Paste original text..." value={left} onChange={(e) => setLeft(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Modified</label>
          <textarea className="w-full rounded-lg border border-gray-300 p-3 font-mono text-sm" rows={12} placeholder="Paste modified text..." value={right} onChange={(e) => setRight(e.target.value)} />
        </div>
      </div>
      <button onClick={compare} className="mb-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">Compare</button>

      {compared && (
        <>
          <div className="mb-4 flex gap-4 text-sm">
            <span className="text-green-600">+{adds} added</span>
            <span className="text-red-600">-{removes} removed</span>
            <span className="text-gray-500">{same} unchanged</span>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white">
            {diff.map((d, i) => (
              <div key={i} className={`border-b border-gray-100 px-4 py-1 font-mono text-sm ${d.type === "add" ? "bg-green-50 text-green-800" : d.type === "remove" ? "bg-red-50 text-red-800" : "text-gray-700"}`}>
                <span className="mr-3 inline-block w-4 text-center text-xs">{d.type === "add" ? "+" : d.type === "remove" ? "-" : " "}</span>
                {d.text || " "}
              </div>
            ))}
            {diff.length === 0 && <div className="p-8 text-center text-sm text-gray-400">No differences found — texts are identical.</div>}
          </div>
        </>
      )}

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is a Diff Checker?</h2>
        <p>A diff checker compares two pieces of text and highlights the differences between them. Added lines are shown in green, removed lines in red, and unchanged lines in white. It is commonly used to compare code revisions, document versions, and configuration files.</p>
      </section>

      <FAQ items={[
        { question: "How does the diff algorithm work?", answer: "This tool compares texts line by line, identifying lines that were added, removed, or remain unchanged. Lines present only in the modified text are marked as additions, and lines only in the original are marked as removals." },
        { question: "Can I compare code files?", answer: "Yes. Simply paste the contents of two code files and click Compare. The tool preserves whitespace and formatting for accurate comparison." },
        { question: "Is there a file size limit?", answer: "Since everything runs in your browser, the limit depends on your device's memory. It works well for texts up to tens of thousands of lines." },
      ]} />
    </div>
  );
}
