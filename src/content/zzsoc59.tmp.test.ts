import { it } from "vitest";
import { readFileSync, writeFileSync } from "node:fs";
import { COURSES } from "./all";
import { questionText } from "./locale";
import { withSeed } from "./random";

const S = "/tmp/claude-0/-home-user-gradelings/3fc40b61-f450-57f1-afc3-f4a17cdb4344/scratchpad/pasoc";
it("dumps", () => {
  const ids = readFileSync(`${S}/ids.txt`, "utf8").split(/\s+/).filter(Boolean);
  const by = new Map<string, any>();
  for (const c of COURSES) for (const u of c.units) if (!by.has(u.id)) by.set(u.id, u);
  for (const id of ids) {
    const u = by.get(id);
    if (!u) { writeFileSync(`${S}/q/${id}.txt`, "MISSING"); continue; }
    const seen = new Set<string>();
    const lines: string[] = [`# ${u.title} | ${u.blurb ?? ""}`];
    for (const seed of [1, 2, 3, 4]) for (const d of [1, 2, 3] as const) {
      const qs = withSeed(seed * 101 + d, () => u.generate({ difficulty: d }));
      for (const q of qs) { const t = questionText(q).replace(/\n/g, " / "); if (!seen.has(t)) { seen.add(t); lines.push(t.slice(0, 220)); } }
    }
    writeFileSync(`${S}/q/${id}.txt`, lines.join("\n"));
  }
});
