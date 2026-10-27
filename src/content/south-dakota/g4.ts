import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4Math } from "../alberta/g4-math";
import { units as manitobaG4MoreScience } from "../manitoba/units/g4-more-science";
import { units as ontarioG4Language } from "../ontario/g4-language";
import { units as ontarioG4Math } from "../ontario/g4-math";
import { units as ontarioG4Science } from "../ontario/g4-science";
import { FIRSTHAND_SECONDHAND as oregonLanguageReadingFIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { SCIENCE_COPIES as oregonScienceCopiesSCIENCE_COPIES } from "../oregon/units/science-copies";
import { RML_4 as washingtonLanguageRmlMiddleRML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonLanguageSpellingSPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonMathMiddleG4_UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonScience35SCIENCE_4 } from "../washington/units/science-35";
import { LANGUAGE_4 as californiaLanguage4 } from "../california/units/language-g4";
import { MATH_4 as californiaMath4 } from "../california/units/math-g4";
import { OWN_SCIENCE as californiaOwnScience4 } from "../california/units/science-g4";
import { SOCIAL_6 as californiaUnitsSocialG6_SOCIAL6 } from "../california/units/social-g6";
import { SOCIAL_7 as californiaUnitsSocialG7_SOCIAL7 } from "../california/units/social-g7";
import { course as gradesG8Social_course } from "../grades/g8/social";
import { UNITS as newYorkUnitsSocialG9_UNITS } from "../new-york/units/social-g9";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL5 } from "../california/units/social-g5";
import { G8 as washingtonUnitsSocial59G8_G8 } from "../washington/units/social-59-g8";
import { withLessons } from "../lessons";
import { southDakotaGrade } from "./kit";
import { LESSONS } from "./lessons/g4";
import { OWN } from "./units/own-g4";

// South Dakota Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for South Dakota's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG4Math, ...albertaG4Math, ...washingtonMathMiddleG4_UNITS, ...californiaMath4],
  language: [...ontarioG4Language, washingtonLanguageRmlMiddleRML_4, washingtonLanguageSpellingSPELLING_4, oregonLanguageReadingFIRSTHAND_SECONDHAND, ...californiaLanguage4],
  science: [...ontarioG4Science, ...manitobaG4MoreScience, ...washingtonScience35SCIENCE_4, ...(oregonScienceCopiesSCIENCE_COPIES["4"] ?? []), ...californiaOwnScience4],
  social: [...californiaUnitsSocialG6_SOCIAL6, ...californiaUnitsSocialG7_SOCIAL7, ...gradesG8Social_course.units, ...newYorkUnitsSocialG9_UNITS, ...californiaUnitsSocialG5_SOCIAL5, ...washingtonUnitsSocial59G8_G8],
};

export const courses: Course[] = withLessons(southDakotaGrade("4", POOL, OWN), LESSONS);
