import type { PlanEntry } from "../../placement";

// Texas social studies in Grades 4 and 7: Texas history (TEKS §113.15 and §113.19). Both grades are written for Texas
// (../units/social-g4.ts and social-g7.ts, `tx-` ids), so neither shares nor adopts units from other frameworks.
export const PLAN_SOCIAL_TEXAS: Record<string, readonly PlanEntry[]> = {
  "4/social": [],
  "7/social": [],
};

export const FOCUS_SOCIAL_TEXAS: Record<string, string[]> = {
  "4/social": [
    "Texas history: American Indian groups, explorers and missions, Mexican Texas",
    "The Texas Revolution, the Republic, statehood, the Civil War and Reconstruction",
    "Cattle, railroads, oil and 20th-century Texas",
    "Texas regions and maps, free enterprise, government, citizenship and celebrations",
  ],
  "7/social": [
    "Texas history by era, from Natural Texas and its People to Contemporary Texas",
    "Revolution and Republic, the Civil War, reform and civil rights movements",
    "Texas geography, population and an economy tied to the nation and the world",
    "The Texas Constitution, state and local government, and citizenship",
  ],
};
