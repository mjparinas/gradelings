import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG7Math } from "../alberta/g7-math";
import { LANGUAGE_7 as californiaLanguage7 } from "../california/units/language-g7";
import { MATH_7 as californiaMath7 } from "../california/units/math-g7";
import { OWN_SCIENCE as californiaScienceG6OWNSCIENCE } from "../california/units/science-g6";
import { OWN_SCIENCE as californiaScienceG7OWNSCIENCE } from "../california/units/science-g7";
import { SOCIAL_COPIES as georgiaCopiesG7SOCIALCOPIES } from "../georgia/units/copies-g7";
import { SOCIAL_6 as georgiaSocialG67SOCIAL6, SOCIAL_7 as georgiaSocialG67SOCIAL7 } from "../georgia/units/social-g67";
import { course as gradesG6ScienceCourse } from "../grades/g6/science";
import { wordRoots as manitobaG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { SOCIAL_7 as massachusettsSocialG7SOCIAL7 } from "../massachusetts/units/social-g7";
import { senses as newBrunswickG6ScienceSenses } from "../new-brunswick/units/g6-science";
import { motionForces as newBrunswickG8ScienceMotionForces } from "../new-brunswick/units/g8-science";
import { units as ontarioG7Language } from "../ontario/g7-language";
import { units as ontarioG7Math } from "../ontario/g7-math";
import { units as ontarioG8ScienceUnits } from "../ontario/g8-science";
import { SOCIAL_6 as texasSocialG6SOCIAL6 } from "../texas/units/social-g6";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonMathUpperG7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonScience68SCIENCE6, SCIENCE_8 as washingtonScience68SCIENCE8 } from "../washington/units/science-68";
import { G6 as washingtonSocial59G6G6 } from "../washington/units/social-59-g6";
import { withLessons } from "../lessons";
import { westVirginiaGrade } from "./kit";
import { LESSONS } from "./lessons/g7";
import { OWN } from "./units/own-g7";

// West Virginia Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// West Virginia's own units and for units it teaches in a different grade from where their lesson is written.
const POOL: Pool = {
  math: [...ontarioG7Math, ...albertaG7Math, ...washingtonMathUpperG7_UNITS, ...californiaMath7],
  language: [...ontarioG7Language, manitobaG7LanguageWordRoots, ...washingtonLanguageRmlUpperRML_7, washingtonLanguageSpellingSPELLING_7, ...californiaLanguage7],
  science: [...gradesG6ScienceCourse.units, newBrunswickG6ScienceSenses, ...washingtonScience68SCIENCE6, ...ontarioG8ScienceUnits, ...californiaScienceG6OWNSCIENCE, ...californiaScienceG7OWNSCIENCE, newBrunswickG8ScienceMotionForces, ...washingtonScience68SCIENCE8],
  social: [...washingtonSocial59G6G6, ...georgiaSocialG67SOCIAL6, ...georgiaSocialG67SOCIAL7, ...massachusettsSocialG7SOCIAL7, ...georgiaCopiesG7SOCIALCOPIES, ...texasSocialG6SOCIAL6],
};

export const courses: Course[] = withLessons(westVirginiaGrade("7", POOL, OWN), LESSONS);
