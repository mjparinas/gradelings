// On Vercel (or when STAMP_SW=1), rewrite public/sw.js's CACHE_BUILD_ID so each
// deploy installs a new service worker and drops the previous app cache. Local
// builds skip this so the working tree stays clean.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const onVercel = process.env.VERCEL === "1";
if (!onVercel && process.env.STAMP_SW !== "1") {
  console.log("stamp-sw: skipped (set STAMP_SW=1 to force)");
  process.exit(0);
}

const id = (
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.NEXT_DEPLOYMENT_ID ||
  `build-${Date.now().toString(36)}`
).slice(0, 12);

const swPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "sw.js");
const src = fs.readFileSync(swPath, "utf8");
const next = src.replace(/const CACHE_BUILD_ID = "[^"]*";/, `const CACHE_BUILD_ID = "${id}";`);
if (next === src) throw new Error('stamp-sw: expected `const CACHE_BUILD_ID = "...";` in public/sw.js');
fs.writeFileSync(swPath, next);
console.log(`stamp-sw: CACHE_BUILD_ID=${id}`);
