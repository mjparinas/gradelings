import { describe, expect, it } from "vitest";
import { getFramework } from "@/content/frameworks";
import { APP_NAME } from "./brand";
import { TITLE_MAX, TITLE_SUFFIX, fitTitle, pageMeta } from "./pageMeta";

describe("pageMeta", () => {
  it("gives a page its own canonical link and Open Graph title, description and URL", () => {
    const m = pageMeta({ title: "Grade 4 Math", description: "What kids learn.", path: "/curriculum/bc/grade-4/math/", framework: getFramework("ca-bc") });
    expect(m.alternates).toEqual({ canonical: "/curriculum/bc/grade-4/math/" });
    expect(m.openGraph).toEqual({ type: "website", siteName: APP_NAME, locale: "en_CA", title: "Grade 4 Math", description: "What kids learn.", url: "/curriculum/bc/grade-4/math/" });
  });

  it("marks a US state's pages as US English", () => {
    expect(pageMeta({ title: "T", description: "D", path: "/guides/oregon/", framework: getFramework("us-or") }).openGraph).toEqual(expect.objectContaining({ locale: "en_US" }));
    expect(pageMeta({ title: "T", description: "D", path: "/pricing/" }).openGraph).toEqual(expect.objectContaining({ locale: "en_CA" }));
  });

  it("uses an absolute title as is, and a separate title for shared links when given", () => {
    const m = pageMeta({ title: { absolute: "Home page" }, description: "D", path: "/", type: "article", shareTitle: "Share me" });
    expect(m.title).toEqual({ absolute: "Home page" });
    expect(m.openGraph).toEqual(expect.objectContaining({ type: "article", title: "Share me" }));
  });

  it("picks the fullest candidate title that fits, with the site name when there is room", () => {
    const long = "x".repeat(TITLE_MAX - TITLE_SUFFIX.length + 1);
    expect(fitTitle(["Grade 4 Math practice (BC)", "Grade 4 Math"])).toBe("Grade 4 Math practice (BC)");
    expect(fitTitle([long, "Grade 4 Math"])).toEqual({ absolute: long });
    expect(fitTitle(["y".repeat(TITLE_MAX + 1), "Grade 4 Math"])).toBe("Grade 4 Math");
    const cut = fitTitle([`${"word ".repeat(20)}end`]) as { absolute: string };
    expect(cut.absolute.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(cut.absolute).toMatch(/word…$/);
  });

  it("shares the fullest candidate title in links", () => {
    const m = pageMeta({ title: ["y".repeat(TITLE_MAX + 1), "Short"], description: "D", path: "/" });
    expect(m.title).toBe("Short");
    expect(m.openGraph).toEqual(expect.objectContaining({ title: "y".repeat(TITLE_MAX + 1) }));
  });
});
