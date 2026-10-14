import { defineFramework } from "../manifest";
import { ALASKA } from "./framework";

export const manifest = defineFramework({
  id: "us-ak",
  framework: ALASKA,
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
  guides: () => import("./guides").then((m) => m.ALASKA_GUIDES),
  // Alaska: no French subject (see docs/research/alaska/README.md).
  french: { immersion: [], "core-french": [] },
});
