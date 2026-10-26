import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Mississippi's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson under its own id, and a unit borrowed from another grade carries the lesson it has
// there. Mississippi's own units have lessons written for them.
export const LESSONS: GradeLessons = {
  "language/ms-g7-info-analysis": lesson(
    [
      "Many texts have two central ideas. Show how people, events and ideas affect each other.",
      "Word choice matters: a metaphor like “a lifeline” suggests something that saves.",
      "Two writers can stress different evidence on the same topic. Transitions like consequently show cause and effect.",
    ],
    "Which transition shows a cause-and-effect relationship: consequently, similarly or meanwhile?",
    [
      "Cause and effect shows a result.",
      "Consequently means as a result.",
    ],
    "consequently",
  ),
  "language/ms-g7-story-analysis": lesson(
    [
      "Support an analysis with several pieces of evidence.",
      "Trace how a theme develops across the story, and summarize without opinions.",
      "Compare a story with a film version or a history text about the same time.",
    ],
    "What is a central idea?",
    [
      "It isn’t one detail.",
      "It is what the whole text keeps building.",
    ],
    "the main point the text develops over its course",
  ),
  "science/chemical-change-ab": lesson(
    [
      "Signs of a chemical change: gas bubbles, a colour change, a new solid, light or heat.",
      "In an equation, count atoms: the big number multiplies the whole formula; the small number counts one element.",
      "Mass is conserved. Read the hazard symbols on chemicals before using them.",
    ],
    "In 2H₂O, how many hydrogen atoms are there?",
    [
      "Each H₂O has 2 hydrogen atoms.",
      "There are 2 molecules: 2 × 2 = 4.",
    ],
    "4",
  ),
  "science/ms-g7-climate": lesson(
    [
      "Climate is the average weather over many years.",
      "Oceans keep coastal temperatures steady, so coastal cities have mild winters.",
      "People burn much more fossil fuel than 200 years ago, so there is more CO₂ in the air.",
      "We can use less energy, like walking short trips, and adapt, like planting shade trees.",
    ],
    "Why does a coastal city have milder winters than a city far inland?",
    [
      "Ocean water warms and cools slowly.",
      "It keeps nearby temperatures steady.",
    ],
    "the ocean keeps temperatures steady",
  ),
  "science/ms-g7-seasons-tides": lesson(
    [
      "Earth's axis is tilted about 23.5°. Without the tilt there would be almost no seasons.",
      "When a hemisphere tilts toward the Sun, sunlight hits more directly and it has summer.",
      "Earth orbits the Sun about every 365 days.",
      "The Moon's and Sun's gravity pull on the oceans to make tides.",
    ],
    "When the Northern Hemisphere tilts toward the Sun, what season does it have?",
    [
      "Tilted toward the Sun means more direct sunlight.",
      "More direct sunlight means summer.",
    ],
    "summer",
  ),
};
