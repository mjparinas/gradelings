import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { flagDef } from "./flags";
import { FEATURE_EMAILS, FEATURE_IDS } from "./featureSeries";
import { parseSeriesConfig, SERIES_DEFAULT_CAP, validSeriesCap } from "./featureSeriesRules";

// Ids are what a family's email log records, so they never change. New emails are added to the end of the list
// below (and to the series), never in the middle of what has been sent.
const FROZEN = [
  "adventure", "android-app", "report-card-levels", "read-aloud", "parent-reports", "quests-streaks", "stickers", "offline", "calm-mode", "reading-support",
  "daily-challenge", "math-facts", "weekly-report", "stories", "adaptive-reading", "my-room", "trophies", "arcade", "first-try", "placement", "review-speed",
  "practice-sheets", "challenge-star", "accessible", "goal-plan", "rewards", "report-card-talk", "explore", "brain-break", "buddy", "weekly-recap", "homework",
  "second-adult", "children", "privacy", "seasons", "mystery", "french", "little-kids", "rhymes", "story-problems", "articles", "worksheets", "year-review",
  "homeschool", "videos",
];

const text = (e: (typeof FEATURE_EMAILS)[number]) => [e.subject, e.preheader, e.title, e.intro, ...e.points, e.dyk, e.button.label, e.alt].join("\n");

describe("the feature emails", () => {
  it("never lose an id that has been sent", () => {
    for (const id of FROZEN) expect(FEATURE_IDS, id).toContain(id);
  });

  it("have a unique id, subject and title each, so no family gets the same email twice", () => {
    expect(new Set(FEATURE_IDS).size).toBe(FEATURE_EMAILS.length);
    expect(new Set(FEATURE_EMAILS.map((e) => e.subject)).size).toBe(FEATURE_EMAILS.length);
    expect(new Set(FEATURE_EMAILS.map((e) => e.title)).size).toBe(FEATURE_EMAILS.length);
  });

  it("are about a month and a half of daily emails or more", () => {
    expect(FEATURE_EMAILS.length).toBeGreaterThanOrEqual(45);
  });

  it("are concise: a short subject, 3 to 5 points, and one clear button", () => {
    for (const e of FEATURE_EMAILS) {
      expect(e.subject.length, e.id).toBeLessThanOrEqual(60);
      expect(e.preheader.length, e.id).toBeLessThanOrEqual(100);
      expect(e.points.length, e.id).toBeGreaterThanOrEqual(3);
      expect(e.points.length, e.id).toBeLessThanOrEqual(5);
      expect(text(e).split(/\s+/).length, e.id).toBeLessThan(190);
      expect(e.button.path, e.id).toMatch(/^(\/|https:\/\/)/);
    }
  });

  it("name the Family plan in every paid email, and say what is free in the mixed ones", () => {
    for (const e of FEATURE_EMAILS) {
      if (e.tier === "plan") expect(e.points.join(" "), e.id).toMatch(/Family plan/);
      if (e.tier === "both") expect(e.points.join(" "), e.id).toMatch(/Family plan/);
      if (e.tier === "free") expect(e.points.join(" "), e.id).not.toMatch(/part of the Family plan/);
    }
    // A healthy mix: plenty free, and a good share that shows why the plan is worth it.
    const share = (t: string) => FEATURE_EMAILS.filter((e) => e.tier === t).length;
    expect(share("plan") + share("both")).toBeGreaterThanOrEqual(12);
    expect(share("free")).toBeGreaterThanOrEqual(20);
  });

  it("never type a price or the old name", () => {
    for (const e of FEATURE_EMAILS) {
      const t = text(e);
      expect(t, e.id).not.toMatch(/\$\s?\d|US\$/);
      expect(t, e.id).not.toMatch(/grademap/i);
      expect(t, e.id).not.toMatch(/Kindergarten to Grade 9|K-9|Pre-K-9/);
    }
  });

  it("make no health, mark or certification claims", () => {
    for (const e of FEATURE_EMAILS) {
      const t = text(e);
      expect(t, e.id).not.toMatch(/\b(cure|treat|therapy|diagnos|clinically|guarantee|certified|compliant|fully accessible)\b/i);
      expect(t, e.id).not.toMatch(/better grades|higher marks|boost your child's grade/i);
    }
  });

  it("use only flags that exist", () => {
    for (const e of FEATURE_EMAILS) if (e.flag) expect(flagDef(e.flag), e.id).toBeDefined();
  });

  it("each have a screenshot of the real app, and a description of it", () => {
    for (const e of FEATURE_EMAILS) {
      expect(existsSync(join(process.cwd(), "public", "email", "features", `${e.id}-v1.jpg`)), `${e.id}-v1.jpg`).toBe(true);
      expect(e.alt.length, e.id).toBeGreaterThan(10);
      expect(e.shot.hash, e.id).toMatch(/^#\//);
    }
  });
});

describe("the series settings", () => {
  it("start off, with the default limit, and survive bad stored values", () => {
    expect(parseSeriesConfig(null)).toEqual({ on: false, dailyCap: SERIES_DEFAULT_CAP, onBy: null, onAt: null });
    expect(parseSeriesConfig("{nope").on).toBe(false);
    expect(parseSeriesConfig(JSON.stringify({ on: true, dailyCap: 9999, onBy: 1, onAt: "x" }))).toEqual({ on: true, dailyCap: SERIES_DEFAULT_CAP, onBy: null, onAt: null });
    expect(parseSeriesConfig(JSON.stringify({ on: true, dailyCap: 40, onBy: "a@b.c", onAt: 5 }))).toEqual({ on: true, dailyCap: 40, onBy: "a@b.c", onAt: 5 });
  });
  it("limit the daily cap to a sensible number", () => {
    expect([0, 1, 500, 501, 1.5, "3"].map(validSeriesCap)).toEqual([false, true, true, false, false, false]);
  });
});
