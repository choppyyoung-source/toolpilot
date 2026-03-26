"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { howToSchema, webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

export default function CssGradientPage() {
  const [color1, setColor1] = useState("#667eea");
  const [color2, setColor2] = useState("#764ba2");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const css = type === "linear" ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : `radial-gradient(circle, ${color1}, ${color2})`;
  const fullCss = `background: ${css};`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={webApplicationSchema({ name: "CSS Gradient Generator", description: "Free CSS gradient generator. Create beautiful linear and radial gradients with live preview. Copy CSS code.", url: "https://toolpilot.pages.dev/tools/css-gradient-generator", category: "DesignApplication", keywords: ["css gradient generator", "gradient maker", "css gradient", "linear gradient", "radial gradient"] })} />
      <JsonLd data={howToSchema({ name: "How to create a CSS gradient", description: "Generate beautiful linear or radial CSS gradients with a live preview and one-click copy.", steps: [{ name: "Step 1", text: "Pick two colors" }, { name: "Step 2", text: "Adjust angle and type" }, { name: "Step 3", text: "Copy the CSS code" }] })} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Developer Tools", href: "/#developer" }, { label: "CSS Gradient Generator", href: "/tools/css-gradient-generator" }]} />

      <h1 className="mb-2 text-3xl font-bold">CSS Gradient Generator</h1>
      <p className="mb-6 text-gray-600">Create beautiful CSS gradients with a live preview. Copy the CSS code with one click.</p>

      {/* Preview */}
      <div className="mb-6 h-48 rounded-lg border shadow-inner" style={{ background: css }} />

      {/* Controls */}
      <div className="mb-6 rounded-lg bg-white p-6 space-y-4">
        <div className="flex gap-4">
          <button onClick={() => setType("linear")} className={`flex-1 rounded-lg py-2 text-sm font-medium ${type === "linear" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>Linear</button>
          <button onClick={() => setType("radial")} className={`flex-1 rounded-lg py-2 text-sm font-medium ${type === "radial" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>Radial</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Color 1</label>
            <div className="flex gap-2">
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="h-10 w-16 cursor-pointer rounded" />
              <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="flex-1 rounded border border-gray-300 px-3 py-2 font-mono text-sm" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Color 2</label>
            <div className="flex gap-2">
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="h-10 w-16 cursor-pointer rounded" />
              <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="flex-1 rounded border border-gray-300 px-3 py-2 font-mono text-sm" />
            </div>
          </div>
        </div>
        {type === "linear" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Angle: {angle}°</label>
            <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full" />
          </div>
        )}
      </div>

      {/* CSS Output */}
      <div className="relative rounded-lg bg-gray-900 p-4">
        <code className="text-sm text-green-400">{fullCss}</code>
        <button onClick={() => navigator.clipboard.writeText(fullCss)} className="absolute right-3 top-3 rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700">Copy CSS</button>
      </div>

      {/* Presets */}
      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Popular Presets</h2>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {[
            ["#667eea", "#764ba2"], ["#f093fb", "#f5576c"], ["#4facfe", "#00f2fe"], ["#43e97b", "#38f9d7"],
            ["#fa709a", "#fee140"], ["#a18cd1", "#fbc2eb"], ["#ffecd2", "#fcb69f"], ["#ff9a9e", "#fecfef"],
            ["#667db6", "#0082c8"], ["#00c6ff", "#0072ff"], ["#f857a6", "#ff5858"], ["#a8c0ff", "#3f2b96"],
          ].map(([c1, c2], i) => (
            <button key={i} onClick={() => { setColor1(c1); setColor2(c2); }} className="h-12 rounded-lg border shadow-sm transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }} />
          ))}
        </div>
      </div>

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is a CSS Gradient?</h2>
        <p>CSS gradients are smooth transitions between two or more colors. Linear gradients transition along a line at a specified angle, while radial gradients radiate from a center point. Gradients are widely used for backgrounds, buttons, and decorative elements in modern web design.</p>
      </section>

      <FAQ items={[
        { question: "What is the difference between linear and radial gradients?", answer: "Linear gradients transition colors along a straight line at a specified angle. Radial gradients transition colors outward from a center point in a circular or elliptical shape." },
        { question: "Can I use more than two colors?", answer: "CSS supports multi-stop gradients with any number of colors. This tool generates two-color gradients for simplicity. You can manually add more color stops to the CSS output." },
        { question: "Do CSS gradients work in all browsers?", answer: "Yes. CSS gradients are supported in all modern browsers including Chrome, Firefox, Safari, Edge, and mobile browsers. No vendor prefixes are needed." },
      ]} />
      <RelatedTools currentSlug="css-gradient-generator" />
    </div>
  );
}
