"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { webApplicationSchema } from "@/components/JsonLd";

function jsonToCsv(json: unknown[]): string {
  if (!Array.isArray(json) || json.length === 0) return "";
  const headers = [...new Set(json.flatMap((row) => Object.keys(row as Record<string, unknown>)))];
  const escape = (v: unknown): string => {
    const s = String(v ?? "");
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = json.map((row) => headers.map((h) => escape((row as Record<string, unknown>)[h])).join(","));
  return [headers.join(","), ...rows].join("\n");
}

export default function JsonToCsvPage() {
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
    <div className="mx-auto max-w-5xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "JSON to CSV Converter", description: "Free online JSON to CSV converter. Convert JSON arrays to CSV format instantly. Download as CSV file.", url: "https://toolpilot.pages.dev/tools/json-to-csv", category: "DeveloperApplication", keywords: ["json to csv", "convert json to csv", "json csv converter", "json to csv online"] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Converters", href: "/#converter" }, { label: "JSON to CSV", href: "/tools/json-to-csv" }]} />

      <h1 className="mb-2 text-3xl font-bold">JSON to CSV Converter</h1>
      <p className="mb-6 text-gray-600">Convert JSON arrays to CSV format instantly. Download the result as a CSV file.</p>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between"><label className="text-sm font-medium text-gray-700">JSON Input</label><button onClick={convert} className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">Convert</button></div>
          <textarea className="w-full rounded-lg border border-gray-300 p-3 font-mono text-sm" rows={16} placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]' value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between"><label className="text-sm font-medium text-gray-700">CSV Output</label>{output && <div className="flex gap-2"><button onClick={() => navigator.clipboard.writeText(output)} className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">Copy</button><button onClick={download} className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700">Download CSV</button></div>}</div>
          {error ? <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">{error}</div> : <textarea className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm" rows={16} readOnly value={output} />}
        </div>
      </div>

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is JSON to CSV Conversion?</h2>
        <p>JSON (JavaScript Object Notation) is a common data format for APIs and web applications. CSV (Comma-Separated Values) is a tabular format used in spreadsheets and databases. This tool converts JSON arrays of objects into CSV rows, with object keys as column headers.</p>
      </section>

      <FAQ items={[
        { question: "What JSON format is supported?", answer: "The tool expects a JSON array of objects, e.g., [{\"name\": \"John\", \"age\": 30}]. If you provide a single object, it will be wrapped in an array automatically." },
        { question: "How are nested objects handled?", answer: "Nested objects and arrays are converted to their JSON string representation in the CSV cell. For best results, flatten your JSON before converting." },
        { question: "Can I open the CSV in Excel?", answer: "Yes. Click Download CSV to save the file, then open it directly in Excel, Google Sheets, or any spreadsheet application." },
      ]} />
    </div>
  );
}
