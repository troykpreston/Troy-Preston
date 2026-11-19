import { Lines, Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { site } from "@/content/site";

export function Hero({ projectCount }: { projectCount: number }) {
  return (
    <section className="hero container">
      <Reveal className="hero__top" trigger="mount" delay={0.1} y={0}>
        <span className="label">Engineering portfolio</span>
        <span className="label hero__index">Selected work — {String(projectCount).padStart(2, "0")} projects</span>
        <span className="label">Portfolio © {new Date().getFullYear()}</span>
      </Reveal>

      <div className="hero__main">
        <Lines as="h1" lines={site.headline} className="hero__title serif" trigger="mount" delay={0.15} />
        <Reveal trigger="mount" delay={0.55} className="hero__intro">
          <p>{site.intro}</p>
          <TransitionLink href="/work" className="hero__cta">
            <span className="u">View selected work</span> <span className="arrow">→</span>
          </TransitionLink>
        </Reveal>
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
