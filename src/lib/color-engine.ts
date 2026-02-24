import type { HarmonyType } from "./types";
import { hexToHsl, hslToHex, hexToRgb, rgbToHex } from "./color-convert";

// Golden ratio conjugate for aesthetically distributed hues
const PHI = 0.618033988749895;

// ─── OKLCH Color Space Utilities ────────────────────────────────────────────
// OKLCH provides perceptually uniform lightness and chroma, making generated
// palettes look more balanced to the human eye than HSL alone.

/**
 * Convert linear sRGB component to sRGB gamma-encoded (0-1 range).
 */
function linearToGamma(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

/**
 * Convert sRGB gamma-encoded component (0-1) to linear.
 */
function gammaToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Convert OKLCH to sRGB hex.
 * L: 0-1 (lightness), C: 0-0.4 (chroma), H: 0-360 (hue)
 *
 * Pipeline: OKLCH -> OKLab -> linear sRGB -> sRGB -> hex
 */
function oklchToHex(L: number, C: number, H: number): string {
  // OKLCH to OKLab
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // OKLab to LMS (approximate)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  // Cube the values to go from "modified LMS" to LMS
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // LMS to linear sRGB
  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  // Clamp and gamma encode
  const r = Math.round(Math.max(0, Math.min(1, linearToGamma(lr))) * 255);
  const g = Math.round(Math.max(0, Math.min(1, linearToGamma(lg))) * 255);
  const bv = Math.round(Math.max(0, Math.min(1, linearToGamma(lb))) * 255);

  return rgbToHex(r, g, bv);
}

/**
 * Convert sRGB hex to OKLCH.
 * Returns { L, C, H } where L: 0-1, C: 0-~0.4, H: 0-360
 */
function hexToOklch(hex: string): { L: number; C: number; H: number } {
  const { r, g, b } = hexToRgb(hex);

  // sRGB to linear
  const lr = gammaToLinear(r / 255);
  const lg = gammaToLinear(g / 255);
  const lb = gammaToLinear(b / 255);

  // Linear sRGB to LMS
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  // LMS to "modified LMS" (cube root)
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // Modified LMS to OKLab
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bLab = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  // OKLab to OKLCH
  const C = Math.sqrt(a * a + bLab * bLab);
  let H = (Math.atan2(bLab, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return { L, C, H };
}

// ─── Palette Generation ─────────────────────────────────────────────────────

export function generateRandomPalette(count: number, lockedColors?: (string | null)[]): string[] {
  // Use OKLCH color space for perceptually uniform distribution.
  // Golden ratio hue stepping ensures maximum hue separation.
  // OKLCH lightness and chroma produce palettes that look evenly balanced.

  let hue = Math.random() * 360;
  const lightness = 0.55 + Math.random() * 0.2; // OKLCH L: 0.55-0.75 (pleasant mid-range)
  const chroma = 0.10 + Math.random() * 0.12;   // OKLCH C: 0.10-0.22 (vivid but not clipped)

  return Array.from({ length: count }, (_, i) => {
    if (lockedColors?.[i]) return lockedColors[i]!;

    hue = (hue + 360 * PHI) % 360;

    // Add slight per-color variation for organic feel
    const l = Math.max(0.3, Math.min(0.85, lightness + (Math.random() - 0.5) * 0.12));
    const c = Math.max(0.05, Math.min(0.3, chroma + (Math.random() - 0.5) * 0.06));

    return oklchToHex(l, c, hue);
  });
}

export type PaletteMood = "warm" | "cool" | "pastel" | "neon" | "earthy" | "monochrome";

/**
 * Generate a palette constrained by mood.
 * Each mood defines constrained hue ranges, chroma, and lightness in OKLCH space.
 *
 * @param count - Number of colors (2-10)
 * @param mood - Optional mood constraint
 * @returns Array of hex color strings
 */
export function generateSmartPalette(count: number, mood?: string): string[] {
  const n = Math.max(2, Math.min(10, count));

  // Define mood constraints in OKLCH space
  interface MoodConfig {
    hueRange: [number, number]; // hue start and end
    hueWrap: boolean;           // whether range wraps around 360
    lightness: [number, number];
    chroma: [number, number];
  }

  const moodConfigs: Record<string, MoodConfig> = {
    warm: {
      hueRange: [0, 80],        // reds, oranges, yellows
      hueWrap: false,
      lightness: [0.50, 0.78],
      chroma: [0.12, 0.22],
    },
    cool: {
      hueRange: [180, 300],     // cyans, blues, purples
      hueWrap: false,
      lightness: [0.40, 0.75],
      chroma: [0.08, 0.20],
    },
    pastel: {
      hueRange: [0, 360],       // full range
      hueWrap: false,
      lightness: [0.78, 0.92],  // high lightness
      chroma: [0.04, 0.10],     // low chroma = soft
    },
    neon: {
      hueRange: [0, 360],       // full range
      hueWrap: false,
      lightness: [0.60, 0.80],
      chroma: [0.20, 0.35],     // max chroma = electric
    },
    earthy: {
      hueRange: [20, 100],      // browns, greens, olives
      hueWrap: false,
      lightness: [0.35, 0.65],
      chroma: [0.04, 0.12],     // muted
    },
    monochrome: {
      hueRange: [0, 0],         // single hue
      hueWrap: false,
      lightness: [0.20, 0.90],
      chroma: [0.0, 0.04],      // near-zero chroma = grays
    },
  };

  const config = mood && moodConfigs[mood] ? moodConfigs[mood] : null;

  if (!config) {
    // No mood or unrecognized mood: fall back to OKLCH golden ratio
    return generateRandomPalette(n);
  }

  // For monochrome: pick one hue, vary only lightness
  if (mood === "monochrome") {
    const baseHue = Math.random() * 360;
    return Array.from({ length: n }, (_, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const l = config.lightness[0] + t * (config.lightness[1] - config.lightness[0]);
      const c = 0.0; // true monochrome
      return oklchToHex(l, c, baseHue);
    });
  }

  // For other moods: distribute hues within the constrained range
  const [hueMin, hueMax] = config.hueRange;
  const hueSpan = hueMax > hueMin ? hueMax - hueMin : 360 - hueMin + hueMax;

  return Array.from({ length: n }, (_, i) => {
    // Distribute hues evenly within the mood's range, with slight jitter
    const baseT = n === 1 ? 0.5 : i / (n - 1);
    const jitter = (Math.random() - 0.5) * (hueSpan / n) * 0.3;
    const hue = (hueMin + baseT * hueSpan + jitter + 360) % 360;

    const [lMin, lMax] = config.lightness;
    const l = lMin + Math.random() * (lMax - lMin);

    const [cMin, cMax] = config.chroma;
    const c = cMin + Math.random() * (cMax - cMin);

    return oklchToHex(l, c, hue);
  });
}

// ─── Harmony Generation ─────────────────────────────────────────────────────

export function generateHarmony(baseHex: string, type: HarmonyType): string[] {
  const { h, s, l } = hexToHsl(baseHex);
  switch (type) {
    case "complementary":
      return [baseHex, hslToHex((h + 180) % 360, s, l)];
    case "analogous":
      return [hslToHex((h - 30 + 360) % 360, s, l), baseHex, hslToHex((h + 30) % 360, s, l)];
    case "triadic":
      return [baseHex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)];
    case "split-complementary":
      return [baseHex, hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)];
    case "tetradic":
      return [baseHex, hslToHex((h + 90) % 360, s, l), hslToHex((h + 180) % 360, s, l), hslToHex((h + 270) % 360, s, l)];
    case "monochromatic":
      return [
        hslToHex(h, s, Math.max(0.15, l - 0.2)),
        hslToHex(h, s, Math.max(0.25, l - 0.1)),
        baseHex,
        hslToHex(h, s, Math.min(0.85, l + 0.1)),
        hslToHex(h, s, Math.min(0.95, l + 0.2)),
      ];
    default:
      return [baseHex];
  }
}

// ─── Color Adjustments ──────────────────────────────────────────────────────

export function getShades(hex: string, count: number = 9): string[] {
  const { h, s } = hexToHsl(hex);
  return Array.from({ length: count }, (_, i) => {
    const l = 0.95 - (i / (count - 1)) * 0.85;
    return hslToHex(h, s, l);
  });
}

export function adjustHue(hex: string, degrees: number): string {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex((h + degrees + 360) % 360, s, l);
}

export function adjustSaturation(hex: string, amount: number): string {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, Math.max(0, Math.min(1, s + amount)), l);
}

export function adjustLightness(hex: string, amount: number): string {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, s, Math.max(0, Math.min(1, l + amount)));
}

export function mixColors(hex1: string, hex2: string, ratio: number = 0.5): string {
  const { h: h1, s: s1, l: l1 } = hexToHsl(hex1);
  const { h: h2, s: s2, l: l2 } = hexToHsl(hex2);
  // Handle hue interpolation through shortest path
  let dh = h2 - h1;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  return hslToHex(
    ((h1 + dh * ratio) + 360) % 360,
    s1 + (s2 - s1) * ratio,
    l1 + (l2 - l1) * ratio
  );
}

export function randomHex(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}
