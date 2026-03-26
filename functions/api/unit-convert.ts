const units: Record<string, Record<string, number>> = {
  length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  weight: { mg: 0.000001, g: 0.001, kg: 1, t: 1000, oz: 0.0283495, lb: 0.453592 },
  area: { sqm: 1, sqkm: 1e6, sqft: 0.092903, acre: 4046.86, ha: 10000 },
  volume: { ml: 0.001, l: 1, gal: 3.78541, qt: 0.946353, cup: 0.236588, floz: 0.0295735 },
};

export const onRequestPost: PagesFunction = async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { value, from, to, category = "length" } = (await context.request.json()) as { value: number; from: string; to: string; category?: string };

    if (category === "temperature") {
      let celsius: number;
      if (from === "c") celsius = value;
      else if (from === "f") celsius = (value - 32) * (5 / 9);
      else if (from === "k") celsius = value - 273.15;
      else return new Response(JSON.stringify({ error: "Invalid temperature unit. Use: c, f, k" }), { status: 400, headers });

      let result: number;
      if (to === "c") result = celsius;
      else if (to === "f") result = celsius * (9 / 5) + 32;
      else if (to === "k") result = celsius + 273.15;
      else return new Response(JSON.stringify({ error: "Invalid temperature unit. Use: c, f, k" }), { status: 400, headers });

      return new Response(JSON.stringify({ result, from, to, value }), { headers });
    }

    const cat = units[category];
    if (!cat) return new Response(JSON.stringify({ error: `Invalid category. Use: ${Object.keys(units).join(", ")}, temperature` }), { status: 400, headers });
    if (!cat[from] || !cat[to]) return new Response(JSON.stringify({ error: `Invalid unit. Available: ${Object.keys(cat).join(", ")}` }), { status: 400, headers });

    const result = (value * cat[from]) / cat[to];
    return new Response(JSON.stringify({ result, from, to, value }), { headers });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 400, headers });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
};
