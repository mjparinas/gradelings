import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/dc-g8-earth-history": lesson(
    [
      "Rock layers and fossils order Earth’s 4.6-billion-year history; lower layers are older.",
      "Most of that history is the Precambrian. We live in the Cenozoic Era.",
      "Homologous structures show that living things share ancestors.",
    ],
    "In which era do we live today?",
    [
      "The eras go Paleozoic, Mesozoic, Cenozoic.",
      "The latest is the Cenozoic.",
    ],
    "the Cenozoic Era",
  ),
  "science/dc-g8-space": lesson(
    [
      "Mercury is closest to the Sun. Gravity keeps planets in orbit.",
      "Seasons happen because Earth’s axis is tilted.",
      "Tides are caused mostly by the Moon’s gravity. A solar eclipse is when the Moon passes between the Sun and Earth.",
    ],
    "Why does Earth have seasons?",
    [
      "It isn’t because Earth gets much closer to the Sun.",
      "Earth’s tilt changes how direct the sunlight is.",
    ],
    "Earth’s axis is tilted",
  ),
  "social/dc-g8-governing-the-district": lesson(
    [
      "DC's mayor runs the executive branch, and the 13-member Council makes local laws.",
      "Congress can block DC laws and must approve its budget.",
      "DC has a House delegate who can't vote on final bills, two shadow senators, and 3 electoral votes.",
      "Home Rule (1973) replaced appointed commissioners; statehood and retrocession are debated today.",
    ],
    "What does Congress have to approve for DC that it doesn't for any state?",
    [
      "States pass their own budgets.",
      "Congress has power over the federal district.",
    ],
    "DC's budget",
  ),
  "social/dc-g8-capital-of-protest": lesson(
    [
      "The First Amendment protects the right to assemble and petition.",
      "DC's National Mall is near the seats of power, so people march there.",
      "Examples: the 1913 suffrage march, the 1963 March on Washington and the 1990 Capitol Crawl.",
      "Tactics include marches, boycotts, strikes and civil disobedience.",
    ],
    "Why do so many marches happen on the National Mall?",
    [
      "The Capitol and White House are nearby.",
      "Marchers want leaders to hear them.",
    ],
    "it is near the seats of national power",
  ),
  "social/dc-g8-human-rights": lesson(
    [
      "The Universal Declaration of Human Rights (1948) says rights belong to every person.",
      "Eleanor Roosevelt led the committee that wrote it.",
      "The UN and alliances like NATO help countries work together.",
      "Warning signs of genocide include hate speech and laws that target one group.",
    ],
    "Who has human rights under the Universal Declaration?",
    [
      "It begins: all human beings are born free and equal.",
      "It does not depend on country or age.",
    ],
    "every person",
  ),
};
