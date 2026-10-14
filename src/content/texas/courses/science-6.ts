import type { Unit } from "../../types";
import { storedEnergy as manitobaG6StoredEnergy } from "../../manitoba/units/g6-science";
import { units as ontarioG6Science } from "../../ontario/g6-science";
import { units as ontarioG7Science } from "../../ontario/g7-science";
import { units as ontarioG8Science } from "../../ontario/g8-science";
import { units as ontarioG9Science } from "../../ontario/g9-science";
import { SCIENCE_6 as washingtonScience6, SCIENCE_7 as washingtonScience7, SCIENCE_8 as washingtonScience8 } from "../../washington/units/science-68";
import { SCIENCE_6 as texasScience6 } from "../units/science-6";

// Texas Grade 6 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG6Science, ...ontarioG7Science, ...ontarioG8Science, ...ontarioG9Science, manitobaG6StoredEnergy, ...washingtonScience6, ...washingtonScience7, ...washingtonScience8];

export const OWN: readonly Unit[] = texasScience6;
