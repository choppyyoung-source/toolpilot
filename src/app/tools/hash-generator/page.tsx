"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

async function hash(algo: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const algos = [
  { id: "SHA-1", label: "SHA-1" },
  { id: "SHA-256", label: "SHA-256" },
  { id: "SHA-384", label: "SHA-384" },
  { id: "SHA-512", label: "SHA-512" },
];

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});

  async function generate() {
    const r: Record<string, string> = {};
    for (const a of algos) {
      r[a.id] = await hash(a.id, input);
    }
    setResults(r);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "Hash Generator", description: "Free online hash generator. Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from any text.", url: "https://toolpilot.pages.dev/tools/hash-generator", category: "DeveloperApplication", keywords: ["hash generator", "sha256 generator", "sha1 hash", "sha512 online"] })} />
      <JsonLd data={howToSchema({ name: "How to generate a hash from text", description: "Generate SHA-1, SHA-256, SHA-384, or SHA-512 hashes from any text using the Web Crypto API.", steps: [{ name: "Step 1", text: "Enter text to hash" }, { name: "Step 2", text: "Click Generate Hashes" }, { name: "Step 3", text: "Copy the hash you need" }] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Security Tools", href: "/#security" }, { label: "Hash Generator", href: "/tools/hash-generator" }]} />

      <h1 className="mb-2 text-3xl font-bold">Hash Generator</h1>
      <p className="mb-6 text-gray-600">Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes from any text. Uses the Web Crypto API for secure hashing.</p>

      <textarea className="mb-4 w-full rounded-lg border border-gray-300 p-4 font-mono text-sm" rows={5} placeholder="Enter text to hash..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={generate} className="mb-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">Generate Hashes</button>

      {Object.keys(results).length > 0 && (
        <div className="space-y-3">
          {algos.map((a) => (
            <div key={a.id} className="rounded-lg bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">{a.label}</span>
                <button onClick={() => navigator.clipboard.writeText(results[a.id])} className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">Copy</button>
              </div>
              <div className="break-all font-mono text-xs text-gray-600">{results[a.id]}</div>
            </div>
          ))}
        </div>
      )}

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is a Hash Function?</h2>
        <p>A cryptographic hash function takes an input and produces a fixed-size string of characters. The same input always produces the same hash, but it is computationally infeasible to reverse the process. Hashes are used for password storage, data integrity verification, and digital signatures.</p>
      </section>

      <FAQ items={[
        { question: "Which hash algorithm should I use?", answer: "SHA-256 is the most commonly used. SHA-1 is deprecated for security purposes. SHA-384 and SHA-512 provide higher security but produce longer hashes." },
        { question: "Can hashes be reversed?", answer: "No. Cryptographic hash functions are one-way functions. You cannot recover the original text from a hash. This is different from encoding (like Base64) which can be reversed." },
        { question: "Is this tool secure?", answer: "Yes. This tool uses the Web Crypto API built into your browser, which provides cryptographic-grade implementations. No data is sent to any server." },
        { question: "Why is MD5 not included?", answer: "MD5 is cryptographically broken and should not be used for security purposes. The Web Crypto API does not support MD5. We only include secure hash algorithms." },
      ]} />
      <RelatedTools currentSlug="hash-generator" />
    </div>
  );
}
