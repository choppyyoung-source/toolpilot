"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex
    .replace("#", "")
    .match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")
  );
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
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

const faqs = [
  {
    question: "How do I convert HEX to RGB?",
    answer:
      "Enter your HEX color code (e.g., #3b82f6) in the HEX input field. The RGB values are automatically calculated and displayed. Each pair of hex digits represents a color channel: RR, GG, BB, where each ranges from 00 to FF (0 to 255 in decimal).",
  },
  {
    question: "What is the difference between HEX, RGB, and HSL?",
    answer:
      "HEX uses hexadecimal notation (#RRGGBB) and is the most common format in web development. RGB defines colors by Red, Green, and Blue channel values (0-255). HSL defines colors by Hue (0-360°), Saturation (0-100%), and Lightness (0-100%), which is more intuitive for color adjustments.",
  },
  {
    question: "Which color format should I use in CSS?",
    answer:
      "All three formats are valid in CSS. HEX (#3b82f6) is the most widely used. RGB (rgb(59, 130, 246)) is useful when you need to add alpha transparency (rgba). HSL (hsl(217, 91%, 60%)) is best when you want to adjust lightness or saturation programmatically.",
  },
  {
    question: "Can I use the color picker to select a color?",
    answer:
      "Yes. Click on the color picker bar below the preview area to open your operating system's native color picker. Select any color and all formats (HEX, RGB, HSL) will update automatically.",
  },
  {
    question: "Does this tool support transparency/alpha?",
    answer:
      "The current version supports opaque colors in HEX, RGB, and HSL. Alpha channel support (RGBA, HSLA, HEX8) is planned for a future update.",
  },
];

export default function ColorConverterPage() {
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
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "Color Converter",
          description:
            "Free online color converter. Convert colors between HEX, RGB, and HSL with a live color picker and preview.",
          url: "https://toolbox-web-self.vercel.app/tools/color-converter",
          category: "DesignApplication",
          keywords: [
            "color converter",
            "hex to rgb",
            "rgb to hex",
            "hsl converter",
          ],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: "How to Convert Colors Between HEX, RGB, and HSL",
          description:
            "Use ToolPilot's free color converter to convert between HEX, RGB, and HSL color formats instantly.",
          steps: [
            {
              name: "Enter a color",
              text: "Type a HEX code, enter RGB values, or use the color picker to choose a color.",
            },
            {
              name: "View all formats",
              text: "All color formats (HEX, RGB, HSL) are calculated and displayed automatically.",
            },
            {
              name: "Copy the format you need",
              text: "Click the Copy button next to any format to copy it to your clipboard for use in your code or design tool.",
            },
          ],
        })}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/#developer" },
          { label: "Color Converter", href: "/tools/color-converter" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">Color Converter</h1>
      <p className="mb-6 text-gray-600">
        Convert colors between HEX, RGB, and HSL formats with a live preview
        and color picker. Copy any format with one click.
      </p>

      <AdBanner slot="tool-top" format="horizontal" />

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
            <label className="mb-1 block text-sm font-medium text-gray-700">
              HEX
            </label>
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
                Copy
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              RGB
            </label>
            <div className="flex gap-2">
              {["R", "G", "B"].map((label, i) => (
                <div key={label} className="flex-1">
                  <span className="text-xs text-gray-500">{label}</span>
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
                Copy
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              HSL
            </label>
            <div className="flex items-center gap-2">
              <span className="flex-1 rounded border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm">
                {hsl ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` : "—"}
              </span>
              <button
                onClick={() =>
                  hsl &&
                  copyText(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`)
                }
                className="rounded bg-blue-600 px-3 py-2 text-xs text-white hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <AdBanner slot="tool-mid" format="rectangle" />

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          Understanding Color Formats
        </h2>
        <p className="mb-3">
          Colors on the web can be expressed in multiple formats. Each has
          advantages depending on the context.
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>HEX (#RRGGBB)</strong> — Compact hexadecimal format, most
            common in CSS
          </li>
          <li>
            <strong>RGB (r, g, b)</strong> — Red, Green, Blue channels from 0 to
            255; supports alpha (RGBA)
          </li>
          <li>
            <strong>HSL (h, s%, l%)</strong> — Hue, Saturation, Lightness;
            intuitive for color adjustments
          </li>
        </ul>
      </section>

      <FAQ items={faqs} />

      <AdBanner slot="tool-bottom" format="horizontal" />
    </div>
  );
}
