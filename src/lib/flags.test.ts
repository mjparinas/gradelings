import { describe, expect, it } from "vitest";
import { bucket, FLAGS, flagDef, flagOn, normalCdf, parseVariants, pickVariant, pValue, validateExperiment, type Experiment } from "./flags";

const def = flagDef("shop")!;
const ids = Array.from({ length: 4000 }, (_, i) => `family-${i}`);

describe("flag definitions", () => {
  it("have unique kebab-case keys and a description", () => {
    expect(new Set(FLAGS.map((f) => f.key)).size).toBe(FLAGS.length);
    for (const f of FLAGS) {
      expect(f.key).toMatch(/^[a-z][a-z-]+$/);
      expect(f.description.length).toBeGreaterThan(10);
      expect(["app", "server"]).toContain(f.scope);
    }
    expect(flagDef("nope")).toBeUndefined();
  });
});

describe("bucket", () => {
  it("is stable and stays from 0 to 9999", () => {
    expect(bucket("abc")).toBe(bucket("abc"));
    expect(bucket("abc")).not.toBe(bucket("abd"));
    for (const id of ids) {
      const b = bucket(id);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThan(10_000);
    }
  });

  it("spreads ids evenly", () => {
    const low = ids.filter((id) => bucket(id) < 5000).length;
    expect(low / ids.length).toBeGreaterThan(0.45);
    expect(low / ids.length).toBeLessThan(0.55);
  });
});

describe("flagOn", () => {
  it("uses the default until an admin changes the flag", () => {
    expect(flagOn(def, undefined, undefined, "f")).toBe(true);
    expect(flagOn({ ...def, defaultOn: false }, undefined, undefined, "f")).toBe(false);
  });

  it("is off for everyone when switched off, and on for everyone at 100%", () => {
    expect(flagOn(def, { enabled: false, rollout: 100 }, undefined, "f")).toBe(false);
    expect(flagOn(def, { enabled: true, rollout: 100 }, undefined, null)).toBe(true);
    expect(flagOn(def, { enabled: true, rollout: 0 }, undefined, "f")).toBe(false);
  });

  it("lets an override win either way", () => {
    expect(flagOn(def, { enabled: false, rollout: 100 }, true, "f")).toBe(true);
    expect(flagOn(def, { enabled: true, rollout: 100 }, false, "f")).toBe(false);
    expect(flagOn(def, undefined, false, "f")).toBe(false);
  });

  it("rolls out to about the given share, keeps the same families as it grows, and skips devices with no id", () => {
    const at = (rollout: number) => new Set(ids.filter((id) => flagOn(def, { enabled: true, rollout }, undefined, id)));
    const ten = at(10);
    const fifty = at(50);
    expect(ten.size / ids.length).toBeGreaterThan(0.07);
    expect(ten.size / ids.length).toBeLessThan(0.13);
    expect(fifty.size / ids.length).toBeGreaterThan(0.45);
    expect(fifty.size / ids.length).toBeLessThan(0.55);
    for (const id of ten) expect(fifty.has(id)).toBe(true);
    expect(flagOn(def, { enabled: true, rollout: 99 }, undefined, null)).toBe(false);
  });

  it("buckets each flag separately", () => {
    const other = flagDef("arcade")!;
    const a = ids.filter((id) => flagOn(def, { enabled: true, rollout: 50 }, undefined, id));
    const b = new Set(ids.filter((id) => flagOn(other, { enabled: true, rollout: 50 }, undefined, id)));
    const both = a.filter((id) => b.has(id)).length;
    expect(both / ids.length).toBeGreaterThan(0.2);
    expect(both / ids.length).toBeLessThan(0.3);
  });
});

