"use client";

import { MotionConfig } from "framer-motion";

/**
 * Forces animations to play regardless of the OS "reduce motion" setting.
 * See https://motion.dev/troubleshooting/reduced-motion-disabled
 *
 * Switch `reducedMotion` to "user" if you'd rather respect the system setting
 * for accessibility.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>;
}
