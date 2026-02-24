#!/usr/bin/env node
// Ping all major search engines with sitemap URL
// Google deprecated their ping endpoint, but Bing and others still support it
// Usage: node scripts/ping-search-engines.js

const SITEMAP_URL = "https://kulr.app/sitemap.xml";

const endpoints = [
  {
    name: "Bing",
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
  {
    name: "Yandex",
    url: `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
  {
    name: "IndexNow (Bing)",
    url: `https://www.bing.com/indexnow?url=${encodeURIComponent("https://kulr.app")}&key=43ea557e0e284e3593583a13e51da4d6`,
  },
  {
    name: "IndexNow (Yandex)",
    url: `https://yandex.com/indexnow?url=${encodeURIComponent("https://kulr.app")}&key=43ea557e0e284e3593583a13e51da4d6`,
  },
];

async function ping() {
  console.log("Pinging search engines with sitemap...\n");

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url);
      console.log(`  ${ep.name}: ${res.status} ${res.ok ? "OK" : res.statusText}`);
    } catch (err) {
      console.log(`  ${ep.name}: ERROR - ${err.message}`);
    }
  }

  console.log("\nDone! Sitemap submitted to all engines.");
  console.log("\nNext steps:");
  console.log("  - Google: Already verified via Search Console (auto-discovers sitemap)");
  console.log("  - Bing: Sign up at https://www.bing.com/webmasters and add kulr.app");
  console.log("  - Yandex: Sign up at https://webmaster.yandex.com and add kulr.app");
}

ping();
