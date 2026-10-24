import type { Course } from "../types";
import type { Pool } from "../placement";
import { countingUnit as albertaG1MathCountingUnit, halvesUnit as albertaG1MathHalvesUnit, numbersTo100Unit as albertaG1MathNumbersTo100Unit } from "../alberta/g1-math";
import { LANGUAGE_1 as californiaUnitsLanguageG1LANGUAGE1 } from "../california/units/language-g1";
import { MATH_1 as californiaUnitsMathG1MATH1 } from "../california/units/math-g1";
import { SCIENCE_1 as californiaUnitsScienceG1SCIENCE1 } from "../california/units/science-g1";
import { SOCIAL_1 as californiaUnitsSocialG1SOCIAL1 } from "../california/units/social-g1";
import { UNITS as newYorkUnitsSocialG1UNITS } from "../new-york/units/social-g1";
import { units as ontarioG1LanguageUnits } from "../ontario/g1-language";
import { units as ontarioG1MathUnits } from "../ontario/g1-math";
import { units as ontarioG1SocialUnits } from "../ontario/g1-social";
import { STORY_OR_FACTS as oregonUnitsLanguageReadingSTORYORFACTS } from "../oregon/units/language-reading";
import { peGoodsAndServices1 as princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1 } from "../prince-edward-island/units/k1-science-social";
import { RML_1 as washingtonUnitsLanguageRmlEarlyRML1 } from "../washington/units/language-rml-early";
import { G1_UNITS as washingtonUnitsMathEarlyG1UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonUnitsScienceK2SCIENCE1 } from "../washington/units/science-k2";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1OWNSOCIAL1 } from "../washington/units/social-k4-g1";
import { indianaGrade } from "./kit";
import { OWN } from "./units/own-g1";

// Indiana Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG1MathUnits, albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...washingtonUnitsMathEarlyG1UNITS, ...californiaUnitsMathG1MATH1],
  language: [...ontarioG1LanguageUnits, washingtonUnitsLanguageRmlEarlyRML1, oregonUnitsLanguageReadingSTORYORFACTS, ...californiaUnitsLanguageG1LANGUAGE1],
  science: [...washingtonUnitsScienceK2SCIENCE1, ...californiaUnitsScienceG1SCIENCE1],
  social: [...ontarioG1SocialUnits, ...washingtonUnitsSocialK4G1OWNSOCIAL1, ...californiaUnitsSocialG1SOCIAL1, ...newYorkUnitsSocialG1UNITS, princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1],
};

export const courses: Course[] = indianaGrade("1", POOL, OWN);
