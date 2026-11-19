import manifest from "@/content/media.generated.json";
import { withBase } from "@/lib/base-path";
import { projects, type Project } from "@/content/projects";

export type Media = {
  file: string;
  src: string;
  kind: "image" | "video";
  caption: string;
  width?: number;
  height?: number;
};

const all: Record<string, Media[]> = Object.fromEntries(
  Object.entries(manifest as unknown as Record<string, Media[]>).map(([dir, list]) => [
    dir,
    list.map((m) => ({ ...m, src: withBase(m.src) })),
  ]),
);

/** Cover composites (00*, cover*) and raw OS screenshots stay out of the screen gallery. */
const NOT_A_SCREEN = /^(00([-_ ].*)?|cover)\.[a-z0-9]+$|^screenshot /i;

/**
 * Resolves a project's media:
 *   cover   — the designed cover image (cards, cursor preview, case hero)
 *   gallery — product screens, in curated order when `screens` is set
 *   video   — optional hero loop
 */
export function mediaFor(project: Project) {
  const list = project.assetDir ? all[project.assetDir] ?? [] : [];
  const images = list.filter((m) => m.kind === "image");
  const hidden = new Set(project.exclude ?? []);
  if (project.cover) hidden.add(project.cover);

  const gallery = project.screens
    ? project.screens.flatMap((s) => {
        const m = images.find((i) => i.file === s.file);
        return m ? [{ ...m, caption: s.caption }] : [];
      })
    : images.filter((m) => !NOT_A_SCREEN.test(m.file) && !hidden.has(m.file));

  const cover = (project.cover && images.find((m) => m.file === project.cover)) || gallery[0] || null;
  const video = (project.video && list.find((m) => m.file === project.video)) || null;
  return { cover, gallery, video, position: project.coverPosition ?? "center" };
}

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function neighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    index: i,
    next: projects[(i + 1) % projects.length],
  };
}

export const featuredProjects = () =>
  projects.filter((p) => p.featured).sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

export const pad = (n: number) => String(n).padStart(2, "0");

/** Unique discipline labels in order of first appearance. */
export const allDisciplines = () => [...new Set(projects.flatMap((p) => p.disciplines))];
