import type { ReactNode } from "react";
import { Lines, Rule } from "@/components/motion/Reveal";

/** Numbered section header: index · title · aside, over a drawn hairline. */
export function SectionHead({ index, title, aside }: { index: string; title: string; aside?: ReactNode }) {
  return (
    <header className="shead">
      <div className="shead__row">
        <span className="label label--accent shead__index">{index}</span>
        <Lines as="h2" lines={[title]} className="shead__title" />
        {aside && <div className="shead__aside">{aside}</div>}
      </div>
      <Rule />
    </header>
  );
}
