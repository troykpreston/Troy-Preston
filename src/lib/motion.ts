/**
 * Motion tokens — the single source of truth for how the site moves.
 * Mirrored as CSS custom properties in styles/tokens.css (--ease-*, --dur-*).
 * Change the feel of the whole site here.
 */
export const ease = {
  /** Long, confident deceleration. Default for reveals. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Symmetric, for things that move from A to B. */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Quick exit. */
  in: [0.5, 0, 0.75, 0] as const,
};

export const duration = {
  fast: 0.24,
  base: 0.55,
  slow: 0.85,
  slower: 1.1,
};

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.1,
};

export const spring = {
  /** Cursor-follow preview. */
  follow: { stiffness: 220, damping: 28, mass: 0.6 },
  /** UI responses — toggles, indicators. */
  ui: { type: "spring" as const, stiffness: 420, damping: 38 },
};

/** Viewport options for whileInView reveals. */
export const inView = { once: true, margin: "0px 0px -12% 0px" } as const;
