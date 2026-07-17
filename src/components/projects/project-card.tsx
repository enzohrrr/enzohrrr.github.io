import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { ProjectMeta } from "@/content-layer/types";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="px-6 text-center font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground/70">
              {project.title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="font-normal">
              {category}
            </Badge>
          ))}
        </div>

        <h3 className="flex items-start justify-between gap-2 text-lg font-semibold tracking-tight">
          <span>{project.title}</span>
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-4 flex items-center gap-3 border-t pt-4 text-xs text-muted-foreground">
          <span className="font-mono">{project.year}</span>
          <span aria-hidden>·</span>
          <span className="truncate">{project.role}</span>
        </div>
      </div>
    </Link>
  );
}
