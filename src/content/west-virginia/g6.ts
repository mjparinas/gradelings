import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6Math } from "../alberta/g6-math";
import { units as albertaG7ScienceUnits } from "../alberta/g7-science";
import { COPIES_7 as arizonaCopiesG7COPIES7 } from "../arizona/units/copies-g7";
import { LANGUAGE_6 as californiaLanguage6 } from "../california/units/language-g6";
import { MATH_6 as californiaMath6 } from "../california/units/math-g6";
import { OWN_SCIENCE as californiaScienceG7OWNSCIENCE } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaScienceG8OWNSCIENCE } from "../california/units/science-g8";
import { SOCIAL_9 as californiaSocialG9SOCIAL9 } from "../california/units/social-g9";
import { UNITS as floridaSocialG7UNITS } from "../florida/units/social-g7";
import { course as gradesG8ScienceCourse } from "../grades/g8/science";
import { UNITS as newYorkSocialG8UNITS } from "../new-york/units/social-g8";
import { units as ontarioG6Language } from "../ontario/g6-language";
import { units as ontarioG6Math } from "../ontario/g6-math";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { RML_6 as washingtonLanguageRmlUpperRML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonLanguageSpellingSPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonMathUpperG6_UNITS } from "../washington/units/math-upper";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/g6";
import { OWN } from "./units/own-g6";

// West Virginia Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [...ontarioG6Math, ...albertaG6Math, ...washingtonMathUpperG6_UNITS, ...californiaMath6],
  language: [...ontarioG6Language, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6, ...californiaLanguage6],
  science: [...ontarioG7ScienceUnits, ...albertaG7ScienceUnits, ...californiaScienceG7OWNSCIENCE, ...gradesG8ScienceCourse.units, ...californiaScienceG8OWNSCIENCE],
  social: [...newYorkSocialG8UNITS, ...floridaSocialG7UNITS, ...californiaSocialG9SOCIAL9, ...arizonaCopiesG7COPIES7],
};

export const courses: Course[] = withLessons(westVirginiaGrade("6", POOL, OWN), LESSONS);
