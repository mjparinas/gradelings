import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { courses as ontarioKCourses } from "../ontario/k";
import { units as albertaKMath } from "../alberta/k-math";
import { mathUnits as manitobaUnitsGkMoreMathMathUnits } from "../manitoba/units/gk-more-math";
import { K_UNITS as washingtonUnitsMathEarlyK_UNITS } from "../washington/units/math-early";
import { MATH_K as californiaUnitsMathGkMATH_K } from "../california/units/math-gk";
import { units as albertaKLanguage } from "../alberta/k-language";
import { languageUnits as manitobaUnitsGkMoreLanguageLanguageUnits } from "../manitoba/units/gk-more-language";
import { RML_K as washingtonUnitsLanguageRmlEarlyRML_K } from "../washington/units/language-rml-early";
import { LANGUAGE_K as californiaUnitsLanguageKLANGUAGE_K } from "../california/units/language-k";
import { units as albertaKScience } from "../alberta/k-science";
import { SCIENCE_K as washingtonUnitsScienceK2SCIENCE_K } from "../washington/units/science-k2";
import { units as ontarioKSocial } from "../ontario/k-social";
import { SOCIAL_K as californiaUnitsSocialKSOCIAL_K } from "../california/units/social-k";
import { UNITS as newYorkUnitsSocialKUNITS } from "../new-york/units/social-k";
import { OWN_SOCIAL_K as oregonUnitsSocialK3OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { massachusettsGrade } from "./kit";
import { OWN } from "./units/own-k";

// Massachusetts Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...unitsOf(ontarioKCourses, "math"), ...albertaKMath, ...manitobaUnitsGkMoreMathMathUnits, ...washingtonUnitsMathEarlyK_UNITS, ...californiaUnitsMathGkMATH_K],
  language: [...unitsOf(ontarioKCourses, "language"), ...albertaKLanguage, ...manitobaUnitsGkMoreLanguageLanguageUnits, washingtonUnitsLanguageRmlEarlyRML_K, ...californiaUnitsLanguageKLANGUAGE_K],
  science: [...albertaKScience, ...washingtonUnitsScienceK2SCIENCE_K],
  social: [...ontarioKSocial, ...californiaUnitsSocialKSOCIAL_K, ...newYorkUnitsSocialKUNITS, ...oregonUnitsSocialK3OWN_SOCIAL_K],
};

export const courses: Course[] = massachusettsGrade("k", POOL, OWN);
