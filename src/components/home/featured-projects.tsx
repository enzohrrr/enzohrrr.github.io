import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import type { ProjectMeta } from "@/content-layer/types";

export function FeaturedProjects({ projects }: { projects: ProjectMeta[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="border-t py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading eyebrow="Selected work" title="Featured projects" />
          </Reveal>
          <Reveal delay={0.1}>
            <Button asChild variant="ghost">
              <Link href="/projects">
                All projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
