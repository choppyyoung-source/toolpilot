"use client";

import { useState } from "react";

interface Labels {
  linear?: string;
  radial?: string;
  color1?: string;
  color2?: string;
  angle?: string;
  copyCSS?: string;
  presets?: string;
}

const defaults: Labels = {
  linear: "Linear",
  radial: "Radial",
  color1: "Color 1",
  color2: "Color 2",
  angle: "Angle",
  copyCSS: "Copy CSS",
  presets: "Popular Presets",
};

const presetPairs: [string, string][] = [
  ["#667eea", "#764ba2"],
  ["#f093fb", "#f5576c"],
  ["#4facfe", "#00f2fe"],
  ["#43e97b", "#38f9d7"],
  ["#fa709a", "#fee140"],
  ["#a18cd1", "#fbc2eb"],
  ["#ffecd2", "#fcb69f"],
  ["#ff9a9e", "#fecfef"],
  ["#667db6", "#0082c8"],
  ["#00c6ff", "#0072ff"],
  ["#f857a6", "#ff5858"],
  ["#a8c0ff", "#3f2b96"],
];

export default function CssGradientWidget({ labels: l = {} }: { labels?: Partial<Labels> }) {
  const labels = { ...defaults, ...l };
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const css =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;
  const fullCss = `background: ${css};`;

  return (
    <div>
      {/* Preview */}
      <div className="mb-6 h-48 rounded-lg border shadow-inner" style={{ background: css }} />

      {/* Controls */}
      <div className="mb-6 rounded-lg bg-white p-6 space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setType("linear")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium ${type === "linear" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {labels.linear}
          </button>
          <button
            onClick={() => setType("radial")}
            className={`flex-1 rounded-lg py-2 text-sm font-medium ${type === "radial" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
          >
            {labels.radial}
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{labels.color1}</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 rounded border border-gray-300 px-3 py-2 font-mono text-sm"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">{labels.color2}</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 rounded border border-gray-300 px-3 py-2 font-mono text-sm"
              />
            </div>
          </div>
        </div>
        {type === "linear" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {labels.angle}: {angle}°
            </label>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(+e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* CSS Output */}
      <div className="relative rounded-lg bg-gray-900 p-4">
        <code className="text-sm text-green-400">{fullCss}</code>
        <button
          onClick={() => navigator.clipboard.writeText(fullCss)}
          className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
        >
          {labels.copyCSS}
        </button>
      </div>

      {/* Presets */}
      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">{labels.presets}</h2>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {presetPairs.map(([c1, c2], i) => (
            <button
              key={i}
              onClick={() => {
                setColor1(c1);
                setColor2(c2);
              }}
              className="h-12 rounded-lg border shadow-sm transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
