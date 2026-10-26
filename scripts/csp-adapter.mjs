// A Next.js deployment adapter that wraps the platform's own (Vercel's, from NEXT_ADAPTER_PATH).
// The platform adapter copies prerendered pages into its deploy output inside `next build`, so
// scripts/csp-postbuild.mjs runs too late to reach them. This writes each page's
// Content-Security-Policy tag first, leaves out unit pages' segment prefetch files so the deploy stays
// under the platform's output limit (scripts/deploy-outputs.mjs), then hands the build to the platform adapter.
// next.config.ts only turns it on when a platform adapter is set.
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { writePolicyTags } from "./csp-pages.mjs";
import { checkPrerenderBudget, trimSegmentPrefetches } from "./deploy-outputs.mjs";

const innerPath = process.env.CSP_INNER_ADAPTER;
if (!innerPath) throw new Error("csp-adapter: CSP_INNER_ADAPTER is not set (see next.config.ts)");
const mod = await import(pathToFileURL(innerPath).href);
const inner = mod.default ?? mod;

/** @type {import("next").NextAdapter} */
const adapter = {
  ...inner,
  async onBuildComplete(ctx) {
    const count = writePolicyTags(ctx.distDir);
    if (!count) throw new Error("csp-adapter: found no prerendered pages to tag");
    // Keep the recorded shell size true to the file the platform will serve.
    for (const p of ctx.outputs.prerenders) {
      const file = p.fallback?.filePath;
      if (p.htmlSize !== undefined && file?.endsWith(".html")) p.htmlSize = fs.statSync(file).size;
    }
    console.log(`csp-adapter: wrote a Content-Security-Policy tag into ${count} pages`);
    const dropped = trimSegmentPrefetches(ctx.outputs.prerenders);
    console.log(`csp-adapter: left out ${dropped} unit-page segment files; ${ctx.outputs.prerenders.length} prerendered outputs remain`);
    checkPrerenderBudget(ctx.outputs.prerenders.length);
    return inner.onBuildComplete?.(ctx);
  },
};

export default adapter;
