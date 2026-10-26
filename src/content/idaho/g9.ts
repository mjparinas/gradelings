import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG9Science } from "../alberta/g9-science";
import { LANGUAGE_9 as californiaUnitsLanguageG9LANGUAGE_9 } from "../california/units/language-g9";
import { MATH_9 as californiaUnitsMathG9MATH_9 } from "../california/units/math-g9";
import { OWN_SCIENCE as californiaUnitsScienceG9OWN_SCIENCE } from "../california/units/science-g9";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9PhysicalPHYSICAL_SCIENCE } from "../california/units/science-g9-physical";
import { SOCIAL_9 as californiaUnitsSocialG9SOCIAL_9 } from "../california/units/social-g9";
import { units as manitobaUnitsG9MoreLanguage } from "../manitoba/units/g9-more-language";
import { units as manitobaUnitsG9MoreScience } from "../manitoba/units/g9-more-science";
import { units as manitobaUnitsG9Science } from "../manitoba/units/g9-science";
import { units as ontarioG9Language } from "../ontario/g9-language";
import { units as ontarioG9Math } from "../ontario/g9-math";
import { units as ontarioG9Science } from "../ontario/g9-science";
import { MEDIA_ANALYSIS as oregonUnitsLanguageMEDIA_ANALYSIS } from "../oregon/units/language";
import { RML_9 as washingtonUnitsLanguageRmlUpperRML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonUnitsLanguageSpellingSPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonUnitsMathUpperG9_UNITS } from "../washington/units/math-upper";
import { SCIENCE_9 as washingtonUnitsScience9SCIENCE_9 } from "../washington/units/science-9";
import { withLessons } from "../lessons";
import { idahoGrade } from "./kit";
import { LESSONS } from "./lessons/g9";
import { OWN } from "./units/own-g9";

// Idaho Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Idaho's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG9Math, ...washingtonUnitsMathUpperG9_UNITS, ...californiaUnitsMathG9MATH_9],
  language: [...ontarioG9Language, ...manitobaUnitsG9MoreLanguage, ...washingtonUnitsLanguageRmlUpperRML_9, washingtonUnitsLanguageSpellingSPELLING_9, oregonUnitsLanguageMEDIA_ANALYSIS, ...californiaUnitsLanguageG9LANGUAGE_9],
  science: [...ontarioG9Science, ...albertaG9Science, ...manitobaUnitsG9Science, ...manitobaUnitsG9MoreScience, ...washingtonUnitsScience9SCIENCE_9, ...californiaUnitsScienceG9OWN_SCIENCE, ...californiaUnitsScienceG9PhysicalPHYSICAL_SCIENCE],
  social: [...californiaUnitsSocialG9SOCIAL_9],
};

export const courses: Course[] = withLessons(idahoGrade("9", POOL, OWN), LESSONS);
