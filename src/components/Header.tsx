import Link from "next/link";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          🧰 ToolPilot
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden gap-6 sm:flex">
            <Link
              href="/#text"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Text Tools
            </Link>
            <Link
              href="/#developer"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Developer Tools
            </Link>
            <Link
              href="/#converter"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Converters
            </Link>
            <Link href="/#security" className="text-sm text-gray-600 hover:text-gray-900">Security</Link>
          </nav>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
