"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SavedPalette } from "@/lib/types";
import { generatePaletteId } from "@/lib/palette-utils";

function paletteKey(colors: string[]): string {
  return colors.map((c) => c.toLowerCase()).sort().join(",");
}

interface SavedState {
  palettes: SavedPalette[];
  save: (colors: string[], name?: string) => boolean;
  remove: (id: string) => void;
  rename: (id: string, name: string) => void;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      palettes: [],
      save: (colors, name) => {
        const key = paletteKey(colors);
        if (get().palettes.some((p) => paletteKey(p.colors) === key)) return false;
        const palette: SavedPalette = {
          id: generatePaletteId(),
          name: name || `Palette ${Date.now()}`,
          colors,
          tags: [],
          createdAt: Date.now(),
        };
        set((s) => ({ palettes: [palette, ...s.palettes] }));
        return true;
      },
      remove: (id) => set((s) => ({ palettes: s.palettes.filter((p) => p.id !== id) })),
      rename: (id, name) =>
        set((s) => ({
          palettes: s.palettes.map((p) => (p.id === id ? { ...p, name } : p)),
        })),
    }),
    { name: "kulr-saved-palettes" }
  )
);
