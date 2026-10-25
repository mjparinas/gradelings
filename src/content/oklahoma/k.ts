import type { Course } from "../types";
import { unitsOf, type Pool } from "../placement";
import { withLessons } from "../lessons";
import { units as albertaKLanguage_units } from "../alberta/k-language";
import { units as albertaKMath_units } from "../alberta/k-math";
import { STORY_QUESTIONS_K as californiaUnitsLanguageK_STORY_QUESTIONS_K } from "../california/units/language-k";
import { FACT_QUESTIONS_K as californiaUnitsLanguageK_FACT_QUESTIONS_K } from "../california/units/language-k";
import { SENTENCE_STARTERS_K as californiaUnitsLanguageK_SENTENCE_STARTERS_K } from "../california/units/language-k";
import { MEASURE_WORDS_K as californiaUnitsMathGk_MEASURE_WORDS_K } from "../california/units/math-gk";
import { BUILD_SHAPES_K as californiaUnitsMathGk_BUILD_SHAPES_K } from "../california/units/math-gk";
import { SOCIAL_K as californiaUnitsSocialK_SOCIAL_K } from "../california/units/social-k";
import { courses as manitobaK_courses } from "../manitoba/k";
import { socialUnits as manitobaUnitsGkMoreSocial_socialUnits } from "../manitoba/units/gk-more-social";
import { UNITS as newYorkUnitsMathK_UNITS } from "../new-york/units/math-k";
import { UNITS as newYorkUnitsSocialK_UNITS } from "../new-york/units/social-k";
import { units as ontarioKSocial_units } from "../ontario/k-social";
import { SCIENCE_K as oregonUnitsScienceK2_SCIENCE_K } from "../oregon/units/science-k2";
import { OWN_SOCIAL_K as oregonUnitsSocialK3_OWN_SOCIAL_K } from "../oregon/units/social-k3";
import { peFirstMapsK as princeEdwardIslandUnitsK1ScienceSocial_peFirstMapsK } from "../prince-edward-island/units/k1-science-social";
import { RML_K as washingtonUnitsLanguageRmlEarly_RML_K } from "../washington/units/language-rml-early";
import { K_UNITS as washingtonUnitsMathEarly_K_UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonUnitsScienceK2_SCIENCE_K } from "../washington/units/science-k2";
import { oklahomaGrade } from "./kit";
import { LESSONS } from "./lessons/k";
import { OWN } from "./units/own-k";

// Oklahoma Kindergarten. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for
// Oklahoma's own units, which ship in this download.
const POOL: Pool = {
  math: [...unitsOf(manitobaK_courses, "math"), ...albertaKMath_units, ...washingtonUnitsMathEarly_K_UNITS, californiaUnitsMathGk_MEASURE_WORDS_K, californiaUnitsMathGk_BUILD_SHAPES_K, ...newYorkUnitsMathK_UNITS],
  language: [...unitsOf(manitobaK_courses, "language"), ...albertaKLanguage_units, washingtonUnitsLanguageRmlEarly_RML_K, californiaUnitsLanguageK_STORY_QUESTIONS_K, californiaUnitsLanguageK_FACT_QUESTIONS_K, californiaUnitsLanguageK_SENTENCE_STARTERS_K],
  science: [...washingtonUnitsScienceK2_SCIENCE_K, ...oregonUnitsScienceK2_SCIENCE_K],
  social: [...manitobaUnitsGkMoreSocial_socialUnits, ...newYorkUnitsSocialK_UNITS, ...californiaUnitsSocialK_SOCIAL_K, princeEdwardIslandUnitsK1ScienceSocial_peFirstMapsK, ...ontarioKSocial_units, ...oregonUnitsSocialK3_OWN_SOCIAL_K],
};

export const courses: Course[] = withLessons(oklahomaGrade("k", POOL, OWN), LESSONS);
