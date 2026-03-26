import { locales, type Locale } from "@/lib/i18n/locales";
import { getTranslation } from "@/lib/i18n";
import { categories, getToolsByCategory, tools } from "@/lib/tools";
import Link from "next/link";
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
          "@type": "CollectionPage",
          name: t.common.siteTitle,
          description: t.common.siteDescription,
          inLanguage: locale,
          url: `https://toolpilot.pages.dev/${locale}`,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: tools.length,
            itemListElement: tools.map((tool, i) => {
              const tt = t.tools[tool.slug as keyof typeof t.tools];
              return {
                "@type": "ListItem",
                position: i + 1,
                name: tt?.h1 || tool.name,
                url: `https://toolpilot.pages.dev/${locale}/tools/${tool.slug}`,
                description: tt?.description || tool.description,
              };
            }),
          },
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
              {catTools.map((tool) => {
                const tt = t.tools[tool.slug as keyof typeof t.tools];
                return (
                  <Link
                    key={tool.slug}
                    href={`/${locale}/tools/${tool.slug}`}
                    className="group rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-2 text-2xl">{tool.icon}</div>
                    <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-blue-600">
                      {tt?.h1 || tool.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {tt?.description || tool.description}
                    </p>
                  </Link>
                );
              })}
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
