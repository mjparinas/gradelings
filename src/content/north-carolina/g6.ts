import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6MathUnits } from "../alberta/g6-math";
import { units as albertaG6ScienceUnits } from "../alberta/g6-science";
import { units as albertaG7ScienceUnits } from "../alberta/g7-science";
import { LANGUAGE_6 as californiaUnitsLanguageG6LANGUAGE6 } from "../california/units/language-g6";
import { MATH_6 as californiaUnitsMathG6MATH6 } from "../california/units/math-g6";
import { SOCIAL_7 as californiaUnitsSocialG7SOCIAL7 } from "../california/units/social-g7";
import { course as gradesG5ScienceCourse } from "../grades/g5/science";
import { course as gradesG7ScienceCourse } from "../grades/g7/science";
import { course as gradesG7SocialCourse } from "../grades/g7/social";
import { course as gradesG8ScienceCourse } from "../grades/g8/science";
import { course as gradesG8SocialCourse } from "../grades/g8/social";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { units as ontarioG6LanguageUnits } from "../ontario/g6-language";
import { units as ontarioG6MathUnits } from "../ontario/g6-math";
import { units as ontarioG6ScienceUnits } from "../ontario/g6-science";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { units as ontarioG8ScienceUnits } from "../ontario/g8-science";
import { units as ontarioG9ScienceUnits } from "../ontario/g9-science";
import { OWN_SOCIAL_7 as oregonUnitsSocialG67OWNSOCIAL7 } from "../oregon/units/social-g67";
import { OWN as texasCoursesScience6OWN } from "../texas/courses/science-6";
import { OWN as texasCoursesScience8OWN } from "../texas/courses/science-8";
import { RML_6 as washingtonUnitsLanguageRmlUpperRML6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpellingSPELLING6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonUnitsMathUpperG6UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6 } from "../washington/units/science-68";
import { G6 as washingtonUnitsSocial59G6G6 } from "../washington/units/social-59-g6";
import { northCarolinaGrade } from "./kit";
import { OWN } from "./units/own-g6";

// North Carolina Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG6MathUnits, ...albertaG6MathUnits, ...washingtonUnitsMathUpperG6UNITS, ...californiaUnitsMathG6MATH6],
  language: [...ontarioG6LanguageUnits, ...washingtonUnitsLanguageRmlUpperRML6, washingtonUnitsLanguageSpellingSPELLING6, ...californiaUnitsLanguageG6LANGUAGE6],
  science: [...gradesG7ScienceCourse.units, ...albertaG6ScienceUnits, ...ontarioG8ScienceUnits, ...ontarioG7ScienceUnits, ...washingtonUnitsScience68SCIENCE6, ...ontarioG6ScienceUnits, ...texasCoursesScience6OWN, ...gradesG8ScienceCourse.units, ...ontarioG4ScienceUnits, ...albertaG7ScienceUnits, ...ontarioG9ScienceUnits, ...texasCoursesScience8OWN, ...gradesG5ScienceCourse.units],
  social: [...washingtonUnitsSocial59G6G6, ...gradesG7SocialCourse.units, ...oregonUnitsSocialG67OWNSOCIAL7, ...californiaUnitsSocialG7SOCIAL7, ...gradesG8SocialCourse.units],
};

export const courses: Course[] = northCarolinaGrade("6", POOL, OWN);
