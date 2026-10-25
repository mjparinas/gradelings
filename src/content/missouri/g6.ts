import type { Course } from "../types";
import type { Pool } from "../placement";
import { G6_UNITS as mat0 } from "../washington/units/math-upper";
import { MATH_6 as mat1 } from "../california/units/math-g6";
import { units as mat2 } from "../ontario/g6-math";
import { units as mat3 } from "../alberta/g6-math";
import { RML_6 as lan0 } from "../washington/units/language-rml-upper";
import { LANGUAGE_6 as lan1 } from "../california/units/language-g6";
import { units as lan2 } from "../ontario/g6-language";
import { SPELLING_6 as lan3 } from "../washington/units/language-spelling";
import { SCIENCE_6 as sci0 } from "../washington/units/science-68";
import { senses as sci1 } from "../new-brunswick/units/g6-science";
import { OWN_SCIENCE as sci2 } from "../california/units/science-g6";
import { units as sci3 } from "../ontario/g8-science";
import { SOCIAL_7 as soc0 } from "../georgia/units/social-g67";
import { SOCIAL_COPIES as soc1 } from "../georgia/units/copies-g7";
import { SOCIAL_6 as soc2 } from "../georgia/units/social-g67";
import { units as soc3 } from "../ontario/g8-social";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-g6";

// Missouri Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...mat0, ...mat1, ...mat2, ...mat3],
  language: [...lan0, ...lan1, ...lan2, lan3],
  science: [...sci0, sci1, ...sci2, ...sci3],
  social: [...soc0, ...soc1, ...soc2, ...soc3],
};

export const courses: Course[] = missouriGrade("6", POOL, OWN);
