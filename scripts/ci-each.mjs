// Runs several commands one after another in one CI job and fails if any of them failed, after
// running them all, so one broken script never hides the result of the next.
//
//   node scripts/ci-each.mjs '["node scripts/e2e-a11y.mjs http://localhost:3000", "node scripts/e2e-placement.mjs http://localhost:3000"]'
//
// The list is JSON so a workflow matrix can pass it with toJSON(). Each command gets its own
// collapsible group in the log, with how long it took.
import { spawnSync } from "node:child_process";

const commands = JSON.parse(process.argv[2] ?? "[]");
if (!Array.isArray(commands) || commands.length === 0 || commands.some((c) => typeof c !== "string")) {
  console.error("Usage: node scripts/ci-each.mjs '<JSON list of commands>'");
  process.exit(2);
}

const failed = [];
for (const command of commands) {
  const started = Date.now();
  console.log(`::group::${command}`);
  const run = spawnSync(command, { shell: true, stdio: "inherit" });
  console.log("::endgroup::");
  const seconds = Math.round((Date.now() - started) / 1000);
  if (run.status === 0) {
    console.log(`✓ ${command} (${seconds} s)`);
  } else {
    console.log(`::error::Failed after ${seconds} s: ${command}`);
    failed.push(command);
  }
}
process.exit(failed.length ? 1 : 0);
