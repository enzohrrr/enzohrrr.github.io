import { siteConfig } from "@/lib/site-config";

/**
 * Edge-faded, infinitely-looping marquee of tech keywords.
 *
 * The track holds two identical halves and translates by exactly -50%
 * (see `.marquee-track` in globals.css), so it loops with no seam. Each half
 * repeats the keyword list enough times to stay wider than any viewport —
 * otherwise a gap would appear on ultra-wide screens at the loop point.
 */
const COPIES_PER_HALF = 4;

function TechHalf({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-3 pr-3"
      aria-hidden={ariaHidden}
    >
      {Array.from({ length: COPIES_PER_HALF }).flatMap((_, copy) =>
        siteConfig.techStrip.map((tech, i) => (
          <li key={`${copy}-${tech}-${i}`} className="flex items-center gap-3">
            <span className="whitespace-nowrap font-mono text-sm text-muted-foreground">
              {tech}
            </span>
            <span className="text-brand/50">/</span>
          </li>
        ))
      )}
    </ul>
  );
}

export function TechStrip() {
  return (
    <section className="border-y py-5" aria-label="Technologies">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max">
          <TechHalf />
          <TechHalf ariaHidden />
        </div>
      </div>
    </section>
  );
}
