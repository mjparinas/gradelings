import { describe, expect, it } from "vitest";
import { coursesForGrade, lessonsSettled, loadGrade } from "./index";

// Math lessons ship with the grade; the other subjects' lessons follow as a second download that nothing waits for.
describe("lessons in the apps", () => {
  it("adds every subject's lessons once the second download arrives", async () => {
    await loadGrade("4", "ca-bc");
    const unit = (subject: string) => coursesForGrade("4", "ca-bc").find((c) => c.subject === subject)!.units[0];
    expect(unit("math").lesson).toBeDefined();
    await lessonsSettled();
    for (const subject of ["language", "science", "social"]) expect(unit(subject).lesson, subject).toBeDefined();
  });

  it("gives a framework's own units their lessons too", async () => {
    await loadGrade("4", "us-ny");
    await lessonsSettled();
    const units = coursesForGrade("4", "us-ny").flatMap((c) => c.units);
    expect(units.filter((u) => !u.lesson).map((u) => u.id)).toEqual([]);
  });
});
