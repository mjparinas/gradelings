import type { Entry } from "../kit";
import { PLAN_SOCIAL_K3 } from "./social-k3";
import { PLAN_SOCIAL_G4 } from "./social-g4";
import { PLAN_SOCIAL_G56 } from "./social-g56";
import { PLAN_SOCIAL_G78 } from "./social-g78";
import { PLAN_SOCIAL_G9 } from "./social-g9";

// New York social studies: the units New York uses from other frameworks, per grade ("<grade>/social"), from the NYS
// K-12 Social Studies Framework. Each grade band's plan is in its own file.
export const PLAN_SOCIAL: Record<string, Entry[]> = {
  ...PLAN_SOCIAL_K3,
  ...PLAN_SOCIAL_G4,
  ...PLAN_SOCIAL_G56,
  ...PLAN_SOCIAL_G78,
  ...PLAN_SOCIAL_G9,
};
