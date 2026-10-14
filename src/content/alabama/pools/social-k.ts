import type { Unit } from "../../types";
import { socialUnits as manitobaK } from "../../manitoba/units/gk-more-social";
import { SOCIAL_K as californiaK } from "../../california/units/social-k";
import { UNITS as newYorkK } from "../../new-york/units/social-k";
import { OWN_SOCIAL_K as oregonK } from "../../oregon/units/social-k3";
import { peFirstMapsK } from "../../prince-edward-island/units/k1-science-social";
import { units as ontarioK } from "../../ontario/k-social";

// The units Alabama's Kindergarten social studies course copies from other frameworks (see ../plan/social.ts). Import only the
// unit files it adopts from, so the grade's download carries those files and not other frameworks' whole grades.
export const POOL: readonly Unit[] = [...manitobaK, ...californiaK, ...newYorkK, ...oregonK, peFirstMapsK, ...ontarioK];
