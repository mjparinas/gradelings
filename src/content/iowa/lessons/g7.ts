import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Iowa's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Iowa examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "language/ia-g7-info-analysis": lesson(
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
  "language/ia-g7-story-analysis": lesson(
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
  "science/ia-g7-biodiversity": lesson(
    [
      "Biodiversity is the variety of life in an area.",
      "Ecosystem services include clean water, food and flood protection.",
      "Protecting prairie, wetlands and river woodlands keeps habitat for many species, from bees to ducks.",
    ],
    "How do wetlands help people?",
    [
      "Wetland plants trap dirt.",
      "They also soak up floodwater.",
    ],
    "by filtering water and holding floodwater",
  ),
  "science/ia-g7-space": lesson(
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
  "social/ia-g7-iowa-in-the-world": lesson(
    [
      "Iowa sells soybeans, pork, corn, ethanol and tractors around the world. Canada and Mexico are its biggest buyers.",
      "Trade agreements, like USMCA, lower barriers. Tariffs are taxes on imports that can cut sales.",
      "International organizations, like the United Nations and the World Trade Organization, help nations solve shared problems.",
      "Globalization brings more buyers and cheaper goods, but also price swings and jobs that move abroad.",
    ],
    "In 2018, China put tariffs on US soybeans. What happened to Iowa soybean farmers?",
    [
      "A tariff makes imports cost more.",
      "China bought fewer US soybeans.",
    ],
    "they sold fewer soybeans to China",
  ),
};
