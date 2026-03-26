"use client";

import { useState } from "react";

interface Labels {
  copy?: string;
}

const defaults: Labels = {
  copy: "Copy",
};

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex
    .replace("#", "")
    .match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export default function ColorConverterWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [hex, setHex] = useState("#3b82f6");
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(...rgb) : null;

  function handleColorPicker(e: React.ChangeEvent<HTMLInputElement>) {
    setHex(e.target.value);
  }

  function handleHexInput(e: React.ChangeEvent<HTMLInputElement>) {
    setHex(e.target.value);
  }

  function handleRgbInput(idx: number, val: string) {
    if (!rgb) return;
    const newRgb: [number, number, number] = [...rgb];
    newRgb[idx] = Math.max(0, Math.min(255, parseInt(val) || 0));
    setHex(rgbToHex(...newRgb));
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg bg-white p-6">
        <div
          className="mb-4 h-32 rounded-lg border"
          style={{ backgroundColor: hex }}
        />
        <input
          type="color"
          value={rgb ? hex : "#000000"}
          onChange={handleColorPicker}
          className="h-10 w-full cursor-pointer rounded"
        />
      </div>
      <div className="space-y-4 rounded-lg bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">HEX</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={hex}
              onChange={handleHexInput}
              className="flex-1 rounded border border-gray-300 px-3 py-2 font-mono text-sm"
              placeholder="#3b82f6"
            />
            <button
              onClick={() => copyText(hex)}
              className="rounded bg-blue-600 px-3 text-xs text-white hover:bg-blue-700"
            >
              {labels.copy}
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">RGB</label>
          <div className="flex gap-2">
            {["R", "G", "B"].map((channel, i) => (
              <div key={channel} className="flex-1">
                <span className="text-xs text-gray-500">{channel}</span>
                <input
                  type="number"
                  min={0}
                  max={255}
                  value={rgb ? rgb[i] : 0}
                  onChange={(e) => handleRgbInput(i, e.target.value)}
                  className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
            ))}
            <button
              onClick={() => rgb && copyText(`rgb(${rgb.join(", ")})`)}
              className="self-end rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
            >
              {labels.copy}
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">HSL</label>
          <div className="flex items-center gap-2">
            <span className="flex-1 rounded border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm">
              {hsl ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` : "—"}
            </span>
            <button
              onClick={() => hsl && copyText(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`)}
              className="rounded bg-blue-600 px-3 py-2 text-xs text-white hover:bg-blue-700"
            >
              {labels.copy}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
