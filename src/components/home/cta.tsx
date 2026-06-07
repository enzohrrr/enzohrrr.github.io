import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="border-t py-20 md:py-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border bg-card px-8 py-14 text-center md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, var(--brand), transparent)",
            }}
          />
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Open to new projects
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Available for roles, contract work, and collaborations in gameplay,
            multiplayer, and tools.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
