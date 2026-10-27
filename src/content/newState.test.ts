import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { addToRegistry, camel, files } from "../../scripts/new-state.mjs";

const REGISTRY = readFileSync(join(__dirname, "registry.ts"), "utf8");

describe("new-state script", () => {
  it("turns folder names into identifiers", () => {
    expect(camel("new-york")).toBe("newYork");
    expect(camel("ohio")).toBe("ohio");
  });

  // Any folder that isn't registered and sorts right after grades/ will do.
  it("puts a new state next to the folder that sorts before it (BC lives in grades), in the imports and the list", () => {
    const out: string = addToRegistry(REGISTRY, "guam");
    const lines = out.split("\n");
    const imp = lines.findIndex((l) => l.includes('"./guam/manifest"'));
    expect(lines[imp - 1]).toContain("./grades/manifest");
    expect(lines.filter((l) => l === "  guam,")).toHaveLength(1);
    const entry = lines.indexOf("  guam,");
    expect(lines[entry - 1].trim()).toBe(lines.find((l) => l.includes("./grades/manifest"))!.match(/as (\w+)/)![1] + ",");
  });

  it("refuses a state that is already registered", () => {
    expect(() => addToRegistry(REGISTRY, "ohio")).toThrow("already in the registry");
  });

  it("writes a manifest that loads every grade and starts as upcoming", () => {
    const f = files("hawaii", "us-hi", "Hawaii") as Record<string, string>;
    const manifest = f["src/content/hawaii/manifest.ts"];
    for (const g of ["k", "g1", "g9"]) expect(manifest).toContain(`import("./${g}")`);
    expect(manifest).toContain("upcoming: true");
    expect(manifest).toContain("HAWAII_GUIDES");
  });
});
