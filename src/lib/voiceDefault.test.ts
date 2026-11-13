import { describe, expect, it } from "vitest";
import { defaultChildSettings, voiceOn } from "./model";

describe("voiceOn", () => {
  it("is on for Pre-K to Grade 1 until a parent chooses, including settings saved before it existed", () => {
    for (const g of ["pk", "k", "1"] as const) expect(voiceOn(undefined, g)).toBe(true);
    expect(voiceOn(defaultChildSettings("a", true, "k"), "k")).toBe(true);
  });
  it("is off from Grade 2 up", () => {
    for (const g of ["2", "5", "9"] as const) expect(voiceOn({}, g)).toBe(false);
    expect(voiceOn(undefined, undefined)).toBe(false);
  });
  it("lets a parent's choice win either way", () => {
    expect(voiceOn({ voice: false }, "k")).toBe(false);
    expect(voiceOn({ voice: true }, "4")).toBe(true);
  });
});
