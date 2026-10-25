import type { Course } from "../types";
import type { Pool } from "../placement";
import { countingUnit as albertaG1MathCountingUnit, halvesUnit as albertaG1MathHalvesUnit, numbersTo100Unit as albertaG1MathNumbersTo100Unit } from "../alberta/g1-math";
import { motionUnit as albertaG1ScienceMotionUnit } from "../alberta/g1-science";
import { units as albertaKScienceUnits } from "../alberta/k-science";
import { LANGUAGE_1 as californiaUnitsLanguageG1LANGUAGE1 } from "../california/units/language-g1";
import { MATH_1 as californiaUnitsMathG1MATH1 } from "../california/units/math-g1";
import { SOCIAL_1 as californiaUnitsSocialG1SOCIAL1 } from "../california/units/social-g1";
import { SOCIAL_K as californiaUnitsSocialKSOCIALK } from "../california/units/social-k";
import { course as gradesKScienceCourse } from "../grades/k/science";
import { life as manitobaUnitsG3ScienceLife } from "../manitoba/units/g3-science";
import { scienceUnits as manitobaUnitsGkMoreScienceScienceUnits } from "../manitoba/units/gk-more-science";
import { units as ontarioG1LanguageUnits } from "../ontario/g1-language";
import { units as ontarioG1MathUnits } from "../ontario/g1-math";
import { units as ontarioG1ScienceUnits } from "../ontario/g1-science";
import { units as ontarioG1SocialUnits } from "../ontario/g1-social";
import { STORY_OR_FACTS as oregonUnitsLanguageReadingSTORYORFACTS } from "../oregon/units/language-reading";
import { OWN as texasCoursesScience1OWN } from "../texas/courses/science-1";
import { OWN as texasCoursesScienceKOWN } from "../texas/courses/science-k";
import { RML_1 as washingtonUnitsLanguageRmlEarlyRML1 } from "../washington/units/language-rml-early";
import { G1_UNITS as washingtonUnitsMathEarlyG1UNITS } from "../washington/units/math-early";
import { SCIENCE_K as washingtonUnitsScienceK2SCIENCEK } from "../washington/units/science-k2";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1OWNSOCIAL1 } from "../washington/units/social-k4-g1";
import { northCarolinaGrade } from "./kit";
import { OWN } from "./units/own-g1";

// North Carolina Grade 1. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG1MathUnits, albertaG1MathNumbersTo100Unit, albertaG1MathCountingUnit, albertaG1MathHalvesUnit, ...washingtonUnitsMathEarlyG1UNITS, ...californiaUnitsMathG1MATH1],
  language: [...ontarioG1LanguageUnits, washingtonUnitsLanguageRmlEarlyRML1, oregonUnitsLanguageReadingSTORYORFACTS, ...californiaUnitsLanguageG1LANGUAGE1],
  science: [...gradesKScienceCourse.units, albertaG1ScienceMotionUnit, ...ontarioG1ScienceUnits, manitobaUnitsG3ScienceLife, ...washingtonUnitsScienceK2SCIENCEK, ...manitobaUnitsGkMoreScienceScienceUnits, ...texasCoursesScienceKOWN, ...texasCoursesScience1OWN, ...albertaKScienceUnits],
  social: [...californiaUnitsSocialKSOCIALK, ...ontarioG1SocialUnits, ...californiaUnitsSocialG1SOCIAL1, ...washingtonUnitsSocialK4G1OWNSOCIAL1],
};

export const courses: Course[] = northCarolinaGrade("1", POOL, OWN);
