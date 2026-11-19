"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Diagram as DiagramData, NodeKind } from "@/content/diagrams";
import { duration, ease } from "@/lib/motion";

const BASIS: Record<DiagramData["basis"], { badge: string; note: string | null }> = {
  documented: { badge: "Implementation view", note: null },
  logical: {
    badge: "Logical view",
    note: "Logical structure derived from the product scope — not an as-built infrastructure diagram.",
  },
  conceptual: {
    badge: "Conceptual",
    note: "Proposed logical architecture. Components are to be confirmed against the implementation.",
  },
};

const LEGEND: { kind: NodeKind; label: string }[] = [
  { kind: "interface", label: "Interface" },
  { kind: "service", label: "Service" },
  { kind: "integration", label: "Integration" },
  { kind: "data", label: "Data" },
  { kind: "actor", label: "Actor / source" },
];

type Box = { x: number; y: number; w: number; h: number };
const R = 10;

/** Orthogonal connector with rounded elbows, routed through the gap between layers. */
function route(s: Box, t: Box): string {
  const sx = s.x + s.w / 2;
  const tx = t.x + t.w / 2;

  // Target below source.
  if (t.y >= s.y + s.h - 1) {
    const sy = s.y + s.h;
    const ty = t.y;
    const my = sy + (ty - sy) / 2;
    if (Math.abs(tx - sx) < 2) return `M${sx},${sy} V${ty}`;
    const dir = tx > sx ? 1 : -1;
    const r = Math.min(R, Math.abs(tx - sx) / 2, (ty - sy) / 2);
    return `M${sx},${sy} V${my - r} Q${sx},${my} ${sx + dir * r},${my} H${tx - dir * r} Q${tx},${my} ${tx},${my + r} V${ty}`;
  }

  // Target above source.
  if (t.y + t.h <= s.y + 1) {
    const sy = s.y;
    const ty = t.y + t.h;
    const my = ty + (sy - ty) / 2;
    if (Math.abs(tx - sx) < 2) return `M${sx},${sy} V${ty}`;
    const dir = tx > sx ? 1 : -1;
    const r = Math.min(R, Math.abs(tx - sx) / 2, (sy - ty) / 2);
    return `M${sx},${sy} V${my + r} Q${sx},${my} ${sx + dir * r},${my} H${tx - dir * r} Q${tx},${my} ${tx},${my - r} V${ty}`;
  }

  // Same row: straight horizontal link between facing edges.
  const cy = (s.y + s.h / 2 + t.y + t.h / 2) / 2;
  return t.x >= s.x + s.w ? `M${s.x + s.w},${cy} H${t.x}` : `M${s.x},${cy} H${t.x + t.w}`;
}

/**
 * Architecture diagram in the site's own visual language.
 * Desktop: layered rows with measured, orthogonally routed connectors that
 * draw in on scroll. Mobile: layers stack vertically and wrap — labels stay
 * full size instead of shrinking.
 */
export function Diagram({ diagram, index }: { diagram: DiagramData; index: string }) {
  const canvas = useRef<HTMLDivElement>(null);
  const shown = useInView(canvas, { once: true, margin: "0px 0px -15% 0px" });
  const [paths, setPaths] = useState<{ key: string; d: string; layer: number }[]>([]);

  const layerOf = new Map<string, number>();
  diagram.layers.forEach((layer, i) => layer.forEach((node) => layerOf.set(node.id, i)));

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;

    const measure = () => {
      // CSS decides whether connectors are drawn (desktop) or not (stacked mobile layout).
      if (getComputedStyle(el).getPropertyValue("--dg-wired").trim() !== "1") {
        setPaths([]);
        return;
      }
      // Layout offsets (not getBoundingClientRect) so in-flight reveal transforms don't skew the wires.
      const box = (id: string): Box | null => {
        const node = el.querySelector<HTMLElement>(`[data-node="${id}"]`);
        if (!node) return null;
        let x = 0;
        let y = 0;
        for (let n: HTMLElement | null = node; n && n !== el; n = n.offsetParent as HTMLElement | null) {
          x += n.offsetLeft;
          y += n.offsetTop;
        }
        return { x, y, w: node.offsetWidth, h: node.offsetHeight };
      };
      setPaths(
        diagram.edges.flatMap(([from, to]) => {
          const s = box(from);
          const t = box(to);
          return s && t ? [{ key: `${from}-${to}`, d: route(s, t), layer: layerOf.get(to) ?? 0 }] : [];
        }),
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagram]);

  const basis = BASIS[diagram.basis];
  const usedKinds = new Set(diagram.layers.flat().map((n) => n.kind));
  const markerId = `arrow-${index}`;

  return (
    <figure className="dg" data-basis={diagram.basis}>
      <figcaption className="dg__head">
        <span className="label">
          Fig. {index} — {diagram.title}
        </span>
        <span className="dg__badge label">{basis.badge}</span>
      </figcaption>

      <div ref={canvas} className="dg__canvas">
        <svg className="dg__wires" aria-hidden>
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M1,1 L9,5 L1,9" className="dg__arrow" />
            </marker>
          </defs>
          {paths.map((p) => (
            <motion.path
              key={p.key}
              d={p.d}
              className="dg__wire"
              markerEnd={`url(#${markerId})`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={shown ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: duration.slow, ease: ease.inOut, delay: 0.25 + p.layer * 0.14 }}
            />
          ))}
        </svg>

        <ol className="dg__layers">
          {diagram.layers.map((layer, i) => (
            <li key={i} className="dg__layer" data-count={layer.length}>
              {layer.map((node) => (
                <motion.div
                  key={node.id}
                  data-node={node.id}
                  className={`dg__node dg__node--${node.kind}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={shown ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: duration.base, ease: ease.out, delay: i * 0.14 }}
                >
                  {node.label}
                </motion.div>
              ))}
            </li>
          ))}
        </ol>
      </div>

      <div className="dg__foot">
        <ul className="dg__legend" aria-label="Legend">
          {LEGEND.filter((l) => usedKinds.has(l.kind)).map((l) => (
            <li key={l.kind}>
              <i className={`dg__swatch dg__node--${l.kind}`} aria-hidden />
              {l.label}
            </li>
          ))}
        </ul>
        {basis.note && <p className="dg__note">{basis.note}</p>}
      </div>
    </figure>
  );
}
