"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { duration, ease } from "@/lib/motion";

export type ShowcaseItem = {
  slug: string;
  name: string;
  category: string;
  position: string;
  cover: { src: string; width: number; height: number };
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Hero showcase: featured covers crossfade on a slow cycle. The active
 * progress bar's CSS animation is the timer — hovering pauses both, and
 * reduced-motion users get a still image with manual controls.
 */
export function Showcase({ items }: { items: ShowcaseItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const item = items[index];
  if (!item) return null;

  const next = () => {
    if (!reduce) setIndex((i) => (i + 1) % items.length);
  };

  return (
    <motion.div
      className="show"
      data-paused={paused || reduce || undefined}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.slower, ease: ease.out, delay: 0.45 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <TransitionLink href={`/work/${item.slug}`} className="show__link" aria-label={`${item.name} — case study`}>
        <div className="show__frame">
          <AnimatePresence initial={false}>
            <motion.div
              key={item.slug}
              className="show__slide"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: ease.out }}
            >
              <Image
                src={item.cover.src}
                alt={`${item.name} — cover`}
                fill
                sizes="(max-width: 1000px) 100vw, 42vw"
                quality={90}
                priority={index === 0}
                style={{ objectPosition: item.position }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </TransitionLink>

      <div className="show__meta">
        <div className="show__caption" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: ease.out }}
            >
              <span className="label">{item.category}</span>
              <span className="show__name">{item.name}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="show__nav">
          <span className="label show__count">
            {pad(index + 1)} / {pad(items.length)}
          </span>
          <div className="show__bars" role="tablist" aria-label="Featured projects">
            {items.map((it, i) => (
              <button
                key={it.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={it.name}
                className="show__bar"
                data-active={i === index || undefined}
                onClick={() => setIndex(i)}
              >
                <i key={i === index ? `on-${index}` : "off"} onAnimationEnd={i === index ? next : undefined} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
