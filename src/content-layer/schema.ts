import { z } from "zod";

/**
 * Project categories — the canonical taxonomy used for filtering on the
 * projects page. Add a value here and it automatically becomes an available
 * filter (the UI derives filters from data, never a hardcoded list).
 */
export const CATEGORIES = [
  "Unreal Engine",
  "C++",
  "Multiplayer",
  "Networking",
  "Gameplay",
  "Tools",
  "Frameworks",
] as const;

export const categoryEnum = z.enum(CATEGORIES);
export type Category = (typeof CATEGORIES)[number];

const galleryItemSchema = z.object({
  src: z.string().min(1, "gallery image needs a src"),
  alt: z.string().min(1, "gallery image needs alt text (accessibility)"),
  caption: z.string().optional(),
});

const videoItemSchema = z.object({
  src: z.string().min(1, "video needs a src"),
  /** Heading shown above the clip, e.g. "Combat System". */
  title: z.string().optional(),
  caption: z.string().optional(),
  /** Image shown before the video loads (recommended). */
  poster: z.string().optional(),
});

/**
 * Frontmatter schema for a single project (`content/projects/<slug>.mdx`).
 *
 * Structured metadata lives here; long-form narrative (presentation,
 * challenges, technical solutions) lives in the MDX body below the frontmatter.
 * Validation runs at build time — a malformed file fails the build loudly
 * with a precise message rather than silently rendering wrong.
 */
export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  /** Short description: used on cards and as the meta description. */
  summary: z.string().min(1),
  /** Used for ordering and display. Accepts YYYY-MM-DD or full ISO. */
  date: z.coerce.date(),
  /** Role you held on the project, e.g. "Gameplay Programmer". */
  role: z.string().min(1),
  technologies: z.array(z.string().min(1)).min(1),
  categories: z.array(categoryEnum).min(1),
  tags: z.array(z.string().min(1)).default([]),

  /** Wide hero / Open Graph image (path under /public). Optional: without it
   * the detail page renders a text-only hero and cards show a placeholder. */
  banner: z.string().min(1).optional(),
  /** Card image; falls back to `banner` when omitted. */
  thumbnail: z.string().optional(),
  /** Optional project logo/mark. */
  logo: z.string().optional(),
  gallery: z.array(galleryItemSchema).default([]),
  /** Gameplay/demo clips rendered in their own section. */
  videos: z.array(videoItemSchema).default([]),

  /** Structured bullet block rendered on the detail page. */
  objectives: z.array(z.string().min(1)).default([]),
  /** Accomplishments / features / performance wins. */
  results: z.array(z.string().min(1)).default([]),

  links: z
    .object({
      github: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .default({}),

  /** Promote to the home page "Featured" section. */
  featured: z.boolean().default(false),
  /** Hidden from listings + sitemap while true. */
  draft: z.boolean().default(false),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
