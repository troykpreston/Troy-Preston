import { Lines } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ProjectFrame } from "@/components/work/ProjectFrame";
import type { Project } from "@/content/projects";
import { mediaFor } from "@/lib/content";

/** Closing link to the next case. Its image morphs straight into the next hero. */
export function NextProject({ project }: { project: Project }) {
  const { cover, position } = mediaFor(project);
  return (
    <section className="next container" aria-label="Next project">
      <TransitionLink href={`/work/${project.slug}`} className="next__link">
        <div className="next__text">
          <span className="label">Next case</span>
          <Lines as="h2" lines={[project.name]} className="next__name" />
          <p className="muted next__tag">{project.tagline}</p>
          <span className="next__cta label">
            Continue <span className="arrow">→</span>
          </span>
        </div>
        <div className="next__media">
          <ProjectFrame
            slug={project.slug}
            name={project.name}
            tone={project.tone}
            ratio="4 / 3"
            position={position}
            cover={cover && { src: cover.src, width: cover.width!, height: cover.height! }}
            morph
            reveal
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </TransitionLink>
    </section>
  );
}
