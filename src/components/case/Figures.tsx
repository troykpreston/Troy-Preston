import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ZoomImage, type Shot } from "./Lightbox";

/** One screenshot on the project's tone — sits between narrative sections. Click to enlarge. */
export function Plate({ shot, index, name, tone, fig }: { shot: Shot; index: number; name: string; tone: string; fig: string }) {
  return (
    <Reveal as="figure" className="plate" y={40}>
      <div className="plate__mat" style={{ "--tone": tone } as CSSProperties}>
        <ZoomImage
          shot={shot}
          index={index}
          className="plate__img"
          alt={shot.caption ? `${name} — ${shot.caption}` : `${name} — interface`}
          sizes="(max-width: 1680px) 90vw, 1400px"
        />
      </div>
      <figcaption className="gal__cap">
        <span className="label">Fig. {fig}</span>
        <span>{shot.caption}</span>
      </figcaption>
    </Reveal>
  );
}

/** Two screenshots side by side, offset for rhythm. Click to enlarge. */
export function Pair({ shots, start, name, figs }: { shots: Shot[]; start: number; name: string; figs: string[] }) {
  return (
    <div className="pair">
      {shots.map((s, i) => (
        <Reveal as="figure" key={s.src} className="pair__item" delay={i * 0.08} y={40}>
          <ZoomImage
            shot={s}
            index={start + i}
            className="pair__img"
            alt={s.caption ? `${name} — ${s.caption}` : `${name} — interface`}
            sizes="(max-width: 900px) 100vw, 45vw"
          />
          <figcaption className="gal__cap">
            <span className="label">Fig. {figs[i]}</span>
            <span>{s.caption}</span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}
