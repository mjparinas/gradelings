import type { GradeId, Unit } from "../../types";
import { SCIENCE_3, SCIENCE_4, SCIENCE_5 } from "./science-35";
import { SCIENCE_6, SCIENCE_7 } from "./science-68";
import { SCIENCE_COPIES } from "./science-copies";
import { SCIENCE_2, SCIENCE_K } from "./science-k2";

// Oregon-only science units, per grade: Oregon's K–5 engineering standards (no Washington unit covers them), Grade 6
// growth and reproduction (Oregon places MS-LS1-4, MS-LS1-5 and MS-LS3-2 in Grade 6), Oregon versions of the
// Washington units built around Washington places (weather and climate, hazards, energy, water, biodiversity), and
// Oregon copies of Washington units with a few Washington items reworded (./science-copies.ts).
const OWN: Partial<Record<GradeId, Unit[]>> = {
  k: SCIENCE_K,
  "2": SCIENCE_2,
  "3": SCIENCE_3,
  "4": SCIENCE_4,
  "5": SCIENCE_5,
  "6": SCIENCE_6,
  "7": SCIENCE_7,
};

const GRADES: GradeId[] = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const OWN_SCIENCE: Partial<Record<GradeId, Unit[]>> = Object.fromEntries(
  GRADES.map((g) => [g, [...(SCIENCE_COPIES[g] ?? []), ...(OWN[g] ?? [])]]).filter(([, units]) => units.length > 0),
);
