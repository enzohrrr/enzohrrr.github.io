import { Container } from "@/components/layout/container";
import { Icon } from "@/components/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";

export function Expertise() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="What I do" title="Focus areas" />
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.expertise.map((area) => (
            <StaggerItem
              key={area.title}
              className="group rounded-2xl border bg-card p-6 transition-colors hover:border-foreground/20"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border bg-background text-brand transition-colors group-hover:border-brand/40">
                <Icon name={area.icon} className="size-5" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {area.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
