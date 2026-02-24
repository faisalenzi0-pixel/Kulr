"use client";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { extractColorsFromImage } from "@/lib/color-extract";
import { shouldUseWhiteText } from "@/lib/color-convert";
import { getColorName } from "@/lib/color-names";
import { encodePalette } from "@/lib/palette-utils";
import { FavoritesPanel } from "@/components/favorites-panel";

export default function ExtractPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(
    async (file: File) => {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setLoading(true);
      setColors([]);
      const img = new Image();
      img.onload = async () => {
        const extracted = await extractColorsFromImage(img, count);
        setColors(extracted);
        setLoading(false);
      };
      img.src = url;
    },
    [count]
  );

  const reExtract = useCallback(
    async (newCount: number) => {
      if (!imageUrl) return;
      setCount(newCount);
      setLoading(true);
      const img = new Image();
      img.onload = async () => {
        const extracted = await extractColorsFromImage(img, newCount);
        setColors(extracted);
        setLoading(false);
      };
      img.src = imageUrl;
    },
    [imageUrl]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) processImage(file);
    },
    [processImage]
  );

  const handleCopyColor = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex.toUpperCase());
    setCopiedIndex(index);
    toast.success(`Copied ${hex.toUpperCase()}`);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const resetImage = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setColors([]);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Extract Colors</span> from Image
          </h1>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl leading-relaxed">
            Get a color palette from any photo instantly. Drop an image and extract its dominant colors using K-means clustering — all processing runs in your browser, 100% private. Free online color extractor.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!imageUrl ? (
            /* ─── Drag & Drop Zone ───────────────────────────────── */
            <motion.div
              key="dropzone"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              onDrop={onDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onClick={() => fileRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl py-16 sm:py-20 px-8 text-center cursor-pointer transition-all duration-300 overflow-hidden ${
                isDragOver
                  ? "border-[var(--color-accent-purple)] bg-[var(--color-accent-purple)]/[0.06] scale-[1.01]"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent-purple)]/40 hover:bg-overlay-2"
              }`}
            >
              {/* Animated gradient ring on drag */}
              {isDragOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
                  }}
                />
              )}
              <motion.div
                animate={isDragOver ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10"
              >
                {/* Upload icon */}
                <div className={`mx-auto mb-5 w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isDragOver
                    ? "bg-[var(--color-accent-purple)]/10"
                    : "bg-overlay-4"
                }`}>
                  <svg
                    className={`transition-colors duration-300 ${
                      isDragOver
                        ? "text-[var(--color-accent-purple)]"
                        : "text-[var(--color-text-muted)]"
                    }`}
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
                <p className="text-[var(--color-text-secondary)] text-base font-medium mb-1.5">
                  {isDragOver
                    ? "Drop your image here"
                    : "Drop an image or click to browse"}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mb-5">
                  PNG, JPG, WEBP, GIF &mdash; processed entirely in your browser
                </p>
                {/* Visual hint: sample palette strips */}
                <div className="flex justify-center gap-3">
                  {[
                    ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
                    ["#0D1B2A", "#1B2838", "#2D6A4F", "#40916C", "#95D5B2"],
                    ["#FF6B35", "#F7C59F", "#EFEFD0", "#004E89", "#1A659E"],
                  ].map((strip, si) => (
                    <div key={si} className="flex rounded-lg overflow-hidden shadow-sm opacity-40">
                      {strip.map((c, ci) => (
                        <div
                          key={ci}
                          className="w-4 h-6"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files?.[0] && processImage(e.target.files[0])
                }
              />
            </motion.div>
          ) : (
            /* ─── Results Section ────────────────────────────────── */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image preview */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="surface rounded-2xl overflow-hidden"
                >
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="w-full h-auto max-h-[440px] object-contain"
                  />
                </motion.div>

                {/* Extracted colors */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Extracted Colors</h2>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--color-text-muted)]">
                        Count
                      </span>
                      <div className="flex items-center gap-1 surface rounded-lg p-0.5">
                        {[3, 4, 5, 6, 7, 8].map((n) => (
                          <button
                            key={n}
                            onClick={() => reExtract(n)}
                            className={`w-8 h-8 rounded-md text-xs font-medium transition-all duration-200 ${
                              count === n
                                ? "bg-[var(--color-accent-purple)] text-white shadow-sm"
                                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-6"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Color rows */}
                  <div className="space-y-2">
                    {loading
                      ? Array.from({ length: count }).map((_, i) => (
                          <motion.div
                            key={`shimmer-${i}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="h-16 rounded-xl animate-shimmer"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(var(--overlay),0.02) 25%, rgba(var(--overlay),0.06) 50%, rgba(var(--overlay),0.02) 75%)",
                              backgroundSize: "200% 100%",
                            }}
                          />
                        ))
                      : colors.map((c, i) => (
                          <motion.button
                            key={`${c}-${i}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: i * 0.06,
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1] as const,
                            }}
                            onClick={() => handleCopyColor(c, i)}
                            className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-overlay-4 transition-all duration-200 group"
                          >
                            {/* Color swatch — larger for more "dominant" colors (first ones tend to be more dominant) */}
                            <div
                              className="rounded-lg flex-shrink-0 shadow-lg transition-transform duration-200 group-hover:scale-105"
                              style={{
                                backgroundColor: c,
                                width: `${Math.max(40, 56 - i * 3)}px`,
                                height: `${Math.max(40, 56 - i * 3)}px`,
                              }}
                            />
                            <div className="flex flex-col items-start gap-0.5 min-w-0">
                              <span className="font-mono text-sm font-medium">
                                {c.toUpperCase()}
                              </span>
                              <span className="text-[11px] text-[var(--color-text-muted)] truncate">
                                {getColorName(c)}
                              </span>
                            </div>
                            <div className="ml-auto flex-shrink-0">
                              {copiedIndex === i ? (
                                <motion.svg
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="var(--color-success)"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </motion.svg>
                              ) : (
                                <svg
                                  className="opacity-0 group-hover:opacity-60 transition-opacity"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                  />
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                              )}
                            </div>
                          </motion.button>
                        ))}
                  </div>

                  {/* Actions */}
                  {colors.length > 0 && !loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex gap-3 pt-3"
                    >
                      <Link
                        href={`/generate?colors=${encodePalette(colors)}`}
                        className="flex-1 text-center py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
                      >
                        Open in Generator
                      </Link>
                      <button
                        onClick={resetImage}
                        className="px-5 py-3 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] hover:bg-overlay-4 transition-all duration-200"
                      >
                        New Image
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Palette strip preview */}
              {colors.length > 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <p className="text-xs text-[var(--color-text-muted)] mb-2 font-medium uppercase tracking-wider">
                    Palette Preview
                  </p>
                  <div className="flex rounded-2xl overflow-hidden h-20 shadow-lg">
                    {colors.map((c, i) => (
                      <motion.div
                        key={`strip-${c}-${i}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          delay: 0.45 + i * 0.05,
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1] as const,
                        }}
                        className="flex-1 flex items-center justify-center origin-left"
                        style={{ backgroundColor: c }}
                      >
                        <span
                          className="font-mono text-xs font-semibold"
                          style={{
                            color: shouldUseWhiteText(c)
                              ? "rgba(255,255,255,0.85)"
                              : "rgba(0,0,0,0.6)",
                          }}
                        >
                          {c.toUpperCase()}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Favorites */}
        <div className="mt-10">
          <FavoritesPanel
            onSelect={(c) => {
              setColors(c);
              setCount(c.length);
              if (!imageUrl) setImageUrl(null);
            }}
            actionLabel="Use Colors"
          />
        </div>

        {/* Cross-links */}
        <div className="mt-12 mb-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Generate palettes →</Link>
            <Link href="/picker" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Pick colors →</Link>
            <Link href="/convert" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Convert formats →</Link>
            <Link href="/contrast" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Check contrast →</Link>
            <Link href="/colors" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Browse named colors →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
