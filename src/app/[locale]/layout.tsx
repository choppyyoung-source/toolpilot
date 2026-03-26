import { locales, type Locale } from "@/lib/i18n/locales";
import { getTranslation } from "@/lib/i18n";
import type { Metadata } from "next";

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

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
