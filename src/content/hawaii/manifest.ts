import { defineFramework } from "../manifest";
import { HAWAII } from "./framework";

export const manifest = defineFramework({
  id: "us-hi",
  framework: HAWAII,
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
  guides: () => import("./guides").then((m) => m.HAWAII_GUIDES),
  schools: () => import("./schools").then((m) => m.SCHOOLS),
  // Hawaiʻi: no French subject in the app (see docs/research/hawaii/README.md).
  french: { immersion: [], "core-french": [] },
});
