"use client";

import { useEffect, useState, type MouseEvent } from "react";

type Theme = "light" | "dark";

/** Inline script for <head>: applies the saved/system theme before first paint. */
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? "light");
  }, []);

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      setTheme(next);
    };

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) return apply();

    // Circular reveal expanding from the button.
    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${r}px`);
    root.classList.add("theme-vt");
    const t = document.startViewTransition(apply);
    t.finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      type="button"
      className="theme"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title="Toggle theme"
    >
      <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden>
        <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
