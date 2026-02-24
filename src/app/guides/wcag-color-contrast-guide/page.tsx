import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WCAG Color Contrast Guide — AA & AAA Standards Explained | Kulr",
  description:
    "Complete guide to WCAG 2.1 color contrast requirements. Learn AA vs AAA levels, minimum ratios for text and UI elements, how to calculate contrast, and how to fix accessibility issues. Free contrast checker included.",
  keywords: [
    "WCAG color contrast",
    "WCAG 2.1 contrast requirements",
    "AA contrast ratio",
    "AAA contrast ratio",
    "color accessibility guide",
    "contrast ratio calculator",
    "accessible colors",
    "web accessibility colors",
  ],
  openGraph: {
    title: "WCAG Color Contrast Guide — AA & AAA Standards Explained | Kulr",
    description:
      "Everything you need to know about WCAG color contrast. AA vs AAA, minimum ratios, and how to fix issues.",
    url: "https://kulr.app/guides/wcag-color-contrast-guide",
  },
  alternates: {
    canonical: "https://kulr.app/guides/wcag-color-contrast-guide",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "WCAG Color Contrast Guide — AA & AAA Standards Explained",
  description:
    "Complete guide to WCAG 2.1 color contrast requirements for web accessibility.",
  author: { "@type": "Organization", name: "Kulr", url: "https://kulr.app" },
  publisher: { "@type": "Organization", name: "Kulr", url: "https://kulr.app" },
  url: "https://kulr.app/guides/wcag-color-contrast-guide",
  datePublished: "2026-02-24",
  dateModified: "2026-02-24",
};

