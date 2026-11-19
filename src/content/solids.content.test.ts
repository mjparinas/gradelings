import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { hashSeed, withSeed } from "./random";
import type { Question, SolidLabels } from "./types";

// Every volume, surface-area and net picture is drawn from the numbers its question uses: each number written on
// an edge must be one the prompt gives, so the picture can't disagree with the words.

function drawn(): { path: string; q: Question; labels: SolidLabels; type: "solid" | "net" }[] {
  const out: { path: string; q: Question; labels: SolidLabels; type: "solid" | "net" }[] = [];
  for (const course of COURSES) {
    if (course.subject !== "math" || !/^[5-9]$/.test(String(course.grade))) continue;
    for (const unit of course.units) {
      for (let s = 0; s < 3; s++)
        for (const difficulty of [1, 2, 3] as const)
          for (const q of withSeed(hashSeed(`solids:${course.grade}:${unit.id}:${s}:${difficulty}`), () => unit.generate({ difficulty }))) {
            const v = q.visual;
            if (v?.type === "solid" || v?.type === "net") out.push({ path: `${course.grade}/${unit.id}`, q, labels: v.labels ?? {}, type: v.type });
          }
    }
  }
  return out;
}

describe("solid and net pictures", () => {
  const all = drawn();

  it("appear in volume, surface-area and net questions, in both forms", () => {
    expect(all.some((d) => d.type === "solid")).toBe(true);
    expect(all.some((d) => d.type === "net")).toBe(true);
    for (const unit of ["6/volume-and-capacity", "7/volume", "8/surface-area-volume", "9/volume-units-9"]) expect(all.some((d) => d.path === unit), unit).toBe(true);
  });

  it("only write numbers the question gives", () => {
    for (const { path, q, labels } of all) {
      const prompt = q.prompt.replace(/(\d) (\d{3})/g, "$1$2");
      for (const text of Object.values(labels)) {
        if (text === "?") continue;
        for (const n of text.match(/\d+(\.\d+)?/g) ?? []) expect(prompt, `${path}: ${n} on the picture of "${q.prompt}"`).toContain(n);
      }
    }
  });

  it("never write the answer where the child must find it", () => {
    for (const { path, q, labels } of all) {
      if (q.kind !== "input") continue;
      // A measurement to find is shown as "?", never as its value.
      for (const text of Object.values(labels)) if (text !== "?") expect(text.trim(), `${path}: ${q.prompt}`).not.toBe(`${q.answer}`);
    }
  });
});
