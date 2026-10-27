import { lesson, type GradeLessons } from "../../lessons";

// Lessons for North Dakota's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with North Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "language/nd-g7-info-analysis": lesson(
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
  "language/nd-g7-story-analysis": lesson(
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
  "science/nd-g7-biodiversity": lesson(
    [
      "Biodiversity is the variety of life in an area.",
      "Ecosystem services include clean water, food, pollination and flood control.",
      "Protecting prairie pothole wetlands and native grassland keeps habitat for ducks, pollinators and birds like piping plovers.",
    ],
    "How do prairie wetlands help people?",
    [
      "Wetland plants trap dirt and soak up extra nutrients.",
      "They also hold rain and snowmelt.",
    ],
    "by filtering water and holding back floods",
  ),
  "science/nd-g7-earth-surface": lesson(
    [
      "Matching coastlines, fossils and rocks on far-apart continents show they were once joined.",
      "Plates pull apart at mid-ocean ridges and collide to build mountains and volcanoes, such as the Andes.",
      "Some changes are sudden (landslides); others take millions of years (mountain building).",
      "Rivers drop sand where they slow down, as the Missouri River does in Lake Sakakawea.",
    ],
    "Is a landslide a fast or a very slow change to Earth’s surface?",
    [
      "A landslide happens in minutes.",
      "Mountain building takes millions of years.",
    ],
    "fast",
  ),
  "science/nd-g7-resources": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes.",
      "North Dakota's lignite formed from buried swamp plants, and its oil formed in the deep Bakken rock layer.",
      "Using resources has costs: mines change the land, and taking too much groundwater dries up wells.",
      "Scientists forecast hazards such as Red River floods by measuring snow and spring temperatures.",
    ],
    "Why is western North Dakota rich in oil when many places have none?",
    [
      "Oil forms only from certain buried ancient remains.",
      "Those rocks and conditions are there, deep underground.",
    ],
    "past geologic processes formed it there",
  ),
  // Adopted here from another grade, so its lesson ships with North Dakota's grade.
  "social/or-g6-world-maps": lesson(
    [
      "The equator is 0° latitude; the North Pole is 90° N. The prime meridian splits east and west.",
      "Asia is the largest continent. The Indian Ocean lies between Africa and Australia.",
      "Use the scale: multiply inches on the map by the miles each inch stands for.",
    ],
    "1 inch = 40 miles. Two towns are 5 inches apart. How far apart are they?",
    [
      "Each inch is 40 miles.",
      "5 × 40 = 200.",
    ],
    "200 miles",
  ),
  "social/ga-g6-latin-america": lesson(
    [
      "Key features: the Amazon Rainforest, the Andes Mountains and the Atacama Desert.",
      "Most people speak Spanish, but Brazil speaks Portuguese.",
      "Issues include rainforest loss in Brazil and air pollution in Mexico City.",
    ],
    "Why is the Amazon Rainforest shrinking?",
    [
      "People clear land.",
      "Trees are cut for farms, ranches, logging and mining.",
    ],
    "people cut and clear it for farms and logging",
  ),
  "social/ga-g6-europe": lesson(
    [
      "Key features include the Alps, the Pyrenees, the Ural Mountains and the Rhine River.",
      "Europe has many languages and religions in a small area.",
      "The European Union helps member countries trade and work together.",
    ],
    "Which mountains are often called the line between Europe and Asia?",
    [
      "They run north to south through Russia.",
      "Their name starts with U.",
    ],
    "the Ural Mountains",
  ),
};
