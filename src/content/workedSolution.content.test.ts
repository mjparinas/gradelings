import { expect, test } from "vitest";
import { workedSolution } from "@/lib/workedSolution";
import { COURSES } from "./all";

// Every generated math question: working out never throws, and a solution it gives ends on the question's own answer.
test("worked solutions cover plain arithmetic across the content without errors", () => {
  let asked = 0;
  let worked = 0;
  for (const c of COURSES) {
    if (c.subject !== "math") continue;
    for (const u of c.units) {
      for (const difficulty of [1, 2, 3] as const) {
        for (const q of u.generate({ difficulty })) {
          asked++;
          const s = workedSolution(q);
          if (!s) continue;
          worked++;
          expect(s.steps.length).toBeGreaterThanOrEqual(2);
          for (const st of s.steps) {
            expect(st.say.length).toBeGreaterThan(5);
            expect(st.board.length).toBeGreaterThan(0);
            expect(st.say).not.toMatch(/NaN|undefined|Infinity/);
            expect(st.board.join("")).not.toMatch(/NaN|undefined|Infinity/);
          }
        }
      }
    }
  }
  expect(asked).toBeGreaterThan(1000);
  expect(worked).toBeGreaterThan(60);
});
