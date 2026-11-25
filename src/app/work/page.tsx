import type { Metadata } from "next";
import { Page } from "@/components/motion/Page";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { WorkIndex, type IndexItem } from "@/components/work/WorkIndex";
import { projects } from "@/content/projects";
import { allDisciplines, mediaFor, pad } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Index of selected engineering work — platforms, AI systems, enterprise and mobile software.",
};

export default function WorkPage() {
  const items: IndexItem[] = projects.map((p, i) => {
    const { cover, position } = mediaFor(p);
    return {
      slug: p.slug,
      number: pad(i + 1),
      name: p.name,
      tagline: p.tagline,
      credit: p.credit ?? null,
      disciplines: p.disciplines,
      year: p.year,
      tone: p.tone,
      position,
      cover: cover ? { src: cover.src, width: cover.width!, height: cover.height! } : null,
    };
  });

  return (
    <Page>
      <section className="idx-head container">
        <Reveal className="idx-head__meta" trigger="mount" y={0} delay={0.05}>
          <span className="label">Index</span>
          <span className="label">{pad(projects.length)} projects</span>
        </Reveal>
        <Lines as="h1" className="idx-head__title serif" lines={["Work, *in full.*"]} trigger="mount" delay={0.1} />
        <Reveal className="idx-head__intro" trigger="mount" delay={0.35}>
          <p className="lead muted">
            Platforms, AI systems, enterprise software and mobile applications — each one taken from first model to
            production.
          </p>
        </Reveal>
      </section>
      <section className="container">
        <WorkIndex items={items} disciplines={allDisciplines()} />
      </section>
    </Page>
  );
}
