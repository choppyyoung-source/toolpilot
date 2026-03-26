import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ToolPilot",
  description: "ToolPilot privacy policy. Learn how we handle your data. All tools run in your browser — we never collect or store your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last updated: March 27, 2026</p>

      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Overview</h2>
          <p>
            ToolPilot (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and safeguard information
            when you visit our website at toolpilot.pages.dev.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Data We Do NOT Collect</h2>
          <p>All tools on ToolPilot run entirely in your web browser. We do NOT:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Collect, store, or transmit any data you enter into our tools</li>
            <li>Track individual users or create user profiles</li>
            <li>Require user accounts, logins, or registrations</li>
            <li>Sell or share personal information with third parties</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Analytics</h2>
          <p>
            We may use privacy-friendly analytics (such as Cloudflare Web
            Analytics) to understand aggregate traffic patterns like page views
            and visitor counts. These analytics do not use cookies and do not
            collect personal data.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Advertising</h2>
          <p>
            We may display advertisements through third-party advertising
            networks such as Google AdSense. These networks may use cookies and
            similar technologies to serve ads based on your prior visits to our
            website or other websites. You can opt out of personalized advertising
            by visiting{" "}
            <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Cookies</h2>
          <p>
            ToolPilot itself does not set cookies. However, third-party services
            such as advertising networks may set cookies. You can control cookie
            preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Third-Party Links</h2>
          <p>
            Our website may contain links to external websites. We are not
            responsible for the privacy practices of these external sites. We
            encourage you to review the privacy policies of any website you visit.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Children&apos;s Privacy</h2>
          <p>
            Our website is not directed at children under the age of 13. We do
            not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <span className="font-medium text-gray-900">toolpilot.contact@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
