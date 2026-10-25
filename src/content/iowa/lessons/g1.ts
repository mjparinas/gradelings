import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Iowa's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Iowa examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/ia-g1-iowa-places": lesson(
    [
      "Our town or city is our community.",
      "Iowa has 99 counties. Each has a county seat.",
      "Des Moines is Iowa's capital. A star marks it on a map.",
      "People live in cities for jobs and on farms for open land.",
    ],
    "What is the capital of Iowa?",
    [
      "State leaders work in the capital.",
      "A star marks it on the map.",
    ],
    "Des Moines",
  ),
  "social/ia-g1-iowa-festivals": lesson(
    [
      "A tradition is something we do again and again.",
      "Festivals help us remember where our families came from.",
      "Tulip Time in Pella remembers Dutch settlers.",
      "Nordic Fest in Decorah remembers settlers from Norway.",
    ],
    "Tulip Time in Pella celebrates settlers from where?",
    [
      "Tulips and wooden shoes are Dutch.",
      "Dutch people come from the Netherlands.",
    ],
    "the Netherlands",
  ),
};
