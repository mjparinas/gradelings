import { describe, expect, it } from "vitest";
import { REGISTRY } from "./registry";
import { CORE_SUBJECTS, isCoreSubject, LANGUAGE_NAME, languagesOf, SUBJECTS, subjectInSentence, subjectsIn } from "./subjects";

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
    // A new language subject needs its grades set per framework (empty where it isn't taught).
    for (const m of REGISTRY) for (const id of SUBJECTS.filter((s) => s.language).map((s) => s.id)) expect(m.french, `${m.id} ${id}`).toHaveProperty(id);
  });
});
