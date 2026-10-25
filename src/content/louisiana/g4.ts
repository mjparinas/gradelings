import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4Math_units } from "../alberta/g4-math";
import { POEMS_PLAYS_4 as californiaUnitsLanguageG4_POEMS_PLAYS_4 } from "../california/units/language-g4";
import { COMPARE_TEXTS_4 as californiaUnitsLanguageG4_COMPARE_TEXTS_4 } from "../california/units/language-g4";
import { PRECISE_WORDS_4 as californiaUnitsLanguageG4_PRECISE_WORDS_4 } from "../california/units/language-g4";
import { TENTHS_HUNDREDTHS_4 as californiaUnitsMathG4_TENTHS_HUNDREDTHS_4 } from "../california/units/math-g4";
import { ANGLES_4 as californiaUnitsMathG4_ANGLES_4 } from "../california/units/math-g4";
import { SOCIAL_6 as californiaUnitsSocialG6_SOCIAL_6 } from "../california/units/social-g6";
import { course as gradesG7Social_course } from "../grades/g7/social";
import { units as manitobaUnitsG4MoreScience_units } from "../manitoba/units/g4-more-science";
import { UNITS as newYorkUnitsSocialG5_UNITS } from "../new-york/units/social-g5";
import { UNITS as newYorkUnitsSocialG6_UNITS } from "../new-york/units/social-g6";
import { units as ontarioG4Language_units } from "../ontario/g4-language";
import { units as ontarioG4Math_units } from "../ontario/g4-math";
import { units as ontarioG4Science_units } from "../ontario/g4-science";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReading_FIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { RML_4 as washingtonUnitsLanguageRmlMiddle_RML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpelling_SPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonUnitsMathMiddle_G4_UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonUnitsScience35_SCIENCE_4 } from "../washington/units/science-35";
import { G6 as washingtonUnitsSocial59G6_G6 } from "../washington/units/social-59-g6";
import { withLessons } from "../lessons";
import { louisianaGrade } from "./kit";
import { LESSONS } from "./lessons/g4";
import { OWN } from "./units/own-g4";

// Louisiana Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Louisiana's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG4Math_units, ...albertaG4Math_units, ...washingtonUnitsMathMiddle_G4_UNITS, californiaUnitsMathG4_TENTHS_HUNDREDTHS_4, californiaUnitsMathG4_ANGLES_4],
  language: [...ontarioG4Language_units, washingtonUnitsLanguageRmlMiddle_RML_4, washingtonUnitsLanguageSpelling_SPELLING_4, oregonUnitsLanguageReading_FIRSTHAND_SECONDHAND, californiaUnitsLanguageG4_POEMS_PLAYS_4, californiaUnitsLanguageG4_COMPARE_TEXTS_4, californiaUnitsLanguageG4_PRECISE_WORDS_4],
  science: [...ontarioG4Science_units, ...manitobaUnitsG4MoreScience_units, ...washingtonUnitsScience35_SCIENCE_4],
  social: [...washingtonUnitsSocial59G6_G6, ...gradesG7Social_course.units, ...californiaUnitsSocialG6_SOCIAL_6, ...newYorkUnitsSocialG6_UNITS, ...newYorkUnitsSocialG5_UNITS],
};

export const courses: Course[] = withLessons(louisianaGrade("4", POOL, OWN), LESSONS);
