import type { Unit } from "../../types";
import { moreLanguage as manitobaG2MoreLanguageMoreLanguage } from "../../manitoba/units/g2-more-language";
import { units as ontarioG2Language } from "../../ontario/g2-language";
import { RML_2 as washingtonLanguageRmlEarlyRML_2 } from "../../washington/units/language-rml-early";

// Texas Grade 2 language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG2Language, ...manitobaG2MoreLanguageMoreLanguage, washingtonLanguageRmlEarlyRML_2];

export const OWN: readonly Unit[] = [];
