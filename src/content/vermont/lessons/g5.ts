import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Vermont's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Vermont examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/vt-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Most of Earth's water is salty ocean water, and most fresh water is frozen in ice.",
      "In Vermont, many homes get fresh water from wells and many towns from lakes and rivers, so people work to keep that water clean.",
    ],
    "Trees take in water and give off water vapour. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapour goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/vt-g5-ecosystems": lesson(
    [
      "Producers make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Orcas eat salmon. Are orcas producers or consumers?",
    [
      "Orcas can't make their own food.",
      "They eat other animals.",
    ],
    "consumers",
  ),
  "science/vt-g5-sun-stars": lesson(
    [
      "The sun looks brighter than other stars because it is much closer to Earth.",
      "Far-off headlights look dim and near ones bright: distance works the same way for stars.",
      "Earth spins once about every 24 hours, giving day and night.",
      "The North Star seems to stay still because it is almost straight above Earth's axis.",
    ],
    "Some stars are bigger than the sun. Why do they look so small?",
    [
      "Things far away look dimmer and smaller.",
      "Those stars are much farther from Earth.",
    ],
    "they are very far away",
  ),
  "social/first-farmers": lesson(
    ["Early humans hunted animals and gathered plants for a very long time.", "About 12,000 years ago, people began farming and taming animals, called domestication.", "Extra food (a surplus) let some people do other jobs, and villages grew into cities."],
    "Why could some people in farming villages become potters?",
    ["Farms grew more food than people needed.", "With extra food, not everyone had to farm."],
    "food surpluses meant not everyone had to farm",
  ),
  "social/where-civilizations-grew": lesson(
    ["Early civilizations grew along rivers: Mesopotamia, Egypt (the Nile), the Indus Valley and China.", "Rivers gave water and floods left rich soil for crops.", "Mountains, seas and deserts shaped life too, like Greek sailors on a rocky coast."],
    "Why did early civilizations grow along rivers?",
    ["People need water to drink and to grow food.", "River floods left rich soil."],
    "rivers gave water and rich soil for farming",
  ),
  "social/world-beliefs": lesson(
    ["Judaism and Christianity began in Southwest Asia; Hinduism and Buddhism in South Asia; Confucianism and Daoism in East Asia.", "Christianity follows Jesus of Nazareth. Karma (Hinduism, Buddhism) means actions affect your future. Daoism seeks harmony with the Dao.", "Constantine's Edict of Milan (313 CE) granted religious freedom."],
    "Where did Confucianism begin?",
    ["Confucius was a teacher in ancient China.", "China is in East Asia."],
    "East Asia",
  ),
  "social/trade-networks": lesson(
    ["Specialization: people make what they do best and trade for the rest.", "In barter, find the trade rate and scale it up. Coins (first in Lydia, about 600 BCE) made trade easier.", "The Silk Road moved goods, ideas, religions and diseases. Trade brought cooperation, but also fights over routes."],
    "At a market, 2 baskets of grain trade for 5 fish. How many fish do 6 baskets get?",
    ["6 baskets is 3 groups of 2.", "3 × 5 fish = 15 fish."],
    "15",
  ),
  "social/wa-g6-mesopotamia-egypt": lesson(
    ["A civilization is a complex society with cities, government, jobs and often writing.", "Mesopotamia grew between the Tigris and Euphrates. Egypt grew along the Nile.", "Mesopotamians wrote in cuneiform and had Hammurabi’s Code. Egyptians used hieroglyphs."],
    "Why was writing laws down, as in Hammurabi’s Code, important?",
    ["Before, rules could change from person to person.", "Written laws let everyone know the same rules."],
    "people could know the rules and they applied the same way",
  ),
  "social/ca-g7-arabia-islam": lesson(
    ["The Arabian Peninsula, between the Red Sea and the Persian Gulf, is mostly hot desert. Mecca grew on caravan routes.", "Muslims follow the Qur’an and the Sunnah, the example of the Prophet Muhammad’s words and actions. They pray in mosques.", "Muslim rule spread through conquest and treaties and blended many cultures."],
    "What is the Sunnah?",
    ["The Qur’an is one source of Islamic belief.", "The other is the example of the Prophet Muhammad’s words and actions."],
    "the example of the Prophet Muhammad’s words and actions",
  ),
  "social/ga-g7-africa": lesson(
    ["Key features include the Sahara, the Sahel, the Nile and the Congo River.", "Desertification in the Sahel and unsafe water are big environmental issues.", "Many African countries gained independence in the 1950s and 1960s."],
    "What is desertification?",
    ["Desert means dry land.", "Land slowly becomes like a desert."],
    "good land turning into desert",
  ),
  "social/ga-g7-southwest-asia": lesson(
    ["Key features include the Tigris and Euphrates Rivers, the Persian Gulf and the Arabian Peninsula.", "Oil is the region's most important export.", "Water is scarce, so sharing rivers is an important issue."],
    "What is Southwest Asia's most important export?",
    ["It is found under the desert and the Gulf.", "It is used for fuel."],
    "oil",
  ),
};
