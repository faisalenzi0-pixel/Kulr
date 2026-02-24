"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { curatedPalettes } from "@/lib/curated-palettes";
import { useSavedStore } from "@/stores/saved-store";
import { encodePalette } from "@/lib/palette-utils";
import { shouldUseWhiteText } from "@/lib/color-convert";
import type { CuratedPalette, SavedPalette } from "@/lib/types";

// Extract unique tags from curated palettes
const uniqueTags = Array.from(
  new Set(curatedPalettes.flatMap((p) => p.tags))
).sort();
const allTags = ["all", ...uniqueTags];

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function PaletteCard({
  palette,
  saved,
  index,
  onRemove,
}: {
  palette: CuratedPalette | SavedPalette;
  saved?: boolean;
  index: number;
  onRemove?: () => void;
}) {
  const encoded = encodePalette(palette.colors);
  const [showActions, setShowActions] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(palette.colors.join(", "));
    toast.success("Colors copied!");
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove?.();
    toast.success("Palette removed");
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      layout
      className="group surface rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Color swatches strip */}
      <div className="flex h-28 rounded-t-2xl overflow-hidden">
        {palette.colors.map((c, i) => (
          <div
            key={i}
            className="flex-1 relative transition-all duration-300 group-hover:first:rounded-tl-none group-hover:last:rounded-tr-none"
            style={{ backgroundColor: c }}
          >
            {/* Show hex on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span
                className="font-mono text-[10px] font-medium px-1 py-0.5 rounded bg-black/20 backdrop-blur-sm"
                style={{
                  color: shouldUseWhiteText(c)
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(0,0,0,0.7)",
                }}
              >
                {c.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Info section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            {saved && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="var(--color-accent-pink)"
                stroke="var(--color-accent-pink)"
                strokeWidth="2"
                className="flex-shrink-0"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            )}
            <span className="text-sm font-semibold truncate">
              {palette.name}
            </span>
          </div>

          {/* Action buttons */}
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1"
              >
                {saved && onRemove && (
                  <button
                    onClick={handleRemove}
                    className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Remove from saved"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-8 transition-colors"
                  title="Copy colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
                <Link
                  href={`/generate?colors=${encoded}`}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:opacity-90 transition-opacity"
                >
                  Open
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tags */}
        {"tags" in palette && palette.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {palette.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-overlay-4 text-[var(--color-text-muted)] capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const { palettes: savedPalettes, remove } = useSavedStore();

  const filteredSaved = useMemo(() => {
    return savedPalettes.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [search, savedPalettes]);

  const filteredCurated = useMemo(() => {
    return curatedPalettes.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) {
        // Also search by tag
        const tagMatch = p.tags.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
        if (!tagMatch) return false;
      }
      if (activeTag !== "all" && !p.tags.includes(activeTag)) return false;
      return true;
    });
  }, [search, activeTag]);

  const showSaved = filteredSaved.length > 0 && activeTag === "all";
  const totalResults =
    filteredCurated.length + (showSaved ? filteredSaved.length : 0);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Explore</span> Palettes
          </h1>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl leading-relaxed">
            {curatedPalettes.length} hand-picked palettes ready to use.
            Click any to open in the generator.
          </p>
        </motion.div>

        {/* Search + Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="mb-10 space-y-4"
        >
          {/* Search bar */}
          <div className="relative max-w-lg">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or tag..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-overlay-4 border border-[var(--color-border)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-purple)] focus:bg-overlay-6 transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] text-white shadow-lg shadow-purple-500/20"
                    : "bg-overlay-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-8 border border-transparent hover:border-[var(--color-border)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Saved Palettes Section */}
        {showSaved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="var(--color-accent-pink)"
                stroke="var(--color-accent-pink)"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <h2 className="text-xl font-bold">Your Saved Palettes</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-accent-pink)]/10 text-[var(--color-accent-pink)]">
                {filteredSaved.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSaved.map((p, i) => (
                <PaletteCard key={p.id} palette={p} saved index={i} onRemove={() => remove(p.id)} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Curated Palettes Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: showSaved ? 0.3 : 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent-purple)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <h2 className="text-xl font-bold">Curated Palettes</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)]">
              {filteredCurated.length}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCurated.map((p, i) => (
              <PaletteCard
                key={p.id}
                palette={p}
                index={showSaved ? i + filteredSaved.length : i}
              />
            ))}
          </div>
        </motion.div>

        {/* Empty state */}
        {totalResults === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-overlay-4 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <p className="text-lg font-semibold mb-2">
              No palettes found
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Try a different search term or filter.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveTag("all");
              }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
        {/* Cross-links */}
        <div className="mt-12 mb-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Generate custom palettes →</Link>
            <Link href="/brands" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Brand color palettes →</Link>
            <Link href="/psychology" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Color psychology →</Link>
            <Link href="/tailwind" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Tailwind CSS colors →</Link>
            <Link href="/contrast" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Check contrast →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
