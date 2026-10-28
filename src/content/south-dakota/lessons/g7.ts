import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Grade 7 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "language/sd-g7-info-analysis": lesson(
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
  "language/sd-g7-story-analysis": lesson(
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
  "science/sd-g7-biodiversity": lesson(
    [
      "Biodiversity is the variety of life in an area.",
      "Ecosystem services include clean water, food and storm protection.",
      "Protecting prairie potholes and native grassland keeps habitat for ducks, pheasants and black-footed ferrets.",
    ],
    "How do prairie wetlands help people?",
    [
      "Wetland plants trap dirt and soak up extra nutrients.",
      "They also hold snowmelt and storm water.",
    ],
    "by filtering water and holding back floods",
  ),
  "science/sd-g7-earth-surface": lesson(
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
  "science/sd-g7-resources": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes.",
      "The Black Hills' granite formed from cooled magma deep underground, and glaciers left sand and gravel across eastern South Dakota.",
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
  "social/sd-g7-oceti-sakowin": lesson(
    [
      "The Oceti Sakowin, the Seven Council Fires, are the Dakota, Nakota and Lakota peoples.",
      "Kinship, the duties relatives owe each other, holds their communities together.",
      "Other Nations of the region include the Sahnish (Arikara), Mandan, Cheyenne and Crow. Farther away were the Ancestral Pueblo, Hopewell, Aztec, Maya and Inca.",
      "These Nations are living communities today, with their own governments and languages.",
    ],
    "How did the lives of the Lakota and the Sahnish (Arikara) differ before Europeans came?",
    [
      "Many Lakota followed the bison herds on horseback.",
      "The Arikara farmed corn in earth lodge villages on the Missouri.",
    ],
    "the Lakota moved with the bison; the Arikara farmed in villages",
  ),
  "social/sd-g7-south-dakota-geography": lesson(
    [
      "Four dams on the Missouri River made Lake Oahe, Lake Sharpe, Lake Francis Case and Lewis and Clark Lake.",
      "The Black Hills hold Black Elk Peak, Wind Cave, Custer State Park, Mount Rushmore and the Crazy Horse Memorial.",
      "The nine reservations include Pine Ridge, Rosebud, Cheyenne River and Standing Rock.",
    ],
    "Which lake on the Missouri River is near Pierre?",
    [
      "Oahe Dam is just north of Pierre.",
      "The lake behind it is the largest in the state.",
    ],
    "Lake Oahe",
  ),
};
