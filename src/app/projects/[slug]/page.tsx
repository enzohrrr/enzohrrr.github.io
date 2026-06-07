import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { ObjectivesList, ResultsList } from "@/components/projects/detail-lists";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectNav } from "@/components/projects/project-nav";
import { ProjectVideos } from "@/components/projects/project-videos";
import { TechStack } from "@/components/projects/tech-stack";
import { Toc } from "@/components/projects/toc";
import { ProjectJsonLd } from "@/components/seo/json-ld";
import { MdxContent } from "@/content-layer/mdx";
import {
  extractHeadings,
  getAdjacentProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/content-layer/projects";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return buildMetadata({ title: "Project not found" });

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const headings = extractHeadings(project.body);
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <article className="pb-12">
      <ProjectJsonLd project={project} />
      <ProjectHero project={project} />

      <Container className="mt-12 md:mt-16">
        {project.gallery.length > 0 && (
          <div className="mb-16">
            <ProjectGallery images={project.gallery} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-14 lg:col-span-2">
            <ObjectivesList objectives={project.objectives} />

            <div className="max-w-none">
              <MdxContent source={project.body} />
            </div>

            <ProjectVideos videos={project.videos} />
            <ResultsList results={project.results} />
          </div>

          <aside className="lg:col-span-1">
            <div className="space-y-10 lg:sticky lg:top-24">
              <Toc headings={headings} />
              <TechStack
                technologies={project.technologies}
                tags={project.tags}
              />
            </div>
          </aside>
        </div>

        <ProjectNav prev={prev} next={next} />
      </Container>
    </article>
  );
}
