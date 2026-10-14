import type { Unit } from "../../types";
import { multimodal as manitobaG5MoreLanguageMultimodal } from "../../manitoba/units/g5-more-language";
import { RML_5 as washingtonLanguageRmlMiddleRML_5 } from "../../washington/units/language-rml-middle";
import { SPELLING_5 as washingtonLanguageSpellingSPELLING_5 } from "../../washington/units/language-spelling";

// The units New York's Grade 5 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [manitobaG5MoreLanguageMultimodal, washingtonLanguageRmlMiddleRML_5, washingtonLanguageSpellingSPELLING_5];
