#!/usr/bin/env node
/**
 * Stamps a diagonal repeating `flagsnepal.com` watermark across every product
 * and work image in `/public`. Originals are copied to an out-of-tree backup
 * folder first so the operation is reversible.
 *
 * Usage:
 *   node scripts/watermark-images.mjs            # dry run — lists what will change
 *   node scripts/watermark-images.mjs --apply    # actually writes
 *
 * Design notes:
 * - The watermark is rendered as an SVG tile (≈220×220 px) with rotated text
 *   at low opacity. `sharp.composite({ input, tile: true, blend: "over" })`
 *   repeats the tile to cover any image size.
 * - White text + soft dark shadow keeps the mark legible on both light and
 *   dark product backgrounds.
 * - The target image dimensions are preserved; only the pixel data changes.
 * - Skipped once: a file named `.watermarked` is written next to each output
 *   folder so re-running will not double-stamp.
 */

import { mkdir, readdir, copyFile, stat, writeFile, access } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

/**
 * Directories walked recursively. Every image file inside these gets
 * watermarked. Includes third-party client logos at the owner's direction —
 * see `docs/launch-security-checklist.md` §8 for the trademark caveat.
 */
const TARGET_DIRS = [
  path.join(repoRoot, "public", "products"),
  path.join(repoRoot, "public", "works"),
  path.join(repoRoot, "public", "client-logos"),
];

/**
 * Additional top-level images in `/public` that should also be watermarked.
 */
const TARGET_FILES = [
  path.join(repoRoot, "public", "hero-golden-pole-nepal-flag.jpg"),
  path.join(repoRoot, "public", "hero-golden-pole-nepal-flag.png"),
  path.join(repoRoot, "public", "flags-nepal-logo.png"),
  path.join(repoRoot, "public", "flags-nepal-logo-hero.png"),
  path.join(repoRoot, "public", "flags-nepal-logo-site.png"),
  path.join(repoRoot, "public", "flags-nepal-logo-white.png"),
];

const BACKUP_ROOT = path.join(repoRoot, ".image-originals-backup");
const APPLY = process.argv.includes("--apply");
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

/**
 * Tile geometry.
 *
 * - `TILE` is the square pixel dimension of one watermark cell.
 * - Larger tile  → more whitespace between marks, harder to remove but less
 *   defensive against cropping.
 * - Smaller tile → denser marks, more intrusive.
 *
 * 260px at 12% opacity is a calibrated middle-ground.
 */
const TILE = 260;
const TEXT = "flagsnepal.com";
const TEXT_OPACITY = 0.12;

/**
 * Render an SVG tile with rotated, softly-shadowed text. The text is drawn
 * twice so that the mark remains visible on both light and dark backgrounds:
 * a dark shadow layer behind a white body layer.
 */
function buildWatermarkSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}" viewBox="0 0 ${TILE} ${TILE}">
  <defs>
    <style>
      .m {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 2px;
      }
    </style>
  </defs>
  <g transform="rotate(-30 ${TILE / 2} ${TILE / 2})">
    <text x="${TILE / 2}" y="${TILE / 2 + 2}" text-anchor="middle" class="m" fill="rgba(0,0,0,${TEXT_OPACITY * 0.8})">${TEXT}</text>
    <text x="${TILE / 2}" y="${TILE / 2}" text-anchor="middle" class="m" fill="rgba(255,255,255,${TEXT_OPACITY})">${TEXT}</text>
  </g>
</svg>
`.trim();
}

async function walkImageFiles(root) {
  const results = [];
  async function recurse(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await recurse(full);
      } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
        results.push(full);
      }
    }
  }
  await recurse(root);
  return results;
}

async function fileExists(p) {
  try {
    await access(p, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function backupOnce(sourceFile) {
  const rel = path.relative(repoRoot, sourceFile);
  const backupPath = path.join(BACKUP_ROOT, rel);
  if (await fileExists(backupPath)) {
    return { skipped: true, backupPath };
  }
  await mkdir(path.dirname(backupPath), { recursive: true });
  await copyFile(sourceFile, backupPath);
  return { skipped: false, backupPath };
}

async function watermarkFile(file, tileSvg) {
  const meta = await sharp(file).metadata();
  const pipeline = sharp(file).composite([
    {
      input: Buffer.from(tileSvg),
      tile: true,
      blend: "over",
    },
  ]);

  if (meta.format === "jpeg") {
    await pipeline.jpeg({ quality: 86, mozjpeg: true }).toBuffer().then((buf) => writeFile(file, buf));
  } else if (meta.format === "webp") {
    await pipeline.webp({ quality: 88 }).toBuffer().then((buf) => writeFile(file, buf));
  } else {
    await pipeline.png({ compressionLevel: 9 }).toBuffer().then((buf) => writeFile(file, buf));
  }
}

async function main() {
  console.log(`\nWatermark pass${APPLY ? "" : " — DRY RUN (pass --apply to write)"}\n`);
  console.log(`Backup root: ${BACKUP_ROOT}`);
  console.log(`Tile:        ${TILE}px · text "${TEXT}" @ opacity ${TEXT_OPACITY}\n`);

  const tileSvg = buildWatermarkSvg();
  let total = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;

  async function processFile(file, groupLabel) {
    const before = (await stat(file)).size;
    bytesBefore += before;
    total += 1;

    if (!APPLY) {
      console.log(`  would watermark  ${path.relative(repoRoot, file)}  (${(before / 1024).toFixed(0)} KB)`);
      return;
    }

    const backup = await backupOnce(file);
    if (backup.skipped) {
      console.log(`  ·  ${path.relative(repoRoot, file)}  [backup already existed — skipping to avoid double-stamp; restore from backup first if you want to re-run]`);
      return;
    }
    await watermarkFile(file, tileSvg);
    const after = (await stat(file)).size;
    bytesAfter += after;
    const delta = after - before;
    const sign = delta >= 0 ? "+" : "";
    console.log(
      `  ✓  ${path.relative(repoRoot, file)}  (${(before / 1024).toFixed(0)} → ${(after / 1024).toFixed(0)} KB, ${sign}${(delta / 1024).toFixed(0)} KB)`,
    );
  }

  for (const dir of TARGET_DIRS) {
    if (!(await fileExists(dir))) {
      console.log(`(missing) ${dir} — skipping`);
      continue;
    }
    const files = await walkImageFiles(dir);
    console.log(`\n${path.relative(repoRoot, dir)}  (${files.length} file${files.length === 1 ? "" : "s"})`);
    for (const file of files) {
      await processFile(file);
    }
  }

  const existingTopLevel = [];
  for (const file of TARGET_FILES) {
    if (await fileExists(file)) existingTopLevel.push(file);
  }
  if (existingTopLevel.length) {
    console.log(`\ntop-level /public images  (${existingTopLevel.length} file${existingTopLevel.length === 1 ? "" : "s"})`);
    for (const file of existingTopLevel) {
      await processFile(file);
    }
  }

  console.log(
    `\nProcessed ${total} file${total === 1 ? "" : "s"}${
      APPLY
        ? ` · ${(bytesBefore / 1024 / 1024).toFixed(2)} MB → ${(bytesAfter / 1024 / 1024).toFixed(2)} MB`
        : ""
    }`,
  );
  if (!APPLY) {
    console.log(`\nRe-run with --apply to write the watermarks.\n`);
  } else {
    console.log(`\nOriginals are in ${BACKUP_ROOT} — commit-safe to delete later.\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
