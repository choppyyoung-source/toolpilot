"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

const converters = [
  { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { label: "lowercase", fn: (s: string) => s.toLowerCase() },
  {
    label: "Title Case",
    fn: (s: string) =>
      s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
  },
  {
    label: "Sentence case",
    fn: (s: string) =>
      s
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
  },
  {
    label: "camelCase",
    fn: (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  },
  {
    label: "snake_case",
    fn: (s: string) =>
      s
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[A-Z]/g, (c) => "_" + c.toLowerCase())
        .replace(/^_/, "")
        .replace(/_+/g, "_")
        .toLowerCase(),
  },
  {
    label: "kebab-case",
    fn: (s: string) =>
      s
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())
        .replace(/^-/, "")
        .replace(/-+/g, "-")
        .toLowerCase(),
  },
];

const faqs = [
  {
    question: "What is a case converter?",
    answer:
      "A case converter is a tool that transforms text between different letter cases such as UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and kebab-case. It saves time when reformatting text for different purposes.",
  },
  {
    question: "What is the difference between Title Case and Sentence case?",
    answer:
      "Title Case capitalizes the first letter of every word (e.g., 'The Quick Brown Fox'). Sentence case only capitalizes the first letter of each sentence (e.g., 'The quick brown fox. Jumped over.').",
  },
  {
    question: "What is camelCase used for?",
    answer:
      "camelCase is a naming convention commonly used in programming languages like JavaScript, Java, and C#. Variable names like 'firstName' or 'getUserData' follow camelCase, where the first word is lowercase and subsequent words start with uppercase.",
  },
  {
    question: "What is the difference between snake_case and kebab-case?",
    answer:
      "snake_case uses underscores between words (e.g., 'user_first_name') and is common in Python and Ruby. kebab-case uses hyphens (e.g., 'user-first-name') and is common in URLs, CSS class names, and HTML attributes.",
  },
  {
    question: "Is my text stored or shared when using this tool?",
    answer:
      "No. All text conversion happens entirely in your browser using JavaScript. Your text never leaves your device and is not stored or transmitted anywhere.",
  },
];

export default function CaseConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [active, setActive] = useState("");

  function convert(label: string, fn: (s: string) => string) {
    setActive(label);
    setOutput(fn(input));
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "Case Converter",
          description:
            "Free online case converter. Transform text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
          url: "https://toolpilot.pages.dev/tools/case-converter",
          category: "UtilityApplication",
          keywords: [
            "case converter",
            "uppercase converter",
            "lowercase converter",
            "title case",
          ],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: "How to Convert Text Case Online",
          description:
            "Use ToolPilot's free case converter to transform text between uppercase, lowercase, title case, and programming cases.",
          steps: [
            {
              name: "Paste your text",
              text: "Enter or paste the text you want to convert into the input field.",
            },
            {
              name: "Choose a case",
              text: "Click one of the conversion buttons: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, or kebab-case.",
            },
            {
              name: "Copy the result",
              text: "The converted text appears below. Click the Copy button to copy it to your clipboard.",
            },
          ],
        })}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Text Tools", href: "/#text" },
          { label: "Case Converter", href: "/tools/case-converter" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">Case Converter</h1>
      <p className="mb-6 text-gray-600">
        Convert text between UPPERCASE, lowercase, Title Case, camelCase,
        snake_case, and kebab-case. Free, instant, and works entirely in your
        browser.
      </p>

      <AdBanner slot="tool-top" format="horizontal" />

      <textarea
        className="mb-4 w-full rounded-lg border border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
        rows={6}
        placeholder="Type or paste your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {converters.map((c) => (
          <button
            key={c.label}
            onClick={() => convert(c.label, c.fn)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              active === c.label
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {output && (
        <div className="relative">
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-white p-4 text-base"
            rows={6}
            readOnly
            value={output}
          />
          <button
            onClick={copyOutput}
            className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      )}

      <AdBanner slot="tool-mid" format="rectangle" />

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          What Is a Case Converter?
        </h2>
        <p className="mb-3">
          A case converter is a text transformation tool that changes the
          capitalization of letters. It supports standard cases like uppercase
          and lowercase, as well as programming naming conventions like
          camelCase, snake_case, and kebab-case.
        </p>
        <h3 className="mb-1 font-semibold text-gray-900">Supported Cases</h3>
        <ul className="list-inside list-disc space-y-1">
          <li><strong>UPPERCASE</strong> — All letters capitalized</li>
          <li><strong>lowercase</strong> — All letters in lowercase</li>
          <li><strong>Title Case</strong> — First letter of each word capitalized</li>
          <li><strong>Sentence case</strong> — First letter of each sentence capitalized</li>
          <li><strong>camelCase</strong> — No spaces, uppercase at word boundaries (JavaScript style)</li>
          <li><strong>snake_case</strong> — Words separated by underscores (Python style)</li>
          <li><strong>kebab-case</strong> — Words separated by hyphens (URL/CSS style)</li>
        </ul>
      </section>

      <FAQ items={faqs} />

      <AdBanner slot="tool-bottom" format="horizontal" />
      <RelatedTools currentSlug="case-converter" />
    </div>
  );
}
