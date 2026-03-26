"use client";

import { useState, useCallback } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const faqs = [
  {
    question: "What makes a strong password?",
    answer: "A strong password is at least 12 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols. It should not contain dictionary words, personal information, or common patterns like '123456'.",
  },
  {
    question: "Are the generated passwords stored anywhere?",
    answer: "No. Passwords are generated entirely in your browser using JavaScript. Nothing is sent to any server, stored in any database, or logged anywhere. Your passwords are completely private.",
  },
  {
    question: "How does the password strength indicator work?",
    answer: "The strength indicator evaluates password length and character diversity. Passwords under 8 characters are weak, 8-11 characters with mixed types are medium, and 12+ characters with all character types are strong.",
  },
  {
    question: "Should I use a different password for every account?",
    answer: "Yes. Using unique passwords for each account prevents a single data breach from compromising all your accounts. Use a password manager to keep track of all your unique passwords.",
  },
];

function getStrength(pw: string, len: number, opts: Record<string, boolean>): { label: string; color: string; width: string } {
  const types = Object.values(opts).filter(Boolean).length;
  if (len >= 16 && types >= 3) return { label: "Very Strong", color: "bg-green-500", width: "w-full" };
  if (len >= 12 && types >= 3) return { label: "Strong", color: "bg-green-400", width: "w-3/4" };
  if (len >= 8 && types >= 2) return { label: "Medium", color: "bg-yellow-400", width: "w-1/2" };
  return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "Password Generator",
          description: "Free online password generator. Create strong, random passwords with customizable length and character types.",
          url: "https://toolpilot.pages.dev/tools/password-generator",
          category: "UtilityApplication",
          keywords: ["password generator", "random password", "strong password generator", "secure password"],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: "How to Generate a Strong Password",
          description: "Use ToolPilot to generate a random, secure password.",
          steps: [
            { name: "Set length", text: "Choose a password length (12-20 characters recommended)." },
            { name: "Select character types", text: "Enable uppercase, lowercase, numbers, and symbols for maximum security." },
            { name: "Generate and copy", text: "Click Generate Password, then Copy to save it to your clipboard." },
          ],
        })}
      />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Text Tools", href: "/#text" }, { label: "Password Generator", href: "/tools/password-generator" }]} />

      <h1 className="mb-2 text-3xl font-bold">Password Generator</h1>
      <p className="mb-6 text-gray-600">
        Generate strong, random passwords instantly. Customize length and character types. Everything runs locally — your passwords never leave your device.
      </p>

      <AdBanner slot="tool-top" format="horizontal" />

      <div className="rounded-lg bg-white p-6">
        {password && (
          <div className="relative mb-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-lg break-all">{password}</div>
            <button onClick={copy} className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">Copy</button>
          </div>
        )}
        {strength && (
          <div className="mb-4">
            <div className="mb-1 flex justify-between text-xs"><span>Strength</span><span>{strength.label}</span></div>
            <div className="h-2 w-full rounded bg-gray-200"><div className={`h-2 rounded ${strength.color} ${strength.width} transition-all`} /></div>
          </div>
        )}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">Length: {length}</label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full" />
        </div>
        <div className="mb-4 flex flex-wrap gap-4">
          {(Object.keys(options) as (keyof typeof options)[]).map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={options[key]} onChange={(e) => setOptions({ ...options, [key]: e.target.checked })} />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
        <button onClick={generate} className="w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">Generate Password</button>
      </div>

      <AdBanner slot="tool-mid" format="rectangle" />

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Why Use a Password Generator?</h2>
        <p className="mb-3">Humans are bad at creating random passwords. We tend to use predictable patterns, dictionary words, and personal information. A password generator uses cryptographically secure randomness to create passwords that are virtually impossible to guess or brute-force.</p>
        <h3 className="mb-1 font-semibold text-gray-900">Password Security Tips</h3>
        <ul className="list-inside list-disc space-y-1">
          <li>Use at least 12 characters for important accounts</li>
          <li>Never reuse passwords across different sites</li>
          <li>Use a password manager to store your passwords</li>
          <li>Enable two-factor authentication where possible</li>
        </ul>
      </section>

      <FAQ items={faqs} />
      <AdBanner slot="tool-bottom" format="horizontal" />
      <RelatedTools currentSlug="password-generator" />
    </div>
  );
}
