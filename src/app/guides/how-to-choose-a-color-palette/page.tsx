import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Choose a Color Palette — Complete Guide | Kulr",
  description:
    "Learn how to choose a color palette for your design project. Step-by-step guide covering color theory, harmony rules, mood-based palettes, and practical tips for web, app, and brand design.",
  keywords: [
    "how to choose a color palette",
    "color palette tips",
    "color theory guide",
    "color scheme design",
    "pick colors for website",
    "brand color palette",
    "color harmony rules",
  ],
  openGraph: {
    title: "How to Choose a Color Palette — Complete Guide | Kulr",
    description:
      "Step-by-step guide to choosing the perfect color palette for any design project.",
    url: "https://kulr.app/guides/how-to-choose-a-color-palette",
  },
  alternates: {
    canonical: "https://kulr.app/guides/how-to-choose-a-color-palette",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Choose a Color Palette — Complete Guide",
  description:
    "Learn how to choose a color palette for your design project with color theory, harmony rules, and practical tips.",
  author: { "@type": "Organization", name: "Kulr", url: "https://kulr.app" },
  publisher: { "@type": "Organization", name: "Kulr", url: "https://kulr.app" },
  url: "https://kulr.app/guides/how-to-choose-a-color-palette",
  datePublished: "2026-02-24",
  dateModified: "2026-02-24",
};

export default function HowToChooseColorPalettePage() {
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
              How to Choose a <span className="gradient-text">Color Palette</span>
            </h1>
            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
              Choosing the right color palette can make or break your design. This guide walks you through color theory fundamentals, harmony rules, and practical steps to build a palette that works — whether you&apos;re designing a website, app, or brand identity.
            </p>
          </header>

          <div className="prose-sm text-[var(--color-text-secondary)] space-y-10 leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                1. Start with One Color
              </h2>
              <p>
                Every great palette starts with a single anchor color. This is usually your brand&apos;s primary color or the dominant emotion you want to convey. Pick a color that resonates with your project&apos;s purpose — blue for trust and professionalism, orange for energy and creativity, green for growth and health.
              </p>
              <p className="mt-3">
                Use Kulr&apos;s{" "}
                <Link href="/picker" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  Color Picker
                </Link>{" "}
                to explore colors visually with the HSB canvas, or browse{" "}
                <Link href="/colors" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  175+ named colors
                </Link>{" "}
                for inspiration.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                2. Understand Color Harmony
              </h2>
              <p>
                Color harmonies are combinations that feel naturally balanced. They&apos;re based on positions on the color wheel:
              </p>
              <ul className="mt-3 space-y-2 list-none">
                <li className="flex gap-3">
                  <span className="text-[var(--color-accent-purple)] font-bold shrink-0">Complementary</span>
                  <span>Two colors opposite each other (e.g., blue + orange). High contrast, energetic.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-accent-purple)] font-bold shrink-0">Analogous</span>
                  <span>Three colors side by side (e.g., blue + blue-green + green). Harmonious, calming.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-accent-purple)] font-bold shrink-0">Triadic</span>
                  <span>Three colors equally spaced (e.g., red + yellow + blue). Vibrant, balanced.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-accent-purple)] font-bold shrink-0">Split-Comp</span>
                  <span>One color + two adjacent to its complement. Softer than complementary.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--color-accent-purple)] font-bold shrink-0">Monochromatic</span>
                  <span>Variations of a single hue (tints, shades, tones). Elegant, cohesive.</span>
                </li>
              </ul>
              <p className="mt-3">
                Kulr&apos;s{" "}
                <Link href="/generate" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  Palette Generator
                </Link>{" "}
                lets you generate palettes in all these harmony modes with one click.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                3. Use the 60-30-10 Rule
              </h2>
              <p>
                The 60-30-10 rule is an interior design principle that works perfectly for digital design:
              </p>
              <ul className="mt-3 space-y-2 list-none">
                <li><strong className="text-[var(--color-text)]">60%</strong> — Dominant color (backgrounds, large surfaces)</li>
                <li><strong className="text-[var(--color-text)]">30%</strong> — Secondary color (cards, sections, navigation)</li>
                <li><strong className="text-[var(--color-text)]">10%</strong> — Accent color (CTAs, highlights, active states)</li>
              </ul>
              <p className="mt-3">
                This ratio creates visual hierarchy without overwhelming the eye. Your{" "}
                <Link href="/visualizer" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  Palette Visualizer
                </Link>{" "}
                lets you preview exactly how these proportions look on real UI templates.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                4. Consider Mood and Context
              </h2>
              <p>
                Colors carry psychological weight. Warm colors (red, orange, yellow) feel energetic and urgent. Cool colors (blue, green, purple) feel calm and trustworthy. Pastels feel soft and approachable. Neons feel modern and bold.
              </p>
              <p className="mt-3">
                Match your palette&apos;s mood to your audience. A children&apos;s app needs different energy than a financial dashboard. Kulr&apos;s generator includes mood filters — warm, cool, pastel, neon, earthy — to narrow your options fast.
              </p>
              <p className="mt-3">
                Explore our{" "}
                <Link href="/psychology" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  Color Psychology guide
                </Link>{" "}
                for deeper insights on how colors affect perception.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                5. Always Check Accessibility
              </h2>
              <p>
                A beautiful palette is useless if people can&apos;t read the text. WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text. Approximately 8% of men and 0.5% of women have some form of color vision deficiency.
              </p>
              <p className="mt-3">
                Run every color combination through Kulr&apos;s{" "}
                <Link href="/contrast" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  Contrast Checker
                </Link>{" "}
                and test with the built-in color blindness simulator before shipping. Accessibility isn&apos;t optional — it&apos;s a legal requirement in many jurisdictions.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                6. Extract from the Real World
              </h2>
              <p>
                Nature, photography, and art are the best color inspiration. Found a sunset photo with perfect tones? A product shot with the vibe you need? Drop it into Kulr&apos;s{" "}
                <Link href="/extract" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  Image Color Extractor
                </Link>{" "}
                and get a palette in milliseconds. The K-means clustering algorithm finds the dominant colors automatically.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] tracking-tight mb-4">
                7. Test on Real UIs
              </h2>
              <p>
                Colors look different in context. A purple that looks great in a swatch might feel too intense on a full-page background. Always test your palette on realistic mockups — dashboards, landing pages, mobile screens — before committing.
              </p>
              <p className="mt-3">
                Kulr&apos;s{" "}
                <Link href="/visualizer" className="text-[var(--color-accent-purple)] hover:underline font-medium">
                  Visualizer
                </Link>{" "}
                shows your palette on 6 different UI templates so you can see exactly how it performs in production.
              </p>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-16 surface rounded-2xl p-8 text-center border border-[var(--color-border)]">
            <h2 className="text-2xl font-bold tracking-tight mb-3">Ready to build your palette?</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Start generating beautiful, accessible color palettes in seconds.
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
            >
              Open Palette Generator
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
                { href: "/generate", label: "Palette Generator" },
                { href: "/picker", label: "Color Picker" },
                { href: "/contrast", label: "Contrast Checker" },
                { href: "/extract", label: "Image Extractor" },
                { href: "/visualizer", label: "Palette Visualizer" },
                { href: "/explore", label: "Browse 240+ Palettes" },
                { href: "/psychology", label: "Color Psychology" },
                { href: "/guides/wcag-color-contrast-guide", label: "WCAG Contrast Guide" },
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
