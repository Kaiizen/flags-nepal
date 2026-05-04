import { ne } from "@/lib/nepali-labels";
import { ImageResponse } from "next/og";

/** Node runtime so `next start` / standalone on cPanel and self‑hosted Node behave like Vercel Edge. */
export const runtime = "nodejs";

export const alt = "Flags Nepal — Crafted with Pride";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/** Google Fonts CSS v2 — Noto Sans Devanagari 500 (TTF, reliable for @vercel/og). */
const notoDevanagariTtf =
  "https://fonts.gstatic.com/s/notosansdevanagari/v30/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlUYly-A.ttf";

export default async function OpenGraphImage() {
  let fontData: ArrayBuffer | undefined;
  try {
    const res = await fetch(notoDevanagariTtf);
    if (res.ok) fontData = await res.arrayBuffer();
  } catch {
    fontData = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0F0F0F",
          color: "#FAF7F2",
          fontFamily: fontData ? "Noto Sans Devanagari" : "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.02em",
            color: "#9CA3AF",
            fontFamily: fontData ? "Noto Sans Devanagari" : "system-ui, sans-serif",
          }}
        >
          {ne.craftedWithPride}
        </div>
        <div style={{ marginTop: 24, fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          FLAGS NEPAL
        </div>
        <div style={{ marginTop: 24, fontSize: 26, maxWidth: 720, color: "#D1D5DB", lineHeight: 1.4 }}>
          Premium flags, banners, and printed identity — forged in Kathmandu, flown worldwide.
        </div>
        <div
          style={{
            marginTop: 48,
            width: 160,
            height: 10,
            background: "#B91C1C",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Noto Sans Devanagari",
              data: fontData,
              style: "normal",
              weight: 500,
            },
          ]
        : [],
    },
  );
}
