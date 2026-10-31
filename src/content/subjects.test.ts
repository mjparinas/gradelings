import { describe, expect, it } from "vitest";
import { REGISTRY } from "./registry";
import { CORE_SUBJECTS, isCoreSubject, LANGUAGE_NAME, languagesOf, publicSubject, SUBJECTS, subjectInSentence, subjectsIn, subjectsOffered } from "./subjects";

describe("subjectInSentence", () => {
  it("lowercases ordinary subject words but keeps language and French program names capitalized", () => {
    expect(subjectInSentence("Social Studies")).toBe("social studies");
    expect(subjectInSentence("English Language Arts")).toBe("English language arts");
    expect(subjectInSentence("French Immersion")).toBe("French Immersion");
    expect(subjectInSentence("Core French")).toBe("Core French");
    expect(subjectInSentence("Français")).toBe("Français");
  });
});

describe("subject registry", () => {
  it("lists every subject once, with a name parents search for", () => {
    expect(new Set(SUBJECTS.map((s) => s.id)).size).toBe(SUBJECTS.length);
    for (const s of SUBJECTS) expect(s.seoTitle, s.id).toMatch(/\S/);
  });

  it("treats every subject without a language as core, and second languages as opt-in", () => {
    expect(CORE_SUBJECTS).toEqual(["math", "language", "science", "social"]);
    expect(subjectsIn("fr")).toEqual(["immersion", "core-french"]);
    expect(isCoreSubject("immersion")).toBe(false);
    for (const l of languagesOf(SUBJECTS.map((s) => s.id))) expect(LANGUAGE_NAME[l], l).toBeDefined();
  });

  it("finds the second languages among a child's subjects, each once", () => {
    expect(languagesOf(["math", "science"])).toEqual([]);
    expect(languagesOf(["math", "immersion", "core-french"])).toEqual(["fr"]);
    expect(languagesOf(["nonsense"])).toEqual([]);
  });

  it("has every second-language subject named in each framework's manifest", () => {
    // A new language subject needs its grades set per framework (empty where it isn't taught), unless it is one course
    // every framework offers in the same grades (`everywhere`, as Spanish is).
    const perFramework = SUBJECTS.filter((s) => s.language && !s.everywhere).map((s) => s.id);
    for (const m of REGISTRY) for (const id of perFramework) expect(m.french, `${m.id} ${id}`).toHaveProperty(id);
  });
});

describe("subjects offered everywhere (Spanish)", () => {
  const bc = { subjects: ["math", "language", "science", "social", "immersion", "core-french"] as const };
  const wa = { subjects: ["math", "language", "science", "social"] as const };

  it("offers Spanish in Grades 3 to 9 of every framework once its flag is on, and nowhere while it's off", () => {
    const on = () => true;
    const off = () => false;
    for (const f of [bc, wa]) {
      expect(subjectsOffered(f, "3", on)).toContain("spanish");
      expect(subjectsOffered(f, "9", on)).toContain("spanish");
      expect(subjectsOffered(f, "2", on)).not.toContain("spanish");
      expect(subjectsOffered(f, "k", on)).not.toContain("spanish");
      expect(subjectsOffered(f, "5", off)).not.toContain("spanish");
    }
    // A framework's own subjects never depend on a flag.
    expect(subjectsOffered(bc, "5", off)).toEqual(["math", "language", "science", "social", "immersion", "core-french"]);
    expect(subjectsOffered(wa, "5", off)).toEqual(["math", "language", "science", "social"]);
  });

  it("keeps Spanish off the public pages while it's behind its flag", () => {
    expect(publicSubject("spanish")).toBe(false);
    expect(publicSubject("core-french")).toBe(true);
    expect(publicSubject("math")).toBe(true);
  });

  it("treats Spanish as a second language, never a core subject", () => {
    expect(isCoreSubject("spanish")).toBe(false);
    expect(subjectsIn("es")).toEqual(["spanish"]);
    expect(languagesOf(["math", "spanish", "core-french"]).sort()).toEqual(["es", "fr"]);
    expect(LANGUAGE_NAME.es).toBe("Spanish");
  });
});
