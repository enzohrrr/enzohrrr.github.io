import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

import { GithubIcon } from "@/components/brand-icons";
import { Container } from "@/components/layout/container";
import { ParallaxBanner } from "@/components/projects/parallax-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/content-layer/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
});

/** Immersive hero for a project detail page. */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative">
      <ParallaxBanner src={project.banner} alt={`${project.title} banner`} />

      <Container className="relative -mt-28 pb-4 md:-mt-36">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-6 text-muted-foreground"
        >
          <Link href="/projects">
            <ArrowLeft className="size-4" />
            All projects
          </Link>
        </Button>

        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((category) => (
            <Badge key={category} variant="secondary" className="font-normal">
              {category}
            </Badge>
          ))}
        </div>

        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          {project.title}
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span>
            <span className="text-foreground">{project.role}</span>
          </span>
          <span aria-hidden>·</span>
          <span className="font-mono">{dateFormatter.format(project.date)}</span>
        </div>

        {(project.links.github || project.links.website) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.website && (
              <Button asChild size="lg">
                <a
                  href={project.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4" />
                  Visit project
                </a>
              </Button>
            )}
            {project.links.github && (
              <Button asChild size="lg" variant="outline">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="size-4" />
                  Source
                </a>
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
