#!/usr/bin/env node
/**
 * Builds catalogue images for the "Flag Fabric Range" product: downloads
 * fabric-focused stock shots, composites a centered Flags Nepal logo watermark,
 * and writes JPEGs under public/products/flag-fabric-range/.
 *
 *   node scripts/generate-flag-fabric-range.mjs
 *
 * Requires network. Uses sharp (project devDependency).
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const OUT_DIR = path.join(repoRoot, "public", "products", "flag-fabric-range");
const LOGO_PATH = path.join(repoRoot, "public", "flags-nepal-logo-white.png");

/** Fabric-oriented Unsplash assets (JPEG, ~1400px wide). */
const SOURCES = [
  {
    out: "fabric-rolls.jpg",
    url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=85",
    desc: "textile rolls and colour range",
  },
  {
    out: "fabric-texture.jpg",
    url: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1400&q=85",
    desc: "woven fabric macro",
  },
];

const TARGET_WIDTH = 1400;
const LOGO_WIDTH = 300;
/** Global alpha multiplier for the watermark (0–1). */
const LOGO_ALPHA_MULTIPLIER = 0.58;

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function buildFadedLogoPng(widthPx) {
  const { data, info } = await sharp(LOGO_PATH)
    .resize({ width: widthPx })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(data);
  for (let i = 3; i < px.length; i += 4) {
    px[i] = Math.round(px[i] * LOGO_ALPHA_MULTIPLIER);
  }

  return sharp(px, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();
}

async function buildFabricThumb(jpegBuf, logoBuf) {
  const resizedBuffer = await sharp(jpegBuf)
    .rotate()
    .resize({ width: TARGET_WIDTH, withoutEnlargement: false })
    .toBuffer();

  const meta = await sharp(resizedBuffer).metadata();
  const w = meta.width ?? TARGET_WIDTH;
  const h = meta.height ?? TARGET_WIDTH;

  const darken = await sharp({
    create: {
      width: w,
      height: h,
      channels: 4,
      background: { r: 12, g: 12, b: 14, alpha: 0.26 },
    },
  })
    .png()
    .toBuffer();

  return sharp(resizedBuffer)
    .composite([
      { input: darken, blend: "over" },
      { input: logoBuf, gravity: "centre", blend: "over" },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const logoBuf = await buildFadedLogoPng(LOGO_WIDTH);

  for (const { out, url, desc } of SOURCES) {
    process.stderr.write(`Fetching ${desc}…\n`);
    const jpeg = await fetchBuffer(url);
    const outPath = path.join(OUT_DIR, out);
    const thumb = await buildFabricThumb(jpeg, logoBuf);
    await writeFile(outPath, thumb);
    process.stderr.write(`Wrote ${path.relative(repoRoot, outPath)}\n`);
  }

  console.log("\nDone. Update lib/products.ts flag-fabric-range images if filenames change.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
