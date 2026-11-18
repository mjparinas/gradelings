import { describe, expect, it } from "vitest";
import { ANDROID_POSTS, allAndroidPaths, androidPath } from "./android";

describe("Android pages", () => {
  it("has unique slugs and addresses ending in a slash", () => {
    const slugs = ANDROID_POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(allAndroidPaths().every((p) => p.path.endsWith("/"))).toBe(true);
    expect(androidPath.post("x")).toBe("/android/x/");
  });

  it("never names the old product name or a price", () => {
    const text = JSON.stringify(ANDROID_POSTS);
    expect(text).not.toMatch(/grademap/i);
    expect(text).not.toMatch(/\$\d/);
  });
});
