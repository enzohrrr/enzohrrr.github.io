import {
  Boxes,
  Cpu,
  Gamepad2,
  Network,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/**
 * Curated icon registry — maps the string names used in data (site-config)
 * to lucide components. Keeping it explicit avoids bundling all of lucide and
 * keeps data files free of imports.
 */
const REGISTRY: Record<string, LucideIcon> = {
  Cpu,
  Gamepad2,
  Network,
  Boxes,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = REGISTRY[name] ?? Boxes;
  return <Component {...props} />;
}
