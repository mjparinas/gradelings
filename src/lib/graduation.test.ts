// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { graduatedFrom, rememberGrade } from "./graduation";

beforeEach(() => localStorage.clear());

describe("graduatedFrom", () => {
  it("says nothing the first time a device sees a child, then remembers the grade", () => {
    expect(graduatedFrom("p1", "4")).toBeNull();
    expect(localStorage.getItem("gradelings.grad.p1")).toBe("4");
    expect(graduatedFrom("p1", "4")).toBeNull();
  });
  it("names the grade just finished after a move up, until it is remembered", () => {
    rememberGrade("p1", "4");
    expect(graduatedFrom("p1", "5")).toBe("4");
    expect(graduatedFrom("p1", "5")).toBe("4");
    rememberGrade("p1", "5");
    expect(graduatedFrom("p1", "5")).toBeNull();
  });
  it("counts Kindergarten to Grade 1 and Pre-K to Kindergarten, but not a move back down", () => {
    rememberGrade("p1", "k");
    expect(graduatedFrom("p1", "1")).toBe("k");
    rememberGrade("p2", "pk");
    expect(graduatedFrom("p2", "k")).toBe("pk");
    rememberGrade("p3", "5");
    expect(graduatedFrom("p3", "4")).toBeNull();
    expect(localStorage.getItem("gradelings.grad.p3")).toBe("4");
  });
  it("keeps children apart", () => {
    rememberGrade("p1", "2");
    expect(graduatedFrom("p2", "3")).toBeNull();
  });
});
