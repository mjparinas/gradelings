import type { Unit } from "../../types";
import { SOCIAL_2 as californiaG2 } from "../../california/units/social-g2";
import { peWorkAndPrices2 } from "../../prince-edward-island/units/g2-science-social";
import { OWN_SOCIAL_2 as oregonG2 } from "../../oregon/units/social-k3";
import { units as ontarioG2 } from "../../ontario/g2-social";

// The units Alabama's Grade 2 social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...californiaG2, peWorkAndPrices2, ...oregonG2, ...ontarioG2];
