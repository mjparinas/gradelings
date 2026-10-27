// Counts the prerendered outputs of a finished build the way a Vercel deploy would carry them (unit pages' segment
// prefetch files left out, see deploy-outputs.mjs) and fails when it is over PRERENDER_BUDGET, so CI says so on
// the pull request that adds the pages instead of the deploy failing after merge.
import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { checkPrerenderBudget, PRERENDER_BUDGET, trimSegmentPrefetches } from "./deploy-outputs.mjs";

const root = process.argv[2] ?? ".next/server/app";

function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(html|rsc)$/.test(e.name)) yield p;
  }
}

const outputs = [...walk(root)].map((p) => ({ pathname: "/" + relative(root, p).split(sep).join("/") }));
const dropped = trimSegmentPrefetches(outputs);
const share = Math.round((outputs.length / PRERENDER_BUDGET) * 100);
console.log(`${outputs.length} prerendered outputs on deploy (${dropped} unit segment files left out); ${share}% of the ${PRERENDER_BUDGET} budget.`);
checkPrerenderBudget(outputs.length);
