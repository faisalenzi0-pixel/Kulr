import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Kulr",
  description: "Kulr terms of service. Simple rules for using our free color tools.",
  alternates: { canonical: "https://kulr.app/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 md:py-32">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Terms of Service</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-12">Last updated: February 24, 2026</p>

      <div className="prose-kulr">
        <h2>The basics</h2>
        <p>
          Kulr is a free, browser-based color toolkit. By using kulr.app, you agree to these terms.
          If you don&apos;t agree, don&apos;t use the site. It&apos;s that simple.
        </p>

        <h2>What you can do</h2>
        <ul>
          <li>Use all Kulr tools for personal and commercial projects</li>
          <li>Export palettes, gradients, and color data in any format</li>
          <li>Use generated color schemes in your designs, apps, and products</li>
          <li>Share links to Kulr tools and palettes</li>
        </ul>

        <h2>What you can&apos;t do</h2>
        <ul>
          <li>Scrape, mirror, or redistribute Kulr&apos;s code or UI as your own product</li>
          <li>Use automated bots to overload the service</li>
          <li>Attempt to exploit, hack, or disrupt the platform</li>
          <li>Remove or modify Kulr branding when embedding or sharing</li>
        </ul>

        <h2>Intellectual property</h2>
        <p>
          The Kulr name, logo, UI design, and codebase are our property. Color palettes and schemes
          you create using Kulr are yours — we claim no ownership over your creative output.
        </p>

        <h2>No warranty</h2>
        <p>
          Kulr is provided &quot;as is&quot; without warranty of any kind. We do our best to keep everything
          working, but we can&apos;t guarantee 100% uptime or that every color calculation will be
          perfect for every use case. Use your professional judgment.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          Kulr is a free tool. We are not liable for any damages arising from your use of the service,
          including but not limited to lost data, lost profits, or design decisions based on Kulr&apos;s output.
        </p>

        <h2>Advertising</h2>
        <p>
          Kulr displays advertisements via Google AdSense to support the free service. We are not
          responsible for the content of third-party advertisements.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms at any time. Major changes will be noted with an updated date.
          Continued use after changes means you accept the new terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Reach us at <strong>legal@kulr.app</strong>.
        </p>
      </div>
    </div>
  );
}
