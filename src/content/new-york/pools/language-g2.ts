import type { Unit } from "../../types";
import { moreLanguage as manitobaG2MoreLanguageMoreLanguage } from "../../manitoba/units/g2-more-language";
import { units as ontarioG2Language } from "../../ontario/g2-language";
import { RML_2 as washingtonLanguageRmlEarlyRML_2 } from "../../washington/units/language-rml-early";

// The units New York's Grade 2 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG2Language, ...manitobaG2MoreLanguageMoreLanguage, washingtonLanguageRmlEarlyRML_2];
