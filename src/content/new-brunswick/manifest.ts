import { defineFramework, gradeRange } from "../manifest";
import { NEW_BRUNSWICK } from "./framework";

export const manifest = defineFramework({
  id: "ca-nb",
  framework: NEW_BRUNSWICK,
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
  guides: () => import("./guides").then((m) => m.NEW_BRUNSWICK_GUIDES),
  // New Brunswick (anglophone sector): French Immersion from Grade 1; Core French (Intensive French) from Grade 4.
  french: { immersion: gradeRange("1", "9"), "core-french": gradeRange("4", "9") },
});
