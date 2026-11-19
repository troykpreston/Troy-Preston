"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { duration, ease, inView } from "@/lib/motion";

export type FrameImage = { src: string; width: number; height: number; alt?: string };

type Props = {
  slug: string;
  name: string;
  tone: string;
  cover: FrameImage | null;
  /** card: thumbnail · hero: case-study header · preview: cursor-follow */
  variant?: "card" | "hero" | "preview";
  /** Aspect ratio of the frame, e.g. "4 / 3". Defaults to the cover's own ratio. */
  ratio?: string;
  /** Focal point used when the cover is cropped. */
  position?: string;
  /** Optional looping video (hero only); the cover is its poster. */
  video?: string | null;
  /** Participates in the shared-element morph. Must be unique per page. */
  morph?: boolean;
  /** Settle the image in from a slight zoom when scrolled into view. */
  reveal?: boolean;
  sizes?: string;
  priority?: boolean;
};

export const morphName = (slug: string) => `media-${slug}`;

const isDark = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

/**
 * The project's cover, full-bleed inside a toned frame. The same element is
 * used for cards, the cursor preview and the case hero, so the view-transition
 * morph reads as one image growing.
 */
export function ProjectFrame({
  slug,
  name,
  tone,
  cover,
  variant = "card",
  ratio,
  position = "center",
  video,
  morph = false,
  reveal = false,
  sizes = "(max-width: 900px) 100vw, 60vw",
  priority = false,
}: Props) {
  const ar = ratio ?? (cover ? `${cover.width} / ${cover.height}` : "4 / 3");
  const style = {
    "--tone": tone,
    "--ar": ar,
    "--ar-n": cover ? cover.width / cover.height : 4 / 3,
    "--pos": position,
    ...(morph ? { viewTransitionName: morphName(slug), viewTransitionClass: "morph" } : null),
  } as CSSProperties;

  return (
    <div className={`frame frame--${variant}`} data-dark={isDark(tone) || undefined} style={style}>
      {cover ? (
        <motion.div
          className="frame__fill"
          initial={reveal ? { opacity: 0, scale: 1.06 } : false}
          whileInView={reveal ? { opacity: 1, scale: 1 } : undefined}
          viewport={inView}
          transition={{ duration: duration.slower, ease: ease.out }}
        >
          <Image
            src={cover.src}
            alt={cover.alt ?? `${name} — cover`}
            fill
            sizes={sizes}
            priority={priority}
            quality={90}
            draggable={false}
          />
          {video && (
            <video
              className="frame__video"
              src={video}
              poster={cover.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
          )}
        </motion.div>
      ) : (
        <div className="frame__ph" aria-hidden>
          <span className="frame__mono serif">{initials(name)}</span>
          <span className="label">Visuals forthcoming</span>
        </div>
      )}
    </div>
  );
}
