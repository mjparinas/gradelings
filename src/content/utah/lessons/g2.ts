import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Utah's Grade 2 units that the shared lesson files don't cover: Utah's own units, Utah copies of
// other states' units (the original's lesson with Utah examples), and units Utah teaches in a different grade from the
// original (the lesson they have there).
export const LESSONS: GradeLessons = {
  "science/ut-g2-habitats": lesson(
    ["A habitat is a place where a living thing finds food, water and shelter.", "Each habitat has its own plants and animals: lizards in Utah's deserts, elk in its mountain forests.", "Brine shrimp live in the very salty Great Salt Lake, where most animals can't."],
    "Where would a desert tortoise live?",
    ["It needs warm, dry land.", "That is a desert."],
    "a desert",
  ),
  "science/ut-g2-earth-changes": lesson(
    ["Some changes are fast, like flash floods and landslides.", "Some are slow, like water and ice wearing away rock to make Utah's arches.", "Plant roots and rock walls help slow wind and water from changing land."],
    "Water and ice shape a stone arch over thousands of years. Fast or slow?",
    ["Thousands of years is a long time.", "That is a slow change."],
    "slow",
  ),
  "science/wa-g1-nature-ideas": lesson(
    ["Plants and animals have parts that help them live.", "Owls have big eyes to see at night. Quills protect a porcupine.", "People copy these parts to make new things."],
    "What do a plant's roots do?",
    ["Roots grow down into the soil.", "They take in water."],
    "take in water",
  ),
  "social/pe-needs-and-wants-1": lesson(
    ["A need is something we must have to live, like water.", "People work to earn money to buy what they need.", "People want different things. That is okay."],
    "Which is something all people need?",
    ["Everyone must drink to live."],
    "clean water",
  ),
};
