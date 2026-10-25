import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG2MathUnits } from "../alberta/g2-math";
import { units as albertaG2ScienceUnits } from "../alberta/g2-science";
import { LANGUAGE_2 as californiaUnitsLanguageG2LANGUAGE2 } from "../california/units/language-g2";
import { MATH_2 as californiaUnitsMathG2MATH2 } from "../california/units/math-g2";
import { SOCIAL_2 as californiaUnitsSocialG2SOCIAL2 } from "../california/units/social-g2";
import { course as gradesG1ScienceCourse } from "../grades/g1/science";
import { course as gradesG3SocialCourse } from "../grades/g3/social";
import { course as gradesKScienceCourse } from "../grades/k/science";
import { evenOdd as manitobaUnitsG2MathEvenOdd, skipCounting as manitobaUnitsG2MathSkipCounting } from "../manitoba/units/g2-math";
import { moreLanguage as manitobaUnitsG2MoreLanguageMoreLanguage } from "../manitoba/units/g2-more-language";
import { UNITS as newYorkUnitsSocialG1UNITS } from "../new-york/units/social-g1";
import { UNITS as newYorkUnitsSocialG2UNITS } from "../new-york/units/social-g2";
import { units as ontarioG2LanguageUnits } from "../ontario/g2-language";
import { units as ontarioG2ScienceUnits } from "../ontario/g2-science";
import { units as ontarioG2SocialUnits } from "../ontario/g2-social";
import { peWeatherAndWind2 as princeEdwardIslandUnitsG2ScienceSocialPeWeatherAndWind2 } from "../prince-edward-island/units/g2-science-social";
import { OWN as texasCoursesScience1OWN } from "../texas/courses/science-1";
import { RML_2 as washingtonUnitsLanguageRmlEarlyRML2 } from "../washington/units/language-rml-early";
import { G2_UNITS as washingtonUnitsMathEarlyG2UNITS } from "../washington/units/math-early";
import { SCIENCE_1 as washingtonUnitsScienceK2SCIENCE1, SCIENCE_K as washingtonUnitsScienceK2SCIENCEK } from "../washington/units/science-k2";
import { northCarolinaGrade } from "./kit";
import { OWN } from "./units/own-g2";

// North Carolina Grade 2. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG2MathUnits, manitobaUnitsG2MathSkipCounting, manitobaUnitsG2MathEvenOdd, ...washingtonUnitsMathEarlyG2UNITS, ...californiaUnitsMathG2MATH2],
  language: [...ontarioG2LanguageUnits, ...manitobaUnitsG2MoreLanguageMoreLanguage, washingtonUnitsLanguageRmlEarlyRML2, ...californiaUnitsLanguageG2LANGUAGE2],
  science: [...albertaG2ScienceUnits, ...gradesG1ScienceCourse.units, ...ontarioG2ScienceUnits, ...texasCoursesScience1OWN, ...washingtonUnitsScienceK2SCIENCE1, ...washingtonUnitsScienceK2SCIENCEK, ...gradesKScienceCourse.units, princeEdwardIslandUnitsG2ScienceSocialPeWeatherAndWind2],
  social: [...newYorkUnitsSocialG1UNITS, ...californiaUnitsSocialG2SOCIAL2, ...gradesG3SocialCourse.units, ...newYorkUnitsSocialG2UNITS, ...ontarioG2SocialUnits],
};

export const courses: Course[] = northCarolinaGrade("2", POOL, OWN);