export default function WCAGContrastGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen pt-20 pb-16 px-4">
        <article className="max-w-3xl mx-auto">
          <header className="mb-12">
            <p className="text-sm font-semibold text-[var(--color-accent-purple)] uppercase tracking-widest mb-4">
              Guide
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
              <span className="gradient-text">WCAG Color Contrast</span> Guide
            </h1>
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
              WCAG 2.1 sets the standard for accessible color contrast on the web. This guide explains the AA and AAA conformance levels, minimum contrast ratios for text and UI components, and practical steps to make your designs accessible to everyone — including people with low vision and color blindness.
            </p>
          </header>

          <div className="prose-sm text-[var(--color-text-secondary)] space-y-10 leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                What Is Color Contrast?
              </h2>
              <p>
                Color contrast is the difference in luminance (perceived brightness) between two colors. It&apos;s measured as a ratio — for example, 4.5:1 means the lighter color is 4.5 times brighter than the darker one. Pure black on white has the maximum ratio of 21:1. Same-color on same-color has a ratio of 1:1.
              </p>
              <p className="mt-3">
                Higher contrast means easier readability, especially for people with low vision, older adults, and anyone reading in bright sunlight or on low-quality displays.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                WCAG Conformance Levels
              </h2>
              <p>
                WCAG (Web Content Accessibility Guidelines) defines three conformance levels: A, AA, and AAA. For color contrast, the relevant criteria are in Guideline 1.4.
              </p>

              {/* Table */}
              <div className="mt-5 surface rounded-xl border border-[var(--color-border)] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] bg-overlay-3">
                      <th className="px-4 py-3 text-left font-semibold text-[var(--color-text)]">Level</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--color-text)]">Normal Text</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--color-text)]">Large Text</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--color-text)]">UI Components</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--color-border-subtle)]">
                      <td className="px-4 py-3 font-bold text-[var(--color-warning)]">AA</td>
                      <td className="px-4 py-3 font-mono">4.5:1</td>
                      <td className="px-4 py-3 font-mono">3:1</td>
                      <td className="px-4 py-3 font-mono">3:1</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-[var(--color-success)]">AAA</td>
                      <td className="px-4 py-3 font-mono">7:1</td>
                      <td className="px-4 py-3 font-mono">4.5:1</td>
                      <td className="px-4 py-3 font-mono">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-3">
                <strong className="text-[var(--color-text)]">Large text</strong> is defined as 18pt (24px) or 14pt (18.66px) bold. Most body copy is normal text and requires the higher 4.5:1 ratio at AA level.
              </p>
              <p className="mt-3">
                <strong className="text-[var(--color-text)]">AA is the standard</strong> — most legal requirements (ADA, EN 301 549, EAA) reference WCAG AA. AAA is aspirational and not always achievable with brand colors, but aim for it where possible.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                How Contrast Ratio Is Calculated
              </h2>
              <p>
                The WCAG contrast formula uses relative luminance — a measure of how bright a color appears to the human eye, accounting for the fact that we&apos;re more sensitive to green light than red or blue.
              </p>
              <div className="mt-4 surface rounded-xl p-5 border border-[var(--color-border)] font-mono text-sm">
                <p className="text-[var(--color-text)]">Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)</p>
                <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                  L1 = relative luminance of the lighter color<br />
                  L2 = relative luminance of the darker color
                </p>
              </div>
              <p className="mt-3">
                You don&apos;t need to calculate this manually. Kulr&apos;s{" "}
                <Link href="/contrast" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  Contrast Checker
                </Link>{" "}
                computes the ratio in real time as you adjust colors, and tells you instantly whether you pass AA, AAA, or fail.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                Common Contrast Mistakes
              </h2>
              <ul className="space-y-3 list-none">
                <li className="flex gap-3">
                  <span className="text-[var(--color-error)] font-bold shrink-0">Light gray on white</span>
                  <span>#999 on #FFF is only 2.85:1 — fails even AA Large. Use #767676 (4.54:1) minimum.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-error)] font-bold shrink-0">Colored text on colored bg</span>
                  <span>Blue on purple, green on teal — these often fail despite looking &quot;different.&quot; Always check the ratio.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-error)] font-bold shrink-0">Placeholder text</span>
                  <span>Input placeholders are often too light. They must still meet 4.5:1 if they convey information.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-error)] font-bold shrink-0">Icons without labels</span>
                  <span>UI icons need 3:1 contrast against their background if they&apos;re the only way to identify a control.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                Color Blindness Considerations
              </h2>
              <p>
                Approximately 300 million people worldwide have some form of color vision deficiency. WCAG requires that color is never the <em>only</em> way to convey information. Use icons, text labels, patterns, or underlines alongside color.
              </p>
              <p className="mt-3">
                The most common types of color blindness are:
              </p>
              <ul className="mt-3 space-y-2 list-none">
                <li><strong className="text-[var(--color-text)]">Protanopia</strong> — reduced sensitivity to red light (~1% of men)</li>
                <li><strong className="text-[var(--color-text)]">Deuteranopia</strong> — reduced sensitivity to green light (~5% of men)</li>
                <li><strong className="text-[var(--color-text)]">Tritanopia</strong> — reduced sensitivity to blue light (very rare)</li>
                <li><strong className="text-[var(--color-text)]">Achromatopsia</strong> — total color blindness (extremely rare)</li>
              </ul>
              <p className="mt-3">
                Test your designs with Kulr&apos;s built-in{" "}
                <Link href="/picker" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  color blindness simulator
                </Link>{" "}
                on the Picker and Generator pages to see how your colors appear to affected users.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                Quick Fix Checklist
              </h2>
              <ul className="space-y-2 list-none">
                {[
                  "Check every text color against its background — not just headings, but body text, links, captions, and labels",
                  "Test interactive elements (buttons, form borders, focus rings) at 3:1 minimum",
                  "Don't rely on color alone — add icons, underlines, or patterns for status indicators",
                  "Test in both light and dark mode if your app supports both",
                  "Use auto-suggest tools to find the nearest accessible alternative when a color fails",
                  "Simulate color blindness for every critical flow in your UI",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" className="shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 surface rounded-2xl p-8 text-center border border-[var(--color-border)]">
            <h2 className="text-2xl font-bold tracking-tight mb-3">Check your contrast now</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Paste any two colors and get instant WCAG AA & AAA results with auto-suggest.
            </p>
            <Link
              href="/contrast"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
            >
              Open Contrast Checker
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Related */}
          <div className="mt-12">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools & Guides</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/contrast", label: "Contrast Checker" },
                { href: "/picker", label: "Color Picker" },
                { href: "/generate", label: "Palette Generator" },
                { href: "/psychology", label: "Color Psychology" },
                { href: "/guides/how-to-choose-a-color-palette", label: "How to Choose a Palette" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
