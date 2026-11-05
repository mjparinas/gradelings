import { existsSync, readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PARENT_TAB_VIDEOS, PARENT_VIDEOS } from "./trainingVideos";

// How-to videos for the parent area, recorded from the real app by scripts/help-videos/screens.py (docs/video-help/README.md).
const spec = JSON.parse(readFileSync("scripts/help-videos/screens/parent.json", "utf8")) as { videos: { id: string; title: string; steps: { say: string }[] }[] };

describe("parent how-to videos", () => {
  it("has a video, captions and narration for every spec", () => {
    expect(spec.videos.length).toBeGreaterThan(0);
    for (const v of spec.videos) {
      expect(existsSync(`public/videos/parents/${v.id}.mp4`), v.id).toBe(true);
      expect(statSync(`public/videos/parents/${v.id}.mp4`).size).toBeLessThan(1_500_000);
      expect(readFileSync(`public/videos/parents/${v.id}.vtt`, "utf8").startsWith("WEBVTT")).toBe(true);
    }
  });
  it("has captions that match the narration word for word", () => {
    for (const v of spec.videos) {
      const narration = v.steps.map((s) => s.say).join(" ").split(/\s+/).join(" ");
      const file = readFileSync(`scripts/help-videos/narration/${v.id}.txt`, "utf8").split(/\s+/).filter(Boolean).join(" ");
      const cues = readFileSync(`public/videos/parents/${v.id}.vtt`, "utf8").split("\n").filter((l) => l && l !== "WEBVTT" && !l.includes("-->"));
      expect(file, v.id).toBe(narration);
      expect(cues.join(" "), v.id).toBe(narration);
    }
  });
  it("never names a price or payment, so every video can show in the store apps", () => {
    for (const v of spec.videos) expect(v.steps.map((s) => s.say).join(" ")).not.toMatch(/\$|\b(price|pay|payment|subscribe|subscription|dollars?)\b/i);
  });

  it("lists every recorded video in the shared library, with a title and length that match", () => {
    expect(PARENT_VIDEOS.map((v) => v.id).sort()).toEqual(spec.videos.map((v) => v.id).sort());
    for (const v of PARENT_VIDEOS) {
      expect(v.title, v.id).toBe(spec.videos.find((s) => s.id === v.id)?.title);
      expect(v.src).toBe(`/videos/parents/${v.id}.mp4`);
      expect(v.captions).toBe(`/videos/parents/${v.id}.vtt`);
      const last = readFileSync(`public/videos/parents/${v.id}.vtt`, "utf8").match(/--> (\d+):(\d+\.\d+)/g)?.pop() ?? "";
      const [, m, sec] = last.match(/(\d+):(\d+\.\d+)/) ?? [];
      expect(Math.abs(v.seconds - (Number(m) * 60 + Number(sec))), v.id).toBeLessThan(4);
      expect(`${v.title} ${v.blurb}`).not.toMatch(/\$|\b(price|pay|payment|subscribe|subscription)\b/i);
    }
    expect(new Set(PARENT_VIDEOS.map((v) => v.id)).size).toBe(PARENT_VIDEOS.length);
  });
  it("points each section at a video that exists", () => {
    for (const id of Object.values(PARENT_TAB_VIDEOS)) expect(PARENT_VIDEOS.some((v) => v.id === id), id).toBe(true);
  });
});
