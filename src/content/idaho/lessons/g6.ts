import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Grade 6 units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "science/id-g6-earth-surface": lesson(
    [
      "Matching coastlines, fossils and rocks on far-apart continents show they were once joined.",
      "Plates pull apart at mid-ocean ridges and collide to build mountains and volcanoes.",
      "Some changes are sudden (earthquakes); others take millions of years (mountain building).",
    ],
    "Is a landslide a fast or a very slow change to Earth’s surface?",
    [
      "A landslide happens in minutes.",
      "Mountain building takes millions of years.",
    ],
    "fast",
  ),
  "science/id-g6-resources": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes, like Idaho's silver in the north.",
      "Scientists map hazards such as earthquakes, floods, landslides and wildfires.",
      "Monitoring networks (seismometers, GPS, stream gauges) help warn people early.",
    ],
    "What does a flood hazard map show?",
    [
      "Floods cover low land near rivers.",
      "People need to know where water could reach.",
    ],
    "areas that could flood",
  ),
  "science/id-g6-earth-history": lesson(
    [
      "Rock layers and fossils order Earth’s 4.6-billion-year history; lower layers are older.",
      "Most of that history is the Precambrian. We live in the Cenozoic Era.",
      "Homologous structures show that living things share ancestors.",
    ],
    "In which era do we live today?",
    [
      "The eras go Paleozoic, Mesozoic, Cenozoic.",
      "The latest is the Cenozoic.",
    ],
    "the Cenozoic Era",
  ),
  "social/ca-g7-exploration-and-empire": lesson(
    [
      "Europeans sailed to find sea routes to Asia; Vasco da Gama reached India by sailing around Africa.",
      "New tools helped: the Mercator projection kept compass directions straight for sailors.",
      "The Columbian Exchange moved plants, animals and diseases, and ships carried enslaved Africans across the Atlantic against their will.",
    ],
    "How did Vasco da Gama reach India?",
    [
      "He sailed from Portugal.",
      "He went south along the coast of Africa.",
      "He rounded its tip and crossed to India.",
    ],
    "by sailing around Africa",
  ),
};
