"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { TAILWIND_COLORS, type TailwindColor } from "@/lib/tailwind-colors";
import { shouldUseWhiteText, hexToRgb, rgbToHsl } from "@/lib/color-convert";

function copyText(text: string, label: string) {
  navigator.clipboard.writeText(text);
  toast.success(`Copied ${label}`);
}

type CopyFormat = "hex" | "class" | "rgb" | "hsl";

function ShadeCell({
  color,
  shade,
  hex,
  format,
}: {
  color: string;
  shade: number;
  hex: string;
  format: CopyFormat;
}) {
  const white = shouldUseWhiteText(hex);
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const copyValue = () => {
    switch (format) {
      case "hex":
        return hex;
      case "class":
        return `${color.toLowerCase()}-${shade}`;
      case "rgb":
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case "hsl":
        return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
    }
  };

  const displayValue = () => {
    switch (format) {
      case "hex":
        return hex;
      case "class":
        return shade.toString();
      case "rgb":
        return `${rgb.r},${rgb.g},${rgb.b}`;
      case "hsl":
        return `${Math.round(hsl.h)}°`;
    }
  };

  return (
    <button
      onClick={() => copyText(copyValue(), format.toUpperCase())}
      className="group relative h-12 sm:h-14 rounded-lg transition-all duration-150 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:z-10 cursor-pointer"
      style={{ backgroundColor: hex }}
      title={`${color.toLowerCase()}-${shade}: ${hex}`}
    >
      <span
        className={`absolute inset-0 flex items-center justify-center text-[10px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
          white ? "text-white" : "text-black"
        }`}
      >
        {displayValue()}
      </span>
    </button>
  );
}

