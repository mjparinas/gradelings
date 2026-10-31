import { defineFramework } from "../manifest";
import { MASSACHUSETTS } from "./framework";

export const manifest = defineFramework({
  id: "us-ma",
  framework: MASSACHUSETTS,
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
  guides: () => import("./guides").then((m) => m.MASSACHUSETTS_GUIDES),
  schools: () => import("./schools").then((m) => m.SCHOOLS),
  // Massachusetts: no French subject (see gradelings-research/massachusetts/README.md).
  french: { immersion: [], "core-french": [] },
});
