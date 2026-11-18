// The production dependency audit gate: fails on high or critical advisories, except the ones listed in
// ALLOWED, each with a reason and a day it stops being allowed (so an exception can't be forgotten).
// Usage: node scripts/audit-gate.mjs   (reads `npm audit --omit=dev --json`)
import { spawnSync } from "node:child_process";

export const ALLOWED = {
  // picomatch ReDoS (<=4.0.7) reached through @sentry/nextjs's build tooling; no patched release exists yet
  // (owner's decision, November 18, 2026). Remove once a fixed picomatch ships.
  "GHSA-fc5q-39xc-vjpf": { until: "2026-12-18", why: "no patched picomatch release yet" },
};

/** Advisory ids at high or critical severity in an `npm audit --json` report that aren't allowed on `today`. */
export function blocking(report, today = new Date().toISOString().slice(0, 10)) {
  const found = new Map();
  for (const v of Object.values(report.vulnerabilities ?? {})) {
    for (const via of v.via ?? []) {
      if (typeof via !== "object" || !["high", "critical"].includes(via.severity)) continue;
      const id = String(via.url ?? "").split("/").pop();
      const allow = ALLOWED[id];
      if (!allow || allow.until < today) found.set(id || via.title, via.title);
    }
  }
  return [...found].map(([id, title]) => `${id}: ${title}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = spawnSync("npm", ["audit", "--omit=dev", "--json"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const bad = blocking(JSON.parse(r.stdout || "{}"));
  if (bad.length) {
    console.error(`High or critical advisories in production dependencies:\n- ${bad.join("\n- ")}`);
    process.exit(1);
  }
  console.log("No blocking advisories in production dependencies.");
}
