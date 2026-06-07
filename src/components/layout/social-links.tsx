import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { siteConfig, type SocialLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialLink["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {siteConfig.social.map((link) => {
        const Icon = ICONS[link.icon];
        const isMail = link.icon === "mail";
        return (
          <li key={link.label}>
            <Button
              asChild
              variant="ghost"
              size="icon"
              aria-label={link.label}
            >
              <a
                href={link.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
              >
                <Icon className="size-[1.1rem]" />
              </a>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
