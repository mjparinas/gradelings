import { describe, expect, it } from "vitest";
import { GET as pinImage } from "@/app/guides/[framework]/[grade]/[subject]/worksheet/pin.png/route";
import { ogCard, pinCard, titleSize } from "./ogCard";
import { countMilestoneCard, unitCard, worksheetCard } from "./ogText";

// Width and height from a PNG's IHDR chunk.
async function pngSize(res: Response) {
  const buf = Buffer.from(await res.arrayBuffer());
  expect(buf.subarray(1, 4).toString()).toBe("PNG");
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe("share images", () => {
  it("draws a question card and a milestone card at link-preview size, in our own fonts", async () => {
    expect(await pngSize(await ogCard(unitCard({ framework: "bc", grade: "grade-4", subject: "math", unit: "fractions" })!))).toEqual({ width: 1200, height: 630 });
    expect(await pngSize(await ogCard(countMilestoneCard({ kind: "right", n: "100" })!))).toEqual({ width: 1200, height: 630 });
  }, 30_000);

  it("draws the tall Pinterest card, and only for real worksheets", async () => {
    expect(await pngSize(await pinCard(worksheetCard({ framework: "bc", grade: "grade-2", subject: "language" })!))).toEqual({ width: 1000, height: 1500 });
    const ok = await pinImage(new Request("https://x.test/"), { params: Promise.resolve({ framework: "ontario", grade: "grade-3", subject: "math" }) });
    expect(ok.headers.get("content-type")).toBe("image/png");
    const missing = await pinImage(new Request("https://x.test/"), { params: Promise.resolve({ framework: "quebec", grade: "grade-3", subject: "math" }) });
    expect(missing.status).toBe(404);
  }, 30_000);

  it("shrinks long titles", () => {
    expect(titleSize("Grade 4 Math")).toBeGreaterThan(titleSize("Grade 4 English Language Arts help at home, with tips"));
  });
});
