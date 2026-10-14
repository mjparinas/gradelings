import type { Unit } from "../../types";
import { course as bcG5Science } from "../../grades/g5/science";
import { course as bcG6Science } from "../../grades/g6/science";
import { units as albertaG8Science } from "../../alberta/g8-science";
import { motionForces as newBrunswickG8MotionForces } from "../../new-brunswick/units/g8-science";
import { units as ontarioG5Science } from "../../ontario/g5-science";
import { units as ontarioG6Science } from "../../ontario/g6-science";
import { units as ontarioG7Science } from "../../ontario/g7-science";
import { SCIENCE_7 as texasScience7 } from "../units/science-7";

// Texas Grade 7 science. POOL is the units this course may copy from other frameworks (see ../plan/science.ts), as the
// exact unit files, so the grade's download carries only those files. OWN is the units written for Texas.
export const POOL: readonly Unit[] = [...ontarioG7Science, ...ontarioG6Science, ...ontarioG5Science, ...albertaG8Science, newBrunswickG8MotionForces, ...bcG5Science.units, ...bcG6Science.units];

export const OWN: readonly Unit[] = texasScience7;
