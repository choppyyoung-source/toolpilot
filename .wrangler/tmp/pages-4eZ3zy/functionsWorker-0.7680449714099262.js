var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/analyze.ts
var onRequestPost = /* @__PURE__ */ __name(async (context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  try {
    const body = await context.request.json();
    let url = body.url?.trim();
    if (!url) {
      return new Response(JSON.stringify({ error: "URL is required" }), {
        status: 400,
        headers
      });
    }
    if (!url.startsWith("http")) url = "https://" + url;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1e4);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ToolPilot SEO Analyzer; +https://toolpilot.pages.dev)"
      },
      redirect: "follow"
    });
    clearTimeout(timeout);
    const html = await res.text();
    const finalUrl = res.url;
    const status = res.status;
    const contentType = res.headers.get("content-type") || "";
    const isHttps = finalUrl.startsWith("https://");
    const getTag = /* @__PURE__ */ __name((tag) => {
      const m = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
      return m ? m[1].trim() : "";
    }, "getTag");
    const getMeta = /* @__PURE__ */ __name((name) => {
      const patterns = [
        new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
        new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, "i"),
        new RegExp(`<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
        new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${name}["']`, "i")
      ];
      for (const p of patterns) {
        const m = html.match(p);
        if (m) return m[1];
      }
      return "";
    }, "getMeta");
    const title = getTag("title");
    const description = getMeta("description");
    const viewport = getMeta("viewport");
    const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) || [])[1] || "";
    const ogTitle = getMeta("og:title");
    const ogDescription = getMeta("og:description");
    const ogImage = getMeta("og:image");
    const ogType = getMeta("og:type");
    const twitterCard = getMeta("twitter:card");
    const h1s = (html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []).length;
    const h2s = (html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || []).length;
    const h3s = (html.match(/<h3[^>]*>[\s\S]*?<\/h3>/gi) || []).length;
    const allImages = html.match(/<img[^>]*>/gi) || [];
    const imagesWithoutAlt = allImages.filter(
      (img) => !img.match(/alt=["'][^"']+["']/i)
    ).length;
    const allLinks = html.match(/<a[^>]+href=["'][^"']*["']/gi) || [];
    const internalLinks = allLinks.filter(
      (l) => l.match(new RegExp(`href=["'](?:/|${finalUrl.replace(/https?:\/\//, "")})`, "i"))
    ).length;
    const externalLinks = allLinks.length - internalLinks;
    const robotsUrl = new URL("/robots.txt", finalUrl).href;
    const sitemapUrl = new URL("/sitemap.xml", finalUrl).href;
    let hasRobots = false;
    let hasSitemap = false;
    try {
      const rRes = await fetch(robotsUrl, { signal: AbortSignal.timeout(5e3) });
      hasRobots = rRes.ok && (await rRes.text()).toLowerCase().includes("user-agent");
    } catch {
    }
    try {
      const sRes = await fetch(sitemapUrl, { signal: AbortSignal.timeout(5e3) });
      hasSitemap = sRes.ok && (await sRes.text()).toLowerCase().includes("<urlset");
    } catch {
    }
    const jsonLdCount = (html.match(/application\/ld\+json/gi) || []).length;
    const jsonLdBlocks = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    const schemaTypes = [];
    for (const block of jsonLdBlocks) {
      try {
        const content = block.replace(/<\/?script[^>]*>/gi, "");
        const parsed = JSON.parse(content);
        if (parsed["@type"]) schemaTypes.push(parsed["@type"]);
      } catch {
      }
    }
    const hasFAQSchema = schemaTypes.includes("FAQPage");
    const hasHowToSchema = schemaTypes.includes("HowTo");
    const hasWebAppSchema = schemaTypes.includes("WebApplication");
    const hasArticleSchema = schemaTypes.includes("Article") || schemaTypes.includes("BlogPosting");
    const hasBreadcrumbSchema = schemaTypes.includes("BreadcrumbList");
    const hasItemListSchema = schemaTypes.includes("ItemList");
    const questionHeadings = (html.match(/<h[2-3][^>]*>[^<]*(what|how|why|when|where|which|can|does|is|are|do|should)[^<]*\??\s*<\/h[2-3]>/gi) || []).length;
    let hasLlmsTxt = false;
    try {
      const llmsUrl = new URL("/llms.txt", finalUrl).href;
      const llmsRes = await fetch(llmsUrl, { signal: AbortSignal.timeout(5e3) });
      hasLlmsTxt = llmsRes.ok && (await llmsRes.text()).length > 10;
    } catch {
    }
    const firstParagraphMatch = html.match(/<h1[^>]*>[\s\S]*?<\/h1>\s*(?:<[^p][^>]*>[\s\S]*?<\/[^p][^>]*>\s*)*<p[^>]*>([\s\S]*?)<\/p>/i);
    const firstParagraph = firstParagraphMatch ? firstParagraphMatch[1].replace(/<[^>]+>/g, "").trim() : "";
    const firstParagraphWords = firstParagraph ? firstParagraph.split(/\s+/).length : 0;
    const hasDirectAnswer = firstParagraphWords >= 15 && firstParagraphWords <= 80;
    const bodyText = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
    const hasDefinitionPattern = /(?:is a|is an|refers to|defined as|means that)/i.test(bodyText);
    const listCount = (html.match(/<(?:ul|ol)[^>]*>/gi) || []).length;
    const tableCount = (html.match(/<table[^>]*>/gi) || []).length;
    const langAttr = (html.match(/<html[^>]+lang=["']([^"']*)["']/i) || [])[1] || "";
    const textContent2 = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
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
      hasDefinitionPattern
    };
    return new Response(JSON.stringify(result), { headers });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to analyze URL";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers
    });
  }
}, "onRequestPost");
var onRequestOptions = /* @__PURE__ */ __name(async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}, "onRequestOptions");

