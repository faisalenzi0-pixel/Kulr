"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { generateRandomPalette } from "@/lib/color-engine";

// ─── Helpers ────────────────────────────────────────────────────────────────

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? "#000000" : "#FFFFFF";
}

// ─── Animation ──────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const;

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Counter ───────────────────────────────────────────────────────

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ─── Hero Palette Demo ──────────────────────────────────────────────────────

function HeroPalette() {
  const [colors, setColors] = useState(["#8B5CF6", "#EC4899", "#F59E0B", "#22C55E", "#3B82F6"]);
  const [spinning, setSpinning] = useState(false);

  const regenerate = useCallback(() => {
    setSpinning(true);
    setColors(generateRandomPalette(5));
    setTimeout(() => setSpinning(false), 400);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        regenerate();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [regenerate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.6, ease }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Browser chrome */}
      <div className="rounded-3xl overflow-hidden border border-[var(--color-border-strong)] shadow-[0_40px_100px_-20px_rgba(139,92,246,0.15),0_20px_60px_-30px_rgba(0,0,0,0.4)]">
        {/* Title bar */}
        <div className="flex items-center gap-3 px-5 py-3.5 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.15)]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.15)]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.15)]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-5 py-1.5 rounded-lg bg-overlay-3 border border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text-muted)] tracking-wide flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-40"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              kulr.app/generate
            </div>
          </div>
          <div className="w-[60px]" />
        </div>

        {/* Palette display */}
        <div className="flex h-44 sm:h-56 md:h-72 cursor-pointer relative" onClick={regenerate}>
          {colors.map((color, i) => (
            <motion.div
              key={`${i}-${color}`}
              className="relative flex-1 flex flex-col items-center justify-end pb-6 group"
              style={{ backgroundColor: color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ flex: 1.8 }}
            >
              <motion.span
                className="font-mono text-xs sm:text-sm font-bold tracking-widest select-none mb-1"
                style={{ color: getContrastColor(color), opacity: 0.85 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ delay: 0.8 + i * 0.06 }}
              >
                {color.toUpperCase()}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)] font-medium">
            <kbd>Space</kbd>
            <span>to generate</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); regenerate(); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] hover:opacity-90 shadow-lg shadow-purple-500/20 transition-all duration-200 hover:shadow-purple-500/30 hover:-translate-y-px active:translate-y-0"
          >
            <motion.svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              animate={spinning ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </motion.svg>
            Generate
          </button>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-center mt-5 text-xs text-[var(--color-text-muted)]"
      >
        Try it — click the palette or press <kbd>Space</kbd>
      </motion.p>
    </motion.div>
  );
}

// ─── Feature Cards ──────────────────────────────────────────────────────────

const features = [
  {
    title: "Generate",
    href: "/generate",
    desc: "Press Space. Get beautiful palettes. Lock colors you love. Up to 10 per palette.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
      </svg>
    ),
    gradient: "from-violet-500/20 to-purple-500/20",
    accentColor: "#8B5CF6",
    demoColors: ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE"],
  },
  {
    title: "Extract",
    href: "/extract",
    desc: "Drop any image. Get its color DNA in milliseconds. K-means clustering, all in-browser.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
      </svg>
    ),
    gradient: "from-emerald-500/20 to-teal-500/20",
    accentColor: "#10B981",
    demoColors: ["#059669", "#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5"],
  },
  {
    title: "Contrast",
    href: "/contrast",
    desc: "Real-time WCAG AA & AAA checking. Auto-suggest accessible colors that look good.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" opacity="0.15" />
      </svg>
    ),
    gradient: "from-amber-500/20 to-orange-500/20",
    accentColor: "#F59E0B",
    demoColors: ["#1E293B", "#FFFFFF", "#22C55E", "#EF4444", "#3B82F6"],
  },
  {
    title: "Visualize",
    href: "/visualizer",
    desc: "Preview palettes on dashboards, landing pages, mobile apps, and e-commerce UIs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    gradient: "from-pink-500/20 to-rose-500/20",
    accentColor: "#EC4899",
    demoColors: ["#EC4899", "#F472B6", "#F9A8D4", "#FBCFE8", "#FCE7F3"],
  },
  {
    title: "Explore",
    href: "/explore",
    desc: "Browse 240+ hand-picked palettes. Filter by mood, style, season, industry.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    gradient: "from-blue-500/20 to-cyan-500/20",
    accentColor: "#3B82F6",
    demoColors: ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"],
  },
  {
    title: "Gradient",
    href: "/gradient",
    desc: "Build multi-stop CSS gradients. Linear, radial, conic. Copy the code instantly.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="gd-icon" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#8B5CF6" /><stop offset="100%" stopColor="#EC4899" /></linearGradient></defs>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="url(#gd-icon)" /><path d="M3 12h18" stroke="url(#gd-icon)" />
      </svg>
    ),
    gradient: "from-violet-500/20 to-fuchsia-500/20",
    accentColor: "#A855F7",
    demoColors: ["#A855F7", "#C084FC", "#D8B4FE", "#E9D5FF", "#F3E8FF"],
  },
];

