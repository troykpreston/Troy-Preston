"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/** Shared handle so other components can pause or drive the scroller. */
export const lenisStore: { current: Lenis | null } = { current: null };

export function scrollToTarget(target: string | number) {
  const lenis = lenisStore.current;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2, easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), offset: 0 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    // Lenis leaves touch scrolling native by default — only wheel/trackpad is smoothed.
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 0.9 });
    lenisStore.current = lenis;
    return () => {
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  // Page height changes on navigation; let Lenis re-measure.
  useEffect(() => {
    const id = requestAnimationFrame(() => lenisStore.current?.resize());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
