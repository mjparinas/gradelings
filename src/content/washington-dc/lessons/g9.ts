import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Grade 9 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "math/dc-g9-absolute-value": lesson(
    [
      "|x − a| is the distance between x and a on the number line.",
      "|x − a| = b means x − a = b or x − a = −b, so there are two answers (none if b is negative).",
      "|x − a| < b means x is between a − b and a + b. |x − a| > b means x is outside them.",
    ],
    "Solve |x − 3| = 5.",
    [
      "x − 3 = 5, so x = 8.",
      "x − 3 = −5, so x = −2.",
    ],
    "x = −2 or x = 8",
  ),
  "science/dc-g9-ecosystems": lesson(
    [
      "A population levels off at carrying capacity on a logistic growth curve.",
      "About 10% of energy passes up each trophic level.",
      "After disturbances like wildfire, succession rebuilds the community; stable ecosystems recover.",
    ],
    "Shrubs sprout again after a wildfire. What is this an example of?",
    [
      "The community is rebuilding over time.",
      "Gradual change in a community is succession.",
    ],
    "succession",
  ),
  "social/dc-g9-early-humans": lesson(
    [
      "Fossils, tools and DNA show that Homo sapiens first appeared in Africa about 300,000 years ago.",
      "Earlier hominins include Australopithecines like Lucy, Homo habilis and Homo erectus.",
      "Neanderthals and Denisovans met Homo sapiens, and many people today carry some of their DNA.",
      "Paleolithic people used fire, stone tools and made art, like the paintings at Lascaux.",
    ],
    "Where did Homo sapiens first appear?",
    [
      "The oldest Homo sapiens fossils were found in Morocco.",
      "DNA from people today points the same way.",
    ],
    "Africa",
  ),
  "social/dc-g9-world-heritage": lesson(
    [
      "UNESCO's World Heritage List names places of value to all humanity, cultural or natural.",
      "Some artifacts were taken without consent, like the Benin Bronzes in 1897.",
      "Repatriation means returning them; the Smithsonian returned Benin Bronzes to Nigeria in 2022.",
      "Judge sources by who made them, why and when, and trace an object's provenance.",
    ],
    "What is it called when a museum returns an artifact to the people it was taken from?",
    [
      "Patria means homeland.",
      "Re means back again.",
    ],
    "repatriation",
  ),
  "social/ny-g6-classical-china-india": lesson(
    ["The Qin united China; the Terracotta Army guarded its first emperor's tomb.", "The Han invented paper and chose officials by tests of Confucian teachings. Han China and Rome both had big armies and roads.", "India's Maurya and Gupta empires; the Gupta had a golden age of peace, wealth and achievement."],
    "During which dynasty was paper invented in China?",
    ["It came after the Qin.", "It was the dynasty that ruled about 400 years."],
    "the Han",
  ),
  "social/world-beliefs": lesson(
    ["Judaism and Christianity began in Southwest Asia; Hinduism and Buddhism in South Asia; Confucianism and Daoism in East Asia.", "Christianity follows Jesus of Nazareth. Karma (Hinduism, Buddhism) means actions affect your future. Daoism seeks harmony with the Dao.", "Constantine's Edict of Milan (313 CE) granted religious freedom."],
    "Where did Confucianism begin?",
    ["Confucius was a teacher in ancient China.", "China is in East Asia."],
    "East Asia",
  ),
};
