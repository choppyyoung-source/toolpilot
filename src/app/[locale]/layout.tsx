import { locales, localeNames, type Locale } from "@/lib/i18n/locales";
import { getTranslation } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);
  return {
    title: { default: t.common.siteTitle, template: `%s | ToolPilot` },
    description: t.common.siteDescription,
    alternates: {
      canonical: `https://toolpilot.pages.dev/${locale}`,
      languages: {
        en: "https://toolpilot.pages.dev",
        ...Object.fromEntries(
          locales.map((l) => [l, `https://toolpilot.pages.dev/${l}`])
        ),
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);

  return (
    <>
      {/* Language bar */}
      <div className="border-b border-gray-100 bg-white px-4 py-2 text-center text-xs text-gray-500">
        <span className="mr-2">{localeNames[locale as Locale]}</span>
        |
        <Link href="/" className="ml-2 text-blue-600 hover:underline">
          English
        </Link>
        {locales
          .filter((l) => l !== locale)
          .map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              className="ml-2 text-blue-600 hover:underline"
            >
              {localeNames[l]}
            </Link>
          ))}
      </div>
      {children}
    </>
  );
}
