import { defineFramework } from "../manifest";
import { DELAWARE } from "./framework";

export const manifest = defineFramework({
  id: "us-de",
  framework: DELAWARE,
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
  guides: () => import("./guides").then((m) => m.DELAWARE_GUIDES),
  schools: () => import("./schools").then((m) => m.SCHOOLS),
  // Delaware has no French Immersion or Core French program in its standards, so no French subjects.
  french: { immersion: [], "core-french": [] },
});
