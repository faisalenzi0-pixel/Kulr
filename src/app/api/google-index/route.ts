import { NextResponse } from "next/server";
import { createSign } from "crypto";

// Google Indexing API — credentials stored as base64 JSON in GOOGLE_SERVICE_ACCOUNT_JSON

const SCOPES = ["https://www.googleapis.com/auth/indexing"];

function base64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64url");
}

function getCredentials(): { email: string; privateKey: string } {
  const jsonB64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (jsonB64) {
    const json = JSON.parse(Buffer.from(jsonB64, "base64").toString("utf-8"));
    return { email: json.client_email, privateKey: json.private_key };
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) {
    throw new Error("Missing Google service account credentials");
  }
  return { email, privateKey };
}

async function getAccessToken(): Promise<string> {
  const { email, privateKey } = getCredentials();

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      iss: email,
      scope: SCOPES.join(" "),
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );

  const signingInput = `${header}.${payload}`;

  // Use Node.js crypto (reliable on Vercel serverless)
  const signer = createSign("RSA-SHA256");
  signer.update(signingInput);
  const signature = signer.sign(privateKey, "base64url");

  const jwt = `${signingInput}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const data = await res.json();
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function submitUrl(
  token: string,
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
) {
  const res = await fetch(
    "https://indexing.googleapis.com/v3/urlNotifications:publish",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, type }),
    }
  );
  return { url, status: res.status, ok: res.ok, data: await res.json() };
}

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.INDEXING_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const urls: string[] = body.urls || ["https://kulr.app"];
    const type = body.type || "URL_UPDATED";

    const token = await getAccessToken();

    const results = [];
    for (const url of urls.slice(0, 200)) {
      const result = await submitUrl(token, url, type);
      results.push(result);
    }

    return NextResponse.json({
      submitted: results.length,
      results,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  let configured = false;
  try {
    getCredentials();
    configured = true;
  } catch { /* not configured */ }

  return NextResponse.json({
    configured,
    info: configured
      ? "Google Indexing API is configured. POST URLs to submit."
      : "Missing Google service account credentials.",
  });
}
