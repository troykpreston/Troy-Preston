/** Base path the site is served under ("" locally, "/Troy-Preston" on GitHub Pages). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative public asset path (next/image and <video> don't add the base path themselves). */
export const withBase = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);
