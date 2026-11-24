"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { duration, ease, inView } from "@/lib/motion";
import { pad } from "@/lib/content";
import { ZoomImage, type Shot } from "./Lightbox";

export type { Shot };

/**
 * Gallery with a deliberate rhythm: full-width plates on the project's tone,
 * then pairs; portrait (mobile) screens are grouped in narrower columns.
 * Click opens the page lightbox (see Lightbox.tsx); `offset` is the index of
 * the first shot in the page's lightbox list.
 */
export function Gallery({
  shots,
  name,
  tone,
  start = 1,
  offset = 0,
}: {
  shots: Shot[];
  name: string;
  tone: string;
  start?: number;
  offset?: number;
}) {
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
      transition={{
        duration: duration.slower,
        ease: ease.out,
        delay: layout[i] === "narrow" ? phones.indexOf(i) * 0.06 : 0,
      }}
    >
      <ZoomImage
        shot={s}
        index={offset + i}
        className="gal__img"
        alt={s.caption ? `${name} — ${s.caption}` : `${name} — screen ${i + 1}`}
        sizes={
          layout[i] === "full"
            ? "(max-width: 900px) 100vw, 80vw"
            : layout[i] === "half"
              ? "(max-width: 900px) 100vw, 45vw"
              : "(max-width: 900px) 45vw, 18vw"
        }
      />
      <figcaption className="gal__cap">
        <span className="label">Fig. {pad(start + i)}</span>
        <span>{s.caption}</span>
      </figcaption>
    </motion.figure>
  );

  return (
    <div className="gal" style={{ "--tone": tone } as CSSProperties}>
      {phones.length > 0 && (
        <div className="gal__phones" data-count={phones.length}>
          {phones.map((i) => renderShot(shots[i], i))}
        </div>
      )}
      {shots.map((s, i) => (layout[i] === "narrow" ? null : renderShot(s, i)))}
    </div>
  );
}
