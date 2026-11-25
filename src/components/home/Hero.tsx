import { Lines, Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { linkedin, site } from "@/content/site";
import { featuredProjects, mediaFor } from "@/lib/content";
import { Showcase, type ShowcaseItem } from "./Showcase";

export function Hero({ projectCount }: { projectCount: number }) {
  const showcase: ShowcaseItem[] = featuredProjects().flatMap((p) => {
    const { cover, position } = mediaFor(p);
    return cover?.width
      ? [{ slug: p.slug, name: p.name, category: p.category, position, cover: { src: cover.src, width: cover.width, height: cover.height! } }]
      : [];
  });

  return (
    <section className="hero container">
      <Reveal className="hero__top" trigger="mount" delay={0.1} y={0}>
        <span className="label">Engineering portfolio</span>
        <span className="label hero__index">Selected work — {String(projectCount).padStart(2, "0")} projects</span>
        <span className="label">Portfolio © {new Date().getFullYear()}</span>
      </Reveal>

      <div className="hero__main">
        <div className="hero__copy">
          <Reveal trigger="mount" delay={0.1} y={0} className="hero__eyebrow">
            <span className="hero__eyebrow-rule" aria-hidden />
            <span className="label">Senior AI Engineer · 6+ years</span>
          </Reveal>
          <Lines as="h1" lines={site.headline} className="hero__title" trigger="mount" delay={0.15} />
          <Reveal trigger="mount" delay={0.55} className="hero__intro">
            <p>{site.intro}</p>
            <div className="hero__links">
              <TransitionLink href="/work" className="btn btn--primary hero__cta hero__cta--primary">
                <span>View selected work</span> <span className="arrow">→</span>
              </TransitionLink>
              <a href={linkedin} target="_blank" rel="noreferrer" className="hero__cta hero__cta--quiet">
                <span className="u">LinkedIn</span> <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
        {showcase.length > 0 && <Showcase items={showcase} />}
      </div>

      <div className="hero__meta">
        <Reveal trigger="mount" delay={0.65} className="hero__cell">
          <span className="label">Practice</span>
          <p>Full-stack · AI engineering · Enterprise · Mobile</p>
        </Reveal>
        <Reveal trigger="mount" delay={0.73} className="hero__cell">
          <span className="label">Based in</span>
          <p>{site.location ?? "—"}</p>
        </Reveal>
        <Reveal trigger="mount" delay={0.81} className="hero__cell">
          <span className="label">Status</span>
          <p className="hero__status">
            {site.availability ? (
              <>
                <i className="dot" /> {site.availability}
              </>
            ) : (
              "—"
            )}
          </p>
        </Reveal>
        <Reveal trigger="mount" delay={0.89} className="hero__cell hero__cell--end">
          <TransitionLink href="#work" className="hero__scroll">
            <span className="label">Scroll to work</span>
            <span className="hero__scroll-line" aria-hidden />
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
