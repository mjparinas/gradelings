import type { Course } from "../types";
import type { Pool } from "../placement";
import { UNITS as alabamaSocialG9UNITS } from "../alabama/units/social-g9";
import { units as albertaG8ScienceUnits } from "../alberta/g8-science";
import { units as albertaG9ScienceUnits } from "../alberta/g9-science";
import { LANGUAGE_9 as californiaLanguageG9LANGUAGE_9 } from "../california/units/language-g9";
import { MATH_9 as californiaMathG9MATH_9 } from "../california/units/math-g9";
import { OWN_SCIENCE as californiaScienceG9OWN_SCIENCE } from "../california/units/science-g9";
import { PHYSICAL_SCIENCE as californiaScienceG9PhysicalPHYSICAL_SCIENCE } from "../california/units/science-g9-physical";
import { SOCIAL_COPIES as coloradoCopiesG6SOCIAL_COPIES } from "../colorado/units/copies-g6";
import { SOCIAL_COPIES as georgiaCopiesG7SOCIAL_COPIES } from "../georgia/units/copies-g7";
import { units as manitobaG9MoreLanguageUnits } from "../manitoba/units/g9-more-language";
import { units as manitobaG9ScienceUnits } from "../manitoba/units/g9-science";
import { units as ontarioG8SocialUnits } from "../ontario/g8-social";
import { units as ontarioG9LanguageUnits } from "../ontario/g9-language";
import { units as ontarioG9MathUnits } from "../ontario/g9-math";
import { units as ontarioG9ScienceUnits } from "../ontario/g9-science";
import { MEDIA_ANALYSIS as oregonLanguageMEDIA_ANALYSIS } from "../oregon/units/language";
import { SOCIAL_6 as texasSocialG6SOCIAL_6 } from "../texas/units/social-g6";
import { RML_9 as washingtonLanguageRmlUpperRML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonLanguageSpellingSPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonMathUpperG9_UNITS } from "../washington/units/math-upper";
import { SCIENCE_9 as washingtonScience9SCIENCE_9 } from "../washington/units/science-9";
import { withLessons } from "../lessons";
import { mississippiGrade } from "./kit";
import { LESSONS } from "./lessons/g9";
import { OWN } from "./units/own-g9";

// Mississippi Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Mississippi's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...washingtonMathUpperG9_UNITS, ...californiaMathG9MATH_9, ...ontarioG9MathUnits],
  language: [...ontarioG9LanguageUnits, ...californiaLanguageG9LANGUAGE_9, ...manitobaG9MoreLanguageUnits, oregonLanguageMEDIA_ANALYSIS, washingtonLanguageSpellingSPELLING_9, ...washingtonLanguageRmlUpperRML_9],
  science: [...californiaScienceG9OWN_SCIENCE, ...californiaScienceG9PhysicalPHYSICAL_SCIENCE, ...ontarioG9ScienceUnits, ...washingtonScience9SCIENCE_9, ...manitobaG9ScienceUnits, ...albertaG9ScienceUnits, ...albertaG8ScienceUnits],
  social: [...georgiaCopiesG7SOCIAL_COPIES, ...coloradoCopiesG6SOCIAL_COPIES, ...texasSocialG6SOCIAL_6, ...alabamaSocialG9UNITS, ...ontarioG8SocialUnits],
};

export const courses: Course[] = withLessons(mississippiGrade("9", POOL, OWN), LESSONS);
