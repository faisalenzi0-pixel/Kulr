"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import type { Brand } from "@/lib/brand-colors";
import { shouldUseWhiteText, hexToRgb, rgbToHsl } from "@/lib/color-convert";

function copyText(text: string, label: string) {
  navigator.clipboard.writeText(text);
  toast.success(`Copied ${label}`);
}

function ColorCard({ color, brand }: { color: Brand["colors"][0]; brand: string }) {
  const white = shouldUseWhiteText(color.hex);
  const rgb = hexToRgb(color.hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all duration-300 group"
    >
      {/* Swatch */}
      <button
        onClick={() => copyText(color.hex, color.hex)}
        className="w-full h-28 sm:h-32 relative cursor-pointer"
        style={{ backgroundColor: color.hex }}
      >
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${white ? "text-white" : "text-black"}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </div>
      </button>

      {/* Info */}
      <div className="p-4 bg-[var(--color-surface)]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-sm">{color.name}</span>
          <span className="text-[10px] font-medium text-[var(--color-text-muted)] bg-overlay-3 px-2 py-0.5 rounded-md">
            {color.usage}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => copyText(color.hex, "HEX")}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-overlay-3 hover:bg-overlay-6 text-[var(--color-text-secondary)] transition-colors cursor-pointer"
          >
            {color.hex}
          </button>
          <button
            onClick={() => copyText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-overlay-3 hover:bg-overlay-6 text-[var(--color-text-secondary)] transition-colors cursor-pointer"
          >
            {rgb.r},{rgb.g},{rgb.b}
          </button>
          <button
            onClick={() => copyText(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`, "HSL")}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-overlay-3 hover:bg-overlay-6 text-[var(--color-text-secondary)] transition-colors cursor-pointer"
          >
            {Math.round(hsl.h)}°
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function BrandDetail({ brand }: { brand: Brand }) {
  return (
    <div className="min-h-screen px-4 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
          <Link href="/brands" className="hover:text-[var(--color-text)] transition-colors">
            Brands
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text)]">{brand.name}</span>
        </div>

        {/* Hero strip */}
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] mb-8">
          <div className="flex h-24 sm:h-32">
            {brand.colors.map((color, i) => (
              <motion.div
                key={i}
                className="flex-1 relative group cursor-pointer"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyText(color.hex, color.hex)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ flex: 1.8 }}
              >
                <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-80 transition-opacity whitespace-nowrap ${shouldUseWhiteText(color.hex) ? "text-white" : "text-black"}`}>
                  {color.hex}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Brand info */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {brand.name}
            </h1>
            <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider bg-overlay-3 px-3 py-1 rounded-full">
              {brand.industry}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              Est. {brand.founded}
            </span>
          </div>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-3xl">
            {brand.story}
          </p>
        </div>

        {/* Color cards */}
        <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
          Brand Palette — Click to copy
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-12">
          {brand.colors.map((color) => (
            <ColorCard key={color.hex + color.name} color={color} brand={brand.name} />
          ))}
        </div>

        {/* Export section */}
        <div className="surface rounded-2xl p-6 border border-[var(--color-border)] mb-12">
          <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
            Export {brand.name} Colors
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const css = brand.colors
                  .map((c) => `  --${brand.slug}-${c.usage.toLowerCase().replace(/[\s/]+/g, "-")}: ${c.hex};`)
                  .join("\n");
                copyText(`:root {\n${css}\n}`, "CSS Variables");
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-overlay-3 hover:bg-overlay-6 border border-[var(--color-border)] transition-colors cursor-pointer"
            >
              CSS Variables
            </button>
            <button
              onClick={() => {
                const tw = brand.colors
                  .map((c) => `  '${c.usage.toLowerCase().replace(/[\s/]+/g, "-")}': '${c.hex}',`)
                  .join("\n");
                copyText(`// ${brand.name} colors\n{\n${tw}\n}`, "Tailwind Config");
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-overlay-3 hover:bg-overlay-6 border border-[var(--color-border)] transition-colors cursor-pointer"
            >
              Tailwind Config
            </button>
            <button
              onClick={() => {
                const scss = brand.colors
                  .map((c) => `$${brand.slug}-${c.usage.toLowerCase().replace(/[\s/]+/g, "-")}: ${c.hex};`)
                  .join("\n");
                copyText(scss, "SCSS Variables");
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-overlay-3 hover:bg-overlay-6 border border-[var(--color-border)] transition-colors cursor-pointer"
            >
              SCSS Variables
            </button>
            <button
              onClick={() => {
                const json = JSON.stringify(
                  Object.fromEntries(brand.colors.map((c) => [c.usage, c.hex])),
                  null,
                  2
                );
                copyText(json, "JSON");
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-overlay-3 hover:bg-overlay-6 border border-[var(--color-border)] transition-colors cursor-pointer"
            >
              JSON
            </button>
          </div>
        </div>

        {/* Related links */}
        <div className="flex flex-wrap gap-4">
          <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
            Generate similar palette →
          </Link>
          <Link href="/contrast" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
            Check contrast →
          </Link>
          <Link href="/psychology" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
            Color psychology →
          </Link>
          <Link href="/brands" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
            ← All brands
          </Link>
        </div>
      </div>
    </div>
  );
}
