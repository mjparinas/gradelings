import { defineFramework } from "../manifest";
import { SOUTH_CAROLINA } from "./framework";

export const manifest = defineFramework({
  id: "us-sc",
  framework: SOUTH_CAROLINA,
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
  guides: () => import("./guides").then((m) => m.SOUTH_CAROLINA_GUIDES),
  // South Carolina: no French subject (see docs/research/south-carolina/README.md).
  french: { immersion: [], "core-french": [] },
});
