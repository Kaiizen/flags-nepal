/**
 * After `next build` with `output: "standalone"`, fold the full production
 * `.next/server` tree plus `public` and `.next/static` into `.next/standalone`.
 *
 * Next’s file tracer sometimes omits files the runtime still resolves (e.g.
 * `server/pages/_error.js`). Merging the complete `server/` output avoids a
 * broken Node server on self‑hosted / cPanel.
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js/output
 */
import { cpSync, existsSync, mkdirSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(root, ".next", "standalone");
const dotNext = join(root, ".next");
const rootServer = join(dotNext, "server");
const rootStatic = join(dotNext, "static");

if (!existsSync(standalone)) {
  console.error(
    "[cpanel-prepare] Missing .next/standalone. Run `next build` (next.config must set output: \"standalone\").",
  );
  process.exit(1);
}

if (!existsSync(rootServer)) {
  console.error("[cpanel-prepare] Missing .next/server. Run `next build` first.");
  process.exit(1);
}

if (!existsSync(rootStatic)) {
  console.error("[cpanel-prepare] Missing .next/static. Run `next build` first.");
  process.exit(1);
}

mkdirSync(join(standalone, ".next"), { recursive: true });

cpSync(join(root, "public"), join(standalone, "public"), { recursive: true });
cpSync(rootStatic, join(standalone, ".next", "static"), { recursive: true });

/** Full server bundle (pages/_error.js, app/, chunks/, …) over standalone trace. */
cpSync(rootServer, join(standalone, ".next", "server"), { recursive: true });

const standaloneEnv = join(standalone, ".env");
if (existsSync(standaloneEnv)) {
  unlinkSync(standaloneEnv);
  console.log("[cpanel-prepare] Removed .env from standalone (configure env on the host).");
}

console.log("[cpanel-prepare] Ready: .next/standalone/ (run: cd .next/standalone && node server.js)");
