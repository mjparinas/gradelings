import { writeFileSync } from "node:fs";
import { it } from "vitest";
import { COURSES } from "../all";
import { questionText } from "../locale";
import { withSeed } from "../random";
import type { Question } from "../types";
import { OTHER_STATE } from "./units/kit";

const sampleOf = (generate: (o: { difficulty: 1 | 2 | 3 }) => Question[]) =>
  [1, 2, 3, 4, 5].flatMap((seed) => ([1, 2, 3] as const).flatMap((difficulty) => withSeed(seed * 101 + difficulty, () => generate({ difficulty }))));
it("dump", () => {
  const res: Record<string, string> = {};
  for (const c of COURSES) {
    if (c.subject !== "science") continue;
    for (const u of c.units) {
      if (res[u.id] !== undefined && res[u.id] !== "") continue;
      let bad = "";
      try {
        const lines = [u.title, u.blurb, ...sampleOf((o) => u.generate(o)).map(questionText)].join("\n").split("\n");
        const hit = lines.find((l) => OTHER_STATE.test(l.replace(/(George|Martha) Washington/g, "")));
        if (hit) bad = hit.slice(0, 80);
        const text = sampleOf((o) => u.generate(o)).map(questionText).join("\n");
        if (!bad && /\b(Tribes?|Tribal)\b|California Indian/.test(text)) bad = "TRIBAL";
      } catch (e) { bad = "ERR " + String(e).slice(0, 40); }
      res[u.id] = bad;
    }
  }
  writeFileSync("/tmp/claude-0/-home-user-gradelings/3fc40b61-f450-57f1-afc3-f4a17cdb4344/scratchpad/sci/clean.json", JSON.stringify(res));
});
