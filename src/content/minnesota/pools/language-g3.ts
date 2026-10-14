import type { Unit } from "../../types";
import { RML_3 as washingtonUnitsLanguageRmlMiddleRML_3 } from "../../washington/units/language-rml-middle";
import { units as ontarioG3LanguageUnits } from "../../ontario/g3-language";
import { wonder as manitobaUnitsG3MoreLanguageWonder } from "../../manitoba/units/g3-more-language";

// The units Minnesota's Grade 3 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG3LanguageUnits, manitobaUnitsG3MoreLanguageWonder, washingtonUnitsLanguageRmlMiddleRML_3];
