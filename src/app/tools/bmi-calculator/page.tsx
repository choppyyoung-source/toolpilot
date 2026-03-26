"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { webApplicationSchema } from "@/components/JsonLd";

function getBmiCategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600" };
  if (bmi < 25) return { label: "Normal weight", color: "text-green-600" };
  if (bmi < 30) return { label: "Overweight", color: "text-yellow-600" };
  return { label: "Obese", color: "text-red-600" };
}

export default function BmiCalculatorPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  function calculate() {
    let h: number, w: number;
    if (unit === "metric") {
      h = parseFloat(height) / 100;
      w = parseFloat(weight);
    } else {
      h = (parseFloat(heightFt) * 12 + parseFloat(heightIn || "0")) * 0.0254;
      w = parseFloat(weight) * 0.453592;
    }
    if (!h || !w || h <= 0 || w <= 0) return;
    setBmi(Math.round((w / (h * h)) * 10) / 10);
  }

  const cat = bmi ? getBmiCategory(bmi) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "BMI Calculator", description: "Free online BMI calculator. Calculate your Body Mass Index using metric or imperial units. Get instant results with health category.", url: "https://toolpilot.pages.dev/tools/bmi-calculator", category: "UtilityApplication", keywords: ["bmi calculator", "body mass index", "bmi checker", "calculate bmi"] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Converters", href: "/#converter" }, { label: "BMI Calculator", href: "/tools/bmi-calculator" }]} />

      <h1 className="mb-2 text-3xl font-bold">BMI Calculator</h1>
      <p className="mb-6 text-gray-600">Calculate your Body Mass Index (BMI) using metric or imperial units. Get instant results with your health category.</p>

      <div className="mb-6 rounded-lg bg-white p-6">
        <div className="mb-4 flex gap-2">
          <button onClick={() => setUnit("metric")} className={`flex-1 rounded-lg py-2 text-sm font-medium ${unit === "metric" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>Metric (kg/cm)</button>
          <button onClick={() => setUnit("imperial")} className={`flex-1 rounded-lg py-2 text-sm font-medium ${unit === "imperial" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>Imperial (lb/ft)</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {unit === "metric" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Height (cm)</label>
              <input type="number" placeholder="170" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full rounded border border-gray-300 px-4 py-3 text-sm" />
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Height</label>
              <div className="flex gap-2">
                <input type="number" placeholder="5" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="flex-1 rounded border border-gray-300 px-3 py-3 text-sm" />
                <span className="flex items-center text-sm text-gray-500">ft</span>
                <input type="number" placeholder="10" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="flex-1 rounded border border-gray-300 px-3 py-3 text-sm" />
                <span className="flex items-center text-sm text-gray-500">in</span>
              </div>
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Weight ({unit === "metric" ? "kg" : "lb"})</label>
            <input type="number" placeholder={unit === "metric" ? "70" : "154"} value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full rounded border border-gray-300 px-4 py-3 text-sm" />
          </div>
        </div>
        <button onClick={calculate} className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">Calculate BMI</button>
      </div>

      {bmi && cat && (
        <div className="mb-6 rounded-lg bg-white p-6 text-center">
          <div className="text-sm text-gray-500">Your BMI</div>
          <div className={`text-5xl font-bold ${cat.color}`}>{bmi}</div>
          <div className={`mt-1 text-lg font-medium ${cat.color}`}>{cat.label}</div>
          <div className="mx-auto mt-4 max-w-md">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="flex-1 bg-blue-400" /><div className="flex-1 bg-green-400" /><div className="flex-1 bg-yellow-400" /><div className="flex-1 bg-red-400" />
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500"><span>16</span><span>18.5</span><span>25</span><span>30</span><span>40</span></div>
          </div>
        </div>
      )}

      {/* BMI Table */}
      <div className="mb-6 rounded-lg bg-white p-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">BMI Categories</h2>
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left"><th className="pb-2">Category</th><th className="pb-2">BMI Range</th></tr></thead>
          <tbody>
            <tr className="border-b border-gray-100"><td className="py-2 text-blue-600">Underweight</td><td>Below 18.5</td></tr>
            <tr className="border-b border-gray-100"><td className="py-2 text-green-600">Normal weight</td><td>18.5 – 24.9</td></tr>
            <tr className="border-b border-gray-100"><td className="py-2 text-yellow-600">Overweight</td><td>25.0 – 29.9</td></tr>
            <tr><td className="py-2 text-red-600">Obese</td><td>30.0 and above</td></tr>
          </tbody>
        </table>
      </div>

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is BMI?</h2>
        <p>Body Mass Index (BMI) is a simple measure using height and weight to estimate body fat. The formula is: BMI = weight (kg) / height (m)². While widely used for general health screening, BMI does not distinguish between muscle and fat mass and should not be the sole indicator of health.</p>
      </section>

      <FAQ items={[
        { question: "How is BMI calculated?", answer: "BMI = weight in kilograms divided by height in meters squared. For imperial units, the formula is: BMI = (weight in pounds × 703) / (height in inches)²." },
        { question: "Is BMI accurate for everyone?", answer: "BMI is a general screening tool and may not be accurate for athletes (who have more muscle mass), elderly people, or children. It does not account for body composition, age, sex, or ethnicity." },
        { question: "What is a healthy BMI?", answer: "A BMI between 18.5 and 24.9 is generally considered healthy for adults. However, optimal BMI can vary based on individual factors. Consult a healthcare provider for personalized advice." },
        { question: "Does this tool store my data?", answer: "No. All calculations happen in your browser. Your height and weight are never sent to any server." },
      ]} />
    </div>
  );
}
