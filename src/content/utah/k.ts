import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguage_units } from "../alberta/k-language";
import { units as albertaKMath_units } from "../alberta/k-math";
import { units as albertaKScience_units } from "../alberta/k-science";
import { LANGUAGE_K as californiaUnitsLanguageK_LANGUAGE_K } from "../california/units/language-k";
import { MATH_K as californiaUnitsMathGk_MATH_K } from "../california/units/math-gk";
import { SOCIAL_K as californiaUnitsSocialK_SOCIAL_K } from "../california/units/social-k";
import { languageUnits as manitobaUnitsGkMoreLanguage_languageUnits } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaUnitsGkMoreMath_mathUnits } from "../manitoba/units/gk-more-math";
import { socialUnits as manitobaUnitsGkMoreSocial_socialUnits } from "../manitoba/units/gk-more-social";
import { UNITS as newYorkUnitsSocialK_UNITS } from "../new-york/units/social-k";
import { courses as ontarioK_courses } from "../ontario/k";
import { OWN_SOCIAL_K as oregonUnitsSocialK3_OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { peFirstMapsK as princeEdwardIslandUnitsK1ScienceSocial_peFirstMapsK } from "../prince-edward-island/units/k1-science-social";
import { RML_K as washingtonUnitsLanguageRmlEarly_RML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonUnitsMathEarly_K_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonUnitsScienceK2_SCIENCE_K } from "../washington/units/science-k2";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/k";
import { OWN } from "./units/own-k";

// Utah Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathEarly_K_UNITS, ...californiaUnitsMathGk_MATH_K, ...unitsOf(ontarioK_courses, "math"), ...albertaKMath_units, ...manitobaUnitsGkMoreMath_mathUnits],
  language: [...californiaUnitsLanguageK_LANGUAGE_K, ...unitsOf(ontarioK_courses, "language"), washingtonUnitsLanguageRmlEarly_RML_K, ...albertaKLanguage_units, ...manitobaUnitsGkMoreLanguage_languageUnits],
  science: [...washingtonUnitsScienceK2_SCIENCE_K, ...albertaKScience_units, ...unitsOf(ontarioK_courses, "science")],
  social: [...unitsOf(ontarioK_courses, "social"), ...manitobaUnitsGkMoreSocial_socialUnits, ...oregonUnitsSocialK3_OWN_SOCIAL_K, princeEdwardIslandUnitsK1ScienceSocial_peFirstMapsK, ...newYorkUnitsSocialK_UNITS, ...californiaUnitsSocialK_SOCIAL_K],
};

export const courses: Course[] = withLessons(utahGrade("k", POOL, OWN), LESSONS);
