import type { Unit } from "../../types";
import { units as ontarioG1Social } from "../../ontario/g1-social";
import { SOCIAL_1 as californiaSocial1 } from "../../california/units/social-g1";
import { OWN_SOCIAL_1 as washingtonSocial1 } from "../../washington/units/social-k4-g1";
import { peGoodsAndServices1, peNeedsAndWants1 } from "../../prince-edward-island/units/k1-science-social";

// The units New York's Grade 1 social course copies from other frameworks (see ../plan/social-k3.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG1Social,
  ...californiaSocial1,
  ...washingtonSocial1,
  peGoodsAndServices1,
  peNeedsAndWants1,
];
