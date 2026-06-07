import type { Metadata } from "next";

import { siteConfig } from "./site-config";

/**
 * Centralized metadata builders so every page produces consistent,
 * SEO-complete output (canonical URL, Open Graph, Twitter cards).
 *
 * When `image` is omitted, the Open Graph image is left to Next.js'
 * file-based convention (`opengraph-image.tsx`), which injects the correct
 * (hashed, absolute) URL — including for static export.
 */

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  /** Path relative to the site root, e.g. "/projects/foo". */
  path?: string;
  /** Explicit OG/Twitter image; omit to use the file-based opengraph-image. */
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description = siteConfig.tagline,
  path = "/",
  image,
  type = "website",
}: BuildMetadataArgs = {}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const resolvedTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.role}`;
  const images = image ? [{ url: image }] : undefined;

  return {
    title: resolvedTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      ...(images ? { images } : {}),
    },
  };
}
