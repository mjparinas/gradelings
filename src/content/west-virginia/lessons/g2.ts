import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Grade 2 units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "science/wv-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Black bears live in forests. Brook trout live in cold streams. Moss grows in bogs.",
      "Each habitat gives its animals food, water and shelter.",
    ],
    "Where do brook trout live: a cold stream or a desert?",
    [
      "A desert is very dry.",
      "Trout need cold, clean water, so they live in streams.",
    ],
    "a cold stream",
  ),
  "science/wv-g2-land-water": lesson(
    [
      "Land can be mountains, hills, valleys, plains or islands.",
      "Water can be rivers, ponds, lakes or oceans. Some water is frozen as ice.",
      "The Ohio River is a river. Spruce Knob is the top of a mountain.",
    ],
    "Land with water all around it is an…?",
    [
      "A peninsula has water on three sides.",
      "Land with water all around is an island.",
    ],
    "island",
  ),
  "science/wv-g2-earth-changes": lesson(
    [
      "Some changes are fast, like landslides and floods.",
      "Some are slow, like a river cutting a gorge over thousands of years.",
      "Plant roots and walls help slow wind and water from changing the land.",
    ],
    "The New River cuts its gorge over thousands of years. Fast or slow?",
    [
      "Thousands of years is a long time.",
      "That is a slow change.",
    ],
    "slow",
  ),
  "social/wv-g2-west-virginia": lesson(
    [
      "West Virginia's capital is Charleston, where the governor works.",
      "Our neighbors are Ohio, Pennsylvania, Maryland, Virginia and Kentucky.",
      "Coal, natural gas and timber are some of our natural resources.",
    ],
    "Which state is across the Ohio River from West Virginia?",
    [
      "The river and the state share a name.",
      "It is Ohio.",
    ],
    "Ohio",
  ),
  "social/wv-g2-reading-maps": lesson(
    [
      "A map is a drawing of a place seen from above. North is usually at the top.",
      "On a grid map, find the column letter, then the row number.",
      "The key explains symbols, like a star for a capital city.",
    ],
    "On a grid map, the park is in square B3. How do you find it?",
    [
      "Find column B first.",
      "Then go to row 3.",
    ],
    "column B, then row 3",
  ),
};
