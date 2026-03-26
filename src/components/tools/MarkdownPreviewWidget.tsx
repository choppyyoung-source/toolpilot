"use client";

import { useState } from "react";

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

interface MarkdownPreviewLabels {
  editor: string;
  preview: string;
  copyHtml: string;
}

const defaultLabels: MarkdownPreviewLabels = {
  editor: "Editor",
  preview: "Preview",
  copyHtml: "Copy HTML",
};

interface MarkdownPreviewWidgetProps {
  labels?: Partial<MarkdownPreviewLabels>;
}

export default function MarkdownPreviewWidget({ labels: labelsProp }: MarkdownPreviewWidgetProps = {}) {
  const labels = { ...defaultLabels, ...labelsProp };

  const [input, setInput] = useState(SAMPLE);
  const html = parseMarkdown(input);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <div className="mb-2 text-sm font-medium text-gray-700">{labels.editor}</div>
        <textarea
          className="w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none"
          rows={20}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{labels.preview}</span>
          <button
            onClick={() => navigator.clipboard.writeText(html)}
            className="rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            {labels.copyHtml}
          </button>
        </div>
        <div
          className="min-h-[480px] rounded-lg border border-gray-300 bg-white p-4 text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
