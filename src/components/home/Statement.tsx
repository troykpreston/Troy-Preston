"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/** Paragraph whose words resolve from faint to full ink as it scrolls through the viewport. */
export function Statement({ text, label }: { text: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <section className="statement container" aria-label={label}>
      <span className="label statement__label">{label}</span>
      <p ref={ref} className="statement__text">
        <span className="sr-only">{text}</span>
        <span aria-hidden>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </span>
      </p>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}
