import type { Unit } from "../../types";
import { senses as newBrunswickG6ScienceSenses } from "../../new-brunswick/units/g6-science";
import { units as ontarioG8Science } from "../../ontario/g8-science";
import { SCIENCE_6 as washingtonScience68SCIENCE_6 } from "../../washington/units/science-68";

// Texas Grade 6 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [newBrunswickG6ScienceSenses, ...washingtonScience68SCIENCE_6, ...ontarioG8Science];

export const OWN: readonly Unit[] = [];
