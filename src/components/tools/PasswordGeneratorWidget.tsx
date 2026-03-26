"use client";

import { useState, useCallback } from "react";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function getStrength(
  pw: string,
  len: number,
  opts: Record<string, boolean>
): { label: string; color: string; width: string } {
  const types = Object.values(opts).filter(Boolean).length;
  if (len >= 16 && types >= 3) return { label: "Very Strong", color: "bg-green-500", width: "w-full" };
  if (len >= 12 && types >= 3) return { label: "Strong", color: "bg-green-400", width: "w-3/4" };
  if (len >= 8 && types >= 2) return { label: "Medium", color: "bg-yellow-400", width: "w-1/2" };
  return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
}

interface PasswordGeneratorLabels {
  copy: string;
  generate: string;
  strength: string;
  length: string;
  uppercase: string;
  lowercase: string;
  numbers: string;
  symbols: string;
}

const defaultLabels: PasswordGeneratorLabels = {
  copy: "Copy",
  generate: "Generate Password",
  strength: "Strength",
  length: "Length",
  uppercase: "Uppercase",
  lowercase: "Lowercase",
  numbers: "Numbers",
  symbols: "Symbols",
};

interface PasswordGeneratorWidgetProps {
  labels?: Partial<PasswordGeneratorLabels>;
}

export default function PasswordGeneratorWidget({ labels: labelsProp }: PasswordGeneratorWidgetProps = {}) {
  const labels = { ...defaultLabels, ...labelsProp };

  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let pool = "";
    if (options.uppercase) pool += CHARS.uppercase;
    if (options.lowercase) pool += CHARS.lowercase;
    if (options.numbers) pool += CHARS.numbers;
    if (options.symbols) pool += CHARS.symbols;
    if (!pool) pool = CHARS.lowercase;
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (v) => pool[v % pool.length]).join(""));
  }, [length, options]);

  const copy = () => navigator.clipboard.writeText(password);
  const strength = password ? getStrength(password, length, options) : null;

  const optionLabels: Record<keyof typeof options, string> = {
    uppercase: labels.uppercase,
    lowercase: labels.lowercase,
    numbers: labels.numbers,
    symbols: labels.symbols,
  };

  return (
    <div className="rounded-lg bg-white p-6">
      {password && (
        <div className="relative mb-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-lg break-all">
            {password}
          </div>
          <button
            onClick={copy}
            className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
          >
            {labels.copy}
          </button>
        </div>
      )}

      {strength && (
        <div className="mb-4">
          <div className="mb-1 flex justify-between text-xs">
            <span>{labels.strength}</span>
            <span>{strength.label}</span>
          </div>
          <div className="h-2 w-full rounded bg-gray-200">
            <div className={`h-2 rounded ${strength.color} ${strength.width} transition-all`} />
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {labels.length}: {length}
        </label>
        <input
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(+e.target.value)}
          className="w-full"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-4">
        {(Object.keys(options) as (keyof typeof options)[]).map((key) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={options[key]}
              onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
            />
            {optionLabels[key]}
          </label>
        ))}
      </div>

      <button
        onClick={generate}
        className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        {labels.generate}
      </button>
    </div>
  );
}
