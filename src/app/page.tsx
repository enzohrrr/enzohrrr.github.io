import { Cta } from "@/components/home/cta";
import { CurrentlyBuilding } from "@/components/home/currently-building";
import { Expertise } from "@/components/home/expertise";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { TechStrip } from "@/components/home/tech-strip";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { getFeaturedProjects } from "@/content-layer/projects";

export default function HomePage() {
  const featured = getFeaturedProjects(3);

  return (
    <>
      <PersonJsonLd />
      <Hero />
      <TechStrip />
      {featured[0] && <CurrentlyBuilding project={featured[0]} />}
      <Expertise />
      <FeaturedProjects projects={featured} />
      <Cta />
    </>
  );
}
