#!/usr/bin/env node
// Submit all Kulr URLs to search engines via IndexNow protocol
// Supports: Bing, Yandex, Seznam, Naver
// Usage: node scripts/submit-indexnow.js

const INDEXNOW_KEY = "43ea557e0e284e3593583a13e51da4d6";
const SITE_URL = "https://kulr.app";

const staticRoutes = [
  "", "/generate", "/explore", "/extract", "/contrast",
  "/gradient", "/visualizer", "/picker", "/colors",
  "/convert", "/tailwind", "/psychology", "/brands",
];

// Brand slugs - keeping in sync with the app
// To get dynamic list, run: curl -s https://kulr.app/sitemap.xml | grep loc
const urls = staticRoutes.map(r => `${SITE_URL}${r}`);

const payload = {
  host: "kulr.app",
  key: INDEXNOW_KEY,
  keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: urls,
};

const engines = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

async function submit() {
  console.log(`Submitting ${urls.length} URLs to ${engines.length} search engines...\n`);

  for (const engine of engines) {
    try {
      const res = await fetch(engine, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      console.log(`  ${engine}: ${res.status} ${res.ok ? "OK" : "FAILED"}`);
    } catch (err) {
      console.log(`  ${engine}: ERROR - ${err.message}`);
    }
  }

  console.log("\nDone! URLs submitted to Bing, Yandex, Seznam, and Naver.");
}

submit();
