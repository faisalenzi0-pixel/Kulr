import { NextResponse } from "next/server";
import { BRANDS } from "@/lib/brand-colors";

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
  if (authKey !== process.env.INDEXING_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bingApiKey = process.env.BING_API_KEY;
  if (!bingApiKey) {
    return NextResponse.json(
      { error: "BING_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json().catch(() => null);
    const urls = body?.urls || getAllUrls();

    // Bing URL Submission API — batch of up to 500 URLs/day for verified sites
    // 10 URLs per request
    const results = [];
    for (let i = 0; i < urls.length; i += 10) {
      const batch = urls.slice(i, i + 10);
      const res = await fetch(
        `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${bingApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            siteUrl: SITE_URL,
            urlList: batch,
          }),
        }
      );
      const data = await res.json().catch(() => ({}));
      results.push({
        batch: i / 10 + 1,
        urls: batch.length,
        status: res.status,
        ok: res.ok,
        data,
      });
    }

    return NextResponse.json({
      submitted: urls.length,
      batches: results.length,
      results,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const hasBingKey = !!process.env.BING_API_KEY;
  return NextResponse.json({
    configured: hasBingKey,
    totalUrls: getAllUrls().length,
    quota: "500 URLs/day (10 per batch)",
  });
}
