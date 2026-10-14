import type { Unit } from "../../types";
import { life as manitobaGlobalCommunities } from "../../manitoba/units/g3-social-b";

// The units New York's Grade 3 social course copies from other frameworks (see ../plan/social-k3.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [manitobaGlobalCommunities];
