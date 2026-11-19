import { Lines, Reveal, Rule } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { linkedin, site } from "@/content/site";
import { Clock } from "./Clock";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = site.socials.filter((s) => s.href);

  return (
    <footer id="contact" className="ftr">
      <div className="container">
        <div className="ftr__top">
          <span className="label">Contact</span>
          {site.availability && (
            <span className="label ftr__status">
              <i className="dot" /> {site.availability}
            </span>
          )}
        </div>

        <Lines
          as="h2"
          className="ftr__title serif"
          lines={["Have a complex system", "that deserves *care?*"]}
        />

        <Reveal delay={0.2} className="ftr__reach">
          <a className="ftr__mail" href={`mailto:${site.email}`}>
            <span className="label">Email</span>
            <span className="ftr__mail-line">
              <span className="u">{site.email}</span>
              <span className="arrow" aria-hidden>
                →
              </span>
            </span>
          </a>
          <a className="ftr__mail" href={linkedin} target="_blank" rel="noreferrer">
            <span className="label">LinkedIn</span>
            <span className="ftr__mail-line">
              <span className="u">Troy K. Preston</span>
              <span className="arrow ftr__ext" aria-hidden>
                ↗
              </span>
            </span>
          </a>
        </Reveal>

        <Rule className="ftr__rule" />

        <div className="ftr__cols">
          <div>
            <span className="label">Elsewhere</span>
            {socials.length ? (
              <ul>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href!} className="u" target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">—</p>
            )}
          </div>
          <div>
            <span className="label">Direct</span>
            <ul>
              <li>
                <a href={`mailto:${site.email}`} className="u">
                  Email
                </a>
              </li>
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="u">
                    {site.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <span className="label">Based in</span>
            <p>{site.location ?? <span className="muted">—</span>}</p>
          </div>
          <div>
            <span className="label">Local time</span>
            <p>{site.timezone ? <Clock timezone={site.timezone} /> : <span className="muted">—</span>}</p>
          </div>
          <div>
            <span className="label">Index</span>
            <ul>
              <li>
                <TransitionLink href="/work" className="u">
                  All work
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/#about" className="u">
                  About
                </TransitionLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="ftr__base">
          <span>
            © {year} {site.name}
          </span>
          <span className="ftr__credit">Designed &amp; engineered by {site.name}</span>
          <TransitionLink href="#top" className="ftr__top-link">
            Back to top{" "}
            <span className="arrow arrow--up" aria-hidden>
              ↑
            </span>
          </TransitionLink>
        </div>
      </div>
    </footer>
  );
}
