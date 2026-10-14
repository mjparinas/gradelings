import type { Unit } from "../../types";
import { wonder as manitobaG3MoreLanguageWonder } from "../../manitoba/units/g3-more-language";
import { units as ontarioG3Language } from "../../ontario/g3-language";
import { RML_3 as washingtonLanguageRmlMiddleRML_3 } from "../../washington/units/language-rml-middle";

// The units New York's Grade 3 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG3Language, manitobaG3MoreLanguageWonder, washingtonLanguageRmlMiddleRML_3];
