import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { getAllProjects, getCategoryFacets } from "@/content-layer/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "A selection of my game development work, from gameplay systems and multiplayer to frameworks and tooling in Unreal Engine and C++.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();
  const facets = getCategoryFacets();

  return (
    <Container className="py-16 md:py-24">
      <FadeIn>
        <header className="max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Work
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Projects
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Gameplay systems, multiplayer, and tools I&apos;ve built.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12">
        <ProjectsExplorer projects={projects} facets={facets} />
      </FadeIn>
    </Container>
  );
}
