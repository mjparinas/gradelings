import type { Course } from "../types";
import type { Pool } from "../placement";
import { numbersTo100Unit as albertaG1Math_numbersTo100Unit } from "../alberta/g1-math";
import { countingUnit as albertaG1Math_countingUnit } from "../alberta/g1-math";
import { halvesUnit as albertaG1Math_halvesUnit } from "../alberta/g1-math";
import { STORY_CLUES_1 as californiaUnitsLanguageG1_STORY_CLUES_1 } from "../california/units/language-g1";
import { FACT_FINDERS_1 as californiaUnitsLanguageG1_FACT_FINDERS_1 } from "../california/units/language-g1";
import { THREE_ADDENDS_1 as californiaUnitsMathG1_THREE_ADDENDS_1 } from "../california/units/math-g1";
import { SOCIAL_1 as californiaUnitsSocialG1_SOCIAL_1 } from "../california/units/social-g1";
import { units as ontarioG1Language_units } from "../ontario/g1-language";
import { units as ontarioG1Math_units } from "../ontario/g1-math";
import { units as ontarioG1Social_units } from "../ontario/g1-social";
import { STORY_OR_FACTS as oregonUnitsLanguageReading_STORY_OR_FACTS } from "../oregon/units/language-reading";
import { peGoodsAndServices1 as princeEdwardIslandUnitsK1ScienceSocial_peGoodsAndServices1 } from "../prince-edward-island/units/k1-science-social";
import { RML_1 as washingtonUnitsLanguageRmlEarly_RML_1 } from "../washington/units/language-rml-early";
import { G1_UNITS as washingtonUnitsMathEarly_G1_UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonUnitsScienceK2_SCIENCE_1 } from "../washington/units/science-k2";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1_OWN_SOCIAL_1 } from "../washington/units/social-k4-g1";
import { withLessons } from "../lessons";
import { louisianaGrade } from "./kit";
import { LESSONS } from "./lessons/g1";
import { OWN } from "./units/own-g1";

// Louisiana Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Louisiana's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG1Math_units, albertaG1Math_numbersTo100Unit, albertaG1Math_countingUnit, albertaG1Math_halvesUnit, ...washingtonUnitsMathEarly_G1_UNITS, californiaUnitsMathG1_THREE_ADDENDS_1],
  language: [...ontarioG1Language_units, washingtonUnitsLanguageRmlEarly_RML_1, oregonUnitsLanguageReading_STORY_OR_FACTS, californiaUnitsLanguageG1_STORY_CLUES_1, californiaUnitsLanguageG1_FACT_FINDERS_1],
  science: [...washingtonUnitsScienceK2_SCIENCE_1],
  social: [...ontarioG1Social_units, ...californiaUnitsSocialG1_SOCIAL_1, princeEdwardIslandUnitsK1ScienceSocial_peGoodsAndServices1, ...washingtonUnitsSocialK4G1_OWN_SOCIAL_1],
};

export const courses: Course[] = withLessons(louisianaGrade("1", POOL, OWN), LESSONS);
