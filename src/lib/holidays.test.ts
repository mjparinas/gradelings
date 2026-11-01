import { describe, expect, it } from "vitest";
import { HOLIDAYS, easterSunday, holidayOn, nthWeekday } from "./holidays";

describe("easterSunday", () => {
  it("matches known dates", () => {
    expect(easterSunday(2024)).toEqual({ month: 3, day: 31 });
    expect(easterSunday(2025)).toEqual({ month: 4, day: 20 });
    expect(easterSunday(2026)).toEqual({ month: 4, day: 5 });
    expect(easterSunday(2027)).toEqual({ month: 3, day: 28 });
    expect(easterSunday(2038)).toEqual({ month: 4, day: 25 });
  });

  it("always lands on a Sunday between March 22 and April 25", () => {
    for (let y = 2020; y <= 2100; y++) {
      const { month, day } = easterSunday(y);
      expect(new Date(y, month - 1, day).getDay()).toBe(0);
      const k = month * 100 + day;
      expect(k).toBeGreaterThanOrEqual(322);
      expect(k).toBeLessThanOrEqual(425);
    }
  });
});

describe("nthWeekday", () => {
  it("finds Canadian and US Thanksgiving in 2026", () => {
    expect(nthWeekday(2026, 10, 1, 2)).toBe(12);
    expect(nthWeekday(2026, 11, 4, 4)).toBe(26);
  });
});

describe("holidayOn", () => {
  it("starts and ends each window on the right day", () => {
    expect(holidayOn("2026-12-05")?.id).toBe("christmas");
    expect(holidayOn("2026-12-25")?.id).toBe("christmas");
    expect(holidayOn("2026-12-04")).toBeNull();
    expect(holidayOn("2026-12-26")).toBeNull();
    expect(holidayOn("2026-10-13")?.id).toBe("halloween");
    expect(holidayOn("2026-11-01")).toBeNull();
  });

  it("follows Easter around the calendar", () => {
    expect(holidayOn("2026-04-05")?.id).toBe("easter");
    expect(holidayOn("2026-03-19")?.id).toBe("easter");
    expect(holidayOn("2026-03-18")).toBeNull();
    expect(holidayOn("2027-03-28")?.id).toBe("easter");
    expect(holidayOn("2027-04-05")).toBeNull();
  });

  it("uses each country's Thanksgiving", () => {
    expect(holidayOn("2026-10-02", "CA")?.id).toBe("thanksgiving");
    expect(holidayOn("2026-10-02", "US")).toBeNull();
    expect(holidayOn("2026-11-20", "US")?.id).toBe("thanksgiving");
    expect(holidayOn("2026-11-20", "CA")).toBeNull();
  });

  it("lets the nearer holiday win when windows overlap", () => {
    // Canadian Thanksgiving 2026 is Oct 12; Halloween's window started Oct 11; the nearer holiday wins until Thanksgiving is over.
    expect(holidayOn("2026-10-12", "CA")?.id).toBe("thanksgiving");
    expect(holidayOn("2026-10-13", "CA")?.id).toBe("halloween");
  });

  it("gives every holiday a window of two to three weeks and no two holidays on the same day", () => {
    for (const h of HOLIDAYS) {
      expect(h.windowDays).toBeGreaterThanOrEqual(14);
      expect(h.windowDays).toBeLessThanOrEqual(21);
    }
    for (let y = 2026; y <= 2036; y++)
      for (const c of ["CA", "US"] as const) {
        const days = HOLIDAYS.map((h) => JSON.stringify(h.date(y, c)));
        expect(new Set(days).size).toBe(days.length);
      }
  });

  it("ignores a bad day", () => {
    expect(holidayOn("nope")).toBeNull();
  });
});
