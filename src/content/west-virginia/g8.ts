import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6ScienceUnits } from "../alberta/g6-science";
import { units as albertaG8Math } from "../alberta/g8-math";
import { LANGUAGE_8 as californiaLanguage8 } from "../california/units/language-g8";
import { MATH_8 as californiaMath8 } from "../california/units/math-g8";
import { OWN_SCIENCE as californiaScienceG7OWNSCIENCE } from "../california/units/science-g7";
import { OWN_SCIENCE as californiaScienceG8OWNSCIENCE } from "../california/units/science-g8";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { course as gradesG7ScienceCourse } from "../grades/g7/science";
import { units as manitobaG8MoreLanguage } from "../manitoba/units/g8-more-language";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { units as ontarioG8Language } from "../ontario/g8-language";
import { units as ontarioG8Math } from "../ontario/g8-math";
import { WEIGH_THE_EVIDENCE as oregonLanguageWEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { RML_8 as washingtonLanguageRmlUpperRML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonMathUpperG8_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonScience68SCIENCE7, SCIENCE_8 as washingtonScience68SCIENCE8 } from "../washington/units/science-68";
import { G8 as washingtonSocial59G8G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/g8";
import { OWN } from "./units/own-g8";

// West Virginia Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [...ontarioG8Math, ...albertaG8Math, ...washingtonMathUpperG8_UNITS, ...californiaMath8],
  language: [...ontarioG8Language, ...manitobaG8MoreLanguage, ...washingtonLanguageRmlUpperRML_8, oregonLanguageWEIGH_THE_EVIDENCE, ...californiaLanguage8],
  science: [...gradesG7ScienceCourse.units, ...ontarioG7ScienceUnits, ...washingtonScience68SCIENCE7, ...gradesG6ScienceCourse.units, ...albertaG6ScienceUnits, ...californiaScienceG7OWNSCIENCE, ...washingtonScience68SCIENCE8, ...californiaScienceG8OWNSCIENCE],
  social: [...washingtonSocial59G8G8],
};

export const courses: Course[] = withLessons(westVirginiaGrade("8", POOL, OWN), LESSONS);
