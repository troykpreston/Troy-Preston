"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, type ReactNode } from "react";

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

  // New page → start at the top (Lenis otherwise keeps the old scroll position).
  // Anchor links (/#about) are left alone so they can scroll to their section.
  useLayoutEffect(() => {
    if (window.location.hash) return;
    lenisStore.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  // Page height changes on navigation; let Lenis re-measure.
  useEffect(() => {
    const id = requestAnimationFrame(() => lenisStore.current?.resize());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
