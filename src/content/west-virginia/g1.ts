import type { Course } from "../types";
import type { Pool } from "../placement";
import { countingUnit as albertaG1MathCountingUnit, halvesUnit as albertaG1MathHalvesUnit, numbersTo100Unit as albertaG1MathNumbersTo100Unit } from "../alberta/g1-math";
import { LANGUAGE_1 as californiaLanguage1 } from "../california/units/language-g1";
import { MATH_1 as californiaMath1 } from "../california/units/math-g1";
import { SCIENCE_1 as californiaScienceG1SCIENCE1 } from "../california/units/science-g1";
import { SOCIAL_1 as californiaSocialG1SOCIAL1 } from "../california/units/social-g1";
import { units as ontarioG1Language } from "../ontario/g1-language";
import { units as ontarioG1Math } from "../ontario/g1-math";
import { units as ontarioG1SocialUnits } from "../ontario/g1-social";
import { STORY_OR_FACTS as oregonLanguageReadingSTORY_OR_FACTS } from "../oregon/units/language-reading";
import { peGoodsAndServices1 as princeEdwardIslandK1ScienceSocialPeGoodsAndServices1 } from "../prince-edward-island/units/k1-science-social";
import { RML_1 as washingtonLanguageRmlEarlyRML_1 } from "../washington/units/language-rml-early";
import { G1_UNITS as washingtonMathEarlyG1_UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonScienceK2SCIENCE1 } from "../washington/units/science-k2";
import { OWN_SOCIAL_1 as washingtonSocialK4G1OWNSOCIAL1 } from "../washington/units/social-k4-g1";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/g1";
import { OWN } from "./units/own-g1";

// West Virginia Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [...ontarioG1Math, albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...washingtonMathEarlyG1_UNITS, ...californiaMath1],
  language: [...ontarioG1Language, washingtonLanguageRmlEarlyRML_1, oregonLanguageReadingSTORY_OR_FACTS, ...californiaLanguage1],
  science: [...washingtonScienceK2SCIENCE1, ...californiaScienceG1SCIENCE1],
  social: [...ontarioG1SocialUnits, princeEdwardIslandK1ScienceSocialPeGoodsAndServices1, ...californiaSocialG1SOCIAL1, ...washingtonSocialK4G1OWNSOCIAL1],
};

export const courses: Course[] = withLessons(westVirginiaGrade("1", POOL, OWN), LESSONS);
