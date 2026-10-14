import type { Unit } from "../../types";
import { units as ontarioG1 } from "../../ontario/g1-social";
import { OWN_SOCIAL_1 as washingtonG1 } from "../../washington/units/social-k4-g1";
import { peGoodsAndServices1 } from "../../prince-edward-island/units/k1-science-social";
import { SOCIAL_1 as californiaG1 } from "../../california/units/social-g1";

// The units Alabama's Grade 1 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG1, ...washingtonG1, peGoodsAndServices1, ...californiaG1];
