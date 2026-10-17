import { describe, expect, it } from "vitest";
import { firstNameOf, gradeFromText, importSummary, isRosterProvider, numberDuplicates, rosterReturnUrl } from "./rostering";
import { rosterAccess, schoolPriceText } from "./schoolPlan";

describe("gradeFromText", () => {
  it("reads a grade field that holds only a grade", () => {
    expect(gradeFromText("K", true)).toBe("k");
    expect(gradeFromText("Kindergarten", true)).toBe("k");
    expect(gradeFromText("04", true)).toBe("4");
    expect(gradeFromText("9", true)).toBe("9");
    expect(gradeFromText("4th", true)).toBe("4");
  });
  it("leaves out grades above 9, pre-kindergarten and nonsense", () => {
    for (const t of ["10", "12", "PreK", "", "Algebra", null, undefined]) expect(gradeFromText(t as string, true)).toBeNull();
  });
  it("needs the word grade in a class name, so a room or period number is never a grade", () => {
    expect(gradeFromText("Grade 4 Math")).toBe("4");
    expect(gradeFromText("Ms. Lee, 3rd grade")).toBe("3");
    expect(gradeFromText("Kindergarten Blue")).toBe("k");
    expect(gradeFromText("Period 3 Math")).toBeNull();
    expect(gradeFromText("Room 4")).toBeNull();
    expect(gradeFromText("Grade 11 Physics")).toBeNull();
  });
});

describe("student names", () => {
  it("keeps a first name only and strips markup", () => {
    expect(firstNameOf("Ava", "Ava Smith")).toBe("Ava");
    expect(firstNameOf("", "Noor Ali Khan")).toBe("Noor");
    expect(firstNameOf("<b>Sam</b>")).toBe("bSam/b");
    expect(firstNameOf(null, null)).toBe("");
    expect(firstNameOf("A".repeat(40))).toHaveLength(20);
  });
  it("numbers students who share a first name", () => {
    expect(numberDuplicates([{ id: "1", name: "Sam" }, { id: "2", name: "Ava" }, { id: "3", name: "sam" }, { id: "4", name: "Sam" }]).map((s) => s.name)).toEqual(["Sam", "Ava", "sam 2", "Sam 3"]);
  });
});

describe("providers and return addresses", () => {
  it("knows the three providers only", () => {
    expect(["google-classroom", "clever", "classlink"].every(isRosterProvider)).toBe(true);
    expect(isRosterProvider("canvas")).toBe(false);
    expect(isRosterProvider("constructor")).toBe(false);
  });
  it("sends the browser back to the teacher area, never elsewhere", () => {
    expect(rosterReturnUrl({ error: "failed" })).toBe("/teachers/?roster_error=failed");
    expect(rosterReturnUrl({ importId: "a b" })).toBe("/teachers/#/import/a%20b");
  });
  it("summarises an import in plain words", () => {
    expect(importSummary({ classId: "c", name: "Room 4", added: 1, alreadyThere: 2, tooMany: 3, noLongerListed: 1, created: false })).toBe(
      "Room 4: 1 student added, 2 already there, 3 left out (a class holds 40), 1 no longer on the list (remove them under Students if they left).",
    );
  });
});

describe("school plan", () => {
  const now = 1_000;
  it("is closed while roster import is off", () => {
    expect(rosterAccess({ rosterFlag: false, planFlag: true, schoolUntil: 9_999, now })).toBe("off");
  });
  it("is open to every teacher while the school plan is off", () => {
    expect(rosterAccess({ rosterFlag: true, planFlag: false, schoolUntil: null, now })).toBe("ok");
  });
  it("needs a current school plan once the plan is on", () => {
    expect(rosterAccess({ rosterFlag: true, planFlag: true, schoolUntil: null, now })).toBe("plan");
    expect(rosterAccess({ rosterFlag: true, planFlag: true, schoolUntil: 500, now })).toBe("plan");
    expect(rosterAccess({ rosterFlag: true, planFlag: true, schoolUntil: 5_000, now })).toBe("ok");
  });
  it("names a price only when there is one", () => {
    expect(schoolPriceText(null)).toBeNull();
    expect(schoolPriceText({ perStudentYear: 400, currency: "CAD" })).toBe("C$4 per student per year");
    expect(schoolPriceText({ perStudentYear: 450, currency: "USD" })).toBe("US$4.50 per student per year");
  });
});
