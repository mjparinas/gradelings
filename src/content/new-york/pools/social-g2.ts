import type { Unit } from "../../types";
import { units as ontarioG2Social } from "../../ontario/g2-social";
import { units as albertaG2Social } from "../../alberta/g2-social";
import { moreSocial as manitobaG2MoreSocial } from "../../manitoba/units/g2-more-social";
import { communityChange as novaScotiaCommunityChange } from "../../nova-scotia/units/g2-social";
import { peWorkAndPrices2 } from "../../prince-edward-island/units/g2-science-social";
import { SOCIAL_2 as californiaSocial2 } from "../../california/units/social-g2";

// The units New York's Grade 2 social course copies from other frameworks (see ../plan/social-k3.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [
  ...ontarioG2Social,
  ...albertaG2Social,
  ...manitobaG2MoreSocial,
  novaScotiaCommunityChange,
  peWorkAndPrices2,
  ...californiaSocial2,
];
