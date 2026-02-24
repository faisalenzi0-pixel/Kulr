import type { ColorBlindType } from "./types";
import { hexToRgb, rgbToHex } from "./color-convert";

/**
 * Color blindness simulation using Brettel/Vienot algorithm.
 * Matrices are applied in linearized sRGB space for accuracy.
 *
 * Sources:
 * - Vienot, Brettel, Mollon (1999) "Digital video colourmaps for checking
 *   the legibility of displays by dichromats"
 * - Brettel, Vienot, Mollon (1997) "Computerized simulation of color
 *   appearance for dichromats"
 */

// 3x3 transformation matrices in linear RGB space
// Each row transforms [R, G, B] to the simulated channel

// Protanopia: loss of L-cones (red-blind)
// Vienot et al. 1999 protanopia simulation matrix
const PROTANOPIA_MATRIX: number[][] = [
  [0.152286, 1.052583, -0.204868],
  [0.114503, 0.786281,  0.099216],
  [-0.003882, -0.048116, 1.051998],
];

// Deuteranopia: loss of M-cones (green-blind)
// Vienot et al. 1999 deuteranopia simulation matrix
const DEUTERANOPIA_MATRIX: number[][] = [
  [0.367322, 0.860646, -0.227968],
  [0.280085, 0.672501,  0.047413],
  [-0.011820, 0.042940,  0.968881],
];

// Tritanopia: loss of S-cones (blue-blind)
// Brettel et al. 1997 tritanopia simulation matrix
const TRITANOPIA_MATRIX: number[][] = [
  [1.255528, -0.076749, -0.178779],
  [-0.078411, 0.930809,  0.147602],
  [0.004733,  0.691367,  0.303900],
];

/**
 * Convert sRGB component (0-255) to linear RGB (0-1).
 * Applies inverse sRGB companding (gamma decoding).
 */
function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/**
 * Convert linear RGB (0-1) to sRGB component (0-255).
 * Applies sRGB companding (gamma encoding).
 */
function linearToSrgb(c: number): number {
  const clamped = Math.max(0, Math.min(1, c));
  const s = clamped <= 0.0031308
    ? clamped * 12.92
    : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  return Math.round(s * 255);
}

/**
 * Apply a 3x3 matrix transformation to a linear RGB triplet.
 */
function applyMatrix(matrix: number[][], r: number, g: number, b: number): [number, number, number] {
  return [
    matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b,
    matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b,
    matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b,
  ];
}

/**
 * Simulate achromatopsia (total color blindness) using luminance-based
 * grayscale conversion in linear space with standard sRGB luminance weights.
 */
function simulateAchromatopsia(r: number, g: number, b: number): [number, number, number] {
  const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return [gray, gray, gray];
}

/**
 * Simulate how a hex color appears under a specific color vision deficiency.
 *
 * @param hex - Input color as hex string (e.g., "#FF5500")
 * @param type - Type of color blindness to simulate
 * @returns Simulated color as hex string
 */
export function simulateColorBlind(hex: string, type: ColorBlindType): string {
  const { r, g, b } = hexToRgb(hex);

  // Convert to linear RGB
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  let simR: number, simG: number, simB: number;

  switch (type) {
    case "protanopia":
      [simR, simG, simB] = applyMatrix(PROTANOPIA_MATRIX, lr, lg, lb);
      break;
    case "deuteranopia":
      [simR, simG, simB] = applyMatrix(DEUTERANOPIA_MATRIX, lr, lg, lb);
      break;
    case "tritanopia":
      [simR, simG, simB] = applyMatrix(TRITANOPIA_MATRIX, lr, lg, lb);
      break;
    case "achromatopsia":
      [simR, simG, simB] = simulateAchromatopsia(lr, lg, lb);
      break;
    default:
      [simR, simG, simB] = [lr, lg, lb];
  }

  // Convert back to sRGB
  return rgbToHex(linearToSrgb(simR), linearToSrgb(simG), linearToSrgb(simB));
}

/**
 * Simulate how an entire palette appears under a specific color vision deficiency.
 *
 * @param colors - Array of hex color strings
 * @param type - Type of color blindness to simulate
 * @returns Array of simulated hex color strings
 */
export function simulatePalette(colors: string[], type: ColorBlindType): string[] {
  return colors.map((c) => simulateColorBlind(c, type));
}
