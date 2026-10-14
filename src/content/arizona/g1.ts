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
import { course as bcKScience } from "../grades/k/science";
import { units as ontarioG3Science } from "../ontario/g3-science";
import { life as manitobaG3ScienceLife } from "../manitoba/units/g3-science";
import { SCIENCE_K as washingtonScienceK2SCIENCE_K, SCIENCE_1 as washingtonScienceK2SCIENCE_1 } from "../washington/units/science-k2";
import { units as ontarioG1Social } from "../ontario/g1-social";
import { OWN_SOCIAL_1 as washingtonSocialK4G1OWN_SOCIAL_1 } from "../washington/units/social-k4-g1";
import { SOCIAL_1 as californiaSocial1 } from "../california/units/social-g1";
import { arizonaGrade } from "./kit";

// Arizona Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG1Math, albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...washingtonMathEarlyG1_UNITS],
  language: [...ontarioG1Language, washingtonLanguageRmlEarlyRML_1, oregonLanguageReadingSTORY_OR_FACTS],
  science: [...bcKScience.units, ...washingtonScienceK2SCIENCE_1, ...washingtonScienceK2SCIENCE_K, ...ontarioG3Science, manitobaG3ScienceLife],
  social: [...ontarioG1Social, ...washingtonSocialK4G1OWN_SOCIAL_1, ...californiaSocial1],
};

export const courses: Course[] = arizonaGrade("1", POOL, {});
