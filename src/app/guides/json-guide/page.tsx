import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "JSON Guide — What Is JSON & How to Use It",
  description: "Complete beginner guide to JSON. Learn JSON syntax, data types, common use cases, and how to format, validate, and convert JSON data.",
  keywords: ["json guide", "what is json", "json tutorial", "json syntax", "json for beginners", "learn json"],
};

export default function JsonGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "JSON Guide — What Is JSON & How to Use It",
        description: "Complete beginner guide to JSON syntax, data types, and usage.",
        author: { "@type": "Organization", name: "ToolPilot" },
        publisher: { "@type": "Organization", name: "ToolPilot", url: "https://toolpilot.pages.dev" },
        datePublished: "2026-03-27",
        mainEntityOfPage: "https://toolpilot.pages.dev/guides/json-guide",
      }} />

      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> / <Link href="/guides/json-guide" className="text-gray-900 font-medium">JSON Guide</Link>
      </nav>

      <h1 className="mb-4 text-3xl font-bold">JSON Guide — What Is JSON & How to Use It</h1>
      <p className="mb-8 text-gray-600">A complete beginner-friendly guide to JSON (JavaScript Object Notation), the most popular data format on the web.</p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">What Is JSON?</h2>
          <p className="mb-3">JSON (JavaScript Object Notation) is a lightweight data interchange format. It is easy for humans to read and write, and easy for machines to parse and generate. Despite its name, JSON is language-independent and used in virtually every programming language.</p>
          <p>JSON was created by Douglas Crockford in the early 2000s and has become the de facto standard for data exchange on the web, largely replacing XML.</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">JSON Syntax</h2>
          <p className="mb-3">JSON has two primary structures:</p>
          <ul className="mb-3 list-inside list-disc space-y-1">
            <li><strong>Objects</strong> — Unordered collections of key-value pairs, wrapped in curly braces {"{}"}</li>
            <li><strong>Arrays</strong> — Ordered lists of values, wrapped in square brackets {"[]"}</li>
          </ul>
          <div className="rounded-lg bg-gray-900 p-4 text-sm text-green-400 font-mono">
            {`{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "address": {
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "coding"]
}`}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">JSON Data Types</h2>
          <div className="rounded-lg bg-white p-4">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left"><th className="pb-2 pr-4">Type</th><th className="pb-2 pr-4">Example</th><th className="pb-2">Description</th></tr></thead>
              <tbody className="space-y-1">
                <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-mono">String</td><td className="py-2 pr-4 font-mono">&quot;hello&quot;</td><td className="py-2">Text in double quotes</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-mono">Number</td><td className="py-2 pr-4 font-mono">42, 3.14</td><td className="py-2">Integer or floating point</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-mono">Boolean</td><td className="py-2 pr-4 font-mono">true, false</td><td className="py-2">Logical values</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-mono">null</td><td className="py-2 pr-4 font-mono">null</td><td className="py-2">Empty/missing value</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 pr-4 font-mono">Object</td><td className="py-2 pr-4 font-mono">{"{...}"}</td><td className="py-2">Key-value pairs</td></tr>
                <tr><td className="py-2 pr-4 font-mono">Array</td><td className="py-2 pr-4 font-mono">{"[...]"}</td><td className="py-2">Ordered list of values</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Common Use Cases</h2>
          <ul className="list-inside list-disc space-y-2">
            <li><strong>REST APIs</strong> — Most web APIs send and receive data as JSON</li>
            <li><strong>Configuration Files</strong> — package.json, tsconfig.json, etc.</li>
            <li><strong>Data Storage</strong> — NoSQL databases like MongoDB store documents as JSON</li>
            <li><strong>Web Applications</strong> — Frontend-backend communication</li>
            <li><strong>Data Exchange</strong> — Sharing structured data between systems</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Common Mistakes</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Using single quotes instead of double quotes for strings</li>
            <li>Adding trailing commas after the last item</li>
            <li>Including comments (JSON does not support comments)</li>
            <li>Using undefined as a value (use null instead)</li>
            <li>Forgetting to quote property names</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">JSON vs XML</h2>
          <p>JSON has largely replaced XML for web data exchange because it is more compact, easier to read, and faster to parse. XML is still used in legacy systems, SOAP APIs, and document-oriented data like SVG and HTML.</p>
        </section>
      </div>

      <div className="mt-10 rounded-lg bg-blue-50 p-6 text-center">
        <p className="mb-3 text-lg font-semibold text-gray-900">Work with JSON</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/tools/json-formatter" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">JSON Formatter</Link>
          <Link href="/tools/json-to-csv" className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50">JSON to CSV</Link>
        </div>
      </div>
    </div>
  );
}
