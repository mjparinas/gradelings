#!/usr/bin/env node
// Writes the daily "What's new" entries (docs/WHATS_NEW.md) from the pull requests merged since the newest day in
// src/lib/whatsNew.ts. Run by .github/workflows/whats-new.yml; it replaced a Claude routine
// (docs/decisions/2026-11-08-whats-new-github-action.md).
//
//   node scripts/whats-new.mjs            # edit src/lib/whatsNew.ts when there is something to add
//   node scripts/whats-new.mjs --dry-run  # list the pull requests it would send, call nothing
//
// Needs GH_TOKEN (for the `gh` CLI) and ANTHROPIC_API_KEY. Writes `changed` and `days` to $GITHUB_OUTPUT.
// Only complete days (America/Vancouver) before today are written, so a late merge is never missed.
import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";

const FILE = "src/lib/whatsNew.ts";
const TZ = "America/Vancouver";
const MODEL = process.env.WHATS_NEW_MODEL || "claude-sonnet-5-5";
const dry = process.argv.includes("--dry-run");
const repo = process.env.GITHUB_REPOSITORY || "mjparinas/gradelings";

const dayOf = (d) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(d)); // YYYY-MM-DD
const out = (k, v) => process.env.GITHUB_OUTPUT && appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);
const gh = (...args) => JSON.parse(execFileSync("gh", ["api", ...args], { encoding: "utf8", maxBuffer: 64e6 }));

const source = readFileSync(FILE, "utf8");
const newest = /\n\s+day: "(\d{4}-\d{2}-\d{2})"/.exec(source)?.[1];
if (!newest) throw new Error(`No day found in ${FILE}`);
const today = dayOf(new Date());

// Pull requests merged into staging or main since the day before the newest one (the search takes UTC dates;
// we filter by Vancouver day below). Promotions and earlier What's new pull requests carry no news of their own.
const since = new Date(Date.parse(`${newest}T00:00:00Z`) - 2 * 864e5).toISOString().slice(0, 10);
const seen = new Map();
for (const base of ["staging", "main"]) {
  const pages = gh("--paginate", "--slurp", "-X", "GET", "search/issues", "-f", `q=repo:${repo} is:pr is:merged base:${base} merged:>=${since}`, "-f", "per_page=100");
  for (const item of pages.flatMap((p) => p.items)) seen.set(item.number, item);
}
const byDay = {};
for (const pr of seen.values()) {
  if (/^(Promote staging|Bring main back|What's new)/i.test(pr.title)) continue;
  const d = dayOf(pr.closed_at);
  if (d <= newest || d >= today) continue;
  (byDay[d] ||= []).push({ title: pr.title, body: (pr.body || "").replace(/<!--[\s\S]*?-->/g, "").slice(0, 1500) });
}
const days = Object.keys(byDay).sort().reverse();
if (!days.length) {
  console.log(`Nothing merged after ${newest} (before ${today}). Nothing to do.`);
  out("changed", "false");
  process.exit(0);
}
console.log(`Days to consider: ${days.join(", ")} (${days.reduce((n, d) => n + byDay[d].length, 0)} pull requests).`);
if (dry) {
  console.log(JSON.stringify(byDay, null, 2));
  process.exit(0);
}

const guide = readFileSync("docs/WHATS_NEW.md", "utf8");
const examples = source.slice(source.indexOf("export const WHATS_NEW"), source.indexOf('day: "', source.indexOf('day: "', source.indexOf("export const WHATS_NEW") + 1) + 1));
const prompt = `You write the daily "What's new" posts for Gradelings, shown to parents and teachers.

Follow this guide exactly:
${guide}

Extra rules: describe only what a family or class would notice. Leave out CI, tests, refactors, dependency bumps, admin-only changes, and anything behind a feature flag that is still off or described as off by default. If a security fix is the only change, use one neutral line at most. Never describe practice as a report-card mark. Use Canadian spelling. A kind is "new", "fixed" or "teachers". Titles are short; bodies are one to three plain sentences. Headlines name the two or three biggest things. Skip any day with nothing user-visible (leave it out of the result).

Here are the newest existing entries, for tone and shape:
${examples}

Pull requests merged on each day (title and description, America/Vancouver days):
${JSON.stringify(byDay, null, 2)}

Reply with only JSON: {"days":[{"day":"YYYY-MM-DD","headline":"...","items":[{"kind":"new|fixed|teachers","title":"...","body":"..."}]}]}, newest day first, using only these days: ${days.join(", ")}.`;

const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY ?? "", "anthropic-version": "2023-06-01" },
  body: JSON.stringify({ model: MODEL, max_tokens: 8000, messages: [{ role: "user", content: prompt }] }),
});
if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${(await res.text()).slice(0, 500)}`);
const text = (await res.json()).content.map((b) => b.text ?? "").join("");
const parsed = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));

const kinds = new Set(["new", "fixed", "teachers"]);
const written = (parsed.days ?? []).filter((d) => days.includes(d.day) && d.items?.length);
for (const d of written) {
  if (!d.headline || d.items.some((i) => !kinds.has(i.kind) || !i.title || !i.body)) throw new Error(`Bad entry for ${d.day}`);
}
written.sort((a, b) => b.day.localeCompare(a.day));
if (!written.length) {
  console.log("The model found nothing user-visible. Nothing to do.");
  out("changed", "false");
  process.exit(0);
}

const q = (s) => JSON.stringify(s);
const render = (d) =>
  `  {\n    day: ${q(d.day)},\n    headline: ${q(d.headline)},\n    items: [\n` +
  d.items.map((i) => `      {\n        kind: ${q(i.kind)},\n        title: ${q(i.title)},\n        body: ${q(i.body)},\n      },\n`).join("") +
  `    ],\n  },\n`;
const marker = "export const WHATS_NEW: NewsDay[] = [\n";
const at = source.indexOf(marker) + marker.length;
writeFileSync(FILE, source.slice(0, at) + written.map(render).join("") + source.slice(at));
out("changed", "true");
out("days", written.map((d) => d.day).join(", "));
console.log(`Added ${written.length} day(s): ${written.map((d) => d.day).join(", ")}.`);
