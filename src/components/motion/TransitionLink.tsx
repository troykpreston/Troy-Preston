"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { scrollToTarget } from "./SmoothScroll";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

const depth = (path: string) => path.split("/").filter(Boolean).length;

/**
 * A <Link> that knows which way it's going.
 *
 * Compares route depth with the current page and tags the navigation so the
 * page transition matches the user's mental model:
 *   deeper  → "nav-forward"   shallower → "nav-back"   same depth → "nav-lateral"
 * Same-page anchors scroll smoothly instead of navigating.
 */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const [beforeHash, hash] = href.split("#");
  const target = beforeHash.split("?")[0] || pathname;
  const samePage = target === pathname;

  let transitionTypes: string[] | undefined;
  if (!samePage) {
    const d = depth(target) - depth(pathname);
    transitionTypes = [d > 0 ? "nav-forward" : d < 0 ? "nav-back" : "nav-lateral"];
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (samePage) {
      e.preventDefault();
      scrollToTarget(hash ? `#${hash}` : 0);
      history.replaceState(null, "", hash ? `#${hash}` : pathname);
    }
  };

  return <Link href={href} transitionTypes={transitionTypes} onClick={handleClick} {...rest} />;
}
