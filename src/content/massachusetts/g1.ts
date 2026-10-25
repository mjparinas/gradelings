import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as ontarioG1Math } from "../ontario/g1-math";
import { numbersTo100Unit as albertaG1MathNumbersTo100Unit } from "../alberta/g1-math";
import { countingUnit as albertaG1MathCountingUnit } from "../alberta/g1-math";
import { halvesUnit as albertaG1MathHalvesUnit } from "../alberta/g1-math";
import { G1_UNITS as washingtonUnitsMathEarlyG1_UNITS } from "../washington/units/math-early";
import { MATH_1 as californiaUnitsMathG1MATH_1 } from "../california/units/math-g1";
import { units as ontarioG1Language } from "../ontario/g1-language";
import { RML_1 as washingtonUnitsLanguageRmlEarlyRML_1 } from "../washington/units/language-rml-early";
import { STORY_OR_FACTS as oregonUnitsLanguageReadingSTORY_OR_FACTS } from "../oregon/units/language-reading";
import { LANGUAGE_1 as californiaUnitsLanguageG1LANGUAGE_1 } from "../california/units/language-g1";
import { SCIENCE_K as oregonUnitsScienceK2SCIENCE_K } from "../oregon/units/science-k2";
import { SCIENCE_1 as washingtonUnitsScienceK2SCIENCE_1 } from "../washington/units/science-k2";
import { SCIENCE_1 as californiaUnitsScienceG1SCIENCE_1 } from "../california/units/science-g1";
import { units as ontarioG1Social } from "../ontario/g1-social";
import { UNITS as newYorkUnitsSocialG1UNITS } from "../new-york/units/social-g1";
import { SOCIAL_1 as californiaUnitsSocialG1SOCIAL_1 } from "../california/units/social-g1";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1OWN_SOCIAL_1 } from "../washington/units/social-k4-g1";
import { massachusettsGrade } from "./kit";
import { OWN } from "./units/own-g1";

// Massachusetts Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG1Math, albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...washingtonUnitsMathEarlyG1_UNITS, ...californiaUnitsMathG1MATH_1],
  language: [...ontarioG1Language, washingtonUnitsLanguageRmlEarlyRML_1, oregonUnitsLanguageReadingSTORY_OR_FACTS, ...californiaUnitsLanguageG1LANGUAGE_1],
  science: [...oregonUnitsScienceK2SCIENCE_K, ...washingtonUnitsScienceK2SCIENCE_1, ...californiaUnitsScienceG1SCIENCE_1],
  social: [...ontarioG1Social, ...newYorkUnitsSocialG1UNITS, ...californiaUnitsSocialG1SOCIAL_1, ...washingtonUnitsSocialK4G1OWN_SOCIAL_1],
};

export const courses: Course[] = massachusettsGrade("1", POOL, OWN);
