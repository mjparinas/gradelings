import type { Course } from "../types";
import type { Pool } from "../placement";
import { units as albertaG9Math } from "../alberta/g9-math";
import { units as albertaG9Science } from "../alberta/g9-science";
import { units as manitobaG9MoreLanguage } from "../manitoba/units/g9-more-language";
import { units as manitobaG9MoreScience } from "../manitoba/units/g9-more-science";
import { units as manitobaG9Science } from "../manitoba/units/g9-science";
import { units as ontarioG9Language } from "../ontario/g9-language";
import { units as ontarioG9Math } from "../ontario/g9-math";
import { units as ontarioG9Science } from "../ontario/g9-science";
import { RML_9 as washingtonLanguageRmlUpperRML_9 } from "../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonLanguageSpellingSPELLING_9 } from "../washington/units/language-spelling";
import { G9_UNITS as washingtonMathUpperG9_UNITS } from "../washington/units/math-upper";
import { SCIENCE_9 as washingtonScience9SCIENCE_9 } from "../washington/units/science-9";
import { oregonGrade } from "./kit";
import { OWN } from "./units/own-g9";

// Oregon Grade 9. POOL holds the files of the units this grade copies from other frameworks (see ./plan), so
// the download carries those files and not the other frameworks' whole grades.
const POOL: Pool = {
  math: [...ontarioG9Math, ...washingtonMathUpperG9_UNITS, ...albertaG9Math],
  language: [...ontarioG9Language, ...manitobaG9MoreLanguage, ...washingtonLanguageRmlUpperRML_9, washingtonLanguageSpellingSPELLING_9],
  science: [...ontarioG9Science, ...manitobaG9Science, ...albertaG9Science, ...washingtonScience9SCIENCE_9, ...manitobaG9MoreScience],
};

export const courses: Course[] = oregonGrade("9", POOL, OWN);
