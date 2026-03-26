"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { webApplicationSchema } from "@/components/JsonLd";
import RelatedTools from "@/components/RelatedTools";

interface AnalysisResult {
  url: string;
  status: number;
  isHttps: boolean;
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  viewport: boolean;
  canonical: string;
  langAttr: string;
  og: { title: string; description: string; image: string; type: string };
  twitterCard: string;
  headings: { h1: number; h2: number; h3: number };
  images: { total: number; withoutAlt: number };
  links: { internal: number; external: number; total: number };
  hasRobots: boolean;
  hasSitemap: boolean;
  jsonLdCount: number;
  schemaTypes: string[];
  wordCount: number;
  htmlSize: number;
  // AEO
  hasFAQSchema: boolean;
  hasHowToSchema: boolean;
  questionHeadings: number;
  hasDirectAnswer: boolean;
  listCount: number;
  tableCount: number;
  // GEO
  hasWebAppSchema: boolean;
  hasArticleSchema: boolean;
  hasBreadcrumbSchema: boolean;
  hasItemListSchema: boolean;
  hasLlmsTxt: boolean;
  hasDefinitionPattern: boolean;
}

interface CheckItem {
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
  category: string;
}

function analyzeChecks(r: AnalysisResult): CheckItem[] {
  const checks: CheckItem[] = [];

  // Title
  if (!r.title) checks.push({ label: "Page Title", status: "fail", detail: "Missing! Add a <title> tag.", category: "Meta" });
  else if (r.titleLength < 30) checks.push({ label: "Page Title", status: "warn", detail: `Too short (${r.titleLength} chars). Aim for 50-60 characters.`, category: "Meta" });
  else if (r.titleLength > 60) checks.push({ label: "Page Title", status: "warn", detail: `Too long (${r.titleLength} chars). May be truncated in search results.`, category: "Meta" });
  else checks.push({ label: "Page Title", status: "pass", detail: `Good length (${r.titleLength} chars): "${r.title.slice(0, 50)}${r.title.length > 50 ? '...' : ''}"`, category: "Meta" });

  // Description
  if (!r.description) checks.push({ label: "Meta Description", status: "fail", detail: "Missing! Add a meta description.", category: "Meta" });
  else if (r.descriptionLength < 70) checks.push({ label: "Meta Description", status: "warn", detail: `Too short (${r.descriptionLength} chars). Aim for 150-160 characters.`, category: "Meta" });
  else if (r.descriptionLength > 160) checks.push({ label: "Meta Description", status: "warn", detail: `Too long (${r.descriptionLength} chars). May be truncated.`, category: "Meta" });
  else checks.push({ label: "Meta Description", status: "pass", detail: `Good length (${r.descriptionLength} chars).`, category: "Meta" });

  // HTTPS
  checks.push({ label: "HTTPS", status: r.isHttps ? "pass" : "fail", detail: r.isHttps ? "Site uses HTTPS." : "Not using HTTPS! Migrate to HTTPS for security and SEO.", category: "Security" });

  // Viewport
  checks.push({ label: "Viewport Meta", status: r.viewport ? "pass" : "fail", detail: r.viewport ? "Mobile viewport is set." : "Missing viewport meta tag. Site may not be mobile-friendly.", category: "Mobile" });

  // Lang
  checks.push({ label: "Language Attribute", status: r.langAttr ? "pass" : "warn", detail: r.langAttr ? `Language set to "${r.langAttr}".` : "No lang attribute on <html>. Helps search engines understand content language.", category: "Meta" });

  // Canonical
  checks.push({ label: "Canonical URL", status: r.canonical ? "pass" : "warn", detail: r.canonical ? `Canonical: ${r.canonical.slice(0, 60)}` : "No canonical URL. May cause duplicate content issues.", category: "Meta" });

  // H1
  if (r.headings.h1 === 0) checks.push({ label: "H1 Heading", status: "fail", detail: "No H1 tag found. Every page should have exactly one H1.", category: "Content" });
  else if (r.headings.h1 > 1) checks.push({ label: "H1 Heading", status: "warn", detail: `${r.headings.h1} H1 tags found. Use only one H1 per page.`, category: "Content" });
  else checks.push({ label: "H1 Heading", status: "pass", detail: "One H1 tag found.", category: "Content" });

  // Heading structure
  checks.push({ label: "Heading Structure", status: r.headings.h2 > 0 ? "pass" : "warn", detail: `H1: ${r.headings.h1}, H2: ${r.headings.h2}, H3: ${r.headings.h3}`, category: "Content" });

  // Images alt
  if (r.images.total === 0) checks.push({ label: "Image Alt Text", status: "pass", detail: "No images found.", category: "Content" });
  else if (r.images.withoutAlt === 0) checks.push({ label: "Image Alt Text", status: "pass", detail: `All ${r.images.total} images have alt text.`, category: "Content" });
  else checks.push({ label: "Image Alt Text", status: "warn", detail: `${r.images.withoutAlt} of ${r.images.total} images missing alt text.`, category: "Content" });

  // Open Graph
  const ogCount = [r.og.title, r.og.description, r.og.image].filter(Boolean).length;
  checks.push({ label: "Open Graph Tags", status: ogCount === 3 ? "pass" : ogCount > 0 ? "warn" : "fail", detail: ogCount === 3 ? "Title, description, and image are set." : `${ogCount}/3 OG tags found. Add og:title, og:description, og:image.`, category: "Social" });

  // Twitter Card
  checks.push({ label: "Twitter Card", status: r.twitterCard ? "pass" : "warn", detail: r.twitterCard ? `Card type: ${r.twitterCard}` : "No Twitter Card meta tag.", category: "Social" });

  // robots.txt
  checks.push({ label: "robots.txt", status: r.hasRobots ? "pass" : "warn", detail: r.hasRobots ? "robots.txt found." : "No robots.txt found.", category: "Technical" });

  // Sitemap
  checks.push({ label: "XML Sitemap", status: r.hasSitemap ? "pass" : "warn", detail: r.hasSitemap ? "sitemap.xml found." : "No sitemap.xml found at /sitemap.xml.", category: "Technical" });

  // Structured Data
  checks.push({ label: "Structured Data", status: r.jsonLdCount > 0 ? "pass" : "warn", detail: r.jsonLdCount > 0 ? `${r.jsonLdCount} JSON-LD block(s) found.` : "No structured data (JSON-LD) found.", category: "Technical" });

  // Word count
  if (r.wordCount < 300) checks.push({ label: "Content Length", status: "warn", detail: `Only ~${r.wordCount} words. Aim for 300+ words for better SEO.`, category: "Content" });
  else checks.push({ label: "Content Length", status: "pass", detail: `~${r.wordCount} words.`, category: "Content" });

  // Page size
  checks.push({ label: "Page Size", status: r.htmlSize < 200 ? "pass" : "warn", detail: `${r.htmlSize} KB HTML size.${r.htmlSize > 200 ? " Consider optimizing." : ""}`, category: "Performance" });

  // ── AEO (Answer Engine Optimization) ──

  // FAQ Schema
  checks.push({ label: "FAQ Schema (FAQPage)", status: r.hasFAQSchema ? "pass" : "warn", detail: r.hasFAQSchema ? "FAQPage schema detected. Eligible for Google FAQ rich results and AI answer extraction." : "No FAQPage schema. Add FAQ structured data to appear in 'People Also Ask' and AI answers.", category: "AEO" });

  // HowTo Schema
  checks.push({ label: "HowTo Schema", status: r.hasHowToSchema ? "pass" : "warn", detail: r.hasHowToSchema ? "HowTo schema detected. Eligible for step-by-step rich results." : "No HowTo schema. Add step-by-step structured data for how-to rich snippets.", category: "AEO" });

  // Direct Answer Paragraph
  checks.push({ label: "Direct Answer Paragraph", status: r.hasDirectAnswer ? "pass" : "warn", detail: r.hasDirectAnswer ? "Found a concise answer paragraph after H1. Good for featured snippets and AI extraction." : "No clear answer paragraph after H1. Add a 15-80 word summary right after your H1 for featured snippet targeting.", category: "AEO" });

  // Question-Based Headings
  checks.push({ label: "Question-Based Headings", status: r.questionHeadings >= 2 ? "pass" : r.questionHeadings > 0 ? "warn" : "fail", detail: r.questionHeadings > 0 ? `${r.questionHeadings} question-style heading(s) found (What, How, Why, etc.). Great for People Also Ask.` : "No question-based headings. Use 'What is...?', 'How to...?' style H2/H3 headings to target answer engines.", category: "AEO" });

  // Lists (featured snippet targeting)
  checks.push({ label: "Lists for Snippets", status: r.listCount >= 2 ? "pass" : r.listCount > 0 ? "warn" : "fail", detail: r.listCount > 0 ? `${r.listCount} list(s) found. Lists are preferred by Google for featured snippets.` : "No lists found. Add ordered or unordered lists — Google prefers them for featured snippets.", category: "AEO" });

  // Tables
  checks.push({ label: "Tables for Snippets", status: r.tableCount > 0 ? "pass" : "warn", detail: r.tableCount > 0 ? `${r.tableCount} table(s) found. Tables can appear as featured snippets.` : "No tables found. Consider adding comparison or data tables for table-style featured snippets.", category: "AEO" });

  // ── GEO (Generative Engine Optimization) ──

  // Breadcrumb Schema
  checks.push({ label: "Breadcrumb Schema", status: r.hasBreadcrumbSchema ? "pass" : "warn", detail: r.hasBreadcrumbSchema ? "BreadcrumbList schema detected. Helps AI understand site hierarchy." : "No BreadcrumbList schema. Add breadcrumbs to help AI engines understand your site structure.", category: "GEO" });

  // llms.txt
  checks.push({ label: "llms.txt", status: r.hasLlmsTxt ? "pass" : "warn", detail: r.hasLlmsTxt ? "llms.txt found. AI crawlers can understand your site's purpose and structure." : "No llms.txt found. Add a /llms.txt file to help AI agents discover and understand your content.", category: "GEO" });

  // Definition Patterns
  checks.push({ label: "Entity Definitions", status: r.hasDefinitionPattern ? "pass" : "warn", detail: r.hasDefinitionPattern ? "Clear definition patterns found ('is a', 'refers to'). AI engines can extract authoritative definitions." : "No clear definition patterns. Use phrases like 'X is a...', 'X refers to...' so AI can cite your content.", category: "GEO" });

  // Schema Richness
  const schemaCount = r.schemaTypes?.length || 0;
  checks.push({ label: "Schema Richness", status: schemaCount >= 4 ? "pass" : schemaCount >= 2 ? "warn" : "fail", detail: schemaCount > 0 ? `${schemaCount} schema type(s): ${r.schemaTypes?.join(", ")}. More schemas = better AI understanding.` : "No schema types detected. Add multiple schemas (WebApplication, FAQPage, HowTo, BreadcrumbList) for maximum AI discoverability.", category: "GEO" });

  // Article/WebApp Schema
  const hasAppOrArticle = r.hasWebAppSchema || r.hasArticleSchema;
  checks.push({ label: "Content Type Schema", status: hasAppOrArticle ? "pass" : "warn", detail: hasAppOrArticle ? `${r.hasWebAppSchema ? "WebApplication" : "Article"} schema detected. AI understands your content type.` : "No Article or WebApplication schema. Add one to help AI categorize your content.", category: "GEO" });

  // Citation-Friendly (OG + structured data + clear content)
  const citationScore = [r.og.title, r.og.description, r.jsonLdCount > 0, r.hasDirectAnswer, r.hasFAQSchema].filter(Boolean).length;
  checks.push({ label: "AI Citation Readiness", status: citationScore >= 4 ? "pass" : citationScore >= 2 ? "warn" : "fail", detail: `${citationScore}/5 citation signals. AI engines need OG tags, structured data, direct answers, and FAQ to cite your content.`, category: "GEO" });

  return checks;
}

