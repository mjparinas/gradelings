import type { Course } from "../types";
import type { Pool } from "../placement";
import { G1_UNITS as mat0 } from "../washington/units/math-early";
import { units as mat1 } from "../alberta/g1-math";
import { THREE_ADDENDS_1 as mat2 } from "../california/units/math-g1";
import { units as mat3 } from "../ontario/g1-math";
import { units as lan0 } from "../ontario/g1-language";
import { LANGUAGE_1 as lan1 } from "../california/units/language-g1";
import { RML_1 as lan2 } from "../washington/units/language-rml-early";
import { STORY_OR_FACTS as lan3 } from "../oregon/units/language-reading";
import { SCIENCE_1 as sci0 } from "../washington/units/science-k2";
import { SCIENCE_1 as sci1 } from "../california/units/science-g1";
import { course as sci2 } from "../grades/k/science";
import { SCIENCE_1 as sci3 } from "../texas/units/science-1";
import { units as soc0 } from "../ontario/g1-social";
import { SOCIAL_1 as soc1 } from "../georgia/units/social-k2";
import { OWN_SOCIAL_1 as soc2 } from "../washington/units/social-k4-g1";
import { SOCIAL_1 as soc3 } from "../california/units/social-g1";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-g1";

// Missouri Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...mat0, ...mat1, mat2, ...mat3],
  language: [...lan0, ...lan1, lan2, lan3],
  science: [...sci0, ...sci1, ...sci2.units, ...sci3],
  social: [...soc0, ...soc1, ...soc2, ...soc3],
};

export const courses: Course[] = missouriGrade("1", POOL, OWN);
