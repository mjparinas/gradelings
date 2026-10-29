import { defineFramework, gradeRange } from "../manifest";
import { YUKON } from "./framework";

export const manifest = defineFramework({
  id: "ca-yt",
  framework: YUKON,
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
  guides: () => import("./guides").then((m) => m.YUKON_GUIDES),
  // Yukon implements the BC curriculum, including BC's French programs.
  french: { immersion: gradeRange("k", "9"), "core-french": gradeRange("5", "9") },
});
