import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG9_UNITS } from "../alabama/units/social-g9";
import { units as albertaG8Math_units } from "../alberta/g8-math";
import { LITERARY_CONNECTIONS_8 as californiaUnitsLanguageG8_LITERARY_CONNECTIONS_8 } from "../california/units/language-g8";
import { ARGUMENTS_AND_SOURCES_8 as californiaUnitsLanguageG8_ARGUMENTS_AND_SOURCES_8 } from "../california/units/language-g8";
import { VERBS_VOICE_MOOD_8 as californiaUnitsLanguageG8_VERBS_VOICE_MOOD_8 } from "../california/units/language-g8";
import { SIMILAR_DISTANCE_8 as californiaUnitsMathG8_SIMILAR_DISTANCE_8 } from "../california/units/math-g8";
import { LINEAR_MODELS_8 as californiaUnitsMathG8_LINEAR_MODELS_8 } from "../california/units/math-g8";
import { OWN_SCIENCE as californiaUnitsScienceG6_OWN_SCIENCE } from "../california/units/science-g6";
import { OWN_SCIENCE as californiaUnitsScienceG7_OWN_SCIENCE } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaUnitsScienceG8_OWN_SCIENCE } from "../california/units/science-g8";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG7Science_course } from "../grades/g7/science";
import { units as manitobaUnitsG8MoreLanguage_units } from "../manitoba/units/g8-more-language";
import { UNITS as newYorkUnitsSocialG8_UNITS } from "../new-york/units/social-g8";
import { units as ontarioG8Language_units } from "../ontario/g8-language";
import { units as ontarioG8Math_units } from "../ontario/g8-math";
import { units as ontarioG8Science_units } from "../ontario/g8-science";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguage_WEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { RML_8 as washingtonUnitsLanguageRmlUpper_RML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonUnitsMathUpper_G8_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68_SCIENCE_6 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68_SCIENCE_8 } from "../washington/units/science-68";
import { withLessons } from "../lessons";
import { louisianaGrade } from "./kit";
import { LESSONS } from "./lessons/g8";
import { OWN } from "./units/own-g8";

// Louisiana Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Louisiana's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG8Math_units, ...albertaG8Math_units, ...washingtonUnitsMathUpper_G8_UNITS, californiaUnitsMathG8_SIMILAR_DISTANCE_8, californiaUnitsMathG8_LINEAR_MODELS_8],
  language: [...ontarioG8Language_units, ...manitobaUnitsG8MoreLanguage_units, ...washingtonUnitsLanguageRmlUpper_RML_8, oregonUnitsLanguage_WEIGH_THE_EVIDENCE, californiaUnitsLanguageG8_LITERARY_CONNECTIONS_8, californiaUnitsLanguageG8_ARGUMENTS_AND_SOURCES_8, californiaUnitsLanguageG8_VERBS_VOICE_MOOD_8],
  science: [...washingtonUnitsScience68_SCIENCE_6, ...ontarioG8Science_units, ...californiaUnitsScienceG6_OWN_SCIENCE, ...gradesG7Science_course.units, ...californiaUnitsScienceG7_OWN_SCIENCE, ...washingtonUnitsScience68_SCIENCE_8, ...californiaUnitsScienceG8_OWN_SCIENCE],
  social: [...californiaUnitsSocialG8_SOCIAL_8, ...newYorkUnitsSocialG8_UNITS, ...alabamaUnitsSocialG9_UNITS],
};

export const courses: Course[] = withLessons(louisianaGrade("8", POOL, OWN), LESSONS);
