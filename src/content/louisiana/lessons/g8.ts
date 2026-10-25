import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/la-g8-earth-history": lesson(
    [
      "In undisturbed rock layers, the oldest are at the bottom (superposition).",
      "An index fossil lived for a short time over a wide area, so it dates layers.",
      "Homologous structures, like a human arm and a bat wing, show shared ancestors.",
    ],
    "Why is an index fossil useful?",
    [
      "It was around only briefly but in many places.",
      "Finding it dates the rock layer.",
    ],
    "it lived for a short time over a wide area",
  ),
  "science/la-g8-earth-surface": lesson(
    [
      "Matching coastlines, fossils and rocks on far-apart continents show they were once joined.",
      "Plates pull apart at mid-ocean ridges and collide to build mountains and volcanoes.",
      "Rivers also change the surface: the Mississippi built Louisiana's delta from sediment, while the land slowly sinks.",
    ],
    "How did the Mississippi River build southern Louisiana?",
    [
      "The river carries sediment.",
      "Where it slows near the Gulf, it drops that sediment and builds land.",
    ],
    "by depositing sediment",
  ),
  "science/la-g8-resources": lesson(
    [
      "Minerals, fuels and groundwater are found only where past geologic processes put them.",
      "Scientists forecast hazards from data, such as small earthquakes and swelling ground before an eruption.",
      "Good designs reduce human impact by using less and polluting less.",
    ],
    "Why are some minerals found in only a few places?",
    [
      "Minerals collect through processes like volcanoes and ancient seas.",
      "Those happened in some places, not everywhere.",
    ],
    "past geologic processes concentrated them there",
  ),
  "science/la-g8-growth": lesson(
    [
      "Asexual reproduction needs one parent: bacteria splitting, strawberry runners.",
      "Sexual reproduction needs two parents and creates variation.",
      "Behaviours like nest building and feeding chicks help young survive.",
      "Genes and the environment both affect growth: the same plants grow differently in sun and shade.",
    ],
    "Two identical plants grow in sun and in shade and end up different heights. Why?",
    [
      "Their genes are the same.",
      "So the difference comes from where they grew.",
    ],
    "the environment",
  ),
  "social/la-g8-louisiana-1900s": lesson(
    [
      "Oil was found at Jennings in 1901, and timber, oil and gas booms changed Louisiana's economy.",
      "The Great Flood of 1927 led the federal government to take charge of flood control.",
      "Huey Long built roads and schools but used great power. In World War II, Louisiana trained soldiers and built Higgins boats.",
    ],
    "What were Higgins boats used for?",
    [
      "They were built in New Orleans during World War II.",
      "They carried troops from ships to beaches, as on D-Day.",
    ],
    "landing troops on beaches",
  ),
  "social/la-g8-modern-louisiana": lesson(
    [
      "The Baton Rouge Bus Boycott of 1953 was one of the first bus boycotts of the civil rights era.",
      "In 1960, Ruby Bridges integrated William Frantz Elementary in New Orleans.",
      "In 2005, Hurricanes Katrina and Rita flooded much of New Orleans and southwest Louisiana, and the state rebuilt stronger levees.",
    ],
    "Which school did Ruby Bridges integrate in 1960?",
    [
      "She was six years old.",
      "She walked into William Frantz Elementary in New Orleans.",
    ],
    "William Frantz Elementary",
  ),
  "social/al-g9-holocaust": lesson(
    [
      "Antisemitism is hatred of or prejudice against Jewish people. The Nazis built on it with lies and propaganda.",
      "Step by step, rights were taken: the Nuremberg Laws (1935) removed citizenship; then came ghettos and camps such as Dachau (1933).",
      "Six million Jews were murdered. People who risked their lives to save Jews are honoured as Righteous Among the Nations.",
    ],
    "What did the Nuremberg Laws of 1935 do?",
    [
      "They were laws passed by the Nazi government.",
      "They stripped German Jews of citizenship and rights.",
    ],
    "took away German Jews’ citizenship and rights",
  ),
};
