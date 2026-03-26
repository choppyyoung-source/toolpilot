import Link from "next/link";
import { tools, type Tool } from "@/lib/tools";

function getRelated(currentSlug: string, count = 4): Tool[] {
  const current = tools.find((t) => t.slug === currentSlug);
  if (!current) return tools.slice(0, count);

  // Same category first, then others
  const sameCategory = tools.filter(
    (t) => t.category === current.category && t.slug !== currentSlug
  );
  const otherCategory = tools.filter(
    (t) => t.category !== current.category && t.slug !== currentSlug
  );

  return [...sameCategory, ...otherCategory].slice(0, count);
}

export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = getRelated(currentSlug);

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-lg font-bold text-gray-900">Related Tools</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
          >
            <span className="text-2xl">{tool.icon}</span>
            <div>
              <div className="font-medium text-gray-900">{tool.name}</div>
              <div className="text-sm text-gray-500">{tool.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
