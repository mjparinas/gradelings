import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Connecticut's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Connecticut examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/ct-g8-space": lesson(
    [
      "Earth's tilt causes the seasons: the hemisphere tilted toward the sun has summer.",
      "Moon phases come from seeing different parts of its sunlit half. In a solar eclipse the moon is between the sun and Earth.",
      "Gravity holds the planets in orbit; the solar system is huge compared with Earth.",
    ],
    "In a solar eclipse, what is between the sun and Earth?",
    [
      "Something blocks the sunlight.",
      "The moon's shadow falls on Earth.",
    ],
    "the moon",
  ),
  "science/ct-g8-earth-history": lesson(
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
  "social/ct-g8-connecticut-and-nation": lesson(
    [
      "Connecticut ended slavery slowly: a 1784 law freed children born after it at age 25, and slavery ended fully in 1848.",
      "Prudence Crandall's school, the Amistad case and Venture Smith's narrative show the fight for freedom and equal rights.",
      "Connecticut's factories armed the Union, and the 29th Connecticut, a regiment of Black soldiers, fought in the Civil War.",
    ],
    "In 1841, what did the Supreme Court decide about the Africans of the Amistad?",
    [
      "They had taken the ship to escape slavery.",
      "The court ruled they were free.",
    ],
    "that they were free",
  ),
  "social/ct-g8-us-timeline": lesson(
    [
      "A timeline puts events in order and shows how far apart they are.",
      "Subtract the years to find the time between two events.",
      "Causes come before effects: the fight over slavery in the territories led to the Civil War, and the war led to Reconstruction.",
    ],
    "How many years passed between the Declaration of Independence (1776) and the end of the Civil War (1865)?",
    [
      "Subtract: 1865 − 1776.",
      "1865 − 1776 = 89.",
    ],
    "89 years",
  ),
  "social/ct-g8-founding-documents": lesson(
    [
      "The Constitution sets up three branches, with checks and balances, and shares power between the nation and the states.",
      "At the Constitutional Convention, the Connecticut Compromise gave the House seats by population and every state two senators.",
      "The Bill of Rights protects freedoms such as speech, religion and a fair trial.",
    ],
    "How does the Senate give every state an equal voice?",
    [
      "The House is based on population.",
      "In the Senate, every state has two senators.",
    ],
    "every state has two senators",
  ),
};
