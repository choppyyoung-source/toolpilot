"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

function parseMarkdown(md: string): string {
  let html = md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, "<h3 class='text-lg font-bold mt-4 mb-1'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-xl font-bold mt-5 mb-2'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-2xl font-bold mt-6 mb-2'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class='bg-gray-100 px-1 rounded text-sm'>$1</code>")
    .replace(/^\- (.+)$/gm, "<li class='ml-4 list-disc'>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li class='ml-4 list-decimal'>$1</li>")
    .replace(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' class='text-blue-600 underline'>$1</a>")
    .replace(/^---$/gm, "<hr class='my-4 border-gray-300'>")
    .replace(/\n\n/g, "</p><p class='mb-2'>")
    .replace(/\n/g, "<br>");
  return "<p class='mb-2'>" + html + "</p>";
}

const faqs = [
  { question: "What is Markdown?", answer: "Markdown is a lightweight markup language created by John Gruber in 2004. It lets you write formatted text using plain text syntax. It is widely used for documentation, README files, blog posts, and messaging platforms like GitHub, Slack, and Discord." },
  { question: "What Markdown syntax is supported?", answer: "This previewer supports headings (#, ##, ###), bold (**text**), italic (*text*), inline code (`code`), links ([text](url)), unordered lists (- item), ordered lists (1. item), and horizontal rules (---)." },
  { question: "Is this a full Markdown parser?", answer: "This is a lightweight Markdown previewer that covers the most commonly used syntax. For advanced features like tables, footnotes, or task lists, consider using a full Markdown editor like VS Code or Typora." },
  { question: "Can I export the preview as HTML?", answer: "Yes. Click the Copy HTML button to copy the rendered HTML to your clipboard. You can then use it in your website, email, or any other HTML context." },
];

const SAMPLE = `# Hello World

This is a **Markdown** preview tool. Type on the left to see the preview on the right.

## Features
- **Bold text** and *italic text*
- \`Inline code\` formatting
- [Links](https://example.com)
- Ordered and unordered lists

### How to use
1. Type Markdown in the editor
2. See the live preview instantly
3. Copy the HTML output

---

> Built with ToolPilot`;

export default function MarkdownPreviewPage() {
  const [input, setInput] = useState(SAMPLE);

  const html = parseMarkdown(input);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "Markdown Preview", description: "Free online Markdown previewer. Write Markdown and see a live preview instantly. Copy HTML output.", url: "https://toolpilot.pages.dev/tools/markdown-preview", category: "DeveloperApplication", keywords: ["markdown preview", "markdown editor", "markdown to html", "markdown viewer"] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developer Tools", href: "/#developer" }, { label: "Markdown Preview", href: "/tools/markdown-preview" }]} />

      <h1 className="mb-2 text-3xl font-bold">Markdown Preview</h1>
      <p className="mb-6 text-gray-600">Write Markdown on the left, see the live preview on the right. Copy the HTML output with one click.</p>

      <AdBanner slot="tool-top" format="horizontal" />

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 text-sm font-medium text-gray-700">Editor</div>
          <textarea className="w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none" rows={20} value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Preview</span>
            <button onClick={() => navigator.clipboard.writeText(html)} className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">Copy HTML</button>
          </div>
          <div className="min-h-[480px] rounded-lg border border-gray-300 bg-white p-4 text-sm" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is Markdown?</h2>
        <p>Markdown is a plain text formatting syntax designed to be converted to HTML. It is used by developers, writers, and documentation teams worldwide. GitHub README files, Jupyter notebooks, and many CMS platforms use Markdown as their primary content format.</p>
      </section>

      <FAQ items={faqs} />
      <AdBanner slot="tool-bottom" format="horizontal" />
      <RelatedTools currentSlug="markdown-preview" />
    </div>
  );
}
