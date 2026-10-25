import type { Course } from "../types";
import { type Pool } from "../placement";
import { withLessons } from "../lessons";
import { units as albertaG8Math_units } from "../alberta/g8-math";
import { LITERARY_CONNECTIONS_8 as californiaUnitsLanguageG8_LITERARY_CONNECTIONS_8 } from "../california/units/language-g8";
import { VERBS_VOICE_MOOD_8 as californiaUnitsLanguageG8_VERBS_VOICE_MOOD_8 } from "../california/units/language-g8";
import { LINEAR_MODELS_8 as californiaUnitsMathG8_LINEAR_MODELS_8 } from "../california/units/math-g8";
import { OWN_SCIENCE as californiaUnitsScienceG8_OWN_SCIENCE } from "../california/units/science-g8";
import { SOCIAL_5 as californiaUnitsSocialG5_SOCIAL_5 } from "../california/units/social-g5";
import { SOCIAL_8 as californiaUnitsSocialG8_SOCIAL_8 } from "../california/units/social-g8";
import { units as manitobaUnitsG8MoreLanguage_units } from "../manitoba/units/g8-more-language";
import { motionForces as newBrunswickUnitsG8Science_motionForces } from "../new-brunswick/units/g8-science";
import { units as ontarioG7Math_units } from "../ontario/g7-math";
import { units as ontarioG8Language_units } from "../ontario/g8-language";
import { units as ontarioG8Math_units } from "../ontario/g8-math";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguage_WEIGH_THE_EVIDENCE } from "../oregon/units/language";
import { reconstruction8 as oregonUnitsSocialCopies_reconstruction8 } from "../oregon/units/social-copies";
import { RML_8 as washingtonUnitsLanguageRmlUpper_RML_8 } from "../washington/units/language-rml-upper";
import { G8_UNITS as washingtonUnitsMathUpper_G8_UNITS } from "../washington/units/math-upper";
import { G7_UNITS as washingtonUnitsMathUpper_G7_UNITS } from "../washington/units/math-upper";
import { SCIENCE_8 as washingtonUnitsScience68_SCIENCE_8 } from "../washington/units/science-68";
import { G8 as washingtonUnitsSocial59G8_G8 } from "../washington/units/social-59-g8";
import { oklahomaGrade } from "./kit";
import { LESSONS } from "./lessons/g8";
import { OWN } from "./units/own-g8";

// Oklahoma Grade 8. POOL holds the files of the units this grade copies from other frameworks (see ./plan),
// so the download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for
// Oklahoma's own units, which ship in this download.
const POOL: Pool = {
  math: [...ontarioG8Math_units, ...albertaG8Math_units, ...washingtonUnitsMathUpper_G8_UNITS, californiaUnitsMathG8_LINEAR_MODELS_8, ...ontarioG7Math_units, ...washingtonUnitsMathUpper_G7_UNITS],
  language: [...ontarioG8Language_units, ...manitobaUnitsG8MoreLanguage_units, ...washingtonUnitsLanguageRmlUpper_RML_8, oregonUnitsLanguage_WEIGH_THE_EVIDENCE, californiaUnitsLanguageG8_LITERARY_CONNECTIONS_8, californiaUnitsLanguageG8_VERBS_VOICE_MOOD_8],
  science: [newBrunswickUnitsG8Science_motionForces, ...washingtonUnitsScience68_SCIENCE_8, ...californiaUnitsScienceG8_OWN_SCIENCE],
  social: [...californiaUnitsSocialG5_SOCIAL_5, ...californiaUnitsSocialG8_SOCIAL_8, ...washingtonUnitsSocial59G8_G8, oregonUnitsSocialCopies_reconstruction8],
};

export const courses: Course[] = withLessons(oklahomaGrade("8", POOL, OWN), LESSONS);
