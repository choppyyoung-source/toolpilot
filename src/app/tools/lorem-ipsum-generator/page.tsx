"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(
    " "
  );

function randomWords(count: number): string {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return result.join(" ");
}

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const s = randomWords(len);
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}

function generateParagraph(): string {
  const sentences = 3 + Math.floor(Math.random() * 5);
  return Array.from({ length: sentences }, generateSentence).join(" ");
}

const faqs = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is dummy placeholder text used in the printing and typesetting industry since the 1500s. It is used to fill layouts with readable-looking text before the final content is ready.",
  },
  {
    question: "Why use Lorem Ipsum instead of random text?",
    answer:
      "Lorem Ipsum has a natural distribution of letters and word lengths that closely resembles real English text. This helps designers and developers see a realistic preview of how the final content will look in a layout.",
  },
  {
    question: "Can I customize the amount of Lorem Ipsum generated?",
    answer:
      "Yes. You can choose to generate a specific number of paragraphs, sentences, or individual words using the controls above the generate button.",
  },
  {
    question: "Is this Lorem Ipsum generator free?",
    answer:
      "Yes, completely free with no limits. You can generate as much placeholder text as you need without creating an account or paying anything.",
  },
];

export default function LoremIpsumPage() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">(
    "paragraphs"
  );
  const [output, setOutput] = useState("");

  function generate() {
    if (type === "paragraphs") {
      setOutput(Array.from({ length: count }, generateParagraph).join("\n\n"));
    } else if (type === "sentences") {
      setOutput(Array.from({ length: count }, generateSentence).join(" "));
    } else {
      setOutput(randomWords(count));
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "Lorem Ipsum Generator",
          description:
            "Generate Lorem Ipsum placeholder text in paragraphs, sentences, or words for web design, graphic design, and publishing.",
          url: "https://toolbox-web-self.vercel.app/tools/lorem-ipsum-generator",
          category: "DesignApplication",
          keywords: [
            "lorem ipsum generator",
            "placeholder text",
            "dummy text generator",
          ],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: "How to Generate Lorem Ipsum Text",
          description:
            "Generate placeholder text for your designs using ToolPilot's free Lorem Ipsum generator.",
          steps: [
            {
              name: "Set the amount",
              text: "Enter the number of paragraphs, sentences, or words you want to generate.",
            },
            {
              name: "Choose the type",
              text: "Select whether you want paragraphs, sentences, or words from the dropdown.",
            },
            {
              name: "Generate and copy",
              text: "Click Generate to create the text, then click Copy to copy it to your clipboard.",
            },
          ],
        })}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Text Tools", href: "/#text" },
          { label: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">Lorem Ipsum Generator</h1>
      <p className="mb-6 text-gray-600">
        Generate placeholder text for your designs, mockups, and layouts. Choose
        between paragraphs, sentences, or words.
      </p>

      <AdBanner slot="tool-top" format="horizontal" />

      <div className="mb-4 flex flex-wrap items-end gap-4 rounded-lg bg-white p-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, +e.target.value))}
            className="w-24 rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <button
          onClick={generate}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Generate
        </button>
      </div>

      {output && (
        <div className="relative">
          <textarea
            className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm"
            rows={12}
            readOnly
            value={output}
          />
          <button
            onClick={copy}
            className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      )}

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          What Is Lorem Ipsum?
        </h2>
        <p>
          Lorem Ipsum is standard dummy text used by the printing and
          typesetting industry since the 1500s. Designers and developers use it
          as placeholder content when the real text is not yet available. It
          allows focus on visual design without being distracted by readable
          content.
        </p>
      </section>

      <FAQ items={faqs} />

      <AdBanner slot="tool-bottom" format="horizontal" />
    </div>
  );
}
