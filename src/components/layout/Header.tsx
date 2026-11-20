"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { lenisStore } from "@/components/motion/SmoothScroll";
import { linkedin, site } from "@/content/site";
import { duration, ease, spring, stagger } from "@/lib/motion";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/work", label: "Work", match: (p: string) => p.startsWith("/work") },
  { href: "/#about", label: "About", match: () => false },
  { href: "/#contact", label: "Contact", match: () => false },
];

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (open) return;
    if (y > 240 && y > prev + 4) setHidden(true);
    else if (y < prev - 4 || y < 240) setHidden(false);
  });

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    if (open) lenisStore.current?.stop();
    else lenisStore.current?.start();
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className="hdr"
        data-hidden={hidden || undefined}
        data-scrolled={scrolled || undefined}
        data-open={open || undefined}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="hdr__inner container">
          <TransitionLink href="/" className="hdr__mark" aria-label={`${site.name} — home`}>
            <span className="serif">{site.wordmark}</span>
            <span className="label hdr__role">{site.role}</span>
          </TransitionLink>

          <nav className="hdr__nav" aria-label="Primary">
            {nav.map((item) => {
              const active = item.match(pathname);
              return (
                <TransitionLink key={item.href} href={item.href} className="hdr__link" aria-current={active ? "page" : undefined}>
                  {active && <motion.span layoutId="nav-dot" className="hdr__dot" transition={spring.ui} />}
                  <span className="u">{item.label}</span>
                </TransitionLink>
              );
            })}
          </nav>

          <div className="hdr__aside">
            <ThemeToggle />
            <button
              type="button"
              className="hdr__menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className="hdr__burger" aria-hidden>
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: duration.base + 0.1, ease: ease.inOut }}
          >
            <nav className="menu__nav container" aria-label="Mobile">
              {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                <div className="line" key={item.href}>
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-110%" }}
                    transition={{ duration: duration.base + 0.2, ease: ease.out, delay: 0.18 + i * stagger.base }}
                  >
                    <TransitionLink href={item.href} className="menu__link" onClick={() => setOpen(false)}>
                      <span className="label">0{i + 1}</span>
                      {item.label}
                    </TransitionLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="menu__foot container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <a href={`mailto:${site.email}`} className="u">
                {site.email}
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="u">
                LinkedIn ↗
              </a>
              {site.availability && (
                <span className="label menu__status">
                  <i className="dot" /> {site.availability}
                </span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
