import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Mississippi's Grade 6 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson under its own id, and a unit borrowed from another grade carries the lesson it has
// there. Mississippi's own units have lessons written for them.
export const LESSONS: GradeLessons = {
  "social/ca-g9-rights": lesson(
    [
      "The Bill of Rights protects freedoms like speech, which shields even unpopular ideas.",
      "Courts follow precedent, so old cases still matter: Gideon (1963) gives a lawyer to those who can’t afford one.",
      "Citizens have duties too, like jury service and paying taxes. Rights can be limited to protect safety or others’ rights.",
    ],
    "Why can a court case decided long ago still affect you today?",
    [
      "Courts look at past rulings on similar questions.",
      "They follow that precedent.",
    ],
    "Courts follow precedent from earlier rulings",
  ),
};
