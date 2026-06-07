"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * App Router template: re-mounts on every navigation, giving each page a
 * subtle entrance fade. Honors prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
