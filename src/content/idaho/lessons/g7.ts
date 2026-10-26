import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "language/id-g7-story-analysis": lesson(
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
  "language/id-g7-info-analysis": lesson(
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
  "science/id-g7-biodiversity": lesson(
    [
      "Biodiversity is the variety of life in an area.",
      "Ecosystem services include clean water, food and flood protection.",
      "Protecting sagebrush, wetlands and forests keeps habitat for many species, from sage grouse to salmon.",
    ],
    "How do wetlands help people?",
    [
      "Wetland plants trap dirt.",
      "They also soak up floodwater.",
    ],
    "by filtering water and holding floodwater",
  ),
  "science/id-g7-space": lesson(
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
  "social/id-g7-idaho-in-the-world": lesson(
    [
      "Idaho exports potatoes, cheese, wheat and computer chips. Selling goods abroad is exporting.",
      "Tariffs are taxes on imports. When other countries put tariffs on US farm goods, buyers abroad buy less.",
      "International organizations, like the United Nations and the World Trade Organization, help nations solve shared problems.",
      "Globalization brings more buyers and cheaper goods, but also jobs that can move abroad.",
    ],
    "Idaho sells potatoes, cheese and wheat to other countries. Selling goods abroad is called…",
    [
      "Ex- means out.",
      "Goods sent out of the country are exports.",
    ],
    "exporting",
  ),
  "social/ny-g5-economics": lesson(
    [
      "Every economy answers: what to produce, how to produce it, and for whom.",
      "Traditional economies follow custom; market economies let buyers and sellers decide prices.",
      "Needs are things you must have to live. Countries trade resources, like Venezuela's oil.",
    ],
    "In a market economy, who mostly decides prices?",
    [
      "Market means people buy and sell freely.",
      "So buyers and sellers decide.",
    ],
    "buyers and sellers",
  ),
  "social/ny-g5-governments": lesson(
    [
      "The US has three branches: legislative, executive and judicial.",
      "Mexico is divided into states, like the US. Canada's head of government is the prime minister.",
      "Groups like the OAS and UNICEF help countries work together and help children.",
    ],
    "Who is the head of government in Canada?",
    [
      "The US has a president.",
      "Canada's government is led by a prime minister.",
    ],
    "the prime minister",
  ),
};
