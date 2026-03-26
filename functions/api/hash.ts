export const onRequestPost: PagesFunction = async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { text, algorithm = "SHA-256" } = (await context.request.json()) as { text: string; algorithm?: string };
    const algos = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    const results: Record<string, string> = {};

    if (algorithm === "all") {
      for (const algo of algos) {
        const data = new TextEncoder().encode(text);
        const buf = await crypto.subtle.digest(algo, data);
        results[algo] = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
      }
    } else {
      if (!algos.includes(algorithm)) {
        return new Response(JSON.stringify({ error: `Invalid algorithm. Use: ${algos.join(", ")}` }), { status: 400, headers });
      }
      const data = new TextEncoder().encode(text);
      const buf = await crypto.subtle.digest(algorithm, data);
      results[algorithm] = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    return new Response(JSON.stringify({ results }), { headers });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 400, headers });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
};
