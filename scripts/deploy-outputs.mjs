// Keeps the number of prerendered outputs a Vercel deploy has to take under the limit.
//
// Every prerendered App Router page becomes five outputs: the HTML, its .rsc and three
// per-segment prefetch files (`.segments/_tree`, `_full` and `__PAGE__`). Vercel turns each output
// into three files, and its "Deploying outputs" step fails with "Maximum call stack size exceeded"
// somewhere between about 165,000 outputs (Iowa's build, deployed) and 172,000 (Mississippi's, failed),
// in October 2026. Unit pages are about three quarters of the site, so their segment files go.
// Vercel's routing serves a missing segment file from the page's .rsc (the fallback route in its
// Next.js adapter), and the client router reads that as a whole-page prefetch, so links to unit
// pages still prefetch and navigate; the HTML and .rsc stay prerendered with their CSP tags.

/** A unit page's per-segment prefetch file: /curriculum/{framework}/{grade}/{subject}/{unit}.segments/... */
const UNIT_SEGMENT = /^\/curriculum\/[^/]+\/[^/]+\/[^/]+\/[^/]+\.segments\//;

/**
 * Prerendered outputs a deploy may carry. Well under the failing count, so the build stops with a
 * clear message here instead of the platform's stack overflow after the upload starts.
 */
export const PRERENDER_BUDGET = 150_000;

/** Drops unit pages' segment prefetch files from `prerenders` in place and returns how many went. */
export function trimSegmentPrefetches(prerenders) {
  let kept = 0;
  for (let i = 0; i < prerenders.length; i++) {
    if (!UNIT_SEGMENT.test(prerenders[i].pathname)) prerenders[kept++] = prerenders[i];
  }
  const dropped = prerenders.length - kept;
  prerenders.length = kept;
  return dropped;
}

/** Throws when a build has more prerendered outputs than a deploy can take. */
export function checkPrerenderBudget(count, budget = PRERENDER_BUDGET) {
  if (count > budget) {
    throw new Error(
      `deploy-outputs: ${count} prerendered outputs is over the budget of ${budget}. ` +
        "Vercel's deploy step fails a little above this; see scripts/deploy-outputs.mjs for what to trim.",
    );
  }
}
