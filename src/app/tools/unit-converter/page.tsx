"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";

type UnitCategory = {
  name: string;
  units: { id: string; label: string; toBase: number }[];
};

const unitCategories: UnitCategory[] = [
  {
    name: "Length",
    units: [
      { id: "mm", label: "Millimeter (mm)", toBase: 0.001 },
      { id: "cm", label: "Centimeter (cm)", toBase: 0.01 },
      { id: "m", label: "Meter (m)", toBase: 1 },
      { id: "km", label: "Kilometer (km)", toBase: 1000 },
      { id: "in", label: "Inch (in)", toBase: 0.0254 },
      { id: "ft", label: "Foot (ft)", toBase: 0.3048 },
      { id: "yd", label: "Yard (yd)", toBase: 0.9144 },
      { id: "mi", label: "Mile (mi)", toBase: 1609.344 },
    ],
  },
  {
    name: "Weight",
    units: [
      { id: "mg", label: "Milligram (mg)", toBase: 0.000001 },
      { id: "g", label: "Gram (g)", toBase: 0.001 },
      { id: "kg", label: "Kilogram (kg)", toBase: 1 },
      { id: "t", label: "Metric Ton (t)", toBase: 1000 },
      { id: "oz", label: "Ounce (oz)", toBase: 0.0283495 },
      { id: "lb", label: "Pound (lb)", toBase: 0.453592 },
    ],
  },
  {
    name: "Temperature",
    units: [
      { id: "c", label: "Celsius (°C)", toBase: 1 },
      { id: "f", label: "Fahrenheit (°F)", toBase: 1 },
      { id: "k", label: "Kelvin (K)", toBase: 1 },
    ],
  },
  {
    name: "Area",
    units: [
      { id: "sqm", label: "Square Meter (m²)", toBase: 1 },
      { id: "sqkm", label: "Square Km (km²)", toBase: 1e6 },
      { id: "sqft", label: "Square Foot (ft²)", toBase: 0.092903 },
      { id: "acre", label: "Acre", toBase: 4046.86 },
      { id: "ha", label: "Hectare (ha)", toBase: 10000 },
    ],
  },
  {
    name: "Volume",
    units: [
      { id: "ml", label: "Milliliter (ml)", toBase: 0.001 },
      { id: "l", label: "Liter (L)", toBase: 1 },
      { id: "gal", label: "US Gallon", toBase: 3.78541 },
      { id: "qt", label: "US Quart", toBase: 0.946353 },
      { id: "cup", label: "US Cup", toBase: 0.236588 },
      { id: "floz", label: "US Fluid Oz", toBase: 0.0295735 },
    ],
  },
];

function convertTemp(value: number, from: string, to: string): number {
  let celsius: number;
  if (from === "c") celsius = value;
  else if (from === "f") celsius = (value - 32) * (5 / 9);
  else celsius = value - 273.15;

  if (to === "c") return celsius;
  if (to === "f") return celsius * (9 / 5) + 32;
  return celsius + 273.15;
}

const faqs = [
  {
    question: "How do I convert miles to kilometers?",
    answer:
      "Select the Length category, choose Mile as the 'From' unit and Kilometer as the 'To' unit, then enter the value. 1 mile equals approximately 1.60934 kilometers.",
  },
  {
    question: "How do I convert Fahrenheit to Celsius?",
    answer:
      "Select the Temperature category, choose Fahrenheit as the 'From' unit and Celsius as the 'To' unit. The formula is: °C = (°F - 32) × 5/9. For example, 72°F equals approximately 22.2°C.",
  },
  {
    question: "How do I convert pounds to kilograms?",
    answer:
      "Select the Weight category, choose Pound as the 'From' unit and Kilogram as the 'To' unit. 1 pound equals approximately 0.4536 kilograms.",
  },
  {
    question: "What unit categories are supported?",
    answer:
      "This tool supports 5 categories: Length (mm, cm, m, km, in, ft, yd, mi), Weight (mg, g, kg, ton, oz, lb), Temperature (°C, °F, K), Area (m², km², ft², acre, ha), and Volume (ml, L, gallon, quart, cup, fl oz).",
  },
  {
    question: "How accurate are the conversions?",
    answer:
      "All conversions use standard conversion factors and are accurate to at least 6 decimal places. Results are displayed with trailing zeros removed for readability.",
  },
];

