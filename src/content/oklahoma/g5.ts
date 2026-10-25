import type { Course } from "../types";
import { type Pool } from "../placement";
import { withLessons } from "../lessons";
import { units as albertaG5Science_units } from "../alberta/g5-science";
import { STORY_READER_5 as californiaUnitsLanguageG5_STORY_READER_5 } from "../california/units/language-g5";
import { INFO_READER_5 as californiaUnitsLanguageG5_INFO_READER_5 } from "../california/units/language-g5";
import { SENTENCES_SIGNALS_5 as californiaUnitsLanguageG5_SENTENCES_SIGNALS_5 } from "../california/units/language-g5";
import { LINE_PLOTS_5 as californiaUnitsMathG5_LINE_PLOTS_5 } from "../california/units/math-g5";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { mental as manitobaUnitsG5Math_mental } from "../manitoba/units/g5-math";
import { quadrilaterals as manitobaUnitsG5Math_quadrilaterals } from "../manitoba/units/g5-math";
import { multimodal as manitobaUnitsG5MoreLanguage_multimodal } from "../manitoba/units/g5-more-language";
import { weather as manitobaUnitsG5Science_weather } from "../manitoba/units/g5-science";
import { UNITS as newYorkUnitsSocialG5_UNITS } from "../new-york/units/social-g5";
import { units as ontarioG5Science_units } from "../ontario/g5-science";
import { SCIENCE_5 as oregonUnitsScience35_SCIENCE_5 } from "../oregon/units/science-35";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5_OWN_SOCIAL_5 } from "../oregon/units/social-g5";
import { RML_5 as washingtonUnitsLanguageRmlMiddle_RML_5 } from "../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpelling_SPELLING_5 } from "../washington/units/language-spelling";
import { G5_UNITS as washingtonUnitsMathMiddle_G5_UNITS } from "../washington/units/math-middle";
import { SCIENCE_5 as washingtonUnitsScience35_SCIENCE_5 } from "../washington/units/science-35";
import { G8 as washingtonUnitsSocial59G8_G8 } from "../washington/units/social-59-g8";
import { oklahomaGrade } from "./kit";
import { LESSONS } from "./lessons/g5";
import { OWN } from "./units/own-g5";

// Oklahoma Grade 5. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for
// Oklahoma's own units, which ship in this download.
const POOL: Pool = {
  math: [manitobaUnitsG5Math_mental, manitobaUnitsG5Math_quadrilaterals, ...washingtonUnitsMathMiddle_G5_UNITS, californiaUnitsMathG5_LINE_PLOTS_5],
  language: [manitobaUnitsG5MoreLanguage_multimodal, washingtonUnitsLanguageRmlMiddle_RML_5, washingtonUnitsLanguageSpelling_SPELLING_5, californiaUnitsLanguageG5_STORY_READER_5, californiaUnitsLanguageG5_INFO_READER_5, californiaUnitsLanguageG5_SENTENCES_SIGNALS_5],
  science: [...ontarioG5Science_units, ...albertaG5Science_units, manitobaUnitsG5Science_weather, ...washingtonUnitsScience35_SCIENCE_5, ...oregonUnitsScience35_SCIENCE_5],
  social: [...newYorkUnitsSocialG5_UNITS, ...californiaUnitsSocialG5_SOCIAL_5, ...washingtonUnitsSocial59G8_G8, ...californiaUnitsSocialG8_SOCIAL_8, ...oregonUnitsSocialG5_OWN_SOCIAL_5],
};

export const courses: Course[] = withLessons(oklahomaGrade("5", POOL, OWN), LESSONS);
