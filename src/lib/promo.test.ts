import { describe, expect, it } from "vitest";
import { blackFriday, countdown, fillPromoText, getPreset, isPromoLink, offerTerm, presetDates, PROMO_LIMITS, PROMO_PRESETS, type PromoOffer } from "./promo";

const offer = (o: Partial<PromoOffer> = {}): PromoOffer => ({ code: "FOUNDER", kind: "discount", percentOff: 33, duration: "forever", months: null, days: null, ...o });

describe("offer wording", () => {
  it("says how long a discount lasts", () => {
    expect(offerTerm(offer())).toBe("for life");
    expect(offerTerm(offer({ duration: "once" }))).toBe("on your first payment");
    expect(offerTerm(offer({ duration: "repeating", months: 3 }))).toBe("for 3 months");
    expect(offerTerm(offer({ duration: "repeating", months: 1 }))).toBe("for 1 month");
    expect(offerTerm(offer({ kind: "access", percentOff: null, duration: null, days: 30 }))).toBe("free for 30 days");
    expect(offerTerm(offer({ kind: "access", percentOff: null, duration: null, days: null }))).toBe("free for life");
  });

  it("fills {percent}, {code} and {for}, and leaves other braces as typed", () => {
    expect(fillPromoText("{percent} off {for} with {code}", offer())).toBe("33% off for life with FOUNDER");
    expect(fillPromoText("Save {pecent}", offer())).toBe("Save {pecent}");
  });
});

describe("presets", () => {
  it("cover the usual sales, and every preset's words fit and name the code", () => {
    for (const id of ["founder", "back-to-school", "black-friday", "christmas", "new-year", "summer", "custom"]) expect(getPreset(id)).toBeTruthy();
    for (const p of PROMO_PRESETS) {
      const words = fillPromoText(p.headline, offer());
      expect(words.length).toBeLessThanOrEqual(PROMO_LIMITS.headline);
      expect(fillPromoText(p.body, offer()).length).toBeLessThanOrEqual(PROMO_LIMITS.body);
      expect(`${p.headline} ${p.body}`).toContain("{code}");
    }
  });

  it("puts Black Friday the day after US Thanksgiving, through Cyber Monday", () => {
    expect(blackFriday(2026).toDateString()).toBe(new Date(2026, 10, 27).toDateString());
    expect(blackFriday(2027).toDateString()).toBe(new Date(2027, 10, 26).toDateString());
    expect(presetDates(getPreset("black-friday")!, new Date(2026, 9, 13))).toEqual({ start: "2026-11-27", end: "2026-11-30" });
  });

  it("picks the next dates: today if a sale is under way, next year once it's over", () => {
    const bts = getPreset("back-to-school")!;
    expect(presetDates(bts, new Date(2026, 6, 1))).toEqual({ start: "2026-08-15", end: "2026-09-15" });
    expect(presetDates(bts, new Date(2026, 8, 1))).toEqual({ start: "2026-09-01", end: "2026-09-15" });
    expect(presetDates(bts, new Date(2026, 9, 13))).toEqual({ start: "2027-08-15", end: "2027-09-15" });
    // New Year runs across the change of year.
    expect(presetDates(getPreset("new-year")!, new Date(2027, 0, 3))).toEqual({ start: "2027-01-03", end: "2027-01-15" });
    expect(presetDates(getPreset("founder")!, new Date(2026, 9, 13))).toEqual({ start: "2026-10-13", end: "2026-11-12" });
  });
});

describe("the banner", () => {
  it("counts down in days, then hours and minutes", () => {
    const now = 1_000_000_000_000;
    expect(countdown(now + 3 * 86_400_000 + 5000, now)).toBe("Ends in 3 days");
    expect(countdown(now + 26 * 3_600_000, now)).toBe("Ends in 26 h 0 min");
    expect(countdown(now + 5 * 3_600_000 + 12 * 60_000, now)).toBe("Ends in 5 h 12 min");
    expect(countdown(now + 4 * 60_000, now)).toBe("Ends in 4 min");
    expect(countdown(now + 10_000, now)).toBe("Ends soon");
  });

  it("only links to pages on the site", () => {
    expect(isPromoLink("/pricing/")).toBe(true);
    expect(isPromoLink("https://example.com/")).toBe(false);
    expect(isPromoLink("//example.com/")).toBe(false);
  });
});
