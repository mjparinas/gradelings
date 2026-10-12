import { describe, expect, it } from "vitest";
import type { FamilyInfo } from "./model";
import { askToSaveProgress } from "./saveNudge";

const NOW = 1_800_000_000_000;
const DAY = 86_400_000;
const family = (over: Partial<FamilyInfo> = {}): FamilyInfo => ({ plan: "trial", trialEndsAt: NOW + 20 * DAY, updatedAt: 1, ...over });

describe("asking a grown-up to save progress", () => {
  it("asks after the first finished lesson", () => {
    expect(askToSaveProgress(family(), 1, 1, NOW)).toBe(true);
    expect(askToSaveProgress(family(), 2, 1, NOW)).toBe(false);
  });

  it("asks once a day in the last week of the trial", () => {
    const ending = family({ trialEndsAt: NOW + 5 * DAY });
    expect(askToSaveProgress(ending, 9, 1, NOW)).toBe(true);
    expect(askToSaveProgress(ending, 10, 2, NOW)).toBe(false);
  });

  it("stops asking once the trial is over, so the free plan isn't nagged", () => {
    expect(askToSaveProgress(family({ trialEndsAt: NOW - DAY }), 9, 1, NOW)).toBe(false);
  });

  it("never asks once there is an account", () => {
    expect(askToSaveProgress(family({ account: { email: "p@example.com", familyId: "f", verified: false } }), 1, 1, NOW)).toBe(false);
  });
});
