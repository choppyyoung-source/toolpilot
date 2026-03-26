import Link from "next/link";
import { tools } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">🧰 ToolPilot</h3>
            <p className="text-sm text-gray-600">
              Free online tools for everyone. No sign-up required.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">Tools</h3>
            <ul className="space-y-1">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">About</h3>
            <p className="text-sm text-gray-600">
              ToolPilot provides free, fast, and privacy-friendly online tools.
              All processing happens in your browser — your data never leaves
              your device.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ToolPilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
