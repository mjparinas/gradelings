import { defineFramework, gradeRange } from "../manifest";
import { PRINCE_EDWARD_ISLAND } from "./framework";

export const manifest = defineFramework({
  id: "ca-pe",
  framework: PRINCE_EDWARD_ISLAND,
  grades: {
    k: () => import("./k"),
    "1": () => import("./g1"),
    "2": () => import("./g2"),
    "3": () => import("./g3"),
    "4": () => import("./g4"),
    "5": () => import("./g5"),
    "6": () => import("./g6"),
    "7": () => import("./g7"),
    "8": () => import("./g8"),
    "9": () => import("./g9"),
  },
  guides: () => import("./guides").then((m) => m.PRINCE_EDWARD_ISLAND_GUIDES),
  // Prince Edward Island: Core French begins no later than Grade 4 (Grades 1 to 3 are local pilots). Early (from Kindergarten), Middle
  // (Grade 4) and Late (Grade 7) French Immersion are not built, because their curriculum guides are not public.
  french: { immersion: [], "core-french": gradeRange("4", "9") },
});
