import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7MathUnits } from "../alberta/g7-math";
import { units as albertaG8ScienceUnits } from "../alberta/g8-science";
import { COPIES_8 as arizonaUnitsCopiesG8COPIES8 } from "../arizona/units/copies-g8";
import { REWRITE_7 as californiaUnitsMathG7REWRITE7 } from "../california/units/math-g7";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL9 } from "../california/units/social-g9";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { wordRoots as manitobaUnitsG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { units as ontarioG6ScienceUnits } from "../ontario/g6-science";
import { units as ontarioG7LanguageUnits } from "../ontario/g7-language";
import { units as ontarioG7MathUnits } from "../ontario/g7-math";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { units as ontarioG9ScienceUnits } from "../ontario/g9-science";
import { OWN as texasCoursesScience7OWN } from "../texas/courses/science-7";
import { RML_7 as washingtonUnitsLanguageRmlUpperRML7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonUnitsLanguageSpellingSPELLING7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonUnitsMathUpperG7UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonUnitsScience68SCIENCE6, SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../washington/units/science-68";
import { G9 as washingtonUnitsSocial59G9G9 } from "../washington/units/social-59-g9";
import { virginiaGrade } from "./kit";
import { OWN } from "./units/own-g7";

// Virginia Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG7MathUnits, ...washingtonUnitsMathUpperG7UNITS, californiaUnitsMathG7REWRITE7, ...albertaG7MathUnits],
  language: [...washingtonUnitsLanguageRmlUpperRML7, ...ontarioG7LanguageUnits, manitobaUnitsG7LanguageWordRoots, washingtonUnitsLanguageSpellingSPELLING7],
  science: [...ontarioG7ScienceUnits, ...washingtonUnitsScience68SCIENCE8, ...ontarioG6ScienceUnits, ...washingtonUnitsScience68SCIENCE6, ...texasCoursesScience7OWN, ...gradesG6ScienceCourse.units, ...albertaG8ScienceUnits, ...ontarioG9ScienceUnits],
  social: [...californiaUnitsSocialG9SOCIAL9, ...arizonaUnitsCopiesG8COPIES8, ...washingtonUnitsSocial59G9G9],
};

export const courses: Course[] = virginiaGrade("7", POOL, OWN);
