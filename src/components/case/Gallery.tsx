"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { lenisStore } from "@/components/motion/SmoothScroll";
import { duration, ease, inView } from "@/lib/motion";
import { pad } from "@/lib/content";

export type Shot = { src: string; width: number; height: number; caption: string };

/**
 * Gallery with a deliberate rhythm: full-width plates on the project's tone,
 * then pairs; portrait (mobile) screens are grouped in narrower columns.
 * Click opens a lightbox that grows out of the clicked image.
 */
export function Gallery({ shots, name, tone, start = 1 }: { shots: Shot[]; name: string; tone: string; start?: number }) {
  const [open, setOpen] = useState<number | null>(null);

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
    };
  }, [open, go]);

  let landscape = 0;
  const layout = shots.map((s) => {
    if (s.height > s.width * 1.1) return "narrow";
    return landscape++ % 3 === 0 ? "full" : "half";
  });

  // Portrait (phone) screens are gathered into one centred row.
  const phones = shots.flatMap((_, i) => (layout[i] === "narrow" ? [i] : []));

  const renderShot = (s: Shot, i: number) => (
    <motion.figure
      key={s.src}
      className={`gal__item gal__item--${layout[i]}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: duration.slower, ease: ease.out, delay: layout[i] === "narrow" ? phones.indexOf(i) * 0.06 : 0 }}
    >
      <button type="button" className="gal__btn" onClick={() => setOpen(i)} aria-label={`Enlarge: ${s.caption || `${name} screen ${i + 1}`}`}>
        <motion.div layoutId={`shot-${i}`} className="gal__img" transition={{ duration: duration.base + 0.1, ease: ease.inOut }}>
          <Image
            src={s.src}
            alt={s.caption ? `${name} — ${s.caption}` : `${name} — screen ${i + 1}`}
            width={s.width}
            height={s.height}
            sizes={
              layout[i] === "full"
                ? "(max-width: 900px) 100vw, 80vw"
                : layout[i] === "half"
                  ? "(max-width: 900px) 100vw, 45vw"
                  : "(max-width: 900px) 45vw, 18vw"
            }
            quality={90}
          />
        </motion.div>
      </button>
      <figcaption className="gal__cap">
        <span className="label">Fig. {pad(start + i)}</span>
        <span>{s.caption}</span>
      </figcaption>
    </motion.figure>
  );

  return (
    <>
      <div className="gal" style={{ "--tone": tone } as CSSProperties}>
        {phones.length > 0 && (
          <div className="gal__phones" data-count={phones.length}>
            {phones.map((i) => renderShot(shots[i], i))}
          </div>
        )}
        {shots.map((s, i) => (layout[i] === "narrow" ? null : renderShot(s, i)))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="lb"
            role="dialog"
            aria-modal="true"
            aria-label={shots[open].caption || name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: ease.out }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              layoutId={`shot-${open}`}
              className="lb__img"
              transition={{ duration: duration.base + 0.1, ease: ease.inOut }}
              onClick={(e) => e.stopPropagation()}
              style={
                {
                  aspectRatio: `${shots[open].width} / ${shots[open].height}`,
                  "--r": shots[open].width / shots[open].height,
                } as CSSProperties
              }
            >
              <Image src={shots[open].src} alt={shots[open].caption || name} fill sizes="100vw" quality={90} />
            </motion.div>

            <div className="lb__bar" onClick={(e) => e.stopPropagation()}>
              <span className="label">
                {pad(open + 1)} / {pad(shots.length)} — {shots[open].caption}
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
    </>
  );
}
