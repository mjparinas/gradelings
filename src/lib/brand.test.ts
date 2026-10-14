import { describe, expect, it } from "vitest";
import { missingSocialPlatforms, SOCIAL_PLATFORMS, SOCIAL_PROFILES } from "./brand";

describe("social accounts", () => {
  it("are Instagram, YouTube, Pinterest and Facebook (owner, October 2026)", () => {
    expect(SOCIAL_PLATFORMS.map((p) => p.name)).toEqual(["Instagram", "YouTube", "Pinterest", "Facebook"]);
  });

  it("lists only real profile URLs, so every chosen platform is still missing until one is added", () => {
    for (const url of SOCIAL_PROFILES) expect(url).toMatch(/^https:\/\//);
    expect(missingSocialPlatforms([])).toEqual(["Instagram", "YouTube", "Pinterest", "Facebook"]);
  });

  it("counts a platform once its URL is listed, including www, m. and Pinterest's country sites", () => {
    expect(missingSocialPlatforms(["https://www.instagram.com/gradelings/", "https://m.facebook.com/gradelings"])).toEqual(["YouTube", "Pinterest"]);
    expect(
      missingSocialPlatforms(["https://instagram.com/gradelings", "https://www.youtube.com/@gradelings", "https://www.pinterest.ca/gradelings/", "https://www.facebook.com/gradelings"]),
    ).toEqual([]);
  });

  it("ignores text that isn't a URL", () => {
    expect(missingSocialPlatforms(["instagram", ""])).toHaveLength(4);
  });
});

describe("listed profiles", () => {
  it("include the Instagram account, so the to-do asks only for the rest", () => {
    expect(SOCIAL_PROFILES).toContain("https://www.instagram.com/gradelings_com/");
    expect(missingSocialPlatforms()).not.toContain("Instagram");
  });
});
