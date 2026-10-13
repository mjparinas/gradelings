import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG4Math } from "../alberta/g4-math";
import { units as manitobaG4MoreScience } from "../manitoba/units/g4-more-science";
import { units as ontarioG4Language } from "../ontario/g4-language";
import { units as ontarioG4Math } from "../ontario/g4-math";
import { units as ontarioG4Science } from "../ontario/g4-science";
import { RML_4 as washingtonLanguageRmlMiddleRML_4 } from "../washington/units/language-rml-middle";
import { SPELLING_4 as washingtonLanguageSpellingSPELLING_4 } from "../washington/units/language-spelling";
import { G4_UNITS as washingtonMathMiddleG4_UNITS } from "../washington/units/math-middle";
import { SCIENCE_4 as washingtonScience35SCIENCE_4 } from "../washington/units/science-35";
import { oregonGrade } from "./kit";
import { OWN } from "./units/own-g4";

// Oregon Grade 4. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...albertaG4Math, ...ontarioG4Math, ...washingtonMathMiddleG4_UNITS],
  language: [...ontarioG4Language, washingtonLanguageRmlMiddleRML_4, washingtonLanguageSpellingSPELLING_4],
  science: [...ontarioG4Science, ...manitobaG4MoreScience, ...washingtonScience35SCIENCE_4],
};

export const courses: Course[] = oregonGrade("4", POOL, OWN);
