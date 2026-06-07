import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export for GitHub Pages (no Node server at runtime).
  output: "export",
  // Emit `route/index.html` so URLs resolve cleanly on static hosting.
  trailingSlash: true,
  images: {
    // No image optimization server on static hosting.
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
