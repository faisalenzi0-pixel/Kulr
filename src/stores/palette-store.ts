"use client";
import { create } from "zustand";
import { generateRandomPalette } from "@/lib/color-engine";

interface PaletteState {
  colors: string[];
  locked: boolean[];
  history: string[][];
  historyIndex: number;
  colorCount: number;

  generate: () => void;
  setColor: (index: number, hex: string) => void;
  toggleLock: (index: number) => void;
  addColor: () => void;
  removeColor: (index: number) => void;
  reorder: (from: number, to: number) => void;
  setColors: (colors: string[]) => void;
  undo: () => void;
  redo: () => void;
}

function pushHistory(state: PaletteState, newColors: string[]): Partial<PaletteState> {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(newColors);
  return { colors: newColors, history: newHistory, historyIndex: newHistory.length - 1 };
}

// Static initial palette to avoid hydration mismatch (Math.random differs server vs client)
const initial = ["#8B5CF6", "#EC4899", "#F59E0B", "#22C55E"];

export const usePaletteStore = create<PaletteState>((set, get) => ({
  colors: initial,
  locked: [false, false, false, false],
  history: [initial],
  historyIndex: 0,
  colorCount: 4,

  generate: () => {
    const { colors, locked } = get();
    const lockedColors = colors.map((c, i) => (locked[i] ? c : null));
    const newColors = generateRandomPalette(colors.length, lockedColors);
    set((s) => pushHistory(s, newColors));
  },

  setColor: (index, hex) => {
    const newColors = [...get().colors];
    newColors[index] = hex;
    set((s) => pushHistory(s, newColors));
  },

  toggleLock: (index) => {
    set((s) => {
      const locked = [...s.locked];
      locked[index] = !locked[index];
      return { locked };
    });
  },

  addColor: () => {
    const { colors, locked } = get();
    if (colors.length >= 10) return;
    const newColors = [...colors, generateRandomPalette(1)[0]];
    set((s) => ({ ...pushHistory(s, newColors), locked: [...locked, false], colorCount: newColors.length }));
  },

  removeColor: (index) => {
    const { colors, locked } = get();
    if (colors.length <= 2) return;
    const newColors = colors.filter((_, i) => i !== index);
    const newLocked = locked.filter((_, i) => i !== index);
    set((s) => ({ ...pushHistory(s, newColors), locked: newLocked, colorCount: newColors.length }));
  },

  reorder: (from, to) => {
    const { colors, locked } = get();
    const newColors = [...colors];
    const newLocked = [...locked];
    const [movedColor] = newColors.splice(from, 1);
    const [movedLock] = newLocked.splice(from, 1);
    newColors.splice(to, 0, movedColor);
    newLocked.splice(to, 0, movedLock);
    set((s) => ({ ...pushHistory(s, newColors), locked: newLocked }));
  },

  setColors: (colors) => {
    set((s) => ({
      ...pushHistory(s, colors),
      locked: colors.map(() => false),
      colorCount: colors.length,
    }));
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    set({ colors: history[newIndex], historyIndex: newIndex });
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    set({ colors: history[newIndex], historyIndex: newIndex });
  },
}));
