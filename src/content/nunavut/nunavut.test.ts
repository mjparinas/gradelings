import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { getFramework } from "../frameworks";
import { overall, NEW_CURRICULUM_GRADES } from "./overall";

// The approved guides per grade and subject, from the Nunavut Department of Education's Approved Curriculum and Teaching
// Resources (docs/research/nunavut/README.md).
const APPROVED = JSON.parse(readFileSync(join(__dirname, "../../../docs/research/nunavut/approved.json"), "utf8")) as Record<
  string,
  { guides: string[]; areas: string[] | null }
>;

describe("Nunavut", () => {
  it("is selectable and reports on four plain practice steps", () => {
    const nunavut = getFramework("nunavut");
    expect(nunavut.id).toBe("ca-nu");
    expect(nunavut.scoringFor("4").levels.map((l) => l.label)).toEqual(["Beginning", "Approaching", "Meeting", "Exceeding"]);
    expect(nunavut.scoringFor("4").source).toMatch(/not a Nunavut/);
  });

  it("cites an approved guide, and a real strand where the guide has them", () => {
    for (const c of COURSES) {
      const approved = APPROVED[`${c.grade}/${c.subject}`];
      for (const u of c.units) {
        const standard = u.standards["ca-nu"];
        if (!standard) continue;
        expect(approved, `${c.grade}/${c.subject} has no approved guide, but ${u.id} cites one`).toBeDefined();
        const head = standard.split(" · ")[0];
        const guide = approved.guides.find((g) => head.startsWith(g));
        expect(guide, `${u.id} cites "${head}", which is not an approved ${c.grade}/${c.subject} guide`).toBeDefined();
        if (approved.areas) {
          const area = head.slice(guide!.length + 2);
          for (const part of area.split("; ")) expect(approved.areas, `${u.id} cites area "${part}"`).toContain(part);
        }
      }
    }
  });

  it("offers French as an Additional Language in Grades 4 to 9 only, and no immersion", () => {
    const has = (grade: string, subject: string) => COURSES.some((c) => c.grade === grade && c.subject === subject && c.units.some((u) => u.standards["ca-nu"]));
    for (const g of ["k", "1", "2", "3"]) expect(has(g, "core-french"), `core-french ${g}`).toBe(false);
    for (const g of ["4", "5", "6", "7", "8", "9"]) expect(has(g, "core-french"), `core-french ${g}`).toBe(true);
    for (const g of ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) expect(has(g, "immersion"), `immersion ${g}`).toBe(false);
  });

  it("adds the Nunavut-only units for Nunavut alone", () => {
    const own = COURSES.flatMap((c) => c.units.filter((u) => u.id.startsWith("nu-")).map((u) => ({ g: c.grade, s: c.subject, u })));
    expect(own.length).toBe(20);
    for (const { g, s, u } of own) {
      expect(Object.keys(u.standards), `${g}/${s}/${u.id}`).toEqual(["ca-nu"]);
    }
  });

  it("cites the new Nunavut curriculum in the grades already taught with it, and the approved guides elsewhere", () => {
    const CORE = ["math", "language", "science", "social"];
    for (const [key, approved] of Object.entries(APPROVED) as [string, { guides: string[]; inForceFrom?: string }][]) {
      const [grade, subject] = key.split("/");
      if (!CORE.includes(subject)) continue;
      const isNew = (NEW_CURRICULUM_GRADES as readonly string[]).includes(grade);
      expect(Boolean(approved.inForceFrom), `${key}: inForceFrom in approved.json`).toBe(isNew);
      for (const g of approved.guides) expect(g.startsWith("Nunavut ") && g.endsWith("K–6 (2025)"), `${key}: ${g}`).toBe(isNew);
      expect(overall(grade as never, subject as never).some((line) => line.includes("new Nunavut curriculum")), `${key}: Big Ideas`).toBe(isNew);
    }
    for (const g of ["k", "1", "2", "3"]) {
      for (const c of COURSES.filter((c) => c.grade === g)) {
        for (const u of c.units) {
          const standard = u.standards["ca-nu"];
          if (standard) expect(standard, `${g}/${c.subject}/${u.id}`).toMatch(/^Nunavut (Mathematics|English Language Arts|Science|Social Studies) K–6 \(2025\), /);
        }
      }
    }
  });

  it("uses Alberta's mathematics and the Alberta-based science for Grades 7 to 9", () => {
    for (const g of ["7", "8", "9"]) {
      const science = COURSES.find((c) => c.grade === g && c.subject === "science")!;
      for (const u of science.units.filter((u) => u.standards["ca-nu"] && !u.id.startsWith("nu-"))) {
        expect(u.standards["ca-nu"]).toMatch(/^Nunavut adaptation of Alberta Science 7–9 \(2003\), Unit /);
        expect(u.standards["ca-ab"], u.id).toBeDefined();
      }
    }
  });
});
