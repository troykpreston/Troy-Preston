"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { lenisStore } from "@/components/motion/SmoothScroll";
import { ease } from "@/lib/motion";
import { pad } from "@/lib/content";

export type Shot = { src: string; width: number; height: number; caption: string };

type Open = (index: number, trigger: HTMLElement, keyboard: boolean) => void;
const Ctx = createContext<Open | null>(null);

/**
 * One lightbox for every screenshot on a case page — the plate, the pair and
 * the gallery all open it, and arrows step through all of them in page order.
 * Opens with a calm fade-and-settle (no image flying across the page); focus
 * returns to the thumbnail only when the lightbox was opened from the keyboard.
 */
export function LightboxProvider({ shots, name, children }: { shots: Shot[]; name: string; children: ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<{ el: HTMLElement; keyboard: boolean } | null>(null);
  const reduce = useReducedMotion();

  const show: Open = useCallback((index, el, keyboard) => {
    trigger.current = { el, keyboard };
    setOpen(index);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    lenisStore.current?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lb-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lb-open");
      lenisStore.current?.start();
      const t = trigger.current;
      if (t?.keyboard) t.el.focus({ preventScroll: true });
      else t?.el.blur();
    };
  }, [open, go]);

  const shot = open === null ? null : shots[open];

  return (
    <Ctx.Provider value={show}>
      {children}
      <AnimatePresence>
        {shot && open !== null && (
          <motion.div
            className="lb"
            role="dialog"
            aria-modal="true"
            aria-label={shot.caption || name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.35, ease: ease.out }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              key={open}
              className="lb__img"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
              transition={{ duration: reduce ? 0.15 : 0.55, ease: ease.out }}
              onClick={(e) => e.stopPropagation()}
              style={{ aspectRatio: `${shot.width} / ${shot.height}`, "--r": shot.width / shot.height } as CSSProperties}
            >
              <Image src={shot.src} alt={shot.caption || name} fill sizes="100vw" quality={90} />
            </motion.div>

            <div className="lb__bar" onClick={(e) => e.stopPropagation()}>
              <span className="label">
                {pad(open + 1)} / {pad(shots.length)} — {shot.caption}
              </span>
              <div className="lb__ctrl">
                <button type="button" onClick={() => go(-1)} aria-label="Previous image">
                  ←
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next image">
                  →
                </button>
                <button type="button" onClick={() => setOpen(null)} aria-label="Close">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

/** A screenshot that opens the page lightbox at `index`. Falls back to a plain image outside a provider. */
export function ZoomImage({
  shot,
  index,
  alt,
  sizes,
  className,
  buttonClassName = "gal__btn",
}: {
  shot: Shot;
  index: number;
  alt: string;
  sizes: string;
  className: string;
  buttonClassName?: string;
}) {
  const open = useContext(Ctx);
  const img = (
    <div className={className}>
      <Image src={shot.src} alt={alt} width={shot.width} height={shot.height} sizes={sizes} quality={90} />
    </div>
  );
  if (!open) return img;
  return (
    <button type="button" className={buttonClassName} onClick={(e) => open(index, e.currentTarget, e.detail === 0)} aria-label={`Enlarge: ${shot.caption || alt}`}>
      {img}
    </button>
  );
}
