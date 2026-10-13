import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_FRAMEWORK, FRAMEWORKS, getFramework, UPCOMING_FRAMEWORKS } from "./frameworks";
import { GUIDES } from "./guides";
import { EXTRA_DEPENDS } from "./index";
import { gradeRange } from "./manifest";
import { manifestOf, REGISTRY } from "./registry";
import { GRADE_ORDER } from "./subjects";

// The registry is the one list of frameworks. These checks keep each manifest consistent with its folder and with
// what the rest of the app reads from it.

describe("framework registry", () => {
  it("lists every framework folder once, with British Columbia (the shared base) first", () => {
    const folders = readdirSync(__dirname).filter((d) => existsSync(join(__dirname, d, "manifest.ts")));
    expect(REGISTRY.length).toBe(folders.length);
    expect(new Set(REGISTRY.map((m) => m.id)).size).toBe(REGISTRY.length);
    expect(new Set(REGISTRY.map((m) => m.framework.slug)).size).toBe(REGISTRY.length);
    expect(REGISTRY[0].id).toBe(DEFAULT_FRAMEWORK);
  });

  it("gives FRAMEWORKS and UPCOMING_FRAMEWORKS the registry's frameworks, in its order", () => {
    expect([...FRAMEWORKS, ...UPCOMING_FRAMEWORKS].map((f) => f.id).sort()).toEqual(REGISTRY.map((m) => m.id).sort());
    expect(FRAMEWORKS.map((f) => f.id)).toEqual(REGISTRY.filter((m) => !m.upcoming).map((m) => m.id));
    for (const m of REGISTRY) expect(getFramework(m.id)).toBe(m.framework);
  });

  it("throws for an id it doesn't know", () => {
    expect(() => manifestOf("ca-qc")).toThrow('No framework "ca-qc"');
  });

  it("only depends on registered frameworks", () => {
    for (const [id, deps] of Object.entries(EXTRA_DEPENDS)) for (const d of deps ?? []) expect(() => manifestOf(d), `${id} depends on ${d}`).not.toThrow();
    expect(EXTRA_DEPENDS).toEqual({ "ca-ab": ["ca-on"] });
  });

  it("gives every framework guides", () => {
    for (const m of REGISTRY) expect(GUIDES[m.id], m.id).toBeDefined();
  });

  it("offers French only in grades the framework has", () => {
    for (const m of REGISTRY) {
      for (const grades of Object.values(m.french)) for (const g of grades) expect(m.framework.grades, `${m.id} ${g}`).toContain(g);
    }
    expect(gradeRange("4", "9")).toEqual(["4", "5", "6", "7", "8", "9"]);
    expect(gradeRange("k", "9")).toEqual(GRADE_ORDER);
  });

  for (const m of REGISTRY) {
    it(`${m.framework.name} loads a course list for every grade`, async () => {
      for (const g of GRADE_ORDER) {
        const mod = await m.grades[g]();
        expect(Array.isArray(mod.courses), `${m.id} ${g}`).toBe(true);
        for (const c of mod.courses) expect(c.grade, `${m.id} ${g}/${c.subject}`).toBe(g);
      }
    });
  }
});
