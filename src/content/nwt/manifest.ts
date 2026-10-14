import { defineFramework, gradeRange } from "../manifest";
import { NORTHWEST_TERRITORIES } from "./framework";

export const manifest = defineFramework({
  id: "ca-nt",
  framework: NORTHWEST_TERRITORIES,
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
  guides: () => import("./guides").then((m) => m.NWT_GUIDES),
  // The Northwest Territories adopts the BC curriculum (adapted), including its French programs.
  french: { immersion: gradeRange("k", "9"), "core-french": gradeRange("5", "9") },
});
