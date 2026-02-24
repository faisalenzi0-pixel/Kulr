"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { UNIQUE_COLORS, COLOR_CATEGORIES, type NamedColor } from "@/lib/css-colors";
import { hexToRgb, rgbToHsl } from "@/lib/color-convert";
import { shouldUseWhiteText } from "@/lib/color-convert";

function copyToClipboard(text: string, label: string) {
  navigator.clipboard.writeText(text);
  toast.success(`Copied ${label}`);
}

function ColorCard({ color }: { color: NamedColor }) {
  const white = shouldUseWhiteText(color.hex);
  const rgb = hexToRgb(color.hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
    >
      {/* Color swatch */}
      <button
        onClick={() => copyToClipboard(color.hex, color.hex)}
        className="w-full h-28 relative cursor-pointer transition-all duration-200"
        style={{ backgroundColor: color.hex }}
      >
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${white ? "text-white" : "text-black"}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </div>
      </button>

      {/* Info */}
      <div className="p-3.5 bg-[var(--color-surface)]">
        <Link href={`/colors/${color.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
          className="font-semibold text-sm tracking-tight mb-1.5 block hover:text-[var(--color-accent-purple)] transition-colors">
          {color.name}
        </Link>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => copyToClipboard(color.hex, "HEX")}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-overlay-3 hover:bg-overlay-6 text-[var(--color-text-secondary)] transition-colors cursor-pointer"
          >
            {color.hex}
          </button>
          <button
            onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-overlay-3 hover:bg-overlay-6 text-[var(--color-text-secondary)] transition-colors cursor-pointer"
          >
            {rgb.r},{rgb.g},{rgb.b}
          </button>
          <button
            onClick={() => copyToClipboard(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`, "HSL")}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-overlay-3 hover:bg-overlay-6 text-[var(--color-text-secondary)] transition-colors cursor-pointer"
          >
            {Math.round(hsl.h)}°
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ColorsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    let results = UNIQUE_COLORS;
    if (category !== "all") {
      results = results.filter((c) => c.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.hex.toLowerCase().includes(q) ||
          c.category.includes(q)
      );
    }
    return results;
  }, [search, category]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: UNIQUE_COLORS.length };
    for (const c of UNIQUE_COLORS) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen px-4 py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Color <span className="gradient-text">Names</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Browse {UNIQUE_COLORS.length}+ named colors with hex, RGB, and HSL values.
            Click any color to copy its code.
          </p>
        </div>

        {/* Search + Filter bar */}
        <div className="max-w-4xl mx-auto mb-10">
          {/* Search */}
          <div className="relative mb-5">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search colors by name or hex code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-strong)] focus:outline-none text-sm placeholder:text-[var(--color-text-muted)] transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {COLOR_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`
                  flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                  ${category === cat.id
                    ? "bg-[var(--color-text)] text-[var(--color-text-inverse)] shadow-sm"
                    : "bg-overlay-3 text-[var(--color-text-secondary)] hover:bg-overlay-6 hover:text-[var(--color-text)]"
                  }
                `}
              >
                {"swatch" in cat && cat.swatch && (
                  <span className="w-3 h-3 rounded-full border border-[var(--color-border)]" style={{ backgroundColor: cat.swatch }} />
                )}
                {cat.label}
                <span className="opacity-50">{categoryCounts[cat.id] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6 max-w-[1400px] mx-auto">
          <p className="text-sm text-[var(--color-text-muted)]">
            {filtered.length} color{filtered.length !== 1 ? "s" : ""}
            {category !== "all" && ` in ${category}`}
            {search && ` matching "${search}"`}
          </p>
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
            <Link href="/generate" className="hover:text-[var(--color-text)] transition-colors">
              Generate palettes →
            </Link>
            <Link href="/picker" className="hover:text-[var(--color-text)] transition-colors">
              Color picker →
            </Link>
          </div>
        </div>

        {/* Color grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
            >
              {filtered.map((color) => (
                <ColorCard key={`${color.name}-${color.hex}`} color={color} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[var(--color-text-muted)] text-lg mb-2">No colors found</p>
              <p className="text-[var(--color-text-muted)] text-sm">
                Try a different search term or category
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SEO content section */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-6">About Named Colors</h2>
          <div className="prose-sm text-[var(--color-text-secondary)] space-y-4 leading-relaxed">
            <p>
              CSS named colors are predefined color keywords recognized by all modern browsers.
              There are 148 standard CSS color names defined in the CSS Color Module Level 4 specification,
              ranging from common names like <strong>red</strong>, <strong>blue</strong>, and <strong>green</strong> to
              more specific ones like <strong>cornflower blue</strong>, <strong>medium spring green</strong>, and <strong>blanched almond</strong>.
            </p>
            <p>
              Each named color maps to a specific hexadecimal (hex) value. For example, <strong>coral</strong> is
              #FF7F50, which translates to RGB(255, 127, 80). You can use these color names directly in CSS
              properties like <code className="px-1.5 py-0.5 rounded bg-overlay-4 text-[var(--color-text)] font-mono text-xs">color: coral;</code> or <code className="px-1.5 py-0.5 rounded bg-overlay-4 text-[var(--color-text)] font-mono text-xs">background-color: cornflowerblue;</code>.
            </p>
            <p>
              Beyond the CSS specification, designers commonly reference colors by evocative names
              like <strong>sage</strong>, <strong>champagne</strong>, <strong>terracotta</strong>, and <strong>cobalt</strong>.
              We include these popular design colors alongside the official CSS named colors to give you the most
              comprehensive color reference available.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/picker" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Pick any color visually →
              </Link>
              <Link href="/convert" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Convert between color formats →
              </Link>
              <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Generate palettes →
              </Link>
              <Link href="/brands" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Browse brand colors →
              </Link>
              <Link href="/psychology" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Color psychology guide →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
