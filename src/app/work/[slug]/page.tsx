import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Blocks } from "@/components/case/Blocks";
import { Diagram } from "@/components/case/Diagram";
import { Pair, Plate } from "@/components/case/Figures";
import { Gallery, type Shot } from "@/components/case/Gallery";
import { NextProject } from "@/components/case/NextProject";
import { ScrollProgress } from "@/components/case/ScrollProgress";
import { Page } from "@/components/motion/Page";
import { Lines, Reveal, Rule } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Pending } from "@/components/ui/Pending";
import { ProjectFrame } from "@/components/work/ProjectFrame";
import { diagrams } from "@/content/diagrams";
import { projects } from "@/content/projects";
import { getProject, mediaFor, neighbours, pad } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  const { cover } = mediaFor(p);
  return {
    title: p.name,
    description: p.tagline,
    openGraph: cover ? { images: [{ url: cover.src, width: cover.width, height: cover.height }] } : undefined,
  };
}

export default async function CasePage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { cover, gallery, video, position } = mediaFor(project);
  const { index, next } = neighbours(slug);
  const diagram = diagrams[slug];

  const shots: Shot[] = gallery
    .filter((m) => m.file !== cover?.file)
    .map((m) => ({ src: m.src, width: m.width!, height: m.height!, caption: m.caption }));

  // Interleave visuals with the narrative: a plate after Overview, the diagram
  // after Architecture, a pair after Implementation, the rest at the end.
  const isLandscape = (s: Shot) => s.width >= s.height;
  const plate = shots.find(isLandscape);
  const pair = shots.filter((s) => s !== plate && isLandscape(s)).slice(0, 2);
  const rest = shots.filter((s) => s !== plate && !pair.includes(s));

  let fig = 0;
  const nextFig = () => pad(++fig);
  const after: Partial<Record<string, ReactNode>> = {};
  if (plate) after.Overview = <Plate shot={plate} name={project.name} tone={project.tone} fig={nextFig()} />;
  if (diagram) after.Architecture = <Diagram diagram={diagram} index={nextFig()} />;
  if (pair.length === 2) after.Implementation = <Pair shots={pair} name={project.name} figs={[nextFig(), nextFig()]} />;
  else rest.unshift(...pair);
  const restStart = fig + 1;

  const meta = (
    [
      ["Role", project.role],
      ["System", project.system],
      ["Focus", project.focus],
      ["Platform", project.platform],
      ["Year", project.year],
      ["Status", project.status],
    ] as const
  ).filter(([, v]) => v);
  const links = project.links?.filter((l) => l.href) ?? [];

  return (
    <Page>
      <ScrollProgress />
      <article className="case">
        <header className="case__head container">
          <Reveal className="case__crumbs" trigger="mount" y={0}>
            <TransitionLink href="/work" className="label case__back">
              <span className="arrow arrow--back">←</span> Index
            </TransitionLink>
            <span className="label">
              Case {pad(index + 1)} / {pad(projects.length)}
            </span>
          </Reveal>

          <Reveal trigger="mount" delay={0.05} y={0} className="case__category">
            <span className="label">{project.category}</span>
          </Reveal>
          <Lines as="h1" lines={[project.name]} className="case__title serif" trigger="mount" delay={0.1} />

          <div className="case__intro">
            <div className="case__lede">
              <Reveal trigger="mount" delay={0.35}>
                <p className="lead">{project.tagline}</p>
              </Reveal>
              {project.stack?.length ? (
                <Reveal trigger="mount" delay={0.45} className="case__stack">
                  {project.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </Reveal>
              ) : null}
            </div>
            <Reveal as="div" trigger="mount" delay={0.5} className="case__meta-wrap">
              <dl className="case__meta">
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="label">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
                {links.length > 0 && (
                  <div>
                    <dt className="label">Links</dt>
                    <dd className="case__links">
                      {links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="u">
                          {l.label} ↗
                        </a>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </Reveal>
          </div>
        </header>

        <div className="case__hero container">
          <ProjectFrame
            slug={project.slug}
            name={project.name}
            tone={project.tone}
            variant="hero"
            position={position}
            video={video?.src}
            cover={cover && { src: cover.src, width: cover.width!, height: cover.height! }}
            morph
            priority
            sizes="(max-width: 1680px) 100vw, 1600px"
          />
        </div>

        <div className="case__sections container">
          {project.sections.map((s, i) => (
            <div key={s.title} className="csec-wrap">
              <section className="csec" aria-labelledby={`sec-${i}`}>
                <Rule />
                <div className="csec__grid">
                  <div className="csec__aside">
                    <span className="label">{pad(i + 1)} /</span>
                    <h2 id={`sec-${i}`} className="csec__title serif">
                      {s.title}
                    </h2>
                  </div>
                  <div className="csec__body">{s.blocks ? <Blocks blocks={s.blocks} /> : <Pending />}</div>
                </div>
              </section>
              {after[s.title] && <div className="csec__figure">{after[s.title]}</div>}
            </div>
          ))}
        </div>

        {rest.length > 0 && (
          <section className="case__gallery container" aria-label="More screens">
            <div className="case__gallery-head">
              <span className="label">More screens</span>
              <span className="label">{pad(rest.length)} figures</span>
            </div>
            <Gallery shots={rest} name={project.name} tone={project.tone} start={restStart} />
          </section>
        )}

        {next && next.slug !== project.slug && <NextProject project={next} />}
      </article>
    </Page>
  );
}
