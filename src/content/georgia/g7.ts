import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG9UNITS } from "../alabama/units/social-g9";
import { units as albertaG7MathUnits } from "../alberta/g7-math";
import { units as albertaG8ScienceUnits } from "../alberta/g8-science";
import { MATH_7 as californiaUnitsMathG7MATH7 } from "../california/units/math-g7";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { wordRoots as manitobaUnitsG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { UNITS as minnesotaUnitsSocialG8UNITS } from "../minnesota/units/social-g8";
import { UNITS as newYorkUnitsSocialG6UNITS } from "../new-york/units/social-g6";
import { units as ontarioG6ScienceUnits } from "../ontario/g6-science";
import { units as ontarioG7LanguageUnits } from "../ontario/g7-language";
import { units as ontarioG7MathUnits } from "../ontario/g7-math";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../oregon/units/social-g5";
import { OWN as texasCoursesScience7OWN } from "../texas/courses/science-7";
import { RML_7 as washingtonUnitsLanguageRmlUpperRML7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpellingSPELLING7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonUnitsMathUpperG7UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6, SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../washington/units/science-68";
import { georgiaGrade } from "./kit";
import { OWN } from "./units/own-g7";

// Georgia Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7MathUnits, ...albertaG7MathUnits, ...washingtonUnitsMathUpperG7UNITS, ...californiaUnitsMathG7MATH7],
  language: [...ontarioG7LanguageUnits, manitobaUnitsG7LanguageWordRoots, ...washingtonUnitsLanguageRmlUpperRML7, washingtonUnitsLanguageSpellingSPELLING7],
  science: [...ontarioG6ScienceUnits, ...washingtonUnitsScience68SCIENCE6, ...albertaG8ScienceUnits, ...gradesG6ScienceCourse.units, ...washingtonUnitsScience68SCIENCE8, ...texasCoursesScience7OWN, ...ontarioG7ScienceUnits],
  social: [...newYorkUnitsSocialG6UNITS, ...alabamaUnitsSocialG9UNITS, ...minnesotaUnitsSocialG8UNITS, ...oregonUnitsSocialG5OWNSOCIAL5],
};

export const courses: Course[] = georgiaGrade("7", POOL, OWN);
