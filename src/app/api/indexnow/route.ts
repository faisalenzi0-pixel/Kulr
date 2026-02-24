import { NextResponse } from "next/server";
import { BRANDS } from "@/lib/brand-colors";

const INDEXNOW_KEY = "43ea557e0e284e3593583a13e51da4d6";
const SITE_URL = "https://kulr.app";

function getAllUrls(): string[] {
  const staticRoutes = [
    "",
    "/generate",
    "/explore",
    "/extract",
    "/contrast",
    "/gradient",
    "/visualizer",
    "/picker",
    "/colors",
    "/convert",
    "/tailwind",
    "/psychology",
    "/brands",
  ];

  const brandRoutes = BRANDS.map((b) => `/brands/${b.slug}`);

  return [...staticRoutes, ...brandRoutes].map((r) => `${SITE_URL}${r}`);
}

export async function POST(request: Request) {
  const authKey = request.headers.get("x-api-key");
  if (authKey !== INDEXNOW_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const urls = body?.urls || getAllUrls();

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

  const results = await Promise.allSettled(
    engines.map(async (engine) => {
      const res = await fetch(engine, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      return { engine, status: res.status, ok: res.ok };
    })
  );

  return NextResponse.json({
    submitted: urls.length,
    results: results.map((r) =>
      r.status === "fulfilled" ? r.value : { error: String(r.reason) }
    ),
  });
}

export async function GET() {
  return NextResponse.json({
    key: INDEXNOW_KEY,
    totalUrls: getAllUrls().length,
    urls: getAllUrls(),
  });
}
