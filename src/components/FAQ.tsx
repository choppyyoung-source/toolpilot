"use client";

import { useState } from "react";
import JsonLd, { faqSchema } from "./JsonLd";

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="mt-8">
      <JsonLd data={faqSchema(items)} />
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 bg-white"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50"
              aria-expanded={openIdx === idx}
            >
              <span>{item.question}</span>
              <span className="ml-2 shrink-0 text-gray-400">
                {openIdx === idx ? "−" : "+"}
              </span>
            </button>
            {openIdx === idx && (
              <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
