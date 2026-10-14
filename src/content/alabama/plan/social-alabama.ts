import type { Entry } from "../kit";

// Alabama social studies, Grades 3 to 5 (Alabama in American History and Government I to III): the units Alabama uses
// from other frameworks, per grade ("<grade>/social"). Alabama's own units for these grades are in ../units/social-g3.ts
// to social-g5.ts.
export const PLAN_SOCIAL_ALABAMA: Record<string, Entry[]> = {
  "3/social": [
    ["or-g2-world-maps", "adopt", "3.1", "using maps and globes to find continents, oceans, hemispheres and countries"],
  ],
  "4/social": [
    ["or-g5-states-capitals", "adopt", "4.11; 4.17", "locating the states, their capitals and major rivers and mountains on a US map"],
    ["or-g8-reconstruction", "adopt", "4.15", "the major events of Reconstruction, the 13th, 14th and 15th Amendments, and how its gains were rolled back"],
  ],
};
