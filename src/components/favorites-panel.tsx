"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSavedStore } from "@/stores/saved-store";
import { shouldUseWhiteText } from "@/lib/color-convert";
import toast from "react-hot-toast";

interface FavoritesPanelProps {
  onSelect: (colors: string[]) => void;
  actionLabel?: string;
}

export function FavoritesPanel({ onSelect, actionLabel = "Apply" }: FavoritesPanelProps) {
  const { palettes, remove } = useSavedStore();
  const [expanded, setExpanded] = useState(true);

  if (palettes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="surface rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-overlay-3 transition-colors duration-150"
      >
        <div className="flex items-center gap-2.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="var(--color-accent-pink)"
            stroke="var(--color-accent-pink)"
            strokeWidth="2"
            className="flex-shrink-0"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span className="text-sm font-semibold">Your Favorites</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-accent-pink)]/10 text-[var(--color-accent-pink)]">
            {palettes.length}
          </span>
        </div>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--color-text-muted)]"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      {/* Palette list */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 max-h-[280px] overflow-y-auto">
              {palettes.map((palette) => (
                <div
                  key={palette.id}
                  className="group flex items-center gap-3 p-2 rounded-xl hover:bg-overlay-4 transition-colors duration-150"
                >
                  {/* Color strip */}
                  <div className="flex rounded-lg overflow-hidden h-9 flex-1 min-w-0 shadow-sm border border-[var(--color-border-subtle)]">
                    {palette.colors.map((c, i) => (
                      <div
                        key={i}
                        className="flex-1 relative"
                        style={{ backgroundColor: c }}
                        title={c.toUpperCase()}
                      >
                        <span
                          className="absolute inset-0 flex items-center justify-center font-mono text-[8px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                          style={{ color: shouldUseWhiteText(c) ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.6)" }}
                        >
                          {c.toUpperCase().slice(0, 4)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Name */}
                  <span className="text-[11px] font-medium text-[var(--color-text-muted)] truncate max-w-[80px] hidden sm:block">
                    {palette.name}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
                    <button
                      onClick={() => {
                        onSelect(palette.colors);
                        toast.success(`${actionLabel}: ${palette.name}`);
                      }}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:opacity-90 transition-opacity"
                    >
                      {actionLabel}
                    </button>
                    <button
                      onClick={() => {
                        remove(palette.id);
                        toast.success("Removed from favorites");
                      }}
                      className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/[0.08] transition-colors"
                      title="Remove"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
