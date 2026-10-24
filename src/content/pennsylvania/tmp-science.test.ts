import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

const pa = COURSES.filter((c) => c.subject === "science").flatMap((c) => c.units.filter((u) => u.standards["us-pa"]).map((u) => ({ c, u, key: `${c.grade}/${u.id}` })));
const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3, 4, 5].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));
describe("tmp", () => {
  it("other state / tribes", () => {
    const hits: string[] = [];
    for (const { u, key } of pa) {
      const lines = [u.title, u.blurb, u.id.startsWith("pa-") ? "" : "", ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");
      const hit = lines.find((l) => OTHER_STATE.test(l.replace(/(George|Martha) Washington/g, "")));
      if (hit && !u.id.startsWith("pa-")) hits.push(`${key}: ${hit.slice(0, 120)}`);
      const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
      if (/\b(Tribes?|Tribal)\b|California Indian/.test(text) && /^(wa|or|ca|ny|tx|mn|me|ak|al|az|ar)-/.test(u.id)) hits.push(`${key}: TRIBAL`);
    }
    expect(hits).toEqual([]);
  });
});
