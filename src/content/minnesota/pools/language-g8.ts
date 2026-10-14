import type { Unit } from "../../types";
import { RML_8 as washingtonUnitsLanguageRmlUpperRML_8 } from "../../washington/units/language-rml-upper";
import { WEIGH_THE_EVIDENCE as oregonUnitsLanguageWEIGH_THE_EVIDENCE } from "../../oregon/units/language";
import { units as manitobaUnitsG8MoreLanguageUnits } from "../../manitoba/units/g8-more-language";
import { units as ontarioG8LanguageUnits } from "../../ontario/g8-language";

// The units Minnesota's Grade 8 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG8LanguageUnits, ...manitobaUnitsG8MoreLanguageUnits, ...washingtonUnitsLanguageRmlUpperRML_8, oregonUnitsLanguageWEIGH_THE_EVIDENCE];
