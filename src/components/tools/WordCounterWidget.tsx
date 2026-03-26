"use client";

import { useState } from "react";

interface Labels {
  placeholder?: string;
  words?: string;
  characters?: string;
  noSpaces?: string;
  sentences?: string;
  paragraphs?: string;
  readingTime?: string;
}

const defaults: Labels = {
  placeholder: "Type or paste your text here...",
  words: "Words",
  characters: "Characters",
  noSpaces: "No Spaces",
  sentences: "Sentences",
  paragraphs: "Paragraphs",
  readingTime: "Reading Time",
};

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
  return { characters, charactersNoSpaces, words, sentences, paragraphs, readingTime };
}

export default function WordCounterWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [text, setText] = useState("");
  const stats = analyze(text);

  const statItems = [
    { label: labels.words!, value: stats.words },
    { label: labels.characters!, value: stats.characters },
    { label: labels.noSpaces!, value: stats.charactersNoSpaces },
    { label: labels.sentences!, value: stats.sentences },
    { label: labels.paragraphs!, value: stats.paragraphs },
    { label: labels.readingTime!, value: `${stats.readingTime} min` },
  ];

  return (
    <div>
      <textarea
        className="mb-4 w-full rounded-lg border border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none"
        rows={10}
        placeholder={labels.placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statItems.map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-white p-4 text-center shadow-sm"
          >
            <div className="text-2xl font-bold text-blue-600">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
