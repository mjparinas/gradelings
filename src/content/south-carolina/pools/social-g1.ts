import type { Unit } from "../../types";
import { SOCIAL_1 as californiaUnitsSocialG1SOCIAL_1 } from "../../california/units/social-g1";
import { peGoodsAndServices1 as princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1 } from "../../prince-edward-island/units/k1-science-social";
import { peNeedsAndWants1 as princeEdwardIslandUnitsK1ScienceSocialPeNeedsAndWants1 } from "../../prince-edward-island/units/k1-science-social";
import { units as ontarioG1SocialUnits } from "../../ontario/g1-social";

// The units South Carolina's Grade 1 social studies course copies from other frameworks (see ../plan). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG1SocialUnits,
  princeEdwardIslandUnitsK1ScienceSocialPeGoodsAndServices1,
  princeEdwardIslandUnitsK1ScienceSocialPeNeedsAndWants1,
  ...californiaUnitsSocialG1SOCIAL_1,
];
