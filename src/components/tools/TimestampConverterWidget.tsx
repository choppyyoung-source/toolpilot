"use client";

import { useState, useEffect } from "react";

interface TimestampConverterLabels {
  currentTimestamp: string;
  tsToDate: string;
  dateToTs: string;
  convert: string;
}

const defaultLabels: TimestampConverterLabels = {
  currentTimestamp: "Current Unix Timestamp",
  tsToDate: "Timestamp \u2192 Date",
  dateToTs: "Date \u2192 Timestamp",
  convert: "Convert",
};

interface TimestampConverterWidgetProps {
  labels?: Partial<TimestampConverterLabels>;
}

export default function TimestampConverterWidget({ labels: labelsProp }: TimestampConverterWidgetProps = {}) {
  const labels = { ...defaultLabels, ...labelsProp };

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
    <div>
      {/* Current Timestamp */}
      <div className="mb-6 rounded-lg bg-white p-4 text-center">
        <div className="text-sm text-gray-500">{labels.currentTimestamp}</div>
        <div className="font-mono text-3xl font-bold text-blue-600">{now}</div>
      </div>

      {/* Conversion Panels */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6">
          <h2 className="mb-3 font-semibold text-gray-900">{labels.tsToDate}</h2>
          <input
            type="text"
            placeholder="e.g., 1700000000"
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            className="mb-3 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm"
          />
          <button
            onClick={tsToDate}
            className="mb-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {labels.convert}
          </button>
          {dateResult && (
            <pre className="whitespace-pre-wrap rounded bg-gray-50 p-3 text-sm">{dateResult}</pre>
          )}
        </div>

        <div className="rounded-lg bg-white p-6">
          <h2 className="mb-3 font-semibold text-gray-900">{labels.dateToTs}</h2>
          <input
            type="text"
            placeholder="e.g., 2024-01-15 12:00:00"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="mb-3 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm"
          />
          <button
            onClick={dateToTs}
            className="mb-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {labels.convert}
          </button>
          {tsResult && (
            <pre className="whitespace-pre-wrap rounded bg-gray-50 p-3 text-sm">{tsResult}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
