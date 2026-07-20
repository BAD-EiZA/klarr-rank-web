import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Klarr Rank — Audit SEO teknis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070B12",
          padding: 64,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#0F4C75",
              color: "#BBE1FA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 28, fontWeight: 600 }}>
            Klarr Rank
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "#38BDF8",
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            SEO checker · Indonesia
          </div>
          <div
            style={{
              color: "#F8FAFC",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            Temukan masalah SEO teknis sebelum ranking tertahan
          </div>
          <div style={{ color: "#A8B3C7", fontSize: 24, maxWidth: 820 }}>
            Skor · prioritas isu · rekomendasi berbahasa Indonesia
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
