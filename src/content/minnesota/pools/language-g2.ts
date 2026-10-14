import type { Unit } from "../../types";
import { RML_2 as washingtonUnitsLanguageRmlEarlyRML_2 } from "../../washington/units/language-rml-early";
import { moreLanguage as manitobaUnitsG2MoreLanguageMoreLanguage } from "../../manitoba/units/g2-more-language";
import { units as ontarioG2LanguageUnits } from "../../ontario/g2-language";

// The units Minnesota's Grade 2 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG2LanguageUnits, ...manitobaUnitsG2MoreLanguageMoreLanguage, washingtonUnitsLanguageRmlEarlyRML_2];
