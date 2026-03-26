"use client";

import { useState, useEffect } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

const faqs = [
  { question: "What is a Unix timestamp?", answer: "A Unix timestamp (also called Epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, at 00:00:00 UTC. It is widely used in programming and databases to represent dates and times as a single number." },
  { question: "What is the difference between seconds and milliseconds timestamps?", answer: "A Unix timestamp in seconds is typically 10 digits (e.g., 1700000000). In milliseconds, it is 13 digits (e.g., 1700000000000). JavaScript uses milliseconds, while most Unix systems and APIs use seconds." },
  { question: "What is the Year 2038 problem?", answer: "32-bit systems store Unix timestamps as a signed 32-bit integer, which will overflow on January 19, 2038. Most modern systems use 64-bit integers, which can represent dates billions of years into the future." },
  { question: "How do I get the current Unix timestamp in code?", answer: "In JavaScript: Date.now() or Math.floor(Date.now()/1000). In Python: import time; int(time.time()). In PHP: time(). In Bash: date +%s." },
];

export default function TimestampConverterPage() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState("");
  const [dateResult, setDateResult] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [tsResult, setTsResult] = useState("");

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  function tsToDate() {
    const n = parseInt(tsInput);
    if (isNaN(n)) { setDateResult("Invalid timestamp"); return; }
    const ms = tsInput.length >= 13 ? n : n * 1000;
    const d = new Date(ms);
    setDateResult(`${d.toUTCString()}\n${d.toISOString()}\n${d.toLocaleString()}`);
  }

  function dateToTs() {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) { setTsResult("Invalid date"); return; }
    setTsResult(`Seconds: ${Math.floor(d.getTime() / 1000)}\nMilliseconds: ${d.getTime()}`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "Timestamp Converter", description: "Free online Unix timestamp converter. Convert between Unix timestamps and human-readable dates.", url: "https://toolpilot.pages.dev/tools/timestamp-converter", category: "DeveloperApplication", keywords: ["timestamp converter", "unix timestamp", "epoch converter", "date to timestamp"] })} />
      <JsonLd data={howToSchema({ name: "How to convert a Unix timestamp", description: "Convert between Unix timestamps and human-readable dates in seconds or milliseconds.", steps: [{ name: "Step 1", text: "Enter a timestamp or date" }, { name: "Step 2", text: "Click Convert" }, { name: "Step 3", text: "View the result in multiple formats" }] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developer Tools", href: "/#developer" }, { label: "Timestamp Converter", href: "/tools/timestamp-converter" }]} />

      <h1 className="mb-2 text-3xl font-bold">Unix Timestamp Converter</h1>
      <p className="mb-6 text-gray-600">Convert between Unix timestamps and human-readable dates. Supports seconds and milliseconds.</p>

      <AdBanner slot="tool-top" format="horizontal" />

      <div className="mb-6 rounded-lg bg-white p-4 text-center">
        <div className="text-sm text-gray-500">Current Unix Timestamp</div>
        <div className="text-3xl font-bold font-mono text-blue-600">{now}</div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6">
          <h2 className="mb-3 font-semibold text-gray-900">Timestamp → Date</h2>
          <input type="text" placeholder="e.g., 1700000000" value={tsInput} onChange={(e) => setTsInput(e.target.value)} className="mb-3 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm" />
          <button onClick={tsToDate} className="mb-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">Convert</button>
          {dateResult && <pre className="whitespace-pre-wrap rounded bg-gray-50 p-3 text-sm">{dateResult}</pre>}
        </div>
        <div className="rounded-lg bg-white p-6">
          <h2 className="mb-3 font-semibold text-gray-900">Date → Timestamp</h2>
          <input type="text" placeholder="e.g., 2024-01-15 12:00:00" value={dateInput} onChange={(e) => setDateInput(e.target.value)} className="mb-3 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm" />
          <button onClick={dateToTs} className="mb-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">Convert</button>
          {tsResult && <pre className="whitespace-pre-wrap rounded bg-gray-50 p-3 text-sm">{tsResult}</pre>}
        </div>
      </div>

      <AdBanner slot="tool-mid" format="rectangle" />

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is a Unix Timestamp?</h2>
        <p>A Unix timestamp is a way to track time as a running total of seconds since the Unix Epoch (January 1, 1970, 00:00:00 UTC). It is used in virtually every programming language, database, and API to store and compare dates in a timezone-independent way.</p>
      </section>

      <FAQ items={faqs} />
      <AdBanner slot="tool-bottom" format="horizontal" />
      <RelatedTools currentSlug="timestamp-converter" />
    </div>
  );
}
