import { describe, expect, it } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import { FEATURED_TEACHER_SLUGS, TEACHER_FRAMEWORKS, featuredTeacherFrameworks } from "./teachers";

describe("featured teacher curricula", () => {
  it("only lists regions that exist and can have classes", () => {
    const offered = new Set(TEACHER_FRAMEWORKS.map((f) => f.slug));
    for (const slug of FEATURED_TEACHER_SLUGS) {
      expect(offered.has(slug), `${slug} should be an offered teacher framework`).toBe(true);
    }
    expect(featuredTeacherFrameworks().map((f) => f.slug)).toEqual([...FEATURED_TEACHER_SLUGS]);
    // Never invent a featured slug that is not in the registry.
    expect(FEATURED_TEACHER_SLUGS.every((slug) => FRAMEWORKS.some((f) => f.slug === slug))).toBe(true);
  });
});
