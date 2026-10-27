import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Grade 7 units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "language/wv-g7-story-analysis": lesson(
    [
      "Cite several pieces of evidence from the text to support what you say.",
      "A theme is the story's message; an objective summary leaves out your opinions.",
      "Compare a story with its film or stage version, or with a history of the same time.",
    ],
    "Which belongs in an objective summary: 'The ending was boring' or 'The family moves away'?",
    [
      "Opinions don't belong in an objective summary.",
      "'The family moves away' is a fact from the story.",
    ],
    "The family moves away",
  ),
  "language/wv-g7-info-analysis": lesson(
    [
      "The central idea is the most important point; details support it.",
      "Authors organize texts by time order, cause and effect, compare and contrast or problem and solution.",
      "Two writers on one topic may stress different facts, so compare how they present it.",
    ],
    "An article tells events with 'first', 'next' and 'finally'. What structure is that?",
    [
      "Those words show time order.",
      "Time order is chronological structure.",
    ],
    "chronological",
  ),
  "science/wv-g7-resources": lesson(
    [
      "Resources like coal, gas, salt and groundwater formed through geologic processes long ago.",
      "That is why they are found in some places and not others.",
      "Nonrenewable resources are used much faster than they form.",
    ],
    "Why does southern West Virginia have coal?",
    [
      "Coal forms from buried plants.",
      "Long ago the area had huge swampy forests.",
    ],
    "it had huge swampy forests long ago",
  ),
  "science/wv-g7-earth-surface": lesson(
    [
      "The rock cycle shows how igneous, sedimentary and metamorphic rocks change into each other.",
      "Some processes are fast, like landslides; others are slow, like rivers carving gorges.",
      "Matching fossils and rocks on far-apart continents show that the plates move.",
    ],
    "Heat and pressure change limestone into marble. What kind of rock is marble?",
    [
      "Rock changed by heat and pressure is metamorphic.",
      "So marble is metamorphic rock.",
    ],
    "metamorphic",
  ),
  "social/wv-g7-world-regions": lesson(
    [
      "The five themes of geography are location, place, region, movement and human-environment interaction.",
      "A region is an area that shares features like landforms, climate or culture.",
      "Mountains, seas and rivers shape where people live and where borders run.",
    ],
    "People cut down a forest to build farms. Which theme of geography is that?",
    [
      "It is about people changing the land.",
      "That is human-environment interaction.",
    ],
    "human-environment interaction",
  ),
  "social/wv-g7-japan": lesson(
    [
      "Japan is a chain of mountainous islands in East Asia.",
      "Most people live on narrow coastal plains, because the mountains are steep.",
      "Traditions like respect for elders and seasonal festivals shape daily life.",
    ],
    "Why do most people in Japan live near the coast?",
    [
      "Much of Japan is steep mountains.",
      "The flat land is mostly on the coasts.",
    ],
    "the flat land is mostly on the coasts",
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
  "social/wa-g6-world-maps": lesson(
    [
      "There are 7 continents and 5 oceans. The Atlantic lies between the Americas and Europe and Africa.",
      "North latitude means the Northern Hemisphere; west longitude means the Western Hemisphere.",
      "Use the scale: multiply the map distance by what 1 unit stands for. A thematic map shows one topic.",
    ],
    "A map's scale says 1 cm = 50 km. Two towns are 6 cm apart. How far apart are they?",
    [
      "Each centimetre stands for 50 km.",
      "6 × 50 = 300.",
    ],
    "300 km",
  ),
};
