"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePaletteStore } from "@/stores/palette-store";
import { shouldUseWhiteText } from "@/lib/color-convert";
import { FavoritesPanel } from "@/components/favorites-panel";
import Link from "next/link";

const templates = ["Dashboard", "Landing Page", "Mobile App", "E-commerce", "Social Post", "Blog"] as const;

/* ─── Dashboard Template ──────────────────────────────────────────────── */
function DashboardPreview({ c }: { c: string[] }) {
  const stats = [
    { label: "Revenue", value: "$24,580", change: "+12.5%", up: true },
    { label: "Users", value: "1,234", change: "+8.2%", up: true },
    { label: "Orders", value: "567", change: "-3.1%", up: false },
  ];

  const tableRows = [
    { name: "Alex Chen", email: "alex@acme.co", role: "Admin", status: "Active" },
    { name: "Sarah Kim", email: "sarah@acme.co", role: "Editor", status: "Active" },
    { name: "Jamal Lee", email: "jamal@acme.co", role: "Viewer", status: "Inactive" },
    { name: "Maria Paz", email: "maria@acme.co", role: "Editor", status: "Active" },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden border border-[var(--color-border)] text-xs shadow-xl"
      style={{ backgroundColor: c[1] }}
    >
      <div className="flex flex-col sm:flex-row" style={{ minHeight: 480 }}>
        {/* Sidebar — hidden on mobile, shown as top bar instead */}
        <div
          className="hidden sm:flex w-48 border-r flex-col p-4 gap-1 flex-shrink-0"
          style={{ borderColor: c[1] + "80", backgroundColor: c[0] }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6 px-2">
            <div
              className="w-6 h-6 rounded-md"
              style={{ backgroundColor: c[2] }}
            />
            <span
              className="font-bold text-sm"
              style={{ color: c[3] }}
            >
              Acme Inc
            </span>
          </div>

          {/* Nav items */}
          {[
            { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3", label: "Overview", active: true },
            { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Analytics", active: false },
            { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", label: "Users", active: false },
            { icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", label: "Settings", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: item.active ? c[2] + "18" : "transparent",
                color: item.active ? c[2] : c[4],
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={item.icon} />
              </svg>
              <span className={item.active ? "font-semibold" : ""}>{item.label}</span>
            </div>
          ))}

          {/* Bottom user */}
          <div className="mt-auto pt-4 border-t flex items-center gap-2 px-2" style={{ borderColor: c[1] + "40" }}>
            <div className="w-7 h-7 rounded-full" style={{ backgroundColor: c[2] + "30" }} />
            <div>
              <div className="font-medium" style={{ color: c[3] }}>John Doe</div>
              <div style={{ color: c[4], fontSize: 9 }}>john@acme.co</div>
            </div>
          </div>
        </div>

        {/* Mobile header bar (shown only on small screens) */}
        <div
          className="sm:hidden flex items-center justify-between p-3 border-b"
          style={{ borderColor: c[1] + "80", backgroundColor: c[0] }}
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md" style={{ backgroundColor: c[2] }} />
            <span className="font-bold text-[11px]" style={{ color: c[3] }}>Acme Inc</span>
          </div>
          <div className="flex gap-3">
            {["Overview", "Analytics", "Users"].map((item, i) => (
              <span key={item} className="text-[9px]" style={{ color: i === 0 ? c[2] : c[4], fontWeight: i === 0 ? 600 : 400 }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 sm:p-5 overflow-hidden" style={{ backgroundColor: c[1] }}>
          {/* Top bar */}
          <div className="flex justify-between items-center mb-5">
            <div>
              <div className="text-base font-bold" style={{ color: c[3] }}>
                Dashboard
              </div>
              <div className="text-[10px] mt-0.5" style={{ color: c[4] }}>
                Welcome back, John
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="px-3 py-1.5 rounded-lg text-[10px] border"
                style={{ borderColor: c[4] + "30", color: c[4] }}
              >
                Last 7 days
              </div>
              <div
                className="px-4 py-1.5 rounded-lg text-white text-[10px] font-semibold"
                style={{ backgroundColor: c[2] }}
              >
                + New Report
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-3.5 rounded-xl"
                style={{ backgroundColor: c[0] }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] font-medium" style={{ color: c[4] }}>
                    {stat.label}
                  </div>
                  <span
                    className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: stat.up ? c[2] + "15" : "#EF444415",
                      color: stat.up ? c[2] : "#EF4444",
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-xl font-bold" style={{ color: c[3] }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl p-4 mb-5" style={{ backgroundColor: c[0] }}>
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold" style={{ color: c[3] }}>Revenue Overview</div>
              <div className="flex gap-3 text-[9px]" style={{ color: c[4] }}>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c[2] }} />
                  Income
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c[3] + "40" }} />
                  Expenses
                </span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-24">
              {[35, 55, 42, 70, 48, 65, 82, 58, 72, 45, 78, 60].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-0.5">
                  <div
                    className="rounded-t"
                    style={{
                      height: `${h}%`,
                      backgroundColor: c[2],
                      opacity: 0.85,
                    }}
                  />
                  <div
                    className="rounded-t"
                    style={{
                      height: `${h * 0.4}%`,
                      backgroundColor: c[3],
                      opacity: 0.15,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: c[0] }}>
            <div className="px-4 py-2.5 border-b" style={{ borderColor: c[1] }}>
              <span className="font-semibold" style={{ color: c[3] }}>Recent Users</span>
            </div>
            <div>
              {tableRows.map((row, i) => (
                <div
                  key={row.name}
                  className="flex items-center px-4 py-2 border-b"
                  style={{
                    borderColor: c[1],
                    backgroundColor: i % 2 === 0 ? "transparent" : c[1] + "20",
                  }}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                      style={{
                        backgroundColor: c[2] + "20",
                        color: c[2],
                      }}
                    >
                      {row.name[0]}
                    </div>
                    <div>
                      <div style={{ color: c[3] }}>{row.name}</div>
                      <div style={{ color: c[4], fontSize: 9 }}>{row.email}</div>
                    </div>
                  </div>
                  <div className="flex-1 text-center" style={{ color: c[4] }}>{row.role}</div>
                  <div className="flex-1 text-right">
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-medium"
                      style={{
                        backgroundColor: row.status === "Active" ? c[2] + "15" : c[4] + "15",
                        color: row.status === "Active" ? c[2] : c[4],
                      }}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Landing Page Template ───────────────────────────────────────────── */
function LandingPreview({ c }: { c: string[] }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-[var(--color-border)] text-xs shadow-xl"
      style={{ backgroundColor: c[0] }}
    >
      {/* Nav */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 border-b"
        style={{ borderColor: c[1] + "60" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md" style={{ backgroundColor: c[2] }} />
          <span className="font-bold text-sm" style={{ color: c[3] }}>
            Brand
          </span>
        </div>
        <div className="hidden sm:flex gap-6" style={{ color: c[4] }}>
          <span className="hover:opacity-80 cursor-default">Features</span>
          <span className="hover:opacity-80 cursor-default">Pricing</span>
          <span className="hover:opacity-80 cursor-default">About</span>
          <span className="hover:opacity-80 cursor-default">Blog</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="px-3 py-1.5 rounded-lg font-medium border"
            style={{ borderColor: c[4] + "30", color: c[4] }}
          >
            Log In
          </div>
          <div
            className="px-4 py-1.5 rounded-lg font-semibold"
            style={{
              backgroundColor: c[2],
              color: shouldUseWhiteText(c[2]) ? "#fff" : "#000",
            }}
          >
            Sign Up
          </div>
        </div>
      </div>

      {/* Hero with gradient */}
      <div
        className="text-center py-20 px-8 relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${c[0]} 0%, ${c[1]} 100%)`,
        }}
      >
        {/* Decorative blurs */}
        <div
          className="absolute top-4 left-1/4 w-48 h-48 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: c[2] }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: c[3] }}
        />

        <div className="relative z-10">
          <div
            className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold mb-4 border"
            style={{
              borderColor: c[2] + "30",
              backgroundColor: c[2] + "10",
              color: c[2],
            }}
          >
            Now in Public Beta
          </div>
          <div
            className="text-3xl font-bold mb-4 leading-tight"
            style={{ color: c[3] }}
          >
            Build Something
            <br />
            <span style={{ color: c[2] }}>Amazing</span>
          </div>
          <div
            className="text-sm mb-8 max-w-sm mx-auto leading-relaxed"
            style={{ color: c[4] }}
          >
            The fastest way to ship beautiful products. Design, build, and
            deploy with confidence.
          </div>
          <div className="flex justify-center gap-3">
            <div
              className="px-6 py-2.5 rounded-lg font-semibold shadow-lg"
              style={{
                backgroundColor: c[2],
                color: shouldUseWhiteText(c[2]) ? "#fff" : "#000",
                boxShadow: `0 4px 14px ${c[2]}40`,
              }}
            >
              Get Started Free
            </div>
            <div
              className="px-6 py-2.5 rounded-lg font-medium border"
              style={{ borderColor: c[4] + "30", color: c[4] }}
            >
              Watch Demo
            </div>
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div className="flex items-center justify-center gap-8 py-4 border-t border-b" style={{ borderColor: c[1] + "60" }}>
        {["Vercel", "Stripe", "Linear", "Figma", "Notion"].map((brand) => (
          <span key={brand} className="font-bold opacity-30" style={{ color: c[3] }}>
            {brand}
          </span>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6">
        {[
          { title: "Lightning Fast", desc: "Sub-second response times with edge computing." },
          { title: "Bank-Grade Security", desc: "End-to-end encryption and SOC 2 compliance." },
          { title: "Infinite Scale", desc: "Auto-scaling infrastructure that grows with you." },
        ].map((f) => (
          <div
            key={f.title}
            className="p-5 rounded-xl border"
            style={{
              backgroundColor: c[1],
              borderColor: c[4] + "10",
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: c[2] + "15" }}
            >
              <div className="w-4 h-4 rounded" style={{ backgroundColor: c[2] }} />
            </div>
            <div className="font-bold text-sm mb-1.5" style={{ color: c[3] }}>
              {f.title}
            </div>
            <div className="leading-relaxed" style={{ color: c[4] }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>

      {/* CTA banner */}
      <div
        className="mx-6 mb-6 p-6 rounded-xl text-center"
        style={{
          background: `linear-gradient(135deg, ${c[2]}20 0%, ${c[3]}10 100%)`,
          border: `1px solid ${c[2]}20`,
        }}
      >
        <div className="text-lg font-bold mb-2" style={{ color: c[3] }}>
          Ready to get started?
        </div>
        <div className="text-sm mb-4" style={{ color: c[4] }}>
          Join thousands of teams building better products.
        </div>
        <div
          className="inline-block px-6 py-2 rounded-lg font-semibold"
          style={{
            backgroundColor: c[2],
            color: shouldUseWhiteText(c[2]) ? "#fff" : "#000",
          }}
        >
          Start Building
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile App Template ─────────────────────────────────────────────── */
function MobilePreview({ c }: { c: string[] }) {
  return (
    <div className="flex justify-center">
      <div
        className="w-[280px] rounded-[2.5rem] overflow-hidden border-2 p-2 shadow-2xl"
        style={{ borderColor: c[4] + "20", backgroundColor: c[0] }}
      >
        <div className="rounded-[2rem] overflow-hidden" style={{ backgroundColor: c[0] }}>
          {/* Notch */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-20 h-5 rounded-full bg-black" />
          </div>

          {/* Status bar */}
          <div
            className="flex justify-between px-6 py-1.5 text-[10px] font-medium"
            style={{ color: c[4] }}
          >
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
              </svg>
            </div>
          </div>

          {/* Header with greeting */}
          <div className="px-6 pt-4 pb-3">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] font-medium" style={{ color: c[4] }}>
                  Good morning
                </div>
                <div className="text-lg font-bold" style={{ color: c[3] }}>
                  John
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  backgroundColor: c[2] + "20",
                  color: c[2],
                }}
              >
                JD
              </div>
            </div>

            {/* Quick stats */}
            <div
              className="p-4 rounded-2xl mb-4"
              style={{
                background: `linear-gradient(135deg, ${c[2]} 0%, ${c[2]}CC 100%)`,
              }}
            >
              <div className="text-[10px] font-medium mb-1" style={{ color: "#ffffffAA" }}>
                Today&apos;s progress
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">73%</div>
                <div className="text-[10px] text-white/70">5 of 7 tasks</div>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/20">
                <div className="h-full w-[73%] rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Tasks section */}
          <div className="px-6 pb-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold" style={{ color: c[3] }}>
                Today&apos;s Tasks
              </span>
              <span className="text-[10px]" style={{ color: c[2] }}>
                See all
              </span>
            </div>

            <div className="space-y-2">
              {[
                { text: "Design review", done: true, tag: "Design" },
                { text: "Team standup", done: true, tag: "Meeting" },
                { text: "Ship feature v2", done: false, tag: "Dev" },
                { text: "Update docs", done: false, tag: "Writing" },
                { text: "Code review PR", done: false, tag: "Dev" },
              ].map((task, i) => (
                <div
                  key={task.text}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: c[1] }}
                >
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: task.done ? c[2] : c[4] + "40",
                      backgroundColor: task.done ? c[2] : "transparent",
                    }}
                  >
                    {task.done && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[11px] font-medium block"
                      style={{
                        color: c[3],
                        textDecoration: task.done ? "line-through" : "none",
                        opacity: task.done ? 0.5 : 1,
                      }}
                    >
                      {task.text}
                    </span>
                  </div>
                  <span
                    className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: i % 2 === 0 ? c[2] + "15" : c[3] + "10",
                      color: i % 2 === 0 ? c[2] : c[4],
                    }}
                  >
                    {task.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom tab bar */}
          <div
            className="flex justify-around items-center py-3 mt-3 border-t"
            style={{ borderColor: c[1] }}
          >
            {[
              { label: "Home", active: true, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" },
              { label: "Search", active: false, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
              { label: "Add", active: false, icon: "M12 4v16m8-8H4" },
              { label: "Chat", active: false, icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
              { label: "Profile", active: false, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
            ].map((tab) => (
              <div key={tab.label} className="flex flex-col items-center gap-0.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={tab.active ? c[2] : c[4]}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: tab.active ? 1 : 0.5 }}
                >
                  <path d={tab.icon} />
                </svg>
                <span
                  className="text-[8px] font-medium"
                  style={{ color: tab.active ? c[2] : c[4], opacity: tab.active ? 1 : 0.5 }}
                >
                  {tab.label}
                </span>
              </div>
            ))}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2 pt-1">
            <div className="w-24 h-1 rounded-full" style={{ backgroundColor: c[3] + "30" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── E-commerce Template ─────────────────────────────────────────────── */
function EcommercePreview({ c }: { c: string[] }) {
  const products = [
    { name: "Minimalist Watch", price: "$189", rating: "4.9", reviews: "2.1k" },
    { name: "Leather Backpack", price: "$124", rating: "4.7", reviews: "891" },
    { name: "Wireless Earbuds", price: "$79", rating: "4.8", reviews: "3.4k" },
    { name: "Smart Notebook", price: "$34", rating: "4.6", reviews: "567" },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden border border-[var(--color-border)] text-xs shadow-xl"
      style={{ backgroundColor: c[0] }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b" style={{ borderColor: c[1] + "60" }}>
        <span className="font-bold text-sm" style={{ color: c[3] }}>STORE</span>
        <div className="hidden sm:flex gap-5" style={{ color: c[4] }}>
          <span>New In</span><span>Men</span><span>Women</span><span>Sale</span>
        </div>
        <div className="flex items-center gap-3" style={{ color: c[4] }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <div className="relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span className="absolute -top-1 -right-1.5 w-3 h-3 rounded-full text-[7px] font-bold flex items-center justify-center" style={{ backgroundColor: c[2], color: shouldUseWhiteText(c[2]) ? "#fff" : "#000" }}>3</span>
          </div>
        </div>
      </div>

      {/* Hero banner */}
      <div className="relative py-10 sm:py-14 px-6 sm:px-10 overflow-hidden" style={{ background: `linear-gradient(135deg, ${c[1]} 0%, ${c[0]} 100%)` }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ backgroundColor: c[2] }} />
        <div className="relative z-10">
          <div className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: c[2] }}>New Collection</div>
          <div className="text-2xl sm:text-3xl font-bold mb-2 leading-tight" style={{ color: c[3] }}>Summer<br />Essentials</div>
          <div className="text-[11px] mb-4 max-w-[200px]" style={{ color: c[4] }}>Curated pieces for the modern minimalist.</div>
          <div className="inline-block px-5 py-2 rounded-lg text-[10px] font-semibold" style={{ backgroundColor: c[2], color: shouldUseWhiteText(c[2]) ? "#fff" : "#000" }}>Shop Now</div>
        </div>
      </div>

      {/* Product grid */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-sm" style={{ color: c[3] }}>Trending</span>
          <span className="text-[10px] font-medium" style={{ color: c[2] }}>View All</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {products.map((p) => (
            <div key={p.name} className="rounded-xl overflow-hidden" style={{ backgroundColor: c[1] }}>
              <div className="h-24 sm:h-32 relative" style={{ backgroundColor: c[4] + "10" }}>
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-semibold" style={{ backgroundColor: c[2] + "15", color: c[2] }}>NEW</div>
                {/* Product placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-xl" style={{ backgroundColor: c[4] + "15" }} />
                </div>
              </div>
              <div className="p-3">
                <div className="font-semibold mb-0.5" style={{ color: c[3] }}>{p.name}</div>
                <div className="flex items-center gap-1 mb-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill={c[2]} stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-[9px]" style={{ color: c[4] }}>{p.rating} ({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: c[3] }}>{p.price}</span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: c[2] + "15" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={c[2]} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Social Media Post Template ──────────────────────────────────────── */
function SocialPostPreview({ c }: { c: string[] }) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[400px]">
        {/* Instagram-style post */}
        <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-xl" style={{ backgroundColor: c[0] }}>
          {/* Post header */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full p-[2px]" style={{ background: `linear-gradient(135deg, ${c[2]}, ${c[3]})` }}>
              <div className="w-full h-full rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: c[0], color: c[2] }}>AB</div>
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold" style={{ color: c[3] }}>acme_brand</div>
              <div className="text-[9px]" style={{ color: c[4] }}>Sponsored</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: c[4] }}><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </div>

          {/* Image area */}
          <div className="aspect-square relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${c[1]} 0%, ${c[0]} 50%, ${c[1]} 100%)` }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-3xl sm:text-4xl font-bold mb-2 leading-tight" style={{ color: c[3] }}>
                  Make It<br /><span style={{ color: c[2] }}>Beautiful</span>
                </div>
                <div className="text-[11px]" style={{ color: c[4] }}>Designed for creators who care about every pixel.</div>
              </div>
            </div>
            <div className="absolute top-6 left-6 w-20 h-20 rounded-full blur-3xl opacity-25" style={{ backgroundColor: c[2] }} />
            <div className="absolute bottom-6 right-6 w-28 h-28 rounded-full blur-3xl opacity-15" style={{ backgroundColor: c[3] }} />
          </div>

          {/* Actions */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c[3]} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c[3]} strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c[3]} strokeWidth="1.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c[3]} strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
            </div>
            <div className="text-[11px] font-semibold mb-1" style={{ color: c[3] }}>12,847 likes</div>
            <div className="text-[11px] leading-relaxed" style={{ color: c[3] }}>
              <span className="font-semibold">acme_brand</span>{" "}
              <span style={{ color: c[4] }}>Your palette says everything about your brand. Make it count. </span>
              <span style={{ color: c[2] }}>#design #colors #brand</span>
            </div>
            <div className="text-[9px] mt-1.5 uppercase tracking-wider" style={{ color: c[4] }}>2 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Blog/Article Template ───────────────────────────────────────────── */
function BlogPreview({ c }: { c: string[] }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-[var(--color-border)] text-xs shadow-xl"
      style={{ backgroundColor: c[0] }}
    >
      {/* Nav */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b" style={{ borderColor: c[1] + "60" }}>
        <span className="font-bold text-base" style={{ color: c[3] }}>The Blog</span>
        <div className="hidden sm:flex gap-5" style={{ color: c[4] }}>
          <span>Latest</span><span>Design</span><span>Dev</span><span>Business</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: c[2], color: shouldUseWhiteText(c[2]) ? "#fff" : "#000" }}>Subscribe</div>
        </div>
      </div>

      {/* Featured article */}
      <div className="p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* Featured image placeholder */}
          <div className="sm:w-1/2 aspect-[16/10] rounded-xl overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${c[2]}30, ${c[1]})` }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl" style={{ backgroundColor: c[2] + "25" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: c[2] + "40" }} />
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-semibold" style={{ backgroundColor: c[2], color: shouldUseWhiteText(c[2]) ? "#fff" : "#000" }}>Featured</div>
          </div>
          {/* Featured text */}
          <div className="sm:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold" style={{ backgroundColor: c[2] + "15", color: c[2] }}>Design</span>
              <span className="text-[9px]" style={{ color: c[4] }}>8 min read</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 leading-tight" style={{ color: c[3] }}>
              The Art of Color: How Palettes Shape User Perception
            </h2>
            <p className="text-[11px] leading-relaxed mb-4" style={{ color: c[4] }}>
              Color is the first thing users notice. Before they read a word, they&apos;ve already formed an opinion based on your palette choices...
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: c[2] + "30" }} />
              <span className="text-[10px] font-medium" style={{ color: c[3] }}>Sarah Mitchell</span>
              <span className="text-[10px]" style={{ color: c[4] }}>· Dec 14, 2025</span>
            </div>
          </div>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Designing for Accessibility: Beyond Contrast Ratios", cat: "A11y", time: "5 min" },
            { title: "Why Your Brand Needs a Design System in 2026", cat: "Brand", time: "7 min" },
            { title: "The Psychology Behind Color Choices in SaaS", cat: "UX", time: "6 min" },
          ].map((article) => (
            <div key={article.title} className="rounded-xl overflow-hidden" style={{ backgroundColor: c[1] }}>
              <div className="h-20 sm:h-28" style={{ background: `linear-gradient(160deg, ${c[2]}15, ${c[1]})` }} />
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-semibold" style={{ backgroundColor: c[2] + "15", color: c[2] }}>{article.cat}</span>
                  <span className="text-[8px]" style={{ color: c[4] }}>{article.time}</span>
                </div>
                <div className="text-[11px] font-semibold leading-snug" style={{ color: c[3] }}>{article.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────────── */
export default function VisualizerPage() {
  const { colors, setColors } = usePaletteStore();
  const [template, setTemplate] =
    useState<(typeof templates)[number]>("Dashboard");

  // Ensure at least 5 colors
  const c = [...colors];
  while (c.length < 5) c.push("#888888");

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="gradient-text">Color Palette</span> Visualizer
          </h1>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-xl leading-relaxed">
            Preview your color palettes on real UI templates — dashboards, landing pages, mobile apps, and e-commerce layouts.{" "}
            <Link
              href="/generate"
              className="text-[var(--color-accent-purple)] hover:underline"
            >
              Generate a palette
            </Link>{" "}
            first, then visualize it here. Free online color visualization tool.
          </p>
        </motion.div>

        {/* Current palette strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-8"
        >
          <p className="text-xs text-[var(--color-text-muted)] mb-2 font-medium uppercase tracking-wider">
            Current Palette
          </p>
          <div className="flex rounded-2xl overflow-hidden h-14 shadow-lg">
            {colors.map((color, i) => (
              <div
                key={i}
                className="flex-1 flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                <span
                  className="font-mono text-[11px] font-semibold"
                  style={{
                    color: shouldUseWhiteText(color)
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(0,0,0,0.6)",
                  }}
                >
                  {color.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Favorites */}
        <div className="mb-8">
          <FavoritesPanel onSelect={(c) => setColors(c)} actionLabel="Preview" />
        </div>

        {/* Template tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {templates.map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                template === t
                  ? "text-white shadow-lg"
                  : "bg-overlay-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-overlay-8"
              }`}
              style={
                template === t
                  ? {
                      background:
                        "linear-gradient(135deg, var(--color-accent-purple), var(--color-accent-pink))",
                      boxShadow: "0 4px 14px rgba(139, 92, 246, 0.3)",
                    }
                  : undefined
              }
            >
              {t}
            </button>
          ))}
        </motion.div>

        {/* Template preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={template}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {template === "Dashboard" && <DashboardPreview c={c} />}
            {template === "Landing Page" && <LandingPreview c={c} />}
            {template === "Mobile App" && <MobilePreview c={c} />}
            {template === "E-commerce" && <EcommercePreview c={c} />}
            {template === "Social Post" && <SocialPostPreview c={c} />}
            {template === "Blog" && <BlogPreview c={c} />}
          </motion.div>
        </AnimatePresence>

        {/* Color role legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 surface rounded-2xl p-5"
        >
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
            Color Roles
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Background", index: 0 },
              { label: "Surface", index: 1 },
              { label: "Accent", index: 2 },
              { label: "Heading", index: 3 },
              { label: "Muted", index: 4 },
            ].map(({ label, index }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-md border border-[var(--color-border-strong)]"
                  style={{ backgroundColor: c[index] }}
                />
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {label}
                </span>
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  {c[index]?.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Tools */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Related Tools</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/generate", label: "Generate palettes" },
              { href: "/contrast", label: "Check contrast" },
              { href: "/gradient", label: "Build gradients" },
              { href: "/extract", label: "Extract from image" },
              { href: "/explore", label: "Browse palettes" },
              { href: "/picker", label: "Color picker" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-[var(--color-accent-purple)] hover:underline">
                {link.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
