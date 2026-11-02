import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

// The Google Play listing (docs/PLAY_LISTING.md) and its graphics (store-assets/android/).
const doc = readFileSync("docs/PLAY_LISTING.md", "utf8");
const name = /\*\*App name\*\*[^:]*: `([^`]+)`/.exec(doc)?.[1] ?? "";
const short = /\*\*Short description\*\*[^:]*: `([^`]+)`/.exec(doc)?.[1] ?? "";
const full = /```text\n([\s\S]*?)```/.exec(doc)?.[1] ?? "";

function pngSize(file: string): [number, number] {
  const b = readFileSync(file);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

describe("Play listing text", () => {
  it("fits Play's limits", () => {
    expect(name.length).toBeGreaterThan(0);
    expect(name.length).toBeLessThanOrEqual(30);
    expect(short.length).toBeGreaterThan(0);
    expect(short.length).toBeLessThanOrEqual(80);
    expect(full.length).toBeGreaterThan(500);
    expect(full.length).toBeLessThanOrEqual(4000);
  });
  it("names no price, trial or checkout, because the Android app sells nothing", () => {
    for (const text of [name, short, full]) expect(text).not.toMatch(/\$|\btrial\b|\bsubscri|\bdiscount|\bcheckout|\bStripe\b/i);
  });
  it("makes no promotional claim in the name or short description", () => {
    for (const text of [name, short]) expect(text).not.toMatch(/#1|\bbest\b|\bfree\b|\bnew\b|\bsale\b|download now|\bTeacher Approved\b/i);
  });
  it("keeps the grade range and leaves out Quebec", () => {
    expect(short).toContain("Pre-K to Grade 9");
    expect(full).not.toMatch(/Qu[eé]bec/);
  });
});

describe("Play graphics", () => {
  const dir = "store-assets/android";
  it("has the icon and feature graphic at the sizes Play asks for", () => {
    expect(pngSize(`${dir}/icon-512.png`)).toEqual([512, 512]);
    expect(pngSize(`${dir}/feature-graphic-1024x500.png`)).toEqual([1024, 500]);
  });
  it("has at least 4 screenshots for each device type, sized to Play's rules", () => {
    for (const set of ["phone", "tablet-7", "tablet-10"]) {
      for (const folder of [set, "raw"]) {
        const files = readdirSync(`${dir}/${folder}`).filter((f) => f.startsWith(set + "-") && f.endsWith(".png"));
        expect(files.length, `${folder}/${set}`).toBeGreaterThanOrEqual(4);
        for (const f of files) {
          const [w, h] = pngSize(`${dir}/${folder}/${f}`);
          expect(Math.min(w, h)).toBeGreaterThanOrEqual(320);
          expect(Math.max(w, h)).toBeLessThanOrEqual(3840);
          expect(Math.max(w, h) / Math.min(w, h)).toBeLessThanOrEqual(2);
        }
      }
    }
  });

  it("has a promo video and its poster, small enough to upload to YouTube", () => {
    const video = readFileSync(`${dir}/video/gradelings-play-demo.mp4`);
    expect(video.subarray(4, 8).toString()).toBe("ftyp");
    expect(video.length).toBeLessThan(100 * 1024 * 1024);
    expect(pngSize(`${dir}/video/poster.png`)).toEqual([1920, 1080]);
  });
});
