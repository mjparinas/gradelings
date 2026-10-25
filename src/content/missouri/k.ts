import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { K_UNITS as mat0 } from "../washington/units/math-early";
import { MATH_K as mat1 } from "../california/units/math-gk";
import { units as mat2 } from "../alberta/k-math";
import { mathUnits as mat3 } from "../manitoba/units/gk-more-math";
import { LANGUAGE_K as lan0 } from "../california/units/language-k";
import { RML_K as lan1 } from "../washington/units/language-rml-early";
import { units as lan2 } from "../alberta/k-language";
import { languageUnits as lan3 } from "../manitoba/units/gk-more-language";
import { SCIENCE_K as sci0 } from "../washington/units/science-k2";
import { SCIENCE_K as sci1 } from "../oregon/units/science-k2";
import { UNITS as sci2 } from "../new-york/units/science-k";
import { units as sci3 } from "../alberta/k-science";
import { units as soc0 } from "../ontario/k-social";
import { SOCIAL_K as soc1 } from "../california/units/social-k";
import { OWN_SOCIAL_K as soc2 } from "../oregon/units/social-k3";
import { socialUnits as soc3 } from "../manitoba/units/gk-more-social";
import { courses as ontarioK } from "../ontario/k";
import { missouriGrade } from "./kit";
import { OWN } from "./units/own-k";

// Missouri Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...unitsOf(ontarioK, "math"), ...mat0, ...mat1, ...mat2, ...mat3],
  language: [...unitsOf(ontarioK, "language"), ...lan0, lan1, ...lan2, ...lan3],
  science: [...sci0, ...sci1, ...sci2, ...sci3],
  social: [...soc0, ...soc1, ...soc2, ...soc3],
};

export const courses: Course[] = missouriGrade("k", POOL, OWN);
