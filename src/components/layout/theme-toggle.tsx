"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

/** Accessible light/dark toggle. Renders a stable placeholder until mounted to avoid hydration mismatch. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Gate rendering of the theme-dependent icon until mounted to avoid a
  // hydration mismatch (server can't know the resolved theme).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-[1.1rem]" />
        ) : (
          <Moon className="size-[1.1rem]" />
        )
      ) : (
        <Sun className="size-[1.1rem]" />
      )}
    </Button>
  );
}
