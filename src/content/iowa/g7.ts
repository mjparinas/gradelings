import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7Math } from "../alberta/g7-math";
import { MATH_7 as californiaUnitsMathG7MATH_7 } from "../california/units/math-g7";
import { OWN_SCIENCE as californiaUnitsScienceG7OWN_SCIENCE } from "../california/units/science-g7";
import { course as bcG7Social } from "../grades/g7/social";
import { wordRoots as manitobaUnitsG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { motionForces as newBrunswickUnitsG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { UNITS as newYorkUnitsSocialG5UNITS } from "../new-york/units/social-g5";
import { UNITS as newYorkUnitsSocialG6UNITS } from "../new-york/units/social-g6";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { units as ontarioG7Science } from "../ontario/g7-science";
import { units as ontarioG8Science } from "../ontario/g8-science";
import { units as ontarioG8Social } from "../ontario/g8-social";
import { OWN_SOCIAL_7 as oregonUnitsSocialG67OWN_SOCIAL_7 } from "../oregon/units/social-g67";
import { RML_7 as washingtonUnitsLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonUnitsMathUpperG7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE_8 } from "../washington/units/science-68";
import { withLessons } from "../lessons";
import { iowaGrade } from "./kit";
import { LESSONS } from "./lessons/g7";
import { OWN } from "./units/own-g7";

// Iowa Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Iowa's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math, ...washingtonUnitsMathUpperG7_UNITS, ...californiaUnitsMathG7MATH_7],
  language: [...ontarioG7Language, manitobaUnitsG7LanguageWordRoots, ...washingtonUnitsLanguageRmlUpperRML_7, washingtonUnitsLanguageSpellingSPELLING_7],
  science: [newBrunswickUnitsG8ScienceMotionForces, ...washingtonUnitsScience68SCIENCE_8, ...ontarioG8Science, ...ontarioG7Science, ...californiaUnitsScienceG7OWN_SCIENCE],
  social: [...newYorkUnitsSocialG5UNITS, ...newYorkUnitsSocialG6UNITS, ...bcG7Social.units, ...oregonUnitsSocialG67OWN_SOCIAL_7, ...ontarioG8Social],
};

export const courses: Course[] = withLessons(iowaGrade("7", POOL, OWN), LESSONS);