function ColorRow({ color, format }: { color: TailwindColor; format: CopyFormat }) {
  return (
    <div className="group">
      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-3 items-center">
        <div className="text-sm font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">
          {color.name}
        </div>
        <div className="grid grid-cols-11 gap-1">
          {color.shades.map((shade) => (
            <ShadeCell
              key={shade.shade}
              color={color.name}
              shade={shade.shade}
              hex={shade.hex}
              format={format}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Custom shade generator from any hex
function CustomShadeGenerator() {
  const [baseHex, setBaseHex] = useState("#3B82F6");

  const shades = useMemo(() => {
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const targets = [
      { shade: 50, l: 0.97 },
      { shade: 100, l: 0.93 },
      { shade: 200, l: 0.86 },
      { shade: 300, l: 0.76 },
      { shade: 400, l: 0.64 },
      { shade: 500, l: 0.50 },
      { shade: 600, l: 0.42 },
      { shade: 700, l: 0.34 },
      { shade: 800, l: 0.26 },
      { shade: 900, l: 0.20 },
      { shade: 950, l: 0.12 },
    ];

    return targets.map((t) => {
      // Use the base hue and saturation, vary lightness
      const { r, g, b } = (() => {
        const h = hsl.h;
        // Slightly desaturate at extremes
        const satAdjust = t.l > 0.9 ? 0.3 : t.l < 0.15 ? 0.6 : 1;
        const s = Math.min(1, hsl.s * satAdjust);
        const hslToRgbLocal = (h: number, s: number, l: number) => {
          const c = (1 - Math.abs(2 * l - 1)) * s;
          const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
          const m = l - c / 2;
          let r = 0, g = 0, b = 0;
          if (h < 60) { r = c; g = x; }
          else if (h < 120) { r = x; g = c; }
          else if (h < 180) { g = c; b = x; }
          else if (h < 240) { g = x; b = c; }
          else if (h < 300) { r = x; b = c; }
          else { r = c; b = x; }
          return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255),
          };
        };
        return hslToRgbLocal(h, s, t.l);
      })();

      const hex = "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");
      return { shade: t.shade, hex: hex.toUpperCase() };
    });
  }, [baseHex]);

  return (
    <div className="surface rounded-2xl p-6 md:p-8 border border-[var(--color-border)]">
      <h2 className="text-lg font-bold tracking-tight mb-1">Custom Shade Generator</h2>
      <p className="text-sm text-[var(--color-text-secondary)] mb-5">
        Enter any color to generate a Tailwind-style shade scale.
      </p>

      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl border border-[var(--color-border)] shrink-0"
          style={{ backgroundColor: baseHex }}
        />
        <input
          type="text"
          value={baseHex}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#?[0-9a-fA-F]{0,6}$/.test(v.replace("#", ""))) setBaseHex(v.startsWith("#") ? v : `#${v}`);
          }}
          placeholder="#3B82F6"
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-overlay-3 border border-[var(--color-border)] focus:border-[var(--color-border-strong)] focus:outline-none font-mono text-sm"
        />
        <input
          type="color"
          value={baseHex}
          onChange={(e) => setBaseHex(e.target.value.toUpperCase())}
          className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
        />
      </div>

      {/* Generated shades */}
      <div className="grid grid-cols-11 gap-1">
        {shades.map((s) => (
          <button
            key={s.shade}
            onClick={() => copyText(s.hex, `shade ${s.shade}`)}
            className="group relative h-14 rounded-lg transition-all duration-150 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
            style={{ backgroundColor: s.hex }}
            title={`${s.shade}: ${s.hex}`}
          >
            <span
              className={`absolute inset-0 flex flex-col items-center justify-center text-[9px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
                shouldUseWhiteText(s.hex) ? "text-white" : "text-black"
              }`}
            >
              <span>{s.shade}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Copy all as Tailwind config */}
      <button
        onClick={() => {
          const config = shades
            .map((s) => `  '${s.shade}': '${s.hex}',`)
            .join("\n");
          copyText(`{\n${config}\n}`, "Tailwind config");
        }}
        className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-overlay-3 hover:bg-overlay-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer border border-[var(--color-border)]"
      >
        Copy as Tailwind Config Object
      </button>
    </div>
  );
}

export default function TailwindPage() {
  const [format, setFormat] = useState<CopyFormat>("hex");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return TAILWIND_COLORS;
    const q = search.toLowerCase();
    return TAILWIND_COLORS.filter((c) => c.name.toLowerCase().includes(q));
  }, [search]);

  const formats: { id: CopyFormat; label: string }[] = [
    { id: "hex", label: "HEX" },
    { id: "class", label: "Class" },
    { id: "rgb", label: "RGB" },
    { id: "hsl", label: "HSL" },
  ];

  return (
    <div className="min-h-screen px-4 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Tailwind <span className="gradient-text">Colors</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
            The complete Tailwind CSS v4 color palette. Click any shade to copy.
            Generate custom shade scales from any color.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 w-full sm:w-auto">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search colors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-border-strong)] focus:outline-none text-sm placeholder:text-[var(--color-text-muted)]"
            />
          </div>

          {/* Format toggle */}
          <div className="flex gap-1.5 bg-overlay-3 rounded-xl p-1 border border-[var(--color-border)]">
            {formats.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wide transition-all ${
                  format === f.id
                    ? "bg-[var(--color-text)] text-[var(--color-text-inverse)] shadow-sm"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shade header */}
        <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-3 mb-3">
          <div />
          <div className="grid grid-cols-11 gap-1">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((s) => (
              <div key={s} className="text-center text-[10px] font-semibold text-[var(--color-text-muted)]">
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Color grid */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((color) => (
              <motion.div
                key={color.name}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ColorRow color={color} format={format} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Custom shade generator */}
        <div className="mt-16">
          <CustomShadeGenerator />
        </div>

        {/* Internal links */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
            Generate palettes →
          </Link>
          <Link href="/picker" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
            Color picker →
          </Link>
          <Link href="/convert" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
            Color converter →
          </Link>
          <Link href="/contrast" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
            Contrast checker →
          </Link>
        </div>

        {/* SEO content */}
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Tailwind CSS Color Reference</h2>
          <div className="prose-sm text-[var(--color-text-secondary)] space-y-4 leading-relaxed">
            <p>
              Tailwind CSS ships with a carefully crafted default color palette consisting of 22 color families,
              each with 11 shades from 50 (lightest) to 950 (darkest). These colors are designed to work
              together harmoniously and cover every common design need.
            </p>
            <p>
              Use this reference to browse the full palette, click any shade to copy its hex code,
              RGB value, HSL value, or Tailwind class name. Switch between formats using the toggle above.
            </p>
            <p>
              Need a custom shade scale for your brand color? Use the <strong>Custom Shade Generator</strong> above
              to create a Tailwind-compatible 11-shade scale from any hex color. Copy the entire config object
              to paste directly into your <code className="px-1.5 py-0.5 rounded bg-overlay-4 text-[var(--color-text)] font-mono text-xs">tailwind.config.js</code> theme extension.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/convert" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Convert color formats →
              </Link>
              <Link href="/picker" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Pick colors visually →
              </Link>
              <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Generate palettes →
              </Link>
              <Link href="/brands" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Brand color palettes →
              </Link>
              <Link href="/colors" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Browse named colors →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
