import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ToolPilot — Free Online Tools",
  description: "Learn about ToolPilot, a free collection of online tools for developers, designers, and everyone. Privacy-first, no sign-up required.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">About ToolPilot</h1>

      <div className="space-y-6 text-gray-600">
        <p>
          ToolPilot is a free collection of online tools designed to make
          everyday tasks faster and easier. Whether you are a developer, designer,
          writer, or student, our tools are built to help you get things done
          without friction.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
        <p>
          We believe useful tools should be free, fast, and private. Every tool
          on ToolPilot runs entirely in your browser — your data never leaves
          your device. There are no accounts to create, no subscriptions to
          manage, and no hidden fees.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">What We Offer</h2>
        <ul className="list-inside list-disc space-y-2">
          <li><strong>Text Tools</strong> — Word counter, case converter, Lorem Ipsum generator</li>
          <li><strong>Developer Tools</strong> — JSON formatter, Base64 encoder, color converter, URL encoder, Markdown preview, timestamp converter, HTML entity encoder</li>
          <li><strong>Converters</strong> — Unit converter, QR code generator</li>
          <li><strong>Security Tools</strong> — Password generator</li>
        </ul>
        <p>We are constantly adding new tools based on user needs and feedback.</p>

        <h2 className="text-xl font-semibold text-gray-900">Privacy First</h2>
        <p>
          All processing happens locally in your browser using JavaScript. We do
          not collect, store, or transmit any of the data you enter into our
          tools. For more details, read our{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
        <p>
          Have feedback, suggestions, or found a bug? We would love to hear from
          you. Reach out at{" "}
          <span className="font-medium text-gray-900">toolpilot.contact@gmail.com</span>.
        </p>
      </div>
    </div>
  );
}
