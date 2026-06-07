import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/layout/social-links";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-24 border-t">
      <Container className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm font-semibold">
            {siteConfig.name}
            <span className="text-brand">.</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {siteConfig.role} · {siteConfig.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks />
      </Container>
      <Container className="pb-8">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &
          Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
