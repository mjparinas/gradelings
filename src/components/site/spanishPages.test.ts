import { describe, expect, it } from "vitest";
import { hashSeed, withSeed } from "@/content/random";
import { canadianWords } from "@/content/locale";
import { sectionSitemap } from "./sitemaps";
import { absolute } from "@/lib/site";
import { spanishCourses, spanishGrade, spanishPath, spanishSampleSeed, spanishStandardLines, spanishUnit } from "./spanishPages";

describe("public Spanish pages", () => {
  const courses = spanishCourses();

  it("have a page for every grade the course is taught in, Grades 3 to 9", () => {
    expect(courses.map((c) => c.grade)).toEqual(["3", "4", "5", "6", "7", "8", "9"]);
    for (const c of courses) expect(spanishGrade(`grade-${c.grade}`)?.course).toBe(c);
    expect(spanishGrade("grade-2")).toBeUndefined();
  });

  it("find every unit, and nothing else", () => {
    for (const c of courses) for (const u of c.units) expect(spanishUnit(`grade-${c.grade}`, u.id)?.unit, u.id).toBe(u);
    expect(spanishUnit("grade-3", "nope")).toBeUndefined();
  });

  it("are all in the sitemap", () => {
    const listed = new Set(sectionSitemap("pages").map((e) => e.url));
    expect(listed.has(absolute(spanishPath.hub()))).toBe(true);
    for (const c of courses) {
      expect(listed.has(absolute(spanishPath.grade(c.grade)))).toBe(true);
      for (const u of c.units) expect(listed.has(absolute(spanishPath.unit(c.grade, u.id))), u.id).toBe(true);
    }
  });

  it("show the same sample questions on every build, with answers among the choices", () => {
    for (const c of courses) {
      for (const u of c.units) {
        const make = () => withSeed(hashSeed(spanishSampleSeed(c.grade, u.id)), () => u.generate({ difficulty: 2 })).slice(0, 6);
        const qs = make();
        expect(qs.length, u.id).toBeGreaterThan(0);
        expect(make()).toEqual(qs);
        for (const q of qs) if (q.kind === "choice") expect(q.choices.map((x) => x.id)).toContain(q.answer);
      }
    }
  });

  it("name the standards of BC, Alberta and Manitoba where they have their own, and the World-Readiness ones for everyone else", () => {
    const g3 = spanishUnit("grade-3", courses[0].units[0].id)!.unit;
    expect(spanishStandardLines(g3).map((l) => l.label)).toEqual(["Everywhere else (World-Readiness Standards)"]);
    const g7 = spanishUnit("grade-7", courses.find((c) => c.grade === "7")!.units[0].id)!.unit;
    expect(spanishStandardLines(g7).map((l) => l.label)).toEqual(["British Columbia", "Alberta", "Manitoba", "Everywhere else (World-Readiness Standards)"]);
  });

  it("keep the page copy of every unit free of Canadian-only wording so every region can read it", () => {
    for (const c of courses) for (const u of c.units) expect(canadianWords([u.title, u.blurb, u.parentNote].join(" ")), u.id).toEqual([]);
  });
});
