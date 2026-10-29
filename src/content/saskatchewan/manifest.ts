import { defineFramework, gradeRange } from "../manifest";
import { SASKATCHEWAN } from "./framework";

export const manifest = defineFramework({
  id: "ca-sk",
  framework: SASKATCHEWAN,
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
  guides: () => import("./guides").then((m) => m.SASKATCHEWAN_GUIDES),
  // Saskatchewan: French Immersion (Kindergarten to Grade 12) and Core French (curriculum Levels 1 to 9, listed under
  // Grades 1 to 9). Source: Saskatchewan Curriculum and saskatchewan.ca "Studying French in Saskatchewan".
  french: { immersion: gradeRange("k", "9"), "core-french": gradeRange("1", "9") },
});
