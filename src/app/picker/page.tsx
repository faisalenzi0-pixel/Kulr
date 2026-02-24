"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  hexToRgb, rgbToHex, rgbToHsl, shouldUseWhiteText,
  hsbToRgb, rgbToHsb, rgbToCmyk, rgbToHwb,
} from "@/lib/color-convert";
import { getColorName } from "@/lib/color-names";
import { getContrastRatio, getWCAGLevel } from "@/lib/color-contrast";
import { simulateColorBlind } from "@/lib/color-blind";
import { findNearestTailwind } from "@/lib/tailwind-colors";
import type { ColorBlindType } from "@/lib/types";

function copyText(text: string, label: string) {
  navigator.clipboard.writeText(text);
  toast.success(`Copied ${label}`);
}

// ─── HSB Canvas (Photoshop-style) ──────────────────────────────────────────

function HSBCanvas({
  hue, sat, val, onPick,
}: {
  hue: number; sat: number; val: number;
  onPick: (s: number, v: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;

    // Fast gradient overlay technique (3 fills instead of 86K pixel ops)
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.fillRect(0, 0, w, h);
    const whiteGrad = ctx.createLinearGradient(0, 0, w, 0);
    whiteGrad.addColorStop(0, "rgba(255,255,255,1)");
    whiteGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = whiteGrad;
    ctx.fillRect(0, 0, w, h);
    const blackGrad = ctx.createLinearGradient(0, 0, 0, h);
    blackGrad.addColorStop(0, "rgba(0,0,0,0)");
    blackGrad.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = blackGrad;
    ctx.fillRect(0, 0, w, h);
  }, [hue]);

  useEffect(() => { draw(); }, [draw]);

  const pick = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    onPick(x, 1 - y);
  }, [onPick]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { if (dragging.current) pick(e.clientX, e.clientY); };
    const handleUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [pick]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (dragging.current && e.touches[0]) {
        e.preventDefault();
        pick(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => { dragging.current = false; };
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pick]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] cursor-crosshair shadow-lg"
      onMouseDown={(e) => { dragging.current = true; pick(e.clientX, e.clientY); }}
      onTouchStart={(e) => {
        dragging.current = true;
        if (e.touches[0]) pick(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      <canvas ref={canvasRef} width={480} height={320} className="w-full h-56 sm:h-64 md:h-72 block" />
      <div
        className="absolute w-5 h-5 rounded-full border-[2.5px] border-white shadow-[0_0_0_1.5px_rgba(0,0,0,0.25),0_2px_10px_rgba(0,0,0,0.4)] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-[50ms]"
        style={{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%` }}
      />
    </div>
  );
}

// ─── Hue Strip ─────────────────────────────────────────────────────────────

function HueStrip({ hue, onChange }: { hue: number; onChange: (h: number) => void }) {
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const pick = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onChange(Math.round(x * 360));
  }, [onChange]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { if (dragging.current) pick(e.clientX); };
    const handleUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [pick]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (dragging.current && e.touches[0]) { e.preventDefault(); pick(e.touches[0].clientX); }
    };
    const handleTouchEnd = () => { dragging.current = false; };
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pick]);

  return (
    <div
      ref={containerRef}
      className="relative h-5 rounded-full cursor-pointer mt-3 shadow-sm"
      style={{
        background: "linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
      }}
      onMouseDown={(e) => { dragging.current = true; pick(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; if (e.touches[0]) pick(e.touches[0].clientX); }}
    >
      <div
        className="absolute top-1/2 w-6 h-6 rounded-full border-[2.5px] border-white shadow-[0_0_0_1.5px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.3)] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[left] duration-[50ms]"
        style={{ left: `${(hue / 360) * 100}%` }}
      />
    </div>
  );
}

// ─── Format Row ────────────────────────────────────────────────────────────

function FormatRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-[var(--color-border-subtle)] last:border-0 group">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] w-10 shrink-0">
        {label}
      </span>
      <span className="flex-1 font-mono text-sm text-[var(--color-text)] truncate">{value}</span>
      <button
        onClick={onCopy}
        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-overlay-3 hover:bg-overlay-8 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-all opacity-0 group-hover:opacity-100 cursor-pointer shrink-0"
      >
        Copy
      </button>
    </div>
  );
}

// ─── WCAG Badge ────────────────────────────────────────────────────────────

function WCAGBadge({ ratio, bg, label }: { ratio: number; bg: string; label: string }) {
  const wcag = getWCAGLevel(ratio);
  const best = wcag.aaa ? "AAA" : wcag.aa ? "AA" : wcag.aaLarge ? "AA Large" : "Fail";
  const color = wcag.aa ? "var(--color-success)" : wcag.aaLarge ? "var(--color-warning)" : "var(--color-error)";
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <div className="w-7 h-7 rounded-lg border border-[var(--color-border)] shrink-0" style={{ backgroundColor: bg }} />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-[var(--color-text-secondary)]">{label}</div>
        <div className="text-xs font-mono font-bold" style={{ color }}>{ratio.toFixed(2)}:1 — {best}</div>
      </div>
    </div>
  );
}

// ─── Harmony Wheel ─────────────────────────────────────────────────────────

const HARMONY_PRESETS = [
  { label: "Complementary", offsets: [180] },
  { label: "Analogous", offsets: [30, -30] },
  { label: "Triadic", offsets: [120, 240] },
  { label: "Split Comp.", offsets: [150, 210] },
  { label: "Tetradic", offsets: [90, 180, 270] },
] as const;

function HarmonyWheel({
  hue, sat, val, activePreset, onSelectHue,
}: {
  hue: number; sat: number; val: number; activePreset: number; onSelectHue: (h: number) => void;
}) {
  const preset = HARMONY_PRESETS[activePreset];
  const allHues = [hue, ...preset.offsets.map((o) => ((hue + o) % 360 + 360) % 360)];

  const size = 180;
  const cx = size / 2;
  const outerR = size / 2 - 4;
  const innerR = outerR - 22;
  const midR = (outerR + innerR) / 2;

  function hueToXY(h: number, r: number) {
    const rad = ((h - 90) * Math.PI) / 180;
    return { x: cx + Math.cos(rad) * r, y: cx + Math.sin(rad) * r };
  }

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
        }}
      />
      <div
        className="absolute rounded-full bg-[var(--color-bg)]"
        style={{
          top: size / 2 - innerR, left: size / 2 - innerR,
          width: innerR * 2, height: innerR * 2,
        }}
      />
      <svg className="absolute inset-0" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {allHues.length > 1 && (
          <polygon
            points={allHues.map((h) => { const p = hueToXY(h, midR); return `${p.x},${p.y}`; }).join(" ")}
            fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="4 3"
          />
        )}
        {allHues.map((h, i) => {
          const p = hueToXY(h, midR);
          const { r: cr, g: cg, b: cb } = hsbToRgb(h, sat, val);
          const col = rgbToHex(cr, cg, cb);
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={i === 0 ? 10 : 8}
                fill={col} stroke="white" strokeWidth="2.5"
                className="cursor-pointer"
                style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                onClick={() => { if (i > 0) onSelectHue(h); }}
              />
              {i === 0 && (
                <circle cx={p.x} cy={p.y} r={4} fill="white" opacity="0.8" />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Tints & Shades ────────────────────────────────────────────────────────

function TintShadeBar({ hex, label, mode }: { hex: string; label: string; mode: "tint" | "shade" }) {
  const { r, g, b } = hexToRgb(hex);
  const steps = 11;
  const colors = useMemo(() =>
    Array.from({ length: steps }, (_, i) => {
      const t = i / (steps - 1);
      if (mode === "tint") {
        return rgbToHex(
          Math.round(r + (255 - r) * t),
          Math.round(g + (255 - g) * t),
          Math.round(b + (255 - b) * t),
        );
      }
      return rgbToHex(
        Math.round(r * (1 - t)),
        Math.round(g * (1 - t)),
        Math.round(b * (1 - t)),
      );
    }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [r, g, b, mode]);

  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5 block">{label}</span>
      <div className="flex rounded-xl overflow-hidden h-10 border border-[var(--color-border)]">
        {colors.map((c, i) => (
          <button key={i} className="flex-1 hover:flex-[2] transition-all duration-200 relative group/ts"
            style={{ backgroundColor: c }}
            onClick={() => copyText(c, c.toUpperCase())}
            title={c.toUpperCase()}
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/ts:opacity-100 transition-opacity text-[8px] font-mono font-bold"
              style={{ color: shouldUseWhiteText(c) ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)" }}
            >
              {c.toUpperCase().slice(0, 4)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Color Blind Preview ───────────────────────────────────────────────────

const CB_TYPES: { type: ColorBlindType; label: string; desc: string }[] = [
  { type: "protanopia", label: "Protanopia", desc: "Red-blind" },
  { type: "deuteranopia", label: "Deuteranopia", desc: "Green-blind" },
  { type: "tritanopia", label: "Tritanopia", desc: "Blue-blind" },
  { type: "achromatopsia", label: "Achromatopsia", desc: "Monochrome" },
];

function ColorBlindPreview({ hex }: { hex: string }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {CB_TYPES.map(({ type, label, desc }) => {
        const sim = simulateColorBlind(hex, type);
        return (
          <button key={type} onClick={() => copyText(sim, `${label}: ${sim.toUpperCase()}`)}
            className="group flex flex-col items-center gap-1.5 p-3 rounded-xl bg-overlay-3 hover:bg-overlay-6 transition-colors"
          >
            <div className="flex gap-1">
              <div className="w-8 h-8 rounded-lg border border-[var(--color-border)]" style={{ backgroundColor: hex }} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-muted)] self-center">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
              <div className="w-8 h-8 rounded-lg border border-[var(--color-border)]" style={{ backgroundColor: sim }} />
            </div>
            <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{label}</span>
            <span className="text-[9px] text-[var(--color-text-muted)]">{desc}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">{title}</h2>
      {children}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function PickerPage() {
  const [hue, setHue] = useState(270);
  const [sat, setSat] = useState(0.63);
  const [val, setVal] = useState(0.96);
  const [hexInput, setHexInput] = useState("");
  const [harmonyPreset, setHarmonyPreset] = useState(0);
  const [hasEyeDropper, setHasEyeDropper] = useState(false);

  useEffect(() => {
    setHasEyeDropper("EyeDropper" in window);
  }, []);

  // Derived color values
  const { r, g, b } = hsbToRgb(hue, sat, val);
  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);
  const hsb = rgbToHsb(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);
  const hwb = rgbToHwb(r, g, b);
  const colorName = getColorName(hex);
  const white = shouldUseWhiteText(hex);
  const contrastWhite = getContrastRatio(hex, "#FFFFFF");
  const contrastBlack = getContrastRatio(hex, "#000000");
  const nearest = useMemo(() => findNearestTailwind(hex), [hex]);

  // Harmony colors
  const harmonyColors = useMemo(() => {
    const preset = HARMONY_PRESETS[harmonyPreset];
    return preset.offsets.map((offset) => {
      const h = ((hue + offset) % 360 + 360) % 360;
      const { r: hr, g: hg, b: hb } = hsbToRgb(h, sat, val);
      return { hue: h, hex: rgbToHex(hr, hg, hb) };
    });
  }, [hue, sat, val, harmonyPreset]);

  const setFromHex = useCallback((input: string) => {
    const clean = input.replace("#", "").trim();
    if (/^[0-9a-fA-F]{6}$/.test(clean)) {
      const rgb = hexToRgb(`#${clean}`);
      const h = rgbToHsb(rgb.r, rgb.g, rgb.b);
      setHue(Math.round(h.h));
      setSat(h.s);
      setVal(h.b);
    }
  }, []);

  const handleHexInput = (v: string) => {
    setHexInput(v);
    setFromHex(v);
  };

  const pickFromScreen = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dropper = new (window as any).EyeDropper();
      const result = await dropper.open();
      setFromHex(result.sRGBHex);
      setHexInput("");
      toast.success(`Picked ${result.sRGBHex}`);
    } catch {
      // User cancelled
    }
  }, [setFromHex]);

  const randomColor = useCallback(() => {
    setHue(Math.floor(Math.random() * 360));
    setSat(0.4 + Math.random() * 0.5);
    setVal(0.5 + Math.random() * 0.45);
    setHexInput("");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === "Space") { e.preventDefault(); randomColor(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [randomColor]);

  return (
    <div className="min-h-screen px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Color <span className="gradient-text">Picker</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
            Professional color picker with HSB canvas, 6 output formats, color harmonies,
            accessibility checking, and color blindness simulation.
          </p>
        </div>

        {/* ═══════════ MAIN PICKER AREA ═══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 mb-12">

          {/* Left — Canvas & Controls */}
          <div className="space-y-3">
            {/* Color preview bar */}
            <motion.div
              layout
              className="h-20 rounded-2xl border border-[var(--color-border)] flex items-center justify-between px-6 transition-colors duration-100 shadow-md"
              style={{ backgroundColor: hex }}
            >
              <div>
                <span className={`font-bold text-lg ${white ? "text-white" : "text-black"}`}>
                  {colorName}
                </span>
                <span className={`block text-xs font-mono ${white ? "text-white/50" : "text-black/40"}`}>
                  {hex.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => copyText(hex, hex.toUpperCase())}
                className={`font-mono text-sm px-5 py-2.5 rounded-xl backdrop-blur-sm transition-colors font-semibold ${
                  white ? "bg-white/15 text-white hover:bg-white/25" : "bg-black/10 text-black hover:bg-black/20"
                }`}
              >
                Copy
              </button>
            </motion.div>

            {/* HSB Canvas */}
            <HSBCanvas hue={hue} sat={sat} val={val} onPick={(s, v) => { setSat(s); setVal(v); setHexInput(""); }} />

            {/* Hue strip */}
            <HueStrip hue={hue} onChange={(h) => { setHue(h); setHexInput(""); }} />

            {/* Quick actions */}
            <div className="flex items-center gap-2 pt-1">
              {hasEyeDropper && (
                <button onClick={pickFromScreen}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] bg-overlay-3 hover:bg-overlay-6 transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m2 22 1-1h3l9-9" /><path d="M3 21v-3l9-9" /><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4" />
                  </svg>
                  Eyedropper
                </button>
              )}
              <button onClick={randomColor}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-[var(--color-border)] hover:border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] bg-overlay-3 hover:bg-overlay-6 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Random
              </button>
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono ml-1">Space</span>
            </div>
          </div>

          {/* Right — Info Panel */}
          <div className="surface rounded-2xl p-5 border border-[var(--color-border)] space-y-5 h-fit">
            {/* Hex input */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5 block">
                Enter Hex
              </label>
              <input
                type="text"
                value={hexInput || hex}
                onChange={(e) => handleHexInput(e.target.value)}
                placeholder="#8B5CF6"
                className="w-full px-3.5 py-2.5 rounded-xl bg-overlay-3 border border-[var(--color-border)] focus:border-[var(--color-border-strong)] focus:outline-none font-mono text-sm"
              />
            </div>

            {/* All formats */}
            <Section title="Formats">
              <div>
                <FormatRow label="HEX" value={hex.toUpperCase()} onCopy={() => copyText(hex.toUpperCase(), "HEX")} />
                <FormatRow label="RGB" value={`rgb(${r}, ${g}, ${b})`} onCopy={() => copyText(`rgb(${r}, ${g}, ${b})`, "RGB")} />
                <FormatRow label="HSL" value={`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`}
                  onCopy={() => copyText(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`, "HSL")} />
                <FormatRow label="HSB" value={`hsb(${Math.round(hsb.h)}, ${Math.round(hsb.s * 100)}%, ${Math.round(hsb.b * 100)}%)`}
                  onCopy={() => copyText(`hsb(${Math.round(hsb.h)}, ${Math.round(hsb.s * 100)}%, ${Math.round(hsb.b * 100)}%)`, "HSB")} />
                <FormatRow label="CMYK" value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                  onCopy={() => copyText(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, "CMYK")} />
                <FormatRow label="HWB" value={`hwb(${hwb.h} ${hwb.w}% ${hwb.b}%)`}
                  onCopy={() => copyText(`hwb(${hwb.h} ${hwb.w}% ${hwb.b}%)`, "HWB")} />
              </div>
            </Section>

            {/* Contrast */}
            <Section title="Contrast">
              <div>
                <WCAGBadge ratio={contrastWhite} bg="#FFFFFF" label="vs White" />
                <WCAGBadge ratio={contrastBlack} bg="#000000" label="vs Black" />
              </div>
            </Section>

            {/* Nearest Tailwind */}
            <Section title="Nearest Tailwind">
              <button
                onClick={() => copyText(`${nearest.name}-${nearest.shade}`, "Tailwind class")}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-overlay-3 hover:bg-overlay-6 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg border border-[var(--color-border)] shrink-0" style={{ backgroundColor: nearest.hex }} />
                <div className="text-left flex-1">
                  <span className="text-sm font-mono font-bold text-[var(--color-text)]">{nearest.name}-{nearest.shade}</span>
                  <span className="block text-[10px] text-[var(--color-text-muted)]">
                    {nearest.hex.toUpperCase()} — {Math.round(nearest.distance)} distance
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
              </button>
            </Section>

            {/* Quick links */}
            <div className="pt-3 border-t border-[var(--color-border-subtle)] space-y-1.5">
              <Link href={`/generate?color=${encodeURIComponent(hex)}`}
                className="flex items-center gap-2 text-sm text-[var(--color-accent-purple)] hover:underline">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Generate palette from this color
              </Link>
              <Link href="/contrast"
                className="flex items-center gap-2 text-sm text-[var(--color-accent-purple)] hover:underline">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Check contrast with this color
              </Link>
            </div>
          </div>
        </div>

        {/* ═══════════ COLOR HARMONIES ═══════════ */}
        <div className="surface rounded-2xl p-6 md:p-8 border border-[var(--color-border)] mb-5">
          <Section title="Color Harmonies">
            <div className="flex flex-wrap gap-1.5 mb-6">
              {HARMONY_PRESETS.map((p, i) => (
                <button key={p.label} onClick={() => setHarmonyPreset(i)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    harmonyPreset === i
                      ? "bg-[var(--color-accent-purple)] text-white shadow-lg shadow-purple-500/20"
                      : "bg-overlay-3 text-[var(--color-text-secondary)] hover:bg-overlay-6 hover:text-[var(--color-text)]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <HarmonyWheel
                hue={hue} sat={sat} val={val}
                activePreset={harmonyPreset}
                onSelectHue={(h) => { setHue(h); setHexInput(""); }}
              />

              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button onClick={() => copyText(hex, hex.toUpperCase())}
                    className="flex items-center gap-3 p-3 rounded-xl bg-overlay-3 hover:bg-overlay-6 transition-colors border border-[var(--color-accent-purple)]/30"
                  >
                    <div className="w-10 h-10 rounded-xl border border-[var(--color-border)] shrink-0 shadow-sm" style={{ backgroundColor: hex }} />
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-[var(--color-accent-purple)] uppercase tracking-wider">Base</span>
                      <span className="block text-xs font-mono font-bold text-[var(--color-text)]">{hex.toUpperCase()}</span>
                    </div>
                  </button>
                  {harmonyColors.map((hc, i) => (
                    <button key={i}
                      onClick={() => { setHue(hc.hue); setHexInput(""); }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-overlay-3 hover:bg-overlay-6 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl border border-[var(--color-border)] shrink-0 shadow-sm" style={{ backgroundColor: hc.hex }} />
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{Math.round(hc.hue)}&deg;</span>
                        <span className="block text-xs font-mono font-bold text-[var(--color-text)]">{hc.hex.toUpperCase()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* ═══════════ TINTS & SHADES ═══════════ */}
        <div className="surface rounded-2xl p-6 md:p-8 border border-[var(--color-border)] mb-5">
          <Section title="Tints & Shades">
            <div className="space-y-4">
              <TintShadeBar hex={hex} label="Tints (color → white)" mode="tint" />
              <TintShadeBar hex={hex} label="Shades (color → black)" mode="shade" />
            </div>
          </Section>
        </div>

        {/* ═══════════ COLOR BLIND SIMULATION ═══════════ */}
        <div className="surface rounded-2xl p-6 md:p-8 border border-[var(--color-border)] mb-12">
          <Section title="Color Blind Simulation">
            <ColorBlindPreview hex={hex} />
          </Section>
        </div>

        {/* ═══════════ SEO CONTENT ═══════════ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Professional Online Color Picker</h2>
          <div className="prose-sm text-[var(--color-text-secondary)] space-y-4 leading-relaxed">
            <p>
              Kulr&apos;s color picker uses the HSB (Hue, Saturation, Brightness) model — the same color
              model used by Photoshop, Figma, and Sketch. This gives designers intuitive control: drag
              right for more saturation, drag up for more brightness. It&apos;s how professional tools work.
            </p>
            <p>
              Get your color in six formats instantly: HEX, RGB, HSL, HSB, CMYK (for print), and HWB.
              Every format is one click to copy. The harmony panel visualizes complementary, analogous,
              triadic, split-complementary, and tetradic relationships on an interactive color wheel.
            </p>
            <p>
              Check accessibility with built-in WCAG contrast ratios against white and black backgrounds.
              See how your color appears to people with color vision deficiencies — protanopia, deuteranopia,
              tritanopia, and achromatopsia. Find the nearest Tailwind CSS utility class automatically.
            </p>
            <p>
              The EyeDropper tool (Chrome/Edge) lets you pick any color from your screen — from other
              websites, desktop apps, or images. Everything runs in your browser. No data leaves your device.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/colors", label: "Browse named colors" },
                { href: "/convert", label: "Convert color formats" },
                { href: "/generate", label: "Generate palettes" },
                { href: "/contrast", label: "Check contrast ratios" },
                { href: "/psychology", label: "Color psychology guide" },
                { href: "/tailwind", label: "Tailwind CSS colors" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
