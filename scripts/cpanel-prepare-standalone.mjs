/**
 * After `next build` with `output: "standalone"`, copy `public` and `.next/static`
 * into `.next/standalone` so `node server.js` serves assets correctly.
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js/output
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(root, ".next", "standalone");
const dotNext = join(root, ".next");

if (!existsSync(standalone)) {
  console.error(
    "[cpanel-prepare] Missing .next/standalone. Run `next build` (next.config must set output: \"standalone\").",
  );
  process.exit(1);
}

cpSync(join(root, "public"), join(standalone, "public"), { recursive: true });
mkdirSync(join(standalone, ".next"), { recursive: true });
cpSync(join(dotNext, "static"), join(standalone, ".next", "static"), { recursive: true });

console.log("[cpanel-prepare] Ready: .next/standalone/ (run: cd .next/standalone && node server.js)");
