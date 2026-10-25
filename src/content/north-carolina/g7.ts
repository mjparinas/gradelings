import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG9UNITS } from "../alabama/units/social-g9";
import { units as albertaG7MathUnits } from "../alberta/g7-math";
import { units as albertaG8ScienceUnits } from "../alberta/g8-science";
import { MATH_7 as californiaUnitsMathG7MATH7 } from "../california/units/math-g7";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { course as gradesG8ScienceCourse } from "../grades/g8/science";
import { course as gradesG8SocialCourse } from "../grades/g8/social";
import { weather as manitobaUnitsG5ScienceWeather } from "../manitoba/units/g5-science";
import { wordRoots as manitobaUnitsG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { UNITS as minnesotaUnitsSocialG8UNITS } from "../minnesota/units/social-g8";
import { motionForces as newBrunswickUnitsG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { UNITS as newYorkUnitsScienceG9UNITS } from "../new-york/units/science-g9";
import { UNITS as newYorkUnitsSocialG5UNITS } from "../new-york/units/social-g5";
import { units as ontarioG7LanguageUnits } from "../ontario/g7-language";
import { units as ontarioG7MathUnits } from "../ontario/g7-math";
import { units as ontarioG8ScienceUnits } from "../ontario/g8-science";
import { OWN_SOCIAL_7 as oregonUnitsSocialG67OWNSOCIAL7 } from "../oregon/units/social-g67";
import { OWN as texasCoursesScience7OWN } from "../texas/courses/science-7";
import { SOCIAL_6 as texasUnitsSocialG6SOCIAL6 } from "../texas/units/social-g6";
import { RML_7 as washingtonUnitsLanguageRmlUpperRML7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpellingSPELLING7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonUnitsMathUpperG7UNITS } from "../washington/units/math-upper";
import { SCIENCE_3 as washingtonUnitsScience35SCIENCE3 } from "../washington/units/science-35";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../washington/units/science-68";
import { northCarolinaGrade } from "./kit";
import { OWN } from "./units/own-g7";

// North Carolina Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7MathUnits, ...albertaG7MathUnits, ...washingtonUnitsMathUpperG7UNITS, ...californiaUnitsMathG7MATH7],
  language: [...ontarioG7LanguageUnits, manitobaUnitsG7LanguageWordRoots, ...washingtonUnitsLanguageRmlUpperRML7, washingtonUnitsLanguageSpellingSPELLING7],
  science: [...texasCoursesScience7OWN, ...gradesG6ScienceCourse.units, newBrunswickUnitsG8ScienceMotionForces, ...washingtonUnitsScience68SCIENCE8, ...ontarioG8ScienceUnits, ...gradesG8ScienceCourse.units, ...albertaG8ScienceUnits, manitobaUnitsG5ScienceWeather, ...newYorkUnitsScienceG9UNITS, ...washingtonUnitsScience35SCIENCE3],
  social: [...gradesG8SocialCourse.units, ...newYorkUnitsSocialG5UNITS, ...oregonUnitsSocialG67OWNSOCIAL7, ...minnesotaUnitsSocialG8UNITS, ...texasUnitsSocialG6SOCIAL6, ...alabamaUnitsSocialG9UNITS],
};

export const courses: Course[] = northCarolinaGrade("7", POOL, OWN);
