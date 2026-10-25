import type { Course } from "../types";
import { type Pool } from "../placement";
import { withLessons } from "../lessons";
import { units as albertaG6Math_units } from "../alberta/g6-math";
import { units as albertaG6Science_units } from "../alberta/g6-science";
import { STORY_EVIDENCE_6 as californiaUnitsLanguageG6_STORY_EVIDENCE_6 } from "../california/units/language-g6";
import { INFO_EVIDENCE_6 as californiaUnitsLanguageG6_INFO_EVIDENCE_6 } from "../california/units/language-g6";
import { EXPRESSIONS_6 as californiaUnitsMathG6_EXPRESSIONS_6 } from "../california/units/math-g6";
import { SOCIAL_7 as californiaUnitsSocialG7_SOCIAL_7 } from "../california/units/social-g7";
import { SOCIAL_COPIES as coloradoUnitsCopiesG6_SOCIAL_COPIES } from "../colorado/units/copies-g6";
import { course as gradesG7Math_course } from "../grades/g7/math";
import { senses as newBrunswickUnitsG6Science_senses } from "../new-brunswick/units/g6-science";
import { UNITS as newYorkUnitsSocialG5_UNITS } from "../new-york/units/social-g5";
import { units as ontarioG6Language_units } from "../ontario/g6-language";
import { units as ontarioG6Math_units } from "../ontario/g6-math";
import { units as ontarioG7Science_units } from "../ontario/g7-science";
import { RML_6 as washingtonUnitsLanguageRmlUpper_RML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpelling_SPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonUnitsMathUpper_G6_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68_SCIENCE_6 } from "../washington/units/science-68";
import { oklahomaGrade } from "./kit";
import { LESSONS } from "./lessons/g6";
import { OWN } from "./units/own-g6";

// Oklahoma Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for
// Oklahoma's own units, which ship in this download.
const POOL: Pool = {
  math: [...ontarioG6Math_units, ...albertaG6Math_units, ...washingtonUnitsMathUpper_G6_UNITS, ...gradesG7Math_course.units, californiaUnitsMathG6_EXPRESSIONS_6],
  language: [...ontarioG6Language_units, ...washingtonUnitsLanguageRmlUpper_RML_6, washingtonUnitsLanguageSpelling_SPELLING_6, californiaUnitsLanguageG6_STORY_EVIDENCE_6, californiaUnitsLanguageG6_INFO_EVIDENCE_6],
  science: [newBrunswickUnitsG6Science_senses, ...washingtonUnitsScience68_SCIENCE_6, ...ontarioG7Science_units, ...albertaG6Science_units],
  social: [...newYorkUnitsSocialG5_UNITS, ...californiaUnitsSocialG7_SOCIAL_7, ...coloradoUnitsCopiesG6_SOCIAL_COPIES],
};

export const courses: Course[] = withLessons(oklahomaGrade("6", POOL, OWN), LESSONS);
