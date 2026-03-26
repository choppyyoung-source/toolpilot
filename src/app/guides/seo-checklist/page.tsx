import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "SEO Checklist 2026 — 15 On-Page SEO Best Practices",
  description: "Complete on-page SEO checklist for 2026. 15 actionable best practices for meta tags, content, technical SEO, and structured data to improve your search rankings.",
  keywords: ["seo checklist", "on-page seo", "seo best practices", "seo guide 2026", "website seo checklist"],
};

const checks = [
  { title: "Unique Title Tag (50-60 chars)", desc: "Every page needs a unique, descriptive title tag. Keep it under 60 characters to avoid truncation in search results. Include your primary keyword near the beginning." },
  { title: "Meta Description (150-160 chars)", desc: "Write a compelling description that includes your keyword and a call-to-action. This is your ad copy in search results — make it click-worthy." },
  { title: "One H1 Tag Per Page", desc: "Use exactly one H1 tag that clearly describes the page content. It should include your primary keyword and be different from the title tag." },
  { title: "Heading Hierarchy (H2, H3)", desc: "Organize content with a logical heading structure. Use H2 for main sections and H3 for subsections. Never skip levels." },
  { title: "HTTPS Encryption", desc: "Google has confirmed HTTPS as a ranking signal. Ensure your entire site loads over HTTPS with a valid SSL certificate." },
  { title: "Mobile-Friendly (Viewport Meta)", desc: "Include a viewport meta tag and ensure your site is responsive. Google uses mobile-first indexing, meaning the mobile version of your site determines rankings." },
  { title: "Fast Page Load Speed", desc: "Aim for under 3 seconds load time. Compress images, minimize CSS/JS, use a CDN, and leverage browser caching." },
  { title: "Descriptive Image Alt Text", desc: "Every image should have descriptive alt text. This helps search engines understand image content and improves accessibility." },
  { title: "Internal Linking", desc: "Link between related pages on your site. This helps search engines discover content and distributes page authority throughout your site." },
  { title: "XML Sitemap", desc: "Create and submit an XML sitemap to Google Search Console and Bing Webmaster Tools. This helps search engines find and index all your pages." },
  { title: "robots.txt File", desc: "Create a robots.txt file that allows search engine crawlers access to your important pages while blocking irrelevant ones." },
  { title: "Structured Data (JSON-LD)", desc: "Add Schema.org structured data using JSON-LD. This enables rich snippets in search results: FAQs, how-tos, ratings, and more." },
  { title: "Open Graph Tags", desc: "Add og:title, og:description, and og:image tags for better social media sharing. This controls how your pages appear when shared on Facebook, LinkedIn, etc." },
  { title: "Canonical Tags", desc: "Use canonical tags to prevent duplicate content issues. Point all variations of a URL to the preferred version." },
  { title: "Content Quality & Length", desc: "Create comprehensive, original content that answers the user's query. Aim for 300+ words minimum, but prioritize quality over quantity." },
];

export default function SeoChecklistGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "SEO Checklist 2026 — 15 On-Page SEO Best Practices",
        description: "Complete on-page SEO checklist with 15 actionable best practices.",
        author: { "@type": "Organization", name: "ToolPilot" },
        publisher: { "@type": "Organization", name: "ToolPilot", url: "https://toolpilot.pages.dev" },
        datePublished: "2026-03-27",
        mainEntityOfPage: "https://toolpilot.pages.dev/guides/seo-checklist",
      }} />

      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link> / <Link href="/guides/seo-checklist" className="text-gray-900 font-medium">SEO Checklist</Link>
      </nav>

      <h1 className="mb-4 text-3xl font-bold">SEO Checklist 2026 — 15 On-Page Best Practices</h1>
      <p className="mb-8 text-gray-600">A complete checklist of on-page SEO best practices. Use our <Link href="/tools/seo-analyzer" className="text-blue-600 hover:underline">SEO Analyzer</Link> to automatically check your site against these criteria.</p>

      <div className="space-y-4">
        {checks.map((check, i) => (
          <div key={i} className="rounded-lg bg-white p-5">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">{i + 1}</span>
              {check.title}
            </h2>
            <p className="text-sm text-gray-600">{check.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg bg-blue-50 p-6 text-center">
        <p className="mb-3 text-lg font-semibold text-gray-900">Check Your Site Now</p>
        <p className="mb-4 text-sm text-gray-600">Our SEO Analyzer automatically checks your site against these best practices and gives you a score.</p>
        <Link href="/tools/seo-analyzer" className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">
          Analyze Your Website
        </Link>
      </div>
    </div>
  );
}
