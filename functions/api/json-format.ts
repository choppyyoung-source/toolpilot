export const onRequestPost: PagesFunction = async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { json, indent = 2, action = "format" } = (await context.request.json()) as { json: string; indent?: number; action?: "format" | "minify" };
    const parsed = JSON.parse(json);
    const result = action === "minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
    return new Response(JSON.stringify({ result }), { headers });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 400, headers });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
};
