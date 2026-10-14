import type { Unit } from "../../types";
import { units as ontarioG6Language } from "../../ontario/g6-language";
import { RML_6 as washingtonLanguageRmlUpperRML_6 } from "../../washington/units/language-rml-upper";
import { SPELLING_6 as washingtonLanguageSpellingSPELLING_6 } from "../../washington/units/language-spelling";
import { mediaBias as manitobaG6MoreLanguageMediaBias, writingPlan as manitobaG6MoreLanguageWritingPlan } from "../../manitoba/units/g6-more-language";

// The units New York's Grade 6 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG6Language, ...washingtonLanguageRmlUpperRML_6, washingtonLanguageSpellingSPELLING_6, manitobaG6MoreLanguageWritingPlan, manitobaG6MoreLanguageMediaBias];
