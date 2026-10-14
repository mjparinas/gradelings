import { describe, expect, it } from "vitest";
import { CTA_EVENTS, ctaEvent } from "./ctaEvents";

describe("ctaEvent", () => {
  it("counts a trial link with the page it was on, deep links included", () => {
    expect(ctaEvent("/play/", "https://gradelings.com/")).toEqual({ name: CTA_EVENTS.trial, from: "/" });
    expect(ctaEvent("/play/#/start?framework=ca-on&grade=2", "https://gradelings.com/curriculum/ontario/grade-2/?x=1")).toEqual({ name: CTA_EVENTS.trial, from: "/curriculum/ontario/grade-2/" });
  });

  it("counts a Subscribe link", () => {
    expect(ctaEvent("/parents/#/subscription", "https://gradelings.com/pricing/")).toEqual({ name: CTA_EVENTS.subscribe, from: "/pricing/" });
  });

  it("ignores other links and anything clicked inside the apps", () => {
    expect(ctaEvent("/pricing/", "https://gradelings.com/")).toBeNull();
    expect(ctaEvent("/playground/", "https://gradelings.com/")).toBeNull();
    expect(ctaEvent(null, "https://gradelings.com/")).toBeNull();
    expect(ctaEvent("/play/", "https://gradelings.com/parents/#/account")).toBeNull();
    expect(ctaEvent("/parents/#/subscription", "https://gradelings.com/play/")).toBeNull();
  });
});
