import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6MathUnits } from "../alberta/g6-math";
import { LANGUAGE_6 as californiaUnitsLanguageG6LANGUAGE6 } from "../california/units/language-g6";
import { SOCIAL_8 as californiaUnitsSocialG8SOCIAL8 } from "../california/units/social-g8";
import { course as gradesG7ScienceCourse } from "../grades/g7/science";
import { storedEnergy as manitobaUnitsG6ScienceStoredEnergy } from "../manitoba/units/g6-science";
import { UNITS as newYorkUnitsScienceG6UNITS } from "../new-york/units/science-g6";
import { UNITS as newYorkUnitsScienceG9UNITS } from "../new-york/units/science-g9";
import { UNITS as newYorkUnitsSocialG8UNITS } from "../new-york/units/social-g8";
import { units as ontarioG6LanguageUnits } from "../ontario/g6-language";
import { units as ontarioG6MathUnits } from "../ontario/g6-math";
import { units as ontarioG9ScienceUnits } from "../ontario/g9-science";
import { reconstruction8 as oregonUnitsSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { OWN as texasCoursesScience6OWN } from "../texas/courses/science-6";
import { RML_6 as washingtonUnitsLanguageRmlUpperRML6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonUnitsLanguageSpellingSPELLING6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonUnitsMathUpperG6UNITS } from "../washington/units/math-upper";
import { SCIENCE_8 as washingtonUnitsScience68SCIENCE8 } from "../washington/units/science-68";
import { G8 as washingtonUnitsSocial59G8G8 } from "../washington/units/social-59-g8";
import { virginiaGrade } from "./kit";
import { OWN } from "./units/own-g6";

// Virginia Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...washingtonUnitsMathUpperG6UNITS, ...ontarioG6MathUnits, ...albertaG6MathUnits],
  language: [...californiaUnitsLanguageG6LANGUAGE6, ...washingtonUnitsLanguageRmlUpperRML6, ...ontarioG6LanguageUnits, washingtonUnitsLanguageSpellingSPELLING6],
  science: [manitobaUnitsG6ScienceStoredEnergy, ...newYorkUnitsScienceG6UNITS, ...texasCoursesScience6OWN, ...washingtonUnitsScience68SCIENCE8, ...gradesG7ScienceCourse.units, ...ontarioG9ScienceUnits, ...newYorkUnitsScienceG9UNITS],
  social: [...newYorkUnitsSocialG8UNITS, oregonUnitsSocialCopiesReconstruction8, ...washingtonUnitsSocial59G8G8, ...californiaUnitsSocialG8SOCIAL8],
};

export const courses: Course[] = virginiaGrade("6", POOL, OWN);
