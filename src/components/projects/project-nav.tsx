import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { ProjectMeta } from "@/content-layer/types";

/** Previous / next project links shown at the foot of a detail page. */
export function ProjectNav({
  prev,
  next,
}: {
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="More projects"
      className="mt-16 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/projects/${prev.slug}`}
          className="group rounded-xl border p-5 transition-colors hover:border-foreground/20 hover:bg-card"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <p className="mt-1.5 font-semibold tracking-tight">{prev.title}</p>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className="group rounded-xl border p-5 text-right transition-colors hover:border-foreground/20 hover:bg-card sm:col-start-2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            Next
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <p className="mt-1.5 font-semibold tracking-tight">{next.title}</p>
        </Link>
      )}
    </nav>
  );
}
