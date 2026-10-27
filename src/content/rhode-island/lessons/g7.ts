import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Rhode Island's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Rhode Island examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "language/ri-g7-info-analysis": lesson(
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
  "language/ri-g7-story-analysis": lesson(
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
  "science/ri-g7-biodiversity": lesson(
    [
      "Biodiversity is the variety of life in an area.",
      "Ecosystem services include clean water, food and storm protection.",
      "Protecting Narragansett Bay's eelgrass and salt marshes keeps habitat for fish, shellfish and birds like piping plovers.",
    ],
    "How do salt marshes help people?",
    [
      "Marsh plants trap dirt and soak up extra nutrients.",
      "They also soak up storm water and slow waves.",
    ],
    "by filtering water and holding back floods",
  ),
  "science/ri-g7-earth-surface": lesson(
    [
      "Matching coastlines, fossils and rocks on far-apart continents show they were once joined.",
      "Plates pull apart at mid-ocean ridges and collide to build mountains and volcanoes, such as the Andes.",
      "Some changes are sudden (earthquakes); others take millions of years (mountain building).",
    ],
    "Is a landslide a fast or a very slow change to Earth’s surface?",
    [
      "A landslide happens in minutes.",
      "Mountain building takes millions of years.",
    ],
    "fast",
  ),
  "science/ri-g7-resources": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes.",
      "Rhode Island's Westerly granite formed from cooled magma deep underground, and glaciers left sand and gravel across the state.",
      "Using resources has costs: quarries change the land, and taking too much groundwater dries up wells.",
      "Scientists forecast hazards such as hurricanes, and monitoring networks help warn people early.",
    ],
    "Why are minerals like gold found in some places and not others?",
    [
      "Minerals collect only where certain geologic processes happened.",
      "Those processes happened in some places and not others.",
    ],
    "past geologic processes put them there",
  ),
};
