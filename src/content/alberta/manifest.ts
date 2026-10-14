import { defineFramework, gradeRange } from "../manifest";
import { ALBERTA } from "./framework";

export const manifest = defineFramework({
  id: "ca-ab",
  framework: ALBERTA,
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
  guides: () => import("./guides").then((m) => m.ALBERTA_GUIDES),
  // Alberta: French Immersion from Kindergarten; the French as a Second Language program starts in Grade 4.
  french: { immersion: gradeRange("k", "9"), "core-french": gradeRange("4", "9") },
  // Some of Alberta's units are Ontario-written (listed under `shares`), so an Alberta child downloads Ontario's file for the grade too.
  depends: ["ca-on"],
});
