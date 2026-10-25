import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { units as albertaKLanguage_units } from "../alberta/k-language";
import { units as albertaKMath_units } from "../alberta/k-math";
import { units as albertaKScience_units } from "../alberta/k-science";
import { STORY_QUESTIONS_K as californiaUnitsLanguageK_STORY_QUESTIONS_K } from "../california/units/language-k";
import { FACT_QUESTIONS_K as californiaUnitsLanguageK_FACT_QUESTIONS_K } from "../california/units/language-k";
import { SENTENCE_STARTERS_K as californiaUnitsLanguageK_SENTENCE_STARTERS_K } from "../california/units/language-k";
import { MEASURE_WORDS_K as californiaUnitsMathGk_MEASURE_WORDS_K } from "../california/units/math-gk";
import { BUILD_SHAPES_K as californiaUnitsMathGk_BUILD_SHAPES_K } from "../california/units/math-gk";
import { SOCIAL_K as californiaUnitsSocialK_SOCIAL_K } from "../california/units/social-k";
import { languageUnits as manitobaUnitsGkMoreLanguage_languageUnits } from "../manitoba/units/gk-more-language";
import { mathUnits as manitobaUnitsGkMoreMath_mathUnits } from "../manitoba/units/gk-more-math";
import { socialUnits as manitobaUnitsGkMoreSocial_socialUnits } from "../manitoba/units/gk-more-social";
import { UNITS as newYorkUnitsSocialK_UNITS } from "../new-york/units/social-k";
import { courses as ontarioK_courses } from "../ontario/k";
import { units as ontarioKSocial_units } from "../ontario/k-social";
import { OWN_SOCIAL_K as oregonUnitsSocialK3_OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { peFirstMapsK as princeEdwardIslandUnitsK1ScienceSocial_peFirstMapsK } from "../prince-edward-island/units/k1-science-social";
import { RML_K as washingtonUnitsLanguageRmlEarly_RML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonUnitsMathEarly_K_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonUnitsScienceK2_SCIENCE_K } from "../washington/units/science-k2";
import { withLessons } from "../lessons";
import { louisianaGrade } from "./kit";
import { LESSONS } from "./lessons/k";
import { OWN } from "./units/own-k";

// Louisiana Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Louisiana's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...unitsOf(ontarioK_courses, "math"), ...albertaKMath_units, ...manitobaUnitsGkMoreMath_mathUnits, ...washingtonUnitsMathEarly_K_UNITS, californiaUnitsMathGk_MEASURE_WORDS_K, californiaUnitsMathGk_BUILD_SHAPES_K],
  language: [...unitsOf(ontarioK_courses, "language"), ...albertaKLanguage_units, ...manitobaUnitsGkMoreLanguage_languageUnits, washingtonUnitsLanguageRmlEarly_RML_K, californiaUnitsLanguageK_STORY_QUESTIONS_K, californiaUnitsLanguageK_FACT_QUESTIONS_K, californiaUnitsLanguageK_SENTENCE_STARTERS_K],
  science: [...albertaKScience_units, ...washingtonUnitsScienceK2_SCIENCE_K],
  social: [...oregonUnitsSocialK3_OWN_SOCIAL_K, ...ontarioKSocial_units, princeEdwardIslandUnitsK1ScienceSocial_peFirstMapsK, ...manitobaUnitsGkMoreSocial_socialUnits, ...californiaUnitsSocialK_SOCIAL_K, ...newYorkUnitsSocialK_UNITS],
};

export const courses: Course[] = withLessons(louisianaGrade("k", POOL, OWN), LESSONS);
