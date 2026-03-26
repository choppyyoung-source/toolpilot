export const onRequestPost: PagesFunction = async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { text, action = "encode" } = (await context.request.json()) as { text: string; action?: "encode" | "decode" };
    let result: string;
    if (action === "encode") {
      result = btoa(unescape(encodeURIComponent(text)));
    } else {
      result = decodeURIComponent(escape(atob(text.trim())));
    }
    return new Response(JSON.stringify({ result }), { headers });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 400, headers });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
};
