import { it } from "vitest";
import { COURSES } from "./all";
import { writeFileSync } from "fs";
it("dump", () => {
  const out: any[] = [];
  const seen = new Set<string>();
  for (const c of COURSES) {
    if (!["k","1","2","3","4"].includes(c.grade)) continue;
    for (const u of c.units) {
      const key = `${c.grade}|${c.subject}|${u.id}`;
      if (seen.has(key)) continue; seen.add(key);
      let sample: string[] = [];
      try { sample = u.generate({difficulty:2}).slice(0,3).map((q:any)=>q.prompt); } catch {}
      out.push({ g: c.grade, s: c.subject, id: u.id, name: u.name, has: !!u.lesson, fw: Object.keys(u.standards), sample });
    }
  }
  writeFileSync("/tmp/claude-0/s/units.json", JSON.stringify(out));
});
