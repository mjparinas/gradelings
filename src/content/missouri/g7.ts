import type { Course } from "../types";
import type { Pool } from "../placement";
import { G7_UNITS as mat0 } from "../washington/units/math-upper";
import { units as mat1 } from "../ontario/g7-math";
import { MATH_7 as mat2 } from "../california/units/math-g7";
import { units as mat3 } from "../alberta/g7-math";
import { RML_7 as lan0 } from "../washington/units/language-rml-upper";
import { units as lan1 } from "../ontario/g7-language";
import { wordRoots as lan2 } from "../manitoba/units/g7-language";
import { SPELLING_7 as lan3 } from "../washington/units/language-spelling";
import { units as sci0 } from "../ontario/g7-science";
import { OWN_SCIENCE as sci1 } from "../california/units/science-g7";
import { SCIENCE_7 as sci2 } from "../washington/units/science-68";
import { units as sci3 } from "../alberta/g7-science";
import { course as sci4 } from "../grades/g6/science";
import { units as sci5 } from "../alberta/g6-science";
import { course as soc0 } from "../grades/g7/social";
import { G6 as soc1 } from "../washington/units/social-59-g6";
import { course as soc2 } from "../grades/g8/social";
import { SOCIAL_6 as soc3 } from "../california/units/social-g6";
import { SOCIAL_7 as soc4 } from "../california/units/social-g7";
import { UNITS as soc5 } from "../new-york/units/social-g9";
import { OWN_SOCIAL_7 as soc6 } from "../oregon/units/social-g67";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-g7";

// Missouri Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...mat0, ...mat1, ...mat2, ...mat3],
  language: [...lan0, ...lan1, lan2, lan3],
  science: [...sci0, ...sci1, ...sci2, ...sci3, ...sci4.units, ...sci5],
  social: [...soc0.units, ...soc1, ...soc2.units, ...soc3, ...soc4, ...soc5, ...soc6],
};

export const courses: Course[] = missouriGrade("7", POOL, OWN);
