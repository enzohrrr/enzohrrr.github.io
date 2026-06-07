import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { HeroGrid } from "@/components/home/hero-grid";
import { SocialLinks } from "@/components/layout/social-links";
import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Futuristic blueprint grid (dashes, crosses, dots). */}
      <HeroGrid />

      {/* Subtle radial brand glow behind the hero, slowly breathing. */}
      <div
        aria-hidden
        className="aurora pointer-events-none absolute -top-40 left-1/2 -z-10 h-[480px] w-[820px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand), transparent)",
        }}
      />

      <Container className="flex flex-col items-start py-24 md:py-36">
        <FadeIn>
          <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            Available for new opportunities
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-7xl">
            {siteConfig.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-4 font-mono text-base text-brand md:text-lg">
            {siteConfig.role}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {siteConfig.intro}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/projects">
                View projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <SocialLinks className="ml-1" />
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {siteConfig.location}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
