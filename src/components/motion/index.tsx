"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Reusable, restrained animation primitives.
 *
 * Centralizing motion keeps the whole site consistent and discreet, and lets
 * us honor `prefers-reduced-motion` in one place: when reduced motion is
 * requested, elements appear immediately with no transform.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element travels in from. */
  y?: number;
};

/** Fade + rise in on mount. */
export function FadeIn({ children, className, delay = 0, y = 12 }: FadeInProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Fade + rise in when scrolled into view (once). */
export function Reveal({ children, className, delay = 0, y = 16 }: FadeInProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Container that staggers its `StaggerItem` children into view. */
export function Stagger({
  children,
  className,
  asList = false,
}: {
  children: ReactNode;
  className?: string;
  asList?: boolean;
}) {
  const Component = asList ? motion.ul : motion.div;
  return (
    <Component
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </Component>
  );
}

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
  asListItem = false,
}: {
  children: ReactNode;
  className?: string;
  asListItem?: boolean;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : staggerChild;
  const Component = asListItem ? motion.li : motion.div;
  return (
    <Component className={cn(className)} variants={variants}>
      {children}
    </Component>
  );
}
