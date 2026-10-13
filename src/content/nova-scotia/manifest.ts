import { defineFramework, gradeRange } from "../manifest";
import { NOVA_SCOTIA } from "./framework";

export const manifest = defineFramework({
  id: "ca-ns",
  framework: NOVA_SCOTIA,
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
  guides: () => import("./guides").then((m) => m.NOVA_SCOTIA_GUIDES),
  // Nova Scotia: Français arts langagiers (French Immersion) from Primary; Core French from Grade 4.
  french: { immersion: gradeRange("k", "9"), "core-french": gradeRange("4", "9") },
});
