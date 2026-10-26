import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Connecticut's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Connecticut examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "language/ct-g7-story-analysis": lesson(
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
  "language/ct-g7-info-analysis": lesson(
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
  "science/ct-g7-resources": lesson(
    [
      "Resources like stone, minerals, soil and water are found where past processes put them.",
      "So they are spread unevenly around Earth: glaciers left Connecticut rocky soil, and ancient rift valleys left brownstone.",
      "Scientists use data from the past (river levels, radar, quake records) to forecast hazards.",
    ],
    "Why do Connecticut fields have so many stones?",
    [
      "Glaciers carried rocks and dropped them as the ice melted.",
      "Farmers piled the stones into walls.",
    ],
    "glaciers left them behind",
  ),
  "science/ct-g7-biodiversity": lesson(
    [
      "Biodiversity is the variety of life in a place.",
      "Healthy ecosystems give services like clean water, flood control and pollination.",
      "Good solutions protect biodiversity, for example restoring salt marshes or stopping invasive species.",
    ],
    "Which helps pollinators more: planting native flowers or paving a field?",
    [
      "Pollinators need flowers for food.",
      "Native flowers give food and shelter.",
    ],
    "planting native flowers",
  ),
  "science/ct-g7-earth-surface": lesson(
    [
      "Matching coastlines, fossils and rocks on far-apart continents show they were once joined.",
      "Plates pull apart at mid-ocean ridges and collide to build mountains and volcanoes, such as the Himalayas.",
      "Some changes are sudden (earthquakes); others take millions of years (mountain building).",
    ],
    "Is a landslide a fast or a very slow change to Earth’s surface?",
    [
      "A landslide happens in minutes.",
      "Mountain building takes millions of years.",
    ],
    "fast",
  ),
  "social/ct-g7-japan": lesson(
    [
      "Japan is a chain of mountainous islands with the Pacific Ocean to the east. Mount Fuji is its tallest peak.",
      "Little flat land meant farming in valleys and lots of fishing.",
      "Shinto honours kami, spirits in nature; Buddhism and Confucian ideas of family, order and duty also shaped Japanese values.",
    ],
    "Shinto, an old belief in Japan, honours what?",
    [
      "Shinto shrines are often in natural places, marked by a torii gate.",
      "They honour kami, the spirits in nature and special places.",
    ],
    "kami, the spirits in nature and special places",
  ),
};
