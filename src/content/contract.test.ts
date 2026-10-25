import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import type { FrameworkContract } from "./contract";
import { canadianWords, localizeUnit, questionText } from "./locale";
import type { FrameworkManifest } from "./manifest";
import { withSeed } from "./random";
import { REGISTRY } from "./registry";
import type { FrameworkId, Question, Unit } from "./types";

// The framework contract: the checks every province and state must pass, run once per framework in the registry. What
// differs between them (how citations are written, which units are their own, which places borrowed units must not
// name) is in each framework's contract.ts. A new framework gets every check by being in the registry; its own test
// file only needs the rules that really are its alone.

const manifests = import.meta.glob<{ manifest: FrameworkManifest }>("./*/manifest.ts", { eager: true });
const contracts = import.meta.glob<{ contract: FrameworkContract }>("./*/contract.ts", { eager: true });

/** Each framework's contract, found beside its manifest. */
const contractOf = (id: string): FrameworkContract | undefined => {
  const path = Object.keys(manifests).find((p) => manifests[p].manifest.id === id);
  return path ? contracts[path.replace(/manifest\.ts$/, "contract.ts")]?.contract : undefined;
};

/** A good spread of a unit's questions: three seeds at every difficulty. */
const sampleOf = (generate: Unit["generate"]): Question[] =>
  [1, 2, 3].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));

/** Every unit a framework shows, with where it sits. */
const unitsOf = (id: FrameworkId) =>
  COURSES.flatMap((c) => c.units.filter((u) => u.standards[id]).map((u) => ({ c, u, key: `${c.grade}/${c.subject}/${u.id}` })));

describe.each(REGISTRY.map((m) => [m.framework.name, m] as const))("%s keeps the framework contract", (_, m) => {
  const contract = contractOf(m.id)!;
  const units = unitsOf(m.id);

  it("has a contract.ts beside its manifest", () => {
    expect(contract, `${m.id} needs src/content/<folder>/contract.ts`).toBeDefined();
  });

  it.runIf(contract?.cite)("cites real standards for each unit's own grade and subject", () => {
    const wrong = units.flatMap(({ c, u, key }) => contract.cite!({ grade: c.grade, subject: c.subject, unitId: u.id, standard: u.standards[m.id]! }).map((p) => `${key}: ${p}`));
    expect(wrong).toEqual([]);
  });

  it.runIf(contract?.ownPrefix)("uses its own units only where it allows them", () => {
    const allowed = (f: string) => f === m.id || (contractOf(f)?.adoptsFrom ?? []).includes(m.id);
    const own = COURSES.flatMap((c) => c.units.filter((u) => u.id.startsWith(contract.ownPrefix!)).map((u) => ({ u, key: `${c.grade}/${c.subject}/${u.id}` })));
    expect(own.some(({ u }) => u.standards[m.id]), `${m.id} has units starting ${contract.ownPrefix}`).toBe(true);
    for (const { u, key } of own) for (const f of Object.keys(u.standards)) expect(allowed(f), `${key} is used by ${f}, whose contract.ts needs adoptsFrom: ["${m.id}"]`).toBe(true);
  });

  it.runIf(contract?.foreign)("never shows another region's names in a unit it borrowed", () => {
    // Units written for this framework, and BC units it shares as they are, may name places; borrowed copies may not.
    const borrowed = units.filter(({ u }) => !(contract.ownPrefix && u.id.startsWith(contract.ownPrefix)) && !u.standards["ca-bc"]);
    const hits = borrowed.flatMap(({ u, key }) => sampleOf(u.generate).filter((q) => contract.foreign!.test(JSON.stringify(q))).map((q) => `${key}: ${q.prompt}`));
    expect([...new Set(hits)]).toEqual([]);
  });

  it.runIf(contract?.plan)("lists each planned unit once per course, sharing only BC units", () => {
    for (const [course, entries] of Object.entries(contract.plan!)) {
      const ids = entries.map((e) => e[0]);
      expect(new Set(ids).size, `${course} lists a unit twice`).toBe(ids.length);
      const [grade, subject] = course.split("/");
      const c = COURSES.find((x) => x.grade === grade && x.subject === subject);
      for (const [id, kind] of entries) {
        const u = c?.units.find((x) => x.id === id && x.standards[m.id]);
        expect(u, `${course}/${id} is planned but not placed`).toBeDefined();
        expect(Boolean(u?.standards["ca-bc"]), `${course}/${id}: "share" is for BC units, "adopt" and "lift" for the rest`).toBe(kind === "share");
      }
    }
  });
});

// The country contract: rules every framework in a country keeps, whichever units it borrows.
const US = REGISTRY.filter((m) => m.framework.country === "US");
/** Units written for a US state may use US words that are also Canadian (treaty, Confederation, Great Lakes). */
const usOwn = US.map((m) => contractOf(m.id)?.ownPrefix).filter(Boolean) as string[];

describe.each(US.map((m) => [m.framework.name, m] as const))("%s keeps the US contract", (_, m) => {
  const units = unitsOf(m.id);

  it("never shows a unit about Canada, or Canadian money", () => {
    for (const { u, key } of units) {
      const qs = sampleOf(localizeUnit(u, "en-US").generate);
      const words = usOwn.some((p) => u.id.startsWith(p)) ? [] : [...new Set(qs.flatMap((q) => canadianWords(questionText(q))))];
      expect(words, `${key} mentions Canada`).toEqual([]);
      for (const q of qs) {
        const money = q.kind === "coins" || q.visual?.type === "coins" || (q.kind === "choice" && q.choices.some((c) => c.coin));
        if (money) expect(q.currency, `${key} shows Canadian coins`).toBe("USD");
      }
    }
  });

  it("never shows a spelling lesson whose choices collide in US spelling", () => {
    for (const { u, key } of units) {
      for (const q of sampleOf(localizeUnit(u, "en-US").generate)) {
        if (q.kind !== "choice") continue;
        const labels = q.choices.map((c) => `${c.label}|${c.emoji ?? ""}|${c.coin ?? ""}|${c.shape ?? ""}`);
        expect(new Set(labels).size, `${key}: ${q.prompt}`).toBe(labels.length);
      }
    }
  });
});
