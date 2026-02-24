"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BRANDS, INDUSTRIES } from "@/lib/brand-colors";
import { shouldUseWhiteText } from "@/lib/color-convert";

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");

  const filtered = useMemo(() => {
    let results = BRANDS;
    if (industry !== "All") {
      results = results.filter((b) => b.industry === industry);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.industry.toLowerCase().includes(q) ||
          b.colors.some((c) => c.hex.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search, industry]);

  const industryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: BRANDS.length };
    for (const b of BRANDS) {
      counts[b.industry] = (counts[b.industry] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen px-4 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Brand <span className="gradient-text">Colors</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Color palettes from {BRANDS.length}+ of the world&apos;s most iconic brands.
            Get exact hex codes, learn why they chose those colors.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative mb-5">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search brands or hex codes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-strong)] focus:outline-none text-sm placeholder:text-[var(--color-text-muted)]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  industry === ind
                    ? "bg-[var(--color-text)] text-[var(--color-text-inverse)] shadow-sm"
                    : "bg-overlay-3 text-[var(--color-text-secondary)] hover:bg-overlay-6"
                }`}
              >
                {ind}
                <span className="ml-1 opacity-50">{industryCounts[ind] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          {filtered.length} brand{filtered.length !== 1 ? "s" : ""}
          {industry !== "All" && ` in ${industry}`}
        </p>

        {/* Brand grid */}
        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((brand) => (
              <motion.div
                key={brand.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group block surface rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10"
                >
                  {/* Color strip */}
                  <div className="flex h-16">
                    {brand.colors.slice(0, 5).map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 transition-all duration-300 group-hover:first:flex-[1.3]"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-lg font-bold tracking-tight group-hover:text-[var(--color-text)] transition-colors">
                        {brand.name}
                      </h2>
                      <span className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider bg-overlay-3 px-2 py-0.5 rounded-md">
                        {brand.industry}
                      </span>
                    </div>

                    {/* Color dots + hex */}
                    <div className="flex items-center gap-2 mb-3">
                      {brand.colors.slice(0, 5).map((color, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span
                            className="w-3 h-3 rounded-full border border-[var(--color-border)]"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                            {color.hex}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                      {brand.story.slice(0, 120)}...
                    </p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-purple)] transition-colors">
                      View palette
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--color-text-muted)] text-lg">No brands found</p>
          </div>
        )}

        {/* SEO content */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Brand Color Palettes</h2>
          <div className="prose-sm text-[var(--color-text-secondary)] space-y-4 leading-relaxed">
            <p>
              Every great brand has a carefully chosen color palette. These colors aren&apos;t random —
              they&apos;re strategic decisions that shape how millions of people perceive a company.
              Apple&apos;s minimalist black says premium. Coca-Cola&apos;s red says excitement.
              Spotify&apos;s green says discovery.
            </p>
            <p>
              Use this directory to reference exact brand colors for your design projects,
              competitive analysis, or inspiration. Each brand page includes the full color palette
              with hex codes, the story behind their color choices, and tools to generate similar palettes.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/psychology" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Why brands pick these colors →
              </Link>
              <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Generate similar palettes →
              </Link>
              <Link href="/picker" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Pick custom colors →
              </Link>
              <Link href="/tailwind" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Tailwind CSS colors →
              </Link>
              <Link href="/convert" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Convert color formats →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
