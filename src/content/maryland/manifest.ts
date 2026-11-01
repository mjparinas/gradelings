import { defineFramework } from "../manifest";
import { MARYLAND } from "./framework";

export const manifest = defineFramework({
  id: "us-md",
  framework: MARYLAND,
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
  guides: () => import("./guides").then((m) => m.MARYLAND_GUIDES),
  schools: () => import("./schools").then((m) => m.SCHOOLS),
  // Maryland: no French subject (see gradelings-research/maryland/README.md).
  french: { immersion: [], "core-french": [] },
});
