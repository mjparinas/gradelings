import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG6MathUnits } from "../alberta/g6-math";
import { LANGUAGE_6 as californiaLanguageG6LANGUAGE_6 } from "../california/units/language-g6";
import { MATH_6 as californiaMathG6MATH_6 } from "../california/units/math-g6";
import { SOCIAL_9 as californiaSocialG9SOCIAL_9 } from "../california/units/social-g9";
import { SOCIAL_COPIES as georgiaCopiesG7SOCIAL_COPIES } from "../georgia/units/copies-g7";
import { SOCIAL_6 as georgiaSocialG67SOCIAL_6 } from "../georgia/units/social-g67";
import { SOCIAL_7 as georgiaSocialG67SOCIAL_7 } from "../georgia/units/social-g67";
import { UNITS as newYorkScienceG9UNITS } from "../new-york/units/science-g9";
import { UNITS as newYorkSocialG6UNITS } from "../new-york/units/social-g6";
import { units as ontarioG6LanguageUnits } from "../ontario/g6-language";
import { units as ontarioG6MathUnits } from "../ontario/g6-math";
import { units as ontarioG6ScienceUnits } from "../ontario/g6-science";
import { peHumanRights6 as princeEdwardIslandG6WorldSciencePeHumanRights6 } from "../prince-edward-island/units/g6-world-science";
import { SCIENCE_6 as texasScience6SCIENCE_6 } from "../texas/units/science-6";
import { SCIENCE_7 as texasScience7SCIENCE_7 } from "../texas/units/science-7";
import { SOCIAL_6 as texasSocialG6SOCIAL_6 } from "../texas/units/social-g6";
import { RML_6 as washingtonLanguageRmlUpperRML_6 } from "../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonLanguageSpellingSPELLING_6 } from "../washington/units/language-spelling";
import { G6_UNITS as washingtonMathUpperG6_UNITS } from "../washington/units/math-upper";
import { SCIENCE_6 as washingtonScience68SCIENCE_6 } from "../washington/units/science-68";
import { SCIENCE_8 as washingtonScience68SCIENCE_8 } from "../washington/units/science-68";
import { G6 as washingtonSocial59G6G6 } from "../washington/units/social-59-g6";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/g6";
import { OWN } from "./units/own-g6";

// Mississippi Grade 6. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...washingtonMathUpperG6_UNITS, ...californiaMathG6MATH_6, ...ontarioG6MathUnits, ...albertaG6MathUnits],
  language: [...californiaLanguageG6LANGUAGE_6, ...ontarioG6LanguageUnits, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6],
  science: [...ontarioG6ScienceUnits, ...texasScience7SCIENCE_7, ...texasScience6SCIENCE_6, ...newYorkScienceG9UNITS, ...washingtonScience68SCIENCE_6, ...washingtonScience68SCIENCE_8],
  social: [...georgiaSocialG67SOCIAL_7, ...georgiaCopiesG7SOCIAL_COPIES, ...texasSocialG6SOCIAL_6, ...californiaSocialG9SOCIAL_9, ...washingtonSocial59G6G6, ...newYorkSocialG6UNITS, ...georgiaSocialG67SOCIAL_6, princeEdwardIslandG6WorldSciencePeHumanRights6],
};

export const courses: Course[] = withLessons(mississippiGrade("6", POOL, OWN), LESSONS);
