import type { Unit } from "../../types";
import { MEDIA_ANALYSIS as oregonUnitsLanguageMEDIA_ANALYSIS } from "../../oregon/units/language";
import { RML_9 as washingtonUnitsLanguageRmlUpperRML_9 } from "../../washington/units/language-rml-upper";
import { SPELLING_9 as washingtonUnitsLanguageSpellingSPELLING_9 } from "../../washington/units/language-spelling";
import { units as manitobaUnitsG9MoreLanguageUnits } from "../../manitoba/units/g9-more-language";
import { units as ontarioG9LanguageUnits } from "../../ontario/g9-language";

// The units Minnesota's Grade 9 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG9LanguageUnits, ...manitobaUnitsG9MoreLanguageUnits, ...washingtonUnitsLanguageRmlUpperRML_9, washingtonUnitsLanguageSpellingSPELLING_9, oregonUnitsLanguageMEDIA_ANALYSIS];
