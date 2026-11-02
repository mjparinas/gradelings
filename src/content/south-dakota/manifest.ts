import { defineFramework } from "../manifest";
import { SOUTH_DAKOTA } from "./framework";

export const manifest = defineFramework({
  id: "us-sd",
  framework: SOUTH_DAKOTA,
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
  guides: () => import("./guides").then((m) => m.SOUTH_DAKOTA_GUIDES),
  schools: () => import("./schools").then((m) => m.SCHOOLS),
  // South Dakota: no French subject in the app (see gradelings-research/south-dakota/README.md).
  french: { immersion: [], "core-french": [] },
});
