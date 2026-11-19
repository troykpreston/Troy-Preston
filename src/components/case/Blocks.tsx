import { Reveal } from "@/components/motion/Reveal";
import type { Block } from "@/content/projects";
import { pad } from "@/lib/content";

/** Renders structured case-study content. Add new block types in projects.ts + here. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blocks">
      {blocks.map((b, i) => (
        <Reveal key={i} className={`blk blk--${b.type}`} delay={0.04}>
          {render(b)}
        </Reveal>
      ))}
    </div>
  );
}

function render(b: Block) {
  switch (b.type) {
    case "text":
      return <p>{b.body}</p>;
    case "list":
      return (
        <ul className="blk__list">
          {b.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "flow":
      return (
        <ol className="flow">
          {b.steps.map((s, i) => (
            <li key={i} className="flow__step">
              <span className="label flow__n">{pad(i + 1)}</span>
              <div>
                <p className="flow__label">{s.label}</p>
                {s.detail && <p className="flow__detail muted">{s.detail}</p>}
              </div>
            </li>
          ))}
        </ol>
      );
    case "specs":
      return (
        <dl className="specs">
          {b.rows.map(([k, v]) => (
            <div key={k} className="specs__row">
              <dt className="label">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      );
    case "quote":
      return (
        <blockquote className="quote">
          <p className="serif">“{b.body}”</p>
          {b.cite && <cite className="label">{b.cite}</cite>}
        </blockquote>
      );
  }
}
