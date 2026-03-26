"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import JsonLd, { webApplicationSchema } from "@/components/JsonLd";

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
  wordCount: number;
  htmlSize: number;
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
  { question: "What does this SEO analyzer check?", answer: "It checks 16+ SEO factors including meta tags (title, description), HTTPS security, mobile-friendliness, heading structure, image alt text, Open Graph and Twitter Card tags, robots.txt, XML sitemap, structured data (JSON-LD), content length, and page size." },
  { question: "How is the SEO score calculated?", answer: "Each check earns points: passed checks get full points, warnings get half points, and failed checks get zero. The final score is a percentage of total possible points." },
  { question: "Is this as accurate as paid tools like Ahrefs or SEMrush?", answer: "This tool checks on-page SEO factors that are directly observable from the page HTML. Paid tools additionally provide traffic estimates, backlink analysis, keyword rankings, and competitive data which require large databases." },
  { question: "How often should I run an SEO audit?", answer: "Run an SEO check after any significant content or technical changes. For active sites, a monthly audit is a good practice to catch issues early." },
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
          name: "SEO Analyzer",
          description: "Free SEO analyzer tool. Check any website's SEO health with 16+ on-page checks. Get an SEO score and actionable recommendations.",
          url: "https://toolpilot.pages.dev/tools/seo-analyzer",
          category: "DeveloperApplication",
          keywords: ["seo analyzer", "seo checker", "website analyzer", "seo audit", "site analysis"],
        })}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Developer Tools", href: "/#developer" },
          { label: "SEO Analyzer", href: "/tools/seo-analyzer" },
        ]}
      />

      <h1 className="mb-2 text-3xl font-bold">SEO Analyzer</h1>
      <p className="mb-6 text-gray-600">
        Enter any URL to get an instant SEO audit with 16+ checks. Get a score
        and actionable recommendations to improve your search rankings.
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
        <h2 className="mb-2 text-lg font-semibold text-gray-900">What Is an SEO Analyzer?</h2>
        <p className="mb-3">
          An SEO analyzer is a tool that examines a web page and evaluates it
          against search engine optimization best practices. It checks technical
          factors, content quality signals, and social media readiness to give
          you a comprehensive overview of your page&apos;s SEO health.
        </p>
        <h3 className="mb-1 font-semibold text-gray-900">What We Check</h3>
        <ul className="list-inside list-disc space-y-1">
          <li><strong>Meta Tags</strong> — Title, description, viewport, canonical, language</li>
          <li><strong>Security</strong> — HTTPS encryption</li>
          <li><strong>Content</strong> — Heading structure, image alt text, word count</li>
          <li><strong>Social</strong> — Open Graph and Twitter Card tags</li>
          <li><strong>Technical</strong> — robots.txt, sitemap.xml, structured data</li>
          <li><strong>Performance</strong> — Page size</li>
        </ul>
      </section>

      <FAQ items={faqs} />
    </div>
  );
}
