import type { Course } from "../types";
import { type Pool } from "../placement";
import { withLessons } from "../lessons";
import { units as albertaG9Science_units } from "../alberta/g9-science";
import { WORLD_LITERATURE_9 as californiaUnitsLanguageG9_WORLD_LITERATURE_9 } from "../california/units/language-g9";
import { RHETORIC_AND_SOURCES_9 as californiaUnitsLanguageG9_RHETORIC_AND_SOURCES_9 } from "../california/units/language-g9";
import { GRAPHS_CONTEXT_9 as californiaUnitsMathG9_GRAPHS_CONTEXT_9 } from "../california/units/math-g9";
import { CORRELATION_9 as californiaUnitsMathG9_CORRELATION_9 } from "../california/units/math-g9";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9Physical_PHYSICAL_SCIENCE } from "../california/units/science-g9-physical";
import { OWN_SCIENCE as californiaUnitsScienceG9_OWN_SCIENCE } from "../california/units/science-g9";
import { SOCIAL_9 as californiaUnitsSocialG9_SOCIAL_9 } from "../california/units/social-g9";
import { units as manitobaUnitsG9MoreLanguage_units } from "../manitoba/units/g9-more-language";
import { units as manitobaUnitsG9MoreScience_units } from "../manitoba/units/g9-more-science";
import { units as manitobaUnitsG9Science_units } from "../manitoba/units/g9-science";
import { units as ontarioG9Language_units } from "../ontario/g9-language";
import { units as ontarioG9Math_units } from "../ontario/g9-math";
import { units as ontarioG9Science_units } from "../ontario/g9-science";
import { MEDIA_ANALYSIS as oregonUnitsLanguage_MEDIA_ANALYSIS } from "../oregon/units/language";
import { RML_9 as washingtonUnitsLanguageRmlUpper_RML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonUnitsLanguageSpelling_SPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonUnitsMathUpper_G9_UNITS } from "../washington/units/math-upper";
import { SCIENCE_9 as washingtonUnitsScience9_SCIENCE_9 } from "../washington/units/science-9";
import { oklahomaGrade } from "./kit";
import { LESSONS } from "./lessons/g9";
import { OWN } from "./units/own-g9";

// Oklahoma Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for
// Oklahoma's own units, which ship in this download.
const POOL: Pool = {
  math: [...ontarioG9Math_units, ...washingtonUnitsMathUpper_G9_UNITS, californiaUnitsMathG9_GRAPHS_CONTEXT_9, californiaUnitsMathG9_CORRELATION_9],
  language: [...ontarioG9Language_units, ...manitobaUnitsG9MoreLanguage_units, ...washingtonUnitsLanguageRmlUpper_RML_9, washingtonUnitsLanguageSpelling_SPELLING_9, oregonUnitsLanguage_MEDIA_ANALYSIS, californiaUnitsLanguageG9_WORLD_LITERATURE_9, californiaUnitsLanguageG9_RHETORIC_AND_SOURCES_9],
  science: [...ontarioG9Science_units, ...albertaG9Science_units, ...manitobaUnitsG9Science_units, ...manitobaUnitsG9MoreScience_units, ...washingtonUnitsScience9_SCIENCE_9, ...californiaUnitsScienceG9_OWN_SCIENCE, ...californiaUnitsScienceG9Physical_PHYSICAL_SCIENCE],
  social: [...californiaUnitsSocialG9_SOCIAL_9],
};

export const courses: Course[] = withLessons(oklahomaGrade("9", POOL, OWN), LESSONS);
