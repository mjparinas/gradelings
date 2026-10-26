import type { Course } from "../types";
import type { Pool } from "../placement";
import { COPIES_2 as arizonaCopiesG2COPIES_2 } from "../arizona/units/copies-g2";
import { LANGUAGE_3 as californiaLanguageG3LANGUAGE_3 } from "../california/units/language-g3";
import { SOCIAL_5 as californiaSocialG5SOCIAL_5 } from "../california/units/social-g5";
import { course as gradesG5ScienceCourse } from "../grades/g5/science";
import { polygons as manitobaG3MathPolygons } from "../manitoba/units/g3-math";
import { wonder as manitobaG3MoreLanguageWonder } from "../manitoba/units/g3-more-language";
import { UNITS as newYorkSocialG3UNITS } from "../new-york/units/social-g3";
import { units as ontarioG3LanguageUnits } from "../ontario/g3-language";
import { units as ontarioG3MathUnits } from "../ontario/g3-math";
import { units as ontarioG3ScienceUnits } from "../ontario/g3-science";
import { SCIENCE_3 as oregonScience35SCIENCE_3 } from "../oregon/units/science-35";
import { SCIENCE_COPIES as oregonScienceCopiesSCIENCE_COPIES } from "../oregon/units/science-copies";
import { OWN_SOCIAL_2 as oregonSocialK3OWN_SOCIAL_2 } from "../oregon/units/social-k3";
import { SCIENCE_5 as texasScience5SCIENCE_5 } from "../texas/units/science-5";
import { RML_3 as washingtonLanguageRmlMiddleRML_3 } from "../washington/units/language-rml-middle";
import { G3_UNITS as washingtonMathMiddleG3_UNITS } from "../washington/units/math-middle";
import { SCIENCE_3 as washingtonScience35SCIENCE_3 } from "../washington/units/science-35";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/g3";
import { OWN } from "./units/own-g3";

// Mississippi Grade 3. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...washingtonMathMiddleG3_UNITS, ...ontarioG3MathUnits, manitobaG3MathPolygons],
  language: [...ontarioG3LanguageUnits, ...californiaLanguageG3LANGUAGE_3, washingtonLanguageRmlMiddleRML_3, manitobaG3MoreLanguageWonder],
  science: [...washingtonScience35SCIENCE_3, ...texasScience5SCIENCE_5, ...oregonScience35SCIENCE_3, ...(oregonScienceCopiesSCIENCE_COPIES["4"] ?? []), ...ontarioG3ScienceUnits, ...gradesG5ScienceCourse.units],
  social: [...newYorkSocialG3UNITS, ...arizonaCopiesG2COPIES_2, ...californiaSocialG5SOCIAL_5, ...oregonSocialK3OWN_SOCIAL_2],
};

export const courses: Course[] = withLessons(mississippiGrade("3", POOL, OWN), LESSONS);
