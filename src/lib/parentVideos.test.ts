import { existsSync, readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";

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
});
