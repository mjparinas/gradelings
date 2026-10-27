import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/sd-g4-earth-hazards": lesson(
    [
      "Maps show patterns: many mountains, volcanoes and earthquakes are along the edges of Earth's plates.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "On the plains, tornado sirens and safe rooms protect people, snow fences catch blowing snow, and levees hold back floods.",
    ],
    "A hurricane is coming toward the South Dakota coast. What helps keep people safe?",
    [
      "Forecasters warn people days ahead.",
      "Families near the shore move to higher ground.",
    ],
    "warnings and moving away from the shore",
  ),
  "science/sd-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Oil, natural gas and coal are fossil fuels. They will run out, and burning them pollutes the air.",
      "Wind turbines on South Dakota's prairie and the dams on the Missouri River make electricity without burning fuel.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "Is wind a renewable or a nonrenewable resource?",
    [
      "The wind keeps blowing day after day.",
      "It will not run out.",
    ],
    "renewable",
  ),
  "science/sd-g4-rocks-erosion": lesson(
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
  "social/sd-g4-regions": lesson(
    [
      "East of the Missouri, glaciers flattened the land: the Coteau des Prairies, James River Valley and Prairie Plains.",
      "West of the Missouri is the high, dry Missouri Plateau, with ranches, the Badlands and the Black Hills.",
      "Historic cities include Yankton (the first capital), Deadwood (gold), Aberdeen, Pierre, Rapid City and Sioux Falls.",
    ],
    "West River gets less rain than East River. Would you expect more cattle ranches or more corn fields there?",
    [
      "Dry grassland is good for grazing.",
      "Crops need more rain.",
    ],
    "more cattle ranches",
  ),
  "social/sd-g4-corps-of-discovery": lesson(
    [
      "In 1803 President Jefferson bought the Louisiana Territory from France and sent Lewis and Clark to explore it.",
      "In 1804 the Corps of Discovery paddled up the Missouri through South Dakota and met Yankton, Lakota and Arikara people.",
      "The Lakota kept history in winter counts: one picture for each year's biggest event.",
    ],
    "How did a winter count record history?",
    [
      "Each year got one picture.",
      "The picture showed that year's most important event.",
    ],
    "one picture for each year",
  ),
  "social/ca-g6-roman-empire": lesson(
    [
      "Rome beat Carthage in three Punic Wars, then grew into an empire from Britain to Egypt and the Middle East.",
      "The Pax Romana was about 200 years of peace.",
      "Legacies: Latin (the root of Spanish, French, Italian and many English words), roads, aqueducts and law.",
    ],
    "Rome fought the Punic Wars against which city?",
    [
      "It was a powerful trading city in North Africa.",
      "Hannibal led its army across the Alps.",
    ],
    "Carthage",
  ),
  "social/ca-g7-rome-byzantium": lesson(
    [
      "Constantine was the first Christian Roman emperor and moved the capital to Constantinople.",
      "The eastern empire, Byzantium, lasted until the Ottoman Turks took Constantinople in 1453.",
      "Justinian organized Roman law. Latin is the root of Spanish, French, Italian and Portuguese.",
    ],
    "When did the Byzantine Empire end?",
    [
      "The Ottoman Turks captured Constantinople.",
      "That happened in the mid-1400s.",
    ],
    "1453",
  ),
  "social/medieval-europe": lesson(
    [
      "Feudalism: the king gave land to nobles for loyalty and soldiers; peasants worked the land of a lord's manor.",
      "Monasteries were communities where monks prayed and copied books, keeping learning alive.",
      "The Black Death (1340s) spread by fleas on rats along trade routes. Kings and the Church sometimes clashed over power.",
    ],
    "In the feudal system, who gave land to nobles?",
    [
      "Nobles promised loyalty and soldiers.",
      "They got their land from the ruler at the top.",
    ],
    "the king",
  ),
  "social/ny-g9-crusades-plague": lesson(
    [
      "The Crusades were wars over the Holy Land; Venice and Genoa grew rich shipping crusaders and trading.",
      "The Reconquista was Christian kingdoms taking back Iberia from Muslim rulers.",
      "The Black Death reached Europe in 1347 by trade routes, carried by fleas on rats. Cities used quarantine (40 days apart) to slow it.",
    ],
    "What was the Reconquista?",
    [
      "Muslim rulers had held much of Spain and Portugal.",
      "Christian kingdoms fought to take it back.",
    ],
    "the effort by Christian kingdoms to take back the Iberian Peninsula",
  ),
};
