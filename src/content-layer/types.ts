import type { ProjectFrontmatter } from "./schema";

/**
 * Domain model exposed to the rest of the app.
 *
 * Pages and components depend on these types — never on file paths or raw
 * frontmatter. This keeps the content source (MDX today, a CMS tomorrow)
 * swappable behind the content-layer repository.
 */

/** Lightweight project shape used for lists, cards, sitemap, metadata. */
export interface ProjectMeta extends ProjectFrontmatter {
  /** Derived from the filename (`<slug>.mdx`). */
  slug: string;
  /** Canonical card image (thumbnail ?? banner). */
  cover: string;
  /** Pre-formatted year for compact display. */
  year: number;
}

/** Full project including raw MDX body (used on the detail page only). */
export interface Project extends ProjectMeta {
  /** Raw MDX source of the long-form body (below frontmatter). */
  body: string;
}
