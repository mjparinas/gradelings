import { describe, expect, it } from "vitest";
import { getFramework } from "@/content/frameworks";
import { APP_NAME } from "./brand";
import { pageMeta } from "./pageMeta";

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
});
