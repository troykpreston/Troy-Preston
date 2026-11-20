"use client";

import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { duration, ease, spring } from "@/lib/motion";
import { morphName, ProjectFrame, type FrameImage } from "./ProjectFrame";

export type IndexItem = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  disciplines: string[];
  year: string | null;
  tone: string;
  position: string;
  cover: FrameImage | null;
};

type View = "list" | "grid";

export function WorkIndex({ items, disciplines }: { items: IndexItem[]; disciplines: string[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [view, setView] = useState<View>("list");
  const [hovered, setHovered] = useState<string | null>(null);
  const [finePointer, setFinePointer] = useState(false);

  // Remember the preferred view between visits.
  useEffect(() => {
    try {
      const v = localStorage.getItem("work-view");
      if (v === "grid" || v === "list") setView(v);
    } catch {}
    setFinePointer(matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  const changeView = (v: View) => {
    setView(v);
    try {
      localStorage.setItem("work-view", v);
    } catch {}
  };

  const visible = useMemo(
    () => (filter ? items.filter((p) => p.disciplines.includes(filter)) : items),
    [items, filter],
  );

  // Cursor-follow preview (desktop only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring.follow);
  const y = useSpring(my, spring.follow);

  return (
    <div className="idx" data-view={view}>
      <div className="idx__bar">
        <div className="idx__filters" role="group" aria-label="Filter by discipline">
          <button type="button" className="chip" aria-pressed={filter === null} onClick={() => setFilter(null)}>
            All <span className="idx__count">{items.length}</span>
          </button>
          {disciplines.map((d) => (
            <button
              key={d}
              type="button"
              className="chip"
              aria-pressed={filter === d}
              onClick={() => setFilter((f) => (f === d ? null : d))}
            >
              {d} <span className="idx__count">{items.filter((p) => p.disciplines.includes(d)).length}</span>
            </button>
          ))}
        </div>

        <div className="idx__views" role="group" aria-label="Layout">
          {(["list", "grid"] as const).map((v) => (
            <button key={v} type="button" className="idx__view" aria-pressed={view === v} onClick={() => changeView(v)}>
              {view === v && <motion.span layoutId="view-pill" className="idx__pill" transition={spring.ui} />}
              <span>{v === "list" ? "List" : "Grid"}</span>
            </button>
          ))}
        </div>
      </div>

      <LayoutGroup>
        <AnimatePresence mode="wait" initial={false}>
          {view === "list" ? (
            <motion.ol
              key="list"
              className="rows"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast }}
              onPointerMove={(e) => {
                mx.set(e.clientX);
                my.set(e.clientY);
              }}
              onPointerLeave={() => setHovered(null)}
              data-hovering={hovered ? "" : undefined}
            >
              <li className="rows__head label" aria-hidden>
                <span>No.</span>
                <span>Project</span>
                <span className="rows__hide-sm">Description</span>
                <span className="rows__hide-md">Discipline</span>
                <span className="rows__end" />
              </li>
              <AnimatePresence initial={false}>
                {visible.map((p) => (
                  <motion.li
                    key={p.slug}
                    layout="position"
                    className="row"
                    data-active={hovered === p.slug || undefined}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.18 } }}
                    transition={{ duration: 0.3, ease: ease.out }}
                    onPointerEnter={() => setHovered(p.slug)}
                  >
                    <TransitionLink href={`/work/${p.slug}`} className="row__link">
                      <span className="label row__num">{p.number}</span>
                      <span className="row__name">{p.name}</span>
                      <span className="row__tag rows__hide-sm">{p.tagline}</span>
                      <span className="row__disc label rows__hide-md">{p.disciplines.join(" · ")}</span>
                      <span className="row__year label rows__end">
                        {p.year ? `${p.year} ` : null}<span className="arrow">→</span>
                      </span>
                    </TransitionLink>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ol>
          ) : (
            <motion.ul
              key="grid"
              className="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast }}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {visible.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    layout
                    className="card"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: duration.base, ease: ease.out, delay: Math.min(i, 8) * 0.03 }}
                  >
                    <TransitionLink href={`/work/${p.slug}`} className="card__link">
                      <ProjectFrame
                        slug={p.slug}
                        name={p.name}
                        tone={p.tone}
                        cover={p.cover}
                        ratio="4 / 3"
                        position={p.position}
                        morph
                        sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="card__info">
                        <span className="label">{p.number}</span>
                        <h2 className="card__name">{p.name} <span className="arrow card__arrow" aria-hidden="true">→</span></h2>
                        <p className="card__tag muted">{p.tagline}</p>
                      </div>
                    </TransitionLink>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </AnimatePresence>
      </LayoutGroup>

      {view === "list" && finePointer && (
        <motion.div
          className="peek"
          style={{ x, y }}
          data-wide={(() => {
            const c = visible.find((p) => p.slug === hovered)?.cover;
            return c && c.width / c.height > 1.8 ? "" : undefined;
          })()}
          aria-hidden
        >
          <AnimatePresence>
            {visible.map((p) =>
              hovered === p.slug ? (
                <motion.div
                  key={p.slug}
                  className="peek__item"
                  initial={{ clipPath: "inset(10% round 8px)", opacity: 0, scale: 0.92 }}
                  animate={{ clipPath: "inset(0% round 8px)", opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                  // The hovered preview becomes the case-study hero on click.
                  style={{ viewTransitionName: morphName(p.slug), viewTransitionClass: "morph" } as CSSProperties}
                >
                  <PeekImage item={p} />
                </motion.div>
              ) : null,
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function PeekImage({ item }: { item: IndexItem }) {
  return (
    <div
      className="frame frame--preview"
      style={
        {
          "--tone": item.tone,
          // Show the whole cover at its own proportions.
          "--ar": item.cover ? `${item.cover.width} / ${item.cover.height}` : "4 / 3",
          "--pos": item.position,
        } as CSSProperties
      }
    >
      {item.cover ? (
        <div className="frame__fill">
          <Image src={item.cover.src} alt="" fill sizes="440px" quality={90} />
        </div>
      ) : (
        <div className="frame__ph">
          <span className="frame__mono serif">{item.name.slice(0, 2)}</span>
        </div>
      )}
    </div>
  );
}
