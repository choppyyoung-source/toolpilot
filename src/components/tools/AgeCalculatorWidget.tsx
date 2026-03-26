"use client";

import { useState } from "react";

interface Labels {
  dateOfBirth?: string;
  calculate?: string;
  yourAge?: string;
  totalMonths?: string;
  totalWeeks?: string;
  totalDays?: string;
  totalHours?: string;
  nextBirthday?: string;
}

const defaults: Labels = {
  dateOfBirth: "Date of Birth",
  calculate: "Calculate",
  yourAge: "Your Age",
  totalMonths: "Total Months",
  totalWeeks: "Total Weeks",
  totalDays: "Total Days",
  totalHours: "Total Hours",
  nextBirthday: "Your next birthday is in",
};

function calcAge(birth: Date, now: Date) {
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000);
  return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysUntilBirthday };
}

export default function AgeCalculatorWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calcAge> | null>(null);

  function calculate() {
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return;
    setResult(calcAge(birth, new Date()));
  }

  return (
    <div>
      <div className="mb-6 rounded-lg bg-white p-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">{labels.dateOfBirth}</label>
        <div className="flex gap-3">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="flex-1 rounded border border-gray-300 px-4 py-3 text-sm"
          />
          <button
            onClick={calculate}
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            {labels.calculate}
          </button>
        </div>
      </div>

      {result && (
        <>
          <div className="mb-6 rounded-lg bg-blue-600 p-6 text-center text-white">
            <div className="text-sm opacity-80">{labels.yourAge}</div>
            <div className="text-4xl font-bold">
              {result.years} years, {result.months} months, {result.days} days
            </div>
          </div>
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: labels.totalMonths!, value: result.totalMonths.toLocaleString() },
              { label: labels.totalWeeks!, value: result.totalWeeks.toLocaleString() },
              { label: labels.totalDays!, value: result.totalDays.toLocaleString() },
              { label: labels.totalHours!, value: result.totalHours.toLocaleString() },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-white p-4 text-center">
                <div className="text-xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-white p-4 text-center text-sm text-gray-600">
            {labels.nextBirthday}{" "}
            <span className="font-bold text-blue-600">{result.daysUntilBirthday} days</span>!
          </div>
        </>
      )}
    </div>
  );
}
