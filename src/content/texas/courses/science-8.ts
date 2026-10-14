import type { Unit } from "../../types";
import { motionForces as newBrunswickG8ScienceMotionForces } from "../../new-brunswick/units/g8-science";
import { SCIENCE_COPIES as oregonScienceCopiesSCIENCE_COPIES } from "../../oregon/units/science-copies";
import { SCIENCE_8 as washingtonScience68SCIENCE_8 } from "../../washington/units/science-68";

// Texas Grade 8 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [newBrunswickG8ScienceMotionForces, ...washingtonScience68SCIENCE_8, ...(oregonScienceCopiesSCIENCE_COPIES["8"] ?? [])];

export const OWN: readonly Unit[] = [];
