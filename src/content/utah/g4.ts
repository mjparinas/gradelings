import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4Math_units } from "../alberta/g4-math";
import { LANGUAGE_4 as californiaUnitsLanguageG4_LANGUAGE_4 } from "../california/units/language-g4";
import { MATH_4 as californiaUnitsMathG4_MATH_4 } from "../california/units/math-g4";
import { units as manitobaUnitsG4MoreScience_units } from "../manitoba/units/g4-more-science";
import { units as ontarioG4Language_units } from "../ontario/g4-language";
import { units as ontarioG4Math_units } from "../ontario/g4-math";
import { units as ontarioG4Science_units } from "../ontario/g4-science";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReading_FIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { historyDetective5 as oregonUnitsSocialCopies_historyDetective5 } from "../oregon/units/social-copies";
import { OWN_SOCIAL_5 as oregonUnitsSocialG5_OWN_SOCIAL_5 } from "../oregon/units/social-g5";
import { RML_4 as washingtonUnitsLanguageRmlMiddle_RML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpelling_SPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonUnitsMathMiddle_G4_UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonUnitsScience35_SCIENCE_4 } from "../washington/units/science-35";
import { withLessons } from "../lessons";
import { utahGrade } from "./kit";
import { LESSONS } from "./lessons/g4";
import { OWN } from "./units/own-g4";

// Utah Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so the
// download carries those files and not the other frameworks' whole grades. LESSONS are the lessons for Utah's own
// units and for units Utah teaches in a different grade from the original, which ship in this download.
const POOL: Pool = {
  math: [...washingtonUnitsMathMiddle_G4_UNITS, ...ontarioG4Math_units, ...californiaUnitsMathG4_MATH_4, ...albertaG4Math_units],
  language: [...californiaUnitsLanguageG4_LANGUAGE_4, washingtonUnitsLanguageRmlMiddle_RML_4, washingtonUnitsLanguageSpelling_SPELLING_4, oregonUnitsLanguageReading_FIRSTHAND_SECONDHAND, ...ontarioG4Language_units],
  science: [...washingtonUnitsScience35_SCIENCE_4, ...manitobaUnitsG4MoreScience_units, ...ontarioG4Science_units],
  social: [oregonUnitsSocialCopies_historyDetective5, ...oregonUnitsSocialG5_OWN_SOCIAL_5],
};

export const courses: Course[] = withLessons(utahGrade("4", POOL, OWN), LESSONS);
