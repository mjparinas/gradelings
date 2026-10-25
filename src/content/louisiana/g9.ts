import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG9Science_units } from "../alberta/g9-science";
import { COPIES_8 as arizonaUnitsCopiesG8_COPIES_8 } from "../arizona/units/copies-g8";
import { WORLD_LITERATURE_9 as californiaUnitsLanguageG9_WORLD_LITERATURE_9 } from "../california/units/language-g9";
import { RHETORIC_AND_SOURCES_9 as californiaUnitsLanguageG9_RHETORIC_AND_SOURCES_9 } from "../california/units/language-g9";
import { QUANTITIES_9 as californiaUnitsMathG9_QUANTITIES_9 } from "../california/units/math-g9";
import { GRAPHS_CONTEXT_9 as californiaUnitsMathG9_GRAPHS_CONTEXT_9 } from "../california/units/math-g9";
import { QUADRATIC_MODELS_9 as californiaUnitsMathG9_QUADRATIC_MODELS_9 } from "../california/units/math-g9";
import { INVERSE_GROWTH_9 as californiaUnitsMathG9_INVERSE_GROWTH_9 } from "../california/units/math-g9";
import { CORRELATION_9 as californiaUnitsMathG9_CORRELATION_9 } from "../california/units/math-g9";
import { OWN_SCIENCE as californiaUnitsScienceG9_OWN_SCIENCE } from "../california/units/science-g9";
import { PHYSICAL_SCIENCE as californiaUnitsScienceG9Physical_PHYSICAL_SCIENCE } from "../california/units/science-g9-physical";
import { SOCIAL_9 as californiaUnitsSocialG9_SOCIAL_9 } from "../california/units/social-g9";
import { units as manitobaUnitsG9MoreLanguage_units } from "../manitoba/units/g9-more-language";
import { units as manitobaUnitsG9MoreScience_units } from "../manitoba/units/g9-more-science";
import { units as manitobaUnitsG9Science_units } from "../manitoba/units/g9-science";
import { units as ontarioG9Language_units } from "../ontario/g9-language";
import { units as ontarioG9Math_units } from "../ontario/g9-math";
import { units as ontarioG9Science_units } from "../ontario/g9-science";
import { MEDIA_ANALYSIS as oregonUnitsLanguage_MEDIA_ANALYSIS } from "../oregon/units/language";
import { OWN_SOCIAL_9 as oregonUnitsSocialG9_OWN_SOCIAL_9 } from "../oregon/units/social-g9";
import { RML_9 as washingtonUnitsLanguageRmlUpper_RML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonUnitsLanguageSpelling_SPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonUnitsMathUpper_G9_UNITS } from "../washington/units/math-upper";
import { SCIENCE_9 as washingtonUnitsScience9_SCIENCE_9 } from "../washington/units/science-9";
import { G9 as washingtonUnitsSocial59G9_G9 } from "../washington/units/social-59-g9";
import { withLessons } from "../lessons";
import { louisianaGrade } from "./kit";
import { LESSONS } from "./lessons/g9";
import { OWN } from "./units/own-g9";

// Louisiana Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for
// Louisiana's own units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG9Math_units, ...washingtonUnitsMathUpper_G9_UNITS, californiaUnitsMathG9_QUANTITIES_9, californiaUnitsMathG9_GRAPHS_CONTEXT_9, californiaUnitsMathG9_QUADRATIC_MODELS_9, californiaUnitsMathG9_INVERSE_GROWTH_9, californiaUnitsMathG9_CORRELATION_9],
  language: [...ontarioG9Language_units, ...manitobaUnitsG9MoreLanguage_units, ...washingtonUnitsLanguageRmlUpper_RML_9, washingtonUnitsLanguageSpelling_SPELLING_9, oregonUnitsLanguage_MEDIA_ANALYSIS, californiaUnitsLanguageG9_WORLD_LITERATURE_9, californiaUnitsLanguageG9_RHETORIC_AND_SOURCES_9],
  science: [...ontarioG9Science_units, ...albertaG9Science_units, ...manitobaUnitsG9Science_units, ...manitobaUnitsG9MoreScience_units, ...washingtonUnitsScience9_SCIENCE_9, ...californiaUnitsScienceG9_OWN_SCIENCE, ...californiaUnitsScienceG9Physical_PHYSICAL_SCIENCE],
  social: [...californiaUnitsSocialG9_SOCIAL_9, ...washingtonUnitsSocial59G9_G9, ...oregonUnitsSocialG9_OWN_SOCIAL_9, ...arizonaUnitsCopiesG8_COPIES_8],
};

export const courses: Course[] = withLessons(louisianaGrade("9", POOL, OWN), LESSONS);
