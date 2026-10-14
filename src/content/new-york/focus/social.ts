import { FOCUS_SOCIAL_K3 } from "./social-k3";
import { FOCUS_SOCIAL_G4 } from "./social-g4";
import { FOCUS_SOCIAL_G56 } from "./social-g56";
import { FOCUS_SOCIAL_G78 } from "./social-g78";
import { FOCUS_SOCIAL_G9 } from "./social-g9";

// What each New York social studies course focuses on, keyed "<grade>/social". Each grade band's copy is in its own file.
export const FOCUS_SOCIAL: Record<string, string[]> = {
  ...FOCUS_SOCIAL_K3,
  ...FOCUS_SOCIAL_G4,
  ...FOCUS_SOCIAL_G56,
  ...FOCUS_SOCIAL_G78,
  ...FOCUS_SOCIAL_G9,
};
