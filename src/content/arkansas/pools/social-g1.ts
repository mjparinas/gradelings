import type { Unit } from "../../types";
import { units as ontarioG1Social } from "../../ontario/g1-social";
import { OWN_SOCIAL_1 as washingtonUnitsSocialK4G1OWN_SOCIAL_1 } from "../../washington/units/social-k4-g1";
import { peGoodsAndServices1 as princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1 } from "../../prince-edward-island/units/k1-science-social";
import { peNeedsAndWants1 as princeEdwardIslandUnitsK1ScienceSocialPeNeedsAndWants1 } from "../../prince-edward-island/units/k1-science-social";
import { SOCIAL_1 as californiaUnitsSocialG1SOCIAL_1 } from "../../california/units/social-g1";

// The units Arkansas's Grade 1 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...ontarioG1Social, ...washingtonUnitsSocialK4G1OWN_SOCIAL_1, princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1, princeEdwardIslandUnitsK1ScienceSocialPeNeedsAndWants1, ...californiaUnitsSocialG1SOCIAL_1];
