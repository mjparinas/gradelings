import { defineFramework, gradeRange } from "../manifest";
import { NUNAVUT } from "./framework";

export const manifest = defineFramework({
  id: "ca-nu",
  framework: NUNAVUT,
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
  guides: () => import("./guides").then((m) => m.NUNAVUT_GUIDES),
  // Nunavut: French as an Additional Language for Nunavut, Grades 4 to 9. No immersion program is built.
  french: { immersion: [], "core-french": gradeRange("4", "9") },
});
