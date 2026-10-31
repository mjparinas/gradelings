import { defineFramework } from "../manifest";
import { NEW_HAMPSHIRE } from "./framework";

export const manifest = defineFramework({
  id: "us-nh",
  framework: NEW_HAMPSHIRE,
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
  guides: () => import("./guides").then((m) => m.NEW_HAMPSHIRE_GUIDES),
  schools: () => import("./schools").then((m) => m.SCHOOLS),
  // New Hampshire: no French subject in the app (see gradelings-research/new-hampshire/README.md).
  french: { immersion: [], "core-french": [] },
});
