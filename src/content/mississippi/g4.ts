import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4MathUnits } from "../alberta/g4-math";
import { LANGUAGE_4 as californiaLanguageG4LANGUAGE_4 } from "../california/units/language-g4";
import { MATH_4 as californiaMathG4MATH_4 } from "../california/units/math-g4";
import { SOCIAL_5 as californiaSocialG5SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaSocialG8SOCIAL_8 } from "../california/units/social-g8";
import { course as gradesG2ScienceCourse } from "../grades/g2/science";
import { course as gradesG3ScienceCourse } from "../grades/g3/science";
import { course as gradesG5ScienceCourse } from "../grades/g5/science";
import { weather as manitobaG5ScienceWeather } from "../manitoba/units/g5-science";
import { UNITS as newYorkSocialG8UNITS } from "../new-york/units/social-g8";
import { units as ontarioG4LanguageUnits } from "../ontario/g4-language";
import { units as ontarioG4MathUnits } from "../ontario/g4-math";
import { units as ontarioG4ScienceUnits } from "../ontario/g4-science";
import { units as ontarioG5ScienceUnits } from "../ontario/g5-science";
import { FIRSTHAND_SECONDHAND as oregonLanguageReadingFIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { historyDetective5 as oregonSocialCopiesHistoryDetective5 } from "../oregon/units/social-copies";
import { reconstruction8 as oregonSocialCopiesReconstruction8 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonSocialG5OWN_SOCIAL_5 } from "../oregon/units/social-g5";
import { SCIENCE_5 as texasScience5SCIENCE_5 } from "../texas/units/science-5";
import { RML_4 as washingtonLanguageRmlMiddleRML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonLanguageSpellingSPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonMathMiddleG4_UNITS } from "../washington/units/math-middle";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/g4";
import { OWN } from "./units/own-g4";

// Mississippi Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG4MathUnits, ...washingtonMathMiddleG4_UNITS, ...californiaMathG4MATH_4, ...albertaG4MathUnits],
  language: [...californiaLanguageG4LANGUAGE_4, oregonLanguageReadingFIRSTHAND_SECONDHAND, washingtonLanguageRmlMiddleRML_4, washingtonLanguageSpellingSPELLING_4, ...ontarioG4LanguageUnits],
  science: [...gradesG2ScienceCourse.units, ...ontarioG4ScienceUnits, ...gradesG3ScienceCourse.units, ...gradesG5ScienceCourse.units, manitobaG5ScienceWeather, ...texasScience5SCIENCE_5, ...ontarioG5ScienceUnits],
  social: [oregonSocialCopiesHistoryDetective5, oregonSocialCopiesReconstruction8, ...oregonSocialG5OWN_SOCIAL_5, ...californiaSocialG5SOCIAL_5, ...newYorkSocialG8UNITS, ...californiaSocialG8SOCIAL_8],
};

export const courses: Course[] = withLessons(mississippiGrade("4", POOL, OWN), LESSONS);
