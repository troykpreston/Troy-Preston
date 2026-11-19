import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { Shot } from "./Gallery";

/** One screenshot on the project's tone — sits between narrative sections. */
export function Plate({ shot, name, tone, fig }: { shot: Shot; name: string; tone: string; fig: string }) {
  return (
    <Reveal as="figure" className="plate" y={40}>
      <div className="plate__mat" style={{ "--tone": tone } as CSSProperties}>
        <div className="plate__img">
          <Image
            src={shot.src}
            alt={shot.caption ? `${name} — ${shot.caption}` : `${name} — interface`}
            width={shot.width}
            height={shot.height}
            sizes="(max-width: 1680px) 90vw, 1400px"
            quality={90}
          />
        </div>
      </div>
      <figcaption className="gal__cap">
        <span className="label">Fig. {fig}</span>
        <span>{shot.caption}</span>
      </figcaption>
    </Reveal>
  );
}

/** Two screenshots side by side, offset for rhythm. */
export function Pair({ shots, name, figs }: { shots: Shot[]; name: string; figs: string[] }) {
  return (
    <div className="pair">
      {shots.map((s, i) => (
        <Reveal as="figure" key={s.src} className="pair__item" delay={i * 0.08} y={40}>
          <div className="pair__img">
            <Image
              src={s.src}
              alt={s.caption ? `${name} — ${s.caption}` : `${name} — interface`}
              width={s.width}
              height={s.height}
              sizes="(max-width: 900px) 100vw, 45vw"
              quality={90}
            />
          </div>
          <figcaption className="gal__cap">
            <span className="label">Fig. {figs[i]}</span>
            <span>{s.caption}</span>
          </figcaption>
        </Reveal>
      ))}
    </div>
  );
}
