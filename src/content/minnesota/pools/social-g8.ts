import type { Unit } from "../../types";
import { course as gradesG7SocialCourse } from "../../grades/g7/social";
import { peHumanRights6 as princeEdwardIslandUnitsG6WorldSciencePeHumanRights6 } from "../../prince-edward-island/units/g6-world-science";
import { units as ontarioG8SocialUnits } from "../../ontario/g8-social";

// The units Minnesota's Grade 8 social studies course copies from other frameworks (see ../plan/social.ts). Import only the unit
// files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [princeEdwardIslandUnitsG6WorldSciencePeHumanRights6, ...gradesG7SocialCourse.units, ...ontarioG8SocialUnits];
