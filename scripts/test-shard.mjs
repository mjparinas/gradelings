// Runs one machine's share of the unit tests in CI:
//
//   node scripts/test-shard.mjs 2/4 [vitest options]
//
// Vitest's own --shard deals files out by hash, which can put the slowest files on one machine.
// This hands them out heaviest first to the machine with the least work so far (weights in
// scripts/test-weights.json; a file not listed counts as 1), so the machines finish together.
// `node scripts/test-shard.mjs --plan 4` only prints the split.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const planOnly = args[0] === "--plan";
const [index, count] = (planOnly ? `1/${args[1]}` : args[0] ?? "").split("/").map(Number);
const rest = args.slice(planOnly ? 2 : 1);
if (!Number.isInteger(index) || !Number.isInteger(count) || index < 1 || index > count) {
  console.error("Usage: node scripts/test-shard.mjs <index>/<count> [vitest options]");
  process.exit(2);
}

const weights = JSON.parse(readFileSync(new URL("./test-weights.json", import.meta.url), "utf8"));
const files = execFileSync("npx", ["vitest", "list", "--filesOnly"], { encoding: "utf8", maxBuffer: 1 << 26 })
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => /\.test\.tsx?$/.test(l));
const weight = (f) => (typeof weights[f] === "number" ? weights[f] : 1);

const shards = Array.from({ length: count }, () => ({ load: 0, files: [] }));
for (const f of [...files].sort((a, b) => weight(b) - weight(a) || a.localeCompare(b))) {
  const lightest = shards.reduce((m, s) => (s.load < m.load ? s : m));
  lightest.files.push(f);
  lightest.load += weight(f);
}

if (planOnly) {
  shards.forEach((s, i) => console.log(`shard ${i + 1}/${count}: ${s.files.length} files, weight ${s.load}`));
  process.exit(0);
}
const mine = shards[index - 1];
console.log(`Shard ${index}/${count}: ${mine.files.length} of ${files.length} test files`);
// Vitest takes file names as text filters, so a name that starts another test file's name
// (a.test.ts and a.test.tsx) would also run that file here and on its own machine.
for (const f of mine.files) {
  const clash = files.find((o) => o !== f && o.includes(f));
  if (clash) throw new Error(`${f} is also a text match for ${clash}; rename one of them.`);
}
const run = spawnSync("npx", ["vitest", "run", ...rest, ...mine.files], { stdio: "inherit" });
process.exit(run.status ?? 1);
