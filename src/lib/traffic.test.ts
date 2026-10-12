import { describe, expect, it } from "vitest";
import { changeText, isPeriod, pathOf, periodDates } from "./traffic";

describe("traffic helpers", () => {
  const now = Date.UTC(2026, 9, 12, 23, 30);
  it("works out the period and the one before, in UTC days", () => {
    expect(periodDates(7, now)).toEqual({ start: "2026-10-06", end: "2026-10-12", prevStart: "2026-09-29", prevEnd: "2026-10-05" });
    expect(periodDates(28, now, 3)).toEqual({ start: "2026-09-12", end: "2026-10-09", prevStart: "2026-08-15", prevEnd: "2026-09-11" });
  });
  it("only takes the offered periods", () => {
    expect([7, 28, 90].every(isPeriod)).toBe(true);
    expect(isPeriod(30)).toBe(false);
  });
  it("describes the change on the period before", () => {
    expect(changeText(120, 100, 28)).toBe("up 20% on the 28 days before");
    expect(changeText(50, 100, 7)).toBe("down 50% on the 7 days before");
    expect(changeText(100, 100, 7)).toBe("same as the 7 days before");
    expect(changeText(5, 0, 7)).toBe("none in the 7 days before");
    expect(changeText(0, 0, 7)).toBe("");
  });
  it("shows page URLs as paths", () => {
    expect(pathOf("https://www.example.com/guides/bc/grade-4/")).toBe("/guides/bc/grade-4/");
    expect(pathOf("https://www.example.com/curriculum/bc/%C3%A9t%C3%A9/?x=1")).toBe("/curriculum/bc/été/?x=1");
    expect(pathOf("not a url")).toBe("not a url");
  });
});
