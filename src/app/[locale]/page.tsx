import { locales, type Locale } from "@/lib/i18n/locales";
import { getTranslation } from "@/lib/i18n";
import { categories, getToolsByCategory } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const catKeys: Record<string, "textTools" | "developerTools" | "converters" | "securityTools"> = {
  text: "textTools",
  developer: "developerTools",
  converter: "converters",
  security: "securityTools",
};

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t.common.siteTitle,
          description: t.common.siteDescription,
          inLanguage: locale,
          url: `https://toolpilot.pages.dev/${locale}`,
        }}
      />

      <section className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          {t.common.heroTitle}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          {t.common.heroDescription}
        </p>
      </section>

      {categories.map((cat) => {
        const catTools = getToolsByCategory(cat.id);
        if (catTools.length === 0) return null;
        const catName = t.common[catKeys[cat.id] || "textTools"];
        return (
          <section key={cat.id} className="mb-10">
            <h2 className="mb-4 text-2xl font-bold">
              {cat.icon} {catName}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-12 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          {t.common.whyTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <h3 className="mb-1 font-medium text-gray-900">{t.common.free}</h3>
            <p>{t.common.freeDesc}</p>
          </div>
          <div>
            <h3 className="mb-1 font-medium text-gray-900">{t.common.privacy}</h3>
            <p>{t.common.privacyDesc}</p>
          </div>
          <div>
            <h3 className="mb-1 font-medium text-gray-900">{t.common.fast}</h3>
            <p>{t.common.fastDesc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
