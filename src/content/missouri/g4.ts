import type { Course } from "../types";
import type { Pool } from "../placement";
import { G4_UNITS as mat0 } from "../washington/units/math-middle";
import { units as mat1 } from "../ontario/g4-math";
import { MATH_4 as mat2 } from "../california/units/math-g4";
import { units as mat3 } from "../alberta/g4-math";
import { LANGUAGE_4 as lan0 } from "../california/units/language-g4";
import { RML_4 as lan1 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as lan2 } from "../washington/units/language-spelling";
import { FIRSTHAND_SECONDHAND as lan3 } from "../oregon/units/language-reading";
import { units as lan4 } from "../ontario/g4-language";
import { SCIENCE_4 as sci0 } from "../washington/units/science-35";
import { units as sci1 } from "../manitoba/units/g4-more-science";
import { units as sci2 } from "../ontario/g4-science";
import { speed as sci3 } from "../manitoba/units/g3-science";
import { OWN_SCIENCE as sci4 } from "../california/units/science-g4";
import { friction as sci5 } from "../manitoba/units/g5-science";
import { units as sci6 } from "../ontario/g3-science";
import { SOCIAL_5 as soc0 } from "../california/units/social-g5";
import { OWN_SOCIAL_5 as soc1 } from "../oregon/units/social-g5";
import { historyDetective5 as soc2 } from "../oregon/units/social-copies";
import { G8 as soc3 } from "../washington/units/social-59-g8";
import { UNITS as soc4 } from "../new-york/units/social-g5";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-g4";

// Missouri Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...mat0, ...mat1, ...mat2, ...mat3],
  language: [...lan0, lan1, lan2, lan3, ...lan4],
  science: [...sci0, ...sci1, ...sci2, sci3, ...sci4, sci5, ...sci6],
  social: [...soc0, ...soc1, soc2, ...soc3, ...soc4],
};

export const courses: Course[] = missouriGrade("4", POOL, OWN);
