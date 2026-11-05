// @vitest-environment jsdom
import { existsSync, readFileSync } from "node:fs";
import { beforeEach, describe, expect, it } from "vitest";
import { hasSeenVideo, markVideoSeen, seenVideos, TEACHER_TAB_VIDEOS, TEACHER_VIDEOS, videoById } from "./trainingVideos";

describe("teacher video catalogue", () => {
  it("has a real file, captions and narration for every video", () => {
    for (const v of TEACHER_VIDEOS) {
      expect(existsSync(`public${v.src}`)).toBe(true);
      expect(readFileSync(`public${v.captions}`, "utf8").startsWith("WEBVTT")).toBe(true);
      expect(existsSync(`scripts/help-videos/narration/${v.id}.txt`)).toBe(true);
      expect(v.seconds).toBeGreaterThanOrEqual(30);
      expect(v.seconds).toBeLessThanOrEqual(90);
    }
  });
  it("has captions that match the narration word for word, naming no real person", () => {
    for (const v of TEACHER_VIDEOS) {
      const narration = readFileSync(`scripts/help-videos/narration/${v.id}.txt`, "utf8").split(/\s+/).filter(Boolean).join(" ");
      const cues = readFileSync(`public${v.captions}`, "utf8").split("\n").filter((l) => l && l !== "WEBVTT" && !l.includes("-->"));
      expect(cues.join(" ")).toBe(narration);
      expect(narration).not.toMatch(/@|https?:/);
    }
  });
  it("has unique ids, and every tab's video exists", () => {
    expect(new Set(TEACHER_VIDEOS.map((v) => v.id)).size).toBe(TEACHER_VIDEOS.length);
    for (const id of Object.values(TEACHER_TAB_VIDEOS)) expect(videoById(TEACHER_VIDEOS, id)).toBeDefined();
  });
});

describe("what a device has seen", () => {
  beforeEach(() => localStorage.clear());
  it("remembers a video once and only once", () => {
    expect(hasSeenVideo("teacher-live")).toBe(false);
    markVideoSeen("teacher-live");
    markVideoSeen("teacher-live");
    expect(hasSeenVideo("teacher-live")).toBe(true);
    expect(seenVideos()).toEqual(["teacher-live"]);
  });
  it("survives broken storage", () => {
    localStorage.setItem("gradelings.trainvideo.seen", "{not json");
    expect(seenVideos()).toEqual([]);
    localStorage.setItem("gradelings.trainvideo.seen", JSON.stringify({ a: 1 }));
    expect(seenVideos()).toEqual([]);
  });
});
