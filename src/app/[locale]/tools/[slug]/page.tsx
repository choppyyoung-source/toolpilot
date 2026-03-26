import { locales, type Locale } from "@/lib/i18n/locales";
import { getTranslation, getToolTranslation } from "@/lib/i18n";
import { tools } from "@/lib/tools";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import widgets from "@/components/tools/ToolWidgetMap";
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
  const tool = tools.find((tl) => tl.slug === slug);

  if (!tt || !tool) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Tool not found</h1>
        <Link href={`/${locale}`} className="text-blue-600 hover:underline">Go back</Link>
      </div>
    );
  }

  const pageUrl = `https://toolpilot.pages.dev/${locale}/tools/${slug}`;
  const Widget = widgets[slug];

  // Common button labels from translations
  const uiLabels: Record<string, string> = {
    copy: t.common.copyBtn,
    generate: t.common.generateBtn,
    convert: t.common.convertBtn,
    analyze: t.common.analyzeBtn,
    download: t.common.downloadBtn,
    encode: t.common.encodeBtn,
    decode: t.common.decodeBtn,
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* WebApplication schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tt.h1,
          description: tt.description,
          url: pageUrl,
          inLanguage: locale,
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      {/* BreadcrumbList schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `https://toolpilot.pages.dev/${locale}` },
            { "@type": "ListItem", position: 2, name: tt.h1, item: pageUrl },
          ],
        }}
      />
      {/* FAQPage schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: tt.whatIs,
              acceptedAnswer: { "@type": "Answer", text: tt.whatIsAnswer },
            },
          ],
        }}
      />
      {/* HowTo schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: tt.h1,
          description: tt.description,
          inLanguage: locale,
          totalTime: "PT1M",
          step: [
            { "@type": "HowToStep", position: 1, name: "1", text: tt.description },
          ],
        }}
      />

      {/* Breadcrumb nav */}
      <nav className="mb-4 text-sm text-gray-500">
        <Link href={`/${locale}`} className="hover:text-blue-600">Home</Link>
        {" / "}
        <span className="font-medium text-gray-900">{tt.h1}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold">{tt.h1}</h1>
      <p className="mb-6 text-gray-600">{tt.description}</p>

      {/* Embedded tool widget */}
      {Widget ? (
        <Widget labels={uiLabels} />
      ) : (
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-sm text-gray-500">
          Tool loading...
        </div>
      )}

      {/* What Is section */}
      <section className="mt-8 rounded-lg bg-white p-6 text-sm text-gray-600">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">{tt.whatIs}</h2>
        <p>{tt.whatIsAnswer}</p>
      </section>

      {/* Related tools - translated */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-gray-900">{t.common.relatedTools}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {tools
            .filter((rt) => rt.category === tool.category && rt.slug !== slug)
            .slice(0, 4)
            .map((rt) => {
              const rtt = t.tools[rt.slug as keyof typeof t.tools];
              return (
                <Link
                  key={rt.slug}
                  href={`/${locale}/tools/${rt.slug}`}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md"
                >
                  <span className="text-2xl">{rt.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{rtt?.h1 || rt.name}</div>
                    <div className="text-sm text-gray-500">{rtt?.description || rt.description}</div>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}
