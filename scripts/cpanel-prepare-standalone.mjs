/**
 * Fold a fresh production `.next` output into `.next/standalone/` for cPanel.
 *
 * Does four things Next’s tracer alone sometimes gets wrong or leaves stale:
 * 1. Replaces `standalone/public` and `standalone/.next/static` entirely (no mixed BUILD_ID dirs).
 * 2. Copies the full `.next/server` tree (includes `pages/_error.js`).
 * 3. Overwrites top-level `.next/*.json` + `BUILD_ID` from the root build (adds things like `images-manifest.json`).
 * 4. Drops `standalone/.env` so secrets are not bundled.
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js/output
 */
import {
  cpSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  unlinkSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(root, ".next", "standalone");
const dotNext = join(root, ".next");
const rootServer = join(dotNext, "server");
const rootStatic = join(dotNext, "static");
const rootPublic = join(root, "public");

if (!existsSync(standalone)) {
  console.error(
    "[cpanel-prepare] Missing .next/standalone. Run `next build` with output: \"standalone\".",
  );
  process.exit(1);
}

if (!existsSync(rootServer) || !existsSync(rootStatic)) {
  console.error("[cpanel-prepare] Missing .next/server or .next/static. Run `next build` first.");
  process.exit(1);
}

const standaloneNext = join(standalone, ".next");

/** Matches the root `.next` tree the runtime expects beside `server/` + `static/`. */
const rootNextTrackedFiles = [
  "BUILD_ID",
  "app-build-manifest.json",
  "app-path-routes-manifest.json",
  "build-manifest.json",
  "export-marker.json",
  "images-manifest.json",
  "package.json",
  "prerender-manifest.json",
  "react-loadable-manifest.json",
  "required-server-files.json",
  "routes-manifest.json",
];

mkdirSync(standaloneNext, { recursive: true });

for (const name of rootNextTrackedFiles) {
  const src = join(dotNext, name);
  if (!existsSync(src)) continue;
  copyFileSync(src, join(standaloneNext, name));
}

const pubDest = join(standalone, "public");
rmSync(pubDest, { recursive: true, force: true });
if (existsSync(rootPublic)) {
  cpSync(rootPublic, pubDest, { recursive: true });
} else {
  mkdirSync(pubDest, { recursive: true });
}

const staticDest = join(standaloneNext, "static");
rmSync(staticDest, { recursive: true, force: true });
mkdirSync(staticDest, { recursive: true });
cpSync(rootStatic, staticDest, { recursive: true });

const standaloneServerDir = join(standaloneNext, "server");
rmSync(standaloneServerDir, { recursive: true, force: true });
mkdirSync(standaloneServerDir, { recursive: true });
cpSync(rootServer, standaloneServerDir, { recursive: true });

const pagesError = join(standaloneServerDir, "pages", "_error.js");
if (!existsSync(pagesError)) {
  console.error(
    "[cpanel-prepare] Missing:",
    pagesError,
    "\nCopy of .next/server into standalone failed or build is incomplete.",
  );
  process.exit(1);
}

/** At least one client chunk folder (BUILD_ID/manifest stubs) expected. */
let staticEntries = [];
try {
  staticEntries = readdirSync(staticDest);
} catch {
  staticEntries = [];
}
if (staticEntries.length === 0) {
  console.error("[cpanel-prepare] standalone/.next/static is empty — client assets missing.");
  process.exit(1);
}

const standaloneEnv = join(standalone, ".env");
if (existsSync(standaloneEnv)) {
  unlinkSync(standaloneEnv);
  console.log("[cpanel-prepare] Removed standalone/.env (set env in cPanel / process env).");
}

console.log("[cpanel-prepare] Ready: standalone has public/, .next/static, full .next/server, manifests + BUILD_ID.");
