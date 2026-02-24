import { hexToHsl, getRelativeLuminance } from "./color-convert";

export function encodePalette(colors: string[]): string {
  return colors.map((c) => c.replace("#", "")).join("-");
}

export function decodePalette(encoded: string): string[] {
  return encoded.split("-").map((c) => "#" + c);
}

export function sortByHue(colors: string[]): string[] {
  return [...colors].sort((a, b) => hexToHsl(a).h - hexToHsl(b).h);
}

export function sortByLuminance(colors: string[]): string[] {
  return [...colors].sort((a, b) => getRelativeLuminance(b) - getRelativeLuminance(a));
}

export function generatePaletteId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function paletteToCssVars(colors: string[]): string {
  return colors.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n");
}

export function paletteToTailwind(colors: string[]): string {
  const entries = colors.map((c, i) => `      '${i + 1}': '${c}',`).join("\n");
  return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        palette: {\n${entries}\n        },\n      },\n    },\n  },\n};`;
}

export function paletteToScss(colors: string[]): string {
  return colors.map((c, i) => `$color-${i + 1}: ${c};`).join("\n");
}

export function paletteToJson(colors: string[]): string {
  const obj: Record<string, string> = {};
  colors.forEach((c, i) => { obj[`color-${i + 1}`] = c; });
  return JSON.stringify(obj, null, 2);
}

/**
 * Generate an SVG image of the palette as a horizontal color strip.
 * Each color occupies an equal-width vertical band.
 * The SVG is returned as a string that can be used as a data URI, file download, or embedded inline.
 *
 * @param colors - Array of hex color strings
 * @param width - Total SVG width in pixels (default: 800)
 * @param height - Total SVG height in pixels (default: 200)
 * @returns SVG markup as a string
 */
export function paletteToSvg(colors: string[], width: number = 800, height: number = 200): string {
  if (colors.length === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#808080"/></svg>`;
  }

  const bandWidth = width / colors.length;
  const rects = colors
    .map((color, i) => {
      const x = i * bandWidth;
      // Use slightly wider rects to prevent sub-pixel gaps between bands
      const w = i < colors.length - 1 ? bandWidth + 0.5 : bandWidth;
      return `  <rect x="${x}" y="0" width="${w}" height="${height}" fill="${color}"/>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n${rects}\n</svg>`;
}
