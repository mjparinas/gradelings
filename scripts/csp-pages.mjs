// Writes each prerendered page's Content-Security-Policy <meta> tag. Shared by the post-build
// script and the build adapter (scripts/csp-adapter.mjs). See src/lib/csp.mjs. It also sets each
// page's <html lang> from its Open Graph locale (src/lib/pageLang.mjs), so US pages say en-US, and points
// share images at their trailing-slash address so link previews need no redirect (src/lib/ogUrls.mjs).
import fs from "node:fs";
import path from "node:path";
import { addPolicyMeta } from "../src/lib/csp.mjs";
import { setPageLang } from "../src/lib/pageLang.mjs";
import { slashImageUrls } from "../src/lib/ogUrls.mjs";

function* htmlFiles(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

/**
 * Adds the tag to every prerendered page under `<distDir>/server`: `app/` and `pages/` in a plain
 * build, `route-cache/` when a deployment adapter is set. Safe to run twice. Returns the count.
 */
export function writePolicyTags(distDir = ".next") {
  const server = path.join(distDir, "server");
  if (!fs.existsSync(server)) return 0;
  let count = 0;
  for (const file of htmlFiles(server)) {
    fs.writeFileSync(file, addPolicyMeta(slashImageUrls(setPageLang(fs.readFileSync(file, "utf8")))));
    count++;
  }
  return count;
}
