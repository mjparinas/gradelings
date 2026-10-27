import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Hawaiʻi's Grade 7 units that the shared lesson files don't cover. A copy of another
// state's unit carries the original's lesson (with Hawaiʻi examples where the original named its own state) under its
// own id, and a unit borrowed from another grade carries the lesson it has there. Lessons are written in Canadian
// spelling, like every lesson file; US families see them in US spelling.
export const LESSONS: GradeLessons = {
  "language/hi-g7-info-analysis": lesson(
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
  "language/hi-g7-story-analysis": lesson(
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
  "science/hi-g7-biodiversity": lesson(
    [
      "Biodiversity is the variety of life in an area.",
      "Ecosystem services include clean water, food and storm protection.",
      "Most of Hawaiʻi's native species are found nowhere else, so fencing forests and stopping invasive species protects them.",
    ],
    "How do wetlands help people?",
    [
      "Wetland plants trap dirt.",
      "They also soak up floodwater.",
    ],
    "by filtering water and holding floodwater",
  ),
  "science/hi-g7-earth-surface": lesson(
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
  "science/hi-g7-resources": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes.",
      "Young volcanic islands like Hawaiʻi have no coal, oil or metal ores, but they have geothermal heat and groundwater stored in lava rock.",
      "Using resources has costs: mines change the land, and taking too much groundwater dries up wells and springs.",
      "Scientists map hazards such as lava flows and tsunamis, and monitoring networks help warn people early.",
    ],
    "Why are minerals like gold found in some places and not others?",
    [
      "Minerals collect only where certain geologic processes happened.",
      "Those processes happened in some places, such as old mountain ranges, and not others.",
    ],
    "past geologic processes put them there",
  ),
  "social/hi-g7-changing-kingdom": lesson(
    [
      "In 1819, Liholiho, Kaʻahumanu and Keōpūolani ended the kapu system.",
      "American missionaries arrived in 1820. Schools spread, and many Hawaiians learned to read and write in Hawaiian.",
      "The sandalwood trade stripped the forests and left chiefs in debt. Whaling ships then filled Lāhainā and Honolulu.",
      "Foreign diseases caused the Native Hawaiian population to fall sharply.",
    ],
    "Why did the sandalwood trade end around 1830?",
    [
      "Chiefs had people cut as much as they could sell.",
      "The trees were cut faster than they could grow back.",
    ],
    "the sandalwood was nearly gone",
  ),
  "social/hi-g7-land-and-law": lesson(
    [
      "Kamehameha III's 1840 constitution made Hawaiʻi a constitutional monarchy with an elected house.",
      "The Great Māhele of 1848 divided land among the king, the government and the chiefs.",
      "The Kuleana Act of 1850 let makaʻāinana claim their farms, but few got land, and foreigners could now buy it.",
      "Sugar plantations grew and brought workers from China, Japan, Portugal and later Korea and the Philippines.",
    ],
    "Why did few makaʻāinana get land under the Kuleana Act?",
    [
      "They had to file claims and pay for surveys.",
      "The process was hard and costly for farming families.",
    ],
    "the claims process was hard and costly",
  ),
  "social/hi-g7-overthrow": lesson(
    [
      "The Reciprocity Treaty (1875) tied sugar profits to the United States, and its 1887 renewal gave the US Pearl Harbor.",
      "The Bayonet Constitution of 1887 took power from the king and the vote from many Hawaiians.",
      "In January 1893, the Committee of Safety, backed by US Marines, overthrew Queen Liliʻuokalani.",
      "Hawaiians opposed annexation in the Kūʻē Petitions, but Congress annexed Hawaiʻi by joint resolution in 1898.",
    ],
    "Why did sugar planters want closer ties with the United States?",
    [
      "Most of their sugar was sold in the US.",
      "Tariffs there decided their profits.",
    ],
    "to sell sugar to the US without tariffs",
  ),
  "social/hi-g7-pacific-peoples": lesson(
    [
      "The Pacific Islands are grouped into Polynesia, Micronesia and Melanesia.",
      "Most Pacific languages belong to the Austronesian family, which helps trace how people spread.",
      "High islands are volcanic, with streams and soil; low islands, like atolls, have little fresh water.",
      "Rank and authority are shown through clothing, ornaments, gifts and seating.",
    ],
    "Why do atolls usually hold fewer people than high islands?",
    [
      "Atolls are flat coral islands.",
      "They have little fresh water or soil for farming.",
    ],
    "they have less fresh water and farmland",
  ),
  "social/hi-g7-pacific-today": lesson(
    [
      "Outsiders came for whaling, copra, phosphate and labour, and colonial powers took most islands by 1900.",
      "World War II was fought across the Pacific, and the US tested nuclear weapons in the Marshall Islands from 1946 to 1958.",
      "Compacts of Free Association let Marshallese, Micronesian and Palauan citizens live and work in the US.",
      "Today Pacific nations face rising seas, overfishing and pollution.",
    ],
    "Why are rising seas a serious threat to the Marshall Islands?",
    [
      "The Marshall Islands are atolls.",
      "Atolls are only a few feet above the sea.",
    ],
    "the islands are very low-lying",
  ),
  "social/hi-g7-timeline": lesson(
    [
      "A timeline puts events in order by year, from earliest to latest.",
      "To find how far apart two events are, subtract the earlier year from the later one.",
      "The 1800s are the 19th century; 1778 is in the 18th century.",
    ],
    "How many years passed between the Great Māhele (1848) and the overthrow (1893)?",
    [
      "Subtract the earlier year from the later year.",
      "1893 − 1848 = 45.",
    ],
    "45",
  ),
  "social/hi-g7-unification": lesson(
    [
      "James Cook reached Kauaʻi in 1778. Hawaiian and British accounts of his visit and his death in 1779 differ.",
      "Foreign ships brought trade, new diseases and Western weapons.",
      "Kamehameha won battles at ʻĪao (1790) and Nuʻuanu (1795), and Kauaʻi joined by agreement in 1810.",
      "He governed through chiefs he chose as island governors and controlled the sandalwood trade.",
    ],
    "Why do historians read both Hawaiian and British accounts of Cook's visit?",
    [
      "Each side saw the events from its own point of view.",
      "Comparing them gives a fuller picture.",
    ],
    "each shows a different perspective",
  ),
};
