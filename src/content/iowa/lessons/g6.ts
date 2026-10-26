import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Iowa's Grade 6 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Iowa examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ia-g6-design": lesson(
    [
      "Criteria are what a solution must do to succeed. Constraints are limits.",
      "A decision matrix compares designs against the criteria.",
      "A trade-off is giving up some of one thing to get more of another.",
      "After a test fails, improve the design and test again.",
    ],
    "A cheaper filter cleans water less well. Choosing it means accepting a… what?",
    [
      "You give up some cleaning to save money.",
      "Giving up one thing for another is a trade-off.",
    ],
    "a trade-off",
  ),
  "science/ia-g6-earth-surface": lesson(
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
  "science/ia-g6-resources": lesson(
    [
      "Minerals, energy and water are spread unevenly because of past geologic processes.",
      "Iowa's deep, rich soil formed from glacier deposits and wind-blown loess over thousands of years.",
      "Using resources has costs: soil can wash away, and drained wetlands lose their wildlife.",
      "Scientists map hazards such as floods and tornadoes, and warning systems help people get ready.",
    ],
    "Why are minerals like gold found in some places and not others?",
    [
      "Minerals collect only where certain geologic processes happened.",
      "Those processes happened in some places and not others.",
    ],
    "past geologic processes put them there",
  ),
  "science/ia-g6-earth-history": lesson(
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
