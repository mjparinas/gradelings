import type { Course } from "../types";
import type { Pool } from "../placement";
import { G8_UNITS as mat0 } from "../washington/units/math-upper";
import { units as mat1 } from "../ontario/g8-math";
import { units as mat2 } from "../alberta/g8-math";
import { MATH_8 as mat3 } from "../california/units/math-g8";
import { units as lan0 } from "../ontario/g8-language";
import { LANGUAGE_8 as lan1 } from "../california/units/language-g8";
import { WEIGH_THE_EVIDENCE as lan2 } from "../oregon/units/language";
import { RML_8 as lan3 } from "../washington/units/language-rml-upper";
import { units as lan4 } from "../manitoba/units/g8-more-language";
import { SCIENCE_8 as sci0 } from "../washington/units/science-68";
import { OWN_SCIENCE as sci1 } from "../california/units/science-g8";
import { motionForces as sci2 } from "../new-brunswick/units/g8-science";
import { SOCIAL_8 as soc0 } from "../california/units/social-g8";
import { SOCIAL_8 as soc1 } from "../texas/units/social-g8";
import { G8 as soc2 } from "../washington/units/social-59-g8";
import { reconstruction8 as soc3 } from "../oregon/units/social-copies";
import { UNITS as soc4 } from "../florida/units/social-g8";
import { OWN_SOCIAL_8 as soc5 } from "../oregon/units/social-g8";
import { units as soc6 } from "../manitoba/units/g8-more-social-b";
import { units as soc7 } from "../ontario/g8-social";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-g8";

// Missouri Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...mat0, ...mat1, ...mat2, ...mat3],
  language: [...lan0, ...lan1, lan2, ...lan3, ...lan4],
  science: [...sci0, ...sci1, sci2],
  social: [...soc0, ...soc1, ...soc2, soc3, ...soc4, ...soc5, ...soc6, ...soc7],
};

export const courses: Course[] = missouriGrade("8", POOL, OWN);
