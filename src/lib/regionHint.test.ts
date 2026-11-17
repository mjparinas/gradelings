// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { readRegionHint, rememberRegionFromPlayLink } from "./regionHint";

beforeEach(() => localStorage.clear());

describe("regionHint", () => {
  it("remembers the province and grade a play link names", () => {
    rememberRegionFromPlayLink("/play/#/start?framework=ca-on&grade=4&subject=math&unit=fractions");
    expect(readRegionHint()).toEqual({ framework: "ca-on", grade: "4" });
  });
  it("keeps just the province when the link has no grade", () => {
    rememberRegionFromPlayLink("/play/#/start?framework=ca-ab");
    expect(readRegionHint()).toEqual({ framework: "ca-ab" });
  });
  it("leaves the last region alone for links that name none, and ignores odd values", () => {
    rememberRegionFromPlayLink("/play/#/start?framework=ca-on&grade=4");
    rememberRegionFromPlayLink("/play/");
    rememberRegionFromPlayLink(undefined);
    rememberRegionFromPlayLink("/play/#/start?framework=<script>");
    expect(readRegionHint()).toEqual({ framework: "ca-on", grade: "4" });
  });
  it("reads nothing when nothing was saved or storage holds junk", () => {
    expect(readRegionHint()).toBeNull();
    localStorage.setItem("gradelings.region", "{");
    expect(readRegionHint()).toBeNull();
  });
});
