import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaUnitsSocialG9UNITS } from "../alabama/units/social-g9";
import { units as albertaG6MathUnits } from "../alberta/g6-math";
import { LANGUAGE_6 as californiaUnitsLanguageG6LANGUAGE6 } from "../california/units/language-g6";
import { MATH_6 as californiaUnitsMathG6MATH6 } from "../california/units/math-g6";
import { course as gradesG5ScienceCourse } from "../grades/g5/science";
import { UNITS as newYorkUnitsScienceG9UNITS } from "../new-york/units/science-g9";
import { UNITS as newYorkUnitsSocialG5UNITS } from "../new-york/units/social-g5";
import { units as ontarioG6LanguageUnits } from "../ontario/g6-language";
import { units as ontarioG6MathUnits } from "../ontario/g6-math";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5OWNSOCIAL5 } from "../oregon/units/social-g5";
import { OWN as texasCoursesScience6OWN } from "../texas/courses/science-6";
import { SOCIAL_6 as texasUnitsSocialG6SOCIAL6 } from "../texas/units/social-g6";
import { RML_6 as washingtonUnitsLanguageRmlUpperRML6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpellingSPELLING6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonUnitsMathUpperG6UNITS } from "../washington/units/math-upper";
import { georgiaGrade } from "./kit";
import { OWN } from "./units/own-g6";

// Georgia Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG6MathUnits, ...albertaG6MathUnits, ...washingtonUnitsMathUpperG6UNITS, ...californiaUnitsMathG6MATH6],
  language: [...ontarioG6LanguageUnits, ...washingtonUnitsLanguageRmlUpperRML6, washingtonUnitsLanguageSpellingSPELLING6, ...californiaUnitsLanguageG6LANGUAGE6],
  science: [...newYorkUnitsScienceG9UNITS, ...texasCoursesScience6OWN, ...gradesG5ScienceCourse.units],
  social: [...texasUnitsSocialG6SOCIAL6, ...newYorkUnitsSocialG5UNITS, ...alabamaUnitsSocialG9UNITS, ...oregonUnitsSocialG5OWNSOCIAL5],
};

export const courses: Course[] = georgiaGrade("6", POOL, OWN);
