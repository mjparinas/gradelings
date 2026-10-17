import type { Unit } from "../../types";
import { LANGUAGE_5 as californiaUnitsLanguageG5LANGUAGE5 } from "../../california/units/language-g5";
import { SPELLING_5 as washingtonUnitsLanguageSpellingSPELLING5 } from "../../washington/units/language-spelling";
import { RML_5 as washingtonUnitsLanguageRmlMiddleRML5 } from "../../washington/units/language-rml-middle";
import { multimodal as manitobaUnitsG5MoreLanguageMultimodal } from "../../manitoba/units/g5-more-language";
import { LANGUAGE_5 as texasUnitsLanguage5LANGUAGE5 } from "../../texas/units/language-5";

// The units Florida's Grade 5 English language arts course copies from other frameworks (see ../plan). Import only the unit files it
// adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaUnitsLanguageG5LANGUAGE5, washingtonUnitsLanguageSpellingSPELLING5, washingtonUnitsLanguageRmlMiddleRML5, manitobaUnitsG5MoreLanguageMultimodal, ...texasUnitsLanguage5LANGUAGE5];