export default function UnitConverterPage() {
  const [catIdx, setCatIdx] = useState(0);
  const [fromUnit, setFromUnit] = useState(unitCategories[0].units[0].id);
  const [toUnit, setToUnit] = useState(unitCategories[0].units[2].id);
  const [value, setValue] = useState("1");

  const cat = unitCategories[catIdx];

  function handleCatChange(idx: number) {
    setCatIdx(idx);
    setFromUnit(unitCategories[idx].units[0].id);
    setToUnit(
      unitCategories[idx].units[
        Math.min(2, unitCategories[idx].units.length - 1)
      ].id
    );
    setValue("1");
  }

  function getResult(): string {
    const v = parseFloat(value);
    if (isNaN(v)) return "—";

    if (cat.name === "Temperature") {
      return convertTemp(v, fromUnit, toUnit)
        .toFixed(4)
        .replace(/\.?0+$/, "");
    }

    const from = cat.units.find((u) => u.id === fromUnit)!;
    const to = cat.units.find((u) => u.id === toUnit)!;
    const baseValue = v * from.toBase;
    const result = baseValue / to.toBase;
    return result.toFixed(6).replace(/\.?0+$/, "");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "Unit Converter",
          description:
            "Free online unit converter. Convert between units of length, weight, temperature, area, and volume.",
          url: "https://toolbox-web-self.vercel.app/tools/unit-converter",
          category: "UtilityApplication",
          keywords: [
            "unit converter",
            "length converter",
            "weight converter",
            "temperature converter",
          ],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: "How to Convert Units Online",
          description:
            "Use ToolPilot's free unit converter to convert between metric and imperial units of length, weight, temperature, area, and volume.",
          steps: [
            {
              name: "Select a category",
              text: "Choose a measurement category: Length, Weight, Temperature, Area, or Volume.",
            },
            {
              name: "Choose units",
              text: "Select the 'From' unit and 'To' unit from the dropdown menus.",
            },
            {
              name: "Enter a value",
              text: "Type the value you want to convert. The result updates instantly as you type.",
            },
          ],
        })}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Converters", href: "/#converter" },
          { label: "Unit Converter", href: "/tools/unit-converter" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">Unit Converter</h1>
      <p className="mb-6 text-gray-600">
        Convert between metric and imperial units of length, weight,
        temperature, area, and volume. Results update instantly as you type.
      </p>

      <AdBanner slot="tool-top" format="horizontal" />

      <div className="mb-6 flex flex-wrap gap-2">
        {unitCategories.map((c, i) => (
          <button
            key={c.name}
            onClick={() => handleCatChange(i)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              i === catIdx
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="rounded-lg bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              {cat.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-lg font-semibold"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm"
            >
              {cat.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
            <div className="flex h-[42px] items-center rounded border border-gray-200 bg-gray-50 px-3 text-lg font-semibold text-blue-600">
              {getResult()}
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="tool-mid" format="rectangle" />

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          Quick Reference: Common Conversions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-1 font-semibold text-gray-900">Length</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>1 inch = 2.54 centimeters</li>
              <li>1 foot = 30.48 centimeters</li>
              <li>1 mile = 1.60934 kilometers</li>
              <li>1 meter = 3.28084 feet</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-semibold text-gray-900">Weight</h3>
            <ul className="list-inside list-disc space-y-1">
              <li>1 pound = 0.4536 kilograms</li>
              <li>1 ounce = 28.3495 grams</li>
              <li>1 kilogram = 2.20462 pounds</li>
            </ul>
          </div>
        </div>
      </section>

      <FAQ items={faqs} />

      <AdBanner slot="tool-bottom" format="horizontal" />
    </div>
  );
}
