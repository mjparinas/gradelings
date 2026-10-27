import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Hawaiʻi's Grade 4 units that the shared lesson files don't cover. A copy of another
// state's unit carries the original's lesson (with Hawaiʻi examples where the original named its own state) under its
// own id, and a unit borrowed from another grade carries the lesson it has there. Lessons are written in Canadian
// spelling, like every lesson file; US families see them in US spelling.
export const LESSONS: GradeLessons = {
  "social/hi-g4-timeline": lesson(
    ["A timeline puts events in order from earliest to latest.", "Kamehameha united the islands by 1810. Hōkūleʻa was launched in 1975.", "To find how far apart two events are, subtract the earlier year from the later one."],
    "How many years passed between 1778 and 1810?",
    ["Subtract the earlier year: 1810 − 1778.", "That is 32."],
    "32 years",
  ),
  "science/hi-g4-earth-hazards": lesson(
    [
      "Maps show patterns: many mountains, volcanoes and earthquakes are along the edges of Earth's plates.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "Warning systems, strong buildings and safe plans help during storms, floods and earthquakes.",
    ],
    "The ground starts shaking at school. What helps keep people safe?",
    [
      "Stay inside and away from windows.",
      "Get under a sturdy desk and hold on.",
    ],
    "drop, cover and hold on",
  ),
  "science/hi-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Solar farms use sunlight. Geothermal plants use heat from inside Earth.",
      "Hawaiʻi ships in oil for many power plants, so it is turning to sun, wind and geothermal power.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "A geothermal power plant makes electricity from what?",
    [
      "“Geo” means Earth and “thermal” means heat.",
    ],
    "heat from inside Earth",
  ),
  "science/hi-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Glaciers scrape and carry rock. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep canyons.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/hi-g4-ahupuaa": lesson(
    [
      "An ahupuaʻa is a land division that runs from the mountains (mauka) to the sea (makai).",
      "The uplands gave wood and birds, the middle gave farms, and the shore gave fish and limu.",
      "People specialised in farming, fishing or crafts and traded with each other.",
      "A konohiki managed land, water and fishing, and rules rested resources so they would last.",
    ],
    "A farmer up the valley trades kalo for a fisher's fish. What is this called?",
    [
      "Each person gives something they have.",
      "They get something they need.",
    ],
    "exchange, or trade",
  ),
  "social/hi-g4-alii": lesson(
    [
      "Aliʻi were the chiefs. Konohiki managed land for them, and makaʻāinana farmed and fished.",
      "The kapu system was a set of rules that guided how people behaved, and some kapu protected resources.",
      "Kamehameha, born in Kohala, ruled all of Hawaiʻi Island by about 1791 and all the islands by 1810.",
      "His Law of the Splintered Paddle protected people travelling on the roads.",
    ],
    "Which island did Kamehameha unite first?",
    [
      "He was born in Kohala.",
      "Kohala is on Hawaiʻi Island.",
    ],
    "Hawaiʻi Island",
  ),
  "social/hi-g4-canoe-plants": lesson(
    [
      "Canoe plants are plants voyagers brought by canoe: kalo, ʻulu, niu, ʻuala, wauke, ipu and kukui.",
      "Native plants and animals, like koa and the nēnē, were here before people arrived.",
      "Early Hawaiians used plants for food, cloth, cord, tools, light and houses.",
      "Settlers changed the land with loʻi terraces, ʻauwai ditches and fishponds.",
    ],
    "Is the koa tree a canoe plant or a native plant?",
    [
      "Canoe plants were brought by people.",
      "Koa grew in Hawaiʻi before people came.",
    ],
    "a native plant",
  ),
  "social/hi-g4-islands": lesson(
    [
      "Hawaiʻi is an archipelago of eight main islands in the middle of the Pacific Ocean.",
      "The islands were built one by one by volcanoes over a hot spot. Hawaiʻi Island is the youngest; Kauaʻi is the oldest.",
      "Windward sides get trade-wind rain; leeward sides are drier.",
      "The first settlers chose valleys with streams for farming and shores with reefs for fishing.",
    ],
    "Why did many early settlements grow in windward valleys?",
    [
      "Kalo needs a lot of water.",
      "Windward valleys get rain and have streams.",
    ],
    "they had water for drinking and farming",
  ),
  "social/hi-g4-values": lesson(
    [
      "Hawaiian values still guide life in Hawaiʻi today.",
      "Aloha is love and kindness. Mālama ʻāina is caring for the land. ʻOhana is family.",
      "Kuleana is responsibility. Laulima is many hands working together. Pono is doing what is right.",
      "Māori, Tahitian and Samoan cultures share Polynesian roots, so many words and ways are alike.",
    ],
    "Classmates all pitch in to clean up after a project. Which value is that?",
    [
      "Lima means hand.",
      "Many hands working together is laulima.",
    ],
    "laulima",
  ),
  "social/hi-g4-voyaging": lesson(
    [
      "Polynesians sailed double-hulled voyaging canoes across the open ocean for weeks at a time.",
      "Wayfinders steered by the stars, the swells, the winds and the birds, with no instruments.",
      "Voyagers carried canoe plants and animals to start farms on a new island.",
      "In 1976, Hōkūleʻa sailed to Tahiti by wayfinding alone, guided by Mau Piailug.",
    ],
    "Seabirds flying home at dusk tell a navigator what?",
    [
      "Some seabirds fish at sea by day.",
      "At night they fly back to land.",
    ],
    "land is near, in the direction they fly",
  ),
};
