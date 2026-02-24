"use client";
import { Suspense, useEffect, useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { usePaletteStore } from "@/stores/palette-store";
import { useSavedStore } from "@/stores/saved-store";
import { shouldUseWhiteText, formatRgb, formatHsl } from "@/lib/color-convert";
import { getColorName } from "@/lib/color-names";
import { getShades, generateHarmony, generateSmartPalette } from "@/lib/color-engine";
import type { PaletteMood } from "@/lib/color-engine";
import { ExportModal } from "@/components/export-modal";
import { FavoritesPanel } from "@/components/favorites-panel";
import { useSearchParams } from "next/navigation";
import { decodePalette, encodePalette } from "@/lib/palette-utils";
import type { GradientType, ColorBlindType } from "@/lib/types";
import { paletteToGradient, generateGradientCSS } from "@/lib/gradient-engine";
import { simulatePalette } from "@/lib/color-blind";

// ─── Constants ──────────────────────────────────────────────────────────────

const HARMONY_TYPES = [
  { value: "random", label: "Random" },
  { value: "complementary", label: "Complementary" },
  { value: "analogous", label: "Analogous" },
  { value: "triadic", label: "Triadic" },
  { value: "split-complementary", label: "Split Comp" },
  { value: "tetradic", label: "Tetradic" },
  { value: "monochromatic", label: "Mono" },
] as const;

const MOOD_TYPES = [
  { value: "none", label: "Any Mood" },
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" },
  { value: "pastel", label: "Pastel" },
  { value: "neon", label: "Neon" },
  { value: "earthy", label: "Earthy" },
] as const;

const GRADIENT_TYPES: { value: GradientType; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "radial", label: "Radial" },
  { value: "conic", label: "Conic" },
];

// ─── Icons ──────────────────────────────────────────────────────────────────

