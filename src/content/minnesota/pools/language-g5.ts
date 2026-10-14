import type { Unit } from "../../types";
import { RML_5 as washingtonUnitsLanguageRmlMiddleRML_5 } from "../../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonUnitsLanguageSpellingSPELLING_5 } from "../../washington/units/language-spelling";
import { multimodal as manitobaUnitsG5MoreLanguageMultimodal } from "../../manitoba/units/g5-more-language";

// The units Minnesota's Grade 5 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [manitobaUnitsG5MoreLanguageMultimodal, washingtonUnitsLanguageRmlMiddleRML_5, washingtonUnitsLanguageSpellingSPELLING_5];
