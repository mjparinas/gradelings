import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaG2Science_units } from "../alberta/g2-science";
import { units as albertaKLanguage_units } from "../alberta/k-language";
import { units as albertaKMath_units } from "../alberta/k-math";
import { units as albertaKScience_units } from "../alberta/k-science";
import { LANGUAGE_K as californiaUnitsLanguageK_LANGUAGE_K } from "../california/units/language-k";
import { MATH_K as californiaUnitsMathGk_MATH_K } from "../california/units/math-gk";
import { SOCIAL_K as californiaUnitsSocialK_SOCIAL_K } from "../california/units/social-k";
import { course as gradesG1Science_course } from "../grades/g1/science";
import { languageUnits as manitobaUnitsGkMoreLanguage_languageUnits } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaUnitsGkMoreMath_mathUnits } from "../manitoba/units/gk-more-math";
import { socialUnits as manitobaUnitsGkMoreSocial_socialUnits } from "../manitoba/units/gk-more-social";
import { UNITS as newYorkUnitsScienceK_UNITS } from "../new-york/units/science-k";
import { UNITS as newYorkUnitsSocialK_UNITS } from "../new-york/units/social-k";
import { courses as ontarioK_courses } from "../ontario/k";
import { units as ontarioKScience_units } from "../ontario/k-science";
import { units as ontarioKSocial_units } from "../ontario/k-social";
import { SCIENCE_K as oregonUnitsScienceK2_SCIENCE_K } from "../oregon/units/science-k2";
import { OWN_SOCIAL_K as oregonUnitsSocialK3_OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { peFirstMapsK as princeEdwardIslandUnitsK1ScienceSocial_peFirstMapsK } from "../prince-edward-island/units/k1-science-social";
import { RML_K as washingtonUnitsLanguageRmlEarly_RML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonUnitsMathEarly_K_UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonUnitsScienceK2_SCIENCE_1 } from "../washington/units/science-k2";
import { SCIENCE_K as washingtonUnitsScienceK2_SCIENCE_K } from "../washington/units/science-k2";
import { tennesseeGrade } from "./kit";
import { OWN } from "./units/own-k";

// Tennessee Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...californiaUnitsMathGk_MATH_K, ...washingtonUnitsMathEarly_K_UNITS, ...manitobaUnitsGkMoreMath_mathUnits, ...albertaKMath_units, ...unitsOf(ontarioK_courses, "math")],
  language: [...californiaUnitsLanguageK_LANGUAGE_K, ...albertaKLanguage_units, washingtonUnitsLanguageRmlEarly_RML_K, ...manitobaUnitsGkMoreLanguage_languageUnits, ...unitsOf(ontarioK_courses, "language")],
  science: [...albertaKScience_units, ...newYorkUnitsScienceK_UNITS, ...oregonUnitsScienceK2_SCIENCE_K, ...ontarioKScience_units, ...albertaG2Science_units, ...gradesG1Science_course.units, ...washingtonUnitsScienceK2_SCIENCE_1, ...washingtonUnitsScienceK2_SCIENCE_K],
  social: [...californiaUnitsSocialK_SOCIAL_K, ...newYorkUnitsSocialK_UNITS, ...ontarioKSocial_units, ...manitobaUnitsGkMoreSocial_socialUnits, ...oregonUnitsSocialK3_OWN_SOCIAL_K, princeEdwardIslandUnitsK1ScienceSocial_peFirstMapsK],
};

export const courses: Course[] = tennesseeGrade("k", POOL, OWN);
