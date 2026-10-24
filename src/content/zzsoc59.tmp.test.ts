import { it } from "vitest";
import { readFileSync, writeFileSync } from "node:fs";
import { questionText } from "./locale";
import { withSeed } from "./random";

const S = "/tmp/claude-0/-home-user-gradelings/3fc40b61-f450-57f1-afc3-f4a17cdb4344/scratchpad/pasoc";
it("dumps", () => {
  const ids = readFileSync(`${S}/ids.txt`, "utf8").split(/\s+/).filter(Boolean);
  const mods = import.meta.glob(["/src/content/*/g[0-9].ts", "/src/content/*/k.ts", "/src/content/grades/*/index.ts", "!/src/content/pennsylvania/**"], { eager: true }) as Record<string, any>;
  const by = new Map<string, any>();
  for (const m of Object.values(mods)) for (const c of m.courses ?? []) for (const u of c.units) if (!by.has(u.id)) by.set(u.id, u);
  for (const id of ids) {
    const u = by.get(id);
    if (!u) { writeFileSync(`${S}/q/${id}.txt`, "MISSING"); continue; }
    const seen = new Set<string>(); const seen2 = new Set<string>();
    const lines: string[] = [`# ${u.title} | ${u.blurb ?? ""}`]; const allLines: string[] = [];
    for (const seed of [1, 2, 3, 4]) for (const d of [1, 2, 3] as const) {
      const qs = withSeed(seed * 101 + d, () => u.generate({ difficulty: d }));
      for (const q of qs) { const full = questionText(q); const t = full.split("\n")[0]; if (!seen.has(t)) { seen.add(t); lines.push(t.slice(0, 120)); } const key = full.replace(/\n/g, " / "); if (!seen2.has(key)) { seen2.add(key); allLines.push(key); } }
    }
    writeFileSync(`${S}/q/${id}.txt`, lines.join("\n")); writeFileSync(`${S}/q/${id}.all`, allLines.join("\n"));
  }
});
