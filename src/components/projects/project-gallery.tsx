"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { cn } from "@/lib/utils";

type GalleryImage = { src: string; alt: string; caption?: string };

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripPrev, setStripPrev] = useState(false);
  const [stripNext, setStripNext] = useState(false);

  const updateStrip = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setStripPrev(el.scrollLeft > 4);
    setStripNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    updateStrip();
    el.addEventListener("scroll", updateStrip, { passive: true });
    const ro = new ResizeObserver(updateStrip);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateStrip);
      ro.disconnect();
    };
  }, [updateStrip, images.length]);

  useEffect(() => {
    const el = stripRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [active]);

  if (images.length === 0) return null;
  const current = images[active];
  const many = images.length > 1;

  const go = (delta: number) =>
    setActive((i) => Math.min(images.length - 1, Math.max(0, i + delta)));

  const scrollStrip = (dir: number) =>
    stripRef.current?.scrollBy({
      left: dir * stripRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">Gallery</h2>

      <div className="group relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />
          </motion.span>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View fullscreen: ${current.alt}`}
          className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        />

        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-background/70 px-2.5 py-1.5 text-xs font-medium text-foreground opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
          <Maximize2 className="size-3.5" />
          View fullscreen
        </span>

        {many && (
          <>
            <ImageArrow side="left" disabled={active === 0} onClick={() => go(-1)} />
            <ImageArrow
              side="right"
              disabled={active === images.length - 1}
              onClick={() => go(1)}
            />
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-background/70 px-2 py-1 font-mono text-xs text-foreground backdrop-blur">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="relative mt-3">
          <div
            ref={stripRef}
            className="flex gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "relative aspect-[16/9] flex-[1_0_7rem] max-w-[13rem] overflow-hidden rounded-lg border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  i === active
                    ? "border-brand"
                    : "border-transparent opacity-55 hover:opacity-100"
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {stripPrev && <StripArrow side="left" onClick={() => scrollStrip(-1)} />}
          {stripNext && <StripArrow side="right" onClick={() => scrollStrip(1)} />}
        </div>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={active}
        on={{ view: ({ index }) => setActive(index) }}
        slides={images.map((img) => ({ src: img.src, alt: img.alt }))}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .92)" } }}
      />
    </section>
  );
}

function ImageArrow({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/70 text-foreground backdrop-blur transition-all hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        side === "left" ? "left-3" : "right-3",
        disabled ? "pointer-events-none opacity-0" : "opacity-0 group-hover:opacity-100"
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}

function StripArrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Scroll thumbnails left" : "Scroll thumbnails right"}
      className={cn(
        "absolute top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 text-foreground shadow-md backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        side === "left" ? "left-1" : "right-1"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
