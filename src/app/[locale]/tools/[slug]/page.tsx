import { locales, type Locale } from "@/lib/i18n/locales";
import { getTranslation, getToolTranslation } from "@/lib/i18n";
import { tools } from "@/lib/tools";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const tool of tools) {
      params.push({ locale, slug: tool.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tt = getToolTranslation(locale as Locale, slug);
  if (!tt) return {};
  return {
    title: tt.title,
    description: tt.description,
    alternates: {
      canonical: `https://toolpilot.pages.dev/${locale}/tools/${slug}`,
      languages: {
        en: `https://toolpilot.pages.dev/tools/${slug}`,
        ...Object.fromEntries(
          locales.map((l) => [l, `https://toolpilot.pages.dev/${l}/tools/${slug}`])
        ),
      },
    },
  };
}

export default async function LocaleToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = getTranslation(locale as Locale);
  const tt = getToolTranslation(locale as Locale, slug);
  const tool = tools.find((t) => t.slug === slug);

  if (!tt || !tool) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Tool not found</h1>
        <Link href={`/${locale}`} className="text-blue-600 hover:underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tt.h1,
          description: tt.description,
          url: `https://toolpilot.pages.dev/${locale}/tools/${slug}`,
          inLanguage: locale,
          applicationCategory: "UtilityApplication",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href={`/${locale}`} className="hover:text-blue-600">
          Home
        </Link>
        {" / "}
        <span className="font-medium text-gray-900">{tt.h1}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold">{tt.h1}</h1>
      <p className="mb-6 text-gray-600">{tt.description}</p>

      {/* Link to English version with full tool */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
        <p className="mb-2 text-sm text-gray-700">
          {locale === "ko" ? "전체 도구를 사용하려면:" :
           locale === "ja" ? "完全なツールを使用するには:" :
           locale === "zh" ? "使用完整工具：" :
           locale === "es" ? "Para usar la herramienta completa:" :
           locale === "pt" ? "Para usar a ferramenta completa:" :
           locale === "id" ? "Untuk menggunakan alat lengkap:" :
           locale === "de" ? "Zum vollständigen Tool:" :
           locale === "fr" ? "Pour utiliser l'outil complet :" :
           "Use the full tool:"}
        </p>
        <Link
          href={`/tools/${slug}`}
          className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Open {tool.name} →
        </Link>
      </div>

      {/* What Is section */}
      <section className="rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">{tt.whatIs}</h2>
        <p>{tt.whatIsAnswer}</p>
      </section>

      {/* Related tools */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          {t.common.relatedTools}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {tools
            .filter((rt) => rt.category === tool.category && rt.slug !== slug)
            .slice(0, 4)
            .map((rt) => (
              <Link
                key={rt.slug}
                href={`/${locale}/tools/${rt.slug}`}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md"
              >
                <span className="text-2xl">{rt.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{rt.name}</div>
                  <div className="text-sm text-gray-500">{rt.description}</div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
