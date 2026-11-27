import { describe, expect, it } from "vitest";
import { FRAMEWORKS } from "@/content/frameworks";
import { theCurriculum, theCurriculumCapital } from "./curriculumName";

describe("theCurriculum", () => {
  it("adds the only where the name has none", () => {
    expect(theCurriculum("Ontario Curriculum")).toBe("the Ontario Curriculum");
    expect(theCurriculum("the New Jersey Student Learning Standards")).toBe("the New Jersey Student Learning Standards");
    expect(theCurriculum("Wisconsin's academic standards")).toBe("Wisconsin's academic standards");
    expect(theCurriculum("Ohio’s Learning Standards")).toBe("Ohio’s Learning Standards");
    expect(theCurriculum("Nebraska's College and Career Ready Standards")).toBe("Nebraska's College and Career Ready Standards");
  });
  it("capitalizes for the start of a sentence", () => {
    expect(theCurriculumCapital("Ontario Curriculum")).toBe("The Ontario Curriculum");
    expect(theCurriculumCapital("Wisconsin's academic standards")).toBe("Wisconsin's academic standards");
  });
  it("never doubles the article or puts it before a possessive, for any framework", () => {
    for (const f of FRAMEWORKS) {
      const t = theCurriculum(f.curriculumName);
      expect(t, f.id).not.toMatch(/^the the /i);
      expect(t, f.id).not.toMatch(/^the \S+['’]s /i);
    }
  });
});
