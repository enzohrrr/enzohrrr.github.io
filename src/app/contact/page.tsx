import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/layout/social-links";
import { FadeIn } from "@/components/motion";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} about gameplay, engine, and multiplayer development.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
        <FadeIn className="lg:col-span-2">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Contact
          </p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Let&apos;s talk
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A role, project, or collaboration in mind? Send a message.
          </p>

          <dl className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <dt className="flex size-10 items-center justify-center rounded-xl border text-brand">
                <Mail className="size-5" />
                <span className="sr-only">Email</span>
              </dt>
              <dd>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm transition-colors hover:text-brand"
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="flex size-10 items-center justify-center rounded-xl border text-brand">
                <MapPin className="size-5" />
                <span className="sr-only">Location</span>
              </dt>
              <dd className="text-sm text-muted-foreground">
                {siteConfig.location}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <p className="mb-2 text-sm text-muted-foreground">Find me online</p>
            <SocialLinks className="-ml-2" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-3">
          <div className="rounded-2xl border bg-card p-6 md:p-8">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </Container>
  );
}
