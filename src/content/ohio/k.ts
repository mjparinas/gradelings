import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguage } from "../alberta/k-language";
import { units as albertaKMath } from "../alberta/k-math";
import { languageUnits as manitobaGkMoreLanguage } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaGkMoreMath } from "../manitoba/units/gk-more-math";
import { courses as ontarioK } from "../ontario/k";
import { RML_K as washingtonLanguageRmlEarlyRML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonMathEarlyK_UNITS } from "../washington/units/math-early";
import { MATH_K as californiaMathK } from "../california/units/math-gk";
import { LANGUAGE_K as californiaLanguageK } from "../california/units/language-k";
import { ohioGrade } from "./kit";
import { OWN } from "./units/own-k";
import { scienceUnits as sci0 } from "../manitoba/units/gk-more-science";
import { SCIENCE_K as sci1 } from "../washington/units/science-k2";
import { units as sci2 } from "../alberta/k-science";
import { course as sci3 } from "../grades/g1/science";
import { units as soc0 } from "../ontario/k-social";
import { socialUnits as soc1 } from "../manitoba/units/gk-more-social";
import { OWN_SOCIAL_K as soc2 } from "../oregon/units/social-k3";
import { SOCIAL_K as soc3 } from "../california/units/social-k";

// Ohio Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...unitsOf(ontarioK, "math"), ...albertaKMath, ...manitobaGkMoreMath, ...washingtonMathEarlyK_UNITS, ...californiaMathK],
  language: [...unitsOf(ontarioK, "language"), ...albertaKLanguage, ...manitobaGkMoreLanguage, washingtonLanguageRmlEarlyRML_K, ...californiaLanguageK],
  science: [...sci0, ...sci1, ...sci2, ...sci3.units],
  social: [...soc0, ...soc1, ...soc2, ...soc3],
};

export const courses: Course[] = ohioGrade("k", POOL, OWN);
