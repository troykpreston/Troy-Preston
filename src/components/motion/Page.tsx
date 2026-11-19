import { ViewTransition, type ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";

/**
 * Every route renders inside <Page>. The wrapper maps the navigation type
 * (set by <TransitionLink>) to a CSS class — see styles/transitions.css.
 * Untyped navigations (browser back/forward) fall back to a soft root fade,
 * while shared-element morphs still play.
 */
const types = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  "nav-lateral": "nav-lateral",
  default: "none",
};

export function Page({ children, footer = true }: { children: ReactNode; footer?: boolean }) {
  return (
    <ViewTransition enter={types} exit={types} default="none">
      <div className="page">
        {children}
        {footer && <Footer />}
      </div>
    </ViewTransition>
  );
}
