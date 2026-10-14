import type { Unit } from "../../types";
import { units as manitobaG8MoreLanguage } from "../../manitoba/units/g8-more-language";
import { units as ontarioG8Language } from "../../ontario/g8-language";
import { WEIGH_THE_EVIDENCE as oregonLanguageWEIGH_THE_EVIDENCE } from "../../oregon/units/language";
import { RML_8 as washingtonLanguageRmlUpperRML_8 } from "../../washington/units/language-rml-upper";

// Texas Grade 8 language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG8Language, ...manitobaG8MoreLanguage, ...washingtonLanguageRmlUpperRML_8, oregonLanguageWEIGH_THE_EVIDENCE];

export const OWN: readonly Unit[] = [];
