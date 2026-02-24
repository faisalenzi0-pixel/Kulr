import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const colorsParam = searchParams.get("colors") || "";
  const title = searchParams.get("title") || "";

  const colors = colorsParam
    .split("-")
    .map((c) => c.replace(/[^0-9a-fA-F]/g, ""))
    .filter((c) => c.length === 6)
    .map((c) => "#" + c)
    .slice(0, 10);

  if (colors.length === 0) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#09090B",
            color: "#fff",
            fontSize: 48,
            fontFamily: "sans-serif",
            fontWeight: 700,
          }}
        >
          Kulr — Color Palette Generator
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }

  const bandWidth = Math.floor(1200 / colors.length);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#09090B",
          fontFamily: "sans-serif",
        }}
      >
        {/* Color bands */}
        <div style={{ display: "flex", flex: 1 }}>
          {colors.map((c, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingBottom: 24,
                background: c,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: isLight(c) ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.85)",
                  letterSpacing: "0.05em",
                }}
              >
                {c.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
        {/* Footer bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 32px",
            background: "#09090B",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
              }}
            />
            <span style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>
              {title || "kulr.app"}
            </span>
          </div>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>
            {colors.length} color{colors.length !== 1 ? "s" : ""} · Free palette generator
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

function isLight(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}
