import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HELP_VIDEOS, helpVideoFor, videoStats } from "./videoHelp";
import type { AppEvent } from "./model";

const H = 3_600_000;
const NOW = Date.UTC(2026, 10, 1, 12);
const video = (id: string, unit: string, ago: number, profileId = "a"): AppEvent => ({ type: "video", id, unit, video: "v", watched: 8, done: true, profileId, t: NOW - ago * H });
const answer = (id: string, unit: string, ago: number, correct: boolean, profileId = "a"): AppEvent =>
  ({ type: "answer", id, unit, correct, attempts: 1, revealed: false, ms: 1000, mode: "practice", profileId, t: NOW - ago * H }) as AppEvent;

describe("help video catalogue", () => {
  it("has real files and captions for every video", () => {
    for (const [unit, v] of Object.entries(HELP_VIDEOS)) {
      expect(unit.split("/")).toHaveLength(3);
      expect(existsSync(`public${v.src}`)).toBe(true);
      expect(readFileSync(`public${v.captions}`, "utf8").startsWith("WEBVTT")).toBe(true);
      expect(v.seconds).toBeGreaterThanOrEqual(30);
      expect(v.seconds).toBeLessThanOrEqual(90);
      expect(existsSync(`scripts/help-videos/narration/${v.id}.txt`)).toBe(true);
    }
  });
  it("has captions that match the narration word for word, and narration that names no region or money", () => {
    for (const v of Object.values(HELP_VIDEOS)) {
      const narration = readFileSync(`scripts/help-videos/narration/${v.id}.txt`, "utf8").split(/\s+/).filter(Boolean).join(" ");
      const cues = readFileSync(`public${v.captions}`, "utf8").split("\n").filter((l) => l && l !== "WEBVTT" && !l.includes("-->"));
      expect(cues.join(" ")).toBe(narration);
      expect(narration).not.toMatch(/\$|dollar|cent|province|state|Canad|American|coin/i);
    }
  });
  it("looks videos up by unit key", () => {
    expect(helpVideoFor("3/math/fractions")?.id).toBe("fractions-equal-parts");
    expect(helpVideoFor("3/math/nothing")).toBeUndefined();
  });
});

describe("videoStats", () => {
  it("counts videos and how the next answer on the same unit went", () => {
    const events = [video("1", "3/math/fractions", 10), answer("2", "3/math/fractions", 9, true), video("3", "3/math/time", 5), answer("4", "3/math/time", 4, false)];
    expect(videoStats(events, "a", NOW)).toMatchObject({ watched: 2, followed: 2, right: 1 });
  });
  it("ignores other children, other units, old answers, facts and resets", () => {
    const events = [
      video("1", "3/math/fractions", 10),
      answer("2", "3/math/time", 9, true),
      answer("3", "3/math/fractions", 8, true, "b"),
      video("4", "3/math/money", 960),
      video("5", "3/math/time", 80, "b"),
    ];
    expect(videoStats(events, "a", NOW)).toMatchObject({ watched: 1, followed: 0, right: 0, units: ["3/math/fractions"] });
    expect(videoStats(events, "a", NOW, NOW - H).watched).toBe(0);
  });
  it("doesn't count an answer more than a day later", () => {
    expect(videoStats([video("1", "3/math/time", 40), answer("2", "3/math/time", 2, true)], "a", NOW).followed).toBe(0);
  });
});
