import type { Unit } from "../../types";
import { wonder as manitobaG3MoreLanguageWonder } from "../../manitoba/units/g3-more-language";
import { units as ontarioG3Language } from "../../ontario/g3-language";
import { RML_3 as washingtonLanguageRmlMiddleRML_3 } from "../../washington/units/language-rml-middle";

// Texas Grade 3 language. POOL is the units this course may copy from other frameworks (see ../plan/language.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG3Language, manitobaG3MoreLanguageWonder, washingtonLanguageRmlMiddleRML_3];

export const OWN: readonly Unit[] = [];
