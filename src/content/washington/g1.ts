import type { Course } from "../types";
import type { Pool } from "../placement";
import { countingUnit as albertaG1MathCountingUnit } from "../alberta/g1-math";
import { halvesUnit as albertaG1MathHalvesUnit } from "../alberta/g1-math";
import { numbersTo100Unit as albertaG1MathNumbersTo100Unit } from "../alberta/g1-math";
import { units as ontarioG1Language } from "../ontario/g1-language";
import { units as ontarioG1Math } from "../ontario/g1-math";
import { units as ontarioG1Social } from "../ontario/g1-social";
import { washingtonGrade } from "./kit";
import { OWN } from "./units/own-g1";

// Washington Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...ontarioG1Math],
  language: [...ontarioG1Language],
  social: [...ontarioG1Social],
};

export const courses: Course[] = washingtonGrade("1", POOL, OWN);
