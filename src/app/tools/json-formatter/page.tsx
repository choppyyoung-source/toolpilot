"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";

const faqs = [
  {
    question: "What is a JSON formatter?",
    answer:
      "A JSON formatter is a tool that takes raw or minified JSON data and reformats it with proper indentation and line breaks, making it easier to read and debug. It can also validate JSON syntax and report errors.",
  },
  {
    question: "What is the difference between formatting and minifying JSON?",
    answer:
      "Formatting (beautifying) adds indentation and newlines to make JSON human-readable. Minifying removes all unnecessary whitespace to reduce file size, which is useful for production environments and API payloads.",
  },
  {
    question: "How do I validate JSON?",
    answer:
      "Paste your JSON into the input box and click Format or Minify. If the JSON is invalid, the tool will display a detailed error message showing what went wrong and where the syntax error is located.",
  },
  {
    question: "Does this tool support large JSON files?",
    answer:
      "Yes. Since all processing happens in your browser, the tool can handle large JSON files limited only by your device's memory. No data is sent to any server.",
  },
  {
    question: "What indentation options are available?",
    answer:
      "You can choose between 2 spaces, 4 spaces, or 1 tab for indentation when formatting your JSON data.",
  },
];

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  function format() {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function minify() {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "JSON Formatter & Validator",
          description:
            "Free online JSON formatter, beautifier, and validator. Format, minify, and validate JSON data with syntax highlighting.",
          url: "https://toolpilot.pages.dev/tools/json-formatter",
          category: "DeveloperApplication",
          keywords: [
            "json formatter",
            "json validator",
            "json beautifier",
            "json pretty print",
          ],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: "How to Format and Validate JSON Online",
          description:
            "Use ToolPilot's free JSON formatter to beautify, minify, and validate JSON data.",
          steps: [
            {
              name: "Paste your JSON",
              text: "Copy your JSON data and paste it into the input field on the left.",
            },
            {
              name: "Choose an action",
              text: "Click Format to beautify with indentation, or Minify to compress. Select your preferred indentation (2 spaces, 4 spaces, or tab).",
            },
            {
              name: "Review and copy",
              text: "The formatted output appears on the right. If there are errors, a detailed error message is shown. Click Copy to copy the result.",
            },
          ],
        })}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/#developer" },
          { label: "JSON Formatter", href: "/tools/json-formatter" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">JSON Formatter & Validator</h1>
      <p className="mb-6 text-gray-600">
        Format, validate, and beautify JSON data instantly. Supports
        pretty-printing with customizable indentation and minification for
        production use.
      </p>

      <AdBanner slot="tool-top" format="horizontal" />

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Input</label>
            <div className="flex gap-2">
              <select
                value={indent}
                onChange={(e) => setIndent(+e.target.value)}
                className="rounded border border-gray-300 px-2 py-1 text-xs"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>1 tab</option>
              </select>
              <button
                onClick={format}
                className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
              >
                Format
              </button>
              <button
                onClick={minify}
                className="rounded bg-gray-600 px-3 py-1 text-xs text-white hover:bg-gray-700"
              >
                Minify
              </button>
            </div>
          </div>
          <textarea
            className="w-full rounded-lg border border-gray-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none"
            rows={16}
            placeholder='Paste your JSON here...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Output</label>
            {output && (
              <button
                onClick={copy}
                className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
              >
                Copy
              </button>
            )}
          </div>
          {error ? (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
              <strong>Error:</strong> {error}
            </div>
          ) : (
            <textarea
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm"
              rows={16}
              readOnly
              value={output}
            />
          )}
        </div>
      </div>

      <AdBanner slot="tool-mid" format="rectangle" />

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          What Is JSON?
        </h2>
        <p className="mb-3">
          JSON (JavaScript Object Notation) is a lightweight data interchange
          format that is easy for humans to read and write, and easy for machines
          to parse and generate. It is the most common format for APIs, config
          files, and data storage on the web.
        </p>
        <h3 className="mb-1 font-semibold text-gray-900">
          When to Use a JSON Formatter
        </h3>
        <ul className="list-inside list-disc space-y-1">
          <li>Debugging API responses</li>
          <li>Reviewing configuration files</li>
          <li>Validating JSON syntax before deployment</li>
          <li>Minifying JSON for production to reduce payload size</li>
          <li>Converting between formatted and compact representations</li>
        </ul>
      </section>

      <FAQ items={faqs} />

      <AdBanner slot="tool-bottom" format="horizontal" />
    </div>
  );
}
