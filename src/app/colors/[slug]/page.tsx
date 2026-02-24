import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CSS_NAMED_COLORS } from "@/lib/css-colors";
import { hexToRgb, rgbToHsl, rgbToHsb, rgbToCmyk, rgbToHwb, shouldUseWhiteText, hslToHex } from "@/lib/color-convert";
import { getShades } from "@/lib/color-engine";
import { findNearestTailwind } from "@/lib/tailwind-colors";
import { getContrastRatio, getWCAGLevel } from "@/lib/color-contrast";

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const COLOR_MAP = new Map(
  CSS_NAMED_COLORS.map((c) => [slugify(c.name), c])
);

export function generateStaticParams() {
  return CSS_NAMED_COLORS.map((c) => ({ slug: slugify(c.name) }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const color = COLOR_MAP.get(slug);
  if (!color) return {};

  const title = `${color.name} Color — ${color.hex} | RGB, HSL, CMYK Codes | Kulr`;
  const desc = `${color.name} (${color.hex}). Get RGB, HSL, HSB, CMYK, HWB values, tints & shades, Tailwind class, and WCAG contrast info. Free color tool.`;

  return {
    title,
    description: desc,
    keywords: [
      `${color.name.toLowerCase()} color`,
      `${color.name.toLowerCase()} hex code`,
      `${color.hex} color`,
      `${color.name.toLowerCase()} RGB`,
      `${color.name.toLowerCase()} color code`,
      "color information",
    ],
    openGraph: {
      title,
      description: desc,
      url: `https://kulr.app/colors/${slug}`,
      images: [`/api/og?colors=${color.hex.replace("#", "")}&title=${encodeURIComponent(color.name)}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [`/api/og?colors=${color.hex.replace("#", "")}&title=${encodeURIComponent(color.name)}`],
    },
    alternates: {
      canonical: `https://kulr.app/colors/${slug}`,
    },
  };
}

function FormatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--color-border-subtle)]">
      <span className="text-sm text-[var(--color-text-muted)] font-medium">{label}</span>
      <code className="text-sm font-mono text-[var(--color-text)]">{value}</code>
    </div>
  );
}

