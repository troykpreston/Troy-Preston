"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { duration, ease, inView, stagger } from "@/lib/motion";

/** Turns "*word*" into an italic serif accent. */
export function withEm(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
  );
}

type LinesProps = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  /** "mount" animates immediately (hero); "view" waits until scrolled into view. */
  trigger?: "mount" | "view";
};

/** Masked, line-by-line text reveal. */
export function Lines({ lines, as = "h2", className, delay = 0, trigger = "view" }: LinesProps) {
  const Tag = motion[as];
  const play = trigger === "mount" ? { animate: "shown" } : { whileInView: "shown", viewport: inView };
  return (
    <Tag className={className} initial="hidden" {...play}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <motion.span
            variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
            transition={{ duration: duration.slower, ease: ease.expo, delay: delay + i * stagger.loose }}
          >
            {withEm(line)}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "section" | "li" | "span" | "header" | "figure";
  trigger?: "mount" | "view";
};

/** Fade + rise. The workhorse for secondary content. */
export function Reveal({ children, className, delay = 0, y = 14, as = "div", trigger = "view" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const shown = reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" };
  const play = trigger === "mount" ? { animate: shown } : { whileInView: shown, viewport: inView };
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      {...play}
      transition={reduce ? { duration: 0.3, ease: "linear", delay } : { duration: duration.slow, ease: ease.expo, delay }}
    >
      {children}
    </Tag>
  );
}

/** A hairline that draws from the left. */
export function Rule({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      className={`rule ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={inView}
      transition={{ duration: duration.slower, ease: ease.expo, delay }}
    />
  );
}
