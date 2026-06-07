"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import type { Category } from "@/content-layer/schema";
import type { ProjectMeta } from "@/content-layer/types";
import { cn } from "@/lib/utils";

type Facet = { category: Category; count: number };

export function ProjectsExplorer({
  projects,
  facets,
}: {
  projects: ProjectMeta[];
  facets: Facet[];
}) {
  const [selected, setSelected] = useState<Set<Category>>(new Set());

  const toggle = (category: Category) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (selected.size === 0) return projects;
    return projects.filter((p) =>
      p.categories.some((c) => selected.has(c))
    );
  }, [projects, selected]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
        <FilterChip
          active={selected.size === 0}
          onClick={() => setSelected(new Set())}
        >
          All
          <span className="ml-1.5 text-xs opacity-60">{projects.length}</span>
        </FilterChip>
        {facets.map(({ category, count }) => (
          <FilterChip
            key={category}
            active={selected.has(category)}
            onClick={() => toggle(category)}
          >
            {category}
            <span className="ml-1.5 text-xs opacity-60">{count}</span>
          </FilterChip>
        ))}
      </div>

      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No projects match the selected filters.
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
