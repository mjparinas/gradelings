import type { Course } from "../types";
import type { Pool } from "../placement";
import { countingUnit as albertaG1MathCountingUnit } from "../alberta/g1-math";
import { halvesUnit as albertaG1MathHalvesUnit } from "../alberta/g1-math";
import { numbersTo100Unit as albertaG1MathNumbersTo100Unit } from "../alberta/g1-math";
import { LANGUAGE_1 as californiaUnitsLanguageG1LANGUAGE_1 } from "../california/units/language-g1";
import { MATH_1 as californiaUnitsMathG1MATH_1 } from "../california/units/math-g1";
import { SCIENCE_1 as californiaUnitsScienceG1SCIENCE_1 } from "../california/units/science-g1";
import { SOCIAL_1 as californiaUnitsSocialG1SOCIAL_1 } from "../california/units/social-g1";
import { UNITS as newYorkUnitsSocialG1UNITS } from "../new-york/units/social-g1";
import { units as ontarioG1Language } from "../ontario/g1-language";
import { units as ontarioG1Math } from "../ontario/g1-math";
import { units as ontarioG1Social } from "../ontario/g1-social";
import { STORY_OR_FACTS as oregonUnitsLanguageReadingSTORY_OR_FACTS } from "../oregon/units/language-reading";
import { RML_1 as washingtonUnitsLanguageRmlEarlyRML_1 } from "../washington/units/language-rml-early";
import { G1_UNITS as washingtonUnitsMathEarlyG1_UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonUnitsScienceK2SCIENCE_1 } from "../washington/units/science-k2";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1OWN_SOCIAL_1 } from "../washington/units/social-k4-g1";
import { withLessons } from "../lessons";
import { idahoGrade } from "./kit";
import { LESSONS } from "./lessons/g1";
import { OWN } from "./units/own-g1";

// Idaho Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Idaho's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG1Math, albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...washingtonUnitsMathEarlyG1_UNITS, ...californiaUnitsMathG1MATH_1],
  language: [...ontarioG1Language, washingtonUnitsLanguageRmlEarlyRML_1, oregonUnitsLanguageReadingSTORY_OR_FACTS, ...californiaUnitsLanguageG1LANGUAGE_1],
  science: [...washingtonUnitsScienceK2SCIENCE_1, ...californiaUnitsScienceG1SCIENCE_1],
  social: [...ontarioG1Social, ...washingtonUnitsSocialK4G1OWN_SOCIAL_1, ...californiaUnitsSocialG1SOCIAL_1, ...newYorkUnitsSocialG1UNITS],
};

export const courses: Course[] = withLessons(idahoGrade("1", POOL, OWN), LESSONS);
