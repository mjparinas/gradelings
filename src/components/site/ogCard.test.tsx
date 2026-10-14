import { describe, expect, it } from "vitest";
import { GET as pinImage } from "@/app/guides/[framework]/[grade]/[subject]/worksheet/pin.png/route";
import { GET as gradePinImage } from "@/app/guides/[framework]/[grade]/pin.png/route";
import { GET as countCardImage } from "@/app/milestone/count/[kind]/[n]/card.png/route";
import { GET as unitCardImage } from "@/app/milestone/unit/[framework]/[grade]/[subject]/[unit]/[level]/card.png/route";
import WorksheetImage from "@/app/guides/[framework]/[grade]/[subject]/worksheet/opengraph-image";
import CurriculumGradeImage from "@/app/curriculum/[framework]/[grade]/opengraph-image";
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

  it("draws a grade's printable sheets pin with up to six subjects, and only for real grades", async () => {
    const ok = await gradePinImage(new Request("https://x.test/"), { params: Promise.resolve({ framework: "bc", grade: "grade-6" }) });
    expect(await pngSize(ok)).toEqual({ width: 1000, height: 1500 });
    for (const p of [{ framework: "quebec", grade: "grade-6" }, { framework: "bc", grade: "grade-42" }]) {
      expect((await gradePinImage(new Request("https://x.test/"), { params: Promise.resolve(p) })).status).toBe(404);
    }
  }, 30_000);

  it("draws a shared milestone's card at its own .png address, and only for milestones we make", async () => {
    const req = new Request("https://x.test/");
    expect(await pngSize(await countCardImage(req, { params: Promise.resolve({ kind: "days", n: "100" }) }))).toEqual({ width: 1200, height: 630 });
    expect(await pngSize(await unitCardImage(req, { params: Promise.resolve({ framework: "bc", grade: "grade-4", subject: "math", unit: "fractions", level: "2" }) }))).toEqual({ width: 1200, height: 630 });
    expect((await countCardImage(req, { params: Promise.resolve({ kind: "days", n: "101" }) })).status).toBe(404);
    expect((await unitCardImage(req, { params: Promise.resolve({ framework: "bc", grade: "grade-4", subject: "math", unit: "nope", level: "2" }) })).status).toBe(404);
  }, 30_000);

  it("draws link-preview images for worksheets and grade pages", async () => {
    expect(await pngSize(await WorksheetImage({ params: Promise.resolve({ framework: "bc", grade: "grade-2", subject: "language" }) }))).toEqual({ width: 1200, height: 630 });
    expect(await pngSize(await CurriculumGradeImage({ params: Promise.resolve({ framework: "ontario", grade: "grade-4" }) }))).toEqual({ width: 1200, height: 630 });
  }, 30_000);

  it("shrinks long titles", () => {
    expect(titleSize("Grade 4 Math")).toBeGreaterThan(titleSize("Grade 4 English Language Arts help at home, with tips"));
  });
});
