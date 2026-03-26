interface Env {}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const body = (await context.request.json()) as { url?: string };
    let url = body.url?.trim();
    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers,
      });
    }

    if (!url.startsWith("http")) url = "https://" + url;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ToolPilot SEO Analyzer; +https://toolpilot.pages.dev)",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);

    const html = await res.text();
    const finalUrl = res.url;
    const status = res.status;
    const contentType = res.headers.get("content-type") || "";
    const isHttps = finalUrl.startsWith("https://");

    // Parse HTML
    const getTag = (tag: string) => {
      const m = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
      return m ? m[1].trim() : "";
    };

    const getMeta = (name: string) => {
      const patterns = [
        new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
        new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, "i"),
        new RegExp(`<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
        new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${name}["']`, "i"),
      ];
      for (const p of patterns) {
        const m = html.match(p);
        if (m) return m[1];
      }
      return "";
    };

    const title = getTag("title");
    const description = getMeta("description");
    const viewport = getMeta("viewport");
    const canonical =
      (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) || [])[1] || "";

    // OG tags
    const ogTitle = getMeta("og:title");
    const ogDescription = getMeta("og:description");
    const ogImage = getMeta("og:image");
    const ogType = getMeta("og:type");

    // Twitter
    const twitterCard = getMeta("twitter:card");

    // Headings
    const h1s = (html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []).length;
    const h2s = (html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || []).length;
    const h3s = (html.match(/<h3[^>]*>[\s\S]*?<\/h3>/gi) || []).length;

    // Images
    const allImages = html.match(/<img[^>]*>/gi) || [];
    const imagesWithoutAlt = allImages.filter(
      (img) => !img.match(/alt=["'][^"']+["']/i)
    ).length;

    // Links
    const allLinks = html.match(/<a[^>]+href=["'][^"']*["']/gi) || [];
    const internalLinks = allLinks.filter((l) =>
      l.match(new RegExp(`href=["'](?:/|${finalUrl.replace(/https?:\/\//, "")})`, "i"))
    ).length;
    const externalLinks = allLinks.length - internalLinks;

    // robots.txt & sitemap check
    const robotsUrl = new URL("/robots.txt", finalUrl).href;
    const sitemapUrl = new URL("/sitemap.xml", finalUrl).href;
    let hasRobots = false;
    let hasSitemap = false;

    try {
      const rRes = await fetch(robotsUrl, { signal: AbortSignal.timeout(5000) });
      hasRobots = rRes.ok && (await rRes.text()).toLowerCase().includes("user-agent");
    } catch {}
    try {
      const sRes = await fetch(sitemapUrl, { signal: AbortSignal.timeout(5000) });
      hasSitemap = sRes.ok && (await sRes.text()).toLowerCase().includes("<urlset");
    } catch {}

    // Structured data
    const jsonLdCount = (html.match(/application\/ld\+json/gi) || []).length;

    // AEO/GEO: Parse JSON-LD types
    const jsonLdBlocks = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    const schemaTypes: string[] = [];
    for (const block of jsonLdBlocks) {
      try {
        const content = block.replace(/<\/?script[^>]*>/gi, "");
        const parsed = JSON.parse(content);
        if (parsed["@type"]) schemaTypes.push(parsed["@type"]);
      } catch {}
    }

    // AEO: FAQ schema
    const hasFAQSchema = schemaTypes.includes("FAQPage");
    // AEO: HowTo schema
    const hasHowToSchema = schemaTypes.includes("HowTo");
    // GEO: WebApplication schema
    const hasWebAppSchema = schemaTypes.includes("WebApplication");
    // GEO: Article schema
    const hasArticleSchema = schemaTypes.includes("Article") || schemaTypes.includes("BlogPosting");
    // GEO: BreadcrumbList
    const hasBreadcrumbSchema = schemaTypes.includes("BreadcrumbList");
    // GEO: ItemList
    const hasItemListSchema = schemaTypes.includes("ItemList");

    // AEO: Question-based headings (for People Also Ask)
    const questionHeadings = (html.match(/<h[2-3][^>]*>[^<]*(what|how|why|when|where|which|can|does|is|are|do|should)[^<]*\??\s*<\/h[2-3]>/gi) || []).length;

    // GEO: llms.txt
    let hasLlmsTxt = false;
    try {
      const llmsUrl = new URL("/llms.txt", finalUrl).href;
      const llmsRes = await fetch(llmsUrl, { signal: AbortSignal.timeout(5000) });
      hasLlmsTxt = llmsRes.ok && (await llmsRes.text()).length > 10;
    } catch {}

    // AEO: Direct answer paragraph (first <p> after <h1> with 20-60 words)
    const firstParagraphMatch = html.match(/<h1[^>]*>[\s\S]*?<\/h1>\s*(?:<[^p][^>]*>[\s\S]*?<\/[^p][^>]*>\s*)*<p[^>]*>([\s\S]*?)<\/p>/i);
    const firstParagraph = firstParagraphMatch ? firstParagraphMatch[1].replace(/<[^>]+>/g, "").trim() : "";
    const firstParagraphWords = firstParagraph ? firstParagraph.split(/\s+/).length : 0;
    const hasDirectAnswer = firstParagraphWords >= 15 && firstParagraphWords <= 80;

    // GEO: Speakable-friendly content (short, clear sentences)
    const bodyText = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
    const hasDefinitionPattern = /(?:is a|is an|refers to|defined as|means that)/i.test(bodyText);

    // AEO: Lists (ordered/unordered) for featured snippet targeting
    const listCount = (html.match(/<(?:ul|ol)[^>]*>/gi) || []).length;

    // AEO: Table for featured snippet
    const tableCount = (html.match(/<table[^>]*>/gi) || []).length;

    // Lang attribute
    const langAttr = (html.match(/<html[^>]+lang=["']([^"']*)["']/i) || [])[1] || "";

    // Word count (rough)
    const textContent2 = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const wordCount = textContent2.split(" ").length;

    const result = {
      url: finalUrl,
      status,
      isHttps,
      title,
      titleLength: title.length,
      description,
      descriptionLength: description.length,
      viewport: !!viewport,
      canonical,
      langAttr,
      og: { title: ogTitle, description: ogDescription, image: ogImage, type: ogType },
      twitterCard,
      headings: { h1: h1s, h2: h2s, h3: h3s },
      images: { total: allImages.length, withoutAlt: imagesWithoutAlt },
      links: { internal: internalLinks, external: externalLinks, total: allLinks.length },
      hasRobots,
      hasSitemap,
      jsonLdCount,
      schemaTypes,
      wordCount,
      htmlSize: Math.round(html.length / 1024),
      // AEO fields
      hasFAQSchema,
      hasHowToSchema,
      questionHeadings,
      hasDirectAnswer,
      listCount,
      tableCount,
      // GEO fields
      hasWebAppSchema,
      hasArticleSchema,
      hasBreadcrumbSchema,
      hasItemListSchema,
      hasLlmsTxt,
      hasDefinitionPattern,
    };

    return new Response(JSON.stringify(result), { headers });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to analyze URL";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers,
    });
  }
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
