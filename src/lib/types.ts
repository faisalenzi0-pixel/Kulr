export interface RGB { r: number; g: number; b: number }
export interface HSL { h: number; s: number; l: number }
export interface OKLCH { l: number; c: number; h: number }

export type HarmonyType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "tetradic"
  | "monochromatic";

export interface SavedPalette {
  id: string;
  name: string;
  colors: string[];
  tags: string[];
  createdAt: number;
}

export interface WCAGResult {
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

export interface CuratedPalette {
  id: string;
  name: string;
  colors: string[];
  tags: string[];
}

export type ExportFormat = "css" | "tailwind" | "scss" | "json" | "png" | "url";

// Gradient types
export interface GradientStop {
  color: string;
  position: number;
}

export type GradientType = "linear" | "radial" | "conic";

export interface Gradient {
  stops: GradientStop[];
  type: GradientType;
  angle: number;
}

// Color blindness types
export type ColorBlindType = "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";
