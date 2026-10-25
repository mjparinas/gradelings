import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/la-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today. Climate is the usual weather over many years.",
      "Read weather data for patterns, like warm highs in summer.",
      "Climates differ: rainy, desert, polar.",
    ],
    "“It rains a lot every winter.” Weather or climate?",
    [
      "It describes a pattern year after year.",
    ],
    "climate",
  ),
  "science/la-g3-fossils": lesson(
    [
      "Fossils are remains or traces of living things from long ago.",
      "Most are found in sedimentary rock. Amber can hold an insect.",
      "Fossils tell about past places: seashells on dry land mean sea once covered it.",
    ],
    "Fossil seashells are found on a hill. What does that tell us?",
    [
      "Seashells come from animals that live in the sea.",
    ],
    "the land was once covered by sea",
  ),
  "social/la-g3-famous-americans": lesson(
    [
      "Many Americans changed the country by leading, inventing, exploring or speaking up.",
      "Lewis and Clark explored the West. Harriet Tubman led people to freedom. The Wright Brothers flew the first airplane.",
      "Ask: what did this person do, and why does it still matter?",
    ],
    "Who made the first powered airplane flight?",
    [
      "It happened in 1903 at Kitty Hawk.",
      "Orville and Wilbur Wright flew it.",
    ],
    "the Wright Brothers",
  ),
  "social/la-g3-inventions": lesson(
    [
      "An invention is a new tool or machine that solves a problem.",
      "The steam engine, railroad, car and airplane made travel faster.",
      "The telephone, radio, TV and computers made it faster to share news and talk.",
    ],
    "Which invention lets you talk by voice to someone far away?",
    [
      "Letters are slow. A railroad moves goods.",
      "The telephone carries a voice.",
    ],
    "the telephone",
  ),
  "social/la-g3-big-events": lesson(
    [
      "Some events changed the whole country.",
      "In 1803, the Louisiana Purchase doubled the size of the United States. Louisiana became a state in 1812.",
      "Later, slavery ended, women won the vote, the Civil Rights Movement won equal rights, and astronauts walked on the moon.",
    ],
    "From which country did the United States buy Louisiana?",
    [
      "Napoleon was the leader of France.",
      "He sold Louisiana in 1803.",
    ],
    "France",
  ),
  "social/la-g3-economy": lesson(
    [
      "Producers make goods and services. Consumers buy them.",
      "When many people want something that is scarce, the price goes up.",
      "Every choice has an opportunity cost: the next best thing you give up.",
    ],
    "Ana buys a book instead of a ball. What is her opportunity cost?",
    [
      "She could not have both.",
      "The ball is what she gave up.",
    ],
    "the ball",
  ),
  "social/la-g3-us-geography": lesson(
    [
      "The United States has mountains (the Rockies and Appalachians), plains, lakes, rivers and deserts.",
      "Maps help us find places. The compass rose shows direction, the key explains symbols and the scale shows distance.",
      "A physical map shows land and water; a political map shows borders.",
    ],
    "Which part of a map shows directions?",
    [
      "The key explains symbols. The scale shows distance.",
      "The compass rose shows north, south, east and west.",
    ],
    "the compass rose",
  ),
  "social/az-g2-continents-oceans": lesson(
    [
      "There are 7 continents and 5 oceans. We live in North America.",
      "On a globe, blue is water. Green and brown are land.",
      "The Arctic is the smallest ocean.",
    ],
    "Which continent do we live on?",
    [
      "Find the United States on a globe.",
      "It is on the continent of North America.",
    ],
    "North America",
  ),
};
