"use client";

import { useState } from "react";

interface Labels {
  metric?: string;
  imperial?: string;
  height?: string;
  weight?: string;
  calculate?: string;
  yourBMI?: string;
  underweight?: string;
  normal?: string;
  overweight?: string;
  obese?: string;
  category?: string;
  bmiRange?: string;
}

const defaults: Labels = {
  metric: "Metric (kg/cm)",
  imperial: "Imperial (lb/ft)",
  height: "Height",
  weight: "Weight",
  calculate: "Calculate BMI",
  yourBMI: "Your BMI",
  underweight: "Underweight",
  normal: "Normal weight",
  overweight: "Overweight",
  obese: "Obese",
  category: "Category",
  bmiRange: "BMI Range",
};

function getBmiCategory(
  bmi: number,
  labels: Labels
): { label: string; color: string } {
  if (bmi < 18.5) return { label: labels.underweight!, color: "text-blue-600" };
  if (bmi < 25) return { label: labels.normal!, color: "text-green-600" };
  if (bmi < 30) return { label: labels.overweight!, color: "text-yellow-600" };
  return { label: labels.obese!, color: "text-red-600" };
}

export default function BmiCalculatorWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
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

  const cat = bmi ? getBmiCategory(bmi, labels) : null;

  return (
    <div>
      <div className="mb-6 rounded-lg bg-white p-6">
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setUnit("metric")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium ${unit === "metric" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {labels.metric}
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium ${unit === "imperial" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {labels.imperial}
          </button>
        </div>
        <div className="space-y-4">
          {unit === "metric" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {labels.height} (cm)
              </label>
              <input
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
              />
            </div>
          ) : (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">{labels.height}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="5"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  className="w-20 rounded border border-gray-300 px-3 py-3 text-sm"
                />
                <span className="flex items-center text-sm text-gray-500">ft</span>
                <input
                  type="number"
                  placeholder="10"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  className="w-20 rounded border border-gray-300 px-3 py-3 text-sm"
                />
                <span className="flex items-center text-sm text-gray-500">in</span>
              </div>
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {labels.weight} ({unit === "metric" ? "kg" : "lb"})
            </label>
            <input
              type="number"
              placeholder={unit === "metric" ? "70" : "154"}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          {labels.calculate}
        </button>
      </div>

      {bmi && cat && (
        <div className="mb-6 rounded-lg bg-white p-6 text-center">
          <div className="text-sm text-gray-500">{labels.yourBMI}</div>
          <div className={`text-5xl font-bold ${cat.color}`}>{bmi}</div>
          <div className={`mt-1 text-lg font-medium ${cat.color}`}>{cat.label}</div>
          <div className="mx-auto mt-4 max-w-md">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div className="flex-1 bg-blue-400" />
              <div className="flex-1 bg-green-400" />
              <div className="flex-1 bg-yellow-400" />
              <div className="flex-1 bg-red-400" />
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>16</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>
        </div>
      )}

      {/* BMI Table */}
      <div className="mb-6 rounded-lg bg-white p-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">BMI Categories</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-2">{labels.category}</th>
              <th className="pb-2">{labels.bmiRange}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2 text-blue-600">{labels.underweight}</td>
              <td>Below 18.5</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 text-green-600">{labels.normal}</td>
              <td>18.5 – 24.9</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 text-yellow-600">{labels.overweight}</td>
              <td>25.0 – 29.9</td>
            </tr>
            <tr>
              <td className="py-2 text-red-600">{labels.obese}</td>
              <td>30.0 and above</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
