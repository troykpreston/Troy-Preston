import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Pending } from "@/components/ui/Pending";
import { site } from "@/content/site";
import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section id="about" className="about container">
      <SectionHead index="03" title="Background" aside={<span className="label">About</span>} />

      <div className="about__grid">
        <Reveal className="about__portrait">
          {site.portrait ? (
            <Image
              src={site.portrait}
              alt={`Portrait of ${site.name}`}
              fill
              sizes="(max-width: 900px) 70vw, 30vw"
              quality={90}
            />
          ) : (
            <div className="about__ph">
              <span className="serif">{site.name.charAt(0)}</span>
              <span className="label">Portrait</span>
            </div>
          )}
        </Reveal>

        <div className="about__body">
          {site.bio.length ? (
            site.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className={i === 0 ? "lead" : "muted"}>{para}</p>
              </Reveal>
            ))
          ) : (
            <Reveal>
              <p className="lead">
                A senior software engineer who builds production systems end to end — from data models and AI pipelines
                to the interfaces people use every day.
              </p>
              <Pending hint="Biography — add paragraphs to site.bio" />
            </Reveal>
          )}

          <div className="xp">
            <span className="label xp__label">Experience</span>
            <ol>
              {site.experience.map((x, i) => (
                <Reveal as="li" key={i} className="xp__row" delay={i * 0.05} y={12}>
                  <span className="label xp__period">{x.period ?? "Year — Year"}</span>
                  <div className="xp__main">
                    <span className={`xp__role ${x.role ? "" : "is-pending"}`}>{x.role ?? "Role"}</span>
                    {x.note && <p className="xp__note">{x.note}</p>}
                  </div>
                  <span className={`xp__co ${x.company ? "" : "is-pending"}`}>{x.company ?? "Company"}</span>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="xp">
            <span className="label xp__label">Education</span>
            <ol>
              {site.education.map((e) => (
                <Reveal as="li" key={e.degree} className="xp__row" y={12}>
                  <span className="label xp__period">{e.period}</span>
                  <div className="xp__main">
                    <span className="xp__role">{e.degree}</span>
                  </div>
                  <span className="xp__co">{e.school}</span>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="xp">
            <span className="label xp__label">Toolkit</span>
            <dl className="skills">
              {site.skills.map((g, i) => (
                <Reveal key={g.group} className="skills__group" delay={i * 0.04} y={12}>
                  <dt className="label">{g.group}</dt>
                  <dd>{g.items.join(" · ")}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