function calcScore(checks: CheckItem[]): number {
  let score = 0;
  const total = checks.length;
  for (const c of checks) {
    if (c.status === "pass") score += 1;
    else if (c.status === "warn") score += 0.5;
  }
  return Math.round((score / total) * 100);
}

function scoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function scoreBg(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

const statusIcon = { pass: "✅", warn: "⚠️", fail: "❌" };

const faqs = [
  { question: "What does this analyzer check?", answer: "It performs 28+ checks across three categories: SEO (meta tags, HTTPS, headings, images, OG tags, sitemap, structured data), AEO (FAQ schema, HowTo schema, direct answer paragraphs, question headings, lists, tables), and GEO (llms.txt, schema richness, entity definitions, breadcrumbs, AI citation readiness)." },
  { question: "What is AEO (Answer Engine Optimization)?", answer: "AEO is the practice of optimizing content to appear in Google's featured snippets, 'People Also Ask' boxes, and voice search results. It focuses on structured answers, FAQ schema, question-based headings, and list/table formatting that answer engines prefer." },
  { question: "What is GEO (Generative Engine Optimization)?", answer: "GEO is the practice of optimizing content so AI-powered search engines (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot) cite your content in their generated answers. It focuses on structured data, clear entity definitions, llms.txt, and citation-friendly content." },
  { question: "How is the score calculated?", answer: "Each of the 28+ checks earns points: passed checks get full points, warnings get half points, and failed checks get zero. The score is a percentage of total possible points across all SEO, AEO, and GEO checks." },
  { question: "What is llms.txt?", answer: "llms.txt is a file (similar to robots.txt) placed at the root of your website that helps AI language models understand your site's purpose, structure, and available resources. It's an emerging standard for AI discoverability." },
  { question: "Does this tool store the URLs I analyze?", answer: "No. The URL is sent to our API only to fetch the page content for analysis. Nothing is stored or logged." },
];

export default function SeoAnalyzerPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [checks, setChecks] = useState<CheckItem[]>([]);
  const [error, setError] = useState("");

  async function analyze() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setChecks([]);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
        setChecks(analyzeChecks(data));
      }
    } catch {
      setError("Failed to analyze. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  const score = checks.length > 0 ? calcScore(checks) : 0;
  const categories = [...new Set(checks.map((c) => c.category))];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={webApplicationSchema({
          name: "SEO, AEO & GEO Analyzer",
          description: "Free SEO, AEO, and GEO analyzer. Check any website with 28+ checks for search engines, answer engines, and AI-powered search.",
          url: "https://toolpilot.pages.dev/tools/seo-analyzer",
          category: "DeveloperApplication",
          keywords: ["seo analyzer", "aeo checker", "geo analyzer", "answer engine optimization", "generative engine optimization"],
        })}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/#developer" },
          { label: "SEO Analyzer", href: "/tools/seo-analyzer" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">SEO, AEO & GEO Analyzer</h1>
      <p className="mb-6 text-gray-600">
        Enter any URL to get an instant audit with 28+ checks covering SEO,
        Answer Engine Optimization (AEO), and Generative Engine Optimization
        (GEO). Get a score and recommendations to rank in Google, AI answers,
        and generative search.
      </p>

      {/* Input */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter a URL (e.g., example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && analyze()}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={analyze}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-6 text-center text-sm text-gray-500">
          Fetching and analyzing the page... This may take a few seconds.
        </div>
      )}

      {result && checks.length > 0 && (
        <>
          {/* Score */}
          <div className="mb-6 rounded-lg bg-white p-6 text-center">
            <div className="mb-2 text-sm text-gray-500">SEO Score</div>
            <div className={`text-6xl font-bold ${scoreColor(score)}`}>{score}</div>
            <div className="mt-2 text-sm text-gray-500">/100</div>
            <div className="mx-auto mt-3 h-3 w-64 rounded-full bg-gray-200">
              <div
                className={`h-3 rounded-full ${scoreBg(score)} transition-all`}
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="mt-3 text-xs text-gray-400">
              Analyzed: {result.url}
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {checks.filter((c) => c.status === "pass").length}
              </div>
              <div className="text-xs text-gray-500">Passed</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {checks.filter((c) => c.status === "warn").length}
              </div>
              <div className="text-xs text-gray-500">Warnings</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {checks.filter((c) => c.status === "fail").length}
              </div>
              <div className="text-xs text-gray-500">Failed</div>
            </div>
          </div>

          {/* Detailed Checks */}
          {categories.map((cat) => (
            <div key={cat} className="mb-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">{cat}</h2>
              <div className="space-y-2">
                {checks
                  .filter((c) => c.category === cat)
                  .map((c, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg bg-white px-4 py-3"
                    >
                      <span className="mt-0.5 text-lg">{statusIcon[c.status]}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{c.label}</div>
                        <div className="text-sm text-gray-600">{c.detail}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Page Info */}
          <div className="mb-6 rounded-lg bg-white p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Page Info</h2>
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <div><span className="text-gray-500">Status:</span> {result.status}</div>
              <div><span className="text-gray-500">HTML Size:</span> {result.htmlSize} KB</div>
              <div><span className="text-gray-500">Word Count:</span> ~{result.wordCount}</div>
              <div><span className="text-gray-500">Images:</span> {result.images.total}</div>
              <div><span className="text-gray-500">Internal Links:</span> {result.links.internal}</div>
              <div><span className="text-gray-500">External Links:</span> {result.links.external}</div>
            </div>
          </div>
        </>
      )}

      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is SEO, AEO & GEO?</h2>
        <p className="mb-3">
          Modern search has three layers: <strong>SEO</strong> (Search Engine Optimization) for traditional Google rankings, <strong>AEO</strong> (Answer Engine Optimization) for featured snippets and &quot;People Also Ask&quot;, and <strong>GEO</strong> (Generative Engine Optimization) for AI-powered search like ChatGPT, Perplexity, and Google AI Overviews.
        </p>
        <h3 className="mb-2 font-semibold text-gray-900">What We Check (28+ Items)</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <h4 className="font-medium text-gray-900">SEO (16 checks)</h4>
            <ul className="list-inside list-disc space-y-1 text-xs">
              <li>Meta tags & headings</li>
              <li>HTTPS & mobile</li>
              <li>Images, links, content</li>
              <li>OG & Twitter Card</li>
              <li>robots.txt & sitemap</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">AEO (6 checks)</h4>
            <ul className="list-inside list-disc space-y-1 text-xs">
              <li>FAQ & HowTo schema</li>
              <li>Direct answer paragraph</li>
              <li>Question-based headings</li>
              <li>Lists & tables for snippets</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">GEO (6 checks)</h4>
            <ul className="list-inside list-disc space-y-1 text-xs">
              <li>llms.txt for AI crawlers</li>
              <li>Schema richness & types</li>
              <li>Entity definitions</li>
              <li>Breadcrumb structure</li>
              <li>AI citation readiness</li>
            </ul>
          </div>
        </div>
      </section>

      <FAQ items={faqs} />
      <RelatedTools currentSlug="seo-analyzer" />
    </div>
  );
}
