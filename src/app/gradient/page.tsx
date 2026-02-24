"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { usePaletteStore } from "@/stores/palette-store";
import {
  generateGradientCSS,
  paletteToGradient,
  addGradientStop,
  removeGradientStop,
  reverseGradient,
} from "@/lib/gradient-engine";
import { randomHex } from "@/lib/color-engine";
import type { Gradient, GradientStop, GradientType } from "@/lib/types";
import { FavoritesPanel } from "@/components/favorites-panel";

const defaultStops: GradientStop[] = [
  { color: "#8B5CF6", position: 0 },
  { color: "#EC4899", position: 50 },
  { color: "#F59E0B", position: 100 },
];

const gradientTypes: { type: GradientType; label: string; icon: string }[] = [
  { type: "linear", label: "Linear", icon: "M4 12h16" },
  {
    type: "radial",
    label: "Radial",
    icon: "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0",
  },
  {
    type: "conic",
    label: "Conic",
    icon: "M12 12L12 4M12 12L20 12",
  },
];

export default function GradientPage() {
  const { colors: paletteColors } = usePaletteStore();

  const [gradient, setGradient] = useState<Gradient>({
    stops: defaultStops,
    type: "linear",
    angle: 135,
  });

  const css = useMemo(() => generateGradientCSS(gradient), [gradient]);

  const setType = useCallback((type: GradientType) => {
    setGradient((g) => ({ ...g, type }));
  }, []);

  const setAngle = useCallback((angle: number) => {
    setGradient((g) => ({ ...g, angle }));
  }, []);

  const updateStopColor = useCallback((index: number, color: string) => {
    setGradient((g) => ({
      ...g,
      stops: g.stops.map((s, i) => (i === index ? { ...s, color } : s)),
    }));
  }, []);

  const updateStopPosition = useCallback((index: number, position: number) => {
    setGradient((g) => ({
      ...g,
      stops: g.stops
        .map((s, i) =>
          i === index ? { ...s, position: Math.max(0, Math.min(100, position)) } : s
        )
        .sort((a, b) => a.position - b.position),
    }));
  }, []);

  const handleAddStop = useCallback(() => {
    const newColor = randomHex();
    // Place new stop at midpoint of largest gap
    const sorted = [...gradient.stops].sort((a, b) => a.position - b.position);
    let maxGap = 0;
    let midPos = 50;
    for (let i = 0; i < sorted.length - 1; i++) {
      const gap = sorted[i + 1].position - sorted[i].position;
      if (gap > maxGap) {
        maxGap = gap;
        midPos = (sorted[i].position + sorted[i + 1].position) / 2;
      }
    }
    setGradient((g) => addGradientStop(g, newColor, midPos));
  }, [gradient.stops]);

  const handleRemoveStop = useCallback((index: number) => {
    setGradient((g) => removeGradientStop(g, index));
  }, []);

  const handleReverse = useCallback(() => {
    setGradient((g) => reverseGradient(g));
  }, []);

  const handleUsePalette = useCallback(() => {
    const result = paletteToGradient(paletteColors, gradient.type, gradient.angle);
    setGradient(result);
    toast.success("Palette colors applied!");
  }, [paletteColors, gradient.type, gradient.angle]);

  const handleCopyCSS = useCallback(() => {
    navigator.clipboard.writeText(`background: ${css};`);
    toast.success("CSS copied!");
  }, [css]);

  const handleRandomize = useCallback(() => {
    const count = 2 + Math.floor(Math.random() * 3); // 2-4 stops
    const newStops: GradientStop[] = Array.from({ length: count }, (_, i) => ({
      color: randomHex(),
      position: count === 1 ? 50 : (i / (count - 1)) * 100,
    }));
    setGradient((g) => ({ ...g, stops: newStops }));
  }, []);

  const showAngle = gradient.type === "linear" || gradient.type === "conic";

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
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="gradient-text">Gradient</span> Maker
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-xl">
            Create beautiful CSS gradients with full control over stops, type,
            and direction. Copy the CSS with one click.
          </p>
        </motion.div>

        {/* Gradient preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-2"
        >
          <div
            className="w-full h-56 sm:h-72 rounded-2xl shadow-xl border border-[var(--color-border)] no-transition"
            style={{ background: css }}
          />
        </motion.div>

        {/* Stop markers bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="relative h-10 mb-8 mx-4"
        >
          {gradient.stops.map((stop, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 top-0 flex flex-col items-center"
              style={{ left: `${stop.position}%` }}
            >
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-lg cursor-default"
                style={{ backgroundColor: stop.color }}
              />
              <span className="text-[9px] font-mono text-[var(--color-text-muted)] mt-0.5">
                {Math.round(stop.position)}%
              </span>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Left: Controls */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-6"
          >
            {/* Type selector */}
            <div className="surface rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                Gradient Type
              </h2>
              <div className="flex gap-2">
                {gradientTypes.map(({ type, label, icon }) => (
                  <button
                    key={type}
                    onClick={() => setType(type)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                      gradient.type === type
                        ? "bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] text-white shadow-lg shadow-purple-500/20"
                        : "bg-overlay-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-8"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d={icon} />
                    </svg>
                    {label}
                  </button>
                ))}
              </div>

              {/* Angle slider */}
              <AnimatePresence>
                {showAngle && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                          Angle
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            max={360}
                            value={gradient.angle}
                            onChange={(e) =>
                              setAngle(
                                Math.max(0, Math.min(360, Number(e.target.value)))
                              )
                            }
                            className="w-16 px-2 py-1.5 rounded-lg bg-overlay-4 border border-[var(--color-border)] font-mono text-xs text-center focus:outline-none focus:border-[var(--color-accent-purple)] transition-colors"
                          />
                          <span className="text-xs text-[var(--color-text-muted)]">
                            deg
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        value={gradient.angle}
                        onChange={(e) => setAngle(Number(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-pink), var(--color-accent-amber))`,
                        }}
                      />
                      {/* Quick angle presets */}
                      <div className="flex gap-2 mt-3">
                        {[0, 45, 90, 135, 180, 270].map((a) => (
                          <button
                            key={a}
                            onClick={() => setAngle(a)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
                              gradient.angle === a
                                ? "bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)]"
                                : "bg-overlay-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-overlay-8"
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Color stops */}
            <div className="surface rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Color Stops
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReverse}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-6 transition-all border border-transparent hover:border-[var(--color-border)]"
                    title="Reverse gradient"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <polyline points="7 16 3 12 7 8" />
                      <polyline points="17 8 21 12 17 16" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                    </svg>
                    Reverse
                  </button>
                  <button
                    onClick={handleAddStop}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[var(--color-accent-purple)] hover:opacity-90 transition-opacity"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Stop
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {gradient.stops.map((stop, i) => (
                    <motion.div
                      key={`stop-${i}-${stop.color}`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-overlay-2 border border-[var(--color-border-subtle)]"
                    >
                      {/* Color picker */}
                      <div className="relative group">
                        <div
                          className="w-10 h-10 rounded-lg border border-[var(--color-border)] shadow cursor-pointer transition-transform group-hover:scale-105"
                          style={{ backgroundColor: stop.color }}
                        />
                        <input
                          type="color"
                          value={stop.color}
                          onChange={(e) => updateStopColor(i, e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>

                      {/* Hex input */}
                      <input
                        type="text"
                        value={stop.color.toUpperCase()}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (/^#[0-9a-fA-F]{0,6}$/.test(v))
                            updateStopColor(i, v);
                        }}
                        className="w-24 px-3 py-2 rounded-lg bg-overlay-4 border border-[var(--color-border)] font-mono text-xs font-medium focus:outline-none focus:border-[var(--color-accent-purple)] transition-colors"
                      />

                      {/* Position input */}
                      <div className="flex items-center gap-1.5 flex-1">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={stop.position}
                          onChange={(e) =>
                            updateStopPosition(i, Number(e.target.value))
                          }
                          className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(90deg, ${stop.color}40, ${stop.color})`,
                          }}
                        />
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={Math.round(stop.position)}
                          onChange={(e) =>
                            updateStopPosition(i, Number(e.target.value))
                          }
                          className="w-14 px-2 py-1.5 rounded-lg bg-overlay-4 border border-[var(--color-border)] font-mono text-[10px] text-center focus:outline-none focus:border-[var(--color-accent-purple)] transition-colors"
                        />
                        <span className="text-[10px] text-[var(--color-text-muted)]">
                          %
                        </span>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveStop(i)}
                        disabled={gradient.stops.length <= 2}
                        className={`p-2 rounded-lg transition-all ${
                          gradient.stops.length <= 2
                            ? "opacity-20 cursor-not-allowed"
                            : "text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/[0.08]"
                        }`}
                        title="Remove stop"
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
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right: CSS Output + Actions */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="space-y-5"
          >
            {/* CSS Output */}
            <div className="surface rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  CSS Code
                </h2>
                <button
                  onClick={handleCopyCSS}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-accent-purple)] hover:bg-[var(--color-accent-purple)]/[0.08] transition-all"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </button>
              </div>
              <div className="rounded-xl bg-overlay-4 border border-[var(--color-border-subtle)] p-4 overflow-x-auto">
                <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  <span className="text-[var(--color-accent-purple)]">
                    background
                  </span>
                  <span className="text-[var(--color-text-muted)]">: </span>
                  <span className="text-[var(--color-accent-pink)]">{css}</span>
                  <span className="text-[var(--color-text-muted)]">;</span>
                </pre>
              </div>
            </div>

            {/* Mini preview with different shapes */}
            <div className="surface rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                Preview Shapes
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <div
                  className="aspect-square rounded-2xl no-transition"
                  style={{ background: css }}
                />
                <div
                  className="aspect-square rounded-full no-transition"
                  style={{ background: css }}
                />
                <div
                  className="aspect-square rounded-lg no-transition"
                  style={{
                    background: css,
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                />
              </div>
            </div>

            {/* Quick actions */}
            <div className="space-y-2">
              <button
                onClick={handleUsePalette}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Use Palette Colors
              </button>

              <button
                onClick={handleRandomize}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] hover:bg-overlay-4 transition-all duration-200"
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
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
                Randomize
              </button>

              <button
                onClick={handleCopyCSS}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] hover:bg-overlay-4 transition-all duration-200"
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
                Copy CSS
              </button>
            </div>

            {/* Current palette mini preview */}
            <div className="surface rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                Current Palette
              </h2>
              <div className="flex rounded-xl overflow-hidden h-8">
                {paletteColors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-2">
                Click &quot;Use Palette Colors&quot; to apply these as gradient stops.
              </p>
            </div>

            {/* Favorites */}
            <FavoritesPanel
              onSelect={(colors) => {
                const stops: GradientStop[] = colors.map((color, i) => ({
                  color,
                  position: colors.length === 1 ? 50 : (i / (colors.length - 1)) * 100,
                }));
                setGradient((g) => ({ ...g, stops }));
              }}
              actionLabel="Use as Stops"
            />
          </motion.div>

          {/* Cross-links */}
          <div className="mt-12 mb-6">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Generate palettes →</Link>
              <Link href="/picker" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Pick colors →</Link>
              <Link href="/tailwind" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Tailwind CSS colors →</Link>
              <Link href="/convert" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Convert formats →</Link>
              <Link href="/brands" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Brand palettes →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
