import { defineFramework, gradeRange } from "../manifest";
import { NEWFOUNDLAND_AND_LABRADOR } from "./framework";

export const manifest = defineFramework({
  id: "ca-nl",
  framework: NEWFOUNDLAND_AND_LABRADOR,
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
  guides: () => import("./guides").then((m) => m.NEWFOUNDLAND_AND_LABRADOR_GUIDES),
  // Newfoundland and Labrador: Core French is organized from Grade 4. French Immersion (early from Kindergarten, late from Grade 7)
  // is not built, because its curriculum guides are not public (see gradelings-research/newfoundland-and-labrador/README.md).
  french: { immersion: [], "core-french": gradeRange("4", "9") },
});
