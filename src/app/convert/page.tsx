"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  shouldUseWhiteText,
} from "@/lib/color-convert";
import { getColorName } from "@/lib/color-names";

type Format = "hex" | "rgb" | "hsl";

interface ParsedColor {
  r: number;
  g: number;
  b: number;
  valid: boolean;
}

function parseInput(input: string, format: Format): ParsedColor {
  const s = input.trim();
  if (!s) return { r: 0, g: 0, b: 0, valid: false };

  try {
    if (format === "hex") {
      const clean = s.replace("#", "");
      if (/^[0-9a-fA-F]{3}$/.test(clean)) {
        const full = clean.split("").map((c) => c + c).join("");
        const n = parseInt(full, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, valid: true };
      }
      if (/^[0-9a-fA-F]{6}$/.test(clean)) {
        const n = parseInt(clean, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, valid: true };
      }
      return { r: 0, g: 0, b: 0, valid: false };
    }

    if (format === "rgb") {
      const match = s.match(/^(?:rgb\s*\()?\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*\)?$/);
      if (match) {
        const [, r, g, b] = match.map(Number);
        if (r <= 255 && g <= 255 && b <= 255) return { r, g, b, valid: true };
      }
      return { r: 0, g: 0, b: 0, valid: false };
    }

    if (format === "hsl") {
      const match = s.match(/^(?:hsl\s*\()?\s*(\d{1,3})\s*[,°\s]\s*(\d{1,3})%?\s*[,\s]\s*(\d{1,3})%?\s*\)?$/);
      if (match) {
        const h = Number(match[1]);
        const sat = Number(match[2]);
        const l = Number(match[3]);
        if (h <= 360 && sat <= 100 && l <= 100) {
          const { r, g, b } = hslToRgb(h, sat / 100, l / 100);
          return { r, g, b, valid: true };
        }
      }
      return { r: 0, g: 0, b: 0, valid: false };
    }
  } catch {
    return { r: 0, g: 0, b: 0, valid: false };
  }

  return { r: 0, g: 0, b: 0, valid: false };
}

function FormatOutput({
  label,
  value,
  monospace = true,
}: {
  label: string;
  value: string;
  monospace?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[var(--color-border-subtle)] last:border-0">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] w-12 shrink-0">
        {label}
      </span>
      <span className={`flex-1 text-sm text-[var(--color-text)] ${monospace ? "font-mono" : ""}`}>
        {value}
      </span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(value);
          toast.success(`Copied ${label}`);
        }}
        className="px-3 py-1.5 rounded-lg text-[10px] font-semibold bg-overlay-3 hover:bg-overlay-6 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer shrink-0"
      >
        Copy
      </button>
    </div>
  );
}

