"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import {
  paletteToCssVars,
  paletteToTailwind,
  paletteToScss,
  paletteToJson,
  paletteToSvg,
  encodePalette,
} from "@/lib/palette-utils";
import { shouldUseWhiteText } from "@/lib/color-convert";

interface Props {
  open: boolean;
  onClose: () => void;
  colors: string[];
}

const tabs = ["CSS", "Tailwind", "SCSS", "JSON", "SVG", "Link"] as const;
type TabType = (typeof tabs)[number];

// ─── Syntax Highlight Helpers ───────────────────────────────────────────────

function highlightHex(text: string, colors: string[]): React.ReactNode[] {
  // Split text into parts, colorizing hex values
  const hexRegex = /(#[0-9a-fA-F]{6})/g;
  const parts = text.split(hexRegex);

  return parts.map((part, i) => {
    if (part.match(hexRegex)) {
      const hex = part.toLowerCase();
      const isInPalette = colors.some((c) => c.toLowerCase() === hex);
      return (
        <span
          key={i}
          className="font-bold inline-flex items-center gap-1"
          style={{
            color: isInPalette ? part : undefined,
          }}
        >
          {isInPalette && (
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: part, border: "1px solid var(--color-border-strong)" }}
            />
          )}
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function highlightSyntax(text: string, language: string, colors: string[]): React.ReactNode {
  // Layer 1: highlight hex colors
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    let processed: React.ReactNode;

    // CSS/SCSS properties
    if (language === "css" || language === "scss") {
      const propMatch = line.match(/^(\s*)([\w-]+)(:)(.*)(;?)$/);
      if (propMatch) {
        const [, indent, prop, colon, value, semi] = propMatch;
        processed = (
          <>
            {indent}
            <span className="text-[#c792ea]">{prop}</span>
            <span className="text-[var(--color-text-muted)]">{colon}</span>
            <span>{" "}</span>
            {highlightHex(value.trim(), colors)}
            <span className="text-[var(--color-text-muted)]">{semi}</span>
          </>
        );
      } else if (line.includes("{") || line.includes("}")) {
        const parts = line.split(/([{}])/);
        processed = parts.map((p, i) =>
          p === "{" || p === "}" ? (
            <span key={i} className="text-[var(--color-text-muted)]">{p}</span>
          ) : (
            <span key={i} className="text-[#82aaff]">{p}</span>
          )
        );
      } else {
        processed = highlightHex(line, colors);
      }
    } else if (language === "json") {
      // JSON keys and values
      const keyMatch = line.match(/^(\s*)"([^"]+)"(\s*:\s*)"([^"]*)"(,?)$/);
      if (keyMatch) {
        const [, indent, key, colon, value, comma] = keyMatch;
        processed = (
          <>
            {indent}
            <span className="text-[#82aaff]">&quot;{key}&quot;</span>
            <span className="text-[var(--color-text-muted)]">{colon}</span>
            <span>&quot;</span>
            {highlightHex(value, colors)}
            <span>&quot;</span>
            <span className="text-[var(--color-text-muted)]">{comma}</span>
          </>
        );
      } else {
        processed = highlightHex(line, colors);
      }
    } else {
      processed = highlightHex(line, colors);
    }

    return (
      <div key={lineIdx} className="leading-relaxed">
        {processed}
      </div>
    );
  });
}

// ─── Export Modal ────────────────────────────────────────────────────────────

export function ExportModal({ open, onClose, colors }: Props) {
  const [tab, setTab] = useState<TabType>("CSS");
  const [copied, setCopied] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const getContent = useCallback((): string => {
    switch (tab) {
      case "CSS":
        return `:root {\n${paletteToCssVars(colors)}\n}`;
      case "Tailwind":
        return paletteToTailwind(colors);
      case "SCSS":
        return paletteToScss(colors);
      case "JSON":
        return paletteToJson(colors);
      case "SVG":
        return paletteToSvg(colors);
      case "Link":
        return `${typeof window !== "undefined" ? window.location.origin : ""}/generate?colors=${encodePalette(colors)}`;
    }
  }, [tab, colors]);

  const getLanguage = useCallback((): string => {
    switch (tab) {
      case "CSS":
        return "css";
      case "Tailwind":
        return "js";
      case "SCSS":
        return "scss";
      case "JSON":
        return "json";
      case "SVG":
        return "xml";
      case "Link":
        return "url";
      default:
        return "text";
    }
  }, [tab]);

  const content = useMemo(() => getContent(), [getContent]);
  const language = useMemo(() => getLanguage(), [getLanguage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-xl"
          >
            <div className="rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-2xl shadow-black/50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
                <h3 className="font-semibold text-base text-[var(--color-text)]">Export Palette</h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-overlay-6 text-[var(--color-text-secondary)] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Palette strip preview */}
              <div className="flex h-10">
                {colors.map((c, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 flex items-center justify-center"
                    style={{ backgroundColor: c }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <span
                      className="text-[9px] font-mono font-bold opacity-80 select-all"
                      style={{
                        color: shouldUseWhiteText(c) ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.6)",
                      }}
                    >
                      {c.toUpperCase()}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-0.5 px-3 pt-3 pb-0">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative px-3 py-2 rounded-t-lg text-xs font-medium transition-colors ${
                      tab === t
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {t}
                    {tab === t && (
                      <motion.div
                        layoutId="export-tab-indicator"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] rounded-full"
                        transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Code content */}
              <div className="px-4 pb-4">
                <div className="relative group">
                  <pre className="p-4 rounded-xl bg-overlay-4 border border-[var(--color-border-subtle)] text-[13px] font-mono text-[var(--color-text-secondary)] overflow-x-auto max-h-72 whitespace-pre-wrap break-all leading-relaxed">
                    {tab === "Link" ? (
                      <span className="text-[var(--color-accent-purple)] break-all">{content}</span>
                    ) : tab === "SVG" ? (
                      highlightHex(content, colors)
                    ) : (
                      highlightSyntax(content, language, colors)
                    )}
                  </pre>
                  {/* Quick copy overlay on hover */}
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-overlay-10 hover:bg-overlay-15 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-all text-xs"
                    title="Copy"
                  >
                    {copied ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-between px-5 py-3.5 border-t border-[var(--color-border)]">
                <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  {colors.length} colors
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-6 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleCopy}
                    className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:shadow-lg hover:shadow-[var(--color-accent-purple)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      "Copy"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
