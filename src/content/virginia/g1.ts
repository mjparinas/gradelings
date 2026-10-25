import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG1MathUnits } from "../alberta/g1-math";
import { motionUnit as albertaG1ScienceMotionUnit } from "../alberta/g1-science";
import { units as albertaKScienceUnits } from "../alberta/k-science";
import { LANGUAGE_1 as californiaUnitsLanguageG1LANGUAGE1 } from "../california/units/language-g1";
import { THREE_ADDENDS_1 as californiaUnitsMathG1THREEADDENDS1 } from "../california/units/math-g1";
import { SOCIAL_1 as californiaUnitsSocialG1SOCIAL1 } from "../california/units/social-g1";
import { course as gradesKScienceCourse } from "../grades/k/science";
import { UNITS as newYorkUnitsMathG1UNITS } from "../new-york/units/math-g1";
import { units as ontarioG1LanguageUnits } from "../ontario/g1-language";
import { units as ontarioG1MathUnits } from "../ontario/g1-math";
import { units as ontarioG1ScienceUnits } from "../ontario/g1-science";
import { units as ontarioG1SocialUnits } from "../ontario/g1-social";
import { units as ontarioG3ScienceUnits } from "../ontario/g3-science";
import { STORY_OR_FACTS as oregonUnitsLanguageReadingSTORYORFACTS } from "../oregon/units/language-reading";
import { OWN_SOCIAL_2 as oregonUnitsSocialK3OWNSOCIAL2 } from "../oregon/units/social-k3";
import { peGoodsAndServices1 as princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1 } from "../prince-edward-island/units/k1-science-social";
import { RML_1 as washingtonUnitsLanguageRmlEarlyRML1 } from "../washington/units/language-rml-early";
import { G1_UNITS as washingtonUnitsMathEarlyG1UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonUnitsScienceK2SCIENCE1, SCIENCE_K as washingtonUnitsScienceK2SCIENCEK } from "../washington/units/science-k2";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1OWNSOCIAL1 } from "../washington/units/social-k4-g1";
import { virginiaGrade } from "./kit";
import { OWN } from "./units/own-g1";

// Virginia Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG1MathUnits, ...washingtonUnitsMathEarlyG1UNITS, californiaUnitsMathG1THREEADDENDS1, ...newYorkUnitsMathG1UNITS, ...ontarioG1MathUnits],
  language: [...ontarioG1LanguageUnits, ...californiaUnitsLanguageG1LANGUAGE1, washingtonUnitsLanguageRmlEarlyRML1, oregonUnitsLanguageReadingSTORYORFACTS],
  science: [...gradesKScienceCourse.units, ...ontarioG1ScienceUnits, albertaG1ScienceMotionUnit, ...washingtonUnitsScienceK2SCIENCEK, ...washingtonUnitsScienceK2SCIENCE1, ...albertaKScienceUnits, ...ontarioG3ScienceUnits],
  social: [princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1, ...oregonUnitsSocialK3OWNSOCIAL2, ...washingtonUnitsSocialK4G1OWNSOCIAL1, ...californiaUnitsSocialG1SOCIAL1, ...ontarioG1SocialUnits],
};

export const courses: Course[] = virginiaGrade("1", POOL, OWN);
