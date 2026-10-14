import type { Unit } from "../../types";
import { units as albertaG9Science } from "../../alberta/g9-science";
import { units as ontarioG7Science } from "../../ontario/g7-science";
import { units as ontarioG9Science } from "../../ontario/g9-science";
import { SCIENCE_8 as washingtonScience8 } from "../../washington/units/science-68";
import { SCIENCE_9 as washingtonScience9 } from "../../washington/units/science-9";
import { SCIENCE_8 as texasScience8 } from "../units/science-8";

// Texas Grade 8 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG9Science, ...ontarioG7Science, ...albertaG9Science, ...washingtonScience8, ...washingtonScience9];

export const OWN: readonly Unit[] = texasScience8;
