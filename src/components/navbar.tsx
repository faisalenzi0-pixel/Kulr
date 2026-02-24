"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const mainLinks = [
  { href: "/generate", label: "Generate", shortcut: "G" },
  { href: "/explore", label: "Explore", shortcut: "E" },
  { href: "/extract", label: "Extract", shortcut: "X" },
  { href: "/contrast", label: "Contrast", shortcut: "C" },
  { href: "/visualizer", label: "Visualizer", shortcut: "V" },
  { href: "/gradient", label: "Gradient", shortcut: "D" },
];

const moreLinks = [
  { href: "/picker", label: "Color Picker" },
  { href: "/colors", label: "Color Names" },
  { href: "/convert", label: "Converter" },
  { href: "/tailwind", label: "Tailwind Colors" },
  { href: "/psychology", label: "Color Psychology" },
  { href: "/brands", label: "Brand Colors" },
];

const links = mainLinks; // Desktop nav uses mainLinks, mobile uses all

function KulrLogo() {
  return (
    <svg
      viewBox="0 0 186 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[18px] w-auto"
      aria-label="Kulr"
    >
      <defs>
        <linearGradient id="nav-kg" x1="0" y1="0" x2="186" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-accent-purple)" />
          <stop offset="45%" stopColor="var(--color-accent-pink)" />
          <stop offset="100%" stopColor="var(--color-accent-amber)" />
        </linearGradient>
      </defs>
      <g fill="url(#nav-kg)">
        <path d="M4 8 L4 64 L14 64 L14 42 L16 39.5 L36.5 64 L49 64 L24 35.5 L47 8 L34.5 8 L14 35 L14 8 Z" />
        <path d="M57 28 L57 49 C57 58 63.5 65 73.5 65 C83.5 65 90 58 90 49 L90 28 L80 28 L80 48.5 C80 52.5 77.5 55.5 73.5 55.5 C69.5 55.5 67 52.5 67 48.5 L67 28 Z" />
        <path d="M102 8 L102 64 L112 64 L112 8 Z" />
        <path d="M124 28 L124 64 L134 64 L134 42.5 C134 36 138.5 32 144 32 L150 32 L150 23 L144 23 C138 23 134.5 26 133 30 L134 28 Z" />
      </g>
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Track scroll for border
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(var(--overlay-inv), 0.8)" : "rgba(var(--overlay-inv), 0.5)",
        backdropFilter: scrolled ? "blur(32px) saturate(1.5)" : "blur(16px) saturate(1.2)",
        WebkitBackdropFilter: scrolled ? "blur(32px) saturate(1.5)" : "blur(16px) saturate(1.2)",
        borderBottom: scrolled ? "1px solid rgba(var(--overlay), 0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-[52px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group relative shrink-0">
          <KulrLogo />
        </Link>

        {/* Desktop nav — centered */}
        <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {mainLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-colors duration-150 ${
                  active
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }`}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(var(--overlay), 0.06)" }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
                {/* Keyboard shortcut tooltip */}
                <AnimatePresence>
                  {hoveredLink === link.href && !active && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border-strong)] rounded-md whitespace-nowrap pointer-events-none z-50"
                      style={{ boxShadow: "0 4px 12px rgba(var(--overlay-inv), 0.15)" }}
                    >
                      <kbd className="!text-[10px] !min-w-[16px] !h-[16px] !px-1">{link.shortcut}</kbd>
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}

          {/* More dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-colors duration-150 flex items-center gap-1 ${
                moreLinks.some((l) => pathname === l.href)
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
              }`}
            >
              More
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform duration-150 ${moreOpen ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {moreLinks.some((l) => pathname === l.href) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "rgba(var(--overlay), 0.06)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                />
              )}
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 py-1.5 rounded-xl border border-[var(--color-border-strong)] z-50 overflow-hidden"
                  style={{
                    background: "var(--color-surface)",
                    boxShadow: "0 8px 30px rgba(var(--overlay-inv), 0.2)",
                  }}
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2 text-[13px] font-medium transition-colors duration-150 ${
                        pathname === link.href
                          ? "text-[var(--color-text)] bg-overlay-4"
                          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-3"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Share page */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied!");
            }}
            className="p-2 rounded-lg text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-all duration-150"
            aria-label="Share page"
            title="Copy page link"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-overlay-4 transition-all duration-150"
              aria-label="Toggle theme"
            >
              <motion.svg
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {theme === "dark" ? (
                  <>
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </>
                ) : (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                )}
              </motion.svg>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-overlay-4 transition-all duration-150"
            aria-label="Menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: "1px solid rgba(var(--overlay), 0.04)" }}
          >
            <div className="px-4 py-3 flex flex-col gap-0.5">
              {[...mainLinks, ...moreLinks].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      pathname === link.href
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                    }`}
                    style={{
                      background: pathname === link.href ? "rgba(var(--overlay), 0.06)" : "transparent",
                    }}
                  >
                    {link.label}
                    {"shortcut" in link && (
                      <kbd className="!text-[10px] !min-w-[18px] !h-[18px]">{(link as typeof mainLinks[0]).shortcut}</kbd>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
