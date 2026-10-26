import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguage } from "../alberta/k-language";
import { units as albertaKMath } from "../alberta/k-math";
import { units as albertaKScience } from "../alberta/k-science";
import { LANGUAGE_K as californiaUnitsLanguageKLANGUAGE_K } from "../california/units/language-k";
import { MATH_K as californiaUnitsMathGkMATH_K } from "../california/units/math-gk";
import { SOCIAL_K as californiaUnitsSocialKSOCIAL_K } from "../california/units/social-k";
import { languageUnits as manitobaUnitsGkMoreLanguageLanguageUnits } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaUnitsGkMoreMathMathUnits } from "../manitoba/units/gk-more-math";
import { socialUnits as manitobaUnitsGkMoreSocialSocialUnits } from "../manitoba/units/gk-more-social";
import { courses as ontarioK } from "../ontario/k";
import { SCIENCE_K as oregonUnitsScienceK2SCIENCE_K } from "../oregon/units/science-k2";
import { OWN_SOCIAL_K as oregonUnitsSocialK3OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { RML_K as washingtonUnitsLanguageRmlEarlyRML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonUnitsMathEarlyK_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonUnitsScienceK2SCIENCE_K } from "../washington/units/science-k2";
import { withLessons } from "../lessons";
import { iowaGrade } from "./kit";
import { LESSONS } from "./lessons/k";
import { OWN } from "./units/own-k";

// Iowa Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Iowa's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...unitsOf(ontarioK, "math"), ...albertaKMath, ...manitobaUnitsGkMoreMathMathUnits, ...washingtonUnitsMathEarlyK_UNITS, ...californiaUnitsMathGkMATH_K],
  language: [...unitsOf(ontarioK, "language"), ...albertaKLanguage, ...manitobaUnitsGkMoreLanguageLanguageUnits, washingtonUnitsLanguageRmlEarlyRML_K, ...californiaUnitsLanguageKLANGUAGE_K],
  science: [...albertaKScience, ...washingtonUnitsScienceK2SCIENCE_K, ...oregonUnitsScienceK2SCIENCE_K],
  social: [...unitsOf(ontarioK, "social"), ...manitobaUnitsGkMoreSocialSocialUnits, ...oregonUnitsSocialK3OWN_SOCIAL_K, ...californiaUnitsSocialKSOCIAL_K],
};

export const courses: Course[] = withLessons(iowaGrade("k", POOL, OWN), LESSONS);
