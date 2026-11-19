/**
 * Post-build fix-up for the static export (GitHub Pages).
 *
 * Next 16 writes segment-prefetch payloads as nested folders, e.g.
 *   out/work/aether/__next.work/$d$slug/__PAGE__.txt
 * while the client router requests the flat, dotted name:
 *   out/work/aether/__next.work.$d$slug.__PAGE__.txt
 * A plain static host has no rewrites, so those requests 404 and every
 * navigation degrades to a full page load (losing view transitions).
 * This copies each nested payload to its flat name; the nested files stay.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
if (!fs.existsSync(OUT)) process.exit(0);

let copied = 0;
const files = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? files(p) : [p];
  });

const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) {
      for (const f of files(p)) {
        const flat = path.join(dir, [e.name, ...path.relative(p, f).split(path.sep)].join("."));
        if (!fs.existsSync(flat)) {
          fs.copyFileSync(f, flat);
          copied++;
        }
      }
    } else if (e.name !== "_next") {
      walk(p);
    }
  }
};
walk(OUT);
console.log(`export: ${copied} prefetch payloads flattened`);
