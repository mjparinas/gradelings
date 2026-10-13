import { describe, expect, it } from "vitest";
import { COMPETITORS, OFFERED_COUNTRIES, familiesWord, forCountries } from "@/content/compare";
import { FRAMEWORKS } from "@/content/frameworks";
import { GUIDES, GUIDE_FRAMEWORKS } from "@/content/guides";
import { GRADE_ORDER } from "@/content/subjects";
import { allCurriculumPaths } from "./curriculum";
import { allGuidePaths } from "./guides";

describe("guide pages", () => {
  const paths = allGuidePaths().map((p) => p.path);

  it("has unique paths with a trailing slash", () => {
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) expect(p.endsWith("/")).toBe(true);
  });

  it("does not collide with curriculum pages", () => {
    const curriculum = new Set(allCurriculumPaths());
    for (const p of paths) expect(curriculum.has(p)).toBe(false);
  });

  it("has a worksheet and a help page for every course", () => {
    for (const f of GUIDE_FRAMEWORKS) {
      const subjects = paths.filter((p) => p.startsWith(`/guides/${f.slug}/`) && p.split("/").length === 6 && !p.endsWith("/worksheet/"));
      expect(subjects.length).toBeGreaterThan(0);
      for (const s of subjects) expect(paths).toContain(`${s}worksheet/`);
    }
  });

  it("has guide copy for every framework and grade", () => {
    for (const f of FRAMEWORKS) {
      const g = GUIDES[f.id]!;
      // Every province gets the full set of guides (see "Public pages and SEO" in AGENTS.md).
      expect(g, `guides for ${f.id}`).toBeDefined();
      for (const grade of GRADE_ORDER.filter((x) => f.grades.includes(x))) expect(g.gradeNotes[grade]?.overview.length).toBeGreaterThan(40);
      expect(g.competencies.items.length).toBeGreaterThan(0);
      expect(g.assessment.faqs.length).toBeGreaterThan(0);
      // A province whose framework has no French subjects would have no French guide (every province has one today).
      if (f.subjects.some((s) => s === "immersion" || s === "core-french")) {
        expect(g.french?.faqs.length ?? 0, `French guide for ${f.id}`).toBeGreaterThan(0);
      } else {
        expect(g.french, `no French guide for ${f.id}`).toBeUndefined();
      }
    }
  });

  it("describes comparisons for every province, not only British Columbia, Ontario and Alberta", () => {
    const text = JSON.stringify(COMPETITORS);
    expect(text).not.toContain("BC, Ontario and Alberta");
    expect(text).not.toContain("BC, Ontario or Alberta");
    expect(text).toContain("Saskatchewan");
    expect(text).toContain("New Brunswick");
  });

  it("gives families in every country we offer their own price and curriculum facts on each comparison page", () => {
    // Region parity (AGENTS.md): a US family must not see only Canadian prices and app stores.
    expect(OFFERED_COUNTRIES).toEqual([...new Set(FRAMEWORKS.map((f) => f.country))].sort());
    for (const c of COMPETITORS) {
      for (const country of OFFERED_COUNTRIES) {
        const rows = c.differences.filter((d) => !d.country || d.country === country);
        expect(rows.some((d) => d.topic.startsWith("Price")), `${c.slug} price for ${country}`).toBe(true);
        expect(rows.some((d) => d.topic.startsWith("Curriculum")), `${c.slug} curriculum for ${country}`).toBe(true);
        expect(c.faqs.some((q) => q.country === country || !q.country), `${c.slug} questions for ${country}`).toBe(true);
      }
    }
  });

  it("leaves out another country's rows, questions and sources", () => {
    for (const c of COMPETITORS) {
      const ca = forCountries(c, ["CA"]);
      expect(JSON.stringify(ca)).not.toContain("US$");
      expect([...ca.differences, ...ca.faqs, ...ca.sources].every((x) => x.country !== "US")).toBe(true);
      const us = forCountries(c, ["US"]);
      expect(JSON.stringify(us)).not.toContain("C$");
      expect(JSON.stringify(us)).not.toContain("Canadian App Store");
    }
    expect(familiesWord(["CA"])).toBe("Canadian families");
    expect(familiesWord(["CA", "US"])).toBe("families in Canada and the US");
  });

  it("gives every competitor sources and a fair take for both sides", () => {
    for (const c of COMPETITORS) {
      expect(c.sources.length).toBeGreaterThan(0);
      for (const s of c.sources) expect(s.url.startsWith("https://")).toBe(true);
      expect(c.chooseThem.length).toBeGreaterThan(0);
      expect(c.chooseUs.length).toBeGreaterThan(0);
    }
  });
});
