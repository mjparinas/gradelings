import { defineFramework } from "../manifest";
import { OHIO } from "./framework";

export const manifest = defineFramework({
  id: "us-oh",
  framework: OHIO,
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
  guides: () => import("./guides").then((m) => m.OHIO_GUIDES),
  schools: () => import("./schools").then((m) => m.SCHOOLS),
  // Ohio: no French subject (see docs/research/ohio/README.md).
  french: { immersion: [], "core-french": [] },
});
