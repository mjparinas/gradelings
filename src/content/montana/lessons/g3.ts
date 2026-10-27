import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Montana's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Montana examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/mt-g3-fossils": lesson(
    [
      "A fossil is what is left of a plant or animal from long ago, kept in rock.",
      "Fossils show what lived in a place and what the place was like.",
      "Dinosaur bones, eggs and nests found in Montana rock show dinosaurs lived here long ago.",
    ],
    "Coral fossils are found in a field far from any sea. What does that tell us?",
    [
      "Coral only grows in warm, shallow seas.",
      "So that place was once under a warm sea.",
    ],
    "it was once a warm sea",
  ),
  "science/mt-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today: hot, cold, rainy or windy.",
      "Climate is the usual weather over many years.",
      "Montana has warm summers, cold snowy winters, and sometimes warm chinook winds.",
    ],
    "Is 'Helena gets snow most winters' about weather or climate?",
    [
      "It talks about many winters, not one day.",
      "A pattern over many years is climate.",
    ],
    "climate",
  ),
  "social/mt-g3-tribal-nations": lesson(
    [
      "Many Nations have their own names, like Apsáalooke for the Crow and Nakoda for the Assiniboine.",
      "Other names, like Gros Ventre, came from traders speaking other languages.",
      "Who tells a story changes how it is told, so historians listen to more than one side.",
    ],
    "The Crow people call themselves what?",
    [
      "A Nation's own name comes from its own language.",
      "The Crow name is Apsáalooke.",
    ],
    "Apsáalooke",
  ),
  "social/mt-g3-local-government": lesson(
    [
      "Cities have mayors and councils; Montana's 56 counties have commissioners; school boards run school districts.",
      "Tribal councils and tribal courts govern reservations.",
      "Citizens take part by staying informed, taking action and voting at 18.",
    ],
    "Who makes decisions for the schools in a district?",
    [
      "Each government has its own job.",
      "Voters elect a school board to run the schools.",
    ],
    "the school board",
  ),
  "social/mt-g3-symbols": lesson(
    [
      "A symbol is a picture or object that stands for an idea.",
      "The flag, the bald eagle and the Statue of Liberty stand for the United States.",
      "Montana's motto is Oro y Plata, gold and silver; Tribal Nations have their own flags.",
    ],
    "What do the 50 stars on the US flag stand for?",
    [
      "The flag changed as states joined.",
      "There is one star for each state.",
    ],
    "the 50 states",
  ),
  "social/mt-g3-americas": lesson(
    [
      "North America holds Canada, the United States and Mexico; Central America joins it to South America.",
      "Big landforms include the Rockies, the Andes, the Great Plains and the Amazon.",
      "People change the land with dams, farms and cities, and the land shapes how they live.",
    ],
    "Which country is north of Montana?",
    [
      "Montana is on the northern border of the United States.",
      "The country across that border is Canada.",
    ],
    "Canada",
  ),
};
