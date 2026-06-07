import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CountUp } from "@/components/home/count-up";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import type { ProjectMeta } from "@/content-layer/types";
import { siteConfig } from "@/lib/site-config";

export function CurrentlyBuilding({ project }: { project: ProjectMeta }) {
  return (
    <section className="border-y bg-card/40">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Currently building
            </p>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {project.title}
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {project.summary}
            </p>
            <Link
              href={`/projects/${project.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-foreground"
            >
              View the framework
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border">
              {siteConfig.stats.map((stat) => (
                <div key={stat.label} className="bg-card p-6">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-4xl font-semibold tracking-tight tabular-nums">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
