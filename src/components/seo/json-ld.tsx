import type { ProjectMeta } from "@/content-layer/types";
import { siteConfig } from "@/lib/site-config";

/** Renders a JSON-LD script tag. Safe: data is our own, not user input. */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Person schema for the home/about pages. */
export function PersonJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: siteConfig.role,
        description: siteConfig.tagline,
        url: siteConfig.url,
        email: `mailto:${siteConfig.email}`,
        sameAs: siteConfig.social
          .filter((s) => s.icon !== "mail")
          .map((s) => s.href),
      }}
    />
  );
}

/** CreativeWork schema for a project detail page. */
export function ProjectJsonLd({ project }: { project: ProjectMeta }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        abstract: project.summary,
        url: `${siteConfig.url}/projects/${project.slug}`,
        ...(project.banner && {
          image: `${siteConfig.url}${project.banner}`,
        }),
        dateCreated: project.date.toISOString(),
        keywords: [...project.categories, ...project.technologies].join(", "),
        creator: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      }}
    />
  );
}
