import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6ScienceUnits } from "../alberta/g6-science";
import { units as albertaG7MathUnits } from "../alberta/g7-math";
import { units as albertaG9ScienceUnits } from "../alberta/g9-science";
import { MATH_7 as californiaMathG7MATH_7 } from "../california/units/math-g7";
import { SOCIAL_6 as californiaSocialG6SOCIAL_6 } from "../california/units/social-g6";
import { course as gradesG8SocialCourse } from "../grades/g8/social";
import { wordRoots as manitobaG7LanguageWordRoots } from "../manitoba/units/g7-language";
import { units as manitobaG8MoreSocialAUnits } from "../manitoba/units/g8-more-social-a";
import { units as ontarioG7LanguageUnits } from "../ontario/g7-language";
import { units as ontarioG7MathUnits } from "../ontario/g7-math";
import { units as ontarioG7ScienceUnits } from "../ontario/g7-science";
import { units as ontarioG9ScienceUnits } from "../ontario/g9-science";
import { OWN_SOCIAL_7 as oregonSocialG67OWN_SOCIAL_7 } from "../oregon/units/social-g67";
import { RML_7 as washingtonLanguageRmlUpperRML_7 } from "../washington/units/language-rml-upper";
import { SPELLING_7 as washingtonLanguageSpellingSPELLING_7 } from "../washington/units/language-spelling";
import { G7_UNITS as washingtonMathUpperG7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_7 as washingtonScience68SCIENCE_7 } from "../washington/units/science-68";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/g7";
import { OWN } from "./units/own-g7";

// Mississippi Grade 7. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...washingtonMathUpperG7_UNITS, ...ontarioG7MathUnits, ...californiaMathG7MATH_7, ...albertaG7MathUnits],
  language: [...ontarioG7LanguageUnits, ...washingtonLanguageRmlUpperRML_7, manitobaG7LanguageWordRoots, washingtonLanguageSpellingSPELLING_7],
  science: [...ontarioG7ScienceUnits, ...albertaG9ScienceUnits, ...albertaG6ScienceUnits, ...washingtonScience68SCIENCE_7, ...ontarioG9ScienceUnits],
  social: [...californiaSocialG6SOCIAL_6, ...gradesG8SocialCourse.units, ...oregonSocialG67OWN_SOCIAL_7, ...manitobaG8MoreSocialAUnits],
};

export const courses: Course[] = withLessons(mississippiGrade("7", POOL, OWN), LESSONS);
