import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Kulr",
  description: "Kulr privacy policy. How we handle your data: we don't collect it. Everything runs in your browser.",
  alternates: { canonical: "https://kulr.app/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 md:py-32">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-12">Last updated: February 24, 2026</p>

      <div className="prose-kulr">
        <h2>The short version</h2>
        <p>
          Kulr is a browser-based color tool. Your palettes, images, and color data never leave your device.
          We don&apos;t have user accounts, we don&apos;t store your data on servers, and we don&apos;t sell anything to anyone.
        </p>

        <h2>What we collect</h2>
        <h3>Analytics</h3>
        <p>
          We use <strong>Google Analytics 4</strong> and <strong>Vercel Analytics</strong> to understand how
          people use the site — which pages are popular, how long sessions last, and which countries visitors
          come from. This data is aggregated and anonymous. We cannot identify individual users.
        </p>

        <h3>Advertising</h3>
        <p>
          We use <strong>Google AdSense</strong> to display ads. Google may use cookies to serve ads based
          on your prior visits to this or other websites. You can opt out of personalized advertising by
          visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google&apos;s Ads Settings</a>.
        </p>

        <h3>Cookies</h3>
        <p>
          Kulr itself sets one cookie: your theme preference (dark/light mode). Third-party services
          (Google Analytics, Google AdSense) may set their own cookies. You can block these in your
          browser settings without affecting Kulr&apos;s functionality.
        </p>

        <h2>What we don&apos;t collect</h2>
        <ul>
          <li>No personal information (name, email, phone)</li>
          <li>No user accounts or passwords</li>
          <li>No images you upload (processing happens in-browser)</li>
          <li>No palettes or color data you create</li>
          <li>No payment information (everything is free)</li>
        </ul>

        <h2>Data storage</h2>
        <p>
          Your saved palettes and favorites are stored in your browser&apos;s <strong>localStorage</strong>.
          This data never leaves your device. If you clear your browser data, your saved palettes will be removed.
        </p>

        <h2>Third-party services</h2>
        <ul>
          <li><strong>Vercel</strong> — hosting and edge network (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">their privacy policy</a>)</li>
          <li><strong>Google Analytics</strong> — anonymous usage analytics (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">their privacy policy</a>)</li>
          <li><strong>Google AdSense</strong> — advertising (<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">their ad policy</a>)</li>
        </ul>

        <h2>Children&apos;s privacy</h2>
        <p>
          Kulr does not knowingly collect any information from children under 13. The site is a general-purpose
          design tool with no age-restricted content.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy occasionally. Changes will be posted on this page with an updated date.
          Continued use of Kulr after changes constitutes acceptance.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Reach us at <strong>privacy@kulr.app</strong>.
        </p>
      </div>
    </div>
  );
}
