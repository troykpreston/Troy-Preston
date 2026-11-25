import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ProjectFrame } from "@/components/work/ProjectFrame";
import { featuredProjects, mediaFor, pad } from "@/lib/content";
import { projects } from "@/content/projects";
import { SectionHead } from "./SectionHead";

/**
 * Editorial composition: a four-beat rhythm of wide / narrow / narrow / wide
 * placements with vertical offsets, so no two neighbours sit the same way.
 */
const RHYTHM = [
  { cls: "feat--a", ratio: "4 / 3" },
  { cls: "feat--b", ratio: "4 / 3" },
  { cls: "feat--c", ratio: "4 / 3" },
  { cls: "feat--d", ratio: "4 / 3" },
];

export function SelectedWork() {
  const list = featuredProjects();

  return (
    <section id="work" className="work container">
      <SectionHead
        index="01"
        title="Selected work"
        aside={
          <TransitionLink href="/work" className="label shead__link">
            Full index ({pad(projects.length)}) <span className="arrow">→</span>
          </TransitionLink>
        }
      />

      <div className="feats">
        {list.map((p, i) => {
          const { cover, position } = mediaFor(p);
          const beat = RHYTHM[i % RHYTHM.length];
          const number = projects.indexOf(p) + 1;
          return (
            <article key={p.slug} className={`feat ${beat.cls}`}>
              <TransitionLink href={`/work/${p.slug}`} className="feat__link" aria-label={`${p.name} — case study`}>
                <ProjectFrame
                  slug={p.slug}
                  name={p.name}
                  tone={p.tone}
                  ratio={beat.ratio}
                  position={position}
                  cover={cover && { src: cover.src, width: cover.width!, height: cover.height! }}
                  morph
                  reveal
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
                <Reveal className="feat__info" y={16}>
                  <span className="label feat__num">{pad(number)}</span>
                  <h3 className="feat__name">{p.name}</h3>
                  <p className="feat__tag">{p.tagline}</p>
                  {p.credit && <p className="credit">{p.credit}</p>}
                  <ul className="feat__disc">
                    {p.disciplines.map((d) => (
                      <li key={d} className="label">
                        {d}
                      </li>
                    ))}
                  </ul>
                  <span className="feat__cta" aria-hidden>
                    <span className="label">View case</span>
                    <span className="arrow">→</span>
                  </span>
                </Reveal>
              </TransitionLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}
