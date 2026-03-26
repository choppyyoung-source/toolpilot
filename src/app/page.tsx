import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import JsonLd from "@/components/JsonLd";
import { categories, getToolsByCategory, tools } from "@/lib/tools";

function itemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Online Tools",
    description: "A collection of 24+ free online tools for developers, designers, and everyone.",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `https://toolpilot.pages.dev/tools/${tool.slug}`,
      description: tool.description,
    })),
  };
}

function collectionPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ToolPilot — Free Online Tools",
    description: "Free online tools for everyone. Word counter, JSON formatter, Base64 encoder, color converter, unit converter, and more.",
    url: "https://toolpilot.pages.dev",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, i) => ({
        "@type": "SoftwareApplication",
        position: i + 1,
        name: tool.name,
        url: `https://toolpilot.pages.dev/tools/${tool.slug}`,
        applicationCategory: "WebApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      })),
    },
  };
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={itemListSchema()} />
      <JsonLd data={collectionPageSchema()} />

      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          Free Online Tools for Everyone
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Fast, free, and private. All tools run in your browser — your data
          never leaves your device.
        </p>
      </section>

      <AdBanner slot="home-top" format="horizontal" />

      {/* Tool Categories */}
      {categories.map((cat) => {
        const catTools = getToolsByCategory(cat.id);
        if (catTools.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">
              {cat.icon} {cat.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}

      <AdBanner slot="home-bottom" format="horizontal" />

      {/* SEO Content */}
      <section className="mt-12 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          Why ToolPilot?
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <h3 className="mb-1 font-medium text-gray-900">100% Free</h3>
            <p>All tools are completely free with no hidden costs or sign-ups required.</p>
          </div>
          <div>
            <h3 className="mb-1 font-medium text-gray-900">Privacy First</h3>
            <p>
              Everything runs locally in your browser. We never store or transmit
              your data.
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-medium text-gray-900">Lightning Fast</h3>
            <p>
              No server processing needed. Get instant results right in your
              browser.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
