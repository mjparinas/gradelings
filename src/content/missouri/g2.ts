import type { Course } from "../types";
import type { Pool } from "../placement";
import { G2_UNITS as mat0 } from "../washington/units/math-early";
import { MATH_2 as mat1 } from "../california/units/math-g2";
import { units as mat2 } from "../alberta/g2-math";
import { skipCounting as mat3 } from "../manitoba/units/g2-math";
import { evenOdd as mat4 } from "../manitoba/units/g2-math";
import { units as lan0 } from "../ontario/g2-language";
import { LANGUAGE_2 as lan1 } from "../california/units/language-g2";
import { RML_2 as lan2 } from "../washington/units/language-rml-early";
import { moreLanguage as lan3 } from "../manitoba/units/g2-more-language";
import { SCIENCE_2 as sci0 } from "../oregon/units/science-k2";
import { SCIENCE_2 as sci1 } from "../washington/units/science-k2";
import { units as sci2 } from "../alberta/g2-science";
import { units as sci3 } from "../ontario/g2-science";
import { SOCIAL_2 as soc0 } from "../california/units/social-g2";
import { units as soc1 } from "../ontario/g2-social";
import { moreSocial as soc2 } from "../manitoba/units/g2-more-social";
import { OWN_SOCIAL_2 as soc3 } from "../oregon/units/social-k3";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-g2";

// Missouri Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...mat0, ...mat1, ...mat2, mat3, mat4],
  language: [...lan0, ...lan1, lan2, ...lan3],
  science: [...sci0, ...sci1, ...sci2, ...sci3],
  social: [...soc0, ...soc1, ...soc2, ...soc3],
};

export const courses: Course[] = missouriGrade("2", POOL, OWN);
