import type { WCAGResult } from "./types";
import { getRelativeLuminance, hexToHsl, hslToHex } from "./color-convert";

export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getWCAGLevel(ratio: number): WCAGResult {
  return {
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

export function isAccessible(fg: string, bg: string, level: "AA" | "AAA" = "AA"): boolean {
  const ratio = getContrastRatio(fg, bg);
  return level === "AAA" ? ratio >= 7 : ratio >= 4.5;
}

export function suggestAccessibleColor(fg: string, bg: string, targetRatio: number = 4.5): string {
  const { h, s } = hexToHsl(fg);
  const bgLum = getRelativeLuminance(bg);
  // Try darker first, then lighter
  for (let l = 0; l <= 100; l++) {
    const dark = hslToHex(h, s, l / 100);
    if (getContrastRatio(dark, bg) >= targetRatio) return dark;
  }
  return bgLum > 0.5 ? "#000000" : "#ffffff";
}
