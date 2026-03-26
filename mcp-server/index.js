#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const BASE = "https://toolpilot.pages.dev/api";

async function apiCall(endpoint, body) {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

const server = new McpServer({
  name: "toolpilot",
  version: "1.0.0",
});

// JSON Format
server.tool(
  "json_format",
  "Format, beautify, or minify JSON data",
  {
    json: z.string().describe("The JSON string to format"),
    action: z.enum(["format", "minify"]).default("format").describe("Action: format (beautify) or minify"),
    indent: z.number().default(2).describe("Indentation spaces (2 or 4)"),
  },
  async ({ json, action, indent }) => {
    const result = await apiCall("json-format", { json, action, indent });
    return { content: [{ type: "text", text: result.error || result.result }] };
  }
);

// Base64
server.tool(
  "base64",
  "Encode or decode text using Base64",
  {
    text: z.string().describe("The text to encode or decode"),
    action: z.enum(["encode", "decode"]).default("encode").describe("Action: encode or decode"),
  },
  async ({ text, action }) => {
    const result = await apiCall("base64", { text, action });
    return { content: [{ type: "text", text: result.error || result.result }] };
  }
);

// Hash
server.tool(
  "hash",
  "Generate cryptographic hash (SHA-1, SHA-256, SHA-384, SHA-512) from text",
  {
    text: z.string().describe("The text to hash"),
    algorithm: z.enum(["SHA-1", "SHA-256", "SHA-384", "SHA-512", "all"]).default("all").describe("Hash algorithm"),
  },
  async ({ text, algorithm }) => {
    const result = await apiCall("hash", { text, algorithm });
    if (result.error) return { content: [{ type: "text", text: result.error }] };
    const lines = Object.entries(result.results).map(([algo, hash]) => `${algo}: ${hash}`).join("\n");
    return { content: [{ type: "text", text: lines }] };
  }
);

// Unit Convert
server.tool(
  "unit_convert",
  "Convert between units of measurement (length, weight, temperature, area, volume)",
  {
    value: z.number().describe("The numeric value to convert"),
    from: z.string().describe("Source unit (e.g., km, lb, c, sqm, l)"),
    to: z.string().describe("Target unit (e.g., mi, kg, f, acre, gal)"),
    category: z.enum(["length", "weight", "temperature", "area", "volume"]).describe("Unit category"),
  },
  async ({ value, from, to, category }) => {
    const result = await apiCall("unit-convert", { value, from, to, category });
    if (result.error) return { content: [{ type: "text", text: result.error }] };
    return { content: [{ type: "text", text: `${value} ${from} = ${result.result} ${to}` }] };
  }
);

// Color Convert
server.tool(
  "color_convert",
  "Convert a HEX color to RGB and HSL formats",
  {
    color: z.string().describe("HEX color code (e.g., #3b82f6)"),
  },
  async ({ color }) => {
    const result = await apiCall("color-convert", { color });
    if (result.error) return { content: [{ type: "text", text: result.error }] };
    return { content: [{ type: "text", text: `HEX: ${result.hex}\nRGB: ${result.rgb.css}\nHSL: ${result.hsl.css}` }] };
  }
);

// SEO Analyze
server.tool(
  "seo_analyze",
  "Analyze a website's SEO health with 16+ on-page checks",
  {
    url: z.string().describe("The URL to analyze (e.g., https://example.com)"),
  },
  async ({ url }) => {
    const result = await apiCall("analyze", { url });
    if (result.error) return { content: [{ type: "text", text: result.error }] };
    const lines = [
      `URL: ${result.url}`,
      `Status: ${result.status}`,
      `HTTPS: ${result.isHttps ? "Yes" : "No"}`,
      `Title: ${result.title} (${result.titleLength} chars)`,
      `Description: ${result.description ? result.description.slice(0, 100) + "..." : "Missing"}`,
      `H1: ${result.headings.h1}, H2: ${result.headings.h2}, H3: ${result.headings.h3}`,
      `Images: ${result.images.total} (${result.images.withoutAlt} without alt)`,
      `Links: ${result.links.internal} internal, ${result.links.external} external`,
      `robots.txt: ${result.hasRobots ? "Found" : "Not found"}`,
      `sitemap.xml: ${result.hasSitemap ? "Found" : "Not found"}`,
      `Structured Data: ${result.jsonLdCount} JSON-LD blocks`,
      `Word Count: ~${result.wordCount}`,
      `Page Size: ${result.htmlSize} KB`,
      `OG Title: ${result.og.title || "Missing"}`,
      `OG Image: ${result.og.image || "Missing"}`,
      `Twitter Card: ${result.twitterCard || "Missing"}`,
    ];
    return { content: [{ type: "text", text: lines.join("\n") }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
