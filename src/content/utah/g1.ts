import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG1Math_units } from "../alberta/g1-math";
import { LANGUAGE_1 as californiaUnitsLanguageG1_LANGUAGE_1 } from "../california/units/language-g1";
import { MATH_1 as californiaUnitsMathG1_MATH_1 } from "../california/units/math-g1";
import { SOCIAL_1 as californiaUnitsSocialG1_SOCIAL_1 } from "../california/units/social-g1";
import { scienceUnits as manitobaUnitsGkMoreScience_scienceUnits } from "../manitoba/units/gk-more-science";
import { UNITS as newYorkUnitsSocialG1_UNITS } from "../new-york/units/social-g1";
import { units as ontarioG1Language_units } from "../ontario/g1-language";
import { units as ontarioG1Math_units } from "../ontario/g1-math";
import { units as ontarioG1Social_units } from "../ontario/g1-social";
import { STORY_OR_FACTS as oregonUnitsLanguageReading_STORY_OR_FACTS } from "../oregon/units/language-reading";
import { G1_UNITS as washingtonUnitsMathEarly_G1_UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonUnitsScienceK2_SCIENCE_1 } from "../washington/units/science-k2";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1_OWN_SOCIAL_1 } from "../washington/units/social-k4-g1";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/g1";
import { OWN } from "./units/own-g1";

// Utah Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathEarly_G1_UNITS, ...albertaG1Math_units, ...californiaUnitsMathG1_MATH_1, ...ontarioG1Math_units],
  language: [...ontarioG1Language_units, ...californiaUnitsLanguageG1_LANGUAGE_1, oregonUnitsLanguageReading_STORY_OR_FACTS],
  science: [...washingtonUnitsScienceK2_SCIENCE_1, ...manitobaUnitsGkMoreScience_scienceUnits],
  social: [...ontarioG1Social_units, ...californiaUnitsSocialG1_SOCIAL_1, ...washingtonUnitsSocialK4G1_OWN_SOCIAL_1, ...newYorkUnitsSocialG1_UNITS],
};

export const courses: Course[] = withLessons(utahGrade("1", POOL, OWN), LESSONS);
