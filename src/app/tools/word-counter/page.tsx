"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

function analyze(text: string) {
  const trimmed = text.trim();
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const sentences =
    trimmed === "" ? 0 : trimmed.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs =
    trimmed === "" ? 0 : trimmed.split(/\n\s*\n/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200);
  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTime,
  };
}

const faqs = [
  {
    question: "How does the word counter work?",
    answer:
      "Simply type or paste your text into the input box. The tool instantly counts words, characters (with and without spaces), sentences, paragraphs, and estimates reading time based on an average reading speed of 200 words per minute.",
  },
  {
    question: "Is there a character or word limit?",
    answer:
      "No, there is no limit. You can paste text of any length and the counter will work instantly. All processing happens in your browser so there are no server restrictions.",
  },
  {
    question: "Does this tool store my text?",
    answer:
      "No. All processing happens entirely in your browser. Your text never leaves your device and nothing is saved or transmitted to any server.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated based on an average adult reading speed of 200 words per minute. The actual reading time may vary depending on the complexity of the text and the reader.",
  },
  {
    question: "Can I use this for social media character limits?",
    answer:
      "Yes! The character counter is perfect for checking Twitter/X (280 characters), Instagram captions (2,200 characters), LinkedIn posts (3,000 characters), and other social media platforms with character limits.",
  },
];

export default function WordCounterPage() {
  const [text, setText] = useState("");
  const stats = analyze(text);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "Word Counter",
          description:
            "Free online word counter tool. Count words, characters, sentences, paragraphs, and reading time instantly.",
          url: "https://toolpilot.pages.dev/tools/word-counter",
          category: "UtilityApplication",
          keywords: [
            "word counter",
            "character counter",
            "word count online",
            "letter count",
          ],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: "How to Count Words in Text Online",
          description:
            "Use ToolPilot's free word counter to count words, characters, sentences, and paragraphs in any text.",
          steps: [
            {
              name: "Open the Word Counter",
              text: "Navigate to ToolPilot's Word Counter tool at toolpilot.pages.dev/tools/word-counter.",
            },
            {
              name: "Enter your text",
              text: "Type or paste the text you want to analyze into the input box.",
            },
            {
              name: "View the results",
              text: "The word count, character count, sentence count, paragraph count, and estimated reading time are displayed instantly below the input.",
            },
          ],
        })}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Text Tools", href: "/#text" },
          { label: "Word Counter", href: "/tools/word-counter" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">Word Counter</h1>
      {/* AEO: Direct answer paragraph for AI/search engines */}
      <p className="mb-6 text-gray-600">
        Count words, characters, sentences, and paragraphs instantly. This free
        online word counter tool processes everything in your browser — your text
        is never stored or sent to any server.
      </p>

      <AdBanner slot="tool-top" format="horizontal" />

      <textarea
        className="mb-4 w-full rounded-lg border border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
        rows={10}
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.characters },
          { label: "No Spaces", value: stats.charactersNoSpaces },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Reading Time", value: `${stats.readingTime} min` },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-white p-4 text-center shadow-sm"
          >
            <div className="text-2xl font-bold text-blue-600">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <AdBanner slot="tool-mid" format="rectangle" />

      {/* AEO: Concise definition block for AI engines */}
      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          What Is a Word Counter?
        </h2>
        <p className="mb-3">
          A word counter is a tool that analyzes text and returns the total
          number of words, characters, sentences, and paragraphs. It is
          commonly used by writers, students, bloggers, and SEO professionals
          to ensure their content meets specific length requirements.
        </p>
        <h3 className="mb-1 font-semibold text-gray-900">Key Features</h3>
        <ul className="list-inside list-disc space-y-1">
          <li>Real-time word and character counting</li>
          <li>Character count with and without spaces</li>
          <li>Sentence and paragraph detection</li>
          <li>Estimated reading time (200 WPM average)</li>
          <li>Works offline — no data is sent to any server</li>
        </ul>
      </section>

      <FAQ items={faqs} />

      <AdBanner slot="tool-bottom" format="horizontal" />
      <RelatedTools currentSlug="word-counter" />
    </div>
  );
}