function IconCopy({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>;
}
function IconLock({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
}
function IconUnlock({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 8 0" /></svg>;
}
function IconShades({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 2v20" /><path d="M2 12h10" /></svg>;
}
function IconX({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}
function IconUndo({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>;
}
function IconRedo({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>;
}
function IconPlus({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
}
function IconMinus({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>;
}
function IconBookmark({ size = 16, filled = false }: { size?: number; filled?: boolean }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>;
}
function IconGradient({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="3" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" /></svg>;
}
function IconLayout({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>;
}
function IconChevron({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;
}
function IconShare({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>;
}
function IconEye({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
}

const CB_MODES: { value: ColorBlindType | "none"; label: string }[] = [
  { value: "none", label: "Normal Vision" },
  { value: "protanopia", label: "Protanopia (Red)" },
  { value: "deuteranopia", label: "Deuteranopia (Green)" },
  { value: "tritanopia", label: "Tritanopia (Blue)" },
  { value: "achromatopsia", label: "Achromatopsia (Mono)" },
];

// ─── Color Column ───────────────────────────────────────────────────────────

function ColorColumn({
  color, index, locked, onToggleLock, onCopy, onSetColor, onRemove, total,
}: {
  color: string; index: number; locked: boolean; total: number;
  onToggleLock: () => void; onCopy: () => void; onSetColor: (hex: string) => void; onRemove: () => void;
}) {
  const [showShades, setShowShades] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const white = shouldUseWhiteText(color);
  const textColor = white ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.82)";
  const textMuted = white ? "rgba(255,255,255,0.50)" : "rgba(0,0,0,0.40)";
  const btnBg = white ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.09)";
  const btnBgHover = white ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.14)";
  const shades = getShades(color, 9);
  const name = getColorName(color);

  const copyFormat = (format: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedFormat(format);
    toast.success(`Copied ${value}`, { icon: null });
    setTimeout(() => setCopiedFormat(null), 1200);
  };

  const startEdit = () => {
    setEditValue(color.replace("#", ""));
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 10);
  };

  const commitEdit = () => {
    setEditing(false);
    const v = editValue.trim().replace("#", "");
    if (/^[0-9a-fA-F]{6}$/.test(v)) onSetColor("#" + v.toLowerCase());
  };

  return (
    <motion.div
      layout
      className="relative flex-1 flex flex-col items-center justify-center cursor-pointer select-none min-h-[160px] md:min-h-0 rounded-2xl overflow-hidden group/col"
      style={{ backgroundColor: color }}
      animate={{ backgroundColor: color }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShowShades(false); }}
      data-color-index={index}
    >
      {/* Locked badge */}
      <AnimatePresence>
        {locked && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-4 left-1/2 -translate-x-1/2" style={{ color: textColor }}>
            <div className="p-1.5 rounded-full" style={{ backgroundColor: btnBg }}><IconLock size={12} /></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Color info */}
      <div className="text-center z-10 px-3">
        {editing ? (
          <div className="flex items-center justify-center mb-1.5">
            <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: textMuted }}>#</span>
            <input ref={inputRef} value={editValue}
              onChange={(e) => setEditValue(e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6))}
              onBlur={commitEdit}
              onKeyDown={(e) => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditing(false); }}
              className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-wider bg-transparent outline-none w-[7ch] text-center uppercase"
              style={{ color: textColor }} maxLength={6} />
          </div>
        ) : (
          <motion.p key={color} initial={{ opacity: 0.7, y: -2 }} animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xl sm:text-2xl md:text-4xl font-bold tracking-wider mb-1 cursor-text"
            style={{ color: textColor }} onClick={(e) => { e.stopPropagation(); startEdit(); }}>
            {color.toUpperCase()}
          </motion.p>
        )}
        <p className="text-[12px] sm:text-[13px] font-medium mb-2.5 tracking-wide" style={{ color: textMuted }}>{name}</p>

        {/* Quick-copy format buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 justify-center">
          {([
            { label: "HEX", value: color.toUpperCase() },
            { label: "RGB", value: formatRgb(color) },
            { label: "HSL", value: formatHsl(color) },
          ]).map((fmt) => (
            <button
              key={fmt.label}
              onClick={(e) => { e.stopPropagation(); copyFormat(fmt.label, fmt.value); }}
              className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-mono font-semibold transition-all duration-150 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: copiedFormat === fmt.label ? (white ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)") : btnBg,
                color: copiedFormat === fmt.label ? textColor : textMuted,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = btnBgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = copiedFormat === fmt.label ? (white ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.18)") : btnBg; }}
              title={`Copy ${fmt.label}: ${fmt.value}`}
            >
              {copiedFormat === fmt.label ? "Copied!" : fmt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons — always visible on mobile, hover on desktop */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 transition-all duration-200 md:opacity-0 md:translate-y-2 md:group-hover/col:opacity-100 md:group-hover/col:translate-y-0"
        style={{ pointerEvents: "auto" }}>
        {([
          { label: "Copy", icon: <IconCopy />, action: onCopy },
          { label: locked ? "Unlock" : "Lock", icon: locked ? <IconLock /> : <IconUnlock />, action: onToggleLock },
          { label: "Shades", icon: <IconShades />, action: () => setShowShades(!showShades) },
          ...(total > 2 ? [{ label: "Remove", icon: <IconX />, action: onRemove }] : []),
        ] as const).map((btn) => (
          <button key={btn.label} onClick={(e) => { e.stopPropagation(); btn.action(); }}
            className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-150 hover:scale-110 active:scale-95"
            style={{ backgroundColor: btnBg, color: textColor }} title={btn.label}>
            {btn.icon}
          </button>
        ))}
      </div>

      {/* Shade picker */}
      <AnimatePresence>
        {showShades && (
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex rounded-2xl overflow-hidden shadow-2xl z-20"
            style={{ border: `1px solid ${white ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}` }}>
            {shades.map((s, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); onSetColor(s); setShowShades(false); }}
                className="w-8 h-10 sm:w-9 sm:h-12 md:w-11 md:h-16 hover:scale-y-110 transition-transform duration-150 relative group/shade"
                style={{ backgroundColor: s }}>
                <span className="absolute inset-x-0 bottom-0 text-[8px] font-mono opacity-0 group-hover/shade:opacity-100 transition-opacity text-center pb-0.5"
                  style={{ color: shouldUseWhiteText(s) ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }}>
                  {s.toUpperCase().slice(0, 4)}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Gradient View ──────────────────────────────────────────────────────────

function GradientView({
  colors, gradientType, gradientAngle, onSetGradientType, onSetGradientAngle,
}: {
  colors: string[]; gradientType: GradientType; gradientAngle: number;
  onSetGradientType: (t: GradientType) => void; onSetGradientAngle: (a: number) => void;
}) {
  const gradient = paletteToGradient(colors, gradientType, gradientAngle);
  const css = generateGradientCSS(gradient);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`background: ${css};`);
    setCopied(true);
    toast.success("Gradient CSS copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
      <div className="flex-1 relative rounded-2xl overflow-hidden m-4 md:m-6" style={{ background: css }}>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
          {colors.map((c, i) => (
            <div key={i} className="w-7 h-7 rounded-full border-2 border-white/50 shadow-lg cursor-pointer hover:scale-125 transition-transform" style={{ backgroundColor: c }} title={c.toUpperCase()} />
          ))}
        </div>
      </div>
      <div className="glass border-t border-[var(--color-border)] px-5 py-3.5">
        <div className="flex items-center gap-4 flex-wrap max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-text-muted)] font-medium">Type</span>
            <div className="flex rounded-xl overflow-hidden border border-[var(--color-border)]">
              {GRADIENT_TYPES.map((t) => (
                <button key={t.value} onClick={() => onSetGradientType(t.value)}
                  className={`px-3.5 py-2 text-xs font-medium transition-colors ${gradientType === t.value ? "bg-overlay-10 text-[var(--color-text)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-4"}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          {gradientType !== "radial" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-text-muted)] font-medium">Angle</span>
              <input type="range" min="0" max="360" value={gradientAngle} onChange={(e) => onSetGradientAngle(Number(e.target.value))} className="w-24 accent-[var(--color-accent-purple)]" />
              <span className="text-xs font-mono text-[var(--color-text-secondary)] w-8">{gradientAngle}&deg;</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <code className="flex-1 text-xs font-mono text-[var(--color-text-secondary)] truncate bg-overlay-4 rounded-xl px-4 py-2.5 border border-[var(--color-border-subtle)]">{css}</code>
              <button onClick={handleCopy} className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-overlay-8 hover:bg-overlay-10 text-[var(--color-text)] transition-colors shrink-0">
                {copied ? "Copied!" : "Copy CSS"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Visualizer Sidebar ─────────────────────────────────────────────────────

function VisualizerSidebar({ colors, onClose }: { colors: string[]; onClose: () => void }) {
  const c = useMemo(() => {
    const base = [...colors];
    while (base.length < 5) base.push(base[base.length - 1] || "#888888");
    return base;
  }, [colors]);

  return (
    <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 340, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
      className="relative border-l border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden flex flex-col shrink-0">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)]">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Preview</span>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-overlay-6 text-[var(--color-text-muted)] transition-colors"><IconX size={12} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Dashboard mockup */}
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)]" style={{ backgroundColor: c[0] + "1a" }}>
          <div className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-3 pt-2.5 pb-1">Dashboard</div>
          <div className="px-3 pb-3">
            <div className="h-5 rounded-lg mb-2 flex items-center px-2 gap-1" style={{ backgroundColor: c[0] }}>
              <div className="w-6 h-2 rounded-sm" style={{ backgroundColor: c[1] }} />
              <div className="flex-1" />
              <div className="w-3 h-2 rounded-sm opacity-60" style={{ backgroundColor: c[2] }} />
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {[c[1], c[2], c[3]].map((col, i) => (
                <div key={i} className="rounded-lg p-1.5" style={{ backgroundColor: col + "22" }}>
                  <div className="h-1.5 w-3/4 rounded-sm mb-1" style={{ backgroundColor: col }} />
                  <div className="h-6 rounded-sm" style={{ backgroundColor: col + "33" }} />
                </div>
              ))}
            </div>
            <div className="h-10 rounded-lg flex items-end gap-0.5 p-1" style={{ backgroundColor: c[4] + "15" }}>
              {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: c[i % colors.length], opacity: 0.7 }} />
              ))}
            </div>
          </div>
        </div>
        {/* Landing mockup */}
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)]" style={{ backgroundColor: c[0] + "1a" }}>
          <div className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-3 pt-2.5 pb-1">Landing</div>
          <div className="px-3 pb-3">
            <div className="rounded-lg p-2 mb-2" style={{ background: `linear-gradient(135deg, ${c[0]}, ${c[1]})` }}>
              <div className="h-2 w-2/3 rounded-sm mb-1" style={{ backgroundColor: shouldUseWhiteText(c[0]) ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)" }} />
              <div className="h-1.5 w-1/2 rounded-sm mb-2" style={{ backgroundColor: shouldUseWhiteText(c[0]) ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)" }} />
              <div className="h-4 w-14 rounded-lg" style={{ backgroundColor: c[2] }} />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[c[2], c[3]].map((col, i) => (
                <div key={i} className="rounded-lg p-1.5" style={{ backgroundColor: col + "18" }}>
                  <div className="w-4 h-4 rounded-lg mb-1" style={{ backgroundColor: col }} />
                  <div className="h-1 w-full rounded-sm mb-0.5" style={{ backgroundColor: col + "44" }} />
                  <div className="h-1 w-2/3 rounded-sm" style={{ backgroundColor: col + "33" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Dropdown ───────────────────────────────────────────────────────────────

function Dropdown({ label, value, options, onChange }: {
  label: string; value: string; options: readonly { value: string; label: string }[]; onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-all bg-overlay-3 hover:bg-overlay-6">
        <span className="text-[var(--color-text-muted)] hidden sm:inline">{label}:</span>
        <span>{selected?.label || value}</span>
        <IconChevron />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="absolute bottom-full mb-2 left-0 z-40 min-w-[150px] rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl shadow-black/40 overflow-hidden">
            {options.map((opt) => (
              <button key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full px-4 py-2.5 text-left text-xs font-medium transition-colors ${value === opt.value ? "bg-overlay-8 text-[var(--color-text)]" : "text-[var(--color-text-secondary)] hover:bg-overlay-4 hover:text-[var(--color-text)]"}`}>
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Toolbar Button ─────────────────────────────────────────────────────────

function ToolbarBtn({ onClick, title, children, active, className = "" }: {
  onClick: () => void; title: string; children: React.ReactNode; active?: boolean; className?: string;
}) {
  return (
    <button onClick={onClick} title={title}
      className={`p-2.5 rounded-xl transition-all ${active ? "bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)] border border-[var(--color-accent-purple)]/30" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-6"} ${className}`}>
      {children}
    </button>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export function GenerateClient() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center pt-14">
        <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
          <div className="w-5 h-5 border-2 border-[var(--color-accent-purple)] border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    }>
      <GenerateContent />
    </Suspense>
  );
}

function GenerateContent() {
  const { colors, locked, generate, setColor, toggleLock, addColor, removeColor, undo, redo, setColors } = usePaletteStore();
  const { palettes: savedPalettes, save, remove } = useSavedStore();

  const [exportOpen, setExportOpen] = useState(false);
  const [harmony, setHarmony] = useState("random");
  const [mood, setMood] = useState("none");
  const [gradientMode, setGradientMode] = useState(false);
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [gradientAngle, setGradientAngle] = useState(90);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [cbMode, setCbMode] = useState<ColorBlindType | "none">("none");

  const searchParams = useSearchParams();

  // Compute display colors (normal or color-blind simulated)
  const displayColors = useMemo(
    () => cbMode === "none" ? colors : simulatePalette(colors, cbMode),
    [colors, cbMode]
  );

  const sharePalette = useCallback(() => {
    const url = `${window.location.origin}/generate?colors=${encodePalette(colors)}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied!");
  }, [colors]);

  useEffect(() => {
    const urlColors = searchParams.get("colors");
    if (urlColors) {
      try {
        const decoded = decodePalette(urlColors);
        if (decoded.length >= 2) setColors(decoded);
      } catch { /* ignore */ }
    }
  }, [searchParams, setColors]);

  const smartGenerate = useCallback(() => {
    if (mood !== "none") {
      const newColors = generateSmartPalette(colors.length, mood as PaletteMood);
      const merged = colors.map((c, i) => locked[i] ? c : (newColors[i] || c));
      setColors(merged);
    } else if (harmony !== "random") {
      const unlockedIdx = colors.findIndex((_, i) => !locked[i]);
      if (unlockedIdx >= 0) {
        const harmonyColors = generateHarmony(colors[unlockedIdx], harmony as "complementary" | "analogous" | "triadic" | "split-complementary" | "tetradic" | "monochromatic");
        const filled = colors.map((c, i) => locked[i] ? c : (harmonyColors[i % harmonyColors.length] || c));
        setColors(filled);
      } else { generate(); }
    } else { generate(); }
  }, [colors, locked, harmony, mood, generate, setColors]);

  const copyColor = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex);
    toast.success(`Copied ${hex.toUpperCase()}`, { icon: null });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;
      if (exportOpen) return;

      if (e.code === "Space") { e.preventDefault(); smartGenerate(); }
      if (e.key === "e" || e.key === "E") { if (!e.ctrlKey && !e.metaKey) setExportOpen(true); }
      if (e.key === "g" || e.key === "G") { if (!e.ctrlKey && !e.metaKey) setGradientMode((p) => !p); }
      if (e.key === "v" || e.key === "V") { if (!e.ctrlKey && !e.metaKey) setShowVisualizer((p) => !p); }
      if (e.key === "f" || e.key === "F") { if (!e.ctrlKey && !e.metaKey) setShowFavorites((p) => !p); }
      if (e.ctrlKey && e.key === "z") { e.preventDefault(); undo(); }
      if (e.ctrlKey && e.key === "y") { e.preventDefault(); redo(); }

      const hoveredEls = document.querySelectorAll("[data-color-index]:hover");
      if (hoveredEls.length > 0) {
        const idx = Number(hoveredEls[0].getAttribute("data-color-index"));
        if ((e.key === "l" || e.key === "L") && !e.ctrlKey) toggleLock(idx);
        if ((e.key === "c" || e.key === "C") && !e.ctrlKey) copyColor(colors[idx]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [smartGenerate, undo, redo, toggleLock, copyColor, colors, exportOpen]);

  return (
    <div className="h-[100dvh] flex flex-col pt-14">
      <h1 className="sr-only">Color Palette Generator — Free Online Tool</h1>
      {/* Main content */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto md:overflow-hidden">
          <AnimatePresence mode="wait">
            {gradientMode ? (
              <GradientView key="gradient" colors={displayColors} gradientType={gradientType} gradientAngle={gradientAngle}
                onSetGradientType={setGradientType} onSetGradientAngle={setGradientAngle} />
            ) : (
              <motion.div key="columns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 flex flex-col md:flex-row p-3 md:p-5 gap-2 md:gap-3 md:min-h-0">
                {displayColors.map((color, i) => (
                  <ColorColumn key={`${i}-${colors.length}`} color={color} index={i} locked={locked[i]} total={colors.length}
                    onToggleLock={() => toggleLock(i)} onCopy={() => copyColor(colors[i])}
                    onSetColor={(hex) => setColor(i, hex)} onRemove={() => removeColor(i)} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showVisualizer && !gradientMode && (
            <VisualizerSidebar key="visualizer" colors={colors} onClose={() => setShowVisualizer(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFavorites && (
            <motion.div
              key="favorites-sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative border-l border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden flex flex-col shrink-0"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)]">
                <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Favorites</span>
                <button onClick={() => setShowFavorites(false)} className="p-1.5 rounded-lg hover:bg-overlay-6 text-[var(--color-text-muted)] transition-colors"><IconX size={12} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FavoritesPanel onSelect={(c) => setColors(c)} actionLabel="Load" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Color blindness mode banner */}
      <AnimatePresence>
        {cbMode !== "none" && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="bg-amber-500/10 border-t border-amber-500/20 px-4 py-2 text-center overflow-hidden">
            <span className="text-xs font-medium text-amber-400">
              Simulating {CB_MODES.find(m => m.value === cbMode)?.label} — colors shown are approximations
            </span>
            <button onClick={() => setCbMode("none")} className="ml-3 text-xs text-amber-400/70 hover:text-amber-400 underline">Reset</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom Toolbar ── centered, clean */}
      <div className="glass border-t border-[var(--color-border)] px-4 sm:px-6 py-3">
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-[1200px] mx-auto">
          {/* Harmony + Mood */}
          <div className="flex items-center gap-1.5">
            <Dropdown label="Harmony" value={harmony} options={HARMONY_TYPES} onChange={setHarmony} />
            <Dropdown label="Mood" value={mood} options={MOOD_TYPES} onChange={setMood} />
          </div>

          <div className="w-px h-6 bg-overlay-6" />

          {/* Undo / Redo */}
          <ToolbarBtn onClick={undo} title="Undo (Ctrl+Z)"><IconUndo /></ToolbarBtn>
          <ToolbarBtn onClick={redo} title="Redo (Ctrl+Y)"><IconRedo /></ToolbarBtn>

          <div className="w-px h-6 bg-overlay-6" />

          {/* ★ Generate — center piece */}
          <button onClick={smartGenerate}
            className="group relative px-7 py-2.5 rounded-2xl text-sm font-semibold text-white overflow-hidden transition-all hover:shadow-lg hover:shadow-[var(--color-accent-purple)]/25 hover:scale-[1.03] active:scale-[0.97]">
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
            <span className="relative flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
              Generate
            </span>
          </button>
          <span className="hidden lg:inline text-[10px] text-[var(--color-text-muted)] font-mono -ml-1">Space</span>

          <div className="w-px h-6 bg-overlay-6" />

          {/* +/- color count */}
          {colors.length > 2 && (
            <ToolbarBtn onClick={() => removeColor(colors.length - 1)} title="Remove Color"><IconMinus /></ToolbarBtn>
          )}
          <span className="text-xs font-mono font-semibold text-[var(--color-text-muted)] px-1.5 py-1 rounded-lg bg-overlay-3 min-w-[24px] text-center">{colors.length}</span>
          {colors.length < 10 && (
            <ToolbarBtn onClick={addColor} title="Add Color"><IconPlus /></ToolbarBtn>
          )}

          <div className="w-px h-6 bg-overlay-6" />

          {/* Tools */}
          <ToolbarBtn onClick={() => setGradientMode((p) => !p)} title="Gradient Mode (G)" active={gradientMode}><IconGradient /></ToolbarBtn>
          <div className="hidden sm:block">
            <ToolbarBtn onClick={() => setShowVisualizer((p) => !p)} title="Visualizer (V)" active={showVisualizer}><IconLayout /></ToolbarBtn>
          </div>
          <ToolbarBtn onClick={() => setShowFavorites((p) => !p)} title="Favorites (F)" active={showFavorites}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={showFavorites ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </ToolbarBtn>

          <div className="w-px h-6 bg-overlay-6" />

          {/* Save + Export */}
          {(() => {
            const key = colors.map(c => c.toLowerCase()).sort().join(",");
            const isSaved = savedPalettes.some(p => p.colors.map(c => c.toLowerCase()).sort().join(",") === key);
            return (
              <ToolbarBtn onClick={() => {
                const existing = savedPalettes.find(p => p.colors.map(c => c.toLowerCase()).sort().join(",") === key);
                if (existing) {
                  remove(existing.id);
                  toast.success("Palette unsaved");
                } else {
                  save(colors);
                  toast.success("Palette saved!");
                }
              }} title={isSaved ? "Unsave Palette" : "Save Palette"}><IconBookmark filled={isSaved} /></ToolbarBtn>
            );
          })()}

          <button onClick={() => setExportOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-overlay-4 transition-all"
            title="Export (E)">
            Export
          </button>

          <ToolbarBtn onClick={sharePalette} title="Share Palette"><IconShare /></ToolbarBtn>

          <div className="w-px h-6 bg-overlay-6" />

          {/* Color blindness sim */}
          <Dropdown label="Vision" value={cbMode} options={CB_MODES} onChange={(v) => setCbMode(v as ColorBlindType | "none")} />
        </div>
      </div>

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} colors={colors} />
    </div>
  );
}
