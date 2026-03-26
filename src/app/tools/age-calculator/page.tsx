"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

function calcAge(birth: Date, now: Date) {
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000);
  return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysUntilBirthday };
}

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcAge> | null>(null);

  function calculate() {
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return;
    setResult(calcAge(birth, new Date()));
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "Age Calculator", description: "Free online age calculator. Calculate your exact age in years, months, days, weeks, and hours from your date of birth.", url: "https://toolpilot.pages.dev/tools/age-calculator", category: "UtilityApplication", keywords: ["age calculator", "calculate age", "how old am i", "date of birth calculator"] })} />
      <JsonLd data={howToSchema({ name: "How to calculate your exact age", description: "Enter your date of birth and get your precise age in years, months, days, weeks, and hours.", steps: [{ name: "Step 1", text: "Enter your date of birth" }, { name: "Step 2", text: "Click Calculate" }, { name: "Step 3", text: "View your exact age in multiple units" }] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Converters", href: "/#converter" }, { label: "Age Calculator", href: "/tools/age-calculator" }]} />

      <h1 className="mb-2 text-3xl font-bold">Age Calculator</h1>
      <p className="mb-6 text-gray-600">Calculate your exact age in years, months, days, weeks, and hours from your date of birth.</p>

      <div className="mb-6 rounded-lg bg-white p-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">Date of Birth</label>
        <div className="flex gap-3">
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="flex-1 rounded border border-gray-300 px-4 py-3 text-sm" />
          <button onClick={calculate} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">Calculate</button>
        </div>
      </div>

      {result && (
        <>
          <div className="mb-6 rounded-lg bg-blue-600 p-6 text-center text-white">
            <div className="text-sm opacity-80">Your Age</div>
            <div className="text-4xl font-bold">{result.years} years, {result.months} months, {result.days} days</div>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Total Months", value: result.totalMonths.toLocaleString() },
              { label: "Total Weeks", value: result.totalWeeks.toLocaleString() },
              { label: "Total Days", value: result.totalDays.toLocaleString() },
              { label: "Total Hours", value: result.totalHours.toLocaleString() },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-white p-4 text-center">
                <div className="text-xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-white p-4 text-center text-sm text-gray-600">
            🎂 Your next birthday is in <span className="font-bold text-blue-600">{result.daysUntilBirthday} days</span>!
          </div>
        </>
      )}

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is an Age Calculator?</h2>
        <p>An age calculator is a tool that computes the exact difference between a date of birth and the current date. It provides results in years, months, days, weeks, and hours, accounting for varying month lengths and leap years.</p>
      </section>

      <FAQ items={[
        { question: "How accurate is this age calculator?", answer: "The calculator is accurate to the day. It uses your browser's current date and accounts for varying month lengths and leap years." },
        { question: "Does it account for leap years?", answer: "Yes. The calculation uses JavaScript's Date object which correctly handles leap years, including century leap year rules." },
        { question: "Can I calculate the age between two dates?", answer: "Currently this tool calculates age from a birth date to today. For custom date ranges, use our Timestamp Converter to work with specific dates." },
      ]} />
      <RelatedTools currentSlug="age-calculator" />
    </div>
  );
}
