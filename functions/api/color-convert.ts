function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
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

export const onRequestPost: PagesFunction = async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { color } = (await context.request.json()) as { color: string };
    const rgb = hexToRgb(color);
    if (!rgb) return new Response(JSON.stringify({ error: "Invalid HEX color. Use format: #RRGGBB" }), { status: 400, headers });
    const hsl = rgbToHsl(...rgb);
    return new Response(JSON.stringify({
      hex: rgbToHex(...rgb),
      rgb: { r: rgb[0], g: rgb[1], b: rgb[2], css: `rgb(${rgb.join(", ")})` },
      hsl: { h: hsl[0], s: hsl[1], l: hsl[2], css: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` },
    }), { headers });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 400, headers });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
};
