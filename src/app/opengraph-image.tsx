import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141417",
          padding: "80px",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a78bfa" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.03em" }}>
            {siteConfig.name}
          </div>
          <div style={{ marginTop: 12, fontSize: 40, color: "#a78bfa" }}>
            {siteConfig.role}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#a1a1aa",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    ),
    size
  );
}
