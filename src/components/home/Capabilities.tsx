import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { capabilities } from "@/content/site";
import { getProject, pad } from "@/lib/content";
import { SectionHead } from "./SectionHead";

export function Capabilities() {
  return (
    <section className="caps container">
      <SectionHead index="02" title="Practice" aside={<span className="label">What I build</span>} />
      <ol className="caps__list">
        {capabilities.map((c, i) => (
          <Reveal as="li" key={c.title} className="cap" delay={i * 0.04} y={18}>
            <span className="label cap__num">{pad(i + 1)}</span>
            <h3 className="cap__title">{c.title}</h3>
            <p className="cap__body">{c.body}</p>
            <div className="cap__evidence">
              <span className="label">Seen in</span>
              <ul>
                {c.evidence
                  .map(getProject)
                  .filter((p) => p !== undefined)
                  .map((p) => (
                    <li key={p.slug}>
                      <TransitionLink href={`/work/${p.slug}`} className="u">
                        {p.name}
                      </TransitionLink>
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