// api/base64.ts
var onRequestPost2 = /* @__PURE__ */ __name(async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { text, action = "encode" } = await context.request.json();
    let result;
    if (action === "encode") {
      result = btoa(unescape(encodeURIComponent(text)));
    } else {
      result = decodeURIComponent(escape(atob(text.trim())));
    }
    return new Response(JSON.stringify({ result }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400, headers });
  }
}, "onRequestPost");
var onRequestOptions2 = /* @__PURE__ */ __name(async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
}, "onRequestOptions");

// api/color-convert.ts
function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}
__name(hexToRgb, "hexToRgb");
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}
__name(rgbToHex, "rgbToHex");
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
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
__name(rgbToHsl, "rgbToHsl");
var onRequestPost3 = /* @__PURE__ */ __name(async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { color } = await context.request.json();
    const rgb = hexToRgb(color);
    if (!rgb) return new Response(JSON.stringify({ error: "Invalid HEX color. Use format: #RRGGBB" }), { status: 400, headers });
    const hsl = rgbToHsl(...rgb);
    return new Response(JSON.stringify({
      hex: rgbToHex(...rgb),
      rgb: { r: rgb[0], g: rgb[1], b: rgb[2], css: `rgb(${rgb.join(", ")})` },
      hsl: { h: hsl[0], s: hsl[1], l: hsl[2], css: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` }
    }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400, headers });
  }
}, "onRequestPost");
var onRequestOptions3 = /* @__PURE__ */ __name(async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
}, "onRequestOptions");

// api/hash.ts
var onRequestPost4 = /* @__PURE__ */ __name(async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { text, algorithm = "SHA-256" } = await context.request.json();
    const algos = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    const results = {};
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
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400, headers });
  }
}, "onRequestPost");
var onRequestOptions4 = /* @__PURE__ */ __name(async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
}, "onRequestOptions");

// api/json-format.ts
var onRequestPost5 = /* @__PURE__ */ __name(async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { json, indent = 2, action = "format" } = await context.request.json();
    const parsed = JSON.parse(json);
    const result = action === "minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
    return new Response(JSON.stringify({ result }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400, headers });
  }
}, "onRequestPost");
var onRequestOptions5 = /* @__PURE__ */ __name(async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
}, "onRequestOptions");

// api/unit-convert.ts
var units = {
  length: { mm: 1e-3, cm: 0.01, m: 1, km: 1e3, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 },
  weight: { mg: 1e-6, g: 1e-3, kg: 1, t: 1e3, oz: 0.0283495, lb: 0.453592 },
  area: { sqm: 1, sqkm: 1e6, sqft: 0.092903, acre: 4046.86, ha: 1e4 },
  volume: { ml: 1e-3, l: 1, gal: 3.78541, qt: 0.946353, cup: 0.236588, floz: 0.0295735 }
};
var onRequestPost6 = /* @__PURE__ */ __name(async (context) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { value, from, to, category = "length" } = await context.request.json();
    if (category === "temperature") {
      let celsius;
      if (from === "c") celsius = value;
      else if (from === "f") celsius = (value - 32) * (5 / 9);
      else if (from === "k") celsius = value - 273.15;
      else return new Response(JSON.stringify({ error: "Invalid temperature unit. Use: c, f, k" }), { status: 400, headers });
      let result2;
      if (to === "c") result2 = celsius;
      else if (to === "f") result2 = celsius * (9 / 5) + 32;
      else if (to === "k") result2 = celsius + 273.15;
      else return new Response(JSON.stringify({ error: "Invalid temperature unit. Use: c, f, k" }), { status: 400, headers });
      return new Response(JSON.stringify({ result: result2, from, to, value }), { headers });
    }
    const cat = units[category];
    if (!cat) return new Response(JSON.stringify({ error: `Invalid category. Use: ${Object.keys(units).join(", ")}, temperature` }), { status: 400, headers });
    if (!cat[from] || !cat[to]) return new Response(JSON.stringify({ error: `Invalid unit. Available: ${Object.keys(cat).join(", ")}` }), { status: 400, headers });
    const result = value * cat[from] / cat[to];
    return new Response(JSON.stringify({ result, from, to, value }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400, headers });
  }
}, "onRequestPost");
var onRequestOptions6 = /* @__PURE__ */ __name(async () => {
  return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
}, "onRequestOptions");

// ../.wrangler/tmp/pages-4eZ3zy/functionsRoutes-0.6560757887997343.mjs
var routes = [
  {
    routePath: "/api/analyze",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/analyze",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/base64",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions2]
  },
  {
    routePath: "/api/base64",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/color-convert",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions3]
  },
  {
    routePath: "/api/color-convert",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/hash",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions4]
  },
  {
    routePath: "/api/hash",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/json-format",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions5]
  },
  {
    routePath: "/api/json-format",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  },
  {
    routePath: "/api/unit-convert",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions6]
  },
  {
    routePath: "/api/unit-convert",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost6]
  }
];

// ../../../../opt/homebrew/lib/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../opt/homebrew/lib/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
