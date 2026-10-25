import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Nevada's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Nevada examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "language/nv-g7-info-analysis": lesson(
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
  "language/nv-g7-story-analysis": lesson(
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
  "science/nv-g7-biodiversity": lesson(
    [
      "Biodiversity is the variety of life in an area.",
      "Ecosystem services include clean water, food and storm protection.",
      "Protecting springs like Ash Meadows, wetlands and sagebrush keeps habitat for many species, some found nowhere else.",
    ],
    "How do wetlands help people?",
    [
      "Wetland plants trap dirt.",
      "They also soak up floodwater.",
    ],
    "by filtering water and holding floodwater",
  ),
  "science/nv-g7-earth-surface": lesson(
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
  "science/nv-g7-resources": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes.",
      "Nevada's gold, silver and lithium formed where heat, water and moving rock concentrated minerals long ago.",
      "Using resources has costs: mines change the land, and taking too much groundwater dries up springs.",
      "Scientists map hazards such as earthquakes and wildfires, and monitoring networks help warn people early.",
    ],
    "Why are minerals like gold found in some places and not others?",
    [
      "Minerals collect only where certain geologic processes happened.",
      "Those processes happened in some places, such as Nevada, and not others.",
    ],
    "past geologic processes put them there",
  ),
  "social/ny-g5-cultures": lesson(
    [
      "People of the Americas have ancestors from Native nations, Europe, Africa and Asia.",
      "Languages come from history: Canada uses English and French; Haiti uses French and Haitian Creole; Brazil uses Portuguese.",
      "Each country has celebrations; Mexico's Independence Day is September 16.",
    ],
    "What are Canada's two official languages?",
    [
      "Canada was colonized by France and Britain.",
      "Both languages are official.",
    ],
    "English and French",
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
  "social/nv-g7-nevada-in-the-world": lesson(
    [
      "Geographers use five themes: location, place, human-environment interaction, movement and region.",
      "Location is where a place is; place is what it is like; region is an area with shared features, like the Great Basin.",
      "Hoover Dam is human-environment interaction; tourists and gold travelling the world are movement.",
    ],
    "Tourists fly to Las Vegas from around the world. Which theme is that?",
    [
      "People are going from one place to another.",
      "Moving people, goods and ideas is the theme of movement.",
    ],
    "movement",
  ),
};
