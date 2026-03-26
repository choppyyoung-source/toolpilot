"use client";

import { useState } from "react";

interface Labels {
  from?: string;
  to?: string;
}

const defaults: Labels = {
  from: "From",
  to: "To",
};

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

export default function UnitConverterWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [catIdx, setCatIdx] = useState(0);
  const [fromUnit, setFromUnit] = useState(unitCategories[0].units[0].id);
  const [toUnit, setToUnit] = useState(unitCategories[0].units[2].id);
  const [value, setValue] = useState("1");

  const cat = unitCategories[catIdx];

  function handleCatChange(idx: number) {
    setCatIdx(idx);
    setFromUnit(unitCategories[idx].units[0].id);
    setToUnit(
      unitCategories[idx].units[Math.min(2, unitCategories[idx].units.length - 1)].id
    );
    setValue("1");
  }

  function getResult(): string {
    const v = parseFloat(value);
    if (isNaN(v)) return "—";

    if (cat.name === "Temperature") {
      return convertTemp(v, fromUnit, toUnit).toFixed(4).replace(/\.?0+$/, "");
    }

    const from = cat.units.find((u) => u.id === fromUnit)!;
    const to = cat.units.find((u) => u.id === toUnit)!;
    const baseValue = v * from.toBase;
    const result = baseValue / to.toBase;
    return result.toFixed(6).replace(/\.?0+$/, "");
  }

  return (
    <div>
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
              {labels.from}
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
              {labels.to}
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
    </div>
  );
}
