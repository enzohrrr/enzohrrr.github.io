import Image from "next/image";

import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";

export function FavoriteGames() {
  return (
    <section>
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight">Favorite games</h2>
        <p className="mt-2 text-muted-foreground">
          The games that shaped what I want to build, and the direction I&apos;m
          headed.
        </p>
      </Reveal>

      <Stagger className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {siteConfig.favoriteGames.map((game) => (
          <StaggerItem key={game.title}>
            <figure className="group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg">
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={game.image}
                  alt={`${game.title} key visual`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
              <figcaption className="px-3 py-2.5 text-center text-sm font-medium">
                {game.title}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
