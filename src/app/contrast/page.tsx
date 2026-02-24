"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  getContrastRatio,
  getWCAGLevel,
  suggestAccessibleColor,
} from "@/lib/color-contrast";
import { shouldUseWhiteText } from "@/lib/color-convert";
import { simulateColorBlind } from "@/lib/color-blind";
import { randomHex } from "@/lib/color-engine";
import type { ColorBlindType } from "@/lib/types";
import { FavoritesPanel } from "@/components/favorites-panel";

const colorBlindTypes: { type: ColorBlindType; label: string; desc: string }[] =
  [
    { type: "protanopia", label: "Protanopia", desc: "Red-blind" },
    { type: "deuteranopia", label: "Deuteranopia", desc: "Green-blind" },
    { type: "tritanopia", label: "Tritanopia", desc: "Blue-blind" },
    { type: "achromatopsia", label: "Achromatopsia", desc: "Total" },
  ];

function ColorPanel({
  label,
  color,
  onChange,
  onRandom,
}: {
  label: string;
  color: string;
  onChange: (c: string) => void;
  onRandom: () => void;
}) {
  return (
    <div className="surface rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          {label}
        </span>
        <button
          onClick={onRandom}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-overlay-6 transition-all duration-200 border border-transparent hover:border-[var(--color-border)]"
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
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
            <line x1="4" y1="4" x2="9" y2="9" />
          </svg>
          Random
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div
            className="w-16 h-16 rounded-xl border border-[var(--color-border)] shadow-lg transition-transform duration-200 group-hover:scale-105 cursor-pointer"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {/* Edit indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={shouldUseWhiteText(color) ? "white" : "black"}
              strokeWidth="2"
              strokeLinecap="round"
              style={{ opacity: 0.6 }}
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
        </div>
        <input
          type="text"
          value={color.toUpperCase()}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
          }}
          className="flex-1 px-4 py-3 rounded-xl bg-overlay-4 border border-[var(--color-border)] font-mono text-sm font-medium focus:outline-none focus:border-[var(--color-accent-purple)] focus:bg-overlay-6 transition-all duration-200"
        />
      </div>
    </div>
  );
}

export default function ContrastPage() {
  const [fg, setFg] = useState("#FFFFFF");
  const [bg, setBg] = useState("#1A1A2E");
  const [swapRotation, setSwapRotation] = useState(0);

  const ratio = useMemo(() => getContrastRatio(fg, bg), [fg, bg]);
  const wcag = useMemo(() => getWCAGLevel(ratio), [ratio]);

  const swap = () => {
    setSwapRotation((r) => r + 180);
    const tempFg = fg;
    setFg(bg);
    setBg(tempFg);
  };

  const suggest = () => {
    setFg(suggestAccessibleColor(fg, bg, 4.5));
  };

  // Determine contrast quality label
  const qualityLabel =
    ratio >= 7
      ? "Excellent"
      : ratio >= 4.5
      ? "Good"
      : ratio >= 3
      ? "Fair"
      : "Poor";
  const qualityColor =
    ratio >= 7
      ? "var(--color-success)"
      : ratio >= 4.5
      ? "var(--color-success)"
      : ratio >= 3
      ? "var(--color-warning)"
      : "var(--color-error)";

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-[880px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Color Contrast</span> Checker
          </h1>
          <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl leading-relaxed">
            Check color contrast ratios against WCAG 2.1 AA and AAA standards in real time. Auto-suggest accessible alternatives and simulate color blindness — free, no sign-up.
          </p>
        </motion.div>

        {/* Color panels with swap button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-10"
        >
          <ColorPanel
            label="Foreground"
            color={fg}
            onChange={setFg}
            onRandom={() => setFg(randomHex())}
          />

          {/* Swap button */}
          <motion.button
            onClick={swap}
            animate={{ rotate: swapRotation }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto p-3 rounded-xl bg-overlay-4 border border-[var(--color-border)] hover:bg-overlay-8 hover:border-[var(--color-border-strong)] transition-all duration-200 hover:scale-105 active:scale-95"
            title="Swap colors"
          >
            <svg
              width="20"
              height="20"
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
          </motion.button>

          <ColorPanel
            label="Background"
            color={bg}
            onChange={setBg}
            onRandom={() => setBg(randomHex())}
          />
        </motion.div>

        {/* Live preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-2xl overflow-hidden mb-10 border border-[var(--color-border)] shadow-xl"
        >
          <div
            className="p-10 sm:p-14 text-center no-transition"
            style={{ backgroundColor: bg }}
          >
            <p
              className="text-6xl sm:text-7xl font-bold mb-4 no-transition"
              style={{ color: fg }}
            >
              Aa
            </p>
            <p
              className="text-xl sm:text-2xl font-medium mb-2 no-transition"
              style={{ color: fg }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
            <p
              className="text-sm no-transition"
              style={{ color: fg, opacity: 0.85 }}
            >
              This is how small text appears with your chosen color combination.
              Make sure it remains legible at all sizes.
            </p>
          </div>
        </motion.div>

        {/* Contrast ratio display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="inline-flex flex-col items-center">
            <motion.p
              key={ratio.toFixed(2)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-7xl sm:text-8xl font-bold font-mono tracking-tight"
            >
              {ratio.toFixed(2)}
              <span className="text-3xl text-[var(--color-text-muted)]">
                :1
              </span>
            </motion.p>
            <div className="flex items-center gap-2 mt-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: qualityColor }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: qualityColor }}
              >
                {qualityLabel}
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">
                Contrast Ratio
              </span>
            </div>
          </div>
        </motion.div>

        {/* WCAG badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="grid grid-cols-2 gap-3 mb-10"
        >
          {[
            { pass: wcag.aa, label: "AA Normal Text", minRatio: "4.5:1" },
            { pass: wcag.aaLarge, label: "AA Large Text", minRatio: "3:1" },
            { pass: wcag.aaa, label: "AAA Normal Text", minRatio: "7:1" },
            { pass: wcag.aaaLarge, label: "AAA Large Text", minRatio: "4.5:1" },
          ].map(({ pass, label, minRatio }) => (
            <motion.div
              key={label}
              layout
              className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-all duration-200 ${
                pass
                  ? "border-[var(--color-success)]/20 bg-[var(--color-success)]/[0.05]"
                  : "border-[var(--color-error)]/20 bg-[var(--color-error)]/[0.05]"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  pass
                    ? "bg-[var(--color-success)] text-black"
                    : "bg-[var(--color-error)] text-white"
                }`}
              >
                {pass ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold">{label}</span>
                <span className="text-[11px] text-[var(--color-text-muted)]">
                  Min ratio: {minRatio}
                </span>
              </div>
              <span
                className={`ml-auto text-xs font-bold uppercase ${
                  pass
                    ? "text-[var(--color-success)]"
                    : "text-[var(--color-error)]"
                }`}
              >
                {pass ? "Pass" : "Fail"}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Suggest accessible alternative */}
        <AnimatePresence>
          {!wcag.aa && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-center mb-12"
            >
              <button
                onClick={suggest}
                className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
              >
                Suggest Accessible Alternative
              </button>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                Automatically adjusts the foreground color to meet AA compliance
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Favorites */}
        <div className="mb-10">
          <FavoritesPanel
            onSelect={(c) => {
              if (c.length >= 2) { setFg(c[0]); setBg(c[1]); }
              else if (c.length === 1) { setFg(c[0]); }
            }}
            actionLabel="Test Pair"
          />
        </div>

        {/* Color blind simulation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent-amber)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <h2 className="text-lg font-bold">Color Blind Preview</h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mb-5">
            See how your color combination appears under different color vision
            deficiencies.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {colorBlindTypes.map(({ type, label, desc }, i) => {
              const simFg = simulateColorBlind(fg, type);
              const simBg = simulateColorBlind(bg, type);
              const simRatio = getContrastRatio(simFg, simBg);
              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="surface rounded-xl overflow-hidden"
                >
                  <div
                    className="p-4 text-center no-transition"
                    style={{ backgroundColor: simBg }}
                  >
                    <p
                      className="text-2xl font-bold mb-0.5 no-transition"
                      style={{ color: simFg }}
                    >
                      Aa
                    </p>
                    <p
                      className="text-[10px] no-transition"
                      style={{ color: simFg, opacity: 0.8 }}
                    >
                      Sample text
                    </p>
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs font-semibold">{label}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">
                      {desc}
                    </p>
                    <p className="text-[10px] font-mono mt-1 font-medium">
                      <span
                        style={{
                          color:
                            simRatio >= 4.5
                              ? "var(--color-success)"
                              : simRatio >= 3
                              ? "var(--color-warning)"
                              : "var(--color-error)",
                        }}
                      >
                        {simRatio.toFixed(1)}:1
                      </span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Cross-links */}
        <div className="mt-12 mb-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Generate palettes →</Link>
            <Link href="/picker" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Pick colors visually →</Link>
            <Link href="/colors" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Browse named colors →</Link>
            <Link href="/convert" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Convert color formats →</Link>
            <Link href="/psychology" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">Color psychology →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
