import type { Unit } from "../../types";
import { units as manitobaG8MoreLanguage } from "../../manitoba/units/g8-more-language";
import { units as ontarioG8Language } from "../../ontario/g8-language";
import { WEIGH_THE_EVIDENCE as oregonLanguageWEIGH_THE_EVIDENCE } from "../../oregon/units/language";
import { RML_8 as washingtonLanguageRmlUpperRML_8 } from "../../washington/units/language-rml-upper";
import { units as albertaG8Language } from "../../alberta/g8-language";

// The units New York's Grade 8 language course copies from other frameworks (see ../plan/language.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG8Language, ...manitobaG8MoreLanguage, ...washingtonLanguageRmlUpperRML_8, oregonLanguageWEIGH_THE_EVIDENCE, ...albertaG8Language];
