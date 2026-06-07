import { ImageResponse } from "next/og";

import { getProjectBySlug, getProjectSlugs } from "@/content-layer/projects";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "Project";
  const categories = project?.categories.join("  ·  ") ?? "";

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
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {categories && (
            <div style={{ marginTop: 28, fontSize: 30, color: "#a1a1aa" }}>
              {categories}
            </div>
          )}
        </div>
      </div>
    ),
    size
  );
}
