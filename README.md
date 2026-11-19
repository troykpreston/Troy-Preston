# Troy-Preston

Next.js 16 (App Router) · React 19.3 `<ViewTransition>` · Motion · Lenis. No CSS framework — a small token-based design system in `src/styles`.

```bash
npm install
npm run dev      # http://localhost:3000  (syncs _assets first)
npm run build && npm start
```

> Builds use webpack (`--webpack`): Turbopack segfaults on Node 25. On Node 22/24 LTS you can drop the flag.

## Editing content

| What | Where |
| --- | --- |
| Name, headline, email, location, timezone, bio, experience | `src/content/site.ts` |
| Practice areas (each links to real projects) | `capabilities` in `src/content/site.ts` |
| Projects, case-study sections, cover image, tone | `src/content/projects.ts` |
| Screenshots | drop into `_assets/<Project Folder>/`, then `npm run assets` and commit `public/media` |

- Anything left `null` renders as a quiet **“To be written”** placeholder — never invented.
- Case-study sections are typed blocks: `text`, `list`, `flow` (numbered pipeline), `specs` (key/value), `quote`. Add a type in `projects.ts` and render it in `src/components/case/Blocks.tsx`.
- Files named `00*`, `cover*` or `Screenshot *` are treated as marketing composites and hidden; use `cover` / `exclude` per project to override.
- `_assets/` and `_docs/` are private and git-ignored. `npm run assets` converts them into optimized WebP (max 2560px) in `public/media`, which is committed — so fresh clones and deploys build without the source library. Videos over 12 MB are skipped.

## Motion system

All timing lives in two mirrored places: `src/lib/motion.ts` (JS) and the `--ease-*` / `--dur-*` tokens in `src/styles/tokens.css`.

- **Smart page transitions** — `<TransitionLink>` compares route depth and tags each navigation `nav-forward`, `nav-back` or `nav-lateral`; `src/styles/transitions.css` maps each to its own motion. The header stays anchored.
- **Shared-element morph** — project media carries `view-transition-name: media-<slug>`; the homepage card, the grid card, the list hover-preview and the “Next case” image all grow into the case-study hero.
- **Reveals** — masked line reveals (`<Lines>`), fade-rise (`<Reveal>`), drawn hairlines (`<Rule>`), scroll-lit statement, parallax brand band.
- **Theme switch** — circular reveal from the toggle via the View Transitions API.
- `prefers-reduced-motion` removes movement everywhere (Motion `reducedMotion="user"`, CSS overrides, Lenis disabled).
