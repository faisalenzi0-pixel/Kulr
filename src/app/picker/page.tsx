"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  shouldUseWhiteText,
  formatRgb,
  formatHsl,
} from "@/lib/color-convert";
import { getColorName } from "@/lib/color-names";

function copyText(text: string, label: string) {
  navigator.clipboard.writeText(text);
  toast.success(`Copied ${label}`);
}

// ─── Hue/Saturation Canvas ─────────────────────────────────
function HueSatCanvas({
  hue,
  saturation,
  lightness,
  onPick,
}: {
  hue: number;
  saturation: number;
  lightness: number;
  onPick: (s: number, l: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width;
    const h = canvas.height;

    // Draw saturation-lightness grid for current hue
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const s = x / w;
        const l = 1 - y / h;
        const { r, g, b } = hslToRgb(hue, s, l);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [hue]);

  useEffect(() => {
    draw();
  }, [draw]);

  const pick = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      onPick(x, 1 - y);
    },
    [onPick]
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (dragging.current) pick(e);
    };
    const handleUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [pick]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-[var(--color-border)] cursor-crosshair">
      <canvas
        ref={canvasRef}
        width={360}
        height={240}
        className="w-full h-48 sm:h-60 block"
        onMouseDown={(e) => {
          dragging.current = true;
          pick(e);
        }}
      />
      {/* Picker dot */}
      <div
        className="absolute w-5 h-5 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.3)] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${saturation * 100}%`,
          top: `${(1 - lightness) * 100}%`,
        }}
      />
    </div>
  );
}

