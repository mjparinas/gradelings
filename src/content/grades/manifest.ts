import { defineFramework, gradeRange } from "../manifest";
import { BRITISH_COLUMBIA } from "./framework";

export const manifest = defineFramework({
  id: "ca-bc",
  framework: BRITISH_COLUMBIA,
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
  guides: () => import("./guides").then((m) => m.BC_GUIDES),
  // BC: French Immersion from Kindergarten; a second language is required from Grade 5 (Core French).
  french: { immersion: gradeRange("k", "9"), "core-french": gradeRange("5", "9") },
});
