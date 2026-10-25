import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/la-g1-louisiana-symbols": lesson(
    [
      "Louisiana is one of the 50 states. Its capital is Baton Rouge.",
      "Louisiana has parishes instead of counties. There are 64.",
      "Its symbols include the brown pelican, the magnolia and the black bear.",
    ],
    "What is the capital of Louisiana?",
    [
      "The capital is where the state government works.",
      "The State Capitol is in Baton Rouge.",
    ],
    "Baton Rouge",
  ),
  "social/la-g1-louisiana-cultures": lesson(
    [
      "Native Americans lived here first, and Native nations live here today.",
      "Later, people came from France, Spain, Africa, Haiti, Asia and more.",
      "Each group added foods, music and words to Louisiana.",
    ],
    "Acadians in Louisiana are also called…",
    [
      "The word “Cajun” comes from “Acadian.”",
      "So Acadians are called Cajuns.",
    ],
    "Cajuns",
  ),
  "social/la-g1-louisiana-government": lesson(
    [
      "Louisiana's government keeps people safe and makes rules.",
      "Lawmakers make laws. The governor carries them out.",
      "Courts decide if laws were broken. Good citizens vote and help.",
    ],
    "Who is the leader of Louisiana?",
    [
      "A city has a mayor. The country has a President.",
      "The state has a governor.",
    ],
    "the governor",
  ),
  "social/la-g1-louisiana-regions": lesson(
    [
      "Your town is in a parish. Your parish is in Louisiana.",
      "Louisiana has regions, like Acadiana and North Louisiana.",
      "Regions have bayous, swamps, forests or farmland.",
    ],
    "Which is bigger, a parish or a state?",
    [
      "A state is made of many parishes.",
      "So the state is bigger.",
    ],
    "a state",
  ),
  "social/la-g1-louisiana-resources": lesson(
    [
      "Natural resources come from nature, like timber, seafood and oil.",
      "Levees hold back rivers, and bridges cross water.",
      "Goods move by truck, train and ship.",
    ],
    "Why do people build levees?",
    [
      "Rivers can flood towns.",
      "Levees are walls of earth that hold the water back.",
    ],
    "to keep rivers from flooding towns",
  ),
};
