// Which server requests are timed in Sentry. Most pages are prerendered and cost nothing to look at, so
// only the API routes that matter for speed (sync, live questions, the class view, the daily job, the
// Stripe webhook) are sampled, and the busiest ones lightly. Everything not listed is not timed.

const RATES: [match: RegExp, rate: number][] = [
  [/\/api\/health\//, 0],
  [/\/api\/cron\//, 1],
  [/\/api\/billing\/webhook\//, 1],
  [/\/api\/sync\//, 0.1],
  // The kids' devices in a class poll this every 3 seconds, so a few percent is already a lot of data.
  [/\/api\/live\//, 0.02],
  [/\/api\/classes\//, 0.2],
  [/\/api\/admin\//, 0.2],
  [/\/api\//, 0.05],
];

/** The share of requests named `name` (for example "POST /api/sync/") to time, from 0 to 1. */
export function traceRate(name: string | undefined, scale = 1): number {
  if (!name) return 0;
  for (const [match, rate] of RATES) if (match.test(name)) return Math.min(1, rate * scale);
  return 0;
}

/** The SENTRY_TRACES_SCALE environment variable: 1 by default, 0 turns timing off, 2 doubles every rate. */
export function traceScale(value: string | undefined): number {
  if (value === undefined || value.trim() === "") return 1;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 1;
}
