import type { Course } from "../types";
import type { Pool } from "../placement";
import { countingUnit as albertaG1MathCountingUnit } from "../alberta/g1-math";
import { halvesUnit as albertaG1MathHalvesUnit } from "../alberta/g1-math";
import { numbersTo100Unit as albertaG1MathNumbersTo100Unit } from "../alberta/g1-math";
import { units as ontarioG1Language } from "../ontario/g1-language";
import { units as ontarioG1Math } from "../ontario/g1-math";
import { STORY_OR_FACTS as oregonLanguageReadingSTORY_OR_FACTS } from "../oregon/units/language-reading";
import { RML_1 as washingtonLanguageRmlEarlyRML_1 } from "../washington/units/language-rml-early";
import { G1_UNITS as washingtonMathEarlyG1_UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonScienceK2SCIENCE_1 } from "../washington/units/science-k2";
import { MATH_1 as californiaMath1 } from "../california/units/math-g1";
import { LANGUAGE_1 as californiaLanguage1 } from "../california/units/language-g1";
import { SCIENCE_1 as californiaScience1 } from "../california/units/science-g1";
import { units as ontarioG1Socialunits } from "../ontario/g1-social";
import { OWN_SOCIAL_1 as washingtonSocialK4G1OWN_SOCIAL_1 } from "../washington/units/social-k4-g1";
import { SOCIAL_1 as californiaSocialG1SOCIAL_1 } from "../california/units/social-g1";
import { withLessons } from "../lessons";
import { rhodeIslandGrade } from "./kit";
import { LESSONS } from "./lessons/g1";
import { OWN } from "./units/own-g1";

// Rhode Island Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Rhode Island's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG1Math, albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...washingtonMathEarlyG1_UNITS, ...californiaMath1],
  language: [...ontarioG1Language, washingtonLanguageRmlEarlyRML_1, oregonLanguageReadingSTORY_OR_FACTS, ...californiaLanguage1],
  science: [...washingtonScienceK2SCIENCE_1, ...californiaScience1],
  social: [...ontarioG1Socialunits, ...washingtonSocialK4G1OWN_SOCIAL_1, ...californiaSocialG1SOCIAL_1],
};

export const courses: Course[] = withLessons(rhodeIslandGrade("1", POOL, OWN), LESSONS);
