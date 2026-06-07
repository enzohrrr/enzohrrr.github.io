import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { slugify } from "@/lib/utils";

import { CATEGORIES, projectFrontmatterSchema, type Category } from "./schema";
import type { Project, ProjectMeta } from "./types";

export type Heading = { id: string; text: string };

/** Extract `##` (h2) headings from an MDX body for a table of contents. */
export function extractHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match) {
      const text = match[1].replace(/\*\*/g, "").replace(/`/g, "").trim();
      headings.push({ id: slugify(text), text });
    }
  }
  return headings;
}

/**
 * Content repository for projects.
 *
 * The ONLY module that touches the filesystem for project content. Everything
 * else (pages, components, sitemap, metadata) consumes the typed functions
 * exported here. Swapping MDX files for a headless CMS later means rewriting
 * just this file.
 */

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const MDX_EXTENSION = ".mdx";

function isContentFile(fileName: string): boolean {
  // Skip the documented template and any partials (leading underscore/dot).
  return (
    fileName.endsWith(MDX_EXTENSION) &&
    !fileName.startsWith("_") &&
    !fileName.startsWith(".")
  );
}

function slugFromFileName(fileName: string): string {
  return fileName.slice(0, -MDX_EXTENSION.length);
}

function readProjectFile(fileName: string): Project {
  const slug = slugFromFileName(fileName);
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid project frontmatter in "content/projects/${fileName}":\n${issues}`
    );
  }

  const fm = parsed.data;
  return {
    ...fm,
    slug,
    body: content,
    cover: fm.thumbnail ?? fm.banner,
    year: fm.date.getFullYear(),
  };
}

/**
 * Read + validate every project once. Cached at module scope so a single
 * build/render doesn't re-read the filesystem for each consumer.
 */
let cachedProjects: Project[] | null = null;

function loadAllProjects(): Project[] {
  if (cachedProjects) return cachedProjects;

  if (!fs.existsSync(PROJECTS_DIR)) {
    cachedProjects = [];
    return cachedProjects;
  }

  const projects = fs
    .readdirSync(PROJECTS_DIR)
    .filter(isContentFile)
    .map(readProjectFile)
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  cachedProjects = projects;
  return projects;
}

const toMeta = (project: Project): ProjectMeta => {
  // Drop the heavy MDX body from list/meta payloads.
  const { body, ...meta } = project;
  void body;
  return meta;
};

/** All published projects, newest first (metadata only). */
export function getAllProjects(): ProjectMeta[] {
  return loadAllProjects().map(toMeta);
}

/** Slugs for `generateStaticParams`. */
export function getProjectSlugs(): string[] {
  return loadAllProjects().map((p) => p.slug);
}

/** Full project (incl. MDX body) for the detail page, or null if missing. */
export function getProjectBySlug(slug: string): Project | null {
  return loadAllProjects().find((p) => p.slug === slug) ?? null;
}

/**
 * Neighbours of a project in the (newest-first) list. `prev` is the newer
 * project, `next` is the older one. Either can be null at the ends.
 */
export function getAdjacentProjects(slug: string): {
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
} {
  const all = getAllProjects();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

/** Featured projects for the home page. */
export function getFeaturedProjects(limit = 3): ProjectMeta[] {
  const featured = getAllProjects().filter((p) => p.featured);
  return (featured.length > 0 ? featured : getAllProjects()).slice(0, limit);
}

/**
 * Categories that actually appear in content, with project counts — drives
 * the filter UI. Preserves the canonical order from `CATEGORIES`.
 */
export function getCategoryFacets(): { category: Category; count: number }[] {
  const projects = getAllProjects();
  return CATEGORIES.map((category) => ({
    category,
    count: projects.filter((p) => p.categories.includes(category)).length,
  })).filter((facet) => facet.count > 0);
}
