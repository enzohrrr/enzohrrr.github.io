/**
 * Futuristic "blueprint / HUD" background for the hero.
 *
 * Layers a dashed grid, accent crosses at sparse intersections, and faint dots
 * at cell centers — all via SVG patterns so it's crisp at any size and adapts
 * to the theme through CSS variables. A radial mask fades it toward the edges
 * so it stays subtle behind the content.
 */
export function HeroGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(115% 90% at 50% 0%, #000 35%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(115% 90% at 50% 0%, #000 35%, transparent 78%)",
      }}
    >
      <svg
        className="hero-grid-drift absolute inset-x-0 top-0 w-full"
        style={{ height: "calc(100% + 216px)" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dashed grid + faint dot at each cell centre. */}
          <pattern
            id="hero-grid-cell"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M72 0H0V72"
              fill="none"
              stroke="var(--foreground)"
              strokeOpacity="0.1"
              strokeWidth="1"
              strokeDasharray="2 7"
            />
            <circle
              cx="36"
              cy="36"
              r="1.2"
              fill="var(--foreground)"
              fillOpacity="0.16"
            />
          </pattern>

          {/* Accent crosses on a coarser grid so they read as highlights. */}
          <pattern
            id="hero-grid-cross"
            width="216"
            height="216"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M108 102v12M102 108h12"
              stroke="var(--brand)"
              strokeOpacity="0.55"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#hero-grid-cell)" />
        <rect width="100%" height="100%" fill="url(#hero-grid-cross)" />
      </svg>
    </div>
  );
}
