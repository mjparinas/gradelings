import { describe, expect, it } from "vitest";
import { gradeLabel } from "./gradeLabel";

describe("gradeLabel", () => {
  it("says grades the Canadian way for a province, and by default", () => {
    expect(gradeLabel("4", "ca-bc")).toBe("Grade 4");
    expect(gradeLabel("9", "ca-on")).toBe("Grade 9");
    expect(gradeLabel("1")).toBe("Grade 1");
    expect(gradeLabel("k", "ca-ab")).toBe("Kindergarten");
  });

  it("says grades the US way for Washington", () => {
    expect(gradeLabel("1", "us-wa")).toBe("1st grade");
    expect(gradeLabel("2", "us-wa")).toBe("2nd grade");
    expect(gradeLabel("3", "us-wa")).toBe("3rd grade");
    expect(gradeLabel("4", "us-wa")).toBe("4th grade");
    expect(gradeLabel("k", "us-wa")).toBe("Kindergarten");
  });
});