export default async function ColorPage({ params }: Props) {
  const { slug } = await params;
  const color = COLOR_MAP.get(slug);
  if (!color) notFound();

  const rgb = hexToRgb(color.hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsb = rgbToHsb(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
  const white = shouldUseWhiteText(color.hex);
  const tw = findNearestTailwind(color.hex);
  const shades = getShades(color.hex, 11);
  const contrastWhite = getContrastRatio(color.hex, "#FFFFFF");
  const contrastBlack = getContrastRatio(color.hex, "#000000");
  const wcagWhite = getWCAGLevel(contrastWhite);
  const wcagBlack = getWCAGLevel(contrastBlack);

  // Complementary color
  const compHue = (hsl.h + 180) % 360;
  const compHex = hslToHex(compHue, hsl.s, hsl.l);

  // Analogous colors
  const analogous = [
    hslToHex((hsl.h + 330) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
  ];

  // Triadic colors
  const triadic = [
    hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
  ];

  // Related colors in same category
  const related = CSS_NAMED_COLORS
    .filter((c) => c.category === color.category && c.hex !== color.hex)
    .slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${color.name} Color — ${color.hex}`,
    url: `https://kulr.app/colors/${slug}`,
    description: `Complete color information for ${color.name} (${color.hex}). Includes RGB, HSL, HSB, CMYK, HWB, tints, shades, and accessibility data.`,
    isPartOf: { "@type": "WebSite", name: "Kulr", url: "https://kulr.app" },
  };

  return (
    <div className="min-h-screen px-4 py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--color-text-muted)] mb-8">
          <Link href="/colors" className="hover:text-[var(--color-text)] transition-colors">Colors</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-text)]">{color.name}</span>
        </nav>

        {/* Hero swatch */}
        <div className="rounded-3xl overflow-hidden mb-10 shadow-xl shadow-black/10">
          <div
            className="h-48 sm:h-56 md:h-64 flex items-center justify-center"
            style={{ backgroundColor: color.hex }}
          >
            <div className="text-center">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2"
                style={{ color: white ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.85)" }}
              >
                {color.name}
              </h1>
              <p
                className="font-mono text-xl sm:text-2xl font-semibold tracking-wider"
                style={{ color: white ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)" }}
              >
                {color.hex}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Color formats */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h2 className="text-lg font-bold tracking-tight mb-4">Color Codes</h2>
            <FormatRow label="HEX" value={color.hex} />
            <FormatRow label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
            <FormatRow label="HSL" value={`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`} />
            <FormatRow label="HSB" value={`hsb(${Math.round(hsb.h)}, ${Math.round(hsb.s * 100)}%, ${Math.round(hsb.b * 100)}%)`} />
            <FormatRow label="CMYK" value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} />
            <FormatRow label="HWB" value={`hwb(${hwb.h}, ${hwb.w}%, ${hwb.b}%)`} />
            <FormatRow label="Tailwind" value={tw.distance < 15 ? `${tw.name}-${tw.shade}` : `~${tw.name}-${tw.shade}`} />
          </div>

          {/* Accessibility */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h2 className="text-lg font-bold tracking-tight mb-4">Accessibility</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">On White Background</span>
                  <span className="text-sm font-mono text-[var(--color-text-muted)]">{contrastWhite.toFixed(2)}:1</span>
                </div>
                <div className="h-12 rounded-xl flex items-center justify-center border border-[var(--color-border)]" style={{ backgroundColor: "#FFFFFF" }}>
                  <span className="text-sm font-semibold" style={{ color: color.hex }}>Sample Text</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {wcagWhite.aa && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500/15 text-green-400">AA</span>}
                  {wcagWhite.aaLarge && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500/15 text-green-400">AA Large</span>}
                  {wcagWhite.aaa && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500/15 text-green-400">AAA</span>}
                  {!wcagWhite.aa && !wcagWhite.aaLarge && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/15 text-red-400">Fail</span>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">On Black Background</span>
                  <span className="text-sm font-mono text-[var(--color-text-muted)]">{contrastBlack.toFixed(2)}:1</span>
                </div>
                <div className="h-12 rounded-xl flex items-center justify-center border border-[var(--color-border)]" style={{ backgroundColor: "#000000" }}>
                  <span className="text-sm font-semibold" style={{ color: color.hex }}>Sample Text</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {wcagBlack.aa && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500/15 text-green-400">AA</span>}
                  {wcagBlack.aaLarge && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500/15 text-green-400">AA Large</span>}
                  {wcagBlack.aaa && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500/15 text-green-400">AAA</span>}
                  {!wcagBlack.aa && !wcagBlack.aaLarge && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/15 text-red-400">Fail</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tints & Shades */}
        <div className="mb-12">
          <h2 className="text-lg font-bold tracking-tight mb-4">Tints & Shades</h2>
          <div className="flex rounded-2xl overflow-hidden border border-[var(--color-border)]">
            {shades.map((s, i) => (
              <div key={i} className="flex-1 h-16 sm:h-20 relative group" style={{ backgroundColor: s }}>
                <span className="absolute inset-x-0 bottom-1 text-[8px] font-mono text-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: shouldUseWhiteText(s) ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}>
                  {s.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Harmonies */}
        <div className="mb-12">
          <h2 className="text-lg font-bold tracking-tight mb-4">Color Harmonies</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Complementary</p>
              <div className="flex rounded-xl overflow-hidden h-12">
                <div className="flex-1" style={{ backgroundColor: color.hex }} />
                <div className="flex-1" style={{ backgroundColor: compHex }} />
              </div>
              <p className="text-xs font-mono text-[var(--color-text-muted)] mt-2">{color.hex} + {compHex}</p>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Analogous</p>
              <div className="flex rounded-xl overflow-hidden h-12">
                <div className="flex-1" style={{ backgroundColor: analogous[0] }} />
                <div className="flex-1" style={{ backgroundColor: color.hex }} />
                <div className="flex-1" style={{ backgroundColor: analogous[1] }} />
              </div>
              <p className="text-xs font-mono text-[var(--color-text-muted)] mt-2">{analogous[0]} + {color.hex} + {analogous[1]}</p>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Triadic</p>
              <div className="flex rounded-xl overflow-hidden h-12">
                <div className="flex-1" style={{ backgroundColor: color.hex }} />
                <div className="flex-1" style={{ backgroundColor: triadic[0] }} />
                <div className="flex-1" style={{ backgroundColor: triadic[1] }} />
              </div>
              <p className="text-xs font-mono text-[var(--color-text-muted)] mt-2">{color.hex} + {triadic[0]} + {triadic[1]}</p>
            </div>
          </div>
        </div>

        {/* Related colors */}
        {related.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-bold tracking-tight mb-4">Related {color.category.charAt(0).toUpperCase() + color.category.slice(1)} Colors</h2>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {related.map((rc) => (
                <Link
                  key={rc.hex}
                  href={`/colors/${slugify(rc.name)}`}
                  className="group rounded-xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all hover:-translate-y-0.5"
                >
                  <div className="h-12" style={{ backgroundColor: rc.hex }} />
                  <div className="p-1.5 bg-[var(--color-surface)]">
                    <p className="text-[10px] font-medium truncate">{rc.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SEO content */}
        <section className="mt-16 max-w-2xl">
          <h2 className="text-xl font-bold tracking-tight mb-4">About {color.name}</h2>
          <div className="text-sm text-[var(--color-text-secondary)] space-y-3 leading-relaxed">
            <p>
              <strong>{color.name}</strong> is a {color.category} color with the hex code <strong>{color.hex}</strong>.
              In the RGB color model, it contains {rgb.r} red, {rgb.g} green, and {rgb.b} blue.
              Its HSL representation is {Math.round(hsl.h)}° hue, {Math.round(hsl.s * 100)}% saturation, and {Math.round(hsl.l * 100)}% lightness.
            </p>
            <p>
              For print design using CMYK, {color.name} translates to {cmyk.c}% cyan, {cmyk.m}% magenta, {cmyk.y}% yellow, and {cmyk.k}% key (black).
              {tw.distance < 15 ? ` The closest Tailwind CSS class is ${tw.name}-${tw.shade} (${tw.hex}).` : ` The nearest Tailwind CSS class is approximately ${tw.name}-${tw.shade}.`}
            </p>
          </div>
        </section>

        {/* Cross-links */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/colors" className="text-[var(--color-accent-purple)] hover:underline">All colors</Link>
            <Link href="/picker" className="text-[var(--color-accent-purple)] hover:underline">Color picker</Link>
            <Link href="/contrast" className="text-[var(--color-accent-purple)] hover:underline">Contrast checker</Link>
            <Link href={`/generate?colors=${color.hex.replace("#", "")}-${compHex.replace("#", "")}`} className="text-[var(--color-accent-purple)] hover:underline">
              Generate palette with {color.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