function FeatureCard({ f, i }: { f: typeof features[0]; i: number }) {
  return (
    <FadeIn delay={i * 0.06}>
      <Link href={f.href} className="group block">
        <div className="relative surface rounded-2xl p-6 md:p-8 hover:border-[var(--color-border-strong)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 overflow-hidden h-full">
          {/* Ambient glow on hover */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: f.accentColor }}
          />

          <div className="relative z-10">
            {/* Icon */}
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} mb-5`}
              style={{ color: f.accentColor }}
            >
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-[var(--color-text)] transition-colors">
              {f.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
              {f.desc}
            </p>

            {/* Mini palette preview */}
            <div className="flex rounded-lg overflow-hidden h-8 border border-[var(--color-border)]">
              {f.demoColors.map((c, ci) => (
                <div key={ci} className="flex-1 transition-all duration-300 group-hover:first:flex-[1.4]" style={{ backgroundColor: c }} />
              ))}
            </div>

            {/* Arrow */}
            <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
              Try it
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-200 group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

// ─── Bento Grid ─────────────────────────────────────────────────────────────

const bentoItems = [
  { title: "Export Anything", desc: "CSS variables, Tailwind config, SCSS, JSON, PNG, shareable URL — one click.", icon: "export" },
  { title: "Keyboard-First", desc: "Space to generate. L to lock. C to copy. Every action has a shortcut.", icon: "keyboard" },
  { title: "Save & Organize", desc: "Build your palette library. Favorites sync to every tool instantly.", icon: "save" },
  { title: "100% Private", desc: "Everything runs in your browser. No data leaves your device. Ever.", icon: "shield" },
  { title: "Dark & Light", desc: "Premium theme that adapts to your preference. Both modes are first-class.", icon: "theme" },
  { title: "Color Blind Safe", desc: "Simulate protanopia, deuteranopia, tritanopia. Design for everyone.", icon: "eye" },
  { title: "240+ Palettes", desc: "Hand-curated collection. Trending 2026, Material, Tailwind, brand-inspired.", icon: "palette" },
  { title: "Zero Cost", desc: "No sign-up. No paywall. No limits. Professional tools, completely free.", icon: "free" },
];

function BentoIcon({ type }: { type: string }) {
  const props = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "export": return <svg {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;
    case "keyboard": return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" /></svg>;
    case "save": return <svg {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>;
    case "shield": return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "theme": return <svg {...props}><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></svg>;
    case "eye": return <svg {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "palette": return <svg {...props}><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" /><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" /><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" /><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" /></svg>;
    case "free": return <svg {...props}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
    default: return null;
  }
}

// ─── Scroll-driven parallax orbs ────────────────────────────────────────────

function ParallaxOrbs() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div style={{ y: y1 }} className="glow-orb w-[800px] h-[800px] bg-[var(--color-accent-purple)] -top-[300px] -left-[300px] animate-[pulse-glow_8s_ease-in-out_infinite]" />
      <motion.div style={{ y: y2 }} className="glow-orb w-[600px] h-[600px] bg-[var(--color-accent-pink)] -bottom-[200px] -right-[200px] animate-[pulse-glow_10s_ease-in-out_infinite_2s]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[var(--color-accent-amber)] top-[30%] right-[5%] animate-[pulse-glow_7s_ease-in-out_infinite_1s]" />
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-20 md:pt-28 md:pb-28">
        <ParallaxOrbs />

        <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-overlay-3 border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]" />
              </span>
              Free forever &middot; No sign-up
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
            className="mb-8"
          >
            <span className="block text-base sm:text-lg font-semibold text-[var(--color-text-secondary)] tracking-tight mb-4">Free Color Palette Generator &amp; Design Tools</span>
            <span className="block text-[3.2rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-bold tracking-[-0.035em] leading-[0.95]">
              Colors that
              <br />
              <span className="gradient-text">click.</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl lg:text-2xl text-[var(--color-text-secondary)] mb-14 max-w-2xl mx-auto leading-relaxed font-light"
          >
            The complete free color palette generator for designers and developers.
            <span className="hidden sm:inline"> Generate palettes, extract colors from images, check contrast, build gradients — all in one place.</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link
              href="/generate"
              className="group relative px-10 py-4.5 rounded-2xl text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-purple-500/25 active:translate-y-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-purple)] via-[var(--color-accent-pink)] to-[var(--color-accent-amber)]" />
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-purple)] via-[var(--color-accent-pink)] to-[var(--color-accent-amber)] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <span className="relative flex items-center gap-2.5">
                Start Creating
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
            <Link
              href="/explore"
              className="px-10 py-4.5 rounded-2xl text-[var(--color-text-secondary)] font-semibold text-base border border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)] hover:bg-overlay-3 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Explore 240+ Palettes
            </Link>
          </motion.div>

          {/* Live demo */}
          <HeroPalette />
        </div>
      </section>

      {/* ═══════════ SOCIAL PROOF / STATS ═══════════ */}
      <section className="px-4 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0 mb-16 md:mb-20">
            {[
              { value: 240, suffix: "+", label: "Curated Palettes" },
              { value: 175, suffix: "+", label: "Color Pages" },
              { value: 12, suffix: "", label: "Pro Tools" },
              { value: 6, suffix: "", label: "Export Formats" },
              { value: 0, suffix: "", label: "Price — Forever", display: "$0" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className={`text-center ${i < 4 ? "md:border-r md:border-[var(--color-border-subtle)]" : ""}`}>
                  <div className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-2">
                    {stat.display ?? <AnimatedNumber value={stat.value} suffix={stat.suffix} />}
                  </div>
                  <div className="text-sm text-[var(--color-text-muted)] font-medium">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Trust strip */}
          <FadeIn>
            <div className="surface rounded-2xl p-6 md:p-8">
              <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
                    title: "100% Browser-Based",
                    desc: "No uploads, no servers. Every tool runs locally on your device. Your data never leaves your browser.",
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
                    title: "No Account Needed",
                    desc: "Start creating immediately. No email, no sign-up, no paywall. Every feature is free with zero limits.",
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>,
                    title: "WCAG Compliant",
                    desc: "Built-in AA/AAA contrast checking, color blindness simulation, and accessible color suggestions.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="text-[var(--color-accent-purple)] shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight mb-1">{item.title}</h3>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ TOOLS GRID ═══════════ */}
      <section className="px-4 py-24 md:py-36">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn className="text-center mb-16 md:mb-24">
            <p className="text-sm font-semibold text-[var(--color-accent-purple)] uppercase tracking-widest mb-4">Tools</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Everything you need.
              <br className="hidden sm:block" />
              <span className="text-[var(--color-text-secondary)]">Nothing you don&apos;t.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {features.map((f, i) => (
              <FeatureCard key={f.title} f={f} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BENTO "AND MORE" ═══════════ */}
      <section className="px-4 py-24 md:py-36">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn className="text-center mb-14 md:mb-20">
            <p className="text-sm font-semibold text-[var(--color-accent-pink)] uppercase tracking-widest mb-4">Details</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Built different.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-border)] rounded-3xl overflow-hidden shadow-xl shadow-black/5">
            {bentoItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.04}>
                <div className="bg-[var(--color-bg)] p-6 md:p-8 hover:bg-[var(--color-surface)] transition-all duration-300 h-full group cursor-default">
                  <div className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-purple)] transition-colors duration-300 mb-4">
                    <BentoIcon type={item.icon} />
                  </div>
                  <div className="text-sm font-bold mb-1.5 tracking-tight">{item.title}</div>
                  <div className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WORKFLOW ═══════════ */}
      <section className="px-4 py-24 md:py-36 relative">
        <div className="glow-orb w-[500px] h-[500px] bg-[var(--color-accent-purple)] top-[10%] -left-[150px] animate-[pulse-glow_8s_ease-in-out_infinite]" />

        <div className="max-w-[900px] mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-semibold text-[var(--color-accent-amber)] uppercase tracking-widest mb-4">Workflow</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              From idea to palette in seconds
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
              Four steps. No friction. Just beautiful colors.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {[
              { step: "01", title: "Generate or extract", desc: "Hit Space for random palettes, or drop an image to extract colors.", accent: "var(--color-accent-purple)" },
              { step: "02", title: "Refine your palette", desc: "Lock colors you love, adjust harmony modes, add or remove stops.", accent: "var(--color-accent-pink)" },
              { step: "03", title: "Test on real UIs", desc: "Preview on dashboards, landing pages, mobile apps. Check contrast.", accent: "var(--color-accent-amber)" },
              { step: "04", title: "Export & ship", desc: "Copy CSS, Tailwind, SCSS, JSON, PNG, or share via URL. Done.", accent: "var(--color-success)" },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.08}>
                <div className="surface rounded-2xl p-7 md:p-8 hover:border-[var(--color-border-strong)] transition-all duration-300 h-full">
                  <div className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: item.accent, opacity: 0.25 }}>
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold tracking-tight mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative px-4 py-32 md:py-44">
        <div className="glow-orb w-[700px] h-[700px] bg-[var(--color-accent-pink)] top-[-250px] left-[50%] -translate-x-1/2 animate-[pulse-glow_7s_ease-in-out_infinite]" />

        <FadeIn className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-8">
            Ready to find
            <br />
            your <span className="gradient-text">palette</span>?
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl mb-14 max-w-lg mx-auto leading-relaxed font-light">
            No sign-up. No paywall. Just colors.
          </p>

          <Link
            href="/generate"
            className="group relative inline-flex items-center gap-2.5 px-12 py-5 rounded-2xl text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-purple-500/25 active:translate-y-0"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-purple)] via-[var(--color-accent-pink)] to-[var(--color-accent-amber)]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-purple)] via-[var(--color-accent-pink)] to-[var(--color-accent-amber)] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <span className="relative flex items-center gap-2.5">
              Start Creating
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-5 text-xs text-[var(--color-text-muted)]"
          >
            {[
              { key: "Space", action: "Generate" },
              { key: "L", action: "Lock color" },
              { key: "C", action: "Copy hex" },
              { key: "E", action: "Export" },
            ].map((s, i) => (
              <span key={s.key} className="flex items-center gap-2">
                {i > 0 && <span className="w-px h-3.5 bg-overlay-8 -ml-2.5" />}
                <kbd>{s.key}</kbd>
                <span>{s.action}</span>
              </span>
            ))}
          </motion.div>
        </FadeIn>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-[var(--color-border-subtle)] px-4 py-14 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
              <div className="gradient-text font-bold text-xl tracking-tight mb-3">kulr</div>
              <p className="text-sm text-[var(--color-text-muted)] max-w-xs leading-relaxed">
                Professional color tools, free forever. Built for designers who care about every pixel.
              </p>
            </div>

            {/* Generators */}
            <div>
              <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Create</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { href: "/generate", label: "Palette Generator" },
                  { href: "/gradient", label: "Gradient Builder" },
                  { href: "/picker", label: "Color Picker" },
                  { href: "/extract", label: "Image Extractor" },
                  { href: "/visualizer", label: "UI Visualizer" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200">{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Explore</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { href: "/explore", label: "Curated Palettes" },
                  { href: "/colors", label: "Color Names" },
                  { href: "/tailwind", label: "Tailwind Colors" },
                  { href: "/brands", label: "Brand Colors" },
                  { href: "/psychology", label: "Color Psychology" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200">{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Tools + Legal */}
            <div>
              <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Tools</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { href: "/contrast", label: "Contrast Checker" },
                  { href: "/convert", label: "Color Converter" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200">{item.label}</Link>
                ))}
              </div>
              <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4 mt-8">Legal</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/privacy" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200">Terms of Service</Link>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
            <span>&copy; {new Date().getFullYear()} Kulr. All rights reserved.</span>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-[var(--color-text-secondary)] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--color-text-secondary)] transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
