/* ==========================================================================
   Static server + password gate
   Serves the Vite build in dist/ and, when SITE_PASSWORD is set, requires
   HTTP Basic Auth before serving anything. The password lives only in the
   SITE_PASSWORD environment variable — set in hPanel's Environment
   variables panel, never written to a file in this repo. Leaving it unset
   disables the gate, so a fresh deploy or a forgotten env var never
   accidentally locks everyone out.

   Written against Node's built-ins only (no Express) to avoid adding a
   dependency just for this. Run `npm run build` first — this only serves
   the already-built dist/ directory, it doesn't build it.
   ========================================================================== */

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST_DIR = join(__dirname, "dist");
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.SITE_PASSWORD;
const REALM = "Smart Theory System";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function suppliedPassword(authHeader) {
  if (!authHeader?.startsWith("Basic ")) return null;
  let decoded;
  try {
    decoded = Buffer.from(authHeader.slice("Basic ".length), "base64").toString("utf8");
  } catch {
    return null;
  }
  // Basic Auth sends "username:password" — the username is ignored, only
  // the password after the first colon matters.
  const separator = decoded.indexOf(":");
  return separator === -1 ? decoded : decoded.slice(separator + 1);
}

function authorized(req) {
  if (!PASSWORD) return true;
  return suppliedPassword(req.headers.authorization) === PASSWORD;
}

async function readDistFile(relativePath) {
  // Strip any ".." segments so a request can't escape dist/.
  const safePath = normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  return readFile(join(DIST_DIR, safePath));
}

createServer(async (req, res) => {
  if (!authorized(req)) {
    res.writeHead(401, {
      "WWW-Authenticate": `Basic realm="${REALM}"`,
      "Content-Type": "text/plain; charset=utf-8",
      // Without this, a browser or intermediary that already has a cached
      // 200 for this URL (e.g. from before SITE_PASSWORD was set) could
      // serve that stale copy instead of ever reaching this check again.
      "Cache-Control": "no-store",
    });
    res.end("Authentication required.");
    return;
  }

  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const requestedPath = pathname === "/" ? "/index.html" : pathname;

  try {
    const data = await readDistFile(requestedPath);
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[extname(requestedPath)] || "application/octet-stream",
    });
    res.end(data);
  } catch {
    // No file at that path — this is a single-page app, so fall back to
    // index.html rather than 404ing on a client-side route.
    try {
      const data = await readDistFile("/index.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found — did you run `npm run build` first?");
    }
  }
}).listen(PORT, () => {
  console.log(`Serving dist/ on port ${PORT}${PASSWORD ? " (password-protected)" : ""}`);
});
