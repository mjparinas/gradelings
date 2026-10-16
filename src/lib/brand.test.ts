import { describe, expect, it } from "vitest";
import { missingSocialPlatforms, SOCIAL_PLATFORMS, SOCIAL_PROFILES, socialLinks } from "./brand";

describe("social accounts", () => {
  it("are Instagram, YouTube, Pinterest and Facebook (owner, October 2026)", () => {
    expect(SOCIAL_PLATFORMS.map((p) => p.name)).toEqual(["Instagram", "YouTube", "Pinterest", "Facebook"]);
  });

  it("lists only real profile URLs, so every chosen platform is still missing until one is added", () => {
    for (const url of SOCIAL_PROFILES) expect(url).toMatch(/^https:\/\//);
    expect(missingSocialPlatforms([])).toEqual(["Instagram", "Pinterest", "Facebook"]);
  });

  it("counts a platform once its URL is listed, including www, m. and Pinterest's country sites", () => {
    expect(missingSocialPlatforms(["https://www.instagram.com/gradelings/", "https://m.facebook.com/gradelings"])).toEqual(["Pinterest"]);
    expect(
      missingSocialPlatforms(["https://instagram.com/gradelings", "https://www.youtube.com/@gradelings", "https://www.pinterest.ca/gradelings/", "https://www.facebook.com/gradelings"]),
    ).toEqual([]);
  });

  it("doesn't ask for YouTube, which the owner put off for now", () => {
    expect(SOCIAL_PLATFORMS.find((p) => p.name === "YouTube")).toMatchObject({ later: true });
    expect(missingSocialPlatforms([])).not.toContain("YouTube");
  });

  it("ignores text that isn't a URL", () => {
    expect(missingSocialPlatforms(["instagram", ""])).toHaveLength(3);
  });
});

describe("listed profiles", () => {
  it("include the Instagram, Pinterest and Facebook accounts, so the to-do has nothing left to ask for", () => {
    expect(SOCIAL_PROFILES).toContain("https://www.instagram.com/gradelings_com/");
    expect(SOCIAL_PROFILES).toContain("https://www.pinterest.com/gradelings");
    expect(SOCIAL_PROFILES).toContain("https://www.facebook.com/people/Gradelings/61595170062640/");
    expect(missingSocialPlatforms()).toEqual([]);
  });
});

describe("socialLinks", () => {
  it("names each listed profile by its platform, in platform order, and skips URLs that aren't ours", () => {
    expect(
      socialLinks(["https://m.facebook.com/gradelings", "not a url", "https://example.com/x", "https://www.pinterest.ca/gradelings"]),
    ).toEqual([
      { name: "Pinterest", href: "https://www.pinterest.ca/gradelings" },
      { name: "Facebook", href: "https://m.facebook.com/gradelings" },
    ]);
  });

  it("gives one link for every profile listed today", () => {
    expect(socialLinks().map((l) => l.href).sort()).toEqual([...SOCIAL_PROFILES].sort());
  });
});
