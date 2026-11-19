import type { NextConfig } from "next";

/**
 * Production builds are a static export for GitHub Pages, served from
 * https://troykpreston.github.io/Troy-Preston — hence the base path.
 * `next dev` keeps serving from the root. Set NEXT_PUBLIC_BASE_PATH="" to
 * build for a custom domain at the root instead.
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/Troy-Preston" : "");

const config: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  devIndicators: false,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // No image server on static hosting: media is pre-optimized to WebP by scripts/sync-assets.mjs.
    unoptimized: true,
  },
};

export default config;
