import { defineFramework } from "../manifest";
import { UTAH } from "./framework";

export const manifest = defineFramework({
  id: "us-ut",
  framework: UTAH,
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
  guides: () => import("./guides").then((m) => m.UTAH_GUIDES),
  schools: () => import("./schools").then((m) => m.SCHOOLS),
  // Utah: no French subject in the app (see gradelings-research/utah/README.md).
  french: { immersion: [], "core-french": [] },
});
