"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { webApplicationSchema } from "@/components/JsonLd";

function encodeEntities(str: string): string {
  return str.replace(/[&<>"'/]/g, (c) => {
    const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" };
    return map[c] || c;
  });
}

function decodeEntities(str: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
}

const faqs = [
  { question: "What are HTML entities?", answer: "HTML entities are special codes used to display reserved characters in HTML. For example, < is represented as &lt; and & is represented as &amp;. Without encoding, these characters would be interpreted as HTML tags or syntax." },
  { question: "Why should I encode HTML entities?", answer: "Encoding HTML entities prevents XSS (Cross-Site Scripting) attacks and ensures that special characters display correctly in web pages. It is essential when displaying user-generated content in HTML." },
  { question: "What characters need to be encoded?", answer: "The most important characters to encode are: & (ampersand), < (less than), > (greater than), \" (double quote), and ' (single quote). These characters have special meaning in HTML and can break page rendering or create security vulnerabilities." },
  { question: "Is this tool safe for preventing XSS?", answer: "This tool encodes the standard HTML special characters (&, <, >, \", ', /) which covers the most common XSS vectors. However, for production applications, always use a well-tested server-side sanitization library." },
];

export default function HtmlEntityPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  function convert() {
    setOutput(mode === "encode" ? encodeEntities(input) : decodeEntities(input));
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "HTML Entity Encoder & Decoder", description: "Free online HTML entity encoder and decoder. Encode special characters for safe HTML display or decode entities back to text.", url: "https://toolpilot.pages.dev/tools/html-entity-encoder", category: "DeveloperApplication", keywords: ["html entity encoder", "html entity decoder", "html encode", "html special characters"] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developer Tools", href: "/#developer" }, { label: "HTML Entity Encoder", href: "/tools/html-entity-encoder" }]} />

      <h1 className="mb-2 text-3xl font-bold">HTML Entity Encoder & Decoder</h1>
      <p className="mb-6 text-gray-600">Encode special characters for safe HTML display, or decode HTML entities back to plain text.</p>

      <AdBanner slot="tool-top" format="horizontal" />

      <div className="mb-4 flex gap-2 rounded-lg bg-white p-2">
        <button onClick={() => setMode("encode")} className={`flex-1 rounded-lg py-2 text-sm font-medium ${mode === "encode" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Encode</button>
        <button onClick={() => setMode("decode")} className={`flex-1 rounded-lg py-2 text-sm font-medium ${mode === "decode" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Decode</button>
      </div>
      <textarea className="mb-4 w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none" rows={6} placeholder={mode === "encode" ? 'Enter HTML (e.g., <div class="test">)' : "Enter entities (e.g., &lt;div&gt;)"} value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={convert} className="mb-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">{mode === "encode" ? "Encode" : "Decode"}</button>
      {output && (
        <div className="relative">
          <textarea className="w-full rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm" rows={6} readOnly value={output} />
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">Copy</button>
        </div>
      )}

      <AdBanner slot="tool-mid" format="rectangle" />

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Common HTML Entities</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[["&amp;", "&"], ["&lt;", "<"], ["&gt;", ">"], ["&quot;", '"'], ["&#39;", "'"], ["&nbsp;", "(space)"], ["&copy;", "\u00a9"], ["&reg;", "\u00ae"]].map(([entity, char]) => (
            <div key={entity} className="rounded border border-gray-200 p-2 text-center">
              <div className="font-mono text-xs text-gray-500">{entity}</div>
              <div className="text-lg">{char}</div>
            </div>
          ))}
        </div>
      </section>

      <FAQ items={faqs} />
      <AdBanner slot="tool-bottom" format="horizontal" />
    </div>
  );
}
