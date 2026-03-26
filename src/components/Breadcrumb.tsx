import Link from "next/link";
import JsonLd, { breadcrumbSchema } from "./JsonLd";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = items.map((i) => ({
    name: i.label,
    url: `https://toolbox-web-self.vercel.app${i.href}`,
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, idx) => (
            <li key={item.href} className="flex items-center gap-1">
              {idx > 0 && <span aria-hidden="true">/</span>}
              {idx === items.length - 1 ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
