import type { Course, GenerateOptions, Question } from "../types";

// A few units mix in questions of the newer kinds (match, select-all, highlight, find-the-mistake, fill, tiles) so
// practice doesn't feel like the same tap over and over. A unit listed in a grade's `RICH` map keeps every question
// it had and swaps in 1 or 2 of these at fixed spots. Keys are "subject/unit-id", like lessons.

export type RichSource = (opts?: GenerateOptions) => Question[];
export type GradeRich = Record<string, RichSource>;

const SPOTS = [2, 5];

export function withRich(courses: Course[], rich: GradeRich): Course[] {
  return courses.map((c) => ({
    ...c,
    units: c.units.map((u) => {
      const source = rich[`${c.subject}/${u.id}`];
      if (!source) return u;
      return {
        ...u,
        generate: (opts?: GenerateOptions) => {
          const base = u.generate(opts);
          const extra = source(opts);
          if (base.length < 4) return base;
          const out = [...base];
          extra.forEach((q, i) => {
            out[Math.min(SPOTS[i] ?? SPOTS[SPOTS.length - 1] + i, out.length - 1)] = q;
          });
          return out;
        },
      };
    }),
  }));
}
