/**
 * Entry for hosts (e.g. cPanel "Setup Node.js App") that expect a startup file
 * next to package.json. The real server is generated at
 * `.next/standalone/server.js` by `npm run build:cpanel` (not stored in git).
 */
const fs = require("fs");
const path = require("path");

const standaloneServer = path.join(
  __dirname,
  ".next",
  "standalone",
  "server.js",
);

if (!fs.existsSync(standaloneServer)) {
  console.error(
    "[flags-nepal] Standalone build missing. Run on the server:\n" +
      "  npm ci && npm run build:cpanel\n" +
      "Expected:\n  " +
      standaloneServer,
  );
  process.exit(1);
}

require(standaloneServer);
