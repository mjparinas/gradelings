import { it } from "vitest";
import { COURSES } from "../all";
import { writeFileSync } from "fs";
it("gap", () => {
  const out: string[] = [];
  for (const c of COURSES) for (const u of c.units) if (!u.lesson && ["5","6","7","8","9"].includes(c.grade) && c.subject==="math") out.push(`${c.grade}\t${u.id}\t${Object.keys(u.standards).join(",")}\t${u.title}`);
  writeFileSync("/tmp/claude-0/-home-user-gradelings/955c722b-c79a-515e-a5d3-693da5c8b3f4/scratchpad/gap.tsv", [...new Set(out)].join("\n"));
});
