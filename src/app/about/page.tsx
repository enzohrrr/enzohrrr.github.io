import fs from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import Image from "next/image";
import matter from "gray-matter";

import { FavoriteGames } from "@/components/about/favorite-games";
import { Timeline } from "@/components/about/timeline";
import { Container } from "@/components/layout/container";
import { FadeIn, Reveal } from "@/components/motion";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { MdxContent } from "@/content-layer/mdx";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `About ${siteConfig.name} — ${siteConfig.role}. Background, skills, and how I approach building games and engines.`,
  path: "/about",
});

function getAboutBody(): string {
  const file = path.join(process.cwd(), "content", "about.mdx");
  if (!fs.existsSync(file)) return "";
  return matter(fs.readFileSync(file, "utf8")).content;
}

export default function AboutPage() {
  const body = getAboutBody();

  return (
    <Container className="py-16 md:py-24">
      <PersonJsonLd />

      <FadeIn>
        <header className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl border md:size-32">
            <Image
              src={siteConfig.photo}
              alt={`Portrait of ${siteConfig.name}`}
              fill
              sizes="128px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">
              About
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {siteConfig.role}
            </p>
          </div>
        </header>
      </FadeIn>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="space-y-14 lg:col-span-2">
          <FadeIn delay={0.1}>
            <div className="max-w-none">
              <MdxContent source={body} />
            </div>
          </FadeIn>

          <Reveal>
            <Timeline title="Experience" entries={siteConfig.experience} />
          </Reveal>

          <Reveal>
            <Timeline title="Education" entries={siteConfig.education} />
          </Reveal>
        </div>

        <aside className="lg:col-span-1">
          <Reveal className="lg:sticky lg:top-24">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Skills
            </h2>
            <div className="mt-5 space-y-6">
              {siteConfig.skills.map((group) => (
                <div key={group.group}>
                  <h3 className="text-sm font-semibold">{group.group}</h3>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="font-normal"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </aside>
      </div>

      <div className="mt-16 border-t pt-16">
        <FavoriteGames />
      </div>
    </Container>
  );
}
