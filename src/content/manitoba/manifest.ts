import { defineFramework, gradeRange } from "../manifest";
import { MANITOBA } from "./framework";

export const manifest = defineFramework({
  id: "ca-mb",
  framework: MANITOBA,
  grades: {
    pk: () => import("./pk"),
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
  guides: () => import("./guides").then((m) => m.MANITOBA_GUIDES),
  // Manitoba: French Immersion from Kindergarten; Core French from Grade 4.
  french: { immersion: gradeRange("k", "9"), "core-french": gradeRange("4", "9") },
});
