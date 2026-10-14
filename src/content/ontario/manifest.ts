import { defineFramework, gradeRange } from "../manifest";
import { ONTARIO } from "./framework";

export const manifest = defineFramework({
  id: "ca-on",
  framework: ONTARIO,
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
  guides: () => import("./guides").then((m) => m.ONTARIO_GUIDES),
  // Ontario: Core French is required from Grade 4; French Immersion from Grade 1 (Kindergarten immersion varies by board, so there is none).
  french: { immersion: gradeRange("1", "9"), "core-french": gradeRange("4", "9") },
});
