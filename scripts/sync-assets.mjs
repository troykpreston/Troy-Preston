/**
 * Builds the site's media from the private /_assets library.
 *
 *   _assets/<Project Folder>/<file>.png  ->  public/media/<project-folder>/<file>.webp
 *   _assets/<file>.png (root files)       ->  public/media/brand/<file>.webp
 *
 * Images are resized to at most 2560px wide and saved as high-quality WebP;
 * videos under 12 MB are copied as-is. A manifest with dimensions is written
 * to src/content/media.generated.json for next/image.
 *
 * /_assets is git-ignored; /public/media and the manifest are committed.
 * Without /_assets (fresh clone, CI, Vercel) this script leaves the committed
 * media untouched, so builds work everywhere.
 *
 * Run `npm run assets` after adding files (it also runs before `dev` and `build`).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "_assets");
const OUT = path.join(ROOT, "public", "media");
const MANIFEST = path.join(ROOT, "src", "content", "media.generated.json");
const IMAGE = /\.(png|jpe?g|webp|avif)$/i;
const VIDEO = /\.(mp4|webm)$/i;
const MAX_VIDEO_MB = 12;
const MAX_WIDTH = 2560;
const QUALITY = 84;

if (!fs.existsSync(SRC)) {
  console.log("assets: no _assets folder — using committed public/media");
  process.exit(0);
}

const slugify = (s) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\(([^)]*)\)/g, " $1 ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const caption = (file) => {
  const base = file.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
  return base ? base.charAt(0).toUpperCase() + base.slice(1) : "";
};

const fresh = (from, to) => fs.existsSync(to) && fs.statSync(to).mtimeMs >= fs.statSync(from).mtimeMs;

const written = new Set();
let converted = 0;

async function collect(dir, outSlug) {
  const items = [];
  const files = fs.readdirSync(dir).sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  for (const file of files) {
    const full = path.join(dir, file);
    if (!fs.statSync(full).isFile()) continue;
    const base = slugify(file.replace(/\.[^.]+$/, ""));

    if (IMAGE.test(file)) {
      const dest = path.join(OUT, outSlug, `${base}.webp`);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      if (!fresh(full, dest)) {
        await sharp(full)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .webp({ quality: QUALITY, effort: 5, smartSubsample: true })
          .toFile(dest);
        converted++;
      }
      const { width, height } = await sharp(dest).metadata();
      written.add(dest);
      items.push({ file, src: `/media/${outSlug}/${base}.webp`, kind: "image", caption: caption(file), width, height });
    } else if (VIDEO.test(file)) {
      const mb = fs.statSync(full).size / 1024 / 1024;
      if (mb > MAX_VIDEO_MB) continue; // raw recordings stay local
      const ext = path.extname(file).toLowerCase();
      const dest = path.join(OUT, outSlug, `${base}${ext}`);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      if (!fresh(full, dest)) {
        fs.copyFileSync(full, dest);
        converted++;
      }
      written.add(dest);
      items.push({ file, src: `/media/${outSlug}/${base}${ext}`, kind: "video", caption: caption(file) });
    }
  }
  return items;
}

const manifest = { __brand: await collect(SRC, "brand") };
for (const dir of fs.readdirSync(SRC)) {
  const full = path.join(SRC, dir);
  // Folders starting with "_" (e.g. _assets/_archive) are ignored.
  if (fs.statSync(full).isDirectory() && !dir.startsWith("_")) manifest[dir] = await collect(full, slugify(dir));
}

// Remove media that no longer has a source (only inside public/media).
let removed = 0;
const prune = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      prune(p);
      if (!fs.readdirSync(p).length) fs.rmdirSync(p);
    } else if (!written.has(p)) {
      fs.unlinkSync(p);
      removed++;
    }
  }
};
prune(OUT);

fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
const total = Object.values(manifest).reduce((n, list) => n + list.length, 0);
console.log(`assets: ${total} files · ${converted} processed · ${removed} stale removed`);
