import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs script
import { blocking } from "../../scripts/audit-gate.mjs";

const report = (url: string, severity = "high") => ({ vulnerabilities: { x: { via: [{ url, title: "t", severity }, "dep"] } } });

describe("audit gate", () => {
  it("blocks an unlisted high advisory", () => {
    expect(blocking(report("https://github.com/advisories/GHSA-aaaa-bbbb-cccc"), "2026-11-20")).toHaveLength(1);
  });
  it("allows the listed advisory until its day, then blocks it again", () => {
    const r = report("https://github.com/advisories/GHSA-fc5q-39xc-vjpf");
    expect(blocking(r, "2026-11-20")).toEqual([]);
    expect(blocking(r, "2026-12-19")).toHaveLength(1);
  });
  it("ignores moderate advisories", () => {
    expect(blocking(report("https://github.com/advisories/GHSA-aaaa-bbbb-cccc", "moderate"), "2026-11-20")).toEqual([]);
  });
});