export default function ConvertPage() {
  const [input, setInput] = useState("#8B5CF6");
  const [format, setFormat] = useState<Format>("hex");

  const parsed = useMemo(() => parseInput(input, format), [input, format]);

  const hex = parsed.valid ? rgbToHex(parsed.r, parsed.g, parsed.b) : "";
  const rgb = parsed.valid ? `rgb(${parsed.r}, ${parsed.g}, ${parsed.b})` : "";
  const hsl = parsed.valid
    ? (() => {
        const h = rgbToHsl(parsed.r, parsed.g, parsed.b);
        return `hsl(${Math.round(h.h)}, ${Math.round(h.s * 100)}%, ${Math.round(h.l * 100)}%)`;
      })()
    : "";
  const name = parsed.valid ? getColorName(hex) : "";
  const white = parsed.valid ? shouldUseWhiteText(hex) : false;

  // CMYK
  const cmyk = parsed.valid
    ? (() => {
        const r = parsed.r / 255;
        const g = parsed.g / 255;
        const b = parsed.b / 255;
        const k = 1 - Math.max(r, g, b);
        if (k === 1) return "cmyk(0%, 0%, 0%, 100%)";
        const c = ((1 - r - k) / (1 - k)) * 100;
        const m = ((1 - g - k) / (1 - k)) * 100;
        const y = ((1 - b - k) / (1 - k)) * 100;
        return `cmyk(${Math.round(c)}%, ${Math.round(m)}%, ${Math.round(y)}%, ${Math.round(k * 100)}%)`;
      })()
    : "";

  const formats: Format[] = ["hex", "rgb", "hsl"];

  const placeholders: Record<Format, string> = {
    hex: "#8B5CF6 or 8B5CF6",
    rgb: "rgb(139, 92, 246) or 139, 92, 246",
    hsl: "hsl(262, 90%, 66%) or 262, 90, 66",
  };

  return (
    <div className="min-h-screen px-4 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Color <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto">
            Convert between HEX, RGB, HSL, and CMYK instantly. Paste a color code, get all formats.
          </p>
        </div>

        {/* Input Section */}
        <div className="surface rounded-2xl p-6 md:p-8 border border-[var(--color-border)] mb-6">
          {/* Format selector */}
          <div className="flex gap-2 mb-4">
            {formats.map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all ${
                  format === f
                    ? "bg-[var(--color-text)] text-[var(--color-text-inverse)] shadow-sm"
                    : "bg-overlay-3 text-[var(--color-text-secondary)] hover:bg-overlay-6"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Input field */}
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholders[format]}
              className="w-full px-4 py-3.5 rounded-xl bg-overlay-3 border border-[var(--color-border)] focus:border-[var(--color-border-strong)] focus:outline-none font-mono text-base placeholder:text-[var(--color-text-muted)] transition-colors"
            />
            {!parsed.valid && input.trim() && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-error)] text-xs font-medium">
                Invalid {format.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Result Section */}
        {parsed.valid && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Preview */}
            <div
              className="h-24 rounded-2xl border border-[var(--color-border)] flex items-center justify-between px-6 transition-colors duration-200"
              style={{ backgroundColor: hex }}
            >
              <span className={`font-bold text-xl ${white ? "text-white" : "text-black"}`}>
                {name}
              </span>
              <span className={`font-mono text-sm ${white ? "text-white/70" : "text-black/50"}`}>
                {hex.toUpperCase()}
              </span>
            </div>

            {/* All formats */}
            <div className="surface rounded-2xl p-6 border border-[var(--color-border)]">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                All Formats
              </h2>
              <FormatOutput label="HEX" value={hex.toUpperCase()} />
              <FormatOutput label="RGB" value={rgb} />
              <FormatOutput label="HSL" value={hsl} />
              <FormatOutput label="CMYK" value={cmyk} />
              {name !== "Unknown" && (
                <FormatOutput label="NAME" value={name} monospace={false} />
              )}
            </div>

            {/* CSS usage */}
            <div className="surface rounded-2xl p-6 border border-[var(--color-border)]">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                CSS Usage
              </h2>
              <FormatOutput label="CSS" value={`color: ${hex};`} />
              <FormatOutput label="BG" value={`background-color: ${hex};`} />
              <FormatOutput label="VAR" value={`--my-color: ${hex};`} />
              <FormatOutput
                label="TW"
                value={`text-[${hex}] bg-[${hex}]`}
              />
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/picker`}
                className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline"
              >
                Pick a color visually →
              </Link>
              <Link
                href="/generate"
                className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline"
              >
                Generate a palette →
              </Link>
              <Link
                href="/contrast"
                className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline"
              >
                Check contrast →
              </Link>
            </div>
          </motion.div>
        )}

        {/* SEO content */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Free Color Format Converter</h2>
          <div className="prose-sm text-[var(--color-text-secondary)] space-y-4 leading-relaxed">
            <p>
              Convert colors between HEX, RGB, HSL, and CMYK formats instantly. Whether you need to convert
              a hex code from your design tool to RGB for CSS, or translate HSL values to hex for your
              brand guidelines — paste the value and get every format at once.
            </p>
            <p>
              <strong>HEX</strong> (e.g., #8B5CF6) is the most common format for web colors.
              <strong> RGB</strong> (e.g., rgb(139, 92, 246)) represents colors as red, green, and blue channels.
              <strong> HSL</strong> (e.g., hsl(262, 90%, 66%)) uses hue, saturation, and lightness — often easier for designers to reason about.
              <strong> CMYK</strong> is used for print design.
            </p>
            <p>
              Kulr also shows you the closest CSS named color, ready-to-use CSS property declarations,
              CSS custom property syntax, and Tailwind CSS arbitrary value syntax.
              Everything runs in your browser — no data is sent anywhere.
            </p>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/picker" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Pick colors visually →
              </Link>
              <Link href="/colors" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Browse named colors →
              </Link>
              <Link href="/tailwind" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Tailwind CSS colors →
              </Link>
              <Link href="/generate" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Generate palettes →
              </Link>
              <Link href="/brands" className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                Brand color palettes →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
