import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="mb-2 text-2xl">{tool.icon}</div>
      <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-blue-600">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-600">{tool.description}</p>
    </Link>
  );
}
