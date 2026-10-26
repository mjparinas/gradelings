import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4Math } from "../alberta/g4-math";
import { LANGUAGE_4 as californiaUnitsLanguageG4LANGUAGE_4 } from "../california/units/language-g4";
import { MATH_4 as californiaUnitsMathG4MATH_4 } from "../california/units/math-g4";
import { OWN_SCIENCE as californiaUnitsScienceG4OWN_SCIENCE } from "../california/units/science-g4";
import { units as manitobaUnitsG4MoreScience } from "../manitoba/units/g4-more-science";
import { units as ontarioG4Language } from "../ontario/g4-language";
import { units as ontarioG4Math } from "../ontario/g4-math";
import { units as ontarioG4Science } from "../ontario/g4-science";
import { FIRSTHAND_SECONDHAND as oregonUnitsLanguageReadingFIRSTHAND_SECONDHAND } from "../oregon/units/language-reading";
import { RML_4 as washingtonUnitsLanguageRmlMiddleRML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonUnitsLanguageSpellingSPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonUnitsMathMiddleG4_UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonUnitsScience35SCIENCE_4 } from "../washington/units/science-35";
import { withLessons } from "../lessons";
import { idahoGrade } from "./kit";
import { LESSONS } from "./lessons/g4";
import { OWN } from "./units/own-g4";

// Idaho Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades. LESSONS adds the lessons for Idaho's own
// units and for units it teaches in a different grade from the original.
const POOL: Pool = {
  math: [...ontarioG4Math, ...albertaG4Math, ...washingtonUnitsMathMiddleG4_UNITS, ...californiaUnitsMathG4MATH_4],
  language: [...ontarioG4Language, washingtonUnitsLanguageRmlMiddleRML_4, washingtonUnitsLanguageSpellingSPELLING_4, oregonUnitsLanguageReadingFIRSTHAND_SECONDHAND, ...californiaUnitsLanguageG4LANGUAGE_4],
  science: [...ontarioG4Science, ...manitobaUnitsG4MoreScience, ...washingtonUnitsScience35SCIENCE_4, ...californiaUnitsScienceG4OWN_SCIENCE],
  social: [],
};

export const courses: Course[] = withLessons(idahoGrade("4", POOL, OWN), LESSONS);