// ─── Hue Slider ─────────────────────────────────────────────
function HueSlider({
  hue,
  onChange,
}: {
  hue: number;
  onChange: (h: number) => void;
}) {
  return (
    <div className="relative mt-4">
      <div
        className="h-4 rounded-full"
        style={{
          background:
            "linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
        }}
      />
      <input
        type="range"
        min="0"
        max="360"
        step="1"
        value={hue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-4 opacity-0 cursor-pointer"
      />
      <div
        className="absolute top-0 w-5 h-5 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.3)] pointer-events-none -translate-x-1/2 -translate-y-0.5"
        style={{ left: `${(hue / 360) * 100}%` }}
      />
    </div>
  );
}

// ─── Format Row ─────────────────────────────────────────────
function FormatRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-[var(--color-border-subtle)] last:border-0">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] w-10">
        {label}
      </span>
      <span className="flex-1 font-mono text-sm text-[var(--color-text)]">{value}</span>
      <button
        onClick={onCopy}
        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-overlay-3 hover:bg-overlay-6 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
      >
        Copy
      </button>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────
export default function PickerPage() {
  const [hue, setHue] = useState(270);
  const [saturation, setSaturation] = useState(0.65);
  const [lightness, setLightness] = useState(0.55);
  const [hexInput, setHexInput] = useState("");

  const { r, g, b } = hslToRgb(hue, saturation, lightness);
  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);
  const colorName = getColorName(hex);
  const white = shouldUseWhiteText(hex);

  const handleHexInput = (val: string) => {
    setHexInput(val);
    const clean = val.replace("#", "").trim();
    if (/^[0-9a-fA-F]{6}$/.test(clean)) {
      const rgb = hexToRgb(`#${clean}`);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
    }
  };

  const handlePick = (s: number, l: number) => {
    setSaturation(s);
    setLightness(l);
    setHexInput("");
  };

  // Complementary, analogous, triadic
  const harmonies = [
    { label: "Complementary", offset: 180 },
    { label: "Analogous", offset: 30 },
    { label: "Analogous", offset: -30 },
    { label: "Triadic", offset: 120 },
    { label: "Triadic", offset: 240 },
    { label: "Split Comp.", offset: 150 },
    { label: "Split Comp.", offset: 210 },
  ];

  const harmonyColors = harmonies.map((h) => {
    const newHue = ((hue + h.offset) % 360 + 360) % 360;
    const { r, g, b } = hslToRgb(newHue, saturation, lightness);
    return { ...h, hex: rgbToHex(r, g, b), hue: newHue };
  });

  return (
    <div className="min-h-screen px-4 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Color <span className="gradient-text">Picker</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
            Pick any color. Get hex, RGB, and HSL codes instantly.
            See harmonies and related colors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* Left — Picker Area */}
          <div className="space-y-4">
            {/* Preview bar */}
            <motion.div
              layout
              className="h-20 rounded-2xl border border-[var(--color-border)] flex items-center justify-between px-6 transition-colors duration-150"
              style={{ backgroundColor: hex }}
            >
              <span className={`font-bold text-lg ${white ? "text-white" : "text-black"}`}>
                {colorName}
              </span>
              <button
                onClick={() => copyText(hex, hex)}
                className={`font-mono text-sm px-4 py-2 rounded-xl backdrop-blur-sm transition-colors ${
                  white
                    ? "bg-white/15 text-white hover:bg-white/25"
                    : "bg-black/10 text-black hover:bg-black/20"
                }`}
              >
                {hex.toUpperCase()}
              </button>
            </motion.div>

            {/* Canvas + Hue */}
            <HueSatCanvas
              hue={hue}
              saturation={saturation}
              lightness={lightness}
              onPick={handlePick}
            />
            <HueSlider hue={hue} onChange={(h) => { setHue(h); setHexInput(""); }} />

            {/* Harmony suggestions */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                Color Harmonies
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {harmonyColors.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setHue(h.hue);
                      setHexInput("");
                    }}
                    className="group relative"
                    title={`${h.label}: ${h.hex}`}
                  >
                    <div
                      className="h-12 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all hover:scale-105 hover:-translate-y-0.5"
                      style={{ backgroundColor: h.hex }}
                    />
                    <span className="block text-[9px] text-center text-[var(--color-text-muted)] mt-1 truncate">
                      {h.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Color Values */}
          <div className="surface rounded-2xl p-6 border border-[var(--color-border)] h-fit">
            <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
              Color Values
            </h2>

            {/* Hex input */}
            <div className="mb-4">
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
            <div className="mb-6">
              <FormatRow label="HEX" value={hex.toUpperCase()} onCopy={() => copyText(hex, "HEX")} />
              <FormatRow label="RGB" value={`rgb(${r}, ${g}, ${b})`} onCopy={() => copyText(`rgb(${r}, ${g}, ${b})`, "RGB")} />
              <FormatRow
                label="HSL"
                value={`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`}
                onCopy={() => copyText(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`, "HSL")}
              />
              <FormatRow
                label="CSS"
                value={colorName !== "Unknown" ? colorName.toLowerCase().replace(/\s+/g, "") : hex}
                onCopy={() => copyText(colorName !== "Unknown" ? colorName.toLowerCase().replace(/\s+/g, "") : hex, "CSS")}
              />
            </div>

            {/* RGB Sliders */}
            <div className="space-y-3 mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                RGB Sliders
              </h3>
              {[
                { label: "R", value: r, color: "#EF4444" },
                { label: "G", value: g, color: "#22C55E" },
                { label: "B", value: b, color: "#3B82F6" },
              ].map((ch) => (
                <div key={ch.label} className="flex items-center gap-3">
                  <span className="text-xs font-bold w-4" style={{ color: ch.color }}>
                    {ch.label}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={ch.value}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const newR = ch.label === "R" ? val : r;
                      const newG = ch.label === "G" ? val : g;
                      const newB = ch.label === "B" ? val : b;
                      const hsl = rgbToHsl(newR, newG, newB);
                      setHue(hsl.h);
                      setSaturation(hsl.s);
                      setLightness(hsl.l);
                      setHexInput("");
                    }}
                    className="flex-1 accent-[var(--color-accent-purple)]"
                  />
                  <span className="text-xs font-mono text-[var(--color-text-muted)] w-8 text-right">
                    {ch.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="pt-4 border-t border-[var(--color-border-subtle)] space-y-2">
              <Link
                href={`/generate?color=${encodeURIComponent(hex)}`}
                className="flex items-center gap-2 text-sm text-[var(--color-accent-purple)] hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Generate palette from this color
              </Link>
              <Link
                href={`/contrast`}
                className="flex items-center gap-2 text-sm text-[var(--color-accent-purple)] hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Check contrast with this color
              </Link>
              <Link
                href="/colors"
                className="flex items-center gap-2 text-sm text-[var(--color-accent-purple)] hover:underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Browse named colors
              </Link>
            </div>
          </div>
        </div>

        {/* SEO content */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Free Online Color Picker</h2>
          <div className="prose-sm text-[var(--color-text-secondary)] space-y-4 leading-relaxed">
            <p>
              Kulr&apos;s color picker lets you select any color visually and instantly get its code in
              multiple formats: HEX, RGB, HSL, and CSS named colors. Use the saturation-lightness
              canvas to fine-tune your selection, or enter a hex code directly.
            </p>
            <p>
              The harmony panel shows you complementary, analogous, triadic, and split-complementary
              colors automatically — helping you build cohesive color schemes from any starting point.
              Click any harmony color to make it your new base.
            </p>
            <p>
              Whether you&apos;re designing a website, building a brand identity, or picking colors for
              an illustration — this tool gives you precise control with instant visual feedback.
              All processing happens in your browser. No data leaves your device.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/colors" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Browse named colors →
              </Link>
              <Link href="/convert" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Convert color formats →
              </Link>
              <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Generate palettes →
              </Link>
              <Link href="/psychology" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Color psychology guide →
              </Link>
              <Link href="/contrast" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Check contrast ratios →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
