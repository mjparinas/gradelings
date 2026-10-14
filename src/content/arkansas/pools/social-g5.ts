import type { Unit } from "../../types";
import { units as ontarioG8Social } from "../../ontario/g8-social";
import { UNITS as alabamaUnitsSocialG7 } from "../../alabama/units/social-g7";
import { UNITS as newYorkUnitsSocialG6 } from "../../new-york/units/social-g6";
import { SOCIAL_6 as texasUnitsSocialG6SOCIAL_6 } from "../../texas/units/social-g6";

// The units Arkansas's Grade 5 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG8Social, ...alabamaUnitsSocialG7, ...newYorkUnitsSocialG6, ...texasUnitsSocialG6SOCIAL_6];
