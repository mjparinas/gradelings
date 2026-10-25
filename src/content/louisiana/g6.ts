import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Math_units } from "../alberta/g6-math";
import { STORY_EVIDENCE_6 as californiaUnitsLanguageG6_STORY_EVIDENCE_6 } from "../california/units/language-g6";
import { INFO_EVIDENCE_6 as californiaUnitsLanguageG6_INFO_EVIDENCE_6 } from "../california/units/language-g6";
import { LONG_DIVISION_6 as californiaUnitsMathG6_LONG_DIVISION_6 } from "../california/units/math-g6";
import { EXPRESSIONS_6 as californiaUnitsMathG6_EXPRESSIONS_6 } from "../california/units/math-g6";
import { DATA_SHAPE_6 as californiaUnitsMathG6_DATA_SHAPE_6 } from "../california/units/math-g6";
import { OWN_SCIENCE as californiaUnitsScienceG8_OWN_SCIENCE } from "../california/units/science-g8";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG8Science_course } from "../grades/g8/science";
import { motionForces as newBrunswickUnitsG8Science_motionForces } from "../new-brunswick/units/g8-science";
import { units as ontarioG6Language_units } from "../ontario/g6-language";
import { units as ontarioG6Math_units } from "../ontario/g6-math";
import { units as ontarioG7Science_units } from "../ontario/g7-science";
import { RML_6 as washingtonUnitsLanguageRmlUpper_RML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpelling_SPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonUnitsMathUpper_G6_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68_SCIENCE_6 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonUnitsScience68_SCIENCE_8 } from "../washington/units/science-68";
import { G8 as washingtonUnitsSocial59G8_G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { louisianaGrade } from "./kit";
import { LESSONS } from "./lessons/g6";
import { OWN } from "./units/own-g6";

// Louisiana Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Louisiana's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG6Math_units, ...albertaG6Math_units, ...washingtonUnitsMathUpper_G6_UNITS, californiaUnitsMathG6_LONG_DIVISION_6, californiaUnitsMathG6_EXPRESSIONS_6, californiaUnitsMathG6_DATA_SHAPE_6],
  language: [...ontarioG6Language_units, ...washingtonUnitsLanguageRmlUpper_RML_6, washingtonUnitsLanguageSpelling_SPELLING_6, californiaUnitsLanguageG6_STORY_EVIDENCE_6, californiaUnitsLanguageG6_INFO_EVIDENCE_6],
  science: [...washingtonUnitsScience68_SCIENCE_6, ...ontarioG7Science_units, ...gradesG8Science_course.units, newBrunswickUnitsG8Science_motionForces, ...washingtonUnitsScience68_SCIENCE_8, ...californiaUnitsScienceG8_OWN_SCIENCE],
  social: [...californiaUnitsSocialG5_SOCIAL_5, ...californiaUnitsSocialG8_SOCIAL_8, ...washingtonUnitsSocial59G8_G8],
};

export const courses: Course[] = withLessons(louisianaGrade("6", POOL, OWN), LESSONS);
