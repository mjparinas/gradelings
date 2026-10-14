import type { Unit } from "../../types";
import { SCIENCE_4 as washingtonScience4 } from "../../washington/units/science-35";
import { units as manitobaG4Science } from "../../manitoba/units/g4-more-science";
import { units as ontarioG5ScienceUnits } from "../../ontario/g5-science";
import { units as ontarioG4ScienceUnits } from "../../ontario/g4-science";
import { SCIENCE_4 as texasScience4 } from "../../texas/units/science-4";
import { weather as manitobaWeather } from "../../manitoba/units/g5-science";
import { SCIENCE_COPIES as oregonCopies } from "../../oregon/units/science-copies";
import { peErosion4 } from "../../prince-edward-island/units/g4-science-social";

// The units Alabama's Grade 4 science course copies from other frameworks (see ../plan/science.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...washingtonScience4,
  ...manitobaG4Science,
  ...ontarioG5ScienceUnits,
  ...ontarioG4ScienceUnits,
  ...texasScience4,
  manitobaWeather,
  ...(oregonCopies["4"] ?? []),
  peErosion4,
];