describe("pickVariant", () => {
  const exp: Pick<Experiment, "key" | "status" | "variants" | "winner"> = {
    key: "pricing-copy",
    status: "running",
    variants: [
      { name: "control", weight: 1 },
      { name: "short", weight: 3 },
    ],
    winner: null,
  };

  it("splits a running test by weight, the same way every time", () => {
    const short = ids.filter((id) => pickVariant(exp, id) === "short").length / ids.length;
    expect(short).toBeGreaterThan(0.7);
    expect(short).toBeLessThan(0.8);
    expect(pickVariant(exp, "family-7")).toBe(pickVariant(exp, "family-7"));
  });

  it("shows the control to drafts, devices with no id and broken tests", () => {
    expect(pickVariant({ ...exp, status: "draft" }, "family-1")).toBe("control");
    expect(ids.some((id) => pickVariant(exp, id) === "short")).toBe(true);
    expect(pickVariant(exp, null)).toBe("control");
    expect(pickVariant({ ...exp, variants: [] }, "family-1")).toBe("control");
    expect(pickVariant({ ...exp, variants: [{ name: "a", weight: 0 }, { name: "b", weight: 0 }] }, "family-1")).toBe("a");
  });

  it("shows everyone the winner once stopped, or the control without one", () => {
    expect(pickVariant({ ...exp, status: "stopped", winner: "short" }, "family-1")).toBe("short");
    expect(ids.every((id) => pickVariant({ ...exp, status: "stopped", winner: null }, id) === "control")).toBe(true);
    expect(pickVariant({ ...exp, status: "stopped", winner: "gone" }, "family-1")).toBe("control");
  });
});

describe("validateExperiment", () => {
  const ok = { key: "home-tiles", description: "Tile order", variants: [{ name: "control", weight: 50 }, { name: "b", weight: 50 }] };
  it("accepts a good experiment", () => expect(validateExperiment(ok)).toBeNull());
  it("rejects bad keys, descriptions and variants", () => {
    expect(validateExperiment({ ...ok, key: "Home Tiles" })).toMatch(/key/);
    expect(validateExperiment({ ...ok, key: "a" })).toMatch(/key/);
    expect(validateExperiment({ ...ok, description: "x".repeat(301) })).toMatch(/description/);
    expect(validateExperiment({ ...ok, variants: [{ name: "a", weight: 1 }] })).toMatch(/2 to 5/);
    expect(validateExperiment({ ...ok, variants: "a,b" })).toMatch(/2 to 5/);
    expect(validateExperiment({ ...ok, variants: [{ name: "a", weight: 1 }, { name: "a", weight: 1 }] })).toMatch(/own name/);
    expect(validateExperiment({ ...ok, variants: [{ name: "a", weight: 0 }, { name: "b", weight: 1 }] })).toMatch(/weight/);
    expect(validateExperiment({ ...ok, variants: [{ name: "a", weight: 1.5 }, { name: "b", weight: 1 }] })).toMatch(/weight/);
    expect(validateExperiment({ ...ok, variants: [{ name: "A B", weight: 1 }, { name: "b", weight: 1 }] })).toMatch(/Name each/);
  });
});

describe("parseVariants", () => {
  it("reads one per line or comma-separated, with 50 as the default weight", () => {
    expect(parseVariants("control 50\nShort 25\n\n")).toEqual([
      { name: "control", weight: 50 },
      { name: "short", weight: 25 },
    ]);
    expect(parseVariants("a, b 10")).toEqual([
      { name: "a", weight: 50 },
      { name: "b", weight: 10 },
    ]);
  });
});

describe("statistics", () => {
  it("normalCdf matches known values", () => {
    expect(normalCdf(0)).toBeCloseTo(0.5, 6);
    expect(normalCdf(1.96)).toBeCloseTo(0.975, 3);
    expect(normalCdf(-1.96)).toBeCloseTo(0.025, 3);
  });

  it("pValue finds a real difference and not a tiny one", () => {
    // 10% against 15% with 1000 each is clearly different; 10% against 10.5% is not.
    expect(pValue(1000, 100, 1000, 150)!).toBeLessThan(0.01);
    expect(pValue(1000, 100, 1000, 105)!).toBeGreaterThan(0.5);
    expect(pValue(1000, 100, 1000, 100)).toBeCloseTo(1, 6);
  });

  it("pValue says nothing about empty groups or all-or-nothing results", () => {
    expect(pValue(0, 0, 10, 1)).toBeNull();
    expect(pValue(10, 0, 10, 0)).toBeNull();
    expect(pValue(10, 10, 10, 10)).toBeNull();
  });
});
