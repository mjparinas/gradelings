import { describe, expect, it } from "vitest";
import { buildLabel } from "./build";

describe("buildLabel", () => {
  it("shows the short commit hash", () => {
    expect(buildLabel("3F9A1C2D4E5B6A7980716253443526170819ABCD")).toBe("Build 3f9a1c2");
  });

  it("shows nothing when the commit is unknown or not a hash", () => {
    expect(buildLabel("")).toBe("");
    expect(buildLabel("main")).toBe("");
  });
});
